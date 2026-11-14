/* Questionario anonimo per i tester (it, en; le altre lingue in 3zt_survey_more.js) */
T.it.survey = {
  cardT: "Dicci la tua", cardP: "6 domande veloci e anonime per rendere Tanetto ancora più bello. In regalo 50 Tanì.", cardB: "Rispondi", done: "Grazie! Le tue risposte ci aiutano tantissimo.",
  inviteT: "Ti va di aiutarci?", inviteP: (n) => `${n} vorrebbe sapere cosa ne pensi. Ci vuole un minuto.`, later: "Più tardi",
  step: (i, n) => `Domanda ${i} di ${n}`, next: "Avanti", send: "Invia", multi: "Puoi sceglierne più di una", skip: "Salta",
  thanksT: "Grazie di cuore!", thanksP: "Le risposte sono anonime: niente nomi, niente e-mail. Se vuoi raccontarci di più, scrivici:", gift: "+50 Tanì per te",
  q: [
    { t: "Quanto ti piace Tanetto?", o: ["Pochissimo", "Poco", "Abbastanza", "Molto", "Tantissimo"] },
    { t: "Cosa ti piace di più?", m: true, o: ["Il compagno", "Gli obiettivi", "La casetta e gli oggetti", "Le gite e le cartoline", "Il diario", "I giochi", "La stagione e il sentiero", "Le musiche"] },
    { t: "Cosa miglioreresti?", m: true, o: ["Più obiettivi", "Più giochi", "Più oggetti", "Meno testo", "Più veloce", "I promemoria", "La grafica", "Va bene così"] },
    { t: "Tra un mese lo useresti ancora?", o: ["Sì, sicuro", "Forse", "No"] },
    { t: "Prenderesti Tanetto Plus?", o: ["Sì, al mese", "Sì, all'anno", "Forse, con più cose", "No"] },
    { t: "Come ci hai conosciuto?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Un amico", "Altro"] }
  ]
};
T.en.survey = {
  cardT: "Give feedback", cardP: "6 quick, anonymous questions to make Tanetto even better. You get 50 Tanì as a thank you.", cardB: "Answer", done: "Thank you! Your answers help us a lot.",
  inviteT: "Could you help us?", inviteP: (n) => `${n} would love to know what you think. It takes a minute.`, later: "Later",
  step: (i, n) => `Question ${i} of ${n}`, next: "Next", send: "Send", multi: "You can pick more than one", skip: "Skip",
  thanksT: "Thank you so much!", thanksP: "Answers are anonymous: no names, no emails. If you want to tell us more, write to us:", gift: "+50 Tanì for you",
  q: [
    { t: "How much do you like Tanetto?", o: ["Not at all", "A little", "It's okay", "A lot", "I love it"] },
    { t: "What do you like most?", m: true, o: ["The companion", "The goals", "The room and items", "Trips and postcards", "The journal", "The games", "The season path", "The music"] },
    { t: "What would you improve?", m: true, o: ["More goals", "More games", "More items", "Less text", "Faster", "Reminders", "The graphics", "It's fine as it is"] },
    { t: "Would you still use it a month from now?", o: ["Yes, for sure", "Maybe", "No"] },
    { t: "Would you get Tanetto Plus?", o: ["Yes, monthly", "Yes, yearly", "Maybe, with more features", "No"] },
    { t: "How did you find us?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "A friend", "Other"] }
  ]
};
