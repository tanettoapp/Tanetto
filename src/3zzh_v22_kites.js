/* =================== 1.0.9 (fase 2): Stagione degli Aquiloni, testi in 14 lingue ===================
   Capitolo 01/03/2027 - 31/05/2027 (poi ritorna da marzo a novembre quando non c'e' un capitolo nuovo; da dicembre a
   febbraio torna la Stagione delle Stelle). Nome, prato, voli, lettere della storia (nessuna stagione nominata nelle
   lettere: si possono leggere la prima volta anche in un ritorno estivo o autunnale), annuncio, oggetti nuovi.
   Il cappello di stagione del sentiero segue la stagione del posto (primavera: corona di fiori, estate: cappello di
   paglia, autunno: berretto d'autunno): il suo nome c'e' gia' in T[l].items. Forme neutre (it/es/fr/pt/ru/pl). */
const V22_KITES = {
  it: {
    name: "Stagione degli Aquiloni", lake: "Prato degli Aquiloni", lakeTap: "Tocca il prato per far volare un aquilone",
    wishes: ["Su, sempre più su! Alla coda ho legato un piccolo desiderio: una giornata leggera per te.", "Guarda quanto vola in alto! I piccoli passi si sommano, proprio come il filo.", "Il vento si è portato via l'aquilone e, con lui, un abbraccio grande per te.", "Gli aquiloni salgono controvento, non a favore. Oggi l'hai fatto anche tu, e mi rende tanto felice."],
    chapT: (n) => `La storia dell'aquilone · capitolo ${n}`,
    story: ["Stamattina {n} ha trovato un vecchio aquilone di carta nell'armadio, con un biglietto sul telaio: «Ogni volo comincia con un piccolo strattone». {n} l'ha appeso accanto ai tuoi obiettivi.",
      "Ogni obiettivo che spunti aggiunge un fiocco alla coda dell'aquilone. {n} li ha contati due volte, per sicurezza, e ha sorriso tutte e due le volte.",
      "{n} ha portato l'aquilone sul prato. All'inizio traballava, poi il vento l'ha preso. «Come le piccole abitudini», ha detto {n}, «anche loro traballano, e poi volano.»",
      "Ora l'aquilone è così in alto che sembra un puntino colorato nel cielo. {n} vuole che tu lo sappia: il filo lo tieni tu. Grazie per ogni giorno passato insieme."],
    annT: "Comincia una nuova stagione", annP: (n) => `È la Stagione degli Aquiloni: ${n} ha un nuovo sentiero per te, con premi nuovi lungo la strada.`, annRT: "Torna la Stagione degli Aquiloni", annRP: (n) => `${n} ha un sentiero tutto nuovo per te. Se un premio degli aquiloni ce l'hai già, al suo posto ricevi dei Tanì.`,
    items: { rug_kite: "Tappeto aquilone", w_kites: "Aquiloni nel cielo", h_pinwheel: "Cerchietto girandola", h_kite: "Cappello aquilone" }
  },
  en: {
    name: "Kite Season", lake: "Kite Meadow", lakeTap: "Tap the meadow to fly a kite",
    wishes: ["Up it goes! I tied a little wish to the tail: a light, easy day for you.", "Look how high it flies! Small steps add up, just like the string.", "The wind took our kite, and a big hug for you along with it.", "Kites rise against the wind, not with it. You did that today too, and it makes me so happy."],
    chapT: (n) => `The story of the kite · chapter ${n}`,
    story: ["This morning {n} found an old paper kite in the cupboard, with a note on the frame: \"Every flight starts with one small tug.\" {n} hung it right next to your goals.",
      "Every goal you tick adds a bow to the kite's tail. {n} counted them twice, just to be sure, and smiled both times.",
      "{n} took the kite out to the meadow. It wobbled at first, then the wind caught it. \"Like small habits,\" {n} said. \"They wobble too, and then they fly.\"",
      "The kite is so high now that it looks like a dot of colour in the sky. {n} wants you to know that you're the one holding the string. Thank you for every day we spent together."],
    annT: "A new season begins", annP: (n) => `It's Kite Season: ${n} has a new path for you, with new rewards along the way.`, annRT: "Kite Season is back", annRP: (n) => `${n} has a fresh path for you. If you already have one of the kite rewards, you get Tanì instead.`,
    items: { rug_kite: "Kite rug", w_kites: "Kites in the sky", h_pinwheel: "Pinwheel headband", h_kite: "Kite hat" }
  },
  de: {
    name: "Saison der Flugdrachen", lake: "Drachenwiese", lakeTap: "Tippe auf die Wiese und lass einen Drachen steigen",
    wishes: ["Hoch hinaus! Ich habe einen kleinen Wunsch an den Schwanz gebunden: einen leichten Tag für dich.", "Schau, wie hoch er fliegt! Kleine Schritte summieren sich, genau wie die Schnur.", "Der Wind hat unseren Drachen mitgenommen und eine große Umarmung für dich gleich dazu.", "Drachen steigen gegen den Wind, nicht mit ihm. Das hast du heute auch geschafft, und das freut mich riesig."],
    chapT: (n) => `Die Geschichte des Papierdrachens · Kapitel ${n}`,
    story: ["Heute Morgen hat {n} im Schrank einen alten Papierdrachen gefunden, mit einem Zettel am Gestell: „Jeder Flug beginnt mit einem kleinen Ruck.“ {n} hat ihn gleich neben deine Ziele gehängt.",
      "Jedes Ziel, das du abhakst, bindet eine Schleife an den Drachenschwanz. {n} hat sie zweimal gezählt, sicher ist sicher, und beide Male gelächelt.",
      "{n} hat den Drachen auf die Wiese gebracht. Erst hat er gewackelt, dann hat ihn der Wind erfasst. „Wie kleine Gewohnheiten“, sagte {n}, „die wackeln auch erst, und dann fliegen sie.“",
      "Jetzt ist der Drachen so hoch, dass er wie ein bunter Punkt am Himmel aussieht. {n} möchte, dass du es weißt: Die Schnur hältst du. Danke für jeden Tag, den wir zusammen verbracht haben."],
    annT: "Eine neue Saison beginnt", annP: (n) => `Es ist die Saison der Flugdrachen: ${n} hat einen neuen Pfad für dich, mit neuen Belohnungen unterwegs.`, annRT: "Die Saison der Flugdrachen ist zurück", annRP: (n) => `${n} hat einen frischen Pfad für dich. Hast du eine Drachen-Belohnung schon, bekommst du stattdessen Tanì.`,
    items: { rug_kite: "Flugdrachen-Teppich", w_kites: "Flugdrachen am Himmel", h_pinwheel: "Windrad-Haarreif", h_kite: "Flugdrachen-Hut" }
  },
  es: {
    name: "Temporada de las Cometas", lake: "Prado de las Cometas", lakeTap: "Toca el prado para volar una cometa",
    wishes: ["¡Arriba, arriba! He atado un pequeño deseo a la cola: un día ligero para ti.", "¡Mira qué alto vuela! Los pasos pequeños se suman, igual que el hilo.", "El viento se ha llevado nuestra cometa y, con ella, un abrazo enorme para ti.", "Las cometas suben contra el viento, no a favor. Hoy tú también lo has hecho, y me hace muy feliz."],
    chapT: (n) => `La historia de la cometa · capítulo ${n}`,
    story: ["Esta mañana {n} ha encontrado una vieja cometa de papel en el armario, con una nota en el armazón: «Todo vuelo empieza con un pequeño tirón». {n} la ha colgado justo al lado de tus objetivos.",
      "Cada objetivo que marcas añade un lazo a la cola de la cometa. {n} los ha contado dos veces, por si acaso, y las dos veces ha sonreído.",
      "{n} ha llevado la cometa al prado. Al principio se tambaleaba, luego el viento la ha atrapado. «Como los pequeños hábitos», ha dicho {n}, «también se tambalean, y luego vuelan».",
      "Ahora la cometa está tan alta que parece un puntito de color en el cielo. {n} quiere que lo sepas: el hilo lo sostienes tú. Gracias por cada día compartido."],
    annT: "Empieza una nueva temporada", annP: (n) => `Es la Temporada de las Cometas: ${n} tiene un sendero nuevo para ti, con premios nuevos por el camino.`, annRT: "Vuelve la Temporada de las Cometas", annRP: (n) => `${n} tiene un sendero nuevo para ti. Si ya tienes alguno de los premios de las cometas, recibes Tanì en su lugar.`,
    items: { rug_kite: "Alfombra cometa", w_kites: "Cometas en el cielo", h_pinwheel: "Diadema molinillo", h_kite: "Sombrero cometa" }
  },
  fr: {
    name: "Saison des Cerfs-volants", lake: "Prairie des Cerfs-volants", lakeTap: "Touche la prairie pour faire voler un cerf-volant",
    wishes: ["Et hop, tout là-haut ! J'ai accroché un petit vœu à la queue : une journée légère pour toi.", "Regarde comme il vole haut ! Les petits pas s'additionnent, comme la ficelle.", "Le vent a emporté notre cerf-volant, et avec lui un gros câlin pour toi.", "Les cerfs-volants montent contre le vent, pas avec lui. Aujourd'hui, toi aussi, et ça me fait tellement plaisir."],
    chapT: (n) => `L'histoire du cerf-volant · chapitre ${n}`,
    story: ["Ce matin, {n} a trouvé un vieux cerf-volant en papier dans le placard, avec un mot sur l'armature : « Chaque envol commence par un petit coup de ficelle. » {n} l'a accroché juste à côté de tes objectifs.",
      "Chaque objectif que tu coches ajoute un nœud à la queue du cerf-volant. {n} les a comptés deux fois, par précaution, et a souri les deux fois.",
      "{n} a emmené le cerf-volant dans la prairie. Au début, il vacillait, puis le vent l'a emporté. « Comme les petites habitudes, a dit {n}, elles vacillent aussi, puis elles s'envolent. »",
      "Maintenant, le cerf-volant est si haut qu'il ressemble à un point de couleur dans le ciel. {n} veut que tu le saches : c'est toi qui tiens la ficelle. Merci pour chaque jour passé ensemble."],
    annT: "Une nouvelle saison commence", annP: (n) => `C'est la Saison des Cerfs-volants : ${n} a un nouveau sentier pour toi, avec de nouvelles récompenses en chemin.`, annRT: "La Saison des Cerfs-volants est de retour", annRP: (n) => `${n} a un sentier tout neuf pour toi. Si tu as déjà une récompense des cerfs-volants, tu reçois des Tanì à la place.`,
    items: { rug_kite: "Tapis cerf-volant", w_kites: "Cerfs-volants dans le ciel", h_pinwheel: "Serre-tête moulinet", h_kite: "Chapeau cerf-volant" }
  },
  pt: {
    name: "Temporada das Pipas", lake: "Campo das Pipas", lakeTap: "Toque no campo para soltar uma pipa",
    wishes: ["Lá vai ela! Amarrei um pequeno pedido na rabiola: um dia leve para você.", "Olha como ela voa alto! Pequenos passos se somam, igual à linha.", "O vento levou a nossa pipa e, junto com ela, um abraço bem grande para você.", "Pipas sobem contra o vento, não a favor. Hoje você também subiu, e isso me deixa muito feliz."],
    chapT: (n) => `A história da pipa · capítulo ${n}`,
    story: ["Hoje de manhã {n} encontrou uma pipa de papel antiga no armário, com um bilhete na armação: \"Todo voo começa com um puxãozinho.\" {n} pendurou a pipa bem ao lado das suas metas.",
      "Cada meta que você marca acrescenta um laço na rabiola da pipa. {n} contou duas vezes, só por garantia, e sorriu nas duas.",
      "{n} levou a pipa para o campo. No começo ela balançava, depois o vento pegou. \"Igual aos pequenos hábitos\", disse {n}, \"eles também balançam, e depois voam.\"",
      "Agora a pipa está tão alta que parece um pontinho colorido no céu. {n} quer que você saiba: quem segura a linha é você. Que bom cada dia que passamos lado a lado."],
    annT: "Começa uma nova temporada", annP: (n) => `É a Temporada das Pipas: ${n} tem uma trilha nova para você, com prêmios novos pelo caminho.`, annRT: "A Temporada das Pipas está de volta", annRP: (n) => `${n} tem uma trilha nova para você. Se você já tiver um dos prêmios das pipas, recebe Tanì no lugar.`,
    items: { rug_kite: "Tapete pipa", w_kites: "Pipas no céu", h_pinwheel: "Tiara cata-vento", h_kite: "Chapéu pipa" }
  },
  ja: {
    name: "凧のシーズン", lake: "凧の野原", lakeTap: "野原をタップして、凧をあげよう",
    wishes: ["あがれ、あがれ！しっぽに小さなお願いを結んだよ。あなたに軽やかな一日を。", "見て、こんなに高く飛んでる！小さな一歩も、糸みたいにつながっていくね。", "風が凧を連れていったよ。あなたへの大きなハグもいっしょにね。", "凧は風に向かってあがるんだって。今日のあなたもそうだったね。とってもうれしいな。"],
    chapT: (n) => `凧のおはなし · 第${n}章`,
    story: ["けさ、{n}は押し入れで古い紙の凧を見つけました。骨組みにはメモがついていて「どんな空の旅も、小さなひと引きから始まる」と書いてありました。{n}はそれを、あなたの目標のすぐとなりに飾りました。",
      "あなたが目標をひとつ達成するたびに、凧のしっぽにリボンがひとつ増えます。{n}は念のため2回数えて、2回ともにっこりしました。",
      "{n}は凧を野原へ持っていきました。はじめはふらふらしていたけれど、やがて風をつかまえました。「小さな習慣みたい」と{n}。「はじめはふらふらでも、そのうち飛べるんだね」",
      "いま凧はとても高くて、空に浮かぶ色とりどりの点のようです。{n}はあなたに伝えたいそうです。糸を持っているのは、あなたなんだよ、と。いっしょに過ごした毎日を、ありがとう。"],
    annT: "新しいシーズンのはじまり", annP: (n) => `凧のシーズンがやってきました。${n}があなたのために新しい小道を用意しています。道の途中には新しいごほうびも。`, annRT: "凧のシーズンがまたやってきました", annRP: (n) => `${n}があなたのために新しい小道を用意しています。もう持っている凧のごほうびは、かわりにTanìになります。`,
    items: { rug_kite: "凧のラグ", w_kites: "空の凧の壁紙", h_pinwheel: "かざぐるまのカチューシャ", h_kite: "凧のぼうし" }
  },
  ko: {
    name: "연날리기 시즌", lake: "연 날리는 들판", lakeTap: "들판을 눌러 연을 날려 보세요",
    wishes: ["높이, 더 높이! 꼬리에 작은 소원을 묶었어. 너에게 가벼운 하루가 오기를.", "얼마나 높이 나는지 봐! 작은 걸음도 연줄처럼 차곡차곡 이어져.", "바람이 우리 연을 데려갔어. 너에게 보내는 커다란 포옹도 함께.", "연은 바람을 거슬러 올라간대. 오늘 너도 그랬어. 정말 기뻐."],
    chapT: (n) => `연 이야기 · ${n}장`,
    story: ["오늘 아침 {n}이(가) 벽장에서 오래된 종이 연을 찾았어요. 연살에는 \"모든 비행은 작은 당김에서 시작돼\"라고 적힌 쪽지가 붙어 있었어요. {n}은(는) 그 연을 너의 목표 바로 옆에 걸어 두었어요.",
      "네가 목표를 체크할 때마다 연 꼬리에 리본이 하나씩 늘어나요. {n}은(는) 혹시 몰라 두 번이나 세어 보고, 두 번 다 방긋 웃었어요.",
      "{n}이(가) 연을 들판으로 가져갔어요. 처음엔 비틀거리다가, 곧 바람을 탔어요. \"작은 습관이랑 똑같네.\" {n}이(가) 말했어요. \"처음엔 비틀거려도 결국 날아오르거든.\"",
      "이제 연은 아주 높이 올라가 하늘에 뜬 알록달록한 점처럼 보여요. {n}은(는) 네가 꼭 알았으면 해요. 연줄을 잡고 있는 건 바로 너라는 걸요. 함께한 모든 날, 고마워요."],
    annT: "새로운 시즌이 시작돼요", annP: (n) => `연날리기 시즌이에요. ${n}이(가) 너를 위해 새 오솔길을 준비했어요. 길 곳곳에 새로운 보상도 있어요.`, annRT: "연날리기 시즌이 돌아왔어요", annRP: (n) => `${n}이(가) 새 오솔길을 준비했어요. 이미 가진 연 보상은 대신 Tanì로 받아요.`,
    items: { rug_kite: "연 러그", w_kites: "하늘의 연 벽지", h_pinwheel: "바람개비 머리띠", h_kite: "연 모자" }
  },
  zh: {
    name: "风筝季", lake: "风筝草地", lakeTap: "点一下草地，放飞一只风筝",
    wishes: ["飞呀飞！我在风筝尾巴上系了一个小小的愿望：祝你今天轻轻松松。", "看它飞得多高！小小的步子会一点点累积，就像风筝线一样。", "风把我们的风筝带走了，也把一个大大的拥抱带给了你。", "风筝是逆着风飞起来的。今天的你也是这样，我好开心。"],
    chapT: (n) => `风筝的故事 · 第 ${n} 章`,
    story: ["今天早上，{n}在柜子里发现了一只旧纸风筝，骨架上贴着一张字条：“每一次飞翔，都从轻轻一拉开始。”{n}把它挂在了你的目标旁边。",
      "你每完成一个目标，风筝尾巴上就多一个蝴蝶结。{n}为了保险数了两遍，两遍都笑了。",
      "{n}把风筝带到了草地上。一开始它摇摇晃晃，后来风接住了它。“就像小小的习惯，”{n}说，“一开始也会摇晃，然后就飞起来了。”",
      "现在风筝飞得好高，看起来像天空里的一个彩色小点。{n}想让你知道：握着风筝线的人，是你。谢谢你陪伴的每一天。"],
    annT: "新的季节开始了", annP: (n) => `风筝季来啦：${n}为你准备了一条新的小路，沿途还有新的奖励。`, annRT: "风筝季又来啦", annRP: (n) => `${n}为你准备了一条新的小路。已经拥有的风筝奖励会换成 Tanì。`,
    items: { rug_kite: "风筝地毯", w_kites: "天空风筝墙纸", h_pinwheel: "风车发箍", h_kite: "风筝帽" }
  },
  zht: {
    name: "風箏季", lake: "風箏草地", lakeTap: "點一下草地，放飛一隻風箏",
    wishes: ["飛呀飛！我在風箏尾巴上繫了一個小小的願望：祝你今天輕輕鬆鬆。", "看它飛得多高！小小的步伐會一點一點累積，就像風箏線一樣。", "風把我們的風箏帶走了，也把一個大大的擁抱帶給了你。", "風箏是逆著風飛起來的。今天的你也是這樣，我好開心。"],
    chapT: (n) => `風箏的故事 · 第 ${n} 章`,
    story: ["今天早上，{n}在櫃子裡發現了一隻舊紙風箏，骨架上貼著一張字條：「每一次飛翔，都從輕輕一拉開始。」{n}把它掛在了你的目標旁邊。",
      "你每完成一個目標，風箏尾巴上就多一個蝴蝶結。{n}為了保險數了兩遍，兩遍都笑了。",
      "{n}把風箏帶到了草地上。一開始它搖搖晃晃，後來風接住了它。「就像小小的習慣，」{n}說，「一開始也會搖晃，然後就飛起來了。」",
      "現在風箏飛得好高，看起來像天空裡的一個彩色小點。{n}想讓你知道：握著風箏線的人，是你。謝謝你陪伴的每一天。"],
    annT: "新的季節開始了", annP: (n) => `風箏季來囉：${n}為你準備了一條新的小路，沿途還有新的獎勵。`, annRT: "風箏季又來囉", annRP: (n) => `${n}為你準備了一條新的小路。已經擁有的風箏獎勵會換成 Tanì。`,
    items: { rug_kite: "風箏地毯", w_kites: "天空風箏壁紙", h_pinwheel: "風車髮箍", h_kite: "風箏帽" }
  },
  ru: {
    name: "Сезон воздушных змеев", lake: "Луг воздушных змеев", lakeTap: "Коснись луга и запусти воздушного змея",
    wishes: ["Выше, ещё выше! К хвосту привязано маленькое желание: лёгкого дня тебе.", "Смотри, как высоко летит! Маленькие шаги складываются, совсем как нитка.", "Ветер унёс нашего змея, а вместе с ним и большие объятия для тебя.", "Воздушные змеи поднимаются против ветра, а не по ветру. Сегодня у тебя получилось так же, и это меня очень радует."],
    chapT: (n) => `История воздушного змея · глава ${n}`,
    story: ["Сегодня утром {n} находит в шкафу старого бумажного змея. На каркасе записка: «Каждый полёт начинается с маленького рывка». {n} вешает его рядом с твоими целями.",
      "Каждая отмеченная цель добавляет бантик на хвост змея. {n} пересчитывает их два раза, на всякий случай, и оба раза улыбается.",
      "{n} выносит змея на луг. Сначала он качается, а потом его подхватывает ветер. {n} говорит: «Это как маленькие привычки. Сначала они тоже качаются, а потом летят».",
      "Теперь змей так высоко, что похож на цветную точку в небе. {n} хочет тебе сказать: нитку держишь ты. Спасибо за каждый день вместе."],
    annT: "Начинается новый сезон", annP: (n) => `Наступил Сезон воздушных змеев: у ${n} для тебя новая тропа с новыми наградами по пути.`, annRT: "Сезон воздушных змеев вернулся", annRP: (n) => `У ${n} для тебя новая тропа. Если какая-то награда сезона змеев у тебя уже есть, вместо неё получишь Tanì.`,
    items: { rug_kite: "Коврик со змеем", w_kites: "Змеи в небе", h_pinwheel: "Ободок с вертушкой", h_kite: "Шляпа-змей" }
  },
  pl: {
    name: "Sezon Latawców", lake: "Łąka Latawców", lakeTap: "Dotknij łąki i puść latawca",
    wishes: ["W górę, wyżej! Do ogona przywiązane jest małe życzenie: lekki dzień dla ciebie.", "Zobacz, jak wysoko leci! Małe kroki się sumują, zupełnie jak sznurek.", "Wiatr porwał naszego latawca, a razem z nim wielki uścisk dla ciebie.", "Latawce wznoszą się pod wiatr, a nie z wiatrem. Dziś też ci się to udało i to mnie bardzo cieszy."],
    chapT: (n) => `Opowieść o latawcu · rozdział ${n}`,
    story: ["Dziś rano {n} znajduje w szafie starego papierowego latawca. Na stelażu jest karteczka: „Każdy lot zaczyna się od małego szarpnięcia”. {n} wiesza go tuż obok twoich celów.",
      "Każdy odhaczony cel dodaje kokardkę do ogona latawca. {n} liczy je dwa razy, tak na wszelki wypadek, i za każdym razem się uśmiecha.",
      "{n} zabiera latawca na łąkę. Najpierw się chwieje, potem łapie go wiatr. {n} mówi: „To jak małe nawyki. Też się najpierw chwieją, a potem fruną”.",
      "Teraz latawiec jest tak wysoko, że wygląda jak kolorowa kropka na niebie. {n} chce ci powiedzieć: sznurek trzymasz ty. Dziękuję za każdy wspólny dzień."],
    annT: "Zaczyna się nowy sezon", annP: (n) => `Nadszedł Sezon Latawców: ${n} ma dla ciebie nową ścieżkę z nowymi nagrodami po drodze.`, annRT: "Sezon Latawców wraca", annRP: (n) => `${n} ma dla ciebie nową ścieżkę. Jeśli masz już którąś nagrodę latawców, w zamian dostaniesz Tanì.`,
    items: { rug_kite: "Dywan latawiec", w_kites: "Latawce na niebie", h_pinwheel: "Opaska z wiatraczkiem", h_kite: "Kapelusz latawiec" }
  },
  nl: {
    name: "Vliegerseizoen", lake: "Vliegerweide", lakeTap: "Tik op de weide en laat een vlieger op",
    wishes: ["Omhoog maar! Ik heb een kleine wens aan de staart geknoopt: een luchtige dag voor jou.", "Kijk eens hoe hoog hij gaat! Kleine stapjes tellen op, net als het touw.", "De wind nam onze vlieger mee, en een grote knuffel voor jou erbij.", "Vliegers stijgen tegen de wind in, niet met de wind mee. Dat deed jij vandaag ook, en daar word ik zo blij van."],
    chapT: (n) => `Het verhaal van de vlieger · hoofdstuk ${n}`,
    story: ["Vanochtend vond {n} een oude papieren vlieger in de kast, met een briefje aan het frame: 'Elke vlucht begint met een klein rukje.' {n} heeft hem vlak naast je doelen opgehangen.",
      "Elk doel dat je afvinkt, knoopt een strikje aan de staart van de vlieger. {n} heeft ze twee keer geteld, voor de zekerheid, en moest allebei de keren glimlachen.",
      "{n} nam de vlieger mee naar de weide. Eerst wiebelde hij, toen ving de wind hem op. 'Net als kleine gewoontes,' zei {n}. 'Die wiebelen ook eerst, en dan vliegen ze.'",
      "Nu is de vlieger zo hoog dat hij lijkt op een gekleurd stipje in de lucht. {n} wil dat je het weet: jij houdt het touw vast. Dank je voor elke dag samen."],
    annT: "Een nieuw seizoen begint", annP: (n) => `Het is Vliegerseizoen: ${n} heeft een nieuw pad voor je, met nieuwe beloningen onderweg.`, annRT: "Het Vliegerseizoen is terug", annRP: (n) => `${n} heeft een nieuw pad voor je. Heb je een vliegerbeloning al, dan krijg je in plaats daarvan Tanì.`,
    items: { rug_kite: "Vliegerkleed", w_kites: "Vliegers in de lucht", h_pinwheel: "Molentjesdiadeem", h_kite: "Vliegerhoed" }
  },
  tr: {
    name: "Uçurtma Sezonu", lake: "Uçurtma Çayırı", lakeTap: "Çayıra dokun ve bir uçurtma uçur",
    wishes: ["Yukarı, daha yukarı! Kuyruğuna küçük bir dilek bağladım: sana hafif bir gün.", "Bak ne kadar yükseğe çıktı! Küçük adımlar da ip gibi birbirine eklenir.", "Rüzgâr uçurtmamızı alıp götürdü, yanında da sana kocaman bir sarılma.", "Uçurtmalar rüzgâra karşı yükselir, rüzgârla değil. Bugün sen de öyle yaptın, buna çok seviniyorum."],
    chapT: (n) => `Uçurtmanın hikâyesi · bölüm ${n}`,
    story: ["Bu sabah {n} dolapta eski bir kâğıt uçurtma buldu. Çıtasında bir not vardı: \"Her uçuş küçük bir çekişle başlar.\" {n} onu hedeflerinin hemen yanına astı.",
      "İşaretlediğin her hedef, uçurtmanın kuyruğuna bir fiyonk ekliyor. {n} onları emin olmak için iki kez saydı ve ikisinde de gülümsedi.",
      "{n} uçurtmayı çayıra götürdü. Önce sallandı, sonra rüzgâr onu yakaladı. \"Küçük alışkanlıklar gibi,\" dedi {n}. \"Onlar da önce sallanır, sonra uçar.\"",
      "Uçurtma artık o kadar yükseklerde ki gökyüzünde renkli bir nokta gibi görünüyor. {n} bilmeni istiyor: ipi tutan sensin. Birlikte geçirdiğimiz her gün için teşekkürler."],
    annT: "Yeni bir sezon başlıyor", annP: (n) => `Uçurtma Sezonu geldi: ${n} senin için yeni bir yol hazırladı, yol boyunca yeni ödüller de var.`, annRT: "Uçurtma Sezonu geri döndü", annRP: (n) => `${n} senin için yeni bir yol hazırladı. Zaten sahip olduğun uçurtma ödüllerinin yerine Tanì alırsın.`,
    items: { rug_kite: "Uçurtma halısı", w_kites: "Gökyüzünde uçurtmalar", h_pinwheel: "Fırıldaklı taç bandı", h_kite: "Uçurtma şapkası" }
  }
};
Object.keys(V22_KITES).forEach((l) => { const t = T[l]; if (!t) return; t.kites = V22_KITES[l]; t.items = Object.assign(t.items || {}, V22_KITES[l].items); });
