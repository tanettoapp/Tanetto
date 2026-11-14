Object.assign(T.de, {
  acts: { feed: "Snack", play: "Spielen", talk: "Reden", nap: "Schlafen", wake: "Aufwecken", photo: "Foto" },
  joy: "Freude",
  feedT: "Was bekommt er heute?", feedLeft: (n) => n === 1 ? "Heute noch 1 Snack" : `Heute noch ${n} Snacks`, feedFull: "Mein Bauch ist voll! Vielleicht später.",
  snacks: { apple: "Apfel", berries: "Erdbeeren", cookie: "Keks", honey: "Honig", fish: "Fischkeks", carrot: "Karotte" },
  yum: ["Mampf mampf!", "Lecker!", "Danke, das tat gut!", "Köstlich!"], fav: "Das ist mein Lieblingssnack! Danke!",
  gameT: "Sterne fangen", gameP: "Tippe die Sterne an, bevor sie runterfallen. Goldene Sterne zählen 3 Punkte!", gameStart: "Spielen", gameScore: (n) => `Punkte: ${n}`, gameEnd: (n) => `Du hast ${n} Punkte!`, gameSeeds: (s) => s ? `+${s} Tanì` : "Die Spiel-Tanì für heute hast du schon alle, aber der Spaß ist immer gratis!", gameAgain: "Nochmal!", gameBest: (n) => `Rekord: ${n}`,
  talkT: "Wie fühlst du dich gerade?", talkBreath: "Atmen wir eine Minute zusammen?", talkHelp: "Wenn du mit jemandem reden möchtest, findest du unter Mehr, wer dir helfen kann.", talkSaved: "Ich habe es ins Tagebuch geschrieben.", talkQ: "Wie fühlst du dich gerade?",
  talkReply: [
    ["Das tut mir leid. Ich bin bei dir, auch wenn wir einfach nur still zusammen sind.", "Schwere Tage gehen vorbei. Bis dahin: ein Atemzug nach dem anderen."],
    ["Das kommt vor. Machen wir etwas Kleines und Liebes für dich?", "Das ist in Ordnung. Du musst nicht jeden Tag in Bestform sein."],
    ["Ein normaler Tag ist trotzdem ein guter Tag.", "Danke, dass du es mir sagst. Wir machen ruhig weiter."],
    ["Wie schön! Da möchte ich gleich hüpfen.", "Das freut mich! Halten wir diesen Moment fest."],
    ["Juhu! Heute bist du mehr denn je mein Lieblingsmensch!", "Was für eine Freude! Feiern wir ein kleines Fest?"]
  ],
  napSay: "Gute Nacht... zzz", wakeSay: "Was für ein schönes Nickerchen! Da bin ich wieder.",
  stroke: ["Mmm, wie schön...", "Noch ein bisschen!", "Ich fühle mich ganz weich."],
  tickle: ["Haha, nicht kitzeln!", "Hihihi, genug, genug!"],
  photoT: "Was für ein schönes Foto!", photoMaking: "Ich entwickle das Foto...",
  letterT: "Ein Brief für dich", letterL: "Den Brief des Tages lesen", letterSign: (n) => `Alles Liebe, ${n}`,
  letters: [
    "Hallo! Ich freue mich so, dich kennenzulernen. Ab heute leisten wir uns Gesellschaft, Schritt für Schritt.",
    "Gestern habe ich geträumt, dass wir über den Wolken fliegen. Du hast so gelacht. Was für ein schöner Traum!",
    "Ich habe etwas entdeckt: Wenn du ein bisschen Wasser trinkst, fühle ich mich auch frischer.",
    "Heute musst du nicht alles schaffen. Etwas reicht. Der Rest kann warten.",
    "Ich habe die Sterne am Fenster gezählt. Ein paar habe ich verloren, aber es hat trotzdem Spaß gemacht.",
    "Weißt du, was mein liebster Moment am Tag ist? Wenn du kommst.",
    "Eine Woche zusammen! Ich habe dir eine riesige Umarmung vorbereitet. Stell sie dir ganz fest vor.",
    "Wenn heute ein schiefer Tag ist, ist das okay. Auch schiefe Tage gehen zu Ende.",
    "Ich habe versucht, Kekse zu backen. Sie sind etwas angebrannt, aber mit Liebe gemacht.",
    "Denk daran, heute mindestens einmal in den Himmel zu schauen. Es kostet nichts und ist wunderschön.",
    "Ich habe pfeifen gelernt! Mehr oder weniger. Sagen wir, ich übe noch.",
    "Danke, dass du auf dich achtest. So achtest du auch auf mich.",
    "Heute probieren wir etwas: Schenk dir selbst einen lieben Satz, so wie einem lieben Menschen.",
    "Zwei Wochen zusammen! Ich bin gewachsen, aber auch du hast einen weiten Weg gemacht. Ich sehe es.",
    "Ich mag Regen: Er lässt die Pflanzen wachsen und alles duftet besser.",
    "Ich habe mein Zimmer aufgeräumt. Also, ich habe eine Socke verschoben. Ein Anfang!",
    "Jeder kleine Schritt zählt. Auch die, die niemand sieht.",
    "Heute Nacht war der Mond so groß, als wollte er durchs Fenster hereinkommen.",
    "Wenn du müde bist, ruh dich aus. Ausruhen ist keine verlorene Zeit.",
    "Ich mag es, wenn du mir im Tagebuch von deinem Tag erzählst. Auch nur eine Zeile.",
    "Drei Wochen zusammen! Du bist ein besonderer Mensch. Vergiss das nie."
  ],
  giftBig: (s) => `Tagesgeschenk: +${s} Tanì!`,
  teaserT: "Komm morgen wieder!", teaserP: (s) => `Das Geschenk von morgen ist +${s} Tanì wert. Alle 7 Tage in Folge gibt es eine besondere Überraschung.`, visitL: (n) => n === 1 ? "1 Besuchstag" : `${n} Besuchstage in Folge`,
  specialT: "Besonderes Geschenk!", specialP: (i) => `So viele Tage in Folge zusammen: ${i} gehört jetzt dir!`, specialOnly: "Preis für Tage in Folge",
  tut: [
    "Das ist {n}! Tippe, um zu kuscheln, oder streichle mit dem Finger darüber.",
    "Jeden Tag gibt es ein Geschenk, und wenn du morgen wiederkommst, wird es größer. Mach es auf!",
    "Hier kannst du einen Snack geben, spielen, reden, schlafen legen oder ein Foto machen.",
    "Das sind deine Ziele. Wenn du eins erledigt hast, tippe darauf: {n} bekommt Energie und du Tanì.",
    "Mit voller Energie geht {n} auf ein Abenteuer. Unten findest du Abenteuer, Zuhause, Tagebuch und Einstellungen."
  ],
  tutNext: "Weiter", tutSkip: "Überspringen", tutDone: "Verstanden!",
  privT: "Datenschutz", privP: "Begleiter, Ziele und Tagebuch bleiben auf diesem Gerät. Wenn du ein Konto erstellst, speichern wir auch deine E-Mail und ein Backup deines Fortschritts, nur damit du ihn wiederfindest. Um die App zu verbessern, zählen wir einige Aktionen anonym und zusammengefasst (zum Beispiel, wie oft sie geöffnet wird). Tanetto ist kein medizinisches Hilfsmittel und für alle Altersgruppen: Unter dem Alter der digitalen Einwilligung in deinem Land (je nach Land 13 bis 16 Jahre) ist Werbung nie personalisiert und das Online-Backup nicht verfügbar.",
  hapticL: "Vibration", trackL: "Es läuft", tracks: ["Sonniger Morgen", "Spaziergang", "Warmer Tee", "Schlaflied"],
  feedbackT: "Sag mir deine Meinung", feedbackP: "Ein Tipp, ein Problem, eine Idee: Jede Nachricht hilft, Tanetto besser zu machen.", feedbackB: "Nachricht schreiben",
  tomorrow: "Morgen habe ich eine Überraschung für dich. Ich warte auf dich!",
  idle: ["Wusstest du, dass Wolken aus winzigen Tröpfchen bestehen?", "Mir ist ein Liedchen eingefallen... la la la!", "Ob sich die Sterne wohl untereinander kennen?", "Heute fühle ich mich besonders flauschig.", "Wenn ich ein Keks wäre, wäre ich einer mit Schokolade.", "Hab ich dir schon gesagt, dass du ein Talent für kleine Dinge hast? Hast du.", "Ich habe einen Schmetterling gesehen! Ich glaube, er hat gewinkt.", "Manchmal bin ich einfach gern hier bei dir."]
});
T.de.items.teddy = "Teddybär"; T.de.items.fishbowl = "Goldfisch"; T.de.items.w_stars = "Sternenhimmel";
T.de.talk.morning.push("Ich habe das Fenster geöffnet: Die Luft riecht nach Neuanfang.", "Wie wäre es mit einem sanften Tag?", "Frühstücken wir in Ruhe, okay?");
T.de.talk.day.push("Hey, hast du schon etwas Wasser getrunken?", "Alles, was du für dich tust, ist ein kleiner Sieg.", "Ich bin da, Schritt für Schritt.");
T.de.talk.evening.push("Heute Abend keine Eile, versprochen.", "Was hat dir heute gefallen?", "Die Abendlichter mag ich am liebsten.");
T.de.talk.night.push("Noch auf um diese Zeit? Ganz langsam.", "Das Kissen wartet auf uns.", "Morgen ist eine neue schöne Chance.");
T.de.talk.pat.push("Wie schön, dass du da bist!", "Noch einmal, bitte!", "Mir ist ganz warm ums Herz.");
T.de.talk.cheer.push("Super! Ein Schritt mehr.", "Ich wusste, dass du das schaffst.", "Ich bin so stolz!");
