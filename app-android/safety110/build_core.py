import glob, os, re
d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")
r = lambda n: open(os.path.join(d, n), encoding="utf-8").read()
js = "".join(r(os.path.basename(f)) + "\n" for f in sorted(glob.glob(os.path.join(d, "*.js"))))
css = "".join(r(os.path.basename(f)) + "\n" for f in sorted(glob.glob(os.path.join(d, "*.css"))))
# 1.0.9 (fase 2): solo tre famiglie di curve (style_tokens del video). Nel CSS le parole chiave "ease*" e le transizioni
# senza curva (che valgono "ease") diventano power2 (out per le transizioni, inOut per le animazioni in loop); restano
# linear/steps (movimenti continui) e le cubic-bezier gia' scritte (back = oggetti, expo = pagina).
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
# 1.0.9: il segnaposto di avvio (#boot) mostra lo stesso Germo dell'icona e del logo (ICON_BIG), con id propri
# 1.0.9 (fase 3): e' il Germo 3D dell'icona (WebP in linea <= 8 KB generato da make_img.py), lo stesso dello splash
boot_uri = re.search(r'const BOOT_IMG = "(data:image/webp;base64,[A-Za-z0-9+/=]+)"', r("41z_img3d.js")).group(1)
assert len(boot_uri) < 8192 * 4 / 3 + 40, "logo di avvio troppo grande"
icon = f'<img src="{boot_uri}" alt="" width="132" height="132">'
body = r("20_body.html"); assert body.count("<!--BOOT_ICON-->") == 1, "segnaposto del logo di avvio non trovato"
body = body.replace("<!--BOOT_ICON-->", icon)
out = r("00_head.html") + "<style>\n" + css + "</style>\n\n" + body + "\n<script>\n(function () {\n\"use strict\";\n" + js + "})();\n</script>\n"
open(os.path.join(os.path.dirname(d), "tanetto.html"), "w", encoding="utf-8").write(out)
print(len(out))
