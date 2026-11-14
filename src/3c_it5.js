Object.assign(T.it, {
  gamesT: "Giochi e attività", gamesP: "Piccole attività per stare bene, da fare insieme.", gameSeedsInfo: (n, m) => `Tanì dai giochi oggi: ${n}/${m}`,
  games: { stars: ["Acchiappa le stelle", "Un gioco veloce per svegliarti"], letgo: ["Lascia andare", "Chiudi un pensiero in una bolla e guardalo volare via"], garden: ["Il giardino della gratitudine", "Ogni cosa bella diventa un fiore"], wave: ["Respira con l'onda", "Tieni premuto mentre l'onda sale"], sing: ["Canta con me", "Ripeti le note del compagno"], stretch: ["Stiracchiamoci", "Un minuto di stretching insieme"], memory: ["Sassolini gemelli", "Trova le coppie"], tricks: ["Trucchetti", "Le cose che ha imparato"] },
  start: "Iniziamo",
  letgoP: "Scrivi un pensiero che ti pesa. Non verrà salvato da nessuna parte.", letgoPh: "Es. la riunione di domani", letgoB: "Lascialo andare", letgoDone: "Volato via. Respira: adesso è un po' più leggero.", letgoAgain: "Un altro pensiero",
  gardenP: "Scrivi una cosa bella di oggi: diventerà un fiore nel tuo giardino.", gardenPh: "Es. il caffè con un'amica", gardenB: "Pianta il fiore", gardenN: (n) => n === 1 ? "1 fiore" : `${n} fiori`, gardenEmpty: "Il giardino aspetta il primo fiore.", gardenDone: "Che bel fiore! Il giardino cresce con te.", gardenList: "I tuoi fiori",
  waveP: "Tieni premuto quando l'onda sale e inspira. Lascia quando scende ed espira. Con calma.", waveIn: "Tieni premuto e inspira", waveOut: "Lascia ed espira", waveScore: (p) => `A tempo: ${p}%`, waveDone: "Che calma. Il respiro è il tuo superpotere.",
  singP: "Ascolta le note e ripetile toccando i fiori. A ogni giro se ne aggiunge una.", singListen: "Ascolta...", singYou: "Tocca a te!", singEnd: (n) => `Hai ripetuto ${n} note di fila!`,
  stretchP: "Sei movimenti lenti, dieci secondi ciascuno. Fermati se senti dolore.", stretchDone: "Fatto! Il corpo ti ringrazia.",
  poses: [["Braccia al cielo", "Allunga le braccia verso l'alto e respira."], ["Piega a destra", "Inclina piano il busto verso destra."], ["Piega a sinistra", "Ora piano verso sinistra."], ["Spalle morbide", "Fai dei cerchi lenti con le spalle."], ["Collo rilassato", "Porta l'orecchio verso la spalla, poi cambia lato."], ["Respiro finale", "Mani sulla pancia e un respiro profondo."]],
  memP: "Gira due sassolini alla volta e trova le coppie.", memMoves: (n) => `Mosse: ${n}`, memEnd: (n) => `Tutte le coppie in ${n} mosse!`,
  tricksP: "A ogni livello impara un trucchetto nuovo. Toccane uno per vederlo.", tricks: ["Saltello", "Giravolta", "Balletto", "Capriola", "Saluto", "Giocoleria", "Arcobaleno"], trickNew: (x) => `Nuovo trucchetto: ${x}!`,
  share: "Condividi", shareText: "Il mio compagno su Tanetto", shareFallback: "Tieni premuto sull'immagine per salvarla, poi condividila dove vuoi.", shareLevel: (n, l) => `${n} è arrivato al livello ${l}!`, shareRecord: (n) => `Nuovo record: ${n} punti!`, shareMaking: "Preparo l'immagine...",
  together: "E tu? Facciamo merenda insieme!", togetherBtn: (g) => `Fatto anche io: ${g}`,
  ritualT: "Rituale della buonanotte", ritualP: "Tre piccoli gesti prima di dormire. Fai quelli che ti vanno.", ritual: ["Luci soffuse", "Telefono lontano dal letto", "Un pensiero bello di oggi"], ritualB: "Buonanotte",
  visit: (f) => `Oggi è passato a trovarmi ${f}!`, visitHi: (f) => `${f} ti saluta!`,
  remind: { water: "Ehi, è un buon momento per un bicchiere d'acqua.", pause: "Che ne dici di una piccola pausa? Anche cinque minuti.", sleep: "Si sta facendo tardi. Il letto ci aspetta.", move: "Ci sgranchiamo un po' le gambe?" },
  summaryT: (n) => `Il riassunto di ${n}`, summary: (g, best) => g ? `Questa settimana hai completato ${g} obiettivi. Il tuo giorno migliore è stato ${best}. Sono fiero di te!` : "Questa settimana è stata tranquilla. Va bene così: ripartiamo insieme, un passo alla volta.",
  legalT: "Guida e informazioni", guideB: "Come funziona", privB: "Informativa privacy", termsB: "Condizioni d'uso", healthB: "Avviso sanitario", creditsB: "Crediti e licenze", tutAgain: "Rivedi la guida iniziale", ownerMissing: "[da completare prima della pubblicazione]",
  guide: [
    ["Come funziona Tanetto?", "Scegli piccoli obiettivi per prenderti cura di te. Ogni volta che ne completi uno, il tuo compagno prende energia e tu guadagni Tanì."],
    ["A cosa servono i Tanì?", "Con i Tanì arredi la casetta e scegli cosa indossa il compagno. Li guadagni con gli obiettivi, i regali, le avventure e i giochi."],
    ["Cos'è l'energia?", "Quando completi tutti gli obiettivi del giorno l'energia è piena e il compagno può partire per un'avventura. Torna con una cartolina."],
    ["E la felicità?", "Sale quando ti prendi cura di te e fate cose insieme. Non scende mai da sola: qui nessuno ti fa sentire in colpa."],
    ["Cosa succede se salto un giorno?", "Niente di grave. Puoi segnare un giorno di riposo e la serie non si interrompe. Il regalo del giorno ricomincia semplicemente dal primo."],
    ["Cosa sono le feste di stagione?", "In ogni stagione, completando 20 obiettivi, vinci un cappello speciale per il tuo compagno."],
    ["Come condivido i miei progressi?", "Tocca «Condividi» nella cartolina della settimana, nelle foto, nel giardino, nelle cartoline dei viaggi o quando sali di livello."],
    ["Dove sono i miei dati?", "Solo su questo dispositivo. Se cambi telefono o cancelli i dati del browser, i progressi ripartono da zero."]
  ],
  terms: [
    "Tanetto è una versione di prova gratuita, offerta così com'è, senza garanzia di funzionamento continuo. Può cambiare o essere interrotta in qualsiasi momento.",
    "L'app aiuta a costruire piccole abitudini quotidiane con un compagno virtuale e non sostituisce consigli medici o psicologici.",
    "Quello che scrivi resta tuo e resta sul tuo dispositivo. Usa l'app con serenità, senza forzarti.",
    "Illustrazioni, testi, musiche e codice di Tanetto sono protetti dal diritto d'autore e non possono essere copiati o riutilizzati senza permesso.",
    "Per qualsiasi domanda puoi scrivere al contatto indicato nell'informativa privacy."
  ],
  health: [
    "Tanetto non è un dispositivo medico e non offre diagnosi, cure o terapie.",
    "Gli esercizi di respirazione e di stretching sono leggeri. Fermati subito se senti dolore, capogiri o fastidio, e chiedi a un medico se hai dubbi.",
    "Se stai attraversando un momento difficile, parla con una persona di cui ti fidi o con un professionista. In caso di pericolo chiama subito i numeri qui sotto."
  ],
  credits: [
    "Illustrazioni, personaggi, testi e musiche sono stati creati appositamente per Tanetto.",
    "Caratteri: Fredoka e Figtree, con licenza SIL Open Font License 1.1.",
    "Animazioni: libreria GSAP, distribuita gratuitamente da Webflow secondo la sua licenza.",
    "I luoghi reali delle cartoline sono illustrazioni originali e semplificate."
  ],
  tracks: ["Mattina di sole", "Passeggiata", "Tè caldo", "Ninna nanna", "Prato fiorito", "Pioggerellina", "Nuvole lente", "Lanterne", "Onde del lago", "Bosco quieto", "Domenica pigra", "Stelle cadenti"]
});
