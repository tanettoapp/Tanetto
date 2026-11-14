/* v17 - Inizio piu' veloce: "Salta" in ogni passo e pochi obiettivi suggeriti (con "Vedi tutti") */
const ONB_SUG = ["water", "walk", "breathe", "stretch", "read", "fruit", "tidy", "sleep"];
const ONB_DEF = ["water", "walk", "breathe"];
const V17 = {
  it: ["Salta", "Ne bastano 3: eccone alcuni da cui partire. Potrai cambiarli quando vuoi.", "Vedi tutti gli obiettivi"],
  en: ["Skip", "3 is enough: here are a few to start with. You can change them anytime.", "See all goals"],
  de: ["Überspringen", "3 reichen: hier ein paar für den Anfang. Du kannst sie jederzeit ändern.", "Alle Ziele ansehen"],
  es: ["Saltar", "Con 3 basta: aquí tienes algunas para empezar. Puedes cambiarlas cuando quieras.", "Ver todas las metas"],
  fr: ["Passer", "3 suffisent : en voici quelques-uns pour commencer. Tu pourras les changer quand tu veux.", "Voir tous les objectifs"],
  pt: ["Pular", "3 já bastam: aqui estão algumas para começar. Você pode mudar quando quiser.", "Ver todas as metas"],
  ja: ["スキップ", "3つで十分です。まずはこの中から選んでみてね。いつでも変えられます。", "すべての目標を見る"],
  ko: ["건너뛰기", "3개면 충분해요. 먼저 이 중에서 골라 보세요. 언제든 바꿀 수 있어요.", "모든 목표 보기"],
  zh: ["跳过", "选 3 个就够了。先从这些开始吧，随时都可以更改。", "查看全部目标"],
  zht: ["略過", "選 3 個就夠了。先從這些開始吧，隨時都可以更改。", "查看全部目標"],
  ru: ["Пропустить", "Хватит и трёх. Вот несколько для начала — их можно поменять в любой момент.", "Все цели"],
  pl: ["Pomiń", "Wystarczą 3. Oto kilka na początek — możesz je zmienić w każdej chwili.", "Zobacz wszystkie cele"],
  nl: ["Overslaan", "Drie is genoeg. Hier zijn er een paar om mee te beginnen; je kunt ze altijd aanpassen.", "Alle doelen bekijken"],
  tr: ["Atla", "3 tane yeter. İşte başlamak için birkaç tane; istediğin zaman değiştirebilirsin.", "Tüm hedefleri gör"]
};
const v17 = (i) => (V17[S.lang] || V17.en)[i];
let onbAll = false;
const onbSugMode = () => !S.pet && S.onboard === 2 && !onbAll;

/* Nel passo degli obiettivi: solo i suggeriti (piu' quelli gia' scelti), il resto dietro "Vedi tutti" */
const _goalPickerV17 = goalPicker;
goalPicker = function (list) {
  if (!onbSugMode()) return _goalPickerV17(list);
  const ids = ONB_SUG.concat(list.filter((g) => !ONB_SUG.includes(g)));
  return `<div class="chips onbsug">${ids.map((g) => `<button class="chip" aria-pressed="${list.includes(g)}" data-goal="${esc(g)}">${esc(goalText(g))}</button>`).join("")}</div>
  <button class="link onball" id="onbAll" type="button">${esc(v17(2))}</button>`;
};

const _viewOnboardV17 = viewOnboard;
viewOnboard = function () {
  let h = _viewOnboardV17();
  if (S.pet || S.onboard > 2 || h.indexOf('class="steps"') < 0) return h; /* schermata di accesso: niente "Salta" */
  if (onbSugMode()) { const t = L(); h = h.replace(`<p class="muted">${t.goalsP}</p>`, `<p class="muted">${esc(v17(1))}</p>`); }
  return h.replace(/(<div class="steps" aria-hidden="true">.*?<\/div>)/, `<div class="onbtop">$1<button class="link small onbskip" id="onbSkip" type="button">${esc(v17(0))}</button></div>`);
};

document.addEventListener("click", (ev) => {
  const b = ev.target.closest("button"); if (!b) return;
  if (b.id === "onbAll") { ev.stopImmediatePropagation(); onbAll = true; SND.play("click"); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (b.id === "onbSkip") {
    ev.stopImmediatePropagation(); if (S.pet) return;
    const inp = document.getElementById("petName"); if (inp) draftName = inp.value.trim();
    if (typeof isPlusPet === "function" && isPlusPet(draftPet) && !plusActive()) draftPet = "germo";
    if (draftGoals.length < GOALS_MIN || draftGoals.length > GOALS_MAX) draftGoals = ONB_DEF.slice();
    try { trackOnce("onb-salta-" + S.onboard); } catch (e) { /* niente */ }
    S.onboard = 2; render();
    const st = document.getElementById("startApp"); if (st) st.click();
  }
}, true);

/* v17: nella pagina Altro (lunga) il telefono disegna solo le schede che si vedono; le altre quando ci arrivi */
const _viewMoreV17 = viewMore;
viewMore = function () { const h = _viewMoreV17(); return h.replace('<div class="stack">', '<div class="stack pmore">'); };
