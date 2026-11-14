# STATO 1.0.11 (per riprendere il lavoro)

Ultimo aggiornamento: 14/11/2026 (notte). Questo ramo (wip-110) = la 1.0.11 (versionCode 111): la 1.0.10 esce prima
come aggiornamento di sola sicurezza fatto a parte (coordinatore). Documenti finali: CHANGES_111.md, outputs/upload111/.

Come si lavora: sorgenti in src/, `python3 tools/build.py` (scrive index.html ecc. nella radice), prove nuove
`cd tests/t110 && python3 t_XXX.py` (porta 8981, una alla volta), suite storiche `tests/run.sh TAG legacy`
(copiate in /dev/shm/t110 con porte 8960-8970; lente, ~1-2 h). Disco quasi pieno (~230 MB liberi, cancellare non e'
permesso): file pesanti temporanei SOLO in /dev/shm. Livello nuovo: src/98zk_v26_fix.js + src/11zg_v26_fix.css,
testi nuovi in src/3zzk_v26_texts.js (T[l].v26), correzioni puntuali di testo direttamente nei file delle lingue.

Fatto (prove verdi): blocco 0 (git, build), 1 (bambini, crisi, numeri di aiuto per Paese, statistiche, promemoria),
2 (soldi/Tanì/backup/regalo/memoria piena/editor), 4 (testi 14 lingue, FAQ, coreano, plurali...), 5 (accessibilita'
e misure), 6 (bentornato, respiro, prossimo trofeo, versione, suoni, avvio, stagioni). Prove: t_b1_minors, t_b1_crisis,
t_b2_money, t_b5_a11y, t_b6_product.

Prossimo, in ordine: 7) prestazioni web (Firebase solo con account, animazioni/timer solo se visibili);
8) nativo (VIBRATE, indietro = moveTaskToBack, canale notifiche nuovo, permessi, backup rules, fuso orario);
licenze (M-14), termini (I-09), I-08, G2-06/G2-09/G2-10, E-13; 9) sito (mailto privacy, contrasto pagine);
3) economia rimisurata -> sezione DA DECIDERE; 10) regressione completa (legacy + t110 + axe + check_lang),
build AAB/APK 111 PROVVISORIO, CHANGES_111.md, note di rilascio inglesi, critici per area.
Rimandato al proprietario: M-22c voce dei 7 compagni (serve la sua scelta su quanto forte), CR-06 "Risparmi 25%"
(lui ha deciso l'arrotondamento), D-10 neve nell'emisfero sud, M-09, E-09, M-13, M-41, D-05 (x3).
