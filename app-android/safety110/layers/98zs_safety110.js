/* =================== 1.0.10 (versionCode 110): AGGIORNAMENTO SOLO DI SICUREZZA (14/11/2026) ===================
   Costruito dal sorgente esatto della 1.0.9. Due cose, niente altro:
   A) ETA' (audit M-01, E-10, CR-07, G2-07 + richiesta di recensione): a chi ha meno di 13 anni, a chi non ha detto l'eta'
      e a chi e' sotto l'eta' del consenso digitale del suo Paese (ageBand() diverso da "adult", la stessa regola "minori"
      che la 1.0.9 usa gia' per negozio e Plus in 98zf/98zj) non compare MAI da solo:
      1) la finestra "Prova Plus" (nav20plusDue / nav20plusOffer);
      2) "Invita un amico" nella finestra "Tutto fatto";
      3) la richiesta di recensione di Google Play (rev20Allowed di 98i e reviewEligible di 97m);
      4) i compagni Plus con la corona nel primo passo dell'inizio (finche' l'eta' non e' nota, se Plus non e' attivo);
      5) "Torna domani! Il regalo di domani varra' +N Tani..." e la fila dei 7 giorni: per loro una frase calma, senza
         numeri e senza serie.
      Plus, negozio e inviti restano raggiungibili quando li si apre di propria iniziativa. Per gli adulti non cambia nulla.
   B) MOMENTI DIFFICILI (audit M-01b, M-12, G3-01..03): riconoscimento delle frasi di crisi in 14 lingue nella chat E
      nel diario, in "Lascia andare" e nella capsula del tempo; tre livelli: FORTE (sempre), DEBOLE (solo se nella frase
      non c'e' un segno di modo di dire: "dal ridere", "capelli"...), LIEVE (parole come "morire" da sole, o "non voglio
      morire": un controllo gentile). Risposta sempre calma, mai allegra, con i numeri di aiuto del PAESE in cui si trova
      il telefono (fuso orario, poi regione del telefono, poi lingua), compresi quelli per bambini e ragazzi.
      Niente viene salvato o inviato: il controllo avviene solo sul telefono e non lascia tracce. L'app non e' una terapia
      e lo dice (helpP). Numeri verificati sui siti ufficiali il 14/11/2026: elenco e fonti in safety110/HELPLINES_FONTI.md. */

/* ---------------- A) ETA' ---------------- */
const sf110Minor = () => { try { return typeof ageBand !== "function" || ageBand() !== "adult"; } catch (e) { return true; } };
if (typeof nav20plusDue === "function") { const _nav20plusDue110 = nav20plusDue; nav20plusDue = function (...a) { if (sf110Minor()) return false; return _nav20plusDue110.apply(this, a); }; }
if (typeof nav20plusOffer === "function") { const _nav20plusOffer110 = nav20plusOffer; nav20plusOffer = function (...a) { if (sf110Minor()) return; return _nav20plusOffer110.apply(this, a); }; }
if (typeof rev20Allowed === "function") { const _rev20Allowed110 = rev20Allowed; rev20Allowed = function (...a) { if (sf110Minor()) return false; return _rev20Allowed110.apply(this, a); }; }
if (typeof reviewEligible === "function") { const _reviewEligible110 = reviewEligible; reviewEligible = function (...a) { if (sf110Minor()) return false; return _reviewEligible110.apply(this, a); }; }
/* "Invita un amico" dentro "Tutto fatto": il pulsante si toglie appena compare (prima che venga disegnato) */
function sf110Scrub() {
  try { if (!sf110Minor()) return; layer.querySelectorAll(".alldone #invite").forEach((b) => b.remove()); } catch (e) { /* niente */ }
}
try { new MutationObserver(sf110Scrub).observe(layer, { childList: true, subtree: true }); } catch (e) { /* niente */ }
if (typeof openAllDone === "function") { const _openAllDone110 = openAllDone; openAllDone = function (...a) { const r = _openAllDone110.apply(this, a); sf110Scrub(); return r; }; }
/* primo passo dell'inizio: niente compagni Plus con la corona finche' l'eta' non e' nota (o per i minori) */
if (typeof viewOnboard === "function") {
  const _viewOnboard110 = viewOnboard;
  viewOnboard = function (...a) {
    const h = _viewOnboard110.apply(this, a);
    try {
      if (S.pet || S.onboard !== 0 || h.indexOf("ppsec") < 0 || !sf110Minor() || (typeof plusActive === "function" && plusActive())) return h;
      const tpl = document.createElement("template"); tpl.innerHTML = h; tpl.content.querySelectorAll(".ppsec").forEach((x) => x.remove());
      return tpl.innerHTML;
    } catch (e) { return h; }
  };
}
/* "Torna domani!": per i minori nessun importo e nessuna serie di giorni */
const SF110_TZT = {
  it: ["A domani", "Ogni giorno in cui apri l'app c'è un piccolo regalo. Vieni quando vuoi."],
  en: ["See you tomorrow", "There's a small gift every day you open the app. Come whenever you like."],
  de: ["Bis morgen", "An jedem Tag, an dem du die App öffnest, gibt es ein kleines Geschenk. Komm, wann du magst."],
  es: ["Hasta mañana", "Cada día que abres la app hay un pequeño regalo. Vuelve cuando quieras."],
  fr: ["À demain", "Chaque jour où tu ouvres l'app, il y a un petit cadeau. Reviens quand tu veux."],
  pt: ["Até amanhã", "Todo dia que você abre o app tem um presentinho. Volte quando quiser."],
  ja: ["また明日ね", "アプリを開いた日には、毎日小さなプレゼントがあるよ。好きなときに来てね。"],
  ko: ["내일 또 봐요", "앱을 여는 날마다 작은 선물이 있어요. 오고 싶을 때 와요."],
  zh: ["明天见", "每天打开应用都会有一份小礼物。想来的时候再来吧。"],
  zht: ["明天見", "每天打開 App 都會有一份小禮物。想來的時候再來吧。"],
  ru: ["До завтра", "Каждый день, когда ты открываешь приложение, есть маленький подарок. Приходи, когда захочешь."],
  pl: ["Do jutra", "Każdego dnia, gdy otwierasz aplikację, jest mały prezent. Wracaj, kiedy chcesz."],
  nl: ["Tot morgen", "Elke dag dat je de app opent, is er een klein cadeautje. Kom wanneer je wilt."],
  tr: ["Yarın görüşürüz", "Uygulamayı açtığın her gün küçük bir hediye var. İstediğin zaman gel."],
};
if (typeof teaserCard === "function") {
  const _teaserCard110 = teaserCard;
  teaserCard = function (...a) {
    const h = _teaserCard110.apply(this, a);
    try {
      if (!sf110Minor()) return h;
      const x = SF110_TZT[S.lang] || SF110_TZT.en; const tpl = document.createElement("template"); tpl.innerHTML = h;
      const c = tpl.content.querySelector(".teaser"); if (!c) return h;
      const h3 = c.querySelector(".tz h3"); if (h3) h3.textContent = x[0];
      const p = c.querySelector(".tz p"); if (p) p.textContent = x[1];
      c.querySelectorAll(".gdots").forEach((d) => d.remove());
      c.querySelectorAll(":scope > p.small").forEach((d) => { if (/font-weight/.test(d.getAttribute("style") || "")) d.remove(); });
      return tpl.innerHTML;
    } catch (e) { return h; }
  };
}

/* ---------------- B) MOMENTI DIFFICILI: riconoscimento ---------------- */
/* testo normalizzato: minuscole, senza accenti, ß/ı/ł/ø semplificati, punteggiatura = spazio, lettere ripetute 3+ volte una
   sola ("moriiire"), spazi singoli. Gli apostrofi si provano in due modi: tolti ("dont", "jai") e come spazio ("j ai"). */
function sf110Norm(s, apos) {
  let x = String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC");
  x = x.replace(/ß/g, "ss").replace(/ı/g, "i").replace(/ł/g, "l").replace(/ø/g, "o").replace(/æ/g, "ae").replace(/œ/g, "oe");
  x = x.replace(/[\u2019\u2018`\u00b4'\u02bc]/g, apos ? " " : "");
  if (apos) x = x.replace(/(\p{L}n) t(?=\s|$)/gu, "$1t"); /* "don t" -> "dont" (inglese); il resto resta staccato ("j ai") */
  x = x.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/(\p{L})\1{2,}/gu, "$1").replace(/\s+/g, " ").trim();
  return x;
}
const SF110_CJK = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\uf900-\ufaff]/;
const sf110Esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const SF110_RE = new Map();
/* parola chiave: prefisso di parola (come kwHit della 1.0.9). "|" alla fine = parola intera; "$" alla fine = alla fine del
   messaggio; " ~ " = fino a 3 parole in mezzo. Cinese/giapponese/coreano: si confronta senza spazi. */
function sf110Re(k) {
  let r = SF110_RE.get(k); if (r) return r;
  let kw = k, end = "";
  if (kw.endsWith("$")) { kw = kw.slice(0, -1); end = "(?=\\s*$)"; } else if (kw.endsWith("|")) { kw = kw.slice(0, -1); end = "(?=$|[^\\p{L}\\p{N}])"; }
  const parts = kw.split(" ~ ").map((p) => sf110Norm(p, false).split(" ").map(sf110Esc).join("\\s+"));
  if (!end && kw.length <= 3) end = "(?=$|[^\\p{L}\\p{N}])";
  r = new RegExp(`(?:^|[^\\p{L}\\p{N}])${parts.join("(?:\\s+\\S+){0,3}?\\s+")}${end}`, "u"); SF110_RE.set(k, r); return r;
}
function sf110Hit(ms, k) {
  if (SF110_CJK.test(k)) { const kk = k.replace(/\s+/g, ""); return ms.some((m) => m.replace(/\s+/g, "").includes(kk)); }
  const re = sf110Re(k); return ms.some((m) => re.test(m));
}
/* S = forte, W = debole (vale solo senza G), G = segni di modo di dire, F = lieve (controllo gentile, solo senza G),
   N = frasi negate ("non voglio morire"): non contano come forti, ma danno il controllo gentile. Tutti in minuscolo, senza
   accenti (vengono normalizzati comunque). Base: elenchi della 1.0.9 (chat.K.crisis) senza le voci ambigue, + audit
   (GAPS3 lists.py, CRITIC_1 CR-01) + forme in prima persona, colloquiali, senza accenti e con errori di battitura. */
const SF110_ALL = { S: ["suicid", "kill myself", "want to die", "wanna die", "end my life", "self harm", "selfharm"], N: ["dont want to die", "do not want to die", "dont wanna die", "never want to die"] };
const SF110_K = {
  it: {
    S: ["suicid", "suicidarmi", "uccidermi", "ammazzarmi", "togliermi la vita", "non voglio piu vivere", "nn voglio piu vivere", "non voglio vivere", "non voglio ~ vivere|", "voglio morire", "voglio morir", "voglio morie", "vorrei morire", "vorrei essere mort", "voglio essere mort", "preferirei essere mort", "meglio se fossi mort", "meglio morto", "meglio morta", "farmi del male", "mi faccio del male", "autolesion", "non ha senso vivere", "non ha piu senso vivere", "vivere non ha senso", "non vale la pena vivere", "mi voglio ammazzare", "mi voglio uccidere", "voglio ammazzarmi", "voglio uccidermi", "mi ammazzo|$", "mi uccido|$", "tagliarmi le vene", "mi taglio le vene", "mi taglio i polsi", "tagliarmi i polsi", "mi taglio le braccia", "tagliarmi le braccia", "mi taglio di nuovo", "vorrei non esistere", "non voglio piu esistere", "non voglio esistere", "vorrei sparire per sempre", "voglio sparire per sempre", "sparire per sempre", "meglio se non ci fossi", "se non ci fossi piu", "starebbero meglio senza di me", "stanno meglio senza di me", "non ce la faccio piu a vivere", "non voglio piu stare al mondo", "farla finita con la vita", "voglio farla finita|$", "buttarmi dal", "buttarmi giu dal", "buttarmi sotto", "impiccarmi", "mi impicco", "mi voglio impiccare", "non voglio piu svegliarmi", "vorrei non svegliarmi piu", "togliere la vita", "se morissi", "sentirebbe la mia mancanza", "nessuno sentirebbe la mia mancanza"],
    W: ["farla finita", "mi taglio", "tagliarmi", "mi sono tagliat", "mi ammazzo", "mi uccido", "mi sono fatto del male", "mi sono fatta del male"],
    G: ["dal ridere", "dalle risate", "di fame", "di noia", "dal sonno", "dal caldo", "di caldo", "di freddo", "capelli", "frangia", "unghie", "barba", "compiti", "compito", "verifica", "per sbaglio", "dito", "cucinando", "giocando", "cadendo", "a calcio", "con la carta", "verdura", "pane", "con il coltello del pane", "partita"],
    F: ["morire|", "voglio sparire", "vorrei sparire", "voglio scomparire", "vorrei scomparire", "odio la mia vita", "odio vivere"],
    FG: ["da morire", "di fame", "dal ridere", "di noia", "dal sonno", "di caldo", "di freddo", "dalla voglia", "dalla vergogna", "vergogna", "sotto le coperte"],
    N: ["non voglio morire", "non vorrei morire", "non voglio mica morire"],
  },
  en: {
    S: ["suicid", "kill myself", "killing myself", "end my life", "ending my life", "take my own life", "take my life", "want to die", "wanna die", "wan to die", "want to be dead", "wanna be dead", "wish i was dead", "wish i were dead", "wish i could die", "dont want to live", "dont wanna live", "do not want to live", "dont want to be alive", "dont wanna be alive", "alive anymore", "no reason to live", "nothing to live for", "better off without me", "better off dead", "cant go on anymore", "cant go on like this", "cannot go on anymore", "kms|", "unalive myself", "want to disappear forever", "disappear forever", "self harm", "selfharm", "harm myself", "hang myself", "dont want to exist", "wish i didnt exist", "wish i was never born", "wish i had never been born", "end it all$", "going to hurt myself", "gonna hurt myself", "want to hurt myself", "wanna hurt myself", "cut myself on purpose", "keep cutting myself", "cutting myself again", "nobody would care if i died", "no one would care if i died", "nobody would miss me", "no one would miss me", "point in living", "point of living", "thinking about ending it", "ending it all", "not worth living", "isnt worth living", "and never wake up", "never wake up again", "want to never wake up"],
    W: ["hurt myself", "cut myself", "cutting myself", "end it all", "want to dye", "cant go on$", "cannot go on$", "can not go on$", "want to end it all", "wanna end it all", "dont want to be here anymore"],
    G: ["laugh", "lol", "for a pizza", "for a ", "playing", "football", "soccer", "while cooking", "cooking", "by accident", "accidentally", "party", "dying to", "phone", "battery", "hair", "shaving", "paper", "knife", "trip", "holiday", "vacation", "game", "level", "homework", "school", "class", "house", "job", "work", "city", "town"],
    F: ["die|", "want to disappear", "wanna disappear", "wish i could disappear", "hate my life", "hate being alive"],
    FG: ["die for", "to die for", "dying to", "of boredom", "laugh", "phone", "battery", "plant", "game", "dye", "hair", "character", "level", "in minecraft", "in the game"],
    N: ["dont want to die", "do not want to die", "dont wanna die", "never want to die", "not want to die", "afraid to die", "scared to die", "dont want to hurt myself"],
  },
  de: {
    S: ["suizid", "selbstmord", "mich umbring", "mich toten", "mich selbst toten", "will sterben", "mochte sterben", "moechte sterben", "sterben will", "sterben mochte", "sterben moechte", "will tot sein", "mochte tot sein", "moechte tot sein", "waere ich tot", "ware ich tot", "waere lieber tot", "ware lieber tot", "waer ich tot", "nicht mehr leben", "nich mehr leben", "nimmer leben", "lebensmude", "lebensmuede", "mir das leben nehmen", "das leben nehmen", "mein leben beenden", "selbstverletz", "ritze mich", "mich ritzen", "mir weh tun", "mir wehtun", "mir was antun", "mir etwas antun", "tu mir was an", "tu mir etwas an", "tue mir was an", "kein grund zu leben", "keinen grund zu leben", "keinen sinn mehr zu leben", "will nicht mehr da sein", "mochte nicht mehr da sein", "moechte nicht mehr da sein", "nicht mehr da sein will", "halte das leben nicht mehr aus", "das leben nicht mehr aus", "will nicht mehr aufwachen", "mich aufhangen", "mich aufhaengen", "von der brucke springen", "von der bruecke springen", "ohne mich besser dran", "ohne mich besser", "will einfach nur sterben", "bringe mich um$", "bring mich um$", "ich waere tot", "ich ware tot", "liebsten war ich tot", "liebsten ware ich tot", "liebsten waere ich tot", "liebsten tot", "keinen bock mehr zu leben", "keine lust mehr zu leben", "ritz mich", "keiner wurde mich vermissen", "niemand wurde mich vermissen", "will ~ nicht mehr aufwachen"],
    W: ["bring mich um", "bringe mich um", "alles beenden", "schluss mit allem", "will nicht mehr$", "ich war tot", "war ich tot", "mich verletzen"],
    G: ["vor lachen", "lach mich", "vor hunger", "vor langeweile", "spielen", "spiel", "haare", "hausaufgaben", "schule", "arbeit", "sport", "beim", "fussball"],
    F: ["sterben|", "will verschwinden", "mochte verschwinden", "moechte verschwinden", "hasse mein leben"],
    FG: ["vor lachen", "vor hunger", "vor langeweile", "vor scham", "vor angst", "vor hitze", "vor kalte", "spiel"],
    N: ["will nicht sterben", "mochte nicht sterben", "moechte nicht sterben", "angst zu sterben"],
  },
  es: {
    S: ["suicid", "me quiero matar", "quiero matarme", "voy a matarme", "quitarme la vida", "acabar con mi vida", "terminar con mi vida", "quiero morir", "me quiero morir", "kiero morir", "quiero morirme", "ganas de morir", "no quiero vivir", "no kiero vivir", "no quiero seguir viviendo", "ya no quiero vivir", "mejor muerto", "mejor muerta", "estaria mejor muert", "estuviera muert", "ojala me muriera", "hacerme dano", "me hago dano", "autolesion", "me corto los brazos", "me corto las venas", "cortarme las venas", "me corto las munecas", "cortarme las munecas", "no tiene sentido vivir", "no vale la pena vivir", "desaparecer para siempre", "no quiero existir", "nadie me extranaria", "si me muero nadie", "estarian mejor sin mi", "ahorcarme", "tirarme de un puente", "no quiero despertar", "aguanto mas vivir", "no aguanto vivir", "no quiero estar viv", "nadie me echaria de menos"],
    W: ["matarme", "me voy a matar", "morirme", "cortarme", "me corto", "acabar con todo", "terminar con todo", "no quiero seguir"],
    G: ["de risa", "de hambre", "el pelo", "pelo", "flequillo", "jugando", "las unas", "por verte", "de sueno", "de calor", "de frio", "de verguenza", "deberes", "tarea", "partida", "estudiando", "el juego", "cocinando"],
    F: ["morir|", "quiero desaparecer", "odio mi vida"],
    FG: ["de risa", "de hambre", "de sueno", "de calor", "de frio", "de verguenza", "de ganas", "por verte", "de miedo"],
    N: ["no quiero morir", "no me quiero morir", "no quiero morirme", "miedo a morir"],
  },
  fr: {
    S: ["suicid", "me suicider", "en finir avec la vie", "envie d en finir", "envie den finir", "mettre fin a mes jours", "mettre fin a ma vie", "veux mourir", "jveux mourir", "je ve mourir", "veu mourir", "envie de mourir", "plus envie de vivre", "veux plus vivre", "veux pas vivre", "me faire du mal", "me fais du mal", "automutil", "scarif", "me coupe les bras", "me coupe les poignets", "me couper les veines", "me coupe les veines", "me foutre en l air", "me foutre en lair", "plus de raison de vivre", "aucune raison de vivre", "disparaitre pour toujours", "mieux mort", "mieux morte", "voudrais etre mort", "veux etre mort", "voudrais mourir", "peux plus de vivre", "sert a rien de vivre", "veux pas exister", "veux plus exister", "voudrais ne pas exister", "me pendre", "seraient mieux sans moi", "je vais me tuer$", "me tuer$", "personne ne me regretter", "voudrais ne plus me reveiller"],
    W: ["me tuer", "je vais me tuer", "en finir", "me couper", "veux plus me reveiller"],
    G: ["de rire", "de faim", "cheveux", "devoir", "devoirs", "ongles", "d envie", "denvie", "frange", "a la tache", "de fatigue", "jouer", "cuisine", "pain", "tot", "demain", "matin", "heure"],
    F: ["mourir|", "veux disparaitre", "deteste ma vie", "je hais ma vie"],
    FG: ["de rire", "de faim", "d envie", "denvie", "de fatigue", "de honte", "de chaud", "de froid", "de peur"],
    N: ["veux pas mourir", "ne veux pas mourir", "peur de mourir"],
  },
  pt: {
    S: ["suicid", "quero me matar", "vou me suicidar", "tirar minha vida", "tirar a minha vida", "acabar com a minha vida", "acabar com minha vida", "quero morrer", "quero morre|", "kero morrer", "vontade de morrer", "nao quero mais viver", "n quero mais viver", "nao quero viver", "nao kero viver", "melhor morto", "melhor morta", "estar morta", "estar morto", "me corto os pulsos", "cortar os pulsos", "cortar meus pulsos", "me ferir", "autolesao", "automutil", "sem motivo pra viver", "sem motivo para viver", "sem razao para viver", "sumir pra sempre", "sumir para sempre", "nao aguento mais viver", "nao quero existir", "queria nao existir", "me enforcar", "estariam melhor sem mim", "nao quero mais acordar", "vou me matar$", "me matar$", "sentiria minha falta", "sentiria a minha falta", "nao quero mais estar viv", "nao quero estar viv", "dormir e nao acordar"],
    W: ["me matar", "vou me matar", "me machucar", "me cortar", "eu me corto", "acabar com tudo", "nao acordar mais"],
    G: ["de rir", "de fome", "cabelo", "licao", "saudade", "jogando", "de sono", "de calor", "de frio", "de vergonha", "barba", "unha", "estudar", "futebol", "tarefa", "jogo", "cedo", "amanha", "hora"],
    F: ["morrer|", "quero sumir", "odeio minha vida", "odeio a minha vida"],
    FG: ["de rir", "de fome", "de sono", "de calor", "de frio", "de vergonha", "de saudade", "de medo", "de vontade"],
    N: ["nao quero morrer", "n quero morrer", "medo de morrer"],
  },
  ru: {
    S: ["суицид", "самоуби", "suicid", "kill myself", "покончить с собои", "покончу с собои", "покончить с жизнью", "покончу с жизнью", "убить себя", "убью себя", "хочу умереть", "хочется умереть", "умереть хочу", "хочу умиреть", "хочу сдохнуть", "хочется сдохнуть", "лучше бы я умер", "лучше бы я умерла", "лучше умереть", "не хочу жить", "не хочется жить", "жить не хочу", "жить не хочется", "не хочу больше жить", "не хочу жыть", "незачем жить", "нет смысла жить", "не вижу смысла жить", "нет смысла жизни", "уити из жизни", "свести счеты", "выпилиться", "выпилюсь", "повеситься", "повешусь", "вскрыть вены", "вскрою вены", "порезать себя", "порежу себя", "режу себя", "режу руки", "резать себя", "порезать вены", "селфхарм", "селф харм", "self harm", "самоповрежд", "навредить себе", "наврежу себе", "причинить себе вред", "причинить себе боль", "сделать себе больно", "спрыгнуть с крыши", "прыгнуть с крыши", "наглотаться таблеток", "лучше бы меня не было", "исчезнуть навсегда", "не хочу просыпаться"],
    W: ["убиться", "сдохнуть"],
    G: ["от смеха", "со смеху", "время", "от голода", "от скуки", "от жары", "об стену", "в игре"],
    F: ["умереть|", "хочу исчезнуть", "ненавижу свою жизнь"],
    FG: ["от смеха", "со смеху", "от голода", "от скуки", "от жары", "от стыда", "от страха"],
    N: ["не хочу умереть", "не хочу умирать", "боюсь умереть"],
  },
  pl: {
    S: ["samoboj", "suicyd", "zabij sie", "zabic siebie", "odebrac sobie zycie", "odbiore sobie zycie", "chce umrzec", "chce umzec", "chcialbym umrzec", "chcialabym umrzec", "nie chce zyc", "nie chce juz zyc", "nie chce mi sie zyc", "nie warto zyc", "nie ma sensu zyc", "po co zyc", "skonczyc ze soba", "skoncze ze soba", "skonczyc z tym wszystkim", "skrzywdzic sie", "skrzywdze sie", "zrobic sobie krzywde", "zrobie sobie krzywde", "ciac sie", "tne sie", "potne sie", "pociac sie", "pocielam sie", "pocielem sie", "samookalecz", "okaleczam sie", "chce zniknac na zawsze", "zniknac na zawsze", "lepiej beze mnie", "bez mnie bedzie lepiej", "byloby lepiej beze mnie", "mam dosc zycia", "dosc zycia", "chcialabym nie zyc", "chcialbym nie zyc", "wolalbym nie zyc", "wolalabym nie zyc", "powiesic sie", "powiesze sie", "zabije sie$", "zabic sie$", "chce sie zabic", "chcialbym sie zabic", "chcialabym sie zabic", "gdybym umarl"],
    W: ["zabije sie", "zabic sie", "sie zabic"],
    G: ["ze smiechu", "z glodu", "z nudow", "z nudy", "w grze"],
    F: ["umrzec|", "chce zniknac", "nienawidze swojego zycia"],
    FG: ["ze smiechu", "z glodu", "z nudow", "z nudy", "ze wstydu", "ze strachu", "z goraca", "pod kocem", "pod koc"],
    N: ["nie chce umrzec", "boje sie umrzec", "boje sie smierci"],
  },
  nl: {
    S: ["zelfmoord", "suicid", "zelfdoding", "mezelf doden", "mezelf dood", "mezelf vermoorden", "mezelf van kant", "mezelf ophangen", "mezelf pijn doen", "mezelf iets aandoen", "mezelf wat aandoen", "mezelf snijden", "snij mezelf", "snijd mezelf", "mezelf verwonden", "mezelf beschadigen", "me iets aandoen", "me wat aandoen", "zelfbeschadig", "zelfverwond", "wil dood", "dood willen", "wil ik dood", "dood wil", "wou dat ik dood", "was ik maar dood", "liever dood", "niet meer leven", "nie meer leven", "niet meer wil leven", "wil niet meer leven", "wil er niet meer zijn", "niet meer wakker worden", "einde aan mijn leven", "eind aan mijn leven", "er een eind aan", "er een einde aan", "geen zin meer in het leven", "geen zin meer om te leven", "geen reden om te leven", "leven heeft geen zin", "het leven is zinloos", "uit het leven stappen", "voor de trein springen", "van een brug springen", "alle pillen", "overdosis", "leven zat", "wil sterven", "wil doodgaan", "wil dood gaan", "verdwijnen voor altijd", "voor altijd verdwijnen", "beter af zonder mij", "wil gewoon dood", "wil echt dood", "wil gewoon sterven", "wil echt sterven", "wil liever sterven", "niemand zou me missen", "niemand zal me missen"],
    W: ["snijden", "wil niet meer$", "kerven", "er een punt achter", "geen reden meer", "er niet meer zijn"],
    G: ["brood", "wachten", "spelen", "van het lachen", "pompoen", "hout", "groente", "uien", "gamen", "school", "huiswerk", "werken", "sporten", "eten", "morgen", "vandaag", "om ", "op tijd"],
    F: ["sterven|", "doodgaan|", "dood gaan|", "wil verdwijnen", "haat mijn leven"],
    FG: ["van het lachen", "van de honger", "van verveling", "van schaamte", "van de hitte", "van de kou", "plant", "spel"],
    N: ["wil niet dood", "wil niet sterven", "bang om dood te gaan"],
  },
  tr: {
    S: ["intihar", "kendimi oldur", "kendimi asaca", "kendimi asmak", "kendimi kopruden", "kendimi asagi at", "camdan atla", "balkondan atla", "kendime zarar", "kendimi kes", "kendimi yarala", "bilegimi kes", "bileklerimi kes", "olmek isti", "olmek isterim", "olesim var", "olup gitmek", "olup gitsem", "yasamak istemi", "yasamak istemiyom", "yasamaya devam etmek istemi", "yasamanin anlami yok", "yasamak icin bir neden", "hayatima son", "hayatimi bitir", "canima kiy", "her seye son", "kendimi yok etmek", "yok olmak istiyorum", "keske hic dogmasaydim", "dunyadan gitmek", "keske olsem", "olsem kurtulur", "keske olseydim", "kimse beni ozlemez", "kimse beni ozlemeyecek"],
    W: ["olsem", "jilet", "her seyi bitirmek"],
    G: ["orada", "gibi", "tatil", "evde", "burada", "yaninda", "odev", "ders", "gulmekten", "oyun"],
    F: ["olmek|", "kaybolmak istiyorum", "hayatimdan nefret"],
    FG: ["gulmekten", "acliktan", "sicaktan", "soguktan", "utanctan", "korkudan", "merak"],
    N: ["olmek istemiyorum", "olmek istemem", "olmekten korkuyorum"],
  },
  ja: {
    S: ["死にたい", "しにたい", "シニタイ", "死にて", "死のう", "死んでしまいたい", "しんでしまいたい", "死んだほうが", "死んだ方が", "しんだほうが", "消えたい", "きえたい", "消えてしまいたい", "きえてしまいたい", "消えてなくなりたい", "いなくなりたい", "居なくなりたい", "自殺", "じさつ", "リスカ", "りすか", "リストカット", "自傷", "自分を傷つけ", "じぶんをきずつけ", "自分を傷付け", "自分を殺", "生きたくない", "生きていたくない", "生きてる意味", "生きている意味", "生きる意味がない", "いきるいみ", "生きるのがつらい", "生きるのが辛い", "生きていけない", "人生を終わらせ", "首吊", "首つり", "首をつ", "手首を切", "オーバードーズ", "生まれてこなければ", "suicid", "kill myself"],
    W: ["飛び降り", "とびおり", "終わりにしたい", "楽になりたい"],
    G: ["笑い", "おいしい", "お腹", "笑", "暑", "寒", "今日", "宿題", "ゲーム", "階段", "仕事", "ベッド", "ソファ", "テスト"],
    F: ["死ぬ", "しぬ"],
    FG: ["死ぬほど", "笑い", "おいしい", "お腹", "暑", "寒", "ゲーム", "しぬほど"],
    N: ["死にたくない", "しにたくない"],
  },
  ko: {
    S: ["죽고 싶", "죽고싶", "죽고 시퍼", "죽고시퍼", "주꼬싶", "죽어버리", "죽어 버리", "죽어야겠", "차라리 죽", "자살", "자해", "사라지고 싶", "사라지고싶", "없어지고 싶", "없어지고싶", "사라져버리고", "사라져 버리고", "살기 싫", "살기싫", "살고 싶지 않", "살고싶지 않", "살고 싶지않", "살고싶지않", "그만 살", "더 살기 싫", "살 이유", "살아야 할 이유", "살아갈 이유", "삶을 끝", "인생 끝내", "다 끝내고 싶", "목숨을 끊", "목숨 끊", "극단적 선택", "극단적인 선택", "손목 긋", "손목을 긋", "손목 그", "뛰어내리", "뛰어 내리", "나를 해치", "날 해치", "내 몸에 상처", "몸에 상처를", "칼로 그", "suicide", "kill myself"],
    W: ["그냥 죽", "목 매", "목매", "죽을래", "끝내고 싶어"],
    G: ["웃겨", "배고파", "죽 먹", "매일", "숙제", "게임", "더워", "추워"],
    F: ["죽다", "죽는", "죽음"],
    FG: ["웃겨", "배고파", "죽 먹", "죽먹", "게임", "더워", "추워", "죽는 줄", "죽는줄", "죽겠"],
    N: ["죽고 싶지 않", "죽고싶지 않", "죽고 싶지않", "죽고싶지않", "죽기 싫"],
  },
  zh: {
    S: ["自杀", "不想活", "活不下去", "轻生", "自残", "自伤", "伤害自己", "伤害我自己", "自我伤害", "割腕", "寻死", "结束生命", "结束自己", "了结自己", "了断", "死了算了", "不如死了", "去死", "想去死", "跳楼", "活着没意思", "活着没有意思", "活着没有意义", "没有活下去的理由", "不想活下去", "想消失", "自尽", "kill myself", "suicide"],
    W: ["想死", "好想死"],
    G: ["想死你", "笑死", "饿死", "热死", "累死", "冷死", "游戏"],
    F: ["死亡"],
    FG: ["游戏", "历史"],
    N: ["不想死", "怕死"],
  },
  zht: {
    S: ["想去死", "自我傷害", "自殺", "自杀", "不想活", "活不下去", "活著好累", "活著沒意義", "活著沒有意義", "活著沒意思", "活著沒有意思", "沒有活下去的理由", "輕生", "尋死", "結束生命", "結束自己", "了結自己", "一了百了", "消失算了", "想消失", "不想存在", "跳樓", "割腕", "自殘", "自残", "傷害自己", "傷害我自己", "殺了自己", "殺死自己", "想離開這個世界", "不如死了", "自盡", "去死", "kill myself", "suicide"],
    W: ["想死", "好想死"],
    G: ["想死你", "笑死", "餓死", "熱死", "累死", "冷死", "遊戲"],
    F: ["死亡"],
    FG: ["遊戲", "歷史"],
    N: ["不想死", "怕死"],
  },
};
/* 0 = niente, 1 = lieve (controllo gentile), 2 = forte */
function sf110Level(raw, lang) {
  const K = SF110_K[lang || S.lang] || SF110_K.en; const txt = String(raw == null ? "" : raw); if (!txt.trim()) return 0;
  let ms = [sf110Norm(txt, false), sf110Norm(txt, true)];
  const neg = (K.N || []).concat(SF110_ALL.N).filter((k) => sf110Hit(ms, k));
  if (neg.length) { /* le frasi negate si tolgono prima del controllo forte */
    ms = ms.map((m) => { let x = " " + m + " "; neg.forEach((k) => { const kk = sf110Norm(k, false); x = SF110_CJK.test(kk) ? x.split(kk).join(" ") : x.replace(new RegExp(sf110Esc(kk).replace(/ /g, "\\s+"), "gu"), " "); }); return x.trim(); });
  }
  const g = (K.G || []).some((k) => sf110Hit(ms, k));
  if ((K.S || []).concat(SF110_ALL.S).some((k) => sf110Hit(ms, k))) return 2;
  if (!g && (K.W || []).some((k) => sf110Hit(ms, k))) return 2;
  if (neg.length) return 1;
  const fg = g || (K.FG || []).some((k) => sf110Hit(ms, k));
  if (!fg && (K.F || []).some((k) => sf110Hit(ms, k))) return 1;
  return 0;
}

/* ---------------- B) testi (14 lingue) ---------------- */
const SF110_T = {
  it: { soft: "Sembra che tu stia pensando alla morte. Se a volte senti di non voler vivere, non è una cosa da affrontare in solitudine: meriti sostegno. Puoi parlarne con una persona di cui ti fidi, oppure chiamare uno di questi numeri:", y: "per bambini e ragazzi", e: "Emergenze", sep: ": ", local: "il numero di emergenza del tuo Paese", find: "Altri Paesi" },
  en: { soft: "It sounds like you're thinking about death. If you sometimes feel you don't want to live, you don't have to face it alone: you deserve support. You can talk to someone you trust, or call one of these numbers:", y: "for children and teens", e: "Emergencies", sep: ": ", local: "your local emergency number", find: "Other countries" },
  de: { soft: "Es klingt, als würdest du an den Tod denken. Wenn du manchmal nicht mehr leben möchtest, musst du damit nicht allein bleiben: Du hast Unterstützung verdient. Du kannst mit einem Menschen sprechen, dem du vertraust, oder eine dieser Nummern anrufen:", y: "für Kinder und Jugendliche", e: "Notruf", sep: ": ", local: "die Notrufnummer deines Landes", find: "Andere Länder" },
  es: { soft: "Parece que estás pensando en la muerte. Si a veces sientes que no quieres vivir, no tienes que pasar por esto en soledad: mereces apoyo. Puedes hablar con alguien de confianza o llamar a uno de estos números:", y: "para niños y adolescentes", e: "Emergencias", sep: ": ", local: "el número de emergencias de tu país", find: "Otros países" },
  fr: { soft: "On dirait que tu penses à la mort. Si parfois tu as l'impression de ne plus vouloir vivre, parles-en : tu mérites du soutien. Tu peux te confier à une personne de confiance, ou appeler l'un de ces numéros :", y: "pour les enfants et les ados", e: "Urgences", sep: " : ", local: "le numéro d'urgence de ton pays", find: "Autres pays" },
  pt: { soft: "Parece que você está pensando na morte. Se às vezes sente que não quer viver, você não precisa passar por isso sem ajuda: você merece apoio. Pode conversar com alguém de confiança ou ligar para um destes números:", y: "para crianças e jovens", e: "Emergência", sep: ": ", local: "o número de emergência do seu país", find: "Outros países" },
  ja: { soft: "死について考えているのかな。生きていたくないと感じることがあるなら、ひとりで抱えなくていいんだよ。信頼できる人に話すか、こちらの番号に電話してください：", y: "子ども向け", e: "緊急", sep: ": ", local: "いる国の緊急番号", find: "その他の国" },
  ko: { soft: "죽음에 대해 생각하고 있는 것 같아요. 가끔 살고 싶지 않다는 마음이 든다면, 혼자 견디지 않아도 돼요. 믿을 수 있는 사람에게 이야기하거나 아래 번호로 전화해 주세요:", y: "청소년", e: "긴급", sep: ": ", local: "지금 있는 나라의 긴급 전화번호", find: "다른 나라" },
  zh: { soft: "你好像在想关于死亡的事。如果你有时觉得不想活下去，你不必独自承受。可以和你信任的人聊一聊，或者拨打下面的电话：", y: "儿童和青少年", e: "紧急", sep: ": ", local: "你所在国家或地区的紧急电话", find: "其他国家和地区" },
  zht: { soft: "你好像在想關於死亡的事。如果你有時覺得不想活下去，你不必獨自承受。可以找你信任的人聊聊，或撥打以下電話：", y: "兒童與青少年", e: "緊急", sep: ": ", local: "你所在國家或地區的緊急電話", find: "其他國家和地區" },
  ru: { soft: "Похоже, ты думаешь о смерти. Если тебе иногда не хочется жить, не нужно справляться с этим в одиночку: ты заслуживаешь поддержки. Поговори с тем, кому доверяешь, или позвони по одному из этих номеров:", y: "для детей и подростков", e: "Экстренные службы", sep: ": ", local: "номер экстренных служб твоей страны", find: "Другие страны" },
  pl: { soft: "Wygląda na to, że myślisz o śmierci. Jeśli czasem czujesz, że nie chcesz żyć, nie musisz radzić sobie z tym w pojedynkę: zasługujesz na wsparcie. Porozmawiaj z kimś, komu ufasz, albo zadzwoń pod jeden z tych numerów:", y: "dla dzieci i młodzieży", e: "Numer alarmowy", sep: ": ", local: "numer alarmowy w twoim kraju", find: "Inne kraje" },
  nl: { soft: "Het klinkt alsof je aan de dood denkt. Als je soms het gevoel hebt dat je niet meer wilt leven, hoef je dat niet alleen te dragen: je verdient steun. Praat met iemand die je vertrouwt, of bel een van deze nummers:", y: "voor kinderen en jongeren", e: "Noodnummer", sep: ": ", local: "het alarmnummer van je land", find: "Andere landen" },
  tr: { soft: "Ölüm hakkında düşünüyor gibisin. Bazen yaşamak istemediğini hissediyorsan bununla tek başına baş etmek zorunda değilsin: desteği hak ediyorsun. Güvendiğin biriyle konuşabilir ya da şu numaralardan birini arayabilirsin:", y: "çocuklar ve gençler için", e: "Acil", sep: ": ", local: "bulunduğun ülkenin acil numarası", find: "Diğer ülkeler" },
};
const sf110T = () => SF110_T[S.lang] || SF110_T.en;

/* ---------------- B) numeri di aiuto per PAESE (verificati il 14/11/2026, fonti in HELPLINES_FONTI.md) ----------------
   n = nome (l'originale; "en" = nome per chi usa l'app in un'altra lingua, solo per i Paesi con un'altra scrittura),
   t = numero, y = per bambini e ragazzi. E = emergenza. Lingue "di casa" (L): si usa il nome originale. */
const SF110_HL = {
  IT: { L: ["it"], E: "112", h: [{ n: "Telefono Amico Italia", t: "02 2327 2327" }, { n: "Telefono Azzurro", t: "19696", y: 1 }] },
  DE: { L: ["de"], E: "112", h: [{ n: "TelefonSeelsorge", t: "0800 111 0 111 · 0800 111 0 222 · 116 123" }, { n: "Nummer gegen Kummer", t: "116 111", y: 1 }] },
  AT: { L: ["de"], E: "112", h: [{ n: "TelefonSeelsorge", t: "142" }, { n: "Rat auf Draht", t: "147", y: 1 }] },
  CH: { L: ["de", "fr", "it"], E: "112", h: [{ n: { de: "Die Dargebotene Hand", fr: "La Main Tendue", it: "Telefono Amico", en: "Die Dargebotene Hand / La Main Tendue" }, t: "143" }, { n: "Pro Juventute", t: "147", y: 1 }] },
  ES: { L: ["es"], E: "112", h: [{ n: "Línea 024", t: "024" }, { n: "Fundación ANAR", t: "900 20 20 10 · 116 111", y: 1 }] },
  FR: { L: ["fr"], E: "112", h: [{ n: "3114", t: "3114" }, { n: "Fil Santé Jeunes", t: "0 800 235 236", y: 1 }] },
  BE: { L: ["nl", "fr"], E: "112", h: [{ n: "Zelfmoordlijn 1813", t: "1813" }, { n: "Centre de Prévention du Suicide", t: "0800 32 123" }, { n: "Awel", t: "102", y: 1 }, { n: "103 Écoute-Enfants", t: "103", y: 1 }] },
  NL: { L: ["nl"], E: "112", h: [{ n: "113 Zelfmoordpreventie", t: "113" }, { n: "De Kindertelefoon", t: "0800-0432", y: 1 }] },
  PT: { L: ["pt"], E: "112", h: [{ n: "Linha Nacional de Prevenção do Suicídio", t: "1411" }, { n: "SOS Criança", t: "116 111", y: 1 }] },
  BR: { L: ["pt"], E: "192", h: [{ n: "CVV, Centro de Valorização da Vida", t: "188" }] },
  MX: { L: ["es"], E: "911", h: [{ n: "Línea de la Vida", t: "800 911 2000" }] },
  AR: { L: ["es"], E: "911", h: [{ n: "Centro de Asistencia al Suicida", t: "135 · 0800 345 1435" }] },
  CL: { L: ["es"], E: "131", h: [{ n: "Línea de prevención del suicidio", t: "*4141" }] },
  US: { L: ["en"], E: "911", h: [{ n: "988 Lifeline", t: "988" }] },
  CA: { L: ["en", "fr"], E: "911", h: [{ n: "9-8-8", t: "988" }, { n: { en: "Kids Help Phone", fr: "Jeunesse, J'écoute" }, t: "1-800-668-6868", y: 1 }] },
  GB: { L: ["en"], E: "999 · 112", h: [{ n: "Samaritans", t: "116 123" }, { n: "Childline", t: "0800 1111", y: 1 }] },
  IE: { L: ["en"], E: "112 · 999", h: [{ n: "Samaritans", t: "116 123" }, { n: "Childline", t: "1800 66 66 66", y: 1 }] },
  AU: { L: ["en"], E: "000", h: [{ n: "Lifeline", t: "13 11 14" }, { n: "Kids Helpline", t: "1800 55 1800", y: 1 }] },
  NZ: { L: ["en"], E: "111", h: [{ n: "Need to talk? 1737", t: "1737" }, { n: "Youthline", t: "0800 376 633", y: 1 }] },
  IN: { L: ["en"], E: "112", h: [{ n: "Tele-MANAS", t: "14416" }] },
  JP: { L: ["ja"], E: "119 · 110", h: [{ n: { ja: "よりそいホットライン", en: "Yorisoi Hotline" }, t: "0120-279-338" }, { n: { ja: "#いのちSOS", en: "#Inochi SOS" }, t: "0120-061-338" }, { n: { ja: "24時間子供SOSダイヤル", en: "24-hour Children's SOS Dial" }, t: "0120-0-78310", y: 1 }] },
  KR: { L: ["ko"], E: "119 · 112", h: [{ n: { ko: "자살예방상담전화", en: "Suicide prevention line" }, t: "109" }, { n: { ko: "청소년상담", en: "Youth counselling" }, t: "1388", y: 1 }] },
  CN: { L: ["zh", "zht"], E: "120 · 110", h: [{ n: { zh: "心理援助热线", zht: "心理援助熱線", en: "Mental health support line" }, t: "12356" }] },
  TW: { L: ["zh", "zht"], E: "119 · 110", h: [{ n: { zh: "安心专线", zht: "安心專線", en: "MOHW Anxin line" }, t: "1925" }, { n: { zh: "生命线", zht: "生命線", en: "Lifeline Taiwan" }, t: "1995" }] },
  HK: { L: ["zh", "zht"], E: "999", h: [{ n: { zh: "香港撒玛利亚防止自杀会", zht: "香港撒瑪利亞防止自殺會", en: "Samaritan Befrienders Hong Kong" }, t: "2389 2222" }, { n: { zh: "撒玛利亚会", zht: "撒瑪利亞會", en: "The Samaritans Hong Kong" }, t: "2896 0000" }] },
  RU: { L: ["ru"], E: "112", h: [{ n: { ru: "Детский телефон доверия", en: "Children's helpline" }, t: "8-800-2000-122", y: 1 }] },
  PL: { L: ["pl"], E: "112", h: [{ n: "Centrum Wsparcia", t: "800 70 2222" }, { n: "Telefon zaufania dla dzieci i młodzieży", t: "116 111", y: 1 }] },
  TR: { L: ["tr"], E: "112", h: [{ n: "ALO 183", t: "183" }] },
};
/* Paesi dove si da' solo il numero di emergenza (UE/SEE senza numeri di aiuto in tabella: 112 ovunque) */
const SF110_E = { BG: "112", HR: "112", CY: "112", CZ: "112", DK: "112", EE: "112", FI: "112", GR: "112", HU: "112", LV: "112", LT: "112", LU: "112", MT: "112", RO: "112", SK: "112", SI: "112", SE: "112", IS: "112", LI: "112", NO: "112" };
const SF110_LANG_C = { it: ["IT"], de: ["DE"], es: ["ES"], fr: ["FR"], pt: ["BR"], en: ["US", "GB"], ja: ["JP"], ko: ["KR"], zh: ["CN"], zht: ["TW"], ru: ["RU"], pl: ["PL"], nl: ["NL"], tr: ["TR"] };
/* Paese del telefono: 1) fuso orario (dove si e' davvero), 2) regione della lingua del telefono, 3) lingua dell'app */
function sf110Country() {
  let tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* niente */ }
  if (tz && SF110_TZ[tz]) return [SF110_TZ[tz]];
  if (tz && !/^(Etc\/|UTC$|GMT|UCT$|Universal$|Zulu$|Factory$)/.test(tz) && tz.indexOf("/") > 0) return ["?"]; /* un altro Paese */
  const reg = (l) => { const m = /[-_]([A-Za-z]{2})\b/.exec(l || ""); return m ? m[1].toUpperCase() : ""; };
  let rs = []; try { rs.push(reg(Intl.DateTimeFormat().resolvedOptions().locale)); } catch (e) { /* niente */ }
  try { [navigator.language].concat(navigator.languages || []).forEach((l) => rs.push(reg(l))); } catch (e) { /* niente */ }
  const r = rs.find((x) => x && (SF110_HL[x] || SF110_E[x])); if (r) return [r];
  return SF110_LANG_C[S.lang] || ["US", "GB"];
}
function sf110CName(c) { try { return new Intl.DisplayNames([loc()], { type: "region" }).of(c) || c; } catch (e) { return c; } }
function sf110Lines(lang, cs) {
  lang = lang || S.lang; cs = cs || sf110Country(); const x = SF110_T[lang] || SF110_T.en; const out = [];
  let kidFirst = false; try { kidFirst = typeof ageBand === "function" && (ageBand() === "child" || ageBand() === "teen"); } catch (e) { /* niente */ }
  cs.forEach((c) => {
    const d = SF110_HL[c];
    if (d) {
      const nm = (n) => (typeof n === "string" ? n : n[lang] || (d.L.includes(lang) && n[d.L[0]]) || n.en || Object.values(n)[0]);
      let h = d.h.slice(); if (kidFirst) h = h.filter((z) => z.y).concat(h.filter((z) => !z.y));
      h.forEach((z) => out.push(`${nm(z.n)}${z.y ? ` (${x.y})` : ""}${x.sep}${z.t}`));
      out.push(`${x.e} (${sf110CName(c)})${x.sep}${d.E}`);
    } else if (SF110_E[c]) out.push(`${x.e} (${sf110CName(c)})${x.sep}${SF110_E[c]}`);
    else out.push(`${x.e}${x.sep}${x.local}`);
  });
  out.push(`${x.find}${x.sep}findahelpline.com`);
  return out.map((s) => s.replace(/[<>&"]/g, ""));
}
/* helpLines diventa "del Paese" ovunque (chat, Profilo > Aiuto, obiettivo salute) */
Object.keys(SF110_T).forEach((l) => { if (T[l]) { try { Object.defineProperty(T[l], "helpLines", { get: () => sf110Lines(l), configurable: true, enumerable: true }); } catch (e) { /* niente */ } } });

/* ---------------- B) chat ---------------- */
/* le vecchie liste non scattano piu' da sole (le voci ambigue davano l'aiuto per "mi taglio i capelli"):
   il controllo e' tutto qui sopra, con le stesse voci forti della 1.0.9 */
Object.keys(SF110_K).forEach((l) => { try { if (T[l] && T[l].chat && T[l].chat.K) T[l].chat.K.crisis = []; } catch (e) { /* niente */ } });
if (typeof chatReply === "function") {
  const _chatReply110 = chatReply;
  chatReply = function (raw, ...a) {
    let lv = 0; try { lv = sf110Level(raw); } catch (e) { lv = 0; }
    if (lv === 2) { const t = L(); return { crisis: true, text: t.chat.crisis, lines: t.helpLines || [] }; }
    if (lv === 1) return { crisis: true, soft: true, text: sf110T().soft, lines: L().helpLines || [] };
    return _chatReply110.call(this, raw, ...a);
  };
}

/* ---------------- B) diario, "Lascia andare", capsula del tempo: scheda di aiuto calma ----------------
   Non blocca mai il salvataggio, non salva nessun segno. Se un'altra finestra la copre prima che venga chiusa, si
   riapre appena lo schermo torna libero. Si chiude solo con il suo pulsante (o indietro). */
let sf110Want = 0;
function sf110Help(lv) {
  sf110Want = lv; const t = L(), x = sf110T();
  try { if (typeof game !== "undefined" && game) { stopGame(); game = null; } } catch (e) { /* niente */ }
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="sfHT"><div class="sheet sfhelp"><div class="grab"></div>
    <h2 id="sfHT" tabindex="-1">${esc(t.helpT)}</h2><p>${esc(lv === 2 ? t.chat.crisis : x.soft)}</p><div class="help">${(t.helpLines || []).map((l) => `<p><strong>${esc(l)}</strong></p>`).join("")}</div>
    <p class="small muted">${esc(t.helpP)}</p><button class="btn block" id="closeLayer" data-sfhelp="1">${esc(t.close)}</button></div></div>`;
  try { const h = document.getElementById("sfHT"); if (h) h.focus({ preventScroll: true }); } catch (e) { /* niente */ }
}
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("[data-sfhelp]"); if (b) sf110Want = 0; }, true);
try {
  new MutationObserver(() => {
    if (!sf110Want) return;
    if (layer.querySelector(".sfhelp")) return;
    if (!layer.innerHTML.trim()) { const w = sf110Want; setTimeout(() => { if (sf110Want === w && !layer.innerHTML.trim()) sf110Help(w); }, 450); }
  }).observe(layer, { childList: true });
} catch (e) { /* niente */ }
/* chiusa con indietro (backPress tocca #closeLayer) o da un altro codice che chiude la finestra: conta come chiusa */
if (typeof fadeLayer === "function") { const _fadeLayer110 = fadeLayer; fadeLayer = function (...a) { try { if (layer.querySelector(".sfhelp")) sf110Want = 0; } catch (e) { /* niente */ } return _fadeLayer110.apply(this, a); }; }
if (typeof closeLayer === "function") { const _closeLayer110 = closeLayer; closeLayer = function (...a) { try { if (layer.querySelector(".sfhelp")) sf110Want = 0; } catch (e) { /* niente */ } return _closeLayer110.apply(this, a); }; }
function sf110After(text, delay) {
  let lv = 0; try { lv = sf110Level(text); } catch (e) { lv = 0; }
  if (lv) setTimeout(() => sf110Help(lv), delay);
  return lv;
}
/* diario: si legge la riga prima che il salvataggio la svuoti; la scheda arriva subito dopo il salvataggio */
document.addEventListener("submit", (ev) => {
  if (!ev.target || ev.target.id !== "diaryForm") return;
  const el = document.getElementById("line"); const v = el ? el.value : "";
  if (v && v.trim()) sf110After(v, 60);
}, true);
if (typeof doLetgo === "function") {
  const _doLetgo110 = doLetgo;
  doLetgo = function (...a) { const i = document.getElementById("lgIn"); const v = i ? i.value : ""; const r = _doLetgo110.apply(this, a); if (v && v.trim()) sf110After(v, 700); return r; };
}
if (typeof sealCapsule === "function") {
  const _sealCapsule110 = sealCapsule;
  sealCapsule = function (...a) { const i = document.getElementById("capsIn"); const v = i ? i.value : ""; const r = _sealCapsule110.apply(this, a); if (v && v.trim()) sf110After(v, 900); return r; };
}
