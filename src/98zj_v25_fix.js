/* =================== 1.0.9: ultime correzioni prima di Google Play (verifiche finali A e B, 13/11/2026) =================== */

/* ---------- 1) Profilo: ordine dei titoli (axe heading-order) ----------
   Nelle 7 pagine del Profilo il titolo della pagina e' h1 e i titoli delle schede sotto erano h3 (si saltava h2).
   Ora sono h2 con la classe h3like: stesso aspetto (11zf_v25_fix.css), ordine giusto per i lettori di schermo. */
function v25Heads(root) {
  root.querySelectorAll("h3").forEach((h) => {
    const n = document.createElement("h2");
    for (const a of [...h.attributes]) n.setAttribute(a.name, a.value);
    n.classList.add("h3like"); n.append(...h.childNodes); h.replaceWith(n);
  });
}
const _viewMoreV25 = viewMore;
viewMore = function () {
  const h = _viewMoreV25(); if (!S.pet || h.indexOf("psplit") < 0) return h;
  try {
    const tpl = document.createElement("template"); tpl.innerHTML = h;
    const st = tpl.content.querySelector(".stack.psplit"); if (!st || !st.querySelector("h3")) return h;
    v25Heads(st); return tpl.innerHTML;
  } catch (e) { return h; }
};

/* ---------- 2) negozio dei Tanì e Plus: a bambini, ragazzi e a chi non ha detto l'eta' nessuna spinta in evidenza ----------
   Prima l'etichetta "Conviene di piu'" spariva, ma il pacchetto piu' caro restava dorato (.best); in Plus restava il nastro
   "Risparmi il X%". Ora niente oro e niente nastro; il risparmio resta scritto, come semplice informazione, sotto il prezzo. */
const v25Minor = () => typeof ageBand === "function" && ageBand() !== "adult";
function v25NoNudge() {
  if (!v25Minor()) return;
  document.querySelectorAll(".tshop .pack.best").forEach((x) => x.classList.remove("best"));
  document.querySelectorAll(".tshop .pack .pbadge").forEach((x) => x.remove());
  document.querySelectorAll(".plusbox .plans .ppop").forEach((pop) => {
    const txt = (pop.textContent || "").trim(); const sm = pop.parentElement && pop.parentElement.querySelector("small");
    /* il nastro con il numero e' il risparmio (97zj l'aveva tolto dalla riga sotto il prezzo): torna li', senza risalto */
    if (sm && /\d/.test(txt) && !sm.textContent.includes(txt)) { const sp = document.createElement("span"); sp.className = "psave"; sp.textContent = txt; sm.append(sp); }
    pop.remove();
  });
}
const _openTaniShopV25 = openTaniShop;
openTaniShop = function (...a) { const r = _openTaniShopV25.apply(this, a); try { v25NoNudge(); } catch (e) { /* niente */ } return r; };
const _packDecorateV25 = packDecorate;
packDecorate = function (...a) { const r = _packDecorateV25.apply(this, a); try { v25NoNudge(); } catch (e) { /* niente */ } return r; };
const _openPlusV25 = openPlus;
openPlus = function (...a) { const r = _openPlusV25.apply(this, a); try { v25NoNudge(); } catch (e) { /* niente */ } return r; };
const _plusFootV25 = plusFoot;
plusFoot = function (...a) { const r = _plusFootV25.apply(this, a); try { v25NoNudge(); } catch (e) { /* niente */ } return r; };

/* ---------- 3) "Bentornato" solo se si sono davvero saltati giorni con obiettivi ----------
   Prima bastavano 2 giorni di calendario senza aprire l'app: chi ha obiettivi solo dal lunedi' al venerdi' riceveva ogni
   lunedi' "non preoccuparti dei giorni che hai perso" (e +10 Tanì), subito prima del trofeo della serie. Ora la finestra si
   apre solo se, tra l'ultima visita e oggi, c'e' almeno un giorno con obiettivi previsti che non era libero o di riposo.
   I salvataggi della 1.0.8 non cambiano: si leggono solo S.goals e S.days. */
const V25_LAST = (() => { try { if (typeof BACK_GAP !== "number" || BACK_GAP < 1) return null; const d = new Date(); d.setDate(d.getDate() - BACK_GAP); return dkey(d); } catch (e) { return null; } })();
function v25MissedGoalDays() {
  if (!V25_LAST || !S.pet || !Array.isArray(S.goals)) return 0;
  const t = dkey(); const d = ldate(V25_LAST); let n = 0;
  for (let i = 0; i < 400; i++) {
    d.setDate(d.getDate() + 1); const k = dkey(d); if (k >= t) break;
    const r = (S.days || {})[k]; if (r && (r.free || r.rest)) continue;
    const wd = wdIdx(d); if (S.goals.some((g) => !g || !Array.isArray(g.days) || g.days.includes(wd))) n++;
  }
  return n;
}
const _openWelcomeBackV25 = openWelcomeBack;
openWelcomeBack = function (...a) { try { if (!v25MissedGoalDays()) return; } catch (e) { /* in dubbio si apre come prima */ } return _openWelcomeBackV25.apply(this, a); };

/* ---------- 4) il papillon in regalo mai il primo giorno ----------
   98zi controllava solo "regalo di benvenuto ricevuto oggi": in una finestra di tempo prima dei "Due regali" il controllo
   passava e il papillon restava in coda, poi si apriva subito dopo. Ora vale anche il primo giorno dell'app (S.firstDay) e
   si ricontrolla quando la finestra in coda sta per aprirsi: se e' ancora il primo giorno non si apre (arriva domani). */
const v25FirstDay = () => { const t = dkey(); return (!!S.firstDay && S.firstDay === t) || (!!S.welcomeGift && S.welcomeGift === t); };
if (typeof w20GiftReady === "function") { const _w20GiftReadyV25 = w20GiftReady; w20GiftReady = function () { if (v25FirstDay()) return false; return _w20GiftReadyV25(); }; }
const _nq20doV25 = nq20do;
nq20do = function (it) { if (it && it.key === "wear" && v25FirstDay()) return; return _nq20doV25(it); };

/* ---------- 5) Stagione delle Lanterne: nella testata grande si vede tutta la faccia di Germo ----------
   (prima il taglio centrale finiva sulla bocca); l'immagine scende un po' nella cornice, solo per le Lanterne */
const _ban3dV25 = ban3d;
ban3d = function (name, big) { const h = _ban3dV25(name, big); return name === "lanterns" && big ? h.replace(/(<image [^>]*?) y="-20"/, '$1 y="-36"') : h; };

/* ---------- 6) stanza a schermo intero: fila delle scene ----------
   La fila finisce prima dei pulsanti "sposta" e "riduci" (11zf), sfuma solo dal lato dove ci sono altre scene e, quando si
   apre, parte dall'inizio: si scorre (il minimo) solo se la scena scelta altrimenti non si vedrebbe per intero. */
const SCN_FADE = 28, SCN_FADE_MIN = 2;
function v25ScnEdges(sc) {
  const max = sc.scrollWidth - sc.clientWidth;
  sc.classList.toggle("scl", sc.scrollLeft > 1); sc.classList.toggle("scr", sc.scrollLeft < max - 1);
}
/* misure di layout: non cambiano con le animazioni (transform) ne' con lo scorrimento, quindi il calcolo e' giusto anche
   mentre la stanza si apre a schermo intero.
   1.0.10: con i decimali. offsetLeft/offsetWidth/clientWidth sono arrotondati al pixel: la scena scelta poteva finire
   0,6-1,4 px dentro la sfumatura. Ora: larghezza della fila da getComputedStyle (decimali, senza transform) e posizione della
   scena da getBoundingClientRect divisa per la scala dell'animazione (k = 1 a riposo); lo scorrimento si arrotonda per
   eccesso al pixel del telefono, cosi' la scena finisce sempre prima della sfumatura, mai dentro. */
function v25ScnBox(sc, c) {
  const cs = getComputedStyle(sc), num = (v) => parseFloat(v) || 0;
  const bl = num(cs.borderLeftWidth), br = num(cs.borderRightWidth);
  let bw = num(cs.width); if (cs.boxSizing !== "border-box") bw += num(cs.paddingLeft) + num(cs.paddingRight) + bl + br;
  const sr = sc.getBoundingClientRect(), cr = c.getBoundingClientRect();
  if (!(bw > 0) || !(sr.width > 0)) return { right: c.offsetLeft + c.offsetWidth, room: sc.clientWidth };
  const k = sr.width / bw;
  /* barra di scorrimento nascosta (.scns): l'area utile e' il riquadro senza i bordi. bar mette insieme due valori arrotondati:
     al massimo sbaglia di 1 px per eccesso, cioe' la scena finisce un po' prima della sfumatura, mai dentro */
  const bar = Math.max(0, sc.offsetWidth - sc.clientWidth - Math.round(bl + br));
  return { right: (cr.right - sr.left) / k - bl + sc.scrollLeft, room: bw - bl - br - bar };
}
function v25ScnFit(sc) {
  if (!sc || !sc.isConnected || sc.dataset.user) return;
  sc.style.removeProperty("--scnfade");
  const c = sc.querySelector('.scn[aria-pressed="true"]'); let x = 0;
  if (c && sc.clientWidth > 0) {
    const { right, room } = v25ScnBox(sc, c), dpr = window.devicePixelRatio || 1, next = !!c.nextElementSibling;
    /* 1.0.10: si scorre anche se la scena ci sta ma lascia meno di 2 px (la sfumatura piu' corta): prima finiva dentro */
    if (right > room - (next ? SCN_FADE_MIN : 0) + 0.01) x = Math.max(0, Math.ceil((right - (room - (next ? SCN_FADE : 0))) * dpr - 0.001) / dpr);
    else if (right > room - SCN_FADE) sc.style.setProperty("--scnfade", Math.max(SCN_FADE_MIN, Math.floor((room - right) * dpr + 0.001) / dpr) + "px");
  }
  sc.scrollLeft = x;
  /* alcuni WebView tengono lo scorrimento solo a pixel interi (81,33 -> 81): allora per eccesso, mai dentro la sfumatura */
  if (sc.scrollLeft < x - 0.01) sc.scrollLeft = Math.ceil(x);
  sc.dataset.prog = String(sc.scrollLeft); v25ScnEdges(sc);
}
function v25ScnView() {
  const sc = document.querySelector("#fullwrap .scns"); if (!sc || sc.dataset.v25) return; sc.dataset.v25 = "1";
  v25ScnFit(sc);
  /* di nuovo quando il layout si e' assestato: fine dell'apertura a schermo intero, caratteri pronti */
  requestAnimationFrame(() => requestAnimationFrame(() => v25ScnFit(sc)));
  setTimeout(() => v25ScnFit(sc), 700);
  try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => v25ScnFit(sc)); } catch (e) { /* niente */ }
  /* 1.0.10: solo alla fine dell'apertura di #fullwrap stesso, non per ogni transizione o animazione delle cose dentro
     (pulsanti, scene, compagno); un solo ascoltatore per #fullwrap, che rifa' la fila di quel momento */
  const fw = document.getElementById("fullwrap");
  if (fw && !fw.__v25scn) {
    fw.__v25scn = true;
    const refit = (ev) => { if (ev.target !== fw) return; v25ScnFit(fw.querySelector(".scns")); };
    ["transitionend", "animationend"].forEach((n) => fw.addEventListener(n, refit));
  }
}
/* scorsa a mano: da li' in poi si lascia com'e' (si aggiornano solo le sfumature) */
document.addEventListener("scroll", (ev) => {
  const sc = ev.target; if (!sc || !sc.classList || !sc.classList.contains("scns")) return;
  if (Math.abs(sc.scrollLeft - (+sc.dataset.prog || 0)) > 1) { sc.dataset.user = "1"; sc.style.removeProperty("--scnfade"); }
  v25ScnEdges(sc);
}, true);
window.addEventListener("resize", () => { const sc = document.querySelector("#fullwrap .scns"); if (sc) { if (sc.dataset.user) v25ScnEdges(sc); else v25ScnFit(sc); } });
const _renderV25 = render;
render = function (...a) { const r = _renderV25.apply(this, a); try { v25ScnView(); } catch (e) { /* niente */ } return r; };
