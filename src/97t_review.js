/* =================== v15: accesso per i revisori di Google Play =================== */
/* Google deve poter provare anche Tanetto Plus senza pagare. Esiste UN solo account speciale, creato dallo
   sviluppatore nella console di Firebase (documento reviewers/{uid} con plus: true): chi entra con quello
   vede Plus attivo. Il documento non si puo' creare ne' modificare dall'app (regole di Firestore). */
async function reviewCheck() {
  if (!A.uid) { if (A.rev) { A.rev = false; saveA(); } return; }
  try {
    await fbLoad(); if (!A.uid || !window.TanFB.perks) return;
    const p = await window.TanFB.perks(); const rev = !!(p && p.plus === true);
    if (rev !== !!A.rev) { A.rev = rev; saveA(); if (S.pet && (tab === "more" || tab === "today")) { const y = window.scrollY; render(); window.scrollTo(0, y); } }
  } catch (e) { /* senza internet resta com'era */ }
}
plusOk = function () { return isNativeApp() && (!!S.plusOn || !!(A.uid && A.rev)); };
const _afterLoginV15 = afterLogin;
afterLogin = async function (...a) { const r = await _afterLoginV15(...a); reviewCheck(); return r; };
const _checkSessionV15 = checkSession;
checkSession = function (u) { _checkSessionV15(u); if (!A.uid && A.rev) { A.rev = false; saveA(); } };
setTimeout(() => { if (A.uid) reviewCheck(); }, 4000);
