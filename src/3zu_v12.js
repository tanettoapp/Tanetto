/* v12: compagni Plus, promemoria, bentornato, invita un amico (it, en; le altre lingue in 3zv_v12_more.js) */
Object.assign(T.it.pets, { miko: ["Miko", "Un gattino soffice come una nuvola."], rufi: ["Rufi", "Una volpina curiosa e coraggiosa."], pingo: ["Pingo", "Un pinguino che non si arrende mai."], dori: ["Dori", "Un draghetto gentile e un po' goffo."] });
Object.assign(T.en.pets, { miko: ["Miko", "A kitten as soft as a cloud."], rufi: ["Rufi", "A curious, brave little fox."], pingo: ["Pingo", "A penguin who never gives up."], dori: ["Dori", "A gentle, slightly clumsy dragon."] });
T.it.v12 = {
  ppT: "Compagni Plus", ppP: "Altri amici speciali, con Tanetto Plus.", want: (n) => `Voglio ${n}`, choose: (n) => `Scegli ${n}`, back: "Indietro",
  meT: "Il tuo compagno", meP: "Puoi cambiarlo quando vuoi: livello, oggetti e progressi restano tutti.", change: "Cambia compagno", cur: "Con te ora", hi: (n) => `Ciao, sono ${n}! Che bello stare con te.`, keep: "Se un giorno Plus finisce, il compagno che hai scelto resta con te.",
  perk: (k) => `${k} compagni esclusivi`,
  firstT: "Il tuo primo passo!", firstP: (n) => `Tocca il cerchio accanto a un obiettivo quando l'hai fatto: ${n} si riempirà di energia.`, giftT: "Un regalo di benvenuto", giftP: (n) => `${n} ha preparato qualcosa per te: 50 Tanì per iniziare ad arredare la sua stanzetta.`, giftB: "Grazie!",
  remT: "Un promemoria ogni giorno", remP: (n) => `Scegli l'ora: ${n} ti ricorderà con dolcezza di passare a trovarlo. Si aggiunge al calendario del telefono.`, remTime: "Ora del promemoria", remG: "Google Calendar", remI: "Altro calendario", remDone: "Promemoria pronto: aprilo e salvalo nel calendario.",
  remTitle: (n) => `${n} ti aspetta 🌱`, remBody: "Un piccolo passo per prenderti cura di te. Apri Tanetto:", remAsk: "Vuoi un promemoria gentile ogni giorno?", remLater: "No, grazie",
  backT: "Bentornato!", backP: [(n) => `${n} è felicissimo di rivederti! Nessun problema per i giorni passati: si riparte da qui, insieme.`, (n) => `Che bello, sei tornato! ${n} ti ha tenuto il posto al calduccio.`, (n) => `${n} ti stava aspettando. Oggi basta anche un passo piccolissimo.`], backGift: "+20 Tanì di bentornato", backB: "Ricominciamo",
  invT: "Invita un amico", invP: (n) => `Prendersi cura di sé è più bello in compagnia. Manda a un amico una foto di ${n}.`, invB: "Invita", invTitle: (n) => `Ti presento ${n}!`, invSub: "Prenditi cura di te con un piccolo amico · gratis", invText: (n) => `Ti presento ${n}, il mio piccolo compagno su Tanetto: ci aiuta a prenderci cura di noi, un passo alla volta. Provalo, è gratis!`,
  lite: "Modalità leggera", liteP: "Meno effetti, più fluida sui telefoni lenti. Si attiva da sola se serve."
};
T.en.v12 = {
  ppT: "Plus companions", ppP: "More special friends, with Tanetto Plus.", want: (n) => `I want ${n}`, choose: (n) => `Choose ${n}`, back: "Back",
  meT: "Your companion", meP: "You can change it anytime: level, items and progress all stay.", change: "Change companion", cur: "With you now", hi: (n) => `Hi, I'm ${n}! So happy to be with you.`, keep: "If Plus ever ends, the companion you chose stays with you.",
  perk: (k) => `${k} exclusive companions`,
  firstT: "Your first step!", firstP: (n) => `Tap the circle next to a goal when you've done it: ${n} will fill up with energy.`, giftT: "A welcome gift", giftP: (n) => `${n} has something for you: 50 Tanì to start decorating their little room.`, giftB: "Thank you!",
  remT: "A daily reminder", remP: (n) => `Pick a time: ${n} will gently remind you to drop by. It goes into your phone's calendar.`, remTime: "Reminder time", remG: "Google Calendar", remI: "Other calendar", remDone: "Reminder ready: open it and save it to your calendar.",
  remTitle: (n) => `${n} is waiting for you 🌱`, remBody: "A small step to take care of yourself. Open Tanetto:", remAsk: "Would you like a gentle daily reminder?", remLater: "No, thanks",
  backT: "Welcome back!", backP: [(n) => `${n} is so happy to see you again! Don't worry about the days you missed: we start again from here, together.`, (n) => `Yay, you're back! ${n} kept your spot nice and cosy.`, (n) => `${n} was waiting for you. Today even a tiny step is enough.`], backGift: "+20 Tanì welcome-back gift", backB: "Let's start again",
  invT: "Invite a friend", invP: (n) => `Self-care is nicer together. Send a friend a picture of ${n}.`, invB: "Invite", invTitle: (n) => `Meet ${n}!`, invSub: "Take care of yourself with a tiny friend · free", invText: (n) => `Meet ${n}, my little companion on Tanetto: we take care of ourselves, one small step at a time. Try it, it's free!`,
  lite: "Light mode", liteP: "Fewer effects, smoother on slower phones. Turns on by itself when needed."
};
