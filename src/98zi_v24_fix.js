/* ===== 1.0.9: correzioni finali prima di Google Play =====
   Dalle 5 verifiche finali (politiche, Android, aspetto e accessibilita', funzioni, lingue) e dalle decisioni del
   proprietario (12/11/2026). Agganci come negli altri strati: niente "render =", osservatori e funzioni avvolte. */

/* ---------- 1) MOMENTI 3D DI OGNI COMPAGNO ----------
   Decisione del proprietario: ogni compagno festeggia con le sue pose (img/m/<compagno>/<posa>.webp, stesse misure di
   Germo). Se un file mancasse si usa la posa di Germo. La corona (prima mai usata) va nel resoconto del mese. */
const POSES3D = ["wave", "gift", "love", "crown", "depart", "return", "reading", "postcard", "celebrate", "levelup"];
moment3d = function (pose, cls, pet) {
  const p = pet || S.pet || "germo";
  if (p !== "germo" && PETS3D.includes(p) && POSES3D.includes(pose)) return img3d(`m/${p}/${pose}.webp`, "mom " + (cls || ""), "", 512, 512, true);
  return img3d(`m/${pose}.webp`, "mom " + (cls || ""), "", 512, 512, true);
};
P3_LAYER.push([".repbox .rppet", "crown"]);
/* Stagione delle Lanterne (quella di adesso, 3/10-31/12): anche lei in 3D come stelle, aquiloni e Natale */
const _seasonBannerV24 = seasonBanner;
seasonBanner = function (se, big) { const k = seaKind(se); if (k === "stars" || k === "kites") return _seasonBannerV24(se, big); try { return ban3d("lanterns", big); } catch (e) { return _seasonBannerV24(se, big); } };

/* ---------- 2) FINESTRE: il fuoco entra, resta dentro e torna dove era (WCAG 2.4.3) ----------
   Un solo punto per tutte le finestre (#layer, festa dei trofei, "Vuoi uscire?"): quando ne compare una, il resto della
   pagina diventa "inert" (Tab, lettori di schermo e Switch Access restano nella finestra), il fuoco va sul titolo; quando
   si chiude, il fuoco torna sull'elemento di prima (o sulla scheda attiva in basso). */
let fmOpen = null, fmLast = null, fmKb = false;
document.addEventListener("keydown", () => { fmKb = true; }, true);
document.addEventListener("pointerdown", () => { fmKb = false; }, true);
const fmTabs = () => document.getElementById("tabs");
function fmDialog() {
  const tp = document.getElementById("trParty"); if (tp) return tp;
  const ex = document.getElementById("exitAsk"); if (ex) return ex;
  const ov = layer.querySelectorAll('[role="dialog"][aria-modal="true"]'); return ov.length ? ov[ov.length - 1] : null;
}
const fmFocusables = (d) => [...d.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((x) => !x.disabled && x.tabIndex >= 0 && !x.closest("[hidden]") && x.getClientRects().length); /* 1.0.11: solo cio' che Tab raggiunge davvero (prima anche i tabindex=-1 e le <image href> delle illustrazioni: il primo/ultimo "vero" sfuggiva) */
function fmFocusIn(d) {
  const id = d.getAttribute("aria-labelledby"); let h = id ? document.getElementById(id.split(" ").pop()) : null;
  if (!h || !d.contains(h)) h = d.querySelector("h1, h2"); if (!h) h = fmFocusables(d)[0];
  if (!h) return; if (!h.matches("button, [href], input, select, textarea, [tabindex]")) h.setAttribute("tabindex", "-1");
  try { h.focus({ preventScroll: true }); } catch (e) { /* niente */ }
}
function fmSync() {
  const d = fmDialog();
  if (d && d === fmOpen) { if (!d.contains(document.activeElement)) fmFocusIn(d); return; }
  if (d && !fmOpen) { const a = document.activeElement; fmLast = a && a !== document.body && !d.contains(a) ? a : null; }
  const was = fmOpen; fmOpen = d;
  [app, fmTabs(), layer].forEach((x) => { if (!x) return; if (d && !x.contains(d)) x.setAttribute("inert", ""); else x.removeAttribute("inert"); });
  if (d) { if (!d.contains(document.activeElement)) fmFocusIn(d); return; }
  if (!was) return;
  /* chiusa: il fuoco torna dov'era (un campo di testo solo da tastiera: col tocco aprirebbe la tastiera del telefono) */
  const a = document.activeElement; if (a && a !== document.body && a.isConnected && !a.closest("[inert]")) return;
  const l = fmLast; fmLast = null;
  const ok = l && l.isConnected && !l.closest("[inert], [hidden]") && l.getClientRects().length && (fmKb || !l.matches("input, textarea, select"));
  try { if (ok) l.focus({ preventScroll: true }); else { const t = document.querySelector("#tabsIn .tab.on, #tabsIn [aria-current]"); if (t && fmKb) t.focus({ preventScroll: true }); } } catch (e) { /* niente */ }
}
document.addEventListener("keydown", (ev) => {
  if (ev.key !== "Tab" || !fmOpen || !fmOpen.isConnected) return;
  const f = fmFocusables(fmOpen); if (!f.length) { ev.preventDefault(); return; }
  const first = f[0], last = f[f.length - 1], a = document.activeElement;
  if (!fmOpen.contains(a)) { ev.preventDefault(); (ev.shiftKey ? last : first).focus(); return; }
  if (ev.shiftKey && (a === first || !f.includes(a) && a.compareDocumentPosition(first) & 4)) { ev.preventDefault(); last.focus(); }
  else if (!ev.shiftKey && a === last) { ev.preventDefault(); first.focus(); }
}, true);
let fmQ = false;
const fmKick = () => { if (fmQ) return; fmQ = true; queueMicrotask(() => { fmQ = false; try { fmSync(); } catch (e) { /* niente */ } }); };
try {
  new MutationObserver(fmKick).observe(layer, { childList: true });
  new MutationObserver(fmKick).observe(document.body, { childList: true });
} catch (e) { /* niente */ }
/* inizio: a ogni passo il fuoco va sul titolo del passo (prima restava su <body>) */
let onbFk = "";
try {
  new MutationObserver(() => {
    if (S.pet) { onbFk = ""; return; }
    const k = `${S.onboard}|${document.getElementById("userName") ? 1 : 0}`; if (k === onbFk) return; const first = !onbFk; onbFk = k;
    if (first || fmOpen) return; const a = document.activeElement; if (a && a !== document.body && app.contains(a)) return;
    const h = app.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) { /* niente */ } }
  }).observe(app, { childList: true, subtree: true });
} catch (e) { /* niente */ }

/* ---------- 3) SERIE: i giorni senza obiettivi previsti non la interrompono, anche senza aprire l'app ----------
   Prima un fine settimana libero (obiettivi solo dal lunedi' al venerdi') senza aprire l'app azzerava la serie: il
   "giorno libero" si scriveva solo aprendo l'app quel giorno. Ora, al primo avvio di un giorno nuovo, i giorni saltati
   senza nessun obiettivo previsto si segnano come liberi (gli obiettivi non possono essere cambiati ad app chiusa, quindi
   quelli di oggi sono gli stessi di quei giorni). Vale anche per chi arriva dalla 1.0.8. */
function freeDaysFill() {
  if (!S.pet || !S.day || !Array.isArray(S.goals)) return 0; const t = dkey(); if (S.day >= t) return 0;
  const d = ldate(S.day); let n = 0; S.days = S.days || {};
  for (let i = 0; i < 400; i++) {
    d.setDate(d.getDate() + 1); const k = dkey(d); if (k >= t) break;
    if (S.days[k]) continue; const wd = wdIdx(d);
    if (!S.goals.some((g) => Array.isArray(g.days) && g.days.includes(wd))) { S.days[k] = { done: 0, total: 0, rest: false, free: true }; n++; }
  }
  return n;
}
const _rollDayV24 = rollDay;
rollDay = function () { try { if (freeDaysFill()) save(); } catch (e) { /* niente */ } return _rollDayV24(); };

/* ---------- 4) INIZIO: la schermata dell'eta' arriva da sola, prima dei tre consigli ----------
   Prima "Questo e' Germo!" poteva comparire sopra la schermata dell'eta' (gara tra i due). Ora i consigli aspettano la
   risposta (o "Preferisco non dirlo"); se una finestra e' aperta, il consiglio non si mostra e riprova dopo. */
const agePending = () => !window.__TEST_NOAGE && typeof ageDismissed !== "undefined" && !ageDismissed && S.pet && S.age === undefined;
const _maybeTutorialV24 = maybeTutorial;
maybeTutorial = function () { if (agePending() || layer.innerHTML.trim()) return; return _maybeTutorialV24(); };
try {
  new MutationObserver(() => {
    if (!document.querySelector(".tutwrap") || !layer.innerHTML.trim()) return;
    tutClose(false); setTimeout(() => { try { maybeTutorial(); } catch (e) { /* niente */ } }, 900);
  }).observe(document.body, { childList: true });
} catch (e) { /* niente */ }

/* ---------- 5) VIDEO nel negozio dei Tanì / "ti mancano": il pulsante torna appena il video dopo e' pronto ---------- */
const _adsLoadV24 = adsLoad;
adsLoad = function () {
  const r = _adsLoadV24();
  Promise.resolve(r).then(() => {
    try {
      if (!adsSt.loaded || document.getElementById("adShop")) return; const b = adShopBtn(); if (!b) return;
      const ts = layer.querySelector(".tshop"), nd = layer.querySelector(".ndsheet");
      if (ts) { const c = ts.querySelector("#closeLayer"); if (c) c.insertAdjacentHTML("beforebegin", b); else ts.insertAdjacentHTML("beforeend", b); }
      else if (nd) { const k = nd.querySelector("#ndKeep"); if (k) k.insertAdjacentHTML("afterend", b); }
    } catch (e) { /* niente */ }
  });
  return r;
};

/* ---------- 6) COREANO: particelle giuste dopo i nomi ----------
   I testi coreani scrivevano "Germo이(가)", "Germo은(는)": ora si sceglie la particella dall'ultima sillaba (batchim);
   per i nomi in lettere latine si usa la pronuncia coreana piu' comune (vocale finale: 가/는/를/와/로). */
function koBat(ch) {
  const c = ch.charCodeAt(0);
  if (c >= 0xAC00 && c <= 0xD7A3) { const j = (c - 0xAC00) % 28; return j === 0 ? 0 : j === 8 ? 2 : 1; }
  if (/[0-9]/.test(ch)) return [1, 2, 0, 1, 0, 0, 1, 2, 2, 0][+ch];
  return 0;
}
function koLast(s, i) {
  for (let k = i - 1; k >= 0; k--) { const ch = s[k]; if (/[’'"”」』)\]\s.]/.test(ch)) continue; return k; }
  return -1;
}
const KO_RE = /(\(으\)로|이\(가\)|가\(이\)|은\(는\)|는\(은\)|을\(를\)|를\(을\)|와\(과\)|과\(와\)|아\(야\))/g;
function koFix(s) {
  if (!s || s.indexOf("(") < 0) return s;
  return String(s).replace(KO_RE, (m, _p, off, all) => {
    const k = koLast(all, off); let b = 0;
    if (k >= 0) { const ch = all[k]; if (/[A-Za-z]/.test(ch)) { const w = all.slice(Math.max(0, k - 1), k + 1).toLowerCase(); b = /[lr]$/.test(w) && w.endsWith("l") ? 2 : /(m|n|ng)$/.test(w) ? 1 : 0; } else b = koBat(ch); }
    if (m === "(으)로") return b === 1 ? "으로" : "로";
    const pair = { "이(가)": ["이", "가"], "가(이)": ["이", "가"], "은(는)": ["은", "는"], "는(은)": ["은", "는"], "을(를)": ["을", "를"], "를(을)": ["을", "를"], "와(과)": ["과", "와"], "과(와)": ["과", "와"], "아(야)": ["아", "야"] }[m];
    return b ? pair[0] : pair[1];
  });
}
function koWalk(root) {
  if (S.lang !== "ko" || !root) return;
  if (root.nodeType === 3) { if (KO_RE.test(root.data)) { KO_RE.lastIndex = 0; root.data = koFix(root.data); } KO_RE.lastIndex = 0; return; }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (root.nodeType === 1) ["aria-label", "placeholder", "title"].forEach((a) => { const v = root.getAttribute && root.getAttribute(a); if (v && v.includes("(")) root.setAttribute(a, koFix(v)); });
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { if (n.data.indexOf("(") >= 0) { const f = koFix(n.data); if (f !== n.data) n.data = f; } }
  if (root.querySelectorAll) root.querySelectorAll("[aria-label*='('], [placeholder*='(']").forEach((el) => ["aria-label", "placeholder"].forEach((a) => { const v = el.getAttribute(a); if (v) el.setAttribute(a, koFix(v)); }));
}
try {
  new MutationObserver((ms) => { if (S.lang !== "ko") return; for (const m of ms) { if (m.type === "characterData") koWalk(m.target); else m.addedNodes.forEach(koWalk); } })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  if (S.lang === "ko") koWalk(document.body);
} catch (e) { /* niente */ }

/* ---------- 7) ALBUM: si apre sulla pagina della cartolina appena arrivata ---------- */
const _openAlbumV24 = openAlbum;
openAlbum = function (key) {
  try {
    const c = S.cards || []; const last = c[c.length - 1];
    if (!key && last && S.albumSeen !== last) { const pg = albumPages().find((p) => p.cards.includes(last) && !(p.fant && S.level < p.lvl)); if (pg) key = pg.key; S.albumSeen = last; save(); }
  } catch (e) { /* niente */ }
  return _openAlbumV24(key);
};

/* ---------- 8) primo giorno piu' tranquillo: il papillon in regalo arriva dal secondo giorno ----------
   Prima, nel primo minuto: 3 consigli, eta', due regali e subito dopo il papillon (5 finestre). Chi aveva gia' l'app
   (primo giorno passato) non cambia nulla. */
const _w20GiftReadyV24 = w20GiftReady;
w20GiftReady = function () { if (S.welcomeGift && S.welcomeGift === dkey()) return false; return _w20GiftReadyV24(); }; /* primo giorno = regalo di benvenuto ricevuto oggi */

/* ---------- 9) questionario dei tester: a bambini e ragazzi non si chiede "Prenderesti Tanetto Plus?" ---------- */
const svPlusQ = () => { const q = (L().survey || {}).q || []; return q.findIndex((x) => /Plus/.test(x.t)); };
const svMinor = () => typeof ageBand === "function" && ageBand() !== "adult";
const _renderSurveyV24 = renderSurvey;
renderSurvey = function (still) {
  const pq = svPlusQ(), n = ((L().survey || {}).q || []).length;
  if (svMinor() && pq >= 0 && svStep === pq) { svAns[pq] = []; svStep = Math.min(n - 1, svStep + 1); }
  _renderSurveyV24(still);
  try {
    if (!svMinor() || pq < 0) return; const t = L().survey; const vis = svStep + 1 - (svStep > pq ? 1 : 0);
    const st = layer.querySelector(".svhead .small"); if (st) st.textContent = t.step(vis, n - 1);
    const dots = layer.querySelectorAll(".svdots i"); if (dots[pq]) dots[pq].remove();
  } catch (e) { /* niente */ }
};

/* ---------- 10) testi e finestre: piccoli ritocchi ---------- */
/* informativa: il riassunto "In breve" in un riquadro */
const _openDocV24 = openDoc;
openDoc = function (k) { const r = _openDocV24(k); try { if (k === "privDoc") { const p = layer.querySelector(".docbox .doc p"); if (p) p.classList.add("pshort"); } } catch (e) { /* niente */ } return r; };
/* festa del trofeo: il lettore di schermo dice "Nuovo trofeo: Germoglio" (prima solo il nome) */
try {
  new MutationObserver(() => { const tp = document.getElementById("trParty"); if (!tp || tp.dataset.v24) return; tp.dataset.v24 = "1"; const k = tp.querySelector(".trkick"); if (k) { k.id = "trpK"; tp.setAttribute("aria-labelledby", "trpK trpT"); } }).observe(document.body, { childList: true });
} catch (e) { /* niente */ }
/* Plus e negozio dei Tanì: "Chiudi" diventa una striscia piena quando si scorre */
/* (il negozio dei Tanì e' un foglio dal basso: a scorrere e' la finestra intorno, non il foglio) */
document.addEventListener("scroll", (ev) => {
  const b = ev.target; if (!b || !b.classList) return;
  if (b.classList.contains("plusbox") || b.classList.contains("tshop")) { b.classList.toggle("scrolled", b.scrollTop > 6); return; }
  if (b.classList.contains("overlay")) { const t = b.querySelector(":scope > .tshop"); if (t) t.classList.toggle("scrolled", b.scrollTop > 6); }
}, true);

/* ---------- 11) senza internet (sito installato): una cartolina mai vista mostra il disegno di prima, non un'immagine rotta ---------- */
const _pc3dV24 = pc3d;
pc3d = function (key, i, label) { const h = _pc3dV24(key, i, label); return h ? h.replace('class="pc3">', `class="pc3" data-pk="${esc(key)}" data-pi="${Math.abs(i | 0)}">`) : h; };
document.addEventListener("error", (ev) => {
  const t = ev.target; if (!t || !t.tagName) return;
  try {
    if (t.tagName.toLowerCase() === "image") {
      const sv = t.closest("svg.pc3"); if (!sv || !sv.dataset.pk) return; const k = sv.dataset.pk, i = +sv.dataset.pi || 0, lb = sv.getAttribute("aria-label") || "";
      const id = k.slice(2); const fb = k[0] === "f" ? _postcardP3(id, i, lb) : k[0] === "v" ? _worldArtP3(id, i, lb) : _realArtP3(id, lb);
      if (fb) sv.outerHTML = fb; return;
    }
    if (t.tagName === "IMG" && t.classList.contains("i3d")) t.style.visibility = "hidden";
  } catch (e) { /* niente */ }
}, true);

/* ---------- 12) benvenuto: il fuoco va sul titolo, non nel campo del nome ----------
   Il nome e' facoltativo: col fuoco nel campo, su alcuni telefoni la tastiera si apriva subito sopra l'immagine di
   benvenuto. Il lettore di schermo ora parte dal titolo; il campo si tocca quando si vuole. */
nameFocus = function () {
  const h = app.querySelector(".namestep h1"); if (!h) return;
  h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e) { /* niente */ }
};

/* ---------- 13) negozio dei Tanì: a bambini e ragazzi niente "Conviene di piu'" anche quando arrivano i prezzi ----------
   (i prezzi di Google Play arrivano dopo l'apertura e packDecorate rimetteva l'etichetta) */
const _packDecorateV24 = packDecorate;
packDecorate = function () { const r = _packDecorateV24(); try { if (typeof ageBand === "function" && ageBand() !== "adult") document.querySelectorAll(".tshop .pack .pbadge").forEach((x) => x.remove()); } catch (e) { /* niente */ } return r; };
