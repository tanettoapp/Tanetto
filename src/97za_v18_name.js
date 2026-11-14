/* =================== v18 (1.0.4): il tuo nome nel saluto =================== */
/* In alto: "Buonasera, Luca" con la data a destra sulla stessa riga.
   Il nome e' facoltativo:
   1) all'inizio c'e' un passo veloce "Come ti chiami?" (con "Salta"); chi entra con Google lo trova gia' scritto;
   2) chi lo salta, o usava gia' l'app, puo' scriverlo dopo: da Altro ("Il tuo nome") o da una piccola scheda in home
      che si puo' chiudere e non torna piu';
   3) senza nome il saluto resta "Buonasera".
   Regole: solo lettere (di tutti gli alfabeti delle 14 lingue), al massimo 2 spazi (mai doppi, mai all'inizio o alla
   fine), da 2 a 20 caratteri, iniziali maiuscole in automatico, niente parolacce o bestemmie (14 lingue).
   Il nome resta sul telefono (e nel backup online, se c'e' l'account). Non deve essere unico. */
const V18N = {
  it: { stepT: "Come ti chiami?", stepP: "Il tuo compagno ti saluterà per nome. Puoi anche saltare e aggiungerlo quando vuoi.", label: "Il tuo nome", ph: "Il tuo nome", next: "Avanti", skip: "Salta", short: "Scrivi almeno 2 lettere.", bad: "Questo nome non si può usare. Provane un altro.", only: "Solo lettere e al massimo 2 spazi.", cardT: "Come ti chiami?", cardP: (p) => `Così ${p} potrà salutarti per nome.`, save: "Salva", close: "Chiudi", setT: "Il tuo nome", setP: (p) => `${p} lo usa per salutarti. Resta sul tuo telefono e non serve che sia unico.`, remove: "Togli il nome", saved: "Nome salvato", removed: "Nome tolto", greet: (g, n) => `${g}, ${n}` },
  en: { stepT: "What's your name?", stepP: "Your companion will greet you by name. You can skip this and add it whenever you like.", label: "Your name", ph: "Your name", next: "Next", skip: "Skip", short: "Please type at least 2 letters.", bad: "That name can't be used. Please try another one.", only: "Letters only, with at most 2 spaces.", cardT: "What's your name?", cardP: (p) => `So ${p} can greet you by name.`, save: "Save", close: "Close", setT: "Your name", setP: (p) => `${p} uses it to greet you. It stays on your phone and doesn't need to be unique.`, remove: "Remove name", saved: "Name saved", removed: "Name removed", greet: (g, n) => `${g}, ${n}` },
  de: { stepT: "Wie heißt du?", stepP: "Dein Begleiter begrüßt dich dann mit deinem Namen. Du kannst das auch überspringen und später nachholen.", label: "Dein Name", ph: "Dein Name", next: "Weiter", skip: "Überspringen", short: "Bitte mindestens 2 Buchstaben eingeben.", bad: "Diesen Namen kannst du nicht verwenden. Versuch einen anderen.", only: "Nur Buchstaben und höchstens 2 Leerzeichen.", cardT: "Wie heißt du?", cardP: (p) => `Dann kann ${p} dich mit Namen begrüßen.`, save: "Speichern", close: "Schließen", setT: "Dein Name", setP: (p) => `${p} begrüßt dich damit. Er bleibt auf deinem Handy und muss nicht einzigartig sein.`, remove: "Name entfernen", saved: "Name gespeichert", removed: "Name entfernt", greet: (g, n) => `${g}, ${n}` },
  es: { stepT: "¿Cómo te llamas?", stepP: "Tu compañero te saludará por tu nombre. También puedes saltarlo y añadirlo cuando quieras.", label: "Tu nombre", ph: "Tu nombre", next: "Siguiente", skip: "Saltar", short: "Escribe al menos 2 letras.", bad: "Ese nombre no se puede usar. Prueba con otro.", only: "Solo letras y como máximo 2 espacios.", cardT: "¿Cómo te llamas?", cardP: (p) => `Así ${p} podrá saludarte por tu nombre.`, save: "Guardar", close: "Cerrar", setT: "Tu nombre", setP: (p) => `${p} lo usa para saludarte. Se queda en tu teléfono y no tiene que ser único.`, remove: "Quitar el nombre", saved: "Nombre guardado", removed: "Nombre quitado", greet: (g, n) => `${g}, ${n}` },
  fr: { stepT: "Comment tu t'appelles ?", stepP: "Ton compagnon te saluera par ton prénom. Tu peux aussi passer et l'ajouter quand tu veux.", label: "Ton prénom", ph: "Ton prénom", next: "Suivant", skip: "Passer", short: "Écris au moins 2 lettres.", bad: "Ce prénom ne peut pas être utilisé. Essaie-en un autre.", only: "Seulement des lettres, avec 2 espaces au maximum.", cardT: "Comment tu t'appelles ?", cardP: (p) => `Comme ça, ${p} pourra te saluer par ton prénom.`, save: "Enregistrer", close: "Fermer", setT: "Ton prénom", setP: (p) => `${p} l'utilise pour te saluer. Il reste sur ton téléphone et n'a pas besoin d'être unique.`, remove: "Retirer le prénom", saved: "Prénom enregistré", removed: "Prénom retiré", greet: (g, n) => `${g}, ${n}` },
  pt: { stepT: "Qual é o seu nome?", stepP: "Seu companheiro vai te cumprimentar pelo nome. Você também pode pular e adicionar quando quiser.", label: "Seu nome", ph: "Seu nome", next: "Avançar", skip: "Pular", short: "Escreva pelo menos 2 letras.", bad: "Esse nome não pode ser usado. Tente outro.", only: "Só letras e no máximo 2 espaços.", cardT: "Qual é o seu nome?", cardP: (p) => `Assim ${p} pode te cumprimentar pelo nome.`, save: "Salvar", close: "Fechar", setT: "Seu nome", setP: (p) => `${p} usa para te cumprimentar. Fica no seu celular e não precisa ser único.`, remove: "Tirar o nome", saved: "Nome salvo", removed: "Nome removido", greet: (g, n) => `${g}, ${n}` },
  ja: { stepT: "あなたの名前は？", stepP: "パートナーが名前であいさつしてくれます。スキップして、あとから追加することもできます。", label: "あなたの名前", ph: "あなたの名前", next: "次へ", skip: "スキップ", short: "2文字以上で入力してください。", bad: "この名前は使えません。別の名前にしてね。", only: "文字のみ、スペースは2つまでです。", cardT: "あなたの名前は？", cardP: (p) => `${p}が名前であいさつしてくれます。`, save: "保存", close: "閉じる", setT: "あなたの名前", setP: (p) => `${p}があいさつに使います。この端末にだけ保存され、ほかの人と同じ名前でも大丈夫です。`, remove: "名前を消す", saved: "名前を保存しました", removed: "名前を消しました", greet: (g, n) => `${/(さん|くん|ちゃん|さま|様|君)$/.test(n) ? n : n + "さん"}、${g}` },
  ko: { stepT: "이름이 뭐예요?", stepP: "친구가 이름을 불러 인사해 줄 거예요. 건너뛰고 나중에 추가해도 돼요.", label: "내 이름", ph: "내 이름", next: "다음", skip: "건너뛰기", short: "2글자 이상 입력해 주세요.", bad: "이 이름은 사용할 수 없어요. 다른 이름을 입력해 주세요.", only: "글자만, 띄어쓰기는 2개까지 가능해요.", cardT: "이름이 뭐예요?", cardP: () => "이름을 알려 주면 이름을 불러 인사해 줄게요.", save: "저장", close: "닫기", setT: "내 이름", setP: () => "인사할 때 사용해요. 이 휴대폰에만 저장되고, 다른 사람과 같아도 괜찮아요.", remove: "이름 지우기", saved: "이름을 저장했어요", removed: "이름을 지웠어요", greet: (g, n) => `${/(님|씨)$/.test(n) ? n : n + "님"}, ${g}` },
  zh: { stepT: "你叫什么名字？", stepP: "你的小伙伴会叫着你的名字跟你打招呼。也可以先跳过，之后随时添加。", label: "你的名字", ph: "你的名字", next: "下一步", skip: "跳过", short: "请至少输入 2 个字。", bad: "这个名字不能使用，换一个吧。", only: "只能输入文字，最多 2 个空格。", cardT: "你叫什么名字？", cardP: (p) => `这样${p}就能叫着你的名字打招呼了。`, save: "保存", close: "关闭", setT: "你的名字", setP: (p) => `${p}会用它跟你打招呼。名字只保存在你的手机上，和别人重名也没关系。`, remove: "删除名字", saved: "名字已保存", removed: "名字已删除", greet: (g, n) => `${n}，${g}` },
  zht: { stepT: "你叫什麼名字？", stepP: "你的小夥伴會叫著你的名字跟你打招呼。也可以先略過，之後隨時新增。", label: "你的名字", ph: "你的名字", next: "下一步", skip: "略過", short: "請至少輸入 2 個字。", bad: "這個名字不能使用，換一個吧。", only: "只能輸入文字，最多 2 個空格。", cardT: "你叫什麼名字？", cardP: (p) => `這樣${p}就能叫著你的名字打招呼了。`, save: "儲存", close: "關閉", setT: "你的名字", setP: (p) => `${p}會用它跟你打招呼。名字只儲存在你的手機上，和別人同名也沒關係。`, remove: "刪除名字", saved: "名字已儲存", removed: "名字已刪除", greet: (g, n) => `${n}，${g}` },
  ru: { stepT: "Как тебя зовут?", stepP: "Твой питомец будет приветствовать тебя по имени. Можно пропустить и добавить имя позже.", label: "Твоё имя", ph: "Твоё имя", next: "Далее", skip: "Пропустить", short: "Напиши хотя бы 2 буквы.", bad: "Это имя использовать нельзя. Попробуй другое.", only: "Только буквы и не больше 2 пробелов.", cardT: "Как тебя зовут?", cardP: (p) => `Тогда ${p} сможет приветствовать тебя по имени.`, save: "Сохранить", close: "Закрыть", setT: "Твоё имя", setP: (p) => `${p} приветствует тебя по имени. Оно хранится только на телефоне и не обязано быть уникальным.`, remove: "Убрать имя", saved: "Имя сохранено", removed: "Имя убрано", greet: (g, n) => `${g}, ${n}` },
  pl: { stepT: "Jak masz na imię?", stepP: "Twój towarzysz będzie witać cię po imieniu. Możesz to pominąć i dodać imię później.", label: "Twoje imię", ph: "Twoje imię", next: "Dalej", skip: "Pomiń", short: "Wpisz co najmniej 2 litery.", bad: "Tego imienia nie można użyć. Spróbuj innego.", only: "Tylko litery i najwyżej 2 spacje.", cardT: "Jak masz na imię?", cardP: (p) => `Wtedy ${p} będzie witać cię po imieniu.`, save: "Zapisz", close: "Zamknij", setT: "Twoje imię", setP: (p) => `${p} używa go na powitanie. Zostaje na twoim telefonie i nie musi być unikalne.`, remove: "Usuń imię", saved: "Imię zapisane", removed: "Imię usunięte", greet: (g, n) => `${g}, ${n}` },
  nl: { stepT: "Hoe heet je?", stepP: "Je maatje begroet je dan met je naam. Je kunt dit ook overslaan en later toevoegen.", label: "Je naam", ph: "Je naam", next: "Volgende", skip: "Overslaan", short: "Typ minstens 2 letters.", bad: "Deze naam kan niet. Probeer een andere.", only: "Alleen letters en maximaal 2 spaties.", cardT: "Hoe heet je?", cardP: (p) => `Dan kan ${p} je met je naam begroeten.`, save: "Opslaan", close: "Sluiten", setT: "Je naam", setP: (p) => `${p} gebruikt hem om je te begroeten. Hij blijft op je telefoon en hoeft niet uniek te zijn.`, remove: "Naam weghalen", saved: "Naam opgeslagen", removed: "Naam weggehaald", greet: (g, n) => `${g}, ${n}` },
  tr: { stepT: "Adın ne?", stepP: "Arkadaşın seni adınla selamlayacak. İstersen atlayıp daha sonra ekleyebilirsin.", label: "Adın", ph: "Adın", next: "İleri", skip: "Atla", short: "En az 2 harf yaz.", bad: "Bu ad kullanılamaz. Başka bir ad dene.", only: "Sadece harf ve en fazla 2 boşluk.", cardT: "Adın ne?", cardP: (p) => `Böylece ${p} seni adınla selamlayabilir.`, save: "Kaydet", close: "Kapat", setT: "Adın", setP: (p) => `${p} seni selamlarken kullanır. Sadece telefonunda kalır ve benzersiz olması gerekmez.`, remove: "Adı kaldır", saved: "Ad kaydedildi", removed: "Ad kaldırıldı", greet: (g, n) => `${g} ${n}` }
};
const v18n = () => V18N[S.lang] || V18N.en;
const NAME_MAX = 20, NAME_MIN = 2, NAME_SPACES = 2;

/* --- Pulizia mentre si scrive: solo lettere, niente spazi all'inizio o doppi, al massimo 2 spazi, 20 caratteri --- */
function nameClean(v) {
  let s = String(v || "").normalize("NFC").replace(/[^\p{L}\p{M} ]/gu, "");
  s = s.replace(/^ +/, "").replace(/ {2,}/g, " ");
  const parts = s.split(" "); if (parts.length > NAME_SPACES + 1) s = parts.slice(0, NAME_SPACES + 1).join(" "); /* dal terzo spazio in poi si taglia */
  s = s.replace(/^\p{M}+/u, "");
  return Array.from(s).slice(0, NAME_MAX).join("");
}
/* --- Iniziali maiuscole (rispettando le lingue, es. turco i -> İ) --- */
function nameCap(s) {
  const lc = S.lang === "tr" ? "tr" : undefined;
  return s.split(" ").map((w) => {
    if (!w) return w; const a = Array.from(w); const first = a[0].toLocaleUpperCase(lc); const rest = a.slice(1).join("");
    /* "luca", "LUCA", "lUCA" -> "Luca"; chi scrive gia' bene (es. "McDonald") resta com'e' */
    const same = rest === rest.toLocaleLowerCase(lc) || w === w.toLocaleUpperCase(lc) || a[0] !== first;
    return first + (same ? rest.toLocaleLowerCase(lc) : rest);
  }).join(" ");
}

/* --- Filtro parolacce e bestemmie (14 lingue) ---
   W = parole che non si possono usare da sole (si confronta la parola intera: cosi' "Cassandra" o "Kasumi" vanno bene);
   P = radici lunghe e inconfondibili, cercate anche dentro il nome (per trucchi come "porcoddio" o nome e cognome attaccati).
   Prima del confronto: minuscole, accenti tolti, 0/1/3/4/5/7 come lettere, katakana come hiragana; lettere ripetute ammesse. */
const BADW = {
  it: "cazzo cazzi cazzata merda stronzo stronza troia puttana culo coglione cogliona minchia figa fica pirla mignotta zoccola bastardo bastarda porco porca frocio ricchione negro negra scemo scema idiota cretino cretina deficiente sfigato sfigata vaffanculo fottiti",
  en: "fuck fucker fucking fuk shit shitty bitch cunt asshole bastard cock pussy whore slut twat wanker nigger nigga faggot fag retard motherfucker bullshit piss porn sex anal penis vagina boobs tits dildo idiot stupid dumbass jackass hitler nazi",
  de: "scheisse scheiß arschloch arsch fotze hure wichser schlampe ficken fick missgeburt hurensohn spast schwuchtel neger idiot depp vollidiot mistkerl drecksau",
  es: "puta puto mierda coño cabron cabrón pendejo pendeja gilipollas joder polla verga culo marica maricon maricón zorra chingar chinga pinche cojones carajo mamon perra imbecil imbécil idiota",
  fr: "merde putain pute salope connard connasse conne encule enculé bite couille couilles chier nique niquer pede pédé batard bâtard enfoire enfoiré branleur bordel cul foutre pd ntm fdp salaud",
  pt: "porra caralho merda puta puto foda foder fodase buceta viado bicha otario otário cuzao cuzão arrombado desgracado desgraçado vadia piranha cacete babaca corno pqp vsf fdp",
  ru: "блять бля блядь сука хуй хуйня пизда пиздец ебать ебал мудак мудила гандон пидор пидорас шлюха говно жопа залупа хер дебил долбоеб долбоёб ублюдок сучка мразь урод",
  pl: "kurwa chuj huj pizda jebac jebać pierdolic pierdolić skurwysyn dziwka cipa kutas dupa spierdalaj pedal pedał debil szmata zjeb jebany",
  nl: "klootzak kanker tering tyfus hoer godverdomme mongool eikel slet neuken kutwijf flikker sukkel debiel shit kankerlijer",
  tr: "amk aq orospu piç sikik siktir sikerim yarrak yarak göt götveren ibne kahpe pezevenk amcık gavat şerefsiz puşt sürtük salak",
  ja: "ばか あほ かす ぶす でぶ しね くそ ころす きもい うざい",
  ko: "년 놈 썅 꺼져 닥쳐 병신 미친",
  zh: "滚 滾 操 艹 贱 賤 骚 騷 屎"
};
const BADP = {
  it: "porcodio dioporco diocane diocan dioporc porcamadonna porcamadon madonnaputtana madonnatroia diobestia diomerda vaffancul fanculo puttan stronz coglion mignott zoccol cazzon",
  en: "fuck nigger nigga faggot motherf bitch whore asshol bullshit shithead dickhead",
  de: "arschloch hurensohn wichser schlampe fotze scheiss scheiß ficken missgeburt schwuchtel",
  es: "hijodeputa hijoputa hijaputa gilipol pendej maricon chingad putamadre mecagoen malparid",
  fr: "encul salope connard connass putain niquetamere enfoire filsdepute",
  pt: "caralh filhodaput filhadaput buceta arrombad fodase vaitomarnocu putaquepariu",
  ru: "хуй хуе хуя пизд ебат ебан ебал блят бляд мудак пидор пидар долбоеб залуп гандон шлюх",
  pl: "kurw skurwy pierdol jeban jebac spierdal wypierd pizd chuj",
  nl: "godverdom klootzak kanker tyfus kutwijf kankerlijer hoerenjong",
  tr: "orospu siktir sikerim yarrak aminakoy amcik pezevenk gotveren serefsiz",
  ja: "ちんこ ちんぽ まんこ うんこ きちがい ちくしょう やりまん せっくす ふぁっく 死ね 殺す 基地外 気違い 畜生 くそったれ ころすぞ",
  ko: "씨발 시발 씨빨 씨바 개새끼 새끼 병신 좆 존나 미친놈 미친년 지랄 엿먹어 보지 자지 니미 느금마 섹스",
  zh: "操你 草你 肏 他妈 他媽 妈的 媽的 傻逼 傻b 煞笔 屄 逼 鸡巴 雞巴 王八蛋 混蛋 婊子 贱人 賤人 去死 狗屎 屌 卧槽 我操 干你娘 幹你娘 机掰 機掰 靠北 靠夭 日你 草泥马 草泥馬 你妈 你媽"
};
function badNorm(s) {
  s = String(s).normalize("NFKC").toLowerCase().replace(/ı/g, "i").replace(/ß/g, "ss");
  s = s.normalize("NFD").replace(/([\p{Script=Latin}\p{Script=Cyrillic}\p{Script=Greek}])\p{M}+/gu, "$1").normalize("NFC");
  s = s.replace(/[0134578@$]/g, (c) => ({ 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t", 8: "b", "@": "a", $: "s" }[c]));
  s = s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  return s;
}
/* Le lettere ripetute ("fuuuck", "porcoddio") non ingannano il filtro: ogni lettera puo' essere ripetuta.
   Per le parole intere basta una lettera; per le radici cercate dentro il nome restano le doppie (cosi' "Cazzaniga" va bene). */
const rxEsc = (c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function badRx(w, keepDoubles) {
  const runs = Array.from(w).reduce((a, c) => { const l = a[a.length - 1]; if (l && l[0] === c) l[1]++; else a.push([c, 1]); return a; }, []);
  return runs.map(([c, k]) => rxEsc(c) + (keepDoubles && k > 1 ? `{${k},}` : "+")).join("");
}
let BAD_W = null, BAD_P = null; /* due espressioni regolari costruite una volta sola */
function badInit() {
  if (BAD_W) return; const ws = new Set(), ps = new Set();
  Object.values(BADW).forEach((l) => l.split(" ").forEach((w) => { if (w) ws.add(badRx(badNorm(w), false)); }));
  Object.values(BADP).forEach((l) => l.split(" ").forEach((w) => { if (w) ps.add(badRx(badNorm(w), true)); }));
  BAD_W = new RegExp(`^(?:${[...ws].join("|")})$`, "u"); BAD_P = new RegExp(`(?:${[...ps].join("|")})`, "u");
}
function nameBad(name) {
  badInit();
  const words = badNorm(name).split(" ").filter(Boolean); const joined = words.join("");
  if (words.some((w) => BAD_W.test(w)) || BAD_W.test(joined)) return true;
  return BAD_P.test(joined);
}
/* Controllo finale: "" se va bene, altrimenti il messaggio gentile da mostrare */
function nameCheck(raw) {
  const t = v18n(); const s = nameClean(raw).trim();
  if (Array.from(s).length < NAME_MIN) return { err: t.short };
  if (nameBad(s)) return { err: t.bad };
  return { err: "", name: nameCap(s) };
}
const userName = () => (typeof S.uname === "string" && S.uname ? S.uname : "");

/* --- Saluto: "Buonasera, Luca" a sinistra, data a destra (corta sui telefoni stretti) --- */
greetLine = function () {
  const t = L(); const n = userName(); const g = t.greet[phase()];
  const now = new Date();
  let dl = intlDT(loc(), { weekday: "long", day: "numeric", month: "long" }).format(now); dl = dl.charAt(0).toUpperCase() + dl.slice(1);
  let ds = intlDT(loc(), { weekday: "short", day: "numeric", month: "short" }).format(now); ds = ds.charAt(0).toUpperCase() + ds.slice(1);
  const hi = n ? v18n().greet(g, n) : g;
  return `<div class="greet g18${n ? " named" : ""}"><span class="gw">${esc(hi)}</span><span class="gd"><span class="gdl">${esc(dl)}</span><span class="gds">${esc(ds)}</span></span></div>`;
};

/* --- Passo "Come ti chiami?" all'inizio (dopo la schermata di accesso, prima di scegliere il compagno) --- */
let v18gName = "";
const nameStepNow = () => !S.pet && S.onboard === 0 && !S.nameAsked && !(typeof gateNeeded === "function" && gateNeeded());
const _viewOnboardV18 = viewOnboard;
viewOnboard = function () {
  const h = _viewOnboardV18();
  if (!nameStepNow()) return h;
  const t = v18n(); const cut = h.indexOf('<div class="stack">'); const top = cut > 0 ? h.slice(0, cut) : "";
  const val = nameClean(S.uname || v18gName || "");
  return `${top}<div class="stack namestep"><div class="onbtop"><span class="spacer"></span><button class="link small onbskip" id="nameSkip" type="button">${esc(t.skip)}</button></div>
    <div class="nspet" aria-hidden="true">${petSVG(draftPet || "germo", "felice", null, 0, "")}</div>
    <h1>${esc(t.stepT)}</h1><p class="muted">${esc(t.stepP)}</p>
    <div class="field"><label for="userName">${esc(t.label)}</label><input id="userName" class="nameinp" maxlength="${NAME_MAX}" autocomplete="given-name" autocapitalize="words" spellcheck="false" enterkeyhint="next" placeholder="${esc(t.ph)}" value="${esc(val)}"></div>
    <p class="small nameerr" id="nameErr" role="alert" aria-live="polite"></p>
    <div class="row"><span class="spacer"></span><button class="btn" id="nameNext">${esc(t.next)}</button></div>
    <div class="row" style="justify-content:center"><button class="link" id="iosHave" type="button">${esc(L().v13.ios.have)}</button></div></div>`; /* 1.0.9: chi torna (account o copia) lo trova subito */
};
function nameFocus() {
  const i = document.getElementById("userName"); if (!i) return;
  try { i.focus({ preventScroll: true }); const l = i.value.length; i.setSelectionRange(l, l); } catch (e) { /* niente */ }
}
/* data corta solo se il saluto non ci sta per intero */
function greetFit() {
  const g = document.querySelector(".greet.g18.named"); if (!g) return;
  const w = g.querySelector(".gw"); g.classList.remove("shortd");
  if (w && w.scrollWidth > w.clientWidth + 1) g.classList.add("shortd");
}
window.addEventListener("resize", () => { if (document.querySelector(".greet.g18.named")) greetFit(); });
const _renderV18n = render;
render = function () {
  const was = !!document.getElementById("userName"); _renderV18n(); greetFit();
  if (!was && nameStepNow() && document.getElementById("userName")) { nameFocus(); if (anim) G.from(".nspet", { y: 14, scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(2)" }); }
};
function nameSave(raw, errId) {
  const r = nameCheck(raw); const e = errId && document.getElementById(errId);
  if (r.err) { if (e) e.textContent = r.err; const i = e && e.parentElement && e.parentElement.querySelector("input"); if (i) shake(i); SND.play("miss"); return false; }
  S.uname = r.name; save(); trackOnce("nome-inserito"); return true;
}

/* --- Scheda gentile in home (si chiude e non torna) --- */
function nameCardHtml() {
  if (!S.pet || userName() || S.nameCardOff || tab !== "today" || full) return "";
  if (S.nameSkipDay && S.nameSkipDay === S.day) return ""; /* chi ha appena saltato il passo non la rivede lo stesso giorno */
  const t = v18n();
  return `<div class="card namecard" id="nameCard"><button class="iconbtn ncx" id="nameCardX" aria-label="${esc(t.close)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button><div class="nchead"><span class="ncpet" aria-hidden="true">${petSVG(S.pet, "felice", S.hat, stage(), "")}</span><div><b>${esc(t.cardT)}</b><p class="small muted">${esc(t.cardP(S.petName))}</p></div></div><div class="inline ncrow"><input id="nameCardIn" class="nameinp" maxlength="${NAME_MAX}" autocomplete="given-name" autocapitalize="words" spellcheck="false" enterkeyhint="done" placeholder="${esc(t.ph)}" aria-label="${esc(t.label)}"><button class="btn small" id="nameCardGo">${esc(t.save)}</button></div><p class="small nameerr" id="nameCardErr" role="alert" aria-live="polite"></p></div>`;
}
const _viewTodayV18 = viewToday;
viewToday = function () {
  const h = _viewTodayV18(); const c = nameCardHtml(); if (!c) return h;
  const k = h.indexOf('<div class="row"><button class="link" data-tab="more" data-focus="goals"');
  if (k < 0) return h;
  const end = h.indexOf("</div>", k); return end < 0 ? h : h.slice(0, end + 6) + c + h.slice(end + 6);
};

/* --- Altro: "Il tuo nome" --- */
function nameSetHtml() {
  const t = v18n(); const n = userName();
  return `<div class="card stack-s venter nameset" id="nameSet"><h3>${esc(t.setT)}</h3><p class="small muted">${esc(t.setP(S.petName))}</p><div class="inline"><input id="nameSetIn" class="nameinp" maxlength="${NAME_MAX}" autocomplete="given-name" autocapitalize="words" spellcheck="false" enterkeyhint="done" placeholder="${esc(t.ph)}" aria-label="${esc(t.label)}" value="${esc(n)}"><button class="btn small" id="nameSetGo">${esc(t.save)}</button></div><p class="small nameerr" id="nameSetErr" role="alert" aria-live="polite"></p>${n ? `<button class="link small" id="nameSetDel">${esc(t.remove)}</button>` : ""}</div>`;
}
const _viewMoreV18n = viewMore;
viewMore = function () {
  const h = _viewMoreV18n(); const card = nameSetHtml();
  /* subito dopo la scheda del compagno */
  const k = h.indexOf('<div class="card petcard'); if (k < 0) return h.replace('<div class="stack pmore">', '<div class="stack pmore">' + card);
  let depth = 0, i = k; const re = /<div\b|<\/div>/g; re.lastIndex = k;
  for (let m; (m = re.exec(h));) { depth += m[0] === "</div>" ? -1 : 1; if (depth === 0) { i = m.index + 6; break; } }
  return h.slice(0, i) + card + h.slice(i);
};

/* --- Tocchi e scrittura --- */
function nameInputLive(inp, errId) {
  const v = inp.value; const c = nameClean(v); const e = document.getElementById(errId);
  if (c !== v) { const pos = inp.selectionStart; inp.value = c; try { const p = Math.max(0, Math.min(c.length, (pos || 0) - (v.length - c.length))); inp.setSelectionRange(p, p); } catch (x) { /* niente */ } if (e) { e.textContent = v18n().only; e.dataset.at = String(Date.now()); } }
  /* il messaggio sulle regole resta qualche secondo, poi sparisce scrivendo */
  else if (e && e.textContent && Date.now() - (+e.dataset.at || 0) > 2500) e.textContent = "";
}
const NAME_INPUTS = { userName: "nameErr", nameCardIn: "nameCardErr", nameSetIn: "nameSetErr" };
document.addEventListener("input", (ev) => {
  const el = ev.target; if (!el || !NAME_INPUTS[el.id]) return;
  if (ev.isComposing) return; /* tastiere giapponese, cinese, coreana: si pulisce solo a parola finita */
  nameInputLive(el, NAME_INPUTS[el.id]);
}, true);
document.addEventListener("compositionend", (ev) => { const el = ev.target; if (el && NAME_INPUTS[el.id]) nameInputLive(el, NAME_INPUTS[el.id]); }, true);
document.addEventListener("keydown", (ev) => {
  const el = ev.target; if (!el || !NAME_INPUTS[el.id] || ev.key !== "Enter" || ev.isComposing) return;
  ev.preventDefault(); const b = document.getElementById({ userName: "nameNext", nameCardIn: "nameCardGo", nameSetIn: "nameSetGo" }[el.id]); if (b) b.click();
}, true);
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  const t = v18n();
  if (b.id === "nameNext") {
    ev.stopImmediatePropagation(); const i = document.getElementById("userName"); const v = i ? i.value : "";
    if (!nameClean(v).trim()) { S.nameAsked = true; S.nameSkipDay = S.day; save(); SND.play("click"); render(); return; }
    if (!nameSave(v, "nameErr")) return;
    S.nameAsked = true; save(); SND.play("coin"); render(); return;
  }
  if (b.id === "nameSkip") { ev.stopImmediatePropagation(); S.nameAsked = true; S.nameSkipDay = S.day; save(); SND.play("click"); trackOnce("nome-saltato"); render(); return; }
  if (b.id === "nameCardGo") {
    ev.stopImmediatePropagation(); const i = document.getElementById("nameCardIn");
    if (!nameSave(i ? i.value : "", "nameCardErr")) return;
    SND.play("coin"); SND.haptic([10, 30, 10]); const y = window.scrollY; render(); window.scrollTo(0, y); toast(t.saved);
    const gw = document.querySelector(".greet .gw"); if (gw && anim) G.fromTo(gw, { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, .5)", transformOrigin: "0 50%" });
    if (typeof jump === "function") jump(false); return;
  }
  if (b.id === "nameCardX") { ev.stopImmediatePropagation(); S.nameCardOff = true; save(); SND.play("click"); const c = document.getElementById("nameCard"); const done = () => { const y = window.scrollY; render(); window.scrollTo(0, y); }; if (c && anim) G.to(c, { height: 0, opacity: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, duration: 0.3, ease: "power2.in", onComplete: done }); else done(); return; }
  if (b.id === "nameSetGo") {
    ev.stopImmediatePropagation(); const i = document.getElementById("nameSetIn");
    if (!nameSave(i ? i.value : "", "nameSetErr")) return;
    SND.play("coin"); const y = window.scrollY; render(); window.scrollTo(0, y); toast(t.saved); return;
  }
  if (b.id === "nameSetDel") { ev.stopImmediatePropagation(); S.uname = ""; save(); SND.play("click"); const y = window.scrollY; render(); window.scrollTo(0, y); toast(t.removed); }
}, true);

/* --- Chi entra con Google: il nome e' gia' proposto (si prende solo il nome di battesimo) --- */
function jwtGiven(tok) {
  try {
    const p = String(tok || "").split(".")[1]; if (!p) return "";
    const b = atob(p.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(p.length / 4) * 4, "="));
    const j = JSON.parse(decodeURIComponent(Array.from(b).map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join("")));
    return String(j.given_name || (j.name || "").split(" ")[0] || "");
  } catch (e) { return ""; }
}
if (typeof googleIdToken === "function") {
  const _googleIdTokenV18 = googleIdToken;
  googleIdToken = async function () { const tok = await _googleIdTokenV18(); const g = nameClean(jwtGiven(tok)).trim(); if (g && !nameBad(g) && Array.from(g).length >= NAME_MIN) v18gName = nameCap(g); return tok; };
}

