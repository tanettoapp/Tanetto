"""1.0.11 sito: indirizzo e-mail dell'informativa (K-01), contrasto delle pagine (K-07), pagine leggibili senza JavaScript (K-08, M-50)."""
import sys, json; sys.path.insert(0, __import__("os").path.dirname(__import__("os").path.abspath(__file__))); import lib110 as T

LUM = """(sel) => { const L = (c) => { const m = c.match(/[\\d.]+/g).map(Number); const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); };
  const bg = (e) => { while (e) { const c = getComputedStyle(e).backgroundColor; if (c && !/rgba\\(0, 0, 0, 0\\)|transparent/.test(c)) return c; e = e.parentElement; } return 'rgb(255,255,255)'; };
  return [...document.querySelectorAll(sel)].filter((e) => e.getClientRects().length && e.textContent.trim()).map((e) => { const a = L(getComputedStyle(e).color), b = L(bg(e)); return Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100; }); }"""

async def main(b):
    T.serve(); ctx = await b.new_context(locale="it-IT"); pg = await ctx.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    for l in ("it", "en", "de"):
        await pg.goto(f"http://127.0.0.1:{T.PORT}/privacy.html?lang={l}"); await pg.wait_for_timeout(800)
        hrefs = await pg.evaluate("[...document.querySelectorAll('a[href^=\"mailto:\"]')].map(a => a.getAttribute('href'))")
        T.check(f"K-01 privacy.html {l}: mailto senza punto finale {hrefs[:2]}", hrefs and all(not h.endswith(".") for h in hrefs), hrefs)
    T.check("nessun errore", not errs, errs[:2])
    await ctx.close()
    # K-08 / M-50: senza JavaScript (motori di ricerca, browser semplici) le pagine non sono vuote
    ctx = await b.new_context(locale="en-GB", java_script_enabled=False); pg = await ctx.new_page()
    await pg.goto(f"http://127.0.0.1:{T.PORT}/privacy.html"); txt = await pg.inner_text("body")
    T.check(f"K-08 privacy.html senza JavaScript: informativa e condizioni in inglese ({len(txt)} caratteri)", len(txt) > 3000 and "legal rights as a consumer" in txt, txt[:120])
    canon = await pg.get_attribute("link[rel=canonical]", "href")
    T.check("K-08 privacy.html: indirizzo canonico", bool(canon) and canon.startswith("https://"), canon)
    await pg.goto(f"http://127.0.0.1:{T.PORT}/elimina-account.html"); txt = await pg.inner_text("body")
    T.check("M-50 elimina-account.html senza JavaScript: titolo, spiegazione ed e-mail per chi non riesce ad accedere", "Delete your Tanetto account" in txt and "Can't sign in" in txt and "@" in txt, txt[:160])
    await ctx.close()
    # G-12: se lo script dell'app non parte (motore web vecchio, qui JavaScript spento) dopo 20 s compare la spiegazione
    ctx = await b.new_context(locale="en-GB", java_script_enabled=False); pg = await ctx.new_page()
    await pg.goto(f"http://127.0.0.1:{T.PORT}/index.html"); await pg.wait_for_timeout(3000)
    early = await pg.locator("#v26old").is_visible(); await pg.wait_for_timeout(19000); late = await pg.locator("#v26old").is_visible()
    T.check("G-12 app che non parte: dopo 20 s il messaggio 'aggiorna Android System WebView' (prima i puntini per sempre)", not early and late, (early, late))
    await ctx.close()
    ctx = await b.new_context(locale="en-GB"); pg = await ctx.new_page(); await pg.goto(f"http://127.0.0.1:{T.PORT}/index.html"); await pg.wait_for_timeout(4000)
    T.check("G-12 app partita: il messaggio non c'e'", await pg.locator("#v26old").count() == 0)
    await ctx.close()
    # K-07 contrasto (con JavaScript, chiaro e scuro): testo normale almeno 4,5:1
    for scheme in ("light", "dark"):
        ctx = await b.new_context(locale="en-GB", color_scheme=scheme); pg = await ctx.new_page()
        for path, sel in (("privacy.html", "p, li, h1, h2, a, .muted"), ("elimina-account.html", "p, h1, label, button, a, .muted"), ("get/", "p, h1, a, .muted, small"), ("test/", "p, h1, a, .muted, small")):
            await pg.goto(f"http://127.0.0.1:{T.PORT}/{path}"); await pg.wait_for_timeout(700)
            r = await pg.evaluate(f"({LUM})({json.dumps(sel)})")
            T.check(f"K-07 {path} {scheme}: contrasto minimo {min(r) if r else '-'}:1 (>= 4,5)", r and min(r) >= 4.5, sorted(r)[:5])
        await ctx.close()
T.run(main)
