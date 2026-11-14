/* v13 (altre lingue): Stagione dei Fondatori, Scintille, testi Plus corretti, schermata "tutto fatto", descrizioni coerenti */
(() => {
  /* plurali: ru 1 / 2-4 / 5+ (11-14 -> molti), pl 1 / 2-4 (non 12-14) / resto */
  const ruP = (n, one, few, many) => { const a = Math.abs(n) % 100, b = a % 10; return a > 10 && a < 20 ? many : b === 1 ? one : b > 1 && b < 5 ? few : many; };
  const plP = (n, one, few, many) => n === 1 ? one : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? few : many;
  const ruS = (n) => `${n} ${ruP(n, "искорка", "искорки", "искорок")}`;
  const plS = (n) => `${n} ${plP(n, "Iskierka", "Iskierki", "Iskierek")}`;

  /* de */
  Object.assign(T.de.season, { zero: "Gründer-Saison", passi: (n) => `${n} Fünkchen`, next: (n) => `Noch ${n} Fünkchen bis zur nächsten Etappe`, how: "Fünkchen sammelst du nur, indem du gut für dich sorgst: 10 für jedes Ziel, 20 für jeden vollen Tag, 100 für jede Wochenaufgabe. In der Festwoche zählen sie doppelt." });
  T.de.wk.reward = (t, p) => `Belohnung: ${t} Tanì und ${p} Fünkchen`;
  T.de.festa.P = "Festwoche: Fünkchen zählen doppelt!";
  T.de.plus.soonP = "Es kommt zusammen mit der App in die Stores. Wir haben dein Interesse notiert: Danke!";
  T.de.v13 = { allT: "Alles geschafft für heute! 🎉", allP: (n) => `${n} hat volle Energie und ist bereit für ein Abenteuer!`, allB: "Abenteuer wählen", later: "Später", newTag: "Neu!" };

  /* es */
  Object.assign(T.es.season, { zero: "Temporada de los Fundadores", passi: (n) => n === 1 ? "1 Chispa" : `${n} Chispas`, next: (n) => n === 1 ? "1 Chispa más para la próxima etapa" : `${n} Chispas más para la próxima etapa`, how: "Ganas Chispas solo cuidándote: 10 por cada objetivo, 20 por cada día completo y 100 por cada reto semanal. En la semana de fiesta valen el doble." });
  T.es.wk.reward = (t, p) => `Premio: ${t} Tanì y ${p} Chispas`;
  T.es.festa.P = "Semana de fiesta: ¡las Chispas valen el doble!";
  T.es.plus.soonP = "Llegará con la app a las tiendas. Hemos registrado tu interés: ¡gracias!";
  T.es.v13 = { allT: "¡Todo hecho por hoy! 🎉", allP: (n) => `¡${n} tiene la energía llena y ganas de aventura!`, allB: "Elige una aventura", later: "Más tarde", newTag: "¡Nuevo!" };
  /* le frasi del compagno sono al maschile (orgulloso, mandarlo) */
  T.es.pets.ondi[1] = "Un cachorrito de nutria con una piedrita de la suerte.";
  T.es.pets.lumi[1] = "Una pequeña luciérnaga que brilla con cada paso tuyo."; /* critica fase 3: "bichito de luz" e' solo rioplatense; nel resto dell'app e' "luciérnaga" */
  T.es.pets.rufi[1] = "Un zorrito curioso y valiente.";

  /* fr */
  Object.assign(T.fr.season, { zero: "Saison des Fondateurs", passi: (n) => n === 1 ? "1 Étincelle" : `${n} Étincelles`, next: (n) => n === 1 ? "Encore 1 Étincelle avant la prochaine étape" : `Encore ${n} Étincelles avant la prochaine étape`, how: "Tu gagnes des Étincelles uniquement en prenant soin de toi : 10 par objectif, 20 par journée complète, 100 par défi de la semaine. Pendant la semaine de fête, elles comptent double." });
  T.fr.wk.reward = (t, p) => `Récompense : ${t} Tanì et ${p} Étincelles`;
  T.fr.festa.P = "Semaine de fête : les Étincelles comptent double !";
  T.fr.plus.soonP = "Il arrivera avec l'app sur les stores. Nous avons bien noté ton intérêt : merci !";
  T.fr.v13 = { allT: "Tout est fait pour aujourd'hui ! 🎉", allP: (n) => `${n} a toute son énergie et a hâte de partir à l'aventure !`, allB: "Choisir une aventure", later: "Plus tard", newTag: "Nouveau !" };
  /* les phrases du compagnon sont au masculin (il, fier) */
  T.fr.pets.ondi[1] = "Un bébé loutre avec un caillou porte-bonheur.";
  T.fr.pets.lumi[1] = "Un petit ver luisant qui brille à chacun de tes pas.";

  /* pt (Brasil) */
  Object.assign(T.pt.season, { zero: "Temporada dos Fundadores", passi: (n) => n === 1 ? "1 Faísca" : `${n} Faíscas`, next: (n) => n === 1 ? "Falta 1 Faísca para a próxima etapa" : `Faltam ${n} Faíscas para a próxima etapa`, how: "Você ganha Faíscas só cuidando de si: 10 por meta, 20 por dia completo, 100 por desafio da semana. Na semana de festa, elas valem o dobro." });
  T.pt.wk.reward = (t, p) => `Prêmio: ${t} Tanì e ${p} Faíscas`;
  T.pt.festa.P = "Semana de festa: as Faíscas valem o dobro!";
  T.pt.plus.soonP = "Vai chegar com o app nas lojas. Anotamos o seu interesse: obrigado!";
  T.pt.v13 = { allT: "Tudo feito por hoje! 🎉", allP: (n) => `${n} está com a energia cheia e quer viver uma aventura!`, allB: "Escolha uma aventura", later: "Mais tarde", newTag: "Novidade!" };
  /* as falas do companheiro são no masculino (ele, orgulhoso, mandá-lo) */
  T.pt.pets.ondi[1] = "Um filhote de lontra com uma pedrinha da sorte.";
  T.pt.pets.rufi[1] = "Um filhote de raposa, curioso e corajoso.";

  /* ja */
  Object.assign(T.ja.season, { zero: "ファウンダーズ・シーズン", passi: (n) => `${n}キラ`, next: (n) => `次のステージまであと${n}キラ`, how: "キラは、自分を大切にしたときだけたまります。目標1つで10キラ、1日ぜんぶ達成で20キラ、今週のチャレンジ1つで100キラ。お祭りの週は2倍になります。" });
  T.ja.wk.reward = (t, p) => `ごほうび：${t} Tanìと${p}キラ`;
  T.ja.festa.P = "お祭りの週：キラが2倍！";
  T.ja.plus.soonP = "ストア版アプリといっしょに登場します。興味を持ってくれたこと、ちゃんと記録しました。ありがとう！";
  T.ja.v13 = { allT: "今日はぜんぶ達成！🎉", allP: (n) => `${n}はエネルギー満タン、冒険の準備ばっちり！`, allB: "冒険をえらぶ", later: "あとで", newTag: "NEW!" };

  /* ko */
  Object.assign(T.ko.season, { zero: "창립 멤버 시즌", passi: (n) => `반짝이 ${n}개`, next: (n) => `다음 단계까지 반짝이 ${n}개 남았어요`, how: "반짝이는 나를 돌볼 때만 모을 수 있어요. 목표 하나에 10개, 하루 목표를 모두 해내면 20개, 주간 챌린지 하나에 100개. 축제 주간에는 두 배예요." });
  T.ko.wk.reward = (t, p) => `보상: ${t} Tanì + 반짝이 ${p}개`;
  T.ko.festa.P = "축제 주간: 반짝이가 두 배!";
  T.ko.plus.soonP = "앱이 스토어에 출시될 때 함께 나와요. 관심을 보내 준 걸 잘 기록해 두었어요. 고마워요!";
  T.ko.v13 = { allT: "오늘 할 일을 모두 끝냈어요! 🎉", allP: (n) => `에너지 가득! ${n}, 모험 떠날 준비 완료!`, allB: "모험 고르기", later: "나중에", newTag: "NEW!" };

  /* zh */
  Object.assign(T.zh.season, { zero: "创始季", passi: (n) => `${n} 火花`, next: (n) => `再得 ${n} 火花就到下一站`, how: "只有好好照顾自己才能获得火花：每完成 1 个目标得 10 火花，每完成一整天的目标得 20 火花，每完成 1 个每周挑战得 100 火花。庆典周期间火花翻倍。" });
  T.zh.wk.reward = (t, p) => `奖励：${t} Tanì 和 ${p} 火花`;
  T.zh.festa.P = "庆典周：火花翻倍！";
  T.zh.plus.soonP = "它会随应用一起登陆应用商店。我们已经记下你的关注啦，谢谢你！";
  T.zh.v13 = { allT: "今天的都完成啦！🎉", allP: (n) => `${n} 能量满满，准备好去冒险啦！`, allB: "选择冒险", later: "稍后", newTag: "新！" };

  /* zht (Taiwan) */
  Object.assign(T.zht.season, { zero: "創始季", passi: (n) => `${n} 火花`, next: (n) => `再得 ${n} 火花就到下一站`, how: "只有好好照顧自己才能獲得火花：每完成 1 個目標得 10 火花，每完成一整天的目標得 20 火花，每完成 1 個每週挑戰得 100 火花。祭典週期間火花加倍。" });
  T.zht.wk.reward = (t, p) => `獎勵：${t} Tanì 和 ${p} 火花`;
  T.zht.festa.P = "祭典週：火花加倍！";
  T.zht.plus.soonP = "會在 App 上架後推出。我們已經記下你的興趣了，謝謝你！";
  T.zht.v13 = { allT: "今天全部完成囉！🎉", allP: (n) => `${n} 能量滿滿，準備好去冒險囉！`, allB: "選擇冒險", later: "稍後", newTag: "新！" };

  /* ru */
  Object.assign(T.ru.season, { zero: "Сезон основателей", passi: (n) => ruS(n), next: (n) => `Ещё ${ruS(n)} до следующего этапа`, how: "Искорки можно получить, только заботясь о себе: 10 за каждую цель, 20 за каждый полностью выполненный день, 100 за каждое испытание недели. В праздничную неделю искорки считаются вдвойне." });
  T.ru.wk.reward = (t, p) => `Награда: ${t} Tanì и ${ruS(p)}`;
  T.ru.festa.P = "Праздничная неделя: искорки считаются вдвойне!";
  T.ru.plus.soonP = "Он появится вместе с приложением в магазинах. Мы отметили твой интерес: спасибо!";
  T.ru.v13 = { allT: "На сегодня всё сделано! 🎉", allP: (n) => `${n}: энергия на максимуме, можно отправляться в приключение!`, allB: "Выбрать приключение", later: "Позже", newTag: "Новое!" };
  /* реплики питомца в мужском роде (он) */
  T.ru.pets.ondi[1] = "Выдрёнок со счастливым камешком.";

  /* pl */
  Object.assign(T.pl.season, { zero: "Sezon Założycieli", passi: (n) => plS(n), next: (n) => `Jeszcze ${plS(n)} do następnego etapu`, how: "Iskierki zdobywasz tylko wtedy, gdy dbasz o siebie: 10 za każdy cel, 20 za każdy pełny dzień, 100 za każde wyzwanie tygodnia. W tygodniu święta liczą się podwójnie." });
  T.pl.wk.reward = (t, p) => `Nagroda: ${t} Tanì i ${plS(p)}`;
  T.pl.festa.P = "Tydzień święta: Iskierki liczą się podwójnie!";
  T.pl.plus.soonP = "Pojawi się razem z aplikacją w sklepach. Odnotowaliśmy twoje zainteresowanie: dziękujemy!";
  T.pl.v13 = { allT: "Wszystko na dziś zrobione! 🎉", allP: (n) => `${n} ma pełną energię i może ruszać na przygodę!`, allB: "Wybierz przygodę", later: "Później", newTag: "Nowość!" };

  /* nl */
  Object.assign(T.nl.season, { zero: "Oprichtersseizoen", passi: (n) => n === 1 ? "1 Vonkje" : `${n} Vonkjes`, next: (n) => n === 1 ? "Nog 1 Vonkje tot de volgende etappe" : `Nog ${n} Vonkjes tot de volgende etappe`, how: "Je verdient Vonkjes alleen door goed voor jezelf te zorgen: 10 per doel, 20 per volledige dag, 100 per weekuitdaging. In de feestweek tellen ze dubbel." });
  T.nl.wk.reward = (t, p) => `Beloning: ${t} Tanì en ${p} Vonkjes`;
  T.nl.festa.P = "Feestweek: Vonkjes tellen dubbel!";
  T.nl.plus.soonP = "Het komt er zodra de app in de stores staat. We hebben je interesse genoteerd: dankjewel!";
  T.nl.v13 = { allT: "Alles gedaan voor vandaag! 🎉", allP: (n) => `${n} zit vol energie en is klaar voor een avontuur!`, allB: "Kies een avontuur", later: "Later", newTag: "Nieuw!" };

  /* tr */
  Object.assign(T.tr.season, { zero: "Kurucular Sezonu", passi: (n) => `${n} Kıvılcım`, next: (n) => `Sonraki durağa ${n} Kıvılcım kaldı`, how: "Kıvılcımları sadece kendine bakarak kazanırsın: her hedef için 10, her tam gün için 20, her haftalık görev için 100. Şenlik haftasında iki kat değerlidirler." });
  T.tr.wk.reward = (t, p) => `Ödül: ${t} Tanì ve ${p} Kıvılcım`;
  T.tr.festa.P = "Şenlik haftası: Kıvılcımlar iki kat değerli!";
  T.tr.plus.soonP = "Uygulama mağazalarda yayınlandığında hazır olacak. İlgini not ettik: teşekkürler!";
  T.tr.v13 = { allT: "Bugünlük her şey tamam! 🎉", allP: (n) => `${n} enerji dolu, maceraya hazır!`, allB: "Macera seç", later: "Sonra", newTag: "Yeni!" };
})();
/* "Stagione 0" diventa "Stagione dei Fondatori" anche nel distintivo */
T.it.season.founderP = "Hai giocato la Stagione dei Fondatori: questo distintivo e la lanterna d'oro restano tuoi per sempre.";
T.en.season.founderP = "You played the Founders' Season: this badge and the golden lantern are yours forever.";
T.de.season.founderP = "Du warst in der Gründer-Saison dabei: Dieses Abzeichen und die goldene Laterne gehören für immer dir.";
T.es.season.founderP = "Jugaste la Temporada de los Fundadores: esta insignia y el farolillo dorado son tuyos para siempre.";
T.fr.season.founderP = "Tu as joué la Saison des Fondateurs : ce badge et la lanterne dorée sont à toi pour toujours.";
T.pt.season.founderP = "Você jogou a Temporada dos Fundadores: este emblema e a lanterna dourada são seus para sempre.";
T.ja.season.founderP = "ファウンダーズ・シーズンに参加してくれたあなたへ。このバッジと金のランタンは、ずっとあなたのものです。";
T.ko.season.founderP = "창립 멤버 시즌을 함께했어요. 이 배지와 황금 등불은 영원히 네 거예요.";
T.nl.season.founderP = "Je speelde het Oprichtersseizoen: deze badge en de gouden lantaarn zijn voor altijd van jou.";
T.pl.season.founderP = "Sezon Założycieli przeżyty razem: ta odznaka i złoty lampion są twoje na zawsze.";
T.ru.season.founderP = "Ты участник Сезона основателей: этот значок и золотой фонарик останутся с тобой навсегда.";
T.tr.season.founderP = "Kurucular Sezonu'nda oynadın: bu rozet ve altın fener sonsuza dek senin.";
T.zh.season.founderP = "你参加了创始季，这枚徽章和金灯笼永远属于你。";
T.zht.season.founderP = "你參加了創始季，這枚徽章和金燈籠永遠都是你的。";
/* Paywall: pulsante Abbonati e note sotto i piani (annuale con prova, mensile) */
Object.assign(T.de.v13, { subscribe: "Abonnieren", afterY: (p) => `7 Tage gratis, dann ${p}. Verlängert sich automatisch nach Ende des Probezeitraums – jederzeit kündbar, auch vorher.`, afterM: (p) => `${p}. Verlängert sich automatisch jeden Monat – jederzeit kündbar.` });
Object.assign(T.es.v13, { subscribe: "Suscribirse", afterY: (p) => `7 días gratis, luego ${p}. Se renueva automáticamente al terminar la prueba: puedes cancelar cuando quieras, incluso antes.`, afterM: (p) => `${p}. Se renueva automáticamente cada mes: cancela cuando quieras.` });
Object.assign(T.fr.v13, { subscribe: "S'abonner", afterY: (p) => `7 jours gratuits, puis ${p}. Renouvellement automatique à la fin de l'essai : résiliable à tout moment, même avant.`, afterM: (p) => `${p}. Renouvellement automatique chaque mois : résiliable à tout moment.` });
Object.assign(T.pt.v13, { subscribe: "Assinar", afterY: (p) => `7 dias grátis, depois ${p}. A renovação é automática no fim do teste: você pode cancelar quando quiser, até antes.`, afterM: (p) => `${p}. Renova automaticamente todo mês: cancele quando quiser.` });
Object.assign(T.ja.v13, { subscribe: "登録する", afterY: (p) => `7日間無料、その後${p}。無料体験の終了時に自動更新されます。体験期間中も含め、いつでも解約できます。`, afterM: (p) => `${p}。毎月自動更新されます。いつでも解約できます。` });
Object.assign(T.ko.v13, { subscribe: "구독하기", afterY: (p) => `7일 무료, 이후 ${p}. 무료 체험이 끝나면 자동으로 갱신돼요. 체험 중에도 언제든 해지할 수 있어요.`, afterM: (p) => `${p}. 매월 자동으로 갱신돼요. 언제든 해지할 수 있어요.` });
Object.assign(T.zh.v13, { subscribe: "订阅", afterY: (p) => `免费试用 7 天，之后${p}。试用结束后自动续订，可随时取消，试用期内也可以。`, afterM: (p) => `${p}。每月自动续订，可随时取消。` });
Object.assign(T.zht.v13, { subscribe: "訂閱", afterY: (p) => `免費試用 7 天，之後${p}。試用結束後自動續訂，可隨時取消，試用期間內也可以。`, afterM: (p) => `${p}。每月自動續訂，可隨時取消。` });
Object.assign(T.ru.v13, { subscribe: "Оформить подписку", afterY: (p) => `7 дней бесплатно, затем ${p}. Подписка продлевается автоматически после пробного периода. Отменить можно в любой момент, даже до его окончания.`, afterM: (p) => `${p}. Подписка продлевается автоматически каждый месяц. Отменить можно в любой момент.` });
Object.assign(T.pl.v13, { subscribe: "Subskrybuj", afterY: (p) => `7 dni za darmo, potem ${p}. Subskrypcja odnawia się automatycznie po okresie próbnym. Możesz anulować w dowolnym momencie, także wcześniej.`, afterM: (p) => `${p}. Subskrypcja odnawia się automatycznie co miesiąc. Możesz anulować w dowolnym momencie.` });
Object.assign(T.nl.v13, { subscribe: "Abonneren", afterY: (p) => `7 dagen gratis, daarna ${p}. Wordt automatisch verlengd na de proefperiode. Je kunt altijd opzeggen, ook eerder.`, afterM: (p) => `${p}. Wordt elke maand automatisch verlengd. Je kunt altijd opzeggen.` });
Object.assign(T.tr.v13, { subscribe: "Abone ol", afterY: (p) => `7 gün ücretsiz, ardından ${p}. Deneme bitince otomatik olarak yenilenir. İstediğin zaman, deneme bitmeden bile iptal edebilirsin.`, afterM: (p) => `${p}. Her ay otomatik olarak yenilenir. İstediğin zaman iptal edebilirsin.` });
/* Avviso per il proprietario (link ?io=1) e titolare dell'informativa durante la prova */
[["it", "Fatto: le tue visite da questo dispositivo non verranno contate.", "il progetto Tanetto, gestito da una persona fisica"],
 ["en", "Done: your visits from this device won't be counted.", "the Tanetto project, run by a private individual"],
 ["de", "Erledigt: Deine Besuche von diesem Gerät werden nicht gezählt.", "das Projekt Tanetto, betrieben von einer Privatperson"],
 ["es", "Hecho: tus visitas desde este dispositivo no se contarán.", "el proyecto Tanetto, gestionado por una persona física"],
 ["fr", "C'est fait : tes visites depuis cet appareil ne seront pas comptées.", "le projet Tanetto, géré par une personne physique"],
 ["pt", "Pronto: suas visitas a partir deste dispositivo não serão contadas.", "o projeto Tanetto, mantido por uma pessoa física"],
 ["ja", "設定しました：この端末からの利用はカウントされません。", "Tanetto プロジェクト（個人が運営）"],
 ["ko", "완료: 이 기기에서의 방문은 집계되지 않아요.", "개인이 운영하는 Tanetto 프로젝트"],
 ["zh", "已设置：此设备的访问将不会被统计。", "Tanetto 项目（由个人运营）"],
 ["zht", "已設定：這台裝置的造訪不會被統計。", "Tanetto 專案（由個人經營）"],
 ["ru", "Готово: посещения с этого устройства не будут учитываться.", "проект Tanetto, который ведёт частное лицо"],
 ["pl", "Gotowe: wizyty z tego urządzenia nie będą liczone.", "projekt Tanetto prowadzony przez osobę prywatną"],
 ["nl", "Klaar: je bezoeken vanaf dit apparaat worden niet meegeteld.", "het project Tanetto, beheerd door een privépersoon"],
 ["tr", "Tamam: bu cihazdan yaptığın ziyaretler sayılmayacak.", "bir birey tarafından yürütülen Tanetto projesi"]
].forEach(([l, nc, own]) => { if (T[l]) { T[l].v13 = Object.assign(T[l].v13 || {}, { noCount: nc }); T[l].ownerMissing = own; } });
