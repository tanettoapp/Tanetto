/* =================== v13: rifiniture prima del test (revisione indipendente) =================== */
const isFirstDay = () => !!S.firstDay && dkey() === S.firstDay;
const dayIndex = () => (S.firstDay ? Math.round((new Date(dkey()) - new Date(S.firstDay)) / 86400000) : 0);

/* 1) Guida iniziale piu' corta: compagno, obiettivi, menu (il regalo si spiega da solo) */
TUT_TARGETS.splice(1, 2); Object.keys(T).forEach((l) => { if (T[l].tut && T[l].tut.length === 5) T[l].tut.splice(1, 2); });
/* La guida si riposiziona se la pagina si sposta mentre appare */
const _showTutStepV13 = showTutStep;
showTutStep = function () {
  _showTutStepV13();
  setTimeout(() => {
    if (!tutOn) return; const el = document.querySelector(TUT_TARGETS[S.tut]); const ring = document.querySelector(".tutring"); if (!el || !ring) return;
    const r = el.getBoundingClientRect(); const q = ring.getBoundingClientRect();
    if (Math.abs(r.top - 8 - q.top) > 6 || Math.abs(r.left - 8 - q.left) > 6) _showTutStepV13();
  }, anim ? 1100 : 120);
};

/* 2) Il compagno si vede sempre quando festeggia */
function roomVisible() { const r = document.getElementById("room"); if (!r) return false; const b = r.getBoundingClientRect(); return b.bottom > 120 && b.top < innerHeight - 160; }
let peekT = null;
function petPeek(text, e = "felice") {
  if (!S.pet) return; document.querySelectorAll(".petpeek").forEach((x) => x.remove()); clearTimeout(peekT);
  const d = document.createElement("div"); d.className = "petpeek"; d.setAttribute("role", "status");
  d.innerHTML = `<span class="ppk">${petSVG(S.pet, e, S.hat, stage(), S.petName)}</span><span class="ppt"><b>${esc(S.petName)}</b>${text ? `<span>${esc(text)}</span>` : ""}</span>`;
  document.body.appendChild(d);
  if (anim) { G.fromTo(d, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }); G.fromTo(d.querySelector(".ppk"), { rotation: -8 }, { rotation: 8, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }); }
  peekT = setTimeout(() => { if (anim) G.to(d, { y: -80, opacity: 0, duration: 0.35, onComplete: () => d.remove() }); else d.remove(); }, 2800);
}
function openAllDone() {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="adT"><div class="box card wgbox alldone"><div class="fdpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div><h2 id="adT">${t.v13.allT}</h2><p>${esc(t.v13.allP(S.petName))}</p><button class="btn block" id="adGo" data-tab="trips">${t.v13.allB}</button><button class="link" id="closeLayer">${t.v13.later}</button></div></div>`;
  SND.play("fanfare"); burst("confetti", 30); trackOnce("tutto-fatto");
  if (anim) G.from(".alldone .fdpet", { y: 40, scale: 0.5, duration: 0.6, ease: "back.out(2)" });
}
const _completeGoalV13 = completeGoal;
completeGoal = function (g, rect) {
  const tg = todayGoals(); const wasAll = tg.every((x) => S.done.includes(x)); const lvl0 = S.level; const n0 = (S.log || []).length;
  _completeGoalV13(g, rect);
  if (!S.done.includes(g)) return;
  const all = tg.every((x) => S.done.includes(x)); const t = L();
  if (!roomVisible()) setTimeout(() => petPeek(sayText || "", all ? "amore" : "felice"), 250);
  /* il primo giorno completo porta sempre al livello 2 */
  if (all && !wasAll && S.level === 1 && !S.firstLevelGift) { S.firstLevelGift = dkey(); const prev = S.level; addXp(Math.max(0, xpNeed(1) - S.xp)); save(); setTimeout(() => showLevelUp(prev), 1300); return; }
  if (all && !wasAll && S.level === lvl0 && !S.away) { setTimeout(() => { if (!layer.innerHTML) openAllDone(); }, 1500); return; }
  /* subito dopo il primo obiettivo: il promemoria, quando la voglia e' piu' alta */
  if (n0 === 0 && !all && !S.rem) setTimeout(() => { if (!S.rem && !S.notif && !layer.innerHTML && !tutOn) openRemAsk(); }, 3200);
};
function openRemAsk() {
  const t = L(); trackOnce("promemoria-chiesto"); document.querySelectorAll("#app .remcard.ask").forEach((x) => x.remove());
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="raT"><div class="box remover"><div class="fdpet small">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div>${remCard(true).replace("<h3>", '<h3 id="raT">')}</div></div>`;
  if (anim) G.from(".remover .remcard", { y: 30, opacity: 0, duration: 0.4, ease: "power3.out" });
}

/* 3) Primo giorno piu' semplice; dal secondo giorno arrivano stagione, sfida e festa come novita' */
const _seasonCardV13 = seasonCard;
seasonCard = function () { if (isFirstDay()) return ""; const h = _seasonCardV13(); return dayIndex() === 1 && h ? h.replace('<button class="seacard"', `<button class="seacard isnew" data-new="${esc(L().v13.newTag)}"`) : h; };
const _challengeCardV13 = challengeCard;
challengeCard = function () { return isFirstDay() ? "" : _challengeCardV13(); };
const _festaBannerV13 = festaBanner;
festaBanner = function () { return isFirstDay() ? "" : _festaBannerV13(); };
/* niente visite di amici il primo giorno (confonderebbe) */
const _friendTodayV13 = friendToday;
friendToday = function () { return isFirstDay() ? null : _friendTodayV13(); };

/* 4) Oggi: obiettivi prima dei contatori, e il promemoria vicino agli obiettivi */
const _viewTodayV13 = viewToday;
viewToday = function () {
  let h = _viewTodayV13(); if (!S.pet) return h;
  const goalsKey = `<div class="row"><button class="link" data-tab="more" data-focus="goals">`;
  const ms = h.indexOf('<div class="meters2">');
  if (!S.away && ms >= 0 && h.includes(goalsKey)) {
    let depth = 0, k = ms, me = -1; const re = /<\/?div\b/g; re.lastIndex = ms;
    for (let mt; (mt = re.exec(h)); ) { if (mt[0] === "<div") depth++; else { depth--; if (depth === 0) { me = h.indexOf(">", mt.index) + 1; break; } } }
    if (me > ms) { const m = h.slice(ms, me); h = h.slice(0, ms) + h.slice(me); const i = h.indexOf(goalsKey); const j = h.indexOf("</div>", i) + 6; h = h.slice(0, j) + m + h.slice(j); }
  }
  const rc = remCard(true); if (h.includes(rc)) { h = h.replace(rc, ""); const i = h.indexOf(goalsKey); if (i >= 0) { const j = h.indexOf("</div>", i) + 6; h = h.slice(0, j) + rc + h.slice(j); } }
  return h;
};

/* 5) Testi Plus: nome del compagno anche prima di sceglierlo */
const _openPlusV13 = openPlus;
openPlus = function (src, after) {
  const had = S.petName; if (!S.petName) S.petName = (L().pets[draftPet] || L().pets.germo)[0];
  try { _openPlusV13(src, after); } finally { if (!had) S.petName = had; }
};

/* 6) Il pulsante "fallo tornare subito" resta solo per le prove interne */
const _applyRootV13 = applyRoot;
applyRoot = function () { _applyRootV13(); document.documentElement.classList.toggle("dev", !!S.dev); };

/* 7) Schermata di caricamento: sparisce appena l'app e' pronta */
(() => { const b = document.getElementById("boot"); if (b) b.remove(); })();

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "adGo") { closeLayer(); }
  if ((b.id === "remI" || b.id === "remNo") && document.querySelector(".remover")) { setTimeout(() => { if (document.querySelector(".remover")) closeLayer(); }, 300); }
}, true);
document.addEventListener("click", (ev) => { const a = ev.target.closest && ev.target.closest("a#remG"); if (a && document.querySelector(".remover")) setTimeout(() => closeLayer(), 300); }, true);

/* 8) Guida iniziale a prova di blocco: toccare lo sfondo scuro va avanti, e un controllo la ripara da sola */
document.addEventListener("click", (ev) => {
  if (!ev.target.closest || !ev.target.closest(".tutblock")) return; ev.preventDefault(); ev.stopPropagation();
  const n = document.getElementById("tutNext"); if (n) n.click(); else tutClose(true);
}, true);
let tutBad = 0;
setInterval(() => {
  if (!tutOn) { tutBad = 0; document.querySelectorAll(".tutwrap").forEach((x) => x.remove()); return; }
  if (document.querySelectorAll(".tutwrap").length > 1) { tutBad = 0; showTutStep(); return; }
  if (layer.innerHTML) { tutClose(false); setTimeout(maybeTutorial, 800); tutBad = 0; return; }
  const box = document.querySelector(".tutbox"); let ok = !!box;
  if (box) { const r = box.getBoundingClientRect(); const op = +getComputedStyle(box).opacity; ok = r.height > 20 && r.bottom > 0 && r.top < innerHeight && op > 0.5; }
  if (ok) { tutBad = 0; return; }
  tutBad++;
  if (tutBad === 2) { if (box) { box.style.opacity = "1"; box.style.transform = "none"; } else showTutStep(); }
  if (tutBad >= 4) { tutClose(true); tutBad = 0; }
}, 900);

/* 9) Plus: la prova gratuita vale solo per l'annuale, e il testo lo dice chiaro (addebito automatico a fine prova) */
function plusLabels() {
  const go = document.getElementById("plusGo"), a = document.getElementById("plusAfterTxt"); if (!go || !a) return; const p = L().plus, v = L().v13;
  const yr = plusPlan === "year";
  go.innerHTML = yr ? esc(p.trial) : esc(v.subscribe);
  a.textContent = yr ? v.afterY(p.perYear(money(PLUS_PRICE.year))) : v.afterM(p.perMonth(money(PLUS_PRICE.month)));
}
const _openPlusV13b = openPlus;
openPlus = function (src, after) { _openPlusV13b(src, after); plusLabels(); };
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("button"); if (b && b.dataset.plan) setTimeout(plusLabels, 0); });
