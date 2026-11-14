/* ===== 1.0.6 — notifiche migliori =====
   - Al massimo un promemoria al giorno, all'ora scelta, con la voce del compagno: 12 testi a rotazione.
   - Se c'è una serie di almeno 3 giorni e oggi non è ancora fatto, il promemoria di oggi parla della serie (con gentilezza).
   - Si diradano da sole: dopo l'ultima apertura, ogni giorno per 3 giorni, poi un giorno sì e uno no fino al decimo,
     poi un ultimo messaggio gentile al quattordicesimo giorno e basta (si riprogramma a ogni apertura).
   - Ritorno dal viaggio: "{n} è tornato da {posto}!"; se arriva di notte (21:30-8:00) si sposta alle 8.
   - Se oggi è tutto fatto, oggi niente promemoria. */
const V19N = {
  it: { msgs: ["{n} ha preparato una tazza di tè. Hai due minuti per un obiettivo?", "Un piccolo passo oggi conta. {n} ti aspetta.", "{n} guarda la porta: un obiettivo e torna il sorriso.", "Anche una cosa sola va benissimo. {n} fa il tifo per te.", "{n} ti ha tenuto il posto sul cuscino. Ci vediamo?", "Respira un attimo. Poi un obiettivo piccolo piccolo, insieme a {n}.", "{n} ha trovato una cosa bella da mostrarti.", "Com'è andata oggi? {n} vorrebbe saperlo.", "Un bicchiere d'acqua, due passi, una pagina: {n} sceglie con te.", "{n} ha messo in ordine la stanza e ti aspetta per festeggiare.", "Cinque minuti per te, anche solo cinque. {n} è qui.", "La giornata non è ancora finita: {n} crede in te."],
    streak: (n, k) => `${k} giorni di fila insieme! Basta un obiettivo piccolo, ${n} ti aspetta.`, last: (n) => `${n} ti pensa. Quando vuoi, la tua stanza è qui.`, trip: (n, p) => `${n} è tornato da ${p}!`, tripB: "Ha portato una cartolina per te 💌" },
  en: { msgs: ["{n} made you a cup of tea. Got two minutes for a goal?", "A small step today counts. {n} is waiting for you.", "{n} keeps looking at the door: one goal and the smile is back.", "Even just one thing is perfect. {n} is cheering for you.", "{n} saved you a spot on the cushion. See you soon?", "Take a breath. Then one tiny goal, together with {n}.", "{n} found something lovely to show you.", "How did today go? {n} would love to know.", "A glass of water, a short walk, a page: {n} picks with you.", "{n} tidied up the room and is waiting to celebrate with you.", "Five minutes for yourself, even just five. {n} is here.", "The day isn't over yet: {n} believes in you."],
    streak: (n, k) => `${k} days in a row together! One small goal is enough, ${n} is waiting.`, last: (n) => `${n} is thinking of you. Whenever you like, your room is here.`, trip: (n, p) => `${n} is back from ${p}!`, tripB: "Brought a postcard for you 💌" }
};
const v19n = () => V19N[S.lang] || null;
const NOTIF_PLAN = [0, 1, 2, 3, 5, 7, 9, 13]; /* giorni dopo oggi in cui c'è un promemoria (13 = l'ultimo, gentile) */

function quietShift(ts) {
  const d = new Date(ts); const h = d.getHours() + d.getMinutes() / 60;
  if (h >= 21.5) { d.setDate(d.getDate() + 1); d.setHours(8, 0, 0, 0); } else if (h < 8) d.setHours(8, 0, 0, 0);
  return d;
}
notifSchedule = function () {
  if (!isNativeApp()) return Promise.resolve();
  const p = LN(); if (!p) return Promise.resolve();
  const run = async () => {
    const ids = []; for (let i = 0; i < 16; i++) ids.push({ id: NOTIF_ID0 + i }); ids.push({ id: NOTIF_TRIP });
    try { await p.cancel({ notifications: ids }); } catch (e) { /* niente da cancellare */ }
    if (!S.notif || !S.pet) return;
    const t = L(), x = v19n(), n = S.petName || ""; const { h, m } = remTimes(); const now = Date.now(); const list = [];
    const tg = todayGoals(); const allDone = tg.length > 0 && tg.every((g) => S.done.includes(g));
    const day0 = Math.floor(new Date(dkey() + "T12:00:00").getTime() / 86400000);
    const msgs = (x && x.msgs) || t.notif.msgs; const st = typeof streak === "function" ? streak() : 0;
    NOTIF_PLAN.forEach((off, k) => {
      const d = new Date(); d.setDate(d.getDate() + off); d.setHours(h, m, 0, 0);
      if (d.getTime() < now + 60000) return; if (off === 0 && allDone) return;
      let body = msgs[(day0 + off) % msgs.length].split("{n}").join(n);
      if (off === 0 && st >= 3 && x) body = x.streak(n, st);
      if (k === NOTIF_PLAN.length - 1 && x) body = x.last(n);
      list.push({ id: NOTIF_ID0 + k, title: t.v12.remTitle(n), body, schedule: { at: d, allowWhileIdle: true }, isExactNotification: false, smallIcon: "ic_stat_tanetto", iconColor: "#4E8A4A" });
    });
    if (S.away && S.away.until > now + 60000) {
      let place = ""; try { place = destByKey(S.away.dest).name || ""; } catch (e) { place = ""; }
      const title = x && place ? x.trip(n, place) : t.notif.trip(n); const body = x ? x.tripB : t.notif.tripB;
      list.push({ id: NOTIF_TRIP, title, body, schedule: { at: quietShift(S.away.until), allowWhileIdle: true }, isExactNotification: false, smallIcon: "ic_stat_tanetto", iconColor: "#4E8A4A" });
    }
    if (!list.length) return;
    let ch = false; if (p.createChannel) { try { await p.createChannel({ id: NOTIF_CH, name: t.v12.remT || "Tanetto", importance: 4, visibility: 1, vibration: true }); ch = true; } catch (e) { ch = false; } }
    if (ch) list.forEach((y) => { y.channelId = NOTIF_CH; });
    try { await p.schedule({ notifications: list }); } catch (e) { trackOnce("notifiche-errore"); }
  };
  notifBusy = (notifBusy || Promise.resolve()).then(run, run);
  return notifBusy;
};
