# Diario, "Lascia andare", capsula del tempo, chat: dopo una frase di crisi compare la scheda di aiuto calma con i numeri
# del Paese; il testo si salva comunque; con frasi normali non compare niente; la scheda si chiude (pulsante o indietro)
# e non torna; se un'altra finestra la copre, ricompare quando lo schermo torna libero.
# Uso: PORT=9316 SITE=<sito> EXPECT=110|109 python3 -u t_free.py
import asyncio, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tl
from playwright.async_api import async_playwright
EXPECT = os.environ.get("EXPECT", "110")
SH = os.path.join(tl.D, "shots"); os.makedirs(SH, exist_ok=True)
async def newpage(b, lang, tz="Europe/Rome", loc="it-IT", w=412, h=915, scheme="light", age=None, extra=""):
    ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, locale=loc, timezone_id=tz, color_scheme=scheme)
    pg = await ctx.new_page(); pg.errs = []; pg.on("pageerror", lambda e: pg.errs.append(str(e)))
    st = tl.base_state(lang, day="2026-11-12"); st["age"] = age or {"y": 2014, "m": 4, "at": "2026-11-01"}; st["firstDay"] = "2026-11-01"; st["done"] = []
    js = "window.__TEST_NOGIFT20 = 1;" + tl.common.MOCK + tl.common.timeshift(2026, 11, 12, 10) + ";sessionStorage.setItem('splash','1');" + f"if(!sessionStorage.getItem('s10')){{localStorage.clear();localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(st))});sessionStorage.setItem('s10','1')}};localStorage.setItem('tanetto-account',{json.dumps(json.dumps({'gateDone': True}))});"
    await pg.add_init_script("window.__TEST_NOAGE=1;" + js + extra); await pg.goto(tl.common.URL); await pg.wait_for_timeout(3000)
    return ctx, pg
ev = lambda pg, c: pg.evaluate("(c)=>window.__v10.ev(c)", c)
SHEET = "(()=>{const s=layer.querySelector('.sfhelp');return s?{t:s.textContent,lines:[...s.querySelectorAll('.help strong')].map(x=>x.textContent.replace(/\\u00a0/g,' ').replace(/\\u2060/g,''))}:null})()"
async def diary(pg, text):
    await ev(pg, "(closeLayer(), tab='diary', render(), window.scrollTo(0,0), 1)"); await pg.wait_for_timeout(500)
    await pg.fill("#line", text); n0 = await ev(pg, "S.diary.length")
    await ev(pg, "(document.getElementById('diaryForm').requestSubmit(), 1)"); await pg.wait_for_timeout(1200)
    return await ev(pg, SHEET), (await ev(pg, "S.diary.length")) == n0 + 1 and (await ev(pg, "S.diary[S.diary.length-1].text")) == text
async def letgo(pg, text):
    await ev(pg, "(closeLayer(), openGameKey('letgo'), 1)"); await pg.wait_for_timeout(600)
    await pg.fill("#lgIn", text); await ev(pg, "(document.getElementById('lgGo').click(), 1)"); await pg.wait_for_timeout(1500)
    return await ev(pg, SHEET)
async def capsule(pg, text):
    await ev(pg, "(closeLayer(), tab='diary', render(), 1)"); await pg.wait_for_timeout(500)
    await pg.fill("#capsIn", text); n0 = await ev(pg, "(S.capsules||[]).length")
    await ev(pg, "(document.getElementById('capsGo').click(), 1)"); await pg.wait_for_timeout(1800)
    return await ev(pg, SHEET), (await ev(pg, "(S.capsules||[]).length")) == n0 + 1
async def main():
    bad = []
    def chk(c, msg):
        print(("ok  " if c else "NO  ") + msg)
        if not c: bad.append(msg)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx, pg = await newpage(b, "it")
        s, saved = await diary(pg, "mi voglio ammazzare")
        chk(bool(s) and saved, f"diario it, crisi: scheda {bool(s)}, salvato {saved}")
        if s:
            chk("Telefono Azzurro (per bambini e ragazzi): 19696" == s["lines"][0], f"bambino in Italia: prima riga = linea per i ragazzi ({s['lines'][:1]})")
            chk("non sostituisce un medico" in s["t"] and "Mi dispiace tanto" in s["t"], "testo calmo + 'non sostituisce un medico'")
            tels = await ev(pg, "[...layer.querySelectorAll('.sfhelp a[href^=\"tel:\"]')].map(a=>a.getAttribute('href'))")
            chk("tel:19696" in tels and "tel:0223272327" in tels and "tel:112" in tels, f"numeri toccabili per chiamare {tels}")
            await pg.screenshot(path=f"{SH}/sheet_it_diary.png")
            # coperta da un'altra finestra -> ricompare dopo
            await ev(pg, "(layer.innerHTML='<div class=\"overlay\"><div class=\"box card\"><button id=\"closeLayer\">x</button></div></div>', 1)"); await pg.wait_for_timeout(300)
            await ev(pg, "(document.getElementById('closeLayer').click(), 1)"); await pg.wait_for_timeout(1300)
            chk(bool(await ev(pg, SHEET)), "coperta da un'altra finestra: ricompare")
            await ev(pg, "(document.querySelector('[data-sfhelp]').click(), 1)"); await pg.wait_for_timeout(1500)
            chk(not await ev(pg, SHEET) and not (await ev(pg, "layer.innerHTML.trim()")), "chiusa con il suo pulsante: non torna")
        s, saved = await diary(pg, "oggi bella giornata, ho fame da morire")
        chk(not s and saved, f"diario frase normale: nessuna scheda ({bool(s)}), salvato {saved}")
        s, saved = await diary(pg, "ho paura di morire")
        chk(bool(s) and "Sembra che tu stia passando un momento molto pesante" in (s or {}).get("t", ""), "diario frase lieve: controllo gentile")
        if s:
            await ev(pg, "(backPress(), 1)"); await pg.wait_for_timeout(1500)
            chk(not await ev(pg, SHEET), "chiusa con indietro: non torna")
        s = await letgo(pg, "vorrei sparire per sempre")
        chk(bool(s), "Lascia andare, crisi: scheda")
        chk(await ev(pg, "typeof game==='undefined'||!game"), "il gioco e' chiuso del tutto")
        await ev(pg, "(document.querySelector('[data-sfhelp]')&&document.querySelector('[data-sfhelp]').click(), 1)"); await pg.wait_for_timeout(800)
        s = await letgo(pg, "la verifica di matematica")
        chk(not s, "Lascia andare, frase normale: niente")
        s, saved = await capsule(pg, "spero di non esserci piu, voglio morire")
        chk(bool(s) and saved, f"capsula, crisi: scheda {bool(s)}, salvata {saved}")
        await ev(pg, "(document.querySelector('[data-sfhelp]')&&document.querySelector('[data-sfhelp]').click(), 1)"); await pg.wait_for_timeout(800)
        s, saved = await capsule(pg, "tra un anno saro al mare")
        chk(not s and saved, "capsula, frase normale: niente")
        chk(not pg.errs, f"nessun errore nella pagina {pg.errs[:3]}")
        await ctx.close()
        # adulto: dopo un momento difficile niente "Prova Plus", niente recensione, niente feste subito dopo
        REV = "window.Capacitor.Plugins.Review = { requestReview: async () => { window.__revN = (window.__revN || 0) + 1; return {}; } };"
        ctx, pg = await newpage(b, "it", age={"y": 1990, "m": 3, "at": "2026-11-01"}, extra=REV)
        s, saved = await diary(pg, "stasera la faccio finita")
        chk(bool(s) and saved, "adulto, diario: scheda di aiuto")
        await ev(pg, "(document.querySelector('[data-sfhelp]').click(), 1)"); await pg.wait_for_timeout(600)
        await ev(pg, "(tab='today', render(), completeGoal('water'), rev20Want('serie-7'), openAllDone(), 1)")
        seen = []
        for _ in range(16):
            await pg.wait_for_timeout(500)
            seen.append(await ev(pg, "({p:!!document.querySelector('.nvplus'),a:!!document.querySelector('.alldone'),r:window.__revN||0,l:layer.innerHTML.trim().length})"))
        chk(not any(x["p"] for x in seen) and not any(x["r"] for x in seen), "adulto dopo la scheda: niente Prova Plus e niente recensione")
        chk(not any(x["a"] for x in seen), "adulto dopo la scheda: la festa 'Tutto fatto' aspetta (niente allegria subito dopo)")
        chk(await ev(pg, "NQ20.q.some(x=>x.key==='alldone')"), "la festa resta in coda (non si perde)")
        chk(not pg.errs, f"adulto: nessun errore {pg.errs[:2]}")
        await ctx.close()
        # chat: risposta calma, numeri del Paese; schermate in 3 lingue / tema scuro / schermo piccolo
        for lang, tz, loc, msg, w, h, scheme in [("it", "Europe/Rome", "it-IT", "mi ammazzo", 412, 915, "light"), ("en", "America/New_York", "en-US", "i wanna die", 360, 800, "dark"), ("ja", "Asia/Tokyo", "ja-JP", "死にたい", 320, 640, "light")]:
            ctx, pg = await newpage(b, lang, tz, loc, w, h, scheme)
            await ev(pg, "(closeLayer(), openChat(), 1)"); await pg.wait_for_timeout(600)
            await pg.fill("#chIn", msg); await ev(pg, "(document.getElementById('chForm').requestSubmit(), 1)"); await pg.wait_for_timeout(1500)
            r = await ev(pg, "(()=>{const m=[...document.querySelectorAll('#chLog .cmsg.sos')].pop();return m?{t:m.textContent,n:m.querySelectorAll('strong').length}:null})()")
            chk(bool(r) and r["n"] >= 3, f"chat {lang}: risposta di aiuto con {r and r['n']} righe")
            await pg.screenshot(path=f"{SH}/chat_{lang}_{w}.png")
            await ev(pg, "(closeLayer(), tab='diary', render(), 1)"); await pg.wait_for_timeout(400); await pg.fill("#line", msg)
            await ev(pg, "(document.getElementById('diaryForm').requestSubmit(), 1)"); await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f"{SH}/sheet_{lang}_{w}_{scheme}.png")
            geo = await ev(pg, "(()=>{const s=layer.querySelector('.sfhelp');if(!s)return null;const r=s.getBoundingClientRect();const b=s.querySelector('[data-sfhelp]').getBoundingClientRect();return {l:r.left,r:r.right,w:innerWidth,sw:s.scrollWidth,cw:s.clientWidth,bb:b.bottom,bh:b.height,ih:innerHeight}})()")
            chk(bool(geo) and geo["l"] >= 0 and geo["r"] <= geo["w"] + 0.5 and geo["sw"] <= geo["cw"] + 1, f"scheda {lang} {w}x{h}: dentro lo schermo, niente testo tagliato a destra {geo}")
            if geo:
                await ev(pg, "(layer.querySelector('.sfhelp [data-sfhelp]').scrollIntoView(), 1)")
                chk(await ev(pg, "(()=>{const b=layer.querySelector('[data-sfhelp]').getBoundingClientRect();return b.top>=0&&b.bottom<=innerHeight&&b.height>=44})()"), f"scheda {lang}: pulsante Chiudi raggiungibile (>= 44 px)")
            chk(not pg.errs, f"{lang}: nessun errore {pg.errs[:2]}")
            await ctx.close()
        await b.close()
    print("TUTTO OK" if not bad else f"CI SONO ERRORI ({len(bad)})")
if __name__ == "__main__": asyncio.run(main())
