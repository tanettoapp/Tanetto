"""1.0.10: base comune per le prove nuove (tests/t110). Serve il sito costruito (radice del repository) su una porta propria,
apre pagine Chromium con stato, data/ora, lingua, eta' e "telefono" (Capacitor finto) scelti dal test.
Nessun dato personale: nomi e testi di prova inventati."""
import asyncio, functools, http.server, json, os, socketserver, sys, threading
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SITE = os.environ.get("T110_SITE", REPO)
PORT = int(os.environ.get("T110_PORT", "8981"))
URL = f"http://127.0.0.1:{PORT}/index.html"
SHOTS = os.environ.get("T110_SHOTS", "/dev/shm/t110shots"); os.makedirs(SHOTS, exist_ok=True)
LANGS = ["it", "en", "de", "es", "fr", "pt", "ja", "ko", "zh", "zht", "ru", "pl", "nl", "tr"]

class _Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def end_headers(self): self.send_header("Cache-Control", "no-store"); super().end_headers()
    def handle(self):
        try: super().handle()
        except Exception: pass
_srv = None
def serve():
    global _srv
    if _srv: return
    socketserver.TCPServer.allow_reuse_address = True
    _srv = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), functools.partial(_Q, directory=SITE))
    threading.Thread(target=_srv.serve_forever, daemon=True).start()

ok_all = True; n_no = 0
def check(name, cond, extra=""):
    global ok_all, n_no
    ok_all &= bool(cond); n_no += 0 if cond else 1
    print(("OK  " if cond else "NO  ") + name + (f"  [{extra}]" if extra != "" and not cond else ""), flush=True)
def done():
    print("TUTTO OK" if ok_all else f"CI SONO {n_no} NO", flush=True)

CLOCK = """(() => { const R = Date; const K = '__t110T'; let OFF = +(sessionStorage.getItem(K) || (new R(%d, %d, %d, %d, %d, 0).getTime() - R.now()));
  sessionStorage.setItem(K, String(OFF));
  class D extends R { constructor(...a) { if (!a.length) super(R.now() + OFF); else super(...a); } static now() { return R.now() + OFF; } }
  window.Date = D; window.__shift = (ms) => { OFF += ms; sessionStorage.setItem(K, String(OFF)); };
  window.__setDay = (y, m, d, h) => { OFF = new R(y, m - 1, d, h || 9, 7, 0).getTime() - R.now(); sessionStorage.setItem(K, String(OFF)); }; })();"""
MOCK = """window.__ads = { shows: 0 }; window.__notifs = []; window.__chans = []; window.__gc = [];
window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "android", Plugins: {
  Billing: { products: async () => ({ products: [
      {id:'tanetto_plus',type:'subs',offers:[{basePlanId:'annuale',offerId:'prova7',token:'t1',phases:[{price:'Free',micros:0,currency:'EUR',period:'P1W',cycles:1,recurrence:2},{price:'€44.99',micros:44990000,currency:'EUR',period:'P1Y',cycles:0,recurrence:1}]},{basePlanId:'annuale',offerId:null,token:'t2',phases:[{price:'€44.99',micros:44990000,currency:'EUR',period:'P1Y',cycles:0,recurrence:1}]},{basePlanId:'mensile',offerId:null,token:'t3',phases:[{price:'€4.99',micros:4990000,currency:'EUR',period:'P1M',cycles:0,recurrence:1}]}]},
      {id:'tani_200',type:'inapp',price:'€0.99',micros:990000,currency:'EUR'},{id:'tani_1100',type:'inapp',price:'€4.99',micros:4990000,currency:'EUR'},{id:'tani_2400',type:'inapp',price:'€9.99',micros:9990000,currency:'EUR'},{id:'tani_5000',type:'inapp',price:'€19.99',micros:19990000,currency:'EUR'} ] }),
    owned: async () => ({ purchases: [] }), acknowledge: async () => ({}), consume: async () => ({}), buy: async (o) => { (window.__buys = window.__buys || []).push(o); throw { code: 'cancelled' }; }, addListener() { return { remove() {} }; } },
  LocalNotifications: { cancel: async () => {}, schedule: async (o) => { window.__notifs = o.notifications; }, createChannel: async (c) => { window.__chans.push(c); },
    deleteChannel: async (c) => { window.__chans.push({ deleted: c.id }); }, checkPermissions: async () => ({ display: "granted" }), requestPermissions: async () => ({ display: "granted" }), addListener() { return { remove() {} }; } },
  TanettoAds: { init: async () => ({ canRequestAds: true, privacyRequired: false, loaded: false }), load: async () => ({ canRequestAds: true, privacyRequired: false, loaded: true }),
    show: async () => { __ads.shows++; return { rewarded: true }; }, privacy: async () => ({}), status: async () => ({}) } } };"""

def base_state(lang="en", pet="germo", day="2026-11-16", goals=("water", "walk", "read", "tidy", "sleep"), **kw):
    st = {"v": 3, "lang": lang, "theme": "system", "pet": pet, "petName": {"germo": "Germo", "ondi": "Ondi", "lumi": "Lumi"}.get(pet, "Miko"),
          "goals": [{"id": g, "days": list(range(7))} for g in goals], "day": day, "done": [], "energy": 40, "xp": 0, "level": 3, "seeds": 300,
          "owned": ["w_cream"], "hat": None, "furn": [], "wall": "w_cream", "away": None, "cards": [], "diary": [], "days": {}, "giftDay": day,
          "onboard": 3, "sfx": False, "music": False, "season": {"key": None, "n": 0, "claimed": False}, "tut": 99, "lite": True, "calm": True,
          "trophies": {str(n): {"at": "2026-01-01", "p": True} for n in (7, 14, 30, 60, 100, 150, 200, 365, 500)}, "v19w": "2026-01-01",
          "acctAsk": "no", "welcomeGift": "2026-11-01", "rem": "ok", "letterDay": day, "visit": {"n": 1, "last": day}, "firstDay": "2026-11-01",
          "v20wear": {"gift": "2026-11-01", "seen": 1}, "survey": {"v": 9, "done": True, "gift": True}, "launchGift": 1, "chap": {"lanterns": 9}}
    st.update(kw); return st

AGE = {"adult": {"y": 1990, "m": 5}, "child": {"y": 2017, "m": 5}, "teen": {"y": 2012, "m": 1}, "skip": {"skip": True}, "none": None}

async def page(b, st=None, date=(2026, 11, 16, 9, 7), lang="en-US", native=False, age="adult", w=412, h=915, scheme="light", tz=None, wait=3500,
               extra_js="", noage_gate=True, fresh=False, mobile=True):
    """st=None + fresh=True: primo avvio vero (nessun salvataggio)."""
    serve()
    o = {"viewport": {"width": w, "height": h}, "device_scale_factor": 2, "color_scheme": scheme, "locale": lang, "is_mobile": mobile, "has_touch": mobile}
    if tz: o["timezone_id"] = tz
    ctx = await b.new_context(**o); pg = await ctx.new_page(); pg.errs = []; pg.gc = []
    pg.on("pageerror", lambda e: pg.errs.append(str(e)))
    pg.on("console", lambda m: pg.errs.append("console: " + m.text) if m.type == "error" and "ERR_" not in m.text and "Failed to load resource" not in m.text and "navigator.vibrate" not in m.text else None)
    async def _gc(r):
        pg.gc.append(r.request.url); await r.fulfill(body="", status=204)
    await pg.route("**/*goatcounter.com/**", _gc)
    await pg.route("**/fonts.googleapis.com/**", lambda r: r.abort())
    js = (MOCK if native else "") + CLOCK % (date[0], date[1] - 1, date[2], date[3], date[4] if len(date) > 4 else 7) + "sessionStorage.setItem('splash','1');"
    if st is not None:
        js += f"if(!sessionStorage.getItem('t110s')){{localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(st))});sessionStorage.setItem('t110s','1')}};"
        js += f"localStorage.setItem('tanetto-account',{json.dumps(json.dumps({'gateDone': True}))});"
    a = AGE.get(age, age) if isinstance(age, str) else age
    if a is not None:
        js += f"if(!sessionStorage.getItem('t110a')){{localStorage.setItem('tanetto-eta',{json.dumps(json.dumps(a))});sessionStorage.setItem('t110a','1')}};"
    await pg.add_init_script(("window.__TEST_NOAGE=1;" if noage_gate else "") + js + extra_js)
    await pg.goto(URL); await pg.wait_for_timeout(wait)
    return ctx, pg

async def ev(pg, code):
    return await pg.evaluate("(c) => window.__v10.ev(c)", code)

async def close_layer(pg):
    await ev(pg, "layer.innerHTML = ''; document.querySelectorAll('#trParty').forEach((x) => x.remove()); document.body.classList.remove('trlock'); 1")

def run(main):
    from playwright.async_api import async_playwright
    async def _m():
        async with async_playwright() as p:
            b = await p.chromium.launch(args=["--disable-gpu", "--no-sandbox"])
            try: await main(b)
            finally: await b.close()
    asyncio.run(_m()); done()
