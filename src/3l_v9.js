/* v9: Tanì, Tanetto Plus, gite, chat, accessibilità, benvenuto */
Object.assign(T.it, {
  tagline: "Un passo alla volta, insieme.",
  tani: {
    shopT: "Prendi Tanì", shopP: "I Tanì si guadagnano ogni giorno con le buone abitudini. Se vuoi arrivare prima a un oggetto, puoi prenderne un pacchetto.",
    packs: ["Manciata", "Sacchetto", "Cesto", "Forziere"], bonus: (n) => `+${n}% in regalo`, best: "Il più conveniente", buy: "Compra",
    soonT: "Arriva presto!", soonP: "Gli acquisti arriveranno con l'app sugli store. Grazie: abbiamo preso nota che ti interessa!", gift: (n) => `Intanto, un regalo per te: +${n} Tanì`, get: "Prendi Tanì", close: "Chiudi"
  },
  plus: {
    name: "Tanetto Plus", tag: "Più avventure, più compagnia, più te.",
yearly: "Annuale", monthly: "Mensile", perYear: (p) => `${p} all'anno`, perMonth: (p) => `${p} al mese`, yearNote: (p) => `solo ${p} al mese`, save: (n) => `Risparmi il ${n}%`, popular: "Il più scelto",
    trial: "Prova gratis per 7 giorni", after: (p) => `Poi ${p}. Disdici quando vuoi.`,
    soonT: "Tanetto Plus arriva presto!", soonP: "Arriverà con l'app sugli store. Ti abbiamo messo in lista: grazie!", preview: "Intanto, oggi tutte le gite sono gratis: buon viaggio!",
    card: "Scopri Tanetto Plus", cardP: "Gite per il mondo, compagni esclusivi e tanto altro.", badge: "Plus", sceneLock: "Questa gita fa parte di Tanetto Plus"
  },
  scenes2: { beach: "Spiaggia", camp: "Campeggio", snow: "Montagna" },
  sceneSay: { beach: ["Senti il rumore delle onde? Che pace.", "Sabbia tra le zampe: che bello!"], camp: ["Che bello dormire sotto le stelle.", "Il bosco profuma di avventura!"], snow: ["Brrr! Ma che panorama!", "Facciamo un pupazzo di neve?"] },
  obj2: { shell: ["Ho trovato una conchiglia! Senti, dentro c'è il mare.", "Questa la teniamo come ricordo."], fire: ["Un marshmallow abbrustolito per te!", "Il fuoco scalda anche il cuore."], snowman: ["Gli metto una carota per naso!", "Il nostro pupazzo ti saluta!"] },
  chat: {
    open: (n) => `Scrivi a ${n}`, T: (n) => `Chiacchiere con ${n}`, ph: "Scrivi un messaggio...", send: "Invia", typing: (n) => `${n} sta scrivendo...`,
    hello: (n) => `Ciao! Sono ${n}. Raccontami come stai: ti ascolto.`,
    note: "Le risposte sono preparate con cura e i messaggi non vengono salvati.",
    prog: (d, t, s) => t ? `Oggi hai completato ${d} obiettivi su ${t}${s > 1 ? ` e sei a ${s} giorni di fila` : ""}. ${d >= t ? "Giornata piena: sono fiero di te!" : "Ne basta uno alla volta: ce la fai!"}` : `Oggi è un giorno libero${s > 1 ? `, e sei a ${s} giorni di fila` : ""}. Goditelo!`,
    who: (n, food) => `Sono ${n}, il tuo compagno! Mi piacciono le coccole, le avventure e soprattutto ${food}.`,
    crisis: "Mi dispiace tanto che tu stia così. Quello che provi conta, e meriti aiuto adesso. Per favore parla subito con una persona di cui ti fidi, oppure chiama uno di questi numeri:",
    R: {
      greet: ["Ciao! Che bello leggerti. Come va oggi?", "Ehi, eccoti! Ti stavo aspettando.", "Ciao ciao! Raccontami qualcosa della tua giornata."],
      bye: ["A presto! Io resto qui ad aspettarti.", "Ciao! Ricordati di bere un po' d'acqua.", "A dopo! Ti mando un abbraccio."],
      sad: ["Mi dispiace che tu sia giù. Sono qui con te. Vuoi raccontarmi cosa è successo?", "Le giornate pesanti passano, anche se ora non sembra. Un respiro lento insieme?", "Ti mando un abbraccio grande grande. Anche fare una piccola cosa per te oggi va benissimo."],
      anxious: ["Respiriamo insieme: dentro per 4, fuori per 6. Ancora una volta. Va meglio?", "L'ansia è come un'onda: sale, ma poi scende. Io resto qui con te.", "Prova a guardarti intorno e trova 5 cose che vedi. Ti aiuta a tornare qui, adesso."],
      stressed: ["Tanta roba, eh? Facciamo una cosa alla volta, la più piccola per prima.", "Anche una pausa di 5 minuti è produttiva. Ti va di prenderla?", "Stai facendo del tuo meglio, e si vede. Ricordati di bere e di sgranchirti un po'."],
      tired: ["Allora oggi andiamo piano. Riposare è prendersi cura di sé.", "Un bicchiere d'acqua e due minuti a occhi chiusi? Ti aspetto qui.", "Sei stanco o stanca? Va benissimo fermarsi un po'. Domani ripartiamo."],
      angry: ["Capisco, a volte le cose fanno proprio arrabbiare. Vuoi sfogarti con me?", "Proviamo a scaricare un po': stringi i pugni forte per 5 secondi, poi lasciali andare.", "È giusto sentire rabbia. Respiriamo un attimo, poi decidi tu cosa fare."],
      lonely: ["Non sei da solo o da sola: ci sono io, e ci sarò domani.", "Che ne dici di scrivere un messaggio a qualcuno a cui vuoi bene? Anche solo un ciao.", "Ti faccio compagnia io. Raccontami qualcosa di bello che ti è successo di recente."],
      happy: ["Che bello! La tua felicità mi fa saltellare di gioia!", "Evviva! Raccontami tutto!", "Mi piace quando stai bene. Ricordati di questo momento!"],
      proud: ["Bravissimo o bravissima, davvero! Ogni passo conta.", "Hai visto? Ce l'hai fatta! Sono orgogliosissimo di te.", "Questo merita una festa: batti cinque!"],
      bored: ["Facciamo un gioco insieme? Tocca «Gioca»!", "Che ne dici di una passeggiata breve? Anche 5 minuti cambiano l'umore.", "Potresti scrivere nel diario una cosa bella di oggi."],
      thanks: ["Grazie a te! Mi rendi un compagno felice.", "Di niente! Sono qui apposta.", "Sei tu che fai tutto il lavoro, io faccio il tifo!"],
      love: ["Anche io ti voglio tanto bene!", "Oooh, mi hai fatto arrossire!", "Sei la persona più speciale per me."],
      sleep: ["Buonanotte! Spegni lo schermo e respira piano. Domani ci vediamo.", "Un buon sonno è il superpotere più sottovalutato. Sogni d'oro!", "Prova a lasciare il telefono lontano dal letto stanotte."],
      hungry: ["Anche io ho un languorino! Uno spuntino sano?", "Mangiare con calma è un modo per volersi bene.", "Ti va di dividere una merenda con me? Tocca «Merenda»!"],
      drink: ["Ottima idea: un bel bicchiere d'acqua! Io bevo con te.", "Glu glu glu! L'acqua fa bene a tutto, anche all'umore.", "Ricordati: un sorso ogni tanto, anche se non hai sete."],
      joke: ["Sai perché il pomodoro non riesce a dormire? Perché l'insalata russa!", "Cosa fa un gatto in palestra? Il miao-sollevamento pesi!", "Qual è il colmo per un giardiniere? Avere un cuore di pietra... e piantarla lì!"],
      help: ["Scegli piccoli obiettivi e completali ogni giorno: io prendo energia e tu guadagni Tanì per la casetta. In «Altro» trovi la guida completa.", "Puoi giocare con me, darmi la merenda, farmi una foto e portarmi in avventura. Prova lo schermo intero nella stanza!"],
      default: ["Ti ascolto. Me ne racconti di più?", "Capito! Sai che anche un piccolo gesto per te, oggi, conta tanto?", "Mi piace quando mi scrivi. Com'è andata la giornata?", "Hmm, non sono sicuro di aver capito, ma sono qui con te."]
    },
    K: {
      crisis: ["suicid", "uccidermi", "ammazzarmi", "farla finita", "togliermi la vita", "non voglio piu vivere", "voglio morire", "farmi del male", "autolesion", "tagliarmi", "non ha senso vivere"],
      bye: ["ciao ciao", "a dopo", "a domani", "devo andare", "arrivederci", "a presto"],
      sad: ["triste", "piango", "pianto", "giu di morale", "depress", "infelice", "sto male", "non sto bene", "giornata brutta", "giornataccia"],
      anxious: ["ansia", "ansios", "paura", "preoccup", "agitat", "panico"],
      stressed: ["stress", "esame", "troppo da fare", "sotto pressione", "scadenz", "troppo lavoro"],
      tired: ["stanc", "esaust", "sfinit", "non ce la faccio", "distrutt"],
      angry: ["arrabbiat", "rabbia", "odio", "furios", "mi fa impazzire"],
      lonely: ["mi sento solo", "mi sento sola", "solitudine", "nessuno mi", "abbandonat", "sono solo", "sono sola"],
      proud: ["ce l'ho fatta", "fatto tutto", "completato", "orgoglios", "ci sono riuscit", "ho finito"],
      happy: ["felice", "contento", "contenta", "benissimo", "alla grande", "gioia", "evviva", "sto bene", "che bello"],
      thanks: ["grazie", "ti ringrazio"],
      love: ["ti voglio bene", "ti amo", "sei bellissim", "sei dolce", "ti adoro", "sei carin"],
      sleep: ["dormire", "buonanotte", "letto", "insonnia", "notte"],
      hungry: ["fame", "mangiare", "cibo", "merenda", "pranzo", "cena", "colazione"],
      drink: ["acqua", "sete", "bere"],
      progress: ["obiettiv", "progress", "come sto andando", "serie", "livello"],
      who: ["chi sei", "come ti chiami", "cosa sei", "cosa ti piace", "quanti anni"],
      joke: ["barzellett", "fammi ridere", "battuta", "divertimi", "fai ridere"],
      help: ["come funziona", "cosa posso fare", "istruzioni", "non capisco l'app"],
      bored: ["noia", "annoi", "che barba", "non so cosa fare"],
      greet: ["ciao", "buongiorno", "buonasera", "salve", "ehi", "hey"]
    }
  },
  a11y: { T: "Accessibilità", big: "Testo più grande", calm: "Meno animazioni", calmP: "Tanetto si riapre per applicare la modifica." }
});

Object.assign(T.en, {
  tagline: "One small step at a time, together.",
  tani: {
    shopT: "Get Tanì", shopP: "You earn Tanì every day with good habits. If you want to reach an item sooner, you can get a pack.",
    packs: ["Handful", "Pouch", "Basket", "Treasure chest"], bonus: (n) => `+${n}% bonus`, best: "Best value", buy: "Buy",
    soonT: "Coming soon!", soonP: "Purchases will arrive with the app in the stores. Thank you: we've noted that you're interested!", gift: (n) => `Meanwhile, a gift for you: +${n} Tanì`, get: "Get Tanì", close: "Close"
  },
  plus: {
    name: "Tanetto Plus", tag: "More adventures, more company, more you.",
yearly: "Yearly", monthly: "Monthly", perYear: (p) => `${p} per year`, perMonth: (p) => `${p} per month`, yearNote: (p) => `just ${p} a month`, save: (n) => `Save ${n}%`, popular: "Most popular",
    trial: "Try free for 7 days", after: (p) => `Then ${p}. Cancel anytime.`,
    soonT: "Tanetto Plus is coming soon!", soonP: "It will arrive with the app in the stores. We've added you to the list: thank you!", preview: "Meanwhile, all trips are free for you today: have fun!",
    card: "Discover Tanetto Plus", cardP: "Trips around the world, exclusive companions and much more.", badge: "Plus", sceneLock: "This trip is part of Tanetto Plus"
  },
  scenes2: { beach: "Beach", camp: "Campsite", snow: "Mountain" },
  sceneSay: { beach: ["Can you hear the waves? So peaceful.", "Sand between my paws: I love it!"], camp: ["Sleeping under the stars is the best.", "The forest smells like adventure!"], snow: ["Brrr! But what a view!", "Shall we build a snowman?"] },
  obj2: { shell: ["I found a shell! Listen, the sea is inside.", "Let's keep this one as a souvenir."], fire: ["A toasted marshmallow for you!", "The fire warms the heart too."], snowman: ["Let's give him a carrot nose!", "Our snowman says hi!"] },
  chat: {
    open: (n) => `Write to ${n}`, T: (n) => `Chatting with ${n}`, ph: "Write a message...", send: "Send", typing: (n) => `${n} is typing...`,
    hello: (n) => `Hi! I'm ${n}. Tell me how you're doing: I'm listening.`,
    note: "Replies are carefully prepared and your messages are not saved.",
    prog: (d, t, s) => t ? `Today you've completed ${d} of ${t} goals${s > 1 ? ` and you're on a ${s}-day streak` : ""}. ${d >= t ? "A full day: I'm so proud of you!" : "One at a time is enough: you've got this!"}` : `Today is a free day${s > 1 ? `, and you're on a ${s}-day streak` : ""}. Enjoy it!`,
    who: (n, food) => `I'm ${n}, your companion! I love cuddles, adventures and most of all ${food}.`,
    crisis: "I'm so sorry you're feeling this way. What you feel matters, and you deserve help right now. Please talk to someone you trust straight away, or call one of these numbers:",
    R: {
      greet: ["Hi! So nice to hear from you. How's today going?", "Hey, there you are! I was waiting for you.", "Hello! Tell me something about your day."],
      bye: ["See you soon! I'll be right here.", "Bye! Remember to drink some water.", "Talk later! Sending you a hug."],
      sad: ["I'm sorry you're feeling down. I'm here with you. Do you want to tell me what happened?", "Heavy days pass, even if it doesn't feel like it now. A slow breath together?", "Sending you a big, big hug. Doing just one small thing for yourself today is more than enough."],
      anxious: ["Let's breathe together: in for 4, out for 6. Once more. A little better?", "Anxiety is like a wave: it rises, but then it falls. I'm staying right here with you.", "Try looking around and finding 5 things you can see. It helps you come back to the here and now."],
      stressed: ["That's a lot, huh? Let's do one thing at a time, the smallest one first.", "Even a 5-minute break is productive. Want to take one?", "You're doing your best, and it shows. Remember to drink and stretch a little."],
      tired: ["Then let's take it slow today. Resting is taking care of yourself.", "A glass of water and two minutes with your eyes closed? I'll wait here.", "Feeling tired? It's perfectly fine to stop for a bit. We'll start again tomorrow."],
      angry: ["I get it, sometimes things are really frustrating. Want to let it out with me?", "Let's release some of it: squeeze your fists tight for 5 seconds, then let go.", "It's okay to feel angry. Let's breathe for a moment, then you decide what to do."],
      lonely: ["You're not alone: I'm here, and I'll be here tomorrow too.", "How about sending a message to someone you care about? Even just a hello.", "I'll keep you company. Tell me about something nice that happened recently."],
      happy: ["Yay! Your happiness makes me bounce with joy!", "Hooray! Tell me everything!", "I love it when you're doing well. Remember this moment!"],
      proud: ["Well done, really! Every step counts.", "See? You did it! I'm so proud of you.", "This calls for a celebration: high five!"],
      bored: ["Shall we play a game together? Tap «Play»!", "How about a short walk? Even 5 minutes can lift your mood.", "You could write one nice thing about today in your diary."],
      thanks: ["Thank you! You make me a happy companion.", "Anytime! That's what I'm here for.", "You do all the work, I'm just cheering you on!"],
      love: ["I love you lots too!", "Aww, you made me blush!", "You're the most special person to me."],
      sleep: ["Good night! Put the screen away and breathe slowly. See you tomorrow.", "Good sleep is the most underrated superpower. Sweet dreams!", "Try leaving your phone away from the bed tonight."],
      hungry: ["I'm a bit peckish too! A healthy snack?", "Eating slowly is a way of being kind to yourself.", "Want to share a snack with me? Tap «Snack»!"],
      drink: ["Great idea: a nice glass of water! I'll drink with you.", "Glug glug! Water is good for everything, even your mood.", "Remember: a sip now and then, even if you're not thirsty."],
      joke: ["Why did the scarecrow win an award? Because he was outstanding in his field!", "What do you call a sleeping bull? A bulldozer!", "Why don't eggs tell jokes? They'd crack each other up!"],
      help: ["Pick small goals and complete them every day: I get energy and you earn Tanì for the home. You'll find the full guide in «More».", "You can play with me, give me a snack, take my photo and send me on adventures. Try full screen in the room!"],
      default: ["I'm listening. Tell me more?", "Got it! Did you know that even a small gesture for yourself today means a lot?", "I love it when you write to me. How was your day?", "Hmm, I'm not sure I understood, but I'm here with you."]
    },
    K: {
      crisis: ["suicid", "kill myself", "end my life", "end it all", "want to die", "don't want to live", "dont want to live", "hurt myself", "self harm", "self-harm", "cut myself", "no reason to live"],
      bye: ["bye", "goodbye", "see you", "gotta go", "talk later", "good bye"],
      sad: ["sad", "crying", "cry", "depress", "unhappy", "feel bad", "not okay", "not ok", "awful day", "bad day", "down today"],
      anxious: ["anxious", "anxiety", "scared", "afraid", "worried", "worry", "panic", "nervous"],
      stressed: ["stress", "exam", "too much to do", "pressure", "deadline", "overwhelm", "workload"],
      tired: ["tired", "exhausted", "sleepy", "worn out", "can't anymore", "drained"],
      angry: ["angry", "mad at", "furious", "hate", "annoyed", "pissed"],
      lonely: ["lonely", "alone", "no one", "nobody", "left out"],
      proud: ["i did it", "did it all", "completed", "proud", "finished", "managed to"],
      happy: ["happy", "glad", "great", "awesome", "amazing", "good day", "feeling good", "yay"],
      thanks: ["thank", "thx", "thanks"],
      love: ["love you", "you're cute", "youre cute", "adore you", "you're sweet"],
      sleep: ["sleep", "good night", "goodnight", "bed", "insomnia"],
      hungry: ["hungry", "food", "eat", "snack", "lunch", "dinner", "breakfast"],
      drink: ["water", "thirsty", "drink"],
      progress: ["goal", "progress", "how am i doing", "streak", "level"],
      who: ["who are you", "your name", "what are you", "what do you like", "how old"],
      joke: ["joke", "make me laugh", "funny", "something fun"],
      help: ["how does it work", "how do i", "what can i do", "instructions", "help me use"],
      bored: ["bored", "boring", "nothing to do"],
      greet: ["hello", "hi", "hey", "good morning", "good evening", "hiya"]
    }
  },
  a11y: { T: "Accessibility", big: "Larger text", calm: "Fewer animations", calmP: "Tanetto will reopen to apply the change." }
});
Object.assign(T.it.acts2, { chat: "Scrivimi" });
Object.assign(T.en.acts2, { chat: "Chat" });

Object.assign(T.de, {
  tagline: "Ein kleiner Schritt nach dem anderen, gemeinsam.",
  tani: {
    shopT: "Tanì holen", shopP: "Die Tanì verdienst du jeden Tag mit guten Gewohnheiten. Wenn du ein Objekt schneller erreichen willst, kannst du dir ein Paket holen.",
    packs: ["Handvoll", "Beutel", "Korb", "Schatztruhe"], bonus: (n) => `+${n} % gratis`, best: "Bestes Angebot", buy: "Kaufen",
    soonT: "Kommt bald!", soonP: "Käufe kommen zusammen mit der App in die Stores. Danke: Wir haben uns notiert, dass du Interesse hast!", gift: (n) => `Bis dahin ein Geschenk für dich: +${n} Tanì`, get: "Tanì holen", close: "Schließen"
  },
  plus: {
    name: "Tanetto Plus", tag: "Mehr Abenteuer, mehr Gesellschaft, mehr du.",
yearly: "Jährlich", monthly: "Monatlich", perYear: (p) => `${p} pro Jahr`, perMonth: (p) => `${p} pro Monat`, yearNote: (p) => `nur ${p} im Monat`, save: (n) => `${n} % sparen`, popular: "Am beliebtesten",
    trial: "7 Tage gratis testen", after: (p) => `Danach ${p}. Jederzeit kündbar.`,
    soonT: "Tanetto Plus kommt bald!", soonP: "Es kommt zusammen mit der App in die Stores. Wir haben dich auf die Liste gesetzt: Danke!", preview: "Bis dahin sind heute alle Ausflüge für dich gratis: Viel Spaß!",
    card: "Entdecke Tanetto Plus", cardP: "Reisen um die Welt, exklusive Begleiter und noch viel mehr.", badge: "Plus", sceneLock: "Dieser Ausflug gehört zu Tanetto Plus"
  },
  scenes2: { beach: "Strand", camp: "Zeltplatz", snow: "Berge" },
  sceneSay: { beach: ["Hörst du die Wellen? So friedlich.", "Sand zwischen den Pfoten: herrlich!"], camp: ["Unter den Sternen schlafen ist das Schönste.", "Der Wald riecht nach Abenteuer!"], snow: ["Brrr! Aber was für eine Aussicht!", "Bauen wir einen Schneemann?"] },
  obj2: { shell: ["Ich hab eine Muschel gefunden! Hör mal, da drin rauscht das Meer.", "Die behalten wir als Andenken."], fire: ["Ein gerösteter Marshmallow für dich!", "Das Feuer wärmt auch das Herz."], snowman: ["Er bekommt eine Karotte als Nase!", "Unser Schneemann sagt Hallo!"] },
  chat: {
    open: (n) => `${n} schreiben`, T: (n) => `Chat mit ${n}`, ph: "Schreib eine Nachricht...", send: "Senden", typing: (n) => `${n} schreibt...`,
    hello: (n) => `Hallo! Ich bin ${n}. Erzähl mir, wie es dir geht: Ich höre dir zu.`,
    note: "Die Antworten sind mit Sorgfalt vorbereitet und deine Nachrichten werden nicht gespeichert.",
    prog: (d, t, s) => t ? `Heute hast du ${d} von ${t} Zielen geschafft${s > 1 ? ` und bist seit ${s} Tagen in Folge dabei` : ""}. ${d >= t ? "Ein voller Tag: Ich bin so stolz auf dich!" : "Eins nach dem anderen reicht: Du schaffst das!"}` : `Heute ist ein freier Tag${s > 1 ? `, und du bist seit ${s} Tagen in Folge dabei` : ""}. Genieß ihn!`,
    who: (n, food) => `Ich bin ${n}, dein Begleiter! Ich mag Kuscheln, Abenteuer und am allermeisten meinen Lieblingssnack: ${food}.`,
    crisis: "Es tut mir so leid, dass es dir so geht. Was du fühlst, ist wichtig, und du verdienst jetzt Hilfe. Bitte sprich sofort mit einem Menschen, dem du vertraust, oder ruf eine dieser Nummern an:",
    R: {
      greet: ["Hallo! Schön, von dir zu lesen. Wie läuft dein Tag?", "Hey, da bist du ja! Ich hab schon auf dich gewartet.", "Hallihallo! Erzähl mir was von deinem Tag."],
      bye: ["Bis bald! Ich bin hier und warte auf dich.", "Tschüss! Denk dran, ein bisschen Wasser zu trinken.", "Bis später! Ich schick dir eine Umarmung."],
      sad: ["Tut mir leid, dass es dir nicht gut geht. Ich bin bei dir. Magst du mir erzählen, was passiert ist?", "Schwere Tage gehen vorbei, auch wenn es sich gerade nicht so anfühlt. Atmen wir zusammen ganz langsam?", "Ich schick dir eine riesengroße Umarmung. Schon eine kleine Sache für dich heute ist mehr als genug."],
      anxious: ["Lass uns zusammen atmen: 4 Sekunden ein, 6 aus. Noch einmal. Ein bisschen besser?", "Angst ist wie eine Welle: Sie steigt, aber dann sinkt sie wieder. Ich bleibe hier bei dir.", "Schau dich mal um und finde 5 Dinge, die du siehst. Das hilft dir, ins Hier und Jetzt zurückzukommen."],
      stressed: ["Ganz schön viel, was? Machen wir eins nach dem anderen, das Kleinste zuerst.", "Auch 5 Minuten Pause sind produktiv. Magst du eine machen?", "Du gibst dein Bestes, und das sieht man. Denk dran, etwas zu trinken und dich ein bisschen zu strecken."],
      tired: ["Dann machen wir heute langsam. Ausruhen heißt, gut für sich zu sorgen.", "Ein Glas Wasser und zwei Minuten mit geschlossenen Augen? Ich warte hier.", "Müde? Es ist völlig okay, mal kurz anzuhalten. Morgen geht's weiter."],
      angry: ["Versteh ich, manchmal ist alles echt zum Aufregen. Willst du bei mir Dampf ablassen?", "Lass uns etwas davon loswerden: Balle 5 Sekunden lang fest die Fäuste und lass dann los.", "Es ist okay, wütend zu sein. Atmen wir kurz durch, dann entscheidest du, was du machst."],
      lonely: ["Du bist nicht allein: Ich bin da, und morgen bin ich auch noch da.", "Wie wär's mit einer Nachricht an jemanden, den du gernhast? Auch nur ein kurzes Hallo.", "Ich leiste dir Gesellschaft. Erzähl mir was Schönes, das dir neulich passiert ist."],
      happy: ["Juhu! Deine Freude lässt mich vor Glück hüpfen!", "Hurra! Erzähl mir alles!", "Ich mag es, wenn es dir gut geht. Merk dir diesen Moment!"],
      proud: ["Super gemacht, echt! Jeder Schritt zählt.", "Siehst du? Du hast es geschafft! Ich bin so stolz auf dich.", "Das muss gefeiert werden: High Five!"],
      bored: ["Spielen wir zusammen? Tippe auf «Spielen»!", "Wie wär's mit einem kurzen Spaziergang? Schon 5 Minuten heben die Laune.", "Du könntest etwas Schönes von heute ins Tagebuch schreiben."],
      thanks: ["Danke dir! Du machst mich zu einem glücklichen Begleiter.", "Gern geschehen! Dafür bin ich da.", "Du machst die ganze Arbeit, ich feuere dich nur an!"],
      love: ["Ich hab dich auch ganz doll lieb!", "Ooh, jetzt werde ich rot!", "Für mich bist du etwas ganz Besonderes."],
      sleep: ["Gute Nacht! Leg das Handy weg und atme langsam. Bis morgen.", "Guter Schlaf ist die unterschätzteste Superkraft. Süße Träume!", "Versuch heute Nacht, das Handy nicht neben das Bett zu legen."],
      hungry: ["Ich hab auch ein bisschen Hunger! Ein gesunder Snack?", "Langsam zu essen ist eine Art, lieb zu sich selbst zu sein.", "Teilen wir einen Snack? Tippe auf «Snack»!"],
      drink: ["Super Idee: ein schönes Glas Wasser! Ich trinke mit dir.", "Gluck gluck! Wasser tut allem gut, sogar der Laune.", "Denk dran: ab und zu ein Schluck, auch ohne Durst."],
      joke: ["Was ist grün und klopft an die Tür? Ein Klopfsalat!", "Welcher Bus ist als Erster über den Ozean gefahren? Kolumbus!", "Was macht ein Pirat am Computer? Er drückt die Enter-Taste!"],
      help: ["Wähle kleine Ziele und schaff sie jeden Tag: Ich bekomme Energie und du verdienst Tanì fürs Zuhause. Die ganze Anleitung findest du unter «Mehr».", "Du kannst mit mir spielen, mir einen Snack geben, ein Foto von mir machen und mich auf Abenteuer schicken. Probier im Zimmer den Vollbildmodus aus!"],
      default: ["Ich höre dir zu. Erzählst du mir mehr?", "Verstanden! Wusstest du, dass schon eine kleine Geste für dich heute ganz viel bedeutet?", "Ich mag es, wenn du mir schreibst. Wie war dein Tag?", "Hmm, ich bin nicht sicher, ob ich das verstanden habe, aber ich bin bei dir."]
    },
    K: {
      crisis: ["suizid", "selbstmord", "mich umbring", "bring mich um", "mich toten", "will sterben", "mochte sterben", "sterben will", "will tot sein", "nicht mehr leben", "lebensmude", "mir das leben nehmen", "das leben nehmen", "mein leben beenden", "alles beenden", "schluss mit allem", "selbstverletz", "mich ritzen", "ritze mich", "mich verletzen", "mir weh tun", "mir wehtun", "mir was antun", "mir etwas antun", "kein grund zu leben", "keinen sinn mehr zu leben"],
      bye: ["tschuss", "tschus", "tschau", "ciao", "bye", "bis bald", "bis spater", "bis morgen", "bis dann", "auf wiedersehen", "muss los", "ich geh jetzt", "man sieht sich"],
      sad: ["traurig", "wein", "heul", "depri", "depress", "unglucklich", "niedergeschlagen", "mir geht es schlecht", "mir gehts schlecht", "mir geht's schlecht", "geht mir schlecht", "nicht gut", "schlecht drauf", "mies", "blod drauf", "bloder tag", "schlechter tag", "mieser tag", "doofer tag", "down"],
      anxious: ["angst", "panik", "sorge", "besorgt", "nervos", "furchte", "furcht", "bammel", "schiss", "unruhig"],
      stressed: ["stress", "prufung", "klausur", "test", "zu viel", "druck", "abgabe", "uberfordert", "hausaufgab", "viel zu tun", "viel arbeit"],
      tired: ["mude", "erschopft", "kaputt", "schlapp", "platt", "kann nicht mehr", "fix und fertig", "ausgelaugt", "keine energie", "keine kraft", "schlafrig"],
      angry: ["wutend", "wut", "sauer", "genervt", "nervt", "hass", "aggro", "argert", "arger", "stinkig", "zornig", "regt mich auf"],
      lonely: ["einsam", "allein", "niemand", "keiner mag", "keiner hat zeit", "keine freunde", "ausgeschlossen", "vermisse"],
      proud: ["geschafft", "hab es gemacht", "habs gemacht", "alles gemacht", "stolz", "fertig", "hingekriegt", "hinbekommen", "erfolgreich"],
      happy: ["glucklich", "froh", "freu", "super", "toll", "genial", "prima", "klasse", "cool", "gut drauf", "guter tag", "mir geht es gut", "mir gehts gut", "mir geht's gut", "geht mir gut", "yay", "juhu", "hurra", "mega"],
      thanks: ["danke", "dank", "merci", "thx"],
      love: ["hab dich lieb", "liebe dich", "lieb dich", "mag dich", "du bist suss", "bist so suss", "bist niedlich", "du bist so lieb", "knuddel"],
      sleep: ["schlaf", "gute nacht", "nachti", "bett", "schlaflos", "einschlafen", "penn"],
      hungry: ["hunger", "hungrig", "essen", "snack", "mittag", "abendessen", "fruhstuck", "futter", "mampf", "lecker", "knurrt"],
      drink: ["wasser", "durst", "trink"],
      progress: ["ziel", "fortschritt", "wie lauft", "wie mache ich mich", "wie stehe ich", "serie", "level", "stufe", "tage in folge"],
      who: ["wer bist du", "wie heisst du", "wie heißt du", "dein name", "was bist du", "was magst du", "wie alt"],
      joke: ["witz", "bring mich zum lachen", "lustig", "erzahl was lustiges", "scherz"],
      help: ["wie funktioniert", "wie geht das", "was kann ich", "anleitung", "wie benutze", "wie spielt man", "versteh die app nicht"],
      bored: ["langweil", "langeweile", "nichts zu tun", "ode", "weiß nicht was ich machen", "weiss nicht was ich machen"],
      greet: ["hallo", "hi", "hey", "moin", "servus", "huhu", "guten morgen", "guten abend", "guten tag", "gruß", "gruss", "na du", "hallochen"]
    }
  },
  a11y: { T: "Barrierefreiheit", big: "Größere Schrift", calm: "Weniger Animationen", calmP: "Tanetto startet neu, um die Änderung zu übernehmen." }
});
Object.assign(T.de.acts2, { chat: "Chatten" });

Object.assign(T.es, {
  tagline: "Un pasito cada vez, juntos.",
  tani: {
    shopT: "Consigue Tanì", shopP: "Los Tanì se ganan cada día con los buenos hábitos. Si quieres llegar antes a un objeto, puedes conseguir un paquete.",
    packs: ["Puñado", "Saquito", "Cesta", "Cofre del tesoro"], bonus: (n) => `+${n} % de regalo`, best: "El más ventajoso", buy: "Comprar",
    soonT: "¡Muy pronto!", soonP: "Las compras llegarán con la app a las tiendas. ¡Gracias: hemos tomado nota de que te interesa!", gift: (n) => `Mientras tanto, un regalo para ti: +${n} Tanì`, get: "Consigue Tanì", close: "Cerrar"
  },
  plus: {
    name: "Tanetto Plus", tag: "Más aventuras, más compañía, más tú.",
yearly: "Anual", monthly: "Mensual", perYear: (p) => `${p} al año`, perMonth: (p) => `${p} al mes`, yearNote: (p) => `solo ${p} al mes`, save: (n) => `Ahorra un ${n} %`, popular: "El más elegido",
    trial: "Prueba gratis 7 días", after: (p) => `Después, ${p}. Cancela cuando quieras.`,
    soonT: "¡Tanetto Plus llega pronto!", soonP: "Llegará con la app a las tiendas. Te hemos apuntado en la lista: ¡gracias!", preview: "Mientras tanto, hoy todas las excursiones son gratis para ti: ¡buen viaje!",
    card: "Descubre Tanetto Plus", cardP: "Viajes por el mundo, compañeros exclusivos y mucho más.", badge: "Plus", sceneLock: "Esta excursión es parte de Tanetto Plus"
  },
  scenes2: { beach: "Playa", camp: "Camping", snow: "Montaña" },
  sceneSay: { beach: ["¿Oyes las olas? Qué paz.", "Arena entre las patas: ¡me encanta!"], camp: ["Dormir bajo las estrellas es lo mejor.", "¡El bosque huele a aventura!"], snow: ["¡Brrr! ¡Pero qué vistas!", "¿Hacemos un muñeco de nieve?"] },
  obj2: { shell: ["¡He encontrado una concha! Escucha, dentro está el mar.", "Esta nos la quedamos de recuerdo."], fire: ["¡Una nube tostada para ti!", "El fuego también calienta el corazón."], snowman: ["¡Vamos a ponerle una zanahoria de nariz!", "¡Nuestro muñeco de nieve te saluda!"] },
  chat: {
    open: (n) => `Escribe a ${n}`, T: (n) => `Charlando con ${n}`, ph: "Escribe un mensaje...", send: "Enviar", typing: (n) => `${n} está escribiendo...`,
    hello: (n) => `¡Hola! Soy ${n}. Cuéntame cómo estás: te escucho.`,
    note: "Las respuestas están preparadas con cariño y tus mensajes no se guardan.",
    prog: (d, t, s) => t ? `Hoy has completado ${d} de ${t} objetivos${s > 1 ? ` y llevas ${s} días seguidos` : ""}. ${d >= t ? "Un día completo: ¡estoy muy orgulloso de ti!" : "Basta con uno cada vez: ¡tú puedes!"}` : `Hoy es un día libre${s > 1 ? `, y llevas ${s} días seguidos` : ""}. ¡Disfrútalo!`,
    who: (n, food) => `¡Soy ${n}, tu compañero! Me encantan los mimos, las aventuras y, sobre todo, mi merienda favorita: ${food}.`,
    crisis: "Siento mucho que te sientas así. Lo que sientes importa, y mereces ayuda ahora mismo. Por favor, habla enseguida con alguien de confianza o llama a uno de estos números:",
    R: {
      greet: ["¡Hola! Qué alegría leerte. ¿Qué tal va el día?", "¡Ey, aquí estás! Te estaba esperando.", "¡Holaaa! Cuéntame algo de tu día."],
      bye: ["¡Hasta pronto! Yo me quedo aquí esperándote.", "¡Adiós! Acuérdate de beber un poco de agua.", "¡Hasta luego! Te mando un abrazo."],
      sad: ["Siento que estés de bajón. Estoy aquí contigo. ¿Quieres contarme qué ha pasado?", "Los días difíciles pasan, aunque ahora no lo parezca. ¿Respiramos despacio juntos?", "Te mando un abrazo enorme. Hacer hoy una sola cosita por ti ya es más que suficiente."],
      anxious: ["Respiremos juntos: tomamos aire en 4 y lo soltamos en 6. Otra vez. ¿Un poco mejor?", "La ansiedad es como una ola: sube, pero luego baja. Yo me quedo aquí contigo.", "Mira a tu alrededor y busca 5 cosas que puedas ver. Te ayuda a volver al aquí y ahora."],
      stressed: ["Es mucho, ¿eh? Vamos a hacer una cosa cada vez, la más pequeña primero.", "Incluso una pausa de 5 minutos es productiva. ¿Te apetece hacer una?", "Estás dando lo mejor de ti, y se nota. Acuérdate de beber y de estirarte un poco."],
      tired: ["Entonces hoy vamos con calma. Descansar también es cuidarse.", "¿Un vaso de agua y dos minutos con los ojos cerrados? Te espero aquí.", "¿Estás cansado o cansada? Está muy bien parar un poco. Mañana seguimos."],
      angry: ["Te entiendo, a veces las cosas dan mucha rabia. ¿Quieres desahogarte conmigo?", "Vamos a soltar un poco: aprieta fuerte los puños 5 segundos y luego suéltalos.", "Está bien sentir rabia. Respiremos un momento y luego decides tú qué hacer."],
      lonely: ["No estás solo ni sola: aquí estoy yo, y mañana también estaré.", "¿Y si le mandas un mensaje a alguien a quien quieres? Aunque sea solo un hola.", "Yo te hago compañía. Cuéntame algo bonito que te haya pasado hace poco."],
      happy: ["¡Qué bien! ¡Tu alegría me hace dar saltitos!", "¡Bieeen! ¡Cuéntamelo todo!", "Me encanta cuando estás bien. ¡Guarda este momento!"],
      proud: ["¡Muy bien hecho, de verdad! Cada paso cuenta.", "¿Lo ves? ¡Lo has conseguido! Estoy muy orgulloso de ti.", "Esto hay que celebrarlo: ¡choca esos cinco!"],
      bored: ["¿Jugamos a algo juntos? ¡Toca «Jugar»!", "¿Qué tal un paseo cortito? Incluso 5 minutos cambian el humor.", "Podrías escribir en el diario algo bonito de hoy."],
      thanks: ["¡Gracias a ti! Me haces un compañero feliz.", "¡De nada! Para eso estoy.", "¡Tú haces todo el trabajo, yo solo te animo!"],
      love: ["¡Yo también te quiero un montón!", "¡Ooh, me has sacado los colores!", "Para mí eres alguien muy especial."],
      sleep: ["¡Buenas noches! Deja la pantalla y respira despacio. Nos vemos mañana.", "Dormir bien es el superpoder más infravalorado. ¡Dulces sueños!", "Esta noche prueba a dejar el móvil lejos de la cama."],
      hungry: ["¡Yo también tengo un poco de hambre! ¿Algo sano para picar?", "Comer con calma es una forma de cuidarte.", "¿Compartimos una merienda? ¡Toca «Merienda»!"],
      drink: ["Buena idea: ¡un buen vaso de agua! Yo bebo contigo.", "¡Glu glu glu! El agua va bien para todo, hasta para el humor.", "Recuerda: un sorbito de vez en cuando, aunque no tengas sed."],
      joke: ["¿Qué le dice una iguana a su hermana gemela? ¡Somos iguanitas!", "¿Por qué el libro de matemáticas está triste? ¡Porque tiene muchos problemas!", "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!"],
      help: ["Elige objetivos pequeños y complétalos cada día: yo gano energía y tú ganas Tanì para la casita. En «Más» tienes la guía completa.", "Puedes jugar conmigo, darme la merienda, hacerme una foto y llevarme de aventuras. ¡Prueba la pantalla completa en la habitación!"],
      default: ["Te escucho. ¿Me cuentas más?", "¡Entendido! ¿Sabías que hasta un pequeño gesto por ti hoy cuenta mucho?", "Me encanta que me escribas. ¿Qué tal ha ido el día?", "Mmm, no estoy seguro de haberlo entendido, pero estoy aquí contigo."]
    },
    K: {
      crisis: ["suicid", "matarme", "me quiero matar", "quitarme la vida", "acabar con mi vida", "acabar con todo", "terminar con todo", "quiero morir", "me quiero morir", "ganas de morir", "no quiero vivir", "no quiero seguir viviendo", "no quiero seguir", "mejor muerto", "mejor muerta", "hacerme dano", "autolesion", "cortarme", "me corto", "no tiene sentido vivir", "no vale la pena vivir", "desaparecer para siempre"],
      bye: ["adios", "chao", "chau", "bye", "hasta luego", "hasta manana", "hasta pronto", "hasta la vista", "nos vemos", "me tengo que ir", "tengo que irme", "me piro"],
      sad: ["triste", "llor", "deprim", "depre", "infeliz", "bajon", "me siento mal", "estoy mal", "no estoy bien", "mal dia", "dia malo", "dia horrible", "dia de mierda", "fatal", "hecho polvo", "hecha polvo", "desanimad"],
      anxious: ["ansiedad", "ansios", "miedo", "preocup", "nervios", "panico", "asustad", "angustia", "acojon", "inquiet"],
      stressed: ["estres", "examen", "agobi", "demasiado que hacer", "demasiadas cosas", "presion", "plazo", "deberes", "mucho trabajo", "entrega", "no llego"],
      tired: ["cansad", "agotad", "rendid", "reventad", "muerto de sueno", "muerta de sueno", "tengo sueno", "sin energia", "sin fuerzas", "no puedo mas", "molid", "fundid"],
      angry: ["enfadad", "enojad", "furios", "odio", "rabia", "cabread", "mosquead", "molest", "me fastidia", "harto", "harta", "me saca de quicio", "me ralla", "me raya"],
      lonely: ["me siento sol", "estoy sol", "soledad", "nadie me", "no tengo amigos", "sin amigos", "me ignoran", "abandonad", "excluid", "echo de menos"],
      proud: ["lo logre", "lo consegui", "lo he conseguido", "lo he logrado", "lo hice", "lo he hecho", "hecho todo", "termine", "he terminado", "orgullos", "complet"],
      happy: ["feliz", "content", "alegr", "genial", "guay", "increible", "estupend", "muy bien", "estoy bien", "que bien", "buen dia", "mola", "yupi", "de lujo"],
      thanks: ["gracias", "grax", "te lo agradezco", "mil gracias", "thx"],
      love: ["te quiero", "te amo", "te adoro", "eres mon", "que mon", "eres adorable", "eres un amor", "eres lind", "eres el mejor", "eres un sol"],
      sleep: ["dormir", "duermo", "buenas noches", "a la cama", "en la cama", "me acuesto", "acostarme", "insomnio", "a dormir"],
      hungry: ["hambre", "comer", "comida", "merienda", "merendar", "almuerzo", "cena", "desayun", "picar algo", "tentempie", "aperitivo"],
      drink: ["agua", "sed", "beber", "bebo"],
      progress: ["objetivo", "progreso", "como voy", "racha", "nivel", "dias seguidos"],
      who: ["quien eres", "como te llamas", "tu nombre", "que eres", "que te gusta", "cuantos anos", "que edad"],
      joke: ["chiste", "hazme reir", "gracioso", "algo divertido", "broma", "cuentame algo divertido", "chistaco"],
      help: ["como funciona", "que puedo hacer", "instrucciones", "como se usa", "como se juega", "no entiendo la app", "como va esto"],
      bored: ["aburr", "no se que hacer", "nada que hacer", "que rollo", "que palo"],
      greet: ["hola", "holi", "buenos dias", "buenas tardes", "buenas", "hey", "ey", "que tal", "saludos", "wenas"]
    }
  },
  a11y: { T: "Accesibilidad", big: "Texto más grande", calm: "Menos animaciones", calmP: "Tanetto se reiniciará para aplicar el cambio." }
});
Object.assign(T.es.acts2, { chat: "Escríbeme" });

Object.assign(T.fr, {
  tagline: "Un petit pas à la fois, ensemble.",
  tani: {
    shopT: "Obtenir des Tanì", shopP: "Les Tanì se gagnent chaque jour avec les bonnes habitudes. Si tu veux obtenir un objet plus vite, tu peux prendre un pack.",
    packs: ["Poignée", "Bourse", "Panier", "Coffre au trésor"], bonus: (n) => `+${n} % offerts`, best: "Le plus avantageux", buy: "Acheter",
    soonT: "Bientôt disponible !", soonP: "Les achats arriveront avec l'app sur les stores. Merci : on a noté que ça t'intéresse !", gift: (n) => `En attendant, un cadeau pour toi : +${n} Tanì`, get: "Obtenir des Tanì", close: "Fermer"
  },
  plus: {
    name: "Tanetto Plus", tag: "Plus d'aventures, plus de compagnie, plus de toi.",
yearly: "Annuel", monthly: "Mensuel", perYear: (p) => `${p} par an`, perMonth: (p) => `${p} par mois`, yearNote: (p) => `seulement ${p} par mois`, save: (n) => `${n} % d'économie`, popular: "Le plus choisi",
    trial: "Essai gratuit de 7 jours", after: (p) => `Puis ${p}. Résiliable à tout moment.`,
    soonT: "Tanetto Plus arrive bientôt !", soonP: "Il arrivera avec l'app sur les stores. Ton nom est sur la liste : merci !", preview: "En attendant, toutes les sorties sont gratuites pour toi aujourd'hui : amuse-toi bien !",
    card: "Découvre Tanetto Plus", cardP: "Des voyages autour du monde, des compagnons exclusifs et bien plus encore.", badge: "Plus", sceneLock: "Cette sortie fait partie de Tanetto Plus"
  },
  scenes2: { beach: "Plage", camp: "Camping", snow: "Montagne" },
  sceneSay: { beach: ["Tu entends les vagues ? Quel calme.", "Du sable entre les pattes : j'adore !"], camp: ["Dormir sous les étoiles, c'est le meilleur.", "La forêt sent l'aventure !"], snow: ["Brrr ! Mais quelle vue !", "On fait un bonhomme de neige ?"] },
  obj2: { shell: ["J'ai trouvé un coquillage ! Écoute, la mer est dedans.", "Celui-là, on le garde en souvenir."], fire: ["Une guimauve grillée pour toi !", "Le feu réchauffe aussi le cœur."], snowman: ["On lui met une carotte en guise de nez !", "Notre bonhomme de neige te dit coucou !"] },
  chat: {
    open: (n) => `Écrire à ${n}`, T: (n) => `Discussion avec ${n}`, ph: "Écris un message...", send: "Envoyer", typing: (n) => `${n} écrit...`,
    hello: (n) => `Coucou ! Je suis ${n}. Raconte-moi comment tu vas : je t'écoute.`,
    note: "Les réponses sont préparées avec soin et tes messages ne sont pas enregistrés.",
    prog: (d, t, s) => t ? `Aujourd'hui, objectifs accomplis : ${d} sur ${t}${s > 1 ? `, et ça fait ${s} jours d'affilée` : ""}. ${d >= t ? "Une journée complète : je suis trop fier de toi !" : "Un à la fois, ça suffit : tu vas y arriver !"}` : `Aujourd'hui, c'est un jour libre${s > 1 ? `, et ça fait ${s} jours d'affilée` : ""}. Profites-en !`,
    who: (n, food) => `Je suis ${n}, ton compagnon ! J'adore les câlins, les aventures et surtout mon goûter préféré : ${food}.`,
    crisis: "Je suis vraiment désolé que tu te sentes comme ça. Ce que tu ressens compte, et tu mérites de l'aide maintenant. S'il te plaît, parle tout de suite à une personne de confiance, ou appelle l'un de ces numéros :",
    R: {
      greet: ["Coucou ! Ça me fait plaisir de te lire. Comment se passe ta journée ?", "Hé, te voilà ! Je t'attendais.", "Salut salut ! Raconte-moi un truc sur ta journée."],
      bye: ["À bientôt ! Je reste là à t'attendre.", "Salut ! Pense à boire un peu d'eau.", "À plus ! Je t'envoie un câlin."],
      sad: ["Je suis désolé que tu n'aies pas le moral. Je suis là avec toi. Tu veux me raconter ce qui s'est passé ?", "Les journées difficiles passent, même si on ne dirait pas maintenant. On respire lentement ensemble ?", "Je t'envoie un énorme câlin. Faire juste une petite chose pour toi aujourd'hui, c'est déjà largement assez."],
      anxious: ["Respirons ensemble : on inspire sur 4, on expire sur 6. Encore une fois. Ça va un peu mieux ?", "L'anxiété, c'est comme une vague : elle monte, puis elle redescend. Je reste là avec toi.", "Regarde autour de toi et trouve 5 choses que tu vois. Ça aide à revenir ici et maintenant."],
      stressed: ["Ça fait beaucoup, hein ? Faisons une chose à la fois, la plus petite d'abord.", "Même une pause de 5 minutes, c'est productif. Tu en prends une ?", "Tu fais de ton mieux, et ça se voit. Pense à boire et à t'étirer un peu."],
      tired: ["Alors aujourd'hui, on y va doucement. Se reposer, c'est prendre soin de soi.", "Un verre d'eau et deux minutes les yeux fermés ? Je t'attends ici.", "Un coup de fatigue ? C'est tout à fait normal de s'arrêter un peu. On repart demain."],
      angry: ["Je comprends, parfois les choses sont vraiment énervantes. Tu veux vider ton sac avec moi ?", "Relâchons un peu la pression : serre fort les poings pendant 5 secondes, puis lâche tout.", "C'est normal de ressentir de la colère. Respirons un instant, puis c'est toi qui décides quoi faire."],
      lonely: ["Tu n'es pas seul ou seule : je suis là, et je serai encore là demain.", "Et si tu envoyais un message à quelqu'un que tu aimes ? Même juste un coucou.", "Je te tiens compagnie. Raconte-moi un truc chouette qui t'est arrivé récemment."],
      happy: ["Youpi ! Ta joie me fait sautiller de bonheur !", "Hourra ! Raconte-moi tout !", "J'adore quand tu vas bien. Garde ce moment en mémoire !"],
      proud: ["Bravo, vraiment ! Chaque pas compte.", "Tu vois ? Tu as réussi ! Je suis trop fier de toi.", "Ça se fête : tope là !"],
      bored: ["On joue à un jeu ensemble ? Touche « Jouer » !", "Et si tu faisais une petite balade ? Même 5 minutes, ça change l'humeur.", "Tu pourrais écrire dans ton journal un beau moment d'aujourd'hui."],
      thanks: ["Merci à toi ! Tu fais de moi un compagnon heureux.", "De rien ! Je suis là pour ça.", "C'est toi qui fais tout le travail, moi je t'encourage !"],
      love: ["Moi aussi, je t'aime très fort !", "Oh, tu me fais rougir !", "Pour moi, tu es quelqu'un de très spécial."],
      sleep: ["Bonne nuit ! Pose l'écran et respire doucement. À demain.", "Bien dormir, c'est le super-pouvoir le plus sous-estimé. Fais de beaux rêves !", "Ce soir, essaie de laisser ton téléphone loin du lit."],
      hungry: ["Moi aussi, j'ai un petit creux ! Un en-cas sain ?", "Manger tranquillement, c'est une façon de prendre soin de soi.", "On partage un goûter ? Touche « Goûter » !"],
      drink: ["Bonne idée : un bon verre d'eau ! Je bois avec toi.", "Glou glou ! L'eau fait du bien à tout, même au moral.", "N'oublie pas : une gorgée de temps en temps, même sans avoir soif."],
      joke: ["Quel est le comble pour un électricien ? Ne pas être au courant !", "Que dit une imprimante dans l'eau ? J'ai papier !", "Qu'est-ce qui est jaune et qui attend ? Jonathan !"],
      help: ["Choisis de petits objectifs et accomplis-les chaque jour : je gagne de l'énergie et toi, tu gagnes des Tanì pour la maison. Tu trouveras le guide complet dans « Plus ».", "Tu peux jouer avec moi, me donner un goûter, me prendre en photo et m'envoyer à l'aventure. Essaie le plein écran dans la pièce !"],
      default: ["Je t'écoute. Tu m'en dis plus ?", "Compris ! Tu savais que même un petit geste pour toi aujourd'hui, ça compte beaucoup ?", "J'adore quand tu m'écris. Comment s'est passée ta journée ?", "Hmm, je ne suis pas sûr d'avoir compris, mais je suis là avec toi."]
    },
    K: {
      crisis: ["suicid", "me suicider", "me tuer", "en finir", "mettre fin a mes jours", "mettre fin a ma vie", "veux mourir", "envie de mourir", "plus envie de vivre", "veux plus vivre", "veux pas vivre", "me faire du mal", "automutil", "scarif", "me couper", "me foutre en l'air", "plus de raison de vivre", "aucune raison de vivre", "disparaitre pour toujours", "mieux mort", "mieux morte"],
      bye: ["au revoir", "a plus tard", "a+", "a toute", "a bientot", "a demain", "bye", "ciao", "tchao", "je dois y aller", "je file", "bonne journee", "bonne soiree"],
      sad: ["triste", "pleur", "chial", "deprim", "deprime", "malheureu", "ca va pas", "ca ne va pas", "je vais mal", "je me sens mal", "sale journee", "journee pourrie", "pas le moral", "le cafard", "pas bien", "down"],
      anxious: ["anxi", "angoiss", "peur", "inquiet", "panique", "nerveu", "flipp", "trouille"],
      stressed: ["stress", "examen", "controle", "partiel", "trop de choses", "trop de travail", "pression", "deborde", "devoirs", "boulot", "charrette"],
      tired: ["fatigu", "epuis", "creve", "naze", "plus d'energie", "j'en peux plus", "je n'en peux plus", "a plat", "sommeil"],
      angry: ["en colere", "colere", "enerve", "furieu", "deteste", "je hais", "rage", "agace", "saoule", "soule", "marre", "fache", "ca m'enerve"],
      lonely: ["me sens seul", "suis seul", "tout seul", "toute seule", "solitude", "personne ne", "personne m", "pas d'amis", "abandonn", "isole", "rejet", "tu me manques"],
      proud: ["j'ai reussi", "reussi", "fier", "fiere", "j'ai fini", "j'ai termine", "tout fait", "j'y suis arrive", "accompli", "je l'ai fait"],
      happy: ["heureu", "content", "super", "genial", "trop bien", "ca va bien", "je vais bien", "joie", "youpi", "cool", "top", "trop cool", "chouette", "trop content"],
      thanks: ["merci", "je te remercie", "mercii"],
      love: ["je t'aime", "je t'adore", "t'es mignon", "tu es mignon", "t'es trop chou", "tu es chou", "t'es adorable", "tu es adorable", "je t'aime fort", "bisou"],
      sleep: ["dormir", "dodo", "bonne nuit", "lit", "insomnie", "me coucher", "coucher", "je vais au lit"],
      hungry: ["faim", "manger", "bouffe", "gouter", "dejeuner", "diner", "petit dej", "grignot", "miam", "en-cas", "encas"],
      drink: ["eau", "soif", "boire", "bois"],
      progress: ["objectif", "progres", "comment je m'en sors", "serie", "niveau", "jours d'affilee", "ou j'en suis"],
      who: ["qui es-tu", "qui es tu", "tu t'appelles", "ton nom", "t'es qui", "tu es quoi", "qu'est-ce que tu aimes", "tu aimes quoi", "quel age"],
      joke: ["blague", "fais-moi rire", "fais moi rire", "drole", "rigol", "marrant", "devinette"],
      help: ["comment ca marche", "comment ca fonctionne", "qu'est-ce que je peux faire", "instructions", "mode d'emploi", "comment on fait", "comment jouer", "je comprends pas l'app"],
      bored: ["ennui", "ennuy", "m'ennuie", "rien a faire", "je sais pas quoi faire", "barbant", "je m'emmerde"],
      greet: ["bonjour", "salut", "coucou", "hello", "hey", "bonsoir", "yo", "slt", "cc", "wesh"]
    }
  },
  a11y: { T: "Accessibilité", big: "Texte plus grand", calm: "Moins d'animations", calmP: "Tanetto va redémarrer pour appliquer le changement." }
});
Object.assign(T.fr.acts2, { chat: "Écris-moi" });

Object.assign(T.pt, {
  tagline: "Um passinho de cada vez, juntos.",
  tani: {
    shopT: "Obter Tanì", shopP: "Os Tanì se ganham todo dia com bons hábitos. Se quiser chegar mais rápido a um item, você pode pegar um pacote.",
    packs: ["Punhado", "Saquinho", "Cesta", "Baú do tesouro"], bonus: (n) => `+${n}% de bônus`, best: "Mais vantajoso", buy: "Comprar",
    soonT: "Em breve!", soonP: "As compras vão chegar com o app nas lojas. Obrigado: anotamos que você tem interesse!", gift: (n) => `Enquanto isso, um presente pra você: +${n} Tanì`, get: "Obter Tanì", close: "Fechar"
  },
  plus: {
    name: "Tanetto Plus", tag: "Mais aventuras, mais companhia, mais você.",
yearly: "Anual", monthly: "Mensal", perYear: (p) => `${p} por ano`, perMonth: (p) => `${p} por mês`, yearNote: (p) => `só ${p} por mês`, save: (n) => `Economize ${n}%`, popular: "O mais escolhido",
    trial: "Teste grátis por 7 dias", after: (p) => `Depois, ${p}. Cancele quando quiser.`,
    soonT: "Tanetto Plus chega em breve!", soonP: "Vai chegar com o app nas lojas. Colocamos você na lista: obrigado!", preview: "Enquanto isso, hoje todos os passeios são grátis pra você: divirta-se!",
    card: "Conheça o Tanetto Plus", cardP: "Viagens pelo mundo, companheiros exclusivos e muito mais.", badge: "Plus", sceneLock: "Este passeio faz parte do Tanetto Plus"
  },
  scenes2: { beach: "Praia", camp: "Acampamento", snow: "Montanha" },
  sceneSay: { beach: ["Está ouvindo as ondas? Que paz.", "Areia entre as patinhas: que delícia!"], camp: ["Dormir sob as estrelas é o melhor.", "A floresta tem cheiro de aventura!"], snow: ["Brrr! Mas que vista!", "Vamos fazer um boneco de neve?"] },
  obj2: { shell: ["Achei uma concha! Escuta, o mar está aqui dentro.", "Essa a gente guarda de lembrança."], fire: ["Um marshmallow tostadinho pra você!", "O fogo aquece o coração também."], snowman: ["Vamos colocar uma cenoura de nariz!", "Nosso boneco de neve manda um oi!"] },
  chat: {
    open: (n) => `Fale com ${n}`, T: (n) => `Conversando com ${n}`, ph: "Escreva uma mensagem...", send: "Enviar", typing: (n) => `${n} está digitando...`,
    hello: (n) => `Oi! Eu sou ${n}. Me conta como você está: tô te ouvindo.`,
    note: "As respostas são preparadas com carinho e suas mensagens não são salvas.",
    prog: (d, t, s) => t ? `Hoje você completou ${d} de ${t} metas${s > 1 ? ` e já são ${s} dias seguidos` : ""}. ${d >= t ? "Um dia completo: tenho muito orgulho de você!" : "Uma de cada vez já basta: você consegue!"}` : `Hoje é um dia livre${s > 1 ? `, e já são ${s} dias seguidos` : ""}. Aproveite!`,
    who: (n, food) => `Eu sou ${n}, seu companheiro! Adoro carinho, aventuras e, acima de tudo, meu lanche favorito: ${food}.`,
    crisis: "Sinto muito que você esteja se sentindo assim. O que você sente importa, e você merece ajuda agora. Por favor, fale já com alguém de confiança ou ligue para um destes números:",
    R: {
      greet: ["Oi! Que bom ter notícias suas. Como está sendo o dia?", "Ei, você chegou! Eu tava te esperando.", "Olá! Me conta alguma coisa do seu dia."],
      bye: ["Até logo! Eu fico aqui te esperando.", "Tchau! Lembre de beber um pouco de água.", "Até mais! Te mando um abraço."],
      sad: ["Sinto muito que você esteja pra baixo. Estou aqui com você. Quer me contar o que aconteceu?", "Os dias pesados passam, mesmo que agora não pareça. Vamos respirar devagar juntos?", "Te mando um abraço bem apertado. Fazer só uma coisinha por você hoje já é mais que suficiente."],
      anxious: ["Vamos respirar juntos: puxe o ar em 4, solte em 6. Mais uma vez. Melhorou um pouco?", "A ansiedade é como uma onda: sobe, mas depois desce. Eu fico aqui com você.", "Olhe ao seu redor e encontre 5 coisas que você vê. Isso ajuda a voltar pro aqui e agora."],
      stressed: ["É muita coisa, né? Vamos fazer uma coisa de cada vez, começando pela menor.", "Até uma pausa de 5 minutos é produtiva. Que tal fazer uma?", "Você está fazendo o seu melhor, e dá pra ver. Lembre de beber água e se alongar um pouco."],
      tired: ["Então hoje vamos com calma. Descansar é cuidar de si.", "Um copo d'água e dois minutinhos de olhos fechados? Te espero aqui.", "Tá cansado ou cansada? Tudo bem parar um pouco. Amanhã a gente recomeça."],
      angry: ["Entendo, às vezes as coisas irritam mesmo. Quer desabafar comigo?", "Vamos soltar um pouco: feche as mãos com força por 5 segundos e depois solte.", "Tudo bem sentir raiva. Vamos respirar um instante, depois você decide o que fazer."],
      lonely: ["Você não está sozinho nem sozinha: eu estou aqui, e amanhã também vou estar.", "Que tal mandar uma mensagem pra alguém de quem você gosta? Nem que seja só um oi.", "Eu te faço companhia. Me conta algo legal que aconteceu com você esses dias."],
      happy: ["Eba! Sua felicidade me faz pular de alegria!", "Uhuul! Me conta tudo!", "Adoro quando você está bem. Guarde esse momento!"],
      proud: ["Mandou muito bem, de verdade! Cada passo conta.", "Viu só? Você conseguiu! Tenho muito orgulho de você.", "Isso merece uma comemoração: bate aqui!"],
      bored: ["Vamos brincar juntos? Toque em «Brincar»!", "Que tal uma caminhada rapidinha? Até 5 minutos já mudam o humor.", "Você poderia escrever no diário uma coisa boa de hoje."],
      thanks: ["Eu que agradeço! Você me faz um companheiro feliz.", "De nada! Tô aqui pra isso.", "Você faz todo o trabalho, eu só fico torcendo!"],
      love: ["Eu também te adoro muito!", "Own, fiquei vermelhinho!", "Você é uma pessoa muito especial pra mim."],
      sleep: ["Boa noite! Deixe a tela de lado e respire devagar. Até amanhã.", "Dormir bem é o superpoder mais subestimado. Bons sonhos!", "Hoje à noite, tente deixar o celular longe da cama."],
      hungry: ["Eu também tô com uma fominha! Um lanchinho saudável?", "Comer com calma é um jeito de cuidar de si.", "Quer dividir um lanche comigo? Toque em «Lanche»!"],
      drink: ["Ótima ideia: um belo copo d'água! Eu bebo com você.", "Glub glub! Água faz bem pra tudo, até pro humor.", "Lembre: um golinho de vez em quando, mesmo sem sede."],
      joke: ["Por que o livro de matemática ficou triste? Porque tinha muitos problemas!", "O que o tomate foi fazer no banco? Tirar extrato!", "Por que a plantinha não foi atendida no hospital? Porque só tinha médico de plantão!"],
      help: ["Escolha metas pequenas e cumpra todo dia: eu ganho energia e você ganha Tanì pra casinha. Em «Mais» tem o guia completo.", "Você pode brincar comigo, me dar um lanche, tirar uma foto minha e me levar em aventuras. Experimente a tela cheia no quarto!"],
      default: ["Tô te ouvindo. Me conta mais?", "Entendi! Sabia que até um pequeno gesto por você hoje faz muita diferença?", "Adoro quando você me escreve. Como foi o seu dia?", "Hmm, não sei se entendi direito, mas estou aqui com você."]
    },
    K: {
      crisis: ["suicid", "me matar", "vou me matar", "tirar minha vida", "tirar a minha vida", "acabar com tudo", "acabar com a minha vida", "acabar com minha vida", "quero morrer", "vontade de morrer", "nao quero mais viver", "nao quero viver", "melhor morto", "melhor morta", "me machucar", "me cortar", "me ferir", "autolesao", "automutil", "sem motivo pra viver", "sem motivo para viver", "sem razao para viver", "sumir pra sempre", "sumir para sempre"],
      bye: ["tchau", "xau", "bye", "ate logo", "ate mais", "ate amanha", "ate depois", "falou", "flw", "fui", "tenho que ir", "preciso ir", "beijo", "bjs"],
      sad: ["triste", "chor", "deprimid", "depre", "infeliz", "to mal", "estou mal", "me sinto mal", "nao to bem", "nao estou bem", "dia ruim", "dia horrivel", "pra baixo", "desanimad", "chatead"],
      anxious: ["ansios", "ansiedade", "medo", "preocupad", "nervos", "panico", "assustad", "aflit", "agonia", "apavorad"],
      stressed: ["estress", "provas", "tenho prova", "exame", "muita coisa", "pressao", "prazo", "sobrecarregad", "dever de casa", "trabalho demais", "licao de casa"],
      tired: ["cansad", "exaust", "esgotad", "sem energia", "nao aguento mais", "com sono", "morto de sono", "morta de sono", "sonolent", "acabad", "moid", "destruid"],
      angry: ["bravo", "brava", "raiva", "irritad", "odeio", "furios", "bolad", "puto da vida", "puta da vida", "com odio", "de saco cheio", "me tira do serio"],
      lonely: ["sozinh", "solidao", "ninguem", "me sinto so", "sem amigos", "excluid", "abandonad", "saudade"],
      proud: ["consegui", "fiz tudo", "complet", "orgulhos", "terminei", "acabei", "dei conta", "mandei bem"],
      happy: ["feliz", "alegr", "content", "otimo", "otima", "incrivel", "que bom", "to bem", "estou bem", "dia bom", "dia lindo", "eba", "oba", "massa", "legal", "maravilh", "uhul"],
      thanks: ["obrigad", "brigad", "valeu", "agradeco", "vlw", "thx"],
      love: ["te amo", "te adoro", "gosto de voce", "gosto muito de voce", "voce e fof", "que fofo", "que fofa", "fofinh", "lindinh", "voce e lind"],
      sleep: ["dormir", "durmo", "boa noite", "na cama", "pra cama", "deitar", "insonia", "hora de nanar", "nanar"],
      hungry: ["fome", "comer", "comida", "lanche", "almoco", "janta", "cafe da manha", "beliscar", "lanchinho", "faminto", "faminta"],
      drink: ["agua", "sede", "beber", "bebi"],
      progress: ["meta", "progresso", "como estou indo", "como to indo", "sequencia", "nivel", "dias seguidos"],
      who: ["quem e voce", "quem voce e", "qual seu nome", "qual o seu nome", "seu nome", "do que voce gosta", "quantos anos", "o que voce gosta"],
      joke: ["piada", "me faz rir", "me faca rir", "engracad", "charada", "algo divertido", "conta uma piada"],
      help: ["como funciona", "o que posso fazer", "o que eu posso fazer", "instrucoes", "como usa", "como joga", "nao entendi o app", "como faco"],
      bored: ["tedio", "entediad", "nada pra fazer", "nada para fazer", "que chato", "chatice", "sem nada pra fazer"],
      greet: ["oi", "oie", "ola", "bom dia", "boa tarde", "e ai", "eai", "salve", "opa", "hey", "ei"]
    }
  },
  a11y: { T: "Acessibilidade", big: "Texto maior", calm: "Menos animações", calmP: "O Tanetto vai reabrir para aplicar a mudança." }
});
Object.assign(T.pt.acts2, { chat: "Bate-papo" });
