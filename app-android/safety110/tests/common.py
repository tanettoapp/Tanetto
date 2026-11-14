import json, os
A = "/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/safety110/T"
SH = "/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/safety110/T/shots"
GS = ""
URL = "http://127.0.0.1:8830/index.html"
MOCK = """window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android', Plugins: {
  Billing: { products: async () => ({ products: [
   {id:'tanetto_plus',type:'subs',offers:[{basePlanId:'annuale',offerId:'prova7',token:'t1',phases:[{price:'Free',micros:0,currency:'EUR',period:'P1W',cycles:1,recurrence:2},{price:'€44.99',micros:44990000,currency:'EUR',period:'P1Y',cycles:0,recurrence:1}]},{basePlanId:'annuale',offerId:null,token:'t2',phases:[{price:'€44.99',micros:44990000,currency:'EUR',period:'P1Y',cycles:0,recurrence:1}]},{basePlanId:'mensile',offerId:null,token:'t3',phases:[{price:'€4.99',micros:4990000,currency:'EUR',period:'P1M',cycles:0,recurrence:1}]}]},
   {id:'tani_200',type:'inapp',price:'€0.99',micros:990000,currency:'EUR'},{id:'tani_1100',type:'inapp',price:'€4.99',micros:4990000,currency:'EUR'},{id:'tani_2400',type:'inapp',price:'€9.99',micros:9990000,currency:'EUR'},{id:'tani_5000',type:'inapp',price:'€19.99',micros:19990000,currency:'EUR'}] }),
   owned: async (o) => ({ purchases: (window.__plus && o && o.type === 'subs') ? [{ products: ['tanetto_plus'], state: 'purchased', acknowledged: true, token: 'tp' }] : [] }), acknowledge: async () => ({}), buy: async () => { throw {code:'cancelled'}; }, addListener() {} },
  LocalNotifications: { cancel: async () => {}, schedule: async () => {}, createChannel: async () => {}, checkPermissions: async () => ({display:'granted'}), requestPermissions: async () => ({display:'granted'}) },
  TanettoAds: { init: async () => ({ canRequestAds: true, privacyRequired: true, loaded: true }), load: async () => ({loaded:true}), show: async () => ({ rewarded: true }), privacy: async () => ({}), status: async () => ({canRequestAds:true,loaded:true}) } } };"""
def timeshift(y, m, d, h, mi=7):
    return f"""(() => {{ const R = Date; const TARGET = new R({y}, {m - 1}, {d}, {h}, {mi}, 0).getTime(); const OFF = TARGET - R.now();
    class D extends R {{ constructor(...a) {{ if (!a.length) super(R.now() + OFF); else super(...a); }} static now() {{ return R.now() + OFF; }} }}
    window.Date = D; }})();"""
ALLF = ["rug", "lamp", "plant", "shelf", "frame", "lights", "pouf", "clock"]
def base_state(lang, pet="germo", day="2026-11-12", **kw):
    gl = ["water", "walk", "breathe", "read", "call"]
    st = {"v": 3, "lang": lang, "theme": "system", "pet": pet, "petName": {"germo": "Germo", "ondi": "Ondi", "lumi": "Lumi"}[pet], "goals": [{"id": g, "days": list(range(7))} for g in gl],
            "day": day, "done": ["water","walk"], "energy": 40, "xp": 30, "level": 7, "seeds": 240, "owned": ["w_cream", "w_sage", "w_lilac"] + ALLF + ["red", "gold", "h_launch"], "hat": None, "furn": ALLF, "wall": "w_cream",
            "away": None, "cards": [], "diary": [], "days": {}, "giftDay": day, "onboard": 3, "sfx": True, "music": False, "tut": 99, "lite": False,
            "trophies": {str(n): {"at": "2026-01-01", "p": True} for n in (7, 14, 30, 60, 100, 150, 200, 365, 500)},
            "v19w": "2026-01-01", "welcomeGift": "2026-10-01", "rem": "ok", "letterDay": day, "visit": {"n": 3, "last": day}, "nameAsked": True, "v20touch": {"hint": "2026-01-01"}}
    st.update(kw); return st
async def page(b, lang="en", scheme="light", date=(2026, 11, 12, 10), state=None, plus=False, motion="no-preference", splash=False, wait=3500, w=412, h=915, gift=False):
    ctx = await b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1.5, locale=lang, color_scheme=scheme, reduced_motion=motion)
    pg = await ctx.new_page(); pg.errs = []
    pg.on("pageerror", lambda e: pg.errs.append(str(e)))
    pg.on("console", lambda m: pg.errs.append("console: " + m.text) if m.type == "error" and "ERR_" not in m.text else None)
    await pg.route("**/fonts.googleapis.com/**", lambda r: r.abort()); await pg.route("**/goatcounter.com/**", lambda r: r.fulfill(body=""))
    js = ("" if gift else "window.__TEST_NOGIFT20 = 1;") + ("window.__plus = true;" if plus else "") + MOCK + timeshift(*date) + ("" if splash else ";sessionStorage.setItem('splash','1');")
    if state is not None:
        js += f"if(!sessionStorage.getItem('s10')){{localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(state))});sessionStorage.setItem('s10','1')}};localStorage.setItem('tanetto-account',{json.dumps(json.dumps({'gateDone': True}))});"
    await pg.add_init_script("window.__TEST_NOAGE=1;" + js); await pg.goto(URL); await pg.wait_for_timeout(wait)
    return ctx, pg
ev = lambda pg, c: pg.evaluate("window.__v10.ev(" + json.dumps(c) + ")")
async def shot(pg, name, full=False):
    await pg.screenshot(path=f"{SH}/{name}.png", full_page=full)
