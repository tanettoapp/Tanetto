/* v19 — 9 nuovi mondi fantastici: arte delle cartoline (4 per mondo, la n. 3 è la rara) e testi it/en */
const V19W = [ // order = unlock order
  { id: "fireflies", lvl: 8, h: 3 }, { id: "shells", lvl: 10, h: 3 }, { id: "mushrooms", lvl: 12, h: 4 }, { id: "library", lvl: 15, h: 4 }, { id: "crystal", lvl: 18, h: 5 }, { id: "starsea", lvl: 20, h: 5 }, { id: "sugar", lvl: 23, h: 5 }, { id: "aurora", lvl: 26, h: 6 }, { id: "dragon", lvl: 29, h: 6 }
];

const _V19WA = (() => {
  const R = (v) => Math.round(v * 10) / 10;
  let C = null; /* cartolina in corso (per le forme riusabili) */
  /* contesto di una cartolina: raccoglie le <defs> e dà id unici con nid() */
  const ctx = () => {
    const c = { d: "" };
    c.lin = (a, b, x2 = 0, y2 = 1, oa = 1, ob = 1) => { const id = nid("v9l"); c.d += `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}" stop-opacity="${oa}"/><stop offset="1" stop-color="${b}" stop-opacity="${ob}"/></linearGradient>`; return `url(#${id})`; };
    c.glow = (col, op = 1) => { const id = nid("v9g"); c.d += `<radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`; return `url(#${id})`; };
    /* forma riusabile: la si disegna una volta in <defs> e la si richiama con <use> */
    c.sym = (inner) => { const id = nid("v9s"); c.d += `<g id="${id}">${inner}</g>`; return (x, y, s = 1, fill, rot) => `<use href="#${id}"${fill ? ` fill="${fill}"` : ""} transform="translate(${R(x)} ${R(y)})${rot ? ` rotate(${rot})` : ""}${s !== 1 ? ` scale(${R(s * 100) / 100})` : ""}"/>`; };
    c.k = {}; c.once = (key, inner) => c.k[key] || (c.k[key] = c.sym(inner));
    c.ball = (a, b) => { const id = nid("v9b"); c.d += `<radialGradient id="${id}" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`; return `url(#${id})`; };
    return c;
  };
  /* piccoli aiutanti */
  /* stellina a 4 punte (curve relative, markup corto) */
  const spark = (x, y, r, col = "#fff", op = 1) => (r = R(r), `<path d="M${x} ${R(y - r)}q0 ${r} ${r} ${r}q-${r} 0 -${r} ${r}q0 -${r} -${r} -${r}q${r} 0 ${r} -${r}z" fill="${col}"${op < 1 ? ` opacity="${op}"` : ""}/>`);
  /* tanti puntini rotondi in un solo <path> (tratti di lunghezza zero con estremità tonde) */
  const dotPath = (pts, r, col, op = 1) => pts.length ? `<path d="${pts.map(([x, y]) => `M${R(x)} ${R(y)}h0`).join("")}" stroke="${col}" stroke-width="${R(r * 2)}" stroke-linecap="round"${op < 1 ? ` opacity="${op}"` : ""}/>` : "";
  const dots = (pts, r, col, op = 1) => { const a = pts.filter((p) => (p[2] || 1) === 1); return dotPath(a, r, col, op) + pts.filter((p) => (p[2] || 1) !== 1).map(([x, y, s]) => `<circle cx="${R(x)}" cy="${R(y)}" r="${R(r * s)}" fill="${col}"${op < 1 ? ` opacity="${op}"` : ""}/>`).join(""); };
  const cloud = (x, y, s = 1, col = "#fff", op = 0.9) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}" fill="${col}"><ellipse cx="0" cy="0" rx="12" ry="4"/><circle cx="-4" cy="-3" r="5"/><circle cx="4" cy="-4" r="6"/></g>`;
  const pine = (x, y, h, col) => C.once("pine", `<path d="M0 -1L.36 0H-.36Z"/><path d="M0 -1L.15 -.58Q0 -.66 -.15 -.58Z" fill="#F4F8FD"/><rect x="-.07" y="0" width=".14" height=".17" fill="#6B4A3A"/>`)(x, y, h, col);
  /* stelle "a caso" ma sempre uguali (seme fisso) */
  const starPts = (seed, n, x0, x1, y0, y1) => { let s = seed; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280, a = [], b = []; for (let k = 0; k < n; k++) (rnd() < 0.6 ? a : b).push([x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0)]); return [a, b]; };
  const starField = (seed, n, x0, x1, y0, y1, r = 0.8, col = "#FFF8DC") => { const [a, b] = starPts(seed, n, x0, x1, y0, y1); return dotPath(a, r * 0.7, col, 0.7) + dotPath(b, r * 1.15, col, 0.95); };
  /* riflessi sull'acqua: trattini orizzontali */
  const glints = (seed, n, x0, x1, y0, y1, col, w = 0.8, op = 0.6) => { const [a, b] = starPts(seed, n, x0, x1, y0, y1); return `<path d="${a.concat(b).map(([x, y], k) => `M${R(x)} ${R(y)}h${2 + (k % 3) * 1.6}`).join("")}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`; };
  /* cornice dorata delle cartoline rare */
  const rareFrame = () => `<rect x="2.6" y="2.6" width="154.8" height="94.8" rx="5" fill="none" stroke="#E8B64A" stroke-width="1.5"/><rect x="5" y="5" width="150" height="90" rx="3.6" fill="none" stroke="#FFF3C4" stroke-width=".6" opacity=".7"/>` + spark(8.5, 8.5, 3.6, "#F6C94E") + spark(151.5, 8.5, 3.6, "#F6C94E") + spark(8.5, 91.5, 3.6, "#F6C94E") + spark(151.5, 91.5, 3.6, "#F6C94E");
  /* fungo: stelo + cappello a cupola, con puntini */
  const mush = (x, base, sh, sw, cw, ch, col, stem = "#F6E9D4", spots = true) => {
    const cy = base - sh;
    const big = cw >= 8;
    let o = `<path d="M${R(x - sw)} ${base}Q${R(x - sw * 0.75)} ${R(base - sh / 2)} ${R(x - sw * 0.7)} ${cy}H${R(x + sw * 0.7)}Q${R(x + sw * 0.75)} ${R(base - sh / 2)} ${R(x + sw)} ${base}Z" fill="${stem}"/>`;
    if (big) o += `<path d="M${R(x + sw * 0.3)} ${cy}H${R(x + sw * 0.7)}Q${R(x + sw * 0.75)} ${R(base - sh / 2)} ${R(x + sw)} ${base}H${R(x + sw * 0.45)}Z" fill="#000" opacity=".06"/><ellipse cx="${x}" cy="${R(cy + 1)}" rx="${R(cw * 0.8)}" ry="${R(ch * 0.18)}" fill="#000" opacity=".1"/>`;
    o += `<path d="M${R(x - cw)} ${cy}C${R(x - cw)} ${R(cy - ch * 1.33)} ${R(x + cw)} ${R(cy - ch * 1.33)} ${R(x + cw)} ${cy}Q${x} ${R(cy + ch * 0.28)} ${R(x - cw)} ${cy}Z" fill="${col}"/>`;
    if (big) o += `<path d="M${R(x - cw * 0.62)} ${R(cy - ch * 0.5)}Q${R(x - cw * 0.4)} ${R(cy - ch * 0.92)} ${R(x - cw * 0.05)} ${R(cy - ch * 0.98)}" stroke="#fff" stroke-width="${R(Math.max(1, cw * 0.07))}" fill="none" opacity=".35" stroke-linecap="round"/>`;
    if (spots) o += dotPath([[x - cw * 0.45, cy - ch * 0.4], [x + cw * 0.05, cy - ch * 0.72], [x + cw * 0.5, cy - ch * 0.38]], cw * 0.11, "#fff", 0.9) + (big ? dotPath([[x - cw * 0.12, cy - ch * 0.25]], cw * 0.075, "#fff", 0.9) : "");
    return o;
  };
  /* tazzina con piattino */
  const cup = (x, y, col = "#FFF5E6", s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="4.6" ry="1.2" fill="#F2E3CF"/><path d="M-3 -4.6H3Q3 0 0 0Q-3 0 -3 -4.6Z" fill="${col}"/><path d="M2.8 -3.6q1.8 0 1.6 1.4q-.2 1.2 -2 1" stroke="${col}" stroke-width=".9" fill="none"/><ellipse cx="0" cy="-4.6" rx="3" ry=".7" fill="#B57A50"/></g>`;
  /* teiera */
  const teapot = (x, y, col, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M7 -5Q11 -6 12 -10" stroke="${col}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-7 -6q-4 0 -3.6 3q.4 2.4 3.4 2" stroke="${col}" stroke-width="1.6" fill="none"/><ellipse cx="0" cy="-5" rx="8" ry="6" fill="${col}"/><ellipse cx="0" cy="-10.6" rx="4" ry="1.4" fill="${col}"/><circle cx="0" cy="-12.6" r="1.4" fill="#F2C463"/><path d="M-5 -7q2 -3 5 -3.4" stroke="#fff" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/><ellipse cx="0" cy="-3.4" rx="7.6" ry="1" fill="#000" opacity=".07"/></g>`;
  /* cristallo a due facce */
  const shard = (x, y, w, h, c1, c2, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M${-w} 0V${R(-h * 0.68)}L0 ${-h}V0Z" fill="${c1}"/><path d="M${w} 0V${R(-h * 0.68)}L0 ${-h}V0Z" fill="${c2}"/><path d="M${R(-w * 0.55)} ${R(-h * 0.12)}V${R(-h * 0.62)}" stroke="#fff" stroke-width="${R(Math.max(0.6, w * 0.22))}" opacity=".55" stroke-linecap="round"/></g>`;
  /* libro chiuso visto di taglio (pagine color crema) */
  const book = (x, y, w, h, col, rot = 0) => C.once("book", `<rect width="20" height="6.2" rx="1.2"/><rect x="2" y="1.4" width="17.2" height="3.4" fill="#FFF7E6"/><path d="M2.5 2.5H18.8M2.5 3.7H18.8" stroke="#E8D9BE" stroke-width=".4"/><rect width="20" height="1.4" rx="1" fill="#fff" opacity=".2"/>`)(x, y, w / 20, col, rot);
  /* libro aperto */
  const openBook = (x, y, s, cover, page = "#FFF8EC", line = "#E6D6BC") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-23 -2L0 3L23 -2V8L0 13L-23 8Z" fill="${cover}"/><path d="M0 2Q-10 -6 -21 -4V6Q-10 4 0 10Z" fill="${page}"/><path d="M0 2Q10 -6 21 -4V6Q10 4 0 10Z" fill="${page}"/><path d="M0 2V10" stroke="${line}" stroke-width=".8"/><path d="M-17 -2.4Q-10 -3.4 -4 0M-17 .6Q-10 -.4 -4 3M17 -2.4Q10 -3.4 4 0M17 .6Q10 -.4 4 3" stroke="${line}" stroke-width=".7" fill="none"/></g>`;
  /* uccellino di carta (origami) */
  const paperBird = (x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -.6L-9 -6L-2 -.4Z" fill="#CFC4EA"/><path d="M-8 .4L-12 -3L-5 -.2ZM5 -1.2L9 -4.4L7.4 -.4Z" fill="#E9E3F4"/><path d="M-8 .4L7.4 -1.2L-1 2.6Z" fill="#F4F0FB"/><path d="M-1.6 -.4L-6 -9L4 -1.2Z" fill="#fff"/><path d="M-1.6 -.4L4 -1.2" stroke="#D8CFEE" stroke-width=".5"/></g>`;
  /* sfondo di montagne lontane con cime innevate */
  const peaks = (pts, col, cap = "#fff") => { let o = `<path d="M0 100V${pts[0][1] + 20}`; pts.forEach(([x, y]) => { o += `L${x} ${y}`; }); o += `V100Z" fill="${col}"/>`; return o; };

  const W = {};
  /* ---------------- 1. Bosco delle Lucciole ---------------- */
  W.fireflies = (c, i) => {
    let o = `<rect width="160" height="100" fill="${i === 3 ? c.lin("#33285E", "#EE9C86") : c.lin("#3A4676", "#EDAA84")}"/>`;
    const ff = c.sym(`<circle r="5.5" fill="${c.glow("#FFE27A", 0.75)}"/><circle r="1.25" fill="#FFF6C2"/>`);
    const tree = (x, y, r, col) => c.once("tree", `<rect x="-.12" width=".24" height="2" fill="#2A3B44"/><circle r="1"/><circle cx="-.62" cy=".45" r=".68"/><circle cx=".62" cy=".4" r=".7"/>`)(x, y, r, col);
    o += starField(11 + i, 8, 4, 156, 4, 26, 0.7);
    o += `<path d="M0 66Q40 54 80 62T160 58V100H0Z" fill="#3D5F70"/>`;
    const back = i === 3 ? [[14, 62, 13], [44, 66, 11], [118, 66, 11], [148, 60, 14]] : i === 2 ? [[12, 50, 15], [36, 58, 12], [126, 56, 13], [150, 48, 15]] : [[16, 54, 14], [50, 60, 12], [98, 56, 13], [140, 52, 15]];
    back.forEach(([x, y, r]) => { o += tree(x, y, r, "#2F5163"); });
    o += `<path d="M0 82Q50 74 100 80T160 78V100H0Z" fill="#2E5548"/>`;
    if (i === 0) {
      o += `<path d="M66 78Q84 81 78 87Q66 94 72 100H108Q96 94 102 87Q110 80 92 78Z" fill="#6F97B9"/><path d="M78 82q8 2 14 0M80 90q10 2 18 -1M76 97q12 1 22 -1" stroke="#C8DDF0" stroke-width="1" fill="none" opacity=".7" stroke-linecap="round"/>`;
      o += `<ellipse cx="64" cy="92" rx="5" ry="3" fill="#7E8C99"/><ellipse cx="112" cy="90" rx="6" ry="3.4" fill="#6E7C8A"/><ellipse cx="106" cy="96" rx="3.4" ry="2" fill="#8592A0"/>`;
      o += `<path d="M30 100L32 82M35 100L39 85M40 100L40 84M128 100L126 83M133 100L135 86" stroke="#4E7A4E" stroke-width="2" stroke-linecap="round"/><ellipse cx="32" cy="82" rx="1.4" ry="3.4" fill="#8A5A3A"/><ellipse cx="126" cy="83" rx="1.4" ry="3.4" fill="#8A5A3A"/>`;
      o += dots([[86, 84], [92, 92], [84, 96]], 1.6, "#FFE27A", 0.55);
      [[30, 46, 1], [52, 36, 0.8], [70, 52, 1.1], [92, 40, 0.9], [112, 50, 1], [134, 38, 0.8], [86, 66, 1.2], [56, 64, 0.9], [120, 68, 0.8], [148, 64, 1]].forEach(([x, y, s]) => { o += ff(x, y, s); });
    } else if (i === 1) {
      o += `<ellipse cx="80" cy="72" rx="40" ry="20" fill="${c.glow("#FFD27A", 0.4)}"/>`;
      o += `<ellipse cx="80" cy="91" rx="38" ry="3" fill="#000" opacity=".15"/><rect x="46" y="74" width="62" height="15" rx="7.5" fill="#8A5C44"/><rect x="46" y="83" width="62" height="6" rx="3" fill="#000" opacity=".1"/><ellipse cx="107" cy="81.5" rx="5.6" ry="7.5" fill="#C99A72"/><ellipse cx="107" cy="81.5" rx="3.4" ry="4.6" fill="none" stroke="#A87A54" stroke-width=".8"/><circle cx="107" cy="81.5" r="1" fill="#A87A54"/>`;
      o += `<path d="M48 76Q54 70 62 73Q70 69 78 72Q88 68 96 72Q102 70 106 75V77H48Z" fill="#78AE64"/><circle cx="58" cy="72" r="1" fill="#A9D68C"/><circle cx="90" cy="71" r="1" fill="#A9D68C"/>`;
      o += cup(62, 73, "#FFF5E6", 0.9) + cup(98, 73, "#FCE3EC", 0.9) + teapot(80, 73.5, "#F2A9A0", 0.85) + `<path d="M62 66q-1.6 -2 0 -4t0 -4M98 66q1.6 -2 0 -4t0 -4" stroke="#fff" stroke-width=".8" fill="none" opacity=".6" stroke-linecap="round"/>`;
      o += mush(34, 92, 9, 3, 9, 6, "#E2574F") + mush(26, 94, 5, 2, 5.5, 4, "#E9785F") + mush(126, 93, 8, 3, 8, 5.4, "#E2574F");
      [[40, 56, 1], [60, 46, 0.8], [80, 40, 1.1], [102, 48, 0.9], [120, 58, 1], [140, 46, 0.8], [24, 70, 0.9], [146, 72, 1]].forEach(([x, y, s]) => { o += ff(x, y, s); });
    } else if (i === 2) {
      o += `<ellipse cx="80" cy="86" rx="46" ry="8" fill="#47765A"/><ellipse cx="80" cy="86" rx="30" ry="4.6" fill="#5A8C66" opacity=".7"/>`;
      let sp = "", pts = [];
      for (let k = 0; k <= 46; k++) { const t = k * 0.27, rr = 2 + t * 3.1, x = 80 + rr * Math.cos(t), y = 48 + rr * Math.sin(t) * 0.62; sp += (k ? "L" : "M") + R(x) + " " + R(y); if (k % 3 === 1) pts.push([R(x), R(y), R(0.55 + k * 0.012)]); }
      o += `<path d="${sp}" stroke="#FFE9A0" stroke-width="1" fill="none" opacity=".3" stroke-linecap="round" stroke-linejoin="round"/>`;
      pts.forEach(([x, y, s]) => { o += ff(x, y, s); });
      o += ff(80, 48, 1.3);
      o += `<path d="M16 100L18 86M22 100L25 88M140 100L138 86M146 100L148 88" stroke="#4E7A4E" stroke-width="2" stroke-linecap="round"/>`;
    } else {
      o += `<circle cx="80" cy="40" r="44" fill="${c.glow("#FFD45E", 0.65)}"/>`;
      o += `<ellipse cx="80" cy="20.5" rx="10" ry="2.8" fill="none" stroke="#FFE7A0" stroke-width="1.6"/><ellipse cx="80" cy="20.5" rx="10" ry="2.8" fill="none" stroke="#fff" stroke-width=".5" opacity=".8"/>`;
      o += `<ellipse cx="66" cy="38" rx="13" ry="6" fill="#fff" opacity=".45" transform="rotate(-24 66 38)"/><ellipse cx="94" cy="38" rx="13" ry="6" fill="#fff" opacity=".45" transform="rotate(24 94 38)"/><ellipse cx="68" cy="45" rx="9" ry="4" fill="#fff" opacity=".3" transform="rotate(14 68 45)"/><ellipse cx="92" cy="45" rx="9" ry="4" fill="#fff" opacity=".3" transform="rotate(-14 92 45)"/>`;
      o += `<ellipse cx="80" cy="50" rx="8.5" ry="10.5" fill="${c.ball("#FFFBE0", "#F2B23A")}"/><path d="M73 45.5Q80 43.5 87 45.5M72.4 50Q80 48 87.6 50" stroke="#E79A2A" stroke-width=".8" fill="none" opacity=".5"/><ellipse cx="80" cy="37.5" rx="6" ry="4.4" fill="#6B5891"/><circle cx="80" cy="31" r="5" fill="#7A66A2"/>`;
      o += `<circle cx="78" cy="31.6" r=".9" fill="#2E2440"/><circle cx="82" cy="31.6" r=".9" fill="#2E2440"/><path d="M78.8 33.6q1.2 1 2.4 0" stroke="#2E2440" stroke-width=".6" fill="none" stroke-linecap="round"/><circle cx="76.4" cy="33" r="1" fill="#F4A3B8" opacity=".7"/><circle cx="83.6" cy="33" r="1" fill="#F4A3B8" opacity=".7"/>`;
      o += `<path d="M77 26.6L76.6 23.4L78.4 25L80 22.6L81.6 25L83.4 23.4L83 26.6Z" fill="#F6C94E"/><path d="M78 27.5q-3 -4 -6 -4M82 27.5q3 -4 6 -4" stroke="#6B5891" stroke-width=".7" fill="none"/><circle cx="72" cy="23.5" r=".9" fill="#FFE27A"/><circle cx="88" cy="23.5" r=".9" fill="#FFE27A"/>`;
      [[30, 30, 0.9], [44, 18, 0.7], [52, 50, 0.8], [116, 22, 0.8], [110, 52, 0.9], [130, 36, 0.8], [24, 52, 0.7], [140, 56, 0.7], [62, 64, 0.8], [98, 66, 0.8]].forEach(([x, y, s]) => { o += ff(x, y, s); });
      o += spark(56, 28, 2.6, "#FFE9A0") + spark(104, 30, 2.2, "#FFE9A0") + spark(80, 66, 2, "#FFE9A0", 0.8);
      [[20, 74, 12], [50, 80, 10], [110, 80, 10], [140, 74, 12]].forEach(([x, y, r]) => { o += tree(x, y, r, "#24474F"); });
      o += `<path d="M0 90Q60 84 160 90V100H0Z" fill="#26473D"/>`;
    }
    return o;
  };

  /* ---------------- 2. Isola delle Conchiglie ---------------- */
  W.shells = (c, i) => {
    const sunset = i === 2;
    let o = `<rect width="160" height="100" fill="${sunset ? c.lin("#F39F8F", "#FCDDB2") : i === 3 ? c.lin("#9FDDF0", "#FFE4D6") : c.lin("#A6E2F0", "#FDEADC")}"/>`;
    const scallop = (x, y, s, col, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0L-8 -5Q-10 -11 -5 -14Q0 -16 5 -14Q10 -11 8 -5Z" fill="${col}"/><path d="M0 0L-5 -13M0 0L0 -15M0 0L5 -13M0 0L-8 -8M0 0L8 -8" stroke="#fff" stroke-width=".9" opacity=".55"/><path d="M-3 0H3L2 2H-2Z" fill="${col}"/></g>`;
    const snail = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0Q-8 -8 0 -9Q7 -9 7 -3Q7 1 1 0Z" fill="${col}"/><path d="M0 -6Q4 -6 3.6 -3Q3 -1 0 -2Q-1.6 -3 0 -4" stroke="#fff" stroke-width=".9" fill="none" opacity=".7"/><path d="M7 -3L11 -1L6 0Z" fill="${col}"/></g>`;
    const star = (x, y, s, col, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 -6L1.6 -1.8L6 -1.6L2.4 1.2L3.8 5.6L0 3L-3.8 5.6L-2.4 1.2L-6 -1.6L-1.6 -1.8Z" fill="${col}" stroke="${col}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="0" cy="0" r=".7" fill="#fff" opacity=".7"/><circle cx="0" cy="-3" r=".5" fill="#fff" opacity=".6"/></g>`;
    const palm = (x, y, h) => `<path d="M${x} ${y}Q${x + 3} ${R(y - h / 2)} ${x + 1} ${y - h}" stroke="#9A7050" stroke-width="2" fill="none"/><path d="M${x + 1} ${y - h}q-9 -2 -12 5M${x + 1} ${y - h}q9 -3 12 4M${x + 1} ${y - h}q-4 -7 -11 -7M${x + 1} ${y - h}q6 -7 12 -5" stroke="#5DAE76" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    if (sunset) {
      o += `<circle cx="112" cy="52" r="22" fill="#FFE6A8" opacity=".35"/><circle cx="112" cy="52" r="13" fill="#FFE3A0"/>`;
      o += `<rect x="0" y="52" width="160" height="48" fill="${c.lin("#62B5C6", "#357FA6")}"/><path d="M96 56H128M100 60H124M104 64H120" stroke="#FFE3A0" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>`;
      o += cloud(34, 26, 1.1, "#FFE9DC", 0.7) + cloud(140, 18, 0.8, "#FFE9DC", 0.6);
      o += `<path d="M0 54Q30 52 60 54" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/>`;
      o += `<g transform="translate(66 78)"><ellipse cx="0" cy="13" rx="18" ry="2" fill="#1F5F80" opacity=".35"/><path d="M-8 4Q-16 10 -20 6Q-16 2 -9 1Z" fill="#7CC596"/><path d="M8 4Q14 12 10 14Q6 9 4 4Z" fill="#7CC596"/><path d="M-16 1Q-14 -12 0 -12Q14 -12 16 1Q0 5 -16 1Z" fill="#6FAE7C"/><path d="M-9 -2Q-8 -8 -2 -8Q2 -2 -2 1Q-7 1 -9 -2ZM1 -8Q8 -9 10 -2Q8 1 3 1Q0 -3 1 -8Z" fill="#93CC93"/><path d="M-15 1Q0 5 15 1Q12 5 0 5Q-12 5 -15 1Z" fill="#F2E2B0"/><path d="M-6 -1Q-10 -10 -1 -6M5 -3l4 -4" stroke="#5E9A6C" stroke-width=".8" fill="none"/><path d="M8 -6Q16 -16 20 -10Q16 -6 9 -2Z" fill="#7CC596"/><circle cx="21" cy="-3" r="4.6" fill="#93D3A2"/><circle cx="22.6" cy="-4.2" r=".9" fill="#2E3A33"/><path d="M21.4 -1.2q1.4 1 2.6 -.2" stroke="#2E3A33" stroke-width=".6" fill="none" stroke-linecap="round"/><path d="M-14 -4Q-6 -12 6 -10" stroke="#fff" stroke-width="1.2" fill="none" opacity=".3" stroke-linecap="round"/></g>`;
      o += dots([[92, 70], [96, 64, 0.7], [94, 58, 0.5]], 1.4, "#E6F7FA", 0.7) + `<path d="M14 72q6 -2 12 0M120 84q6 -2 12 0M30 92q8 -2 16 0" stroke="#B9E6EE" stroke-width="1" fill="none" opacity=".6" stroke-linecap="round"/>`;
      return o;
    }
    o += `<rect x="0" y="50" width="160" height="26" fill="${c.lin("#78D6D6", "#56BCC9")}"/><path d="M8 56q6 -2 12 0M50 60q6 -2 12 0M108 55q6 -2 12 0M140 61q6 -2 12 0" stroke="#fff" stroke-width="1" fill="none" opacity=".6" stroke-linecap="round"/>`;
    if (i !== 3) o += `<path d="M14 51Q24 44 36 51Z" fill="#9BD17E"/>` + palm(24, 49, 12);
    o += `<path d="M0 72Q60 64 110 70T160 67V100H0Z" fill="#BCEAE6" opacity=".8"/><path d="M0 75Q60 68 110 73T160 71V100H0Z" fill="#F8DCC2"/><path d="M0 88Q70 80 160 90V100H0Z" fill="#F3CFB2" opacity=".6"/>`;
    if (i === 0) {
      o += `<ellipse cx="54" cy="86" rx="24" ry="7" fill="#D8B6B4"/><ellipse cx="54" cy="86" rx="19" ry="4.6" fill="#9FE0E2"/><path d="M42 85q6 -2 12 0" stroke="#fff" stroke-width=".9" opacity=".7" fill="none"/>`;
      o += `<ellipse cx="116" cy="82" rx="20" ry="6" fill="#CDA9AE"/><ellipse cx="116" cy="82" rx="15" ry="4" fill="#A9E6E6"/><path d="M108 81q5 -2 10 0" stroke="#fff" stroke-width=".9" opacity=".7" fill="none"/>`;
      o += `<ellipse cx="32" cy="82" rx="6" ry="4" fill="#C9A2A6"/><ellipse cx="78" cy="88" rx="5" ry="3.4" fill="#BF9CA2"/><ellipse cx="136" cy="80" rx="5" ry="3.6" fill="#BE98A0"/>`;
      o += star(50, 86, 0.8, "#F2928A", 14) + scallop(62, 88, 0.42, "#F8B8C6", -10) + snail(118, 83, 0.55, "#F6C79A") + scallop(96, 94, 0.5, "#F4A6A0", 12) + star(140, 92, 0.65, "#F6B26B", -12) + snail(24, 94, 0.5, "#E9B7D8");
    } else if (i === 1) {
      o += `<ellipse cx="80" cy="90" rx="34" ry="4" fill="#D7AE86" opacity=".5"/>`;
      o += `<rect x="62" y="66" width="36" height="24" fill="#F0C995"/><rect x="56" y="58" width="12" height="32" fill="#EDC28C"/><rect x="92" y="58" width="12" height="32" fill="#EDC28C"/><rect x="73" y="50" width="14" height="40" fill="#F3CF9E"/>`;
      o += `<path d="M56 58v-3h3v3h3v-3h3v3h3v3H56ZM92 58v-3h3v3h3v-3h3v3h3v3H92ZM73 50v-3h3.5v3h3v-3h3v3h4.5v3H73Z" fill="#F3CF9E"/><rect x="62" y="66" width="36" height="2" fill="#000" opacity=".06"/>`;
      o += `<rect x="92" y="58" width="12" height="32" fill="#000" opacity=".07"/><rect x="82" y="50" width="5" height="40" fill="#000" opacity=".06"/><path d="M75 90V82a5 5 0 0 1 10 0V90Z" fill="#C9965E"/><circle cx="62" cy="70" r="1.6" fill="#C9965E"/><circle cx="98" cy="70" r="1.6" fill="#C9965E"/><rect x="78.6" y="56" width="3" height="4" rx="1.5" fill="#C9965E"/>`;
      o += `<path d="M80 47V33" stroke="#9A7050" stroke-width="1"/><path d="M80.4 33L91 36L80.4 39Z" fill="#F27A6E"/>`;
      o += scallop(66, 78, 0.3, "#F8B8C6") + scallop(94, 78, 0.3, "#F6C79A") + scallop(80, 64, 0.26, "#F4A6A0");
      o += `<path d="M30 80H42L40 92H32Z" fill="#6FB6E8"/><path d="M30 80Q36 72 42 80" stroke="#4E95C8" stroke-width="1" fill="none"/><rect x="29" y="79" width="14" height="2.4" rx="1.2" fill="#8FCAF0"/>`;
      o += star(126, 88, 0.7, "#F2928A", 20) + snail(140, 94, 0.5, "#F6C79A");
    } else {
      o += `<circle cx="80" cy="68" r="34" fill="${c.glow("#FFF3C4", 0.75)}"/>`;
      let fan = "M44 78", R0 = 36, n = 9;
      for (let k = 0; k < n; k++) { const a0 = Math.PI + Math.PI * k / n, a1 = Math.PI + Math.PI * (k + 1) / n, am = (a0 + a1) / 2; fan += `Q${R(80 + (R0 + 4) * Math.cos(am))} ${R(78 + (R0 + 4) * Math.sin(am) * 0.95)} ${R(80 + R0 * Math.cos(a1))} ${R(78 + R0 * Math.sin(a1) * 0.95)}`; }
      o += `<path d="${fan}L80 82Z" fill="${c.lin("#FFD6DE", "#F4A9BC")}"/>`;
      let ribs = "";
      for (let k = 1; k < n; k++) { const a = Math.PI + Math.PI * k / n; ribs += `M80 80L${R(80 + (R0 - 2) * Math.cos(a))} ${R(78 + (R0 - 2) * Math.sin(a) * 0.95)}`; }
      o += `<path d="${ribs}" stroke="#fff" stroke-width="1.1" opacity=".55"/><path d="M50 72Q80 60 110 72" stroke="#E68FA6" stroke-width="1" fill="none" opacity=".4"/>`;
      o += `<path d="M42 78Q80 102 118 78Q80 88 42 78Z" fill="#EE9AAE"/><path d="M52 83L60 91M66 86L69 94M80 88V96M94 86L91 94M108 83L100 91" stroke="#fff" stroke-width=".9" opacity=".45"/>`;
      o += `<ellipse cx="80" cy="80" rx="14" ry="3" fill="#C9707F" opacity=".35"/><circle cx="80" cy="72" r="16" fill="${c.glow("#FFFFFF", 0.9)}"/><circle cx="80" cy="73" r="8" fill="${c.ball("#FFFFFF", "#E8C6E0")}"/><circle cx="77.2" cy="70.2" r="2.2" fill="#fff" opacity=".9"/>`;
      o += spark(98, 58, 4.4, "#FFE7A0") + spark(60, 60, 3, "#FFE7A0") + spark(108, 70, 2.4, "#fff") + spark(88, 46, 2.6, "#fff", 0.9) + spark(34, 34, 2.6, "#FFE7A0", 0.9) + spark(128, 28, 3, "#FFE7A0", 0.9);
      o += star(24, 90, 0.8, "#F2928A", -8) + scallop(140, 92, 0.45, "#F6C79A", 8) + snail(132, 84, 0.45, "#E9B7D8");
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 3. Valle dei Funghi Giganti ---------------- */
  W.mushrooms = (c, i) => {
    const sky = [["#D7C9F0", "#FCE4D2"], ["#B7C2D9", "#E6E1EE"], ["#232756", "#4D3E7C"], ["#F7CDE0", "#FFF0D4"]][i];
    let o = `<rect width="160" height="100" fill="${c.lin(sky[0], sky[1])}"/>`;
    const hill = i === 2 ? "#33466A" : i === 1 ? "#9DBB9E" : "#B5D8A2", ground = i === 2 ? "#2B3B5C" : i === 1 ? "#86B08A" : "#9ACA85";
    if (i === 2) o += starField(7, 16, 4, 156, 4, 40, 0.8);
    o += `<path d="M0 70Q30 58 64 66T124 60T160 64V100H0Z" fill="${hill}"/>`;
    if (i !== 2) o += mush(14, 68, 6, 2, 6, 4, i === 1 ? "#B79BC2" : "#F3B7C6", "#F6E9D4", false) + mush(148, 64, 7, 2.4, 7, 5, i === 1 ? "#B79BC2" : "#F6C68E", "#F6E9D4", false);
    o += `<path d="M0 82Q50 74 100 80T160 78V100H0Z" fill="${ground}"/>`;
    if (i === 0) {
      o += `<path d="M76 100Q72 92 80 88" stroke="#EADAB6" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M40 92Q56 94 76 96" stroke="#EADAB6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      const win = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r + 0.8}" fill="#C9A27A"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFE3A0"/><path d="M${x - r} ${y}H${x + r}M${x} ${y - r}V${y + r}" stroke="#C9A27A" stroke-width=".7"/>`;
      const door = (x, y, w, h) => `<path d="M${x - w} ${y}V${y - h + w}a${w} ${w} 0 0 1 ${2 * w} 0V${y}Z" fill="#A9745A"/><circle cx="${x + w * 0.5}" cy="${y - h * 0.45}" r=".6" fill="#F2C463"/>`;
      o += mush(38, 92, 20, 8, 19, 13, "#F2A65E") + win(36, 82, 2.6) + door(42, 92, 2.8, 8);
      o += mush(124, 90, 24, 9, 21, 15, "#E98AA8") + win(120.6, 76, 2.8) + win(128.6, 80, 1.8) + door(124, 90, 3, 9);
      o += mush(80, 89, 30, 11, 28, 19, "#E8706A") + win(76, 70, 3.2) + win(85, 76, 2.6) + door(80, 89, 3.6, 11);
      o += `<path d="M90 53V45h4.4v6.4Z" fill="#B86A5A"/><rect x="89.2" y="44" width="6" height="2" rx=".6" fill="#9A5848"/><circle cx="93" cy="40" r="2" fill="#fff" opacity=".6"/><circle cx="96" cy="35" r="2.6" fill="#fff" opacity=".45"/>`;
      o += dots([[56, 94], [100, 95], [140, 96], [20, 96], [110, 90]], 1.3, "#FFF4C8") + dots([[56, 94], [100, 95], [140, 96], [20, 96], [110, 90]], 0.6, "#F2A65E");
    } else if (i === 1) {
      o += `<path d="M50 100Q62 88 86 86Q108 84 116 76" stroke="#D9CDB0" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      o += mush(84, 90, 38, 7, 52, 22, "#C47FB2");
      o += `<path d="M38 52Q84 62 130 52L130 56Q84 66 38 56Z" fill="#000" opacity=".06"/>`;
      let rain = "";
      for (let y = 6; y < 100; y += 9) for (let x = (y * 7) % 13; x < 160; x += 13) { const under = x > 30 && x < 138 && y > 30; if (!under) rain += `M${x} ${y}l-1.6 4.4`; }
      o += `<path d="${rain}" stroke="#7E98C8" stroke-width="1.1" opacity=".75" stroke-linecap="round"/>`;
      o += `<ellipse cx="22" cy="94" rx="10" ry="2" fill="#A7BEDC" opacity=".8"/><ellipse cx="146" cy="90" rx="9" ry="1.8" fill="#A7BEDC" opacity=".8"/><path d="M18 94q4 -1 8 0" stroke="#fff" stroke-width=".7" opacity=".7" fill="none"/>`;
      o += dots([[34, 42], [134, 40], [33, 48], [135, 47]], 0.9, "#9DB4DE", 0.9);
      o += mush(62, 92, 4, 1.6, 4.4, 3, "#E2574F") + mush(104, 91, 5, 2, 5, 3.4, "#F2A65E");
    } else if (i === 2) {
      const gc = c.glow("#7FE6F8", 0.55), sp = c.sym(`<circle r="4" fill="${c.glow("#BFF4FF", 0.8)}"/><circle r=".9" fill="#E6FBFF"/>`);
      o += `<ellipse cx="46" cy="60" rx="34" ry="30" fill="${gc}"/><ellipse cx="118" cy="62" rx="30" ry="28" fill="${gc}"/>`;
      o += mush(46, 90, 22, 6, 22, 14, "#5EC6DE", "#C9D8F0") + mush(118, 90, 18, 5, 17, 11, "#7FB7EE", "#C9D8F0") + mush(84, 92, 8, 2.6, 8, 5.4, "#62D3D0", "#C9D8F0") + mush(140, 92, 6, 2, 6, 4, "#5EC6DE", "#C9D8F0");
      [[40, 46], [52, 36], [44, 26], [60, 22], [56, 50], [34, 34], [112, 42], [124, 32], [116, 22], [104, 30], [130, 48], [80, 40], [88, 28], [74, 18], [96, 50], [70, 56]].forEach(([x, y], k) => { o += sp(x, y, 0.6 + (k % 4) * 0.18); });
      o += `<circle cx="140" cy="18" r="6" fill="#F4EFD6"/><circle cx="143" cy="16" r="5.4" fill="#2C2C5E"/>`;
    } else {
      o += `<circle cx="80" cy="40" r="46" fill="${c.glow("#FFE7A0", 0.7)}"/>`;
      const cols = ["#F59A9A", "#F8BE88", "#F6DE8C", "#A9DBA0", "#9CC8EE", "#C3A8EE"];
      o += `<path d="M71 90Q72 74 74 58H86Q88 74 89 90Z" fill="#F6E9D4"/><path d="M83 58H86Q88 74 89 90H85Z" fill="#000" opacity=".06"/><ellipse cx="80" cy="91" rx="20" ry="2.4" fill="#000" opacity=".1"/>`;
      cols.forEach((col, k) => { const w = 48 - k * 6.2, h = 32 - k * 4.4; o += `<path d="M${R(80 - w)} 58C${R(80 - w)} ${R(58 - h * 1.33)} ${R(80 + w)} ${R(58 - h * 1.33)} ${R(80 + w)} 58Z" fill="${col}"/>`; });
      o += `<path d="M32 58Q80 68 128 58Q80 63 32 58Z" fill="#F0D9C2"/><path d="M48 44Q58 26 78 22" stroke="#fff" stroke-width="2.6" fill="none" opacity=".4" stroke-linecap="round"/>`;
      o += dots([[56, 42, 1.2], [100, 36, 1], [116, 48, 0.8], [76, 30, 0.9], [42, 52, 0.7]], 2.6, "#fff", 0.85);
      o += mush(30, 92, 8, 3, 8, 5.4, "#E8706A") + mush(42, 94, 5, 2, 5, 3.4, "#F2A65E") + mush(132, 92, 9, 3, 9, 6, "#E98AA8") + mush(120, 95, 4, 1.6, 4.4, 3, "#C3A8EE");
      o += spark(26, 26, 4, "#F6C94E") + spark(134, 22, 3.6, "#F6C94E") + spark(140, 58, 2.4, "#fff") + spark(18, 58, 2.6, "#fff") + spark(110, 12, 2.4, "#F6C94E", 0.8);
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 4. Biblioteca Sospesa ---------------- */
  W.library = (c, i) => {
    const sky = [["#BFD2F6", "#F7E2EC"], ["#C6DAF8", "#FBEADF"], ["#8E9BD8", "#F4CFDC"], ["#B6C3F2", "#FCE6CF"]][i];
    let o = `<rect width="160" height="100" fill="${c.lin(sky[0], sky[1])}"/>`;
    const BC = ["#E98B7F", "#7FB3D5", "#F2C46D", "#93C79A", "#B79BE0", "#F2A3C0"];
    if (i === 0) {
      o += cloud(24, 30, 1.1, "#fff", 0.6) + cloud(66, 16, 0.8, "#fff", 0.55) + cloud(142, 70, 1, "#fff", 0.6);
      for (let k = 0; k < 8; k++) o += book(R(8 + k * 13.5), R(86 - k * 8.6), 24, 7, BC[k % 6], k % 2 ? 1.5 : -1.5);
      o += `<g fill="#fff"><ellipse cx="132" cy="22" rx="28" ry="9"/><circle cx="118" cy="16" r="9"/><circle cx="134" cy="11" r="12"/><circle cx="150" cy="17" r="8"/></g><ellipse cx="132" cy="27" rx="24" ry="3" fill="#D9E2F4" opacity=".7"/>`;
      o += spark(102, 6, 2.4, "#FFE9A0") + spark(30, 52, 2, "#fff") + spark(78, 34, 1.8, "#fff");
      o += book(116, 52, 16, 5, BC[4], -18) + book(140, 44, 12, 4.4, BC[0], 14) + book(18, 18, 14, 4.6, BC[2], 10);
    } else if (i === 1) {
      o += cloud(130, 24, 1, "#fff", 0.6) + cloud(28, 18, 0.9, "#fff", 0.55);
      o += `<g fill="#fff" opacity=".95"><ellipse cx="70" cy="88" rx="34" ry="7"/><circle cx="52" cy="84" r="8"/><circle cx="70" cy="80" r="10"/><circle cx="88" cy="83" r="8"/></g>`;
      o += openBook(70, 72, 1.1, "#7FB3D5");
      o += paperBird(84, 62, 0.8, -20) + paperBird(96, 50, 0.95, -14) + paperBird(104, 36, 1.05, -8) + paperBird(120, 28, 1.15, -4) + paperBird(138, 18, 1.25, 0) + paperBird(76, 54, 0.6, -30) + paperBird(116, 46, 0.75, -12);
      o += `<path d="M76 66Q90 46 136 16" stroke="#fff" stroke-width=".8" fill="none" stroke-dasharray="1.6 2.4" opacity=".7"/>`;
      o += book(20, 56, 15, 5, BC[2], -12) + book(140, 66, 14, 4.6, BC[5], 10) + book(38, 30, 12, 4.4, BC[3], 18);
    } else if (i === 2) {
      o += starField(4, 12, 4, 156, 4, 36, 0.8, "#FFFFFF") + `<circle cx="132" cy="18" r="7" fill="#FFF3CF"/><circle cx="135.4" cy="15.6" r="6.2" fill="#9AA6DB"/>`;
      o += `<circle cx="104" cy="58" r="30" fill="${c.glow("#FFD58A", 0.6)}"/>`;
      o += `<g fill="#fff"><ellipse cx="80" cy="82" rx="54" ry="10"/><circle cx="44" cy="76" r="11"/><circle cx="66" cy="70" r="14"/><circle cx="94" cy="70" r="13"/><circle cx="116" cy="76" r="11"/></g><ellipse cx="80" cy="89" rx="48" ry="4" fill="#D6DAF0" opacity=".8"/>`;
      o += `<path d="M58 72V54Q58 46 66 46H82Q90 46 90 54V72Z" fill="#F29AA0"/><rect x="54" y="62" width="40" height="12" rx="5" fill="#EE8890"/><rect x="51" y="58" width="9" height="16" rx="4.5" fill="#F4A6AC"/><rect x="88" y="58" width="9" height="16" rx="4.5" fill="#F4A6AC"/><rect x="60" y="60" width="28" height="4" rx="2" fill="#FBD3D6"/><path d="M62 50Q66 48 72 48" stroke="#fff" stroke-width="1.4" opacity=".4" fill="none" stroke-linecap="round"/>`;
      o += `<path d="M106 76V46" stroke="#7A6A8A" stroke-width="1.4"/><ellipse cx="106" cy="76" rx="5" ry="1.4" fill="#7A6A8A"/><path d="M99 46L101.5 38H110.5L113 46Z" fill="#FFD58A"/><path d="M99 46H113" stroke="#F2B85E" stroke-width="1"/>`;
      o += book(112, 69, 14, 4.4, BC[1]) + book(113, 64.6, 12, 4.4, BC[3]) + book(111, 60.2, 13, 4.4, BC[0]) + cup(122, 76, "#FFF5E6", 0.8);
      o += book(24, 30, 14, 4.6, BC[4], -14) + book(140, 44, 12, 4.4, BC[2], 16) + book(36, 52, 10, 4, BC[5], 8);
    } else {
      o += `<circle cx="80" cy="52" r="48" fill="${c.glow("#FFE08A", 0.75)}"/>`;
      let rays = "";
      for (let k = 0; k < 9; k++) { const a = Math.PI + Math.PI * (k + 0.5) / 9, a1 = a - 0.07, a2 = a + 0.07; rays += `M80 52L${R(80 + 70 * Math.cos(a1))} ${R(52 + 70 * Math.sin(a1))}L${R(80 + 70 * Math.cos(a2))} ${R(52 + 70 * Math.sin(a2))}Z`; }
      o += `<path d="${rays}" fill="#FFF2C0" opacity=".45"/>`;
      o += cloud(28, 82, 1.3, "#fff", 0.8) + cloud(134, 84, 1.4, "#fff", 0.8);
      o += openBook(80, 58, 1.55, "#D99A2E", "#FFF1C2", "#E8C068");
      o += `<path d="M48 60L80 66L112 60V62L80 68L48 62Z" fill="#F6C94E" opacity=".9"/><circle cx="80" cy="56" r="6" fill="${c.glow("#FFFFFF", 0.95)}"/>`;
      o += spark(80, 40, 4.6, "#FFE7A0") + spark(64, 34, 2.6, "#fff") + spark(98, 32, 3, "#FFE7A0") + spark(56, 46, 2, "#fff", 0.9) + spark(106, 46, 2.2, "#fff", 0.9) + spark(88, 24, 2, "#fff", 0.8) + spark(72, 22, 1.6, "#FFE7A0");
      o += book(18, 30, 15, 5, BC[0], -16) + book(132, 22, 14, 4.6, BC[1], 14) + book(24, 58, 12, 4.4, BC[4], 10) + book(130, 56, 13, 4.6, BC[3], -10);
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 5. Giardino di Cristallo ---------------- */
  W.crystal = (c, i) => {
    const sky = [["#CFF0EA", "#EEE1FA"], ["#5E5FA0", "#D3BFEA"], ["#2E2A58", "#544682"], ["#DCD0F8", "#FDE6EE"]][i];
    let o = `<rect width="160" height="100" fill="${c.lin(sky[0], sky[1])}"/>`;
    const A = ["#A6E6EE", "#6FC9DA"], P = ["#F9C3DA", "#EC9DC0"], L = ["#D4C3F6", "#AD95E6"];
    if (i === 0) {
      o += `<path d="M0 66Q40 56 80 62T160 58V100H0Z" fill="#C9E9DC"/><path d="M0 78Q50 70 100 76T160 74V100H0Z" fill="#AEDDC8"/>`;
      o += shard(24, 64, 3, 12, ...L) + shard(30, 64, 2, 8, ...A) + shard(140, 60, 3, 14, ...P) + shard(146, 60, 2, 8, ...L);
      const flower = (x, y, h, col, s) => { let f = `<path d="M${x} ${y}Q${x - 3} ${R(y - h / 2)} ${x} ${y - h}" stroke="#7CC29A" stroke-width="1.6" fill="none"/><path d="M${x - 1} ${R(y - h * 0.4)}q-6 -2 -7 -7q5 0 7 5Z" fill="#8FD0A8"/>`; const cy = y - h + 2 * s; return f + c.once("cf" + col[0], shard(0, 0, 2.6, 9, col[0], col[1], -32) + shard(0, 0, 2.6, 9, col[0], col[1], 32) + shard(0, 0, 3, 12, col[0], col[1]) + spark(0, -14, 2, "#fff"))(x, cy, s); };
      o += flower(44, 92, 22, A, 1) + flower(80, 94, 28, P, 1.15) + flower(116, 92, 20, L, 0.95) + flower(62, 96, 12, L, 0.7) + flower(100, 97, 14, A, 0.75) + flower(140, 96, 12, P, 0.7) + flower(20, 97, 12, P, 0.7);
      o += spark(56, 30, 2.2, "#fff") + spark(124, 34, 2.6, "#fff") + spark(92, 18, 1.8, "#fff");
    } else if (i === 1) {
      o += starField(3, 8, 4, 156, 4, 30, 0.7, "#FFFFFF");
      o += `<path d="M0 80Q40 68 80 72T160 70V100H0Z" fill="#8EC8C2"/><path d="M0 90Q60 82 160 92V100H0Z" fill="#7DBDB4"/>`;
      o += `<path d="M0 44L70 47L70 51L0 50Z" fill="#fff" opacity=".85"/><path d="M0 43L70 46L70 52L0 52Z" fill="#fff" opacity=".2"/>`;
      ["#F59A9A", "#F8BE88", "#F6DE8C", "#A9DBA0", "#9CC8EE", "#C3A8EE"].forEach((col, k) => { o += `<path d="M88 ${R(50 + k * 0.8)}L88 ${R(50.8 + k * 0.8)}L162 ${R(48 + (k + 1) * 6.4)}L162 ${R(48 + k * 6.4)}Z" fill="${col}" opacity=".85"/>`; });
      o += `<path d="M78 30L62 72H94Z" fill="#E9F6FA" opacity=".75"/><path d="M78 30L94 72H82Z" fill="#B9DDEB" opacity=".7"/><path d="M78 30L66 64" stroke="#fff" stroke-width="1.6" opacity=".8" stroke-linecap="round"/><ellipse cx="78" cy="73" rx="18" ry="2.4" fill="#000" opacity=".1"/>`;
      o += shard(20, 84, 3, 12, ...A) + shard(27, 84, 2, 8, ...L) + shard(132, 88, 3, 10, ...P);
      o += spark(78, 30, 3.4, "#fff") + spark(110, 22, 2, "#fff", 0.8);
    } else if (i === 2) {
      o += `<ellipse cx="80" cy="56" rx="56" ry="38" fill="${c.glow("#9C8AE0", 0.7)}"/>`;
      o += `<path d="M0 0H160V22Q150 14 140 26Q128 12 116 20Q102 8 88 18Q76 6 62 18Q48 10 36 22Q20 12 10 24Q4 16 0 20Z" fill="#221E48"/>`;
      o += shard(40, 18, 3, 12, ...L, 180) + shard(52, 20, 2, 8, ...A, 180) + shard(98, 16, 3, 13, ...A, 180) + shard(122, 20, 2.4, 9, ...P, 180) + shard(140, 22, 2, 7, ...L, 180);
      o += `<path d="M0 100V78Q20 70 40 76Q60 70 80 74Q100 68 120 74Q140 70 160 76V100Z" fill="#2B2656"/><path d="M0 0V100H10Q4 60 12 30Q8 12 0 0ZM160 0V100H150Q156 60 148 30Q152 12 160 0Z" fill="#221E48"/>`;
      o += shard(36, 80, 5, 22, ...A, -8) + shard(46, 80, 4, 15, ...L, 10) + shard(28, 82, 3, 11, ...P, -18);
      o += shard(114, 78, 5, 24, ...P, 6) + shard(124, 80, 4, 15, ...A, 18) + shard(104, 80, 3, 11, ...L, -14);
      o += shard(78, 84, 3.6, 13, ...L, -4) + shard(86, 84, 2.6, 9, ...A, 12);
      o += spark(36, 50, 2.6, "#fff") + spark(116, 46, 3, "#fff") + spark(78, 66, 2, "#fff") + spark(60, 40, 1.6, "#fff", 0.8) + spark(98, 34, 1.8, "#fff", 0.8) + spark(130, 64, 1.6, "#fff", 0.8) + spark(48, 70, 1.4, "#fff", 0.7);
    } else {
      o += `<circle cx="80" cy="40" r="42" fill="${c.glow("#FFD3E6", 0.85)}"/>`;
      let rays = "";
      for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2, a1 = a - 0.06, a2 = a + 0.06; rays += `M80 40L${R(80 + 60 * Math.cos(a1))} ${R(40 + 60 * Math.sin(a1))}L${R(80 + 60 * Math.cos(a2))} ${R(40 + 60 * Math.sin(a2))}Z`; }
      o += `<path d="${rays}" fill="#fff" opacity=".35"/>`;
      o += `<path d="M0 84Q80 76 160 84V100H0Z" fill="#CDEBE0"/>`;
      o += `<rect x="68" y="66" width="24" height="5" rx="2" fill="#F4F0FA"/><rect x="71" y="70" width="18" height="18" fill="#ECE6F6"/><path d="M75 70V88M80 70V88M85 70V88" stroke="#D6CCE8" stroke-width="1"/><rect x="66" y="87" width="28" height="5" rx="2" fill="#F4F0FA"/><rect x="85" y="70" width="4" height="18" fill="#000" opacity=".05"/>`;
      o += `<path d="M80 62C62 52 58 30 70 26C75 24.4 79 27 80 32C81 27 85 24.4 90 26C102 30 98 52 80 62Z" fill="#F7A8C8"/><path d="M80 62C98 52 102 30 90 26C85 24.4 81 27 80 32Z" fill="#E784AE"/>`;
      o += `<path d="M80 32L74 44L80 62M80 32L86 44L80 62M66 38L74 44L86 44L95 38" stroke="#fff" stroke-width=".8" fill="none" opacity=".55" stroke-linejoin="round"/><path d="M68 32Q70 28 74 28" stroke="#fff" stroke-width="2" fill="none" opacity=".8" stroke-linecap="round"/>`;
      o += shard(30, 88, 3.6, 14, ...A, -10) + shard(38, 88, 2.4, 9, ...L, 8) + shard(124, 88, 3.6, 15, ...L, 8) + shard(132, 89, 2.4, 9, ...P, -12);
      o += spark(60, 22, 3.4, "#F6C94E") + spark(104, 20, 4, "#F6C94E") + spark(106, 52, 2.4, "#fff") + spark(54, 54, 2.6, "#fff") + spark(80, 12, 2, "#fff", 0.9) + spark(22, 46, 2.4, "#F6C94E", 0.9) + spark(140, 40, 2.4, "#F6C94E", 0.9);
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 6. Mare di Stelle ---------------- */
  W.starsea = (c, i) => {
    let o = `<rect width="160" height="100" fill="${i === 3 ? c.lin("#1E1A52", "#4A3F8A") : c.lin("#141A46", "#3B3F82")}"/>`;
    o += starField(21 + i, 26, 2, 158, 2, 52, 0.9) + spark(28, 14, 2, "#FFF6D6") + spark(122, 10, 1.6, "#FFF6D6");
    o += `<rect x="0" y="56" width="160" height="44" fill="${c.lin("#2A3474", "#121842")}"/><path d="M0 56H160" stroke="#8A9AE0" stroke-width=".6" opacity=".5"/>`;
    o += glints(41 + i, 16, 4, 152, 60, 98, "#FFF8DC", 0.8, 0.55);
    if (i === 0) {
      o += `<circle cx="96" cy="50" r="22" fill="${c.glow("#FFD27A", 0.55)}"/><path d="M90 76H102M88 82H104M92 88H100M94 94H98" stroke="#FFD27A" stroke-width="1.6" opacity=".65" stroke-linecap="round"/>`;
      o += `<path d="M56 70H106Q100 80 82 80Q62 80 56 70Z" fill="#C98A6A"/><path d="M56 70H106L104 73H58Z" fill="#E6AC86"/><path d="M60 75Q80 79 100 75" stroke="#A86E52" stroke-width=".8" fill="none"/>`;
      o += `<path d="M96 70V42" stroke="#8A6A56" stroke-width="1.4"/><path d="M96 42H90" stroke="#8A6A56" stroke-width="1"/><path d="M90 42V45" stroke="#8A6A56" stroke-width=".6"/><rect x="87" y="45" width="6" height="7" rx="1.4" fill="#FFD27A"/><rect x="88.4" y="46.4" width="3.2" height="4.2" fill="#FFF3C4"/><path d="M86.4 45H93.6L92 43.6H88Z" fill="#8A6A56"/>`;
      o += `<path d="M40 84q6 -2 12 0M112 88q6 -2 12 0M24 76q5 -2 10 0" stroke="#8A9AE0" stroke-width=".9" fill="none" opacity=".6" stroke-linecap="round"/>`;
    } else if (i === 1) {
      o += `<circle cx="80" cy="32" r="26" fill="${c.glow("#FFF2C4", 0.55)}"/><circle cx="80" cy="32" r="12" fill="#FFF2C4"/><circle cx="76" cy="29" r="2.4" fill="#E9DDB0" opacity=".6"/><circle cx="84" cy="35" r="1.6" fill="#E9DDB0" opacity=".6"/>`;
      o += `<ellipse cx="80" cy="76" rx="26" ry="22" fill="${c.glow("#FFF2C4", 0.28)}"/>`;
      o += `<path d="${[[78, 59, 4], [74, 63, 3], [83, 64, 5], [70, 69, 4], [80, 70, 6], [88, 74, 4], [66, 76, 5], [77, 78, 7], [92, 82, 5], [62, 85, 6], [74, 88, 8], [94, 91, 6], [58, 95, 7], [80, 97, 9], [100, 96, 5]].map(([x, y, w]) => `M${x} ${y}h${w}`).join("")}" stroke="#FFF8DC" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>`;
      o += cloud(30, 30, 1, "#6E6AAE", 0.5) + cloud(132, 22, 0.9, "#6E6AAE", 0.45);
    } else if (i === 2) {
      const shoot = (x, y, len, ang, s) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 -1.2L${len} -.1V.1L0 1.2Z" fill="${c.lin("#FFFFFF", "#FFFFFF", 1, 0, 0.95, 0)}"/>${spark(0, 0, 3.4 * s, "#FFF6D6")}</g>`;
      o += shoot(48, 18, 40, 200, 1) + shoot(110, 30, 52, 205, 1.2) + shoot(136, 12, 30, 198, 0.8) + shoot(76, 42, 26, 210, 0.7);
      o += `<path d="M48 64l-10 -1M110 70l-14 -2M76 80l-8 -1" stroke="#FFF6D6" stroke-width="1" opacity=".35" stroke-linecap="round"/>`;
      o += `<path d="M0 100V88Q14 80 28 86Q36 82 44 88V100Z" fill="#0E1334"/><path d="M128 100V90Q140 84 160 86V100Z" fill="#0E1334"/>`;
    } else {
      o += `<circle cx="130" cy="20" r="9" fill="#FFF2C4"/><circle cx="134" cy="17" r="8" fill="#26205A"/><circle cx="80" cy="44" r="40" fill="${c.glow("#9FB0FF", 0.45)}"/>`;
      o += `<path d="M30 60Q40 56 50 60Q56 52 62 58Q70 52 80 58Q90 54 100 60Q108 54 118 60Q128 56 134 60" stroke="#BFD0FF" stroke-width="1.4" fill="none" opacity=".6" stroke-linecap="round"/>`;
      o += `<g transform="translate(78 44) rotate(-18)"><path d="M-33 2C-37 0 -40 -3 -42 -7C-47 -8 -52 -11 -55 -16C-49 -16.4 -45 -14 -42.6 -11.6C-43.6 -15.6 -42.6 -20 -39.6 -23.6C-37.4 -18 -36.4 -12 -34 -6Z" fill="#7584DA"/><path d="M-36 4C-32 -10 -14 -17 4 -17C22 -17 34 -7 34 4C34 12 24 17 8 17C-10 17 -26 12 -36 4Z" fill="#7E8EE2"/><path d="M-14 12C0 18 22 16 32 8C30 14 22 17 8 17C-4 17 -10 15 -14 12Z" fill="#CDD6FB"/><path d="M-10 13l2 -4M-2 15l2 -5M6 16l2 -5M14 15l2 -5M22 13l2 -4" stroke="#AAB6F0" stroke-width=".8" stroke-linecap="round"/><path d="M4 9Q0 17 -9 20Q-6 12 -1 8Z" fill="#919EEA"/><path d="M19 1q2.4 2 4.8 0" stroke="#2A2E5A" stroke-width="1.1" fill="none" stroke-linecap="round"/><ellipse cx="25" cy="6" rx="2.6" ry="1.4" fill="#F4A3C0" opacity=".7"/><path d="M28 9q2 1 3.6 -.4" stroke="#2A2E5A" stroke-width=".8" fill="none" stroke-linecap="round"/><path d="M-20 -6Q-6 -14 12 -12" stroke="#fff" stroke-width="1.6" fill="none" opacity=".3" stroke-linecap="round"/>${dots([[-22, -2], [-12, -9], [0, -11], [10, -6], [-4, -3], [-28, 2], [16, -11], [-16, 4], [4, 2]], 0.9, "#FFF6C8", 0.95)}${spark(-6, -8, 2, "#FFF6C8")}${spark(12, -2, 1.6, "#FFF6C8")}</g>`;
      o += `<path d="M22 62Q30 54 36 62Q42 54 48 62Q56 56 60 62Z" fill="#DCE4FF" opacity=".75"/><path d="M98 64Q106 56 112 64Q118 58 124 64Z" fill="#DCE4FF" opacity=".55"/>`;
      o += dots([[30, 50], [44, 48, 0.8], [26, 46, 0.6], [52, 52, 0.7], [106, 56, 0.6]], 1.4, "#E6EEFF", 0.85);
      o += spark(108, 32, 3, "#F6C94E") + spark(52, 22, 2.6, "#F6C94E") + spark(94, 18, 2, "#fff") + spark(140, 48, 2.4, "#F6C94E", 0.9);
      o += `<ellipse cx="70" cy="70" rx="34" ry="6" fill="${c.glow("#9FB0FF", 0.45)}"/>`;
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 7. Castello di Zucchero ---------------- */
  W.sugar = (c, i) => {
    let o = `<rect width="160" height="100" fill="${i === 3 ? c.lin("#FFC7DE", "#FFF2D6") : c.lin("#FFD3E5", "#FFF1DA")}"/>`;
    const castle = (x, y, s, op = 1) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><rect x="-14" y="-20" width="28" height="20" fill="#FAD0E0"/><rect x="-22" y="-28" width="9" height="28" fill="#F9C0D6"/><rect x="13" y="-28" width="9" height="28" fill="#F9C0D6"/><rect x="-5" y="-34" width="10" height="14" fill="#FBDAE7"/><path d="M-23.5 -28L-17.5 -40L-11.5 -28ZM11.5 -28L17.5 -40L23.5 -28ZM-6.5 -34L0 -46L6.5 -34Z" fill="#C7A6EE"/><path d="M0 -46V-51" stroke="#B48ADF" stroke-width=".8"/><path d="M0 -51L5 -49.4L0 -48Z" fill="#F7A3B5"/><path d="M-4 0V-7a4 4 0 0 1 8 0V0Z" fill="#E59AB6"/><path d="M-14 -20q3.5 4 7 0q3.5 4 7 0q3.5 4 7 0q3.5 4 7 0" fill="#fff" opacity=".85"/><circle cx="-17.5" cy="-20" r="1.6" fill="#fff" opacity=".8"/><circle cx="17.5" cy="-20" r="1.6" fill="#fff" opacity=".8"/></g>`;
    const sprinkles = (pts) => pts.map(([x, y, r], k) => `<path d="M${x} ${y}l${R(2.4 * Math.cos(r))} ${R(2.4 * Math.sin(r))}" stroke="${["#F27A9A", "#7FC8E8", "#F6CF5A", "#9ED89A", "#B79BE0"][k % 5]}" stroke-width="1.3" stroke-linecap="round"/>`).join("");
    if (i !== 3) o += cloud(28, 22, 0.9, "#fff", 0.6) + cloud(126, 16, 0.8, "#fff", 0.55);
    if (i === 0) {
      o += castle(80, 64, 0.7, 0.85) + `<path d="M0 68Q50 60 100 66T160 62V100H0Z" fill="#C4ECD8"/><path d="M0 84Q60 76 160 86V100H0Z" fill="#B0E3CB"/>`;
      const lolly = (x, y, h, r, col) => { let sp = ""; for (let k = 0; k <= 24; k++) { const t = k * 0.48, rr = r * 0.85 * k / 24; sp += (k ? "L" : "M") + R(x + rr * Math.cos(t)) + " " + R(y - h + rr * Math.sin(t)); } return `<rect x="${x - 0.9}" y="${y - h}" width="1.8" height="${h}" fill="#FFF8F0"/><circle cx="${x}" cy="${y - h}" r="${r}" fill="${col}"/><path d="${sp}" stroke="#fff" stroke-width="${R(r * 0.18)}" fill="none" opacity=".75" stroke-linecap="round"/><path d="M${x - 1} ${R(y - h + r + 0.4)}h2" stroke="#E2C9D6" stroke-width="1.4"/>`; };
      o += lolly(24, 90, 30, 12, "#F48FB1") + lolly(56, 92, 22, 9, "#8FD3E8") + lolly(110, 90, 26, 10, "#F6C65E") + lolly(138, 92, 34, 13, "#B79BE0");
      o += `<path d="M76 96a7 7 0 0 1 14 0Z" fill="#F27A9A"/><path d="M88 96a5 5 0 0 1 10 0Z" fill="#9ED89A"/><path d="M38 97a5 5 0 0 1 10 0Z" fill="#F6CF5A"/><circle cx="81" cy="91" r="1" fill="#fff" opacity=".6"/>`;
      o += sprinkles([[72, 80, 0.4], [96, 82, 2], [40, 76, 1.2], [124, 76, 2.6], [10, 80, 0.8], [150, 80, 1.6]]);
    } else if (i === 1) {
      o += castle(122, 56, 0.6, 0.85) + `<path d="M0 62Q50 54 100 60T160 56V100H0Z" fill="#F9C6D8"/>`;
      o += `<path d="M76 61Q70 66 66 72Q58 82 48 90Q40 96 42 100H118Q108 94 112 86Q118 76 102 70Q88 66 84 61Z" fill="#9A6A52"/><path d="M75 66q5 -1 9 0M68 76q8 -2 14 0M88 79q8 -2 14 0M56 90q10 -2 18 0M84 94q10 -2 18 0" stroke="#B88468" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
      const mm = (x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-4" y="-3" width="8" height="5" rx="1.6" fill="#FFF6F2"/><ellipse cx="0" cy="-3" rx="4" ry="1.6" fill="#FDE6EE"/><rect x="-4" y="0" width="8" height="2" rx="1" fill="#000" opacity=".08"/></g>`;
      o += mm(70, 74, 0.9, -8) + mm(86, 70, 0.75, 6) + mm(64, 88, 1.1, 10) + mm(92, 84, 1.2, -6) + mm(100, 94, 1.3, 4) + mm(82, 80, 0.9, 0);
      o += `<path d="M72 66q-3 -3 0 -6q3 -3 0 -6M98 70q3 -3 0 -6q-3 -3 0 -6" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/>`;
      o += `<path d="M24 92V70q0 -6 6 -6q6 0 6 6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M24 92V70q0 -6 6 -6q6 0 6 6" stroke="#F06A80" stroke-width="3" fill="none" stroke-dasharray="3 3" stroke-linecap="butt"/>`;
      o += `<path d="M140 92a6 6 0 0 1 12 0Z" fill="#9ED89A"/><path d="M128 94a5 5 0 0 1 10 0Z" fill="#F6CF5A"/><path d="M8 96a5 5 0 0 1 10 0Z" fill="#8FD3E8"/>`;
    } else if (i === 2) {
      o += `<path d="M0 82Q50 76 100 80T160 78V100H0Z" fill="#C4ECD8"/>` + castle(80, 84, 0.8);
      const cc = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}"><ellipse cx="0" cy="0" rx="16" ry="6"/><circle cx="-8" cy="-3" r="7"/><circle cx="2" cy="-7" r="9"/><circle cx="11" cy="-3" r="6"/><circle cx="-2" cy="-9" r="3" fill="#fff" opacity=".35"/></g>`;
      o += cc(36, 30, 1.1, "#FFB3D1") + cc(118, 24, 1.2, "#B8DDF7") + cc(84, 46, 0.8, "#D7C2F6") + cc(140, 52, 0.7, "#FFC9A8");
      o += `<path d="M24 84L30 62H42L48 84Z" fill="#F6E1B8"/><path d="M27 72L45 72M26 77L46 77" stroke="#E8C68C" stroke-width=".8"/><g fill="#FFB3D1"><circle cx="30" cy="58" r="6"/><circle cx="38" cy="55" r="7"/><circle cx="43" cy="60" r="5"/><circle cx="34" cy="62" r="5"/></g><circle cx="35" cy="54" r="2" fill="#fff" opacity=".4"/>`;
      o += sprinkles([[20, 44, 1], [56, 38, 2.2], [70, 22, 0.4], [100, 36, 1.8], [132, 38, 0.9], [150, 30, 2.4], [60, 60, 1.2], [104, 62, 0.6], [12, 64, 2], [146, 70, 1.4]]);
    } else {
      o += `<circle cx="80" cy="48" r="46" fill="${c.glow("#FFE9A6", 0.8)}"/>`;
      o += `<path d="M0 86Q80 78 160 86V100H0Z" fill="#C4ECD8"/>`;
      o += `<ellipse cx="80" cy="91" rx="36" ry="4" fill="#E8B64A"/><ellipse cx="80" cy="90" rx="33" ry="2.6" fill="#F6D27A"/>`;
      const tier = (x0, x1, y0, y1, col) => { let d = `M${x0} ${y0 + 2}`, w = x1 - x0, n = Math.round(w / 6); for (let k = 0; k < n; k++) { const a = x0 + (w * k) / n, b = x0 + (w * (k + 1)) / n; d += `Q${R((a + b) / 2)} ${R(y0 + 6.5)} ${R(b)} ${y0 + 2}`; } return `<rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" rx="2" fill="${col}"/><rect x="${R(x1 - w * 0.18)}" y="${y0}" width="${R(w * 0.18)}" height="${y1 - y0}" rx="2" fill="#000" opacity=".06"/><path d="${d}V${y0 + 1}Q${x1} ${y0} ${x1 - 1} ${y0}H${x0 + 1}Q${x0} ${y0} ${x0} ${y0 + 2}Z" fill="#FFFDF8"/>`; };
      o += tier(50, 110, 72, 90, "#F7A8C4") + tier(56, 104, 57, 72, "#B9E6D0") + tier(62, 98, 44, 57, "#D3BDF2") + tier(68, 92, 33, 44, "#FFE29A");
      o += sprinkles([[56, 82, 0.4], [70, 84, 2.2], [88, 80, 1], [100, 84, 2.6], [62, 66, 1.6], [76, 68, 0.2], [94, 66, 2], [68, 52, 0.8], [84, 53, 2.4], [74, 40, 1.4], [86, 40, 0.3]]);
      o += `<path d="M80 28Q82 20 88 17" stroke="#6E9A4A" stroke-width="1.2" fill="none" stroke-linecap="round"/><path d="M84.6 19.4q4 -4 6.8 -2q-2.6 3.2 -6.8 2Z" fill="#8CC46A"/><circle cx="80" cy="29" r="5.4" fill="${c.ball("#FF8C9C", "#D8344C")}"/><circle cx="78" cy="27" r="1.4" fill="#fff" opacity=".85"/>`;
      o += spark(40, 30, 4, "#F6C94E") + spark(122, 34, 3.6, "#F6C94E") + spark(116, 62, 2.4, "#fff") + spark(42, 60, 2.6, "#fff") + spark(100, 18, 2.2, "#F6C94E", 0.9) + spark(60, 20, 2, "#fff", 0.9);
      o += cloud(22, 76, 1, "#fff", 0.8) + cloud(140, 78, 1.1, "#fff", 0.8);
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 8. Pianura dell'Aurora ---------------- */
  W.aurora = (c, i) => {
    let o = `<rect width="160" height="100" fill="${i === 3 ? c.lin("#101E44", "#36558A") : c.lin("#13284A", "#3B6284")}"/>`;
    o += starField(31 + i, 22, 2, 158, 2, 60, 0.8);
    const veil = (y, a, b, op) => { const g = c.lin(a, b, 0, 1, op, 0); return `<path d="M-4 ${y}Q30 ${y - 14} 64 ${y - 2}T132 ${y - 8}T168 ${y - 14}V${y + 30}Q120 ${y + 24} 80 ${y + 30}T-4 ${y + 28}Z" fill="${g}"/>`; };
    if (i !== 1 && i !== 3) o += veil(20, "#7FF0B8", "#9A7FE6", 0.55);
    if (i === 0) {
      o += `<path d="M0 70Q40 60 80 66T160 62V100H0Z" fill="#CFDCEE"/>` + pine(16, 68, 14, "#2F5A60") + pine(28, 70, 10, "#2F5A60") + pine(142, 66, 15, "#2F5A60");
      o += `<path d="M0 78Q60 70 160 78V100H0Z" fill="#EEF4FA"/>`;
      o += `<ellipse cx="96" cy="88" rx="26" ry="5" fill="${c.glow("#FFB860", 0.65)}"/>`;
      o += `<path d="M40 86A26 22 0 0 1 92 86Z" fill="#F6FAFE"/><path d="M76 66A26 22 0 0 1 92 86H84Q84 74 76 66Z" fill="#D6E3F2" opacity=".7"/>`;
      o += `<path d="M42 78H90M47 71H85M54 78V86M66 78V86M78 78V86M58 71V78M70 71V78M82 71V78M64 64.6V71" stroke="#C8D8EA" stroke-width=".8"/>`;
      o += `<path d="M80 86V80A10 9 0 0 1 100 80V86Z" fill="#F0F6FC"/><path d="M84 86V82A6 6 0 0 1 96 82V86Z" fill="#FFC873"/><path d="M86.4 86V83A3.6 3.6 0 0 1 93.6 83V86Z" fill="#FFE3A8"/>`;
      o += `<circle cx="124" cy="22" r="6" fill="#F4F2DC"/>`;
    } else if (i === 1) {
      /* tenda dell'aurora: bordo basso luminoso e ondulato, sfuma verso l'alto */
      const cur = (x0, w, bot, h, col, ph) => {
        const n = 10, B = [], T = [];
        for (let k = 0; k <= n; k++) { const x = x0 + (w * k) / n, yb = bot + 5 * Math.sin(k * 1.25 + ph); B.push([R(x), R(yb)]); T.push([R(x + 6), R(yb - h + 6 * Math.sin(k * 0.8 + ph * 2))]); }
        const smooth = (P) => { let d = `${P[0][0]} ${P[0][1]}`; for (let k = 1; k < P.length - 1; k++) d += `Q${P[k][0]} ${P[k][1]} ${R((P[k][0] + P[k + 1][0]) / 2)} ${R((P[k][1] + P[k + 1][1]) / 2)}`; return d + `L${P[P.length - 1][0]} ${P[P.length - 1][1]}`; };
        const bd = smooth(B), td = smooth(T.slice().reverse());
        let rays = ""; for (let k = 1; k < n; k += 1) rays += `M${B[k][0]} ${R(B[k][1] - 2)}l${R(4 - (k % 3))} -${R(h * (0.45 + (k % 3) * 0.15))}`;
        return `<path d="M${bd}L${td}Z" fill="${c.lin(col, col, 0, 1, 0, 0.75)}"/><path d="${rays}" stroke="${col}" stroke-width="1.4" opacity=".35" stroke-linecap="round"/><path d="M${bd}" stroke="${col}" stroke-width="1.6" fill="none" opacity=".85" stroke-linecap="round"/>`;
      };
      o += cur(-8, 92, 50, 40, "#7FF0B8", 0.3) + cur(56, 64, 40, 34, "#C39BF6", 2.1) + cur(92, 76, 54, 42, "#7FE6D8", 4);
      o += `<path d="M0 72Q30 56 64 66T124 58T160 64V100H0Z" fill="#B9CCE4"/><path d="M0 82Q50 70 100 80T160 76V100H0Z" fill="#E6EFF8"/><path d="M0 92Q70 84 160 94V100H0Z" fill="#F6FAFE"/>`;
      o += pine(36, 80, 10, "#2F5A60") + pine(44, 82, 7, "#2F5A60") + pine(122, 78, 11, "#2F5A60");
    } else if (i === 2) {
      o += `<path d="M0 66Q40 58 80 64T160 60V100H0Z" fill="#CFDCEE"/><path d="M0 74Q50 68 100 72T160 70V100H0Z" fill="#EEF4FA"/>`;
      [[10, 72, 18], [22, 74, 13], [134, 70, 19], [148, 72, 14], [120, 74, 10], [36, 76, 9]].forEach(([x, y, h]) => { o += pine(x, y, h, "#2F5A60"); });
      o += `<ellipse cx="80" cy="85" rx="60" ry="11" fill="#BFE0F2"/><ellipse cx="80" cy="85" rx="60" ry="11" fill="none" stroke="#F6FAFE" stroke-width="1.6"/><path d="M40 84Q70 78 110 82" stroke="#fff" stroke-width="2" opacity=".35" fill="none" stroke-linecap="round"/>`;
      o += `<path d="M44 88C52 80 66 80 70 86C74 92 88 92 92 86C96 80 112 80 116 87C112 92 100 92 92 86M30 86Q40 80 48 86" stroke="#fff" stroke-width=".9" fill="none" opacity=".9" stroke-linecap="round"/><path d="M58 90q10 3 22 -1" stroke="#fff" stroke-width=".7" fill="none" opacity=".7" stroke-linecap="round"/>`;
      o += pine(18, 98, 16, "#264E54") + pine(146, 98, 18, "#264E54") + `<path d="M0 98Q30 94 60 100H0ZM110 100Q140 92 160 96V100Z" fill="#F6FAFE"/>`;
    } else {
      o += `<circle cx="80" cy="38" r="40" fill="${c.glow("#BFE6FF", 0.4)}"/>`;
      ["#F59A9A", "#F8C08A", "#F6DE8C", "#8FE6B0", "#8CC8F2", "#B99CF2"].forEach((col, k) => { o += `<circle cx="80" cy="38" r="${30 - k * 3}" fill="none" stroke="${col}" stroke-width="2.8" opacity=".6"/>`; });
      o += `<circle cx="80" cy="38" r="11" fill="${c.glow("#FFFBE6", 0.9)}"/><circle cx="80" cy="38" r="8" fill="#FBF6DE"/><circle cx="77" cy="36" r="1.6" fill="#E6DDB8" opacity=".7"/><circle cx="83" cy="40" r="1.2" fill="#E6DDB8" opacity=".7"/>`;
      o += `<path d="M0 74Q40 64 80 70T160 66V100H0Z" fill="#C8D8EE"/><path d="M0 82Q60 74 160 84V100H0Z" fill="#EEF4FA"/>`;
      [[14, 80, 18], [26, 82, 12], [134, 78, 17], [148, 80, 12], [118, 82, 9]].forEach(([x, y, h]) => { o += pine(x, y, h, "#2A5058"); });
      o += `<ellipse cx="80" cy="90" rx="34" ry="3" fill="#FFF3C4" opacity=".35"/>`;
      o += spark(40, 18, 3.4, "#F6C94E") + spark(122, 16, 3.6, "#F6C94E") + spark(118, 56, 2.4, "#fff") + spark(40, 58, 2.4, "#fff") + spark(80, 8, 2, "#F6C94E", 0.9);
      o += rareFrame();
    }
    return o;
  };

  /* ---------------- 9. Vetta del Drago Gentile ---------------- */
  W.dragon = (c, i) => {
    let o = `<rect width="160" height="100" fill="${i === 3 ? c.lin("#FBC98E", "#F7E4D2") : c.lin("#F6D2C2", "#D2E6DF")}"/>`;
    const rock = "#8D8DB4", rockD = "#7576A0";
    const mist = (pts, op = 0.85) => pts.map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${op}"/>`).join("");
    if (i !== 3) o += cloud(30, 18, 0.9, "#fff", 0.6) + cloud(128, 14, 0.8, "#fff", 0.55);
    const far = `<path d="M0 66L20 44L34 56L58 30L80 52L104 34L126 50L146 38L160 46V100H0Z" fill="#B9BAD8"/><path d="M58 30L64 37L58 36L52 38ZM104 34L110 40L104 39L98 41ZM146 38L151 42L146 42L141 43Z" fill="#fff"/>`;
    if (i === 0) {
      o += far + mist([[70, 66, 50, 7], [140, 72, 34, 6]]);
      o += `<path d="M0 64Q24 58 52 60Q62 62 64 70L70 100H0Z" fill="${rock}"/><path d="M52 60Q62 62 64 70L70 100H58Q56 76 52 60Z" fill="${rockD}"/><path d="M0 64Q24 58 52 60Q58 61 60 64Q30 62 0 68Z" fill="#A9CF95"/>`;
      o += mist([[110, 90, 54, 10], [150, 84, 20, 5]], 0.9);
      o += `<ellipse cx="32" cy="60" rx="17" ry="5" fill="#9A7050"/>`;
      o += `<ellipse cx="25" cy="54" rx="5.4" ry="7" fill="#F8C3CF"/><ellipse cx="39" cy="54" rx="5.4" ry="7" fill="#D7C6F2"/><ellipse cx="32" cy="52" rx="6" ry="7.8" fill="#BFE8D3"/>`;
      o += dots([[30, 49], [34, 54, 0.8], [23, 52, 0.8], [41, 51, 0.7], [27, 57, 0.6], [37, 57, 0.6]], 0.9, "#fff", 0.8) + `<path d="M29.4 47.6q1 -2 3 -2.4" stroke="#fff" stroke-width="1" fill="none" opacity=".8" stroke-linecap="round"/>`;
      o += `<path d="M15 58Q32 66 49 58Q48 64 32 66Q16 64 15 58Z" fill="#B0845A"/><path d="M17 60L24 63M22 59L30 64M30 60L38 64M38 60L46 62M18 63L46 59" stroke="#8A6040" stroke-width=".8" stroke-linecap="round"/>`;
      o += spark(56, 40, 2.4, "#fff") + spark(14, 40, 1.8, "#fff", 0.8);
    } else if (i === 1) {
      o += far + mist([[80, 62, 70, 8], [20, 70, 30, 6]], 0.9) + mist([[120, 82, 50, 10], [40, 90, 50, 9], [150, 96, 30, 6]], 0.95);
      o += `<path d="M24 100L30 76Q60 70 96 72Q112 72 116 80L110 100Z" fill="${rock}"/><path d="M30 76Q60 70 96 72Q112 72 116 80Q70 76 30 80Z" fill="#A9CF95"/><path d="M96 72Q112 72 116 80L110 100H100Q102 84 96 72Z" fill="${rockD}"/>`;
      o += `<ellipse cx="70" cy="76" rx="24" ry="3.6" fill="#FFF6EC"/><path d="M48 76q4 2 8 0q4 2 8 0q4 2 8 0q4 2 8 0q4 2 8 0q4 2 4 0" stroke="#F4D0DA" stroke-width="1" fill="none"/>`;
      o += teapot(66, 76, "#9ED8C0", 0.9) + cup(52, 76, "#FCE3EC", 0.85) + cup(84, 76, "#FFF0C8", 0.85) + `<path d="M52 66q-2 -3 0 -6M84 66q2 -3 0 -6" stroke="#fff" stroke-width=".9" fill="none" opacity=".8" stroke-linecap="round"/><circle cx="76" cy="75" r="1.6" fill="#F6CF8A"/><circle cx="92" cy="75.4" r="1.4" fill="#F2B8C6"/>`;
    } else if (i === 2) {
      o += `<path d="M0 66L30 50L52 62L80 46L108 60L130 48L160 60V100H0Z" fill="#C6C6E0"/>`;
      o += `<path d="M0 100V30L14 18L26 26L40 22L52 46L58 100Z" fill="${rock}"/><path d="M40 22L52 46L58 100H46Q48 60 40 22Z" fill="${rockD}"/><path d="M14 18L20 24L14 24L8 25ZM40 22L45 30L40 28L35 30Z" fill="#fff"/>`;
      o += `<path d="M160 100V34L146 22L132 32L118 30L108 48L102 100Z" fill="${rock}"/><path d="M146 22L160 34V100H150Q156 60 146 22Z" fill="${rockD}"/><path d="M146 22L152 28L146 28L140 29ZM118 30L122 36L118 35L114 36Z" fill="#fff"/>`;
      let br = "", bs = "";
      for (let k = 0; k <= 12; k++) { const t = k / 12, x = R(46 + 68 * t), y = R(44 - 10 * Math.sin(Math.PI * t)); bs += `M${x} ${R(y + 2.6)}h0`; br += `M${x} ${y}h0`; }
      o += `<path d="${bs}" stroke="#DCDCEE" stroke-width="10" stroke-linecap="round"/><path d="${br}" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` + dotPath([[56, 36], [70, 31], [86, 30.4], [100, 33]], 2.4, "#fff");
      o += mist([[80, 78, 70, 10], [30, 88, 40, 8], [130, 90, 40, 8]], 0.92);
      o += `<path d="M70 20q2 -2 4 0q2 -2 4 0M86 14q1.6 -1.6 3.2 0q1.6 -1.6 3.2 0" stroke="#7A7AA6" stroke-width=".9" fill="none" stroke-linecap="round"/>`;
    } else {
      o += `<circle cx="80" cy="38" r="48" fill="${c.glow("#FFE7A0", 0.85)}"/>`;
      o += `<path d="M0 72L22 52L38 62L50 50L64 64H96L110 50L124 60L140 46L160 60V100H0Z" fill="#C9B9D6"/>`;
      o += `<path d="M30 100L80 30L130 100Z" fill="${rock}"/><path d="M80 30L130 100H104Q96 60 80 30Z" fill="${rockD}"/><path d="M80 30L88 41L82 39.6L76 42L72 41.4Z" fill="#fff"/>`;
      const body = "M52 82C62 95 104 95 116 83C124 73 116 63 104 62C95 61 90 59 88 54";
      o += `<path d="M54 84C44 86 36 83 34 77" stroke="#8ACB86" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M34 77.6C30 76 28 72 31 70.6C32.6 70 33.6 71 34 72C35 71 36.6 70.8 37.4 72C38.6 74.6 36 77 34 77.6Z" fill="#F4A3B8"/>`;
      o += `<path d="${body}" stroke="#7CBE78" stroke-width="15" fill="none" stroke-linecap="round"/><path d="${body}" stroke="#8ACB86" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M58 88C70 97 102 97 114 86" stroke="#E6F2C2" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>`;
      o += dotPath([[66, 80.4], [80, 82.4], [94, 81.4], [106, 76.6], [111, 68.4]], 2.2, "#F7B59A");
      o += `<path d="M104 64Q104 50 118 44Q116 52 118 55Q124 52 130 55Q124 64 110 68Z" fill="#B7E2A2"/><path d="M106 64Q110 54 118 48M108 66Q116 60 126 56" stroke="#8ACB86" stroke-width=".9" fill="none" stroke-linecap="round"/><ellipse cx="96" cy="58.6" rx="4.4" ry="2.8" fill="#9ED69A"/><path d="M93.6 60.4v-1.6M96 61v-1.8M98.4 60.4v-1.6" stroke="#6FAE6C" stroke-width=".6" stroke-linecap="round"/>`;
      o += `<g transform="translate(85 47) scale(1.08)"><path d="M-5 -6L-7 -14L-2 -8ZM4 -7L5 -15L8 -7Z" fill="#FFF0C8"/><ellipse cx="0" cy="0" rx="10" ry="8.4" fill="#8ACB86"/><ellipse cx="7.6" cy="2.4" rx="5.6" ry="4.2" fill="#A4D89A"/><circle cx="10.4" cy="1.6" r=".7" fill="#4A6A44"/><circle cx="12" cy="2.4" r=".6" fill="#4A6A44"/><path d="M-4.6 -.6q2 1.8 4 0M2.6 -2q1.6 1.4 3.2 0" stroke="#2E4A2C" stroke-width=".9" fill="none" stroke-linecap="round"/><ellipse cx="-3" cy="3.4" rx="2.2" ry="1.3" fill="#F4A3B8" opacity=".8"/><path d="M-6 -5Q-2 -8 3 -7.6" stroke="#fff" stroke-width="1.2" fill="none" opacity=".35" stroke-linecap="round"/></g>`;
      o += `<path d="M98 30h4l-4 4.6h4M105 22h3l-3 3.4h3" stroke="#9A8AC8" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
      o += `<g fill="#fff" opacity=".92"><ellipse cx="40" cy="96" rx="34" ry="6"/><ellipse cx="124" cy="96" rx="36" ry="6"/><circle cx="24" cy="92" r="6"/><circle cx="138" cy="92" r="7"/></g>`;
      o += spark(34, 24, 4, "#F6C94E") + spark(130, 26, 3.4, "#F6C94E") + spark(60, 14, 2.2, "#fff") + spark(118, 44, 2.2, "#fff", 0.9) + spark(46, 42, 2, "#F6C94E", 0.9);
      o += rareFrame();
    }
    return o;
  };

  return (id, i, label) => {
    const c = (C = ctx()), f = W[id] || W.fireflies, body = f(c, Math.max(0, Math.min(3, i | 0)));
    return `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label == null ? "" : label)}">${c.d ? `<defs>${c.d}</defs>` : ""}${body}</svg>`;
  };
})();

function worldArt(id, i, label) { return _V19WA(id, i, label); }

const V19W_TXT = {
  it: {
    fireflies: { name: "Bosco delle Lucciole", desc: "Un bosco al tramonto pieno di lucine danzanti", cards: [
      ["Luci sul ruscello", "{n} si è seduto accanto al ruscello a guardare le lucciole specchiarsi nell'acqua, come stelle con la voglia di fare il bagno."],
      ["Tè sul tronco", "Su un tronco coperto di muschio, {n} ha bevuto il tè più piccolo del mondo insieme a due funghetti molto educati."],
      ["La danza a spirale", "Nella radura le lucciole hanno disegnato una spirale di luce. {n} l'ha guardata a bocca aperta fino all'ultimo giro."],
      ["La Regina delle Lucciole", "Sopra gli alberi è apparsa la Regina delle Lucciole, tutta d'oro. Ha fatto un inchino a {n} e il bosco intero si è acceso."]
    ] },
    shells: { name: "Isola delle Conchiglie", desc: "Un'isola color pastello dove il mare canta piano", cards: [
      ["Pozze di marea", "Tra gli scogli, {n} ha trovato piccole pozze piene di conchiglie e una stella marina che sembrava salutare."],
      ["Il castello di sabbia", "{n} ha costruito un castello di sabbia con tre torri e una bandierina. Le onde l'hanno ammirato da lontano."],
      ["La tartaruga al tramonto", "Al tramonto una tartaruga marina è passata nuotando piano piano. {n} l'ha salutata, e lei ha sorriso."],
      ["La perla splendente", "Sulla spiaggia, una conchiglia gigante si è aperta davanti a {n}: dentro brillava una perla, tonda come la luna."]
    ] },
    mushrooms: { name: "Valle dei Funghi Giganti", desc: "Una valle di funghi alti come case", cards: [
      ["Il villaggio dei funghi", "{n} ha passeggiato tra casette a forma di fungo, con le finestre tonde illuminate e un profumino di zuppa calda nell'aria."],
      ["Riparo dalla pioggia", "Quando è arrivata la pioggia, {n} si è riparato sotto un fungo enorme e ha ascoltato le gocce suonare sul cappello."],
      ["Spore di luce", "Di notte i funghi hanno liberato spore azzurre e luminose. {n} ha provato a contarle, ma volavano via ridendo."],
      ["Il fungo arcobaleno", "In fondo alla valle {n} ha trovato un fungo con il cappello color arcobaleno. Dicono che spunti solo per chi ha il cuore gentile."]
    ] },
    library: { name: "Biblioteca Sospesa", desc: "Libri che volano tra le nuvole", cards: [
      ["La scala di libri", "{n} è salito su una scala fatta di libri, un gradino alla volta, fino a toccare le nuvole."],
      ["Uccellini di carta", "Da un libro aperto sono volati via tanti uccellini di carta. Uno si è posato per un attimo sul naso di {n}."],
      ["L'angolo della lettura", "Su una nuvola morbida c'era una poltroncina con una lampada accesa. {n} si è accoccolato a sfogliare storie."],
      ["Il libro d'oro", "Tra mille libri, uno brillava più di tutti: un libro d'oro pieno di scintille. {n} l'ha aperto e ha trovato una storia nuova."]
    ] },
    crystal: { name: "Giardino di Cristallo", desc: "Fiori e sassi che brillano di mille colori", cards: [
      ["Fiori di cristallo", "In un prato tranquillo, {n} ha visto fiori di cristallo tintinnare al vento come campanellini."],
      ["Il prisma", "{n} ha messo un prisma sotto un raggio di sole, e la luce si è aperta in un arcobaleno sul prato."],
      ["La grotta dei riflessi", "Nella grotta di cristallo ogni passo di {n} accendeva piccoli riflessi colorati sulle pareti."],
      ["Il cuore di cristallo", "In cima al giardino, su un piedistallo, c'era un cristallo a forma di cuore. Quando {n} l'ha sfiorato, si è illuminato di rosa."]
    ] },
    starsea: { name: "Mare di Stelle", desc: "Un mare notturno che riflette il cielo", cards: [
      ["Barca e lanterna", "{n} ha navigato su una barchetta con una lanterna accesa, tra stelle che galleggiavano sull'acqua."],
      ["La scia della luna", "La luna ha steso sul mare una scia d'argento. {n} l'ha seguita con lo sguardo fino all'orizzonte."],
      ["Stelle cadenti", "Quella notte sono cadute tante stelle. {n} ha espresso un desiderio per ognuna, e uno era per te."],
      ["La balena stellata", "Dal mare è saltata una balena gentile coperta di stelle. Per un attimo {n} ha visto il cielo nuotare."]
    ] },
    sugar: { name: "Castello di Zucchero", desc: "Un castello di caramelle color pastello", cards: [
      ["Alberi di lecca-lecca", "{n} ha passeggiato in un bosco di lecca-lecca giganti, tutti a spirale e di mille colori."],
      ["Il fiume di cioccolata", "Lungo un fiume di cioccolata calda galleggiavano marshmallow morbidi. {n} ne ha preso uno al volo."],
      ["Nuvole di zucchero filato", "Sopra il castello passavano nuvole di zucchero filato rosa e azzurro. {n} ne ha assaggiato un pezzetto."],
      ["La torta a torre", "Nel cortile del castello c'era una torta alta come una torre, con una ciliegina in cima. È stata la festa più dolce per {n}."]
    ] },
    aurora: { name: "Pianura dell'Aurora", desc: "Pianure di neve sotto le luci del nord", cards: [
      ["L'igloo illuminato", "Nella neve, {n} ha trovato un igloo con una lucina calda all'ingresso. Dentro si stava benissimo."],
      ["Tende di luce", "Sopra le colline l'aurora ondeggiava come tende verdi e viola. {n} è rimasto a guardarla senza parole."],
      ["Il lago ghiacciato", "Sul lago ghiacciato {n} ha pattinato tra i pini, disegnando cerchi e riccioli sul ghiaccio."],
      ["L'anello dell'aurora", "Quella notte l'aurora ha fatto un anello arcobaleno intorno alla luna. {n} l'ha guardato e ha capito che era un saluto speciale."]
    ] },
    dragon: { name: "Vetta del Drago Gentile", desc: "Cime nella nebbia dove vive un drago buono", cards: [
      ["Il nido sulla roccia", "Su una roccia in alto, {n} ha visto un nido con tre uova color pastello, al calduccio sotto il sole."],
      ["Tè sopra le nuvole", "Su una sporgenza sopra le nuvole qualcuno aveva preparato un piccolo servizio da tè. {n} ha brindato al panorama."],
      ["Il ponte di nuvole", "Tra due cime c'era un ponte di nuvole soffici. {n} l'ha attraversato piano, con il vento che gli faceva il solletico."],
      ["Il drago addormentato", "In cima alla vetta dormiva un drago verde, tondo e gentile. {n} gli ha augurato sogni d'oro, e il drago ha sorriso nel sonno."]
    ] }
  },
  en: {
    fireflies: { name: "Firefly Wood", desc: "A dusky wood full of tiny dancing lights", cards: [
      ["Lights on the Stream", "{n} sat by the little stream and watched the fireflies twinkle in the water, like stars that fancied a swim."],
      ["Mossy Log Tea", "On a mossy log, {n} sipped the tiniest tea in the world with two very polite toadstools."],
      ["The Spiral Dance", "In the clearing, the fireflies drew a spiral of light in the air. {n} watched in wonder until the very last twirl."],
      ["The Firefly Queen", "Above the trees, the golden Firefly Queen appeared. She bowed to {n}, and the whole wood lit up at once."]
    ] },
    shells: { name: "Seashell Island", desc: "A pastel island where the sea hums softly", cards: [
      ["Tide Pools", "Among the rocks, {n} found little pools full of shells, and a starfish that seemed to wave hello."],
      ["The Sandcastle", "{n} built a sandcastle with three towers and a tiny flag. The waves admired it from a safe distance."],
      ["Turtle at Sunset", "At sunset, a sea turtle drifted slowly by. {n} waved, and the turtle smiled back."],
      ["The Shining Pearl", "On the beach, a giant shell opened right in front of {n}. Inside glowed a pearl, round as the moon."]
    ] },
    mushrooms: { name: "Giant Mushroom Valley", desc: "A valley of mushrooms as tall as houses", cards: [
      ["Mushroom Village", "{n} wandered among little mushroom houses with round, glowing windows. Something smelled like warm soup."],
      ["Shelter from the Rain", "When the rain came, {n} hid under a huge mushroom and listened to the drops drumming on its cap."],
      ["Spores of Light", "At night the mushrooms released glowing blue spores. {n} tried to count them, but they floated away giggling."],
      ["The Rainbow Mushroom", "Deep in the valley, {n} found a mushroom with a rainbow cap. They say it only grows for the kindest hearts."]
    ] },
    library: { name: "Floating Library", desc: "Books drifting among the clouds", cards: [
      ["A Staircase of Books", "{n} climbed a staircase made of books, one step at a time, all the way up to the clouds."],
      ["Paper Birds", "A flock of paper birds fluttered out of an open book. One landed on {n}'s nose for a moment."],
      ["The Reading Nook", "On a soft cloud sat a cosy armchair and a glowing lamp. {n} curled up there and leafed through stories."],
      ["The Golden Book", "Among a thousand books, one shone brighter than the rest: a golden book full of sparkles. {n} opened it and found a brand-new story."]
    ] },
    crystal: { name: "Crystal Garden", desc: "Flowers and stones that shimmer in every colour", cards: [
      ["Crystal Flowers", "In a quiet meadow, {n} heard crystal flowers chime in the breeze like tiny bells."],
      ["The Prism", "{n} held a prism up to a sunbeam, and the light spilled across the meadow as a rainbow."],
      ["The Glittering Cave", "Inside the crystal cave, every step {n} took lit up little coloured glints on the walls."],
      ["The Crystal Heart", "At the top of the garden, a heart-shaped crystal rested on a pedestal. When {n} touched it, it glowed a soft pink."]
    ] },
    starsea: { name: "Sea of Stars", desc: "A night sea that mirrors the sky", cards: [
      ["Boat and Lantern", "{n} sailed a little boat with a glowing lantern, past stars floating on the water."],
      ["The Moon Path", "The moon laid a silver path across the sea. {n} followed it with dreamy eyes all the way to the horizon."],
      ["Shooting Stars", "So many stars fell that night. {n} made a wish on each one, and one of them was for you."],
      ["The Starry Whale", "A gentle whale covered in stars leapt out of the sea. For one moment, {n} saw the sky swim."]
    ] },
    sugar: { name: "Sugar Castle", desc: "A pastel castle made of sweets", cards: [
      ["Lollipop Trees", "{n} strolled through a forest of giant lollipops, all swirls and every colour you can think of."],
      ["The Cocoa River", "Soft marshmallows bobbed along a river of hot cocoa. {n} caught one as it floated by."],
      ["Cotton-Candy Clouds", "Pink and blue cotton-candy clouds drifted over the castle. {n} tasted just a tiny piece."],
      ["The Cake Tower", "In the castle courtyard stood a cake as tall as a tower, with a cherry on top. It was the sweetest party {n} ever had."]
    ] },
    aurora: { name: "Aurora Plains", desc: "Snowy plains beneath the northern lights", cards: [
      ["The Glowing Igloo", "In the snow, {n} found an igloo with a warm little light at the door. Inside, it was perfectly cosy."],
      ["Curtains of Light", "Above the hills, the aurora swayed like green and violet curtains. {n} watched without a word."],
      ["The Frozen Lake", "On the frozen lake, {n} skated among the pines, drawing loops and swirls on the ice."],
      ["The Aurora Ring", "That night the aurora wrapped a rainbow ring around the moon. {n} looked up and knew it was a very special hello."]
    ] },
    dragon: { name: "Gentle Dragon Peak", desc: "Misty peaks where a kind dragon lives", cards: [
      ["The Cliff Nest", "High on a cliff, {n} spotted a nest with three pastel eggs, snug and warm in the sun."],
      ["Tea Above the Clouds", "On a ledge above the clouds, someone had set out a tiny tea set. {n} raised a cup to the view."],
      ["The Cloud Bridge", "A bridge of soft clouds stretched between two peaks. {n} crossed it slowly, giggling as the wind tickled."],
      ["The Sleeping Dragon", "On the very top, a round, gentle green dragon lay curled up asleep. {n} wished it sweet dreams, and it smiled in its sleep."]
    ] }
  }
};
