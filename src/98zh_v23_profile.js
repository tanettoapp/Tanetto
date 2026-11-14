/* ===== 1.0.9 (fase 3): PROFILO A PAGINE =====
   Prima: una sola pagina di circa 8.000 px (progressi, compagno, impostazioni, account, privacy, aiuto, "Ricomincia").
   Ora: in Profilo restano il compagno, Tanetto Plus e un MENU; ogni voce apre la sua pagina con la freccia "indietro":
   Progressi, Tu e il compagno, Impostazioni, Account e dati (con "Ricomincia da capo" in fondo), Privacy ed eta',
   Acquisti e Plus, Aiuto e idee, Informazioni (guida, termini, autori e licenze).
   - Le schede sono le stesse di prima (stessi pulsanti, stessi id): si mostrano o nascondono (attributo hidden), quindi
     aprire una pagina e' immediato (niente ridisegno) e il resto dell'app le trova sempre.
   - "Indietro" del telefono: da una pagina torna al menu del Profilo (poi, come prima, alla Home).
   - Toccare di nuovo "Profilo" in basso riporta al menu; cambiando scheda si riparte dal menu. */
let moreSub = null;
let psDeep = false; /* critica fase 3: pagina aperta da un collegamento fuori dal Profilo ("Modifica gli obiettivi" in Home) */
const PSUB = ["prog", "comp", "set", "acct", "priv", "buy", "help", "about"];
const PSUB_GRP = { mgrpP: "prog", mgrp0: "comp", mgrp1: "set", mgrp2: "acct", mgrp3: "help" };
const PS_IC = {
  prog: '<path d="M8 4h8v4a4 4 0 0 1-8 0zM8 6H5a2 2 0 0 0 3 4M16 6h3a2 2 0 0 1-3 4M12 12v4M9 20h6M10 16h4v4h-4z"/>',
  comp: '<path d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.7 12 20 12 20z"/>',
  set: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  acct: '<path d="M7 18a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6A3.8 3.8 0 0 1 17 18z"/><path d="M12 15.5v-5M9.8 12.6 12 10.4l2.2 2.2"/>',
  priv: '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9.2 12.2l2 2 3.8-4"/>',
  buy: '<path d="M4 8l4 3 4-6 4 6 4-3-1.6 10H5.6z"/><path d="M6 21h12"/>',
  help: '<path d="M5 5h14v10H10l-5 4z"/><path d="M10 9.2a2 2 0 1 1 2.8 1.8c-.6.3-.8.7-.8 1.2M12 13.6v.1"/>',
  about: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.1"/>'
};
const psIcon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${PS_IC[k]}</svg>`;
const PS_BACK = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
function psKind(el) {
  if (el.matches("h2.mgrp")) return "hdr";
  if (el.classList.contains("mjump")) return "drop";
  if (el.tagName === "H1" || el.classList.contains("profcard") || el.id === "plusCard" || el.classList.contains("svcard") || el.classList.contains("note")) return "main";
  if (el.classList.contains("adpriv")) return "priv";
  const h3 = el.querySelector && el.querySelector("h3"); if (h3 && h3.textContent.trim() === L().privT) return "priv";
  if (el.querySelector && el.querySelector("[data-doc]")) return "about";
  if (el.querySelector && (el.querySelector("#reset") || el.querySelector("#resetYes"))) return "acct";
  return null;
}
/* la scheda dell'eta' (pagina Privacy): risposta data, non detta o mai chiesta */
function psAgeCard() {
  if (typeof ageBand !== "function") return ""; const w = v23(); const a = S.age;
  const told = a && !a.skip && a.y; const btn = !told ? `<button class="btn ghost small" id="psAge" type="button">${esc(w.ageBtn)}</button>` : "";
  /* mai risposto (finestra chiusa senza scegliere): non "hai preferito non dirla", ma la stessa spiegazione della domanda */
  const txt = told ? w.ageYes : a && a.skip ? w.ageNo : (typeof ageT === "function" && ageT().P) || w.ageNo;
  return `<div class="card stack-s psage"><h3>${esc(w.ageT)}</h3><p class="small muted">${esc(txt)}</p>${btn}</div>`;
}
/* Acquisti e Plus: Tanetto Plus (scoprire, gestire, ripristinare) e i Tanì */
function psBuyCards(plusEl) {
  const b = BT() || {}; const w = v23(); const on = typeof plusActive === "function" && plusActive();
  const head = plusEl ? plusEl.querySelector("b") : null; const sub = plusEl ? plusEl.querySelector("small") : null;
  const plus = `<div class="card stack-s psbuy"><h3>${icon("p_crown")}Tanetto Plus</h3><p class="small muted">${esc(on ? b.active || "" : (sub && sub.textContent) || "")}</p>
    <button class="btn block ${on ? "ghost" : "gold"}" id="psPlus" type="button">${esc(on ? b.manage || "Tanetto Plus" : (head && head.textContent) || "Tanetto Plus")}</button>
    ${typeof isNativeApp === "function" && isNativeApp() ? `<button class="link small" id="billRestore" type="button">${esc(b.restore || "")}</button>` : ""}</div>`;
  const tani = `<div class="card stack-s pstani"><h3>${SEED}${esc(w.taniT)}</h3><p class="small muted">${esc(w.taniP)}</p><button class="btn ghost block" id="psTani" type="button">${esc((L().tani || {}).shopT || w.taniT)}</button></div>`;
  return plus + tani;
}
const _viewMoreP3 = viewMore;
viewMore = function () {
  const h = _viewMoreP3(); if (!S.pet) return h;
  if (!moreSub && ((typeof showPicker !== "undefined" && showPicker) || (typeof editGoals !== "undefined" && editGoals))) moreSub = "comp";
  if (!moreSub && typeof confirmReset !== "undefined" && confirmReset) moreSub = "acct";
  const tpl = document.createElement("template"); tpl.innerHTML = h;
  const st = tpl.content.querySelector(".stack.pmore") || tpl.content.querySelector(".stack"); if (!st) return h;
  const w = v23(); const titles = { priv: w.tPriv, buy: w.tBuy, about: w.tAbout };
  const pages = { main: [] }; PSUB.forEach((k) => { pages[k] = []; }); let cur = "main";
  [...st.children].forEach((el) => {
    const k = psKind(el);
    if (k === "hdr") { cur = PSUB_GRP[el.id] || cur; titles[cur] = titles[cur] || el.textContent.trim(); el.remove(); return; }
    if (k === "drop") { el.remove(); return; }
    (pages[k || cur] || pages.main).push(el);
  });
  const mk = (html) => { const x = document.createElement("template"); x.innerHTML = html; return [...x.content.children]; };
  pages.priv.push(...mk(psAgeCard()));
  pages.buy.push(...mk(psBuyCards(tpl.content.getElementById("plusCard"))));
  /* le schede che non appartengono a nessuna pagina restano nel menu (cosi' nulla si perde) */
  const main = pages.main; const note = main.filter((el) => el.classList.contains("note"));
  const head = main.filter((el) => !el.classList.contains("note"));
  const fixed = head.filter((el) => el.tagName === "H1" || el.classList.contains("profcard") || el.id === "plusCard" || el.classList.contains("svcard"));
  const loose = head.filter((el) => !fixed.includes(el));
  const rows = PSUB.filter((k) => pages[k].length && titles[k]).map((k) => `<button class="prow" type="button" data-psub="${k}"><span class="prico pi-${k}">${psIcon(k)}</span><span class="prtx"><b>${esc(titles[k])}</b><small>${esc((w.pg || {})[k] || "")}</small></span><span class="pchev" aria-hidden="true">›</span></button>`).join("");
  const h1 = st.querySelector("h1"); const nav = mk(`<nav class="pmenu card" aria-label="${esc((h1 && h1.textContent.trim()) || "Tanetto")}">${rows}</nav>`);
  const out = [...fixed, ...nav, ...loose];
  out.forEach((el) => { el.dataset.pg = "main"; });
  PSUB.forEach((k) => {
    if (!pages[k].length) return;
    const hd = mk(`<div class="psubhd" data-pg="${k}"><button class="iconbtn psback" type="button" data-psback="1" aria-label="${esc(L().back)}">${PS_BACK}</button><h1 class="psubt" tabindex="-1">${esc(titles[k] || "")}</h1></div>`)[0];
    out.push(hd); pages[k].forEach((el) => { el.dataset.pg = k; out.push(el); });
  });
  note.forEach((el) => { el.dataset.pg = "main"; out.push(el); });
  st.replaceChildren(...out); st.classList.add("psplit"); psApply(st);
  return tpl.innerHTML;
};
/* mostra la pagina scelta (o il menu) senza ridisegnare */
function psApply(st) {
  if (!st) return; const want = moreSub || "main"; st.dataset.sub = want;
  [...st.children].forEach((el) => { const pg = el.dataset.pg || "main"; if (pg === want) el.removeAttribute("hidden"); else el.setAttribute("hidden", ""); });
}
function psGo(k, focus) {
  if (k && !PSUB.includes(k)) return; moreSub = k || null; psDeep = false;
  if (!k) { try { showPicker = false; editGoals = null; confirmReset = false; } catch (e) { /* niente */ } }
  const st = app.querySelector(".stack.psplit");
  if (!st || tab !== "more") return;
  psApply(st);
  window.scrollTo(0, 0);
  try {
    const t = k ? st.querySelector(`.psubhd[data-pg="${k}"] .psubt`) : st.querySelector(`.prow[data-psub="${focus || ""}"]`) || st.querySelector("h1");
    if (t) t.focus({ preventScroll: true });
  } catch (e) { /* niente */ }
  if (anim && k) { const els = [...st.children].filter((el) => !el.hidden).slice(0, 6); G.from(els, { x: 18, opacity: 0, duration: 0.28, stagger: 0.03, ease: "power2.out", clearProps: "transform,opacity" }); }
}
window.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.dataset.psub) { ev.stopImmediatePropagation(); psDeep = false; SND.play("click"); psGo(b.dataset.psub); return; }
  if (b.dataset.psback) { ev.stopImmediatePropagation(); SND.play("click"); const from = moreSub; psGo(null, from); return; }
  if (b.id === "psPlus") { ev.stopImmediatePropagation(); openPlus("profilo"); return; }
  if (b.id === "psTani") { ev.stopImmediatePropagation(); openTaniShop("profilo"); return; }
  if (b.id === "psAge") { ev.stopImmediatePropagation(); openAge(() => { if (tab === "more") { const y = window.scrollY; render(); window.scrollTo(0, y); } }); return; }
  /* "Modifica gli obiettivi" dalla Home: si apre direttamente la pagina del compagno */
  if (b.dataset.focus === "goals") { moreSub = "comp"; psDeep = tab !== "more"; }
  /* di nuovo "Profilo" in basso: si torna al menu */
  if (b.dataset.tab) { if (b.dataset.tab === "more" && tab === "more" && moreSub) { ev.stopImmediatePropagation(); psGo(null); return; } if (b.dataset.tab !== "more" && !b.dataset.focus) moreSub = null; }
}, true);
/* "indietro" del telefono: da una pagina del Profilo si torna al menu del Profilo */
const _backPressP3 = backPress;
backPress = function () {
  if (moreSub && tab === "more" && !layer.innerHTML.trim() && !document.getElementById("exitAsk") && !document.querySelector(".tutwrap") && !(typeof full !== "undefined" && full)) {
    /* arrivati da "Modifica gli obiettivi" in Home: "indietro" riporta in Home, dove si era (la freccia sullo schermo porta sempre al menu) */
    if (psDeep) { psDeep = false; moreSub = null; try { showPicker = false; editGoals = null; confirmReset = false; } catch (e) { /* niente */ } return _backPressP3(); }
    psGo(null); return "profile";
  }
  return _backPressP3();
};
try { new MutationObserver(() => { if (tab !== "more") { moreSub = null; psDeep = false; } }).observe(app, { childList: true }); } catch (e) { /* niente */ }
