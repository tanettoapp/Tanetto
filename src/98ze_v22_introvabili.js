/* =================== 1.0.9 (fase 2): INTROVABILI, la fascia sopra le leggendarie ===================
   Decisione del proprietario (11-12/11/2026): le cose piu' belle di tutto il negozio. Si comprano SOLO con i Tanì (niente
   attese a giorni, niente sentieri o forzieri), con un prezzo pari ad almeno 12 mesi di risparmio per chi gioca "tipico"
   (tutti gli obiettivi, ~2 video al giorno: circa 14 mesi) e non meno di ~9 mesi per chi guarda 5 video al giorno con la serie piena.
   Plus non le sconta e non le regala. Si vedono dal primo giorno, con il prezzo vero e "hai X di Y Tanì".
   Prezzi: XV_PRICE in 98zd_v22_prices.js (un posto solo, facili da ritoccare).
   I Tanì comprati con i pacchetti non valgono per gli Introvabili (critica dell'economia, 12/11/2026): utilizzabili =
   saldo - max(0, Tanì dei pacchetti - Tanì spesi per tutto il resto). Per chi non compra pacchetti non cambia nulla.
   Desiderio: un Introvabile da raggiungere (il primo che non hai, o quello che scegli), con una piccola festa al 25, 50 e
   75% (senza Tanì) e la stima onesta di quanto manca; provando un altro oggetto si vede di quanti giorni si allontana.
   Sei oggetti, uno per tipo: cappello, mantello, albero (stanza), fontana (stanza), parete, effetto del compagno.
   Disegno SVG con sfumature, luce di contorno, luccichio che passa e animazioni leggere (solo trasformazioni e opacita',
   ferme con "riduci movimento", con la modalita' calma e con la modalita' leggera). Cornice e etichetta loro. */
const XV_IDS = ["x_crown", "x_cloak", "x_tree", "x_fountain", "x_galaxy", "x_aura"];
const XV = {
  it: { chip: "Introvabile", title: "Introvabili", intro: "Le cose più belle di tutto il negozio. Si comprano solo con i Tanì, risparmiando a lungo: sono il traguardo di tanti mesi di cura.",
    have: (a, b) => `Hai ${a} di ${b} Tanì`, pace: (n) => (n < 60 ? `Al tuo ritmo di oggi: circa ${n} giorni` : `Al tuo ritmo di oggi: circa ${Math.round(n / 30.4)} mesi`), owned: (n, m) => `Ne hai ${n} su ${m}`, plusNo: "Plus non le sconta: valgono lo stesso per tutti.",
    wishSet: "Fissa come desiderio", wishIs: "Il tuo desiderio", wishL: "Il tuo desiderio: ", mile: (p, n) => `Sei al ${p}% della strada verso ${n}!`, back: (n) => (n === 1 ? "Il tuo desiderio si allontana di circa 1 giorno" : `Il tuo desiderio si allontana di circa ${n} giorni`),
    paidOnly: "I Tanì dei pacchetti valgono per tutto il negozio, tranne gli Introvabili: questi si comprano solo con i Tanì guadagnati prendendoti cura di te.", paidBlock: "Gli Introvabili si comprano solo con i Tanì guadagnati prendendoti cura di te.",
    items: { x_crown: "Corona dell'aurora", x_cloak: "Mantello della cometa", x_tree: "Albero dei desideri", x_fountain: "Fontana di luna", x_galaxy: "Galassia", x_aura: "Aura di stelle" } },
  en: { chip: "Elusive", title: "Elusive treasures", intro: "The most beautiful things in the whole shop. You can only get them with Tanì, saving for a long time: they crown many months of care.",
    have: (a, b) => `You have ${a} of ${b} Tanì`, pace: (n) => (n < 60 ? `At today's pace: about ${n} days` : `At today's pace: about ${Math.round(n / 30.4)} months`), owned: (n, m) => `You own ${n} of ${m}`, plusNo: "Plus gives no discount: they cost the same for everyone.",
    wishSet: "Make it my wish", wishIs: "Your wish", wishL: "Your wish: ", mile: (p, n) => `You are ${p}% of the way to the ${n}!`, back: (n) => (n === 1 ? "Your wish moves back by about 1 day" : `Your wish moves back by about ${n} days`),
    paidOnly: "Tanì from packs work for the whole shop except the Elusive treasures: those are bought only with Tanì you earn by taking care of yourself.", paidBlock: "Elusive treasures are bought only with the Tanì you earn by taking care of yourself.",
    items: { x_crown: "Aurora crown", x_cloak: "Comet cloak", x_tree: "Wishing tree", x_fountain: "Moon fountain", x_galaxy: "Galaxy", x_aura: "Starlight aura" } },
  de: { chip: "Unikat", title: "Unauffindbare Schätze", intro: "Die schönsten Dinge im ganzen Laden. Es gibt sie nur für Tanì, wenn du lange sparst: Sie krönen viele Monate voller Fürsorge.",
    have: (a, b) => `Du hast ${a} von ${b} Tanì`, pace: (n) => (n < 60 ? `In deinem heutigen Tempo: etwa ${n} Tage` : `In deinem heutigen Tempo: etwa ${Math.round(n / 30.4)} Monate`), owned: (n, m) => `Du hast ${n} von ${m}`, plusNo: "Plus gibt keinen Rabatt: Sie kosten für alle gleich viel.",
    wishSet: "Als Wunsch festlegen", wishIs: "Dein Wunsch", wishL: "Dein Wunsch: ", mile: (p, n) => `Du hast ${p} % des Weges zu ${n} geschafft!`, back: (n) => (n === 1 ? "Dein Wunsch rückt etwa 1 Tag weiter weg" : `Dein Wunsch rückt etwa ${n} Tage weiter weg`),
    paidOnly: "Tanì aus Paketen gelten im ganzen Laden außer für die unauffindbaren Schätze: Die gibt es nur für Tanì, die du verdienst, indem du gut für dich sorgst.", paidBlock: "Unauffindbare Schätze gibt es nur für Tanì, die du verdienst, indem du gut für dich sorgst.",
    items: { x_crown: "Polarlicht-Krone", x_cloak: "Kometenumhang", x_tree: "Wunschbaum", x_fountain: "Mondbrunnen", x_galaxy: "Galaxie", x_aura: "Sternenaura" } },
  es: { chip: "Inencontrable", title: "Inencontrables", intro: "Las cosas más bonitas de toda la tienda. Solo se consiguen con Tanì, ahorrando mucho tiempo: son la corona de muchos meses de cuidado.",
    have: (a, b) => `Tienes ${a} de ${b} Tanì`, pace: (n) => (n < 60 ? `A tu ritmo de hoy: unos ${n} días` : `A tu ritmo de hoy: unos ${Math.round(n / 30.4)} meses`), owned: (n, m) => `Tienes ${n} de ${m}`, plusNo: "Plus no les hace descuento: cuestan lo mismo para todos.",
    wishSet: "Elegir como deseo", wishIs: "Tu deseo", wishL: "Tu deseo: ", mile: (p, n) => `¡Llevas el ${p} % del camino hacia ${n}!`, back: (n) => (n === 1 ? "Tu deseo se aleja alrededor de 1 día" : `Tu deseo se aleja alrededor de ${n} días`),
    paidOnly: "Los Tanì de los paquetes sirven para toda la tienda menos para los Inencontrables: esos solo se compran con los Tanì que ganas cuidándote.", paidBlock: "Los Inencontrables solo se compran con los Tanì que ganas cuidándote.",
    items: { x_crown: "Corona de aurora", x_cloak: "Capa del cometa", x_tree: "Árbol de los deseos", x_fountain: "Fuente de la luna", x_galaxy: "Galaxia", x_aura: "Aura de estrellas" } },
  fr: { chip: "Introuvable", title: "Introuvables", intro: "Les plus belles choses de toute la boutique. On ne les obtient qu'avec des Tanì, en économisant longtemps : elles couronnent de longs mois de soin.",
    have: (a, b) => `Tu as ${a} sur ${b} Tanì`, pace: (n) => (n < 60 ? `À ton rythme d'aujourd'hui : environ ${n} jours` : `À ton rythme d'aujourd'hui : environ ${Math.round(n / 30.4)} mois`), owned: (n, m) => `Tu en as ${n} sur ${m}`, plusNo: "Plus ne fait aucune remise : elles coûtent pareil pour tout le monde.",
    wishSet: "En faire mon vœu", wishIs: "Ton vœu", wishL: "Ton vœu : ", mile: (p, n) => `Tu as fait ${p} % du chemin vers ${n} !`, back: (n) => (n === 1 ? "Ton vœu s'éloigne d'environ 1 jour" : `Ton vœu s'éloigne d'environ ${n} jours`),
    paidOnly: "Les Tanì des packs valent pour toute la boutique sauf les Introuvables : ceux-là s'achètent seulement avec les Tanì gagnés en prenant soin de toi.", paidBlock: "Les Introuvables s'achètent seulement avec les Tanì gagnés en prenant soin de toi.",
    items: { x_crown: "Couronne d'aurore", x_cloak: "Cape de la comète", x_tree: "Arbre à vœux", x_fountain: "Fontaine de lune", x_galaxy: "Galaxie", x_aura: "Aura d'étoiles" } },
  pt: { chip: "Raríssimo", title: "Raríssimos", intro: "As coisas mais bonitas de toda a loja. Só se compram com Tanì, juntando por muito tempo: são a coroa de muitos meses de cuidado.",
    have: (a, b) => `Você tem ${a} de ${b} Tanì`, pace: (n) => (n < 60 ? `No seu ritmo de hoje: cerca de ${n} dias` : `No seu ritmo de hoje: cerca de ${Math.round(n / 30.4)} meses`), owned: (n, m) => `Você tem ${n} de ${m}`, plusNo: "O Plus não dá desconto: custam o mesmo para todo mundo.",
    wishSet: "Escolher como desejo", wishIs: "Seu desejo", wishL: "Seu desejo: ", mile: (p, n) => `Você já fez ${p}% do caminho até ${n}!`, back: (n) => (n === 1 ? "Seu desejo fica cerca de 1 dia mais longe" : `Seu desejo fica cerca de ${n} dias mais longe`),
    paidOnly: "Os Tanì dos pacotes valem para toda a loja, menos os Raríssimos: esses só se compram com os Tanì que você ganha cuidando de si.", paidBlock: "Os Raríssimos só se compram com os Tanì que você ganha cuidando de si.",
    items: { x_crown: "Coroa da aurora", x_cloak: "Capa do cometa", x_tree: "Árvore dos desejos", x_fountain: "Fonte da lua", x_galaxy: "Galáxia", x_aura: "Aura de estrelas" } },
  ja: { chip: "幻", title: "幻のアイテム", intro: "ショップでいちばん美しいものたち。Tanìだけで、長い時間をかけて貯めて手に入れます。何か月ものセルフケアのごほうびです。",
    have: (a, b) => `${b} Tanìのうち ${a} Tanì`, pace: (n) => (n < 60 ? `今日のペースで：約${n}日` : `今日のペースで：約${Math.round(n / 30.4)}か月`), owned: (n, m) => `${m}個中 ${n}個を持っています`, plusNo: "Plusでも割引はありません。みんな同じ値段です。",
    wishSet: "願いにする", wishIs: "あなたの願い", wishL: "あなたの願い：", mile: (p, n) => `「${n}」まで${p}%のところまで来ました！`, back: (n) => `願いが約${n}日遠くなります`,
    paidOnly: "パックのTanìはショップ全体で使えますが、幻のアイテムだけは使えません。幻のアイテムは、セルフケアでためたTanìだけで買えます。", paidBlock: "幻のアイテムは、セルフケアでためたTanìだけで買えます。",
    items: { x_crown: "オーロラの王冠", x_cloak: "彗星のマント", x_tree: "願いの木", x_fountain: "月の噴水", x_galaxy: "銀河", x_aura: "星のオーラ" } },
  ko: { chip: "환상", title: "환상의 보물", intro: "상점에서 가장 아름다운 것들이에요. Tanì로만 살 수 있고, 오래 모아야 해요. 여러 달 동안 나를 돌본 끝에 받는 선물이에요.",
    have: (a, b) => `Tanì ${b}개 중 ${a}개`, pace: (n) => (n < 60 ? `오늘 속도라면: 약 ${n}일` : `오늘 속도라면: 약 ${Math.round(n / 30.4)}개월`), owned: (n, m) => `${m}개 중 ${n}개 보유`, plusNo: "Plus도 할인은 없어요. 모두에게 같은 가격이에요.",
    wishSet: "소원으로 정하기", wishIs: "나의 소원", wishL: "나의 소원: ", mile: (p, n) => `${n}까지 ${p}% 왔어요!`, back: (n) => `소원이 약 ${n}일 멀어져요`,
    paidOnly: "패키지로 산 Tanì는 상점 어디서나 쓸 수 있지만, 환상의 보물에는 쓸 수 없어요. 환상의 보물은 나를 돌보며 모은 Tanì로만 살 수 있어요.", paidBlock: "환상의 보물은 나를 돌보며 모은 Tanì로만 살 수 있어요.",
    items: { x_crown: "오로라 왕관", x_cloak: "혜성 망토", x_tree: "소원 나무", x_fountain: "달의 분수", x_galaxy: "은하수", x_aura: "별빛 오라" } },
  zh: { chip: "稀世珍品", title: "稀世珍品", intro: "整个商店里最美的东西。只能用 Tanì 购买，需要攒很久：它们是许多个月好好照顾自己的见证。",
    have: (a, b) => `已有 ${a} / ${b} Tanì`, pace: (n) => (n < 60 ? `按你今天的节奏：大约 ${n} 天` : `按你今天的节奏：大约 ${Math.round(n / 30.4)} 个月`), owned: (n, m) => `已拥有 ${n} / ${m}`, plusNo: "Plus 也不打折：对所有人都是同样的价格。",
    wishSet: "设为心愿", wishIs: "你的心愿", wishL: "你的心愿：", mile: (p, n) => `离「${n}」已经走了 ${p}%！`, back: (n) => `你的心愿会推迟大约 ${n} 天`,
    paidOnly: "礼包里的 Tanì 可以在整个商店使用，但不能用来买稀世珍品：稀世珍品只能用照顾自己赚到的 Tanì 购买。", paidBlock: "稀世珍品只能用照顾自己赚到的 Tanì 购买。",
    items: { x_crown: "极光王冠", x_cloak: "彗星斗篷", x_tree: "许愿树", x_fountain: "月光喷泉", x_galaxy: "银河", x_aura: "星光光环" } },
  zht: { chip: "稀世珍品", title: "稀世珍品", intro: "整個商店裡最美的東西。只能用 Tanì 購買，需要存很久：它們是許多個月好好照顧自己的見證。",
    have: (a, b) => `已有 ${a} / ${b} Tanì`, pace: (n) => (n < 60 ? `照你今天的節奏：大約 ${n} 天` : `照你今天的節奏：大約 ${Math.round(n / 30.4)} 個月`), owned: (n, m) => `已擁有 ${n} / ${m}`, plusNo: "Plus 也不打折：對所有人都是同樣的價格。",
    wishSet: "設為心願", wishIs: "你的心願", wishL: "你的心願：", mile: (p, n) => `離「${n}」已經走了 ${p}%！`, back: (n) => `你的心願會延後大約 ${n} 天`,
    paidOnly: "禮包裡的 Tanì 可以在整個商店使用，但不能用來買稀世珍品：稀世珍品只能用照顧自己賺到的 Tanì 購買。", paidBlock: "稀世珍品只能用照顧自己賺到的 Tanì 購買。",
    items: { x_crown: "極光王冠", x_cloak: "彗星斗篷", x_tree: "許願樹", x_fountain: "月光噴泉", x_galaxy: "銀河", x_aura: "星光光環" } },
  ru: { chip: "Редчайший", title: "Редчайшие вещи", intro: "Самые красивые вещи во всём магазине. Их можно получить только за Tanì, если долго копить: это награда за много месяцев заботы о себе.",
    have: (a, b) => `У тебя ${a} из ${b} Tanì`, pace: (n) => (n < 60 ? `В сегодняшнем темпе: примерно ${n} дн.` : `В сегодняшнем темпе: примерно ${Math.round(n / 30.4)} мес.`), owned: (n, m) => `У тебя ${n} из ${m}`, plusNo: "Plus не даёт скидку: для всех цена одинаковая.",
    wishSet: "Сделать мечтой", wishIs: "Твоя мечта", wishL: "Твоя мечта: ", mile: (p, n) => `Пройдено ${p}% пути к вещи «${n}»!`, back: (n) => `Твоя мечта отдалится примерно на ${n} дн.`,
    paidOnly: "Tanì из наборов подходят для всего магазина, кроме редчайших вещей: их можно купить только за Tanì, заработанные заботой о себе.", paidBlock: "Редчайшие вещи можно купить только за Tanì, заработанные заботой о себе.",
    items: { x_crown: "Корона северного сияния", x_cloak: "Плащ кометы", x_tree: "Дерево желаний", x_fountain: "Лунный фонтан", x_galaxy: "Галактика", x_aura: "Звёздная аура" } },
  pl: { chip: "Unikatowy", title: "Unikaty", intro: "Najpiękniejsze rzeczy w całym sklepie. Można je zdobyć tylko za Tanì, długo oszczędzając: to ukoronowanie wielu miesięcy dbania o siebie.",
    have: (a, b) => `Masz ${a} z ${b} Tanì`, pace: (n) => (n < 60 ? `W dzisiejszym tempie: około ${n} dni` : `W dzisiejszym tempie: około ${Math.round(n / 30.4)} mies.`), owned: (n, m) => `Masz ${n} z ${m}`, plusNo: "Plus nie daje zniżki: dla wszystkich cena jest taka sama.",
    wishSet: "Ustaw jako marzenie", wishIs: "Twoje marzenie", wishL: "Twoje marzenie: ", mile: (p, n) => `Masz już ${p}% drogi do: ${n}!`, back: (n) => (n === 1 ? "Twoje marzenie oddali się o około 1 dzień" : `Twoje marzenie oddali się o około ${n} dni`),
    paidOnly: "Tanì z pakietów działają w całym sklepie oprócz Unikatów: te kupisz tylko za Tanì zdobyte dzięki dbaniu o siebie.", paidBlock: "Unikaty kupisz tylko za Tanì zdobyte dzięki dbaniu o siebie.",
    items: { x_crown: "Korona zorzy", x_cloak: "Płaszcz komety", x_tree: "Drzewo życzeń", x_fountain: "Księżycowa fontanna", x_galaxy: "Galaktyka", x_aura: "Gwiezdna aura" } },
  nl: { chip: "Onvindbaar", title: "Onvindbare schatten", intro: "De mooiste dingen van de hele winkel. Je krijgt ze alleen met Tanì, door lang te sparen: ze bekronen vele maanden zorg voor jezelf.",
    have: (a, b) => `Je hebt ${a} van ${b} Tanì`, pace: (n) => (n < 60 ? `In je tempo van vandaag: ongeveer ${n} dagen` : `In je tempo van vandaag: ongeveer ${Math.round(n / 30.4)} maanden`), owned: (n, m) => `Je hebt er ${n} van ${m}`, plusNo: "Plus geeft geen korting: ze kosten voor iedereen hetzelfde.",
    wishSet: "Maak het mijn wens", wishIs: "Jouw wens", wishL: "Jouw wens: ", mile: (p, n) => `Je bent op ${p}% van de weg naar ${n}!`, back: (n) => (n === 1 ? "Je wens schuift ongeveer 1 dag op" : `Je wens schuift ongeveer ${n} dagen op`),
    paidOnly: "Tanì uit pakketten gelden in de hele winkel behalve voor de onvindbare schatten: die koop je alleen met Tanì die je verdient door goed voor jezelf te zorgen.", paidBlock: "Onvindbare schatten koop je alleen met Tanì die je verdient door goed voor jezelf te zorgen.",
    items: { x_crown: "Noorderlichtkroon", x_cloak: "Kometencape", x_tree: "Wensboom", x_fountain: "Maanfontein", x_galaxy: "Melkweg", x_aura: "Sterrenaura" } },
  tr: { chip: "Bulunmaz", title: "Bulunmaz hazineler", intro: "Tüm dükkândaki en güzel şeyler. Yalnızca Tanì ile, uzun süre biriktirerek alınır: aylarca kendine iyi bakmanın tacıdır.",
    have: (a, b) => `${a} / ${b} Tanì sende`, pace: (n) => (n < 60 ? `Bugünkü hızınla: yaklaşık ${n} gün` : `Bugünkü hızınla: yaklaşık ${Math.round(n / 30.4)} ay`), owned: (n, m) => `${m} taneden ${n} tanesi sende`, plusNo: "Plus indirim yapmaz: herkes için fiyat aynı.",
    wishSet: "Dileğim yap", wishIs: "Dileğin", wishL: "Dileğin: ", mile: (p, n) => `${n} yolunun %${p} kadarını geldin!`, back: (n) => `Dileğin yaklaşık ${n} gün uzaklaşır`,
    paidOnly: "Paketlerden gelen Tanì dükkânın her yerinde geçer, bulunmaz hazineler hariç: onlar yalnızca kendine bakarak kazandığın Tanì ile alınır.", paidBlock: "Bulunmaz hazineler yalnızca kendine bakarak kazandığın Tanì ile alınır.",
    items: { x_crown: "Kutup ışığı tacı", x_cloak: "Kuyruklu yıldız pelerini", x_tree: "Dilek ağacı", x_fountain: "Ay çeşmesi", x_galaxy: "Galaksi", x_aura: "Yıldız aurası" } }
};
const xv = () => XV[S.lang] || XV.en;

/* ---------- Catalogo ---------- */
{
  const KIND = { x_crown: "wear", x_cloak: "wear", x_tree: "furn", x_fountain: "furn", x_galaxy: "wall", x_aura: "furn" };
  XV_IDS.forEach((id) => { if (!SHOP.find((s) => s.id === id)) SHOP.push({ id, kind: KIND[id], price: XV_PRICE[id], rar: "x", xv: true }); });
  Object.assign(SLOT, { x_tree: "plant", x_fountain: "floorR", x_aura: "aura" });
  Object.assign(GROUP, { x_tree: "plants", x_fountain: "floor" });
  W20_ACC.x_cloak = "neck";
  Object.keys(T).forEach((l) => { const x = XV[l] || XV.en; T[l].items = T[l].items || {}; Object.assign(T[l].items, x.items); if (T[l].rar) T[l].rar.x = x.chip; });
}
const xvOn = () => !(typeof REDUCED !== "undefined" && REDUCED) && !(typeof CALM !== "undefined" && CALM) && !(typeof isLite === "function" && isLite());

/* ---------- Disegni ---------- */
const xf = (n) => +n.toFixed(2);
/* stella a quattro punte morbida (luccichio) */
const xSpark = (x, y, r, c, cls = "", d = 0) => `<path class="${cls}"${d ? ` style="animation-delay:${d}s"` : ""} d="M${x} ${xf(y - r)} Q${xf(x + r * 0.16)} ${xf(y - r * 0.16)} ${xf(x + r)} ${y} Q${xf(x + r * 0.16)} ${xf(y + r * 0.16)} ${x} ${xf(y + r)} Q${xf(x - r * 0.16)} ${xf(y + r * 0.16)} ${xf(x - r)} ${y} Q${xf(x - r * 0.16)} ${xf(y - r * 0.16)} ${x} ${xf(y - r)} Z" fill="${c}"/>`;
const xStar5 = (x, y, r, k = 0.45) => { let d = ""; for (let i = 0; i < 10; i++) { const a = ((-90 + i * 36) * Math.PI) / 180, rr = i % 2 ? r * k : r; d += (i ? "L" : "M") + xf(x + rr * Math.cos(a)) + " " + xf(y + rr * Math.sin(a)); } return d + "Z"; };
/* gradiente "aurora" (verde acqua, azzurro, viola, rosa) */
const xAurora = (id, x1 = "0", y1 = "1", x2 = "0", y2 = "0") => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#7FF0C8"/><stop offset=".36" stop-color="#7CC8F2"/><stop offset=".7" stop-color="#B79CF2"/><stop offset="1" stop-color="#F7B6E0"/></linearGradient>`;

/* 1) Corona dell'aurora (cappello). b = linea della tesa, centro x = 100 */
HAT_ART.x_crown = (b) => {
  const au = nid("xca"), gd = nid("xcg"), hl = nid("xch"), cp = nid("xcc"), sw = nid("xcs");
  const top = (x) => { const t = (x - 64) / 72; return b + 2 - 28 * t * (1 - t) - 9.5; };
  const sp = [[73, 15, 6.4], [86.5, 25, 7.4], [100, 36, 8.6], [113.5, 25, 7.4], [127, 15, 6.4]];
  const shape = ([x, h, w]) => { const y0 = top(x) + 2; return `M${xf(x - w)} ${xf(y0)} L${xf(x - w * 0.86)} ${xf(y0 - h * 0.58)} L${x} ${xf(y0 - h)} L${xf(x + w * 0.86)} ${xf(y0 - h * 0.58)} L${xf(x + w)} ${xf(y0)} Z`; };
  let o = `<defs>${xAurora(au)}<linearGradient id="${gd}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A6"/><stop offset=".45" stop-color="#F2B33D"/><stop offset="1" stop-color="#B9761C"/></linearGradient>`
    + `<radialGradient id="${hl}" cx="50%" cy="60%" r="50%"><stop offset="0" stop-color="#FFF3C9" stop-opacity=".75"/><stop offset=".55" stop-color="#C9F2E4" stop-opacity=".28"/><stop offset="1" stop-color="#C9F2E4" stop-opacity="0"/></radialGradient>`
    + `<clipPath id="${cp}">${sp.map((s) => `<path d="${shape(s)}"/>`).join("")}</clipPath>`
    + `<linearGradient id="${sw}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  o += `<g class="xa">`;
  o += `<ellipse class="xpl" cx="100" cy="${b - 22}" rx="56" ry="36" fill="url(#${hl})"/>`;
  /* nastro d'aurora dietro le punte */
  o += `<path class="xwv" d="M58 ${b - 14} C72 ${b - 36} 86 ${b - 6} 100 ${b - 28} C114 ${b - 48} 128 ${b - 14} 142 ${b - 34}" stroke="url(#${au})" stroke-width="6" stroke-linecap="round" fill="none" opacity=".55"/>`;
  /* punte di cristallo: faccia chiara a sinistra, scura a destra, filo di luce */
  sp.forEach((s) => { const [x, h, w] = s; const y0 = top(x) + 2; o += `<path d="${shape(s)}" fill="url(#${au})"/><path d="M${x} ${xf(y0 - h)} L${xf(x + w * 0.86)} ${xf(y0 - h * 0.58)} L${xf(x + w)} ${xf(y0)} L${x} ${xf(y0)} Z" fill="#3B2E7A" opacity=".2"/><path d="M${xf(x - w * 0.5)} ${xf(y0 - h * 0.3)} L${xf(x - w * 0.12)} ${xf(y0 - h * 0.86)}" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/><path d="${shape(s)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".9" stroke-linejoin="round"/>`; });
  /* luccichio che passa sulle punte */
  o += `<g clip-path="url(#${cp})"><rect class="xsw" x="40" y="${b - 60}" width="26" height="70" fill="url(#${sw})" transform="skewX(-18)"/></g>`;
  /* fascia d'oro con gemme */
  o += `<path d="M64 ${b + 2} Q100 ${b - 12} 136 ${b + 2} L136 ${b - 8} Q100 ${b - 22} 64 ${b - 8} Z" fill="url(#${gd})"/>`;
  o += `<path d="M66 ${b - 6.6} Q100 ${b - 20.4} 134 ${b - 6.6}" stroke="#FFF4C8" stroke-width="1.6" fill="none" opacity=".85"/><path d="M64.5 ${b + 1.2} Q100 ${b - 12.6} 135.5 ${b + 1.2}" stroke="#8E5A12" stroke-width="1.2" fill="none" opacity=".55"/>`;
  [[76, "#E2454A"], [88, "#5FA8E8"], [100, "#7FF0C8"], [112, "#5FA8E8"], [124, "#E2454A"]].forEach(([x, c], i) => { const y = top(x) + 6.2; o += `<ellipse cx="${x}" cy="${xf(y)}" rx="${i === 2 ? 3.6 : 2.7}" ry="${i === 2 ? 3 : 2.3}" fill="${c}" stroke="#8E5A12" stroke-width=".8"/><circle cx="${xf(x - 0.9)}" cy="${xf(y - 0.9)}" r=".9" fill="#fff" opacity=".9"/>`; });
  /* stella in cima e luccichii */
  o += `<path class="xtw" d="${xStar5(100, top(100) - 35.5, 5.2)}" fill="#FFE08A" stroke="#E0A92E" stroke-width=".9" stroke-linejoin="round"/>`;
  o += xSpark(60, b - 30, 3.4, "#fff", "xtw", 0.6) + xSpark(141, b - 24, 3, "#FFF3C9", "xtw", 1.3) + xSpark(118, b - 46, 2.4, "#fff", "xtw", 2.0) + xSpark(80, b - 44, 2.2, "#E6FFF6", "xtw", 0.2);
  return o + `</g>`;
};
HAT_VB.x_crown = "44 34 112 66";

/* 2) Mantello della cometa (al collo): dietro il corpo un mantello notte-aurora con la scia di una cometa */
W20_ART.x_cloak = {
  back: (h) => {
    const g1 = nid("xkg"), g2 = nid("xka"), cl = nid("xkc"), sw = nid("xks");
    const d = `M-34 -1 C-60 ${xf(h * 0.12)} -72 ${xf(h * 0.5)} -78 ${h} Q-62 ${h + 6} -48 ${h - 1} Q-31 ${h + 6} -15 ${h} L15 ${h} Q31 ${h + 6} 48 ${h - 1} Q62 ${h + 6} 78 ${h} C72 ${xf(h * 0.5)} 60 ${xf(h * 0.12)} 34 -1 Z`;
    let o = `<defs><linearGradient id="${g1}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2152"/><stop offset=".6" stop-color="#2D2A6E"/><stop offset="1" stop-color="#4A2F7E"/></linearGradient>${xAurora(g2, "0", "0", "1", "1")}<clipPath id="${cl}"><path d="${d}"/></clipPath><linearGradient id="${sw}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
    o += `<g class="xa"><path d="${d}" fill="url(#${g1})"/><g clip-path="url(#${cl})">`;
    /* scia della cometa che attraversa il mantello */
    o += `<path d="M-80 ${xf(h * 0.92)} C-40 ${xf(h * 0.6)} 10 ${xf(h * 0.5)} 64 ${xf(h * 0.18)}" stroke="url(#${g2})" stroke-width="13" fill="none" stroke-linecap="round" opacity=".5"/><path d="M-80 ${xf(h * 0.92)} C-40 ${xf(h * 0.6)} 10 ${xf(h * 0.5)} 64 ${xf(h * 0.18)}" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/>`;
    o += `<circle cx="64" cy="${xf(h * 0.18)}" r="7" fill="#FFF6D6"/><circle class="xpl" cx="64" cy="${xf(h * 0.18)}" r="13" fill="#FFF3C9" opacity=".35"/>`;
    [[-56, 0.3, 2.4], [-30, 0.84, 2], [-8, 0.28, 1.6], [22, 0.78, 2.4], [44, 0.56, 1.8], [-62, 0.66, 1.6], [6, 0.94, 1.4], [52, 0.9, 2]].forEach(([x, k, r], i) => { o += i % 2 ? `<circle class="xtw" style="animation-delay:${(i * 0.37).toFixed(2)}s" cx="${x}" cy="${xf(h * k)}" r="${r * 0.7}" fill="#fff"/>` : xSpark(x, xf(h * k), r * 1.5, "#FFE7A0", "xtw", +(i * 0.41).toFixed(2)); });
    o += `<rect class="xsw" x="-110" y="-4" width="34" height="${h + 12}" fill="url(#${sw})" transform="skewX(-14)"/></g>`;
    /* bordo dorato e pieghe */
    o += `<path d="M-78 ${h} Q-62 ${h + 6} -48 ${h - 1} Q-31 ${h + 6} -15 ${h} L15 ${h} Q31 ${h + 6} 48 ${h - 1} Q62 ${h + 6} 78 ${h}" stroke="#F2C14E" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`;
    o += [1, -1].map((s) => `<path d="M${-60 * s} ${xf(h * 0.3)} C${-64 * s} ${xf(h * 0.55)} ${-66 * s} ${xf(h * 0.8)} ${-65 * s} ${h + 1}" stroke="#141840" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M${-38 * s} 1 C${-60 * s} ${xf(h * 0.14)} ${-70 * s} ${xf(h * 0.5)} ${-75 * s} ${h - 2}" stroke="#9FE9FF" stroke-opacity=".35" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join("");
    return o + `</g>`;
  },
  front: () => {
    const g = nid("xkb");
    return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3F95"/><stop offset="1" stop-color="#232766"/></linearGradient></defs>${w20Band(`url(#${g})`, 6)}<path d="M-33 0.6 Q0 15.4 33 0.6" stroke="#F2C14E" stroke-width="1.2" stroke-dasharray="2.4 3" fill="none" stroke-linecap="round"/>`
      + `<g class="xa"><circle class="xpl" cx="0" cy="8.6" r="11" fill="#C9F2E4" opacity=".35"/><path d="${xStar5(0, 8.6, 8.4, 0.5)}" fill="#F2B33D" stroke="#9A6516" stroke-width="1" stroke-linejoin="round"/><path d="${xStar5(0, 8.6, 5, 0.5)}" fill="#7FF0C8"/><circle cx="-1.6" cy="6.6" r="1.4" fill="#fff" opacity=".9"/>${xSpark(9, 1, 2.4, "#fff", "xtw", 0.9)}</g>`;
  },
  icon: { vb: "-86 -10 172 100", h: 78 }
};

/* 3) e 4) Pezzi della stanza: Albero dei desideri (vaso a destra) e Fontana di luna (pavimento a destra) */
const XV_ROOM = {
  x_tree: (lit) => {
    const lf = nid("xtl"), tr = nid("xtt"), gl = nid("xtg"), pot = nid("xtp");
    let o = `<defs><radialGradient id="${lf}" gradientUnits="userSpaceOnUse" cx="304" cy="122" r="74"><stop offset="0" stop-color="#C9F7E4"/><stop offset=".5" stop-color="#8FD8C8"/><stop offset="1" stop-color="#6E8FD8"/></radialGradient><linearGradient id="${tr}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8C27A"/><stop offset=".55" stop-color="#C08A3E"/><stop offset="1" stop-color="#8E5E26"/></linearGradient><radialGradient id="${gl}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFF1C2" stop-opacity=".9"/><stop offset="1" stop-color="#FFF1C2" stop-opacity="0"/></radialGradient><linearGradient id="${pot}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F7F1FF"/><stop offset=".6" stop-color="#D9CDF2"/><stop offset="1" stop-color="#B3A2DE"/></linearGradient></defs><g class="xa">`;
    o += `<ellipse cx="320" cy="266" rx="30" ry="5" fill="#000" opacity=".14"/>`;
    o += `<circle class="xpl" cx="320" cy="150" r="${lit ? 64 : 50}" fill="url(#${gl})" opacity="${lit ? 0.55 : 0.4}"/>`;
    /* tronco intrecciato e rami */
    o += `<path d="M314 238 C309 220 318 206 312 190 C307 176 316 164 322 152 M326 238 C330 222 322 208 328 192 C333 178 326 166 320 154" stroke="url(#${tr})" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M316 196 C304 190 296 182 292 170 M326 186 C338 180 346 172 350 160 M320 172 C312 164 308 154 306 144 M322 166 C332 158 336 148 338 138" stroke="url(#${tr})" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M312 230 C310 216 316 206 312 194" stroke="#fff" stroke-width="1.3" opacity=".35" fill="none" stroke-linecap="round"/>`;
    /* chioma: un solo volume (sfumatura nello spazio della stanza), foglie, fiori e frutti-stella luminosi */
    const C = [[296, 160, 16], [318, 140, 21], [342, 150, 18], [330, 124, 15], [305, 130, 14], [350, 168, 12], [288, 176, 11], [322, 164, 16], [312, 152, 15], [338, 136, 12]];
    o += `<g>${C.map(([x, y, r]) => `<circle cx="${x}" cy="${y + 4}" r="${r}"/>`).join("")}</g>`.replace("<g>", `<g fill="#3F5BA6" opacity=".5">`);
    o += `<g fill="url(#${lf})">${C.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g>`;
    for (let i = 0; i < 26; i++) { const x = 286 + ((i * 37) % 66), y = 116 + ((i * 23) % 66); const a = (i * 47) % 180; o += `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="1.7" fill="${i % 3 ? "#5FB8A6" : "#E6FFF6"}" opacity="${i % 3 ? 0.5 : 0.7}" transform="rotate(${a} ${x} ${y})"/>`; }
    [[300, 138], [326, 128], [344, 158], [292, 166], [334, 146], [312, 162], [320, 118]].forEach(([x, y], i) => { o += [0, 72, 144, 216, 288].map((a) => `<circle cx="${xf(x + 2.6 * Math.cos((a * Math.PI) / 180))}" cy="${xf(y + 2.6 * Math.sin((a * Math.PI) / 180))}" r="1.9" fill="${i % 2 ? "#FFFFFF" : "#F7B6E0"}"/>`).join("") + `<circle cx="${x}" cy="${y}" r="1.3" fill="#FFD25E"/>`; });
    [[306, 148], [338, 128], [348, 172]].forEach(([x, y], i) => { o += `<circle class="xpl" style="animation-delay:${i * 0.7}s" cx="${x}" cy="${y}" r="6" fill="#FFF3C9" opacity=".55"/><path d="${xStar5(x, y, 4.2)}" fill="#FFE08A" stroke="#E0A92E" stroke-width=".7" stroke-linejoin="round"/>`; });
    o += `<path d="M280 168 A40 40 0 0 1 318 118" stroke="#fff" stroke-width="2.4" opacity=".55" fill="none" stroke-linecap="round"/><path d="M354 148 A36 36 0 0 1 356 172" stroke="#FFE7F4" stroke-width="2" opacity=".6" fill="none" stroke-linecap="round"/>`;
    /* lanterne appese che oscillano */
    [[298, 172, 0], [336, 168, 0.8], [318, 182, 1.6], [350, 182, 0.4]].forEach(([x, y, d]) => { o += `<g class="xsy" style="animation-delay:${d}s"><path d="M${x} ${y - 10} V${y - 3}" stroke="#8E5E26" stroke-width="1"/><circle cx="${x}" cy="${y + 3}" r="9" fill="#FFE3A3" opacity="${lit ? 0.5 : 0.3}"/><path d="M${x - 4} ${y - 3} H${x + 4} L${x + 5} ${y + 7} Q${x} ${y + 10} ${x - 5} ${y + 7} Z" fill="#FFD27A" stroke="#C9861F" stroke-width=".9"/><path d="M${x - 2} ${y} V${y + 6}" stroke="#fff" stroke-width="1" opacity=".7"/></g>`; });
    /* lucciole che salgono */
    [[292, 142, 0], [346, 132, 1.1], [326, 110, 2.2], [304, 118, 0.6], [352, 150, 1.7]].forEach(([x, y, d]) => { o += `<circle class="xfl" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="1.8" fill="#FFF6C2"/>`; });
    /* vaso di porcellana con bordo d'oro */
    o += `<path d="M300 236 H340 L335 264 Q320 270 305 264 Z" fill="url(#${pot})"/><rect x="297" y="232" width="46" height="7" rx="3.5" fill="#F2B33D"/><rect x="297" y="232" width="46" height="2" rx="1" fill="#fff" opacity=".5"/><path d="M304 248 Q320 256 336 248" stroke="#B79CF2" stroke-width="1.4" fill="none"/><path d="${xStar5(320, 252, 3.2)}" fill="#F2B33D"/><path d="M304 240 L307 262" stroke="#fff" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>`;
    o += xSpark(286, 122, 3, "#fff", "xtw", 0.3) + xSpark(354, 120, 2.6, "#FFF3C9", "xtw", 1.5);
    return o + `</g>`;
  },
  x_fountain: (lit) => {
    const m1 = nid("xfm"), w1 = nid("xfw"), gl = nid("xfg");
    let o = `<defs><linearGradient id="${m1}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#E6E1F2"/><stop offset="1" stop-color="#B9B1D6"/></linearGradient><linearGradient id="${w1}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9F2FF"/><stop offset="1" stop-color="#7CC4EC"/></linearGradient><radialGradient id="${gl}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#E6F6FF" stop-opacity=".9"/><stop offset="1" stop-color="#E6F6FF" stop-opacity="0"/></radialGradient></defs><g class="xa">`;
    o += `<ellipse cx="258" cy="268" rx="36" ry="5.5" fill="#000" opacity=".14"/><circle class="xpl" cx="258" cy="214" r="${lit ? 40 : 30}" fill="url(#${gl})" opacity="${lit ? 0.6 : 0.42}"/>`;
    /* vasca grande */
    o += `<path d="M224 248 Q258 242 292 248 L288 262 Q258 270 228 262 Z" fill="url(#${m1})"/><ellipse cx="258" cy="248" rx="34" ry="6" fill="url(#${w1})"/><ellipse cx="258" cy="247" rx="34" ry="6" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M228 252 L230 260" stroke="#fff" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>`;
    /* colonna e vasca piccola */
    o += `<path d="M252 246 L254 226 H262 L264 246 Z" fill="url(#${m1})"/><path d="M238 226 Q258 221 278 226 L275 233 Q258 238 241 233 Z" fill="url(#${m1})"/><ellipse cx="258" cy="226" rx="20" ry="3.8" fill="url(#${w1})"/>`;
    /* luna in cima */
    o += `<path d="M262 190 A13 13 0 1 0 262 214 A10 10 0 1 1 262 190 Z" fill="#FFF3C9" stroke="#E0C27A" stroke-width="1"/><path d="M255.5 200 q2 1.6 4 0" stroke="#C9A35A" stroke-width="1.1" fill="none" stroke-linecap="round"/><ellipse cx="254" cy="205" rx="1.8" ry="1" fill="#F7B6C8" opacity=".8"/><path d="M257 214 V222" stroke="#E6E1F2" stroke-width="3" stroke-linecap="round"/>`;
    /* getti d'acqua che scorrono */
    [["M252 222 C240 216 236 226 234 246", 0], ["M264 222 C276 216 280 226 282 246", 0.3], ["M246 230 C238 232 234 238 232 246", 0.6], ["M270 230 C278 232 282 238 284 246", 0.9]].forEach(([d, del]) => { o += `<path class="xfw" style="animation-delay:${del}s" d="${d}" stroke="#BFEFFF" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-dasharray="5 6"/>`; });
    o += xSpark(238, 196, 3, "#fff", "xtw", 0.2) + xSpark(282, 204, 2.6, "#E6F6FF", "xtw", 1.1) + xSpark(270, 186, 2, "#FFF3C9", "xtw", 1.9);
    return o + `</g>`;
  }
};
const _furnAltXV = furnAlt;
furnAlt = function (slot, furn, lit, lampId) {
  let o = _furnAltXV(slot, furn, lit, lampId);
  if (slot === "plant" && furn.includes("x_tree")) o += XV_ROOM.x_tree(lit);
  if (slot === "floorR" && furn.includes("x_fountain")) o += XV_ROOM.x_fountain(lit);
  return o;
};
Object.assign(ALT_VB, { x_tree: "270 98 96 176", x_fountain: "214 178 88 96" });

/* 5) Galassia (parete) */
WALLS.x_galaxy = ["#121A44", "#2A1D5C"]; WALL_STYLE.x_galaxy = "xgalaxy";
const _wallPatternXV = wallPattern;
wallPattern = function (style, w1, w2, top = 0) {
  if (style !== "xgalaxy") return _wallPatternXV(style, w1, w2, top);
  const n1 = nid("xgn"), n2 = nid("xgp"), sp = nid("xgs"), H = 152 + top;
  let o = `<defs><radialGradient id="${n1}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F29BD8" stop-opacity=".55"/><stop offset="1" stop-color="#F29BD8" stop-opacity="0"/></radialGradient><radialGradient id="${n2}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#6FE0D0" stop-opacity=".45"/><stop offset="1" stop-color="#6FE0D0" stop-opacity="0"/></radialGradient><radialGradient id="${sp}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFF6D6"/><stop offset=".3" stop-color="#E9D6FF" stop-opacity=".8"/><stop offset="1" stop-color="#9C7CF2" stop-opacity="0"/></radialGradient></defs><g class="xa">`;
  o += `<rect x="0" y="${-top}" width="360" height="${H}" fill="${w1}"/><rect x="0" y="${-top}" width="360" height="${H}" fill="${w2}" opacity=".5"/>`;
  o += `<ellipse cx="70" cy="${44 - top / 2}" rx="110" ry="56" fill="url(#${n1})"/><ellipse cx="290" cy="${96 - top / 3}" rx="130" ry="62" fill="url(#${n2})"/><ellipse cx="34" cy="${70 - top / 3}" rx="60" ry="34" fill="url(#${n2})"/>`;
  /* via lattea diagonale */
  o += `<path d="M-20 ${130 - top / 2} C80 ${90 - top / 2} 200 ${70 - top / 2} 380 ${10 - top}" stroke="#E9D6FF" stroke-width="34" opacity=".12" fill="none" stroke-linecap="round"/><path d="M-20 ${130 - top / 2} C80 ${90 - top / 2} 200 ${70 - top / 2} 380 ${10 - top}" stroke="#fff" stroke-width="8" opacity=".1" fill="none" stroke-linecap="round"/>`;
  /* galassia a spirale */
  o += `<g transform="translate(78 ${40 - top / 3}) rotate(-24)"><ellipse rx="34" ry="13" fill="url(#${sp})"/><path d="M-26 2 C-12 12 14 10 24 -2 M26 -2 C12 -12 -14 -10 -24 2" stroke="#E9D6FF" stroke-width="2" opacity=".55" fill="none" stroke-linecap="round"/><ellipse rx="5" ry="3" fill="#FFF6D6"/></g>`;
  for (let i = 0; i < 46; i++) { const x = (i * 71 + 17) % 360, y = -top + ((i * 43 + 11) % H); const r = i % 7 === 0 ? 1.5 : i % 3 ? 0.7 : 1.05; o += i % 6 === 0 ? xSpark(x, y, 3, "#FFF6D6", "xtw", +((i % 9) * 0.31).toFixed(2)) : `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${i % 3 ? 0.55 : 0.85}"/>`; }
  /* stella cadente */
  o += `<g transform="translate(262 ${48 - top / 3}) rotate(-18) scale(.9)"><ellipse rx="34" ry="13" fill="url(#${sp})"/><path d="M-26 2 C-12 12 14 10 24 -2 M26 -2 C12 -12 -14 -10 -24 2" stroke="#E9D6FF" stroke-width="2" opacity=".55" fill="none" stroke-linecap="round"/><ellipse rx="5" ry="3" fill="#FFF6D6"/></g><g class="xsh"><path d="M150 ${30 - top / 2} L194 ${16 - top / 2}" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/><circle cx="194" cy="${16 - top / 2}" r="2.2" fill="#fff"/></g>`;
  return o + `</g>`;
};

/* 6) Aura di stelle (effetto del compagno): luce morbida dietro e una corona di stelline che gira piano */
function xvAuraArt() {
  const g = nid("xag"), r = nid("xar");
  let o = `<defs><radialGradient id="${g}" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="#FFF3C9" stop-opacity=".85"/><stop offset=".55" stop-color="#FFE08A" stop-opacity=".32"/><stop offset="1" stop-color="#FFE08A" stop-opacity="0"/></radialGradient><linearGradient id="${r}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset=".5" stop-color="#C9F2E4"/><stop offset="1" stop-color="#F7B6E0"/></linearGradient></defs><g class="xa xaura">`;
  o += `<circle class="xpl" cx="100" cy="122" r="92" fill="url(#${g})"/>`;
  o += `<g class="xorb"><circle cx="100" cy="122" r="86" fill="none" stroke="none"/><ellipse cx="100" cy="122" rx="84" ry="84" fill="none" stroke="url(#${r})" stroke-width="1.6" stroke-dasharray="2 9" opacity=".7"/>`;
  for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2, x = xf(100 + 84 * Math.cos(a)), y = xf(122 + 84 * Math.sin(a)); o += i % 2 ? `<circle cx="${x}" cy="${y}" r="2.2" fill="#FFF6D6"/>` : `<path d="${xStar5(x, y, 5.4, 0.45)}" fill="#FFD25E" stroke="#E0A92E" stroke-width=".7" stroke-linejoin="round"/>`; }
  o += `</g>`;
  o += xSpark(26, 70, 4, "#fff", "xtw", 0.4) + xSpark(176, 84, 3.4, "#FFF3C9", "xtw", 1.2) + xSpark(172, 168, 3, "#fff", "xtw", 2.1) + xSpark(30, 160, 3, "#E6FFF6", "xtw", 1.6);
  return o + `</g>`;
}
const xvAuraOn = () => { try { const t = typeof tryId !== "undefined" && tryId === "x_aura" && typeof tab !== "undefined" && tab === "home"; return t || (Array.isArray(S.furn) && S.furn.includes("x_aura")); } catch (e) { return false; } };
const _petInnerXV = petInner;
petInner = function (pet, e, hat, st, glow) {
  const o = _petInnerXV(pet, e, hat, st, glow);
  try { if (!pet || pet !== S.pet || !xvAuraOn()) return o; return xvAuraArt() + o; } catch (err) { return o; }
};
/* l'aura e' "indossata" dal compagno: non ha un posto nella stanza, si accende e si spegne dal negozio */
const _itemArtXV = itemArt;
itemArt = function (id) {
  if (id === "x_aura") return `<svg viewBox="2 24 196 196" aria-hidden="true">${xvAuraArt()}<g transform="translate(100 122) scale(.5) translate(-100 -112)">${typeof petInner === "function" && S.pet ? _petInnerXV(S.pet, "felice", null, stage()) : ""}</g></svg>`;
  if (id === "x_cloak") return `<svg viewBox="-86 -10 172 100" aria-hidden="true">${W20_ART.x_cloak.back(78)}${W20_ART.x_cloak.front()}</svg>`;
  return _itemArtXV(id);
};
/* toccare l'aura gia' tua la accende o la spegne (come gli accessori) */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.dataset.shop !== "x_aura") return;
  const s = SHOP.find((x) => x.id === "x_aura"); if (!s || !ownsItem(s)) return;
  ev.stopImmediatePropagation(); tryId = null;
  S.furn = S.furn.includes("x_aura") ? S.furn.filter((x) => x !== "x_aura") : S.furn.concat("x_aura");
  save(); SND.play("sparkle"); keepScroll(render); if (S.furn.includes("x_aura")) { jump(false); burst("star", 8); }
}, true);

/* ---------- Negozio: la vetrina degli Introvabili, in cima a ogni scheda della Casa ---------- */
const _shopListXV = shopList;
shopList = function (kind) { return _shopListXV(kind).filter((s) => !s.xv); };
function xvPace(miss) {
  let d = 0; try { d = dailyTaniGuess(); } catch (e) { d = 0; } if (!(d > 0)) return "";
  return xv().pace(Math.max(1, Math.ceil(miss / d)));
}
function xvShowcase() {
  const x = xv(); const items = XV_IDS.map((id) => SHOP.find((s) => s.id === id)).filter(Boolean);
  const own = items.filter((s) => ownsItem(s)).length; const next = items.filter((s) => !ownsItem(s)).sort((a, b) => a.price - b.price)[0];
  let prog = "";
  if (next) {
    const have = Math.min(S.seeds, next.price), pct = Math.max(0, Math.min(100, (have / next.price) * 100));
    const nf = (n) => n.toLocaleString(loc(), NUMG);
    prog = `<div class="xvprog"><div class="xvbar" role="progressbar" aria-valuemin="0" aria-valuemax="${next.price}" aria-valuenow="${have}" aria-label="${esc(x.have(nf(have), nf(next.price)))}"><i style="width:${pct.toFixed(1)}%"></i></div><p class="small"><b>${esc(x.have(nf(have), nf(next.price)))}</b>${S.seeds < next.price ? ` · ${esc(xvPace(next.price - S.seeds))}` : ""}</p></div>`;
  }
  return `<section class="xvshow" aria-labelledby="xvT"><div class="xvhd"><span class="xvbadge" aria-hidden="true">${xStarIcon()}</span><div><h2 id="xvT">${esc(x.title)}</h2><p class="small">${esc(x.intro)}</p></div></div>${prog}<div class="xvrow">${items.map(shopItem).join("")}</div><p class="small xvfoot">${own ? `${esc(x.owned(own, items.length))} · ` : ""}${esc(x.plusNo)}</p></section>`;
}
const xStarIcon = () => `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="${xStar5(12, 12.6, 10, 0.46)}" fill="#FFE08A" stroke="#C9861F" stroke-width="1.2" stroke-linejoin="round"/><path d="${xStar5(12, 12.6, 5, 0.46)}" fill="#7FF0C8"/></svg>`;
const _viewHomeXV = viewHome;
viewHome = function () {
  const h = _viewHomeXV(); if (!S.pet) return h;
  try {
    const i = h.indexOf('<div class="tabsx" role="tablist">'); if (i < 0) return h;
    const e = h.indexOf("</div>", i); if (e < 0) return h;
    return h.slice(0, e + 6) + xvShowcase() + h.slice(e + 6);
  } catch (err) { return h; }
};
if (!xvOn()) document.documentElement.classList.add("xvstill");

/* ---------- Tanì dei pacchetti: valgono per tutto tranne gli Introvabili ---------- */
/* econ().paid = Tanì arrivati dai pacchetti (anche il raddoppio del primo); econ().spentN = Tanì spesi per tutto il resto.
   Si considerano spesi prima i Tanì dei pacchetti: per un Introvabile valgono saldo - max(0, paid - spentN). */
function xvUsable() { let e; try { e = econ(); } catch (err) { return S.seeds; } const left = Math.max(0, (+e.paid || 0) - (+e.spentN || 0)); return Math.max(0, S.seeds - left); }
const xvPaidLeft = () => S.seeds - xvUsable();
const _creditPackXV = creditPack;
creditPack = async function (x, celebrate) {
  const b = S.seeds; const ok = await _creditPackXV(x, celebrate);
  try { const d = S.seeds - b; if (d > 0) { const e = econ(); e.paid = (+e.paid || 0) + d; save(); } } catch (err) { /* niente */ }
  return ok;
};
/* ogni Tanì speso con un tocco (negozio, albero di Natale, ...) per qualcosa che non e' un Introvabile */
let xvSpendSnap = null;
document.addEventListener("click", () => { xvSpendSnap = { seeds: S.seeds, xv: XV_IDS.filter((id) => S.owned.includes(id)).length }; setTimeout(() => {
  const sn = xvSpendSnap; xvSpendSnap = null; if (!sn) return; const d = sn.seeds - S.seeds; if (d <= 0) return;
  if (XV_IDS.filter((id) => S.owned.includes(id)).length > sn.xv) return;
  try { const e = econ(); if ((+e.paid || 0) > (+e.spentN || 0)) { e.spentN = (+e.spentN || 0) + d; save(); } } catch (err) { /* niente */ }
}, 0); }, true);
/* nel negozio, per gli Introvabili si guardano solo i Tanì utilizzabili */
const xvWithUsable = (fn) => { const real = S.seeds; S.seeds = xvUsable(); try { return fn(); } finally { S.seeds = real; } };
const _shopItemXV2 = shopItem;
shopItem = function (s) { return s && s.xv && !ownsItem(s) ? xvWithUsable(() => _shopItemXV2(s)) : _shopItemXV2(s); };
const _needSheetXV = needSheet;
needSheet = function (s) {
  if (!s || !s.xv) return _needSheetXV(s);
  xvWithUsable(() => _needSheetXV(s));
  /* per un Introvabile i pacchetti non servono: niente proposta di pacchetti, solo la regola detta chiara */
  const box = document.querySelector(".ndsheet"); if (!box) return;
  box.querySelectorAll("p.small").forEach((p) => { if (!p.classList.contains("muted")) p.remove(); });
  const sh = box.querySelector("#ndShop"); if (sh) sh.remove(); const ad = box.querySelector("#adShop"); if (ad) ad.remove();
  const k = box.querySelector("#ndKeep"); if (k) k.insertAdjacentHTML("beforebegin", `<p class="small xvpaid">${esc(xv().paidBlock)}</p>`);
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "tryBuy") return;
  const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId); if (!s || !s.xv) return;
  if (xvUsable() < s.price) { ev.stopImmediatePropagation(); ev.preventDefault(); toast(xv().paidBlock); }
}, true);

/* ---------- Desiderio: un Introvabile da raggiungere, piccola festa al 25 / 50 / 75% (senza Tanì) ---------- */
function xvWish() {
  const w = S.x22wish && typeof S.x22wish === "object" ? S.x22wish : null;
  const own = (id) => S.owned.includes(id);
  /* il desiderio puo' essere un Introvabile o qualsiasi oggetto in vendita che non hai ancora (scelto dalla barra della prova) */
  const ws = w && SHOP.find((s) => s.id === w.id);
  if (ws && !own(w.id) && (ws.xv || (ws.price > 0 && !lockedItem(ws) && !ws.coll))) return w;
  const next = XV_IDS.map((id) => SHOP.find((s) => s.id === id)).filter((s) => s && !own(s.id)).sort((a, b) => a.price - b.price)[0];
  if (!next) return null;
  S.x22wish = { id: next.id, m: xvMileNow(next) }; save(); return S.x22wish;
}
const xvPct = (s) => (s ? Math.max(0, Math.min(100, ((s.xv ? xvUsable() : S.seeds) / s.price) * 100)) : 0);
const xvMileNow = (s) => [25, 50, 75].filter((p) => xvPct(s) >= p).pop() || 0;
function xvSetWish(id) { const s = SHOP.find((x) => x.id === id); if (!s || S.owned.includes(id) || !(s.xv || (s.price > 0 && !lockedItem(s) && !s.coll))) return; S.x22wish = { id, m: xvMileNow(s) }; save(); }
let xvMileT = 0;
function xvMileCheck() {
  if (!S.pet || layer.innerHTML || S.away) return; const w = xvWish(); if (!w) return; const s = SHOP.find((x) => x.id === w.id); if (!s) return;
  /* (critica fase 2) ogni traguardo si festeggia una volta sola per desiderio: se spendi e poi lo riraggiungi, niente festa doppia */
  const m = xvMileNow(s); if (m <= (w.m || 0)) return;
  w.m = m; save();
  toast(xv().mile(m, (L().items || {})[s.id] || s.id)); try { SND.logoChime(0); } catch (e) { /* niente */ }
  if (anim) { try { jump(true); burst("confetti", 22); } catch (e) { /* niente */ } }
}
const _renderXV = render;
render = function (...a) { const r = _renderXV.apply(this, a); clearTimeout(xvMileT); xvMileT = setTimeout(xvMileCheck, 700); return r; };
/* nella barra della prova: per un Introvabile "Fissa come desiderio"; per gli altri oggetti, di quanti giorni si allontana il desiderio */
const _tryBarXV = tryBar;
tryBar = function () {
  const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId); if (!s) return _tryBarXV();
  const x = xv();
  if (s.xv) {
    let h = xvWithUsable(() => _tryBarXV()); if (ownsItem(s) || xvUsable() >= s.price) return h;
    /* non basta ancora: al posto del pulsante spento, "ne mancano N" scritto sotto il nome e il pulsante del desiderio */
    const miss = (s.price - xvUsable()).toLocaleString(loc(), NUMG);
    h = h.replace(/<button class="btn( gold)?" (disabled|id="getTani2")>[\s\S]*?<\/button>/, "").replace(/<b>([^<]*)<\/b><\/div>/, (m, nm) => `<span class="xvtx"><b>${nm}</b><small class="xvback">${esc(L().missSeeds(miss))}</small></span></div>`);
    const w = xvWish(); const mine = w && w.id === s.id;
    const btn = mine ? `<span class="xvwishon">${xStarIcon()}${esc(x.wishIs)}</span>` : `<button class="btn ghost" id="xvWish">${esc(x.wishSet)}</button>`;
    return h.replace('<button class="btn ghost" id="tryCancel">', `${btn}<button class="btn ghost" id="tryCancel">`);
  }
  let h = _tryBarXV();
  /* un oggetto normale che non puoi ancora prendere: lo puoi fissare come desiderio (piccolo pulsante sotto il nome) */
  if (!ownsItem(s) && !lockedItem(s) && !s.coll && s.price > 0 && S.seeds < s.price) {
    const w = xvWish(); const mine = w && w.id === s.id;
    const wb = mine ? `<span class="xvwishon small">${xStarIcon()}${esc(x.wishIs)}</span>` : `<button class="link xvwishlink" id="xvWish" type="button">${xStarIcon()}${esc(x.wishSet)}</button>`;
    return h.replace(/<b>([^<]*)<\/b><\/div>/, (m, nm) => `<span class="xvtx"><b>${nm}</b>${wb}</span></div>`);
  }
  try {
    const w = xvWish(); if (!w || w.id === s.id || ownsItem(s) || lockedItem(s) || !(s.price > 0) || S.seeds < s.price) return h;
    const d = dailyTaniGuess(); if (!(d > 0)) return h; const n = Math.max(1, Math.round(s.price / d));
    h = h.replace(/<b>([^<]*)<\/b><\/div>/, (m, nm) => `<span class="xvtx"><b>${nm}</b><small class="xvback">${esc(x.back(n))}</small></span></div>`);
  } catch (e) { /* niente */ }
  return h;
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b || b.id !== "xvWish") return;
  ev.stopImmediatePropagation(); if (tryId) xvSetWish(tryId); SND.play("sparkle"); keepScroll(render);
}, true);
/* vetrina: il desiderio, la barra con i Tanì utilizzabili e la riga sui pacchetti (solo per chi ne ha comprati, o nel negozio dei Tanì) */
xvShowcase = function () {
  const x = xv(); const items = XV_IDS.map((id) => SHOP.find((s) => s.id === id)).filter(Boolean);
  const own = items.filter((s) => ownsItem(s)).length; const w = xvWish(); const next = w && SHOP.find((s) => s.id === w.id);
  const nf = (n) => n.toLocaleString(loc(), NUMG); let prog = "";
  if (next) {
    const use = next.xv ? xvUsable() : S.seeds, have = Math.min(use, next.price), pct = xvPct(next);
    prog = `<div class="xvprog"><p class="small xvwl">${xStarIcon()}<span>${esc(x.wishL)}<b>${esc((L().items || {})[next.id] || "")}</b></span></p><div class="xvbar" role="progressbar" aria-valuemin="0" aria-valuemax="${next.price}" aria-valuenow="${have}" aria-label="${esc(x.have(nf(have), nf(next.price)))}"><i style="width:${pct.toFixed(1)}%"></i>${[25, 50, 75].map((p) => `<span class="xvm${pct >= p ? " on" : ""}" style="left:${p}%"></span>`).join("")}</div><p class="small"><b>${esc(x.have(nf(have), nf(next.price)))}</b>${use < next.price ? ` · ${esc(xvPace(next.price - use))}` : ""}</p></div>`;
  }
  const paid = xvPaidLeft() > 0 ? `<p class="small xvpaid">${esc(x.paidOnly)}</p>` : "";
  return `<section class="xvshow" aria-labelledby="xvT"><div class="xvhd"><span class="xvbadge" aria-hidden="true">${xStarIcon()}</span><div><h2 id="xvT">${esc(x.title)}</h2><p class="small">${esc(x.intro)}</p></div></div>${prog}${paid}<div class="xvrow">${items.map(shopItem).join("")}</div><p class="small xvfoot">${own ? `${esc(x.owned(own, items.length))} · ` : ""}${esc(x.plusNo)}</p></section>`;
};
/* negozio dei Tanì: la regola dei pacchetti detta prima di comprare */
const _openTaniShopXV = openTaniShop;
openTaniShop = function (src) {
  _openTaniShopXV(src); const box = document.querySelector(".tshop"); if (!box) return;
  const p = document.createElement("p"); p.className = "small xvpaid"; p.textContent = xv().paidOnly;
  const packs = box.querySelector(".pack"); const host = packs ? packs.parentElement : null;
  if (host && host.parentElement) host.parentElement.insertBefore(p, host.nextSibling); else box.appendChild(p);
};
