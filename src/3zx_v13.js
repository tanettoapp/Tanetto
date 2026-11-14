/* v13: nomi piu' chiari e nuovi testi (it, en; altre lingue in 3zy_v13_more.js) */
Object.assign(T.it.season, { zero: "Stagione dei Fondatori", passi: (n) => `${n} Scintille`, next: (n) => n === 1 ? "Ancora 1 Scintilla alla prossima tappa" : `Ancora ${n} Scintille alla prossima tappa`, how: "Guadagni Scintille solo prendendoti cura di te: 10 per ogni obiettivo, 20 per ogni giornata completa, 100 per ogni sfida della settimana. Nella settimana di festa valgono il doppio." });
T.it.wk.reward = (t, p) => `Premio: ${t} Tanì e ${p} Scintille`;
T.it.festa.P = "Settimana di festa: le Scintille valgono il doppio!";
T.it.plus.soonP = "Arriverà con l'app sugli store. Abbiamo registrato il tuo interesse: grazie!";
T.it.v13 = { subscribe: "Abbonati", afterY: (p) => `7 giorni gratis, poi ${p}. Il rinnovo parte da solo alla fine della prova: puoi disdire quando vuoi, anche prima.`, afterM: (p) => `${p}. Si rinnova da solo ogni mese: puoi disdire quando vuoi.`, allT: "Tutto fatto per oggi! 🎉", allP: (n) => `${n} ha l'energia piena ed è pronto per un'avventura!`, allB: "Scegli l'avventura", later: "Più tardi", newTag: "Novità!" };
Object.assign(T.en.season, { zero: "Founders' Season", passi: (n) => n === 1 ? "1 Spark" : `${n} Sparks`, next: (n) => n === 1 ? "1 more Spark to the next stage" : `${n} more Sparks to the next stage`, how: "You earn Sparks only by taking care of yourself: 10 for each goal, 20 for each complete day, 100 for each weekly challenge. During the festival week they're worth double." });
T.en.wk.reward = (t, p) => `Reward: ${t} Tanì and ${p} Sparks`;
T.en.festa.P = "Festival week: Sparks are worth double!";
T.en.plus.soonP = "It will arrive with the app in the stores. We've noted your interest: thank you!";
T.en.v13 = { subscribe: "Subscribe", afterY: (p) => `7 days free, then ${p}. It renews automatically when the trial ends: you can cancel anytime, even before.`, afterM: (p) => `${p}. It renews automatically every month: cancel anytime.`, allT: "All done for today! 🎉", allP: (n) => `${n} has full energy and is ready for an adventure!`, allB: "Choose an adventure", later: "Later", newTag: "New!" };
/* Le frasi del compagno sono al maschile: descrizioni coerenti */
T.it.pets.ondi[1] = "Un cucciolo di lontra con un sassolino portafortuna.";
T.it.pets.lumi[1] = "Un cucciolo di lucciola che brilla a ogni tuo passo.";
T.it.pets.rufi[1] = "Un cucciolo di volpe, curioso e coraggioso.";
