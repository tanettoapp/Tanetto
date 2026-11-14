/* =================== v11: questionario anonimo per i tester =================== */
const SURVEY_V = 1;
let svStep = 0, svAns = [];
const svDone = () => S.survey && S.survey.v === SURVEY_V && S.survey.done;
function surveyCard() {
  const t = L().survey; if (!t) return "";
  if (svDone()) return `<div class="card svcard ok"><span class="svic">${icon("check")}</span><p>${t.done}</p></div>`;
  return `<div class="card svcard"><span class="svic">${icon("p_chat")}</span><div class="svtx"><h3>${t.cardT}</h3><p class="small muted">${t.cardP}</p></div><button class="btn small" id="svOpen">${t.cardB}</button></div>`;
}
function surveyInvite() {
  const t = L().survey; if (!t || !S.pet || svDone() || !S.firstDay) return "";
  const d = Math.round((new Date(dkey()) - new Date(S.firstDay)) / 86400000);
  if (d < 2 || (S.survey && S.survey.later && S.survey.later >= dkey())) return "";
  return `<div class="card svinvite"><div class="svpet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><div class="svtx"><h3>${t.inviteT}</h3><p class="small">${esc(t.inviteP(S.petName))}</p><div class="row"><button class="btn small" id="svOpen">${t.cardB}</button><button class="btn ghost small" id="svLater">${t.later}</button></div></div></div>`;
}
function openSurvey() { svStep = 0; svAns = L().survey.q.map(() => []); renderSurvey(); trackOnce("sondaggio-aperto"); }
function renderSurvey(still) {
  const t = L().survey; const q = t.q[svStep]; const n = t.q.length; const last = svStep === n - 1; const sel = svAns[svStep];
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="svT"><div class="box card svbox">
  <div class="svhead"><span class="small muted">${t.step(svStep + 1, n)}</span><button class="iconbtn" id="closeLayer" aria-label="${esc(L().close)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="svdots" aria-hidden="true">${t.q.map((_, i) => `<i class="${i < svStep ? "on" : i === svStep ? "cur" : ""}"></i>`).join("")}</div>
  <h2 id="svT">${esc(q.t)}</h2>${q.m ? `<p class="small muted">${t.multi}</p>` : ""}
  <div class="svopts ${svStep === 0 ? "stars" : ""}" role="${q.m ? "group" : "radiogroup"}" aria-labelledby="svT">${q.o.map((o, i) => `<button class="svo" data-svo="${i}" ${q.m ? `aria-pressed="${sel.includes(i)}"` : `role="radio" aria-checked="${sel.includes(i)}"`}>${svStep === 0 ? `<span class="svstar">${"★".repeat(i + 1)}</span>` : ""}<span>${esc(o)}</span></button>`).join("")}</div>
  <div class="row svnav"><button class="btn ghost small" id="svSkip">${t.skip}</button><span class="spacer"></span><button class="btn" id="svNext" ${sel.length ? "" : "disabled"}>${last ? t.send : t.next}</button></div></div></div>`;
  if (anim && !still) G.from(".svbox h2, .svopts .svo", { y: 10, opacity: 0, duration: 0.3, stagger: 0.03 });
}
function finishSurvey() {
  svAns.forEach((a, qi) => a.forEach((oi) => track(`sondaggio-d${qi + 1}-r${oi + 1}`)));
  track(`sondaggio-lingua-${S.lang}`); track("sondaggio-inviato");
  const first = !(S.survey && S.survey.gift); S.survey = { v: SURVEY_V, done: true, gift: true }; if (first) S.seeds += 50; save();
  const t = L().survey;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="svT2"><div class="box card svbox"><div class="fdpet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><h2 id="svT2">${t.thanksT}</h2>${first ? `<p class="svgift">${SEED}<b>${t.gift}</b></p>` : ""}<p class="small">${t.thanksP}</p><p><b>tanettoapp@gmail.com</b></p><button class="btn" id="closeLayer">${L().ok}</button></div></div>`;
  SND.play("fanfare"); SND.haptic([15, 40, 20]); burst("heart", 12, document.querySelector(".svbox"));
}
const _viewMoreV11 = viewMore;
viewMore = function () { const h = _viewMoreV11(); const key = `<h1>${L().moreT}</h1>`; return h.includes(key) ? h.replace(key, key + surveyCard()) : h; };
const _viewTodayV11 = viewToday;
viewToday = function () { const h = _viewTodayV11(); const inv = surveyInvite(); if (!inv) return h; const key = `<p class="note">${L().demo}</p>`; return h.includes(key) ? h.replace(key, inv + key) : h; };
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "svOpen") { openSurvey(); return; }
  if (b.id === "svLater") { S.survey = Object.assign({}, S.survey, { later: dkey() }); save(); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.dataset.svo != null && document.querySelector(".svbox")) {
    const i = +b.dataset.svo; const q = L().survey.q[svStep]; const a = svAns[svStep];
    if (q.m) { const k = a.indexOf(i); if (k >= 0) a.splice(k, 1); else a.push(i); } else svAns[svStep] = [i];
    SND.play("tap"); SND.haptic(8); renderSurveyKeep(); return;
  }
  if (b.id === "svSkip") { svAns[svStep] = []; svGo(); return; }
  if (b.id === "svNext") { svGo(); return; }
}, true);
function renderSurveyKeep() { renderSurvey(true); }
function svGo() { const n = L().survey.q.length; if (svStep < n - 1) { svStep++; renderSurvey(); SND.play("pop"); } else finishSurvey(); }
