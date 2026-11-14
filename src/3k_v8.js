/* v8: schermo intero, interazioni, mondi, lettere su misura, copia dei dati, app installabile */
Object.assign(T.it, {
  acts2: { ball: "Palla", bubbles: "Bolle", hug: "Abbraccio", high: "Batti cinque", dance: "Balla", hide: "Nascondino" },
  full: {
    open: "Schermo intero", close: "Riduci", scenes: { room: "Stanza", garden: "Giardino", terrace: "Terrazza" },
    lockT: (n) => `Liv. ${n}`, lockToast: (n) => `Si sblocca al livello ${n}: completa i tuoi obiettivi per arrivarci!`,
    gardenCap: (n) => n ? (n === 1 ? "1 fiore: uno per ogni obiettivo completato" : `${n} fiori: uno per ogni obiettivo completato`) : "Completa un obiettivo e qui spunta il primo fiore",
    terraceCap: (n) => n ? (n === 1 ? "1 stella: una per ogni giorno dedicato a te" : `${n} stelle: una per ogni giorno dedicato a te`) : "Ogni giorno in cui ti prendi cura di te, qui si accende una stella",
    starDay: (d, n) => n === 1 ? `${d}: 1 obiettivo completato` : `${d}: ${n} obiettivi completati`, starRest: (d) => `${d}: giorno di riposo`
  },
  play: {
    ballHint: "Tocca il pavimento per lanciare la palla", ballSay: ["Presa! Ancora, ancora!", "Che tiro! Lanciala di nuovo!", "Sono velocissimo, eh?"],
    bubbleHint: "Scoppia le bolle prima che volino via!", bubbleEnd: (n) => n === 1 ? "Abbiamo scoppiato 1 bolla!" : `Abbiamo scoppiato ${n} bolle insieme!`,
    hugSay: ["Che abbraccio caldo. Grazie!", "Resterei così per sempre.", "Mi sento al sicuro con te."],
    highHint: "Tocca la mano!", highSay: ["Batti cinque! Siamo una squadra!", "Bel colpo!", "Cinque! Oggi spacchiamo!"], highMiss: "Ehi, mi hai lasciato con la zampa alzata!",
    danceSay: ["Guarda che passi!", "La musica mi fa venire voglia di ballare!", "Un, due, tre... giravolta!"],
    hideStart: (n) => `Dove si nasconde ${n}? Tocca il punto giusto!`, hideMiss: ["Non qui! Riprova", "Acqua... prova altrove!"], hidePeek: "Psst... guarda dove spunta qualcosa!", hideFound: ["Mi hai trovato! Che occhio!", "Bu! Mi hai scoperto subito!", "Ancora una volta? Stavolta mi nascondo meglio!"]
  },
  obj: {
    window: ["Guarda fuori: che bel cielo oggi.", "Chissà chi passa di qui fuori."], fish: ["Il pesciolino ti saluta!", "Blub blub! Ha detto ciao."], clock: (h) => `Sono le ${h}. Un buon momento per un sorso d'acqua?`,
    lamp: ["Che bella luce calda.", "Click! Così è più accogliente."], plant: ["Un po' d'acqua e cresce felice, proprio come noi.", "Le piante adorano le coccole."],
    guitar: ["Ti suono una canzoncina!", "Strum strum! Ti piace?"], books: ["Leggere poche pagine al giorno fa grandi cose.", "Questo libro parla di un'avventura incredibile."],
    yarn: ["Il gomitolo! Non resisto!", "Rotola, rotola!"], teddy: ["Il mio orsetto preferito.", "Un abbraccio anche a lui!"], pouf: ["Hop! Che morbido!", "Il mio posto preferito per riposare."],
    mirror: ["Chi è quel bel tipo nello specchio?", "Oggi mi sento proprio in forma!"], poster: ["Un giorno visiteremo le stelle.", "Quella è l'Orsa Maggiore!"], frame: ["Che bel ricordo.", "Un giorno andremo là insieme."],
    lights: ["Che magia quando si accendono!", "Brillano proprio come te."], bed: "La mia cuccia! Tocca «Nanna» quando vuoi riposare.", toys: "I miei giochi! Facciamo una partita a palla?",
    can: ["Innaffiamo! Ogni fiore è un obiettivo che hai completato.", "Crescete, fiorellini!"], telescope: ["Guarda, una stella cadente! Esprimi un desiderio.", "Ogni stella qui è un giorno dedicato a te."]
  },
  pl: {
    streak: (n) => `Sono già ${n} giorni di fila che ti prendi cura di te. Lo so che a volte è difficile, e proprio per questo sono fiero di te.`,
    total: (n) => `Da quando ci conosciamo hai completato ${n} piccoli obiettivi. Messi tutti in fila, sono un sentiero bellissimo.`,
    days: (n) => `Siamo insieme da ${n} giorni. Mi sembra ieri che mi hai scelto.`,
    cat: (c) => `Questa settimana hai dedicato tanta cura a «${c}». Si vede, sai?`,
    goal: (g) => `Ho notato che «${g}» ti riesce sempre meglio. È diventata una vera abitudine!`,
    level: (n) => `Siamo arrivati al livello ${n} insieme, un passo alla volta.`,
    close: ["Continua così, al tuo ritmo.", "Domani ci siamo ancora, io e te.", "Ricordati di essere gentile anche con te."]
  },
  data: { T: "I tuoi dati", P: "Tutto resta su questo dispositivo. Salva una copia per non perdere i progressi se cambi telefono o cancelli i dati del browser.", save: "Salva una copia", restore: "Ripristina una copia", saved: "Copia salvata", ask: "Vuoi sostituire i progressi di adesso con quelli della copia?", yes: "Sì, ripristina", no: "Annulla", ok: "Progressi ripristinati!", bad: "Questo file non è una copia di Tanetto." },
  inst: { T: "Installa l'app", P: "Aggiungi Tanetto alla schermata Home: si apre come un'app, a schermo intero, anche senza internet.", B: "Installa", ios: "Su iPhone: tocca il pulsante Condividi di Safari, poi «Aggiungi alla schermata Home».", done: "Fatto! Trovi Tanetto tra le tue app." },
  guideAdd: ["Come non perdo i progressi?", "In «Altro» trovi «Salva una copia»: crea un file con tutti i tuoi progressi. Su un telefono nuovo apri Tanetto e tocca «Ripristina una copia»."]
});

Object.assign(T.de, {
  acts2: { ball: "Ball", bubbles: "Blasen", hug: "Umarmen", high: "High Five", dance: "Tanzen", hide: "Verstecken" },
  full: {
    open: "Vollbild", close: "Verkleinern", scenes: { room: "Zimmer", garden: "Garten", terrace: "Terrasse" },
    lockT: (n) => `Lv. ${n}`, lockToast: (n) => `Wird ab Level ${n} freigeschaltet: Schaffe deine Ziele, um dorthin zu kommen!`,
    gardenCap: (n) => n ? (n === 1 ? "1 Blume: eine für jedes geschaffte Ziel" : `${n} Blumen: eine für jedes geschaffte Ziel`) : "Schaffe ein Ziel, und hier wächst die erste Blume",
    terraceCap: (n) => n ? (n === 1 ? "1 Stern: einer für jeden Tag, an dem du auf dich achtest" : `${n} Sterne: einer für jeden Tag, an dem du auf dich achtest`) : "An jedem Tag, an dem du auf dich achtest, leuchtet hier ein Stern auf",
    starDay: (d, n) => n === 1 ? `${d}: 1 Ziel geschafft` : `${d}: ${n} Ziele geschafft`, starRest: (d) => `${d}: Ruhetag`
  },
  play: {
    ballHint: "Tippe auf den Boden, um den Ball zu werfen", ballSay: ["Gefangen! Nochmal, nochmal!", "Was für ein Wurf! Wirf ihn nochmal!", "Ich bin superschnell, oder?"],
    bubbleHint: "Lass die Blasen platzen, bevor sie wegfliegen!", bubbleEnd: (n) => n === 1 ? "Wir haben 1 Blase platzen lassen!" : `Wir haben zusammen ${n} Blasen platzen lassen!`,
    hugSay: ["Was für eine warme Umarmung. Danke!", "So könnte ich für immer bleiben.", "Bei dir fühle ich mich sicher."],
    highHint: "Tippe auf die Hand!", highSay: ["High Five! Wir sind ein Team!", "Guter Treffer!", "Fünf! Heute rocken wir!"], highMiss: "Hey, du hast mich mit erhobener Pfote stehen lassen!",
    danceSay: ["Schau dir meine Schritte an!", "Die Musik bringt mich zum Tanzen!", "Eins, zwei, drei... Drehung!"],
    hideStart: (n) => `Wo versteckt sich ${n}? Tippe auf die richtige Stelle!`, hideMiss: ["Nicht hier! Versuch's nochmal", "Kalt... versuch es woanders!"], hidePeek: "Psst... schau, wo etwas hervorlugt!", hideFound: ["Gefunden! Was für ein Blick!", "Buh! Du hast mich sofort entdeckt!", "Nochmal? Diesmal verstecke ich mich besser!"]
  },
  obj: {
    window: ["Schau raus: was für ein schöner Himmel heute.", "Wer wohl draußen vorbeikommt?"], fish: ["Das Fischchen grüßt dich!", "Blubb blubb! Es hat Hallo gesagt."], clock: (h) => `Es ist ${h}. Ein guter Moment für einen Schluck Wasser?`,
    lamp: ["Was für ein schönes, warmes Licht.", "Klick! So ist es gemütlicher."], plant: ["Ein bisschen Wasser, und sie wächst glücklich, genau wie wir.", "Pflanzen lieben Zuwendung."],
    guitar: ["Ich spiel dir ein Liedchen!", "Schrumm schrumm! Gefällt's dir?"], books: ["Ein paar Seiten am Tag bewirken Großes.", "Dieses Buch erzählt von einem unglaublichen Abenteuer."],
    yarn: ["Das Wollknäuel! Ich kann nicht widerstehen!", "Es rollt und rollt!"], teddy: ["Mein Lieblingsteddy.", "Eine Umarmung auch für ihn!"], pouf: ["Hopp! So weich!", "Mein Lieblingsplatz zum Ausruhen."],
    mirror: ["Wer ist dieser schicke Typ im Spiegel?", "Heute fühle ich mich richtig fit!"], poster: ["Eines Tages besuchen wir die Sterne.", "Das ist der Große Wagen!"], frame: ["Was für eine schöne Erinnerung.", "Eines Tages fahren wir zusammen dorthin."],
    lights: ["Wie magisch, wenn sie leuchten!", "Sie strahlen genau wie du."], bed: "Mein Körbchen! Tippe auf «Schlafen», wenn du ausruhen willst.", toys: "Meine Spielsachen! Spielen wir Ball?",
    can: ["Gießen wir! Jede Blume ist ein geschafftes Ziel.", "Wachst, ihr Blümchen!"], telescope: ["Schau, eine Sternschnuppe! Wünsch dir was.", "Jeder Stern hier ist ein Tag, an dem du auf dich geachtet hast."]
  },
  pl: {
    streak: (n) => `Schon ${n} Tage in Folge achtest du auf dich. Ich weiß, dass es manchmal schwer ist, und gerade deshalb bin ich stolz auf dich.`,
    total: (n) => `Seit wir uns kennen, hast du ${n} kleine Ziele geschafft. Hintereinander gelegt sind sie ein wunderschöner Weg.`,
    days: (n) => `Wir sind seit ${n} Tagen zusammen. Es kommt mir vor wie gestern, dass du mich ausgewählt hast.`,
    cat: (c) => `Diese Woche hast du dich viel um «${c}» gekümmert. Das merkt man, weißt du?`,
    goal: (g) => `Mir ist aufgefallen, dass dir «${g}» immer besser gelingt. Das ist eine echte Gewohnheit geworden!`,
    level: (n) => `Wir haben zusammen Level ${n} erreicht, Schritt für Schritt.`,
    close: ["Mach weiter so, in deinem Tempo.", "Morgen sind wir wieder da, du und ich.", "Denk daran, auch zu dir selbst freundlich zu sein."]
  },
  data: { T: "Deine Daten", P: "Alles bleibt auf diesem Gerät. Speichere eine Kopie, damit du deinen Fortschritt nicht verlierst, wenn du das Handy wechselst oder die Browserdaten löschst.", save: "Kopie speichern", restore: "Kopie wiederherstellen", saved: "Kopie gespeichert", ask: "Möchtest du den aktuellen Fortschritt durch den aus der Kopie ersetzen?", yes: "Ja, wiederherstellen", no: "Abbrechen", ok: "Fortschritt wiederhergestellt!", bad: "Diese Datei ist keine Tanetto-Kopie." },
  inst: { T: "App installieren", P: "Füge Tanetto zum Startbildschirm hinzu: Es öffnet sich wie eine App, im Vollbild, auch ohne Internet.", B: "Installieren", ios: "Auf dem iPhone: Tippe in Safari auf Teilen und dann auf «Zum Home-Bildschirm».", done: "Fertig! Du findest Tanetto bei deinen Apps." },
  guideAdd: ["Wie verliere ich meinen Fortschritt nicht?", "Unter «Mehr» findest du «Kopie speichern»: Damit entsteht eine Datei mit deinem ganzen Fortschritt. Öffne Tanetto auf einem neuen Handy und tippe auf «Kopie wiederherstellen»."]
});

Object.assign(T.es, {
  acts2: { ball: "Pelota", bubbles: "Burbujas", hug: "Abrazo", high: "Choca esos cinco", dance: "Bailar", hide: "Escondite" },
  full: {
    open: "Pantalla completa", close: "Reducir", scenes: { room: "Habitación", garden: "Jardín", terrace: "Terraza" },
    lockT: (n) => `Niv. ${n}`, lockToast: (n) => `Se desbloquea en el nivel ${n}: ¡completa tus objetivos para llegar!`,
    gardenCap: (n) => n ? (n === 1 ? "1 flor: una por cada objetivo completado" : `${n} flores: una por cada objetivo completado`) : "Completa un objetivo y aquí brotará la primera flor",
    terraceCap: (n) => n ? (n === 1 ? "1 estrella: una por cada día dedicado a ti" : `${n} estrellas: una por cada día dedicado a ti`) : "Cada día que te cuides, aquí se encenderá una estrella",
    starDay: (d, n) => n === 1 ? `${d}: 1 objetivo completado` : `${d}: ${n} objetivos completados`, starRest: (d) => `${d}: día de descanso`
  },
  play: {
    ballHint: "Toca el suelo para lanzar la pelota", ballSay: ["¡Atrapada! ¡Otra, otra!", "¡Qué lanzamiento! ¡Tírala otra vez!", "Soy rapidísimo, ¿eh?"],
    bubbleHint: "¡Revienta las burbujas antes de que se vayan volando!", bubbleEnd: (n) => n === 1 ? "¡Hemos reventado 1 burbuja!" : `¡Hemos reventado ${n} burbujas!`,
    hugSay: ["Qué abrazo tan cálido. ¡Gracias!", "Me quedaría así para siempre.", "Contigo me siento a salvo."],
    highHint: "¡Toca la mano!", highSay: ["¡Choca esos cinco! ¡Somos un equipo!", "¡Buen golpe!", "¡Cinco! ¡Hoy lo bordamos!"], highMiss: "¡Eh, me has dejado con la pata en el aire!",
    danceSay: ["¡Mira qué pasos!", "¡La música me dan ganas de bailar!", "Un, dos, tres... ¡vuelta!"],
    hideStart: (n) => `¿Dónde se esconde ${n}? ¡Toca el sitio correcto!`, hideMiss: ["¡Aquí no! Inténtalo otra vez", "Agua... ¡prueba en otro sitio!"], hidePeek: "Psst... ¡mira dónde asoma algo!", hideFound: ["¡Me has encontrado! ¡Qué vista!", "¡Bu! ¡Me has pillado enseguida!", "¿Otra vez? ¡Esta vez me escondo mejor!"]
  },
  obj: {
    window: ["Mira fuera: qué cielo tan bonito hoy.", "¿Quién pasará por ahí fuera?"], fish: ["¡El pececito te saluda!", "¡Glu glu! Ha dicho hola."], clock: (h) => `Son las ${h}. ¿Buen momento para un sorbo de agua?`,
    lamp: ["Qué luz tan cálida.", "¡Clic! Así es más acogedor."], plant: ["Un poco de agua y crece feliz, igual que nosotros.", "A las plantas les encantan los mimos."],
    guitar: ["¡Te toco una cancioncita!", "¡Rasgueo rasgueo! ¿Te gusta?"], books: ["Leer unas pocas páginas al día hace grandes cosas.", "Este libro habla de una aventura increíble."],
    yarn: ["¡El ovillo! ¡No me resisto!", "¡Rueda, rueda!"], teddy: ["Mi osito favorito.", "¡Un abrazo también para él!"], pouf: ["¡Hop! ¡Qué blandito!", "Mi sitio favorito para descansar."],
    mirror: ["¿Quién es ese guapo del espejo?", "¡Hoy me siento en plena forma!"], poster: ["Algún día visitaremos las estrellas.", "¡Esa es la Osa Mayor!"], frame: ["Qué bonito recuerdo.", "Algún día iremos allí."],
    lights: ["¡Qué magia cuando se encienden!", "Brillan igual que tú."], bed: "¡Mi camita! Toca «Dormir» cuando quieras descansar.", toys: "¡Mis juguetes! ¿Jugamos a la pelota?",
    can: ["¡A regar! Cada flor es un objetivo que has completado.", "¡Creced, florecitas!"], telescope: ["¡Mira, una estrella fugaz! Pide un deseo.", "Cada estrella aquí es un día dedicado a ti."]
  },
  pl: {
    streak: (n) => `Ya llevas ${n} días seguidos cuidándote. Sé que a veces cuesta, y justo por eso estoy orgulloso de ti.`,
    total: (n) => `Desde que nos conocemos has completado ${n} pequeños objetivos. Puestos en fila, forman un camino precioso.`,
    days: (n) => `Ya hace ${n} días que nos conocemos. Parece que fue ayer cuando me elegiste.`,
    cat: (c) => `Esta semana has dedicado mucho cuidado a «${c}». Se nota, ¿sabes?`,
    goal: (g) => `He notado que «${g}» te sale cada vez mejor. ¡Ya es un hábito de verdad!`,
    level: (n) => `Hemos llegado al nivel ${n}, paso a paso.`,
    close: ["Sigue así, a tu ritmo.", "Mañana seguimos aquí, tú y yo.", "Recuerda ser amable también contigo."]
  },
  data: { T: "Tus datos", P: "Todo se queda en este dispositivo. Guarda una copia para no perder tu progreso si cambias de móvil o borras los datos del navegador.", save: "Guardar una copia", restore: "Restaurar una copia", saved: "Copia guardada", ask: "¿Quieres sustituir tu progreso actual por el de la copia?", yes: "Sí, restaurar", no: "Cancelar", ok: "¡Progreso restaurado!", bad: "Este archivo no es una copia de Tanetto." },
  inst: { T: "Instala la app", P: "Añade Tanetto a la pantalla de inicio: se abre como una app, a pantalla completa, incluso sin internet.", B: "Instalar", ios: "En iPhone: toca el botón Compartir de Safari y luego «Añadir a pantalla de inicio».", done: "¡Listo! Encontrarás Tanetto entre tus apps." },
  guideAdd: ["¿Cómo no pierdo mi progreso?", "En «Más» encontrarás «Guardar una copia»: crea un archivo con todo tu progreso. En un móvil nuevo abre Tanetto y toca «Restaurar una copia»."]
});

Object.assign(T.en, {
  acts2: { ball: "Ball", bubbles: "Bubbles", hug: "Hug", high: "High five", dance: "Dance", hide: "Hide & seek" },
  full: {
    open: "Full screen", close: "Shrink", scenes: { room: "Room", garden: "Garden", terrace: "Terrace" },
    lockT: (n) => `Lv. ${n}`, lockToast: (n) => `Unlocks at level ${n}: complete your goals to get there!`,
    gardenCap: (n) => n ? (n === 1 ? "1 flower: one for every goal you've completed" : `${n} flowers: one for every goal you've completed`) : "Complete a goal and the first flower will sprout here",
    terraceCap: (n) => n ? (n === 1 ? "1 star: one for every day you took care of yourself" : `${n} stars: one for every day you took care of yourself`) : "Every day you take care of yourself, a star lights up here",
    starDay: (d, n) => n === 1 ? `${d}: 1 goal completed` : `${d}: ${n} goals completed`, starRest: (d) => `${d}: rest day`
  },
  play: {
    ballHint: "Tap the floor to throw the ball", ballSay: ["Got it! Again, again!", "What a throw! Throw it again!", "I'm super fast, right?"],
    bubbleHint: "Pop the bubbles before they float away!", bubbleEnd: (n) => n === 1 ? "We popped 1 bubble!" : `We popped ${n} bubbles together!`,
    hugSay: ["What a warm hug. Thank you!", "I could stay like this forever.", "I feel safe with you."],
    highHint: "Tap the hand!", highSay: ["High five! We're a team!", "Nice one!", "Five! Today we rock!"], highMiss: "Hey, you left me hanging!",
    danceSay: ["Check out my moves!", "The music makes me want to dance!", "One, two, three... spin!"],
    hideStart: (n) => `Where is ${n} hiding? Tap the right spot!`, hideMiss: ["Not here! Try again", "Cold... try somewhere else!"], hidePeek: "Psst... look where something is peeking out!", hideFound: ["You found me! Sharp eyes!", "Boo! You spotted me right away!", "Again? This time I'll hide better!"]
  },
  obj: {
    window: ["Look outside: what a lovely sky today.", "I wonder who's passing by out there."], fish: ["The little fish says hi!", "Blub blub! That means hello."], clock: (h) => `It's ${h}. A good moment for a sip of water?`,
    lamp: ["What a lovely warm light.", "Click! Much cozier."], plant: ["A little water and it grows happy, just like us.", "Plants love a bit of care."],
    guitar: ["Let me play you a little tune!", "Strum strum! Do you like it?"], books: ["A few pages a day add up to great things.", "This book is about an incredible adventure."],
    yarn: ["Yarn! I can't resist!", "Roll, roll!"], teddy: ["My favourite teddy.", "A hug for him too!"], pouf: ["Hop! So soft!", "My favourite spot to rest."],
    mirror: ["Who's that good-looking one in the mirror?", "I feel great today!"], poster: ["One day we'll visit the stars.", "That's the Big Dipper!"], frame: ["What a lovely memory.", "One day we'll go there together."],
    lights: ["So magical when they light up!", "They shine just like you."], bed: "My bed! Tap «Nap» whenever you want to rest.", toys: "My toys! Shall we play ball?",
    can: ["Let's water them! Every flower is a goal you completed.", "Grow, little flowers!"], telescope: ["Look, a shooting star! Make a wish.", "Every star here is a day you took care of yourself."]
  },
  pl: {
    streak: (n) => `You've taken care of yourself ${n} days in a row. I know it's hard sometimes, and that's exactly why I'm proud of you.`,
    total: (n) => `Since we met, you've completed ${n} small goals. Lined up, they make a beautiful path.`,
    days: (n) => `We've been together for ${n} days. It feels like yesterday that you picked me.`,
    cat: (c) => `This week you gave a lot of care to «${c}». It shows, you know?`,
    goal: (g) => `I've noticed «${g}» keeps getting easier for you. It's a real habit now!`,
    level: (n) => `We reached level ${n} together, one step at a time.`,
    close: ["Keep going, at your own pace.", "Tomorrow we'll still be here, you and me.", "Remember to be kind to yourself too."]
  },
  data: { T: "Your data", P: "Everything stays on this device. Save a copy so you don't lose your progress if you change phones or clear your browser data.", save: "Save a copy", restore: "Restore a copy", saved: "Copy saved", ask: "Replace your current progress with the one in the copy?", yes: "Yes, restore", no: "Cancel", ok: "Progress restored!", bad: "This file isn't a Tanetto copy." },
  inst: { T: "Install the app", P: "Add Tanetto to your home screen: it opens like an app, full screen, even offline.", B: "Install", ios: "On iPhone: tap Safari's Share button, then «Add to Home Screen».", done: "Done! You'll find Tanetto with your apps." },
  guideAdd: ["How do I keep my progress safe?", "In «More» you'll find «Save a copy»: it creates a file with all your progress. On a new phone, open Tanetto and tap «Restore a copy»."]
});

Object.assign(T.fr, {
  acts2: { ball: "Balle", bubbles: "Bulles", hug: "Câlin", high: "Tope là", dance: "Danser", hide: "Cache-cache" },
  full: {
    open: "Plein écran", close: "Réduire", scenes: { room: "Chambre", garden: "Jardin", terrace: "Terrasse" },
    lockT: (n) => `Niv. ${n}`, lockToast: (n) => `Se débloque au niveau ${n} : réalise tes objectifs pour y arriver !`,
    gardenCap: (n) => n ? (n === 1 ? "1 fleur : une pour chaque objectif réalisé" : `${n} fleurs : une pour chaque objectif réalisé`) : "Réalise un objectif et la première fleur poussera ici",
    terraceCap: (n) => n ? (n === 1 ? "1 étoile : une pour chaque jour où tu prends soin de toi" : `${n} étoiles : une pour chaque jour où tu prends soin de toi`) : "Chaque jour où tu prends soin de toi, une étoile s'allume ici",
    starDay: (d, n) => n === 1 ? `${d} : 1 objectif réalisé` : `${d} : ${n} objectifs réalisés`, starRest: (d) => `${d} : jour de repos`
  },
  play: {
    ballHint: "Touche le sol pour lancer la balle", ballSay: ["Attrapée ! Encore, encore !", "Quel lancer ! Relance-la !", "Je suis super rapide, hein ?"],
    bubbleHint: "Éclate les bulles avant qu'elles s'envolent !", bubbleEnd: (n) => n === 1 ? "On a éclaté 1 bulle !" : `On a éclaté ${n} bulles ensemble !`,
    hugSay: ["Quel câlin tout chaud. Merci !", "Je resterais comme ça pour toujours.", "Avec toi, je me sens en sécurité."],
    highHint: "Touche la main !", highSay: ["Tope là ! On fait équipe !", "Joli coup !", "Cinq ! Aujourd'hui on assure !"], highMiss: "Hé, tu m'as laissé la patte en l'air !",
    danceSay: ["Regarde ces pas !", "La musique me donne envie de danser !", "Un, deux, trois... pirouette !"],
    hideStart: (n) => `Où se cache ${n} ? Touche le bon endroit !`, hideMiss: ["Pas ici ! Réessaie", "Froid... essaie ailleurs !"], hidePeek: "Psst... regarde où quelque chose dépasse !", hideFound: ["Trouvé ! Quel œil !", "Bouh ! Tu m'as repéré tout de suite !", "Encore ? Cette fois je me cache mieux !"]
  },
  obj: {
    window: ["Regarde dehors : quel beau ciel aujourd'hui.", "Je me demande qui passe par là."], fish: ["Le petit poisson te salue !", "Blop blop ! Ça veut dire bonjour."], clock: (h) => `Il est ${h}. Un bon moment pour une gorgée d'eau ?`,
    lamp: ["Quelle belle lumière chaude.", "Clic ! C'est plus douillet."], plant: ["Un peu d'eau et elle pousse heureuse, comme nous.", "Les plantes adorent qu'on prenne soin d'elles."],
    guitar: ["Je te joue une petite chanson !", "Gratte gratte ! Ça te plaît ?"], books: ["Quelques pages par jour, ça fait de grandes choses.", "Ce livre raconte une aventure incroyable."],
    yarn: ["La pelote ! Je ne résiste pas !", "Elle roule, elle roule !"], teddy: ["Mon nounours préféré.", "Un câlin pour lui aussi !"], pouf: ["Hop ! Tout doux !", "Mon coin préféré pour me reposer."],
    mirror: ["Qui est ce beau gosse dans le miroir ?", "Aujourd'hui je me sens en pleine forme !"], poster: ["Un jour, on visitera les étoiles.", "C'est la Grande Ourse !"], frame: ["Quel beau souvenir.", "Un jour, on ira là-bas ensemble."],
    lights: ["Quelle magie quand elles s'allument !", "Elles brillent comme toi."], bed: "Mon panier ! Touche « Dodo » quand tu veux te reposer.", toys: "Mes jouets ! On joue à la balle ?",
    can: ["On arrose ! Chaque fleur est un objectif réalisé.", "Poussez, petites fleurs !"], telescope: ["Regarde, une étoile filante ! Fais un vœu.", "Chaque étoile ici est un jour où tu as pris soin de toi."]
  },
  pl: {
    streak: (n) => `Ça fait déjà ${n} jours d'affilée que tu prends soin de toi. Je sais que c'est parfois difficile, et c'est justement pour ça que je suis fier de toi.`,
    total: (n) => `Depuis qu'on se connaît, tu as réalisé ${n} petits objectifs. Mis bout à bout, ils forment un chemin magnifique.`,
    days: (n) => `On est ensemble depuis ${n} jours. J'ai l'impression que tu m'as choisi hier.`,
    cat: (c) => `Cette semaine, tu as pris grand soin de « ${c} ». Ça se voit, tu sais ?`,
    goal: (g) => `J'ai remarqué que « ${g} » te réussit de mieux en mieux. C'est devenu une vraie habitude !`,
    level: (n) => `On a atteint le niveau ${n} ensemble, pas à pas.`,
    close: ["Continue comme ça, à ton rythme.", "Demain, on sera encore là, toi et moi.", "N'oublie pas de prendre soin de toi aussi."]
  },
  data: { T: "Tes données", P: "Tout reste sur cet appareil. Enregistre une copie pour ne pas perdre ta progression si tu changes de téléphone ou effaces les données du navigateur.", save: "Enregistrer une copie", restore: "Restaurer une copie", saved: "Copie enregistrée", ask: "Remplacer ta progression actuelle par celle de la copie ?", yes: "Oui, restaurer", no: "Annuler", ok: "Progression restaurée !", bad: "Ce fichier n'est pas une copie de Tanetto." },
  inst: { T: "Installer l'app", P: "Ajoute Tanetto à l'écran d'accueil : il s'ouvre comme une app, en plein écran, même sans internet.", B: "Installer", ios: "Sur iPhone : touche le bouton Partager de Safari, puis « Sur l'écran d'accueil ».", done: "C'est fait ! Tu trouveras Tanetto parmi tes apps." },
  guideAdd: ["Comment ne pas perdre ma progression ?", "Dans « Plus », tu trouves « Enregistrer une copie » : cela crée un fichier avec toute ta progression. Sur un nouveau téléphone, ouvre Tanetto et touche « Restaurer une copie »."]
});

Object.assign(T.pt, {
  acts2: { ball: "Bola", bubbles: "Bolhas", hug: "Abraço", high: "Bate aqui", dance: "Dançar", hide: "Esconde-esconde" },
  full: {
    open: "Tela cheia", close: "Reduzir", scenes: { room: "Quarto", garden: "Jardim", terrace: "Terraço" },
    lockT: (n) => `Nív. ${n}`, lockToast: (n) => `Desbloqueia no nível ${n}: complete seus objetivos para chegar lá!`,
    gardenCap: (n) => n ? (n === 1 ? "1 flor: uma para cada objetivo concluído" : `${n} flores: uma para cada objetivo concluído`) : "Conclua um objetivo e a primeira flor vai brotar aqui",
    terraceCap: (n) => n ? (n === 1 ? "1 estrela: uma para cada dia dedicado a você" : `${n} estrelas: uma para cada dia dedicado a você`) : "A cada dia em que você se cuida, uma estrela se acende aqui",
    starDay: (d, n) => n === 1 ? `${d}: 1 objetivo concluído` : `${d}: ${n} objetivos concluídos`, starRest: (d) => `${d}: dia de descanso`
  },
  play: {
    ballHint: "Toque no chão para jogar a bola", ballSay: ["Peguei! De novo, de novo!", "Que arremesso! Joga de novo!", "Sou rapidíssimo, né?"],
    bubbleHint: "Estoure as bolhas antes que elas voem para longe!", bubbleEnd: (n) => n === 1 ? "Estouramos 1 bolha!" : `Estouramos ${n} bolhas!`,
    hugSay: ["Que abraço quentinho. Obrigado!", "Eu ficaria assim para sempre.", "Com você eu me sinto seguro."],
    highHint: "Toque na mão!", highSay: ["Bate aqui! Somos uma equipe!", "Mandou bem!", "Toca aqui! Hoje a gente arrasa!"], highMiss: "Ei, você me deixou com a pata no ar!",
    danceSay: ["Olha esses passos!", "A música me dá vontade de dançar!", "Um, dois, três... giro!"],
    hideStart: (n) => `Onde ${n} se escondeu? Toque no lugar certo!`, hideMiss: ["Aqui não! Tente de novo", "Frio... tente em outro lugar!"], hidePeek: "Psiu... veja onde algo está aparecendo!", hideFound: ["Me achou! Que olho!", "Bu! Você me achou rapidinho!", "De novo? Dessa vez eu me escondo melhor!"]
  },
  obj: {
    window: ["Olha lá fora: que céu bonito hoje.", "Quem será que passa por ali?"], fish: ["O peixinho está te dando oi!", "Blup blup! Isso quer dizer olá."], clock: (h) => `São ${h}. Um bom momento para um gole de água?`,
    lamp: ["Que luz gostosa e quentinha.", "Clique! Assim fica mais aconchegante."], plant: ["Um pouco de água e ela cresce feliz, assim como a gente.", "As plantas adoram carinho."],
    guitar: ["Vou tocar uma musiquinha para você!", "Tlim tlim! Gostou?"], books: ["Ler poucas páginas por dia faz grandes coisas.", "Este livro fala de uma aventura incrível."],
    yarn: ["O novelo! Não resisto!", "Rola, rola!"], teddy: ["Meu ursinho favorito.", "Um abraço para ele também!"], pouf: ["Opa! Que fofinho!", "Meu cantinho favorito para descansar."],
    mirror: ["Quem é esse bonitão no espelho?", "Hoje estou me sentindo ótimo!"], poster: ["Um dia a gente vai visitar as estrelas.", "Aquela é a Ursa Maior!"], frame: ["Que lembrança linda.", "Um dia a gente vai lá."],
    lights: ["Que mágico quando elas acendem!", "Elas brilham igual a você."], bed: "Minha caminha! Toque em «Soneca» quando quiser descansar.", toys: "Meus brinquedos! Vamos jogar bola?",
    can: ["Vamos regar! Cada flor é um objetivo que você concluiu.", "Cresçam, florzinhas!"], telescope: ["Olha, uma estrela cadente! Faça um pedido.", "Cada estrela aqui é um dia dedicado a você."]
  },
  pl: {
    streak: (n) => `Já são ${n} dias seguidos cuidando de você. Eu sei que às vezes é difícil, e é justamente por isso que tenho orgulho de você.`,
    total: (n) => `Desde que a gente se conheceu, você concluiu ${n} pequenos objetivos. Um atrás do outro, eles formam um caminho lindo.`,
    days: (n) => `Faz ${n} dias que a gente se conhece. Parece que foi ontem que você me escolheu.`,
    cat: (c) => `Nesta semana você dedicou muito cuidado a «${c}». Dá para ver, sabia?`,
    goal: (g) => `Percebi que «${g}» está ficando cada vez mais fácil para você. Virou um hábito de verdade!`,
    level: (n) => `Chegamos ao nível ${n}, um passo de cada vez.`,
    close: ["Continue assim, no seu ritmo.", "Amanhã estaremos aqui de novo, você e eu.", "Lembre-se de ser gentil com você também."]
  },
  data: { T: "Seus dados", P: "Tudo fica neste aparelho. Salve uma cópia para não perder seu progresso se trocar de celular ou apagar os dados do navegador.", save: "Salvar uma cópia", restore: "Restaurar uma cópia", saved: "Cópia salva", ask: "Substituir seu progresso atual pelo da cópia?", yes: "Sim, restaurar", no: "Cancelar", ok: "Progresso restaurado!", bad: "Este arquivo não é uma cópia do Tanetto." },
  inst: { T: "Instale o app", P: "Adicione o Tanetto à tela inicial: ele abre como um app, em tela cheia, mesmo sem internet.", B: "Instalar", ios: "No iPhone: toque no botão Compartilhar do Safari e depois em «Adicionar à Tela de Início».", done: "Pronto! O Tanetto está entre os seus apps." },
  guideAdd: ["Como não perco meu progresso?", "Em «Mais» você encontra «Salvar uma cópia»: ela cria um arquivo com todo o seu progresso. Em um celular novo, abra o Tanetto e toque em «Restaurar uma cópia»."]
});

/* La guida e l'informativa ricevono le parti nuove */
["it", "de", "es", "en", "fr", "pt"].forEach((k) => {
  const L0 = T[k];
  if (L0.guide && !L0.guide.some((q) => q[0] === L0.guideAdd[0])) L0.guide.splice(L0.guide.length - 1, 0, L0.guideAdd);
});
