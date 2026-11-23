"""Tanetto site: builds the 14 language pages, the 14 terms of use pages (terms.py), the press kit, sitemap.xml and robots.txt.

Run from the repository root:  python3 _site_src/build.py
The home page (index.html, https://tanetto.app/) is the English page with canonical "/" and a tiny script (site/lang.js)
that sends visitors to their language page; the web app lives in /app/ (built from the app repository with tools/build.py).
Texts live in _site_src/i18n/<code>.py (one file per language), images and fonts in /site (see assets.py).
Nothing here touches the app (/app/, privacy.html, elimina-account.html, licenses.html, fb.js, app-ads.txt) or sw.js.
"""
import html
import importlib.util
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from captions import CAPS  # noqa: E402  the captions printed on the Store images (used as alt text)

BASE = "https://tanetto.app/"
PKG = "com.tanettoapp.tanetto"
VERSION = "1.0.11"
APP = "app/"  # the web app, relative to the site root
# app code -> (url slug, hreflang / html lang, Google Play hl, privacy page code)
LANGS = {
    "en": ("en", "en", "en", "en"), "it": ("it", "it", "it", "it"), "de": ("de", "de", "de", "de"),
    "es": ("es", "es", "es", "es"), "fr": ("fr", "fr", "fr", "fr"), "pt": ("pt", "pt", "pt-BR", "pt"),
    "ja": ("ja", "ja", "ja", "ja"), "ko": ("ko", "ko", "ko", "ko"), "zh": ("zh-hans", "zh-Hans", "zh-CN", "zh"),
    "zht": ("zh-hant", "zh-Hant", "zh-TW", "zht"), "ru": ("ru", "ru", "ru", "ru"), "pl": ("pl", "pl", "pl", "pl"),
    "nl": ("nl", "nl", "nl", "nl"), "tr": ("tr", "tr", "tr", "tr"),
}
PETS = [("germo", False), ("ondi", False), ("lumi", False), ("miko", True), ("rufi", True), ("pingo", True), ("dori", True)]
HERO_SIZES = "(min-width: 960px) 300px, 250px"
# the 4 real places each language travels to in the app (src/40_data.js, 41a_real_asia.js, 41b_real_eu.js)
TRIPS = {
    "en": [("london", "London"), ("newyork", "New York"), ("grandcanyon", "Grand Canyon"), ("highlands", "Scottish Highlands")],
    "it": [("venezia", "Venezia"), ("dolomiti", "Dolomiti"), ("cinqueterre", "Cinque Terre"), ("roma", "Roma")],
    "de": [("neuschwanstein", "Neuschwanstein"), ("schwarzwald", "Schwarzwald"), ("bodensee", "Bodensee"), ("berlin", "Berlin")],
    "es": [("sevilla", "Sevilla"), ("granada", "Granada"), ("barcelona", "Barcelona"), ("tenerife", "Tenerife")],
    "fr": [("paris", "Paris"), ("montsaintmichel", "Mont-Saint-Michel"), ("provence", "Provence"), ("chamonix", "Chamonix")],
    "pt": [("rio", "Rio de Janeiro"), ("amazonia", "Amazônia"), ("lencois", "Lençóis Maranhenses"), ("iguacu", "Foz do Iguaçu")],
    "ja": [("tokyo", "東京"), ("fuji", "富士山"), ("kyoto", "京都"), ("hokkaido", "北海道")],
    "ko": [("seoul", "서울"), ("busan", "부산"), ("seorak", "설악산"), ("jeju", "제주도")],
    "zh": [("greatwall", "长城"), ("shanghai", "上海"), ("guilin", "桂林"), ("zhangjiajie", "张家界")],
    "zht": [("taipei101", "台北101"), ("jiufen", "九份"), ("sunmoonlake", "日月潭"), ("taroko", "太魯閣")],
    "ru": [("moskva", "Москва"), ("piter", "Санкт-Петербург"), ("baikal", "Байкал"), ("kamchatka", "Камчатка")],
    "pl": [("krakow", "Kraków"), ("tatry", "Tatry"), ("gdansk", "Gdańsk"), ("bialowieza", "Puszcza Białowieska")],
    "nl": [("amsterdam", "Amsterdam"), ("kinderdijk", "Kinderdijk"), ("keukenhof", "Keukenhof"), ("wadden", "Waddenzee")],
    "tr": [("istanbul", "İstanbul"), ("kapadokya", "Kapadokya"), ("pamukkale", "Pamukkale"), ("efes", "Efes")],
}
SOCIAL = ["https://www.tiktok.com/@tanettoapp", "https://www.instagram.com/tanettoapp/"]


_CACHE = {}


def terms_slug(code):
    """The terms of use page of a language: /terms (English, also for Google Play and the app) and /terms-<slug>."""
    return "terms" if code == "en" else "terms-" + LANGS[code][0]


def load(code):
    if code in _CACHE:
        return _CACHE[code]
    if not os.path.exists(os.path.join(HERE, "i18n", code + ".py")):
        raise SystemExit("missing texts: _site_src/i18n/" + code + ".py")
    spec = importlib.util.spec_from_file_location(code, os.path.join(HERE, "i18n", code + ".py"))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    _CACHE[code] = m.T
    return m.T


def e(s):
    return html.escape(s, quote=True)


def play_url(code, src="site", medium="web"):
    slug, _, hl, _ = LANGS[code]
    ref = f"utm_source%3D{src}%26utm_medium%3D{medium}%26utm_campaign%3D{slug}"
    return f"https://play.google.com/store/apps/details?id={PKG}&hl={hl}&referrer={ref}"


# ---------- fonts ----------
FACE = "@font-face{{font-family:'{f}';font-style:normal;font-weight:{w};font-display:swap;src:url({u}) format('woff2');unicode-range:{r}}}"
LAT = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
LATX = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
CYR = "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116"


def fonts_css(code, pre):
    """Returns (@font-face css, [preload urls], css variables). pre = path prefix to the site root."""
    latin = [FACE.format(f="Fredoka", w=600, u=f"{pre}fonts/fredoka-latin-600-normal.woff2", r=LAT),
             FACE.format(f="Fredoka", w=600, u=f"{pre}fonts/fredoka-latin-ext-600-normal.woff2", r=LATX),
             FACE.format(f="Figtree", w=400, u=f"{pre}fonts/figtree-latin-400-normal.woff2", r=LAT),
             FACE.format(f="Figtree", w=400, u=f"{pre}fonts/figtree-latin-ext-400-normal.woff2", r=LATX),
             FACE.format(f="Figtree", w=700, u=f"{pre}fonts/figtree-latin-700-normal.woff2", r=LAT),
             FACE.format(f="Figtree", w=700, u=f"{pre}fonts/figtree-latin-ext-700-normal.woff2", r=LATX),
             FACE.format(f="Caveat", w=700, u=f"{pre}caveat-700.woff2", r=LAT)]
    pl_latin = [f"{pre}fonts/fredoka-latin-600-normal.woff2", f"{pre}fonts/figtree-latin-400-normal.woff2"]
    if code == "ru":
        faces = [FACE.format(f="Nunito", w=w, u=f"{pre}site/fonts/nunito-{s}-{w}.woff2", r=r)
                 for w in (400, 700) for s, r in (("cyrillic", CYR), ("latin", LAT))]
        faces.append(FACE.format(f="Caveat", w=700, u=f"{pre}caveat-700.woff2", r=LAT))
        return "".join(faces), [f"{pre}site/fonts/nunito-cyrillic-700.woff2", f"{pre}site/fonts/nunito-cyrillic-400.woff2"], \
            "--fd:'Nunito',system-ui,sans-serif;--fb:'Nunito',system-ui,sans-serif;--fdw:700"
    if code == "ja":
        return FACE.format(f="Tanetto JA", w=700, u=f"{pre}site/fonts/ja-display.woff2", r="U+0000-FFFF") + latin[-1], \
            [f"{pre}site/fonts/ja-display.woff2"], \
            "--fd:'Tanetto JA','Hiragino Maru Gothic ProN','Noto Sans CJK JP',sans-serif;--fb:'Hiragino Sans','Noto Sans CJK JP','Noto Sans JP','Yu Gothic',system-ui,sans-serif;--fdw:700"
    if code == "ko":
        return FACE.format(f="Tanetto KO", w=400, u=f"{pre}site/fonts/ko-display.woff2", r="U+0000-FFFF") + latin[-1], \
            [f"{pre}site/fonts/ko-display.woff2"], \
            "--fd:'Tanetto KO','Noto Sans CJK KR','Noto Sans KR',sans-serif;--fb:'Noto Sans CJK KR','Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;--fdw:400"
    if code == "zh":
        return latin[-1], [], "--fd:'Noto Sans CJK SC','Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;--fb:'Noto Sans CJK SC','Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif;--fdw:700"
    if code == "zht":
        return latin[-1], [], "--fd:'Noto Sans CJK TC','Noto Sans TC','PingFang TC','Microsoft JhengHei',system-ui,sans-serif;--fb:'Noto Sans CJK TC','Noto Sans TC','PingFang TC','Microsoft JhengHei',system-ui,sans-serif;--fdw:700"
    return "".join(latin), pl_latin, "--fd:'Fredoka','Nunito',system-ui,sans-serif;--fb:'Figtree',system-ui,-apple-system,'Segoe UI',sans-serif;--fdw:600"


def subset_display_fonts(code, text, src_dir):
    """Japanese and Korean titles use the app's rounded display fonts, cut down to the characters of the page."""
    src = {"ja": "MPLUSRounded1c-Bold.ttf", "ko": "Jua-Regular.ttf"}.get(code)
    if not src or not src_dir:
        return
    chars = "".join(sorted(set(text + "0123456789+:.,!?()-–·")))
    out = os.path.join(ROOT, "site", "fonts", f"{code}-display.woff2")
    subprocess.run(["pyftsubset", os.path.join(src_dir, src), f"--text={chars}", "--flavor=woff2",
                    f"--output-file={out}", "--layout-features=*", "--no-hinting", "--desubroutinize"], check=True)


CSS = open(os.path.join(HERE, "site.css"), encoding="utf-8").read()
ICONS = {
    "drop": '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
    "check": '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    "bag": '<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    "plane": '<path d="M3 13l18-8-6 16-3-7-9-1z"/>',
    "home": '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
    "shirt": '<path d="M8 4l4 2 4-2 4 4-3 3v9H7v-9L4 8z"/>',
    "book": '<path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z"/><path d="M9 8h6M9 12h6"/>',
    "wind": '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>',
    "puzzle": '<path d="M5 5h5a2 2 0 1 1 4 0h5v5a2 2 0 1 0 0 4v5h-5a2 2 0 1 0-4 0H5z"/>',
    "leaf": '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
    "bell": '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20h4"/>',
    "heart": '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z"/>',
    "shield": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    "lock": '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "eye": '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    "star": '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    "chat": '<path d="M4 5h16v11H9l-5 4z"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "chev": '<path d="M6 9l6 6 6-6"/>',
    "phone": '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
}


def icon(name, cls="ic"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{ICONS[name]}</svg>'


def head_common(t, code, title, desc, canon, pre, og_alt, extra_css="", alternates=True):
    slug, hl, _, _ = LANGS[code]
    faces, preload, vars_ = fonts_css(code, pre)
    out = ['<!doctype html>', f'<html lang="{hl}">', '<head>', '<meta charset="utf-8">',
           '<meta name="viewport" content="width=device-width,initial-scale=1">',
           "<meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; img-src 'self' data: https://tanettoapp.goatcounter.com; "
           "connect-src 'self' https://tanettoapp.goatcounter.com; style-src 'unsafe-inline'; font-src 'self'; script-src 'self'; "
           "object-src 'none'; base-uri 'self'; form-action 'none'\">",
           f'<title>{e(title)}</title>', f'<meta name="description" content="{e(desc)}">',
           f'<link rel="canonical" href="{canon}">']
    if alternates:
        for c, (s, h, _, _) in LANGS.items():
            out.append(f'<link rel="alternate" hreflang="{h}" href="{BASE}{s}">')
        out.append(f'<link rel="alternate" hreflang="x-default" href="{BASE}">')
    out += ['<meta name="theme-color" content="#F4EFE6" media="(prefers-color-scheme: light)">',
            '<meta name="theme-color" content="#1A1714" media="(prefers-color-scheme: dark)">',
            '<meta name="color-scheme" content="light dark">',
            f'<link rel="icon" type="image/png" sizes="32x32" href="{pre}favicon-32.png">',
            f'<link rel="apple-touch-icon" href="{pre}apple-touch-icon.png">',
            '<meta property="og:type" content="website">', '<meta property="og:site_name" content="Tanetto">',
            f'<meta property="og:title" content="{e(title)}">', f'<meta property="og:description" content="{e(desc)}">',
            f'<meta property="og:url" content="{canon}">', f'<meta property="og:locale" content="{t["og_locale"]}">',
            f'<meta property="og:image" content="{BASE}og.png">', '<meta property="og:image:width" content="1200">',
            '<meta property="og:image:height" content="630">', f'<meta property="og:image:alt" content="{e(og_alt)}">',
            '<meta name="twitter:card" content="summary_large_image">', f'<meta name="twitter:title" content="{e(title)}">',
            f'<meta name="twitter:description" content="{e(desc)}">', f'<meta name="twitter:image" content="{BASE}og.png">',
            f'<meta name="twitter:image:alt" content="{e(og_alt)}">']
    if alternates:
        out += [f'<meta property="og:locale:alternate" content="{load(c)["og_locale"]}">' for c in LANGS if c != code]
    for u in preload:
        out.append(f'<link rel="preload" href="{u}" as="font" type="font/woff2" crossorigin>')
    out.append(f"<style>{faces}:root{{{vars_}}}{CSS}{extra_css}</style>")
    return out


def lang_menu(code, t, pre, here):
    cur = t["lang_name"]
    items = []
    for c, (s, h, _, _) in LANGS.items():
        n = load(c)["lang_name"]
        attr = ' aria-current="page"' if c == code and here else ""
        items.append(f'<li><a href="{pre}{s}" hreflang="{h}" lang="{h}"{attr}>{e(n)}</a></li>')
    return (f'<details class="langs"><summary><span class="sr">{e(t["lang_label"])}: </span>{icon("globe")}'
            f'<span>{e(cur)}</span>{icon("chev", "ic chev")}</summary><ul>{"".join(items)}</ul></details>')


def badge(code, t, where, pre=""):
    return (f'<a class="badge" href="{e(play_url(code))}" rel="noopener" data-ev="play-{where}">'
            f'<img src="{pre}site/img/badge-{code}.webp" width="200" height="78" alt="{e(t["badge_alt"])}"></a>')


def page(code, root=False):
    """root=True: the home page https://tanetto.app/ (same content as the English page, canonical "/")."""
    t = load(code)
    slug, hl, _, pcode = LANGS[code]
    canon = BASE if root else BASE + slug
    disp = []  # text drawn with the display font (for the Japanese / Korean subsets)

    def D(s):
        disp.append(s)
        return e(s)

    def rich(s):  # **bold** and {web} link inside answers
        s = e(s)
        s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
        return s.replace("{web}", f'<a href="{APP}" data-ev="web-faq">{e(t["web_link_short"])}</a>').replace(
            "{finch}", f'<a href="#finch">{e(t["finch_link"])}</a>').replace("{mail}", '<a href="mailto:tanettoapp@gmail.com">tanettoapp@gmail.com</a>')

    caps = CAPS[code]
    cap = lambda i: " ".join(caps[i]).replace(" ,", ",")  # noqa: E731
    shots = [f"{BASE}site/img/{code}/s{n}-600.webp" for n in range(1, 9)]
    faq_ld = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"\*\*|\{(web|finch|mail)\}", lambda m: {"{web}": t["web_link_short"] + " (" + BASE + APP + ")", "{finch}": t["finch_link"], "{mail}": "tanettoapp@gmail.com"}.get(m.group(0), ""), a)}} for q, a in t["faq"]]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "MobileApplication", "@id": canon + "#app", "name": "Tanetto", "alternateName": t["store_title"],
         "description": t["meta_desc"], "operatingSystem": "Android 7.0+", "applicationCategory": "HealthApplication",
         "applicationSubCategory": t["app_subcat"], "inLanguage": [v[1] for v in LANGS.values()],
         "audience": {"@type": "PeopleAudience", "suggestedMinAge": 13},
         "url": canon, "downloadUrl": f"https://play.google.com/store/apps/details?id={PKG}",
         "installUrl": f"https://play.google.com/store/apps/details?id={PKG}", "image": BASE + "icon-512.png",
         "screenshot": shots, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR", "category": "free"},
         "author": {"@id": BASE + "#org"}, "publisher": {"@id": BASE + "#org"}},
        {"@type": "Organization", "@id": BASE + "#org", "name": "Snugbloom Studio", "url": BASE,
         "logo": BASE + "icon-512.png", "email": "tanettoapp@gmail.com",
         "sameAs": [f"https://play.google.com/store/apps/details?id={PKG}"] + SOCIAL},
        {"@type": "WebSite", "@id": BASE + "#site", "name": "Tanetto", "url": BASE, "publisher": {"@id": BASE + "#org"}},
        {"@type": "WebPage", "@id": canon + "#page", "url": canon, "name": t["meta_title"], "description": t["meta_desc"],
         "inLanguage": hl, "isPartOf": {"@id": BASE + "#site"}, "about": {"@id": canon + "#app"},
         "primaryImageOfPage": f"{BASE}site/img/{code}/hero-640.webp"},
        {"@type": "FAQPage", "@id": canon + "#faq", "inLanguage": hl, "mainEntity": faq_ld},
    ]}

    out = head_common(t, code, t["meta_title"], t["meta_desc"], canon, "", t["og_alt"])
    if root:  # before anything else loads: visitors whose browser speaks another language go to their page
        out.insert(out.index('<meta name="viewport" content="width=device-width,initial-scale=1">') + 1, '<script src="site/lang.js"></script>')
    out.append(f'<link rel="preload" as="image" href="site/img/{code}/hero-320.webp" imagesrcset="site/img/{code}/hero-320.webp 320w, site/img/{code}/hero-480.webp 480w, site/img/{code}/hero-640.webp 640w" imagesizes="{HERO_SIZES}" fetchpriority="high">')
    out.append('<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False).replace("</", "<\\/") + "</script>")
    out.append(f'<script src="site/t.js" defer data-p="{"home" if root else slug}"></script>')
    out.append("</head>")
    b = [f'<body><a class="skip" href="#main">{e(t["skip"])}</a>',
         f'<header class="top wrap"><a class="brand" href="{"./" if root else slug}" aria-label="Tanetto"><img src="site/img/icon-80.webp" width="40" height="40" alt=""><span>Tanetto</span></a>',
         lang_menu(code, t, "", True), "</header>", '<main id="main">']
    # hero
    b.append('<section class="hero wrap" aria-labelledby="h1">')
    b.append(f'<div class="hero-text"><h1 id="h1"><span class="eyebrow">{D(t["eyebrow"])}</span> '
             f'<span>{D(t["h1a"])}</span> <span class="g">{D(t["h1b"])}</span></h1>'
             f'<p class="lead">{e(t["lead"])}</p><div class="cta">{badge(code, t, "hero")}'
             f'<p class="note">{e(t["cta_note"])} {e(t["age_note"])}</p></div>'
             f'<p class="web">{icon("phone")}<a href="{APP}" data-ev="web-hero">{e(t["web_link"])}</a></p></div>')
    b.append(f'<div class="hero-art"><div class="blob" aria-hidden="true"></div>'
             f'<img class="phone" src="site/img/{code}/hero-320.webp" srcset="site/img/{code}/hero-320.webp 320w, site/img/{code}/hero-480.webp 480w, site/img/{code}/hero-640.webp 640w" '
             f'sizes="{HERO_SIZES}" width="320" height="678" alt="{e(t["hero_alt"])}" fetchpriority="high">'
             f'<img class="buddy" src="site/img/germo-love.webp" width="120" height="120" alt=""></div>')
    b.append("</section>")
    b.append('<ul class="facts wrap" aria-label="' + e(t["facts_label"]) + '">' + "".join(
        f'<li>{icon(i)}<span>{e(f)}</span></li>' for i, f in zip(["star", "lock", "eye", "heart"], t["facts"])) + "</ul>")
    # how it works
    b.append(f'<section class="sec wrap" id="how" aria-labelledby="how-t"><h2 id="how-t">{D(t["how_title"])}</h2><p class="sub">{e(t["how_sub"])}</p><ol class="steps">')
    for i, (st, tx) in enumerate(t["steps"]):
        slots = "".join(f'<span class="slot{" on" if k < (2, 4, 6)[i] else ""}"></span>' for k in range(6))
        b.append(f'<li class="clay step"><span class="num" aria-hidden="true">{i + 1}</span><div class="pack" aria-hidden="true">{slots}</div>'
                 f'<h3>{D(st)}</h3><p>{e(tx)}</p></li>')
    b.append("</ol></section>")
    # gallery
    b.append(f'<section class="sec gal" aria-labelledby="gal-t"><div class="wrap"><h2 id="gal-t">{D(t["gallery_title"])}</h2><p class="sub">{e(t["gallery_sub"])}</p></div>'
             f'<div class="shots" role="region" aria-label="{e(t["gallery_title"])}" tabindex="0"><ul>')
    for n in range(8):
        b.append(f'<li><img src="site/img/{code}/s{n + 1}-400.webp" srcset="site/img/{code}/s{n + 1}-400.webp 400w, site/img/{code}/s{n + 1}-600.webp 600w" sizes="(min-width: 700px) 240px, 220px" width="240" height="427" loading="lazy" decoding="async" alt="{e(cap(n))}"></li>')
    b.append("</ul></div></section>")
    # trips
    b.append(f'<section class="sec trips wrap" aria-labelledby="trips-t"><div class="trips-text"><h2 id="trips-t">{D(t["trips_title"])}</h2>'
             f'<p>{e(t["trips_text"])}</p><p class="small">{e(t["trips_note"])}</p></div><ul class="cards" aria-label="{e(t["cards_label"])}">')
    for i, (k, name) in enumerate(TRIPS[code]):
        b.append(f'<li class="pc pc{i}"><figure><img src="site/img/pc-{k}-300.webp" srcset="site/img/pc-{k}-300.webp 300w, site/img/pc-{k}.webp 480w" sizes="(min-width: 960px) 280px, calc(50vw - 40px)" width="480" height="320" loading="lazy" decoding="async" alt="{e(t["card_alt"].format(name))}">'
                 f'<figcaption>{e(name)}</figcaption></figure></li>')
    b.append("</ul></section>")
    # kind + fair
    b.append('<section class="sec wrap two" aria-label="' + e(t["values_label"]) + '">')
    for key, ic in (("kind", "heart"), ("fair", "shield")):
        b.append(f'<div class="clay val {key}"><h2>{icon(ic, "ic big")}{D(t[key + "_title"])}</h2><p>{e(t[key + "_text"])}</p><ul class="ticks">'
                 + "".join(f"<li>{icon('check')}<span>{e(p)}</span></li>" for p in t[key + "_points"]) + "</ul></div>")
    b.append("</section>")
    # features
    b.append(f'<section class="sec wrap" aria-labelledby="feat-t"><h2 id="feat-t">{D(t["feat_title"])}</h2><ul class="feats">')
    for ic, (ft, fx) in zip(["home", "shirt", "book", "wind", "puzzle", "leaf", "bell", "chat"], t["features"]):
        b.append(f'<li class="clay feat">{icon(ic, "ic big")}<h3>{D(ft)}</h3><p>{e(fx)}</p></li>')
    b.append("</ul></section>")
    # companions
    b.append(f'<section class="sec wrap" id="pets" aria-labelledby="pets-t"><h2 id="pets-t">{D(t["pets_title"])}</h2><p class="sub">{e(t["pets_sub"])}</p><ul class="pets">')
    for p, plus in PETS:
        tag = f'<span class="plus">Plus</span>' if plus else f'<span class="free">{e(t["free_tag"])}</span>'
        b.append(f'<li class="pet"><img src="site/img/pet-{p}.webp" width="120" height="120" loading="lazy" decoding="async" alt="">'
                 f'<h3>{D(p.capitalize())}</h3><p>{e(t["pets"][p])}</p>{tag}</li>')
    b.append("</ul></section>")
    # plus
    b.append(f'<section class="sec wrap" aria-labelledby="plus-t"><div class="clay plusbox"><div><p class="eyebrow gold">{D(t["plus_eyebrow"])}</p><h2 id="plus-t">{D(t["plus_title"])}</h2>'
             f'<p>{e(t["plus_text"])}</p></div><ul class="ticks">' + "".join(f"<li>{icon('star')}<span>{e(p)}</span></li>" for p in t["plus_points"]) + "</ul></div></section>")
    # finch
    b.append(f'<section class="sec wrap" id="finch" aria-labelledby="finch-t"><h2 id="finch-t">{D(t["finch_title"])}</h2><p class="sub wide">{e(t["finch_intro"])}</p><div class="two">')
    b.append(f'<div class="clay vs"><h3>{D(t["finch_diff_title"])}</h3><ul class="ticks">' + "".join(f"<li>{icon('check')}<span>{e(p)}</span></li>" for p in t["finch_diff"]) + "</ul></div>")
    b.append(f'<div class="clay vs alt"><h3>{D(t["finch_other_title"])}</h3><ul class="ticks">' + "".join(f"<li>{icon('arrow')}<span>{e(p)}</span></li>" for p in t["finch_other"]) + "</ul></div>")
    b.append(f'</div><p class="small center">{e(t["finch_note"])}</p></section>')
    # faq
    b.append(f'<section class="sec wrap narrow" id="faq" aria-labelledby="faq-t"><h2 id="faq-t">{D(t["faq_title"])}</h2><div class="faq">')
    for q, a in t["faq"]:
        b.append(f'<details><summary><span class="q">{e(q)}</span>{icon("chev", "ic chev")}</summary><p>{rich(a)}</p></details>')
    b.append("</div></section>")
    # final
    b.append(f'<section class="final wrap" aria-labelledby="fin-t"><img class="scene" src="site/img/scene-1024.webp" srcset="site/img/scene-640.webp 640w, site/img/scene-1024.webp 1024w" sizes="(min-width: 1160px) 1120px, calc(100vw - 40px)" width="1024" height="500" loading="lazy" decoding="async" alt="{e(t["scene_alt"])}">'
             f'<div><div class="clay fin"><h2 id="fin-t">{D(t["final_title"])}</h2><p>{e(t["final_text"])}</p>{badge(code, t, "final")}'
             f'<p class="web">{icon("phone")}<a href="{APP}" data-ev="web-final">{e(t["web_link"])}</a></p></div></div></section>')
    b.append("</main>")
    # footer
    b.append(f'<footer class="foot"><div class="wrap"><nav aria-label="{e(t["footer_label"])}"><ul class="links">'
             f'<li><a href="privacy.html?lang={pcode}#privacy">{e(t["privacy"])}</a></li>'
             f'<li><a href="{terms_slug(code)}">{e(t["terms"])}</a></li>'
             f'<li><a href="press-kit">{e(t["press"])}</a></li>'
             f'<li><a href="elimina-account.html">{e(t["delete"])}</a></li>'
             f'<li><a href="mailto:tanettoapp@gmail.com">{e(t["contact"])}</a></li></ul></nav>'
             f'<nav aria-label="{e(t["lang_label"])}"><ul class="links langlist">' + "".join(
                 f'<li><a href="{s}" hreflang="{h}" lang="{h}"' + (' aria-current="page"' if c == code else "") + f'>{e(load(c)["lang_name"])}</a></li>'
                 for c, (s, h, _, _) in LANGS.items()) + "</ul></nav>"
             f'<p>{e(t["made_by"])}</p><p class="tm">{e(t["play_tm"])}</p></div></footer></body></html>')
    disp += [t["badge_alt"], "Tanetto", "Plus", t["free_tag"]]
    return "\n".join(out + b) + "\n", "".join(disp)


def main():
    font_src = sys.argv[1] if len(sys.argv) > 1 else None
    import terms
    for code, (slug, *_r) in LANGS.items():
        html_, disp = page(code)
        thtml, tdisp = terms.page(code, sys.modules[__name__])
        subset_display_fonts(code, disp + tdisp, font_src)
        with open(os.path.join(ROOT, slug + ".html"), "w", encoding="utf-8") as f:
            f.write(html_)
        with open(os.path.join(ROOT, terms_slug(code) + ".html"), "w", encoding="utf-8") as f:
            f.write(thtml)
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
        f.write(page("en", root=True)[0])
    import press
    assert press.VERSION == VERSION, "press kit and site show different versions"
    press.build(ROOT, head_common, load, icon, badge, BASE)
    urls = [BASE + s for s, *_ in LANGS.values()]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    alts = "".join(f'<xhtml:link rel="alternate" hreflang="{h}" href="{BASE}{s}"/>' for s, h, _, _ in LANGS.values())
    alts += f'<xhtml:link rel="alternate" hreflang="x-default" href="{BASE}"/>'
    for u in [BASE] + urls:
        sm.append(f"<url><loc>{u}</loc>{alts}</url>")
    talts = "".join(f'<xhtml:link rel="alternate" hreflang="{LANGS[c][1]}" href="{BASE}{terms_slug(c)}"/>' for c in LANGS)
    talts += f'<xhtml:link rel="alternate" hreflang="x-default" href="{BASE}terms"/>'
    for c in LANGS:
        sm.append(f"<url><loc>{BASE}{terms_slug(c)}</loc>{talts}</url>")
    for u in (BASE + APP, BASE + "press-kit", BASE + "privacy.html"):
        sm.append(f"<url><loc>{u}</loc></url>")
    sm.append("</urlset>")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(sm) + "\n")


if __name__ == "__main__":
    main()
