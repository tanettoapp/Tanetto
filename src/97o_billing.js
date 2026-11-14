/* =================== v14: pagamenti veri con Google Play =================== */
/* Tanetto Plus (abbonamento "tanetto_plus": piani "mensile" e "annuale", prova gratuita sull'annuale) e
   pacchetti di Tani (prodotti consumabili). Prezzi, valuta, prova e rinnovi li decide Google Play: l'app mostra
   quello che Google restituisce. Sul sito non si compra nulla: si invita a scaricare l'app per Android. */
const BILL = { SUB: "tanetto_plus", PLAN: { month: "mensile", year: "annuale" }, PACK_IDS: ["tani_200", "tani_1100", "tani_2400", "tani_5000"] };
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.tanettoapp.tanetto";
const PLAY_FROM = "2026-11-10"; /* 1.0.8: app pubblica sul Play Store dal 10/11/2026 */ /* da questa data il sito mostra il pulsante per lo store (scheda in pre-registrazione o pubblicata) */
const SUBS_URL = "https://play.google.com/store/account/subscriptions?sku=tanetto_plus&package=com.tanettoapp.tanetto";
const PLUS_MONTH_TANI = 300, PLUS_MONTH_SHIELDS = 2;
const BT = () => L().bill;

/* Plus vale solo nell'app Android con un abbonamento attivo confermato da Google Play */
function plusOk() { return isNativeApp() && !!S.plusOn; }
const billPlugin = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.Billing) || (C.registerPlugin ? C.registerPlugin("Billing") : null); } catch (e) { return null; } };
const playLive = () => dkey() >= PLAY_FROM;
const curFmt = (micros, cur) => { try { return intlNF((navigator.languages && navigator.languages[0]) || navigator.language || loc(), { /* 1.0.11 (C-14) */ style: "currency", currency: cur }).format(micros / 1e6); } catch (e) { return (micros / 1e6).toFixed(2) + " " + cur; } };
const isoDays = (p) => { const m = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?$/.exec(p || ""); if (!m) return 0; return (+m[1] || 0) * 365 + (+m[2] || 0) * 30 + (+m[3] || 0) * 7 + (+m[4] || 0); };

/* --- Prodotti e prezzi da Google --- */
let billProducts = null, billProdP = null;
function loadProducts(force) {
  if (!isNativeApp()) return Promise.reject(Object.assign(new Error("web"), { code: "web" }));
  if (billProducts && !force) return Promise.resolve(billProducts);
  if (billProdP && !force) return billProdP;
  const p = billPlugin(); if (!p) return Promise.reject(Object.assign(new Error("plugin"), { code: "unavailable" }));
  billProdP = p.products({ subs: [BILL.SUB], inapp: BILL.PACK_IDS }).then((r) => {
    const out = { plans: {}, packs: {} };
    (r.products || []).forEach((d) => {
      if (d.id === BILL.SUB) {
        Object.entries(BILL.PLAN).forEach(([k, base]) => {
          const offers = (d.offers || []).filter((o) => o.basePlanId === base); if (!offers.length) return;
          const basic = offers.find((o) => !o.offerId) || offers[0];
          const trialO = offers.find((o) => o.offerId && (o.phases || [])[0] && o.phases[0].micros === 0);
          const full = (basic.phases || [])[basic.phases.length - 1] || {};
          out.plans[k] = { token: basic.token, trialToken: trialO ? trialO.token : null, trialDays: trialO ? isoDays(trialO.phases[0].period) : 0, price: full.price, micros: full.micros, currency: full.currency };
        });
      } else if (BILL.PACK_IDS.includes(d.id)) out.packs[d.id] = { price: d.price, micros: d.micros, currency: d.currency };
    });
    if (!out.plans.year && !out.plans.month && !Object.keys(out.packs).length) throw Object.assign(new Error("none"), { code: "item-unavailable" });
    billProducts = out; return out;
  }).finally(() => { billProdP = null; });
  return billProdP;
}

/* --- Stato dell'abbonamento: chiesto a Google all'apertura e quando l'app torna in primo piano --- */
let billSyncAt = 0;
async function syncPurchases(show) {
  const p = billPlugin(); if (!isNativeApp() || !p || !S.pet) return null;
  billSyncAt = Date.now();
  let changed = false, found = 0;
  try {
    const subs = (await p.owned({ type: "subs" })).purchases || [];
    const act = subs.filter((x) => (x.products || []).includes(BILL.SUB) && x.state === "purchased");
    for (const x of act) if (!x.acknowledged) { try { await p.acknowledge({ token: x.token }); } catch (e) { /* si riprova alla prossima apertura */ } }
    const on = act.length > 0; if (on !== !!S.plusOn) { S.plusOn = on; changed = true; if (on && !S.plusSince) S.plusSince = dkey(); }
    S.plusCheck = Date.now(); found += act.length;
    const packs = (await p.owned({ type: "inapp" })).purchases || [];
    for (const x of packs) if (x.state === "purchased") { if (await creditPack(x, false)) { changed = true; found++; } }
  } catch (e) { if (show) toast(errBill(e)); return null; }
  save();
  if (plusMonthly()) changed = true;
  if (changed) render();
  if (show) toast(found ? BT().restored : BT().nothing);
  return found;
}
/* Consegna un pacchetto di Tani una sola volta per acquisto (il codice dell'acquisto viene ricordato, anche nel backup) */
async function creditPack(x, celebrate) {
  const p = billPlugin(); const id = (x.products || [])[0]; const i = BILL.PACK_IDS.indexOf(id); if (i < 0) return false;
  S.paidTokens = S.paidTokens || [];
  let credited = false;
  if (!S.paidTokens.includes(x.token)) {
    const n = PACKS[i].n * Math.max(1, x.quantity || 1);
    S.seeds += n; S.paidTokens.push(x.token); if (S.paidTokens.length > 200) S.paidTokens.shift(); save(); credited = true;
    trackOnce("tani-acquistati-" + PACKS[i].n);
    if (celebrate) { toast(BT().thanksTani(n)); SND.play("fanfare"); SND.haptic([20, 60, 30]); burst("confetti", 24); }
  }
  try { await p.consume({ token: x.token }); } catch (e) { /* resta da consumare: alla prossima apertura si riprova, senza consegnare due volte */ }
  return credited;
}
/* Regalo mensile di Plus: 300 Tani e 2 scudi, una volta al mese finche' Plus e' attivo */
function plusMonthly() {
  if (!plusActive()) return false; const ym = dkey().slice(0, 7); if (S.plusMonth === ym) return false;
  S.plusMonth = ym; S.seeds += PLUS_MONTH_TANI; S.shields = (S.shields || 0) + PLUS_MONTH_SHIELDS; save();
  setTimeout(() => { toast(BT().monthGift); SND.play("jingle"); }, 1200); trackOnce("plus-regalo-mese"); return true;
}
/* Plus: +50% di Tani dagli obiettivi */
const _completeGoalV14 = completeGoal;
completeGoal = function (g, rect) {
  const before = S.seeds; _completeGoalV14(g, rect);
  if (plusActive() && S.seeds > before) { S.seeds += Math.round((S.seeds - before) * 0.5); save(); const el = document.getElementById("seedN"); if (el) el.textContent = S.seeds; lastSeeds = S.seeds; }
};
function errBill(e) { const c = (e && e.code) || ""; return /network/.test(c) ? L().acct.err.net : BT().unavail; }
async function buyThing(id, offerToken) {
  const p = billPlugin(); if (!p) throw Object.assign(new Error("plugin"), { code: "unavailable" });
  const r = await p.buy({ id, offerToken: offerToken || "" });
  return (r && r.purchases) || [];
}
async function handlePurchases(list, celebrate) {
  const p = billPlugin(); let gotPlus = false, pending = false;
  for (const x of list || []) {
    if (x.state === "pending") { pending = true; continue; }
    if (x.state !== "purchased") continue;
    if ((x.products || []).includes(BILL.SUB)) {
      if (!x.acknowledged) { try { await p.acknowledge({ token: x.token }); } catch (e) { /* riprova alla prossima apertura */ } }
      if (!S.plusOn) { S.plusOn = true; S.plusSince = S.plusSince || dkey(); gotPlus = true; } S.plusCheck = Date.now(); save();
    } else await creditPack(x, celebrate);
  }
  if (pending) toast(BT().pending);
  if (gotPlus) { plusMonthly(); return "plus"; }
  return null;
}
/* Acquisti completati piu' tardi (pagamenti in attesa) */
setTimeout(() => { const p = billPlugin(); if (isNativeApp() && p && p.addListener) { try { p.addListener("purchases", (o) => { handlePurchases(o.purchases, true).then((k) => { if (k === "plus") { toast(BT().thanksPlus(S.petName)); render(); } else render(); }); }); } catch (e) { /* niente */ } } }, 0);
setTimeout(() => { if (isNativeApp()) syncPurchases(false); }, 2500);
/* 1.0.9: a ogni ritorno nell'app (non piu' solo dopo un'ora): chi riscatta un codice promozionale di Plus su Google Play e
   torna nell'app trova Plus attivo subito (acquisto riconosciuto/acknowledge e sbloccato). Pausa minima di 15 secondi. */
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && isNativeApp() && Date.now() - billSyncAt > 15e3) syncPurchases(false); });

/* --- Finestra di Tanetto Plus --- */
let billBusy = false;
/* 1.0.9: solo cio' che Plus da' davvero. Le chiacchiere con il compagno sono gratis per tutti (indice 1 dell'elenco
   vecchio: non si mostra piu'); i numeri (gite del giro del mondo, compagni esclusivi) si contano dai dati, cosi'
   non invecchiano mai. perks: 2 giro del mondo, 3 fila d'oro, 4 collezioni, 5 scudi, 6 Tani', 7 resoconto. */
const plusText = (x) => (typeof x === "function" ? x(WORLD.length) : String(x || "")).replace("{n}", S.petName || "");
function plusPerks() {
  const t = L(); const ic = ["p_trip", "p_crown", "p_gift", "p_shield", "p_two", "p_stats"];
  const rows = [2, 3, 4, 5, 6, 7].map((i, k) => `<li><span class="pk">${icon(ic[k])}</span><span>${esc(plusText(t.plus.perks[i]))}</span></li>`);
  rows.splice(1, 0, `<li class="pkpets"><span class="pk">${icon("p_heart")}</span><span>${esc(t.v12.perk(PLUS_PETS.length))}</span></li>`);
  return rows.join("");
}
openPlus = function (src, after) {
  const t = L(), p = t.plus, b = BT(); plusAfter = after || null;
  const legal = `<p class="plegal small"><button class="inlink" data-doc="terms">${esc(t.termsB)}</button> · <button class="inlink" data-doc="privDoc">${esc(t.privB)}</button></p>`;
  let foot;
  if (!isNativeApp()) foot = `<div class="plussticky"><p class="small pweb">${esc(b.webOnly)}</p>${playLive() ? `<a class="btn gold block" id="playGet" href="${PLAY_URL}" target="_blank" rel="noopener">${esc(b.getApp)}</a>` : ""}</div>`;
  else if (plusActive()) foot = `<div class="plussticky"><p class="okline">${icon("check")} ${esc(b.active)}</p><a class="btn ghost block" href="${SUBS_URL}" target="_blank" rel="noopener">${esc(b.manage)}</a><p class="small muted">${esc(b.manageP)}</p></div>`;
  else foot = `<div class="plussticky" id="plusFoot"><p class="small muted ploading"><span class="spin" aria-hidden="true"></span>${esc(L().acct.wait)}</p></div>`;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="plT"><div class="box plusbox"><div class="plushead"><div class="plpet">${petSVG(S.pet || draftPet, "felice", "h_crown", S.pet ? stage() : 0, S.petName || "")}</div><h2 id="plT">${p.name}</h2><p>${esc(p.tag)}</p></div>
  <ul class="perks">${plusPerks()}</ul>${foot}
  ${isNativeApp() && !plusActive() ? `<button class="link small" id="billRestore">${esc(b.restore)}</button>` : ""}${legal}
  <button class="link" id="closeLayer">${t.tani.close}</button></div></div>`;
  trackOnce("plus-aperto"); if (src) trackOnce("plus-da-" + src);
  if (anim) { G.from(".plusbox", { y: 40, opacity: 0, duration: 0.45, ease: "power3.out" }); G.from(".perks li", { x: -20, opacity: 0, duration: 0.35, stagger: 0.05, delay: 0.15 }); }
  if (isNativeApp() && !plusActive()) loadProducts().then(plusFoot).catch(plusFootErr);
};
/* 1.0.9: se Google Play risponde ma non ha Plus (es. paese dove non e' in vendita, come la Russia) lo si dice chiaramente,
   invece di "controlla la connessione" */
const billNone = (e) => /^(unavailable|item-unavailable)$/.test((e && e.code) || "");
function plusFootErr(e) {
  const f = document.getElementById("plusFoot"); if (!f) return; const none = e === "none" || billNone(e);
  f.innerHTML = `<p class="small pweb">${esc(none ? BT().noPlans : BT().unavail)}</p><button class="btn ghost block" id="billRetry">${esc(BT().retry)}</button>`;
}
const trialEnd = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return fmtDate(dkey(d)); };
const priceTxt = (pl, per) => (pl && pl.price ? per(pl.price) : BT().atCheckout);
function plusFoot() {
  const f = document.getElementById("plusFoot"); if (!f || !billProducts) return; const t = L(), p = t.plus, pl = billProducts.plans;
  if (!pl.year && !pl.month) { plusFootErr("none"); return; } /* Google non ha restituito piani (es. abbonamento non ancora attivo): messaggio chiaro + Riprova */
  if (!pl[plusPlan]) plusPlan = pl.year ? "year" : "month";
  const save = pl.year && pl.month ? plusSavePct(pl.year.micros, pl.month.micros) : 0;
  const y = pl.year ? `<button class="plan" role="radio" data-plan="year" aria-checked="${plusPlan === "year"}"><span class="ppop">${p.popular}</span><b>${p.yearly}</b><span>${esc(priceTxt(pl.year, p.perYear))}</span><small>${pl.year.micros && pl.year.currency ? esc(p.yearNote(curFmt(pl.year.micros / 12, pl.year.currency))) : ""}${save >= 5 ? ` · ${esc(p.save(save))}` : ""}</small></button>` : "";
  const m = pl.month ? `<button class="plan" role="radio" data-plan="month" aria-checked="${plusPlan === "month"}"><b>${p.monthly}</b><span>${esc(priceTxt(pl.month, p.perMonth))}</span><small>&nbsp;</small></button>` : "";
  f.innerHTML = `<div class="plans" role="radiogroup">${y}${m}</div><button class="btn gold block" id="plusGo"></button><p class="small muted" id="plusAfterTxt"></p>`;
  billLabels();
}
function billLabels() {
  const go = document.getElementById("plusGo"), a = document.getElementById("plusAfterTxt"); if (!go || !a || !billProducts) return;
  const t = L(), p = t.plus, b = BT(), pl = billProducts.plans[plusPlan]; if (!pl) return;
  const per = priceTxt(pl, plusPlan === "year" ? p.perYear : p.perMonth);
  /* 1.0.9: prova gratuita solo se Google Play restituisce l'offerta (piano annuale, nuovi abbonati: Google la mostra solo a
     chi ne ha diritto). Si dice quando parte il primo pagamento, quanto costa dopo e dove disdire. Senza offerta, nessun testo di prova. */
  if (pl.trialToken && pl.trialDays) { go.innerHTML = `${icon("p_crown")}${esc(b.trial(pl.trialDays))}`; a.textContent = `${b.afterTrial(pl.trialDays, per)} ${b.trialWhen(trialEnd(pl.trialDays))}`; }
  else { go.innerHTML = `${icon("p_crown")}${esc(t.v13.subscribe)}`; a.textContent = plusPlan === "year" ? b.afterY(per) : b.afterM(per); }
  document.querySelectorAll(".plan").forEach((x) => x.setAttribute("aria-checked", String(x.dataset.plan === plusPlan)));
}
plusLabels = billLabels; /* i vecchi aggiornamenti dei testi (prezzi finti) ora usano i prezzi veri */

/* --- Negozio dei Tani --- */
openTaniShop = function (src) {
  const t = L(), tt = t.tani, b = BT();
  const packs = PACKS.map((p, i) => `<button class="pack ${i === 3 ? "best" : ""}" data-pack="${i}" ${isNativeApp() ? "" : "disabled"}>${i === 3 ? `<span class="pbadge">${tt.best}</span>` : ""}<span class="part">${packArt(i)}</span><b>${tt.packs[i]}</b><span class="pn">${SEED}${p.n.toLocaleString(loc(), NUMG)}</span>${p.b ? `<span class="pb">${tt.bonus(p.b)}</span>` : `<span class="pb"></span>`}<span class="penough">${esc((tt.enough || [])[i] || "")}</span><span class="pp" data-pp="${i}">${isNativeApp() ? `<span class="spin" aria-hidden="true"></span>` : ""}</span></button>`).join("");
  const web = isNativeApp() ? "" : `<p class="small pweb">${esc(b.webOnly)}</p>${playLive() ? `<a class="btn gold block" href="${PLAY_URL}" target="_blank" rel="noopener">${esc(b.getApp)}</a>` : ""}`;
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="tsT"><div class="sheet tshop"><div class="grab"></div><h2 id="tsT">${SEED}${tt.shopT}</h2><p class="small muted">${tt.shopP}</p>
  <div class="packs">${packs}</div>${web}<p class="acerr" id="shopErr" role="alert"></p>
  ${isNativeApp() ? `<button class="link small" id="billRestore">${esc(b.restore)}</button>` : ""}<button class="link" id="closeLayer">${tt.close}</button></div></div>`;
  trackOnce("negozio-tani-aperto"); if (src) trackOnce("negozio-tani-da-" + src);
  if (anim) { G.from(".tshop", { y: 60, opacity: 0, duration: 0.4, ease: "power3.out" }); G.from(".pack", { scale: 0.7, opacity: 0, duration: 0.45, stagger: 0.06, ease: "back.out(2)", delay: 0.1 }); }
  if (isNativeApp()) loadProducts().then(shopPrices).catch(() => { const e = document.getElementById("shopErr"); if (e) e.textContent = b.unavail; document.querySelectorAll("[data-pp]").forEach((x) => { x.innerHTML = ""; }); document.querySelectorAll(".pack").forEach((x) => { x.disabled = true; }); });
};
function shopPrices() {
  document.querySelectorAll("[data-pp]").forEach((x) => { const id = BILL.PACK_IDS[+x.dataset.pp]; const pr = billProducts.packs[id]; x.textContent = pr ? pr.price : ""; const btn = x.closest(".pack"); if (btn) btn.disabled = !pr; });
}

/* --- Tocchi (prima dei vecchi gestori, che mostravano i "presto in arrivo") --- */
window.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  const stop = () => { ev.stopImmediatePropagation(); ev.preventDefault(); };
  if (b.dataset.plan && b.closest(".plusbox")) { stop(); plusPlan = b.dataset.plan; billLabels(); SND.play("click"); return; }
  if (b.id === "billRetry") { stop(); const f = document.getElementById("plusFoot"); if (f) f.innerHTML = `<p class="small muted ploading"><span class="spin" aria-hidden="true"></span>${esc(L().acct.wait)}</p>`; loadProducts(true).then(plusFoot).catch(plusFootErr); return; }
  if (b.id === "billRestore") { stop(); if (billBusy) return; billBusy = true; b.disabled = true; syncPurchases(true).finally(() => { billBusy = false; b.disabled = false; if (plusActive() && layer.querySelector(".plusbox")) { const after = plusAfter; closeLayer(); if (after) after(); } }); return; }
  if (b.id === "plusGo") {
    stop(); if (billBusy || !billProducts) return; const pl = billProducts.plans[plusPlan]; if (!pl) return;
    billBusy = true; b.disabled = true; trackOnce(`plus-cassa-${plusPlan === "year" ? "annuale" : "mensile"}`);
    buyThing(BILL.SUB, pl.trialToken || pl.token).then((list) => handlePurchases(list, true)).then((k) => {
      if (k === "plus") { trackOnce(`plus-acquistato-${plusPlan === "year" ? "annuale" : "mensile"}`); const after = plusAfter; closeLayer(); toast(BT().thanksPlus(S.petName)); SND.play("fanfare"); burst("confetti", 30); render(); if (after) setTimeout(after, 300); }
    }).catch((e) => { const c = (e && e.code) || ""; if (c === "owned") { syncPurchases(false); toast(BT().owned); } else if (c !== "cancelled") toast(errBill(e)); })
      .finally(() => { billBusy = false; const g = document.getElementById("plusGo"); if (g) g.disabled = false; });
    return;
  }
  if (b.dataset.pack !== undefined && b.closest(".tshop")) {
    stop(); if (!isNativeApp() || billBusy || !billProducts) return; const id = BILL.PACK_IDS[+b.dataset.pack]; if (!billProducts.packs[id]) return;
    billBusy = true; b.disabled = true; trackOnce("tani-cassa-" + PACKS[+b.dataset.pack].n);
    buyThing(id, null).then((list) => handlePurchases(list, true)).then(() => { render(); const n = document.getElementById("seedN"); if (n) n.textContent = S.seeds; })
      .catch((e) => { const c = (e && e.code) || ""; if (c === "owned") syncPurchases(false); else if (c !== "cancelled") { const er = document.getElementById("shopErr"); if (er) er.textContent = errBill(e); } })
      .finally(() => { billBusy = false; b.disabled = false; });
    return;
  }
}, true);

/* --- Altro: il riquadro di Plus dice se e' attivo, con il collegamento per gestire l'abbonamento --- */
const _viewMoreV14b = viewMore;
viewMore = function () {
  let h = _viewMoreV14b(); if (!plusActive()) return h; const b = BT();
  return h.replace(/<button class="pluscard" id="plusCard">[\s\S]*?<\/button>/, `<div class="pluscard on"><span class="pcrown">${icon("p_crown")}</span><span><b>${esc(b.active)}</b><small>${esc(b.manageP)}</small></span></div><a class="link small pmanage" href="${SUBS_URL}" target="_blank" rel="noopener">${esc(b.manage)} ›</a>`);
};
