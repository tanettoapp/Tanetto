/* =================== 1.0.9 (fase 2): il "mondo del video" nell'app ===================
   Movimento del marchio (style_tokens del video "Paid with water"):
   1) Solo tre famiglie di curve: oggetti che entrano = back.out(1.4-2.5); camera/pagina = power2 (o expo);
      Germo (schiacciamento e allungamento) = elastic.out(1.1, 0.4). Le altre curve usate dai vecchi strati vengono
      ricondotte a queste tre (registerEase di GSAP): un solo posto, niente da cercare file per file.
   2) Spunta del marchio: il cerchio si riempie (back.out(2.5), 6 fotogrammi a 30 fps = 0,2 s), la spunta si disegna
      (5 fotogrammi), la scheda si schiaccia e torna (+ il segmento di energia nuovo cresce).
   3) Transizione a foglia (una sola volta: la partenza del viaggio).
   4) Coriandoli a foglia: l'unico sistema di particelle; vanno solo verso l'esterno e mai sopra il viso del compagno.
   5) Pulsante principale: alla pressione scala .92 + increspatura.
   Con "riduci movimento" (sistema) o la modalita' calma tutto questo resta fermo (anim = false). */

const MOTION = {
  FPS: 30,
  obj: "back.out(1.6)", objBig: "back.out(1.4)", tick: "back.out(2.5)",
  cam: "power2.inOut", camOut: "power2.out", camIn: "power2.in",
  germo: "elastic.out(1.1, 0.4)",
  TICK_FILL: 6 / 30, TICK_DRAW: 5 / 30, TICK_DRAW_AT: 3 / 30, SQUASH: 3 / 30
};

/* --- 1) tre famiglie di curve --- */
const brandEase = (() => {
  if (!G || !G.registerEase || !G.parseEase) return null;
  try {
    const P2 = { in: G.parseEase("power2.in"), out: G.parseEase("power2.out"), inOut: G.parseEase("power2.inOut") };
    const EL = G.parseEase(MOTION.germo);
    const elastic = (p) => EL(p); elastic.config = () => EL;
    const backOut0 = G.parseEase("back.out"); const backCfg = backOut0 && backOut0.config ? backOut0.config : null;
    const clampBack = (p) => { const k = Math.max(1.4, Math.min(2.5, +p || 1.7)); return backCfg ? backCfg(k) : backOut0; };
    const back = (p) => backOut0(p); back.config = (k) => clampBack(k);
    const map = {};
    ["sine", "power0", "power1", "power3", "power4", "quad", "quart", "quint", "strong", "circ", "linear.ease"].forEach((f) => ["in", "out", "inOut"].forEach((d) => { map[`${f}.${d}`] = P2[d]; }));
    ["sine", "power1", "power3", "power4", "quad", "quart", "quint", "strong", "circ"].forEach((f) => { map[f] = P2.out; });
    Object.keys(map).forEach((k) => G.registerEase(k, map[k]));
    G.registerEase("elastic.out", elastic); G.registerEase("elastic", elastic);
    G.registerEase("bounce.out", elastic); G.registerEase("bounce", elastic);
    G.registerEase("back.out", back); G.registerEase("back", back);
    G.defaults({ ease: "power2.out" });
    return { map: Object.keys(map).length };
  } catch (e) { return null; }
})();

/* --- 2) spunta del marchio --- */
const _popTickV22 = popTick;
popTick = function (g) {
  if (!anim) return;
  const row = [...document.querySelectorAll(".goal")].find((x) => x.dataset.done === g); if (!row) return _popTickV22(g);
  const tk = row.querySelector(".tick"); const svg = tk && tk.querySelector("svg"); const path = svg && svg.querySelector("path");
  if (!tk) return;
  const T0 = MOTION.TICK_FILL, D0 = MOTION.TICK_DRAW, A0 = MOTION.TICK_DRAW_AT;
  /* cerchio che si riempie dal centro */
  const fill = document.createElement("i"); fill.className = "tkfill"; fill.setAttribute("aria-hidden", "true"); tk.classList.add("tkanim"); tk.insertBefore(fill, tk.firstChild);
  G.fromTo(fill, { scale: 0 }, { scale: 1, duration: T0, ease: MOTION.tick, onComplete: () => { fill.remove(); tk.classList.remove("tkanim"); } });
  /* la spunta si disegna */
  if (path) {
    path.setAttribute("pathLength", "1"); path.style.strokeDasharray = "1"; path.style.strokeDashoffset = "1";
    G.to(path, { strokeDashoffset: 0, duration: D0, delay: A0, ease: MOTION.camOut, onComplete: () => { path.style.strokeDasharray = ""; path.style.strokeDashoffset = ""; path.removeAttribute("pathLength"); } });
  }
  /* la scheda si schiaccia (3 fotogrammi) e torna */
  /* (la transizione CSS della pressione non deve "inseguire" i valori di GSAP: spenta durante lo schiacciamento) */
  const tr0 = row.style.transition; row.style.transition = "none";
  const rest = () => { row.style.transition = tr0; };
  G.timeline({ onComplete: rest, onInterrupt: rest }).to(row, { scaleY: 0.94, scaleX: 1.015, transformOrigin: "50% 100%", duration: MOTION.SQUASH, ease: MOTION.camOut })
    .to(row, { scaleY: 1, scaleX: 1, duration: 0.32, ease: MOTION.obj, clearProps: "transform" });
  /* il segmento di energia nuovo cresce da sinistra */
  const on = document.querySelectorAll("#nvEnergy .nvseg i.on"); const seg = on[on.length - 1];
  if (seg) G.fromTo(seg, { scaleX: 0.15, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.36, delay: 0.06, ease: MOTION.objBig, clearProps: "transform" });
};

/* --- 3) transizione a foglia: copre la stanza, sotto cambia la scena (cb), poi la foglia passa oltre --- */
const LEAF_WIPE = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="lwg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2F7035"/><stop offset=".55" stop-color="#4E8A4A"/><stop offset="1" stop-color="#5DAE5A"/></linearGradient></defs><path d="M10 190 C10 90 70 18 190 10 C188 120 120 188 10 190 Z" fill="url(#lwg)"/><path d="M14 186 C70 128 120 76 184 14" stroke="#24572A" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M58 140 C46 112 46 92 52 74 M90 108 C80 82 82 62 90 46 M124 74 C118 56 120 42 128 30 M70 128 C96 130 116 130 134 124 M104 94 C128 96 146 94 160 86" stroke="#24572A" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/></svg>';
let leafWipeOn = false;
function leafWipe(cb) {
  const room = document.getElementById("room");
  if (!anim || !room || leafWipeOn) { cb(); return false; }
  leafWipeOn = true;
  const box = document.createElement("div"); box.className = "leafwipe"; box.setAttribute("aria-hidden", "true");
  const place = () => { const r = (document.getElementById("room") || room).getBoundingClientRect(); Object.assign(box.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" }); };
  place(); box.innerHTML = `<div class="lwleaf">${LEAF_WIPE}</div>`; document.body.appendChild(box);
  const leaf = box.firstChild; let done = false;
  const finish = () => { if (done) return; done = true; box.remove(); leafWipeOn = false; };
  G.timeline({ onComplete: finish })
    .fromTo(leaf, { scale: 0, rotation: -24, xPercent: -40, yPercent: 40 }, { scale: 3.2, rotation: 0, xPercent: 0, yPercent: 0, duration: 0.42, ease: MOTION.cam })
    .add(() => { try { cb(); } catch (e) { /* la scena deve cambiare comunque */ } place(); SND.play("paper"); })
    .to(leaf, { xPercent: 130, yPercent: -130, rotation: 18, duration: 0.46, ease: MOTION.cam }, "+=0.06");
  setTimeout(finish, 2500); /* rete di sicurezza: la foglia non resta mai sopra la stanza */
  return true;
}

/* --- 4) coriandoli a foglia --- */
const LEAF_COLS = ["#5DAE5A", "#B7E3A8", "#F2B140", "#E8603C", "#7CC4EC", "#F29BB8", "#4E8A4A"];
const LEAF_P = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 18 C2 9 7 3 18 2 C17 11 12 17 2 18 Z" fill="currentColor"/><path d="M3 17 C8 12 12 8 17 3" stroke="rgba(0,0,0,.18)" stroke-width="1.2" fill="none"/></svg>';
/* centro e raggio "sicuro" del compagno (in coordinate dell'elemento che ospita i coriandoli) */
function leafCenter(fx) {
  const fr = fx.getBoundingClientRect();
  const scope = fx._scope || fx.closest(".box, .overlay, #room, .card") || fx.parentElement || document.body;
  const pet = (scope.querySelector && (scope.querySelector("#petInner") || scope.querySelector(".box svg[role=img], .fdpet svg, .lpet svg"))) || null;
  if (pet) {
    const r = pet.getBoundingClientRect();
    if (r.width > 8) return { x: r.left + r.width / 2 - fr.left, y: r.top + r.height * 0.55 - fr.top, safe: Math.max(r.width, r.height) * 0.5, pet: true, face: { x: r.left + r.width / 2 - fr.left, y: r.top + r.height * 0.55 - fr.top, r: r.width * 0.3 } };
  }
  return { x: fr.width / 2, y: fr.height * 0.5, safe: Math.min(fr.width, fr.height) * 0.18, pet: false, face: null };
}
function leafBurst(n, host, big) {
  let fx = host || document.getElementById("fx"); if (!fx || !anim || !fx.isConnected) return [];
  /* fuori dai contenitori ".fx" (schede, finestre) i coriandoli vanno in uno strato fisso sopra l'elemento: non toccano il suo layout */
  let tmp = null;
  if (!fx.classList.contains("fx")) {
    const r = fx.getBoundingClientRect(); tmp = document.createElement("div"); tmp.className = "leaffx"; tmp.setAttribute("aria-hidden", "true");
    Object.assign(tmp.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    document.body.appendChild(tmp); tmp._scope = fx; setTimeout(() => tmp.remove(), 1700); fx = tmp;
  }
  const c = leafCenter(fx); const out = []; n = Math.max(4, Math.min(30, n | 0));
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.5; const ca = Math.cos(a), sa = Math.sin(a);
    const r0 = c.safe * (1.02 + Math.random() * 0.12), r1 = r0 + (big ? 70 : 46) + Math.random() * (big ? 80 : 50);
    const el = document.createElement("i"); el.className = "leafc"; el.setAttribute("aria-hidden", "true"); el.innerHTML = LEAF_P;
    el.style.color = LEAF_COLS[i % LEAF_COLS.length]; const sz = (big ? 13 : 11) + Math.random() * 7; el.style.width = el.style.height = sz.toFixed(1) + "px";
    el.style.left = (c.x - sz / 2) + "px"; el.style.top = (c.y - sz / 2) + "px"; fx.appendChild(el); out.push(el);
    const rot = Math.random() * 360;
    /* solo verso l'esterno: la distanza dal centro cresce sempre (nessuna gravita' che li riporti indietro sul viso) */
    const dur = 0.9 + Math.random() * 0.5;
    G.fromTo(el, { x: ca * r0, y: sa * r0, rotation: rot, scale: 0.4 },
      { x: ca * r1, y: sa * r1, rotation: rot + (Math.random() - 0.5) * 240, scale: 1, duration: dur, ease: MOTION.camOut, onComplete: () => el.remove() });
    G.timeline().fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: MOTION.camOut }).to(el, { opacity: 0, duration: 0.32, ease: MOTION.camIn }, dur - 0.34);
  }
  return out;
}
const _burstV22 = burst;
burst = function (kind, n, host) {
  if (kind === "confetti" || kind === "star") { leafBurst(kind === "confetti" ? Math.round((n || 20) * 0.75) : (n || 8), host, kind === "confetti"); return; }
  return _burstV22(kind, n, host);
};

/* --- 5) pulsante principale: pressione .92 (CSS) + increspatura dal punto toccato --- */
document.addEventListener("pointerdown", (ev) => {
  if (!anim) return; const b = ev.target && ev.target.closest && ev.target.closest(".btn"); if (!b || b.disabled) return;
  const r = b.getBoundingClientRect(); const d = Math.max(r.width, r.height) * 2.2;
  const s = document.createElement("span"); s.className = "btnrip"; s.setAttribute("aria-hidden", "true");
  Object.assign(s.style, { width: d + "px", height: d + "px", left: (ev.clientX - r.left - d / 2) + "px", top: (ev.clientY - r.top - d / 2) + "px" });
  const w = document.createElement("span"); w.className = "btnripw"; w.setAttribute("aria-hidden", "true"); w.appendChild(s);
  b.appendChild(w); setTimeout(() => w.remove(), 560);
}, { passive: true, capture: true });
/* (critica fase 2) Caveat e' un file a parte (11zb): lo si prepara a riposo dopo l'avvio, cosi' la prima lettera o
   cartolina e' gia' scritta a mano senza cambio di carattere, e l'avvio non lo aspetta. */
setTimeout(() => { try { if (document.fonts && document.fonts.load) document.fonts.load('700 20px "Caveat"', "Aa").catch(() => {}); } catch (e) { /* niente */ } }, 4000);
