/* v10: Stagione 0, sentiero, sfide, feste, scudi, resoconto, collezione, giro del mondo */
Object.assign(T.it, {
  rar: { b: "Base", c: "Comune", r: "Raro", e: "Epico", l: "Leggendario" },
  season: {
    names: { lanterns: "Stagione delle Lanterne" }, zero: "Stagione 0", left: (d) => d === 1 ? "Manca 1 giorno" : `Mancano ${d} giorni`,
    tier: (n, m = 50) => `Tappa ${n} di ${m}`, passi: (n) => `${n} Passi`, next: (n) => `Ancora ${n} Passi alla prossima tappa`, open: "Apri il sentiero", pathT: "Il sentiero della stagione",
    how: "Guadagni Passi solo prendendoti cura di te: 10 per ogni obiettivo, 20 per ogni giornata completa, 100 per ogni sfida della settimana. Nella settimana di festa valgono il doppio.",
    free: "Per tutti", gold: "Fila d'oro", claim: "Prendi", claimed: "Preso", toClaim: (n) => n === 1 ? "1 premio da ritirare" : `${n} premi da ritirare`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 scudo della serie" : `${n} scudi della serie`, got: (x) => `Hai ricevuto: ${x}!`,
    founder: "Fondatore", founderP: "Hai giocato la Stagione 0: questo distintivo e la lanterna d'oro restano tuoi per sempre.", fromPath: "Premio del sentiero",
    goldLock: "La fila d'oro fa parte di Tanetto Plus", chapterT: (n) => `La storia delle lanterne · capitolo ${n}`,
    story: [
      "Stasera {n} ha trovato una lanterna di carta davanti alla porta. Dentro c'era un biglietto: «Ogni piccolo gesto gentile accende una luce». Chissà chi l'ha lasciata...",
      "Ogni volta che ti prendi cura di te, la lanterna brilla un po' di più. {n} l'ha appesa alla finestra: da fuori, dicono, sembra una stellina.",
      "Oggi sono arrivate altre lanterne, una per ogni casa del quartiere. Tutti si chiedono la stessa cosa: chi le porta? {n} ha un sospetto...",
      "Indizio! Sul davanzale ci sono piccole impronte dorate. {n} le ha seguite fino al lago, dove l'acqua riflette mille lucine.",
      "Al lago {n} ha incontrato la Custode delle Lanterne, una vecchia lucciola gentile. «Le lanterne si accendono con la cura che ognuno mette nelle sue giornate», ha detto sorridendo.",
      "È la notte della grande festa: tutte le lanterne salgono in cielo insieme. La tua è tra le più luminose, perché l'hai accesa giorno dopo giorno. Grazie per questa stagione insieme."
    ]
  },
  wk: {
    T: "Sfida della settimana", goals: (n) => `Completa ${n} obiettivi questa settimana`, days: (n) => `Completa almeno 2 obiettivi in ${n} giorni diversi`, full: (n) => `Completa tutti gli obiettivi del giorno per ${n} giorni`, cat: (n, c) => `Completa ${n} obiettivi della categoria «${c}»`,
    prog: (a, b) => `${a} di ${b}`, reward: (t, p) => `Premio: ${t} Tanì e ${p} Passi`, claim: "Ritira il premio", done: "Sfida completata! La prossima arriva lunedì.", ends: (d) => d <= 1 ? "Ultimo giorno" : `Termina tra ${d} giorni`
  },
  festa: { P: "Settimana di festa: i Passi valgono il doppio!", names: ["Festa dei Buoni Propositi", "Festa degli Abbracci", "Festa dei Germogli", "Festa degli Aquiloni", "Festa dei Fiori", "Festa delle Lucciole", "Festa del Mare", "Festa delle Stelle Cadenti", "Festa dei Quaderni Nuovi", "Festa delle Foglie", "Festa delle Coperte", "Festa delle Lucine"] },
  shield: { T: "Scudi della serie", P: "Se salti un giorno, uno scudo protegge la tua serie in automatico.", have: (n) => n === 1 ? "Hai 1 scudo" : `Hai ${n} scudi`, saved: "Uno scudo ha protetto la tua serie!" },
  rep: {
    T: "Il tuo mese", goals: (n) => n === 1 ? "1 obiettivo completato" : `${n} obiettivi completati`, days: (n) => n === 1 ? "1 giorno attivo" : `${n} giorni attivi`, top: (g) => `L'abitudine più forte: ${g}`, none: "Ancora niente da raccontare questo mese: completa il primo obiettivo!",
    full: "Resoconto completo", fullT: (m) => `Il resoconto di ${m}`, weeks: "Obiettivi settimana per settimana", moods: "Il tuo umore", cats: "Dove hai messo più cura", habits: "Le tue abitudini più forti", tipT: (n) => `Il consiglio di ${n}`,
    tips: { body: "Questo mese il corpo ha avuto poco spazio: prova ad aggiungere una breve passeggiata o un bicchiere d'acqua in più.", mind: "Ricordati della mente: un minuto di respiro al giorno fa grandi cose.", home: "Un piccolo gesto per la casa, come rifare il letto, rende le giornate più leggere.", people: "Scrivi a qualcuno a cui vuoi bene: anche un messaggio corto scalda il cuore.", work: "Prova a fare una pausa vera ogni tanto: ricarica le energie.", sleep: "Il sonno è un superpotere: prova a spegnere lo schermo un po' prima.", custom: "I tuoi obiettivi personali sono preziosi: continua così." },
    plusOnly: "Il resoconto completo fa parte di Tanetto Plus"
  },
  coll: { T: (m) => `Collezione di ${m}`, P: "Oggetti esclusivi di Tanetto Plus, solo per questo mese.", get: "Prendi", unlock: "Sblocca con Plus" },
  worldT: "Giro del mondo", worldP: (k) => `Gite esclusive di Tanetto Plus: ${k} luoghi meravigliosi da scoprire.`,
  wishT: "Desiderio", wishes: ["Ho espresso un desiderio per te: che domani sia una bella giornata.", "La lanterna vola alta: ci porterà fortuna!", "Desiderio esaudito: un abbraccio grande grande.", "Che bello guardarla salire... come i tuoi progressi!"],
  festival: { name: "Festa delle Lanterne", say: ["Guarda quante lanterne sul lago!", "Accendiamo anche la nostra?"], tap: "Tocca il lago per liberare una lanterna" }
});
Object.assign(T.it.acts2, { wish: "Desiderio" });
Object.assign(T.it.items, { h_lantern: "Cappello lanterna", h_lantern_gold: "Corona delle lanterne", w_lanterns: "Notte di lanterne", lamp_stone: "Lanterna di pietra", tree_lights: "Alberello di lucine", rug_autumn: "Tappeto d'autunno", curt_autumn: "Tende d'autunno", founder_lantern: "Lanterna dei Fondatori", rug_moon: "Tappeto della luna", h_acorn: "Cappello ghianda", h_beret: "Basco rosso", w_leaves: "Foglie danzanti" });
Object.assign(T.it.plus, { perks: ["Niente pubblicità, mai", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Giro del mondo: ${k} gite esclusive`, "La fila d'oro del sentiero, con premi molto più belli", "Una collezione esclusiva ogni mese", "2 scudi della serie ogni mese", "300 Tanì in regalo ogni mese e +50% di Tanì dagli obiettivi", "Il resoconto completo del mese, illustrato e con consigli"] });
Object.assign(T.it.tani, { enough: ["Basta per un oggetto comune", "Basta per un oggetto raro", "Basta per un oggetto epico", "Basta per un oggetto leggendario"] });

Object.assign(T.en, {
  rar: { b: "Basic", c: "Common", r: "Rare", e: "Epic", l: "Legendary" },
  season: {
    names: { lanterns: "Season of Lanterns" }, zero: "Season 0", left: (d) => d === 1 ? "1 day left" : `${d} days left`,
    tier: (n, m = 50) => `Step ${n} of ${m}`, passi: (n) => `${n} Steps`, next: (n) => `${n} more Steps to the next stop`, open: "Open the path", pathT: "The season path",
    how: "You earn Steps only by taking care of yourself: 10 for each goal, 20 for each complete day, 100 for each weekly challenge. During the festival week they're worth double.",
    free: "For everyone", gold: "Golden path", claim: "Claim", claimed: "Claimed", toClaim: (n) => n === 1 ? "1 reward to claim" : `${n} rewards to claim`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 streak shield" : `${n} streak shields`, got: (x) => `You got: ${x}!`,
    founder: "Founder", founderP: "You played Season 0: this badge and the golden lantern are yours forever.", fromPath: "Path reward",
    goldLock: "The golden path is part of Tanetto Plus", chapterT: (n) => `The story of the lanterns · chapter ${n}`,
    story: [
      "Tonight {n} found a paper lantern by the door. Inside there was a note: \"Every small kind gesture lights a light.\" Who could have left it?",
      "Every time you take care of yourself, the lantern glows a little brighter. {n} hung it in the window: from outside, they say, it looks like a little star.",
      "Today more lanterns arrived, one for every house in the neighbourhood. Everyone is asking the same thing: who brings them? {n} has a hunch...",
      "A clue! There are tiny golden footprints on the windowsill. {n} follows them all the way to the lake, where the water reflects a thousand little lights.",
      "At the lake {n} meets the Keeper of Lanterns, a kind old firefly. \"Lanterns light up with the care each of us puts into our days,\" she says with a smile.",
      "It's the night of the great festival: all the lanterns rise into the sky together. Yours is one of the brightest, because you lit it day after day. Thank you for this season together."
    ]
  },
  wk: {
    T: "Weekly challenge", goals: (n) => `Complete ${n} goals this week`, days: (n) => `Complete at least 2 goals on ${n} different days`, full: (n) => `Complete all of the day's goals on ${n} days`, cat: (n, c) => `Complete ${n} goals in the «${c}» category`,
    prog: (a, b) => `${a} of ${b}`, reward: (t, p) => `Reward: ${t} Tanì and ${p} Steps`, claim: "Claim reward", done: "Challenge complete! The next one arrives on Monday.", ends: (d) => d <= 1 ? "Last day" : `Ends in ${d} days`
  },
  festa: { P: "Festival week: Steps are worth double!", names: ["New Starts Festival", "Hugs Festival", "Sprouts Festival", "Kites Festival", "Flowers Festival", "Fireflies Festival", "Seaside Festival", "Shooting Stars Festival", "Fresh Notebooks Festival", "Falling Leaves Festival", "Cosy Blankets Festival", "Twinkly Lights Festival"] },
  shield: { T: "Streak shields", P: "If you miss a day, a shield protects your streak automatically.", have: (n) => n === 1 ? "You have 1 shield" : `You have ${n} shields`, saved: "A shield protected your streak!" },
  rep: {
    T: "Your month", goals: (n) => n === 1 ? "1 goal completed" : `${n} goals completed`, days: (n) => n === 1 ? "1 active day" : `${n} active days`, top: (g) => `Your strongest habit: ${g}`, none: "Nothing to tell yet this month: complete your first goal!",
    full: "Full report", fullT: (m) => `Your ${m} report`, weeks: "Goals week by week", moods: "Your mood", cats: "Where you put the most care", habits: "Your strongest habits", tipT: (n) => `${n}'s tip`,
    tips: { body: "Your body got little space this month: try adding a short walk or an extra glass of water.", mind: "Remember your mind: one minute of breathing a day does wonders.", home: "A small gesture for your home, like making the bed, makes days feel lighter.", people: "Write to someone you care about: even a short message warms the heart.", work: "Try taking a real break now and then: it recharges you.", sleep: "Sleep is a superpower: try switching off the screen a little earlier.", custom: "Your personal goals are precious: keep going." },
    plusOnly: "The full report is part of Tanetto Plus"
  },
  coll: { T: (m) => `${m} collection`, P: "Exclusive Tanetto Plus items, this month only.", get: "Get", unlock: "Unlock with Plus" },
  worldT: "Around the world", worldP: (k) => `Exclusive Tanetto Plus trips: ${k} wonderful places to discover.`,
  wishT: "Wish", wishes: ["I made a wish for you: may tomorrow be a lovely day.", "The lantern flies high: it'll bring us luck!", "Wish granted: a big, big hug.", "Watching it rise is so lovely... just like your progress!"],
  festival: { name: "Lantern Festival", say: ["Look at all the lanterns on the lake!", "Shall we light ours too?"], tap: "Tap the lake to release a lantern" }
});
Object.assign(T.en.acts2, { wish: "Wish" });
Object.assign(T.en.items, { h_lantern: "Lantern hat", h_lantern_gold: "Crown of lanterns", w_lanterns: "Night of lanterns", lamp_stone: "Stone lantern", tree_lights: "Twinkly little tree", rug_autumn: "Autumn rug", curt_autumn: "Autumn curtains", founder_lantern: "Founders' lantern", rug_moon: "Moon rug", h_acorn: "Acorn hat", h_beret: "Red beret", w_leaves: "Dancing leaves" });
Object.assign(T.en.plus, { perks: ["No ads, ever", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Around the world: ${k} exclusive trips`, "The golden path, with much better rewards", "An exclusive collection every month", "2 streak shields every month", "300 Tanì gifted every month and +50% Tanì from goals", "The full monthly report, illustrated and with tips"] });
Object.assign(T.en.tani, { enough: ["Enough for a common item", "Enough for a rare item", "Enough for an epic item", "Enough for a legendary item"] });
T.it.tracks = T.it.tracks.concat(["Passi leggeri", "Mattino frizzante", "Coperta e tè", "Bolle di sapone", "Girotondo", "Nuvola gentile", "In bicicletta", "Danza delle lucciole", "Notte delle lanterne"]);
T.en.tracks = T.en.tracks.concat(["Light steps", "Fizzy morning", "Blanket and tea", "Soap bubbles", "Ring-a-round", "Gentle cloud", "Bike ride", "Firefly dance", "Lantern night"]);
