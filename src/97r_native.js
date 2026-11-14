/* =================== v14: rifiniture dell'app Android =================== */
/* 1) Condividere e salvare: il WebView di Android non sa farlo da solo, quindi si usa il plugin nativo.
   2) Uscita dall'account / Ricomincia da capo: notifiche e widget del compagno di prima si azzerano.
   3) Notifiche: permesso ricontrollato all'apertura (es. backup ripristinato su un telefono nuovo). */
const sharePlugin = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.TanettoShare) || (C.registerPlugin ? C.registerPlugin("TanettoShare") : null); } catch (e) { return null; } };
const blobB64 = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1] || ""); r.onerror = rej; r.readAsDataURL(blob); });

const _shareImageV14 = shareImage;
shareImage = async function (url, name) {
  const p = sharePlugin(); if (!isNativeApp() || !p) return _shareImageV14(url, name);
  const t = L(); const inv = inviteMode;
  try {
    const blob = await urlToBlob(url); const data = await blobB64(blob);
    const text = inv ? `${t.v12.invText(S.petName)} ${shareUrl()}` : `${t.shareText} · ${shareUrl()}`;
    await p.share({ data, name, mime: blob.type || "image/png", text, title: "Tanetto" });
    trackOnce(inv ? "invito-inviato" : "condivisione"); return true;
  } catch (e) { return false; }
};
const _saveImageV14 = saveImage;
saveImage = async function (url, name) {
  const p = sharePlugin(); if (!isNativeApp() || !p) return _saveImageV14(url, name);
  const t = L();
  try {
    const blob = await urlToBlob(url); const data = await blobB64(blob);
    try { await p.saveImage({ data, name, mime: blob.type || "image/png" }); toast(t.savedImg); trackOnce("salvataggio"); }
    catch (e) { if (e && e.code === "unsupported") { await p.share({ data, name, mime: blob.type || "image/png", text: "", title: "Tanetto" }); trackOnce("salvataggio"); } else toast(t.saveNo); }
  } catch (e) { toast(t.saveNo); }
};
const _saveBackupV14 = saveBackup;
saveBackup = async function () {
  const p = sharePlugin(); if (!isNativeApp() || !p) return _saveBackupV14();
  const t = L(); const name = `tanetto-copia-${dkey().split("-").reverse().join("-")}.json`;
  const json = JSON.stringify({ app: "tanetto", v: 1, saved: new Date().toISOString(), state: S });
  const data = await blobB64(new Blob([json], { type: "application/json" }));
  try { await p.saveFile({ data, name, mime: "application/json" }); toast(t.data.saved); trackOnce("copia-salvata"); }
  catch (e) {
    if (e && e.code === "unsupported") { try { await p.share({ data, name, mime: "application/json", text: "", title: "Tanetto" }); trackOnce("copia-salvata"); } catch (x) { toast(t.saveNo); } }
    else toast(t.saveNo);
  }
};

/* --- Quando il compagno sparisce (Esci, Elimina profilo, Ricomincia da capo) --- */
let hadPet = !!S.pet;
function petGone() {
  try { notifSchedule(); } catch (e) { /* niente */ }
  const p = widgetPlugin(); widgetKey = null;
  if (isNativeApp() && p && p.update) { try { const r = p.update({ reset: true }); if (r && r.catch) r.catch(() => {}); } catch (e) { /* niente */ } }
}
const _renderV14r = render;
render = function () { _renderV14r(); if (hadPet && !S.pet) petGone(); hadPet = !!S.pet; };

/* --- Notifiche --- */
/* All'apertura: se il permesso non c'e' piu' (o non c'e' mai stato su questo telefono), il promemoria risulta spento */
setTimeout(async () => {
  const p = LN(); if (!isNativeApp() || !p || !S.notif || !p.checkPermissions) return;
  try { const st = await p.checkPermissions(); if (st && st.display !== "granted") { S.notif = false; save(); if (tab === "more" || tab === "today") { const y = window.scrollY; render(); window.scrollTo(0, y); } } } catch (e) { /* niente */ }
}, 1500);
/* All'apertura senza compagno (es. app chiusa subito dopo "Esci"): niente promemoria o widget rimasti indietro */
setTimeout(() => { if (isNativeApp() && !S.pet) petGone(); }, 1200);
