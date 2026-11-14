#!/usr/bin/env python3
"""Tanetto: costruisce il sito (index.html, sw.js, manifest, privacy.html, elimina-account.html) dalla cartella src/ di
questo repository. 1.0.10 (M-48): sorgenti e build in git, percorsi relativi, un solo comando.

Uso:  python3 tools/build.py [--out DIR] [--android]
      --out DIR   cartella di uscita (predefinita: la radice del repository)
      --android   dopo il sito prepara anche app-android/www (prep_www.py)

Sostituisce app-prova/build.py + site.py (stessa logica, stesso risultato byte per byte). I file che prima venivano
copiati da app-prova (gsap.min.js, caveat-700.woff2, fonts/, fonts.css, img/, og.png, fb.js, press/) qui sono gia' nella
radice del repository e sono loro la sorgente: non si copiano."""
import base64, glob, hashlib, json, os, re, shutil, subprocess, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(REPO, "src")
args = sys.argv[1:]
OUT = os.path.abspath(args[args.index("--out") + 1]) if "--out" in args else REPO
os.makedirs(OUT, exist_ok=True)
r = lambda n: open(os.path.join(SRC, n), encoding="utf-8").read()

# ---------- 1) tanetto.html (ex build.py) ----------
js = "".join(r(os.path.basename(f)) + "\n" for f in sorted(glob.glob(os.path.join(SRC, "*.js"))))
css = "".join(r(os.path.basename(f)) + "\n" for f in sorted(glob.glob(os.path.join(SRC, "*.css"))))
EASE_KW = {"ease": "cubic-bezier(.33, 1, .68, 1)", "ease-out": "cubic-bezier(.33, 1, .68, 1)", "ease-in": "cubic-bezier(.32, 0, .67, 0)", "ease-in-out": "cubic-bezier(.65, 0, .35, 1)"}
def _ease_items(v, dflt):
    imp = ""
    if v.rstrip().endswith("!important"): v, imp = v.rstrip()[:-10].rstrip(), " !important"
    items, depth, cur = [], 0, ""
    for ch in v:
        if ch == "(": depth += 1
        if ch == ")": depth -= 1
        if ch == "," and depth == 0: items.append(cur); cur = ""
        else: cur += ch
    items.append(cur); out = []
    for it in items:
        toks = it.split(); low = [t.lower() for t in toks]
        if not toks or "var(" in it or low == ["none"] or low[0] in ("inherit", "initial", "unset", "revert"): out.append(it); continue
        if any(t in EASE_KW for t in low): out.append(" ".join(EASE_KW.get(t.lower(), t) for t in toks)); continue
        if any(t in ("linear", "step-start", "step-end") or t.startswith(("cubic-bezier(", "steps(")) for t in low): out.append(it.strip()); continue
        out.append(it.strip() + " " + dflt)
    return ", ".join(x.strip() for x in out) + imp
def _ease_css(c):
    c = re.sub(r"(?<![-\w])(transition|animation)(\s*:\s*)([^;{}]+)", lambda m: m.group(1) + m.group(2) + _ease_items(m.group(3), EASE_KW["ease-out"] if m.group(1) == "transition" else EASE_KW["ease-in-out"]), c)
    c = re.sub(r"((?:transition|animation)-timing-function\s*:\s*)([^;{}]+)", lambda m: m.group(1) + ", ".join(EASE_KW.get(x.strip().lower(), x.strip()) for x in m.group(2).split(",") if x.strip()), c)
    return c
css = _ease_css(css)
assert not re.search(r"(?<![-\w])(transition|animation)(-timing-function)?\s*:[^;{}]*(?<![-\w])ease(-in|-out|-in-out)?(?![-\w])", css), "curva ease rimasta nel CSS"
boot_uri = re.search(r'const BOOT_IMG = "(data:image/webp;base64,[A-Za-z0-9+/=]+)"', r("41z_img3d.js")).group(1)
assert len(boot_uri) < 8192 * 4 / 3 + 40, "logo di avvio troppo grande"
body = r("20_body.html"); assert body.count("<!--BOOT_ICON-->") == 1, "segnaposto del logo di avvio non trovato"
body = body.replace("<!--BOOT_ICON-->", f'<img src="{boot_uri}" alt="" width="132" height="132">')
src = r("00_head.html") + "<style>\n" + css + "</style>\n\n" + body + "\n<script>\n(function () {\n\"use strict\";\n" + js + "})();\n</script>\n"

# ---------- 2) index.html del sito (ex site.py) ----------
fav = '<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">\n<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">'
CSP_TAG = "<!--CSP-->"
head = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' + CSP_TAG + '\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="theme-color" content="#F4EFE6">\n'
        '<title>Tanetto — a tiny pet for your self-care habits (free app)</title>\n<meta name="description" content="Tanetto is a gentle self-care habit app, free to download: pick a few small goals a day and they keep a cute little 3D companion happy. Ads only when you choose to watch one, account optional, works in the browser, 14 languages.">\n<link rel="canonical" href="https://tanettoapp.github.io/Tanetto/">\n<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"Tanetto","url":"https://tanettoapp.github.io/Tanetto/","applicationCategory":"HealthApplication","operatingSystem":"Any (web browser)","description":"A gentle self-care habit app where small daily goals keep a cute little 3D companion happy.","offers":{"@type":"Offer","price":"0","priceCurrency":"EUR"},"inLanguage":["en","it","de","es","fr","pt","ja","ko","zh","ru","pl","nl","tr"]}</script>\n'
        '<meta property="og:type" content="website">\n<meta property="og:site_name" content="Tanetto">\n'
        '<meta property="og:title" content="Tanetto — a tiny friend for your self-care">\n'
        '<meta property="og:description" content="Small daily habits keep a cozy 3D companion happy. Free to download, ads only when you choose, in 14 languages.">\n'
        '<meta property="og:url" content="https://tanettoapp.github.io/Tanetto/">\n'
        '<meta property="og:image" content="https://tanettoapp.github.io/Tanetto/og.png">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
        '<meta property="og:image:alt" content="Tanetto: Germo the sprout and six more 3D companions on a sunny meadow">\n'
        '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="Tanetto — a tiny friend for your self-care">\n'
        '<meta name="twitter:description" content="Small daily habits keep a cozy 3D companion happy. Free to download, ads only when you choose, in 14 languages.">\n<meta name="twitter:image" content="https://tanettoapp.github.io/Tanetto/og.png">\n'
        '<link rel="manifest" href="manifest.webmanifest">\n' + fav + '\n'
        '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
        '<meta name="apple-mobile-web-app-title" content="Tanetto">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
        '<style>body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
src = re.sub(r'<title>[^<]*</title>', '', src, count=1)
GSAP_CDN = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>'
assert src.count(GSAP_CDN) == 1, "tag di GSAP non trovato"
src = src.replace(GSAP_CDN, '<script src="gsap.min.js"></script>')
src, _n1 = re.subn(r'<link rel="preconnect" href="https://fonts\.(googleapis|gstatic)\.com"[^>]*>\s*', "", src)
src, _n2 = re.subn(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2[^"]*">', '<link rel="stylesheet" href="fonts.css">', src)
assert _n2 == 1 and "googleapis.com/css" not in src and "fonts.gstatic" not in src, "Google Fonts non tolto"
page = head + src + "\n</body>\n</html>\n"
inl = [m.group(1) for m in re.finditer(r'<script>([\s\S]*?)</script>', page)]
assert len(inl) == 1, f"attesi 1 script in linea, trovati {len(inl)}"
h = base64.b64encode(hashlib.sha256(inl[0].encode("utf-8")).digest()).decode()
csp = ("default-src 'self'; "
       f"script-src 'self' 'sha256-{h}' 'unsafe-eval' https://apis.google.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
       "style-src 'self' 'unsafe-inline'; font-src 'self' data:; "
       "img-src 'self' data: blob: https://*.goatcounter.com; media-src 'self' data: blob:; "
       "connect-src 'self' data: blob: https://*.googleapis.com https://tanettoapp-pet.firebaseapp.com https://*.goatcounter.com; "
       "frame-src https://tanettoapp-pet.firebaseapp.com https://accounts.google.com https://apis.google.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/; "
       "worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'")
page = page.replace(CSP_TAG, f'<meta http-equiv="Content-Security-Policy" content="{csp}">', 1)
assert page.count('http-equiv="Content-Security-Policy"') == 1
# 1.0.11: lo script dell'app deve essere JavaScript valido (un nome dichiarato due volte bloccava tutta l'app senza avviso)
import tempfile, shutil
if shutil.which("node"):
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8", dir="/dev/shm" if os.path.isdir("/dev/shm") else None) as tf:
        tf.write(inl[0]); _tfp = tf.name
    _ck = subprocess.run(["node", "--check", _tfp], capture_output=True, text=True); os.unlink(_tfp)
    assert _ck.returncode == 0, "script dell'app non valido:\n" + _ck.stderr[-1500:]
open(f"{OUT}/index.html", "w").write(page)
man = {"name": "Tanetto", "short_name": "Tanetto", "description": "Un piccolo compagno che ti aiuta a prenderti cura di te, un passo alla volta.",
       "start_url": "./", "scope": "./", "display": "standalone", "orientation": "portrait", "background_color": "#F4EFE6", "theme_color": "#F4EFE6", "lang": "it",
       "icons": [{"src": "icon-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
                 {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
MAN_EXTRA = {}
if os.path.exists(os.path.join(SRC, "manifest_extra.json")): MAN_EXTRA = json.load(open(os.path.join(SRC, "manifest_extra.json")))
man.update(MAN_EXTRA)
json.dump(man, open(f"{OUT}/manifest.webmanifest", "w"), ensure_ascii=False, indent=1)
_iv = re.search(r'const IMG3D_V = "([0-9a-f]+)"', r("41z_img3d.js")).group(1)
_imgd = os.path.join(REPO, "img")
_pre_list = sorted(os.path.relpath(p, _imgd).replace(os.sep, "/") for p in glob.glob(f"{_imgd}/**/*.webp", recursive=True) if "/pc/" not in p.replace(os.sep, "/"))
assert "welcome.webp" in _pre_list and "m/wave.webp" in _pre_list and len(_pre_list) >= 25, _pre_list
_pre = ", ".join(f'"img/{x}?v={_iv}"' for x in _pre_list)
sw = open(os.path.join(REPO, "tools", "sw_template.js"), encoding="utf-8").read()
_hh = hashlib.sha1(); _hh.update(page.encode("utf-8")); _hh.update(json.dumps(man, ensure_ascii=False).encode("utf-8"))
for _f in ["fb.js", "gsap.min.js", "caveat-700.woff2"]: _hh.update(open(os.path.join(REPO, _f), "rb").read())
open(f"{OUT}/sw.js", "w").write(sw.replace("__IV__", _iv).replace("__SH__", _hh.hexdigest()[:8]).replace("__PRE__", _pre))
if OUT != REPO:
    for f in ["fb.js", "gsap.min.js", "caveat-700.woff2", "fonts.css", "og.png", "favicon-32.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]:
        if os.path.exists(os.path.join(REPO, f)): shutil.copy(os.path.join(REPO, f), OUT)
    for d in ["img", "fonts"]:
        shutil.rmtree(f"{OUT}/{d}", ignore_errors=True); shutil.copytree(os.path.join(REPO, d), f"{OUT}/{d}")
subprocess.run(["node", os.path.join(REPO, "tools", "acct_page.js"), f"{OUT}/elimina-account.html"], check=True, cwd=REPO)
subprocess.run(["node", os.path.join(REPO, "tools", "legal_page.js"), f"{OUT}/privacy.html"], check=True, cwd=REPO)
for extra in sorted(glob.glob(os.path.join(REPO, "tools", "page_*.js"))):  # 1.0.10: altre pagine generate (es. licenze)
    subprocess.run(["node", extra, OUT], check=True, cwd=REPO)
if "--android" in args:
    subprocess.run([sys.executable, os.path.join(REPO, "app-android", "prep_www.py")], check=True)
print("ok", len(page), OUT)
