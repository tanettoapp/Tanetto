# Momenti difficili: frasi di crisi (14 lingue), modi di dire, frasi normali, frasi negate, parole chiave della 1.0.9.
# Uso: PORT=9310 SITE=<sito> python3 -u t_crisis.py   -> stampa per lingua e "TUTTO OK" / "CI SONO ERRORI"
import asyncio, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tl
from crisis_sets import AUD_T, AUD_FP, NEW_T, NEW_FP, NEG
from playwright.async_api import async_playwright
ORIG = json.load(open(os.path.join(tl.D, "orig_kw.json")))
# voci della 1.0.9 tolte apposta: "olmek ist" scattava anche con "ölmek istemiyorum" (= NON voglio morire),
# "artik yasamak" anche con "artık yaşamak güzel" (= adesso vivere e' bello); restano le forme complete.
ORIG_DROP = {"tr": ["olmek ist", "artik yasamak", "artık yaşamak"]}
JS = r"""(a)=>window.__v10.ev(`(()=>{const a=${JSON.stringify(a)};S.lang=a.l;
const lv=(x)=>{const r=chatReply(x);return r&&r.crisis?(r.soft?1:2):0;};
const o={};for(const k of Object.keys(a.sets))o[k]=a.sets[k].map(x=>[x,lv(x)]);
const r=chatReply(a.probe);o.probe={text:r.text,lines:r.lines||[],crisisText:L().chat.crisis};
o.free=typeof sf110Level==="function"?a.sets.T.map(x=>sf110Level(x)):null;return o})()`)"""
async def main():
    bad = 0; tot = {}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx, pg = await tl.page(b, "en", state=tl.base_state("en"))
        for l in tl.LANGS:
            sets = {"T": AUD_T[l] + NEW_T[l], "FP": AUD_FP[l] + NEW_FP[l], "NEG": NEG[l], "ORIG": ORIG[l]["crisis"], "OTHER": ORIG[l]["other"]}
            r = await pg.evaluate(JS, {"l": l, "sets": sets, "probe": AUD_T[l][0]})
            miss = [x for x, v in r["T"] if v != 2]; fp = [(x, v) for x, v in r["FP"] if v != 0]
            neg = [(x, v) for x, v in r["NEG"] if v != 1]; orig = [x for x, v in r["ORIG"] if v != 2]; oth = [(x, v) for x, v in r["OTHER"] if v != 0]
            n = len(r["T"]); print(f"{l:4} crisi {n - len(miss)}/{n} | modi di dire e frasi normali {len(r['FP']) - len(fp)}/{len(r['FP'])} | negate=lieve {len(r['NEG']) - len(neg)}/{len(r['NEG'])} | parole 1.0.9 {len(r['ORIG']) - len(orig)}/{len(r['ORIG'])} | altre intenzioni chat senza allarme {len(r['OTHER']) - len(oth)}/{len(r['OTHER'])}")
            for k, v in (("MISS", miss), ("FALSO ALLARME", fp), ("NEGATE", neg), ("PAROLE 1.0.9", orig), ("ALTRE", oth)):
                if v: print("   ", k, v)
            pr = r["probe"]; okp = pr["text"] == pr["crisisText"] and len(pr["lines"]) >= 2
            if not okp: print("    RISPOSTA DI CRISI", pr)
            if r["free"] is not None and r["free"] != [v for _, v in r["T"]]: print("    DIARIO diverso dalla chat"); bad += 1
            bad += len([x for x in orig if x not in ORIG_DROP.get(l, [])]) + len(miss) + len(fp) + len(neg) + len(oth) + (0 if okp else 1)
            for k in ("T", "FP", "NEG"): tot.setdefault(k, [0, 0]); tot[k][0] += {"T": n - len(miss), "FP": len(r["FP"]) - len(fp), "NEG": len(r["NEG"]) - len(neg)}[k]; tot[k][1] += len(r[k])
        print("TOTALE", {k: f"{v[0]}/{v[1]}" for k, v in tot.items()})
        print("errori pagina:", pg.errs[:5])
        await b.close()
    print("TUTTO OK" if bad == 0 else f"CI SONO ERRORI ({bad})")
asyncio.run(main())
