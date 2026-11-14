/* ===== 98f_v20_nav (1.0.8): nomi e ordine delle sezioni, Casa piu' calma, energia visibile, obiettivi anche in viaggio,
   "togli la spunta", Prendi tutto nel sentiero, respiro a tutto schermo, finestre una alla volta, Plus al momento giusto,
   niente vicoli ciechi sul web, piccoli errori (plurali, calendario, umore da Parliamo, numeri d'aiuto, ricomincia da capo).
   Sezioni (le chiavi interne restano: today, trips, home, diary, more):
     Casa (la stanza, gli obiettivi, l'energia) · Viaggi (mete, album) · Negozio (prova e compra) · Diario · Profilo (progressi + impostazioni)
   Stato nuovo: S.v20nav = { undo: { [goal]: cosa ha dato oggi }, plus: { n: volte mostrata, last: giorno, off: giorno del "Non ora" } } */

/* =================== TESTI =================== */
const NAV20_T = {
  it: {
    tabs: { today: "Casa", trips: "Viaggi", home: "Negozio", diary: "Diario", more: "Profilo" },
    tripsT: "Viaggi", homeT: "Negozio", moreT: "Profilo", todayT: "Obiettivi di oggi",
    tut2: "Con l'energia, {n} parte per un viaggio. Qui sotto trovi Viaggi, Negozio, Diario e Profilo.",
    ready: "Energia piena! Puoi mandarlo in viaggio.", goTrip: "Scegli il viaggio", readySay: "Che voglia di partire! Dove andiamo?",
    allP: (n) => `${n} ha l'energia piena ed è pronto per un viaggio!`, awayT: (n) => `${n} è in viaggio`,
    en: "Energia", enOf: (a, b) => `${a}/${b}`, enCap: "Ogni obiettivo gli dà energia. A metà: gita breve · piena: viaggio.",
    enHalf: "Può già fare una gita breve!", enFull: "Energia piena: può partire!", enGo: "Scegli dove →", enDone: "Il viaggio di oggi è fatto: domani si riparte.",
    enI: "Cos'è l'energia?", enSheetT: (n) => `L'energia di ${n}`,
    enSheet: (n) => [`Ogni obiettivo che segni dà energia a ${n}.`, "Con metà energia può fare una gita breve qui vicino.", "Con l'energia piena parte per un viaggio più lungo, anche lontano.", "Torna con una cartolina e qualche Tanì. L'energia riparte da zero ogni giorno."],
    back: (h) => `torna alle ${h}`, backTom: (h) => `torna domani alle ${h}`, left: (x) => `tra ${x}`,
    awayMeanwhile: "Intanto puoi segnare gli obiettivi: contano lo stesso.", awayPlay: "Gioca", awayOpen: "Cosa fa in viaggio?",
    awayDone: (g) => `Fatto! ${g}: lo trova segnato al ritorno.`,
    awaySheet: (n, d) => [`${n} è in viaggio verso ${d}: si gode il posto e ti porta una cartolina.`, "Tu intanto vai avanti come sempre: gli obiettivi valgono anche adesso (Tanì, punti e serie).", "I giochi restano aperti. Merenda, Parliamo e Nanna tornano quando torna lui."],
    undoT: "Togliere la spunta?", undoP: (g) => `«${g}» torna da fare.`, undoGive: (x) => `Si restituisce quello che ti aveva dato: ${x}.`,
    undoYes: "Togli la spunta", undoNo: "Lascia fatto", undoDone: "Spunta tolta.", undoPts: (n) => `${n} punti`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Non ti aveva dato niente da restituire.",
    progT: "I tuoi progressi", progChip: "Progressi", giftRow: (n) => n === 1 ? "1\u00a0regalo di fila" : `${n}\u00a0regali di fila`,
    passTier: (a, m = 50) => `Tappa ${a} di ${m}`, passClaim: (n) => n === 1 ? "1 premio da ritirare" : `${n} premi da ritirare`,
    claimAll: (n) => `Prendi tutto (${n})`, claimedAll: "Tutto ritirato!", howShow: "Come funziona", howHide: "Nascondi",
    stop: "Ferma", lvShort: "Liv.",
    webT: "Si attiva nell'app per Android", webP: (n) => `Tanetto Plus e i pacchetti di Tanì si comprano dall'app per Android, su Google Play. Con un account gratuito ritrovi ${n} e tutti i tuoi progressi anche lì.`,
    webSoon: "L'app arriva presto su Google Play.", webFree: "Intanto i Tanì si guadagnano gratis: obiettivi, viaggi, giochi e regalo del giorno.",
    plusT: "Ti va di provare Tanetto Plus?", plusP: (n, c) => `Ti piace stare con ${n}? Con Plus avete gite in tutto il mondo, ${c} e un regalo ogni mese.`,
    plusTrial: (d) => `${d} giorni gratis`, plusThen: (p) => `poi ${p} · disdici quando vuoi`, plusFrom: (p) => `${p} · disdici quando vuoi`,
    plusGo: (d) => `Prova ${d} giorni gratis`, plusSub: "Scopri Plus", plusLater: "Non ora",
    daysAct: ["giorno attivo", "giorni attivi"], goalsDone: ["obiettivo completato", "obiettivi completati"],
    talkMood: "Umore da Parliamo", fut: "In arrivo", resetP: "Si cancellano per sempre compagno, progressi e diario.",
    shelfT: "Trofei della serie", passName: "Stagione delle Lanterne", cityName: "Città delle lanterne", lakeName: "Lago delle lanterne"
  },
  en: {
    tabs: { today: "Home", trips: "Trips", home: "Shop", diary: "Journal", more: "Profile" },
    tripsT: "Trips", homeT: "Shop", moreT: "Profile", todayT: "Today's goals",
    tut2: "With energy, {n} goes on a trip. Down here you'll find Trips, Shop, Journal and Profile.",
    ready: "Full energy! You can send them on a trip.", goTrip: "Choose a trip", readySay: "I can't wait to set off! Where shall we go?",
    allP: (n) => `${n} has full energy and is ready for a trip!`, awayT: (n) => `${n} is on a trip`,
    en: "Energy", enOf: (a, b) => `${a}/${b}`, enCap: "Every goal gives energy. Half: short trip · full: full trip.",
    enHalf: "Ready for a short trip!", enFull: "Full energy: ready to go!", enGo: "Choose where →", enDone: "Today's trip is done: off again tomorrow.",
    enI: "What is energy?", enSheetT: (n) => `${n}'s energy`,
    enSheet: (n) => [`Every goal you tick gives ${n} some energy.`, "With half the energy, they can take a short trip nearby.", "With full energy, they set off on a longer trip, even far away.", "They come back with a postcard and some Tanì. Energy starts from zero every day."],
    back: (h) => `back at ${h}`, backTom: (h) => `back tomorrow at ${h}`, left: (x) => `in ${x}`,
    awayMeanwhile: "Meanwhile you can tick your goals: they still count.", awayPlay: "Play", awayOpen: "What are they doing?",
    awayDone: (g) => `Done! ${g}: they'll see it when they're back.`,
    awaySheet: (n, d) => [`${n} is traveling to ${d}: enjoying the place and bringing you a postcard.`, "Meanwhile, carry on as usual: your goals count now too (Tanì, points and streak).", "Games stay open. Snack, Chat and Nap come back when they do."],
    undoT: "Untick this goal?", undoP: (g) => `“${g}” goes back to to-do.`, undoGive: (x) => `What it gave you is taken back: ${x}.`,
    undoYes: "Untick", undoNo: "Keep it done", undoDone: "Unticked.", undoPts: (n) => `${n} points`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "It didn't give you anything to take back.",
    progT: "Your progress", progChip: "Progress", giftRow: (n) => n === 1 ? "1\u00a0gift in a row" : `${n}\u00a0gifts in a row`,
    passTier: (a, m = 50) => `Stage ${a} of ${m}`, passClaim: (n) => n === 1 ? "1 reward to claim" : `${n} rewards to claim`,
    claimAll: (n) => `Claim all (${n})`, claimedAll: "All claimed!", howShow: "How it works", howHide: "Hide",
    stop: "Stop", lvShort: "Lv.",
    webT: "Unlocks in the Android app", webP: (n) => `Tanetto Plus and Tanì packs are bought in the Android app, on Google Play. With a free account you'll find ${n} and all your progress there too.`,
    webSoon: "The app is coming to Google Play soon.", webFree: "Meanwhile, you earn Tanì for free: goals, trips, games and the daily gift.",
    plusT: "Fancy trying Tanetto Plus?", plusP: (n, c) => `Enjoying your time with ${n}? With Plus you get trips around the world, ${c} and a gift every month.`,
    plusTrial: (d) => `${d} days free`, plusThen: (p) => `then ${p} · cancel anytime`, plusFrom: (p) => `${p} · cancel anytime`,
    plusGo: (d) => `Try ${d} days free`, plusSub: "Discover Plus", plusLater: "Not now",
    daysAct: ["active day", "active days"], goalsDone: ["goal completed", "goals completed"],
    talkMood: "Mood from Chat", fut: "Coming up", resetP: "Your companion, progress and journal will be deleted forever.",
    shelfT: "Streak trophies", passName: "Lantern Season", cityName: "Lantern Town", lakeName: "Lantern Lake"
  },
  de: {
    tabs: { today: "Zuhause", trips: "Reisen", home: "Shop", diary: "Tagebuch", more: "Profil" },
    tripsT: "Reisen", homeT: "Shop", moreT: "Profil", todayT: "Ziele für heute",
    tut2: "Mit Energie geht {n} auf Reisen. Unten findest du Reisen, Shop, Tagebuch und Profil.",
    ready: "Volle Energie! Du kannst ihn auf Reisen schicken.", goTrip: "Reise wählen", readySay: "Ich kann es kaum erwarten loszuziehen! Wohin geht's?",
    allP: (n) => `${n} hat volle Energie und ist bereit für eine Reise!`, awayT: (n) => `${n} ist auf Reisen`,
    en: "Energie", enOf: (a, b) => `${a}/${b}`, enCap: "Jedes Ziel gibt Energie. Halb: Ausflug · voll: Reise.",
    enHalf: "Bereit für einen kurzen Ausflug!", enFull: "Volle Energie: bereit zum Aufbruch!", enGo: "Ziel wählen →", enDone: "Die Reise für heute ist erledigt: Morgen geht's wieder los.",
    enI: "Was ist Energie?", enSheetT: (n) => `${n}s Energie`,
    enSheet: (n) => [`Jedes Ziel, das du abhakst, gibt ${n} etwas Energie.`, "Mit halber Energie geht es auf einen kurzen Ausflug in der Nähe.", "Mit voller Energie geht es auf eine längere Reise, auch in die Ferne.", "Zurück kommt eine Postkarte und ein paar Tanì. Die Energie startet jeden Tag bei null."],
    back: (h) => `zurück um ${h}`, backTom: (h) => `morgen um ${h} zurück`, left: (x) => `in ${x}`,
    awayMeanwhile: "Du kannst inzwischen deine Ziele abhaken: Sie zählen trotzdem.", awayPlay: "Spielen", awayOpen: "Was macht er auf Reisen?",
    awayDone: (g) => `Geschafft! ${g}: Er sieht es, wenn er zurück ist.`,
    awaySheet: (n, d) => [`${n} reist nach ${d}: genießt den Ort und bringt dir eine Postkarte mit.`, "Mach du einfach weiter wie immer: Deine Ziele zählen auch jetzt (Tanì, Punkte und Serie).", "Die Spiele bleiben offen. Snack, Plaudern und Nickerchen gibt es wieder, wenn er zurück ist."],
    undoT: "Haken entfernen?", undoP: (g) => `„${g}“ ist wieder offen.`, undoGive: (x) => `Was es dir gebracht hat, wird zurückgenommen: ${x}.`,
    undoYes: "Haken entfernen", undoNo: "Erledigt lassen", undoDone: "Haken entfernt.", undoPts: (n) => `${n} Punkte`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Es gibt nichts zurückzunehmen.",
    progT: "Dein Fortschritt", progChip: "Fortschritt", giftRow: (n) => n === 1 ? "1\u00a0Geschenk in Folge" : `${n}\u00a0Geschenke in Folge`,
    passTier: (a, m = 50) => `Etappe ${a} von ${m}`, passClaim: (n) => n === 1 ? "1 Belohnung abholen" : `${n} Belohnungen abholen`,
    claimAll: (n) => `Alle abholen (${n})`, claimedAll: "Alles abgeholt!", howShow: "So funktioniert's", howHide: "Ausblenden",
    stop: "Stopp", lvShort: "Lv.",
    webT: "Gibt es in der Android-App", webP: (n) => `Tanetto Plus und Tanì-Pakete kaufst du in der Android-App bei Google Play. Mit einem kostenlosen Konto findest du ${n} und deinen ganzen Fortschritt auch dort.`,
    webSoon: "Die App kommt bald zu Google Play.", webFree: "Bis dahin verdienst du Tanì kostenlos: mit Zielen, Reisen, Spielen und dem Tagesgeschenk.",
    plusT: "Lust, Tanetto Plus zu testen?", plusP: (n, c) => `Magst du die Zeit mit ${n}? Mit Plus gibt es Reisen um die Welt, ${c} und jeden Monat ein Geschenk.`,
    plusTrial: (d) => `${d} Tage kostenlos`, plusThen: (p) => `danach ${p} · jederzeit kündbar`, plusFrom: (p) => `${p} · jederzeit kündbar`,
    plusGo: (d) => `${d} Tage kostenlos testen`, plusSub: "Plus entdecken", plusLater: "Nicht jetzt",
    daysAct: ["aktiver Tag", "aktive Tage"], goalsDone: ["Ziel geschafft", "Ziele geschafft"],
    talkMood: "Stimmung aus Plaudern", fut: "Kommt noch", resetP: "Begleiter, Fortschritt und Tagebuch werden für immer gelöscht.",
    shelfT: "Serien-Trophäen", passName: "Laternen-Saison", cityName: "Laternenstadt", lakeName: "Laternensee"
  },
  es: {
    tabs: { today: "Inicio", trips: "Viajes", home: "Tienda", diary: "Diario", more: "Perfil" },
    tripsT: "Viajes", homeT: "Tienda", moreT: "Perfil", todayT: "Objetivos de hoy",
    tut2: "Con energía, {n} se va de viaje. Abajo tienes Viajes, Tienda, Diario y Perfil.",
    ready: "¡Energía llena! Puedes mandarlo de viaje.", goTrip: "Elegir viaje", readySay: "¡Qué ganas de salir! ¿Adónde vamos?",
    allP: (n) => `¡${n} tiene la energía llena y está listo para un viaje!`, awayT: (n) => `${n} está de viaje`,
    en: "Energía", enOf: (a, b) => `${a}/${b}`, enCap: "Cada objetivo le da energía. A medias: excursión · llena: viaje.",
    enHalf: "¡Ya puede hacer una excursión!", enFull: "Energía llena: ¡listo para salir!", enGo: "Elegir destino →", enDone: "El viaje de hoy ya está hecho: mañana más.",
    enI: "¿Qué es la energía?", enSheetT: (n) => `La energía de ${n}`,
    enSheet: (n) => [`Cada objetivo que marcas le da energía a ${n}.`, "Con media energía puede hacer una excursión cerca.", "Con la energía llena se va de viaje más largo, incluso lejos.", "Vuelve con una postal y algunos Tanì. La energía empieza de cero cada día."],
    back: (h) => `vuelve a las ${h}`, backTom: (h) => `vuelve mañana a las ${h}`, left: (x) => `en ${x}`,
    awayMeanwhile: "Mientras tanto puedes marcar tus objetivos: cuentan igual.", awayPlay: "Jugar", awayOpen: "¿Qué hace de viaje?",
    awayDone: (g) => `¡Hecho! ${g}: lo verá al volver.`,
    awaySheet: (n, d) => [`${n} está de viaje en ${d}: disfruta del lugar y te trae una postal.`, "Tú sigue como siempre: tus objetivos cuentan también ahora (Tanì, puntos y racha).", "Los juegos siguen abiertos. Merienda, Charlar y Siesta vuelven cuando vuelva."],
    undoT: "¿Quitar la marca?", undoP: (g) => `«${g}» vuelve a estar pendiente.`, undoGive: (x) => `Se devuelve lo que te dio: ${x}.`,
    undoYes: "Quitar la marca", undoNo: "Dejarlo hecho", undoDone: "Marca quitada.", undoPts: (n) => `${n} puntos`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "No te dio nada que devolver.",
    progT: "Tu progreso", progChip: "Progreso", giftRow: (n) => n === 1 ? "1\u00a0regalo seguido" : `${n}\u00a0regalos seguidos`,
    passTier: (a, m = 50) => `Etapa ${a} de ${m}`, passClaim: (n) => n === 1 ? "1 premio por recoger" : `${n} premios por recoger`,
    claimAll: (n) => `Recoger todo (${n})`, claimedAll: "¡Todo recogido!", howShow: "Cómo funciona", howHide: "Ocultar",
    stop: "Parar", lvShort: "Nv.",
    webT: "Se activa en la app para Android", webP: (n) => `Tanetto Plus y los packs de Tanì se compran en la app para Android, en Google Play. Con una cuenta gratis encontrarás allí a ${n} y todo tu progreso.`,
    webSoon: "La app llega pronto a Google Play.", webFree: "Mientras tanto, los Tanì se ganan gratis: objetivos, viajes, juegos y el regalo del día.",
    plusT: "¿Te apetece probar Tanetto Plus?", plusP: (n, c) => `¿Te gusta pasar tiempo con ${n}? Con Plus tenéis viajes por todo el mundo, ${c} y un regalo cada mes.`,
    plusTrial: (d) => `${d} días gratis`, plusThen: (p) => `luego ${p} · cancela cuando quieras`, plusFrom: (p) => `${p} · cancela cuando quieras`,
    plusGo: (d) => `Probar ${d} días gratis`, plusSub: "Descubrir Plus", plusLater: "Ahora no",
    daysAct: ["día activo", "días activos"], goalsDone: ["objetivo completado", "objetivos completados"],
    talkMood: "Ánimo de Charlar", fut: "Próximamente", resetP: "Se borran para siempre el compañero, el progreso y el diario.",
    shelfT: "Trofeos de la racha", passName: "Temporada de los Farolillos", cityName: "Ciudad de los farolillos", lakeName: "Lago de los farolillos"
  },
  fr: {
    tabs: { today: "Accueil", trips: "Voyages", home: "Boutique", diary: "Journal", more: "Profil" },
    tripsT: "Voyages", homeT: "Boutique", moreT: "Profil", todayT: "Objectifs du jour",
    tut2: "Avec de l'énergie, {n} part en voyage. En bas, tu trouves Voyages, Boutique, Journal et Profil.",
    ready: "Énergie au max ! Tu peux l'envoyer en voyage.", goTrip: "Choisir le voyage", readySay: "J'ai trop envie de partir ! On va où ?",
    allP: (n) => `${n} a toute son énergie et est prêt pour un voyage !`, awayT: (n) => `${n} est en voyage`,
    en: "Énergie", enOf: (a, b) => `${a}/${b}`, enCap: "Chaque objectif donne de l'énergie. À moitié : balade · pleine : voyage.",
    enHalf: "Prêt pour une petite balade !", enFull: "Énergie au max : prêt à partir !", enGo: "Choisir où →", enDone: "Le voyage du jour est fait : on repart demain.",
    enI: "C'est quoi, l'énergie ?", enSheetT: (n) => `L'énergie de ${n}`,
    enSheet: (n) => [`Chaque objectif que tu coches donne de l'énergie à ${n}.`, "À moitié pleine, il peut faire une petite balade pas loin.", "Pleine, il part pour un voyage plus long, même très loin.", "Il revient avec une carte postale et quelques Tanì. L'énergie repart de zéro chaque jour."],
    back: (h) => `retour à ${h}`, backTom: (h) => `retour demain à ${h}`, left: (x) => `dans ${x}`,
    awayMeanwhile: "En attendant, tu peux cocher tes objectifs : ils comptent quand même.", awayPlay: "Jouer", awayOpen: "Que fait-il en voyage ?",
    awayDone: (g) => `Fait ! ${g} : il le verra en rentrant.`,
    awaySheet: (n, d) => [`${n} voyage vers ${d} : il profite de l'endroit et te rapporte une carte postale.`, "Toi, continue comme d'habitude : tes objectifs comptent aussi maintenant (Tanì, points et série).", "Les jeux restent ouverts. Goûter, Parler et Sieste reviennent avec lui."],
    undoT: "Décocher cet objectif ?", undoP: (g) => `« ${g} » est de nouveau à faire.`, undoGive: (x) => `Ce qu'il t'avait donné est repris : ${x}.`,
    undoYes: "Décocher", undoNo: "Laisser fait", undoDone: "Objectif décoché.", undoPts: (n) => `${n} points`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Il ne t'avait rien donné à reprendre.",
    progT: "Tes progrès", progChip: "Progrès", giftRow: (n) => n === 1 ? "1\u00a0cadeau d'affilée" : `${n}\u00a0cadeaux d'affilée`,
    passTier: (a, m = 50) => `Étape ${a} sur ${m}`, passClaim: (n) => n === 1 ? "1 récompense à récupérer" : `${n} récompenses à récupérer`,
    claimAll: (n) => `Tout récupérer (${n})`, claimedAll: "Tout est récupéré !", howShow: "Comment ça marche", howHide: "Masquer",
    stop: "Arrêter", lvShort: "Niv.",
    webT: "S'active dans l'app Android", webP: (n) => `Tanetto Plus et les packs de Tanì s'achètent dans l'app Android, sur Google Play. Avec un compte gratuit, tu y retrouves ${n} et toute ta progression.`,
    webSoon: "L'app arrive bientôt sur Google Play.", webFree: "En attendant, les Tanì se gagnent gratuitement : objectifs, voyages, jeux et cadeau du jour.",
    plusT: "Envie d'essayer Tanetto Plus ?", plusP: (n, c) => `Tu aimes passer du temps avec ${n} ? Avec Plus, vous avez des voyages dans le monde entier, ${c} et un cadeau chaque mois.`,
    plusTrial: (d) => `${d} jours gratuits`, plusThen: (p) => `puis ${p} · résiliable à tout moment`, plusFrom: (p) => `${p} · résiliable à tout moment`,
    plusGo: (d) => `Essayer ${d} jours gratuits`, plusSub: "Découvrir Plus", plusLater: "Pas maintenant",
    daysAct: ["jour actif", "jours actifs"], goalsDone: ["objectif atteint", "objectifs atteints"],
    talkMood: "Humeur de Parler", fut: "À venir", resetP: "Le compagnon, les progrès et le journal seront effacés pour toujours.",
    shelfT: "Trophées de série", passName: "Saison des Lanternes", cityName: "Ville des lanternes", lakeName: "Lac des lanternes"
  },
  pt: {
    tabs: { today: "Início", trips: "Viagens", home: "Loja", diary: "Diário", more: "Perfil" },
    tripsT: "Viagens", homeT: "Loja", moreT: "Perfil", todayT: "Metas de hoje",
    tut2: "Com energia, {n} sai em viagem. Aqui embaixo ficam Viagens, Loja, Diário e Perfil.",
    ready: "Energia cheia! Você pode mandá-lo viajar.", goTrip: "Escolher a viagem", readySay: "Que vontade de sair por aí! Para onde vamos?",
    allP: (n) => `${n} está com a energia cheia e pronto para uma viagem!`, awayT: (n) => `${n} está viajando`,
    en: "Energia", enOf: (a, b) => `${a}/${b}`, enCap: "Cada meta dá energia. Pela metade: passeio · cheia: viagem.",
    enHalf: "Já dá para um passeio curto!", enFull: "Energia cheia: pronto para sair!", enGo: "Escolher destino →", enDone: "A viagem de hoje já foi: amanhã tem mais.",
    enI: "O que é a energia?", enSheetT: (n) => `A energia de ${n}`,
    enSheet: (n) => [`Cada meta que você marca dá energia a ${n}.`, "Com metade da energia, dá para um passeio curto aqui perto.", "Com a energia cheia, sai para uma viagem mais longa, até bem longe.", "Volta com um postal e alguns Tanì. A energia começa do zero todo dia."],
    back: (h) => `volta às ${h}`, backTom: (h) => `volta amanhã às ${h}`, left: (x) => `em ${x}`,
    awayMeanwhile: "Enquanto isso, você pode marcar suas metas: elas contam do mesmo jeito.", awayPlay: "Jogar", awayOpen: "O que faz na viagem?",
    awayDone: (g) => `Feito! ${g}: vai ver quando voltar.`,
    awaySheet: (n, d) => [`${n} está viajando para ${d}: curtindo o lugar e trazendo um postal para você.`, "Você continua como sempre: suas metas contam agora também (Tanì, pontos e sequência).", "Os jogos continuam abertos. Lanche, Conversar e Soneca voltam quando ele voltar."],
    undoT: "Desmarcar esta meta?", undoP: (g) => `“${g}” volta a ficar pendente.`, undoGive: (x) => `O que ela te deu é devolvido: ${x}.`,
    undoYes: "Desmarcar", undoNo: "Deixar feita", undoDone: "Meta desmarcada.", undoPts: (n) => `${n} pontos`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Ela não te deu nada para devolver.",
    progT: "Seu progresso", progChip: "Progresso", giftRow: (n) => n === 1 ? "1\u00a0presente seguido" : `${n}\u00a0presentes seguidos`,
    passTier: (a, m = 50) => `Etapa ${a} de ${m}`, passClaim: (n) => n === 1 ? "1 prêmio para pegar" : `${n} prêmios para pegar`,
    claimAll: (n) => `Pegar tudo (${n})`, claimedAll: "Você pegou tudo!", howShow: "Como funciona", howHide: "Esconder",
    stop: "Parar", lvShort: "Nv.",
    webT: "Ativa no app para Android", webP: (n) => `Tanetto Plus e os pacotes de Tanì são comprados no app para Android, no Google Play. Com uma conta grátis você encontra ${n} e todo o seu progresso lá também.`,
    webSoon: "O app chega em breve ao Google Play.", webFree: "Enquanto isso, você ganha Tanì de graça: metas, viagens, jogos e o presente do dia.",
    plusT: "Que tal experimentar o Tanetto Plus?", plusP: (n, c) => `Curtindo o tempo com ${n}? Com o Plus vocês têm viagens pelo mundo todo, ${c} e um presente todo mês.`,
    plusTrial: (d) => `${d} dias grátis`, plusThen: (p) => `depois ${p} · cancele quando quiser`, plusFrom: (p) => `${p} · cancele quando quiser`,
    plusGo: (d) => `Testar ${d} dias grátis`, plusSub: "Conhecer o Plus", plusLater: "Agora não",
    daysAct: ["dia ativo", "dias ativos"], goalsDone: ["meta concluída", "metas concluídas"],
    talkMood: "Humor do Conversar", fut: "Em breve", resetP: "O companheiro, o progresso e o diário serão apagados para sempre.",
    shelfT: "Troféus da sequência", passName: "Temporada das Lanternas", cityName: "Cidade das lanternas", lakeName: "Lago das lanternas"
  },
  ja: {
    tabs: { today: "ホーム", trips: "おでかけ", home: "ショップ", diary: "日記", more: "マイページ" },
    tripsT: "おでかけ", homeT: "ショップ", moreT: "マイページ", todayT: "今日の目標",
    tut2: "元気がたまると、{n}はおでかけに行きます。下のメニューから、おでかけ・ショップ・日記・マイページに行けます。",
    ready: "元気満タン！おでかけに送り出せます。", goTrip: "おでかけ先を選ぶ", readySay: "早く出かけたいな！どこに行く？",
    allP: (n) => `${n}は元気満タン、おでかけの準備ばっちりです！`, awayT: (n) => `${n}はおでかけ中`,
    en: "元気", enOf: (a, b) => `${a}/${b}`, enCap: "目標ごとに元気がたまります。半分でちょっとおでかけ、満タンで本格的な旅。",
    enHalf: "ちょっとおでかけできます！", enFull: "元気満タン：出発できます！", enGo: "行き先を選ぶ →", enDone: "今日のおでかけはおしまい。また明日出かけましょう。",
    enI: "元気ってなに？", enSheetT: (n) => `${n}の元気`,
    enSheet: (n) => [`目標をひとつ達成するたびに、${n}に元気がたまります。`, "元気が半分あれば、近くへちょっとおでかけできます。", "元気が満タンなら、遠くまで長めのおでかけに出発します。", "ポストカードとTanìを持って帰ってきます。元気は毎日ゼロから始まります。"],
    back: (h) => `${h}に帰ってきます`, backTom: (h) => `明日の${h}に帰ってきます`, left: (x) => `あと${x}`,
    awayMeanwhile: "そのあいだも目標はチェックできます。ちゃんとカウントされます。", awayPlay: "あそぶ", awayOpen: "おでかけ中はなにをしてるの？",
    awayDone: (g) => `できました！${g}：帰ってきたら見てくれます。`,
    awaySheet: (n, d) => [`${n}は${d}におでかけ中。景色を楽しんで、ポストカードを持って帰ってきます。`, "あなたはいつもどおりで大丈夫。目標はいまもカウントされます（Tanì、ポイント、連続記録）。", "ゲームはいつでも遊べます。おやつ・おしゃべり・おひるねは、帰ってきたらまたできます。"],
    undoT: "チェックを外しますか？", undoP: (g) => `「${g}」はまだの状態に戻ります。`, undoGive: (x) => `もらったものは返します：${x}。`,
    undoYes: "チェックを外す", undoNo: "このままにする", undoDone: "チェックを外しました。", undoPts: (n) => `${n}ポイント`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "返すものはありません。",
    progT: "あなたの記録", progChip: "記録", giftRow: (n) => `プレゼント${n}日連続`,
    passTier: (a, m = 50) => `ステージ ${a}/${m}`, passClaim: (n) => `受け取れるごほうび ${n}個`,
    claimAll: (n) => `ぜんぶ受け取る（${n}）`, claimedAll: "ぜんぶ受け取りました！", howShow: "しくみ", howHide: "とじる",
    stop: "やめる", lvShort: "Lv.",
    webT: "Android アプリで使えます", webP: (n) => `Tanetto Plus と Tanì パックは、Google Play の Android アプリで購入できます。無料アカウントがあれば、アプリでも${n}とこれまでの記録にまた会えます。`,
    webSoon: "アプリはもうすぐ Google Play に登場します。", webFree: "それまでは Tanì を無料でためられます：目標、おでかけ、ゲーム、毎日のプレゼント。",
    plusT: "Tanetto Plus をためしてみませんか？", plusP: (n, c) => `${n}との毎日、楽しんでいますか？Plus なら世界中へのおでかけ、${c}、毎月のプレゼントが楽しめます。`,
    plusTrial: (d) => `${d}日間無料`, plusThen: (p) => `その後 ${p}・いつでも解約できます`, plusFrom: (p) => `${p}・いつでも解約できます`,
    plusGo: (d) => `${d}日間無料でためす`, plusSub: "Plus を見てみる", plusLater: "あとで",
    daysAct: ["がんばった日", "がんばった日"], goalsDone: ["達成した目標", "達成した目標"],
    talkMood: "おしゃべりで記録した気分", fut: "これから", resetP: "パートナー、記録、日記がすべて消えて、元に戻せません。",
    shelfT: "連続記録のトロフィー", passName: "ランタンのシーズン", cityName: "ランタンの町", lakeName: "ランタンの湖"
  },
  ko: {
    tabs: { today: "홈", trips: "여행", home: "상점", diary: "일기", more: "프로필" },
    tripsT: "여행", homeT: "상점", moreT: "프로필", todayT: "오늘의 목표",
    tut2: "에너지가 차면 {n}이(가) 여행을 떠나요. 아래에서 여행, 상점, 일기, 프로필을 찾을 수 있어요.",
    ready: "에너지 가득! 여행을 보내 줄 수 있어요.", goTrip: "여행지 고르기", readySay: "얼른 떠나고 싶어요! 어디로 갈까요?",
    allP: (n) => `${n}, 에너지 가득! 여행 떠날 준비 완료!`, awayT: (n) => `${n}, 여행 중`,
    en: "에너지", enOf: (a, b) => `${a}/${b}`, enCap: "목표마다 에너지가 차요. 절반이면 짧은 나들이, 가득 차면 여행.",
    enHalf: "짧은 나들이를 갈 수 있어요!", enFull: "에너지 가득: 출발할 수 있어요!", enGo: "여행지 고르기 →", enDone: "오늘 여행은 다녀왔어요. 내일 또 떠나요.",
    enI: "에너지가 뭐예요?", enSheetT: (n) => `${n}의 에너지`,
    enSheet: (n) => [`목표를 하나 체크할 때마다 ${n}에게 에너지가 생겨요.`, "에너지가 절반이면 가까운 곳으로 짧은 나들이를 갈 수 있어요.", "에너지가 가득 차면 멀리까지 더 긴 여행을 떠나요.", "엽서와 Tanì를 가지고 돌아와요. 에너지는 매일 0부터 다시 시작해요."],
    back: (h) => `${h}에 돌아와요`, backTom: (h) => `내일 ${h}에 돌아와요`, left: (x) => `${x} 남음`,
    awayMeanwhile: "그동안에도 목표를 체크할 수 있어요. 똑같이 인정돼요.", awayPlay: "놀기", awayOpen: "여행 가서 뭘 하고 있을까요?",
    awayDone: (g) => `완료! ${g}: 돌아오면 보게 될 거예요.`,
    awaySheet: (n, d) => [`${n}은(는) ${d}(으)로 여행 중이에요. 그곳을 즐기고 엽서를 가져올 거예요.`, "평소처럼 지내면 돼요. 지금 체크한 목표도 똑같이 인정돼요(Tanì, 포인트, 연속 기록).", "게임은 계속 열려 있어요. 간식, 이야기, 낮잠은 돌아오면 다시 할 수 있어요."],
    undoT: "체크를 해제할까요?", undoP: (g) => `‘${g}’이(가) 다시 할 일이 돼요.`, undoGive: (x) => `받은 것을 돌려줘요: ${x}.`,
    undoYes: "체크 해제", undoNo: "그대로 두기", undoDone: "체크를 해제했어요.", undoPts: (n) => `${n}포인트`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "돌려줄 것이 없어요.",
    progT: "나의 기록", progChip: "기록", giftRow: (n) => `선물 ${n}일 연속`,
    passTier: (a, m = 50) => `${a}/${m}단계`, passClaim: (n) => `받을 보상 ${n}개`,
    claimAll: (n) => `모두 받기 (${n})`, claimedAll: "모두 받았어요!", howShow: "방법 보기", howHide: "숨기기",
    stop: "멈추기", lvShort: "Lv.",
    webT: "Android 앱에서 이용할 수 있어요", webP: (n) => `Tanetto Plus와 Tanì 팩은 Google Play의 Android 앱에서 살 수 있어요. 무료 계정이 있으면 앱에서도 ${n}와(과) 모든 기록을 그대로 만날 수 있어요.`,
    webSoon: "앱이 곧 Google Play에 나와요.", webFree: "그동안 Tanì는 무료로 모을 수 있어요: 목표, 여행, 게임, 오늘의 선물.",
    plusT: "Tanetto Plus를 체험해 볼래요?", plusP: (n, c) => `${n}와(과) 함께하는 시간, 즐거운가요? Plus에서는 세계 곳곳으로 여행하고, ${c}을 만나고, 매달 선물도 받아요.`,
    plusTrial: (d) => `${d}일 무료`, plusThen: (p) => `이후 ${p} · 언제든 해지 가능`, plusFrom: (p) => `${p} · 언제든 해지 가능`,
    plusGo: (d) => `${d}일 무료 체험`, plusSub: "Plus 알아보기", plusLater: "나중에",
    daysAct: ["활동한 날", "활동한 날"], goalsDone: ["달성한 목표", "달성한 목표"],
    talkMood: "이야기에서 남긴 기분", fut: "예정", resetP: "친구, 진행 상황, 일기가 영원히 삭제돼요.",
    shelfT: "연속 기록 트로피", passName: "등불 시즌", cityName: "등불 마을", lakeName: "등불 호수"
  },
  zh: {
    tabs: { today: "首页", trips: "旅行", home: "商店", diary: "日记", more: "我的" },
    tripsT: "旅行", homeT: "商店", moreT: "我的", todayT: "今天的目标",
    tut2: "有了能量，{n} 就会去旅行。在下面你可以找到旅行、商店、日记和“我的”。",
    ready: "能量满了！可以送它去旅行了。", goTrip: "选择旅行", readySay: "好想出发呀！我们去哪儿？",
    allP: (n) => `${n} 能量满满，准备好去旅行了！`, awayT: (n) => `${n} 正在旅行`,
    en: "能量", enOf: (a, b) => `${a}/${b}`, enCap: "每完成一个目标就加能量。一半：短途出游 · 满：完整旅行。",
    enHalf: "可以去短途出游啦！", enFull: "能量满了：可以出发了！", enGo: "选择去哪 →", enDone: "今天已经旅行过了，明天再出发。",
    enI: "能量是什么？", enSheetT: (n) => `${n} 的能量`,
    enSheet: (n) => [`你每完成一个目标，${n} 就会获得一些能量。`, "能量到一半，就能去附近短途出游。", "能量满了，就能出发去更远、更久的旅行。", "它会带着明信片和一些 Tanì 回来。能量每天从零开始。"],
    back: (h) => `${h} 回来`, backTom: (h) => `明天 ${h} 回来`, left: (x) => `还有 ${x}`,
    awayMeanwhile: "这段时间你也可以打勾完成目标，照样算数。", awayPlay: "玩游戏", awayOpen: "它在旅行中做什么？",
    awayDone: (g) => `完成啦！${g}：它回来就会看到。`,
    awaySheet: (n, d) => [`${n} 正在去 ${d} 旅行：享受那里的风景，还会给你带回一张明信片。`, "你照常就好：现在完成的目标也会算数（Tanì、积分和连续记录）。", "游戏一直开放。点心、聊天和午睡等它回来再一起。"],
    undoT: "取消这个勾？", undoP: (g) => `“${g}”会变回未完成。`, undoGive: (x) => `它给你的会收回：${x}。`,
    undoYes: "取消勾选", undoNo: "保持完成", undoDone: "已取消勾选。", undoPts: (n) => `${n} 积分`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "没有需要收回的东西。",
    progT: "你的进度", progChip: "进度", giftRow: (n) => `连续 ${n} 天收到礼物`,
    passTier: (a, m = 50) => `第 ${a}/${m} 关`, passClaim: (n) => `${n} 个奖励待领取`,
    claimAll: (n) => `全部领取（${n}）`, claimedAll: "全部领取啦！", howShow: "怎么玩", howHide: "收起",
    stop: "停止", lvShort: "Lv.",
    webT: "在 Android 应用中开通", webP: (n) => `Tanetto Plus 和 Tanì 礼包需要在 Google Play 的 Android 应用里购买。有了免费账号，在应用里也能找回 ${n} 和你的全部进度。`,
    webSoon: "应用很快就会上架 Google Play。", webFree: "在那之前，Tanì 可以免费赚：目标、旅行、游戏和每日礼物。",
    plusT: "想试试 Tanetto Plus 吗？", plusP: (n, c) => `喜欢和 ${n} 在一起吗？有了 Plus，你们可以环游世界，还有 ${c}，每个月还有礼物。`,
    plusTrial: (d) => `免费 ${d} 天`, plusThen: (p) => `之后 ${p} · 随时可取消`, plusFrom: (p) => `${p} · 随时可取消`,
    plusGo: (d) => `免费试用 ${d} 天`, plusSub: "了解 Plus", plusLater: "以后再说",
    daysAct: ["活跃天数", "活跃天数"], goalsDone: ["完成的目标", "完成的目标"],
    talkMood: "聊天时记录的心情", fut: "即将到来", resetP: "你的小伙伴、进度和日记将被永久删除。",
    shelfT: "连续记录奖杯", passName: "灯笼季", cityName: "灯笼小镇", lakeName: "灯笼湖"
  },
  zht: {
    tabs: { today: "首頁", trips: "旅行", home: "商店", diary: "日記", more: "我的" },
    tripsT: "旅行", homeT: "商店", moreT: "我的", todayT: "今天的目標",
    tut2: "有了能量，{n} 就會去旅行。下方可以找到旅行、商店、日記和「我的」。",
    ready: "能量滿了！可以送牠去旅行了。", goTrip: "選擇旅行", readySay: "好想出發喔！我們去哪裡？",
    allP: (n) => `${n} 能量滿滿，準備好去旅行了！`, awayT: (n) => `${n} 正在旅行`,
    en: "能量", enOf: (a, b) => `${a}/${b}`, enCap: "每完成一個目標就加能量。一半：短途出遊 · 滿：完整旅行。",
    enHalf: "可以去短途出遊囉！", enFull: "能量滿了：可以出發了！", enGo: "選擇去哪 →", enDone: "今天已經旅行過了，明天再出發。",
    enI: "能量是什麼？", enSheetT: (n) => `${n} 的能量`,
    enSheet: (n) => [`你每完成一個目標，${n} 就會獲得一些能量。`, "能量到一半，就能去附近短途出遊。", "能量滿了，就能出發去更遠、更久的旅行。", "牠會帶著明信片和一些 Tanì 回來。能量每天從零開始。"],
    back: (h) => `${h} 回來`, backTom: (h) => `明天 ${h} 回來`, left: (x) => `還有 ${x}`,
    awayMeanwhile: "這段時間你也可以打勾完成目標，一樣算數。", awayPlay: "玩遊戲", awayOpen: "牠在旅行中做什麼？",
    awayDone: (g) => `完成囉！${g}：牠回來就會看到。`,
    awaySheet: (n, d) => [`${n} 正在去 ${d} 旅行：享受那裡的風景，還會帶一張明信片給你。`, "你照常就好：現在完成的目標也會算數（Tanì、積分和連續紀錄）。", "遊戲一直開放。點心、聊天和午睡等牠回來再一起。"],
    undoT: "取消這個勾？", undoP: (g) => `「${g}」會變回未完成。`, undoGive: (x) => `它給你的會收回：${x}。`,
    undoYes: "取消勾選", undoNo: "保持完成", undoDone: "已取消勾選。", undoPts: (n) => `${n} 積分`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "沒有需要收回的東西。",
    progT: "你的進度", progChip: "進度", giftRow: (n) => `連續 ${n} 天收到禮物`,
    passTier: (a, m = 50) => `第 ${a}/${m} 關`, passClaim: (n) => `${n} 個獎勵待領取`,
    claimAll: (n) => `全部領取（${n}）`, claimedAll: "全部領取囉！", howShow: "怎麼玩", howHide: "收起",
    stop: "停止", lvShort: "Lv.",
    webT: "在 Android App 中開通", webP: (n) => `Tanetto Plus 和 Tanì 禮包要在 Google Play 的 Android App 裡購買。有了免費帳號，在 App 裡也能找回 ${n} 和你的所有進度。`,
    webSoon: "App 很快就會上架 Google Play。", webFree: "在那之前，Tanì 可以免費賺：目標、旅行、遊戲和每日禮物。",
    plusT: "想試試 Tanetto Plus 嗎？", plusP: (n, c) => `喜歡和 ${n} 在一起嗎？有了 Plus，你們可以環遊世界，還有 ${c}，每個月還有禮物。`,
    plusTrial: (d) => `免費 ${d} 天`, plusThen: (p) => `之後${p} · 隨時可取消`, plusFrom: (p) => `${p} · 隨時可取消`,
    plusGo: (d) => `免費試用 ${d} 天`, plusSub: "了解 Plus", plusLater: "以後再說",
    daysAct: ["活躍天數", "活躍天數"], goalsDone: ["完成的目標", "完成的目標"],
    talkMood: "聊天時記錄的心情", fut: "即將到來", resetP: "你的小夥伴、進度和日記將被永久刪除。",
    shelfT: "連續紀錄獎盃", passName: "燈籠季", cityName: "燈籠小鎮", lakeName: "燈籠湖"
  },
  ru: {
    tabs: { today: "Главная", trips: "Поездки", home: "Магазин", diary: "Дневник", more: "Профиль" },
    tripsT: "Поездки", homeT: "Магазин", moreT: "Профиль", todayT: "Цели на сегодня",
    tut2: "С энергией {n} отправляется в поездку. Внизу — Поездки, Магазин, Дневник и Профиль.",
    ready: "Энергия полная! Можно отправить его в поездку.", goTrip: "Выбрать поездку", readySay: "Так хочется в путь! Куда отправимся?",
    allP: (n) => `${n}: энергия полная, можно отправляться в поездку!`, awayT: (n) => `${n} в поездке`,
    en: "Энергия", enOf: (a, b) => `${a}/${b}`, enCap: "Каждая цель даёт энергию. Половина — прогулка, полная — поездка.",
    enHalf: "Можно сходить на короткую прогулку!", enFull: "Энергия полная: можно отправляться!", enGo: "Выбрать куда →", enDone: "Сегодняшняя поездка уже была: завтра снова в путь.",
    enI: "Что такое энергия?", enSheetT: (n) => `Энергия: ${n}`,
    enSheet: (n) => [`${n} получает немного энергии за каждую отмеченную цель.`, "С половиной энергии можно сходить на короткую прогулку неподалёку.", "С полной энергией — в поездку подольше, даже далеко.", "Обратно — с открыткой и парой Tanì. Энергия каждый день начинается с нуля."],
    back: (h) => `вернётся в ${h}`, backTom: (h) => `вернётся завтра в ${h}`, left: (x) => `через ${x}`,
    awayMeanwhile: "А ты пока можешь отмечать цели: они всё равно засчитываются.", awayPlay: "Играть", awayOpen: "Что он делает в поездке?",
    awayDone: (g) => `Готово! ${g}: увидит, когда вернётся.`,
    awaySheet: (n, d) => [`${n} едет сюда: ${d}. Наслаждается видами и привезёт тебе открытку.`, "А ты продолжай как обычно: цели засчитываются и сейчас (Tanì, очки и серия).", "Игры открыты всегда. Перекус, разговор и сон — когда он вернётся."],
    undoT: "Снять отметку?", undoP: (g) => `«${g}» снова в списке дел.`, undoGive: (x) => `То, что она дала, вернётся обратно: ${x}.`,
    undoYes: "Снять отметку", undoNo: "Оставить", undoDone: "Отметка снята.", undoPts: (n) => `очки: ${n}`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Возвращать нечего.",
    progT: "Твой прогресс", progChip: "Прогресс", giftRow: (n) => `Подарки подряд: ${n}`,
    passTier: (a, m = 50) => `Этап ${a} из ${m}`, passClaim: (n) => `Награды к получению: ${n}`,
    claimAll: (n) => `Забрать всё (${n})`, claimedAll: "Всё получено!", howShow: "Как это работает", howHide: "Скрыть",
    stop: "Стоп", lvShort: "Ур.",
    webT: "Доступно в приложении для Android", webP: (n) => `Tanetto Plus и наборы Tanì покупаются в приложении для Android в Google Play. С бесплатным аккаунтом там будут и ${n}, и весь твой прогресс.`,
    webSoon: "Приложение скоро появится в Google Play.", webFree: "А пока Tanì можно зарабатывать бесплатно: цели, поездки, игры и подарок дня.",
    plusT: "Хочешь попробовать Tanetto Plus?", plusP: (n, c) => `${n} всегда рядом. С Plus — поездки по всему миру, ${c} и подарок каждый месяц.`,
    plusTrial: (d) => `${d} ${d % 10 === 1 && d % 100 !== 11 ? "день" : d % 10 >= 2 && d % 10 <= 4 && (d % 100 < 12 || d % 100 > 14) ? "дня" : "дней"} бесплатно`, plusThen: (p) => `затем ${p} · отмена в любой момент`, plusFrom: (p) => `${p} · отмена в любой момент`,
    plusGo: (d) => `Попробовать бесплатно`, plusSub: "Узнать о Plus", plusLater: "Не сейчас",
    daysAct: ["активный день", "активных дня", "активных дней"], goalsDone: ["выполненная цель", "выполненные цели", "выполненных целей"],
    talkMood: "Настроение из разговора", fut: "Впереди", resetP: "Питомец, прогресс и дневник будут удалены навсегда.",
    shelfT: "Трофеи серии", passName: "Сезон фонариков", cityName: "Город фонариков", lakeName: "Озеро фонариков"
  },
  pl: {
    tabs: { today: "Start", trips: "Podróże", home: "Sklep", diary: "Dziennik", more: "Profil" },
    tripsT: "Podróże", homeT: "Sklep", moreT: "Profil", todayT: "Cele na dziś",
    tut2: "Z energią {n} rusza w podróż. Na dole znajdziesz Podróże, Sklep, Dziennik i Profil.",
    ready: "Pełna energia! Możesz wysłać go w podróż.", goTrip: "Wybierz podróż", readySay: "Aż mnie nosi, żeby ruszyć! Dokąd jedziemy?",
    allP: (n) => `${n} ma pełną energię i jest gotów na podróż!`, awayT: (n) => `${n} jest w podróży`,
    en: "Energia", enOf: (a, b) => `${a}/${b}`, enCap: "Każdy cel daje energię. Połowa: wycieczka · pełna: podróż.",
    enHalf: "Gotowy na krótką wycieczkę!", enFull: "Pełna energia: można ruszać!", enGo: "Wybierz dokąd →", enDone: "Dzisiejsza podróż już była: jutro znowu w drogę.",
    enI: "Co to jest energia?", enSheetT: (n) => `Energia: ${n}`,
    enSheet: (n) => [`${n} dostaje trochę energii za każdy odhaczony cel.`, "Z połową energii może iść na krótką wycieczkę w pobliżu.", "Z pełną energią rusza w dłuższą podróż, nawet daleko.", "Wraca z pocztówką i kilkoma Tanì. Energia co dzień zaczyna się od zera."],
    back: (h) => `wróci o ${h}`, backTom: (h) => `wróci jutro o ${h}`, left: (x) => `za ${x}`,
    awayMeanwhile: "W tym czasie możesz odhaczać cele: liczą się tak samo.", awayPlay: "Graj", awayOpen: "Co robi w podróży?",
    awayDone: (g) => `Zrobione! ${g}: zobaczy to po powrocie.`,
    awaySheet: (n, d) => [`${n} podróżuje: ${d}. Cieszy się miejscem i przywiezie ci pocztówkę.`, "Ty rób swoje jak zawsze: cele liczą się także teraz (Tanì, punkty i seria).", "Gry są cały czas dostępne. Przekąska, rozmowa i drzemka wrócą razem z nim."],
    undoT: "Odznaczyć ten cel?", undoP: (g) => `„${g}” wraca do zrobienia.`, undoGive: (x) => `To, co ci dał, zostanie zabrane: ${x}.`,
    undoYes: "Odznacz", undoNo: "Zostaw zrobione", undoDone: "Cel odznaczony.", undoPts: (n) => `punkty: ${n}`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Nie ma nic do oddania.",
    progT: "Twoje postępy", progChip: "Postępy", giftRow: (n) => `Prezenty z rzędu: ${n}`,
    passTier: (a, m = 50) => `Etap ${a} z ${m}`, passClaim: (n) => `Nagrody do odebrania: ${n}`,
    claimAll: (n) => `Odbierz wszystko (${n})`, claimedAll: "Wszystko odebrane!", howShow: "Jak to działa", howHide: "Ukryj",
    stop: "Zatrzymaj", lvShort: "Poz.",
    webT: "Dostępne w aplikacji na Androida", webP: (n) => `Tanetto Plus i pakiety Tanì kupisz w aplikacji na Androida w Google Play. Z darmowym kontem czekają tam na ciebie ${n} i wszystkie twoje postępy.`,
    webSoon: "Aplikacja wkrótce pojawi się w Google Play.", webFree: "Na razie Tanì zdobywasz za darmo: cele, podróże, gry i prezent dnia.",
    plusT: "Chcesz wypróbować Tanetto Plus?", plusP: (n, c) => `Lubisz wspólne chwile? Z Plus czekają na was podróże po całym świecie, ${c} i prezent co miesiąc.`,
    plusTrial: (d) => `${d} dni za darmo`, plusThen: (p) => `potem ${p} · możesz anulować w każdej chwili`, plusFrom: (p) => `${p} · anulujesz w każdej chwili`,
    plusGo: (d) => `Wypróbuj ${d} dni za darmo`, plusSub: "Poznaj Plus", plusLater: "Nie teraz",
    daysAct: ["aktywny dzień", "aktywne dni", "aktywnych dni"], goalsDone: ["ukończony cel", "ukończone cele", "ukończonych celów"],
    talkMood: "Nastrój z rozmowy", fut: "Przed tobą", resetP: "Towarzysz, postępy i dziennik zostaną usunięte na zawsze.",
    shelfT: "Trofea za serię", passName: "Sezon Lampionów", cityName: "Miasteczko Lampionów", lakeName: "Jezioro Lampionów"
  },
  nl: {
    tabs: { today: "Thuis", trips: "Reizen", home: "Winkel", diary: "Dagboek", more: "Profiel" },
    tripsT: "Reizen", homeT: "Winkel", moreT: "Profiel", todayT: "Doelen van vandaag",
    tut2: "Met energie gaat {n} op reis. Hieronder vind je Reizen, Winkel, Dagboek en Profiel.",
    ready: "Volle energie! Je kunt hem op reis sturen.", goTrip: "Kies een reis", readySay: "Ik wil zo graag op pad! Waar gaan we heen?",
    allP: (n) => `${n} heeft volle energie en is klaar voor een reis!`, awayT: (n) => `${n} is op reis`,
    en: "Energie", enOf: (a, b) => `${a}/${b}`, enCap: "Elk doel geeft energie. Half: kort uitje · vol: hele reis.",
    enHalf: "Klaar voor een kort uitje!", enFull: "Volle energie: klaar om te gaan!", enGo: "Kies waarheen →", enDone: "De reis van vandaag is gedaan: morgen weer op pad.",
    enI: "Wat is energie?", enSheetT: (n) => `De energie van ${n}`,
    enSheet: (n) => [`Elk doel dat je afvinkt, geeft ${n} wat energie.`, "Met halve energie kan hij een kort uitje in de buurt maken.", "Met volle energie gaat hij op een langere reis, ook ver weg.", "Hij komt terug met een ansichtkaart en wat Tanì. De energie begint elke dag bij nul."],
    back: (h) => `terug om ${h}`, backTom: (h) => `morgen terug om ${h}`, left: (x) => `over ${x}`,
    awayMeanwhile: "Ondertussen kun je je doelen afvinken: ze tellen gewoon mee.", awayPlay: "Spelen", awayOpen: "Wat doet hij op reis?",
    awayDone: (g) => `Gedaan! ${g}: hij ziet het als hij terug is.`,
    awaySheet: (n, d) => [`${n} reist naar ${d}: geniet van de plek en neemt een ansichtkaart voor je mee.`, "Ga jij gewoon door zoals altijd: je doelen tellen nu ook mee (Tanì, punten en reeks).", "De spelletjes blijven open. Snack, Kletsen en Dutje zijn er weer als hij terug is."],
    undoT: "Vinkje weghalen?", undoP: (g) => `“${g}” staat weer open.`, undoGive: (x) => `Wat het je gaf, gaat terug: ${x}.`,
    undoYes: "Vinkje weghalen", undoNo: "Laten staan", undoDone: "Vinkje weggehaald.", undoPts: (n) => `${n} punten`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Er is niets terug te geven.",
    progT: "Je voortgang", progChip: "Voortgang", giftRow: (n) => n === 1 ? "1\u00a0cadeau op rij" : `${n}\u00a0cadeaus op rij`,
    passTier: (a, m = 50) => `Etappe ${a} van ${m}`, passClaim: (n) => n === 1 ? "1 beloning op te halen" : `${n} beloningen op te halen`,
    claimAll: (n) => `Alles ophalen (${n})`, claimedAll: "Alles opgehaald!", howShow: "Hoe het werkt", howHide: "Verbergen",
    stop: "Stop", lvShort: "Nv.",
    webT: "Werkt in de Android-app", webP: (n) => `Tanetto Plus en Tanì-pakketten koop je in de Android-app via Google Play. Met een gratis account vind je ${n} en al je voortgang daar ook terug.`,
    webSoon: "De app komt binnenkort naar Google Play.", webFree: "Tot die tijd verdien je Tanì gratis: doelen, reizen, spelletjes en het cadeau van de dag.",
    plusT: "Zin om Tanetto Plus te proberen?", plusP: (n, c) => `Geniet je van je tijd met ${n}? Met Plus krijgen jullie reizen over de hele wereld, ${c} en elke maand een cadeau.`,
    plusTrial: (d) => `${d} dagen gratis`, plusThen: (p) => `daarna ${p} · altijd opzegbaar`, plusFrom: (p) => `${p} · altijd opzegbaar`,
    plusGo: (d) => `${d} dagen gratis proberen`, plusSub: "Ontdek Plus", plusLater: "Niet nu",
    daysAct: ["actieve dag", "actieve dagen"], goalsDone: ["doel gehaald", "doelen gehaald"],
    talkMood: "Stemming uit Kletsen", fut: "Komt nog", resetP: "Je maatje, je voortgang en je dagboek worden voorgoed gewist.",
    shelfT: "Reekstrofeeën", passName: "Lampionseizoen", cityName: "Lampionstad", lakeName: "Lampionmeer"
  },
  tr: {
    tabs: { today: "Ana sayfa", trips: "Geziler", home: "Mağaza", diary: "Günlük", more: "Profil" },
    tripsT: "Geziler", homeT: "Mağaza", moreT: "Profil", todayT: "Bugünün hedefleri",
    tut2: "Enerjisi olunca {n} geziye çıkar. Aşağıda Geziler, Mağaza, Günlük ve Profil'i bulursun.",
    ready: "Enerji dolu! Onu geziye gönderebilirsin.", goTrip: "Gezi seç", readySay: "Yola çıkmak için sabırsızlanıyorum! Nereye gidiyoruz?",
    allP: (n) => `${n} enerji dolu ve geziye hazır!`, awayT: (n) => `${n} gezide`,
    en: "Enerji", enOf: (a, b) => `${a}/${b}`, enCap: "Her hedef enerji verir. Yarısı: kısa gezinti · dolu: gezi.",
    enHalf: "Kısa bir gezintiye hazır!", enFull: "Enerji dolu: yola çıkabilir!", enGo: "Nereye? →", enDone: "Bugünün gezisi yapıldı: yarın yine yola çıkarız.",
    enI: "Enerji nedir?", enSheetT: (n) => `${n} için enerji`,
    enSheet: (n) => [`İşaretlediğin her hedef ${n} için biraz enerji demek.`, "Enerjinin yarısıyla yakınlarda kısa bir gezintiye çıkabilir.", "Enerji dolunca daha uzun bir geziye, uzaklara bile gider.", "Bir kartpostal ve biraz Tanì ile döner. Enerji her gün sıfırdan başlar."],
    back: (h) => `dönüş: ${h}`, backTom: (h) => `dönüş: yarın ${h}`, left: (x) => `${x} sonra`,
    awayMeanwhile: "Bu arada hedeflerini işaretleyebilirsin: yine sayılır.", awayPlay: "Oyna", awayOpen: "Gezide ne yapıyor?",
    awayDone: (g) => `Tamam! ${g}: dönünce görecek.`,
    awaySheet: (n, d) => [`${n} şu an ${d} gezisinde: oranın tadını çıkarıyor ve sana bir kartpostal getirecek.`, "Sen her zamanki gibi devam et: hedeflerin şimdi de sayılır (Tanì, puan ve seri).", "Oyunlar hep açık. Atıştırmalık, Sohbet ve Şekerleme o dönünce geri gelir."],
    undoT: "İşareti kaldıralım mı?", undoP: (g) => `“${g}” yeniden yapılacaklara döner.`, undoGive: (x) => `Sana verdikleri geri alınır: ${x}.`,
    undoYes: "İşareti kaldır", undoNo: "Yapıldı kalsın", undoDone: "İşaret kaldırıldı.", undoPts: (n) => `${n} puan`, undoTani: (n) => `${n} Tanì`,
    undoNothing: "Geri alınacak bir şey yok.",
    progT: "İlerlemen", progChip: "İlerleme", giftRow: (n) => `Üst üste ${n}\u00a0hediye`,
    passTier: (a, m = 50) => `Aşama ${a}/${m}`, passClaim: (n) => `Alınacak ödül: ${n}`,
    claimAll: (n) => `Hepsini al (${n})`, claimedAll: "Hepsi alındı!", howShow: "Nasıl çalışır", howHide: "Gizle",
    stop: "Durdur", lvShort: "Sv.",
    webT: "Android uygulamasında açılır", webP: (n) => `Tanetto Plus ve Tanì paketleri Google Play'deki Android uygulamasından alınır. Ücretsiz bir hesapla ${n} ve tüm ilerlemen orada da seni bekler.`,
    webSoon: "Uygulama yakında Google Play'de.", webFree: "Bu arada Tanì'yi ücretsiz kazanırsın: hedefler, geziler, oyunlar ve günün hediyesi.",
    plusT: "Tanetto Plus'ı denemek ister misin?", plusP: (n, c) => `${n} ile vakit geçirmek hoşuna gidiyor mu? Plus ile dünyanın her yerine geziler, ${c} ve her ay bir hediye var.`,
    plusTrial: (d) => `${d} gün ücretsiz`, plusThen: (p) => `sonra ${p} · istediğin zaman iptal et`, plusFrom: (p) => `${p} · istediğin zaman iptal et`,
    plusGo: (d) => `${d} gün ücretsiz dene`, plusSub: "Plus'ı keşfet", plusLater: "Şimdi değil",
    daysAct: ["aktif gün", "aktif gün"], goalsDone: ["tamamlanan hedef", "tamamlanan hedef"],
    talkMood: "Sohbet'ten ruh hâli", fut: "Yakında", resetP: "Arkadaşın, ilerlemen ve günlüğün kalıcı olarak silinecek.",
    shelfT: "Seri kupaları", passName: "Fenerler Sezonu", cityName: "Fener Kasabası", lakeName: "Fener Gölü"
  }
};
const nav20 = () => NAV20_T[S.lang] || NAV20_T.en;
/* plurale: [uno, pochi(, molti)] — russo e polacco hanno tre forme */
function nav20pl(n, f) {
  if (!f) return "";
  if (f.length < 3) return n === 1 ? f[0] : f[1];
  const a = n % 10, b = n % 100;
  if (S.lang === "pl") return n === 1 ? f[0] : a >= 2 && a <= 4 && (b < 12 || b > 14) ? f[1] : f[2];
  return a === 1 && b !== 11 ? f[0] : a >= 2 && a <= 4 && (b < 12 || b > 14) ? f[1] : f[2];
}
function nav20st() {
  const d = { undo: {}, plus: { n: 0, last: null, off: null } };
  if (!S.v20nav || typeof S.v20nav !== "object") S.v20nav = d;
  const s = S.v20nav; if (!s.undo || typeof s.undo !== "object") s.undo = {}; if (!s.plus || typeof s.plus !== "object") s.plus = d.plus;
  return s;
}

/* --- Nomi delle sezioni e frasi che le citano (14 lingue) --- */
const NAV20_REF = {
  it: [[/In «Altro»/g, "Nel «Profilo»"], [/\(Altro ›/g, "(Profilo ›"], [/da Altro ›/g, "dal Profilo ›"], [/da Altro\b/g, "dal Profilo"], [/in Altro ›/g, "nel Profilo ›"], [/in Altro\b/g, "nel Profilo"], [/Altro ›/g, "Profilo ›"]],
  en: [[/“More”/g, "“Profile”"], [/\(More ›/g, "(Profile ›"], [/from More\b/g, "from Profile"], [/in More\b/g, "in Profile"], [/More ›/g, "Profile ›"]],
  de: [[/„Mehr“/g, "„Profil“"], [/unter Mehr\b/g, "unter Profil"], [/\(Mehr ›/g, "(Profil ›"], [/Mehr ›/g, "Profil ›"]],
  es: [[/«Más»/g, "«Perfil»"], [/desde Más\b/g, "desde Perfil"], [/en Más\b/g, "en Perfil"], [/\(Más ›/g, "(Perfil ›"], [/Más ›/g, "Perfil ›"]],
  fr: [[/« Plus »/g, "« Profil »"], [/depuis Plus\b/g, "depuis Profil"], [/dans Plus\b/g, "dans Profil"], [/\(Plus ›/g, "(Profil ›"], [/(^|[^o] )Plus ›/g, "$1Profil ›"]],
  pt: [[/“Mais”/g, "“Perfil”"], [/em Mais\b/g, "em Perfil"], [/\(Mais ›/g, "(Perfil ›"], [/Mais ›/g, "Perfil ›"]],
  ja: [[/その他 ›/g, "マイページ ›"], [/「その他」/g, "「マイページ」"], [/（その他/g, "（マイページ"]],
  ko: [[/‘더 보기’/g, "‘프로필’"], [/더 보기 ›/g, "프로필 ›"]],
  zh: [[/“更多”/g, "“我的”"], [/“更多 ›/g, "“我的 ›"], [/更多 ›/g, "我的 ›"]],
  zht: [[/「更多」/g, "「我的」"], [/「更多 ›/g, "「我的 ›"], [/更多 ›/g, "我的 ›"]],
  ru: [[/«Ещё»/g, "«Профиль»"]],
  pl: [[/„Więcej”/g, "„Profil”"], [/w Więcej ›/g, "w zakładce Profil ›"], [/w zakładce Więcej\b/g, "w zakładce Profil"], [/\(Więcej ›/g, "(Profil ›"], [/Więcej ›/g, "Profil ›"]],
  nl: [[/“Meer”/g, "“Profiel”"], [/bij Meer\b/g, "bij Profiel"], [/via Meer\b/g, "via Profiel"], [/\(Meer ›/g, "(Profiel ›"], [/Meer ›/g, "Profiel ›"]],
  tr: [[/“Diğer”/g, "“Profil”"], [/Diğer bölümünden/g, "Profil bölümünden"], [/\(Diğer ›/g, "(Profil ›"], [/Diğer ›/g, "Profil ›"]]
};
/* solo le frasi che parlano della navigazione (le altre "altro/più" sono parole normali) */
const NAV20_REF_KEYS = ["freeP", "talkHelp", "guide", "guideAdd", "acct.skipP", "acct.webP", "chat.R.help", "privDoc", "terms", "inst", "acct"];
function nav20fixRefs(lg) {
  const rules = NAV20_REF[lg]; const o = T[lg]; if (!rules || !o) return;
  const fix = (s) => { let r = s; rules.forEach(([re, to]) => { r = r.replace(re, to); }); return r; };
  const walk = (obj, k, depth) => {
    if (depth > 5 || obj == null) return; const v = obj[k];
    if (typeof v === "string") { const f = fix(v); if (f !== v) obj[k] = f; }
    else if (Array.isArray(v)) v.forEach((_, i) => walk(v, i, depth + 1));
    else if (v && typeof v === "object") Object.keys(v).forEach((kk) => walk(v, kk, depth + 1));
  };
  NAV20_REF_KEYS.forEach((path) => { const parts = path.split("."); let p = o; for (let i = 0; i < parts.length - 1 && p; i++) p = p[parts[i]]; if (p) walk(p, parts[parts.length - 1], 0); });
}
function nav20texts() {
  Object.keys(T).forEach((lg) => {
    const o = T[lg], n = NAV20_T[lg]; if (!o || !n) return;
    try {
      o.tabs = Object.assign({}, o.tabs, n.tabs); o.tripsT = n.tripsT; o.homeT = n.homeT; o.moreT = n.moreT; o.todayT = n.todayT;
      if (Array.isArray(o.tut) && o.tut.length >= 3) o.tut[2] = n.tut2;
      o.ready = n.ready; o.goTrip = n.goTrip; o.awayT = n.awayT;
      o.visitL = n.giftRow; /* "Torna domani!": stesso nome del contatore in Casa e in Profilo (era "giorni di visita") */
      if (o.talk && Array.isArray(o.talk.ready)) o.talk.ready = [n.readySay];
      if (o.v13) { o.v13.allB = n.goTrip; o.v13.allP = n.allP; }
      if (o.festival) o.festival.name = n.lakeName;
      if (o.season && o.season.names) o.season.names.lanterns = n.passName;
      if (o.dests) o.dests.city = n.cityName;
      if (typeof V18T !== "undefined" && V18T[lg]) V18T[lg].shelfT = n.shelfT;
      nav20fixRefs(lg);
    } catch (e) { /* una lingua incompleta non blocca le altre */ }
  });
}
nav20texts();
/* numero e parola sempre sulla stessa riga ("15 Tanì", "1 scudo"): spazio che non va a capo, in tutte le lingue */
const nav20nb = (s) => (typeof s === "string" ? s.replace(/(\d) (?=[^\s\d])/g, "$1\u00a0") : s);
const nav20nbFn = (f) => (typeof f === "function" ? (...a) => nav20nb(f(...a)) : f);
Object.keys(T).forEach((lg) => {
  const o = T[lg]; if (!o) return;
  try {
    if (o.season) { o.season.tani = nav20nbFn(o.season.tani); o.season.shield = nav20nbFn(o.season.shield); }
    o.levelUpP = nav20nbFn(o.levelUpP);
    if (typeof V19 !== "undefined" && V19[lg] && typeof V19[lg].lvGift === "string") V19[lg].lvGift = nav20nb(V19[lg].lvGift);
  } catch (e) { /* niente */ }
});

/* "Avventure" diventa "Viaggi" anche nelle schede della gita (98c_v20_trips) */
const NAV20_TRIPFIX = {
  it: ["Come funzionano i viaggi", "Oggi non hai obiettivi: i viaggi ripartono dal prossimo giorno con obiettivi."],
  en: ["How trips work", "No goals today: trips start again on your next day with goals."],
  de: ["So funktionieren Reisen", "Heute hast du keine Ziele: Reisen gibt es wieder am nächsten Tag mit Zielen."],
  es: ["Cómo funcionan los viajes", "Hoy no tienes objetivos: los viajes vuelven el próximo día con objetivos."],
  fr: ["Comment marchent les voyages", "Pas d'objectifs aujourd'hui : les voyages reprennent au prochain jour avec des objectifs."],
  pt: ["Como funcionam as viagens", "Hoje você não tem metas: as viagens voltam no próximo dia com metas."],
  ja: ["おでかけのしくみ", "今日は目標がありません。次に目標がある日に、またおでかけできます。"],
  ko: ["여행은 이렇게 돼요", "오늘은 목표가 없어요. 목표가 있는 다음 날에 다시 여행을 떠날 수 있어요."],
  zh: ["旅行是怎么回事", "今天没有目标：到下一个有目标的日子，旅行会再开始。"],
  zht: ["旅行是怎麼一回事", "今天沒有目標：到下一個有目標的日子，旅行會再開始。"],
  ru: ["Как устроены поездки", "Сегодня у тебя нет целей: поездки снова будут в ближайший день с целями."],
  pl: ["Jak działają podróże", "Dziś nie masz celów: podróże wracają w kolejny dzień z celami."],
  nl: ["Zo werken reizen", "Vandaag heb je geen doelen: reizen gaan verder op je volgende dag met doelen."],
  tr: ["Geziler nasıl işler", "Bugün hedefin yok: geziler hedefin olan bir sonraki gün yeniden başlar."]
};
try { if (typeof TR20T !== "undefined") Object.keys(NAV20_TRIPFIX).forEach((l) => { if (TR20T[l]) { TR20T[l].infoT = NAV20_TRIPFIX[l][0]; TR20T[l].stFree = NAV20_TRIPFIX[l][1]; } }); } catch (e) { /* 98c assente */ }


/* "Come funziona": l'energia spiegata come funziona adesso (gita breve a meta', viaggio completo con tutti gli
   obiettivi), "viaggi" al posto di "avventure"; "4 scelti su 3-8" diventa "4 obiettivi (da 3 a 8)" */
const NAV20_GUIDE = {
  it: ["Con i Tanì arredi la casa e scegli cosa indossa il compagno. Li guadagni con gli obiettivi, i regali, i viaggi e i giochi.", "Ogni obiettivo che segni dà energia al compagno. A metà degli obiettivi può fare una gita breve qui vicino; con tutti, l'energia è piena e parte per un viaggio completo. Torna con una cartolina.", (n) => n === 1 ? "1 obiettivo (da 3 a 8)" : `${n} obiettivi (da 3 a 8)`],
  en: ["With Tanì you decorate the home and choose what your companion wears. You earn them with goals, gifts, trips and games.", "Every goal you tick gives your companion energy. With half your goals done, they can take a short trip nearby; with all of them, energy is full and they set off on a full trip. They come back with a postcard.", (n) => n === 1 ? "1 goal (3 to 8)" : `${n} goals (3 to 8)`],
  de: ["Mit Tanì richtest du das Zuhause ein und wählst, was dein Begleiter trägt. Du bekommst sie durch Ziele, Geschenke, Reisen und Spiele.", "Jedes Ziel, das du abhakst, gibt deinem Begleiter Energie. Mit der Hälfte der Ziele kann er einen kurzen Ausflug in die Nähe machen; mit allen ist die Energie voll und er geht auf eine ganze Reise. Er kommt mit einer Postkarte zurück.", (n) => n === 1 ? "1 Ziel (3 bis 8)" : `${n} Ziele (3 bis 8)`],
  es: ["Con los Tanì decoras la casa y eliges qué se pone tu compañero. Los ganas con objetivos, regalos, viajes y juegos.", "Cada objetivo que marcas le da energía a tu compañero. Con la mitad de los objetivos puede hacer una excursión corta cerca; con todos, la energía se llena y se va de viaje completo. Vuelve con una postal.", (n) => n === 1 ? "1 objetivo (de 3 a 8)" : `${n} objetivos (de 3 a 8)`],
  fr: ["Avec les Tanì, tu décores la maison et choisis ce que porte ton compagnon. Tu les gagnes avec les objectifs, les cadeaux, les voyages et les jeux.", "Chaque objectif coché donne de l'énergie à ton compagnon. Avec la moitié des objectifs, il peut faire une petite balade pas loin ; avec tous, l'énergie est au max et il part pour un grand voyage. Il revient avec une carte postale.", (n) => n === 1 ? "1 objectif (de 3 à 8)" : `${n} objectifs (de 3 à 8)`],
  pt: ["Com os Tanì você decora a casa e escolhe o que seu companheiro veste. Você ganha com metas, presentes, viagens e jogos.", "Cada meta que você marca dá energia ao seu companheiro. Com metade das metas ele pode fazer um passeio curto aqui perto; com todas, a energia fica cheia e ele sai para uma viagem completa. Volta com um postal.", (n) => n === 1 ? "1 meta (de 3 a 8)" : `${n} metas (de 3 a 8)`],
  ja: ["Tanìでおうちを飾ったり、パートナーの服を選んだりできます。目標、プレゼント、おでかけ、ゲームでもらえます。", "目標をひとつ達成するたびに、パートナーに元気がたまります。半分達成すると近くへちょっとおでかけ、ぜんぶ達成すると元気満タンで本格的な旅に出られます。ポストカードを持って帰ってきます。", (n) => `${n}個（3〜8個）`],
  ko: ["Tanì로 집을 꾸미고 친구가 입을 옷을 고를 수 있어요. 목표, 선물, 여행, 게임으로 모을 수 있어요.", "목표를 하나 체크할 때마다 친구에게 에너지가 생겨요. 절반을 달성하면 가까운 곳으로 짧은 나들이를, 모두 달성하면 에너지가 가득 차서 본격 여행을 떠나요. 엽서를 들고 돌아와요.", (n) => `목표 ${n}개 (3~8개)`],
  zh: ["用 Tanì 可以装饰小家，还可以给小伙伴挑选穿戴的东西。完成目标、领取礼物、旅行和玩游戏都能赚到 Tanì。", "每完成一个目标，小伙伴就会获得能量。完成一半目标，它可以去附近短途出游；全部完成，能量就满了，可以出发去完整旅行。它会带回一张明信片。", (n) => `${n} 个目标（3–8 个）`],
  zht: ["用 Tanì 可以布置小屋，還能選擇小夥伴的穿搭。完成目標、領取禮物、旅行和玩遊戲都能賺到 Tanì。", "每完成一個目標，小夥伴就會獲得能量。完成一半目標，牠可以去附近短途出遊；全部完成，能量就滿了，可以出發去完整旅行。牠會帶回一張明信片。", (n) => `${n} 個目標（3–8 個）`],
  ru: ["За Tanì можно украшать дом и выбирать, во что одеть питомца. Их можно получить за цели, подарки, поездки и игры.", "Каждая отмеченная цель даёт питомцу энергию. С половиной целей он может сходить на короткую прогулку неподалёку, а когда выполнены все — энергия полная, и он отправляется в большое путешествие. Возвращается с открыткой.", (n) => `Целей: ${n} (от 3 до 8)`],
  pl: ["Za Tanì urządzasz dom i wybierasz, co nosi twój towarzysz. Zdobywasz je za cele, prezenty, podróże i gry.", "Każdy odhaczony cel daje towarzyszowi energię. Z połową celów może iść na krótką wycieczkę w pobliżu; ze wszystkimi energia jest pełna i rusza w pełną podróż. Wraca z pocztówką.", (n) => `Cele: ${n} (od 3 do 8)`],
  nl: ["Met Tanì versier je het huis en kies je wat je maatje draagt. Je verdient ze met doelen, cadeaus, reizen en spelletjes.", "Elk doel dat je afvinkt, geeft je maatje energie. Met de helft van je doelen kan het een kort uitje in de buurt maken; met alle doelen is de energie vol en gaat het op een hele reis. Het komt terug met een ansichtkaart.", (n) => n === 1 ? "1 doel (3 tot 8)" : `${n} doelen (3 tot 8)`],
  tr: ["Tanì ile evi süsler ve arkadaşının ne giyeceğini seçersin. Tanì'yi hedeflerle, hediyelerle, gezilerle ve oyunlarla kazanırsın.", "İşaretlediğin her hedef arkadaşına enerji verir. Hedeflerin yarısıyla yakına kısa bir gezintiye çıkabilir; hepsiyle enerji dolar ve tam bir yolculuğa çıkar. Bir kartpostalla geri döner.", (n) => `${n} hedef (3 ile 8 arası)`]
};
Object.keys(NAV20_GUIDE).forEach((lg) => {
  const o = T[lg], g = NAV20_GUIDE[lg]; if (!o) return;
  try { if (Array.isArray(o.guide) && o.guide[1] && o.guide[2]) { o.guide[1] = [o.guide[1][0], g[0]]; o.guide[2] = [o.guide[2][0], g[1]]; } o.goalsCount = g[2]; } catch (e) { /* niente */ }
});

/* =================== ICONE E BARRA DELLE SEZIONI =================== */
const NAV20_IC = {
  today: '<path d="M3.5 11.2 12 4l8.5 7.2"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5.2a2 2 0 0 1 4 0V20"/>',
  home: '<path d="M5 8h14l-1.2 11.2a1.6 1.6 0 0 1-1.6 1.4H7.8a1.6 1.6 0 0 1-1.6-1.4Z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>',
  more: '<circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20.2c.9-3.8 3.7-5.8 7.2-5.8s6.3 2 7.2 5.8"/>'
};
ICON.nvbolt = '<path d="M13 3 5.5 13.2H11L10 21l7.5-10.4H12Z"/>';
ICON.nvinfo = '<circle cx="12" cy="12" r="9.2"/><path d="M12 11v5.6"/><path d="M12 7.6v.2" stroke-width="2.6"/>';
const nav20svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${NAV20_IC[k]}</svg>`;
const _renderTabsNav20 = renderTabs;
renderTabs = function () {
  _renderTabsNav20();
  try {
    document.querySelectorAll("#tabsIn button.tab").forEach((b) => {
      const k = b.dataset.tab; if (!NAV20_IC[k]) return; const ic = b.querySelector(".ic"); if (!ic || ic.dataset.nv20 === k) return;
      ic.innerHTML = nav20svg(k); ic.dataset.nv20 = k;
    });
  } catch (e) { /* niente */ }
};

/* --- Intestazione: "★ Liv. 11" invece di "★ 11" (sembrava un voto) --- */
const _topBarNav20 = topBar;
topBar = function () {
  const h = _topBarNav20(); if (!S.pet) return h;
  return h.replace(/(<button class="pill lvpill" id="lvBtn"[^>]*>[\s\S]*?<\/svg>)<span>(\d+)<\/span>/, (m, a, n) => `${a}<span><small class="nvlv">${esc(nav20().lvShort)}</small> ${n}</span>`);
};

/* =================== CASA =================== */
/* Energia: barra a segmenti (un segmento per obiettivo) con la meta' segnata, frase e pulsante giusti per il momento */
function nav20energyInfo() {
  if (typeof tr20Info === "function") { try { return tr20Info(); } catch (e) { /* calcolo semplice */ } }
  const tg = todayGoals(); const n = tg.length; const dn = S.done.filter((g) => tg.includes(g)).length; const half = Math.ceil(n / 2);
  const why = S.away ? "away" : !n ? "free" : S.energy >= 99.9 ? "full" : "need";
  return { why, kind: why === "full" ? "full" : null, n, dn, half, needShort: Math.max(0, half - dn), needFull: Math.max(0, n - dn) };
}
function nav20energy() {
  const st = nav20energyInfo(); if (st.why === "away" || st.why === "free" || !st.n || story) return "";
  const t = nav20(), n = S.petName || ""; const tt = typeof tr20t === "function" ? tr20t() : null;
  let txt = "", btn = "", cls = st.why;
  if (st.why === "full") { txt = t.enFull; btn = `<button class="btn small" data-tab="trips">${esc(L().goTrip)}</button>`; }
  else if (st.why === "short") { txt = tt ? tt.cta(n) : t.enHalf; btn = `<button class="btn small ghost" data-tab="trips">${esc(tt ? tt.ctaB : t.enGo)}</button>`; }
  else if (st.why === "used") txt = tt ? tt.tUsed(n) : t.enDone;
  else txt = tt ? (st.half >= st.n ? tt.stNeedOne(n) : tt.stNeed(n, st.needShort)) : t.enCap;
  const half = st.half < st.n && st.why !== "used";
  const seg = Array.from({ length: st.n }, (_, k) => `<i class="${k < st.dn && st.why !== "used" ? "on" : ""}${half && k === st.half - 1 ? " half" : ""}"></i>`).join("");
  /* sotto la barra: dove arriva la gita breve (fine del segmento a meta') e dove il viaggio completo */
  const scale = tt && st.why !== "used" ? `<div class="nvscale" aria-hidden="true">${half ? `<span class="h" style="right:${(100 - (st.half / st.n) * 100).toFixed(2)}%">${esc(tt.kShort)}</span>` : ""}<span class="f">${esc(tt.kFull)}</span></div>` : "";
  return `<div class="nven nv-${cls}" id="nvEnergy"><div class="nvenhd"><span class="nvbadge">${typeof LEAF !== "undefined" ? LEAF : icon("nvbolt")}</span><b>${esc(t.en)}</b><span class="nvenv">${esc(t.enOf(st.why === "used" ? 0 : st.dn, st.n))}</span><span class="spacer"></span><button class="nvi" type="button" ${typeof tr20InfoSheet === "function" ? 'data-tr20info="1"' : 'data-nvinfo="energy"'} aria-label="${esc(t.enI)}">${icon("nvinfo")}</button></div>
  <div class="nvseg" role="progressbar" aria-label="${esc(t.en)}" aria-valuemin="0" aria-valuemax="${st.n}" aria-valuenow="${st.why === "used" ? 0 : st.dn}">${seg}</div>${scale}
  <div class="nvenrow"><p class="nvtx">${esc(txt)}</p>${btn}</div></div>`;
}
function nav20energySheet() {
  const t = nav20(); const n = S.petName || "";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="nvEnT"><div class="box nvsheet"><h2 id="nvEnT">${esc(t.enSheetT(n))}</h2><ul class="nvlist">${t.enSheet(n).map((x) => `<li>${esc(x)}</li>`).join("")}</ul><button class="btn block" id="closeLayer">${esc(L().ok)}</button></div></div>`;
}
/* In viaggio: scheda chiara e toccabile, con ora del ritorno, barra del tempo, "intanto" e il pulsante dei giochi */
function nav20awayTimes() {
  const a = S.away; if (!a) return null; let total = 0;
  try { const d = destByKey(a.dest); total = d.h * 3600000 * (a.kind === "short" && typeof TRIP_PARTIAL_TIME !== "undefined" ? TRIP_PARTIAL_TIME : 1); } catch (e) { total = 3600000; }
  const t0 = a.t0 || a.until - total; const now = Date.now();
  const pct = Math.max(0.02, Math.min(1, (now - t0) / Math.max(1, a.until - t0)));
  const end = new Date(a.until); const hm = intlDT(loc(), { hour: "2-digit", minute: "2-digit" }).format(end);
  const tomorrow = dkey(end) !== dkey(); const t = nav20();
  return { pct, label: `${tomorrow ? t.backTom(hm) : t.back(hm)} · ${t.left(timeLeft(a.until))}`, html: `<span>${esc(tomorrow ? t.backTom(hm) : t.back(hm))}</span> · <span>${esc(t.left(timeLeft(a.until)))}</span>` };
}
function nav20awayDecorate(h) {
  /* h e' la scheda .away (con la "i" di 98c): si aggiungono tempo, barra, "intanto" e Gioca; tutta la scheda si tocca */
  const t = nav20(); const tm = nav20awayTimes(); if (!tm) return h; let place = ""; try { place = destByKey(S.away.dest).name; } catch (e) { place = ""; }
  const tpl = document.createElement("template"); tpl.innerHTML = h; const card = tpl.content.querySelector(".away"); if (!card) return h;
  card.classList.add("nvaway"); card.setAttribute("data-nvaway", "1");
  const p = card.querySelector("p.muted");
  const badge = p ? p.querySelector(".tr20badge") : null;
  if (p) p.innerHTML = `${badge ? badge.outerHTML + " " : ""}<b>${esc(place)}</b> · <span class="nvback">${tm.html}</span>`;
  const bar = document.createElement("div"); bar.className = "nvtrip"; bar.setAttribute("aria-hidden", "true"); bar.innerHTML = `<i style="width:${(tm.pct * 100).toFixed(1)}%"></i>`;
  if (p) p.after(bar); else card.append(bar);
  const meanw = document.createElement("div"); meanw.className = "nvmeanw";
  meanw.innerHTML = `<p class="small">${esc(t.awayMeanwhile)}</p><button class="btn small ghost" data-act="play" type="button"><span class="aci">${icon("play")}</span>${esc(t.awayPlay)}</button>`;
  const dev = card.querySelector("#comeBack"); if (dev) dev.before(meanw); else card.append(meanw);
  return tpl.innerHTML;
}

/* Casa: la stanza, l'energia, gli obiettivi e al massimo UNA scheda in piu' (le altre sono in Profilo) */
const NAV20_ASK = ["iossafe", "remcard", "namecard", "nudgecard"];
function nav20passStrip() {
  if (typeof curSeason !== "function") return ""; const se = curSeason(); if (!se || (typeof isFirstDay === "function" && isFirstDay())) return "";
  const t = nav20(); const p = passi(se), N = seaTiers(se), tier = sTier(p, se), u = unclaimed(se); const into = tier >= N ? 100 : p % 100;
  const name = seaName(se);
  return `<button class="nvpass ${u ? "claim" : ""}" id="openPath" type="button"><span class="nvpi">${icon(typeof seaIcon === "function" ? seaIcon(se) : seaKind(se) === "stars" ? "p_star" : "p_lantern")}</span><span class="nvptx"><b>${esc(name)}</b><span class="nvpbar"><i style="width:${into}%"></i></span><small>${esc(u ? t.passClaim(u) : t.passTier(tier, N))} · ${esc(L().season.left(daysLeft(se)))}</small></span><span class="nvchev" aria-hidden="true">›</span></button>`;
}
function nav20casa(h) {
  const i0 = h.indexOf('<div class="sec">'); const iEnd = h.lastIndexOf("</div>"); if (i0 < 0 || iEnd < i0) return h;
  /* la parte prima del titolo degli obiettivi contiene la stanza: si tocca solo con tagli di testo, senza analizzarla */
  let head = h.slice(0, i0);
  /* viaggio: la scheda arriva subito sotto la stanza */
  const ai = head.indexOf('<div class="away');
  let awayHtml = "";
  if (ai >= 0) {
    const tpl = document.createElement("template"); tpl.innerHTML = head.slice(ai);
    const el = tpl.content.firstElementChild; if (el && el.classList.contains("away")) { awayHtml = el.outerHTML; head = head.slice(0, ai) + head.slice(ai + awayHtml.length); }
  }
  /* via i contatori doppi (anello, livello, settimana) e l'invito "energia piena" (ora e' nella barra dell'energia) */
  const cut = (s, cls) => { const k = s.indexOf(`<div class="${cls}`); if (k < 0) return s; const tp = document.createElement("template"); tp.innerHTML = s.slice(k); const el = tp.content.firstElementChild; return el ? s.slice(0, k) + s.slice(k + el.outerHTML.length) : s; };
  head = cut(cut(cut(head, "meters2"), "cta"), "meters");
  const rw = head.lastIndexOf('<div class="roomwrap">');
  /* fine del blocco della stanza contando i <div> (senza analizzare il disegno, che e' grande) */
  const insertAt = (() => { if (rw < 0) return head.length; const re = /<(\/?)div\b/g; re.lastIndex = rw; let d = 0, m; while ((m = re.exec(head))) { d += m[1] ? -1 : 1; if (d === 0) { const e = head.indexOf(">", m.index); return e < 0 ? head.length : e + 1; } } return head.length; })();
  const extra = (awayHtml ? nav20awayDecorate(awayHtml) : "") + nav20energy();
  head = head.slice(0, insertAt) + extra + head.slice(insertAt);
  /* dopo gli obiettivi */
  const tpl = document.createElement("template"); tpl.innerHTML = h.slice(i0, iEnd);
  const kids = [...tpl.content.children]; const keep = []; let ask = null; let passHere = false;
  kids.forEach((el) => {
    const c = el.classList; if (!c) return;
    if (c.contains("sec") || c.contains("goals") || c.contains("row") || c.contains("note") || c.contains("story") || c.contains("capsbanner") || c.contains("festa") || c.contains("card") && c.contains("stack-s") && !c.contains("chcard")) { keep.push(el); return; }
    if (c.contains("seacard")) { passHere = true; return; }
    if (c.contains("chcard")) { if (el.querySelector("#claimWeek")) keep.push(el); return; }
    /* "Torna domani" resta in Casa solo quando porta un premio in piu' di oggi (il video del regalo): e' la scheda del momento */
    if (c.contains("teaser") && el.querySelector("#adGift")) { ask = [-1, el]; return; }
    if (c.contains("teaser") || c.contains("meters2") || c.contains("svinvite") || c.contains("svcard") || c.contains("cta")) return;
    const k = NAV20_ASK.findIndex((x) => c.contains(x));
    if (k >= 0) { if (!ask || k < ask[0]) ask = [k, el]; return; }
    keep.push(el);
  });
  const out = []; keep.forEach((el) => { if (el.classList.contains("note") && ask) { out.push(ask[1].outerHTML); ask = null; } out.push(el.outerHTML); });
  if (ask) out.push(ask[1].outerHTML);
  /* la stagione resta, ma in una riga sottile (in Profilo c'e' la scheda grande) */
  const pass = passHere ? nav20passStrip() : "";
  const rowIdx = out.findIndex((x) => x.startsWith('<div class="row"'));
  if (pass) out.splice(rowIdx >= 0 ? rowIdx + 1 : out.length, 0, pass);
  return head + out.join("") + h.slice(iEnd);
}
const _viewTodayNav20 = viewToday;
let nav20casaMemo = ["", ""];
viewToday = function () {
  const h = _viewTodayNav20(); if (!S.pet) return h;
  const key = h + "|" + S.lang + "|" + Math.floor(Date.now() / 30000);
  if (nav20casaMemo[0] === key) return nav20casaMemo[1];
  let out = h; try { out = nav20casa(h); } catch (e) { out = h; }
  nav20casaMemo = [key, out]; return out;
};
/* l'ora del ritorno si aggiorna da sola; al momento giusto si ridisegna (e il compagno torna) */
setInterval(() => {
  if (document.hidden) return; /* app in background: si aggiorna al ritorno */
  try {
    const c = document.querySelector("[data-nvaway]"); if (!c || !S.away) return;
    if (Date.now() >= S.away.until) { if (!layer.innerHTML) render(); return; }
    const tm = nav20awayTimes(); const l = c.querySelector(".nvback"); if (l && tm) l.innerHTML = tm.html;
    const b = c.querySelector(".nvtrip i"); if (b && tm) b.style.width = (tm.pct * 100).toFixed(1) + "%";
  } catch (e) { /* niente */ }
}, 30000);

/* le due etichette sotto la barra non si sovrappongono mai (schermi stretti, lingue lunghe) */
const _renderNav20 = render;
render = function (...a) {
  const r = _renderNav20.apply(this, a);
  try {
    const sc = document.querySelector("#nvEnergy .nvscale"); if (sc) { const h = sc.querySelector(".h"), f = sc.querySelector(".f"); if (h && f) { f.style.visibility = ""; if (h.getBoundingClientRect().right > f.getBoundingClientRect().left - 6) f.style.visibility = "hidden"; } }
  } catch (e) { /* niente */ }
  return r;
};

/* =================== VIAGGI =================== */
const _viewTripsNav20 = viewTrips;
viewTrips = function () {
  const h = _viewTripsNav20(); if (!S.pet) return h;
  const k = h.indexOf('<div class="meters2">'); if (k < 0) return h;
  try { const tp = document.createElement("template"); tp.innerHTML = h.slice(k); const el = tp.content.firstElementChild; return el ? h.slice(0, k) + h.slice(k + el.outerHTML.length) : h; } catch (e) { return h; }
};

/* =================== NEGOZIO =================== */
/* la mensola dei trofei va in Profilo: il negozio parte subito sotto la stanza */
const _viewHomeNav20 = viewHome;
viewHome = function () {
  const h = _viewHomeNav20(); if (!S.pet) return h;
  const a = h.indexOf('<div class="card trshelf'); const b = h.indexOf('<div class="homehead">');
  if (a < 0 || b < a) return h;
  return h.slice(0, a) + h.slice(b);
};

/* =================== STAGIONE: un nome solo ("Stagione delle Lanterne"); "Fondatori" resta nel distintivo =================== */
if (typeof seasonCard === "function") {
  const _seasonCardNav20 = seasonCard;
  seasonCard = function (...a) { const h = _seasonCardNav20.apply(this, a); try { const z = L().season.zero; return z ? h.replace(`<small>${z} · `, "<small>") : h; } catch (e) { return h; } };
}


/* Distintivo del Fondatore: la stagione ora si chiama solo "Stagione delle Lanterne" (era la prima) */
const NAV20_FOUNDERP = {
  it: "Eri qui fin dalla prima stagione, la Stagione delle Lanterne: questo distintivo e la lanterna d'oro restano tuoi per sempre.",
  en: "You were here from the very first season, the Lantern Season: this badge and the golden lantern are yours forever.",
  de: "Du warst schon in der allerersten Saison dabei, der Laternen-Saison: Dieses Abzeichen und die goldene Laterne gehören für immer dir.",
  es: "Estás aquí desde la primera temporada, la Temporada de los Farolillos: esta insignia y el farolillo dorado son tuyos para siempre.",
  fr: "Tu étais là dès la toute première saison, la Saison des Lanternes : ce badge et la lanterne dorée sont à toi pour toujours.",
  pt: "Você está aqui desde a primeira temporada, a Temporada das Lanternas: este emblema e a lanterna dourada são seus para sempre.",
  ja: "最初のシーズン「ランタンのシーズン」から一緒にいてくれたあなたへ。このバッジと金のランタンは、ずっとあなたのものです。",
  ko: "첫 시즌인 등불 시즌부터 함께했어요. 이 배지와 황금 등불은 영원히 네 거예요.",
  zh: "你从第一个季节“灯笼季”就在这里了。这枚徽章和金灯笼永远属于你。",
  zht: "你從第一個季節「燈籠季」就在這裡了。這枚徽章和金燈籠永遠都是你的。",
  ru: "Ты с нами с самого первого сезона — Сезона фонариков: этот значок и золотой фонарик останутся с тобой навсегда.",
  pl: "Jesteś z nami od pierwszego sezonu, Sezonu Lampionów: ta odznaka i złoty lampion są twoje na zawsze.",
  nl: "Je was er al bij in het allereerste seizoen, het Lampionseizoen: deze badge en de gouden lantaarn zijn voor altijd van jou.",
  tr: "İlk sezondan, Fenerler Sezonu'ndan beri buradasın: bu rozet ve altın fener sonsuza dek senin."
};
Object.keys(NAV20_FOUNDERP).forEach((lg) => { try { if (T[lg] && T[lg].season) T[lg].season.founderP = NAV20_FOUNDERP[lg]; } catch (e) { /* niente */ } });

/* Scudi della serie: come si ottengono (prima non lo diceva) */
const NAV20_SHGET = {
  it: "Li trovi nel sentiero della stagione; con Tanetto Plus ne arrivano 2 ogni mese.", en: "You find them on the season path; with Tanetto Plus you get 2 every month.",
  de: "Du findest sie auf dem Saisonpfad; mit Tanetto Plus bekommst du jeden Monat 2.", es: "Los encuentras en el sendero de la temporada; con Tanetto Plus recibes 2 cada mes.",
  fr: "Tu les trouves sur le sentier de la saison ; avec Tanetto Plus, tu en reçois 2 chaque mois.", pt: "Você os encontra na trilha da temporada; com o Tanetto Plus chegam 2 todo mês.",
  ja: "シーズンの小道で手に入ります。Tanetto Plus なら毎月2つもらえます。", ko: "시즌 오솔길에서 받을 수 있어요. Tanetto Plus라면 매달 2개를 받아요.",
  zh: "在季节小路上可以获得；有 Tanetto Plus 的话每月还会送 2 个。", zht: "在季節小路上可以獲得；有 Tanetto Plus 的話每月還會送 2 個。",
  ru: "Их можно получить на тропинке сезона; с Tanetto Plus — по 2 каждый месяц.", pl: "Znajdziesz je na ścieżce sezonu; z Tanetto Plus dostajesz 2 co miesiąc.",
  nl: "Je vindt ze op het seizoenspad; met Tanetto Plus krijg je er elke maand 2.", tr: "Onları sezon patikasında bulursun; Tanetto Plus ile her ay 2 tane gelir."
};

/* =================== PROFILO =================== */
function nav20progress() {
  const t = nav20(); const parts = [];
  try { if (typeof seasonCard === "function") { const s = seasonCard(); if (s) parts.push(s); } } catch (e) { /* niente */ }
  try { if (typeof challengeCard === "function") parts.push(challengeCard()); } catch (e) { /* niente */ }
  try { if (typeof trShelfHtml === "function") parts.push(trShelfHtml()); } catch (e) { /* niente */ }
  try { if (typeof teaserCard === "function" && S.giftDay === S.day) parts.push(teaserCard().replace(/<p class="small" style="font-weight:700">[\s\S]*?<\/p>/, `<p class="small" style="font-weight:700">${esc(t.giftRow(S.visit.n || 1))}</p>`)); } catch (e) { /* niente */ }
  return parts.join("");
}
const _viewMoreNav20 = viewMore;
let nav20moreMemo = ["", ""];
viewMore = function () {
  const h = _viewMoreNav20(); if (!S.pet) return h;
  const prog = nav20progress(); const key = h + "|" + prog;
  if (nav20moreMemo[0] === key) return nav20moreMemo[1];
  let out = h; try { out = nav20profile(h, prog); } catch (e) { out = h; }
  nav20moreMemo = [key, out]; return out;
};
function nav20profile(h, prog) {
  const t = nav20(); const tpl = document.createElement("template"); tpl.innerHTML = h;
  const st = tpl.content.querySelector(".stack"); if (!st) return h;
  /* titolo della scheda */
  const h1 = st.querySelector(":scope > h1"); if (h1) h1.textContent = L().moreT;
  /* gruppo "I tuoi progressi" subito dopo la scheda del compagno */
  const anchor = st.querySelector(":scope > .mjump") || st.querySelector(":scope > .profcard") || h1;
  const grp = document.createElement("template");
  grp.innerHTML = `<h2 class="mgrp" id="mgrpP">${esc(t.progT)}</h2>${prog}`;
  const shields = st.querySelector(":scope > .shcard");
  const nodes = [...grp.content.childNodes];
  if (anchor) anchor.after(...nodes); else st.prepend(...nodes);
  if (shields) { const last = nodes.filter((n) => n.nodeType === 1).pop(); if (last) last.after(shields); if (!shields.querySelector(".nvshget")) shields.insertAdjacentHTML("beforeend", `<p class="small muted nvshget">${esc(NAV20_SHGET[S.lang] || NAV20_SHGET.en)}</p>`); }
  /* scorciatoia "Progressi" per prima */
  const jump = st.querySelector(":scope > .mjump");
  if (jump && !jump.querySelector('[data-mjump="P"]')) jump.insertAdjacentHTML("afterbegin", `<button class="chip mjb" data-mjump="P">${esc(t.progChip)}</button>`);
  /* il questionario va con "Aiuto e idee" */
  const sv = st.querySelector(":scope > .svcard"); const g3 = st.querySelector("#mgrp3");
  if (sv && g3) { let n = g3.nextElementSibling; let last = g3; while (n && !n.classList.contains("mgrp") && !n.querySelector("#reset, #resetYes") && !n.classList.contains("note")) { last = n; n = n.nextElementSibling; } last.after(sv); }
  /* "Dimmi cosa ne pensi" e il questionario erano due schede quasi uguali: diventano una sola con due strade chiare
     (6 domande veloci, oppure un messaggio libero) */
  try {
    const mail = st.querySelector(':scope > .card a[href^="mailto:"]'); const fb = mail && mail.closest(".card"); const svc = st.querySelector(":scope > .svcard"); const tv = L().survey;
    if (fb && svc && tv && !fb.querySelector(".nvfbsv")) {
      const row = svDone() ? `<p class="small nvfbsv ok"><span class="svic">${icon("check")}</span><span>${tv.done}</span></p>`
        : `<div class="nvfbsv"><span class="svic">${icon("p_chat")}</span><p class="small">${tv.cardP}</p><button class="btn small" id="svOpen">${tv.cardB}</button></div>`;
      const p = fb.querySelector("p"); if (p) p.insertAdjacentHTML("afterend", row); else fb.insertAdjacentHTML("afterbegin", row);
      fb.classList.add("nvfb"); mail.classList.add("ghost"); svc.remove();
    }
  } catch (e) { /* niente: restano le due schede */ }
  /* numeri d'aiuto: si toccano e si chiama */
  st.querySelectorAll(".help strong").forEach((s) => { s.innerHTML = nav20tel(s.textContent); });
  /* ricomincia da capo: colore di pericolo e frase chiara */
  const rs = st.querySelector("#reset"); if (rs) rs.classList.add("nvdanger");
  const ry = st.querySelector("#resetYes"); if (ry) { ry.classList.add("nvdangerbtn"); const box = ry.closest(".card"); if (box) { box.classList.add("nvresetbox"); const p = box.querySelector("p"); if (p && !box.querySelector(".nvresetp")) p.classList.add("nvresetp"); /* fix 1.0.9: la stessa frase non si ripete due volte */ } }
  return tpl.innerHTML;
}
/* scorciatoie di Profilo (97zd): con il gruppo "I tuoi progressi" la pagina e' piu' lunga e lo scorrimento dolce dura piu'
   dei 750 ms in cui 97zd ricontrolla; a fine scorrimento si ricontrolla davvero, cosi' il titolo del gruppo non resta tagliato */
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button[data-mjump]"); if (!b) return;
  const id = "mgrp" + b.dataset.mjump; let done = false, t = 0;
  const fix = () => {
    if (done) return; done = true; clearTimeout(t); window.removeEventListener("scrollend", fix);
    const g = document.getElementById(id); if (!g || tab !== "more") return;
    const off = g.getBoundingClientRect().top - 12; if (Math.abs(off) > 3) window.scrollTo({ top: Math.max(0, window.scrollY + off), behavior: "auto" });
  };
  window.addEventListener("scrollend", fix); t = setTimeout(fix, 1800);
}, true);
function nav20tel(txt) {
  /* "Telefono Amico Italia: 02 2327 2327" -> il numero diventa un collegamento tel: (non le ore "24", ne' gli anni) */
  return esc(txt).replace(/(\+?\d[\d\s\-]{1,14}\d)(?![\d時시小])/g, (m) => {
    const d = m.replace(/[^\d+]/g, ""); if (d.replace("+", "").length < 3) return m;
    return `<a class="nvtel" href="tel:${d}">${m}</a>`;
  });
}

/* =================== TOGLIERE LA SPUNTA (stesso giorno) =================== */
/* Ogni obiettivo spuntato si ricorda ESATTAMENTE cosa ha dato (Tanì, punti, energia, Scintille, felicita', conti
   dell'economia di 98e): togliendo la spunta si riprende proprio quello, ne' piu' ne' meno. Rispuntandolo, si
   riceve di nuovo il premio normale (98e non lo considera "gia' premiato", perche' qui il premio e' stato restituito). */
function nav20cumXp() { let c = S.xp || 0; for (let l = 1; l < (S.level || 1); l++) c += xpNeed(l); return c; }
function nav20setCumXp(c) { let lv = 1; c = Math.max(0, Math.round(c)); while (c >= xpNeed(lv) && lv < 999) { c -= xpNeed(lv); lv++; } S.level = lv; S.xp = c; }
function nav20lvAt(c) { let lv = 1; c = Math.max(0, Math.round(c)); while (c >= xpNeed(lv) && lv < 999) { c -= xpNeed(lv); lv++; } return lv; }
/* Tanì da riprendere: il premio del livello segue il livello vero (se togliendo i punti si scende di livello, quel premio
   torna indietro anche se era arrivato con un altro obiettivo; rispuntando lo si riceve di nuovo, mai due volte) */
function nav20undoTake(r) {
  let n = Math.max(0, r.seeds || 0); const lvT = typeof EC !== "undefined" && EC.LEVEL > 0 ? EC.LEVEL : 0;
  if (lvT) { const lost = r.xp > 0 ? Math.max(0, (S.level || 1) - nav20lvAt(nav20cumXp() - r.xp)) : 0; n = Math.max(0, n - (r.lv || 0) * lvT) + lost * lvT; }
  return Math.min(n, Math.max(0, S.seeds || 0));
}
function nav20econSnap() {
  try { if (typeof econ !== "function") return null; const e = econ(); const d = S.day; return { rw: (e.rw[d] || []).slice(), gt: e.gt[d] || 0, pb: e.pb[d] || 0, all: !!e.all[d] }; } catch (e) { return null; }
}
function nav20snap(g) {
  return { g, day: S.day, had: S.done.includes(g), logN: (S.log || []).length, seeds: S.seeds, cum: nav20cumXp(), lvl: S.level || 1, en: S.energy, sn: S.season ? S.season.n || 0 : 0, joy: S.joy || 0, flg: S.firstLevelGift || null, ec: nav20econSnap() };
}
const _completeGoalNav20 = completeGoal;
completeGoal = function (g, rect) {
  const a = nav20snap(g);
  _completeGoalNav20(g, rect);
  try {
    if (a.had || !S.done.includes(g) || (S.log || []).length <= a.logN || S.day !== a.day) return;
    const b = nav20econSnap(); const st = nav20st();
    st.undo[g] = { day: a.day, seeds: S.seeds - a.seeds, xp: nav20cumXp() - a.cum, lv: Math.max(0, (S.level || 1) - a.lvl), en: Math.max(0, S.energy - a.en), sn: (S.season ? S.season.n || 0 : 0) - a.sn, joy: Math.max(0, (S.joy || 0) - a.joy), flg: !a.flg && S.firstLevelGift ? 1 : 0,
      ec: a.ec && b ? { gt: b.gt - a.ec.gt, pb: b.pb - a.ec.pb, all: !a.ec.all && b.all ? 1 : 0 } : null };
    Object.keys(st.undo).forEach((k) => { if (st.undo[k].day !== S.day) delete st.undo[k]; });
    save();
    nq20goal(); nav20plusAfterGoal(); setTimeout(acctNudgeQ, 2600);
  } catch (e) { /* niente */ }
};
function nav20undoInfo(g) {
  const r = nav20st().undo[g];
  if (r && r.day === S.day) return r;
  /* spunta senza ricordo (rito della sera, versioni vecchie): i valori normali di un obiettivo */
  const tani = typeof EC !== "undefined" && EC.GOAL ? EC.GOAL : SEEDS_GOAL;
  return { day: S.day, seeds: tani, xp: XP_GOAL, lv: 0, en: 0, sn: 1, joy: 3, flg: 0, ec: { gt: tani, pb: 0, all: 0 }, guess: true };
}
function nav20undoSheet(g) {
  const t = nav20(); const r = nav20undoInfo(g); const parts = [];
  const take = nav20undoTake(r); if (take > 0) parts.push(t.undoTani(take));
  if (r.xp > 0) parts.push(t.undoPts(r.xp));
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="nvUT"><div class="sheet nvundo"><div class="grab"></div><h2 id="nvUT">${esc(t.undoT)}</h2><p>${esc(t.undoP(goalText(g)))}</p><p class="small muted">${esc(parts.length ? t.undoGive(parts.join(" · ")) : t.undoNothing)}</p>
  <div class="nvundobtns"><button class="btn ghost" id="nvUndoYes" data-g="${esc(g)}">${esc(t.undoYes)}</button><button class="btn" id="closeLayer">${esc(t.undoNo)}</button></div></div></div>`;
  SND.play("click"); if (anim) G.from(".nvundo", { y: 60, opacity: 0, duration: 0.35, ease: "power3.out" });
}
function nav20undo(g) {
  if (!S.done.includes(g) || S.day !== dkey()) return;
  const r = nav20undoInfo(g); const tg = todayGoals();
  S.done = S.done.filter((x) => x !== g);
  const log = S.log || []; for (let i = log.length - 1; i >= 0; i--) { if (log[i].g === g && log[i].d === S.day) { log.splice(i, 1); break; } }
  const rec = dayRec(); rec.done = S.done.filter((x) => tg.includes(x)).length;
  S.seeds = Math.max(0, S.seeds - nav20undoTake(r));
  if (r.xp > 0) nav20setCumXp(nav20cumXp() - r.xp);
  if (r.flg) S.firstLevelGift = null;
  if (S.season && r.sn > 0) S.season.n = Math.max(0, (S.season.n || 0) - r.sn);
  if (r.joy > 0) S.joy = Math.max(0, (S.joy || 0) - r.joy);
  /* energia: si ricalcola dagli obiettivi fatti, ma non se oggi il viaggio c'e' gia' stato o e' in corso */
  const used = S.away || (typeof tr20Used === "function" && tr20Used());
  if (!used) S.energy = typeof tr20GoalEnergy === "function" ? tr20GoalEnergy() : Math.max(0, S.energy - r.en);
  /* conti dell'economia (98e): l'obiettivo non risulta piu' premiato oggi */
  try {
    if (typeof econ === "function") {
      const e = econ(); const d = S.day; if (e.rw[d]) e.rw[d] = e.rw[d].filter((x) => x !== g);
      if (r.ec) { e.gt[d] = Math.max(0, (e.gt[d] || 0) - r.ec.gt); e.pb[d] = Math.max(0, (e.pb[d] || 0) - r.ec.pb); if (r.ec.all) delete e.all[d]; }
    }
  } catch (e) { /* niente */ }
  delete nav20st().undo[g];
  try { if (S.notif && typeof notifSchedule === "function") notifSchedule(); } catch (e) { /* niente */ }
  save(); closeLayer(); const y = window.scrollY; render(); window.scrollTo(0, y);
  toast(nav20().undoDone); SND.play("click");
}

/* =================== FINESTRE UNA ALLA VOLTA =================== */
/* Le finestre che si aprono da sole aspettano il loro turno: mai una sopra l'altra, mai sopra un gioco o una
   scheda aperta, con una pausa tra l'una e l'altra. Tre tipi:
   - "resp": risposta a un gesto (livello nuovo, tutto fatto): arriva sempre, appena c'e' posto;
   - "gift": regali che arrivano da soli (benvenuto, lancio, accessorio, bentornato): al massimo 2 per apertura,
     piu' uno per ogni obiettivo spuntato (il regalo diventa un premio, non una pioggia di finestre);
   - "ask": richieste e novita' (promemoria, mondi nuovi, Natale, Plus): al massimo 2 per apertura.
   Quello che non trova posto aspetta: le funzioni originali ricontrollano da sole se servono ancora. */
const NQ20 = { q: [], n: { resp: 0, gift: 0, ask: 0 }, ticks: 0, lastClose: 0, goalAt: 0, t: null };
const NQ20_CAP = { gift: 2, ask: 2 }, NQ20_GAP = { resp: 1200, gift: 4000, ask: 4000 };
function nq20busy() {
  if (!S.pet) return true;
  if (layer && layer.innerHTML.trim()) return true;
  try { if (tutOn) return true; } catch (e) { /* niente */ }
  if (document.getElementById("trParty")) return true;
  return false;
}
/* il regalo di benvenuto viene prima di tutti gli altri regali del primo giorno */
const nq20wait = (key) => key !== "welcome" && NQ20.q.some((x) => x.key === "welcome") || (key === "launch" && !S.welcomeGift && (!S.firstDay || S.firstDay === dkey()) && (S.log || []).length === 0);
const nq20room = (kind, key) => !nq20wait(key) && (kind === "resp" || NQ20.n[kind] < NQ20_CAP[kind] + (kind === "gift" ? NQ20.ticks : 0));
const NQ20_ORD = { resp: 0, gift: 1, ask: 2 };
function nq20tick() {
  clearTimeout(NQ20.t); NQ20.t = null; if (!NQ20.q.length) return;
  NQ20.q.sort((a, b) => NQ20_ORD[a.kind] - NQ20_ORD[b.kind]);
  const it = NQ20.q.find((x) => nq20room(x.kind, x.key)); if (!it) { if (NQ20.q.some((x) => nq20wait(x.key))) NQ20.t = setTimeout(nq20tick, 2000); return; } /* si riprova dopo il prossimo obiettivo */
  if (nq20busy()) { NQ20.t = setTimeout(nq20tick, 400); return; }
  const wait = Math.max(NQ20_GAP[it.kind] - (Date.now() - NQ20.lastClose), it.kind === "resp" ? 0 : 3000 - (Date.now() - NQ20.goalAt));
  if (wait > 0) { NQ20.t = setTimeout(nq20tick, Math.min(wait, 1000) + 20); return; }
  NQ20.q.splice(NQ20.q.indexOf(it), 1);
  nq20do(it);
  if (NQ20.q.length) NQ20.t = setTimeout(nq20tick, 700);
}
function nq20do(it) {
  let opened = false;
  try { it.fn(); } finally { opened = !!(layer && layer.innerHTML.trim()); }
  if (opened) NQ20.n[it.kind]++;
}
function nq20(key, kind, fn) {
  if (!NQ20.q.length && nq20room(kind, key) && !nq20busy() && Date.now() - NQ20.lastClose >= NQ20_GAP[kind] && (kind === "resp" || Date.now() - NQ20.goalAt >= 3000)) { nq20do({ key, kind, fn }); return; }
  const old = NQ20.q.find((x) => x.key === key); if (old) old.fn = fn; else NQ20.q.push({ key, kind, fn });
  clearTimeout(NQ20.t); NQ20.t = setTimeout(nq20tick, 400);
}
function nq20goal() { NQ20.goalAt = Date.now(); NQ20.ticks = Math.min(NQ20.ticks + 1, Math.max(0, NQ20.n.gift - NQ20_CAP.gift) + 1); if (NQ20.q.length && !NQ20.t) NQ20.t = setTimeout(nq20tick, 3000); }
try { new MutationObserver(() => { if (!layer.innerHTML.trim()) { NQ20.lastClose = Date.now(); if (NQ20.q.length && !NQ20.t) NQ20.t = setTimeout(nq20tick, 1200); } }).observe(layer, { childList: true }); } catch (e) { /* niente */ }
function nq20wrap(name, kind, get, set) {
  try { const f = get(); if (typeof f !== "function") return; set(function (...a) { const self = this; nq20(name, kind, () => f.apply(self, a)); }); } catch (e) { /* funzione assente */ }
}
nq20wrap("level", "resp", () => showLevelUp, (f) => { showLevelUp = f; });
nq20wrap("alldone", "resp", () => openAllDone, (f) => { openAllDone = f; });
nq20wrap("welcome", "gift", () => openWelcomeGift, (f) => { openWelcomeGift = f; });
nq20wrap("launch", "gift", () => launchGift, (f) => { launchGift = f; });
nq20wrap("back", "gift", () => openWelcomeBack, (f) => { openWelcomeBack = f; });
nq20wrap("wear", "gift", () => (typeof w20OpenGift === "function" ? w20OpenGift : null), (f) => { w20OpenGift = f; });
nq20wrap("rem", "ask", () => openRemAsk, (f) => { openRemAsk = f; });
nq20wrap("worlds", "ask", () => newWorldsNotice, (f) => { newWorldsNotice = f; });
nq20wrap("xmas", "ask", () => (typeof xmAnnounce === "function" ? xmAnnounce : null), (f) => { xmAnnounce = f; });
/* il consiglio "Come coccolare" (98a) della prima volta: anche lui aspetta il suo turno */
nq20wrap("hint", "ask", () => (typeof v20touchHint === "function" ? v20touchHint : null), (f) => { v20touchHint = f; });

/* =================== TANETTO PLUS AL MOMENTO GIUSTO =================== */
/* Mai durante il benvenuto. Una volta, con calma, dopo la prima vera conquista: a fine del primo giorno
   (tutti gli obiettivi fatti) oppure, dal secondo giorno, dopo il primo obiettivo spuntato. Se si dice "Non ora",
   almeno 2 giorni di pausa (massimo 3 volte in tutto). Solo nell'app Android, con prezzo e prova veri di Google Play. */
const NAV20_PLUS_MAX = 3, NAV20_PLUS_PAUSE = 2;
const nav20days = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000);
/* 1.0.9: mai nel momento di una partenza o di un ritorno. Niente offerta con una meta appena scelta, con la cartolina del
   ritorno aperta, nella scheda Viaggi o nei 10 minuti dopo la partenza (prima arrivava proprio dopo "Parti").
   Il primo giorno l'offerta non segue piu' "tutti gli obiettivi fatti" (che porta dritto alla partenza): arriva, con
   calma, quando si chiude la cartolina di un viaggio; dal secondo giorno dopo il primo obiettivo spuntato. */
function nav20plusDue(why) {
  try {
    if (!isNativeApp() || plusActive() || !S.pet || (S.tut || 0) < 99) return false;
    if (typeof tutOn !== "undefined" && tutOn) return false;
    const p = nav20st().plus; if (p.n >= NAV20_PLUS_MAX || p.last === dkey()) return false;
    if (p.off && nav20days(p.off, dkey()) < NAV20_PLUS_PAUSE) return false;
    if (pickedDest || story || tab === "trips") return false;
    if (S.away && Date.now() - (S.away.t0 || 0) < 10 * 60e3) return false;
    if (why === "story") return true;
    const first = !S.firstDay || S.firstDay === dkey();
    return !first && S.done.length > 0;
  } catch (e) { return false; }
}
function nav20plusQueue(why) {
  if (!nav20plusDue(why)) return;
  loadProducts().then(() => { setTimeout(() => { if (nav20plusDue(why)) nq20("plus", "ask", () => nav20plusOffer(why)); }, 2600); }).catch(() => { /* senza prezzi niente offerta: si riprova un'altra volta */ });
}
function nav20plusAfterGoal() { nav20plusQueue("goal"); }
/* dopo la cartolina del ritorno (story = null): si controlla quando si e' di nuovo in Casa */
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("button"); if (b && b.id === "storyOk") setTimeout(() => { if (!story && tab !== "trips") nav20plusQueue("story"); else nav20plusStory = true; }, 400); });
let nav20plusStory = false;
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest(".tab"); if (b && nav20plusStory && b.dataset.tab !== "trips") { nav20plusStory = false; setTimeout(() => nav20plusQueue("story"), 1500); } });
function nav20plusOffer(why) {
  if (!nav20plusDue(why) || !billProducts) return;
  const t = nav20(), tp = L().plus; const pl = billProducts.plans || {}; const plan = pl.year || pl.month; if (!plan) return;
  const per = pl.year ? (tp.perYear ? tp.perYear(plan.price) : plan.price) : (tp.perMonth ? tp.perMonth(plan.price) : plan.price);
  const trial = plan.trialToken && plan.trialDays ? plan.trialDays : 0;
  const st = nav20st().plus; st.n++; st.last = dkey(); st.off = dkey(); save(); trackOnce("plus-offerta-" + st.n);
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="nvPT"><div class="sheet nvplus"><div class="grab"></div>
    <div class="nvplpet" aria-hidden="true">${petSVG(S.pet, "felice", "h_crown", stage(), "")}</div><h2 id="nvPT">${esc(t.plusT)}</h2><p>${esc(t.plusP(S.petName || "", L().v12.perk(PLUS_PETS.length).replace(/(\d) /, "$1\u00a0")))}</p>
    <div class="nvprice">${trial ? `<b>${esc(t.plusTrial(trial))}</b><span>${esc(t.plusThen(per))}</span>` : `<b>${esc(per)}</b><span>${esc(t.plusFrom("").replace(/^\s*·\s*/, ""))}</span>`}</div>${trial ? `<p class="small muted nvtrialwhen">${esc(BT().trialWhen(trialEnd(trial)))}</p>` : ""}
    <button class="btn gold block" id="nvPlusGo">${icon("p_crown")}${esc(trial ? t.plusGo(trial) : t.plusSub)}</button><button class="link" id="closeLayer">${esc(t.plusLater)}</button></div></div>`;
  if (anim) G.from(".nvplus", { y: 80, opacity: 0, duration: 0.45, ease: "power3.out" });
}

/* =================== WEB: NIENTE VICOLI CIECHI =================== */
function nav20webCard(tani) {
  const t = nav20(); let link = "";
  try { link = playLive() ? `<a class="btn gold block nvplay" href="${PLAY_URL}" target="_blank" rel="noopener">${nav20playIc()}<span>${esc(BT().getApp)}</span></a>` : `<p class="small nvsoon">${esc(t.webSoon)}</p>`; } catch (e) { link = ""; }
  return `<div class="nvweb"><div class="nvwebhd"><span class="nvwebic">${nav20playIc()}</span><b>${esc(t.webT)}</b></div><p class="small">${esc(t.webP(S.petName || L().pets[draftPet][0]))}</p>${tani ? `<p class="small nvfree">${esc(t.webFree)}</p>` : ""}${link}</div>`;
}
const nav20playIc = () => `<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path d="M5 3.6v16.8c0 .5.5.8 1 .6l14-8.2c.4-.3.4-.9 0-1.2L6 3c-.5-.2-1 .1-1 .6Z" fill="currentColor"/></svg>`;
if (typeof openPlus === "function") {
  const _openPlusNav20 = openPlus;
  openPlus = function (...a) {
    _openPlusNav20.apply(this, a);
    try { if (!isNativeApp()) { const f = layer.querySelector(".plusbox .plussticky"); if (f) f.innerHTML = nav20webCard(false); } } catch (e) { /* niente */ }
  };
}
if (typeof openTaniShop === "function") {
  const _openTaniShopNav20 = openTaniShop;
  openTaniShop = function (...a) {
    _openTaniShopNav20.apply(this, a);
    try {
      if (isNativeApp()) return; const sh = layer.querySelector(".tshop"); if (!sh) return;
      const packs = sh.querySelector(".packs"); if (packs) packs.remove(); sh.querySelectorAll(".firstpk").forEach((x) => x.remove());
      sh.querySelectorAll(":scope > .pweb, :scope > a.btn.gold").forEach((x) => x.remove());
      const p = sh.querySelector(":scope > p.small.muted"); const card = document.createElement("template"); card.innerHTML = nav20webCard(true);
      if (p) p.after(card.content.firstElementChild); else sh.append(card.content.firstElementChild);
    } catch (e) { /* niente */ }
  };
}

/* =================== SENTIERO DELLA STAGIONE: "Prendi tutto" e piu' spazio =================== */
function nav20claimable() {
  try { const se = curSeason(); if (!se) return []; const tier = sTier(passi(se), se); const c = sClaims(se); const out = []; const plus = plusActive();
    for (let n = 1; n <= tier; n++) { if (!c.f.includes(n)) out.push("f" + n); if (plus && !c.g.includes(n)) out.push("g" + n); } return out; } catch (e) { return []; }
}
if (typeof openPath === "function") {
  const _openPathNav20 = openPath;
  openPath = function (...a) {
    _openPathNav20.apply(this, a);
    try {
      const t = nav20(); const box = layer.querySelector(".pathbox"); if (!box) return; box.classList.add("nvpath");
      const se = curSeason(); const zero = L().season.zero; const sm = box.querySelector(".phx small"); if (sm && zero) sm.textContent = sm.textContent.replace(zero + " · ", "").replace(/^\s*·\s*/, "");
      const sum = box.querySelector(".pathsum");
      if (sum) {
        /* la spiegazione lunga si apre a richiesta */
        const ps = [...sum.querySelectorAll(":scope > p.small:not(.muted)")]; const how = ps.find((p) => p.textContent === L().season.how) || ps[0];
        if (how && !sum.querySelector(".nvhow")) {
          const b = document.createElement("button"); b.className = "link small nvhow"; b.type = "button"; b.setAttribute("aria-expanded", "false"); b.textContent = t.howShow;
          how.classList.add("nvhowp"); how.hidden = true;
          const fd = sum.querySelector(".founder"); if (fd) { fd.classList.add("nvhowp"); fd.hidden = true; }
          const next = sum.querySelector(":scope > p.small.muted"); const row = document.createElement("div"); row.className = "nvsumrow";
          if (next) { next.before(row); row.append(next, b); } else { how.before(row); row.append(b); }
        }
        const sv = box.querySelector(".pathhead > svg"); if (sv) sv.setAttribute("preserveAspectRatio", "xMidYMid slice");
        const list = nav20claimable();
        if (list.length >= 2 && !sum.querySelector("#nvClaimAll")) sum.insertAdjacentHTML("beforeend", `<button class="btn gold block nvclaimall" id="nvClaimAll" type="button">${esc(t.claimAll(list.length))}</button>`);
      }
    } catch (e) { /* niente */ }
  };
}
function nav20claimAll() {
  const se = curSeason(); if (!se) return; const list = nav20claimable(); if (!list.length) return;
  const c = sClaims(se); let tani = 0, shield = 0; const items = [];
  list.forEach((code) => { const tr = code[0], n = +code.slice(1); if (c[tr].includes(n)) return; const r = sReward(tr, n, se); giveReward(r); c[tr].push(n); if (r.tani) tani += r.tani; if (r.shield) shield += r.shield; if (r.item) items.push(r.item); trackOnce(`premio-${tr}${n}`); });
  save(); trackOnce("sentiero-prendi-tutto");
  const l = document.getElementById("pathList"); const y = l ? l.scrollTop : 0; const animWas = anim;
  openPath(); const l2 = document.getElementById("pathList"); if (l2) l2.scrollTop = y;
  const parts = []; const se2 = L().season; if (tani) parts.push(se2.tani(tani)); if (shield) parts.push(se2.shield(shield)); items.forEach((it) => parts.push(L().items[it] || it));
  toast(se2.got(parts.join(", "))); SND.play(items.length ? "fanfare" : "coin"); SND.haptic([15, 40, 20]);
  const box = layer.querySelector(".pathsum"); if (box && animWas) burst("star", 14, box);
  const lc = document.getElementById("seedN"); if (lc) lc.textContent = S.seeds; lastSeeds = S.seeds;
}

/* =================== RESPIRO: a tutto schermo e senza pulsanti mentre si respira =================== */
if (typeof breathe === "function") {
  const _breatheNav20 = breathe;
  breathe = function (...a) {
    _breatheNav20.apply(this, a);
    try {
      const ov = layer.querySelector(".overlay"); if (!ov || !layer.querySelector("#brT")) return; ov.classList.add("nvbreath");
      const box = ov.querySelector(".box"); if (box && !box.querySelector("#nvBrStop")) box.insertAdjacentHTML("beforeend", `<button class="link small nvbrstop" id="nvBrStop" type="button">${esc(nav20().stop)}</button>`);
    } catch (e) { /* niente */ }
  };
}
if (typeof runBreath === "function") {
  const _runBreathNav20 = runBreath;
  runBreath = function (...a) {
    const ov = layer.querySelector(".overlay.nvbreath"); if (ov) ov.classList.add("running");
    _runBreathNav20.apply(this, a);
    try {
      const cl = document.getElementById("closeLayer");
      if (cl && ov) new MutationObserver((m, o) => { if (cl.dataset.breathDone) { ov.classList.remove("running"); ov.classList.add("done"); o.disconnect(); } }).observe(cl, { attributes: true });
    } catch (e) { /* niente */ }
  };
}
function nav20breathStop() {
  try { SND.breathStop(); } catch (e) { /* niente */ }
  try { const r = document.getElementById("ring"); if (r && G) G.killTweensOf(r); } catch (e) { /* niente */ }
  closeLayer(); const y = window.scrollY; render(); window.scrollTo(0, y);
}
/* i messaggi aspettano la fine del respiro */
const _toastNav20 = toast;
let nav20toastQ = [];
toast = function (...a) {
  if (document.querySelector(".nvbreath.running")) { nav20toastQ.push(a); if (nav20toastQ.length === 1) { const w = setInterval(() => { if (!document.querySelector(".nvbreath.running")) { clearInterval(w); const q = nav20toastQ; nav20toastQ = []; q.slice(-1).forEach((x) => _toastNav20(...x)); } }, 600); } return; }
  return _toastNav20(...a);
};

/* =================== DIARIO: plurali, giorni futuri, umore da Parliamo =================== */
function nav20plurals(h) {
  const t = nav20(); const L0 = L(); const rep = L0.rep || {};
  const fix = (html, label, forms) => (label && forms ? html.split(`<small>${label}</small>`).map((part, i, arr) => {
    if (i === arr.length - 1) return part; const m = part.match(/<b>(\d+)<\/b>\s*$/); const n = m ? +m[1] : 2; return part + `<small>${esc(nav20pl(n, forms))}</small>`;
  }).join("") : html);
  return fix(fix(h, rep.daysL, t.daysAct), rep.goalsL, t.goalsDone);
}
const _viewDiaryNav20 = viewDiary;
let nav20diaryMemo = ["", ""];
viewDiary = function () {
  const h = _viewDiaryNav20(); if (!S.pet) return h;
  if (nav20diaryMemo[0] === h) return nav20diaryMemo[1];
  let out = h; try { out = nav20diary(nav20plurals(h)); } catch (e) { out = h; }
  nav20diaryMemo = [h, out]; return out;
};
function nav20diary(h) {
  const t = nav20(); const tpl = document.createElement("template"); tpl.innerHTML = h; const root = tpl.content;
  /* calendario: i giorni che devono ancora arrivare non sembrano "mancati" */
  const now = new Date(); const td = now.getDate();
  root.querySelectorAll(".cal").forEach((cal) => {
    const card = cal.closest(".card"); const m = card ? card.querySelector(".sec .small") : null;
    const cur = intlDT(loc(), { month: "long", year: "numeric" }).format(now);
    if (m && m.textContent.trim().toLowerCase() !== cur.toLowerCase()) return;
    const fd = S.firstDay && S.firstDay.slice(0, 7) === dkey().slice(0, 7) ? parseInt(S.firstDay.slice(8, 10), 10) : 0; /* 1.0.8: i giorni prima dell'installazione non sono "mancati" */
    cal.querySelectorAll(".d").forEach((d) => { const n = parseInt(d.textContent, 10); if (d.classList.contains("empty")) return; if (n > td) d.classList.add("nvfut"); else if (fd && n < fd) d.classList.add("nvpre"); });
    const lg = card ? card.querySelector(".legend") : null; if (lg && !lg.querySelector(".nvfutl")) lg.insertAdjacentHTML("beforeend", `<span class="nvfutl"><i></i>${esc(t.fut)}</span>`);
  });
  /* voci del diario: l'umore lasciato in Parliamo si chiama col suo nome, e la data e' leggibile */
  const ul = root.querySelector("ul.entries");
  if (ul) {
    const list = S.diary.slice().reverse().slice(0, 30); const talkQs = Object.keys(T).map((k) => T[k] && T[k].talkQ).filter(Boolean);
    [...ul.children].forEach((li, i) => {
      const d = list[i]; if (!d) return;
      const tm = li.querySelector("time"); if (tm && d.day) { try { const [y, mo, da] = d.day.split("-").map(Number); tm.textContent = intlDT(loc(), { weekday: "short", day: "numeric", month: "short" }).format(new Date(y, mo - 1, da)); tm.setAttribute("datetime", d.day); } catch (e) { /* niente */ } }
      if (!d.text && d.mood != null && (!d.q || talkQs.includes(d.q))) {
        const q = li.querySelector(".q"); const txt = `${(L().moods || [])[d.mood] || ""} · ${t.talkMood}`;
        if (q) q.textContent = txt; else li.insertAdjacentHTML("beforeend", `<p class="q">${esc(txt)}</p>`);
        li.classList.add("nvmoodonly");
      }
    });
  }
  return tpl.innerHTML;
}
if (typeof openReport === "function") {
  const _openReportNav20 = openReport;
  openReport = function (...a) {
    _openReportNav20.apply(this, a);
    try { const b = layer.querySelector(".repmini"); if (b) b.outerHTML = nav20plurals(b.outerHTML); } catch (e) { /* niente */ }
  };
}

/* =================== TOCCHI =================== */
window.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button, [data-nvaway]"); if (!b) return;
  const stop = () => { ev.stopImmediatePropagation(); ev.preventDefault(); };
  /* obiettivo gia' fatto: invece di "tremare", si chiede se togliere la spunta */
  if (b.tagName === "BUTTON" && b.dataset.done && b.classList.contains("goal") && S.pet && S.done.includes(b.dataset.done)) { stop(); nav20undoSheet(b.dataset.done); return; }
  if (b.id === "nvUndoYes") { stop(); nav20undo(b.dataset.g); return; }
  if (b.id === "nvClaimAll") { stop(); nav20claimAll(); return; }
  if (b.classList.contains("nvhow")) { stop(); const ps = b.closest(".pathsum") ? b.closest(".pathsum").querySelectorAll(".nvhowp") : []; if (ps.length) { const show = ps[0].hidden; ps.forEach((x) => { x.hidden = !show; }); b.textContent = show ? nav20().howHide : nav20().howShow; b.setAttribute("aria-expanded", String(show)); } return; }
  if (b.id === "nvBrStop") { stop(); nav20breathStop(); return; }
  if (b.id === "nvPlusGo") { stop(); closeLayer(); try { plusPlan = "year"; } catch (e) { /* niente */ } setTimeout(() => openPlus("offerta"), 120); return; }
  if (b.dataset.nvinfo === "energy") { stop(); nav20energySheet(); return; }
  /* scheda "in viaggio": toccandola (fuori dai pulsanti) si apre la spiegazione di 98c */
  if (b.dataset.nvaway) { const i = b.querySelector("[data-tr20info]"); if (i) i.click(); return; }
}, true);
/* Diario: dopo "Salva" la riga scritta si svuota (prima restava li' e sembrava non salvata) */
document.addEventListener("submit", (ev) => {
  if (!ev.target || ev.target.id !== "diaryForm") return; const n0 = (S.diary || []).length;
  setTimeout(() => { try { if ((S.diary || []).length >= n0) { const l = document.getElementById("line"); if (l && l.value && S.diary.length && S.diary[S.diary.length - 1].text === l.value.trim()) l.value = ""; } } catch (e) { /* niente */ } }, 0);
});
/* "Modifica gli obiettivi": in Profilo sopra ci sono i progressi (schede disegnate solo quando servono), quindi
   dopo lo scorrimento morbido si corregge la posizione, cosi' si arriva proprio sulla scheda degli obiettivi */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button[data-focus=goals]"); if (!b) return;
  const fix = () => { const g = document.getElementById("goalsCard"); if (!g || tab !== "more") return; const off = g.getBoundingClientRect().top - 12; if (Math.abs(off) > 8) window.scrollTo({ top: Math.max(0, window.scrollY + off), behavior: "auto" }); };
  [700, 1300].forEach((t) => setTimeout(fix, anim ? t : t / 4));
});
