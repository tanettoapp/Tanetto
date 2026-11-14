/* ===== 1.0.8 — Sicurezza, parte 1 (avvio): salvataggio sano e orologio che non torna indietro =====
   Questo file parte subito dopo 45_state.js, PRIMA di tutti gli altri moduli: cosi' nessuno legge un salvataggio
   rotto o manomesso, e tutta l'app vede gia' l'ora giusta. Il resto della sicurezza e' in 98x_v20_secure.js.

   1) Salvataggio illeggibile: prima, se il testo salvato non era JSON valido, l'app ripartiva da zero e al primo
      salvataggio lo cancellava per sempre. Ora il testo originale viene messo da parte (chiave KEY + "-rotto").
   2) Salvataggio con tipi sbagliati (numeri come testo, null al posto di liste, "__proto__", ...): i campi
      principali vengono riportati a valori validi. Con un salvataggio normale non cambia niente (si tocca solo cio'
      che ha il tipo sbagliato). Prima alcuni casi bloccavano l'app all'avvio, ogni volta.
   3) Orologio: l'ora dell'app non torna mai indietro (oltre 10 minuti di tolleranza). Se la data del telefono viene
      spostata indietro, l'app resta al momento piu' avanti gia' visto: niente giorni "rigiocati", niente limiti
      giornalieri azzerati facendo avanti e indietro, niente viaggi o feste rifatti. Il fuso orario non c'entra
      (l'ora "assoluta" non cambia viaggiando). Il momento piu' avanti visto sta in una chiave a parte
      (SEC_CLK_KEY), non nelle copie: una copia presa da un altro telefono non sposta l'ora di questo.
      Nell'app Android, 98x_v20_secure.js controlla anche l'ora della rete e il tempo dall'accensione (date
      spostate AVANTI). Nei test automatici (navigator.webdriver) l'orologio non si tocca, a meno che il test lo
      chieda con window.__secClockTest: i test vecchi spostano l'ora apposta. */
const SEC_CLK_KEY = "tanetto-clock";
const SEC_BROKEN_KEY = KEY + "-rotto";
const SEC_TOL = 10 * 60e3;
const SEC_R = Date; /* il Date "vero" del browser (nei test: quello dei test) */
let secOff = 0;
const secIsObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
const secDateRe = /^\d{4}-\d\d-\d\d$/;

/* --- 1) testo salvato illeggibile: dalla 1.0.9 lo mette da parte 45_state.js (KEY-broken-..., con ripristino dalle copie) --- */

/* --- 2) copia profonda senza chiavi pericolose (__proto__, constructor, prototype), con limiti di dimensione --- */
const SEC_BAD_KEYS = new Set(["__proto__", "constructor", "prototype"]);
function secClean(v, depth = 0) {
  if (v === null || typeof v === "boolean") return v;
  if (typeof v === "number") return isFinite(v) ? v : 0;
  if (typeof v === "string") return v.length > 20000 ? v.slice(0, 20000) : v;
  if (depth > 14 || typeof v !== "object") return null;
  if (Array.isArray(v)) return v.slice(0, 6000).map((x) => secClean(x, depth + 1));
  const o = {};
  Object.keys(v).slice(0, 6000).forEach((k) => { if (!SEC_BAD_KEYS.has(k)) o[k] = secClean(v[k], depth + 1); });
  return o;
}

/* --- tipi dei campi principali: si corregge solo cio' che e' sbagliato --- */
function secFixTypes(o) {
  if (!secIsObj(o)) return { fixed: true };
  let fixed = false;
  const F = (k, v) => { o[k] = v; fixed = true; };
  const num = (k, def, lo, hi, int) => {
    let v = o[k]; if (v === undefined) return;
    if (typeof v !== "number" || !isFinite(v)) { const n = Number(v); v = typeof v === "string" && v.trim() !== "" && isFinite(n) ? n : def; }
    if (lo != null && v < lo) v = lo; if (hi != null && v > hi) v = hi; if (int) v = Math.round(v);
    if (v !== o[k]) F(k, v);
  };
  const str = (k, def, re) => { const v = o[k]; if (v === undefined) return; if (typeof v !== "string" || (re && !re.test(v))) F(k, def); };
  const strN = (k, re) => { const v = o[k]; if (v === undefined || v === null) return; if (typeof v !== "string" || (re && !re.test(v))) F(k, null); };
  const arr = (k, keep) => { const v = o[k]; if (v === undefined) return; if (!Array.isArray(v)) { F(k, []); return; } const a = v.filter(keep); if (a.length !== v.length) F(k, a); };
  const obj = (k, def) => { const v = o[k]; if (v === undefined) return; if (!secIsObj(v)) F(k, def()); };
  const isStr = (x) => typeof x === "string";
  /* 1.0.10 (H-17): un saldo scritto come testo ("1e99") non si trasforma in un numero enorme: torna al valore di partenza */
  ["seeds", "xp", "level"].forEach((k) => { if (typeof o[k] === "string") F(k, k === "level" ? 1 : 0); });
  num("v", 3); num("seeds", 0, 0, 1e9, true); num("xp", 0, 0, 1e8, true); num("level", 1, 1, 1000, true); num("energy", 0, 0, 100);
  num("joy", 40, 0, 100); num("joyAt", Date.now()); num("onboard", 0, 0, 20, true); num("tut", 0); num("letterN", 0, 0, 1e6, true); num("track", 0);
  num("shields", 0, 0, 1000, true);
  str("lang", "en"); str("theme", "system"); str("petName", ""); str("day", "1970-01-01", secDateRe); /* un giorno non valido = "giorno passato": l'app passa a oggi da sola, come sempre */ str("wall", "w_cream");
  strN("pet"); strN("hat"); strN("giftDay"); strN("firstDay", secDateRe); strN("letterDay"); strN("uname");
  if (o.uname === null) delete o.uname;
  arr("done", isStr); arr("owned", isStr); arr("furn", isStr); arr("cards", isStr);
  arr("goals", (g) => secIsObj(g) && isStr(g.id) && g.id.length > 0);
  (o.goals || []).forEach((g) => { if (!Array.isArray(g.days)) { g.days = [0, 1, 2, 3, 4, 5, 6]; fixed = true; } else { const d = g.days.filter((x) => Number.isInteger(x) && x >= 0 && x <= 6); if (d.length !== g.days.length) { g.days = d; fixed = true; } } });
  arr("diary", (x) => secIsObj(x) && isStr(x.day));
  (o.diary || []).forEach((x) => { if (x.text != null && !isStr(x.text)) { x.text = String(x.text); fixed = true; } if (x.q != null && !isStr(x.q)) { x.q = ""; fixed = true; } });
  arr("garden", (x) => secIsObj(x) && isStr(x.t));
  arr("capsules", (x) => secIsObj(x) && isStr(x.text) && isStr(x.open));
  arr("log", (x) => secIsObj(x) && isStr(x.d) && isStr(x.g));
  obj("days", () => ({}));
  if (secIsObj(o.days)) Object.keys(o.days).forEach((k) => { const r = o.days[k]; if (!secDateRe.test(k) || !secIsObj(r)) { delete o.days[k]; fixed = true; return; } ["done", "total"].forEach((f) => { if (r[f] != null && (typeof r[f] !== "number" || !isFinite(r[f]))) { r[f] = 0; fixed = true; } }); });
  /* (revisione 1.0.8) oggetti con un campo sbagliato o mancante: si corregge solo quel campo (prima si azzerava tutto
     l'oggetto, per esempio il record dei giochi "best" di un salvataggio vecchio senza "seeds") */
  const sub = (k, def, nums) => {
    const v = o[k]; if (v === undefined) return; if (!secIsObj(v)) { F(k, def()); return; }
    nums.forEach((f) => { const x = v[f]; if (typeof x !== "number" || !isFinite(x)) { const n = Number(x); v[f] = x != null && isStr(x) && x.trim() !== "" && isFinite(n) ? n : 0; fixed = true; } });
  };
  sub("season", () => ({ key: null, n: 0, claimed: false }), ["n"]); if (secIsObj(o.season) && o.season.key != null && !isStr(o.season.key)) { o.season.key = null; fixed = true; }
  sub("fed", () => ({ day: null, n: 0 }), ["n"]); sub("game", () => ({ day: null, seeds: 0, best: 0 }), ["seeds"]); sub("visit", () => ({ last: null, n: 0 }), ["n"]);
  if (secIsObj(o.game) && o.game.best != null && (typeof o.game.best !== "number" || !isFinite(o.game.best))) { o.game.best = Number(o.game.best) || 0; fixed = true; }
  if (o.away != null && !(secIsObj(o.away) && isStr(o.away.dest) && typeof o.away.until === "number" && isFinite(o.away.until))) F("away", null);
  if (o.adsDay != null && !(secIsObj(o.adsDay) && typeof o.adsDay.n === "number" && isFinite(o.adsDay.n))) { delete o.adsDay; fixed = true; }
  ["tracked", "trophies", "pages", "wkc", "chap", "spc"].forEach((k) => { if (o[k] !== undefined && !secIsObj(o[k])) { delete o[k]; fixed = true; } });
  /* stato dei moduli 1.0.8 (S.v20...): devono essere oggetti; se no, il modulo riparte dai suoi valori iniziali */
  ["v20econ", "v20food", "v20fresh", "v20nav", "v20rev", "v20touch", "v20trip", "v20wear", "v20xmas", "v21sea", "recover"].forEach((k) => { if (o[k] != null && !secIsObj(o[k])) { delete o[k]; fixed = true; } });
  if (o.v20scene != null && typeof o.v20scene !== "string") { delete o.v20scene; fixed = true; }
  return { fixed };
}

/* --- applicazione all'avvio: S e' gia' stato letto da 45_state.js --- */
(() => {
  try {
    const raw = S_RAW; /* il testo da cui e' nato S (salvataggio o copia di sicurezza) */
    if (Object.getPrototypeOf(S) !== Object.prototype || (raw && /"(__proto__|constructor|prototype)"\s*:/.test(raw))) {
      let o = {}; try { o = secClean(JSON.parse(raw || "{}")) || {}; } catch (e) { o = {}; }
      S = Object.assign(fresh(), secIsObj(o) ? o : {});
    }
    const r = secFixTypes(S);
    if (!T[S.lang]) S.lang = "en";
    if (r.fixed) save();
  } catch (e) { /* in ogni caso l'app deve partire */ }
})();

/* --- 3) orologio che non torna indietro ---
   Ora dell'app = ora del telefono + secOff (correzione dall'ora vera, solo app Android), mai prima di secFloor
   (il momento piu' avanti gia' visto, che poi avanza con il tempo vero: se il telefono va indietro, l'app riparte da
   li' e va avanti normalmente; quando il telefono torna all'ora giusta, l'app usa di nuovo quella) e, nell'app Android, all'apertura mai oltre "l'ultima ora vera + il tempo da quando l'app e' aperta"
   (secHoldAt, non piu' usato: vedi sotto). */
let secFloor = 0, secFloorT0 = 0, secHoldAt = 0, secHoldT0 = 0;
const secClockOn = () => { try { return !navigator.webdriver || !!window.__secClockTest; } catch (e) { return true; } };
function secClkLoad() { try { const o = JSON.parse(localStorage.getItem(SEC_CLK_KEY) || "{}"); return secIsObj(o) ? o : {}; } catch (e) { return {}; } }
function secClkSave(o) { try { localStorage.setItem(SEC_CLK_KEY, JSON.stringify(o)); } catch (e) { /* niente */ } }
const secPerf = () => { try { return performance.now(); } catch (e) { return 0; } };
function secAppNow() {
  let t = SEC_R.now() + secOff;
  if (secHoldAt) t = Math.min(t, secHoldAt + (secPerf() - secHoldT0));
  /* il pavimento avanza con il tempo vero passato da quando e' stato messo (l'ora dell'app non si ferma mai) */
  if (secFloor) { const f = secFloor + (secPerf() - secFloorT0); if (t < f) t = f; }
  return t;
}
function secInstallDate() {
  if (window.Date && window.Date.__sec) return;
  const R = SEC_R;
  function SD(...a) { if (!new.target) return new R(secAppNow()).toString(); return a.length ? new R(...a) : new R(secAppNow()); }
  SD.prototype = R.prototype; SD.now = () => secAppNow(); SD.parse = R.parse; SD.UTC = R.UTC; SD.__sec = true;
  try { window.Date = SD; } catch (e) { /* niente */ }
}
/* imposta correzione, pavimento e attesa; dice se l'ora dell'app e' cambiata di almeno un minuto */
function secClockSet(off, floor, hold) {
  const before = secAppNow();
  off = Math.round(off) || 0; if (Math.abs(off) < SEC_TOL) off = 0;
  secOff = off; const fl = floor > 0 ? floor : 0; if (fl !== secFloor) { secFloor = fl; secFloorT0 = secPerf(); } if (hold === 0) secHoldAt = 0;
  if (secOff || secFloor || secHoldAt) secInstallDate();
  return Math.abs(secAppNow() - before) >= 60e3;
}
/* il momento piu' avanti visto (ora dell'app); se il telefono e' tornato indietro mentre l'app era aperta, si ferma li' */
/* Recupero per chi aveva la data del telefono sbagliata IN AVANTI per errore e poi l'ha corretta: il pavimento non
   resta per sempre. Se il telefono e' indietro di oltre 30 giorni (un anno sbagliato, ...) si torna subito all'ora
   del telefono; se e' indietro di meno, l'app resta avanti al massimo 48 ore (contate sull'ora del telefono), poi
   torna all'ora del telefono. Chi sposta la data indietro apposta deve quindi aspettare 2 giorni ogni volta, e i
   premi gia' presi restano segnati (98e). Nell'app Android 13+ l'ora della rete corregge tutto subito (98x). */
const SEC_DROP_BIG = 30 * 86400e3, SEC_DROP_WAIT = 48 * 3600e3;
const secNum = (v) => typeof v === "number" && isFinite(v);
function secFloorFor(o, dev) {
  const max = secNum(o.max) ? o.max : 0;
  if (!(max - dev > SEC_TOL)) { if (o.bh !== undefined) delete o.bh; return 0; }
  if (max - dev > SEC_DROP_BIG) { o.max = dev; delete o.bh; delete o.anc; return 0; }
  if (!secNum(o.bh) || o.bh > dev) o.bh = dev; /* da quando (ora del telefono) il telefono e' indietro */
  if (dev - o.bh > SEC_DROP_WAIT) { o.max = dev; delete o.bh; delete o.anc; return 0; }
  return max;
}
function secClkTouch() {
  if (!secClockOn()) return; const o = secClkLoad(); const dev = SEC_R.now() + secOff;
  const fl = secFloorFor(o, dev);
  if (fl && !secFloor) secClockSet(secOff, fl); else if (!fl && secFloor) secClockSet(secOff, 0);
  const n = secAppNow();
  if (!secNum(o.max) || n > o.max) o.max = n;
  secClkSave(o);
}
(() => {
  if (!secClockOn()) return;
  const o = secClkLoad(); const now = SEC_R.now(); const m0 = o.max, b0 = o.bh;
  const fl = secFloorFor(o, now); if (fl) secClockSet(0, fl);
  if (o.max !== m0 || o.bh !== b0) secClkSave(o);
  /* (revisione 1.0.8) Niente piu' "attesa" all'apertura (secHoldAt): con l'ora ferma all'ultima chiusura, tutto cio'
     che si calcola all'avvio (giorno nuovo, "Bentornato" con il suo regalo, ...) vedeva l'ora vecchia a ogni
     apertura. Ora l'avvio usa l'ora del telefono; TanettoClock la corregge pochi millisecondi dopo (98x), e un
     viaggio che finirebbe proprio all'apertura aspetta quella risposta (al massimo 1,5 secondi). */
})();
