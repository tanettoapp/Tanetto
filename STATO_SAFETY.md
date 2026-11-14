# STATO del lavoro "1.0.10 sicurezza" (versionCode 110) — per riprendere dopo un riavvio

Ramo: safety-110 (worktree /home/claude/tanetto-safety110), partito da 46e9bfd (= AAB 1.0.9 inviato, verificato).
NON toccare: /home/claude/tanetto-wip110 (altro agente, 1.0.11), /home/claude/tanetto-wip, i vecchi alberi 1.0.9.
Niente invii a Google. Uscite in /mnt/user-data/outputs/upload110_safety/.

## Come si costruisce
- `python3 app-android/safety110/build_safety.py`: sorgente 1.0.9 (app-prova/backup_src_1.0.9.tgz, sha256 nel file)
  + `app-android/safety110/layers/*.js` -> index.html, sw.js, app-android/www. Senza strati ridà la www 1.0.9
  byte per byte (md5 92efda3c4034484e1a9f1223332d5f4b, verificato 14/11/2026).
- Android: versionCode 110 / 1.0.10 in app-android/android/app/build.gradle; `npx cap sync android`; gradle bundleRelease assembleRelease.

## Passi
1) [fatto] verifica 1.0.9 = AAB (index.html md5 identico; versionCode 109 nel build.gradle)
2) [fatto] worktree + build riproducibile
3) [ ] strato 98zs_safety110.js: età (M-01, E-10, CR-07, G2-07, recensione) + crisi (M-01b, M-12)
4) [ ] numeri di aiuto per Paese verificati sulle fonti ufficiali (elenco + fonti in safety110/HELPLINES_FONTI.md)
5) [ ] test nuovi (falliscono su 1.0.9, passano ora) + tutte le suite vecchie
6) [ ] build firmata AAB + APK universale, SHA256SUMS, note di rilascio, CHANGES_110_SICUREZZA.md
7) [ ] critico separato (claude -p) fino a >= 9,5
8) [ ] push, riepilogo in app-prova/kit/34_richieste_108.txt
