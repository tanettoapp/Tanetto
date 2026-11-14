/* =================== v9: Tanì, Tanetto Plus, gite, chat, accessibilità, benvenuto =================== */
const PACKS = [{ n: 120, p: 0.99, b: 0 }, { n: 650, p: 4.99, b: 8 }, { n: 1400, p: 9.99, b: 16 }, { n: 3000, p: 19.99, b: 24 }];
const PLUS_PRICE = { month: 4.99, year: 44.99 }; /* prezzi di Tanetto Plus in Italia (decisione finale del 13/11/2026, gli stessi di Google Play): valgono solo come riserva, senza Google Play; nell'app i prezzi veri, nella valuta di chi compra, arrivano sempre da Google Play */
/* risparmio dell'annuale rispetto a 12 mesi: sempre calcolato dai prezzi mostrati (quelli di Play, o la riserva), arrotondato
   all'intero piu' vicino (decisione del 13/11/2026: 4,99/44,99 -> 24,87% -> 25%);
   "al mese" dell'annuale = prezzo annuale / 12 (44,99 -> 3,75) */
const plusSavePct = (year, month) => (year > 0 && month > 0 ? Math.max(0, Math.round((1 - year / (month * 12)) * 100)) : 0);
const PLUS_SCENES = ["beach", "camp", "snow"];
const FD_GIFT = 15;
const money = (v) => { try { return intlNF(loc(), { style: "currency", currency: "EUR" }).format(v); } catch (e) { return `€${v}`; } };
const plusActive = () => plusOk(); /* v14: vale solo un abbonamento vero di Google Play (vedi 97o_billing.js) */

/* --- L'icona grande di Tanetto (benvenuto e icone dell'app) --- */
/* 1.0.9 (fase 3): un solo Germo ovunque. L'icona grande e' il Germo 3D dell'icona dell'app (WebP in linea, < 8 KB,
   BOOT_IMG da 41z_img3d.js generato da make_img.py): lo stesso del logo di avvio, dell'icona e dello splash di Android. */
const ICON_BIG = `<img class="icon3d" src="${BOOT_IMG}" alt="" width="132" height="132" decoding="sync">`;

/* --- Benvenuto animato --- */
splash = function () {
  if (!anim || sessionStorageSafe("splash")) return;
  const t = L(); const d = document.createElement("div"); d.className = "splash v9";
  d.innerHTML = `<div class="spglow"></div><div class="splogo">${ICON_BIG}</div><div class="spname">${["Ta", "ne", "tt", "o"].map((c, k) => `<span class="g${k}">${c}</span>`).join("")}</div><div class="sptag">${esc(t.tagline || "")}</div>`;
  document.body.appendChild(d);
  const tl = G.timeline({ onComplete: () => d.remove() });
  /* 1.0.9: il nome compare in 4 gruppi di lettere, a tempo con le 4 note del logo sonoro (Sol La Si Re, 112,5 bpm = 0,267 s) */
  tl.from(".splash .splogo", { scale: 0.3, opacity: 0, duration: 0.55, ease: "back.out(1.6)" })
    .from(".splash .spname .g0", { y: 26, opacity: 0, duration: 0.3, ease: "back.out(1.8)" }, "-=0.05")
    .from(".splash .spname .g1", { y: 26, opacity: 0, duration: 0.3, ease: "back.out(1.8)" }, "+=" + (0.267 - 0.3))
    .from(".splash .spname .g2", { y: 26, opacity: 0, duration: 0.3, ease: "back.out(1.8)" }, "+=" + (0.267 - 0.3))
    .from(".splash .spname .g3", { y: 26, opacity: 0, duration: 0.3, ease: "back.out(1.8)" }, "+=" + (0.267 - 0.3))
    .from(".splash .sptag", { y: 10, opacity: 0, duration: 0.35 }, "-=0.15")
    .to(d, { opacity: 0, scale: 1.06, duration: 0.45, ease: "power2.in", delay: 0.55 });
  d.addEventListener("click", () => tl.progress(1));
};

/* --- Il negozio dei Tanì (prova: conta chi comprerebbe) --- */
function packArt(i) {
  const coins = [[0, 0], [-14, 4], [14, 4], [-7, -10], [7, -10], [0, -20], [-22, -6], [22, -6], [-14, -22], [14, -22]].slice(0, [2, 4, 7, 10][i]);
  const c = (x, y) => `<g transform="translate(${50 + x} ${58 + y})"><ellipse cx="0" cy="3" rx="12" ry="5" fill="#C98424"/><ellipse cx="0" cy="0" rx="12" ry="5" fill="#F2B33D"/><ellipse cx="0" cy="0" rx="8" ry="3" fill="#FFD27A"/></g>`;
  const box = i === 3 ? `<path d="M18 58 L82 58 L78 88 L22 88 Z" fill="#9A6B43"/><rect x="16" y="54" width="68" height="8" rx="3" fill="#7E5534"/><rect x="44" y="62" width="12" height="10" rx="2" fill="#F2B33D"/>` : i === 2 ? `<path d="M22 62 L78 62 L72 88 L28 88 Z" fill="#C99A5E"/><rect x="20" y="58" width="60" height="7" rx="3.5" fill="#B5875A"/>` : i === 1 ? `<path d="M30 60 C26 88 74 88 70 60 Z" fill="#E2B85C"/><path d="M34 60 C40 54 60 54 66 60" stroke="#C9973A" stroke-width="3" fill="none"/>` : "";
  return `<svg viewBox="0 0 100 96" aria-hidden="true">${i ? "" : ""}${coins.map(([x, y]) => c(x, y - (i ? 10 : -6))).join("")}${box}</svg>`;
}
function openTaniShop(src) {
  const t = L(); const tt = t.tani;
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="tsT"><div class="sheet tshop"><div class="grab"></div><h2 id="tsT">${SEED}${tt.shopT}</h2><p class="small muted">${tt.shopP}</p>
  <div class="packs">${PACKS.map((p, i) => `<button class="pack ${i === 3 ? "best" : ""}" data-pack="${i}">${i === 3 ? `<span class="pbadge">${tt.best}</span>` : ""}<span class="part">${packArt(i)}</span><b>${tt.packs[i]}</b><span class="pn">${SEED}${p.n.toLocaleString(loc(), NUMG)}</span>${p.b ? `<span class="pb">${tt.bonus(p.b)}</span>` : `<span class="pb"></span>`}<span class="pp">${money(p.p)}</span></button>`).join("")}</div>
  <button class="link" id="closeLayer">${tt.close}</button></div></div>`;
  trackOnce("negozio-tani-aperto"); if (src) trackOnce("negozio-tani-da-" + src);
  if (anim) { G.from(".tshop", { y: 60, opacity: 0, duration: 0.4, ease: "power3.out" }); G.from(".pack", { scale: 0.7, opacity: 0, duration: 0.45, stagger: 0.06, ease: "back.out(2)", delay: 0.1 }); }
}
function fakeDoor(title, text, extra) {
  const t = L(); let gift = "";
  if (!S.fdGift) { S.fdGift = true; S.seeds += FD_GIFT; save(); gift = `<p class="fdgift">${SEED}<b>${esc(t.tani.gift(FD_GIFT))}</b></p>`; }
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="fdT"><div class="box card fdbox"><div class="fdpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div><h2 id="fdT">${esc(title)}</h2><p>${esc(text)}</p>${extra ? `<p><b>${esc(extra)}</b></p>` : ""}${gift}<button class="btn" id="fdOk">${t.ok}</button></div></div>`;
  SND.play("jingle"); SND.haptic([15, 40, 25]); burst("star", 8, document.querySelector(".fdbox"));
  if (anim) G.from(".fdbox", { scale: 0.8, opacity: 0, duration: 0.45, ease: "back.out(2)" });
}

/* --- Tanetto Plus (prova: conta chi si abbonerebbe e regala un giorno di gite) --- */
let plusPlan = "year", plusAfter = null;
function openPlus(src, after) {
  const t = L(); const p = t.plus; plusAfter = after || null;
  const perks = p.perks.map((x, i) => x == null ? "" : `<li><span class="pk">${icon(["p_trip", "p_gift", "p_chat", "p_stats", "p_two", "p_heart"][i])}</span><span>${esc((typeof x === "function" ? x(WORLD.length) : x).replace("{n}", S.petName))}${i === 2 || i === 3 ? ` <em class="soon">${p.soon}</em>` : ""}</span></li>`).join("");
  const perMonthY = PLUS_PRICE.year / 12;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="plT"><div class="box plusbox"><div class="plushead"><div class="plpet">${petSVG(S.pet, "felice", "h_crown", stage(), S.petName)}</div><h2 id="plT">${p.name}</h2><p>${esc(p.tag)}</p></div>
  <ul class="perks">${perks}</ul>
  <div class="plans" role="radiogroup"><button class="plan" role="radio" data-plan="year" aria-checked="${plusPlan === "year"}"><span class="ppop">${p.popular}</span><b>${p.yearly}</b><span>${p.perYear(money(PLUS_PRICE.year))}</span><small>${p.yearNote(money(perMonthY))}${plusSavePct(PLUS_PRICE.year, PLUS_PRICE.month) >= 5 ? ` · ${p.save(plusSavePct(PLUS_PRICE.year, PLUS_PRICE.month))}` : ""}</small></button><button class="plan" role="radio" data-plan="month" aria-checked="${plusPlan === "month"}"><b>${p.monthly}</b><span>${p.perMonth(money(PLUS_PRICE.month))}</span><small>&nbsp;</small></button></div>
  <button class="btn gold block" id="plusGo">${p.trial}</button><p class="small muted" id="plusAfterTxt">${p.after(plusPlan === "year" ? p.perYear(money(PLUS_PRICE.year)) : p.perMonth(money(PLUS_PRICE.month)))}</p>
  <button class="link" id="closeLayer">${t.tani.close}</button></div></div>`;
  trackOnce("plus-aperto"); if (src) trackOnce("plus-da-" + src);
  if (anim) { G.from(".plusbox", { y: 40, opacity: 0, duration: 0.45, ease: "power3.out" }); G.from(".perks li", { x: -20, opacity: 0, duration: 0.35, stagger: 0.05, delay: 0.15 }); }
}

/* --- Gite di Tanetto Plus --- */
function plusSceneSVG(k, o) {
  const d = dims(), TOP = d.top, BOT = d.bot, H = d.H, ph = o.ph, night = ph === "night", eve = ph === "evening";
  const sk = nid("ps"), vg = nid("pv"), sea = nid("pz");
  const skyC = k === "snow" ? (night ? ["#1D2A4D", "#4A5C8C"] : ["#BFDDF2", "#EEF6FB"]) : SKY[ph];
  let s = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(L().scenes2[k])}"><defs><linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${skyC[0]}"/><stop offset="1" stop-color="${skyC[1]}"/></linearGradient><linearGradient id="${sea}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? "#22406A" : "#4FB3D9"}"/><stop offset="1" stop-color="${night ? "#2E5A86" : "#8FD6EC"}"/></linearGradient><radialGradient id="${vg}" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#10180A" stop-opacity="0"/><stop offset="1" stop-color="#10180A" stop-opacity="${night ? 0.45 : 0.18}"/></radialGradient></defs><rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${sk})"/>`;
  if (night) { for (let i = 0; i < 30; i++) s += `<circle class="star" cx="${Math.round(hashN("ps" + i) * 360)}" cy="${Math.round(-TOP + 10 + hashN("pt" + i) * (TOP + 120))}" r="${i % 3 ? 1 : 1.5}" fill="#FFF6D6"/>`; s += `<circle cx="292" cy="${36 - TOP * 0.4}" r="15" fill="#F8F1D4"/>`; }
  else s += `<circle cx="292" cy="${44 - TOP * 0.4}" r="32" fill="${eve ? "#FFB36B" : "#FFE48A"}" opacity=".25"/><circle cx="292" cy="${44 - TOP * 0.4}" r="19" fill="${eve ? "#FFB36B" : "#FFE48A"}"/><g class="cloud">${cloudPuff(80, 50 - TOP * 0.4, 1, 0.9)}</g><g class="cloud2">${cloudPuff(200, 90 - TOP * 0.3, 0.8, 0.85)}</g>`;
  const by = Math.round(300 + Math.max(16, (BOT - 130) * 0.42)); const ext = BOT >= 120;
  if (k === "beach") {
    s += `<rect x="0" y="140" width="360" height="72" fill="url(#${sea})"/><rect x="0" y="140" width="360" height="3" fill="#fff" opacity=".35"/>${[0, 1, 2].map((r) => `<path class="wave" d="M-40 ${160 + r * 16} q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" stroke-width="2" fill="none" opacity="${0.5 - r * 0.12}"/>`).join("")}<path d="M300 150 l14 -26 l14 26 Z" fill="#fff" opacity=".9"/><rect x="312" y="150" width="3" height="10" fill="#8E6440"/>`;
    s += `<path d="M0 206 C80 196 160 210 240 202 C300 196 340 204 360 200 L360 ${300 + BOT} L0 ${300 + BOT} Z" fill="#F2D9A6"/><path d="M0 214 C90 206 170 218 260 210 C310 206 344 212 360 210" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>`;
    for (let i = 0; i < 26; i++) s += `<circle cx="${Math.round(hashN("sd" + i) * 360)}" cy="${Math.round(222 + hashN("se" + i) * (60 + BOT * 0.6))}" r="1.2" fill="#D9B87A"/>`;
    s += `<g transform="translate(300 186)"><path d="M0 0 L0 74" stroke="#8E6440" stroke-width="3"/><path d="M-44 4 Q0 -34 44 4 Z" fill="#E2654F"/><path d="M-22 -14 Q0 -34 0 -34 L-14 4 Z M14 4 L0 -34 Q22 -14 22 -14 Z" fill="#fff" opacity=".9"/></g><rect x="236" y="246" width="70" height="20" rx="3" fill="#7AA3DC" transform="rotate(-6 270 256)"/><rect x="236" y="252" width="70" height="4" fill="#fff" opacity=".6" transform="rotate(-6 270 256)"/>`;
    s += `<g transform="translate(52 238)"><rect x="-22" y="0" width="44" height="22" fill="#E9C98A"/><rect x="-26" y="-12" width="14" height="14" fill="#E9C98A"/><rect x="12" y="-12" width="14" height="14" fill="#E9C98A"/><rect x="-8" y="-20" width="16" height="22" fill="#E9C98A"/><path d="M-8 -20 l8 -10 l8 10 Z" fill="#E2654F"/><rect x="-4" y="10" width="8" height="12" rx="4" fill="#C9A066"/></g>`;
    s += `<path d="M88 270 l3 6 6 1 -4 4 1 6 -6 -3 -6 3 1 -6 -4 -4 6 -1 Z" fill="#F28A3C"/><g transform="translate(150 280)"><path d="M0 0 C-6 -8 6 -8 0 0 Z" fill="#F7A9C0"/><path d="M-8 2 Q0 -12 8 2 Z" fill="#F7C6D4"/></g>`;
    if (ext) s += `<g transform="translate(80 ${by})"><path d="M-14 -20 L14 -20 L10 6 L-10 6 Z" fill="#FFD25E"/><path d="M-12 -20 Q0 -36 12 -20" stroke="#E0A92E" stroke-width="2" fill="none"/><rect x="18" y="-34" width="4" height="36" rx="2" fill="#7AA3DC" transform="rotate(20 20 -16)"/></g><path d="M280 ${by} l4 8 9 1 -6 6 2 9 -9 -4 -8 4 1 -9 -6 -6 9 -1 Z" fill="#E2654F"/>`;
    SCENE_POS.spot = ["shell", 128, 258, 52, 44];
  } else if (k === "camp") {
    const tree = (x, y, sc, c) => `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-4" y="0" width="8" height="18" fill="#5B3A1A"/><path d="M0 -60 L26 0 L-26 0 Z" fill="${c}"/><path d="M0 -84 L20 -36 L-20 -36 Z" fill="${c}"/></g>`;
    s += `<path d="M0 170 C60 140 120 160 180 146 C240 134 300 156 360 140 L360 212 L0 212 Z" fill="${night ? "#1F3A2E" : "#4E7A52"}"/>`;
    [[20, 190, 1, "#2F5E3A"], [70, 196, 0.8, "#3B6E46"], [330, 188, 1.1, "#2F5E3A"], [280, 196, 0.75, "#3B6E46"], [120, 192, 0.6, "#2F5E3A"], [236, 190, 0.6, "#2F5E3A"]].forEach(([x, y, sc, c]) => { s += tree(x, y, sc, night ? "#1C3A26" : c); });
    s += `<rect x="0" y="206" width="360" height="${94 + BOT}" fill="${night ? "#3E5236" : "#7E9E5A"}"/>`;
    for (let i = 0; i < 30; i++) { const x = Math.round(hashN("gx" + i) * 360), y = Math.round(214 + hashN("gy" + i) * (70 + BOT * 0.6)); s += `<path d="M${x} ${y} q2 -6 4 0 q2 -7 4 0" stroke="${night ? "#2E4128" : "#5E8044"}" stroke-width="1.4" fill="none"/>`; }
    s += `<g transform="translate(60 212)"><path d="M0 50 L44 -14 L88 50 Z" fill="#F2A65A"/><path d="M44 -14 L58 50 L30 50 Z" fill="#C8503B"/><path d="M44 -14 L44 50" stroke="#B35B48" stroke-width="2"/><path d="M-4 50 H92" stroke="#6B5A47" stroke-width="3" stroke-linecap="round"/></g>`;
    s += `<g transform="translate(286 258)"><circle cx="0" cy="-14" r="${night ? 46 : 30}" fill="#FFB36B" opacity="${night ? 0.25 : 0.15}"/><rect x="-22" y="-2" width="44" height="7" rx="3.5" fill="#7E5534" transform="rotate(14)"/><rect x="-22" y="-2" width="44" height="7" rx="3.5" fill="#8E6440" transform="rotate(-14)"/><g class="flame" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M0 -38 C12 -24 14 -10 0 0 C-14 -10 -12 -24 0 -38 Z" fill="#F28A3C"/><path d="M0 -26 C7 -18 8 -8 0 -2 C-8 -8 -7 -18 0 -26 Z" fill="#FFD25E"/></g></g>`;
    if (night || eve) for (let i = 0; i < 8; i++) s += `<circle class="mote" cx="${30 + i * 42}" cy="${150 + (i % 3) * 30}" r="2" fill="#E8FF9E"/>`;
    if (ext) s += `<g transform="translate(110 ${by})"><rect x="-26" y="-34" width="52" height="40" rx="12" fill="#5E86C2"/><rect x="-18" y="-22" width="36" height="16" rx="6" fill="#4A6FA8"/><path d="M-20 -34 Q0 -50 20 -34" stroke="#3E5E92" stroke-width="5" fill="none"/></g><g transform="translate(250 ${by})"><rect x="-40" y="-10" width="80" height="12" rx="6" fill="#8E6440"/><circle cx="-40" cy="-4" r="6" fill="#C99A5E"/><circle cx="40" cy="-4" r="6" fill="#C99A5E"/></g>`;
    SCENE_POS.spot = ["fire", 258, 214, 56, 56];
  } else {
    s += `<path d="M0 180 L60 110 L100 150 L160 76 L220 150 L270 104 L360 176 L360 212 L0 212 Z" fill="${night ? "#7C8AA8" : "#C9D6E6"}"/><path d="M160 76 L176 98 L166 96 L156 104 L146 94 L138 100 Z M60 110 L72 124 L62 122 L52 128 Z M270 104 L284 118 L272 116 L262 120 Z" fill="#fff"/>`;
    const pine = (x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="-3" y="0" width="6" height="12" fill="#5B3A1A"/><path d="M0 -54 L22 0 L-22 0 Z" fill="#3B6E46"/><path d="M0 -54 L12 -26 L4 -30 L-4 -24 L-12 -28 Z" fill="#fff"/><path d="M-22 0 L-14 -8 L-6 -2 L2 -8 L10 -2 L22 0 Z" fill="#fff"/></g>`;
    [[24, 204, 1], [64, 206, 0.8], [336, 202, 1.1], [300, 206, 0.7]].forEach(([x, y, sc]) => { s += pine(x, y, sc); });
    s += `<rect x="0" y="204" width="360" height="${96 + BOT}" fill="#F4F7FB"/><path d="M0 204 C90 196 180 210 270 200 C320 196 350 202 360 200" stroke="#DCE5EF" stroke-width="4" fill="none"/>`;
    for (let i = 0; i < 14; i++) s += `<ellipse cx="${Math.round(hashN("nx" + i) * 360)}" cy="${Math.round(220 + hashN("ny" + i) * (60 + BOT * 0.6))}" rx="14" ry="3" fill="#DCE5EF"/>`;
    s += `<g transform="translate(292 230)"><ellipse cx="0" cy="30" rx="26" ry="5" fill="#000" opacity=".1"/><circle cx="0" cy="12" r="20" fill="#fff" stroke="#DCE5EF" stroke-width="2"/><circle cx="0" cy="-18" r="14" fill="#fff" stroke="#DCE5EF" stroke-width="2"/><circle cx="-5" cy="-20" r="1.8" fill="#33302E"/><circle cx="5" cy="-20" r="1.8" fill="#33302E"/><path d="M0 -16 l12 3 l-12 2 Z" fill="#F28A3C"/><path d="M-12 -6 H12" stroke="#E2654F" stroke-width="5" stroke-linecap="round"/><path d="M8 -6 l4 10" stroke="#E2654F" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="6" r="2" fill="#33302E"/><circle cx="0" cy="14" r="2" fill="#33302E"/><path d="M-18 4 L-34 -6 M18 4 L34 -8" stroke="#8E6440" stroke-width="2.4" stroke-linecap="round"/></g>`;
    for (let i = 0; i < 18; i++) s += `<circle class="flake" cx="${Math.round(hashN("fl" + i) * 360)}" cy="${Math.round(-TOP + hashN("fm" + i) * (TOP + 200))}" r="${1.4 + (i % 3) * 0.6}" fill="#fff" opacity=".9"/>`;
    if (ext) s += `<g transform="translate(96 ${by})"><path d="M-36 0 H30 Q40 0 40 -10" stroke="#C8503B" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="-32" y="-14" width="60" height="9" rx="3" fill="#E2654F"/><path d="M-24 -5 V0 M20 -5 V0" stroke="#C8503B" stroke-width="3"/></g>`;
    SCENE_POS.spot = ["snowman", 262, 196, 60, 70];
  }
  s += petGroup(o.e, o.glow);
  if (night && k !== "snow") s += `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="#16204A" opacity=".25" pointer-events="none"/>`;
  return s + `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${vg})" pointer-events="none"/></svg>`;
}

/* --- Chat con il compagno (risposte preparate, nessun messaggio salvato) --- */
let chatLog = [];
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC").replace(/[\u2019`\u00b4]/g, "'");
function kwHit(msg, kw) {
  const k = norm(kw);
  if (/[぀-ヿ㐀-鿿가-힯]/.test(k)) return msg.includes(k);
  const re = new RegExp(`(^|[^\\p{L}])${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${k.length <= 3 ? "($|[^\\p{L}])" : ""}`, "u");
  return re.test(msg);
}
const INTENTS = ["crisis", "bye", "sad", "anxious", "stressed", "tired", "angry", "lonely", "proud", "happy", "thanks", "love", "sleep", "hungry", "drink", "progress", "who", "joke", "help", "bored", "greet"];
function chatReply(raw) {
  const t = L(); const c = t.chat; const msg = norm(raw);
  const intent = INTENTS.find((k) => (c.K[k] || []).some((kw) => kwHit(msg, kw))) || "default";
  if (intent === "crisis") { return { crisis: true, text: c.crisis, lines: t.helpLines || [] }; }
  if (intent === "progress") { const tg = todayGoals(); const d = S.done.filter((g) => tg.includes(g)).length; return { text: c.prog(d, tg.length, streak()) }; }
  if (intent === "who") { let f = (t.snacks && t.snacks[FAV[S.pet]]) || ""; if (S.lang !== "de") f = f.charAt(0).toLowerCase() + f.slice(1); return { text: c.who(S.petName, f) }; }
  return { text: pick(c.R[intent] || c.R.default), intent };
}
function chatBubbles() { return chatLog.map((m) => `<div class="cmsg ${m.me ? "me" : "pet"} ${m.crisis ? "sos" : ""}">${m.lines ? `<p>${esc(m.text)}</p>${m.lines.map((l) => `<p><strong>${l}</strong></p>`).join("")}` : esc(m.text)}</div>`).join(""); }
function openChat() {
  const t = L(); const c = t.chat; if (!chatLog.length) chatLog = [{ me: false, text: c.hello(S.petName) }];
  layer.innerHTML = `<div class="overlay chatwrap" role="dialog" aria-modal="true" aria-labelledby="chT"><div class="chatbox"><div class="chhead"><div class="chpet" id="chPet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><h2 id="chT">${esc(c.T(S.petName))}</h2><button class="iconbtn" id="closeLayer" aria-label="${esc(t.close)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="chlog" id="chLog" aria-live="polite">${chatBubbles()}</div><p class="chnote">${esc(c.note)}</p>
  <form class="chform" id="chForm" autocomplete="off"><input id="chIn" maxlength="300" placeholder="${esc(c.ph)}" aria-label="${esc(c.ph)}"><button class="btn" type="submit" aria-label="${esc(c.send)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12l16-8-6 16-3-7-7-1z"/></svg></button></form></div></div>`;
  const lg = document.getElementById("chLog"); lg.scrollTop = lg.scrollHeight;
  if (anim) G.from(".chatbox", { y: 40, opacity: 0, duration: 0.4, ease: "power3.out" });
  setTimeout(() => { const i = document.getElementById("chIn"); if (i && window.matchMedia("(pointer:fine)").matches) i.focus(); }, 300);
}
let chatBusy = false;
document.addEventListener("submit", (ev) => {
  if (ev.target.id !== "chForm") return; ev.preventDefault();
  const inp = document.getElementById("chIn"); const txt = (inp.value || "").trim(); if (!txt || chatBusy) return;
  const t = L(); inp.value = ""; chatLog.push({ me: true, text: txt }); chatBusy = true;
  const lg = document.getElementById("chLog"); lg.innerHTML = chatBubbles() + `<div class="cmsg pet typing"><i></i><i></i><i></i><span class="sr">${esc(t.chat.typing(S.petName))}</span></div>`; lg.scrollTop = lg.scrollHeight;
  SND.play("tap");
  const r = chatReply(txt); const delay = r.crisis ? 500 : 700 + Math.min(1600, r.text.length * 14);
  setTimeout(() => {
    chatBusy = false; chatLog.push({ me: false, text: r.text, crisis: !!r.crisis, lines: r.crisis ? r.lines : null }); if (chatLog.length > 40) chatLog = chatLog.slice(-40);
    const l2 = document.getElementById("chLog"); if (!l2) return; l2.innerHTML = chatBubbles(); l2.scrollTop = l2.scrollHeight;
    SND.play(r.crisis ? "chime" : "pop"); const p = document.querySelector("#chPet svg"); if (p && anim && !r.crisis) G.fromTo(p, { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    const last = l2.lastElementChild; if (last && anim) G.from(last, { y: 10, opacity: 0, duration: 0.3 });
  }, delay);
});

/* --- Collegamenti: barra in alto, parla, negozio, schermo intero, Altro --- */
const _topBarV9 = topBar;
topBar = function () {
  const t = L(); const h = _topBarV9();
  const from = `<span class="pill" id="seedPill">${SEED}<span id="seedN">${S.seeds}</span><span class="sr">${t.seeds}</span></span>`;
  return h.replace(from, `<button class="pill pillbtn" id="seedPill" aria-label="${esc(t.tani.shopT)}">${SEED}<span id="seedN">${S.seeds}</span><span class="sr">${t.seeds}</span><span class="plusdot" aria-hidden="true">+</span></button>`);
};
const _openTalkV9 = openTalk;
openTalk = function () {
  _openTalkV9(); const t = L(); const box = document.querySelector(".talkbox"); if (!box) return;
  const b = document.createElement("button"); b.className = "btn ghost block"; b.id = "toChat"; b.innerHTML = `${icon("p_chat")}${esc(t.chat.open(S.petName))}`;
  const close = box.querySelector("#closeLayer"); box.insertBefore(b, close);
};
const _viewHomeV9 = viewHome;
viewHome = function () {
  const t = L(); const h = _viewHomeV9();
  const key = `<h1>${t.homeT}</h1>`;
  return h.replace(key, `<div class="homehead">${key}<button class="btn small gold" id="getTani">${SEED}${t.tani.get}</button></div>`);
};
const _tryBarV9 = tryBar;
tryBar = function () {
  const h = _tryBarV9(); if (!h.includes("disabled")) return h;
  const t = L(); return h.replace(/<button class="btn" disabled>([^<]*)<\/button>/, (m, txt) => `<button class="btn gold" id="getTani2">${SEED}${esc(txt)}</button>`);
};
const _viewMoreV9 = viewMore;
viewMore = function () {
  const t = L(); const h = _viewMoreV9();
  const plusCard = `<button class="pluscard" id="plusCard"><span class="pcrown">${icon("p_crown")}</span><span><b>${t.plus.card}</b><small>${t.plus.cardP}</small></span><span class="pchev">›</span></button>`;
  const a11y = `<div class="card stack-s"><h3>${t.a11y.T}</h3><div class="switchrow"><span id="bigL">${t.a11y.big}</span><button class="switch" role="switch" aria-checked="${!!S.big}" aria-labelledby="bigL" id="bigSw"></button></div><div class="switchrow"><span id="calmL">${t.a11y.calm}<br><small class="muted">${t.a11y.calmP}</small></span><button class="switch" role="switch" aria-checked="${!!S.calm}" aria-labelledby="calmL" id="calmSw"></button></div></div>`;
  const key = `<div class="card stack-s" id="dataCard">`;
  let out = h.replace(`${topBar()}<div class="stack">`, `${topBar()}<div class="stack">${plusCard}`);
  return out.includes(key) ? out.replace(key, a11y + key) : out + a11y;
};
const _applyRootV9 = applyRoot;
applyRoot = function () { _applyRootV9(); document.documentElement.classList.toggle("bigtext", !!S.big); const lc = (L().locale || "").slice(0, 2); document.documentElement.classList.toggle("cjk", ["ja", "zh", "ko"].includes(lc)); };

document.addEventListener("click", (ev) => {
  const t = L();
  const bub = ev.target.closest && ev.target.closest("#bubble"); if (bub && tab === "today" && !full && !S.away) { openChat(); return; }
  const b = ev.target.closest("button"); if (!b) return;
  if (b.id === "seedPill" || b.id === "getTani" || b.id === "getTani2") { openTaniShop(b.id === "seedPill" ? "barra" : b.id === "getTani" ? "casetta" : "prova"); return; }
  if (b.dataset.pack !== undefined) { const i = +b.dataset.pack; trackOnce(`interesse-tani-${PACKS[i].n}`); fakeDoor(t.tani.soonT, t.tani.soonP); return; }
  if (b.id === "fdOk" || b.id === "plOk") { layer.innerHTML = ""; const y = window.scrollY; render(); window.scrollTo(0, y); if (plusAfter) { const f = plusAfter; plusAfter = null; f(); } return; }
  if (b.id === "plusCard") { openPlus("altro"); return; }
  if (b.dataset.plan) { plusPlan = b.dataset.plan; document.querySelectorAll(".plan").forEach((x) => x.setAttribute("aria-checked", String(x.dataset.plan === plusPlan))); const p = t.plus; const a = document.getElementById("plusAfterTxt"); if (a) a.textContent = p.after(plusPlan === "year" ? p.perYear(money(PLUS_PRICE.year)) : p.perMonth(money(PLUS_PRICE.month))); SND.play("click"); return; }
  if (b.id === "plusGo") { trackOnce(`interesse-plus-${plusPlan === "year" ? "annuale" : "mensile"}`); S.plusPreview = dkey(); save(); const after = plusAfter; fakeDoor(t.plus.soonT, t.plus.soonP, t.plus.preview); plusAfter = after; return; }
  if (b.id === "toChat") { openChat(); return; }
  if (b.id === "bigSw") { S.big = !S.big; save(); applyRoot(); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "calmSw") { S.calm = !S.calm; save(); setTimeout(() => location.reload(), 250); return; }
});
Object.assign(ICON, {
  p_chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  p_crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  p_trip: '<path d="M3 20l6-12 4 7 3-4 5 9z"/><circle cx="17" cy="6" r="2"/>',
  p_gift: '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M12 9v11M4 13h16M12 9c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1"/>',
  p_stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  p_two: '<rect x="3" y="8" width="12" height="12" rx="2"/><path d="M9 4h10a2 2 0 0 1 2 2v10"/>',
  p_heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>'
});
const _ambientV9 = ambientExtra;
ambientExtra = function (root, q) {
  _ambientV9(root, q); if (!anim) return;
  q(".wave").forEach((w, i) => ambient.push(G.to(w, { x: 40, duration: 3 + i, repeat: -1, ease: "none" })));
  q(".flame").forEach((f) => ambient.push(G.to(f, { scaleY: 0.82, scaleX: 1.08, duration: 0.18, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  const d = dims(); q(".flake").forEach((f, i) => { const tw = G.fromTo(f, { y: 0 }, { y: d.H * 0.6, x: i % 2 ? 14 : -14, duration: 6 + (i % 5), repeat: -1, ease: "none" }); tw.progress((i * 0.17) % 1); ambient.push(tw); });
};
const _topBarV9b = topBar;
topBar = function () { const t = L(); const h = _topBarV9b(); if ((t.level || "").length <= 6) return h; return h.replace(`<span>${t.level} ${S.level}</span>`, `<span><span class="sr">${t.level} </span>${S.level}</span>`); };
