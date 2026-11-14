/* ===== 1.0.8 — Economia: guadagnare Tanì è più impegnativo, prezzi più alti, sentiero più lungo, scappatoie chiuse =====
   Obiettivo: un'app da aprire ogni giorno per tanto tempo. Chi gioca "tipico" (5 obiettivi su 5, regalo del giorno,
   1 viaggio al giorno, niente video e niente giochi) guadagna circa 80 Tanì al giorno a regime (prima 190-260).
   I Tanì che i tester hanno già restano tutti: cambia solo quello che si guadagna da ora in poi.

   Tutte le cifre sono qui sotto, in costanti con un nome chiaro. Le costanti dei file vecchi sono "const" e non si
   possono riassegnare: per questo i premi si correggono "avvolgendo" le funzioni che li danno (vedi la sezione 4).

   ----------------------------------------------------------------------------------------------------------------
   TABELLA GUADAGNI (vecchio → nuovo)                         "giorni" = giorni di gioco tipico a ~75-80 Tanì/giorno
   ----------------------------------------------------------------------------------------------------------------
   Obiettivo spuntato ..................... 10 → 5            (5 obiettivi = 25)
   Tutti gli obiettivi del giorno ......... 20 → 10           (una volta sola al giorno, anche se si tolgono/rimettono)
   Livello nuovo .......................... 30 → 15           (uguale per tutti: Plus non lo moltiplica più)
   Viaggio: mondi di partenza, luoghi veri,
            giro del mondo ................ 20 → 10           (gita breve dei viaggi: ×0,5 = 5, TRIP_PARTIAL_MULT in 98c)
   Viaggio: 9 mondi nuovi ................. 25…45 → 10…18     (10,10,12,12,14,14,16,16,18)
   Regalo del giorno ...................... 15…45 → 6…18      (4 + 2 × giorni di fila, massimo dal 7° giorno)
   Giochi ................................. tetto 20 → 10 al giorno, e ogni gioco dà metà dei punti in Tanì
   Sfida della settimana .................. 150 → 50
   Trofei della serie ..................... 30,60,120,200,300,400,500,800,1200 → 15,25,50,80,120,160,200,320,480 (+50% se perfetto)
   Timbri (5/10/20 visite) ................ 30/60/100 → 10/20/35
   Pagina dell'album ...................... 100+25×n → 40+10×n; luoghi veri 150 → 60; giro del mondo 300 → 120
   Album completo ......................... 1000 → 400 (+ "Album d'oro", invariato)
   Sentiero, fila gratis .................. 30 per tappa → 10; tappe 25/40/45: 250/400/300 → 80/130/100 (2.150 → 710)
   Sentiero, fila d'oro (Plus) ............ 60 per tappa → 20; 1/15/30/35/45: 150/300/600/400/500 → 50/100/200/130/170 (4.290 → 1.430)
   Plus, regalo del mese .................. 300 → 150 (+2 scudi, invariato)
   Plus, bonus sugli obiettivi ............ +50% → +30% → (1.0.9) 0%: al suo posto il regalo del giorno vale il triplo
   Bentornato (dopo 2+ giorni) ............ 20 → 10
   Sondaggio dei tester ................... 50 → 30 (una volta)
   Festa di stagione già vinta (dal 2027) . 50 → 20
   Video con premio ....................... 10 → 8 → (1.0.9) il regalo di oggi, 6-18 (massimo 5 al giorno, dopo il 1o obiettivo)
   Regalo di benvenuto .................... 50 (invariato)      Pacchetti di Tanì: 1.000 / 5.500 / 12.000 / 25.000 (98zd)

   Modello (scratchpad/econ/model_v20.py, stesse regole del modello dell'audit), Tanì al giorno:
                                    giorno 1 | 1-7 | 8-60 | 61-365 | 2° anno
     tipico (5 ob., regalo, 1 viaggio)    66 |  97 |  103 |     87 |      81   (prima: 185 | 230 | 260 | - | 190)
     tipico senza viaggi                  56 |  75 |   74 |     65 |      63
     costante (+5 video, giochi pieni)   116 | 147 |  153 |    137 |     131
     Plus (5 obiettivi)                  226 | 142 |  131 |    102 |      96
   I primi due mesi valgono di più perché arrivano le pagine dell'album, i timbri e i primi trofei.

   ----------------------------------------------------------------------------------------------------------------
   SENTIERO DELLA STAGIONE (Scintille)
   ----------------------------------------------------------------------------------------------------------------
   Obiettivo 10 → 7 · giornata completa 20 → 12 · sfida della settimana 100 → 60 · settimana di festa ×2 (obiettivi e
   giornate complete, come prima; la sfida non raddoppia e ora il testo lo dice). Con 5 obiettivi ogni giorno la fila
   gratis si completa al giorno 75 di 90 (prima al giorno 50); con 8 obiettivi al giorno 56.
   I progressi già fatti restano: le Scintille raccolte fino all'aggiornamento valgono come prima (S.v20econ.pass).

   ----------------------------------------------------------------------------------------------------------------
   PREZZI: nuovo = max(vecchio × 1,25; soglia della rarità), arrotondato in su (5 / 25 / 50 / 100). Tutti più alti.
   Soglie (a 75 Tanì/giorno): base 1 g = 75 · comune 2,5 g = 190 · raro 7 g = 525 · epico 16 g = 1.200 ·
   leggendario 40 g = 3.000 · mitico 120 g = 9.000. Per i leggendari e i mitici vince "× 1,25" (devono costare più di prima):
   escono 76-92 giorni e 133-167 giorni. Totale del catalogo: 100.930 → 126.920 (+ i 3 oggetti nuovi).
   ----------------------------------------------------------------------------------------------------------------
   blue 80→100 (1.3d) · plant 80→100 (1.3d) · red 80→100 (1.3d) · frame 100→125 (1.7d)
   w_sage 100→125 (1.7d) · curt_green 120→150 (2.0d) · rug 120→150 (2.0d) · green 150→190 (2.5d)
   pink 150→190 (2.5d) · violet 150→190 (2.5d) · h_bow 160→200 (2.7d) · cactus 180→225 (3.0d)
   curt_blue 180→225 (3.0d) · h_party 180→225 (3.0d) · shelf 180→225 (3.0d) · books 200→250 (3.3d)
   h_flower 200→250 (3.3d) · lamp 200→250 (3.3d) · w_lilac 200→250 (3.3d) · w_mint 200→250 (3.3d)
   w_peach 200→250 (3.3d) · w_rose 200→250 (3.3d) · w_sky 200→250 (3.3d) · pouf 220→275 (3.7d)
   sunflower 220→275 (3.7d) · w_dots 220→275 (3.7d) · yarn 220→275 (3.7d) · clock 250→325 (4.3d)
   curt_lace 250→325 (4.3d) · w_hearts 260→325 (4.3d) · plant_lavender 280→350 (4.7d) · h_bear 300→375 (5.0d)
   lights 300→375 (5.0d) · rug_blue 300→375 (5.0d) · garland_flowers 350→450 (6.0d) · bunting 500→625 (8.3d)
   monstera 500→625 (8.3d) · h_chef 550→700 (9.3d) · poster 550→700 (9.3d) · curt_night 600→750 (10.0d)
   h_frog 600→750 (10.0d) · h_nightcap 600→750 (10.0d) · lamp_lava 600→750 (10.0d) · w_check 600→750 (10.0d)
   h_bunny 650→825 (11.0d) · h_sailor 650→825 (11.0d) · lanterns 650→825 (11.0d) · rug_cloud 650→825 (11.0d)
   w_flowers 650→825 (11.0d) · h_mush 700→875 (11.7d) · lamp_tulip 700→875 (11.7d) · mirror 700→875 (11.7d)
   rug_rainbow 700→875 (11.7d) · w_waves 700→875 (11.7d) · h_strawberry 750→950 (12.7d) · lamp_moon 750→950 (12.7d)
   pillows 750→950 (12.7d) · w_wood 750→950 (12.7d) · art_dreamcatcher 800→1000 (13.3d) · h_phones 800→1000 (13.3d)
   shelf_crystals 800→1000 (13.3d) · w_candy 800→1000 (13.3d) · guitar 850→1100 (14.7d) · h_cloud 850→1100 (14.7d)
   art_moons 900→1150 (15.3d) · rug_sheep 900→1150 (15.3d) · w_clouds 900→1150 (15.3d) · h_lantern 1500→1900 (25.3d)
   lamp_stone 1600→2000 (26.7d) · h_wizard 1800→2250 (30.0d) · rug_star 1800→2250 (30.0d) · w_honey 1800→2250 (30.0d)
   h_cupcake 1900→2400 (32.0d) · w_mush 2000→2500 (33.3d) · h_halo 2200→2750 (36.7d) · lamp_jelly 2200→2750 (36.7d)
   w_books 2300→2900 (38.7d) · shelf_potions 2400→3000 (40.0d) · h_crown 2500→3200 (42.7d) · h_dragon 2600→3300 (44.0d)
   star_scope 2800→3500 (46.7d) · tree_lights 4500→5700 (76.0d) · w_moon 4500→5700 (76.0d) · plant_cherry 4800→6000 (80.0d)
   w_aurora 5000→6300 (84.0d) · h_tiara 5500→6900 (92.0d) · h_starcrown 8000→10000 (133.3d) · ceil_stars 10000→12500 (166.7d)
   Oggetti nuovi "di tutti i giorni" (almeno uno accessibile in ogni gruppo che non l'aveva più):
     lamp_candle (luci) 100 (1.3d) · cushion_floor (pavimento) 100 (1.3d) · garland_paper (soffitto / pareti) 110 (1.5d)

   Cosa si vede nel negozio: prezzo in una pastiglia verde se te lo puoi permettere ora; prezzo spento + "ne mancano N"
   se no. Colori in variabili CSS (--afford-*, --unafford-*) in 11e_v20_econ.css, per sistemarli in un posto solo.

   Scappatoie chiuse: togliere e rimettere un obiettivo · "Salva" che riempiva l'energia · regalo toccato più volte ·
   "Fallo tornare subito (solo nella prova)" · rito della sera senza bonus Plus e trofei · copie con numeri inventati ·
   giorni di riposo illimitati (ora 1 a settimana) · orologio spostato indietro (non ridà i premi di un giorno già fatto).
   Stato nuovo: S.v20econ (vedi econ()). */

/* ================================================================================================================
   1) COSTANTI
   ================================================================================================================ */
const EC = {
  GOAL: 5, ALL: 10, LEVEL: 15,
  /* 1.0.9: tutti i viaggi danno 10 Tanì (prima i mondi lontani 12-18). I mondi lontani danno piu' punti, cartoline e pagine
     d'album nuove. Insieme al sentiero sempre attivo, il guadagno tipico a regime torna nella fascia 70-90 (t38_econ). */
  TRIP: 10, WORLD_TANI: [10, 10, 10, 10, 10, 10, 10, 10, 10],
  GIFT_BASE: 4, GIFT_STEP: 2, GIFT_DAYS: 7,              /* regalo = 4 + 2 × min(giorni di fila, 7): 6, 8, … 18 */
  GAME_CAP: 10, GAME_MULT: 0.5,                          /* tetto giornaliero dei giochi; Tanì = punti × 0,5 (almeno 1) */
  WEEK: 50,
  TROPHY: [15, 25, 50, 80, 120, 160, 200, 320, 480],
  STAMPS: [[5, 10], [10, 20], [20, 35]],
  PAGE_BASE: 40, PAGE_STEP: 5,                           /* 1.0.9: pagine dei mondi 40, 45, 50… (prima +10 a pagina) */
  PAGE_REAL: 60, PAGE_WORLD: 120, ALBUM: 400,
  PASS_FREE_DEF: 10, PASS_FREE: { 25: 80, 40: 130, 45: 100 },
  PASS_GOLD_DEF: 20, PASS_GOLD: { 1: 50, 15: 100, 30: 200, 35: 130, 45: 170 },
  /* 1.0.9: Stagione delle Stelle e i suoi ritorni (il sentiero che c'e' sempre): tappe normali 5 / 10 Tanì,
     oggetto gia' tuo in una stagione che ritorna = 60 / 100 Tanì. Le tappe speciali sono in SEA_REW (97c). */
  PASS_STARS: { f: 5, g: 10, own: [60, 100] },
  SP_GOAL: 7, SP_DAY: 12, SP_WEEK: 60, SP_FESTA: 2,      /* Scintille; SP_FESTA = 2 perché i testi dicono "il doppio" */
  /* 1.0.9 (fase 2, critica dell'economia): niente +30% sugli obiettivi; con Plus il regalo del giorno vale il triplo
     (Plus non ha video: cosi' chi paga non va piu' lento di chi guarda 2 video al giorno, e non supera chi ne guarda 5) */
  PLUS_MONTH: 750, PLUS_PCT: 0, PLUS_GIFT_MULT: 3, /* 1.0.9 fase 3: regalo del mese x5 come i pacchetti (150 -> 750) */
  BACK: 10, WELCOME: 50, SURVEY: 30, EVENT_AGAIN: 20,
  REST_PER_WEEK: 1,
  TYPICAL_DAY: 75,                                       /* "giorno tipico" usato per le fasce di prezzo */
  /* Copie e trasferimenti: tetto di plausibilità dei Tanì (calcolato con l'economia vecchia, più generosa, per non
     toccare mai una copia vera): base + per ogni giorno con attività + per ogni pacchetto comprato */
  IMPORT_BASE: 3000, IMPORT_PER_DAY: 800, IMPORT_PER_PACK: 12000
};
/* Prezzi: [vecchio, nuovo]. Solo gli oggetti di questa lista cambiano prezzo (quelli di altri file nuovi restano come sono). */
const EC_PRICE = {
  blue: [80, 100], plant: [80, 100], red: [80, 100], frame: [100, 125], w_sage: [100, 125], curt_green: [120, 150],
  rug: [120, 150], green: [150, 190], pink: [150, 190], violet: [150, 190], h_bow: [160, 200], cactus: [180, 225],
  curt_blue: [180, 225], h_party: [180, 225], shelf: [180, 225], books: [200, 250], h_flower: [200, 250], lamp: [200, 250],
  w_lilac: [200, 250], w_mint: [200, 250], w_peach: [200, 250], w_rose: [200, 250], w_sky: [200, 250], pouf: [220, 275],
  sunflower: [220, 275], w_dots: [220, 275], yarn: [220, 275], clock: [250, 325], curt_lace: [250, 325], w_hearts: [260, 325],
  plant_lavender: [280, 350], h_bear: [300, 375], lights: [300, 375], rug_blue: [300, 375], garland_flowers: [350, 450], bunting: [500, 625],
  monstera: [500, 625], h_chef: [550, 700], poster: [550, 700], curt_night: [600, 750], h_frog: [600, 750], h_nightcap: [600, 750],
  lamp_lava: [600, 750], w_check: [600, 750], h_bunny: [650, 825], h_sailor: [650, 825], lanterns: [650, 825], rug_cloud: [650, 825],
  w_flowers: [650, 825], h_mush: [700, 875], lamp_tulip: [700, 875], mirror: [700, 875], rug_rainbow: [700, 875], w_waves: [700, 875],
  h_strawberry: [750, 950], lamp_moon: [750, 950], pillows: [750, 950], w_wood: [750, 950], art_dreamcatcher: [800, 1000], h_phones: [800, 1000],
  shelf_crystals: [800, 1000], w_candy: [800, 1000], guitar: [850, 1100], h_cloud: [850, 1100], art_moons: [900, 1150], rug_sheep: [900, 1150],
  w_clouds: [900, 1150], h_lantern: [1500, 1900], lamp_stone: [1600, 2000], h_wizard: [1800, 2250], rug_star: [1800, 2250], w_honey: [1800, 2250],
  h_cupcake: [1900, 2400], w_mush: [2000, 2500], h_halo: [2200, 2750], lamp_jelly: [2200, 2750], w_books: [2300, 2900], shelf_potions: [2400, 3000],
  h_crown: [2500, 3200], h_dragon: [2600, 3300], star_scope: [2800, 3500], tree_lights: [4500, 5700], w_moon: [4500, 5700], plant_cherry: [4800, 6000],
  w_aurora: [5000, 6300], h_tiara: [5500, 6900], h_starcrown: [8000, 10000], ceil_stars: [10000, 12500]
};
/* Oggetti nuovi di tutti i giorni (rarità "base") */
const EC_NEW_ITEMS = [
  { id: "lamp_candle", kind: "furn", price: 100, rar: "b", slot: "lamp", group: "lights", vb: "16 194 58 76" },
  { id: "cushion_floor", kind: "furn", price: 100, rar: "b", slot: "floorL", group: "floor", vb: "66 236 62 38" },
  { id: "garland_paper", kind: "furn", price: 110, rar: "b", slot: "ceiling", group: "walldeco", vb: "162 4 100 40" }
];

/* ================================================================================================================
   2) TESTI NUOVI (14 lingue)
   ================================================================================================================ */
const ECT = {
  it: { already: "L'avevi già fatto oggi: è di nuovo segnato.", miss: (n) => `ne mancano ${n}`,
    restWeek: "Hai un giorno di riposo a settimana.", restUsed: "Il riposo di questa settimana l'hai già preso. Il prossimo da lunedì.",
    how: (g, f, w) => `Guadagni Scintille solo prendendoti cura di te: ${g} per ogni obiettivo, ${f} per ogni giornata completa, ${w} per ogni sfida della settimana. Nella settimana di festa (dal 1° al 7 di ogni mese) obiettivi e giornate complete valgono il doppio.`,
    festaP: "Settimana di festa: obiettivi e giornate complete danno Scintille doppie!",
    perkColl: "Una collezione esclusiva di vestiti e arredi", collP: "Oggetti esclusivi di Tanetto Plus: con Plus li prendi gratis e restano tuoi.",
    guidePath: "Durante la stagione c'è il sentiero: prenditi cura di te, raccogli Scintille e vinci oggetti speciali, anche un cappello per il tuo compagno.",
    enough: { b: "Basta per qualsiasi oggetto base", c: "Basta per qualsiasi oggetto comune", r: "Basta per qualsiasi oggetto raro", e: "Basta per qualsiasi oggetto epico", l: "Basta per qualsiasi oggetto leggendario" },
    importFixed: "Alcuni numeri della copia sembravano strani: li abbiamo sistemati.",
    items: { lamp_candle: "Candelina", cushion_floor: "Cuscino da terra", garland_paper: "Ghirlanda di carta" } },
  en: { already: "You'd already done this today: it's ticked again.", miss: (n) => `${n} to go`,
    restWeek: "You get one rest day each week.", restUsed: "You've had this week's rest day. The next one comes on Monday.",
    how: (g, f, w) => `You earn Sparks only by taking care of yourself: ${g} for each goal, ${f} for each complete day, ${w} for each weekly challenge. During festival week (the 1st to the 7th of each month), goals and complete days count double.`,
    festaP: "Festival week: goals and complete days give double Sparks!",
    perkColl: "An exclusive collection of outfits and decor", collP: "Exclusive Tanetto Plus items: free with Plus, and yours to keep.",
    guidePath: "During the season there's the path: take care of yourself, collect Sparks and win special items, including a hat for your companion.",
    enough: { b: "Enough for any basic item", c: "Enough for any common item", r: "Enough for any rare item", e: "Enough for any epic item", l: "Enough for any legendary item" },
    importFixed: "Some numbers in the backup looked odd, so they've been tidied up.",
    items: { lamp_candle: "Little candle", cushion_floor: "Floor cushion", garland_paper: "Paper garland" } },
  de: { already: "Das hattest du heute schon geschafft: Es ist wieder abgehakt.", miss: (n) => `noch ${n}`,
    restWeek: "Du hast einen Ruhetag pro Woche.", restUsed: "Den Ruhetag dieser Woche hast du schon genommen. Der nächste kommt am Montag.",
    how: (g, f, w) => `Fünkchen sammelst du nur, indem du gut für dich sorgst: ${g} für jedes Ziel, ${f} für jeden vollen Tag, ${w} für jede Wochenaufgabe. In der Festwoche (vom 1. bis 7. jedes Monats) zählen Ziele und volle Tage doppelt.`,
    festaP: "Festwoche: Ziele und volle Tage bringen doppelte Fünkchen!",
    perkColl: "Eine exklusive Kollektion mit Kleidung und Deko", collP: "Exklusive Gegenstände von Tanetto Plus: mit Plus gratis, und sie bleiben deine.",
    guidePath: "In der Saison gibt es den Pfad: Sorg gut für dich, sammle Fünkchen und gewinne besondere Gegenstände, auch eine Mütze für deinen Begleiter.",
    enough: { b: "Reicht für jeden Basis-Gegenstand", c: "Reicht für jeden gewöhnlichen Gegenstand", r: "Reicht für jeden seltenen Gegenstand", e: "Reicht für jeden epischen Gegenstand", l: "Reicht für jeden legendären Gegenstand" },
    importFixed: "Einige Zahlen in der Sicherung sahen seltsam aus, deshalb wurden sie angepasst.",
    items: { lamp_candle: "Kleine Kerze", cushion_floor: "Bodenkissen", garland_paper: "Papiergirlande" } },
  es: { already: "Ya lo habías hecho hoy: vuelve a estar marcado.", miss: (n) => `faltan ${n}`,
    restWeek: "Tienes un día de descanso por semana.", restUsed: "Ya tomaste el descanso de esta semana. El próximo llega el lunes.",
    how: (g, f, w) => `Ganas Chispas solo cuidándote: ${g} por cada objetivo, ${f} por cada día completo y ${w} por cada reto semanal. En la semana de fiesta (del 1 al 7 de cada mes), los objetivos y los días completos valen el doble.`,
    festaP: "Semana de fiesta: ¡los objetivos y los días completos dan Chispas dobles!",
    perkColl: "Una colección exclusiva de ropa y decoración", collP: "Objetos exclusivos de Tanetto Plus: gratis con Plus y tuyos para siempre.",
    guidePath: "Durante la temporada está el sendero: cuídate, reúne Chispas y gana objetos especiales, también un gorro para tu compañero.",
    enough: { b: "Suficiente para cualquier objeto básico", c: "Suficiente para cualquier objeto común", r: "Suficiente para cualquier objeto raro", e: "Suficiente para cualquier objeto épico", l: "Suficiente para cualquier objeto legendario" },
    importFixed: "Algunos números de la copia parecían raros, así que se han ajustado.",
    items: { lamp_candle: "Velita", cushion_floor: "Cojín de suelo", garland_paper: "Guirnalda de papel" } },
  fr: { already: "Tu l'avais déjà fait aujourd'hui : c'est de nouveau coché.", miss: (n) => `encore ${n}`,
    restWeek: "Tu as droit à un jour de repos par semaine.", restUsed: "Tu as déjà pris le repos de cette semaine. Le prochain arrive lundi.",
    how: (g, f, w) => `Tu gagnes des Étincelles uniquement en prenant soin de toi : ${g} par objectif, ${f} par journée complète, ${w} par défi de la semaine. Pendant la semaine de fête (du 1er au 7 de chaque mois), les objectifs et les journées complètes comptent double.`,
    festaP: "Semaine de fête : les objectifs et les journées complètes donnent des Étincelles doubles !",
    perkColl: "Une collection exclusive de tenues et de déco", collP: "Objets exclusifs Tanetto Plus : gratuits avec Plus, et ils restent à toi.",
    guidePath: "Pendant la saison, il y a le sentier : prends soin de toi, gagne des Étincelles et remporte des objets spéciaux, dont un bonnet pour ton compagnon.",
    enough: { b: "Assez pour n'importe quel objet basique", c: "Assez pour n'importe quel objet commun", r: "Assez pour n'importe quel objet rare", e: "Assez pour n'importe quel objet épique", l: "Assez pour n'importe quel objet légendaire" },
    importFixed: "Certains chiffres de la sauvegarde semblaient bizarres : ils ont été corrigés.",
    items: { lamp_candle: "Petite bougie", cushion_floor: "Coussin de sol", garland_paper: "Guirlande en papier" } },
  pt: { already: "Você já tinha feito isso hoje: está marcado de novo.", miss: (n) => `faltam ${n}`,
    restWeek: "Você tem um dia de descanso por semana.", restUsed: "Você já usou o descanso desta semana. O próximo chega na segunda-feira.",
    how: (g, f, w) => `Você ganha Faíscas só cuidando de si: ${g} por meta, ${f} por dia completo, ${w} por desafio da semana. Na semana de festa (do dia 1 ao 7 de cada mês), metas e dias completos valem o dobro.`,
    festaP: "Semana de festa: metas e dias completos dão Faíscas em dobro!",
    perkColl: "Uma coleção exclusiva de roupas e decoração", collP: "Itens exclusivos do Tanetto Plus: grátis com o Plus e seus para sempre.",
    guidePath: "Durante a temporada tem o caminho: cuide de si, junte Faíscas e ganhe itens especiais, inclusive um gorro para o seu companheiro.",
    enough: { b: "Dá para qualquer item básico", c: "Dá para qualquer item comum", r: "Dá para qualquer item raro", e: "Dá para qualquer item épico", l: "Dá para qualquer item lendário" },
    importFixed: "Alguns números da cópia pareciam estranhos, então foram ajustados.",
    items: { lamp_candle: "Velinha", cushion_floor: "Almofada de chão", garland_paper: "Guirlanda de papel" } },
  ja: { already: "今日はもう達成していたので、もう一度チェックしました。", miss: (n) => `あと${n}`,
    restWeek: "おやすみの日は週に1回使えます。", restUsed: "今週のおやすみの日はもう使いました。次は月曜日からです。",
    how: (g, f, w) => `キラは、自分を大切にしたときだけたまります。目標1つで${g}キラ、1日ぜんぶ達成で${f}キラ、今週のチャレンジ1つで${w}キラ。お祭りの週（毎月1日〜7日）は、目標と1日ぜんぶ達成のキラが2倍になります。`,
    festaP: "お祭りの週：目標と1日ぜんぶ達成のキラが2倍！",
    perkColl: "服やインテリアの限定コレクション", collP: "Tanetto Plus限定アイテム。Plusなら無料で、ずっとあなたのものです。",
    guidePath: "シーズン中は小道があります。自分を大切にしてキラを集めると、パートナー用の帽子など特別なアイテムがもらえます。",
    enough: { b: "どのベーシックアイテムも買えます", c: "どのコモンアイテムも買えます", r: "どのレアアイテムも買えます", e: "どのエピックアイテムも買えます", l: "どのレジェンドアイテムも買えます" },
    importFixed: "バックアップの一部の数値がおかしかったため、調整しました。",
    items: { lamp_candle: "小さなキャンドル", cushion_floor: "床クッション", garland_paper: "紙のガーランド" } },
  ko: { already: "오늘 이미 해낸 목표라 다시 체크해 두었어요.", miss: (n) => `${n} 더 필요`,
    restWeek: "쉬는 날은 일주일에 한 번 쓸 수 있어요.", restUsed: "이번 주 쉬는 날은 이미 썼어요. 다음 쉬는 날은 월요일부터예요.",
    how: (g, f, w) => `반짝이를 모으는 방법은 나를 돌보는 것뿐이에요. 목표 하나에 ${g}개, 하루 목표를 모두 해내면 ${f}개, 주간 챌린지 하나에 ${w}개. 축제 주간(매달 1일~7일)에는 목표와 하루 완료 반짝이가 두 배예요.`,
    festaP: "축제 주간: 목표와 하루 완료 반짝이가 두 배!",
    perkColl: "옷과 인테리어 한정 컬렉션", collP: "Tanetto Plus 한정 아이템이에요. Plus라면 무료로 받고 계속 가질 수 있어요.",
    guidePath: "시즌 동안에는 오솔길이 있어요. 나를 돌보며 반짝이를 모으면 친구에게 줄 모자 같은 특별한 아이템을 받아요.",
    enough: { b: "어떤 기본 아이템이든 살 수 있어요", c: "어떤 일반 아이템이든 살 수 있어요", r: "어떤 레어 아이템이든 살 수 있어요", e: "어떤 에픽 아이템이든 살 수 있어요", l: "어떤 전설 아이템이든 살 수 있어요" },
    importFixed: "백업의 일부 숫자가 이상해서 조정했어요.",
    items: { lamp_candle: "작은 양초", cushion_floor: "바닥 쿠션", garland_paper: "종이 가랜드" } },
  zh: { already: "今天已经完成过了，已重新打勾。", miss: (n) => `还差 ${n}`,
    restWeek: "每周可以休息一天。", restUsed: "本周的休息日已经用过了，下一次从星期一开始。",
    how: (g, f, w) => `只有好好照顾自己才能获得火花：每完成 1 个目标得 ${g} 火花，每完成一整天的目标得 ${f} 火花，每完成 1 个每周挑战得 ${w} 火花。庆典周（每月 1 日至 7 日）期间，目标和全天完成的火花翻倍。`,
    festaP: "庆典周：目标和全天完成的火花翻倍！",
    perkColl: "服装和家居的专属收藏", collP: "Tanetto Plus 专属物品：Plus 会员免费领取，永久归你。",
    guidePath: "季节期间有一条小路：好好照顾自己、收集火花，就能赢得特别物品，还有给小伙伴的帽子。",
    enough: { b: "任意一件基础物品都够买", c: "任意一件普通物品都够买", r: "任意一件稀有物品都够买", e: "任意一件史诗物品都够买", l: "任意一件传说物品都够买" },
    importFixed: "备份中有些数字看起来不对，已为你调整。",
    items: { lamp_candle: "小蜡烛", cushion_floor: "坐垫", garland_paper: "纸花环" } },
  zht: { already: "今天已經完成過了，已重新打勾。", miss: (n) => `還差 ${n}`,
    restWeek: "每週可以休息一天。", restUsed: "本週的休息日已經用過了，下一次從星期一開始。",
    how: (g, f, w) => `只有好好照顧自己才能獲得火花：每完成 1 個目標得 ${g} 火花，每完成一整天的目標得 ${f} 火花，每完成 1 個每週挑戰得 ${w} 火花。祭典週（每月 1 日至 7 日）期間，目標和整天完成的火花加倍。`,
    festaP: "祭典週：目標和整天完成的火花加倍！",
    perkColl: "服裝和家居的專屬收藏", collP: "Tanetto Plus 專屬物品：Plus 會員免費領取，永遠屬於你。",
    guidePath: "季節期間有一條小路：好好照顧自己、收集火花，就能贏得特別物品，還有給小夥伴的帽子。",
    enough: { b: "任何一件基本物品都夠買", c: "任何一件普通物品都夠買", r: "任何一件稀有物品都夠買", e: "任何一件史詩物品都夠買", l: "任何一件傳說物品都夠買" },
    importFixed: "備份中有些數字看起來不對，已為你調整。",
    items: { lamp_candle: "小蠟燭", cushion_floor: "坐墊", garland_paper: "紙花環" } },
  ru: { already: "Это уже было сделано сегодня — отметка снова на месте.", miss: (n) => `ещё ${n}`,
    restWeek: "Один день отдыха в неделю — твой.", restUsed: "День отдыха на этой неделе уже был. Следующий — с понедельника.",
    how: (g, f, w) => `Искорки можно получить, только заботясь о себе: ${g} за каждую цель, ${f} за каждый полностью выполненный день, ${w} за каждое испытание недели. В праздничную неделю (с 1 по 7 число каждого месяца) цели и полные дни приносят вдвое больше.`,
    festaP: "Праздничная неделя: цели и полные дни приносят вдвое больше искорок!",
    perkColl: "Эксклюзивная коллекция одежды и декора", collP: "Эксклюзивные предметы Tanetto Plus: с Plus бесплатно, и они останутся у тебя.",
    guidePath: "Во время сезона есть тропинка: заботься о себе, собирай искорки и получай особые предметы, в том числе шапочку для питомца.",
    enough: { b: "Хватит на любой базовый предмет", c: "Хватит на любой обычный предмет", r: "Хватит на любой редкий предмет", e: "Хватит на любой эпический предмет", l: "Хватит на любой легендарный предмет" },
    importFixed: "Некоторые числа в копии выглядели странно, поэтому их поправили.",
    items: { lamp_candle: "Маленькая свечка", cushion_floor: "Напольная подушка", garland_paper: "Бумажная гирлянда" } },
  pl: { already: "To już było zrobione dzisiaj — znów jest odhaczone.", miss: (n) => `brakuje ${n}`,
    restWeek: "Masz jeden dzień odpoczynku w tygodniu.", restUsed: "Dzień odpoczynku w tym tygodniu już był. Kolejny od poniedziałku.",
    how: (g, f, w) => `Iskierki zdobywasz tylko wtedy, gdy dbasz o siebie: ${g} za każdy cel, ${f} za każdy pełny dzień, ${w} za każde wyzwanie tygodnia. W tygodniu święta (od 1. do 7. dnia każdego miesiąca) cele i pełne dni liczą się podwójnie.`,
    festaP: "Tydzień święta: cele i pełne dni dają podwójne Iskierki!",
    perkColl: "Wyjątkowa kolekcja ubranek i dekoracji", collP: "Wyjątkowe przedmioty Tanetto Plus: z Plus za darmo i zostają z tobą na zawsze.",
    guidePath: "W trakcie sezonu jest ścieżka: dbaj o siebie, zbieraj Iskierki i zdobywaj wyjątkowe przedmioty, także czapkę dla towarzysza.",
    enough: { b: "Wystarczy na dowolny podstawowy przedmiot", c: "Wystarczy na dowolny zwykły przedmiot", r: "Wystarczy na dowolny rzadki przedmiot", e: "Wystarczy na dowolny epicki przedmiot", l: "Wystarczy na dowolny legendarny przedmiot" },
    importFixed: "Niektóre liczby w kopii wyglądały dziwnie, więc zostały poprawione.",
    items: { lamp_candle: "Mała świeczka", cushion_floor: "Poduszka na podłogę", garland_paper: "Papierowa girlanda" } },
  nl: { already: "Dit had je vandaag al gedaan: het staat weer afgevinkt.", miss: (n) => `nog ${n}`,
    restWeek: "Je hebt één rustdag per week.", restUsed: "De rustdag van deze week heb je al gehad. De volgende komt maandag.",
    how: (g, f, w) => `Je verdient Vonkjes alleen door goed voor jezelf te zorgen: ${g} per doel, ${f} per volledige dag, ${w} per weekuitdaging. In de feestweek (van de 1e tot de 7e van elke maand) tellen doelen en volledige dagen dubbel.`,
    festaP: "Feestweek: doelen en volledige dagen geven dubbele Vonkjes!",
    perkColl: "Een exclusieve collectie met outfits en decoratie", collP: "Exclusieve Tanetto Plus-spulletjes: gratis met Plus, en ze blijven van jou.",
    guidePath: "Tijdens het seizoen is er het pad: zorg goed voor jezelf, verzamel Vonkjes en win speciale spulletjes, ook een muts voor je maatje.",
    enough: { b: "Genoeg voor elk basisvoorwerp", c: "Genoeg voor elk gewoon voorwerp", r: "Genoeg voor elk zeldzaam voorwerp", e: "Genoeg voor elk episch voorwerp", l: "Genoeg voor elk legendarisch voorwerp" },
    importFixed: "Sommige getallen in de back-up zagen er vreemd uit, dus die zijn aangepast.",
    items: { lamp_candle: "Kaarsje", cushion_floor: "Vloerkussen", garland_paper: "Papieren slinger" } },
  tr: { already: "Bunu bugün zaten yapmıştın: yeniden işaretlendi.", miss: (n) => `${n} eksik`,
    restWeek: "Her hafta bir dinlenme günün var.", restUsed: "Bu haftanın dinlenme gününü kullandın. Bir sonraki pazartesi geliyor.",
    how: (g, f, w) => `Kıvılcımları sadece kendine bakarak kazanırsın: her hedef için ${g}, her tam gün için ${f}, her haftalık görev için ${w}. Şenlik haftasında (her ayın 1'i ile 7'si arası) hedefler ve tam günler iki kat değerlidir.`,
    festaP: "Şenlik haftası: hedefler ve tam günler iki kat Kıvılcım getirir!",
    perkColl: "Özel bir kıyafet ve dekor koleksiyonu", collP: "Tanetto Plus'a özel eşyalar: Plus ile ücretsiz, hep senin kalır.",
    guidePath: "Sezon boyunca bir patika var: kendine iyi bak, Kıvılcım topla ve arkadaşın için bir şapka dahil özel eşyalar kazan.",
    enough: { b: "Herhangi bir temel eşyaya yeter", c: "Herhangi bir sıradan eşyaya yeter", r: "Herhangi bir nadir eşyaya yeter", e: "Herhangi bir epik eşyaya yeter", l: "Herhangi bir efsanevi eşyaya yeter" },
    importFixed: "Yedekteki bazı sayılar tuhaf görünüyordu, bu yüzden düzeltildi.",
    items: { lamp_candle: "Küçük mum", cushion_floor: "Yer minderi", garland_paper: "Kağıt süs zinciri" } }
};
const ect = () => ECT[S.lang] || ECT.en;

/* ================================================================================================================
   3) STATO: S.v20econ (premi già dati per giorno, giorno più avanti visto, migrazione del sentiero…)
   ================================================================================================================ */
const EC_KEEP_DAYS = 45;
function econ() {
  let e = S.v20econ;
  if (!e || typeof e !== "object" || Array.isArray(e)) e = S.v20econ = {};
  if (!e.v) e.v = 1;
  if (!e.since) e.since = dkey();
  ["rw", "all", "gt", "pb", "ads", "games", "pass"].forEach((k) => { if (!e[k] || typeof e[k] !== "object" || Array.isArray(e[k])) e[k] = {}; });
  ["gifts", "trips"].forEach((k) => { if (!Array.isArray(e[k])) e[k] = []; });
  /* giorno più avanti visto: all'inizio è l'ultima visita (non oggi), così "bentornato" funziona già al primo avvio */
  if (typeof e.maxDay !== "string") { const lv = S.visit && typeof S.visit.last === "string" ? S.visit.last : null; e.maxDay = lv && lv <= dkey() ? lv : (typeof S.day === "string" && S.day <= dkey() ? S.day : dkey()); }
  return e;
}
function econPrune() {
  const e = econ(); const lim = new Date(); lim.setDate(lim.getDate() - EC_KEEP_DAYS); const lk = dkey(lim);
  ["rw", "all", "gt", "pb", "ads", "games"].forEach((k) => Object.keys(e[k]).forEach((d) => { if (d < lk) delete e[k][d]; }));
  e.gifts = e.gifts.filter((d) => d >= lk).slice(-EC_KEEP_DAYS); e.trips = e.trips.filter((d) => d >= lk).slice(-EC_KEEP_DAYS);
}
const ecPush = (arr, v) => { if (!arr.includes(v)) arr.push(v); };
let ecFly = null, ecLastLvl = 0;
/* Il numero dei Tanì in alto segue il valore giusto anche quando un premio viene corretto subito dopo */
function econShow() {
  const el = document.getElementById("seedN");
  if (el) { const from = parseInt(String(el.textContent).replace(/\D/g, ""), 10); countUp(el, isNaN(from) ? null : from, S.seeds); }
  lastSeeds = S.seeds;
}
countUp = function (el, from, to) {
  if (el && el._ecTw) { try { el._ecTw.kill(); } catch (e) { /* niente */ } el._ecTw = null; }
  /* 1.0.8: numeri nel formato della lingua (12.345 in italiano), come i prezzi del negozio */
  const nf = (n) => { try { return Math.round(n).toLocaleString(loc(), NUMG); } catch (e) { return String(Math.round(n)); } };
  if (!el || from == null || from === to || !anim) { if (el) el.textContent = nf(to); return; }
  const o = { v: from }; el.textContent = nf(from);
  el._ecTw = G.to(o, { v: to, duration: Math.min(1.2, 0.4 + Math.abs(to - from) / 80), ease: "power2.out", onUpdate: () => { el.textContent = nf(o.v); }, onComplete: () => { el._ecTw = null; el.textContent = nf(to); } });
  const p = document.getElementById("seedPill"); if (p) G.fromTo(p, { scale: 1.2 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, .4)" });
};
const econGift = (n) => EC.GIFT_BASE + EC.GIFT_STEP * Math.min(Math.max(n || 1, 1), EC.GIFT_DAYS);
/* regalo del giorno davvero dato: con Plus vale EC.PLUS_GIFT_MULT volte (i video, che Plus non ha, usano econGift) */
const econGiftDay = (n) => econGift(n) * (plusActive() ? EC.PLUS_GIFT_MULT : 1);
const econPageTani = (p) => (!p ? 0 : p.world ? EC.PAGE_WORLD : p.real ? EC.PAGE_REAL : EC.PAGE_BASE + EC.PAGE_STEP * p.tier);
/* viaggio partito oggi: registro nostro + quello dei viaggi (98c_v20_trips: S.v20trip) */
const econTripToday = () => econ().trips.includes(S.day) || !!(S.v20trip && S.v20trip.day === S.day);

/* ================================================================================================================
   4) GUADAGNI
   ================================================================================================================ */
/* 4a) Array e oggetti "const" dei file vecchi: il contenuto si può cambiare */
V19W_TANI.splice(0, V19W_TANI.length, ...EC.WORLD_TANI);
STAMPS.splice(0, STAMPS.length, ...EC.STAMPS.map((x) => x.slice()));
TROPHY_TANI.splice(0, TROPHY_TANI.length, ...EC.TROPHY);
Object.keys(SFREE).forEach((k) => { if (SFREE[k].tani) SFREE[k].tani = EC.PASS_FREE[k] || EC.PASS_FREE_DEF; });
Object.keys(SGOLD).forEach((k) => { if (SGOLD[k].tani) SGOLD[k].tani = EC.PASS_GOLD[k] || EC.PASS_GOLD_DEF; });
SEA_DEF.f = EC.PASS_FREE_DEF; SEA_DEF.g = EC.PASS_GOLD_DEF;
SEA_REW.stars.def = { f: EC.PASS_STARS.f, g: EC.PASS_STARS.g }; SEA_REW.stars.own = EC.PASS_STARS.own.slice();
/* 1.0.9 (fase 2): la Stagione degli Aquiloni (e i suoi ritorni) ha le stesse tappe normali delle Stelle */
SEA_REW.kites.def = { f: EC.PASS_STARS.f, g: EC.PASS_STARS.g }; SEA_REW.kites.own = EC.PASS_STARS.own.slice(); /* 1.0.9: i premi speciali sono per tipo di stagione (SEA_REW, 97c) */

/* 4b) Livelli: 15 Tanì per livello, per tutti */
const _addXpE = addXp;
addXp = function (n) {
  const b = S.seeds; const up = _addXpE(n);
  if (up > 0) { S.seeds = b + up * EC.LEVEL; ecLastLvl = up * EC.LEVEL; }
  return up;
};

/* 4c) Obiettivi: 5 Tanì, +10 la prima volta che il giorno è completo, bonus Plus +30% sul totale degli obiettivi del giorno.
       Un obiettivo già premiato oggi (tolto e rimesso, o con l'orologio spostato) torna spuntato senza premi nuovi. */
function econGoalSnap(g) {
  const tg = todayGoals();
  return { g, seeds: S.seeds, level: S.level, had: S.done.includes(g), logN: (S.log || []).length, wasAll: tg.length > 0 && tg.every((x) => S.done.includes(x)), day: S.day };
}
function econGoalSettle(sn, oldCoreTani) {
  const e = econ(); const d = sn.day; const g = sn.g;
  const ticked = !sn.had && S.done.includes(g) && (S.log || []).length > sn.logN;
  if (!ticked) return false;
  e.rw[d] = e.rw[d] || []; ecPush(e.rw[d], g);
  const tg = todayGoals(); const allNow = tg.length > 0 && tg.every((x) => S.done.includes(x));
  const allNew = allNow && !sn.wasAll && !e.all[d]; if (allNew) e.all[d] = 1;
  const goalT = EC.GOAL + (allNew ? EC.ALL : 0);
  e.gt[d] = (e.gt[d] || 0) + goalT;
  let plusB = 0;
  if (plusActive()) { plusB = Math.max(0, Math.floor(e.gt[d] * EC.PLUS_PCT) - (e.pb[d] || 0)); e.pb[d] = (e.pb[d] || 0) + plusB; }
  const lv = Math.max(0, S.level - sn.level) * EC.LEVEL;
  /* se un altro file ha aggiunto Tanì suoi durante l'obiettivo, restano */
  const surplus = oldCoreTani == null ? 0 : Math.max(0, (S.seeds - sn.seeds) - oldCoreTani);
  S.seeds = sn.seeds + goalT + plusB + lv + surplus;
  ecFly = goalT + plusB;
  save(); econShow();
  return true;
}
function econAlreadyRewarded(g) {
  const e = econ();
  return !!(S.pet && !S.away && S.day === dkey() && todayGoals().includes(g) && !S.done.includes(g) && (e.rw[S.day] || []).includes(g));
}
function econMarkDoneAgain(g) {
  S.done.push(g); const tg = todayGoals(); const r = dayRec(); r.done = S.done.filter((x) => tg.includes(x)).length;
  if (!S.away && !econTripToday()) S.energy = tg.length && tg.every((x) => S.done.includes(x)) ? 100 : Math.min(100, (r.done / Math.max(1, tg.length)) * 100);
  save();
}
const _completeGoalE = completeGoal;
completeGoal = function (g, rect) {
  if (econAlreadyRewarded(g)) { econMarkDoneAgain(g); const y = window.scrollY; render(); window.scrollTo(0, y); toast(ect().already);
    /* 1.0.9: anche la spunta rimessa (gia' premiata oggi) ha il suo gesto e la sua nota del logo */
    try { const tg = todayGoals(), k = S.done.filter((x) => tg.includes(x)).length; SND.logoTick(k); if (tg.length && tg.every((x) => S.done.includes(x))) SND.logoChime(0.32); popTick(g); } catch (e) { /* niente */ }
    return; }
  const sn = econGoalSnap(g); const plus = plusActive();
  _completeGoalE(g, rect);
  if (S.done.includes(g) && !sn.had) {
    const tg = todayGoals(); const allNow = tg.every((x) => S.done.includes(x));
    const D = SEEDS_GOAL + (allNow ? SEEDS_ALL : 0) + Math.max(0, S.level - sn.level) * EC.LEVEL;
    econGoalSettle(sn, D + (plus ? Math.round(D * 0.5) : 0));
  }
};
/* "+10" che vola verso il contatore dei Tanì */
const _flySeedE = flySeed;
flySeed = function (rect, amount) { const n = ecFly != null ? ecFly : amount; ecFly = null; return _flySeedE(rect, n); };
/* La riga dell'obiettivo mostra il premio vero */
const _goalRowE = goalRow;
goalRow = function (g) { return _goalRowE(g).replace(`<span class="rw">+${SEEDS_GOAL} `, `<span class="rw">+${EC.GOAL} `); };

/* 4d) Rito della sera (e altri obiettivi "in sospeso" silenziosi): stessa strada degli obiettivi normali
       (bonus Plus, livello 2 del primo giorno, trofei, rientro), prima mancava tutto questo */
function econSoftGoal(g) {
  if (S.done.includes(g) || S.away || !todayGoals().includes(g) || (S.pet && S.day !== dkey())) return;
  if (econAlreadyRewarded(g)) { econMarkDoneAgain(g); render(); return; }
  const sn = econGoalSnap(g); const streak0 = streak();
  S.done.push(g); (S.log = S.log || []).push({ d: dkey(), g }); if (S.log.length > 4000) S.log.shift();
  const tg = todayGoals(); const r = dayRec(); r.done = S.done.filter((x) => tg.includes(x)).length;
  S.energy = Math.min(100, S.energy + 100 / Math.max(1, tg.length) + 0.001);
  seasonState(); S.season.n++;
  const prev = S.level; addXp(XP_GOAL);
  const all = tg.every((x) => S.done.includes(x));
  if (all) S.energy = 100;
  if (all && !sn.wasAll && S.level === 1 && !S.firstLevelGift) { S.firstLevelGift = dkey(); addXp(Math.max(0, xpNeed(1) - S.xp)); }
  addJoy(3);
  econGoalSettle(sn, null);
  save(); render();
  if (S.level > prev) setTimeout(() => showLevelUp(prev), 600);
  try { if (typeof backCheck === "function") backCheck(true); } catch (e) { /* niente */ }
  try { if (S.notif && typeof notifSchedule === "function") notifSchedule(); } catch (e) { /* niente */ }
  if (typeof trophySoon === "function" && (streak() !== streak0 || S.done.length)) trophySoon(2600);
}
flushPendingSoft = function () {
  if (!pendingGoals.length) return; const list = pendingGoals; pendingGoals = [];
  list.forEach((g, i) => setTimeout(() => econSoftGoal(g), i * 50));
};

/* 4e) Viaggi: 10 Tanì (mondi di partenza, luoghi veri, giro del mondo); i mondi nuovi usano EC.WORLD_TANI.
       La gita breve dei viaggi (98c, TRIP_PARTIAL_MULT) resta proporzionale. */
const _finishTripE = finishTrip;
finishTrip = function () {
  const key = S.away && S.away.dest; const b = S.seeds, lv = S.level;
  _finishTripE();
  if (!key || S.away) return;
  const e = econ(); ecPush(e.trips, S.day);
  const lvG = Math.max(0, S.level - lv) * EC.LEVEL; const stG = story && story.stamp ? story.stamp[1] || 0 : 0;
  let tripPart = S.seeds - b - lvG - stG;
  if (!String(key).startsWith("v:")) tripPart = Math.max(0, Math.round((tripPart * EC.TRIP) / SEEDS_TRIP));
  S.seeds = b + tripPart + lvG + stG;
  if (story) story.tani = tripPart;
  save();
};
/* 4f) Regalo del giorno: 6…18 Tanì (con Plus il triplo), uno solo al giorno anche toccando più volte (prima 3 tocchi = 3 regali) */
const _openGiftE = openGift;
openGift = function (b) {
  if (S.giftDay === S.day) return;
  const e = econ();
  if (e.gifts.includes(S.day)) { S.giftDay = S.day; save(); render(); return; } /* orologio tornato indietro: già aperto */
  const before = S.seeds; _openGiftE(b);
  if (S.giftDay !== S.day) return;
  const amt = econGiftDay(S.visit && S.visit.n); S.seeds = before + amt; ecPush(e.gifts, S.day); save();
  toast(L().giftBig(amt)); econShow();
};
/* 4g) Giochi: metà dei punti in Tanì, al massimo 10 al giorno in tutto */
let ecStars = false;
gameSeedsLeft = function () {
  const e = econ(); const used = Math.max(today(S.game) ? S.game.seeds || 0 : 0, e.games[S.day] || 0);
  let left = Math.max(0, EC.GAME_CAP - used);
  if (ecStars && typeof game !== "undefined" && game) left = Math.min(left, Math.max(game.score > 0 ? 1 : 0, Math.round((game.score || 0) * EC.GAME_MULT)));
  return left;
};
function econGameSync() { const e = econ(); if (today(S.game)) e.games[S.day] = Math.max(e.games[S.day] || 0, S.game.seeds || 0); }
awardGameSeeds = function (n) {
  const raw = Math.max(0, Math.round(n || 0)); const want = raw > 0 ? Math.max(1, Math.round(raw * EC.GAME_MULT)) : 0;
  const got = Math.min(want, gameSeedsLeft());
  const prev = today(S.game) ? S.game : { day: S.day, seeds: 0, best: (S.game && S.game.best) || 0 };
  S.game = { day: S.day, seeds: (prev.seeds || 0) + got, best: prev.best || 0 }; S.seeds += got; econGameSync(); save(); return got;
};
const _endGameE = endGame;
endGame = function () { ecStars = true; try { _endGameE(); } finally { ecStars = false; } econGameSync(); save(); };

/* 4h) Sfida della settimana: 50 Tanì e 60 Scintille (il pulsante originale aveva 150 scritto a mano) */
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "claimWeek") return;
  ev.stopPropagation(); ev.preventDefault();
  const c = weekChallenge(); if (!c.done || c.claimed) return;
  S.wkc = S.wkc || {}; S.wkc[c.wk] = true; S.seeds += EC.WEEK; save();
  toast(L().season.got(L().season.tani(EC.WEEK))); SND.play("fanfare"); burst("star", 12, b.closest(".chcard")); trackOnce("sfida-completata");
  const y = window.scrollY; render(); window.scrollTo(0, y);
}, true);
const _challengeCardE = challengeCard;
challengeCard = function () { const t = L().wk; return _challengeCardE().split(esc(t.reward(150, 100))).join(esc(t.reward(EC.WEEK, EC.SP_WEEK))).split(t.reward(150, 100)).join(t.reward(EC.WEEK, EC.SP_WEEK)); };

/* 4i) Sentiero: Scintille nuove da ora in poi, quelle già raccolte restano (migrazione per stagione) */
const _passiE = passi;
function econPassMig(se) {
  const e = econ(); let m = e.pass[se.id];
  if (!m || typeof m !== "object" || typeof m.base !== "number") {
    /* 1.0.9: un capitolo nuovo (v21) nasce gia' con le regole nuove: si conta tutto dal suo primo giorno (prima, chi
       aggiornava a meta' capitolo partiva da un totale calcolato con le regole vecchie, piu' alto di circa 1,4 volte) */
    if (se.v21) { m = e.pass[se.id] = { base: 0, day: se.start, k: 0, full: false, wk: [] }; save(); return m; }
    const d = dkey(); const r = S.days && S.days[d];
    m = e.pass[se.id] = { base: _passiE(se), day: d, k: (S.log || []).filter((x) => x && x.d === d).length, full: !!(r && r.total > 0 && r.done >= r.total), wk: Object.keys(S.wkc || {}).filter((k) => S.wkc[k]) };
    save();
  }
  return m;
}
passi = function (se) {
  se = se || curSeason(); if (!se) return 0; const m = econPassMig(se);
  let p = m.base, k = 0; const fx = (d) => (isFesta(d) ? EC.SP_FESTA : 1);
  (S.log || []).forEach((x) => {
    if (!x || x.d < se.start || x.d > se.end || x.d < m.day) return;
    if (x.d === m.day && ++k <= m.k) return;
    p += EC.SP_GOAL * fx(x.d);
  });
  Object.keys(S.days || {}).forEach((d) => {
    const r = S.days[d]; if (d < se.start || d > se.end || d < m.day || (d === m.day && m.full)) return;
    if (r && r.total > 0 && r.done >= r.total) p += EC.SP_DAY * fx(d);
  });
  const w0 = weekKey(ldate(se.start));
  Object.keys(S.wkc || {}).forEach((w) => { if (S.wkc[w] && w >= w0 && w <= se.end && !(m.wk || []).includes(w)) p += EC.SP_WEEK; });
  return p;
};

/* 4j) Plus: 750 Tanì al mese (fase 3; prima 150) (una volta per mese, e mai di nuovo spostando l'orologio indietro) */
const _plusMonthlyE = plusMonthly;
plusMonthly = function () {
  const ym = dkey().slice(0, 7); const e = econ();
  if (plusActive() && S.plusMonth !== ym && e.plusMax && ym <= e.plusMax) { S.plusMonth = ym; save(); return false; }
  const b = S.seeds; const r = _plusMonthlyE();
  if (r) { S.seeds = b + EC.PLUS_MONTH; e.plusMax = ym; save(); }
  return r;
};
/* 4k) Bentornato: 10 Tanì, solo se è davvero un giorno nuovo (non spostando l'orologio indietro e avanti) */
const _openWelcomeBackE = openWelcomeBack;
openWelcomeBack = function () {
  const e = econ(); const d = dkey(); const ok = !e.prevMax || d > e.prevMax;
  const was = S.backDay; const b = S.seeds; _openWelcomeBackE();
  if (S.backDay !== was) {
    S.seeds = b + (ok ? EC.BACK : 0); save();
    if (!ok) { const g = layer.querySelector(".wgbox .svgift"); if (g) g.remove(); }
  }
};
/* 4l) Sondaggio: 30 Tanì */
if (typeof finishSurvey === "function") {
  const _finishSurveyE = finishSurvey;
  finishSurvey = function () { const b = S.seeds; _finishSurveyE(); if (S.seeds - b === 50) { S.seeds = b + EC.SURVEY; save(); } };
}
/* 4m) Album: pagine e album completo */
const _claimPageE = claimPage;
claimPage = function (key) {
  const p = pageFind(key); const b = S.seeds; const wasFull = !!S.albumFull;
  _claimPageE(key);
  if (S.seeds === b || !p) return;
  const n = econPageTani(p); S.seeds = b + n + (!wasFull && S.albumFull ? EC.ALBUM : 0); save();
  toast(v19a().got(n)); econShow();
};
const _albumPageHTMLE = albumPageHTML;
albumPageHTML = function (p) {
  let h = _albumPageHTMLE(p); const a = v19a(); const o = pageTani(p), n = econPageTani(p); if (o === n) return h;
  const sv = p.sv && (L().items || {})[p.sv];
  h = h.replace(`· +${o}</button>`, `· +${n}</button>`);
  const ro = esc(sv ? a.rewardIt(o, sv) : a.reward(o)), rn = esc(sv ? a.rewardIt(n, sv) : a.reward(n));
  return h.split(ro).join(rn);
};
/* 4n) Festa di stagione già vinta (torna dal 2027): 20 Tanì */
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "claimEv") return;
  const si = seasonState(); if (S.season.n < EVENT_GOAL || S.season.claimed) return;
  const item = "s_" + si.id; if (!S.owned.includes(item)) return; /* il cappello nuovo lo dà il codice originale */
  ev.stopPropagation(); ev.preventDefault(); const t = L();
  S.season.claimed = true; S.seeds += EC.EVENT_AGAIN; toast(t.gift(EC.EVENT_AGAIN));
  save(); render(); jump(true); burst("confetti", 32); SND.play("fanfare");
}, true);
/* 4o) Video con premio (1.0.9 fase 2): ogni video = il regalo di oggi (adAmount in 97zn). EC.AD resta come lettura
       del valore vero (lo usano le simulazioni dei test). Un solo contatore: S.adsDay + il registro econ().ads */
Object.defineProperty(EC, "AD", { enumerable: true, get: () => adAmount() });
const _adsLeftTodayE = adsLeftToday;
adsLeftToday = function () { const e = econ(); const d = dkey(); return Math.min(_adsLeftTodayE(), ADS_DAY_MAX - (e.ads[d] || 0)); };
const _adsCountE = adsCount;
adsCount = function () { _adsCountE(); const e = econ(); const d = dkey(); e.ads[d] = Math.max((e.ads[d] || 0) + 1, S.adsDay && S.adsDay.d === d ? S.adsDay.n : 0); save(); };
/* 4p) Stima "in circa N giorni": il guadagno tipico vero con i tuoi obiettivi (prima: obiettivi + 20 + regalo + 30) */
dailyTaniGuess = function () {
  const g = (typeof todayGoals === "function" ? todayGoals().length : 3) || 3;
  const lvl = S.level || 1; let trip = EC.TRIP;
  V19W.forEach((w, i) => { if (w.lvl <= lvl) trip = Math.max(trip, EC.WORLD_TANI[i] || 0); });
  let d = g * EC.GOAL + EC.ALL + econGiftDay(((S.visit && S.visit.n) || 0) + 1) + trip + EC.WEEK / 7;
  if (plusActive()) d += (g * EC.GOAL + EC.ALL) * EC.PLUS_PCT;
  /* 1.0.9: anche il sentiero della stagione (Tanì medi per tappa x tappe al giorno), finché non è finito */
  try {
    const se = curSeason(); const n = seaTiers(se);
    if (se && sTier(passi(se), se) < n) {
      let tot = 0; for (let k = 1; k <= n; k++) { tot += sReward("f", k, se).tani || 0; if (plusActive()) tot += sReward("g", k, se).tani || 0; }
      d += (tot / n) * ((g * EC.SP_GOAL + EC.SP_DAY + EC.SP_WEEK / 7) / 100);
    }
  } catch (e) { /* la stima resta quella base */ }
  return Math.max(1, Math.round(d));
};

/* ================================================================================================================
   5) PREZZI E OGGETTI NUOVI
   ================================================================================================================ */
SHOP.forEach((s) => { const p = EC_PRICE[s.id]; if (p && s.price === p[0]) s.price = p[1]; });
EC_NEW_ITEMS.forEach((x) => {
  if (!SHOP.find((s) => s.id === x.id)) SHOP.push({ id: x.id, kind: x.kind, price: x.price, rar: x.rar });
  SLOT[x.id] = x.slot; GROUP[x.id] = x.group; ALT_VB[x.id] = x.vb;
});
Object.keys(T).forEach((l) => { const src = (ECT[l] || ECT.en).items; T[l].items = T[l].items || {}; Object.keys(src).forEach((id) => { T[l].items[id] = src[id]; }); });
function ecHeart(x, y, s, c) { return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})" d="M0 4.6 C-6.4 0 -5 -6 0 -2.8 C5 -6 6.4 0 0 4.6 Z" fill="${c}"/><path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})" d="M-3.2 -2.6 C-2.4 -3.4 -1.4 -3.2 -1 -2.4" stroke="#fff" stroke-width="1" opacity=".55" fill="none" stroke-linecap="round"/>`; }
const EC_ART = {
  lamp_candle: (lit, lampId) => {
    let o = "";
    if (lit) o += lampId ? `<circle cx="45" cy="218" r="40" fill="url(#${lampId})" opacity=".8"/>` : `<circle cx="45" cy="216" r="24" fill="#FFD27A" opacity=".3"/>`;
    o += `<g><ellipse cx="45" cy="263" rx="19" ry="4.5" fill="#000" opacity=".12"/><path d="M33 245 L30.5 262 M57 245 L59.5 262" stroke="#8E6440" stroke-width="3.4" stroke-linecap="round"/><path d="M32 254 H58" stroke="#7E5534" stroke-width="2" opacity=".75"/><rect x="28" y="239" width="34" height="7" rx="3.5" fill="#B5875A"/><rect x="28" y="239" width="34" height="2" rx="1" fill="#fff" opacity=".22"/>`
      + `<ellipse cx="45" cy="238.5" rx="11.5" ry="3.2" fill="#E9C39A"/><ellipse cx="45" cy="237.6" rx="8" ry="2" fill="#D9A97A"/><rect x="40" y="220" width="10" height="18" rx="2.6" fill="#FFF6E6"/><path d="M40.6 224.5 q4.4 3 8.8 0" stroke="#F0D6B4" stroke-width="1.3" fill="none"/><rect x="41.6" y="221" width="2" height="14" rx="1" fill="#fff" opacity=".6"/><path d="M45 220 v-3.4" stroke="#5B4636" stroke-width="1.2" stroke-linecap="round"/>`
      + `<path d="M45 205.5 C49.6 210 48.6 215.6 45 217 C41.4 215.6 40.4 210 45 205.5 Z" fill="${lit ? "#FFB547" : "#F6A43C"}"/><path d="M45 210.5 C46.8 212.6 46.4 215.2 45 216 C43.6 215.2 43.2 212.6 45 210.5 Z" fill="#FFF1B8"/></g>`;
    return o;
  },
  cushion_floor: () => `<g><ellipse cx="97" cy="268.5" rx="28" ry="5.5" fill="#000" opacity=".12"/><path d="M71 256 C71 266 123 266 123 256 L123 260 C123 271 71 271 71 260 Z" fill="#D9735C"/><ellipse cx="97" cy="256.5" rx="26" ry="9" fill="#F29B84"/><path d="M75 257 Q97 264.5 119 257" stroke="#D9735C" stroke-width="1.4" fill="none" opacity=".75"/>${[80, 88.5, 97, 105.5, 114].map((x, i) => `<circle cx="${x}" cy="${(256.5 + (i === 2 ? 0 : i % 2 ? -1.6 : 1.2)).toFixed(1)}" r="1.5" fill="#FFD9C9" opacity=".9"/>`).join("")}<circle cx="97" cy="256" r="2.6" fill="#C9604A"/><circle cx="96.2" cy="255.2" r=".9" fill="#fff" opacity=".5"/><path d="M80.5 252 Q88 248.6 96 250" stroke="#fff" stroke-width="1.6" opacity=".35" fill="none" stroke-linecap="round"/></g>`,
  garland_paper: () => {
    const sw = [[[166, 14], [213, 34], [260, 14]], [[260, 14], [307, 34], [354, 14]]];
    const cols = ["#F7A9C0", "#FFD98A", "#A9D3F5", "#B8E3B0", "#D9C6FF"]; let k = 0;
    let o = `<path d="M166 14 Q213 34 260 14 Q307 34 354 14" stroke="#8E6440" stroke-width="1.3" fill="none"/>`;
    sw.forEach(([a, c, b]) => { for (let t = 0.1; t < 0.95; t += 0.16) { const [x, y] = quadPt(a, c, b, t); o += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} v2.4" stroke="#8E6440" stroke-width=".9"/>` + ecHeart(x, y + 7.4, 1.05, cols[k++ % cols.length]); } });
    [[166, 14], [260, 14], [354, 14]].forEach(([x, y]) => { o += `<circle cx="${x}" cy="${y}" r="2.2" fill="#8E6440"/>`; });
    return o;
  }
};
const _furnAltE = furnAlt;
furnAlt = function (slot, furn, lit, lampId) {
  let o = _furnAltE(slot, furn, lit, lampId);
  EC_NEW_ITEMS.forEach((x) => { if (x.slot === slot && furn.includes(x.id)) o += EC_ART[x.id](lit, lampId); });
  return o;
};

/* ================================================================================================================
   6) SCAPPATOIE
   ================================================================================================================ */
/* 6a) Togliere e rimettere un obiettivo / "Salva" nell'editor: gli obiettivi già premiati oggi restano spuntati,
       e l'energia non si ricarica se oggi è già partito un viaggio */
let ecSaveSnap = null;
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "saveGoals") { ecSaveSnap = { energy: S.energy, day: S.day, away: !!S.away }; setTimeout(econAfterSave, 0); }
  if (b.id === "depart" && S.energy >= 100 && pickedDest && !S.away) { ecPush(econ().trips, S.day); save(); }
}, true);
function econAfterSave() {
  const sn = ecSaveSnap; ecSaveSnap = null; if (!sn || !S.pet || sn.day !== S.day) return;
  const e = econ(); const tg = todayGoals(); let ch = false;
  (e.rw[S.day] || []).forEach((g) => { if (tg.includes(g) && !S.done.includes(g)) { S.done.push(g); ch = true; } });
  const r = dayRec(); const nd = S.done.filter((x) => tg.includes(x)).length; if (r.done !== nd) { r.done = nd; ch = true; }
  if (!S.away) {
    const want = econTripToday() ? Math.min(S.energy, sn.energy) : (tg.length && tg.every((x) => S.done.includes(x)) ? 100 : (tg.length ? Math.min(100, (nd / tg.length) * 100) : S.energy));
    if (want !== S.energy) { S.energy = want; ch = true; }
  }
  if (ch) { save(); const y = window.scrollY; render(); window.scrollTo(0, y); }
}
window.addEventListener("click", () => { if (ecSaveSnap) econAfterSave(); }, false);
/* 6b) "Fallo tornare subito (solo nella prova)": era visibile anche nell'app vera. Tolto. */
const _awayCardE = awayCard;
awayCard = function () { const t = L(); return _awayCardE().replace(new RegExp(`<button class="btn ghost block" id="comeBack">${t.awayNow.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</button>`), ""); };
/* ...e la modalità "prova" (S.dev) non esiste più per nessuno: anche un salvataggio vecchio o ripristinato che la
   avesse non la riaccende (html.dev mostrava "Fallo tornare subito") */
if (typeof applyRoot === "function") {
  const _applyRootE = applyRoot;
  applyRoot = function (...a) { try { if (S && S.dev) delete S.dev; } catch (e) { /* niente */ } const r = _applyRootE.apply(this, a); document.documentElement.classList.remove("dev"); return r; };
}
try { if (S && S.dev) delete S.dev; document.documentElement.classList.remove("dev"); } catch (e) { /* niente */ }
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "comeBack") return;
  if ((b.textContent || "").trim() === String(L().awayNow).trim()) { ev.stopPropagation(); ev.preventDefault(); }
}, true);
/* 6c) Giorno di riposo: uno a settimana (da lunedì a domenica), spiegato con gentilezza */
function econRestUsedWeek() {
  const wk = weekKey(); const td = dkey();
  return Object.keys(S.days || {}).some((k) => k >= wk && k < td && S.days[k] && S.days[k].rest);
}
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "rest") return;
  if (econRestUsedWeek()) { ev.stopPropagation(); ev.preventDefault(); toast(ect().restUsed); const y = window.scrollY; render(); window.scrollTo(0, y); }
}, true);
const _viewTodayE = viewToday;
viewToday = function () {
  let h = _viewTodayE(); if (!S.pet) return h; const t = L();
  if (econRestUsedWeek()) h = h.replace(`<button class="link" id="rest">${t.restB}</button>`, `<span class="small muted ecrest">${esc(ect().restUsed)}</span>`);
  return h;
};
/* 6d) Orologio: ricorda il giorno più avanti visto; tornando su un giorno già giocato, gli obiettivi premiati restano
       spuntati e il regalo già aperto resta aperto (niente premi doppi). Fusi orari: si gioca normalmente. */
function econRestoreDay() {
  if (!S.pet) return; const e = econ(); const d = S.day; let ch = false;
  const tg = todayGoals();
  (e.rw[d] || []).forEach((g) => { if (tg.includes(g) && !S.done.includes(g)) { S.done.push(g); ch = true; } });
  if (ch) {
    const r = dayRec(); r.done = S.done.filter((x) => tg.includes(x)).length;
    if (!S.away) S.energy = econTripToday() ? 0 : tg.length && tg.every((x) => S.done.includes(x)) ? 100 : Math.min(100, (r.done / Math.max(1, tg.length)) * 100);
  }
  if (e.gifts.includes(d) && S.giftDay !== d) { S.giftDay = d; ch = true; }
  if (ch) save();
}
const _rollDayE = rollDay;
rollDay = function () {
  const before = S.day; _rollDayE();
  const e = econ(); if (S.day > e.maxDay) e.maxDay = S.day;
  if (before !== S.day) { econPrune(); econRestoreDay(); save(); }
};
/* 6e) Copie, trasferimenti e salvataggio online: numeri controllati con buon senso */
let ecImportFixed = false;
function econSanitize(st) {
  if (!st || typeof st !== "object") return st;
  let o; try { o = JSON.parse(JSON.stringify(st)); } catch (e) { return st; }
  let fixed = false;
  const int = (v, lo, hi, def) => { let n = Number(v); if (!isFinite(n)) n = def; n = Math.round(n); const c = Math.max(lo, Math.min(hi, n)); if (c !== v) fixed = fixed || v !== undefined; return c; };
  const logDays = new Set((Array.isArray(o.log) ? o.log : []).map((x) => x && x.d).filter(Boolean)).size;
  const recDays = o.days && typeof o.days === "object" ? Object.keys(o.days).length : 0;
  let span = 99999; if (typeof o.firstDay === "string" && /^\d{4}-\d\d-\d\d$/.test(o.firstDay)) span = Math.max(1, Math.round((Date.now() - ldate(o.firstDay).getTime()) / 86400000) + 1);
  const active = Math.max(1, Math.min(Math.max(logDays, recDays), span));
  const packs = Array.isArray(o.paidTokens) ? o.paidTokens.filter((x) => typeof x === "string").length : 0;
  const cap = EC.IMPORT_BASE + active * EC.IMPORT_PER_DAY + packs * EC.IMPORT_PER_PACK;
  if (!Array.isArray(o.owned)) { o.owned = ["w_cream"]; fixed = true; }
  o.owned = o.owned.filter((x) => typeof x === "string").slice(0, 600);
  const seeds = int(o.seeds, 0, 1e9, 0);
  o.seeds = Math.min(seeds, cap);
  if (o.seeds !== seeds) fixed = true;
  o.level = int(o.level, 1, 300, 1); o.xp = int(o.xp, 0, 100000, 0); o.shields = int(o.shields || 0, 0, 20, 0);
  if (o.plusOn) o.plusOn = false; /* Plus lo conferma Google Play alla prossima verifica */
  if (Array.isArray(o.paidTokens)) o.paidTokens = o.paidTokens.filter((x) => typeof x === "string").slice(-200);
  if (o.spc && typeof o.spc === "object") Object.keys(o.spc).forEach((k) => { const c = o.spc[k] || {}; ["f", "g"].forEach((tr) => { const a = Array.isArray(c[tr]) ? c[tr] : []; const b2 = [...new Set(a.map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= 50))]; if (b2.length !== a.length) fixed = true; c[tr] = b2; }); o.spc[k] = c; });
  if (o.v20econ != null && (typeof o.v20econ !== "object" || Array.isArray(o.v20econ))) delete o.v20econ;
  ecImportFixed = ecImportFixed || fixed;
  return o;
}
function econAfterImport() {
  setTimeout(() => {
    if (ecImportFixed) { ecImportFixed = false; toast(ect().importFixed); }
    try { if (typeof isNativeApp === "function" && isNativeApp() && typeof syncPurchases === "function") syncPurchases(false); } catch (e) { /* niente */ }
  }, 2600);
}
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "rsYes" || !pendingRestore) return;
  pendingRestore = econSanitize(pendingRestore); econAfterImport();
}, true);
if (typeof restoreFrom === "function") { const _restoreFromE = restoreFrom; restoreFrom = function (state) { const st = econSanitize(state); if (!S.pet) econAfterImport(); return _restoreFromE(st); }; }
if (typeof applyCloud === "function") { const _applyCloudE = applyCloud; applyCloud = function (st, at) { const r = _applyCloudE(econSanitize(st), at); econAfterImport(); return r; }; }

/* 6f) Pallino rosso su "Oggi": la vecchia festa (20 obiettivi) è nascosta durante la stagione, quindi non deve accenderlo */
const _renderTabsE = renderTabs;
renderTabs = function () {
  _renderTabsE(); if (!S.pet) return;
  const b = document.querySelector('#tabsIn .tab[data-tab="today"]'); if (!b) return;
  const want = tab !== "today" && (S.giftDay !== S.day || (!curSeason() && S.season && S.season.n >= EVENT_GOAL && !S.season.claimed));
  const dot = b.querySelector(".dot");
  if (want && !dot) b.insertAdjacentHTML("beforeend", '<i class="dot" aria-hidden="true"></i>'); else if (!want && dot) dot.remove();
};

/* ================================================================================================================
   7) NEGOZIO: si capisce subito cosa puoi comprare ora
   ================================================================================================================ */
const econBuyable = (s) => !!s && !ownsItem(s) && !lockedItem(s) && !s.coll && s.price > 0;
const _shopItemE = shopItem;
shopItem = function (s) {
  let h = _shopItemE(s);
  if (!econBuyable(s) || tryId === s.id) return h;
  const ok = S.seeds >= s.price; const t = L();
  h = h.replace('<span class="price">', `<span class="price ${ok ? "ecok" : "ecno"}">`);
  h = h.replace('class="item ', `class="item ${ok ? "ecafford" : "ecshort"} `);
  if (!ok) h = h.replace(/<\/button>$/, `<span class="ecmiss">${esc(ect().miss((s.price - S.seeds).toLocaleString(loc(), NUMG)))}</span></button>`);
  return h;
};
const _tryBarE = tryBar;
tryBar = function () {
  let h = _tryBarE(); const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId);
  if (!econBuyable(s) || S.seeds < (s.price || 0)) return h; /* 1.0.8: verde solo se te lo puoi permettere */
  return h.replace('<span class="pr">', `<span class="pr ecok">`);
};

/* ================================================================================================================
   8) TESTI: i numeri vengono dalle costanti
   ================================================================================================================ */
const ecRe = (n) => new RegExp(`(^|[^0-9.,])${n}(?![0-9])`);
const ecSwap = (s, from, to) => (typeof s === "string" ? s.replace(ecRe(from), `$1${to}`) : s);
const ecWrapFn = (f, from, to) => (typeof f !== "function" ? f : (...a) => { const mk = a.map((_, i) => `\u0001${String.fromCharCode(65 + i)}\u0002`); let s = String(f(...mk)); s = ecSwap(s, from, to); a.forEach((v, i) => { s = s.split(mk[i]).join(String(v)); }); return s; });
const EC_LANGS = ["it", "en", "de", "es", "fr", "pt", "ja", "ko", "zh", "zht", "ru", "pl", "nl", "tr"];
EC_LANGS.forEach((l) => {
  const t = T[l]; if (!t) return; const x = ECT[l] || ECT.en;
  t.levelUpP = ((f) => (n) => (ecLastLvl > EC.LEVEL ? ecWrapFn(f, 30, ecLastLvl) : ecWrapFn(f, 30, EC.LEVEL))(n))(t.levelUpP);
  t.teaserP = ((f) => () => {
    const s = f(econGiftDay(((S.visit && S.visit.n) || 1) + 1));
    if (SPECIALS.some((id) => !S.owned.includes(id))) return s;
    const m = /^[\s\S]*?Tan[iì][^.。]*[.。]/.exec(s); return m ? m[0] : s;
  })(t.teaserP);
  if (t.plus && Array.isArray(t.plus.perks)) {
    if (t.plus.perks[6]) t.plus.perks[6] = ecSwap(ecSwap(t.plus.perks[6], 300, EC.PLUS_MONTH), 50, Math.round(EC.PLUS_PCT * 100));
    if (t.plus.perks[4]) t.plus.perks[4] = x.perkColl;
  }
  if (t.coll) t.coll.P = x.collP;
  if (t.bill && t.bill.monthGift) t.bill.monthGift = ecSwap(t.bill.monthGift, 300, EC.PLUS_MONTH);
  if (t.season) Object.defineProperty(t.season, "how", { configurable: true, enumerable: true, get: () => ect().how(EC.SP_GOAL, EC.SP_DAY, EC.SP_WEEK), set: () => {} });
  if (t.festa) t.festa.P = x.festaP;
  if (t.survey) {
    t.survey.cardP = ecSwap(t.survey.cardP, 50, EC.SURVEY); t.survey.gift = ecSwap(t.survey.gift, 50, EC.SURVEY);
  }
  if (t.v12) { t.v12.backGift = ecSwap(t.v12.backGift, 20, EC.BACK); t.v12.giftP = ecWrapFn(t.v12.giftP, 50, EC.WELCOME); }
  if (t.guide && t.guide[4] && typeof t.guide[4][1] === "string") { const orig = t.guide[4][1]; Object.defineProperty(t.guide[4], 1, { configurable: true, enumerable: true, get: () => (curSeason() ? ect().guidePath : orig), set: () => {} }); }
  if (t.tani) Object.defineProperty(t.tani, "enough", { configurable: true, enumerable: true, get: () => PACKS.map((p) => { const tier = econPackTier(p.n); return tier ? ect().enough[tier] : ""; }), set: () => {} });
  if (typeof t.restP === "string" && !t.restP.includes(x.restWeek)) t.restP = `${t.restP} ${x.restWeek}`;
  if (typeof t.gameSeedsInfo === "function") { const f = t.gameSeedsInfo; t.gameSeedsInfo = (n, m) => f(Math.min(n, EC.GAME_CAP), EC.GAME_CAP); }
  /* prova gratuita: i giorni veri dell'offerta di Google Play, quando si conoscono */
  const trialDays = () => { try { const p = billProducts && billProducts.plans; const d = p && ((p.year && p.year.trialDays) || (p.month && p.month.trialDays)); return d || 0; } catch (e) { return 0; } };
  if (t.plus && typeof t.plus.trial === "string") { const o = t.plus.trial; Object.defineProperty(t.plus, "trial", { configurable: true, enumerable: true, get: () => { const d = trialDays(); return d ? ecSwap(o, 7, d) : o; }, set: () => {} }); }
  if (t.v13 && typeof t.v13.afterY === "function") { const f = t.v13.afterY; t.v13.afterY = (p) => { const d = trialDays(); return d ? ecWrapFn(f, 7, d)(p) : f(p); }; }
});
/* Pacchetti: "basta per qualsiasi oggetto X" solo se è vero per tutti gli oggetti di quella rarità */
function econPackTier(n) {
  let best = null;
  ["b", "c", "r", "e", "l", "m"].forEach((r) => { const ps = SHOP.filter((s) => s.rar === r && s.price > 0 && !s.reward && !s.found && !s.event && !s.special && !s.coll).map((s) => s.price); if (ps.length && n >= Math.max(...ps)) best = r; });
  return best;
}
if (typeof V19 !== "undefined") Object.keys(V19).forEach((l) => { if (V19[l] && V19[l].lvGift) V19[l].lvGift = ecSwap(V19[l].lvGift, 30, EC.LEVEL); });
Object.keys(V19A).forEach((l) => { if (V19A[l] && V19A[l].fullP) V19A[l].fullP = ecWrapFn(V19A[l].fullP, 1000, EC.ALBUM); });

/* ================================================================================================================
   9) AVVIO
   ================================================================================================================ */
(() => {
  const e = econ(); e.prevMax = e.maxDay; if (dkey() > e.maxDay) e.maxDay = dkey();
  econPrune();
  try { const se = curSeason(); if (se) econPassMig(se); } catch (err) { /* niente */ }
  /* oggi: chi aveva già spuntato obiettivi prima dell'aggiornamento li ha già "premiati" */
  if (S.pet && S.day === dkey()) { e.rw[S.day] = e.rw[S.day] || []; S.done.forEach((g) => ecPush(e.rw[S.day], g)); const tg = todayGoals(); if (tg.length && tg.every((g) => S.done.includes(g))) e.all[S.day] = 1; if (S.giftDay === S.day) ecPush(e.gifts, S.day); econGameSync(); }
  save();
})();
