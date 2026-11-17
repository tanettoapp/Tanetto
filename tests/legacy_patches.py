"""1.0.10: aggiorna le attese delle suite storiche (copia in /dev/shm/t110) dove la 1.0.10 cambia apposta il comportamento.
Ogni voce: file, testo vecchio, testo nuovo, motivo (decisione o correzione dell'audit). Se il testo vecchio non c'e' piu',
la voce viene segnalata (non si ignora in silenzio)."""
import os, sys
DST = sys.argv[1] if len(sys.argv) > 1 else "/dev/shm/t110"
P = [
    # P0 (1.0.10/1.0.11): nessuna offerta di Plus automatica a chi non ha detto l'eta' -> la prova dei tempi usa un adulto
    ('p1/t109.py', 'st = base_state("en"); st["firstDay"] = "2026-11-01"; st["done"] = ["water"]; st["v20nav"] = {"plus": {"n": 0}}', 'st = base_state("en"); st["firstDay"] = "2026-11-01"; st["done"] = ["water"]; st["v20nav"] = {"plus": {"n": 0}}; st["age"] = {"y": 1990, "m": 5, "at": "2026-11-01"}', 'P0: offerte automatiche solo agli adulti'),
    # 1.0.11: nella prima configurazione (eta' non ancora chiesta) i compagni Plus non si mostrano
    ('p3c/t7.py', 'r = await ev(pg, "(() => { const g = document.querySelector(\'.choose.four\'); return [', 'r = await ev(pg, "(() => { const g = document.querySelector(\'.choose.four\'); if (!g) return null; return [', "P0: niente compagni Plus prima dell'eta'"),
    ('p3c/t7.py', 'check(f"{w} px: Plus companions in {cols} columns, \'looks after\' >= 10.5 px, Plus portraits not bigger than the free ones", r[0] == cols and r[1] >= 10.5 and r[2] <= r[3] + 2, r)', 'check(f"{w} px: prima configurazione con eta\' non ancora detta: niente compagni Plus con la corona (1.0.11, P0)", r is None, r)', 'P0'),
    # 1.0.10 (M-13, decisione 16/11/2026): titolare = Snugbloom Studio – nome dello sviluppatore, Paese, e-mail
    ("fix109/tfix_a.py", '''"Data controller: Snugbloom Studio, Italy." in pv and "About the developer" not in pv and "Titolare del trattamento: Snugbloom Studio, Italia." in pv''',
     '''"Data controller: Snugbloom Studio – " in pv and ", Italy. Contact:" in pv and "About the developer" not in pv and "Titolare del trattamento: Snugbloom Studio – " in pv''',
     "titolare con il nome (M-13)"),
    ("fix109/tfix_b.py", 'await pg.click("#ageGo");', 'await pg.click("#ageGo"); await pg.wait_for_timeout(250); await pg.evaluate("(() => { const b = document.getElementById(`ageOk`); if (b) b.click(); })()");', "eta\' con conferma (G2-10, 16/11/2026)"),
    ("p2b/t4.py", 'await pg.click("#ageGo");', 'await pg.click("#ageGo"); await pg.wait_for_timeout(250); await pg.evaluate("(() => { const b = document.getElementById(`ageOk`); if (b) b.click(); })()");', "eta\' con conferma (G2-10, 16/11/2026)"),
    ("fix109/suites/p2b/t4.py", 'await pg.click("#ageGo");', 'await pg.click("#ageGo"); await pg.wait_for_timeout(250); await pg.evaluate("(() => { const b = document.getElementById(`ageOk`); if (b) b.click(); })()");', "eta\' con conferma (G2-10, 16/11/2026)"),
    ("p2c/t5.py", 'await pg.click("#ageGo");', 'await pg.click("#ageGo"); await pg.wait_for_timeout(250); await pg.evaluate("(() => { const b = document.getElementById(`ageOk`); if (b) b.click(); })()");', "eta\' con conferma (G2-10, 16/11/2026)"),
    # 1.0.10 (M-36): i caratteri nuovi (t110-*) si aggiungono ai 17 di prima nella stessa cartella fonts/
    ("fix109/tfix_a.py", 'len(os.listdir(SITE + "/fonts")) == 17)', 'len([f for f in os.listdir(SITE + "/fonts") if not f.startswith("t110-")]) == 17)', "caratteri 1.0.10 in fonts/"),
    # 1.0.10 (nuovo aspetto, approvato il 17/11/2026): righe del Profilo con l'icona di 46 px, come Plus e "Invita un amico"
    ("p3c/t7.py", "Profile menu rows keep their own layout (icon 40 px | text | chevron)", "Profile menu rows keep their own layout (icon 46 px | text | chevron)", "icone del Profilo 46 px"),
    ("p3c/t7.py", 'r[0].startswith("40px") and r[1] >= 56', 'r[0].startswith("46px") and r[1] >= 56', "icone del Profilo 46 px"),
    ("p3c/t7.py", 'r == ["more", None, True] and r4 == ["more", None], [r, r4])', 'r == ["more", None, True] and r4 == ["more", "g_set"], [r, r4])', "Profilo a gruppi: da Impostazioni si torna al gruppo"),
    # 1.0.10 (critica 1.0.10, punto 10): il paragrafo dei bambini nomina solo AdMob (statistiche sempre spente per loro)
    ("fix109/tfix_a.py", 'pv.count("GoatCounter") >= 28 and', 'pv.count("GoatCounter") >= 14 and', "bambini: solo AdMob"),
    # 1.0.10 (E-02): a chi non ha detto l'eta' mai "raddoppia"; la prova del testo per gli adulti usa un adulto
    ("fix109/suites/p3b/t6.py", 'r = await ev(pg, """(() => { const o = {}; S.adsDay = { d: dkey(), n: 0 }; o.g0', 'r = await ev(pg, """(() => { const o = {}; S.age = { y: 1990, m: 5 }; S.adsDay = { d: dkey(), n: 0 }; o.g0', "testo del video per gli adulti"),
    ("fix109/suites/p2b/t3.py", 'txt = await ev(pg, "(() => { const d = document.creat', 'txt = await ev(pg, "(() => { S.age = { y: 1990, m: 5 }; const d = document.creat', "testo del video per gli adulti"),
    # 98zk (D-05/M-06): le tappe d'oro del sentiero hanno il segno v26g (Tanì di Plus contati come pagati)
    ("p2/t2.py", 'r[2] == {"tani": 5} and r[3] == {"tani": 10}', 'r[2] == {"tani": 5} and r[3].get("tani") == 10', "segno v26g delle tappe d'oro"),
    # 1.0.10 (M-09, decisione 16/11/2026): Introvabili 54.000-63.000
    ("fix109/suites/p2b/t3.py", 'min(r["xv"]) == 68000 and max(r["xv"]) == 80000', 'min(r["xv"]) == 54000 and max(r["xv"]) == 63000', "prezzi Introvabili 1.0.10"),
    ("fix109/suites/p2b/t3.py", '"Hai 120 di 68.000 Tanì" in r["furn"][1]', '"Hai 120 di 54.000 Tanì" in r["furn"][1]', "prezzi Introvabili 1.0.10"),
    ("fix109/suites/p2b/t3.py", 'r3["own"] and r3["s"] == 7000 and', 'r3["own"] and r3["s"] == 21000 and', "prezzi Introvabili 1.0.10"),
    # la prima pagina della galleria (it 320) arriva prima che la pubblicita' sia pronta (avvio a freddo): si aspetta il pulsante
    ("fix109/tfix_d.py", 'await pg.wait_for_timeout(900); await shot(pg, f"d/{t}_adgift")', 'await pg.wait_for_timeout(900); await pg.wait_for_function("!!document.querySelector(\\".adbtn\\")", timeout=8000); await ev(pg, "const g = document.getElementById(\\\'adGift\\\'); g && g.scrollIntoView({block:\\\'center\\\'}); 1"); await pg.wait_for_timeout(400); await shot(pg, f"d/{t}_adgift")', "attesa del pulsante del video"),
    # P0 (1.0.10): niente offerta di Plus automatica a chi non ha detto l'eta' -> la prova della finestra usa un adulto
    ("crit/tcrit.py", 'st = base_state(lang); st["firstDay"] = "2026-11-01"\n        ctx, pg = await cpage(b, lang, st, (2026, 11, 12), w=320, h=640, scheme=scheme)', 'st = base_state(lang); st["firstDay"] = "2026-11-01"; st["age"] = {"y": 1990, "m": 5}\n        ctx, pg = await cpage(b, lang, st, (2026, 11, 12), w=320, h=640, scheme=scheme)', "offerta Plus provata con un adulto"),
    # la festa del desiderio arriva 700 ms dopo l'ultimo disegno: con la macchina carica 1,1 s non bastano sempre
    ("fix109/suites/p2b/t3.py", '''36000; save(); layer.innerHTML=''; tab='today'; render(); 1"); await pg.wait_for_timeout(1100)''', '''36000; save(); layer.innerHTML=''; tab='today'; render(); 1"); await pg.wait_for_timeout(2200)''', "attesa della festa"),
    ("p2c/t5.py", '''S.seeds = 18000; save(); tab='today'; render(); 1"); await pg.wait_for_timeout(1100)''', '''S.seeds = 18000; save(); tab='today'; render(); 1"); await pg.wait_for_timeout(2200)''', "attesa della festa"),
    # 1.0.10 (blocco 6, bentornato a livelli): chi torna dopo giorni riceve la scheda del bentornato con la figura del regalo
    ("fix109/suites/p3b/t6.py", 'all(x.startswith("ban/") for x in r[1]), r[1])', 'all(x.startswith("ban/") or x.startswith("m/gift.") for x in r[1]), r[1])', "bentornato con la figura del regalo"),
    ("fix109/t38run5/t38_growth.py", 'await pg.add_init_script("window.__TEST_NOAGE=1;" + js)', 'await pg.add_init_script("window.__TEST_NOAGE=1;" + js + "localStorage.setItem(`tanetto-eta`, JSON.stringify({y: 1990, m: 5}));")', "P0 1.0.10: recensioni e offerte di Plus solo agli adulti, la suite usa un adulto"),
    ("fix109/t38run5/t38_nav.py", 'await pg.add_init_script("window.__TEST_NOAGE=1;" + js)', 'await pg.add_init_script("window.__TEST_NOAGE=1;" + js + "localStorage.setItem(`tanetto-eta`, JSON.stringify({y: 1990, m: 5}));")', "P0 1.0.10: recensioni e offerte di Plus solo agli adulti, la suite usa un adulto"),
    # russo e turco: auguri di Capodanno anche il 31 (adattamento culturale, 4 voci invece di 3)
    ("fix109/t38run5/t38_xmas.py", "Object.keys(x.gr).length !== 3", "Object.keys(x.gr).length < 3", "auguri di Capodanno in ru e tr"),
    # 1.0.10 (M-09): dal terzo video del giorno 6 Tanì: il premio si legge prima, non dopo due video
    ("fix109/t38run5/t38_secure.py", "hit and r == [2, 100 + amt] and amt == 12", "hit and r == [2, 112]", "premio del video letto prima"),
    # 1.0.10 (C-22): un solo nome per "scegli un viaggio"
    ("fix109/t38run5/t38_trips.py", '"Germo può fare una gita breve!" in cta and "Scegli la gita" in cta', '"Germo può fare una gita breve!" in cta and "Scegli il viaggio" in cta', "un solo nome per scegli un viaggio (C-22)"),
    # 1.0.10 (E-04): dopo "Non ora" 5 giorni di pausa (prima 2): al secondo giorno ancora niente offerta
    ("fix109/t38run5/t38_nav.py", 'check("Dopo \'Non ora\' almeno 2 giorni di pausa", due == [False, True], due)', 'check("Dopo \'Non ora\' almeno 5 giorni di pausa (E-04)", due == [False, False], due)', "pausa di 5 giorni tra le offerte di Plus"),
    # 1.0.10 (recensioni, 16/11/2026 sera): su Plus la riga "Plus only adds extras: everything that's free without Plus stays free"
    ("p1/t109.py", 'check("monthly plan (no offer): no trial text at all", "free" not in t.lower() and', 'check("monthly plan (no offer): no trial text at all", "free" not in t.lower().replace("everything that\'s free without plus stays free", "") and', "riga di fiducia su Plus"),
    ("p1/t109.py", 'check("no trial offer from Play (e.g. already used): every trial text hidden", "free" not in t.lower() and', 'check("no trial offer from Play (e.g. already used): every trial text hidden", "free" not in t.lower().replace("everything that\'s free without plus stays free", "") and', "riga di fiducia su Plus"),
    # 1.0.10 (17/11/2026, richiesta del proprietario): Profilo con 4 voci; Impostazioni, Account, Privacy e Acquisti dentro
    # "Impostazioni e account", Aiuto e Informazioni dentro "Aiuto e informazioni". Le 8 pagine sono le stesse: si aprono con psGo.
    ("fix109/tfix_b.py", "await ev(pg, \"document.querySelectorAll('.pmenu .prow')[3].click(); 1\")", "await ev(pg, \"psGo('acct'); 1\")", "profilo a 4 voci"),
    ("fix109/tfix_b.py", "await ev(pg, f\"document.querySelectorAll('.pmenu .prow')[{i}] && document.querySelectorAll('.pmenu .prow')[{i}].click(); 1\")", "await ev(pg, f\"psGo(['prog','comp','set','acct','priv','buy','help','about'][{i}]); 1\")", "profilo a 4 voci"),
    ("fix109/tfix_d.py", "n = await ev(pg, \"document.querySelectorAll('.pmenu .prow').length\")", "n = 8", "profilo a 4 voci"),
    ("fix109/tfix_d.py", "await ev(pg, f\"tab='more'; render(); document.querySelectorAll('.pmenu .prow')[{i}].click(); 1\")", "await ev(pg, f\"tab='more'; render(); psGo(['prog','comp','set','acct','priv','buy','help','about'][{i}]); 1\")", "profilo a 4 voci"),
    ("fix109/tfix_f.py", "n = await ev(pg, \"document.querySelectorAll('.pmenu .prow').length\"); check(f\"Profilo {tag}: 8 pagine\", n == 8, n)", "n = await ev(pg, \"document.querySelectorAll('.pmenu .prow').length\"); check(f\"Profilo {tag}: 8 pagine e 2 gruppi\", n == 10, n); n = 8", "profilo a 4 voci"),
    ("fix109/tfix_f.py", "await pg.locator(\".pmenu .prow\").nth(i).click(); await pg.wait_for_timeout(600)", "await ev(pg, f\"psGo(['prog','comp','set','acct','priv','buy','help','about'][{i}]); 1\"); await pg.wait_for_timeout(600)", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "check(f\"{l}: Profile menu with 8 pages, titles and subtitles in the language\", len(rows) == 8 and", "check(f\"{l}: Profile menu with 8 pages in 2 groups, titles and subtitles in the language\", len(rows) == 10 and", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "await pg.locator(f'.prow[data-psub=\"{k}\"]').click(); await pg.wait_for_timeout(450)", "await ev(pg, f\"(V110_PARENT['{k}'] ? psGo(V110_PARENT['{k}']) : 1)\"); await pg.wait_for_timeout(300); await pg.locator(f'.prow[data-psub=\"{k}\"]').click(); await pg.wait_for_timeout(450)", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "check(f\"{l}: phone Back from '{k}' returns to the Profile menu\", r == [None, \"more\", True], r)", "check(f\"{l}: phone Back from '{k}' returns to its group or to the Profile menu\", r[1] == \"more\" and r[0] in (None, \"g_set\", \"g_help\"), r); await ev(pg, \"psGo(null); 1\"); await pg.wait_for_timeout(250)", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "await pg.locator('.prow[data-psub=\"set\"]').click(); await pg.wait_for_timeout(300)\n    await pg.locator(\".psback:visible\").click(); await pg.wait_for_timeout(300)\n    check(\"on-screen back arrow returns to the menu, focus back on the row\", await ev(pg, \"moreSub === null && document.activeElement && document.activeElement.dataset.psub === 'set'\"))\n    await pg.locator('.prow[data-psub=\"acct\"]').click(); await pg.wait_for_timeout(300)",
     "await pg.locator('.prow[data-psub=\"g_set\"]').click(); await pg.wait_for_timeout(300)\n    await pg.locator(\".psback:visible\").click(); await pg.wait_for_timeout(300)\n    check(\"on-screen back arrow returns to the menu, focus back on the row\", await ev(pg, \"moreSub === null && document.activeElement && document.activeElement.dataset.psub === 'g_set'\"))\n    await pg.locator('.prow[data-psub=\"g_set\"]').click(); await pg.wait_for_timeout(300); await pg.locator('.prow[data-psub=\"acct\"]').click(); await pg.wait_for_timeout(300)", "profilo a 4 voci"),
    # 1.0.10 (17/11/2026): lo "Zaino" sono caselle-oggetto separate (prima una pillola unica con il gradiente verde)
    ("p2/t2.py", 'check(f"{scheme}: energy is one pill (no gaps) with a green gradient and a top shine", e["gap"] == "0px" and "linear-gradient" in e["on"] and "rgb(78, 138, 74)" in e["on"] and "inset" in e["shine"] and e["n"] == 5, e)',
     'check(f"{scheme}: backpack: one slot per goal with a gap, slots done outlined in green", e["gap"] == "5px" and "inset" in e["shine"] and e["n"] == 5, e)', "zaino a caselle"),
    ("p2/t2.py", 'check(f"{scheme}: the energy pill turns gold when full", "nv-full" in e2[0] and "rgb(242, 177, 64)" in e2[1], e2)',
     'check(f"{scheme}: the backpack card is marked full when full", "nv-full" in e2[0], e2)', "zaino a caselle"),
    # 1.0.10: Profilo a 4 voci, altre due righe della prova storica
    ("fix109/suites/p3b/t6.py", "await pg.locator('.prow[data-psub=\"acct\"]').click(); await pg.wait_for_timeout(300)\n    await ev(pg, \"backPress(); backPress()\"); await pg.wait_for_timeout(500)\n    check(\"Back twice from a page: menu, then Home (as before)\"",
     "await pg.locator('.prow[data-psub=\"g_set\"]').click(); await pg.wait_for_timeout(300); await pg.locator('.prow[data-psub=\"acct\"]').click(); await pg.wait_for_timeout(300)\n    await ev(pg, \"backPress(); backPress(); backPress()\"); await pg.wait_for_timeout(500)\n    check(\"Back three times from a sub-page: group, menu, then Home\"", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "await pg.locator('.prow[data-psub=\"set\"]').click(); await pg.wait_for_timeout(300)\n    await ev(pg, \"openPlus('t')\")",
     "await pg.locator('.prow[data-psub=\"g_set\"]').click(); await pg.wait_for_timeout(300); await pg.locator('.prow[data-psub=\"set\"]').click(); await pg.wait_for_timeout(300)\n    await ev(pg, \"openPlus('t')\")", "profilo a 4 voci"),
    ("fix109/suites/p3b/t6.py", "await pg.locator('.prow[data-psub=\"buy\"]').click(); await pg.wait_for_timeout(300)\n    await pg.locator(\"#psPlus\")",
     "await pg.locator('.prow[data-psub=\"g_set\"]').click(); await pg.wait_for_timeout(300); await pg.locator('.prow[data-psub=\"buy\"]').click(); await pg.wait_for_timeout(300)\n    await pg.locator(\"#psPlus\")", "profilo a 4 voci"),
    ("p2/t2.py", 'check(f"{scheme}: goal card cream with a 5 px bottom edge and a soft long shadow", (r["bg"] == ("rgb(255, 248, 238)" if scheme == "light" else "rgb(42, 37, 31)")) and r["sh"].startswith(edge) and "18px 30px -18px" in r["sh"], r)', 'check(f"{scheme}: goal card (1.0.10 look: flat tinted card, no long shadow in light, tall enough to tap)", r["h"] >= 44 and (scheme == "dark" or r["sh"] == "none"), r)', "nuovo aspetto 1.0.10"),
    ("p2/t2.py", 'r["tb"] >= 3 and r["tick"] == ["40px", "40px"] and r["h"] >= 44', 'r["tb"] >= 3 and r["tick"] == ["34px", "34px"] and r["h"] >= 44', "nuovo aspetto 1.0.10: cerchio 34 px dentro la scheda tutta toccabile"),
    ("p2/t2.py", 'and "0px 3px 0px" in tr2[3], [rip, tr, tr2])', 'and ("0px 3px 0px" in tr2[3] or "0px 5px 0px" in tr2[3]), [rip, tr, tr2])', "nuovo aspetto 1.0.10: bordo inferiore 5 px"),
    ("p2/t2.py", "const r = document.querySelector('button.goal').getBoundingClientRect(); return document.elementFromPoint", "const g0 = document.querySelector('button.goal'); g0.scrollIntoView({ block: 'center' }); const r = g0.getBoundingClientRect(); return document.elementFromPoint", "nuovo aspetto 1.0.10: la prima scheda sta sotto il menu sospeso"),
    ("fix109/suites/p2b/t3.py", 'check("showcase text: title \'Introvabili\', the wish and \'Hai 120 di 51.000 Tanì\' + honest pace", "Introvabili" in r["furn"][1] and "Hai 120 di 54.000 Tanì" in r["furn"][1] and "Al tuo ritmo di oggi" in r["furn"][1] and "Il tuo desiderio" in r["furn"][1], r["furn"][1][:300])', 'check("showcase text: title \'Introvabili\', the wish and \'Hai 120 di 54.000 Tanì\', and never a time estimate (richiesta del proprietario 1.0.10)", "Introvabili" in r["furn"][1] and "Hai 120 di 54.000 Tanì" in r["furn"][1] and "ritmo" not in r["furn"][1] and "mesi" not in r["furn"][1] and "Il tuo desiderio" in r["furn"][1], r["furn"][1][:300])', "Introvabili senza tempi (1.0.10)"),
    ("fix109/t38run5/t38_devices.py", '("#app .prow", 8, False)', '("#app .prow", 4, False)', "profilo a 4 voci"),
    ("fix109/suites/p2b/t3.py", 'check("trying a normal item tells honestly how many days the wish moves back", re.match(r"Your wish moves back by about \\d+ days?", bk or ""), bk)', 'check("trying a normal item never shows a time estimate for the wish (richiesta del proprietario 1.0.10)", bk == "" and not re.search(r"\\bdays?\\b|giorni", bk), bk)', "Introvabili senza tempi (1.0.10)"),
    ("fix109/t38run5/t38_devices.py", 'check("Versione 1.0.10 (110) per Google Play (1.0.10: R8, widget, App Check)", "versionCode 110" in vs.replace("  ", " ")', 'check("Versione 1.0.10 (112) per Google Play (1.0.10: R8, widget, App Check; 110 e 111 gia\' caricati)", "versionCode 112" in vs.replace("  ", " ")', "versionCode 112"),
    ('fix109/tfix_a.py', 'check("Android: versionCode 110 e versionName 1.0.10 (1.0.10)", "versionCode 110" in g', 'check("Android: versionCode 112 e versionName 1.0.10 (110 e 111 gia\' caricati su Play)", "versionCode 112" in g', 'versionCode 112'),
    ('fix109/t38run5/t38_trips.py', 'all(tags.get(k) == f"Gita breve · +{TS} Tanì · +8 punti" for k in', 'all(tags.get(k) == f"Gita breve · +{TS} Tanì" for k in', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', 'and f"+{TS} Tanì" in bar and "+8 punti" in bar and', 'and f"+{TS} Tanì" in bar and "punti" not in bar and', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', 'all(k in sh for k in ["dà energia", "metà degli obiettivi",', 'all(k in sh for k in ["zaino", "metà degli obiettivi",', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', '"Gita breve" in stx and f"+{TS} Tanì · +8 punti" in stx', '"Gita breve" in stx and f"+{TS} Tanì" in stx and "punti" not in stx', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', 'tags.get("f:city") == f"Ganze Reise · +{TF} Tanì · +15 Punkte" and tags.get("v:fireflies") == f"Ganze Reise · +{WF} Tanì · +16 Punkte"', 'tags.get("f:city") == f"Ganze Reise · +{TF} Tanì" and tags.get("v:fireflies") == f"Ganze Reise · +{WF} Tanì"', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', '"So funktionieren Reisen" in sh and "Energie" in sh and "Ganze Reise" in sh', '"So funktionieren Reisen" in sh and "Rucksack" in sh and "ganze Reise" in sh', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
    ('fix109/t38run5/t38_trips.py', '"+15 Punkte" in stx and "Kurzer Ausflug" not in stx', '"Punkte" not in stx and "Kurzer Ausflug" not in stx', '1.0.10: una sola moneta visibile (Tanì), niente punti; Zaino al posto di Energia'),
]
# 1.0.10 (113, regole Google Play Families): a chi non ha detto l'eta' (e ai bambini) nessun video con premio; le prove storiche dei
# video e del consenso UMP (scritte prima della schermata dell'eta') ora usano un adulto
P += [
    ("p1/t109.py", 'ADS = """window.__adsInit = 0;', 'ADS = """localStorage.setItem(`tanetto-eta`, JSON.stringify({y: 1990, m: 5})); window.__adsInit = 0;', "113: video e consenso solo da 13 anni in su (la prova usa un adulto)"),
]
bad = 0
for f, old, new, why in P:
    p = os.path.join(DST, f)
    if not os.path.exists(p): print("MANCA", f); bad += 1; continue
    s = open(p, encoding="utf-8").read()
    if old not in s: print("NON TROVATO", f, old[:60]); bad += 1; continue
    open(p, "w", encoding="utf-8").write(s.replace(old, new)); print("ok", f, "-", why)
sys.exit(1 if bad else 0)
