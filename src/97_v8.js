/* =================== v8: schermo intero, tante interazioni, mondi che crescono =================== */
let full = false, sceneId = "room", playMode = null, playBusy = false, petDX = 0, petFlip = false, hideSpot = null, hideMisses = 0, popped = 0, bubbleTimers = [], SCENE_POS = { bedY: 0 };
const LV = { high: 2, dance: 3, hide: 4, garden: 3, terrace: 5 };
const PB = { x: 102, y: 108, s: 0.78 };

/* --- Misure della scena: in schermo intero si allunga in alto e in basso --- */
function dims() {
  if (!full) return { top: 0, bot: 0, H: 300 };
  const vw = window.innerWidth || 390, vh = window.innerHeight || 844;
  let H = Math.round((360 * vh) / vw); if (H < 300) H = 300;
  const extra = H - 300, top = Math.round(extra * 0.34);
  return { top, bot: extra - top, H };
}
function pct(x, y, w, h) { const d = dims(); return `left:${((x / 360) * 100).toFixed(2)}%;top:${(((y + d.top) / d.H) * 100).toFixed(2)}%;width:${((w / 360) * 100).toFixed(2)}%;height:${((h / d.H) * 100).toFixed(2)}%`; }
function petPct() { const d = dims(); return { x: ((180 + petDX) / 360) * 100, y: ((190 + d.top) / d.H) * 100 }; }
function sceneXY(clientX, clientY) {
  const room = document.getElementById("room"); if (!room) return null; const r = room.getBoundingClientRect(); const d = dims();
  return { x: ((clientX - r.left) / r.width) * 360, y: ((clientY - r.top) / r.height) * d.H - d.top };
}

/* --- Parti in più della stanza lunga: soffitto, lampadario, pianta appesa, cuccia e cesta dei giochi --- */
function sceneExtra(opts, TOP, BOT, lit) {
  let o = "";
  if (TOP >= 60) {
    o += `<rect x="0" y="${-TOP}" width="360" height="12" fill="#fff" opacity=".35"/><rect x="0" y="${-TOP + 12}" width="360" height="3" fill="#5B3A1A" opacity=".1"/>`;
    const ly = -TOP + Math.min(TOP - 30, 70);
    o += `<line x1="92" y1="${-TOP + 14}" x2="92" y2="${ly}" stroke="#6B5A47" stroke-width="1.5"/>${lit ? `<circle cx="92" cy="${ly + 16}" r="44" fill="#FFE3A3" opacity=".25"/>` : ""}<path d="M74 ${ly + 15} Q92 ${ly - 8} 110 ${ly + 15} Z" fill="#E2B85C"/><path d="M80 ${ly + 6} Q86 ${ly} 92 ${ly - 1}" stroke="#fff" stroke-width="2" opacity=".4" fill="none" stroke-linecap="round"/><rect x="73" y="${ly + 13}" width="38" height="3" rx="1.5" fill="#C9973A"/><circle cx="92" cy="${ly + 18}" r="4.5" fill="${lit ? "#FFF3C9" : "#FFF8E5"}"/>`;
    const py = -TOP + Math.min(TOP - 24, 96);
    o += `<path d="M300 ${-TOP + 14} L288 ${py} M300 ${-TOP + 14} L312 ${py} M300 ${-TOP + 14} L300 ${py}" stroke="#C9A27A" stroke-width="1.2"/><g class="plantg" style="transform-box:fill-box;transform-origin:50% 0%"><path d="M289 ${py + 2} C281 ${py + 18} 284 ${py + 32} 278 ${py + 44} M297 ${py + 2} C297 ${py + 20} 292 ${py + 36} 295 ${py + 50} M307 ${py + 2} C314 ${py + 16} 313 ${py + 30} 320 ${py + 40}" stroke="#5FA35C" stroke-width="2.2" fill="none" stroke-linecap="round"/>${[[282, 16], [280, 30], [279, 42], [295, 22], [293, 38], [296, 50], [312, 14], [315, 28], [319, 38]].map(([x, y], i) => `<ellipse cx="${x}" cy="${py + y}" rx="4.6" ry="2.6" fill="${i % 2 ? "#7FC27B" : "#6DB36A"}" transform="rotate(${i % 2 ? 30 : -30} ${x} ${py + y})"/>`).join("")}</g><path d="M285 ${py} L315 ${py} L311 ${py + 16} Q300 ${py + 21} 289 ${py + 16} Z" fill="#E9D6C0"/><path d="M287 ${py + 6} H313" stroke="#C9A27A" stroke-width="1.2"/>`;
  }
  if (BOT >= 120) {
    const by = Math.round(300 + Math.max(16, (BOT - 130) * 0.42)); SCENE_POS.bedY = by;
    o += `<ellipse cx="86" cy="${by + 8}" rx="58" ry="12" fill="#000" opacity=".12"/><ellipse cx="86" cy="${by}" rx="54" ry="20" fill="#C86E5A"/><ellipse cx="86" cy="${by - 4}" rx="54" ry="18" fill="#D9846F"/><ellipse cx="86" cy="${by - 2}" rx="42" ry="12" fill="#F2D3A3"/><ellipse cx="86" cy="${by - 4}" rx="34" ry="8" fill="#F7E2C0"/><path d="M40 ${by - 8} Q86 ${by - 30} 132 ${by - 8}" stroke="#fff" stroke-width="2" opacity=".25" fill="none"/><g transform="translate(112 ${by - 8}) rotate(-15)"><rect x="-8" y="-2" width="16" height="4" rx="2" fill="#F6F1EA"/><circle cx="-8" cy="-2.5" r="3" fill="#F6F1EA"/><circle cx="-8" cy="2.5" r="3" fill="#F6F1EA"/><circle cx="8" cy="-2.5" r="3" fill="#F6F1EA"/><circle cx="8" cy="2.5" r="3" fill="#F6F1EA"/></g>`;
    o += `<ellipse cx="278" cy="${by + 6}" rx="46" ry="8" fill="#000" opacity=".12"/><circle cx="262" cy="${by - 36}" r="12" fill="#E2654F"/><path d="M251 ${by - 38} Q262 ${by - 30} 273 ${by - 38}" stroke="#fff" stroke-width="2.4" fill="none"/><g transform="translate(286 ${by - 38})"><ellipse cx="0" cy="4" rx="10" ry="7" fill="#FFD25E"/><circle cx="6" cy="-4" r="6" fill="#FFD25E"/><path d="M11 -4 l5 1.5 l-5 1.5 Z" fill="#F28A3C"/><circle cx="7.5" cy="-5.5" r="1.1" fill="#33302E"/></g><path d="M300 ${by - 40} l2.6 5.4 6 .8 -4.4 4.1 1.1 5.9 -5.3 -2.9 -5.3 2.9 1.1 -5.9 -4.4 -4.1 6 -.8 Z" fill="#9B79D4"/><rect x="238" y="${by - 30}" width="80" height="34" rx="6" fill="#7AA3DC"/><rect x="238" y="${by - 30}" width="80" height="8" rx="4" fill="#5A84C4"/><rect x="250" y="${by - 16}" width="56" height="10" rx="5" fill="#fff" opacity=".35"/><path d="M244 ${by - 20} v18" stroke="#fff" stroke-width="2" opacity=".3" stroke-linecap="round"/>`;
  }
  return o;
}

/* --- Il giardino: un fiore per ogni obiettivo completato --- */
function hashN(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967295; }
function flowerCount() { return Math.min((S.log || []).length, 140); }
function petGroup(e, glow) { return `<g id="petWrap" transform="translate(${PB.x} ${PB.y}) scale(${PB.s})"><g id="petInner">${petInner(S.pet, e, S.hat, stage(), glow)}</g></g>`; }
function gardenScene(o) {
  const d = dims(), TOP = d.top, BOT = d.bot, H = d.H, ph = o.ph, night = ph === "night", eve = ph === "evening";
  const [s1, s2] = SKY[ph]; const sk = nid("gs"), gr = nid("gg"), vg = nid("gv"); const se = o.season; const hill = SEASON_HILL[se] || SEASON_HILL.spring; const snow = se === "winter";
  let s = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(L().full.scenes.garden)}"><defs><linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient><linearGradient id="${gr}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${snow ? "#EEF3F8" : "#A9D48F"}"/><stop offset="1" stop-color="${snow ? "#D6E0EC" : "#78AB68"}"/></linearGradient><radialGradient id="${vg}" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#1A2A10" stop-opacity="0"/><stop offset="1" stop-color="#1A2A10" stop-opacity="${night ? 0.42 : 0.18}"/></radialGradient></defs>`;
  s += `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${sk})"/>`;
  if (night) { for (let i = 0; i < 26; i++) s += `<circle class="star" cx="${(i * 73) % 360}" cy="${-TOP + 10 + ((i * 47) % Math.max(60, TOP + 120))}" r="${i % 3 ? 1 : 1.6}" fill="#FFF6D6"/>`; s += `<circle cx="296" cy="${30 - TOP * 0.4}" r="16" fill="#F8F1D4"/><circle cx="303" cy="${24 - TOP * 0.4}" r="14" fill="${s1}"/>`; }
  else s += `<circle cx="292" cy="${44 - TOP * 0.4}" r="34" fill="${eve ? "#FFB36B" : "#FFE48A"}" opacity=".25"/><circle cx="292" cy="${44 - TOP * 0.4}" r="20" fill="${eve ? "#FFB36B" : "#FFE48A"}"/>`;
  s += `<g class="cloud">${cloudPuff(90, 40 - TOP * 0.5, 1.1, night ? 0.25 : 0.9)}</g><g class="cloud2">${cloudPuff(220, 80 - TOP * 0.3, 0.9, night ? 0.2 : 0.85)}</g>${TOP > 80 ? `<g class="cloud">${cloudPuff(160, -TOP + 40, 0.8, night ? 0.2 : 0.8)}</g>` : ""}`;
  s += `<path d="M0 168 C60 138 120 160 180 148 C240 136 300 160 360 142 L360 212 L0 212 Z" fill="${hill[1]}"/><path d="M0 184 C80 164 160 186 240 170 C300 162 340 176 360 174 L360 212 L0 212 Z" fill="${hill[0]}"/>`;
  const canopy = { spring: ["#7FC27B", "#6DB36A"], summer: ["#5FA35C", "#4E9A4A"], autumn: ["#E0883A", "#D9542F"], winter: ["#E9EEF3", "#D6E0EC"] }[se] || ["#7FC27B", "#6DB36A"];
  s += `<rect x="30" y="104" width="15" height="106" rx="4" fill="#8E6440"/><path d="M37 140 L18 118 M38 128 L58 108" stroke="#8E6440" stroke-width="5" stroke-linecap="round"/><circle cx="16" cy="112" r="24" fill="${canopy[1]}"/><circle cx="60" cy="108" r="26" fill="${canopy[1]}"/><circle cx="38" cy="88" r="34" fill="${canopy[0]}"/><circle cx="26" cy="80" r="10" fill="#fff" opacity=".12"/>`;
  if (se === "spring") [[24, 82], [46, 74], [56, 100], [12, 108], [36, 104]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3" fill="#FFC2D4"/>`; });
  if (se === "autumn") [[24, 82], [50, 76], [62, 104]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3.2" fill="#F2B33D"/>`; });
  s += `<g transform="translate(62 140)"><rect x="-1.5" y="0" width="3" height="20" fill="#8E6440"/><path d="M-11 0 L0 -10 L11 0 Z" fill="#C86E5A"/><rect x="-8" y="0" width="16" height="12" rx="2" fill="#F2D3A3"/><circle cx="0" cy="6" r="2.6" fill="#5B3A1A"/></g>`;
  for (let x = 78; x < 360; x += 28) s += `<rect x="${x}" y="176" width="8" height="34" rx="2" fill="#F2E3C8"/><path d="M${x} 176 l4 -5 l4 5 Z" fill="#F2E3C8"/>`;
  s += `<rect x="72" y="184" width="288" height="5" fill="#E6D3B4"/><rect x="72" y="198" width="288" height="5" fill="#E6D3B4"/>`;
  s += `<rect x="0" y="206" width="360" height="${94 + BOT}" fill="url(#${gr})"/>`;
  for (let k = 0; k < 40; k++) { const x = (k * 53) % 360, y = 214 + ((k * 37) % Math.max(40, 80 + BOT)); s += `<path d="M${x} ${y} q2 -6 4 0 q2 -7 4 0" stroke="${snow ? "#C9D6E4" : "#5E9A55"}" stroke-width="1.4" fill="none" opacity=".7"/>`; }
  const n = flowerCount(); const maxY = Math.max(250, 300 + BOT - 130); const pos = [];
  for (let i = 0; i < n; i++) { const x = 14 + Math.round(hashN("fx" + i) * 332), y = 222 + Math.round(hashN("fy" + i) * (maxY - 222)); pos.push({ i, x, y }); }
  pos.sort((a, b) => a.y - b.y).forEach((p) => { s += flowerSVG(p.i, p.x, p.y, "gflower"); });
  s += `<g transform="translate(300 ${Math.min(266, maxY)})"><ellipse cx="0" cy="16" rx="20" ry="4" fill="#000" opacity=".12"/><path d="M-14 -6 L12 -6 L10 14 L-12 14 Z" fill="#7AA3DC"/><path d="M12 -2 L26 -12" stroke="#7AA3DC" stroke-width="4" stroke-linecap="round"/><ellipse cx="27" cy="-13" rx="4" ry="2.4" fill="#5A84C4" transform="rotate(-30 27 -13)"/><path d="M-14 -2 C-24 -2 -24 10 -14 10" stroke="#5A84C4" stroke-width="3" fill="none"/><rect x="-14" y="-9" width="26" height="4" rx="2" fill="#5A84C4"/></g>`;
  SCENE_POS.canY = Math.min(266, maxY);
  if (BOT >= 120) { const py = Math.round(300 + Math.max(30, (BOT - 130) * 0.5)); s += `<ellipse cx="74" cy="${py}" rx="50" ry="16" fill="#5E9A55" opacity=".5"/><ellipse cx="74" cy="${py - 2}" rx="46" ry="13" fill="${snow ? "#CFE3F2" : "#7CC6E6"}"/><ellipse cx="66" cy="${py - 5}" rx="26" ry="5" fill="#fff" opacity=".35"/>${snow ? "" : `<ellipse cx="88" cy="${py}" rx="9" ry="3.6" fill="#6DB36A"/><ellipse cx="58" cy="${py + 3}" rx="7" ry="3" fill="#6DB36A"/><circle cx="90" cy="${py - 2}" r="2.6" fill="#F7A9C0"/>`}${[[150, py + 8], [190, py - 6], [232, py + 6], [276, py - 4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="5" fill="#D9CFBE"/><ellipse cx="${x - 2}" cy="${y - 1.5}" rx="8" ry="2.2" fill="#fff" opacity=".35"/>`).join("")}`; }
  s += `<g class="flyb2" transform="translate(220 150)"><ellipse cx="-3.5" cy="0" rx="4" ry="3" fill="#F28AA6"/><ellipse cx="3.5" cy="0" rx="4" ry="3" fill="#F7A9C0"/><rect x="-.7" y="-3.5" width="1.4" height="7" rx=".7" fill="#5A3A2A"/></g><g class="flyb2" transform="translate(120 120)"><ellipse cx="-3.5" cy="0" rx="4" ry="3" fill="#9CC8F7"/><ellipse cx="3.5" cy="0" rx="4" ry="3" fill="#B9D7F7"/><rect x="-.7" y="-3.5" width="1.4" height="7" rx=".7" fill="#5A3A2A"/></g>`;
  s += petGroup(o.e, o.glow);
  if (night) { s += `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="#16204A" opacity=".3" pointer-events="none"/>`; for (let i = 0; i < 8; i++) s += `<circle class="mote" cx="${30 + i * 44}" cy="${200 + (i % 3) * 24}" r="2" fill="#FFE7A0"/>`; }
  if (eve) s += `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="#E9894F" opacity=".1" pointer-events="none"/>`;
  return s + `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${vg})" pointer-events="none"/></svg>`;
}

/* --- La terrazza: una stella per ogni giorno dedicato a sé --- */
function activeDays() { return Object.keys(S.days || {}).filter((k) => { const r = S.days[k]; return r && (r.done > 0 || r.rest); }).sort(); }
function starPath(cx, cy, r) { const p = []; for (let i = 0; i < 10; i++) { const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; p.push(`${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`); } return `M${p.join(" L")} Z`; }
function terraceScene(o) {
  const d = dims(), TOP = d.top, BOT = d.bot, H = d.H; const sk = nid("ts"), vg = nid("tv"), gl = nid("tg");
  let s = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(L().full.scenes.terrace)}"><defs><linearGradient id="${sk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121936"/><stop offset=".62" stop-color="#2E3470"/><stop offset="1" stop-color="#7A5C8C"/></linearGradient><radialGradient id="${gl}"><stop offset="0" stop-color="#FFE7A0" stop-opacity=".9"/><stop offset="1" stop-color="#FFE7A0" stop-opacity="0"/></radialGradient><radialGradient id="${vg}" cx="50%" cy="46%" r="75%"><stop offset=".6" stop-color="#0A0E24" stop-opacity="0"/><stop offset="1" stop-color="#0A0E24" stop-opacity=".45"/></radialGradient></defs><rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${sk})"/>`;
  for (let i = 0; i < 60; i++) s += `<circle cx="${Math.round(hashN("bx" + i) * 360)}" cy="${Math.round(-TOP + 6 + hashN("by" + i) * (TOP + 140))}" r="${i % 4 ? 0.7 : 1.1}" fill="#fff" opacity="${0.25 + (i % 5) * 0.08}"/>`;
  s += `<circle cx="70" cy="${40 - TOP * 0.5}" r="18" fill="#F8F1D4"/><circle cx="78" cy="${34 - TOP * 0.5}" r="16" fill="#1A2248"/><circle cx="70" cy="${40 - TOP * 0.5}" r="34" fill="#F8F1D4" opacity=".06"/>`;
  const days = activeDays(); const today = dkey();
  days.forEach((k) => {
    const r = S.days[k]; const x = 16 + Math.round(hashN("sx" + k) * 328), y = Math.round(-TOP + Math.min(84, TOP * 0.5 + 20) + hashN("sy" + k) * (140 + TOP - Math.min(84, TOP * 0.5 + 20))); const rad = 3.2 + Math.min(r.done || 0, 6) * 0.45; const isT = k === today;
    s += `<g class="dstar ${isT ? "tstar" : ""}" data-day="${k}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="13" fill="transparent"/><circle class="star" cx="${x}" cy="${y}" r="${rad * (isT ? 3.4 : 2.4)}" fill="url(#${gl})" opacity=".5"/><path d="${starPath(x, y, rad * (isT ? 1.5 : 1))}" fill="${r.rest && !r.done ? "#C9D6F2" : "#FFE7A0"}"/></g>`;
  });
  for (let i = 0, x = 0; x < 360; i++) { const w = 26 + Math.round(hashN("bw" + i) * 26), h = 26 + Math.round(hashN("bh" + i) * 44); s += `<rect x="${x}" y="${206 - h}" width="${w - 2}" height="${h + 4}" fill="${i % 2 ? "#23284F" : "#1D2245"}"/>`; for (let wy = 206 - h + 6; wy < 200; wy += 9) for (let wx = x + 5; wx < x + w - 8; wx += 8) if (hashN(`w${i}-${wx}-${wy}`) > 0.62) s += `<rect x="${wx}" y="${wy}" width="3.5" height="4" fill="#FFD98A" opacity=".8"/>`; x += w; }
  s += `<path d="M0 168 Q90 186 180 170 Q270 186 360 168" stroke="#4A3F5E" stroke-width="1.2" fill="none"/>${[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350].map((x, i) => `<circle class="bulb" cx="${x}" cy="${168 + Math.sin((x / 180) * Math.PI) * 12}" r="3.4" fill="${["#FFD25E", "#FFB36B", "#F9A3C0", "#9EE3C5"][i % 4]}"/>`).join("")}`;
  s += `<rect x="0" y="206" width="360" height="${94 + BOT}" fill="#B9795A"/>`;
  for (let y = 222; y < 300 + BOT; y += 18) s += `<line x1="0" y1="${y}" x2="360" y2="${y}" stroke="#9E6247" stroke-width="1.5" opacity=".7"/>`;
  for (let r = 0, y = 206; y < 300 + BOT; y += 18, r++) for (let x = (r % 2) * 18; x < 360; x += 36) s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 18}" stroke="#9E6247" stroke-width="1.5" opacity=".7"/>`;
  s += `<rect x="0" y="198" width="360" height="6" fill="#E9DCC8"/>${[...Array(23)].map((_, i) => `<rect x="${4 + i * 16}" y="204" width="5" height="26" fill="#E2D2BA"/>`).join("")}<rect x="0" y="228" width="360" height="5" fill="#D9C7AC"/><rect x="0" y="233" width="360" height="5" fill="#000" opacity=".1"/>`;
  s += `<g><ellipse cx="40" cy="270" rx="22" ry="5" fill="#000" opacity=".2"/><path d="M24 236 L56 236 L52 268 Q40 272 28 268 Z" fill="#C86E5A"/><rect x="22" y="232" width="36" height="7" rx="3" fill="#B35B48"/><path d="M40 234 C38 210 30 196 22 188 M40 234 C42 208 50 192 60 186 M40 234 C40 214 40 200 41 182" stroke="#5FA35C" stroke-width="2.4" fill="none"/>${[[24, 190], [58, 188], [41, 184], [30, 204], [50, 202]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3.4" fill="#6DB36A"/>`).join("")}</g>`;
  s += `<g transform="translate(306 238)"><path d="M0 0 L-16 34 M0 0 L16 34 M0 0 L0 36" stroke="#6B5A47" stroke-width="3" stroke-linecap="round"/><g transform="rotate(-32)"><rect x="-26" y="-9" width="46" height="13" rx="4" fill="#E9DCC8"/><rect x="18" y="-11" width="10" height="17" rx="3" fill="#7AA3DC"/><rect x="-32" y="-6" width="8" height="8" rx="2" fill="#6B5A47"/></g></g>`;
  if (BOT >= 120) {
    const by = Math.round(300 + Math.max(16, (BOT - 130) * 0.42));
    s += `<ellipse cx="180" cy="${by}" rx="120" ry="30" fill="#000" opacity=".12"/><ellipse cx="180" cy="${by - 4}" rx="118" ry="28" fill="#2F6E78"/>${[96, 74, 52, 30].map((r, i) => `<ellipse cx="180" cy="${by - 4}" rx="${r}" ry="${r * 0.237}" fill="none" stroke="${["#F3EBDD", "#F2B33D", "#F3EBDD", "#E2654F"][i]}" stroke-width="3" opacity=".85"/>`).join("")}`;
    s += `<ellipse cx="112" cy="${by - 10}" rx="26" ry="11" fill="#E2654F"/><ellipse cx="112" cy="${by - 13}" rx="22" ry="7" fill="#F07A63"/><ellipse cx="250" cy="${by - 10}" rx="26" ry="11" fill="#9B79D4"/><ellipse cx="250" cy="${by - 13}" rx="22" ry="7" fill="#B29AE0"/>`;
    s += `<ellipse cx="181" cy="${by - 8}" rx="22" ry="5" fill="#000" opacity=".15"/><rect x="178" y="${by - 30}" width="5" height="22" fill="#8E6440"/><ellipse cx="180" cy="${by - 31}" rx="24" ry="6" fill="#B5875A"/><path d="M168 ${by - 44} Q180 ${by - 52} 192 ${by - 44} L190 ${by - 34} L170 ${by - 34} Z" fill="#F6F1EA"/><path d="M192 ${by - 42} q6 0 6 4 q0 4 -6 4" stroke="#F6F1EA" stroke-width="2" fill="none"/><rect x="198" y="${by - 40}" width="7" height="7" rx="1.5" fill="#F6F1EA"/><path d="M175 ${by - 56} q-2 -4 0 -7 M181 ${by - 58} q2 -4 0 -7" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6" stroke-linecap="round"/>`;
    s += `<g transform="translate(316 ${by - 34})"><circle cx="0" cy="-6" r="20" fill="#FFD27A" opacity=".2"/><rect x="-9" y="-16" width="18" height="24" rx="3" fill="#6B5A47"/><rect x="-6" y="-13" width="12" height="18" rx="2" fill="#FFE3A3"/><path d="M-6 -16 Q0 -26 6 -16" stroke="#6B5A47" stroke-width="2" fill="none"/></g>`;
  }
  s += petGroup(o.e, o.glow);
  return s + `<rect x="0" y="${-TOP}" width="360" height="${H}" fill="url(#${vg})" pointer-events="none"/></svg>`;
}

/* --- Oggetti toccabili --- */
function sceneSpots(furn) {
  const has = (k) => furn.includes(k); const L0 = [];
  if (sceneId === "garden" && full) { L0.push(["can", 280, (SCENE_POS.canY || 266) - 24, 52, 44]); return L0; }
  if (sceneId === "terrace" && full) { L0.push(["telescope", 278, 204, 58, 72]); return L0; }
  if (PLUS_SCENES.includes(sceneId) && full) { if (SCENE_POS.spot) L0.push(SCENE_POS.spot); return L0; }
  L0.push(["window", 34, 42, 104, 86]);
  if (has("fishbowl")) L0.push(["fish", 248, 160, 40, 42]);
  if (has("clock")) L0.push(["clock", 272, 40, 40, 40]);
  if (has("lamp")) L0.push(["lamp", 22, 132, 46, 128]); else if (has("lamp_moon") || has("lamp_lava")) L0.push(["lamp", 20, 172, 52, 90]);
  if (["plant", "cactus", "sunflower", "monstera"].some(has)) L0.push(["plant", 294, 146, 52, 106]);
  if (has("guitar")) L0.push(["guitar", 228, 186, 44, 82]); else if (has("teddy")) L0.push(["teddy", 236, 220, 38, 48]);
  if (has("books")) L0.push(["books", 70, 204, 56, 66]); else if (has("yarn")) L0.push(["yarn", 70, 206, 60, 64]); else if (has("pouf")) L0.push(["pouf", 70, 236, 56, 36]);
  if (has("mirror")) L0.push(["mirror", 178, 38, 58, 76]); else if (has("poster")) L0.push(["poster", 174, 54, 68, 56]); else if (has("frame")) L0.push(["frame", 174, 56, 66, 52]);
  if (has("lights") || has("bunting")) L0.push(["lights", 166, 6, 190, 34]); else if (has("lanterns")) L0.push(["lights", 180, 14, 166, 46]);
  if (full && SCENE_POS.bedY && dims().bot >= 120) { L0.push(["bed", 30, SCENE_POS.bedY - 26, 112, 42]); L0.push(["toys", 236, SCENE_POS.bedY - 52, 86, 58]); }
  return L0;
}
function spotLabel(k) { const t = L(); const m = { fish: "fishbowl", clock: "clock", lamp: "lamp", plant: "plant", guitar: "guitar", teddy: "teddy", books: "books", yarn: "yarn", pouf: "pouf", mirror: "mirror", poster: "poster", frame: "frame", lights: "lights" }; if (m[k]) return t.items[m[k]]; const v = t.obj[k]; return Array.isArray(v) ? v[0] : v; }
function spotsHTML(furn) { return sceneSpots(furn).map(([k, x, y, w, h]) => `<button class="spot" data-spot="${k}" style="${pct(x, y, w, h)}" aria-label="${esc(spotLabel(k))}"></button>`).join(""); }

/* --- Il blocco della stanza: normale o a schermo intero --- */
const _roomBlock = roomBlock;
roomBlock = function () {
  if (!full || S.away) {
    if (S.away) full = false;
    const h = _roomBlock();
    const extra = S.away ? "" : spotsHTML(S.furn) + `<button class="fullbtn" id="fullOpen" aria-label="${esc(L().full.open)}">${icon("expand")}</button>`;
    return h.replace('<div class="fx" id="fx"></div></div>', `${extra}<div class="playlayer" id="playlayer"></div><div class="fx" id="fx"></div></div>`);
  }
  const t = L(); const d = dims(); const ph = phase();
  const glow = S.pet === "lumi" ? 0.3 + 0.65 * (S.energy / 100) : null;
  if ((sceneId === "garden" && S.level < LV.garden) || (sceneId === "terrace" && S.level < LV.terrace) || (PLUS_SCENES.includes(sceneId) && !plusActive())) sceneId = "room";
  const e = petExpr();
  const svg = PLUS_SCENES.includes(sceneId) ? plusSceneSVG(sceneId, { ph, e, glow }) : sceneId === "garden" ? gardenScene({ ph, e, glow, season: season().id }) : sceneId === "terrace" ? terraceScene({ e, glow }) : roomSVG({ ph, pet: S.pet, e, hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: false, glow, label: S.petName, season: season().id, dark: S.lightsOff, friend: friendToday(), top: d.top, bot: d.bot });
  const inRoom = sceneId === "room";
  const showGift = inRoom && S.giftDay !== S.day, showLetter = inRoom && S.letterDay !== S.day;
  const sayNow = sayText || (PLUS_SCENES.includes(sceneId) ? t.sceneSay[sceneId][0] : sceneId === "garden" ? t.full.gardenCap(flowerCount()) : sceneId === "terrace" ? t.full.terraceCap(activeDays().length) : defaultSay());
  const scenes = [["room", 0], ["garden", LV.garden], ["terrace", LV.terrace]].map(([k, lv]) => { const lock = S.level < lv; return `<button class="scn ${lock ? "locked" : ""}" data-scene="${k}" aria-pressed="${sceneId === k}" ${lock ? `data-lock="${lv}"` : ""}>${lock ? icon("lock") : ""}<span>${t.full.scenes[k]}</span>${lock ? `<small>${t.full.lockT(lv)}</small>` : ""}</button>`; }).join("") + PLUS_SCENES.map((k) => `<button class="scn plus ${plusActive() ? "" : "locked"}" data-scene="${k}" aria-pressed="${sceneId === k}" ${plusActive() ? "" : "data-plus=\"1\""}>${icon("p_crown")}<span>${t.scenes2[k]}</span></button>`).join("");
  const base = [["feed", "feed", t.acts.feed], ["play", "play", t.acts.play], ["talk", "talk", t.acts.talk], [S.lightsOff ? "wake" : "nap", S.lightsOff ? "wake" : "nap", t.acts[S.lightsOff ? "wake" : "nap"]], ["photo", "photo", t.acts.photo]];
  const extra = [["chat", 0], ["hug", 0], ["ball", 0], ["bubbles", 0], ["high", LV.high], ["dance", LV.dance], ["hide", LV.hide]];
  const acts = extra.map(([k, lv]) => { const lock = S.level < lv; return `<button class="act fact ${lock ? "locked" : ""} ${playMode === k ? "on" : ""}" data-act2="${k}" ${lock ? `data-lock="${lv}"` : ""}><span class="aci">${icon("p_" + k)}${lock ? `<em>${icon("lock")}${lv}</em>` : ""}</span><span>${t.acts2[k]}</span></button>`; }).join("") + base.map(([k, ic, l]) => `<button class="act fact" data-act="${k}"><span class="aci">${icon(ic)}</span><span>${l}</span></button>`).join("");
  return `<div class="roomwrap full" id="fullwrap"><div class="room ${S.lightsOff && inRoom ? "dark" : ""} scene-${sceneId}" id="room" style="aspect-ratio:360/${d.H};max-width:calc(100vh * ${(360 / d.H).toFixed(4)})">${svg}
    ${inRoom && friendToday() ? `<button class="friendhit" id="friendHit" style="${pct(58, 66, 68, 66)}" aria-label="${esc(t.pets[friendToday()][0])}"></button>` : ""}
    ${showLetter ? `<button class="letter" id="letter" style="${pct(18, 236, 58, 44)};bottom:auto" aria-label="${esc(t.letterL)}">${letterSVG()}</button>` : ""}
    <button class="pethit" id="petHit" style="${pct(125 + petDX, 139, 110, 114)}" aria-label="${esc(S.petName)}"></button>
    ${showGift ? `<button class="gift" id="gift" style="${pct(274, 214, 58, 58)};right:auto;bottom:auto" aria-label="${esc(t.giftL)}">${giftSVG()}</button>` : ""}
    ${spotsHTML(S.furn)}<div class="playlayer" id="playlayer"></div><div class="fx" id="fx"></div></div>
    <div class="fulltop"><div class="scns">${scenes}</div><button class="fullbtn close" id="fullClose" aria-label="${esc(t.full.close)}">${icon("shrink")}</button></div>
    <p class="bubble" id="bubble" aria-live="polite" style="top:calc(${(((d.top + 104) / d.H) * 100).toFixed(1)}% - 12px)"><b>${esc(S.petName)}</b><span id="bubbleTxt">${esc(sayNow)}</span></p>
    <div class="fullbar"><div class="facts">${acts}</div></div></div>`;
};
Object.assign(ICON, {
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', shrink: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
  p_hug: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/><path d="M3 13c2 1 4 1 5 0M21 13c-2 1-4 1-5 0"/>',
  p_ball: '<circle cx="12" cy="12" r="8"/><path d="M4.5 9.5c5 2 10 2 15 0M6 17c4-3 8-3 12 0"/>',
  p_bubbles: '<circle cx="9" cy="14" r="5"/><circle cx="17" cy="7" r="3"/><circle cx="18" cy="16" r="2"/><path d="M7 12.5a2 2 0 0 1 2-1.5"/>',
  p_high: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v7M14 10.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-1.9L8 14"/>',
  p_dance: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M3 5l2 2M5 3l-1 3"/>',
  p_hide: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/><path d="M4 4l16 16"/>'
});

/* --- Aprire e chiudere lo schermo intero --- */
function openFull() {
  if (S.away) return;
  full = true; petDX = 0; petFlip = false; playMode = null; document.body.classList.add("isfull");
  try { const el = document.documentElement; if (el.requestFullscreen && !document.fullscreenElement && window.top === window.self) el.requestFullscreen().catch(() => {}); } catch (e) { /* niente */ }
  SND.play("sparkle"); render(); window.scrollTo(0, 0); trackOnce("schermo-intero");
  if (anim) G.from("#fullwrap", { opacity: 0, scale: 0.94, duration: 0.45, ease: "power3.out" });
}
function closeFull(fromSystem) {
  if (!full) return;
  stopPlay(); full = false; petDX = 0; petFlip = false; document.body.classList.remove("isfull");
  try { if (!fromSystem && document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* niente */ }
  SND.play("click"); render();
}
document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && full) closeFull(true); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && full && !layer.innerHTML) closeFull(); });
let rsT = null; window.addEventListener("resize", () => { if (!full) return; clearTimeout(rsT); rsT = setTimeout(() => { if (full && !playMode) render(); }, 200); });

/* --- Movimenti del compagno nella scena --- */
function petWrapEl() { return document.getElementById("petWrap"); }
function placePet(dx, flip) {
  const w = petWrapEl(); if (!w) return;
  w.setAttribute("transform", `translate(${PB.x + dx + (flip ? 200 * PB.s : 0)} ${PB.y}) scale(${flip ? -PB.s : PB.s} ${PB.s})`);
}
function movePet(toDX, dur, done) {
  const w = petWrapEl(); const hit = document.getElementById("petHit"); if (!w) { if (done) done(); return; }
  toDX = Math.max(-100, Math.min(110, toDX));
  const from = petDX; petFlip = toDX < from; const o = { v: from };
  if (!anim) { petDX = toDX; placePet(petDX, false); if (hit) hit.style.left = `${((125 + petDX) / 360) * 100}%`; if (done) done(); return; }
  const p = document.getElementById("petInner");
  const hops = p ? G.to(p, { y: -9, duration: 0.14, yoyo: true, repeat: Math.max(1, Math.round(dur / 0.14) | 1), ease: "sine.out", transformOrigin: "50% 100%" }) : null;
  G.to(o, { v: toDX, duration: dur, ease: "power1.inOut", onUpdate: () => { petDX = o.v; placePet(petDX, petFlip); }, onComplete: () => { petDX = toDX; if (hops) { hops.kill(); G.to(p, { y: 0, duration: 0.15 }); } placePet(petDX, petFlip); if (hit) hit.style.left = `${((125 + petDX) / 360) * 100}%`; if (done) done(); } });
}
function walkAround() {
  if (!full || playMode || layer.innerHTML) return;
  const to = Math.round(-90 + Math.random() * 190); movePet(to, 0.6 + Math.abs(to - petDX) / 140, () => {
    const r = Math.random();
    if (r < 0.35) { setExpr("felice", 1400); } else if (r < 0.5 && sceneId === "room") { const e = document.querySelectorAll("#room .eyes"); if (anim) G.timeline().to(e, { x: -4, y: -3, duration: 0.3 }).to(e, { x: 0, y: 0, duration: 0.3, delay: 1.2 }); }
  });
}
const _idleAction = idleAction;
idleAction = function () {
  if (full && !playMode && !S.lightsOff && Math.random() < 0.5) { walkAround(); return; }
  if (!playMode) {
    if (Math.random() < 0.18 && !sayText && document.getElementById("bubbleTxt")) { const pl = personalLines(); if (pl.length) { say(pick(pl), 6000); return; } }
    _idleAction();
  }
};
const _burst = burst;
burst = function (kind, n, host) {
  const fx = host || document.getElementById("fx"); const before = fx ? fx.children.length : 0;
  _burst(kind, n, host);
  if (fx && !host && kind !== "confetti" && (full || petDX)) { const p = petPct(); [...fx.children].slice(before).forEach((s) => { s.style.left = p.x + "%"; s.style.top = p.y + "%"; }); }
};

/* --- Effetti piccoli --- */
function fxAt(el, html, cls, life = 1.1, dy = -40) {
  const fx = document.getElementById("fx"), room = document.getElementById("room"); if (!fx || !room) return;
  const r = room.getBoundingClientRect(), b = el.getBoundingClientRect();
  const s = document.createElement("span"); s.className = cls || ""; s.innerHTML = html; s.setAttribute("aria-hidden", "true");
  s.style.left = `${((b.left + b.width / 2 - r.left) / r.width) * 100}%`; s.style.top = `${((b.top + b.height * 0.35 - r.top) / r.height) * 100}%`; fx.appendChild(s);
  if (anim) G.fromTo(s, { y: 0, opacity: 1, scale: 0.6 }, { y: dy, x: (Math.random() - 0.5) * 40, opacity: 0, scale: 1.1, duration: life, ease: "power2.out", onComplete: () => s.remove() }); else setTimeout(() => s.remove(), 500);
}
function notesAt(el, n = 4) { for (let i = 0; i < n; i++) setTimeout(() => fxAt(el, ["♪", "♫", "♩"][i % 3], "note", 1.3, -60), i * 140); }
function dropsAt(el) { for (let i = 0; i < 6; i++) setTimeout(() => fxAt(el, "", "drop", 0.8, 30), i * 90); }
function glowAt(el, col) {
  const fx = document.getElementById("fx"), room = document.getElementById("room"); if (!fx || !room) return;
  const r = room.getBoundingClientRect(), b = el.getBoundingClientRect(); const g = document.createElement("i"); g.className = "glowfx"; g.style.background = `radial-gradient(circle, ${col}, transparent 70%)`;
  g.style.left = `${((b.left + b.width / 2 - r.left) / r.width) * 100}%`; g.style.top = `${((b.top + b.height / 2 - r.top) / r.height) * 100}%`; fx.appendChild(g);
  if (anim) G.fromTo(g, { scale: 0.3, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 1, ease: "power2.out", onComplete: () => g.remove() }); else setTimeout(() => g.remove(), 400);
}
function lookAtEl(el) { const b = el.getBoundingClientRect(); lookAt(b.left + b.width / 2, b.top + b.height / 2); }
function strum() { [392, 494, 587, 784, 988].forEach((f, i) => setTimeout(() => SND.note(f), i * 70)); }
function danceShort(times = 2) { const p = document.getElementById("petInner"); if (!p || !anim) return; const tl = G.timeline(); for (let i = 0; i < times; i++) tl.to(p, { rotation: -10, y: -10, transformOrigin: "50% 100%", duration: 0.18 }).to(p, { rotation: 10, y: 0, duration: 0.18 }); tl.to(p, { rotation: 0, duration: 0.2 }); }
function shootingStar() {
  const svg = document.querySelector("#room svg"); if (!svg || !anim) return; const d = dims();
  const ns = "http://www.w3.org/2000/svg"; const g = document.createElementNS(ns, "g"); g.innerHTML = '<path d="M0 0 L-26 9" stroke="#FFF6D6" stroke-width="2" stroke-linecap="round"/><circle r="2.2" fill="#fff"/>';
  svg.insertBefore(g, petWrapEl()); G.fromTo(g, { x: 330, y: -d.top + 30, opacity: 1 }, { x: 150, y: -d.top + 110, opacity: 0, duration: 1.2, ease: "power1.in", onComplete: () => g.remove() });
}

function spotAction(k, b) {
  const t = L(), o = t.obj; if (playMode === "hide") return;
  lookAtEl(b);
  if (k === "window") { windowSurprise(); say(pick(o.window), 2800); SND.play("chime"); }
  else if (k === "fish") { const f = document.querySelector("#room .fishg"); if (f && anim) G.fromTo(f, { scale: 1 }, { scale: 1.5, rotation: -20, transformOrigin: "50% 50%", duration: 0.22, yoyo: true, repeat: 1 }); fxAt(b, "○", "bubfx", 1, -30); SND.play("pop"); say(pick(o.fish), 2400); }
  else if (k === "clock") { say(o.clock(intlDT(loc(), { hour: "2-digit", minute: "2-digit" }).format(new Date())), 3000); SND.play("chime"); }
  else if (k === "lamp") { glowAt(b, "#FFE3A3"); SND.play(S.lightsOff ? "lighton" : "click"); say(pick(o.lamp), 2400); }
  else if (k === "plant") { dropsAt(b); const pl = document.querySelectorAll("#room .plantg"); if (anim) G.fromTo(pl, { rotation: -6 }, { rotation: 0, duration: 0.8, ease: "elastic.out(1, .3)" }); SND.play("sparkle"); say(pick(o.plant), 2800); }
  else if (k === "guitar") { strum(); danceShort(); notesAt(b); say(pick(o.guitar), 2400); }
  else if (k === "books") { setExpr("wow", 1600); SND.play("paper"); say(pick(o.books), 3000); }
  else if (k === "yarn") { jump(true); SND.play("giggle"); say(pick(o.yarn), 2400); }
  else if (k === "teddy") { burst("heart", 8); setExpr("amore", 1800); SND.play("purr"); say(pick(o.teddy), 2400); }
  else if (k === "pouf") { jump(true); SND.play("pop"); say(pick(o.pouf), 2400); }
  else if (k === "mirror" || k === "poster" || k === "frame") { setExpr(k === "mirror" ? "felice" : "wow", 1600); glowAt(b, "rgba(255,255,255,.9)"); SND.play("chime"); say(pick(o[k]), 2800); }
  else if (k === "lights") { const bl = document.querySelectorAll("#room .bulb"); if (anim && bl.length) G.fromTo(bl, { opacity: 0.2 }, { opacity: 1, duration: 0.15, stagger: 0.04, yoyo: true, repeat: 3 }); burst("star", 6); SND.play("sparkle"); say(pick(o.lights), 2400); }
  else if (k === "bed") { say(o.bed, 3000); SND.play("purr"); }
  else if (k === "toys") { startPlay("ball"); }
  else if (k === "can") { dropsAt(b); const fl = document.querySelectorAll("#room .gflower"); if (anim && fl.length) G.fromTo(fl, { scaleY: 0.85 }, { scaleY: 1, duration: 0.7, stagger: 0.01, ease: "elastic.out(1, .4)" }); SND.play("sparkle"); say(pick(o.can), 3000); }
  else if (k === "telescope") { shootingStar(); SND.play("chime"); say(pick(o.telescope), 3000); }
  else if (k === "shell") { fxAt(b, "🐚", "starfx", 1.1, -40); jump(true); SND.play("sparkle"); say(pick(t.obj2.shell), 3000); }
  else if (k === "fire") { glowAt(b, "#FFB36B"); const f = document.querySelector("#room .flame"); if (f && anim) G.fromTo(f, { scaleY: 1.5 }, { scaleY: 1, duration: 0.6, ease: "elastic.out(1, .4)" }); SND.play("purr"); say(pick(t.obj2.fire), 3000); }
  else if (k === "snowman") { fxAt(b, "❄", "starfx", 1, -40); jump(false); SND.play("chime"); say(pick(t.obj2.snowman), 3000); }
  SND.haptic(8);
}

/* --- Giochi veloci col compagno --- */
function stopPlay() {
  bubbleTimers.forEach(clearTimeout); bubbleTimers = []; const pl = document.getElementById("playlayer"); if (pl) pl.innerHTML = "";
  const b = document.getElementById("ballG"); if (b) b.remove();
  const p = document.getElementById("petInner"); if (p) { p.style.opacity = ""; if (anim && playMode === "hide") G.set(p, { opacity: 1, scale: 1 }); }
  if (playMode === "hide") { petFlip = false; placePet(petDX, false); }
  playMode = null; playBusy = false; hideSpot = null;
  document.querySelectorAll(".fact[data-act2]").forEach((x) => x.classList.remove("on"));
}
function startPlay(k) {
  const t = L(); const was = playMode; stopPlay();
  if (was === k && k !== "hug" && k !== "dance" && k !== "high") { if (petDX) movePet(0, 0.6); return; }
  const btn = document.querySelector(`.fact[data-act2="${k}"]`); if (btn) btn.classList.add("on");
  trackOnce("gioco-" + k);
  if (k === "chat") { const bt = document.querySelector('.fact[data-act2="chat"]'); if (bt) bt.classList.remove("on"); return openChat(); }
  if (k === "hug") return playHug();
  if (k === "dance") return playDance();
  if (k === "high") return playHigh();
  playMode = k;
  if (k === "ball") { say(t.play.ballHint, 4000); throwBall(320 - Math.random() * 60); }
  if (k === "bubbles") { popped = 0; say(t.play.bubbleHint, 3500); spawnBubbles(); }
  if (k === "hide") startHide();
}
function playHug() {
  const t = L(); const p = document.getElementById("petInner");
  setExpr("amore", 2600); SND.play("purr"); SND.haptic([20, 40, 20]); burst("heart", 12);
  const fx = document.getElementById("fx"); if (fx) { const w = document.createElement("i"); w.className = "warmfx"; fx.appendChild(w); if (anim) G.fromTo(w, { opacity: 0 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: 1, repeatDelay: 0.6, onComplete: () => w.remove() }); else setTimeout(() => w.remove(), 900); }
  if (p && anim) G.timeline().to(p, { scale: 1.14, transformOrigin: "50% 100%", duration: 0.35, ease: "back.out(2)" }).to(p, { scaleX: 1.18, scaleY: 1.1, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }).to(p, { scale: 1, duration: 0.4, ease: "elastic.out(1, .5)" });
  say(pick(t.play.hugSay), 3000); setTimeout(() => document.querySelectorAll('.fact[data-act2="hug"]').forEach((x) => x.classList.remove("on")), 1500);
}
function playDance() {
  const t = L(); const p = document.getElementById("petInner"); const pl = document.getElementById("playlayer");
  setExpr("felice", 3600); say(pick(t.play.danceSay), 3600);
  const mel = [523, 659, 784, 659, 587, 698, 880, 784, 659, 523]; mel.forEach((f, i) => bubbleTimers.push(setTimeout(() => SND.note(f), i * 300)));
  if (pl) for (let i = 0; i < 5; i++) { const s = document.createElement("i"); s.className = "disco"; s.style.left = `${10 + i * 20}%`; s.style.background = ["#FF9EB8", "#FFD25E", "#9EE3C5", "#9CC8F7", "#B9A3F2"][i]; pl.appendChild(s); if (anim) G.fromTo(s, { opacity: 0 }, { opacity: 0.55, duration: 0.3, yoyo: true, repeat: 9, delay: i * 0.12, onComplete: () => s.remove() }); else setTimeout(() => s.remove(), 600); }
  const pb = document.getElementById("petHit"); for (let i = 0; i < 8; i++) bubbleTimers.push(setTimeout(() => { if (pb) fxAt(pb, ["♪", "♫"][i % 2], "note", 1.3, -70); }, i * 380));
  if (p && anim) G.timeline().to(p, { rotation: -12, y: -14, transformOrigin: "50% 100%", duration: 0.2 }).to(p, { rotation: 12, y: 0, duration: 0.2 }).to(p, { rotation: -12, y: -14, duration: 0.2 }).to(p, { rotation: 0, y: 0, duration: 0.2 }).to(p, { scaleX: 1.15, scaleY: 0.88, duration: 0.15 }).to(p, { scaleX: 1, scaleY: 1, y: -40, duration: 0.25, ease: "power2.out" }).to(p, { rotation: 360, duration: 0.5, ease: "power2.inOut" }, "<").to(p, { y: 0, duration: 0.35, ease: "bounce.out" }).set(p, { rotation: 0 }).to(p, { rotation: -8, duration: 0.2, repeat: 3, yoyo: true }).to(p, { rotation: 0, duration: 0.2 });
  bubbleTimers.push(setTimeout(() => { burst("star", 10); document.querySelectorAll('.fact[data-act2="dance"]').forEach((x) => x.classList.remove("on")); }, 3200));
}
function playHigh() {
  const t = L(); const pl = document.getElementById("playlayer"); if (!pl) return;
  playMode = "high"; const d = dims();
  const h = document.createElement("button"); h.className = "hand"; h.id = "handBtn"; h.setAttribute("aria-label", t.play.highHint); h.innerHTML = `<svg viewBox="0 0 60 64" aria-hidden="true"><path d="M18 34V12a5 5 0 0 1 10 0v16M28 26V8a5 5 0 0 1 10 0v18M38 26V12a5 5 0 0 1 10 0v24c0 14-9 24-21 24h-2c-6 0-11-3-14-8L5 41a5 5 0 0 1 8-6l5 6" fill="#FFE2C4" stroke="#C98F5E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  h.style.left = `${((Math.min(318, 262 + petDX)) / 360) * 100}%`; h.style.top = `${((158 + d.top) / d.H) * 100}%`; pl.appendChild(h);
  say(t.play.highHint, 5000);
  if (anim) G.fromTo(h, { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2.4)" });
  bubbleTimers.push(setTimeout(() => { if (document.getElementById("handBtn")) { say(t.play.highMiss, 2600); if (anim) G.to(h, { scale: 0, duration: 0.3, onComplete: () => h.remove() }); else h.remove(); playMode = null; document.querySelectorAll('.fact[data-act2="high"]').forEach((x) => x.classList.remove("on")); } }, 6000));
}
function doHigh(h) {
  const t = L(); const p = document.getElementById("petInner"); bubbleTimers.forEach(clearTimeout); bubbleTimers = [];
  SND.play("pop"); setTimeout(() => SND.play("chime"), 80); SND.haptic([15, 30, 25]);
  if (p && anim) G.timeline().to(p, { scaleY: 0.85, scaleX: 1.1, transformOrigin: "50% 100%", duration: 0.1 }).to(p, { y: -50, x: 20, rotation: 12, scaleY: 1.08, scaleX: 0.95, duration: 0.25, ease: "power2.out" }).to(p, { y: 0, x: 0, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.45, ease: "bounce.out" });
  fxAt(h, "✦", "starfx", 0.8, -30); fxAt(h, "✦", "starfx", 0.9, -50); setExpr("felice", 2000); say(pick(t.play.highSay), 2600);
  if (anim) G.to(h, { scale: 1.4, opacity: 0, duration: 0.35, delay: 0.1, onComplete: () => h.remove() }); else h.remove();
  playMode = null; document.querySelectorAll('.fact[data-act2="high"]').forEach((x) => x.classList.remove("on"));
}

/* Palla */
function throwBall(toX) {
  const svg = document.querySelector("#room svg"); if (!svg || playBusy) return; const t = L();
  playBusy = true; const ns = "http://www.w3.org/2000/svg"; let g = document.getElementById("ballG");
  const startX = petDX + 180 > 180 ? 30 : 330;
  if (!g) { g = document.createElementNS(ns, "g"); g.id = "ballG"; g.innerHTML = '<ellipse class="bsh" cx="0" cy="11" rx="9" ry="2.6" fill="#000" opacity=".15"/><g class="bb"><circle r="9" fill="#E2654F"/><path d="M-8 -2 Q0 4 8 -2" stroke="#fff" stroke-width="2.4" fill="none"/><circle cx="-3" cy="-4" r="2.2" fill="#fff" opacity=".5"/></g>'; svg.insertBefore(g, petWrapEl() ? petWrapEl().nextSibling : null); G.set(g, { x: startX, y: 244 }); }
  toX = Math.max(30, Math.min(330, toX));
  const bb = g.querySelector(".bb"); SND.play("pop");
  if (!anim) { G.set(g, { x: toX }); petDX = Math.max(-100, Math.min(110, toX - 180)); placePet(petDX, false); playBusy = false; say(pick(t.play.ballSay), 2200); return; }
  const fromX = G.getProperty(g, "x"); const dur = 0.5 + Math.abs(toX - fromX) / 400;
  G.to(g, { x: toX, duration: dur, ease: "power2.out" }); G.to(bb, { rotation: (toX - fromX) * 2, duration: dur, ease: "power2.out", transformOrigin: "50% 50%" });
  G.timeline().to(bb, { y: -46, duration: dur * 0.35, ease: "power2.out" }).to(bb, { y: 0, duration: dur * 0.3, ease: "power2.in" }).to(bb, { y: -14, duration: dur * 0.17, ease: "power2.out" }).to(bb, { y: 0, duration: dur * 0.18, ease: "power2.in" });
  const side = toX > 180 + petDX ? -24 : 24; const target = toX - 180 + side * (toX > 180 + petDX ? 1 : 1);
  setTimeout(() => movePet(Math.max(-100, Math.min(110, target)), 0.45 + Math.abs(target - petDX) / 260, () => {
    const back = toX > 180 ? 40 + Math.random() * 80 : 240 + Math.random() * 80;
    const p = document.getElementById("petInner"); if (p) G.timeline().to(p, { rotation: toX > 180 + petDX ? 12 : -12, transformOrigin: "50% 100%", duration: 0.1 }).to(p, { rotation: 0, duration: 0.2 });
    SND.play("pop"); setExpr("felice", 1500);
    const d2 = 0.6 + Math.abs(back - toX) / 380;
    G.to(g, { x: back, duration: d2, ease: "power2.out" }); G.to(bb, { rotation: `+=${(back - toX) * 2}`, duration: d2 }); G.timeline().to(bb, { y: -60, duration: d2 * 0.45, ease: "power2.out" }).to(bb, { y: 0, duration: d2 * 0.35, ease: "bounce.out" });
    setTimeout(() => { playBusy = false; if (Math.random() < 0.5) say(pick(t.play.ballSay), 2200); }, d2 * 1000);
  }), dur * 400);
}
/* Bolle */
function spawnBubbles() {
  const pl = document.getElementById("playlayer"); if (!pl) return; const d = dims(); let alive = 0, made = 0; const total = 12;
  const end = () => { if (playMode !== "bubbles") return; say(L().play.bubbleEnd(popped), 3200); if (popped >= 6) burst("star", 8); stopPlay(); };
  const one = () => {
    if (playMode !== "bubbles") return;
    const b = document.createElement("button"); b.className = "bubl"; b.setAttribute("aria-label", "○"); const sz = 34 + Math.random() * 26; b.style.width = b.style.height = `${sz}px`;
    b.style.left = `${8 + Math.random() * 78}%`; b.style.top = `${((240 + d.top) / d.H) * 100}%`; pl.appendChild(b); alive++; made++;
    const rise = -((260 + d.top * 0.6) / d.H) * (document.getElementById("room").getBoundingClientRect().height);
    const kill = () => { alive--; b.remove(); if (made >= total && alive <= 0) end(); };
    if (anim) { G.fromTo(b, { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }); G.to(b, { y: rise, duration: 5 + Math.random() * 2.5, ease: "none", onComplete: kill }); G.to(b, { x: `+=${(Math.random() - 0.5) * 60}`, duration: 1.4, yoyo: true, repeat: 5, ease: "sine.inOut" }); }
    else bubbleTimers.push(setTimeout(kill, 4000));
    b._kill = kill;
    if (made < total) bubbleTimers.push(setTimeout(one, 450 + Math.random() * 500));
  };
  one();
  const petPop = () => {
    if (playMode !== "bubbles") return;
    const hit = document.getElementById("petHit"); if (hit) {
      const hr = hit.getBoundingClientRect(); const near = [...document.querySelectorAll(".bubl")].find((b) => { const r = b.getBoundingClientRect(); return r.left + r.width / 2 > hr.left - 10 && r.left + r.width / 2 < hr.right + 10 && r.bottom > hr.top - 70 && r.top < hr.top + 20; });
      if (near) { jump(true); setTimeout(() => popBubble(near, true), 220); }
    }
    bubbleTimers.push(setTimeout(petPop, 900));
  };
  bubbleTimers.push(setTimeout(petPop, 1500));
}
function popBubble(b, byPet) {
  if (!b.isConnected) return; popped++; SND.play("pop"); SND.haptic(6);
  fxAt(b, "✦", "starfx", 0.6, -18); if (anim) { G.killTweensOf(b); G.to(b, { scale: 1.5, opacity: 0, duration: 0.18, onComplete: () => b._kill && b._kill() }); } else b._kill && b._kill();
  if (byPet) setExpr("felice", 900);
}
/* Nascondino */
function hideSpots() {
  const L0 = [["cl", 38, 96], ["cr", 134, 96]];
  if (["plant", "cactus", "sunflower", "monstera"].some((k) => S.furn.includes(k))) L0.push(["pl", 320, 210]);
  if (["lamp", "lamp_moon", "lamp_lava"].some((k) => S.furn.includes(k))) L0.push(["lp", 44, 226]);
  if (S.furn.includes("pouf") || S.furn.includes("books") || S.furn.includes("yarn")) L0.push(["fl", 98, 246]);
  if (full && SCENE_POS.bedY && dims().bot >= 120) { L0.push(["bd", 86, SCENE_POS.bedY - 6]); L0.push(["ty", 278, SCENE_POS.bedY - 14]); }
  if (sceneId === "garden") return [["tr", 38, 120], ["fe", 250, 192], ["cn", 300, (SCENE_POS.canY || 266) - 6]];
  if (sceneId === "terrace") return [["pt", 40, 230], ["ts", 306, 250], ["rl", 180, 216]];
  if (sceneId === "beach") return [["um", 300, 230], ["sc", 52, 236], ["tw", 270, 252]];
  if (sceneId === "camp") return [["tn", 104, 240], ["tr", 330, 170], ["fr", 286, 240]];
  if (sceneId === "snow") return [["sm", 292, 230], ["pn", 336, 186], ["p2", 24, 186]];
  return L0;
}
function startHide() {
  const t = L(); const p = document.getElementById("petInner"); if (!p) return;
  hideMisses = 0; const spots = hideSpots(); hideSpot = pick(spots);
  if (anim) G.timeline().to(p, { scale: 0.2, opacity: 0, transformOrigin: "50% 80%", duration: 0.35, ease: "back.in(2)" }); else p.style.opacity = "0";
  burst("star", 6); SND.play("giggle"); say(t.play.hideStart(S.petName), 6000);
}
function hideGuess(x, y) {
  const t = L(); if (!hideSpot) return;
  const near = Math.hypot(x - hideSpot[1], y - hideSpot[2]) < 46;
  if (!near) {
    hideMisses++; SND.play("miss"); say(pick(t.play.hideMiss), 2000);
    const pl = document.getElementById("playlayer"); const d = dims();
    if (pl) { const q = document.createElement("i"); q.className = "qmark"; q.textContent = "?"; q.style.left = `${(x / 360) * 100}%`; q.style.top = `${((y + d.top) / d.H) * 100}%`; pl.appendChild(q); if (anim) G.fromTo(q, { scale: 0.4, opacity: 1 }, { scale: 1.2, opacity: 0, y: -20, duration: 0.8, onComplete: () => q.remove() }); else setTimeout(() => q.remove(), 500); }
    if (hideMisses >= 2) peekHint();
    return;
  }
  const spot = hideSpot; hideSpot = null; const p = document.getElementById("petInner"); const w = petWrapEl();
  SND.play("fanfare"); SND.haptic([20, 40, 20]); burst("confetti", 18);
  const dx = spot[1] - 180, dy = spot[2] - 200;
  if (w && p && anim) {
    G.set(w, { attr: { transform: `translate(${PB.x + dx * 0.9} ${PB.y + dy * 0.7}) scale(${PB.s * 0.7})` } });
    G.timeline().to(p, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.6)" }).to({}, { duration: 0.8 }).add(() => { G.to(w, { attr: { transform: `translate(${PB.x + petDX} ${PB.y}) scale(${PB.s})` }, duration: 0.6, ease: "power2.inOut" }); });
  } else if (p) { p.style.opacity = ""; }
  petFlip = false; setExpr("felice", 2400); say(pick(t.play.hideFound), 3000);
  playMode = null; document.querySelectorAll('.fact[data-act2="hide"]').forEach((x) => x.classList.remove("on"));
}
function peekHint() {
  const t = L(); if (!hideSpot) return; const pl = document.getElementById("playlayer"); const d = dims(); if (!pl) return;
  const e = document.createElement("i"); e.className = "peek"; e.innerHTML = "👀"; e.style.left = `${(hideSpot[1] / 360) * 100}%`; e.style.top = `${((hideSpot[2] + d.top) / d.H) * 100}%`; pl.appendChild(e);
  say(t.play.hidePeek, 2600); if (anim) G.fromTo(e, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, yoyo: true, repeat: 1, repeatDelay: 0.9, onComplete: () => e.remove() }); else setTimeout(() => e.remove(), 1200);
}

/* --- Tocchi --- */
document.addEventListener("pointerdown", (ev) => {
  if (!playMode || ev.target.closest("button:not(.spot):not(.pethit)")) return;
  const room = ev.target.closest && ev.target.closest("#room"); if (!room) return;
  const p = sceneXY(ev.clientX, ev.clientY); if (!p) return;
  if (playMode === "ball" && p.y > 150) { ev.preventDefault(); swallow = Date.now(); throwBall(p.x); }
  else if (playMode === "hide") { ev.preventDefault(); swallow = Date.now(); hideGuess(p.x, p.y); }
}, true);
let swallow = 0;
document.addEventListener("click", (ev) => {
  const t = L();
  if (Date.now() - swallow < 700 && ev.target.closest && ev.target.closest("#room") && !ev.target.closest(".bubl, #handBtn, .critter")) { swallow = 0; ev.stopPropagation(); ev.preventDefault(); return; }
  const star = ev.target.closest && ev.target.closest(".dstar");
  if (star && full) { const k = star.dataset.day; const r = S.days[k] || {}; toast(r.done ? t.full.starDay(fmtDate(k), r.done) : t.full.starRest(fmtDate(k))); SND.note(1046.5); if (anim) G.fromTo(star, { scale: 1.6 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.6, ease: "elastic.out(1, .4)" }); return; }
  const b = ev.target.closest("button"); if (!b) return;
  if (b.id === "fullOpen") { openFull(); return; }
  if (b.id === "fullClose") { closeFull(); return; }
  if (b.classList.contains("bubl")) { popBubble(b); return; }
  if (b.id === "handBtn") { doHigh(b); return; }
  if (b.dataset.spot) { if (playMode === "ball" || playMode === "hide") return; spotAction(b.dataset.spot, b); return; }
  if (b.dataset.scene) {
    if (b.dataset.lock) { toast(t.full.lockToast(+b.dataset.lock)); SND.play("miss"); return; }
    if (b.dataset.plus) { const k = b.dataset.scene; openPlus("gita-" + k, () => { if (plusActive()) { sceneId = k; petDX = 0; sayText = null; render(); } }); return; }
    if (sceneId === b.dataset.scene) return; stopPlay(); sceneId = b.dataset.scene; petDX = 0; petFlip = false; sayText = null; SND.play("chime"); render(); trackOnce("scena-" + sceneId);
    if (anim) G.from("#room > svg", { opacity: 0, scale: 1.04, duration: 0.5, ease: "power2.out" });
    return;
  }
  if (b.dataset.act2) {
    if (b.dataset.lock) { toast(t.full.lockToast(+b.dataset.lock)); SND.play("miss"); if (anim) G.fromTo(b, { x: -4 }, { x: 0, duration: 0.4, ease: "elastic.out(1, .3)" }); return; }
    startPlay(b.dataset.act2); return;
  }
  if (b.dataset.act && full) stopPlay();
}, true);

/* Tab cambiato o compagno in viaggio: si esce dallo schermo intero */
const _renderV8 = render;
render = function () {
  if (full && (tab !== "today" || S.away || !S.pet)) { full = false; document.body.classList.remove("isfull"); stopPlay(); try { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } catch (e) { /* niente */ } }
  if (!full) { petDX = 0; petFlip = false; }
  _renderV8();
};
const _ambientV8 = ambientExtra;
ambientExtra = function (root, q) {
  _ambientV8(root, q);
  if (!anim) return;
  q(".flyb2").forEach((f, i) => ambient.push(G.to(f, { x: `+=${i ? -50 : 60}`, y: `-=${i ? 20 : 30}`, duration: 4 + i, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  q(".flyb2 ellipse").forEach((w) => ambient.push(G.to(w, { scaleX: 0.3, transformOrigin: "50% 50%", duration: 0.16, repeat: -1, yoyo: true })));
  q(".tstar").forEach((s) => ambient.push(G.to(s, { scale: 1.25, transformOrigin: "50% 50%", duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut" })));
  if (full && sceneId === "terrace") { const loop = () => { const c = G.delayedCall(6 + Math.random() * 8, () => { shootingStar(); loop(); }); ambient.push(c); }; loop(); }
  if (tab === "today" && !full && sceneId === "room") { const loop = () => { const c = G.delayedCall(14 + Math.random() * 14, () => { critter(); loop(); }); ambient.push(c); }; loop(); }
  if (full && sceneId === "room") { const loop = () => { const c = G.delayedCall(10 + Math.random() * 12, () => { critter(); loop(); }); ambient.push(c); }; loop(); }
};
/* Una coccinella o una farfalla passa ogni tanto: toccala! */
function critter() {
  const pl = document.getElementById("playlayer"); if (!pl || layer.innerHTML || playMode) return; const d = dims(); const t = L();
  const bfly = ["spring", "summer"].includes(season().id) && phase() !== "night";
  const c = document.createElement("button"); c.className = "critter"; c.setAttribute("aria-label", bfly ? "🦋" : "🐞");
  c.innerHTML = bfly ? `<svg viewBox="-12 -10 24 20" aria-hidden="true"><g class="cw"><ellipse cx="-5" cy="-2" rx="6" ry="5" fill="#9CC8F7"/><ellipse cx="5" cy="-2" rx="6" ry="5" fill="#B9A3F2"/><ellipse cx="-4" cy="5" rx="4" ry="3" fill="#9CC8F7"/><ellipse cx="4" cy="5" rx="4" ry="3" fill="#B9A3F2"/></g><rect x="-1" y="-6" width="2" height="13" rx="1" fill="#5A3A2A"/></svg>` : `<svg viewBox="-12 -10 24 20" aria-hidden="true"><circle cx="0" cy="-6" r="3.6" fill="#33302E"/><ellipse cx="0" cy="1" rx="8" ry="7" fill="#E2454A"/><path d="M0 -6 V8" stroke="#33302E" stroke-width="1.2"/><circle cx="-4" cy="0" r="1.6" fill="#33302E"/><circle cx="4" cy="2" r="1.6" fill="#33302E"/><circle cx="-3" cy="5" r="1.2" fill="#33302E"/><circle cx="3" cy="-3" r="1.2" fill="#33302E"/></svg>`;
  const y0 = bfly ? 60 + Math.random() * 80 : 268 + Math.min(40, d.bot * 0.2); c.style.top = `${((y0 + d.top) / d.H) * 100}%`; c.style.left = "-8%"; pl.appendChild(c);
  if (!anim) { setTimeout(() => c.remove(), 3000); return; }
  if (bfly) ambient.push(G.to(c.querySelector(".cw"), { scaleX: 0.3, transformOrigin: "50% 50%", duration: 0.15, repeat: -1, yoyo: true }));
  const tw = G.to(c, { left: "106%", duration: bfly ? 9 : 14, ease: "none", onComplete: () => c.remove() }); ambient.push(tw);
  if (bfly) ambient.push(G.to(c, { y: -30, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }));
  c._tw = tw;
  const pet = document.getElementById("petHit"); if (pet) ambient.push(G.delayedCall(2, () => { const e = document.querySelectorAll("#room .eyes"); G.to(e, { x: -4, duration: 0.3, yoyo: true, repeat: 1, repeatDelay: 1 }); }));
}
document.addEventListener("click", (ev) => {
  const c = ev.target.closest && ev.target.closest(".critter"); if (!c) return;
  if (c._tw) c._tw.kill(); SND.play("sparkle"); burst("star", 6); jump(true); setExpr("wow", 1400);
  if (anim) G.to(c, { y: -80, opacity: 0, scale: 1.4, duration: 0.7, ease: "power2.out", onComplete: () => c.remove() }); else c.remove();
}, true);

/* --- Frasi e lettere su misura (senza IA) --- */
function personalLines() {
  const t = L().pl; const out = []; const st = streak(); if (st >= 2) out.push(t.streak(st));
  const log = S.log || []; if (log.length >= 5) out.push(t.total(log.length));
  if (S.firstDay) { const n = Math.round((new Date(dkey()) - new Date(S.firstDay)) / 86400000); if (n >= 3) out.push(t.days(n)); }
  const wk = dkey(new Date(Date.now() - 6 * 86400000)); const cnt = {}; log.filter((x) => x.d >= wk).forEach((x) => { const c = goalCat(x.g); cnt[c] = (cnt[c] || 0) + 1; });
  const best = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0]; if (best && cnt[best] >= 3 && L().cats[best]) out.push(t.cat(L().cats[best]));
  const gc = {}; log.forEach((x) => { gc[x.g] = (gc[x.g] || 0) + 1; }); const topG = Object.keys(gc).sort((a, b) => gc[b] - gc[a])[0];
  if (topG && gc[topG] >= 4 && S.goals.some((g) => g.id === topG)) out.push(t.goal(goalText(topG)));
  if (S.level >= 3) out.push(t.level(S.level));
  return out;
}
const _openLetter = openLetter;
openLetter = function () {
  const pl = personalLines();
  if (S.letterN % 2 === 1 && pl.length) {
    const t = L(); const a = pl[S.letterN % pl.length], b = pl.length > 1 ? pl[(S.letterN + 1) % pl.length] : null;
    const txt = [a, b, pick(t.pl.close)].filter(Boolean).join(" ");
    layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="lT"><div class="box"><div class="paper"><h2 id="lT">${t.letterT}</h2><p class="lt" id="ltxt">${esc(txt)}</p><p class="sign">${esc(t.letterSign(S.petName))}</p><div class="lpet">${petSVG(S.pet, "amore", S.hat, stage(), S.petName)}</div></div><button class="btn" id="closeLetter">${t.ok}</button></div></div>`;
    SND.play("paper"); SND.haptic(10); trackOnce("lettera-su-misura");
    if (anim) { G.from(".paper", { scale: 0.6, rotation: -6, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }); G.from("#ltxt", { opacity: 0, y: 8, duration: 0.6, delay: 0.35 }); }
    return;
  }
  _openLetter();
};

const _petTap = petTap;
petTap = function () { if (playMode === "hide") return; _petTap(); };

/* --- Copia dei dati su file --- */
async function saveBackup() {
  const t = L(); const name = `tanetto-copia-${dkey().split("-").reverse().join("-")}.json`;
  const blob = new Blob([JSON.stringify({ app: "tanetto", v: 1, saved: new Date().toISOString(), state: S })], { type: "application/json" });
  try {
    const dl = await getDl();
    if (dl) { try { await dl.save({ filename: name, data: blob }); toast(t.data.saved); trackOnce("copia-salvata"); return; } catch (e) { if (e && (e.code === "declined" || e.code === "rate_limited")) return; } }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    toast(t.data.saved); trackOnce("copia-salvata");
  } catch (e) { toast(t.saveNo); }
}
function readBackup(file) {
  const t = L(); const fr = new FileReader();
  fr.onload = () => {
    let o = null; try { o = JSON.parse(fr.result); } catch (e) { o = null; }
    if (!o || o.app !== "tanetto" || !o.state || typeof o.state !== "object" || !o.state.pet) { toast(t.data.bad); SND.play("miss"); return; }
    pendingRestore = o.state;
    layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="rsT"><div class="box card"><h2 id="rsT">${t.data.restore}</h2><p>${esc(t.data.ask)}</p><div class="row" style="justify-content:center"><button class="btn ghost" id="rsNo">${t.data.no}</button><button class="btn" id="rsYes">${t.data.yes}</button></div></div></div>`;
  };
  fr.readAsText(file);
}
let pendingRestore = null;
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return; const t = L();
  if (b.id === "bkSave") { saveBackup(); return; }
  if (b.id === "bkLoad") { const f = document.getElementById("bkFile"); if (f) { f.value = ""; f.click(); } return; }
  if (b.id === "rsNo") { pendingRestore = null; layer.innerHTML = ""; return; }
  if (b.id === "rsYes" && pendingRestore) { S = Object.assign(fresh(), pendingRestore); pendingRestore = null; save(); layer.innerHTML = ""; applyRoot(); render(); toast(t.data.ok); SND.play("fanfare"); trackOnce("copia-ripristinata"); return; }
  if (b.id === "instBtn" && deferredInstall) { deferredInstall.prompt(); deferredInstall.userChoice.then((r) => { if (r && r.outcome === "accepted") { toast(t.inst.done); trackOnce("installata"); } deferredInstall = null; render(); }).catch(() => {}); return; }
});
document.addEventListener("change", (ev) => { if (ev.target && ev.target.id === "bkFile" && ev.target.files && ev.target.files[0]) readBackup(ev.target.files[0]); });

/* --- App installabile (solo sul sito) --- */
let deferredInstall = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; if (tab === "more") render(); });
const isStandalone = () => { try { return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; } catch (e) { return false; } };
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent || "");
function installCard() {
  const t = L(); if (isStandalone() || !/github\.io$/.test(location.hostname)) return "";
  if (deferredInstall) return `<div class="card stack-s"><h3>${t.inst.T}</h3><p class="small muted">${t.inst.P}</p><button class="btn" id="instBtn">${t.inst.B}</button></div>`;
  if (isIOS()) return `<div class="card stack-s"><h3>${t.inst.T}</h3><p class="small muted">${t.inst.P}</p><p class="small"><b>${t.inst.ios}</b></p></div>`;
  return "";
}
const _viewMoreV8 = viewMore;
viewMore = function () {
  const t = L(); const h = _viewMoreV8();
  const card = `${installCard()}<div class="card stack-s" id="dataCard"><h3>${t.data.T}</h3><p class="small muted">${t.data.P}</p><div class="imgbtns col" style="margin-top:4px"><button class="btn" id="bkSave">${t.data.save}</button><button class="btn ghost" id="bkLoad">${t.data.restore}</button></div><input type="file" id="bkFile" accept="application/json,.json" hidden></div>`;
  const key = `<div class="card stack-s"><h3>${t.legalT}</h3>`;
  return h.includes(key) ? h.replace(key, card + key) : h + card;
};
if ("serviceWorker" in navigator && /github\.io$/.test(location.hostname)) { try { navigator.serviceWorker.register("sw.js").catch(() => {}); } catch (e) { /* niente */ } }
