/* =================== v14: versione per il Play Store — notifiche, invito all'account, regalo del lancio, errori, barre di sistema =================== */

/* ---------- Promemoria con notifiche vere (solo app Android) ---------- */
const LN = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.LocalNotifications) || (C.registerPlugin ? C.registerPlugin("LocalNotifications") : null); } catch (e) { return null; } };
const NOTIF_DAYS = 7, NOTIF_ID0 = 100, NOTIF_TRIP = 200, NOTIF_CH = "promemoria";
/* fix 1.0.9 (verifica finale B, P5): 12 o 24 ore come il campo dell'ora, che segue il telefono (prima la lingua dell'app:
   in inglese "20:00" nell'avviso e "08:00 PM" nel campo) */
const FMT_H12 = (() => { try { const o = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions(); return typeof o.hour12 === "boolean" ? o.hour12 : o.hourCycle ? /h1[12]/.test(o.hourCycle) : null; } catch (e) { return null; } })();
const fmtTime = (hm) => { const [h, m] = (hm || "20:00").split(":").map(Number); try { return intlDT(loc(), Object.assign({ hour: "2-digit", minute: "2-digit" }, FMT_H12 == null ? {} : { hour12: FMT_H12 })).format(new Date(2026, 0, 1, h || 0, m || 0)); } catch (e) { return hm; } };
let notifBusy = null;
/* Programma i prossimi 7 giorni (un messaggio diverso ogni giorno); se oggi e' gia' tutto fatto, oggi niente notifica.
   Si riprogramma a ogni apertura: chi non apre l'app per una settimana non riceve altro (niente insistenza). */
function notifSchedule() {
  if (!isNativeApp()) return Promise.resolve();
  const p = LN(); if (!p) return Promise.resolve();
  const run = async () => {
    const ids = []; for (let i = 0; i < NOTIF_DAYS; i++) ids.push({ id: NOTIF_ID0 + i }); ids.push({ id: NOTIF_TRIP });
    try { await p.cancel({ notifications: ids }); } catch (e) { /* niente da cancellare */ }
    if (!S.notif || !S.pet) return;
    const t = L(), n = S.petName || ""; const { h, m } = remTimes(); const now = Date.now(); const list = [];
    const tg = todayGoals(); const allDone = tg.length > 0 && tg.every((g) => S.done.includes(g));
    const day0 = Math.floor(new Date(dkey() + "T12:00:00").getTime() / 86400000);
    for (let i = 0; i < NOTIF_DAYS; i++) {
      const d = new Date(); d.setDate(d.getDate() + i); d.setHours(h, m, 0, 0);
      if (d.getTime() < now + 60000) continue; if (i === 0 && allDone) continue;
      const msgs = t.notif.msgs; const body = msgs[(day0 + i) % msgs.length].split("{n}").join(n);
      list.push({ id: NOTIF_ID0 + i, title: t.v12.remTitle(n), body, schedule: { at: d, allowWhileIdle: true }, isExactNotification: false, smallIcon: "ic_stat_tanetto", iconColor: "#4E8A4A" });
    }
    if (S.away && S.away.until > now + 60000) list.push({ id: NOTIF_TRIP, title: t.notif.trip(n), body: t.notif.tripB, schedule: { at: new Date(S.away.until), allowWhileIdle: true }, isExactNotification: false, smallIcon: "ic_stat_tanetto", iconColor: "#4E8A4A" });
    if (!list.length) return;
    /* Canale con un nome chiaro nelle impostazioni di Android ("Promemoria" nella lingua dell'app) */
    let ch = false; if (p.createChannel) { try { await p.createChannel({ id: NOTIF_CH, name: t.v12.remT || "Tanetto", importance: 4, visibility: 1, vibration: true }); ch = true; } catch (e) { ch = false; } }
    if (ch) list.forEach((x) => { x.channelId = NOTIF_CH; });
    try { await p.schedule({ notifications: list }); } catch (e) { trackOnce("notifiche-errore"); }
  };
  notifBusy = (notifBusy || Promise.resolve()).then(run, run);
  return notifBusy;
}
async function notifEnable() {
  const p = LN(); const t = L(); if (!p) return;
  let st = null; try { st = await p.requestPermissions(); } catch (e) { st = null; }
  if (!st || st.display !== "granted") { toast(t.notif.denied); trackOnce("notifiche-negate"); return; }
  S.notif = true; S.rem = "ok"; save(); await notifSchedule();
  toast(t.notif.onDone(fmtTime(S.remTime))); SND.play("coin"); trackOnce("notifiche-attivate");
  /* fix 1.0.9 (verifica funzionale MAJOR 1): la finestra "Vuoi un promemoria gentile?" restava aperta dopo "Attiva" */
  if (document.querySelector(".remover")) closeLayer();
  const y = window.scrollY; render(); window.scrollTo(0, y);
}
const _remCardV14 = remCard;
remCard = function (ask) {
  if (!isNativeApp()) return _remCardV14(ask);
  const t = L(), on = !!S.notif && !ask;
  return `<div class="card remcard ${ask ? "ask" : ""}"><div class="chhd"><span class="chic rem">${icon("p_bell")}</span><div><h3>${ask ? t.v12.remAsk : t.v12.remT}</h3><p class="small muted">${esc(on ? t.notif.active(fmtTime(S.remTime)) : t.notif.p(S.petName))}</p></div></div>
  <div class="field remrow"><label for="remTime${ask ? "A" : ""}">${t.v12.remTime}</label><input type="time" id="remTime${ask ? "A" : ""}" class="remtime" value="${S.remTime || "20:00"}"></div>
  <div class="rembtns">${on ? `<button class="btn small ghost" id="notifOff">${esc(t.notif.off)}</button>` : `<button class="btn small" id="notifOn">${icon("p_bell")}${esc(t.notif.on)}</button>`}</div>${ask ? `<button class="link" id="remNo">${t.v12.remLater}</button>` : ""}</div>`;
};
document.addEventListener("change", (ev) => { if (ev.target && ev.target.classList && ev.target.classList.contains("remtime") && S.notif) setTimeout(() => { notifSchedule(); const p = document.querySelector(".remcard:not(.ask) .muted"); if (p) p.textContent = L().notif.active(fmtTime(S.remTime)); }, 0); });
/* Dopo ogni obiettivo (se e' tutto fatto, oggi niente notifica) e quando parte una gita */
const _completeGoalV14n = completeGoal;
completeGoal = function (g, rect) { _completeGoalV14n(g, rect); if (S.notif) notifSchedule(); };
let notifAway = null;
const _renderV14n = render;
render = function () { _renderV14n(); const u = S.away ? S.away.until : 0; if (S.notif && u !== notifAway) { notifAway = u; notifSchedule(); } };
setTimeout(() => { if (S.notif) notifSchedule(); }, 3000);
document.addEventListener("change", (ev) => { if (ev.target && /^langSel/.test(ev.target.id) && S.notif) setTimeout(notifSchedule, 100); });

/* ---------- Invito gentile a creare un account (una volta sola, dopo 3 giorni di uso) ---------- */
function nudgeShow() {
  if (!S.pet || S.away || A.uid || S.nudgeNo || S.tut < 99 || !S.rem) return false;
  const days = new Set((S.log || []).map((x) => x.d)); return days.size >= 3;
}
function nudgeCard() {
  const a = AC(), t = L().nudge, n = S.petName || "";
  return `<div class="card nudgecard"><div class="chhd"><span class="chic acc">${icon("ac_cloud")}</span><div><h3>${esc(t.t(n))}</h3><p class="small muted">${esc(t.p(n))}</p></div></div>
  <div class="imgbtns col"><button class="btn gbtn" id="acGoogle2">${G_LOGO}<span>${esc(a.google)}</span></button><button class="btn ghost" id="acEmail2">${icon("ac_mail")}<span>${esc(a.email)}</span></button></div><button class="link" id="nudgeNo">${esc(t.no)}</button></div>`;
}
const _viewTodayV14 = viewToday;
viewToday = function () {
  const h = _viewTodayV14(); if (!nudgeShow()) return h; trackOnce("invito-account-mostrato");
  const key = `<p class="note">${L().demo}</p>`; return h.includes(key) ? h.replace(key, nudgeCard() + key) : h;
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "nudgeNo") { S.nudgeNo = dkey(); save(); trackOnce("invito-account-no"); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if ((b.id === "acGoogle2" || b.id === "acEmail2") && b.closest(".nudgecard")) trackOnce("invito-account-si");
  if (b.id === "notifOn") { ev.preventDefault(); notifEnable(); return; }
  if (b.id === "notifOff") { S.notif = false; save(); notifSchedule(); toast(L().notif.offDone); trackOnce("notifiche-disattivate"); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "launchWear") { S.hat = "h_launch"; save(); closeLayer(); render(); SND.play("pop"); burst("confetti", 24); return; }
});

/* ---------- Regalo del lancio: cappellino esclusivo per chi arriva entro il 31/01/2027 ---------- */
const LAUNCH_END = "2027-01-31";
HAT_ART.h_launch = (b) => `<g transform="rotate(6 100 ${b})"><path d="M74 ${b + 4} L126 ${b + 4} L100 ${b - 56} Z" fill="#4E8A4A"/><path d="M100 ${b - 56} L126 ${b + 4} L113 ${b + 4} Z" fill="#000" opacity=".1"/>
  <path d="M81 ${b - 12} L119 ${b - 12} M86 ${b - 26} L114 ${b - 26} M92 ${b - 40} L108 ${b - 40}" stroke="#A6E3A8" stroke-width="5" stroke-linecap="round"/>
  <path d="M72 ${b + 4} Q100 ${b + 11} 128 ${b + 4}" stroke="#F2B33D" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M100 ${b - 71} l3.4 6.9 7.6 1.1 -5.5 5.4 1.3 7.6 -6.8 -3.6 -6.8 3.6 1.3 -7.6 -5.5 -5.4 7.6 -1.1z" fill="#F2B33D" stroke="#C9861F" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="90" cy="${b - 6}" r="2.4" fill="#FFE7A0"/><circle cx="109" cy="${b - 19}" r="2.2" fill="#F29BB8"/><circle cx="97" cy="${b - 33}" r="2" fill="#FFE7A0"/></g>`;
HAT_VB.h_launch = "60 22 80 86";
SHOP.push({ id: "h_launch", kind: "wear", price: 0, special: true, launch: true });
const _shopListV14 = shopList;
shopList = function (kind) { return _shopListV14(kind).filter((s) => !s.launch || S.owned.includes(s.id)); };
function launchGift() {
  if (!S.pet || S.owned.includes("h_launch") || dkey() > LAUNCH_END || window.__TEST_NOLAUNCH) return;
  if (layer.innerHTML || tutOn || pendingWelcome || S.tut < 99 || S.away) return;
  const t = L().launch, n = S.petName || ""; S.owned.push("h_launch"); S.launchGift = dkey(); save();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="lgT"><div class="box card wgbox"><div class="fdpet">${petSVG(S.pet, "amore", "h_launch", stage(), n)}</div><h2 id="lgT">${esc(t.t)}</h2><p>${esc(t.p(n, fmtDate(LAUNCH_END)))}</p><button class="btn" id="launchWear">${esc(t.b)}</button><button class="link" id="closeLayer">${esc(L().close)}</button></div></div>`;
  SND.play("fanfare"); burst("confetti", 28); trackOnce("regalo-lancio");
  if (anim) G.from(".wgbox .fdpet", { scale: 0.4, rotation: -10, duration: 0.6, ease: "back.out(2)" });
}
setInterval(() => { try { launchGift(); } catch (e) { /* niente */ } }, 4000);
setTimeout(() => { try { launchGift(); } catch (e) { /* niente */ } }, 2600);

/* ---------- Sul sito, da telefono Android: invito a scaricare l'app dallo store ---------- */
const isAndroidWeb = () => !isNativeApp() && /android/i.test(navigator.userAgent || "");
function playCard() {
  if (!isAndroidWeb() || !playLive()) return ""; const t = L().gplay;
  return `<div class="card playcard"><div class="chhd"><span class="chic acc">${icon("p_crown")}</span><div><h3>${esc(t.t)}</h3><p class="small muted">${esc(t.p)}</p></div></div><a class="btn block" href="${PLAY_URL}&referrer=utm_source%3Dsito" target="_blank" rel="noopener">${esc(BT().getApp)}</a></div>`;
}
const _viewMoreV14p = viewMore;
viewMore = function () { const h = _viewMoreV14p(); const c = playCard(); if (!c) return h; const key = `<h1>${L().moreT}</h1>`; return h.includes(key) ? h.replace(key, key + c) : h; };
const _viewGateV14 = viewGate;
viewGate = function () { const h = _viewGateV14(); const c = playCard(); if (!c) return h; const key = `<div class="gatebtns">`; return h.includes(key) ? h.replace(key, c + key) : h; };

/* ---------- Errori dell'app: conteggio anonimo (solo il tipo di errore, mai dati personali) ---------- */
let errN = 0;
function reportErr(msg, line) {
  if (errN >= 5) return; const m = String(msg || "").replace(/^Uncaught\s+/i, "").slice(0, 200);
  if (!m || /ResizeObserver loop|Script error|Load failed|NetworkError|Failed to fetch/i.test(m)) return;
  errN++; const slug = m.toLowerCase().replace(/https?:\/\/\S+/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  try { trackOnce(`errore-js-v14-${isNativeApp() ? "app" : "web"}-${slug}-l${line || 0}`); } catch (e) { /* niente */ }
}
window.addEventListener("error", (e) => { if (e && e.filename && !/index\.html|tanetto|localhost|github\.io|^$/.test(e.filename) && !e.filename.startsWith(location.origin)) return; reportErr(e && e.message, e && e.lineno); });
window.addEventListener("unhandledrejection", (e) => { const r = e && e.reason; if (r && r.code) return; /* errori gestiti (rete, annullato...) */ reportErr(r && (r.message || r), 0); });

/* ---------- Barre di sistema di Android: icone scure su sfondo chiaro, chiare su sfondo scuro ---------- */
const sysBars = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.SystemBars) || (C.registerPlugin ? C.registerPlugin("SystemBars") : null); } catch (e) { return null; } };
function sysBarsStyle() {
  if (!isNativeApp()) return; const p = sysBars(); if (!p || !p.setStyle) return;
  const dark = S.theme === "dark" || (S.theme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  try { const r = p.setStyle({ style: dark ? "DARK" : "LIGHT" }); if (r && r.catch) r.catch(() => {}); } catch (e) { /* niente */ }
}
const _applyRootV14 = applyRoot;
applyRoot = function () { _applyRootV14(); sysBarsStyle(); };
try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sysBarsStyle); } catch (e) { /* niente */ }

/* ---------- Da dove si usa Tanetto: app Android o sito (conteggio anonimo, una volta al giorno) ---------- */
setTimeout(() => { try { if (S.pet) trackOnce(isNativeApp() ? "apertura-app-android" : "apertura-sito"); } catch (e) { /* niente */ } }, 1800);
