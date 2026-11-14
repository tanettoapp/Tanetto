/* =================== STATO (solo su questo dispositivo) =================== */
const G = window.gsap || null;
const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const KEY = "tanetto-prova-v3";
const CALM = (() => { try { return !!JSON.parse(localStorage.getItem(KEY) || "{}").calm; } catch (e) { return false; } })();
const anim = !!G && !REDUCED && !CALM;
function guessLang() { const n = (navigator.language || "en").toLowerCase(); if (/^zh-(tw|hk|mo)|hant/.test(n) && T.zht) return "zht"; const l = n.slice(0, 2); return T[l] ? l : "en"; }
function dkey(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
/* 1.0.10 (C-07): in coreano le particelle "이(가)", "은(는)"... si scelgono in base al nome (koJ, 98zk) */
const esc = (s) => (typeof S !== "undefined" && S && S.lang === "ko" ? koJ(String(s)) : String(s)).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const fresh = () => ({ v: 3, lang: guessLang(), theme: "system", pet: null, petName: "", goals: [], day: dkey(), done: [], energy: 0, xp: 0, level: 1, seeds: 20, owned: ["w_cream"], hat: null, furn: [], wall: "w_cream", away: null, cards: [], diary: [], days: {}, giftDay: null, onboard: 0, sfx: true, music: false, season: { key: null, n: 0, claimed: false }, joy: 40, joyAt: Date.now(), garden: [], log: [], capsules: [], fed: { day: null, n: 0 }, game: { day: null, seeds: 0, best: 0 }, lightsOff: false, tut: 0, firstDay: null, haptic: true, letterDay: null, letterN: 0, visit: { last: null, n: 0 }, track: 0, tracked: {} });
/* 1.0.9: un salvataggio rovinato non viene MAI sostituito in silenzio da un cucciolo nuovo.
   1) Copie di sicurezza: il primo salvataggio di ogni giorno (e l'avvio, con il testo appena riletto) tiene le ultime
      SNAP_N copie buone (chiavi KEY-snap1 = la piu' recente ... KEY-snap3).
   2) All'avvio, se il testo salvato non si legge (o non e' un oggetto): lo si mette da parte (KEY-broken-<ora>, al
      massimo 2, per poterlo salvare in un file), si riparte dalla copia buona piu' recente e lo si dice con un messaggio
      onesto (S.recover, finche' non si tocca "Ho capito"). Senza copie si riparte da zero, ma i dati rovinati restano.
   3) "Ricomincia da capo" ed "Elimina profilo" cancellano anche copie e dati rovinati (snapClear). */
const SNAP_N = 3, SNAP_DAY = KEY + "-snapday", BROKEN_PFX = KEY + "-broken-";
const SNAP_KEY = (i) => `${KEY}-snap${i}`;
const stParse = (r) => { try { const o = JSON.parse(r); return o && typeof o === "object" && !Array.isArray(o) ? o : null; } catch (e) { return null; } };
const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
function brokenKeys() { try { return Object.keys(localStorage).filter((k) => k.startsWith(BROKEN_PFX)).sort(); } catch (e) { return []; } }
function brokenKeep(raw) {
  try { const ks = brokenKeys(); if (ks.some((k) => localStorage.getItem(k) === raw)) return; while (ks.length >= 2) localStorage.removeItem(ks.shift()); localStorage.setItem(BROKEN_PFX + Date.now(), raw); } catch (e) { /* memoria piena: il testo resta almeno nella chiave principale fino al prossimo salvataggio */ }
}
/* la rotazione si fa una volta al giorno, 2,5 s dopo la prima richiesta (a riposo: non rallenta l'avvio); la copia e' il
   testo della prima richiesta del giorno (all'avvio: quello appena riletto dalla memoria, quindi sicuramente leggibile) */
let snapT = null;
function snapTick(json) {
  if (!json || !S || !S.pet || snapT || lsGet(SNAP_DAY) === dkey()) return;
  snapT = setTimeout(() => { snapT = null; snapRotate(json); }, 2500);
}
function snapRotate(json) {
  const d = dkey(); if (lsGet(SNAP_DAY) === d) return;
  try { for (let i = SNAP_N; i > 1; i--) { const p = localStorage.getItem(SNAP_KEY(i - 1)); if (p) localStorage.setItem(SNAP_KEY(i), p); } localStorage.setItem(SNAP_KEY(1), json); localStorage.setItem(SNAP_DAY, d); }
  catch (e) { try { for (let i = SNAP_N; i > 1; i--) localStorage.removeItem(SNAP_KEY(i)); } catch (x) { /* niente */ } }
}
function snapClear() {
  clearTimeout(snapT); snapT = null;
  try { for (let i = 1; i <= SNAP_N; i++) localStorage.removeItem(SNAP_KEY(i)); localStorage.removeItem(SNAP_DAY); brokenKeys().forEach((k) => localStorage.removeItem(k)); localStorage.removeItem(KEY + "-rotto"); } catch (e) { /* niente */ }
}
let S = null, S_RAW = null;
(() => {
  const raw = lsGet(KEY); const o = raw ? stParse(raw) : null;
  if (o) { S = Object.assign(fresh(), o); S_RAW = raw; return; }
  const snaps = []; for (let i = 1; i <= SNAP_N; i++) { const r = lsGet(SNAP_KEY(i)); if (r) snaps.push(r); }
  if (!raw && !snaps.length) { S = fresh(); return; } /* prima apertura */
  if (raw) brokenKeep(raw);
  for (const r of snaps) { const so = stParse(r); if (so && so.pet) { S = Object.assign(fresh(), so); S_RAW = r; S.recover = { ok: true, day: typeof so.day === "string" ? so.day : null, at: Date.now() }; return; } }
  S = fresh(); S.recover = { ok: false, at: Date.now() };
})();
if (S_RAW && !S.recover) snapTick(S_RAW);
if (!T[S.lang]) S.lang = "en";
function save() { try { const j = JSON.stringify(S); localStorage.setItem(KEY, j); snapTick(j); } catch (e) { /* senza memoria l'app funziona lo stesso */ } }
const L = () => T[S.lang];
const loc = () => L().locale;
/* (critica fase 2) numeri sempre con il separatore delle migliaia, anche a 4 cifre: nella stessa griglia "5.000" e "12.900"
   (in italiano, spagnolo e polacco Intl di base scrive "5000" ma "12.900"). Dove "always" non c'e', resta il comportamento normale. */
const NUMG = { useGrouping: "always" };
function fmtDate(iso) { const [y, m, d] = iso.split("-").map(Number); return intlDT(loc(), { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(y, m - 1, d)); }
const fmtDay = (d) => { const s = intlDT(loc(), { day: "numeric", month: "long" }).format(d); return d.getDate() === 1 && S.lang === "fr" ? s.replace(/^1 /, "1er ") : d.getDate() === 1 && S.lang === "it" ? s.replace(/^1 /, "1º ") : s; };
const wdIdx = (d = new Date()) => (d.getDay() + 6) % 7;
const wdName = (i, style = "short") => intlDT(loc(), { weekday: style }).format(new Date(2024, 0, 1 + i)).replace(/\.$/, "");
const goalText = (g) => g.startsWith("c:") ? g.slice(2) : (L().goals[g] || g);
const goalCat = (g) => g.startsWith("c:") ? "custom" : (GOAL_CAT[g] || "custom");
function todayGoals() { const i = wdIdx(); return S.goals.filter((g) => g.days.includes(i)).map((g) => g.id); }
function phase(h = new Date().getHours()) { return h >= 6 && h < 11 ? "morning" : h >= 11 && h < 17 ? "day" : h >= 17 && h < 21 ? "evening" : "night"; }
function dayRec() {
  if (!S.days[S.day]) S.days[S.day] = { done: 0, total: 0, rest: false };
  const r = S.days[S.day]; r.total = todayGoals().length; r.free = r.total === 0;
  return r;
}
function rollDay() {
  const t = dkey();
  if (S.day !== t) { S.day = t; S.done = []; S.lightsOff = false; if (!S.away) S.energy = 0; if (S.pet) dayRec(); save(); }
  if (S.pet) visitTick();
}
function streak() {
  let n = 0; const d = new Date();
  const ok = (k) => S.days[k] && (S.days[k].done > 0 || S.days[k].rest || S.days[k].free);
  if (!ok(dkey(d))) d.setDate(d.getDate() - 1);
  while (ok(dkey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function stage() { return S.level >= 6 ? 2 : S.level >= 3 ? 1 : 0; }
/* 1.0.9: emisfero dal fuso orario del telefono (poi dalla regione della lingua del telefono). Prima valeva
   "portoghese = Brasile": in Portogallo l'app invertiva le stagioni (a marzo diceva "autunno"). */
const HEMI_S = /^(Australia|Antarctica)\/|^America\/(Argentina\/|Sao_Paulo|Bahia|Recife|Fortaleza|Maceio|Belem|Manaus|Cuiaba|Campo_Grande|Porto_Velho|Rio_Branco|Araguaina|Santarem|Boa_Vista|Noronha|Santiago|Punta_Arenas|Montevideo|Asuncion|La_Paz|Lima)$|^Pacific\/(Auckland|Chatham|Fiji|Tongatapu|Noumea|Efate|Tahiti|Apia)$|^Africa\/(Johannesburg|Maputo|Windhoek|Harare|Lusaka|Gaborone|Maseru|Mbabane|Blantyre|Lubumbashi)$|^Indian\/(Antananarivo|Mauritius|Reunion)$|^Atlantic\/Stanley$/;
const HEMI_RG = /^(BR|AR|CL|UY|PY|BO|PE|AU|NZ|ZA|NA|MZ|ZW|ZM|BW|LS|SZ|MG|MU|FJ)$/i;
function seaHemi() {
  if (seaHemi.v) return seaHemi.v; let h = null;
  try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; if (tz && !/^(Etc\/|UTC$|GMT)/.test(tz)) h = HEMI_S.test(tz) ? "S" : "N"; } catch (e) { /* niente */ }
  if (!h) { const rg = (((navigator.languages && navigator.languages[0]) || navigator.language || "").split("-")[1] || ""); h = rg ? (HEMI_RG.test(rg) ? "S" : "N") : (S.lang === "pt" ? "S" : "N"); }
  return (seaHemi.v = h);
}
function season() { return seasonInfo(seaHemi() === "S" ? "pt" : "x"); }
function seasonState() {
  const si = season();
  if (!S.season || S.season.key !== si.key) S.season = { key: si.key, n: 0, claimed: false };
  return si;
}
/* Mete e cartoline: "f:forest" (mondo fantastico) oppure "r:it:0" (luogo vero) */
function destList() {
  const fant = DESTS.map((d) => ({ key: `f:${d.id}`, h: d.h, lvl: d.lvl, name: L().dests[d.id], art: () => postcard(d.id, 0, L().dests[d.id]), cards: [0, 1, 2].map((i) => `f:${d.id}:${i}`) }));
  const real = (REAL[S.lang] || []).map((p, i) => ({ key: `r:${S.lang}:${i}`, h: REAL_H[i], lvl: REAL_LVL[i], name: p.name, art: () => realArt(p.art, p.name), cards: [`r:${S.lang}:${i}`] }));
  return { fant, real };
}
function destByKey(key) {
  const [k, a, b] = key.split(":");
  if (k === "f") { const d = DESTS.find((x) => x.id === a); return { key, h: d.h, lvl: d.lvl, name: L().dests[a], cards: [0, 1, 2].map((i) => `f:${a}:${i}`) }; }
  const p = REAL[a][+b]; return { key, h: REAL_H[+b], lvl: REAL_LVL[+b], name: p.name, cards: [`r:${a}:${b}`] };
}
function cardInfo(ck) {
  const [k, a, b] = ck.split(":");
  if (k === "f") { const [title, text] = L().stories[a][+b]; return { title, text, art: () => postcard(a, +b, title) }; }
  const p = REAL[a][+b]; return { title: p.t, text: p.s, art: () => realArt(p.art, p.t), place: p.name };
}

/* --- Felicità, visite di fila, conteggio anonimo --- */
function joyNow() { S.joy = Math.max(0, Math.min(100, S.joy || 0)); return S.joy; }
function addJoy(n) { joyNow(); S.joy = Math.min(100, S.joy + n); }
function visitTick() {
  const t = dkey(); if (S.visit.last === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  S.visit = { last: t, n: S.visit.last === dkey(y) ? S.visit.n + 1 : 1 }; save();
}
const today = (o) => o && o.day === S.day;
function feedLeft() { return FEED_MAX - (today(S.fed) ? S.fed.n : 0); }
function gameSeedsLeft() { return GAME_SEEDS_MAX - (today(S.game) ? S.game.seeds : 0); }
function track(path) {
  if (!GC_CODE) return;
  /* 1.0.10 (M-11): interruttore delle statistiche, spente per minori ed eta' non detta, niente prima della risposta sull'eta' (98zk) */
  if (typeof v26TrackGate === "function" && !v26TrackGate(path)) return;
  try { const i = new Image(); i.src = `https://${GC_CODE}.goatcounter.com/count?p=${encodeURIComponent("/" + path)}&e=true&rnd=${Math.random().toString(36).slice(2)}`; } catch (e) { /* niente */ }
}
function trackOnce(name) { const t = dkey(); S.tracked = S.tracked || {}; if (S.tracked[name] === t) return; S.tracked[name] = t; save(); track(name); }
function trackDaily() {
  const t = dkey(); if (!S.firstDay) S.firstDay = t;
  S.tracked = S.tracked || {}; if (S.tracked.open === t) return; S.tracked.open = t; save();
  track("apertura"); track(`lingua-${S.lang}`);
  if (S.pet) { const d = Math.round((new Date(t) - new Date(S.firstDay)) / 86400000); track(`giorno-${d}`); }
}
/* v15: i "formattatori" di date e numeri si creano una volta sola e si riusano (crearli costa, e prima succedeva a ogni disegno) */
function intlDT(l, o) { const c = intlDT.c || (intlDT.c = new Map()); const k = l + JSON.stringify(o || {}); let f = c.get(k); if (!f) { f = new Intl.DateTimeFormat(l, o); c.set(k, f); } return f; }
function intlNF(l, o) { const c = intlNF.c || (intlNF.c = new Map()); const k = l + JSON.stringify(o || {}); let f = c.get(k); if (!f) { f = new Intl.NumberFormat(l, o); c.set(k, f); } return f; }
