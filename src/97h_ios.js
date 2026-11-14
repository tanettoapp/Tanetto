/* =================== v13c: iPhone — il cucciolo sempre al sicuro =================== */
/* Su iPhone Safari puo' cancellare i dati dei siti non aperti per qualche giorno, e l'app sulla schermata Home
   ha uno spazio dati separato da Safari: quindi si invita a installare prima, e chi ha gia' un cucciolo lo trasferisce
   con un codice (copia in Safari, incolla nell'app installata). Il link pubblico resta sempre lo stesso. */
const IOS_DEMO = /[?&]iosdemo=1/.test(location.search);
const isIOSDevice = () => isIOS() || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || IOS_DEMO;
const iosSafari = () => isIOSDevice() && !isStandalone() && (/github\.io$/.test(location.hostname) || IOS_DEMO);
const iosApp = () => isIOSDevice() && isStandalone();

/* Chiede al browser di non cancellare i dati (Chrome/Android e Safari recenti) */
(async () => { try { if (navigator.storage && navigator.storage.persist && !(await navigator.storage.persisted())) await navigator.storage.persist(); } catch (e) { /* niente */ } })();
setTimeout(() => { try { if (isStandalone()) trackOnce("app-installata-aperta"); if (iosSafari()) trackOnce("iphone-safari"); } catch (e) { /* niente */ } }, 1500);

/* --- Codice di trasferimento: stato compresso in testo --- */
const b64u = (u8) => { let s = ""; for (let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768)); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const unb64u = (s) => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; const b = atob(s); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
async function packState() {
  const json = JSON.stringify({ app: "tanetto", v: 1, state: S });
  try { if (typeof CompressionStream === "function") { const buf = await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer(); return "TANETTO1:" + b64u(new Uint8Array(buf)); } } catch (e) { /* senza compressione */ }
  return "TANETTO0:" + b64u(new TextEncoder().encode(json));
}
async function unpackState(code) {
  try {
    const m = String(code || "").replace(/\s+/g, "").match(/TANETTO([01]):([A-Za-z0-9_-]+)/); if (!m) return null;
    const bytes = unb64u(m[2]); let json;
    if (m[1] === "1") json = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
    else json = new TextDecoder().decode(bytes);
    const o = JSON.parse(json); return o && o.app === "tanetto" && o.state && typeof o.state === "object" && o.state.pet ? o.state : null;
  } catch (e) { return null; }
}
let packed = null, packedAt = 0;
function prepack() { if (!S.pet) return; packState().then((c) => { packed = c; packedAt = Date.now(); }).catch(() => {}); }

/* --- Disegno dell'icona Condividi di Safari --- */
const SHARE_ICO = `<svg class="iosico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10H6.5A1.5 1.5 0 0 0 5 11.5v8A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 17.5 10H16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const shareWord = () => { const i = L().v13.ios; return `<b class="iossh">${SHARE_ICO}${esc(i.share)}</b>`; };
const addWord = () => esc(L().v13.ios.add);

/* --- Riquadro "Metti al sicuro" (Oggi e Altro) --- */
function iosSafeCard(where) {
  const i = L().v13.ios, n = S.petName || "";
  return `<div class="card iossafe stack-s" data-where="${where}"><div class="iosrow"><span class="iospet">${petSVG(S.pet, "felice", S.hat, stage(), n)}</span><div><h3>${esc(i.T(n))}</h3><p class="small muted">${esc(i.P(n))}</p></div></div>
  <ol class="iossteps"><li>${esc(i.s1(n))}</li><li>${i.s2(shareWord(), addWord())}</li><li>${esc(i.s3(n))}</li></ol>
  <div class="row"><button class="btn" id="iosCopy">${esc(i.copy(n))}</button>${where === "today" ? `<span class="spacer"></span><button class="link" id="iosLater">${esc(i.later)}</button>` : ""}</div></div>`;
}
function showIosToday() {
  if (!iosSafari() || !S.pet || S.away || S.tut < 99) return false;
  if (!(S.log || []).length) return false; /* dopo il primo obiettivo, non durante la prima scoperta */
  return !(S.iosLater && S.iosLater > dkey());
}
const _viewTodayIos = viewToday;
viewToday = function () {
  let h = _viewTodayIos(); if (!showIosToday()) return h;
  const key = `<div class="row"><button class="link" data-tab="more" data-focus="goals">`; const i = h.indexOf(key);
  setTimeout(prepack, 0);
  return i >= 0 ? h.slice(0, i) + iosSafeCard("today") + h.slice(i) : h + iosSafeCard("today");
};
/* In Altro: per iPhone in Safari il riquadro completo al posto del semplice "Installa" */
const _installCardIos = installCard;
installCard = function () { if (iosSafari() && S.pet) { setTimeout(prepack, 0); return iosSafeCard("more"); } return _installCardIos(); };

/* --- Presentazione: su iPhone in Safari si invita a installare prima; nell'app installata si offre il trasferimento --- */
const _viewOnboardIos = viewOnboard;
viewOnboard = function () {
  let h = _viewOnboardIos(); if (S.onboard !== 0) return h;
  const i = L().v13.ios; let top = "";
  if (iosSafari()) top = `<div class="card iosonb stack-s"><h3>${esc(i.onbT)}</h3><p class="small muted">${esc(i.onbP)}</p><ol class="iossteps"><li>${i.s2(shareWord(), addWord())}</li><li>${esc(i.onb3)}</li></ol></div>`;
  else if (iosApp()) top = `<div class="card iosonb stack-s"><h3>${esc(i.appT)}</h3><p class="small muted">${esc(i.appP)}</p><button class="btn" id="iosHave">${esc(i.have)}</button></div>`;
  const k = h.indexOf("<h1>"); if (top && k >= 0) h = h.slice(0, k) + top + h.slice(k);
  const note = `<p class="note">`; const j = h.lastIndexOf(note);
  const link = iosApp() ? "" : `<div class="row" style="justify-content:center"><button class="link" id="iosHave">${esc(i.have)}</button></div>`;
  return j >= 0 ? h.slice(0, j) + link + h.slice(j) : h + link;
};

/* --- Finestra per incollare il codice (o aprire un file di copia) --- */
function openIosPaste() {
  const i = L().v13.ios; const a = L().acct, v = L().v21;
  /* 1.0.9: senza la schermata di accesso iniziale, chi torna con un account lo ritrova qui (accesso = ripristino dal backup online) */
  const acc = S.pet ? "" : `<p class="small muted">${esc(v.haveAcct)}</p><div class="imgbtns col"><button class="btn gbtn" id="acGoogle" type="button">${G_LOGO}<span>${esc(a.google)}</span></button><button class="btn ghost" id="acEmail" type="button">${icon("ac_mail")}<span>${esc(a.email)}</span></button></div><p class="acerr" id="gateErr" role="alert"></p><div class="orline"><span>${esc(v.haveOr)}</span></div>`;
  if (!S.pet) setTimeout(() => fbLoad().catch(() => {}), 0);
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="ipT"><div class="box card stack-s iospaste"><h2 id="ipT">${esc(i.pasteT)}</h2>${acc}<p class="small muted">${esc(i.pasteP)}</p>
  <textarea id="iosCode" rows="4" placeholder="${esc(i.ph)}" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>
  <div class="row"><button class="btn ghost" id="iosPaste">${esc(i.paste)}</button><span class="spacer"></span><button class="btn" id="iosGo">${esc(i.go)}</button></div>
  <button class="link" id="iosFile">${esc(i.file)}</button><input type="file" id="bkFile" accept="application/json,.json" hidden>
  <button class="link" id="closeLayer">${esc(i.close)}</button></div></div>`;
}
/* Finestra di riserva se la copia automatica non e' permessa: il codice e' selezionato, basta copiarlo */
function openIosManual(code) {
  const i = L().v13.ios;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="imT"><div class="box card stack-s iospaste"><h2 id="imT">${esc(i.copy(S.petName || ""))}</h2><p class="small muted">${esc(i.manual)}</p>
  <textarea id="iosOut" rows="5" readonly>${esc(code)}</textarea><button class="btn" id="closeLayer">${esc(i.close)}</button></div></div>`;
  setTimeout(() => { const t = document.getElementById("iosOut"); if (t) { t.focus(); t.select(); try { t.setSelectionRange(0, t.value.length); } catch (e) { /* niente */ } } }, 60);
}
function restoreFrom(state) {
  const t = L();
  if (S.pet) { pendingRestore = state; layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="rsT"><div class="box card"><h2 id="rsT">${t.data.restore}</h2><p>${esc(t.data.ask)}</p><div class="row" style="justify-content:center"><button class="btn ghost" id="rsNo">${t.data.no}</button><button class="btn" id="rsYes">${t.data.yes}</button></div></div></div>`; return; }
  S = Object.assign(fresh(), state); save(); layer.innerHTML = ""; applyRoot(); render(); toast(t.data.ok); SND.play("fanfare"); trackOnce("trasferimento-riuscito");
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return; const i = L().v13.ios;
  if (b.id === "iosCopy") {
    ev.preventDefault(); trackOnce("trasferimento-copiato");
    const done = () => { toast(i.copied(S.petName || "")); SND.play("coin"); };
    const ready = packed && Date.now() - packedAt < 60000;
    try {
      if (ready && navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(packed).then(done).catch(() => openIosManual(packed)); return; }
      if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem === "function") {
        const p = packState().then((c) => { packed = c; packedAt = Date.now(); return new Blob([c], { type: "text/plain" }); });
        navigator.clipboard.write([new ClipboardItem({ "text/plain": p })]).then(done).catch(() => p.then(() => openIosManual(packed)));
        return;
      }
    } catch (e) { /* riserva sotto */ }
    packState().then((c) => { packed = c; packedAt = Date.now(); openIosManual(c); });
    return;
  }
  if (b.id === "iosLater") { const d = new Date(); d.setDate(d.getDate() + 3); S.iosLater = dkey(d); save(); render(); return; }
  if (b.id === "iosHave") { openIosPaste(); return; }
  if (b.id === "iosPaste") {
    try { if (navigator.clipboard && navigator.clipboard.readText) navigator.clipboard.readText().then((x) => { const t = document.getElementById("iosCode"); if (t) t.value = x || ""; }).catch(() => { const t = document.getElementById("iosCode"); if (t) t.focus(); }); else { const t = document.getElementById("iosCode"); if (t) t.focus(); } } catch (e) { /* niente */ }
    return;
  }
  if (b.id === "iosGo") {
    const t = document.getElementById("iosCode"); const v = t ? t.value : "";
    unpackState(v).then((st) => { if (!st) { toast(i.bad); SND.play("miss"); return; } restoreFrom(st); });
    return;
  }
  if (b.id === "iosFile") { const f = document.getElementById("bkFile"); if (f) { f.value = ""; f.click(); } return; }
}, true);
