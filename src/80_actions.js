/* =================== ANIMAZIONI =================== */
function startAmbient() {
  if (!anim) return;
  const root = document.getElementById("room"); if (!root) return;
  const q = (s) => root.querySelectorAll(s);
  q(".body").forEach((b) => ambient.push(G.to(b, { scaleY: 0.975, scaleX: 1.015, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".eyes").forEach((e) => { const tl = G.timeline({ repeat: -1, repeatDelay: 2.6 + Math.random() * 2.5 }); tl.to(e, { scaleY: 0.08, duration: 0.07 }).to(e, { scaleY: 1, duration: 0.1 }); ambient.push(tl); });
  q(".sprout").forEach((s) => ambient.push(G.to(s, { rotation: 4, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".tail").forEach((s) => ambient.push(G.to(s, { rotation: -8, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".wings").forEach((s) => ambient.push(G.to(s, { scaleY: 0.86, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".glow").forEach((s) => ambient.push(G.to(s, { attr: { r: "+=6" }, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".zz").forEach((s) => ambient.push(G.fromTo(s, { y: 6, opacity: 0 }, { y: -6, opacity: 1, duration: 1.6, repeat: -1, ease: "sine.out" })));
  q(".cloud").forEach((s) => ambient.push(G.to(s, { x: 30, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".cloud2").forEach((s) => ambient.push(G.to(s, { x: -22, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".star").forEach((s, i) => ambient.push(G.to(s, { opacity: 0.25, duration: 0.9 + i * 0.2, repeat: -1, yoyo: true })));
  q(".bulb").forEach((s, i) => ambient.push(G.to(s, { opacity: 0.55, duration: 0.8, repeat: -1, yoyo: true, delay: i * 0.15 })));
  q(".mote").forEach((s, i) => ambient.push(G.to(s, { y: -18 - i * 3, x: (i % 2 ? 8 : -8), opacity: 0.1, duration: 4 + i * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".plantg").forEach((s) => ambient.push(G.to(s, { rotation: 2, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".wp").forEach((s, i) => {
    if (s.classList.contains("glint")) { ambient.push(G.to(s, { opacity: 0.1, duration: 0.7 + (i % 3) * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" })); return; }
    if (s.classList.contains("fly")) { ambient.push(G.to(s, { x: "+=36", y: "-=14", duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" })); return; }
    const dur = 6 + (i % 4) * 1.3;
    const tw = G.fromTo(s, { y: -95, x: 0 }, { y: 15, x: (i % 2 ? 12 : -12), rotation: i % 2 ? 160 : -160, transformOrigin: "50% 50%", duration: dur, repeat: -1, ease: "none" });
    tw.progress((i * 0.137) % 1); ambient.push(tw);
  });
  const gift = document.getElementById("gift"); if (gift) ambient.push(G.to(gift, { y: -6, rotation: 4, duration: 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" }));
  const bub = document.getElementById("bubble"); if (bub) G.from(bub, { y: -6, opacity: 0, duration: 0.35, ease: "back.out(2)" });
  ambientExtra(root, q);
}
function jump(big) {
  const p = document.getElementById("petInner"); if (!p || !anim) return;
  G.timeline().to(p, { scaleY: 0.85, scaleX: 1.12, y: 18, transformOrigin: "50% 100%", duration: 0.12 })
    .to(p, { scaleY: 1.08, scaleX: 0.94, y: big ? -60 : -34, duration: 0.25, ease: "power2.out" })
    .to(p, { scaleY: 1, scaleX: 1, y: 0, duration: 0.45, ease: "bounce.out" });
}
function burst(kind, n = 8, host) {
  const fx = host || document.getElementById("fx"); if (!fx) return;
  if (kind === "confetti") {
    const cols = ["#F2A65A", "#9B8CF2", "#4FB89A", "#EE7FA0", "#5E9BD6", "#FFD25E"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("i"); c.setAttribute("aria-hidden", "true");
      c.style.left = `${10 + Math.random() * 80}%`; c.style.top = "-6%"; c.style.background = cols[i % cols.length];
      fx.appendChild(c);
      if (anim) G.to(c, { y: 260 + Math.random() * 120, x: (Math.random() - 0.5) * 80, rotation: (Math.random() - 0.5) * 720, opacity: 0.2, duration: 1.6 + Math.random() * 0.8, ease: "power1.in", onComplete: () => c.remove() });
      else setTimeout(() => c.remove(), 600);
    }
    return;
  }
  const color = { heart: "#E2654F", star: "#E9A23B", seed: "#B07A3C" }[kind];
  const glyph = { heart: "♥", star: "✦", seed: "●" }[kind];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span"); s.innerHTML = fxGlyph(glyph); s.setAttribute("aria-hidden", "true");
    s.style.left = "50%"; s.style.top = "62%"; s.style.color = color; s.style.fontSize = `${14 + Math.random() * 12}px`;
    fx.appendChild(s);
    if (anim) G.to(s, { x: (Math.random() - 0.5) * 220, y: -60 - Math.random() * 110, opacity: 0, rotation: (Math.random() - 0.5) * 90, duration: 1 + Math.random() * 0.5, ease: "power2.out", onComplete: () => s.remove() });
    else setTimeout(() => s.remove(), 600);
  }
}
function say(text, ms = 3200) {
  sayText = text; const b = document.getElementById("bubbleTxt");
  if (b) { b.textContent = text; if (anim) G.fromTo("#bubble", { scale: 0.9 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }); }
  clearTimeout(sayTimer); sayTimer = setTimeout(() => { sayText = null; const bb = document.getElementById("bubbleTxt"); if (bb) bb.textContent = defaultSay(); }, ms);
}
function bumpSeeds() { const p = document.getElementById("seedPill"); if (p && anim) G.fromTo(p, { scale: 1.25 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" }); }

/* =================== AZIONI =================== */
let toastTimer;
function toast(msg) { const el = document.getElementById("toast"); el.textContent = msg; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 2400); }
function addXp(n) {
  S.xp += n; let up = 0;
  while (S.xp >= xpNeed(S.level)) { S.xp -= xpNeed(S.level); S.level++; S.seeds += SEEDS_LEVEL; up++; }
  return up;
}
function showLevelUp(prevLevel) {
  const t = L(); const st = (l) => l >= 6 ? 2 : l >= 3 ? 1 : 0;
  const { fant, real } = destList();
  const unlocked = fant.concat(real).filter((d) => d.lvl > prevLevel && d.lvl <= S.level).map((d) => t.unlocked(d.name));
  const grew = st(S.level) > st(prevLevel) ? t.grow(S.petName) : "";
  if (S.level - 1 < t.tricks.length && S.level > prevLevel) unlocked.push(t.trickNew(t.tricks[S.level - 1]));
  layer.innerHTML = `<div class="overlay levelup" role="dialog" aria-modal="true" aria-labelledby="luT"><div class="box card"><div class="badge" id="luT">${t.levelUpT(S.level)}</div><div style="width:150px">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><p>${esc(t.levelUpP(S.petName))}</p>${unlocked.concat(grew ? [grew] : []).map((u) => `<p><strong>${esc(u)}</strong></p>`).join("")}<div class="row" style="justify-content:center"><button class="btn ghost" id="shareLevel">${t.share}</button><button class="btn" id="closeLayer">${t.ok}</button></div></div></div>`;
  const box = layer.querySelector(".box"); box.insertAdjacentHTML("afterbegin", '<div class="rays" aria-hidden="true"></div><div class="fx" id="lfx"></div>');
  if (anim) { G.from(box, { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(2)" }); G.to(box.querySelector(".rays"), { rotation: 360, duration: 18, repeat: -1, ease: "none" }); G.from("#luT", { scale: 0, rotation: -12, duration: 0.7, delay: 0.15, ease: "elastic.out(1, .45)" }); }
  setTimeout(() => burst("confetti", 34, document.getElementById("lfx")), 250);
  SND.play("fanfare"); SND.haptic([30, 50, 30]);
  layer.querySelector("#closeLayer").focus();
}
function completeGoal(g, rect) {
  const t = L(); const tg = todayGoals();
  if (S.done.includes(g) || S.away || !tg.includes(g)) return;
  S.done.push(g); (S.log = S.log || []).push({ d: dkey(), g }); if (S.log.length > 4000) S.log.shift(); const rec = dayRec(); rec.done = S.done.filter((x) => tg.includes(x)).length;
  S.energy = Math.min(100, S.energy + 100 / tg.length + 0.001);
  S.seeds += SEEDS_GOAL;
  seasonState(); S.season.n++;
  const prev = S.level; const up = addXp(XP_GOAL);
  const all = tg.every((x) => S.done.includes(x));
  if (all) { S.energy = 100; S.seeds += SEEDS_ALL; }
  save(); sayText = pick(t.talk.cheer); render();
  addJoy(3); save();
  /* v17: prima si vede la spunta, gli effetti partono al disegno successivo (il tocco risponde subito) */
  const fx = () => { jump(all); burst("star", all ? 14 : 8); if (all) burst("confetti", 28); say(sayText);
    flySeed(rect, SEEDS_GOAL + (all ? SEEDS_ALL : 0)); popTick(g); };
  if (anim && window.requestAnimationFrame) requestAnimationFrame(fx); else fx();
  SND.haptic(all ? [20, 60, 20, 60, 40] : [12, 40, 18]); trackOnce("obiettivo");
  /* 1.0.9: logo sonoro. Ogni obiettivo suona la nota successiva di Sol-La-Si-Re (si ricomincia dopo il Re);
     la giornata completa aggiunge il chime Sol-Si-Re. Niente piu' "coin" a ogni spunta: il suono e' il logo. */
  SND.logoTick(rec.done); if (all) SND.logoChime(0.32);
  if (up) setTimeout(() => showLevelUp(prev), 900);
}
function finishTrip() {
  const d = destByKey(S.away.dest);
  const missing = d.cards.filter((c) => !S.cards.includes(c));
  const ck = missing.length ? pick(missing) : pick(d.cards);
  if (!S.cards.includes(ck)) S.cards.push(ck);
  let item = null;
  if (!S.owned.includes("gold") && (d.lvl >= 4 || Math.random() < 0.25)) item = "gold";
  else if (Math.random() < 0.3) { const hats = ["red", "blue", "violet", "green", "pink"].filter((h) => !S.owned.includes(h)); if (hats.length) item = pick(hats); }
  if (item) S.owned.push(item);
  S.seeds += SEEDS_TRIP; S.away = null; S.energy = 0;
  story = { card: ck, item };
  const prev = S.level; if (addXp(XP_TRIP)) setTimeout(() => showLevelUp(prev), 700);
  setTimeout(() => SND.play("back"), 150);
  save();
}
function breathe() {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="brT"><div class="box"><h2 id="brT">${t.breatheT}</h2><div class="breath"><div class="ring" id="ring"></div>${petSVG(S.pet, "normale", S.hat, stage(), S.petName)}</div><p class="breath-word" id="bw" aria-live="polite"></p><div class="row" style="justify-content:center"><button class="btn" id="brStart">${t.breatheStart}</button><button class="link" id="closeLayer">${t.close}</button></div></div></div>`;
  layer.querySelector("#brStart").focus();
}
function runBreath() {
  const t = L(); const bw = document.getElementById("bw"); const ring = document.getElementById("ring"); const btn = document.getElementById("brStart");
  btn.disabled = true; let cycle = 0; const total = 6;
  const step = () => {
    if (!document.getElementById("bw")) { SND.breathStop(); return; }
    if (cycle >= total) { SND.breathStop(); SND.play("chime"); bw.textContent = t.breatheDone; btn.remove(); const c = document.getElementById("closeLayer"); c.className = "btn"; c.textContent = t.ok; c.dataset.breathDone = "1"; c.focus(); return; }
    bw.textContent = t.breatheIn; SND.breath("in", 4);
    if (anim) G.to(ring, { scale: 1, duration: 4, ease: "sine.inOut" }); else ring.style.transform = "scale(1)";
    setTimeout(() => {
      if (!document.getElementById("bw")) { SND.breathStop(); return; }
      bw.textContent = t.breatheOut; SND.breath("out", 6);
      if (anim) G.to(ring, { scale: 0.55, duration: 6, ease: "sine.inOut" }); else ring.style.transform = "scale(.55)";
      setTimeout(() => { cycle++; step(); }, 6000);
    }, 4000);
  };
  step();
}
function closeLayer() { fadeLayer(); SND.breathStop(); stopGame(); game = null; flushPending(); }

/* --- Cartolina della settimana: disegno SVG -> immagine PNG --- */
const WEEK_PAL = { germo: ["#DCEFD3", "#A8D79D", "#4E8A4A"], ondi: ["#F6E6D6", "#E3B892", "#8A5A3C"], lumi: ["#E4E5FA", "#AEB3F0", "#4F55B8"] };
function weekSVG(withText) {
  const t = L(); const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo; const wk = weekData(); const si = season();
  const ff = (w) => `font-family="Fredoka, 'Trebuchet MS', Arial, sans-serif" font-weight="${w}"`;
  const fb = `font-family="Figtree, 'Segoe UI', Arial, sans-serif"`;
  let room = roomSVG({ ph: "day", pet: S.pet, e: "felice", hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: false, glow: 0.95, label: "", season: si.id });
  room = room.replace('<svg viewBox="0 0 360 300"', '<svg x="140" y="240" width="800" height="667" viewBox="0 0 360 300"');
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><defs><linearGradient id="wbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient><clipPath id="wrc"><rect x="140" y="240" width="800" height="667" rx="44"/></clipPath></defs>
  <rect width="1080" height="1350" fill="url(#wbg)"/><circle cx="80" cy="120" r="140" fill="#fff" opacity=".22"/><circle cx="1010" cy="1280" r="180" fill="#fff" opacity=".2"/><circle cx="1000" cy="60" r="60" fill="#fff" opacity=".18"/>
  <rect x="66" y="72" width="960" height="1230" rx="56" fill="#000" opacity=".08"/><rect x="60" y="60" width="960" height="1230" rx="56" fill="#FFFBF4"/>
  <rect x="80" y="80" width="920" height="1190" rx="42" fill="none" stroke="${pal[1]}" stroke-width="4" stroke-dasharray="14 12"/>
  <g transform="translate(870 96)"><rect width="104" height="120" rx="8" fill="${pal[0]}" stroke="${pal[2]}" stroke-width="4" stroke-dasharray="8 6"/><svg x="17" y="22" width="70" height="70" viewBox="0 0 40 40">${SEASON_ICON[si.id].replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg></g>
  <rect x="146" y="250" width="800" height="667" rx="44" fill="#000" opacity=".12"/><g clip-path="url(#wrc)">${room}</g>`;
  wk.forEach((w, i) => {
    const cx = 540 + (i - 3) * 118, cy = 985;
    const fill = w.cls === "l3" ? pal[2] : w.cls === "l2" ? pal[1] : w.cls === "l1" ? pal[0] : w.cls === "rest" ? "none" : "#EFE7DA";
    o += `<circle cx="${cx}" cy="${cy}" r="40" fill="${fill}" ${w.cls === "rest" ? `stroke="#D9CDBA" stroke-width="5"` : ""}/>`;
    if (w.cls === "l3") o += `<path d="M${cx - 15} ${cy} l10 10 l20 -20" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (withText) o += `<text x="${cx}" y="${cy + 78}" text-anchor="middle" font-size="28" ${fb} font-weight="600" fill="#6E655D">${esc(wdName(wdIdx(w.d)))}</text>`;
  });
  if (withText) {
    const st = weekStats();
    o += `<text x="500" y="168" text-anchor="middle" font-size="50" ${ff(600)} fill="#2F2A26">${esc(t.weekTitle(S.petName))}</text><text x="500" y="216" text-anchor="middle" font-size="32" ${fb} fill="#6E655D">${esc(st.range)}</text>`;
    st.items.forEach(([v, lab], i) => { const x = 540 + (i - 1.5) * 225; o += `<text x="${x}" y="1150" text-anchor="middle" font-size="62" ${ff(600)} fill="${pal[2]}">${v}</text><text x="${x}" y="1190" text-anchor="middle" font-size="25" ${fb} fill="#6E655D">${esc(lab)}</text>`; });
    o += `<text x="540" y="1252" text-anchor="middle" font-size="30" ${ff(600)} fill="#2F2A26">Tanetto · ${esc(t.weekTag)}</text>`;
  }
  return o + `</svg>`;
}
function weekStats() {
  const t = L(); const wk = weekData();
  const goals = wk.reduce((a, w) => a + w.done, 0);
  return { range: `${fmtDate(dkey(wk[0].d))} – ${fmtDate(dkey(wk[6].d))}`, items: [[goals, t.weekGoals], [streak(), t.weekStreak], [S.level, t.weekLevel], [S.cards.length, t.weekCards]] };
}
function loadImg(src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; }); }
async function buildWeekImage() {
  const t = L(); const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo;
  try { await Promise.all([document.fonts.load('600 58px "Fredoka"'), document.fonts.load('500 32px "Figtree"'), document.fonts.load('600 28px "Figtree"')]); } catch (e) { /* uso i caratteri di sistema */ }
  const svg = weekSVG(false);
  const img = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  try {
    const cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1350;
    const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
    const FD = '"Fredoka", "Trebuchet MS", Arial, sans-serif', FB = '"Figtree", "Segoe UI", Arial, sans-serif';
    c.textAlign = "center"; c.textBaseline = "alphabetic";
    let size = 58; const title = t.weekTitle(S.petName);
    do { c.font = `600 ${size}px ${FD}`; size -= 2; } while (c.measureText(title).width > 700 && size > 30);
    c.fillStyle = "#2F2A26"; c.fillText(title, 500, 168);
    const st = weekStats();
    c.font = `500 32px ${FB}`; c.fillStyle = "#6E655D"; c.fillText(st.range, 500, 216);
    c.font = `600 28px ${FB}`; weekData().forEach((w, i) => c.fillText(wdName(wdIdx(w.d)), 540 + (i - 3) * 118, 1063));
    st.items.forEach(([v, lab], i) => {
      const x = 540 + (i - 1.5) * 225;
      c.font = `600 62px ${FD}`; c.fillStyle = pal[2]; c.fillText(String(v), x, 1150);
      let fs = 25; do { c.font = `500 ${fs}px ${FB}`; fs--; } while (c.measureText(lab).width > 210 && fs > 16);
      c.fillStyle = "#6E655D"; c.fillText(lab, x, 1190);
    });
    let fs = 30; const foot = `Tanetto · ${t.weekTag}`;
    do { c.font = `600 ${fs}px ${FD}`; fs--; } while (c.measureText(foot).width > 860 && fs > 18);
    c.fillStyle = "#2F2A26"; c.fillText(foot, 540, 1252);
    return cv.toDataURL("image/png");
  } catch (e) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(weekSVG(true));
  }
}
async function makeWeekCard() {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="wkT"><div class="box"><h2 id="wkT">${t.weekT}</h2><div id="wkOut" style="width:100%"></div><p class="small muted" id="wkMsg" aria-live="polite">${t.weekMaking}</p><button class="btn ghost" id="closeLayer">${t.close}</button></div></div>`;
  try {
    const url = await buildWeekImage();
    const out = document.getElementById("wkOut"); if (!out) return;
    out.innerHTML = `<img class="weekimg" id="weekImg" src="${url}" alt="${esc(t.weekTitle(S.petName))}">` + imgButtons("tanetto-settimana.png");
    document.getElementById("wkMsg").textContent = t.saveHint;
    SND.play("chime");
    if (anim) G.from("#weekImg", { scale: 0.92, opacity: 0, duration: 0.45, ease: "back.out(1.6)" });
  } catch (e) {
    const m = document.getElementById("wkMsg"); if (m) m.textContent = t.weekErr;
  }
}

/* --- Eventi --- */
function setLang(v) { if (!T[v]) return; S.lang = v; pickedDest = null; editGoals = null; save(); render(); }
document.addEventListener("change", (ev) => { if (ev.target.id === "langSel" || ev.target.id === "langSel2") setLang(ev.target.value); });
document.addEventListener("input", (ev) => { if (ev.target.id === "petName") draftName = ev.target.value; });
document.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter" && ev.target.id === "customGoal") { ev.preventDefault(); document.getElementById("addGoal").click(); }
  if (ev.key === "Escape" && layer.innerHTML) closeLayer();
});
let unlocked = false;
document.addEventListener("pointerdown", () => {
  if (unlocked) return; unlocked = true;
  SND.unlock(); if (S.music) SND.musicOn(phase() === "night" ? 3 : S.track);
}, { capture: true });
document.addEventListener("visibilitychange", () => { if (document.hidden) SND.suspend(); else SND.resume(); });
document.addEventListener("submit", (ev) => {
  if (ev.target.id !== "diaryForm") return;
  ev.preventDefault();
  const t = L(); const text = document.getElementById("line").value.trim();
  if (!text && mood == null) return;
  S.diary.push({ day: dkey(), mood, text, q: t.questions[Math.floor(new Date(dkey() + "T12:00:00").getTime() / 86400000) % t.questions.length] }); /* 1.0.10 (D-02): giorno locale */
  if (S.diary.length > 400) S.diary.shift();
  mood = null; save(); SND.play("coin");
  if (todayGoals().includes("journal") && !S.done.includes("journal")) { tab = "today"; render(); window.scrollTo(0, 0); completeGoal("journal"); toast(t.saved); return; }
  render(); toast(t.saved);
});
function pickerList() { return S.pet ? (editGoals = editGoals || S.goals.map((g) => ({ id: g.id, days: g.days.slice() }))) : null; }
function toggleGoal(g) {
  const ed = pickerList();
  if (ed) { const i = ed.findIndex((x) => x.id === g); if (i >= 0) ed.splice(i, 1); else if (ed.length < GOALS_MAX) ed.push({ id: g, days: ALL_DAYS.slice() }); }
  else { const i = draftGoals.indexOf(g); if (i >= 0) draftGoals.splice(i, 1); else if (draftGoals.length < GOALS_MAX) draftGoals.push(g); }
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  const t = L();
  if (b.dataset.pet) { draftPet = b.dataset.pet; draftName = ""; SND.play("pop"); render(); return; }
  if (b.id === "toName") { S.onboard = 1; SND.play("click"); render(); return; }
  if (b.id === "backPet") { S.onboard = 0; render(); return; }
  if (b.id === "toGoals") { const v = document.getElementById("petName").value.trim(); draftName = v || t.pets[draftPet][0]; S.onboard = 2; SND.play("click"); render(); window.scrollTo(0, 0); return; }
  if (b.id === "backName") { S.onboard = 1; render(); return; }
  if (b.dataset.goal !== undefined && b.classList.contains("chip")) { const y = window.scrollY; toggleGoal(b.dataset.goal); SND.play("click"); render(); window.scrollTo(0, y); return; }
  if (b.id === "addGoal") {
    const v = document.getElementById("customGoal").value.trim(); if (!v) return;
    const k = "c:" + v; const y = window.scrollY;
    const ed = pickerList();
    if (ed) { if (!ed.some((x) => x.id === k) && ed.length < GOALS_MAX) ed.push({ id: k, days: ALL_DAYS.slice() }); }
    else if (!draftGoals.includes(k) && draftGoals.length < GOALS_MAX) draftGoals.push(k);
    render(); window.scrollTo(0, y); return;
  }
  if (b.dataset.gday) {
    const [gi, d] = b.dataset.gday.split(":").map(Number); const ed = pickerList(); const g = ed[gi]; if (!g) return;
    const i = g.days.indexOf(d);
    if (i >= 0) { if (g.days.length === 1) { toast(t.needDay); return; } g.days.splice(i, 1); } else { g.days.push(d); g.days.sort(); }
    const y = window.scrollY; SND.play("click"); render(); window.scrollTo(0, y); return;
  }
  if (b.id === "startApp") {
    S.pet = draftPet; S.petName = draftName || t.pets[draftPet][0]; S.goals = draftGoals.map((id) => ({ id, days: ALL_DAYS.slice() })); S.onboard = 3; tab = "today";
    seasonState(); dayRec(); save(); SND.play("fanfare"); render(); window.scrollTo(0, 0); jump(true); burst("confetti", 30); return;
  }
  if (b.dataset.done) { const g = b.dataset.done; if (S.done.includes(g)) { shake(b); return; } if (g === "breathe") { breathe(); return; } completeGoal(g, b.getBoundingClientRect()); return; }
  if (b.id === "brStart") { runBreath(); return; }
  if (b.id === "closeLayer") { const done = b.dataset.breathDone; closeLayer(); if (done && todayGoals().includes("breathe") && !S.done.includes("breathe")) completeGoal("breathe"); else if (S.pet) { const y = window.scrollY; render(); window.scrollTo(0, y); } return; }
  if (b.id === "petHit") { petTap(); return; }
  if (b.id === "musicBtn" || b.id === "musSw") { S.music = !S.music; save(); if (S.music) SND.musicOn(phase() === "night" ? 3 : S.track); else SND.musicOff(); render(); return; }
  if (b.id === "sfxSw") { S.sfx = !S.sfx; save(); SND.play("click"); if (!S.sfx) SND.breathStop(); render(); return; }
  if (b.id === "gift") { openGift(b); return; }
  if (b.id === "rest") { const r = dayRec(); r.rest = true; save(); render(); toast(t.restDone); return; }
  if (b.id === "claimEv") {
    const si = seasonState(); if (S.season.n < EVENT_GOAL || S.season.claimed) return;
    const item = "s_" + si.id; S.season.claimed = true;
    if (!S.owned.includes(item)) { S.owned.push(item); S.hat = item; toast(t.evGot(t.items[item])); } else { S.seeds += SEEDS_EVENT_AGAIN; toast(t.gift(SEEDS_EVENT_AGAIN)); }
    save(); render(); jump(true); burst("confetti", 32); SND.play("fanfare"); return;
  }
  if (b.dataset.dest) { pickedDest = b.dataset.dest; SND.play("click"); if (S.energy < 100) toast(t.need); render(); return; }
  if (b.id === "depart") {
    if (S.energy < 100 || !pickedDest || S.away) return;
    const d = destByKey(pickedDest);
    const go = () => { S.away = { dest: d.key, until: Date.now() + d.h * 3600000 }; pickedDest = null; sayText = null; clearTimeout(sayTimer); save(); render(); };
    tab = "today"; render(); window.scrollTo(0, 0); SND.play("depart");
    const p = document.getElementById("petInner");
    if (p && anim) G.timeline({ onComplete: go }).to(p, { y: -20, duration: 0.2 }).to(p, { x: 380, y: 0, duration: 0.9, ease: "power2.in" });
    else go();
    return;
  }
  if (b.id === "comeBack") { S.away.until = Date.now(); render(); if (anim) { const p = document.getElementById("petInner"); if (p) G.from(p, { x: 380, duration: 0.9, ease: "power2.out" }); } return; }
  if (b.id === "storyOk") { story = null; render(); return; }
  if (b.dataset.card) { const c = cardInfo(b.dataset.card); layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="pcT"><div class="box story"><div class="pcbig" style="width:calc(100% - 10px)">${c.art()}</div><h3 id="pcT">${esc(c.title)}</h3>${c.place ? `<p class="small muted">${esc(c.place)}</p>` : ""}<p class="pcmsg">${esc(c.text.split("{n}").join(S.petName))}</p><div class="row" style="justify-content:center"><button class="btn ghost" id="shareCard" data-sc="${b.dataset.card}">${t.share}</button><button class="btn" id="closeLayer">${t.close}</button></div></div></div>`; layer.querySelector("#closeLayer").focus(); SND.play("pop"); return; }
  if (b.id === "togglePicker") { showPicker = !showPicker; const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "makeWeek") { makeWeekCard(); return; }
  if (b.dataset.tab) {
    const same = tab === b.dataset.tab; tab = b.dataset.tab; confirmReset = false; editGoals = null; showPicker = false; if (!same) SND.play("click");
    /* Risposta immediata: l'indicatore della scheda si muove subito, la pagina arriva al fotogramma dopo */
    const go = () => { render(); window.scrollTo(0, 0); if (b.dataset.focus === "goals") setTimeout(() => document.getElementById("goalsCard")?.scrollIntoView({ behavior: "smooth" }), 50); };
    if (!same && anim && S.pet) { renderTabs(); tabPending = requestAnimationFrame(() => { tabPending = setTimeout(() => { tabPending = 0; go(); }, 0); }); } else go();
    return;
  }
  if (b.dataset.hometab) { homeTab = b.dataset.hometab; SND.play("click"); render(); return; }
  if (b.dataset.wear !== undefined) { S.hat = null; save(); render(); return; }
  if (b.dataset.item) {
    const s = SHOP.find((x) => x.id === b.dataset.item);
    if (!S.owned.includes(s.id)) {
      if (s.event) { toast(t.eventOnly); return; }
      if (s.found) { toast(t.foundOnly); return; }
      if (S.seeds < s.price) { toast(t.notEnough); return; }
      S.seeds -= s.price; S.owned.push(s.id); toast(t.bought(t.items[s.id])); SND.play("buy");
      if (s.kind === "furn") S.furn.push(s.id); else if (s.kind === "wear") S.hat = s.id; else S.wall = s.id;
    } else {
      SND.play("pop");
      if (s.kind === "furn") S.furn = S.furn.includes(s.id) ? S.furn.filter((x) => x !== s.id) : S.furn.concat(s.id);
      else if (s.kind === "wear") S.hat = S.hat === s.id ? null : s.id; else S.wall = s.id;
    }
    const y = window.scrollY; save(); render(); window.scrollTo(0, y); jump(false); burst("star", 6); return;
  }
  if (b.dataset.mood !== undefined && b.classList.contains("mood")) { mood = Number(b.dataset.mood); SND.play("click"); document.querySelectorAll(".mood").forEach((m) => m.setAttribute("aria-pressed", String(Number(m.dataset.mood) === mood))); return; }
  if (b.id === "saveGoals") {
    const list = editGoals || S.goals; if (list.length < GOALS_MIN || list.length > GOALS_MAX || !list.every((g) => g.days.length)) return;
    S.goals = list.map((g) => ({ id: g.id, days: g.days.slice() }));
    const tg = todayGoals(); S.done = S.done.filter((g) => tg.includes(g)); const r = dayRec(); r.done = S.done.length;
    if (S.energy < 100 && tg.length) S.energy = Math.min(100, (S.done.length / tg.length) * 100);
    editGoals = null; save(); render(); toast(t.goalsSaved); SND.play("coin"); return;
  }
  if (b.id === "doRename") { const v = document.getElementById("rename").value.trim(); if (v) { S.petName = v; save(); render(); toast(t.renamed); } return; }
  if (b.dataset.themeSet) { S.theme = b.dataset.themeSet; save(); render(); return; }
  if (b.id === "reset") { confirmReset = true; render(); return; }
  if (b.id === "resetNo") { confirmReset = false; render(); return; }
  if (b.id === "resetYes") { const lang = S.lang; SND.musicOff(); snapClear(); S = fresh(); S.lang = lang; confirmReset = false; draftPet = "germo"; draftName = ""; draftGoals = ["water", "walk", "breathe"]; tab = "today"; story = null; save(); render(); window.scrollTo(0, 0); return; }
});
setInterval(() => { if (S.away && (tab === "today" || tab === "trips") && !layer.innerHTML) render(); }, 30000);
