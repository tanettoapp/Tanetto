/* Luoghi veri per russo, polacco, olandese e turco: testi, cieli e disegni */
Object.assign(REAL, {
  ru: [
    { art: "moskva", name: "Москва", t: "Купола как леденцы", s: "{n} гуляет по Красной площади и любуется храмом Василия Блаженного. Его разноцветные купола похожи на леденцы, и ни один не похож на другой!" },
    { art: "piter", name: "Санкт-Петербург", t: "Мосты, которые встают", s: "В Санкт-Петербурге {n} катается на кораблике по Неве и каналам. Летом здесь белые ночи, а мосты поднимаются, чтобы пропустить большие корабли!" },
    { art: "baikal", name: "Байкал", t: "Самое глубокое озеро", s: "Байкал — самое глубокое озеро на планете, и вода в нём прозрачная-прозрачная. {n} знакомится с нерпой: этот пушистый тюлень живёт только здесь." },
    { art: "kamchatka", name: "Камчатка", t: "Земля вулканов", s: "На Камчатке больше трёхсот вулканов, и некоторые до сих пор дымят. {n} смотрит, как из-под земли вырывается горячий гейзер: пуф!" }
  ],
  pl: [
    { art: "krakow", name: "Kraków", t: "Smok spod Wawelu", s: "{n} spaceruje pod Wawelem i zagląda do Smoczej Jamy. Smok z brązu, który stoi nad Wisłą, naprawdę zieje ogniem co kilka minut!" },
    { art: "tatry", name: "Tatry", t: "Morskie Oko", s: "{n} wędruje w Tatrach do Morskiego Oka, największego jeziora tych gór. Woda jest tak czysta, że szczyty odbijają się w niej jak w lustrze." },
    { art: "gdansk", name: "Gdańsk", t: "Dźwig jak koło chomika", s: "W Gdańsku {n} podziwia kolorowe kamieniczki nad Motławą i stary Żuraw. Dawniej ten dźwig poruszali ludzie, którzy chodzili w wielkich drewnianych kołach!" },
    { art: "bialowieza", name: "Puszcza Białowieska", t: "Król puszczy", s: "W Puszczy Białowieskiej {n} spotyka żubra, największe dzikie zwierzę lądowe Europy. Ta prastara puszcza rośnie tu od tysięcy lat." }
  ],
  nl: [
    { art: "amsterdam", name: "Amsterdam", t: "Een haak in de gevel", s: "{n} fietst langs de grachten van Amsterdam, tussen smalle, scheve huisjes. Bovenin de gevels zit vaak een haak: de trappen zijn zo smal dat meubels door het raam naar binnen worden gehesen!" },
    { art: "kinderdijk", name: "Kinderdijk", t: "Negentien molens", s: "In Kinderdijk telt {n} maar liefst negentien molens bij elkaar. Vroeger pompten ze het water weg, zodat het land droog bleef." },
    { art: "keukenhof", name: "Keukenhof", t: "Een zee van tulpen", s: "In de Keukenhof wandelt {n} tussen miljoenen bloemen. Elk najaar planten de tuiniers hier zo'n zeven miljoen bollen!" },
    { art: "wadden", name: "Waddenzee", t: "Wandelen op de zeebodem", s: "Bij eb kan {n} over de bodem van de Waddenzee lopen: dat heet wadlopen. Op een zandplaat liggen zeehondjes lekker te zonnen." }
  ],
  tr: [
    { art: "istanbul", name: "İstanbul", t: "İki kıtalı şehir", s: "{n} İstanbul'da vapura biniyor ve Boğaz'da martılara el sallıyor. Bu şehir hem Avrupa'da hem Asya'da: iki kıtaya birden yayılıyor!" },
    { art: "kapadokya", name: "Kapadokya", t: "Gökyüzünde balonlar", s: "{n} Kapadokya'da sabah erkenden sıcak hava balonuyla uçuyor. Aşağıda peri bacaları var: rüzgârın ve yağmurun binlerce yılda oyduğu kayalar." },
    { art: "pamukkale", name: "Pamukkale", t: "Pamuktan bir kale", s: "{n} Pamukkale'nin bembeyaz terasları arasında ılık suya ayaklarını sokuyor. Adı \"pamuk kale\" demek, çünkü uzaktan dev bir pamuk yığını gibi görünüyor!" },
    { art: "efes", name: "Efes", t: "Antik kütüphane", s: "{n} antik Efes kentinde Celsus Kütüphanesi'nin önünde duruyor. Yaklaşık iki bin yıl önce burada binlerce kitap rulosu saklanıyordu!" }
  ]
});

Object.assign(REAL_SKY2, {
  moskva: ["#CFE6F7", "#FBEFE0"], piter: ["#F6D9C8", "#CFE0F0"], baikal: ["#BFE3F5", "#EEF6FA"], kamchatka: ["#F7D3B8", "#CFDDF0"],
  krakow: ["#FBE3C8", "#CFE4F2"], tatry: ["#BFDDF2", "#EEF5FA"], gdansk: ["#CFE6F7", "#FBF0DE"], bialowieza: ["#DDEBD8", "#F4F1DE"],
  amsterdam: ["#CFE4F3", "#F6EEE2"], kinderdijk: ["#F7D7B8", "#CFE2F2"], keukenhof: ["#CFE6F7", "#F8F0DE"], wadden: ["#D2E6F2", "#F2EEE4"],
  istanbul: ["#FBD9B8", "#CFE2F2"], kapadokya: ["#FCD4B8", "#BFDDF2"], pamukkale: ["#BFE3F7", "#F2F8FA"], efes: ["#CFE6F7", "#FBEBD2"]
});

{
  /* cupola a cipolla con decoro a zig-zag */
  const onion = (x, y, r, c, st) => `<path d="M${x - r} ${y} C${x - r - 2.5} ${y - r} ${x - 2} ${y - r * 1.5} ${x} ${y - r * 2.3} C${x + 2} ${y - r * 1.5} ${x + r + 2.5} ${y - r} ${x + r} ${y} Z" fill="${c}"/><path d="M${x - r + 0.5} ${y - r * 0.45} L${x - r / 2} ${y - r * 0.85} L${x} ${y - r * 0.45} L${x + r / 2} ${y - r * 0.85} L${x + r - 0.5} ${y - r * 0.45} M${x - r * 0.6} ${y - r * 1.2} L${x - r * 0.25} ${y - r * 1.5} L${x} ${y - r * 1.2} L${x + r * 0.25} ${y - r * 1.5} L${x + r * 0.6} ${y - r * 1.2}" stroke="${st}" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M${x} ${y - r * 2.3} V${y - r * 2.3 - 4}" stroke="#C9A24A" stroke-width="1"/>`;
  /* mulino a vento olandese */
  const mill = (x, y, s, rot = 20) => `<path d="M${x - 10 * s} ${y} L${x - 6 * s} ${y - 24 * s} L${x + 6 * s} ${y - 24 * s} L${x + 10 * s} ${y} Z" fill="#7A6E62"/><path d="M${x - 6 * s} ${y - 24 * s} L${x - 10 * s} ${y} H${x - 5 * s} L${x - 2 * s} ${y - 24 * s} Z" fill="#8E8274"/><path d="M${x - 7 * s} ${y - 23 * s} Q${x} ${y - 34 * s} ${x + 7 * s} ${y - 23 * s} Z" fill="#5E544A"/><rect x="${x - 2 * s}" y="${y - 7 * s}" width="${4 * s}" height="${7 * s}" fill="#3E3630"/><g transform="translate(${x} ${y - 26 * s}) rotate(${rot})"><rect x="${-1 * s}" y="${-22 * s}" width="${2 * s}" height="${44 * s}" fill="#5E4A3A"/><rect x="${-22 * s}" y="${-1 * s}" width="${44 * s}" height="${2 * s}" fill="#5E4A3A"/><rect x="${1 * s}" y="${-21 * s}" width="${5 * s}" height="${18 * s}" fill="#F4EBDD" opacity=".9"/><rect x="${-6 * s}" y="${3 * s}" width="${5 * s}" height="${18 * s}" fill="#F4EBDD" opacity=".9"/><rect x="${3 * s}" y="${1 * s}" width="${18 * s}" height="${5 * s}" fill="#F4EBDD" opacity=".9"/><rect x="${-21 * s}" y="${-6 * s}" width="${18 * s}" height="${5 * s}" fill="#F4EBDD" opacity=".9"/><circle r="${1.8 * s}" fill="#3E3630"/></g>`;
  /* tulipano in primo piano */
  const tulip = (x, y, c) => `<path d="M${x} ${y} V${y + 14}" stroke="#4E9A4A" stroke-width="1.6"/><path d="M${x} ${y + 13} Q${x - 7} ${y + 8} ${x - 6} ${y + 2} Q${x - 2} ${y + 8} ${x} ${y + 13} Z" fill="#5FAE5A"/><path d="M${x - 4} ${y} Q${x - 5} ${y - 6} ${x - 2.5} ${y - 8} L${x} ${y - 5} L${x + 2.5} ${y - 8} Q${x + 5} ${y - 6} ${x + 4} ${y} Q${x} ${y + 3} ${x - 4} ${y} Z" fill="${c}"/>`;
  /* foca sdraiata (nerpa, foche dei Wadden) */
  const seal = (x, y, s, c = "#8E98A6") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8 -6 Q4 -9 13 -2 Q18 0 21 -3 Q20 2 15 3 Q2 5 -9 3 Z" fill="${c}"/><ellipse cx="2" cy="1.5" rx="9" ry="2.4" fill="#fff" opacity=".3"/><circle cx="-9" cy="-3.5" r="5.5" fill="${c}"/><circle cx="-11" cy="-4.5" r="1.4" fill="#2E2A28"/><circle cx="-7" cy="-4.5" r="1.4" fill="#2E2A28"/><circle cx="-10.6" cy="-5" r=".45" fill="#fff"/><circle cx="-6.6" cy="-5" r=".45" fill="#fff"/><circle cx="-9" cy="-1.8" r=".8" fill="#4A4440"/><path d="M-12 -1.5 h-4 M-12 -.6 l-3.5 1.2 M-6 -1.5 h4 M-6 -.6 l3.5 1.2" stroke="#5E5A56" stroke-width=".4"/></g>`;
  const gull = (x, y) => `<path d="M${x - 3} ${y} q1.5 -1.6 3 0 q1.5 -1.6 3 0" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/>`;

  Object.assign(REAL_ART2, {
    moskva: (h) => {
      let o = h.sun(134, 20, 7) + `<rect x="0" y="84" width="160" height="16" fill="#D8C3A5"/><path d="M0 92 H160" stroke="#C9B091" stroke-width="1"/>`;
      o += `<rect x="0" y="70" width="40" height="15" fill="#C8574A"/><rect x="122" y="70" width="38" height="15" fill="#C8574A"/>`;
      for (let x = 1; x < 160; x += 5) if (x < 38 || x > 122) o += `<path d="M${x} 70 v-4 l1.5 1.5 l1.5 -1.5 v4 Z" fill="#C8574A"/>`;
      o += `<rect x="137" y="46" width="13" height="25" fill="#C8574A"/><rect x="136" y="44" width="15" height="3" fill="#E9DCC7"/><circle cx="143.5" cy="54" r="3.2" fill="#F8F1D9" stroke="#8A6A3A" stroke-width=".7"/><path d="M137 44 L143.5 24 L150 44 Z" fill="#5E9A7A"/><path d="M143.5 24 V19" stroke="#C9A24A" stroke-width="1"/><circle cx="143.5" cy="18.5" r="1.6" fill="#E2453A"/>`;
      o += `<path d="M42 86 V64 H118 V86 Z" fill="#D9765F"/><rect x="42" y="63" width="76" height="3" fill="#F3E3CF"/><rect x="42" y="74" width="76" height="1.5" fill="#F3E3CF" opacity=".8"/>`;
      o += `<rect x="75" y="38" width="10" height="26" fill="#E9866B"/><path d="M73 41 L80 16 L87 41 Z" fill="#F0C978"/><path d="M76.5 32 h7 M78 24 h4" stroke="#E2A04E" stroke-width="1"/>` + onion(80, 18, 2.6, "#E9B949", "#F8E7A8");
      [[60, 46, 6.5, "#7DBE8A", "#F2CF63"], [100, 46, 6.5, "#F2A65A", "#5E9AD6"], [49, 56, 5.5, "#6FA6D6", "#fff"], [111, 56, 5.5, "#E2654F", "#FFF1D6"]].forEach(([x, y, r, c, st]) => {
        o += `<rect x="${x - r + 1.5}" y="${y}" width="${2 * r - 3}" height="${64 - y}" fill="#E9866B"/><rect x="${x - r + 1}" y="${y + 2}" width="${2 * r - 2}" height="1.5" fill="#F3E3CF"/>` + onion(x, y, r, c, st);
      });
      [[50, 76], [66, 76], [94, 76], [110, 76]].forEach(([x, y]) => { o += `<path d="M${x - 2.5} ${y + 10} V${y + 3} a2.5 2.5 0 0 1 5 0 V${y + 10} Z" fill="#8E3B2E" opacity=".75"/>`; });
      o += `<path d="M75 86 V77 a5 5 0 0 1 10 0 V86 Z" fill="#7A3226"/>`;
      return o;
    },
    piter: (h) => {
      let o = h.sun(26, 22, 7, "#FFE6A8");
      o += `<rect x="4" y="50" width="66" height="19" fill="#A8D8C2"/><rect x="2" y="47" width="70" height="3.5" fill="#F4F1EA"/>`;
      for (let x = 7; x < 70; x += 5) o += `<rect x="${x}" y="51" width="1.4" height="17" fill="#F4F1EA"/>`;
      for (let x = 9; x < 68; x += 5) o += `<rect x="${x}" y="54" width="2.4" height="4" fill="#5E8E7A" opacity=".7"/><rect x="${x}" y="61" width="2.4" height="4" fill="#5E8E7A" opacity=".7"/>`;
      for (let x = 6; x < 70; x += 8) o += `<circle cx="${x}" cy="45.6" r="1.2" fill="#E9DCC0"/>`;
      o += `<rect x="96" y="58" width="64" height="11" fill="#E3D3B6"/><rect x="118" y="44" width="20" height="16" fill="#F2E3C6"/><rect x="123" y="32" width="10" height="13" fill="#F2E3C6"/><path d="M123 32 L128 26 L133 32 Z" fill="#E9B949"/><path d="M126.6 27 L128 4 L129.4 27 Z" fill="#E9B949"/><path d="M126 6 h4 M128 4 V1" stroke="#E9B949" stroke-width="1" stroke-linecap="round"/><rect x="126" y="36" width="4" height="5" rx="2" fill="#B5A58A"/>`;
      o += `<rect x="0" y="68" width="160" height="4" fill="#C9BFAE"/><rect x="0" y="72" width="160" height="28" fill="${h.water}"/>` + h.waves(86, 5);
      o += `<rect x="14" y="70" width="48" height="3.5" fill="#7C8A9A"/><rect x="98" y="70" width="48" height="3.5" fill="#7C8A9A"/>`;
      [[22, 70], [42, 70], [106, 70], [126, 70]].forEach(([x, y]) => { o += `<path d="M${x - 6} ${y + 3.5} H${x + 6} V${y + 9} Q${x} ${y + 4} ${x - 6} ${y + 9} Z" fill="#7C8A9A"/>`; });
      o += `<rect x="58" y="72" width="8" height="10" fill="#9A9488"/><rect x="94" y="72" width="8" height="10" fill="#9A9488"/>`;
      o += `<path d="M62 71 L66 71 L77 43 L73.5 42 Z" fill="#6E7C8E"/><path d="M98 71 L94 71 L83 43 L86.5 42 Z" fill="#6E7C8E"/><path d="M64 66 L75 40 M96 66 L85 40" stroke="#A9B6C4" stroke-width=".8"/><circle cx="74.5" cy="42" r="1" fill="#FFD27A"/><circle cx="85.5" cy="42" r="1" fill="#FFD27A"/>`;
      o += `<path d="M66 88 L94 88 L90 93 L70 93 Z" fill="#F4F1EA"/><rect x="70" y="84" width="16" height="4.5" rx="1" fill="#F4F1EA"/><rect x="69" y="89" width="22" height="1.4" fill="#E2654F"/><rect x="80" y="79" width="3" height="5.5" fill="#E2654F"/><circle cx="74" cy="86" r=".9" fill="#7C8A9A"/><circle cx="78" cy="86" r=".9" fill="#7C8A9A"/>`;
      return o;
    },
    baikal: (h) => {
      let o = `<path d="M0 54 L22 34 L40 46 L62 26 L86 44 L108 30 L130 44 L160 32 V60 H0Z" fill="#A9BCD6"/><path d="M22 34 L28 40 L22 42 L16 40Z M62 26 L70 34 L62 36 L54 34Z M108 30 L115 37 L108 39 L101 37Z M160 32 L152 38 L160 39Z" fill="#fff"/>`;
      o += `<path d="M0 58 Q40 50 80 56 T160 54 V62 H0 Z" fill="#6E9A7A"/>`;
      o += `<rect x="0" y="60" width="160" height="40" fill="${h.water}"/><rect x="0" y="60" width="160" height="40" fill="#8FE0E0" opacity=".35"/>` + h.waves(68, 4);
      o += `<path d="M14 72 Q18 60 26 61 Q34 58 38 72 Z" fill="#C9B8A0"/><path d="M26 61 Q32 62 38 72 L30 72 Z" fill="#B3A188"/>` + h.pine(22, 62, 8, "#4F7E5E") + h.pine(29, 61, 10, "#3F6E55");
      o += `<path d="M90 100 Q104 84 160 82 V100 Z" fill="#B9A88C"/><ellipse cx="128" cy="88" rx="22" ry="5" fill="#A89A88"/><path d="M92 100 Q110 92 160 92" stroke="#C9BBA2" stroke-width="2" fill="none"/>`;
      o += seal(127, 84, 1.05) + h.sun(130, 20, 7);
      return o;
    },
    kamchatka: (h) => {
      let o = `<circle cx="76" cy="14" r="5" fill="#fff" opacity=".8"/><circle cx="83" cy="9" r="6" fill="#fff" opacity=".7"/><circle cx="92" cy="5" r="6.5" fill="#fff" opacity=".55"/>`;
      o += `<path d="M-10 80 L22 46 L52 80 Z" fill="#9E9CB8"/><path d="M16 52 L22 46 L28 52 L24 51 L21 54 Z" fill="#fff"/>`;
      o += `<path d="M24 80 L70 24 Q76 19 82 24 L140 80 Z" fill="#8C8AA8"/><path d="M82 24 L140 80 L112 80 Q100 50 86 30 Z" fill="#76749A" opacity=".6"/><path d="M61 35 L70 24 Q76 19 82 24 L93 36 L87 33 L81 38 L75 32 L68 37 Z" fill="#fff"/>`;
      o += `<path d="M0 74 Q50 64 100 72 T160 68 V100 H0 Z" fill="#8FBF7A"/><path d="M0 86 Q60 78 160 88 V100 H0Z" fill="#7BAE68"/>`;
      o += `<ellipse cx="128" cy="86" rx="11" ry="3" fill="#7FD3DE"/><path d="M124.5 86 Q122 66 127.5 50 Q134 66 131.5 86 Z" fill="#fff" opacity=".9"/><circle cx="127.5" cy="48" r="6" fill="#fff" opacity=".9"/><circle cx="121" cy="53" r="4" fill="#fff" opacity=".8"/><circle cx="134" cy="52" r="4.5" fill="#fff" opacity=".8"/><circle cx="128" cy="40" r="3.5" fill="#fff" opacity=".6"/>`;
      o += `<g transform="translate(44 86)"><ellipse cx="2" cy="0" rx="10" ry="6.5" fill="#8A5A3A"/><rect x="-5" y="3" width="3.5" height="6" rx="1.5" fill="#7A4E30"/><rect x="6" y="3" width="3.5" height="6" rx="1.5" fill="#7A4E30"/><circle cx="-8" cy="-3" r="5" fill="#8A5A3A"/><circle cx="-11" cy="-7" r="1.8" fill="#8A5A3A"/><circle cx="-5" cy="-7.4" r="1.8" fill="#8A5A3A"/><ellipse cx="-10.5" cy="-1.5" rx="2.6" ry="2" fill="#C9966A"/><circle cx="-11.6" cy="-2.2" r=".7" fill="#33302E"/><circle cx="-7.5" cy="-4" r=".7" fill="#33302E"/></g>`;
      return o;
    },
    krakow: (h) => {
      let o = h.sun(134, 20, 7);
      o += `<path d="M0 86 Q20 58 58 54 Q100 50 128 68 Q146 78 160 78 V86 Z" fill="#8DBF78"/><path d="M0 86 Q30 70 60 72" stroke="#7BAE68" stroke-width="3" fill="none"/>`;
      o += `<rect x="26" y="56" width="88" height="9" fill="#C97A5A"/>`;
      for (let x = 26; x < 114; x += 5) o += `<rect x="${x}" y="53.5" width="2.8" height="3" fill="#C97A5A"/>`;
      o += `<rect x="34" y="42" width="72" height="14" fill="#EADBC0"/><path d="M32 42 L37 36 L103 36 L108 42 Z" fill="#C8604A"/>`;
      for (let x = 38; x < 104; x += 6) o += `<rect x="${x}" y="46" width="2.4" height="4" fill="#8E6E50" opacity=".7"/>`;
      o += `<rect x="44" y="22" width="10" height="20" fill="#EADBC0"/><path d="M43 23 Q49 10 55 23 Z" fill="#6FAE8E"/><path d="M49 13 V7" stroke="#6FAE8E" stroke-width="1.2"/><circle cx="49" cy="6.5" r="1.2" fill="#E9B949"/><rect x="47.5" y="28" width="3" height="5" rx="1.5" fill="#8E6E50"/>`;
      o += `<rect x="64" y="28" width="12" height="9" fill="#EADBC0"/><path d="M63 29 Q70 16 77 29 Z" fill="#E9B949"/><path d="M70 19 V14" stroke="#C9A24A" stroke-width="1"/>`;
      o += `<rect x="88" y="24" width="9" height="13" fill="#EADBC0"/><path d="M86.5 25 L92.5 12 L98.5 25 Z" fill="#C8604A"/>`;
      o += `<rect x="0" y="84" width="160" height="16" fill="${h.water}"/>` + h.waves(91, 4);
      o += `<g transform="translate(136 72)"><path d="M14 4 Q22 4 22 -2" stroke="#5FA35C" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="6" cy="2" rx="10" ry="5" fill="#6DB36A"/><path d="M2 -2 L8 -12 L12 -1 Z" fill="#8FCB7A"/><path d="M-1 1 Q-6 -2 -8 -8" stroke="#6DB36A" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-10" cy="-10" rx="4.5" ry="3.5" fill="#6DB36A"/><circle cx="-10" cy="-11.5" r=".9" fill="#2E2A28"/><path d="M-9 -13 l1 -3 M-12 -13 l-1 -3" stroke="#5FA35C" stroke-width="1.2" stroke-linecap="round"/><rect x="0" y="5" width="3" height="4" fill="#5FA35C"/><rect x="9" y="5" width="3" height="4" fill="#5FA35C"/><path d="M-14 -10 Q-20 -14 -26 -10 Q-22 -9 -24 -6 Q-19 -8 -14 -8 Z" fill="#F29A4A"/><path d="M-14 -9.5 Q-18 -11 -21 -9 Q-18 -8.5 -14 -8.6 Z" fill="#FFD25E"/></g>`;
      return o;
    },
    tatry: (h) => {
      let o = `<path d="M0 62 L16 40 L28 50 L48 16 L62 36 L74 28 L92 50 L110 20 L126 40 L140 30 L160 48 V74 H0Z" fill="#9AA6B8"/><path d="M48 16 L62 36 L54 40 Z M110 20 L126 40 L116 42 Z M74 28 L92 50 L82 50 Z" fill="#7C889E" opacity=".7"/><path d="M48 16 L54 25 L49 23 L43 26 Z M110 20 L116 29 L110 27 L104 29 Z M140 30 L145 36 L140 35 L135 37 Z" fill="#fff"/>`;
      o += `<path d="M0 50 Q28 60 48 78 H0Z" fill="#4F8A5E"/><path d="M160 50 Q130 60 112 78 H160Z" fill="#4F8A5E"/>`;
      for (let k = 0; k < 5; k++) o += h.pine(4 + k * 8, 62 + k * 3.4, 10, "#3F6E55") + h.pine(156 - k * 8, 62 + k * 3.4, 10, "#3F6E55");
      o += `<path d="M14 74 Q80 66 146 74 L152 86 Q80 94 8 86 Z" fill="#5FB8B0"/><path d="M38 72 L50 86 L62 72 Z M98 72 L110 89 L122 72 Z" fill="#9AA6B8" opacity=".35"/><path d="M40 82 h22 M90 80 h18" stroke="#fff" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>`;
      o += `<path d="M0 86 Q80 82 160 90 V100 H0Z" fill="#7FB070"/>`;
      o += `<rect x="18" y="80" width="15" height="9" fill="#B5784A"/><path d="M15 81 L25.5 72 L36 81 Z" fill="#6B4A30"/><rect x="21" y="83" width="3.5" height="3.5" fill="#FFE3A3"/><rect x="27" y="83" width="3" height="6" fill="#6B4A30"/>`;
      return o;
    },
    gdansk: (h) => {
      let o = h.sun(98, 14, 6);
      const C = ["#F2B46B", "#E77F6A", "#9CC6E8", "#F6D57A", "#B8D8A8", "#E9A2A2", "#F0E2C8"], T = [36, 30, 40, 32, 38, 34, 42];
      C.forEach((c, k) => {
        const x = 4 + k * 15, t = T[k], g = k % 3;
        o += `<rect x="${x}" y="${t}" width="14" height="${76 - t}" fill="${c}"/>`;
        o += g === 0 ? `<path d="M${x} ${t} L${x + 7} ${t - 8} L${x + 14} ${t} Z" fill="${c}"/>` : g === 1 ? `<path d="M${x} ${t} V${t - 3} H${x + 3} V${t - 6} H${x + 5.5} V${t - 9} H${x + 8.5} V${t - 6} H${x + 11} V${t - 3} H${x + 14} V${t} Z" fill="${c}"/>` : `<path d="M${x} ${t} Q${x} ${t - 6} ${x + 4} ${t - 6} Q${x + 7} ${t - 13} ${x + 10} ${t - 6} Q${x + 14} ${t - 6} ${x + 14} ${t} Z" fill="${c}"/>`;
        for (let y = t + 4; y < 70; y += 9) o += `<rect x="${x + 3}" y="${y}" width="3" height="4.5" fill="#5E4A3A" opacity=".5"/><rect x="${x + 8}" y="${y}" width="3" height="4.5" fill="#5E4A3A" opacity=".5"/>`;
      });
      o += `<rect x="122" y="22" width="24" height="54" fill="#5E4030"/><path d="M119 23 L134 7 L149 23 Z" fill="#4A3426"/><path d="M122 34 H146 M122 46 H146 M122 22 L146 46 M146 22 L122 46" stroke="#7A5A42" stroke-width="1"/><path d="M134 26 V52" stroke="#33302E" stroke-width=".8"/><path d="M134 52 q-2 0 -2 2 q0 2 2 2" stroke="#33302E" stroke-width="1" fill="none"/>`;
      o += `<rect x="111" y="42" width="13" height="34" fill="#B5603D"/><rect x="144" y="42" width="13" height="34" fill="#B5603D"/><path d="M110 42 L117.5 34 L125 42 Z M143 42 L150.5 34 L158 42 Z" fill="#7A3B2A"/><rect x="116" y="50" width="3" height="6" rx="1.5" fill="#6B3424"/><rect x="149" y="50" width="3" height="6" rx="1.5" fill="#6B3424"/>`;
      o += `<rect x="0" y="74" width="160" height="5" fill="#C9B79C"/><rect x="0" y="79" width="160" height="21" fill="${h.water}"/>` + h.waves(86, 4);
      o += `<path d="M30 88 L58 88 L54 94 L34 94 Z" fill="#8A5A3A"/><path d="M44 88 V70 L56 86 Z" fill="#F4EBDD"/><path d="M42 88 V73 L33 86 Z" fill="#F2D3C0"/>`;
      return o;
    },
    bialowieza: (h) => {
      let o = "";
      [[30, 30, 18], [70, 24, 20], [112, 28, 18], [150, 22, 18]].forEach(([x, y, r]) => { o += `<rect x="${x - 2}" y="${y}" width="4" height="${70 - y}" fill="#A8977A"/><circle cx="${x}" cy="${y}" r="${r}" fill="#9CC28E"/>`; });
      [[8, 20, 22, 8], [138, 14, 24, 9], [52, 6, 18, 6]].forEach(([x, y, r, w]) => { o += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${90 - y}" fill="#6E5A44"/><circle cx="${x}" cy="${y}" r="${r}" fill="#4F8A55"/><circle cx="${x - r / 2}" cy="${y + r / 3}" r="${r * 0.6}" fill="#5E9A5E"/>`; });
      o += `<path d="M0 78 Q80 70 160 80 V100 H0Z" fill="#7FAE62"/>`;
      [[18, 90], [130, 92], [148, 86], [30, 96]].forEach(([x, y]) => { o += `<path d="M${x} ${y} q-6 -4 -9 -10 M${x} ${y} q0 -7 1 -12 M${x} ${y} q6 -4 9 -9" stroke="#4E8A4A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`; });
      o += `<g transform="translate(0 2)"><path d="M58 78 Q60 58 76 56 Q90 54 100 64 Q106 70 104 80 Q90 84 70 84 Q60 84 58 78Z" fill="#7A5236"/><path d="M104 66 q4 6 2 12" stroke="#5E3E28" stroke-width="1.4" fill="none"/><rect x="63" y="80" width="4.5" height="10" rx="1.5" fill="#4E3322"/><rect x="72" y="81" width="4.5" height="9" rx="1.5" fill="#5E3E28"/><rect x="90" y="80" width="4.5" height="10" rx="1.5" fill="#4E3322"/><rect x="98" y="79" width="4.5" height="10" rx="1.5" fill="#5E3E28"/>`;
      o += `<path d="M58 80 Q54 62 70 55 Q78 60 76 76 Z" fill="#5E3E28"/><ellipse cx="54" cy="78" rx="7" ry="8" fill="#4E3322"/><path d="M49 72 q-4 -2 -3 -6 M59 72 q4 -2 3 -6" stroke="#EADFC6" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M49 83 q5 8 10 0 Z" fill="#4E3322"/><ellipse cx="54" cy="83" rx="3.2" ry="2.2" fill="#6E4A34"/><circle cx="51" cy="76" r=".9" fill="#F3E6C8"/><circle cx="57" cy="76" r=".9" fill="#F3E6C8"/></g>`;
      return o;
    },
    amsterdam: (h) => {
      let o = "";
      const C = ["#8C5A46", "#E9DCC2", "#B86A4E", "#7E8E86", "#D9A86E", "#6E4A3A", "#E7C9A8", "#A65C4A", "#9CB4C8"], T = [32, 26, 36, 24, 32, 28, 34, 26, 30];
      C.forEach((c, k) => {
        const x = 1 + k * 18, t = T[k], g = k % 3;
        o += `<rect x="${x}" y="${t}" width="18" height="${78 - t}" fill="${c}"/>`;
        o += g === 0 ? `<path d="M${x} ${t} Q${x + 4} ${t - 1} ${x + 4} ${t - 5} Q${x + 4} ${t - 12} ${x + 9} ${t - 12} Q${x + 14} ${t - 12} ${x + 14} ${t - 5} Q${x + 14} ${t - 1} ${x + 18} ${t} Z" fill="${c}"/>` : g === 1 ? `<path d="M${x} ${t} V${t - 3} H${x + 3} V${t - 6} H${x + 6} V${t - 9} H${x + 12} V${t - 6} H${x + 15} V${t - 3} H${x + 18} V${t} Z" fill="${c}"/>` : `<path d="M${x} ${t} V${t - 4} H${x + 5} V${t - 10} L${x + 9} ${t - 14} L${x + 13} ${t - 10} V${t - 4} H${x + 18} V${t} Z" fill="${c}"/>`;
        o += `<path d="M${x + 9} ${t - 7} v2.5 h2" stroke="#33302E" stroke-width=".8" fill="none"/>`;
        for (let y = t + 3; y < 70; y += 10) o += `<rect x="${x + 3}" y="${y}" width="4.5" height="6.5" fill="#F7F2E6"/><rect x="${x + 10.5}" y="${y}" width="4.5" height="6.5" fill="#F7F2E6"/><rect x="${x + 3.8}" y="${y + 0.8}" width="2.9" height="4.9" fill="#5E6E80"/><rect x="${x + 11.3}" y="${y + 0.8}" width="2.9" height="4.9" fill="#5E6E80"/>`;
      });
      o += `<rect x="0" y="76" width="160" height="5" fill="#B9AD9A"/><rect x="0" y="81" width="160" height="19" fill="${h.water}"/>` + h.waves(88, 4);
      o += `<g stroke="#33302E" stroke-width="1" fill="none"><circle cx="58" cy="73" r="3.2"/><circle cx="69" cy="73" r="3.2"/><path d="M58 73 L62 67 L67 67 L69 73 M62 67 L63.5 73 L67 67 M61 66 h2.5 M67 67 l-1 -2 h2"/></g><rect x="67.5" y="62.5" width="4" height="2.5" fill="#C9934E"/><circle cx="69.5" cy="61.5" r="1.4" fill="#E2654F"/>`;
      o += `<path d="M96 88 L132 88 L129 93 L99 93 Z" fill="#3E5A6E"/><rect x="104" y="84.5" width="20" height="3.6" rx="1" fill="#F4F1EA"/><rect x="99" y="90" width="31" height="1.2" fill="#F2C063"/>`;
      return o;
    },
    kinderdijk: (h) => {
      let o = h.sun(126, 34, 9, "#FFD08A") + `<rect x="0" y="60" width="160" height="40" fill="#9CC77E"/>`;
      for (let k = 0; k < 7; k++) o += `<path d="M76 60 L${-60 + k * 50} 100" stroke="#8AB86C" stroke-width="2"/>`;
      o += `<path d="M22 100 L73 60 L79 60 L92 100 Z" fill="${h.water}"/><path d="M50 88 h10 M66 76 h6 M60 94 h12" stroke="#fff" stroke-width="1" opacity=".6"/>`;
      o += `<path d="M0 60 Q40 57 80 60 T160 59 V61 H0Z" fill="#7FA86A"/>`;
      o += mill(96, 64, 0.32, 10) + mill(58, 66, 0.38, 35) + mill(102, 72, 0.55, 28) + mill(44, 78, 0.7, 15) + mill(124, 92, 1.0, 22);
      [[16, 96], [100, 98], [34, 90]].forEach(([x, y]) => { o += `<path d="M${x} ${y} l-2 -8 M${x + 2} ${y} l0 -9 M${x + 4} ${y} l2 -7" stroke="#5E8A4A" stroke-width="1.4" stroke-linecap="round"/>`; });
      return o;
    },
    keukenhof: (h) => {
      let o = h.sun(32, 22, 7) + `<path d="M0 54 Q20 46 40 52 T80 50 T120 50 T160 52 V56 H0Z" fill="#7FA86A"/>`;
      o += mill(128, 54, 0.38, 12);
      o += `<rect x="0" y="54" width="160" height="46" fill="#8FBF6A"/>`;
      const C = ["#E2654F", "#F6D057", "#F29AB8", "#9B7BC9", "#F2A65A", "#FFF4D8", "#E2654F", "#F6D057", "#F29AB8"];
      C.forEach((c, k) => { const b0 = -64 + k * 34, b1 = b0 + 27, t0 = 80 + (b0 - 80) * 0.18, t1 = 80 + (b1 - 80) * 0.18; o += `<path d="M${t0} 55 L${t1} 55 L${b1} 100 L${b0} 100 Z" fill="${c}"/>`; });
      o += tulip(16, 86, "#E2654F") + tulip(26, 90, "#F29AB8") + tulip(136, 88, "#F6D057") + tulip(148, 84, "#9B7BC9");
      return o;
    },
    wadden: (h) => {
      let o = h.sun(34, 24, 7);
      o += `<rect x="0" y="54" width="160" height="10" fill="#9CC9DE"/><path d="M84 56 Q104 46 124 52 Q144 46 160 50 V58 H84Z" fill="#C9D9A8"/><path d="M84 57 Q120 52 160 56 V58 H84Z" fill="#F1E3C2"/>`;
      o += `<rect x="134" y="32" width="6" height="21" fill="#F4F1EA"/><rect x="134" y="36" width="6" height="4" fill="#E2654F"/><rect x="134" y="44" width="6" height="4" fill="#E2654F"/><rect x="133" y="28" width="8" height="4" fill="#FFE08A"/><path d="M132.5 28 L137 23 L141.5 28 Z" fill="#E2654F"/>`;
      o += `<rect x="0" y="62" width="160" height="38" fill="#D8C9AA"/>`;
      for (let k = 0; k < 9; k++) o += `<path d="M${6 + (k * 37) % 150} ${66 + (k * 11) % 30} q3 -2 6 0 q3 -2 6 0" stroke="#C2AF8C" stroke-width="1" fill="none"/>`;
      o += `<path d="M0 72 Q40 66 70 76 T120 82 T160 78 V85 Q120 90 70 84 Q40 76 0 80Z" fill="#8FC0D6"/><path d="M30 74 h10 M96 82 h12" stroke="#fff" stroke-width="1" opacity=".6"/>`;
      o += seal(40, 94, 0.95, "#9AA2AE") + seal(66, 97, 0.8, "#AEB5BF") + seal(130, 68, 0.6, "#9AA2AE");
      [[150, 98], [144, 94], [139, 91], [133, 88]].forEach(([x, y]) => { o += `<ellipse cx="${x}" cy="${y}" rx="1.4" ry=".8" fill="#B8A684"/><ellipse cx="${x - 2}" cy="${y + 1.6}" rx="1.4" ry=".8" fill="#B8A684"/>`; });
      o += gull(70, 30) + gull(80, 26) + gull(100, 34);
      return o;
    },
    istanbul: (h) => {
      let o = h.sun(146, 24, 8, "#FFC88A");
      o += `<path d="M0 60 Q40 54 80 58 T160 56 V68 H0Z" fill="#C9B8D0"/>`;
      const M = "#9C92B8";
      o += `<rect x="30" y="52" width="86" height="16" fill="${M}"/><rect x="57" y="45" width="32" height="8" fill="${M}"/><path d="M55 46 Q73 22 91 46 Z" fill="${M}"/><path d="M73 33 V24" stroke="${M}" stroke-width="1.4"/><circle cx="73" cy="23.5" r="1.2" fill="#E9B949"/>`;
      o += `<path d="M42 53 Q50 38 60 53 Z M86 53 Q96 38 104 53 Z M30 56 Q36 47 42 56 Z M104 56 Q110 47 116 56 Z" fill="${M}"/>`;
      for (let x = 60; x < 88; x += 5) o += `<rect x="${x}" y="47" width="1.6" height="3.5" rx=".8" fill="#FFE3B3" opacity=".8"/>`;
      [24, 36, 110, 122].forEach((x, k) => { const t = k === 1 || k === 2 ? 16 : 22; o += `<rect x="${x - 1.6}" y="${t}" width="3.2" height="${68 - t}" fill="${M}"/><rect x="${x - 2.6}" y="${t + 14}" width="5.2" height="1.6" fill="${M}"/><rect x="${x - 2.6}" y="${t + 26}" width="5.2" height="1.6" fill="${M}"/><path d="M${x - 1.6} ${t} L${x} ${t - 10} L${x + 1.6} ${t} Z" fill="${M}"/>`; });
      o += `<rect x="0" y="66" width="160" height="34" fill="${h.water}"/>` + h.waves(76, 5);
      o += `<path d="M96 84 L142 84 L138 92 L100 92 Z" fill="#F4F1EA"/><rect x="104" y="78" width="30" height="6.5" fill="#F4F1EA"/><rect x="100" y="87" width="40" height="1.4" fill="#3E5A6E"/><rect x="117" y="71" width="4" height="7.5" fill="#F2C063"/><rect x="117" y="71" width="4" height="2" fill="#33302E"/>`;
      for (let x = 107; x < 132; x += 4) o += `<circle cx="${x}" cy="81" r=".9" fill="#5E6E80"/>`;
      o += gull(50, 20) + gull(60, 26) + gull(144, 46);
      return o;
    },
    kapadokya: (h) => {
      let o = h.sun(30, 30, 8, "#FFD08A");
      o += `<path d="M0 64 Q30 52 60 60 T120 56 T160 60 V74 H0Z" fill="#E7C2A0"/><path d="M0 76 Q80 66 160 76 V100 H0Z" fill="#E8C9A0"/>`;
      [[18, 92, 30, 9], [38, 96, 42, 10], [60, 96, 26, 8], [108, 94, 36, 10], [130, 92, 28, 9], [150, 96, 22, 7]].forEach(([x, b, ht, w]) => {
        o += `<path d="M${x - w} ${b} Q${x - w * 0.6} ${b - ht * 0.6} ${x - w * 0.35} ${b - ht} L${x + w * 0.35} ${b - ht} Q${x + w * 0.6} ${b - ht * 0.6} ${x + w} ${b} Z" fill="#F0D6B2"/><path d="M${x + w * 0.2} ${b - ht} Q${x + w * 0.5} ${b - ht * 0.5} ${x + w} ${b} L${x + w * 0.5} ${b} Q${x + w * 0.3} ${b - ht * 0.5} ${x} ${b - ht} Z" fill="#DDB98E" opacity=".7"/><path d="M${x - w * 0.6} ${b - ht + 1} Q${x} ${b - ht - w * 1.1} ${x + w * 0.6} ${b - ht + 1} Z" fill="#B98E64"/><path d="M${x - 1.5} ${b} V${b - 4} a1.5 1.5 0 0 1 3 0 V${b} Z" fill="#8A6A4E"/><circle cx="${x + 2}" cy="${b - ht * 0.55}" r="1.1" fill="#8A6A4E"/>`;
      });
      [[84, 30, 11, "#E2654F", "#F6D057"], [118, 20, 8, "#6FA6D6", "#FFF4D8"], [58, 42, 7, "#F29AB8", "#FFF4D8"], [138, 48, 6, "#9B7BC9", "#F6D057"], [100, 54, 4.5, "#7DBE8A", "#FFF4D8"]].forEach(([x, y, r, c, c2]) => {
        o += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><path d="M${x - r * 0.97} ${y + r * 0.25} Q${x - r * 0.6} ${y + r * 1.1} ${x - r * 0.28} ${y + r * 1.35} L${x + r * 0.28} ${y + r * 1.35} Q${x + r * 0.6} ${y + r * 1.1} ${x + r * 0.97} ${y + r * 0.25} Z" fill="${c}"/><path d="M${x} ${y - r} Q${x - r * 0.45} ${y} ${x - r * 0.2} ${y + r * 1.33} L${x + r * 0.2} ${y + r * 1.33} Q${x + r * 0.45} ${y} ${x} ${y - r} Z" fill="${c2}"/><path d="M${x - r * 0.28} ${y + r * 1.35} L${x - r * 0.22} ${y + r * 1.6} M${x + r * 0.28} ${y + r * 1.35} L${x + r * 0.22} ${y + r * 1.6}" stroke="#6B4A30" stroke-width=".5"/><rect x="${x - r * 0.25}" y="${y + r * 1.6}" width="${r * 0.5}" height="${r * 0.4}" fill="#8A6040"/>`;
      });
      return o;
    },
    pamukkale: (h) => {
      let o = h.sun(130, 18, 7) + `<path d="M0 44 Q40 30 80 38 T160 34 V60 H0Z" fill="#B9C79A"/>`;
      o += `<rect x="16" y="28" width="3" height="14" fill="#EADCC4"/><rect x="24" y="31" width="3" height="11" fill="#EADCC4"/><rect x="14" y="26" width="15" height="2.5" fill="#EADCC4"/>` + h.cypress(150, 44, 14);
      o += `<path d="M30 46 Q80 36 130 46 L170 100 H-10 Z" fill="#E6E0D2"/>`;
      const tiers = [[46, [[46, 78], [82, 114]]], [57, [[28, 60], [64, 96], [100, 132]]], [68, [[12, 44], [48, 80], [84, 116], [120, 152]]], [79, [[-2, 30], [34, 66], [70, 102], [106, 138], [142, 174]]], [90, [[-16, 16], [20, 52], [56, 88], [92, 124], [128, 160]]]];
      tiers.forEach(([y, bs]) => bs.forEach(([a, b]) => {
        o += `<path d="M${a} ${y} L${b} ${y} Q${b + 2} ${y + 8} ${b - 2} ${y + 9} L${a + 2} ${y + 9} Q${a - 2} ${y + 8} ${a} ${y} Z" fill="#FFFFFF"/><path d="M${a + 2} ${y + 9} L${b - 2} ${y + 9}" stroke="#D9D2C2" stroke-width="1.2"/><path d="M${a + 6} ${y + 3} v5 M${(a + b) / 2} ${y + 3} v6 M${b - 7} ${y + 3} v4" stroke="#E3DED2" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="${(a + b) / 2}" cy="${y}" rx="${(b - a) / 2}" ry="3.2" fill="#7FD3DE"/><ellipse cx="${(a + b) / 2 - 4}" cy="${y - 0.6}" rx="${(b - a) / 5}" ry=".8" fill="#fff" opacity=".6"/>`;
      }));
      return o;
    },
    efes: (h) => {
      let o = h.sun(132, 20, 7) + `<rect x="0" y="86" width="160" height="14" fill="#E3D2B0"/>`;
      o += h.cypress(10, 88, 26) + h.cypress(152, 88, 30);
      o += `<rect x="20" y="62" width="4" height="24" fill="#EADCC4"/><path d="M20 62 l1.5 -2 l1 1.5 l1.5 -1 V62Z" fill="#EADCC4"/><rect x="134" y="70" width="4" height="16" fill="#EADCC4"/><rect x="141" y="84" width="9" height="3" rx="1" fill="#D2BFA0"/>`;
      o += `<rect x="48" y="30" width="64" height="24" fill="#D8C4A2"/><rect x="40" y="56" width="80" height="27" fill="#D8C4A2"/>`;
      o += `<path d="M74 83 V69 a6 6 0 0 1 12 0 V83 Z M53 83 V72 a4 4 0 0 1 8 0 V83 Z M99 83 V72 a4 4 0 0 1 8 0 V83 Z" fill="#8E7A5E"/><rect x="55" y="36" width="5" height="9" fill="#8E7A5E"/><rect x="77.5" y="35" width="5" height="10" fill="#8E7A5E"/><rect x="100" y="36" width="5" height="9" fill="#8E7A5E"/>`;
      o += `<rect x="38" y="52" width="84" height="5" fill="#EADCC4"/><rect x="38" y="56.5" width="84" height="1" fill="#C9B48A"/>`;
      [46, 68, 92, 114].forEach((c) => { o += `<rect x="${c - 7}" y="50" width="14" height="7" fill="#EFE3CC"/><rect x="${c - 5.5}" y="57" width="3.5" height="25" fill="#F5EDDF"/><rect x="${c + 2}" y="57" width="3.5" height="25" fill="#F5EDDF"/><rect x="${c - 6.5}" y="57" width="5.5" height="1.8" fill="#E2D2B5"/><rect x="${c + 1}" y="57" width="5.5" height="1.8" fill="#E2D2B5"/>`; });
      [57, 80, 103].forEach((c, k) => { o += `<rect x="${c - 5}" y="30" width="3" height="20" fill="#F5EDDF"/><rect x="${c + 2}" y="30" width="3" height="20" fill="#F5EDDF"/><rect x="${c - 7}" y="26" width="14" height="4.5" fill="#EFE3CC"/>` + (k === 1 ? `<path d="M${c - 8} 26.5 Q${c} 14 ${c + 8} 26.5 Z" fill="#EADCC4"/>` : `<path d="M${c - 8} 26.5 L${c} 18 L${c + 8} 26.5 Z" fill="#EADCC4"/>`); });
      o += `<rect x="46" y="27" width="68" height="3" fill="#EADCC4"/><rect x="36" y="82" width="88" height="4" fill="#D9C7A6"/><rect x="32" y="85.5" width="96" height="4" fill="#CFBC98"/>`;
      return o;
    }
  });
}
