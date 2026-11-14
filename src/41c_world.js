/* Sezione premium "Giro del mondo": 24 mete iconiche, uguali per tutte le lingue (testi in T.<lang>.world) */
const WORLD = [
  { art: "pyramids", h: 3 }, { art: "santorini", h: 3 }, { art: "matterhorn", h: 3 }, { art: "fjords", h: 4 },
  { art: "lapland", h: 4 }, { art: "iceland", h: 4 }, { art: "sahara", h: 4 }, { art: "petra", h: 4 },
  { art: "safari", h: 5 }, { art: "victoria", h: 5 }, { art: "tajmahal", h: 5 }, { art: "angkor", h: 5 },
  { art: "bali", h: 6 }, { art: "maldives", h: 5 }, { art: "reef", h: 6 }, { art: "sydney", h: 6 },
  { art: "banff", h: 5 }, { art: "hawaii", h: 6 }, { art: "galapagos", h: 6 }, { art: "machupicchu", h: 6 },
  { art: "uyuni", h: 6 }, { art: "patagonia", h: 6 }, { art: "moai", h: 6 }, { art: "antarctica", h: 6 }
];

Object.assign(REAL_SKY2, {
  pyramids: ["#FAD3A0", "#FBEED6"], santorini: ["#BFE3F7", "#F2F8FC"], matterhorn: ["#BFDDF4", "#EEF6FB"], fjords: ["#CFE4F2", "#F2F6F4"],
  lapland: ["#3B3570", "#8C86C0"], iceland: ["#24456E", "#6E9CB8"], sahara: ["#FCCB98", "#FBEBCF"], petra: ["#F9D8B8", "#FBEADB"],
  safari: ["#F9C48F", "#FBE8C4"], victoria: ["#BFE3F5", "#F2F8F2"], tajmahal: ["#F9D3C8", "#D8E6F4"], angkor: ["#F7B98F", "#F9E2C0"],
  bali: ["#CFE8F2", "#F4F6E6"], maldives: ["#AEDFF7", "#F2FAF8"], reef: ["#7FD3E8", "#3E95C2"], sydney: ["#BFE3F7", "#FBEFDF"],
  banff: ["#CFE6F7", "#F2F7FA"], hawaii: ["#FBCFB0", "#BFE3F2"], galapagos: ["#CFE8F2", "#F6F2E2"], machupicchu: ["#CFE0EE", "#F0F4EA"],
  uyuni: ["#8FC6EC", "#EAF5FB"], patagonia: ["#F6C2B4", "#CFDDF0"], moai: ["#FBD3B0", "#CFE6F2"], antarctica: ["#CFE8F7", "#F4FAFD"]
});

{
  /* cammello (verso destra), con ombra di gobba */
  const camel = (x, y, s, c = "#C08A55") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 -6 V4 M-4 -6 V4 M5 -6 V4 M8 -6 V4" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="0" cy="-8" rx="10" ry="4.5" fill="${c}"/><path d="M-6 -10 Q-1 -21 4 -10 Z" fill="${c}"/><path d="M8 -9 Q13 -11 12.5 -18" stroke="${c}" stroke-width="3.4" fill="none" stroke-linecap="round"/><ellipse cx="14.5" cy="-18.5" rx="3.6" ry="2" fill="${c}"/><path d="M-10 -8 Q-13 -5 -12 -1" stroke="${c}" stroke-width="1" fill="none"/></g>`;
  /* renna con le corna */
  const reindeer = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 -8 V3 M-4 -8 V3 M5 -8 V3 M8 -8 V3" stroke="#7A5640" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="-10" rx="10" ry="5" fill="#9A7052"/><ellipse cx="0" cy="-8" rx="6" ry="2" fill="#E8DCCB" opacity=".7"/><path d="M7 -12 Q10 -16 11 -20" stroke="#9A7052" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="13" cy="-21" rx="4" ry="2.6" fill="#9A7052"/><circle cx="16.6" cy="-20.6" r="1.1" fill="#4A3428"/><circle cx="12.6" cy="-22" r=".8" fill="#2E2420"/><path d="M11 -23 L8 -30 L5 -33 M8 -30 L10 -34 M13 -23.5 L15 -30 L18 -32 M15 -30 L14 -34" stroke="#E2C99A" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M-10 -12 l-2 -2" stroke="#E8DCCB" stroke-width="2" stroke-linecap="round"/></g>`;
  /* aurora boreale: tre veli ondulati */
  const aurora = (y, a, b) => `<path d="M-4 ${y + 6} Q30 ${y - 14} 64 ${y + 2} T132 ${y - 4} T170 ${y - 10} V${y + 6} Q130 ${y + 16} 96 ${y + 14} T30 ${y + 20} T-4 ${y + 18} Z" fill="${a}" opacity=".45"/><path d="M-4 ${y + 2} Q34 ${y - 10} 70 ${y + 4} T140 ${y - 2} T170 ${y - 6}" stroke="${a}" stroke-width="3" fill="none" opacity=".75"/><path d="M10 ${y + 12} Q50 ${y} 90 ${y + 10} T170 ${y + 2}" stroke="${b}" stroke-width="2" fill="none" opacity=".6"/>`;
  const stars = (pts, r = 0.9) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".85"/>`).join("");
  /* acacia ad ombrello */
  const acacia = (x, y, s, c = "#6E8A4A") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-1 -8 -5 -14 M-1 -6 Q3 -10 6 -15" stroke="#6E5038" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-16" rx="15" ry="3.6" fill="${c}"/><ellipse cx="-3" cy="-18" rx="9" ry="2.6" fill="${c}"/><ellipse cx="3" cy="-17.6" rx="8" ry="2" fill="#fff" opacity=".12"/></g>`;
  /* giraffa (verso sinistra) */
  const giraffe = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 -10 L-6 3 M-2 -10 L-2 3 M5 -11 L6 3 M8 -11 L8 3" stroke="#E2AE5E" stroke-width="2" stroke-linecap="round"/><path d="M-7 -12 Q0 -16 10 -14 Q12 -10 8 -9 L-6 -9 Q-9 -10 -7 -12 Z" fill="#E8B866"/><path d="M-6 -12 L-14 -32 L-10 -33 L-2 -13 Z" fill="#E8B866"/><ellipse cx="-14" cy="-33" rx="4.2" ry="2.2" transform="rotate(-20 -14 -33)" fill="#E8B866"/><path d="M-12 -35 l0 -3 M-10 -34.6 l.6 -3" stroke="#8A5A30" stroke-width="1" stroke-linecap="round"/><circle cx="-13" cy="-33.6" r=".7" fill="#3A2A20"/><path d="M10 -13 q3 2 2 6" stroke="#E2AE5E" stroke-width=".8" fill="none"/><circle cx="-2" cy="-12" r="1.3" fill="#B5793A"/><circle cx="3" cy="-12.6" r="1.4" fill="#B5793A"/><circle cx="7" cy="-11" r="1.1" fill="#B5793A"/><circle cx="-8" cy="-19" r="1" fill="#B5793A"/><circle cx="-10.5" cy="-25" r="1" fill="#B5793A"/><circle cx="-6" cy="-15" r=".9" fill="#B5793A"/></g>`;
  /* pinguino imperatore (di fronte, un po' girato) */
  const penguin = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-9" rx="6" ry="9.5" fill="#2E3440"/><ellipse cx=".8" cy="-7.5" rx="4.2" ry="7.6" fill="#fff"/><circle cx="0" cy="-19" r="4.2" fill="#2E3440"/><ellipse cx="2.2" cy="-16" rx="2" ry="1.4" fill="#F6C55A"/><circle cx="1.6" cy="-20" r=".8" fill="#fff"/><path d="M3.6 -19 l3.2 1.2 l-3.2 .4 Z" fill="#E8935A"/><path d="M-5.6 -12 Q-8.4 -6 -6 -2" stroke="#2E3440" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-3 0 h2.4 M1.6 0 h2.4" stroke="#E8935A" stroke-width="1.2" stroke-linecap="round"/></g>`;
  /* lama */
  const llama = (x, y, s, c = "#F2EBDD") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 -6 V4 M-3 -6 V4 M4 -6 V4 M7 -6 V4" stroke="#D9CDB8" stroke-width="2" stroke-linecap="round"/><ellipse cx="0" cy="-8" rx="9" ry="4.6" fill="${c}"/><path d="M5 -10 Q6 -20 8 -24" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="10" cy="-24.5" rx="3.6" ry="2.4" fill="${c}"/><path d="M7 -27 l-.6 -3.4 M9 -27 l.6 -3.4" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/><circle cx="10.4" cy="-25.2" r=".7" fill="#3A2E2A"/><path d="M3 -12 h5 v3 h-5 Z" fill="#E2654F"/><path d="M3 -12 h5" stroke="#5FA0D8" stroke-width="1"/></g>`;
  /* moai con il naso lungo */
  const moai = (x, y, s, hat) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 0 L-7 -24 Q-7 -33 0 -33 Q7 -33 7 -24 L7 0 Z" fill="#8A7E70"/><path d="M2 -33 Q7 -33 7 -24 L7 0 L3 0 Z" fill="#74695C"/><rect x="-6.6" y="-25" width="13.2" height="3" fill="#6A6054"/><path d="M0 -22 L3.4 -12 L0 -11 Z" fill="#74695C"/><path d="M-4 -8 H4" stroke="#5E554A" stroke-width="1.4"/><rect x="-9" y="-24" width="2.4" height="11" rx="1" fill="#7E7366"/><rect x="6.6" y="-24" width="2.4" height="11" rx="1" fill="#6A6054"/>${hat ? `<rect x="-5" y="-38" width="10" height="5.4" rx="2" fill="#C2624A"/>` : ""}</g>`;
  const cloud = (x, y, s = 1, op = 0.9) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}" fill="#fff"><ellipse cx="0" cy="0" rx="12" ry="4"/><circle cx="-4" cy="-3" r="5"/><circle cx="4" cy="-4" r="6"/></g>`;
  const gull = (x, y) => `<path d="M${x - 3} ${y} q1.5 -1.6 3 0 q1.5 -1.6 3 0" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/>`;

  Object.assign(REAL_ART2, {
    /* --- Africa e Mediterraneo --- */
    pyramids: (h) => {
      let o = h.sun(130, 22, 8, "#FFE7A8");
      o += `<path d="M0 76 Q50 70 100 74 T160 72 V100 H0Z" fill="#F0D29C"/>`;
      o += `<path d="M96 79 L120 46 L132 82 Z" fill="#E7BF7C"/><path d="M120 46 L146 77 L132 82 Z" fill="#CFA060"/>`;
      o += `<path d="M138 78 L150 62 L156 80 Z" fill="#E7BF7C"/><path d="M150 62 L162 76 L156 80 Z" fill="#CFA060"/>`;
      o += `<path d="M14 82 L58 24 L72 88 Z" fill="#EFC985"/><path d="M58 24 L108 80 L72 88 Z" fill="#D2A35E"/><path d="M58 24 L61.6 28.6 L56 28.4 Z" fill="#F8E4BC"/>`;
      o += `<path d="M30 70 L64 74 M44 52 L64 58 M64 74 L96 70 M64 58 L84 56" stroke="#C99858" stroke-width=".7" opacity=".6"/>`;
      o += `<path d="M0 86 Q60 80 110 88 T160 86 V100 H0Z" fill="#E9C58A"/>`;
      o += camel(120, 92, 0.9) + camel(144, 94, 0.7, "#B57E4C");
      o += `<path d="M20 94 q6 -2 12 0" stroke="#D5AD70" stroke-width="1" fill="none"/><path d="M70 96 q8 -3 16 0" stroke="#D5AD70" stroke-width="1" fill="none"/>`;
      return o;
    },
    santorini: (h) => {
      let o = h.sun(132, 18, 7) + `<rect x="0" y="62" width="160" height="38" fill="${h.water}"/><path d="M96 63 Q120 58 160 62 V64 H96Z" fill="#9FB7C8"/>` + h.waves(76, 4);
      o += `<path d="M0 34 Q30 30 52 40 Q70 48 82 64 Q88 74 84 100 H0Z" fill="#B88A70"/><path d="M60 46 Q74 56 80 70 Q84 82 80 100 H70 Q74 80 64 64 Z" fill="#A27660"/>`;
      [[2, 30, 14, 10], [16, 32, 12, 9], [28, 36, 14, 10], [42, 41, 12, 9], [6, 42, 12, 9], [20, 44, 14, 10], [36, 50, 13, 9], [52, 52, 11, 9], [10, 55, 12, 9], [26, 60, 14, 10], [44, 62, 12, 9], [16, 72, 13, 9], [34, 74, 12, 9]].forEach(([x, y, wd, ht], k) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${ht}" fill="${k % 3 ? "#FFFFFF" : "#F4EEE6"}"/><rect x="${x + wd / 2 - 1.6}" y="${y + ht - 5}" width="3.2" height="5" rx="1.4" fill="${k % 2 ? "#3E7CC9" : "#5A97D6"}"/>`; });
      o += `<rect x="58" y="62" width="14" height="12" fill="#fff"/><path d="M57 62 A8 8 0 0 1 73 62 Z" fill="#3E7CC9"/><path d="M65 54 V50" stroke="#F6F1EA" stroke-width="1.2"/><rect x="62" y="66" width="6" height="8" rx="3" fill="#3E7CC9"/>`;
      o += `<rect x="28" y="22" width="12" height="12" fill="#fff"/><path d="M27 22 A7 7 0 0 1 41 22 Z" fill="#3E7CC9"/><path d="M34 15 V11" stroke="#F6F1EA" stroke-width="1.2"/>`;
      [[12, 42, 3], [48, 60, 3.2], [24, 70, 2.6], [8, 54, 2.4]].forEach(([x, y, r]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="#E85C9A"/><circle cx="${x + 2}" cy="${y - 1}" r="${r * 0.6}" fill="#F48BB8"/>`; });
      o += `<path d="M112 84 L130 84 L127 88 L115 88 Z" fill="#fff"/><path d="M120 84 V72 L128 82 Z" fill="#F6F1EA"/>`;
      return o;
    },
    matterhorn: (h) => {
      let o = cloud(28, 22, 1) + cloud(132, 16, 0.8);
      o += `<path d="M0 66 L22 50 L40 58 L56 46 Z" fill="#B9C8DE"/><path d="M110 50 L130 40 L160 54 V66 H100Z" fill="#B9C8DE"/>`;
      o += `<path d="M34 82 L70 36 L78 18 Q82 10 88 14 L92 22 L100 40 L132 82 Z" fill="#8E8A98"/><path d="M88 14 L92 22 L100 40 L132 82 L102 82 Q98 56 90 36 Z" fill="#76727F"/>`;
      o += `<path d="M78 18 Q82 10 88 14 L92 22 L94 30 L90 28 L86 32 L82 26 L76 30 Z M70 36 L74 34 L72 44 L66 46 Z M98 40 L104 48 L98 50 Z M58 54 L64 52 L60 60 Z" fill="#fff"/>`;
      o += `<path d="M0 72 Q40 62 80 70 T160 66 V100 H0Z" fill="#8CC27A"/><path d="M0 84 Q50 76 100 84 T160 82 V100 H0Z" fill="#7AB56A"/>`;
      o += h.pine(12, 74, 18, "#3F6E55") + h.pine(24, 78, 14, "#3F6E55") + h.pine(146, 72, 18, "#3F6E55") + h.pine(136, 76, 13, "#4E7D5E");
      o += `<rect x="96" y="78" width="22" height="13" fill="#A5704A"/><path d="M93 79 L107 69 L121 79 Z" fill="#7A4E34"/><rect x="100" y="81" width="5" height="4" fill="#F6E3B6"/><rect x="109" y="81" width="5" height="4" fill="#F6E3B6"/><path d="M99 88 H115" stroke="#E2654F" stroke-width="1.6" stroke-dasharray="1.6 1.2"/>`;
      [[40, 90], [56, 94], [70, 88], [130, 92]].forEach(([x, y], k) => { o += `<circle cx="${x}" cy="${y}" r="1.4" fill="${k % 2 ? "#fff" : "#F6D57A"}"/>`; });
      return o;
    },
    fjords: (h) => {
      let o = `<path d="M40 64 L64 40 L80 50 L98 36 L124 64 Z" fill="#A7B9D0"/><path d="M64 40 L70 46 L62 47 Z M98 36 L105 43 L96 43 Z" fill="#fff"/>`;
      o += `<rect x="0" y="62" width="160" height="38" fill="${h.water}"/>` + h.waves(74, 4);
      o += `<path d="M0 12 Q18 14 34 30 Q48 48 56 66 Q50 72 40 74 Q20 70 0 74 Z" fill="#5E8A6E"/><path d="M0 12 Q18 14 34 30 Q24 30 14 24 Q6 20 0 22 Z" fill="#7FA88A"/>`;
      o += `<path d="M160 18 Q140 20 128 34 Q114 50 106 66 Q114 72 124 74 Q144 70 160 74 Z" fill="#567F66"/><path d="M160 18 Q140 20 128 34 Q140 32 150 28 L160 28 Z" fill="#7FA88A"/>`;
      o += `<path d="M30 30 Q34 46 30 70" stroke="#fff" stroke-width="2.4" fill="none" opacity=".85"/><path d="M33 34 Q36 48 33 70" stroke="#DFF0F8" stroke-width="1" fill="none"/><ellipse cx="31" cy="72" rx="5" ry="1.6" fill="#fff" opacity=".8"/>`;
      o += `<rect x="128" y="62" width="12" height="9" fill="#C8503B"/><path d="M126 63 L134 56 L142 63 Z" fill="#5A4A48"/><rect x="132" y="65" width="3" height="3" fill="#F6E3B6"/>`;
      o += `<path d="M70 82 L94 82 L90 87 L74 87 Z" fill="#fff"/><rect x="76" y="77" width="12" height="5" fill="#E2654F"/><path d="M80 77 V72 H83 V77" fill="#5A4A48"/><path d="M60 88 Q72 86 74 87 M94 87 Q104 89 110 88" stroke="#fff" stroke-width="1" fill="none" opacity=".7"/>`;
      return o;
    },
    lapland: (h) => {
      let o = stars([[14, 10], [40, 6], [70, 14], [100, 8], [128, 18], [150, 6], [22, 30], [118, 34], [88, 30], [56, 34], [146, 30]]);
      o += aurora(24, "#7FE3B0", "#B9A2F0");
      o += `<path d="M0 66 Q40 56 80 62 T160 58 V100 H0Z" fill="#DCE4F4"/><path d="M0 80 Q60 70 110 78 T160 76 V100 H0Z" fill="#F4F7FC"/>`;
      [[10, 68, 20], [22, 70, 15], [128, 62, 18], [140, 66, 22], [152, 64, 15]].forEach(([x, y, ht]) => { o += h.pine(x, y, ht, "#2F5A4E") + `<path d="M${x} ${y - ht} L${x + ht * 0.16} ${y - ht * 0.56} L${x - ht * 0.16} ${y - ht * 0.56} Z" fill="#fff"/>`; });
      o += `<rect x="98" y="62" width="18" height="10" fill="#8A5A3E"/><path d="M95 63 L107 54 L119 63 Z" fill="#F4F7FC"/><rect x="102" y="65" width="4" height="4" fill="#F6C55A"/><rect x="109" y="65" width="4" height="4" fill="#F6C55A"/><path d="M113 56 V52" stroke="#5A4A48" stroke-width="2.4"/>`;
      o += reindeer(58, 90, 1.2) + reindeer(86, 86, 0.75);
      return o;
    },
    iceland: (h) => {
      let o = stars([[10, 8], [36, 14], [60, 6], [92, 10], [120, 6], [148, 14], [26, 30], [140, 32]]);
      o += aurora(18, "#7FEFC0", "#F2A6D2");
      o += `<path d="M84 64 Q96 36 112 26 Q118 22 120 28 Q128 44 150 64 Z" fill="#4A5E70"/><path d="M112 26 Q118 22 120 28 L126 40 L118 36 L112 40 L106 34 Z" fill="#E8F0F6"/><path d="M120 28 Q128 44 150 64 L134 64 Q128 46 120 34 Z" fill="#3E5062"/>`;
      o += `<path d="M0 60 Q40 52 80 58 T160 60 V100 H0Z" fill="#5E7E62"/><rect x="0" y="66" width="160" height="34" fill="#4E6E58"/>`;
      o += `<path d="M44 66 Q54 64 64 60 Q70 58 78 58 L80 60 Q70 62 64 66 L62 74 H46 Z" fill="#9FD0E6"/>`;
      o += `<path d="M14 74 Q50 70 96 72 L98 92 Q56 90 12 94 Z" fill="#3E5848"/><path d="M14 74 Q50 70 96 72" stroke="#6E8E72" stroke-width="2" fill="none"/>`;
      o += `<path d="M45 72 L63 71.6 L65 92 L43 92.6 Z" fill="#E6F4FA"/><path d="M49 73 V92 M54 72.6 V92 M59 72.4 V92" stroke="#fff" stroke-width="1.2"/><path d="M47 75 V90 M61.6 74 V90" stroke="#BFE0F0" stroke-width=".8"/>`;
      o += `<path d="M0 92 Q40 88 80 93 T160 90 V100 H0Z" fill="#5E7E62"/><ellipse cx="54" cy="94" rx="20" ry="3.6" fill="#7FB0C8"/><ellipse cx="54" cy="92.6" rx="13" ry="2.6" fill="#fff" opacity=".75"/>`;
      return o;
    },
    sahara: (h) => {
      let o = h.sun(124, 24, 10, "#FFD87A");
      o += `<path d="M0 62 Q30 44 60 56 Q90 66 120 50 Q140 42 160 50 V100 H0Z" fill="#EFB777"/><path d="M60 56 Q90 66 120 50 Q112 62 100 66 Q80 66 60 56 Z" fill="#DFA060"/>`;
      o += camel(76, 62, 0.42, "#8A5E3E") + camel(88, 62, 0.42, "#8A5E3E") + camel(100, 58.5, 0.42, "#8A5E3E");
      o += `<path d="M0 78 Q40 64 90 76 Q130 86 160 74 V100 H0Z" fill="#F4C98E"/>`;
      o += `<ellipse cx="44" cy="84" rx="22" ry="5" fill="${h.water}"/><ellipse cx="40" cy="83" rx="10" ry="1.6" fill="#fff" opacity=".4"/><path d="M18 86 Q30 80 44 80 Q58 80 70 86 Q58 90 44 90 Q30 90 18 86 Z" fill="none" stroke="#8FBF6A" stroke-width="2.4"/>`;
      o += h.palm(28, 84, 22) + h.palm(58, 84, 18) + h.palm(66, 86, 14);
      o += `<path d="M100 92 Q130 86 160 90 V100 H96Z" fill="#E9B676"/><path d="M110 94 q6 -2 12 0 M136 96 q6 -2 12 0" stroke="#D49A5A" stroke-width="1" fill="none"/>`;
      return o;
    },
    petra: (h) => {
      let o = `<path d="M0 0 H34 Q42 30 40 100 H0Z" fill="#C9806C"/><path d="M160 0 H126 Q118 30 120 100 H160Z" fill="#C9806C"/><path d="M34 0 H126 Q120 10 120 16 H40 Q40 10 34 0 Z" fill="#D48E78" opacity="0"/>`;
      o += `<path d="M40 100 V16 Q80 8 120 16 V100 Z" fill="#E3A68E"/>`;
      o += `<rect x="54" y="52" width="52" height="5" fill="#D2917A"/><path d="M68 52 L80 44 L92 52 Z" fill="#D2917A"/><path d="M71 51 L80 46 L89 51 Z" fill="#E8B49E"/>`;
      [56, 63, 70, 90, 97, 104].forEach((x) => { o += `<rect x="${x - 1.6}" y="57" width="3.2" height="31" fill="#F0BEA8"/><rect x="${x - 2.4}" y="57" width="4.8" height="2" fill="#D2917A"/>`; });
      o += `<rect x="75" y="68" width="10" height="20" fill="#8A4E42"/>`;
      o += `<rect x="54" y="26" width="14" height="22" fill="#D99C84"/><path d="M54 26 L68 26 L68 20 Z" fill="#D2917A"/><rect x="92" y="26" width="14" height="22" fill="#D99C84"/><path d="M92 26 L106 26 L92 20 Z" fill="#D2917A"/>`;
      o += `<rect x="72" y="28" width="16" height="20" fill="#E8B49E"/><path d="M75 28 V48 M80 28 V48 M85 28 V48" stroke="#D2917A" stroke-width="1.2"/><path d="M71 28 L80 19 L89 28 Z" fill="#D2917A"/><ellipse cx="80" cy="16.5" rx="2.4" ry="3" fill="#D2917A"/>`;
      o += `<rect x="52" y="48" width="56" height="4" fill="#D2917A"/><rect x="40" y="88" width="80" height="12" fill="#EFCFA8"/><rect x="0" y="92" width="160" height="8" fill="#E9C59C"/>`;
      o += camel(130, 96, 0.8, "#B07A50");
      return o;
    },
    safari: (h) => {
      let o = h.sun(40, 30, 10, "#FFD27A");
      o += `<path d="M64 62 L94 34 Q100 31 108 31 Q116 31 122 34 L156 62 Z" fill="#9AA6C4"/><path d="M94 34 Q100 31 108 31 Q116 31 122 34 L128 39 L120 37 L114 40 L108 37 L102 40 L96 37 L90 38 Z" fill="#fff"/>`;
      o += `<path d="M0 64 Q40 56 80 62 T160 60 V100 H0Z" fill="#E2C070"/><path d="M0 80 Q50 72 100 80 T160 78 V100 H0Z" fill="#D4AE5A"/>`;
      o += acacia(26, 66, 1.3) + acacia(140, 70, 1.1, "#5E7A40") + acacia(112, 60, 0.6, "#7E9A5A");
      o += giraffe(84, 88, 1.15) + giraffe(62, 82, 0.7);
      o += `<path d="M6 92 l2 -6 l2 6 M14 96 l2 -5 l2 5 M128 94 l2 -6 l2 6 M150 92 l2 -5 l2 5" stroke="#B88E44" stroke-width="1" fill="none"/>`;
      o += `<path d="M120 22 q2 -2 4 0 q2 -2 4 0 M132 18 q1.6 -1.6 3.2 0 q1.6 -1.6 3.2 0" stroke="#7A5A48" stroke-width="1" fill="none" stroke-linecap="round"/>`;
      return o;
    },
    victoria: (h) => {
      let o = `<path d="M0 26 Q40 22 80 26 T160 24 V40 H0Z" fill="#7FAE6E"/><path d="M0 30 Q50 27 100 30 T160 30 V42 H0Z" fill="#7FBEDB"/>`;
      o += `<rect x="0" y="40" width="160" height="40" fill="#BFE3F2"/>`;
      for (let x = 4; x < 160; x += 8) o += `<path d="M${x} 41 V78" stroke="#fff" stroke-width="${3 + (x % 3)}" opacity=".85"/><path d="M${x + 4} 42 V76" stroke="#8EC9E3" stroke-width="1" opacity=".8"/>`;
      o += `<path d="M0 40 Q40 37 80 40 T160 40" stroke="#5E9A50" stroke-width="3" fill="none"/>`;
      [[22, 12], [70, 9], [120, 12]].forEach(([x, w]) => { o += `<path d="M${x} 41 Q${x + w / 2} 33 ${x + w} 41 L${x + w - 1} 50 Q${x + w / 2} 52 ${x + 1} 50 Z" fill="#6E9A60"/><path d="M${x + 2} 50 Q${x + w / 2} 54 ${x + w - 2} 50" stroke="#5E8A52" stroke-width="1.2" fill="none"/>`; });
      o += `<path d="M10 100 A70 60 0 0 1 150 100" stroke="#F2A0A0" stroke-width="2.4" fill="none" opacity=".6"/><path d="M14 100 A66 56 0 0 1 146 100" stroke="#F6D57A" stroke-width="2.4" fill="none" opacity=".6"/><path d="M18 100 A62 52 0 0 1 142 100" stroke="#9FD6A8" stroke-width="2.4" fill="none" opacity=".6"/><path d="M22 100 A58 48 0 0 1 138 100" stroke="#9FC3EC" stroke-width="2.4" fill="none" opacity=".6"/>`;
      [[10, 80, 14], [34, 84, 12], [60, 78, 15], [86, 82, 13], [112, 79, 15], [140, 83, 14]].forEach(([x, y, r]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".75"/>`; });
      o += `<path d="M0 92 Q20 86 36 94 L40 100 H0Z M160 90 Q140 86 128 94 L124 100 H160Z" fill="#4E7E4E"/>`;
      return o;
    },

    /* --- Asia e Oceania --- */
    tajmahal: (h) => {
      let o = `<rect x="0" y="74" width="160" height="26" fill="#A9C98E"/>`;
      o += `<rect x="40" y="66" width="80" height="9" fill="#EFE3DA"/>`;
      o += `<rect x="58" y="40" width="44" height="27" fill="#F7F1EE"/><rect x="58" y="40" width="44" height="2" fill="#E6D8D2"/><path d="M73 67 V54 Q80 44 87 54 V67 Z" fill="#CFC2CF"/><path d="M75.5 67 V55 Q80 48 84.5 55 V67 Z" fill="#B5A8BC"/>`;
      o += `<path d="M62 52 V60 H68 V52 Q65 48 62 52 Z M92 52 V60 H98 V52 Q95 48 92 52 Z" fill="#DCD0D6"/>`;
      o += `<rect x="70" y="35" width="20" height="6" fill="#F7F1EE"/><path d="M69 36 C64 26 73 18 80 12 C87 18 96 26 91 36 Z" fill="#FBF6F4"/><path d="M80 12 C86 18 95 26 91 36 L84 36 C88 28 86 18 80 12 Z" fill="#E6DCDC"/><path d="M80 12 V6" stroke="#D8B86A" stroke-width="1.2"/><circle cx="80" cy="7.6" r="1" fill="#D8B86A"/>`;
      [[63, 36], [97, 36]].forEach(([x, y]) => { o += `<rect x="${x - 3}" y="${y}" width="6" height="4" fill="#F7F1EE"/><path d="M${x - 4} ${y + 0.6} Q${x} ${y - 7} ${x + 4} ${y + 0.6} Z" fill="#FBF6F4"/>`; });
      [44, 116].forEach((x) => { o += `<rect x="${x - 2.4}" y="30" width="4.8" height="37" fill="#F7F1EE"/><path d="M${x - 3.4} 40 h6.8 M${x - 3.4} 52 h6.8" stroke="#E2D4CE" stroke-width="1.4"/><path d="M${x - 3.4} 31 Q${x} 23 ${x + 3.4} 31 Z" fill="#FBF6F4"/>`; });
      o += `<path d="M72 100 L76 75 H84 L88 100 Z" fill="#8EC3E3"/><path d="M76 100 L78.6 76 H81.4 L84 100 Z" fill="#BFE0F2" opacity=".7"/>`;
      [[66, 82, 9], [60, 92, 12], [94, 82, 9], [100, 92, 12], [52, 80, 8], [108, 80, 8]].forEach(([x, y, ht]) => { o += h.cypress(x, y, ht); });
      return o;
    },
    angkor: (h) => {
      let o = h.sun(80, 34, 11, "#FFE3A0");
      const tower = (x, y, ht, w, c) => `<path d="M${x - w} ${y} L${x - w * 0.8} ${y - ht * 0.5} Q${x - w * 0.6} ${y - ht * 0.9} ${x} ${y - ht} Q${x + w * 0.6} ${y - ht * 0.9} ${x + w * 0.8} ${y - ht * 0.5} L${x + w} ${y} Z" fill="${c}"/><path d="M${x - w * 0.85} ${y - ht * 0.3} H${x + w * 0.85} M${x - w * 0.75} ${y - ht * 0.55} H${x + w * 0.75} M${x - w * 0.5} ${y - ht * 0.78} H${x + w * 0.5}" stroke="#7A6458" stroke-width=".8" opacity=".6"/>`;
      const temple = () => `<rect x="30" y="52" width="100" height="12" fill="#8E766A"/><rect x="44" y="46" width="72" height="8" fill="#9A8274"/>` + tower(56, 48, 16, 6, "#9A8274") + tower(104, 48, 16, 6, "#9A8274") + tower(68, 46, 22, 7, "#A48C7C") + tower(92, 46, 22, 7, "#A48C7C") + tower(80, 46, 32, 8.4, "#AE9684");
      o += temple();
      o += `<rect x="0" y="62" width="160" height="38" fill="#E9B79A"/><g transform="translate(0 126) scale(1 -1)" opacity=".35">${temple()}</g><path d="M20 76 h30 M70 82 h40 M110 72 h26" stroke="#fff" stroke-width="1" opacity=".5"/>`;
      o += `<path d="M0 58 Q14 52 28 60 V64 H0Z M160 56 Q146 52 132 60 V64 H160Z" fill="#6E8A5A"/>`;
      o += h.palm(10, 64, 26) + h.palm(146, 64, 28) + h.palm(136, 64, 18);
      o += `<path d="M0 92 Q30 86 50 94 Q60 100 0 100Z M160 94 Q130 90 116 96 L114 100 H160Z" fill="#6E8A5A"/>`;
      return o;
    },
    bali: (h) => {
      let o = cloud(130, 18, 0.9) + `<path d="M60 44 L98 18 Q104 15 110 18 L150 44 Z" fill="#A9B8CF"/>`;
      ["#B6D676", "#9CCB66", "#86BE5A", "#74B04E", "#5FA044", "#4E8E3A"].forEach((c, k) => { const y = 38 + k * 11; o += `<path d="M0 ${y + 4} Q40 ${y - 6} 80 ${y + 2} T160 ${y - 2} V100 H0Z" fill="${c}"/><path d="M0 ${y + 4} Q40 ${y - 6} 80 ${y + 2} T160 ${y - 2}" stroke="#E4F2B8" stroke-width="1.2" fill="none" opacity=".8"/>`; });
      o += h.palm(18, 50, 26) + h.palm(30, 54, 20) + h.palm(142, 60, 24);
      o += `<rect x="112" y="56" width="3" height="14" fill="#7A5A40"/>`;
      [[113.5, 58, 13], [113.5, 52, 10], [113.5, 47, 7], [113.5, 43, 4.6]].forEach(([x, y, w]) => { o += `<path d="M${x - w} ${y} L${x - w * 0.6} ${y - 4} H${x + w * 0.6} L${x + w} ${y} Z" fill="#5A4A48"/>`; });
      return o;
    },
    maldives: (h) => {
      let o = h.sun(28, 20, 7) + cloud(118, 20, 0.8);
      o += `<rect x="0" y="54" width="160" height="46" fill="${h.water}"/><path d="M0 62 Q60 56 120 64 T160 62 V100 H0Z" fill="#6FD3CF"/><path d="M0 76 Q60 70 120 78 T160 76 V100 H0Z" fill="#9BE3DB"/>` + h.waves(68, 4);
      o += `<ellipse cx="136" cy="62" rx="22" ry="5" fill="#F4E3BE"/>` + h.palm(132, 62, 18) + h.palm(142, 62, 14);
      o += `<path d="M14 80 L100 66" stroke="#B88A60" stroke-width="2"/>`;
      [[28, 77], [52, 73], [76, 69], [98, 66]].forEach(([x, y], k) => { const s = 1 - k * 0.14; o += `<path d="M${x - 6 * s} ${y + 2} V${y + 10 * s} M${x + 6 * s} ${y + 2} V${y + 10 * s}" stroke="#8A6040" stroke-width="${1.4 * s}"/><rect x="${x - 8 * s}" y="${y - 5 * s}" width="${16 * s}" height="${7 * s}" fill="#E8D0A8"/><rect x="${x - 2 * s}" y="${y - 3 * s}" width="${4 * s}" height="${5 * s}" fill="#8A6040"/><path d="M${x - 11 * s} ${y - 4 * s} L${x} ${y - 13 * s} L${x + 11 * s} ${y - 4 * s} Z" fill="#C79A5A"/><path d="M${x - 11 * s} ${y - 4 * s} L${x} ${y - 13 * s} L${x - 3 * s} ${y - 4 * s} Z" fill="#B5874A"/>`; });
      o += `<ellipse cx="120" cy="90" rx="10" ry="1.6" fill="#fff" opacity=".5"/>`;
      return o;
    },
    reef: (h) => {
      let o = `<path d="M30 0 L50 0 L30 70 L18 70 Z M80 0 L96 0 L84 66 L72 66 Z M124 0 L138 0 L136 60 L124 60 Z" fill="#fff" opacity=".14"/>`;
      o += `<path d="M0 86 Q40 78 80 86 T160 84 V100 H0Z" fill="#F2DDB0"/>`;
      o += `<path d="M18 88 V74 M18 80 L12 70 M18 78 L24 66 M24 66 L22 60 M24 66 L28 62 M12 70 L10 64" stroke="#F48BA8" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      o += `<path d="M118 88 Q112 70 124 62 Q138 58 142 72 Q146 84 138 88 Z" fill="#F2A65A"/><path d="M122 86 L126 66 M128 86 L132 64 M134 86 L138 70 M120 74 L140 74 M121 80 L141 80" stroke="#E08A3E" stroke-width=".8"/>`;
      o += `<ellipse cx="60" cy="88" rx="12" ry="7" fill="#B59AE0"/><path d="M50 86 Q55 82 60 86 T70 86 M52 90 Q56 87 60 90 T68 90" stroke="#9A7ED0" stroke-width="1" fill="none"/>`;
      o += `<path d="M90 88 Q92 78 96 76 M96 88 Q98 80 102 78 M102 88 Q104 82 108 82" stroke="#6FBF8A" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="150" cy="88" rx="8" ry="4" fill="#E8607A"/>`;
      o += `<g transform="translate(96 34)"><ellipse cx="0" cy="0" rx="14" ry="9" fill="#6FA86A"/><path d="M-8 -4 L0 -7 L8 -4 L8 4 L0 7 L-8 4 Z" fill="#8EC07E"/><path d="M0 -7 V7 M-8 0 H8" stroke="#6FA86A" stroke-width=".8"/><ellipse cx="18" cy="-2" rx="5" ry="3.4" fill="#A8C98E"/><circle cx="20" cy="-3" r=".9" fill="#2E2A28"/><path d="M8 -6 Q14 -16 22 -14 Q14 -10 10 -4 Z M8 6 Q14 14 18 13 Q12 9 9 5 Z M-10 -5 Q-16 -10 -20 -8 Q-15 -5 -12 -3 Z" fill="#A8C98E"/></g>`;
      const fish = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8 0 L-12 -4 L-12 4 Z" fill="#F07A2E"/><ellipse cx="0" cy="0" rx="8" ry="4.6" fill="#F28A3A"/><path d="M-2 -4.4 Q-3 0 -2 4.4 M3 -4 Q2 0 3 4" stroke="#fff" stroke-width="1.6" fill="none"/><circle cx="5.4" cy="-1" r=".9" fill="#2E2A28"/></g>`;
      o += fish(40, 46, 1.1) + fish(56, 56, 0.8) + fish(130, 44, 0.9);
      [[30, 30, 1.6], [34, 22, 1.2], [110, 18, 1.4], [114, 10, 1], [70, 64, 1.2]].forEach(([x, y, r]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`; });
      return o;
    },
    sydney: (h) => {
      let o = h.sun(30, 18, 7);
      o += `<path d="M96 54 Q124 18 152 54" stroke="#8E9AAE" stroke-width="3" fill="none"/><path d="M100 50 Q124 26 148 50" stroke="#8E9AAE" stroke-width="1.2" fill="none"/><path d="M104 40 V54 M112 32 V54 M120 30 V54 M128 30 V54 M136 32 V54 M144 40 V54" stroke="#8E9AAE" stroke-width=".6"/><rect x="80" y="53" width="80" height="2.6" fill="#7A879C"/><rect x="92" y="46" width="6" height="11" fill="#C9C3B8"/><rect x="150" y="46" width="6" height="11" fill="#C9C3B8"/>`;
      o += `<rect x="0" y="56" width="160" height="44" fill="${h.water}"/>` + h.waves(84, 5);
      o += `<rect x="18" y="66" width="86" height="8" fill="#E3C9A8"/><rect x="18" y="74" width="86" height="3" fill="#C9AE8E"/>`;
      const sail = (x, w, ht, flip, c) => flip ? `<path d="M${x} 66 Q${x + w * 0.1} ${66 - ht * 0.6} ${x + w} ${66 - ht} Q${x + w * 0.8} ${66 - ht * 0.45} ${x + w * 0.9} 66 Z" fill="${c}"/>` : `<path d="M${x} 66 Q${x - w * 0.1} ${66 - ht * 0.6} ${x - w} ${66 - ht} Q${x - w * 0.8} ${66 - ht * 0.45} ${x - w * 0.9} 66 Z" fill="${c}"/>`;
      o += sail(30, 16, 16, true, "#F4F2EE") + sail(42, 18, 24, true, "#FFFFFF") + sail(56, 20, 30, true, "#F7F5F1") + sail(66, 14, 18, false, "#E6E2DA");
      o += sail(70, 14, 18, true, "#F4F2EE") + sail(82, 16, 24, true, "#FFFFFF") + sail(94, 12, 14, false, "#E6E2DA");
      o += `<path d="M44 66 Q50 54 56 66 M60 66 Q66 52 72 66" stroke="#E0DCD4" stroke-width=".6" fill="none"/>`;
      o += `<path d="M112 86 L132 86 L129 90 L115 90 Z" fill="#F6D57A"/><rect x="116" y="81" width="12" height="5" fill="#2E7A4E"/>`;
      return o;
    },

    /* --- Americhe --- */
    banff: (h) => {
      let o = cloud(30, 16, 0.8);
      [[0, 60, 14, 26], [18, 60, 32, 18], [40, 60, 52, 14], [62, 60, 76, 20], [86, 60, 100, 12], [108, 60, 122, 18], [130, 60, 144, 22], [150, 60, 162, 30]].forEach(([x1, y, x2, top], k) => { o += `<path d="M${x1 - 8} ${y} L${(x1 + x2) / 2} ${top} L${x2 + 8} ${y} Z" fill="${k % 2 ? "#8E96AE" : "#9AA2B8"}"/><path d="M${(x1 + x2) / 2} ${top} L${(x1 + x2) / 2 + 4} ${top + 6} L${(x1 + x2) / 2 - 1} ${top + 4} L${(x1 + x2) / 2 - 4} ${top + 6} Z" fill="#fff"/>`; });
      o += `<path d="M0 54 Q40 46 80 52 T160 50 V64 H0Z" fill="#5E8A6E"/>`;
      for (let k = 0; k < 14; k++) o += h.pine(k * 12 + 4, 64 + (k % 2) * 2, 12 + (k % 3) * 3, "#3F6E55");
      o += `<rect x="0" y="66" width="160" height="34" fill="#5CC7C4"/><path d="M0 66 H160 V72 H0Z" fill="#4FB2B4" opacity=".6"/>` + h.waves(80, 4);
      o += `<path d="M0 82 Q30 76 50 86 L54 100 H0Z" fill="#9AA2A8"/><path d="M8 88 Q20 84 34 90" stroke="#B9C0C4" stroke-width="2" fill="none"/>`;
      o += `<path d="M90 82 Q106 88 124 82 Q107 85 90 82 Z" fill="#E2654F"/><path d="M90 82 Q107 86 124 82" stroke="#B8442E" stroke-width="1.6" fill="none"/>`;
      o += h.pine(144, 98, 34, "#2F5E46") + h.pine(156, 98, 26, "#3F6E55");
      return o;
    },
    hawaii: (h) => {
      let o = cloud(30, 18, 0.8);
      o += `<path d="M40 64 L82 26 Q88 22 96 26 L150 64 Z" fill="#6E6676"/><path d="M96 26 L150 64 L120 64 Q104 40 92 28 Z" fill="#5E5666"/><path d="M84 26 Q88 30 92 26 Q90 34 94 42 Q92 50 98 64 L92 64 Q86 52 88 42 Q84 34 84 26 Z" fill="#F2834A"/><path d="M86 27 Q89 34 88 42" stroke="#FFD27A" stroke-width="1.4" fill="none"/>`;
      o += `<ellipse cx="88" cy="18" rx="10" ry="5" fill="#E6E2E8" opacity=".85"/><ellipse cx="96" cy="10" rx="8" ry="4" fill="#E6E2E8" opacity=".6"/>`;
      o += `<rect x="0" y="62" width="160" height="38" fill="${h.water}"/>` + h.waves(70, 4);
      o += `<path d="M0 82 Q60 72 160 80 V100 H0Z" fill="#F4DDAA"/><path d="M0 82 Q60 72 160 80" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8"/>`;
      o += h.palm(18, 90, 32) + h.palm(136, 88, 28);
      o += `<path d="M104 92 Q103 74 108 66 Q113 74 112 92 Z" fill="#F6D57A"/><path d="M108 67 V92" stroke="#E2654F" stroke-width="1.4"/>`;
      o += `<g transform="translate(62 90)"><circle cx="0" cy="-3" r="3" fill="#F2647A"/><circle cx="3" cy="0" r="3" fill="#F2647A"/><circle cx="1" cy="3.4" r="3" fill="#F2647A"/><circle cx="-2.6" cy="2.6" r="3" fill="#F2647A"/><circle cx="-3" cy="-1" r="3" fill="#F2647A"/><circle cx="0" cy="0.4" r="1.4" fill="#F6D57A"/></g>`;
      return o;
    },
    galapagos: (h) => {
      let o = h.sun(130, 18, 6) + `<rect x="0" y="52" width="160" height="48" fill="${h.water}"/>` + h.waves(60, 3);
      o += `<path d="M0 62 Q40 54 80 62 T160 60 V100 H0Z" fill="#C9B48A"/><path d="M0 80 Q50 70 100 78 T160 76 V100 H0Z" fill="#B49E74"/>`;
      o += `<path d="M138 74 V50" stroke="#8A6E50" stroke-width="3"/><ellipse cx="138" cy="44" rx="5" ry="7" fill="#6EA86A"/><ellipse cx="130" cy="52" rx="4.4" ry="6" transform="rotate(-30 130 52)" fill="#7EB87A"/><ellipse cx="146" cy="50" rx="4.4" ry="6" transform="rotate(30 146 50)" fill="#6EA86A"/><ellipse cx="148" cy="40" rx="3.4" ry="5" transform="rotate(20 148 40)" fill="#7EB87A"/><circle cx="138" cy="37" r="1.4" fill="#F6D57A"/>`;
      o += `<path d="M30 90 L30 84 M44 90 L44 85 M78 90 L78 85 M92 90 L92 84" stroke="#7E7258" stroke-width="5" stroke-linecap="round"/>`;
      o += `<path d="M24 84 Q30 52 62 50 Q94 52 100 84 Z" fill="#6E6A52"/><path d="M40 70 L50 62 H74 L84 70 L74 80 H50 Z M40 70 L28 72 M84 70 L96 72 M50 62 L44 56 M74 62 L80 56 M62 50 V62 M50 80 L46 84 M74 80 L78 84" stroke="#565240" stroke-width="1.2" fill="none"/><path d="M22 84 H102" stroke="#5A5640" stroke-width="2.4" stroke-linecap="round"/>`;
      o += `<path d="M98 76 Q108 66 116 62" stroke="#8E8670" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="120" cy="60" rx="7" ry="5" fill="#8E8670"/><circle cx="123" cy="58" r="1.2" fill="#2E2A28"/><path d="M122 63 Q125 64 127 62" stroke="#5E5848" stroke-width=".8" fill="none"/>`;
      o += `<path d="M4 94 q4 -3 8 0 M150 92 q4 -3 8 0" stroke="#8A7A5A" stroke-width="1" fill="none"/>`;
      return o;
    },
    machupicchu: (h) => {
      let o = `<path d="M0 50 L24 30 L44 44 Z" fill="#AFC2BE"/><path d="M118 40 L148 22 L172 46 Z" fill="#AFC2BE"/>`;
      o += `<path d="M76 70 Q80 30 98 14 Q106 8 112 14 Q124 30 128 70 Z" fill="#5E9A62"/><path d="M106 10 Q118 26 128 70 L114 70 Q112 36 106 10 Z" fill="#4E8452"/>`;
      o += cloud(46, 30, 1, 0.85) + cloud(140, 52, 0.9, 0.8);
      o += `<path d="M0 66 Q60 56 160 66 V100 H0Z" fill="#8CC27A"/>`;
      [70, 77, 84, 91].forEach((y, k) => { o += `<path d="M${-2 + k * 4} ${y} H${150 - k * 6}" stroke="#6EA65E" stroke-width="1.4"/>`; });
      [[22, 64, 16, 8], [44, 60, 14, 9], [64, 62, 18, 8], [90, 66, 14, 7], [112, 68, 16, 7], [32, 76, 14, 7], [58, 78, 16, 6]].forEach(([x, y, w, ht]) => { o += `<rect x="${x}" y="${y}" width="${w}" height="${ht}" fill="#B9B2A6"/><path d="M${x + 3} ${y + ht} V${y + 3} H${x + 6} V${y + ht} M${x + w - 6} ${y + ht} V${y + 3} H${x + w - 3} V${y + ht}" fill="#7E776C"/>`; });
      o += `<path d="M44 60 L51 52 L58 60 Z" fill="#B9B2A6"/>`;
      o += llama(130, 94, 1.1);
      return o;
    },
    uyuni: (h) => {
      let o = cloud(36, 20, 1.2) + cloud(112, 14, 0.9) + cloud(146, 30, 0.7);
      o += `<path d="M0 54 L20 48 L36 52 L56 46 L70 52 L96 50 L112 44 L130 50 L160 48 V54 Z" fill="#A9A0C0"/>`;
      o += `<rect x="0" y="54" width="160" height="46" fill="#C6E3F6"/><rect x="0" y="80" width="160" height="20" fill="#A8D2F0"/><path d="M0 54 L20 60 L36 56 L56 62 L70 56 L96 58 L112 64 L130 58 L160 60 V54 Z" fill="#A9A0C0" opacity=".55"/>`;
      o += `<g transform="translate(0 108) scale(1 -1)" opacity=".55">${cloud(36, 20, 1.2) + cloud(112, 14, 0.9)}</g>`;
      o += `<path d="M0 54 H160" stroke="#fff" stroke-width="1" opacity=".9"/>`;
      const flamingo = (x, y, s, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M0 0 V-12 M1.6 0 V-8 L-1 -11" stroke="#E8708E" stroke-width=".9" fill="none"/><ellipse cx="0.6" cy="-15" rx="6" ry="3.6" fill="#F48BA8"/><path d="M5 -16 Q9 -20 6 -26 Q5 -30 9 -30" stroke="#F48BA8" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M9 -30 l2.6 1.4 l-1 1.6" stroke="#3A2E2A" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`;
      o += flamingo(64, 72, 1) + `<g transform="translate(0 144) scale(1 -1)" opacity=".35">${flamingo(64, 72, 1)}</g>`;
      o += flamingo(84, 70, 0.8, true) + `<g transform="translate(0 140) scale(1 -1)" opacity=".35">${flamingo(84, 70, 0.8, true)}</g>`;
      o += `<path d="M0 90 Q30 86 50 92 M90 96 Q120 88 160 94 M30 98 L44 92 M120 99 L128 92" stroke="#fff" stroke-width=".8" fill="none" opacity=".5"/>`;
      return o;
    },
    patagonia: (h) => {
      let o = `<path d="M10 64 L30 46 L44 52 Z M120 56 L140 40 L162 60 Z" fill="#B7B6CC"/>`;
      o += `<path d="M40 66 L56 40 L62 44 L70 22 L76 30 L82 10 L90 28 L96 22 L104 40 L110 36 L124 66 Z" fill="#8C8AA0"/><path d="M82 10 L90 28 L96 22 L104 40 L110 36 L124 66 L102 66 Q96 40 86 22 Z" fill="#E8A08E" opacity=".55"/>`;
      o += `<path d="M62 44 L66 46 L60 50 Z M82 10 L85 18 L80 20 Z M70 22 L72 30 L67 30 Z M56 40 L58 46 L52 48 Z" fill="#fff"/>`;
      o += `<path d="M56 60 Q80 50 108 60 L104 66 H60 Z" fill="#E8F2F8"/>`;
      o += `<path d="M0 66 Q40 60 80 64 T160 62 V100 H0Z" fill="#8E9A78"/><ellipse cx="82" cy="70" rx="34" ry="5" fill="#6FC4D2"/><ellipse cx="78" cy="69" rx="14" ry="1.4" fill="#fff" opacity=".5"/>`;
      o += `<path d="M0 80 Q50 72 100 80 T160 78 V100 H0Z" fill="#C9B26A"/>`;
      [[14, 80, 9, "#D9673E"], [28, 84, 7, "#E8893E"], [136, 78, 10, "#D9673E"], [150, 82, 8, "#E8A04A"]].forEach(([x, y, r, c]) => { o += `<rect x="${x - 1}" y="${y}" width="2" height="8" fill="#6E5038"/><ellipse cx="${x}" cy="${y - 2}" rx="${r}" ry="${r * 0.7}" fill="${c}"/>`; });
      o += `<path d="M60 92 q3 -4 6 0 M96 94 q3 -4 6 0 M110 90 q3 -4 6 0" stroke="#A8924E" stroke-width="1" fill="none"/>`;
      return o;
    },
    moai: (h) => {
      let o = h.sun(30, 26, 8, "#FFE0A0") + `<rect x="0" y="56" width="160" height="44" fill="${h.water}"/>` + h.waves(62, 3);
      o += `<path d="M0 70 Q40 60 80 66 T160 62 V100 H0Z" fill="#8CBE6E"/><path d="M0 86 Q60 78 160 86 V100 H0Z" fill="#7AAE5E"/>`;
      o += `<rect x="40" y="76" width="96" height="6" fill="#9A9080"/>`;
      o += moai(52, 76, 1, false) + moai(72, 76, 1.12, true) + moai(94, 76, 1.18, false) + moai(116, 76, 1.04, true);
      o += gull(130, 26) + gull(142, 34);
      o += `<path d="M10 92 l2 -5 l2 5 M150 94 l2 -5 l2 5" stroke="#5E9A4E" stroke-width="1" fill="none"/>`;
      return o;
    },
    antarctica: (h) => {
      let o = h.sun(28, 18, 6, "#FFF0C0");
      o += `<rect x="0" y="56" width="160" height="44" fill="${h.water}"/>` + h.waves(64, 4);
      o += `<path d="M80 60 L90 34 L104 28 L114 40 L124 36 L134 60 Z" fill="#F4FAFD"/><path d="M104 28 L114 40 L124 36 L134 60 L114 60 Q114 44 104 28 Z" fill="#CFE6F2"/><path d="M80 60 H134 L130 66 H86 Z" fill="#9FD0E6" opacity=".6"/>`;
      o += `<path d="M10 58 L18 46 L30 44 L38 58 Z" fill="#F4FAFD"/><path d="M30 44 L38 58 L30 58 Z" fill="#CFE6F2"/><path d="M140 62 L146 54 L156 56 L160 62 Z" fill="#E8F4FA"/>`;
      o += `<path d="M58 68 Q60 62 66 64 Q62 66 62 70 Z" fill="#5E6A7E"/><path d="M56 70 h14" stroke="#fff" stroke-width=".8" opacity=".7"/>`;
      o += `<path d="M0 76 Q40 70 80 76 T160 74 V100 H0Z" fill="#F4FAFD"/><path d="M0 76 Q40 70 80 76 T160 74 V78 Q120 80 80 80 T0 80Z" fill="#CFE6F2"/>`;
      o += penguin(64, 94, 1.3) + penguin(86, 94, 1.1) + penguin(100, 94, 0.8) + penguin(40, 92, 0.9);
      o += `<ellipse cx="75" cy="94.5" rx="20" ry="1.6" fill="#CFE6F2"/>`;
      return o;
    }
  });
}
