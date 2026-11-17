"""1.0.10 (113): tre correzioni dell'aspetto chieste dal proprietario (17/11/2026).
1) Zaino in Casa e scheda in cima alle Avventure: "Gita breve" e "Viaggio completo" centrate sotto la loro casella
   (la casella con la tacca e l'ultima), su una riga quando ci sta, mai fuori dalla scheda, mai sovrapposte:
   14 lingue, 360 / 412 / tablet, 3 situazioni dello zaino (1, 3 e 5 obiettivi fatti) e 4 o 6 obiettivi.
2) Ornamento della stagione: in Casa subito dopo il saluto (stessa riga dell'ultima parola, centrato sul testo), mai da solo;
   nelle altre schede resta dopo il titolo.
3) Stagione, "Fila d'oro": senza Plus toccare una ricompensa d'oro (bloccata o raggiunta) apre Tanetto Plus; con Plus
   resta "Prendi" (si prende il premio, nessuna finestra di Plus).
Le foto vanno in T110_SHOTS/113 (per il controllo a occhio)."""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T
SH = os.path.join(T.SHOTS, "113"); os.makedirs(SH, exist_ok=True)
MEASURE = """JSON.stringify([...document.querySelectorAll('#app .nven .nvscale, #app .tr20scale')].map((sc) => {
  const seg = sc.classList.contains('tr20scale') ? sc.parentElement.querySelector('.tr20seg') : sc.parentElement.querySelector('.nvseg');
  const card = sc.closest('.nven, .tr20st').getBoundingClientRect(); const bx = [...seg.children];
  const lab = (el, b) => { if (!el || !b) return null; const r = el.getBoundingClientRect(), q = b.getBoundingClientRect(); const lh = parseFloat(getComputedStyle(el).lineHeight);
    const rg = document.createRange(); rg.selectNodeContents(el); const tr = [...rg.getClientRects()]; const tl = Math.min(...tr.map((x) => x.left)), trr = Math.max(...tr.map((x) => x.right));
    return { txt: el.textContent, vis: getComputedStyle(el).visibility !== 'hidden', dc: Math.abs((tl + trr) / 2 - (q.left + q.width / 2)), l: tl, r: trr, top: r.top, bottom: r.bottom, lines: Math.round(r.height / lh), fs: parseFloat(getComputedStyle(el).fontSize) }; };
  const hb = bx.find((b) => b.classList.contains('half'));
  const nxt = sc.nextElementSibling ? sc.nextElementSibling.getBoundingClientRect().top : 1e9;
  let notch = null; if (hb) { const i = bx.indexOf(hb), a = hb.getBoundingClientRect(), b = bx[i + 1].getBoundingClientRect(), ns = getComputedStyle(hb, '::after');
    const w = parseFloat(ns.width), r = -parseFloat(ns.right); const nl = a.right + r - w; notch = { off: Math.abs((nl + w / 2) - (a.right + b.left) / 2), into: Math.max(0, a.right - nl, nl + w - b.left), h: parseFloat(ns.height), bh: a.height }; }
  const row = sc.closest('.nven') ? sc.closest('.nven').querySelector('.nvenrow') : null; let rw = null;
  if (row) { const tx = row.querySelector('.nvtx'), bt = row.querySelector('.btn'); if (tx && bt) { const a = tx.getBoundingClientRect(), b = bt.getBoundingClientRect(); rw = { tw: a.width, wrapped: b.top >= a.bottom - 1 }; } }
  return { kind: sc.classList.contains('tr20scale') ? 'viaggi' : 'casa', card: [card.left, card.right], f: lab(sc.querySelector('.f'), bx[bx.length - 1]), h: lab(sc.querySelector('.h'), hb), hasH: !!hb, segBottom: seg.getBoundingClientRect().bottom, scBottom: sc.getBoundingClientRect().bottom, nxt, notch, rw };
}))"""
WIDE = ["de", "ru", "pt", "fr", "pl", "tr"]

async def zaino(b):
    worst = {"one": 0, "two": 0}
    for lang in T.LANGS:
        widths = (360, 412, 820) if lang in WIDE + ["it", "en"] else (360, 412)
        for w in widths:
            for goals, done in (((5), 1), ((5), 3), ((5), 5), ((4), 2), ((6), 4)):
                gl = ("water", "walk", "read", "tidy", "sleep", "stretch")[:goals]
                st = T.base_state(lang, goals=gl, done=list(gl[:done]))
                ctx, pg = await T.page(b, st, age="adult", w=w, h=1000 if w < 600 else 1180, lang="en-US", wait=1800)
                await T.close_layer(pg)
                for tab in ("today", "trips"):
                    await T.ev(pg, f"tab = '{tab}'; render(); 1"); await pg.wait_for_timeout(450)
                    ms = json.loads(await T.ev(pg, MEASURE))
                    for m in ms:
                        tag = f"{lang} {w}px {done}/{goals} {m['kind']}"
                        labs = [x for x in (m["f"], m["h"]) if x]
                        bad = []
                        for x in labs:
                            if not x["vis"]: bad.append(("nascosta", x["txt"])); continue
                            if x["dc"] > 1.5: bad.append(("non centrata", x["txt"], round(x["dc"], 1)))
                            if x["l"] < m["card"][0] + 4 or x["r"] > m["card"][1] - 4: bad.append(("fuori dalla scheda", x["txt"]))
                            if x["lines"] > 2: bad.append(("piu' di 2 righe", x["txt"]))
                            if x["top"] < m["segBottom"] or x["bottom"] > m["nxt"] + 0.5: bad.append(("si sovrappone alle caselle o al testo sotto", x["txt"]))
                            if x["fs"] < 10: bad.append(("carattere troppo piccolo", x["txt"], x["fs"]))
                            worst["one" if x["lines"] == 1 else "two"] += 1
                        if m["notch"] and (m["notch"]["off"] > 1 or m["notch"]["into"] > 0.5 or m["notch"]["h"] < m["notch"]["bh"]): bad.append(("tacca non al centro dello spazio o piu' bassa delle caselle", m["notch"]))
                        if m["rw"] and not m["rw"]["wrapped"] and m["rw"]["tw"] < 118: bad.append(("testo accanto al pulsante troppo stretto", m["rw"]))
                        if m["f"] and m["h"] and m["h"]["vis"] and m["f"]["vis"] and m["h"]["r"] > m["f"]["l"] - 4: bad.append(("sovrapposte", m["h"]["txt"], m["f"]["txt"]))
                        if m["hasH"] and not m["h"]: bad.append(("manca Gita breve",))
                        T.check(f"zaino {tag}: scritte centrate, dentro la scheda, non sovrapposte", not bad, bad)
                        if done == 1 and goals == 5 and (w != 412 or lang in ("it", "de", "ru")):
                            el = await pg.query_selector("#nvEnergy" if m["kind"] == "casa" else ".tr20st")
                            if el: await el.screenshot(path=f"{SH}/zaino_{m['kind']}_{lang}_{w}.png")
                T.check(f"  nessun errore ({lang} {w}px {done}/{goals})", not pg.errs, pg.errs[:2])
                await ctx.close()
    print("scritte su una riga:", worst["one"], "su due righe:", worst["two"])
    # su un telefono normale (412) e in italiano "Viaggio completo" e "Gita breve" stanno su una riga
    st = T.base_state("it", done=["water"])
    ctx, pg = await T.page(b, st, age="adult", w=412, h=1000, lang="it-IT", wait=1800)
    await T.close_layer(pg)
    m = json.loads(await T.ev(pg, MEASURE))[0]
    # 412 px: "Gita breve" su una riga; "Viaggio completo" (circa 90 px anche a 11 px) non sta centrato su una riga sotto
    # l'ultima casella (ci sono circa 41 px per lato): due righe, centrate
    T.check("it 412 px: 'Gita breve' su una riga, 'Viaggio completo' centrato (due righe: su una non starebbe centrato)", m["h"]["lines"] == 1 and m["f"]["dc"] <= 1.5 and m["f"]["lines"] == 2, (m["f"], m["h"]))
    # dopo un cambio di larghezza (tablet / telefono girato) le scritte si risistemano: c'e' posto, una riga sola
    await pg.set_viewport_size({"width": 820, "height": 1000}); await pg.wait_for_timeout(600)
    m = json.loads(await T.ev(pg, MEASURE))[0]
    T.check("  dopo aver girato lo schermo (820 px): centrate e su una riga", m["f"]["dc"] <= 1.5 and m["h"]["dc"] <= 1.5 and m["f"]["lines"] == 1 and m["h"]["lines"] == 1, m)
    await ctx.close()

NAMES = ["", "Luca", "Massimiliano", "Maria Alessandra Ro", "Wwwwwwwwwwwwwwwwwwww"]  # fino a 20 caratteri (NAME_MAX)
ORN = """JSON.stringify((() => { const h = document.querySelector('#app h1.greet'); if (!h) return null; const gw = h.querySelector('.gw');
  const ha = getComputedStyle(h, '::after'); const o = gw.querySelector('.gwo'); const l = gw.querySelector('.gwl');
  if (!o || !l) return { hAfter: ha.content, o: !!o, l: !!l };
  const or = o.getBoundingClientRect(), oc = getComputedStyle(o);
  /* riga dell'ultima parola: il testo dentro .gwl (senza l'ornamento) */
  const rg = document.createRange(); rg.selectNodeContents(l.firstChild); const tr = [...rg.getClientRects()]; const t = tr[tr.length - 1];
  const hr = h.getBoundingClientRect();
  return { hAfter: ha.content, disp: oc.display, img: oc.backgroundImage.slice(0, 4), ow: or.width, oRight: or.right, hRight: hr.right,
           sameLine: or.left >= t.right - 0.5 && or.left - t.right <= 9 && or.top < t.bottom && or.bottom > t.top, dy: Math.abs((or.top + or.bottom) / 2 - (t.top + t.bottom) / 2),
           txt: gw.textContent, aria: o.getAttribute('aria-hidden') }; })())"""

async def ornament(b):
    for lang in T.LANGS:
        for w in ((360, 412) if lang in ("it", "de", "ru", "ja") else (360,)):
            ctx, pg = await T.page(b, T.base_state(lang), age="adult", w=w, h=900, lang="en-US", wait=1800)
            await T.close_layer(pg)
            bad = []
            # la stagione dipende dalla data: qui la si sceglie a mano (applyRoot la rimette a ogni render)
            await T.ev(pg, """window.__orn = ''; const _arT = applyRoot; applyRoot = function (...a) { _arT.apply(this, a); const r = document.documentElement;
              r.classList.remove('sea-stars', 'sea-kites', 'sea-lanterns'); r.removeAttribute('data-xmas'); if (__orn === 'xmas') r.setAttribute('data-xmas', '1'); else if (__orn) r.classList.add(__orn); }; 1""")
            for cls in ("xmas", "sea-stars", "sea-kites"):
                js = f"window.__orn = '{cls}'"
                for nm in NAMES:
                    await T.ev(pg, js + f"; S.uname = {json.dumps(nm)}; layer.innerHTML = ''; tab = 'today'; render(); 1"); await pg.wait_for_timeout(120)
                    r = json.loads(await T.ev(pg, ORN))
                    ok = r and r["hAfter"] in ("none", "normal") and r.get("disp") == "inline-block" and r["img"].startswith("url") and r["ow"] == 18 and r["sameLine"] and r["dy"] <= 3 and r["oRight"] <= r["hRight"] + 0.5 and r["aria"] == "true" and r["txt"].strip() == r["txt"]
                    if not ok: bad.append((cls, nm, r))
                    if cls == "xmas" and nm in ("Massimiliano", "Wwwwwwwwwwwwwwwwwwww") and (w == 360):
                        el = await pg.query_selector("#app h1.greet")
                        if el: await el.screenshot(path=f"{SH}/orn_{lang}_{w}_{len(nm)}.png")
            T.check(f"ornamento {lang} {w}px (3 stagioni, nomi fino a 20 caratteri): subito dopo il saluto, mai da solo su una riga, dentro lo schermo", not bad, bad[:2])
            # altre schede: il titolo h1 ha ancora l'ornamento dopo il testo
            for tab in ("home", "trips", "shop", "more"):
                await T.ev(pg, f"tab = '{tab}'; moreSub = null; render(); 1"); await pg.wait_for_timeout(250)
                o = json.loads(await T.ev(pg, """JSON.stringify((() => { const h = document.querySelector('#app h1:not(.greet)'); if (!h) return null; const a = getComputedStyle(h, '::after');
                  return { c: a.content, img: a.backgroundImage.slice(0, 4) }; })())"""))
                T.check(f"  {lang} {w}px scheda {tab}: titolo con l'ornamento come prima", o is None or (o["c"] == '""' and o["img"].startswith("url")), o)
                if lang == "it" and w == 412 and o:
                    el = await pg.query_selector("#app h1:not(.greet)")
                    if el: await el.screenshot(path=f"{SH}/orn_tab_{tab}.png")
            T.check(f"  nessun errore (ornamento {lang} {w})", not pg.errs, pg.errs[:2])
            await ctx.close()

async def gold(b):
    for plus in (False, True):
        for age in (("adult", "teen", "child") if not plus else ("adult",)):
            kw = dict(plusOn=True, plusSince="2026-11-01", plusCheck=0, plusMonth="2026-11") if plus else {}
            ctx, pg = await T.page(b, T.base_state("en", calm=False, lite=False, **kw), age=age, native=True, wait=2500)  # animazioni attive (per il luccichio)
            await T.close_layer(pg)
            T.check(f"fila d'oro: c'e' una stagione in corso ({age})", await T.ev(pg, "!!curSeason()"))
            if plus: await T.ev(pg, "S.plusOn = true; save(); 1")  # il controllo degli acquisti finto (nessun acquisto) l'aveva tolto
            await T.ev(pg, "passi = function () { return 350; }; 1")  # tre gradini raggiunti
            await T.ev(pg, "openPath(); 1"); await pg.wait_for_timeout(700)
            tier = await T.ev(pg, "sTier(passi(curSeason()), curSeason())")
            plus_now = await T.ev(pg, "plusActive()")
            T.check(f"fila d'oro ({'con' if plus else 'senza'} Plus, {age}): Plus {'attivo' if plus else 'non attivo'} come voluto", plus_now == plus, plus_now)
            await T.ev(pg, "openPath(); 1"); await pg.wait_for_timeout(500)
            d = json.loads(await T.ev(pg, """JSON.stringify((() => { const box = layer.querySelector('.pathbox'); const c = box.querySelector('#prow1 .pcell.g'); const cs = getComputedStyle(c);
              return { sheen: box.classList.contains('v113sheen'), pills: [...box.querySelectorAll('.pcell.g.lockg:not(.done) .plk .plkt')].map((x) => x.textContent), lock: box.querySelectorAll('.pcell.g.lockg:not(.done)').length,
                       filter: cs.filter, bg: cs.backgroundImage.slice(0, 15), before: getComputedStyle(c, '::before').animationName }; })())"""))
            if not plus:
                T.check(f"  aspetto ({age}): ogni ricompensa d'oro bloccata ha la pillola 'With Plus', oro pieno (niente filtro sbiadito)", d["lock"] > 0 and len(d["pills"]) == d["lock"] and all(x == "With Plus" for x in d["pills"]) and d["filter"] == "none" and d["bg"].startswith("linear-gradient"), d)
                T.check(f"  aspetto ({age}): luccichio {'si' if age == 'adult' else 'no (nessun invito che si muove per i minori)'}", d["sheen"] == (age == "adult") and ((d["before"] == "v113sheen") == (age == "adult")), d)
            else:
                T.check("  con Plus: nessuna pillola 'With Plus' e nessun luccichio sulle ricompense", d["lock"] == 0 and not d["pills"], d)
            # ricompensa raggiunta (riga 1) e una bloccata (piu' in basso): tocco al centro della figura
            for row, what in ((1, "raggiunta"), (min(tier + 2, 12), "bloccata")):
                await T.ev(pg, f"layer.innerHTML = ''; openPath(); const r = document.getElementById('prow{row}'); r && r.scrollIntoView({{ block: 'center' }}); 1"); await pg.wait_for_timeout(500)
                sel = f"#prow{row} .pcell.g svg, #prow{row} .pcell.g img, #prow{row} .pcell.g .pl"
                el = await pg.query_selector(sel)
                before = json.loads(await T.ev(pg, "JSON.stringify({ g: sClaims(curSeason()).g.slice(), s: S.seeds })"))
                if el: await el.click()
                await pg.wait_for_timeout(700)
                r = json.loads(await T.ev(pg, "JSON.stringify({ plus: !!document.querySelector('.plusbox'), path: !!document.querySelector('.pathbox'), g: sClaims(curSeason()).g.slice() })"))
                if not plus:
                    T.check(f"  senza Plus ({age}), ricompensa d'oro {what} (riga {row}): si apre Tanetto Plus", el is not None and r["plus"], (sel, r))
                    if age == "child" and r["plus"]:
                        T.check(f"  {age}: nella pagina di Plus c'e' 'chiedi a un adulto' (come gia' previsto per i minori)", await T.ev(pg, "!!document.querySelector('.plusbox .ageadult')"))
                else:
                    T.check(f"  con Plus, ricompensa d'oro {what} (riga {row}): nessuna pagina di Plus", el is not None and not r["plus"], r)
            if plus:
                await T.ev(pg, "layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(500)
                n0 = len(json.loads(await T.ev(pg, "JSON.stringify(sClaims(curSeason()).g)")))
                await pg.click("#prow1 .pcell.g button[data-claim]"); await pg.wait_for_timeout(700)
                n1 = len(json.loads(await T.ev(pg, "JSON.stringify(sClaims(curSeason()).g)")))
                T.check("  con Plus: 'Prendi' prende il premio d'oro (come prima)", n1 == n0 + 1 and not await T.ev(pg, "!!document.querySelector('.plusbox')"), (n0, n1))
            else:
                # la corona (pulsante accessibile) apre ancora Plus, una volta sola
                await T.ev(pg, "layer.innerHTML = ''; openPath(); window.__po = 0; const _o = openPlus; openPlus = function (...a) { window.__po++; return _o.apply(this, a); }; 1"); await pg.wait_for_timeout(400)
                await pg.click("#prow1 .pcell.g .plk"); await pg.wait_for_timeout(600)
                po = await T.ev(pg, "[window.__po, !!document.querySelector('.plusbox')]")
                T.check(f"  senza Plus ({age}): la corona apre Plus una volta sola", po == [1, True], po)
                # colonna gratuita: invariata (Prendi)
                await T.ev(pg, "layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(400)
                bf = await T.ev(pg, "!!document.querySelector('#prow1 .pcell.f button[data-claim]')")
                if bf:
                    await pg.click("#prow1 .pcell.f button[data-claim]"); await pg.wait_for_timeout(600)
                T.check(f"  senza Plus ({age}): la colonna gratuita resta 'Prendi' (nessuna pagina di Plus)", bf and await T.ev(pg, "sClaims(curSeason()).f.includes(1)") and not await T.ev(pg, "!!document.querySelector('.plusbox')"))
            T.check(f"  nessun errore (fila d'oro, {age}, Plus {plus})", not pg.errs, pg.errs[:2])
            await ctx.close()

async def gold_more(b):
    # "Con Plus" in 14 lingue (testo dell'app, mai la parola inglese fuori dall'inglese)
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", native=True, wait=2500)
    await T.close_layer(pg); await T.ev(pg, "passi = function () { return 350; }; 1")
    got = {}
    for lang in T.LANGS:
        got[lang] = json.loads(await T.ev(pg, f"S.lang = '{lang}'; layer.innerHTML = ''; openPath(); JSON.stringify([...layer.querySelectorAll('.pcell.g.lockg:not(.done) .plkt')].map((x) => x.textContent).slice(0, 2).concat([layer.querySelector('#prow1 .plk').getAttribute('aria-label')]))"))
    T.check("'Con Plus' nelle 14 lingue (pillola e inizio del nome letto dal lettore di schermo)", all(v[0] == v[1] and v[2].startswith(v[0] + " – ") for v in got.values()) and len({v[0] for v in got.values()}) >= 12 and got["it"][0] == "Con Plus" and got["de"][0] == "Mit Plus", got)
    # Plus chiuso senza comprare: si torna al sentiero, nello stesso punto
    await T.ev(pg, "S.lang = 'en'; layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(400)
    await T.ev(pg, "document.getElementById('prow6').scrollIntoView({ block: 'center' }); 1"); await pg.wait_for_timeout(300)
    y0 = await T.ev(pg, "document.getElementById('pathList').scrollTop")
    await pg.click("#prow6 .pcell.g .pl"); await pg.wait_for_timeout(600)
    T.check("  tocco su una ricompensa d'oro: si apre Plus", await T.ev(pg, "!!layer.querySelector('.plusbox')"))
    await pg.click(".plusbox #closeLayer"); await pg.wait_for_timeout(700)
    r = json.loads(await T.ev(pg, "JSON.stringify({ path: !!layer.querySelector('.pathbox'), y: (document.getElementById('pathList') || {}).scrollTop })"))
    T.check("  Plus chiuso senza comprare: si torna al sentiero nello stesso punto", r["path"] and abs(r["y"] - y0) <= 2, (y0, r))
    # Plus dalla fila d'oro -> Termini (sostituisce Plus senza chiuderlo) -> chiudi -> piu' tardi Plus da un'altra parte -> chiudi: niente sentiero
    await T.ev(pg, "layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(400)
    await pg.click("#prow2 .pcell.g .pl"); await pg.wait_for_timeout(600)
    await T.ev(pg, "(layer.querySelector('.plusbox [data-doc]') || {}).click && layer.querySelector('.plusbox [data-doc]').click(); 1"); await pg.wait_for_timeout(600)
    doc_open = await T.ev(pg, "!layer.querySelector('.plusbox') && !!layer.innerHTML")
    await T.ev(pg, "closeLayer(); 1"); await pg.wait_for_timeout(400)
    T.check("  Plus dalla fila d'oro sostituito dai Termini: chiudendo i Termini il sentiero non si apre", not await T.ev(pg, "!!layer.querySelector('.pathbox')"))
    await T.close_layer(pg); await T.ev(pg, "tab = 'more'; render(); openPlus('profilo'); 1"); await pg.wait_for_timeout(400)
    await pg.click(".plusbox #closeLayer"); await pg.wait_for_timeout(500)
    T.check("  Plus dalla fila d'oro, poi Termini, poi Plus da un'altra parte: chiudendo non si apre il sentiero", doc_open and not await T.ev(pg, "!!layer.querySelector('.pathbox')"), doc_open)
    # con la tastiera (Invio sulla corona della prima riga): Plus si apre una volta e chiudendo si torna al sentiero
    await T.close_layer(pg); await T.ev(pg, "openPath(); 1"); await pg.wait_for_timeout(400)
    await pg.focus("#prow1 .pcell.g .plk"); await pg.keyboard.press("Enter"); await pg.wait_for_timeout(600)
    k1 = await T.ev(pg, "!!layer.querySelector('.plusbox')")
    await pg.click(".plusbox #closeLayer"); await pg.wait_for_timeout(600)
    T.check("  tastiera: Invio sulla corona apre Plus; chiudendo si torna al sentiero", k1 and await T.ev(pg, "!!layer.querySelector('.pathbox')"))
    await T.close_layer(pg); await T.ev(pg, "tab = 'today'; render(); openPlus('altro'); 1"); await pg.wait_for_timeout(400)
    await pg.click(".plusbox #closeLayer"); await pg.wait_for_timeout(500)
    T.check("  Plus aperto da un'altra parte e chiuso: il sentiero non si apre da solo", not await T.ev(pg, "!!layer.querySelector('.pathbox')"))
    await ctx.close()
    # premi d'oro gia' presi con Plus, poi Plus scaduto: niente manina, il tocco non apre Plus
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", native=True, wait=2500)
    await T.close_layer(pg)
    await T.ev(pg, "passi = function () { return 350; }; sClaims(curSeason()).g.push(1); save(); layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(400)
    r = json.loads(await T.ev(pg, "JSON.stringify((() => { const c = document.querySelector('#prow1 .pcell.g'); return { done: c.classList.contains('done'), cur: getComputedStyle(c).cursor }; })())"))
    await pg.click("#prow1 .pcell.g .pl"); await pg.wait_for_timeout(500)
    T.check("Plus scaduto, premio d'oro gia' preso: niente manina e il tocco non apre Plus", r["done"] and r["cur"] != "pointer" and not await T.ev(pg, "!!layer.querySelector('.plusbox')"), r)
    await ctx.close()
    # niente luccichio con "riduci movimento" o con la modalita' leggera
    for what in ("reduce", "lite"):
        ctx, pg = await T.page(b, T.base_state("en", calm=False, lite=(what == "lite")), age="adult", native=True, wait=2500)
        if what == "reduce": await pg.emulate_media(reduced_motion="reduce")
        await T.close_layer(pg); await T.ev(pg, "passi = function () { return 350; }; layer.innerHTML = ''; openPath(); 1"); await pg.wait_for_timeout(400)
        a = await T.ev(pg, "getComputedStyle(document.querySelector('#prow1 .pcell.g'), '::before').animationName")
        T.check(f"  luccichio spento con {'riduci movimento' if what == 'reduce' else 'modalita leggera'}", a in ("none", ""), a)
        await ctx.close()

async def main(b):
    await gold(b)
    await gold_more(b)
    await ornament(b)
    await zaino(b)

T.run(main)
