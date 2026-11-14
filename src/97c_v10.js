/* =================== v10: economia, Stagione 0, sentiero, sfide, feste, scudi, resoconto, collezione, giro del mondo =================== */

/* --- Economia: prezzi più alti e rarità --- */
const PRICE_TIER = {
  b: { plant: 80, red: 80, blue: 80, w_sage: 100, frame: 100, rug: 120, curt_green: 120 },
  c: { lamp: 200, shelf: 180, pouf: 220, clock: 250, lights: 300, violet: 150, green: 150, pink: 150, h_party: 180, h_bow: 160, w_rose: 200, w_sky: 200, w_lilac: 200, w_mint: 200, w_peach: 200, curt_blue: 180, curt_lace: 250, cactus: 180, sunflower: 220, books: 200, yarn: 220, rug_blue: 300 },
  r: { lamp_lava: 600, lamp_moon: 750, lanterns: 650, monstera: 500, poster: 550, mirror: 700, shelf_crystals: 800, bunting: 500, guitar: 850, rug_rainbow: 700, rug_sheep: 900, h_frog: 600, h_chef: 550, h_bunny: 650, h_phones: 800, w_check: 600, w_wood: 750, w_clouds: 900 },
  e: { h_wizard: 1800, h_crown: 2500, h_lantern: 1500, lamp_stone: 1600 },
  l: { tree_lights: 4500 }
};
/* Oggetti nuovi della Stagione 0 e della collezione di ottobre */
SHOP.push(
  { id: "h_lantern", kind: "wear", price: 1500 }, { id: "lamp_stone", kind: "furn", price: 1600 }, { id: "tree_lights", kind: "furn", price: 4500 },
  { id: "founder_lantern", kind: "furn", price: 0, reward: true }, { id: "curt_autumn", kind: "furn", price: 0, reward: true }, { id: "rug_autumn", kind: "furn", price: 0, reward: true },
  { id: "w_lanterns", kind: "wall", price: 0, reward: true }, { id: "h_acorn", kind: "wear", price: 0, reward: true }, { id: "rug_moon", kind: "furn", price: 0, reward: true }, { id: "h_lantern_gold", kind: "wear", price: 0, reward: true },
  { id: "h_beret", kind: "wear", price: 0, coll: "2026-10" }, { id: "w_leaves", kind: "wall", price: 0, coll: "2026-10" },
  /* 1.0.9: premi del sentiero della Stagione delle Stelle (sea = "stars": nel negozio compaiono solo durante quella stagione o se li hai gia') */
  { id: "rug_comet", kind: "furn", price: 0, reward: true, sea: "stars" }, { id: "w_constel", kind: "wall", price: 0, reward: true, sea: "stars" },
  { id: "h_starband", kind: "wear", price: 0, reward: true, sea: "stars" }, { id: "h_mooncrown", kind: "wear", price: 0, reward: true, sea: "stars" },
  /* 1.0.9 (fase 2): premi del sentiero della Stagione degli Aquiloni */
  { id: "rug_kite", kind: "furn", price: 0, reward: true, sea: "kites" }, { id: "w_kites", kind: "wall", price: 0, reward: true, sea: "kites" },
  { id: "h_pinwheel", kind: "wear", price: 0, reward: true, sea: "kites" }, { id: "h_kite", kind: "wear", price: 0, reward: true, sea: "kites" }
);
Object.entries(PRICE_TIER).forEach(([tier, m]) => Object.entries(m).forEach(([id, p]) => { const s = SHOP.find((x) => x.id === id); if (s) { s.price = p; s.rar = tier; } }));
SHOP.forEach((s) => { if (s.reward) s.rar = ["h_lantern_gold", "w_lanterns", "h_mooncrown", "h_kite"].includes(s.id) ? "l" : ["rug_moon", "founder_lantern", "w_constel", "h_starband", "w_kites", "h_pinwheel"].includes(s.id) ? "e" : "r"; if (s.coll) s.rar = "e"; });
Object.assign(SLOT, { lamp_stone: "lamp", tree_lights: "plant", founder_lantern: "floorL", curt_autumn: "curtain", rug_autumn: "rug", rug_moon: "rug", rug_comet: "rug", rug_kite: "rug" });
Object.assign(GROUP, { lamp_stone: "lights", tree_lights: "plants", founder_lantern: "floor", curt_autumn: "curtains", rug_autumn: "rugs", rug_moon: "rugs", rug_comet: "rugs", rug_kite: "rugs" });
CURTAINS.curt_autumn = ["#F2A65A", "#D9823A", true];
Object.assign(WALLS, { w_lanterns: ["#3E3866", "#4A4377"], w_leaves: ["#F6E3C8", "#EFD3AE"], w_constel: ["#283260", "#313C6E"], w_kites: ["#CFE7F3", "#BEDDEE"] });
Object.assign(WALL_STYLE, { w_lanterns: "lanterns", w_leaves: "leaves", w_constel: "constel", w_kites: "kites" });
PACKS.splice(0, PACKS.length, { n: 200, p: 0.99, b: 0 }, { n: 1100, p: 4.99, b: 9 }, { n: 2400, p: 9.99, b: 19 }, { n: 5000, p: 19.99, b: 24 });

/* --- Disegni degli oggetti nuovi --- */
/* stella a cinque punte (Stagione delle Stelle) */
function starShape(x, y, s, c, glow) { return `<g transform="translate(${x} ${y}) scale(${s})">${glow ? `<circle r="14" fill="#FFF3C8" opacity=".16"/>` : ""}<path d="M0 -11 L3.2 -3.6 L11 -3.4 L4.9 1.6 L7 9.4 L0 4.9 L-7 9.4 L-4.9 1.6 L-11 -3.4 L-3.2 -3.6 Z" fill="${c}" stroke="#E0A42A" stroke-width=".8" stroke-linejoin="round"/><path d="M-2.4 -4 L0 -8.6 L1 -4.4 Z" fill="#fff" opacity=".55"/></g>`; }
/* aquilone a rombo con le stecche e, se serve, la coda con i fiocchi (Stagione degli Aquiloni) */
function kiteShape(x, y, s, c, tail, c2) {
  const t = tail ? `<path d="M0 18 C-6 25 6 30 0 37 C-6 44 5 49 0 56" stroke="#6B5A47" stroke-width="1.1" fill="none" stroke-linecap="round"/><path d="M-4 26 L0 28.5 L4 26 L0 23.5 Z M-4 40 L0 42.5 L4 40 L0 37.5 Z M-4 53 L0 55.5 L4 53 L0 50.5 Z" fill="${c2 || "#E8603C"}"/>` : "";
  return `<g transform="translate(${x} ${y}) scale(${s})">${t}<path d="M0 -15 L11 0 L0 18 L-11 0 Z" fill="${c}"/><path d="M0 -15 L11 0 L0 0 Z" fill="#fff" opacity=".3"/><path d="M0 0 L-11 0 L0 18 Z" fill="#3A2510" opacity=".12"/><path d="M0 -15 V18 M-11 0 H11" stroke="#fff" stroke-opacity=".7" stroke-width="1.1"/><path d="M0 -15 L11 0 L0 18 L-11 0 Z" fill="none" stroke="#3A2510" stroke-opacity=".22" stroke-width="1"/></g>`;
}
function lanternShape(x, y, s, c, lit) { return `<g transform="translate(${x} ${y}) scale(${s})">${lit ? `<circle cx="0" cy="4" r="18" fill="#FFD27A" opacity=".28"/>` : ""}<rect x="-5" y="-12" width="10" height="3" rx="1" fill="#6B5A47"/><ellipse cx="0" cy="4" rx="11" ry="13" fill="${c}"/><ellipse cx="0" cy="4" rx="5" ry="13" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="1.2"/><ellipse cx="-3.5" cy="0" rx="2.6" ry="4.5" fill="#fff" opacity=".35"/><rect x="-4" y="16" width="8" height="3" rx="1" fill="#6B5A47"/></g>`; }
Object.assign(HAT_ART, {
  h_lantern: (b) => `<path d="M64 ${b + 2} Q100 ${b - 26} 136 ${b + 2}" stroke="#C8503B" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M112 ${b - 12} V${b - 22}" stroke="#6B5A47" stroke-width="2"/>${lanternShape(112, b - 34, 1.05, "#E2654F", true)}<path d="M112 ${b - 14} v6" stroke="#F2B33D" stroke-width="2" stroke-linecap="round"/>`,
  h_lantern_gold: (b) => `<path d="M68 ${b + 6} L68 ${b - 12} L84 ${b - 2} L100 ${b - 18} L116 ${b - 2} L132 ${b - 12} L132 ${b + 6} Z" fill="#F2B33D" stroke="#C9861F" stroke-width="1.6" stroke-linejoin="round"/><rect x="68" y="${b - 1}" width="64" height="7" fill="#E09A25"/><circle cx="100" cy="${b + 2.5}" r="3" fill="#E2454A"/>${lanternShape(68, b - 26, 0.6, "#F28A3C", true)}${lanternShape(100, b - 34, 0.75, "#E2654F", true)}${lanternShape(132, b - 26, 0.6, "#F28A3C", true)}`,
  h_acorn: (b) => `<path d="M60 ${b + 4} C60 ${b - 36} 140 ${b - 36} 140 ${b + 4} Z" fill="#9A6B43"/>${[...Array(6)].map((_, i) => `<path d="M${70 + i * 12} ${b + 2} L${82 + i * 12} ${b - 24}" stroke="#7E5534" stroke-width="2" opacity=".6"/><path d="M${82 + i * 12} ${b + 2} L${70 + i * 12} ${b - 24}" stroke="#7E5534" stroke-width="2" opacity=".6"/>`).join("")}<path d="M60 ${b + 4} C60 ${b - 36} 140 ${b - 36} 140 ${b + 4}" fill="none" stroke="#7E5534" stroke-width="2"/><rect x="56" y="${b - 2}" width="88" height="10" rx="5" fill="#B5875A"/><path d="M100 ${b - 30} C100 ${b - 40} 106 ${b - 44} 112 ${b - 44}" stroke="#7E5534" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="118" cy="${b - 42}" rx="7" ry="3.5" fill="#7FC27B" transform="rotate(-20 118 ${b - 42})"/>`,
  h_starband: (b) => `<path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#3E4A8C" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#7F8CD9" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/><path d="M114 ${b - 12} q-6 -6 0 -12 q6 -6 0 -12" stroke="#B9C2FF" stroke-width="2.2" fill="none" stroke-linecap="round"/>${starShape(114, b - 44, 1.05, "#FFD25E", true)}`,
  h_mooncrown: (b) => `<path d="M66 ${b + 6} L66 ${b - 12} L83 ${b - 2} L100 ${b - 20} L117 ${b - 2} L134 ${b - 12} L134 ${b + 6} Z" fill="#C9D2F2" stroke="#7F8CD9" stroke-width="1.6" stroke-linejoin="round"/><rect x="66" y="${b - 1}" width="68" height="7" fill="#A9B4E6"/><circle cx="84" cy="${b + 2.5}" r="2.6" fill="#6C7BD0"/><circle cx="116" cy="${b + 2.5}" r="2.6" fill="#6C7BD0"/><path d="M93 ${b - 34} a11 11 0 1 0 15 14 a8.5 8.5 0 1 1 -15 -14 Z" fill="#FFE7A0" stroke="#E0A42A" stroke-width="1"/>${starShape(66, b - 16, 0.42, "#FFD25E", false)}${starShape(134, b - 16, 0.42, "#FFD25E", false)}<path d="M70 ${b + 1} h60" stroke="#fff" stroke-width="1.2" opacity=".5"/>`,
  h_pinwheel: (b) => `<path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#2F7035" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#7CC47A" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/><path d="M118 ${b - 13} V${b - 40}" stroke="#8E6440" stroke-width="3" stroke-linecap="round"/><g transform="translate(118 ${b - 44})">${["#E8603C", "#F2B140", "#7CC4EC", "#F29BB8"].map((c, i) => `<path d="M0 0 L0 -15 Q11 -12 0 0 Z" transform="rotate(${i * 90})" fill="${c}"/><path d="M0 0 L0 -15 Q4 -8 0 0 Z" transform="rotate(${i * 90})" fill="#fff" opacity=".35"/>`).join("")}<circle r="2.8" fill="#fff"/><circle r="1.2" fill="#8E6440"/></g>`,
  h_kite: (b) => `<path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#E8603C" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M62 ${b + 4} Q100 ${b - 30} 138 ${b + 4}" stroke="#F7A98F" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/><circle cx="124" cy="${b - 9}" r="3" fill="#F2B140"/><path d="M124 ${b - 11} C134 ${b - 30} 146 ${b - 44} 150 ${b - 60}" stroke="#6B5A47" stroke-width="1.3" fill="none" stroke-linecap="round"/>${kiteShape(152, b - 74, 1.15, "#F2B140", false)}<path d="M152 ${b - 56} C146 ${b - 50} 158 ${b - 46} 152 ${b - 40}" stroke="#6B5A47" stroke-width="1.2" fill="none"/><path d="M148 ${b - 50} L152 ${b - 48} L156 ${b - 50} L152 ${b - 52} Z" fill="#7CC4EC"/><path d="M148 ${b - 42} L152 ${b - 40} L156 ${b - 42} L152 ${b - 44} Z" fill="#E8603C"/>`,
  h_beret: (b) => `<ellipse cx="96" cy="${b - 8}" rx="48" ry="17" fill="#C8503B" transform="rotate(-8 96 ${b - 8})"/><ellipse cx="90" cy="${b - 14}" rx="22" ry="6" fill="#fff" opacity=".15" transform="rotate(-8 90 ${b - 14})"/><path d="M62 ${b + 3} Q100 ${b + 9} 138 ${b + 3}" stroke="#A33F2E" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="96" y="${b - 30}" width="5" height="9" rx="2.5" fill="#A33F2E"/>`
});
Object.assign(HAT_VB, { h_pinwheel: "56 32 92 70", h_kite: "56 2 116 98", h_starband: "56 40 90 70", h_mooncrown: "56 46 88 60", h_lantern: "58 44 88 64", h_lantern_gold: "56 40 88 62", h_acorn: "54 44 96 62", h_beret: "46 56 104 50" });
const _wallPatternV10 = wallPattern;
wallPattern = function (style, w1, w2, top = 0) {
  if (style === "lanterns") { let o = ""; for (let y = -48 * Math.ceil(top / 48) + 18, r = 0; y < 150; y += 48, r++) for (let x = (r % 2) * 30 + 18; x < 360; x += 60) o += `<circle cx="${x}" cy="${y}" r="9" fill="#FFD27A" opacity=".18"/><g class="wlan">${lanternShape(x, y - 2, 0.42, ["#F28A3C", "#E2654F", "#F2B33D"][(x + r) % 3], false)}</g>`; for (let i = 0; i < 24; i++) o += `<circle class="wstar" cx="${(i * 67) % 360}" cy="${-top + ((i * 41) % (150 + top))}" r="1" fill="#FFE7A0" opacity=".7"/>`; return o; }
  if (style === "constel") {
    let o = ""; const C = [[[30, 26], [52, 40], [78, 30], [96, 52]], [[150, 70], [172, 52], [196, 64], [186, 92], [160, 96]], [[262, 30], [286, 46], [312, 34], [330, 58]], [[60, 110], [84, 128], [112, 116]], [[240, 112], [266, 130], [294, 118]]];
    C.forEach((pts) => { o += `<path d="M${pts.map((p) => p.join(" ")).join(" L")}" stroke="#B9C2FF" stroke-width=".9" fill="none" opacity=".45"/>`; pts.forEach(([x, y], i) => { o += `<circle class="wstar" cx="${x}" cy="${y}" r="${i % 2 ? 1.6 : 2.2}" fill="#FFE7A0" opacity=".9"/>`; }); });
    for (let i = 0; i < 30; i++) o += `<circle class="wstar" cx="${(i * 53) % 360}" cy="${-top + ((i * 47) % (150 + top))}" r=".9" fill="#fff" opacity=".55"/>`;
    return o;
  }
  if (style === "kites") {
    let o = ""; const cl = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})" opacity=".85"><ellipse cx="0" cy="0" rx="16" ry="7" fill="#fff"/><ellipse cx="-8" cy="-4" rx="9" ry="7" fill="#fff"/><ellipse cx="7" cy="-5" rx="8" ry="6" fill="#fff"/></g>`;
    for (let y = -46 * Math.ceil(top / 46) + 20, r = 0; y < 150; y += 46, r++) for (let x = (r % 2) * 40 + 20; x < 360; x += 80) o += (x + r) % 3 === 0 ? cl(x, y, 0.8) : kiteShape(x, y - 6, 0.5, ["#E8603C", "#F2B140", "#F29BB8", "#5DAE5A"][(x / 20 + r) % 4 | 0], true, "#2F7035");
    return o;
  }
  if (style === "leaves") { let o = ""; const leaf = (x, y, r, c) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(.55)" d="M0 -12 L3 -5 L10 -7 L6 0 L11 4 L3 5 L2 12 L0 7 L-2 12 L-3 5 L-11 4 L-6 0 L-10 -7 L-3 -5 Z" fill="${c}" opacity=".75"/>`; for (let y = -40 * Math.ceil(top / 40) + 16, r = 0; y < 150; y += 40, r++) for (let x = (r % 2) * 26 + 14; x < 360; x += 52) o += leaf(x, y, (x * 7 + y * 3) % 360, ["#E8742F", "#D9542F", "#F2B33D", "#C98A45"][(x + y) % 4]); return o; }
  return _wallPatternV10(style, w1, w2, top);
};
const _furnAltV10 = furnAlt;
furnAlt = function (slot, furn, lit, lampId) {
  const has = (k) => furn.includes(k); let o = _furnAltV10(slot, furn, lit, lampId);
  if (slot === "rug" && has("rug_autumn")) {
    o += `<ellipse cx="183" cy="273" rx="120" ry="24" fill="#5B3A1A" opacity=".12"/><ellipse cx="180" cy="268" rx="120" ry="24" fill="#D9823A"/><ellipse cx="180" cy="268" rx="104" ry="19" fill="#E8A35A"/><ellipse cx="180" cy="268" rx="104" ry="19" fill="none" stroke="#FFF1D2" stroke-width="2.4" stroke-dasharray="3 7" stroke-linecap="round"/>`;
    [[120, 266, 20, "#C8503B"], [160, 276, -30, "#F2B33D"], [205, 262, 60, "#C8503B"], [242, 272, -10, "#8E5129"], [180, 266, 0, "#FFF1D2"]].forEach(([x, y, r, c]) => { o += `<path transform="translate(${x} ${y}) rotate(${r}) scale(.75) scale(1 .55)" d="M0 -12 L3 -5 L10 -7 L6 0 L11 4 L3 5 L2 12 L0 7 L-2 12 L-3 5 L-11 4 L-6 0 L-10 -7 L-3 -5 Z" fill="${c}"/>`; });
  }
  if (slot === "rug" && has("rug_kite")) {
    o += `<ellipse cx="183" cy="273" rx="120" ry="24" fill="#5B3A1A" opacity=".12"/><ellipse cx="180" cy="268" rx="120" ry="24" fill="#7CC4EC"/><ellipse cx="180" cy="268" rx="106" ry="19.5" fill="#A6D8F2"/><ellipse cx="180" cy="268" rx="106" ry="19.5" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 6" stroke-linecap="round"/>`;
    [[126, 266, "#E8603C"], [180, 268, "#F2B140"], [234, 266, "#F29BB8"]].forEach(([x, y, c]) => { o += `<g transform="translate(${x} ${y}) scale(1 .55)">${kiteShape(0, -2, 0.85, c, false)}</g>`; });
    o += `<path d="M108 274 Q150 284 196 276 Q232 270 254 278" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8"/>`;
  }
  if (slot === "rug" && has("rug_moon")) {
    o += `<ellipse cx="183" cy="273" rx="120" ry="24" fill="#5B3A1A" opacity=".12"/><ellipse cx="180" cy="268" rx="120" ry="24" fill="#2E3A6B"/><ellipse cx="180" cy="268" rx="110" ry="21" fill="none" stroke="#F2B33D" stroke-width="2.4"/><path d="M166 260 a12 9 0 1 0 22 10 a9 7 0 1 1 -22 -10 Z" fill="#F8F1D4"/>`;
    [[110, 266], [134, 278], [230, 262], [252, 276], [210, 280], [148, 258]].forEach(([x, y], i) => { o += `<path d="M${x} ${y - 4} L${x + 1.2} ${y - 1.2} L${x + 4} ${y} L${x + 1.2} ${y + 1.2} L${x} ${y + 4} L${x - 1.2} ${y + 1.2} L${x - 4} ${y} L${x - 1.2} ${y - 1.2} Z" fill="#FFE7A0" opacity="${0.6 + (i % 3) * 0.15}"/>`; });
  }
  if (slot === "rug" && has("rug_comet")) {
    o += `<ellipse cx="183" cy="273" rx="120" ry="24" fill="#5B3A1A" opacity=".12"/><ellipse cx="180" cy="268" rx="120" ry="24" fill="#283260"/><ellipse cx="180" cy="268" rx="108" ry="20" fill="none" stroke="#B9C2FF" stroke-width="1.6" stroke-dasharray="2 6" stroke-linecap="round"/>`;
    o += `<path d="M118 276 Q160 270 206 262" stroke="#FFE7A0" stroke-width="5" fill="none" stroke-linecap="round" opacity=".35"/><path d="M132 280 Q170 274 206 264" stroke="#FFD25E" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/>`;
    o += `<g transform="translate(214 262) scale(1 .62)">${starShape(0, 0, 0.95, "#FFD25E", true)}</g>`;
    [[104, 266], [138, 258], [250, 272], [262, 260], [156, 282], [232, 282]].forEach(([x, y], i) => { o += `<circle cx="${x}" cy="${y}" r="${i % 2 ? 1.4 : 2}" fill="#FFE7A0" opacity=".8"/>`; });
  }
  if (slot === "lamp" && has("lamp_stone")) {
    if (lit && lampId) o += `<circle cx="45" cy="214" r="50" fill="url(#${lampId})"/>`;
    o += `<g><ellipse cx="45" cy="262" rx="24" ry="5" fill="#000" opacity=".14"/><rect x="28" y="250" width="34" height="10" rx="2" fill="#A8A29A"/><rect x="38" y="228" width="14" height="24" fill="#B9B3AA"/><rect x="30" y="222" width="30" height="7" rx="2" fill="#A8A29A"/><rect x="33" y="204" width="24" height="19" rx="2" fill="#B9B3AA"/><rect x="38" y="208" width="14" height="11" rx="1.5" fill="${lit ? "#FFE3A3" : "#5E574E"}"/><path d="M24 205 Q45 190 66 205 Z" fill="#9C958C"/><circle cx="45" cy="192" r="3.5" fill="#9C958C"/><path d="M30 252 h30" stroke="#fff" stroke-width="1.4" opacity=".3"/></g>`;
  }
  if (slot === "plant" && has("tree_lights")) {
    o += `<g class="plantg" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M320 140 L346 210 L294 210 Z" fill="#3B6E46"/><path d="M320 140 L338 182 L302 182 Z" fill="#4E8A55"/><path d="M320 132 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 Z" fill="#FFD25E"/><path d="M300 170 Q320 180 340 168 M296 196 Q320 208 344 194" stroke="#6B5A47" stroke-width="1" fill="none"/>${[[304, 172, "#FFB36B"], [318, 176, "#9EE3C5"], [334, 170, "#F9A3C0"], [300, 198, "#FFD25E"], [314, 203, "#9CC8F7"], [328, 202, "#FFB36B"], [342, 196, "#9EE3C5"]].map(([x, y, c]) => `<circle class="bulb" cx="${x}" cy="${y}" r="3" fill="${c}"/>${lit ? `<circle cx="${x}" cy="${y}" r="8" fill="${c}" opacity=".25"/>` : ""}`).join("")}</g>` + potSVG("#C86E5A", "#B35B48", `<rect x="304" y="228" width="33" height="3" fill="#F2B33D" opacity=".8"/>`);
  }
  if (slot === "floorL" && has("founder_lantern")) {
    o += `<g><ellipse cx="97" cy="268" rx="24" ry="5" fill="#000" opacity=".14"/>${lit ? `<circle cx="97" cy="218" r="38" fill="#FFD27A" opacity=".3"/>` : `<circle cx="97" cy="218" r="26" fill="#FFD27A" opacity=".15"/>`}<rect x="94" y="234" width="6" height="32" fill="#C9861F"/><rect x="84" y="262" width="26" height="6" rx="2" fill="#C9861F"/><path d="M80 236 L114 236 L110 206 L84 206 Z" fill="#FFE3A3" stroke="#C9861F" stroke-width="3" stroke-linejoin="round"/><path d="M97 206 V236 M82 221 H112" stroke="#C9861F" stroke-width="1.6" opacity=".6"/><path d="M78 206 L97 192 L116 206 Z" fill="#F2B33D" stroke="#C9861F" stroke-width="2" stroke-linejoin="round"/><path d="M97 182 l2.4 5 5.4.6 -4 3.6 1.1 5.3 -4.9 -2.7 -4.9 2.7 1.1 -5.3 -4 -3.6 5.4 -.6 Z" fill="#FFD25E"/></g>`;
  }
  return o;
};
Object.assign(ALT_VB, { rug_kite: "54 240 256 56", rug_comet: "54 240 256 56", rug_autumn: "54 240 256 56", rug_moon: "54 240 256 56", lamp_stone: "16 186 60 80", tree_lights: "286 124 70 130", founder_lantern: "66 176 62 96" });

/* --- Stagioni --- */
const ldate = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
/* 1.0.9: registro delle stagioni. Dopo l'ultima voce non si resta mai senza sentiero: torna la Stagione delle Stelle,
   un trimestre alla volta (mar-mag, giu-ago, set-nov, dic-feb), con un id nuovo (premi nuovi da ritirare). Cosi' la fila
   d'oro di Plus, le Scintille e la settimana di festa restano vere anche per chi non aggiorna l'app.
   kind = aspetto e premi (lanterns / stars); tiers = tappe; story = chiave delle lettere (le lettere si leggono una volta). */
const SEASONS = [{ id: "lanterns", kind: "lanterns", zero: true, start: "2026-10-03", end: "2026-12-31", tiers: 50 },
  { id: "stars27", kind: "stars", v21: true, start: "2027-01-01", end: "2027-02-28", tiers: 35, story: "stars" },
  /* 1.0.9 (fase 2): Stagione degli Aquiloni (cosi' a marzo il ritorno delle Stelle non regala il cappello di neve) */
  { id: "kites27", kind: "kites", v21: true, start: "2027-03-01", end: "2027-05-31", tiers: 50, story: "kites" }];
const seaNext = (k) => { const d = ldate(k); d.setDate(d.getDate() + 1); return dkey(d); };
function seaQuarter(k) {
  const [y, m] = k.split("-").map(Number); const q0 = m >= 3 && m <= 5 ? 3 : m >= 6 && m <= 8 ? 6 : m >= 9 && m <= 11 ? 9 : 12; const sy = q0 === 12 && m < 3 ? y - 1 : y;
  return { start: dkey(new Date(sy, q0 - 1, 1)), end: dkey(new Date(sy, q0 + 2, 0)) };
}
function seasonAt(k) {
  const r = SEASONS.find((x) => k >= x.start && k <= x.end); if (r) return r;
  const last = SEASONS[SEASONS.length - 1]; if (k <= last.end) return null;
  const q = seaQuarter(k); const start = q.start <= last.end ? seaNext(last.end) : q.start;
  const days = Math.round((ldate(q.end) - ldate(start)) / 86400000) + 1;
  /* dicembre-febbraio: tornano le Stelle; marzo-novembre: tornano gli Aquiloni (il cappello di stagione segue la stagione del posto) */
  const kind = q.start.slice(5, 7) === "12" ? "stars" : "kites";
  return { id: kind + "-" + start, kind, v21: true, rerun: true, start, end: q.end, tiers: Math.max(20, Math.min(50, Math.round(days * 50 / 90))), story: kind };
}
const seaCache = { d: "", se: null };
const curSeason = () => { const d = dkey(); if (seaCache.d !== d) { seaCache.d = d; seaCache.se = seasonAt(d); } return seaCache.se; };
const seaTiers = (se) => (se && se.tiers) || 50;
const seaKind = (se) => (se && se.kind) || "lanterns";
const seaName = (se) => { const t = L(); const k = seaKind(se); return k === "stars" ? t.v21.starsName : k === "kites" ? t.kites.name : ((t.season.names || {})[se.id] || (t.season.names || {}).lanterns || ""); };
/* testi del capitolo (lago/prato, desideri, annuncio) e icona, per tipo di stagione */
const seaTx = (se) => { const t = L(); return seaKind(se) === "kites" ? Object.assign({}, t.v21, t.kites, { starsName: t.kites.name }) : t.v21; };
const seaIcon = (se) => { const k = seaKind(se); return k === "stars" ? "p_star" : k === "kites" ? "p_kite" : "p_lantern"; };
/* cappello di stagione del sentiero ("@hat"): segue la stagione del posto (emisfero dal telefono) a meta' capitolo */
function seaHat(se) {
  const d = ldate(se.start); d.setDate(d.getDate() + 20); let m = d.getMonth(); if (seaHemi() === "S") m = (m + 6) % 12;
  return m >= 2 && m <= 4 ? "s_spring" : m >= 5 && m <= 7 ? "s_summer" : m >= 8 && m <= 10 ? "s_autumn" : "s_winter";
}
const SFREE = { 5: { item: "founder_lantern" }, 10: { item: "curt_autumn" }, 15: { shield: 1 }, 20: { item: "rug_autumn" }, 25: { tani: 250 }, 30: { item: "s_autumn" }, 35: { shield: 1 }, 40: { tani: 400 }, 45: { tani: 300 }, 50: { item: "w_lanterns" } };
const SGOLD = { 1: { tani: 150 }, 5: { shield: 1 }, 10: { item: "h_acorn" }, 15: { tani: 300 }, 20: { item: "rug_moon" }, 25: { shield: 2 }, 30: { tani: 600 }, 35: { tani: 400 }, 40: { shield: 2 }, 45: { tani: 500 }, 50: { item: "h_lantern_gold" } };
/* Premi per tipo di stagione. Le tappe con premi speciali sono scritte per "tiers" tappe e si spostano in proporzione
   se una stagione ne ha un numero diverso (es. il ritorno delle Stelle con 50 tappe). Nelle stagioni che ritornano, un
   oggetto che hai gia' diventa Tani'. SEA_DEF = premio delle tappe normali (lo regola l'economia, 98e). */
const SEA_REW = {
  lanterns: { tiers: 50, f: SFREE, g: SGOLD },
  stars: { tiers: 35,
    f: { 5: { item: "rug_comet" }, 10: { item: "@hat" }, 15: { shield: 1 }, 20: { tani: 60 }, 25: { item: "w_constel" }, 30: { shield: 1 }, 35: { tani: 100 } },
    g: { 1: { tani: 40 }, 5: { shield: 1 }, 10: { item: "h_starband" }, 15: { tani: 80 }, 20: { shield: 1 }, 25: { tani: 150 }, 30: { shield: 2 }, 35: { item: "h_mooncrown" } } },
  /* 1.0.9 (fase 2): Aquiloni, 50 tappe, stessa densita' di Tanì delle Stelle (l'economia resta nella fascia 70-90 al giorno) */
  kites: { tiers: 50,
    f: { 7: { item: "rug_kite" }, 14: { item: "@hat" }, 21: { shield: 1 }, 29: { tani: 70 }, 36: { item: "w_kites" }, 43: { shield: 1 }, 50: { tani: 130 } },
    g: { 1: { tani: 50 }, 7: { shield: 1 }, 14: { item: "h_pinwheel" }, 21: { tani: 100 }, 29: { shield: 1 }, 36: { tani: 185 }, 43: { shield: 2 }, 50: { item: "h_kite" } } }
};
/* def = premio delle tappe normali di quel tipo di stagione, own = Tanì al posto di un oggetto gia' tuo (f, g); li regola l'economia (98e) */
const SEA_DEF = { f: 30, g: 60 };
function seaTable(se, track) {
  const R = SEA_REW[seaKind(se)] || SEA_REW.lanterns; const n = seaTiers(se); const hat = Object.values(R[track]).some((r) => r && r.item === "@hat");
  if (n === R.tiers && !hat) return R[track];
  se._rw = se._rw || {}; if (se._rw[track]) return se._rw[track];
  const o = {}; Object.keys(R[track]).forEach((k) => { const r = R[track][k]; o[Math.max(1, Math.min(n, Math.round((+k * n) / R.tiers)))] = r && r.item === "@hat" ? { item: seaHat(se), hat: true } : r; }); return (se._rw[track] = o);
}
function sReward(track, n, se) {
  se = se || curSeason(); const R = SEA_REW[seaKind(se)] || {}; const tr = track === "f" ? "f" : "g";
  const r = (se && seaTable(se, track)[n]) || { tani: (R.def || SEA_DEF)[tr] };
  /* oggetto gia' tuo (nei ritorni, o il cappello di stagione che potresti avere da prima): al suo posto dei Tanì */
  if (se && (se.rerun || r.hat) && r.item && S.owned.includes(r.item) && !sClaims(se)[track].includes(n)) return { tani: (R.own || [100, 150])[tr === "f" ? 0 : 1] };
  return r;
}
/* 1.0.9: nel negozio un oggetto di stagione (cappelli delle feste di una volta, premi dei sentieri) si vede solo se e' tuo
   o se si puo' vincere adesso, nel sentiero della stagione in corso. Cosi' non si promette mai un oggetto che non si puo' avere. */
function seaItemNow(id, se) { se = se || curSeason(); return !!se && ["f", "g"].some((tr) => Object.values(seaTable(se, tr)).some((r) => r && r.item === id)); }
let seaItemsAll = null;
function seaShopOk(s) {
  if (ownsItem(s)) return true;
  if (!seaItemsAll) { seaItemsAll = new Set(SEASON_ITEMS); Object.values(SEA_REW).forEach((R) => ["f", "g"].forEach((tr) => Object.values(R[tr]).forEach((r) => { if (r && r.item && r.item !== "@hat") seaItemsAll.add(r.item); }))); }
  return !(seaItemsAll.has(s.id) || s.sea) || seaItemNow(s.id);
}
const seaBig = (se, n) => !!(seaTable(se, "f")[n] || seaTable(se, "g")[n]);
function isFesta(day) { return +day.slice(8, 10) <= 7; }
function weekKey(d = new Date()) { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dkey(x); }
function passi(se) {
  se = se || curSeason(); if (!se) return 0; let p = 0;
  (S.log || []).forEach((x) => { if (x.d >= se.start && x.d <= se.end) p += 10 * (isFesta(x.d) ? 2 : 1); });
  Object.keys(S.days || {}).forEach((k) => { const r = S.days[k]; if (k >= se.start && k <= se.end && r.total > 0 && r.done >= r.total) p += 20 * (isFesta(k) ? 2 : 1); });
  Object.keys(S.wkc || {}).forEach((k) => { if (S.wkc[k] && k >= weekKey(ldate(se.start)) && k <= se.end) p += 100; });
  return p;
}
const sTier = (p, se) => Math.min(seaTiers(se || curSeason()), Math.floor(p / 100));
function sClaims(se) { S.spc = S.spc || {}; S.spc[se.id] = S.spc[se.id] || { f: [], g: [] }; return S.spc[se.id]; }
function unclaimed(se) { const tier = sTier(passi(se), se); const c = sClaims(se); let n = 0; for (let i = 1; i <= tier; i++) { if (!c.f.includes(i)) n++; if (plusActive() && !c.g.includes(i)) n++; } return n; }
function rewardLabel(r) { const t = L().season; if (r.tani) return t.tani(r.tani); if (r.shield) return t.shield(r.shield); return L().items[r.item] || r.item; }
function rewardArt(r) { if (r.tani) return `<span class="rwi">${SEED}</span>`; if (r.shield) return `<span class="rwi shield">${icon("p_shield")}</span>`; return `<span class="rwi it">${itemArt(r.item)}</span>`; }
function giveReward(r) { if (r.tani) S.seeds += r.tani; if (r.shield) S.shields = (S.shields || 0) + r.shield; if (r.item && !S.owned.includes(r.item)) S.owned.push(r.item); }
function daysLeft(se) { const [y, m, d] = se.end.split("-").map(Number); const e = new Date(y, m - 1, d); const n = new Date(); n.setHours(0, 0, 0, 0); return Math.max(0, Math.round((e - n) / 86400000) + 1); }
function seasonBanner(se, big) {
  if (seaKind(se) === "stars") return starsBanner(big);
  if (seaKind(se) === "kites") return kitesBanner(big);
  return `<svg viewBox="0 0 320 ${big ? 120 : 90}" aria-hidden="true"><defs><linearGradient id="sbg${big ? 1 : 0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E3470"/><stop offset="1" stop-color="#8A5C8C"/></linearGradient></defs><rect width="320" height="${big ? 120 : 90}" fill="url(#sbg${big ? 1 : 0})"/>${[...Array(18)].map((_, i) => `<circle cx="${(i * 61) % 320}" cy="${(i * 37) % 60}" r="${i % 3 ? 0.8 : 1.3}" fill="#fff" opacity=".7"/>`).join("")}<path d="M0 ${big ? 98 : 72} Q80 ${big ? 86 : 62} 160 ${big ? 94 : 70} T320 ${big ? 90 : 66} V${big ? 120 : 90} H0 Z" fill="#3B3F6E"/>${[[40, 40, 0.9], [92, 22, 0.7], [150, 48, 1.1], [205, 18, 0.8], [262, 38, 1], [300, 14, 0.6], [120, 70, 0.6], [236, 66, 0.55]].slice(0, big ? 6 : 8).map(([x, y, s], i) => `<g class="slant">${lanternShape(x, y, s, ["#F28A3C", "#E2654F", "#F2B33D"][i % 3], true)}</g>`).join("")}</svg>`;
}
function starsBanner(big) {
  const h = big ? 120 : 90, gid = nid("ssb");
  let s = `<svg viewBox="0 0 320 ${h}" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141C46"/><stop offset="1" stop-color="#3E4A8C"/></linearGradient></defs><rect width="320" height="${h}" fill="url(#${gid})"/>`;
  for (let i = 0; i < 26; i++) s += `<circle cx="${(i * 61 + 17) % 320}" cy="${(i * 29) % (h - 24)}" r="${i % 4 ? 0.8 : 1.4}" fill="#fff" opacity="${i % 3 ? 0.55 : 0.85}"/>`;
  s += `<path d="M96 ${h * 0.08} L176 ${h * 0.3}" stroke="#FFE7A0" stroke-width="2.4" stroke-linecap="round" opacity=".35"/><path d="M128 ${h * 0.17} L176 ${h * 0.3}" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>`;
  s += `<path d="M262 ${h * 0.16} a17 17 0 1 0 22 22 a13 13 0 1 1 -22 -22 Z" fill="#FFF3C8"/>`;
  s += `<path d="M0 ${h - 18} Q80 ${h - 30} 160 ${h - 20} T320 ${h - 24} V${h} H0 Z" fill="#232C5E"/>`;
  /* stelle lontane dall'angolo in basso a sinistra, dove stanno nome e giorni rimasti */
  [[178, h * 0.3, 0.9], [226, h * 0.56, 0.6], [292, h * 0.66, 0.5], [40, h * 0.14, 0.45], [258, h * 0.24, 0.42]].forEach(([x, y, k]) => { s += `<g class="slant">${starShape(x, y, k, "#FFD25E", true)}</g>`; });
  return s + `</svg>`;
}
/* cielo di primavera con aquiloni e nuvole; in basso a sinistra (dove stanno nome e giorni rimasti) solo cielo e prato */
function kitesBanner(big) {
  const h = big ? 120 : 90, gid = nid("ksb");
  let s = `<svg viewBox="0 0 320 ${h}" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A6A98"/><stop offset="1" stop-color="#5BA6D6"/></linearGradient></defs><rect width="320" height="${h}" fill="url(#${gid})"/>`;
  s += `<circle cx="282" cy="${h * 0.2}" r="13" fill="#FFE7A0" opacity=".9"/><circle cx="282" cy="${h * 0.2}" r="22" fill="#FFE7A0" opacity=".18"/>`;
  [[60, h * 0.18, 1], [214, h * 0.5, 0.8]].forEach(([x, y, k]) => { s += `<g transform="translate(${x} ${y}) scale(${k})" opacity=".9"><ellipse cx="0" cy="0" rx="22" ry="8" fill="#fff"/><ellipse cx="-10" cy="-5" rx="12" ry="9" fill="#fff"/><ellipse cx="9" cy="-6" rx="11" ry="8" fill="#fff"/></g>`; });
  s += `<path d="M0 ${h - 16} Q90 ${h - 30} 170 ${h - 18} T320 ${h - 22} V${h} H0 Z" fill="#3E7E46"/><path d="M0 ${h - 8} Q110 ${h - 20} 210 ${h - 10} T320 ${h - 12} V${h} H0 Z" fill="#2F6B39"/>`;
  [[176, h * 0.32, 0.9, "#E8603C"], [238, h * 0.22, 0.65, "#F2B140"], [292, h * 0.52, 0.55, "#F29BB8"]].forEach(([x, y, k, c]) => { s += `<g class="slant">${kiteShape(x, y, k, c, true, "#FFE7A0")}</g>`; });
  return s + `</svg>`;
}
function seasonCard() {
  const se = curSeason(); if (!se) return ""; const t = L().season; const p = passi(se), tier = sTier(p, se), u = unclaimed(se), N = seaTiers(se);
  const into = tier >= N ? 100 : p % 100;
  return `<button class="seacard" id="openPath"><span class="seaart">${seasonBanner(se)}</span><span class="seatx"><small>${se.zero ? t.zero : ""} · ${t.left(daysLeft(se))}</small><b>${esc(seaName(se))}</b><span class="seabar"><i style="width:${into}%"></i></span><span class="seameta"><span>${t.tier(tier)}</span>${u ? `<em>${t.toClaim(u)}</em>` : `<span>${t.passi(p)}</span>`}</span></span></button>`;
}
function openPath() {
  const se = curSeason(); if (!se) return; const t = L().season; const p = passi(se), tier = sTier(p, se), c = sClaims(se); const plus = plusActive(); const N = seaTiers(se);
  const rows = []; for (let n = 1; n <= N; n++) {
    const fr = sReward("f", n, se), gr = sReward("g", n, se); const reached = n <= tier; const big = seaBig(se, n);
    const cell = (tr, r) => { const done = c[tr].includes(n); const can = reached && !done && (tr === "f" || plus); const lockG = tr === "g" && !plus; return `<div class="pcell ${tr} ${done ? "done" : ""} ${can ? "can" : ""} ${lockG ? "lockg" : ""}">${rewardArt(r)}<span class="pl">${esc(rewardLabel(r))}</span>${can ? `<button class="btn small ${tr === "g" ? "gold" : ""}" data-claim="${tr}${n}">${t.claim}</button>` : done ? `<span class="pdone">${icon("check")}${t.claimed}</span>` : lockG ? (n === 1 ? `<button class="plk" data-golock="1" aria-label="${esc(t.goldLock)}">${icon("p_crown")}</button>` : `<button class="plk" data-golock="1" tabindex="-1" aria-hidden="true">${icon("p_crown")}</button>`) : ""}</div>`; };
    rows.push(`<div class="prow ${reached ? "reached" : ""} ${big ? "big" : ""} ${n === tier + 1 ? "nextrow" : ""}" id="prow${n}">${cell("f", fr)}<div class="pnode"><span>${n}</span></div>${cell("g", gr)}</div>`);
  }
  const into = tier >= N ? 100 : p % 100;
  const founder = seaKind(se) === "lanterns" && S.owned.includes("founder_lantern") ? `<p class="founder">${icon("p_star")}<b>${t.founder}</b> · ${t.founderP}</p>` : "";
  layer.innerHTML = `<div class="overlay pathwrap" role="dialog" aria-modal="true" aria-labelledby="paT"><div class="pathbox"><div class="pathhead">${seasonBanner(se, true)}<div class="phx"><small>${se.zero ? t.zero : ""} · ${t.left(daysLeft(se))}</small><h2 id="paT">${esc(seaName(se))}</h2></div><button class="iconbtn" id="closeLayer" aria-label="${esc(L().close)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="pathsum"><div class="hd"><b>${t.tier(tier, N)}</b><span>${t.passi(p)}</span></div><div class="seabar"><i style="width:${into}%"></i></div><p class="small muted">${tier < N ? t.next(100 - (p % 100)) : ""}</p><p class="small">${t.how}</p>${founder}</div>
  <div class="pathcols"><span>${t.free}</span><span></span><span class="gcol">${icon("p_crown")}${t.gold}</span></div><div class="pathlist" id="pathList" tabindex="0" role="region" aria-label="${esc(t.pathT || seaName(se))}">${rows.join("")}</div></div></div>`;
  trackOnce("sentiero-aperto");
  setTimeout(() => { const r = document.getElementById("prow" + Math.max(1, Math.min(N, tier))); const l = document.getElementById("pathList"); if (r && l) l.scrollTop = r.offsetTop - l.offsetTop - 80; }, 30);
  if (anim) G.from(".pathbox", { y: 40, opacity: 0, duration: 0.4, ease: "power3.out" });
}
function claimReward(code) {
  const se = curSeason(); if (!se) return; const tr = code[0], n = +code.slice(1); const c = sClaims(se); const tier = sTier(passi(se), se);
  if (n > tier || c[tr].includes(n) || (tr === "g" && !plusActive())) return;
  const r = sReward(tr, n, se); giveReward(r); c[tr].push(n); save(); trackOnce(`premio-${tr}${n}`);
  const l = document.getElementById("pathList"); const y = l ? l.scrollTop : 0; openPath(); const l2 = document.getElementById("pathList"); if (l2) l2.scrollTop = y;
  toast(L().season.got(rewardLabel(r))); SND.play(r.item ? "fanfare" : "coin"); SND.haptic([15, 40, 20]);
  const cell = document.querySelector(`#prow${n} .pcell.${tr}`); if (cell) burst("star", 10, cell);
}

/* --- Storia della stagione nelle lettere --- */
const CHAP_AT = [0, 8, 16, 24, 32, 40];
/* lettere della stagione: le Lanterne ne hanno 6, le Stelle 4 (lette una volta sola, anche se la stagione ritorna) */
function seaStory(se) {
  const t = L(); if (seaKind(se) === "stars") { const N = seaTiers(se); return { key: se.story || "stars", at: [0, 0.29, 0.57, 0.86].map((x) => Math.round(x * N)), text: t.v21.story, title: t.v21.chapT, cls: "starpaper" }; }
  if (seaKind(se) === "kites") { const N = seaTiers(se); return { key: "kites", at: [0, 0.29, 0.57, 0.86].map((x) => Math.round(x * N)), text: t.kites.story, title: t.kites.chapT, cls: "kitepaper" }; }
  return { key: se.id, at: CHAP_AT, text: t.season.story, title: t.season.chapterT, cls: "lanternpaper" };
}
const _openLetterV10 = openLetter;
openLetter = function () {
  const se = curSeason(); if (se) {
    const tier = sTier(passi(se), se); S.chap = S.chap || {}; const st = seaStory(se); const read = S.chap[st.key] || 0; const t = L();
    if (read < st.at.length && tier >= st.at[read] && st.text[read]) {
      const txt = st.text[read].split("{n}").join(S.petName); S.chap[st.key] = read + 1; save();
      layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="lT"><div class="box"><div class="paper ${st.cls}"><h2 id="lT">${esc(st.title(read + 1))}</h2><p class="lt" id="ltxt">${esc(txt)}</p><p class="sign">${esc(t.letterSign(S.petName))}</p><div class="lpet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div></div><button class="btn" id="closeLetter">${t.ok}</button></div></div>`;
      SND.play("paper"); trackOnce("capitolo-" + (read + 1));
      if (anim) { G.from(".paper", { scale: 0.6, rotation: -6, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }); G.from("#ltxt", { opacity: 0, y: 8, duration: 0.6, delay: 0.35 }); }
      return;
    }
  }
  _openLetterV10();
};

/* --- Sfida della settimana --- */
function weekChallenge() {
  const wk = weekKey(); const idx = Math.round(new Date(wk).getTime() / 604800000) % 4; const t = L().wk;
  const start = wk, endD = ldate(wk); endD.setDate(endD.getDate() + 6); const end = dkey(endD);
  const log = (S.log || []).filter((x) => x.d >= start && x.d <= end); const days = Object.keys(S.days || {}).filter((k) => k >= start && k <= end);
  let goal, have, text;
  if (idx === 0) { goal = 20; have = log.length; text = t.goals(goal); }
  else if (idx === 1) { goal = 5; const cnt = {}; log.forEach((x) => { cnt[x.d] = (cnt[x.d] || 0) + 1; }); have = Object.values(cnt).filter((v) => v >= 2).length; text = t.days(goal); }
  else if (idx === 2) { goal = 3; have = days.filter((k) => S.days[k].total > 0 && S.days[k].done >= S.days[k].total).length; text = t.full(goal); }
  else { const cats = {}; (S.goals || []).forEach((g) => { const c = goalCat(g.id); cats[c] = (cats[c] || 0) + 1; }); const cat = Object.keys(cats).sort((a, b) => cats[b] - cats[a])[0] || "body"; goal = 8; have = log.filter((x) => goalCat(x.g) === cat).length; text = t.cat(goal, L().cats[cat]); }
  const left = Math.max(1, Math.round((endD - ldate(dkey())) / 86400000) + 1);
  return { wk, goal, have: Math.min(have, goal), text, left, done: have >= goal, claimed: !!(S.wkc && S.wkc[wk]) };
}
function challengeCard() {
  const c = weekChallenge(); const t = L().wk; const pct = Math.round((c.have / c.goal) * 100);
  return `<div class="card chcard ${c.done ? "ok" : ""}"><div class="chhd"><span class="chic">${icon("p_target")}</span><div><h3>${t.T}</h3><p class="small muted">${t.ends(c.left)}</p></div></div><p><b>${esc(c.text)}</b></p><div class="seabar g"><i style="width:${pct}%"></i></div><div class="row"><span class="small">${t.prog(c.have, c.goal)}</span><span class="spacer"></span><span class="small muted">${t.reward(150, 100)}</span></div>${c.claimed ? `<p class="small okline">${icon("check")} ${t.done}</p>` : c.done ? `<button class="btn block" id="claimWeek">${t.claim}</button>` : ""}</div>`;
}

/* --- Settimana di festa --- */
function festaBanner() { if (!curSeason() || !isFesta(dkey())) return ""; const t = L(); const m = new Date().getMonth(); return `<div class="festa"><span class="fic">${icon("p_party")}</span><span><b>${esc(t.festa.names[m])}</b><small>${t.festa.P}</small></span></div>`; }

/* --- Scudi della serie --- */
streak = function () {
  let n = 0; const d = new Date(); const sh = S.shielded || [];
  const ok = (k) => (S.days[k] && (S.days[k].done > 0 || S.days[k].rest || S.days[k].free)) || sh.includes(k);
  if (!ok(dkey(d))) d.setDate(d.getDate() - 1);
  while (ok(dkey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
};
function useShieldIfNeeded() {
  if (!S.pet || !(S.shields > 0)) return; const y = new Date(); y.setDate(y.getDate() - 1); const yk = dkey(y); const b = new Date(y); b.setDate(b.getDate() - 1); const bk = dkey(b);
  const ok = (k) => (S.days[k] && (S.days[k].done > 0 || S.days[k].rest || S.days[k].free)) || (S.shielded || []).includes(k);
  if (!ok(yk) && ok(bk) && S.shieldCheck !== dkey()) { S.shields--; S.shielded = (S.shielded || []).concat(yk).slice(-60); S.shieldCheck = dkey(); save(); setTimeout(() => toast(L().shield.saved), 900); trackOnce("scudo-usato"); }
  S.shieldCheck = dkey();
}

/* --- Resoconto del mese --- */
function monthStats() {
  const now = new Date(); const pre = dkey(now).slice(0, 7); const log = (S.log || []).filter((x) => x.d.startsWith(pre));
  const days = new Set(log.map((x) => x.d)).size; const gc = {}; log.forEach((x) => { gc[x.g] = (gc[x.g] || 0) + 1; }); const top = Object.keys(gc).sort((a, b) => gc[b] - gc[a]);
  const cc = {}; log.forEach((x) => { const c = goalCat(x.g); cc[c] = (cc[c] || 0) + 1; });
  const weeks = [0, 0, 0, 0, 0]; log.forEach((x) => { weeks[Math.min(4, Math.floor((+x.d.slice(8, 10) - 1) / 7))]++; });
  const moods = [0, 0, 0, 0, 0]; (S.diary || []).filter((e) => e.day && e.day.startsWith(pre) && e.mood != null).forEach((e) => { moods[e.mood]++; });
  return { n: log.length, days, top, gc, cc, weeks, moods, month: intlDT(loc(), { month: "long" }).format(now) };
}
function reportCard() {
  const t = L().rep; const m = monthStats();
  return `<div class="card stack-s repcard"><div class="sec"><h3>${t.T}</h3><span class="small muted">${esc(m.month)}</span></div>${m.n ? `<div class="repmini"><span><b>${m.n}</b><small>${t.goalsL}</small></span><span><b>${m.days}</b><small>${t.daysL}</small></span></div>${m.top[0] ? `<p class="small">${esc(t.top(goalText(m.top[0])))}</p>` : ""}` : `<p class="small muted">${t.none}</p>`}<button class="btn gold block" id="fullReport">${icon("p_crown")}${t.full}</button></div>`;
}
function openReport() {
  const t = L(); const r = t.rep; const m = monthStats(); const max = Math.max(1, ...m.weeks);
  const bars = m.weeks.map((v, i) => `<g><rect x="${14 + i * 58}" y="${100 - (v / max) * 80}" width="38" height="${(v / max) * 80}" rx="8" fill="${["#F2A65A", "#7AA3DC", "#74BD87", "#B9A3F2", "#F29BB8"][i]}"/><text x="${33 + i * 58}" y="${96 - (v / max) * 80}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${v}</text><text x="${33 + i * 58}" y="116" text-anchor="middle" font-size="11" fill="currentColor" opacity=".6">${i + 1}</text></g>`).join("");
  const tot = Math.max(1, m.moods.reduce((a, b) => a + b, 0));
  const moods = m.moods.map((v, i) => `<div class="mbar"><span class="mface">${MOOD_FACE[i]}</span><span class="mtrack"><i style="width:${(v / tot) * 100}%"></i></span><span class="mnum">${v}</span></div>`).join("");
  const cats = Object.keys(m.cc).sort((a, b) => m.cc[b] - m.cc[a]); const ctot = Math.max(1, m.n);
  const catHTML = cats.map((c) => `<div class="mbar"><span class="cdot" style="background:${CAT_COLOR[c]}">${catIcon(c)}</span><span class="mtrack"><i style="width:${(m.cc[c] / ctot) * 100}%;background:${CAT_COLOR[c]}"></i></span><span class="mnum">${Math.round((m.cc[c] / ctot) * 100)}%</span></div>`).join("") || `<p class="small muted">${r.none}</p>`;
  const habits = m.top.slice(0, 3).map((g, i) => `<li><span class="medal m${i}">${i + 1}</span><span>${esc(goalText(g))}</span><b>${m.gc[g]}</b></li>`).join("");
  const allCats = ["body", "mind", "home", "people", "work", "sleep"]; const weak = allCats.filter((c) => (S.goals || []).some((g) => goalCat(g.id) === c)).sort((a, b) => (m.cc[a] || 0) - (m.cc[b] || 0))[0] || "custom";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="rpT"><div class="box repbox"><div class="rphead"><div class="rppet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><h2 id="rpT">${esc(r.fullT(m.month))}</h2><div class="repmini big"><span><b>${m.n}</b><small>${r.goalsL}</small></span><span><b>${m.days}</b><small>${r.daysL}</small></span><span><b>${streak()}</b><small>${icon("flame")} ${r.streakL}</small></span></div></div>
  <div class="rpsec"><h3>${r.weeks}</h3><svg viewBox="0 0 300 122" class="rpbars" aria-hidden="true">${bars}</svg></div>
  <div class="rpsec"><h3>${r.habits}</h3>${habits ? `<ol class="rphab">${habits}</ol>` : `<p class="small muted">${r.none}</p>`}</div>
  <div class="rpsec"><h3>${r.cats}</h3>${catHTML}</div>
  <div class="rpsec"><h3>${r.moods}</h3>${moods}</div>
  <div class="rpsec tip"><h3>${esc(r.tipT(S.petName))}</h3><p>${esc(r.tips[weak])}</p></div>
  <button class="btn" id="closeLayer">${t.ok}</button></div></div>`;
  trackOnce("resoconto-completo"); if (anim) G.from(".repbox .rpsec", { y: 16, opacity: 0, duration: 0.4, stagger: 0.06 });
}

/* --- Giro del mondo (Plus) --- */
const _destListV10 = destList;
destList = function () { const o = _destListV10(); const tw = L().world || T.en.world || []; o.world = WORLD.map((w, i) => ({ key: `w:${i}`, h: w.h, lvl: 1, name: (tw[i] || {}).name || w.art, art: () => realArt(w.art, (tw[i] || {}).name || w.art), cards: [`w:${i}`], plus: true })); return o; };
const _destByKeyV10 = destByKey;
destByKey = function (key) { if (key.startsWith("w:")) { const i = +key.split(":")[1]; const tw = L().world || T.en.world; return { key, h: WORLD[i].h, lvl: 1, name: tw[i].name, cards: [key] }; } return _destByKeyV10(key); };
const _cardInfoV10 = cardInfo;
cardInfo = function (ck) { if (ck.startsWith("w:")) { const i = +ck.split(":")[1]; const tw = L().world || T.en.world; const p = tw[i]; return { title: p.t, text: p.s, art: () => realArt(WORLD[i].art, p.t), place: p.name }; } return _cardInfoV10(ck); };
const _viewTripsV10 = viewTrips;
viewTrips = function () {
  const t = L(); const h = _viewTripsV10(); const { world } = destList(); const plus = plusActive();
  const btns = world.map((d) => { const found = S.cards.includes(d.cards[0]); return `<button class="dest wdest ${plus ? "" : "plusl"}" ${S.away ? "disabled" : ""} aria-pressed="${pickedDest === d.key}" data-dest="${d.key}" ${plus ? "" : `data-wplus="1"`}><span class="pc">${d.art()}</span><span class="meta"><b>${esc(d.name)}</b><span class="small muted">${plus ? `${t.hours(d.h)}${found ? ` · ${icon("check")}` : ""}` : `${icon("p_crown")} Tanetto Plus`}</span></span></button>`; }).join("");
  const have = world.filter((d) => S.cards.includes(d.cards[0])).length;
  const sec = `<div class="worldsec"><div class="sec"><h2>${icon("p_crown")}${t.worldT}</h2><span class="small muted">${have}/${world.length}</span></div><p class="small muted">${esc(t.worldP(WORLD.length))}</p><div class="stack-s">${btns}</div>${have ? `<h3>${t.albumT}</h3>${albumGrid(world)}` : ""}</div>`;
  const key = `<div class="sec"><h2>${t.albumT}</h2>`; let out = h.includes(key) ? h.replace(key, sec + key) : h + sec;
  const wp = pickedDest && pickedDest.startsWith("w:") ? world.find((d) => d.key === pickedDest) : null;
  if (wp && plus && !S.away && S.energy >= 100 && !out.includes('id="depart"')) out += `<div class="departbar"><div class="in"><button class="btn block" id="depart">${esc(t.depart(wp.name))} · ${t.hours(wp.h)}</button></div></div>`;
  return out;
};

/* --- Scena gratuita della stagione: Festa delle Lanterne --- */
const seaStars = () => seaKind(curSeason()) === "stars";
const seaKites = () => seaKind(curSeason()) === "kites";
const seaLake = () => (seaKites() ? L().kites.lake : seaStars() ? L().v21.lake : L().festival.name);
function festivalScene(o) {
  const d = dims(), TOP = d.top, BOT = d.bot, H = d.H; const sk = nid("fs"), lk = nid("fl"), vg = nid("fv"); const stars = seaStars();
  if (seaKites()) return kitesScene(o, d, sk, lk, vg);
  let s = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(seaLake())}"><defs><linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151B40"/><stop offset=".7" stop-color="#3A3772"/><stop offset="1" stop-color="#8A5C8C"/></linearGradient><linearGradient id="${lk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3F7A"/><stop offset="1" stop-color="#1E2450"/></linearGradient><radialGradient id="${vg}" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#0A0E24" stop-opacity="0"/><stop offset="1" stop-color="#0A0E24" stop-opacity=".45"/></radialGradient></defs><rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${sk})"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${Math.round(hashN("fsx" + i) * 360)}" cy="${Math.round(-TOP + 6 + hashN("fsy" + i) * (TOP + 120))}" r="${i % 4 ? 0.8 : 1.3}" fill="#fff" opacity=".6"/>`;
  s += `<circle cx="80" cy="${30 - TOP * 0.4}" r="16" fill="#F8F1D4"/><circle cx="88" cy="${24 - TOP * 0.4}" r="14" fill="#1E2450"/>`;
  if (stars) {
    s += `<path d="M230 ${-TOP + 40} L318 ${-TOP + 92}" stroke="#FFE7A0" stroke-width="3" stroke-linecap="round" opacity=".3"/><path d="M262 ${-TOP + 58} L318 ${-TOP + 92}" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
    for (let i = 0; i < 12; i++) { const x = Math.round(20 + hashN("sx" + i) * 320), y = Math.round(-TOP + 30 + hashN("sy" + i) * (TOP + 110)); s += `<g class="slant">${starShape(x, y, 0.4 + hashN("ss" + i) * 0.4, i % 3 ? "#FFD25E" : "#FFF3C8", true)}</g>`; }
  } else for (let i = 0; i < 16; i++) { const x = Math.round(20 + hashN("lx" + i) * 320), y = Math.round(-TOP + 30 + hashN("ly" + i) * (TOP + 120)); s += `<g class="slant">${lanternShape(x, y, 0.35 + hashN("ls" + i) * 0.35, ["#F28A3C", "#E2654F", "#F2B33D"][i % 3], true)}</g>`; }
  s += `<path d="M0 156 C60 140 120 152 180 146 C240 140 300 152 360 144 L360 178 L0 178 Z" fill="#26294F"/>`;
  s += `<rect x="0" y="174" width="360" height="${126 + BOT}" fill="url(#${lk})"/>`;
  for (let i = 0; i < 14; i++) { const x = Math.round(20 + hashN("rx" + i) * 320), y = Math.round(186 + hashN("ry" + i) * (60 + BOT * 0.5)); s += `<ellipse cx="${x}" cy="${y}" rx="${6 + (i % 3) * 3}" ry="1.6" fill="#FFD27A" opacity="${0.25 + (i % 3) * 0.12}"/>`; }
  s += `<rect x="96" y="232" width="168" height="10" fill="#8E6440"/><rect x="96" y="242" width="168" height="4" fill="#5B3A1A" opacity=".4"/>${[104, 150, 206, 252].map((x) => `<rect x="${x}" y="242" width="6" height="${30 + BOT * 0.2}" fill="#6B4A30"/>`).join("")}`;
  [[120, 228], [240, 228]].forEach(([x, y]) => { s += `<rect x="${x - 2}" y="${y - 30}" width="4" height="30" fill="#6B4A30"/>${stars ? starShape(x, y - 40, 0.75, "#FFD25E", true) : lanternShape(x, y - 40, 0.6, "#E2654F", true)}`; });
  s += petGroup(o.e, o.glow);
  return s + `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${vg})" pointer-events="none"/></svg>`;
}
/* Prato degli Aquiloni (di giorno): cielo, nuvole, aquiloni che ondeggiano, colline, prato fiorito con le girandole */
function kitesScene(o, d, sk, lk, vg) {
  const TOP = d.top, BOT = d.bot, H = d.H;
  let s = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(seaLake())}"><defs><linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BA6D6"/><stop offset=".75" stop-color="#A9D7F0"/><stop offset="1" stop-color="#E4F3F9"/></linearGradient><linearGradient id="${lk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CC46F"/><stop offset="1" stop-color="#4E9B4E"/></linearGradient><radialGradient id="${vg}" cx="50%" cy="46%" r="75%"><stop offset=".65" stop-color="#5A3A1A" stop-opacity="0"/><stop offset="1" stop-color="#5A3A1A" stop-opacity=".18"/></radialGradient></defs><rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${sk})"/>`;
  s += `<circle cx="300" cy="${36 - TOP * 0.4}" r="18" fill="#FFE7A0"/><circle cx="300" cy="${36 - TOP * 0.4}" r="30" fill="#FFE7A0" opacity=".25"/>`;
  for (let i = 0; i < 5; i++) { const x = Math.round(30 + hashN("kcx" + i) * 300), y = Math.round(-TOP + 20 + hashN("kcy" + i) * (TOP + 70)), k = 0.7 + hashN("kck" + i) * 0.6; s += `<g transform="translate(${x} ${y}) scale(${k})" opacity=".92"><ellipse cx="0" cy="0" rx="24" ry="8" fill="#fff"/><ellipse cx="-11" cy="-6" rx="13" ry="10" fill="#fff"/><ellipse cx="10" cy="-7" rx="12" ry="9" fill="#fff"/></g>`; }
  const KC = ["#E8603C", "#F2B140", "#F29BB8", "#5DAE5A", "#7B6FD0"];
  for (let i = 0; i < 7; i++) { const x = Math.round(30 + hashN("kx" + i) * 300), y = Math.round(-TOP + 26 + hashN("ky" + i) * (TOP + 84)); s += `<path d="M${x} ${y + 16} Q${x + 30} ${y + 90} ${x + (i % 2 ? 60 : -40)} 176" stroke="#fff" stroke-width=".8" fill="none" opacity=".55"/><g class="slant">${kiteShape(x, y, 0.55 + hashN("ks" + i) * 0.45, KC[i % KC.length], true, KC[(i + 2) % KC.length])}</g>`; }
  s += `<path d="M0 150 C60 132 130 146 190 140 C250 134 300 146 360 136 L360 178 L0 178 Z" fill="#6DB866"/><path d="M0 162 C80 150 150 162 220 156 C280 151 320 160 360 154 L360 178 L0 178 Z" fill="#4E9B4E"/>`;
  /* prato fiorito al posto del lago: un sentierino chiaro dove sta il compagno, fiori, due girandole */
  s += `<rect x="0" y="174" width="360" height="${126 + BOT}" fill="url(#${lk})"/>`;
  s += `<path d="M150 ${300 + BOT} C160 280 140 262 168 248 C190 238 214 242 236 236 L250 240 C228 250 206 252 190 262 C170 276 196 288 196 ${300 + BOT} Z" fill="#E9D7A8" opacity=".75"/><ellipse cx="180" cy="242" rx="86" ry="11" fill="#3E7E3E" opacity=".22"/>`;
  for (let i = 0; i < 26; i++) { const x = Math.round(10 + hashN("fx" + i) * 340), y = Math.round(184 + hashN("fy" + i) * (100 + BOT * 0.8)); if (x > 104 && x < 256 && y > 222 && y < 262) continue; const c = ["#FFFFFF", "#F2B140", "#F29BB8", "#E8603C", "#B7A6F2"][i % 5]; s += `<g transform="translate(${x} ${y})"><path d="M0 0 v-7" stroke="#3E7E3E" stroke-width="1.2"/><circle cx="0" cy="-8" r="${2 + (i % 3) * 0.6}" fill="${c}"/><circle cx="0" cy="-8" r="1" fill="#FFE7A0"/></g>`; }
  for (let i = 0; i < 18; i++) { const x = Math.round(hashN("gx" + i) * 360), y = Math.round(180 + hashN("gy" + i) * (110 + BOT * 0.8)); s += `<path d="M${x} ${y} q2 -6 4 0 M${x + 5} ${y} q2 -5 3 0" stroke="#4E9B4E" stroke-width="1.2" fill="none" opacity=".7"/>`; }
  [[120, 236, "#E8603C"], [240, 236, "#F2B140"]].forEach(([x, y, c]) => { s += `<rect x="${x - 2}" y="${y - 34}" width="4" height="36" rx="2" fill="#8E6440"/><g class="slant" transform="translate(${x} ${y - 46})">${["#E8603C", "#F2B140", "#7CC4EC", "#F29BB8"].map((cc, i) => `<path d="M0 0 L0 -13 Q10 -11 0 0 Z" transform="rotate(${i * 90})" fill="${i ? cc : c}"/>`).join("")}<circle r="2.6" fill="#fff"/></g>`; });
  s += petGroup(o.e, o.glow);
  return s + `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${vg})" pointer-events="none"/></svg>`;
}
function releaseLantern(fromEl) {
  const svg = document.querySelector("#room svg"); const t = L(); if (!svg) return; const d = dims();
  const ns = "http://www.w3.org/2000/svg"; const g = document.createElementNS(ns, "g"); const x0 = 180 + petDX + (Math.random() - 0.5) * 40, y0 = 150;
  const stars = seaStars(), kites = seaKites();
  g.innerHTML = kites ? kiteShape(0, 0, 1, pick(["#E8603C", "#F2B140", "#F29BB8", "#7B6FD0"]), true, "#FFE7A0") : stars ? starShape(0, 0, 1, "#FFD25E", true) : lanternShape(0, 0, 0.8, ["#F28A3C", "#E2654F", "#F2B33D"][Math.floor(Math.random() * 3)], true); svg.insertBefore(g, petWrapEl() ? petWrapEl().nextSibling : null);
  SND.play("sparkle"); setTimeout(() => SND.play("chime"), 500); SND.haptic(10); setExpr("felice", 2200); say(pick(kites ? t.kites.wishes : stars ? t.v21.wishes : t.wishes), 3200); trackOnce(kites ? "aquilone-volo" : stars ? "stella-desiderio" : "lanterna-desiderio");
  if (anim) { G.fromTo(g, { x: x0, y: y0, scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }); G.to(g, { y: -d.top - 40, x: x0 + (Math.random() - 0.5) * 120, duration: 6, ease: "sine.in", delay: 0.4, onComplete: () => g.remove() }); G.to(g, { rotation: 8, duration: 1.2, yoyo: true, repeat: 5, ease: "sine.inOut", transformOrigin: "50% 50%" }); }
  else setTimeout(() => g.remove(), 1500);
}

/* --- Collegamenti alle schermate --- */
const _roomBlockV10 = roomBlock;
roomBlock = function () {
  let h = _roomBlockV10(); const se = curSeason(); if (!full || !se) return h;
  const t = L(); const ic = seaIcon(se); const chip = `<button class="scn sea" data-scene="festival" aria-pressed="${sceneId === "festival"}">${icon(ic)}<span>${esc(seaLake())}</span></button>`;
  h = h.replace('<div class="scns">', `<div class="scns">${chip}`);
  h = h.replace('<button class="act fact', `<button class="act fact" data-act2="wish"><span class="aci">${icon(ic)}</span><span>${t.acts2.wish}</span></button><button class="act fact`);
  return h;
};
/* La scena festival si disegna al posto della stanza */
const _roomSVGv10 = roomSVG;
roomSVG = function (opts) {
  if (full && sceneId === "festival" && opts.top != null && curSeason()) return festivalScene({ e: opts.e, glow: opts.glow });
  let o = _roomSVGv10(opts); const se = curSeason();
  if (se && !opts.away) {
    const lit = opts.ph === "night" || opts.ph === "evening";
    const lan = seaKind(se) === "kites" ? [[72, 64, 0.42, "#E8603C"], [104, 56, 0.34, "#F2B140"], [90, 86, 0.3, "#F29BB8"]].map(([x, y, s, c]) => `<g class="slant">${kiteShape(x, y, s, c, true, "#2F7035")}</g>`).join("")
      : seaKind(se) === "stars" ? [[70, 62, 0.42], [96, 50, 0.32], [114, 74, 0.38], [86, 88, 0.28]].map(([x, y, s], i) => `<g class="slant">${starShape(x, y, s, i % 2 ? "#FFF3C8" : "#FFD25E", lit)}</g>`).join("")
      : [[68, 64, 0.5], [94, 54, 0.4], [114, 76, 0.46], [84, 90, 0.34]].map(([x, y, s], i) => `<g class="slant">${lanternShape(x, y, s, ["#F28A3C", "#E2654F", "#F2B33D"][i % 3], lit)}</g>`).join("");
    o = o.replace('<g class="wpg">', `<g class="wpg">${lan}`);
  }
  if (full) o = o.replace(/<rect [^>]*filter="url\(#gr\d+\)"\/>/, "");
  return o;
};
const _viewTodayV10 = viewToday;
viewToday = function () {
  const t = L(); let h = _viewTodayV10(); const key = `<p class="note">${t.demo}</p>`;
  const extra = `${festaBanner()}${seasonCard()}${S.pet && !S.away ? challengeCard() : ""}`;
  return h.replace(key, extra + key);
};
const _eventCardV10 = eventCard;
eventCard = function () { return curSeason() ? "" : _eventCardV10(); };
const _viewDiaryV10 = viewDiary;
viewDiary = function () { const h = _viewDiaryV10(); if (!S.pet) return h; const key = `</form>`; const i = h.indexOf(key); if (i < 0) return h; return h.slice(0, i + key.length) + reportCard() + h.slice(i + key.length); };
/* 1.0.9 (fase 2): tolto il vecchio pulsante segnaposto del video (i video veri sono in 97zn) */
const _viewMoreV10 = viewMore;
viewMore = function () {
  const t = L(); const h = _viewMoreV10(); const sh = `<div class="card stack-s shcard"><div class="chhd"><span class="chic sh">${icon("p_shield")}</span><div><h3>${t.shield.T}</h3><p class="small muted">${t.shield.P}</p></div></div><p><b>${t.shield.have(S.shields || 0)}</b></p></div>`;
  const founder = S.owned.includes("founder_lantern") ? `<div class="founderbadge">${icon("p_star")}<b>${t.season.founder}</b><small>${t.season.founderP}</small></div>` : "";
  const key = `<div class="card stack-s" id="dataCard">`; return h.includes(key) ? h.replace(key, founder + sh + key) : h + founder + sh;
};
/* 1.0.9: le chiacchiere con il compagno sono per tutti (non sono piu' un vantaggio di Plus) */
/* Pacchetti: cosa ci compri */
const _openTaniShopV10 = openTaniShop;
openTaniShop = function (src) { _openTaniShopV10(src); const t = L(); document.querySelectorAll(".pack").forEach((b, i) => { const s = document.createElement("span"); s.className = "penough"; s.textContent = (t.tani.enough || [])[i] || ""; const pp = b.querySelector(".pp"); b.insertBefore(s, pp); }); };

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return; const t = L();
  if (b.id === "openPath") { openPath(); return; }
  if (b.dataset.claim) { claimReward(b.dataset.claim); return; }
  if (b.dataset.golock) { openPlus("fila-oro", () => { if (plusActive()) openPath(); }); return; }
  if (b.id === "claimWeek") { const c = weekChallenge(); if (!c.done || c.claimed) return; S.wkc = S.wkc || {}; S.wkc[c.wk] = true; S.seeds += 150; save(); toast(L().season.got(L().season.tani(150))); SND.play("fanfare"); burst("star", 12, b.closest(".chcard")); trackOnce("sfida-completata"); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "fullReport") { if (plusActive()) openReport(); else openPlus("resoconto", () => { if (plusActive()) openReport(); }); return; }
  if (b.id === "tryPlus") { openPlus("collezione", () => { const y = window.scrollY; render(); window.scrollTo(0, y); }); return; }
  if (b.dataset.wplus) { ev.stopImmediatePropagation(); openPlus("giro-del-mondo", () => { const y = window.scrollY; render(); window.scrollTo(0, y); }); return; }
  if (b.dataset.act2 === "wish") { ev.stopImmediatePropagation(); releaseLantern(b); return; }
  if (b.dataset.scene === "festival") { ev.stopImmediatePropagation(); if (sceneId === "festival") return; stopPlay(); sceneId = "festival"; petDX = 0; sayText = null; SND.play("chime"); render(); trackOnce("scena-festival"); if (anim) G.from("#room > svg", { opacity: 0, scale: 1.04, duration: 0.5 }); return; }
  if (b.dataset.spot === "lake") { ev.stopImmediatePropagation(); releaseLantern(b); return; }
}, true);

/* Scena festival: lago toccabile, frase iniziale */
const _sceneSpotsV10 = sceneSpots;
sceneSpots = function (furn) { if (full && sceneId === "festival") return [["lake", 20, 180, 320, 50]]; return _sceneSpotsV10(furn); };
const _spotLabelV10 = spotLabel;
spotLabel = function (k) { if (k === "lake") return seaKites() ? L().kites.lakeTap : seaStars() ? L().v21.lakeTap : L().festival.tap; return _spotLabelV10(k); };
const _hideSpotsV10 = hideSpots;
hideSpots = function () { if (sceneId === "festival") return [["pl", 120, 210], ["pr", 240, 210], ["dk", 180, 236]]; return _hideSpotsV10(); };

/* Aggiornamenti al giorno nuovo, tema di stagione */
const _rollDayV10 = rollDay;
rollDay = function () { _rollDayV10(); useShieldIfNeeded(); seaTick(); };

/* --- 1.0.9: cambio di stagione ---
   1) Premi non ritirati: la prima volta che si apre l'app dopo la fine di una stagione (entro 14 giorni) le tappe
      raggiunte e non ritirate si ritirano da sole (la fila d'oro solo con Plus attivo). Niente si perde a mezzanotte.
   2) Annuncio: una volta per stagione nuova (non il primo giorno di chi ha appena installato), con le altre finestre in fila. */
function seaState() {
  if (!S.v21sea || typeof S.v21sea !== "object" || Array.isArray(S.v21sea)) S.v21sea = {}; const v = S.v21sea;
  ["ann", "grace"].forEach((k) => { if (!v[k] || typeof v[k] !== "object" || Array.isArray(v[k])) v[k] = {}; }); return v;
}
let seaTickDay = "";
function seaTick() {
  const d = dkey(); if (seaTickDay === d || !S.pet) return; seaTickDay = d;
  setTimeout(() => { try { seaGrace(); seaAnnounceQ(); } catch (e) { /* una stagione non deve mai bloccare l'app */ } }, 2500);
}
function seaGrace() {
  const se = curSeason(), today = dkey(); const b = ldate(se ? se.start : today); b.setDate(b.getDate() - 1);
  const prev = seasonAt(dkey(b)); if (!prev || prev.end >= today) return 0;
  const v = seaState(); if (v.grace[prev.id]) return 0;
  if (Math.round((ldate(today) - ldate(prev.end)) / 86400000) > 14) return 0;
  const e = S.v20econ && S.v20econ.pass; if (!e || !e[prev.id]) { v.grace[prev.id] = 1; save(); return 0; } /* stagione mai giocata */
  const tier = sTier(passi(prev), prev), c = sClaims(prev), plus = plusActive(); let k = 0;
  for (let n = 1; n <= tier; n++) { ["f", "g"].forEach((tr) => { if (c[tr].includes(n) || (tr === "g" && !plus)) return; giveReward(sReward(tr, n, prev)); c[tr].push(n); k++; }); }
  v.grace[prev.id] = 1; save();
  if (k) { setTimeout(() => { toast(L().v21.grace(k)); SND.play("coin"); }, 1200); trackOnce("stagione-premi-automatici"); const n = document.getElementById("seedN"); if (n) n.textContent = S.seeds; }
  return k;
}
function seaAnnounce() {
  const se = curSeason(); if (!se || !S.pet || seaKind(se) === "lanterns" || isFirstDay()) return;
  const v = seaState(); if (v.ann[se.id]) return; v.ann[se.id] = 1; save(); const t = seaTx(se);
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="saT"><div class="box card seaann"><div class="seaannart">${seasonBanner(se, true)}</div><div class="seaannin"><h2 id="saT">${esc(se.rerun ? t.annRT : t.annT)}</h2><p>${esc((se.rerun ? t.annRP : t.annP)(S.petName))}</p><button class="btn block" id="seaAnnGo" type="button">${esc(t.annGo)}</button><button class="link" id="closeLayer" type="button">${esc(t.annLater)}</button></div></div></div>`;
  SND.play("chime"); trackOnce("stagione-annuncio-" + se.id);
  if (anim) G.from(".seaann", { y: 30, opacity: 0, duration: 0.4, ease: "back.out(1.4)" });
}
function seaAnnounceQ() {
  const se = curSeason(); if (!se || seaKind(se) === "lanterns" || seaState().ann[se.id] || isFirstDay()) return;
  if (typeof nq20 === "function") nq20("seaann", "ask", seaAnnounce); else if (!layer.innerHTML.trim()) seaAnnounce();
}
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("button"); if (b && b.id === "seaAnnGo") { closeLayer(); openPath(); } });
const _applyRootV10 = applyRoot;
applyRoot = function () { _applyRootV10(); const se = curSeason(); document.documentElement.classList.toggle("sea-lanterns", !!se && seaKind(se) === "lanterns"); document.documentElement.classList.toggle("sea-stars", !!se && seaKind(se) === "stars"); document.documentElement.classList.toggle("sea-kites", !!se && seaKind(se) === "kites"); };
const _ambientV10 = ambientExtra;
ambientExtra = function (root, q) {
  _ambientV10(root, q); if (!anim) return;
  q(".slant").forEach((l, i) => ambient.push(G.to(l, { y: -6 - (i % 3) * 3, duration: 2.4 + (i % 4) * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2 })));
  document.querySelectorAll(".seacard .slant").forEach((l, i) => ambient.push(G.to(l, { y: -5, duration: 2 + (i % 3) * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut" })));
};
Object.assign(ICON, {
  p_shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  p_target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
  p_party: '<path d="M4 20l5-14 9 9z"/><path d="M14 4l1 2M19 6l-2 1M20 11l-2-.5M12 3v2"/>',
  p_lantern: '<path d="M9 4h6M12 2v2"/><path d="M7 7c0-1.5 10-1.5 10 0v9c0 1.5-10 1.5-10 0z"/><path d="M10 19h4M12 19v2"/>',
  p_star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4 1.3 6-5.4-3-5.4 3 1.3-6-4.5-4 6-.7z"/>',
  p_kite: '<path d="M12 2.5l6 7-6 9-6-9z"/><path d="M6 9.5h12M12 2.5v16"/><path d="M12 18.5c-2 1.2 1.5 2 0 3.5"/>',
  p_play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
  p_noads: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 4l16 16"/>',
  p_cloud: '<path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"/>'
});
