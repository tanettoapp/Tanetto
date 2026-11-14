/* =================== VERSIONE 4: vita del compagno, giochi, sorprese =================== */
let idleN = 0, tutOn = false, dragInfo = null, suppressPetClick = false, tapTimes = [], strokeAt = 0, napJoyDay = null;

function ambientExtra(root, q) {
  q(".fishg").forEach((f) => ambient.push(G.to(f, { x: -9, y: 2, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".bub").forEach((b, i) => ambient.push(G.fromTo(b, { y: 4, opacity: 0.9 }, { y: -10, opacity: 0, duration: 2 + i * 0.6, repeat: -1, ease: "sine.out", delay: i * 0.7 })));
  q(".wstar").forEach((w, i) => ambient.push(G.to(w, { opacity: 0.3, duration: 1.2 + (i % 4) * 0.4, repeat: -1, yoyo: true })));
  const letter = document.getElementById("letter");
  if (letter) ambient.push(G.to(letter, { y: -5, rotation: -4, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" }));
  const acts = document.querySelectorAll(".act .aci");
  /* comportamenti spontanei del compagno */
  if (tab === "today" && document.getElementById("petInner") && !S.away) {
    const loop = () => {
      const call = G.delayedCall(6 + Math.random() * 5, () => { idleAction(); loop(); });
      ambient.push(call);
    };
    loop();
  }
  if (acts.length && lastTab !== "today") G.from(acts, { scale: 0.4, opacity: 0, duration: 0.5, stagger: 0.05, ease: "back.out(2.2)", delay: 0.2, clearProps: "all" });
}
function idleAction() {
  const p = document.getElementById("petInner"); if (!p || layer.innerHTML || tutOn) return;
  idleN++;
  if (S.lightsOff) { G.fromTo(p, { scaleY: 1 }, { scaleY: 0.96, transformOrigin: "50% 100%", duration: 1.4, yoyo: true, repeat: 1, ease: "sine.inOut" }); return; }
  const r = Math.random();
  if (r < 0.28) G.timeline().to(p, { y: -16, duration: 0.18, ease: "power2.out" }).to(p, { y: 0, duration: 0.4, ease: "bounce.out" });
  else if (r < 0.55) { const e = document.querySelectorAll("#room .eyes"); G.timeline().to(e, { x: -4, duration: 0.25 }).to(e, { x: 4, duration: 0.35, delay: 0.6 }).to(e, { x: 0, duration: 0.25, delay: 0.6 }); }
  else if (r < 0.8) G.timeline().to(p, { rotation: -6, transformOrigin: "50% 100%", duration: 0.15 }).to(p, { rotation: 6, duration: 0.15, repeat: 3, yoyo: true }).to(p, { rotation: 0, duration: 0.2 });
  else G.timeline().to(p, { scaleY: 1.08, scaleX: 0.95, transformOrigin: "50% 100%", duration: 0.5, ease: "sine.out" }).to(p, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, .5)" });
  if (idleN % 3 === 0 && !sayText && document.getElementById("bubbleTxt")) say(pick(L().idle), 5000);
}
function lookAt(clientX, clientY) {
  const room = document.getElementById("room"); if (!room || !anim) return;
  const r = room.getBoundingClientRect(); const cx = r.left + r.width * 0.5, cy = r.top + r.height * 0.6;
  const dx = Math.max(-1, Math.min(1, (clientX - cx) / (r.width * 0.4))), dy = Math.max(-1, Math.min(1, (clientY - cy) / (r.height * 0.4)));
  const e = room.querySelectorAll(".eyes");
  G.to(e, { x: dx * 4, y: dy * 3, duration: 0.2, overwrite: "auto" });
  G.to(e, { x: 0, y: 0, duration: 0.5, delay: 1.4, overwrite: false });
}
function shake(el) { if (anim && el) G.fromTo(el, { x: 0 }, { keyframes: [{ x: -5 }, { x: 5 }, { x: -3 }, { x: 0 }], duration: 0.3 }); }
function flySeed(rect, amount) {
  const pill = document.getElementById("seedPill"); if (!rect || !pill || !anim) return;
  const to = pill.getBoundingClientRect();
  const plus = document.createElement("span"); plus.className = "floatplus"; plus.textContent = `+${amount}`;
  plus.style.left = `${rect.right - 70}px`; plus.style.top = `${rect.top + rect.height / 2 - 12}px`; document.body.appendChild(plus);
  G.to(plus, { y: -34, opacity: 0, duration: 1, ease: "power2.out", onComplete: () => plus.remove() });
  for (let i = 0; i < 4; i++) {
    const s = document.createElement("span"); s.className = "flyseed"; s.innerHTML = SEED;
    const sx = rect.right - 60 + i * 6, sy = rect.top + rect.height / 2 - 9; s.style.left = `${sx}px`; s.style.top = `${sy}px`; document.body.appendChild(s);
    G.to(s, { x: to.left + 14 - sx, duration: 0.65, delay: i * 0.07, ease: "power1.in" });
    G.to(s, { y: to.top + 6 - sy, duration: 0.65, delay: i * 0.07, ease: "back.in(1.6)", onComplete: () => { s.remove(); if (i === 3) bumpSeeds(); } });
  }
}
function popTick(g) {
  if (!anim) return;
  const row = [...document.querySelectorAll(".goal")].find((x) => x.dataset.done === g); if (!row) return;
  const tk = row.querySelector(".tick svg"); if (tk) G.from(tk, { scale: 0, rotation: -60, duration: 0.55, ease: "back.out(3)" });
  const tc = row.querySelector(".tick"); if (tc) { const r = document.createElement("span"); r.className = "ripple"; tc.appendChild(r); G.fromTo(r, { scale: 0.6, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => r.remove() }); }
  G.fromTo(row, { scale: 0.97 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" });
}

/* --- Coccole, carezze e solletico --- */
function petTap() {
  if (suppressPetClick) { suppressPetClick = false; return; }
  const t = L(); const now = Date.now();
  tapTimes = tapTimes.filter((x) => now - x < 1300); tapTimes.push(now);
  if (S.lightsOff) { say(t.napSay, 1800); SND.play("purr"); return; }
  if (tapTimes.length >= 3) {
    tapTimes = []; const p = document.getElementById("petInner");
    if (p && anim) G.fromTo(p, { rotation: 0 }, { keyframes: [{ rotation: -8 }, { rotation: 8 }, { rotation: -8 }, { rotation: 8 }, { rotation: 0 }], transformOrigin: "50% 100%", duration: 0.5 });
    say(pick(t.tickle), 2200); SND.play("giggle"); SND.haptic([10, 30, 10, 30, 10]); burst("star", 6); addJoy(2); save(); return;
  }
  jump(false); burst("heart", 6); say(pick(t.talk.pat), 2200); SND.play("pop"); SND.haptic(10);
  addJoy(1); save(); refreshJoy();
}
function refreshJoy() {
  const j = Math.round(joyNow()); const f = document.querySelector('.fill[data-bar="joy"]'); if (!f) return;
  f.style.width = j + "%"; prevBar.joy = j; const v = f.closest(".meter").querySelector(".v"); if (v) v.textContent = j + "%";
}
document.addEventListener("pointerdown", (ev) => {
  const room = ev.target.closest && ev.target.closest("#room"); if (!room) return;
  lookAt(ev.clientX, ev.clientY);
  if (ev.target.id === "petHit") dragInfo = { x: ev.clientX, y: ev.clientY, dist: 0, step: 0 };
});
document.addEventListener("pointermove", (ev) => {
  if (!dragInfo || S.away) return;
  const d = Math.hypot(ev.clientX - dragInfo.x, ev.clientY - dragInfo.y); dragInfo.x = ev.clientX; dragInfo.y = ev.clientY; dragInfo.dist += d;
  if (dragInfo.dist > 30) suppressPetClick = true;
  if (dragInfo.dist - dragInfo.step > 70) {
    dragInfo.step = dragInfo.dist;
    const fx = document.getElementById("fx"), room = document.getElementById("room");
    if (fx && room) {
      const r = room.getBoundingClientRect(); const h = document.createElement("span"); h.innerHTML = fxGlyph("♥"); h.style.color = "#EE7FA0"; h.style.fontSize = "18px";
      h.style.left = `${ev.clientX - r.left}px`; h.style.top = `${ev.clientY - r.top - 20}px`; fx.appendChild(h);
      if (anim) G.to(h, { y: -50, x: (Math.random() - 0.5) * 30, opacity: 0, duration: 0.9, ease: "power2.out", onComplete: () => h.remove() }); else setTimeout(() => h.remove(), 500);
    }
    const p = document.getElementById("petInner"); if (p && anim) G.fromTo(p, { scaleY: 0.96, scaleX: 1.03 }, { scaleY: 1, scaleX: 1, transformOrigin: "50% 100%", duration: 0.35, ease: "elastic.out(1, .5)" });
    SND.play("purr"); SND.haptic(5);
    if (dragInfo.dist > 650 && Date.now() - strokeAt > 20000) {
      strokeAt = Date.now(); dragInfo.dist = 0; dragInfo.step = 0;
      const pi = document.getElementById("petInner"); if (pi && anim) G.to(pi, { rotation: 360, transformOrigin: "50% 60%", duration: 0.8, ease: "back.inOut(1.4)", onComplete: () => G.set(pi, { rotation: 0 }) });
      say(pick(L().stroke), 2600); SND.play("sparkle"); addJoy(5); save(); refreshJoy();
    }
  }
}, { passive: true });
document.addEventListener("pointerup", () => { dragInfo = null; setTimeout(() => { suppressPetClick = false; }, 60); });
document.addEventListener("pointercancel", () => { dragInfo = null; });

/* --- Regalo del giorno che cresce, regali speciali --- */
function openGift(b) {
  const t = L(); const amount = giftValue(S.visit.n);
  S.giftDay = S.day; S.seeds += amount; addJoy(3);
  let special = null;
  if (S.visit.n > 0 && S.visit.n % 7 === 0) { special = SPECIALS.find((x) => !S.owned.includes(x)) || null; if (special) { S.owned.push(special); if (special.startsWith("w_")) S.wall = special; else if (!S.furn.includes(special)) S.furn.push(special); } }
  save(); toast(t.giftBig(amount)); SND.play("jingle"); SND.haptic([15, 40, 25]); trackOnce("regalo");
  const after = () => {
    render(); burst("seed", 12); burst("confetti", 18); setExpr("wow", 1600);
    if (special) setTimeout(() => {
      layer.innerHTML = `<div class="overlay levelup" role="dialog" aria-modal="true" aria-labelledby="spT"><div class="box card"><div class="badge" id="spT" style="font-size:34px">${t.specialT}</div><div class="spitem">${itemArt(special)}</div><p><strong>${esc(t.specialP(t.items[special]))}</strong></p><button class="btn" id="closeLayer">${t.ok}</button></div></div>`;
      const box = layer.querySelector(".box"); box.insertAdjacentHTML("afterbegin", '<div class="rays" aria-hidden="true"></div><div class="fx" id="lfx"></div>');
      if (anim) { G.from(box, { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(2)" }); G.to(box.querySelector(".rays"), { rotation: 360, duration: 18, repeat: -1, ease: "none" }); }
      burst("confetti", 30, document.getElementById("lfx")); SND.play("fanfare");
    }, 900);
  };
  if (anim) G.timeline({ onComplete: after }).to(b, { scale: 1.25, rotation: -8, duration: 0.15 }).to(b, { rotation: 8, duration: 0.1, repeat: 2, yoyo: true }).to(b, { scale: 1.6, opacity: 0, y: -20, duration: 0.25 });
  else after();
}

/* --- Lettera del giorno --- */
function openLetter() {
  const t = L(); const txt = t.letters[S.letterN % t.letters.length];
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="lT"><div class="box"><div class="paper"><h2 id="lT">${t.letterT}</h2><p class="lt" id="ltxt">${esc(txt)}</p><p class="sign">${esc(t.letterSign(S.petName))}</p><div class="lpet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div></div><button class="btn" id="closeLetter">${t.ok}</button></div></div>`;
  SND.play("paper"); SND.haptic(10); trackOnce("lettera");
  if (anim) { G.from(".paper", { scale: 0.6, rotation: -6, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }); G.from("#ltxt", { opacity: 0, y: 8, duration: 0.6, delay: 0.35 }); }
}

/* --- Merenda --- */
function openFeed() {
  const t = L(); const left = feedLeft();
  if (left <= 0) { say(t.feedFull, 2600); shake(document.getElementById("petInner")); return; }
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="fT"><div class="sheet"><div class="grab"></div><h2 id="fT">${t.feedT}</h2><p class="small muted">${t.feedLeft(left)}</p><div class="snacks">${SNACKS.map((k) => `<button class="snack" data-snack="${k}">${snackSVG(k)}<span>${t.snacks[k]}</span>${FAV[S.pet] === k ? '<i class="favdot" aria-hidden="true">♥</i>' : ""}</button>`).join("")}</div><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) { G.from(".sheet", { y: 300, duration: 0.45, ease: "power3.out" }); G.from(".snack", { scale: 0.5, opacity: 0, stagger: 0.04, duration: 0.4, delay: 0.15, ease: "back.out(2)" }); }
}
function feedSnack(k) {
  const t = L(); layer.innerHTML = "";
  if (feedLeft() <= 0) return;
  const fav = FAV[S.pet] === k;
  S.fed = today(S.fed) ? { day: S.day, n: S.fed.n + 1 } : { day: S.day, n: 1 }; addJoy(fav ? 12 : 6); save(); trackOnce("merenda");
  const fx = document.getElementById("fx"), p = document.getElementById("petInner");
  const finish = () => { say(fav ? t.fav : pick(t.yum), 2600); burst("heart", fav ? 10 : 6); if (fav) { burst("star", 8); jump(true); setExpr("amore", 2200); } refreshJoy(); SND.haptic(fav ? [15, 40, 15, 40, 30] : 12); setTimeout(offerTogether, 2300); };
  if (!fx || !anim) { SND.play("chomp"); finish(); return; }
  const f = document.createElement("div"); f.className = "flyfood"; f.innerHTML = snackSVG(k); fx.appendChild(f);
  G.timeline({ onComplete: () => { f.remove(); finish(); } })
    .fromTo(f, { left: "50%", top: "-14%", scale: 0.6, xPercent: -50 }, { top: "44%", scale: 1, duration: 0.55, ease: "power2.out" })
    .to(f, { top: "60%", scale: 0.2, opacity: 0, duration: 0.3, ease: "power2.in", onStart: () => SND.play("chomp") })
    .to(p, { scaleY: 0.9, scaleX: 1.06, transformOrigin: "50% 100%", duration: 0.1, repeat: 5, yoyo: true }, "<");
}

/* --- Minigioco: acchiappa le stelle --- */
let game = null;
function openGame() {
  const t = L(); const best = (S.game && S.game.best) || 0;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="gT"><div class="gamebox"><div class="ghead"><h2 id="gT">${t.gameT}</h2><span class="pill" id="gScore">${t.gameScore(0)}</span></div><div class="gtime"><i id="gBar"></i></div><div class="arena" id="arena"><div class="gpet" id="gPet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><div class="gstart" id="gStart"><p>${t.gameP}</p><p class="small muted">${t.gameBest(best)}</p><button class="btn" id="gGo">${t.gameStart}</button></div></div><button class="link" id="closeGame">${t.close}</button></div></div>`;
  if (anim) G.from(".gamebox", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(1.8)" });
}
function startGame() {
  const arena = document.getElementById("arena"); if (!arena || !G) return;
  document.getElementById("gStart").remove();
  game = { score: 0, timers: [], tweens: [], end: Date.now() + GAME_SECS * 1000, over: false };
  const cd = document.createElement("div"); cd.className = "gcount"; arena.appendChild(cd);
  let n = 3; const tick = () => {
    if (!game) return;
    if (n === 0) { cd.textContent = "GO!"; SND.play("go"); G.fromTo(cd, { scale: 0.5, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.6, onComplete: () => cd.remove() }); game.end = Date.now() + GAME_SECS * 1000; runGame(); return; }
    cd.textContent = n; SND.play("beep"); G.fromTo(cd, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }); n--; game.timers.push(setTimeout(tick, 650));
  };
  tick();
}
function runGame() {
  const arena = document.getElementById("arena"); const bar = document.getElementById("gBar");
  game.tweens.push(G.fromTo(bar, { width: "100%" }, { width: "0%", duration: GAME_SECS, ease: "none" }));
  const spawn = () => {
    if (!game || game.over) return;
    const left = Date.now() < game.end; if (!left) { endGame(); return; }
    const gold = Math.random() < 0.16; const s = document.createElement("button"); s.className = "fstar" + (gold ? " gold" : ""); s.setAttribute("aria-label", gold ? "★ +3" : "★ +1");
    s.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.6L12 17.1l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8Z" fill="${gold ? "#FFC94D" : "#FFE7A0"}" stroke="${gold ? "#E9A23B" : "#F2C063"}" stroke-width="1.2"/></svg>`;
    s.style.left = `${4 + Math.random() * 78}%`; arena.appendChild(s);
    const H = arena.clientHeight; const elapsed = 1 - (game.end - Date.now()) / (GAME_SECS * 1000);
    const tw = G.fromTo(s, { y: -60, rotation: Math.random() * 60 - 30 }, { y: H + 10, rotation: "+=120", duration: 3.4 - elapsed * 1.3 + Math.random() * 0.6, ease: "none", onComplete: () => s.remove() });
    game.tweens.push(tw);
    s.addEventListener("pointerdown", (e) => {
      e.preventDefault(); if (s.dataset.hit || !game || game.over) return; s.dataset.hit = "1"; tw.kill();
      const pts = gold ? 3 : 1; game.score += pts; document.getElementById("gScore").textContent = L().gameScore(game.score);
      SND.catchSound(gold); SND.haptic(gold ? [10, 30, 15] : 8);
      const pl = document.createElement("span"); pl.className = "gplus"; pl.textContent = `+${pts}`; pl.style.left = s.style.left; pl.style.top = `${s.getBoundingClientRect().top - arena.getBoundingClientRect().top}px`; arena.appendChild(pl);
      G.to(pl, { y: -40, opacity: 0, duration: 0.7, onComplete: () => pl.remove() });
      G.to(s, { scale: 1.8, opacity: 0, duration: 0.25, onComplete: () => s.remove() });
      const gp = document.getElementById("gPet"); if (gp) G.fromTo(gp, { y: 0 }, { y: -18, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
      G.fromTo("#gScore", { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "back.out(3)" });
    });
    game.timers.push(setTimeout(spawn, Math.max(260, 480 - elapsed * 200)));
  };
  spawn();
}
function stopGame() { if (!game) return; game.over = true; game.timers.forEach(clearTimeout); game.tweens.forEach((x) => x.kill && x.kill()); }
function endGame() {
  if (!game || game.over) return; stopGame();
  const t = L(); const score = game.score; const left = gameSeedsLeft(); const earned = Math.max(0, Math.min(score, left));
  const prev = today(S.game) ? S.game : { day: S.day, seeds: 0, best: (S.game && S.game.best) || 0 };
  const newBest = score > (prev.best || 0);
  S.game = { day: S.day, seeds: prev.seeds + earned, best: Math.max(prev.best || 0, score) }; S.seeds += earned; addJoy(8); save(); trackOnce("gioco");
  const arena = document.getElementById("arena"); if (!arena) return;
  arena.querySelectorAll(".fstar").forEach((x) => x.remove());
  arena.insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${t.gameEnd(score)}</h3><p><strong>${earned ? t.gameSeeds(earned) : t.gameSeeds(0)}</strong></p>${newBest && score ? `<p class="small" style="color:#FFE7A0;font-weight:700">${t.gameBest(score)} ★</p>` : ""}<div class="row" style="justify-content:center">${score ? `<button class="btn ghost light" id="shareRecord" data-score="${score}">${t.share}</button>` : ""}<button class="btn" id="gGo">${t.gameAgain}</button></div></div>`);
  SND.play("fanfare"); SND.haptic([20, 50, 20]);
  if (anim) G.from(".gend", { scale: 0.7, opacity: 0, duration: 0.45, ease: "back.out(2)" });
  game = null;
}

/* --- Parliamo: come ti senti --- */
function openTalk() {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="tkT"><div class="box card talkbox"><div style="width:120px">${petSVG(S.pet, "normale", S.hat, stage(), S.petName)}</div><h2 id="tkT">${t.talkT}</h2><div class="moods" id="tkMoods">${t.moods.map((m, i) => `<button type="button" class="mood" data-talkmood="${i}">${MOOD_FACE[i]}<span>${m}</span></button>`).join("")}</div><div id="tkOut" class="stack-s" style="width:100%"></div><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".talkbox", { y: 30, opacity: 0, duration: 0.4, ease: "power3.out" });
}
function talkMood(i) {
  const t = L(); const reply = pick(t.talkReply[i]);
  S.diary.push({ day: dkey(), mood: i, text: "", q: t.talkQ }); if (S.diary.length > 400) S.diary.shift();
  addJoy(4); save(); trackOnce("parliamo");
  document.querySelectorAll("[data-talkmood]").forEach((m) => m.setAttribute("aria-pressed", String(+m.dataset.talkmood === i)));
  const out = document.getElementById("tkOut");
  out.innerHTML = `<p class="bubble static" id="tkReply"></p>${i <= 1 ? `<button class="btn" id="talkBreath">${t.talkBreath}</button><button class="btn ghost" id="talkCalm">${t.calmB}</button>` : ""}${i === 0 ? `<p class="small muted">${t.talkHelp}</p>` : ""}<p class="note">${t.talkSaved}</p>`;
  typeText(document.getElementById("tkReply"), reply);
  SND.play(i >= 3 ? "sparkle" : "pop"); SND.haptic(10);
}
function typeText(el, text) {
  if (!el) return; if (!anim) { el.textContent = text; return; }
  let k = 0; el.textContent = "";
  const step = () => { if (!el.isConnected) return; k += 2; el.textContent = text.slice(0, k); if (k < text.length) setTimeout(step, 22); };
  step();
}

/* --- Nanna --- */
function toggleNap(skipRitual) {
  const t = L(); const h = new Date().getHours();
  if (!S.lightsOff && !skipRitual && (h >= 19 || h < 5)) { openRitual(); return; }
  S.lightsOff = !S.lightsOff; save();
  if (S.lightsOff) {
    SND.play("lightoff"); if (SND.playing()) SND.skip(3);
    render(); say(t.napSay, 3000);
    const room = document.getElementById("room"); if (room && anim) G.from(room, { filter: "brightness(1.6)", duration: 0.6 });
  } else {
    SND.play("lighton"); if (napJoyDay !== S.day) { addJoy(3); napJoyDay = S.day; save(); }
    render(); say(t.wakeSay, 2600);
    const p = document.getElementById("petInner"); if (p && anim) G.timeline().to(p, { scaleY: 1.12, scaleX: 0.92, transformOrigin: "50% 100%", duration: 0.4 }).to(p, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, .4)" });
  }
  SND.haptic(12);
}

/* --- Foto ricordo --- */
async function takePhoto() {
  const t = L(); const room = document.getElementById("room");
  if (room) { const fl = document.createElement("div"); fl.className = "flash"; room.appendChild(fl); if (anim) G.to(fl, { opacity: 0, duration: 0.6, onComplete: () => fl.remove() }); else setTimeout(() => fl.remove(), 300); }
  SND.play("shutter"); SND.haptic(20); trackOnce("foto");
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="phT"><div class="box"><h2 id="phT">${t.photoT}</h2><div id="phOut" style="width:100%"></div><p class="small muted" id="phMsg" aria-live="polite">${t.photoMaking}</p><button class="btn ghost" id="closeLayer">${t.close}</button></div></div>`;
  try {
    let roomS = roomSVG({ ph: phase(), pet: S.pet, e: S.lightsOff ? "assonnato" : "felice", hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: false, glow: 0.95, label: "", season: season().id, dark: S.lightsOff });
    roomS = roomS.replace('<svg viewBox="0 0 360 300"', '<svg x="100" y="100" width="880" height="733" viewBox="0 0 360 300"');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1200" viewBox="0 0 1080 1200"><rect width="1080" height="1200" fill="#EADFCB"/><rect x="72" y="76" width="936" height="1060" rx="18" fill="#000" opacity=".12"/><g transform="rotate(-1.2 540 600)"><rect x="60" y="60" width="960" height="1070" rx="16" fill="#FFFDF8"/><clipPath id="pc"><rect x="100" y="100" width="880" height="733" rx="8"/></clipPath><g clip-path="url(#pc)">${roomS}</g></g><rect x="460" y="34" width="160" height="50" rx="6" fill="#F7E7B4" opacity=".85" transform="rotate(3 540 59)"/></svg>`;
    const img = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
    let url;
    try {
      try { await document.fonts.load('600 56px "Fredoka"'); } catch (e) { /* niente */ }
      const cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1200; const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
      c.save(); c.translate(540, 600); c.rotate(-1.2 * Math.PI / 180); c.translate(-540, -600);
      c.textAlign = "center"; c.fillStyle = "#2F2A26"; c.font = '600 58px "Fredoka", "Trebuchet MS", Arial, sans-serif'; c.fillText(S.petName, 540, 935);
      c.font = '500 32px "Figtree", "Segoe UI", Arial, sans-serif'; c.fillStyle = "#6E655D"; c.fillText(fmtDate(dkey()), 540, 990);
      c.font = '600 28px "Fredoka", "Trebuchet MS", Arial, sans-serif'; c.fillStyle = "#B5A58A"; c.fillText("Tanetto", 540, 1080); c.restore();
      url = cv.toDataURL("image/png");
    } catch (e) { url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
    const out = document.getElementById("phOut"); if (!out) return;
    out.innerHTML = `<img class="weekimg" id="photoImg" src="${url}" alt="${esc(S.petName)}">` + imgButtons("tanetto-foto.png");
    document.getElementById("phMsg").textContent = t.saveHint;
    if (anim) G.from("#photoImg", { y: -30, rotation: 4, opacity: 0, duration: 0.6, ease: "back.out(1.6)" });
  } catch (e) { const m = document.getElementById("phMsg"); if (m) m.textContent = t.weekErr; }
}

/* --- Guida iniziale --- */
const TUT_TARGETS = ["#petHit", "#gift", "#actions", ".goal", "#tabs"];
function maybeTutorial() {
  if (tutOn || !S.pet || S.tut >= 99 || tab !== "today" || layer.innerHTML || S.away) return;
  setTimeout(showTutStep, anim ? 700 : 50);
}
let tutGen = 0;
function tutClose(done) {
  tutGen++; document.querySelectorAll(".tutwrap").forEach((x) => x.remove()); tutOn = false;
  if (done) { S.tut = 99; save(); trackOnce("tutorial-finito"); }
}
function showTutStep() {
  if (S.tut >= 99 || tab !== "today" || !S.pet) return;
  let i = S.tut; let el = null;
  while (i < TUT_TARGETS.length && !(el = document.querySelector(TUT_TARGETS[i]))) i++;
  if (i >= TUT_TARGETS.length) { S.tut = 99; save(); tutClose(true); return; }
  S.tut = i; save(); tutOn = true;
  document.querySelectorAll(".tutwrap").forEach((x) => x.remove());
  const t = L(); const last = i === TUT_TARGETS.length - 1 || !TUT_TARGETS.slice(i + 1).some((s) => document.querySelector(s));
  if (TUT_TARGETS[i] !== "#tabs") el.scrollIntoView({ block: "center", behavior: anim ? "smooth" : "auto" });
  const gen = ++tutGen;
  setTimeout(() => {
    if (gen !== tutGen || !tutOn) return; if (!el.isConnected) { el = document.querySelector(TUT_TARGETS[i]); if (!el) { tutClose(true); return; } }
    document.querySelectorAll(".tutwrap").forEach((x) => x.remove());
    const r = el.getBoundingClientRect(); const pad = 8;
    const w = document.createElement("div"); w.className = "tutwrap";
    w.innerHTML = `<div class="tutblock"></div><div class="tutring" style="left:${r.left - pad}px;top:${r.top - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px"></div><div class="tutbox card" role="dialog" aria-live="polite"><p>${esc(t.tut[i].split("{n}").join(S.petName))}</p><div class="row"><button class="link" id="tutSkip">${t.tutSkip}</button><span class="spacer"></span><span class="small muted">${i + 1}/${TUT_TARGETS.length}</span><button class="btn small" id="tutNext">${last ? t.tutDone : t.tutNext}</button></div></div>`;
    document.body.appendChild(w);
    const box = w.querySelector(".tutbox"); const bh = box.offsetHeight; const vh = window.innerHeight;
    const below = r.bottom + pad + 14; const top = below + bh < vh - 10 ? below : Math.max(10, r.top - pad - 14 - bh);
    box.style.top = `${top}px`;
    if (anim) { G.from(w.querySelector(".tutring"), { scale: 1.15, opacity: 0, duration: 0.4, ease: "power2.out" }); G.from(box, { y: 12, opacity: 0, duration: 0.35, delay: 0.1 }); }
    w.querySelector("#tutNext").focus();
  }, anim ? 450 : 30);
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  if (b.id === "tutNext") { ev.stopPropagation(); SND.play("click"); S.tut++; save(); if (S.tut >= TUT_TARGETS.length) { tutClose(true); burst("confetti", 24); SND.play("fanfare"); return; } showTutStep(); return; }
  if (b.id === "tutSkip") { ev.stopPropagation(); tutClose(true); return; }
}, true);
let tutRz = null;
window.addEventListener("resize", () => { if (!tutOn) return; clearTimeout(tutRz); tutRz = setTimeout(() => { if (tutOn) showTutStep(); }, 250); });

/* --- Gestione dei nuovi pulsanti --- */
let clickT0 = 0;
document.addEventListener("click", () => { clickT0 = performance.now(); }, true);
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  const t = L();
  if (b.dataset.act) {
    const a = b.dataset.act;
    if (anim) G.fromTo(b.querySelector(".aci"), { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" });
    if (a === "feed") openFeed(); else if (a === "play") openHub(); else if (a === "talk") openTalk(); else if (a === "nap" || a === "wake") toggleNap(); else if (a === "photo") takePhoto();
    return;
  }
  if (b.dataset.snack) { feedSnack(b.dataset.snack); return; }
  if (b.id === "gGo") { if (!document.getElementById("gStart")) { const e = document.querySelector(".gend"); if (e) e.remove(); const st = document.createElement("div"); st.id = "gStart"; document.getElementById("arena").appendChild(st); } startGame(); return; }
  if (b.id === "closeGame") { stopGame(); game = null; SND.breathStop(); fadeLayer(); render(); flushPending(); return; }
  if (b.dataset.talkmood !== undefined) { talkMood(+b.dataset.talkmood); return; }
  if (b.id === "talkBreath") { layer.innerHTML = ""; breathe(); return; }
  if (b.id === "letter") { openLetter(); return; }
  if (b.id === "closeLetter") { S.letterDay = S.day; S.letterN++; addJoy(3); save(); layer.innerHTML = ""; render(); return; }
  if (b.id === "hapSw") { S.haptic = !S.haptic; save(); SND.haptic(20); render(); return; }
  if (b.dataset.track !== undefined) { S.track = +b.dataset.track; save(); if (!S.music) { S.music = true; save(); SND.musicOn(S.track); } else SND.skip(S.track); render(); return; }
});
/* Un suono e una vibrazione leggera per ogni tocco che non ne ha già uno */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button, a.btn, select"); if (!b) return;
  setTimeout(() => { if (SND.lastAt() < clickT0) SND.play("tap"); }, 0);
  SND.haptic(6);
});
SND.setOnTrack((i) => { if (S.track !== i && S.music) { S.track = i; save(); if (tab === "more" && !layer.innerHTML) { const y = window.scrollY; render(); window.scrollTo(0, y); } } });

/* Effetto "molla" su ogni pulsante */
const NO_PRESS = ".post, .gift, .letter, .fstar, .pethit, .switch";
document.addEventListener("pointerdown", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || !anim || b.disabled || b.matches(NO_PRESS)) return;
  /* 1.0.9: pulsante principale del marchio = .92 (con increspatura, 98za); gli altri pulsanti .94; si torna come un oggetto (back.out) */
  G.to(b, { scale: b.classList.contains("btn") ? 0.92 : 0.94, duration: 0.09, ease: "power2.out", overwrite: "auto" });
  const up = () => { G.to(b, { scale: 1, duration: 0.42, ease: "back.out(2.2)", overwrite: "auto" }); document.removeEventListener("pointerup", up); document.removeEventListener("pointercancel", up); };
  document.addEventListener("pointerup", up); document.addEventListener("pointercancel", up);
}, { passive: true });
