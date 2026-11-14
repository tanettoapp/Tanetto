/* =================== ILLUSTRAZIONI =================== */
const INK = "#33302E";
let uid = 0, SCENE_TOP = 0, nidScope = "";
const nid = (p) => `${p}${nidScope}${++uid}`;
function eyes(e, lx, rx, y) {
  if (e === "amore") return [lx, rx].map((x) => `<path d="M${x} ${y + 6} C${x - 7} ${y + 1} ${x - 9} ${y - 3} ${x - 7} ${y - 6} C${x - 5} ${y - 9} ${x - 1} ${y - 8} ${x} ${y - 5} C${x + 1} ${y - 8} ${x + 5} ${y - 9} ${x + 7} ${y - 6} C${x + 9} ${y - 3} ${x + 7} ${y + 1} ${x} ${y + 6} Z" fill="#E2454A"/><circle cx="${x - 3}" cy="${y - 4}" r="1.6" fill="#fff" opacity=".8"/>`).join("");
  if (e === "wow") return [lx, rx].map((x) => `<ellipse cx="${x}" cy="${y}" rx="8.8" ry="10.4" fill="#2A201B"/><ellipse cx="${x}" cy="${y + 4}" rx="6" ry="5.2" fill="#5A4436" opacity=".75"/><ellipse cx="${x + 2.9}" cy="${y - 4}" rx="3.4" ry="3.7" fill="#fff"/><circle cx="${x - 2.8}" cy="${y + 4}" r="1.7" fill="#fff" opacity=".9"/>`).join("");
  if (e === "felice") return [lx, rx].map((x) => `<path d="M${x - 7} ${y + 2} Q${x} ${y - 7} ${x + 7} ${y + 2}" stroke="#2A201B" stroke-width="3.6" fill="none" stroke-linecap="round"/>`).join("");
  if (e === "assonnato") return [lx, rx].map((x) => `<path d="M${x - 7} ${y} Q${x} ${y + 5} ${x + 7} ${y}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("");
  /* 1.0.9: occhi come le figure di plastilina 3D: marrone scurissimo lucido, riflesso dell'iride in basso, luce grande in alto a destra */
  return `<g class="eyes" style="transform-box:fill-box;transform-origin:center">` + [lx, rx].map((x) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="9.8" fill="#2A201B"/><ellipse cx="${x}" cy="${y + 3.8}" rx="5.6" ry="5" fill="#5A4436" opacity=".75"/><ellipse cx="${x + 2.6}" cy="${y - 3.9}" rx="3.2" ry="3.5" fill="#fff"/><circle cx="${x - 2.7}" cy="${y + 4}" r="1.4" fill="#fff" opacity=".85"/>`).join("") + `</g>`;
}
function mouth(e, x, y) { return `<g transform="translate(${x} ${y}) scale(.8) translate(${-x} ${-y})">${mouthArt(e, x, y)}</g>`; }
function mouthArt(e, x, y) {
  if (e === "wow") return `<ellipse cx="${x}" cy="${y + 3}" rx="4.6" ry="5.6" fill="${INK}"/><ellipse cx="${x}" cy="${y + 5.5}" rx="2.6" ry="2" fill="#F08A8A"/>`;
  if (e === "amore") e = "felice";
  if (e === "felice") return `<path d="M${x - 8.5} ${y - 1.5} L${x + 8.5} ${y - 1.5} C${x + 8.5} ${y + 9} ${x - 8.5} ${y + 9} ${x - 8.5} ${y - 1.5} Z" fill="${INK}"/><path d="M${x - 5} ${y + 5} C${x - 3} ${y + 2.5} ${x + 3} ${y + 2.5} ${x + 5} ${y + 5} C${x + 3} ${y + 7.2} ${x - 3} ${y + 7.2} ${x - 5} ${y + 5} Z" fill="#F08A8A"/>`;
  if (e === "assonnato") return `<ellipse cx="${x}" cy="${y + 2}" rx="3" ry="2.4" fill="${INK}"/>`;
  return `<path d="M${x - 6} ${y} Q${x} ${y + 6} ${x + 6} ${y}" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
}
const cheeks = (lx, rx, y, c = "#F4A3A3") => [lx, rx].map((x) => `<ellipse cx="${x}" cy="${y}" rx="10.5" ry="6.4" fill="${c}" opacity=".32"/><ellipse cx="${x}" cy="${y}" rx="7.6" ry="4.6" fill="${c}" opacity=".62"/>`).join("");
function sleepZ(e, x, y) { return e === "assonnato" ? `<g class="zz"><path d="M${x - 4} ${y - 8} h12 l-12 14 h12" stroke="#8E9AAF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x + 12} ${y - 22} h8 l-8 9 h8" stroke="#8E9AAF" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ""; }
function beanie(b, hat, pompom = true) {
  const [col, band] = HATS[hat];
  const light = hat === "s_winter";
  let o = `<path d="M62 ${b} C62 ${b - 38} 138 ${b - 38} 138 ${b} Z" fill="${col}"/><path d="M118 ${b - 4} C122 ${b - 18} 116 ${b - 28} 108 ${b - 32}" stroke="#000" stroke-width="6" opacity=".07" fill="none" stroke-linecap="round"/><path d="M80 ${b - 6} C82 ${b - 22} 88 ${b - 30} 94 ${b - 32}" stroke="#fff" stroke-width="3" opacity=".3" fill="none" stroke-linecap="round"/><rect x="58" y="${b - 4}" width="84" height="16" rx="8" fill="${band}"/>`;
  for (let i = 0; i < 7; i++) o += `<line x1="${68 + i * 11}" y1="${b - 1}" x2="${68 + i * 11}" y2="${b + 9}" stroke="${light ? "#D8CFC2" : "#fff"}" stroke-width="2" opacity="${light ? 0.9 : 0.28}" stroke-linecap="round"/>`;
  if (light) [[80, b - 16], [100, b - 24], [120, b - 14], [92, b - 10], [110, b - 6]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="2.6" fill="#fff" opacity=".9"/>`; });
  if (pompom) o += `<circle cx="100" cy="${b - 36}" r="9.5" fill="#FFF4EE"/><circle cx="103" cy="${b - 33}" r="5" fill="#000" opacity=".06"/>`;
  if (hat === "s_autumn") o += `<g transform="translate(124 ${b - 18}) rotate(20)"><path d="M0 -12 L3 -5 L10 -7 L6 0 L11 4 L3 5 L2 12 L0 7 L-2 12 L-3 5 L-11 4 L-6 0 L-10 -7 L-3 -5 Z" fill="#E8742F"/><path d="M0 -8 L0 12" stroke="#B4501C" stroke-width="1.4" stroke-linecap="round"/></g>`;
  return o;
}
function crown(b) {
  const y = (t) => (1 - t) * (1 - t) * (b + 2) + 2 * (1 - t) * t * (b - 12) + t * t * (b + 2);
  let o = `<path d="M60 ${b + 2} Q100 ${b - 12} 140 ${b + 2}" stroke="#6DAE5E" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const cols = ["#FF9EB8", "#FFD25E", "#FFFFFF", "#B9A3F2"];
  for (let k = 0; k < 7; k++) {
    const t = k / 6, x = 60 + 80 * t, cy = y(t) - 1;
    if (k < 6) o += `<ellipse cx="${x + 6.5}" cy="${y(t + 1 / 12) + 1}" rx="4" ry="2.2" fill="#7FC27B" transform="rotate(-20 ${x + 6.5} ${y(t + 1 / 12) + 1})"/>`;
    const c = cols[k % 4];
    for (let a = 0; a < 5; a++) o += `<circle cx="${x + 4.2 * Math.cos((a * 72 - 90) * Math.PI / 180)}" cy="${cy + 4.2 * Math.sin((a * 72 - 90) * Math.PI / 180)}" r="3.6" fill="${c}" stroke="#E6D3C8" stroke-width=".6"/>`;
    o += `<circle cx="${x}" cy="${cy}" r="2.6" fill="${k % 2 ? "#F28A3C" : "#FFC94D"}"/>`;
  }
  return o;
}
function straw(b) {
  let o = `<ellipse cx="100" cy="${b + 4}" rx="60" ry="12" fill="#E9C46E"/><ellipse cx="100" cy="${b + 2}" rx="56" ry="9.5" fill="#F2D58B"/>`;
  for (let i = 0; i < 4; i++) o += `<ellipse cx="100" cy="${b + 2}" rx="${50 - i * 3}" ry="${8 - i * 0.6}" fill="none" stroke="#D9B260" stroke-width=".8" opacity=".7" stroke-dasharray="3 3"/>`;
  o += `<path d="M70 ${b + 1} C70 ${b - 32} 130 ${b - 32} 130 ${b + 1} Z" fill="#F0CE7C"/><path d="M76 ${b - 8} C78 ${b - 22} 86 ${b - 26} 92 ${b - 27}" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/><path d="M70.5 ${b - 7} H129.5 V${b + 1} H70.5 Z" fill="#E2654F"/><circle cx="122" cy="${b - 3}" r="4.5" fill="#FFF4EE"/><circle cx="122" cy="${b - 3}" r="2" fill="#FFC94D"/>`;
  return o;
}
function headwear(b, hat, pompom = true) {
  if (!hat) return "";
  if (typeof HAT_ART !== "undefined" && HAT_ART[hat]) return HAT_ART[hat](b);
  if (hat === "s_spring") return crown(b);
  if (hat === "s_summer") return straw(b);
  if (!HATS[hat]) return "";
  return beanie(b, hat, pompom);
}
/* 1.0.9: materiale "plastilina" come le figure 3D del video (stessi colori di prima): luce principale in alto a sinistra,
   ombra di forma verso i bordi, occlusione in basso, luce di contorno calda sul bordo in basso a destra. Solo sfumature
   (niente filtri): stesso costo di disegno di prima. Le coordinate sono quelle del disegno 200x200 di ogni compagno. */
function shade(d) {
  const id = nid("cl"), hg = nid("hg"), sg = nid("sg"), eg = nid("eg"), rg = nid("rg");
  return `<defs><radialGradient id="${hg}" gradientUnits="userSpaceOnUse" cx="78" cy="84" r="62"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".35" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="${eg}" gradientUnits="userSpaceOnUse" cx="92" cy="104" r="88"><stop offset=".58" stop-color="#3A2510" stop-opacity="0"/><stop offset="1" stop-color="#3A2510" stop-opacity=".2"/></radialGradient><linearGradient id="${sg}" gradientUnits="userSpaceOnUse" x1="0" y1="120" x2="0" y2="186"><stop offset="0" stop-color="#3A2510" stop-opacity="0"/><stop offset="1" stop-color="#3A2510" stop-opacity=".12"/></linearGradient><linearGradient id="${rg}" gradientUnits="userSpaceOnUse" x1="96" y1="112" x2="160" y2="176"><stop offset=".4" stop-color="#FFF4D6" stop-opacity="0"/><stop offset="1" stop-color="#FFF4D6" stop-opacity=".85"/></linearGradient></defs><clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})"><rect width="200" height="200" fill="url(#${eg})"/><rect width="200" height="200" fill="url(#${sg})"/><rect width="200" height="200" fill="url(#${hg})"/><path d="${d}" fill="none" stroke="url(#${rg})" stroke-width="6"/></g><path d="${d}" fill="none" stroke="#3A2510" stroke-opacity=".11" stroke-width="2"/>`;
}
/* ombra di contatto morbida (piu' scura sotto il centro) */
const shadow = () => `<ellipse cx="100" cy="186" rx="54" ry="8" fill="#3A2510" opacity=".09"/><ellipse cx="100" cy="185.5" rx="40" ry="5.6" fill="#3A2510" opacity=".12"/>`;
function germo(e, hat, st) {
  const bodyD = "M100 66 C140 66 162 96 162 128 C162 160 136 178 100 178 C64 178 38 160 38 128 C38 96 60 66 100 66 Z";
  let sprout = `<g class="sprout" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M100 72 C100 60 101 52 103 44" stroke="#5A985A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M102 46 C88 28 66 30 60 42 C72 54 92 56 102 46 Z" fill="#76BF72"/><path d="M102 46 C88 40 74 40 64 42" stroke="#5A985A" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M103 44 C118 22 146 24 150 40 C136 54 112 56 103 44 Z" fill="#8ED089"/><path d="M103 44 C120 38 136 37 148 40" stroke="#5A985A" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if (st === 1) sprout += `<ellipse cx="103" cy="34" rx="7" ry="9" fill="#F7B6C8"/><path d="M98 38 Q103 26 108 38" fill="#EE93AE"/>`;
  if (st >= 2) { for (let a = 0; a < 5; a++) sprout += `<ellipse cx="103" cy="24" rx="6.5" ry="10" fill="#FFB3C7" transform="rotate(${a * 72} 103 33)"/>`; sprout += `<circle cx="103" cy="33" r="5.5" fill="#FFD25E"/>`; }
  sprout += `</g>`;
  const body = `<ellipse cx="44" cy="132" rx="9" ry="14" fill="#97D08F" transform="rotate(25 44 132)"/><ellipse cx="156" cy="132" rx="9" ry="14" fill="#97D08F" transform="rotate(-25 156 132)"/><ellipse cx="78" cy="177" rx="15" ry="8" fill="#80BF79"/><ellipse cx="122" cy="177" rx="15" ry="8" fill="#80BF79"/><path d="${bodyD}" fill="#9AD391"/><ellipse cx="100" cy="156" rx="39" ry="21.5" fill="#FFF6E4"/><ellipse cx="96" cy="150" rx="24" ry="9" fill="#fff" opacity=".45"/>` + shade(bodyD);
  return shadow() + `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%">` + body + headwear(92, hat, false) + sprout + eyes(e, 80, 120, 116) + cheeks(66, 134, 130) + mouth(e, 100, 129) + `</g>` + sleepZ(e, 160, 70);
}
function ondi(e, hat, st) {
  const b = "#A8775A", c = "#F4E4D4", d = "#4A352A";
  const bodyD = "M100 50 C134 50 150 76 150 108 C150 150 140 182 100 182 C60 182 50 150 50 108 C50 76 66 50 100 50 Z";
  const pebble = st >= 1 ? "#7FD3C8" : "#9FB6CC";
  let o = `<path class="tail" style="transform-box:fill-box;transform-origin:0% 100%" d="M146 164 C178 164 192 140 184 118 C174 134 162 144 144 148 Z" fill="${b}"/><g class="body" style="transform-box:fill-box;transform-origin:50% 100%"><path d="${bodyD}" fill="${b}"/><path d="M100 98 C126 98 138 116 136 140 C134 166 120 178 100 178 C80 178 66 166 64 140 C62 116 74 98 100 98 Z" fill="${c}"/>` + shade(bodyD) + `<circle cx="55" cy="80" r="8" fill="${b}"/><circle cx="55" cy="80" r="4" fill="#E2B392"/><circle cx="145" cy="80" r="8" fill="${b}"/><circle cx="145" cy="80" r="4" fill="#E2B392"/>` + headwear(80, hat);
  if (st >= 2 && !hat) o += `<g transform="translate(140 66)"><circle r="5" cx="0" cy="-7" fill="#FFB3C7"/><circle r="5" cx="7" cy="0" fill="#FFB3C7"/><circle r="5" cx="0" cy="7" fill="#FFB3C7"/><circle r="5" cx="-7" cy="0" fill="#FFB3C7"/><circle r="4" fill="#FFD25E"/></g>`;
  o += eyes(e, 80, 120, 102) + `<ellipse cx="91" cy="123" rx="12" ry="9" fill="#fff" opacity=".55"/><ellipse cx="109" cy="123" rx="12" ry="9" fill="#fff" opacity=".55"/><path d="M93 114 Q100 110 107 114 Q106 120 100 121 Q94 120 93 114 Z" fill="${d}"/><path d="M76 120 L60 117 M76 125 L60 126" stroke="${d}" stroke-width="1.6" opacity=".45" stroke-linecap="round"/><path d="M124 120 L140 117 M124 125 L140 126" stroke="${d}" stroke-width="1.6" opacity=".45" stroke-linecap="round"/>` + cheeks(64, 136, 112) + mouth(e, 100, 127) + `<ellipse cx="100" cy="160" rx="17" ry="11" fill="${pebble}"/><ellipse cx="94" cy="156" rx="6" ry="3" fill="#fff" opacity=".5"/><ellipse cx="85" cy="155" rx="8" ry="6" fill="${b}"/><ellipse cx="115" cy="155" rx="8" ry="6" fill="${b}"/><ellipse cx="80" cy="180" rx="13" ry="6" fill="${d}" opacity=".85"/><ellipse cx="120" cy="180" rx="13" ry="6" fill="${d}" opacity=".85"/></g>` + sleepZ(e, 160, 62);
  return shadow() + o;
}
function lumi(e, hat, st, glow) {
  const g = nid("lg");
  const op = glow != null ? glow : ({ felice: 0.95, normale: 0.7, assonnato: 0.3 }[e]);
  const bodyD = "M100 62 C138 62 156 92 156 124 C156 158 132 180 100 180 C68 180 44 158 44 124 C44 92 62 62 100 62 Z";
  const tip = st >= 2 ? 8 : 6;
  const ant = "#3E3A6B";
  return `<defs><radialGradient id="${g}" cx="50%" cy="55%" r="50%"><stop offset="0%" stop-color="#FFE7A0" stop-opacity="1"/><stop offset="100%" stop-color="#FFE7A0" stop-opacity="0"/></radialGradient></defs><circle class="glow" cx="100" cy="122" r="${st >= 1 ? 98 : 90}" fill="url(#${g})" opacity="${op}"/>` + shadow() + `<g class="body" style="transform-box:fill-box;transform-origin:50% 100%"><g class="wings" style="transform-box:fill-box;transform-origin:center"><path d="M70 92 C40 60 14 70 20 92 C26 112 56 112 72 102 Z" fill="#DDE2FF" opacity=".9" stroke="#9EA6E6" stroke-width="2"/><path d="M130 92 C160 60 186 70 180 92 C174 112 144 112 128 102 Z" fill="#DDE2FF" opacity=".9" stroke="#9EA6E6" stroke-width="2"/><path d="M60 88 C44 78 32 82 30 90" stroke="#9EA6E6" stroke-width="1.5" fill="none" opacity=".7"/><path d="M140 88 C156 78 168 82 170 90" stroke="#9EA6E6" stroke-width="1.5" fill="none" opacity=".7"/></g><path d="${bodyD}" fill="#FFCD70"/><path d="M62 142 C70 168 86 178 100 178 C114 178 130 168 138 142 C124 150 76 150 62 142 Z" fill="#FFF4C2" opacity="${Math.max(op, 0.35)}"/><path d="M62 142 C76 150 124 150 138 142" stroke="#E5A33A" stroke-width="2.5" fill="none" stroke-linecap="round"/>` + shade(bodyD) + `<ellipse cx="80" cy="178" rx="12" ry="6" fill="#F2B33D"/><ellipse cx="120" cy="178" rx="12" ry="6" fill="#F2B33D"/>` + headwear(88, hat) + `<path d="M86 66 C80 48 72 40 64 38" stroke="${ant}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M114 66 C120 48 128 40 136 38" stroke="${ant}" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="63" cy="37" r="${tip}" fill="#FFC94D"/><circle cx="137" cy="37" r="${tip}" fill="#FFC94D"/>` + (st >= 2 ? `<circle cx="63" cy="37" r="14" fill="#FFE7A0" opacity=".45"/><circle cx="137" cy="37" r="14" fill="#FFE7A0" opacity=".45"/>` : "") + eyes(e, 80, 120, 112) + cheeks(66, 134, 126, "#F59A7A") + mouth(e, 100, 124) + `</g>` + sleepZ(e, 162, 64);
}
function petInner(pet, e, hat, st, glow) { return pet === "ondi" ? ondi(e, hat, st) : pet === "lumi" ? lumi(e, hat, st, glow) : germo(e, hat, st); }
function petSVG(pet, e, hat, st, label) { return `<svg viewBox="0 0 200 200" role="img" aria-label="${esc(label)}">${petInner(pet, e, hat, st)}</svg>`; }

/* --- Stanza illustrata a strati --- */
const SKY = { morning: ["#F9D9B8", "#BFE0F2"], day: ["#9FD3F1", "#D9EEF8"], evening: ["#F2A07A", "#F7D69A"], night: ["#1D2A4D", "#3B4A78"] };
const SEASON_HILL = { autumn: ["#D9A05B", "#C98A45"], winter: ["#EEF3F8", "#DCE5EF"], spring: ["#9CC58C", "#86B878"], summer: ["#B9CF6A", "#A2BD58"] };
function windowParticles(season, night) {
  let o = "";
  const R = (k) => ((k * 9301 + 49297) % 233280) / 233280;
  for (let k = 0; k < 9; k++) {
    const x = 38 + R(k + 1) * 96, y = 46 + R(k + 7) * 76;
    if (season === "winter") o += `<circle class="wp" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.4 + R(k + 3) * 1.4).toFixed(1)}" fill="#fff" opacity=".95"/>`;
    else if (season === "autumn") o += `<ellipse class="wp" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.2" ry="1.8" fill="${["#E8742F", "#D9542F", "#F2B33D"][k % 3]}" transform="rotate(${k * 37} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    else if (season === "spring") o += `<ellipse class="wp" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.6" ry="1.6" fill="${k % 2 ? "#FFC2D4" : "#FFE1EA"}" transform="rotate(${k * 41} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    else if (k < 5) o += `<circle class="wp glint" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.4" fill="${night ? "#FFF6D6" : "#FFF3B0"}"/>`;
  }
  if (season === "summer" && !night) o += `<g class="wp fly" transform="translate(70 70)"><ellipse cx="-3" cy="0" rx="3.5" ry="2.6" fill="#F28AA6"/><ellipse cx="3" cy="0" rx="3.5" ry="2.6" fill="#F7A9C0"/><rect x="-.6" y="-3" width="1.2" height="6" rx=".6" fill="#5A3A2A"/></g>`;
  return o;
}
function sillDecor(season) {
  if (season === "autumn") return `<g><ellipse cx="96" cy="126" rx="10" ry="7.5" fill="#E8862F"/><ellipse cx="91" cy="126" rx="4" ry="7" fill="#F29A44"/><ellipse cx="101" cy="126" rx="4" ry="7" fill="#D9762A"/><path d="M96 119 q1 -4 4 -5" stroke="#6B8A3A" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="112" cy="129" rx="5" ry="3.5" fill="#B4703F"/></g>`;
  if (season === "winter") return `<g><rect x="90" y="114" width="9" height="15" rx="2" fill="#F6F1EA"/><path d="M94.5 106 q3 4 0 7 q-3 -3 0 -7" fill="#FFC94D"/><circle cx="94.5" cy="110" r="7" fill="#FFE7A0" opacity=".35"/><path d="M104 129 l3 -9 l3 9 z M106 124 l1 -3 l1 3 z" fill="#5E9A6A"/><rect x="106" y="127" width="2" height="3" fill="#8A6040"/></g>`;
  if (season === "spring") return `<g><path d="M90 118 L104 118 L102 130 L92 130 Z" fill="#9CC6E8"/><path d="M94 118 C94 108 92 104 90 102 M97 118 C97 106 99 102 101 100 M100 118 C101 110 104 106 106 104" stroke="#5FA35C" stroke-width="1.6" fill="none"/><ellipse cx="90" cy="101" rx="3.4" ry="4.2" fill="#F2789B"/><ellipse cx="101" cy="99" rx="3.4" ry="4.2" fill="#FFD25E"/><ellipse cx="106" cy="103" rx="3.4" ry="4.2" fill="#F7A9C0"/></g>`;
  return `<g><path d="M88 129 A10 10 0 0 1 108 129 Z" fill="#5FA35C"/><path d="M90 129 A8 8 0 0 1 106 129 Z" fill="#F0605A"/><circle cx="95" cy="126" r=".9" fill="#2F2A26"/><circle cx="99" cy="124" r=".9" fill="#2F2A26"/><circle cx="102" cy="127" r=".9" fill="#2F2A26"/><ellipse cx="114" cy="127" rx="4.5" ry="3" fill="#F7E6C4"/></g>`;
}
function roomSVG(opts) {
  const { ph, pet, e, hat, st, furn, wall, away, glow, season, dark } = opts;
  const TOP = opts.top || 0, BOT = opts.bot || 0; SCENE_TOP = TOP; const H = 300 + TOP + BOT, FR = `x="0" y="${-TOP}" width="360" height="${H}"`;
  const [w1, w2] = WALLS[wall] || WALLS.w_cream;
  const [s1, s2] = SKY[ph];
  const night = ph === "night", eve = ph === "evening";
  const skyId = nid("sky"), grainId = nid("gr"), lampId = nid("lp"), winClip = nid("wc"), lightId = nid("li"), floorId = nid("fl"), wallSh = nid("ws"), beamId = nid("bm"), vigId = nid("vg");
  const hill = SEASON_HILL[season] || SEASON_HILL.spring;
  const beamCol = night ? "#BFD0FF" : eve ? "#FFC58A" : "#FFF6DD";
  const beamOp = night ? 0.1 : eve ? 0.22 : 0.3;
  let o = `<svg viewBox="0 ${-TOP} 360 ${H}" role="img" aria-label="${esc(opts.label)}"><defs>
  <linearGradient id="${skyId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient>
  <radialGradient id="${lampId}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFE3A3" stop-opacity=".85"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
  <radialGradient id="${lightId}" cx="22%" cy="25%" r="70%"><stop offset="0" stop-color="#FFF6DD" stop-opacity="${night ? 0 : 0.35}"/><stop offset="1" stop-color="#FFF6DD" stop-opacity="0"/></radialGradient>
  <linearGradient id="${floorId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D2A472"/><stop offset="1" stop-color="#E2B887"/></linearGradient>
  <linearGradient id="${wallSh}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B3A1A" stop-opacity="0"/><stop offset="1" stop-color="#5B3A1A" stop-opacity=".16"/></linearGradient>
  <linearGradient id="${beamId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${beamCol}" stop-opacity="${beamOp}"/><stop offset="1" stop-color="${beamCol}" stop-opacity="0"/></linearGradient>
  <radialGradient id="${vigId}" cx="50%" cy="46%" r="72%"><stop offset=".62" stop-color="#2A1608" stop-opacity="0"/><stop offset="1" stop-color="#2A1608" stop-opacity="${night ? 0.38 : 0.2}"/></radialGradient>
  <filter id="${grainId}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .15  0 0 0 .09 0"/></filter>
  <clipPath id="${winClip}"><rect x="34" y="42" width="104" height="86" rx="10"/></clipPath>
  </defs>`;
  o += `<rect ${FR} fill="${w1}"/>`;
  const WS = (typeof WALL_STYLE !== "undefined" && WALL_STYLE[wall]) || "stripes";
  if (WS === "stripes" || WS === "stars") for (let x = 12; x < 360; x += 24) o += `<rect x="${x}" y="${-TOP}" width="8" height="${214 + TOP}" fill="${w2}" opacity=".7"/>`;
  else o += wallPattern(WS, w1, w2, TOP);
  const starWall = wall === "w_stars";
  if (WS === "stripes" || WS === "stars") for (let x = 24; x < 360; x += 48) for (let y = 20 - 44 * Math.ceil(TOP / 44); y < 140; y += 44) o += starWall ? `<path class="wstar" d="M${x} ${y - 3.2} L${x + 1} ${y - 1} L${x + 3.2} ${y} L${x + 1} ${y + 1} L${x} ${y + 3.2} L${x - 1} ${y + 1} L${x - 3.2} ${y} L${x - 1} ${y - 1} Z" fill="#FFE7A0" opacity=".85"/>` : `<circle cx="${x}" cy="${y}" r="2.2" fill="${w2}"/>`;
  o += `<rect x="0" y="152" width="360" height="54" fill="${w2}" opacity=".55"/><rect x="0" y="148" width="360" height="5" rx="2" fill="#fff" opacity=".35"/><rect x="0" y="152" width="360" height="2" fill="#5B3A1A" opacity=".12"/>`;
  for (let x = 10; x < 360; x += 70) o += `<rect x="${x}" y="162" width="56" height="34" rx="4" fill="none" stroke="#5B3A1A" stroke-opacity=".08" stroke-width="2"/>`;
  o += `<rect x="0" y="150" width="360" height="56" fill="url(#${wallSh})"/>`;
  /* finestra */
  o += `<rect x="28" y="36" width="116" height="98" rx="14" fill="#C79A6B"/><rect x="30" y="38" width="112" height="94" rx="12" fill="#B5875A" opacity=".35"/><g clip-path="url(#${winClip})"><rect x="34" y="42" width="104" height="86" fill="url(#${skyId})"/>`;
  if (night) { o += `<circle cx="112" cy="66" r="11" fill="#F8F1D4"/><circle cx="117" cy="62" r="10" fill="${s1}"/><circle cx="112" cy="66" r="20" fill="#F8F1D4" opacity=".08"/>`; [[50, 58], [70, 74], [92, 52], [60, 98], [126, 92], [84, 106], [130, 50]].forEach(([x, y], i) => { o += `<circle class="star" cx="${x}" cy="${y}" r="${i % 2 ? 1.3 : 1.8}" fill="#FFF6D6"/>`; }); }
  else { const sy = ph === "morning" ? 96 : ph === "day" ? 62 : 104; o += `<circle cx="${eve ? 112 : 106}" cy="${sy}" r="22" fill="${eve ? "#FFB36B" : "#FFE48A"}" opacity=".25"/><circle cx="${eve ? 112 : 106}" cy="${sy}" r="13" fill="${eve ? "#FFB36B" : "#FFE48A"}"/><g class="cloud"><ellipse cx="64" cy="76" rx="16" ry="8" fill="#fff" opacity=".9"/><ellipse cx="76" cy="72" rx="12" ry="9" fill="#fff" opacity=".9"/></g><g class="cloud2"><ellipse cx="118" cy="104" rx="13" ry="6" fill="#fff" opacity=".8"/></g>`; }
  const hc = night ? (season === "winter" ? ["#8E9CB8", "#7C8AA8"] : ["#2C3A52", "#26334A"]) : hill;
  o += `<path d="M34 108 C56 100 76 106 96 101 C116 96 128 102 138 100 L138 128 L34 128 Z" fill="${hc[1]}"/><path d="M34 116 C60 104 84 114 108 106 C122 102 132 108 138 110 L138 128 L34 128 Z" fill="${hc[0]}"/>`;
  if (season === "spring" && !night) [[46, 120], [62, 116], [80, 121], [100, 114], [118, 119], [130, 116]].forEach(([x, y], k) => { o += `<circle cx="${x}" cy="${y}" r="1.6" fill="${k % 2 ? "#FFC2D4" : "#FFF"}"/>`; });
  if (season === "autumn" && !night) o += `<g><rect x="56" y="104" width="2.5" height="10" fill="#7A5A3A"/><circle cx="57" cy="101" r="7" fill="#E07A35"/><rect x="118" y="100" width="2.5" height="10" fill="#7A5A3A"/><circle cx="119" cy="97" r="6" fill="#D9542F"/></g>`;
  o += `<g class="wpg">${windowParticles(season, night)}</g></g>`;
  o += `<rect x="83" y="42" width="6" height="86" fill="#C79A6B"/><rect x="34" y="82" width="104" height="6" fill="#C79A6B"/><rect x="34" y="42" width="104" height="5" fill="#000" opacity=".06"/><rect x="24" y="130" width="124" height="10" rx="4" fill="#B5875A"/><rect x="24" y="138" width="124" height="3" rx="1.5" fill="#8E6440" opacity=".5"/>`;
  if (opts.friend) o += `<g id="friendWrap" transform="translate(58 66) scale(.34)"><g id="friendInner">${petInner(opts.friend, "felice", null, 0)}</g></g>`; else o += sillDecor(season);
  const [cc1, cc2, cdots] = curtainColors(furn);
  o += `<path d="M22 30 L58 30 C52 70 46 100 52 132 L22 132 Z" fill="${cc1}"/><path d="M150 30 L114 30 C120 70 126 100 120 132 L150 132 Z" fill="${cc1}"/>${cdots ? [[32, 50], [42, 72], [30, 96], [44, 116], [140, 50], [130, 72], [142, 96], [128, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${cc2}"/>`).join("") : ""}<path d="M30 30 C28 70 30 104 34 132" stroke="${cc2}" stroke-width="1.6" fill="none" opacity=".7"/><path d="M142 30 C144 70 142 104 138 132" stroke="${cc2}" stroke-width="1.6" fill="none" opacity=".7"/><path d="M22 30 L58 30 C52 70 46 100 52 132" fill="none" stroke="${cc2}" stroke-width="2"/><path d="M150 30 L114 30 C120 70 126 100 120 132" fill="none" stroke="${cc2}" stroke-width="2"/><rect x="16" y="24" width="140" height="8" rx="4" fill="#8E6440"/><circle cx="16" cy="28" r="5" fill="#8E6440"/><circle cx="156" cy="28" r="5" fill="#8E6440"/>`;
  if (furn.includes("lights")) { o += `<path d="M170 18 Q215 40 260 18 Q305 40 350 18" stroke="#6B5A47" stroke-width="1.5" fill="none"/>`; [[184, 26, "#FFB36B"], [200, 32, "#9EE3C5"], [215, 34, "#FFD25E"], [231, 31, "#F9A3C0"], [246, 24, "#9CC8F7"], [274, 26, "#FFB36B"], [290, 32, "#9EE3C5"], [305, 34, "#FFD25E"], [321, 31, "#F9A3C0"], [336, 24, "#9CC8F7"]].forEach(([x, y, c]) => { o += `<circle class="bulb" cx="${x}" cy="${y}" r="4" fill="${c}"/>` + (night || eve ? `<circle cx="${x}" cy="${y}" r="10" fill="${c}" opacity=".25"/>` : ""); }); }
  o += furnAlt("ceiling", furn, night || eve);
  o += furnAlt("wallart", furn, night || eve);
  if (furn.includes("frame")) o += `<g transform="translate(176 58)"><rect x="2" y="3" width="62" height="48" rx="5" fill="#000" opacity=".1"/><rect width="62" height="48" rx="5" fill="#9A6B43"/><rect x="5" y="5" width="52" height="38" rx="2" fill="#CFE7F1"/><path d="M5 34 L20 20 L32 32 L42 24 L57 36 L57 43 L5 43 Z" fill="#8DBE86"/><circle cx="46" cy="14" r="4" fill="#FFD25E"/></g>`;
  if (furn.includes("clock")) {
    const now = new Date(); const hA = ((now.getHours() % 12) + now.getMinutes() / 60) * 30, mA = now.getMinutes() * 6;
    o += `<g transform="translate(292 60)"><circle r="18" cx="1.5" cy="2.5" fill="#000" opacity=".1"/><circle r="18" fill="#9A6B43"/><circle r="14.5" fill="#FFF8EA"/>${[0, 90, 180, 270].map((a) => `<rect x="-1" y="-12.5" width="2" height="3.5" fill="#9A6B43" transform="rotate(${a})"/>`).join("")}<rect x="-1.3" y="-8" width="2.6" height="8.5" rx="1.3" fill="${INK}" transform="rotate(${hA})"/><rect x="-1" y="-11.5" width="2" height="12" rx="1" fill="${INK}" transform="rotate(${mA})"/><circle r="1.8" fill="#E2654F"/></g>`;
  }
  if (furn.includes("shelf")) o += `<g transform="translate(258 92)"><rect x="2" y="25" width="84" height="7" rx="3" fill="#000" opacity=".08"/><rect x="0" y="22" width="84" height="7" rx="3" fill="#9A6B43"/><rect x="6" y="2" width="10" height="20" rx="2" fill="#E2654F"/><rect x="18" y="5" width="9" height="17" rx="2" fill="#7AA3DC"/><rect x="29" y="0" width="11" height="22" rx="2" fill="#F2C063"/><ellipse cx="56" cy="17" rx="8" ry="5.5" fill="#9FB6CC"/><ellipse cx="72" cy="18" rx="6" ry="4" fill="#C7B6A0"/><path d="M12 29 L10 38 M74 29 L76 38" stroke="#7E5534" stroke-width="3" stroke-linecap="round"/></g>`;
  o += furnAlt("shelf", furn, night || eve);
  if (furn.includes("fishbowl")) o += `<g><rect x="240" y="196" width="54" height="6" rx="3" fill="#9A6B43"/><rect x="242" y="200" width="54" height="3" rx="1.5" fill="#000" opacity=".08"/><circle cx="267" cy="180" r="16" fill="#CDEBF7" opacity=".9"/><path d="M252 176 Q267 172 282 176 L282 182 Q281 193 267 196 Q253 193 252 182 Z" fill="#7CC6E6" opacity=".75"/><ellipse cx="267" cy="165" rx="9" ry="2.6" fill="#E9F7FC" stroke="#A9D6E8" stroke-width="1.2"/><g class="fishg"><ellipse cx="265" cy="184" rx="5.5" ry="3.6" fill="#F08A3C"/><path d="M270 184 l5 -3.5 l0 7 Z" fill="#F2A65A"/><circle cx="262.5" cy="183" r=".9" fill="#2F2A26"/></g><circle class="bub" cx="261" cy="178" r="1.4" fill="#fff" opacity=".85"/><circle class="bub" cx="263" cy="172" r="1" fill="#fff" opacity=".85"/><path d="M257 172 q-2 6 1 12" stroke="#fff" stroke-width="1.6" opacity=".55" fill="none" stroke-linecap="round"/><path d="M262 196 h10 v3 h-10 Z" fill="#6FAE5E"/></g>`;
  /* pavimento */
  o += `<rect x="0" y="206" width="360" height="${94 + BOT}" fill="url(#${floorId})"/><rect x="0" y="204" width="360" height="9" fill="#B98A5C"/><rect x="0" y="204" width="360" height="2" fill="#fff" opacity=".25"/>`;
  for (let y = 228; y < 300 + BOT; y += 16) o += `<line x1="0" y1="${y}" x2="360" y2="${y}" stroke="#C4945F" stroke-width="2" opacity=".8"/>`;
  for (let r = 0, y = 213; y < 300 + BOT; y += 16, r++) for (let x = (r % 2) * 40 + 20; x < 360; x += 80) o += `<line x1="${x}" y1="${y}" x2="${x}" y2="${Math.min(y + 15, 300 + BOT)}" stroke="#C4945F" stroke-width="2" opacity=".8"/>`;
  o += `<rect x="0" y="213" width="360" height="22" fill="#5B3A1A" opacity=".07"/>`;
  o += `<path d="M38 140 L134 140 L250 300 L58 300 Z" fill="url(#${beamId})"/>`;
  o += `<path d="M70 222 L176 222 L236 296 L120 296 Z" fill="#FFF6DD" opacity="${night ? 0 : eve ? 0.08 : 0.14}"/><rect x="0" y="${-TOP}" width="22" height="${H}" fill="#3A2510" opacity=".05"/><rect x="338" y="${-TOP}" width="22" height="${H}" fill="#3A2510" opacity=".05"/>`;
  if (BOT || TOP) o += sceneExtra(opts, TOP, BOT, night || eve);
  o += furnAlt("rug", furn, night || eve);
  if (furn.includes("rug")) o += `<ellipse cx="183" cy="273" rx="122" ry="24" fill="#5B3A1A" opacity=".12"/><ellipse cx="180" cy="268" rx="122" ry="24" fill="#C86E5A"/><ellipse cx="180" cy="268" rx="104" ry="17" fill="none" stroke="#F2D3A3" stroke-width="4" stroke-dasharray="2 8" stroke-linecap="round"/><ellipse cx="180" cy="268" rx="84" ry="12" fill="#D9846F"/>`;
  if (furn.includes("lamp")) { if (night || eve) o += `<circle cx="44" cy="170" r="${night ? 74 : 52}" fill="url(#${lampId})"/>`; o += `<g><ellipse cx="46" cy="261" rx="19" ry="5" fill="#000" opacity=".12"/><rect x="41" y="160" width="5" height="96" fill="#6B5A47"/><ellipse cx="44" cy="258" rx="17" ry="5" fill="#6B5A47"/><path d="M26 162 L62 162 L54 136 L34 136 Z" fill="${night || eve ? "#FFE3A3" : "#F2D5A0"}" stroke="#D9B276" stroke-width="2"/></g>`; }
  o += furnAlt("lamp", furn, night || eve, lampId);
  o += furnAlt("floorL", furn, night || eve);
  if (furn.includes("pouf")) o += `<g><ellipse cx="98" cy="268" rx="27" ry="6" fill="#000" opacity=".12"/><path d="M72 250 C72 238 122 238 122 250 L122 258 C122 270 72 270 72 258 Z" fill="#7FB0D6"/><ellipse cx="97" cy="249" rx="25" ry="8" fill="#9CC4E4"/><path d="M80 252 C88 258 106 258 114 252" stroke="#6A9CC4" stroke-width="1.6" fill="none"/><circle cx="97" cy="249" r="2.2" fill="#6A9CC4"/></g>`;
  if (furn.includes("teddy")) o += `<g><ellipse cx="256" cy="265" rx="18" ry="4.5" fill="#000" opacity=".12"/><circle cx="246" cy="230" r="5" fill="#B57E4E"/><circle cx="262" cy="230" r="5" fill="#B57E4E"/><circle cx="246" cy="230" r="2.4" fill="#E9C39A"/><circle cx="262" cy="230" r="2.4" fill="#E9C39A"/><ellipse cx="254" cy="253" rx="13" ry="13" fill="#C98F5E"/><ellipse cx="254" cy="256" rx="7.5" ry="8" fill="#E9C39A"/><ellipse cx="242" cy="250" rx="4.5" ry="7" fill="#B57E4E" transform="rotate(25 242 250)"/><ellipse cx="266" cy="250" rx="4.5" ry="7" fill="#B57E4E" transform="rotate(-25 266 250)"/><ellipse cx="246" cy="264" rx="5.5" ry="4" fill="#B57E4E"/><ellipse cx="262" cy="264" rx="5.5" ry="4" fill="#B57E4E"/><circle cx="254" cy="237" r="10.5" fill="#C98F5E"/><ellipse cx="254" cy="241" rx="5" ry="3.8" fill="#E9C39A"/><ellipse cx="254" cy="239.5" rx="1.8" ry="1.3" fill="#3A2A20"/><circle cx="250" cy="235" r="1.3" fill="#3A2A20"/><circle cx="258" cy="235" r="1.3" fill="#3A2A20"/><path d="M249 246 l5 2.5 l5 -2.5 l0 5 l-5 -2.5 l-5 2.5 Z" fill="#E2654F"/></g>`;
  o += furnAlt("floorR", furn, night || eve);
  o += furnAlt("plant", furn, night || eve);
  if (furn.includes("plant")) o += `<ellipse cx="322" cy="250" rx="22" ry="5" fill="#000" opacity=".12"/><g class="plantg" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M318 212 C296 196 290 174 298 160 C310 172 318 190 318 212 Z" fill="#6DB36A"/><path d="M322 212 C344 194 350 170 340 156 C328 170 322 190 322 212 Z" fill="#7FC27B"/><path d="M320 212 C314 186 318 164 326 148 C332 168 328 190 320 212 Z" fill="#5FA35C"/></g><path d="M300 212 L340 212 L334 246 C334 250 306 250 306 246 Z" fill="#D98A63"/><rect x="298" y="208" width="44" height="9" rx="4" fill="#C77650"/>`;
  o += `<rect ${FR} fill="url(#${lightId})"/>`;
  if (!away) o += `<g id="petWrap" transform="translate(102 108) scale(.78)"><g id="petInner">${petInner(pet, e, hat, st, glow)}</g></g>`;
  else { o += `<ellipse cx="180" cy="260" rx="42" ry="9" fill="#000" opacity=".1"/><ellipse cx="180" cy="258" rx="40" ry="10" fill="#E9C9A0"/><ellipse cx="180" cy="252" rx="34" ry="12" fill="#F3DDB9"/>`; [[226, 262], [252, 254], [278, 264], [304, 256], [330, 266]].forEach(([x, y], k) => { o += `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4" fill="#A9784E" opacity="${0.55 - k * 0.08}"/>`; }); }
  if (night) o += `<rect ${FR} fill="#16204A" opacity=".28"/>`;
  if (dark) { o += `<rect ${FR} fill="#0B1030" opacity=".55"/>`; if (furn.includes("lamp")) o += `<circle cx="44" cy="170" r="60" fill="url(#${lampId})" opacity=".55"/>`; if (furn.includes("lamp_moon") || furn.includes("lamp_lava")) o += `<circle cx="45" cy="214" r="54" fill="url(#${lampId})" opacity=".6"/>`; if (furn.includes("lanterns")) [200, 262, 324].forEach((x) => { o += `<circle cx="${x}" cy="50" r="22" fill="url(#${lampId})" opacity=".55"/>`; }); for (let i = 0; i < 7; i++) o += `<circle class="star" cx="${30 + i * 48}" cy="${40 + (i % 3) * 30}" r="1.4" fill="#FFF6D6" opacity=".8"/>`; }
  if (eve) o += `<rect ${FR} fill="#E9894F" opacity=".08"/>`;
  if (night) for (let i = 0; i < 6; i++) o += `<circle class="mote" cx="${60 + i * 50}" cy="${150 + (i % 3) * 20}" r="1.8" fill="#FFE7A0" opacity=".8"/>`;
  else for (let i = 0; i < 6; i++) o += `<circle class="mote" cx="${48 + i * 26}" cy="${170 + (i % 3) * 18}" r="1.3" fill="#FFF8E5" opacity=".75"/>`;
  o += `<rect ${FR} fill="url(#${vigId})"/><rect ${FR} filter="url(#${grainId})"/></svg>`;
  return o;
}
function giftSVG() { return `<svg viewBox="0 0 60 60" aria-hidden="true"><ellipse cx="30" cy="54" rx="22" ry="4" fill="#3A2510" opacity=".18"/><rect x="8" y="24" width="44" height="30" rx="5" fill="#E2654F"/><rect x="8" y="44" width="44" height="10" rx="5" fill="#000" opacity=".08"/><rect x="5" y="16" width="50" height="12" rx="4" fill="#F07A63"/><rect x="26" y="16" width="8" height="38" fill="#FFD25E"/><path d="M30 16 C22 4 10 8 16 15 C20 18 26 17 30 16 C34 17 40 18 44 15 C50 8 38 4 30 16 Z" fill="#FFD25E"/><path d="M12 19 h12" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/></svg>`; }
const SEED = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10.6" r="8.6" fill="#C98424"/><circle cx="10" cy="10" r="8.6" fill="#F2B33D"/><circle cx="10" cy="10" r="6.6" fill="#FFD27A"/><path d="M10 14.2 V9.6" stroke="#B0701A" stroke-width="1.5" stroke-linecap="round"/><path d="M10 10.4 C7.6 10.6 6.2 9 6.2 7.2 C8.4 7 9.9 8.3 10 10.4 Z" fill="#7FB04A"/><path d="M10 9.4 C10.2 7.2 11.8 5.8 13.9 6 C14 8.1 12.3 9.6 10 9.4 Z" fill="#94C45A"/><path d="M5.2 7.4 A5.6 5.6 0 0 1 8.4 4.6" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/></svg>`;
const STAR = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5 L12.6 7 L18.5 7.6 L14 11.6 L15.3 17.5 L10 14.5 L4.7 17.5 L6 11.6 L1.5 7.6 L7.4 7 Z" fill="#E9A23B"/></svg>`;
const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="19" r="10" fill="#A8DBA1"/><path d="M16 10 C16 7 16.5 5 17.5 3" stroke="#5A985A" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M17 4.5 C12 -1 6 1 5 4.5 C9 8 14 8 17 4.5 Z" fill="#76BF72"/><path d="M17.5 3.5 C22 -1.5 28 0 28.5 3.5 C25 7.5 20 7.5 17.5 3.5 Z" fill="#8ED089"/><circle cx="12.5" cy="18" r="1.6" fill="${INK}"/><circle cx="19.5" cy="18" r="1.6" fill="${INK}"/><path d="M14 21.5 Q16 23.5 18 21.5" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`;

/* --- Cartoline dei mondi fantastici --- */
function postcard(dest, i, label) {
  const g = nid("pc");
  const P = { forest: ["#CFE8D2", "#F6E9C8"], lake: ["#BFE1F4", "#F3E9D8"], hill: ["#D6EEF6", "#FBF0D2"], mountain: ["#C9D8F0", "#EEF3FA"], city: ["#2A3360", "#5C4A7A"] }[dest];
  let o = `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label)}"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset="1" stop-color="${P[1]}"/></linearGradient></defs><rect width="160" height="100" fill="url(#${g})"/>`;
  if (dest === "forest") {
    o += `<path d="M0 78 Q40 66 80 74 T160 70 V100 H0 Z" fill="#8CC48A"/>`;
    [[22, 60, 16], [54, 54, 20], [96, 58, 17], [132, 52, 21]].forEach(([x, y, r], k) => { o += `<rect x="${x - 2}" y="${y}" width="4" height="${r + 8}" fill="#8A6040"/><circle cx="${x}" cy="${y}" r="${r}" fill="${k % 2 ? "#4F9A5A" : "#62AD66"}"/><circle cx="${x - r / 3}" cy="${y - r / 3}" r="${r / 3}" fill="#fff" opacity=".12"/>`; });
    if (i === 0) o += `<path d="M76 88 Q80 78 84 88 Z" fill="#E2654F"/><rect x="79" y="88" width="2" height="6" fill="#F3E3D3"/><circle cx="78.5" cy="84.5" r=".9" fill="#fff"/><circle cx="81.5" cy="85.5" r=".7" fill="#fff"/>`;
    if (i === 1) o += `<ellipse cx="112" cy="90" rx="5" ry="4" fill="#B07A3C"/><ellipse cx="122" cy="91" rx="4" ry="3.5" fill="#B07A3C"/><path d="M107 88 h10 M118 89 h8" stroke="#7A5428" stroke-width="2"/>`;
    if (i === 2) [[40, 40], [70, 30], [110, 36], [140, 44], [86, 48]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="2.4" fill="#FFE27A"/><circle cx="${x}" cy="${y}" r="6" fill="#FFE27A" opacity=".3"/>`; });
  } else if (dest === "lake") {
    o += `<circle cx="${i === 2 ? 80 : 124}" cy="34" r="12" fill="#FFE08A"/><path d="M0 60 Q30 54 60 60 T120 58 T160 60 V100 H0 Z" fill="#7FB6DA"/><path d="M0 64 Q40 58 80 64 T160 62" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>`;
    for (let k = 0; k < 4; k++) o += `<path d="M${20 + k * 34} ${76 + (k % 2) * 8} q6 -3 12 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".7"/>`;
    o += `<path d="M8 100 L10 70 M14 100 L18 74 M20 100 L20 72" stroke="#5E8A4A" stroke-width="2.5" stroke-linecap="round"/>`;
    if (i === 0) o += `<circle cx="70" cy="70" r="3" fill="#fff" opacity=".9"/><circle cx="86" cy="68" r="2.5" fill="#fff" opacity=".8"/><circle cx="100" cy="70" r="2" fill="#fff" opacity=".7"/>`;
    if (i === 1) o += `<path d="M90 72 Q100 64 112 72 Z" fill="#7CC07A"/><path d="M100 72 L100 64" stroke="#5E8A4A" stroke-width="1.5"/>`;
    if (i === 2) o += `<ellipse cx="80" cy="80" rx="10" ry="3" fill="#FFE08A" opacity=".55"/>`;
  } else if (dest === "hill") {
    o += `<circle cx="34" cy="28" r="11" fill="#FFE08A"/><path d="M0 70 Q50 40 100 62 T160 56 V100 H0 Z" fill="#92CC7E"/><path d="M0 84 Q60 66 160 80 V100 H0 Z" fill="#7DBD6C"/>`;
    for (let k = 0; k < 10; k++) o += `<circle cx="${10 + k * 15}" cy="${86 + (k % 3) * 4}" r="2" fill="#E9F7DF"/>`;
    if (i === 0) o += `<g transform="translate(80 80)"><circle cx="-3" cy="-3" r="3.4" fill="#4E9A4A"/><circle cx="3" cy="-3" r="3.4" fill="#4E9A4A"/><circle cx="-3" cy="3" r="3.4" fill="#4E9A4A"/><circle cx="3" cy="3" r="3.4" fill="#4E9A4A"/></g>`;
    if (i === 1) o += `<path d="M96 58 q10 6 6 16 q-4 8 4 14" stroke="#fff" stroke-width="1.6" fill="none" stroke-dasharray="2 3" opacity=".8"/>`;
    if (i === 2) o += `<path d="M120 20 L132 32 L120 44 L108 32 Z" fill="#E2654F"/><path d="M120 20 L120 44 M108 32 L132 32" stroke="#C8503B" stroke-width="1"/><path d="M120 44 Q114 60 124 74" stroke="#6B5A47" stroke-width="1" fill="none"/>`;
  } else if (dest === "mountain") {
    o += `<path d="M0 90 L40 34 L70 70 L100 22 L160 90 Z" fill="#8FA3C6"/><path d="M100 22 L160 90 L118 90 Z" fill="#7488AE" opacity=".6"/><path d="M40 34 L50 48 L44 46 L36 50 Z M100 22 L114 40 L104 37 L94 42 Z" fill="#fff"/>`;
    o += `<ellipse cx="${i === 0 ? 80 : 40}" cy="72" rx="34" ry="9" fill="#fff" opacity=".9"/><ellipse cx="130" cy="80" rx="26" ry="7" fill="#fff" opacity=".85"/><rect x="0" y="88" width="160" height="12" fill="#B7C6DE"/>`;
    if (i === 1) o += `<ellipse cx="60" cy="86" rx="7" ry="5" fill="#F3EDE4"/><circle cx="54" cy="82" r="3.5" fill="#F3EDE4"/><path d="M52 79 l-2 -3 M55 79 l1 -3" stroke="#A89A88" stroke-width="1" stroke-linecap="round"/>`;
    if (i === 2) o += `<path d="M98 16 q4 -4 8 0 M94 12 q8 -8 16 0" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  } else {
    for (let k = 0; k < 12; k++) o += `<circle cx="${(k * 37) % 160}" cy="${(k * 23) % 40 + 6}" r="1.2" fill="#FFF6D6"/>`;
    o += `<path d="M0 100 V62 H18 V50 H34 V66 H52 V44 H70 V60 H88 V40 H100 V30 H108 V40 H120 V58 H140 V48 H160 V100 Z" fill="#1B1F3E"/>`;
    [[26, 58], [60, 54], [80, 70], [112, 50], [130, 66], [148, 60], [44, 74]].forEach(([x, y]) => { o += `<rect x="${x}" y="${y}" width="5" height="6" rx="1" fill="#FFD27A"/>`; });
    o += `<path d="M0 34 Q40 44 80 36 T160 38" stroke="#6B5A47" stroke-width="1" fill="none"/>`;
    [[16, 37], [40, 40], [64, 38], [96, 37], [124, 39], [148, 38]].forEach(([x, y], k) => { o += `<ellipse cx="${x}" cy="${y + 5}" rx="4" ry="5" fill="${["#FF9F6B", "#FFD25E", "#F9A3C0"][k % 3]}"/><circle cx="${x}" cy="${y + 5}" r="9" fill="#FFD25E" opacity=".15"/>`; });
    if (i === 1) o += `<rect x="70" y="82" width="22" height="18" fill="#2A2F55"/><rect x="74" y="86" width="14" height="8" rx="1" fill="#FFB36B"/>`;
    if (i === 2) o += `<circle cx="104" cy="35" r="3" fill="#FFF6D6"/>`;
  }
  return o + `</svg>`;
}

/* --- Cartoline dei luoghi veri --- */
function grad(id, a, b) { return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`; }
function realArt(art, label) {
  const g = nid("rp"), w = nid("rw");
  const SKIES = {
    venezia: ["#FBD9B5", "#BFE0F2"], dolomiti: ["#F6C3B0", "#C8B4E3"], cinqueterre: ["#BFE3F5", "#F4EDE0"], roma: ["#F9E0B8", "#CFE6F2"],
    neuschwanstein: ["#C9E2F5", "#EEF5FA"], schwarzwald: ["#DDE9E0", "#F3F0E2"], bodensee: ["#CFE6F7", "#F7F2E6"], berlin: ["#F7D8B0", "#CFE2F2"],
    sevilla: ["#CFE7F7", "#FBEFD9"], granada: ["#FCD9B8", "#BFD9EF"], barcelona: ["#BFE3F7", "#F8EAD0"], tenerife: ["#9FD0F0", "#E3F2FA"],
    london: ["#D7E6F2", "#F3EEE4"], highlands: ["#C9DCEB", "#EEF3F2"], newyork: ["#F7C9A0", "#9FC3E8"], grandcanyon: ["#FAD3A3", "#F6A97A"],
    paris: ["#FBE3CF", "#D3E6F4"], montsaintmichel: ["#F4E3D0", "#CFE0EE"], provence: ["#CFE4F5", "#FCEBD0"], chamonix: ["#9FCDEB", "#E8F3FA"],
    rio: ["#BFE3F7", "#FBE7CF"], amazonia: ["#CFEAD8", "#F5F2DD"], lencois: ["#9FD6F2", "#EAF6FB"], iguacu: ["#BFE3F5", "#EAF6F3"]
  };
  const sk = SKIES[art] || ["#CFE6F7", "#F7F2E6"];
  let o = `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label)}"><defs>${grad(g, sk[0], sk[1])}${grad(w, "#5FB0D9", "#3E8CC0")}</defs><rect width="160" height="100" fill="url(#${g})"/>`;
  const sun = (x, y, r, c = "#FFE08A") => `<circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="${c}" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
  const waves = (y0, n = 5, col = "#fff") => { let s = ""; for (let k = 0; k < n; k++) s += `<path d="M${10 + k * 30 + (k % 2) * 8} ${y0 + (k % 3) * 6} q5 -3 10 0" stroke="${col}" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/>`; return s; };
  const pine = (x, y, h, c = "#3F6E55") => `<path d="M${x} ${y - h} L${x + h * 0.38} ${y} L${x - h * 0.38} ${y} Z" fill="${c}"/><rect x="${x - 1}" y="${y}" width="2" height="3" fill="#6B4A30"/>`;
  const cypress = (x, y, h) => `<ellipse cx="${x}" cy="${y - h / 2}" rx="${h * 0.14}" ry="${h / 2}" fill="#3F6B40"/>`;
  const palm = (x, y, h) => `<path d="M${x} ${y} Q${x + 3} ${y - h / 2} ${x + 1} ${y - h}" stroke="#8A6040" stroke-width="2.2" fill="none"/><path d="M${x + 1} ${y - h} q-10 -2 -14 6 M${x + 1} ${y - h} q10 -3 14 5 M${x + 1} ${y - h} q-4 -8 -12 -8 M${x + 1} ${y - h} q6 -8 13 -6" stroke="#4E9A4A" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (typeof REAL_ART2 !== "undefined" && REAL_ART2[art]) { const sk2 = (REAL_SKY2[art] || sk); return `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label)}"><defs>${grad(g, sk2[0], sk2[1])}${grad(w, "#5FB0D9", "#3E8CC0")}</defs><rect width="160" height="100" fill="url(#${g})"/>` + REAL_ART2[art]({ sun, waves, pine, cypress, palm, water: `url(#${w})`, sky: sk2 }) + `</svg>`; }
  switch (art) {
    case "venezia":
      o += sun(122, 22, 8) + `<rect x="0" y="76" width="160" height="24" fill="url(#${w})"/>` + waves(84);
      o += `<rect x="52" y="44" width="56" height="32" fill="#EED9B7"/><path d="M50 44 L80 34 L110 44 Z" fill="#C8734E"/>`;
      o += `<rect x="0" y="22" width="30" height="54" fill="#E59866"/><rect x="26" y="34" width="28" height="42" fill="#F2C46D"/><rect x="104" y="30" width="26" height="46" fill="#D9776A"/><rect x="128" y="18" width="32" height="58" fill="#F0B98D"/>`;
      [[6, 30], [16, 30], [6, 46], [16, 46], [6, 60], [16, 60], [32, 42], [42, 42], [32, 56], [42, 56], [110, 38], [120, 38], [110, 54], [120, 54], [136, 28], [148, 28], [136, 44], [148, 44], [136, 60], [148, 60], [60, 52], [72, 52], [84, 52], [96, 52]].forEach(([x, y]) => { o += `<path d="M${x} ${y + 8} V${y + 3} a3 3 0 0 1 6 0 V${y + 8} Z" fill="#6B3E2E" opacity=".75"/>`; });
      o += `<path d="M54 66 Q80 50 106 66 L106 70 Q80 56 54 70 Z" fill="#F4E8D4"/><path d="M54 70 Q80 56 106 70" stroke="#C9B08A" stroke-width="1" fill="none"/>`;
      o += `<rect x="34" y="70" width="2.5" height="22" fill="#fff"/><rect x="34" y="72" width="2.5" height="4" fill="#E2654F"/><rect x="34" y="80" width="2.5" height="4" fill="#E2654F"/><rect x="40" y="72" width="2.5" height="20" fill="#fff"/><rect x="40" y="74" width="2.5" height="4" fill="#5E8FD6"/><rect x="40" y="82" width="2.5" height="4" fill="#5E8FD6"/>`;
      o += `<path d="M58 88 Q86 97 118 86 L121 82 Q88 92 55 85 Z" fill="#26211E"/><path d="M118 86 l4 -8 l2 1 l-3 8 Z" fill="#26211E"/><rect x="74" y="82" width="10" height="5" rx="2" fill="#B5432F"/><path d="M98 87 L106 64" stroke="#6B4A30" stroke-width="1.4"/>`;
      break;
    case "dolomiti":
      o += `<circle cx="30" cy="16" r="1.4" fill="#fff"/>` + `<path d="M0 70 L18 40 L26 50 L40 22 L52 46 L62 30 L76 56 L92 18 L104 42 L118 28 L134 52 L148 34 L160 50 V100 H0 Z" fill="#E7A28E"/><path d="M40 22 L52 46 L46 52 Z M92 18 L104 42 L96 48 Z M118 28 L134 52 L126 54 Z M62 30 L76 56 L70 58 Z" fill="#C97F78" opacity=".7"/><path d="M0 74 L30 58 L60 70 L100 56 L130 66 L160 60 V100 H0Z" fill="#9C8DB0" opacity=".55"/>`;
      o += `<path d="M0 80 Q40 72 80 78 T160 74 V100 H0 Z" fill="#8CC27A"/>` + pine(16, 84, 14) + pine(26, 86, 11) + pine(136, 82, 15) + pine(148, 84, 12);
      o += `<rect x="92" y="76" width="20" height="12" fill="#B5784A"/><path d="M88 78 L102 68 L116 78 Z" fill="#8E3B2E"/><rect x="99" y="80" width="5" height="5" fill="#FFE3A3"/>`;
      break;
    case "cinqueterre":
      o += sun(30, 22, 8) + `<rect x="0" y="62" width="160" height="38" fill="url(#${w})"/>` + waves(72, 4);
      o += `<path d="M66 100 L72 62 Q86 40 116 36 L160 28 V100 Z" fill="#7F9A5A"/><path d="M110 100 Q120 70 160 60 V100Z" fill="#6C8A4C"/>`;
      [[78, 56, "#F2B46B"], [90, 52, "#E77F6A"], [102, 48, "#F6D57A"], [114, 44, "#E9A2A2"], [126, 40, "#9CC6E8"], [140, 36, "#F2B46B"], [84, 66, "#F6D57A"], [96, 62, "#9CC6E8"], [108, 58, "#F2B46B"], [120, 54, "#E77F6A"], [132, 50, "#F6D57A"], [146, 46, "#E9A2A2"], [102, 72, "#E77F6A"], [116, 68, "#F6D57A"], [130, 64, "#9CC6E8"], [144, 60, "#F2B46B"]].forEach(([x, y, c]) => { o += `<rect x="${x}" y="${y}" width="11" height="11" fill="${c}"/><path d="M${x - 1} ${y} L${x + 5.5} ${y - 4} L${x + 12} ${y} Z" fill="#B5604A"/><rect x="${x + 2}" y="${y + 3}" width="2.5" height="3" fill="#5E4A3A" opacity=".6"/><rect x="${x + 6.5}" y="${y + 3}" width="2.5" height="3" fill="#5E4A3A" opacity=".6"/>`; });
      o += `<path d="M22 84 L42 84 L38 89 L26 89 Z" fill="#E2654F"/><path d="M32 84 V74 L39 82 Z" fill="#fff"/>`;
      break;
    case "roma":
      o += sun(130, 20, 8) + `<rect x="0" y="86" width="160" height="14" fill="#CDB27F"/>`;
      o += `<path d="M30 86 L30 44 Q80 30 130 44 L130 86 Z" fill="#E3BE8C"/><path d="M106 36 Q120 40 130 44 L130 58 L118 54 L112 46 Z" fill="${sk[1]}"/><path d="M30 44 Q80 30 106 36 L112 46 Q80 40 30 50 Z" fill="#D2A876"/>`;
      for (let r = 0; r < 3; r++) for (let x = 35; x < 126; x += 9.5) { const y = 54 + r * 11; if (r === 0 && x > 104) continue; o += `<path d="M${x} ${y + 8} V${y + 3} a3 3 0 0 1 6 0 V${y + 8} Z" fill="#9A6E44"/>`; }
      o += `<rect x="30" y="64" width="100" height="1.5" fill="#C99C68"/><rect x="30" y="75" width="100" height="1.5" fill="#C99C68"/>`;
      o += `<rect x="13" y="62" width="2.5" height="24" fill="#7A5A3A"/><ellipse cx="14" cy="60" rx="15" ry="6" fill="#4E7D4A"/><rect x="146" y="58" width="2.5" height="28" fill="#7A5A3A"/><ellipse cx="147" cy="56" rx="14" ry="6" fill="#4E7D4A"/>` + cypress(138, 86, 26);
      o += `<g transform="translate(70 90)"><circle r="2.2" fill="#F2C063"/></g>`;
      break;
    case "neuschwanstein":
      o += `<path d="M0 56 L30 26 L54 50 L84 20 L120 52 L146 30 L160 40 V100 H0Z" fill="#9DB2CF"/><path d="M30 26 L36 32 L30 34 L24 32Z M84 20 L92 28 L84 30 L76 28Z M146 30 L152 36 L146 37 L140 35Z" fill="#fff"/>`;
      o += `<path d="M0 78 Q40 54 92 66 T160 70 V100 H0 Z" fill="#4F8A55"/><path d="M0 90 Q60 76 160 86 V100 H0Z" fill="#3F7448"/>`;
      for (let k = 0; k < 9; k++) o += pine(8 + k * 18, 86 + (k % 2) * 4, 12, "#2F5E3C");
      o += `<path d="M66 70 Q86 56 112 70 Z" fill="#6E9A5E"/><rect x="76" y="46" width="28" height="24" fill="#F4F1EA"/><path d="M75 46 L90 37 L105 46 Z" fill="#6E83A8"/><rect x="98" y="26" width="10" height="44" fill="#F4F1EA"/><path d="M96 26 L103 10 L110 26 Z" fill="#6E83A8"/><rect x="70" y="38" width="8" height="32" fill="#EDE8DE"/><path d="M68 38 L74 26 L80 38 Z" fill="#6E83A8"/><rect x="88" y="40" width="5" height="10" fill="#EDE8DE"/><path d="M87 40 L90.5 33 L94 40Z" fill="#6E83A8"/>`;
      [[80, 52], [86, 52], [92, 52], [80, 60], [86, 60], [92, 60], [101, 34], [101, 44], [72, 46]].forEach(([x, y]) => { o += `<rect x="${x}" y="${y}" width="2.4" height="4" rx="1" fill="#5A6680"/>`; });
      break;
    case "schwarzwald":
      for (let k = 0; k < 11; k++) o += pine(k * 16, 58 + (k % 3) * 3, 22, "#6E9A7A");
      for (let k = 0; k < 9; k++) o += pine(8 + k * 20, 70 + (k % 2) * 4, 28, "#3F6E4F");
      o += `<path d="M0 78 Q80 70 160 80 V100 H0Z" fill="#86BE6E"/>`;
      o += `<rect x="58" y="64" width="46" height="22" fill="#F1E3CB"/><path d="M58 64 H104 M58 75 H104 M70 64 V86 M92 64 V86" stroke="#7A4E2E" stroke-width="1.4"/><path d="M48 68 L81 40 L114 68 Z" fill="#7A4E2E"/><path d="M54 66 L81 44 L108 66" stroke="#5E3A20" stroke-width="1.4" fill="none"/>`;
      [[62, 68], [96, 68], [62, 78], [96, 78]].forEach(([x, y]) => { o += `<rect x="${x}" y="${y}" width="5" height="5" fill="#9CC6E8"/><rect x="${x - 1}" y="${y + 5}" width="7" height="2" fill="#E2654F"/>`; });
      o += `<rect x="77" y="76" width="8" height="10" fill="#7A4E2E"/><circle cx="81" cy="52" r="3" fill="#F1E3CB"/><path d="M81 52 l2 -1" stroke="#7A4E2E" stroke-width="1"/>`;
      o += `<ellipse cx="40" cy="64" rx="40" ry="5" fill="#fff" opacity=".35"/><ellipse cx="130" cy="60" rx="34" ry="4" fill="#fff" opacity=".35"/>`;
      break;
    case "bodensee":
      o += sun(120, 22, 7) + `<path d="M0 52 L20 40 L40 50 L64 34 L90 50 L116 38 L140 48 L160 42 V60 H0 Z" fill="#B9C8DE"/><path d="M64 34 L70 38 L64 40 L58 38Z M116 38 L121 41 L116 42 L111 41Z" fill="#fff"/>`;
      o += `<rect x="0" y="58" width="160" height="42" fill="url(#${w})"/>` + waves(70, 5);
      o += `<rect x="0" y="80" width="56" height="8" fill="#C9B79C"/><rect x="28" y="44" width="11" height="36" fill="#EDE5D6"/><rect x="26" y="40" width="15" height="5" fill="#B5A58A"/><rect x="29" y="34" width="9" height="6" fill="#FFE08A"/><path d="M27 34 L33.5 27 L40 34 Z" fill="#6E83A8"/><circle cx="33.5" cy="52" r="3" fill="#F8F1D9" stroke="#8A7A60" stroke-width=".8"/>`;
      o += `<path d="M104 82 L132 82 L128 87 L108 87 Z" fill="#F4F1EA"/><path d="M118 82 V58 L132 80 Z" fill="#fff"/><path d="M116 82 V62 L106 80 Z" fill="#F2D3C0"/>`;
      break;
    case "berlin":
      o += sun(132, 24, 8, "#FFD08A") + `<rect x="0" y="88" width="160" height="12" fill="#BDB5A6"/>`;
      o += `<circle cx="12" cy="80" r="10" fill="#7FA36A"/><circle cx="148" cy="80" r="10" fill="#7FA36A"/><rect x="11" y="82" width="2" height="8" fill="#7A5A3A"/><rect x="147" y="82" width="2" height="8" fill="#7A5A3A"/>`;
      o += `<rect x="28" y="84" width="104" height="5" fill="#D8C7A3"/><rect x="28" y="42" width="104" height="9" fill="#E2D3B2"/><rect x="28" y="49" width="104" height="2" fill="#C9B48A"/><rect x="52" y="34" width="56" height="9" fill="#E8DABD"/>`;
      [34, 50, 66, 88, 104, 120].forEach((x) => { o += `<rect x="${x}" y="51" width="6" height="33" fill="#EFE5CE"/><rect x="${x + 4}" y="51" width="2" height="33" fill="#C9B48A" opacity=".6"/>`; });
      o += `<rect x="74" y="27" width="12" height="7" rx="1" fill="#5E8E7A"/>`;
      [70, 75, 85, 90].forEach((x) => { o += `<path d="M${x} 34 v-5 q1 -3 3 -3 l1 1 l-1 2 v5" fill="#5E8E7A"/>`; });
      o += `<path d="M80 27 V18 M77 19 q3 -3 6 0" stroke="#5E8E7A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
      break;
    case "sevilla":
      o += sun(130, 20, 7) + `<rect x="0" y="86" width="160" height="14" fill="#E8D3A8"/>`;
      o += `<rect x="68" y="34" width="22" height="56" fill="#E2A96C"/><path d="M68 34 V90 M90 34 V90" stroke="#C88A4F" stroke-width="1"/>`;
      for (let y = 40; y < 84; y += 10) o += `<path d="M72 ${y + 6} V${y + 2} a2 2 0 0 1 4 0 V${y + 6} Z M82 ${y + 6} V${y + 2} a2 2 0 0 1 4 0 V${y + 6} Z" fill="#B47640"/><path d="M70 ${y + 8} L88 ${y + 8}" stroke="#C88A4F" stroke-width=".8" stroke-dasharray="2 2"/>`;
      o += `<rect x="70" y="22" width="18" height="12" fill="#EFC890"/><path d="M73 32 V26 a2 2 0 0 1 4 0 V32 Z M81 32 V26 a2 2 0 0 1 4 0 V32 Z" fill="#B47640"/><rect x="74" y="14" width="10" height="8" fill="#F2D4A2"/><path d="M74 14 Q79 6 84 14 Z" fill="#E2A96C"/><path d="M79 8 V3" stroke="#B47640" stroke-width="1.2"/><circle cx="79" cy="3" r="1.4" fill="#E9A23B"/>`;
      [[22, 78], [138, 80]].forEach(([x, y]) => { o += `<rect x="${x - 1.5}" y="${y}" width="3" height="10" fill="#7A5A3A"/><circle cx="${x}" cy="${y - 6}" r="12" fill="#4E8F4A"/>${[[-5, -9], [4, -7], [-2, -2], [6, -1], [-7, -3], [1, -12]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="1.8" fill="#F2A13A"/>`).join("")}`; });
      break;
    case "granada":
      o += sun(28, 22, 7, "#FFD08A") + `<path d="M0 52 L30 30 L60 46 L90 22 L124 42 L160 28 V72 H0Z" fill="#A8B8D2"/><path d="M30 30 L40 37 L32 38 L22 37Z M90 22 L102 31 L92 32 L80 30Z M160 28 L150 34 L160 35Z" fill="#fff"/>`;
      o += `<path d="M0 80 Q60 56 120 62 T160 66 V100 H0 Z" fill="#7FA36A"/><path d="M0 92 Q80 80 160 92 V100 H0Z" fill="#6A9058"/>`;
      o += `<rect x="38" y="56" width="92" height="16" fill="#C8734E"/><rect x="44" y="44" width="14" height="28" fill="#B5603D"/><rect x="96" y="40" width="16" height="32" fill="#B5603D"/><rect x="70" y="50" width="10" height="22" fill="#BD6A44"/>`;
      [[44, 44, 14], [96, 40, 16], [70, 50, 10], [38, 56, 92]].forEach(([x, y, wd]) => { for (let k = 0; k < wd; k += 4) o += `<rect x="${x + k}" y="${y - 2.5}" width="2.5" height="2.5" fill="${x === 38 ? "#C8734E" : "#B5603D"}"/>`; });
      [[48, 50], [52, 50], [100, 46], [106, 46], [60, 62], [86, 62], [118, 62]].forEach(([x, y]) => { o += `<path d="M${x} ${y + 5} V${y + 2} a1.5 1.5 0 0 1 3 0 V${y + 5} Z" fill="#6B3424"/>`; });
      o += cypress(30, 80, 24) + cypress(136, 74, 22) + cypress(144, 76, 18);
      break;
    case "barcelona":
      o += sun(130, 20, 8) + `<rect x="0" y="70" width="160" height="30" fill="url(#${w})"/>` + waves(76, 4);
      o += `<path d="M0 70 V56 H14 V50 H26 V58 H40 V48 H54 V60 H62 V70 Z" fill="#E8C9A8"/><path d="M110 70 V54 H124 V60 H136 V50 H150 V58 H160 V70 Z" fill="#E8C9A8"/>`;
      o += `<rect x="70" y="50" width="34" height="20" fill="#D9B48E"/>`;
      [[74, 30], [82, 22], [92, 22], [100, 30]].forEach(([x, top]) => { o += `<path d="M${x - 3.5} 52 L${x} ${top} L${x + 3.5} 52 Z" fill="#C9A27A"/><circle cx="${x}" cy="${top + 1}" r="1.6" fill="#E9A23B"/><path d="M${x - 1} ${top + 10} h2 M${x - 1.5} ${top + 16} h3" stroke="#9A7650" stroke-width=".8"/>`; });
      o += `<path d="M0 88 Q80 78 160 90 V100 H0Z" fill="#F1D9A2"/>` + palm(24, 90, 26) + palm(142, 92, 22);
      o += `<g transform="translate(58 86)"><path d="M0 0 a8 8 0 0 1 16 0 Z" fill="#E2654F"/><path d="M8 0 V8" stroke="#6B4A30" stroke-width="1"/></g>`;
      break;
    case "tenerife":
      o += `<rect x="0" y="80" width="160" height="20" fill="url(#${w})"/>` + waves(88, 4);
      o += `<path d="M14 76 L66 22 Q80 14 94 22 L146 76 Z" fill="#9A7A68"/><path d="M94 22 L146 76 L112 76 Z" fill="#7F6352" opacity=".7"/><path d="M64 25 Q80 12 96 25 L90 31 L84 27 L78 32 L72 28 L68 31 Z" fill="#fff"/>`;
      [[20, 72, 22], [50, 76, 26], [86, 74, 24], [120, 76, 26], [150, 72, 20]].forEach(([x, y, r]) => { o += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="7" fill="#fff" opacity=".95"/>`; });
      o += sun(30, 20, 7);
      break;
    case "london":
      o += `<rect x="0" y="80" width="160" height="20" fill="#6C9BB8"/>` + waves(88, 4);
      o += `<rect x="20" y="56" width="86" height="24" fill="#D9B97F"/>`;
      for (let x = 22; x < 104; x += 6) o += `<rect x="${x}" y="52" width="2" height="5" fill="#D9B97F"/><rect x="${x + 2}" y="60" width="1.6" height="16" fill="#B89A60" opacity=".7"/>`;
      o += `<rect x="104" y="30" width="18" height="52" fill="#D9B97F"/><path d="M106 34 V80 M120 34 V80" stroke="#B89A60" stroke-width="1"/><rect x="102" y="30" width="22" height="18" fill="#E5C98F"/><circle cx="113" cy="39" r="6.5" fill="#F8F1D9" stroke="#8A6A3A" stroke-width="1"/><path d="M113 39 V35 M113 39 L116 40" stroke="#33302E" stroke-width="1" stroke-linecap="round"/><path d="M102 30 L113 8 L124 30 Z" fill="#4D6E6A"/><path d="M113 8 V3" stroke="#C9A24A" stroke-width="1.4"/>`;
      o += `<rect x="0" y="76" width="160" height="4" fill="#5E8E6A"/><rect x="40" y="66" width="22" height="10" rx="2" fill="#D8382E"/><rect x="43" y="68" width="16" height="3" fill="#F8F1D9" opacity=".85"/><circle cx="45" cy="76" r="2" fill="#33302E"/><circle cx="57" cy="76" r="2" fill="#33302E"/>`;
      break;
    case "highlands":
      o += `<path d="M0 54 Q30 30 60 48 T120 38 T160 46 V80 H0Z" fill="#A7BBA9"/><path d="M0 64 Q30 44 66 60 T130 54 T160 60 V80 H0Z" fill="#7FA07A"/>`;
      o += `<path d="M0 72 Q80 64 160 72 V84 H0 Z" fill="#7FA9C6"/>` + waves(74, 3);
      o += `<path d="M0 80 Q80 76 160 82 V100 H0Z" fill="#98BE6E"/>`;
      o += `<g transform="translate(104 84)"><ellipse cx="0" cy="0" rx="18" ry="10" fill="#C66A2F"/><path d="M-18 -2 q2 -6 8 -6 M-8 -9 q3 -3 8 -2 M4 -9 q6 0 9 4" stroke="#A9551F" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="-14" y="6" width="4" height="8" rx="2" fill="#A9551F"/><rect x="8" y="6" width="4" height="8" rx="2" fill="#A9551F"/><ellipse cx="-20" cy="-4" rx="9" ry="8" fill="#D27A3C"/><path d="M-27 -10 q-6 -4 -5 -10 M-13 -10 q6 -4 5 -10" stroke="#F3E6C8" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-27 -6 q7 -6 14 0 q-3 4 -7 2 q-4 2 -7 -2 Z" fill="#B5571F"/><ellipse cx="-20" cy="1" rx="5" ry="3.5" fill="#E9A07A"/><circle cx="-22" cy="0.5" r=".8" fill="#5E3A20"/><circle cx="-18" cy="0.5" r=".8" fill="#5E3A20"/></g>`;
      o += `<circle cx="30" cy="90" r="1.6" fill="#B9A3F2"/><circle cx="40" cy="93" r="1.6" fill="#B9A3F2"/><circle cx="140" cy="92" r="1.6" fill="#B9A3F2"/>`;
      break;
    case "newyork":
      o += sun(30, 30, 9, "#FFC27A");
      [[0, 52, 14], [12, 40, 12], [26, 58, 12], [38, 30, 14], [54, 46, 12], [88, 36, 14], [104, 54, 10], [114, 28, 14], [130, 46, 12], [144, 38, 16]].forEach(([x, y, wd], k) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${90 - y}" fill="${k % 2 ? "#3E4A6B" : "#4E5A7E"}"/>`; for (let yy = y + 4; yy < 84; yy += 6) for (let xx = x + 2; xx < x + wd - 2; xx += 4) if ((xx + yy) % 3) o += `<rect x="${xx}" y="${yy}" width="1.6" height="2.4" fill="#FFD27A" opacity=".85"/>`; });
      o += `<rect x="68" y="34" width="18" height="56" fill="#55618A"/><rect x="71" y="24" width="12" height="10" fill="#55618A"/><rect x="74" y="16" width="6" height="8" fill="#55618A"/><path d="M77 16 V4" stroke="#55618A" stroke-width="1.6"/>`;
      for (let yy = 38; yy < 86; yy += 6) o += `<rect x="71" y="${yy}" width="12" height="2" fill="#FFD27A" opacity=".7"/>`;
      o += `<path d="M0 90 Q20 82 40 88 T80 86 T120 88 T160 86 V100 H0Z" fill="#5E9A5A"/><rect x="104" y="90" width="20" height="7" rx="2" fill="#F2C23A"/><rect x="108" y="87" width="12" height="4" rx="1" fill="#F2C23A"/><circle cx="108" cy="97" r="1.8" fill="#33302E"/><circle cx="120" cy="97" r="1.8" fill="#33302E"/>`;
      break;
    case "grandcanyon":
      o += sun(122, 30, 10, "#FFE08A");
      o += `<path d="M0 46 L40 44 L60 50 L100 46 L160 48 V100 H0Z" fill="#E09A6A"/><path d="M0 52 L160 54" stroke="#F2B88A" stroke-width="2" opacity=".6"/><path d="M0 60 L30 58 L46 66 L80 62 L110 70 L160 64 V100 H0Z" fill="#C46E46"/><path d="M0 68 L40 70 L80 72 L160 72" stroke="#D98B5F" stroke-width="2" fill="none" opacity=".7"/>`;
      o += `<path d="M0 72 L44 76 L56 100 H0Z" fill="#A8553A"/><path d="M160 74 L112 80 L104 100 H160Z" fill="#9A4A32"/><path d="M0 82 L48 84 M160 86 L108 88" stroke="#C46E46" stroke-width="2" opacity=".7"/><path d="M56 100 Q76 88 96 92 Q100 96 104 100Z" fill="#5FA4B8"/>`;
      o += `<path d="M20 38 l4 -2 l4 2 M30 34 l3 -1.5 l3 1.5" stroke="#5E3A20" stroke-width="1" fill="none"/>`;
      break;
    case "paris":
      o += sun(130, 22, 8);
      o += `<path d="M62 94 Q72 70 76 50 L78 14 L82 14 L84 50 Q88 70 98 94 L91 94 Q86 80 80 76 Q74 80 69 94 Z" fill="#8A6A4E"/><rect x="71" y="49" width="18" height="3" fill="#7A5A40"/><rect x="66" y="66" width="28" height="3" fill="#7A5A40"/><path d="M80 14 V6" stroke="#7A5A40" stroke-width="1.4"/><path d="M76 30 L84 40 M84 30 L76 40 M74 54 L86 64 M86 54 L74 64" stroke="#A8876A" stroke-width=".8"/>`;
      [[0, 78, 30], [30, 82, 26], [100, 80, 30], [130, 76, 30]].forEach(([x, y, wd]) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${100 - y}" fill="#F2E6CF"/><path d="M${x} ${y} L${x + 3} ${y - 7} L${x + wd - 3} ${y - 7} L${x + wd} ${y} Z" fill="#8E9AAD"/><rect x="${x + wd - 8}" y="${y - 11}" width="3" height="5" fill="#C9734E"/>`; for (let xx = x + 3; xx < x + wd - 3; xx += 6) o += `<rect x="${xx}" y="${y + 5}" width="3" height="5" fill="#7A8AA0"/><rect x="${xx - .5}" y="${y + 10}" width="4" height="1" fill="#33302E"/>`; });
      o += `<rect x="56" y="94" width="48" height="6" fill="#9FBF7A"/>`;
      break;
    case "montsaintmichel":
      o += sun(130, 26, 7) + `<rect x="0" y="72" width="160" height="28" fill="#E3D2B0"/><path d="M0 80 Q40 76 80 82 T160 80 V90 Q100 86 0 92Z" fill="#A9C9DD" opacity=".9"/>`;
      o += `<path d="M48 76 Q80 40 112 76 Z" fill="#9A8C78"/><path d="M58 74 L58 62 L68 62 L68 56 L76 56 L76 50 L86 50 L86 56 L94 56 L94 62 L102 62 L102 74 Z" fill="#C9BBA4"/><rect x="74" y="38" width="14" height="14" fill="#BFAF95"/><path d="M73 38 L81 30 L89 38 Z" fill="#7A6E66"/><path d="M79 30 L81 12 L83 30 Z" fill="#7A6E66"/><circle cx="81" cy="11" r="1.4" fill="#E9A23B"/>`;
      [[62, 66], [70, 66], [90, 66], [98, 66], [78, 58], [84, 58], [79, 43]].forEach(([x, y]) => { o += `<rect x="${x}" y="${y}" width="2" height="3" fill="#6E6256"/>`; });
      o += `<path d="M56 84 Q80 96 104 84" stroke="#9A8C78" stroke-width="3" opacity=".25" fill="none"/>`;
      break;
    case "provence":
      o += sun(36, 22, 9) + `<path d="M0 60 Q80 54 160 60 V100 H0Z" fill="#9B7BC9"/>`;
      for (let k = -6; k <= 12; k++) { const xb = k * 16; o += `<path d="M80 60 L${xb} 100 L${xb + 8} 100 Z" fill="#7E5DB5"/>`; }
      o += `<path d="M0 60 Q80 54 160 60 V64 Q80 58 0 64Z" fill="#8FB46A"/>`;
      o += `<rect x="110" y="48" width="28" height="13" fill="#E9C99A"/><path d="M108 49 L124 42 L140 49 Z" fill="#C8734E"/><rect x="116" y="52" width="4" height="4" fill="#7AA3C8"/><rect x="128" y="52" width="4" height="4" fill="#7AA3C8"/>` + cypress(146, 62, 22) + cypress(104, 62, 16);
      break;
    case "chamonix":
      o += `<path d="M0 60 L18 42 L24 48 L32 34 L40 50 L48 40 L60 58 Z" fill="#7C879B"/><path d="M20 70 L58 34 Q84 14 110 28 L156 66 Z" fill="#F2F6FA"/><path d="M110 28 L156 66 L120 66 Q112 46 100 40 Z" fill="#C9D8EA"/><path d="M58 34 L66 44 L74 38 L82 46" stroke="#C9D8EA" stroke-width="1.5" fill="none"/>`;
      o += `<path d="M0 20 L160 4" stroke="#555" stroke-width=".8"/><rect x="118" y="6" width="9" height="7" rx="1.5" fill="#D8382E"/><path d="M122.5 6 V8" stroke="#555" stroke-width=".8"/>`;
      o += `<path d="M0 74 Q80 60 160 72 V100 H0Z" fill="#8CBF7A"/>`;
      for (let k = 0; k < 8; k++) o += pine(6 + k * 21, 80 + (k % 2) * 3, 18);
      o += `<rect x="60" y="84" width="18" height="12" fill="#C99A6B"/><path d="M56 86 L69 77 L82 86 Z" fill="#7A4E2E"/><rect x="66" y="88" width="5" height="5" fill="#FFE3A3"/><rect x="96" y="86" width="14" height="10" fill="#C99A6B"/><path d="M93 88 L103 80 L113 88 Z" fill="#7A4E2E"/>`;
      break;
    case "rio":
      o += sun(30, 22, 8) + `<rect x="0" y="72" width="160" height="28" fill="url(#${w})"/>` + waves(80, 4);
      o += `<path d="M100 80 Q102 32 122 30 Q140 32 144 80 Z" fill="#5F7F63"/><path d="M106 44 Q120 26 138 42 Q124 36 106 44Z" fill="#6E9F5E"/><path d="M70 80 Q76 56 90 56 Q100 58 104 80 Z" fill="#6A8A62"/><path d="M76 64 Q90 52 100 64 Q90 60 76 64Z" fill="#7AAA66"/>`;
      o += `<path d="M86 57 L120 31" stroke="#555" stroke-width=".8"/><rect x="99" y="44" width="7" height="5" rx="1.2" fill="#E2654F"/>`;
      o += `<path d="M0 90 Q30 80 70 88 L70 100 H0Z" fill="#F1D9A2"/>` + palm(16, 92, 24) + palm(38, 92, 18);
      break;
    case "amazonia":
      o += `<path d="M0 50 Q20 40 40 48 T80 44 T120 46 T160 42 V80 H0Z" fill="#5BA35C"/>`;
      [[10, 52, 14], [34, 46, 16], [60, 50, 14], [90, 44, 18], [118, 50, 15], [146, 46, 16]].forEach(([x, y, r], k) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="${k % 2 ? "#3E8A4E" : "#2F6E40"}"/>`; });
      o += `<path d="M0 64 Q40 58 80 66 T160 62 V100 H0Z" fill="#3E8A4E"/>`;
      o += `<path d="M0 88 Q40 72 84 82 T160 76 V100 H0Z" fill="#A08A62"/><path d="M20 88 q8 -3 16 0 M90 84 q8 -3 16 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".5"/>`;
      o += `<path d="M50 92 L70 92 L67 96 L53 96 Z" fill="#7A4E2E"/>`;
      o += `<path d="M112 32 L150 30" stroke="#6B4A30" stroke-width="2.4" stroke-linecap="round"/><g transform="translate(130 22)"><ellipse cx="0" cy="0" rx="5" ry="8" fill="#E2453A"/><path d="M-3 4 Q-6 14 -2 22 L1 22 Q0 12 3 4 Z" fill="#3E7FD6"/><path d="M2 -2 Q8 2 5 9 Q3 4 0 2Z" fill="#F2C23A"/><circle cx="0" cy="-7" r="4.2" fill="#E2453A"/><path d="M-3 -6 q-4 1 -3 4 q2 -1 3 -2 Z" fill="#F3E6C8"/><circle cx="1" cy="-8" r=".9" fill="#33302E"/></g>`;
      break;
    case "lencois":
      o += sun(130, 20, 8);
      o += `<path d="M0 56 Q40 40 80 54 T160 50 V100 H0Z" fill="#F6F1E7"/><path d="M0 56 Q40 40 80 54" stroke="#E4DCCB" stroke-width="3" fill="none"/>`;
      o += `<ellipse cx="40" cy="66" rx="26" ry="6" fill="#3FC1C9"/><ellipse cx="34" cy="65" rx="10" ry="2" fill="#fff" opacity=".4"/><path d="M0 76 Q50 60 100 74 T160 68 V100 H0Z" fill="#F2EBDD"/><path d="M60 72 Q100 60 140 70" stroke="#E4DCCB" stroke-width="3" fill="none"/>`;
      o += `<ellipse cx="120" cy="82" rx="30" ry="7" fill="#3FC1C9"/><ellipse cx="112" cy="81" rx="12" ry="2" fill="#fff" opacity=".4"/><path d="M0 92 Q60 82 160 94 V100 H0Z" fill="#EDE4D3"/><ellipse cx="62" cy="94" rx="16" ry="3.5" fill="#56CDD3"/>`;
      break;
    case "iguacu":
      o += `<path d="M0 30 Q40 22 80 28 T160 26 V46 H0Z" fill="#4E8F4A"/>`;
      [[10, 28, 9], [30, 24, 10], [54, 27, 9], [78, 26, 10], [104, 24, 9], [128, 26, 10], [150, 24, 9]].forEach(([x, y, r]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="#3E7F42"/>`; });
      o += `<rect x="0" y="40" width="160" height="40" fill="#8A6A4E"/><path d="M0 40 H160" stroke="#5E8A4A" stroke-width="3"/>`;
      [[14, 34], [58, 42], [110, 36]].forEach(([x, wd]) => { o += `<rect x="${x}" y="40" width="${wd}" height="40" fill="#F4F8FA"/>`; for (let k = x + 3; k < x + wd; k += 5) o += `<path d="M${k} 42 V78" stroke="#C9DDE8" stroke-width="1.2"/>`; });
      o += `<rect x="0" y="80" width="160" height="20" fill="#8FB7C2"/>`;
      [[30, 80, 26], [80, 82, 30], [130, 80, 26]].forEach(([x, y, r]) => { o += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="7" fill="#fff" opacity=".85"/>`; });
      ["#F28A8A", "#F2C063", "#9CD38A", "#7AB6E8"].forEach((c, k) => { o += `<path d="M60 ${78} A40 40 0 0 1 140 78" stroke="${c}" stroke-width="2" fill="none" opacity=".45" transform="translate(0 ${k * 2.4})"/>`; });
      break;
  }
  return o + `</svg>`;
}

/* --- Oggetti del negozio --- */
function itemArt(id) {
  if (HATS[id] || id === "s_spring" || id === "s_summer") return `<svg viewBox="40 40 120 72" aria-hidden="true">${headwear(92, id)}</svg>`;
  if (WALLS[id]) { const [a, b] = WALLS[id]; return `<svg viewBox="0 0 60 44" aria-hidden="true"><rect width="60" height="44" rx="8" fill="${a}"/><rect x="8" width="7" height="44" fill="${b}"/><rect x="26" width="7" height="44" fill="${b}"/><rect x="44" width="7" height="44" fill="${b}"/></svg>`; }
  const A = {
    rug: `<svg viewBox="0 0 100 50" aria-hidden="true"><ellipse cx="50" cy="25" rx="46" ry="18" fill="#C86E5A"/><ellipse cx="50" cy="25" rx="38" ry="12" fill="none" stroke="#F2D3A3" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/><ellipse cx="50" cy="25" rx="28" ry="8" fill="#D9846F"/></svg>`,
    plant: `<svg viewBox="290 140 60 112" aria-hidden="true"><path d="M318 212 C296 196 290 174 298 160 C310 172 318 190 318 212 Z" fill="#6DB36A"/><path d="M322 212 C344 194 350 170 340 156 C328 170 322 190 322 212 Z" fill="#7FC27B"/><path d="M320 212 C314 186 318 164 326 148 C332 168 328 190 320 212 Z" fill="#5FA35C"/><path d="M300 212 L340 212 L334 246 C334 250 306 250 306 246 Z" fill="#D98A63"/><rect x="298" y="208" width="44" height="9" rx="4" fill="#C77650"/></svg>`,
    lamp: `<svg viewBox="20 130 50 132" aria-hidden="true"><rect x="41" y="160" width="5" height="96" fill="#6B5A47"/><ellipse cx="44" cy="258" rx="17" ry="5" fill="#6B5A47"/><path d="M26 162 L62 162 L54 136 L34 136 Z" fill="#FFE3A3" stroke="#D9B276" stroke-width="2"/></svg>`,
    shelf: `<svg viewBox="0 -2 86 42" aria-hidden="true"><rect x="0" y="22" width="84" height="7" rx="3" fill="#9A6B43"/><rect x="6" y="2" width="10" height="20" rx="2" fill="#E2654F"/><rect x="18" y="5" width="9" height="17" rx="2" fill="#7AA3DC"/><rect x="29" y="0" width="11" height="22" rx="2" fill="#F2C063"/><ellipse cx="56" cy="17" rx="8" ry="5.5" fill="#9FB6CC"/><ellipse cx="72" cy="18" rx="6" ry="4" fill="#C7B6A0"/></svg>`,
    frame: `<svg viewBox="0 0 62 48" aria-hidden="true"><rect width="62" height="48" rx="5" fill="#9A6B43"/><rect x="5" y="5" width="52" height="38" rx="2" fill="#CFE7F1"/><path d="M5 34 L20 20 L32 32 L42 24 L57 36 L57 43 L5 43 Z" fill="#8DBE86"/><circle cx="46" cy="14" r="4" fill="#FFD25E"/></svg>`,
    lights: `<svg viewBox="0 0 100 40" aria-hidden="true"><path d="M2 8 Q50 34 98 8" stroke="#6B5A47" stroke-width="1.5" fill="none"/>${[[12, 14, "#FFB36B"], [30, 22, "#9EE3C5"], [50, 25, "#FFD25E"], [70, 22, "#F9A3C0"], [88, 14, "#9CC8F7"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}"/><circle cx="${x}" cy="${y}" r="10" fill="${c}" opacity=".25"/>`).join("")}</svg>`,
    pouf: `<svg viewBox="66 234 62 40" aria-hidden="true"><path d="M72 250 C72 238 122 238 122 250 L122 258 C122 270 72 270 72 258 Z" fill="#7FB0D6"/><ellipse cx="97" cy="249" rx="25" ry="8" fill="#9CC4E4"/><path d="M80 252 C88 258 106 258 114 252" stroke="#6A9CC4" stroke-width="1.6" fill="none"/><circle cx="97" cy="249" r="2.2" fill="#6A9CC4"/></svg>`,
    teddy: `<svg viewBox="234 222 44 48" aria-hidden="true"><circle cx="246" cy="230" r="5" fill="#B57E4E"/><circle cx="262" cy="230" r="5" fill="#B57E4E"/><ellipse cx="254" cy="253" rx="13" ry="13" fill="#C98F5E"/><ellipse cx="254" cy="256" rx="7.5" ry="8" fill="#E9C39A"/><ellipse cx="246" cy="264" rx="5.5" ry="4" fill="#B57E4E"/><ellipse cx="262" cy="264" rx="5.5" ry="4" fill="#B57E4E"/><circle cx="254" cy="237" r="10.5" fill="#C98F5E"/><ellipse cx="254" cy="241" rx="5" ry="3.8" fill="#E9C39A"/><ellipse cx="254" cy="239.5" rx="1.8" ry="1.3" fill="#3A2A20"/><circle cx="250" cy="235" r="1.3" fill="#3A2A20"/><circle cx="258" cy="235" r="1.3" fill="#3A2A20"/><path d="M249 246 l5 2.5 l5 -2.5 l0 5 l-5 -2.5 l-5 2.5 Z" fill="#E2654F"/></svg>`,
    fishbowl: `<svg viewBox="248 160 38 40" aria-hidden="true"><circle cx="267" cy="180" r="16" fill="#CDEBF7"/><path d="M252 176 Q267 172 282 176 L282 182 Q281 193 267 196 Q253 193 252 182 Z" fill="#7CC6E6"/><ellipse cx="265" cy="184" rx="5.5" ry="3.6" fill="#F08A3C"/><path d="M270 184 l5 -3.5 l0 7 Z" fill="#F2A65A"/><circle cx="262.5" cy="183" r=".9" fill="#2F2A26"/></svg>`,
    clock: `<svg viewBox="-20 -20 40 40" aria-hidden="true"><circle r="18" fill="#9A6B43"/><circle r="14.5" fill="#FFF8EA"/><rect x="-1.3" y="-8" width="2.6" height="8.5" rx="1.3" fill="${INK}" transform="rotate(300)"/><rect x="-1" y="-11.5" width="2" height="12" rx="1" fill="${INK}" transform="rotate(60)"/><circle r="1.8" fill="#E2654F"/></svg>`
  };
  return A[id] || "";
}

/* Icone */
const ICON = {
  today: '<path d="M12 3.5c3.5 2.6 6 5.8 6 9.2A6 6 0 0 1 6 12.7c0-3.4 2.5-6.6 6-9.2Z"/><path d="M12 9v9"/>',
  trips: '<path d="M4 19l5-14 3 8 3-5 5 11Z"/><path d="M3 19h18"/>',
  home: '<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-5h4v5"/>',
  diary: '<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6zM6 3v18M10 8h6M10 12h6"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  check: '<path d="M5 12l4 4 10-10"/>', lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 2 1.3 3 2.5 3C12 9 11 6 12 3Z"/>',
  note: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  noteoff: '<path d="M9 18V9M9 6l10-2v8"/><circle cx="6.5" cy="18" r="2.5"/><path d="M3 3l18 18"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M13 9h5M13 12h5M13 15h3"/><rect x="5.5" y="8" width="5" height="5" rx="1"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'
};
const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
const CAT_ICON = {
  body: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>',
  mind: '<path d="M12 3.5l2.2 6.3 6.3 2.2-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.2Z"/>',
  home: '<path d="M4 11l8-6.5 8 6.5v9H4z"/><path d="M10 20v-5h4v5"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><path d="M16 5.5a2.6 2.6 0 0 1 0 5.2M17.5 13.8c2 .7 3.2 2.6 3.2 5.2"/>',
  work: '<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5h6v2.5M3.5 12.5h17"/>',
  sleep: '<path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z"/>',
  custom: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>'
};
const catIcon = (c) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICON[c]}</svg>`;
const SEASON_ICON = {
  autumn: `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 L24 13 L33 10 L29 19 L36 24 L26 25 L25 35 L20 29 L15 35 L14 25 L4 24 L11 19 L7 10 L16 13 Z" fill="#E8742F"/><path d="M20 10 V36" stroke="#B4501C" stroke-width="2" stroke-linecap="round"/><path d="M20 22 L27 17 M20 26 L13 20" stroke="#B4501C" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  winter: `<svg viewBox="0 0 40 40" aria-hidden="true" stroke="#5E9BD6" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M20 4v32M6.1 12l27.8 16M6.1 28l27.8-16"/><path d="M15 6.5l5 4 5-4M15 33.5l5-4 5 4M6 17l6 1.5-2-6M34 23l-6-1.5 2 6M6 23l6-1.5-2 6M34 17l-6 1.5 2-6"/></svg>`,
  spring: `<svg viewBox="0 0 40 40" aria-hidden="true">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="20" cy="10" rx="6.5" ry="9" fill="#F7A9C0" transform="rotate(${a} 20 20)"/>`).join("")}<circle cx="20" cy="20" r="6" fill="#FFD25E"/></svg>`,
  summer: `<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#E9A23B" stroke-width="3" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M20 3v5" transform="rotate(${a} 20 20)"/>`).join("")}</g><circle cx="20" cy="20" r="9" fill="#FFC94D"/><circle cx="17" cy="18" r="1.3" fill="${INK}"/><circle cx="23" cy="18" r="1.3" fill="${INK}"/><path d="M17 22.5q3 2.5 6 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`
};
const LEAF = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15Z" fill="#fff"/><path d="M5 19L14 10" stroke="#E9A23B" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const STAR_W = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.6L12 17.1l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8Z" fill="#fff"/></svg>`;
const MOOD_FACE = ['<path d="M8 16.5q4-3 8 0"/>', '<path d="M8 15.5h8"/>', '<path d="M8 15q4 1.5 8 0"/>', '<path d="M8 14q4 3 8 0"/>', '<path d="M7.5 13.5q4.5 5 9 0z"/>'].map((m) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r=".9" fill="currentColor"/><circle cx="15" cy="10" r=".9" fill="currentColor"/>${m}</svg>`);

const SNACK_ART = {
  apple: '<circle cx="20" cy="23" r="12" fill="#E2453A"/><circle cx="15" cy="19" r="3" fill="#fff" opacity=".35"/><path d="M20 11 q1 -5 4 -6" stroke="#6B4A30" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M21 9 q6 -4 9 1 q-5 3 -9 -1 Z" fill="#6DB36A"/>',
  berries: '<path d="M12 16 q6 -3 9 2 q-1 13 -6 14 q-5 -2 -3 -16 Z" fill="#E2453A"/><path d="M21 15 q6 -3 9 2 q-1 13 -6 14 q-5 -2 -3 -16 Z" fill="#F0605A"/><path d="M12 15 l3 -3 l3 3 M21 14 l3 -3 l3 3" stroke="#5FA35C" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="15" cy="22" r=".8" fill="#FFE7A0"/><circle cx="17" cy="26" r=".8" fill="#FFE7A0"/><circle cx="25" cy="21" r=".8" fill="#FFE7A0"/><circle cx="27" cy="25" r=".8" fill="#FFE7A0"/>',
  cookie: '<circle cx="20" cy="20" r="13" fill="#D9A15E"/><circle cx="20" cy="20" r="13" fill="none" stroke="#B87A3A" stroke-width="1.5"/><circle cx="15" cy="16" r="2" fill="#5E3A20"/><circle cx="24" cy="15" r="1.6" fill="#5E3A20"/><circle cx="22" cy="23" r="2.2" fill="#5E3A20"/><circle cx="14" cy="24" r="1.5" fill="#5E3A20"/>',
  honey: '<path d="M11 15 h18 l-2 18 q-7 3 -14 0 Z" fill="#F2B33D"/><rect x="10" y="10" width="20" height="6" rx="2" fill="#B87A3A"/><path d="M13 22 q7 3 14 0" stroke="#fff" stroke-width="1.6" opacity=".5" fill="none"/><path d="M14 16 q0 5 -1 7" stroke="#E9A23B" stroke-width="3" stroke-linecap="round"/>',
  fish: '<path d="M8 20 q9 -10 20 0 q-11 10 -20 0 Z" fill="#E9B26A"/><path d="M27 20 l7 -6 v12 Z" fill="#D9A15E"/><circle cx="13" cy="19" r="1.4" fill="#5E3A20"/><path d="M17 16 q2 4 0 8 M21 16 q2 4 0 8" stroke="#C98F4A" stroke-width="1.2" fill="none"/>',
  carrot: '<path d="M14 14 L28 30 Q22 33 11 17 Z" fill="#F08A3C"/><path d="M16 19 l3 -1 M19 23 l3 -1 M22 27 l3 -1" stroke="#D9762A" stroke-width="1.2"/><path d="M13 15 q-6 -5 -3 -9 q3 3 5 7 M14 14 q-1 -7 3 -9 q1 5 -1 9" fill="#6DB36A"/>'
};
const snackSVG = (id) => `<svg viewBox="0 0 40 40" aria-hidden="true">${SNACK_ART[id]}</svg>`;
Object.assign(ICON, {
  feed: '<path d="M12 7c-1.5-2-4-2.5-5.5-1C4 8 4.5 13 6.5 16.5 8 19 10 21 12 20c2 1 4-1 5.5-3.5C19.5 13 20 8 17.5 6c-1.5-1.5-4-1-5.5 1Z"/><path d="M12 7c0-2 1-3.5 2.5-4"/>',
  play: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-2 3-2 14 0 17M3.5 12c3-2 14-2 17 0"/>',
  talk: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z"/><path d="M8.5 10h.01M12 10h.01M15.5 10h.01"/>',
  nap: '<path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z"/>',
  wake: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  photo: '<path d="M4 8.5A2 2 0 0 1 6 6.5h2l1.5-2h5l1.5 2h2a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.5"/>',
  letter: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M4 7l8 6 8-6"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>'
});
const HEART_W = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" fill="#fff"/></svg>`;
function letterSVG() { return `<svg viewBox="0 0 60 46" aria-hidden="true"><ellipse cx="30" cy="43" rx="22" ry="3" fill="#3A2510" opacity=".18"/><rect x="6" y="8" width="48" height="32" rx="4" fill="#FFF8EA" stroke="#E2D2B8" stroke-width="1.5"/><path d="M7 10 L30 27 L53 10" fill="none" stroke="#D9C4A4" stroke-width="2"/><circle cx="30" cy="26" r="6" fill="#E2654F"/><path d="M30 29.5s-3.2-2-3.2-4.3a1.8 1.8 0 0 1 3.2-1.1 1.8 1.8 0 0 1 3.2 1.1c0 2.3-3.2 4.3-3.2 4.3Z" fill="#fff"/></svg>`; }
