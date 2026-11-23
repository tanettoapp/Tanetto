"""Tanetto press kit (press/index.html), in English, with the same look as the language pages."""
import html
import os

from PIL import Image

e = lambda s: html.escape(s, quote=True)  # noqa: E731

VERSION = "1.0.11"  # the version on Google Play: build.py checks that it is the same as its VERSION

FACTS = [
    ("What it is", "A cozy self-care habit app with a little 3D companion, for Android. Habit tracker and virtual pet in one."),
    ("In one line", "Take care of yourself one tiny step at a time, and watch a little friend grow with you."),
    ("Developer", "Snugbloom Studio, a one-person studio in Italy."),
    ("Platform", "Android 7.0 and later, on Google Play. A version that runs in the browser is on the website."),
    ("On Google Play since", "10/11/2026 (version 1.0.8)."),
    ("Current version", VERSION + ": a home-screen widget in two sizes with your companion in 3D, the room that changes and plays its own music for seasonal events, a weekly postcard to share (only the 7 days and the season: no goals, mood or journal), an icon of your choice next to your name, a new app icon, four new Latin American destinations in Spanish and a gentler voice in all 14 languages."),
    ("Price", "Free to download. Optional Tanetto Plus subscription, monthly or yearly (in Italy €4.99 a month or €44.99 a year; Google Play shows the price in each country's currency), and optional packs of Tanì, the in-app coins. No paid random boxes."),
    ("Ads", "Only reward videos that the user chooses to watch, up to 5 a day; nothing plays on its own. No ads with Plus. Anyone who enters an age under 13 gets no ads at all. For minors, and for anyone who prefers not to give their age, the videos are never personalised."),
    ("Languages (14)", "English, Italian, German, Spanish, French, Portuguese (Brazil), Japanese, Korean, Simplified Chinese, Traditional Chinese, Russian, Polish, Dutch, Turkish."),
    ("Who it's for", "People aged 13 and up; Tanetto is not directed to children under 13. The app asks once for month and year of birth: the age is declared by the user and checked only on the phone. Anyone who enters a younger age, or prefers not to give their age, gets a protected mode: no statistics, no Tanetto account or online backup, no sharing outside the app and no offers or nudges to buy, not even the free trial (and, under 13, no ads)."),
    ("Account", "Not needed. An optional account (Google or email) backs up progress for free. Accounts are only for people old enough to agree to it under the privacy law of their country (13 to 16, depending on the country)."),
    ("Companions", "Germo the sprout, Ondi the otter and Lumi the firefly are included for everyone. Miko the kitten, Rufi the fox, Pingo the penguin and Dori the little dragon come with Plus."),
    ("How it works", "Pick 3 to 8 tiny goals a day (a glass of water, a short walk, a few pages, an early night) and tick each one with a tap. Every goal packs something into the companion's backpack; a full backpack means a trip to a real place, half a backpack a short trip nearby, and every trip ends with a postcard for the album."),
    ("Also inside", "A cozy room to decorate, outfits, a mood journal with a question of the day, guided breathing, letters to your future self, mini-games, a home-screen widget and a weekly summary picture to share."),
    ("Kind by design", "The companion is never sad or sick. One goal keeps the streak, a weekly rest day counts, streak shields cover busy days, and coming back after a break brings a warm welcome and a small gift."),
    ("Seasons and events", "Each season has its own path, a weekly challenge and a festival week: the Season of Lanterns until 31/12/2026, the Season of Stars from 01/01/2027 and the Kite Season from 01/03/2027. Christmas runs from 08/12 to 06/01."),
    ("Accessibility", "Larger text and a Fewer animations setting."),
    ("Safety", "Tanetto is a wellbeing and habit app, not a medical service, and does not replace professional help. The journal (and the chat, with Plus) shows helplines for the user's country, one tap away."),
    ("Privacy", "Goals, journal and companion are saved on the phone; a copy goes to a backup only if the user creates the optional account or has Android backup turned on."),
]

ASSETS = [
    ("Brand", [("tanetto-icon-1024.png", "App icon: Germo the sprout (PNG, square)"),
               ("tanetto-feature-graphic.jpg", "Feature graphic with the Tanetto wordmark: all seven companions"),
               ("tanetto-feature-graphic-no-text.jpg", "Feature graphic without text")]),
    (f"Screenshots (English, version {VERSION})", [(f"screen-en-{n:02d}.jpg", c) for n, c in enumerate([
        "Tiny goals, a happy little friend", "Watch your friend grow and celebrate each level",
        "Decorate a cosy room, one little thing at a time", "Trips to real places, a postcard for you",
        "Gentle reminders for water, breaks and sleep", "Meet Germo and friends",
        "With Plus: 24 world trips and 4 more companions", "Elusive treasures, worth saving up for"], 1)]),
    ("Companions", [("germo.png", "Germo the sprout, included for everyone (transparent PNG)"),
                    ("ondi.png", "Ondi the otter, included for everyone (transparent PNG)"),
                    ("lumi.png", "Lumi the firefly, included for everyone (transparent PNG)"),
                    ("miko_plus.png", "Miko the kitten, a Tanetto Plus companion (transparent PNG)"),
                    ("rufi_plus.png", "Rufi the fox, a Tanetto Plus companion (transparent PNG)"),
                    ("pingo_plus.png", "Pingo the penguin, a Tanetto Plus companion (transparent PNG)"),
                    ("dori_plus.png", "Dori the little dragon, a Tanetto Plus companion (transparent PNG)")]),
    ("Moments", [("germo_depart.png", "Germo packs a suitcase for a trip (transparent PNG)"),
                 ("germo_postcard.png", "Germo with a postcard for the album (transparent PNG)"),
                 ("germo_gift.png", "Germo with the daily gift (transparent PNG)"),
                 ("germo_reading.png", "Germo reading: the journal (transparent PNG)")]),
    ("Postcards", [("postcard_london.jpg", "Postcard from London, one of the real places the companions travel to"),
                   ("postcard_newyork.jpg", "Postcard from New York, one of the real places the companions travel to"),
                   ("postcard_highlands.jpg", "Postcard from the Scottish Highlands"),
                   ("postcard_grandcanyon.jpg", "Postcard from the Grand Canyon"),
                   ("postcard_santorini_plus.jpg", "Postcard from Santorini, from one of the 24 Tanetto Plus trips around the world"),
                   ("postcard_machupicchu_plus.jpg", "Postcard from Machu Picchu, from one of the 24 Tanetto Plus trips around the world")]),
    ("Seasons", [("season_lanterns.jpg", "Season of Lanterns: Germo and Lumi")]),
]

REDIRECT = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tanetto press kit</title>
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="https://tanetto.app/press-kit">
<meta http-equiv="refresh" content="0; url=../press-kit">
</head>
<body><p><a href="../press-kit">Tanetto press kit</a></p></body>
</html>
"""

STORE = "/mnt/user-data/outputs/store_1011/en/phone"  # the 1.0.11 Store screenshots (same order as on Google Play)

CSS = (".press .hero{grid-template-columns:1fr}.press h1{font-size:clamp(2.2rem,6vw,3.4rem)}"
       ".banner{border-radius:28px;box-shadow:var(--sh);margin-top:8px}"
       ".dl{display:grid;grid-template-columns:200px 1fr;gap:10px 20px;margin:0}.dl dt{font-weight:700}.dl dd{margin:0}"
       "@media (max-width:640px){.dl{grid-template-columns:1fr;gap:2px}.dl dd{margin-bottom:12px}}"
       ".assets{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px}"
       ".asset{background:var(--paper);border-radius:20px;box-shadow:0 3px 0 var(--edge);padding:10px;display:flex;flex-direction:column;gap:8px}"
       ".asset .th{background:var(--paper2);border-radius:12px;display:grid;place-items:center;aspect-ratio:4/3;overflow:hidden}"
       ".asset .th img{max-height:100%;width:auto;object-fit:contain}.asset.tall .th{aspect-ratio:9/14}"
       ".asset p{font-size:.92rem;margin:0;flex:1}.asset .m{color:var(--muted);font-size:.85rem}"
       ".asset a{font-weight:700;padding-block:8px}.btns{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center}"
       ".mail{display:inline-flex;align-items:center;min-height:48px;padding:10px 20px;border-radius:999px;font-weight:700;"
       "color:var(--gi);box-shadow:inset 0 0 0 2px var(--gi);text-decoration:none}"
       ".press .sec{padding-top:56px}.press .clay p:last-child{margin-bottom:0}")


def thumbs(root):
    """Small WebP previews for the press page (the downloads stay the original files)."""
    out = os.path.join(root, "site", "img", "press")
    os.makedirs(out, exist_ok=True)
    for n in range(1, 9):
        dst = os.path.join(root, "press", "files", f"screen-en-{n:02d}.jpg")
        if not os.path.exists(dst) and os.path.exists(f"{STORE}/{n:02d}.png"):
            Image.open(f"{STORE}/{n:02d}.png").convert("RGB").save(dst, "JPEG", quality=88, optimize=True, progressive=True)
    for _, items in ASSETS:
        for f, _c in items:
            src = os.path.join(root, "press", "files", f)
            dst = os.path.join(out, os.path.splitext(f)[0] + ".webp")
            if not os.path.exists(dst):
                im = Image.open(src)
                im = im.convert("RGBA" if im.mode in ("RGBA", "P", "LA") else "RGB")
                w = 300
                im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(dst, "WEBP", quality=80, method=6)


def build(root, head_common, load, icon, badge, base):
    thumbs(root)
    t = dict(load("en"))
    t["og_locale"] = "en_US"
    title = "Tanetto press kit: fact sheet, descriptions and images"
    desc = "Press kit for Tanetto, the cozy habit tracker with a 3D self-care pet: fact sheet, ready-to-use descriptions, screenshots and images to download."
    out = head_common(t, "en", title, desc, base + "press-kit", "", t["og_alt"], CSS, alternates=False)
    out.append('<script src="site/t.js" defer data-p="press"></script></head>')
    b = ['<body class="press"><a class="skip" href="#main">Skip to content</a>',
         '<header class="top wrap"><a class="brand" href="en"><img src="site/img/icon-80.webp" width="40" height="40" alt=""><span>Tanetto</span></a>'
         '<a href="en">Visit the website</a></header><main id="main" class="wrap">',
         '<section class="hero" aria-labelledby="h1"><div><p class="eyebrow">Press kit</p><h1 id="h1">Tanetto, the habit tracker with a little friend</h1>'
         '<p class="lead">Everything you need to write about Tanetto: the facts, ready-to-use descriptions and images you are welcome to use.</p>'
         f'<div class="btns">{badge("en", t, "press", "").replace("utm_source%3Dsite", "utm_source%3Dpress")}'
         '<a class="mail" href="mailto:tanettoapp@gmail.com">Press: tanettoapp@gmail.com</a></div></div></section>',
         '<img class="banner" src="site/img/scene-1024.webp" width="1024" height="500" alt="Germo the sprout with Lumi, Ondi, Miko, Pingo, Rufi and Dori on a sunny meadow, under a line of postcards" fetchpriority="high">',
         '<section class="sec" aria-labelledby="fs"><div class="clay"><h2 id="fs">Fact sheet</h2><p class="small">All dates are DD/MM/YYYY.</p><dl class="dl">']
    for k, v in FACTS:
        b.append(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>")
    b.append('<dt>Press contact</dt><dd><a href="mailto:tanettoapp@gmail.com">tanettoapp@gmail.com</a>. Tanetto Plus codes for reviews are available on request.</dd></dl></div></section>')
    b.append('<section class="sec" aria-labelledby="ds"><div class="clay"><h2 id="ds">Short description</h2>'
             '<p>Tanetto is a cozy self-care habit app for Android. Pick a few tiny goals a day, tick them off, and a little 3D companion grows, decorates its room and travels to real places, sending you postcards. Rest days are fine. No guilt.</p>'
             '<h2>Long description</h2>'
             '<p>Tanetto turns small acts of self-care into a little adventure. Each day you pick 3 to 8 tiny goals, like drinking a glass of water, stepping outside for five minutes or going to bed a bit earlier. Every goal you tick packs something into your companion\'s backpack. With a full backpack it sets off for somewhere real, like London or the Grand Canyon, and sends you a postcard for your album.</p>'
             '<p>The app is built around one rule: never make people feel bad. The companion is never sad or sick, rest days count, streak shields cover the busy days, and coming back after a break gets you a warm welcome.</p>'
             '<p>Tanetto is free to download, in 14 languages. The only ads are reward videos you choose to watch, and the optional Plus subscription adds four more companions, a chat with your companion and 24 trips around the world.</p>'
             '<h2>The story</h2><p>Tanetto is made by one person in Italy. It started as a web app in October 2026, went through a closed test on Google Play, and some of its kindest rules came from the testers: shorter trips for busy days, a Skip button in the first steps and fewer goals to choose from at the start.</p></div></section>')
    b.append('<section class="sec" aria-labelledby="im"><h2 id="im">Images</h2><p class="sub">You\'re welcome to use these images to write about Tanetto. Please don\'t edit the characters.</p>')
    for group, items in ASSETS:
        gid = "g-" + group.split()[0].lower()
        b.append(f'<h3 id="{gid}" style="margin:26px 0 12px">{e(group)}</h3><ul class="assets" aria-labelledby="{gid}">')
        for f, c in items:
            path = os.path.join(root, "press", "files", f)
            with Image.open(path) as im:
                w, h = im.size
            kb = os.path.getsize(path) / 1024
            size = f"{w} × {h} · {kb:,.0f} KB".replace(",", ".")
            th = "site/img/press/" + os.path.splitext(f)[0] + ".webp"
            tw, thh = 300, round(h * 300 / w)
            tall = " tall" if h > w else ""
            b.append(f'<li class="asset{tall}"><div class="th"><img src="{th}" width="{tw}" height="{thh}" loading="lazy" decoding="async" alt=""></div>'
                     f'<p>{e(c)}</p><span class="m">{size}</span><a href="press/files/{f}" download>Download<span class="sr">: {e(c)}</span></a></li>')
        b.append("</ul>")
    b.append("</section>")
    b.append('<section class="sec" aria-labelledby="ct"><div class="clay"><h2 id="ct">Contact</h2><p>Press: <a href="mailto:tanettoapp@gmail.com">tanettoapp@gmail.com</a>. Tanetto Plus codes for reviews are available on request.</p>'
             '<p>Snugbloom Studio, a one-person studio in Italy.</p></div></section></main>')
    b.append('<footer class="foot"><div class="wrap"><nav aria-label="Useful links"><ul class="links">'
             '<li><a href="en">Website</a></li><li><a href="privacy.html?lang=en#privacy">Privacy policy</a></li>'
             '<li><a href="terms?lang=en">Terms of use</a></li><li><a href="mailto:tanettoapp@gmail.com">Contact</a></li></ul></nav>'
             f'<p class="tm">{e(t["play_tm"])}</p></div></footer></body></html>')
    with open(os.path.join(root, "press-kit.html"), "w", encoding="utf-8") as f:
        f.write("\n".join(out + b) + "\n")
    # the old address keeps working (it was shared with journalists) and sends people to the new page
    with open(os.path.join(root, "press", "index.html"), "w", encoding="utf-8") as f:
        f.write(REDIRECT)
