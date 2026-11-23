# Tanetto

Site served by GitHub Pages at https://tanetto.app (CNAME).

- `/` home page (English, sends visitors to their language with `site/lang.js`), `/it`, `/de`, ... language pages,
  `press-kit`, `sitemap.xml`, `robots.txt`: built by `python3 _site_src/build.py`.
- `/terms` terms of use in English (the address for Google Play and the app; `?lang=<code>` and other browser languages
  go to their page through `site/terms.js`) and `/terms-it`, `/terms-de`, ...: built by the same script from
  `_site_src/terms_texts.py` (14 languages, keep them in step) with `_site_src/terms.py`.
- `/app/` the web app: built in the app repository with `python3 tools/build.py --out <dir>` and copied here
  (without privacy.html, elimina-account.html, licenses.html, which stay at the root). Never edit `app/index.html`
  by hand: its inline script has a CSP hash.
- `privacy.html`, `elimina-account.html`, `licenses.html`, `fb.js`: from the same app build, at the root.
  The copies here were corrected by hand in 11/2026 (privacy facts of 1.0.11, link to `/terms`, CSP and referrer metas
  with the hash of the inline script): the app build must produce the same before it replaces them.
- `sw.js` at the root only removes the old service worker of the app that used to live at `/`.
- `get/` sends Android to Google Play (utm/src passed to the referrer) and iPhone to `/app/`; `play/*`, `m/` short links.
- `app-ads.txt` must stay at the root, unchanged.
