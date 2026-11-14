/* v17 - Numeri del compagno: capriola, balletto, giravolta, saltelli, budino.
   Partono quando fai festa (obiettivi, livelli), quando lo tocchi e da soli ogni tanto. */
let trickOn = false, trickN = 0;
const TRICKS = {
  /* capriola all'indietro: si accuccia, salta, gira su se stesso e atterra schiacciandosi */
  flip(p) {
    return G.timeline()
      .to(p, { scaleY: 0.8, scaleX: 1.15, y: 14, transformOrigin: "50% 100%", duration: 0.14, ease: "power2.in" })
      .to(p, { scaleY: 1.05, scaleX: 0.96, y: -64, duration: 0.3, ease: "power2.out" })
      .to(p, { rotation: -360, transformOrigin: "50% 55%", duration: 0.52, ease: "power1.inOut" }, "-=0.24")
      .to(p, { y: 0, duration: 0.24, ease: "power2.in" }, "-=0.2")
      .to(p, { scaleY: 0.84, scaleX: 1.14, transformOrigin: "50% 100%", duration: 0.08 })
      .to(p, { scaleY: 1, scaleX: 1, duration: 0.45, ease: "elastic.out(1, .45)" });
  },
  /* balletto: tre saltelli a destra e sinistra */
  dance(p) {
    const tl = G.timeline({ defaults: { transformOrigin: "50% 100%" } });
    [-1, 1, -1, 1].forEach((s) => tl.to(p, { y: -14, x: s * 6, rotation: s * 10, duration: 0.15, ease: "power2.out" }).to(p, { y: 0, duration: 0.13, ease: "power2.in" }));
    return tl.to(p, { x: 0, rotation: 0, scaleY: 1.08, scaleX: 0.95, duration: 0.15 }).to(p, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "elastic.out(1, .5)" });
  },
  /* giravolta: si gira dall'altra parte e torna, con un saltino */
  turn(p) {
    return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
      .to(p, { y: -18, duration: 0.16, ease: "power2.out" })
      .to(p, { scaleX: -1, duration: 0.22, ease: "power1.inOut" }, "<")
      .to(p, { y: 0, duration: 0.16, ease: "power2.in" })
      .to(p, { y: -18, duration: 0.16, ease: "power2.out", delay: 0.12 })
      .to(p, { scaleX: 1, duration: 0.22, ease: "power1.inOut" }, "<")
      .to(p, { y: 0, duration: 0.3, ease: "bounce.out" });
  },
  /* tre saltelli sempre piu' piccoli */
  hops(p) {
    const tl = G.timeline({ defaults: { transformOrigin: "50% 100%" } });
    [30, 18, 9].forEach((h) => tl.to(p, { y: -h, scaleY: 1.06, scaleX: 0.96, duration: 0.14 + h / 300, ease: "power2.out" }).to(p, { y: 0, scaleY: 0.9, scaleX: 1.08, duration: 0.12 + h / 400, ease: "power2.in" }));
    return tl.to(p, { scaleY: 1, scaleX: 1, duration: 0.3, ease: "elastic.out(1, .5)" });
  },
  /* budino: si allarga e si allunga come una gelatina */
  jelly(p) {
    return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
      .to(p, { scaleX: 1.2, scaleY: 0.82, duration: 0.14 })
      .to(p, { scaleX: 0.86, scaleY: 1.16, duration: 0.14 })
      .to(p, { scaleX: 1.08, scaleY: 0.94, duration: 0.12 })
      .to(p, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1.2, .35)" });
  }
};
function petTrick(name, fx) {
  const p = document.getElementById("petInner"); if (!p || !anim || trickOn || S.lightsOff || S.away || playMode || playBusy) return false;
  const k = TRICKS[name] ? name : "hops"; trickOn = true; trickN++;
  G.killTweensOf(p); G.set(p, { clearProps: "transform" });
  const tl = TRICKS[k](p);
  tl.eventCallback("onComplete", () => { G.set(p, { clearProps: "transform" }); trickOn = false; });
  if (fx !== false) setTimeout(() => { if (document.getElementById("petInner") === p) burst("star", k === "flip" ? 8 : 5); }, k === "flip" ? 820 : 450);
  if (k === "flip" || k === "turn") SND.play("sparkle");
  return true;
}
/* se la schermata viene ridisegnata a meta' numero, il compagno riparte da fermo */
setInterval(() => { if (trickOn && !document.getElementById("petInner")) trickOn = false; }, 1500);

/* feste: la grande festa e' sempre una capriola, le piccole a volte un numero */
const _jumpV17 = jump;
jump = function (big) {
  if (!anim) return;
  if (big) { if (!petTrick("flip")) _jumpV17(true); return; }
  if (!trickOn && Math.random() < 0.35) { if (petTrick(pick(["dance", "hops", "jelly", "turn"]), false)) return; }
  if (!trickOn) _jumpV17(false);
};

/* da solo, ogni tanto, fa un numero (piu' spesso quando e' felice) */
const _idleActionV17 = idleAction;
idleAction = function () {
  const p = document.getElementById("petInner"); if (!p || layer.innerHTML || tutOn || trickOn) return;
  if (playMode || (full && Math.random() < 0.5)) { _idleActionV17(); return; }
  const happy = typeof joyNow === "function" ? joyNow() >= 60 : true;
  if (!S.lightsOff && Math.random() < (happy ? 0.32 : 0.18)) {
    idleN++; const r = Math.random();
    petTrick(r < 0.12 ? "flip" : r < 0.4 ? "dance" : r < 0.62 ? "turn" : r < 0.82 ? "hops" : "jelly");
    if (idleN % 3 === 0 && !sayText && document.getElementById("bubbleTxt")) say(pick(L().idle), 5000);
    return;
  }
  if (!trickOn) _idleActionV17();
};

/* coccole: ogni 4 tocchi (senza solletico) fa un numero per te */
let patN = 0;
const _petTapV17 = petTap;
petTap = function () {
  if (suppressPetClick || S.lightsOff || trickOn || playMode) { _petTapV17(); return; }
  const now = Date.now(); const willTickle = tapTimes.filter((x) => now - x < 1300).length >= 2;
  patN++;
  if (!willTickle && patN % 4 === 0 && anim) {
    const t = L(); petTrick(pick(["flip", "dance", "turn", "hops"]));
    tapTimes = []; say(pick(t.talk.pat), 2200); SND.play("pop"); SND.haptic([10, 40, 10]); addJoy(1); save(); refreshJoy(); return;
  }
  _petTapV17();
};
