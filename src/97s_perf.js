/* =================== v15: fluidita' su qualunque telefono =================== */
/* Il problema: la scena del compagno si ridisegnava 60 volte al secondo (respiro, nuvole, foglie, polvere)
   e sopra c'era un filtro "grana" calcolato ogni volta. Sui telefoni economici questo rubava il tempo
   a tutto il resto (scorrere, toccare, cambiare scheda).
   La soluzione:
   1) la grana diventa una piccola immagine fissa, disegnata una volta sola;
   2) le animazioni d'ambiente (respiro, nuvole, stelle...) vanno a 24 immagini al secondo: per movimenti
      lenti e morbidi l'occhio non vede differenze, ma il telefono lavora meno della meta';
   3) mentre tocchi, scorri o cambi scheda, l'ambiente si ferma un attimo: la priorita' e' sempre tua;
   4) app in secondo piano o scena fuori dallo schermo: l'ambiente si ferma del tutto. */
/* telefoni con poca memoria o pochi processori: ambiente ancora piu' leggero */
const AMB_FPS = (navigator.deviceMemory && navigator.deviceMemory <= 3) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ? 16 : 24;
let ambTL = null, ambLast = 0, ambRaf = 0, ambQuietUntil = 0, ambVisible = true, ambObs = null;

function ambDrive(ts) {
  ambRaf = 0; if (!ambTL) return;
  if (document.visibilityState !== "visible" || !ambVisible) { ambLast = 0; return; }
  ambRaf = requestAnimationFrame(ambDrive);
  if (!ambLast) { ambLast = ts; return; }
  const dt = ts - ambLast; if (dt < 1000 / AMB_FPS - 2) return;
  ambLast = ts;
  if (ts < ambQuietUntil) return; /* mentre l'utente interagisce, l'ambiente aspetta (il tempo non avanza: niente salti) */
  ambTL.totalTime(ambTL.totalTime() + Math.min(dt, 120) / 1000);
}
function ambStart() { if (!ambRaf && ambTL) { ambLast = 0; ambRaf = requestAnimationFrame(ambDrive); } }
function ambQuiet(ms) { ambQuietUntil = Math.max(ambQuietUntil, performance.now() + ms); }

/* Dopo ogni disegno della scena: grana come immagine e animazioni d'ambiente sul "motore lento" */
function roomTune() {
  const room = document.getElementById("room"); if (!room) return;
  let had = roomGrain;
  room.querySelectorAll(":scope > svg > rect[filter]").forEach((r) => { if (/url\(#gr/.test(r.getAttribute("filter") || "")) { r.remove(); had = true; } });
  const cur = room.querySelector(":scope > .rgrain");
  if (had && !cur) { const g = document.createElement("div"); g.className = "rgrain"; g.setAttribute("aria-hidden", "true"); g.setAttribute("data-keep", "1"); const sv = room.querySelector(":scope > svg"); if (sv) sv.after(g); }
  else if (!had && cur) cur.remove();
  if (ambObs) ambObs.disconnect();
  if ("IntersectionObserver" in window) { ambObs = new IntersectionObserver((es) => { ambVisible = es.some((e) => e.isIntersecting); if (ambVisible) ambStart(); }); ambObs.observe(room); }
}
function ambAdopt() {
  if (!anim || !ambient.length) return;
  if (ambTL) ambTL.kill();
  ambTL = G.timeline({ paused: true });
  ambient.forEach((a) => { if (a && a.kill && !(a.data === "keep")) { try { ambTL.add(a, 0); } catch (e) { /* niente */ } } });
  ambStart();
}
const _startAmbientV15 = startAmbient;
/* La priorita' e' di chi tocca: durante tocchi, scorrimenti e cambi di scheda l'ambiente si mette in pausa */
document.addEventListener("pointerdown", () => ambQuiet(450), { passive: true, capture: true });
document.addEventListener("scroll", () => ambQuiet(250), { passive: true, capture: true });
document.addEventListener("touchmove", () => ambQuiet(250), { passive: true, capture: true });
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") ambStart(); });

/* Entrata della pagina al cambio scheda: anima solo cio' che si vede (massimo 12 elementi).
   Gli altri sono gia' al loro posto: niente lavoro sprecato per cose fuori dallo schermo. */
function viewEnterItems(items) {
  /* i primi elementi della pagina (quelli in alto, che si vedono): niente misure, niente attese */
  const out = []; for (const el of items) { if (out.length >= 12) break; if (!el.closest(".room")) out.push(el); }
  return out;
}
/* Entrata morbida fatta dal browser stesso (scorre fluida anche se il telefono e' occupato) */
function viewEnter(items, dx) {
  items.forEach((el, i) => {
    el.style.setProperty("--vi", i); el.style.setProperty("--vdx", dx * 0.6 + "px"); el.style.setProperty("--vdy", (dx ? 4 : 12) + "px");
    el.classList.remove("venter"); el.classList.add("venter");
    el.addEventListener("animationend", function done(ev) { if (ev.target !== el) return; el.classList.remove("venter"); el.style.removeProperty("--vi"); el.style.removeProperty("--vdx"); el.style.removeProperty("--vdy"); el.removeEventListener("animationend", done); });
  });
}

/* Le animazioni d'ambiente partono un attimo dopo, a pagina gia' comparsa: il cambio scheda e' istantaneo */
let ambTimer = 0;
startAmbient = function () {
  clearTimeout(ambTimer); if (ambTL) { ambTL.kill(); ambTL = null; }
  roomTune();
  if (!anim) return;
  const room = document.getElementById("room"); if (!room) return;
  ambTimer = setTimeout(() => {
    const go = () => { ambTimer = 0; if (document.getElementById("room") !== room) return; _startAmbientV15(); ambAdopt(); };
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 400 }); else go();
  }, 380);
};

/* Barra delle schede: non si ricostruisce a ogni tocco, si aggiornano solo la scheda attiva e i pallini */
let tabsSig = "";
const _renderTabsV15 = renderTabs;
renderTabs = function () {
  const nav = document.getElementById("tabsIn"); const t = L();
  const sig = S.lang + "|" + !!S.pet + "|" + ["today", "trips", "home", "diary", "more"].map((k) => t.tabs[k]).join(",");
  const btns = nav ? nav.querySelectorAll("button.tab") : [];
  if (!nav || sig !== tabsSig || btns.length !== 5) { tabsSig = sig; return _renderTabsV15(); }
  document.getElementById("tabs").hidden = !S.pet;
  const si = S.pet ? seasonState() : null;
  const dots = { trips: S.energy >= 100 && !S.away && !story, today: (S.giftDay !== S.day && !!S.pet) || (!!si && S.season.n >= EVENT_GOAL && !S.season.claimed) };
  btns.forEach((b) => {
    const k = b.dataset.tab; const on = tab === k;
    if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    const want = dots[k] && !on; const d = b.querySelector("i.dot");
    if (want && !d) { const i = document.createElement("i"); i.className = "dot"; i.setAttribute("aria-hidden", "true"); b.appendChild(i); } else if (!want && d) d.remove();
  });
  requestAnimationFrame(() => moveTabPill(false));
};
/* L'indicatore della scheda scivola solo in orizzontale (movimento leggero), la larghezza si imposta subito */
moveTabPill = function (instant) {
  const nav = document.getElementById("tabsIn"); if (!nav) return;
  let pill = nav.querySelector(".tabpill"); const cur = nav.querySelector('.tab[aria-current="page"] .ic'); if (!cur) return;
  if (!pill) { pill = document.createElement("span"); pill.className = "tabpill"; nav.prepend(pill); }
  /* 1.0.9: posizione e misure dal layout (offsetLeft/Top/Width/Height), che ignorano le trasformazioni: prima si
     misurava con getBoundingClientRect mentre l'icona rimbalzava (scala 1.12, -5 px), e la pillola restava piu' larga
     e piu' in alto di 2-7 px */
  let x = 0, y = 0, el = cur; while (el && el !== nav) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
  if (el !== nav) { const nr = nav.getBoundingClientRect(), cr = cur.getBoundingClientRect(); x = cr.left - nr.left; y = cr.top - nr.top; }
  pill.style.width = cur.offsetWidth + "px"; pill.style.height = cur.offsetHeight + "px";
  if (anim && !instant && pill.dataset.x && G) G.fromTo(pill, { x: +pill.dataset.x, y }, { x, y, duration: 0.38, ease: "power3.out", force3D: true, overwrite: true });
  else if (G) G.set(pill, { x, y }); else pill.style.transform = `translate(${x}px, ${y}px)`;
  pill.dataset.x = x;
};

/* Ridisegno mirato: sulla stessa pagina si cambia solo cio' che e' davvero cambiato (niente pagina rifatta da zero).
   Cambiando scheda, invece, la pagina nuova si costruisce intera (con la sua animazione d'entrata). */
const viewTpl = document.createElement("template");
const GRAIN_RX = /<rect [^>]*filter="url\(#gra?\d+\)"\s*\/>/g;
let roomGrain = false;
function viewPut(html, same) {
  const h2 = html.replace(GRAIN_RX, ""); roomGrain = h2.length !== html.length; html = h2;
  if (!same || !app.firstChild || !viewMorphOn || viewFresh) { viewFresh = false; app.innerHTML = html; return; }
  viewTpl.innerHTML = html;
  morphKids(app, viewTpl.content);
}
let viewMorphOn = true, viewFresh = false;
/* Entrare/uscire dallo schermo intero cambia tutta la pagina: si ricostruisce da zero (piu' veloce del confronto) */
openFull = function () {
  if (S.away) return;
  full = true; petDX = 0; petFlip = false; playMode = null; document.body.classList.add("isfull");
  try { const el = document.documentElement; if (el.requestFullscreen && !document.fullscreenElement && window.top === window.self) el.requestFullscreen().catch(() => {}); } catch (e) { /* niente */ }
  SND.play("sparkle"); viewFresh = true; render(); window.scrollTo(0, 0); trackOnce("schermo-intero");
  /* entrata fatta dal browser (niente misure forzate della pagina) */
  const w = document.getElementById("fullwrap"); if (anim && w) { w.classList.add("fullin"); w.addEventListener("animationend", () => w.classList.remove("fullin"), { once: true }); }
};
const _closeFullV15 = closeFull; closeFull = function (x) { viewFresh = true; return _closeFullV15(x); };
function morphKids(a, b) {
  let x = a.firstChild, y = b.firstChild;
  while (y) {
    const ny = y.nextSibling;
    if (x && x.nodeType === 1 && x.hasAttribute("data-keep") && !(y.nodeType === 1 && y.hasAttribute("data-keep"))) { x = x.nextSibling; continue; }
    if (!x) { a.appendChild(y); y = ny; continue; }
    const nx = x.nextSibling;
    if (sameKind(x, y)) morphNode(x, y); else a.replaceChild(y, x);
    x = nx; y = ny;
  }
  while (x) { const nx = x.nextSibling; if (!(x.nodeType === 1 && x.hasAttribute("data-keep"))) a.removeChild(x); x = nx; }
}
function sameKind(x, y) {
  if (x.nodeType !== y.nodeType) return false;
  if (x.nodeType !== 1) return true;
  return x.nodeName === y.nodeName && (x.id || "") === (y.id || "") && (x.nodeName !== "INPUT" || x.type === y.type);
}
function morphNode(x, y) {
  if (x.nodeType !== 1) { if (x.nodeValue !== y.nodeValue) x.nodeValue = y.nodeValue; return; }
  if (x.isEqualNode(y)) return;
  const ya = y.attributes;
  for (let i = x.attributes.length - 1; i >= 0; i--) { const n = x.attributes[i].name; if (!y.hasAttribute(n)) x.removeAttribute(n); }
  for (let i = 0; i < ya.length; i++) { const at = ya[i]; if (x.getAttribute(at.name) !== at.value) x.setAttribute(at.name, at.value); }
  const tag = x.nodeName;
  if (tag === "TEXTAREA") { if (document.activeElement !== x && x.value !== y.value) x.value = y.value; return; }
  morphKids(x, y);
  if (tag === "INPUT" && document.activeElement !== x) {
    if (x.type === "checkbox" || x.type === "radio") x.checked = y.hasAttribute("checked");
    else if (x.value !== (y.getAttribute("value") || "")) x.value = y.getAttribute("value") || "";
  }
  if (tag === "SELECT" && document.activeElement !== x) { const o = x.querySelector("option[selected]"); if (o) x.value = o.value; }
}

/* Effetti (cuori, stelline, note): disegnati come piccole figure invece che come caratteri speciali.
   I caratteri come ♥ ✦ ♪ costringevano il telefono a cercare ogni volta il font giusto (fino a 20-30 ms a effetto). */
const FX_G = {
  "♥": '<path d="M12 21s-7.4-4.5-9.5-9.1C1 8.4 3.1 4.6 6.9 4.6c2.2 0 3.6 1.2 5.1 3 1.5-1.8 2.9-3 5.1-3 3.8 0 5.9 3.8 4.4 7.3C19.4 16.5 12 21 12 21z"/>',
  "✦": '<path d="M12 1.5c.9 6.6 3 8.9 10.5 10.5-7.5 1.6-9.6 3.9-10.5 10.5-.9-6.6-3-8.9-10.5-10.5C9 10.4 11.1 8.1 12 1.5z"/>',
  "★": '<path d="M12 2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 16.8 6.1 20.1l1.3-6.6L2.5 8.9l6.6-.8z"/>',
  "●": '<circle cx="12" cy="12" r="7"/>',
  "♪": '<path d="M14.5 2.5c.3 2.6 2.4 3.9 4.5 5.3l-1 1.7c-1.3-.8-2.4-1.5-3.1-2.4v9.4a3.6 3.6 0 1 1-2-3.2V2.5h1.6z"/>',
  "♫": '<path d="M8.5 5.2 20 2.6v12.9a3.3 3.3 0 1 1-2-3V7.1l-7.5 1.7v8.9a3.3 3.3 0 1 1-2-3V5.2z"/>',
  "♩": '<path d="M15 2.5v13.3a3.6 3.6 0 1 1-2-3.2V2.5h2z"/>',
};
function fxGlyph(ch) { const p = FX_G[ch]; return p ? `<svg class="fxg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${p}</svg>` : esc(ch); }
const _fxAtV15 = fxAt;
fxAt = function (el, html, cls, life, dy) { return _fxAtV15(el, FX_G[html] ? fxGlyph(html) : html, cls, life, dy); };
let tabPending = 0;
