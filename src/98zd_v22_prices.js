/* =================== 1.0.9 (fase 2): progressione lenta, obiettivi APPROVATI dal proprietario (12/11/2026) ===================
   Per chi gioca tipico (tutti gli obiettivi, regalo, un viaggio, ~2 video al giorno), misurato con l'app vera giorno per giorno
   (scratchpad/p2b/tools/econrun.py + econtab.py):
     iniziali 100 (giorno 1) · base 100-250 · comune 900-1.750 (1-2 settimane) · raro 4.700-5.500 (5-6 settimane) ·
     epico 11.500-15.000 (3-4 mesi) · leggendario 30.000-33.500 (8-9 mesi) · mitico 40.500 / 44.500 (11-12 mesi, il "ponte") ·
     Introvabili 68.000-80.000 (XV_PRICE): chi guarda 5 video al giorno con la serie piena ci mette almeno 12 mesi.
   L'ordine dentro ogni fascia e' quello della critica dell'economia (ECON_CRITIC.md, prices_rec.json), riscalato.
   Tra un acquisto e l'altro restano i premi gratis frequenti: tappe del sentiero, cartoline dei viaggi, pagine dell'album,
   trofei e le feste del Desiderio al 25/50/75%.
   I guadagni senza video NON cambiano (t38_econ resta nella fascia 70-90 Tanì al giorno): cambiano solo i prezzi.
   Chi ha gia' un oggetto lo tiene, e tiene tutti i suoi Tanì: cambiano solo i prezzi di cio' che non ha ancora.
   TUTTO E' QUI: per ritoccare basta cambiare PR22_PRICE, XV_PRICE e PR22.PATH. */
const PR22_PRICE = {
  n_bandana: 100, blue: 125, cushion_floor: 125, h_bucket: 125, lamp_candle: 100, plant: 100, red: 125, f_round: 150, garland_paper: 150, frame: 200,
  w_sage: 200, curt_green: 250, rug: 250, green: 900, pink: 900, violet: 900, h_bow: 1000, cactus: 1100, curt_blue: 1100, h_party: 1100,
  n_scarf: 1100, shelf: 1100, h_cap: 1100, books: 1200, h_flower: 1200, lamp: 1200, w_lilac: 1200, w_mint: 1200, w_peach: 1200, w_rose: 1200,
  w_sky: 1200, f_heart: 1200, pouf: 1200, sunflower: 1200, w_dots: 1200, yarn: 1200, clock: 1350, curt_lace: 1350, w_hearts: 1350,
  plant_lavender: 1450, h_bear: 1550, lights: 1550, rug_blue: 1550, garland_flowers: 1750, n_lei: 4700, bunting: 4750, monstera: 4750,
  h_tophat: 4800, f_star: 4850, h_chef: 4850, poster: 4850, curt_night: 4950, h_frog: 4950, h_nightcap: 4950, lamp_lava: 4950, w_check: 4950,
  h_bunny: 5000, h_sailor: 5000, lanterns: 5000, rug_cloud: 5000, w_flowers: 5000, h_mush: 5100, lamp_tulip: 5100, mirror: 5100, rug_rainbow: 5100,
  w_waves: 5100, h_strawberry: 5200, lamp_moon: 5200, pillows: 5200, w_wood: 5200, art_dreamcatcher: 5300, h_phones: 5300, shelf_crystals: 5300,
  w_candy: 5300, guitar: 5400, h_cloud: 5400, art_moons: 5500, rug_sheep: 5500, w_clouds: 5500, n_cape: 11500, h_unicorn: 12000, f_monocle: 12200,
  h_lantern: 12200, lamp_stone: 12400, h_wizard: 12900, rug_star: 12900, w_honey: 12900, h_cupcake: 13100, w_mush: 13400, h_halo: 13800,
  lamp_jelly: 13800, w_books: 14100, shelf_potions: 14300, h_crown: 14500, h_dragon: 14800, star_scope: 15000, n_starcape: 30000, f_mask: 30500,
  tree_lights: 32000, w_moon: 32000, plant_cherry: 32500, w_aurora: 33000, h_tiara: 33500, h_starcrown: 40500, ceil_stars: 44500
};
const PR22 = {
  /* sentieri delle stagioni: rari ed epici piu' avanti in proporzione (~1,45x); la leggendaria resta all'ultima tappa */
  PATH: { kites: { f: { 7: 10 }, g: { 14: 21, 21: 14 } }, stars: { f: { 5: 8 }, g: { 10: 15, 15: 10 } } }
};
/* Introvabili (98ze): solo Tanì guadagnati (non quelli dei pacchetti), nessuno sconto Plus.
   Il primo (68.000) arriva dopo ~12 mesi a chi guarda 5 video al giorno con la serie piena e gioca a tutti i giochi. */
const XV_PRICE = { x_aura: 68000, x_crown: 68000, x_cloak: 70000, x_galaxy: 73000, x_fountain: 76000, x_tree: 80000 };

/* (critica fase 2) Pacchetti di Tanì (soldi veri): stessi prezzi in euro, Tanì x5 (prima 200 / 1.100 / 2.400 / 5.000).
   Perche' x5: i prezzi degli oggetti sono saliti di circa 5 volte (rari, epici, leggendari 4,3-7,9x; comuni 3,9-4,7x),
   i guadagni del gioco no. Con i pacchetti di prima, chi paga avrebbe avuto per gli stessi soldi un quinto di quello che
   aveva con la 1.0.8: x5 riporta lo stesso valore in oggetti (0,99 = circa un oggetto comune; 4,99 = qualsiasi raro;
   9,99 = un epico; 19,99 = qualsiasi epico con resto, non un leggendario). Il bonus resta quello di prima (+9/+19/+24%),
   nessuna taglia "che non basta mai", e i Tanì dei pacchetti non valgono per gli Introvabili (98ze).
   I codici dei prodotti su Google Play restano tani_200 ... tani_5000 (non si possono cambiare): vanno aggiornati solo
   i NOMI dei prodotti in Play Console ("1.000 Tanì", ...). Il controllo delle copie (EC.IMPORT_PER_PACK) segue i pacchetti. */
PACKS.splice(0, PACKS.length, { n: 1000, p: 0.99, b: 0 }, { n: 5500, p: 4.99, b: 9 }, { n: 12000, p: 9.99, b: 19 }, { n: 25000, p: 19.99, b: 24 });
/* un acquisto consegnato su questo telefono puo' valere fino al pacchetto piu' grande raddoppiato (primo acquisto) */
EC.IMPORT_PER_PACK = Math.max(EC.IMPORT_PER_PACK, 2 * PACKS[PACKS.length - 1].n + 5000);

const PR22_OLD = {};
(() => {
  SHOP.forEach((s) => {
    const p = PR22_PRICE[s.id]; if (p == null || !(s.price > 0) || s.reward || s.special || s.event || s.found || s.coll || s.def || s.xv) return;
    PR22_OLD[s.id] = s.price; s.price = p;
    if (typeof PRICE_TIER !== "undefined" && s.rar) { Object.keys(PRICE_TIER).forEach((t) => { if (PRICE_TIER[t]) delete PRICE_TIER[t][s.id]; }); PRICE_TIER[s.rar] = PRICE_TIER[s.rar] || {}; PRICE_TIER[s.rar][s.id] = p; }
  });
  /* sentieri: si scambiano le tappe indicate (stessi premi e stessi Tanì in tutto, solo in un altro ordine) */
  Object.entries(PR22.PATH).forEach(([kind, tr]) => {
    const R = SEA_REW[kind]; if (!R) return;
    ["f", "g"].forEach((t) => { const m = tr[t]; if (!m) return; const o = {}; Object.keys(R[t]).forEach((k) => { o[m[k] != null ? m[k] : k] = R[t][k]; }); R[t] = o; });
  });
})();

/* "In circa N giorni": anche i video che guardi davvero (media degli ultimi 7 giorni, mai oggi), cosi' la stima e' la tua */
const _dailyTaniGuessPR = dailyTaniGuess;
dailyTaniGuess = function () {
  let d = _dailyTaniGuessPR();
  try {
    if (typeof adsOn === "function" && adsOn()) {
      const e = econ(); let n = 0;
      for (let i = 1; i <= 7; i++) { const x = new Date(); x.setDate(x.getDate() - i); n += Math.min(AD_DOUBLE_MAX, e.ads[dkey(x)] || 0); }
      d += (n / 7) * adAmount();
    }
  } catch (err) { /* la stima resta quella senza video */ }
  return Math.max(1, Math.round(d));
};

/* Plus: il vantaggio in Tanì detto chiaro (14 lingue). Prima: "+50% (poi +30%) di Tanì dagli obiettivi". */
const PR22_PLUS = {
  it: (m) => `${m} Tanì in regalo ogni mese e il regalo del giorno vale il triplo, senza pubblicità`,
  en: (m) => `${m} Tanì gifted every month, and your daily gift is worth triple, with no ads`,
  de: (m) => `Jeden Monat ${m} Tanì geschenkt, und dein Tagesgeschenk zählt dreifach, ohne Werbung`,
  es: (m) => `${m} Tanì de regalo cada mes y el regalo del día vale el triple, sin anuncios`,
  fr: (m) => `${m} Tanì offerts chaque mois, et ton cadeau du jour vaut le triple, sans pub`,
  pt: (m) => `${m} Tanì de presente todo mês e o presente do dia vale o triplo, sem anúncios`,
  ja: (m) => `毎月${m} Tanìのプレゼント。毎日のプレゼントは広告なしで3倍に`,
  ko: (m) => `매달 ${m} Tanì 선물, 매일 선물은 광고 없이 세 배`,
  zh: (m) => `每月赠送 ${m} Tanì，每日礼物变成三倍，无需看广告`,
  zht: (m) => `每月送你 ${m} Tanì，每日禮物變成三倍，不用看廣告`,
  ru: (m) => `${m} Tanì в подарок каждый месяц, а ежедневный подарок втрое больше, без рекламы`,
  pl: (m) => `${m} Tanì w prezencie co miesiąc, a codzienny prezent jest potrójny, bez reklam`,
  nl: (m) => `Elke maand ${m} Tanì cadeau, en je dagelijkse cadeau is drie keer zoveel, zonder reclame`,
  tr: (m) => `Her ay hediye ${m} Tanì, günlük hediyen de reklamsız üç katı`
};
/* La fascia "mitico" (i due oggetti ponte verso gli Introvabili) ha il suo nome in tutte le lingue (prima solo it/en) */
const PR22_MYTH = { it: "Mitico", en: "Mythic", de: "Mythisch", es: "Mítico", fr: "Mythique", pt: "Mítico", ja: "神話", ko: "신화", zh: "神话", zht: "神話", ru: "Мифический", pl: "Mityczny", nl: "Mythisch", tr: "Mitik" };
Object.keys(T).forEach((l) => {
  const t = T[l]; if (t.plus && Array.isArray(t.plus.perks) && t.plus.perks[6] != null) t.plus.perks[6] = (PR22_PLUS[l] || PR22_PLUS.en)(EC.PLUS_MONTH);
  if (t.rar) t.rar.m = PR22_MYTH[l] || PR22_MYTH.en;
});
