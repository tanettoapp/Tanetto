/* ===== 1.0.6 — ordine delle schermate, scheda profilo in Altro, schermata Fondatore =====
   Oggi: dopo gli obiettivi vengono prima le cose da sistemare una volta (nome, promemoria) e quelle da ritirare,
   poi la stagione e la sfida (che crescono con gli obiettivi), poi il regalo di domani, i contatori e il resto.
   Altro: in cima una scheda con il compagno, il livello, l'album e (per chi lo ha) il distintivo Fondatore,
   che si tocca e apre una schermata tutta sua. */
const V19L = {
  it: { album: "Album", albumL: (a, b) => `${a}/${b} cartoline`, level: "Livello", fdT: "Fondatore di Tanetto", fdWhy: "I Fondatori sono le prime persone che hanno scelto Tanetto. Grazie di esserci fin dall'inizio.", fdPlace: "Metti la lanterna nella stanza", fdPlaced: "La lanterna d'oro è nella tua stanza", fdOpen: "Apri la schermata Fondatore" },
  en: { album: "Album", albumL: (a, b) => `${a}/${b} postcards`, level: "Level", fdT: "Tanetto Founder", fdWhy: "Founders are the very first people who chose Tanetto. Thank you for being here from the start.", fdPlace: "Put the lantern in your room", fdPlaced: "The golden lantern is in your room", fdOpen: "Open the Founder screen" },
  de: { album: "Album", albumL: (a, b) => `${a}/${b} Postkarten`, level: "Level", fdT: "Tanetto-Gründer", fdWhy: "Gründer sind die allerersten Menschen, die sich für Tanetto entschieden haben. Danke, dass du von Anfang an dabei bist.", fdPlace: "Laterne ins Zimmer stellen", fdPlaced: "Die goldene Laterne steht in deinem Zimmer", fdOpen: "Gründer-Seite öffnen" },
  es: { album: "Álbum", albumL: (a, b) => `${a}/${b} postales`, level: "Nivel", fdT: "Fundador de Tanetto", fdWhy: "Los Fundadores son las primeras personas que eligieron Tanetto. Gracias por estar aquí desde el principio.", fdPlace: "Poner la linterna en la habitación", fdPlaced: "La linterna dorada está en tu habitación", fdOpen: "Abrir la pantalla de Fundador" },
  fr: { album: "Album", albumL: (a, b) => `${a}/${b} cartes postales`, level: "Niveau", fdT: "Fondateur de Tanetto", fdWhy: "Les Fondateurs sont les toutes premières personnes à avoir choisi Tanetto. Merci d'être là depuis le début.", fdPlace: "Mettre la lanterne dans la chambre", fdPlaced: "La lanterne dorée est dans ta chambre", fdOpen: "Ouvrir l'écran Fondateur" },
  pt: { album: "Álbum", albumL: (a, b) => `${a}/${b} postais`, level: "Nível", fdT: "Fundador do Tanetto", fdWhy: "Os Fundadores são as primeiras pessoas que escolheram o Tanetto. Obrigado por estar aqui desde o começo.", fdPlace: "Colocar a lanterna no quarto", fdPlaced: "A lanterna dourada está no seu quarto", fdOpen: "Abrir a tela de Fundador" },
  ja: { album: "アルバム", albumL: (a, b) => `ポストカード ${a}/${b}`, level: "レベル", fdT: "Tanetto ファウンダー", fdWhy: "ファウンダーは、いちばん最初に Tanetto を選んでくれた人たちです。はじめからいてくれて、ありがとう。", fdPlace: "ランタンを部屋に置く", fdPlaced: "金のランタンはお部屋にあります", fdOpen: "ファウンダーの画面を開く" },
  ko: { album: "앨범", albumL: (a, b) => `엽서 ${a}/${b}`, level: "레벨", fdT: "Tanetto 창립 멤버", fdWhy: "창립 멤버는 가장 먼저 Tanetto를 선택해 준 사람들이에요. 처음부터 함께해 줘서 고마워요.", fdPlace: "랜턴을 방에 두기", fdPlaced: "황금 랜턴이 방에 있어요", fdOpen: "창립 멤버 화면 열기" },
  zh: { album: "相册", albumL: (a, b) => `明信片 ${a}/${b}`, level: "等级", fdT: "Tanetto 创始成员", fdWhy: "创始成员是最早选择 Tanetto 的人。谢谢你从一开始就在这里。", fdPlace: "把灯笼放进房间", fdPlaced: "金灯笼已经在你的房间里了", fdOpen: "打开创始成员页面" },
  zht: { album: "相簿", albumL: (a, b) => `明信片 ${a}/${b}`, level: "等級", fdT: "Tanetto 創始成員", fdWhy: "創始成員是最早選擇 Tanetto 的人。謝謝你從一開始就在這裡。", fdPlace: "把燈籠放進房間", fdPlaced: "金燈籠已經在你的房間裡了", fdOpen: "打開創始成員頁面" },
  ru: { album: "Альбом", albumL: (a, b) => `Открытки: ${a}/${b}`, level: "Уровень", fdT: "Основатель Tanetto", fdWhy: "Основатели — самые первые люди, которые выбрали Tanetto. Спасибо, что ты с нами с самого начала.", fdPlace: "Поставить фонарик в комнату", fdPlaced: "Золотой фонарик уже в твоей комнате", fdOpen: "Открыть экран основателя" },
  pl: { album: "Album", albumL: (a, b) => `Pocztówki: ${a}/${b}`, level: "Poziom", fdT: "Założyciel Tanetto", fdWhy: "Założyciele to pierwsze osoby, które wybrały Tanetto. Dziękujemy, że jesteś z nami od początku.", fdPlace: "Postaw latarenkę w pokoju", fdPlaced: "Złota latarenka stoi w twoim pokoju", fdOpen: "Otwórz ekran założyciela" },
  nl: { album: "Album", albumL: (a, b) => `${a}/${b} ansichtkaarten`, level: "Niveau", fdT: "Tanetto-oprichter", fdWhy: "Oprichters zijn de allereerste mensen die voor Tanetto kozen. Dank je dat je er vanaf het begin bij bent.", fdPlace: "Zet de lantaarn in je kamer", fdPlaced: "De gouden lantaarn staat in je kamer", fdOpen: "Oprichtersscherm openen" },
  tr: { album: "Albüm", albumL: (a, b) => `${a}/${b} kartpostal`, level: "Seviye", fdT: "Tanetto Kurucusu", fdWhy: "Kurucular, Tanetto'yu ilk seçen kişilerdir. En başından beri burada olduğun için teşekkürler.", fdPlace: "Feneri odaya koy", fdPlaced: "Altın fener odanda", fdOpen: "Kurucu ekranını aç" }
};
const v19l = () => V19L[S.lang] || V19L.en;
const isFounder = () => S.owned.includes("founder_lantern");

/* --- Oggi: riordino dei blocchi dopo il titolo degli obiettivi --- */
const TODAY_W = [["sec", 0], ["goals", 1], ["iossafe", 2], ["row", 3], ["namecard", 5], ["remcard", 6], ["seacard", 7], ["chcard", 8], ["teaser", 9], ["event", 10], ["festa", 11], ["meters2", 12], ["svcard", 13], ["nudgecard", 14], ["note", 99]];
function todayWeight(el) {
  const c = el.classList; if (!c) return 50;
  if (c.contains("seacard") && el.querySelector("em")) return 4; /* premi da ritirare: subito dopo gli obiettivi */
  if (c.contains("chcard") && el.querySelector("#claimWeek, .claim, button.btn.gold")) return 4.5;
  for (const [k, w] of TODAY_W) if (c.contains(k)) return w;
  return 50;
}
const _viewTodayV19 = viewToday;
let todayMemo = ["", ""];
/* si analizza solo la parte dopo il titolo degli obiettivi (piccola), non la stanza disegnata: niente rallentamenti */
viewToday = function () {
  const h = _viewTodayV19(); if (!S.pet) return h; if (todayMemo[0] === h) return todayMemo[1];
  const i0 = h.indexOf('<div class="sec">'); const iEnd = h.lastIndexOf("</div>");
  if (i0 < 0 || iEnd < i0) return h;
  const tpl = document.createElement("template"); tpl.innerHTML = h.slice(i0, iEnd);
  const kids = [...tpl.content.children]; if (!kids.length) return h;
  const tail = kids.map((el, i) => [el, todayWeight(el), i]); tail.sort((a, b) => a[1] - b[1] || a[2] - b[2]);
  const out = h.slice(0, i0) + tail.map((x) => x[0].outerHTML).join("") + h.slice(iEnd);
  todayMemo = [h, out]; return out;
};

/* --- Altro: scheda profilo in cima (compagno, livello, album, Fondatore) --- */
function albumCount() { return typeof albumStats === "function" ? albumStats() : null; }
function profileCard() {
  const t = v19l(); const a = albumCount();
  return `<div class="card profcard venter"><div class="pfrow"><span class="pfpet" aria-hidden="true">${petSVG(S.pet, "felice", S.hat, stage(), "")}</span><div class="pftx"><h2>${esc(S.petName)}</h2>${a ? `<p class="small muted">${esc(t.albumL(a.have, a.total))}</p>` : ""}</div></div>
    <div class="pfbtns"><button class="pfb" id="pfLevel" type="button">${STAR}<span>${esc(t.level)} ${S.level}</span></button>${a ? `<button class="pfb" id="pfAlbum" type="button">${icon("card")}<span>${esc(t.album)}</span></button>` : ""}${isFounder() ? `<button class="pfb pffound" id="pfFounder" type="button" aria-label="${esc(t.fdOpen)}">${icon("p_star")}<span>${esc(L().season.founder)}</span></button>` : ""}</div></div>`;
}
const _viewMoreV19 = viewMore;
let moreMemoV19 = ["", ""];
viewMore = function () {
  const h0 = _viewMoreV19(); if (!S.pet) return h0; const key = h0 + "|" + S.level + (typeof albumStats === "function" ? JSON.stringify(albumStats()) : "");
  if (moreMemoV19[0] === key) return moreMemoV19[1];
  const out = moreDecorate(h0); moreMemoV19 = [key, out]; return out;
};
function moreDecorate(h) {
  h = h.replace(/<div class="founderbadge">[\s\S]*?<\/div>/, "");
  const tpl = document.createElement("template"); tpl.innerHTML = h;
  const st = tpl.content.querySelector(".stack"); if (!st) return h;
  const title = st.querySelector("h1"); const tmp = document.createElement("template"); tmp.innerHTML = profileCard();
  const card = tmp.content.firstElementChild;
  if (title && title.parentElement === st) title.after(card); else st.prepend(card);
  return tpl.innerHTML;
}

/* --- Schermata Fondatore --- */
function founderScreen() {
  try { G.killTweensOf(layer.querySelectorAll(".rays, .fdart")); } catch (e) { /* niente */ }
  const t = v19l(); const se = L().season; const placed = S.furn.includes("founder_lantern");
  const sname = (se.names && se.names.lanterns) || "";
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="fdT"><div class="box card fdbox"><div class="rays" aria-hidden="true"></div>
    <div class="fdart" aria-hidden="true">${itemArt("founder_lantern")}</div>
    <div class="fdbadge">${icon("p_star")}<span>${esc(sname)} · 2026</span></div>
    <h2 id="fdT">${esc(t.fdT)}</h2><p>${esc(se.founderP)}</p><p class="small muted">${esc(t.fdWhy)}</p>
    ${placed ? `<p class="small okline">${icon("check")} ${esc(t.fdPlaced)}</p><button class="btn" id="closeLayer">${esc(L().ok)}</button>` : `<button class="btn" id="fdPlace">${esc(t.fdPlace)}</button><button class="btn ghost" id="closeLayer">${esc(L().close)}</button>`}</div></div>`;
  SND.play("sparkle");
  if (anim) { G.from(".fdbox", { scale: 0.85, opacity: 0, duration: 0.45, ease: "back.out(1.8)" }); G.to(".fdbox .rays", { rotation: 360, duration: 24, repeat: -1, ease: "none" }); G.from(".fdart", { y: -16, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }); }
}

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "pfLevel") { ev.stopImmediatePropagation(); levelSheet(); return; }
  if (b.id === "pfAlbum") { ev.stopImmediatePropagation(); if (typeof openAlbum === "function") openAlbum(); return; }
  if (b.id === "pfFounder") { ev.stopImmediatePropagation(); founderScreen(); return; }
  if (b.id === "fdPlace") { ev.stopImmediatePropagation(); S.furn = withItem(S.furn, "founder_lantern"); save(); SND.play("coin"); toast(v19l().fdPlaced); founderScreen(); render(); return; }
}, true);
