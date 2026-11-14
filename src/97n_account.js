/* =================== v14: account facoltativo e backup online =================== */
/* Dopo il logo, prima della scelta del compagno: Google, e-mail oppure "Continua senza account".
   Il backup e' lo stesso codice compresso del trasferimento (packState) salvato su Firebase, solo per la persona.
   Le informazioni dell'account stanno in una chiave separata, cosi' un ripristino non le sovrascrive. */
const FB_CFG = { apiKey: "AIzaSyDt7-JxuuK0-Q0rXchYpivOkKE5-5Y4m2A", authDomain: "tanettoapp-pet.firebaseapp.com", projectId: "tanettoapp-pet", storageBucket: "tanettoapp-pet.firebasestorage.app", messagingSenderId: "223551726724", appId: "1:223551726724:web:449dffc7c8b48a155eced1" };
const FB_WEB_CLIENT = "223551726724-4ra88t49uj1q31lt55v072pds55h7iom.apps.googleusercontent.com";
const ACCT_KEY = "tanetto-account";
const BK_MAX = 790000; /* limite del documento online (le regole accettano fino a 800.000 caratteri) */
const BK_GAP = { day: 20 * 3600e3, week: 7 * 86400e3 - 2 * 3600e3, month: 30 * 86400e3 };
const PW_MIN = 8;

let A = (() => { try { return Object.assign({ freq: "week" }, JSON.parse(localStorage.getItem(ACCT_KEY) || "{}")); } catch (e) { return { freq: "week" }; } })();
function saveA() { try { localStorage.setItem(ACCT_KEY, JSON.stringify(A)); } catch (e) { /* niente */ } }
const signedIn = () => !!A.uid;
const AC = () => L().acct;
const fmtDT = (ms) => intlDT(loc(), { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(ms));
const fmtD = (ms) => intlDT(loc(), { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ms));

Object.assign(ICON, {
  ac_mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  ac_cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 9.5 4.3 4.3 0 0 0 7 18z"/><path d="M12 15v-5M9.5 12.5 12 10l2.5 2.5"/>',
  ac_eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  ac_eyeoff: '<path d="M3 3l18 18"/><path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
});
/* Logo ufficiale "G" di Google (a colori, come chiedono le regole del pulsante "Accedi con Google") */
const G_LOGO = `<svg class="glogo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;

/* --- 1.0.10: Firebase App Check (Play Integrity), solo nell'app Android ---
   Il gettone lo fa il codice nativo (AppCheckPlugin.java, plugin "TanettoAppCheck"): l'SDK web lo allega alle richieste di
   Auth e Firestore. SPENTO finche' la build Android non contiene l'ID dell'app Android di Firebase (status: on=false):
   allora qui non si fa niente e tutto resta come nella 1.0.9. Sul sito niente App Check. Il controllo e' solo
   "monitoraggio" finche' la console di Firebase non lo rende obbligatorio. Un gettone che non arriva (niente Google Play,
   rete lenta) non blocca le richieste: la prima puo' aspettare al massimo 10 s, poi l'SDK la manda senza gettone valido, e
   per 1 minuto non lo si richiede (cosi' le richieste seguenti partono subito).
   L'SDK web (fb.js) ha il rinnovo automatico spento: chiede un gettone solo quando quello che ha e' scaduto. Si usa quello gia'
   pronto nel telefono (meno chiamate a Play Integrity, che ha una quota al giorno); se scade entro 3 minuti se ne chiede uno
   nuovo (force), cosi' non si ricomincia subito. */
const appCheckPl = () => { try { const C = window.Capacitor; return (C && C.Plugins && C.Plugins.TanettoAppCheck) || null; } catch (e) { return null; } };
const acWait = (p, ms) => Promise.race([Promise.resolve(p), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), Math.max(0, ms)))]);
const acStale = (t) => !t || typeof t.token !== "string" || !t.token || !(+t.exp - Date.now() > 3 * 60e3);
let acFailUntil = 0;
function appCheckSetup() {
  const p = isNativeApp() ? appCheckPl() : null;
  if (!p || typeof p.status !== "function") return Promise.resolve(null);
  return acWait(p.status(), 1500).then((r) => (r && r.on === true ? async () => {
    if (Date.now() < acFailUntil) throw new Error("app check: retry later");
    const end = Date.now() + 10e3;
    try {
      let t = await acWait(p.token({}), end - Date.now());
      if (acStale(t)) t = await acWait(p.token({ force: true }), end - Date.now());
      if (acStale(t)) throw new Error("app check: bad token");
      return { token: t.token, expireTimeMillis: +t.exp };
    } catch (e) { acFailUntil = Date.now() + 60e3; throw e; }
  } : null)).catch(() => null);
}

/* --- Firebase caricato solo quando serve --- */
let fbP = null;
function fbLoad() {
  if (fbP) return fbP;
  const acP = appCheckSetup(); /* in parallelo al caricamento di fb.js: nessuna attesa in piu' */
  fbP = new Promise((res, rej) => {
    if (window.TanFB) { res(); return; }
    const s = document.createElement("script"); s.src = "fb.js"; s.async = true;
    s.onload = () => (window.TanFB ? res() : rej(netErr())); s.onerror = () => rej(netErr());
    document.head.appendChild(s);
  }).then(() => acP).then((appCheck) => window.TanFB.init(FB_CFG, { native: isNativeApp(), emu: window.__FB_EMU || null, lang: fbLang(), appCheck }))
    .then((u) => { checkSession(u); return u; })
    .catch((e) => { fbP = null; throw e; });
  return fbP;
}
const fbLang = () => { const l = L().locale || "en"; return /^(zh|pt)/.test(l) ? l : l.slice(0, 2); };
function netErr() { const e = new Error("net"); e.code = "auth/network-request-failed"; return e; }
/* Se l'accesso salvato non c'e' piu' (scaduto o account eliminato altrove), l'app torna in modalita' locale */
function checkSession(u) {
  if (A.uid && (!u || u.uid !== A.uid)) { A.uid = null; A.lost = true; saveA(); if (tab === "more" && S.pet) render(); }
}
const gsi = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.GoogleSignIn) || (C.registerPlugin ? C.registerPlugin("GoogleSignIn") : null); } catch (e) { return null; } };
async function googleIdToken() {
  if (!isNativeApp()) return null;
  const p = gsi(); if (!p) { const e = new Error("plugin"); e.code = "other"; throw e; }
  try { const r = await p.signIn({ clientId: FB_WEB_CLIENT }); return r.idToken; }
  catch (e) { const c = (e && e.code) || ""; const x = new Error(c); x.code = c === "cancelled" ? "auth/popup-closed-by-user" : c === "no-account" ? "no-account" : (/network/i.test((e && e.message) || "") ? "auth/network-request-failed" : "other"); throw x; }
}
function errText(e) {
  const E = AC().err; const c = (e && e.code) || "";
  if (/popup-closed|cancelled-popup|user-cancelled/.test(c)) return "";
  if (c === "no-account") return E.noAcc;
  if (/invalid-email|missing-email/.test(c)) return E.email;
  if (/invalid-credential|wrong-password|user-not-found|invalid-login|missing-password/.test(c)) return E.cred;
  if (/email-already-in-use|credential-already-in-use/.test(c)) return E.inUse;
  if (/weak-password|password-does-not-meet/.test(c)) return E.weak;
  if (/too-many-requests|quota/.test(c)) return E.many;
  if (/network|unavailable|offline|timeout/.test(c)) return E.net;
  if (/account-exists-with-different-credential/.test(c)) return E.diff;
  return E.other;
}

/* --- Schermata di accesso (dopo il logo, prima della scelta del compagno) --- */
/* 1.0.9 (scelta del titolare): la schermata di accesso NON e' piu' la prima. Si comincia subito; l'account si propone
   con calma dopo il primo giorno intero o qualche obiettivo (acctNudge, sotto). Chi torna con un account lo ritrova da
   "Ho gia' un cucciolo" nella prima schermata; in Profilo l'accesso c'e' sempre. viewGate resta solo per i test vecchi. */
const gateNeeded = () => false;
let acBusy = false;
function viewGate() {
  const a = AC(), t = L(); setTimeout(() => fbLoad().catch(() => {}), 0); /* pronto prima del tocco: la finestra di Google non viene bloccata */
  const legal = a.legal(`<button class="inlink" data-doc="terms">${esc(t.termsB)}</button>`, `<button class="inlink" data-doc="privDoc">${esc(t.privB)}</button>`);
  /* l'ultimo collegamento resta unito al punto finale (e in italiano a "l'"), cosi' non va a capo da solo */
  const legalH = legal.replace(/(l'|l’)?(<button class="inlink" data-doc="privDoc">[^<]*<\/button>)([.。]?)/, '<span class="nw">$1$2$3</span>');
  return `${topBar()}<div class="stack gate">
  <div class="gatepets" aria-hidden="true">${["ondi", "germo", "lumi"].map((p) => `<span class="gp gp-${p}" style="background:radial-gradient(circle at 50% 60%, ${HALO[p]} 0 62%, transparent 63%)">${petSVG(p, "felice", null, 0, "")}</span>`).join("")}</div>
  <h1>${esc(a.gateT)}</h1><p class="muted">${esc(a.gateP)}</p>
  <div class="gatebtns"><button class="btn gbtn block" id="acGoogle" ${acBusy ? "disabled" : ""}>${G_LOGO}<span>${esc(a.google)}</span></button>
  <button class="btn ghost block" id="acEmail" ${acBusy ? "disabled" : ""}>${icon("ac_mail")}<span>${esc(a.email)}</span></button></div>
  <p class="acerr" id="gateErr" role="alert"></p>
  <div class="orline"><span>${esc(a.or)}</span></div>
  <button class="link" id="acSkip">${esc(a.skip)}</button>
  <p class="note gatenote">${esc(a.skipP)}</p>
  <p class="note gatelegal">${legalH}</p></div>`;
}
const _viewOnboardV14 = viewOnboard;
viewOnboard = function () { return gateNeeded() ? viewGate() : _viewOnboardV14(); };

/* --- Finestra e-mail: accedi / crea account / password dimenticata --- */
let emMode = "in", emFrom = "gate", emShow = false;
function openEmail(from, mode) {
  emFrom = from || "gate"; if (mode) emMode = mode; const a = AC();
  const prevE = (document.getElementById("acEm") || {}).value || ""; const prevP = (document.getElementById("acPw") || {}).value || "";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="emT"><form class="box card acbox" id="acForm" novalidate>
  <h2 id="emT">${esc(a.emT)}</h2>
  <div class="segs" role="tablist"><button type="button" class="seg" role="tab" aria-selected="${emMode === "in"}" data-emmode="in">${esc(a.tabIn)}</button><button type="button" class="seg" role="tab" aria-selected="${emMode === "up"}" data-emmode="up">${esc(a.tabUp)}</button></div>
  <div class="field"><label for="acEm">${esc(a.emailL)}</label><input id="acEm" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" maxlength="120" value="${esc(prevE)}"></div>
  <div class="field"><label for="acPw">${esc(a.pwL)}</label><div class="pwrow"><input id="acPw" type="${emShow ? "text" : "password"}" autocomplete="${emMode === "up" ? "new-password" : "current-password"}" maxlength="100" value="${esc(prevP)}"><button type="button" class="iconbtn pweye" id="acEye" aria-label="${esc(emShow ? a.hide : a.show)}" aria-pressed="${emShow}">${icon(emShow ? "ac_eyeoff" : "ac_eye")}</button></div>${emMode === "up" ? `<span class="small muted">${esc(a.pwHint)}</span>` : ""}</div>
  <p class="acerr" id="emErr" role="alert"></p>
  <button type="submit" class="btn block" id="acGo">${esc(emMode === "up" ? a.tabUp : a.tabIn)}</button>
  ${emMode === "in" ? `<button type="button" class="link" id="acForgot">${esc(a.forgot)}</button>` : ""}
  <button type="button" class="link muted" id="closeLayer">${esc(a.cancel)}</button></form></div>`;
  if (anim) G.from(".acbox", { y: 24, opacity: 0, duration: 0.3, ease: "power3.out" });
  setTimeout(() => { const i = document.getElementById(prevE ? "acPw" : "acEm"); if (i && !("ontouchstart" in window)) i.focus(); }, 80);
}
function emErr(msg) { const p = document.getElementById("emErr"); if (p) p.textContent = msg || ""; }
const BUSY_LBL = ["acGo", "acNow", "acOutYes", "acOutForce", "acDelYes", "acPwGo", "acKeepLocal", "acUseCloud"];
function setBusy(on, ids) {
  acBusy = on;
  (ids || ["acGo", "acGoogle", "acEmail", "acGoogle2", "acEmail2", "acNow", "acRestore", "acOutYes", "acOutForce", "acDelYes", "acPwGo", "acUseCloud", "acKeepLocal"]).forEach((id) => {
    const b = document.getElementById(id); if (!b) return; b.disabled = on; b.classList.toggle("busy", on);
    /* sul pulsante appena toccato compare "Un attimo..." con un piccolo cerchio che gira */
    if (on && BUSY_LBL.includes(id) && b === document.activeElement && !b.dataset.lbl) { b.dataset.lbl = b.innerHTML; b.innerHTML = `<span class="spin" aria-hidden="true"></span>${esc(AC().wait)}`; }
    if (!on && b.dataset.lbl) { b.innerHTML = b.dataset.lbl; delete b.dataset.lbl; }
  });
}
async function submitEmail() {
  const a = AC(); const em = (document.getElementById("acEm").value || "").trim(); const pw = document.getElementById("acPw").value || "";
  if (!em || !pw) { emErr(a.err.empty); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { emErr(a.err.email); return; }
  if (emMode === "up" && pw.length < PW_MIN) { emErr(a.err.weak); return; }
  emErr(""); setBusy(true);
  try {
    await fbLoad();
    const u = emMode === "up" ? await window.TanFB.emailSignUp(em, pw) : await window.TanFB.emailSignIn(em, pw);
    await afterLogin(u, emFrom, emMode === "up" ? "email-nuovo" : "email-accesso");
    if (emMode === "up") setTimeout(() => toast(a.verifySent), 2600);
  } catch (e) { setBusy(false); emErr(errText(e)); SND.play("miss"); }
}
async function doGoogle(from) {
  const a = AC(); const errEl = from === "gate" ? "gateErr" : null; const show = (m) => { if (errEl) { const p = document.getElementById(errEl); if (p) p.textContent = m; } else if (m) toast(m); };
  show(""); setBusy(true);
  try {
    await fbLoad();
    const tok = await googleIdToken();
    const u = await window.TanFB.google(tok);
    if (!u) { setBusy(false); return; } /* accesso con reindirizzamento: si torna qui dopo */
    await afterLogin(u, from, "google");
  } catch (e) { setBusy(false); const m = errText(e); if (m) { show(m); SND.play("miss"); } }
  void a;
}

/* --- Dopo l'accesso: ripristino o primo backup --- */
let cloudPending = null;
async function afterLogin(u, from, how) {
  const a = AC();
  /* Prima si legge il backup: se internet cade proprio ora, l'accesso non vale e non si rischia di sovrascrivere un backup esistente */
  let cloud = null;
  try { cloud = await window.TanFB.pull(); } catch (e) { try { await window.TanFB.out(); } catch (x) { /* niente */ } throw e; }
  const st = cloud && cloud.d ? await unpackState(cloud.d) : null;
  A.uid = u.uid; A.email = u.email; A.prov = u.provider; A.gateDone = true; A.lost = false; A.last = 0; A.err = 0; saveA();
  track("account-" + how);
  setBusy(false); layer.innerHTML = "";
  if (from === "gate" || !S.pet) {
    if (st) { applyCloud(st, cloud.at); toast(a.welcome(S.petName)); SND.play("fanfare"); trackOnce("ripristino-online"); return; }
    render(); toast(a.signedIn); SND.play("coin"); return;
  }
  if (st) { cloudPending = { st, at: cloud.at }; openChoice(); return; }
  render(); const ok = await backupNow(true); toast(ok ? a.saved(S.petName) : a.saveFail); if (ok) SND.play("coin");
}
function applyCloud(st, at) {
  S = Object.assign(fresh(), st); save(); A.last = at || Date.now(); saveA();
  tab = "today"; layer.innerHTML = ""; applyRoot(); render();
}
function openChoice() {
  const a = AC(), c = cloudPending; if (!c) return; const n2 = c.st.petName || "", n1 = S.petName || "";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="chT"><div class="box card acbox"><h2 id="chT">${esc(a.choiceT)}</h2>
  <div class="chpets"><span>${petSVG(c.st.pet, "felice", c.st.hat || null, c.st.level >= 6 ? 2 : c.st.level >= 3 ? 1 : 0, n2)}<b>${esc(n2)}</b></span><span>${petSVG(S.pet, "felice", S.hat, stage(), n1)}<b>${esc(n1)}</b></span></div>
  <p>${esc(a.choiceP(n2, fmtD(c.at || Date.now()), n1))}</p>
  <button class="btn block" id="acUseCloud">${ICON.ac_cloud ? icon("ac_cloud") : ""}${esc(a.useCloud(n2))}</button><button class="btn ghost block" id="acKeepLocal">${esc(a.keepLocal(n1))}</button></div></div>`;
}

/* --- Backup --- */
let bkBusy = null;
function backupNow(force) {
  if (bkBusy) return bkBusy;
  bkBusy = (async () => {
    if (!A.uid || !S.pet) return false;
    try {
      await fbLoad(); if (!A.uid) return false;
      const d = await packState(); if (d.length > BK_MAX) { trackOnce("backup-troppo-grande"); return false; }
      const h = hashStr(d);
      if (A.h === h && A.last) { if (force) { A.last = Date.now(); saveA(); } return true; } /* niente di nuovo da salvare */
      /* le regole online accettano un backup ogni 10 secondi: se ne e' appena partito uno, si aspetta un attimo */
      const wait = A.last ? 11500 - (Date.now() - A.last) : 0; if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      A.last = await window.TanFB.push(d); A.h = h; A.err = 0; saveA(); return true;
    } catch (e) { A.err = Date.now(); saveA(); if (/permission|unauthenticated|user-token-expired|user-disabled|user-not-found/.test((e && e.code) || "")) { A.uid = null; A.lost = true; saveA(); } return false; }
  })().finally(() => { bkBusy = null; });
  return bkBusy;
}
function hashStr(x) { let h = 5381; for (let i = 0; i < x.length; i++) h = ((h << 5) + h + x.charCodeAt(i)) | 0; return x.length + ":" + (h >>> 0).toString(36); }
function backupDue() {
  if (!A.uid || !S.pet || A.freq === "manual") return false;
  if (A.err && Date.now() - A.err < 30 * 60e3) return false;
  return Date.now() - (A.last || 0) >= (BK_GAP[A.freq] || BK_GAP.week);
}
function autoBackup() {
  if (!backupDue() || navigator.onLine === false) return;
  backupNow(false).then((ok) => { if (ok) { trackOnce("backup-automatico"); if (tab === "more") refreshLast(); } });
}
function refreshLast() { const p = document.getElementById("acLast"); if (p) p.textContent = A.last ? AC().last(fmtDT(A.last)) : AC().never; }
setTimeout(() => { if (A.uid) fbLoad().then(autoBackup).catch(() => {}); }, 3500);
setInterval(autoBackup, 30 * 60e3);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") autoBackup(); });
/* Primo backup subito dopo aver scelto il compagno (chi ha fatto l'accesso nella schermata iniziale) */
const _renderV14 = render;
render = function () {
  _renderV14();
  if (S.pet && A.uid && !A.last && !A.err) setTimeout(autoBackup, 1500);
};

/* --- Altro: riquadro "Account e backup" --- */
let acManage = false;
function acctCard() {
  const a = AC(), n = S.petName || "";
  /* 1.0.11 (G-03): Firebase non si carica piu' solo perche' si apre il Profilo (prima: 800 ms di controlli per sempre);
     si prepara al primo tocco sui pulsanti dell'account (98zk) */
  if (!signedIn()) return `<div class="card stack-s accard" id="acctCard"><h3>${icon("ac_cloud")}${esc(a.cardT)}</h3>${A.lost ? `<p class="small acwarn">${esc(a.lost)}</p>` : ""}<p class="small muted">${esc(a.localP(n))}</p>
  <div class="imgbtns col"><button class="btn gbtn" id="acGoogle2">${G_LOGO}<span>${esc(a.google)}</span></button><button class="btn ghost" id="acEmail2">${icon("ac_mail")}<span>${esc(a.email)}</span></button></div></div>`;
  return `<div class="card stack-s accard" id="acctCard"><h3>${icon("ac_cloud")}${esc(a.cardT)}</h3><p class="small muted acwho">${esc(a.as(A.email || ""))}</p>
  <p class="small"><b>${esc(a.autoL)}</b></p><div class="chips">${["day", "week", "month", "manual"].map((f) => `<button class="chip" aria-pressed="${A.freq === f}" data-acfreq="${f}">${esc(a.freq[f])}</button>`).join("")}</div>
  <p class="small muted" id="acLast">${esc(A.last ? a.last(fmtDT(A.last)) : a.never)}</p>
  <div class="imgbtns col"><button class="btn" id="acNow">${esc(a.now)}</button><button class="btn ghost" id="acRestore">${esc(a.restore)}</button></div>
  <button class="link small acmore" id="acManage" aria-expanded="${acManage}">${esc(a.manage)} <span aria-hidden="true">${acManage ? "▴" : "▾"}</span></button>
  ${acManage ? `<div class="acmanage"><button class="btn ghost small" id="acOut">${esc(a.out)}</button><button class="link danger small" id="acDel">${esc(a.del)}</button></div>` : ""}</div>`;
}
const _viewMoreV14 = viewMore;
viewMore = function () {
  const h = _viewMoreV14(); const key = `<div class="card stack-s" id="dataCard">`;
  if (h.includes(key)) return h.replace(key, acctCard() + key);
  const k2 = `<div class="card stack-s"><h3>${L().legalT}</h3>`; return h.includes(k2) ? h.replace(k2, acctCard() + k2) : h + acctCard();
};

/* --- Esci ed Elimina profilo --- */
function wipeLocal() {
  const lang = S.lang, theme = S.theme, sfx = S.sfx, music = S.music, haptic = S.haptic;
  try { localStorage.removeItem(KEY); } catch (e) { /* niente */ }
  snapClear();
  S = Object.assign(fresh(), { lang, theme, sfx, music, haptic }); save();
  A = { freq: A.freq || "week" }; saveA(); acManage = false;
  tab = "today"; draftPet = "germo"; draftName = ""; draftGoals = ["water", "walk", "breathe"]; confirmReset = false; pendingWelcome = false; tutClose(false);
  const p = gsi(); if (isNativeApp() && p && p.signOut) p.signOut().catch(() => {});
  layer.innerHTML = ""; applyRoot(); render(); window.scrollTo(0, 0);
}
function openOut(failed) {
  const a = AC(), n = S.petName || "";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="ouT"><div class="box card acbox"><h2 id="ouT">${esc(a.outT)}</h2>
  <p>${esc(failed ? a.outFail(A.last ? fmtDT(A.last) : "") : a.outP(n))}</p>
  <div class="row acrow"><button class="btn ghost" id="closeLayer">${esc(a.cancel)}</button>${failed ? `<button class="btn" id="acOutForce">${esc(a.outForce)}</button>` : `<button class="btn" id="acOutYes">${esc(a.out)}</button>`}</div></div></div>`;
}
async function signOutNow(force) {
  const a = AC(); setBusy(true);
  if (!force) { const ok = await backupNow(true); if (!ok) { setBusy(false); openOut(true); return; } }
  try { await fbLoad(); await window.TanFB.out(); } catch (e) { /* si esce comunque da questo telefono */ }
  setBusy(false); track("account-esci"); wipeLocal(); toast(a.outDone);
}
function openDel() {
  const a = AC();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="deT"><div class="box card acbox"><h2 id="deT">${esc(a.delT)}</h2>
  <p>${esc(a.delP(A.email || "", S.petName || ""))}</p>${typeof plusActive === "function" && plusActive() ? `<p class="small acwarn">${esc(L().bill.delSub)}</p>` : ""}<p class="acerr" id="delErr" role="alert"></p>
  <div class="row acrow"><button class="btn ghost" id="closeLayer">${esc(a.cancel)}</button><button class="btn danger" id="acDelYes">${esc(a.delYes)}</button></div></div></div>`;
}
function openDelPw() {
  const a = AC();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="dpT"><form class="box card acbox" id="acPwForm" novalidate><h2 id="dpT">${esc(a.delT)}</h2><p>${esc(a.delPw)}</p>
  <div class="field"><label for="acPw2">${esc(a.pwL)}</label><input id="acPw2" type="password" autocomplete="current-password" maxlength="100"></div><p class="acerr" id="delErr" role="alert"></p>
  <div class="row acrow"><button type="button" class="btn ghost" id="closeLayer">${esc(a.cancel)}</button><button type="submit" class="btn danger" id="acPwGo">${esc(a.delYes)}</button></div></form></div>`;
  setTimeout(() => { const i = document.getElementById("acPw2"); if (i) i.focus(); }, 80);
}
function delErr(m) { const p = document.getElementById("delErr"); if (p) p.textContent = m || ""; }
async function deleteNow(pw) {
  const a = AC(); setBusy(true); delErr("");
  try {
    await fbLoad();
    if (pw) await window.TanFB.reauthPassword(pw);
    try { await window.TanFB.remove(); }
    catch (e) {
      if (!/requires-recent-login/.test((e && e.code) || "")) throw e;
      if (A.prov === "google") { await window.TanFB.reauthGoogle(await googleIdToken()); await window.TanFB.remove(); }
      else { setBusy(false); openDelPw(); return; }
    }
    setBusy(false); track("profilo-eliminato"); wipeLocal(); toast(a.delDone);
  } catch (e) { setBusy(false); const m = errText(e); if (m) { delErr(m); SND.play("miss"); } }
}

/* --- Ripristino dal backup online --- */
let restorePending = null;
async function askRestore() {
  const a = AC(); setBusy(true);
  try {
    await fbLoad(); const c = await window.TanFB.pull(); setBusy(false);
    const st = c && c.d ? await unpackState(c.d) : null; if (!st) { toast(a.noBackup); return; }
    restorePending = { st, at: c.at };
    layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="rcT"><div class="box card acbox"><h2 id="rcT">${esc(a.restore)}</h2><p>${esc(a.restAsk(fmtDT(c.at || Date.now())))}</p>
    <div class="row acrow"><button class="btn ghost" id="closeLayer">${esc(a.cancel)}</button><button class="btn" id="acRestYes">${esc(a.restYes)}</button></div></div></div>`;
  } catch (e) { setBusy(false); toast(errText(e) || a.err.other); }
}

/* --- 1.0.9: invito gentile all'account, dopo il valore (dal giorno dopo il primo) ---
   Al massimo 3 volte, una ogni 7 giorni, mai durante un viaggio appena partito, una cartolina o la scheda Viaggi.
   Chi ha gia' un account non lo vede mai. */
function acctNudgeDue() {
  try {
    if (signedIn() || !S.pet || S.acctAsk === "no" || (S.tut || 0) < 99 || (typeof tutOn !== "undefined" && tutOn)) return false; /* acctAsk "no": mai chiedere (usato dai test e per chi lo chiede) */
    const n = A.nudge || {}; if ((n.k || 0) >= 3 || (n.next && dkey() < n.next)) return false;
    if (pickedDest || story || tab === "trips" || (S.away && Date.now() - (S.away.t0 || 0) < 10 * 60e3)) return false;
    /* 1.0.9 (fase 3, decisione del proprietario): solo DOPO il primo giorno (prima: "o dopo 5 obiettivi", anche il giorno 1) */
    const today = dkey();
    return (!!S.firstDay && S.firstDay < today) || (!S.firstDay && (S.log || []).some((x) => x && x.d && x.d < today));
  } catch (e) { return false; }
}
function acctNudge() {
  if (!acctNudgeDue()) return; const a = AC(), t = L().v21; const n = S.petName || "";
  const k = ((A.nudge && A.nudge.k) || 0) + 1; const nx = new Date(); nx.setDate(nx.getDate() + 7); A.nudge = { k, next: dkey(nx) }; saveA();
  setTimeout(() => fbLoad().catch(() => {}), 0); /* pronto prima del tocco: la finestra di Google non viene bloccata */
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="anT"><div class="box card acbox acnudge"><div class="acnpet" aria-hidden="true">${petSVG(S.pet, "felice", S.hat, stage(), "")}</div><h2 id="anT">${esc(t.nudgeT(n))}</h2><p>${esc(t.nudgeP(n))}</p>
    <div class="imgbtns col"><button class="btn gbtn" id="acGoogle2" type="button">${G_LOGO}<span>${esc(a.google)}</span></button><button class="btn ghost" id="acEmail2" type="button">${icon("ac_mail")}<span>${esc(a.email)}</span></button></div>
    <button class="link" id="closeLayer" type="button">${esc(t.nudgeLater)}</button></div></div>`;
  trackOnce("account-invito-" + k);
  if (anim) G.from(".acnudge", { y: 30, opacity: 0, duration: 0.4, ease: "back.out(1.4)" });
}
function acctNudgeQ() { if (acctNudgeDue() && typeof nq20 === "function") nq20("acct", "ask", acctNudge); }
setTimeout(acctNudgeQ, 6000);

/* --- Tocchi --- */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return; const a = AC();
  if (b.id === "acGoogle" || b.id === "acGoogle2") { ev.preventDefault(); SND.play("click"); doGoogle(b.id === "acGoogle" ? "gate" : "more"); return; }
  if (b.id === "acEmail" || b.id === "acEmail2") { ev.preventDefault(); SND.play("click"); emShow = false; openEmail(b.id === "acEmail" ? "gate" : "more", "in"); return; }
  if (b.id === "acSkip") { A.gateDone = true; saveA(); track("account-saltato"); SND.play("click"); render(); window.scrollTo(0, 0); return; }
  if (b.dataset.emmode) { if (emMode !== b.dataset.emmode) { emMode = b.dataset.emmode; openEmail(emFrom); } return; }
  if (b.id === "acEye") { emShow = !emShow; const i = document.getElementById("acPw"); if (i) i.type = emShow ? "text" : "password"; b.setAttribute("aria-pressed", String(emShow)); b.setAttribute("aria-label", emShow ? a.hide : a.show); b.innerHTML = icon(emShow ? "ac_eyeoff" : "ac_eye"); return; }
  if (b.id === "acForgot") {
    const em = ((document.getElementById("acEm") || {}).value || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { emErr(a.err.email); const i = document.getElementById("acEm"); if (i) i.focus(); return; }
    setBusy(true, ["acForgot", "acGo"]);
    fbLoad().then(() => window.TanFB.resetPw(em)).then(() => { setBusy(false, ["acForgot", "acGo"]); emErr(""); const p = document.getElementById("emErr"); if (p) { p.textContent = a.resetSent(em); p.classList.add("ok"); } })
      .catch((e) => { setBusy(false, ["acForgot", "acGo"]); emErr(errText(e)); });
    return;
  }
  if (b.dataset.acfreq) { A.freq = b.dataset.acfreq; saveA(); document.querySelectorAll("[data-acfreq]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.acfreq === A.freq))); trackOnce("backup-" + A.freq); setTimeout(autoBackup, 300); return; }
  if (b.id === "acNow") { setBusy(true); backupNow(true).then((ok) => { setBusy(false); refreshLast(); toast(ok ? a.saved(S.petName) : (A.uid ? a.saveFail : a.lost)); if (ok) { SND.play("coin"); trackOnce("backup-manuale"); } else if (!A.uid) render(); }); return; }
  if (b.id === "acRestore") { askRestore(); return; }
  if (b.id === "acRestYes" && restorePending) { const r = restorePending; restorePending = null; applyCloud(r.st, r.at); toast(L().data.ok); SND.play("fanfare"); trackOnce("ripristino-online"); return; }
  if (b.id === "acManage") { acManage = !acManage; render(); setTimeout(() => { const c = document.getElementById("acctCard"); if (c && c.scrollIntoView) c.scrollIntoView({ block: "center" }); }, 30); return; }
  if (b.id === "acOut") { openOut(false); return; }
  if (b.id === "acOutYes") { signOutNow(false); return; }
  if (b.id === "acOutForce") { signOutNow(true); return; }
  if (b.id === "acDel") { openDel(); return; }
  if (b.id === "acDelYes") { deleteNow(null); return; }
  if (b.id === "acUseCloud" && cloudPending) { const c = cloudPending; cloudPending = null; applyCloud(c.st, c.at); toast(a.welcome(S.petName)); SND.play("fanfare"); trackOnce("ripristino-online"); return; }
  if (b.id === "acKeepLocal" && cloudPending) { cloudPending = null; layer.innerHTML = ""; setBusy(true); backupNow(true).then((ok) => { setBusy(false); render(); toast(ok ? a.saved(S.petName) : a.saveFail); }); return; }
}, true);
document.addEventListener("submit", (ev) => {
  if (ev.target && ev.target.id === "acForm") { ev.preventDefault(); if (!acBusy) submitEmail(); }
  if (ev.target && ev.target.id === "acPwForm") { ev.preventDefault(); const v = (document.getElementById("acPw2") || {}).value || ""; if (!v) { delErr(AC().err.empty); return; } if (!acBusy) deleteNow(v); }
}, true);
/* Lingua: anche le e-mail di Firebase (conferma, nuova password) arrivano nella lingua dell'app */
document.addEventListener("change", (ev) => { if (ev.target && /^langSel/.test(ev.target.id) && window.TanFB && window.TanFB.setLang) setTimeout(() => window.TanFB.setLang(fbLang()), 0); });
