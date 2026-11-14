/* =================== v18 (1.0.4): fluidita' a 60 fps e oltre =================== */
/* 1) Schermi a 90/120 Hz: le animazioni dei tocchi (spunte, finestre, schede) non hanno piu' il tetto dei 60
      immagini al secondo e seguono lo schermo. In modalita' leggera restano a 60 (prima erano 30).
   2) Modalita' leggera automatica piu' furba: prima si misurava una volta sola, all'avvio, quando la scena
      era ancora ferma (quasi nessun telefono risultava "lento"). Ora si misura con la scena viva, a brevi
      campioni nei primi minuti d'uso: se il telefono perde molte immagini, la modalita' leggera si accende
      da sola e resta accesa. Chi l'ha scelta a mano (acceso o spento) decide lui, sempre.
   3) Telefoni con pochissima memoria (2 GB o meno) o 2 processori: leggera da subito.
   4) Lo sfondo colorato dietro le pagine non "respira" piu' (muoveva un'immagine grande quanto lo schermo,
      60 volte al secondo, senza che si notasse): stessa resa, molto meno lavoro e meno batteria. */
const _applyLiteV18 = applyLite;
applyLite = function () { _applyLiteV18(); if (G && G.ticker) G.ticker.fps(isLite() ? 60 : 240); };
(function v18liteHW() {
  if (S.lite != null || S.liteAuto === true) return;
  const mem = navigator.deviceMemory, cores = navigator.hardwareConcurrency;
  if ((mem && mem <= 2) || (cores && cores <= 2)) { S.liteAuto = true; save(); }
})();
applyLite();
const PERF18 = { n: 0, bad: 0, last: 0, t0: 0, wins: 0, slow: 0, timer: 0, on: false };
function perf18Frame(t) {
  const p = PERF18; if (!p.on) return;
  if (document.hidden) { p.on = false; return; }
  if (p.last) { const d = t - p.last; if (d < 400) { p.n++; if (d > 34) p.bad++; } }
  p.last = t;
  if (t - p.t0 < 4000) { requestAnimationFrame(perf18Frame); return; }
  p.on = false; p.wins++;
  const ratio = p.n ? p.bad / p.n : 0;
  if (p.n >= 40 && (ratio > 0.15 || p.n < 4 * 30)) p.slow++;
  if (p.slow >= 2 && S.lite == null && S.liteAuto !== true) { S.liteAuto = true; save(); applyLite(); trackOnce("modalita-leggera-auto"); if (!layer.innerHTML && !game) render(); return; }
  if (p.wins < 6) perf18Next(25000);
}
function perf18Next(ms) {
  clearTimeout(PERF18.timer);
  PERF18.timer = setTimeout(() => {
    const p = PERF18;
    if (!anim || S.lite != null || S.liteAuto === true) return;
    /* si misura solo con la scena viva davanti (il momento piu' impegnativo) e app in primo piano */
    if (document.hidden || tab !== "today" || !document.getElementById("room") || game) { perf18Next(5000); return; }
    p.n = 0; p.bad = 0; p.last = 0; p.t0 = performance.now(); p.on = true; requestAnimationFrame(perf18Frame);
  }, ms);
}
if (S.pet) perf18Next(9000);
/* 5) In modalita' leggera la scena (solo il compagno che respira e sbatte le palpebre) va a 15 immagini al
      secondo: per movimenti cosi' lenti l'occhio non nota differenze, il telefono lavora molto meno. */
ambDrive = function (ts) {
  ambRaf = 0; if (!ambTL) return;
  if (document.visibilityState !== "visible" || !ambVisible) { ambLast = 0; return; }
  ambRaf = requestAnimationFrame(ambDrive);
  if (!ambLast) { ambLast = ts; return; }
  const fps = isLite() ? 15 : AMB_FPS;
  const dt = ts - ambLast; if (dt < 1000 / fps - 2) return;
  ambLast = ts;
  if (ts < ambQuietUntil) return;
  ambTL.totalTime(ambTL.totalTime() + Math.min(dt, 120) / 1000);
};
/* 6) Cambio scheda piu' veloce: ogni scheda gia' visitata resta pronta in memoria. Se tornandoci la pagina sarebbe
      identica (stessi dati), si rimette quella pronta invece di ricostruirla da zero: niente lettura di tutto l'HTML,
      il telefono fa molto meno lavoro e il passaggio resta fluido. Se qualcosa e' cambiato, si ricostruisce come sempre. */
const PAGE_CACHE = {};
let pageCur = null, pageHtml = "";
const _viewPutV18 = viewPut;
viewPut = function (html, same) {
  const view = !S.pet ? "onb" + S.onboard : tab;
  if (!same && pageCur && pageCur !== view && S.pet && app.firstChild) PAGE_CACHE[pageCur] = { html: pageHtml, nodes: [...app.childNodes] };
  const c = PAGE_CACHE[view];
  if (!same && c && c.html === html && S.pet && !viewFresh) {
    const h2 = html.replace(GRAIN_RX, ""); roomGrain = h2.length !== html.length;
    app.replaceChildren(...c.nodes);
    app.querySelectorAll(".venter").forEach((el) => el.classList.remove("venter"));
  } else _viewPutV18(html, same);
  pageCur = view; pageHtml = html;
};
/* uscendo dall'account, ricominciando o cambiando lingua le pagine pronte non valgono piu' */
const _applyRootV18p = applyRoot;
applyRoot = function () { const k = S.lang + "|" + S.theme + "|" + !!S.pet; if (applyRoot.k !== k) { applyRoot.k = k; Object.keys(PAGE_CACHE).forEach((x) => delete PAGE_CACHE[x]); } _applyRootV18p(); };
