"""1.0.10 blocco 1: minori ed eta' non detta (M-01, E-02, E-10, CR-07, G2-07, G2-05), promemoria (M-16), statistiche (M-11).
Ogni controllo ha anche il caso "adulto" che deve restare come prima (cosi' il test fallisce se la protezione e' troppo larga)."""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T

async def plus_offer(b, age):
    st = T.base_state("en", day="2026-11-16", firstDay="2026-11-14", visit={"n": 2, "last": "2026-11-15"})
    ctx, pg = await T.page(b, st, native=True, age=age, wait=4000)
    await T.close_layer(pg)
    await T.ev(pg, "completeGoal('water'); 1"); await pg.wait_for_timeout(7500)
    n = await T.ev(pg, "document.querySelectorAll('.nvplus').length")
    errs = pg.errs[:]; await ctx.close(); return n, errs

async def main(b):
    # 1) offerta Plus automatica
    for age, want in [("child", 0), ("skip", 0), ("none", 0), ("teen", 0), ("adult", 1)]:
        n, errs = await plus_offer(b, age)
        check = T.check
        check(f"offerta 'Prova Plus' da sola, eta' {age}: {'mai' if not want else 'si (come prima)'}", (n > 0) == bool(want), n)
        check(f"  nessun errore ({age})", not errs, errs[:2])
    # 2) "Invita un amico" a tutto fatto
    for age, want in [("child", False), ("adult", True)]:
        st = T.base_state("en", goals=("water", "walk", "read"))
        ctx, pg = await T.page(b, st, age=age)
        await T.close_layer(pg)
        for g in ("water", "walk", "read"):
            await T.ev(pg, f"completeGoal('{g}'); 1"); await pg.wait_for_timeout(1500)
        await pg.wait_for_timeout(3000)
        n = await T.ev(pg, "document.querySelectorAll('.alldone #invite').length")
        T.check(f"'Invita un amico' a tutto fatto, eta' {age}: {'presente' if want else 'assente'}", (n > 0) == want, n)
        await ctx.close()
    # 3) prima configurazione: fila dei compagni Plus
    for age, want in [("none", False), ("adult", True)]:
        ctx, pg = await T.page(b, None, age=age, wait=3000)
        await pg.click("#nameNext"); await pg.wait_for_timeout(900)
        n = await T.ev(pg, "document.querySelectorAll('.ppsec').length"); onb = await T.ev(pg, "S.onboard")
        T.check(f"prima configurazione (passo {onb}), eta' {age}: compagni Plus {'visibili' if want else 'nascosti'}", (n > 0) == want, n)
        T.check(f"  i 3 compagni gratuiti ci sono sempre ({age})", await T.ev(pg, "document.querySelectorAll('[data-pet]').length") >= 3)
        T.check(f"  nessun errore ({age})", not pg.errs, pg.errs[:2])
        await ctx.close()
    # 4) "Torna domani" + 5) testo dei video
    for age in ("child", "adult"):
        st = T.base_state("en", done=["water"], giftDay="2026-11-16", visit={"n": 5, "last": "2026-11-16"}, adsOk=1, log=[{"d": "2026-11-16", "g": "water"}])
        ctx, pg = await T.page(b, st, native=True, age=age, wait=8000)
        await T.close_layer(pg)
        await T.ev(pg, "tab = 'more'; moreSub = 'prog'; render(); 1"); await pg.wait_for_timeout(500)
        for _ in range(30):
            if await T.ev(pg, "!!document.getElementById('adGift')"): break
            await pg.wait_for_timeout(500); await T.ev(pg, "render(); 1")
        tz = await T.ev(pg, "(document.querySelector('.teaser .tz') || {}).textContent || ''")
        dots = await T.ev(pg, "document.querySelectorAll('.teaser .gdots').length")
        if age == "child":
            T.check("bambino: 'Torna domani' senza numeri", tz and not any(c.isdigit() for c in tz), tz)
            T.check("bambino: senza la fila dei 7 giorni", dots == 0, dots)
        else:
            T.check("adulto: 'Torna domani' con il valore del regalo (come prima)", any(c.isdigit() for c in tz), tz)
            two = await T.ev(pg, "(document.querySelector('.teaser .v26two') || {}).textContent || ''")
            T.check("G2-06 una riga spiega le due serie (regali = aperture, trofei = obiettivi)", "open Tanetto" in two and "trophies" in two, two)
        g1 = await T.ev(pg, "(document.getElementById('adGift') || {}).textContent || ''")
        if age == "child":
            T.check("bambino: il video non dice 'double' ('an extra gift')", g1 and "double" not in g1.lower() and "extra gift" in g1, g1)
        else:
            T.check("adulto, primo video: 'double your gift' (come prima)", "double your gift" in g1, g1)
            await pg.click("#adGift"); await pg.wait_for_timeout(1500)
            toast = await T.ev(pg, "(document.getElementById('toast') || {}).textContent || ''")
            T.check("adulto, dopo il primo video: 'Gift doubled' (vero)", "doubled" in toast.lower(), toast)
            g2 = await T.ev(pg, "(document.getElementById('adGift') || {}).textContent || ''")
            T.check("adulto, secondo video: niente 'double' ('an extra gift', come nella 1.0.9)", g2 and "double" not in g2.lower() and "extra gift" in g2, g2)
            await pg.click("#adGift"); await pg.wait_for_timeout(1500)
            toast = await T.ev(pg, "(document.getElementById('toast') || {}).textContent || ''")
            T.check("adulto, dopo il secondo video: niente 'doubled' ('Extra gift')", "doubled" not in toast.lower() and "Extra gift" in toast, toast)
        T.check(f"  nessun errore ({age})", not pg.errs, pg.errs[:2])
        await ctx.close()
    # 6) promemoria
    for lang in T.LANGS:
        st = T.base_state(lang, notif=True, rem="ok", visit={"n": 5, "last": "2026-11-16"})
        ctx, pg = await T.page(b, st, native=True, age="adult", lang="en-US", wait=2500)
        await T.ev(pg, "notifSchedule(); 1"); await pg.wait_for_timeout(1500)
        ns = await T.ev(pg, "JSON.stringify(window.__notifs || [])"); ns = json.loads(ns)
        allm = await T.ev(pg, "JSON.stringify(V19N[S.lang].msgs.concat([L().v12.remTitle('X')]))"); allm = json.loads(allm)
        bad = ["waiting", "is waiting", "door", "smile is back", "ti aspetta", "la porta", "wartet", "zur tür", "te espera", "la puerta", "t'attend", "la porte", "te esperando", "a porta", "待って", "ドア", "기다리는", "당신을 기다", "문 쪽", "在等你", "门口", "門口", "ждёт", "на дверь", "czeka", "drzwi", "wacht op", "deur", "bekliyor", "kapıdan", "isn't over", "non è ancora finita", "noch nicht vorbei", "believes in you", "crede in te"]
        hits = [m for m in allm if any(x in m.lower() for x in bad)]
        T.check(f"promemoria {lang}: nessuna frase di attesa/pressione ({len(allm)} testi)", not hits, hits[:3])
        T.check(f"  {lang}: promemoria programmati ({len(ns)})", len(ns) >= 5, len(ns))
        await ctx.close()
    st = T.base_state("en", notif=True, rem="ok", days={d: {"all": True} for d in ["2026-11-13", "2026-11-14", "2026-11-15"]})
    for age in ("child", "adult"):
        ctx, pg = await T.page(b, st, native=True, age=age, wait=2500)
        stk = await T.ev(pg, "streak()")
        await T.ev(pg, "notifSchedule(); 1"); await pg.wait_for_timeout(1500)
        ns = json.loads(await T.ev(pg, "JSON.stringify(window.__notifs || [])"))
        b0 = (ns[0]["body"] if ns else "")
        if age == "child": T.check(f"bambino, serie {stk}: il promemoria di oggi non parla della serie", "in a row" not in b0, b0)
        else: T.check(f"adulto, serie {stk}: 'N days in a row ... If you feel like it'", stk < 3 or ("in a row" in b0 and "feel like it" in b0), b0)
        await ctx.close()
    # 7) statistiche
    async def hits(age, pref=None, fresh=False):
        extra = "" if pref is None else f"localStorage.setItem('tanetto-statistiche','{pref}');"
        ctx, pg = await T.page(b, None if fresh else T.base_state("en"), age=age, extra_js=extra, wait=3000, native=True)
        await T.ev(pg, "trackOnce('prova-t110-' + Math.random()); track('prova2'); 1"); await pg.wait_for_timeout(800)
        n = len(pg.gc); sw = await T.ev(pg, "typeof v26StatsCard === 'function' ? v26StatsCard() : ''")
        await ctx.close(); return n, sw
    n, _ = await hits("none", fresh=True); T.check("statistiche: primo avvio, eta' non ancora chiesta -> 0 conteggi", n == 0, n)
    n, sw = await hits("child"); T.check("statistiche: bambino -> 0 conteggi", n == 0, n)
    T.check("  bambino: interruttore spento e bloccato, con la spiegazione", 'aria-checked="false"' in sw and "disabled" in sw and "digital consent" in sw, sw[:200])
    n, _ = await hits("skip"); T.check("statistiche: eta' non detta -> 0 conteggi", n == 0, n)
    n, sw = await hits("adult"); T.check("statistiche: adulto, nessuna scelta -> conteggi come prima", n >= 1, n)
    T.check("  adulto: interruttore acceso", 'aria-checked="true"' in sw and "disabled" not in sw, sw[:200])
    n, _ = await hits("adult", "0"); T.check("statistiche: adulto che le ha spente -> 0 conteggi", n == 0, n)
    # interruttore vero nel Profilo
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    await T.close_layer(pg)
    await T.ev(pg, "tab = 'more'; moreSub = 'priv'; render(); 1"); await pg.wait_for_timeout(600)
    vis = await T.ev(pg, "(() => { const b = document.getElementById('v26Stats'); return !!b && b.getClientRects().length > 0; })()")
    T.check("Profilo › Privacy ed eta': interruttore 'Statistiche anonime' visibile", vis)
    if vis:
        await pg.click("#v26Stats"); await pg.wait_for_timeout(300)
        T.check("  tocco: spente e ricordate", await T.ev(pg, "localStorage.getItem('tanetto-statistiche')") == "0" and await T.ev(pg, "document.getElementById('v26Stats').getAttribute('aria-checked')") == "false")
    r = json.loads(await T.ev(pg, "JSON.stringify({ n: document.querySelectorAll('.v26psplit p').length, long: Math.max(0, ...[...document.querySelectorAll('.v26psplit p')].map((p) => Math.round(p.getBoundingClientRect().height / parseFloat(getComputedStyle(p).lineHeight)))), g: (document.getElementById('v26AgeG') || {}).textContent || '' })"))
    T.check(f"G2-10 privacy: una frase per riga ({r['n']} righe, la piu' lunga {r['long']} righe a 412 px)", r["n"] >= 4 and r["long"] <= 5, r)
    T.check("G2-10 eta': la scheda dice la fascia d'eta' data ('18 or older')", "18 or older" in r["g"], r["g"])
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # 8) informativa: la frase nuova c'e' in tutte le lingue (app) e nella pagina pubblica
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", wait=2500)
    miss = await T.ev(pg, "Object.keys(T).filter((l) => !T[l].privDoc.some((p) => p.includes(T[l].v26.privStats)))")
    T.check("informativa nell'app: frase sull'interruttore in 14 lingue", miss == [], miss)
    await ctx.close()
    pp = open(os.path.join(T.REPO, "privacy.html"), encoding="utf-8").read()
    T.check("privacy.html: frase sull'interruttore (en, it)", "You can turn the statistics off at any time" in pp and "Puoi spegnere le statistiche quando vuoi" in pp)

T.run(main)
