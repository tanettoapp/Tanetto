/* v10 (nl): Seizoen 0, pad, uitdagingen, feesten, schilden, overzicht, collectie, reis om de wereld */
Object.assign(T.nl, {
  rar: { b: "Basis", c: "Gewoon", r: "Zeldzaam", e: "Episch", l: "Legendarisch" },
  season: {
    names: { lanterns: "Seizoen van de Lantaarns" }, zero: "Seizoen 0", left: (d) => d === 1 ? "Nog 1 dag" : `Nog ${d} dagen`,
    tier: (n, m = 50) => `Etappe ${n} van ${m}`, passi: (n) => n === 1 ? "1 Stap" : `${n} Stappen`, next: (n) => n === 1 ? "Nog 1 Stap tot de volgende etappe" : `Nog ${n} Stappen tot de volgende etappe`, open: "Open het pad", pathT: "Het seizoenspad",
    how: "Je verdient Stappen alleen door goed voor jezelf te zorgen: 10 per doel, 20 per volledige dag, 100 per weekuitdaging. In de feestweek tellen ze dubbel.",
    free: "Voor iedereen", gold: "Gouden pad", claim: "Ophalen", claimed: "Opgehaald", toClaim: (n) => n === 1 ? "1 beloning om op te halen" : `${n} beloningen om op te halen`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 reeksschild" : `${n} reeksschilden`, got: (x) => `Je krijgt: ${x}!`,
    founder: "Pionier", founderP: "Je speelde Seizoen 0: deze badge en de gouden lantaarn zijn voor altijd van jou.", fromPath: "Beloning van het pad",
    goldLock: "Het gouden pad hoort bij Tanetto Plus", chapterT: (n) => `Het verhaal van de lantaarns · hoofdstuk ${n}`,
    story: [
      "Vanavond vond {n} een papieren lantaarn bij de deur. Er zat een briefje in: ‘Elk klein lief gebaar steekt een lichtje aan.’ Wie zou hem daar hebben neergezet?",
      "Elke keer dat je goed voor jezelf zorgt, schijnt de lantaarn een beetje feller. {n} heeft hem voor het raam gehangen: van buitenaf lijkt hij wel een sterretje, zeggen ze.",
      "Vandaag kwamen er meer lantaarns, één voor elk huis in de buurt. Iedereen vraagt zich hetzelfde af: wie brengt ze? {n} heeft een vermoeden...",
      "Een aanwijzing! Op de vensterbank staan piepkleine gouden pootafdrukjes. {n} volgt ze helemaal tot aan het meer, waar het water duizend lichtjes weerspiegelt.",
      "Bij het meer ontmoet {n} de Lantaarnhoedster, een lieve oude vuurvlieg. ‘Lantaarns gaan branden door de zorg die ieder van ons in zijn dagen stopt,’ zegt ze met een glimlach.",
      "Het is de avond van het grote feest: alle lantaarns stijgen samen op naar de hemel. Die van jou is een van de helderste, omdat je hem dag na dag hebt aangestoken. Dankjewel voor dit seizoen samen."
    ]
  },
  wk: {
    T: "Weekuitdaging", goals: (n) => `Haal deze week ${n} doelen`, days: (n) => `Haal minstens 2 doelen op ${n} verschillende dagen`, full: (n) => `Haal ${n} dagen lang al je doelen van de dag`, cat: (n, c) => `Haal ${n} doelen in de categorie «${c}»`,
    prog: (a, b) => `${a} van ${b}`, reward: (t, p) => `Beloning: ${t} Tanì en ${p} Stappen`, claim: "Beloning ophalen", done: "Uitdaging gehaald! De volgende komt maandag.", ends: (d) => d <= 1 ? "Laatste dag" : `Eindigt over ${d} dagen`
  },
  festa: { P: "Feestweek: Stappen tellen dubbel!", names: ["Feest van de Nieuwe Start", "Knuffelfeest", "Feest van de Kiempjes", "Vliegerfeest", "Bloemenfeest", "Vuurvliegjesfeest", "Zeefeest", "Feest van de Vallende Sterren", "Feest van de Nieuwe Schriftjes", "Bladerenfeest", "Dekentjesfeest", "Lichtjesfeest"] },
  shield: { T: "Reeksschilden", P: "Mis je een dag? Dan beschermt een schild automatisch je reeks.", have: (n) => n === 1 ? "Je hebt 1 schild" : `Je hebt ${n} schilden`, saved: "Een schild heeft je reeks beschermd!" },
  rep: {
    T: "Jouw maand", goals: (n) => n === 1 ? "1 doel gehaald" : `${n} doelen gehaald`, days: (n) => n === 1 ? "1 actieve dag" : `${n} actieve dagen`, top: (g) => `Je sterkste gewoonte: ${g}`, none: "Nog niks te vertellen deze maand: haal je eerste doel!",
    full: "Volledig overzicht", fullT: (m) => `Jouw overzicht van ${m}`, weeks: "Doelen per week", moods: "Je stemming", cats: "Waar je de meeste zorg in stak", habits: "Je sterkste gewoontes", tipT: (n) => `Tip van ${n}`,
    tips: { body: "Je lichaam kreeg deze maand weinig ruimte: probeer een korte wandeling of een extra glas water.", mind: "Denk ook aan je hoofd: één minuut ademen per dag doet wonderen.", home: "Een klein gebaar voor je huis, zoals je bed opmaken, maakt de dagen lichter.", people: "Stuur iemand om wie je geeft een berichtje: zelfs een kort berichtje verwarmt het hart.", work: "Neem af en toe een echte pauze: daar laad je van op.", sleep: "Slaap is een superkracht: probeer je scherm wat eerder uit te zetten.", custom: "Je eigen doelen zijn kostbaar: ga zo door." },
    plusOnly: "Het volledige overzicht hoort bij Tanetto Plus"
  },
  coll: { T: (m) => `Collectie van ${m}`, P: "Exclusieve Tanetto Plus-spulletjes, alleen deze maand.", get: "Pakken", unlock: "Ontgrendel met Plus" },
  worldT: "Reis om de wereld", worldP: (k) => `Exclusieve Tanetto Plus-uitstapjes: ${k} prachtige plekken om te ontdekken.`,
  wishT: "Wens", wishes: ["Ik heb een wens voor je gedaan: dat morgen een fijne dag wordt.", "De lantaarn vliegt hoog: hij brengt ons geluk!", "Wens vervuld: een hele grote knuffel.", "Wat mooi om hem te zien opstijgen... net als jouw vooruitgang!"],
  festival: { name: "Lantaarnfeest", say: ["Kijk eens hoeveel lantaarns op het meer!", "Zullen we die van ons ook aansteken?"], tap: "Tik op het meer om een lantaarn op te laten" }
});
Object.assign(T.nl.acts2, { wish: "Wens" });
Object.assign(T.nl.items, { h_lantern: "Lantaarnhoed", h_lantern_gold: "Lantaarnkroon", w_lanterns: "Lantaarnnacht", lamp_stone: "Stenen lantaarn", tree_lights: "Lichtjesboompje", rug_autumn: "Herfstkleed", curt_autumn: "Herfstgordijnen", founder_lantern: "Pionierslantaarn", rug_moon: "Maankleed", h_acorn: "Eikelhoedje", h_beret: "Rode baret", w_leaves: "Dansende blaadjes" });
Object.assign(T.nl.plus, { perks: ["Nooit reclame", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Reis om de wereld: ${k} exclusieve uitstapjes`, "Het gouden pad, met veel mooiere beloningen", "Elke maand een exclusieve collectie", "Elke maand 2 reeksschilden", "Elke maand 300 Tanì cadeau en +50% Tanì voor je doelen", "Het volledige maandoverzicht, geïllustreerd en met tips"] });
Object.assign(T.nl.tani, { enough: ["Genoeg voor een gewoon voorwerp", "Genoeg voor een zeldzaam voorwerp", "Genoeg voor een episch voorwerp", "Genoeg voor een legendarisch voorwerp"] });
T.nl.tracks = T.nl.tracks.concat(["Lichte stapjes", "Bruisende ochtend", "Dekentje en thee", "Zeepbellen", "Rondedans", "Zachte wolk", "Op de fiets", "Vuurvliegjesdans", "Lantaarnnacht"]);
T.nl.world = [
  { name: "Piramides van Gizeh", t: "Ouder dan oud", s: "{n} rijdt op een kameel langs de Piramides van Gizeh en knijpt de ogen samen tegen de gouden zon. De Grote Piramide is zo'n 4500 jaar oud en was bijna 4000 jaar lang het hoogste bouwwerk ter wereld!" },
  { name: "Santorini", t: "Blauwe koepels aan zee", s: "{n} wandelt tussen witte huisjes en blauwe koepels, hoog boven de glinsterende zee. Santorini heeft de vorm van een halve maan, omdat het de rand van een oude vulkaan is." },
  { name: "Matterhorn", t: "De chocoladeberg", s: "Voor een houten chalet drinkt {n} warme chocolademelk en kijkt omhoog naar de Matterhorn. Zijn spitse top is zo beroemd dat hij op een bekende Zwitserse chocoladereep staat!" },
  { name: "Noorse fjorden", t: "Waar gletsjers de zee uitsleten", s: "{n} vaart met een bootje tussen hoge groene rotswanden en telt de watervallen. Deze lange, diepe fjorden zijn in de ijstijd uitgesleten door reusachtige gletsjers." },
  { name: "Lapland", t: "Lichtjes die dansen", s: "Onder het dansende groene noorderlicht zegt {n} hallo tegen een rendierfamilie. Wist je dat? Bij rendieren krijgen zowel de mannetjes als de vrouwtjes een gewei!" },
  { name: "IJsland", t: "De lucht gloeit", s: "{n} luistert naar een waterval terwijl de lucht groen en roze kleurt. Noorderlicht ontstaat als piepkleine deeltjes van de zon hoog boven de aarde tegen de lucht botsen." },
  { name: "Saharawoestijn", t: "Een oase in het zand", s: "Na een lange tocht over de duinen vindt {n} een koele oase vol palmbomen. In de bult van een kameel zit geen water maar vet: zo kan een kameel dagenlang zonder eten." },
  { name: "Petra", t: "Een stad uit steen gehouwen", s: "{n} sluipt op de tenen door een smalle kloof en ziet ineens de Schatkamer van Petra, helemaal roze. Die werd meer dan 2000 jaar geleden zo uit de rots gehouwen!" },
  { name: "Safari in Kenia", t: "Hallo, lange vriendin!", s: "Op safari kijkt {n} naar giraffen die aan acaciablaadjes knabbelen, met de besneeuwde Kilimanjaro in de verte. De tong van een giraf kan bijna een halve meter lang zijn!" },
  { name: "Victoriawatervallen", t: "De rook die dondert", s: "{n} voelt de koele nevel van de Victoriawatervallen en ziet een regenboog in de mist. De mensen daar noemen ze Mosi-oa-Tunya: ‘de rook die dondert’." },
  { name: "Taj Mahal", t: "Een paleis van licht", s: "{n} kijkt hoe de opkomende zon de Taj Mahal zachtroze kleurt. Het witte marmer lijkt de hele dag van kleur te veranderen: roze in de ochtend, wit om twaalf uur en goudkleurig in de avond." },
  { name: "Angkor Wat", t: "Torens bij zonsopgang", s: "{n} staat heel vroeg op om de torens van Angkor Wat bij zonsopgang in de vijver te zien weerspiegelen. Het is de grootste tempel ter wereld en staat zelfs op de vlag van Cambodja!" },
  { name: "Bali", t: "Groene trappen", s: "{n} loopt langs rijstterrassen die eruitzien als reusachtige groene trappen. De boeren hier delen het water met een slim systeem van kanaaltjes dat meer dan 1000 jaar oud is." },
  { name: "Malediven", t: "Een huisje op het water", s: "{n} slaapt in een hutje op palen, met visjes die er pal onder zwemmen. De Malediven bestaan uit zo'n 1200 eilanden en zijn het platste land ter wereld." },
  { name: "Great Barrier Reef", t: "Hallo, clownvis!", s: "{n} snorkelt tussen kleurrijk koraal, met clownvisjes en een rustige zeeschildpad. Het Great Barrier Reef is zo groot dat je het vanuit de ruimte kunt zien!" },
  { name: "Sydney", t: "Zeilen in de haven", s: "{n} neemt de veerboot over de haven om het Sydney Opera House van dichtbij te zien. De daken in de vorm van zeilen zijn bedekt met meer dan een miljoen tegels!" },
  { name: "Banff", t: "Het turquoise meer", s: "{n} peddelt in een rode kano over een meer zo blauw als een edelsteen. Die kleur komt van ‘steenmeel’: piepkleine stukjes steen die door gletsjers zijn fijngemalen." },
  { name: "Hawaï", t: "Eilanden die nog groeien", s: "{n} bouwt een zandkasteel terwijl in de verte een vulkaan rookt. Als lava in zee stroomt en afkoelt, ontstaat er gloednieuw land: Hawaï groeit dus nog steeds!" },
  { name: "Galápagos", t: "Een heel oude vriendin", s: "{n} ontmoet een reuzenschildpad die langzaam op een cactusblad kauwt. Deze lieve reuzen kunnen meer dan 100 jaar oud worden!" },
  { name: "Machu Picchu", t: "Stad in de wolken", s: "Terwijl de wolken wegdrijven, klimt {n} naar Machu Picchu, en een vriendelijke lama komt even hallo zeggen. De Inca's pasten de stenen zo precies in elkaar dat ze helemaal geen specie nodig hadden." },
  { name: "Salar de Uyuni", t: "Lopen op de lucht", s: "{n} wandelt over de Salar de Uyuni, de grootste zoutvlakte ter wereld. Na de regen wordt hij een reusachtige spiegel, en dan lijkt het alsof je op de lucht loopt!" },
  { name: "Patagonië", t: "De rokende berg", s: "{n} ziet de granieten pieken van de Fitz Roy bij zonsopgang roze kleuren. De mensen van daar noemden hem Chaltén, ‘de rokende berg’, omdat er vaak wolken om de top hangen." },
  { name: "Paaseiland", t: "De stenen reuzen", s: "{n} zegt goedemorgen tegen de moai, de stenen reuzen van Paaseiland. Het zijn er bijna 1000, en de meeste staan met hun rug naar de zee." },
  { name: "Antarctica", t: "Pinguïnparade", s: "Tussen enorme ijsbergen waggelt {n} mee met een groepje keizerspinguïns. Pinguïnvaders houden het ei zo'n twee maanden warm op hun voeten, midden in de winter!" }
];
