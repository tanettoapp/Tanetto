/* =================== v13b: seconda revisione indipendente =================== */

/* A) Il proprietario non viene contato: basta aprire una volta il link con ?io=1 su ogni dispositivo */
const NO_COUNT_KEY = "tanetto-non-contare";
(() => {
  try {
    const q = new URLSearchParams(location.search);
    if (q.get("io") === "1") { localStorage.setItem(NO_COUNT_KEY, "1"); setTimeout(noCountShow, 900); }
    if (q.get("io") === "0") { localStorage.removeItem(NO_COUNT_KEY); }
  } catch (e) { /* niente */ }
})();
/* conferma ben visibile: aspetta che sparisca la schermata iniziale, poi un popup con OK */
function noCountShow(tries = 0) {
  if (document.querySelector(".splash") && tries < 20) { setTimeout(() => noCountShow(tries + 1), 400); return; }
  const msg = L().v13.noCount;
  if (layer.innerHTML || tutOn) { toast(msg); clearTimeout(toastTimer); toastTimer = setTimeout(() => { document.getElementById("toast").hidden = true; }, 6000); return; }
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="ncT"><div class="box card wgbox"><div class="fdpet small">${petSVG(S.pet || draftPet || "germo", "felice", S.hat, S.pet ? stage() : 1, S.petName || "")}</div><p id="ncT" style="font-size:17px;line-height:1.4">${esc(msg)}</p><button class="btn block" id="closeLayer">OK</button></div></div>`;
}
/* in "Altro" resta scritto, cosi' si puo' sempre controllare */
const _viewMoreNC = viewMore;
viewMore = function () { const h = _viewMoreNC(); let on = false; try { on = localStorage.getItem(NO_COUNT_KEY) === "1"; } catch (e) { /* niente */ } return on ? h + `<p class="small muted" style="text-align:center;margin:8px 0 0">${esc(L().v13.noCount)}</p>` : h; };
const _trackV13 = track;
track = function (path) { try { if (localStorage.getItem(NO_COUNT_KEY) === "1") return; } catch (e) { /* niente */ } _trackV13(path); };

/* B) A mezzanotte, o tornando all'app il giorno dopo, si passa subito al giorno nuovo */
const _completeGoalV13b = completeGoal;
completeGoal = function (g, rect) { if (S.pet && S.day !== dkey()) { render(); return; } _completeGoalV13b(g, rect); };
function dayCheck() { if (S.pet && S.day !== dkey() && !layer.innerHTML && !tutOn) { const y = window.scrollY; render(); window.scrollTo(0, y); } }
document.addEventListener("visibilitychange", () => { if (!document.hidden) dayCheck(); });
window.addEventListener("focus", dayCheck);
setInterval(dayCheck, 30000);

/* C) Il regalo di benvenuto arriva anche se si ricarica la pagina durante la guida */
const _tutCloseV13b = tutClose;
tutClose = function (done) { _tutCloseV13b(done); if (done && S.pet && !S.welcomeGift && (!S.firstDay || S.firstDay === dkey()) && !layer.innerHTML) setTimeout(() => { if (!S.welcomeGift && !layer.innerHTML) openWelcomeGift(); }, 450); };

/* D) Esc dopo il minuto di respiro conta come "OK" */
document.addEventListener("keydown", (e) => { if (e.key !== "Escape" || !layer.innerHTML) return; const c = layer.querySelector("#closeLayer[data-breath-done]"); if (c) { e.stopImmediatePropagation(); c.click(); } }, true);

/* E) Tasto "indietro" del telefono: chiude il popup o lo schermo intero invece di uscire dall'app */
let histOpen = false, histSkip = false;
const HIST_OK = (() => { try { return window.top === window.self; } catch (e) { return false; } })();
function wantsHist() { return HIST_OK && (!!layer.innerHTML || (typeof full !== "undefined" && full)); }
new MutationObserver(() => {
  if (wantsHist() && !histOpen) { try { history.pushState({ tanetto: 1 }, ""); histOpen = true; } catch (e) { /* niente */ } }
  else if (!wantsHist() && histOpen) { histOpen = false; histSkip = true; try { history.back(); } catch (e) { histSkip = false; } }
}).observe(document.body, { childList: true, subtree: true });
window.addEventListener("popstate", () => {
  if (histSkip) { histSkip = false; return; }
  if (!histOpen) return; histOpen = false;
  if (layer.innerHTML) { const c = layer.querySelector("#closeLayer, #fdOk, #wgOk, #closeLetter, #closeGame"); if (c) c.click(); else closeLayer(); }
  else if (typeof full !== "undefined" && full) { const fc = document.getElementById("fullClose"); if (fc) fc.click(); }
  setTimeout(() => { if (wantsHist() && !histOpen) { try { history.pushState({ tanetto: 1 }, ""); histOpen = true; } catch (e) { /* niente */ } } }, 300);
});

/* F) Il consiglio del resoconto parla del punto debole solo se c'e' davvero */
const _openReportV13 = openReport;
openReport = function () {
  _openReportV13(); const m = monthStats(); const tip = layer.querySelector(".rpsec.tip p"); if (!tip) return;
  const cats = ["body", "mind", "home", "people", "work", "sleep"].filter((c) => (S.goals || []).some((g) => goalCat(g.id) === c));
  if (!cats.length || !m.n) return;
  const share = (c) => (m.cc[c] || 0) / m.n; const top = Math.max(...cats.map(share)); const weak = cats.slice().sort((a, b) => share(a) - share(b))[0];
  tip.textContent = share(weak) < 0.25 && share(weak) < top - 0.1 ? L().rep.tips[weak] : L().rep.tips.custom;
};

/* G) Il compagno "affacciato" non copre mai i popup */
const _petPeekV13 = petPeek;
petPeek = function (text, e) { if (layer.innerHTML) return; _petPeekV13(text, e); };
new MutationObserver(() => { if (layer.innerHTML) document.querySelectorAll(".petpeek").forEach((x) => x.remove()); }).observe(layer, { childList: true });

/* H) "Rivedi la guida" non si usa mentre il compagno e' in viaggio */
const _viewMoreV13b = viewMore;
viewMore = function () { const h = _viewMoreV13b(); return S.away ? h.replace(/<button[^>]*id="tutAgain"[^>]*>.*?<\/button>/, "") : h; };

/* I) La presentazione ricorda le scelte anche se si ricarica la pagina */
(() => {
  try { const d = JSON.parse(sessionStorage.getItem("tanetto-bozza") || "null"); if (d && !S.pet) { if (d.p && ALL_PETS.includes(d.p)) draftPet = d.p; if (typeof d.n === "string") draftName = d.n; if (Array.isArray(d.g) && d.g.length) draftGoals = d.g; } } catch (e) { /* niente */ }
})();
setInterval(() => { if (S.pet) { try { sessionStorage.removeItem("tanetto-bozza"); } catch (e) { /* niente */ } return; } try { sessionStorage.setItem("tanetto-bozza", JSON.stringify({ p: draftPet, n: draftName, g: draftGoals })); } catch (e) { /* niente */ } }, 1000);

/* J) Oggi: niente "0 giorni di fila" il primo giorno */
const _viewTodayV13b = viewToday;
viewToday = function () { const h = _viewTodayV13b(); if (!S.pet || streak() > 0) return h; return h.replace(/<span class="pill" style="color:var\(--sun\)">[\s\S]*?<\/span><\/span>/, ""); };

/* K) Plus: piano e pulsante restano sempre visibili in basso, anche sui telefoni piccoli */
const _plusLabelsV13 = plusLabels;
plusLabels = function () {
  _plusLabelsV13(); const box = document.querySelector(".plusbox"); const plans = box && box.querySelector(".plans"); const go = document.getElementById("plusGo"); const a = document.getElementById("plusAfterTxt");
  if (!box || !plans || !go || box.querySelector(".plussticky")) return;
  const st = document.createElement("div"); st.className = "plussticky"; plans.parentNode.insertBefore(st, plans); st.append(plans, go); if (a) st.append(a);
};

/* L) Popup "arriva presto": niente doppio "Intanto" */
const _fakeDoorV13 = fakeDoor;
fakeDoor = function (title, text, extra) { _fakeDoorV13(title, text, extra); if (extra) { const g = layer.querySelector(".fdgift b"); if (g) g.textContent = `+${FD_GIFT} Tanì`; } };
