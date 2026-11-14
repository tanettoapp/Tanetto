/* =================== VERSIONE 6: salva e condividi, fumetto, capsula del tempo, calma, grafica =================== */
let dlP = null;
function getDl() {
  if (!window.claude || typeof window.claude.use !== "function") return Promise.resolve(null);
  if (!dlP) dlP = window.claude.use("downloads").catch(() => null);
  return dlP;
}
async function urlToBlob(url) { return (await fetch(url)).blob(); }
async function saveImage(url, name) {
  const t = L();
  try {
    const blob = await urlToBlob(url); const dl = await getDl();
    if (dl) { try { await dl.save({ filename: name, data: blob }); toast(t.savedImg); trackOnce("salvataggio"); return; } catch (e) { if (e && (e.code === "declined" || e.code === "rate_limited")) return; } }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); toast(t.savedImg); trackOnce("salvataggio");
  } catch (e) { toast(t.saveNo); }
}
async function shareImg(url, name) {
  const t = L();
  if (await shareImage(url, name)) return;
  const dl = await getDl();
  if (dl) { try { await dl.save({ filename: name, data: await urlToBlob(url) }); trackOnce("condivisione"); return; } catch (e) { if (e && (e.code === "declined" || e.code === "rate_limited")) return; } }
  toast(t.saveNo);
}
function imgButtons(name) { const t = L(); return `<div class="imgbtns"><button class="btn" data-saveimg="${name}">${icon("download")}<span>${t.saveImg}</span></button><button class="btn ghost" data-shareimg="${name}">${icon("share")}<span>${t.share}</span></button></div>`; }
Object.assign(ICON, {
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 19h14"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"/>',
  calm: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/>',
  capsule: '<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M8 7V5h8v2M12 11v4M10 13h4"/>',
  comic: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M12 4v16M3.5 12h17"/>'
});

/* --- Card di oggi: anello dei progressi, livello, cuori --- */
function heartsHTML(joy) { const n = Math.round(joy / 20); return [0, 1, 2, 3, 4].map((i) => `<svg viewBox="0 0 24 24" class="${i < n ? "on" : ""}" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>`).join(""); }
meters = function () {
  const t = L(); const need = xpNeed(S.level); const tg = todayGoals(); const done = S.done.filter((g) => tg.includes(g)).length; const joy = Math.round(joyNow());
  const pct = tg.length ? Math.round((done / tg.length) * 100) : 100; const C = 2 * Math.PI * 42; const off = C * (1 - pct / 100);
  const from = prevBar.ring != null && anim ? C * (1 - prevBar.ring / 100) : off;
  const gid = nid("rg"); const label = !tg.length ? t.freeL : done === tg.length ? t.allDoneL : t.todayL;
  return `<div class="meters2"><div class="ringwrap" role="progressbar" aria-label="${esc(t.todayL)}" aria-valuemin="0" aria-valuemax="${tg.length}" aria-valuenow="${done}"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD27A"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs><circle cx="50" cy="50" r="42" class="rbg"/><circle cx="50" cy="50" r="42" class="rfg" stroke="url(#${gid})" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${from.toFixed(1)}" data-ring="${off.toFixed(1)}" data-pct="${pct}" transform="rotate(-90 50 50)"/></svg><div class="rtxt"><b>${tg.length ? `${done}/${tg.length}` : "☀"}</b><span>${esc(label)}</span></div></div>
  <div class="mside"><div class="mrow"><span class="bdg xp">${STAR_W}</span><div class="mcol"><div class="hd"><span>${t.level} ${S.level}</span><span class="v">${t.xpTo(S.xp, need)}</span></div><div class="bar xp" role="progressbar" aria-label="${t.level}" aria-valuemin="0" aria-valuemax="${need}" aria-valuenow="${S.xp}">${fillTag("xp", (S.xp / need) * 100)}</div></div></div>
  <div class="mrow"><span class="bdg joy">${HEART_W}</span><div class="mcol"><div class="hd"><span>${t.joy}</span><span class="v">${joy}%</span></div><div class="hearts" aria-label="${t.joy} ${joy}%">${heartsHTML(joy)}</div></div></div></div></div>`;
};
const _animateBars = animateBars;
animateBars = function () {
  _animateBars();
  app.querySelectorAll(".rfg[data-ring]").forEach((c) => { const to = +c.dataset.ring; prevBar.ring = +c.dataset.pct; if (anim) G.to(c, { attr: { "stroke-dashoffset": to }, duration: 1.1, ease: "power3.out" }); else c.setAttribute("stroke-dashoffset", to); });
};
refreshJoy = function () {
  const j = Math.round(joyNow()); const h = document.querySelector(".hearts"); if (!h) return;
  const before = h.querySelectorAll(".on").length; h.innerHTML = heartsHTML(j); const v = h.closest(".mrow").querySelector(".v"); if (v) v.textContent = j + "%";
  const on = h.querySelectorAll(".on"); if (anim && on.length > before) G.fromTo(on[on.length - 1], { scale: 0.2 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, .35)", transformOrigin: "50% 50%" });
};

/* --- Il fumetto della settimana --- */
function propSVG(c) {
  const P = {
    body: '<g transform="translate(150 110)"><path d="M0 0 h22 l-3 34 h-16 Z" fill="#CDEBF7" stroke="#7CC6E6" stroke-width="2.5"/><path d="M3 12 h16 l-2 20 h-12 Z" fill="#7CC6E6"/><circle cx="34" cy="-6" r="3" fill="#7CC6E6"/><circle cx="40" cy="6" r="2" fill="#7CC6E6"/></g>',
    mind: '<g transform="translate(52 150)"><path d="M0 10 Q48 -6 48 10 V40 Q24 30 0 40 Z" fill="#fff" stroke="#9B8CF2" stroke-width="2.5"/><path d="M48 10 Q96 -6 96 10 V40 Q72 30 48 40 Z" fill="#fff" stroke="#9B8CF2" stroke-width="2.5"/><path d="M10 18h28M10 25h24M58 18h28M58 25h24" stroke="#C9C1F5" stroke-width="2"/></g><path d="M40 40l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="#FFC94D"/><path d="M160 36l2 5 5 .5-4 3.5 1 5-4-2.5-4 2.5 1-5-4-3.5 5-.5Z" fill="#FFC94D"/>',
    home: '<g transform="translate(158 40) rotate(14)"><rect x="-2" y="0" width="5" height="110" rx="2" fill="#B07A3C"/><path d="M-14 108 h30 l6 26 h-42 Z" fill="#F2C063"/><path d="M-10 114v18M-2 114v18M6 114v18M13 114v18" stroke="#D9A54A" stroke-width="2"/></g><circle cx="40" cy="60" r="7" fill="#fff" stroke="#9CD8E8" stroke-width="2"/><circle cx="56" cy="44" r="4.5" fill="#fff" stroke="#9CD8E8" stroke-width="2"/><circle cx="32" cy="36" r="3" fill="#fff" stroke="#9CD8E8" stroke-width="2"/>',
    people: '<g transform="translate(148 96) rotate(-12)"><rect width="30" height="52" rx="7" fill="#3E4A6B"/><rect x="3" y="6" width="24" height="38" rx="3" fill="#BFE3F7"/><circle cx="15" cy="48" r="2" fill="#9AA6C4"/></g><path d="M44 54c-6-4-9-7-9-11a4.5 4.5 0 0 1 9-2 4.5 4.5 0 0 1 9 2c0 4-3 7-9 11Z" fill="#EE7FA0"/><path d="M168 46c-4-3-6-5-6-7.5a3 3 0 0 1 6-1.4 3 3 0 0 1 6 1.4c0 2.5-2 4.5-6 7.5Z" fill="#EE7FA0"/>',
    work: '<g transform="translate(50 150)"><path d="M10 0 h80 v46 h-80 Z" fill="#3E4A6B"/><rect x="15" y="5" width="70" height="36" rx="2" fill="#BFE3F7"/><path d="M0 46 h100 l-6 10 h-88 Z" fill="#9AA6C4"/><path d="M24 14h40M24 22h30M24 30h36" stroke="#5E9BD6" stroke-width="3" stroke-linecap="round"/></g>',
    sleep: '<ellipse cx="100" cy="196" rx="86" ry="14" fill="#C9C1F5"/><path d="M156 34 a20 20 0 1 0 22 26 a16 16 0 0 1 -22 -26Z" fill="#FFE7A0"/><circle cx="40" cy="40" r="2" fill="#fff"/><circle cx="60" cy="24" r="1.5" fill="#fff"/>',
    custom: '<g transform="translate(150 40)"><circle r="20" fill="#FFC94D"/><path d="M0 -12l3.5 7.5 8 1-6 5.5 1.6 8L0 6l-7 4 1.5-8-6-5.5 8-1Z" fill="#fff"/></g>',
    rest: '<g transform="translate(148 120)"><path d="M0 0 h30 v22 a10 10 0 0 1 -10 10 h-10 a10 10 0 0 1 -10 -10 Z" fill="#fff" stroke="#D98A63" stroke-width="2.5"/><path d="M30 6 a8 8 0 0 1 0 14" stroke="#D98A63" stroke-width="2.5" fill="none"/><path d="M8 -6 q4 -6 0 -12 M18 -6 q4 -6 0 -12" stroke="#C9B9A6" stroke-width="2" fill="none" stroke-linecap="round"/></g><circle cx="40" cy="40" r="14" fill="#FFE48A"/>'
  };
  return P[c] || P.custom;
}
const PANEL_BG = { body: ["#FDE3D4", "#FBD0BB"], mind: ["#E9E4FD", "#D9D1FA"], home: ["#D8F1E8", "#C2E8D9"], people: ["#FDE0EA", "#FAC9D9"], work: ["#DDEBF9", "#C9DDF4"], sleep: ["#2C3560", "#3E4A7C"], custom: ["#FCEFD2", "#F8E1AE"], rest: ["#FCEBD0", "#F6DDB8"] };
function comicData() {
  const since = new Date(); since.setDate(since.getDate() - 6); const sk = dkey(since);
  const log = (S.log || []).filter((x) => x.d >= sk);
  const cnt = {}; log.forEach((x) => { const c = goalCat(x.g); cnt[c] = (cnt[c] || 0) + 1; });
  let cats = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]);
  if (!cats.length) { const tot = weekData().reduce((a, w) => a + w.done, 0); if (!tot) return null; cats = [...new Set(S.goals.map((g) => goalCat(g.id)))]; }
  cats = cats.slice(0, 3); if (cats.length < 4) cats.push(cats.includes("sleep") ? "rest" : "sleep"); while (cats.length < 4) cats.splice(cats.length - 1, 0, "rest");
  return { cats: cats.slice(0, 4), total: log.length || weekData().reduce((a, w) => a + w.done, 0) };
}
async function makeComic() {
  const t = L(); const data = comicData(); if (!data) { toast(t.comicEmpty); return; }
  const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo;
  const PW = 460, PH = 470, pos = [[60, 230], [560, 230], [60, 730], [560, 730]];
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><rect width="1080" height="1350" fill="#FFFBF4"/><rect x="0" y="0" width="1080" height="1350" fill="${pal[0]}" opacity=".35"/>`;
  data.cats.forEach((c, i) => {
    const [x, y] = pos[i]; const bg = PANEL_BG[c]; const id = `pb${i}`; const e = c === "sleep" ? "assonnato" : i === 3 ? "felice" : ["felice", "normale", "felice"][i];
    svg += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient><clipPath id="c${id}"><rect x="${x}" y="${y}" width="${PW}" height="${PH}" rx="26"/></clipPath></defs>`;
    svg += `<rect x="${x + 8}" y="${y + 10}" width="${PW}" height="${PH}" rx="26" fill="#2F2A26"/><g clip-path="url(#c${id})"><rect x="${x}" y="${y}" width="${PW}" height="${PH}" fill="url(#${id})"/>`;
    for (let k = 0; k < 7; k++) svg += `<circle cx="${x + 40 + k * 64}" cy="${y + 40 + (k % 3) * 22}" r="${c === "sleep" ? 2.5 : 7}" fill="#fff" opacity="${c === "sleep" ? 0.9 : 0.35}"/>`;
    svg += `<rect x="${x}" y="${y + 330}" width="${PW}" height="140" fill="#000" opacity=".06"/><svg x="${x + 40}" y="${y + 50}" width="380" height="330" viewBox="0 -10 200 210">${propSVG(c)}<g transform="translate(30 30) scale(.72)">${petInner(S.pet, e, S.hat, stage(), 0.95)}</g></svg></g>`;
    svg += `<rect x="${x}" y="${y}" width="${PW}" height="${PH}" rx="26" fill="none" stroke="#2F2A26" stroke-width="6"/><rect x="${x + 24}" y="${y + 370}" width="${PW - 48}" height="76" rx="16" fill="#FFFDF8" stroke="#2F2A26" stroke-width="4"/><circle cx="${x + 34}" cy="${y + 34}" r="20" fill="#FFFDF8" stroke="#2F2A26" stroke-width="4"/>`;
  });
  svg += `</svg>`;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="cmT"><div class="box"><h2 id="cmT">${t.comicT}</h2><div id="cmOut" style="width:100%"></div><p class="small muted" id="cmMsg" aria-live="polite">${t.shareMaking}</p><button class="btn ghost" id="closeLayer">${t.close}</button></div></div>`;
  try {
    const img = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
    try { await Promise.all([document.fonts.load('600 60px "Fredoka"'), document.fonts.load('600 30px "Figtree"')]); } catch (e) { /* niente */ }
    const cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1350; const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
    const FD = '"Fredoka", "Trebuchet MS", Arial, sans-serif', FB = '"Figtree", "Segoe UI", Arial, sans-serif';
    c.textAlign = "center"; c.fillStyle = "#2F2A26";
    let fs = 64; const title = t.comicT; do { c.font = `700 ${fs}px ${FD}`; fs -= 2; } while (c.measureText(title).width > 940 && fs > 30); c.fillText(title, 540, 120);
    c.font = `600 34px ${FB}`; c.fillStyle = pal[2]; c.fillText(S.petName, 540, 172);
    data.cats.forEach((cat, i) => {
      const [x, y] = pos[i]; const cap = t.comicCap[cat]; c.fillStyle = "#2F2A26";
      c.font = `700 26px ${FD}`; c.fillText(String(i + 1), x + 34, y + 43);
      let f2 = 30; do { c.font = `600 ${f2}px ${FB}`; f2--; } while (c.measureText(cap).width > PW - 70 && f2 > 18);
      c.fillText(cap, x + PW / 2, y + 418);
    });
    c.font = `700 40px ${FD}`; c.fillStyle = "#2F2A26"; c.fillText(t.comicEnd(data.total), 540, 1262);
    c.font = `600 26px ${FD}`; c.fillStyle = pal[2]; c.fillText("Tanetto", 540, 1308);
    const url = cv.toDataURL("image/png");
    const out = document.getElementById("cmOut"); if (!out) return;
    out.innerHTML = `<img class="weekimg" src="${url}" alt="${esc(t.comicT)}">` + imgButtons("tanetto-fumetto.png");
    document.getElementById("cmMsg").textContent = t.saveHint; SND.play("chime"); trackOnce("fumetto");
    if (anim) G.from(out.querySelector(".weekimg"), { scale: 0.9, rotation: -2, opacity: 0, duration: 0.5, ease: "back.out(1.6)" });
  } catch (e) { const m = document.getElementById("cmMsg"); if (m) m.textContent = t.weekErr; }
}

/* --- Capsula del tempo --- */
const CAPS_DAYS = [7, 30, 91];
let capsChoice = 1;
function capsuleCard() {
  const t = L(); const pend = (S.capsules || []).filter((c) => !c.opened);
  return `<div class="card stack-s capsule"><div class="sec"><span class="capsic">${icon("capsule")}</span><h3 style="flex:1">${t.capsT}</h3></div><p class="small muted">${esc(t.capsP(S.petName))}</p>
  <textarea id="capsIn" maxlength="500" rows="3" placeholder="${esc(t.capsPh)}" aria-label="${esc(t.capsT)}"></textarea>
  <p class="small" style="font-weight:700">${t.capsWhen}</p><div class="chips">${t.capsOpts.map((o, i) => `<button class="chip" aria-pressed="${capsChoice === i}" data-caps="${i}">${o}</button>`).join("")}</div>
  <button class="btn" id="capsGo">${t.capsB}</button>${pend.length ? `<p class="small muted">${t.capsList(pend.length)}: ${pend.map((c) => fmtDate(c.open)).join(", ")}</p>` : ""}</div>`;
}
function dueCapsule() { const td = dkey(); return (S.capsules || []).find((c) => !c.opened && c.open <= td) || null; }
function sealCapsule() {
  const t = L(); const inp = document.getElementById("capsIn"); const v = inp.value.trim(); if (!v) { shake(inp); return; }
  const d = new Date(); d.setDate(d.getDate() + CAPS_DAYS[capsChoice]);
  S.capsules = S.capsules || []; S.capsules.push({ text: v, made: dkey(), open: dkey(d), opened: false }); save(); trackOnce("capsula");
  SND.play("chime"); SND.haptic([10, 30, 20]);
  const card = document.querySelector(".capsule");
  const done = () => { const y = window.scrollY; render(); window.scrollTo(0, y); toast(t.capsSaved(fmtDate(dkey(d)))); };
  if (card && anim) G.timeline({ onComplete: done }).to(card, { scale: 0.92, duration: 0.15 }).to(card, { scale: 1, duration: 0.5, ease: "elastic.out(1, .4)" }); else done();
}
function openCapsule(c) {
  const t = L(); c.opened = true; save();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="cpT"><div class="box"><div class="paper gold"><h2 id="cpT">${t.capsT}</h2><p class="small" style="color:#8A6A4E">${t.capsFrom(fmtDate(c.made))}</p><p class="lt">${esc(c.text)}</p><p class="sign">${esc(t.letterSign(S.petName))}</p><div class="lpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div></div><button class="btn" id="closeLayer">${t.ok}</button></div></div>`;
  SND.play("fanfare"); SND.haptic([20, 40, 20]); trackOnce("capsula-aperta");
  if (anim) { G.from(".paper", { scale: 0.5, rotation: 8, opacity: 0, duration: 0.7, ease: "back.out(1.6)" }); }
}

/* --- Momento di calma 5-4-3-2-1 --- */
function openCalm() {
  const t = L();
  shell("calm", `<div class="arena calmarena" id="arena"><div class="cpet">${petSVG(S.pet, "normale", S.hat, stage(), S.petName)}</div><div class="cstep" id="cStep"></div>${startScreen(t.calmP)}</div>`);
  game.kind = "calm";
}
function calmStep(i) {
  const t = L(); const box = document.getElementById("cStep"); if (!box) return;
  if (i >= t.calmSteps.length) { box.innerHTML = `<h3>${t.calmDone}</h3>`; addJoy(6); save(); trackOnce("calma"); SND.play("fanfare"); if (anim) G.from(box, { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(2)" }); const p = document.querySelector(".cpet"); if (p && anim) G.to(p, { y: -10, duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }); return; }
  const [n, txt] = t.calmSteps[i];
  box.innerHTML = `<div class="cnum">${n}</div><p class="ctxt">${txt}</p><div class="cdots">${Array.from({ length: +n }, (_, k) => `<button class="cdot" data-cdot="${k}" aria-label="${k + 1}"></button>`).join("")}</div><p class="small muted">${t.calmTap}</p>`;
  if (anim) { G.from(".cnum", { scale: 0.3, opacity: 0, duration: 0.5, ease: "back.out(2.5)" }); G.from(".cdot", { scale: 0, stagger: 0.06, duration: 0.35, ease: "back.out(2)", delay: 0.2 }); }
  game.calmI = i;
}

/* --- Grafica: saluto, inclinazione 3D della stanza, indicatore delle sezioni, sorprese alla finestra --- */
function greetLine() {
  const t = L(); let d = intlDT(loc(), { weekday: "long", day: "numeric", month: "long" }).format(new Date()); d = d.charAt(0).toUpperCase() + d.slice(1);
  return `<div class="greet"><span class="gw">${t.greet[phase()]}</span><span class="gd">${esc(d)}</span></div>`;
}
document.addEventListener("pointermove", (ev) => {
  if (!anim || ev.pointerType === "touch") return;
  const room = document.getElementById("room"); if (!room) return;
  const r = room.getBoundingClientRect(); if (ev.clientY > r.bottom + 120 || ev.clientY < r.top - 120) return;
  const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
  G.to(room, { rotationY: x * 6, rotationX: -y * 5, transformPerspective: 900, duration: 0.6, ease: "power2.out", overwrite: "auto" });
  room.style.setProperty("--sx", `${(x + 0.5) * 100}%`); room.style.setProperty("--sy", `${(y + 0.5) * 100}%`);
}, { passive: true });
document.addEventListener("pointerdown", (ev) => {
  const room = ev.target.closest && ev.target.closest("#room"); if (!room || !anim) return;
  const r = room.getBoundingClientRect(); const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
  G.fromTo(room, { rotationY: x * 8, rotationX: -y * 7, transformPerspective: 900 }, { rotationY: 0, rotationX: 0, duration: 1, ease: "elastic.out(1, .5)" });
}, { passive: true });
function moveTabPill(instant) {
  const nav = document.getElementById("tabsIn"); if (!nav) return;
  let pill = nav.querySelector(".tabpill"); const cur = nav.querySelector('.tab[aria-current="page"] .ic'); if (!cur) return;
  if (!pill) { pill = document.createElement("span"); pill.className = "tabpill"; nav.prepend(pill); }
  const nr = nav.getBoundingClientRect(), cr = cur.getBoundingClientRect();
  const x = cr.left - nr.left, y = cr.top - nr.top;
  if (anim && !instant && pill.dataset.x) G.fromTo(pill, { x: +pill.dataset.x, y, width: cr.width }, { x, y, width: cr.width, duration: 0.45, ease: "back.out(1.6)" });
  else G ? G.set(pill, { x, y, width: cr.width }) : (pill.style.transform = `translate(${x}px, ${y}px)`);
  pill.dataset.x = x;
}
let lastPillX = null;
const _renderTabs = renderTabs;
renderTabs = function () {
  const nav = document.getElementById("tabsIn"); const old = nav && nav.querySelector(".tabpill"); const ox = old ? old.dataset.x : null;
  _renderTabs();
  if (ox != null) { const p = document.createElement("span"); p.className = "tabpill"; p.dataset.x = ox; nav.prepend(p); }
  requestAnimationFrame(() => moveTabPill(false));
};
window.addEventListener("resize", () => moveTabPill(true));
function windowSurprise() {
  const room = document.getElementById("room"); if (!room || !anim) return;
  const svg = room.querySelector("svg"); if (!svg) return;
  const ns = "http://www.w3.org/2000/svg"; const g = document.createElementNS(ns, "g");
  if (phase() === "night") {
    g.innerHTML = '<path d="M0 0 L-16 6" stroke="#FFF6D6" stroke-width="1.6" stroke-linecap="round"/><circle r="1.8" fill="#fff"/>';
    const wc = svg.querySelector("clipPath[id^='wc']"); if (wc) g.setAttribute("clip-path", `url(#${wc.id})`);
    const inner = document.createElementNS(ns, "g"); inner.appendChild(g.firstChild); inner.appendChild(g.firstChild); g.appendChild(inner); svg.insertBefore(g, svg.querySelector("#petWrap") || null);
    G.fromTo(inner, { x: 130, y: 50, opacity: 1 }, { x: 50, y: 80, opacity: 0, duration: 1.1, ease: "power1.in", onComplete: () => g.remove() });
  } else {
    g.innerHTML = '<path d="M-5 0 q2.5 -3 5 0 q2.5 -3 5 0" stroke="#4A4A5A" stroke-width="1.3" fill="none" stroke-linecap="round"/>';
    const wc = svg.querySelector("clipPath[id^='wc']"); if (wc) g.setAttribute("clip-path", `url(#${wc.id})`);
    const inner = document.createElementNS(ns, "g"); inner.appendChild(g.firstChild); g.appendChild(inner); svg.insertBefore(g, svg.querySelector("#petWrap") || null);
    G.fromTo(inner, { x: 30, y: 70 }, { x: 150, y: 58, duration: 3.6, ease: "none", onComplete: () => g.remove() });
    G.to(inner, { scaleY: 0.4, duration: 0.18, yoyo: true, repeat: 19, transformOrigin: "50% 50%" });
  }
}
const _ambientExtra = ambientExtra;
ambientExtra = function (root, q) {
  _ambientExtra(root, q);
  if (tab === "today" && anim) { const loop = () => { const c = G.delayedCall(9 + Math.random() * 10, () => { windowSurprise(); loop(); }); ambient.push(c); }; loop(); }
};
/* Testo che si scrive nella nuvoletta */
const _say = say;
say = function (text, ms = 3200) {
  _say(text, ms);
  const b = document.getElementById("bubbleTxt"); if (!b || !anim) return;
  let k = 0; b.textContent = ""; const step = () => { if (!b.isConnected || sayText !== text) { if (b.isConnected && sayText === text) b.textContent = text; return; } k += 2; b.textContent = text.slice(0, k); if (k < text.length) setTimeout(step, 16); };
  step();
};
/* Benvenuto animato all'apertura */
function splash() {
  if (!anim || sessionStorageSafe("splash")) return;
  const d = document.createElement("div"); d.className = "splash"; d.innerHTML = `<div class="splogo">${LOGO}</div><div class="spname">Tanetto</div>`; document.body.appendChild(d);
  G.timeline({ onComplete: () => d.remove() }).from(".splogo", { scale: 0, rotation: -30, duration: 0.6, ease: "back.out(2.2)" }).from(".spname", { y: 16, opacity: 0, duration: 0.35 }, "-=0.2").to(d, { opacity: 0, duration: 0.4, delay: 0.35 });
}
function sessionStorageSafe(k) { try { if (sessionStorage.getItem(k)) return true; sessionStorage.setItem(k, "1"); } catch (e) { /* niente */ } return false; }

/* --- Pulsanti nuovi --- */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  if (b.dataset.saveimg) { const ov = b.closest(".overlay"); const im = ov && ov.querySelector(".weekimg"); if (im) saveImage(im.src, b.dataset.saveimg); return; }
  if (b.dataset.shareimg) { const im = b.closest(".overlay") && b.closest(".overlay").querySelector(".weekimg"); if (im) shareImg(im.src, b.dataset.shareimg); return; }
  if (b.id === "makeComic") { makeComic(); return; }
  if (b.dataset.caps !== undefined) { capsChoice = +b.dataset.caps; document.querySelectorAll("[data-caps]").forEach((x) => x.setAttribute("aria-pressed", String(+x.dataset.caps === capsChoice))); return; }
  if (b.id === "capsGo") { sealCapsule(); return; }
  if (b.id === "capsOpen") { const c = dueCapsule(); if (c) openCapsule(c); return; }
  if (b.id === "talkCalm") { fadeLayer(); openCalm(); return; }
  if (b.dataset.cdot !== undefined) {
    if (b.classList.contains("on")) return; b.classList.add("on"); SND.note(NOTES[(+b.dataset.cdot) % 4]); SND.haptic(8);
    if (anim) G.fromTo(b, { scale: 0.6 }, { scale: 1, duration: 0.45, ease: "elastic.out(1, .4)" });
    const all = document.querySelectorAll(".cdot"); if ([...all].every((x) => x.classList.contains("on"))) setTimeout(() => calmStep((game && game.calmI || 0) + 1), 650);
    return;
  }
});
