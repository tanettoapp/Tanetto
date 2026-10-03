# Prepara la cartella www per l'app Android: copia il sito e rende tutto disponibile offline (GSAP e font locali)
import os, re, shutil
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")); W = "www"
shutil.rmtree(W, ignore_errors=True); os.makedirs(W + "/fonts")
for f in os.listdir(SITE):
    if f.endswith((".png", ".webmanifest")): shutil.copy(f"{SITE}/{f}", W)
shutil.copy("node_modules/gsap/dist/gsap.min.js", W)
css = ""
for fam, ws in [("fredoka", [500, 600, 700]), ("figtree", [400, 500, 600, 700])]:
    for w in ws:
        c = open(f"node_modules/@fontsource/{fam}/{w}.css").read()
        for m in set(re.findall(r"url\(\./files/([^)]+)\)", c)):
            if m.endswith(".woff2"): shutil.copy(f"node_modules/@fontsource/{fam}/files/{m}", f"{W}/fonts/{m}")
        c = re.sub(r",\s*url\(\./files/[^)]+\.woff\) format\('woff'\)", "", c)
        css += c.replace("url(./files/", "url(fonts/")
open(f"{W}/fonts.css", "w").write(css)
h = open(f"{SITE}/index.html").read()
h = h.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"', '<script src="gsap.min.js"')
h = re.sub(r'<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*', "", h)
h = re.sub(r'<link rel="preconnect" href="https://fonts\.gstatic\.com"[^>]*>\s*', "", h)
h = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2[^"]*">', '<link rel="stylesheet" href="fonts.css">', h)
assert "gsap.min.js\"" in h and "fonts.css" in h and "googleapis" not in h and "cdnjs" not in h, "riscrittura incompleta"
open(f"{W}/index.html", "w").write(h)
print("www pronta:", len(os.listdir(W + "/fonts")), "font,", len(h), "byte")
