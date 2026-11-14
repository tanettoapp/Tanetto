/* =================== VERSIONE 5: giochi di benessere, condivisione, informative =================== */
const OWNER_NAME = "", OWNER_EMAIL = "tanettoapp@gmail.com";
const PRIVACY_DATE = "2026-11-14"; /* 1.0.11: interruttore delle statistiche e condizioni d'uso aggiornate (3zzk_v26_texts.js) */
let pendingGoals = [], exprTimer = null;

function fadeLayer() {
  const o = layer.firstElementChild;
  if (o && anim) { const g = o.cloneNode(true); g.removeAttribute("id"); g.querySelectorAll("[id]").forEach((x) => x.removeAttribute("id")); g.style.pointerEvents = "none"; document.body.appendChild(g); G.to(g, { opacity: 0, duration: 0.2, onComplete: () => g.remove() }); const inner = g.firstElementChild; if (inner) G.to(inner, { scale: 0.96, y: 8, duration: 0.2 }); }
  layer.innerHTML = "";
}
function pend(g) { if (todayGoals().includes(g) && !S.done.includes(g) && !pendingGoals.includes(g)) pendingGoals.push(g); }
function flushPending() {
  if (!pendingGoals.length) return; const list = pendingGoals; pendingGoals = [];
  tab = "today"; render();
  list.forEach((g, i) => setTimeout(() => { if (!S.done.includes(g)) completeGoal(g); }, 350 + i * 900));
}
function awardGameSeeds(n) {
  const e = Math.max(0, Math.min(Math.round(n), gameSeedsLeft()));
  const prev = today(S.game) ? S.game : { day: S.day, seeds: 0, best: (S.game && S.game.best) || 0 };
  S.game = { day: S.day, seeds: prev.seeds + e, best: prev.best || 0 }; S.seeds += e; save(); return e;
}
function petAmbient(c) {
  if (!anim || !c) return;
  c.querySelectorAll(".body").forEach((b) => ambient.push(G.to(b, { scaleY: 0.975, scaleX: 1.015, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  c.querySelectorAll(".eyes").forEach((e) => { const tl = G.timeline({ repeat: -1, repeatDelay: 2.6 + Math.random() * 2.5 }); tl.to(e, { scaleY: 0.08, duration: 0.07 }).to(e, { scaleY: 1, duration: 0.1 }); ambient.push(tl); });
  c.querySelectorAll(".sprout").forEach((s) => ambient.push(G.to(s, { rotation: 4, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  c.querySelectorAll(".tail").forEach((s) => ambient.push(G.to(s, { rotation: -8, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  c.querySelectorAll(".wings").forEach((s) => ambient.push(G.to(s, { scaleY: 0.86, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" })));
}
function setExpr(e, ms = 1800) {
  const p = document.getElementById("petInner"); if (!p) return;
  const glow = S.pet === "lumi" ? 0.3 + 0.65 * (S.energy / 100) : null;
  p.innerHTML = petInner(S.pet, e, S.hat, stage(), glow); petAmbient(p);
  clearTimeout(exprTimer);
  exprTimer = setTimeout(() => { const q = document.getElementById("petInner"); if (q) { q.innerHTML = petInner(S.pet, petExpr(), S.hat, stage(), glow); petAmbient(q); } }, ms);
}

/* --- Condivisione --- */
function stripSvg(str) { const m = str.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>\s*$/); return m ? { vb: m[1], inner: m[2] } : { vb: "0 0 100 100", inner: "" }; }
async function makeCard({ art, w, h, title, sub }) {
  const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo; const a = stripSvg(art); const x = (1080 - w) / 2, y = Math.max(150, Math.round((1290 - (h + 230)) / 2));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><defs><linearGradient id="cbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient><clipPath id="cart"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40"/></clipPath></defs><rect width="1080" height="1350" fill="url(#cbg)"/><circle cx="90" cy="130" r="150" fill="#fff" opacity=".22"/><circle cx="1000" cy="1270" r="190" fill="#fff" opacity=".2"/><rect x="66" y="72" width="960" height="1230" rx="56" fill="#000" opacity=".08"/><rect x="60" y="60" width="960" height="1230" rx="56" fill="#FFFBF4"/><rect x="80" y="80" width="920" height="1190" rx="42" fill="none" stroke="${pal[1]}" stroke-width="4" stroke-dasharray="14 12"/><g clip-path="url(#cart)"><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${a.vb}">${a.inner}</svg></g></svg>`;
  const img = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  try { await Promise.all([document.fonts.load('600 60px "Fredoka"'), document.fonts.load('500 34px "Figtree"')]); } catch (e) { /* niente */ }
  const cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1350; const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
  const FD = '"Fredoka", "Trebuchet MS", Arial, sans-serif', FB = '"Figtree", "Segoe UI", Arial, sans-serif';
  c.textAlign = "center"; const ty = y + h + 120;
  let fs = 64; do { c.font = `600 ${fs}px ${FD}`; fs -= 2; } while (c.measureText(title).width > 860 && fs > 30);
  c.fillStyle = "#2F2A26"; c.fillText(title, 540, ty);
  if (sub) { let f2 = 36; do { c.font = `500 ${f2}px ${FB}`; f2--; } while (c.measureText(sub).width > 860 && f2 > 20); c.fillStyle = "#6E655D"; c.fillText(sub, 540, ty + 62); }
  c.font = `600 30px ${FD}`; c.fillStyle = pal[2]; c.fillText("Tanetto", 540, 1238);
  return cv.toDataURL("image/png");
}
async function shareImage(url, name) {
  try {
    const blob = await (await fetch(url)).blob(); const file = new File([blob], name, { type: blob.type || "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Tanetto", text: L().shareText }); trackOnce("condivisione"); return true; }
  } catch (e) { if (e && e.name === "AbortError") return true; }
  return false;
}
async function shareFlow(build, name) {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="shT"><div class="box"><h2 id="shT">${t.share}</h2><div id="shOut" style="width:100%"></div><p class="small muted" id="shMsg" aria-live="polite">${t.shareMaking}</p><button class="btn ghost" id="closeLayer">${t.close}</button></div></div>`;
  try {
    const url = await build(); const out = document.getElementById("shOut"); if (!out) return;
    out.innerHTML = `<img class="weekimg" src="${url}" alt="${esc(t.shareText)}">` + imgButtons(name);
    if (anim) G.from(out.firstChild, { scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(1.6)" });
    const m = document.getElementById("shMsg"); if (m) m.textContent = t.saveHint;
  } catch (e) { const m = document.getElementById("shMsg"); if (m) m.textContent = t.weekErr; }
}
function shareLevelCard() {
  const t = L(); const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo;
  return shareFlow(() => makeCard({ art: `<svg viewBox="0 0 200 200"><circle cx="100" cy="112" r="94" fill="${pal[0]}"/>${petInner(S.pet, "felice", S.hat, stage(), 0.95)}</svg>`, w: 640, h: 640, title: t.levelUpT(S.level), sub: t.shareLevel(S.petName, S.level) }), "tanetto-livello.png");
}
function shareRecordCard(score) {
  const t = L();
  const stars = [...Array(14)].map((_, i) => `<circle cx="${(i * 47) % 200}" cy="${(i * 29) % 90 + 6}" r="${i % 3 ? 1 : 1.6}" fill="#FFF6D6"/>`).join("");
  const art = `<svg viewBox="0 0 200 150"><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26305E"/><stop offset=".7" stop-color="#5C4A7A"/><stop offset="1" stop-color="#F2A07A"/></linearGradient></defs><rect width="200" height="150" fill="url(#rg)"/>${stars}<path d="M40 30l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#FFC94D"/><path d="M160 40l2.4 5 5.6.6-4 3.6 1 5.5-5-2.6-5 2.6 1-5.5-4-3.6 5.6-.6Z" fill="#FFE7A0"/><g transform="translate(62 62) scale(.38)">${petInner(S.pet, "felice", S.hat, stage(), 0.95)}</g></svg>`;
  return shareFlow(() => makeCard({ art, w: 880, h: 660, title: t.shareRecord(score), sub: t.games.stars[0] }), "tanetto-record.png");
}
function sharePostcard(ck) {
  const c = cardInfo(ck);
  return shareFlow(() => makeCard({ art: c.art(), w: 880, h: 550, title: c.title, sub: c.place || "" }), "tanetto-cartolina.png");
}

/* --- Merenda insieme --- */
function offerTogether() {
  if (layer.innerHTML || tab !== "today") return;
  const t = L(); const opts = ["water", "fruit", "veggies"].filter((g) => todayGoals().includes(g) && !S.done.includes(g));
  if (!opts.length) { say(t.together, 3000); return; }
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="toT"><div class="sheet"><div class="grab"></div><h2 id="toT">${t.together}</h2>${opts.map((g) => `<button class="btn ghost block" data-tgoal="${g}">${esc(t.togetherBtn(goalText(g)))}</button>`).join("")}<button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".sheet", { y: 260, duration: 0.4, ease: "power3.out" });
}

/* --- Rituale della buonanotte --- */
function openRitual() {
  const t = L(); const map = ["dim", "nophone", "gratitude"];
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="riT"><div class="box card ritual"><div style="width:110px">${petSVG(S.pet, "assonnato", S.hat, stage(), S.petName)}</div><h2 id="riT">${t.ritualT}</h2><p class="small muted">${t.ritualP}</p><div class="stack-s" style="width:100%">${t.ritual.map((r, i) => `<button class="ritem" aria-pressed="false" data-ritual="${map[i]}"><span class="tick"></span>${esc(r)}</button>`).join("")}</div><button class="btn block" id="ritualGo">${t.ritualB}</button><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".ritual", { y: 30, opacity: 0, duration: 0.4, ease: "power3.out" });
}

/* --- Hub dei giochi --- */
const GAMES = ["calm", "wave", "stretch", "letgo", "garden", "stars", "sing", "memory", "tricks"];
const GCOL = { calm: "#5FA8A0", stars: "#6A5FC8", wave: "#3E9BC7", stretch: "#E6874A", letgo: "#8C7FE0", garden: "#4FA86A", sing: "#E2668E", memory: "#B98A55", tricks: "#E9A23B" };
const GICON = {
  calm: '<circle cx="12" cy="12" r="8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/>',
  stars: '<path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.6L12 17.1l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8Z" fill="#fff"/>',
  wave: '<path d="M2 14c3 0 3-4 6-4s3 4 6 4 3-4 6-4 2 2 2 2" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M2 19c3 0 3-3 6-3s3 3 6 3 3-3 6-3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>',
  stretch: '<circle cx="12" cy="4.5" r="2.2" fill="#fff"/><path d="M4 7l8 3 8-3M12 10v5l-3 6M12 15l3 6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  letgo: '<circle cx="12" cy="10" r="7" fill="none" stroke="#fff" stroke-width="2"/><circle cx="9.5" cy="7.5" r="1.6" fill="#fff"/><path d="M12 17v4" stroke="#fff" stroke-width="1.6" stroke-dasharray="1.5 2" stroke-linecap="round"/>',
  garden: '<path d="M12 21v-7" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M12 15c-3 0-5-2-5-4 2 0 5 1 5 4Zm0 0c3 0 5-2 5-4-2 0-5 1-5 4Z" fill="#fff"/><circle cx="12" cy="7" r="3.2" fill="#fff"/>',
  sing: '<path d="M9 18V6l10-2v12" stroke="#fff" stroke-width="2" fill="none" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" fill="#fff"/><circle cx="16.5" cy="16" r="2.5" fill="#fff"/>',
  memory: '<ellipse cx="8" cy="13" rx="5" ry="4" fill="#fff"/><ellipse cx="16.5" cy="11" rx="5" ry="4" fill="#fff" opacity=".75"/>',
  tricks: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" fill="#fff"/><circle cx="18.5" cy="18" r="1.6" fill="#fff"/><circle cx="5.5" cy="18.5" r="1.1" fill="#fff"/>'
};
function openHub() {
  const t = L(); const used = today(S.game) ? S.game.seeds : 0;
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="hbT"><div class="sheet hub"><div class="grab"></div><h2 id="hbT">${t.gamesT}</h2><p class="small muted">${t.gamesP}</p><p class="small" style="font-weight:700;color:var(--seed)">${t.gameSeedsInfo(used, GAME_SEEDS_MAX)}</p><div class="hubgrid">${GAMES.map((g) => `<button class="hubcard" data-game="${g}"><span class="hubic" style="background:${GCOL[g]}"><svg viewBox="0 0 24 24" aria-hidden="true">${GICON[g]}</svg></span><b>${t.games[g][0]}</b><span>${t.games[g][1]}</span></button>`).join("")}</div><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) { G.from(".sheet", { y: 400, duration: 0.45, ease: "power3.out" }); G.from(".hubcard", { y: 20, opacity: 0, stagger: 0.04, duration: 0.35, delay: 0.15, ease: "power2.out", clearProps: "all" }); }
}
function shell(key, inner, pill = "") {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="gT"><div class="gamebox"><div class="ghead"><h2 id="gT">${t.games[key][0]}</h2>${pill}</div>${inner}<button class="link" id="closeGame">${t.close}</button></div></div>`;
  if (anim) G.from(".gamebox", { scale: 0.9, opacity: 0, duration: 0.35, ease: "back.out(1.7)" });
  game = { timers: [], tweens: [], over: false, kind: key };
}
function seedsLine(e) { return e ? L().gameSeeds(e) : gameSeedsLeft() <= 0 ? L().gameSeeds(0) : ""; }
function startScreen(text, extra = "") { return `<div class="gstart" id="gStart"><p>${text}</p>${extra}<button class="btn" id="gBegin">${L().start}</button></div>`; }
function openGameKey(k) {
  const t = L(); const pet = petSVG(S.pet, "felice", S.hat, stage(), S.petName);
  if (k === "stars") { openGame(); return; }
  if (k === "tricks") { openTricks(); return; }
  if (k === "calm") { openCalm(); return; }
  if (k === "letgo") {
    shell("letgo", `<div class="arena calm" id="arena"><div class="gpet">${pet}</div></div><p class="small muted" id="lgMsg">${t.letgoP}</p><div class="inline"><input id="lgIn" maxlength="80" autocomplete="off" placeholder="${esc(t.letgoPh)}" aria-label="${esc(t.games.letgo[0])}"><button class="btn small" id="lgGo">${t.letgoB}</button></div>`);
    return;
  }
  if (k === "garden") {
    shell("garden", `<div class="gardenwrap" id="gardenArt">${gardenSVG(S.garden || [])}</div><p class="small" style="font-weight:700" id="gCountTxt">${(S.garden || []).length ? t.gardenN(S.garden.length) : t.gardenEmpty}</p><p class="small muted" id="gdMsg">${t.gardenP}</p><div class="inline"><input id="gdIn" maxlength="80" autocomplete="off" placeholder="${esc(t.gardenPh)}" aria-label="${esc(t.games.garden[0])}"><button class="btn small" id="gdGo">${t.gardenB}</button></div>${gardenList()}<button class="btn ghost" id="shareGarden">${t.share}</button>`);
    return;
  }
  if (k === "wave") {
    shell("wave", `<div class="arena wavearena" id="arena"><div class="wcirc" id="wCirc"><div class="wpet">${pet}</div></div><p class="wlbl" id="wLbl"></p>${startScreen(t.waveP)}</div>`, `<span class="pill" id="gScore">${t.waveScore(0)}</span>`);
    return;
  }
  if (k === "sing") {
    shell("sing", `<div class="arena singarena" id="arena"><div class="spet" id="sPet">${pet}</div><p class="wlbl" id="sLbl"></p><div class="flowers">${[0, 1, 2, 3].map((i) => `<button class="sflower f${i}" data-note="${i}" aria-label="${i + 1}" disabled><svg viewBox="0 0 40 40" aria-hidden="true">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="20" cy="9" rx="7" ry="9" transform="rotate(${a} 20 20)"/>`).join("")}<circle cx="20" cy="20" r="6.5" fill="#FFE7A0"/></svg></button>`).join("")}</div>${startScreen(t.singP)}</div>`, `<span class="pill" id="gScore">0</span>`);
    return;
  }
  if (k === "stretch") {
    shell("stretch", `<div class="arena stretcharena" id="arena"><div class="stwrap"><svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="8"/><circle id="stRing" cx="60" cy="60" r="54" fill="none" stroke="#E6874A" stroke-width="8" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="0" transform="rotate(-90 60 60)"/></svg><div class="stpet" id="stPet">${pet}</div></div><h3 id="stName"></h3><p id="stTxt" class="small"></p><p class="small muted" id="stStep"></p>${startScreen(t.stretchP)}</div>`);
    return;
  }
  if (k === "memory") {
    const syms = ["heart", "star", "moon", "leaf", "drop", "sun"]; const deck = syms.concat(syms).sort(() => Math.random() - 0.5);
    shell("memory", `<p class="small muted">${t.memP}</p><div class="mgrid" id="mGrid">${deck.map((s, i) => `<button class="mtile" data-mi="${i}" data-sym="${s}" aria-label="?"><span class="mback"></span><span class="mface">${pebbleSVG(s)}</span></button>`).join("")}</div>`, `<span class="pill" id="gScore">${t.memMoves(0)}</span>`);
    game.mem = { open: [], moves: 0, found: 0, lock: false };
    if (anim) G.from(".mtile", { scale: 0.3, opacity: 0, stagger: 0.04, duration: 0.4, ease: "back.out(2)" });
  }
}

/* Lascia andare */
function doLetgo() {
  const t = L(); const inp = document.getElementById("lgIn"); const v = inp.value.trim(); if (!v) { shake(inp); return; }
  inp.value = ""; const arena = document.getElementById("arena");
  const bub = document.createElement("div"); bub.className = "lgbubble"; bub.textContent = v; arena.appendChild(bub);
  SND.play("pop"); SND.haptic(10); trackOnce("lascia-andare");
  const H = arena.clientHeight;
  const done = () => { bub.remove(); SND.play("sparkle"); const m = document.getElementById("lgMsg"); if (m) m.textContent = t.letgoDone; addJoy(3); save(); const gp = arena.querySelector(".gpet"); if (gp && anim) G.fromTo(gp, { y: 0 }, { y: -16, duration: 0.2, yoyo: true, repeat: 1 }); const b = document.getElementById("lgGo"); if (b) b.textContent = t.letgoAgain; };
  if (!anim) { setTimeout(done, 400); return; }
  const tl = G.timeline({ onComplete: done });
  tl.fromTo(bub, { y: 0, scale: 0.3, opacity: 0 }, { y: -H * 0.25, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.6)" })
    .to(bub, { y: -H * 0.72, duration: 3.2, ease: "sine.inOut" })
    .to(bub, { x: 18, duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }, "<")
    .to(bub, { scale: 1.35, opacity: 0, duration: 0.25, ease: "power2.out" });
  game.tweens.push(tl);
}

/* Giardino della gratitudine */
const FLOWER_COL = ["#F2789B", "#FFC94D", "#9B8CF2", "#F28A3C", "#6FB7E8", "#F7A9C0", "#E2454A"];
function flowerSVG(i, x, y, cls) {
  const c = FLOWER_COL[i % FLOWER_COL.length], k = i % 4, h = 16 + (i * 7) % 12, cy = y - h;
  let head;
  if (k === 0) head = [0, 72, 144, 216, 288].map((a) => `<ellipse cx="${x}" cy="${cy - 5}" rx="3.2" ry="5" fill="${c}" transform="rotate(${a} ${x} ${cy})"/>`).join("") + `<circle cx="${x}" cy="${cy}" r="2.6" fill="#FFE7A0"/>`;
  else if (k === 1) head = `<path d="M${x - 5} ${cy + 3} L${x - 5} ${cy - 4} L${x - 2.5} ${cy - 1} L${x} ${cy - 6} L${x + 2.5} ${cy - 1} L${x + 5} ${cy - 4} L${x + 5} ${cy + 3} Q${x} ${cy + 7} ${x - 5} ${cy + 3} Z" fill="${c}"/>`;
  else if (k === 2) head = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse cx="${x}" cy="${cy - 5}" rx="1.8" ry="4.6" fill="#fff" transform="rotate(${a} ${x} ${cy})"/>`).join("") + `<circle cx="${x}" cy="${cy}" r="2.8" fill="${c}"/>`;
  else head = `<circle cx="${x}" cy="${cy}" r="5.2" fill="${c}"/><circle cx="${x - 1.8}" cy="${cy - 1.8}" r="1.6" fill="#fff" opacity=".45"/>`;
  return `<g transform="translate(${x} ${y}) scale(1.7) translate(${-x} ${-y})"><g class="${cls || ""}" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M${x} ${y} Q${x - 2} ${y - h / 2} ${x} ${cy}" stroke="#4E9A4A" stroke-width="1.8" fill="none"/><ellipse cx="${x + 3}" cy="${y - h / 2.4}" rx="3.4" ry="1.6" fill="#6DB36A" transform="rotate(-30 ${x + 3} ${y - h / 2.4})"/>${head}</g></g>`;
}
function gardenSVG(list, newIdx = -1) {
  const pos = list.map((_, i) => ({ i, x: 26 + ((i * 67 + (i * i) % 23) % 308), y: 168 + ((i * 37) % 60) })).sort((a, b) => a.y - b.y);
  let o = `<svg viewBox="0 0 360 240" role="img" aria-label="${esc(L().games.garden[0])}"><defs><linearGradient id="gsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEAF7"/><stop offset="1" stop-color="#FDF1DC"/></linearGradient></defs><rect width="360" height="240" fill="url(#gsk)"/><circle cx="300" cy="44" r="18" fill="#FFE48A"/><circle cx="300" cy="44" r="30" fill="#FFE48A" opacity=".25"/><g class="cloud"><ellipse cx="70" cy="50" rx="22" ry="9" fill="#fff" opacity=".9"/><ellipse cx="86" cy="44" rx="14" ry="10" fill="#fff" opacity=".9"/></g><path d="M0 140 Q90 110 180 132 T360 124 V240 H0 Z" fill="#A8D79D"/><path d="M0 170 Q120 146 240 166 T360 160 V240 H0 Z" fill="#8CC27A"/>`;
  for (let k = 0; k < 12; k++) o += `<path d="M${(k * 31) % 360} ${200 + (k * 13) % 36} q2 -6 4 0" stroke="#6DAE5E" stroke-width="1.4" fill="none"/>`;
  pos.forEach((p) => { o += flowerSVG(p.i, p.x, p.y, p.i === newIdx ? "newflower" : ""); });
  if (list.length > 4) o += `<g class="flyb" transform="translate(120 100)"><ellipse cx="-3" cy="0" rx="3.5" ry="2.6" fill="#F28AA6"/><ellipse cx="3" cy="0" rx="3.5" ry="2.6" fill="#F7A9C0"/><rect x="-.6" y="-3" width="1.2" height="6" rx=".6" fill="#5A3A2A"/></g>`;
  return o + `</svg>`;
}
function gardenList() {
  const t = L(); const g = (S.garden || []).slice().reverse().slice(0, 8);
  if (!g.length) return "";
  return `<div class="glist"><h3>${t.gardenList}</h3><ul>${g.map((f) => `<li><span class="gdot" style="background:${FLOWER_COL[f.i % FLOWER_COL.length]}"></span><span>${esc(f.t)}</span><time>${fmtDate(f.d)}</time></li>`).join("")}</ul></div>`;
}
function plantFlower() {
  const t = L(); const inp = document.getElementById("gdIn"); const v = inp.value.trim(); if (!v) { shake(inp); return; }
  S.garden = S.garden || []; const i = S.garden.length; S.garden.push({ t: v, d: dkey(), i }); if (S.garden.length > 80) S.garden.shift();
  addJoy(4); save(); pend("gratitude"); trackOnce("giardino");
  inp.value = ""; document.getElementById("gardenArt").innerHTML = gardenSVG(S.garden, i);
  document.getElementById("gCountTxt").textContent = t.gardenN(S.garden.length);
  document.getElementById("gdMsg").textContent = t.gardenDone;
  const gl = document.querySelector(".glist"); const html = gardenList(); if (gl) gl.outerHTML = html; else document.getElementById("gdMsg").insertAdjacentHTML("afterend", "");
  if (!gl) { const sb = document.getElementById("shareGarden"); if (sb) sb.insertAdjacentHTML("beforebegin", html); }
  SND.play("chime"); SND.haptic([10, 30, 15]);
  if (anim) G.from(".newflower", { scaleY: 0, scaleX: 0.4, duration: 0.9, ease: "elastic.out(1, .5)" });
}

/* Respira con l'onda */
function startWave() {
  const t = L(); const circ = document.getElementById("wCirc"), lbl = document.getElementById("wLbl"), arena = document.getElementById("arena");
  document.getElementById("gStart").remove();
  const CYC = 8000, N = 5, start = Date.now(); let hold = false, inSync = 0, samples = 0, lastPhase = null;
  const down = (e) => { e.preventDefault(); hold = true; }, up = () => { hold = false; };
  arena.addEventListener("pointerdown", down); arena.addEventListener("pointerup", up); arena.addEventListener("pointerleave", up); arena.addEventListener("pointercancel", up);
  if (anim) game.tweens.push(G.fromTo(circ, { scale: 0.55 }, { scale: 1, duration: CYC / 2000, repeat: N * 2 - 1, yoyo: true, ease: "sine.inOut" }));
  const iv = setInterval(() => {
    if (!game || game.over) { clearInterval(iv); return; }
    const el = Date.now() - start; if (el >= CYC * N) { clearInterval(iv); endWave(Math.round((inSync / Math.max(1, samples)) * 100)); return; }
    const rising = el % CYC < CYC / 2; const ph = rising ? "in" : "out";
    if (ph !== lastPhase) { lastPhase = ph; lbl.textContent = rising ? t.waveIn : t.waveOut; SND.breath(ph, CYC / 2000); if (anim) G.fromTo(lbl, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 }); }
    samples++; const ok = (hold && rising) || (!hold && !rising); if (ok) inSync++;
    circ.classList.toggle("sync", ok);
    document.getElementById("gScore").textContent = t.waveScore(Math.round((inSync / samples) * 100));
  }, 100);
  game.timers.push(iv);
}
function endWave(p) {
  const t = L(); stopGame(); SND.breathStop(); const wl = document.getElementById("wLbl"); if (wl) wl.textContent = "";
  const seeds = awardGameSeeds(Math.round(p / 10)); addJoy(6); save(); if (p >= 50) pend("breathe"); trackOnce("onda");
  document.getElementById("arena").insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${t.waveScore(p)}</h3><p>${t.waveDone}</p><p><strong>${seedsLine(seeds)}</strong></p></div>`);
  SND.play("chime"); if (anim) G.from(".gend", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* Canta con me */
const NOTES = [523.25, 659.25, 783.99, 1046.5];
function startSing() {
  document.getElementById("gStart").remove();
  game.seq = [Math.floor(Math.random() * 4)]; game.pos = 0; playSeq();
}
function flashFlower(i) {
  const f = document.querySelector(`.sflower[data-note="${i}"]`); if (!f) return;
  f.classList.add("lit"); setTimeout(() => f.classList.remove("lit"), 380);
  if (anim) G.fromTo(f, { scale: 1.18 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, .4)" });
  SND.note(NOTES[i]);
}
function playSeq() {
  const t = L(); const lbl = document.getElementById("sLbl"); if (!lbl || !game) return;
  lbl.textContent = t.singListen; document.querySelectorAll(".sflower").forEach((b) => { b.disabled = true; });
  const sp = document.getElementById("sPet"); if (sp && anim) game.tweens.push(G.fromTo(sp, { rotation: -5 }, { rotation: 5, duration: 0.3, repeat: game.seq.length * 2 - 1, yoyo: true, transformOrigin: "50% 100%" }));
  game.seq.forEach((n, k) => game.timers.push(setTimeout(() => flashFlower(n), 500 + k * 620)));
  game.timers.push(setTimeout(() => { if (!game) return; lbl.textContent = t.singYou; game.pos = 0; document.querySelectorAll(".sflower").forEach((b) => { b.disabled = false; }); }, 500 + game.seq.length * 620));
}
function singTap(i) {
  if (!game || !game.seq) return; flashFlower(i); SND.haptic(8);
  if (game.seq[game.pos] !== i) { endSing(game.seq.length - 1); return; }
  game.pos++;
  if (game.pos === game.seq.length) {
    document.getElementById("gScore").textContent = game.seq.length;
    document.querySelectorAll(".sflower").forEach((b) => { b.disabled = true; });
    const sp = document.getElementById("sPet"); if (sp && anim) G.fromTo(sp, { y: 0 }, { y: -16, duration: 0.18, yoyo: true, repeat: 1 });
    game.seq.push(Math.floor(Math.random() * 4)); game.timers.push(setTimeout(playSeq, 900));
  }
}
function endSing(n) {
  const t = L(); stopGame(); const seeds = awardGameSeeds(n * 2); addJoy(5); save(); trackOnce("canta");
  document.querySelectorAll(".sflower").forEach((b) => { b.disabled = true; }); const sl = document.getElementById("sLbl"); if (sl) sl.textContent = "";
  document.getElementById("arena").insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${t.singEnd(n)}</h3><p><strong>${seedsLine(seeds)}</strong></p><button class="btn" id="singAgain">${t.gameAgain}</button></div>`);
  SND.play(n >= 4 ? "fanfare" : "chime"); if (anim) G.from(".gend", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* Stiracchiamoci */
const POSE_ANIM = [
  (p) => G.to(p, { scaleY: 1.14, scaleX: 0.93, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 100%" }),
  (p) => G.to(p, { rotation: 13, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 100%" }),
  (p) => G.to(p, { rotation: -13, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 100%" }),
  (p) => G.to(p, { y: -6, duration: 0.6, yoyo: true, repeat: -1, ease: "sine.inOut" }),
  (p) => G.fromTo(p, { rotation: -8 }, { rotation: 8, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 80%" }),
  (p) => G.to(p, { scale: 1.07, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 60%" })
];
function startStretch() {
  document.getElementById("gStart").remove(); const t = L(); let i = 0; let cur = null;
  const step = () => {
    if (!game || game.over) return;
    if (cur) cur.kill(); const p = document.getElementById("stPet"); if (p) G.set(p, { clearProps: "transform" });
    if (i >= t.poses.length) { endStretch(); return; }
    document.getElementById("stName").textContent = t.poses[i][0]; document.getElementById("stTxt").textContent = t.poses[i][1];
    document.getElementById("stStep").textContent = `${i + 1}/${t.poses.length}`;
    if (anim && p) { cur = POSE_ANIM[i](p); game.tweens.push(cur); G.from("#stName", { y: 8, opacity: 0, duration: 0.35 }); }
    const ring = document.getElementById("stRing");
    if (ring) { if (anim) game.tweens.push(G.fromTo(ring, { attr: { "stroke-dashoffset": 0 } }, { attr: { "stroke-dashoffset": 339.3 }, duration: 10, ease: "none" })); }
    SND.play("chime"); i++; game.timers.push(setTimeout(step, 10000));
  };
  step();
}
function endStretch() {
  const t = L(); stopGame(); const seeds = awardGameSeeds(5); addJoy(6); save(); pend("stretch"); trackOnce("stretching");
  document.getElementById("arena").insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${t.stretchDone}</h3><p><strong>${seedsLine(seeds)}</strong></p></div>`);
  SND.play("fanfare"); if (anim) G.from(".gend", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* Sassolini gemelli */
const PEB = { heart: ["#F7A9C0", '<path d="M12 18s-6-3.8-6-8a3.2 3.2 0 0 1 6-1.7A3.2 3.2 0 0 1 18 10c0 4.2-6 8-6 8Z" fill="#E2454A"/>'], star: ["#FFE7A0", '<path d="M12 4l2.3 4.8 5.2.6-3.8 3.5 1 5.2L12 15.5l-4.7 2.6 1-5.2L4.5 9.4l5.2-.6Z" fill="#E9A23B"/>'], moon: ["#DCE2FA", '<path d="M16 15.5A6.5 6.5 0 0 1 8.5 6a6.5 6.5 0 1 0 7.5 9.5Z" fill="#6258C8"/>'], leaf: ["#D4EDCC", '<path d="M6 18c0-7 5-11 12-12-1 7-5 12-12 12Z" fill="#4E9A4A"/>'], drop: ["#D6ECF7", '<path d="M12 4c3 4 5 7 5 9.5a5 5 0 0 1-10 0C7 11 9 8 12 4Z" fill="#3E9BC7"/>'], sun: ["#FCE3C8", '<circle cx="12" cy="12" r="4" fill="#F28A3C"/><g stroke="#F28A3C" stroke-width="1.8" stroke-linecap="round"><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6"/></g>'] };
function pebbleSVG(s) { const [bg, ic] = PEB[s]; return `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="12.5" rx="11" ry="10" fill="${bg}"/><ellipse cx="9" cy="8" rx="4" ry="2" fill="#fff" opacity=".5"/>${ic}</svg>`; }
function memTap(b) {
  const m = game && game.mem; if (!m || m.lock || b.classList.contains("up") || b.classList.contains("done")) return;
  const flip = (el, upState) => { if (!anim) { el.classList.toggle("up", upState); return; } G.timeline().to(el, { scaleX: 0, duration: 0.12, ease: "power1.in" }).call(() => el.classList.toggle("up", upState)).to(el, { scaleX: 1, duration: 0.18, ease: "back.out(2)" }); };
  flip(b, true); SND.play("tap"); m.open.push(b);
  if (m.open.length === 2) {
    m.moves++; document.getElementById("gScore").textContent = L().memMoves(m.moves); m.lock = true;
    const [a, c] = m.open;
    game.timers.push(setTimeout(() => {
      if (a.dataset.sym === c.dataset.sym) { a.classList.add("done"); c.classList.add("done"); m.found++; SND.catchSound(false); SND.haptic([8, 30, 8]); if (anim) G.fromTo([a, c], { scale: 1.15 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" }); if (m.found === 6) endMemory(m.moves); }
      else { flip(a, false); flip(c, false); SND.play("miss"); }
      m.open = []; m.lock = false;
    }, 650));
  }
}
function endMemory(moves) {
  const t = L(); const seeds = awardGameSeeds(Math.max(3, Math.min(14, 20 - moves))); addJoy(5); save(); trackOnce("memoria");
  const g = document.getElementById("mGrid"); if (!g) return;
  g.insertAdjacentHTML("afterend", `<div class="card gendcard"><h3>${t.memEnd(moves)}</h3><p><strong>${seedsLine(seeds)}</strong></p></div>`);
  SND.play("fanfare"); if (anim) G.from(".gendcard", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* Trucchetti */
function openTricks() {
  const t = L();
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="trT"><div class="sheet"><div class="grab"></div><h2 id="trT">${t.games.tricks[0]}</h2><p class="small muted">${t.tricksP}</p><div class="tricklist">${t.tricks.map((n, i) => { const lock = S.level < i + 1; return `<button class="trick" data-trick="${i}" ${lock ? "disabled" : ""}><b>${esc(n)}</b><span class="small muted">${lock ? `${icon("lock")} ${t.lockedL(i + 1)}` : "▶"}</span></button>`; }).join("")}</div><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".sheet", { y: 300, duration: 0.4, ease: "power3.out" });
}
function performTrick(i) {
  const t = L(); fadeLayer(); if (tab !== "today") { tab = "today"; render(); }
  const p = document.getElementById("petInner"); say(t.tricks[i] + "!", 2600); trackOnce("trucchetto");
  if (!p || !anim) return;
  const fx = document.getElementById("fx");
  const tl = G.timeline({ onComplete: () => G.set(p, { clearProps: "transform" }) });
  if (i === 0) { tl.to(p, { scaleY: 0.85, scaleX: 1.12, y: 18, transformOrigin: "50% 100%", duration: 0.12 }).to(p, { scaleY: 1.08, scaleX: 0.94, y: -70, duration: 0.3, ease: "power2.out" }).to(p, { scaleY: 1, scaleX: 1, y: 0, duration: 0.5, ease: "bounce.out" }); SND.play("pop"); }
  else if (i === 1) { tl.to(p, { rotation: 360, transformOrigin: "50% 60%", duration: 0.8, ease: "back.inOut(1.4)" }); SND.play("sparkle"); }
  else if (i === 2) { for (let k = 0; k < 4; k++) tl.to(p, { x: k % 2 ? 14 : -14, y: -14, rotation: k % 2 ? 8 : -8, duration: 0.18, transformOrigin: "50% 100%" }).to(p, { y: 0, duration: 0.16 }); tl.to(p, { x: 0, rotation: 0, duration: 0.2 }); [0, 1, 2, 3].forEach((k) => setTimeout(() => SND.note(NOTES[k % 4]), k * 340)); burst("star", 6); }
  else if (i === 3) { tl.to(p, { y: -80, duration: 0.3, ease: "power2.out", transformOrigin: "50% 50%" }).to(p, { rotation: 360, duration: 0.45, ease: "none" }, "<0.1").to(p, { y: 0, duration: 0.35, ease: "bounce.out" }).set(p, { rotation: 0 }); SND.play("giggle"); }
  else if (i === 4) { tl.to(p, { rotation: -10, duration: 0.15, transformOrigin: "50% 100%" }).to(p, { rotation: 10, duration: 0.15, repeat: 5, yoyo: true }).to(p, { rotation: 0, duration: 0.2 }); burst("heart", 8); SND.play("pop"); }
  else if (i === 5 && fx) {
    const st = [0, 1, 2].map(() => { const s = document.createElement("span"); s.innerHTML = fxGlyph("★"); s.style.color = "#FFC94D"; s.style.fontSize = "22px"; s.style.left = "48%"; s.style.top = "30%"; fx.appendChild(s); return s; });
    st.forEach((s, k) => G.to(s, { keyframes: [{ x: -40, y: -50 }, { x: 0, y: -80 }, { x: 40, y: -50 }, { x: 0, y: 0 }], duration: 0.9, repeat: 2, delay: k * 0.3, ease: "sine.inOut", onComplete: () => s.remove() }));
    tl.to(p, { y: -6, duration: 0.15, yoyo: true, repeat: 11 }); SND.play("jingle");
  } else if (fx) {
    const r = document.createElement("div"); r.className = "rainbow"; fx.appendChild(r);
    G.fromTo(r, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.6)" }); G.to(r, { opacity: 0, duration: 0.6, delay: 2.4, onComplete: () => r.remove() });
    tl.to(p, { y: -24, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }); burst("star", 10); SND.play("fanfare");
  }
  setExpr("felice", 2600);
}

/* --- Documenti: guida e informative --- */
function openDoc(k) {
  const t = L(); const title = { guide: t.guideB, privDoc: t.privB, terms: t.termsB, health: t.healthB, credits: t.creditsB }[k];
  let body = "";
  if (k === "guide") body = t.guide.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("");
  else {
    const rep = (s) => s.replace("{owner}", OWNER_NAME || t.ownerMissing).replace("{email}", OWNER_EMAIL || t.ownerMissing).replace("{date}", fmtDate(PRIVACY_DATE));
    body = t[k].map((p) => `<p>${esc(rep(p)).replace(/(https:\/\/[^\s<>"）)，。、]+[^\s<>"）)，。、.,;:])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')}</p>`).join("");
    if (k === "health") body += `<div class="help">${t.helpLines.map((l) => `<p><strong>${l}</strong></p>`).join("")}</div>`;
    /* 1.0.9: lo stesso testo e' pubblicato sul sito (Google Play lo chiede a un indirizzo web): collegamento alla pagina */
    if (k === "privDoc" || k === "terms") { const u = `https://tanettoapp.github.io/Tanetto/privacy.html?lang=${encodeURIComponent(S.lang)}`; body += `<p class="small"><a href="${u}" target="_blank" rel="noopener">tanettoapp.github.io/Tanetto/privacy.html</a></p>`; }
  }
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="docT"><div class="box card docbox"><h2 id="docT">${title}</h2><div class="doc">${body}</div><button class="btn" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".docbox", { y: 30, opacity: 0, duration: 0.35, ease: "power3.out" });
  SND.play("paper");
}

/* --- Pulsanti --- */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  const t = L();
  if (b.dataset.game) { openGameKey(b.dataset.game); return; }
  if (b.id === "gBegin") { const k = game && game.kind; if (k === "wave") startWave(); else if (k === "sing") startSing(); else if (k === "stretch") startStretch(); else if (k === "calm") { document.getElementById("gStart").remove(); calmStep(0); } return; }
  if (b.id === "lgGo") { doLetgo(); return; }
  if (b.id === "gdGo") { plantFlower(); return; }
  if (b.dataset.note !== undefined) { singTap(+b.dataset.note); return; }
  if (b.id === "singAgain") { const e = document.querySelector(".gend"); if (e) e.remove(); game = { timers: [], tweens: [], over: false, kind: "sing" }; document.getElementById("gScore").textContent = "0"; game.seq = [Math.floor(Math.random() * 4)]; playSeq(); return; }
  if (b.dataset.mi !== undefined) { memTap(b); return; }
  if (b.dataset.trick !== undefined) { performTrick(+b.dataset.trick); return; }
  if (b.dataset.doc) { openDoc(b.dataset.doc); return; }
  if (b.id === "tutAgain") { S.tut = 0; save(); tab = "today"; render(); window.scrollTo(0, 0); return; }
  if (b.dataset.tgoal) { const g = b.dataset.tgoal; fadeLayer(); if (!S.done.includes(g)) completeGoal(g, null); return; }
  if (b.dataset.ritual) { const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", String(on)); b.querySelector(".tick").innerHTML = on ? icon("check") : ""; if (on) { pend(b.dataset.ritual); SND.play("coin"); } else pendingGoals = pendingGoals.filter((x) => x !== b.dataset.ritual); return; }
  if (b.id === "ritualGo") { fadeLayer(); toggleNap(true); flushPendingSoft(); return; }
  if (b.id === "friendHit") { const f = friendToday(); if (!f) return; say(t.visitHi(t.pets[f][0]), 2400); SND.play("giggle"); const fi = document.getElementById("friendInner"); if (fi && anim) G.timeline().to(fi, { y: -40, duration: 0.2, ease: "power2.out" }).to(fi, { y: 0, duration: 0.45, ease: "bounce.out" }); return; }
  if (b.id === "shareImg") { const im = layer.querySelector(".weekimg"); if (im) shareImage(im.src, "tanetto.png").then((ok) => { if (!ok) toast(t.shareFallback); }); return; }
  if (b.id === "shareCard") { sharePostcard(b.dataset.sc); return; }
  if (b.id === "shareLevel") { shareLevelCard(); return; }
  if (b.id === "shareRecord") { const sc = +b.dataset.score; stopGame(); game = null; shareRecordCard(sc); return; }
  if (b.id === "shareGarden") { const n = (S.garden || []).length; stopGame(); game = null; shareFlow(() => makeCard({ art: gardenSVG(S.garden || []), w: 880, h: 587, title: n ? t.gardenN(n) : t.gardenEmpty, sub: t.games.garden[0] }), "tanetto-giardino.png"); return; }
});
document.addEventListener("keydown", (ev) => {
  if (ev.key !== "Enter") return;
  if (ev.target.id === "lgIn") { ev.preventDefault(); doLetgo(); }
  if (ev.target.id === "gdIn") { ev.preventDefault(); plantFlower(); }
});
function flushPendingSoft() {
  if (!pendingGoals.length) return; const list = pendingGoals; pendingGoals = [];
  list.forEach((g, i) => setTimeout(() => { if (!S.done.includes(g)) { S.done.push(g); (S.log = S.log || []).push({ d: dkey(), g }); if (S.log.length > 4000) S.log.shift(); const tg = todayGoals(); const r = dayRec(); r.done = S.done.filter((x) => tg.includes(x)).length; S.energy = Math.min(100, S.energy + 100 / Math.max(1, tg.length)); S.seeds += SEEDS_GOAL; seasonState(); S.season.n++; const prev = S.level; const up = addXp(XP_GOAL); if (tg.every((x) => S.done.includes(x))) { S.energy = 100; S.seeds += SEEDS_ALL; } save(); render(); if (up) setTimeout(() => showLevelUp(prev), 600); } }, i * 50));
}
