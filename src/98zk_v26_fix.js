/* =================== 1.0.10: correzioni dell'audit indipendente della 1.0.9 (AUDIT_110.md) ===================
   Un solo livello nuovo (come chiede l'audit), diviso in sezioni numerate. I testi nuovi sono in 3zzk_v26_texts.js (L().v26).
   Regole del proprietario sempre rispettate: prezzi 4,99/44,99 con 7 giorni di prova sull'annuale, una sola moneta (Tanì),
   al massimo 5 video al giorno, app per tutte le eta' con comportamento "Famiglie", musica spenta di base. */

/* ---------- 1) Minori ed eta' non detta: nessuna spinta all'acquisto o all'invito (M-01, E-02, E-10, CR-07, G2-07) ----------
   "Minore" qui vuol dire, come nel resto dell'app (98zi, 98zj), ageBand() diverso da "adult": sotto i 13 anni, sotto l'eta' del
   consenso digitale del Paese, oppure eta' non detta / mai chiesta. */
function v26Minor() { try { return typeof ageBand !== "function" || ageBand() !== "adult"; } catch (e) { return true; } }
/* "giovane": minore come sopra OPPURE meno di 18 anni (anche dove l'eta' del consenso e' 13): niente spinte all'acquisto,
   niente inviti, niente "torna domani" con i numeri. Sotto i 18 anni nessuna pressione, come vuole il proprietario. */
function v26Young() { try { if (v26Minor()) return true; const y = typeof ageYears === "function" ? ageYears(S.age) : null; return y == null || y < 18; } catch (e) { return true; } }
/* a) la finestra "Prova Tanetto Plus" non si apre mai da sola per loro (Plus resta raggiungibile da Profilo e negozio) */
const _nav20plusDueV26 = nav20plusDue;
nav20plusDue = function (why) { if (v26Young()) return false; return _nav20plusDueV26(why); };
/* b) "Invita un amico" nel momento piu' felice (tutto fatto): solo per gli adulti; condividere le cartoline resta per tutti.
   La finestra "tutto fatto" puo' aprirsi piu' tardi (coda delle finestre, 98f): il pulsante si toglie quando compare. */
new MutationObserver(() => { try { if (layer.querySelector(".alldone #invite") && v26Young()) layer.querySelectorAll(".alldone #invite").forEach((x) => x.remove()); } catch (e) { /* niente */ } })
  .observe(layer, { childList: true, subtree: true });
/* c) prima configurazione: l'eta' si chiede dopo, quindi la fila dei compagni Plus (con le corone) non si mostra a chi non
   risulta adulto; i compagni Plus restano nella scelta del compagno (Profilo), con la loro etichetta "Tanetto Plus" */
const _viewOnboardV26 = viewOnboard;
viewOnboard = function (...a) {
  const h = _viewOnboardV26.apply(this, a);
  if (S.onboard !== 0 || !v26Young() || h.indexOf('<div class="ppsec">') < 0) return h;
  const tpl = document.createElement("template"); tpl.innerHTML = h;
  tpl.content.querySelectorAll(".ppsec").forEach((x) => x.remove());
  if (typeof draftPet !== "undefined" && typeof isPlusPet === "function" && isPlusPet(draftPet)) draftPet = "germo";
  return tpl.innerHTML;
};
/* d) "Torna domani" ai minori: niente valore del regalo di domani, niente fila dei 7 giorni (pressione a tornare) */
const _teaserCardV26 = teaserCard;
teaserCard = function (...a) {
  if (!v26Young()) return _teaserCardV26.apply(this, a);
  const k = L().v26.kid; const n = esc(S.petName || "");
  let h = `<div class="teaser card"><div class="tz"><h3>${esc(k.t)}</h3><p class="small muted">${esc(k.p).split("{n}").join(n)}</p></div></div>`;
  if (S.giftDay === S.day && typeof adBtn === "function") { const b = adBtn("adGift", "small"); if (b) h = h.replace(/<\/div>$/, `${b}</div>`); }
  return h;
};
/* e) video con premio: "raddoppia il regalo" solo per il primo video del giorno e solo agli adulti; dal secondo (e per i
   minori) "Guarda una pubblicità: +N Tanì" (G2-05: dopo il primo non e' piu' vero che "raddoppia") */
Object.keys(V19AD).forEach((l) => {
  const a = V19AD[l]; const g0 = a.gift, t0 = a.thanks; const t = T[l]; if (!t || !t.v26) return;
  const r = (s, n) => s.split("{n}").join(String(n));
  const seen = () => { try { return ADS_DAY_MAX - adsLeftToday(); } catch (e) { return 0; } };
  a.gift = (n) => (v26Young() || seen() >= 1 ? r(t.v26.ad2.gift, n) : g0(n));
  a.thanks = (n) => (v26Young() || seen() >= 2 ? r(t.v26.ad2.thanks, n) : t0(n));
});

/* ---------- 2) Promemoria senza pressione emotiva (M-16, E-05, G1-07) ----------
   Titolo "Un momento con Germo" invece di "Germo ti aspetta"; le 4 frasi con "ti aspetta", "guarda la porta", "torna il
   sorriso", "la giornata non e' finita" sostituite; la frase sulla serie dice "se ti va"; ai minori niente frase sulla serie. */
Object.keys(T).forEach((l) => {
  const t = T[l], v = t.v26 && t.v26.notif; if (!v) return;
  const r = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (k in o ? String(o[k]) : m));
  if (t.v12) t.v12.remTitle = (n) => r(v.t, { n });
  const x = V19N[l]; if (!x || !Array.isArray(x.msgs) || x.msgs.length < 12) return;
  x.msgs = x.msgs.slice(); x.msgs[1] = v.m1; x.msgs[2] = v.m2; x.msgs[9] = v.m9; x.msgs[11] = v.m11;
  /* ai minori niente frase sulla serie (ne' numero di giorni): una frase normale della rotazione */
  x.streak = (n, k) => (v26Young() ? x.msgs[0].split("{n}").join(n) : r(v.streak, { n, k }));
});

/* ---------- 3) Statistiche anonime: interruttore, spente per minori ed eta' non detta (M-11, I-04, I-11) ----------
   Chiave nuova "tanetto-statistiche" ("1" accese, "0" spente) scelta dalla persona; se non ha scelto: accese solo per gli
   adulti. La vecchia "tanetto-non-contare" (?io=1 del proprietario) resta valida e spegne tutto. Prima della risposta
   sull'eta' (S.age mai impostato) non parte nessun conteggio. */
function v26StatsPref() { try { const v = localStorage.getItem("tanetto-statistiche"); return v === "1" ? true : v === "0" ? false : null; } catch (e) { return null; } }
function v26StatsOn() {
  try { if (localStorage.getItem("tanetto-non-contare") === "1") return false; } catch (e) { /* niente */ }
  if (v26Minor()) return false;
  const p = v26StatsPref(); return p === null ? true : p;
}
/* chiamata da track() (45_state.js) anche durante l'avvio, prima che questo file sia letto: per questo e' una funzione
   dichiarata (disponibile da subito) e non usa costanti di questo file. Prima della risposta sull'eta' i conteggi aspettano
   in memoria sul telefono (al massimo 20, mai inviati): se poi la persona risulta adulta e non le ha spente partono, se no
   si buttano. */
function v26TrackGate(path) {
  try { if (localStorage.getItem("tanetto-non-contare") === "1") return false; } catch (e) { /* niente */ }
  let pending = false; try { pending = !S || S.age === undefined; } catch (e) { pending = true; }
  if (pending) { try { S.v26q = (S.v26q || []).filter((x) => x !== path).concat([path]).slice(-20); } catch (e) { /* niente */ } return false; }
  try { if (typeof ageConsent === "function") return v26StatsOn(); } catch (e) { /* avvio: modulo dell'eta' non ancora pronto */ }
  try { S.v26q = (S.v26q || []).filter((x) => x !== path).concat([path]).slice(-20); } catch (e) { /* niente */ }
  return false;
}
function v26TrackFlush() {
  const q = (S.v26q || []).slice(); if (!q.length || S.age === undefined) return; delete S.v26q; save();
  if (v26StatsOn()) q.forEach((p) => track(p));
}
if (typeof ageSet === "function") {
  const _ageSetV26 = ageSet;
  ageSet = function (...a) { const r = _ageSetV26.apply(this, a); try { v26TrackFlush(); } catch (e) { /* niente */ } return r; };
}
setTimeout(() => { try { v26TrackFlush(); } catch (e) { /* niente */ } }, 2000);
function v26StatsCard() {
  const s = L().v26.st; const minor = v26Minor(); const on = v26StatsOn();
  return `<div class="card stack-s psstats"><h3>${esc(s.t)}</h3>
    <div class="switchrow"><span id="v26StL">${esc(s.p)}</span><button class="switch" role="switch" aria-checked="${on}" aria-labelledby="v26StL" id="v26Stats" ${minor ? "disabled" : ""}></button></div>
    ${minor ? `<p class="small muted">${esc(s.kid)}</p>` : ""}</div>`;
}
if (typeof psAgeCard === "function") {
  const _psAgeCardV26 = psAgeCard;
  psAgeCard = function (...a) { return _psAgeCardV26.apply(this, a) + v26StatsCard(); };
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("#v26Stats"); if (!b || b.disabled) return;
  ev.stopImmediatePropagation(); const on = !v26StatsOn();
  try { localStorage.setItem("tanetto-statistiche", on ? "1" : "0"); } catch (e) { /* niente */ }
  b.setAttribute("aria-checked", String(on));
  SND.play("tap");
}, true);

/* ---------- 4) Momenti delicati: parole di crisi in 14 lingue, chat + diario + "Lascia andare" + capsula (M-01b, G3-01..03) ----------
   Tre livelli:
   2 = crisi: la risposta di sempre con i numeri di aiuto. Elenchi "forti" (sempre) e "deboli" (solo se nel messaggio non c'e'
       un modo di dire che li spiega: "mi taglio la frangia", "muoio dal ridere", "kill time"...).
   1 = gentile: parole di morte o di sconforto da sole ("morire", "I hate my life"): una domanda gentile + i numeri di aiuto.
   0 = niente.
   Le parole sono confrontate senza accenti (norm) e dall'inizio di una parola (kwHit). In fondo alla parola:
   "=" vuol dire "parola intera" (morta= non trova "mortadella"), "$" vuol dire "alla fine del messaggio".
   Niente viene salvato o mandato a nessuno: si mostra solo un aiuto. */
const V26_CRISIS = {
  it: {
    add: ["mi ammazzo", "mi voglio ammazzare", "voglio ammazzarmi", "mi ucciderei", "mi voglio uccidere", "voglio uccidermi", "mi faccio del male", "mi taglio le braccia", "mi taglio i polsi", "mi sono tagliata apposta", "mi sono tagliato apposta", "farla finita con la vita", "non ce la faccio piu a vivere", "non voglio piu esistere", "vorrei non esistere", "non voglio esistere", "sparire per sempre", "se non ci fossi", "se non esistessi", "vorrei essere mort", "voglio essere mort", "preferirei essere mort", "voglio morie", "voglio morir", "nn voglio piu vivere", "non voglio vivere", "nn voglio vivere", "vojo mori", "penso al suicidio", "mi uccido", "voglio morire", "voglia di morire", "non voglio piu stare al mondo", "non voglio stare al mondo", "nessuno sentirebbe la mia mancanza", "non svegliarmi piu", "non risvegliarmi piu"],
    weak: ["tagliarmi", "mi taglio", "mi sono tagliat", "farla finita", "mi sono fatto del male", "mi sono fatta del male", "mi ammazzo", "mi uccido", "la faccio finita"],
    guard: ["dal ridere", "dalle risate", "dalla fame", "di fame", "di sonno", "da morire", "capelli", "frangia", "unghie", "barba", "compiti", "compito", "verifica", "cucinando", "per sbaglio", "giocando", "cadendo", "a calcio", "in bici", "allenamento", "con la carta", "di caldo", "dal caldo", "di freddo", "di noia", "dalla noia"],
    soft: ["morire", "morto=", "morta=", "muoio=", "non ce la faccio piu", "odio la mia vita", "mi odio=", "vorrei sparire", "voglio sparire"]
  },
  en: {
    add: ["kms=", "wanna die", "want to be dead", "wanna be dead", "alive anymore", "cant go on anymore", "can't go on anymore", "cant go on like this", "can't go on like this", "i cant go on$", "i can't go on$", "better off without me", "better off dead", "wish i was dead", "wish i were dead", "disappear forever", "want to dye", "wanna kms", "kill my self", "want to disappear", "dont want to be here anymore", "don't want to be here anymore", "don't want to exist", "dont want to exist", "take my own life", "unalive", "dont want to wake up", "don't want to wake up", "never wake up again", "nobody would miss me", "no one would miss me", "killing myself", "isnt worth living", "isn't worth living", "not worth living", "kill myself"],
    weak: ["hurt myself", "cut myself", "end it all", "want to disappear", "hurting myself"],
    guard: ["laugh", "lol", "lmao", "haha", "for a pizza", "for a ", "playing", "cooking", "by accident", "accidentally", "party", "dying to", "phone", "battery", "homework", "football", "soccer", "shaving", "paper", "under the blanket", "under my blanket", "to die for", "dead tired", "game", "character"],
    soft: ["die=", "dying=", "dead=", "died=", "i hate my life", "hate myself", "nobody cares about me", "no one cares about me", "can't take it anymore", "cant take it anymore", "i give up$"],
    drop: []
  },
  de: {
    add: ["bringe mich um", "umbringen", "will tot sein", "ware ich tot", "ich ware tot", "ich ware lieber tot", "will nicht mehr da sein", "mochte nicht mehr da sein", "tu mir was an", "tu mir etwas an", "lebensmude", "will nur noch sterben", "einfach nur sterben", "das leben nicht mehr aus", "halte das leben nicht", "nich mehr leben", "mag nicht mehr leben", "will nich mehr leben", "will nicht mehr leben", "kein bock mehr zu leben", "schneide mich", "ritze", "nicht mehr aufwachen", "liebsten tot", "wurde mich vermissen", "wurde mich niemand vermissen"],
    weak: ["bring mich um", "bringe mich um", "umbringen"],
    guard: ["vor lachen", "lach mich", "vor hunger", "spielen", "vor langeweile", "hausaufgaben", "mucke", "zeit"],
    soft: ["sterben", "tot=", "gestorben", "halte es nicht mehr aus", "kann nicht mehr$", "ich hasse mein leben", "ich hasse mich"]
  },
  es: {
    add: ["morirme", "me voy a matar", "no quiero existir", "estuviera muert", "estaria mejor muert", "me hago dano", "me corto los brazos", "me corto las munecas", "kiero morir", "quiero morirme", "ya no quiero vivir", "nadie me extranaria", "no quiero vivir mas"],
    weak: ["cortarme", "me corto", "no quiero seguir", "matarme", "me voy a matar", "acabar con todo", "si me muero", "ya no quiero estar aqui"],
    guard: ["de risa", "de hambre", "el pelo", "pelo", "jugando", "las unas", "por verte", "flequillo", "de sueno", "cocinando", "sin querer", "deberes", "tarea", "de ganas", "de frio", "de calor", "clase", "escuela", "colegio", "fiesta"],
    soft: ["morir", "muerto=", "muerta=", "me muero", "no aguanto mas", "odio mi vida", "me odio="]
  },
  fr: {
    add: ["jveux mourir", "ve mourir", "voudrais etre mort", "veux etre mort", "je me fais du mal", "me coupe les bras", "me coupe les poignets", "veux pas exister", "veux plus exister", "sert a rien de vivre", "en peux plus de vivre", "marre de vivre", "disparaitre a jamais", "personne ne me regretterait", "ne plus me reveiller"],
    weak: ["me tuer", "en finir", "me couper", "veux disparaitre", "je me suis coupe"],
    guard: ["de rire", "de faim", "cheveux", "frange", "devoir", "devoirs", "ongles", "d'envie", "de sommeil", "en cuisinant", "sans faire expres", "par accident", "en jouant", "sous la couette", "de chaud", "de froid", "d'ennui"],
    soft: ["mourir", "mort=", "morte=", "je meurs", "j'en peux plus", "je me deteste", "je deteste ma vie"]
  },
  pt: {
    add: ["quero morre", "kero morrer", "n quero mais viver", "eu me corto", "queria nao existir", "nao quero existir", "nao aguento mais viver", "me machuco de proposito", "queria estar mort", "quero estar mort", "nao acordar mais", "nunca mais acordar"],
    weak: ["me matar", "me machucar", "me cortar", "me corto", "acabar com tudo", "quero sumir", "estar mort", "nao quero mais estar aqui"],
    guard: ["de rir", "de fome", "cabelo", "licao", "dever de casa", "saudade", "jogando", "sem querer", "cozinhando", "de sono", "franja", "unha", "de calor", "de frio", "escola", "aula", "festa"],
    soft: ["morrer", "morto=", "morta=", "to morrendo", "nao aguento mais", "odeio minha vida", "me odeio"]
  },
  ru: {
    add: ["сдохнуть", "лучше бы меня не было", "режу руки", "не хочу больше жить", "исчезнуть навсегда", "умиреть", "не хочу жыть", "жыть не хочу"],
    weak: ["убиться"],
    guard: ["от смеха", "время", "от голода", "со смеху", "ржу"],
    soft: ["умереть", "умру", "умер=", "умерла=", "не могу больше", "ненавижу себя", "ненавижу свою жизнь"]
  },
  pl: {
    add: ["umzec", "chce sie zabic", "byloby lepiej beze mnie", "mam dosc zycia", "chcialabym nie zyc", "chcialbym nie zyc", "popelnie samobojstwo", "zeby sie zabic"],
    weak: ["zabije sie"],
    guard: ["ze smiechu", "z glodu", "z nudow"],
    soft: ["umrzec", "umre=", "umarl=", "umarla=", "nie daje rady", "nienawidze siebie", "nienawidze swojego zycia"]
  },
  nl: {
    add: ["wil doodgaan", "wil dood gaan", "leven zat", "nie meer leven", "wil sterven", "verdwijnen voor altijd", "wil mezelf doden", "doe mezelf pijn"],
    weak: ["snijden", "wil niet meer", "wil dood"],
    guard: ["brood", "wachten", "spelen", "van het lachen", "doodgewoon", "doodnormaal", "doodmoe", "groente", "taart", "haar", "nagels", "school", "huiswerk", "lach me"],
    soft: ["sterven", "dood=", "doodgaan", "ik kan niet meer$", "ik haat mezelf", "ik haat mijn leven"],
    drop: ["er niet meer zijn"]
  },
  tr: {
    add: ["keske olsem"],
    weak: ["olsem", "jilet"],
    guard: ["orada", "gibi", "tatil", "evde", "burada", "yaninda", "yanında", "keskin"],
    soft: ["olmek", "oleyim", "dayanamiyorum", "dayanamıyorum", "kendimden nefret"]
  },
  ja: { add: ["消えてなくなりたい", "生きていたくない"], weak: [], guard: ["笑い", "おいしい", "美味しい", "お腹"], soft: ["死ぬ", "しぬ", "死んじゃう"] },
  ko: { add: ["주꼬싶", "죽고싶다", "살기싫"], weak: ["그냥 죽", "목 매", "죽을래"], guard: ["웃겨", "배고파", "죽 먹", "목 매일", "매일", "귀여워", "맛있"], soft: ["죽을 것 같", "죽겠", "죽음"] },
  zh: { add: ["自尽", "不想活着", "活着好累", "不想醒来"], weak: ["想死"], guard: ["想死你", "笑死", "饿死", "热死", "累死", "困死", "冷死", "气死"], soft: ["绝望", "撑不下去"] },
  zht: { add: ["自盡", "活著沒意思", "活著沒有意思", "想消失", "不想活著", "不想醒來"], weak: ["想死"], guard: ["想死你", "笑死", "餓死", "熱死", "累死", "睏死", "冷死", "氣死"], soft: ["絕望", "撐不下去"] }
};
/* gli elenchi di sempre (chat.K.crisis) diventano la base "forte"; li toglie dalla chat normale, cosi' decide solo crisisLevel */
Object.keys(V26_CRISIS).forEach((l) => {
  const t = T[l]; if (!t || !t.chat || !t.chat.K) return; const D = V26_CRISIS[l];
  D.base = (t.chat.K.crisis || []).slice(); t.chat.K.crisis = [];
  const W = new Set((D.weak || []).map(norm)), X = new Set((D.drop || []).map(norm));
  D.strong = D.base.concat(D.add || []).filter((k) => !W.has(norm(k)) && !X.has(norm(k)));
});
function v26Kw(msg, kw) {
  let k = kw, end = false, whole = false;
  if (k.endsWith("$")) { end = true; k = k.slice(0, -1); } else if (k.endsWith("=")) { whole = true; k = k.slice(0, -1); }
  const nk = norm(k);
  if (end) { const m = msg.replace(/[\s.!?,;:…。！？、~]+$/u, ""); return m.endsWith(nk) && kwHit(m, k); }
  if (!kwHit(msg, k)) return false;
  if (!whole || /[぀-ヿ㐀-鿿가-힯]/.test(nk)) return true;
  return new RegExp(`(^|[^\\p{L}])${nk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^\\p{L}])`, "u").test(msg);
}
function crisisLevel(raw, lang) {
  const lg = lang || S.lang; const D = V26_CRISIS[lg]; if (!D || !D.strong) return 0;
  const m0 = norm(String(raw || "")).replace(/\s+/g, " ").trim(); if (!m0) return 0;
  const alts = [m0];
  if (lg === "de") alts.push(m0.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u"));
  if (lg !== "en") alts.push(m0.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim());
  const hit = (list) => alts.some((m) => (list || []).some((k) => v26Kw(m, k)));
  /* l'inglese vale sempre in aggiunta (molti ragazzi scrivono in inglese anche con l'app in un'altra lingua) */
  const E = lg !== "en" ? V26_CRISIS.en : null;
  if (hit(D.strong) || (E && E.strong && hit(E.strong))) return 2;
  const guarded = hit(D.guard) || (E && hit(E.guard));
  if (!guarded && (hit(D.weak) || (E && hit(E.weak)))) return 2;
  if (!guarded && hit(D.soft)) return 1;
  return 0;
}
const _chatReplyV26 = chatReply;
chatReply = function (raw) {
  const lv = crisisLevel(raw); const t = L();
  if (lv === 2) return { crisis: true, text: t.chat.crisis, lines: t.helpLines || [] };
  if (lv === 1) return { crisis: true, soft: true, text: t.v26.soft, lines: t.helpLines || [] };
  return _chatReplyV26(raw);
};
/* scheda gentile dopo diario, "Lascia andare" e capsula: non blocca niente, non salva niente */
function v26HelpSheet(level) {
  const t = L(), v = t.v26, n = S.petName || ""; const txt = level === 2 ? t.chat.crisis : v.soft;
  const lines = (t.helpLines || []).map((l) => `<p><strong>${l}</strong></p>`).join("");
  const body = `<div class="v26sos sos" role="alert"><p>${esc(txt)}</p>${lines}</div>`;
  if (layer.innerHTML) {
    /* qualcosa e' gia' aperto (es. il gioco "Lascia andare"): l'aiuto entra li' dentro, in cima */
    const box = layer.querySelector(".box, .gbox, .chatbox, .card") || layer.firstElementChild; if (!box || box.querySelector(".v26sos")) return;
    box.insertAdjacentHTML("afterbegin", body); return;
  }
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="v26sT"><div class="box card stack v26sheet"><div class="fdpet small">${petSVG(S.pet, "normale", S.hat, stage(), n)}</div><h2 id="v26sT">${esc(v.sheet.t.split("{n}").join(n))}</h2>${body}
    <button class="btn block" id="v26Talk" type="button">${esc(v.sheet.talk.split("{n}").join(n))}</button><button class="btn ghost block" id="v26Close" type="button">${esc(t.close)}</button></div></div>`;
  const f = document.getElementById("v26Talk"); if (f) f.focus();
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("#v26Talk, #v26Close"); if (!b) return;
  ev.stopImmediatePropagation(); layer.innerHTML = ""; if (b.id === "v26Talk" && typeof openChat === "function") openChat();
}, true);
/* diario: si legge il testo prima che il salvataggio lo cancelli dal campo; la scheda arriva dopo il "Salvato" */
document.addEventListener("submit", (ev) => {
  if (!ev.target || ev.target.id !== "diaryForm") return; const i = document.getElementById("line"); const lv = crisisLevel(i ? i.value : "");
  if (lv) setTimeout(() => v26HelpSheet(lv), 900);
}, true);
if (typeof doLetgo === "function") {
  const _doLetgoV26 = doLetgo;
  doLetgo = function (...a) { const i = document.getElementById("lgIn"); const lv = crisisLevel(i ? i.value : ""); const r = _doLetgoV26.apply(this, a); if (lv) setTimeout(() => v26HelpSheet(lv), 1400); return r; };
}
if (typeof sealCapsule === "function") {
  const _sealCapsuleV26 = sealCapsule;
  sealCapsule = function (...a) { const i = document.getElementById("capsIn"); const lv = crisisLevel(i ? i.value : ""); const r = _sealCapsuleV26.apply(this, a); if (lv) setTimeout(() => v26HelpSheet(lv), 1200); return r; };
}

/* ---------- 5) Numeri di aiuto per Paese, con le linee per bambini e ragazzi (M-12, I-06) ----------
   Il Paese si capisce prima dal fuso orario (dove si e' davvero), poi dalla regione della lingua del telefono; se il Paese
   non e' in tabella restano i numeri della lingua dell'app. Sempre in fondo: "Altri Paesi: findahelpline.com".
   Numeri controllati il 14/11/2026 sulle fonti ufficiali o su findahelpline.com (ThroughLine). */
const V26_HELP = {
  IT: ["Telefono Amico Italia: 02 2327 2327", "Telefono Azzurro, per bambini e ragazzi: 19696", "Emergenze: 112"],
  GB: ["Samaritans: 116 123", "Childline, for children and young people: 0800 1111", "Emergencies: 999"],
  IE: ["Samaritans: 116 123", "Childline (ISPCC), for children and young people: 1800 66 66 66", "Emergencies: 112 or 999"],
  US: ["988 Suicide and Crisis Lifeline: call or text 988", "Emergencies: 911"],
  CA: { en: ["Suicide Crisis Helpline: call or text 988", "Kids Help Phone: 1-800-668-6868 (text 686868)", "Emergencies: 911"],
        fr: ["Ligne d'aide en cas de crise suicidaire : appel ou texto au 988", "Jeunesse, J'écoute : 1-800-668-6868 (texto 686868)", "Urgences : 911"] },
  AU: ["Lifeline: 13 11 14", "Kids Helpline: 1800 55 1800", "Emergencies: 000"],
  NZ: ["Need to talk? Call or text 1737", "Youthline: 0800 376 633", "Emergencies: 111"],
  IN: ["Tele-MANAS: 14416", "Childline: 1098", "Emergencies: 112"],
  DE: ["TelefonSeelsorge: 0800 111 0 111 oder 0800 111 0 222", "Nummer gegen Kummer, für Kinder und Jugendliche: 116 111", "Notruf: 112"],
  AT: ["Telefonseelsorge: 142", "Rat auf Draht, für Kinder und Jugendliche: 147", "Notruf: 112"],
  CH: { de: ["Die Dargebotene Hand: 143", "Pro Juventute, für Kinder und Jugendliche: 147", "Notruf: 112"],
        fr: ["La Main Tendue : 143", "Pro Juventute, pour les enfants et les jeunes : 147", "Urgences : 112"],
        it: ["Telefono Amico: 143", "Pro Juventute, per bambini e ragazzi: 147", "Emergenze: 112"] },
  FR: ["Numéro national de prévention du suicide : 3114", "Allô Enfance en Danger : 119", "SOS Amitié : 09 72 39 40 50", "Urgences : 112"],
  BE: { fr: ["Centre de Prévention du Suicide : 0800 32 123", "Écoute-Enfants : 103", "Urgences : 112"],
        nl: ["Zelfmoordlijn: 1813", "Awel, voor kinderen en jongeren: 102", "Noodnummer: 112"] },
  ES: ["Línea de atención a la conducta suicida: 024", "Fundación ANAR, para niños y adolescentes: 900 20 20 10", "Emergencias: 112"],
  MX: ["Línea de la Vida: 800 911 2000", "Emergencias: 911"],
  CL: ["Línea de Prevención del Suicidio: *4141", "Emergencias: 131"],
  PT: ["SNS 24 (apoio psicológico): 808 24 24 24", "SOS Voz Amiga: 213 544 545", "SOS Criança: 116 111", "Emergência: 112"],
  BR: ["CVV, Centro de Valorização da Vida: 188", "SAMU: 192"],
  NL: ["113 Zelfmoordpreventie: 113 of 0800-0113 (gratis)", "De Kindertelefoon: 0800-0432 (gratis)", "Noodnummer: 112"],
  PL: ["Telefon zaufania dla dorosłych: 116 123", "Telefon zaufania dla dzieci i młodzieży: 116 111", "Centrum Wsparcia (całodobowo): 800 70 2222", "Numer alarmowy: 112"],
  RU: ["Детский телефон доверия (бесплатно): 8-800-2000-122", "Единый номер экстренных служб: 112", "Москва, экстренная психологическая помощь: 051 (с мобильного 8-495-051)"],
  TR: ["Acil Çağrı Merkezi: 112", "ALO 183 Sosyal Destek Hattı: 183"],
  JP: ["よりそいホットライン(24時間・無料): 0120-279-338", "チャイルドライン(18歳まで・無料): 0120-99-7777", "緊急: 119(救急)・110(警察)"],
  KR: ["자살예방상담전화: 109 (24시간)", "청소년상담전화: 1388", "긴급: 112 · 119"],
  CN: ["全国心理援助热线: 12356", "青少年服务热线: 12355", "紧急: 120(急救)· 110(报警)"],
  TW: ["安心專線(24小時): 1925", "生命線: 1995", "張老師專線: 1980", "緊急: 119 · 110"],
  HK: ["情緒通(24小時): 18111", "撒瑪利亞防止自殺會: 2389 2222", "緊急: 999"]
};
const V26_TZ = { "America/Toronto": "CA", "America/Vancouver": "CA", "America/Edmonton": "CA", "America/Winnipeg": "CA", "America/Halifax": "CA", "America/St_Johns": "CA", "America/Regina": "CA", "America/Montreal": "CA", "America/Moncton": "CA",
  "Pacific/Auckland": "NZ", "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "America/Mexico_City": "MX", "America/Cancun": "MX", "America/Monterrey": "MX", "America/Tijuana": "MX", "America/Merida": "MX", "America/Chihuahua": "MX", "America/Hermosillo": "MX", "America/Mazatlan": "MX",
  "America/Santiago": "CL", "Asia/Shanghai": "CN", "Asia/Urumqi": "CN", "Asia/Chongqing": "CN", "Asia/Taipei": "TW", "Asia/Hong_Kong": "HK", "Asia/Tokyo": "JP", "Asia/Seoul": "KR", "Europe/Istanbul": "TR", "Europe/London": "GB", "Europe/Dublin": "IE",
  "Europe/Moscow": "RU", "Europe/Kaliningrad": "RU", "Europe/Samara": "RU", "Asia/Yekaterinburg": "RU", "Asia/Novosibirsk": "RU", "Asia/Krasnoyarsk": "RU", "Asia/Irkutsk": "RU", "Asia/Vladivostok": "RU", "Asia/Omsk": "RU" };
/* Paese: prima il fuso orario, poi la regione della lingua del telefono (o, senza nessun segnale, quella della lingua dell'app) */
function v26HelpRegion() {
  let tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* niente */ }
  const r = V26_TZ[tz] || (/^Australia\//.test(tz) ? "AU" : /^America\/(Sao_Paulo|Bahia|Fortaleza|Recife|Manaus|Belem|Cuiaba|Campo_Grande|Porto_Velho|Rio_Branco|Maceio|Araguaina|Boa_Vista|Santarem|Noronha)$/.test(tz) ? "BR" : "") ||
    (typeof AGE_TZ === "object" && AGE_TZ[tz]) || "";
  if (r) return r;
  return typeof ageRegion === "function" ? ageRegion() : "";
}
function v26HelpLines(l, base) {
  const r = v26HelpRegion(); const e = r ? V26_HELP[r] : null; const v = (T[l] && T[l].v26) || {};
  if (e) return (Array.isArray(e) ? e : e[l] || e[Object.keys(e)[0]]).concat(v.more ? [v.more] : []);
  /* Paese conosciuto ma senza numeri controllati: niente numeri di un altro Paese (es. Spagna in Argentina) */
  if (r) return [v.find, v.emerg].filter(Boolean);
  return (base || []).concat(v.more ? [v.more] : []);
}
Object.keys(T).forEach((l) => {
  const t = T[l]; if (!t || !Array.isArray(t.helpLines)) return; const base = t.helpLines.slice();
  Object.defineProperty(t, "helpLines", { configurable: true, enumerable: true, get: () => v26HelpLines(l, base) });
});
