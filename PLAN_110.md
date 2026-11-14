# Tanetto 1.0.10 — piano delle correzioni (dall'audit AUDIT_110.md)

Fonte: scratchpad/audit110/AUDIT_110.md (+ CRITIC_1, GAPS1-3, areas/*). Ordine = sezione 5 dell'audit, rivista dal critico
(sicurezza dei bambini tutta insieme, soldi prima del ricalcolo dell'economia, caratteri prima di layout, nativo in un solo
blocco alla fine). Ogni blocco: modifica -> prova che fallisce prima e passa dopo -> suite -> commit + push -> STATO_110.md.

Regole: sorgenti in src/ (questo repo), build con `python3 tools/build.py`, prove con `tests/run.sh TAG [suite]`.
Le correzioni nuove vanno in UN livello nuovo (src/98zk_v26_fix.js + src/11zg_v26_fix.css) salvo testi/dati
(file delle lingue 3*.js) e cambi puntuali gia' indicati dall'audit. Mai toccare 1.0.9 (final109, /home/claude/tanetto, app-prova/src).
Prezzi 4,99/44,99 + prova 7 giorni annuale: MAI cambiati. Una moneta (Tanì). Max 5 video/giorno. Musica spenta di base.

Blocchi (ordine e file):
0) Fondamenta (M-48): src/ + tools/build.py (stesso risultato byte per byte della build vecchia), tests/run.sh,
   tests/setup_legacy.sh (suite storiche in /dev/shm con porte 896x), tests/t110/ (prove nuove).
1) Bambini e P0 (98zk + testi): M-01 (offerta Plus mai da sola a <13/eta' non detta/sotto l'eta' del consenso; niente
   "Invita un amico" ai minori; riga Plus nell'onboarding nascosta), G2-07, M-01b + G3-01..03 (crisi: elenchi STRONG/WEAK/
   GUARD/SOFT in 14 lingue, diario/lascia andare/capsula controllati), M-12 numeri di aiuto per Paese con linee per bambini,
   M-16/E-05 notifiche senza pressione, M-11/I-04/I-11 interruttore statistiche (spento per bambini/eta' non detta, niente
   conteggi prima della risposta sull'eta'), M-03 (appunto prezzi vecchi).
2) Soldi e stato (98zk): M-04 scambio obiettivi, M-05 albero di Natale, M-06/CR-03 Tanì di Plus = "pagati" (mensili e
   sentiero d'oro; il triplo del regalo -> DA DECIDERE), M-07/E-01/D-01/D-12 regalo del giorno che perdona, M-08/H-01/H-02
   memoria piena, H-17, M-06b backup su due telefoni, M-06c editor obiettivi, D-09, D-02, CR-06 risparmio arrotondato per difetto.
3) Economia rimisurata dopo il blocco 2 -> numeri per la decisione M-09 (DA DECIDERE, non applicata).
4) Testi 14 lingue (file 3*.js): M-19 plurali, M-20 coreano, M-21 parole spezzate, M-22 maschile, M-22b documento largo,
   C-06..C-22, I-07, G2-05, G3-08, E-15 FAQ, M-22c voce dei compagni (base it/en + 12 lingue).
5) Accessibilita' e layout (11zg + 98zk): M-23..M-35, M-54, F-08..F-14, B-09..B-17, G-18.
6) Prodotto e grafica web: M-39 temi stagionali, M-40 bentornato a livelli, E-04, E-08, E-11, E-14, E-13, M-18 suoni,
   M-37 avvio web, M-14 licenze, I-08, I-09, G2-09..G2-11.
7) Prestazioni web: M-43 Firebase solo se serve, M-44/G-04..G-06/H-15 animazioni e timer solo quando visibili.
8) Nativo in un blocco: M-17 VIBRATE, M-45 indietro = moveTaskToBack, CR-04 canale notifiche nuovo, H-07 permessi,
   G-14/H-08 regole di backup, G-17 fuso orario, M-10 firma acquisti (se verificabile senza telefono).
9) Sito: M-49..M-52, K-*.
10) Regressione completa + build AAB/APK 110 PROVVISORIO + CHANGES_110.md + note di rilascio + critici per area.

Riservato al proprietario (sezione DA DECIDERE di CHANGES_110.md): M-09 Introvabili, E-09 pacchetti, D-10 neve nell'emisfero
sud, M-13 identita' legale, M-41/E-07 prezzi per Paese, D-05 triplo del regalo Plus, M-02/M-15/I-12/M-53/K-17 Play Console.
