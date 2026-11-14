/* ===== 1.0.6 — 16 obiettivi nuovi (niente promesse sulla salute: solo piccole cose belle e pratiche) ===== */
const V19G_NEW = { body: ["stairs", "skin", "green"], mind: ["meditate", "podcast", "language", "doodle"], home: ["prep", "trash", "air"], people: ["family", "compliment", "nicemsg"], work: ["plan", "budget", "desk"] };
CATS.forEach((c) => { (V19G_NEW[c[0]] || []).forEach((id) => { if (!c[2].includes(id)) c[2].push(id); GOAL_CAT[id] = c[0]; }); });
const V19G = {
  it: { stairs: "Fare le scale a piedi", skin: "Prendermi cura della pelle", green: "Stare un po' nel verde", meditate: "Meditare cinque minuti", podcast: "Ascoltare qualcosa di interessante", language: "Ripassare una lingua", doodle: "Fare un disegnino", prep: "Preparare il pranzo per domani", trash: "Portare fuori la spazzatura", air: "Aprire le finestre e cambiare aria", family: "Sentire qualcuno della famiglia", compliment: "Fare un complimento sincero", nicemsg: "Mandare un messaggio gentile", plan: "Organizzare la giornata di domani", budget: "Dare un'occhiata alle spese", desk: "Riordinare la scrivania" },
  en: { stairs: "Take the stairs", skin: "Take care of my skin", green: "Spend time in nature", meditate: "Meditate for five minutes", podcast: "Listen to something interesting", language: "Practise a language", doodle: "Draw a little doodle", prep: "Prepare tomorrow's lunch", trash: "Take out the trash", air: "Open the windows for fresh air", family: "Get in touch with family", compliment: "Give a sincere compliment", nicemsg: "Send a kind message", plan: "Plan tomorrow", budget: "Check my spending", desk: "Tidy my desk" }
};
Object.keys(T).forEach((l) => { if (T[l].goals) Object.keys(V19G.en).forEach((id) => { if (!T[l].goals[id]) T[l].goals[id] = (V19G[l] || V19G.en)[id]; }); });
/* Icone nello stesso stile (tratto 2, angoli tondi) */
Object.assign(GOAL_ICON, {
  stairs: '<path d="M3 20h5v-4h4v-4h4V8h5"/><path d="M3 20V16"/>',
  skin: '<path d="M8 3h8v3l-1 2v12a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8L8 6z"/><path d="M9 12h6"/>',
  green: '<path d="M12 22V12"/><path d="M12 12c-4 0-7-3-7-7 4 0 7 3 7 7z"/><path d="M12 15c3 0 6-2.5 6-6-3.5 0-6 2.5-6 6z"/>',
  meditate: '<circle cx="12" cy="5" r="2"/><path d="M12 8v5"/><path d="M5 18c2-3 4.5-5 7-5s5 2 7 5"/><path d="M4 18h16"/>',
  podcast: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  language: '<path d="M4 5h9"/><path d="M8.5 3v2"/><path d="M11 5c-1 4-3.5 7-6.5 8.5"/><path d="M6.5 8.5c1 2 3 3.5 5 4.5"/><path d="M13 21l4-9 4 9"/><path d="M14.5 18h5"/>',
  doodle: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/><path d="M4 20c4-1 6 1 9-1"/>',
  prep: '<rect x="3" y="9" width="18" height="11" rx="3"/><path d="M3 13h18"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
  air: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 3v18"/><path d="M14 9c2 0 3-1 4-2"/><path d="M14 13c2.5 0 3.5-1 4.5-2"/>',
  family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M2.5 20c.5-4 2.8-6 5.5-6s5 2 5.5 6"/><path d="M14 20c.4-3 1.6-5 3-5s3 2 3.5 5"/>',
  compliment: '<path d="M12 3l2.4 5 5.6.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.6-.8z"/>',
  nicemsg: '<path d="M4 5h16v11H9l-5 4z"/><path d="M12 13s-3-1.8-3-3.6A1.6 1.6 0 0 1 12 8.6a1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6z"/>',
  plan: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4M16 3v4"/><path d="M8 15l2 2 4-4"/>',
  budget: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M16 12.5h2"/><path d="M3 10h18"/><path d="M7 3.5h10"/>',
  desk: '<path d="M3 10h18"/><path d="M5 10v10M19 10v10"/><path d="M5 15h6v5"/><path d="M14 10V6h4v4"/>'
});
