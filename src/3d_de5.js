Object.assign(T.de, {
  gamesT: "Spiele und Übungen", gamesP: "Kleine Übungen zum Wohlfühlen, gemeinsam.", gameSeedsInfo: (n, m) => `Tanì aus Spielen heute: ${n}/${m}`,
  games: { stars: ["Sterne fangen", "Ein schnelles Spiel zum Wachwerden"], letgo: ["Loslassen", "Pack einen Gedanken in eine Seifenblase und lass ihn davonfliegen"], garden: ["Dankbarkeitsgarten", "Jedes schöne Erlebnis wird zu einer Blume"], wave: ["Atmen mit der Welle", "Halte gedrückt, während die Welle steigt"], sing: ["Sing mit mir", "Wiederhole die Töne deines Begleiters"], stretch: ["Strecken", "Eine Minute Dehnen zusammen"], memory: ["Steinchen-Paare", "Finde die Paare"], tricks: ["Kunststücke", "Was er schon gelernt hat"] },
  start: "Los geht's",
  letgoP: "Schreib einen Gedanken auf, der dich belastet. Er wird nirgends gespeichert.", letgoPh: "z. B. das Meeting morgen", letgoB: "Loslassen", letgoDone: "Davongeflogen. Atme durch: Jetzt ist es ein bisschen leichter.", letgoAgain: "Noch ein Gedanke",
  gardenP: "Schreib etwas Schönes von heute auf: Es wird eine Blume in deinem Garten.", gardenPh: "z. B. Kaffee mit einer Freundin", gardenB: "Blume pflanzen", gardenN: (n) => n === 1 ? "1 Blume" : `${n} Blumen`, gardenEmpty: "Der Garten wartet auf die erste Blume.", gardenDone: "Was für eine schöne Blume! Der Garten wächst mit dir.", gardenList: "Deine Blumen",
  waveP: "Halte gedrückt und atme ein, während die Welle steigt. Lass los und atme aus, wenn sie sinkt. Ganz ruhig.", waveIn: "Gedrückt halten und einatmen", waveOut: "Loslassen und ausatmen", waveScore: (p) => `Im Takt: ${p} %`, waveDone: "Wie ruhig. Dein Atem ist deine Superkraft.",
  singP: "Hör dir die Töne an und wiederhole sie mit den Blumen. Jede Runde kommt einer dazu.", singListen: "Hör zu...", singYou: "Du bist dran!", singEnd: (n) => `Du hast ${n} Töne nacheinander wiederholt!`,
  stretchP: "Sechs langsame Bewegungen, je zehn Sekunden. Hör auf, wenn es wehtut.", stretchDone: "Geschafft! Dein Körper sagt danke.",
  poses: [["Arme zum Himmel", "Streck die Arme nach oben und atme."], ["Nach rechts beugen", "Neig den Oberkörper langsam nach rechts."], ["Nach links beugen", "Jetzt langsam nach links."], ["Lockere Schultern", "Kreise langsam mit den Schultern."], ["Entspannter Nacken", "Neig das Ohr zur Schulter, dann die Seite wechseln."], ["Letzter Atemzug", "Hände auf den Bauch und tief durchatmen."]],
  memP: "Dreh immer zwei Steinchen um und finde die Paare.", memMoves: (n) => `Züge: ${n}`, memEnd: (n) => `Alle Paare in ${n} Zügen!`,
  tricksP: "Mit jedem Level lernt er ein neues Kunststück. Tippe eins an, um es zu sehen.", tricks: ["Hüpfer", "Pirouette", "Tänzchen", "Purzelbaum", "Winken", "Jonglieren", "Regenbogen"], trickNew: (x) => `Neues Kunststück: ${x}!`,
  share: "Teilen", shareText: "Mein Begleiter in Tanetto", shareFallback: "Halte das Bild gedrückt, um es zu speichern, und teile es, wo du willst.", shareLevel: (n, l) => `${n} hat Level ${l} erreicht!`, shareRecord: (n) => `Neuer Rekord: ${n} Punkte!`, shareMaking: "Ich bereite das Bild vor...",
  together: "Und du? Lass uns zusammen einen Snack essen!", togetherBtn: (g) => `Ich auch erledigt: ${g}`,
  ritualT: "Gute-Nacht-Ritual", ritualP: "Drei kleine Gesten vor dem Schlafen. Mach die, die dir gefallen.", ritual: ["Gedämpftes Licht", "Handy weg vom Bett", "Ein schöner Gedanke von heute"], ritualB: "Gute Nacht",
  visit: (f) => `Heute hat mich ${f} besucht!`, visitHi: (f) => `${f} sagt Hallo!`,
  remind: { water: "Hey, jetzt ist ein guter Moment für ein Glas Wasser.", pause: "Wie wäre es mit einer kleinen Pause? Auch fünf Minuten reichen.", sleep: "Es wird spät. Das Bett wartet auf uns.", move: "Vertreten wir uns ein bisschen die Beine?" },
  summaryT: (n) => `Die Zusammenfassung von ${n}`, summary: (g, best) => g ? `Diese Woche hast du ${g} Ziele geschafft. Dein bester Tag war ${best}. Ich bin stolz auf dich!` : "Diese Woche war ruhig. Das ist in Ordnung: Wir starten zusammen neu, Schritt für Schritt.",
  legalT: "Hilfe und Infos", guideB: "So funktioniert's", privB: "Datenschutzerklärung", termsB: "Nutzungsbedingungen", healthB: "Gesundheitshinweis", creditsB: "Credits und Lizenzen", tutAgain: "Einführung nochmal ansehen", ownerMissing: "[vor der Veröffentlichung zu ergänzen]",
  guide: [
    ["Wie funktioniert Tanetto?", "Wähle kleine Ziele, um für dich zu sorgen. Jedes Mal, wenn du eins schaffst, bekommt dein Begleiter Energie und du Tanì."],
    ["Wofür sind die Tanì?", "Mit Tanì richtest du das Zuhause ein und wählst, was dein Begleiter trägt. Du bekommst sie durch Ziele, Geschenke, Abenteuer und Spiele."],
    ["Was ist die Energie?", "Wenn du alle Ziele des Tages schaffst, ist die Energie voll und dein Begleiter kann auf ein Abenteuer gehen. Er kommt mit einer Postkarte zurück."],
    ["Und die Freude?", "Sie steigt, wenn du für dich sorgst und ihr Dinge zusammen macht. Sie sinkt nie von allein: Hier macht dir niemand ein schlechtes Gewissen."],
    ["Was, wenn ich einen Tag auslasse?", "Nicht schlimm. Du kannst einen Ruhetag eintragen, und deine Serie bleibt bestehen. Das Tagesgeschenk fängt einfach wieder von vorne an."],
    ["Was sind die Jahreszeitenfeste?", "In jeder Jahreszeit gewinnst du mit 20 geschafften Zielen eine besondere Mütze für deinen Begleiter."],
    ["Wie teile ich meine Fortschritte?", "Tippe auf „Teilen“ bei der Wochenpostkarte, den Fotos, dem Garten, den Reisepostkarten oder bei einem neuen Level."],
    ["Wo sind meine Daten?", "Nur auf diesem Gerät. Wenn du das Handy wechselst oder die Browserdaten löschst, beginnt dein Fortschritt von vorne."]
  ],
  terms: [
    "Tanetto ist eine kostenlose Testversion, die ohne Gewähr für einen dauerhaften Betrieb bereitgestellt wird. Sie kann sich jederzeit ändern oder eingestellt werden.",
    "Die App hilft dabei, kleine tägliche Gewohnheiten mit einem virtuellen Begleiter aufzubauen, und ersetzt keine ärztliche oder psychologische Beratung.",
    "Was du schreibst, gehört dir und bleibt auf deinem Gerät. Nutze die App entspannt und ohne Druck.",
    "Illustrationen, Texte, Musik und Code von Tanetto sind urheberrechtlich geschützt und dürfen ohne Erlaubnis nicht kopiert oder wiederverwendet werden.",
    "Bei Fragen kannst du dich an den Kontakt in der Datenschutzerklärung wenden."
  ],
  health: [
    "Tanetto ist kein Medizinprodukt und bietet keine Diagnosen, Behandlungen oder Therapien.",
    "Die Atem- und Dehnübungen sind leicht. Hör sofort auf, wenn du Schmerzen, Schwindel oder Unwohlsein spürst, und frag im Zweifel eine Ärztin oder einen Arzt.",
    "Wenn es dir gerade schlecht geht, sprich mit einem Menschen, dem du vertraust, oder mit einer Fachperson. Bei Gefahr ruf sofort die Nummern unten an."
  ],
  credits: [
    "Illustrationen, Figuren, Texte und Musik wurden eigens für Tanetto erstellt.",
    "Schriften: Fredoka und Figtree, lizenziert unter der SIL Open Font License 1.1.",
    "Animationen: GSAP-Bibliothek, kostenlos von Webflow gemäß ihrer Lizenz bereitgestellt.",
    "Die echten Orte auf den Postkarten sind eigene, vereinfachte Illustrationen."
  ],
  tracks: ["Sonniger Morgen", "Spaziergang", "Warmer Tee", "Schlaflied", "Blumenwiese", "Nieselregen", "Langsame Wolken", "Laternen", "Wellen am See", "Stiller Wald", "Fauler Sonntag", "Sternschnuppen"]
});
