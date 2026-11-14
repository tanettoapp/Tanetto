# STATO 1.0.11 (per riprendere il lavoro)

Ultimo aggiornamento: 14/11/2026 (notte). Questo ramo (wip-110) = la 1.0.11 (versionCode 111): la 1.0.10 esce prima
come aggiornamento di sola sicurezza fatto a parte (coordinatore). Documenti finali: CHANGES_111.md, outputs/upload111/.

Come si lavora: sorgenti in src/, `python3 tools/build.py` (scrive index.html ecc. nella radice), prove nuove
`cd tests/t110 && python3 t_XXX.py` (porta 8981, una alla volta), suite storiche `tests/run.sh TAG legacy`
(copiate in /dev/shm/t110 con porte 8960-8970; lente, ~1-2 h). Disco quasi pieno (~230 MB liberi, cancellare non e'
permesso): file pesanti temporanei SOLO in /dev/shm. Livello nuovo: src/98zk_v26_fix.js + src/11zg_v26_fix.css,
testi nuovi in src/3zzk_v26_texts.js (T[l].v26), correzioni puntuali di testo direttamente nei file delle lingue.

Fatto (prove verdi): blocchi 0-9 (bambini, crisi, numeri di aiuto per Paese, statistiche, promemoria; soldi/Tanì/backup;
testi 14 lingue, FAQ, coreano, plurali; accessibilita' e misure; bentornato, respiro, prossimo trofeo, versione, suoni,
stagioni; prestazioni (Firebase solo con account, animazioni a riposo, audio che dorme, timer fermi in secondo piano);
nativo (VIBRATE, indietro, canale notifiche, permessi, backup rules, fuso); licenze, termini, I-08, E-13, G-18;
sito (mailto, contrasto, pagine leggibili senza JS); P2: B-14, B-15, B-17, E-06, G-12, G2-06, G2-10 (fascia d'eta').
build.py ora controlla che lo script sia JavaScript valido (node --check).
Suite: tests/t110/t_*.py; storiche con tests/run.sh TAG legacy (attese cambiate apposta: tests/legacy_patches.py).

Prossimo: regressione completa, economia rimisurata (/dev/shm/econ: e1_econ.py + e2_table.py) -> DA DECIDERE,
build AAB/APK 111 PROVVISORIO in /mnt/user-data/outputs/upload111/, CHANGES_111.md, RELEASE_NOTES_111.txt.
Rimandato al proprietario: vedi CHANGES_111.md "DA DECIDERE" (M-09, E-09, D-05, CR-06, D-10, M-13, M-41, M-22c, G2-10, Unikat).
