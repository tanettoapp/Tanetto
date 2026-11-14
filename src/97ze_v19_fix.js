/* ===== 1.0.6 — intestazione più chiara =====
   1) Il saluto ("Buon pomeriggio, Miriam") si legge sempre per intero: la data va in una riga piccola sopra
      e il saluto, se è lungo, va a capo invece di essere tagliato con i puntini.
   2) Il nome del compagno in alto si tocca per cambiarlo.
   3) La stellina col numero è il livello: toccandola si apre una scheda che spiega cos'è, come si sale
      e cosa si sblocca dopo.
   4) Lo schermo intero della stanza c'è anche quando il compagno è in viaggio (stanza vuota + quando torna). */
const V19 = {
  it: { renT: "Il nome del compagno", renL: "Nome", renHint: "Da 1 a 16 caratteri.", save: "Salva", cancel: "Annulla", renA11y: (n) => `${n}: tocca per cambiare nome`,
    lvT: "Il tuo livello", lvWhat: "Sale con le tue buone abitudini e sblocca nuovi viaggi, mondi e sorprese.", lvPts: (a, b) => `${a} / ${b} punti`, lvLeft: (n) => n === 1 ? "Manca 1 punto al prossimo livello" : `Mancano ${n} punti al prossimo livello`,
    lvHow: "Come si guadagnano punti", lvGoal: "+10 per ogni obiettivo fatto", lvTrip: "+15 per ogni viaggio, di più nei mondi lontani", lvGift: "+30 Tanì in regalo a ogni nuovo livello",
    lvNext: "Cosa arriva dopo", lvAt: (n) => `Livello ${n}`, lvDone: "Hai già sbloccato tutto. Continua così!", lvA11y: (n) => `Livello ${n}: tocca per i dettagli`, scene: (s) => `Nuovo posto in schermo intero: ${s}` },
  en: { renT: "Your companion's name", renL: "Name", renHint: "1 to 16 characters.", save: "Save", cancel: "Cancel", renA11y: (n) => `${n}: tap to rename`,
    lvT: "Your level", lvWhat: "It grows with your good habits and unlocks new trips, worlds and surprises.", lvPts: (a, b) => `${a} / ${b} points`, lvLeft: (n) => n === 1 ? "1 point to the next level" : `${n} points to the next level`,
    lvHow: "How to earn points", lvGoal: "+10 for every goal you complete", lvTrip: "+15 for every trip, more in faraway worlds", lvGift: "+30 Tanì as a gift at every new level",
    lvNext: "Coming up next", lvAt: (n) => `Level ${n}`, lvDone: "You've unlocked everything. Keep it up!", lvA11y: (n) => `Level ${n}: tap for details`, scene: (s) => `New fullscreen place: ${s}` },
  de: { renT: "Name deines Begleiters", renL: "Name", renHint: "1 bis 16 Zeichen.", save: "Speichern", cancel: "Abbrechen", renA11y: (n) => `${n}: tippen zum Umbenennen`,
    lvT: "Dein Level", lvWhat: "Es wächst mit deinen guten Gewohnheiten und schaltet neue Reisen, Welten und Überraschungen frei.", lvPts: (a, b) => `${a} / ${b} Punkte`, lvLeft: (n) => n === 1 ? "Noch 1 Punkt bis zum nächsten Level" : `Noch ${n} Punkte bis zum nächsten Level`,
    lvHow: "So sammelst du Punkte", lvGoal: "+10 für jedes erledigte Ziel", lvTrip: "+15 für jede Reise, mehr in fernen Welten", lvGift: "+30 Tanì als Geschenk bei jedem neuen Level",
    lvNext: "Was als Nächstes kommt", lvAt: (n) => `Level ${n}`, lvDone: "Du hast schon alles freigeschaltet. Weiter so!", lvA11y: (n) => `Level ${n}: tippen für Details`, scene: (s) => `Neuer Ort im Vollbild: ${s}` },
  es: { renT: "El nombre de tu compañero", renL: "Nombre", renHint: "De 1 a 16 caracteres.", save: "Guardar", cancel: "Cancelar", renA11y: (n) => `${n}: toca para cambiar el nombre`,
    lvT: "Tu nivel", lvWhat: "Sube con tus buenos hábitos y desbloquea nuevos viajes, mundos y sorpresas.", lvPts: (a, b) => `${a} / ${b} puntos`, lvLeft: (n) => n === 1 ? "Falta 1 punto para el siguiente nivel" : `Faltan ${n} puntos para el siguiente nivel`,
    lvHow: "Cómo ganar puntos", lvGoal: "+10 por cada objetivo cumplido", lvTrip: "+15 por cada viaje, más en los mundos lejanos", lvGift: "+30 Tanì de regalo en cada nuevo nivel",
    lvNext: "Lo que viene", lvAt: (n) => `Nivel ${n}`, lvDone: "Ya lo has desbloqueado todo. ¡Sigue así!", lvA11y: (n) => `Nivel ${n}: toca para ver detalles`, scene: (s) => `Nuevo lugar en pantalla completa: ${s}` },
  fr: { renT: "Le nom de ton compagnon", renL: "Nom", renHint: "De 1 à 16 caractères.", save: "Enregistrer", cancel: "Annuler", renA11y: (n) => `${n} : touche pour changer le nom`,
    lvT: "Ton niveau", lvWhat: "Il grimpe avec tes bonnes habitudes et débloque de nouveaux voyages, mondes et surprises.", lvPts: (a, b) => `${a} / ${b} points`, lvLeft: (n) => n === 1 ? "Encore 1 point avant le niveau suivant" : `Encore ${n} points avant le niveau suivant`,
    lvHow: "Comment gagner des points", lvGoal: "+10 pour chaque objectif réussi", lvTrip: "+15 pour chaque voyage, plus dans les mondes lointains", lvGift: "+30 Tanì offerts à chaque nouveau niveau",
    lvNext: "La suite", lvAt: (n) => `Niveau ${n}`, lvDone: "Tu as déjà tout débloqué. Continue comme ça !", lvA11y: (n) => `Niveau ${n} : touche pour les détails`, scene: (s) => `Nouveau lieu en plein écran : ${s}` },
  pt: { renT: "O nome do seu companheiro", renL: "Nome", renHint: "De 1 a 16 caracteres.", save: "Salvar", cancel: "Cancelar", renA11y: (n) => `${n}: toque para mudar o nome`,
    lvT: "Seu nível", lvWhat: "Ele sobe com seus bons hábitos e desbloqueia novas viagens, mundos e surpresas.", lvPts: (a, b) => `${a} / ${b} pontos`, lvLeft: (n) => n === 1 ? "Falta 1 ponto para o próximo nível" : `Faltam ${n} pontos para o próximo nível`,
    lvHow: "Como ganhar pontos", lvGoal: "+10 por cada meta cumprida", lvTrip: "+15 por cada viagem, mais nos mundos distantes", lvGift: "+30 Tanì de presente a cada novo nível",
    lvNext: "O que vem a seguir", lvAt: (n) => `Nível ${n}`, lvDone: "Você já desbloqueou tudo. Continue assim!", lvA11y: (n) => `Nível ${n}: toque para ver detalhes`, scene: (s) => `Novo lugar em tela cheia: ${s}` },
  ja: { renT: "パートナーの名前", renL: "名前", renHint: "1〜16文字", save: "保存", cancel: "キャンセル", renA11y: (n) => `${n}：タップして名前を変更`,
    lvT: "あなたのレベル", lvWhat: "よい習慣を続けると上がり、新しい旅や世界、サプライズが解放されます。", lvPts: (a, b) => `${a} / ${b} ポイント`, lvLeft: (n) => `次のレベルまであと${n}ポイント`,
    lvHow: "ポイントのため方", lvGoal: "目標を1つ達成するごとに +10", lvTrip: "旅に出るたびに +15（遠い世界ほど多め）", lvGift: "レベルが上がるたびに 30 Tanìをプレゼント",
    lvNext: "これから解放されるもの", lvAt: (n) => `レベル${n}`, lvDone: "すべて解放済みです。その調子！", lvA11y: (n) => `レベル${n}：タップで詳細`, scene: (s) => `全画面に新しい場所：${s}` },
  ko: { renT: "친구의 이름", renL: "이름", renHint: "1~16자", save: "저장", cancel: "취소", renA11y: (n) => `${n}: 눌러서 이름 바꾸기`,
    lvT: "나의 레벨", lvWhat: "좋은 습관을 이어 가면 올라가고, 새로운 여행과 세계, 깜짝 선물이 열려요.", lvPts: (a, b) => `${a} / ${b} 포인트`, lvLeft: (n) => `다음 레벨까지 ${n}포인트`,
    lvHow: "포인트 모으는 법", lvGoal: "목표를 하나 이룰 때마다 +10", lvTrip: "여행마다 +15, 먼 세계일수록 더 많이", lvGift: "새 레벨마다 Tanì 30개 선물",
    lvNext: "다음에 열리는 것", lvAt: (n) => `레벨 ${n}`, lvDone: "모두 열었어요. 계속 이렇게 해요!", lvA11y: (n) => `레벨 ${n}: 눌러서 자세히 보기`, scene: (s) => `전체 화면에 새 장소: ${s}` },
  zh: { renT: "小伙伴的名字", renL: "名字", renHint: "1 到 16 个字符。", save: "保存", cancel: "取消", renA11y: (n) => `${n}：点按即可改名`,
    lvT: "你的等级", lvWhat: "坚持好习惯就会升级，解锁新的旅行、世界和惊喜。", lvPts: (a, b) => `${a} / ${b} 点`, lvLeft: (n) => `距离下一级还差 ${n} 点`,
    lvHow: "如何获得点数", lvGoal: "每完成一个目标 +10", lvTrip: "每次旅行 +15，越远的世界越多", lvGift: "每升一级送 30 Tanì",
    lvNext: "接下来会解锁", lvAt: (n) => `${n} 级`, lvDone: "你已经全部解锁了，继续加油！", lvA11y: (n) => `${n} 级：点按查看详情`, scene: (s) => `全屏新地点：${s}` },
  zht: { renT: "小夥伴的名字", renL: "名字", renHint: "1 到 16 個字元。", save: "儲存", cancel: "取消", renA11y: (n) => `${n}：點按即可改名`,
    lvT: "你的等級", lvWhat: "堅持好習慣就會升級，解鎖新的旅行、世界和驚喜。", lvPts: (a, b) => `${a} / ${b} 點`, lvLeft: (n) => `距離下一級還差 ${n} 點`,
    lvHow: "如何獲得點數", lvGoal: "每完成一個目標 +10", lvTrip: "每次旅行 +15，越遠的世界越多", lvGift: "每升一級送 30 Tanì",
    lvNext: "接下來會解鎖", lvAt: (n) => `${n} 級`, lvDone: "你已經全部解鎖了，繼續加油！", lvA11y: (n) => `${n} 級：點按查看詳情`, scene: (s) => `全螢幕新地點：${s}` },
  ru: { renT: "Имя питомца", renL: "Имя", renHint: "От 1 до 16 символов.", save: "Сохранить", cancel: "Отмена", renA11y: (n) => `${n}: нажми, чтобы переименовать`,
    lvT: "Твой уровень", lvWhat: "Он растёт вместе с твоими полезными привычками и открывает новые путешествия, миры и сюрпризы.", lvPts: (a, b) => `${a} / ${b} очков`, lvLeft: (n) => `До следующего уровня: ${n} ${pl(n, "очко", "очка", "очков")}`,
    lvHow: "Как получать очки", lvGoal: "+10 за каждую выполненную цель", lvTrip: "+15 за каждое путешествие, в далёких мирах больше", lvGift: "+30 Tanì в подарок за каждый новый уровень",
    lvNext: "Что откроется дальше", lvAt: (n) => `Уровень ${n}`, lvDone: "Ты уже всё открыл. Так держать!", lvA11y: (n) => `Уровень ${n}: нажми для подробностей`, scene: (s) => `Новое место на весь экран: ${s}` },
  pl: { renT: "Imię towarzysza", renL: "Imię", renHint: "Od 1 do 16 znaków.", save: "Zapisz", cancel: "Anuluj", renA11y: (n) => `${n}: dotknij, aby zmienić imię`,
    lvT: "Twój poziom", lvWhat: "Rośnie razem z twoimi dobrymi nawykami i odblokowuje nowe podróże, światy i niespodzianki.", lvPts: (a, b) => `${a} / ${b} pkt`, lvLeft: (n) => `Do następnego poziomu: ${n} pkt`,
    lvHow: "Jak zdobywać punkty", lvGoal: "+10 za każdy wykonany cel", lvTrip: "+15 za każdą podróż, więcej w dalekich światach", lvGift: "+30 Tanì w prezencie za każdy nowy poziom",
    lvNext: "Co będzie dalej", lvAt: (n) => `Poziom ${n}`, lvDone: "Wszystko już odblokowane. Tak trzymaj!", lvA11y: (n) => `Poziom ${n}: dotknij, aby zobaczyć szczegóły`, scene: (s) => `Nowe miejsce na pełnym ekranie: ${s}` },
  nl: { renT: "De naam van je maatje", renL: "Naam", renHint: "1 tot 16 tekens.", save: "Opslaan", cancel: "Annuleren", renA11y: (n) => `${n}: tik om de naam te wijzigen`,
    lvT: "Jouw niveau", lvWhat: "Het groeit met je goede gewoontes en ontgrendelt nieuwe reizen, werelden en verrassingen.", lvPts: (a, b) => `${a} / ${b} punten`, lvLeft: (n) => n === 1 ? "Nog 1 punt tot het volgende niveau" : `Nog ${n} punten tot het volgende niveau`,
    lvHow: "Zo verdien je punten", lvGoal: "+10 voor elk voltooid doel", lvTrip: "+15 voor elke reis, meer in verre werelden", lvGift: "+30 Tanì cadeau bij elk nieuw niveau",
    lvNext: "Wat er nog komt", lvAt: (n) => `Niveau ${n}`, lvDone: "Je hebt alles al ontgrendeld. Ga zo door!", lvA11y: (n) => `Niveau ${n}: tik voor details`, scene: (s) => `Nieuwe plek op volledig scherm: ${s}` },
  tr: { renT: "Arkadaşının adı", renL: "Ad", renHint: "1 ile 16 karakter arası.", save: "Kaydet", cancel: "Vazgeç", renA11y: (n) => `${n}: adını değiştirmek için dokun`,
    lvT: "Seviyen", lvWhat: "İyi alışkanlıklarınla yükselir; yeni yolculukların, dünyaların ve sürprizlerin kilidini açar.", lvPts: (a, b) => `${a} / ${b} puan`, lvLeft: (n) => `Sonraki seviyeye ${n} puan kaldı`,
    lvHow: "Puan nasıl kazanılır", lvGoal: "Tamamladığın her hedef için +10", lvTrip: "Her yolculuk için +15, uzak dünyalarda daha fazla", lvGift: "Her yeni seviyede 30 Tanì hediye",
    lvNext: "Sırada ne var", lvAt: (n) => `Seviye ${n}`, lvDone: "Her şeyin kilidini açtın. Böyle devam!", lvA11y: (n) => `Seviye ${n}: ayrıntılar için dokun`, scene: (s) => `Tam ekranda yeni yer: ${s}` }
};
const v19 = () => V19[S.lang] || V19.en;

/* --- 1) Saluto --- */
greetLine = function () {
  const t = L(); const n = userName(); const g = t.greet[phase()];
  let dl = intlDT(loc(), { weekday: "long", day: "numeric", month: "long" }).format(new Date()); dl = dl.charAt(0).toUpperCase() + dl.slice(1);
  const hi = n ? v18n().greet(g, n) : g;
  return `<h1 class="greet g19"><span class="gd">${esc(dl)}</span><span class="gw">${esc(hi)}</span></h1>`; /* 1.0.9: il saluto e' il titolo della pagina (h1) */
};
greetFit = function () {};

/* --- 2) e 3) Nome e livello in alto diventano pulsanti --- */
const _topBarV19 = topBar;
topBar = function () {
  let h = _topBarV19(); if (!S.pet) return h; const t = v19();
  h = h.replace(/<span class="name">([\s\S]*?)<\/span>/, (m, nm) => `<button class="name namebtn" id="petNameBtn" type="button" aria-label="${esc(t.renA11y(S.petName))}">${nm}</button>`);
  h = h.replace(/<span class="pill">([\s\S]*?<\/span>)<\/span>/, (m, inner) => `<button class="pill lvpill" id="lvBtn" type="button" aria-label="${esc(t.lvA11y(S.level))}">${STAR}<span>${S.level}</span></button>`);
  return h;
};

/* Nome del compagno: lettere (tutti gli alfabeti), numeri, spazi singoli, apostrofo e trattino; 1-16 caratteri */
function petNameClean(raw) {
  let s = String(raw || "").normalize("NFC").replace(/[^\p{L}\p{M}\p{N} '’\-]/gu, "").replace(/\s+/g, " ").replace(/^\s+/, "");
  return Array.from(s).slice(0, 16).join("");
}
function renameSheet() {
  const t = v19();
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="rnT"><div class="sheet rnsheet"><div class="grab"></div>
    <div class="rnpet" aria-hidden="true">${petSVG(S.pet, "felice", S.hat, stage(), "")}</div>
    <h2 id="rnT">${esc(t.renT)}</h2>
    <div class="field"><label for="rnInp">${esc(t.renL)}</label><input id="rnInp" maxlength="16" autocomplete="off" spellcheck="false" enterkeyhint="done" value="${esc(S.petName)}"></div>
    <p class="small muted rnmsg" id="rnMsg" aria-live="polite">${esc(t.renHint)}</p>
    <div class="row rnrow"><button class="btn ghost" id="closeLayer">${esc(t.cancel)}</button><button class="btn" id="rnSave">${esc(t.save)}</button></div></div></div>`;
  SND.play("click");
  const i = document.getElementById("rnInp");
  i.addEventListener("input", () => { const c = petNameClean(i.value); if (c !== i.value) i.value = c; });
  i.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("rnSave").click(); } });
  setTimeout(() => { try { i.focus({ preventScroll: true }); i.setSelectionRange(i.value.length, i.value.length); } catch (e) { /* niente */ } }, 60);
}
function renameSave() {
  const i = document.getElementById("rnInp"); const msg = document.getElementById("rnMsg"); if (!i) return;
  const v = petNameClean(i.value).trim();
  if (!v) { msg.textContent = v19().renHint; msg.classList.add("err"); i.focus(); return; }
  if (typeof nameBad === "function" && nameBad(v)) { msg.textContent = v18n().bad; msg.classList.add("err"); i.focus(); return; }
  S.petName = v; save(); fadeLayer(); render(); toast(L().renamed); SND.play("coin"); if (S.notif && typeof notifSchedule === "function") notifSchedule();
}

/* Scheda del livello: cosa sblocca dopo */
function lvUnlocks() {
  const t = L(); const out = [];
  const { fant, real } = destList();
  fant.concat(real).forEach((d) => { if (d.lvl > S.level) out.push([d.lvl, t.unlocked(d.name)]); });
  const tr = t.tricks || []; for (let l = S.level + 1; l <= tr.length; l++) out.push([l, t.trickNew(tr[l - 1])]);
  [3, 6].forEach((l) => { if (l > S.level) out.push([l, t.grow(S.petName)]); });
  const sc = (t.full && t.full.scenes) || {};
  if (LV.garden > S.level && sc.garden) out.push([LV.garden, v19().scene(sc.garden)]);
  if (LV.terrace > S.level && sc.terrace) out.push([LV.terrace, v19().scene(sc.terrace)]);
  if (typeof lvExtraUnlocks === "function") lvExtraUnlocks().forEach((x) => { if (x[0] > S.level) out.push(x); });
  out.sort((a, b) => a[0] - b[0]);
  return out;
}
function levelSheet() {
  const t = v19(); const need = xpNeed(S.level); const pct = Math.max(0, Math.min(100, Math.round((S.xp / need) * 100)));
  const ups = lvUnlocks(); const byLv = []; ups.forEach(([l, s]) => { const g = byLv.find((x) => x[0] === l); if (g) g[1].push(s); else byLv.push([l, [s]]); });
  const next = byLv.slice(0, 5);
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="lvT"><div class="sheet lvsheet"><div class="grab"></div>
    <div class="lvhead"><div class="lvbadge" aria-hidden="true">${STAR}<b>${S.level}</b></div><div><h2 id="lvT">${esc(t.lvT)}</h2><p class="small muted">${esc(t.lvWhat)}</p></div></div>
    <div class="lvbar" role="progressbar" aria-label="${esc(t.lvPts(S.xp, need))}" aria-valuemin="0" aria-valuemax="${need}" aria-valuenow="${S.xp}"><i style="width:${pct}%"></i></div>
    <p class="lvpts"><b>${esc(t.lvPts(S.xp, need))}</b> · ${esc(t.lvLeft(need - S.xp))}</p>
    <h3>${esc(t.lvHow)}</h3>
    <ul class="lvhow"><li>${icon("check")}<span>${esc(t.lvGoal)}</span></li><li>${icon("trips")}<span>${esc(t.lvTrip)}</span></li><li><span class="lvseed">${SEED}</span><span>${esc(t.lvGift)}</span></li></ul>
    <h3>${esc(t.lvNext)}</h3>
    ${next.length ? `<ol class="lvnext">${next.map(([l, arr]) => `<li><span class="lvn">${esc(t.lvAt(l))}</span><span class="lvu">${arr.map(esc).join("<br>")}</span></li>`).join("")}</ol>` : `<p class="muted">${esc(t.lvDone)}</p>`}
    <button class="btn block" id="closeLayer">${esc(L().close)}</button></div></div>`;
  SND.play("click");
  if (anim) G.from(".lvbar i", { width: 0, duration: 0.7, ease: "power2.out" });
}

/* --- 4) Stanza a schermo intero anche quando il compagno è in viaggio --- */
const _roomBlockV19 = roomBlock;
roomBlock = function () {
  const h = _roomBlockV19();
  if (!S.away || full) return h;
  return h.replace('<div class="playlayer" id="playlayer">', `<button class="fullbtn" id="fullAway" aria-label="${esc(L().full.open)}">${icon("expand")}</button><div class="playlayer" id="playlayer">`);
};
function awayFull() {
  const t = L(); const d = destByKey(S.away.dest);
  layer.innerHTML = `<div class="overlay awayfull" role="dialog" aria-modal="true" aria-labelledby="afT"><div class="afroom">${roomSVG({ ph: phase(), pet: S.pet, e: "normale", hat: S.hat, st: stage(), furn: S.furn, wall: S.wall, away: true, glow: null, label: S.petName, season: season().id, dark: S.lightsOff, friend: null })}</div>
    <div class="afbar"><div><h2 id="afT">${t.awayT(esc(S.petName))}</h2><p class="small">${t.awayB(esc(d.name), timeLeft(S.away.until))}</p></div><button class="iconbtn" id="closeLayer" aria-label="${esc(t.full.close)}">${icon("x")}</button></div></div>`;
  SND.play("sparkle");
  if (anim) G.from(".afroom", { opacity: 0, scale: 0.96, duration: 0.4, ease: "power3.out" });
}

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "petNameBtn") { ev.stopImmediatePropagation(); renameSheet(); return; }
  if (b.id === "rnSave") { ev.stopImmediatePropagation(); renameSave(); return; }
  if (b.id === "lvBtn") { ev.stopImmediatePropagation(); levelSheet(); return; }
  if (b.id === "fullAway") { ev.stopImmediatePropagation(); if (S.away) awayFull(); return; }
}, true);

/* Chiudendo una finestra si fermano anche le sue animazioni infinite (raggi, lanterna che fluttua) */
const _fadeLayerV19 = fadeLayer;
fadeLayer = function () { try { if (typeof G !== "undefined" && G.killTweensOf) G.killTweensOf(layer.querySelectorAll(".rays, .fdart")); } catch (e) { /* niente */ } _fadeLayerV19(); };

/* Icona "chiudi" e tempo che manca al ritorno nella lingua giusta (prima solo il tedesco era tradotto) */
ICON.x = '<path d="M6 6l12 12M18 6L6 18"/>';
const TL_UNITS = { ja: ["時間", "分", ""], ko: ["시간 ", "분", ""], zh: ["小时", "分钟", ""], zht: ["小時", "分鐘", ""], ru: [" ч ", " мин", " "], pl: [" godz. ", " min", " "], tr: [" sa ", " dk", " "], nl: [" u ", " min", " "] };
const _timeLeftV19 = timeLeft;
timeLeft = function (until) {
  const u = TL_UNITS[S.lang]; if (!u) return _timeLeftV19(until);
  const ms = Math.max(0, until - Date.now()); const h = Math.floor(ms / 3600000); let m = Math.ceil((ms % 3600000) / 60000); if (m === 60) m = 59;
  const H = (n) => `${n}${u[0].trimEnd()}`, M = (n) => `${n}${u[1]}`;
  return h > 0 ? (m > 0 ? `${h}${u[0]}${m}${u[1]}` : H(h)) : M(m);
};
