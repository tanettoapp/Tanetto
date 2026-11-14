/* 1.0.11 (G-06 / H-15): con l'app in secondo piano (Android tiene vivi i timer della WebView) i controlli ripetuti ogni
   pochi secondi non lavorano piu': tornano da soli quando l'app e' di nuovo visibile (ogni controllo ha anche il suo
   "visibilitychange"). Restano attivi quelli lunghi (da 1 minuto in su, es. il backup ogni 30 minuti).
   Il file non contiene testi: e' qui solo per partire prima di tutti gli altri timer. */
if (typeof document !== "undefined" && typeof window !== "undefined" && typeof window.setInterval === "function" && !window.__v26si) {
  window.__v26si = window.setInterval;
  window.setInterval = function (f, ms, ...a) {
    if (typeof f !== "function" || +ms >= 60000) return window.__v26si.call(window, f, ms, ...a);
    return window.__v26si.call(window, function (...b) { if (document.hidden) return undefined; return f.apply(this, b); }, ms, ...a);
  };
}
