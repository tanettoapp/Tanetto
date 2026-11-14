/* =================== v13e: suono del logo e musica gia' accesa all'apertura =================== */
/* 1.0.9: per chi installa adesso la musica parte SPENTA (suoni delle spunte e dei premi accesi); si accende dal
   pulsante della musica o in Profilo. Chi usava gia' l'app tiene la sua scelta (niente piu' "accesa per tutti una volta"). */
if (!S.musicDef) { S.musicDef = 1; save(); }
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("button"); if (b && (b.id === "musicBtn" || b.id === "musSw")) S.musicDef = 2; }, true);

/* I browser fanno partire i suoni solo dopo il primo tocco; nell'app Android partono subito */
function audioReady() { try { const c = SND.unlock(); return !!c && c.state === "running"; } catch (e) { return false; } }
function startMusicNow() { if (S.music && !SND.playing()) SND.musicOn(phase() === "night" ? 3 : S.track); }

const _splashV13e = splash;
/* Logo all'apertura: ogni volta che si apre l'app (non nei ricaricamenti interni, es. modalita' leggera) */
function staticSplash() {
  const t = L(); const d = document.createElement("div"); d.className = "splash v9 still";
  d.innerHTML = `<div class="spglow"></div><div class="splogo">${ICON_BIG}</div><div class="spname">Tanetto</div><div class="sptag">${esc(t.tagline || "")}</div>`;
  document.body.appendChild(d); const end = () => { d.classList.add("out"); setTimeout(() => d.remove(), 400); };
  const tm = setTimeout(end, 1500); d.addEventListener("click", () => { clearTimeout(tm); end(); });
}
splash = function () {
  let ss = null, one = false;
  try { ss = sessionStorage.getItem("splash"); one = sessionStorage.getItem("tanetto-nosplash") === "1"; sessionStorage.removeItem("tanetto-nosplash"); } catch (e) { /* niente */ }
  const show = !ss && !one;
  if (show) { if (anim) _splashV13e(); else staticSplash(); try { sessionStorage.removeItem("splash"); } catch (e) { /* niente */ } }
  if (!show || !document.querySelector(".splash")) { setTimeout(() => { if (audioReady()) startMusicNow(); }, 300); return; }
  if (audioReady()) { SND.play("logo"); setTimeout(startMusicNow, 1700); return; }
  /* nei browser il suono parte solo dopo un tocco: se si tocca il logo, suona */
  const once = () => { document.removeEventListener("pointerdown", once, true); if (document.querySelector(".splash")) SND.play("logo"); };
  document.addEventListener("pointerdown", once, true);
  setTimeout(() => document.removeEventListener("pointerdown", once, true), 4000);
};
