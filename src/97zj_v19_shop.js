/* ===== 1.0.6 — negozio dei Tanì: più invogliante e sempre corretto =====
   - "+N% Tanì in più" calcolato dai prezzi veri di Google (in ogni paese), non più "in regalo";
     "Il più conveniente" va sul pacchetto che davvero dà più Tanì per euro.
   - Abbonamento annuale: niente "Il più scelto" (non abbiamo dati): al suo posto "Risparmi il X%", calcolato.
   - Primo acquisto: il primo pacchetto di Tanì vale il doppio (una volta sola, senza scadenza).
   - Quando un oggetto costa più dei Tanì che hai: una scheda che dice quanti ne mancano, in quanti giorni
     li guadagni con gli obiettivi e, se c'è, il pacchetto più piccolo che basta (con il prezzo vero).
   - Un riferimento in euro (prezzo vero del pacchetto più piccolo), come chiedono le linee guida europee. */
const V19S = {
  it: { bonus: (n) => `+${n}% Tanì in più`, firstT: "Primo acquisto: Tanì doppi", firstP: "Il primo pacchetto che compri vale il doppio. Una volta sola, senza scadenza.", firstGot: (n) => `Primo acquisto: ${n} Tanì, il doppio!`, needT: (n) => `Ti mancano ${n} Tanì`, needFor: (x) => `per ${x}`, needDays: (d) => d <= 1 ? "Con i tuoi obiettivi li raccogli in circa 1 giorno." : `Con i tuoi obiettivi li raccogli in circa ${d} giorni.`, needPack: (p, n) => `Oppure c'è il pacchetto ${p}: ${n} Tanì.`, needSee: "Vedi i pacchetti", keep: "Continuo a raccogliere", ref: (n, p) => `Per confronto: ${n} Tanì = ${p}` },
  en: { bonus: (n) => `+${n}% more Tanì`, firstT: "First purchase: double Tanì", firstP: "The first pack you buy is worth double. Only once, with no deadline.", firstGot: (n) => `First purchase: ${n} Tanì, double!`, needT: (n) => `You need ${n} more Tanì`, needFor: (x) => `for ${x}`, needDays: (d) => d <= 1 ? "With your goals you'll collect them in about 1 day." : `With your goals you'll collect them in about ${d} days.`, needPack: (p, n) => `Or there's the ${p} pack: ${n} Tanì.`, needSee: "See the packs", keep: "I'll keep collecting", ref: (n, p) => `For reference: ${n} Tanì = ${p}` },
  de: { bonus: (n) => `+${n} % mehr Tanì`, firstT: "Erster Kauf: doppelte Tanì", firstP: "Das erste Paket, das du kaufst, zählt doppelt. Nur einmal, ohne Frist.", firstGot: (n) => `Erster Kauf: ${n} Tanì, doppelt!`, needT: (n) => `Dir fehlen ${n} Tanì`, needFor: (x) => `für ${x}`, needDays: (d) => d <= 1 ? "Mit deinen Zielen sammelst du sie in etwa 1 Tag." : `Mit deinen Zielen sammelst du sie in etwa ${d} Tagen.`, needPack: (p, n) => `Oder das Paket ${p}: ${n} Tanì.`, needSee: "Pakete ansehen", keep: "Ich sammle weiter", ref: (n, p) => `Zum Vergleich: ${n} Tanì = ${p}` },
  es: { bonus: (n) => `+${n} % más Tanì`, firstT: "Primera compra: Tanì dobles", firstP: "El primer paquete que compres vale el doble. Solo una vez y sin fecha límite.", firstGot: (n) => `Primera compra: ¡${n} Tanì, el doble!`, needT: (n) => `Te faltan ${n} Tanì`, needFor: (x) => `para ${x}`, needDays: (d) => d <= 1 ? "Con tus objetivos los reúnes en 1 día aproximadamente." : `Con tus objetivos los reúnes en unos ${d} días.`, needPack: (p, n) => `O está el paquete ${p}: ${n} Tanì.`, needSee: "Ver los paquetes", keep: "Sigo reuniendo", ref: (n, p) => `Como referencia: ${n} Tanì = ${p}` },
  fr: { bonus: (n) => `+${n} % de Tanì en plus`, firstT: "Premier achat : Tanì doublés", firstP: "Le premier pack que tu achètes vaut le double. Une seule fois, sans date limite.", firstGot: (n) => `Premier achat : ${n} Tanì, le double !`, needT: (n) => `Il te manque ${n} Tanì`, needFor: (x) => `pour ${x}`, needDays: (d) => d <= 1 ? "Avec tes objectifs, tu les gagnes en 1 jour environ." : `Avec tes objectifs, tu les gagnes en ${d} jours environ.`, needPack: (p, n) => `Ou bien le pack ${p} : ${n} Tanì.`, needSee: "Voir les packs", keep: "Je continue à collecter", ref: (n, p) => `À titre indicatif : ${n} Tanì = ${p}` },
  pt: { bonus: (n) => `+${n}% de Tanì`, firstT: "Primeira compra: Tanì em dobro", firstP: "O primeiro pacote que você comprar vale o dobro. Só uma vez, sem prazo.", firstGot: (n) => `Primeira compra: ${n} Tanì, o dobro!`, needT: (n) => `Faltam ${n} Tanì`, needFor: (x) => `para ${x}`, needDays: (d) => d <= 1 ? "Com suas metas, você junta em cerca de 1 dia." : `Com suas metas, você junta em cerca de ${d} dias.`, needPack: (p, n) => `Ou tem o pacote ${p}: ${n} Tanì.`, needSee: "Ver os pacotes", keep: "Vou continuar juntando", ref: (n, p) => `Para comparar: ${n} Tanì = ${p}` },
  ja: { bonus: (n) => `Tanì +${n}% 多め`, firstT: "はじめての購入：Tanì2倍", firstP: "最初に買うパックは2倍になります。1回だけ、期限はありません。", firstGot: (n) => `はじめての購入：Tanì ${n}（2倍）！`, needT: (n) => `あと ${n} Tanì`, needFor: (x) => `${x}まで`, needDays: (d) => `目標を続ければ、約${Math.max(1, d)}日で集まります。`, needPack: (p, n) => `または「${p}」パック：${n} Tanì`, needSee: "パックを見る", keep: "このまま集める", ref: (n, p) => `参考：${n} Tanì = ${p}` },
  ko: { bonus: (n) => `Tanì +${n}% 더`, firstT: "첫 구매: Tanì 2배", firstP: "처음 사는 팩은 2배가 돼요. 단 한 번, 기한은 없어요.", firstGot: (n) => `첫 구매: Tanì ${n}개, 2배!`, needT: (n) => `Tanì ${n}개가 더 필요해요`, needFor: (x) => `${x}까지`, needDays: (d) => `목표를 하면 약 ${Math.max(1, d)}일이면 모을 수 있어요.`, needPack: (p, n) => `또는 ${p} 팩: Tanì ${n}개`, needSee: "팩 보기", keep: "계속 모을래요", ref: (n, p) => `참고: Tanì ${n}개 = ${p}` },
  zh: { bonus: (n) => `多 ${n}% Tanì`, firstT: "首次购买：Tanì翻倍", firstP: "你买的第一个礼包价值翻倍。仅限一次，没有期限。", firstGot: (n) => `首次购买：${n} Tanì，翻倍！`, needT: (n) => `还差 ${n} Tanì`, needFor: (x) => `才能得到${x}`, needDays: (d) => `坚持目标，大约 ${Math.max(1, d)} 天就能攒够。`, needPack: (p, n) => `也可以选择「${p}」礼包：${n} Tanì。`, needSee: "查看礼包", keep: "我继续攒", ref: (n, p) => `参考：${n} Tanì = ${p}` },
  zht: { bonus: (n) => `多 ${n}% Tanì`, firstT: "首次購買：Tanì加倍", firstP: "你買的第一個禮包價值加倍。僅限一次，沒有期限。", firstGot: (n) => `首次購買：${n} Tanì，加倍！`, needT: (n) => `還差 ${n} Tanì`, needFor: (x) => `才能得到${x}`, needDays: (d) => `堅持目標，大約 ${Math.max(1, d)} 天就能存夠。`, needPack: (p, n) => `也可以選擇「${p}」禮包：${n} Tanì。`, needSee: "查看禮包", keep: "我繼續存", ref: (n, p) => `參考：${n} Tanì = ${p}` },
  ru: { bonus: (n) => `+${n}% Tanì`, firstT: "Первая покупка: двойные Tanì", firstP: "Первый купленный набор засчитывается вдвойне. Только один раз, без срока.", firstGot: (n) => `Первая покупка: ${n} Tanì, вдвойне!`, needT: (n) => `Не хватает Tanì: ${n}`, needFor: (x) => `для «${x}»`, needDays: (d) => `С твоими целями ты соберёшь их примерно за ${Math.max(1, d)} дн.`, needPack: (p, n) => `Или есть набор «${p}»: ${n} Tanì.`, needSee: "Посмотреть наборы", keep: "Буду собирать дальше", ref: (n, p) => `Для сравнения: ${n} Tanì = ${p}` },
  pl: { bonus: (n) => `+${n}% więcej Tanì`, firstT: "Pierwszy zakup: podwójne Tanì", firstP: "Pierwszy kupiony pakiet liczy się podwójnie. Tylko raz, bez terminu.", firstGot: (n) => `Pierwszy zakup: ${n} Tanì, podwójnie!`, needT: (n) => `Brakuje ci ${n} Tanì`, needFor: (x) => `do: ${x}`, needDays: (d) => (d <= 1 ? "Z twoimi celami zbierzesz je w około 1 dzień." : `Z twoimi celami zbierzesz je w około ${d} dni.`), needPack: (p, n) => `Albo pakiet ${p}: ${n} Tanì.`, needSee: "Zobacz pakiety", keep: "Zbieram dalej", ref: (n, p) => `Dla porównania: ${n} Tanì = ${p}` },
  nl: { bonus: (n) => `+${n}% meer Tanì`, firstT: "Eerste aankoop: dubbele Tanì", firstP: "Het eerste pakket dat je koopt telt dubbel. Maar één keer, zonder einddatum.", firstGot: (n) => `Eerste aankoop: ${n} Tanì, dubbel!`, needT: (n) => `Je komt ${n} Tanì tekort`, needFor: (x) => `voor ${x}`, needDays: (d) => d <= 1 ? "Met je doelen spaar je ze in ongeveer 1 dag." : `Met je doelen spaar je ze in ongeveer ${d} dagen.`, needPack: (p, n) => `Of het pakket ${p}: ${n} Tanì.`, needSee: "Pakketten bekijken", keep: "Ik spaar verder", ref: (n, p) => `Ter vergelijking: ${n} Tanì = ${p}` },
  tr: { bonus: (n) => `%${n} daha fazla Tanì`, firstT: "İlk satın alma: Tanì iki katı", firstP: "Aldığın ilk paket iki kat sayılır. Yalnızca bir kez, süre sınırı yok.", firstGot: (n) => `İlk satın alma: ${n} Tanì, iki katı!`, needT: (n) => `${n} Tanì eksik`, needFor: (x) => `${x} için`, needDays: (d) => `Hedeflerinle yaklaşık ${Math.max(1, d)} günde toplarsın.`, needPack: (p, n) => `Ya da ${p} paketi: ${n} Tanì.`, needSee: "Paketleri gör", keep: "Toplamaya devam", ref: (n, p) => `Karşılaştırma için: ${n} Tanì = ${p}` }
};
const v19s = () => V19S[S.lang] || V19S.en;

/* --- Bonus e "più conveniente" dai prezzi veri --- */
function packValues() {
  const pr = (typeof billProducts !== "undefined" && billProducts && billProducts.packs) || null;
  const per = PACKS.map((p, i) => { const x = pr && pr[BILL.PACK_IDS[i]]; return x && x.micros ? p.n / x.micros : null; });
  if (per.some((v) => v === null)) return { bonus: PACKS.map((p) => p.b || 0), best: 3 };
  const bonus = per.map((v) => Math.max(0, Math.floor((v / per[0] - 1) * 100)));
  let best = 0; per.forEach((v, i) => { if (v > per[best]) best = i; });
  return { bonus, best };
}
function packDecorate() {
  const box = document.querySelector(".tshop"); if (!box) return; const t = v19s(); const { bonus, best } = packValues();
  box.querySelectorAll(".pack").forEach((el) => {
    const i = +el.dataset.pack; const pb = el.querySelector(".pb"); if (pb) pb.textContent = bonus[i] >= 1 ? t.bonus(bonus[i]) : "";
    el.classList.toggle("best", i === best); const badge = el.querySelector(".pbadge");
    if (i === best && !badge) el.insertAdjacentHTML("afterbegin", `<span class="pbadge">${esc(L().tani.best)}</span>`);
    if (i !== best && badge) badge.remove();
  });
  const ref = document.getElementById("taniRef"); const pr = billProducts && billProducts.packs && billProducts.packs[BILL.PACK_IDS[0]];
  if (ref) ref.textContent = pr ? t.ref(PACKS[0].n.toLocaleString(loc(), NUMG), pr.price) : "";
}
const _openTaniShopV19 = openTaniShop;
openTaniShop = function (src) {
  _openTaniShopV19(src); const box = document.querySelector(".tshop"); if (!box) return; const t = v19s();
  const packs = box.querySelector(".packs");
  if (packs && firstPackOpen()) packs.insertAdjacentHTML("beforebegin", `<div class="firstpk">${icon("p_gift")}<div><b>${esc(t.firstT)}</b><small>${esc(t.firstP)}</small></div></div>`);
  if (packs) packs.insertAdjacentHTML("afterend", `<p class="small muted taniref" id="taniRef"></p>`);
  packDecorate();
  if (isNativeApp()) loadProducts().then(packDecorate).catch(() => {});
};
const _shopPricesV19 = shopPrices;
shopPrices = function () { _shopPricesV19(); packDecorate(); };

/* --- Primo acquisto: Tanì doppi ---
   Il raddoppio è sempre esattamente il pacchetto comprato (mai altri Tanì arrivati nel frattempo).
   Il segno "primo acquisto già fatto" resta anche dopo "Ricomincia da capo" (è salvato anche a parte). */
const FIRST_KEY = "tanetto-first-pack";
const firstPackOpen = () => { let ls = null; try { ls = localStorage.getItem(FIRST_KEY); } catch (e) { ls = null; } return !S.firstPack && !ls && !(S.paidTokens && S.paidTokens.length); };
function firstPackMark() { S.firstPack = S.firstPack || dkey(); try { localStorage.setItem(FIRST_KEY, S.firstPack); } catch (e) { /* niente */ } }
const _creditPackV19 = creditPack;
creditPack = async function (x, celebrate) {
  const first = firstPackOpen(); const id = (x && x.products || [])[0]; const i = BILL.PACK_IDS.indexOf(id);
  const ok = await _creditPackV19(x, false);
  if (ok && i >= 0) {
    const base = PACKS[i].n * Math.max(1, x.quantity || 1); let tot = base;
    if (first) { S.seeds += base; tot = base * 2; trackOnce("tani-primo-acquisto-doppio"); }
    firstPackMark(); save();
    if (celebrate || first) { toast(first ? v19s().firstGot(tot.toLocaleString(loc(), NUMG)) : BT().thanksTani(tot.toLocaleString(loc(), NUMG))); SND.play("fanfare"); SND.haptic([20, 60, 30]); burst("confetti", first ? 40 : 24); }
  }
  return ok;
};
setTimeout(() => { if (S.paidTokens && S.paidTokens.length && !S.firstPack) { firstPackMark(); save(); } }, 3000);

/* --- "Ti mancano X Tanì" --- */
function dailyTaniGuess() {
  const g = (typeof todayGoals === "function" ? todayGoals().length : 3) || 3;
  return g * 10 + 20 + giftValue(Math.max(1, (S.visit && S.visit.n) || 1)) + 30;
}
function needSheet(s) {
  const t = v19s(); const miss = s.price - S.seeds; if (miss <= 0) return;
  const days = Math.max(1, Math.ceil(miss / dailyTaniGuess()));
  const i = PACKS.findIndex((p) => p.n >= miss);
  const pr = i >= 0 && typeof billProducts !== "undefined" && billProducts && billProducts.packs && billProducts.packs[BILL.PACK_IDS[i]];
  const packLine = i >= 0 ? `<p class="small">${esc(t.needPack(L().tani.packs[i], PACKS[i].n.toLocaleString(loc(), NUMG)))}${pr ? ` <b>${esc(pr.price)}</b>` : ""}</p>` : "";
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="ndT"><div class="sheet ndsheet"><div class="grab"></div>
    <div class="ndart" aria-hidden="true">${itemArt(s.id)}</div>
    <h2 id="ndT">${SEED}${esc(t.needT(miss.toLocaleString(loc(), NUMG)))}</h2><p class="small muted">${esc(t.needFor(L().items[s.id]))}</p>
    <p>${esc(t.needDays(days))}</p>${packLine}
    <button class="btn" id="ndKeep">${esc(t.keep)}</button><button class="btn ghost" id="ndShop">${esc(t.needSee)}</button></div></div>`;
  SND.play("click"); trackOnce("ti-mancano-tani");
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "getTani2") { const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId); if (s && S.seeds < s.price) { ev.stopImmediatePropagation(); ev.preventDefault(); needSheet(s); } return; }
  if (b.id === "ndKeep") { ev.stopImmediatePropagation(); closeLayer(); return; }
  if (b.id === "ndShop") { ev.stopImmediatePropagation(); fadeLayer(); setTimeout(() => openTaniShop("ti-mancano"), 60); return; }
}, true);

/* --- Abbonamento annuale: "Risparmi il X%" al posto di "Il più scelto" --- */
const _plusFootV19 = plusFoot;
plusFoot = function () {
  _plusFootV19(); const pl = billProducts && billProducts.plans; const pop = document.querySelector(".plans .ppop"); if (!pop || !pl) return;
  const save = pl.year && pl.month ? plusSavePct(pl.year.micros, pl.month.micros) : 0;
  const p = L().plus;
  if (save >= 5) { pop.textContent = p.save(save); const sm = pop.parentElement.querySelector("small"); if (sm) sm.textContent = sm.textContent.replace(" · " + p.save(save), ""); }
  else pop.remove();
};
