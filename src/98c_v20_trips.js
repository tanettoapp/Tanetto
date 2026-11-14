/* ===== 1.0.8 — Viaggi: Città delle lanterne, acqua più vera, "in avventura" spiegato, gite brevi =====
   1) Città delle lanterne ridisegnata (festa notturna: lanterne di carta che salgono in cielo, festoni sui tetti,
      canale con riflessi veri), lago ridisegnato, acqua migliorata nei mondi fantastici e nei luoghi veri.
   2) Pulsante "i" sulla scheda "è in avventura" (Oggi, Avventure, stanza a schermo intero): spiega in parole semplici.
   3) Gita breve: con almeno metà degli obiettivi fatti il compagno può andare nelle mete vicine (bosco, lago,
      collina), per metà del tempo e con metà dei Tanì e dei punti. Un viaggio al giorno: chi parte con la gita
      breve non la "promuove" completando altri obiettivi dopo.
   Stato nuovo: S.v20trip = { day, kind } (il viaggio di oggi è già stato fatto), S.away.kind = "short" | "full". */
const TRIP_PARTIAL_MULT = 0.5; /* premio della gita breve (Tanì e punti), arrotondato */
const TRIP_PARTIAL_TIME = 0.5; /* durata della gita breve rispetto al viaggio completo */
const TRIP_SHORT_DESTS = ["f:forest", "f:lake", "f:hill"];

/* =================== DISEGNI =================== */
const tr20r = (v) => Math.round(v * 10) / 10;
const tr20rnd = (seed) => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
function tr20ctx() {
  const c = { d: "" };
  c.lin = (stops, x2 = 0, y2 = 1) => { const id = nid("tr20l"); c.d += `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, col, op]) => `<stop offset="${o}" stop-color="${col}"${op != null ? ` stop-opacity="${op}"` : ""}/>`).join("")}</linearGradient>`; return `url(#${id})`; };
  c.rad = (col, op = 1, mid = 0) => { const id = nid("tr20g"); c.d += `<radialGradient id="${id}"><stop offset="0" stop-color="${col}" stop-opacity="${op}"/>${mid ? `<stop offset="${mid}" stop-color="${col}" stop-opacity="${tr20r(op * 0.45 * 100) / 100}"/>` : ""}<stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>`; return `url(#${id})`; };
  c.def = (inner) => { const id = nid("tr20s"); c.d += `<g id="${id}">${inner}</g>`; return id; };
  c.clip = (inner) => { const id = nid("tr20c"); c.d += `<clipPath id="${id}">${inner}</clipPath>`; return `url(#${id})`; };
  c.svg = (label, body) => `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label == null ? "" : label)}"><defs>${c.d}</defs>${body}</svg>`;
  return c;
}
/* righe d'acqua leggermente ondulate, più fitte verso l'orizzonte (prospettiva) */
function tr20ripples(y0, y1, n, col, op, w, seed, x0 = 0, x1 = 160) {
  const rnd = tr20rnd(seed); let d = "";
  for (let k = 0; k < n; k++) {
    const t = (k + 0.5) / n; const y = y0 + (y1 - y0) * t * t; const amp = 0.25 + t * 0.9; const seg = 10 + t * 16;
    let x = x0 - rnd() * seg; d += `M${tr20r(x)} ${tr20r(y)}`;
    while (x < x1) { const nx = x + seg; d += `Q${tr20r(x + seg / 2)} ${tr20r(y + (rnd() < 0.5 ? -amp : amp))} ${tr20r(nx)} ${tr20r(y)}`; x = nx; }
  }
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${op}" stroke-linecap="round"/>`;
}
/* scintillii: trattini corti in colonna sotto una luce (riflesso spezzato dalle onde) */
function tr20streak(x, y0, y1, w0, col, op, seed, step = 1.6) {
  const rnd = tr20rnd(seed); let d = "";
  for (let y = y0, k = 0; y < y1; y += step + k * 0.12, k++) { const t = (y - y0) / Math.max(1, y1 - y0); const w = w0 * (1 - t * 0.55) * (0.6 + rnd() * 0.6); if (rnd() < 0.18) continue; d += `M${tr20r(x - w / 2 + (rnd() - 0.5) * 1.6)} ${tr20r(y)}h${tr20r(w)}`; }
  return d ? `<path d="${d}" stroke="${col}" stroke-width=".7" stroke-linecap="round" opacity="${op}"/>` : "";
}
function tr20glints(seed, n, x0, x1, y0, y1, col, op = 0.8) {
  const rnd = tr20rnd(seed); let d = "";
  for (let k = 0; k < n; k++) { const x = x0 + rnd() * (x1 - x0), y = y0 + rnd() * (y1 - y0); d += `M${tr20r(x)} ${tr20r(y)}h${tr20r(0.8 + rnd() * 1.8)}`; }
  return `<path d="${d}" stroke="${col}" stroke-width=".6" stroke-linecap="round" opacity="${op}"/>`;
}
const tr20spark = (x, y, r, col = "#fff", op = 1) => `<path d="M${x} ${tr20r(y - r)}Q${x} ${y} ${tr20r(x + r)} ${y}Q${x} ${y} ${x} ${tr20r(y + r)}Q${x} ${y} ${tr20r(x - r)} ${y}Q${x} ${y} ${x} ${tr20r(y - r)}Z" fill="${col}" opacity="${op}"/>`;
/* acqua: base a gradiente (chiara all'orizzonte, profonda in basso) + riflesso della scena (capovolta e schiacciata)
   + righe che spezzano il riflesso + increspature morbide + scintillii */
function tr20water(c, o) {
  const { Y, scene, top, mid, deep, squash = 0.62, refl = 0.55, lights = [], breakCol, rip = "#fff", ripOp = 0.16, seed = 7, glint = "#FFF4D6", glintN = 10, haze, ripN = 16 } = o;
  const H = 100 - Y; const wc = c.clip(`<rect x="0" y="${Y}" width="160" height="${H}"/>`);
  let s = `<rect x="0" y="${Y}" width="160" height="${H}" fill="${c.lin([[0, top], [0.45, mid], [1, deep]])}"/>`;
  if (haze) s += `<rect x="0" y="${Y}" width="160" height="${tr20r(H * 0.5)}" fill="${c.lin([[0, haze, 0.55], [1, haze, 0]])}"/>`;
  s += `<g clip-path="${wc}">`;
  if (scene) s += `<use href="#${scene}" transform="matrix(1 0 0 ${-squash} 0 ${tr20r(Y * (1 + squash))})" opacity="${refl}"/>`;
  /* il riflesso sfuma in profondità */
  s += `<rect x="0" y="${Y}" width="160" height="${H}" fill="${c.lin([[0, deep, 0], [0.55, deep, 0.25], [1, deep, 0.6]])}"/>`;
  s += tr20ripples(Y + 0.6, 100, ripN, breakCol || mid, 0.55, 0.55, seed);
  lights.forEach(([x, y, col, w = 2.2], k) => { const ry = Y + squash * (Y - y); if (ry > 99) return; s += tr20streak(x, ry - 1.2, Math.min(100, ry + 3 + (Y - y) * 0.25), w, col, 0.85, seed + k * 13); });
  s += tr20ripples(Y + 1.4, 100, 9, rip, ripOp, 0.45, seed + 3);
  s += tr20glints(seed + 5, glintN, 4, 156, Y + 1, 99, glint, 0.7);
  s += `<path d="M0 ${Y}H160" stroke="#fff" stroke-width=".5" opacity=".28"/></g>`;
  return s;
}

/* ---------- Città delle lanterne (notte di festa) ---------- */
const TR20_LCOL = ["#E8553E", "#FF9A3C", "#FFD25E", "#F48FB1"];
function tr20City(i, label) {
  const c = tr20ctx(); const rnd = tr20rnd(31 + i * 17);
  const glow = c.rad("#FFB65A", 0.55, 0.35), wglow = c.rad("#FFC46B", 0.5);
  const body = c.lin([[0, "#C9452C"], [0.55, "#F07C3A"], [1, "#FFD27A"]]);
  /* lanterna di carta che vola (più larga in alto, luce dentro in basso) */
  const SL = c.def(`<circle r="7.5" fill="${glow}"/><path d="M-2.7 -3.6Q0 -4.9 2.7 -3.6L1.9 3.1H-1.9Z" fill="${body}"/><path d="M-1.9 3.1H1.9L1.5 3.7H-1.5Z" fill="#6E3020" opacity=".6"/><ellipse cx="0" cy="2.5" rx="1.25" ry=".55" fill="#FFF6C8"/><path d="M-1.2 -3.3Q-1.5 0 -1 2.8M.9 -3.5Q1.1 0 .8 2.8" stroke="#7A2E1C" stroke-width=".25" opacity=".45" fill="none"/><path d="M-2 -3.2Q-2.1 -.6 -1.6 2" stroke="#fff" stroke-width=".45" opacity=".3" fill="none"/>`);
  const sky = (x, y, s, rot = 0) => `<use href="#${SL}" transform="translate(${tr20r(x)} ${tr20r(y)}) rotate(${rot}) scale(${tr20r(s * 100) / 100})"/>`;
  /* lanterna tonda appesa ai festoni */
  const HL = TR20_LCOL.map((col) => c.def(`<circle r="4.2" fill="${glow}"/><rect x="-.8" y="-2.9" width="1.6" height=".7" rx=".2" fill="#2E2140"/><ellipse rx="2" ry="2.3" fill="${col}"/><path d="M-1.85 -.9Q0 -1.3 1.85 -.9M-1.9 .3Q0 0 1.9 .3M-1.6 1.4Q0 1.2 1.6 1.4" stroke="#5A1E1E" stroke-width=".25" opacity=".35" fill="none"/><ellipse cx="-.7" cy="-.6" rx=".55" ry=".95" fill="#fff" opacity=".4"/><rect x="-.8" y="2.2" width="1.6" height=".6" rx=".2" fill="#2E2140"/>`));
  const hang = (x, y, k, s = 1) => `<use href="#${HL[k % 4]}" transform="translate(${tr20r(x)} ${tr20r(y)})${s !== 1 ? ` scale(${s})` : ""}"/>`;
  /* festone: curva fra due punti, lanterne lungo la curva */
  const lights = [];
  const garland = (x1, y1, x2, y2, sag, n, k0 = 0, s = 1) => {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + sag * 2;
    let g = `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" stroke="#1E1530" stroke-width=".45" fill="none" opacity=".9"/>`;
    for (let k = 1; k <= n; k++) { const t = k / (n + 1), a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, d = t * t; const x = a * x1 + b * cx + d * x2, y = a * y1 + b * cy + d * y2 + 2.4 * s; g += hang(x, y, k + k0, s); if (k % 2) lights.push([x, y, TR20_LCOL[(k + k0) % 4] === "#E8553E" ? "#FF9A6B" : "#FFD27A", 1.6 * s]); }
    return g;
  };
  /* casa con tetto a falde incurvate (le punte all'insù) e finestre calde */
  const house = (x, w, base, h, wall, roof, cols = 2, rows = 2, lit = 0.75) => {
    const top = base - h, rh = Math.min(7, w * 0.42);
    let g = `<rect x="${x}" y="${tr20r(top)}" width="${w}" height="${tr20r(h)}" fill="${wall}"/><rect x="${tr20r(x + w * 0.62)}" y="${tr20r(top)}" width="${tr20r(w * 0.38)}" height="${tr20r(h)}" fill="#000" opacity=".12"/>`;
    g += `<path d="M${tr20r(x - 2.6)} ${tr20r(top - 1)}Q${tr20r(x + w * 0.28)} ${tr20r(top - 0.9)} ${tr20r(x + w / 2)} ${tr20r(top - rh)}Q${tr20r(x + w * 0.72)} ${tr20r(top - 0.9)} ${tr20r(x + w + 2.6)} ${tr20r(top - 1)}L${tr20r(x + w + 1)} ${tr20r(top + 0.8)}H${tr20r(x - 1)}Z" fill="${roof}"/>`;
    const gx = w / (cols + 1), gy = Math.min(5.5, (h - 3) / (rows + 0.6));
    for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
      const wx = x + gx * (q + 1) - 1.1, wy = top + 2.4 + r * gy; if (wy + 2.8 > base - 0.5) continue;
      const on = rnd() < lit;
      if (on) g += `<circle cx="${tr20r(wx + 1.1)}" cy="${tr20r(wy + 1.4)}" r="3.4" fill="${wglow}"/>`;
      g += `<rect x="${tr20r(wx)}" y="${tr20r(wy)}" width="2.2" height="2.8" rx=".5" fill="${on ? "#FFD27A" : "#4B3F7E"}"/>${on ? `<path d="M${tr20r(wx + 1.1)} ${tr20r(wy)}v2.8" stroke="#C98A3A" stroke-width=".3" opacity=".6"/>` : ""}`;
    }
    return g;
  };
  const Y = i === 1 ? 82 : i === 2 ? 79 : 75;
  let back = "", scene = "", o = "";
  /* cielo: notte profonda in alto, rosa caldo sopra la città in festa */
  o += `<rect width="160" height="100" fill="${c.lin([[0, "#0C1238"], [0.5, "#24225E"], [0.82, "#5A3A78"], [1, "#9A5A7C"]])}"/>`;
  let st = ""; for (let k = 0; k < 22; k++) { const x = rnd() * 160, y = rnd() * 34; st += `M${tr20r(x)} ${tr20r(y)}h0`; }
  o += `<path d="${st}" stroke="#FFF6D6" stroke-width="${i === 2 ? 0.7 : 0.8}" stroke-linecap="round" opacity=".55"/>`;
  o += `<ellipse cx="80" cy="${Y - 6}" rx="120" ry="34" fill="${c.rad("#FF9A5A", 0.42)}"/>`;
  /* lanterne lontane (piccole, alte) */
  for (let k = 0; k < 16; k++) { const x = 6 + rnd() * 148, y = 6 + rnd() * 30; o += sky(x, y, 0.32 + rnd() * 0.22, (rnd() - 0.5) * 14); }
  /* profilo della città lontana */
  back += `<path d="M0 ${Y - 14}H10V${Y - 19}L14 ${Y - 23}L18 ${Y - 19}V${Y - 15}H30V${Y - 21}H38V${Y - 13}H52V${Y - 24}L56 ${Y - 29}L60 ${Y - 24}V${Y - 16}H76V${Y - 20}H92V${Y - 12}H104V${Y - 22}L109 ${Y - 27}L114 ${Y - 22}V${Y - 15}H130V${Y - 19}H142V${Y - 14}H160V${Y}H0Z" fill="#2B2560"/>`;
  for (let k = 0; k < 14; k++) { const x = 4 + rnd() * 152, y = Y - 8 - rnd() * 8; back += `<rect x="${tr20r(x)}" y="${tr20r(y)}" width="1.3" height="1.6" fill="#FFC46B" opacity=".75"/>`; }
  if (i === 0) {
    scene += back;
    scene += house(-3, 20, Y - 1.5, 22, "#3B3172", "#22193F", 2, 3) + house(19, 16, Y - 1.5, 17, "#463A80", "#2A1F4A", 2, 2) + house(37, 22, Y - 1.5, 25, "#3A3070", "#20183C", 3, 3);
    scene += house(100, 18, Y - 1.5, 19, "#433780", "#251C45", 2, 2) + house(120, 21, Y - 1.5, 26, "#382E6E", "#1F173B", 2, 3) + house(143, 20, Y - 1.5, 18, "#45397F", "#271D47", 2, 2);
    /* ponte ad arco al centro, con il suo festone */
    scene += `<path d="M58 ${Y - 1.5}V${Y - 9}Q79 ${Y - 17} 100 ${Y - 9}V${Y - 1.5}H94Q94 ${Y - 9} 79 ${Y - 10}Q64 ${Y - 9} 64 ${Y - 1.5}Z" fill="#54457E"/><path d="M58 ${Y - 9}Q79 ${Y - 17} 100 ${Y - 9}" stroke="#8C76B4" stroke-width=".8" fill="none"/><path d="M58 ${Y - 11.5}Q79 ${Y - 19.5} 100 ${Y - 11.5}" stroke="#2A1E44" stroke-width=".6" fill="none"/>`;
    scene += garland(-2, Y - 27, 30, Y - 21, 3, 5, 0) + garland(30, Y - 21, 60, Y - 29, 3.5, 5, 2) + garland(58, Y - 12, 100, Y - 12, 2.2, 6, 1, 0.8) + garland(100, Y - 23, 132, Y - 30, 3.5, 5, 3) + garland(132, Y - 30, 162, Y - 22, 3, 5, 0);
    /* lanterne che salgono dalla riva: la più grande è quella accesa per te */
    [[70, 46, 0.9, -6], [86, 52, 0.75, 5], [50, 40, 0.7, 4], [112, 42, 0.8, -4], [128, 52, 0.62, 6], [38, 50, 0.58, -3], [96, 34, 0.6, 3], [62, 28, 0.5, -5], [140, 36, 0.5, 4], [22, 36, 0.5, 2], [80, 22, 0.45, -2], [118, 24, 0.42, 5]].forEach(([x, y, s, r]) => { scene += sky(x, y, s, r); lights.push([x, y + 2, "#FFB65A", 2.4 * s]); });
    scene += sky(80, Y - 22, 1.5, -4); lights.push([80, Y - 19, "#FFD27A", 3.4]);
    /* banchina */
    scene += `<rect x="0" y="${Y - 1.6}" width="160" height="1.8" fill="#2A1F44"/><path d="M0 ${Y - 1.6}H160" stroke="#7A6496" stroke-width=".35" opacity=".7"/>`;
  } else if (i === 1) {
    /* il fornaio della notte: bottega sul canale, vetrina calda piena di pane */
    scene += back + house(-4, 22, Y - 1.5, 30, "#3A3070", "#20183C", 2, 4) + house(132, 32, Y - 1.5, 32, "#3B3172", "#22193F", 3, 4);
    const bx = 30, bw = 100, bt = Y - 46;
    scene += `<rect x="${bx}" y="${bt}" width="${bw}" height="${46 - 1.5}" fill="#4A3C80"/><rect x="${bx + 66}" y="${bt}" width="34" height="${46 - 1.5}" fill="#000" opacity=".1"/>`;
    scene += `<path d="M${bx - 4} ${bt - 1}Q${bx + 24} ${bt - 1} ${bx + 50} ${bt - 10}Q${bx + 76} ${bt - 1} ${bx + bw + 4} ${bt - 1}L${bx + bw + 2} ${bt + 1.4}H${bx - 2}Z" fill="#251B47"/>`;
    for (let q = 0; q < 4; q++) { const wx = bx + 12 + q * 22; scene += `<circle cx="${wx + 2}" cy="${bt + 7}" r="4" fill="${wglow}"/><rect x="${wx}" y="${bt + 4.5}" width="4" height="5" rx="1.6" fill="#FFD27A"/>`; lights.push([wx + 2, bt + 7, "#FFC870", 2]); }
    /* tenda a righe */
    let aw = ""; for (let k = 0; k < 10; k++) aw += `<path d="M${bx + 6 + k * 8.8} ${bt + 14}h8.8l-.6 6q-3.8 2.2 -7.6 0Z" fill="${k % 2 ? "#F3E2C6" : "#D9573F"}"/>`;
    scene += `<g opacity=".92">${aw}</g><rect x="${bx + 5}" y="${bt + 13}" width="90" height="1.6" rx=".8" fill="#2A1F44"/>`;
    /* vetrina */
    const vx = bx + 10, vy = bt + 22, vw = 54, vh = 19;
    scene += `<rect x="${vx - 6}" y="${vy - 6}" width="${vw + 12}" height="${vh + 12}" fill="${c.rad("#FFC46B", 0.55)}"/><rect x="${vx - 1}" y="${vy - 1}" width="${vw + 2}" height="${vh + 2}" rx="1.6" fill="#2A1F44"/><rect x="${vx}" y="${vy}" width="${vw}" height="${vh}" rx="1" fill="${c.lin([[0, "#FFE4A8"], [1, "#FFB65A"]])}"/>`;
    scene += `<path d="M${vx + 1} ${vy + 8.5}H${vx + vw - 1}M${vx + 1} ${vy + 15.5}H${vx + vw - 1}" stroke="#B9783A" stroke-width=".9"/>`;
    const loaf = (x, y, s, col = "#C9803E") => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="4.2" ry="2.4" fill="${col}"/><path d="M-2.4 -1.2l1 1.8M-.4 -1.8l1 1.9M1.6 -1.5l.9 1.6" stroke="#F6D49A" stroke-width=".6" stroke-linecap="round"/><ellipse cx="-1.4" cy="-1" rx="1.6" ry=".6" fill="#fff" opacity=".25"/></g>`;
    const bun = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="2.2" fill="#D98F45"/><ellipse cx="-.6" cy="-.8" rx="1" ry=".55" fill="#fff" opacity=".3"/></g>`;
    scene += loaf(vx + 8, vy + 6.3, 0.9) + loaf(vx + 19, vy + 6.3, 0.9, "#B9712F") + bun(vx + 29, vy + 6.5, 0.9) + bun(vx + 34, vy + 6.5, 0.9) + loaf(vx + 45, vy + 6.3, 0.9);
    scene += bun(vx + 6, vy + 13.4, 1) + bun(vx + 11, vy + 13.4, 1) + loaf(vx + 22, vy + 13.2, 1, "#B9712F") + bun(vx + 33, vy + 13.4, 1) + loaf(vx + 44, vy + 13.2, 1);
    scene += `<path d="M${vx + 27} ${vy}V${vy + vh}" stroke="#2A1F44" stroke-width="1"/>`;
    lights.push([vx + 14, vy + 10, "#FFD27A", 6], [vx + 40, vy + 10, "#FFD27A", 6]);
    /* porta con la luce accesa e insegna col panino */
    const dx = bx + 74;
    scene += `<rect x="${dx}" y="${vy - 2}" width="16" height="${Y - 1.5 - vy + 2}" rx="1" fill="#2A1F44"/><path d="M${dx + 1.5} ${Y - 1.5}V${vy + 4}a6.5 6.5 0 0 1 13 0V${Y - 1.5}Z" fill="${c.lin([[0, "#FFD99A"], [1, "#F2A050"]])}"/><circle cx="${dx + 12}" cy="${vy + 12}" r=".8" fill="#6E4A2A"/>`;
    lights.push([dx + 8, vy + 10, "#FFD27A", 4]);
    scene += `<path d="M${dx + 8} ${bt + 22}v-3" stroke="#2A1F44" stroke-width=".5"/><circle cx="${dx + 8}" cy="${bt + 15}" r="5" fill="#F3E2C6"/><circle cx="${dx + 8}" cy="${bt + 15}" r="5" fill="none" stroke="#2A1F44" stroke-width=".7"/>${bun(dx + 8, bt + 15.3, 1.15)}`;
    /* comignolo con un filo di fumo (il forno è acceso) */
    scene += `<rect x="${bx + 80}" y="${bt - 10}" width="5" height="8" fill="#3A2E68"/><path d="M${bx + 82.5} ${bt - 11}q-2 -3 0 -6t0 -6" stroke="#C9BFE8" stroke-width="1" fill="none" opacity=".35" stroke-linecap="round"/>`;
    scene += garland(-4, bt - 4, 40, bt - 2, 2.6, 5, 0) + garland(40, bt - 2, 120, bt - 2, 4.5, 9, 2) + garland(120, bt - 2, 164, bt - 6, 2.6, 5, 1);
    [[18, 20, 0.75, -6], [52, 12, 0.6, 4], [100, 14, 0.7, -3], [140, 22, 0.62, 5], [76, 8, 0.5, 2], [124, 6, 0.45, -4], [8, 8, 0.45, 3]].forEach(([x, y, s, r]) => { scene += sky(x, y, s, r); });
    scene += `<rect x="0" y="${Y - 1.6}" width="160" height="1.8" fill="#2A1F44"/><path d="M0 ${Y - 1.6}H160" stroke="#7A6496" stroke-width=".35" opacity=".7"/>`;
  } else {
    /* la torre dell'orologio, fra le lanterne che salgono */
    scene += back + house(-3, 22, Y - 1.5, 20, "#3B3172", "#22193F", 2, 2) + house(76, 20, Y - 1.5, 22, "#433780", "#251C45", 2, 3) + house(98, 18, Y - 1.5, 16, "#3A3070", "#20183C", 2, 2) + house(118, 22, Y - 1.5, 24, "#45397F", "#271D47", 3, 3) + house(142, 20, Y - 1.5, 17, "#382E6E", "#1F173B", 2, 2);
    const tx = 40, tw = 20, tt = 22;
    scene += `<rect x="${tx}" y="${tt}" width="${tw}" height="${Y - 1.5 - tt}" fill="#3F3378"/><rect x="${tx + 13}" y="${tt}" width="7" height="${Y - 1.5 - tt}" fill="#000" opacity=".13"/>`;
    scene += `<path d="M${tx - 3} ${tt + 0.5}H${tx + tw + 3}L${tx + tw / 2} ${tt - 16}Z" fill="#22193F"/><path d="M${tx + tw / 2} ${tt - 16}v-4" stroke="#C9A24A" stroke-width=".8"/><circle cx="${tx + tw / 2}" cy="${tt - 20.5}" r="1" fill="#F2C463"/>`;
    scene += `<rect x="${tx - 1.5}" y="${tt}" width="${tw + 3}" height="2" fill="#2A1F44"/><rect x="${tx - 1.5}" y="${tt + 22}" width="${tw + 3}" height="1.6" fill="#2A1F44"/>`;
    const cx = tx + tw / 2, cy = tt + 11.5;
    scene += `<circle cx="${cx}" cy="${cy}" r="12" fill="${c.rad("#FFE7A8", 0.6)}"/><circle cx="${cx}" cy="${cy}" r="6.6" fill="#2A1F44"/><circle cx="${cx}" cy="${cy}" r="5.8" fill="#FFF1C8"/>`;
    scene += `<path d="M${cx} ${cy - 4.8}v1M${cx + 4.8} ${cy}h-1M${cx} ${cy + 4.8}v-1M${cx - 4.8} ${cy}h1" stroke="#6E5A3A" stroke-width=".6"/><path d="M${cx} ${cy}V${cy - 4}M${cx} ${cy}L${cx + 2.6} ${cy + 1.2}" stroke="#2A1F44" stroke-width=".8" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r=".7" fill="#C9503B"/>`;
    lights.push([cx, cy, "#FFF1C8", 5]);
    for (let r = 0; r < 4; r++) { const wy = tt + 28 + r * 9; if (wy > Y - 8) break; const on = r !== 1; scene += `${on ? `<circle cx="${cx}" cy="${wy + 2}" r="4" fill="${wglow}"/>` : ""}<path d="M${cx - 1.6} ${wy + 4}V${wy + 1.4}a1.6 1.6 0 0 1 3.2 0V${wy + 4}Z" fill="${on ? "#FFD27A" : "#4B3F7E"}"/>`; if (on) lights.push([cx, wy + 2.5, "#FFC870", 1.6]); }
    scene += house(20, 18, Y - 1.5, 15, "#463A80", "#2A1F4A", 2, 2) + house(60, 16, Y - 1.5, 13, "#3B3172", "#22193F", 2, 1);
    scene += garland(cx, tt + 23, 96, Y - 26, 5, 7, 0) + garland(cx, tt + 23, -2, Y - 25, 4, 6, 2) + garland(96, Y - 26, 162, Y - 28, 4, 7, 1);
    [[78, 30, 0.95, -5], [92, 44, 0.85, 4], [70, 14, 0.7, 3], [104, 22, 0.75, -4], [120, 36, 0.7, 6], [136, 16, 0.6, -3], [22, 40, 0.65, 4], [12, 18, 0.55, -2], [88, 6, 0.5, 2], [148, 44, 0.55, 3], [30, 8, 0.45, -3], [112, 52, 0.6, -2], [66, 50, 0.6, 5]].forEach(([x, y, s, r]) => { scene += sky(x, y, s, r); lights.push([x, y + 2, "#FFB65A", 2.4 * s]); });
    scene += `<rect x="0" y="${Y - 1.6}" width="160" height="1.8" fill="#2A1F44"/><path d="M0 ${Y - 1.6}H160" stroke="#7A6496" stroke-width=".35" opacity=".7"/>`;
  }
  const sid = c.def(scene);
  o += `<use href="#${sid}"/>`;
  o += tr20water(c, { Y, scene: sid, top: "#4A3A78", mid: "#241F55", deep: "#0A0D2C", haze: "#E08A6A", squash: 0.62, refl: 0.6, lights, breakCol: "#1A1A48", rip: "#C9B8FF", ripOp: 0.14, seed: 11 + i, glint: "#FFE2A8", glintN: 12 });
  if (i === 0) {
    /* barchetta con la sua lanterna, sull'acqua in primo piano */
    o += `<g transform="translate(118 ${Y + 13})"><ellipse cx="0" cy="3.4" rx="13" ry="1.6" fill="#05071C" opacity=".45"/><path d="M-12 -1H12Q9 4 0 4Q-9 4 -12 -1Z" fill="#5A3A2E"/><path d="M-12 -1H12L11 .4H-11Z" fill="#8A5E44"/><path d="M6 -1V-11" stroke="#3A2A22" stroke-width=".7"/><path d="M6 -11h-3" stroke="#3A2A22" stroke-width=".5"/>${hang(3, -8.2, 0, 0.9)}</g>`;
    o += tr20streak(121, Y + 18, 99, 2.4, "#FFB27A", 0.8, 77);
    o += `<path d="M100 ${Y + 18}q8 -1.2 16 0M120 ${Y + 18.6}q8 -1 14 .3" stroke="#C9B8FF" stroke-width=".5" fill="none" opacity=".35" stroke-linecap="round"/>`;
  }
  return c.svg(label, o);
}

/* ---------- Riva del lago ---------- */
function tr20Lake(i, label) {
  const c = tr20ctx(); const Y = 60; const sx = i === 2 ? 80 : 122, sy = i === 2 ? 30 : 28;
  let o = `<rect width="160" height="100" fill="${c.lin([[0, "#A9D6F0"], [0.7, "#DCEDF3"], [1, "#F6EEDC"]])}"/>`;
  o += `<circle cx="${sx}" cy="${sy}" r="24" fill="${c.rad("#FFE9A8", 0.6)}"/><circle cx="${sx}" cy="${sy}" r="10" fill="#FFE59A"/><circle cx="${sx}" cy="${sy}" r="8.4" fill="#FFF0BC"/>`;
  const cloud = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".9"><ellipse cx="0" cy="0" rx="13" ry="3.6"/><circle cx="-5" cy="-2.6" r="4.6"/><circle cx="3" cy="-3.8" r="5.8"/><circle cx="9" cy="-1.4" r="3.4"/></g>`;
  o += cloud(i === 2 ? 34 : 40, 22, 1) + cloud(i === 2 ? 126 : 82, 14, 0.75);
  let scene = `<path d="M0 ${Y - 8}Q22 ${Y - 18} 46 ${Y - 10}T96 ${Y - 9}Q120 ${Y - 17} 160 ${Y - 9}V${Y}H0Z" fill="#A6CDB4"/>`;
  scene += `<path d="M0 ${Y - 3}Q30 ${Y - 9} 64 ${Y - 4}T130 ${Y - 5}Q148 ${Y - 8} 160 ${Y - 4}V${Y}H0Z" fill="#7DB88C"/>`;
  [[10, 55], [17, 54.4], [24, 55.6], [104, 55], [110, 54.2], [140, 54], [147, 55], [152, 54.6]].forEach(([x, y], k) => { scene += `<ellipse cx="${x}" cy="${y}" rx="${2.6 + (k % 3) * 0.6}" ry="${3.2 + (k % 2)}" fill="${k % 2 ? "#5E9E6E" : "#6BAA78"}"/>`; });
  scene += `<rect x="0" y="${Y - 0.8}" width="160" height="1" fill="#6E9E72" opacity=".6"/>`;
  const sid = c.def(scene);
  o += `<use href="#${sid}"/>`;
  const calm = i === 2;
  o += tr20water(c, { Y, scene: sid, top: "#B7DCEE", mid: "#79B3D8", deep: "#2F6FA6", squash: calm ? 0.92 : 0.72, refl: calm ? 0.78 : 0.5, lights: [], breakCol: calm ? "#8CC2E2" : "#5E9CC8", rip: "#fff", ripOp: calm ? 0.12 : 0.22, seed: 21 + i, glint: "#fff", glintN: calm ? 6 : 12, ripN: calm ? 8 : 16 });
  if (calm) o += `<ellipse cx="${sx}" cy="${Y + 14}" rx="9" ry="12" fill="${c.rad("#FFF3C4", 0.45)}"/>`;
  /* il sole che luccica sull'acqua */
  o += tr20streak(sx, Y + 1.5, 99, calm ? 9 : 7, "#FFF6D6", calm ? 0.75 : 0.85, 41 + i, calm ? 2.2 : 1.6);
  o += tr20spark(sx - 3, Y + 6, 1.6, "#fff", 0.9) + tr20spark(sx + 4, Y + 12, 1.2, "#fff", 0.8);
  /* canne a sinistra (il carattere della riva) */
  o += `<path d="M6 100Q5 86 8 72M11 100Q12 88 15 76M16 100Q15 90 19 80M3 100Q2 92 1 84" stroke="#4F7E43" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M8 72q-4 6 -6 14M15 76q4 5 5 12" stroke="#6A9A52" stroke-width="1.1" fill="none" stroke-linecap="round"/><ellipse cx="8.2" cy="74" rx="1.3" ry="3.4" fill="#7A4E30"/><ellipse cx="15" cy="78" rx="1.2" ry="3" fill="#7A4E30"/>`;
  const pad = (x, y, s, fl) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx=".4" cy=".8" rx="7" ry="2.2" fill="#1E4E6E" opacity=".25"/><path d="M0 0L6.8 -.6A7 2.4 0 1 0 6.8 .6Z" fill="#6DAE5E"/><path d="M0 0L5 -1M0 0L-4 -1.4M0 0L-2 1.6" stroke="#8CC67A" stroke-width=".4"/>${fl ? `<path d="M-1.6 -.6Q-2.6 -3.6 -.2 -4.2Q.4 -2 0 -.4ZM1.6 -.6Q2.6 -3.6 .2 -4.2Q-.4 -2 0 -.4Z" fill="#F7B6CB"/><path d="M0 -.4Q-.8 -4 0 -5Q.8 -4 0 -.4Z" fill="#FBD3E0"/><circle cx="0" cy="-1.4" r=".6" fill="#FFD25E"/>` : ""}</g>`;
  if (i === 0) {
    /* sassi che saltano: cinque cerchi sempre più piccoli e lontani */
    [[44, 92, 7.4], [60, 83, 5.8], [74, 76.5, 4.4], [86, 71.5, 3.3], [96, 67.8, 2.4]].forEach(([x, y, r], k) => { o += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${tr20r(r * 0.3)}" fill="none" stroke="#fff" stroke-width="${tr20r(0.8 - k * 0.08)}" opacity=".8"/><ellipse cx="${x}" cy="${y}" rx="${tr20r(r * 0.55)}" ry="${tr20r(r * 0.16)}" fill="none" stroke="#fff" stroke-width=".5" opacity=".55"/><ellipse cx="${x}" cy="${tr20r(y + r * 0.08)}" rx="${tr20r(r * 1.25)}" ry="${tr20r(r * 0.4)}" fill="#1E4E6E" opacity=".08"/>`; });
    o += `<ellipse cx="103" cy="64.6" rx="1.3" ry=".8" fill="#8A8F96"/><path d="M98 66.4q2.6 -2.4 4.2 -1.6" stroke="#fff" stroke-width=".5" fill="none" opacity=".7" stroke-dasharray="1 1"/>`;
    /* l'anatra che applaude con le ali */
    o += `<g transform="translate(130 74)"><ellipse cx="0" cy="4.4" rx="9" ry="1.6" fill="#1E4E6E" opacity=".25"/><path d="M-7 1Q-7 5 0 5Q8 5 8 0Q6 -2 2 -1Q-4 -3 -7 1Z" fill="#FBF6EA"/><path d="M-4 -1Q-9 -7 -6 -9Q-3 -4 -1 -2Z" fill="#EFE6D2"/><path d="M3 -1Q7 -8 10 -6Q7 -2 5 0Z" fill="#EFE6D2"/><circle cx="6.4" cy="-3.6" r="3" fill="#FBF6EA"/><path d="M9 -3.6l3 .6l-3 1Z" fill="#F2A040"/><circle cx="7.2" cy="-4.4" r=".55" fill="#2F2A26"/><path d="M-11 -10l1.4 1.4M-12.4 -6.6h2M12 -10l-1.2 1.4M13.4 -7h-2" stroke="#fff" stroke-width=".7" stroke-linecap="round" opacity=".9"/><path d="M-7 3.6q7 1.6 14 0" stroke="#DCCFB8" stroke-width=".5" fill="none"/></g>`;
    o += `<path d="M118 79q6 -1 12 0M126 81q8 -1.2 14 .2" stroke="#fff" stroke-width=".5" fill="none" opacity=".55" stroke-linecap="round"/>`;
  } else if (i === 1) {
    /* la barchetta di foglia, con la scia */
    o += `<path d="M66 82L46 86M66 82L48 80M70 83.4L54 90" stroke="#fff" stroke-width=".5" opacity=".5" fill="none" stroke-linecap="round"/>`;
    o += `<g transform="translate(82 82)"><path d="M-13 1Q0 8 13 0Q0 5 -13 1Z" fill="#1E4E6E" opacity=".25"/><g transform="scale(1 -.55) translate(0 -2)" opacity=".35"><path d="M-12 -1Q0 4 12 -2Q6 -4 0 -3.6Q-7 -3.4 -12 -1Z" fill="#5E9A3E"/></g><path d="M-12 -1Q0 4 12 -2Q6 -4 0 -3.6Q-7 -3.4 -12 -1Z" fill="#7DBB52"/><path d="M-11 -1.2Q0 .6 11 -2" stroke="#5E9A3E" stroke-width=".6" fill="none"/><path d="M-1 -2.6V-15" stroke="#7A5A3A" stroke-width=".8"/><path d="M-.6 -14.6Q7 -10 -.6 -5.4Z" fill="#FBE7D4"/><path d="M-.6 -14.6Q4 -10 -.6 -5.4" stroke="#E9CDB2" stroke-width=".4" fill="none"/></g>`;
    o += pad(124, 90, 1.1, true) + pad(140, 84, 0.8, false) + pad(36, 94, 0.9, false);
  } else {
    o += pad(122, 92, 1.15, true) + pad(138, 86, 0.8, false) + pad(48, 95, 0.9, true);
    o += `<path d="M64 76q16 -1 32 0" stroke="#fff" stroke-width=".4" fill="none" opacity=".35"/>`;
  }
  return c.svg(label, o);
}

/* La Città delle lanterne e il lago si disegnano qui; le altre mete restano quelle di prima */
const _postcardTr20 = postcard;
postcard = function (dest, i, label) {
  try { if (dest === "city") return tr20City(Math.max(0, Math.min(2, i | 0)), label); if (dest === "lake") return tr20Lake(Math.max(0, Math.min(2, i | 0)), label); } catch (e) { /* in caso di problemi resta il disegno di prima */ }
  return _postcardTr20(dest, i, label);
};

/* --- Acqua più vera nei mondi fantastici e nei luoghi veri: si aggiunge sopra l'acqua che c'è già
   (riflesso di cielo in alto, profondità in basso, increspature, scintillii), ritagliata sulla sua forma,
   prima di tutto ciò che sta sopra l'acqua (barche, tartarughe, sabbia...). Il carattere di ogni cartolina resta. */
function tr20fxDefs(svg, defs) { return svg.includes("<defs>") ? svg.replace("<defs>", "<defs>" + defs) : svg.replace(/(<svg[^>]*>)/, `$1<defs>${defs}</defs>`); }
function tr20topY(tag, attrs) {
  if (tag === "rect") { const m = attrs.match(/\by="([-\d.]+)"/); return m ? +m[1] : 0; }
  if (tag === "ellipse") { const a = attrs.match(/\bcy="([-\d.]+)"/), b = attrs.match(/\bry="([-\d.]+)"/); return a ? +a[1] - (b ? +b[1] : 0) : 0; }
  const d = attrs.match(/\bd="([^"]+)"/); if (!d) return 0; const nums = d[1].match(/-?\d+(\.\d+)?/g) || []; let mn = 100; for (let k = 1; k < nums.length; k += 2) mn = Math.min(mn, +nums[k]); return mn;
}
function tr20waterOver(svg, re, pal) {
  let defs = ""; let k = 0;
  const out = svg.replace(re, (el, tag, a) => {
    const y0 = Math.max(0, Math.min(98, tr20topY(tag, a))); const cid = nid("tr20wc"); const gid = nid("tr20wg"); const H = 100 - y0;
    defs += `<clipPath id="${cid}"><${tag}${a.replace(/\sfill="[^"]*"/g, "").replace(/\sopacity="[^"]*"/g, "")}/></clipPath><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal.sky}" stop-opacity="${pal.skyOp == null ? 0.45 : pal.skyOp}"/><stop offset=".3" stop-color="${pal.sky}" stop-opacity="0"/><stop offset=".55" stop-color="${pal.deep}" stop-opacity="0"/><stop offset="1" stop-color="${pal.deep}" stop-opacity="${pal.deepOp == null ? 0.35 : pal.deepOp}"/></linearGradient>`;
    let fx = `<g clip-path="url(#${cid})"><rect x="0" y="${tr20r(y0)}" width="160" height="${tr20r(H)}" fill="url(#${gid})"/>`;
    fx += tr20ripples(y0 + 0.8, 100, Math.max(5, Math.round(H / 3.2)), pal.dark, pal.darkOp || 0.22, 0.5, 51 + k);
    fx += tr20ripples(y0 + 1.6, 100, Math.max(4, Math.round(H / 4.5)), pal.light, pal.lightOp || 0.3, 0.45, 61 + k);
    if (pal.sun) fx += tr20streak(pal.sun[0], y0 + 1, Math.min(100, y0 + H * 0.9), pal.sun[1] || 6, pal.sunCol || "#FFF6D6", 0.75, 71 + k);
    fx += tr20glints(81 + k, Math.max(4, Math.round(H / 3)), 3, 157, y0 + 1, 99, pal.glint || "#fff", 0.75);
    fx += `<path d="M0 ${tr20r(y0 + 0.3)}H160" stroke="#fff" stroke-width=".5" opacity="${pal.edge == null ? 0.35 : pal.edge}"/></g>`;
    k++; return el + fx;
  });
  return k ? tr20fxDefs(out, defs) : svg;
}
const TR20_WPAL = { sky: "#fff", deep: "#123F6A", dark: "#2F78A8", light: "#fff" };
const _realArtTr20 = realArt;
realArt = function (art, label) {
  const s = _realArtTr20(art, label);
  try { const m = s.match(/id="(rw[^"]+)"/); if (!m) return s; return tr20waterOver(s, new RegExp(`<(rect|path|ellipse)\\b([^>]*?fill="url\\(#${m[1]}\\)"[^>]*?)\\/>`, "g"), TR20_WPAL); } catch (e) { return s; }
};
const _worldArtTr20 = worldArt;
worldArt = function (id, i, label) {
  const s = _worldArtTr20(id, i, label);
  try {
    if (id === "shells") {
      if (i === 2) return tr20waterOver(s, /<(rect)\b( x="0" y="52" width="160" height="48" fill="url\(#[^)]+\)")\/>/, { sky: "#FFE3B0", skyOp: 0.5, deep: "#1C4F7A", dark: "#2E6C96", light: "#FFE7C2", lightOp: 0.35, sun: [112, 9], sunCol: "#FFE9B0", glint: "#FFE9C8" });
      return tr20waterOver(s, /<(rect)\b( x="0" y="50" width="160" height="26" fill="url\(#[^)]+\)")\/>/, { sky: "#E8FBFF", skyOp: 0.6, deep: "#1F8FA6", deepOp: 0.4, dark: "#3AA6B8", light: "#fff", lightOp: 0.4 });
    }
    if (id === "starsea") return tr20waterOver(s, /<(rect)\b( x="0" y="56" width="160" height="44" fill="url\(#[^)]+\)")\/>/, { sky: "#7C88D8", skyOp: 0.35, deep: "#05082A", deepOp: 0.45, dark: "#0E1440", darkOp: 0.5, light: "#AFC0FF", lightOp: 0.18, glint: "#FFF8DC", edge: 0.25, sun: i === 1 ? [80, 8] : i === 0 ? [90, 4] : null, sunCol: i === 0 ? "#FFD27A" : "#FFF8DC" });
    if (id === "fireflies" && i === 0) return tr20waterOver(s, /<(path)\b( d="M66 78Q84 81 78 87Q66 94 72 100H108Q96 94 102 87Q110 80 92 78Z" fill="#6F97B9")\/>/, { sky: "#F2C9A8", skyOp: 0.45, deep: "#1E3550", deepOp: 0.45, dark: "#4A6E92", darkOp: 0.35, light: "#C8DDF0", lightOp: 0.4, glint: "#FFE27A", edge: 0.2 });
  } catch (e) { /* niente */ }
  return s;
};

/* =================== TESTI =================== */
const tr20ruN = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; };
const tr20plN = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return n === 1 ? a : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? b : c; };
const TR20T = {
  it: {
    kShort: "Gita breve", kFull: "Viaggio completo", infoL: "Cosa vuol dire?", infoT: "Come funzionano i viaggi",
    b1: (n) => `Ogni obiettivo che completi dà energia a ${n}.`,
    b2: (n) => `Con metà degli obiettivi fatti, ${n} può fare una gita breve qui vicino. Con tutti, un viaggio completo, anche nei mondi lontani.`,
    b3: (n) => `Mentre è via la stanza resta vuota: ${n} torna da solo dopo il tempo indicato. Intanto puoi continuare con i tuoi obiettivi.`,
    b4: "Al ritorno porta Tanì, punti e una cartolina nuova per l'album. La gita breve porta metà dei Tanì e dei punti.",
    b5: "Si parte una volta al giorno: domani c'è un nuovo viaggio.",
    now: (p, k, t) => `Adesso: ${p} · ${k} · torna verso le ${t}`, ok: "Ho capito",
    stFull: (n) => `Energia piena! ${n} può partire per qualsiasi meta sbloccata, con il premio intero.`,
    stShort: (n, k) => `Metà degli obiettivi fatti: ${n} può fare una gita breve nelle mete vicine, con metà premio. ${k === 1 ? "Con l'ultimo obiettivo" : `Con altri ${k} obiettivi`} diventa un viaggio completo.`,
    stNote: "Si parte una volta al giorno: se va adesso, oggi resta una gita breve.",
    stNeed: (n, k) => `${k === 1 ? "Ancora 1 obiettivo" : `Ancora ${k} obiettivi`} e ${n} potrà fare una gita breve. Un passo alla volta!`,
    stNeedOne: (n) => `Completa il tuo obiettivo di oggi e ${n} potrà partire.`,
    stUsed: (n) => `${n} ha già viaggiato oggi. Domani si riparte: completa gli obiettivi e scegli una nuova meta.`,
    stFree: "Oggi non hai obiettivi: i viaggi ripartono dal prossimo giorno con obiettivi.",
    prog: (a, b) => `${a}/${b} obiettivi`, howT: "Come funziona",
    s1: "Completa gli obiettivi: danno energia", s2: "Scegli una meta e fallo partire", s3: "Torna con una cartolina, Tanì e punti",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} punti`, fullOnly: "Solo viaggio completo", nearOk: "Va bene anche per la gita breve",
    tNeed: (k) => (k === 1 ? "Ancora 1 obiettivo per la gita breve" : `Ancora ${k} obiettivi per la gita breve`),
    tFar: (p) => `Per ${p} serve il viaggio completo: completa tutti gli obiettivi di oggi.`,
    tUsed: (n) => `${n} ha già viaggiato oggi: domani si riparte!`,
    pts: (b) => `+${b} punti`, cta: (n) => `${n} può fare una gita breve!`, ctaB: "Scegli la gita",
    tripsP: "Completa gli obiettivi per dargli energia, poi scegli dove mandarlo. Torna con una cartolina e qualche sorpresa."
  },
  en: {
    kShort: "Short trip", kFull: "Full trip", infoL: "What does this mean?", infoT: "How trips work",
    b1: (n) => `Every goal you complete gives ${n} energy.`,
    b2: (n) => `With half your goals done, ${n} can take a short trip nearby. With all of them, a full trip, even to faraway worlds.`,
    b3: (n) => `While they're away, the room stays empty: ${n} comes back on their own after the time shown. Meanwhile, you can keep going with your goals.`,
    b4: "They come back with Tanì, points and a new postcard for your album. A short trip brings half the Tanì and points.",
    b5: "One trip a day: tomorrow brings a new one.",
    now: (p, k, t) => `Now: ${p} · ${k} · back around ${t}`, ok: "Got it",
    stFull: (n) => `Full energy! ${n} can go to any unlocked place, with the full reward.`,
    stShort: (n, k) => `Half your goals are done: ${n} can take a short trip to a nearby place, for half the reward. ${k === 1 ? "One more goal" : `${k} more goals`} and it's a full trip.`,
    stNote: "One trip a day: if they leave now, today's trip stays a short one.",
    stNeed: (n, k) => `${k === 1 ? "1 more goal" : `${k} more goals`} and ${n} can take a short trip. One step at a time!`,
    stNeedOne: (n) => `Complete today's goal and ${n} can set off on a trip.`,
    stUsed: (n) => `${n} already traveled today. Tomorrow there's a new trip: complete your goals and pick a new place.`,
    stFree: "No goals today: trips start again on your next day with goals.",
    prog: (a, b) => `${a}/${b} goals`, howT: "How it works",
    s1: "Complete your goals: they give energy", s2: "Pick a place and send them off", s3: "They come back with a postcard, Tanì and points",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} points`, fullOnly: "Full trip only", nearOk: "Good for a short trip too",
    tNeed: (k) => (k === 1 ? "1 more goal for a short trip" : `${k} more goals for a short trip`),
    tFar: (p) => `${p} needs a full trip: complete all of today's goals.`,
    tUsed: (n) => `${n} already traveled today: new trip tomorrow!`,
    pts: (b) => `+${b} points`, cta: (n) => `${n} can take a short trip!`, ctaB: "Pick a trip",
    tripsP: "Complete your goals to give them energy, then choose where to send them. They'll come back with a postcard and a few surprises."
  },
  de: {
    kShort: "Kurzer Ausflug", kFull: "Ganze Reise", infoL: "Was heißt das?", infoT: "So funktionieren Reisen",
    b1: (n) => `Jedes Ziel, das du erledigst, gibt ${n} Energie.`,
    b2: (n) => `Mit der Hälfte deiner Ziele kann ${n} einen kurzen Ausflug in die Nähe machen. Mit allen eine ganze Reise, auch in ferne Welten.`,
    b3: (n) => `Solange ${n} unterwegs ist, bleibt das Zimmer leer. Nach der angezeigten Zeit kommt ${n} von selbst zurück. In der Zeit kannst du weiter an deinen Zielen arbeiten.`,
    b4: "Mit zurück kommen Tanì, Punkte und eine neue Postkarte fürs Album. Ein kurzer Ausflug bringt die Hälfte der Tanì und Punkte.",
    b5: "Eine Reise pro Tag: Morgen geht es wieder los.",
    now: (p, k, t) => `Jetzt: ${p} · ${k} · zurück gegen ${t}`, ok: "Verstanden",
    stFull: (n) => `Volle Energie! ${n} kann zu jedem freigeschalteten Reiseziel, mit voller Belohnung.`,
    stShort: (n, k) => `Die Hälfte deiner Ziele ist geschafft: ${n} kann einen kurzen Ausflug in die Nähe machen, mit halber Belohnung. ${k === 1 ? "Noch 1 Ziel" : `Noch ${k} Ziele`}, dann wird es eine ganze Reise.`,
    stNote: "Eine Reise pro Tag: Wenn es jetzt losgeht, bleibt es heute beim kurzen Ausflug.",
    stNeed: (n, k) => `${k === 1 ? "Noch 1 Ziel" : `Noch ${k} Ziele`}, dann kann ${n} einen kurzen Ausflug machen. Schritt für Schritt!`,
    stNeedOne: (n) => `Erledige dein Ziel für heute, dann kann ${n} auf Reisen gehen.`,
    stUsed: (n) => `${n} war heute schon unterwegs. Morgen geht's weiter: Erledige deine Ziele und wähle ein neues Reiseziel.`,
    stFree: "Heute hast du keine Ziele: Reisen gibt es wieder am nächsten Tag mit Zielen.",
    prog: (a, b) => `${a}/${b} Ziele`, howT: "So geht's",
    s1: "Erledige deine Ziele: Sie geben Energie", s2: "Wähle ein Reiseziel und los geht's", s3: "Zurück mit Postkarte, Tanì und Punkten",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} Punkte`, fullOnly: "Nur als ganze Reise", nearOk: "Auch als kurzer Ausflug",
    tNeed: (k) => (k === 1 ? "Noch 1 Ziel bis zum kurzen Ausflug" : `Noch ${k} Ziele bis zum kurzen Ausflug`),
    tFar: (p) => `Für ${p} braucht es eine ganze Reise: Erledige alle Ziele für heute.`,
    tUsed: (n) => `${n} war heute schon unterwegs: Morgen geht's weiter!`,
    pts: (b) => `+${b} Punkte`, cta: (n) => `${n} kann einen kurzen Ausflug machen!`, ctaB: "Ausflug wählen",
    tripsP: "Erledige deine Ziele, um Energie zu sammeln, und wähle dann ein Reiseziel. Mit zurück kommen eine Postkarte und ein paar Überraschungen."
  },
  es: {
    kShort: "Excursión corta", kFull: "Viaje completo", infoL: "¿Qué significa?", infoT: "Cómo funcionan los viajes",
    b1: (n) => `Cada objetivo que completas le da energía a ${n}.`,
    b2: (n) => `Con la mitad de tus objetivos hechos, ${n} puede hacer una excursión corta aquí cerca. Con todos, un viaje completo, incluso a los mundos lejanos.`,
    b3: (n) => `Mientras está fuera, la habitación se queda vacía: ${n} vuelve cuando pasa el tiempo indicado. Mientras tanto, puedes seguir con tus objetivos.`,
    b4: "Al volver trae Tanì, puntos y una postal nueva para el álbum. La excursión corta trae la mitad de Tanì y de puntos.",
    b5: "Se sale una vez al día: mañana hay un nuevo viaje.",
    now: (p, k, t) => `Ahora: ${p} · ${k} · vuelve hacia las ${t}`, ok: "Entendido",
    stFull: (n) => `¡Energía llena! ${n} puede ir a cualquier destino desbloqueado, con el premio entero.`,
    stShort: (n, k) => `Ya hiciste la mitad de tus objetivos: ${n} puede hacer una excursión corta a un destino cercano, con medio premio. ${k === 1 ? "Con 1 objetivo más" : `Con ${k} objetivos más`} será un viaje completo.`,
    stNote: "Se sale una vez al día: si sale ahora, hoy se queda en excursión corta.",
    stNeed: (n, k) => `${k === 1 ? "1 objetivo más" : `${k} objetivos más`} y ${n} podrá hacer una excursión corta. ¡Paso a paso!`,
    stNeedOne: (n) => `Completa tu objetivo de hoy y ${n} podrá salir de viaje.`,
    stUsed: (n) => `${n} ya viajó hoy. Mañana, otro viaje: completa tus objetivos y elige un destino nuevo.`,
    stFree: "Hoy no tienes objetivos: los viajes vuelven el próximo día con objetivos.",
    prog: (a, b) => `${a}/${b} objetivos`, howT: "Cómo funciona",
    s1: "Completa tus objetivos: dan energía", s2: "Elige un destino y ¡a viajar!", s3: "Vuelve con una postal, Tanì y puntos",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} puntos`, fullOnly: "Solo viaje completo", nearOk: "Vale también para excursión corta",
    tNeed: (k) => (k === 1 ? "1 objetivo más para la excursión corta" : `${k} objetivos más para la excursión corta`),
    tFar: (p) => `Para ${p} hace falta el viaje completo: completa todos tus objetivos de hoy.`,
    tUsed: (n) => `${n} ya viajó hoy: ¡mañana, más!`,
    pts: (b) => `+${b} puntos`, cta: (n) => `¡${n} puede hacer una excursión corta!`, ctaB: "Elegir excursión",
    tripsP: "Completa tus objetivos para darle energía y luego elige adónde mandarlo. Volverá con una postal y alguna sorpresa."
  },
  fr: {
    kShort: "Petite balade", kFull: "Grand voyage", infoL: "Qu'est-ce que ça veut dire ?", infoT: "Comment marchent les voyages",
    b1: (n) => `Chaque objectif que tu termines donne de l'énergie à ${n}.`,
    b2: (n) => `Avec la moitié de tes objectifs faits, ${n} peut faire une petite balade tout près. Avec tous, un grand voyage, même vers les mondes lointains.`,
    b3: (n) => `Pendant l'absence, la chambre reste vide : ${n} revient une fois le temps indiqué écoulé. En attendant, tu peux continuer tes objectifs.`,
    b4: "Au retour : des Tanì, des points et une nouvelle carte postale pour l'album. La petite balade rapporte la moitié des Tanì et des points.",
    b5: "Un départ par jour : demain, un nouveau voyage t'attend.",
    now: (p, k, t) => `En ce moment : ${p} · ${k} · retour vers ${t}`, ok: "Compris",
    stFull: (n) => `Énergie au max ! ${n} peut partir vers n'importe quelle destination débloquée, avec la récompense entière.`,
    stShort: (n, k) => `La moitié de tes objectifs est faite : ${n} peut faire une petite balade vers une destination proche, pour la moitié de la récompense. ${k === 1 ? "Encore 1 objectif" : `Encore ${k} objectifs`} et ce sera un grand voyage.`,
    stNote: "Un départ par jour : s'il part maintenant, aujourd'hui ce sera une petite balade.",
    stNeed: (n, k) => `${k === 1 ? "Encore 1 objectif" : `Encore ${k} objectifs`} et ${n} pourra faire une petite balade. Pas à pas !`,
    stNeedOne: (n) => `Termine ton objectif du jour et ${n} pourra partir en voyage.`,
    stUsed: (n) => `${n} a déjà voyagé aujourd'hui. Demain, on repart : termine tes objectifs et choisis une nouvelle destination.`,
    stFree: "Pas d'objectifs aujourd'hui : les voyages reprennent au prochain jour avec des objectifs.",
    prog: (a, b) => `${a}/${b} objectifs`, howT: "Comment ça marche",
    s1: "Termine tes objectifs : ils donnent de l'énergie", s2: "Choisis une destination et c'est parti", s3: "Retour avec une carte postale, des Tanì et des points",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} points`, fullOnly: "Grand voyage seulement", nearOk: "Possible aussi en petite balade",
    tNeed: (k) => (k === 1 ? "Encore 1 objectif pour la petite balade" : `Encore ${k} objectifs pour la petite balade`),
    tFar: (p) => `${p} demande un grand voyage : termine tous tes objectifs du jour.`,
    tUsed: (n) => `${n} a déjà voyagé aujourd'hui : on repart demain !`,
    pts: (b) => `+${b} points`, cta: (n) => `${n} peut faire une petite balade !`, ctaB: "Choisir la balade",
    tripsP: "Termine tes objectifs pour lui donner de l'énergie, puis choisis où l'envoyer. Il revient avec une carte postale et quelques surprises."
  },
  pt: {
    kShort: "Passeio curto", kFull: "Viagem completa", infoL: "O que isso quer dizer?", infoT: "Como funcionam as viagens",
    b1: (n) => `Cada meta que você completa dá energia para ${n}.`,
    b2: (n) => `Com metade das metas feitas, ${n} pode fazer um passeio curto aqui perto. Com todas, uma viagem completa, até para os mundos distantes.`,
    b3: (n) => `Durante a viagem, o quarto fica vazio: ${n} volta quando o tempo indicado acabar. Enquanto isso, você pode continuar com suas metas.`,
    b4: "Na volta traz Tanì, pontos e um cartão-postal novo para o álbum. O passeio curto traz metade dos Tanì e dos pontos.",
    b5: "Uma partida por dia: amanhã tem uma nova viagem.",
    now: (p, k, t) => `Agora: ${p} · ${k} · volta por volta das ${t}`, ok: "Entendi",
    stFull: (n) => `Energia cheia! ${n} pode ir para qualquer destino desbloqueado, com o prêmio inteiro.`,
    stShort: (n, k) => `Metade das metas feita: ${n} pode fazer um passeio curto a um destino perto, com metade do prêmio. ${k === 1 ? "Com mais 1 meta" : `Com mais ${k} metas`}, vira uma viagem completa.`,
    stNote: "Uma partida por dia: se sair agora, hoje fica no passeio curto.",
    stNeed: (n, k) => `${k === 1 ? "Mais 1 meta" : `Mais ${k} metas`} e ${n} poderá fazer um passeio curto. Um passo de cada vez!`,
    stNeedOne: (n) => `Complete sua meta de hoje e ${n} poderá viajar.`,
    stUsed: (n) => `${n} já viajou hoje. Amanhã tem mais: complete suas metas e escolha um destino novo.`,
    stFree: "Hoje você não tem metas: as viagens voltam no próximo dia com metas.",
    prog: (a, b) => `${a}/${b} metas`, howT: "Como funciona",
    s1: "Complete suas metas: elas dão energia", s2: "Escolha um destino e partiu", s3: "Volta com um cartão-postal, Tanì e pontos",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} pontos`, fullOnly: "Só viagem completa", nearOk: "Também serve para passeio curto",
    tNeed: (k) => (k === 1 ? "Mais 1 meta para o passeio curto" : `Mais ${k} metas para o passeio curto`),
    tFar: (p) => `${p} pede uma viagem completa: complete todas as metas de hoje.`,
    tUsed: (n) => `${n} já viajou hoje: amanhã tem mais!`,
    pts: (b) => `+${b} pontos`, cta: (n) => `${n} pode fazer um passeio curto!`, ctaB: "Escolher o passeio",
    tripsP: "Complete suas metas para dar energia e depois escolha para onde mandá-lo. Ele volta com um cartão-postal e algumas surpresas."
  },
  ja: {
    kShort: "ちょっとおでかけ", kFull: "本格的な旅", infoL: "これってどういうこと？", infoT: "おでかけのしくみ",
    b1: (n) => `目標をひとつ達成するたびに、${n}に元気がたまります。`,
    b2: (n) => `目標の半分を達成すると、${n}は近くへちょっとおでかけできます。全部達成すると、遠くの世界まで本格的な旅に出られます。`,
    b3: (n) => `おでかけ中は部屋が空っぽになります。表示された時間がたつと、${n}はひとりで帰ってきます。そのあいだも目標は続けられます。`,
    b4: "帰ってくるとTanìとポイント、アルバム用の新しいポストカードを持ってきます。ちょっとおでかけのときは、Tanìとポイントが半分になります。",
    b5: "旅は1日1回です。明日はまた新しいおでかけが待っています。",
    now: (p, k, t) => `いま：${p}・${k}・${t}ごろ帰ってきます`, ok: "わかりました",
    stFull: (n) => `元気満タン！${n}は解放ずみのどこへでも旅に出られます。ごほうびもまるごともらえます。`,
    stShort: (n, k) => `目標の半分を達成しました。${n}は近くの行き先へちょっとおでかけできます（ごほうびは半分）。あと${k}つ達成すると本格的な旅になります。`,
    stNote: "旅は1日1回です。いま出かけると、今日はちょっとおでかけになります。",
    stNeed: (n, k) => `あと${k}つ目標を達成すると、${n}はちょっとおでかけできます。一歩ずつでだいじょうぶ！`,
    stNeedOne: (n) => `今日の目標を達成すると、${n}は旅に出られます。`,
    stUsed: (n) => `${n}は今日もう旅をしました。明日また目標を達成して、新しい行き先を選びましょう。`,
    stFree: "今日は目標がありません。次に目標がある日に、またおでかけできます。",
    prog: (a, b) => `目標 ${a}/${b}`, howT: "しくみ",
    s1: "目標を達成して元気をためる", s2: "行き先を選んで送り出す", s3: "ポストカードとTanì、ポイントを持って帰ってくる",
    tag: (k, a, b) => `${k}・+${a} Tanì・+${b}ポイント`, fullOnly: "本格的な旅のみ", nearOk: "ちょっとおでかけもOK",
    tNeed: (k) => `ちょっとおでかけまで、あと目標${k}つ`,
    tFar: (p) => `${p}へは本格的な旅が必要です。今日の目標を全部達成しましょう。`,
    tUsed: (n) => `${n}は今日もう旅をしました。また明日！`,
    pts: (b) => `+${b}ポイント`, cta: (n) => `${n}はちょっとおでかけできます！`, ctaB: "おでかけ先を選ぶ",
    tripsP: "目標を達成して元気をためたら、行き先を選んで送り出しましょう。ポストカードとちょっとしたおみやげを持って帰ってきます。"
  },
  ko: {
    kShort: "짧은 나들이", kFull: "본격 여행", infoL: "무슨 뜻이에요?", infoT: "여행은 이렇게 돼요",
    b1: (n) => `목표를 하나 마칠 때마다 ${n}에게 에너지가 쌓여요.`,
    b2: () => "목표를 절반 마치면 가까운 곳으로 짧은 나들이를 갈 수 있어요. 전부 마치면 먼 세계까지 본격 여행을 떠날 수 있어요.",
    b3: () => "떠나 있는 동안 방은 비어 있고, 표시된 시간이 지나면 저절로 돌아와요. 그동안에도 목표는 계속할 수 있어요.",
    b4: "돌아올 때 Tanì와 포인트, 앨범에 넣을 새 엽서를 가져와요. 짧은 나들이는 Tanì와 포인트가 절반이에요.",
    b5: "여행은 하루에 한 번이에요. 내일 또 새로운 여행이 기다려요.",
    now: (p, k, t) => `지금: ${p} · ${k} · ${t}쯤 돌아와요`, ok: "알겠어요",
    stFull: () => "에너지 가득! 열린 곳이라면 어디든 떠날 수 있고, 보상도 전부 받아요.",
    stShort: (n, k) => `목표를 절반 마쳤어요. 가까운 곳으로 짧은 나들이를 갈 수 있어요(보상 절반). 목표를 ${k}개 더 마치면 본격 여행이 돼요.`,
    stNote: "여행은 하루에 한 번이에요. 지금 떠나면 오늘은 짧은 나들이로 끝나요.",
    stNeed: (n, k) => `목표를 ${k}개 더 마치면 짧은 나들이를 갈 수 있어요. 한 걸음씩 해 봐요!`,
    stNeedOne: () => "오늘의 목표를 마치면 여행을 떠날 수 있어요.",
    stUsed: () => "오늘은 이미 여행을 다녀왔어요. 내일 목표를 마치고 새 여행지를 골라 봐요.",
    stFree: "오늘은 목표가 없어요. 목표가 있는 다음 날에 다시 여행을 떠날 수 있어요.",
    prog: (a, b) => `목표 ${a}/${b}`, howT: "이렇게 해요",
    s1: "목표를 마치면 에너지가 쌓여요", s2: "여행지를 골라 떠나보내요", s3: "엽서, Tanì, 포인트를 들고 돌아와요",
    tag: (k, a, b) => `${k} · Tanì +${a} · 포인트 +${b}`, fullOnly: "본격 여행만 가능", nearOk: "짧은 나들이도 가능",
    tNeed: (k) => `짧은 나들이까지 목표 ${k}개 남았어요`,
    tFar: (p) => `${p}: 본격 여행이 필요해요. 오늘의 목표를 모두 마쳐 봐요.`,
    tUsed: () => "오늘은 이미 여행을 다녀왔어요. 내일 또 떠나요!",
    pts: (b) => `포인트 +${b}`, cta: () => "짧은 나들이를 갈 수 있어요!", ctaB: "나들이 고르기",
    tripsP: "목표를 마쳐 에너지를 채운 뒤, 어디로 보낼지 골라요. 엽서와 깜짝 선물을 들고 돌아올 거예요."
  },
  zh: {
    kShort: "短途出游", kFull: "完整旅行", infoL: "这是什么意思？", infoT: "旅行是怎么回事",
    b1: (n) => `你每完成一个目标，${n} 就会获得能量。`,
    b2: (n) => `完成一半的目标，${n} 就能去附近短途出游。全部完成，就能来一次完整旅行，连遥远的世界也能去。`,
    b3: (n) => `出门的时候，房间会空着。到了显示的时间，${n} 会自己回来。这段时间你可以继续完成目标。`,
    b4: "回来时会带回 Tanì、点数和一张新明信片，放进相册。短途出游带回的 Tanì 和点数减半。",
    b5: "每天出发一次：明天还有新的旅行。",
    now: (p, k, t) => `现在：${p} · ${k} · 大约 ${t} 回来`, ok: "知道了",
    stFull: (n) => `能量满满！${n} 可以去任何已解锁的地方，奖励全额。`,
    stShort: (n, k) => `已经完成一半的目标：${n} 可以去附近的地方短途出游，奖励减半。再完成 ${k} 个目标，就能来一次完整旅行。`,
    stNote: "每天出发一次：现在出发的话，今天就是短途出游。",
    stNeed: (n, k) => `再完成 ${k} 个目标，${n} 就能去短途出游。一步一步来！`,
    stNeedOne: (n) => `完成今天的目标，${n} 就能出发旅行。`,
    stUsed: (n) => `${n} 今天已经旅行过了。明天再完成目标，选一个新地方吧。`,
    stFree: "今天没有目标：到下一个有目标的日子，旅行会再开始。",
    prog: (a, b) => `目标 ${a}/${b}`, howT: "怎么玩",
    s1: "完成目标，积攒能量", s2: "选一个目的地，送它出发", s3: "带着明信片、Tanì 和点数回来",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} 点`, fullOnly: "仅限完整旅行", nearOk: "也可以短途出游",
    tNeed: (k) => `再完成 ${k} 个目标就能短途出游`,
    tFar: (p) => `去“${p}”需要完整旅行：完成今天所有的目标吧。`,
    tUsed: (n) => `${n} 今天已经旅行过了，明天再出发！`,
    pts: (b) => `+${b} 点`, cta: (n) => `${n} 可以去短途出游了！`, ctaB: "选择出游地点",
    tripsP: "完成目标为它积攒能量，然后选一个地方让它去吧。它会带回一张明信片和一些惊喜。"
  },
  zht: {
    kShort: "短途出遊", kFull: "完整旅行", infoL: "這是什麼意思？", infoT: "旅行是怎麼一回事",
    b1: (n) => `你每完成一個目標，${n} 就會獲得能量。`,
    b2: (n) => `完成一半的目標，${n} 就能去附近短途出遊。全部完成，就能來一趟完整旅行，連遙遠的世界也能去。`,
    b3: (n) => `出門的時候，房間會空著。到了顯示的時間，${n} 會自己回來。這段時間你可以繼續完成目標。`,
    b4: "回來時會帶回 Tanì、點數和一張新明信片，放進相簿。短途出遊帶回的 Tanì 和點數減半。",
    b5: "每天出發一次：明天還有新的旅行。",
    now: (p, k, t) => `現在：${p} · ${k} · 大約 ${t} 回來`, ok: "知道了",
    stFull: (n) => `能量滿滿！${n} 可以去任何已解鎖的地方，獎勵全額。`,
    stShort: (n, k) => `已經完成一半的目標：${n} 可以去附近的地方短途出遊，獎勵減半。再完成 ${k} 個目標，就能來一趟完整旅行。`,
    stNote: "每天出發一次：現在出發的話，今天就是短途出遊。",
    stNeed: (n, k) => `再完成 ${k} 個目標，${n} 就能去短途出遊。一步一步來！`,
    stNeedOne: (n) => `完成今天的目標，${n} 就能出發旅行。`,
    stUsed: (n) => `${n} 今天已經旅行過了。明天再完成目標，選一個新地方吧。`,
    stFree: "今天沒有目標：到下一個有目標的日子，旅行會再開始。",
    prog: (a, b) => `目標 ${a}/${b}`, howT: "怎麼玩",
    s1: "完成目標，累積能量", s2: "選一個目的地，送牠出發", s3: "帶著明信片、Tanì 和點數回來",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} 點`, fullOnly: "僅限完整旅行", nearOk: "也可以短途出遊",
    tNeed: (k) => `再完成 ${k} 個目標就能短途出遊`,
    tFar: (p) => `去「${p}」需要完整旅行：完成今天所有的目標吧。`,
    tUsed: (n) => `${n} 今天已經旅行過了，明天再出發！`,
    pts: (b) => `+${b} 點`, cta: (n) => `${n} 可以去短途出遊了！`, ctaB: "選擇出遊地點",
    tripsP: "完成目標為牠累積能量，然後選一個地方送牠去吧。牠會帶著明信片和一些驚喜回來。"
  },
  ru: {
    kShort: "Короткая прогулка", kFull: "Большое путешествие", infoL: "Что это значит?", infoT: "Как устроены поездки",
    b1: (n) => `За каждую выполненную цель ${n} получает энергию.`,
    b2: (n) => `Когда выполнена половина целей, ${n} может сходить на короткую прогулку неподалёку. Когда выполнены все, можно отправиться в большое путешествие, даже в далёкие миры.`,
    b3: (n) => `Пока ${n} в пути, комната пустует. Через указанное время ${n} вернётся домой. А ты пока можешь выполнять свои цели.`,
    b4: "Из поездки питомец привозит Tanì, очки и новую открытку для альбома. Короткая прогулка приносит половину Tanì и очков.",
    b5: "Одна поездка в день: завтра ждёт новая.",
    now: (p, k, t) => `Сейчас: ${p} · ${k} · возвращение около ${t}`, ok: "Понятно",
    stFull: (n) => `Полная энергия! ${n} может отправиться в любое открытое место, с полной наградой.`,
    stShort: (n, k) => `Половина целей выполнена: ${n} может сходить на короткую прогулку неподалёку, с половиной награды. Ещё ${k} ${tr20ruN(k, "цель", "цели", "целей")}, и будет большое путешествие.`,
    stNote: "Одно путешествие в день: если отправиться сейчас, сегодня будет короткая прогулка.",
    stNeed: (n, k) => `Ещё ${k} ${tr20ruN(k, "цель", "цели", "целей")}, и ${n} сможет сходить на короткую прогулку. Шаг за шагом!`,
    stNeedOne: (n) => `Выполни цель на сегодня, и ${n} сможет отправиться в путешествие.`,
    stUsed: () => "Сегодня путешествие уже было. Завтра снова: выполни цели и выбери новое место.",
    stFree: "Сегодня у тебя нет целей: поездки продолжатся в следующий день с целями.",
    prog: (a, b) => `Цели: ${a}/${b}`, howT: "Как это работает",
    s1: "Выполняй цели: они дают энергию", s2: "Выбери место — и в путь", s3: "Возвращение с открыткой, Tanì и очками",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} ${tr20ruN(b, "очко", "очка", "очков")}`, fullOnly: "Только большое путешествие", nearOk: "Подходит и для прогулки",
    tNeed: (k) => `Ещё ${k} ${tr20ruN(k, "цель", "цели", "целей")} до короткой прогулки`,
    tFar: (p) => `«${p}» только для большого путешествия: выполни все цели на сегодня.`,
    tUsed: () => "Сегодня путешествие уже было: завтра снова в путь!",
    pts: (b) => `+${b} ${tr20ruN(b, "очко", "очка", "очков")}`, cta: (n) => `${n} может сходить на короткую прогулку!`, ctaB: "Выбрать прогулку",
    tripsP: "Выполняй цели, чтобы набрать энергию, а потом выбери, куда отправить питомца. Он вернётся с открыткой и парой сюрпризов."
  },
  pl: {
    kShort: "Krótka wycieczka", kFull: "Pełna podróż", infoL: "Co to znaczy?", infoT: "Jak działają podróże",
    b1: (n) => `Każdy ukończony cel daje energię. ${n} zbiera ją na podróż.`,
    b2: (n) => `Gdy połowa celów jest zrobiona, ${n} może wyruszyć na krótką wycieczkę w pobliże. Gdy wszystkie, w pełną podróż, nawet do dalekich światów.`,
    b3: (n) => `W czasie podróży pokój jest pusty. Po podanym czasie ${n} wraca do domu. A ty możesz dalej realizować swoje cele.`,
    b4: "Z podróży przychodzą Tanì, punkty i nowa pocztówka do albumu. Krótka wycieczka daje połowę Tanì i punktów.",
    b5: "Jedna podróż dziennie: jutro czeka nowa podróż.",
    now: (p, k, t) => `Teraz: ${p} · ${k} · powrót około ${t}`, ok: "Rozumiem",
    stFull: (n) => `Pełna energia! ${n} może wyruszyć do każdego odblokowanego miejsca, z pełną nagrodą.`,
    stShort: (n, k) => `Połowa celów zrobiona: ${n} może wyruszyć na krótką wycieczkę w pobliże, z połową nagrody. Jeszcze ${k} ${tr20plN(k, "cel", "cele", "celów")} i będzie pełna podróż.`,
    stNote: "Jedna podróż dziennie: wyjście teraz oznacza, że dziś zostaje krótka wycieczka.",
    stNeed: (n, k) => `Jeszcze ${k} ${tr20plN(k, "cel", "cele", "celów")} do krótkiej wycieczki. Krok po kroku!`,
    stNeedOne: (n) => `Zrealizuj dzisiejszy cel, a ${n} wyruszy w podróż.`,
    stUsed: () => "Dzisiejsza podróż już była. Jutro znowu: zrealizuj cele i wybierz nowe miejsce.",
    stFree: "Dziś nie masz celów: podróże wracają w kolejny dzień z celami.",
    prog: (a, b) => `Cele: ${a}/${b}`, howT: "Jak to działa",
    s1: "Realizuj cele: dają energię", s2: "Wybierz miejsce i w drogę", s3: "Powrót z pocztówką, Tanì i punktami",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} pkt`, fullOnly: "Tylko pełna podróż", nearOk: "Też na krótką wycieczkę",
    tNeed: (k) => `Jeszcze ${k} ${tr20plN(k, "cel", "cele", "celów")} do krótkiej wycieczki`,
    tFar: (p) => `${p}: potrzebna pełna podróż. Zrealizuj wszystkie dzisiejsze cele.`,
    tUsed: () => "Dzisiejsza podróż już była: jutro znowu w drogę!",
    pts: (b) => `+${b} pkt`, cta: () => "Czas na krótką wycieczkę!", ctaB: "Wybierz wycieczkę",
    tripsP: "Realizuj cele, żeby zebrać energię, a potem wybierz, dokąd wysłać towarzysza. Wróci z pocztówką i kilkoma niespodziankami."
  },
  nl: {
    kShort: "Kort uitje", kFull: "Hele reis", infoL: "Wat betekent dit?", infoT: "Zo werken reizen",
    b1: (n) => `Elk doel dat je afrondt, geeft ${n} energie.`,
    b2: (n) => `Met de helft van je doelen klaar kan ${n} een kort uitje in de buurt maken. Met alles klaar een hele reis, zelfs naar verre werelden.`,
    b3: (n) => `Zolang ${n} weg is, blijft de kamer leeg. Na de aangegeven tijd komt ${n} vanzelf terug. Ondertussen kun je gewoon verder met je doelen.`,
    b4: "Terug met Tanì, punten en een nieuwe kaart voor je album. Een kort uitje levert de helft van de Tanì en punten op.",
    b5: "Eén reis per dag: morgen wacht er een nieuwe reis.",
    now: (p, k, t) => `Nu: ${p} · ${k} · terug rond ${t}`, ok: "Begrepen",
    stFull: (n) => `Volle energie! ${n} kan naar elke ontgrendelde plek, met de hele beloning.`,
    stShort: (n, k) => `De helft van je doelen is klaar: ${n} kan een kort uitje maken naar een plek in de buurt, voor de halve beloning. Nog ${k} ${k === 1 ? "doel" : "doelen"} en het wordt een hele reis.`,
    stNote: "Eén reis per dag: wie nu vertrekt, houdt het vandaag bij een kort uitje.",
    stNeed: (n, k) => `Nog ${k} ${k === 1 ? "doel" : "doelen"} en ${n} kan een kort uitje maken. Stap voor stap!`,
    stNeedOne: (n) => `Rond je doel van vandaag af en ${n} kan op reis.`,
    stUsed: (n) => `${n} is vandaag al op reis geweest. Morgen weer: rond je doelen af en kies een nieuwe plek.`,
    stFree: "Vandaag heb je geen doelen: reizen gaan verder op je volgende dag met doelen.",
    prog: (a, b) => `${a}/${b} doelen`, howT: "Zo werkt het",
    s1: "Rond je doelen af: ze geven energie", s2: "Kies een plek en laat je maatje vertrekken", s3: "Terug met een kaart, Tanì en punten",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} punten`, fullOnly: "Alleen hele reis", nearOk: "Kan ook als kort uitje",
    tNeed: (k) => `Nog ${k} ${k === 1 ? "doel" : "doelen"} voor een kort uitje`,
    tFar: (p) => `Voor ${p} is een hele reis nodig: rond al je doelen van vandaag af.`,
    tUsed: (n) => `${n} is vandaag al op reis geweest: morgen weer!`,
    pts: (b) => `+${b} punten`, cta: (n) => `${n} kan een kort uitje maken!`, ctaB: "Kies een uitje",
    tripsP: "Rond je doelen af voor energie en kies dan waar je maatje heen gaat. Het komt terug met een ansichtkaart en een paar verrassingen."
  },
  tr: {
    kShort: "Kısa gezinti", kFull: "Tam yolculuk", infoL: "Bu ne demek?", infoT: "Geziler nasıl işler",
    b1: (n) => `Tamamladığın her hedef ${n} için enerji demek.`,
    b2: (n) => `Hedeflerinin yarısını bitirince ${n} yakına kısa bir gezintiye çıkabilir. Hepsini bitirince uzak dünyalara bile tam bir yolculuğa çıkabilir.`,
    b3: (n) => `Yoldayken oda boş kalır. Gösterilen süre dolunca ${n} kendiliğinden döner. Bu arada hedeflerine devam edebilirsin.`,
    b4: "Dönüşte Tanì, puan ve albüm için yeni bir kartpostal getirir. Kısa gezinti Tanì ve puanların yarısını getirir.",
    b5: "Günde bir yolculuk: yarın yeni bir gezi var.",
    now: (p, k, t) => `Şu an: ${p} · ${k} · ${t} civarı döner`, ok: "Anladım",
    stFull: (n) => `Enerji dolu! ${n} açılmış her yere, ödülün tamamıyla gidebilir.`,
    stShort: (n, k) => `Hedeflerinin yarısı tamam: ${n} yakındaki bir yere kısa bir gezintiye çıkabilir, ödülün yarısıyla. ${k} hedef daha bitirirsen tam yolculuk olur.`,
    stNote: "Günde bir yolculuk: şimdi çıkarsa bugün kısa gezinti olarak kalır.",
    stNeed: (n, k) => `${k} hedef daha ve ${n} kısa bir gezintiye çıkabilir. Adım adım!`,
    stNeedOne: (n) => `Bugünkü hedefini tamamla, ${n} yolculuğa çıkabilsin.`,
    stUsed: (n) => `${n} bugün zaten yolculuk yaptı. Yarın yine: hedeflerini tamamla ve yeni bir yer seç.`,
    stFree: "Bugün hedefin yok: geziler hedefin olan bir sonraki gün yeniden başlar.",
    prog: (a, b) => `${a}/${b} hedef`, howT: "Nasıl işler",
    s1: "Hedeflerini tamamla: enerji verir", s2: "Bir yer seç ve yola çıkar", s3: "Kartpostal, Tanì ve puanla döner",
    tag: (k, a, b) => `${k} · +${a} Tanì · +${b} puan`, fullOnly: "Sadece tam yolculuk", nearOk: "Kısa gezintiye de uygun",
    tNeed: (k) => `Kısa gezinti için ${k} hedef daha`,
    tFar: (p) => `${p} için tam yolculuk gerekir: bugünkü tüm hedeflerini tamamla.`,
    tUsed: (n) => `${n} bugün zaten yolculuk yaptı: yarın yine!`,
    pts: (b) => `+${b} puan`, cta: (n) => `${n} kısa bir gezintiye çıkabilir!`, ctaB: "Gezinti seç",
    tripsP: "Enerji için hedeflerini tamamla, sonra onu nereye göndereceğini seç. Bir kartpostal ve birkaç sürprizle dönecek."
  }
};
const tr20t = () => TR20T[S.lang] || TR20T.en;
/* Città delle lanterne: i racconti parlano della festa (lanterne che salgono, canale, fornaio, torre) */
const TR20_CITY = {
  it: [["La festa delle lanterne", "Stanotte tutta la città ha lasciato volare in cielo le lanterne di carta. {n} ne ha accesa una per te e l'ha guardata salire sopra il canale."], ["Il fornaio della notte", "Nella notte della festa, un fornaio sul canale ha regalato a {n} un panino caldo appena sfornato. Profumava di casa."], ["La torre dell'orologio", "Dalla torre dell'orologio {n} ha visto le lanterne salire fra le stelle, poi la città addormentarsi, una luce alla volta."]],
  en: [["The lantern festival", "Tonight the whole town set paper lanterns free in the sky. {n} lit one for you and watched it rise over the canal."], ["The night baker", "On festival night, a baker by the canal gave {n} a warm bun fresh from the oven. It smelled like home."], ["The clock tower", "From the clock tower, {n} watched the lanterns drift up among the stars, then the town fall asleep, one light at a time."]],
  de: [["Das Laternenfest", "Heute Nacht hat die ganze Stadt Papierlaternen in den Himmel steigen lassen. {n} hat eine für dich angezündet und ihr nachgeschaut, wie sie über den Kanal flog."], ["Der Nachtbäcker", "In der Festnacht schenkte ein Bäcker am Kanal {n} ein warmes Brötchen direkt aus dem Ofen. Es duftete nach Zuhause."], ["Der Uhrturm", "Vom Uhrturm aus sah {n} die Laternen zwischen den Sternen aufsteigen und dann die Stadt einschlafen, ein Licht nach dem anderen."]],
  es: [["La fiesta de los farolillos", "Esta noche toda la ciudad soltó farolillos de papel hacia el cielo. {n} encendió uno para ti y lo vio subir sobre el canal."], ["El panadero nocturno", "En la noche de la fiesta, un panadero junto al canal le regaló a {n} un panecillo recién hecho. Olía a hogar."], ["La torre del reloj", "Desde la torre del reloj, {n} vio los farolillos subir entre las estrellas y luego la ciudad dormirse, una luz tras otra."]],
  fr: [["La fête des lanternes", "Ce soir, toute la ville a laissé s'envoler des lanternes de papier dans le ciel. {n} en a allumé une pour toi et l'a regardée monter au-dessus du canal."], ["Le boulanger de la nuit", "Le soir de la fête, un boulanger au bord du canal a offert à {n} un petit pain tout chaud sorti du four. Ça sentait bon la maison."], ["La tour de l'horloge", "Du haut de la tour de l'horloge, {n} a regardé les lanternes monter parmi les étoiles, puis la ville s'endormir, une lumière après l'autre."]],
  pt: [["A festa das lanternas", "Esta noite a cidade inteira soltou lanternas de papel no céu. {n} acendeu uma para você e ficou olhando ela subir sobre o canal."], ["O padeiro da noite", "Na noite da festa, um padeiro à beira do canal deu a {n} um pãozinho quentinho, saído do forno. Tinha cheiro de casa."], ["A torre do relógio", "Do alto da torre do relógio, {n} viu as lanternas subirem entre as estrelas e depois a cidade adormecer, uma luz de cada vez."]],
  ja: [["ランタン祭り", "今夜は町じゅうの人が紙のランタンを空に放ちました。{n}もあなたのためにひとつ灯して、運河の上へのぼっていくのを見送りました。"], ["夜のパン屋さん", "お祭りの夜、運河のそばのパン屋さんが{n}に焼きたてのあったかいパンをくれました。おうちの匂いがしました。"], ["時計塔", "時計塔の上から、{n}はランタンが星のあいだへのぼっていくのを眺めました。それから明かりがひとつずつ消えて、町は眠りにつきました。"]],
  ko: [["등불 축제", "오늘 밤 마을 사람들이 모두 종이 등불을 하늘로 날려 보냈어요. {n}도 당신을 위해 하나를 밝혀서 운하 위로 날아오르는 걸 지켜봤어요."], ["밤의 제빵사", "축제의 밤, 운하 옆 제빵사가 {n}에게 갓 구운 따끈한 빵을 줬어요. 집 냄새가 났어요."], ["시계탑", "시계탑 위에 올라간 {n}. 등불들이 별 사이로 떠오르고, 불빛이 하나씩 꺼지며 마을이 잠드는 걸 바라봤어요."]],
  zh: [["灯笼节", "今晚，全镇的人都把纸灯笼放上了夜空。{n} 为你点亮了一盏，看着它飘过运河，越飞越高。"], ["夜里的面包师", "灯笼节的夜里，运河边的一位面包师送给 {n} 一个刚出炉的热面包。闻起来像家的味道。"], ["钟楼", "{n} 在钟楼上看着灯笼飘进星星之间，然后小镇的灯一盏一盏熄灭，慢慢进入梦乡。"]],
  zht: [["燈籠節", "今晚，全鎮的人都把紙燈籠放上了夜空。{n} 為你點亮了一盞，看著它飄過運河，越飛越高。"], ["深夜麵包師", "燈籠節的夜裡，運河邊的一位麵包師送給 {n} 一個剛出爐的熱麵包。聞起來有家的味道。"], ["鐘塔", "{n} 在鐘塔上看著燈籠飄進星星之間，然後小鎮的燈一盞一盞熄滅，慢慢進入夢鄉。"]],
  ru: [["Праздник фонарей", "Этой ночью весь город отпускает в небо бумажные фонарики. {n} зажигает один для тебя и смотрит, как он поднимается над каналом."], ["Ночной пекарь", "В праздничную ночь пекарь у канала угощает {n} тёплой булочкой прямо из печи. Она пахнет домом."], ["Часовая башня", "С часовой башни {n} смотрит, как фонарики поднимаются к звёздам, а потом город засыпает, огонёк за огоньком."]],
  pl: [["Święto lampionów", "Tej nocy całe miasteczko puszcza w niebo papierowe lampiony. {n} zapala jeden dla ciebie i patrzy, jak wznosi się nad kanałem."], ["Nocny piekarz", "W noc święta {n} dostaje od piekarza znad kanału ciepłą bułeczkę prosto z pieca. Pachnie domem."], ["Wieża zegarowa", "Z wieży zegarowej {n} patrzy, jak lampiony wznoszą się do gwiazd, a potem miasteczko zasypia, światło po świetle."]],
  nl: [["Het lampionnenfeest", "Vannacht liet de hele stad papieren lampionnen naar de hemel opstijgen. {n} stak er een aan voor jou en keek hoe hij boven het kanaal omhoogzweefde."], ["De nachtbakker", "Op de feestnacht gaf een bakker aan het kanaal {n} een warm broodje, vers uit de oven. Het rook naar thuis."], ["De klokkentoren", "Vanaf de klokkentoren zag {n} de lampionnen tussen de sterren opstijgen, en daarna de stad in slaap vallen, lichtje voor lichtje."]],
  tr: [["Fener şenliği", "Bu gece bütün kasaba kâğıt fenerleri gökyüzüne bıraktı. {n} senin için bir tane yaktı ve kanalın üstünde yükselişini izledi."], ["Gece fırıncısı", "Şenlik gecesi {n}, kanal kenarındaki bir fırıncıdan fırından yeni çıkmış sıcacık bir çörek aldı. Ev gibi kokuyordu."], ["Saat kulesi", "{n} saat kulesinden fenerlerin yıldızlara doğru süzülüşünü, sonra kasabanın ışık ışık uykuya dalışını izledi."]]
};
Object.keys(TR20_CITY).forEach((l) => { if (T[l] && T[l].stories) T[l].stories.city = TR20_CITY[l]; if (T[l] && TR20T[l]) T[l].tripsP = TR20T[l].tripsP; });
ICON.tr20i = '<circle cx="12" cy="12" r="9.2"/><path d="M12 11v5.6"/><path d="M12 7.6v.2" stroke-width="2.6"/>';

/* =================== REGOLE DEL VIAGGIO =================== */
/* S.v20trip.days: i giorni in cui è partito un viaggio (ultimi 60), così spostando l'orologio avanti e indietro
   non si riparte in un giorno che ha già avuto il suo viaggio */
const tr20Days = () => (S.v20trip && Array.isArray(S.v20trip.days) ? S.v20trip.days.filter((d) => typeof d === "string") : []);
const tr20Used = () => !!(S.v20trip && (S.v20trip.day === dkey() || tr20Days().includes(dkey())));
function tr20Mark(day, kind) { const ds = tr20Days().filter((d) => d !== day); ds.push(day); S.v20trip = { day, kind, days: ds.slice(-60) }; }
/* com'è oggi: "full" (tutti gli obiettivi), "short" (almeno metà), oppure perché non si parte */
function tr20Info() {
  const tg = todayGoals(); const n = tg.length; const dn = S.done.filter((g) => tg.includes(g)).length; const half = Math.ceil(n / 2);
  let why = "need", kind = null;
  if (S.away) why = "away";
  else if (tr20Used()) why = "used";
  else if (S.energy >= 99.9 || (n && dn >= n)) { why = "full"; kind = "full"; }
  else if (n && dn >= half) { why = "short"; kind = "short"; }
  else if (!n) why = "free";
  return { why, kind, n, dn, half, needShort: Math.max(0, half - dn), needFull: Math.max(0, n - dn) };
}
const tr20Near = (key) => TRIP_SHORT_DESTS.includes(key);
/* Tanì di un viaggio "normale": se c'è l'economia nuova (98e_v20_econ, EC.TRIP) vale quella, così le etichette
   mostrano sempre quello che arriva davvero al ritorno (98e riproporziona anche la gita breve) */
function tr20TripTani() { try { if (typeof EC !== "undefined" && EC && EC.TRIP > 0) return EC.TRIP; } catch (e) { /* EC non ancora pronto */ } return SEEDS_TRIP; }
function tr20Rw(key, kind) {
  let tani = tr20TripTani(), xp = XP_TRIP, h = 1;
  try { const d = destByKey(key); h = d.h || 1; if (key.startsWith("v:")) { tani = V19W_TANI[d.v]; xp = V19W_XP[d.v]; } } catch (e) { /* valori di base */ }
  if (kind === "short") return { tani: Math.round(tani * TRIP_PARTIAL_MULT), xp: Math.round(xp * TRIP_PARTIAL_MULT), h: h * TRIP_PARTIAL_TIME };
  return { tani, xp, h };
}
function tr20CanGo(key, kind) {
  if (!key || !kind) return false;
  let d; try { d = destByKey(key); } catch (e) { return false; } if (!d) return false;
  if (S.level < (d.lvl || 1)) return false;
  if (key.startsWith("w:") && !(typeof plusActive === "function" && plusActive())) return false;
  return kind === "full" || tr20Near(key);
}
function tr20Dur(h) {
  if (h >= 1 && Math.abs(h - Math.round(h)) < 0.01) return L().hours(Math.round(h));
  const m = Math.round(h * 60); const u = { ja: "分", ko: "분", zh: "分钟", zht: "分鐘", ru: " мин" }[S.lang];
  return u ? `${m}${u}` : `${m} min`;
}
/* dopo il viaggio di oggi l'energia resta "spesa" (anche se si completano altri obiettivi) */
function tr20Clamp() { if (!S.away && tr20Used() && S.energy > 0) S.energy = 0; }
function tr20GoalEnergy() { const tg = todayGoals(); const dn = S.done.filter((g) => tg.includes(g)).length; return !tg.length ? 0 : dn >= tg.length ? 100 : Math.min(100, (dn * 100) / tg.length + dn * 0.001); }

/* --- Partenza (sostituisce quella di prima: stesso gesto e stessa animazione) --- */
function tr20Pick(key) {
  pickedDest = key; SND.play("click");
  const st = tr20Info(); const t = tr20t();
  if (!S.away) {
    if (st.why === "need") toast(st.half >= st.n ? t.stNeedOne(S.petName) : t.tNeed(st.needShort));
    else if (st.why === "used") toast(t.tUsed(S.petName));
    else if (st.why === "free") toast(t.stFree);
    else if (st.why === "short" && !tr20Near(key)) { let nm = ""; try { nm = destByKey(key).name; } catch (e) { nm = ""; } toast(t.tFar(nm)); }
  }
  render();
}
function tr20Depart() {
  const st = tr20Info(); const key = pickedDest; if (!st.kind || !key || S.away || !tr20CanGo(key, st.kind)) return;
  const d = destByKey(key); const kind = st.kind; const ms = Math.round(d.h * (kind === "short" ? TRIP_PARTIAL_TIME : 1) * 3600000);
  const go = () => {
    if (S.away) return;
    S.away = { dest: d.key, until: Date.now() + ms, kind, t0: Date.now() };
    if (kind === "short") S.away.c7 = 1; /* la gita breve dura poco: niente spostamento notturno */
    tr20Mark(dkey(), kind); pickedDest = null; sayText = null; clearTimeout(sayTimer); save(); render();
  };
  tab = "today"; render(); window.scrollTo(0, 0); SND.play("depart");
  const p = document.getElementById("petInner");
  /* 1.0.9: la foglia del marchio (come nel video) copre la stanza mentre il compagno esce, sotto si passa alla scena del viaggio */
  const wipe = () => { if (typeof leafWipe === "function") leafWipe(go); else go(); };
  if (p && anim) G.timeline().to(p, { y: -20, duration: 0.2 }).to(p, { x: 380, y: 0, duration: 0.9, ease: "power2.in" }).add(wipe, "-=0.3");
  else go();
}

/* --- Ritorno: la gita breve dà metà Tanì e metà punti; il viaggio conta per il giorno in cui è partito --- */
const _finishTripTr20 = finishTrip;
finishTrip = function () {
  const a = S.away; if (!a || !a.dest) return _finishTripTr20();
  const kind = a.kind === "short" ? "short" : "full";
  let depDay = dkey();
  try { const t0 = a.t0 || a.until - destByKey(a.dest).h * (kind === "short" ? TRIP_PARTIAL_TIME : 1) * 3600000; depDay = dkey(new Date(t0)); } catch (e) { /* oggi */ }
  if (!S.v20trip || S.v20trip.day < depDay) tr20Mark(depDay, kind); /* vecchi salvataggi: il viaggio in corso conta come quello del giorno */
  const full = tr20Rw(a.dest, "full"); const part = kind === "short" ? tr20Rw(a.dest, "short") : full;
  const xpCut = kind === "short" ? XP_TRIP - Math.round(XP_TRIP * TRIP_PARTIAL_MULT) : 0;
  if (xpCut) S.xp -= xpCut; /* tolto prima, così il passaggio di livello resta giusto */
  _finishTripTr20();
  if (kind === "short") S.seeds -= SEEDS_TRIP - Math.round(SEEDS_TRIP * TRIP_PARTIAL_MULT);
  if (story) { story.tr20 = kind; story.tr20xp = part.xp; if (kind === "short") story.tani = part.tani; }
  /* partito ieri e tornato oggi: l'energia di oggi viene dagli obiettivi di oggi */
  S.energy = depDay === dkey() ? 0 : tr20GoalEnergy();
  save();
};

/* --- Obiettivi anche mentre è in viaggio (prima erano bloccati senza dirlo) --- */
const _completeGoalTr20 = completeGoal;
completeGoal = function (g, rect) {
  if (!S.away) { _completeGoalTr20(g, rect); tr20Clamp(); return; }
  if (S.done.includes(g) || !todayGoals().includes(g)) return;
  /* viaggio già finito ma non ancora ridisegnato (app riaperta): prima torna a casa, una volta sola (niente premi doppi) */
  if (Date.now() >= S.away.until) { render(); return; }
  const away = S.away, r0 = render; let back = false;
  S.away = null;
  render = function () { S.away = away; try { return r0.apply(this, arguments); } finally { if (!S.away) back = true; S.away = null; } };
  try { _completeGoalTr20(g, rect); } finally { render = r0; S.away = back ? null : away; }
  save(); render();
};
const _petPeekTr20 = petPeek;
petPeek = function (text, e) { if (S.away) return; _petPeekTr20(text, e); };
const _openAllDoneTr20 = openAllDone;
openAllDone = function () { if (S.away || tr20Used()) return; _openAllDoneTr20(); };
const _rollDayTr20 = rollDay;
rollDay = function () { const d0 = S.day; _rollDayTr20(); if (S.day !== d0 && S.away && S.energy) { S.energy = 0; save(); } };
const _renderTr20 = render;
render = function () { tr20Clamp(); _renderTr20(); };

/* =================== INTERFACCIA =================== */
const tr20iBtn = () => `<button class="tr20i" type="button" data-tr20info="1" aria-label="${esc(tr20t().infoL)}">${icon("tr20i")}</button>`;
function tr20InfoSheet(back) {
  const t = tr20t(); const n = S.petName || "";
  let now = "";
  if (S.away) {
    let place = ""; try { place = destByKey(S.away.dest).name; } catch (e) { place = ""; }
    const tm = intlDT(loc(), { hour: "2-digit", minute: "2-digit" }).format(new Date(S.away.until));
    now = `<p class="tr20now">${icon("clock")}<span>${esc(t.now(place, S.away.kind === "short" ? t.kShort : t.kFull, tm))}</span></p>`;
  }
  const items = [["check", t.b1(n)], ["trips", t.b2(n)], ["home", t.b3(n)], ["card", t.b4], ["clock", t.b5]];
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="tr20iT"><div class="box card tr20sheet"><h2 id="tr20iT">${esc(t.infoT)}</h2>${now}<ul class="tr20list">${items.map(([ic, tx]) => `<li><span class="tr20ic">${icon(ic)}</span><span>${esc(tx)}</span></li>`).join("")}</ul><button class="btn block" id="tr20InfoOk" type="button"${back ? ' data-back="1"' : ""}>${esc(t.ok)}</button></div></div>`;
  SND.play("pop"); const ok = layer.querySelector("#tr20InfoOk"); if (ok) ok.focus();
  if (anim) G.from(".tr20sheet", { y: 24, opacity: 0, duration: 0.35, ease: "power3.out" });
}
/* scheda "è in avventura": pulsante i, e se è una gita breve lo si dice */
const _awayCardTr20 = awayCard;
awayCard = function () {
  let h = _awayCardTr20(); const t = tr20t();
  h = h.replace('<div class="away">', `<div class="away tr20away">${tr20iBtn()}`);
  if (S.away && S.away.kind === "short") h = h.replace('<p class="muted">', `<p class="muted"><span class="tr20badge short">${esc(t.kShort)}</span> `);
  return h;
};
const _awayFullTr20 = awayFull;
awayFull = function () {
  _awayFullTr20();
  if (S.away && S.away.kind === "short") { const p = layer.querySelector(".awayfull .afbar p"); if (p && !p.querySelector(".tr20badge")) p.insertAdjacentHTML("afterbegin", `<span class="tr20badge short">${esc(tr20t().kShort)}</span> `); }
  const cl = layer.querySelector(".awayfull .afbar #closeLayer"); if (cl && !layer.querySelector(".afbar .tr20i")) cl.insertAdjacentHTML("beforebegin", tr20iBtn().replace('class="tr20i"', 'class="tr20i tr20iaf" data-tr20back="1"'));
};
/* scheda in cima alle Avventure: dove si può andare adesso e perché */
function tr20StatusCard() {
  const st = tr20Info(); if (st.why === "away") return ""; const t = tr20t(); const n = S.petName || "";
  let badge = "", txt = "", note = "";
  if (st.why === "full") { badge = `<span class="tr20badge full">${esc(t.kFull)}</span>`; txt = t.stFull(n); }
  else if (st.why === "short") { badge = `<span class="tr20badge short">${esc(t.kShort)}</span>`; txt = t.stShort(n, st.needFull); note = t.stNote; }
  else if (st.why === "used") txt = t.stUsed(n);
  else if (st.why === "free") txt = t.stFree;
  else txt = st.half >= st.n ? t.stNeedOne(n) : t.stNeed(n, st.needShort);
  let bar = "";
  if (st.n && st.why !== "used") {
    const seg = Array.from({ length: st.n }, (_, k) => `<i class="${k < st.dn ? "on" : ""}${k === st.half - 1 && st.half < st.n ? " half" : ""}"></i>`).join("");
    bar = `<div class="tr20seg" aria-hidden="true">${seg}</div><div class="tr20segl"><span>${esc(t.prog(st.dn, st.n))}</span>${st.half < st.n ? `<span class="tr20lg"><i></i>${esc(t.kShort)}</span>` : ""}</div>`;
  }
  const steps = !(S.cards || []).length ? `<div class="tr20how"><b>${esc(t.howT)}</b><ol>${[t.s1, t.s2, t.s3].map((s, k) => `<li><span class="tr20n">${k + 1}</span><span>${esc(s)}</span></li>`).join("")}</ol></div>` : "";
  return `<div class="tr20st tr20-${st.why}" role="status"><div class="tr20sth"><span class="tr20en"><span class="tr20bdg">${LEAF}</span><b>${esc(L().energy)}</b></span><span class="tr20r">${badge}<span class="spacer"></span>${tr20iBtn()}</span></div><p class="tr20tx">${esc(txt)}</p>${bar}${note ? `<p class="tr20note">${esc(note)}</p>` : ""}${steps}</div>`;
}
const _viewTripsTr20 = viewTrips;
let tr20tripsMemo = ["", ""];
viewTrips = function () {
  const h = _viewTripsTr20();
  const st = tr20Info();
  const key = h + "|" + JSON.stringify(st) + "|" + pickedDest + "|" + S.lang + "|" + (S.cards || []).length + "|" + S.level + "|" + S.petName;
  if (tr20tripsMemo[0] === key) return tr20tripsMemo[1];
  let out = h;
  try { out = tr20tripsDecorate(h, st); } catch (e) { out = h; }
  tr20tripsMemo = [key, out]; return out;
};
function tr20tripsDecorate(h, st) {
  const t = tr20t(); const tpl = document.createElement("template"); tpl.innerHTML = h;
  const root = tpl.content; const stack = root.querySelector(".stack"); if (!stack) return h;
  /* via la vecchia riga "serve l'energia piena" e la vecchia barra di partenza */
  [...stack.querySelectorAll(":scope > p.small.muted")].forEach((p) => { if (p.textContent === L().need) p.remove(); });
  root.querySelectorAll(".departbar:not(.trybar)").forEach((el) => el.remove());
  const card = document.createElement("template"); card.innerHTML = tr20StatusCard();
  if (card.content.firstElementChild) {
    const anchor = stack.querySelector(":scope > .meters2, :scope > .meters");
    if (anchor) anchor.after(card.content.firstElementChild); else stack.prepend(card.content.firstElementChild);
  }
  /* etichetta su ogni meta: gita breve / viaggio completo, con il premio */
  stack.querySelectorAll("button.dest[data-dest]").forEach((el) => {
    if (el.classList.contains("locked") || el.classList.contains("plusl")) return;
    const k = el.dataset.dest; const near = tr20Near(k); const meta = el.querySelector(".meta"); if (!meta) return;
    let cls = "", txt = "";
    if (st.why === "full" && tr20CanGo(k, "full")) { const r = tr20Rw(k, "full"); cls = "full"; txt = t.tag(t.kFull, r.tani, r.xp); }
    else if (st.why === "short") { if (near && tr20CanGo(k, "short")) { const r = tr20Rw(k, "short"); cls = "short"; txt = t.tag(t.kShort, r.tani, r.xp); } else { cls = "off"; txt = t.fullOnly; el.classList.add("tr20dim"); } }
    else if (st.why === "need" && near) { cls = "off"; txt = t.nearOk; }
    if (txt) meta.insertAdjacentHTML("beforeend", `<span class="tr20tag ${cls}">${esc(txt)}</span>`);
    /* durata giusta per la gita breve */
    if (st.why === "short" && near) { const sm = meta.querySelector(".small"); const d = (() => { try { return destByKey(k); } catch (e) { return null; } })(); if (sm && d) { const full = L().hours(d.h); if (sm.innerHTML.startsWith(full)) sm.innerHTML = esc(tr20Dur(d.h * TRIP_PARTIAL_TIME)) + sm.innerHTML.slice(full.length); } }
  });
  /* barra di partenza: solo se la meta scelta si può raggiungere adesso */
  if (!S.away && pickedDest && st.kind && tr20CanGo(pickedDest, st.kind)) {
    const d = destByKey(pickedDest); const r = tr20Rw(pickedDest, st.kind);
    const bar = document.createElement("template");
    bar.innerHTML = `<div class="departbar tr20dbar"><div class="in"><p class="tr20cap"><span class="tr20badge ${st.kind}">${esc(st.kind === "short" ? t.kShort : t.kFull)}</span><span>+${r.tani} Tanì · ${esc(t.pts(r.xp))}</span></p><button class="btn block" id="depart">${esc(L().depart(d.name))} · ${esc(tr20Dur(r.h))}</button></div></div>`;
    root.append(bar.content.firstElementChild);
  }
  return tpl.innerHTML;
}
/* Oggi: con metà degli obiettivi, l'invito alla gita breve */
const _viewTodayTr20 = viewToday;
viewToday = function () {
  const h = _viewTodayTr20();
  try {
    if (story || S.away || !S.pet || h.includes('class="cta"')) return h;
    const st = tr20Info(); if (st.why !== "short") return h; const t = tr20t();
    const key = `<div class="sec"><h2>${L().todayT}</h2>`; const i = h.indexOf(key); if (i < 0) return h;
    const cta = `<div class="cta tr20cta"><p><span class="tr20badge short">${esc(t.kShort)}</span> <strong>${esc(t.cta(S.petName))}</strong></p><button class="btn" data-tab="trips">${esc(t.ctaB)}</button></div>`;
    return h.slice(0, i) + cta + h.slice(i);
  } catch (e) { return h; }
};
/* Al ritorno: "gita breve" e i punti guadagnati */
const _storyCardTr20 = storyCard;
storyCard = function () {
  let h = _storyCardTr20();
  try {
    if (!story || !story.tr20) return h; const t = tr20t(); const L0 = L();
    const tani = story.tani || SEEDS_TRIP; const k = `+${tani} ${L0.seeds}</strong>`;
    if (h.includes(k)) h = h.replace(k, `${k} · <strong>${esc(t.pts(story.tr20xp || XP_TRIP))}</strong>`);
    if (story.tr20 === "short") h = h.replace(`<p class="small">${L0.got}:`, `<p class="small"><span class="tr20badge short">${esc(t.kShort)}</span> ${L0.got}:`);
  } catch (e) { /* niente */ }
  return h;
};
/* pallino sulla scheda Avventure anche per la gita breve */
const _renderTabsTr20 = renderTabs;
renderTabs = function () {
  _renderTabsTr20();
  try {
    const b = document.querySelector('#tabsIn button.tab[data-tab="trips"]'); if (!b) return;
    const want = !!S.pet && !!tr20Info().kind && !story && tab !== "trips"; const d = b.querySelector("i.dot");
    if (want && !d) { const i = document.createElement("i"); i.className = "dot"; i.setAttribute("aria-hidden", "true"); b.appendChild(i); } else if (!want && d) d.remove();
  } catch (e) { /* niente */ }
};

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.dataset.tr20info) { ev.stopImmediatePropagation(); tr20InfoSheet(!!b.dataset.tr20back); return; }
  if (b.id === "tr20InfoOk") { ev.stopImmediatePropagation(); if (b.dataset.back && S.away) awayFull(); else closeLayer(); return; }
  if (b.id === "depart") { ev.stopImmediatePropagation(); tr20Depart(); return; }
  if (b.dataset.dest && !b.dataset.wplus && !b.disabled && b.classList.contains("dest")) { ev.stopImmediatePropagation(); tr20Pick(b.dataset.dest); return; }
}, true);
