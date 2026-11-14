/* =================== v13k: recensione del Play Store nei momenti felici (solo app Android) =================== */
/* Mai alla prima apertura: solo dopo aver completato tutti gli obiettivi, con almeno 3 giorni diversi di uso,
   e al massimo una volta ogni 60 giorni. La finestra e' quella ufficiale di Google, che decide da sola se mostrarla. */
const isNativeApp = () => { try { return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()); } catch (e) { return false; } };
const reviewPlugin = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.Review) || (C.registerPlugin ? C.registerPlugin("Review") : null); } catch (e) { return null; } };
let reviewPending = false;
function reviewEligible() {
  if (!isNativeApp() || !S.pet) return false;
  const days = new Set((S.log || []).map((x) => x.d)); if (days.size < 3) return false;
  if (S.revAsk) { const last = new Date(S.revAsk); if ((new Date(dkey()) - last) / 86400000 < 60) return false; }
  return true;
}
const _openAllDoneV13k = openAllDone;
openAllDone = function () { _openAllDoneV13k(); if (reviewEligible()) reviewPending = true; };
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("#closeLayer, #adGo"); if (!b || !reviewPending) return;
  reviewPending = false; S.revAsk = dkey(); save(); trackOnce("recensione-chiesta");
  setTimeout(() => { const p = reviewPlugin(); if (p && p.requestReview) p.requestReview().catch(() => {}); }, 700);
}, true);
