/* =================== DATI DI GIOCO =================== */
const CATS = [
  ["body", "#F2A65A", ["water", "walk", "stretch", "fruit", "veggies", "sun", "move", "posture", "shower", "cook"]],
  ["mind", "#9B8CF2", ["breathe", "journal", "gratitude", "read", "screen", "music", "learn", "create"]],
  ["home", "#4FB89A", ["tidy", "bed", "dishes", "plants", "laundry", "declutter"]],
  ["people", "#EE7FA0", ["friend", "call", "hug", "kind", "thanks"]],
  ["work", "#5E9BD6", ["focus", "todo", "pause", "mail"]],
  ["sleep", "#7A82C9", ["sleep", "nophone", "wake", "dim"]]
];
const CUSTOM_COLOR = "#B88A5A";
const GOAL_CAT = {};
CATS.forEach(([c, , ids]) => ids.forEach((id) => { GOAL_CAT[id] = c; }));
const CAT_COLOR = Object.fromEntries(CATS.map(([c, col]) => [c, col]));
CAT_COLOR.custom = CUSTOM_COLOR;
const GOALS_MIN = 3, GOALS_MAX = 8;
const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

const HATS = { red: ["#E2654F", "#C8503B"], blue: ["#7AA3DC", "#5A84C4"], violet: ["#9B79D4", "#7F5DC0"], green: ["#74BD87", "#55A06A"], pink: ["#F29BB8", "#DD7A9C"], gold: ["#E59A3A", "#C47A20"], s_autumn: ["#B4703F", "#8E5129"], s_winter: ["#D8483B", "#F6F1EA"] };
const SEASON_ITEMS = ["s_autumn", "s_winter", "s_spring", "s_summer"];
const SHOP = [
  { id: "rug", kind: "furn", price: 60 }, { id: "plant", kind: "furn", price: 50 }, { id: "lamp", kind: "furn", price: 70 },
  { id: "shelf", kind: "furn", price: 60 }, { id: "frame", kind: "furn", price: 50 }, { id: "lights", kind: "furn", price: 90 },
  { id: "pouf", kind: "furn", price: 80 }, { id: "clock", kind: "furn", price: 70 },
  { id: "red", kind: "wear", price: 30 }, { id: "blue", kind: "wear", price: 30 }, { id: "violet", kind: "wear", price: 40 },
  { id: "green", kind: "wear", price: 40 }, { id: "pink", kind: "wear", price: 40 }, { id: "gold", kind: "wear", price: 0, found: true },
  { id: "s_autumn", kind: "wear", price: 0, event: true }, { id: "s_winter", kind: "wear", price: 0, event: true },
  { id: "s_spring", kind: "wear", price: 0, event: true }, { id: "s_summer", kind: "wear", price: 0, event: true },
  { id: "w_cream", kind: "wall", price: 0 }, { id: "w_sage", kind: "wall", price: 40 }, { id: "w_rose", kind: "wall", price: 40 }, { id: "w_sky", kind: "wall", price: 40 }, { id: "w_lilac", kind: "wall", price: 40 }
];
const WALLS = { w_cream: ["#F3E6CF", "#EBDBC0"], w_sage: ["#DCE6CF", "#CFDCC0"], w_rose: ["#F1DAD3", "#E7CBC3"], w_sky: ["#DCE8F0", "#CCDDE8"], w_lilac: ["#E6DDF0", "#DACFE8"] };
const DESTS = [{ id: "forest", h: 1, lvl: 1 }, { id: "lake", h: 2, lvl: 1 }, { id: "hill", h: 2, lvl: 2 }, { id: "mountain", h: 3, lvl: 4 }, { id: "city", h: 4, lvl: 6 }];
const REAL_LVL = [2, 3, 5, 7], REAL_H = [2, 3, 3, 4];

/* Luoghi veri: ogni paese ha 4 mete, con il testo nella sua lingua */
const REAL = {
  it: [
    { art: "venezia", name: "Venezia", t: "Il ponte numero quattrocento", s: "{n} ha fatto un giro in gondola tra i canali di Venezia. Ha provato a contare i ponti, ma sono più di quattrocento: al numero trentadue si è addormentato, cullato dall'acqua." },
    { art: "dolomiti", name: "Dolomiti", t: "Le montagne rosa", s: "Al tramonto le Dolomiti si colorano di rosa: si chiama enrosadira. {n} è rimasto a guardarle finché è spuntata la prima stella." },
    { art: "cinqueterre", name: "Cinque Terre", t: "Cinque paesi sul mare", s: "{n} ha camminato sul sentiero che unisce i cinque paesi delle Cinque Terre, tra case colorate e profumo di limoni. Il preferito? Tutti e cinque." },
    { art: "roma", name: "Roma", t: "Una monetina nella fontana", s: "{n} ha visto il Colosseo e poi ha lanciato una monetina nella Fontana di Trevi. Dice la tradizione che così, prima o poi, a Roma si torna." }
  ],
  de: [
    { art: "neuschwanstein", name: "Neuschwanstein", t: "Ein Schloss wie im Märchen", s: "{n} hat Schloss Neuschwanstein besucht, das König Ludwig II. bauen ließ. Zwischen Bergen und Wäldern sah es aus wie aus einem Bilderbuch." },
    { art: "schwarzwald", name: "Schwarzwald", t: "Kuckuck!", s: "Im Schwarzwald hat {n} eine Kuckucksuhr rufen gehört und ein Stück Schwarzwälder Kirschtorte probiert. Mit Sahne, natürlich." },
    { art: "bodensee", name: "Bodensee", t: "Drei Länder, ein See", s: "Am Bodensee treffen sich Deutschland, Österreich und die Schweiz. {n} hat vom Boot aus allen dreien zugewinkt." },
    { art: "berlin", name: "Berlin", t: "Durch das Brandenburger Tor", s: "{n} ist in Berlin durch das Brandenburger Tor spaziert und hat sich dabei ganz klein und ganz glücklich gefühlt." }
  ],
  es: [
    { art: "sevilla", name: "Sevilla", t: "Rampas hasta el cielo", s: "{n} ha subido a la Giralda de Sevilla: por dentro no hay escaleras, sino rampas. Desde arriba, la ciudad olía a azahar." },
    { art: "granada", name: "Granada", t: "Los jardines de la Alhambra", s: "{n} ha paseado por la Alhambra, entre arcos, fuentes y jardines. Al fondo, Sierra Nevada tenía la cima blanca de nieve." },
    { art: "barcelona", name: "Barcelona", t: "Mar y mosaicos", s: "En Barcelona, {n} ha mojado los pies en el mar y luego ha visto los mosaicos de colores de Gaudí. ¡Parecían de cuento!" },
    { art: "tenerife", name: "Tenerife", t: "Un mar de nubes", s: "{n} ha visto el Teide, la montaña más alta de España. Desde allí arriba, las nubes parecían un mar de algodón." }
  ],
  en: [
    { art: "london", name: "London", t: "Bong! Bong!", s: "{n} heard Big Ben chime in London. Fun fact: Big Ben is the name of the bell, while the tower is called the Elizabeth Tower." },
    { art: "highlands", name: "Scottish Highlands", t: "Hello, Highland cow!", s: "In the Scottish Highlands, {n} met a shaggy Highland cow by a quiet loch. They shared a very peaceful moment." },
    { art: "newyork", name: "New York", t: "Picnic among skyscrapers", s: "{n} looked up at the skyscrapers of New York, then had a picnic in Central Park. The squirrels were very interested." },
    { art: "grandcanyon", name: "Grand Canyon", t: "Millions of years", s: "{n} stood at the edge of the Grand Canyon. The Colorado River carved it over millions of years: big things take time." }
  ],
  fr: [
    { art: "paris", name: "Paris", t: "La dame de fer", s: "{n} est monté sur la tour Eiffel, construite pour l'Exposition universelle de 1889. Tout Paris était là, en bas, comme un plan miniature." },
    { art: "montsaintmichel", name: "Mont-Saint-Michel", t: "Entre deux marées", s: "Au Mont-Saint-Michel, la mer monte vite et loin. {n} a regardé l'abbaye redevenir une île, comme par magie." },
    { art: "provence", name: "Provence", t: "Les champs de lavande", s: "En Provence, {n} a marché entre les rangs de lavande en fleur. Ça sentait si bon qu'une abeille a suivi {n} tout l'après-midi." },
    { art: "chamonix", name: "Chamonix", t: "Au pied du mont Blanc", s: "À Chamonix, {n} a admiré le mont Blanc, le plus haut sommet des Alpes. Et un tout petit bonhomme de neige est né ce jour-là." }
  ],
  pt: [
    { art: "rio", name: "Rio de Janeiro", t: "Bondinho nas alturas", s: "{n} subiu no bondinho do Pão de Açúcar e viu o Rio de Janeiro inteiro lá de cima: mar, praias e morros verdinhos." },
    { art: "amazonia", name: "Amazônia", t: "A maior floresta", s: "{n} navegou por um rio da Amazônia, a maior floresta tropical do mundo. Uma arara colorida acompanhou o barquinho." },
    { art: "lencois", name: "Lençóis Maranhenses", t: "Dunas e lagoas", s: "Nos Lençóis Maranhenses, a chuva enche lagoas entre as dunas brancas. {n} deu um mergulho na água azul-turquesa." },
    { art: "iguacu", name: "Foz do Iguaçu", t: "O barulho das águas", s: "{n} viu as Cataratas do Iguaçu, na fronteira com a Argentina. Eram tantas quedas d'água que até apareceu um arco-íris." }
  ]
};
const SEEDS_GOAL = 10, SEEDS_ALL = 20, SEEDS_GIFT = 15, SEEDS_LEVEL = 30, SEEDS_TRIP = 20, XP_GOAL = 10, XP_TRIP = 15, EVENT_GOAL = 20, SEEDS_EVENT_AGAIN = 50;
const xpNeed = (lvl) => 40 + lvl * 20;

/* Stagioni: per il Brasile (pt) sono invertite */
const SEASON_COLOR = { autumn: "#D9783A", winter: "#5E9BD6", spring: "#E77FA6", summer: "#E9A23B" };
function seasonInfo(lang, d = new Date()) {
  const m = d.getMonth(), y = d.getFullYear();
  const b = m >= 2 && m <= 4 ? 0 : m >= 5 && m <= 7 ? 1 : m >= 8 && m <= 10 ? 2 : 3;
  const sy = b === 3 && m < 2 ? y - 1 : y;
  const end = b === 0 ? new Date(sy, 4, 31) : b === 1 ? new Date(sy, 7, 31) : b === 2 ? new Date(sy, 10, 30) : new Date(sy + 1, 2, 0);
  const north = ["spring", "summer", "autumn", "winter"], south = ["autumn", "winter", "spring", "summer"];
  const id = (lang === "pt" ? south : north)[b];
  const next = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1);
  return { id, key: `${sy}-${b}`, end, next };
}

/* --- Novità versione 4 --- */
WALLS.w_stars = ["#34406E", "#3C4A7C"];
SHOP.push({ id: "teddy", kind: "furn", price: 0, special: true }, { id: "fishbowl", kind: "furn", price: 0, special: true }, { id: "w_stars", kind: "wall", price: 0, special: true });
const SPECIALS = ["teddy", "fishbowl", "w_stars"];
const SNACKS = ["apple", "berries", "cookie", "honey", "fish", "carrot"];
const FAV = { germo: "berries", ondi: "fish", lumi: "honey" };
const FEED_MAX = 3, GAME_SEEDS_MAX = 20, GAME_SECS = 20;
const giftValue = (n) => 10 + 5 * Math.min(Math.max(n, 1), 7);
/* Conteggio anonimo delle aperture (GoatCounter): resta spento finché il codice è vuoto */
/* Conteggi anonimi: sul sito pubblico e nell'app Android (che gira su "localhost" dentro il telefono) */
const GC_CODE = (/github\.io$/.test(location.hostname) || (() => { try { return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()); } catch (e) { return false; } })()) ? "tanettoapp" : "";
const FEEDBACK_EMAIL = "tanettoapp@gmail.com";
