/* =================== v12: compagni Plus, primi minuti, promemoria, bentornato, invita un amico, telefoni lenti =================== */

/* --- I quattro compagni Plus --- */
const PLUS_PETS = ["miko", "rufi", "pingo", "dori"];
const ALL_PETS = ["germo", "ondi", "lumi"].concat(PLUS_PETS);
Object.assign(HALO, { miko: "#ECE7F7", rufi: "#FBE3D2", pingo: "#DDE6F3", dori: "#D7F2E8" });
Object.assign(WEEK_PAL, { miko: ["#EEEAF8", "#C9BDEB", "#6B5BB0"], rufi: ["#FCE6D6", "#F5B38A", "#C25E2A"], pingo: ["#E2E9F4", "#9FB3D6", "#3D4A6B"], dori: ["#DDF4EC", "#9ADBC6", "#2E8A6E"] });
Object.assign(FAV, { miko: "cookie", rufi: "berries", pingo: "fish", dori: "carrot" });

function miko(e, hat, st) {
  const c = "#EEE9F8", d = "#D3C9EE", pk = "#F6BCD0";
  const bodyD = "M100 58 C140 58 160 90 160 124 C160 160 134 180 100 180 C66 180 40 160 40 124 C40 90 60 58 100 58 Z";
  let o = `<path class="tail" style="transform-box:fill-box;transform-origin:0% 100%" d="M148 166 C184 166 194 130 178 108 C172 100 162 104 166 114 C176 132 168 150 146 152 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M176 112 C172 104 166 104 166 112" stroke="${d}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>`;
  o += `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%">`;
  o += `<path d="M54 96 L50 38 L92 64 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><path d="M60 86 L58 52 L82 66 Z" fill="${pk}"/><path d="M146 96 L150 38 L108 64 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><path d="M140 86 L142 52 L118 66 Z" fill="${pk}"/>`;
  o += `<ellipse cx="46" cy="134" rx="9" ry="14" fill="${c}" transform="rotate(25 46 134)"/><ellipse cx="154" cy="134" rx="9" ry="14" fill="${c}" transform="rotate(-25 154 134)"/><ellipse cx="78" cy="178" rx="15" ry="8" fill="${d}"/><ellipse cx="122" cy="178" rx="15" ry="8" fill="${d}"/>`;
  o += `<path d="${bodyD}" fill="${c}"/><ellipse cx="100" cy="153" rx="41" ry="24" fill="#FFFAF2"/>` + shade(bodyD);
  o += `<path d="M100 60 V72 M87 63 L91 73 M113 63 L109 73" stroke="${d}" stroke-width="4" stroke-linecap="round"/>`;
  if (st >= 1) o += `<path d="M66 146 Q100 162 134 146" stroke="${st >= 2 ? "#F2B33D" : "#7FB6F0"}" stroke-width="7" fill="none" stroke-linecap="round"/>` + (st >= 2 ? `<path d="M100 162 C94 155 90 160 94 164 L100 170 L106 164 C110 160 106 155 100 162 Z" fill="#E2454A"/>` : `<circle cx="100" cy="161" r="6" fill="#F2C35E" stroke="#C9861F" stroke-width="1.5"/><path d="M96 162 h8" stroke="#C9861F" stroke-width="1.4"/>`);
  if (st >= 2 && !hat) o += `<g class="puff" transform="translate(154 50)"><path d="M-14 6 C-20 6 -20 -3 -13 -3 C-12 -11 -2 -12 0 -6 C3 -12 13 -10 12 -2 C19 -2 19 6 13 6 Z" fill="#fff" stroke="#C9BDEB" stroke-width="1.6"/><path d="M-4 -1 l1.2 2.6 2.8.3 -2.1 1.9 .6 2.8 -2.5 -1.4 -2.5 1.4 .6 -2.8 -2.1 -1.9 2.8 -.3 Z" fill="#FFD25E"/></g>`;
  o += headwear(84, hat);
  o += eyes(e, 80, 120, 108) + cheeks(64, 136, 124) + `<path d="M95 118 H105 L100 124 Z" fill="#F08AA8"/>` + mouth(e, 100, 128);
  o += `<path d="M70 122 L50 118 M70 128 L50 130 M130 122 L150 118 M130 128 L150 130" stroke="#B9AEDB" stroke-width="1.6" stroke-linecap="round"/>`;
  return shadow() + o + `</g>` + sleepZ(e, 160, 64);
}
function rufi(e, hat, st) {
  const o1 = "#F08C4E", dk = "#5A3424", cr = "#FFF1DE";
  const bodyD = "M100 56 C138 56 156 88 156 122 C156 160 134 182 100 182 C66 182 44 160 44 122 C44 88 62 56 100 56 Z";
  let o = `<g class="tail" style="transform-box:fill-box;transform-origin:0% 100%"><path d="M146 168 C192 172 200 120 178 96 C172 124 162 146 140 152 Z" fill="${o1}"/><path d="M178 96 C190 104 196 120 192 134 C186 126 180 112 178 96 Z" fill="${cr}"/></g>`;
  o += `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%">`;
  o += `<path d="M52 100 L44 28 L94 60 Z" fill="${o1}"/><path d="M58 88 L54 44 L84 62 Z" fill="${cr}"/><path d="M44 28 L48 48 L60 40 Z" fill="${dk}"/><path d="M148 100 L156 28 L106 60 Z" fill="${o1}"/><path d="M142 88 L146 44 L116 62 Z" fill="${cr}"/><path d="M156 28 L152 48 L140 40 Z" fill="${dk}"/>`;
  o += `<path d="${bodyD}" fill="${o1}"/>` + `<path d="M56 112 C70 104 86 112 100 124 C114 112 130 104 144 112 C140 140 122 154 100 154 C78 154 60 140 56 112 Z" fill="${cr}"/><ellipse cx="100" cy="160" rx="34" ry="21" fill="${cr}"/>` + shade(bodyD);
  o += `<ellipse cx="48" cy="140" rx="8" ry="13" fill="${o1}" transform="rotate(25 48 140)"/><ellipse cx="152" cy="140" rx="8" ry="13" fill="${o1}" transform="rotate(-25 152 140)"/><ellipse cx="80" cy="180" rx="13" ry="6" fill="${dk}"/><ellipse cx="120" cy="180" rx="13" ry="6" fill="${dk}"/>`;
  if (st >= 1) o += `<path d="M64 150 Q100 166 136 150 L134 160 Q100 176 66 160 Z" fill="#6DBE8C"/><path d="M118 160 L128 180 L116 178 Z" fill="#5AA877"/>` + (st >= 2 ? `<path d="M70 156 Q100 168 130 156" stroke="#FFF1DE" stroke-width="2" stroke-dasharray="4 5" fill="none" stroke-linecap="round"/>` : "");
  if (st >= 2 && !hat) o += `<g transform="translate(62 54)"><circle r="5" cx="0" cy="-7" fill="#FFF4C2"/><circle r="5" cx="7" cy="0" fill="#FFF4C2"/><circle r="5" cx="0" cy="7" fill="#FFF4C2"/><circle r="5" cx="-7" cy="0" fill="#FFF4C2"/><circle r="4" fill="#F2B33D"/></g>`;
  o += headwear(82, hat);
  o += eyes(e, 80, 120, 106) + cheeks(66, 134, 122, "#F59A7A") + `<ellipse cx="100" cy="121" rx="6" ry="4" fill="${dk}"/><ellipse cx="98" cy="119.5" rx="2" ry="1.2" fill="#fff" opacity=".6"/>` + mouth(e, 100, 128);
  return shadow() + o + `</g>` + sleepZ(e, 160, 60);
}
function pingoBeak(e) {
  if (e === "felice" || e === "wow" || e === "amore") return `<path d="M90 116 Q100 108 110 116 L100 120 Z" fill="#F6A23B"/><path d="M92 120 L108 120 Q100 ${e === "wow" ? 134 : 130} 92 120 Z" fill="#E07F1F"/><ellipse cx="100" cy="${e === "wow" ? 126 : 124}" rx="3.4" ry="2.2" fill="#F08A8A"/>`;
  return `<path d="M90 116 Q100 108 110 116 Q100 126 90 116 Z" fill="#F6A23B"/><path d="M92 118 Q100 122 108 118" stroke="#D8771A" stroke-width="1.2" fill="none"/>`;
}
function pingo(e, hat, st) {
  const nv = "#3D4A6B", wh = "#FDFBF5";
  const bodyD = "M100 52 C136 52 152 86 152 124 C152 162 132 182 100 182 C68 182 48 162 48 124 C48 86 64 52 100 52 Z";
  let o = `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%">`;
  o += `<g class="flipl" style="transform-box:fill-box;transform-origin:80% 10%"><path d="M54 106 C36 120 30 146 36 158 C46 152 54 138 58 124 Z" fill="${nv}"/></g><g class="flipr" style="transform-box:fill-box;transform-origin:20% 10%"><path d="M146 106 C164 120 170 146 164 158 C154 152 146 138 142 124 Z" fill="${nv}"/></g>`;
  o += `<ellipse cx="82" cy="182" rx="13" ry="5" fill="#F6A23B"/><ellipse cx="118" cy="182" rx="13" ry="5" fill="#F6A23B"/>`;
  o += `<path d="${bodyD}" fill="${nv}"/><path d="M100 76 C108 66 128 66 134 84 C140 102 136 120 134 134 C126 162 114 176 100 176 C86 176 74 162 66 134 C64 120 60 102 66 84 C72 66 92 66 100 76 Z" fill="${wh}"/>` + shade(bodyD);
  if (st >= 1) o += `<path d="M62 146 Q100 162 138 146 L136 157 Q100 172 64 157 Z" fill="#E2454A"/>` + (st >= 2 ? `<path d="M76 150 v10 M90 154 v10 M104 155 v10 M118 153 v10" stroke="#fff" stroke-width="3" opacity=".85"/><g transform="translate(124 158)"><path d="M0 -7 V7 M-6 -3.5 L6 3.5 M-6 3.5 L6 -3.5" stroke="#BFE3FF" stroke-width="2.4" stroke-linecap="round"/></g>` : `<path d="M120 154 L128 176 L116 174 Z" fill="#C83A3F"/>`);
  o += headwear(78, hat);
  o += eyes(e, 82, 118, 102) + cheeks(68, 132, 118, "#F7B0B8") + pingoBeak(e);
  return shadow() + o + `</g>` + sleepZ(e, 160, 58);
}
function dori(e, hat, st) {
  const m = "#8ED8C0", dk = "#4FA88B", bl = "#FFF3C9", hn = st >= 1 ? "#F2B33D" : "#FFE08A";
  const bodyD = "M100 60 C140 60 158 92 158 126 C158 162 134 182 100 182 C66 182 42 162 42 126 C42 92 60 60 100 60 Z";
  let o = `<g class="dwing" style="transform-box:fill-box;transform-origin:100% 60%"><path d="M60 106 C32 80 12 90 16 112 C24 106 30 112 28 122 C38 116 44 122 44 130 C50 122 54 116 62 114 Z" fill="#BDEBDC" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/></g><g class="dwing" style="transform-box:fill-box;transform-origin:0% 60%"><path d="M140 106 C168 80 188 90 184 112 C176 106 170 112 172 122 C162 116 156 122 156 130 C150 122 146 116 138 114 Z" fill="#BDEBDC" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/></g>`;
  o += `<g class="tail" style="transform-box:fill-box;transform-origin:0% 100%"><path d="M148 166 C176 172 190 158 186 140 C180 150 168 156 146 152 Z" fill="${m}"/><path d="M186 130 L196 141 L186 152 L179 141 Z" fill="${dk}"/></g>`;
  o += `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%">`;
  o += `<path d="M74 72 C68 56 70 44 78 38 C80 50 84 58 88 66 Z" fill="${hn}"/><path d="M126 72 C132 56 130 44 122 38 C120 50 116 58 112 66 Z" fill="${hn}"/>`;
  o += [92, 100, 108].map((x, i) => `<path d="M${x - 6} ${64 + (i === 1 ? -2 : 0)} L${x} ${50 + (i === 1 ? -4 : 0)} L${x + 6} ${64 + (i === 1 ? -2 : 0)} Z" fill="${st >= 2 ? "#F2B33D" : dk}"/>`).join("");
  o += `<path d="${bodyD}" fill="${m}"/><path d="M100 124 C122 124 132 140 130 156 C128 172 116 180 100 180 C84 180 72 172 70 156 C68 140 78 124 100 124 Z" fill="${bl}"/><path d="M74 146 Q100 154 126 146 M72 162 Q100 170 128 162" stroke="#EBD9A0" stroke-width="2" fill="none"/>` + shade(bodyD);
  o += `<ellipse cx="46" cy="138" rx="8" ry="13" fill="${m}" transform="rotate(25 46 138)"/><ellipse cx="154" cy="138" rx="8" ry="13" fill="${m}" transform="rotate(-25 154 138)"/><ellipse cx="80" cy="180" rx="14" ry="6.5" fill="${dk}"/><ellipse cx="120" cy="180" rx="14" ry="6.5" fill="${dk}"/>`;
  if (st >= 2 && !hat) o += `<g class="puff" transform="translate(146 62)"><circle cx="0" cy="0" r="7" fill="#fff" opacity=".9"/><circle cx="8" cy="-6" r="5" fill="#fff" opacity=".8"/><path d="M14 -16 C11 -20 7 -17 10 -14 L14 -10 L18 -14 C21 -17 17 -20 14 -16 Z" fill="#F28AA8"/></g>`;
  o += headwear(84, hat);
  o += eyes(e, 80, 120, 106) + cheeks(64, 136, 120, "#F7A6A0") + `<circle cx="95" cy="119" r="1.8" fill="${dk}"/><circle cx="105" cy="119" r="1.8" fill="${dk}"/>` + mouth(e, 100, 126);
  return shadow() + o + `</g>` + sleepZ(e, 162, 62);
}
const _petInnerV12 = petInner;
petInner = function (pet, e, hat, st, glow) { if (pet === "miko") return miko(e, hat, st); if (pet === "rufi") return rufi(e, hat, st); if (pet === "pingo") return pingo(e, hat, st); if (pet === "dori") return dori(e, hat, st); return _petInnerV12(pet, e, hat, st, glow); };
const _petAmbientV12 = petAmbient;
petAmbient = function (c) {
  _petAmbientV12(c); if (!anim || !c) return;
  c.querySelectorAll(".flipl").forEach((s) => ambient.push(G.to(s, { rotation: 10, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  c.querySelectorAll(".flipr").forEach((s) => ambient.push(G.to(s, { rotation: -10, duration: 0.9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.45 })));
  c.querySelectorAll(".dwing").forEach((s, i) => ambient.push(G.to(s, { scaleX: 0.86, rotation: i ? -6 : 6, duration: 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  c.querySelectorAll(".puff").forEach((s) => ambient.push(G.to(s, { y: -4, opacity: 0.7, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" })));
};

/* --- Scelta del compagno: presentazione, anteprima, cambio --- */
const isPlusPet = (p) => PLUS_PETS.includes(p);
const SITE_URL = "https://tanettoapp.github.io/Tanetto/";
function petChoice(p, sel, attr) {
  const t = L(); const plus = isPlusPet(p);
  return `<button class="choice ${plus ? "pchoice" : ""}" role="radio" aria-checked="${sel === p}" ${attr}="${p}"><span class="halo" style="background:radial-gradient(circle at 50% 60%, ${HALO[p]} 0 62%, transparent 63%)">${petSVG(p, sel === p ? "felice" : "normale", null, 0, t.pets[p][0])}</span>${plus ? `<span class="ppcrown" aria-hidden="true">${icon("p_crown")}</span>` : ""}<span class="nm">${t.pets[p][0]}</span><span class="ds">${t.pets[p][1]}</span></button>`;
}
const _viewOnboardV12 = viewOnboard;
viewOnboard = function () {
  const h = _viewOnboardV12(); if (S.onboard !== 0) return h; const t = L(); const key = `<button class="btn block" id="toName">`;
  const sec = `<div class="ppsec"><div class="pphd">${icon("p_crown")}<b>${t.v12.ppT}</b></div><p class="small muted">${t.v12.ppP}</p><div class="choose four" role="radiogroup" aria-label="${esc(t.v12.ppT)}">${PLUS_PETS.map((p) => petChoice(p, draftPet, "data-ppet")).join("")}</div></div>`;
  return h.includes(key) ? h.replace(key, sec + key) : h;
};
let ppFrom = null;
function openPetPreview(p, from) {
  const t = L(); ppFrom = from; const can = !isPlusPet(p) || plusActive(); const cur = from === "app" && S.pet === p;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="ppT"><div class="box card ppbox"><div class="ppbig" style="background:radial-gradient(circle at 50% 58%, ${HALO[p]} 0 60%, transparent 61%)"><svg viewBox="0 0 200 200" role="img" aria-label="${esc(t.pets[p][0])}"><g id="ppPet">${petInner(p, "felice", from === "app" ? S.hat : null, from === "app" ? stage() : 0, 0.95)}</g></svg></div>
  ${isPlusPet(p) ? `<span class="pptag">${icon("p_crown")}Tanetto Plus</span>` : ""}<h2 id="ppT">${esc(t.pets[p][0])}</h2><p>${esc(t.pets[p][1])}</p>${isPlusPet(p) ? `<p class="small muted">${t.v12.keep}</p>` : ""}
  ${cur ? `<p class="okline">${icon("check")} ${t.v12.cur}</p>` : can ? `<button class="btn block" data-pickpet="${p}">${esc(t.v12.choose(t.pets[p][0]))}</button>` : `<button class="btn gold block" data-wantpet="${p}">${icon("p_crown")}${esc(t.v12.want(t.pets[p][0]))}</button>`}
  <button class="link" id="closeLayer">${t.v12.back}</button></div></div>`;
  const g = document.getElementById("ppPet"); if (g) petAmbient(g.parentNode);
  SND.play("pop"); trackOnce("anteprima-" + p);
  if (anim) G.from(".ppbig", { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(1.8)" });
}
function openPetPicker() {
  const t = L();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="pkT"><div class="box card pkbox"><h2 id="pkT">${t.v12.change}</h2><p class="small muted">${t.v12.meP}</p><div class="choose">${["germo", "ondi", "lumi"].map((p) => petChoice(p, S.pet, "data-prevpet")).join("")}</div><div class="pphd">${icon("p_crown")}<b>${t.v12.ppT}</b></div><div class="choose four">${PLUS_PETS.map((p) => petChoice(p, S.pet, "data-prevpet")).join("")}</div><button class="link" id="closeLayer">${t.close}</button></div></div>`;
  if (anim) G.from(".pkbox .choice", { y: 14, opacity: 0, duration: 0.35, stagger: 0.04 });
}
function switchPet(p) {
  const t = L(); const old = S.pet; if (old === p) return;
  if (S.petName === t.pets[old][0]) S.petName = t.pets[p][0];
  S.pet = p; save(); closeLayer(); applyRoot(); render(); window.scrollTo(0, 0);
  setTimeout(() => { setExpr("amore", 2200); say(t.v12.hi(S.petName), 3200); burst("heart", 12); }, 350);
  SND.play("fanfare"); SND.haptic([15, 40, 20]); trackOnce("compagno-" + p);
}
function petCard() {
  const t = L(); if (!S.pet) return "";
  return `<div class="card petcard"><div class="pcart" style="background:radial-gradient(circle at 50% 58%, ${HALO[S.pet]} 0 60%, transparent 61%)">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><div class="pctx"><h2 class="h3like">${t.v12.meT}</h2><p class="small muted">${t.v12.meP}</p><button class="btn small ghost" id="pickPet">${t.v12.change}</button></div></div>`;
}
const _friendTodayV12 = friendToday;
friendToday = function () { const f = _friendTodayV12(); if (!f) return f; const n = Math.floor(new Date(S.day + "T12:00:00").getTime() / 86400000); const others = ALL_PETS.filter((p) => p !== S.pet); return others[n % others.length]; };

/* --- Primi minuti: regalo di benvenuto, primo passo --- */
let pendingWelcome = false;
const _tutCloseV12 = tutClose;
tutClose = function (done) {
  _tutCloseV12(done);
  if (done && pendingWelcome && S.pet && !S.welcomeGift) { pendingWelcome = false; setTimeout(openWelcomeGift, 400); }
};
function openWelcomeGift() {
  const t = L(); if (S.welcomeGift) return; S.welcomeGift = dkey(); S.seeds += 50; save();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="wgT"><div class="box card wgbox"><div class="fdpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div><h2 id="wgT">${t.v12.giftT}</h2><p>${esc(t.v12.giftP(S.petName))}</p><p class="svgift">${SEED}<b>+50</b></p><button class="btn" id="wgOk">${t.v12.giftB}</button></div></div>`;
  SND.play("fanfare"); burst("confetti", 24); trackOnce("regalo-benvenuto");
  if (anim) G.from(".wgbox .fdpet", { scale: 0.4, rotation: -10, duration: 0.6, ease: "back.out(2)" });
}
const _completeGoalV12 = completeGoal;
completeGoal = function (g, rect) {
  const before = (S.log || []).length; _completeGoalV12(g, rect);
  if (before === 0 && (S.log || []).length === 1) { const t = L(); setTimeout(() => { toast(t.v12.firstT); burst("heart", 14); setExpr("amore", 2400); }, 900); trackOnce("primo-obiettivo"); }
};

/* --- Promemoria nel calendario --- */
function remTimes() { const v = (S.remTime || "20:00").split(":").map(Number); return { h: v[0] || 20, m: v[1] || 0 }; }
function remStart() { const { h, m } = remTimes(); const d = new Date(); d.setHours(h, m, 0, 0); if (d < new Date()) d.setDate(d.getDate() + 1); return d; }
const pad2 = (n) => String(n).padStart(2, "0");
const icsDate = (d) => `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
function remGoogle() {
  const t = L(); const s = remStart(); const e = new Date(s.getTime() + 10 * 60000); let tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (x) { /* niente */ }
  const q = new URLSearchParams({ action: "TEMPLATE", text: t.v12.remTitle(S.petName), details: `${t.v12.remBody} ${SITE_URL}`, dates: `${icsDate(s)}/${icsDate(e)}`, recur: "RRULE:FREQ=DAILY" }); if (tz) q.set("ctz", tz);
  return "https://calendar.google.com/calendar/render?" + q.toString();
}
function remIcs() {
  const t = L(); const s = remStart(); const e = new Date(s.getTime() + 10 * 60000); const esc2 = (x) => String(x).replace(/\\/g, "\\\\").replace(/[,;]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const now = new Date(); const stamp = `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}00Z`;
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tanetto//Promemoria//IT", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:tanetto-${Date.now()}@tanettoapp.github.io`, `DTSTAMP:${stamp}`, `DTSTART:${icsDate(s)}`, `DTEND:${icsDate(e)}`, "RRULE:FREQ=DAILY", `SUMMARY:${esc2(t.v12.remTitle(S.petName))}`, `DESCRIPTION:${esc2(t.v12.remBody + " " + SITE_URL)}`, `URL:${SITE_URL}`, "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc2(t.v12.remTitle(S.petName))}`, "TRIGGER:PT0M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].map(icsFold).join("\r\n");
}
function icsFold(line) { const enc = new TextEncoder(); if (enc.encode(line).length <= 75) return line; const out = []; let cur = ""; for (const ch of line) { if (enc.encode(cur + ch).length > (out.length ? 74 : 75)) { out.push(cur); cur = ""; } cur += ch; } out.push(cur); return out.join("\r\n "); }
async function saveIcs() {
  const t = L(); const blob = new Blob([remIcs()], { type: "text/calendar" }); const name = "tanetto-promemoria.ics";
  const dl = await getDl();
  if (dl) { try { await dl.save({ filename: name, data: blob }); remOk(); return; } catch (e) { if (e && (e.code === "declined" || e.code === "rate_limited")) return; } }
  try { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); remOk(); } catch (e) { toast(t.saveNo); }
}
function remOk() { S.rem = "ok"; save(); toast(L().v12.remDone); trackOnce("promemoria-aggiunto"); const y = window.scrollY; render(); window.scrollTo(0, y); }
function remCard(ask) {
  const t = L();
  return `<div class="card remcard ${ask ? "ask" : ""}"><div class="chhd"><span class="chic rem">${icon("p_bell")}</span><div><h3>${ask ? t.v12.remAsk : t.v12.remT}</h3><p class="small muted">${esc(t.v12.remP(S.petName))}</p></div></div><div class="field remrow"><label for="remTime${ask ? "A" : ""}">${t.v12.remTime}</label><input type="time" id="remTime${ask ? "A" : ""}" class="remtime" value="${S.remTime || "20:00"}"></div><div class="rembtns"><a class="btn small" id="remG" href="${esc(remGoogle())}" target="_blank" rel="noopener">${t.v12.remG}</a><button class="btn small ghost" id="remI">${t.v12.remI}</button></div>${ask ? `<button class="link" id="remNo">${t.v12.remLater}</button>` : ""}</div>`;
}
document.addEventListener("change", (ev) => { if (ev.target && ev.target.classList && ev.target.classList.contains("remtime")) { S.remTime = ev.target.value || "20:00"; save(); document.querySelectorAll("#remG").forEach((a) => { a.href = remGoogle(); }); } });

/* --- Bentornato --- */
const BACK_GAP = (() => { try { if (!S.pet || !S.visit || !S.visit.last) return 0; return Math.round((new Date(dkey()) - new Date(S.visit.last)) / 86400000); } catch (e) { return 0; } })();
function openWelcomeBack() {
  const t = L(); if (S.backDay === dkey()) return; S.backDay = dkey(); S.seeds += 20; save();
  const txt = pick(t.v12.backP)(S.petName);
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="wbT"><div class="box card wgbox"><div class="fdpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div><h2 id="wbT">${t.v12.backT}</h2><p>${esc(txt)}</p><p class="svgift">${SEED}<b>${t.v12.backGift}</b></p><button class="btn" id="closeLayer">${t.v12.backB}</button></div></div>`;
  SND.play("chime"); burst("heart", 14); trackOnce("bentornato");
  if (anim) G.from(".wgbox .fdpet", { y: 30, scale: 0.6, duration: 0.6, ease: "back.out(2)" });
}
setTimeout(() => { if (BACK_GAP >= 2 && S.pet && S.tut >= 99 && !layer.innerHTML && !tutOn) openWelcomeBack(); }, anim ? 1400 : 300);

/* --- Invita un amico --- */
let inviteMode = false;
const _shareImageV12 = shareImage;
shareImage = async function (url, name) {
  if (!inviteMode) return _shareImageV12(url, name);
  const t = L();
  try {
    const blob = await (await fetch(url)).blob(); const file = new File([blob], name, { type: blob.type || "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Tanetto", text: `${t.v12.invText(S.petName)} ${SITE_URL}` }); trackOnce("invito-inviato"); return true; }
    if (navigator.share) { await navigator.share({ title: "Tanetto", text: t.v12.invText(S.petName), url: SITE_URL }); trackOnce("invito-inviato"); return true; }
  } catch (e) { if (e && e.name === "AbortError") return true; }
  return false;
};
function inviteFlow() {
  const t = L(); const pal = WEEK_PAL[S.pet] || WEEK_PAL.germo; inviteMode = true; trackOnce("invito-aperto");
  return shareFlow(() => makeCard({ art: `<svg viewBox="0 0 200 200"><circle cx="100" cy="112" r="94" fill="${pal[0]}"/>${petInner(S.pet, "amore", S.hat, stage(), 0.95)}</svg>`, w: 640, h: 640, title: t.v12.invTitle(S.petName), sub: "tanettoapp.github.io/Tanetto" }), "tanetto-invito.png");
}
function inviteCard() { const t = L(); return `<div class="card invcard"><div class="chhd"><span class="chic inv">${icon("p_gift")}</span><div><h3>${t.v12.invT}</h3><p class="small muted">${esc(t.v12.invP(S.petName))}</p></div></div><button class="btn block" id="invite">${icon("share")}${t.v12.invB}</button></div>`; }

/* --- Collegamenti alle schermate --- */
const _viewMoreV12 = viewMore;
viewMore = function () {
  const h = _viewMoreV12(); if (!S.pet) return h; const key = `<div class="card stack" id="goalsCard">`;
  const add = petCard() + inviteCard() + remCard(false);
  return h.includes(key) ? h.replace(key, add + key) : h + add;
};
const _viewTodayV12 = viewToday;
viewToday = function () {
  const h = _viewTodayV12(); if (!S.pet || S.away) return h;
  const showRem = !S.rem && (S.log || []).length >= 1; if (!showRem) return h;
  const key = `<p class="note">${L().demo}</p>`; return h.includes(key) ? h.replace(key, remCard(true) + key) : h;
};
const _applyRootV12 = applyRoot;
applyRoot = function () { _applyRootV12(); document.documentElement.classList.toggle("firstgoal", !!S.pet && !(S.log || []).length && !S.away); };

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button, a"); if (!b) return;
  if (b.id === "startApp") { pendingWelcome = true; return; }
  if (b.dataset.ppet) { ev.stopImmediatePropagation(); const p = b.dataset.ppet; if (plusActive()) { draftPet = p; draftName = ""; SND.play("pop"); render(); } else openPetPreview(p, "onb"); return; }
  if (b.dataset.prevpet) { ev.stopImmediatePropagation(); openPetPreview(b.dataset.prevpet, "app"); return; }
  if (b.dataset.pickpet) { ev.stopImmediatePropagation(); const p = b.dataset.pickpet; if (isPlusPet(p) && !plusActive()) return; if (ppFrom === "onb") { draftPet = p; draftName = ""; closeLayer(); render(); SND.play("pop"); } else switchPet(p); return; }
  if (b.dataset.wantpet) { ev.stopImmediatePropagation(); const p = b.dataset.wantpet; const from = ppFrom; openPlus("compagno-" + p, () => { if (plusActive()) openPetPreview(p, from); }); return; }
  if (b.id === "pickPet") { openPetPicker(); return; }
  if (b.id === "wgOk") { closeLayer(); setTimeout(() => { const g = document.querySelector(".goal"); if (g) { g.scrollIntoView({ block: "center", behavior: anim ? "smooth" : "auto" }); say(L().v12.firstP(S.petName), 5200); } }, 300); return; }
  if (b.id === "remG") { S.rem = "ok"; save(); trackOnce("promemoria-google"); setTimeout(() => { const y = window.scrollY; render(); window.scrollTo(0, y); }, 800); return; }
  if (b.id === "remI") { saveIcs(); return; }
  if (b.id === "remNo") { if (S.rem !== "ok") S.rem = "no"; save(); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "invite") { inviteFlow(); return; }
  if (b.id === "closeLayer") { inviteMode = false; }
}, true);
Object.assign(ICON, { p_bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>' });
/* Vantaggi di Plus: aggiungo i compagni esclusivi */
const _openPlusV12 = openPlus;
openPlus = function (src, after) {
  _openPlusV12(src, after); const t = L(); const ul = document.querySelector(".plusbox .perks"); if (!ul || ul.querySelector(".pkpets")) return;
  const li = document.createElement("li"); li.className = "pkpets"; li.innerHTML = `<span class="pk">${icon("p_heart")}</span><span>${esc(t.v12.perk(PLUS_PETS.length))}</span>`;
  ul.insertBefore(li, ul.children[1] || null);
};

/* --- Telefoni lenti: modalita' leggera (automatica, o a mano in Altro) --- */
const isLite = () => S.lite === true || (S.lite !== false && S.liteAuto === true);
const PET_CLS = ["body", "eyes", "sprout", "tail", "wings", "glow", "flipl", "flipr", "dwing", "puff", "zz"];
function applyLite() { const on = isLite(); document.documentElement.classList.toggle("lite", on); if (G && G.ticker) G.ticker.fps(on ? 30 : 60); }
const _ambientExtraV12 = ambientExtra;
ambientExtra = function (root, q) {
  if (!isLite()) { _ambientExtraV12(root, q); return; }
  ambient = ambient.filter((tw) => { const tg = tw.targets ? tw.targets() : []; const keep = !tg.length || tg.some((el) => el && el.classList && PET_CLS.some((c) => el.classList.contains(c)) || (el && el.id === "gift")); if (!keep && tw.kill) tw.kill(); return keep; });
};
const _roomSVGv12 = roomSVG;
roomSVG = function (opts) { const o = _roomSVGv12(opts); return isLite() ? o.replace(/<rect [^>]*filter="url\(#gr\d+\)"\/>/, "") : o; };
const _applyRootV12b = applyRoot;
applyRoot = function () { _applyRootV12b(); applyLite(); };
function measureLite() {
  if (!anim || S.liteAuto != null || S.lite != null) return;
  let n = 0, t0 = 0, slow = 0;
  /* si misura solo con l'app davanti: in una scheda nascosta i fotogrammi si fermano e sembrerebbe un telefono lento */
  const f = (t) => { if (document.hidden || (last && t - last > 400)) return; if (!t0) t0 = t; else if (t - last > 26) slow++; last = t; n++; if (n < 90) requestAnimationFrame(f); else { S.liteAuto = slow > 20 || (t - t0) / (n - 1) > 21; save(); if (S.liteAuto) { trackOnce("modalita-leggera-auto"); render(); } } };
  let last = 0; setTimeout(() => { if (!document.hidden && !layer.innerHTML) requestAnimationFrame(f); }, 3500);
}
measureLite();
const _viewMoreV12b = viewMore;
viewMore = function () {
  const h = _viewMoreV12b(); const t = L(); const key = `id="calmSw"></button></div>`;
  const row = `<div class="switchrow"><span id="liteL">${t.v12.lite}<br><small class="muted">${t.v12.liteP}</small></span><button class="switch" role="switch" aria-checked="${isLite()}" aria-labelledby="liteL" id="liteSw"></button></div>`;
  return h.includes(key) ? h.replace(key, key + row) : h;
};
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("button"); if (b && b.id === "liteSw") { ev.stopImmediatePropagation(); S.lite = !isLite(); save(); applyLite(); const y = window.scrollY; render(); window.scrollTo(0, y); } }, true);

/* --- Da quale canale arriva chi prova l'app (anonimo): ?src=nome nel link --- */
(() => {
  let src = ""; try { src = (new URLSearchParams(location.search).get("src") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 24); } catch (e) { /* niente */ }
  if (src && !S.src) { S.src = src; save(); track(`arrivo-${src}`); }
  else if (!S.src && !S.srcSeen) { S.srcSeen = 1; save(); track("arrivo-diretto"); }
})();
const _trackDailyV12 = trackDaily;
trackDaily = function () {
  const before = S.tracked && S.tracked.open; _trackDailyV12();
  if (S.tracked && S.tracked.open !== before && S.pet && S.firstDay) { const d = Math.round((new Date(dkey()) - new Date(S.firstDay)) / 86400000); track(`giorno-${d}-${S.src || "diretto"}`); }
};
