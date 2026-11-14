"""1.0.10 blocco 2: soldi, Tanì e stato (M-04, M-05, M-06/CR-03, M-06b/CR-02, M-06c/G2-01, M-07/E-01/D-01/D-12, M-08/H-01/H-02,
H-17, D-02, D-09). Ogni caso fallisce sulla build 1.0.9/1.0.10-parte-1 e passa dopo."""
import json, sys, os, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T

STX = "(() => ({ seeds: S.seeds, xp: S.xp, level: S.level, sn: (S.season || {}).n, paid: +(econ().paid || 0), spent: +(econ().spentN || 0), usable: xvUsable(), done: S.done.slice() }))()"

async def main(b):
    # --- M-04: scambio di un obiettivo gia' fatto
    st = T.base_state("en", goals=("water", "walk", "read", "tidy", "sleep"))
    ctx, pg = await T.page(b, st, age="adult")
    await T.close_layer(pg)
    await T.ev(pg, "completeGoal('water'); 1"); await pg.wait_for_timeout(1200); await T.close_layer(pg)
    s0 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
    gains = []
    prev = "water"
    for i in range(4):
        new = f"c:Swap test {i}"
        await T.ev(pg, f"tab = 'more'; moreSub = 'comp'; pickerList(); editGoals = editGoals.filter((g) => g.id !== {json.dumps(prev)}); editGoals.push({{ id: {json.dumps(new)}, days: [0,1,2,3,4,5,6] }}); v26GoalsApply(); 1")
        await pg.wait_for_timeout(300)
        b0 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
        await T.ev(pg, f"tab = 'today'; render(); completeGoal({json.dumps(new)}); 1"); await pg.wait_for_timeout(1200); await T.close_layer(pg)
        a0 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
        gains.append((a0["seeds"] - b0["seeds"], a0["xp"] - b0["xp"], (a0["sn"] or 0) - (b0["sn"] or 0), new in a0["done"]))
        prev = new
    T.check("scambio di un obiettivo fatto x4: 0 Tanì, 0 XP, 0 passi della stagione (prima +5 ogni volta)", all(g[0] == 0 and g[1] == 0 and g[2] == 0 for g in gains), gains)
    T.check("  l'obiettivo nuovo si puo' comunque spuntare", all(g[3] for g in gains), gains)
    # controllo: aggiungere un obiettivo in piu' (senza toglierne) paga come prima
    await T.ev(pg, "tab = 'more'; moreSub = 'comp'; pickerList(); editGoals.push({ id: 'c:Extra goal', days: [0,1,2,3,4,5,6] }); v26GoalsApply(); 1")
    b0 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
    await T.ev(pg, "tab = 'today'; render(); completeGoal('c:Extra goal'); 1"); await pg.wait_for_timeout(1200); await T.close_layer(pg)
    a0 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
    T.check("  controllo: un obiettivo aggiunto (senza toglierne) paga +5 come prima", a0["seeds"] - b0["seeds"] >= 5, (b0["seeds"], a0["seeds"]))
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- M-06c: i giorni toccati nell'editor si salvano subito
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    await T.close_layer(pg)
    await T.ev(pg, "tab = 'more'; moreSub = 'comp'; showPicker = false; render(); 1"); await pg.wait_for_timeout(500)
    btn = await T.ev(pg, "(() => { const b = document.querySelector('[data-gday=\"0:6\"]'); return !!b && b.getClientRects().length > 0; })()")
    T.check("editor: i giorni degli obiettivi sono visibili", btn)
    if btn:
        await pg.click('[data-gday="0:6"]'); await pg.wait_for_timeout(500)
        await T.ev(pg, "tab = 'today'; editGoals = null; render(); 1"); await pg.wait_for_timeout(300)
        d = json.loads(await T.ev(pg, "JSON.stringify({ mem: S.goals[0].days, disk: JSON.parse(localStorage.getItem('tanetto-prova-v3')).goals[0].days })"))
        T.check("editor: tocco su un giorno salvato subito (anche uscendo dalla pagina)", 6 not in d["mem"] and 6 not in d["disk"], d)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- M-05: albero di Natale pagato prima con i Tanì dei pacchetti
    st = T.base_state("en", day="2026-12-10", seeds=3000, v20econ={"paid": 2000, "spentN": 0})
    ctx, pg = await T.page(b, st, age="adult", date=(2026, 12, 10, 10, 7))
    await T.close_layer(pg)
    has = await T.ev(pg, "tab = 'today'; render(); !!document.querySelector('[data-xmbuy]:not([disabled])')")
    T.check("Natale: pulsante dell'albero presente il 10/12", has)
    if has:
        s1 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
        await pg.click("[data-xmbuy]:not([disabled])"); await pg.wait_for_timeout(1000)
        s2 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
        T.check("Natale: tappa dell'albero pagata con i Tanì dei pacchetti (utilizzabili per gli Introvabili invariati)", s2["seeds"] < s1["seeds"] and s2["usable"] == s1["usable"] and s2["spent"] == s1["seeds"] - s2["seeds"], (s1, s2))
    # negozio: speso una volta sola (niente doppio conteggio con il controllo vecchio)
    await T.ev(pg, "layer.innerHTML=''; tab = 'home'; homeTab = 'furn'; render(); 1"); await pg.wait_for_timeout(400)
    s3 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
    item = await T.ev(pg, "(() => { const b = [...document.querySelectorAll('button[data-item]')].find((x) => { const s = SHOP.find((y) => y.id === x.dataset.item); return s && !S.owned.includes(s.id) && !s.event && !s.found && !s.xv && s.price > 0 && s.price <= S.seeds; }); return b ? b.dataset.item : ''; })()")
    if item:
        await T.ev(pg, f"document.querySelector('button[data-item=\"{item}\"]').scrollIntoView(); 1")
        await pg.click(f'button[data-item="{item}"]'); await pg.wait_for_timeout(800)
        for sel in ("#tryBuy", ".tobuy", "[data-buy]"):
            if await T.ev(pg, f"!!document.querySelector('{sel}')"): await pg.click(sel); await pg.wait_for_timeout(800); break
        s4 = json.loads(await T.ev(pg, f"JSON.stringify({STX})"))
        d = s3["seeds"] - s4["seeds"]
        T.check(f"negozio: acquisto ({item}) contato una volta sola sui Tanì dei pacchetti", d > 0 and s4["spent"] - s3["spent"] == min(d, s3["paid"] - s3["spent"]), (s3, s4))
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- M-06 / CR-03: Tanì di Plus = pagati
    st = T.base_state("en", seeds=100, plusOn=True, plusSince="2026-11-01", plusCheck=0, plusMonth="2026-10", v20econ={"paid": 0, "spentN": 0})
    ctx, pg = await T.page(b, st, age="adult", native=True)
    await T.close_layer(pg)
    r = json.loads(await T.ev(pg, "JSON.stringify((() => { S.plusOn = true; const b = xvUsable(), s = S.seeds; S.plusMonth = '2026-10'; const ok = plusMonthly(); return { ok, pa: plusActive(), dS: S.seeds - s, dU: xvUsable() - b }; })())"))
    T.check("Plus: 750 Tanì del mese arrivano ma non contano per gli Introvabili", r.get("dS", 0) >= 750 and r.get("dU", 1) == 0, r)
    r = json.loads(await T.ev(pg, "JSON.stringify((() => { S.plusOn = true; const se = curSeason(); const rr = sReward('g', 15, se); const b = xvUsable(), s = S.seeds; giveReward(rr); const out = { t: rr.tani || 0, dS: S.seeds - s, dU: xvUsable() - b }; const f = sReward('f', 25, se); const b2 = xvUsable(); giveReward(f); out.fT = f.tani || 0; out.fU = xvUsable() - b2; return out; })())"))
    T.check("Plus: Tanì del sentiero d'oro non contano per gli Introvabili", r["t"] == 0 or (r["dS"] == r["t"] and r["dU"] == 0), r)
    T.check("  controllo: il sentiero normale conta come prima", r["fT"] == 0 or r["fU"] == r["fT"], r)
    await ctx.close()
    # --- M-07: regalo del giorno che perdona
    cases = [("riposo", {"2026-11-15": {"done": 0, "total": 5, "rest": True}}, {"n": 9, "last": "2026-11-14"}, 10),
             ("un giorno saltato", {}, {"n": 9, "last": "2026-11-14"}, 7),
             ("weekend libero", {"2026-11-14": {"done": 0, "total": 0, "free": True}, "2026-11-15": {"done": 0, "total": 0, "free": True}}, {"n": 6, "last": "2026-11-13"}, 7),
             ("giorno protetto dallo scudo", {}, {"n": 5, "last": "2026-11-14"}, 6)]
    for name, days, visit, want in cases:
        extra = {"shields": 1} if "scudo" in name else {}
        st = T.base_state("en", day="2026-11-15" if days or "scudo" not in name else "2026-11-14", days=dict(days, **({"2026-11-14": {"done": 2, "total": 5}} if "scudo" in name else {})), visit=visit, **extra)
        ctx, pg = await T.page(b, st, age="adult")
        n = await T.ev(pg, "S.visit.n")
        T.check(f"regalo del giorno, {name}: serie {visit['n']} -> {want} (prima tornava a 1)", n == want, n)
        await ctx.close()
    # viaggio verso ovest: la data torna indietro
    st = T.base_state("en", day="2026-11-17", visit={"n": 5, "last": "2026-11-17"})
    ctx, pg = await T.page(b, st, age="adult", date=(2026, 11, 16, 20, 0))
    T.check("regalo del giorno: data tornata indietro (viaggio), la serie resta 5", await T.ev(pg, "S.visit.n") == 5)
    await ctx.close()
    # --- M-08: memoria piena + H-02
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    await T.close_layer(pg)
    await T.ev(pg, "window.__ls = localStorage.setItem.bind(localStorage); Storage.prototype.setItem = function () { throw new DOMException('q', 'QuotaExceededError'); }; S.seeds++; save(); 1")
    await pg.wait_for_timeout(500)
    tst = await T.ev(pg, "(document.getElementById('toast') || {}).textContent || ''")
    T.check("memoria piena: avviso 'storage is full'", "storage is full" in tst, tst)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- H-17: saldo scritto come testo
    ctx, pg = await T.page(b, T.base_state("en", seeds="1e99"), age="adult")
    T.check("saldo '1e99' (testo) non diventa un miliardo", await T.ev(pg, "S.seeds") == 0)
    await ctx.close()
    # --- D-02: domanda del diario uguale tutto il giorno locale (Honolulu)
    qs = []
    for h in (9, 15):
        ctx, pg = await T.page(b, T.base_state("en"), age="adult", tz="Pacific/Honolulu", date=(2026, 11, 16, h, 0))
        await T.close_layer(pg); await T.ev(pg, "tab = 'diary'; render(); 1"); await pg.wait_for_timeout(300)
        qs.append(await T.ev(pg, "(() => { const t = L(); return t.questions[Math.floor(new Date(dkey() + 'T12:00:00').getTime() / 86400000) % t.questions.length]; })()"))
        qs.append(await T.ev(pg, "document.querySelector('.stack') ? document.querySelector('#app').innerText.includes(L().questions[Math.floor(new Date(dkey() + 'T12:00:00').getTime() / 86400000) % L().questions.length]) : false"))
        await ctx.close()
    T.check("diario: stessa domanda alle 9 e alle 15 a Honolulu, e mostrata in pagina", qs[0] == qs[2] and qs[1] and qs[3], qs)
    # --- D-09: video preparato da troppo tempo
    st = T.base_state("en", done=["water"], giftDay="2026-11-16", adsOk=1, log=[{"d": "2026-11-16", "g": "water"}])
    ctx, pg = await T.page(b, st, age="adult", native=True, wait=6000)
    await T.close_layer(pg)
    await pg.wait_for_timeout(5000)
    r = json.loads(await T.ev(pg, "JSON.stringify({ l: adsSt.loaded, c: adsSt.canRequestAds })"))
    await T.ev(pg, "adsLoadedAt = Date.now() - 3 * 3600e3; 1")
    await T.ev(pg, "window.__got = 0; adShow(() => { window.__got = 1; }, 'prova'); 1"); await pg.wait_for_timeout(2500)
    got = await T.ev(pg, "window.__got"); tst = await T.ev(pg, "(document.getElementById('toast') || {}).textContent || ''")
    T.check("video vecchio di 3 ore: il tocco prepara subito un video nuovo e lo mostra (niente 'No ad available')", got == 1 and "No ad" not in tst, (r, got, tst))
    await ctx.close()
    # --- E-06: pagamenti non disponibili nel Paese (la rete funziona, Google Play rifiuta): dopo 2 tentativi un testo giusto
    ctx, pg = await T.page(b, T.base_state("ru"), age="adult", native=True, lang="ru-RU")
    await T.close_layer(pg)
    await T.ev(pg, "window.Capacitor.Plugins.Billing.products = async () => { throw { code: 'unavailable' }; }; billProducts = null; openPlus('t'); 1"); await pg.wait_for_timeout(1500)
    t1 = await T.ev(pg, "(document.getElementById('plusFoot') || {}).textContent || ''")
    await T.ev(pg, "document.getElementById('billRetry') && document.getElementById('billRetry').click(); 1"); await pg.wait_for_timeout(1500)
    t2 = await T.ev(pg, "(document.getElementById('plusFoot') || {}).textContent || ''")
    T.check("E-06 ru, pagamenti rifiutati: prima 'controlla la connessione', dopo 2 tentativi si dice che Google Play forse non vende nel Paese", "Проверь подключение" in t1 and "в твоей стране" in t2, (t1[:90], t2[:120]))
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- M-06b: due telefoni con lo stesso account
    CLOUD = {"doc": None, "pushes": [], "pulls": 0}
    FB = r"""window.TanFB = { init: async () => ({ uid: 'u-test-1', email: 'tester@example.invalid', provider: 'password' }),
      pull: async () => JSON.parse(await window.__cloudPull()), push: async (d) => await window.__cloudPush(d, (window.__dev || '?'), Date.now()),
      out: async () => {}, perks: async () => ({}), setLang: () => {}, remove: async () => {} };"""
    now = int(datetime.datetime(2026, 11, 16, 9, 7).timestamp() * 1000)
    async def dev(name, st, last):
        cx = await b.new_context(viewport={"width": 412, "height": 915}, locale="en-US")
        async def push(d, dv, t):
            at = int(t); CLOUD["doc"] = {"d": d, "at": at, "dev": dv}; CLOUD["pushes"].append(dv); return at
        async def pull():
            CLOUD["pulls"] += 1; return json.dumps(CLOUD["doc"])
        await cx.expose_function("__cloudPush", push); await cx.expose_function("__cloudPull", pull)
        T.serve(); p = await cx.new_page(); p.errs = []; p.on("pageerror", lambda e: p.errs.append(str(e)))
        await p.route("**/*goatcounter.com/**", lambda r: r.fulfill(body=""))
        acct = {"gateDone": True, "uid": "u-test-1", "email": "tester@example.invalid", "prov": "password", "freq": "day", "last": last, "h": "old"}
        js = T.MOCK + T.CLOCK % (2026, 10, 16, 9, 7) + f"window.__dev={json.dumps(name)};" + FB + "sessionStorage.setItem('splash','1');" + \
             f"if(!sessionStorage.getItem('t110s')){{localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(st))});localStorage.setItem('tanetto-account',{json.dumps(json.dumps(acct))});localStorage.setItem('tanetto-eta',{json.dumps(json.dumps(T.AGE['adult']))});sessionStorage.setItem('t110s','1')}};"
        await p.add_init_script("window.__TEST_NOAGE=1;" + js); await p.goto(T.URL); await p.wait_for_timeout(7000)
        return cx, p
    stA = T.base_state("en", level=12, seeds=6000)
    cA, pA = await dev("A", stA, now - 21 * 3600e3)
    T.check("telefono A: backup automatico fatto", CLOUD["pushes"] == ["A"], CLOUD["pushes"])
    await T.ev(pA, "creditPack({ products: ['tani_1100'], state: 'purchased', acknowledged: false, token: 'tkA1' }, false).then(() => 1)"); await pA.wait_for_timeout(800)
    sA = json.loads(await T.ev(pA, f"JSON.stringify({STX})"))
    await cA.close()
    stB = T.base_state("en", level=3, seeds=300)
    cB, pB = await dev("B", stB, now - 25 * 86400e3)
    await T.close_layer(pB); await pB.wait_for_timeout(3500)
    lay = await T.ev(pB, "(layer.innerText || '')")
    T.check("telefono B vecchio: NON sovrascrive il backup piu' recente di A", CLOUD["pushes"] == ["A"], CLOUD["pushes"])
    T.check("  B: chiede quale tenere, con livello e Tanì dei due", await T.ev(pB, "!!document.getElementById('acUseCloud')") and "level 12" in lay and "level 3" in lay, lay[:300])
    await cB.close()
    # A: ripristino del backup di A dopo l'acquisto del pacchetto -> i Tanì comprati restano
    cA2, pA2 = await dev("A", None, now)
    await T.ev(pA2, f"localStorage.setItem('tanetto-prova-v3', {json.dumps(json.dumps(T.base_state('en', level=12, seeds=sA['seeds'], v20econ={'paid': sA['paid'], 'spentN': 0})))}); 1")
    await pA2.reload(); await pA2.wait_for_timeout(6000)
    await T.ev(pA2, "askRestore(); 1"); await pA2.wait_for_timeout(1500)
    txt = await T.ev(pA2, "layer.innerText || ''")
    T.check("ripristino: la finestra mostra livello e Tanì del backup e di questo telefono", "level 12" in txt and "this phone" in txt, txt[:300])
    if await T.ev(pA2, "!!document.getElementById('acRestYes')"):
        await pA2.click("#acRestYes"); await pA2.wait_for_timeout(1200)
        s5 = json.loads(await T.ev(pA2, f"JSON.stringify({STX})"))
        T.check("ripristino: i Tanì comprati dopo il backup restano (e restano 'pagati', niente spesa finta)", s5["paid"] >= sA["paid"] and s5["seeds"] - s5["usable"] == sA["paid"] and s5["spent"] == 0, (sA, s5))
    T.check("  nessun errore", not pA2.errs, pA2.errs[:2])
    await cA2.close()

T.run(main)
