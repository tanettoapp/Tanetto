/* =================== v14: widget del compagno sulla schermata Home (solo app Android) =================== */
/* L'app disegna il compagno (con cappello e umore di adesso) e manda al widget immagine, nome e riga sugli obiettivi.
   Si aggiorna solo quando qualcosa cambia davvero. */
const widgetPlugin = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.TanettoWidget) || (C.registerPlugin ? C.registerPlugin("TanettoWidget") : null); } catch (e) { return null; } };
let widgetKey = null, widgetTimer = null, widgetInfo = null;
function widgetLine() {
  const w = L().widget, n = S.petName || "";
  if (S.away) return w.away(n);
  const tg = todayGoals(); if (!tg.length) return w.free;
  const d = S.done.filter((g) => tg.includes(g)).length;
  return d >= tg.length ? w.done : w.goals(d, tg.length);
}
function widgetImage(expr) {
  return new Promise((res) => {
    try {
      const svg = petSVG(S.pet, expr, S.hat, stage(), S.petName || "").replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" ');
      const img = new Image(); img.onload = () => { try { const c = document.createElement("canvas"); c.width = 256; c.height = 256; c.getContext("2d").drawImage(img, 0, 0, 256, 256); res(c.toDataURL("image/png")); } catch (e) { res(null); } };
      img.onerror = () => res(null); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    } catch (e) { res(null); }
  });
}
function widgetSync() {
  if (!isNativeApp() || !S.pet) return; const p = widgetPlugin(); if (!p || !p.update) return;
  const tg = todayGoals(); const allDone = tg.length && tg.every((g) => S.done.includes(g));
  const expr = S.away ? "normale" : allDone ? "felice" : (S.lightsOff ? "assonnato" : "normale");
  const line = widgetLine(); const day = dkey(); const key = [S.pet, S.petName, S.hat, JSON.stringify(S.v20wear ? [S.v20wear.neck, S.v20wear.face] : 0), stage(), expr, line, S.lang, day].join("|");
  if (key === widgetKey) return; widgetKey = key;
  clearTimeout(widgetTimer);
  widgetTimer = setTimeout(async () => {
    const image = await widgetImage(expr);
    try { await p.update({ name: S.petName || "Tanetto", line, image: image || "", day }); } catch (e) { widgetKey = null; }
  }, 600);
}
const _renderV14w = render;
render = function () { _renderV14w(); widgetSync(); };
/* Uscendo dall'app il widget si riallinea; rientrando (anche dopo mezzanotte) si aggiorna se il giorno e' cambiato */
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") { widgetKey = null; widgetSync(); } else widgetSync(); });

/* Altro: riquadro per aggiungere il widget (Android chiede conferma con la sua finestra) */
function widgetCard() {
  if (!isNativeApp() || !S.pet || !widgetInfo || widgetInfo.count > 0) return "";
  const w = L().widget;
  return `<div class="card wdgcard"><div class="chhd"><span class="chic acc">${icon("home")}</span><div><h3>${esc(w.cardT)}</h3><p class="small muted">${esc(w.cardP)}</p></div></div>${widgetInfo.canPin ? `<button class="btn block" id="widgetAdd">${esc(w.add)}</button>` : `<p class="small">${esc(w.hint)}</p>`}</div>`;
}
const _viewMoreV14w = viewMore;
viewMore = function () {
  const h = _viewMoreV14w(); const c = widgetCard(); if (!c) return h;
  const key = `<div class="card stack" id="goalsCard">`; return h.includes(key) ? h.replace(key, c + key) : h + c;
};
function widgetRefreshInfo() { const p = widgetPlugin(); if (!isNativeApp() || !p || !p.info) return; p.info().then((o) => { const was = JSON.stringify(widgetInfo); widgetInfo = o; if (tab === "more" && JSON.stringify(o) !== was) { const y = window.scrollY; render(); window.scrollTo(0, y); } }).catch(() => {}); }
setTimeout(widgetRefreshInfo, 1500);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") setTimeout(widgetRefreshInfo, 500); });
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.dataset && b.dataset.tab === "more") setTimeout(widgetRefreshInfo, 50);
  if (b.id === "widgetAdd") { const p = widgetPlugin(); if (!p) return; trackOnce("widget-richiesto"); widgetKey = null; widgetSync(); p.pin().then(() => setTimeout(widgetRefreshInfo, 4000)).catch(() => toast(L().widget.hint)); }
});
