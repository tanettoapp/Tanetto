/* ===== 1.0.8 — ritocchi finali dopo il controllo critico =====
   Saluto in alto: la fascia "day" parte alle 11 (serve alle scene), ma alle 11-12 si dice ancora "buongiorno".
   Qui cambia solo il saluto: la luce della stanza e il resto seguono sempre phase(). */
(() => {
  const _greet = greetLine;
  greetLine = function () {
    const h = new Date().getHours();
    if (h < 11 || h >= 13) return _greet.apply(this, arguments);
    const _ph = phase;
    phase = function (x) { return arguments.length ? _ph(x) : "morning"; };
    try { return _greet.apply(this, arguments); } finally { phase = _ph; }
  };
})();
/* 1.0.9 (accessibilita'): nel Diario i titoli delle sezioni (h3) stanno subito sotto il titolo della pagina (h1):
   per i lettori di schermo sono di secondo livello, l'aspetto resta lo stesso */
const _viewDiaryA11y = viewDiary;
viewDiary = function () { const h = _viewDiaryA11y(); return S.pet ? h.replace(/<h3(?=[\s>])(?![^>]*aria-level)/g, '<h3 aria-level="2"') : h; };
