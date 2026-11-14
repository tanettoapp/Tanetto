/* v10 (Deutsch): Saison 0, Pfad, Wochenaufgaben, Feste, Schutzschilde, Monatsbericht, Kollektion, Weltreise */
Object.assign(T.de, {
  rar: { b: "Basis", c: "Gewöhnlich", r: "Selten", e: "Episch", l: "Legendär" },
  season: {
    names: { lanterns: "Saison der Laternen" }, zero: "Saison 0", left: (d) => d === 1 ? "Noch 1 Tag" : `Noch ${d} Tage`,
    tier: (n, m = 50) => `Etappe ${n} von ${m}`, passi: (n) => `${n} Schritte`, next: (n) => `Noch ${n} Schritte bis zur nächsten Etappe`, open: "Zum Pfad", pathT: "Der Saisonpfad",
    how: "Schritte sammelst du nur, indem du gut für dich sorgst: 10 für jedes Ziel, 20 für jeden vollen Tag, 100 für jede Wochenaufgabe. In der Festwoche zählen sie doppelt.",
    free: "Für alle", gold: "Goldener Pfad", claim: "Holen", claimed: "Geholt", toClaim: (n) => n === 1 ? "1 Belohnung wartet" : `${n} Belohnungen warten`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 Serienschild" : `${n} Serienschilde`, got: (x) => `Du hast bekommen: ${x}!`,
    founder: "Gründer", founderP: "Du warst in Saison 0 dabei: Dieses Abzeichen und die goldene Laterne gehören für immer dir.", fromPath: "Belohnung vom Pfad",
    goldLock: "Der goldene Pfad gehört zu Tanetto Plus", chapterT: (n) => `Die Geschichte der Laternen · Kapitel ${n}`,
    story: [
      "Heute Abend hat {n} eine Papierlaterne vor der Tür gefunden. Darin lag ein Zettel: „Jede kleine liebe Geste zündet ein Licht an.“ Wer sie wohl dort hingestellt hat?",
      "Jedes Mal, wenn du gut für dich sorgst, leuchtet die Laterne ein bisschen heller. {n} hat sie ins Fenster gehängt: Von draußen, heißt es, sieht sie aus wie ein kleiner Stern.",
      "Heute sind noch mehr Laternen gekommen, eine für jedes Haus in der Nachbarschaft. Alle fragen sich dasselbe: Wer bringt sie? {n} hat da so eine Ahnung ...",
      "Eine Spur! Auf der Fensterbank sind winzige goldene Fußabdrücke. {n} folgt ihnen bis zum See, wo das Wasser tausend kleine Lichter spiegelt.",
      "Am See trifft {n} die Hüterin der Laternen, ein freundliches altes Glühwürmchen. „Laternen leuchten durch die Fürsorge, die jeder in seine Tage steckt“, sagt sie lächelnd.",
      "Heute ist die Nacht des großen Festes: Alle Laternen steigen gemeinsam in den Himmel. Deine gehört zu den hellsten, weil du sie Tag für Tag angezündet hast. Danke für diese gemeinsame Saison."
    ]
  },
  wk: {
    T: "Wochenaufgabe", goals: (n) => `Schaffe diese Woche ${n} Ziele`, days: (n) => `Schaffe an ${n} verschiedenen Tagen mindestens 2 Ziele`, full: (n) => `Schaffe an ${n} Tagen alle Ziele des Tages`, cat: (n, c) => `Schaffe ${n} Ziele aus dem Bereich „${c}“`,
    prog: (a, b) => `${a} von ${b}`, reward: (t, p) => `Belohnung: ${t} Tanì und ${p} Schritte`, claim: "Belohnung holen", done: "Aufgabe geschafft! Die nächste kommt am Montag.", ends: (d) => d <= 1 ? "Letzter Tag" : `Endet in ${d} Tagen`
  },
  festa: { P: "Festwoche: Schritte zählen doppelt!", names: ["Fest der guten Vorsätze", "Fest der Umarmungen", "Fest der Knospen", "Fest der Drachen", "Fest der Blumen", "Fest der Glühwürmchen", "Fest am Meer", "Fest der Sternschnuppen", "Fest der neuen Hefte", "Fest der bunten Blätter", "Fest der Kuscheldecken", "Fest der Lichterketten"] },
  shield: { T: "Serienschilde", P: "Wenn du einen Tag verpasst, schützt ein Schild automatisch deine Serie.", have: (n) => n === 1 ? "Du hast 1 Schild" : `Du hast ${n} Schilde`, saved: "Ein Schild hat deine Serie geschützt!" },
  rep: {
    T: "Dein Monat", goals: (n) => n === 1 ? "1 Ziel geschafft" : `${n} Ziele geschafft`, days: (n) => n === 1 ? "1 aktiver Tag" : `${n} aktive Tage`, top: (g) => `Deine stärkste Gewohnheit: ${g}`, none: "Diesen Monat gibt es noch nichts zu erzählen: Schaffe dein erstes Ziel!",
    full: "Ganzer Bericht", fullT: (m) => `Dein Bericht für ${m}`, weeks: "Ziele Woche für Woche", moods: "Deine Stimmung", cats: "Wofür du am meisten gesorgt hast", habits: "Deine stärksten Gewohnheiten", tipT: (n) => `Der Tipp von ${n}`,
    tips: { body: "Dein Körper kam diesen Monat etwas kurz: Wie wäre es mit einem kleinen Spaziergang oder einem Glas Wasser mehr?", mind: "Denk an deinen Kopf: Eine Minute bewusstes Atmen am Tag wirkt Wunder.", home: "Eine kleine Geste für dein Zuhause, wie das Bett machen, macht die Tage leichter.", people: "Schreib jemandem, den du gernhast: Schon eine kurze Nachricht wärmt das Herz.", work: "Gönn dir ab und zu eine echte Pause: Sie gibt dir neue Kraft.", sleep: "Schlaf ist eine Superkraft: Versuch, den Bildschirm etwas früher auszuschalten.", custom: "Deine eigenen Ziele sind wertvoll: Mach weiter so." },
    plusOnly: "Der ganze Bericht gehört zu Tanetto Plus"
  },
  coll: { T: (m) => `Kollektion ${m}`, P: "Exklusive Objekte von Tanetto Plus, nur diesen Monat.", get: "Holen", unlock: "Mit Plus freischalten" },
  worldT: "Weltreise", worldP: (k) => `Exklusive Ausflüge von Tanetto Plus: ${k} wunderschöne Orte zum Entdecken.`,
  wishT: "Wunsch", wishes: ["Ich hab mir etwas für dich gewünscht: dass morgen ein schöner Tag wird.", "Die Laterne fliegt hoch hinauf: Sie bringt uns Glück!", "Wunsch erfüllt: eine ganz, ganz große Umarmung.", "Wie schön, ihr beim Steigen zuzusehen ... genau wie deinen Fortschritten!"],
  festival: { name: "Laternenfest", say: ["Schau mal, so viele Laternen auf dem See!", "Zünden wir unsere auch an?"], tap: "Tippe auf den See, um eine Laterne steigen zu lassen" }
});
Object.assign(T.de.acts2, { wish: "Wunsch" });
Object.assign(T.de.items, { h_lantern: "Laternenhut", h_lantern_gold: "Laternenkrone", w_lanterns: "Laternennacht", lamp_stone: "Steinlaterne", tree_lights: "Lichterbäumchen", rug_autumn: "Herbstteppich", curt_autumn: "Herbstvorhänge", founder_lantern: "Gründerlaterne", rug_moon: "Mondteppich", h_acorn: "Eichelhut", h_beret: "Rote Baskenmütze", w_leaves: "Tanzende Blätter" });
Object.assign(T.de.plus, { perks: ["Keine Werbung, niemals", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Weltreise: ${k} exklusive Ausflüge`, "Der goldene Pfad mit viel schöneren Belohnungen", "Jeden Monat eine exklusive Kollektion", "Jeden Monat 2 Serienschilde", "Jeden Monat 300 Tanì geschenkt und +50 % Tanì durch Ziele", "Der ganze Monatsbericht, illustriert und mit Tipps"] });
Object.assign(T.de.tani, { enough: ["Reicht für ein gewöhnliches Objekt", "Reicht für ein seltenes Objekt", "Reicht für ein episches Objekt", "Reicht für ein legendäres Objekt"] });
T.de.tracks = T.de.tracks.concat(["Leichte Schritte", "Spritziger Morgen", "Decke und Tee", "Seifenblasen", "Ringelreihen", "Sanfte Wolke", "Radtour", "Glühwürmchentanz", "Laternennacht"]);

T.de.world = [
  { name: "Pyramiden von Gizeh", t: "Älter als alt", s: "{n} reitet auf einem Kamel an den Pyramiden von Gizeh vorbei und blinzelt in die goldene Sonne. Die Große Pyramide ist rund 4500 Jahre alt und war fast 4000 Jahre lang das höchste Bauwerk der Welt!" },
  { name: "Santorini", t: "Blaue Kuppeln am Meer", s: "{n} spaziert zwischen weißen Häuschen und blauen Kuppeln, hoch über dem glitzernden Meer. Santorini hat die Form eines Halbmonds, weil die Insel der Rand eines uralten Vulkans ist." },
  { name: "Matterhorn", t: "Der Schokoladenberg", s: "Vor einem Holzchalet trinkt {n} warmen Kakao und schaut hinauf zum Matterhorn. Seine Spitze ist so berühmt, dass sie auf einer bekannten Schweizer Schokolade abgebildet ist!" },
  { name: "Norwegische Fjorde", t: "Wo Gletscher das Meer formten", s: "{n} fährt mit einem kleinen Boot zwischen hohen grünen Felswänden und zählt die Wasserfälle. Diese langen, tiefen Fjorde haben riesige Gletscher in der Eiszeit geformt." },
  { name: "Lappland", t: "Tanzende Lichter", s: "Unter wirbelnden grünen Nordlichtern sagt {n} einer Rentierfamilie Hallo. Wusstest du das? Bei Rentieren tragen Männchen und Weibchen ein Geweih!" },
  { name: "Island", t: "Der Himmel leuchtet", s: "{n} lauscht einem Wasserfall, während der Himmel grün und rosa leuchtet. Nordlichter entstehen, wenn winzige Teilchen von der Sonne hoch über der Erde auf die Luft treffen." },
  { name: "Sahara", t: "Eine Oase im Sand", s: "Nach einem langen Weg über die Dünen findet {n} eine kühle Oase voller Palmen. Im Höcker eines Kamels ist kein Wasser, sondern Fett: So können Kamele viele Tage ohne Essen auskommen." },
  { name: "Petra", t: "Eine Stadt aus Stein", s: "{n} schleicht durch eine enge Schlucht und sieht plötzlich das Schatzhaus von Petra rosa leuchten. Es wurde vor über 2000 Jahren direkt in den Fels gehauen!" },
  { name: "Safari in Kenia", t: "Hallo, großer Freund", s: "Auf Safari schaut {n} Giraffen beim Knabbern von Akazienblättern zu, mit dem verschneiten Kilimandscharo in der Ferne. Die Zunge einer Giraffe kann fast einen halben Meter lang sein!" },
  { name: "Victoriafälle", t: "Der Rauch, der donnert", s: "{n} spürt die kühle Gischt der Victoriafälle und entdeckt einen Regenbogen im Nebel. Die Menschen dort nennen sie Mosi-oa-Tunya, „der Rauch, der donnert“." },
  { name: "Taj Mahal", t: "Ein Palast aus Licht", s: "{n} sieht zu, wie der Sonnenaufgang das Taj Mahal zartrosa färbt. Sein weißer Marmor scheint im Lauf des Tages die Farbe zu wechseln: rosa am Morgen, weiß am Mittag und golden am Abend." },
  { name: "Angkor Wat", t: "Türme im Morgenlicht", s: "{n} steht früh auf, um die Türme von Angkor Wat bei Sonnenaufgang im Teich gespiegelt zu sehen. Es ist der größte Tempel der Welt und ist sogar auf der Flagge Kambodschas!" },
  { name: "Bali", t: "Grüne Treppen", s: "{n} spaziert an Reisterrassen entlang, die wie riesige grüne Treppen aussehen. Die Bauern teilen sich hier das Wasser mit einem klugen System aus Kanälen, das über 1000 Jahre alt ist." },
  { name: "Malediven", t: "Ein Haus auf dem Wasser", s: "{n} schläft in einer kleinen Hütte auf Pfählen, und direkt darunter schwimmen Fische. Die Malediven bestehen aus etwa 1200 Inseln und sind das flachste Land der Welt." },
  { name: "Great Barrier Reef", t: "Hallo, Clownfisch!", s: "{n} schnorchelt mit Clownfischen und einer sanften Meeresschildkröte zwischen bunten Korallen. Das Great Barrier Reef ist so groß, dass man es aus dem Weltall sehen kann!" },
  { name: "Sydney", t: "Segel am Hafen", s: "{n} fährt mit der Fähre über den Hafen, um das Opernhaus von Sydney aus der Nähe zu sehen. Seine Dächer sehen aus wie Segel und sind mit über einer Million Fliesen bedeckt!" },
  { name: "Banff", t: "Der türkise See", s: "{n} paddelt mit einem roten Kanu über einen See, so blau wie ein Edelstein. Seine Farbe kommt von „Gesteinsmehl“: winzigen Steinkrümeln, die Gletscher zermahlen haben." },
  { name: "Hawaii", t: "Inseln, die noch wachsen", s: "{n} baut eine Sandburg, während in der Ferne ein Vulkan raucht. Wenn Lava ins Meer fließt und abkühlt, entsteht ganz neues Land: Hawaii wächst also immer noch!" },
  { name: "Galápagos", t: "Ein sehr alter Freund", s: "{n} trifft eine Riesenschildkröte, die gemütlich an einem Kaktusblatt knabbert. Diese sanften Riesen können über 100 Jahre alt werden!" },
  { name: "Machu Picchu", t: "Stadt in den Wolken", s: "{n} steigt hinauf nach Machu Picchu, während die Wolken davonziehen, und ein freundliches Lama kommt Hallo sagen. Die Inka haben die Steine so perfekt aneinandergefügt, dass sie gar keinen Mörtel brauchten." },
  { name: "Salar de Uyuni", t: "Spaziergang auf dem Himmel", s: "{n} läuft über den Salar de Uyuni, die größte Salzwüste der Welt. Nach dem Regen wird sie zu einem riesigen Spiegel, und es fühlt sich an, als würde man auf dem Himmel gehen!" },
  { name: "Patagonien", t: "Der rauchende Berg", s: "{n} sieht zu, wie die Granitgipfel des Fitz Roy bei Sonnenaufgang rosa werden. Die Menschen dort nannten ihn Chaltén, „der rauchende Berg“, weil oft Wolken um seine Spitze wirbeln." },
  { name: "Osterinsel", t: "Die Steinriesen", s: "{n} sagt den Moai Guten Morgen, den Steinriesen der Osterinsel. Es gibt fast 1000 von ihnen, und die meisten kehren dem Meer den Rücken zu." },
  { name: "Antarktis", t: "Pinguinparade", s: "{n} watschelt mit einer Gruppe Kaiserpinguine zwischen riesigen Eisbergen umher. Die Pinguinpapas wärmen das Ei etwa zwei Monate lang auf ihren Füßen, mitten im Winter!" }
];
