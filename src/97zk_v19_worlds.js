/* ===== 1.0.6 — 9 nuovi mondi fantastici, album delle cartoline, timbri =====
   Mondi (V19W, disegni e testi in 97zf_v19_worldart.js): si sbloccano dal livello 8 al 29, viaggi da 3 a 6 ore,
   4 cartoline ciascuno (la n. 3 è rara: pesa 0,4 contro 1, quindi di solito arriva per ultima; ogni viaggio porta
   sempre una cartolina nuova finché la pagina non è completa). Più il mondo è lontano, più Tanì e punti porta.
   Rientro: se si parte di notte (prima delle 7) il compagno torna al più tardi alle 7, per non bloccare gli obiettivi
   del mattino.
   Album: una pagina per mondo (+ luoghi veri della lingua, + giro del mondo per Plus); ogni pagina completata dà un
   premio da ritirare (Tanì, e nei mondi nuovi un ricordo esclusivo); l'album dei mondi fantastici completo dà un
   oggetto leggendario e 1000 Tanì.
   Timbri: 5, 10 e 20 visite nello stesso mondo danno 30, 60 e 100 Tanì (i viaggi ripetuti valgono sempre qualcosa). */
const V19A = {
  it: { fromAlbum: "Premio dell'album", albumT: "Album delle cartoline", open: (a, b) => `Apri l'album · ${a}/${b}`, page: (a, b) => `${a}/${b} cartoline`, rare: "Rara", hint: "Ogni viaggio porta una cartolina nuova. Quella rara di solito arriva per ultima.", locked: (n) => `Si sblocca al livello ${n}`, reward: (n) => `Per la pagina completa: +${n} Tanì`, rewardIt: (n, x) => `Per la pagina completa: +${n} Tanì e ${x}`, claim: "Ritira il premio", claimed: "Premio ritirato", got: (n) => `Pagina completata! +${n} Tanì`, ready: "Pagina completata: il premio ti aspetta nell'album.", visits: (n) => n === 1 ? "1 visita" : `${n} visite`, stamp: (n, t) => `Timbro per ${n} visite! +${t} Tanì`, nextStamp: (n) => `prossimo timbro a ${n}`, fullT: "Album completo!", fullP: (x) => `Hai raccolto tutte le cartoline dei mondi fantastici. Per te: ${x} e 1000 Tanì.`, fullGoal: (x) => `Completa tutte le pagine dei mondi fantastici: in premio ${x}.`, more: (n, a, b) => `Altri ${n} mondi si sbloccano più avanti (livelli ${a}–${b})`, newT: "Nuovi mondi fantastici!", newP: (n) => n === 1 ? "Sono arrivati 9 mondi nuovi. Al tuo livello ce n'è già 1 da visitare." : `Sono arrivati 9 mondi nuovi. Al tuo livello ce ne sono già ${n} da visitare.`, go: "Vai alle avventure" },
  en: { fromAlbum: "Album reward", albumT: "Postcard album", open: (a, b) => `Open the album · ${a}/${b}`, page: (a, b) => `${a}/${b} postcards`, rare: "Rare", hint: "Every trip brings a new postcard. The rare one usually comes last.", locked: (n) => `Unlocks at level ${n}`, reward: (n) => `Complete this page for +${n} Tanì`, rewardIt: (n, x) => `Complete this page for +${n} Tanì and ${x}`, claim: "Claim reward", claimed: "Reward claimed", got: (n) => `Page complete! +${n} Tanì`, ready: "Page complete: your reward is waiting in the album.", visits: (n) => n === 1 ? "1 visit" : `${n} visits`, stamp: (n, t) => `Stamp for ${n} visits! +${t} Tanì`, nextStamp: (n) => `next stamp at ${n}`, fullT: "Album complete!", fullP: (x) => `You collected every postcard from the fantasy worlds. For you: ${x} and 1000 Tanì.`, fullGoal: (x) => `Complete every fantasy-world page to win this: ${x}.`, more: (n, a, b) => `${n} more worlds unlock later (levels ${a}–${b})`, newT: "New fantasy worlds!", newP: (n) => n === 1 ? "9 new worlds have arrived. At your level, 1 is ready to visit." : `9 new worlds have arrived. At your level, ${n} are ready to visit.`, go: "Go to adventures" },
  de: { fromAlbum: "Album-Belohnung", albumT: "Postkartenalbum", open: (a, b) => `Album öffnen · ${a}/${b}`, page: (a, b) => `${a}/${b} Postkarten`, rare: "Selten", hint: "Jede Reise bringt eine neue Postkarte. Die seltene kommt meistens zuletzt.", locked: (n) => `Ab Level ${n}`, reward: (n) => `Für die volle Seite: +${n} Tanì`, rewardIt: (n, x) => `Für die volle Seite: +${n} Tanì und ${x}`, claim: "Belohnung abholen", claimed: "Belohnung abgeholt", got: (n) => `Seite komplett! +${n} Tanì`, ready: "Seite komplett: Deine Belohnung wartet im Album.", visits: (n) => n === 1 ? "1 Besuch" : `${n} Besuche`, stamp: (n, t) => `Stempel für ${n} Besuche! +${t} Tanì`, nextStamp: (n) => `nächster Stempel bei ${n}`, fullT: "Album komplett!", fullP: (x) => `Du hast alle Postkarten der Fantasiewelten gesammelt. Für dich: ${x} und 1000 Tanì.`, fullGoal: (x) => `Vervollständige alle Seiten der Fantasiewelten. Belohnung: ${x}.`, more: (n, a, b) => `${n} weitere Welten folgen später (Level ${a}–${b})`, newT: "Neue Fantasiewelten!", newP: (n) => n === 1 ? "9 neue Welten sind da. Auf deinem Level kannst du schon 1 besuchen." : `9 neue Welten sind da. Auf deinem Level kannst du schon ${n} besuchen.`, go: "Zu den Abenteuern" },
  es: { fromAlbum: "Premio del álbum", albumT: "Álbum de postales", open: (a, b) => `Abrir el álbum · ${a}/${b}`, page: (a, b) => `${a}/${b} postales`, rare: "Rara", hint: "Cada viaje trae una postal nueva. La rara suele llegar la última.", locked: (n) => `Se desbloquea en el nivel ${n}`, reward: (n) => `Por la página completa: +${n} Tanì`, rewardIt: (n, x) => `Por la página completa: +${n} Tanì y ${x}`, claim: "Recoger el premio", claimed: "Premio recogido", got: (n) => `¡Página completa! +${n} Tanì`, ready: "Página completa: tu premio te espera en el álbum.", visits: (n) => n === 1 ? "1 visita" : `${n} visitas`, stamp: (n, t) => `¡Sello por ${n} visitas! +${t} Tanì`, nextStamp: (n) => `próximo sello a las ${n}`, fullT: "¡Álbum completo!", fullP: (x) => `Has reunido todas las postales de los mundos fantásticos. Para ti: ${x} y 1000 Tanì.`, fullGoal: (x) => `Completa todas las páginas de los mundos fantásticos. Premio: ${x}.`, more: (n, a, b) => `${n} mundos más se desbloquean después (niveles ${a}–${b})`, newT: "¡Nuevos mundos fantásticos!", newP: (n) => n === 1 ? "Han llegado 9 mundos nuevos. En tu nivel ya hay 1 para visitar." : `Han llegado 9 mundos nuevos. En tu nivel ya hay ${n} para visitar.`, go: "Ir a las aventuras" },
  fr: { fromAlbum: "Récompense de l'album", albumT: "Album de cartes postales", open: (a, b) => `Ouvrir l'album · ${a}/${b}`, page: (a, b) => `${a}/${b} cartes`, rare: "Rare", hint: "Chaque voyage rapporte une nouvelle carte. La rare arrive généralement en dernier.", locked: (n) => `Se débloque au niveau ${n}`, reward: (n) => `Pour la page complète : +${n} Tanì`, rewardIt: (n, x) => `Pour la page complète : +${n} Tanì et ${x}`, claim: "Récupérer la récompense", claimed: "Récompense récupérée", got: (n) => `Page complète ! +${n} Tanì`, ready: "Page complète : ta récompense t'attend dans l'album.", visits: (n) => n === 1 ? "1 visite" : `${n} visites`, stamp: (n, t) => `Tampon pour ${n} visites ! +${t} Tanì`, nextStamp: (n) => `prochain tampon à ${n}`, fullT: "Album complet !", fullP: (x) => `Tu as réuni toutes les cartes des mondes fantastiques. Pour toi : ${x} et 1000 Tanì.`, fullGoal: (x) => `Complète toutes les pages des mondes fantastiques. Récompense : ${x}.`, more: (n, a, b) => `${n} autres mondes se débloquent plus tard (niveaux ${a} à ${b})`, newT: "Nouveaux mondes fantastiques !", newP: (n) => n === 1 ? "9 nouveaux mondes sont arrivés. À ton niveau, 1 est déjà à visiter." : `9 nouveaux mondes sont arrivés. À ton niveau, ${n} sont déjà à visiter.`, go: "Aller aux aventures" },
  pt: { fromAlbum: "Prêmio do álbum", albumT: "Álbum de postais", open: (a, b) => `Abrir o álbum · ${a}/${b}`, page: (a, b) => `${a}/${b} postais`, rare: "Rara", hint: "Cada viagem traz um postal novo. O raro costuma chegar por último.", locked: (n) => `Desbloqueia no nível ${n}`, reward: (n) => `Pela página completa: +${n} Tanì`, rewardIt: (n, x) => `Pela página completa: +${n} Tanì e ${x}`, claim: "Pegar o prêmio", claimed: "Prêmio recebido", got: (n) => `Página completa! +${n} Tanì`, ready: "Página completa: seu prêmio está esperando no álbum.", visits: (n) => n === 1 ? "1 visita" : `${n} visitas`, stamp: (n, t) => `Carimbo por ${n} visitas! +${t} Tanì`, nextStamp: (n) => `próximo carimbo em ${n}`, fullT: "Álbum completo!", fullP: (x) => `Você juntou todos os postais dos mundos fantásticos. Para você: ${x} e 1000 Tanì.`, fullGoal: (x) => `Complete todas as páginas dos mundos fantásticos. Prêmio: ${x}.`, more: (n, a, b) => `Mais ${n} mundos se desbloqueiam depois (níveis ${a}–${b})`, newT: "Novos mundos fantásticos!", newP: (n) => n === 1 ? "Chegaram 9 mundos novos. No seu nível, 1 já pode ser visitado." : `Chegaram 9 mundos novos. No seu nível, ${n} já podem ser visitados.`, go: "Ir para as aventuras" },
  ja: { fromAlbum: "アルバムのごほうび", albumT: "ポストカードアルバム", open: (a, b) => `アルバムを開く・${a}/${b}`, page: (a, b) => `ポストカード ${a}/${b}`, rare: "レア", hint: "旅に出るたびに新しいポストカードが届きます。レアはたいてい最後に届きます。", locked: (n) => `レベル${n}で解放`, reward: (n) => `ページを完成させると +${n} Tanì`, rewardIt: (n, x) => `ページを完成させると +${n} Tanìと${x}`, claim: "ごほうびを受け取る", claimed: "受け取り済み", got: (n) => `ページ完成！ +${n} Tanì`, ready: "ページ完成：アルバムでごほうびが待っています。", visits: (n) => `訪問 ${n}回`, stamp: (n, t) => `${n}回訪問のスタンプ！ +${t} Tanì`, nextStamp: (n) => `次のスタンプは${n}回`, fullT: "アルバム完成！", fullP: (x) => `ファンタジーの世界のポストカードをすべて集めました。プレゼント：${x}と 1000 Tanì。`, fullGoal: (x) => `ファンタジーの世界のページをすべて完成させると、ごほうび：${x}`, more: (n, a, b) => `あと${n}つの世界がこの先で解放されます（レベル${a}〜${b}）`, newT: "新しいファンタジーの世界！", newP: (n) => `新しい世界が9つ届きました。今のレベルで、もう${n}つ行けます。`, go: "冒険へ" },
  ko: { fromAlbum: "앨범 보상", albumT: "엽서 앨범", open: (a, b) => `앨범 열기 · ${a}/${b}`, page: (a, b) => `엽서 ${a}/${b}`, rare: "레어", hint: "여행할 때마다 새 엽서가 와요. 레어 엽서는 보통 마지막에 와요.", locked: (n) => `레벨 ${n}에 열려요`, reward: (n) => `페이지를 채우면 Tanì +${n}`, rewardIt: (n, x) => `페이지를 채우면 Tanì +${n}, ${x}`, claim: "보상 받기", claimed: "보상 받음", got: (n) => `페이지 완성! Tanì +${n}`, ready: "페이지 완성: 앨범에서 보상이 기다려요.", visits: (n) => `방문 ${n}회`, stamp: (n, t) => `${n}회 방문 도장! Tanì +${t}`, nextStamp: (n) => `다음 도장은 ${n}회`, fullT: "앨범 완성!", fullP: (x) => `판타지 세계의 엽서를 모두 모았어요. 선물: ${x}, Tanì 1000개.`, fullGoal: (x) => `판타지 세계 페이지를 모두 채우면 선물이 있어요: ${x}`, more: (n, a, b) => `세계 ${n}곳이 나중에 열려요 (레벨 ${a}–${b})`, newT: "새로운 판타지 세계!", newP: (n) => `새 세계 9곳이 도착했어요. 지금 레벨로 벌써 ${n}곳에 갈 수 있어요.`, go: "모험하러 가기" },
  zh: { fromAlbum: "相册奖励", albumT: "明信片相册", open: (a, b) => `打开相册 · ${a}/${b}`, page: (a, b) => `明信片 ${a}/${b}`, rare: "稀有", hint: "每次旅行都会带回一张新明信片。稀有的那张通常最后才来。", locked: (n) => `${n} 级解锁`, reward: (n) => `集满本页可得 +${n} Tanì`, rewardIt: (n, x) => `集满本页可得 +${n} Tanì和${x}`, claim: "领取奖励", claimed: "已领取", got: (n) => `本页集满！+${n} Tanì`, ready: "本页集满：奖励在相册里等你。", visits: (n) => `到访 ${n} 次`, stamp: (n, t) => `到访 ${n} 次印章！+${t} Tanì`, nextStamp: (n) => `下一个印章：${n} 次`, fullT: "相册集满了！", fullP: (x) => `你集齐了奇幻世界的所有明信片。送你：${x}和 1000 Tanì。`, fullGoal: (x) => `集满奇幻世界的所有页面，奖励：${x}`, more: (n, a, b) => `还有 ${n} 个世界会在之后解锁（${a}–${b} 级）`, newT: "新的奇幻世界！", newP: (n) => `9 个新世界来了。以你现在的等级，已经可以去 ${n} 个。`, go: "去冒险" },
  zht: { fromAlbum: "相簿獎勵", albumT: "明信片相簿", open: (a, b) => `打開相簿 · ${a}/${b}`, page: (a, b) => `明信片 ${a}/${b}`, rare: "稀有", hint: "每次旅行都會帶回一張新明信片。稀有的那張通常最後才來。", locked: (n) => `${n} 級解鎖`, reward: (n) => `集滿本頁可得 +${n} Tanì`, rewardIt: (n, x) => `集滿本頁可得 +${n} Tanì和${x}`, claim: "領取獎勵", claimed: "已領取", got: (n) => `本頁集滿！+${n} Tanì`, ready: "本頁集滿：獎勵在相簿裡等你。", visits: (n) => `到訪 ${n} 次`, stamp: (n, t) => `到訪 ${n} 次印章！+${t} Tanì`, nextStamp: (n) => `下一個印章：${n} 次`, fullT: "相簿集滿了！", fullP: (x) => `你集齊了奇幻世界的所有明信片。送你：${x}和 1000 Tanì。`, fullGoal: (x) => `集滿奇幻世界的所有頁面，獎勵：${x}`, more: (n, a, b) => `還有 ${n} 個世界會在之後解鎖（${a}–${b} 級）`, newT: "新的奇幻世界！", newP: (n) => `9 個新世界來了。以你現在的等級，已經可以去 ${n} 個。`, go: "去冒險" },
  ru: { fromAlbum: "Награда альбома", albumT: "Альбом открыток", open: (a, b) => `Открыть альбом · ${a}/${b}`, page: (a, b) => `Открытки: ${a}/${b}`, rare: "Редкая", hint: "Каждое путешествие приносит новую открытку. Редкая обычно приходит последней.", locked: (n) => `Откроется на уровне ${n}`, reward: (n) => `За полную страницу: +${n} Tanì`, rewardIt: (n, x) => `За полную страницу: +${n} Tanì и «${x}»`, claim: "Забрать награду", claimed: "Награда получена", got: (n) => `Страница собрана! +${n} Tanì`, ready: "Страница собрана: награда ждёт тебя в альбоме.", visits: (n) => `Визитов: ${n}`, stamp: (n, t) => `Штамп за ${n} визитов! +${t} Tanì`, nextStamp: (n) => `следующий штамп на ${n}`, fullT: "Альбом собран!", fullP: (x) => `Ты собрал все открытки волшебных миров. Тебе: «${x}» и 1000 Tanì.`, fullGoal: (x) => `Собери все страницы волшебных миров. Награда: «${x}».`, more: (n, a, b) => `Ещё миров: ${n}, откроются позже (уровни ${a}–${b})`, newT: "Новые волшебные миры!", newP: (n) => `Появились 9 новых миров. На твоём уровне уже можно посетить: ${n}.`, go: "К приключениям" },
  pl: { fromAlbum: "Nagroda z albumu", albumT: "Album pocztówek", open: (a, b) => `Otwórz album · ${a}/${b}`, page: (a, b) => `Pocztówki: ${a}/${b}`, rare: "Rzadka", hint: "Każda podróż przynosi nową pocztówkę. Rzadka zwykle przychodzi na końcu.", locked: (n) => `Odblokowanie na poziomie ${n}`, reward: (n) => `Za pełną stronę: +${n} Tanì`, rewardIt: (n, x) => `Za pełną stronę: +${n} Tanì i ${x}`, claim: "Odbierz nagrodę", claimed: "Nagroda odebrana", got: (n) => `Strona pełna! +${n} Tanì`, ready: "Strona pełna: nagroda czeka w albumie.", visits: (n) => `Wizyty: ${n}`, stamp: (n, t) => `Pieczątka za ${n} wizyt! +${t} Tanì`, nextStamp: (n) => `następna pieczątka przy ${n}`, fullT: "Album pełny!", fullP: (x) => `Masz wszystkie pocztówki z magicznych światów. Dla ciebie: ${x} i 1000 Tanì.`, fullGoal: (x) => `Uzupełnij wszystkie strony magicznych światów. Nagroda: ${x}.`, more: (n, a, b) => `Kolejne światy (${n}) odblokują się później (poziomy ${a}–${b})`, newT: "Nowe magiczne światy!", newP: (n) => `Przybyło 9 nowych światów. Na twoim poziomie możesz już odwiedzić: ${n}.`, go: "Do przygód" },
  nl: { fromAlbum: "Albumbeloning", albumT: "Ansichtkaartenalbum", open: (a, b) => `Album openen · ${a}/${b}`, page: (a, b) => `${a}/${b} kaarten`, rare: "Zeldzaam", hint: "Elke reis brengt een nieuwe kaart. De zeldzame komt meestal als laatste.", locked: (n) => `Vanaf niveau ${n}`, reward: (n) => `Voor een volle pagina: +${n} Tanì`, rewardIt: (n, x) => `Voor een volle pagina: +${n} Tanì en ${x}`, claim: "Beloning ophalen", claimed: "Beloning opgehaald", got: (n) => `Pagina vol! +${n} Tanì`, ready: "Pagina vol: je beloning wacht in het album.", visits: (n) => n === 1 ? "1 bezoek" : `${n} bezoeken`, stamp: (n, t) => `Stempel voor ${n} bezoeken! +${t} Tanì`, nextStamp: (n) => `volgende stempel bij ${n}`, fullT: "Album vol!", fullP: (x) => `Je hebt alle kaarten van de fantasiewerelden verzameld. Voor jou: ${x} en 1000 Tanì.`, fullGoal: (x) => `Maak alle pagina's van de fantasiewerelden vol. Beloning: ${x}.`, more: (n, a, b) => `Nog ${n} werelden komen later (niveau ${a}–${b})`, newT: "Nieuwe fantasiewerelden!", newP: (n) => n === 1 ? "Er zijn 9 nieuwe werelden. Op jouw niveau kun je er al 1 bezoeken." : `Er zijn 9 nieuwe werelden. Op jouw niveau kun je er al ${n} bezoeken.`, go: "Naar de avonturen" },
  tr: { fromAlbum: "Albüm ödülü", albumT: "Kartpostal albümü", open: (a, b) => `Albümü aç · ${a}/${b}`, page: (a, b) => `${a}/${b} kartpostal`, rare: "Nadir", hint: "Her yolculuk yeni bir kartpostal getirir. Nadir olan genellikle en son gelir.", locked: (n) => `${n}. seviyede açılır`, reward: (n) => `Sayfayı tamamlayınca: +${n} Tanì`, rewardIt: (n, x) => `Sayfayı tamamlayınca: +${n} Tanì ve ${x}`, claim: "Ödülü al", claimed: "Ödül alındı", got: (n) => `Sayfa tamam! +${n} Tanì`, ready: "Sayfa tamam: ödülün albümde seni bekliyor.", visits: (n) => `${n} ziyaret`, stamp: (n, t) => `${n} ziyaret damgası! +${t} Tanì`, nextStamp: (n) => `sonraki damga ${n}'de`, fullT: "Albüm tamam!", fullP: (x) => `Fantastik dünyaların bütün kartpostallarını topladın. Sana: ${x} ve 1000 Tanì.`, fullGoal: (x) => `Fantastik dünyaların tüm sayfalarını tamamla. Ödül: ${x}.`, more: (n, a, b) => `${n} dünya daha sonra açılacak (seviye ${a}–${b})`, newT: "Yeni fantastik dünyalar!", newP: (n) => `9 yeni dünya geldi. Senin seviyende şimdiden ${n} tanesini ziyaret edebilirsin.`, go: "Maceralara git" }
};
const v19a = () => V19A[S.lang] || V19A.en;
const v19wt = () => (V19W_TXT[S.lang] || V19W_TXT.en);
const wTxt = (id) => v19wt()[id] || V19W_TXT.en[id];
const V19W_TANI = [25, 25, 30, 30, 35, 35, 40, 40, 45], V19W_XP = [16, 17, 18, 19, 20, 21, 22, 24, 25];
const STAMPS = [[5, 30], [10, 60], [20, 100]];
const OLD_FANT = ["forest", "lake", "hill", "mountain", "city"];

/* --- Mete: i mondi nuovi si aggiungono ai mondi fantastici --- */
function v19dest(w, i) {
  const t = wTxt(w.id);
  return { key: `v:${w.id}`, h: w.h, lvl: w.lvl, name: t.name, art: () => worldArt(w.id, 0, t.name), cards: [0, 1, 2, 3].map((k) => `v:${w.id}:${k}`), v: i };
}
const _destListV19 = destList;
destList = function () { const o = _destListV19(); o.fant = o.fant.concat(V19W.map(v19dest)); return o; };
const _destByKeyV19 = destByKey;
destByKey = function (key) {
  if (key.startsWith("v:")) { const id = key.split(":")[1]; const i = V19W.findIndex((w) => w.id === id); const d = v19dest(V19W[i], i); delete d.art; return d; }
  return _destByKeyV19(key);
};
const _cardInfoV19 = cardInfo;
cardInfo = function (ck) {
  if (ck.startsWith("v:")) { const [, id, k] = ck.split(":"); const t = wTxt(id); const [title, text] = t.cards[+k]; return { title, text, art: () => worldArt(id, +k, title), place: t.name, rare: +k === 3 }; }
  return _cardInfoV19(ck);
};

/* --- Ritorno dal viaggio nei mondi nuovi --- */
function wPick(missing) {
  const w = missing.map((c) => (c.endsWith(":3") ? 0.4 : 1)); const tot = w.reduce((a, b) => a + b, 0);
  let r = Math.random() * tot; for (let i = 0; i < missing.length; i++) { r -= w[i]; if (r <= 0) return missing[i]; } return missing[missing.length - 1];
}
function stampCheck(key) {
  S.wvis = S.wvis || {}; const n = (S.wvis[key] = (S.wvis[key] || 0) + 1);
  const st = STAMPS.find((x) => x[0] === n); if (!st) return null;
  S.seeds += st[1]; return st;
}
const _finishTripV19 = finishTrip;
finishTrip = function () {
  const key = S.away && S.away.dest; if (!key) return;
  if (!key.startsWith("v:")) { _finishTripV19(); const st = stampCheck(key); if (story) { story.stamp = st; const pk = pageOf(key); if (pageDone(pk) && !pageClaimed(pk)) story.page = pk; } save(); return; }
  const d = destByKey(key); const i = d.v;
  const missing = d.cards.filter((c) => !S.cards.includes(c));
  const ck = missing.length ? wPick(missing) : d.cards[Math.floor(Math.random() * d.cards.length)];
  if (!S.cards.includes(ck)) S.cards.push(ck);
  let item = null;
  if (!S.owned.includes("gold")) item = "gold";
  else if (Math.random() < 0.3) { const hats = ["red", "blue", "violet", "green", "pink"].filter((h) => !S.owned.includes(h)); if (hats.length) item = hats[Math.floor(Math.random() * hats.length)]; }
  if (item) S.owned.push(item);
  const tani = V19W_TANI[i]; S.seeds += tani; S.away = null; S.energy = 0;
  const st = stampCheck(key);
  story = { card: ck, item, tani, stamp: st, page: pageDone(pageOf(key)) && !pageClaimed(pageOf(key)) ? key : null };
  S.xp += V19W_XP[i] - XP_TRIP; const prev = S.level; if (addXp(XP_TRIP)) setTimeout(() => showLevelUp(prev), 700);
  setTimeout(() => SND.play("back"), 150);
  save();
};
const _storyCardV19 = storyCard;
storyCard = function () {
  let h = _storyCardV19(); const t = L(); const a = v19a();
  if (story && story.tani && story.tani !== SEEDS_TRIP) h = h.replace(`+${SEEDS_TRIP} ${t.seeds}`, `+${story.tani} ${t.seeds}`);
  const c = story && cardInfo(story.card);
  if (c && c.rare) h = h.replace('<div class="pcbig">', `<div class="pcbig rarepc"><span class="rarebadge">${esc(a.rare)}</span>`);
  const extra = (story && story.stamp ? `<p class="small okline">${icon("check")} ${esc(a.stamp(story.stamp[0], story.stamp[1]))}</p>` : "")
    + (story && story.page ? `<p class="small storypage">${icon("card")} ${esc(a.ready)}</p>` : "");
  if (extra) h = h.replace('<button class="btn" id="storyOk">', extra + `${story && story.page ? `<button class="btn ghost" id="storyAlbum">${esc(a.open(albumStats().have, albumStats().total))}</button>` : ""}<button class="btn" id="storyOk">`);
  return h;
};

/* --- Rientro al più tardi alle 7 se si parte di notte --- */
function capNight() {
  if (!S.away || S.away.c7) return; S.away.c7 = 1;
  const start = S.away.until - destByKey(S.away.dest).h * 3600000; const d0 = new Date(start);
  if (d0.getHours() < 7) { const seven = new Date(d0); seven.setHours(7, 0, 0, 0); if (S.away.until > seven.getTime()) S.away.until = Math.max(start + 3600000, seven.getTime()); }
  save();
}

/* --- Album: pagine e premi --- */
function albumPages() {
  const { fant, real, world } = destList(); const pages = [];
  fant.forEach((d, k) => pages.push({ key: d.key, name: d.name, cards: d.cards, lvl: d.lvl, tier: k, fant: true, sv: d.key.startsWith("v:") ? "sv_" + d.key.split(":")[1] : null }));
  if (real.length) pages.push({ key: "real:" + S.lang, name: L().realT, cards: real.flatMap((d) => d.cards), lvl: Math.min(...real.map((d) => d.lvl)), tier: 2, real: true });
  if (world && world.length && (plusActive() || world.some((d) => S.cards.includes(d.cards[0])))) pages.push({ key: "world", name: L().worldT, cards: world.flatMap((d) => d.cards), lvl: 1, tier: 8, world: true });
  return pages;
}
const pageOf = (destKey) => (destKey.startsWith("r:") ? "real:" + destKey.split(":")[1] : destKey.startsWith("w:") ? "world" : destKey);
const pageFind = (key) => albumPages().find((p) => p.key === key);
function pageDone(key) { const p = typeof key === "string" ? pageFind(key) : key; return !!p && p.cards.every((c) => S.cards.includes(c)); }
const pageClaimed = (key) => !!(S.pages && S.pages[key]);
const pageTani = (p) => (p.world ? 300 : p.real ? 150 : 100 + 25 * p.tier);
function albumStats() { const ps = albumPages(); const all = ps.flatMap((p) => p.cards); return { have: all.filter((c) => S.cards.includes(c)).length, total: all.length }; }
const fantPages = () => albumPages().filter((p) => p.fant);
function claimPage(key) {
  const p = pageFind(key); if (!p || !pageDone(p) || pageClaimed(key)) return;
  S.pages = S.pages || {}; S.pages[key] = dkey(); const n = pageTani(p); S.seeds += n;
  if (p.sv && !S.owned.includes(p.sv) && SHOP.find((x) => x.id === p.sv)) S.owned.push(p.sv);
  save(); toast(v19a().got(n)); SND.play("coin"); burst("star", 14); trackOnce("album-pagina-" + key);
  if (story && story.page === key) story.page = null;
  if (!S.albumFull && fantPages().every((q) => pageClaimed(q.key))) { S.albumFull = dkey(); S.seeds += 1000; if (!S.owned.includes("sv_album") && SHOP.find((x) => x.id === "sv_album")) S.owned.push("sv_album"); save(); setTimeout(albumFullParty, 500); }
}
function albumFullParty() {
  const a = v19a(); const nm = (L().items || {}).sv_album || "";
  layer.innerHTML = `<div class="overlay levelup" role="dialog" aria-modal="true" aria-labelledby="afT2"><div class="box card"><div class="rays" aria-hidden="true"></div><div class="badge" id="afT2">${esc(a.fullT)}</div><div class="spitem">${itemArt("sv_album")}</div><p><strong>${esc(a.fullP(nm))}</strong></p><button class="btn" id="closeLayer">${esc(L().ok)}</button></div></div>`;
  SND.play("fanfare"); burst("confetti", 40); trackOnce("album-completo");
}
let albumPage = null;
function albumPageHTML(p) {
  const a = v19a(); const t = L(); const have = p.cards.filter((c) => S.cards.includes(c)).length; const locked = p.fant && S.level < p.lvl;
  const cards = p.cards.map((ck) => {
    if (S.cards.includes(ck)) { const c = cardInfo(ck); return `<button class="post ${c.rare ? "rarepc" : ""}" data-card="${ck}">${c.rare ? `<span class="rarebadge">${esc(a.rare)}</span>` : ""}${c.art()}<span>${esc(c.title)}</span></button>`; }
    const rare = ck.startsWith("v:") && ck.endsWith(":3");
    return `<div class="post missing ${rare ? "rarepc" : ""}">${rare ? `<span class="rarebadge">${esc(a.rare)}</span>` : ""}<div class="q">${locked ? "" : "?"}</div><span></span></div>`;
  }).join("");
  const sv = p.sv && (t.items || {})[p.sv]; const n = pageTani(p);
  let foot;
  if (pageClaimed(p.key)) foot = `<p class="small okline">${icon("check")} ${esc(a.claimed)}</p>`;
  else if (pageDone(p)) foot = `<button class="btn gold block" id="pageClaim" data-page="${p.key}">${SEED}${esc(a.claim)} · +${n}</button>`;
  else foot = `<p class="small muted apgoal">${esc(sv ? a.rewardIt(n, sv) : a.reward(n))}</p>`;
  const vis = p.fant && S.wvis && S.wvis[p.key] ? S.wvis[p.key] : 0; const nx = STAMPS.find((x) => x[0] > vis);
  const visLine = p.fant && vis ? `<p class="small muted">${esc(a.visits(vis))}${nx ? ` · ${esc(a.nextStamp(nx[0]))}` : ""}</p>` : "";
  const lockLine = locked ? `<p class="aplock">${icon("lock")}<span>${esc(a.locked(p.lvl))}</span></p>` : "";
  return `<div class="appage ${locked ? "aplocked" : ""}">${lockLine}<div class="aphead"><h3>${esc(p.name)}</h3><span class="small muted">${esc(a.page(have, p.cards.length))}</span></div>${visLine}<div class="album">${cards}</div>${foot}</div>`;
}
function openAlbum(key) {
  const a = v19a(); const ps = albumPages(); const st = albumStats();
  if (key) albumPage = key; if (!albumPage || !ps.find((p) => p.key === albumPage)) { const ready = ps.find((p) => pageDone(p) && !pageClaimed(p.key)); albumPage = (ready || ps.find((p) => !pageDone(p) && !(p.fant && S.level < p.lvl)) || ps[0]).key; }
  const p = ps.find((x) => x.key === albumPage);
  const chips = ps.map((q) => { const dn = pageDone(q), cl = pageClaimed(q.key); const lk = q.fant && S.level < q.lvl; return `<button class="chip apchip ${q.key === albumPage ? "on" : ""} ${lk ? "lk" : ""}" data-apage="${q.key}" aria-pressed="${q.key === albumPage}">${lk ? icon("lock") : dn && !cl ? `<i class="apdot" aria-hidden="true"></i>` : dn ? icon("check") : ""}${esc(q.name)}</button>`; }).join("");
  const svAll = (L().items || {}).sv_album;
  layer.innerHTML = `<div class="overlay albumov" role="dialog" aria-modal="true" aria-labelledby="alT"><div class="box albox"><div class="alhead"><div><h2 id="alT">${esc(a.albumT)}</h2><p class="small muted">${esc(a.page(st.have, st.total))}</p></div><button class="iconbtn" id="closeLayer" aria-label="${esc(L().close)}">${icon("x")}</button></div>
    <div class="apchips">${chips}</div>${albumPageHTML(p)}
    <p class="small muted alhint">${esc(a.hint)}${svAll && !S.albumFull ? (/^(ja|zh|zht)$/.test(S.lang) ? "" : " ") + esc(a.fullGoal(svAll)) : ""}</p></div></div>`;
  const on = layer.querySelector(".apchip.on"); if (on) try { on.scrollIntoView({ inline: "center", block: "nearest" }); } catch (e) { /* niente */ }
}

/* --- Pagina Avventure: mondi bloccati raccolti, album in una scheda --- */
/* Mentre si costruisce la pagina, le vecchie griglie dell'album e i disegni dei mondi ancora lontani non si preparano
   proprio (verrebbero buttati via): pagina più leggera e veloce. */
let tripsLite = false, tripsLocked = 0;
const _albumGridV19 = albumGrid;
albumGrid = function (list) { return tripsLite ? '<div class="album"></div>' : _albumGridV19(list); };
const _destBtnV19 = destBtn;
destBtn = function (d) {
  if (tripsLite && d.key.startsWith("v:") && S.level < d.lvl && tripsLocked++ > 0) return `<button class="dest locked" disabled data-dest="${d.key}"></button>`;
  return _destBtnV19(d);
};
const _viewTripsV19 = viewTrips;
let tripsMemo = ["", ""];
viewTrips = function () {
  tripsLite = true; tripsLocked = 0; let h; try { h = _viewTripsV19(); } finally { tripsLite = false; }
  const key = h + "|" + JSON.stringify(S.wvis || {}) + JSON.stringify(S.pages || {}) + S.cards.length + "|" + S.level + S.lang;
  if (tripsMemo[0] === key) return tripsMemo[1];
  const out = tripsDecorate(h); tripsMemo = [key, out]; return out;
};
function tripsDecorate(h) {
  const a = v19a(); const tpl = document.createElement("template"); tpl.innerHTML = h;
  const st = tpl.content.querySelector(".stack"); if (!st) return h;
  /* album: via le griglie, al loro posto un pulsante */
  const albSec = [...st.querySelectorAll(":scope > .sec")].find((el) => el.querySelector("h2") && el.querySelector("h2").textContent === L().albumT);
  if (albSec) { let n = albSec.nextElementSibling; while (n && (n.tagName === "H3" || n.classList.contains("album"))) { const x = n.nextElementSibling; n.remove(); n = x; } albSec.remove(); }
  st.querySelectorAll(".worldsec h3, .worldsec .album").forEach((el) => el.remove());
  const s = albumStats(); const ready = albumPages().some((p) => pageDone(p) && !pageClaimed(p.key));
  const btn = document.createElement("template");
  btn.innerHTML = `<button class="albumbtn ${ready ? "ready" : ""}" id="openAlbum" type="button"><span class="abic">${icon("card")}</span><span class="abtx"><b>${esc(a.albumT)}</b><small>${esc(a.page(s.have, s.total))}</small></span>${ready ? `<span class="abdot">${esc(a.claim)}</span>` : `<span class="pchev">›</span>`}</button>`;
  const fantH = [...st.querySelectorAll(":scope > h2")].find((el) => el.textContent === L().fantasyT);
  if (fantH) fantH.before(btn.content.firstElementChild); else st.append(btn.content.firstElementChild);
  /* mondi fantastici: si vedono quelli sbloccati e il prossimo; gli altri in una riga */
  const box = fantH && fantH.nextElementSibling; if (box) {
    const locked = [...box.querySelectorAll(".dest.locked")];
    if (locked.length > 1) {
      const rest = locked.slice(1); const lv = rest.map((el) => (destByKey(el.dataset.dest) || {}).lvl || 0);
      rest.forEach((el) => el.remove());
      const more = document.createElement("button"); more.className = "link small wmore"; more.id = "moreWorlds"; more.type = "button";
      more.textContent = a.more(rest.length, Math.min(...lv), Math.max(...lv)).replace(/(\d)\s?–\s?(\d)/, "$1\u2060–\u2060$2") + "\u00a0→"; box.after(more);
    }
    box.querySelectorAll(".dest").forEach((el) => { const k = el.dataset.dest; const v = S.wvis && S.wvis[k]; const m = el.querySelector(".meta .small"); if (v && m && !el.classList.contains("locked")) m.insertAdjacentHTML("beforeend", ` · ${esc(a.visits(v))}`); });
  }
  return tpl.innerHTML;
}

/* --- Chi è già oltre il livello 8: annuncio dei mondi nuovi (una volta) --- */
function newWorldsNotice() {
  if (S.v19w || !S.pet || layer.innerHTML || tab !== "today") return; S.v19w = dkey(); save();
  const n = V19W.filter((w) => S.level >= w.lvl).length; if (!n) return;
  const a = v19a(); const w = V19W[0];
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="nwT"><div class="box card nwbox"><div class="nwart">${worldArt(w.id, 3, wTxt(w.id).name)}</div><h2 id="nwT">${esc(a.newT)}</h2><p>${esc(a.newP(n))}</p><div class="row nwrow"><button class="btn" id="nwGo">${esc(a.go)}</button><button class="btn ghost" id="closeLayer">${esc(L().close)}</button></div></div></div>`;
  SND.play("sparkle"); if (anim) G.from(".nwbox", { scale: 0.85, opacity: 0, duration: 0.45, ease: "back.out(1.8)" });
}

const _renderV19w = render;
render = function () { capNight(); _renderV19w(); if (!S.v19w && S.pet) setTimeout(newWorldsNotice, 1500); };

document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "openAlbum" || b.id === "storyAlbum") { ev.stopImmediatePropagation(); SND.play("click"); openAlbum(b.id === "storyAlbum" && story ? story.page : null); return; }
  if (b.dataset.apage) { ev.stopImmediatePropagation(); SND.play("click"); openAlbum(b.dataset.apage); return; }
  if (b.id === "pageClaim") { ev.stopImmediatePropagation(); claimPage(b.dataset.page); if (layer.querySelector(".albox")) openAlbum(b.dataset.page); render(); return; }
  if (b.id === "moreWorlds") { ev.stopImmediatePropagation(); levelSheet(); return; }
  if (b.id === "nwGo") { ev.stopImmediatePropagation(); closeLayer(); tab = "trips"; render(); window.scrollTo(0, 0); return; }
  /* cartolina dall'album: dopo averla chiusa si torna all'album */
  if (b.dataset.card && b.closest(".albox")) { const pg = albumPage; setTimeout(() => { const cl = layer.querySelector("#closeLayer"); if (cl) cl.dataset.backAlbum = pg; }, 0); return; }
  if (b.id === "closeLayer" && b.dataset.backAlbum) { ev.stopImmediatePropagation(); openAlbum(b.dataset.backAlbum); return; }
}, true);

/* Ricordi dei mondi: nel negozio "Premio dell'album" (non "del sentiero") */
const _tryBarV19w = tryBar;
tryBar = function () {
  const h = _tryBarV19w(); const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId);
  if (!s || !s.souvenir || S.owned.includes(s.id)) return h;
  return h.replace(`<span class="tag">${L().season.fromPath}</span>`, `<span class="tag">${esc(v19a().fromAlbum)}</span>`);
};
const _shopItemV19w = shopItem;
shopItem = function (s) {
  const h = _shopItemV19w(s); if (!s.souvenir || S.owned.includes(s.id)) return h;
  return h.replace(`<span class="tag">${L().season.fromPath}</span>`, `<span class="tag">${esc(v19a().fromAlbum)}</span>`);
};
