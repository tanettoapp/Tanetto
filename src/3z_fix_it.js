// Proofreading fixes for Italian (it): plurals with 1, gender agreement, small phrasing improvements.
T.it.goalsCount = (n) => n === 1 ? "1 scelto su 3-8" : `${n} scelti su 3-8`;
T.it.gameEnd = (n) => n === 1 ? "Hai fatto 1 punto!" : `Hai fatto ${n} punti!`;
T.it.singEnd = (n) => n === 1 ? "Hai ripetuto 1 nota!" : `Hai ripetuto ${n} note di fila!`;
T.it.summary = (g, best) => g ? `Questa settimana hai completato ${g === 1 ? "1 obiettivo" : `${g} obiettivi`}. Il tuo giorno migliore è stato ${best}. Sono fiero di te!` : "Questa settimana è stata tranquilla. Va bene così: ripartiamo insieme, un passo alla volta.";
T.it.comicEnd = (n) => n === 1 ? "1 piccolo passo questa settimana!" : `${n} piccoli passi questa settimana!`;
T.it.chat.prog = (d, t, s) => t ? `Oggi hai completato ${d} ${d === 1 ? "obiettivo" : "obiettivi"} su ${t}${s > 1 ? ` e sei a ${s} giorni di fila` : ""}. ${d >= t ? "Giornata piena: sono fiero di te!" : "Ne basta uno alla volta: ce la fai!"}` : `Oggi è un giorno libero${s > 1 ? `, e sei a ${s} giorni di fila` : ""}. Goditelo!`;
T.it.privP = "Compagno, obiettivi e diario restano su questo dispositivo. Se crei un account, salviamo anche la tua e-mail e un backup dei progressi, solo per farteli ritrovare. Per migliorare l'app contiamo alcune azioni in forma anonima e aggregata (per esempio quante volte viene aperta). Tanetto non è uno strumento medico ed è per tutte le età: sotto l'età del consenso digitale del tuo Paese (da 13 a 16 anni, secondo il Paese) la pubblicità non è mai personalizzata e il backup online non è disponibile.";
T.it.questions[1] = "Per cosa vuoi dire grazie oggi?";
T.it.world[21].s = "All'alba {n} guarda le guglie di granito del Fitz Roy diventare rosa. Gli abitanti del posto lo chiamavano Chaltén, \"la montagna che fuma\", perché la cima è spesso avvolta dalle nuvole.";
