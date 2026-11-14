/* ===== 1.0.7 — animazioni di entrata che restavano a metà =====
   Alcuni elementi (pacchetti di Tanì, oggetti, mete, piani...) hanno in CSS "transition: transform" per l'effetto
   alla pressione. Durante le animazioni di GSAP quella transizione "insegue" i valori e GSAP legge valori a metà:
   i pacchetti del negozio restavano rimpiccioliti al 70%. Soluzione: durante l'animazione la transizione CSS si
   spegne solo su quegli elementi, e alla fine torna com'era. */
(() => {
  if (!G || !G.from || !G.utils) return;
  const MOVE = ["scale", "scaleX", "scaleY", "x", "y", "xPercent", "yPercent", "rotation", "rotate", "transform"];
  /* Conta le animazioni attive per elemento: la transizione torna solo quando finisce l'ultima.
     Le animazioni dentro una timeline (tl.from) non passano di qui: nessuna oggi tocca elementi con transizione. */
  const cnt = new WeakMap(), keep = new WeakMap();
  const hasTr = (el) => { const cs = getComputedStyle(el); return /(^|,\s*)(all|transform)(\s|,|$)/.test(cs.transitionProperty) && cs.transitionDuration.split(",").some((d) => parseFloat(d) > 0); };
  const moves = (v) => v && typeof v === "object" && ("keyframes" in v || MOVE.some((k) => k in v));
  const guard = (fn) => function (targets, a, b) {
    const args = [...arguments], vi = fn === "fromTo" ? 2 : 1, vars = args[vi];
    try {
      if (vars && typeof vars === "object" && (moves(vars) || (fn === "fromTo" && moves(a)))) {
        const els = G.utils.toArray(targets).filter((el) => el && el.nodeType === 1 && (cnt.get(el) || hasTr(el)));
        if (els.length) {
          let open = true;
          const done = () => { if (!open) return; open = false; els.forEach((el) => { const n = (cnt.get(el) || 1) - 1; if (n > 0) cnt.set(el, n); else { cnt.delete(el); el.style.transition = keep.get(el) || ""; keep.delete(el); } }); };
          const oc = vars.onComplete, oi = vars.onInterrupt;
          args[vi] = Object.assign({}, vars, { onComplete() { done(); if (oc) return oc.apply(this, arguments); }, onInterrupt() { done(); if (oi) return oi.apply(this, arguments); } });
          els.forEach((el) => { const n = cnt.get(el) || 0; if (!n) { keep.set(el, el.style.transition); el.style.transition = "none"; } cnt.set(el, n + 1); });
        }
      }
    } catch (e) { /* in caso di dubbio si anima come prima */ }
    return orig[fn].apply(G, args);
  };
  const orig = { from: G.from.bind(G), fromTo: G.fromTo.bind(G) };
  G.from = guard("from"); G.fromTo = guard("fromTo");
})();
