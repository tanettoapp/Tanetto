/* ===== 1.0.9 (fase 3): immagini 3D, inizio piu' corto, Profilo a pagine, carattere dei compagni =====
   Decisioni del proprietario:
   - il 3D solo nei MOMENTI GRANDI (benvenuto, eta', scelta del compagno, pagina Plus, cartoline, festeggiamenti: livello
     nuovo, tutto fatto, regalo, partenza e ritorno dal viaggio, diario e album vuoti, Introvabili, stagioni); le icone
     piccole restano vettoriali; il compagno nella stanza resta quello interattivo (vettoriale: cappelli, espressioni);
   - i momenti di Germo usano le sue pose 3D (img/m/*.webp); gli altri compagni il loro ritratto 3D (img/pet/*.webp);
   - immagini in file WebP a parte (img/), caricate solo quando servono: mai nel primo disegno della Home.
   Aggancio: nessun nuovo "render =": le immagini si mettono dopo il disegno (osservatori su #app, #layer, body). */
const IMG3D = (p) => `img/${p}?v=${IMG3D_V}`;
const PETS3D = ["germo", "ondi", "lumi", "miko", "rufi", "pingo", "dori"];
/* area della cura di se' di ogni compagno (characters.md): Germo i tuoi obiettivi, gli altri una categoria dell'app */
const PET_AREA = { germo: "custom", ondi: "mind", lumi: "sleep", miko: "home", rufi: "work", pingo: "body", dori: "people" };
const GERMO_AREA = { it: "i tuoi obiettivi", en: "your own goals", de: "deine eigenen Ziele", es: "tus propios objetivos", fr: "tes propres objectifs", pt: "suas próprias metas", ja: "自分で決めた目標", ko: "내가 정한 목표", zh: "你自己的目标", zht: "你自己的目標", ru: "твои собственные цели", pl: "twoje własne cele", nl: "je eigen doelen", tr: "kendi hedeflerin" };
const petAreaName = (p) => (p === "germo" ? GERMO_AREA[S.lang] || GERMO_AREA.en : (L().cats || {})[PET_AREA[p]] || "");
const petCatch = (p) => (v23().catch || {})[p] || "";

/* un'immagine 3D come <img> (alt vuoto: e' decorativa, il testo vicino dice gia' tutto) */
function img3d(path, cls, alt, w, h, eager) {
  return `<img class="i3d ${cls || ""}" src="${IMG3D(path)}" alt="${esc(alt || "")}" width="${w || 512}" height="${h || w || 512}" ${eager ? "" : 'loading="lazy"'} decoding="async" draggable="false">`;
}
/* il compagno in un momento grande */
function moment3d(pose, cls, pet) {
  const p = pet || S.pet || "germo";
  if (p === "germo") return img3d(`m/${pose}.webp`, "mom " + (cls || ""), "", 512, 512, true);
  if (PETS3D.includes(p)) return img3d(`pet/${p}.webp`, "mom pet3d " + (cls || ""), "", 384, 384, true);
  return "";
}
/* critica fase 3: le due scene di gruppo hanno un testo alternativo (i nomi dei compagni, nella lingua dell'app) */
const petNames = (ks) => { const n = ks.map((k) => (L().pets[k] || [k])[0]); try { return new Intl.ListFormat(L().locale || S.lang, { type: "conjunction" }).format(n); } catch (e) { return n.join(", "); } };
const LOGO3D = () => `<img class="logo3d" src="${BOOT_IMG}" alt="" width="28" height="28">`;
const _topBarP3 = topBar;
topBar = function () { const h = _topBarP3(); return S.pet ? h : h.replace(LOGO, LOGO3D()); };

/* ---------------- 1) CARTOLINE 3D ----------------
   Una scena 3D per meta; le cartoline della stessa meta sono inquadrature diverse (intera, sinistra, destra, alta),
   la rara ha anche la cornice d'oro che c'era gia'. Stessa forma 160x100 di prima. */
const PC_CROP = [[0.5, 0.5, 1], [0, 0.55, 1.32], [1, 0.45, 1.32], [0.5, 0.15, 1.16]];
const r1 = (x) => Math.round(x * 10) / 10;
function pc3d(key, i, label) {
  const e = IMG3D_PC[key]; if (!e) return null;
  const [ax, ay, z] = PC_CROP[Math.abs(i | 0) % 4]; const W = 160 * z, H = (W * e[2]) / e[1];
  return `<svg viewBox="0 0 160 100" role="img" aria-label="${esc(label || "")}" class="pc3"><image href="${IMG3D("pc/" + e[0] + ".webp")}" x="${r1(-(W - 160) * ax)}" y="${r1(-(H - 100) * ay)}" width="${r1(W)}" height="${r1(H)}" preserveAspectRatio="xMidYMid slice"/></svg>`;
}
const _postcardP3 = postcard;
postcard = function (dest, i, label) { return pc3d("f:" + dest, i, label) || _postcardP3(dest, i, label); };
const _realArtP3 = realArt;
realArt = function (art, label) { return pc3d("r:" + art, 0, label) || pc3d("w:" + art, 0, label) || _realArtP3(art, label); };
const _worldArtP3 = worldArt;
worldArt = function (id, i, label) { return pc3d("v:" + id, i, label) || _worldArtP3(id, i, label); };

/* condivisione: le immagini di cartolina e PNG fatte da un SVG-immagine non possono caricare file esterni:
   prima si leggono i WebP come data: (una volta, in memoria), poi stripSvg li mette al posto dei link */
const PC_DATA = {};
async function pcPrefetch(str) {
  const urls = [...String(str || "").matchAll(/href="(img\/[^"]+)"/g)].map((m) => m[1]).filter((u) => !PC_DATA[u]);
  await Promise.all(urls.map(async (u) => {
    try { const b = await (await fetch(u)).blob(); PC_DATA[u] = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); }); } catch (e) { /* resta il link: si vede la cornice senza foto */ }
  }));
}
const pcInline = (s) => String(s).replace(/href="(img\/[^"]+)"/g, (m, u) => (PC_DATA[u] ? `href="${PC_DATA[u]}"` : m));
const _stripSvgP3 = stripSvg;
stripSvg = function (str) { return _stripSvgP3(pcInline(str)); };
const _makeCardP3 = makeCard;
makeCard = async function (o) { try { await pcPrefetch(o && o.art); } catch (e) { /* niente */ } return _makeCardP3(o); };
const _gr20MakeP3 = gr20Make;
gr20Make = async function (kind, ck) { try { await pcPrefetch(gr20Spec(kind, ck).art); } catch (e) { /* niente */ } return _gr20MakeP3(kind, ck); };

/* ---------------- 2) STAGIONI: striscione 3D (stelle, aquiloni) ---------------- */
function ban3d(name, big) {
  const h = big ? 120 : 90, g = nid("b3");
  const scrim = big ? `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#1B1430" stop-opacity="0"/><stop offset="1" stop-color="#1B1430" stop-opacity=".55"/></linearGradient></defs>` : "";
  /* critica fase 3: nella testata grande il titolo della stagione sta in basso a sinistra, proprio dove le scene hanno
     Germo e i suoi amici (il titolo copriva la faccia): li' la scena si mostra specchiata, i compagni finiscono a destra */
  const img = `<image href="${IMG3D("ban/" + name + ".webp")}" x="0" y="${-(160 - h) / 2}" width="320" height="160" preserveAspectRatio="xMidYMid slice"/>`;
  return `<svg viewBox="0 0 320 ${h}" aria-hidden="true" class="ban3">${scrim}${big ? `<g transform="translate(320 0) scale(-1 1)">${img}</g>` : img}${big ? `<rect width="320" height="${h}" fill="url(#${g})"/>` : ""}</svg>`;
}
const _starsBannerP3 = starsBanner;
starsBanner = function (big) { try { return ban3d("stars", big); } catch (e) { return _starsBannerP3(big); } };
const _kitesBannerP3 = kitesBanner;
kitesBanner = function (big) { try { return ban3d("kites", big); } catch (e) { return _kitesBannerP3(big); } };

/* ---------------- 3) RITRATTI 3D nella scelta del compagno ---------------- */
function petChoice3d(p, sel, attr) {
  const t = L(); const plus = typeof isPlusPet === "function" && isPlusPet(p); const area = petAreaName(p);
  return `<button class="choice c3d ${plus ? "pchoice" : ""}" role="radio" aria-checked="${sel === p}" ${attr}="${p}"><span class="halo h3d" style="background:radial-gradient(circle at 50% 60%, ${(typeof HALO !== "undefined" && HALO[p]) || "#EFE6D6"} 0 62%, transparent 63%)">${img3d(`pet/${p}.webp`, "pport", "", 384, 384, true)}</span>${plus ? `<span class="ppcrown" aria-hidden="true">${icon("p_crown")}</span>` : ""}<span class="nm">${t.pets[p][0]}</span><span class="ds">${t.pets[p][1]}</span>${area ? `<span class="lk">${esc(v23().look(area))}</span>` : ""}</button>`;
}
petChoice = petChoice3d;

/* ---------------- 4) INIZIO: 3 passi (benvenuto + nome facoltativo, compagno + nome, obiettivi) ---------------- */
const p3steps = (n) => `<div class="steps" aria-hidden="true">${[0, 1, 2].map((i) => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div>`;
const _viewOnboardP3 = viewOnboard;
viewOnboard = function () {
  if (!S.pet && S.onboard === 1) S.onboard = 0; /* il vecchio passo "nome del compagno" ora e' nella scelta */
  const h = _viewOnboardP3(); if (S.pet) return h;
  const t = L(), w = v23();
  if (typeof nameStepNow === "function" && nameStepNow()) {
    const cut = h.indexOf('<div class="stack'); const top = cut > 0 ? h.slice(0, cut) : "";
    const n = v18n(); const val = nameClean(S.uname || v18gName || "");
    return `${top}<div class="stack namestep w3"><div class="onbtop">${p3steps(0)}</div>
    <div class="w3hero">${img3d("welcome.webp", "w3img", petNames(["germo", "ondi", "lumi"]), 720, 720, true)}</div>
    <h1>${esc(w.welT)}</h1><p class="muted w3p">${esc(w.welP)}</p>
    <div class="field"><label for="userName">${esc(n.label)} <span class="opt">(${esc(w.opt)})</span></label><input id="userName" class="nameinp" maxlength="${NAME_MAX}" autocomplete="given-name" autocapitalize="words" spellcheck="false" enterkeyhint="next" placeholder="${esc(n.ph)}" value="${esc(val)}"></div>
    <p class="small nameerr" id="nameErr" role="alert" aria-live="polite"></p>
    <button class="btn block" id="nameNext">${esc(n.next)}</button>
    <div class="row" style="justify-content:center"><button class="link" id="iosHave" type="button">${esc(L().v13.ios.have)}</button></div></div>`;
  }
  if (S.onboard === 0) {
    const tpl = document.createElement("template"); tpl.innerHTML = h;
    tpl.content.querySelectorAll(".choose:not(.four) [data-pet]").forEach((b) => { const x = document.createElement("template"); x.innerHTML = petChoice3d(b.dataset.pet, draftPet, "data-pet"); b.replaceWith(x.content); });
    const st = tpl.content.querySelector(".steps"); if (st) st.outerHTML = p3steps(1);
    const go = tpl.content.getElementById("toName");
    if (go && !tpl.content.getElementById("petName")) {
      const f = document.createElement("div"); f.className = "field onbname";
      f.innerHTML = `<label for="petName">${esc(t.nameL)}</label><input id="petName" maxlength="16" autocomplete="off" value="${esc(draftName || t.pets[draftPet][0])}">`;
      const free = tpl.content.querySelector(".choose:not(.four)"); /* subito sotto i 3 compagni: il pulsante "Avanti" fisso in basso non lo copre */
      if (free && free.parentNode) free.parentNode.insertBefore(f, free.nextSibling); else go.parentNode.insertBefore(f, go);
    }
    return tpl.innerHTML;
  }
  if (S.onboard === 2) return h.replace(/<div class="steps" aria-hidden="true">[\s\S]*?<\/div>/, p3steps(2));
  return h;
};
/* il nome scritto resta anche cambiando compagno (se non e' il nome proposto) */
document.addEventListener("input", (ev) => {
  const el = ev.target; if (!el || el.id !== "petName" || S.pet) return;
  const v = el.value.trim(); draftName = v && v !== L().pets[draftPet][0] ? v : "";
}, true);
window.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || S.pet) return;
  /* tornati al benvenuto con "indietro": chi cancella il nome scritto prima non deve ritrovarselo */
  if (b.id === "nameNext") { const i = document.getElementById("userName"); if (i && !nameClean(i.value).trim() && S.uname) { S.uname = ""; save(); } }
  if (b.id === "toName") {
    ev.stopImmediatePropagation(); const t = L(); const i = document.getElementById("petName"); const v = (i ? i.value : "").trim();
    draftName = v || t.pets[draftPet][0]; S.onboard = 2; SND.play("click"); render(); window.scrollTo(0, 0); return;
  }
  if (b.id === "backName") { ev.stopImmediatePropagation(); S.onboard = 0; render(); window.scrollTo(0, 0); return; }
  /* scelta del compagno all'inizio: il nome scritto a mano resta (prima si perdeva cambiando compagno); si sente il suo motivo */
  if (b.dataset && b.dataset.pet && !document.querySelector("#layer .overlay")) {
    ev.stopImmediatePropagation(); const t = L(); const typed = draftName && draftName.trim() !== t.pets[draftPet][0] ? draftName : "";
    draftPet = b.dataset.pet; draftName = typed;
    try { if (!SND.petMotif(draftPet)) SND.play("pop"); } catch (e) { /* niente */ }
    render(); return;
  }
}, true);

/* critica fase 3: "indietro" del telefono durante l'inizio torna al passo prima (prima chiedeva subito "Vuoi uscire?"):
   obiettivi -> compagno -> benvenuto (con il nome gia' scritto); solo dal primo passo si chiede di uscire */
const _backPressP3o = backPress;
backPress = function () {
  try {
    if (!S.pet && !layer.innerHTML.trim() && !document.getElementById("exitAsk") && !document.querySelector(".tutwrap")) {
      if (S.onboard === 2) { S.onboard = 0; render(); window.scrollTo(0, 0); return "onboard"; }
      if (S.onboard === 0 && S.nameAsked && !document.getElementById("userName") && !(typeof gateNeeded === "function" && gateNeeded())) {
        const i = document.getElementById("petName"); if (i) { const v = i.value.trim(); draftName = v && v !== L().pets[draftPet][0] ? v : ""; }
        S.nameAsked = false; save(); render(); window.scrollTo(0, 0); return "onboard";
      }
    }
  } catch (e) { /* niente */ }
  return _backPressP3o();
};

/* ---------------- 5) DUE REGALI IN UNA SCHEDA (benvenuto + cappellino della prima stagione) ---------------- */
const launchOk = () => typeof LAUNCH_END !== "undefined" && S.pet && !S.owned.includes("h_launch") && dkey() <= LAUNCH_END && !window.__TEST_NOLAUNCH;
function giftMerge(box) {
  if (box.dataset.p3gift || !box.querySelector("#wgOk") || !box.querySelector("#wgT") || box.classList.contains("alldone") || !launchOk()) return; /* solo il regalo di benvenuto (50 Tanì) */
  box.dataset.p3gift = "1"; const w = v23(), lt = L().launch || {}; const n = S.petName || "";
  S.owned.push("h_launch"); S.launchGift = dkey(); save(); try { trackOnce("regalo-lancio"); } catch (e) { /* niente */ }
  const h2 = box.querySelector("h2"); if (h2) h2.textContent = w.gift2T;
  const p = box.querySelector("p:not(.svgift)"); if (p) p.textContent = w.gift2P(n);
  const sv = box.querySelector(".svgift"); if (sv) sv.insertAdjacentHTML("beforeend", `<span class="g2hat">${esc(lt.item || "")}</span>`);
  const ok = box.querySelector("#wgOk"); if (ok && lt.b) ok.insertAdjacentHTML("afterend", `<button class="link" id="launchWear" type="button">${esc(lt.b)}</button>`);
}
/* il regalo del lancio da solo (chi aveva gia' il regalo di benvenuto): niente piu' "solo entro il ..." */
Object.keys(V23).forEach((k) => { const l = T[k] && T[k].launch; if (l && typeof l.p === "function") { const f = V23[k].launchP; l.p = (n) => f(n); } });
/* chi tocca "Indossalo" nella scheda dei due regali chiude anche il benvenuto come "Grazie" */

/* ---------------- 6) MOMENTI GRANDI nelle finestre ---------------- */
const P3_LAYER = [
  [".agebox .agepet", "wave"], [".acnudge .acnpet", "wave"], [".alldone .fdpet", "celebrate"], [".wgbox .fdpet", "gift"],
  [".levelup .box > div[style*='width:150px']", "levelup"]
];
function decorLayer() {
  const box = layer.firstElementChild; if (!box) return;
  for (const [sel, pose] of P3_LAYER) {
    const el = layer.querySelector(sel); if (!el || el.dataset.m3) continue;
    const pet = el.closest(".agebox") && !S.pet ? "germo" : null; const im = moment3d(pose, "m3big", pet); if (!im) continue;
    el.dataset.m3 = pose; el.classList.add("m3host"); el.innerHTML = im; break;
  }
  const wg = layer.querySelector(".wgbox"); if (wg) giftMerge(wg);
  const ph = layer.querySelector(".plusbox .plushead .plpet");
  if (ph && !ph.dataset.m3) { ph.dataset.m3 = "plus"; ph.className = "plpet plhero"; ph.innerHTML = img3d("plus_hero.webp", "plimg", petNames(["rufi", "miko", "pingo", "dori"]), 900, 600, true); }
  const pp = layer.querySelector(".ppbox .ppbig");
  if (pp && !pp.dataset.m3) {
    const b = layer.querySelector(".ppbox [data-pickpet], .ppbox [data-wantpet]"); const p = b ? b.dataset.pickpet || b.dataset.wantpet : S.pet;
    if (PETS3D.includes(p)) { pp.dataset.m3 = p; pp.classList.add("pp3"); pp.innerHTML = img3d(`pet/${p}.webp`, "ppimg", "", 384, 384, true); /* fix 1.0.9: il nome lo dice gia' il titolo (prima "Pingo" due volte) */ const tx = layer.querySelector(".ppbox > p"); const area = petAreaName(p); if (tx && area && !layer.querySelector(".ppbox .lk")) tx.insertAdjacentHTML("afterend", `<p class="small lk">${esc(v23().look(area))}</p><p class="ppcatch">“${esc(petCatch(p))}”</p>`); try { SND.petMotif(p); } catch (e) { /* niente */ } }
  }
  const xa = layer.querySelector(".xmann .xmannart"); if (xa && !xa.dataset.m3) { xa.dataset.m3 = "xmas"; xa.classList.add("xm3"); xa.innerHTML = img3d("ban/xmas.webp", "xmimg", "", 960, 480, true); }
  const al = layer.querySelector(".albox");
  if (al && !al.querySelector(".alempty") && !(S.cards || []).length) {
    const chips = al.querySelector(".apchips"); const d = document.createElement("div"); d.className = "alempty";
    d.innerHTML = `${moment3d("postcard", "m3mid")}<p>${esc(v23().albEmpty(S.petName || ""))}</p>`; if (chips) al.insertBefore(d, chips); else al.appendChild(d);
  }
  if (layer.querySelector(".chatbox") && !layer.querySelector(".chatbox").dataset.m3) chatPersona();
}
/* trofei: la festa e' aggiunta a body */
function decorBody() {
  const tp = document.getElementById("trParty"); if (!tp || tp.dataset.m3) return; tp.dataset.m3 = "1";
  /* critica fase 3: il compagno 3D prende il posto di quello disegnato (prima c'erano due Germo, e quello 3D copriva il nome del trofeo) */
  const pet = tp.querySelector("#trPet"); const im = moment3d("love", "m3tr"); if (pet && im) { pet.classList.add("trp3"); pet.setAttribute("aria-hidden", "true"); pet.innerHTML = im; }
}

/* ---------------- 7) MOMENTI GRANDI nelle schermate ---------------- */
function decorApp() {
  const aw = app.querySelector(".tr20away"); if (aw && !aw.querySelector(".m3away")) aw.insertAdjacentHTML("afterbegin", `<div class="m3away" aria-hidden="true">${moment3d("depart", "m3sm")}</div>`);
  const sto = app.querySelector(".story .pcbig"); if (sto && !sto.parentNode.querySelector(".m3ret")) { sto.parentNode.classList.add("st3"); sto.insertAdjacentHTML("afterend", `<div class="m3ret" aria-hidden="true">${moment3d("return", "m3sm")}</div>`); }
  if (tab === "diary" && !(S.diary || []).length) { const f = app.querySelector("#diaryForm"); if (f && !f.querySelector(".m3read")) f.insertAdjacentHTML("afterbegin", `<div class="m3read" aria-hidden="true">${moment3d("reading", "m3sm")}</div>`); }
  app.querySelectorAll('.xvrow .item[data-shop^="x_"] .art:not([data-m3])').forEach((a) => {
    const id = a.closest(".item").dataset.shop; const f = { x_crown: "crown", x_cloak: "cape", x_tree: "tree", x_fountain: "fountain", x_galaxy: "galaxy", x_aura: "aura" }[id];
    if (f) { a.dataset.m3 = "1"; a.classList.add("xv3"); a.innerHTML = img3d(`xv/${f}.webp`, "xvimg", "", 384, 384); }
  });
}
try {
  new MutationObserver(() => { try { decorLayer(); } catch (e) { /* niente */ } }).observe(layer, { childList: true });
  /* render() aggiorna la stessa pagina "a pezzi" (viewPut): serve guardare anche dentro (subtree). L'osservatore riunisce
     tutte le modifiche di un disegno in una chiamata sola, prima che lo schermo si aggiorni (niente sfarfallio) */
  new MutationObserver(() => { try { decorApp(); } catch (e) { /* niente */ } }).observe(app, { childList: true, subtree: true });
  new MutationObserver(() => { try { decorBody(); } catch (e) { /* niente */ } }).observe(document.body, { childList: true });
} catch (e) { /* niente */ }

/* ---------------- 8) PERSONALITA' dei compagni ----------------
   Frase tipica, area di cui si prende cura, motivo sonoro e piccolo movimento di gioia. Mai rimproveri, mai fretta. */
function chatPersona() {
  const box = layer.querySelector(".chatbox"); if (!box) return; box.dataset.m3 = "1";
  const c = petCatch(S.pet); if (!c) return;
  if (chatLog.length === 1 && !chatLog[0].me && !chatLog[0].p3) { chatLog.push({ me: false, text: c, p3: 1 }); const lg = document.getElementById("chLog"); if (lg) { lg.innerHTML = chatBubbles(); lg.scrollTop = lg.scrollHeight; } }
  try { SND.petMotif(S.pet); } catch (e) { /* niente */ }
}
/* nella nuvoletta, una volta ogni tanto (finestre di 10 minuti, 1 su 4), la frase tipica al posto del saluto */
const _defaultSayP3 = defaultSay;
defaultSay = function () {
  const s = _defaultSayP3();
  try {
    if (!S.pet || S.away || S.lightsOff || !s || (S.tut || 0) < 99) return s;
    const tg = todayGoals(); if (tg.length && tg.every((g) => S.done.includes(g))) return s;
    /* solo al posto del saluto generico: mai al posto di un consiglio (acqua, pausa, sonno), della spiegazione di
       "Sposta oggetti", di una visita, delle frasi di Natale o di "sono pronto a partire" */
    const gen = (L().talk || {})[typeof phase === "function" ? phase() : ""]; if (!Array.isArray(gen) || !gen.includes(s)) return s;
    const slot = Math.floor(Date.now() / 600000); if ((slot * 7 + PETS3D.indexOf(S.pet)) % 4 !== 0) return s;
    return petCatch(S.pet) || s;
  } catch (e) { return s; }
};
/* un obiettivo della "sua" area: il compagno lo nota con la sua frase */
const _completeGoalP3 = completeGoal;
completeGoal = function (g, rect) {
  const had = S.done.includes(g); _completeGoalP3(g, rect);
  try {
    if (had || !S.done.includes(g) || !S.pet) return;
    const area = PET_AREA[S.pet]; const cat = String(g).startsWith("c:") ? "custom" : GOAL_CAT[g];
    const tg = todayGoals(); const all = tg.every((x) => S.done.includes(x));
    if (area && cat === area && !all) setTimeout(() => { if (!layer.innerHTML.trim() && tab === "today") say(petCatch(S.pet), 2800); }, 1400);
  } catch (e) { /* niente */ }
};
/* il piccolo salto di gioia: ognuno a modo suo (il grande salto e i numeri restano quelli di prima) */
const _jumpP3 = jump;
jump = function (big) {
  const p = document.getElementById("petInner");
  if (big || !p || !anim || (typeof trickOn !== "undefined" && trickOn) || Math.random() < 0.4) return _jumpP3(big);
  const k = S.pet; const o = { transformOrigin: "50% 100%" };
  if (k === "ondi") return G.timeline().to(p, { rotation: -7, duration: 0.22, ease: "sine.inOut", ...o }).to(p, { rotation: 6, duration: 0.3, ease: "sine.inOut" }).to(p, { rotation: 0, duration: 0.5, ease: "elastic.out(1.1,0.4)" });
  if (k === "lumi") return G.timeline().to(p, { y: -26, duration: 0.6, ease: "sine.out" }).to(p, { y: 0, duration: 0.8, ease: "sine.inOut" });
  if (k === "miko") return G.timeline().to(p, { scaleY: 0.92, scaleX: 1.06, duration: 0.14, ...o }).to(p, { scaleY: 1, scaleX: 1, duration: 0.14 }).to(p, { scaleY: 0.94, scaleX: 1.05, duration: 0.14 }).to(p, { scaleY: 1, scaleX: 1, duration: 0.4, ease: "elastic.out(1.1,0.4)" });
  if (k === "rufi") return G.timeline().to(p, { y: -22, rotation: 8, duration: 0.2, ease: "power2.out", ...o }).to(p, { y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.6)" });
  if (k === "pingo") return G.timeline().to(p, { x: -6, rotation: -4, duration: 0.12, ...o }).to(p, { x: 6, rotation: 4, duration: 0.12 }).to(p, { x: -6, rotation: -4, duration: 0.12 }).to(p, { x: 0, rotation: 0, duration: 0.3, ease: "back.out(1.6)" });
  if (k === "dori") return G.timeline().to(p, { scaleX: 1.08, scaleY: 0.94, duration: 0.15, ...o }).to(p, { scaleX: 0.97, scaleY: 1.04, duration: 0.15 }).to(p, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1.1,0.4)" });
  return _jumpP3(big);
};
/* cambiando compagno si sente il suo motivo */
const _switchPetP3 = switchPet;
switchPet = function (p) { const old = S.pet; _switchPetP3(p); if (S.pet !== old) setTimeout(() => { try { SND.petMotif(S.pet); } catch (e) { /* niente */ } }, 500); };

/* ---------------- 9) VIDEO: "raddoppia" solo se e' vero ----------------
   fix 1.0.9: il pulsante dice che e' una PUBBLICITA' (Families: riconoscibile anche da un bambino). "Raddoppia il regalo"
   solo per il primo video del giorno e solo se il regalo di oggi e' gia' stato aperto; altrimenti (secondo video in poi,
   oppure regalo non ancora aperto) "un regalo in piu'": stessi Tanì, parole vere. */
const adsUsedToday = () => { try { return ADS_DAY_MAX - adsLeftToday(); } catch (e) { return 0; } };
const adGiftOpen = () => S.giftDay === S.day;
Object.keys(V19AD).forEach((k) => {
  const o = V19AD[k], v = V23[k] || V23.en; if (!o || o.p3) return; const g0 = o.gift, t0 = o.thanks; o.p3 = 1;
  o.gift = (n) => (adsUsedToday() === 0 && adGiftOpen() ? g0(n) : v.adMore(n));
  o.thanks = (n) => (adsUsedToday() === 1 && adGiftOpen() ? t0(n) : v.adThanksMore(n));
});
