/* =================== v7: negozio con prova, tanti oggetti nuovi, niente felicità =================== */

/* --- Pareti nuove --- */
const WALL_STYLE = { w_wood: "wood", w_clouds: "clouds", w_check: "check" };
Object.assign(WALLS, { w_mint: ["#D6EFE6", "#C6E6DA"], w_peach: ["#FBE1CF", "#F5D2BA"], w_wood: ["#E2C29C", "#D6B48B"], w_clouds: ["#CFE6F5", "#FFFFFF"], w_check: ["#F6E7D8", "#EBC9C0"] });
const CLOUD_SPOTS = [[196, 30, 1], [300, 44, 0.9], [240, 74, 1.1], [334, 104, 0.8], [186, 122, 0.85], [276, 132, 0.7], [354, 20, 0.6]];
function cloudPuff(x, y, k, op = 0.9) {
  return `<g opacity="${op}" transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="4" rx="17" ry="7" fill="#fff"/><circle cx="-7" cy="0" r="7" fill="#fff"/><circle cx="4" cy="-2" r="9" fill="#fff"/><circle cx="12" cy="3" r="5.5" fill="#fff"/></g>`;
}
function wallPattern(style, w1, w2, top = 0) {
  let o = "";
  if (style === "wood") {
    for (let x = 0, i = 0; x < 360; x += 30, i++) {
      o += `<rect x="${x}" y="${-top}" width="30" height="${152 + top}" fill="${i % 2 ? w2 : w1}"/><rect x="${x}" y="${-top}" width="1.6" height="${152 + top}" fill="#7A5230" opacity=".28"/>`;
      o += `<path d="M${x + 9 + (i % 3) * 4} ${-top} C${x + 13} 40 ${x + 5} 80 ${x + 11} 152" stroke="#A97B4F" stroke-width="1" fill="none" opacity=".22"/>`;
    }
    [[48, 40], [132, 98], [226, 30], [318, 112], [262, 74], [196, 136]].forEach(([x, y]) => { o += `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.2" fill="#9C6E44" opacity=".45"/><ellipse cx="${x}" cy="${y}" rx="6" ry="3.6" fill="none" stroke="#9C6E44" stroke-width=".8" opacity=".25"/>`; });
  } else if (style === "clouds") {
    CLOUD_SPOTS.forEach(([x, y, k]) => { o += cloudPuff(x, y, k); });
    for (let yy = -60; yy > -top; yy -= 70) [[60, 0.9], [200, 1], [310, 0.8]].forEach(([x, k], j) => { o += cloudPuff(x + ((yy / 70) % 2 ? 30 : 0), yy + j * 14, k); });
    [[220, 50], [320, 76], [170, 96], [290, 18], [350, 140], [10, 146]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".8"/>`; });
  } else if (style === "check") {
    for (let x = 0; x < 360; x += 24) o += `<rect x="${x}" y="${-top}" width="12" height="${152 + top}" fill="${w2}" opacity=".5"/>`;
    for (let y = -24 * Math.ceil(top / 24); y < 152; y += 24) o += `<rect x="0" y="${y}" width="360" height="12" fill="${w2}" opacity=".5"/>`;
  }
  return o;
}

/* --- Tende --- */
const CURTAINS = { curt_pink: ["#E9B7A6", "#D59C89", false], curt_blue: ["#A9C8E8", "#7FA6D2", true], curt_green: ["#B5D6B2", "#8FB98B", false], curt_lace: ["#F7F3EC", "#D9CFBE", true] };
function curtainColors(furn) { const c = (furn || []).find((x) => CURTAINS[x]); return CURTAINS[c] || CURTAINS.curt_pink; }

/* --- Oggetti alternativi della stanza (coordinate della stanza 360x300) --- */
function quadPt(p0, c, p1, t) { const u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]; }
function potSVG(c1, c2, deco) {
  return `<ellipse cx="322" cy="250" rx="22" ry="5" fill="#000" opacity=".12"/><path d="M300 212 L340 212 L334 246 C334 250 306 250 306 246 Z" fill="${c1}"/><path d="M304 214 L310 246" stroke="#fff" stroke-width="3" opacity=".22" stroke-linecap="round"/><rect x="298" y="208" width="44" height="9" rx="4" fill="${c2}"/>${deco || ""}`;
}
function furnAlt(slot, furn, lit, lampId) {
  const has = (k) => furn.includes(k);
  let o = "";
  if (slot === "ceiling") {
    if (has("bunting")) {
      const cols = ["#E2654F", "#FFD25E", "#7AA3DC", "#74BD87", "#F29BB8"]; let k = 0;
      o += `<path d="M166 14 Q213 36 260 14 Q307 36 354 14" stroke="#6B5A47" stroke-width="1.5" fill="none"/>`;
      [[[166, 14], [213, 36], [260, 14]], [[260, 14], [307, 36], [354, 14]]].forEach(([a, c, b]) => {
        for (let t = 0.12; t < 0.95; t += 0.19) { const [x, y] = quadPt(a, c, b, t); o += `<path d="M${(x - 7).toFixed(1)} ${(y - 0.6).toFixed(1)} L${(x + 7).toFixed(1)} ${(y - 0.6).toFixed(1)} L${x.toFixed(1)} ${(y + 15).toFixed(1)} Z" fill="${cols[k++ % 5]}"/><path d="M${(x - 4).toFixed(1)} ${(y + 1.5).toFixed(1)} L${(x - 1).toFixed(1)} ${(y + 8).toFixed(1)}" stroke="#fff" stroke-width="1.2" opacity=".35" stroke-linecap="round"/>`; }
      });
    }
    if (has("lanterns")) {
      [[200, 30, "#F2A65A", "#D9823A"], [262, 18, "#F29BB8", "#D97A9C"], [324, 38, "#FFD25E", "#E0A92E"]].forEach(([x, len, c, d]) => {
        const cy = len + 15;
        if (lit) o += `<circle cx="${x}" cy="${cy}" r="26" fill="${c}" opacity=".22"/>`;
        o += `<line x1="${x}" y1="${-SCENE_TOP}" x2="${x}" y2="${len}" stroke="#6B5A47" stroke-width="1.4"/><ellipse cx="${x}" cy="${cy}" rx="14" ry="15" fill="${lit ? c : d}"/><ellipse cx="${x}" cy="${cy}" rx="14" ry="15" fill="${c}" opacity="${lit ? 1 : 0.85}"/><ellipse cx="${x}" cy="${cy}" rx="7" ry="15" fill="none" stroke="${d}" stroke-width="1.2" opacity=".6"/><line x1="${x}" y1="${cy - 15}" x2="${x}" y2="${cy + 15}" stroke="${d}" stroke-width="1" opacity=".5"/><ellipse cx="${x - 5}" cy="${cy - 5}" rx="3" ry="5" fill="#fff" opacity="${lit ? 0.5 : 0.3}"/><rect x="${x - 6}" y="${len - 1}" width="12" height="4" rx="1.5" fill="#6B5A47"/><rect x="${x - 5}" y="${cy + 13}" width="10" height="3.5" rx="1.5" fill="#6B5A47"/>`;
      });
    }
  } else if (slot === "wallart") {
    if (has("poster")) {
      const st = [[12, 30], [22, 22], [31, 26], [38, 16], [50, 20], [54, 34], [43, 38]];
      o += `<g transform="translate(176 56)"><rect x="2" y="3" width="62" height="50" rx="3" fill="#000" opacity=".1"/><rect width="62" height="50" rx="3" fill="#2E3A6B"/><rect x="3" y="3" width="56" height="44" rx="2" fill="#34427A"/><path d="M${st.map((p) => p.join(" ")).join(" L")}" stroke="#9FB2E8" stroke-width="1" fill="none" opacity=".75"/>${st.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.6 : 2.3}" fill="#FFE7A0"/>`).join("")}${[[8, 8], [26, 42], [48, 44], [58, 8], [20, 10], [6, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#fff" opacity=".7"/>`).join("")}<circle cx="49" cy="9" r="5" fill="#F8F1D4"/><circle cx="51.5" cy="7.5" r="4.4" fill="#34427A"/><rect x="-3" y="-3" width="12" height="5" rx="1" fill="#F2E3C2" opacity=".9" transform="rotate(-30 3 0)"/><rect x="53" y="-3" width="12" height="5" rx="1" fill="#F2E3C2" opacity=".9" transform="rotate(30 59 0)"/></g>`;
    }
    if (has("mirror")) {
      o += `<g><path d="M197 50 L207 38 L217 50" stroke="#8E6440" stroke-width="1.4" fill="none"/><circle cx="207" cy="38" r="2" fill="#8E6440"/><ellipse cx="209" cy="85" rx="28" ry="30" fill="#000" opacity=".1"/><ellipse cx="207" cy="82" rx="28" ry="30" fill="#D9A55A"/><ellipse cx="207" cy="82" rx="28" ry="30" fill="none" stroke="#B7843E" stroke-width="2"/><ellipse cx="207" cy="82" rx="22" ry="24" fill="#D8EEF4"/><ellipse cx="207" cy="92" rx="22" ry="14" fill="#C5E2EC" opacity=".7"/><path d="M193 76 L205 62" stroke="#fff" stroke-width="4" opacity=".75" stroke-linecap="round"/><path d="M197 86 L215 66" stroke="#fff" stroke-width="2.4" opacity=".5" stroke-linecap="round"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(207 + 25 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(82 + 27 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="1.6" fill="#FFE7A0"/>`).join("")}</g>`;
    }
  } else if (slot === "shelf") {
    if (has("shelf_crystals")) {
      o += `<g transform="translate(258 92)">${lit ? `<circle cx="18" cy="12" r="20" fill="#C9B6FF" opacity=".25"/><circle cx="46" cy="6" r="14" fill="#FFD27A" opacity=".3"/>` : ""}<rect x="2" y="25" width="84" height="7" rx="3" fill="#000" opacity=".08"/><rect x="0" y="22" width="84" height="7" rx="3" fill="#9A6B43"/><path d="M12 29 L10 38 M74 29 L76 38" stroke="#7E5534" stroke-width="3" stroke-linecap="round"/>
      <path d="M6 22 L9 8 L14 4 L17 10 L16 22 Z" fill="#A98BE8"/><path d="M14 4 L17 10 L16 22 L12 22 Z" fill="#8E6FD6"/><path d="M15 22 L19 0 L24 -4 L28 4 L26 22 Z" fill="#B9A3F2"/><path d="M24 -4 L28 4 L26 22 L22 22 Z" fill="#9B83E6"/><path d="M18 3 L21 -1" stroke="#fff" stroke-width="1.2" opacity=".7" stroke-linecap="round"/><path d="M25 22 L28 12 L32 10 L33 22 Z" fill="#CDBDF7"/>
      <rect x="42" y="10" width="8" height="12" rx="1.5" fill="#FFF4E0"/><path d="M46 10 L46 7" stroke="#5B3A1A" stroke-width="1"/><path d="M46 1 C48.5 4 48.5 6.5 46 7.5 C43.5 6.5 43.5 4 46 1 Z" fill="${lit ? "#FFC94D" : "#FFD98A"}"/>
      <path d="M58 22 L60 13 L70 13 L72 22 Z" fill="#D98A63"/><rect x="61.5" y="2" width="7" height="12" rx="3.5" fill="#6DB36A"/><path d="M61.5 7 h-3 v-3" stroke="#6DB36A" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="65" cy="2" r="2" fill="#F29BB8"/>
      <path d="M76 22 L78 15 L81 13 L83 16 L82 22 Z" fill="#8FD3C9"/></g>`;
    }
  } else if (slot === "rug") {
    if (has("rug_rainbow")) {
      o += `<ellipse cx="183" cy="273" rx="122" ry="24" fill="#5B3A1A" opacity=".12"/>`;
      [[122, 24, "#E8806A"], [106, 20.5, "#F2B35E"], [90, 17, "#F5D774"], [74, 14, "#9ED08F"], [58, 11, "#8CBDE8"], [42, 8, "#B9A3F2"]].forEach(([rx, ry, c]) => { o += `<ellipse cx="180" cy="268" rx="${rx}" ry="${ry}" fill="${c}"/>`; });
      o += `<ellipse cx="180" cy="268" rx="116" ry="22" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round" opacity=".7"/>`;
    }
    if (has("rug_blue")) {
      o += `<path d="M82 252 L286 252 L310 294 L58 294 Z" fill="#5B3A1A" opacity=".12"/><path d="M78 248 L282 248 L306 290 L54 290 Z" fill="#5E86C2"/><path d="M88 253 L272 253 L292 285 L68 285 Z" fill="none" stroke="#F3EBDD" stroke-width="2.4"/>`;
      for (let x = 100; x <= 260; x += 32) o += `<path d="M${x} 261 L${x + 9} 269 L${x} 277 L${x - 9} 269 Z" fill="none" stroke="#F3EBDD" stroke-width="2"/><circle cx="${x}" cy="269" r="2" fill="#F2B33D"/>`;
      for (let x = 80; x <= 280; x += 8) o += `<line x1="${x}" y1="248" x2="${x - 1}" y2="243" stroke="#F3EBDD" stroke-width="1.6" stroke-linecap="round"/>`;
      for (let x = 56; x <= 304; x += 8) o += `<line x1="${x}" y1="290" x2="${x + 1}" y2="296" stroke="#F3EBDD" stroke-width="1.6" stroke-linecap="round"/>`;
    }
    if (has("rug_sheep")) {
      o += `<ellipse cx="186" cy="274" rx="112" ry="22" fill="#5B3A1A" opacity=".12"/>`;
      [[124, 289], [154, 291], [214, 291], [244, 289]].forEach(([x, y]) => { o += `<ellipse cx="${x}" cy="${y}" rx="7" ry="3.6" fill="#4A4040"/>`; });
      for (let a = 0; a < 360; a += 18) { const r = (a * Math.PI) / 180; o += `<circle cx="${(184 + 100 * Math.cos(r)).toFixed(1)}" cy="${(268 + 19 * Math.sin(r)).toFixed(1)}" r="9" fill="#FBF7F0"/>`; }
      o += `<ellipse cx="184" cy="268" rx="100" ry="19" fill="#FBF7F0"/>`;
      [[130, 266], [160, 274], [196, 262], [228, 274], [252, 264], [176, 280], [214, 280], [150, 258]].forEach(([x, y]) => { o += `<path d="M${x - 5} ${y} q5 -5 10 0" stroke="#E2D8C8" stroke-width="1.6" fill="none" stroke-linecap="round"/>`; });
      o += `<g><ellipse cx="287" cy="252" rx="6" ry="3.4" fill="#4A4040" transform="rotate(-30 287 252)"/><ellipse cx="303" cy="254" rx="6" ry="3.4" fill="#4A4040" transform="rotate(30 303 254)"/><ellipse cx="295" cy="263" rx="13" ry="10" fill="#4A4040"/><circle cx="290" cy="261" r="1.6" fill="#fff"/><circle cx="300" cy="261" r="1.6" fill="#fff"/><ellipse cx="295" cy="268" rx="3" ry="1.6" fill="#F4A3A3" opacity=".8"/><circle cx="291" cy="253" r="6" fill="#FBF7F0"/><circle cx="298" cy="252" r="5" fill="#FBF7F0"/></g>`;
    }
  } else if (slot === "lamp") {
    const table = `<ellipse cx="45" cy="262" rx="24" ry="5" fill="#000" opacity=".12"/><rect x="28" y="228" width="4" height="32" fill="#7E5534"/><rect x="58" y="228" width="4" height="32" fill="#7E5534"/><rect x="28" y="244" width="34" height="3" fill="#7E5534"/><rect x="24" y="222" width="42" height="7" rx="3" fill="#9A6B43"/><rect x="24" y="222" width="42" height="2" rx="1" fill="#fff" opacity=".25"/>`;
    if (has("lamp_moon")) {
      if (lit && lampId) o += `<circle cx="45" cy="202" r="52" fill="url(#${lampId})"/>`;
      o += `<g>${table}<path d="M39 222 L51 222 L48 214 L42 214 Z" fill="#6B5A47"/><circle cx="45" cy="201" r="14" fill="${lit ? "#FFF3C9" : "#EFE6CF"}"/><circle cx="40" cy="197" r="3" fill="#D9CBA6" opacity=".7"/><circle cx="50" cy="205" r="2.4" fill="#D9CBA6" opacity=".7"/><circle cx="48" cy="194" r="1.6" fill="#D9CBA6" opacity=".7"/><circle cx="39" cy="207" r="1.3" fill="#D9CBA6" opacity=".7"/><path d="M36 195 A11 11 0 0 1 44 189" stroke="#fff" stroke-width="2" opacity=".7" fill="none" stroke-linecap="round"/></g>`;
    }
    if (has("lamp_lava")) {
      if (lit && lampId) o += `<circle cx="45" cy="198" r="48" fill="url(#${lampId})"/>`;
      o += `<g>${table}<path d="M36 222 L54 222 L51 211 L39 211 Z" fill="#6B5A47"/><path d="M39 211 L51 211 L48 183 L42 183 Z" fill="${lit ? "#FFB27A" : "#F7C3A0"}"/><ellipse class="lava1" cx="45" cy="204" rx="4.6" ry="3.4" fill="#E2454A"/><ellipse class="lava2" cx="44" cy="195" rx="2.6" ry="3.4" fill="#E2454A"/><circle cx="46.5" cy="188.5" r="1.6" fill="#E2454A"/><path d="M41 207 L43 186" stroke="#fff" stroke-width="1.4" opacity=".5" stroke-linecap="round"/><path d="M42 183 L48 183 L46.5 175 L43.5 175 Z" fill="#6B5A47"/></g>`;
    }
  } else if (slot === "floorL") {
    if (has("books")) {
      o += `<g><ellipse cx="97" cy="268" rx="28" ry="5" fill="#000" opacity=".12"/>`;
      [[74, 254, 46, 12, "#7AA3DC", 0], [78, 243, 40, 11, "#E2654F", -2], [75, 233, 44, 10, "#F2C063", 1.5], [80, 224, 36, 9, "#74BD87", -1]].forEach(([x, y, w, h, c, r]) => {
        o += `<g transform="rotate(${r} ${x + w / 2} ${y + h / 2})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${c}"/><rect x="${x + w - 5}" y="${y + 2}" width="3.5" height="${h - 4}" fill="#FFF8EA" opacity=".9"/><rect x="${x + 5}" y="${y + h / 2 - 1}" width="${w * 0.4}" height="2" rx="1" fill="#fff" opacity=".45"/></g>`;
      });
      o += `<rect x="91" y="212" width="12" height="12" rx="2.5" fill="#FFF4EE"/><path d="M103 215 q5 0 5 3.5 q0 3.5 -5 3.5" stroke="#FFF4EE" stroke-width="2" fill="none"/><rect x="91" y="215" width="12" height="3" fill="#E2654F" opacity=".7"/><path d="M95 208 q-2 -3 0 -6 M99 208 q2 -3 0 -6" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/></g>`;
    }
    if (has("yarn")) {
      o += `<g><ellipse cx="97" cy="269" rx="27" ry="5" fill="#000" opacity=".12"/><path d="M100 236 L114 212 M104 236 L120 216" stroke="#8E6440" stroke-width="2" stroke-linecap="round"/><circle cx="114" cy="212" r="2.2" fill="#E2654F"/><circle cx="120" cy="216" r="2.2" fill="#7AA3DC"/><circle cx="87" cy="241" r="9" fill="#E2654F"/><path d="M80 237 q7 -4 14 2 M80 243 q7 -4 15 1" stroke="#C8503B" stroke-width="1.2" fill="none"/><circle cx="104" cy="239" r="10" fill="#9B79D4"/><path d="M96 236 q8 -5 16 2 M96 242 q8 -5 17 1" stroke="#7F5DC0" stroke-width="1.2" fill="none"/><path d="M74 246 L120 246 L115 267 Q97 272 79 267 Z" fill="#C99A5E"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${80 + i * 9} 249 L${81 + i * 8.5} 266" stroke="#A9784E" stroke-width="1" opacity=".6"/>`).join("")}<path d="M76 256 Q97 259 118 256" stroke="#A9784E" stroke-width="1" fill="none" opacity=".6"/><rect x="72" y="242" width="50" height="7" rx="3.5" fill="#B5875A"/><path d="M86 249 C92 262 118 262 132 268" stroke="#E2654F" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
    }
  } else if (slot === "floorR") {
    if (has("guitar")) {
      o += `<ellipse cx="252" cy="267" rx="18" ry="4" fill="#000" opacity=".12"/><g transform="rotate(-14 250 264)"><rect x="247.5" y="200" width="5" height="32" fill="#9A6B43"/><rect x="246" y="190" width="8" height="12" rx="2" fill="#7E5534"/>${[[244.5, 194], [244.5, 199], [255.5, 194], [255.5, 199]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#E9D6C0"/>`).join("")}<circle cx="250" cy="250" r="14" fill="#D9955A"/><circle cx="250" cy="232" r="10.5" fill="#D9955A"/><circle cx="250" cy="250" r="14" fill="none" stroke="#B5743F" stroke-width="1.2"/><circle cx="250" cy="237" r="4.5" fill="#5B3A1A"/><rect x="244" y="251" width="12" height="3" rx="1" fill="#7E5534"/>${[248.5, 249.5, 250.5, 251.5].map((x) => `<line x1="${x}" y1="193" x2="${x}" y2="252" stroke="#F3EBDD" stroke-width=".55"/>`).join("")}<path d="M241 244 q-2 6 1 12" stroke="#fff" stroke-width="1.6" opacity=".35" fill="none" stroke-linecap="round"/></g>`;
    }
  } else if (slot === "plant") {
    if (has("cactus")) {
      o += `<g class="plantg" style="transform-box:fill-box;transform-origin:50% 100%"><rect x="312" y="164" width="16" height="50" rx="8" fill="#6DB36A"/><path d="M313 198 H305 Q300 198 300 193 V182" stroke="#6DB36A" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M327 190 H335 Q339 190 339 185 V174" stroke="#6DB36A" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M320 168 V210 M315.5 172 V208 M324.5 172 V208" stroke="#5A985A" stroke-width="1" opacity=".55"/>${[[316, 180], [324, 190], [316, 200], [302, 186], [338, 180], [324, 176]].map(([x, y]) => `<path d="M${x} ${y} l2 -1.5" stroke="#fff" stroke-width="1" opacity=".8" stroke-linecap="round"/>`).join("")}${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="320" cy="158" rx="3" ry="5" fill="#F29BB8" transform="rotate(${a} 320 162)"/>`).join("")}<circle cx="320" cy="162" r="2.4" fill="#FFD25E"/></g>` + potSVG("#E9D6C0", "#D9BFA3", `<circle cx="312" cy="230" r="2" fill="#7AA3DC"/><circle cx="320" cy="234" r="2" fill="#E2654F"/><circle cx="328" cy="230" r="2" fill="#7AA3DC"/>`);
    }
    if (has("sunflower")) {
      o += `<g class="plantg" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M320 212 C320 192 316 176 318 156" stroke="#5FA35C" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M319 196 C306 192 300 182 302 176 C312 178 318 186 319 196 Z" fill="#6DB36A"/><path d="M319 186 C332 184 338 174 336 168 C326 170 320 178 319 186 Z" fill="#7FC27B"/>${[...Array(12)].map((_, i) => `<ellipse cx="318" cy="142" rx="4.6" ry="9.5" fill="${i % 2 ? "#FFC94D" : "#F7B733"}" transform="rotate(${i * 30} 318 154)"/>`).join("")}<circle cx="318" cy="154" r="8.5" fill="#8C5E2A"/>${[[315, 151], [321, 152], [318, 157], [314, 156], [322, 157]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#5B3A1A"/>`).join("")}</g>` + potSVG("#D98A63", "#C77650");
    }
    if (has("monstera")) {
      const leaf = (tx, ty, rot, sc, c) => `<g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${sc})"><path d="M0 0 C-22 -4 -28 -32 -6 -46 C0 -49 6 -47 9 -42 C28 -30 22 -4 0 0 Z" fill="${c}"/><path d="M0 0 C1 -16 2 -30 2 -44" stroke="#3F7F4A" stroke-width="1.6" fill="none"/><path d="M1 -12 L-14 -16 M1 -22 L-16 -30 M2 -32 L-10 -42 M1 -14 L14 -20 M2 -26 L15 -34" stroke="#3F7F4A" stroke-width="1.1" opacity=".7"/><path d="M-18 -18 L-12 -17 M-19 -30 L-14 -29 M16 -22 L12 -21" stroke="#3F7F4A" stroke-width="2.4" opacity=".55" stroke-linecap="round"/></g>`;
      o += `<g class="plantg" style="transform-box:fill-box;transform-origin:50% 100%"><path d="M320 212 C314 196 306 186 298 178 M320 212 C324 194 334 182 342 176 M320 212 C320 190 320 172 322 160" stroke="#4E8F57" stroke-width="2.4" fill="none"/>${leaf(300, 184, -50, 0.8, "#4E9A5B")}${leaf(336, 182, 44, 0.7, "#5FA86A")}${leaf(321, 168, -4, 0.9, "#6DB36A")}</g>` + potSVG("#F2EEE6", "#D9CFBE", `<rect x="303" y="228" width="35" height="3" fill="#E2B85C" opacity=".8"/>`);
    }
  }
  return o;
}

/* --- Cappelli nuovi: b = linea della tesa, centro x = 100 --- */
const HAT_ART = {
  h_party: (b) => `<g transform="rotate(-8 100 ${b})"><path d="M76 ${b + 4} L124 ${b + 4} L102 ${b - 52} Z" fill="#7AA3DC"/><path d="M102 ${b - 52} L124 ${b + 4} L112 ${b + 4} Z" fill="#000" opacity=".08"/><circle cx="92" cy="${b - 9}" r="3.4" fill="#FFD25E"/><circle cx="109" cy="${b - 4}" r="3.4" fill="#F29BB8"/><circle cx="101" cy="${b - 24}" r="3" fill="#FFD25E"/><circle cx="96" cy="${b - 1}" r="2.6" fill="#fff"/><circle cx="104" cy="${b - 13}" r="2.4" fill="#fff"/><circle cx="101" cy="${b - 38}" r="2.2" fill="#F29BB8"/><path d="M74 ${b + 4} Q100 ${b + 10} 126 ${b + 4}" stroke="#FFD25E" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M98 ${b - 54} l-4 -6 M102 ${b - 56} l0 -7 M106 ${b - 54} l4 -6" stroke="#F29BB8" stroke-width="2" stroke-linecap="round"/><circle cx="102" cy="${b - 53}" r="5.5" fill="#F29BB8"/></g>`,
  h_wizard: (b) => `<ellipse cx="100" cy="${b + 3}" rx="50" ry="10" fill="#3F347F"/><path d="M70 ${b} C76 ${b - 30} 92 ${b - 50} 120 ${b - 66} C112 ${b - 46} 122 ${b - 20} 130 ${b} Z" fill="#5B4BA8"/><path d="M112 ${b - 4} C114 ${b - 24} 112 ${b - 40} 118 ${b - 60}" stroke="#000" stroke-width="5" opacity=".08" fill="none" stroke-linecap="round"/><path d="M71 ${b - 7} Q100 ${b - 1} 129 ${b - 7} L130 ${b} Q100 ${b + 6} 70 ${b} Z" fill="#FFD25E"/><path d="M96 ${b - 31} l1.6 3.6 3.8 .4 -2.9 2.5 .9 3.7 -3.4 -2 -3.4 2 .9 -3.7 -2.9 -2.5 3.8 -.4 Z" fill="#FFE7A0"/><path d="M112 ${b - 20} l1.2 2.6 2.8 .3 -2.1 1.9 .6 2.7 -2.5 -1.4 -2.5 1.4 .6 -2.7 -2.1 -1.9 2.8 -.3 Z" fill="#FFE7A0"/><path d="M107 ${b - 46} l1 2 2.2 .3 -1.6 1.5 .5 2.1 -2.1 -1.1 -2 1.1 .4 -2.1 -1.6 -1.5 2.2 -.3 Z" fill="#FFE7A0"/><circle cx="86" cy="${b - 16}" r="5" fill="#FFE7A0"/><circle cx="88.5" cy="${b - 17.5}" r="4.4" fill="#5B4BA8"/>`,
  h_crown: (b) => `<path d="M70 ${b + 6} L70 ${b - 18} L85 ${b - 4} L100 ${b - 30} L115 ${b - 4} L130 ${b - 18} L130 ${b + 6} Z" fill="#F2B33D" stroke="#C9861F" stroke-width="1.6" stroke-linejoin="round"/><path d="M100 ${b - 30} L115 ${b - 4} L130 ${b - 18} L130 ${b + 6} L112 ${b + 6} Z" fill="#000" opacity=".07"/><rect x="70" y="${b - 2}" width="60" height="8" fill="#E09A25"/><circle cx="70" cy="${b - 20}" r="3.6" fill="#FFE7A0"/><circle cx="100" cy="${b - 33}" r="4.2" fill="#FFE7A0"/><circle cx="130" cy="${b - 20}" r="3.6" fill="#FFE7A0"/><circle cx="100" cy="${b + 2}" r="3.6" fill="#E2454A"/><circle cx="84" cy="${b + 2}" r="2.7" fill="#7AA3DC"/><circle cx="116" cy="${b + 2}" r="2.7" fill="#74BD87"/><circle cx="99" cy="${b + 1}" r="1.1" fill="#fff" opacity=".8"/><path d="M76 ${b - 8} L76 ${b - 13}" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>`,
  h_phones: (b) => `<path d="M46 ${b + 24} C46 ${b - 34} 154 ${b - 34} 154 ${b + 24}" stroke="#3E3A6B" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M52 ${b + 6} C58 ${b - 20} 80 ${b - 26} 96 ${b - 26}" stroke="#6E6AA0" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="36" y="${b + 14}" width="18" height="30" rx="9" fill="#E2654F"/><rect x="146" y="${b + 14}" width="18" height="30" rx="9" fill="#E2654F"/><rect x="48" y="${b + 18}" width="7" height="22" rx="3.5" fill="#3E3A6B"/><rect x="145" y="${b + 18}" width="7" height="22" rx="3.5" fill="#3E3A6B"/><path d="M40 ${b + 20} v14" stroke="#fff" stroke-width="2" opacity=".45" stroke-linecap="round"/><path d="M150 ${b + 20} v14" stroke="#fff" stroke-width="2" opacity=".45" stroke-linecap="round"/>`,
  h_bunny: (b) => `<g transform="rotate(-14 86 ${b - 12})"><ellipse cx="86" cy="${b - 38}" rx="9.5" ry="26" fill="#FFF4EE" stroke="#E6D3C8" stroke-width="1.2"/><ellipse cx="86" cy="${b - 36}" rx="4.8" ry="18" fill="#F7B6C8"/></g><g transform="rotate(18 114 ${b - 12})"><path d="M104.5 ${b - 12} C104 ${b - 34} 108 ${b - 52} 114 ${b - 56} C122 ${b - 52} 124 ${b - 40} 123.5 ${b - 30} C122 ${b - 24} 120 ${b - 16} 123.5 ${b - 12} Z" fill="#FFF4EE" stroke="#E6D3C8" stroke-width="1.2"/><path d="M109 ${b - 14} C109 ${b - 32} 111 ${b - 46} 114 ${b - 49} C118 ${b - 44} 119 ${b - 34} 118 ${b - 26} C117 ${b - 22} 116 ${b - 18} 118.5 ${b - 14} Z" fill="#F7B6C8"/></g><path d="M64 ${b + 2} Q100 ${b - 26} 136 ${b + 2}" stroke="#F29BB8" stroke-width="5.5" fill="none" stroke-linecap="round"/>`,
  h_bow: (b) => `<g transform="translate(118 ${b - 16}) rotate(-12) scale(1.35)"><path d="M-2 2 L-9 16 L-4 14 L-1 18 Z" fill="#C8503B"/><path d="M2 2 L9 16 L4 14 L1 18 Z" fill="#C8503B"/><path d="M0 0 C-10 -14 -24 -10 -20 2 C-17 10 -6 6 0 0 Z" fill="#E2654F"/><path d="M0 0 C10 -14 24 -10 20 2 C17 10 6 6 0 0 Z" fill="#E2654F"/><circle cx="-13" cy="-3" r="1.6" fill="#fff" opacity=".85"/><circle cx="-8" cy="1" r="1.2" fill="#fff" opacity=".85"/><circle cx="13" cy="-3" r="1.6" fill="#fff" opacity=".85"/><circle cx="9" cy="1" r="1.2" fill="#fff" opacity=".85"/><circle cx="-16" cy="2" r="1.1" fill="#fff" opacity=".85"/><circle cx="0" cy="0" r="4.6" fill="#C8503B"/></g>`,
  h_frog: (b) => `<path d="M62 ${b} C62 ${b - 36} 138 ${b - 36} 138 ${b} Z" fill="#74BD87"/><path d="M118 ${b - 4} C122 ${b - 18} 116 ${b - 26} 108 ${b - 30}" stroke="#000" stroke-width="6" opacity=".07" fill="none" stroke-linecap="round"/><circle cx="80" cy="${b - 30}" r="11" fill="#74BD87"/><circle cx="120" cy="${b - 30}" r="11" fill="#74BD87"/><circle cx="80" cy="${b - 31}" r="7.5" fill="#fff"/><circle cx="120" cy="${b - 31}" r="7.5" fill="#fff"/><circle cx="81" cy="${b - 30}" r="3.8" fill="#33302E"/><circle cx="119" cy="${b - 30}" r="3.8" fill="#33302E"/><circle cx="82.5" cy="${b - 32}" r="1.3" fill="#fff"/><circle cx="120.5" cy="${b - 32}" r="1.3" fill="#fff"/><path d="M86 ${b - 12} Q100 ${b - 3} 114 ${b - 12}" stroke="#3F7F4A" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="76" cy="${b - 12}" rx="5" ry="3" fill="#F4A3A3" opacity=".7"/><ellipse cx="124" cy="${b - 12}" rx="5" ry="3" fill="#F4A3A3" opacity=".7"/><rect x="58" y="${b - 4}" width="84" height="12" rx="6" fill="#5FA35C"/>`,
  h_chef: (b) => `${[[82, b - 26, 15], [100, b - 34, 18], [118, b - 26, 15]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#E2DCD2" stroke-width="2.4"/>`).join("")}${[[82, b - 26, 13.8], [100, b - 34, 16.8], [118, b - 26, 13.8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join("")}<path d="M88 ${b - 40} C92 ${b - 46} 98 ${b - 48} 102 ${b - 48}" stroke="#E9E2D6" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="70" y="${b - 14}" width="60" height="18" rx="4" fill="#fff" stroke="#E2DCD2" stroke-width="2"/>${[84, 100, 116].map((x) => `<line x1="${x}" y1="${b - 11}" x2="${x}" y2="${b + 1}" stroke="#E9E2D6" stroke-width="1.6"/>`).join("")}`
};
const HAT_VB = { h_party: "62 30 76 70", h_wizard: "46 20 108 86", h_crown: "62 52 76 52", h_phones: "32 52 136 90", h_bunny: "56 28 88 72", h_bow: "86 50 62 48", h_frog: "54 46 92 58", h_chef: "60 38 80 62" };

/* --- Catalogo --- */
SHOP.push(
  { id: "rug_blue", kind: "furn", price: 70 }, { id: "rug_rainbow", kind: "furn", price: 80 }, { id: "rug_sheep", kind: "furn", price: 90 },
  { id: "lamp_lava", kind: "furn", price: 90 }, { id: "lamp_moon", kind: "furn", price: 100 }, { id: "lanterns", kind: "furn", price: 90 },
  { id: "cactus", kind: "furn", price: 50 }, { id: "sunflower", kind: "furn", price: 60 }, { id: "monstera", kind: "furn", price: 70 },
  { id: "poster", kind: "furn", price: 70 }, { id: "mirror", kind: "furn", price: 80 }, { id: "shelf_crystals", kind: "furn", price: 80 }, { id: "bunting", kind: "furn", price: 70 },
  { id: "books", kind: "furn", price: 60 }, { id: "yarn", kind: "furn", price: 60 }, { id: "guitar", kind: "furn", price: 90 },
  { id: "curt_pink", kind: "furn", price: 0, def: true }, { id: "curt_green", kind: "furn", price: 40 }, { id: "curt_blue", kind: "furn", price: 40 }, { id: "curt_lace", kind: "furn", price: 50 },
  { id: "h_party", kind: "wear", price: 50 }, { id: "h_bow", kind: "wear", price: 50 }, { id: "h_frog", kind: "wear", price: 60 }, { id: "h_chef", kind: "wear", price: 60 },
  { id: "h_bunny", kind: "wear", price: 70 }, { id: "h_phones", kind: "wear", price: 80 }, { id: "h_wizard", kind: "wear", price: 100 }, { id: "h_crown", kind: "wear", price: 150 },
  { id: "w_mint", kind: "wall", price: 40 }, { id: "w_peach", kind: "wall", price: 40 }, { id: "w_check", kind: "wall", price: 60 }, { id: "w_wood", kind: "wall", price: 70 }, { id: "w_clouds", kind: "wall", price: 80 }
);
const SLOT = {};
[["rug", "rug rug_rainbow rug_sheep rug_blue"], ["lamp", "lamp lamp_moon lamp_lava"], ["plant", "plant cactus sunflower monstera"], ["wallart", "frame poster mirror"], ["shelf", "shelf shelf_crystals"], ["ceiling", "lights bunting lanterns"], ["floorL", "pouf books yarn"], ["floorR", "teddy guitar"], ["curtain", "curt_pink curt_blue curt_green curt_lace"], ["clock", "clock"], ["fish", "fishbowl"]].forEach(([s, l]) => l.split(" ").forEach((id) => { SLOT[id] = s; }));
const GROUP = {};
[["rugs", "rug rug_blue rug_rainbow rug_sheep"], ["lights", "lamp lamp_lava lamp_moon lights lanterns"], ["plants", "plant cactus sunflower monstera"], ["walldeco", "frame clock shelf poster bunting mirror shelf_crystals"], ["floor", "pouf books yarn guitar teddy fishbowl"], ["curtains", "curt_pink curt_green curt_blue curt_lace"]].forEach(([g, l]) => l.split(" ").forEach((id) => { GROUP[id] = g; }));
const GROUP_ORDER = ["rugs", "lights", "plants", "walldeco", "floor", "curtains"];
const ALT_VB = { bunting: "164 6 192 36", lanterns: "176 -2 172 76", poster: "170 50 74 62", mirror: "174 34 68 82", shelf_crystals: "252 84 96 58", rug_rainbow: "54 240 256 56", rug_blue: "50 238 262 62", rug_sheep: "60 236 260 62", lamp_moon: "14 180 62 86", lamp_lava: "14 170 62 96", books: "66 202 62 72", yarn: "66 206 70 68", guitar: "222 186 56 86", cactus: "290 148 62 106", sunflower: "290 124 62 130", monstera: "276 126 88 128" };

const ownsItem = (s) => S.owned.includes(s.id) || !!s.def;
const lockedItem = (s) => !ownsItem(s) && (s.found || s.event || s.special || s.reward || (s.coll && !plusActive()));
function withItem(furn, id) { const sl = SLOT[id]; return furn.filter((x) => x !== id && (!sl || SLOT[x] !== sl)).concat(id); }
function inUseItem(s) {
  if (s.kind === "furn") { if (CURTAINS[s.id]) return ((S.furn.find((x) => CURTAINS[x])) || "curt_pink") === s.id; return S.furn.includes(s.id); }
  return s.kind === "wear" ? S.hat === s.id : S.wall === s.id;
}
function applyItem(s) {
  if (s.kind === "furn") S.furn = withItem(S.furn, s.id); else if (s.kind === "wear") S.hat = s.id; else S.wall = s.id;
}
function lookWith(id) {
  const o = { furn: S.furn.slice(), hat: S.hat, wall: S.wall }; const s = id && SHOP.find((x) => x.id === id); if (!s) return o;
  if (s.kind === "furn") o.furn = withItem(o.furn, id); else if (s.kind === "wear") o.hat = id; else o.wall = id;
  return o;
}
const rank = (s) => (s.found || s.event || s.special || s.reward ? 100000 : 0) + (s.coll ? -200000 : 0) + s.price;
function shopList(kind) { return SHOP.filter((s) => s.kind === kind && seaShopOk(s)).map((s, i) => [s, i]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map((x) => x[0]); }

/* --- Anteprime nel negozio --- */
function curtainPair(c1, c2, dots) {
  return `<path d="M22 30 L58 30 C52 70 46 100 52 132 L22 132 Z" fill="${c1}"/><path d="M150 30 L114 30 C120 70 126 100 120 132 L150 132 Z" fill="${c1}"/>${dots ? [[32, 50], [42, 72], [30, 96], [44, 116], [140, 50], [130, 72], [142, 96], [128, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${c2}"/>`).join("") : ""}<path d="M22 30 L58 30 C52 70 46 100 52 132" fill="none" stroke="${c2}" stroke-width="2"/><path d="M150 30 L114 30 C120 70 126 100 120 132" fill="none" stroke="${c2}" stroke-width="2"/><rect x="16" y="24" width="140" height="8" rx="4" fill="#8E6440"/>`;
}
function wallSwatch(id) {
  const [a, b] = WALLS[id]; const c = nid("sw"); const st = WALL_STYLE[id];
  return `<svg viewBox="0 0 60 44" aria-hidden="true"><defs><clipPath id="${c}"><rect width="60" height="44" rx="8"/></clipPath></defs><g clip-path="url(#${c})"><rect width="60" height="44" fill="${a}"/>${st === "clouds" ? cloudPuff(18, 14, 0.7) + cloudPuff(44, 32, 0.6) + `<circle cx="46" cy="10" r="1.4" fill="#fff"/><circle cx="10" cy="34" r="1.4" fill="#fff"/>` : `<g transform="scale(.5)">${wallPattern(st, a, b)}</g>`}</g><rect x=".5" y=".5" width="59" height="43" rx="7.5" fill="none" stroke="#000" stroke-opacity=".06"/></svg>`;
}
const _itemArt = itemArt;
itemArt = function (id) {
  if (HAT_ART[id]) return `<svg viewBox="${HAT_VB[id]}" aria-hidden="true">${HAT_ART[id](92)}</svg>`;
  if (WALL_STYLE[id]) return wallSwatch(id);
  if (CURTAINS[id]) { const [a, b, d] = CURTAINS[id]; return `<svg viewBox="12 20 148 116" aria-hidden="true"><rect x="40" y="34" width="92" height="98" rx="8" fill="#CFE7F1"/>${curtainPair(a, b, d)}</svg>`; }
  if (ALT_VB[id]) return `<svg viewBox="${ALT_VB[id]}" aria-hidden="true">${furnAlt(SLOT[id], [id], true, null)}</svg>`;
  return _itemArt(id);
};

/* --- Negozio: si prova prima di comprare --- */
let tryId = null, tryScroll = 0;
function shopItem(s) {
  const t = L(); const own = ownsItem(s); const use = inUseItem(s); const trying = tryId === s.id;
  let state;
  if (trying) state = `<span class="state try">${t.tryOn}</span>`;
  else if (own) state = `<span class="state">${use ? t.using : t.use}</span>`;
  else if (s.event) state = `<span class="tag">${seaItemNow(s.id) ? t.season.fromPath : t.eventOnly}</span>`;
  else if (s.special) state = `<span class="tag">${t.specialOnly}</span>`;
  else if (s.found) state = `<span class="tag">${t.foundOnly}</span>`;
  else if (s.reward) state = `<span class="tag">${t.season.fromPath}</span>`;
  else if (s.coll && !plusActive()) state = `<span class="tag plus">${icon("p_crown")}Plus</span>`;
  else if (s.coll) state = `<span class="state">${t.coll.get}</span>`;
  else state = `<span class="price">${SEED}${s.price.toLocaleString(loc(), NUMG)}</span>`;
  const rar = s.rar && !own ? `<span class="rar r-${s.rar}">${t.rar[s.rar]}</span>` : "";
  return `<button class="item ${lockedItem(s) ? "locked" : ""} ${trying ? "trying" : ""} ${s.rar ? "rr-" + s.rar : ""}" aria-pressed="${use}" data-shop="${s.id}">${rar}<span class="art">${itemArt(s.id)}</span><span class="nm">${esc(t.items[s.id])}</span>${state}</button>`;
}
function tryBar() {
  const t = L(); const s = tryId && SHOP.find((x) => x.id === tryId); if (!s) return "";
  let act;
  if (s.event) act = `<span class="tag">${seaItemNow(s.id) ? t.season.fromPath : t.eventOnly}</span>`;
  else if (s.special) act = `<span class="tag">${t.specialOnly}</span>`;
  else if (s.found) act = `<span class="tag">${t.foundOnly}</span>`;
  else if (s.reward) act = `<span class="tag">${t.season.fromPath}</span>`;
  else if (s.coll && !plusActive()) act = `<button class="btn gold" id="tryPlus">${icon("p_crown")}${esc(t.coll.unlock)}</button>`;
  else if (s.coll) act = `<button class="btn" id="tryBuy">${esc(t.coll.get)}</button>`;
  else if (S.seeds < s.price) act = `<button class="btn" disabled>${esc(t.missSeeds(s.price - S.seeds))}</button>`;
  else act = `<button class="btn" id="tryBuy">${t.buyFor} · <span class="pr">${SEED}${s.price.toLocaleString(loc(), NUMG)}</span></button>`;
  return `<div class="departbar trybar" role="region" aria-label="${esc(t.tryOn)}"><div class="in"><div class="tinfo"><span class="tart">${itemArt(s.id)}</span><b>${esc(t.tryLbl(t.items[s.id]))}</b></div><div class="tact">${act}<button class="btn ghost" id="tryCancel">${t.tryCancel}</button></div></div></div>`;
}
viewHome = function () {
  const t = L(); const look = lookWith(tryId);
  const room = roomSVG({ ph: phase(), pet: S.pet, e: tryId ? "felice" : "normale", hat: look.hat, st: stage(), furn: look.furn, wall: look.wall, away: !!S.away, label: S.petName, season: season().id });
  const list = shopList(homeTab);
  let grid;
  if (homeTab === "furn") grid = GROUP_ORDER.map((g) => `<div class="shopgrp"><h2>${t.groups[g]}</h2><div class="grid3">${list.filter((s) => GROUP[s.id] === g).map(shopItem).join("")}</div></div>`).join("");
  else grid = `<div class="grid3">${homeTab === "wear" ? `<button class="item" aria-pressed="${!S.hat}" data-wear=""><span class="art"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M7 17L17 7"/></svg></span><span class="nm">${t.none}</span><span class="state">${!S.hat ? t.using : t.use}</span></button>` : ""}${list.map(shopItem).join("")}</div>`;
  return `${topBar()}<div class="stack"><div class="room ${tryId ? "trying" : ""}" id="room">${room}<div class="fx" id="fx"></div>${tryId ? `<span class="trytag">${t.tryOn}</span>` : ""}</div>
  <h1>${t.homeT}</h1><p class="muted">${t.homeP}</p>
  <div class="tabsx" role="tablist">${[["furn", t.shopFurn], ["wear", t.shopWear], ["wall", t.shopWall]].map(([k, l]) => `<button role="tab" aria-selected="${homeTab === k}" data-hometab="${k}">${l}</button>`).join("")}</div>
  ${grid}</div>${tryBar()}`;
};
function keepScroll(fn) { const y = window.scrollY; fn(); window.scrollTo(0, y); }
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  if (b.dataset.tab !== undefined || b.dataset.hometab !== undefined || b.dataset.wear !== undefined) tryId = null;
}, true);
document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return; const t = L();
  if (b.dataset.shop) {
    const s = SHOP.find((x) => x.id === b.dataset.shop); if (!s) return;
    if (ownsItem(s)) {
      tryId = null;
      if (s.kind === "furn") { if (CURTAINS[s.id] || !S.furn.includes(s.id)) S.furn = withItem(S.furn, s.id); else S.furn = S.furn.filter((x) => x !== s.id); }
      else if (s.kind === "wear") S.hat = S.hat === s.id ? null : s.id; else S.wall = s.id;
      SND.play("pop"); save(); keepScroll(render); jump(false); burst("star", 6); return;
    }
    if (tryId === s.id) { tryId = null; SND.play("click"); keepScroll(render); return; }
    if (!tryId) tryScroll = window.scrollY;
    tryId = s.id; SND.play("sparkle"); SND.haptic && SND.haptic(10);
    keepScroll(render);
    window.scrollTo({ top: 0, behavior: anim ? "smooth" : "auto" });
    setTimeout(() => { jump(true); burst("star", 8); }, anim ? 260 : 0);
    return;
  }
  if (b.id === "tryBuy") {
    const s = tryId && SHOP.find((x) => x.id === tryId); if (!s || lockedItem(s)) return;
    const cost = s.coll ? 0 : s.price;
    if (S.seeds < cost) { toast(t.notEnough); return; }
    S.seeds -= cost; if (!S.owned.includes(s.id)) S.owned.push(s.id); applyItem(s); tryId = null;
    save(); render(); window.scrollTo(0, 0); toast(t.bought(t.items[s.id])); SND.play("buy"); SND.haptic && SND.haptic([15, 40, 25]);
    setTimeout(() => { jump(true); burst("star", 12); burst("heart", 6); }, 60);
    return;
  }
  if (b.id === "tryCancel") { tryId = null; SND.play("click"); render(); window.scrollTo({ top: tryScroll, behavior: anim ? "smooth" : "auto" }); return; }
});

/* --- Niente più felicità: la card mostra il livello e la settimana --- */
const FLAME_W = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c1 4 5.5 5.2 5.5 10.5a5.5 5.5 0 0 1-11 0c0-2.8 1.6-4.4 2.7-5.4.3 2.2 1.4 3.3 2.7 3.3C11.4 8.5 11 5.5 12 2.5Z" fill="#fff"/></svg>`;
function weekDots() {
  const now = new Date(); const start = new Date(now); start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const today = dkey(now);
  return [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const d = new Date(start); d.setDate(start.getDate() + i); const k = dkey(d); const r = S.days[k];
    const on = r && (r.done > 0 || r.rest || (r.free && k !== today && k < today)); const isT = k === today; const fut = k > today;
    return `<i class="${on ? "on" : ""} ${isT ? "now" : ""} ${fut ? "fut" : ""}" title="${esc(wdName(i, "long"))}"><b>${wdName(i, "narrow")}</b></i>`;
  }).join("");
}
meters = function () {
  const t = L(); const need = xpNeed(S.level); const tg = todayGoals(); const done = S.done.filter((g) => tg.includes(g)).length;
  const pct = tg.length ? Math.round((done / tg.length) * 100) : 100; const C = 2 * Math.PI * 42; const off = C * (1 - pct / 100);
  const from = prevBar.ring != null && anim ? C * (1 - prevBar.ring / 100) : off;
  const gid = nid("rg"); const label = !tg.length ? t.freeL : done === tg.length ? t.allDoneL : t.todayL;
  return `<div class="meters2"><div class="ringwrap" role="progressbar" aria-label="${esc(t.todayL)}" aria-valuemin="0" aria-valuemax="${tg.length}" aria-valuenow="${done}"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD27A"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs><circle cx="50" cy="50" r="42" class="rbg"/><circle cx="50" cy="50" r="42" class="rfg" stroke="url(#${gid})" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${from.toFixed(1)}" data-ring="${off.toFixed(1)}" data-pct="${pct}" transform="rotate(-90 50 50)"/></svg><div class="rtxt"><b>${tg.length ? `${done}/${tg.length}` : "☀"}</b><span>${esc(label)}</span></div></div>
  <div class="mside"><div class="mrow"><span class="bdg xp">${STAR_W}</span><div class="mcol"><div class="hd"><span>${t.level} ${S.level}</span><span class="v">${t.xpTo(S.xp, need)}</span></div><div class="bar xp" role="progressbar" aria-label="${t.level}" aria-valuemin="0" aria-valuemax="${need}" aria-valuenow="${S.xp}">${fillTag("xp", (S.xp / need) * 100)}</div></div></div>
  <div class="mrow"><span class="bdg wk">${FLAME_W}</span><div class="mcol"><div class="hd"><span>${t.weekL}</span></div><div class="wdots">${weekDots()}</div></div></div></div></div>`;
};

/* --- Righe degli obiettivi colorate per categoria --- */
const _goalRow = goalRow;
goalRow = function (g) { return _goalRow(g).replace('class="goal"', `class="goal" style="--cc:${CAT_COLOR[goalCat(g)]}"`); };
