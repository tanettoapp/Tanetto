/* ===== 1.0.7 — video con premio (AdMob), solo su scelta =====
   1.0.9 (fase 2, decisione finale del proprietario dell'11/11/2026): OGNI video raddoppia il regalo di oggi.
   1) Ogni video, in ogni posto, da' "+il regalo di oggi" = econGift alla serie di oggi (6-18 Tanì, 98e_v20_econ.js).
   2) Al massimo AD_DOUBLE_MAX video al giorno, con UN SOLO contatore per tutti i posti.
   3) I video si sbloccano solo dopo almeno un obiettivo fatto oggi (AD_NEED_GOAL): prima non c'e' nessun pulsante,
      nemmeno spento.
   Dove: 1) scheda del regalo del giorno gia' aperto; 2) negozio dei Tanì; 3) scheda "ti mancano X Tanì".
   Mai all'avvio, mai sugli obiettivi, mai per "salvare la serie", mai al ritorno da un viaggio (e' il momento della
   cartolina). Chi ha Plus non vede pubblicita'.
   Consenso (UMP): la finestra di Google per il consenso non compare al primo avvio. Si chiede subito prima del primo
   video, quando la persona tocca il pulsante. Chi ha gia' completato il consenso una volta (S.adsOk) aggiorna lo stato
   a ogni avvio come chiede Google (requestConsentInfoUpdate dentro init) e il video si prepara in anticipo.
   Prima del consenso non si chiede nessun annuncio (canRequestAds).
   In Profilo, se richiesto dalla legge (Europa), c'e' "Scelte sulla pubblicità" per cambiare il consenso. */
const ADS_UNIT = "ca-app-pub-4252103380033748/3198094031"; /* codice del video con premio di AdMob (ca-app-pub-…/…): si imposta quando l'app è registrata su AdMob */
/* gift: testo del pulsante (n = Tanì del video), left: quanti video restano oggi, thanks: avviso dopo il video */
const V19AD = {
  it: { gift: (n) => `Guarda una pubblicità: raddoppia il regalo (+${n} Tanì)`, left: (n) => n === 1 ? "ancora 1 oggi" : `ancora ${n} oggi`, thanks: (n) => `Regalo raddoppiato: +${n} Tanì. Grazie!`, none: "Nessuna pubblicità disponibile ora. Riprova più tardi.", privT: "Scelte sulla pubblicità", privP: "Cambia il consenso per gli annunci personalizzati." },
  en: { gift: (n) => `Watch an ad: double your gift (+${n} Tanì)`, left: (n) => `${n} left today`, thanks: (n) => `Gift doubled: +${n} Tanì. Thank you!`, none: "No ad available right now. Please try later.", privT: "Ad choices", privP: "Change your consent for personalised ads." },
  de: { gift: (n) => `Werbevideo ansehen: Geschenk verdoppeln (+${n} Tanì)`, left: (n) => `heute noch ${n}`, thanks: (n) => `Geschenk verdoppelt: +${n} Tanì. Danke!`, none: "Gerade ist kein Werbevideo verfügbar. Versuch es später noch einmal.", privT: "Werbe-Einstellungen", privP: "Ändere deine Einwilligung für personalisierte Werbung." },
  es: { gift: (n) => `Mira un anuncio: duplica tu regalo (+${n} Tanì)`, left: (n) => n === 1 ? "queda 1 hoy" : `quedan ${n} hoy`, thanks: (n) => `Regalo duplicado: +${n} Tanì. ¡Gracias!`, none: "Ahora no hay anuncios disponibles. Inténtalo más tarde.", privT: "Opciones de publicidad", privP: "Cambia tu consentimiento para anuncios personalizados." },
  fr: { gift: (n) => `Regarde une publicité : double ton cadeau (+${n} Tanì)`, left: (n) => `encore ${n} aujourd'hui`, thanks: (n) => `Cadeau doublé : +${n} Tanì. Merci !`, none: "Aucune publicité disponible pour le moment. Réessaie plus tard.", privT: "Choix publicitaires", privP: "Modifie ton consentement aux annonces personnalisées." },
  pt: { gift: (n) => `Veja um anúncio: dobre seu presente (+${n} Tanì)`, left: (n) => n === 1 ? "resta 1 hoje" : `restam ${n} hoje`, thanks: (n) => `Presente em dobro: +${n} Tanì. Valeu!`, none: "Nenhum anúncio disponível agora. Tente mais tarde.", privT: "Escolhas de publicidade", privP: "Altere seu consentimento para anúncios personalizados." },
  ja: { gift: (n) => `広告を見てプレゼントを2倍に（+${n} Tanì）`, left: (n) => `今日はあと${n}回`, thanks: (n) => `プレゼントが2倍に：+${n} Tanì。ありがとう！`, none: "いまは見られる広告がありません。あとでもう一度お試しください。", privT: "広告の設定", privP: "パーソナライズ広告への同意を変更します。" },
  ko: { gift: (n) => `광고 보고 선물 두 배로 받기 (Tanì +${n})`, left: (n) => `오늘 ${n}번 남음`, thanks: (n) => `선물이 두 배가 됐어요: Tanì +${n}. 고마워요!`, none: "지금은 볼 수 있는 광고가 없어요. 나중에 다시 해 보세요.", privT: "광고 선택", privP: "맞춤 광고 동의를 변경해요." },
  zh: { gift: (n) => `看个广告，礼物翻倍（+${n} Tanì）`, left: (n) => `今天还剩 ${n} 次`, thanks: (n) => `礼物翻倍：+${n} Tanì，谢谢！`, none: "现在没有可观看的广告，请稍后再试。", privT: "广告选择", privP: "更改你对个性化广告的同意。" },
  zht: { gift: (n) => `看段廣告，禮物加倍（+${n} Tanì）`, left: (n) => `今天還剩 ${n} 次`, thanks: (n) => `禮物加倍：+${n} Tanì，謝謝！`, none: "現在沒有可觀看的廣告，請稍後再試。", privT: "廣告選擇", privP: "變更你對個人化廣告的同意。" },
  ru: { gift: (n) => `Посмотреть рекламу и удвоить подарок (+${n} Tanì)`, left: (n) => `сегодня ещё ${n}`, thanks: (n) => `Подарок удвоен: +${n} Tanì. Спасибо!`, none: "Сейчас нет доступной рекламы. Попробуй позже.", privT: "Настройки рекламы", privP: "Измени согласие на персонализированную рекламу." },
  pl: { gift: (n) => `Obejrzyj reklamę i podwój prezent (+${n} Tanì)`, left: (n) => `dziś jeszcze ${n}`, thanks: (n) => `Prezent podwojony: +${n} Tanì. Dziękujemy!`, none: "Teraz nie ma dostępnych reklam. Spróbuj później.", privT: "Ustawienia reklam", privP: "Zmień zgodę na reklamy spersonalizowane." },
  nl: { gift: (n) => `Bekijk een reclamevideo: verdubbel je cadeau (+${n} Tanì)`, left: (n) => `vandaag nog ${n}`, thanks: (n) => `Cadeau verdubbeld: +${n} Tanì. Dank je!`, none: "Er is nu geen reclamevideo beschikbaar. Probeer het later opnieuw.", privT: "Advertentiekeuzes", privP: "Wijzig je toestemming voor gepersonaliseerde advertenties." },
  tr: { gift: (n) => `Reklam izle, hediyeni ikiye katla (+${n} Tanì)`, left: (n) => `bugün ${n} hak kaldı`, thanks: (n) => `Hediyen ikiye katlandı: +${n} Tanì. Teşekkürler!`, none: "Şu anda izlenebilecek reklam yok. Daha sonra tekrar dene.", privT: "Reklam tercihleri", privP: "Kişiselleştirilmiş reklam iznini değiştir." }
};
const v19ad = () => V19AD[S.lang] || V19AD.en;
const adsPlugin = () => { try { const C = window.Capacitor; return (C && C.Plugins && C.Plugins.TanettoAds) || null; } catch (e) { return null; } };
let adsSt = { canRequestAds: false, privacyRequired: false, loaded: false }, adsBusy = false, adsInitP = null;
/* chi aveva gia' un compagno con la 1.0.8 ha gia' visto la richiesta di consenso all'avvio: per loro si continua ad
   aggiornare il consenso a ogni apertura (cosi' "Scelte sulla pubblicità" resta sempre in Profilo) */
if (S.v109 === undefined) { S.v109 = 1; if (S.pet && !S.adsOk) S.adsOk = 1; save(); }
/* 1.0.9 (fase 2): pubblico misto (98zf): l'eta' decide come Google tratta la richiesta (bambini: TFCD + G, niente ID pubblicita') */
const adAgeOpts = () => ({ age: typeof ageAds === "function" ? ageAds() : "child" });
const adsOn = () => !!(ADS_UNIT && isNativeApp() && adsPlugin() && !plusActive());
function adsInit() {
  if (!adsOn()) return Promise.resolve(adsSt); if (adsInitP) return adsInitP;
  adsInitAt = Date.now(); adsBack = false;
  adsInitP = adsPlugin().init(adAgeOpts()).then((s) => { adsSt = s || adsSt; if (adsSt.canRequestAds && !S.adsOk) { S.adsOk = 1; save(); } if (!adsSt.canRequestAds) adsInitP = null; return adsLoad(); }).catch(() => { adsInitP = null; return adsSt; });
  return adsInitP;
}
/* Se all'avvio non si potevano chiedere video (es. senza internet), si riprova al rientro nell'app, al massimo ogni 30 minuti */
let adsInitAt = 0, adsBack = false;
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") adsBack = true; });
/* Il video si prepara in anticipo (all'avvio e subito dopo ogni visione): così quando serve è già pronto.
   Se Google non ne ha uno, si riprova da soli dopo 1, 2, 4… minuti (al massimo ogni 30), senza disturbare. */
let adsLoadP = null, adsRetryMs = 60000, adsRetryT = null, adsRetryOn = false, adsLoadedAt = 0;
const AD_MAX_AGE = 55 * 60000;
function adsLoad() {
  if (!adsOn() || !adsSt.canRequestAds || adsSt.loaded || adsLeftToday() <= 0) return Promise.resolve(adsSt);
  if (adsLoadP) return adsLoadP;
  clearTimeout(adsRetryT); adsRetryOn = false;
  adsLoadP = adsPlugin().load(Object.assign({ unitId: ADS_UNIT }, adAgeOpts())).then((s) => { adsSt = s || adsSt; adsRetryMs = 60000; if (adsSt.loaded) adsLoadedAt = Date.now(); const y = window.scrollY; if (!layer.innerHTML) { render(); window.scrollTo(0, y); } return adsSt; })
    .catch(() => { adsRetryOn = true; adsRetryT = setTimeout(() => { adsRetryOn = false; adsLoad(); }, adsRetryMs); adsRetryMs = Math.min(adsRetryMs * 2, 1800000); return adsSt; }).finally(() => { adsLoadP = null; });
  return adsLoadP;
}
/* Limite giornaliero (conta ogni video mostrato, anche se chiuso prima della fine): niente abbuffate, i premi restano preziosi */
/* 1.0.9 (fase 2): parametri dei video, tutti qui */
const AD_DOUBLE_MAX = 5;     /* video al giorno, un solo contatore per regalo / negozio / "ti mancano" */
const AD_NEED_GOAL = true;   /* i video si sbloccano solo dopo almeno un obiettivo fatto oggi */
const ADS_DAY_MAX = AD_DOUBLE_MAX;
/* Tanì di un video = il regalo di oggi (econGift alla serie di oggi: 6, 8, ... 18 dal 7o giorno di fila) */
function adAmount() { const n = (S.visit && S.visit.n) || 1; try { if (typeof econGift === "function") return econGift(n); } catch (e) { /* niente */ } return giftValue(n); }
/* almeno un obiettivo fatto oggi (anche se poi tolto: conta il registro dei premi del giorno) */
function adGoalDone() {
  if (!AD_NEED_GOAL) return true; if (!S.pet) return false; const d = dkey();
  try { if (typeof econ === "function" && (econ().rw[d] || []).length) return true; } catch (e) { /* niente */ }
  return (S.log || []).some((x) => x && x.d === d) || (S.day === d && S.done.length > 0);
}
function adsLeftToday() { const d = dkey(); const a = S.adsDay && S.adsDay.d === d ? S.adsDay.n : 0; return ADS_DAY_MAX - a; }
function adsCount() { const d = dkey(); S.adsDay = { d, n: (S.adsDay && S.adsDay.d === d ? S.adsDay.n : 0) + 1 }; save(); }
const adFresh = () => adsSt.loaded && Date.now() - adsLoadedAt < AD_MAX_AGE;
const adReady = () => adsOn() && adsSt.canRequestAds && adFresh() && adsLeftToday() > 0;
/* consenso mai chiesto: il pulsante c'e' lo stesso, e il tocco chiede il consenso e prepara il video */
const adLazy = () => adsOn() && !S.adsOk && !adsSt.canRequestAds && !adsInitP && adsLeftToday() > 0;
const adOffer = () => adGoalDone() && (adReady() || adLazy());
async function adShow(onReward, src) {
  if (adsBusy) return;
  if (!adGoalDone()) return;
  if (!adReady() && adLazy()) {
    adsBusy = true; const b = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("adbtn") ? document.activeElement : null;
    if (b) { b.disabled = true; b.dataset.lbl = b.innerHTML; b.innerHTML = `<span class="spin" aria-hidden="true"></span>${esc(L().acct.wait)}`; }
    try { await adsInit(); if (adsLoadP) await adsLoadP; } catch (e) { /* niente */ } finally { adsBusy = false; if (b && b.isConnected) { b.disabled = false; b.innerHTML = b.dataset.lbl || b.innerHTML; } }
  }
  if (!adReady()) { toast(v19ad().none); adsLoad(); return; }
  adsBusy = true; trackOnce("video-premio-" + src);
  let r = null;
  try { r = await adsPlugin().show(); adsSt.loaded = false; adsCount(); }
  catch (e) { toast(v19ad().none); adsSt.loaded = false; }
  finally { adsBusy = false; adsLoad(); }
  if (r && r.rewarded) { try { onReward(); } catch (e) { /* il premio è già stato dato: un errore di disegno non deve mostrare "nessun video" */ } }
}
/* Il pulsante (uguale in tutti i posti): "+N Tanì" = il regalo di oggi, e quanti video restano oggi */
function adBtn(id, cls) {
  if (!adOffer()) return ""; const t = v19ad(); const n = adAmount(); const left = adsLeftToday();
  return `<button class="btn ghost ${cls} adbtn" id="${id}" data-adn="${n}">${icon("p_play")}<span class="adtx">${esc(t.gift(n))}${left > 0 && left < AD_DOUBLE_MAX ? `<small class="adleft">${esc(t.left(left))}</small>` : ""}</span></button>`;
}
/* il premio di un video: sempre lo stesso per tutti i posti */
function adGrant(n) { S.seeds += n; save(); toast(v19ad().thanks(n)); SND.play("coin"); burst("star", 10); }
/* 1) Regalo del giorno gia' aperto: il pulsante c'e' finche' restano video oggi (e dopo il primo obiettivo) */
const _teaserV19 = teaserCard;
teaserCard = function () {
  let h = _teaserV19();
  if (S.giftDay === S.day) { const b = adBtn("adGift", "small"); if (b) h = h.replace(/<\/div>$/, `${b}</div>`); }
  return h;
};
/* Altro: scelte sulla pubblicità (solo se servono per legge) */
const _viewMoreV19ad = viewMore;
viewMore = function () {
  const h = _viewMoreV19ad(); if (!adsOn() || !adsSt.privacyRequired) return h; const t = v19ad();
  const card = `<div class="card stack-s adpriv"><h3>${esc(t.privT)}</h3><p class="small muted">${esc(t.privP)}</p><button class="btn ghost small" id="adPrivacy">${esc(t.privT)}</button></div>`;
  const key = `<div class="card stack-s" id="dataCard">`; return h.includes(key) ? h.replace(key, card + key) : h + card;
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "adGift") { ev.stopImmediatePropagation(); const n = adAmount(); adShow(() => { adGrant(n); const y = window.scrollY; render(); window.scrollTo(0, y); }, "regalo"); return; }
  if (b.id === "adPrivacy") { ev.stopImmediatePropagation(); const p = adsPlugin(); if (p) p.privacy().then((s) => { adsSt = s || adsSt; if (!adsSt.loaded) adsLoadedAt = 0; render(); (adsLoadP || Promise.resolve()).finally(() => adsLoad()); }).catch(() => {}); return; }
}, true);
/* Si parte solo con un compagno già scelto (mai durante la prima configurazione) e dopo il controllo degli acquisti (Plus = niente pubblicità) */
let billSynced = false;
const _syncPurchasesV19ad = syncPurchases;
/* Se Google Play non risponde (es. si sta aggiornando) si riprova ogni minuto; dopo 3 tentativi falliti si va avanti lo stesso (telefoni senza Play) */
let billFails = 0, billSyncP = null;
syncPurchases = function (show) {
  const ran = isNativeApp() && !!billPlugin() && !!S.pet; const r = _syncPurchasesV19ad(show);
  if (ran) billSyncP = Promise.resolve(r).then((x) => { if (x !== null || ++billFails >= 3) billSynced = true; }, () => { if (++billFails >= 3) billSynced = true; }).finally(() => { billSyncP = null; });
  return r;
};
setInterval(() => {
  if (!S.pet || !adsOn()) return;
  /* Dopo la prima configurazione (compagno appena scelto) il controllo degli acquisti non era ancora partito: lo si fa ora */
  if (!billSynced && !billPlugin()) billSynced = true; /* senza modulo acquisti non c'è Plus da controllare */
  if (!billSynced) { if (!billSyncP && (!billSyncAt || Date.now() - billSyncAt > 60e3)) syncPurchases(false); return; }
  if (!adsInitP && !adsSt.canRequestAds) { if (S.adsOk && !layer.innerHTML && (!adsInitAt || (adsBack && Date.now() - adsInitAt > 1800e3))) adsInit(); return; }
  /* Video scaduto (più di 55 minuti) o nuovo giorno dopo il limite: se ne prepara uno nuovo */
  if (adsSt.loaded && !adFresh()) adsSt.loaded = false;
  if (adsSt.canRequestAds && !adsSt.loaded && !adsLoadP && !adsRetryOn && !adsBusy && adsLeftToday() > 0) adsLoad();
}, 5000);

/* 2) e 3) Negozio dei Tanì e scheda "ti mancano X Tanì": stesso video, stesso premio, stesso contatore */
function adShopBtn() { return adBtn("adShop", "block adshop"); }
const _openTaniShopV19ad = openTaniShop;
openTaniShop = function (src) { _openTaniShopV19ad(src); const box = document.querySelector(".tshop"), b = adShopBtn(); if (!box || !b) return; const c = box.querySelector("#closeLayer"); if (c) c.insertAdjacentHTML("beforebegin", b); else box.insertAdjacentHTML("beforeend", b); };
const _needSheetV19ad = needSheet;
let adNeedS = null;
needSheet = function (s) { adNeedS = s; _needSheetV19ad(s); const miss = s.price - S.seeds; if (miss <= 0) return; const k = document.getElementById("ndKeep"); const b = adShopBtn(); if (k && b) k.insertAdjacentHTML("afterend", b); };
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "adShop") return;
  ev.stopImmediatePropagation(); const box = b.closest(".sheet");
  const amt = adAmount();
  adShow(() => { adGrant(amt); const n = document.getElementById("seedN"); if (n) n.textContent = S.seeds.toLocaleString(loc(), NUMG);
    if (box && box.classList.contains("ndsheet") && adNeedS) { if (S.seeds >= adNeedS.price) { closeLayer(); render(); } else needSheet(adNeedS); return; }
    if (box) { const x = box.querySelector("#adShop"); const nb = adShopBtn(); if (x) { if (nb) x.outerHTML = nb; else x.remove(); } } }, "negozio");
}, true);
