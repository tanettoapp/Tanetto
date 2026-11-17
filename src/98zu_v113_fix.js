/* =================== 1.0.10 (113): correzioni richieste dal proprietario il 17/11/2026 ===================
   1) Zaino (Casa) e scheda in cima alle Avventure: "Gita breve" e "Viaggio completo" centrate sotto la casella a cui si
      riferiscono (la casella che completa la gita breve, quella con la tacca, e l'ultima), su una riga se possibile,
      mai fuori dalla scheda e mai una sopra l'altra, in tutte le lingue e su ogni schermo.
      Come: per ogni scritta si misura la larghezza vera e si sceglie, in quest'ordine:
      a) una riga, centrata, carattere 12,5 px (o un poco piu' piccolo, non sotto 11 px);
      b) due righe, centrate (larghezza uguale a destra e a sinistra del centro della casella);
      c) solo se non c'e' altro modo: la scritta resta dentro la scheda anche se non e' piu' esattamente centrata.
   2) ornamento della stagione subito dopo l'ultima parola del saluto (o del nome), mai da solo su una riga (v113Greet + 11zm).
   3) Stagione, colonna "Fila d'oro": senza Plus, toccare una ricompensa d'oro (bloccata o gia' raggiunta) apre Tanetto Plus,
      come gia' faceva solo la piccola corona. Con Plus resta tutto com'era (pulsante "Prendi").
      Aspetto (11zm): oro caldo e pieno (prima sbiadito), corona in una pillola dorata con "Con Plus", le ricompense gia'
      raggiunte con un bordo dorato piu' deciso; solo per gli adulti (18 anni in su, ageAds; animazioni attive e niente modalita' leggera, gr20anim) un luccichio lento e
      discreto sulle ricompense raggiunte. A bambini e ragazzi nessun movimento che inviti a comprare: solo l'aspetto. */
const V113_FS = [12.5, 12, 11.5, 11];
function v113ScaleFit(sc) {
  const seg = sc.classList.contains("tr20scale") ? sc.parentElement && sc.parentElement.querySelector(".tr20seg") : sc.parentElement && sc.parentElement.querySelector(".nvseg");
  const card = sc.closest(".nven, .tr20st"); if (!seg || !card) return;
  const boxes = [...seg.children]; if (!boxes.length) return;
  const f = sc.querySelector(":scope > .f"), h = sc.querySelector(":scope > .h");
  const hb = boxes.find((b) => b.classList.contains("half"));
  const sr = sc.getBoundingClientRect(), cr = card.getBoundingClientRect(); if (!sr.width) return;
  const minL = cr.left + 6 - sr.left, maxR = cr.right - 6 - sr.left; /* dentro la scheda, con 6 px di margine dal bordo */
  const center = (b) => { const r = b.getBoundingClientRect(); return r.left + r.width / 2 - sr.left; };
  /* sistema una scritta centrata in cx, tra lo e hi; ritorna [sinistra, destra] occupati */
  const place = (el, cx, lo, hi, hiCard) => {
    const st = el.style; st.position = "absolute"; st.top = "0"; st.right = "auto"; st.transform = "none"; st.textAlign = "center"; st.visibility = "";
    const half = Math.max(0, Math.min(cx - lo, hi - cx));
    for (const fs of V113_FS) { /* a) una riga */
      st.fontSize = fs + "px"; st.whiteSpace = "nowrap"; st.width = "auto"; st.left = "0";
      const w = Math.ceil(el.getBoundingClientRect().width) + 1;
      if (w / 2 <= half) { st.width = w + "px"; st.left = (cx - w / 2) + "px"; return [cx - w / 2, cx + w / 2]; }
    }
    /* b) due righe, centrate (larghezza uguale ai due lati del centro); per le parole piu' lunghe (russo con 6 obiettivi su
          360 px) anche 10,5-10 px e 2 px in piu' verso il bordo della scheda (mai meno di 4 px dal bordo) */
    for (const [fs, ext] of V113_FS.map((x) => [x, 0]).concat([[10.5, 2], [10, 2]])) {
      const half = Math.max(0, Math.min(cx - lo + ext, hi - cx + (hiCard ? ext : 0)));
      st.fontSize = fs + "px"; st.whiteSpace = "normal"; st.width = Math.floor(half * 2) + "px"; st.left = (cx - half) + "px";
      const lh = parseFloat(getComputedStyle(el).lineHeight) || fs * 1.15;
      if (half * 2 >= 40 && el.scrollWidth <= Math.floor(half * 2) + 1 && el.getBoundingClientRect().height <= lh * 2 + 2) {
        /* la scatola si stringe sul testo, sempre centrata */
        const rg = document.createRange(); rg.selectNodeContents(el); const tw = Math.ceil(Math.max(...[...rg.getClientRects()].map((x) => x.width))) + 1;
        if (tw < half * 2) { st.width = tw + "px"; st.left = (cx - tw / 2) + "px"; return [cx - tw / 2, cx + tw / 2]; }
        return [cx - half, cx + half];
      }
    }
    st.fontSize = V113_FS[0] + "px"; st.whiteSpace = "nowrap"; st.width = "auto"; st.left = "0";
    const w1 = Math.ceil(el.getBoundingClientRect().width) + 1;
    /* c) dentro la scheda, il piu' vicino possibile al centro */
    const w = Math.min(w1, hi - lo); st.whiteSpace = w < w1 ? "normal" : "nowrap"; st.width = w + "px";
    const l = Math.max(lo, Math.min(cx - w / 2, hi - w)); st.left = l + "px"; return [l, l + w];
  };
  let fr = [maxR, maxR];
  if (f) fr = place(f, center(boxes[boxes.length - 1]), minL, maxR, true);
  if (h && hb) {
    const hr = place(h, center(hb), minL, f ? fr[0] - 6 : maxR, !f);
    if (f && hr[1] > fr[0] - 6) f.style.visibility = "hidden"; /* ultima difesa: mai due scritte una sopra l'altra */
  }
  let mh = 0; [f, h].forEach((el) => { if (el && el.style.visibility !== "hidden") mh = Math.max(mh, el.getBoundingClientRect().height); });
  sc.style.minHeight = Math.ceil(mh) + "px"; sc.style.height = Math.ceil(mh) + "px";
}
function v113ScalesFit() { try { document.querySelectorAll("#app .nven .nvscale, #app .tr20scale").forEach(v113ScaleFit); } catch (e) { /* niente */ } }
/* 2) ornamento della stagione nel saluto: un elemento vuoto (aria-hidden) dentro l'ultima parola, che non va a capo.
   Parola lunga senza spazi (nomi lunghi, giapponese, cinese): si lega solo agli ultimi 4 caratteri, cosi' ci sta sempre. */
function v113Greet() {
  try {
    const gw = document.querySelector("#app h1.greet.g19 .gw"); if (!gw || gw.querySelector(".gwo")) return;
    const txt = gw.textContent.trimEnd(); const m = /(\S+)$/.exec(txt); if (!m) return;
    const chars = Array.from(m[1]); const tail = chars.slice(-4).join(""); const head = txt.slice(0, txt.length - tail.length);
    gw.textContent = head; const w = document.createElement("span"); w.className = "gwl"; w.textContent = tail;
    const o = document.createElement("span"); o.className = "gwo"; o.setAttribute("aria-hidden", "true"); w.appendChild(o); gw.appendChild(w);
  } catch (e) { /* niente */ }
}
const _renderV113 = render;
render = function (...a) { const r = _renderV113.apply(this, a); v113Greet(); v113ScalesFit(); return r; };
let v113RaF = 0;
const v113Later = () => { cancelAnimationFrame(v113RaF); v113RaF = requestAnimationFrame(v113ScalesFit); };
window.addEventListener("resize", v113Later);
try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(v113Later); } catch (e) { /* niente */ }
try { new MutationObserver((ms) => { if (ms.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1 && (n.matches(".nven, .tr20st, .nvscale, .tr20scale") || n.querySelector(".nvscale, .tr20scale"))))) v113Later(); })
  .observe(document.getElementById("app"), { childList: true, subtree: true }); } catch (e) { /* niente */ }

/* 3) Fila d'oro senza Plus: tutta la ricompensa apre Tanetto Plus (stesso percorso della corona: dopo l'acquisto si torna al
   sentiero). Se Tanetto Plus si chiude senza comprare, si torna al sentiero nello stesso punto della lista (prima si usciva). */
/* la posizione nella lista si legge prima del tocco (dito o tastiera): per la corona, quando arriva il nostro gestore,
   97c (in cattura, registrato prima) ha gia' aperto Plus e la lista non c'e' piu' */
let v113Y = null;
const v113Pos = (ev) => { const l = ev.target.closest && ev.target.closest(".pathlist"); v113Y = l ? l.scrollTop : null; };
document.addEventListener("pointerdown", v113Pos, true);
document.addEventListener("keydown", v113Pos, true);
/* il segno sta sulla finestra di Plus stessa: se Plus viene sostituito (Termini, Privacy...) il segno sparisce con lei */
const v113Mark = () => { const pb = layer.querySelector(".plusbox"); if (pb) pb.dataset.v113back = v113Y == null ? "" : String(v113Y); v113Y = null; /* mai riusata una posizione vecchia */ };
document.addEventListener("click", (ev) => {
  const c = ev.target.closest && ev.target.closest(".pathlist .pcell.g"); if (!c || c.classList.contains("done") || plusActive()) return;
  if (ev.target.closest("button[data-claim]")) return; /* "Prendi" ha gia' il suo gestore (97c) */
  if (ev.target.closest("button[data-golock]")) { v113Mark(); return; } /* la corona: Plus e' gia' aperto (97c) */
  ev.stopImmediatePropagation(); ev.preventDefault();
  const l = document.getElementById("pathList"); if (l) v113Y = l.scrollTop;
  openPlus("fila-oro", () => { if (plusActive()) openPath(); }); v113Mark();
}, true);
const _closeLayerV113 = closeLayer;
closeLayer = function (...a) {
  const pb = layer.querySelector(".plusbox[data-v113back]"); const back = pb && !plusActive() ? pb.dataset.v113back : null;
  const r = _closeLayerV113.apply(this, a);
  if (back != null && curSeason()) { try { openPath(); if (back !== "") setTimeout(() => { const l = document.getElementById("pathList"); if (l) l.scrollTop = +back; }, 60); } catch (e) { /* niente */ } }
  return r;
};

const V113_GOLD = { it: "Con Plus", en: "With Plus", de: "Mit Plus", es: "Con Plus", fr: "Avec Plus", pt: "Com Plus", ja: "Plus限定", ko: "Plus 전용",
  zh: "Plus 专享", zht: "Plus 專享", ru: "С Plus", pl: "Z Plus", nl: "Met Plus", tr: "Plus ile" };
const _openPathV113 = openPath;
openPath = function (...a) {
  const r = _openPathV113.apply(this, a);
  try {
    const box = layer.querySelector(".pathbox"); if (!box) return r;
    box.classList.toggle("v113sheen", ageAds() === "adult" && typeof gr20anim === "function" && gr20anim());
    const lbl = V113_GOLD[S.lang] || V113_GOLD.en;
    box.querySelectorAll(".pcell.g.lockg:not(.done) .plk").forEach((b) => {
      if (b.querySelector(".plkt")) return; b.insertAdjacentHTML("beforeend", `<span class="plkt" aria-hidden="true">${esc(lbl)}</span>`);
      /* il nome letto ad alta voce comincia con il testo che si vede ("Con Plus"), poi la spiegazione di prima */
      const al = b.getAttribute("aria-label"); if (al && !al.startsWith(lbl)) b.setAttribute("aria-label", `${lbl} – ${al}`);
    });
  } catch (e) { /* niente */ }
  return r;
};
