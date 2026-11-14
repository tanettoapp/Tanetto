/* ==========================================================================
   v20 (1.0.8) 98y_v20_devices: segni per l'impaginazione su schermi diversi.
   Non cambia nulla del contenuto: dice solo al CSS (11y_v20_devices.css) che tipo
   di pagina è aperta, perché le WebView vecchie (Chrome < 105) non hanno :has().
     html[data-dvl="room"]  la pagina comincia con la stanza (Casa, Negozio)
     html[data-dvl="list"]  le altre pagine
     html[data-dvl="full"]  schermo intero
     --dvn                  quante righe servono alla colonna di destra
   Niente attributi sugli elementi della pagina: il confronto di render() (97s_perf) li toglierebbe;
   il CSS trova la stanza da solo (#app > .stack > .roomwrap / #room).
   Nessun timer, nessuna animazione: un MutationObserver su #app (solo i figli diretti),
   uno sulla pila della pagina e uno sulla barra in basso; un ResizeObserver sulla stanza
   solo quando è affiancata (orizzontale largo). Le correzioni per i caratteri grandi:
     --dvtabf   i nomi della barra in basso un po' più piccoli se non ci stanno
     --dvroomw  la stanza affiancata più stretta, così stanza + fumetto + azioni stanno nello schermo
     data-dvns  se nemmeno così ci stanno, la stanza scorre con la pagina invece di restare ferma
   ========================================================================== */
(function dvInit() {
  const app = document.getElementById("app"); if (!app || !window.MutationObserver) return;
  const root = document.documentElement;
  let stackObs = null, lastStack = null, dvPending = 0, dvReady = false;
  function dvMark() {
    try {
      const st = app.querySelector(":scope > .stack");
      if (st !== lastStack) {
        if (stackObs) stackObs.disconnect();
        lastStack = st;
        if (st) { stackObs = stackObs || new MutationObserver(dvMark); stackObs.observe(st, { childList: true }); }
      }
      const isFull = typeof full !== "undefined" && full && !!document.getElementById("fullwrap");
      let room = null;
      if (st && !isFull) {
        for (const c of st.children) {
          if ((c.classList.contains("roomwrap") && !c.classList.contains("full")) || (c.id === "room" && c.classList.contains("room"))) { room = c; break; }
        }
      }
      const kind = isFull ? "full" : room ? "room" : "list";
      if (root.getAttribute("data-dvl") !== kind) root.setAttribute("data-dvl", kind);
      const n = st ? String(st.children.length + 1) : "14";
      if (root.style.getPropertyValue("--dvn") !== n) root.style.setProperty("--dvn", n);
    } catch (e) { /* mai bloccare l'app per l'impaginazione */ }
    if (dvReady) dvQueue();
  }
  new MutationObserver(dvMark).observe(app, { childList: true });
  dvMark();

  /* --- Caratteri di sistema grandi: la barra in basso e la colonna della stanza si adattano da sole ---
     Si misura sempre la versione "naturale" e si corregge nello stesso momento (niente sfarfallio,
     niente cicli): prima si tolgono le correzioni, si legge, poi si rimettono. */
  const wide = window.matchMedia ? window.matchMedia("(orientation: landscape) and (min-width: 560px)") : null;
  /* un nome è "a posto" se non va a capo a metà parola (anche in giapponese, coreano e cinese) e non esce dal suo pulsante */
  function dvBad(labels) {
    for (const s of labels) {
      const txt = (s.textContent || "").trim(); if (!txt || !s.parentElement) continue;
      const b = s.parentElement.getBoundingClientRect(); if (!b.width) continue;
      const rg = document.createRange(); rg.selectNodeContents(s);
      const tops = new Set(); let l = Infinity, r = -Infinity;
      for (const q of rg.getClientRects()) if (q.width > 1) { tops.add(Math.round(q.top)); l = Math.min(l, q.left); r = Math.max(r, q.right); }
      if (tops.size > txt.split(/\s+/).length) return true;
      if (l < b.left - 1 || r > b.right + 1) return true;
    }
    return false;
  }
  /* rimpicciolisce un po' i nomi di un gruppo di pulsanti finché la parola più lunga ci sta.
     Mai sotto 10 px (con i caratteri di sistema grandi resta comunque più grande del normale) */
  function dvFit(labels, cssVar, measureAttr, rowOf) {
    root.style.removeProperty(cssVar);
    const fs = parseFloat(getComputedStyle(labels[0]).fontSize) || 12;
    const fmin = Math.min(1, Math.max(0.5, 10 / fs));
    root.setAttribute(measureAttr, "1");
    let f = 1;
    for (const s of labels) {
      const bt = s.parentElement; const cs = getComputedStyle(bt); if (!bt.clientWidth) continue;
      let avail = bt.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - 2;
      if (rowOf && cs.flexDirection === "row") { const ic = rowOf(bt); avail -= (ic ? ic.getBoundingClientRect().width : 0) + (parseFloat(cs.columnGap) || 0); }
      const need = s.getBoundingClientRect().width;
      if (need > avail && avail > 0) f = Math.min(f, avail / need);
    }
    root.removeAttribute(measureAttr);
    f = f < 0.995 ? Math.max(fmin, Math.floor(f * 50) / 50) : 1;
    if (f < 1) root.style.setProperty(cssVar, String(f));
    /* verifica nella disposizione vera e, se serve, ancora un po' più piccolo */
    for (let i = 0; i < 12 && f > fmin && dvBad(labels); i++) { f = Math.max(fmin, Math.round((f - 0.04) * 100) / 100); root.style.setProperty(cssVar, String(f)); }
    return { f, ok: !dvBad(labels) };
  }
  let tabKey = "", actKey = "";
  function dvFitTabs() {
    const nav = document.getElementById("tabsIn"); if (!nav) return;
    const labels = [...nav.querySelectorAll(".tab > span:not(.ic)")]; if (!labels.length) return;
    const key = innerWidth + "x" + innerHeight + "|" + nav.textContent + "|" + getComputedStyle(nav).fontSize + "|" + getComputedStyle(labels[0].parentElement).fontSize;
    if (key === tabKey) return; tabKey = key;
    root.removeAttribute("data-dvtcol");
    const r = dvFit(labels, "--dvtabf", "data-dvtm", (bt) => bt.querySelector(".ic"));
    /* orizzontale basso (icona e nome affiancati): se i nomi non ci stanno bene, icona sopra e nome sotto */
    if ((!r.ok || r.f < 0.8) && getComputedStyle(labels[0].parentElement).flexDirection === "row") {
      root.setAttribute("data-dvtcol", "1"); dvFit(labels, "--dvtabf", "data-dvtm", null);
    }
  }
  function dvFitActs() {
    const box = app.querySelector(".actions");
    const labels = box ? [...box.querySelectorAll(":scope > .act > span:not(.aci)")] : [];
    if (!labels.length) { actKey = ""; return; }
    const key = Math.round(box.getBoundingClientRect().width) + "|" + box.textContent + "|" + getComputedStyle(box).fontSize + "|" + (root.getAttribute("data-dvact3") || "");
    if (key === actKey) return;
    root.removeAttribute("data-dvact3");
    let r = dvFit(labels, "--dvactf", "data-dvam", null);
    /* parole lunghe (es. "Atıştırmalık") su schermi stretti: 3 per fila invece di 5 */
    if (!r.ok) { root.setAttribute("data-dvact3", "1"); r = dvFit(labels, "--dvactf", "data-dvam", null); }
    else if (labels.length === 5) {
      /* caratteri grandi: la griglia da sola fa 3 + 2 o 4 + 1, allineate a sinistra; meglio 3 + 2 con la seconda fila centrata */
      const cols = (getComputedStyle(box).gridTemplateColumns || "").split(" ").filter(Boolean).length;
      if (cols === 3 || cols === 4) root.setAttribute("data-dvact3", "1");
    }
    actKey = Math.round(box.getBoundingClientRect().width) + "|" + box.textContent + "|" + getComputedStyle(box).fontSize + "|" + (root.getAttribute("data-dvact3") || "");
  }
  let roomRO = null, roomEl = null, roomMin = { key: "", w: 0 };
  function dvFitRoom() {
    const st = app.querySelector(":scope > .stack");
    let rw = null;
    if (st && wide && wide.matches && root.getAttribute("data-dvl") === "room") for (const c of st.children) { if (c.classList.contains("roomwrap") && !c.classList.contains("full")) { rw = c; break; } }
    if (rw !== roomEl) { if (roomRO) roomRO.disconnect(); roomEl = rw; if (rw && window.ResizeObserver) { roomRO = roomRO || new ResizeObserver(() => dvQueue()); roomRO.observe(rw); } }
    root.style.removeProperty("--dvroomw"); root.removeAttribute("data-dvns");
    if (!rw) return;
    const room = rw.querySelector(":scope > .room"); if (!room || !room.offsetHeight) return;
    if (getComputedStyle(rw).position !== "sticky") return; // orizzontale basso: scorre già con la pagina
    /* misure di impaginazione (offset*): non cambiano con le piccole animazioni della stanza */
    const tabs = document.querySelector(".tabs");
    const tabH = tabs && getComputedStyle(tabs).display !== "none" ? tabs.offsetHeight : 0;
    const top = parseFloat(getComputedStyle(rw).top) || 0;
    /* tutto visibile già a pagina ferma in cima (la stanza parte sotto la barra con nome e Tanì) */
    const docTop = rw.parentElement.getBoundingClientRect().top + (window.scrollY || 0);
    const avail = window.innerHeight - tabH - Math.max(top, docTop) - 8;
    const colW = rw.parentElement.offsetWidth;
    const key = innerWidth + "x" + innerHeight + "|" + getComputedStyle(rw).fontSize + "|" + (root.getAttribute("data-dvact3") || "");
    if (roomMin.key !== key) roomMin = { key, w: 0 };
    /* non ci sta nemmeno rimpicciolita: la colonna scorre con la pagina (larghezza come prima, niente salti) */
    const dvNoStick = () => { if (roomMin.w) root.style.setProperty("--dvroomw", roomMin.w + "px"); else root.style.removeProperty("--dvroomw"); root.setAttribute("data-dvns", "1"); };
    let w = 0;
    for (let i = 0; i < 4; i++) {
      const h = rw.offsetHeight, rh = room.offsetHeight;
      if (h <= avail + 1) break;
      w = Math.floor((rh - (h - avail)) * (room.offsetWidth / rh));
      if (w < Math.max(300, colW * 0.22)) { dvNoStick(); return; }
      root.style.setProperty("--dvroomw", w + "px");
    }
    if (rw.offsetHeight > avail + 1) { dvNoStick(); return; }
    /* stabile: quando il fumetto cambia (frase più corta o più lunga) la stanza non cambia grandezza ogni volta,
       resta la più piccola già servita con questa finestra e questi caratteri */
    if (w) roomMin.w = roomMin.w ? Math.min(roomMin.w, w) : w;
    if (roomMin.w && roomMin.w < rw.offsetWidth - 1) root.style.setProperty("--dvroomw", roomMin.w + "px");
  }
  function dvQueue() {
    if (dvPending) return;
    dvPending = requestAnimationFrame(() => { dvPending = 0; try { dvFitTabs(); dvFitActs(); dvFitRoom(); dvFitActs(); } catch (e) { /* mai bloccare l'app */ } });
  }
  const nav = document.getElementById("tabsIn");
  if (nav) new MutationObserver(dvQueue).observe(nav, { childList: true });
  /* la barra cambia altezza se cambia la grandezza dei caratteri: si ricontrolla */
  if (nav && window.ResizeObserver) new ResizeObserver(() => dvQueue()).observe(nav);
  dvReady = true;
  window.addEventListener("resize", dvQueue);
  window.addEventListener("orientationchange", dvQueue);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(dvQueue, () => {});
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", dvQueue);
  window.__dvFit = dvQueue;
  dvQueue();
})();
