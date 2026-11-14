/* =================== v18 (1.0.4): tasto "indietro" del telefono =================== */
/* Nell'app Android il tasto indietro ora lo decide Tanetto:
   1) se e' aperta una finestra (gioco, negozio, foto...) la chiude;
   2) se si e' nello schermo intero o in un'altra scheda, torna alla home;
   3) nella home chiede "Vuoi davvero uscire?" con il compagno: "Resta" (pieno, in evidenza) ed "Esci" (neutro),
      due pulsanti della stessa grandezza. Un secondo "indietro" con la finestrella aperta la chiude (si resta). */
const V18B = {
  it: { t: "Vuoi davvero uscire?", p: (n) => `${n} ti aspetta qui, quando vuoi.`, stay: "Resta", exit: "Esci" },
  en: { t: "Do you really want to leave?", p: (n) => `${n} will be right here, waiting for you.`, stay: "Stay", exit: "Leave" },
  de: { t: "Willst du wirklich gehen?", p: (n) => `${n} wartet hier auf dich.`, stay: "Bleiben", exit: "Verlassen" },
  es: { t: "¿Seguro que quieres salir?", p: (n) => `${n} te espera aquí cuando quieras.`, stay: "Quedarme", exit: "Salir" },
  fr: { t: "Tu veux vraiment partir ?", p: (n) => `${n} t'attend ici, quand tu veux.`, stay: "Rester", exit: "Quitter" },
  pt: { t: "Quer mesmo sair?", p: (n) => `${n} vai ficar aqui esperando por você.`, stay: "Ficar", exit: "Sair" },
  ja: { t: "本当に終了しますか？", p: (n) => `${n}はここで待っているね。`, stay: "残る", exit: "終了する" },
  ko: { t: "정말 나갈까요?", p: () => "언제든 여기서 기다리고 있을게요.", stay: "머무르기", exit: "나가기" },
  zh: { t: "真的要离开吗？", p: (n) => `${n}会在这里等你哦。`, stay: "留下", exit: "离开" },
  zht: { t: "真的要離開嗎？", p: (n) => `${n}會在這裡等你喔。`, stay: "留下", exit: "離開" },
  ru: { t: "Точно хочешь выйти?", p: (n) => `${n} будет ждать тебя здесь.`, stay: "Остаться", exit: "Выйти" },
  pl: { t: "Na pewno chcesz wyjść?", p: (n) => `${n} będzie tu na ciebie czekać.`, stay: "Zostań", exit: "Wyjdź" },
  nl: { t: "Wil je echt weg?", p: (n) => `${n} wacht hier op je.`, stay: "Blijven", exit: "Afsluiten" },
  tr: { t: "Gerçekten çıkmak istiyor musun?", p: (n) => `${n} seni burada bekliyor olacak.`, stay: "Kal", exit: "Çık" }
};
const backPlugin = () => { try { const C = window.Capacitor; return (C.Plugins && C.Plugins.TanettoBack) || (C.registerPlugin ? C.registerPlugin("TanettoBack") : null); } catch (e) { return null; } };
function exitAsk() {
  const t = V18B[S.lang] || V18B.en; const pet = S.pet ? petSVG(S.pet, "amore", S.hat, stage(), S.petName) : "";
  const box = document.createElement("div"); box.id = "exitAsk"; box.className = "overlay exitask"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-labelledby", "exT");
  box.innerHTML = `<div class="box card exitbox">${pet ? `<div class="expet">${pet}</div>` : ""}<h2 id="exT">${esc(t.t)}</h2>${S.pet ? `<p class="small muted">${esc(t.p(S.petName))}</p>` : ""}<div class="exbtns"><button class="btn exstay" id="exStay">${esc(t.stay)}</button><button class="btn exleave" id="exLeave">${esc(t.exit)}</button></div></div>`;
  document.body.appendChild(box); SND.haptic(8);
  if (anim) { G.from(box.querySelector(".exitbox"), { y: 24, scale: 0.94, opacity: 0, duration: 0.32, ease: "back.out(1.8)" }); const pe = box.querySelector(".expet"); if (pe) G.fromTo(pe, { rotation: -6 }, { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut", transformOrigin: "50% 90%" }); }
}
function exitClose() { const b = document.getElementById("exitAsk"); if (!b) return false; if (anim) { b.style.pointerEvents = "none"; G.to(b, { opacity: 0, duration: 0.18, onComplete: () => b.remove() }); } else b.remove(); return true; }
function exitLeave() { const p = backPlugin(); exitClose(); if (p && p.exitApp) { try { const r = p.exitApp(); if (r && r.catch) r.catch(() => {}); } catch (e) { /* niente */ } } }
/* Cosa fa "indietro": prima chiude, poi torna alla home, solo alla fine chiede di uscire */
function backPress() {
  if (exitClose()) return "stay";
  if (document.querySelector(".tutwrap") && typeof tutClose === "function") { tutClose(true); return "tutorial"; }
  if (layer.innerHTML) { const c = layer.querySelector("#closeGame, #closeLayer, #fdOk, #wgOk, #closeLetter, #storyOk"); if (c) c.click(); else closeLayer(); return "layer"; }
  if (typeof full !== "undefined" && full) { const fc = document.getElementById("fullClose"); if (fc) fc.click(); else closeFull(); return "full"; }
  if (story) { const so = document.getElementById("storyOk"); if (so) { so.click(); return "story"; } }
  if (S.pet && tab !== "today") { const b = document.querySelector('#tabsIn button.tab[data-tab="today"]'); if (b) b.click(); else { tab = "today"; render(); } window.scrollTo(0, 0); return "home"; }
  exitAsk(); return "ask";
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "exStay") { ev.stopImmediatePropagation(); SND.play("click"); exitClose(); return; }
  if (b.id === "exLeave") { ev.stopImmediatePropagation(); exitLeave(); }
}, true);
document.addEventListener("click", (ev) => { const o = document.getElementById("exitAsk"); if (o && ev.target === o) exitClose(); });
(function v18back() {
  const p = backPlugin(); if (!isNativeApp() || !p || !p.addListener) return;
  try { const r = p.addListener("back", () => { try { backPress(); } catch (e) { /* niente */ } }); if (r && r.catch) r.catch(() => {}); } catch (e) { /* niente */ }
})();
