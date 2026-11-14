"""1.0.11 blocco 7: prestazioni (M-43 Firebase solo quando serve, M-44 animazioni a riposo, G-05 audio che si addormenta)."""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T

async def cpu(pg, secs):
    c = await pg.context.new_cdp_session(pg); await c.send("Performance.enable")
    m0 = {x["name"]: x["value"] for x in (await c.send("Performance.getMetrics"))["metrics"]}
    await pg.wait_for_timeout(secs * 1000)
    m1 = {x["name"]: x["value"] for x in (await c.send("Performance.getMetrics"))["metrics"]}
    return {"cpu": round((m1["TaskDuration"] - m0["TaskDuration"]) * 1000 / secs, 1), "style": round((m1["RecalcStyleCount"] - m0["RecalcStyleCount"]) / secs, 1), "layout": round((m1["LayoutCount"] - m0["LayoutCount"]) / secs, 1)}

async def main(b):
    # M-43: senza account, aprire il Profilo non carica Firebase
    reqs = []
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", native=True)
    pg.on("request", lambda r: reqs.append(r.url))
    await T.close_layer(pg)
    await T.ev(pg, "tab = 'more'; moreSub = 'acct'; render(); 1"); await pg.wait_for_timeout(4000)
    T.check("M-43 senza account: aprire Profilo › Account non carica Firebase (fb.js)", not any("fb.js" in u for u in reqs) and not await T.ev(pg, "!!window.TanFB"), [u for u in reqs if "fb.js" in u])
    b2 = await T.ev(pg, "!!document.getElementById('acGoogle') || !!document.querySelector('.accard button')")
    if b2:
        await pg.dispatch_event(".accard button", "pointerdown"); await pg.wait_for_timeout(1500)
        T.check("  al tocco su un pulsante dell'account Firebase si prepara", any("fb.js" in u for u in reqs), len(reqs))
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()
    # M-44: a riposo meno lavoro (animazioni accese)
    st = T.base_state("en"); st["calm"] = False; st["lite"] = False; st["sfx"] = True
    ctx, pg = await T.page(b, st, age="adult", extra_js="(() => { const P = (window.AudioContext || window.webkitAudioContext).prototype; const s0 = P.suspend; P.suspend = function () { window.__acS = (window.__acS || 0) + 1; return s0.call(this); }; })();")
    await T.close_layer(pg); await T.ev(pg, "tab = 'today'; render(); 1")
    await pg.mouse.click(5, 5); await pg.wait_for_timeout(200)
    busy = await cpu(pg, 2)
    await pg.wait_for_timeout(4000)
    ticks = await T.ev(pg, "new Promise((r) => { let n = 0; const f = () => n++; G.ticker.add(f); setTimeout(() => { G.ticker.remove(f); r(n); }, 2000); })")
    idle = await cpu(pg, 6)
    T.check(f"M-44 a riposo: animazioni a ~24 fotogrammi al secondo ({ticks / 2:.0f}/s)", ticks / 2 <= 30, ticks)
    T.check(f"M-44 a riposo ricalcoli di stile {idle['style']}/s (appena toccato {busy['style']}/s; CPU {idle['cpu']} vs {busy['cpu']} ms/s, macchina condivisa)", idle["style"] <= 30 and idle["style"] < busy["style"], (busy, idle))
    await pg.mouse.click(5, 5); await pg.wait_for_timeout(300)
    ticks2 = await T.ev(pg, "new Promise((r) => { let n = 0; const f = () => n++; G.ticker.add(f); setTimeout(() => { G.ticker.remove(f); r(n); }, 1000); })")
    T.check(f"  dopo un tocco di nuovo fluide ({ticks2}/s)", ticks2 >= 40, ticks2)
    # G-05: il motore dei suoni si addormenta
    await T.ev(pg, "SND.unlock(); SND.play('tap'); 1"); await pg.wait_for_timeout(27000)
    st2 = await T.ev(pg, "(() => { try { return SND.playing() ? 'music' : (window.__ac || 'ok'); } catch (e) { return 'x'; } })()")
    T.check("G-05 dopo 25 s di silenzio il motore dei suoni si sospende", (await T.ev(pg, "window.__acS || 0")) >= 1, st2)
    T.check("  nessun errore", not pg.errs, pg.errs[:2])
    await ctx.close()

T.run(main)
