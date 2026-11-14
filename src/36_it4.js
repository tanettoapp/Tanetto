Object.assign(T.it, {
  acts: { feed: "Merenda", play: "Gioca", talk: "Parliamo", nap: "Nanna", wake: "Sveglia", photo: "Foto" },
  joy: "Felicità",
  feedT: "Cosa gli prepari?", feedLeft: (n) => n === 1 ? "Ancora 1 merenda oggi" : `Ancora ${n} merende oggi`, feedFull: "Ho il pancino pieno! Magari più tardi.",
  snacks: { apple: "Mela", berries: "Fragole", cookie: "Biscotto", honey: "Miele", fish: "Biscotto a pesce", carrot: "Carota" },
  yum: ["Gnam gnam!", "Che buono!", "Grazie, mi ci voleva!", "Delizioso!"], fav: "È il mio preferito! Grazie!",
  gameT: "Acchiappa le stelle", gameP: "Tocca le stelle prima che cadano. Quelle dorate valgono 3 punti!", gameStart: "Gioca", gameScore: (n) => `Punti: ${n}`, gameEnd: (n) => `Hai fatto ${n} punti!`, gameSeeds: (s) => s ? `+${s} Tanì` : "I Tanì del gioco di oggi li hai già presi tutti, ma il divertimento è sempre gratis!", gameAgain: "Ancora!", gameBest: (n) => `Record: ${n}`,
  talkT: "Come ti senti adesso?", talkBreath: "Respiriamo insieme un minuto?", talkHelp: "Se ti serve parlare con qualcuno, in Altro trovi chi può aiutarti.", talkSaved: "L'ho segnato nel diario.", talkQ: "Come ti senti adesso?",
  talkReply: [
    ["Mi dispiace. Sono qui con te, anche solo per stare un po' in silenzio insieme.", "Le giornate pesanti passano. Intanto, un respiro alla volta."],
    ["Capita. Facciamo una cosa piccola e gentile per te?", "Va bene anche così. Non devi essere al massimo ogni giorno."],
    ["Una giornata normale è comunque una buona giornata.", "Grazie per avermelo detto. Andiamo avanti tranquilli."],
    ["Che bello! Mi fai venire voglia di saltellare.", "Sono contento! Teniamoci stretti questo momento."],
    ["Evviva! Sei la mia persona preferita oggi più che mai!", "Che gioia! Facciamo una festa piccola piccola?"]
  ],
  napSay: "Buonanotte... zzz", wakeSay: "Che bel pisolino! Eccomi qua.",
  stroke: ["Mmm, che bello...", "Ancora un pochino!", "Mi sento tutto morbido."],
  tickle: ["Ahah, il solletico no!", "Hihihi, basta, basta!"],
  photoT: "Che bella foto!", photoMaking: "Sviluppo la foto...",
  letterT: "Una lettera per te", letterL: "Leggi la lettera del giorno", letterSign: (n) => `Con affetto, ${n}`,
  letters: [
    "Ciao! Sono felicissimo di averti conosciuto. Da oggi ci teniamo compagnia, un passo alla volta.",
    "Ieri ho sognato che volavamo sopra le nuvole. Tu ridevi tantissimo. Che bel sogno!",
    "Ho scoperto una cosa: quando bevi un po' d'acqua, anche le mie foglie si sentono più fresche.",
    "Oggi non serve fare tutto. Basta fare qualcosa. Il resto può aspettare.",
    "Ho contato le stelle dalla finestra. Ne ho perse un po', ma mi sono divertito lo stesso.",
    "Sai qual è la mia parte preferita della giornata? Quando arrivi tu.",
    "Una settimana insieme! Ti ho preparato un abbraccio enorme. Immaginalo forte forte.",
    "Se oggi è una giornata storta, va bene. Anche le giornate storte finiscono.",
    "Ho provato a fare i biscotti. Sono venuti un po' bruciacchiati, ma col cuore.",
    "Ricordati di guardare il cielo almeno una volta oggi. È gratis ed è bellissimo.",
    "Ho imparato a fischiettare! Più o meno. Diciamo che ci sto lavorando.",
    "Grazie per prenderti cura di te. Così ti prendi cura anche di me.",
    "Oggi proviamo una cosa: dedica a te una frase gentile, come faresti con un amico.",
    "Due settimane insieme! Io sono cresciuto, ma anche tu hai fatto tanta strada. Lo vedo.",
    "La pioggia mi piace: fa crescere le piante e rende tutto più profumato.",
    "Ho messo in ordine la mia stanza. Cioè, ho spostato un calzino. È un inizio!",
    "Ogni piccolo passo conta. Anche quelli che nessuno vede.",
    "Stanotte la luna era così grande che sembrava volesse entrare dalla finestra.",
    "Se senti la stanchezza, riposa. Riposare non è perdere tempo.",
    "Mi piace quando mi racconti la tua giornata nel diario. Anche solo una riga.",
    "Tre settimane insieme! Sei una persona speciale. Non dimenticarlo mai."
  ],
  giftBig: (s) => `Regalo del giorno: +${s} Tanì!`,
  teaserT: "Torna domani!", teaserP: (s) => `Il regalo di domani varrà +${s} Tanì. Ogni 7 giorni di fila c'è una sorpresa speciale.`, visitL: (n) => n === 1 ? "1 giorno di visita" : `${n} giorni di visita di fila`,
  specialT: "Regalo speciale!", specialP: (i) => `Tanti giorni di fila insieme: ${i} è tuo!`, specialOnly: "Premio dei giorni di fila",
  tut: [
    "Questo è {n}! Toccalo per fargli una coccola, oppure accarezzalo trascinando il dito.",
    "Ogni giorno trovi un regalo, e se torni il giorno dopo diventa più grande. Aprilo!",
    "Qui puoi dargli la merenda, giocare insieme, parlare, metterlo a nanna o fargli una foto.",
    "Questi sono i tuoi obiettivi. Quando ne fai uno, toccalo: {n} prende energia e tu guadagni Tanì.",
    "Con l'energia piena, {n} parte per un'avventura. Qui sotto trovi avventure, casetta, diario e impostazioni."
  ],
  tutNext: "Avanti", tutSkip: "Salta", tutDone: "Ho capito!",
  privT: "Privacy", privP: "Compagno, obiettivi e diario restano su questo dispositivo. Se crei un account, salviamo anche la tua e-mail e un backup dei progressi, solo per farteli ritrovare. Per migliorare l'app contiamo alcune azioni in forma anonima e aggregata (per esempio quante volte viene aperta). Tanetto non è uno strumento medico ed è per tutte le età: sotto l'età del consenso digitale del tuo Paese (da 13 a 16 anni, secondo il Paese) la pubblicità non è mai personalizzata e il backup online non è disponibile.",
  hapticL: "Vibrazione", trackL: "In riproduzione", tracks: ["Mattina di sole", "Passeggiata", "Tè caldo", "Ninna nanna"],
  feedbackT: "Dimmi cosa ne pensi", feedbackP: "Un consiglio, un problema, un'idea: ogni messaggio aiuta a migliorare Tanetto.", feedbackB: "Scrivi un messaggio",
  tomorrow: "Domani ti preparo una sorpresa. Ti aspetto!",
  idle: ["Sai che le nuvole sono fatte di tantissime goccioline?", "Mi è venuta in mente una canzoncina... la la la!", "Secondo te le stelle si conoscono tra loro?", "Oggi mi sento particolarmente morbido.", "Se fossi un biscotto, sarei al cioccolato.", "Ti ho mai detto che hai un talento per le cose piccole? Ce l'hai.", "Ho visto una farfalla! Mi ha salutato, credo.", "A volte mi piace solo stare qui con te."]
});
T.it.items.teddy = "Orsetto"; T.it.items.fishbowl = "Pesciolino rosso"; T.it.items.w_stars = "Cielo stellato";
T.it.talk.morning.push("Ho aperto la finestra: l'aria sa di nuovo inizio.", "Che ne dici di una giornata morbida?", "Facciamo colazione con calma, va bene?");
T.it.talk.day.push("Ehi, hai bevuto un po' d'acqua?", "Ogni cosa che fai per te è una vittoria.", "Io ci sono, passo dopo passo.");
T.it.talk.evening.push("Stasera niente fretta, promesso.", "Che cosa ti è piaciuto di oggi?", "Le lucine della sera sono le mie preferite.");
T.it.talk.night.push("Ancora in piedi a quest'ora? Facciamo piano piano.", "Il cuscino ci aspetta.", "Domani sarà un'altra bella occasione.");
T.it.talk.pat.push("Che bello quando ci sei tu!", "Ancora una, ti prego!", "Mi sento al calduccio.");
T.it.talk.cheer.push("Grande! Un passo in più.", "Lo sapevo che ce l'avresti fatta.", "Che orgoglio!");
