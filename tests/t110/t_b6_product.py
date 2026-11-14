"""1.0.11 blocchi 4 e 6: testi e prodotto (M-40, E-04, E-08, E-11, E-14, E-15, G2-11, M-37, M-39, I-07, G3-08, C-07, C-11, C-20,
C-22, C-13, C-01..C-04, F-06, G3-05, G1-07). Ogni controllo fallisce sulla build di prima."""
import json, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T

async def main(b):
    # --- M-40 bentornato a livelli (Natale, 10 giorni di assenza)
    st = T.base_state("en", day="2026-12-05", visit={"n": 5, "last": "2026-12-05"}, backDay="2026-01-01", rem="no", tut=99)
    ctx, pg = await T.page(b, st, age="adult", date=(2026, 12, 15, 10, 7), wait=4500)
    has = await T.ev(pg, "!!layer.querySelector('.wgbox')")
    if not has: await T.ev(pg, "openWelcomeBack(); 1"); await pg.wait_for_timeout(500)
    txt = await T.ev(pg, "layer.innerText")
    T.check("M-40 dopo 10 giorni a dicembre: riga sull'albero di Natale", "Christmas tree" in txt, txt[:300])
    T.check("M-40 'Start gently: just 1 goal today'", await T.ev(pg, "!!document.getElementById('v26Light')"))
    T.check("E-11 una nuova proposta del promemoria (era stato rifiutato)", await T.ev(pg, "!!document.getElementById('v26Rem')"))
    await pg.click("#v26Light"); await pg.wait_for_timeout(600)
    T.check("  ripartenza leggera: oggi 1 solo obiettivo", await T.ev(pg, "todayGoals().length") == 1)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    st = T.base_state("en", day="2026-12-12", visit={"n": 5, "last": "2026-12-12"}, backDay="2026-01-01")
    ctx, pg = await T.page(b, st, age="adult", date=(2026, 12, 15, 10, 7), wait=4500)
    if not await T.ev(pg, "!!layer.querySelector('.wgbox')"): await T.ev(pg, "openWelcomeBack(); 1"); await pg.wait_for_timeout(500)
    T.check("M-40 dopo 3 giorni: bentornato semplice (niente righe in piu')", await T.ev(pg, "!!layer.querySelector('.wgbox') && !layer.querySelector('.v26wb')"))
    T.check("G1-07 nessun 'was waiting for you' nel bentornato", "waiting" not in (await T.ev(pg, "T.en.v12.backP.map((f) => f('Germo')).join(' ')")))
    await ctx.close()
    # --- E-08 respiro
    st = T.base_state("en", goals=("water", "walk", "breathe"))
    ctx, pg = await T.page(b, st, age="adult")
    await T.close_layer(pg); await T.ev(pg, "breathe(); 1"); await pg.wait_for_timeout(400)
    T.check("E-08 'Breathe with me' ha 'I already did it'", await T.ev(pg, "!!document.getElementById('v26BrDid')"))
    await pg.click("#v26BrDid"); await pg.wait_for_timeout(1200)
    T.check("  il tocco spunta l'obiettivo", await T.ev(pg, "S.done.includes('breathe')"))
    await ctx.close()
    # --- E-14 prossimo traguardo, G2-11 versione, E-15 risposte veloci, I-07 dove disdire
    days = {f"2026-11-{d:02d}": {"done": 5, "total": 5} for d in range(6, 16)}
    st = T.base_state("en", days=days, trophies={"7": {"at": "2026-11-12", "p": True}})
    ctx, pg = await T.page(b, st, age="adult", native=True)
    await T.close_layer(pg); await T.ev(pg, "tab = 'today'; render(); 1"); await pg.wait_for_timeout(400)
    ng = await T.ev(pg, "(document.querySelector('.nextgoal') || {}).textContent || ''")
    T.check(f"E-14 dopo una settimana: '{ng}'", "Next trophy" in ng and "14" in ng, ng)
    await T.ev(pg, "tab = 'more'; moreSub = 'about'; render(); 1"); await pg.wait_for_timeout(400)
    ver = await T.ev(pg, "(document.getElementById('v26Ver') || {}).textContent || ''")
    gr = open(os.path.join(T.REPO, "app-android/android/app/build.gradle")).read(); vn = re.search(r'versionName "([^"]+)"', gr).group(1)
    T.check(f"G2-11 versione in Informazioni '{ver}' = build.gradle {vn}", vn in ver and await T.ev(pg, "(() => { const e = document.getElementById('v26Ver'); return !!e && e.getClientRects().length > 0; })()"), ver)
    await T.ev(pg, "tab = 'more'; moreSub = 'help'; render(); 1"); await pg.wait_for_timeout(400)
    r = json.loads(await T.ev(pg, "JSON.stringify({ n: document.querySelectorAll('#v26Faq details').length, vis: (() => { const e = document.getElementById('v26Faq'); return !!e && e.getClientRects().length > 0; })(), link: !!document.querySelector('#v26Faq a[href*=\"subscriptions\"]') })"))
    T.check("E-15 'Quick answers': 5 domande visibili in Aiuto, con il collegamento agli abbonamenti", r["n"] == 5 and r["vis"] and r["link"], r)
    await T.ev(pg, "openPlus('t'); 1"); await pg.wait_for_timeout(1500)
    if await T.ev(pg, "!!document.querySelector('[data-plan=\"month\"]')"):
        await pg.click('[data-plan="month"]'); await pg.wait_for_timeout(300)
        a = await T.ev(pg, "(document.getElementById('plusAfterTxt') || {}).textContent || ''")
        T.check("I-07 piano mensile: dice dove disdire (Google Play)", "Google Play" in a, a)
    else: T.check("I-07 piano mensile presente nella finestra Plus", False)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- M-37 benvenuto animato solo la prima volta del giorno, fondo scuro in tema scuro
    st = T.base_state("en"); st["calm"] = False; st["lite"] = False
    ctx, pg = await T.page(b, st, age="adult", scheme="dark")
    await T.ev(pg, "document.querySelectorAll('.splash').forEach((x) => x.remove()); sessionStorage.removeItem('splash'); delete S.v26splash; splash(); 1"); await pg.wait_for_timeout(150)
    r1 = json.loads(await T.ev(pg, "JSON.stringify({ n: document.querySelectorAll('.splash').length, bg: document.querySelector('.splash') ? getComputedStyle(document.querySelector('.splash')).backgroundColor : '' })"))
    await pg.wait_for_timeout(2500)
    await T.ev(pg, "document.querySelectorAll('.splash').forEach((x) => x.remove()); sessionStorage.removeItem('splash'); splash(); 1"); await pg.wait_for_timeout(150)
    n2 = await T.ev(pg, "document.querySelectorAll('.splash').length")
    T.check(f"M-37 prima apertura del giorno: benvenuto animato, fondo scuro {r1['bg']}", r1["n"] == 1 and r1["bg"] == "rgb(26, 23, 20)", r1)
    T.check("M-37 seconda apertura nello stesso giorno: niente benvenuto animato", n2 == 0, n2)
    await ctx.close()
    # --- M-39 stagioni in tutte le schede
    for date, cls in (((2026, 12, 10, 10, 7), "xmas"), ((2027, 1, 15, 10, 7), "sea-stars"), ((2027, 3, 15, 10, 7), "sea-kites")):
        ctx, pg = await T.page(b, T.base_state("en", day=f"{date[0]}-{date[1]:02d}-{date[2]:02d}"), age="adult", date=date)
        await T.close_layer(pg); await T.ev(pg, "tab = 'trips'; render(); 1"); await pg.wait_for_timeout(400)
        bi = await T.ev(pg, "(() => { const h = document.querySelector('#app h1'); return h ? getComputedStyle(h, '::after').backgroundImage : ''; })()")
        T.check(f"M-39 {cls}: ornamento della stagione anche nella scheda Viaggi", "svg" in bi, bi[:80])
        await ctx.close()
    # --- testi: plurali, coreano, francese, chi sei, titolo, viaggio
    ctx, pg = await T.page(b, T.base_state("en", pet="ondi"), age="adult")
    await T.close_layer(pg)
    r = json.loads(await T.ev(pg, """JSON.stringify({
      pl: ['es', 'fr', 'pt', 'nl'].map((l) => T[l].summary(1, 'x') + ' | ' + T[l].gameEnd(1) + ' | ' + T[l].comicEnd(1)),
      ru: T.ru.wk ? T.ru.wk.days(5) : '', who: chatReply('who are you?').text, ttl: (render(), document.title),
      trip: [TR20T.en.ctaB, NAV20_T.en.enGo, T.en.v13.allB], it: [T.it.v12.backT, T.it.resetAsk, T.es.resetAsk],
      ko: Object.values(T.ko).filter((x) => typeof x === 'string').join(' ') })"""))
    T.check("C-01/C-02 plurali con 1 (es/fr/pt/nl)", not any(re.search(r"\b1 (objetivos|objectifs|metas|doelen|puntos|points|pontos|punten|pasitos|petits pas|passinhos|kleine)\b", x) for x in r["pl"]), r["pl"])
    T.check("C-04 russo 'за день 5 раз'", "за день 5 раз" in r["ru"], r["ru"])
    T.check(f"G3-08 'chi sei' dice che animale e': {r['who'][:90]}", "otter" in r["who"].lower(), r["who"])
    T.check("C-20 titolo della pagina 'Tanetto'", r["ttl"] == "Tanetto", r["ttl"])
    T.check("C-22 un solo nome per 'scegli un viaggio' e niente freccia scritta", len(set(r["trip"])) == 1 and "→" not in r["trip"][1], r["trip"])
    T.check("F-06 italiano/spagnolo senza forme al maschile verso chi usa l'app", "Bentornat" not in r["it"][0] and not r["it"][1].startswith("Sicuro") and not r["it"][2].startswith("¿Seguro"), r["it"])
    T.check("G3-05 coreano senza 당신", "당신" not in r["ko"])
    await ctx.close()
    ctx, pg = await T.page(b, T.base_state("ko"), age="adult", lang="ko")
    await T.close_layer(pg); bad = []
    for code in ("tab='today'; render(); 1", "tab='more'; moreSub='acct'; render(); 1", "tab='trips'; render(); 1", "openTaniShop('t'); 1"):
        await T.ev(pg, code); await pg.wait_for_timeout(500)
        bad += re.findall(r"\S*(?:이\(가\)|은\(는\)|을\(를\)|와\(과\)|\(으\)로)\S*", await T.ev(pg, "document.body.innerText"))
    await T.ev(pg, "toast(L().acct.saved(S.petName)); 1"); await pg.wait_for_timeout(300)
    bad += re.findall(r"\S*(?:이\(가\)|은\(는\)|을\(를\))\S*", await T.ev(pg, "document.getElementById('toast').textContent"))
    T.check("C-07 coreano: nessuna particella doppia '이(가)' sullo schermo", not bad, bad[:5])
    await ctx.close()
    ctx, pg = await T.page(b, T.base_state("fr"), age="adult", lang="fr-FR")
    await T.close_layer(pg); await T.ev(pg, "tab='more'; moreSub='help'; render(); 1"); await pg.wait_for_timeout(500)
    txt = await T.ev(pg, "document.getElementById('app').innerText")
    T.check("C-11 francese: niente spazio normale prima di : ; ! ?", not re.search(r" [:;!?]", txt), re.findall(r".{8} [:;!?]", txt)[:3])
    await ctx.close()
    # --- C-13 settimana dalla domenica (telefono in inglese USA)
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", lang="en-US")
    await T.close_layer(pg); await T.ev(pg, "tab='diary'; render(); 1"); await pg.wait_for_timeout(300)
    wd = await T.ev(pg, "[...document.querySelectorAll('.cal .wd')].map((x) => x.textContent).join('')")
    T.check(f"C-13 calendario con telefono en-US: la settimana parte da domenica ({wd})", wd.startswith("S"), wd)
    await ctx.close()
    # --- E-04 pausa tra le offerte di Plus
    src = open(os.path.join(T.REPO, "src/98f_v20_nav.js"), encoding="utf-8").read()
    T.check("E-04 offerte di Plus distanziate (pausa 5 giorni)", "NAV20_PLUS_PAUSE = 5" in src)

T.run(main)
