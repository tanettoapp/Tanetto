"""Tanetto site: the terms of use pages (https://tanetto.app/terms in English, /terms-<slug> in the other 13 languages).

Built by build.py (python3 _site_src/build.py) with the texts of terms_texts.py, in the same style as the language pages.
/terms is the address for Google Play and the app; terms.html also loads site/terms.js, which sends ?lang=<code>
(the links of privacy.html) and browsers in another language to their page.
"""
import re

from terms_texts import T

DATE = (24, 11, 2026)  # last update of the texts: change it together with terms_texts.py
OWNER = "Snugbloom Studio"  # only the studio name: the full identity of the owner is written only in privacy.html, and section 1 links to it
MAIL = "tanettoapp@gmail.com"
ECC = "https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints/resolve-your-consumer-complaint/european-consumer-centres-network-ecc-net_en"
CSS = (".terms main{overflow-wrap:anywhere}.terms .doc{padding-block:8px 24px}"
       ".terms h1{font-size:clamp(2.1rem,6vw,3.2rem);margin-bottom:10px}.terms .upd{color:var(--muted);font-size:.95rem;margin-bottom:22px}"
       ".terms h2{font-size:clamp(1.25rem,3.4vw,1.6rem);margin:1.7em 0 .5em}.terms h2:first-child{margin-top:0}"
       ".terms .dots{list-style:disc;padding-left:1.3em;margin:0 0 .8em}.terms .dots li{margin-bottom:.35em}"
       ".terms .clay p:last-child{margin-bottom:0}")


def date(code):
    d, m, y = DATE
    if code in ("ja", "zh", "zht"):
        return f"{y}/{m:02d}/{d:02d}"
    if code == "ko":
        return f"{y}. {m}. {d}."
    if code in ("de", "ru", "pl", "tr"):
        return f"{d:02d}.{m:02d}.{y}"
    if code == "nl":
        return f"{d:02d}-{m:02d}-{y}"
    return f"{d:02d}/{m:02d}/{y}"


def page(code, b):
    """b = the build module (texts, head, icons, language list). Returns (html, text drawn with the display font)."""
    e, LANGS, BASE = b.e, b.LANGS, b.BASE
    t, x = b.load(code), T[code]
    slug, hl, play_hl, pcode = LANGS[code]
    me = b.terms_slug(code)
    canon = BASE + me
    links = {"EEA": f"https://support.google.com/googleplay/answer/15576634?hl={play_hl}",
             "REF": f"https://support.google.com/googleplay/answer/2479637?hl={play_hl}", "ECC": ECC}
    priv = f"privacy.html?lang={pcode}#privacy"

    def rich(s):
        s = e(s)
        s = re.sub(r"\[([^\]]+)\]\(@([A-Z]+)\)", lambda m: f'<a href="{e(links[m.group(2)])}" rel="noopener">{m.group(1)}</a>', s)
        return (s.replace("{OWNER}", e(OWNER)).replace("{E}", f'<a href="mailto:{MAIL}">{MAIL}</a>')
                .replace("{P}", f'<a href="{priv}">tanetto.app/privacy.html</a>')
                .replace("{D}", '<a href="elimina-account.html">tanetto.app/elimina-account.html</a>')
                .replace("{LIC}", '<a href="licenses.html">tanetto.app/licenses.html</a>'))

    title = f'{x["title"]} · Tanetto'
    desc = re.sub(r"\s*\(\{P\}\)|（\{P\}）|\(\{P\}\)", "", x["intro"])
    out = b.head_common(t, code, title, desc, canon, "", t["og_alt"], CSS, alternates=False)
    i = out.index(f'<link rel="canonical" href="{canon}">') + 1
    out[i:i] = [f'<link rel="alternate" hreflang="{h}" href="{BASE}{b.terms_slug(c)}">' for c, (_s, h, _p, _q) in LANGS.items()] + \
        [f'<link rel="alternate" hreflang="x-default" href="{BASE}terms">']
    if code == "en":  # ?lang= from the privacy page, and browsers in another language, go to their page
        out.insert(out.index('<meta name="viewport" content="width=device-width,initial-scale=1">') + 1, '<script src="site/terms.js"></script>')
    out.append(f'<script src="site/t.js" defer data-p="{me}"></script>')
    out.append("</head>")
    items = []
    for c, (s, h, _p, _q) in LANGS.items():
        cur = ' aria-current="page"' if c == code else ""
        href = "terms?lang=en" if c == "en" else b.terms_slug(c)
        items.append(f'<li><a href="{href}" hreflang="{h}" lang="{h}"{cur}>{e(b.load(c)["lang_name"])}</a></li>')
    menu = (f'<details class="langs"><summary><span class="sr">{e(t["lang_label"])}: </span>{b.icon("globe")}'
            f'<span>{e(t["lang_name"])}</span>{b.icon("chev", "ic chev")}</summary><ul>{"".join(items)}</ul></details>')
    body = [f'<body class="terms"><a class="skip" href="#main">{e(t["skip"])}</a>',
            f'<header class="top wrap"><a class="brand" href="{slug}" aria-label="Tanetto"><img src="site/img/icon-80.webp" width="40" height="40" alt=""><span>Tanetto</span></a>',
            menu, "</header>", '<main id="main" class="wrap narrow doc">',
            f'<h1>{e(x["title"])}</h1><p class="upd">{e(x["upd"].format(date=date(code)))}</p>',
            f'<div class="clay"><p>{rich(x["intro"])}</p>']
    disp = [x["title"]]
    for head, paras in x["s"]:
        disp.append(head)
        body.append(f"<h2>{e(head)}</h2>")
        for p in paras:
            if isinstance(p, list):
                body.append('<ul class="dots">' + "".join(f"<li>{rich(li)}</li>" for li in p) + "</ul>")
            else:
                body.append(f"<p>{rich(p)}</p>")
    body.append("</div></main>")
    body.append(f'<footer class="foot"><div class="wrap"><nav aria-label="{e(t["footer_label"])}"><ul class="links">'
                f'<li><a href="{slug}">Tanetto</a></li>'
                f'<li><a href="{priv}">{e(t["privacy"])}</a></li>'
                f'<li><a href="{me}" aria-current="page">{e(t["terms"])}</a></li>'
                f'<li><a href="press-kit">{e(t["press"])}</a></li>'
                f'<li><a href="elimina-account.html">{e(t["delete"])}</a></li>'
                f'<li><a href="mailto:{MAIL}">{e(t["contact"])}</a></li></ul></nav>'
                f'<p>{e(t["made_by"])}</p><p class="tm">{e(t["play_tm"])}</p></div></footer></body></html>')
    disp += ["Tanetto"]
    return "\n".join(out + body) + "\n", "".join(disp)
