/* =================== v13h: ritorno e obiettivo entro 24 ore (conteggi anonimi) =================== */
/* "bentornato" conta chi torna dopo 2+ giorni. Qui si conta, con la stessa finestra per tutti,
   chi completa almeno un obiettivo entro 24 ore da quel ritorno, e chi invece non lo fa. */
const BACK_WIN = 24 * 3600 * 1000;
function backCheck(goalNow) {
  if (!S.backAt) return;
  const late = Date.now() - S.backAt > BACK_WIN;
  if (goalNow && !late) { delete S.backAt; save(); track("ritorno-obiettivo-entro-24h"); return; }
  if (late) { delete S.backAt; save(); track("ritorno-nessun-obiettivo-24h"); }
}
const _openWelcomeBackV13h = openWelcomeBack;
openWelcomeBack = function () {
  backCheck(false); /* un ritorno precedente rimasto aperto si chiude prima */
  const was = S.backDay; _openWelcomeBackV13h();
  if (S.backDay !== was) { S.backAt = Date.now(); save(); }
};
const _completeGoalV13h = completeGoal;
completeGoal = function (g, rect) {
  const before = (S.log || []).length; _completeGoalV13h(g, rect);
  if ((S.log || []).length > before) backCheck(true);
};
/* Chi torna dopo piu' di 24 ore senza aver fatto obiettivi viene contato come "nessun obiettivo" */
setTimeout(() => { try { backCheck(false); } catch (e) { /* niente */ } }, 2000);
