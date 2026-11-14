/* =================== sc20 (1.0.8): il posto scelto resta, schermo intero dalla Casetta, acqua vera, palla che galleggia =================== */
/* Tutto avvolge le funzioni esistenti (nessuna viene sostituita): roomBlock, roomSVG, sceneSpots, render, closeFull, takePhoto,
   viewHome, throwBall, stopPlay, startPlay, plusSceneSVG, gardenScene, terraceScene, festivalScene, ambientExtra.
   Stato nuovo: S.v20scene = posto scelto nello schermo intero ("room", "garden", "terrace", "beach", "camp", "snow", "festival"). */

const SC20S_T = {
  it: { float: "Splash! Galleggia… l'acqua me la riporta piano piano.", back: "Eccola qui, tutta bagnata! Ancora?",
    hint: { beach: "Tocca la sabbia o il mare per lanciare la palla: in acqua galleggia!", garden: "Tocca il prato o lo stagno per lanciare la palla: in acqua galleggia!", festival: "Tocca il pontile o il lago per lanciare la palla: in acqua galleggia!" } },
  en: { float: "Splash! It floats… the water's bringing it back to me.", back: "Here it is, all wet! Again?",
    hint: { beach: "Tap the sand or the sea to throw the ball: it floats in the water!", garden: "Tap the grass or the pond to throw the ball: it floats in the water!", festival: "Tap the dock or the lake to throw the ball: it floats in the water!" } },
  de: { float: "Platsch! Er schwimmt … das Wasser bringt ihn mir langsam zurück.", back: "Da ist er, ganz nass! Nochmal?",
    hint: { beach: "Tippe auf den Sand oder aufs Meer, um den Ball zu werfen: Im Wasser schwimmt er!", garden: "Tippe auf die Wiese oder den Teich, um den Ball zu werfen: Im Wasser schwimmt er!", festival: "Tippe auf den Steg oder den See, um den Ball zu werfen: Im Wasser schwimmt er!" } },
  es: { float: "¡Chof! Flota… el agua me la trae de vuelta poco a poco.", back: "¡Aquí está, toda mojada! ¿Otra vez?",
    hint: { beach: "Toca la arena o el mar para lanzar la pelota: ¡en el agua flota!", garden: "Toca el césped o el estanque para lanzar la pelota: ¡en el agua flota!", festival: "Toca el muelle o el lago para lanzar la pelota: ¡en el agua flota!" } },
  fr: { float: "Plouf ! Elle flotte… l'eau me la ramène tout doucement.", back: "La revoilà, toute mouillée ! Encore ?",
    hint: { beach: "Touche le sable ou la mer pour lancer la balle : dans l'eau, elle flotte !", garden: "Touche l'herbe ou la mare pour lancer la balle : dans l'eau, elle flotte !", festival: "Touche le ponton ou le lac pour lancer la balle : dans l'eau, elle flotte !" } },
  pt: { float: "Tchibum! Ela boia… a água vai trazê-la de volta pra mim.", back: "Aqui está ela, toda molhada! De novo?",
    hint: { beach: "Toque na areia ou no mar para jogar a bola: na água ela boia!", garden: "Toque na grama ou no laguinho para jogar a bola: na água ela boia!", festival: "Toque no píer ou no lago para jogar a bola: na água ela boia!" } },
  ja: { float: "ポチャン！ボールが浮かんでる。水がゆっくり戻してくれるよ。", back: "戻ってきた！びしょびしょだね。もう一回やる？",
    hint: { beach: "砂浜か海をタップしてボールを投げてね。水の上ではぷかぷか浮かびます！", garden: "芝生か池をタップしてボールを投げてね。水の上ではぷかぷか浮かびます！", festival: "桟橋か湖をタップしてボールを投げてね。水の上ではぷかぷか浮かびます！" } },
  ko: { float: "퐁당! 공이 둥둥 떠 있어요. 물이 천천히 돌려줄 거예요.", back: "돌아왔어요, 흠뻑 젖었네요! 한 번 더 할래요?",
    hint: { beach: "모래나 바다를 눌러 공을 던져 봐요. 물에서는 둥둥 떠요!", garden: "잔디나 연못을 눌러 공을 던져 봐요. 물에서는 둥둥 떠요!", festival: "부두나 호수를 눌러 공을 던져 봐요. 물에서는 둥둥 떠요!" } },
  zh: { float: "扑通！球浮起来了……水会慢慢把它送回来。", back: "回来啦，湿漉漉的！再来一次？",
    hint: { beach: "点沙滩或大海来扔球：球在水里会浮起来！", garden: "点草地或池塘来扔球：球在水里会浮起来！", festival: "点码头或湖面来扔球：球在水里会浮起来！" } },
  zht: { float: "撲通！球浮起來了……水會慢慢把它送回來。", back: "回來啦，濕漉漉的！再來一次？",
    hint: { beach: "點沙灘或大海來丟球：球在水裡會浮起來！", garden: "點草地或池塘來丟球：球在水裡會浮起來！", festival: "點碼頭或湖面來丟球：球在水裡會浮起來！" } },
  ru: { float: "Плюх! Мячик плавает… вода сама потихоньку вернёт его мне.", back: "Вот он, весь мокрый! Ещё разок?",
    hint: { beach: "Нажми на песок или на море, чтобы бросить мяч: в воде он не тонет!", garden: "Нажми на траву или на пруд, чтобы бросить мяч: в воде он не тонет!", festival: "Нажми на мостки или на озеро, чтобы бросить мяч: в воде он не тонет!" } },
  pl: { float: "Plusk! Piłka unosi się na wodzie… woda powoli mi ją odda.", back: "Jest, cała mokra! Jeszcze raz?",
    hint: { beach: "Dotknij piasku albo morza, żeby rzucić piłkę: na wodzie się unosi!", garden: "Dotknij trawy albo stawu, żeby rzucić piłkę: na wodzie się unosi!", festival: "Dotknij pomostu albo jeziora, żeby rzucić piłkę: na wodzie się unosi!" } },
  nl: { float: "Plons! Hij drijft… het water brengt hem rustig naar me terug.", back: "Daar is hij, helemaal nat! Nog een keer?",
    hint: { beach: "Tik op het zand of de zee om de bal te gooien: in het water drijft hij!", garden: "Tik op het gras of de vijver om de bal te gooien: in het water drijft hij!", festival: "Tik op de steiger of het meer om de bal te gooien: in het water drijft hij!" } },
  tr: { float: "Şap! Top yüzüyor… su onu bana yavaş yavaş geri getirecek.", back: "İşte geldi, sırılsıklam! Bir daha?",
    hint: { beach: "Topu atmak için kuma ya da denize dokun: suda yüzüyor!", garden: "Topu atmak için çimene ya da gölete dokun: suda yüzüyor!", festival: "Topu atmak için iskeleye ya da göle dokun: suda yüzüyor!" } }
};
const sc20st = () => SC20S_T[S.lang] || SC20S_T.en;
const sc20clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ======================= 1) Il posto scelto resta (anche nella scheda di Oggi e dopo il riavvio) ======================= */
const SC20_SCENES = ["room", "garden", "terrace", "beach", "camp", "snow", "festival"];
function sc20sceneOk(k) {
  if (k === "room") return true;
  if (k === "garden") return S.level >= LV.garden;
  if (k === "terrace") return S.level >= LV.terrace;
  if (PLUS_SCENES.includes(k)) return !!plusActive();
  if (k === "festival") return typeof curSeason === "function" && !!curSeason() && typeof festivalScene === "function";
  return false;
}
/* il posto scelto (resta salvato anche se per ora non si può mostrare: torna da solo quando Plus o il livello ci sono di nuovo) */
function sc20wanted() { const k = S && S.v20scene; return SC20_SCENES.includes(k) ? k : "room"; }
/* il posto da mostrare adesso: se è bloccato si torna alla stanza */
function sc20effective() { try { const k = sc20wanted(); return sc20sceneOk(k) ? k : "room"; } catch (e) { return "room"; } }

let sc20seen = null, sc20card = null, sc20home = false, sc20homeY = 0;
try { if (S) sceneId = sc20effective(); } catch (e) { /* niente */ }

const _renderSC20s = render;
render = function () {
  try {
    /* nello schermo intero qualcuno (un tocco su un posto) ha cambiato sceneId: è la scelta da ricordare */
    if (full && sc20seen !== null && sceneId !== sc20seen && SC20_SCENES.includes(sceneId) && S.v20scene !== sceneId) { S.v20scene = sceneId; save(); }
    if (!full) sceneId = sc20effective();
  } catch (e) { /* niente */ }
  _renderSC20s();
  sc20seen = sceneId;
};

/* La scheda della stanza in Oggi mostra il posto scelto */
function sc20sceneSVG(k, o) {
  const ph = o.ph || phase(), e = o.e || petExpr(), glow = o.glow != null ? o.glow : null;
  if (PLUS_SCENES.includes(k)) return plusSceneSVG(k, { ph, e, glow });
  if (k === "garden") return gardenScene({ ph, e, glow, season: season().id });
  if (k === "terrace") return terraceScene({ e, glow });
  if (k === "festival") return festivalScene({ e, glow });
  return null;
}
const _roomSVGSC20s = roomSVG;
roomSVG = function (opts) {
  if (sc20card && opts && !opts.away && opts.top == null) { try { const s = sc20sceneSVG(sc20card, opts); if (s) return s; } catch (e) { /* si torna alla stanza */ } }
  return _roomSVGSC20s(opts);
};
function sc20cardSpots(k) {
  if (k === "garden") return [["can", 280, (SCENE_POS.canY || 266) - 24, 52, 44]];
  if (k === "terrace") return [["telescope", 278, 204, 58, 72]];
  if (k === "festival") return [["lake", 16, 252, 328, 44]];
  if (PLUS_SCENES.includes(k)) return SCENE_POS.spot ? [SCENE_POS.spot] : [];
  return [];
}
const _sceneSpotsSC20s = sceneSpots;
sceneSpots = function (furn) { if (sc20card && !full) return sc20cardSpots(sc20card); return _sceneSpotsSC20s(furn); };

const _roomBlockSC20s = roomBlock;
roomBlock = function () {
  if (full || S.away || !S.pet) return _roomBlockSC20s();
  const k = sc20effective(); if (k === "room") return _roomBlockSC20s();
  /* mentre si spostano i mobili (98a) si resta nella stanza */
  if (typeof V20T === "object" && V20T && V20T.arr) return _roomBlockSC20s();
  let h; sc20card = k;
  try { h = _roomBlockSC20s(); } finally { sc20card = null; }
  /* l'amico alla finestra e il pulsante "sposta i mobili" (98a) servono solo nella stanza */
  h = h.replace(/<button class="friendhit"[^>]*><\/button>/, "").replace(/<button class="fullbtn mvbtn" id="arrOpen"[^>]*>[\s\S]*?<\/button>/, "");
  return h.replace('<div class="room ', `<div class="room sc20sc scene-${k} `);
};

/* La foto ricordo ritrae il posto in cui si trova il compagno */
const _takePhotoSC20s = takePhoto;
takePhoto = function (...a) {
  let k = "room";
  try { if (S.pet && !S.away) k = full ? sceneId : sc20effective(); if (!sc20sceneOk(k)) k = "room"; } catch (e) { k = "room"; }
  if (k === "room") return _takePhotoSC20s.apply(this, a);
  const wasFull = full, pos = Object.assign({}, SCENE_POS);
  sc20card = k; full = false;
  try { return _takePhotoSC20s.apply(this, a); } finally { sc20card = null; full = wasFull; Object.keys(SCENE_POS).forEach((x) => { if (!(x in pos)) delete SCENE_POS[x]; }); Object.assign(SCENE_POS, pos); }
};

/* Le stelle della terrazza si possono toccare anche nella scheda */
document.addEventListener("click", (ev) => {
  const star = ev.target.closest && ev.target.closest(".dstar"); if (!star || full || !star.closest("#room")) return;
  const t = L(); const k = star.dataset.day; const r = S.days[k] || {};
  toast(r.done ? t.full.starDay(fmtDate(k), r.done) : t.full.starRest(fmtDate(k))); SND.note(1046.5);
  if (anim) G.fromTo(star, { scale: 1.6 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.6, ease: "elastic.out(1, .4)" });
}, true);

/* ======================= 2) Schermo intero anche dalla Casetta ======================= */
const _viewHomeSC20s = viewHome;
viewHome = function () {
  const h = _viewHomeSC20s();
  try {
    if (!S.pet || (typeof tryId !== "undefined" && tryId)) return h;
    const btn = `<button class="fullbtn sc20hfull" id="sc20FullHome" aria-label="${esc(L().full.open)}">${icon("expand")}</button>`;
    const key = '<div class="fx" id="fx"></div>'; const i = h.indexOf(key); if (i < 0) return h;
    return h.slice(0, i) + btn + h.slice(i);
  } catch (e) { return h; }
};
function sc20openFromHome() {
  if (S.away) { if (typeof awayFull === "function") awayFull(); return; }
  if (!S.pet || full) return;
  /* dalla Casetta si guarda la stanza: il posto scelto in Oggi non cambia finché non se ne tocca un altro */
  sc20homeY = window.scrollY || 0; sc20home = true; tab = "today"; sceneId = "room"; sc20seen = "room";
  openFull();
  if (!full) { sc20home = false; tab = "home"; render(); }
}
const _closeFullSC20s = closeFull;
closeFull = function (...a) {
  const back = full && sc20home; sc20home = false;
  /* il suggerimento della palla in acqua non serve più fuori dallo schermo intero */
  try { if (sayText && Object.values(sc20st().hint).includes(sayText)) sayText = null; } catch (e) { /* niente */ }
  if (back) tab = "home";
  const r = _closeFullSC20s.apply(this, a);
  if (back) { const y = sc20homeY; requestAnimationFrame(() => { try { window.scrollTo(0, y); } catch (e) { /* niente */ } }); }
  return r;
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "sc20FullHome") return;
  ev.stopImmediatePropagation(); ev.preventDefault(); sc20openFromHome();
}, true);

/* ======================= 3) Acqua bella: mare, stagno, lago ======================= */
const sc20lite = () => { try { return isLite(); } catch (e) { return false; } };
function sc20wline(x0, x1, y, amp, wl) { let d = `M${x0 - 2 * wl} ${y}`; for (let x = x0 - 2 * wl; x < x1 + 2 * wl; x += wl) d += ` q${wl / 4} ${-amp} ${wl / 2} 0 t${wl / 2} 0`; return d; }
function sc20band(y, amp, wl, h, fill, op, dur) { return `<path class="sc20wv" data-wl="${wl}" data-d="${dur}" d="${sc20wline(0, 360, y, amp, wl)} V${y + h} H${-2 * wl} Z" fill="${fill}" opacity="${op}"/>`; }
function sc20crest(x0, x1, y, amp, wl, col, w, op, dur, dash) { return `<path class="sc20wv" data-wl="${wl}" data-d="${dur}" d="${sc20wline(x0, x1, y, amp, wl)}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${op}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`; }
function sc20spark(x, y, r, col) { const k = r * 0.26; return `<path class="sc20sp" d="M${x} ${y - r}L${(x + k).toFixed(1)} ${(y - k).toFixed(1)}L${x + r} ${y}L${(x + k).toFixed(1)} ${(y + k).toFixed(1)}L${x} ${y + r}L${(x - k).toFixed(1)} ${(y + k).toFixed(1)}L${x - r} ${y}L${(x - k).toFixed(1)} ${(y - k).toFixed(1)}Z" fill="${col}" opacity=".85"/>`; }
/* colonna di luce (sole o luna) che tremola sull'acqua */
function sc20column(cx, y0, y1, w0, w1, col, op, seed) {
  let s = ""; let i = 0;
  for (let y = y0; y < y1; y += 4.4, i++) {
    const k = (y - y0) / (y1 - y0), w = w0 + (w1 - w0) * k, h = 1.1 + k * 1.3;
    const a = hashN(seed + "a" + i), b = hashN(seed + "b" + i);
    const x1 = cx - w / 2 + a * w * 0.25, l1 = w * (0.25 + b * 0.3), x2 = x1 + l1 + 2 + a * 3, l2 = Math.max(2, cx + w / 2 - x2 - b * w * 0.2);
    s += `<rect class="sc20gl" x="${x1.toFixed(1)}" y="${y.toFixed(1)}" width="${l1.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}" fill="${col}" opacity="${(op * (1 - k * 0.45)).toFixed(2)}"/>`;
    if (l2 > 1.5) s += `<rect class="sc20gl" x="${x2.toFixed(1)}" y="${(y + 0.6).toFixed(1)}" width="${l2.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h / 2).toFixed(1)}" fill="${col}" opacity="${(op * 0.8 * (1 - k * 0.5)).toFixed(2)}"/>`;
  }
  return s;
}
function sc20dim(s) {
  if (!S.lightsOff) return s;
  const d = dims(); const i = s.lastIndexOf("</svg>"); if (i < 0) return s;
  return s.slice(0, i) + `<rect class="sc20dim" x="0" y="${-d.top}" width="360" height="${d.H}" fill="#101536" opacity=".42" pointer-events="none"/>` + s.slice(i);
}
function sc20before(s, key, add) { const i = s.indexOf(key); return i < 0 ? s : s.slice(0, i) + add + s.slice(i); }
const sc20PET = '<g id="petWrap"';

/* --- Il mare della spiaggia --- */
const SC20SEA = {
  morning: { g: ["#CDEBF2", "#6EC1E0", "#3C9DCC", "#73D3D3"], haze: "#FBE3CC", deep: "#1F6E9E", shal: "#8BE3DA", sun: "#FFF1C9", isl: "#7FAFA6", hull: "#E2654F", wet: "#D8B677" },
  day: { g: ["#B5E3F2", "#4AAFDB", "#2A8BC3", "#5ACCD0"], haze: "#E6F5FB", deep: "#1A6A9C", shal: "#86E6DC", sun: "#FFF6CF", isl: "#6FA9A0", hull: "#E2654F", wet: "#D8B677" },
  evening: { g: ["#F6CFA6", "#8EA9C9", "#4E7EAE", "#6FB5C2"], haze: "#FBD3A6", deep: "#2D4F7E", shal: "#A5D7CE", sun: "#FFC98A", isl: "#7E7F9C", hull: "#C8503B", wet: "#CFA56C" },
  night: { g: ["#4A5C8C", "#294A78", "#1B3660", "#2B5A7E"], haze: "#3B4A78", deep: "#0F2446", shal: "#4D7FA0", sun: "#F8F1D4", isl: "#2E3D63", hull: "#9E4A3C", wet: "#B79A6A" }
};
const sc20curve = (dy) => `M0 ${206 + dy} C80 ${196 + dy} 160 ${210 + dy} 240 ${202 + dy} C300 ${196 + dy} 340 ${204 + dy} 360 ${200 + dy}`;
const sc20curveRev = (dy) => `L360 ${200 + dy} C340 ${204 + dy} 300 ${196 + dy} 240 ${202 + dy} C160 ${210 + dy} 80 ${196 + dy} 0 ${206 + dy}`;
/* l'orlo della sabbia (stessa curva della spiaggia), per sapere dove finisce il mare */
function sc20sandTop(x) {
  const segs = [[[0, 206], [80, 196], [160, 210], [240, 202]], [[240, 202], [300, 196], [340, 204], [360, 200]]];
  let prev = [0, 206];
  for (const sg of segs) for (let i = 1; i <= 24; i++) {
    const t = i / 24, u = 1 - t; const px = u * u * u * sg[0][0] + 3 * u * u * t * sg[1][0] + 3 * u * t * t * sg[2][0] + t * t * t * sg[3][0]; const py = u * u * u * sg[0][1] + 3 * u * u * t * sg[1][1] + 3 * u * t * t * sg[2][1] + t * t * t * sg[3][1];
    if (px >= x) return prev[1] + ((py - prev[1]) * (x - prev[0])) / ((px - prev[0]) || 1);
    prev = [px, py];
  }
  return 200;
}
function sc20sea(ph) {
  const P = SC20SEA[ph] || SC20SEA.day, night = ph === "night"; const g = nid("sc20sg"), hz = nid("sc20sh");
  let s = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.g[0]}"/><stop offset=".22" stop-color="${P.g[1]}"/><stop offset=".68" stop-color="${P.g[2]}"/><stop offset="1" stop-color="${P.g[3]}"/></linearGradient><linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.haze}" stop-opacity="0"/><stop offset="1" stop-color="${P.haze}" stop-opacity=".6"/></linearGradient></defs>`;
  s += `<rect x="0" y="118" width="360" height="23" fill="url(#${hz})"/>`;
  /* isoletta lontana con la palma: profondità */
  s += `<g opacity="${night ? 0.55 : 0.8}"><path d="M16 141 Q44 127 76 141 Z" fill="${P.isl}"/><path d="M46 134 q-1.5 -8 1.5 -15" stroke="${P.isl}" stroke-width="1.8" fill="none"/><path d="M47.5 119 q-7 -1.5 -11 3 M47.5 119 q6 -2.5 10.5 2 M47.5 119 q-3 -5 -8.5 -5.5 M47.5 119 q4 -5 9.5 -4.5" stroke="${P.isl}" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>`;
  s += `<rect x="0" y="140" width="360" height="72" fill="url(#${g})"/>`;
  /* fasce d'onda: lontane strette e lente, vicine larghe */
  s += sc20band(150, 0.8, 28, 70, "#fff", night ? 0.04 : 0.07, 9) + sc20band(160, 1.3, 40, 60, P.deep, night ? 0.22 : 0.16, 11) + sc20band(174, 2, 58, 46, "#fff", night ? 0.05 : 0.08, 13) + sc20band(186, 2.6, 76, 34, P.shal, night ? 0.25 : 0.35, 10);
  /* il riflesso del sole (o della luna) */
  s += sc20column(292, 143, 198, 5, 40, P.sun, night ? 0.6 : 0.7, "sc20c" + ph);
  /* creste bianche */
  s += sc20crest(0, 360, 151, 0.8, 34, "#fff", 0.8, night ? 0.18 : 0.35, 8, "14 9") + sc20crest(0, 360, 165, 1.3, 50, "#fff", 1.1, night ? 0.2 : 0.4, 10, "22 12") + sc20crest(0, 360, 180, 1.9, 68, "#fff", 1.5, night ? 0.22 : 0.45, 12, "34 16") + sc20crest(0, 360, 194, 2.4, 88, "#fff", 1.9, night ? 0.25 : 0.5, 14, "46 18");
  /* barchetta che dondola */
  s += `<g class="sc20boat"><ellipse cx="314" cy="157.5" rx="13" ry="1.5" fill="${P.deep}" opacity=".35"/><path d="M302 151 h24 l-4.5 5.5 h-15 Z" fill="${P.hull}"/><rect x="313" y="122" width="1.4" height="29.5" fill="#8E6440"/><path d="M315 124 L327 149 L315 149 Z" fill="#fff" opacity=".95"/><path d="M312.5 127 L312.5 149 L303.5 149 Z" fill="#fff" opacity=".8"/></g>`;
  /* luccichii */
  [[214, 158, 2.6], [258, 172, 3.2], [326, 168, 2.4], [120, 186, 3], [40, 166, 2.2], [180, 150, 2]].forEach(([x, y, r]) => { s += sc20spark(x, y, r, night ? "#E9EEFF" : "#fff"); });
  s += `<rect x="0" y="140" width="360" height="1.4" fill="#fff" opacity="${night ? 0.2 : 0.55}"/>`;
  return s;
}
function sc20shore(ph) {
  const P = SC20SEA[ph] || SC20SEA.day, night = ph === "night";
  let s = `<path d="${sc20curve(-1)} ${sc20curveRev(13)} Z" fill="${P.wet}" opacity=".45"/>`;
  s += `<path class="sc20swash2" d="${sc20curve(11)}" stroke="#fff" stroke-width="1.1" fill="none" opacity="${night ? 0.2 : 0.4}" stroke-dasharray="12 7" stroke-linecap="round"/>`;
  s += `<g class="sc20swash"><path d="${sc20curve(-7)} ${sc20curveRev(4)} Z" fill="${P.shal}" opacity="${night ? 0.45 : 0.6}"/><path d="${sc20curve(4)}" stroke="#fff" stroke-width="2.6" fill="none" opacity="${night ? 0.45 : 0.92}" stroke-linecap="round"/><path d="${sc20curve(1)}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".55" stroke-dasharray="2 6" stroke-linecap="round"/></g>`;
  return s;
}
/* gabbiani lontani */
function sc20gulls(TOP) { return [[96, 34, 1], [130, 52, 0.8], [228, 26, 0.7]].map(([x, y, k]) => `<g class="sc20gull" transform="translate(${x} ${Math.round(y - TOP * 0.3)}) scale(${k})"><path d="M-7 0 Q-3.5 -4.5 0 0 Q3.5 -4.5 7 0" stroke="#5B6B7A" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`).join(""); }

/* --- Stagno del giardino --- */
const SC20POND = { morning: ["#2F86B8", "#56ACD6", "#A6DCEE"], day: ["#2B80B4", "#4FA9D6", "#93D7EE"], evening: ["#3A6E9C", "#6FA3C8", "#E8C3A0"], night: ["#1C355E", "#2A5283", "#4E7DB0"] };
function sc20pond(cy, ph, ice) {
  const id = nid("sc20pg"), cl = nid("sc20pc"); const C = SC20POND[ph] || SC20POND.day;
  if (ice) {
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2F8FC"/><stop offset=".55" stop-color="#CFE3F2"/><stop offset="1" stop-color="#B4D2EA"/></linearGradient><clipPath id="${cl}"><ellipse cx="74" cy="${cy}" rx="46" ry="13"/></clipPath></defs><ellipse cx="74" cy="${cy}" rx="46" ry="13" fill="url(#${id})"/><g clip-path="url(#${cl})"><path d="M44 ${cy - 14} L62 ${cy + 14} M54 ${cy - 14} L68 ${cy + 10} M92 ${cy - 14} L104 ${cy + 12}" stroke="#fff" stroke-width="2.4" opacity=".7"/><path d="M78 ${cy - 4} l6 3 l5 -2 M84 ${cy - 1} l-2 5" stroke="#9EBFDA" stroke-width=".8" fill="none" opacity=".7"/></g>${sc20spark(96, cy - 3, 2.6, "#fff")}${sc20spark(58, cy + 3, 2, "#fff")}`;
  }
  let s = `<defs><radialGradient id="${id}" cx="50%" cy="58%" r="62%"><stop offset="0" stop-color="${C[0]}"/><stop offset=".62" stop-color="${C[1]}"/><stop offset="1" stop-color="${C[2]}"/></radialGradient><clipPath id="${cl}"><ellipse cx="74" cy="${cy}" rx="46" ry="13"/></clipPath></defs>`;
  s += `<ellipse cx="74" cy="${cy + 1.6}" rx="48.6" ry="14.8" fill="#55784A" opacity=".55"/><ellipse cx="74" cy="${cy}" rx="46" ry="13" fill="url(#${id})"/>`;
  s += `<g clip-path="url(#${cl})"><ellipse cx="74" cy="${cy - 10.5}" rx="50" ry="7" fill="#1D4A6E" opacity=".3"/><ellipse cx="62" cy="${cy - 1}" rx="22" ry="3" fill="#fff" opacity="${ph === "night" ? 0.12 : 0.3}"/><ellipse cx="82" cy="${cy + 2.5}" rx="12" ry="1.8" fill="#fff" opacity="${ph === "night" ? 0.08 : 0.2}"/>`;
  s += sc20crest(28, 120, cy + 1, 0.6, 14, "#fff", 0.7, 0.3, 6) + sc20crest(28, 120, cy + 6, 0.7, 18, "#fff", 0.7, 0.22, 7);
  s += `<ellipse class="sc20rp" cx="98" cy="${cy + 2}" rx="3" ry="1" fill="none" stroke="#fff" stroke-width=".9" opacity="0"/><ellipse class="sc20rp" cx="50" cy="${cy + 4}" rx="3" ry="1" fill="none" stroke="#fff" stroke-width=".9" opacity="0"/></g>`;
  s += `<path d="M30 ${cy + 3} C44 ${cy + 15} 104 ${cy + 15} 118 ${cy + 3}" stroke="#fff" stroke-width="1.1" fill="none" opacity=".28"/>`;
  s += sc20spark(70, cy - 2, 2.4, "#fff") + sc20spark(104, cy + 4, 2, "#fff");
  return s;
}

/* --- Le scene avvolte --- */
const _plusSceneSC20s = plusSceneSVG;
plusSceneSVG = function (k, o) {
  let s = _plusSceneSC20s(k, o);
  try {
    const d = dims(), TOP = d.top, BOT = d.bot, ph = (o && o.ph) || "day", night = ph === "night";
    if (k === "beach") {
      s = s.replace(/<rect x="0" y="140" width="360" height="72" fill="url\(#[^)]+\)"\/>[\s\S]*?<rect x="312" y="150" width="3" height="10" fill="#8E6440"\/>/, () => sc20sea(ph));
      s = s.replace('<path d="M0 214 C90 206 170 218 260 210 C310 206 344 212 360 210" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>', () => sc20shore(ph));
      if (!night) s = sc20before(s, `<rect x="0" y="118" width="360" height="23"`, sc20gulls(TOP));
    } else if (k === "camp") {
      const mt = night ? "#24344A" : "#93AFA6", hz = nid("sc20ch");
      s = sc20before(s, '<path d="M0 170 C60 140 120 160 180 146', `<defs><linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? "#3B4A78" : "#E8F3F4"}" stop-opacity="0"/><stop offset="1" stop-color="${night ? "#3B4A78" : "#E8F3F4"}" stop-opacity=".55"/></linearGradient></defs><path d="M0 150 L46 116 L84 138 L140 94 L200 136 L250 110 L300 132 L332 112 L360 128 L360 176 L0 176 Z" fill="${mt}" opacity=".7"/><path d="M140 94 L152 104 L144 103 L136 108 L130 101 Z M250 110 L259 118 L252 117 L245 121 Z" fill="#fff" opacity="${night ? 0.35 : 0.85}"/><rect x="0" y="120" width="360" height="56" fill="url(#${hz})"/>`);
      const fl = nid("sc20cf");
      const smoke = anim ? [0, 1, 2].map((i) => `<circle class="sc20smoke" data-i="${i}" cx="286" cy="216" r="${4 + i}" fill="${night ? "#8A93B0" : "#fff"}" opacity="0"/>`).join("") : "";
      s = sc20before(s, '<g transform="translate(286 258)">', `<defs><radialGradient id="${fl}"><stop offset="0" stop-color="#FFC27A" stop-opacity="1"/><stop offset="1" stop-color="#FFC27A" stop-opacity="0"/></radialGradient></defs><ellipse class="sc20fire" cx="286" cy="262" rx="${night ? 96 : 70}" ry="${night ? 28 : 20}" fill="url(#${fl})" opacity="${night ? 0.45 : 0.22}"/>${smoke}`);
    } else if (k === "snow") {
      const hz = nid("sc20nh");
      s = sc20before(s, '<g transform="translate(24 204) ', `<defs><linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="${night ? 0.18 : 0.5}"/></linearGradient></defs><rect x="0" y="130" width="360" height="76" fill="url(#${hz})"/>`);
      let gl = ""; for (let i = 0; i < 9; i++) gl += sc20spark(Math.round(14 + hashN("sc20n" + i) * 332), Math.round(214 + hashN("sc20m" + i) * (60 + BOT * 0.5)), 1.8 + (i % 3) * 0.6, i % 2 ? "#fff" : "#DCEBFF");
      s = sc20before(s, sc20PET, gl);
    }
    /* di notte la luna resta luminosa sopra il velo blu (prima diventava grigia) */
    if (night && k !== "snow") { const my = Math.round(36 - TOP * 0.4); s = s.replace('fill="#16204A" opacity=".25" pointer-events="none"/>', (m) => `${m}<g pointer-events="none"><circle cx="292" cy="${my}" r="38" fill="#F8F1D4" opacity=".07"/><circle cx="292" cy="${my}" r="24" fill="#F8F1D4" opacity=".1"/><circle cx="292" cy="${my}" r="15" fill="#F8F1D4"/><circle cx="287" cy="${my - 3}" r="3.4" fill="#E6DDBC" opacity=".7"/><circle cx="297" cy="${my + 5}" r="2.2" fill="#E6DDBC" opacity=".6"/></g>`); }
  } catch (e) { /* si tiene la scena di prima */ }
  return sc20dim(s);
};

const _gardenSceneSC20s = gardenScene;
gardenScene = function (o) {
  let s = _gardenSceneSC20s(o);
  try {
    const d = dims(), TOP = d.top, ph = o.ph, night = ph === "night";
    const hz = nid("sc20gh"); let add = `<defs><linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? "#2A3866" : "#F4FAF2"}" stop-opacity="0"/><stop offset="1" stop-color="${night ? "#2A3866" : "#F4FAF2"}" stop-opacity="${night ? 0.3 : 0.42}"/></linearGradient></defs><rect x="0" y="134" width="360" height="74" fill="url(#${hz})"/>`;
    if (!night) { const sy = Math.round(44 - TOP * 0.4); add += [[-150, -100], [-96, -58], [-44, -18]].map(([a, b]) => `<path class="sc20ray" d="M${292 - 6} ${sy + 8} L${292 + a} 214 L${292 + b} 214 L${292 + 6} ${sy + 12} Z" fill="${ph === "evening" ? "#FFD3A0" : "#FFF6D2"}" opacity=".13"/>`).join(""); }
    s = sc20before(s, '<rect x="30" y="104" width="15" height="106" rx="4" fill="#8E6440"/>', add);
    if (night) { const my = 30 - TOP * 0.4; s = s.replace('fill="#16204A" opacity=".3" pointer-events="none"/>', (m) => `${m}<g pointer-events="none"><circle cx="296" cy="${my}" r="34" fill="#F8F1D4" opacity=".08"/><circle cx="296" cy="${my}" r="16" fill="#F8F1D4"/><circle cx="303" cy="${my - 6}" r="14" fill="#1F2B4E"/></g>`); }
    s = s.replace(/<ellipse cx="74" cy="(\d+)" rx="46" ry="13" fill="(#7CC6E6|#CFE3F2)"\/><ellipse cx="66" cy="\d+" rx="26" ry="5" fill="#fff" opacity="\.35"\/>/, (m, cy, col) => sc20pond(+cy, ph, col === "#CFE3F2"));
    const se = o.season; const col = se === "autumn" ? ["#E0883A", "#D9542F", "#F2B33D"] : se === "spring" ? ["#FFC2D4", "#F7A9C0", "#FFE0EA"] : null;
    if (col && anim && !sc20lite()) { let p = ""; for (let i = 0; i < 5; i++) p += `<ellipse class="sc20pt" data-i="${i}" cx="${Math.round(20 + hashN("sc20p" + i) * 300)}" cy="${Math.round(60 + hashN("sc20q" + i) * 80)}" rx="2.6" ry="1.6" fill="${col[i % 3]}"/>`; s = sc20before(s, sc20PET, p); }
  } catch (e) { /* niente */ }
  return sc20dim(s);
};

const _terraceSceneSC20s = terraceScene;
terraceScene = function (o) {
  let s = _terraceSceneSC20s(o);
  try {
    const d = dims(), TOP = d.top;
    s = s.replace(/(r="34" fill="#F8F1D4" opacity="\.06"\/>)/, (m) => `${m}<g class="cloud2" opacity=".5">${cloudPuff(250, 64 - TOP * 0.4, 1.1, 0.12)}</g>`);
    const cols = ["#FFD25E", "#FFB36B", "#F9A3C0", "#9EE3C5"];
    const halos = [20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350].map((x, i) => `<circle class="sc20halo" cx="${x}" cy="${(168 + Math.sin((x / 180) * Math.PI) * 12).toFixed(1)}" r="9" fill="${cols[i % 4]}" opacity=".16"/>`).join("");
    const fl = nid("sc20tf");
    s = sc20before(s, '<path d="M0 168 Q90 186 180 170', `<defs><radialGradient id="${fl}" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#FFD98A" stop-opacity=".22"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient></defs>${halos}`);
    s = sc20before(s, sc20PET, `<rect x="0" y="234" width="360" height="70" fill="url(#${fl})" pointer-events="none"/>`);
  } catch (e) { /* niente */ }
  return sc20dim(s);
};

if (typeof festivalScene === "function") {
  const _festivalSceneSC20s = festivalScene;
  festivalScene = function (o) {
    let s = _festivalSceneSC20s(o);
    if (typeof seaKites === "function" && seaKites()) return sc20dim(s); /* 1.0.9: il Prato degli Aquiloni non ha il lago */
    try {
      const d = dims(), BOT = d.bot; const g1 = nid("sc20fg");
      const lake = `<defs><linearGradient id="${g1}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B0709A" stop-opacity=".5"/><stop offset="1" stop-color="#B0709A" stop-opacity="0"/></linearGradient></defs><rect x="0" y="174" width="360" height="36" fill="url(#${g1})"/><rect x="0" y="174" width="360" height="1.4" fill="#F2C2DA" opacity=".35"/>`
        + sc20column(80, 180, 262, 4, 34, "#F8F1D4", 0.5, "sc20fm")
        + sc20crest(0, 360, 190, 0.8, 32, "#C9C4FF", 0.8, 0.16, 9) + sc20crest(0, 360, 206, 1.2, 44, "#C9C4FF", 1, 0.18, 11) + sc20crest(0, 360, 228, 1.6, 58, "#C9C4FF", 1.2, 0.18, 12) + sc20crest(0, 360, 262, 2, 74, "#C9C4FF", 1.4, 0.18, 13) + (BOT > 40 ? sc20crest(0, 360, 300, 2.4, 90, "#C9C4FF", 1.6, 0.16, 14) : "")
        + `<ellipse cx="180" cy="252" rx="98" ry="9" fill="#0B0F2A" opacity=".32"/><rect class="sc20gl" x="115" y="254" width="10" height="1.6" rx=".8" fill="#F28A3C" opacity=".55"/><rect class="sc20gl" x="117" y="259" width="6" height="1.4" rx=".7" fill="#F28A3C" opacity=".4"/><rect class="sc20gl" x="235" y="254" width="10" height="1.6" rx=".8" fill="#F28A3C" opacity=".55"/><rect class="sc20gl" x="237" y="259" width="6" height="1.4" rx=".7" fill="#F28A3C" opacity=".4"/>`
        + sc20spark(40, 196, 2.2, "#FFE7B0") + sc20spark(300, 214, 2.6, "#FFE7B0") + sc20spark(330, 270, 2.2, "#FFE7B0");
      s = s.replace(/(<rect x="0" y="174" width="360" height="\d+" fill="url\(#[^)]+\)"\/>)/, (m) => m + (seaStars() ? lake.split("#F28A3C").join("#FFE7A0").split("#B0709A").join("#6C7BD0") : lake));
      s = s.replace(/<ellipse (cx="\d+" cy="\d+" rx="[\d.]+" ry="1\.6" fill="#FFD27A")/g, '<ellipse class="sc20lr" $1');
    } catch (e) { /* niente */ }
    return sc20dim(s);
  };
}

/* --- Animazioni d'ambiente (leggere; niente con la modalità calma; poche con "leggera") --- */
const _ambientSC20s = ambientExtra;
ambientExtra = function (root, q) {
  _ambientSC20s(root, q);
  if (!anim) return;
  try {
    const lite = sc20lite(); const R = (a, b) => a + Math.random() * (b - a);
    q(".sc20wv").forEach((w, i) => { if (lite && i % 3) return; const wl = +w.dataset.wl || 40; ambient.push(G.fromTo(w, { x: 0 }, { x: (i % 2 ? -1 : 1) * wl, duration: (+w.dataset.d || 8) * (lite ? 1.6 : 1), repeat: -1, ease: "none" })); });
    q(".sc20swash").forEach((w) => ambient.push(G.fromTo(w, { y: -2.5, opacity: 1 }, { y: 4, opacity: 0.75, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" })));
    q(".sc20swash2").forEach((w) => ambient.push(G.fromTo(w, { y: 1, opacity: 0.15 }, { y: -2, opacity: 0.45, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" })));
    q(".sc20boat").forEach((b) => { ambient.push(G.to(b, { rotation: 3, y: 1.2, transformOrigin: "50% 100%", duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" })); if (!lite) ambient.push(G.to(b, { x: -18, duration: 26, repeat: -1, yoyo: true, ease: "sine.inOut" })); });
    q(".sc20halo").forEach((h, i) => ambient.push(G.to(h, { attr: { r: 12 }, opacity: 0.26, duration: 1.4 + (i % 4) * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.1 })));
    q(".sc20fire").forEach((f) => { const o = +f.getAttribute("opacity") || 0.3; ambient.push(G.to(f, { opacity: Math.min(0.8, o * 1.35), attr: { rx: "+=6" }, duration: 0.22, repeat: -1, yoyo: true, ease: "sine.inOut" })); });
    if (lite) return;
    q(".sc20gl").forEach((g, i) => { const o = +g.getAttribute("opacity") || 0.5; ambient.push(G.fromTo(g, { opacity: o }, { opacity: o * 0.25, x: i % 2 ? 1.5 : -1.5, duration: R(0.5, 1.2), repeat: -1, yoyo: true, ease: "sine.inOut", delay: R(0, 1) })); });
    q(".sc20sp").forEach((p) => ambient.push(G.fromTo(p, { scale: 0, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, repeat: -1, yoyo: true, repeatDelay: R(1.4, 3.6), ease: "sine.inOut", delay: R(0, 2.5) })));
    q(".sc20lr").forEach((l, i) => ambient.push(G.to(l, { scaleX: 1.35, opacity: (+l.getAttribute("opacity") || 0.3) * 0.6, transformOrigin: "50% 50%", duration: R(0.8, 1.6), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.12 })));
    q(".sc20rp").forEach((r, i) => ambient.push(G.fromTo(r, { attr: { rx: 2, ry: 0.7 }, opacity: 0.8 }, { attr: { rx: 14, ry: 4 }, opacity: 0, duration: 2.2, repeat: -1, repeatDelay: 1.4, ease: "sine.out", delay: i * 1.7 })));
    q(".sc20ray").forEach((r, i) => ambient.push(G.to(r, { opacity: 0.04, duration: 3 + i, repeat: -1, yoyo: true, ease: "sine.inOut" })));
    q(".sc20gull").forEach((g, i) => { ambient.push(G.to(g, { x: i % 2 ? -60 : 70, y: -8, duration: 16 + i * 4, repeat: -1, yoyo: true, ease: "sine.inOut" })); const w = g.querySelector("path"); if (w) ambient.push(G.to(w, { scaleY: 0.4, transformOrigin: "50% 100%", duration: 0.5 + i * 0.1, repeat: -1, yoyo: true, ease: "sine.inOut" })); });
    q(".sc20smoke").forEach((c, i) => { const tw = G.fromTo(c, { y: 0, x: 0, opacity: 0.35, scale: 0.6, transformOrigin: "50% 50%" }, { y: -46, x: 8, opacity: 0, scale: 1.8, duration: 3, repeat: -1, ease: "sine.out" }); tw.progress(i / 3); ambient.push(tw); });
    q(".sc20pt").forEach((p, i) => { const tw = G.fromTo(p, { x: 0, y: 0, rotation: 0 }, { x: 70 + i * 10, y: 150, rotation: 300, transformOrigin: "50% 50%", duration: 9 + i * 1.5, repeat: -1, ease: "sine.inOut" }); tw.progress((i * 0.23) % 1); ambient.push(tw); });
    /* nella scheda della terrazza ogni tanto passa una stella cadente */
    if (!full && tab === "today" && sceneId === "terrace" && root.classList.contains("sc20sc")) { const loop = () => { const c = G.delayedCall(9 + Math.random() * 10, () => { shootingStar(); loop(); }); ambient.push(c); }; loop(); }
  } catch (e) { /* niente */ }
};

/* ======================= 4) La palla nell'acqua: galleggia, dondola, va alla deriva e torna a riva ======================= */
let sc20tap = null, sc20b = null;
window.addEventListener("pointerdown", (ev) => {
  if (!full || playMode !== "ball" || !ev.target.closest || !ev.target.closest("#room")) return;
  const p = sceneXY(ev.clientX, ev.clientY); if (p) sc20tap = { x: p.x, y: p.y, t: Date.now() };
}, true);
/* Le scene con l'acqua dove si può giocare a palla */
function sc20waterScene() {
  if (!full) return null;
  if (sceneId === "beach" && PLUS_SCENES.includes("beach")) return "beach";
  if (sceneId === "festival") return "festival";
  if (sceneId === "garden" && dims().bot >= 120 && season().id !== "winter") return "garden";
  return null;
}
function sc20pondPos() { const BOT = dims().bot; const py = Math.round(300 + Math.max(30, (BOT - 130) * 0.5)); return { cx: 74, cy: py - 2, rx: 46, ry: 13 }; }
const sc20onDock = (x) => x >= 96 && x <= 264;
/* Dove cade la palla: null se non è in acqua */
/* la palla in acqua resta sotto il fumetto, così si vede sempre */
function sc20minY() {
  const b = document.getElementById("bubble"); if (!b || !b.offsetParent) return 0;
  const r = b.getBoundingClientRect(); if (!r.height) return 0; const p = sceneXY(r.left + r.width / 2, r.bottom); return p ? p.y + 9 : 0;
}
function sc20landing(sc, x, y, tapped) {
  if (sc === "beach") { const top = sc20sandTop(x); if (tapped && y >= 146 && y <= top - 3) return { x: sc20clamp(x, 18, 342), y: sc20clamp(y, Math.min(top - 12, Math.max(152, sc20minY())), top - 7) }; return null; }
  if (sc === "garden") { const P = sc20pondPos(); if (tapped && ((x - P.cx) / (P.rx + 6)) ** 2 + ((y - P.cy) / (P.ry + 6)) ** 2 <= 1) return { x: P.cx + sc20clamp(x - P.cx, -32, 32), y: P.cy + sc20clamp(y - P.cy, -4, 5) }; return null; }
  if (sc === "festival") {
    const maxY = 300 + dims().bot - 40;
    if (tapped && y >= 184 && !(sc20onDock(x) && y >= 218 && y <= 266)) return { x: sc20clamp(x, 14, 346), y: sc20clamp(y, 186, Math.max(200, maxY)) };
    if (!sc20onDock(x)) return { x: sc20clamp(x, 14, 346), y: 244 };
    return null;
  }
  return null;
}
/* Fin dove la porta l'acqua (bordo) e dove si ferma sulla terra */
function sc20exit(sc, Lp) {
  if (sc === "beach") { const x = sc20clamp(Lp.x + (Lp.x < 180 ? 18 : -18), 24, 336); return { ex: x, ey: sc20sandTop(x) - 3, fx: sc20clamp(x + (x < 180 ? 10 : -10), 30, 330), fy: 244 }; }
  if (sc === "garden") { const P = sc20pondPos(); const x = P.cx + sc20clamp((Lp.x - P.cx) * 0.6 + 10, -26, 30); return { ex: x, ey: P.cy - P.ry * 0.55, fx: sc20clamp(x + 56, 110, 200), fy: 244 }; }
  const left = Lp.x < 180; return { ex: left ? 90 : 270, ey: sc20clamp(Lp.y, 236, 246), fx: left ? 112 : 248, fy: 244 };
}
const sc20petRange = () => (sceneId === "festival" && full ? [-66, 66] : [-100, 110]);
const sc20depth = (y) => sc20clamp(0.5 + (0.5 * (y - 140)) / 104, 0.5, 1.16);
function sc20bKill() { if (!sc20b) return; sc20b.tw.forEach((t) => { try { t.kill(); } catch (e) { /* niente */ } }); sc20b.timers.forEach(clearTimeout); sc20b = null; }
const _stopPlaySC20s = stopPlay;
stopPlay = function (...a) { sc20bKill(); return _stopPlaySC20s.apply(this, a); };

/* la palla (stessa di 97_v8) con un gruppo interno per la profondità e la linea dell'acqua */
function sc20ball() {
  const svg = document.querySelector("#room svg"); if (!svg) return null; const ns = "http://www.w3.org/2000/svg";
  let g = document.getElementById("ballG");
  if (!g) {
    g = document.createElementNS(ns, "g"); g.id = "ballG";
    g.innerHTML = '<ellipse class="bsh" cx="0" cy="11" rx="9" ry="2.6" fill="#000" opacity=".15"/><g class="bb"><circle r="9" fill="#E2654F"/><path d="M-8 -2 Q0 4 8 -2" stroke="#fff" stroke-width="2.4" fill="none"/><circle cx="-3" cy="-4" r="2.2" fill="#fff" opacity=".5"/></g>';
    const pw = petWrapEl(); svg.insertBefore(g, pw ? pw.nextSibling : null);
    const sx = sceneId === "festival" ? (petDX > 0 ? 112 : 248) : petDX + 180 > 180 ? 30 : 330; G.set(g, { x: sx, y: 244 });
  }
  if (!g.querySelector(".sc20s")) {
    const s = document.createElementNS(ns, "g"); s.setAttribute("class", "sc20s"); const w = document.createElementNS(ns, "g"); w.setAttribute("class", "sc20w");
    const sh = g.querySelector(".bsh"), bb = g.querySelector(".bb"); if (sh) s.appendChild(sh); if (bb) w.appendChild(bb); s.appendChild(w); g.appendChild(s);
  }
  return g;
}
function sc20place(g, x, y) { G.set(g, { x, y }); const s = g.querySelector(".sc20s"); if (s) s.setAttribute("transform", `scale(${sc20depth(y).toFixed(3)})`); }
function sc20layer(g, behind) { const svg = g.ownerSVGElement, pw = petWrapEl(); if (!svg || !pw) return; if (behind) { if (g.nextSibling !== pw) svg.insertBefore(g, pw); } else if (pw.nextSibling !== g) svg.insertBefore(g, pw.nextSibling); }
const SC20WCOL = { beach: ["#8BE3DA", "#1F6E9E"], garden: ["#8ED5EC", "#2B80B4"], festival: ["#7C7FC0", "#1E2450"] };
function sc20wet(g, sc, on) {
  const s = g.querySelector(".sc20s"), w = g.querySelector(".sc20w"), sh = g.querySelector(".bsh"); if (!s || !w) return;
  s.querySelectorAll(".sc20wd, .sc20col, .sc20defs").forEach((e) => e.remove()); w.removeAttribute("clip-path"); if (sh) sh.setAttribute("opacity", ".15");
  if (!on) return;
  const [shal, deep] = SC20WCOL[sc] || SC20WCOL.beach; const a = nid("sc20ba"), b = nid("sc20bb"); const ns = "http://www.w3.org/2000/svg";
  const mk = (cls, html) => { const e = document.createElementNS(ns, "g"); e.setAttribute("class", cls); e.innerHTML = html; return e; };
  s.insertBefore(mk("sc20defs", `<defs><clipPath id="${a}"><rect x="-30" y="-60" width="60" height="63.5"/></clipPath><clipPath id="${b}"><rect x="-30" y="3.5" width="60" height="30"/></clipPath></defs>`), s.firstChild);
  s.insertBefore(mk("sc20wd", `<ellipse cx="0" cy="7" rx="10" ry="2.4" fill="${deep}" opacity=".3"/><g clip-path="url(#${b})"><circle r="9" fill="#B9443A" opacity=".3"/></g><ellipse class="sc20rip" cx="0" cy="3.5" rx="10" ry="2.8" fill="none" stroke="#fff" stroke-width="1.2" opacity="0"/><ellipse class="sc20rip" cx="0" cy="3.5" rx="10" ry="2.8" fill="none" stroke="#fff" stroke-width="1" opacity="0"/>`), w);
  s.appendChild(mk("sc20col", `<ellipse cx="0" cy="3.6" rx="9.8" ry="2.3" fill="${shal}" opacity=".55"/><path d="M-9.8 3.5 Q0 6.4 9.8 3.5" stroke="#fff" stroke-width="1.2" fill="none" opacity=".85" stroke-linecap="round"/>`));
  w.setAttribute("clip-path", `url(#${a})`); if (sh) sh.setAttribute("opacity", "0");
}
function sc20splash(g) {
  const s = g.querySelector(".sc20s"); if (!s || !anim) return; const ns = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 7; i++) {
    const c = document.createElementNS(ns, "circle"); c.setAttribute("r", (1 + Math.random()).toFixed(1)); c.setAttribute("cy", "2"); c.setAttribute("fill", i % 2 ? "#fff" : "#CFF3F6"); s.appendChild(c);
    const dx = (i - 3) * 4 + (Math.random() - 0.5) * 3, up = 12 + Math.random() * 12;
    G.timeline({ onComplete: () => c.remove() }).to(c, { attr: { cx: dx * 0.6, cy: -up }, duration: 0.25, ease: "power2.out" }).to(c, { attr: { cx: dx, cy: 4 }, opacity: 0, duration: 0.3, ease: "power2.in" });
  }
  const r = document.createElementNS(ns, "ellipse"); r.setAttribute("cy", "3.5"); r.setAttribute("rx", "8"); r.setAttribute("ry", "2.4"); r.setAttribute("fill", "none"); r.setAttribute("stroke", "#fff"); r.setAttribute("stroke-width", "1.6"); s.insertBefore(r, s.querySelector(".sc20w"));
  G.to(r, { attr: { rx: 26, ry: 7 }, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => r.remove() });
}
/* volo ad arco da dove si trova a (x, y) */
function sc20arc(g, x, y, h, dur, done) {
  const B = sc20b; const x0 = G.getProperty(g, "x"), y0 = G.getProperty(g, "y"); const o = { p: 0 }; const bb = g.querySelector(".bb");
  if (bb) B.tw.push(G.to(bb, { rotation: `+=${(x - x0) * 2}`, duration: dur, ease: "power2.out", transformOrigin: "50% 50%" }));
  B.tw.push(G.to(o, { p: 1, duration: dur, ease: "none", onUpdate: () => { if (!g.isConnected) return; const p = o.p; sc20place(g, x0 + (x - x0) * (1 - (1 - p) * (1 - p)), y0 + (y - y0) * p - Math.sin(Math.PI * p) * h); }, onComplete: () => { if (g.isConnected) done(); else { playBusy = false; sc20bKill(); } } }));
}
/* il compagno corre alla palla e la rilancia sulla terra */
function sc20fetch(g, x) {
  const B = sc20b; const t = L(); const [lo, hi] = sc20petRange();
  const target = sc20clamp(x - 180 + (x > 180 + petDX ? -24 : 24), lo, hi);
  movePet(target, 0.45 + Math.abs(target - petDX) / 260, () => {
    if (sc20b !== B || !g.isConnected) { if (sc20b === B) { playBusy = false; sc20bKill(); } return; }
    const bb = g.querySelector(".bb"); const p = document.getElementById("petInner");
    if (p) G.timeline().to(p, { rotation: x > 180 + petDX ? 12 : -12, transformOrigin: "50% 100%", duration: 0.1 }).to(p, { rotation: 0, duration: 0.2 });
    SND.play("pop"); setExpr("felice", 1500);
    const back = sceneId === "festival" ? (x > 180 ? 112 + Math.random() * 40 : 208 + Math.random() * 40) : x > 180 ? 40 + Math.random() * 80 : 240 + Math.random() * 80;
    const d2 = 0.6 + Math.abs(back - x) / 380;
    B.tw.push(G.to(g, { x: back, duration: d2, ease: "power2.out" }));
    if (bb) { B.tw.push(G.to(bb, { rotation: `+=${(back - x) * 2}`, duration: d2 })); B.tw.push(G.timeline().to(bb, { y: -60, duration: d2 * 0.45, ease: "power2.out" }).to(bb, { y: 0, duration: d2 * 0.35, ease: "bounce.out" })); }
    B.timers.push(setTimeout(() => { if (sc20b === B) { playBusy = false; sc20b = null; } }, d2 * 1000));
  });
}
function sc20throwWater(sc, Lp) {
  const g = sc20ball(); if (!g) return false;
  sc20bKill(); sc20b = { tw: [], timers: [] }; const B = sc20b; playBusy = true;
  const t = L(), bb = g.querySelector(".bb"), lite = sc20lite(); const E = sc20exit(sc, Lp);
  sc20wet(g, sc, false); G.killTweensOf(bb); G.set(bb, { y: 0 });
  const x0 = G.getProperty(g, "x"); sc20place(g, x0, G.getProperty(g, "y"));
  if (Lp.y < 236) sc20layer(g, true);
  SND.play("pop");
  const dist = Math.hypot(Lp.x - x0, Lp.y - 244);
  sc20arc(g, Lp.x, Lp.y, 40 + dist * 0.18, 0.55 + dist / 480, () => {
    /* in acqua: splash, cerchi, dondola e va alla deriva verso riva */
    sc20wet(g, sc, true); sc20splash(g); SND.play("pop"); setTimeout(() => SND.note(659), 90); SND.haptic(10);
    setExpr("wow", 1800); say(sc20st().float, 4200);
    /* il compagno aspetta a riva, di fianco (così la palla si vede sempre) */
    const [lo, hi] = sc20petRange(); const pt = sc20clamp(E.fx - 180 + (E.fx > 180 ? -66 : 66), lo, hi); movePet(pt, 0.6 + Math.abs(pt - petDX) / 220);
    if (bb) { B.tw.push(G.to(bb, { y: 1.3, duration: 1.05, repeat: -1, yoyo: true, ease: "sine.inOut" })); B.tw.push(G.to(bb, { rotation: "+=9", transformOrigin: "50% 50%", duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" })); }
    g.querySelectorAll(".sc20rip").forEach((r, i) => { if (lite && i) return; B.tw.push(G.fromTo(r, { attr: { rx: 9.5, ry: 2.6 }, opacity: 0.75 }, { attr: { rx: 24, ry: 6.4 }, opacity: 0, duration: 1.8, repeat: -1, ease: "sine.out", delay: 0.3 + i * 0.9 })); });
    const fd = sc20clamp(3.2 + Math.hypot(E.ex - Lp.x, E.ey - Lp.y) / 40, 3.6, 6.5); const o = { p: 0 }; const t0 = performance.now();
    B.tw.push(G.to(o, { p: 1, duration: fd, ease: "sine.inOut", onUpdate: () => {
      if (!g.isConnected) return; const k = (performance.now() - t0) / 1000;
      sc20place(g, Lp.x + (E.ex - Lp.x) * o.p + Math.sin(k * 1.6) * 2.4 * (1 - o.p), Lp.y + (E.ey - Lp.y) * o.p + Math.sin(k * 2.3) * 0.6);
    }, onComplete: () => {
      if (!g.isConnected) { playBusy = false; sc20bKill(); return; }
      /* l'onda la spinge a riva */
      B.tw.forEach((x) => { if (x !== B.tw[B.tw.length - 1]) { try { x.kill(); } catch (e) { /* niente */ } } });
      G.set(bb, { y: 0 }); sc20wet(g, sc, false); sc20layer(g, false);
      say(sc20st().back, 2600);
      sc20arc(g, E.fx, E.fy, 18 + Math.abs(E.fy - E.ey) * 0.25, 0.65, () => { if (bb) B.tw.push(G.timeline().to(bb, { y: -8, duration: 0.12, ease: "power2.out" }).to(bb, { y: 0, duration: 0.2, ease: "bounce.out" })); sc20fetch(g, E.fx); });
    } }));
  });
  return true;
}
/* sul pontile del lago: lancio sulla terra, il compagno la riporta senza farla cadere in acqua */
function sc20throwDock(toX) {
  const g = sc20ball(); if (!g) return false;
  sc20bKill(); sc20b = { tw: [], timers: [] }; const B = sc20b; playBusy = true;
  const bb = g.querySelector(".bb"); sc20wet(g, "festival", false); sc20layer(g, false); G.killTweensOf(bb); G.set(bb, { y: 0 }); SND.play("pop");
  const x0 = G.getProperty(g, "x"); const dur = 0.5 + Math.abs(toX - x0) / 400;
  sc20arc(g, toX, 244, 46, dur, () => { if (bb) B.tw.push(G.timeline().to(bb, { y: -14, duration: dur * 0.17, ease: "power2.out" }).to(bb, { y: 0, duration: dur * 0.18, ease: "power2.in" })); sc20fetch(g, toX); });
  return true;
}
const _throwBallSC20s = throwBall;
throwBall = function (toX) {
  try {
    const sc = sc20waterScene();
    if (sc && !playBusy && document.querySelector("#room svg")) {
      const tap = sc20tap && Date.now() - sc20tap.t < 600 ? sc20tap : null; sc20tap = null;
      const Lp = sc20landing(sc, tap ? tap.x : toX, tap ? tap.y : 244, !!tap);
      if (Lp) {
        if (!anim) { const E = sc20exit(sc, Lp); return _throwBallSC20s(E.fx); }
        if (sc20throwWater(sc, Lp)) return;
      } else if (sc === "festival") {
        const x = sc20clamp(toX, 104, 256); if (!anim) return _throwBallSC20s(x);
        if (sc20throwDock(x)) return;
      }
    }
  } catch (e) { playBusy = false; sc20bKill(); }
  return _throwBallSC20s(toX);
};
/* suggerimento giusto per le scene con l'acqua */
const _startPlaySC20s = startPlay;
startPlay = function (k, ...a) {
  const r = _startPlaySC20s.call(this, k, ...a);
  try { const sc = sc20waterScene(); if (k === "ball" && playMode === "ball" && sc) say(sc20st().hint[sc], 5200); } catch (e) { /* niente */ }
  return r;
};
