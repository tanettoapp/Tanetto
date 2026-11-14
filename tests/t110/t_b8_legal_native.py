"""1.0.11 blocco 8: licenze (M-14/I-10), condizioni (I-09), cancellazione per i minori (I-08), parti native (M-17 VIBRATE,
H-07 permessi, G-14/H-08 regole di backup, M-45/G-07 indietro, CR-04 canale dei promemoria, G-13 splash scuro, G-17 fuso orario)."""
import json, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T
AND = os.path.join(T.REPO, "app-android/android/app/src/main")

async def main(b):
    lic = open(os.path.join(T.REPO, "licenses.html"), encoding="utf-8").read()
    T.check("M-14 licenses.html: testi completi OFL 1.1, MIT, ISC, Apache 2.0", all(x in lic for x in ("SIL OPEN FONT LICENSE Version 1.1", "MIT License", "ISC License", "Apache License", "END OF TERMS AND CONDITIONS")))
    T.check("M-14 componenti citati: Caveat, Capacitor, Firebase, Lucide, GSAP", all(x in lic for x in ("Caveat", "Capacitor", "Firebase", "Lucide", "GSAP")))
    prep = open(os.path.join(T.REPO, "app-android/prep_www.py"), encoding="utf-8").read()
    T.check("M-14 licenses.html copiata anche nell'app (prep_www.py)", '"licenses.html"' in prep)
    ctx, pg = await T.page(b, T.base_state("it"), age="adult", lang="it-IT")
    await T.close_layer(pg); await T.ev(pg, "tab = 'more'; moreSub = 'about'; render(); 1"); await pg.wait_for_timeout(400)
    vis = await T.ev(pg, "(() => { const e = document.getElementById('v26Lic'); return !!e && e.getClientRects().length > 0; })()")
    T.check("M-14 pulsante 'Licenze open source' in Informazioni", vis)
    if vis:
        await pg.click("#v26Lic"); await pg.wait_for_timeout(1200)
        txt = await T.ev(pg, "layer.innerText")
        T.check("  si apre la finestra con le licenze (Apache e OFL)", "Apache License" in txt and "OPEN FONT LICENSE" in txt, txt[:120])
        r = json.loads(await T.ev(pg, "JSON.stringify((() => { let w = 0; layer.querySelectorAll('pre, p, div').forEach((e) => { w = Math.max(w, e.getBoundingClientRect().right); }); return { w, iw: innerWidth }; })())"))
        T.check("  testo dentro lo schermo", r["w"] <= r["iw"] + 0.5, r)
    terms = await T.ev(pg, "L().terms.join(' ')")
    T.check("I-09 condizioni: diritti del consumatore, minori, legge italiana", "consumatore" in terms and "minorenne" in terms and "legge italiana" in terms, terms[:150])
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    pp = open(os.path.join(T.REPO, "privacy.html"), encoding="utf-8").read()
    T.check("I-09 pagina pubblica: condizioni nuove (en, it)", "legal rights as a consumer" in pp and "legge italiana" in pp)
    # I-08: minore con un account rimasto -> collegamento alla pagina di cancellazione
    ctx, pg = await T.page(b, T.base_state("en"), age="child", native=True)
    h = await T.ev(pg, "acctCard()")
    T.check("I-08 minore: nella scheda dell'account c'e' la pagina per cancellare l'account", "elimina-account.html" in h, h[:200])
    await ctx.close()
    # CR-04 canale dei promemoria
    ctx, pg = await T.page(b, T.base_state("en", notif=True, rem="ok"), age="adult", native=True)
    await T.ev(pg, "notifSchedule(); 1"); await pg.wait_for_timeout(1500)
    ch = json.loads(await T.ev(pg, "JSON.stringify(window.__chans || [])")); ns = json.loads(await T.ev(pg, "JSON.stringify(window.__notifs || [])"))
    made = [c for c in ch if c.get("id")]; dele = [c for c in ch if c.get("deleted")]
    T.check("CR-04 canale nuovo 'promemoria2' importanza 3 e privato sulla schermata di blocco", any(c["id"] == "promemoria2" and c.get("importance") == 3 and c.get("visibility") == 0 for c in made), made)
    T.check("  vecchio canale cancellato una volta", any(c.get("deleted") == "promemoria" for c in dele), dele)
    T.check("  promemoria sul canale nuovo", ns and all(n.get("channelId") == "promemoria2" for n in ns), [n.get("channelId") for n in ns][:3])
    await ctx.close()
    # parti native (controllo dei file)
    man = open(os.path.join(AND, "AndroidManifest.xml")).read()
    T.check("M-17 permesso VIBRATE", 'android.permission.VIBRATE"' in man)
    T.check("H-07 tolti ADSERVICES x3 e FOREGROUND_SERVICE", all(re.search(rf'{p}" tools:node="remove"', man) for p in ("ACCESS_ADSERVICES_AD_ID", "ACCESS_ADSERVICES_ATTRIBUTION", "ACCESS_ADSERVICES_TOPICS", "FOREGROUND_SERVICE")))
    T.check("G-14/H-08 regole di backup esplicite", 'dataExtractionRules="@xml/data_extraction_rules"' in man and 'fullBackupContent="@xml/backup_rules"' in man and os.path.exists(os.path.join(AND, "res/xml/data_extraction_rules.xml")))
    bp = open(os.path.join(AND, "java/com/tanettoapp/tanetto/BackPlugin.java")).read()
    T.check("M-45/G-07 'Esci' = moveTaskToBack (avvio successivo immediato)", "moveTaskToBack(true)" in bp and "finish()" not in bp)
    T.check("G-13 splash scuro uguale al fondo dell'app (#1A1714)", "#1A1714" in open(os.path.join(AND, "res/values-night/colors_splash.xml")).read())
    gr = open(os.path.join(T.REPO, "app-android/android/app/build.gradle")).read()
    T.check("versione 111 / 1.0.11", "versionCode 111" in gr and 'versionName "1.0.11"' in gr)

T.run(main)
