/* =================== 1.0.9 (fase 2): UNA SOLA MONETA, i Tanì ===================
   Il proprietario (12/11/2026): troppi nomi confondono (Tanì, Scintille, Passi, "crediti"). Da ora:
   1) l'unica cosa che si spende e si guadagna come moneta sono i Tanì;
   2) il sentiero della stagione non ha piu' una "moneta" sua: si parla solo di TAPPE. Gli obiettivi, le giornate complete
      e la sfida della settimana fanno avanzare di una parte di tappa (in percentuale), senza nome di moneta e senza icona;
   3) "Crediti e licenze" diventa "Autori e licenze" (non sembra piu' una moneta).
   Sotto il cofano il conteggio resta quello di prima (100 = una tappa, EC.SP_* in 98e_v20_econ.js): cambiano solo le parole.
   Prima, in 14 lingue: Scintille, Passi / Sparks, Steps / Fünkchen / Chispas / Étincelles / Faíscas / キラ / 반짝이 /
   火花 / искорки / Iskierki / Vonkjes / Kıvılcım. */
const COIN1 = {
  it: { prog: (x) => `Prossima tappa: ${x}%`, done: "Sentiero completato",
    next: (k) => (k <= 1 ? "Basta 1 obiettivo per la prossima tappa" : `Al massimo ${k} obiettivi alla prossima tappa`),
    how: (g, f, w) => `Sul sentiero avanzi solo prendendoti cura di te: ogni obiettivo spuntato vale il ${g}% di una tappa, ogni giornata completa il ${f}%, ogni sfida della settimana il ${w}%. Nella settimana di festa (dal 1° al 7 di ogni mese) obiettivi e giornate complete valgono il doppio.`,
    wk: (t, p) => `Premio: ${t} Tanì e il ${p}% di una tappa del sentiero`,
    festaP: "Settimana di festa: obiettivi e giornate complete ti fanno avanzare il doppio sul sentiero!",
    guidePath: "Durante la stagione c'è il sentiero: prenditi cura di te, avanza di tappa in tappa e vinci oggetti speciali, anche un cappello per il tuo compagno.",
    credits: "Autori e licenze" },
  en: { prog: (x) => `Next stage: ${x}%`, done: "Path complete",
    next: (k) => (k <= 1 ? "Just 1 goal to the next stage" : `At most ${k} goals to the next stage`),
    how: (g, f, w) => `You move along the path only by taking care of yourself: each goal you tick is worth ${g}% of a stage, each complete day ${f}%, each weekly challenge ${w}%. During festival week (the 1st to the 7th of each month), goals and complete days count double.`,
    wk: (t, p) => `Reward: ${t} Tanì and ${p}% of a path stage`,
    festaP: "Festival week: goals and complete days move you twice as far on the path!",
    guidePath: "During the season there's the path: take care of yourself, move from stage to stage and win special items, including a hat for your companion.",
    credits: "Authors and licences", tier: (n, m = 50) => `Stage ${n} of ${m}` },
  de: { prog: (x) => `Nächste Etappe: ${x} %`, done: "Pfad geschafft",
    next: (k) => (k <= 1 ? "Nur noch 1 Ziel bis zur nächsten Etappe" : `Höchstens noch ${k} Ziele bis zur nächsten Etappe`),
    how: (g, f, w) => `Auf dem Pfad kommst du nur weiter, indem du gut für dich sorgst: Jedes abgehakte Ziel bringt ${g} % einer Etappe, jeder volle Tag ${f} %, jede Wochenaufgabe ${w} %. In der Festwoche (vom 1. bis 7. jedes Monats) zählen Ziele und volle Tage doppelt.`,
    wk: (t, p) => `Belohnung: ${t} Tanì und ${p} % einer Etappe auf dem Pfad`,
    festaP: "Festwoche: Ziele und volle Tage bringen dich auf dem Pfad doppelt so weit!",
    guidePath: "In der Saison gibt es den Pfad: Sorg gut für dich, geh von Etappe zu Etappe und gewinne besondere Objekte, auch eine Mütze für deinen Begleiter.",
    credits: "Mitwirkende und Lizenzen" },
  es: { prog: (x) => `Próxima etapa: ${x} %`, done: "Sendero completado",
    next: (k) => (k <= 1 ? "Solo 1 objetivo para la próxima etapa" : `Como mucho ${k} objetivos para la próxima etapa`),
    how: (g, f, w) => `Solo avanzas por el sendero cuidándote: cada objetivo marcado vale el ${g} % de una etapa, cada día completo el ${f} % y cada reto semanal el ${w} %. En la semana de fiesta (del 1 al 7 de cada mes), los objetivos y los días completos valen el doble.`,
    wk: (t, p) => `Premio: ${t} Tanì y el ${p} % de una etapa del sendero`,
    festaP: "Semana de fiesta: ¡los objetivos y los días completos te hacen avanzar el doble en el sendero!",
    guidePath: "Durante la temporada está el sendero: cuídate, avanza de etapa en etapa y gana objetos especiales, también un gorro para tu compañero.",
    credits: "Autores y licencias" },
  fr: { prog: (x) => `Prochaine étape : ${x} %`, done: "Sentier terminé",
    next: (k) => (k <= 1 ? "Plus qu'un objectif avant la prochaine étape" : `Au plus ${k} objectifs avant la prochaine étape`),
    how: (g, f, w) => `Tu avances sur le sentier uniquement en prenant soin de toi : chaque objectif coché vaut ${g} % d'une étape, chaque journée complète ${f} %, chaque défi de la semaine ${w} %. Pendant la semaine de fête (du 1er au 7 de chaque mois), les objectifs et les journées complètes comptent double.`,
    wk: (t, p) => `Récompense : ${t} Tanì et ${p} % d'une étape du sentier`,
    festaP: "Semaine de fête : les objectifs et les journées complètes te font avancer deux fois plus loin sur le sentier !",
    guidePath: "Pendant la saison, il y a le sentier : prends soin de toi, avance d'étape en étape et remporte des objets spéciaux, dont un bonnet pour ton compagnon.",
    credits: "Auteurs et licences" },
  pt: { prog: (x) => `Próxima etapa: ${x}%`, done: "Caminho completo",
    next: (k) => (k <= 1 ? "Só falta 1 meta para a próxima etapa" : `No máximo ${k} metas para a próxima etapa`),
    how: (g, f, w) => `Você só avança no caminho cuidando de si: cada meta marcada vale ${g}% de uma etapa, cada dia completo ${f}%, cada desafio da semana ${w}%. Na semana de festa (do dia 1 ao 7 de cada mês), metas e dias completos valem o dobro.`,
    wk: (t, p) => `Prêmio: ${t} Tanì e ${p}% de uma etapa do caminho`,
    festaP: "Semana de festa: metas e dias completos fazem você avançar o dobro no caminho!",
    guidePath: "Durante a temporada tem o caminho: cuide de si, avance de etapa em etapa e ganhe itens especiais, inclusive um gorro para o seu companheiro.",
    credits: "Autores e licenças" },
  ja: { prog: (x) => `次のステージ：${x}%`, done: "小道をすべて達成",
    next: (k) => (k <= 1 ? "次のステージまで、目標あと1つ" : `次のステージまで、目標あと最大${k}つ`),
    how: (g, f, w) => `小道は、自分を大切にしたときだけ進みます。目標1つで1ステージの${g}%、1日ぜんぶ達成で${f}%、今週のチャレンジ1つで${w}%進みます。お祭りの週（毎月1日〜7日）は、目標と1日ぜんぶ達成の分が2倍になります。`,
    wk: (t, p) => `ごほうび：${t} Tanìと、小道の1ステージの${p}%`,
    festaP: "お祭りの週：目標と1日ぜんぶ達成で、小道を2倍進めます！",
    guidePath: "シーズン中は小道があります。自分を大切にしてステージを進むと、パートナー用の帽子など特別なアイテムがもらえます。",
    credits: "制作者とライセンス" },
  ko: { prog: (x) => `다음 단계: ${x}%`, done: "오솔길 완주",
    next: (k) => (k <= 1 ? "다음 단계까지 목표 1개" : `다음 단계까지 목표 최대 ${k}개`),
    how: (g, f, w) => `오솔길은 나를 돌볼 때만 나아가요. 목표 하나는 한 단계의 ${g}%, 하루 목표를 모두 해내면 ${f}%, 주간 챌린지 하나는 ${w}%예요. 축제 주간(매달 1일~7일)에는 목표와 하루 완료가 두 배로 계산돼요.`,
    wk: (t, p) => `보상: Tanì ${t}개와 오솔길 한 단계의 ${p}%`,
    festaP: "축제 주간: 목표와 하루 완료로 오솔길을 두 배 더 나아가요!",
    guidePath: "시즌 동안에는 오솔길이 있어요. 나를 돌보며 단계를 하나씩 나아가면 친구에게 줄 모자 같은 특별한 아이템을 받아요.",
    credits: "만든 사람과 라이선스" },
  zh: { prog: (x) => `下一站：${x}%`, done: "小路已走完",
    next: (k) => (k <= 1 ? "再完成 1 个目标就到下一站" : `最多再完成 ${k} 个目标就到下一站`),
    how: (g, f, w) => `只有好好照顾自己，才能在小路上前进：每完成 1 个目标前进一站的 ${g}%，每完成一整天的目标前进 ${f}%，每完成 1 个每周挑战前进 ${w}%。庆典周（每月 1 日至 7 日）期间，目标和全天完成的进度翻倍。`,
    wk: (t, p) => `奖励：${t} Tanì，以及小路上一站的 ${p}% 进度`,
    festaP: "庆典周：目标和全天完成让你在小路上前进双倍！",
    guidePath: "季节期间有一条小路：好好照顾自己、一站一站往前走，就能赢得特别物品，还有给小伙伴的帽子。" },
  zht: { prog: (x) => `下一站：${x}%`, done: "小路已走完",
    next: (k) => (k <= 1 ? "再完成 1 個目標就到下一站" : `最多再完成 ${k} 個目標就到下一站`),
    how: (g, f, w) => `只有好好照顧自己，才能在小路上前進：每完成 1 個目標前進一站的 ${g}%，每完成一整天的目標前進 ${f}%，每完成 1 個每週挑戰前進 ${w}%。祭典週（每月 1 日至 7 日）期間，目標和整天完成的進度加倍。`,
    wk: (t, p) => `獎勵：${t} Tanì，以及小路上一站的 ${p}% 進度`,
    festaP: "祭典週：目標和整天完成讓你在小路上前進加倍！",
    guidePath: "季節期間有一條小路：好好照顧自己、一站一站往前走，就能贏得特別物品，還有給小夥伴的帽子。" },
  ru: { prog: (x) => `Следующий этап: ${x}%`, done: "Тропинка пройдена",
    next: (k) => (k <= 1 ? "До следующего этапа всего 1 цель" : `Целей до следующего этапа: не больше ${k}`),
    how: (g, f, w) => `По тропинке можно продвигаться, только заботясь о себе: каждая выполненная цель даёт ${g}% этапа, каждый полностью выполненный день ${f}%, каждое испытание недели ${w}%. В праздничную неделю (с 1 по 7 число каждого месяца) цели и полные дни считаются вдвойне.`,
    wk: (t, p) => `Награда: ${t} Tanì и ${p}% этапа тропинки`,
    festaP: "Праздничная неделя: цели и полные дни продвигают по тропинке вдвое дальше!",
    guidePath: "Во время сезона есть тропинка: заботься о себе, проходи этап за этапом и получай особые предметы, в том числе шапочку для питомца." },
  pl: { prog: (x) => `Następny etap: ${x}%`, done: "Ścieżka ukończona",
    next: (k) => (k <= 1 ? "Do następnego etapu wystarczy 1 cel" : `Celów do następnego etapu: najwyżej ${k}`),
    how: (g, f, w) => `Po ścieżce idziesz naprzód tylko wtedy, gdy dbasz o siebie: każdy odhaczony cel to ${g}% etapu, każdy pełny dzień ${f}%, każde wyzwanie tygodnia ${w}%. W tygodniu święta (od 1. do 7. dnia każdego miesiąca) cele i pełne dni liczą się podwójnie.`,
    wk: (t, p) => `Nagroda: ${t} Tanì i ${p}% etapu ścieżki`,
    festaP: "Tydzień święta: cele i pełne dni prowadzą cię po ścieżce dwa razy dalej!",
    guidePath: "W trakcie sezonu jest ścieżka: dbaj o siebie, przechodź z etapu na etap i zdobywaj wyjątkowe przedmioty, także czapkę dla towarzysza." },
  nl: { prog: (x) => `Volgende etappe: ${x}%`, done: "Pad voltooid",
    next: (k) => (k <= 1 ? "Nog maar 1 doel tot de volgende etappe" : `Hooguit nog ${k} doelen tot de volgende etappe`),
    how: (g, f, w) => `Op het pad kom je alleen vooruit door goed voor jezelf te zorgen: elk afgevinkt doel is ${g}% van een etappe, elke volledige dag ${f}%, elke weekuitdaging ${w}%. In de feestweek (van de 1e tot de 7e van elke maand) tellen doelen en volledige dagen dubbel.`,
    wk: (t, p) => `Beloning: ${t} Tanì en ${p}% van een etappe op het pad`,
    festaP: "Feestweek: doelen en volledige dagen brengen je twee keer zo ver op het pad!",
    guidePath: "Tijdens het seizoen is er het pad: zorg goed voor jezelf, ga van etappe naar etappe en win speciale spulletjes, ook een muts voor je maatje.",
    credits: "Makers en licenties" },
  tr: { prog: (x) => `Sonraki durak: %${x}`, done: "Patika tamamlandı",
    next: (k) => (k <= 1 ? "Sonraki durağa sadece 1 hedef kaldı" : `Sonraki durağa en fazla ${k} hedef kaldı`),
    how: (g, f, w) => `Patikada sadece kendine bakarak ilerlersin. Bir durağın ne kadarı: işaretlediğin her hedef %${g}, her tam gün %${f}, her haftalık görev %${w}. Şenlik haftasında (her ayın 1'i ile 7'si arası) hedefler ve tam günler iki kat değerlidir.`,
    wk: (t, p) => `Ödül: ${t} Tanì ve patikada bir durağın %${p} kadarı`,
    festaP: "Şenlik haftası: hedefler ve tam günler seni patikada iki kat ilerletir!",
    guidePath: "Sezon boyunca bir patika var: kendine iyi bak, duraktan durağa ilerle ve arkadaşın için bir şapka dahil özel eşyalar kazan." }
};
/* quanti obiettivi servono al massimo per la prossima tappa (le giornate complete e la sfida fanno arrivare prima) */
function coinGoalsTo(rest) { let step = EC.SP_GOAL; try { if (typeof isFesta === "function" && isFesta(dkey())) step *= EC.SP_FESTA; } catch (e) { /* niente */ } return Math.max(1, Math.ceil(Math.max(0, rest) / step)); }
Object.keys(COIN1).forEach((l) => {
  const t = T[l], c = COIN1[l]; if (!t) return;
  if (t.season) {
    t.season.passi = (p) => { let N = 50; try { const se = curSeason(); if (se) N = seaTiers(se); } catch (e) { /* niente */ } return Math.floor((p || 0) / 100) >= N ? c.done : c.prog(Math.max(0, Math.round(p || 0)) % 100); };
    t.season.next = (n) => c.next(coinGoalsTo(n));
    if (c.tier) t.season.tier = c.tier;
  }
  if (t.wk) t.wk.reward = c.wk;
  if (t.festa) t.festa.P = c.festaP;
  if (c.credits) t.creditsB = c.credits;
  const x = ECT[l]; if (x) { x.how = c.how; x.festaP = c.festaP; x.guidePath = c.guidePath; }
});
