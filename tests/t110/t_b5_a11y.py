"""1.0.10 blocco 5: accessibilita' e misure (M-21, M-22b, M-23..M-35, M-54, F-01..F-14, B-01..B-11, C-18/C-24/C-25).
Misure vere nel browser: albero di accessibilita' (CDP), pixel per il contrasto, elementFromPoint per i tocchi."""
import json, sys, os, io
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T
from PIL import Image

def lum(c):
    def ch(x):
        x = x / 255; return x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    r, g, b = c[:3]; return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
def ratio(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb); return (hi + 0.05) / (lo + 0.05)

async def contrast(pg, sel):
    """colore del testo (calcolato) contro il colore di fondo piu' frequente nel riquadro (pixel veri)"""
    box = await pg.evaluate(f"(() => {{ const e = document.querySelector({json.dumps(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); const c = getComputedStyle(e).color.match(/\\d+(\\.\\d+)?/g).map(Number); return {{ x: r.x, y: r.y, w: r.width, h: r.height, c }}; }})()")
    if not box or box["w"] < 2: return None
    png = await pg.screenshot(clip={"x": box["x"], "y": box["y"], "width": box["w"], "height": box["h"]})
    im = Image.open(io.BytesIO(png)).convert("RGB"); cnt = {}
    for px in im.getdata(): cnt[px] = cnt.get(px, 0) + 1
    bg = max(cnt.items(), key=lambda kv: kv[1])[0]
    return round(ratio(tuple(box["c"][:3]), bg), 2)

async def eff(pg, sel):
    """lato piu' corto dell'area che risponde davvero al tocco (elementFromPoint), in px CSS"""
    return await pg.evaluate("""(sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); if (!r.width) return null;
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2; const hit = (x, y) => { const h = document.elementFromPoint(x, y); return h && (h === e || e.contains(h)); };
      let w = 0, h = 0; for (let x = cx - 40; x <= cx + 40; x++) if (hit(x, cy)) w++; for (let y = cy - 40; y <= cy + 40; y++) if (hit(cx, y)) h++; return Math.min(w, h); }""", sel)

async def axu(pg):
    c = await pg.context.new_cdp_session(pg); t = await c.send("Accessibility.getFullAXTree")
    n = 0
    for nd in t["nodes"]:
        if nd.get("ignored"): continue
        if (nd.get("role") or {}).get("value") == "button" and not ((nd.get("name") or {}).get("value") or "").strip(): n += 1
    return n, t

async def main(b):
    # --- F-01: nomi dei pulsanti fuori schermo (negozio, viaggi)
    ctx, pg = await T.page(b, T.base_state("en", seeds=500), age="adult")
    await T.close_layer(pg)
    for tb in ("home", "trips"):
        await T.ev(pg, f"tab = '{tb}'; render(); 1"); await pg.wait_for_timeout(900)
        n, _ = await axu(pg)
        T.check(f"F-01 scheda {tb}: pulsanti senza nome 0 (prima 27/8)", n == 0, n)
    # --- F-07 sentiero della stagione
    await T.ev(pg, "tab = 'today'; render(); openPath(); 1"); await pg.wait_for_timeout(800)
    _, tree = await axu(pg)
    gl = await T.ev(pg, "L().season.goldLock")
    k = sum(1 for nd in tree["nodes"] if not nd.get("ignored") and (nd.get("role") or {}).get("value") == "button" and (nd.get("name") or {}).get("value") == gl)
    T.check(f"F-07 sentiero: pulsanti 'fa parte di Plus' raggiungibili {k} (prima 50)", k <= 1, k)
    await T.close_layer(pg)
    # --- F-09 calendario
    await T.ev(pg, "S.days['2026-11-13'] = { done: 5, total: 5 }; S.days['2026-11-14'] = { done: 0, total: 5, rest: true }; save(); tab = 'diary'; render(); 1"); await pg.wait_for_timeout(500)
    lbl = await T.ev(pg, "[...document.querySelectorAll('.cal .d[role=img]')].map((x) => x.getAttribute('aria-label')).filter((x) => /13|14/.test(x)).join(' | ')")
    T.check("F-09 calendario: ogni giorno dice il suo stato ('13 November: All', '14 November: Rest')", "All" in lbl and "Rest" in lbl, lbl)
    # --- F-02 nuvoletta: niente annunci a riposo
    await T.ev(pg, """tab = 'today'; render(); window.__liveN = 0; new MutationObserver((ms) => { ms.forEach((m) => { const t = m.target.nodeType === 3 ? m.target.parentElement : m.target; if (t && t.closest && t.closest('[aria-live]:not(#toast)')) window.__liveN++; }); }).observe(document.body, { subtree: true, childList: true, characterData: true }); 1""")
    await pg.wait_for_timeout(25000)
    T.check("F-02 Oggi, 25 s senza toccare niente: 0 annunci (prima ~30)", await T.ev(pg, "window.__liveN") == 0, await T.ev(pg, "window.__liveN"))
    # dopo un obiettivo: un annuncio con la frase intera
    await T.ev(pg, "window.__liveN = 0; 1")
    await pg.click('[data-done="water"]'); await pg.wait_for_timeout(2500)
    live = await T.ev(pg, "document.getElementById('v26live').textContent")
    T.check("F-02/F-10 dopo un obiettivo: la frase o i Tanì letti una volta", len(live) > 3, live)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # --- F-03 / B-03 toast
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    await T.close_layer(pg)
    msg = "Saved: this is a long test message that should fit on two lines at most"
    await T.ev(pg, f"toast({json.dumps(msg)}); 1"); await pg.wait_for_timeout(300)
    r = json.loads(await T.ev(pg, "JSON.stringify(document.getElementById('toast').getBoundingClientRect())"))
    T.check(f"B-03 avviso largo ({r['width']:.0f} px, prima 206) e al massimo 2 righe ({r['height']:.0f} px)", r["width"] >= 300 and r["height"] <= 70, r)
    await pg.wait_for_timeout(3500)
    T.check("F-03 avviso ancora visibile dopo 3,8 s (prima 2,4 s)", await T.ev(pg, "!document.getElementById('toast').hidden"))
    await ctx.close()
    # --- F-04 contrasto
    for scheme in ("light", "dark"):
        ctx, pg = await T.page(b, T.base_state("en"), age="adult", scheme=scheme)
        await T.close_layer(pg); await T.ev(pg, "tab = 'today'; render(); 1"); await pg.wait_for_timeout(600)
        for sel in (".top .name", ".greet .gd"):
            c = await contrast(pg, sel)
            if c is not None: T.check(f"F-04 contrasto {scheme} {sel}: {c} (min 4,5)", c >= 4.5, c)
        await ctx.close()
    # --- B-04 tocchi da 48
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    await T.close_layer(pg)
    for sel in ("#musicBtn", "#seedPill", "#lvBtn", ".tabsx button", ".link"):
        v = await eff(pg, sel)
        if v is not None: T.check(f"B-04 area di tocco {sel}: {v} px (min 48)", v >= 47, v)
    await T.ev(pg, "openPlus('test'); 1"); await pg.wait_for_timeout(900)
    for sel in (".plegal .inlink", "#layer .iconbtn"):
        v = await eff(pg, sel)
        if v is not None: T.check(f"B-04/B-05 Plus {sel}: {v} px (min 48)", v >= 47, v)
    await ctx.close()
    # --- B-02 tastiera aperta nel diario (320x640 -> 380 di altezza)
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", w=320, h=640)
    await T.close_layer(pg); await T.ev(pg, "tab = 'diary'; render(); 1"); await pg.wait_for_timeout(400)
    await pg.set_viewport_size({"width": 320, "height": 380}); await pg.focus("#line"); await pg.wait_for_timeout(500)
    r = json.loads(await T.ev(pg, "JSON.stringify({ tabs: document.getElementById('tabs').getBoundingClientRect().height, b: document.getElementById('line').getBoundingClientRect().bottom, h: innerHeight })"))
    T.check("B-02 tastiera aperta: barra in basso nascosta e campo del diario visibile", r["tabs"] == 0 and r["b"] <= r["h"], r)
    await ctx.close()
    # --- B-11 nome del compagno con tanti Tanì a 320 px
    ctx, pg = await T.page(b, T.base_state("de", seeds=99999), age="adult", w=320, h=640, lang="de-DE")
    await T.close_layer(pg); await T.ev(pg, "render(); 1"); await pg.wait_for_timeout(1600)
    r = json.loads(await T.ev(pg, "JSON.stringify((() => { const n = document.querySelector('.top .namebtn') || document.querySelector('.top .name'); const t = n.querySelector('.name') || n; return { w: n.getBoundingClientRect().width, clip: t.scrollWidth > t.clientWidth + 1, seeds: document.getElementById('seedN').textContent }; })())"))
    T.check(f"B-11 320 px, 99.999 Tanì: nome 'Germo' intero (largo {r['w']:.0f} px), Tanì '{r['seeds']}'", r["w"] >= 60 and not r["clip"], r)
    await ctx.close()
    # --- B-08 intestazione ferma su schermo largo
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", w=1280, h=800, mobile=False)
    await T.close_layer(pg); xs = []
    for tb in ("today", "home", "trips"):
        await T.ev(pg, f"tab = '{tb}'; render(); 1"); await pg.wait_for_timeout(500)
        xs.append(json.loads(await T.ev(pg, "JSON.stringify((() => { const r = document.querySelector('#app > .top').getBoundingClientRect(); return [Math.round(r.left), Math.round(r.width)]; })())")))
    T.check(f"B-08 1280x800: intestazione uguale su Oggi/Negozio/Viaggi {xs}", all(abs(x[0] - xs[0][0]) <= 1 and abs(x[1] - xs[0][1]) <= 1 for x in xs), xs)
    await ctx.close()
    # --- M-54 ascoltatori dopo 120 cambi di scheda (animazioni accese)
    st = T.base_state("en"); st["calm"] = False; st["lite"] = False
    ctx, pg = await T.page(b, st, age="adult", extra_js="(() => { const a = EventTarget.prototype.addEventListener, r = EventTarget.prototype.removeEventListener; window.__ae = 0; EventTarget.prototype.addEventListener = function (n, f, o) { if (n === 'animationend') window.__ae++; return a.call(this, n, f, o); }; EventTarget.prototype.removeEventListener = function (n, f, o) { if (n === 'animationend') window.__ae--; return r.call(this, n, f, o); }; })();")
    await T.close_layer(pg); a0 = await T.ev(pg, "window.__ae")
    for i in range(60):
        for tb in ("home", "today"):
            await T.ev(pg, f"document.querySelector('[data-tab=\"{tb}\"]') && document.querySelector('[data-tab=\"{tb}\"]').click(); 1"); await pg.wait_for_timeout(30)
    await pg.wait_for_timeout(1500)
    a1 = await T.ev(pg, "window.__ae")
    T.check(f"M-54 120 cambi di scheda: ascoltatori 'animationend' in piu' {a1 - a0} (prima ~1.200)", a1 - a0 <= 60, (a0, a1))
    await ctx.close()
    # --- C-24 / C-25 / C-18: parole spezzate a 360 px (de, ru, nl, ko) nel negozio e nella scelta del compagno
    for lang in ("de", "ru", "nl", "ko"):
        ctx, pg = await T.page(b, T.base_state(lang, seeds=500), age="adult", w=360, h=800, lang=lang)
        await T.close_layer(pg); bad = []
        for code in ("tab = 'home'; render(); 1", "tab = 'more'; moreSub = 'comp'; showPicker = true; render(); 1"):
            await T.ev(pg, code); await pg.wait_for_timeout(700)
            bad += json.loads(await T.ev(pg, r"""JSON.stringify((() => { const out = []; const w = document.createTreeWalker(document.getElementById('app'), NodeFilter.SHOW_TEXT); let n;
              while ((n = w.nextNode())) { const s = n.nodeValue; const re = /[\p{L}]{4,}/gu; let m; while ((m = re.exec(s))) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
                const rs = [...r.getClientRects()].filter((x) => x.width > 0); if (rs.length > 1 && Math.abs(rs[0].top - rs[rs.length - 1].top) > 4) out.push(m[0]); } } return out.slice(0, 20); })())"""))
        T.check(f"C-24/C-25 {lang} 360 px: parole spezzate a meta' nel negozio e nella scelta del compagno: {len(bad)}", len(bad) <= 2, bad[:8])
        rr = json.loads(await T.ev(pg, "tab = 'home'; render(); JSON.stringify([...document.querySelectorAll('.rar')].map((x) => [x.getClientRects().length, x.scrollWidth <= x.clientWidth + 1]))"))
        T.check(f"C-18 {lang}: etichette di rarita' su una riga e intere", all(x[0] == 1 and x[1] for x in rr), rr[:5])
        await ctx.close()
    # --- M-22b informativa a 320 px
    ctx, pg = await T.page(b, T.base_state("de"), age="adult", w=320, h=640, lang="de-DE")
    await T.close_layer(pg)
    await T.ev(pg, "(typeof openDoc === 'function' ? openDoc('privacy') : document.querySelector('[data-doc]') && document.querySelector('[data-doc]').click()); 1"); await pg.wait_for_timeout(800)
    r = json.loads(await T.ev(pg, "JSON.stringify((() => { let worst = 0; layer.querySelectorAll('p, li, h2, h3').forEach((e) => { const r = e.getBoundingClientRect(); worst = Math.max(worst, r.right); }); return { worst, w: innerWidth, open: layer.innerHTML.length }; })())"))
    T.check(f"M-22b informativa a 320 px: niente testo oltre il bordo destro ({r['worst']:.0f} <= {r['w']})", r["open"] > 100 and r["worst"] <= r["w"] + 0.5, r)
    await ctx.close()

T.run(main)
