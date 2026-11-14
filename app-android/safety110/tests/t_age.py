# Eta': cosa compare DA SOLO a bambini (<13), ragazzi 13-17 (sotto e sopra l'eta' del consenso), adulti, eta' non detta.
# Per ogni profilo: finestra "Prova Plus" dopo un obiettivo (giorno 2), "Invita un amico" in "Tutto fatto",
# richiesta di recensione (serie di 7 giorni), compagni Plus nel primo passo, "Torna domani" con importi.
# Uso: PORT=9312 SITE=<sito> EXPECT=110|109 python3 -u t_age.py
import asyncio, json, os, sys, copy
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tl
from playwright.async_api import async_playwright
EXPECT = os.environ.get("EXPECT", "110")
REVMOCK = "window.Capacitor.Plugins.Review = { requestReview: async () => { window.__revN = (window.__revN || 0) + 1; return {}; } };"
# 12/11/2026, telefono in tedesco (de-DE): eta' del consenso 16 (98zf ageConsent), quindi 15 anni = "teen", 17 = "adult"
AGES = {
    "bambino_9": {"y": 2017, "m": 5, "at": "2026-11-01"},
    "ragazzo_15": {"y": 2011, "m": 1, "at": "2026-11-01"},
    "ragazzo_17": {"y": 2009, "m": 1, "at": "2026-11-01"},
    "adulto_36": {"y": 1990, "m": 3, "at": "2026-11-01"},
    "non_detta": {"skip": True, "at": "2026-11-01"},
    "mai_chiesta": None,
}
async def newpage(b, lang, st, age, extra=""):
    st = copy.deepcopy(st)
    if age is not None: st["age"] = age
    ctx = await b.new_context(viewport={"width": 412, "height": 915}, device_scale_factor=1, locale="de-DE")
    pg = await ctx.new_page(); pg.errs = []
    pg.on("pageerror", lambda e: pg.errs.append(str(e)))
    await pg.route("**/goatcounter.com/**", lambda r: r.fulfill(body=""))
    js = "window.__TEST_NOGIFT20 = 1;" + tl.common.MOCK + REVMOCK + tl.common.timeshift(2026, 11, 12, 10) + ";sessionStorage.setItem('splash','1');"
    js += f"if(!sessionStorage.getItem('s10')){{localStorage.clear();localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(st))});sessionStorage.setItem('s10','1')}};localStorage.setItem('tanetto-account',{json.dumps(json.dumps({'gateDone': True}))});"
    if age is not None: js += f"localStorage.setItem('tanetto-eta',{json.dumps(json.dumps(age))});"
    await pg.add_init_script("window.__TEST_NOAGE=1;" + js + extra); await pg.goto(tl.common.URL); await pg.wait_for_timeout(3500)
    return ctx, pg
ev = lambda pg, c: pg.evaluate("(c)=>window.__v10.ev(c)", c)
async def run(b, name, age):
    out = {}
    base = tl.base_state("en", day="2026-11-12", done=[], firstDay="2026-11-01", log=[{"d": "2026-11-0" + str(i), "g": "water"} for i in range(1, 9)])
    # 1) Prova Plus: secondo giorno o oltre, primo obiettivo spuntato
    ctx, pg = await newpage(b, "en", base, age)
    out["band"] = await ev(pg, "ageBand()")
    await ev(pg, "(closeLayer(), completeGoal('water'), 1)"); seen = False
    # chi usa l'app chiude le altre finestre che arrivano (regali, account): la "Prova Plus" e' in coda dietro di loro
    CLOSE = "(()=>{if(document.querySelector('.nvplus'))return 1;if(layer.innerHTML.trim()){closeLayer();}return 0})()"
    for _ in range(40):
        await pg.wait_for_timeout(500)
        if await ev(pg, CLOSE): seen = True; break
    out["prova_plus"] = seen; errs = list(pg.errs); await ctx.close()
    # 2) Invita un amico in "Tutto fatto"
    ctx, pg = await newpage(b, "en", base, age)
    await ev(pg, "(closeLayer(), openAllDone(), 1)"); await pg.wait_for_timeout(2500)
    out["tutto_fatto"] = await ev(pg, "!!document.querySelector('.alldone')"); out["invita"] = await ev(pg, "!!document.querySelector('.alldone #invite')")
    errs += pg.errs; await ctx.close()
    # 3) recensione (7 giorni di fila): rev20Want -> la finestra di Google si chiede dopo ~2,5 s se lo schermo e' libero
    ctx, pg = await newpage(b, "en", base, age)
    await ev(pg, "(closeLayer(), rev20Want('serie-7'), 1)")
    for _ in range(30):
        await pg.wait_for_timeout(500); await ev(pg, "(()=>{if(layer.innerHTML.trim())closeLayer();return 1})()")
        if await ev(pg, "window.__revN || 0"): break
    out["recensione"] = await ev(pg, "window.__revN || 0"); out["recensione_97m"] = await ev(pg, "reviewEligible()")
    errs += pg.errs; await ctx.close()
    # 4) compagni Plus con la corona nel primo passo (nessun compagno ancora)
    onb = {"v": 3, "lang": "en", "theme": "system", "onboard": 0, "nameAsked": True, "sfx": True, "music": False}
    ctx, pg = await newpage(b, "en", onb, age)
    out["primo_passo"] = await ev(pg, "!S.pet && S.onboard === 0 && !!document.querySelector('#app .choose')")
    out["plus_primo_passo"] = await ev(pg, "!!document.querySelector('#app .ppsec')")
    errs += pg.errs; await ctx.close()
    # 5) "Torna domani" (regalo di oggi gia' aperto)
    ctx, pg = await newpage(b, "en", tl.base_state("en", day="2026-11-12", firstDay="2026-11-01", visit={"n": 3, "last": "2026-11-12"}), age)
    t = await ev(pg, "(()=>{const d=document.createElement('div');d.innerHTML=teaserCard();const c=d.querySelector('.teaser');return c?{t:c.textContent,dots:!!c.querySelector('.gdots')}:null})()")
    out["torna_domani"] = t; errs += pg.errs; await ctx.close()
    out["errori"] = errs[:3]
    return out
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, age in AGES.items():
            r = await run(b, name, age); print(name, json.dumps(r, ensure_ascii=False))
            minor = r["band"] != "adult"
            if EXPECT == "110":
                tz = r["torna_domani"]
                exp = {"prova_plus": not minor, "invita": not minor, "recensione": 0 if minor else 1, "plus_primo_passo": not minor}
                for k, v in exp.items():
                    if r[k] != v: bad.append(f"{name}: {k} = {r[k]} (atteso {v})")
                if not r["tutto_fatto"] or not r["primo_passo"]: bad.append(f"{name}: scena di prova non aperta")
                if not tz: bad.append(f"{name}: scheda Torna domani assente")
                elif minor and (any(ch.isdigit() for ch in tz["t"]) or tz["dots"] or "in a row" in tz["t"]): bad.append(f"{name}: Torna domani con numeri/serie")
                elif not minor and not tz["dots"]: bad.append(f"{name}: adulto senza la fila dei 7 giorni")
                if r["errori"]: bad.append(f"{name}: errori {r['errori']}")
        await b.close()
    for x in bad: print("NO", x)
    print("TUTTO OK" if not bad else f"CI SONO ERRORI ({len(bad)})")
if __name__ == "__main__": asyncio.run(main())
