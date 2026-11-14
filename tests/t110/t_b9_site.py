"""1.0.11 sito: indirizzo e-mail dell'informativa (K-01)."""
import sys, json; sys.path.insert(0, __import__("os").path.dirname(__import__("os").path.abspath(__file__))); import lib110 as T
async def main(b):
    T.serve(); ctx = await b.new_context(locale="it-IT"); pg = await ctx.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
    for l in ("it", "en", "de"):
        await pg.goto(f"http://127.0.0.1:{T.PORT}/privacy.html?lang={l}"); await pg.wait_for_timeout(800)
        hrefs = await pg.evaluate("[...document.querySelectorAll('a[href^=\"mailto:\"]')].map(a => a.getAttribute('href'))")
        T.check(f"K-01 privacy.html {l}: mailto senza punto finale {hrefs[:2]}", hrefs and all(not h.endswith(".") for h in hrefs), hrefs)
    T.check("nessun errore", not errs, errs[:2])
T.run(main)
