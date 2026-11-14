/* v17 - Due giochi nuovi: "Salta!" (il compagno corre e salta) e "Torre di cuscini" (impila i cuscini). */
const V17G = {
  it: { jump: ["Salta!", "Corri, salta e raccogli le foglie"], tower: ["Torre di cuscini", "Costruisci la torre più morbida"], jumpP: "Tocca per saltare, tocca di nuovo in aria per un doppio salto. Evita pozzanghere e sassi e prendi foglie e stelle!", towerP: "Tocca per lasciar cadere il cuscino. Quello che sporge cade giù: impilali bene dritti!", towerEnd: (n) => `Cuscini nella torre: ${n}!`, perfect: "Perfetto!" },
  en: { jump: ["Hop!", "Run, jump and collect leaves"], tower: ["Pillow tower", "Build the softest tower"], jumpP: "Tap to jump, tap again in the air for a double jump. Dodge puddles and rocks, grab leaves and stars!", towerP: "Tap to drop the pillow. Whatever hangs over falls off, so stack them nice and straight!", towerEnd: (n) => `Pillows in your tower: ${n}!`, perfect: "Perfect!" },
  de: { jump: ["Hüpf!", "Lauf, spring und sammle Blätter"], tower: ["Kissenturm", "Bau den weichsten Turm"], jumpP: "Tippe zum Springen, tippe in der Luft noch einmal für einen Doppelsprung. Weiche Pfützen und Steinen aus und schnapp dir Blätter und Sterne!", towerP: "Tippe, um das Kissen fallen zu lassen. Was übersteht, fällt runter – also schön gerade stapeln!", towerEnd: (n) => `Kissen im Turm: ${n}!`, perfect: "Perfekt!" },
  es: { jump: ["¡Salta!", "Corre, salta y recoge hojas"], tower: ["Torre de cojines", "Construye la torre más blandita"], jumpP: "Toca para saltar y vuelve a tocar en el aire para un doble salto. ¡Esquiva charcos y piedras y atrapa hojas y estrellas!", towerP: "Toca para dejar caer el cojín. Lo que sobresale se cae: ¡apílalos bien rectos!", towerEnd: (n) => `¡Cojines en tu torre: ${n}!`, perfect: "¡Perfecto!" },
  fr: { jump: ["Saute !", "Cours, saute et ramasse des feuilles"], tower: ["Tour de coussins", "Construis la tour la plus douce"], jumpP: "Touche pour sauter, retouche en l'air pour un double saut. Évite les flaques et les cailloux, attrape les feuilles et les étoiles !", towerP: "Touche pour lâcher le coussin. Ce qui dépasse tombe : empile-les bien droit !", towerEnd: (n) => `Coussins dans ta tour : ${n} !`, perfect: "Parfait !" },
  pt: { jump: ["Pula!", "Corra, pule e pegue folhas"], tower: ["Torre de almofadas", "Construa a torre mais fofinha"], jumpP: "Toque para pular e toque de novo no ar para um pulo duplo. Desvie das poças e pedras e pegue folhas e estrelas!", towerP: "Toque para soltar a almofada. O que sobra para fora cai: empilhe bem retinho!", towerEnd: (n) => `Almofadas na torre: ${n}!`, perfect: "Perfeito!" },
  ja: { jump: ["ジャンプ！", "走って跳んで、葉っぱを集めよう"], tower: ["クッションタワー", "いちばんふわふわの塔をつくろう"], jumpP: "タップでジャンプ、空中でもう一度タップで2段ジャンプ。水たまりと石をよけて、葉っぱと星を集めよう！", towerP: "タップでクッションを落とそう。はみ出した部分は落ちちゃうから、まっすぐ積んでね！", towerEnd: (n) => `タワーのクッション：${n}個！`, perfect: "パーフェクト！" },
  ko: { jump: ["점프!", "달리고 뛰어서 나뭇잎을 모아요"], tower: ["쿠션 탑", "가장 폭신한 탑을 쌓아요"], jumpP: "탭하면 점프, 공중에서 한 번 더 탭하면 2단 점프! 웅덩이와 돌을 피하고 나뭇잎과 별을 모아요!", towerP: "탭해서 쿠션을 떨어뜨려요. 삐져나온 부분은 떨어지니 반듯하게 쌓아요!", towerEnd: (n) => `탑의 쿠션: ${n}개!`, perfect: "완벽해요!" },
  zh: { jump: ["跳一跳！", "奔跑、跳跃、收集树叶"], tower: ["靠垫塔", "搭一座最软的塔"], jumpP: "点一下跳起来，空中再点一下二段跳。避开水坑和石头，收集树叶和星星！", towerP: "点一下放下靠垫。伸出去的部分会掉下去，要叠得整整齐齐哦！", towerEnd: (n) => `塔上的靠垫：${n}个！`, perfect: "完美！" },
  zht: { jump: ["跳一跳！", "奔跑、跳躍、收集樹葉"], tower: ["靠墊塔", "堆一座最軟的塔"], jumpP: "點一下跳起來，空中再點一下二段跳。避開水坑和石頭，收集樹葉和星星！", towerP: "點一下放下靠墊。突出去的部分會掉下去，要疊得整整齊齊喔！", towerEnd: (n) => `塔上的靠墊：${n}個！`, perfect: "完美！" },
  ru: { jump: ["Прыг!", "Беги, прыгай и собирай листочки"], tower: ["Башня из подушек", "Построй самую мягкую башню"], jumpP: "Нажми, чтобы прыгнуть, и нажми ещё раз в воздухе для двойного прыжка. Обходи лужи и камни, собирай листочки и звёзды!", towerP: "Нажми, чтобы уронить подушку. Всё, что свисает, упадёт — складывай ровно!", towerEnd: (n) => `Подушек в башне: ${n}!`, perfect: "Идеально!" },
  pl: { jump: ["Hop!", "Biegnij, skacz i zbieraj listki"], tower: ["Wieża z poduszek", "Zbuduj najmiększą wieżę"], jumpP: "Dotknij, aby skoczyć, i dotknij jeszcze raz w powietrzu, aby zrobić podwójny skok. Omijaj kałuże i kamienie, zbieraj listki i gwiazdki!", towerP: "Dotknij, aby upuścić poduszkę. To, co wystaje, spada — układaj równo!", towerEnd: (n) => `Poduszek w wieży: ${n}!`, perfect: "Idealnie!" },
  nl: { jump: ["Hup!", "Ren, spring en verzamel blaadjes"], tower: ["Kussentoren", "Bouw de zachtste toren"], jumpP: "Tik om te springen en tik nog eens in de lucht voor een dubbele sprong. Ontwijk plassen en stenen en pak blaadjes en sterren!", towerP: "Tik om het kussen te laten vallen. Wat uitsteekt valt eraf, dus stapel ze mooi recht!", towerEnd: (n) => `Kussens in je toren: ${n}!`, perfect: "Perfect!" },
  tr: { jump: ["Zıpla!", "Koş, zıpla ve yaprakları topla"], tower: ["Yastık kulesi", "En yumuşak kuleyi yap"], jumpP: "Zıplamak için dokun, havadayken bir daha dokun ve çift zıpla. Su birikintilerinden ve taşlardan kaç, yaprak ve yıldız topla!", towerP: "Yastığı bırakmak için dokun. Taşan kısım düşer, düzgünce üst üste koy!", towerEnd: (n) => `Kuledeki yastık: ${n}!`, perfect: "Mükemmel!" }
};
Object.keys(V17G).forEach((k) => { if (!T[k]) return; T[k].games = T[k].games || {}; T[k].games.jump = V17G[k].jump; T[k].games.tower = V17G[k].tower; });
const g17 = () => V17G[S.lang] || V17G.en;
const JUMP_SECS = 45;
/* i due giochi nuovi in cima alla lista, cosi' si vedono subito */
GAMES.unshift("jump", "tower");
GCOL.jump = "#E9845A"; GCOL.tower = "#B178D0";
GICON.jump = '<path d="M3 19h18" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M5 16c2-7 6-9 8-9s4 2 6 7" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="2.5 2.5" stroke-linecap="round"/><circle cx="13" cy="7" r="3" fill="#fff"/>';
GICON.tower = '<rect x="5" y="16" width="14" height="4.5" rx="2.2" fill="#fff"/><rect x="6.5" y="10.5" width="11" height="4.5" rx="2.2" fill="#fff" opacity=".85"/><rect x="8" y="5" width="8" height="4.5" rx="2.2" fill="#fff" opacity=".7"/>';

const gbest = (k) => ((S.gbest || {})[k] || 0);
function gbestSet(k, v) { S.gbest = S.gbest || {}; const nb = v > (S.gbest[k] || 0); if (nb) S.gbest[k] = v; return nb; }
const HEART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>';
const LEAF_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 10 5 20 4c0 9-5 15-15 15Z" fill="#7CC36E" stroke="#4E9A47" stroke-width="1.4"/><path d="M6 18c3-4 7-8 11-11" stroke="#4E9A47" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>';
const STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.6L12 17.1l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8Z" fill="#FFC94D" stroke="#E9A23B" stroke-width="1.2"/></svg>';

const _stopGameV17 = stopGame;
stopGame = function () { if (game && game.raf) { cancelAnimationFrame(game.raf); game.raf = 0; } _stopGameV17(); };
function g17float(arena, x, y, text, cls) {
  const pl = document.createElement("span"); pl.className = "gplus " + (cls || ""); pl.textContent = text; pl.style.left = `${x}px`; pl.style.top = `${y}px`; arena.appendChild(pl);
  if (anim) G.to(pl, { y: -42, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => pl.remove() }); else setTimeout(() => pl.remove(), 700);
}
function g17count(arena, then) {
  const cd = document.createElement("div"); cd.className = "gcount"; arena.appendChild(cd);
  let n = 3; const tick = () => {
    if (!game || game.over) { cd.remove(); return; }
    if (n === 0) { cd.textContent = "GO!"; SND.play("go"); if (anim) G.fromTo(cd, { scale: 0.5, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.6, onComplete: () => cd.remove() }); else setTimeout(() => cd.remove(), 400); then(); return; }
    cd.textContent = n; SND.play("beep"); if (anim) G.fromTo(cd, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }); n--; game.timers.push(setTimeout(tick, 650));
  };
  tick();
}
function g17end(key, score, title, againId) {
  const t = L(); stopGame(); const seeds = awardGameSeeds(score); const nb = gbestSet(key, score) && score > 0; addJoy(6); save(); trackOnce("gioco-" + key);
  const arena = document.getElementById("arena"); if (!arena) return;
  arena.insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${esc(title)}</h3><p><strong>${seedsLine(seeds)}</strong></p>${nb ? `<p class="small g17best">${t.gameBest(score)} ★</p>` : ""}<button class="btn" id="${againId}">${t.gameAgain}</button></div>`);
  SND.play(score >= 10 ? "fanfare" : "chime"); SND.haptic([20, 50, 20]);
  if (anim) G.from(".gend", { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* =================== SALTA! =================== */
function openJump() {
  const t = L(); const pet = petSVG(S.pet, "felice", S.hat, stage(), S.petName);
  shell("jump", `<div class="gtime"><i id="gBar"></i></div><div class="arena runarena" id="arena"><div class="rsky" aria-hidden="true"><i class="rsun"></i><i class="rcloud c1"></i><i class="rcloud c2"></i><i class="rcloud c3"></i><i class="rhill h1"></i><i class="rhill h2"></i></div><div class="rground" aria-hidden="true"><div class="rgstrip" id="rStrip"></div></div><div class="rhearts" id="rHearts" aria-label="3">${HEART_SVG.repeat(3)}</div><div class="rpet" id="rPet"><div class="rpin" id="rPin"><div class="rsq" id="rSq">${pet}</div></div></div><i class="rshadow" id="rShadow"></i>${startScreen(g17().jumpP)}</div>`, `<span class="pill" id="gScore">${t.gameScore(0)}</span>`);
  /* compagno gia' al suo posto sul prato, prima di iniziare */
  const arena = document.getElementById("arena"); const W = arena.clientWidth, H = arena.clientHeight; const P = Math.round(Math.min(78, W * 0.2));
  game.W = W; game.H = H; game.u = H / 460; game.P = P; game.gy = Math.round(H * 0.8); game.px = Math.round(W * 0.13); game.y = 0; game.objs = []; game.dist = 0; game.inv = 0;
  const rp = document.getElementById("rPet"); rp.style.width = rp.style.height = `${P}px`; jumpDraw();
}
function jumpStart() {
  const arena = document.getElementById("arena"); const st = document.getElementById("gStart"); if (!arena) return; if (st) st.remove();
  arena.querySelectorAll(".gend, .robj").forEach((x) => x.remove());
  const W = arena.clientWidth, H = arena.clientHeight, u = H / 460, P = Math.round(Math.min(78, W * 0.2));
  game = Object.assign(game || {}, { kind: "jump", timers: [], tweens: [], over: false, run: false, score: 0, hearts: 3, objs: [], W, H, u, P, gy: Math.round(H * 0.8), px: Math.round(W * 0.13), y: 0, vy: 0, jumps: 0, t: 0, dist: 0, next: 1.1, inv: 0, raf: 0, last: 0, spin: 0 });
  const rp = document.getElementById("rPet"); rp.style.width = rp.style.height = `${P}px`;
  document.getElementById("rHearts").innerHTML = HEART_SVG.repeat(3);
  document.getElementById("gScore").textContent = L().gameScore(0);
  const bar = document.getElementById("gBar"); if (bar) bar.style.width = "100%";
  jumpDraw(); g17count(arena, () => { if (!game || game.over) return; game.run = true; game.last = performance.now(); game.raf = requestAnimationFrame(jumpLoop); });
}
function jumpTap() {
  const g = game; if (!g || g.kind !== "jump" || !g.run || g.over) return;
  if (g.y === 0) { g.vy = 980 * g.u; g.jumps = 1; SND.play("tap"); SND.haptic(6); }
  else if (g.jumps === 1) { g.vy = 840 * g.u; g.jumps = 2; g.spin = 1; SND.play("pop"); SND.haptic(8); }
}
function jumpSpawn() {
  const g = game; const r = Math.random(); const u = g.u;
  const add = (o) => { const el = document.createElement("i"); el.className = "robj " + o.cls; el.style.width = `${o.w}px`; el.style.height = `${o.h}px`; if (o.svg) el.innerHTML = o.svg; document.getElementById("arena").insertBefore(el, document.getElementById("rPet")); o.el = el; o.x = g.W + 20; g.objs.push(o); };
  if (r < 0.62) {
    const k = Math.random(); const o = k < 0.4 ? { cls: "puddle", w: 74 * u, h: 16 * u, hit: true, y: 0 } : k < 0.75 ? { cls: "rock", w: 42 * u, h: 34 * u, hit: true, y: 0 } : { cls: "log", w: 66 * u, h: 30 * u, hit: true, y: 0 };
    add(o);
    if (Math.random() < 0.55) add({ cls: "leaf", w: 30 * u, h: 30 * u, pts: 1, y: o.h + (70 + Math.random() * 60) * u, svg: LEAF_SVG, dx: o.w / 2 - 15 * u });
  } else {
    const high = Math.random() < 0.5; const star = high && Math.random() < 0.4;
    add(star ? { cls: "star", w: 32 * u, h: 32 * u, pts: 3, y: 170 * u, svg: STAR_SVG } : { cls: "leaf", w: 30 * u, h: 30 * u, pts: 1, y: high ? 120 * u : 26 * u, svg: LEAF_SVG });
    if (Math.random() < 0.5) add({ cls: "leaf", w: 30 * u, h: 30 * u, pts: 1, y: high ? 120 * u : 26 * u, svg: LEAF_SVG, dx: 42 * u });
  }
}
function jumpLoop(now) {
  const g = game; if (!g || g.kind !== "jump" || g.over) return;
  const dt = Math.min(0.05, (now - g.last) / 1000); g.last = now; g.t += dt;
  const sp = (250 + Math.min(1, g.t / JUMP_SECS) * 250) * g.u; g.dist += sp * dt;
  /* salto */
  if (g.y > 0 || g.vy > 0) { g.vy -= 2800 * g.u * dt; g.y += g.vy * dt; if (g.y <= 0) { g.y = 0; g.vy = 0; g.jumps = 0; g.spin = 0; jumpLand(); } }
  if (g.spin) g.spin = Math.min(2, g.spin + dt * 2.6);
  /* oggetti */
  g.next -= dt; if (g.next <= 0 && g.t < JUMP_SECS - 1.2) { jumpSpawn(); g.next = Math.max(0.62, 0.9 + Math.random() * 0.75 - Math.min(0.35, g.t / 130)); }
  const px0 = g.px + g.P * 0.24, px1 = g.px + g.P * 0.76, py0 = g.y + g.P * 0.05, py1 = g.y + g.P * 0.72;
  if (g.inv > 0) g.inv -= dt;
  for (let i = g.objs.length - 1; i >= 0; i--) {
    const o = g.objs[i]; o.x -= sp * dt; const ox = o.x + (o.dx || 0);
    if (ox + o.w < -10) { o.el.remove(); g.objs.splice(i, 1); continue; }
    if (o.done) continue;
    const sx = o.hit ? o.w * 0.16 : 0, sy = o.hit ? o.h * 0.2 : 0;
    const hit = ox + sx < px1 && ox + o.w - sx > px0 && o.y + sy < py1 && o.y + o.h - sy > py0;
    if (!hit) continue;
    if (o.pts) { o.done = true; g.score += o.pts; SND.catchSound(o.pts > 1); SND.haptic(o.pts > 1 ? [10, 30, 15] : 8); document.getElementById("gScore").textContent = L().gameScore(g.score); g17float(document.getElementById("arena"), ox, g.gy - o.y - o.h - 10, `+${o.pts}`); if (anim) { G.to(o.el, { scale: 1.8, opacity: 0, duration: 0.25 }); G.fromTo("#gScore", { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }); } else o.el.style.opacity = 0; }
    else if (g.inv <= 0) { o.done = true; jumpHurt(); if (g.over) return; }
  }
  jumpDraw();
  const bar = document.getElementById("gBar"); if (bar) bar.style.width = `${Math.max(0, 100 - (g.t / JUMP_SECS) * 100)}%`;
  if (g.t >= JUMP_SECS) { jumpEnd(); return; }
  g.raf = requestAnimationFrame(jumpLoop);
}
function jumpDraw() {
  const g = game; if (!g) return;
  const rp = document.getElementById("rPet"); const pin = document.getElementById("rPin"); const sh = document.getElementById("rShadow"); if (!rp) return;
  const top = g.gy - g.P - g.y;
  const air = g.y > 0; const rot = g.spin ? -360 * Math.min(1, g.spin) : air ? (g.vy > 0 ? -8 : 6) : 0;
  rp.style.transform = `translate3d(${g.px}px, ${top}px, 0)`;
  pin.style.transform = `rotate(${rot}deg)`; rp.classList.toggle("air", air); rp.classList.toggle("blink", g.inv > 0);
  const k = Math.max(0.35, 1 - g.y / (240 * g.u));
  if (sh) sh.style.transform = `translate3d(${g.px + g.P * 0.2}px, ${g.gy - 6}px, 0) scale(${k}, ${k})`;
  for (const o of g.objs) o.el.style.transform = `translate3d(${o.x + (o.dx || 0)}px, ${g.gy - o.h - o.y}px, 0)`;
  const strip = document.getElementById("rStrip"); if (strip) strip.style.transform = `translate3d(${-(g.dist % 48)}px, 0, 0)`;
  document.querySelectorAll(".runarena .rcloud").forEach((c, i) => { const w = g.W + 160; const x = ((g.W * (0.2 + i * 0.33) - g.dist * (0.08 + i * 0.04)) % w + w) % w - 120; c.style.transform = `translate3d(${x}px, 0, 0)`; });
  document.querySelectorAll(".runarena .rhill").forEach((c, i) => { const w = g.W + 300; const x = ((g.W * (i ? 0.55 : 0) - g.dist * (0.2 + i * 0.1)) % w + w) % w - 220; c.style.transform = `translate3d(${x}px, 0, 0)`; });
}
function jumpLand() { const pin = document.getElementById("rSq"); if (pin && anim) G.fromTo(pin, { scaleY: 0.82, scaleX: 1.14 }, { scaleY: 1, scaleX: 1, duration: 0.3, ease: "elastic.out(1, .5)", transformOrigin: "50% 100%" }); }
function jumpHurt() {
  const g = game; g.hearts--; g.inv = 1.3; SND.play("miss"); SND.haptic([30, 40, 30]);
  const hs = document.getElementById("rHearts"); if (hs) { hs.setAttribute("aria-label", String(g.hearts)); const lost = hs.querySelectorAll("svg")[g.hearts]; if (lost) { lost.classList.add("lost"); if (anim) G.fromTo(lost, { scale: 1.4 }, { scale: 1, duration: 0.35 }); } }
  const ar = document.getElementById("arena"); if (ar && anim) G.fromTo(ar, { x: -6 }, { x: 0, duration: 0.35, ease: "elastic.out(1, .3)" });
  if (g.hearts <= 0) jumpEnd();
}
function jumpEnd() { const g = game; if (!g || g.over) return; g.run = false; g17end("jump", g.score, L().gameEnd(g.score), "jumpAgain"); }

/* =================== TORRE DI CUSCINI =================== */
const PILLOWS = [["#F7B8C8", "#E98FA8"], ["#BFD9F5", "#8DB7E6"], ["#C8E8B9", "#97CC80"], ["#FCE1A8", "#F2C46B"], ["#D9C9F2", "#B39BE3"], ["#FBCBA8", "#F2A57A"], ["#BDE7E0", "#86CFC3"], ["#F2D0E4", "#DDA4C6"]];
function openTower() {
  const t = L(); const pet = petSVG(S.pet, "felice", S.hat, stage(), S.petName);
  shell("tower", `<div class="arena towerarena" id="arena"><div class="twwall" aria-hidden="true"></div><div class="twworld" id="twWorld"></div><div class="tpet" id="tPet">${pet}</div>${startScreen(g17().towerP)}</div>`, `<span class="pill" id="gScore">${t.gameScore(0)}</span>`);
}
function towerBlock(x, y, w, h, i, cls) {
  const el = document.createElement("i"); el.className = "pillow " + (cls || ""); const [a, b] = PILLOWS[i % PILLOWS.length];
  el.style.cssText = `width:${w}px;height:${h}px;background:linear-gradient(180deg, ${a}, ${b});transform:translate3d(${x}px, ${y}px, 0)`;
  document.getElementById("twWorld").appendChild(el); return el;
}
function towerStart() {
  const arena = document.getElementById("arena"); const st = document.getElementById("gStart"); if (!arena) return; if (st) st.remove();
  arena.querySelectorAll(".gend").forEach((x) => x.remove());
  const world = document.getElementById("twWorld"); world.innerHTML = ""; if (anim) G.set(world, { x: 0, y: 0 }); else world.style.transform = "translate3d(0,0,0)";
  const tp = document.getElementById("tPet"); if (anim) G.set(tp, { x: 0, y: 0, rotation: 0 }); else tp.style.transform = ""; tp.classList.remove("ontop");
  const W = arena.clientWidth, H = arena.clientHeight, u = H / 460; const bh = Math.round(34 * u); const w0 = Math.round(W * 0.52);
  const baseY = H - bh - Math.round(18 * u);
  game = Object.assign(game || {}, { kind: "tower", timers: [], tweens: [], over: false, run: false, score: 0, W, H, u, bh, stack: [{ x: (W - w0) / 2, w: w0, y: baseY }], cam: 0, combo: 0, mv: null, raf: 0, last: 0, busy: false });
  towerBlock((W - w0) / 2, baseY, w0, bh, 0, "base");
  document.getElementById("gScore").textContent = L().gameScore(0);
  g17count(arena, () => { if (!game || game.over) return; game.run = true; towerNext(); game.last = performance.now(); game.raf = requestAnimationFrame(towerLoop); });
}
function towerNext() {
  const g = game; const top = g.stack[g.stack.length - 1]; const i = g.stack.length;
  const y = top.y - g.bh * 3.2; const fromLeft = i % 2 === 0;
  g.mv = { x: fromLeft ? -top.w * 0.6 : g.W - top.w * 0.4, w: top.w, y, dir: fromLeft ? 1 : -1, el: towerBlock(0, y, top.w, g.bh, i, "moving") };
  g.mv.speed = Math.min(560, 150 + i * 13) * g.u;
}
function towerLoop(now) {
  const g = game; if (!g || g.kind !== "tower" || g.over) return;
  const dt = Math.min(0.05, (now - g.last) / 1000); g.last = now; const m = g.mv;
  if (m && !g.busy) {
    m.x += m.dir * m.speed * dt; const lo = -m.w * 0.6, hi = g.W - m.w * 0.4;
    if (m.x > hi) { m.x = hi; m.dir = -1; } if (m.x < lo) { m.x = lo; m.dir = 1; }
    m.el.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
  }
  g.raf = requestAnimationFrame(towerLoop);
}
function towerTap() {
  const g = game; if (!g || g.kind !== "tower" || !g.run || g.over || g.busy || !g.mv) return;
  const m = g.mv; const top = g.stack[g.stack.length - 1]; g.busy = true;
  const tol = 5 * g.u; let x = m.x, w = m.w; const perfect = Math.abs(x - top.x) <= tol;
  if (perfect) x = top.x;
  const l = Math.max(x, top.x), r = Math.min(x + w, top.x + top.w);
  const landY = top.y - g.bh;
  const land = () => {
    if (!game || game.over) return;
    if (r - l < 4) { towerMiss(m, landY); return; }
    const cutW = w - (r - l);
    if (cutW > 0.5 && !perfect) { const offX = x < top.x ? x : r; towerChunk(offX, landY, cutW, m.el.style.background, x < top.x ? -1 : 1); }
    let nw = r - l; g.combo = perfect ? g.combo + 1 : 0;
    if (perfect && g.combo >= 3) nw = Math.min(g.stack[0].w, nw + 6 * g.u);
    m.el.classList.remove("moving"); m.el.style.width = `${nw}px`; if (anim) G.set(m.el, { x: l, y: landY }); else m.el.style.transform = `translate3d(${l}px, ${landY}px, 0)`;
    g.stack.push({ x: l, w: nw, y: landY }); g.score++; g.mv = null;
    document.getElementById("gScore").textContent = L().gameScore(g.score);
    if (anim) { G.fromTo(m.el, { scaleY: 0.7, scaleX: 1.06 }, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "elastic.out(1, .45)", transformOrigin: "50% 100%" }); G.fromTo("#gScore", { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }); }
    const ar = document.getElementById("arena");
    if (perfect) { SND.play("sparkle"); SND.haptic([8, 30, 8]); g17float(ar, l + nw / 2 - 40, landY + g.cam - 34, g17().perfect, "g17perf"); } else { SND.play("pop"); SND.haptic(10); }
    /* la telecamera sale con la torre */
    const want = Math.max(0, (g.stack.length - 1) * g.bh - g.H * 0.42);
    if (want !== g.cam) { g.cam = want; const wd = document.getElementById("twWorld"); if (anim) g.tweens.push(G.to(wd, { y: want, duration: 0.45, ease: "power2.out" })); else wd.style.transform = `translate3d(0, ${want}px, 0)`; }
    g.busy = false; towerNext();
  };
  m.x = x; m.el.style.transform = `translate3d(${x}px, ${m.y}px, 0)`;
  if (anim) g.tweens.push(G.to(m.el, { y: landY, duration: 0.16, ease: "power2.in", onComplete: land }));
  else land();
}
function towerChunk(x, y, w, bg, dir) {
  const el = document.createElement("i"); el.className = "pillow chunk"; el.style.cssText = `width:${w}px;height:${game.bh}px;background:${bg};transform:translate3d(${x}px, ${y}px, 0)`;
  document.getElementById("twWorld").appendChild(el);
  if (anim) G.to(el, { y: y + game.H, x: x + dir * 60, rotation: dir * 70, duration: 0.9, ease: "power2.in", onComplete: () => el.remove() }); else setTimeout(() => el.remove(), 300);
}
function towerMiss(m, landY) {
  const g = game; g.mv = null; SND.play("miss"); SND.haptic([30, 40, 30]);
  if (anim) G.to(m.el, { y: landY + g.H, rotation: m.dir * 50, duration: 0.8, ease: "power2.in", onComplete: () => m.el.remove() }); else m.el.remove();
  g.run = false; const score = g.score;
  /* il compagno sale in cima alla torre per festeggiare */
  const tp = document.getElementById("tPet"); const top = g.stack[g.stack.length - 1];
  const finish = () => { if (game === g && !g.over) g17end("tower", score, g17().towerEnd(score), "towerAgain"); };
  if (tp && anim && score > 0) {
    const pw = tp.offsetWidth || 70; const tx = top.x + top.w / 2 - pw / 2; const ty = top.y - pw * 0.92 + g.cam;
    tp.classList.add("ontop");
    G.timeline({ onComplete: finish }).to(tp, { x: tx - tp.offsetLeft, duration: 0.5, ease: "power1.inOut" }).to(tp, { y: ty - tp.offsetTop, duration: 0.5, ease: "back.out(1.6)" }, "<").to(tp, { rotation: 360, duration: 0.5, ease: "power2.inOut" }).set(tp, { rotation: 0 });
  } else game.timers.push(setTimeout(finish, 500));
}

/* --- aperture, inizio, tocchi --- */
const _openGameKeyV17 = openGameKey;
openGameKey = function (k) { if (k === "jump") { openJump(); return; } if (k === "tower") { openTower(); return; } _openGameKeyV17(k); };
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b || !game) return;
  if (b.id === "gBegin" && (game.kind === "jump" || game.kind === "tower")) { ev.stopImmediatePropagation(); SND.play("click"); if (game.kind === "jump") jumpStart(); else towerStart(); return; }
  if (b.id === "jumpAgain") { ev.stopImmediatePropagation(); jumpStart(); return; }
  if (b.id === "towerAgain") { ev.stopImmediatePropagation(); towerStart(); return; }
}, true);
document.addEventListener("pointerdown", (ev) => {
  if (!game || !(game.kind === "jump" || game.kind === "tower") || !game.run) return;
  const a = ev.target.closest && ev.target.closest("#arena"); if (!a || ev.target.closest("button")) return;
  ev.preventDefault(); if (game.kind === "jump") jumpTap(); else towerTap();
}, { passive: false });
document.addEventListener("keydown", (ev) => {
  if (!game || !(game.kind === "jump" || game.kind === "tower") || !game.run) return;
  if (ev.key === " " || ev.key === "ArrowUp" || ev.key === "Enter") { ev.preventDefault(); if (game.kind === "jump") jumpTap(); else towerTap(); }
});
