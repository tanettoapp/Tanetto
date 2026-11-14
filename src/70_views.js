/* =================== VISTE =================== */
const app = document.getElementById("app"), layer = document.getElementById("layer");
let tab = "today", lastTab = null, homeTab = "furn", draftPet = S.pet || "germo", draftName = "", draftGoals = ["water", "walk", "breathe"], pickedDest = null, story = null, confirmReset = false, mood = null, sayText = null, sayTimer = null, editGoals = null, showPicker = false;
const HALO = { germo: "#E1EFD9", ondi: "#F3E3D5", lumi: "#E4E5FA" };

function applyRoot() {
  const r = document.documentElement;
  if (S.theme === "system") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", S.theme);
  r.setAttribute("data-pet", S.pet || draftPet); r.setAttribute("lang", L().locale);
}
function langSelect(id = "langSel", cls = "lang") { return `<select class="${cls}" id="${id}" aria-label="${esc(L().langL)}">${Object.keys(T).map((k) => `<option value="${k}" ${k === S.lang ? "selected" : ""}>${T[k].lang}</option>`).join("")}</select>`; }
function topBar() {
  const t = L();
  if (!S.pet) return `<div class="top"><span class="brand">${LOGO}<span class="name">Tanetto</span></span><span class="spacer"></span>${langSelect()}</div>`;
  return `<div class="top"><span class="name">${esc(S.petName)}</span><span class="pill">${STAR}<span>${t.level} ${S.level}</span></span><span class="spacer"></span><span class="pill" id="seedPill">${SEED}<span id="seedN">${S.seeds}</span><span class="sr">${t.seeds}</span></span><button class="iconbtn" id="musicBtn" aria-pressed="${S.music}" aria-label="${esc(S.music ? t.musicOff : t.musicOn)}">${icon(S.music ? "note" : "noteoff")}</button></div>`;
}
const steps = (n) => `<div class="steps" aria-hidden="true">${[0, 1, 2].map((i) => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;

function viewOnboard() {
  const t = L();
  if (S.onboard === 0) return `${topBar()}<div class="stack">${steps(0)}<h1>${t.welcomeT}</h1><p class="muted">${t.welcomeP}</p>
    <div class="choose" role="radiogroup" aria-label="${esc(t.welcomeT)}">${["germo", "ondi", "lumi"].map((p) => `<button class="choice" role="radio" aria-checked="${draftPet === p}" data-pet="${p}"><span class="halo" style="background:radial-gradient(circle at 50% 60%, ${HALO[p]} 0 62%, transparent 63%)">${petSVG(p, draftPet === p ? "felice" : "normale", null, 0, t.pets[p][0])}</span><span class="nm">${t.pets[p][0]}</span><span class="ds">${t.pets[p][1]}</span></button>`).join("")}</div>
    <button class="btn block" id="toName">${t.next}</button><p class="note">${t.demo}</p></div>`;
  if (S.onboard === 1) {
    const def = draftName || t.pets[draftPet][0];
    return `${topBar()}<div class="stack">${steps(1)}<div class="room" id="room">${roomSVG({ ph: phase(), pet: draftPet, e: "felice", hat: null, st: 0, furn: [], wall: "w_cream", label: def, season: season().id })}</div>
    <h1>${t.nameT}</h1><p class="muted">${t.nameP}</p>
    <div class="field"><label for="petName">${t.nameL}</label><input id="petName" maxlength="16" autocomplete="off" value="${esc(def)}"></div>
    <div class="row"><button class="link" id="backPet">${t.back}</button><span class="spacer"></span><button class="btn" id="toGoals">${t.next}</button></div></div>`;
  }
  const n = draftGoals.length;
  return `${topBar()}<div class="stack">${steps(2)}<h1>${t.goalsT}</h1><p class="muted">${t.goalsP}</p>${goalPicker(draftGoals)}
    <div class="sticky"><div class="row"><button class="link" id="backName">${t.back}</button><span class="small muted" id="gCount">${t.goalsCount(n)}</span><span class="spacer"></span><button class="btn" id="startApp" ${n < GOALS_MIN || n > GOALS_MAX ? "disabled" : ""}>${t.start}</button></div></div></div>`;
}
function goalPicker(list) {
  const t = L();
  const customs = list.filter((g) => g.startsWith("c:"));
  const groups = CATS.map(([c, col, ids]) => [c, col, ids]);
  if (customs.length) groups.push(["custom", CUSTOM_COLOR, customs]);
  return groups.map(([c, col, ids]) => `<div class="catgroup"><div class="cathead"><i style="background:${col}">${catIcon(c)}</i>${t.cats[c]}</div><div class="chips">${ids.map((g) => `<button class="chip" aria-pressed="${list.includes(g)}" data-goal="${esc(g)}">${esc(goalText(g))}</button>`).join("")}</div></div>`).join("")
    + `<div class="field"><label for="customGoal">${t.addL}</label><div class="inline"><input id="customGoal" maxlength="40" autocomplete="off" placeholder="${esc(t.addPh)}"><button class="btn small" id="addGoal" type="button">${t.add}</button></div></div>`;
}

function petExpr() {
  const h = new Date().getHours();
  if (S.lightsOff || h >= 23 || h < 6) return "assonnato";
  const tg = todayGoals();
  if (joyNow() >= 85) return "felice";
  if (tg.length && tg.every((g) => S.done.includes(g))) return "felice";
  return "normale";
}
function defaultSay() {
  const t = L().talk;
  if (S.away) return "";
  if (S.lightsOff) return L().napSay;
  if (S.energy >= 100) return t.ready[0];
  const tg = todayGoals();
  if (!tg.length) return t.free[0];
  if (tg.every((g) => S.done.includes(g))) return new Date().getHours() >= 18 ? L().tomorrow : t.allDone[new Date().getDate() % 2];
  const d = new Date(); const h = d.getHours(); const R = L().remind;
  const nd = (g) => tg.includes(g) && !S.done.includes(g);
  const fr = friendToday(); if (fr && h % 2 === 0) return L().visit(L().pets[fr][0]);
  if (h >= 10 && h < 13 && nd("water") && h % 2 === 1) return R.water;
  if (h >= 15 && h < 17 && (nd("pause") || nd("walk") || nd("move"))) return nd("pause") ? R.pause : R.move;
  if (h >= 21 && (nd("sleep") || nd("nophone"))) return R.sleep;
  if ((d.getDate() + d.getHours()) % 4 === 0) return t.season[season().id];
  const arr = t[phase()];
  return arr[(d.getDate() + d.getHours()) % arr.length];
}
function roomBlock() {
  const t = L();
  const glow = S.pet === "lumi" ? 0.3 + 0.65 * (S.energy / 100) : null;
  const showGift = S.giftDay !== S.day && !S.away;
  const showLetter = S.letterDay !== S.day && !S.away;
  const sayNow = sayText || defaultSay();
  const A = S.away ? "" : `<div class="actions" id="actions">${[["feed", "feed"], ["play", "play"], ["talk", "talk"], [S.lightsOff ? "wake" : "nap", S.lightsOff ? "wake" : "nap"], ["photo", "photo"]].map(([k, ic]) => `<button class="act" data-act="${k}"><span class="aci">${icon(ic)}</span><span>${t.acts[k]}</span></button>`).join("")}</div>`;
  return `<div class="roomwrap"><div class="room ${S.lightsOff ? "dark" : ""}" id="room">${roomSVG({ ph: phase(), pet: S.pet, e: petExpr(), hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: !!S.away, glow, label: S.petName, season: season().id, dark: S.lightsOff, friend: S.away ? null : friendToday() })}
    ${!S.away && friendToday() ? `<button class="friendhit" id="friendHit" aria-label="${esc(t.pets[friendToday()][0])}"></button>` : ""}
    ${showLetter ? `<button class="letter" id="letter" aria-label="${esc(t.letterL)}">${letterSVG()}</button>` : ""}
    ${S.away ? "" : `<button class="pethit" id="petHit" aria-label="${esc(S.petName)}"></button>`}
    ${showGift ? `<button class="gift" id="gift" aria-label="${esc(t.giftL)}">${giftSVG()}</button>` : ""}
    <div class="fx" id="fx"></div></div>${sayNow && !S.away ? `<p class="bubble" id="bubble" aria-live="polite"><b>${esc(S.petName)}</b><span id="bubbleTxt">${esc(sayNow)}</span></p>` : ""}${A}</div>`;
}
const prevBar = {};
function fillTag(key, pct) { const from = prevBar[key] != null && anim ? prevBar[key] : pct; return `<div class="fill" data-bar="${key}" data-w="${pct}" style="width:${from}%"></div>`; }
function meters(withJoy) {
  const t = L(); const need = xpNeed(S.level); const en = Math.round(S.energy); const joy = Math.round(joyNow());
  return `<div class="meters">
  <div class="meter"><span class="bdg en">${LEAF}</span><div><div class="hd"><span>${t.energy}</span><span class="v">${en}%</span></div><div class="bar" role="progressbar" aria-label="${t.energy}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${en}">${fillTag("en", S.energy)}</div></div></div>
  ${withJoy ? `<div class="meter"><span class="bdg joy">${HEART_W}</span><div><div class="hd"><span>${t.joy}</span><span class="v">${joy}%</span></div><div class="bar joy" role="progressbar" aria-label="${t.joy}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${joy}">${fillTag("joy", joy)}</div></div></div>` : ""}
  <div class="meter"><span class="bdg xp">${STAR_W}</span><div><div class="hd"><span>${t.level} ${S.level}</span><span class="v">${t.xpTo(S.xp, need)}</span></div><div class="bar xp" role="progressbar" aria-label="${t.level}" aria-valuemin="0" aria-valuemax="${need}" aria-valuenow="${S.xp}">${fillTag("xp", (S.xp / need) * 100)}</div></div></div></div>`;
}
function animateBars() {
  app.querySelectorAll(".fill[data-bar]").forEach((f) => { const w = +f.dataset.w; prevBar[f.dataset.bar] = w; if (parseFloat(f.style.width) !== w) requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = w + "%"; })); });
}
function teaserCard() {
  const t = L(); const n = S.visit.n || 1; const pos = ((n - 1) % 7) + 1;
  return `<div class="teaser card"><div class="tz"><h3>${t.teaserT}</h3><p class="small muted">${t.teaserP(giftValue(n + 1))}</p></div><div class="gdots" role="img" aria-label="${esc(t.visitL(n))}">${[1, 2, 3, 4, 5, 6, 7].map((k) => `<i class="${k <= pos ? "on" : ""} ${k === 7 ? "big" : ""}">${k === 7 ? giftSVG() : ""}</i>`).join("")}</div><p class="small" style="font-weight:700">${t.visitL(n)}</p></div>`;
}
function timeLeft(until) {
  const ms = Math.max(0, until - Date.now()); const h = Math.floor(ms / 3600000); let m = Math.ceil((ms % 3600000) / 60000); if (m === 60) m = 59;
  if (S.lang === "de") return h > 0 ? (m > 0 ? `${h} Std. ${m} Min.` : `${h} Std.`) : `${m} Min.`;
  return h > 0 ? (m > 0 ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
}
function awayCard() { const t = L(); const d = destByKey(S.away.dest); return `<div class="away"><h2 class="h3like">${t.awayT(esc(S.petName))}</h2><p class="muted">${t.awayB(esc(d.name), timeLeft(S.away.until))}</p><button class="btn ghost block" id="comeBack">${t.awayNow}</button></div>`; }
function eventCard() {
  const t = L(); const si = seasonState(); const n = Math.min(S.season.n, EVENT_GOAL); const item = "s_" + si.id;
  const ready = n >= EVENT_GOAL && !S.season.claimed;
  const txt = S.season.claimed ? t.evDone(fmtDay(si.next)) : t.evP(EVENT_GOAL, t.items[item], fmtDay(si.end));
  return `<div class="event" style="--evc:${SEASON_COLOR[si.id]}"><div class="evi">${SEASON_ICON[si.id]}</div><div><h3>${t.seasons[si.id]}</h3><p class="evp">${esc(txt)}</p>
  ${S.season.claimed ? "" : `<div class="evrow"><div class="bar ev" role="progressbar" aria-label="${esc(t.seasons[si.id])}" aria-valuemin="0" aria-valuemax="${EVENT_GOAL}" aria-valuenow="${n}"><div class="fill" style="width:${(n / EVENT_GOAL) * 100}%"></div></div><span class="evn">${t.evProg(n, EVENT_GOAL)}</span></div>`}
  ${ready ? `<button class="btn gold small" id="claimEv">${t.evClaim}</button>` : ""}</div></div>`;
}
function goalRow(g) {
  const t = L(); const d = S.done.includes(g); const c = goalCat(g);
  const extra = d ? "" : g === "breathe" ? `<span class="go">${t.breatheGo} →</span>` : `<span class="rw">+${SEEDS_GOAL} ${SEED}</span>`;
  return `<li><button class="goal" aria-pressed="${d}" data-done="${esc(g)}"><span class="cat" style="background:${CAT_COLOR[c]}">${catIcon(c)}</span><span class="txt"><b>${esc(goalText(g))}</b>${extra}</span><span class="tick">${d ? icon("check") : ""}</span></button></li>`;
}
function viewToday() {
  const t = L(); const rec = dayRec(); const st = streak(); const tg = todayGoals();
  let mid = "";
  if (story) mid = storyCard();
  else if (S.away) mid = awayCard();
  else if (S.energy >= 100) mid = `<div class="cta"><p><strong>${t.ready}</strong></p><button class="btn" data-tab="trips">${t.goTrip}</button></div>`;
  const restPart = rec.rest || !tg.length ? "" : (!S.done.length && !S.away ? `<button class="link" id="rest">${t.restB}</button>` : "");
  const cap = dueCapsule();
  return `${topBar()}<div class="stack">${greetLine()}${roomBlock()}${cap ? `<div class="capsbanner"><span class="capsic">${icon("capsule")}</span><b>${t.capsArrive}</b><button class="btn small gold" id="capsOpen">${t.capsOpen}</button></div>` : ""}${meters(true)}${mid}
  ${rec.rest ? `<div class="card stack-s"><h3>${t.restT}</h3><p class="muted small">${t.restP}</p></div>` : ""}
  <div class="sec"><h2>${t.todayT}</h2><span class="pill" style="color:var(--sun)">${icon("flame")}<span style="color:var(--ink)">${t.streak(st)}</span></span></div>
  ${tg.length ? `<ul class="goals">${tg.map(goalRow).join("")}</ul>` : `<div class="card stack-s"><h3>${t.freeT}</h3><p class="muted small">${t.freeP}</p></div>`}
  <div class="row"><button class="link" data-tab="more" data-focus="goals">${t.edit}</button><span class="spacer"></span>${restPart}</div>
  ${S.giftDay === S.day ? teaserCard() : ""}
  ${eventCard()}
  <p class="note">${t.demo}</p></div>`;
}
function storyCard() {
  const t = L(); const c = cardInfo(story.card);
  return `<div class="story"><div class="pcbig">${c.art()}</div><h2 class="h3like">${t.backT(esc(S.petName))}</h2><p class="pcmsg"><strong>${esc(c.title)}</strong> · ${esc(c.text.split("{n}").join(S.petName))}</p>
  <p class="small">${t.got}: <strong>+${SEEDS_TRIP} ${t.seeds}</strong>${story.item ? ` · <strong>${t.items[story.item]}</strong>` : ""}</p><button class="btn" id="storyOk">${t.ok}</button></div>`;
}
function destBtn(d) {
  const t = L(); const locked = S.level < d.lvl; const found = d.cards.filter((c) => S.cards.includes(c)).length;
  return `<button class="dest ${locked ? "locked" : ""}" ${locked || S.away ? "disabled" : ""} aria-pressed="${pickedDest === d.key}" data-dest="${d.key}"><span class="pc">${d.art()}</span><span class="meta"><b>${esc(d.name)}</b><span class="small muted">${locked ? `${icon("lock")} ${t.lockedL(d.lvl)}` : `${t.hours(d.h)} · ${found}/${d.cards.length}`}</span></span></button>`;
}
function albumGrid(list) {
  const t = L();
  return `<div class="album">${list.flatMap((d) => d.cards.map((ck) => {
    if (S.cards.includes(ck)) { const c = cardInfo(ck); return `<button class="post" data-card="${ck}">${c.art()}<span>${esc(c.title)}</span></button>`; }
    return `<div class="post missing"><div class="q">?</div><span>${esc(d.name)}</span></div>`;
  })).join("")}</div>`;
}
function viewTrips() {
  const t = L(); const { fant, real } = destList();
  const total = fant.length * 3 + real.length; const have = fant.concat(real).reduce((a, d) => a + d.cards.filter((c) => S.cards.includes(c)).length, 0);
  const showBar = !S.away && pickedDest && S.energy >= 100;
  const picked = pickedDest ? fant.concat(real).find((d) => d.key === pickedDest) : null;
  return `${topBar()}<div class="stack"><h1>${t.tripsT}</h1><p class="muted">${t.tripsP}</p>${meters()}
  ${S.away ? awayCard() : ""}${story ? storyCard() : ""}
  ${!S.away && S.energy < 100 ? `<p class="small muted">${t.need}</p>` : ""}
  <h2>${t.fantasyT}</h2><div class="stack-s">${fant.map(destBtn).join("")}</div>
  <h2>${t.realT}</h2><div class="stack-s">${real.map(destBtn).join("")}</div>
  <div class="sec"><h2>${t.albumT}</h2><span class="small muted">${t.albumP(have, total)}</span></div>
  <h3>${t.fantasyT}</h3>${albumGrid(fant)}<h3>${t.realT}</h3>${albumGrid(real)}</div>
  ${showBar && picked ? `<div class="departbar"><div class="in"><button class="btn block" id="depart">${esc(t.depart(picked.name))} · ${t.hours(picked.h)}</button></div></div>` : ""}`;
}
function viewHome() {
  const t = L();
  const list = SHOP.filter((s) => s.kind === homeTab);
  return `${topBar()}<div class="stack"><div class="room" id="room">${roomSVG({ ph: phase(), pet: S.pet, e: "normale", hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: !!S.away, label: S.petName, season: season().id })}<div class="fx" id="fx"></div></div>
  <h1>${t.homeT}</h1><p class="muted">${t.homeP}</p>
  <div class="tabsx" role="tablist">${[["furn", t.shopFurn], ["wear", t.shopWear], ["wall", t.shopWall]].map(([k, l]) => `<button role="tab" aria-selected="${homeTab === k}" data-hometab="${k}">${l}</button>`).join("")}</div>
  <div class="grid3">${homeTab === "wear" ? `<button class="item" aria-pressed="${!S.hat}" data-wear=""><span class="art"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M7 17L17 7"/></svg></span><span>${t.none}</span><span class="state">${!S.hat ? t.using : t.use}</span></button>` : ""}
  ${list.map((s) => {
    const own = S.owned.includes(s.id);
    const inUse = s.kind === "furn" ? S.furn.includes(s.id) : s.kind === "wear" ? S.hat === s.id : S.wall === s.id;
    let state;
    if (own) state = `<span class="state">${inUse ? t.using : t.use}</span>`;
    else if (s.event) state = `<span class="tag">${t.eventOnly}</span>`;
    else if (s.special) state = `<span class="tag">${t.specialOnly}</span>`;
    else if (s.found) state = `<span class="tag">${t.foundOnly}</span>`;
    else state = `<span class="price">${SEED}${s.price}</span>`;
    const cant = !own && (s.found || s.event || s.special || S.seeds < s.price);
    return `<button class="item ${cant ? "cant" : ""}" aria-pressed="${inUse}" data-item="${s.id}"><span class="art">${itemArt(s.id)}</span><span>${t.items[s.id]}</span>${state}</button>`;
  }).join("")}</div></div>`;
}
function calendar() {
  const t = L(); const now = new Date(); const y = now.getFullYear(), m = now.getMonth();
  const days = new Date(y, m + 1, 0).getDate(); const lead = (new Date(y, m, 1).getDay() + 6) % 7;
  const wd = [...Array(7)].map((_, i) => wdName(i, "narrow"));
  const mname = intlDT(loc(), { month: "long", year: "numeric" }).format(now);
  let cells = wd.map((w) => `<span class="wd">${w}</span>`).join("") + `<span class="d empty"></span>`.repeat(lead);
  for (let d = 1; d <= days; d++) {
    const k = dkey(new Date(y, m, d)); const r = S.days[k]; let cls = "";
    if (r) { if ((r.rest || r.free) && !r.done) cls = "rest"; else if (r.done) { const q = r.done / Math.max(1, r.total); cls = q >= 1 ? "l3" : q >= 0.5 ? "l2" : "l1"; } }
    cells += `<span class="d ${cls} ${k === S.day ? "today" : ""}">${d}</span>`;
  }
  return `<div class="card stack-s"><div class="sec"><h3 style="flex:1">${t.calT}</h3><span class="small muted" style="text-transform:capitalize">${mname}</span></div><div class="cal">${cells}</div>
  <div class="legend"><span><i style="background:var(--paper-2)"></i>${t.legNone}</span><span><i class="lgsome"></i>${t.legSome}</span><span><i style="background:var(--accent)"></i>${t.legAll}</span><span><i style="box-shadow:inset 0 0 0 2px var(--line)"></i>${t.legRest}</span></div></div>`;
}
function weekData() {
  const out = []; const now = new Date();
  for (let k = 6; k >= 0; k--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - k);
    const r = S.days[dkey(d)]; let cls = "";
    if (r) { if ((r.rest || r.free) && !r.done) cls = "rest"; else if (r.done) { const q = r.done / Math.max(1, r.total); cls = q >= 1 ? "l3" : q >= 0.5 ? "l2" : "l1"; } }
    out.push({ d, cls, done: r ? r.done || 0 : 0 });
  }
  return out;
}
function viewDiary() {
  const t = L(); const q = t.questions[Math.floor(new Date(dkey() + "T12:00:00").getTime() / 86400000) % t.questions.length] /* 1.0.10 (D-02): giorno locale, non UTC */;
  return `${topBar()}<div class="stack"><h1>${t.diaryT}</h1>
  <form class="card stack" id="diaryForm"><div class="stack-s"><span class="small muted">${t.qT}</span><p class="question">${esc(q)}</p></div>
  <fieldset style="border:0;padding:0;margin:0" class="stack-s"><legend class="small muted" style="margin-bottom:6px">${t.moodL}</legend>
  <div class="moods">${t.moods.map((m, i) => `<button type="button" class="mood" aria-pressed="${mood === i}" data-mood="${i}">${MOOD_FACE[i]}<span>${m}</span></button>`).join("")}</div></fieldset>
  <div class="field"><label for="line">${t.lineL}</label><input id="line" maxlength="200" autocomplete="off" placeholder="${esc(t.linePh)}"></div>
  <button class="btn" type="submit">${t.save}</button><p class="note">${t.privacy}</p></form>
  <div class="card stack-s"><h3>${t.weekT}</h3>${weekSummary()}<p class="small muted">${t.weekP}</p><div class="weekrow">${weekData().map((w) => `<span><i class="${w.cls}"></i>${wdName(wdIdx(w.d))}</span>`).join("")}</div><div class="imgbtns col"><button class="btn" id="makeWeek">${icon("card")}<span>${t.weekB}</span></button><button class="btn ghost" id="makeComic">${icon("comic")}<span>${t.comicB}</span></button></div></div>
  ${capsuleCard()}
  ${calendar()}
  ${S.diary.length ? `<ul class="entries">${S.diary.slice().reverse().slice(0, 30).map((d) => `<li><div class="h">${d.mood != null ? MOOD_FACE[d.mood] : ""}<time>${fmtDate(d.day)}</time></div>${d.q ? `<p class="q">${esc(d.q)}</p>` : ""}${d.text ? `<p class="t">${esc(d.text)}</p>` : ""}</li>`).join("")}</ul>` : `<p class="muted">${t.empty}</p>`}</div>`;
}
function viewMore() {
  const t = L(); const list = editGoals || S.goals.map((g) => ({ id: g.id, days: g.days.slice() }));
  const ids = list.map((g) => g.id); const n = ids.length;
  const okDays = list.every((g) => g.days.length > 0);
  return `${topBar()}<div class="stack"><h1>${t.moreT}</h1>
  <div class="card stack" id="goalsCard"><div class="stack-s"><h3>${t.goalsEdit}</h3><p class="small muted">${t.goalsEditP} ${t.daysP}</p></div>
  <div class="sched">${list.map((g, gi) => `<div><div class="gname"><i style="background:${CAT_COLOR[goalCat(g.id)]}">${catIcon(goalCat(g.id))}</i>${esc(goalText(g.id))}</div><div class="days">${ALL_DAYS.map((d) => `<button class="day" aria-pressed="${g.days.includes(d)}" data-gday="${gi}:${d}" aria-label="${esc(goalText(g.id))}: ${esc(wdName(d, "long"))}">${esc(wdName(d))}</button>`).join("")}</div></div>`).join("")}</div>
  <p class="small muted">${t.goalsCount(n)}</p>
  <button class="btn ghost small" id="togglePicker" aria-expanded="${showPicker}">${showPicker ? t.pickHide : t.pickShow}</button>
  ${showPicker ? goalPicker(ids) : ""}
  <button class="btn" id="saveGoals" ${n < GOALS_MIN || n > GOALS_MAX || !okDays ? "disabled" : ""}>${t.saveGoals}</button></div>
  <div class="card stack"><h3>${t.petL}</h3><div class="field"><label for="rename" class="sr">${t.nameL}</label><div class="inline"><input id="rename" maxlength="16" autocomplete="off" value="${esc(S.petName)}"><button class="btn small" id="doRename">${t.rename}</button></div></div></div>
  <div class="card stack"><h3>${t.langL}</h3><div class="field">${langSelect("langSel2", "")}</div></div>
  <div class="card stack-s"><h3>${t.soundT}</h3>
    <div class="switchrow"><span id="sfxL">${t.sfxL}</span><button class="switch" role="switch" aria-checked="${S.sfx}" aria-labelledby="sfxL" id="sfxSw"></button></div>
    <div class="switchrow"><span id="musL">${t.musicL}</span><button class="switch" role="switch" aria-checked="${S.music}" aria-labelledby="musL" id="musSw"></button></div>
    <div class="switchrow"><span id="hapL">${t.hapticL}</span><button class="switch" role="switch" aria-checked="${S.haptic}" aria-labelledby="hapL" id="hapSw"></button></div>
    <div class="tracks" role="group" aria-label="${esc(t.trackL)}">${t.tracks.map((n, i) => `<button class="chip ${S.music && SND.track() === i ? "playing" : ""}" aria-pressed="${S.track === i}" data-track="${i}">${S.music && SND.track() === i ? "♪ " : ""}${esc(n)}</button>`).join("")}</div></div>
  ${FEEDBACK_EMAIL ? `<div class="card stack-s"><h3>${t.feedbackT}</h3><p class="small muted">${t.feedbackP}</p><a class="btn" style="text-align:center;text-decoration:none" href="mailto:${FEEDBACK_EMAIL}?subject=Tanetto">${t.feedbackB}</a></div>` : ""}
  <div class="card stack"><h3>${t.theme}</h3><div class="chips">${["system", "light", "dark"].map((m) => `<button class="chip" aria-pressed="${S.theme === m}" data-theme-set="${m}">${t.themes[m]}</button>`).join("")}</div></div>
  <div class="card stack-s"><h3>${t.privT}</h3><p class="small">${t.privP}</p></div>
  <div class="card stack help"><h3>${t.helpT}</h3><p>${t.helpP}</p><div>${t.helpLines.map((l) => `<p><strong>${l}</strong></p>`).join("")}</div></div>
  <div class="card stack-s"><h3>${t.legalT}</h3><div class="doclinks">${[["guide", t.guideB], ["privDoc", t.privB], ["terms", t.termsB], ["health", t.healthB], ["credits", t.creditsB]].map(([k, l]) => `<button class="doclink" data-doc="${k}">${l}<span aria-hidden="true">›</span></button>`).join("")}<button class="doclink" id="tutAgain">${t.tutAgain}<span aria-hidden="true">›</span></button></div></div>
  <div class="card stack">${confirmReset ? `<p>${t.resetAsk}</p><div class="row"><button class="btn" id="resetYes">${t.resetYes}</button><button class="link" id="resetNo">${t.cancel}</button></div>` : `<button class="btn ghost" id="reset">${t.reset}</button>`}</div>
  <p class="note">${t.demo}</p></div>`;
}
function renderTabs() {
  const t = L(); const nav = document.getElementById("tabs"); nav.hidden = !S.pet;
  const si = S.pet ? seasonState() : null;
  const dots = { trips: S.energy >= 100 && !S.away && !story, today: (S.giftDay !== S.day && !!S.pet) || (!!si && S.season.n >= EVENT_GOAL && !S.season.claimed) };
  document.getElementById("tabsIn").innerHTML = ["today", "trips", "home", "diary", "more"].map((k) => `<button class="tab" data-tab="${k}" ${tab === k ? 'aria-current="page"' : ""}><span class="ic">${icon(k)}</span><span>${t.tabs[k]}</span>${dots[k] && tab !== k ? '<i class="dot" aria-hidden="true"></i>' : ""}</button>`).join("");
}
let ambient = [], lastSeeds = null;
function countUp(el, from, to) {
  if (!el || from == null || from === to || !anim) { if (el) el.textContent = to; return; }
  const o = { v: from }; el.textContent = from;
  G.to(o, { v: to, duration: Math.min(1.2, 0.4 + Math.abs(to - from) / 80), ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v); } });
  const p = document.getElementById("seedPill"); if (p) G.fromTo(p, { scale: 1.2 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, .4)" });
}
function render() {
  rollDay();
  if (S.away && Date.now() >= S.away.until) finishTrip();
  applyRoot();
  ambient.forEach((a) => a.kill && a.kill()); ambient = [];
  const view = !S.pet ? "onb" + S.onboard : tab;
  /* id delle figure stabili tra un disegno e l'altro della stessa pagina: cosi' si aggiorna solo cio' che cambia */
  const uid0 = uid; nidScope = "a"; uid = 0; let html;
  try { html = !S.pet ? viewOnboard() : tab === "trips" ? viewTrips() : tab === "home" ? viewHome() : tab === "diary" ? viewDiary() : tab === "more" ? viewMore() : viewToday(); } finally { nidScope = ""; uid = uid0; }
  viewPut(html, view === lastTab);
  document.body.classList.toggle("hasbar", !!document.querySelector(".departbar"));
  renderTabs(); startAmbient(); animateBars();
  countUp(document.getElementById("seedN"), lastSeeds, S.seeds); lastSeeds = S.seeds;
  if (anim && view !== lastTab) {
    const items = viewEnterItems(app.querySelectorAll(".top, .roomwrap, .meters, .stack > h1, .stack > h2, .stack > p, .card, .event, .goal, .dest, .item, .post, .catgroup, .cta, .story, .away, .teaser, .steps, .choose, .tabsx, .sec")); ambQuiet(550);
    const TABS = ["today", "trips", "home", "diary", "more"]; const a = TABS.indexOf(view), bI = TABS.indexOf(lastTab);
    const dx = a >= 0 && bI >= 0 ? (a > bI ? 16 : -16) : 0;
    viewEnter(items, dx);
    const cur = document.querySelector('.tab[aria-current="page"] .ic');
    if (cur && lastTab) G.fromTo(cur, { y: 0, scale: 1 }, { keyframes: [{ y: -5, scale: 1.12, duration: 0.14, ease: "power2.out" }, { y: 0, scale: 1, duration: 0.45, ease: "bounce.out" }] });
  }
  lastTab = view;
  if (S.pet) { trackDaily(); maybeTutorial(); }
}

function friendToday() {
  if (!S.pet || S.lightsOff) return null;
  const n = Math.floor(new Date(S.day + "T12:00:00").getTime() / 86400000); const h = new Date().getHours();
  if (n % 3 !== 1 || h < 9 || h >= 21) return null;
  const others = ["germo", "ondi", "lumi"].filter((p) => p !== S.pet); return others[n % 2];
}
function weekSummary() {
  const t = L(); const wk = weekData(); const g = wk.reduce((a, w) => a + w.done, 0);
  let best = wk[0]; wk.forEach((w) => { if (w.done > best.done) best = w; });
  return `<div class="summary"><div class="sumpet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><p><b>${esc(t.summaryT(S.petName))}</b><br>${esc(t.summary(g, wdName(wdIdx(best.d), "long")))}</p></div>`;
}
