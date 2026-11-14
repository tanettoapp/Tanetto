/* ===== 1.0.8 — Sicurezza, parte 2: trucchi, acquisti, copie, orologio, robustezza =====
   Parte 1 (avvio: salvataggio sano, orologio che non torna indietro) in 45z_v20_secboot.js.
   Prove: t38_secure.py. Ogni sezione dice che cosa chiude.

   A) Agganci di prova (window.__v10.ev = eval, __v8, __tlevel, __FB_EMU, __TEST_*): solo nei test automatici
      (navigator.webdriver). Per chi usa davvero l'app non esistono piu', e nessuna pagina puo' ricrearli (nemmeno con
      elementi HTML che hanno quel nome). Nell'app Android prep_www.py toglieva gia' __v10.
   B) Plus: vale solo nell'app Android vera (indirizzo locale dell'app, non il sito con un finto "Capacitor"), e solo
      se Google Play l'ha confermato negli ultimi 30 giorni. Abbonamento annullato o rimborsato: al primo controllo
      riuscito Plus si spegne; se Google Play non risponde per piu' di 30 giorni, Plus si spegne finche' non risponde.
      Stesso limite per l'account dei revisori.
   C) Pacchetti di Tanì: si consegnano e si "consumano" su Google Play solo se il salvataggio funziona davvero
      (memoria piena = il pacchetto resta da consegnare e arriva alla prossima apertura, mai perso). Il salvataggio
      con la memoria piena prima libera spazio (galleria dei disegni, poi i ricordi piu' vecchi del registro).
   D) Copie, codici di trasferimento e backup online: struttura e tipi controllati, chiavi pericolose tolte,
      "<", ">" e '"' neutralizzati nei campi che non sono testo scritto da te, testi lunghi accorciati, viaggio con
      una meta che non esiste annullato. Prima un file con "remTime" o "seeds" scritti come codice HTML eseguiva quel
      codice, e alcuni file bloccavano l'app all'avvio. In piu' le copie fatte da ora in poi sono FIRMATE: una copia
      modificata a mano (o senza firma, cioe' fatta prima del 1.0.8) tiene tutto, ma Tanì + oggetti comprati + livello
      restano entro il massimo guadagnabile dal giorno di uscita (prima bastavano 200 "pacchetti" inventati nel file per
      avere milioni di Tanì). Poi i controlli dell'economia (98e).
   E) Orologio, app Android: ora della rete (Android 13+) o tempo dall'accensione (TanettoClock, ClockPlugin.java).
      Data spostata avanti: l'app resta all'ora vera (viaggi, feste e premi non arrivano prima). Indietro: vedi 45z.
      TanettoClock assente, in errore o muto (1,5 s): l'app usa l'ora del telefono, l'avvio non aspetta mai.
   F) "Annulla" di un obiettivo dopo aver gia' speso i Tanì: prima si annullava a 0 e lo si rispuntava per un
      secondo premio. Ora, se i Tanì non bastano per restituirli tutti, l'obiettivo risulta gia' premiato oggi.
   G) "Fallo tornare subito" (viaggio): bloccato sempre, qualunque testo abbia il pulsante.
   H) Conteggio anonimo degli errori: dal messaggio si tolgono le parti tra virgolette (potevano contenere testo tuo).
   I) Due schede aperte (sito): quando l'altra scheda salva, questa prende i dati nuovi invece di sovrascriverli.
   K) L'avviso in basso (toast) non blocca piu' i tocchi sui pulsanti che copre.
   (Doppi tocchi veloci su tutti i pulsanti che danno o spendono Tanì: provati uno per uno in t38_secure.py; ogni
   gestore controlla e segna il premio nello stesso istante, quindi il secondo tocco non da' niente.) */

/* ---------------- A) agganci di prova ---------------- */
const secWebdriver = (() => { try { return !!navigator.webdriver; } catch (e) { return false; } })();
(() => {
  if (secWebdriver) return;
  ["__v10", "__v8", "__tlevel"].forEach((k) => { try { delete window[k]; } catch (e) { /* niente */ } try { if (window[k]) window[k] = undefined; } catch (e) { /* niente */ } });
  ["__v10", "__FB_EMU", "__TEST_NOLAUNCH", "__TEST_NOGIFT20", "__TEST_NOHINT20", "__secClockTest"].forEach((k) => {
    try { Object.defineProperty(window, k, { value: undefined, writable: false, configurable: false }); } catch (e) { /* niente */ }
  });
})();

/* ---------------- B) Plus ---------------- */
/* (revisione 1.0.8) 30 giorni, non 7: chi paga e resta senza internet (o con Google Play che non risponde) per
   piu' di una settimana non deve perdere Plus. Plus si spegne subito solo se Google Play risponde "nessun
   abbonamento" (97o); senza risposta per oltre 30 giorni si spegne finche' Google Play non risponde, e torna da solo
   (compagni, oggetti e scene di Plus non si perdono mai: restano tuoi, tornano usabili). Come il periodo di tolleranza
   piu' lungo di Google Play. */
const SEC_PLUS_STALE = 30 * 86400e3;
const secHostOk = () => { try { const h = location.hostname; return h === "localhost" || h === "127.0.0.1" || location.protocol === "capacitor:" || (secWebdriver && location.protocol === "file:"); /* file: solo per i test automatici */ } catch (e) { return false; } };
const secNative = () => { try { return isNativeApp() && secHostOk(); } catch (e) { return false; } };
const secFresh = (t) => typeof t === "number" && isFinite(t) && t <= Date.now() + SEC_TOL && Date.now() - t < SEC_PLUS_STALE;
/* data dell'ultima conferma "nel futuro" (l'ora del telefono era avanti ed e' stata corretta): vale come conferma di
   adesso, una volta sola (prima Plus spariva finche' l'ora non la raggiungeva) */
function secPlusClock() {
  try {
    const n = Date.now();
    if (typeof S.plusCheck === "number" && isFinite(S.plusCheck) && S.plusCheck > n + SEC_TOL) { S.plusCheck = n; save(); }
    if (A && typeof A.revAt === "number" && isFinite(A.revAt) && A.revAt > n + SEC_TOL) { A.revAt = n; saveA(); }
  } catch (e) { /* niente */ }
}
plusOk = function () {
  if (!secNative()) return false;
  secPlusClock();
  const sub = !!S.plusOn && secFresh(S.plusCheck);
  const rev = !!(A && A.uid && A.rev && secFresh(A.revAt));
  return sub || rev;
};
if (typeof reviewCheck === "function") {
  const _reviewCheckSec = reviewCheck;
  reviewCheck = async function (...a) {
    let ok = false; try { if (A.uid) { await fbLoad(); ok = true; } } catch (e) { ok = false; }
    const was = plusOk();
    const r = await _reviewCheckSec.apply(this, a);
    /* la data si rinnova solo se Firebase ha risposto davvero (senza internet il vecchio "si'" non vale per sempre) */
    if (ok && A.uid && A.rev) { A.revAt = Date.now(); saveA(); }
    /* revisori di Google Play: appena entrati Plus deve vedersi subito (97t ridisegna prima che qui ci sia la data) */
    try { if (plusOk() !== was && S.pet && !layer.innerHTML) { const y = window.scrollY; render(); window.scrollTo(0, y); } } catch (e) { /* niente */ }
    return r;
  };
}
/* sul sito "Capacitor" non esiste: lo si blocca, cosi' non lo si puo' inventare dalla console per fingersi l'app */
(() => {
  if (secHostOk() || window.Capacitor) return;
  try { Object.defineProperty(window, "Capacitor", { value: undefined, writable: false, configurable: false }); } catch (e) { /* niente */ }
})();

/* ---------------- C) salvataggio robusto e pacchetti di Tanì ---------------- */
let secSaveOk = true;
function secFreeSpace(step) {
  try {
    if (step === 0) { let x = false; for (let i = SNAP_N; i >= 2; i--) if (localStorage.getItem(SNAP_KEY(i))) { localStorage.removeItem(SNAP_KEY(i)); x = true; } if (x) return true; }
    if (step === 1) { const g = JSON.parse(localStorage.getItem("tanetto-gallery") || "[]"); if (Array.isArray(g) && g.length) { g.splice(Math.ceil(g.length / 2)); if (g.length) localStorage.setItem("tanetto-gallery", JSON.stringify(g)); else localStorage.removeItem("tanetto-gallery"); return true; } }
    if (step === 2) { localStorage.removeItem("tanetto-gallery"); localStorage.removeItem(SEC_BROKEN_KEY); localStorage.removeItem(SNAP_KEY(1)); return true; }
    if (step === 3 && Array.isArray(S.log) && S.log.length > 1500) { S.log.splice(0, S.log.length - 1500); return true; }
    if (step === 4 && S.tracked && Object.keys(S.tracked).length > 50) { const t = dkey(); Object.keys(S.tracked).forEach((k) => { if (S.tracked[k] !== t) delete S.tracked[k]; }); return true; }
  } catch (e) { /* niente */ }
  return false;
}
/* stesso lavoro di prima (un solo JSON.stringify), ma sa se il salvataggio e' riuscito e, se la memoria e' piena,
   libera spazio e riprova (prima l'errore veniva ignorato e i progressi si perdevano alla chiusura) */
save = function () {
  let j = ""; const put = () => { try { j = JSON.stringify(S); localStorage.setItem(KEY, j); return true; } catch (e) { return false; } };
  if (put()) { secSaveOk = true; snapTick(j); return; }
  for (let s = 0; s < 5; s++) { if (secFreeSpace(s) && put()) { secSaveOk = true; return; } }
  secSaveOk = false;
};
/* 1.0.9: messaggio onesto dopo un salvataggio rovinato (45_state.js). Resta finche' non si tocca "Ho capito";
   i dati rovinati si possono salvare in un file (testo cosi' com'era, per un recupero a mano). */
function recoverSheet() {
  const r = S.recover; if (!r || r.seen) return; const t = L().v21; const has = brokenKeys().length > 0;
  const day = r.day && secDateRe.test(r.day) ? fmtDate(r.day) : "";
  const p1 = r.ok ? t.recOk(S.petName || "", day) : t.recNone;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="rcT"><div class="box card stack-s recbox"><h2 id="rcT">${esc(t.recT)}</h2><p>${esc(p1)}</p><p class="small muted">${esc(t.recKeep)}</p>
    ${has ? `<button class="btn ghost block" id="recSave" type="button">${esc(t.recSave)}</button>` : ""}${!r.ok ? `<button class="btn ghost block" id="iosHave" type="button">${esc(L().v13.ios.have)}</button>` : ""}<button class="btn block" id="recOk" type="button">${esc(t.recOkB)}</button></div></div>`;
  trackOnce(r.ok ? "salvataggio-recuperato" : "salvataggio-rovinato");
}
async function recoverExport() {
  const ks = brokenKeys(); const raw = ks.length ? lsGet(ks[ks.length - 1]) : null; if (!raw) return;
  const name = `tanetto-dati-rovinati-${dkey().split("-").reverse().join("-")}.txt`; const blob = new Blob([raw], { type: "text/plain" }); const t = L();
  try {
    const p = typeof sharePlugin === "function" ? sharePlugin() : null;
    if (isNativeApp() && p) { const data = await blobB64(blob); try { await p.saveFile({ data, name, mime: "text/plain" }); } catch (e) { if (e && e.code === "unsupported") await p.share({ data, name, mime: "text/plain", text: "", title: "Tanetto" }); else throw e; } }
    else { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
    toast(t.data.saved);
  } catch (e) { toast(t.saveNo); }
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "recSave") { ev.stopImmediatePropagation(); recoverExport(); return; }
  if (b.id === "recOk") { ev.stopImmediatePropagation(); if (S.recover) S.recover.seen = true; save(); closeLayer(); return; }
  if (b.id === "iosHave" && b.closest(".recbox") && S.recover) { S.recover.seen = true; save(); } /* si apre il ripristino (gestore di 97h) */
}, true);
/* con un compagno si usa la fila delle finestre; senza (si riparte dalla prima schermata) la fila e' ferma: si mostra subito */
setTimeout(() => { if (!S.recover || S.recover.seen) return; if (S.pet && typeof nq20 === "function") nq20("recover", "resp", recoverSheet); else if (!layer.innerHTML.trim()) recoverSheet(); }, 700);
if (typeof creditPack === "function") {
  const _creditPackSec = creditPack;
  creditPack = async function (x, celebrate) {
    const tok = x && x.token;
    if (!tok || typeof tok !== "string") return false;
    if (!(S.paidTokens || []).includes(tok)) { save(); if (!secSaveOk) return false; } /* memoria non scrivibile: non si consegna e non si consuma */
    return _creditPackSec(x, celebrate);
  };
}

/* ---------------- D) copie, trasferimenti, backup online ---------------- */
const SEC_TEXT_MAX = { petName: 40, uname: 40 };
const secNeutral = (s) => s.replace(/</g, "\uFF1C").replace(/>/g, "\uFF1E").replace(/"/g, "\u201D").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
/* testo scritto da te: si lascia com'e' (l'app lo mostra sempre "pulito"), solo accorciato */
function secImportStrings(v, path, depth) {
  if (typeof v === "string") {
    /* obiettivi personali ("c:" + testo tuo) solo dove stanno davvero: altrove un "c:" non rende "libero" un campo */
    const free = path === "petName" || path === "uname" || /^(diary\.\d+\.(text|q)|capsules\.\d+\.text|garden\.\d+\.t)$/.test(path) || (v.startsWith("c:") && /^(goals\.\d+\.id|done\.\d+|log\.\d+\.g)$/.test(path));
    if (free) { const max = SEC_TEXT_MAX[path] || (v.startsWith("c:") ? 60 : 1000); return v.length > max ? v.slice(0, max) : v; }
    return secNeutral(v.length > 2000 ? v.slice(0, 2000) : v);
  }
  if (!v || typeof v !== "object" || depth > 14) return v;
  if (Array.isArray(v)) return v.map((x, i) => secImportStrings(x, path + "." + i, depth + 1));
  const o = {};
  Object.keys(v).forEach((k) => { const k2 = k.startsWith("c:") || secDateRe.test(k) ? k : secNeutral(k); o[k2] = secImportStrings(v[k], path ? path + "." + k : k, depth + 1); });
  return o;
}
const secIdOk = (x) => typeof x === "string" && /^[A-Za-z0-9_:.-]{1,80}$/.test(x);
function secDestOk(key) { try { if (typeof key !== "string") return false; const d = destByKey(key); return !!(d && Array.isArray(d.cards) && typeof d.h === "number" && isFinite(d.h)); } catch (e) { return false; } }
/* stato di partenza ragionevole (dopo i tipi): cose che altrimenti bloccano l'app */
function secFixMeaning(o) {
  let fixed = false;
  if (o.away && !secDestOk(o.away.dest)) { o.away = null; fixed = true; }
  if (typeof o.theme === "string" && !["system", "light", "dark"].includes(o.theme)) { o.theme = "system"; fixed = true; }
  if (o.remTime != null && !(typeof o.remTime === "string" && /^\d\d:\d\d(:\d\d)?$/.test(o.remTime))) { delete o.remTime; fixed = true; }
  return fixed;
}
/* --- firma anti-modifica delle copie ---
   Copie su file, codici di trasferimento e backup online fatti da 1.0.8 in poi portano una firma (S.__sig) calcolata
   sul loro contenuto. Senza server non e' una protezione assoluta (chi studia il codice dell'app puo' rifarla), ma
   chi apre il file e cambia "seeds" o aggiunge oggetti con un editor di testo viene scoperto: la copia vale lo stesso
   (il compagno, i ricordi, gli obiettivi tornano tutti) ma Tanì, oggetti comprati e livello vengono riportati a cio'
   che si puo' guadagnare davvero dal giorno di uscita di Tanetto (SEC_EPOCH) con il gioco piu' generoso possibile.
   Le copie vecchie (senza firma) passano dallo stesso controllo, che con i numeri veri dei tester non tocca niente. */
const SEC_SIG_K = "tanetto-1.0.8|7c1f4e3b-2d9a-4c6e-8f10-b9c0e415d7a2";
const SEC_EPOCH = "2026-10-01";
const SEC_PACK_NEW = 4000;
function secHash(str, seed) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
function secSig(st) { const j = JSON.stringify(st); return "s1." + secHash(SEC_SIG_K + j, 7) + "." + secHash(j + SEC_SIG_K, 1913); }
function secVerify(st) {
  if (!st || typeof st !== "object" || typeof st.__sig !== "string") return false;
  try { const { __sig, ...rest } = st; return __sig === secSig(rest); } catch (e) { return false; }
}
/* firma messa solo mentre si prepara la copia (in modo sincrono), poi tolta: il salvataggio normale non la contiene */
function secSigned(fn) { return function (...a) { try { delete S.__sig; S.__sig = secSig(S); } catch (e) { /* niente */ } try { return fn.apply(this, a); } finally { try { delete S.__sig; } catch (e) { /* niente */ } } }; }
if (typeof packState === "function") packState = secSigned(packState);
if (typeof saveBackup === "function") saveBackup = secSigned(saveBackup);
let secLastTrust = null;
/* segni interni messi solo dall'app (proprieta' non enumerabili): un file con "__secTrust": true scritto a mano non vale */
const secTag = (o, k) => { try { const d = Object.getOwnPropertyDescriptor(o, k); return d && !d.enumerable ? d.value : undefined; } catch (e) { return undefined; } };
/* copia senza firma valida: Tanì + valore degli oggetti comprati + livello entro il massimo guadagnabile */
function secStrict(o) {
  const today = dkey();
  const fd = typeof o.firstDay === "string" && secDateRe.test(o.firstDay) && o.firstDay > SEC_EPOCH ? o.firstDay : SEC_EPOCH;
  const span = Math.max(1, Math.round((ldate(today).getTime() - ldate(fd).getTime()) / 86400000) + 1);
  const inR = (d) => typeof d === "string" && secDateRe.test(d) && d >= fd && d <= today;
  const logDays = new Set((Array.isArray(o.log) ? o.log : []).map((x) => x && x.d).filter(inR)).size;
  const recDays = Object.keys(secIsObj(o.days) ? o.days : {}).filter(inR).length;
  const active = Math.max(1, Math.min(Math.max(logDays, recDays), span));
  /* (revisione 1.0.8) pacchetti di Tanì comprati: quelli gia' consegnati su QUESTO telefono contano tutti; quelli che
     arrivano solo dalla copia (telefono nuovo) fino a 10, ognuno come il pacchetto piu' grande (3.000) con margine.
     Prima non contavano: chi aveva comprato Tanì e ripristinava una copia del 1.0.7 (o un backup online di prima)
     poteva perderli. (Le copie fatte dal 1.0.8 in poi sono firmate e non passano di qui.) */
  const here = new Set(Array.isArray(S.paidTokens) ? S.paidTokens : []);
  const toks = [...new Set((Array.isArray(o.paidTokens) ? o.paidTokens : []).filter((x) => typeof x === "string" && x))];
  const cap = EC.IMPORT_BASE + active * EC.IMPORT_PER_DAY + toks.filter((x) => here.has(x)).length * EC.IMPORT_PER_PACK + Math.min(10, toks.filter((x) => !here.has(x)).length) * SEC_PACK_NEW;
  const price = (id) => { const x = SHOP.find((s) => s.id === id); return x && x.price > 0 && !x.reward && !x.special && !x.event && !x.found && !x.coll && !x.souvenir ? x.price : 0; };
  let owned = Array.isArray(o.owned) ? o.owned.slice() : []; let val = owned.reduce((a, id) => a + price(id), 0);
  /* (revisione 1.0.8) oggetti tolti solo se valgono piu' del DOPPIO del massimo (prezzi nuovi, a volte piu' alti di
     quelli pagati davvero): perdere oggetti comprati sarebbe peggio di qualche oggetto in piu' */
  if (val > cap * 2) {
    const drop = owned.filter((id) => price(id) > 0).sort((a, b) => price(b) - price(a));
    for (const id of drop) { if (val <= cap * 2) break; owned = owned.filter((x) => x !== id); val -= price(id); }
    o.owned = owned;
    if (Array.isArray(o.furn)) o.furn = o.furn.filter((x) => owned.includes(x) || !price(x));
    if (o.hat && price(o.hat) && !owned.includes(o.hat)) o.hat = null;
    if (o.wall && price(o.wall) && !owned.includes(o.wall)) o.wall = "w_cream";
  }
  const seeds = typeof o.seeds === "number" && isFinite(o.seeds) ? o.seeds : 0;
  o.seeds = Math.max(0, Math.min(seeds, cap - val));
  if (typeof o.level === "number") o.level = Math.max(1, Math.min(o.level, 5 + active));
  return o;
}
/* pulizia completa di uno stato che arriva da fuori (file, codice, backup online) */
function secSanitizeImport(st, trustHint) {
  if (!st || typeof st !== "object" || Array.isArray(st)) return st;
  const tag = secTag(st, "__secTrust");
  const trusted = typeof tag === "boolean" ? tag : typeof trustHint === "boolean" ? trustHint : secVerify(st);
  let o = secClean(st); if (!secIsObj(o)) return st;
  ["__sig", "__secTrust", "__sec"].forEach((k) => { delete o[k]; });
  o = secImportStrings(o, "", 0);
  secFixTypes(o);
  /* codici di oggetti, mete, cartoline: solo lettere, numeri e _ : . - (nessun oggetto vero ha altro) */
  ["owned", "furn", "cards"].forEach((k) => { if (Array.isArray(o[k])) o[k] = [...new Set(o[k].filter(secIdOk))]; });
  if (o.hat != null && !secIdOk(o.hat)) o.hat = null;
  if (o.pet != null && !secIdOk(o.pet)) o.pet = "germo";
  if (typeof o.wall === "string" && !secIdOk(o.wall)) o.wall = "w_cream";
  if (typeof o.lang === "string" && !T[o.lang]) o.lang = "en";
  if (Array.isArray(o.goals)) { const seen = new Set(); o.goals = o.goals.filter((g) => !seen.has(g.id) && seen.add(g.id)); }
  secFixMeaning(o);
  ["plusOn", "plusCheck", "plusSince", "dev"].forEach((k) => { delete o[k]; });
  if (!trusted) { try { secStrict(o); } catch (e) { /* niente */ } }
  try { Object.defineProperty(o, "__secTrust", { value: trusted, enumerable: false, configurable: true }); } catch (e) { /* niente */ }
  secLastTrust = trusted;
  return o;
}
if (typeof unpackState === "function") { const _unpackStateSec = unpackState; unpackState = async function (code) { const st = await _unpackStateSec(code); return st ? secSanitizeImport(st) : st; }; }
if (typeof restoreFrom === "function") { const _restoreFromSec = restoreFrom; restoreFrom = function (state) { return _restoreFromSec(secSanitizeImport(state)); }; }
if (typeof applyCloud === "function") { const _applyCloudSec = applyCloud; applyCloud = function (st, at) { return _applyCloudSec(secSanitizeImport(st), at); }; }
/* copia su file: la firma si controlla sul file cosi' com'e' (prima che 98e la riordini), poi "Si, ripristina" la pulisce */
if (typeof readBackup === "function") {
  const _readBackupSec = readBackup;
  readBackup = function (file) {
    secLastTrust = null;
    try { file.text().then((t) => { try { const o = JSON.parse(t); secLastTrust = !!(o && o.state && secVerify(o.state)); } catch (e) { secLastTrust = false; } }).catch(() => { secLastTrust = false; }); } catch (e) { secLastTrust = false; }
    return _readBackupSec.apply(this, arguments);
  };
}
window.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "rsYes" || !pendingRestore || secTag(pendingRestore, "__sec") === true) return;
  pendingRestore = secSanitizeImport(pendingRestore, secLastTrust === true); try { Object.defineProperty(pendingRestore, "__sec", { value: true, enumerable: false }); } catch (e) { /* niente */ }
}, true);
/* (revisione 1.0.8) Plus e' di questo telefono (lo conferma Google Play qui), non della copia: ripristinando una copia
   o un backup online chi ha Plus lo tiene (prima restava spento fino alla verifica successiva con Google Play) */
let secPlusKeep = null;
const secPlusTake = () => { try { return S && S.plusOn ? { plusOn: true, plusCheck: S.plusCheck, plusSince: S.plusSince } : null; } catch (e) { return null; } };
function secPlusPut(k, s0) { try { if (!k || S === s0 || S.plusOn) return; Object.assign(S, k); save(); const y = window.scrollY; render(); window.scrollTo(0, y); } catch (e) { /* niente */ } }
if (typeof restoreFrom === "function") { const _restoreFromP = restoreFrom; restoreFrom = function (state) { const k = secPlusTake(), s0 = S; const r = _restoreFromP(state); secPlusPut(k, s0); return r; }; }
if (typeof applyCloud === "function") { const _applyCloudP = applyCloud; applyCloud = function (st, at) { const k = secPlusTake(), s0 = S; const r = _applyCloudP(st, at); secPlusPut(k, s0); return r; }; }
/* "Si', ripristina": il ripristino lo fa il gestore su document; questo (su window, dopo) rimette Plus */
window.addEventListener("click", (ev) => { const b = ev.target && ev.target.closest && ev.target.closest("button"); if (b && b.id === "rsYes") { secPlusKeep = { k: secPlusTake(), s0: S }; setTimeout(() => { const x = secPlusKeep; secPlusKeep = null; if (x) secPlusPut(x.k, x.s0); }, 0); } }, true);
/* anche il salvataggio di questo telefono: una meta di viaggio che non esiste piu', un tema sconosciuto... */
try { if (S && secFixMeaning(S)) save(); } catch (e) { /* niente */ }

/* ---------------- E) orologio (app Android) ---------------- */
const secClockPlugin = () => { try { const C = window.Capacitor; return (C && C.Plugins && C.Plugins.TanettoClock) || null; } catch (e) { return null; } };
const secUsePlugin = () => secNative() && !!secClockPlugin();
let secClkBusy = false, secClkAt = 0, secClkDone = false, secTripWait = false;
const secT0 = secPerf();
function secClockRedraw(changed) { if (changed && S.pet && !layer.innerHTML) { const y = window.scrollY; render(); window.scrollTo(0, y); } }
async function secClockCheck() {
  if (!secClockOn() || secClkBusy) return; const p = secUsePlugin() ? secClockPlugin() : null; if (!p || !p.now) return;
  secClkBusy = true;
  try {
    const r = await Promise.race([Promise.resolve().then(() => p.now()), new Promise((res) => setTimeout(() => res(null), 1500))]);
    if (!r || typeof r.wall !== "number" || !isFinite(r.wall) || typeof r.el !== "number" || !isFinite(r.el)) return;
    const o = secClkLoad(); const a = secIsObj(o.anc) ? o.anc : null; let trusted = null;
    const net = typeof r.net === "number" && isFinite(r.net) && r.net > 1.7e12;
    if (net) { trusted = r.net; delete o.bh; }
    else if (a && a.b === r.boot && r.boot !== -1 && r.el >= a.e && typeof a.w === "number" && isFinite(a.w)) {
      trusted = a.w + (r.el - a.e);
      /* telefono indietro rispetto all'ancora: stesso recupero del pavimento (45z), cosi' un'ora sbagliata in avanti
         quando l'ancora e' nata non resta finche' non si riavvia il telefono */
      if (trusted - r.wall > SEC_TOL) { const t2 = { max: trusted, bh: o.bh }; if (!secFloorFor(t2, r.wall)) { trusted = null; o.max = r.wall; delete o.bh; } else o.bh = t2.bh; }
      else if (o.bh !== undefined) delete o.bh;
    }
    const max = typeof o.max === "number" && isFinite(o.max) ? o.max : 0;
    let changed;
    if (trusted != null) {
      /* ora vera nota: l'app usa quella (data del telefono avanti o indietro non contano) */
      changed = secClockSet(trusted - r.wall, 0, 0);
      o.max = net ? trusted : Math.max(max, trusted);
    } else {
      /* dopo un riavvio, senza ora della rete: si accetta il telefono, ma mai prima del momento piu' avanti gia' visto
         (con il recupero di 45z per chi aveva la data avanti per errore) */
      const fl = secFloorFor(o, r.wall);
      changed = secClockSet(0, fl, 0);
      o.max = Math.max(secNum(o.max) ? o.max : 0, secAppNow());
    }
    const now = secAppNow();
    o.anc = { w: now - (SEC_R.now() - r.wall), e: r.el, b: r.boot }; o.at = now; secClkSave(o); secClkAt = Date.now();
    if (secTripWait) { secTripWait = false; changed = true; }
    secClockRedraw(changed);
  } catch (e) { /* senza risposta resta l'ora di prima */ } finally {
    secClkBusy = false; secClkDone = true;
    if (secTripWait) { secTripWait = false; try { secClockRedraw(true); } catch (e) { /* niente */ } }
  }
}
/* Viaggio che finirebbe proprio all'apertura (app Android): aspetta la prima risposta di TanettoClock (di solito pochi
   millisecondi, al massimo 1,5 secondi), cosi' una data spostata avanti non lo fa finire prima. Senza risposta
   (modulo assente, errore, nessuna risposta) il viaggio finisce normalmente. */
if (typeof finishTrip === "function") {
  const _finishTripSec = finishTrip;
  finishTrip = function (...a) {
    try { if (!secClkDone && secPerf() - secT0 < 1500 && secClockOn() && secUsePlugin()) { secTripWait = true; return; } } catch (e) { /* niente */ }
    return _finishTripSec.apply(this, a);
  };
}
setTimeout(() => { if (secTripWait) { secTripWait = false; try { secClockRedraw(true); } catch (e) { /* niente */ } } }, 1600);
setTimeout(secClockCheck, 0);
/* sul sito (e senza il modulo dell'orologio) il momento piu' avanti si ricorda ogni 30 secondi e quando si esce;
   nell'app Android lo aggiorna solo secClockCheck, dopo aver confrontato l'ora con quella vera */
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") secClockCheck(); else if (!secUsePlugin()) secClkTouch(); });
window.addEventListener("pagehide", () => { if (!secUsePlugin()) secClkTouch(); });
setInterval(() => { if (document.visibilityState !== "visible") return; if (secUsePlugin()) secClockCheck(); else secClkTouch(); }, 30000);
setTimeout(() => { if (!secUsePlugin()) secClkTouch(); }, 5000);

/* ---------------- F) "Annulla" dopo aver speso ---------------- */
if (typeof nav20undo === "function") {
  const _nav20undoSec = nav20undo;
  nav20undo = function (g) {
    let short = false;
    /* nav20undoTake si ferma ai Tanì che hai: qui serve il totale vero da restituire */
    try { const r = nav20undoInfo(g); const s0 = S.seeds; let full = 0; try { S.seeds = 1e12; full = nav20undoTake(r); } finally { S.seeds = s0; } short = full > 0 && s0 < full && S.done.includes(g) && S.day === dkey(); } catch (e) { short = false; }
    const res = _nav20undoSec.apply(this, arguments);
    if (short && !S.done.includes(g)) { try { const e = econ(); const d = S.day; e.rw[d] = e.rw[d] || []; if (!e.rw[d].includes(g)) e.rw[d].push(g); save(); } catch (e) { /* niente */ } }
    return res;
  };
}

/* ---------------- G) "Fallo tornare subito" ---------------- */
window.addEventListener("click", (ev) => { const b = ev.target && ev.target.closest && ev.target.closest("#comeBack"); if (b) { ev.stopImmediatePropagation(); ev.preventDefault(); b.remove(); } }, true);

/* ---------------- H) errori anonimi senza testo personale ---------------- */
if (typeof reportErr === "function") {
  const _reportErrSec = reportErr;
  reportErr = function (msg, line) { const m = String(msg || "").replace(/"[^"]*"|'[^']*'|“[^”]*”|«[^»]*»/g, "").replace(/\d{3,}/g, "N"); return _reportErrSec(m, line); };
}

/* ---------------- I) due schede aperte ---------------- */
/* mentre si ridisegna con i dati dell'altra scheda non si salva (altrimenti le due schede si rimbalzerebbero i
   salvataggi all'infinito); si adotta al massimo 5 volte al secondo */
let secAdopt = false, secAdoptAt = 0, secAdoptT = null;
{ const _saveTabs = save; save = function () { if (secAdopt) return; return _saveTabs.apply(this, arguments); }; }
function secAdoptNow() {
  secAdoptT = null; secAdoptAt = Date.now();
  let raw = null; try { raw = localStorage.getItem(KEY); } catch (e) { return; }
  if (!raw) return;
  try {
    const o = JSON.parse(raw); if (!secIsObj(o)) return;
    const c = secClean(o); secFixTypes(c); secFixMeaning(c);
    secAdopt = true;
    try { S = Object.assign(fresh(), c); if (layer.innerHTML) closeLayer(); const y = window.scrollY; render(); window.scrollTo(0, y); } finally { secAdopt = false; }
  } catch (e) { secAdopt = false; }
}
window.addEventListener("storage", (ev) => {
  if (ev.key !== KEY || ev.newValue == null || ev.storageArea !== localStorage) return;
  if (secAdoptT) return;
  const wait = Math.max(0, 200 - (Date.now() - secAdoptAt)); secAdoptT = setTimeout(secAdoptNow, wait);
});

/* ---------------- K) l'avviso in basso non blocca i tocchi ----------------
   Trovato provando i doppi tocchi: per 2,4 secondi l'avviso ("+40 Tanì", ...) stava sopra i pulsanti in basso
   (per esempio "Ritira il premio" di una pagina dell'album subito dopo un altro premio) e il tocco non arrivava.
   L'avviso e' solo testo: i tocchi ora passano attraverso. */
(() => { try { const t = document.getElementById("toast"); if (t) t.style.pointerEvents = "none"; } catch (e) { /* niente */ } })();
