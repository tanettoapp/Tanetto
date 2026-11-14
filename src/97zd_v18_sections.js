/* =================== v18 (1.0.4): sezioni piu' chiare =================== */
/* ALTRO: prima era un elenco di 19 schede in ordine sparso (due schede per il compagno lontane tra loro,
   impostazioni mescolate a privacy e aiuto). Ora le schede sono raggruppate in 4 parti con un titolo,
   e in alto ci sono 4 scorciatoie per saltare subito alla parte giusta:
   1) Tu e il compagno: compagno, nome del compagno, il tuo nome, obiettivi, promemoria, scudi;
   2) Impostazioni: lingua, suoni e musica, aspetto, accessibilita';
   3) Account e dati: account e backup, i tuoi dati, privacy;
   4) Aiuto e idee: guida e informazioni, aiuto, "dimmi cosa ne pensi", invita un amico.
   "Ricomincia da capo" resta da solo in fondo. Il questionario (quando c'e') resta in alto, sotto Tanetto Plus.
   DIARIO: c'erano due schede con lo stesso titolo "Il tuo mese": quella col calendario ora si chiama "Calendario"
   ed e' subito sotto il resoconto del mese; l'ordine segue l'uso: domanda di oggi, settimana, mese, calendario, capsula. */
const V18S = {
  it: { g: ["Tu e il compagno", "Impostazioni", "Account e dati", "Aiuto e idee"], s: ["Compagno", "Impostazioni", "Account", "Aiuto"], cal: "Calendario" },
  en: { g: ["You and your companion", "Settings", "Account and data", "Help and ideas"], s: ["Companion", "Settings", "Account", "Help"], cal: "Calendar" },
  de: { g: ["Du und dein Begleiter", "Einstellungen", "Konto und Daten", "Hilfe und Ideen"], s: ["Begleiter", "Einstellungen", "Konto", "Hilfe"], cal: "Kalender" },
  es: { g: ["Tú y tu compañero", "Ajustes", "Cuenta y datos", "Ayuda e ideas"], s: ["Compañero", "Ajustes", "Cuenta", "Ayuda"], cal: "Calendario" },
  fr: { g: ["Toi et ton compagnon", "Réglages", "Compte et données", "Aide et idées"], s: ["Compagnon", "Réglages", "Compte", "Aide"], cal: "Calendrier" },
  pt: { g: ["Você e seu companheiro", "Configurações", "Conta e dados", "Ajuda e ideias"], s: ["Companheiro", "Configurações", "Conta", "Ajuda"], cal: "Calendário" },
  ja: { g: ["あなたとパートナー", "設定", "アカウントとデータ", "ヘルプとアイデア"], s: ["パートナー", "設定", "アカウント", "ヘルプ"], cal: "カレンダー" },
  ko: { g: ["나와 친구", "설정", "계정 및 데이터", "도움말과 아이디어"], s: ["친구", "설정", "계정", "도움말"], cal: "달력" },
  zh: { g: ["你和小伙伴", "设置", "账号与数据", "帮助与建议"], s: ["小伙伴", "设置", "账号", "帮助"], cal: "日历" },
  zht: { g: ["你和小夥伴", "設定", "帳號與資料", "幫助與建議"], s: ["小夥伴", "設定", "帳號", "幫助"], cal: "日曆" },
  ru: { g: ["Ты и твой питомец", "Настройки", "Аккаунт и данные", "Помощь и идеи"], s: ["Питомец", "Настройки", "Аккаунт", "Помощь"], cal: "Календарь" },
  pl: { g: ["Ty i twój towarzysz", "Ustawienia", "Konto i dane", "Pomoc i pomysły"], s: ["Towarzysz", "Ustawienia", "Konto", "Pomoc"], cal: "Kalendarz" },
  nl: { g: ["Jij en je maatje", "Instellingen", "Account en gegevens", "Hulp en ideeën"], s: ["Maatje", "Instellingen", "Account", "Hulp"], cal: "Kalender" },
  tr: { g: ["Sen ve arkadaşın", "Ayarlar", "Hesap ve veriler", "Yardım ve fikirler"], s: ["Arkadaşın", "Ayarlar", "Hesap", "Yardım"], cal: "Takvim" }
};
const v18s = () => V18S[S.lang] || V18S.en;
/* riconoscere ogni scheda da cio' che contiene (non dal testo, che cambia con la lingua) */
function moreKind(el) {
  const q = (s) => el.matches(s) || !!el.querySelector(s); const c = el.classList;
  if (c.contains("pluscard") || el.id === "plusCard") return "plus";
  if (el.tagName === "H1") return "title";
  if (c.contains("note")) return "note";
  if (c.contains("svcard")) return "survey";
  if (c.contains("petcard")) return "pet";
  if (q("#rename")) return "rename";
  if (el.id === "nameSet" || c.contains("nameset")) return "uname";
  if (el.id === "goalsCard" || q("#saveGoals")) return "goals";
  if (c.contains("remcard")) return "rem";
  if (c.contains("shcard")) return "shields";
  if (q("#langSel2")) return "lang";
  if (q("#sfxSw")) return "sound";
  if (q("[data-theme-set]")) return "theme";
  if (q("#bigSw") || q("#liteSw") || q("#calmSw")) return "access";
  if (c.contains("accard")) return "account";
  if (q("#bkSave")) return "data";
  const h = el.querySelector("h3"); if (h && h.textContent.trim() === L().privT) return "privacy";
  if (q("[data-doc]") || q("#tutAgain")) return "guide";
  if (c.contains("help")) return "help";
  if (q('a[href^="mailto:"]')) return "feedback";
  if (c.contains("invcard")) return "invite";
  if (q("#reset") || q("#resetYes")) return "reset";
  return "other";
}
const MORE_GROUPS = [["pet", "rename", "uname", "goals", "rem", "shields"], ["lang", "sound", "theme", "access"], ["account", "data", "privacy"], ["guide", "help", "feedback", "invite"]];
const _viewMoreV18s = viewMore;
let moreMemo = ["", ""], diaryMemo = ["", ""]; /* se la pagina di partenza e' la stessa, il riordino non si rifa' */
viewMore = function () {
  const h = _viewMoreV18s(); if (moreMemo[0] === h) return moreMemo[1]; const tpl = document.createElement("template"); tpl.innerHTML = h;
  const st = tpl.content.querySelector(".stack.pmore") || tpl.content.querySelector(".stack"); if (!st) return h;
  const t = v18s(); const kids = [...st.children]; const by = {}; const other = [];
  kids.forEach((el) => { const k = moreKind(el); if (k === "other") other.push(el); else (by[k] = by[k] || []).push(el); });
  const take = (k) => { const a = by[k] || []; delete by[k]; return a; };
  const out = [].concat(take("title"), take("plus"));
  /* scorciatoie verso i gruppi */
  const jump = document.createElement("div"); jump.className = "mjump venter"; jump.setAttribute("role", "navigation");
  jump.innerHTML = t.s.map((s, i) => `<button class="chip mjb" data-mjump="${i}">${esc(s)}</button>`).join(""); out.push(jump);
  out.push(...take("survey"));
  MORE_GROUPS.forEach((g, i) => {
    const cards = [].concat(...g.map(take)); if (!cards.length) return;
    const hd = document.createElement("h2"); hd.className = "mgrp venter"; hd.id = "mgrp" + i; hd.textContent = t.g[i]; out.push(hd, ...cards);
  });
  /* il nome del compagno: titolo piu' chiaro ("Nome del compagno" invece di "Compagno") */
  const rn = out.find((el) => el.querySelector && el.querySelector("#rename")); if (rn) { const h3 = rn.querySelector("h3"); if (h3) h3.textContent = L().nameL; }
  const reset = take("reset"), note = take("note");
  out.push(...other, ...Object.values(by).flat(), ...reset, ...note);
  st.replaceChildren(...out.filter(Boolean));
  moreMemo = [h, tpl.innerHTML]; return moreMemo[1];
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button[data-mjump]"); if (!b) return;
  ev.stopImmediatePropagation(); const g = document.getElementById("mgrp" + b.dataset.mjump); if (!g) return;
  SND.play("click");
  /* le schede lontane vengono disegnate solo quando servono: prima di saltare si misurano davvero, cosi' si arriva nel punto giusto */
  const box = g.parentElement; if (box) box.classList.add("mjumping");
  const go = (smooth) => { const y = g.getBoundingClientRect().top + window.scrollY - 12; window.scrollTo({ top: Math.max(0, y), behavior: smooth ? "smooth" : "auto" }); };
  go(anim);
  setTimeout(() => { const off = g.getBoundingClientRect().top - 12; if (Math.abs(off) > 3) go(false); if (box) box.classList.remove("mjumping"); }, anim ? 750 : 60);
}, true);

/* --- Diario: ordine per uso e niente titoli doppi --- */
function diaryKind(el) {
  const q = (s) => el.matches(s) || !!el.querySelector(s);
  if (el.tagName === "H1") return "title";
  if (q("#line")) return "question";
  if (q("#makeWeek")) return "week";
  if (el.classList.contains("repcard")) return "month";
  if (q(".cal")) return "cal";
  if (el.classList.contains("capsule")) return "capsule";
  return "rest";
}
const _viewDiaryV18s = typeof viewDiary === "function" ? viewDiary : null;
if (_viewDiaryV18s) {
  viewDiary = function () {
    const h = _viewDiaryV18s(); if (diaryMemo[0] === h) return diaryMemo[1]; const tpl = document.createElement("template"); tpl.innerHTML = h;
    const st = tpl.content.querySelector(".stack"); if (!st) return h;
    const by = { title: [], question: [], week: [], month: [], cal: [], capsule: [], rest: [] };
    [...st.children].forEach((el) => by[diaryKind(el)].push(el));
    by.cal.forEach((el) => { const h3 = el.querySelector("h3"); if (h3) h3.textContent = v18s().cal; });
    st.replaceChildren(...by.title, ...by.question, ...by.week, ...by.month, ...by.cal, ...by.capsule, ...by.rest);
    diaryMemo = [h, tpl.innerHTML]; return diaryMemo[1];
  };
}
