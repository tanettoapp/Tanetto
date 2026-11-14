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
/* b2) richiesta di recensione su Google Play: mai ai giovani ne' a chi non ha detto l'eta' (come la 1.0.10 di sicurezza) */
if (typeof rev20Allowed === "function") { const _rev20AllowedV26 = rev20Allowed; rev20Allowed = function (...a) { if (v26Young()) return false; return _rev20AllowedV26.apply(this, a); }; }
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
/* e) video con premio: la 1.0.9 (98zg, punto 9) dice gia' "raddoppia" solo per il primo video del giorno con il regalo
   aperto, poi "un regalo in piu'". Ai giovani mai "raddoppia" (nessuna urgenza): sempre "un regalo in piu'" (E-02). */
Object.keys(V19AD).forEach((k) => {
  const o = V19AD[k], v = V23[k] || V23.en; if (!o || o.v26) return; const g0 = o.gift, t0 = o.thanks; o.v26 = 1;
  o.gift = (n) => (v26Young() ? v.adMore(n) : g0(n));
  o.thanks = (n) => (v26Young() ? v.adThanksMore(n) : t0(n));
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

/* ---------- 6) Soldi e Tanì (M-04, M-05, M-06/CR-03, D-09, H-17 in 45z) ---------- */
/* a) Scambiare un obiettivo gia' fatto con uno nuovo non paga di nuovo (M-04, D-03). Quando nell'editor si toglie un
   obiettivo gia' premiato oggi e se ne mette uno nuovo, il nuovo "eredita" il posto premiato: oggi si puo' spuntare, ma
   senza Tanì, XP, passi della stagione o giorni dei trofei (come un obiettivo tolto e rimesso). Aggiungere obiettivi
   (fino a 8) senza toglierne resta come prima. Il registro e' econ().v26inh[giorno]. */
function v26GoalsInherit(before, after) {
  if (!S.pet || S.day !== dkey()) return; const e = econ(); const d = S.day;
  const rw = (e.rw[d] || []).concat((e.v26inh || {})[d] || []);
  const removed = before.filter((g) => !after.includes(g) && rw.includes(g));
  const added = after.filter((g) => !before.includes(g) && !rw.includes(g));
  const n = Math.min(removed.length, added.length); if (!n) return;
  e.v26inh = e.v26inh || {}; Object.keys(e.v26inh).forEach((k) => { if (k < d) delete e.v26inh[k]; });
  e.v26inh[d] = (e.v26inh[d] || []).concat(added.slice(0, n)); save();
}
const _econAlreadyRewardedV26 = econAlreadyRewarded;
econAlreadyRewarded = function (g) {
  if (_econAlreadyRewardedV26(g)) return true;
  try { const e = econ(); return !!(S.pet && !S.away && S.day === dkey() && todayGoals().includes(g) && !S.done.includes(g) && ((e.v26inh || {})[S.day] || []).includes(g)); } catch (err) { return false; }
};
/* b) Ogni Tanì speso con un tocco conta prima sui Tanì dei pacchetti, anche quando un altro ascoltatore ferma il tocco
   (albero di Natale, 98d, stopImmediatePropagation): il controllo ora parte dalla finestra, prima di tutti (M-05, D-04).
   Il controllo vecchio (98ze, sul documento) viene saltato quando c'e' gia' questo, per non contare due volte. */
let v26SpendSnap = null;
window.addEventListener("click", () => {
  v26SpendSnap = { seeds: S.seeds, xv: XV_IDS.filter((id) => S.owned.includes(id)).length, s: S };
  setTimeout(() => {
    const sn = v26SpendSnap; v26SpendSnap = null; xvSpendSnap = null; /* il controllo di 98ze, se c'e', non conta di nuovo */
    /* stato sostituito (ripristino di un backup o di una copia): non e' una spesa */
    if (!sn || sn.s !== S) return; const d = sn.seeds - S.seeds; if (d <= 0) return;
    if (XV_IDS.filter((id) => S.owned.includes(id)).length > sn.xv) return;
    try { const e = econ(); if ((+e.paid || 0) > (+e.spentN || 0)) { e.spentN = (+e.spentN || 0) + d; save(); } } catch (err) { /* niente */ }
  }, 0);
}, true);
/* c) I Tanì che arrivano solo con Tanetto Plus contano come "pagati": non accorciano gli Introvabili (regola del proprietario,
   M-06, D-05, CR-03): i 750 Tanì al mese e i Tanì del sentiero d'oro della stagione. Il regalo del giorno triplo (x3) di Plus
   NON e' toccato qui: e' una decisione riservata al proprietario (CHANGES_110.md, DA DECIDERE). */
const _plusMonthlyV26 = plusMonthly;
plusMonthly = function (...a) {
  const r = _plusMonthlyV26.apply(this, a);
  if (r) { try { const e = econ(); e.paid = (+e.paid || 0) + EC.PLUS_MONTH; save(); } catch (err) { /* niente */ } }
  return r;
};
const _sRewardV26 = sReward;
sReward = function (tr, n, se) { const r = _sRewardV26(tr, n, se); return r && tr === "g" && r.tani ? Object.assign({}, r, { v26g: 1 }) : r; };
const _giveRewardV26 = giveReward;
giveReward = function (r) {
  const out = _giveRewardV26(r);
  if (r && r.v26g && r.tani) { try { const e = econ(); e.paid = (+e.paid || 0) + r.tani; save(); } catch (err) { /* niente */ } }
  return out;
};
/* d) Video preparato da troppo tempo (riaprendo l'app dopo ore): prima il primo tocco diceva "Nessuna pubblicita'
   disponibile" e solo dopo 5 secondi se ne preparava una nuova. Ora si ricarica subito e il tocco aspetta il video (D-09). */
const _adsLoadV26 = adsLoad;
adsLoad = function (...a) { if (adsSt.loaded && !adFresh()) adsSt.loaded = false; return _adsLoadV26.apply(this, a); };
const _adShowV26 = adShow;
adShow = async function (onReward, src) {
  if (!adsBusy && adsSt.canRequestAds && adsSt.loaded && !adFresh() && adsLeftToday() > 0) {
    adsSt.loaded = false; try { await adsLoad(); } catch (e) { /* niente */ }
  }
  return _adShowV26(onReward, src);
};

/* ---------- 7) Regalo del giorno che perdona (M-07, E-01, D-01, D-12) ----------
   Prima bastava un giorno senza aprire l'app (anche un weekend senza obiettivi, un giorno di riposo o protetto da uno scudo)
   e il regalo tornava al minimo (18 -> 6 Tanì). Ora:
   - i giorni liberi (senza obiettivi), di riposo, protetti da uno scudo o con almeno un obiettivo fatto non interrompono la serie;
   - per ogni giorno saltato davvero la serie scende di 2 invece di ripartire da 1;
   - se la data torna indietro (viaggio verso ovest, orologio corretto) la serie resta com'e'. */
visitTick = function () {
  const t = dkey(); const v = S.visit || { n: 0, last: null }; if (v.last === t) return;
  if (v.last && t < v.last) return;
  try { if (typeof useShieldIfNeeded === "function") useShieldIfNeeded(); } catch (e) { /* niente */ }
  let n = 1;
  if (v.last) {
    const c = ldate(v.last); c.setDate(c.getDate() + 1); let missed = 0; const sh = S.shielded || [];
    for (let i = 0; i < 400 && dkey(c) < t; i++) {
      const k = dkey(c); const r = (S.days || {})[k];
      if (!((r && (r.rest || r.free || r.done > 0)) || sh.includes(k))) missed++;
      c.setDate(c.getDate() + 1);
    }
    n = missed === 0 ? (v.n || 0) + 1 : Math.max(1, (v.n || 1) - 2 * missed);
  }
  S.visit = { last: t, n }; save();
};

/* ---------- 8) Memoria del telefono piena (M-08, H-01, H-02) ----------
   Prima il salvataggio fallito non diceva niente (alla chiusura si perdeva la giornata) e, per fare spazio, si cancellava
   per prima la copia di sicurezza piu' recente. Ora si accorciano prima registro e conteggi, la copia piu' recente per
   ultima, e se non basta un avviso (una volta, finche' un salvataggio non riesce di nuovo). */
const _secFreeSpaceV26 = secFreeSpace;
secFreeSpace = function (step) { return _secFreeSpaceV26([0, 1, 3, 4, 2][step]); };
let v26SaveWarned = false;
const _saveV26 = save;
save = function (...a) {
  const r = _saveV26.apply(this, a);
  if (secSaveOk) v26SaveWarned = false;
  else if (!v26SaveWarned) { v26SaveWarned = true; setTimeout(() => { try { toast(L().v26.full); } catch (e) { /* niente */ } }, 0); try { track("salvataggio-fallito"); } catch (e) { /* niente */ } }
  return r;
};

/* ---------- 9) Backup online con due telefoni (M-06b, CR-02, G1-02) ----------
   Prima un telefono vecchio, aperto dopo settimane, sovrascriveva in silenzio il backup piu' recente dell'altro telefono
   (vince l'ultimo che salva) e il ripristino cancellava anche i Tanì comprati dopo l'ultimo backup.
   a) backup automatico: prima si legge il backup online; se e' piu' recente dell'ultimo fatto da questo telefono ed e'
      diverso, non si sovrascrive: si chiede quale tenere (la stessa finestra di quando si accede).
   b) ripristino: i Tanì comprati con soldi veri e non ancora spesi su questo telefono restano (i pagamenti sono gia' chiusi).
   c) finestre di ripristino e di scelta: livello e Tanì del backup accanto a quelli di questo telefono, e un avviso se il
      backup ha meno progressi. */
const _backupNowV26 = backupNow;
backupNow = function (force) {
  if (force || !A.uid || !S.pet) return _backupNowV26(force);
  return (async () => {
    try {
      await fbLoad(); const c = await window.TanFB.pull();
      if (c && c.d && +c.at > (+A.last || 0) + 60e3 && hashStr(c.d) !== A.h) {
        const st = await unpackState(c.d);
        if (st && st.pet) { cloudPending = { st, at: c.at }; v26ChoiceWhenFree(0); return false; }
      }
    } catch (e) { return false; }
    return _backupNowV26(force);
  })();
};
/* la scelta si apre appena non c'e' un'altra finestra aperta (fino a 10 minuti) */
function v26ChoiceWhenFree(k) {
  if (!cloudPending || layer.querySelector("#acUseCloud")) return;
  if (!layer.innerHTML && !(typeof tutOn !== "undefined" && tutOn)) { openChoice(); return; }
  if (k < 200) setTimeout(() => v26ChoiceWhenFree(k + 1), 3000);
}
function v26PaidLeft(st) { try { const e = (st && st.v20econ) || {}; return Math.max(0, (+e.paid || 0) - (+e.spentN || 0)); } catch (e) { return 0; } }
const _applyCloudV26 = applyCloud;
applyCloud = function (st, at) {
  const keep = v26PaidLeft(S); const had = v26PaidLeft(st);
  const r = _applyCloudV26(st, at);
  const add = Math.max(0, keep - had);
  if (add > 0) { try { S.seeds = (+S.seeds || 0) + add; const e = econ(); e.paid = (+e.paid || 0) + add; save(); render(); } catch (e) { /* niente */ } }
  return r;
};
function v26BkLine(st) {
  const b = L().v26.bk; const nf = (n) => { try { return Math.round(+n || 0).toLocaleString(loc(), NUMG); } catch (e) { return String(Math.round(+n || 0)); } };
  const line = b.cmp.replace("{a}", nf(st.level || 1)).replace("{b}", nf(st.seeds)).replace("{c}", nf(S.level || 1)).replace("{d}", nf(S.seeds));
  const less = (+st.level || 1) < (+S.level || 1) || ((+st.level || 1) === (+S.level || 1) && (+st.seeds || 0) < (+S.seeds || 0));
  return `<p class="small v26bk">${esc(line)}</p>${less ? `<p class="small v26bkless" role="note">${esc(b.less)}</p>` : ""}`;
}
const _openChoiceV26 = openChoice;
openChoice = function (...a) {
  const r = _openChoiceV26.apply(this, a);
  try { const c = cloudPending; const box = layer.querySelector(".acbox"); if (c && box && !box.querySelector(".v26bk")) { const p = box.querySelector("p"); if (p) p.insertAdjacentHTML("afterend", v26BkLine(c.st)); } } catch (e) { /* niente */ }
  return r;
};
const _askRestoreV26 = askRestore;
askRestore = async function (...a) {
  const r = await _askRestoreV26.apply(this, a);
  try { const c = restorePending; const box = layer.querySelector(".acbox"); if (c && box && !box.querySelector(".v26bk")) { const p = box.querySelector("p"); if (p) p.insertAdjacentHTML("afterend", v26BkLine(c.st)); } } catch (e) { /* niente */ }
  return r;
};

/* ---------- 10) Editor degli obiettivi: "Le modifiche valgono da subito" ora e' vero (M-06c, G2-01) ----------
   Prima i giorni toccati e gli obiettivi aggiunti o tolti restavano una bozza: uscendo dalla pagina senza "Salva" si
   perdevano in silenzio. Ora ogni modifica valida (da 3 a 8 obiettivi, ognuno con almeno un giorno) si salva subito,
   con la stessa logica di "Salva gli obiettivi" (e lo scambio di 6a). "Salva" resta come conferma. */
function v26GoalsApply() {
  if (!S.pet || typeof editGoals === "undefined" || !editGoals) return;
  const list = editGoals; if (list.length < GOALS_MIN || list.length > GOALS_MAX || !list.every((g) => g.days.length)) return;
  const same = list.length === S.goals.length && list.every((g, i) => S.goals[i] && S.goals[i].id === g.id && S.goals[i].days.join() === g.days.join());
  if (same) return;
  const before = todayGoals();
  S.goals = list.map((g) => ({ id: g.id, days: g.days.slice() }));
  const tg = todayGoals(); S.done = S.done.filter((g) => tg.includes(g)); const r = dayRec(); r.done = S.done.length;
  if (S.energy < 100 && tg.length) S.energy = Math.min(100, (S.done.length / tg.length) * 100);
  v26GoalsInherit(before, tg);
  ecSaveSnap = { energy: S.energy, day: S.day, away: !!S.away }; save(); econAfterSave();
  if (!v26GoalsApply.told) { v26GoalsApply.told = 1; setTimeout(() => toast(L().goalsSaved), 0); }
}
let v26GoalsBefore = null;
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || !S.pet) return;
  if (b.id === "saveGoals") { v26GoalsBefore = todayGoals(); setTimeout(() => { const bf = v26GoalsBefore; v26GoalsBefore = null; if (bf) v26GoalsInherit(bf, todayGoals()); }, 0); return; }
  const edit = b.dataset.gday !== undefined || b.id === "addGoal" || (b.dataset.goal !== undefined && b.classList.contains("chip"));
  if (edit && typeof editGoals !== "undefined") setTimeout(() => { try { v26GoalsApply(); } catch (e) { /* niente */ } }, 0);
}, true);

/* ---------- 11) Coreano: particelle giuste dopo i nomi (C-07) ----------
   Prima si vedevano le forme doppie "Germo이(가)", "은(는)", "을(를)"... (48 frasi). koJ sceglie la forma giusta guardando
   l'ultima lettera prima della particella (sillaba coreana con o senza consonante finale; per le lettere latine: vocale o no).
   Si usa in esc() (45_state.js, tutto il testo delle pagine), negli avvisi, nei promemoria e, come ultima rete, sul testo
   che compare nella pagina. */
function koJ(s) {
  return String(s).replace(/([가-힣A-Za-z0-9])(이\(가\)|은\(는\)|을\(를\)|와\(과\)|과\(와\)|\(으\)로|아\(야\)|\(이\)?예요|이에요\(예요\))/g, (m, c, p) => {
    const k = c.charCodeAt(0); let b;
    if (k >= 0xAC00 && k <= 0xD7A3) { const j = (k - 0xAC00) % 28; b = j === 0 ? "v" : j === 8 ? "l" : "c"; } else b = /[aeiouyAEIOUY]/.test(c) ? "v" : /[lL]/.test(c) ? "l" : /[0-9]/.test(c) ? ("2459".includes(c) ? "v" : c === "1" || c === "7" || c === "8" ? "l" : "c") : "c";
    if (p === "(으)로") return c + (b === "c" ? "으로" : "로");
    if (p === "(이)예요" || p === "이에요(예요)") return c + (b === "v" ? "예요" : "이에요");
    const P = { "이(가)": ["가", "이"], "은(는)": ["는", "은"], "을(를)": ["를", "을"], "와(과)": ["와", "과"], "과(와)": ["와", "과"], "아(야)": ["야", "아"] }[p];
    return c + (b === "v" ? P[0] : P[1]);
  });
}
const _toastV26 = toast;
toast = function (msg, ...a) { return _toastV26.call(this, S && S.lang === "ko" ? koJ(msg) : msg, ...a); };
(() => {
  const x = V19N.ko; if (!x) return; const base = x.msgs.slice(); const nm = () => S.petName || "";
  Object.defineProperty(x, "msgs", { configurable: true, get: () => base.map((m) => koJ(m.split("{n}").join(nm()))) });
  ["streak", "last", "trip"].forEach((k) => { const f = x[k]; if (typeof f === "function") x[k] = (...a) => koJ(f(...a)); });
  if (T.ko && T.ko.v12) { const rt = T.ko.v12.remTitle; T.ko.v12.remTitle = (n) => koJ(rt(n)); }
})();
/* ultima rete: testo comparso nella pagina (anche quello scritto senza esc) */
const V26_KO_RE = /[가-힣A-Za-z0-9](이\(가\)|은\(는\)|을\(를\)|와\(과\)|과\(와\)|\(으\)로|아\(야\))/;
function v26KoFix(root) {
  if (!S || S.lang !== "ko" || !root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) if (V26_KO_RE.test(n.nodeValue)) n.nodeValue = koJ(n.nodeValue);
  if (root.querySelectorAll) root.querySelectorAll("[aria-label]").forEach((e) => { const v = e.getAttribute("aria-label"); if (V26_KO_RE.test(v)) e.setAttribute("aria-label", koJ(v)); });
}
new MutationObserver((ms) => { if (!S || S.lang !== "ko") return; ms.forEach((m) => { if (m.type === "characterData") { if (V26_KO_RE.test(m.target.nodeValue)) m.target.nodeValue = koJ(m.target.nodeValue); } else m.addedNodes.forEach((a) => { if (a.nodeType === 3) { if (V26_KO_RE.test(a.nodeValue)) a.nodeValue = koJ(a.nodeValue); } else v26KoFix(a); }); }); })
  .observe(document.body, { childList: true, subtree: true, characterData: true });

/* ---------- 12) Accessibilita' (M-24..M-28, F-01..F-13) e misure (M-29..M-35) ---------- */
/* a) F-02 / F-10: la nuvoletta del compagno non annuncia piu' ogni lettera ne' le frasi "a riposo". Una regione nascosta
   (#v26live) legge UNA volta la frase intera, solo se arriva subito dopo un tocco della persona; e dice anche i Tanì
   guadagnati o spesi con un tocco ("+5 Tanì, 645 in tutto"). */
let v26TouchAt = 0;
["pointerdown", "keydown"].forEach((n) => document.addEventListener(n, () => { v26TouchAt = Date.now(); }, true));
let v26LiveT = 0;
function v26Live(msg) {
  const el = document.getElementById("v26live"); if (!el || !msg) return;
  el.textContent = ""; clearTimeout(v26LiveT); v26LiveT = setTimeout(() => { el.textContent = S && S.lang === "ko" ? koJ(msg) : msg; }, 120);
}
const _sayV26 = say;
say = function (text, ...a) {
  const r = _sayV26.call(this, text, ...a);
  if (text && Date.now() - v26TouchAt < 1500) v26Live(`${S.petName || ""}: ${text}`);
  return r;
};
let v26SeedsSeen = null;
const _econShowV26 = econShow;
econShow = function (...a) {
  const r = _econShowV26.apply(this, a);
  try { const d = S.seeds - (v26SeedsSeen == null ? S.seeds : v26SeedsSeen); if (d && Date.now() - v26TouchAt < 3000) { const nf = (n) => Math.round(n).toLocaleString(loc(), NUMG); v26Live(`${d > 0 ? "+" : "−"}${nf(Math.abs(d))} Tanì · ${nf(S.seeds)} Tanì`); } } catch (e) { /* niente */ }
  v26SeedsSeen = S.seeds; return r;
};
/* b) F-03: avviso (toast) sempre presente per i lettori di schermo; il testo arriva al fotogramma dopo (cosi' viene letto)
   e resta almeno 4 secondi (piu' a lungo se e' lungo). */
const _toastBaseV26 = toast;
toast = function (msg, ...a) {
  const el = document.getElementById("toast"); if (!el) return _toastBaseV26.call(this, msg, ...a);
  const m = S && S.lang === "ko" ? koJ(msg) : msg;
  el.hidden = false; el.textContent = ""; clearTimeout(toastTimer);
  requestAnimationFrame(() => { el.textContent = m; el.classList.add("v26on"); });
  toastTimer = setTimeout(() => { el.hidden = true; el.classList.remove("v26on"); }, Math.max(4000, 60 * String(m || "").length));
};
/* c) F-01: negozio e viaggi fuori dallo schermo (il telefono non li disegna finche' non si scorre): nome sempre leggibile */
function v26Names(root) {
  (root || document).querySelectorAll(".grid3 > .item, .grid3 > button, button.dest, .dest > button").forEach((b) => {
    if (b.hasAttribute("aria-label") || !b.matches("button")) return;
    const txt = (b.textContent || "").replace(/\s+/g, " ").trim(); if (txt) b.setAttribute("aria-label", txt);
  });
}
/* d) F-05: suggerimenti della prima volta = finestra: il resto dell'app non si raggiunge con Tab o TalkBack */
const _fmDialogV26 = fmDialog;
fmDialog = function () { return _fmDialogV26() || document.querySelector(".tutwrap .tutbox"); };
/* e) F-11: immagini 3D dei momenti importanti con una descrizione (prima alt="") */
function v26MomentAlt(root) {
  (root || document).querySelectorAll("img.i3d.mom:not([alt]), img.i3d.mom[alt='']").forEach((i) => { i.alt = S.petName || ""; });
}
/* f) M-54 / G-11: l'entrata morbida delle pagine non lascia ascoltatori appesi (prima +10 a ogni cambio di scheda) */
viewEnter = function (items, dx) {
  items.forEach((el, i) => {
    if (el.__v26ve) { el.removeEventListener("animationend", el.__v26ve); el.removeEventListener("animationcancel", el.__v26ve); el.__v26ve = null; }
    if (!anim) { el.classList.remove("venter"); return; }
    el.style.setProperty("--vi", i); el.style.setProperty("--vdx", dx * 0.6 + "px"); el.style.setProperty("--vdy", (dx ? 4 : 12) + "px");
    el.classList.remove("venter"); el.classList.add("venter");
    const done = (ev) => { if (ev.target !== el) return; el.classList.remove("venter"); el.style.removeProperty("--vi"); el.style.removeProperty("--vdx"); el.style.removeProperty("--vdy"); el.removeEventListener("animationend", done); el.removeEventListener("animationcancel", done); el.__v26ve = null; };
    el.__v26ve = done; el.addEventListener("animationend", done); el.addEventListener("animationcancel", done);
  });
};
/* g) M-35 / B-11: Tanì in alto in forma corta (99,9K) quando il numero e' grande e lo schermo stretto; il valore intero
   resta nella pagina dei Tanì e nei negozi */
const v26SeedFmt = (n) => {
  const v = Math.round(n); const big = v >= 100000 || (v >= 10000 && window.innerWidth < 400);
  try { if (big) return v.toLocaleString(loc(), { notation: "compact", maximumFractionDigits: 1, roundingMode: "trunc" }); return v.toLocaleString(loc(), NUMG); } catch (e) { return String(v); }
};
const _countUpV26 = countUp;
countUp = function (el, from, to) {
  if (!el || el.id !== "seedN") return _countUpV26(el, from, to);
  const f = el.dataset.v26 != null && el.textContent === el.dataset.v26t ? +el.dataset.v26 : from;
  _countUpV26(el, f, to);
  const fix = () => { if (!el.isConnected) return; el.dataset.v26 = String(to); el.textContent = v26SeedFmt(to); el.dataset.v26t = el.textContent;
    const top = el.closest(".top"); if (top) top.classList.toggle("v26big", to >= 10000 && window.innerWidth < 400); };
  if (!anim || f == null || f === to) fix(); else setTimeout(fix, 1300);
};
econShow = (function (prev) {
  return function (...a) {
    const el = document.getElementById("seedN");
    if (el && el.dataset.v26 != null && el.textContent === el.dataset.v26t) el.textContent = Math.round(+el.dataset.v26).toLocaleString(loc(), NUMG);
    return prev.apply(this, a);
  };
})(econShow);
/* h) M-32 / B-06 / F-13: Plus con caratteri grandi: se la parte fissa in basso (piani + pulsante) occupa piu' del 45% della
   finestra, scorre con il resto (prima a 2x copriva tutto) */
function v26PlusSticky() {
  const box = layer.querySelector(".plusbox"); const st = box && box.querySelector(".plussticky"); if (!st) return;
  st.classList.remove("v26static"); if (st.offsetHeight > box.clientHeight * 0.45) st.classList.add("v26static");
}
/* i) B-10: tastiera "Avanti" nei campi del nome */
function v26Hints(root) { (root || document).querySelectorAll("#userName, #petName").forEach((i) => { if (!i.hasAttribute("enterkeyhint")) i.setAttribute("enterkeyhint", "next"); }); }
/* tutto dopo ogni disegno della pagina e quando si apre una finestra */
function v26FitBadges(root) {
  (root || document).querySelectorAll(".rar").forEach((x) => { x.style.fontSize = ""; let f = parseFloat(getComputedStyle(x).fontSize) || 12; let k = 0;
    while (x.scrollWidth > x.clientWidth + 0.5 && f > 11.5 && k++ < 8) { f -= 0.5; x.style.fontSize = f + "px"; } });
}
function v26After(root) { try { v26FitBadges(root); v26Names(root); v26MomentAlt(root); v26Hints(root); v26PlusSticky(); } catch (e) { /* niente */ } }
const _renderV26 = render;
render = function (...a) { const r = _renderV26.apply(this, a); v26After(document.getElementById("app")); return r; };
new MutationObserver(() => v26After(layer)).observe(layer, { childList: true });
window.addEventListener("resize", () => { try { v26PlusSticky(); } catch (e) { /* niente */ } });

/* ---------- 13) Testi: FAQ, disdetta, viaggio, "chi sei", titolo, tipografia (E-15, I-07, C-22, G3-08, C-20, C-09, C-11, C-13) ---------- */
/* a) C-13: la settimana inizia come sul telefono (domenica negli Stati Uniti, in Brasile, Giappone...); solo l'ordine mostrato */
function v26WeekOrder() {
  let fd = 1; /* 1 = lunedi' ... 7 = domenica (Intl) */
  try { const loc0 = new Intl.Locale(navigator.language || "en"); const w = typeof loc0.getWeekInfo === "function" ? loc0.getWeekInfo() : loc0.weekInfo; if (w && w.firstDay) fd = w.firstDay; } catch (e) { fd = 1; }
  const s = (fd + 6) % 7; /* indice dell'app: 0 = lunedi' */
  return [0, 1, 2, 3, 4, 5, 6].map((i) => (i + s) % 7);
}
/* b) I-07: anche senza prova gratuita si dice dove disdire */
const _billLabelsV26 = billLabels;
billLabels = function (...a) {
  const r = _billLabelsV26.apply(this, a);
  try { const el = document.getElementById("plusAfterTxt"); const w = L().v26.where; if (el && w && !/Google Play/.test(el.textContent)) el.textContent = `${el.textContent} ${w}`; } catch (e) { /* niente */ }
  return r;
};
plusLabels = billLabels;
/* c) E-15: "Risposte veloci" in Profilo › Aiuto e idee (5 domande che portano a rimborsi e recensioni negative) */
function v26FaqCard() {
  const f = L().v26.faq; if (!f) return "";
  const items = f.qa.map(([q, a], i) => `<details class="v26faq"><summary>${esc(q)}</summary><p class="small">${esc(a)}${i === 0 && typeof SUBS_URL === "string" ? ` <a class="inlink" href="${SUBS_URL}" target="_blank" rel="noopener">Google Play</a>` : ""}</p></details>`).join("");
  return `<div class="card stack-s faq" id="v26Faq"><h3>${esc(f.t)}</h3>${items}</div>`;
}
const _viewMoreV26 = viewMore;
viewMore = function (...a) {
  const h = _viewMoreV26.apply(this, a); if (!S.pet || h.indexOf('id="v26Faq"') >= 0) return h;
  const tpl = document.createElement("template"); tpl.innerHTML = h; const t = L();
  const fb = [...tpl.content.querySelectorAll(".card h3")].find((x) => x.textContent.trim() === String(t.feedbackT || "").trim());
  const anchor = (fb && fb.closest(".card")) || tpl.content.querySelector(".card.help"); if (!anchor) return h;
  const box = document.createElement("template"); box.innerHTML = v26FaqCard(); const card = box.content.firstElementChild; if (!card) return h;
  if (anchor.hasAttribute("hidden")) card.setAttribute("hidden", ""); [...anchor.attributes].forEach((at) => { if (/^data-p/.test(at.name)) card.setAttribute(at.name, at.value); });
  anchor.parentNode.insertBefore(card, anchor); return tpl.innerHTML;
};
/* d) C-22: un solo nome per "scegli un viaggio" (prima 4 diversi, uno con la freccia scritta) */
Object.keys(T).forEach((l) => {
  const one = T[l].v13 && T[l].v13.allB; if (!one) return;
  try { if (typeof TR20T !== "undefined" && TR20T[l]) TR20T[l].ctaB = one; } catch (e) { /* niente */ }
  try { if (typeof NAV20_T !== "undefined" && NAV20_T[l] && NAV20_T[l].enGo) NAV20_T[l].enGo = one; } catch (e) { /* niente */ }
  try { if (typeof V19A !== "undefined" && V19A[l] && V19A[l].go) V19A[l].go = one; } catch (e) { /* niente */ }
});
/* e) G3-08: "Chi sei?" dice anche che animale e' il compagno (la descrizione della scelta del compagno) */
Object.keys(T).forEach((l) => {
  const c = T[l].chat; if (!c || typeof c.who !== "function" || c.who.v26) return; const w0 = c.who;
  c.who = (...a) => { const s = w0(...a); let d = ""; try { d = ((T[l].pets || {})[S.pet] || [])[1] || ""; } catch (e) { d = ""; } if (!d || s.includes(d)) return s;
    const m = /^(.*?[.!?！。]+)(\s*)([\s\S]*)$/u.exec(s); return m ? `${m[1]} ${d}${m[3] ? " " + m[3] : ""}`.replace(/\s+/g, " ").trim() : `${s} ${d}`; };
  c.who.v26 = 1;
});
/* f) C-20: titolo della pagina nella lingua dell'app, senza la frase in inglese */
function v26Title() { try { if (S && S.pet) document.title = "Tanetto"; } catch (e) { /* niente */ } }
/* g) C-11 / C-09: tipografia francese (spazio che non va a capo prima di : ; ! ?) e punto esclamativo giapponese largo */
const V26_FR = / ([:;!?»])/g, V26_JA = /([぀-ヿ一-鿿])!/g;
function v26TypoText(s) {
  if (!S) return s;
  if (S.lang === "fr" && V26_FR.test(s)) { V26_FR.lastIndex = 0; return s.replace(V26_FR, " $1").replace(/« /g, "« "); }
  if (S.lang === "ja" && V26_JA.test(s)) { V26_JA.lastIndex = 0; return s.replace(V26_JA, "$1！"); }
  V26_FR.lastIndex = 0; V26_JA.lastIndex = 0; return s;
}
function v26Typo(root) {
  if (!S || (S.lang !== "fr" && S.lang !== "ja") || !root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { if (n.parentElement && n.parentElement.closest("input, textarea, script, style")) continue; const v = v26TypoText(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; }
}
new MutationObserver((ms) => {
  if (!S || (S.lang !== "fr" && S.lang !== "ja")) return;
  ms.forEach((m) => { if (m.type === "characterData") { const v = v26TypoText(m.target.nodeValue); if (v !== m.target.nodeValue) m.target.nodeValue = v; } else m.addedNodes.forEach((a) => { if (a.nodeType === 3) { const v = v26TypoText(a.nodeValue); if (v !== a.nodeValue) a.nodeValue = v; } else v26Typo(a); }); });
}).observe(document.body, { childList: true, subtree: true, characterData: true });
const _renderV26b = render;
render = function (...a) { const r = _renderV26b.apply(this, a); v26Title(); return r; };

/* ---------- 14) Prodotto (M-40, E-08, E-11, E-14, G2-11, M-37) ---------- */
const V26_VERSION = "1.0.11";
/* a) M-40 / E-03 / E-11: "bentornato" a livelli. Dopo 7+ giorni: una riga su cio' che c'e' adesso (Natale, stagione che
   finisce), "Ripartiamo piano: oggi solo 1 obiettivo" e, se il promemoria era stato rifiutato, una sola nuova proposta. */
function v26Light() { const l = S.v26light; return l && l.day === dkey() && typeof l.goal === "string" ? l.goal : null; }
const _todayGoalsV26 = todayGoals;
todayGoals = function (...a) { const r = _todayGoalsV26.apply(this, a); const g = v26Light(); return g && r.includes(g) ? [g] : r; };
const _openWelcomeBackV26 = openWelcomeBack;
openWelcomeBack = function (...a) {
  const r = _openWelcomeBackV26.apply(this, a);
  try {
    const box = layer.querySelector(".wgbox"); if (!box || box.querySelector(".v26wb") || !(BACK_GAP >= 7)) return r;
    const w = L().v26.wb; const lines = [];
    if (typeof xmOn === "function" && xmOn()) lines.push(w.xmas);
    const se = typeof curSeason === "function" ? curSeason() : null; if (se) { const n = daysLeft(se); if (n > 0 && n <= 30) lines.push(w.season(seaName(se), n)); }
    const tg = _todayGoalsV26(); const easy = tg.find((g) => ["water", "breathe", "stretch", "sun", "fruit"].includes(g)) || tg[0];
    let html = lines.map((x) => `<p class="small v26wb">${esc(x)}</p>`).join("");
    if (tg.length > 1 && easy && !S.done.length) html += `<button class="btn ghost block v26wb" id="v26Light" data-goal="${esc(easy)}">${esc(w.light)}</button>`;
    if (S.rem === "no" && !S.remAsk2 && typeof openRemAsk === "function") html += `<button class="link v26wb" id="v26Rem">${esc(w.rem)}</button>`;
    const anchor = box.querySelector("#closeLayer") || box.lastElementChild; if (anchor) anchor.insertAdjacentHTML("beforebegin", html); else box.insertAdjacentHTML("beforeend", html);
  } catch (e) { /* niente */ }
  return r;
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("#v26Light, #v26Rem, #v26BrDid"); if (!b) return; ev.stopImmediatePropagation();
  if (b.id === "v26Light") { S.v26light = { day: dkey(), goal: b.dataset.goal }; const r = dayRec(); r.total = 1; save(); layer.innerHTML = ""; render(); toast(L().v26.wb.lightDone.split("{g}").join(goalText(b.dataset.goal))); trackOnce("ripartenza-leggera"); return; }
  if (b.id === "v26Rem") { S.remAsk2 = dkey(); S.rem = null; save(); layer.innerHTML = ""; openRemAsk(); return; }
  if (b.id === "v26BrDid") { layer.innerHTML = ""; if (todayGoals().includes("breathe") && !S.done.includes("breathe")) completeGoal("breathe"); else render(); }
}, true);
/* b) E-08: "Respira con me" ha anche "L'ho gia' fatto" (chi respira da solo puo' spuntare l'obiettivo) */
const _breatheV26 = breathe;
breathe = function (...a) {
  const r = _breatheV26.apply(this, a);
  try { if (todayGoals().includes("breathe") && !S.done.includes("breathe")) { const c = layer.querySelector("#closeLayer"); if (c && !layer.querySelector("#v26BrDid")) c.insertAdjacentHTML("beforebegin", `<button class="link" id="v26BrDid">${esc(L().v26.brDid)}</button>`); } } catch (e) { /* niente */ }
  return r;
};
/* c) E-14: dopo la prima settimana una riga con il prossimo traguardo (trofeo della serie), sopra gli obiettivi */
function v26NextLine() {
  try { if (typeof trNext !== "function") return ""; const st = streak(); if (st < 7) return ""; const n = trNext(st); if (!n || n.left <= 0) return "";
    return `<p class="small muted nextgoal">${esc(L().v26.nextTr(TROPHY_DAYS[n.i], n.left))}</p>`; } catch (e) { return ""; }
}
const _viewTodayV26 = viewToday;
viewToday = function (...a) {
  const h = _viewTodayV26.apply(this, a); const line = v26NextLine(); if (!line || h.indexOf('<ul class="goals">') < 0) return h;
  return h.replace('<ul class="goals">', line + '<ul class="goals">');
};
/* d) G2-11: versione dell'app in "Informazioni" (serve per i messaggi di aiuto) */
const _viewMoreV26b = viewMore;
viewMore = function (...a) {
  const h = _viewMoreV26b.apply(this, a); if (!S.pet || h.indexOf('id="v26Ver"') >= 0) return h;
  const tpl = document.createElement("template"); tpl.innerHTML = h;
  const about = [...tpl.content.querySelectorAll(".card")].find((c) => c.querySelector("[data-doc]")); if (!about) return h;
  about.insertAdjacentHTML("beforeend", `<p class="small muted" id="v26Ver" style="margin:8px 0 0;text-align:center">Tanetto ${esc(L().v26.ver)} ${V26_VERSION}</p>`);
  return tpl.innerHTML;
};
/* e) M-37 / A-04 / A-02: il benvenuto animato (e il logo sonoro) solo alla prima apertura del giorno; le altre volte
   l'app si apre subito dopo lo splash del telefono */
const _splashV26 = splash;
splash = function (...a) {
  try { if (S.pet && S.v26splash === dkey()) sessionStorage.setItem("tanetto-nosplash", "1"); else if (S.pet) { S.v26splash = dkey(); save(); } } catch (e) { /* niente */ }
  return _splashV26.apply(this, a);
};
