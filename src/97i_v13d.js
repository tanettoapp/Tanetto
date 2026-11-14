/* =================== v13d: Altro piu' semplice =================== */
/* Una sola voce "Modalita' leggera": meno animazioni ed effetti insieme (prima erano due voci separate) */
const liteOn = () => isLite() || !!S.calm;
const _viewMoreV13d = viewMore;
viewMore = function () {
  let h = _viewMoreV13d(); const t = L();
  h = h.replace(/<div class="switchrow"><span id="calmL">[\s\S]*?id="calmSw"><\/button><\/div>/, "");
  h = h.replace(/(id="liteSw")/, "$1").replace(/aria-checked="(true|false)"( aria-labelledby="liteL" id="liteSw")/, `aria-checked="${liteOn()}"$2`);
  return h;
};
window.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "liteSw") return;
  ev.stopImmediatePropagation(); ev.preventDefault();
  const on = !liteOn(); S.lite = on; S.calm = on; save(); b.setAttribute("aria-checked", String(on));
  trackOnce(on ? "modalita-leggera-on" : "modalita-leggera-off");
  try { sessionStorage.setItem("tanetto-nosplash", "1"); } catch (e) { /* niente */ } setTimeout(() => location.reload(), 250);
}, true);
/* Una sola volta: rimisura chi era finito in modalita' leggera per errore (scheda nascosta), se non l'ha scelta a mano */
if (S.pet && !S.liteRe) { S.liteRe = 1; if (S.liteAuto === true && S.lite == null && !S.calm) { S.liteAuto = null; save(); applyLite(); setTimeout(measureLite, 0); } else save(); }
