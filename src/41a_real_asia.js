/* Luoghi veri per giapponese, coreano, cinese semplificato e cinese tradizionale */
Object.assign(REAL, {
  ja: [
    { art: "tokyo", name: "東京", t: "空にとどくタワー", s: "{n}は東京スカイツリーにのぼって、おもちゃみたいに小さな街を見下ろしました。高さは634メートル、世界でいちばん高いタワーなんです。" },
    { art: "fuji", name: "富士山", t: "雪の帽子の山", s: "{n}は湖のほとりから、雪の帽子をかぶった富士山をながめました。高さは3776メートル、日本でいちばん高い山です。" },
    { art: "kyoto", name: "京都", t: "赤い鳥居のトンネル", s: "{n}は京都の伏見稲荷大社で、どこまでも続く赤い鳥居の下を歩きました。鳥居はなんと約1万基もあって、とても数えきれませんでした。" },
    { art: "hokkaido", name: "北海道", t: "雪の中のダンス", s: "雪の北海道で、{n}はタンチョウが楽しそうにダンスをするのを見ました。頭の赤いところは羽ではなく、じつは肌の色なんです。" }
  ],
  ko: [
    { art: "seoul", name: "서울", t: "임금님의 궁궐", s: "{n}, 서울의 경복궁에서 알록달록한 지붕 아래를 천천히 걸었어요. 경복궁은 1395년에 지어진, 조선 시대의 가장 큰 궁궐이에요." },
    { art: "busan", name: "부산", t: "알록달록 바닷가 마을", s: "{n}, 부산의 감천문화마을에서 바다가 보이는 알록달록한 집들 사이를 걸었어요. 마을 위쪽에는 어린 왕자와 여우 조각상이 앉아서 마을을 내려다보고 있어요." },
    { art: "seorak", name: "설악산", t: "빨갛고 노란 단풍산", s: "{n}, 설악산에서 빨갛고 노랗게 물든 단풍 사이를 걸었어요. 설악산은 해마다 우리나라에서 가장 먼저 단풍이 드는 산 중 하나예요." },
    { art: "jeju", name: "제주도", t: "돌하르방, 안녕!", s: "{n}, 제주도에서 새콤달콤한 귤을 맛보고 돌하르방에게 인사했어요. '돌하르방'은 제주 말로 '돌 할아버지'라는 뜻이에요." }
  ],
  zh: [
    { art: "greatwall", name: "长城", t: "一步一步向前走", s: "{n} 在长城上走了好久,数着一座又一座烽火台。长城全长两万多公里,一天可走不完!" },
    { art: "shanghai", name: "上海", t: "江边的明珠", s: "{n} 在上海外滩散步,看着黄浦江对岸的高楼一座座亮起灯。那座串着粉色大圆球的塔叫东方明珠,有468米高。" },
    { art: "guilin", name: "桂林", t: "像画一样的山水", s: "{n} 坐着竹筏漂在桂林的漓江上,两岸的山像一个个绿色的馒头。二十元人民币的背面,印的就是这里的风景!" },
    { art: "zhangjiajie", name: "张家界", t: "云中的石柱", s: "{n} 在张家界看见一根根高高的石柱从云里冒出来。这里有三千多座这样的石峰,像一片站在云中的森林。" }
  ],
  zht: [
    { art: "taipei101", name: "台北101", t: "大樓裡的大金球", s: "{n} 搭上台北101的超快電梯,不到一分鐘就到了觀景台。大樓裡還掛著一顆超大的金色「阻尼球」,颱風來時能幫大樓保持穩定。" },
    { art: "jiufen", name: "九份", t: "紅燈籠的山城", s: "傍晚,{n} 在九份的老街上看著紅燈籠一盞盞亮起來。很久很久以前,這裡是一個挖金礦的小鎮呢!" },
    { art: "sunmoonlake", name: "日月潭", t: "太陽和月亮的湖", s: "{n} 坐著小船遊日月潭,湖水又綠又安靜。湖的一邊圓圓的像太陽,另一邊彎彎的像月亮,所以叫做日月潭。" },
    { art: "taroko", name: "太魯閣", t: "大理石峽谷", s: "{n} 走進太魯閣,抬頭看見好高好高的峭壁。這些峭壁大多是大理石,是溪水花了很久很久才切出來的。" }
  ]
});

Object.assign(REAL_SKY2, {
  tokyo: ["#F9D9C2", "#CFE3F4"], fuji: ["#BFDDF4", "#FBE6DA"], kyoto: ["#DDEBD8", "#F6EFDF"], hokkaido: ["#D3E3F2", "#F4F7FB"],
  seoul: ["#F8E1C4", "#CFE4F2"], busan: ["#BFE3F7", "#FBEFD9"], seorak: ["#CFE4F5", "#F8EEDF"], jeju: ["#BFE3F7", "#F4F0DE"],
  greatwall: ["#F8DDBF", "#D4E6F2"], shanghai: ["#F7CFA8", "#B9D3EC"], guilin: ["#DCEBEE", "#F4F1E4"], zhangjiajie: ["#DDE9EC", "#F4F1E6"],
  taipei101: ["#CFE6F7", "#F6EEDF"], jiufen: ["#C9B8DE", "#F6CFAE"], sunmoonlake: ["#F7DCC4", "#CFE3EE"], taroko: ["#CFE6F2", "#EEF4F2"]
});

Object.assign(REAL_ART2, {
  /* --- Giappone --- */
  tokyo: (h) => {
    let o = h.sun(26, 20, 7);
    [[0, 64, 14], [12, 70, 12], [24, 60, 12], [36, 68, 14], [100, 66, 12], [112, 58, 12], [124, 68, 14], [140, 62, 20]].forEach(([x, y, wd], k) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${92 - y}" fill="${k % 2 ? "#B9C6DA" : "#A8B7CF"}"/>`; for (let yy = y + 4; yy < 88; yy += 6) o += `<rect x="${x + 3}" y="${yy}" width="${wd - 6}" height="1.6" fill="#E9EEF5" opacity=".8"/>`; });
    o += `<path d="M44 92 L50 50 L52 50 L58 92 Z M47 74 H55 M48.5 62 H53.5" fill="#E8775A" stroke="#F6F1EA" stroke-width="1.2"/><rect x="47" y="46" width="8" height="4" fill="#E8775A"/><path d="M51 46 V36" stroke="#E8775A" stroke-width="1.4"/>`;
    o += `<path d="M71 92 L77.5 44 L77.5 22 L79 8 L81 8 L82.5 22 L82.5 44 L89 92 Z" fill="#E4ECF3"/><path d="M80 8 V92" stroke="#C6D3E0" stroke-width="1.2"/><path d="M73 80 L87 66 M87 80 L73 66 M75 62 L85 52 M85 62 L75 52" stroke="#C6D3E0" stroke-width=".8"/>`;
    o += `<rect x="73" y="40" width="14" height="5" rx="2" fill="#B7C8DA"/><rect x="75.5" y="25" width="9" height="4" rx="1.6" fill="#B7C8DA"/><path d="M80 8 V1" stroke="#B7C8DA" stroke-width="1.2"/>`;
    o += `<path d="M0 90 Q40 84 80 90 T160 88 V100 H0Z" fill="#9CC98A"/>`;
    [[14, 84], [140, 84]].forEach(([x, y]) => { o += `<rect x="${x - 1.2}" y="${y}" width="2.4" height="10" fill="#8A6040"/><circle cx="${x}" cy="${y - 4}" r="10" fill="#F6C1D0"/><circle cx="${x - 7}" cy="${y}" r="6" fill="#F6C1D0"/><circle cx="${x + 7}" cy="${y}" r="6" fill="#F2AEC2"/><circle cx="${x + 3}" cy="${y - 8}" r="4" fill="#FADCE5"/>`; });
    o += `<circle cx="32" cy="94" r="1.4" fill="#F6C1D0"/><circle cx="118" cy="96" r="1.4" fill="#F6C1D0"/>`;
    return o;
  },
  fuji: (h) => {
    let o = h.sun(130, 18, 7);
    o += `<path d="M0 78 L66 24 Q80 16 94 24 L160 78 Z" fill="#7F96C4"/><path d="M94 24 L160 78 L120 78 Q110 50 90 30 Z" fill="#6C83B2" opacity=".6"/>`;
    o += `<path d="M56 32 L66 24 Q80 16 94 24 L104 32 L98 37 L92 32 L86 38 L80 32 L74 38 L68 32 L62 37 Z" fill="#fff"/>`;
    o += `<path d="M0 74 Q40 66 80 76 T160 72 V82 H0Z" fill="#8DBF7A"/>`;
    o += `<rect x="0" y="80" width="160" height="20" fill="${h.water}"/><path d="M40 82 L80 96 L120 82 Z" fill="#9FB3D8" opacity=".35"/>` + h.waves(88, 4);
    o += `<g transform="translate(30 0)">`;
    [[0, 66, 22], [1, 56, 18], [2, 47, 15], [3, 39, 12], [4, 32, 9]].forEach(([k, y, wd]) => { o += `<rect x="${-wd / 2 + 3}" y="${y}" width="${wd - 6}" height="${k ? 6 : 12}" fill="#D9573E"/><path d="M${-wd / 2 - 2} ${y + 1} Q0 ${y - 3} ${wd / 2 + 2} ${y + 1} L${wd / 2 - 2} ${y - 3} L${-wd / 2 + 2} ${y - 3} Z" fill="#5A4A48"/>`; });
    o += `<path d="M0 29 V20" stroke="#5A4A48" stroke-width="1.4"/><rect x="-2" y="70" width="4" height="8" fill="#8E3B2E"/></g>`;
    [[8, 68, 9], [52, 72, 7], [146, 70, 9]].forEach(([x, y, r]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="#F6C1D0"/><circle cx="${x + r * .6}" cy="${y - r * .5}" r="${r * .6}" fill="#FADCE5"/>`; });
    return o;
  },
  kyoto: (h) => {
    let o = `<path d="M0 0 H160 V60 Q120 44 80 46 Q40 44 0 60 Z" fill="#6E9A6A"/><path d="M0 0 H160 V30 Q120 18 80 22 Q40 18 0 30 Z" fill="#88B07E" opacity=".6"/>`;
    o += `<path d="M0 100 V58 Q40 46 80 47 Q120 46 160 58 V100 Z" fill="#B9C79A"/><path d="M74 47 H86 L124 100 H36 Z" fill="#E8DDC8"/>`;
    const torii = (by, wd, ht, dark) => {
      const c = dark ? "#C9502F" : "#E8603C", px = wd * 0.07;
      let s = `<rect x="${80 - wd / 2}" y="${by - ht}" width="${px}" height="${ht}" fill="${c}"/><rect x="${80 + wd / 2 - px}" y="${by - ht}" width="${px}" height="${ht}" fill="${c}"/>`;
      s += `<rect x="${80 - wd * 0.56}" y="${by - ht * 0.8}" width="${wd * 1.12}" height="${ht * 0.06}" fill="${c}"/>`;
      s += `<path d="M${80 - wd * 0.68} ${by - ht * 1.02} Q80 ${by - ht * 0.9} ${80 + wd * 0.68} ${by - ht * 1.02} L${80 + wd * 0.64} ${by - ht * 0.92} Q80 ${by - ht * 0.84} ${80 - wd * 0.64} ${by - ht * 0.92} Z" fill="${c}"/>`;
      s += `<path d="M${80 - wd * 0.7} ${by - ht * 1.06} Q80 ${by - ht * 0.94} ${80 + wd * 0.7} ${by - ht * 1.06} L${80 + wd * 0.68} ${by - ht * 1.01} Q80 ${by - ht * 0.89} ${80 - wd * 0.68} ${by - ht * 1.01} Z" fill="#3A2E2A"/>`;
      s += `<rect x="${80 - wd / 2 - px * 0.15}" y="${by - ht * 0.1}" width="${px * 1.3}" height="${ht * 0.1}" fill="#3A2E2A"/><rect x="${80 + wd / 2 - px * 1.15}" y="${by - ht * 0.1}" width="${px * 1.3}" height="${ht * 0.1}" fill="#3A2E2A"/>`;
      return s;
    };
    [[50, 12, 10], [53, 18, 15], [57, 26, 21], [62, 38, 30], [70, 56, 44], [81, 84, 64]].forEach(([by, wd, ht], k) => { o += torii(by, wd, ht, k < 4); });
    o += torii(104, 136, 96, false);
    o += `<rect x="38" y="78" width="5" height="7" rx="1" fill="#E9E1D2"/><rect x="37" y="76" width="7" height="2" fill="#B8AE9C"/><rect x="117" y="78" width="5" height="7" rx="1" fill="#E9E1D2"/><rect x="116" y="76" width="7" height="2" fill="#B8AE9C"/>`;
    return o;
  },
  hokkaido: (h) => {
    let o = `<path d="M0 58 Q40 38 80 52 T160 46 V100 H0Z" fill="#E6EEF7"/><path d="M0 70 Q50 56 100 66 T160 62 V100 H0Z" fill="#F6F9FC"/>`;
    [[14, 62, 20], [26, 64, 16], [130, 58, 22], [144, 62, 17], [152, 60, 13]].forEach(([x, y, ht]) => { o += h.pine(x, y, ht, "#4E7A68") + `<path d="M${x} ${y - ht} L${x + ht * 0.18} ${y - ht * 0.52} L${x - ht * 0.18} ${y - ht * 0.52} Z M${x - ht * 0.3} ${y - ht * 0.2} Q${x} ${y - ht * 0.32} ${x + ht * 0.3} ${y - ht * 0.2}" fill="#fff"/>`; });
    o += `<path d="M0 84 Q80 74 160 84 V100 H0Z" fill="#fff"/>`;
    const crane = (x, y, sc, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -sc : sc} ${sc})"><path d="M-6 0 L-8 16 M2 0 L3 16" stroke="#5A4A48" stroke-width="1.2"/><path d="M-14 -6 Q-22 -4 -20 4 Q-14 2 -10 0 Z" fill="#33302E"/><ellipse cx="-2" cy="-4" rx="13" ry="7" fill="#fff" stroke="#D5DDE8" stroke-width=".8"/><path d="M8 -8 Q12 -18 10 -28" stroke="#33302E" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="10.5" cy="-29" r="3" fill="#fff" stroke="#D5DDE8" stroke-width=".6"/><circle cx="10.5" cy="-31" r="1.6" fill="#E2453A"/><path d="M13 -29 L19 -27.5" stroke="#B8A27A" stroke-width="1.4" stroke-linecap="round"/><path d="M-6 -8 Q-16 -26 -28 -24 Q-20 -16 -10 -4 Z" fill="#fff" stroke="#D5DDE8" stroke-width=".8"/><path d="M-28 -24 Q-24 -21 -22 -18" stroke="#33302E" stroke-width="1.6" fill="none"/></g>`;
    o += crane(58, 80, 1, false) + crane(110, 82, 0.85, true);
    [[20, 14], [44, 28], [70, 10], [96, 24], [124, 12], [146, 30], [32, 44], [108, 40], [84, 36], [10, 34], [150, 8]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="1.4" fill="#fff"/>`; });
    return o;
  },

  /* --- Corea --- */
  seoul: (h) => {
    let o = `<path d="M0 60 Q30 30 62 40 Q84 18 112 36 Q136 30 160 48 V80 H0Z" fill="#8FAE8A"/><path d="M0 66 Q40 52 80 60 T160 58 V80 H0Z" fill="#7A9E78"/>`;
    o += `<path d="M142 40 V16" stroke="#E9E6EC" stroke-width="2"/><rect x="139" y="18" width="6" height="4" rx="1.5" fill="#E9E6EC"/><path d="M142 16 V10" stroke="#C9C3CF" stroke-width="1"/>`;
    o += `<rect x="0" y="66" width="34" height="12" fill="#E8DCC8"/><path d="M-2 68 Q16 72 36 66 L30 62 L0 62 Z" fill="#5A6478"/><rect x="126" y="66" width="34" height="12" fill="#E8DCC8"/><path d="M124 66 Q144 72 162 68 L160 62 L130 62 Z" fill="#5A6478"/>`;
    o += `<rect x="20" y="76" width="120" height="8" fill="#E6DCCB"/><rect x="30" y="72" width="100" height="5" fill="#EFE7DA"/><path d="M72 84 L76 72 H84 L88 84 Z" fill="#D8CCB6"/>`;
    o += `<rect x="38" y="58" width="84" height="14" fill="#C8503B"/><rect x="38" y="57" width="84" height="4" fill="#4FA088"/>`;
    [44, 56, 68, 92, 104, 116].forEach((x) => { o += `<rect x="${x}" y="62" width="4" height="10" fill="#E9C99A" opacity=".55"/>`; });
    o += `<rect x="76" y="62" width="8" height="10" fill="#7A3A2E"/>`;
    o += `<path d="M24 52 Q80 64 136 52 L118 44 L42 44 Z" fill="#5A6478"/><path d="M28 52 Q80 62 132 52" stroke="#7A86A0" stroke-width="1" fill="none"/>`;
    o += `<rect x="52" y="38" width="56" height="7" fill="#C8503B"/><rect x="52" y="37" width="56" height="3" fill="#4FA088"/>`;
    o += `<path d="M38 38 Q80 50 122 38 L104 28 L56 28 Z" fill="#5A6478"/><path d="M54 28 Q52 25 56 26 L104 26 Q108 25 106 28 Z" fill="#3E4658"/><path d="M42 38 Q80 48 118 38" stroke="#7A86A0" stroke-width="1" fill="none"/>`;
    o += `<path d="M0 84 H160 V100 H0Z" fill="#EDE4D3"/>`;
    return o;
  },
  busan: (h) => {
    let o = h.sun(28, 18, 7) + `<rect x="0" y="60" width="160" height="40" fill="${h.water}"/>` + h.waves(72, 2);
    o += `<path d="M0 44 H48" stroke="#E9EEF2" stroke-width="1.8"/><path d="M10 52 V30 M38 52 V30" stroke="#E9EEF2" stroke-width="2.4"/><path d="M0 40 Q10 30 10 30 Q24 46 38 30 Q44 36 48 40" stroke="#E9EEF2" stroke-width=".9" fill="none"/><path d="M0 52 H48" stroke="#C9D6E0" stroke-width="2"/>`;
    o += `<path d="M44 100 Q60 70 100 48 Q130 34 160 30 V100 Z" fill="#8FAE7A"/>`;
    const cols = ["#F2B46B", "#9CC6E8", "#F6D57A", "#E9A2A2", "#A9D6B0", "#C9B3E6", "#F7EFE2", "#7FB8D8"];
    let k = 0;
    [[92, 56, 3], [76, 66, 5], [62, 77, 7], [52, 88, 9]].forEach(([x0, y, n], r) => { for (let i = 0; i < n; i++) { const x = x0 + i * 13 + (r % 2) * 3; if (x > 158) continue; const c = cols[(k++ * 3 + r) % cols.length]; o += `<rect x="${x}" y="${y}" width="11" height="10" fill="${c}"/><rect x="${x - .5}" y="${y - 1.4}" width="12" height="1.6" fill="#fff" opacity=".7"/><rect x="${x + 3}" y="${y + 3}" width="3" height="3" fill="#4E5A7E" opacity=".55"/>`; } });
    [[110, 46, 4], [124, 40, 3], [138, 34, 2]].forEach(([x0, y, n]) => { for (let i = 0; i < n; i++) { const x = x0 + i * 12; if (x > 158) continue; o += `<rect x="${x}" y="${y}" width="10" height="9" fill="${cols[(x + y) % cols.length]}"/><rect x="${x + 3}" y="${y + 3}" width="3" height="3" fill="#4E5A7E" opacity=".55"/>`; } });
    o += `<path d="M14 82 L34 82 L31 86 L17 86 Z" fill="#E2654F"/><rect x="21" y="77" width="7" height="5" fill="#fff"/>`;
    return o;
  },
  seorak: (h) => {
    let o = h.sun(132, 18, 6);
    o += `<path d="M0 64 L16 36 L24 44 L36 24 L46 40 L58 30 L70 48 L80 56 Z" fill="#A9AEB8"/><path d="M60 60 Q66 36 78 30 Q84 22 92 28 Q100 20 108 28 Q118 24 122 36 Q130 40 132 60 Z" fill="#C3C2C4"/><path d="M78 30 Q80 44 76 58 M92 28 Q94 42 90 58 M108 28 Q110 44 106 58" stroke="#A3A2A6" stroke-width="1.2" fill="none"/>`;
    o += `<path d="M120 60 L136 40 L146 50 L160 36 V64Z" fill="#A9AEB8"/>`;
    o += `<path d="M0 66 Q40 52 80 60 T160 56 V100 H0Z" fill="#D88A4A"/>`;
    [[8, 66, 9, "#E2654F"], [24, 62, 10, "#F2B04A"], [42, 64, 9, "#D9503E"], [60, 62, 10, "#F2C45A"], [78, 64, 9, "#E8794A"], [96, 60, 10, "#D9503E"], [114, 62, 9, "#F2B04A"], [132, 58, 10, "#E2654F"], [150, 60, 10, "#F2C45A"], [14, 80, 11, "#F2B04A"], [36, 78, 10, "#E8794A"], [118, 78, 11, "#D9503E"], [142, 80, 10, "#F2B04A"]].forEach(([x, y, r, c]) => { o += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .4}" fill="#fff" opacity=".18"/>`; });
    o += `<path d="M60 100 Q70 84 80 80 Q90 76 100 70 L106 70 Q96 80 90 86 Q84 92 84 100 Z" fill="${h.water}"/>`;
    o += h.pine(58, 86, 14, "#4E7A58") + h.pine(104, 90, 12, "#4E7A58");
    return o;
  },
  jeju: (h) => {
    let o = h.sun(30, 18, 7);
    o += `<path d="M0 62 Q40 46 70 30 L76 28 L82 30 L88 28 Q120 44 160 58 V66 H0Z" fill="#8FAAC4"/><path d="M70 30 L76 28 L82 30 L88 28 L86 32 Q79 29 72 32 Z" fill="#7A93AE"/><path d="M40 50 Q56 40 66 34 M96 34 Q110 42 124 48" stroke="#A3BBD2" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    o += `<rect x="0" y="62" width="160" height="12" fill="${h.water}"/>` + h.waves(66, 3);
    o += `<path d="M0 74 Q80 68 160 74 V100 H0Z" fill="#9CC98A"/>`;
    for (let x = 0; x < 160; x += 9) o += `<ellipse cx="${x + 4}" cy="${84 + (x % 2)}" rx="5" ry="3.4" fill="#4E4A4C"/>`;
    [[104, 72, 12], [132, 70, 13]].forEach(([x, y, r]) => { o += `<rect x="${x - 1.4}" y="${y}" width="2.8" height="12" fill="#7A5A3A"/><circle cx="${x}" cy="${y - 4}" r="${r}" fill="#4E8F4A"/>${[[-6, -6], [4, -9], [-2, 0], [6, -1], [-8, 2], [1, -13], [8, -6]].map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="2.2" fill="#F59A2E"/>`).join("")}`; });
    o += `<g transform="translate(44 64)"><rect x="-10" y="28" width="20" height="6" rx="1" fill="#6E6A6C"/><path d="M-8 28 L-9 8 Q0 4 9 8 L8 28 Z" fill="#7A7678"/><ellipse cx="0" cy="2" rx="9" ry="10" fill="#7A7678"/><path d="M-9 -4 Q-8 -16 0 -17 Q8 -16 9 -4 Z" fill="#6E6A6C"/><rect x="-10" y="-5" width="20" height="3" rx="1.5" fill="#625E60"/><circle cx="-4" cy="1" r="3" fill="#625E60"/><circle cx="4" cy="1" r="3" fill="#625E60"/><path d="M-1.6 4 Q0 9 1.6 4" fill="#625E60"/><path d="M-3 9.5 H3" stroke="#5A5658" stroke-width="1" stroke-linecap="round"/><path d="M-7 16 Q-2 14 2 16 M-2 20 Q2 18 7 20" stroke="#5A5658" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="-5" cy="10" r="2" fill="#625E60" opacity=".6"/></g>`;
    return o;
  },

  /* --- Cina --- */
  greatwall: (h) => {
    let o = h.sun(128, 20, 7, "#FFD08A");
    o += `<path d="M0 54 Q30 36 60 50 T120 40 T160 46 V100 H0Z" fill="#A9C2A4"/><path d="M0 70 Q36 50 70 62 Q100 74 130 54 Q148 46 160 52 V100 H0Z" fill="#7FA672"/><path d="M0 86 Q50 74 100 86 T160 82 V100 H0Z" fill="#6A9460"/>`;
    const wall = "M-4 66 L18 56 L40 64 L70 60 L100 72 L130 54 L164 50";
    o += `<path d="${wall}" stroke="#B89466" stroke-width="7" fill="none" stroke-linejoin="round"/><path d="${wall}" transform="translate(0 -4)" stroke="#D9BC8C" stroke-width="2.6" fill="none" stroke-dasharray="2.2 1.8" stroke-linejoin="round"/><path d="${wall}" stroke="#E2CBA0" stroke-width="2" fill="none" stroke-linejoin="round"/>`;
    const wall2 = "M30 40 L52 34 L74 42 L96 36";
    o += `<path d="${wall2}" stroke="#C9AF88" stroke-width="3.4" fill="none" opacity=".8"/>`;
    [[18, 56, 12, 14], [70, 60, 12, 14], [130, 54, 13, 15], [52, 34, 7, 8]].forEach(([x, y, wd, ht]) => { o += `<rect x="${x - wd / 2}" y="${y - ht}" width="${wd}" height="${ht}" fill="#D2B27E"/><rect x="${x - wd / 2 - 1}" y="${y - ht - 2}" width="${wd + 2}" height="2.4" fill="#B89466"/>`; for (let xx = x - wd / 2; xx < x + wd / 2; xx += 3) o += `<rect x="${xx}" y="${y - ht - 4.4}" width="1.8" height="2.4" fill="#B89466"/>`; o += `<path d="M${x - 1.6} ${y - ht * 0.3} V${y - ht * 0.6} a1.6 1.6 0 0 1 3.2 0 V${y - ht * 0.3} Z" fill="#7A5A3A"/>`; });
    o += `<path d="M0 100 Q30 92 60 98 L60 100Z" fill="#5E8A54"/>` + h.pine(12, 96, 12, "#4E7A48") + h.pine(150, 96, 14, "#4E7A48");
    return o;
  },
  shanghai: (h) => {
    let o = h.sun(130, 24, 8, "#FFC27A");
    [[0, 52, 12], [10, 60, 12], [104, 50, 10], [132, 56, 12], [146, 48, 14]].forEach(([x, y, wd], k) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${76 - y}" fill="${k % 2 ? "#8D98BC" : "#9AA6C8"}"/>`; for (let yy = y + 4; yy < 74; yy += 5) o += `<rect x="${x + 2}" y="${yy}" width="${wd - 4}" height="1.4" fill="#FFE3A8" opacity=".6"/>`; });
    o += `<path d="M86 76 L88 26 Q92 16 96 8 Q99 16 100 26 L102 76 Z" fill="#8FA3C2"/><path d="M96 8 V2" stroke="#8FA3C2" stroke-width="1"/>`;
    o += `<path d="M108 76 L110 34 L112 30 L113 18 L114 30 L116 34 L118 76 Z" fill="#7F8DB0"/><path d="M120 76 L121 30 L131 28 L132 76 Z" fill="#9AA6C8"/><path d="M124 31 h4 v4 h-4 Z" fill="${h.sky[0]}"/>`;
    o += `<path d="M44 76 L52 46 M66 76 L58 46 M55 76 V46" stroke="#E7A3B8" stroke-width="2.6"/><circle cx="55" cy="44" r="10" fill="#E88BAE"/><circle cx="52" cy="41" r="3.4" fill="#F7C6D6"/><rect x="53" y="22" width="4" height="22" fill="#E7A3B8"/><circle cx="55" cy="22" r="5.5" fill="#E88BAE"/><circle cx="53.5" cy="20.5" r="1.8" fill="#F7C6D6"/><rect x="54" y="8" width="2" height="14" fill="#E7A3B8"/><circle cx="55" cy="10" r="2" fill="#E88BAE"/><path d="M55 8 V1" stroke="#E7A3B8" stroke-width="1"/>`;
    o += `<rect x="0" y="76" width="160" height="16" fill="${h.water}"/>` + h.waves(80, 4) + `<path d="M50 80 v8 M56 82 v6 M96 80 v8" stroke="#F7C6D6" stroke-width="1.4" opacity=".5"/>`;
    o += `<rect x="0" y="92" width="160" height="8" fill="#D8C7A3"/>`;
    for (let x = 2; x < 160; x += 8) o += `<rect x="${x}" y="88" width="1.6" height="4" fill="#B8A27A"/>`;
    o += `<rect x="0" y="87" width="160" height="1.6" fill="#B8A27A"/>`;
    return o;
  },
  guilin: (h) => {
    let o = `<path d="M-4 66 Q4 30 16 32 Q24 34 26 58 Q32 22 46 24 Q56 28 56 60 Q66 38 76 40 Q84 44 84 62 Q92 20 106 22 Q116 26 118 58 Q126 36 138 36 Q150 38 152 60 Q156 44 164 46 V70 H-4Z" fill="#B9C9CF"/>`;
    o += `<path d="M-4 72 Q2 44 12 44 Q22 46 24 70 Q34 38 48 40 Q58 44 60 72 L96 72 Q104 34 118 36 Q128 40 130 72 Q140 46 152 48 Q160 52 164 72 Z" fill="#6FA287"/>`;
    o += `<path d="M24 70 Q28 52 36 48" stroke="#8FBEA2" stroke-width="2" fill="none" opacity=".7"/><path d="M104 70 Q108 46 116 40" stroke="#8FBEA2" stroke-width="2" fill="none" opacity=".7"/>`;
    o += `<ellipse cx="40" cy="58" rx="40" ry="3.4" fill="#fff" opacity=".5"/><ellipse cx="128" cy="62" rx="34" ry="3" fill="#fff" opacity=".5"/>`;
    o += `<rect x="0" y="72" width="160" height="28" fill="#8CC3C6"/><path d="M-4 72 Q2 86 12 86 Q22 84 24 72 Z M24 72 Q34 92 48 90 Q58 86 60 72 Z M96 72 Q104 94 118 92 Q128 88 130 72 Z M130 72 Q140 86 152 84 Q160 80 164 72 Z" fill="#6FA287" opacity=".35"/>` + h.waves(84, 4);
    o += `<g transform="translate(70 88)"><path d="M-18 0 H18 L16 3 H-16 Z" fill="#C9A86A"/><path d="M-16 1.5 H16" stroke="#A88A50" stroke-width=".6"/><path d="M-6 0 L-6 -10 M-6 -10 L-2 -4" stroke="#5A6478" stroke-width="2.6" stroke-linecap="round"/><circle cx="-6" cy="-13" r="2.6" fill="#E9C99A"/><path d="M-13 -13 L-6 -18.5 L1 -13 Z" fill="#E2C47A"/><path d="M-1 -4 L14 -20" stroke="#8A6040" stroke-width="1"/><g transform="translate(9 -3)"><ellipse rx="3.4" ry="2.2" fill="#33302E"/><path d="M2 -1 Q4 -6 3 -8" stroke="#33302E" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M3 -8 l2.4 .6" stroke="#E2B44A" stroke-width="1"/></g></g>`;
    return o;
  },
  zhangjiajie: (h) => {
    let o = `<path d="M0 100 V70 Q80 60 160 70 V100Z" fill="#B9C6BE"/>`;
    const pillar = (x, y, wd, c, top) => `<path d="M${x} 100 L${x + 1} ${y + 3} Q${x + wd / 2} ${y - 3} ${x + wd - 1} ${y + 3} L${x + wd} 100 Z" fill="${c}"/><path d="M${x + wd * 0.35} ${y + 8} V96 M${x + wd * 0.7} ${y + 14} V96" stroke="#fff" stroke-width=".9" opacity=".25"/><ellipse cx="${x + wd / 2}" cy="${y + 1}" rx="${wd / 2 + 1.5}" ry="3.4" fill="${top}"/><path d="M${x + wd / 2 - 3} ${y - 1} L${x + wd / 2} ${y - 7} L${x + wd / 2 + 3} ${y - 1} Z" fill="${top}"/>`;
    [[8, 40, 10], [28, 30, 9], [64, 36, 10], [104, 26, 9], [138, 38, 11]].forEach(([x, y, wd]) => { o += pillar(x, y, wd, "#C9C2B6", "#8DAE92"); });
    o += `<ellipse cx="40" cy="62" rx="48" ry="6" fill="#fff" opacity=".7"/><ellipse cx="128" cy="58" rx="40" ry="5" fill="#fff" opacity=".7"/>`;
    [[0, 34, 16], [44, 20, 15], [86, 44, 13], [118, 30, 16]].forEach(([x, y, wd]) => { o += pillar(x, y, wd, "#A89C8A", "#5E8F64"); });
    o += `<ellipse cx="80" cy="84" rx="70" ry="7" fill="#fff" opacity=".85"/><ellipse cx="20" cy="92" rx="30" ry="5" fill="#fff" opacity=".8"/><ellipse cx="146" cy="90" rx="26" ry="5" fill="#fff" opacity=".8"/>`;
    o += `<path d="M60 22 q3 -2 6 0 q3 -2 6 0" stroke="#5E6A70" stroke-width="1" fill="none"/>`;
    return o;
  },

  /* --- Taiwan --- */
  taipei101: (h) => {
    let o = h.sun(132, 20, 7);
    [[0, 70, 14], [12, 76, 12], [26, 66, 12], [38, 74, 14], [104, 72, 12], [116, 64, 14], [134, 74, 12], [146, 68, 14]].forEach(([x, y, wd], k) => { o += `<rect x="${x}" y="${y}" width="${wd}" height="${92 - y}" fill="${k % 2 ? "#C2CEDD" : "#B3C1D4"}"/>`; for (let yy = y + 4; yy < 90; yy += 5) o += `<rect x="${x + 3}" y="${yy}" width="${wd - 6}" height="1.4" fill="#EEF2F7" opacity=".8"/>`; });
    o += `<path d="M70 92 L72 70 H88 L90 92 Z" fill="#8FB8B6"/>`;
    for (let k = 0; k < 8; k++) { const y = 70 - (k + 1) * 5.6; o += `<path d="M73 ${y + 5.6} L71 ${y} H89 L87 ${y + 5.6} Z" fill="${k % 2 ? "#9CC4C2" : "#A9CFCC"}"/><path d="M71 ${y} H89" stroke="#E6F2F0" stroke-width=".8"/>`; }
    o += `<rect x="75" y="18" width="10" height="7.2" fill="#8FB8B6"/><rect x="77" y="12" width="6" height="6" fill="#A9CFCC"/><path d="M80 12 V0" stroke="#8FB8B6" stroke-width="1.6"/><circle cx="80" cy="54" r="2.4" fill="#F2C063"/>`;
    o += `<path d="M0 100 V84 Q20 68 44 76 Q58 82 66 100 Z" fill="#6E9F6A"/><path d="M110 100 Q130 84 160 82 V100 Z" fill="#7FAF72"/>`;
    return o;
  },
  jiufen: (h) => {
    let o = `<circle cx="132" cy="16" r="1.2" fill="#fff"/><circle cx="110" cy="10" r="1" fill="#fff"/>`;
    o += `<rect x="0" y="36" width="70" height="14" fill="#8FA9C9"/><path d="M8 40 q5 -2 10 0 M36 44 q5 -2 10 0" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/><path d="M0 36 Q20 30 40 34 Q56 28 70 32 L70 36 H0Z" fill="#9A93B8"/>`;
    o += `<path d="M0 50 Q40 40 70 34 Q110 20 160 22 V100 H0Z" fill="#5E7A6A"/>`;
    o += `<rect x="70" y="44" width="70" height="56" fill="#7A4E3A"/><path d="M64 46 Q105 50 146 46 L136 38 L74 38 Z" fill="#3E3436"/><rect x="78" y="28" width="54" height="11" fill="#86573F"/><path d="M72 30 Q105 34 138 30 L130 22 L80 22 Z" fill="#3E3436"/>`;
    o += `<path d="M66 70 Q105 74 144 70 L138 64 L72 64 Z" fill="#3E3436"/>`;
    [[76, 50], [90, 50], [104, 50], [118, 50], [130, 50], [84, 30], [98, 30], [112, 30], [124, 30], [78, 74], [94, 74], [116, 74], [130, 74]].forEach(([x, y]) => { o += `<rect x="${x}" y="${y}" width="7" height="8" fill="#FFD98A" opacity=".85"/>`; });
    o += `<path d="M24 100 L40 70 H50 L40 100 Z" fill="#B8A890"/><path d="M28 94 H42 M31 88 H45 M34 82 H47 M37 76 H49" stroke="#9A8A70" stroke-width="1"/>`;
    o += `<path d="M0 60 Q30 64 70 58 M66 46 Q105 52 146 46 M66 70 Q105 76 144 70" stroke="#5A3A2E" stroke-width=".6" fill="none"/>`;
    [[8, 61], [22, 63], [36, 62], [52, 60], [74, 48], [90, 50], [106, 50], [122, 49], [138, 47], [74, 72], [92, 74], [110, 74], [128, 73]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y + 4}" r="5" fill="#FFB36A" opacity=".3"/><ellipse cx="${x}" cy="${y + 4}" rx="2.8" ry="3.4" fill="#E2453A"/><rect x="${x - 1.4}" y="${y}" width="2.8" height="1" fill="#F2C063"/>`; });
    return o;
  },
  sunmoonlake: (h) => {
    let o = h.sun(26, 20, 7) + `<circle cx="132" cy="16" r="6" fill="#FFF6DA"/><circle cx="135" cy="14" r="5.4" fill="${h.sky[0]}"/>`;
    o += `<path d="M0 50 Q30 30 60 44 Q90 26 120 40 Q140 30 160 42 V64 H0Z" fill="#9DB7C4"/><path d="M0 60 Q40 42 80 56 Q120 44 160 58 V66 H0Z" fill="#6E9E80"/>`;
    o += `<rect x="0" y="64" width="160" height="36" fill="#5FB0A6"/>` + h.waves(76, 5);
    o += `<path d="M112 66 Q124 40 146 38 Q158 42 160 52 V66 Z" fill="#5E8E6E"/><g transform="translate(138 0)"><rect x="-3.4" y="26" width="6.8" height="16" fill="#F2EADB"/>${[0, 1, 2, 3].map((k) => `<path d="M-5.6 ${40 - k * 4.6} H5.6 L3.6 ${38 - k * 4.6} H-3.6 Z" fill="#C8734E"/>`).join("")}<path d="M-2.4 26 L0 20 L2.4 26 Z" fill="#C8734E"/></g>`;
    o += `<ellipse cx="70" cy="70" rx="12" ry="3" fill="#7FAF72"/><circle cx="66" cy="66" r="4" fill="#4E8F5A"/><circle cx="73" cy="65" r="5" fill="#5E9F66"/>`;
    o += `<path d="M24 86 L52 86 L48 91 L28 91 Z" fill="#F4F1EA"/><rect x="31" y="80" width="12" height="6" rx="1" fill="#E2654F"/><rect x="33" y="81.5" width="3" height="2.4" fill="#BFE3F7"/><rect x="38" y="81.5" width="3" height="2.4" fill="#BFE3F7"/><path d="M24 92 q14 3 28 0" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/>`;
    return o;
  },
  taroko: (h) => {
    let o = `<path d="M40 100 V58 Q80 46 120 58 V100Z" fill="#DCE0E6"/><path d="M60 100 V66 Q80 60 100 66 V100Z" fill="#B7C9C0"/><path d="M0 0 H44 Q50 20 56 34 Q60 52 62 70 L64 100 H0Z" fill="#C9CCD2"/><path d="M160 0 H118 Q112 22 106 38 Q100 56 98 72 L96 100 H160Z" fill="#BBBFC7"/>`;
    o += `<path d="M8 10 Q20 40 14 70 M28 6 Q38 30 34 60 Q32 76 38 92 M46 30 Q52 50 50 80" stroke="#E6E8EC" stroke-width="2" fill="none"/><path d="M146 8 Q136 40 144 72 M128 14 Q120 40 124 64 Q126 80 120 96 M112 40 Q106 60 108 84" stroke="#DADDE3" stroke-width="2" fill="none"/>`;
    o += `<path d="M20 20 q6 -6 12 0 q-6 3 -12 0Z M4 46 q6 -6 12 0 q-6 3 -12 0Z M40 60 q5 -5 10 0 q-5 3 -10 0Z M130 26 q6 -6 12 0 q-6 3 -12 0Z M146 56 q5 -5 10 0 q-5 3 -10 0Z M112 70 q5 -5 10 0 q-5 3 -10 0Z" fill="#6FA06A"/>`;
    o += `<path d="M75 78 Q80 77 85 78 L99 100 H61 Z" fill="#6BC7C2"/><path d="M70 94 q4 -2 8 0 M82 89 q4 -2 8 0 M76 84 q3 -1.5 6 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/>`;
    o += `<path d="M52 52 Q80 62 108 52" stroke="#D9573E" stroke-width="2.4" fill="none"/><path d="M52 47 Q80 57 108 47" stroke="#D9573E" stroke-width="1.2" fill="none"/>`;
    for (let x = 58; x <= 102; x += 6) { const t = (x - 52) / 56, y1 = 47 + 4 * t * (1 - t) * 10; o += `<path d="M${x} ${y1} V${y1 + 5}" stroke="#D9573E" stroke-width=".9"/>`; }
    o += `<path d="M64 26 l3 2 l3 -2 M86 18 l2.4 1.6 l2.4 -1.6" stroke="#4E5A6E" stroke-width="1" fill="none"/>`;
    return o;
  }
});
