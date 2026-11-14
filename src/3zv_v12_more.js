/* v12: compagni Plus, promemoria, bentornato, invita un amico (de, es, fr, pt, ja, ko, zh, zht, ru, pl, nl, tr) */

/* ---------- Deutsch ---------- */
Object.assign(T.de.pets, { miko: ["Miko", "Ein Kätzchen, weich wie eine Wolke."], rufi: ["Rufi", "Ein neugieriges, mutiges Füchschen."], pingo: ["Pingo", "Ein Pinguin, der niemals aufgibt."], dori: ["Dori", "Ein sanfter, etwas tollpatschiger Drache."] });
T.de.v12 = {
  ppT: "Plus-Begleiter", ppP: "Noch mehr besondere Freunde, mit Tanetto Plus.", want: (n) => `Ich will ${n}`, choose: (n) => `${n} wählen`, back: "Zurück",
  meT: "Dein Begleiter", meP: "Du kannst jederzeit wechseln: Level, Objekte und Fortschritte bleiben alle erhalten.", change: "Begleiter wechseln", cur: "Gerade bei dir", hi: (n) => `Hallo, ich bin ${n}! Schön, bei dir zu sein.`, keep: "Falls Plus einmal endet, bleibt dein gewählter Begleiter bei dir.",
  perk: (k) => `${k} exklusive Begleiter`,
  firstT: "Dein erster Schritt!", firstP: (n) => `Tippe auf den Kreis neben einem Ziel, wenn du es geschafft hast: ${n} tankt dann Energie.`, giftT: "Ein Willkommensgeschenk", giftP: (n) => `${n} hat etwas für dich: 50 Tanì, um das kleine Zimmer einzurichten.`, giftB: "Danke!",
  remT: "Eine tägliche Erinnerung", remP: (n) => `Wähle eine Uhrzeit: ${n} erinnert dich sanft daran, vorbeizuschauen. Die Erinnerung kommt in den Kalender deines Handys.`, remTime: "Uhrzeit der Erinnerung", remG: "Google Calendar", remI: "Anderer Kalender", remDone: "Erinnerung bereit: Öffne sie und speichere sie im Kalender.",
  remTitle: (n) => `${n} wartet auf dich 🌱`, remBody: "Ein kleiner Schritt, um gut für dich zu sorgen. Öffne Tanetto:", remAsk: "Möchtest du jeden Tag eine sanfte Erinnerung?", remLater: "Nein, danke",
  backT: "Willkommen zurück!", backP: [(n) => `${n} freut sich riesig, dich wiederzusehen! Die vergangenen Tage sind kein Problem: Wir machen einfach hier weiter, zusammen.`, (n) => `Juhu, du bist wieder da! ${n} hat dir dein Plätzchen schön warm gehalten.`, (n) => `${n} hat schon auf dich gewartet. Heute reicht auch ein ganz kleiner Schritt.`], backGift: "+20 Tanì zur Begrüßung", backB: "Los geht's",
  invT: "Lade jemanden ein", invP: (n) => `Zusammen macht Selbstfürsorge mehr Spaß. Schick jemandem ein Bild von ${n}.`, invB: "Einladen", invTitle: (n) => `Das ist ${n}!`, invSub: "Sorg gut für dich, mit einem kleinen Freund · kostenlos", invText: (n) => `Das ist ${n}, mein kleiner Begleiter in Tanetto: Gemeinsam sorgen wir gut für uns, Schritt für Schritt. Probier's aus, es ist kostenlos!`,
  lite: "Sparmodus", liteP: "Weniger Effekte, flüssiger auf langsamen Handys. Schaltet sich bei Bedarf von selbst ein."
};

/* ---------- Español ---------- */
Object.assign(T.es.pets, { miko: ["Miko", "Un gatito suave como una nube."], rufi: ["Rufi", "Una zorrita curiosa y valiente."], pingo: ["Pingo", "Un pingüino que nunca se rinde."], dori: ["Dori", "Un dragoncito tierno y algo torpe."] });
T.es.v12 = {
  ppT: "Compañeros Plus", ppP: "Más amigos especiales, con Tanetto Plus.", want: (n) => `Quiero a ${n}`, choose: (n) => `Elegir a ${n}`, back: "Atrás",
  meT: "Tu compañero", meP: "Puedes cambiarlo cuando quieras: el nivel, los objetos y el progreso se quedan.", change: "Cambiar compañero", cur: "Contigo ahora", hi: (n) => `¡Hola, soy ${n}! Qué alegría estar contigo.`, keep: "Si algún día termina Plus, el compañero que elegiste se queda contigo.",
  perk: (k) => `${k} compañeros exclusivos`,
  firstT: "¡Tu primer paso!", firstP: (n) => `Toca el círculo junto a un objetivo cuando lo hayas hecho: ${n} se llenará de energía.`, giftT: "Un regalo de bienvenida", giftP: (n) => `${n} tiene algo para ti: 50 Tanì para empezar a decorar su cuartito.`, giftB: "¡Gracias!",
  remT: "Un recordatorio cada día", remP: (n) => `Elige la hora: ${n} te recordará con cariño que pases a saludar. Se añade al calendario del móvil.`, remTime: "Hora del recordatorio", remG: "Google Calendar", remI: "Otro calendario", remDone: "Recordatorio listo: ábrelo y guárdalo en tu calendario.",
  remTitle: (n) => `${n} te espera 🌱`, remBody: "Un pequeño paso para cuidarte. Abre Tanetto:", remAsk: "¿Quieres un recordatorio amable cada día?", remLater: "No, gracias",
  backT: "¡Qué bueno verte!", backP: [(n) => `¡${n} está feliz de volver a verte! No pasa nada por los días pasados: seguimos desde aquí, juntos.`, (n) => `¡Qué alegría, ya estás aquí! ${n} te ha guardado el sitio calentito.`, (n) => `${n} te estaba esperando. Hoy basta con un pasito chiquito.`], backGift: "+20 Tanì de bienvenida", backB: "Volvamos a empezar",
  invT: "Invita a alguien", invP: (n) => `Cuidarse es más bonito en compañía. Envía a alguien una foto de ${n}.`, invB: "Invitar", invTitle: (n) => `¡Te presento a ${n}!`, invSub: "Cuídate con un pequeño amigo · gratis", invText: (n) => `Te presento a ${n}, mi pequeño compañero en Tanetto: nos ayuda a cuidarnos, paso a paso. ¡Pruébalo, es gratis!`,
  lite: "Modo ligero", liteP: "Menos efectos, más fluido en móviles lentos. Se activa solo si hace falta."
};

/* ---------- Français ---------- */
Object.assign(T.fr.pets, { miko: ["Miko", "Un chaton doux comme un nuage."], rufi: ["Rufi", "Un petit renard curieux et courageux."], pingo: ["Pingo", "Un manchot qui n'abandonne jamais."], dori: ["Dori", "Un petit dragon gentil et un peu maladroit."] });
T.fr.v12 = {
  ppT: "Compagnons Plus", ppP: "D'autres amis spéciaux, avec Tanetto Plus.", want: (n) => `Je veux ${n}`, choose: (n) => `Choisir ${n}`, back: "Retour",
  meT: "Ton compagnon", meP: "Tu peux en changer quand tu veux : niveau, objets et progrès, tout est conservé.", change: "Changer de compagnon", cur: "Avec toi en ce moment", hi: (n) => `Coucou, c'est ${n} ! Quelle joie d'être avec toi.`, keep: "Si Plus s'arrête un jour, le compagnon que tu as choisi reste avec toi.",
  perk: (k) => `${k} compagnons exclusifs`,
  firstT: "Ton premier pas !", firstP: (n) => `Touche le cercle à côté d'un objectif quand tu l'as fait : ${n} se remplira d'énergie.`, giftT: "Un cadeau de bienvenue", giftP: (n) => `${n} a quelque chose pour toi : 50 Tanì pour commencer à décorer sa petite chambre.`, giftB: "Merci !",
  remT: "Un rappel chaque jour", remP: (n) => `Choisis l'heure : ${n} te rappellera tout doucement de passer faire un coucou. Le rappel s'ajoute au calendrier du téléphone.`, remTime: "Heure du rappel", remG: "Google Calendar", remI: "Autre calendrier", remDone: "Rappel prêt : ouvre-le et enregistre-le dans ton calendrier.",
  remTitle: (n) => `${n} t'attend 🌱`, remBody: "Un petit pas pour prendre soin de toi. Ouvre Tanetto :", remAsk: "Tu veux un petit rappel tout doux chaque jour ?", remLater: "Non, merci",
  backT: "Te revoilà !", backP: [(n) => `Quelle joie pour ${n} de te revoir ! Pas de souci pour les jours passés : on repart d'ici, ensemble.`, (n) => `Youpi, te revoilà ! ${n} t'a gardé ta place bien au chaud.`, (n) => `${n} t'attendait. Aujourd'hui, même un tout petit pas suffit.`], backGift: "+20 Tanì pour ton retour", backB: "On recommence",
  invT: "Inviter quelqu'un", invP: (n) => `Prendre soin de soi, c'est plus sympa à plusieurs. Envoie une photo de ${n} à quelqu'un.`, invB: "Inviter", invTitle: (n) => `Je te présente ${n} !`, invSub: "Prends soin de toi avec un petit ami · gratuit", invText: (n) => `Je te présente ${n}, mon petit compagnon sur Tanetto : on prend soin de nous, un petit pas à la fois. Essaie, c'est gratuit !`,
  lite: "Mode léger", liteP: "Moins d'effets, plus fluide sur les téléphones lents. S'active tout seul si besoin."
};

/* ---------- Português (Brasil) ---------- */
Object.assign(T.pt.pets, { miko: ["Miko", "Um gatinho macio como uma nuvem."], rufi: ["Rufi", "Uma raposinha curiosa e corajosa."], pingo: ["Pingo", "Um pinguim que nunca desiste."], dori: ["Dori", "Um dragãozinho gentil e meio desajeitado."] });
T.pt.v12 = {
  ppT: "Companheiros Plus", ppP: "Mais amigos especiais, com o Tanetto Plus.", want: (n) => `Quero ${n}`, choose: (n) => `Escolher ${n}`, back: "Voltar",
  meT: "Seu companheiro", meP: "Você pode trocar quando quiser: nível, itens e progresso continuam todos aqui.", change: "Trocar companheiro", cur: "Com você agora", hi: (n) => `Oi, eu sou ${n}! Que bom estar com você.`, keep: "Se um dia o Plus acabar, o companheiro que você escolheu continua com você.",
  perk: (k) => `${k} companheiros exclusivos`,
  firstT: "Seu primeiro passo!", firstP: (n) => `Toque no círculo ao lado de uma meta quando concluir: ${n} vai se encher de energia.`, giftT: "Um presente de boas-vindas", giftP: (n) => `${n} tem uma coisa para você: 50 Tanì para começar a decorar o quartinho.`, giftB: "Oba, valeu!",
  remT: "Um lembrete todo dia", remP: (n) => `Escolha o horário: ${n} vai te lembrar com carinho de passar para uma visitinha. O lembrete vai para a agenda do celular.`, remTime: "Horário do lembrete", remG: "Google Calendar", remI: "Outra agenda", remDone: "Lembrete pronto: abra e salve na sua agenda.",
  remTitle: (n) => `${n} está te esperando 🌱`, remBody: "Um passinho para se cuidar. Abra o Tanetto:", remAsk: "Quer um lembrete carinhoso todo dia?", remLater: "Agora não",
  backT: "Que bom te ver de novo!", backP: [(n) => `${n} está muito feliz em te ver de novo! Sem problema pelos dias que passaram: a gente recomeça daqui, juntos.`, (n) => `Oba, você voltou! ${n} guardou seu lugarzinho bem quentinho.`, (n) => `${n} estava te esperando. Hoje, até um passinho bem pequeno já basta.`], backGift: "+20 Tanì de boas-vindas", backB: "Vamos recomeçar",
  invT: "Convide alguém", invP: (n) => `Se cuidar é mais gostoso em companhia. Mande uma foto de ${n} para alguém.`, invB: "Convidar", invTitle: (n) => `Conheça ${n}!`, invSub: "Cuide de você com um amiguinho · grátis", invText: (n) => `Conheça ${n}, meu companheirinho no Tanetto: a gente se cuida junto, um passinho de cada vez. Experimenta, é grátis!`,
  lite: "Modo leve", liteP: "Menos efeitos, mais fluido em celulares lentos. Liga sozinho quando precisa."
};

/* ---------- 日本語 ---------- */
Object.assign(T.ja.pets, { miko: ["Miko", "雲みたいにふわふわの子ネコ。"], rufi: ["Rufi", "好奇心いっぱいの、勇気ある子ギツネ。"], pingo: ["Pingo", "ぜったいにあきらめないペンギン。"], dori: ["Dori", "やさしくて、ちょっぴりドジなドラゴン。"] });
T.ja.v12 = {
  ppT: "Plusのパートナー", ppP: "Tanetto Plusで、特別な仲間がもっと。", want: (n) => `${n}をむかえたい`, choose: (n) => `${n}にする`, back: "もどる",
  meT: "あなたのパートナー", meP: "いつでも変えられます。レベルもアイテムも進み具合も、ぜんぶそのまま。", change: "パートナーを変える", cur: "いまいっしょ", hi: (n) => `こんにちは、${n}だよ! いっしょにいられてうれしいな。`, keep: "もしPlusが終わっても、選んだパートナーはずっといっしょです。",
  perk: (k) => `限定パートナー${k}匹`,
  firstT: "はじめの一歩!", firstP: (n) => `目標ができたら、となりの丸をタップしてね。${n}が元気いっぱいになります。`, giftT: "ようこそのプレゼント", giftP: (n) => `${n}からのプレゼント。お部屋の飾りつけを始めるための50 Tanìです。`, giftB: "ありがとう!",
  remT: "毎日のリマインダー", remP: (n) => `時間を選んでね。${n}が、会いにきてねとやさしく知らせてくれます。スマホのカレンダーに追加されます。`, remTime: "リマインダーの時間", remG: "Google Calendar", remI: "ほかのカレンダー", remDone: "リマインダーの準備ができました。開いてカレンダーに保存してね。",
  remTitle: (n) => `${n}が待ってるよ 🌱`, remBody: "自分を大切にする、小さな一歩。Tanettoを開こう:", remAsk: "毎日、やさしいリマインダーを受け取る?", remLater: "いまはいい",
  backT: "おかえりなさい!", backP: [(n) => `${n}はまた会えてとってもうれしそう! 休んだ日のことは気にしないで。ここからまた、いっしょに始めよう。`, (n) => `やったー、おかえり! ${n}があなたの場所をぽかぽかにしておいたよ。`, (n) => `${n}はずっと待っていたよ。今日はほんの小さな一歩で十分。`], backGift: "おかえりの+20 Tanì", backB: "また始めよう",
  invT: "友だちを招待", invP: (n) => `自分を大切にするのは、だれかといっしょだともっと楽しい。友だちに${n}の写真を送ろう。`, invB: "招待する", invTitle: (n) => `${n}を紹介するね!`, invSub: "小さな仲間と、自分を大切に・無料", invText: (n) => `${n}を紹介するね。Tanettoでいっしょにいる小さなパートナーだよ。一歩ずつ、自分を大切にできるアプリ。無料だから試してみて!`,
  lite: "軽量モード", liteP: "演出をひかえめにして、動きの遅いスマホでもなめらかに。必要なときは自動でオンになります。"
};

/* ---------- 한국어 ---------- */
Object.assign(T.ko.pets, { miko: ["Miko", "구름처럼 보들보들한 아기 고양이예요."], rufi: ["Rufi", "호기심 많고 용감한 아기 여우예요."], pingo: ["Pingo", "절대 포기하지 않는 펭귄이에요."], dori: ["Dori", "다정하고 조금 서툰 아기 용이에요."] });
T.ko.v12 = {
  ppT: "Plus 친구", ppP: "Tanetto Plus와 함께라면 특별한 친구가 더 많아요.", want: (n) => `${n} 만나고 싶어요`, choose: (n) => `${n} 선택하기`, back: "뒤로",
  meT: "나의 친구", meP: "언제든 바꿀 수 있어요. 레벨, 아이템, 진행 상황은 모두 그대로예요.", change: "친구 바꾸기", cur: "지금 함께하는 중", hi: (n) => `안녕! 내 이름은 ${n}. 함께라서 정말 행복해!`, keep: "Plus가 끝나더라도 내가 고른 친구는 계속 곁에 있어요.",
  perk: (k) => `전용 친구 ${k}명`,
  firstT: "첫걸음이에요!", firstP: (n) => `목표를 해냈다면 옆의 동그라미를 탭하세요. ${n}의 에너지가 가득 차올라요.`, giftT: "환영 선물", giftP: (n) => `${n}의 선물이에요. 작은 방을 꾸미기 시작할 수 있는 50 Tanì예요.`, giftB: "고마워요!",
  remT: "매일 알림 받기", remP: (n) => `시간을 골라 주세요. ${n}의 다정한 알림이 매일 들러 달라고 알려 줄 거예요. 휴대폰 캘린더에 추가돼요.`, remTime: "알림 시간", remG: "Google Calendar", remI: "다른 캘린더", remDone: "알림 준비 완료! 열어서 캘린더에 저장하세요.",
  remTitle: (n) => `${n}한테 들러 주세요 🌱`, remBody: "나를 돌보는 작은 한 걸음. Tanetto 열기:", remAsk: "매일 다정한 알림을 받아 볼까요?", remLater: "괜찮아요",
  backT: "다시 와 줘서 반가워요!", backP: [(n) => `다시 만나서 ${n}도 정말 기뻐해요! 지난날은 걱정하지 마세요. 여기서부터 다시 함께 시작해요.`, (n) => `와, 돌아왔네요! ${n}의 곁에 따뜻한 자리를 그대로 남겨 두었어요.`, (n) => `${n}도 내내 기다리고 있었어요. 오늘은 아주 작은 한 걸음이면 충분해요.`], backGift: "돌아온 기념 +20 Tanì", backB: "다시 시작하기",
  invT: "친구 초대하기", invP: (n) => `나를 돌보는 일은 함께하면 더 즐거워요. 친구에게 ${n}의 사진을 보내 보세요.`, invB: "초대하기", invTitle: (n) => `${n}에게 인사해 줘!`, invSub: "작은 친구와 함께 나를 돌봐요 · 무료", invText: (n) => `${n}에게 인사해 줘! Tanetto에서 함께하는 내 작은 친구야. 한 걸음씩 나를 돌볼 수 있게 도와줘. 무료니까 한번 해 봐!`,
  lite: "가벼운 모드", liteP: "효과를 줄여 느린 휴대폰에서도 더 부드럽게. 필요하면 자동으로 켜져요."
};

/* ---------- 简体中文 ---------- */
Object.assign(T.zh.pets, { miko: ["Miko", "一只像云朵一样软绵绵的小猫。"], rufi: ["Rufi", "一只好奇又勇敢的小狐狸。"], pingo: ["Pingo", "一只永不放弃的企鹅。"], dori: ["Dori", "一只温柔又有点笨拙的小龙。"] });
T.zh.v12 = {
  ppT: "Plus 小伙伴", ppP: "开通 Tanetto Plus，结识更多特别的朋友。", want: (n) => `我想要 ${n}`, choose: (n) => `选择 ${n}`, back: "返回",
  meT: "你的小伙伴", meP: "随时都可以更换：等级、物品和进度都会保留。", change: "更换小伙伴", cur: "正在陪着你", hi: (n) => `你好，我是 ${n}！能陪着你真开心。`, keep: "就算以后 Plus 到期，你选的小伙伴也会一直陪着你。",
  perk: (k) => `${k} 个专属小伙伴`,
  firstT: "迈出第一步！", firstP: (n) => `完成一个目标后，点一下旁边的圆圈：${n} 就会充满能量。`, giftT: "见面礼", giftP: (n) => `${n} 给你准备了一份礼物：50 Tanì，可以开始布置小房间啦。`, giftB: "谢谢！",
  remT: "每日提醒", remP: (n) => `选个时间：${n} 会温柔地提醒你来看看。提醒会加到手机日历里。`, remTime: "提醒时间", remG: "Google Calendar", remI: "其他日历", remDone: "提醒已准备好：打开它并保存到日历里。",
  remTitle: (n) => `${n} 在等你 🌱`, remBody: "照顾好自己的一小步。打开 Tanetto：", remAsk: "要不要每天收到一条温柔的提醒？", remLater: "不用了，谢谢",
  backT: "欢迎回来！", backP: [(n) => `再次见到你，${n} 开心极了！之前的日子不用在意，我们从这里一起重新出发。`, (n) => `太好了，你回来啦！${n} 一直帮你把位置捂得暖暖的。`, (n) => `${n} 一直在等你。今天哪怕只迈出一小步也足够了。`], backGift: "回归礼 +20 Tanì", backB: "重新开始",
  invT: "邀请朋友", invP: (n) => `照顾自己，有人陪着会更开心。给朋友发一张 ${n} 的照片吧。`, invB: "邀请", invTitle: (n) => `来认识一下 ${n}！`, invSub: "和小伙伴一起照顾好自己 · 免费", invText: (n) => `来认识一下 ${n}，我在 Tanetto 上的小伙伴：我们一起一步一步照顾好自己。试试吧，免费的！`,
  lite: "轻量模式", liteP: "减少特效，在较慢的手机上更流畅。需要时会自动开启。"
};

/* ---------- 繁體中文（台灣） ---------- */
Object.assign(T.zht.pets, { miko: ["Miko", "一隻像雲朵一樣軟綿綿的小貓。"], rufi: ["Rufi", "一隻好奇又勇敢的小狐狸。"], pingo: ["Pingo", "一隻永不放棄的企鵝。"], dori: ["Dori", "一隻溫柔又有點笨手笨腳的小龍。"] });
T.zht.v12 = {
  ppT: "Plus 小夥伴", ppP: "有了 Tanetto Plus，還有更多特別的朋友。", want: (n) => `我想要 ${n}`, choose: (n) => `選擇 ${n}`, back: "返回",
  meT: "你的小夥伴", meP: "隨時都能更換：等級、物品和進度都會保留。", change: "更換小夥伴", cur: "正在陪你", hi: (n) => `嗨，我是 ${n}！能陪著你好開心。`, keep: "就算哪天 Plus 結束了，你選的小夥伴還是會一直陪著你。",
  perk: (k) => `${k} 個專屬小夥伴`,
  firstT: "踏出第一步！", firstP: (n) => `完成目標後，點一下旁邊的圓圈：${n} 就會充滿能量。`, giftT: "見面禮", giftP: (n) => `${n} 為你準備了一份禮物：50 Tanì，可以開始布置小房間囉。`, giftB: "謝謝！",
  remT: "每日提醒", remP: (n) => `選個時間：${n} 會溫柔地提醒你來看看。提醒會加進手機的行事曆。`, remTime: "提醒時間", remG: "Google Calendar", remI: "其他行事曆", remDone: "提醒準備好了：打開它，存到行事曆裡。",
  remTitle: (n) => `${n} 在等你 🌱`, remBody: "照顧自己的一小步。打開 Tanetto：", remAsk: "要不要每天收到一則溫柔的提醒？", remLater: "不用了，謝謝",
  backT: "歡迎回來！", backP: [(n) => `又見到你了，${n} 超開心！之前的日子別放在心上，我們從這裡一起重新開始。`, (n) => `太好了，你回來了！${n} 一直幫你把位子留得暖呼呼的。`, (n) => `${n} 一直在等你。今天就算只踏出一小步也很夠了。`], backGift: "回歸禮 +20 Tanì", backB: "重新開始",
  invT: "邀請朋友", invP: (n) => `照顧自己，有人陪會更開心。傳一張 ${n} 的照片給朋友吧。`, invB: "邀請", invTitle: (n) => `來認識 ${n}！`, invSub: "和小夥伴一起好好照顧自己 · 免費", invText: (n) => `來認識 ${n}，我在 Tanetto 的小夥伴：我們一起一步一步照顧自己。試試看吧，免費的！`,
  lite: "輕量模式", liteP: "減少特效，在比較慢的手機上更順暢。需要時會自動開啟。"
};

/* ---------- Русский ---------- */
Object.assign(T.ru.pets, { miko: ["Miko", "Котёнок, мягкий, как облачко."], rufi: ["Rufi", "Любопытный и смелый лисёнок."], pingo: ["Pingo", "Пингвин, который никогда не сдаётся."], dori: ["Dori", "Добрый и немножко неуклюжий дракончик."] });
T.ru.v12 = {
  ppT: "Питомцы Plus", ppP: "Ещё больше особенных друзей с Tanetto Plus.", want: (n) => `Хочу: ${n}`, choose: (n) => `Выбрать: ${n}`, back: "Назад",
  meT: "Твой питомец", meP: "Сменить питомца можно в любой момент: уровень, предметы и прогресс сохранятся.", change: "Сменить питомца", cur: "Сейчас с тобой", hi: (n) => `Привет, я ${n}! Как здорово быть рядом с тобой.`, keep: "Если Plus когда-нибудь закончится, выбранный питомец останется с тобой.",
  perk: (k) => `${k} ${(() => { const m = k % 10, h = k % 100; return m === 1 && h !== 11 ? "эксклюзивный питомец" : m >= 2 && m <= 4 && (h < 12 || h > 14) ? "эксклюзивных питомца" : "эксклюзивных питомцев"; })()}`,
  firstT: "Твой первый шаг!", firstP: (n) => `Когда выполнишь цель, нажми на кружок рядом с ней: ${n} наполнится энергией.`, giftT: "Подарок в честь знакомства", giftP: (n) => `${n} дарит тебе 50 Tanì, чтобы начать обустраивать свою комнатку.`, giftB: "Спасибо!",
  remT: "Напоминание каждый день", remP: (n) => `Выбери время: ${n} будет мягко напоминать тебе заглянуть в гости. Напоминание добавится в календарь телефона.`, remTime: "Время напоминания", remG: "Google Calendar", remI: "Другой календарь", remDone: "Напоминание готово: открой его и сохрани в календаре.",
  remTitle: (n) => `${n} ждёт тебя 🌱`, remBody: "Маленький шаг, чтобы позаботиться о себе. Открой Tanetto:", remAsk: "Хочешь получать мягкое напоминание каждый день?", remLater: "Нет, спасибо",
  backT: "С возвращением!", backP: [(n) => `${n} так радуется новой встрече! Пропущенные дни — не беда: начнём отсюда, вместе.`, (n) => `Ура, ты снова здесь! ${n} бережёт для тебя тёплое местечко.`, (n) => `${n} уже ждёт тебя. Сегодня хватит даже совсем маленького шага.`], backGift: "+20 Tanì в честь возвращения", backB: "Начнём снова",
  invT: "Позови друга", invP: (n) => `Заботиться о себе вместе приятнее. Отправь другу фото, где есть ${n}.`, invB: "Пригласить", invTitle: (n) => `Знакомься: ${n}!`, invSub: "Заботься о себе вместе с маленьким другом · бесплатно", invText: (n) => `Знакомься: ${n}, мой маленький питомец в Tanetto. С ним проще заботиться о себе, шаг за шагом. Попробуй, это бесплатно!`,
  lite: "Облегчённый режим", liteP: "Меньше эффектов, плавнее на медленных телефонах. Включается сам, когда нужно."
};

/* ---------- Polski ---------- */
Object.assign(T.pl.pets, { miko: ["Miko", "Kociak miękki jak chmurka."], rufi: ["Rufi", "Ciekawski i odważny lisek."], pingo: ["Pingo", "Pingwin, który nigdy się nie poddaje."], dori: ["Dori", "Łagodny, trochę niezdarny smoczek."] });
T.pl.v12 = {
  ppT: "Towarzysze Plus", ppP: "Więcej wyjątkowych przyjaciół z Tanetto Plus.", want: (n) => `Chcę: ${n}`, choose: (n) => `Wybierz: ${n}`, back: "Wstecz",
  meT: "Twój towarzysz", meP: "Możesz go zmienić, kiedy chcesz: poziom, przedmioty i postępy zostają.", change: "Zmień towarzysza", cur: "Teraz z tobą", hi: (n) => `Cześć, tu ${n}! Super, że jesteśmy razem.`, keep: "Jeśli Plus kiedyś się skończy, wybrany towarzysz zostanie z tobą.",
  perk: (k) => `${k} ${k === 1 ? "wyjątkowy towarzysz" : "wyjątkowych towarzyszy"}`,
  firstT: "Twój pierwszy krok!", firstP: (n) => `Gdy wykonasz cel, dotknij kółka obok niego: ${n} napełni się energią.`, giftT: "Prezent na powitanie", giftP: (n) => `${n} ma coś dla ciebie: 50 Tanì na początek urządzania swojego pokoiku.`, giftB: "Dziękuję!",
  remT: "Codzienne przypomnienie", remP: (n) => `Wybierz godzinę: ${n} co dzień delikatnie przypomni ci, by wpaść w odwiedziny. Przypomnienie trafi do kalendarza w telefonie.`, remTime: "Godzina przypomnienia", remG: "Google Calendar", remI: "Inny kalendarz", remDone: "Przypomnienie gotowe: otwórz je i zapisz w kalendarzu.",
  remTitle: (n) => `${n} czeka na ciebie 🌱`, remBody: "Mały krok, by zadbać o siebie. Otwórz Tanetto:", remAsk: "Chcesz dostawać codziennie łagodne przypomnienie?", remLater: "Nie, dzięki",
  backT: "Witaj z powrotem!", backP: [(n) => `${n} bardzo się cieszy, że znów cię widzi! Nie przejmuj się minionymi dniami: zaczynamy od nowa, razem.`, (n) => `Hurra, jesteś z powrotem! ${n} trzyma dla ciebie cieplutkie miejsce.`, (n) => `${n} czeka na ciebie. Dziś wystarczy nawet malutki krok.`], backGift: "+20 Tanì na powitanie", backB: "Zaczynamy od nowa",
  invT: "Zaproś znajomych", invP: (n) => `Dbanie o siebie jest milsze we dwoje. Wyślij komuś bliskiemu zdjęcie, na którym jest ${n}.`, invB: "Zaproś", invTitle: (n) => `To jest ${n}!`, invSub: "Dbaj o siebie z małym przyjacielem · za darmo", invText: (n) => `To jest ${n}, mój mały towarzysz w Tanetto: razem dbamy o siebie, krok po kroku. Wypróbuj, to nic nie kosztuje!`,
  lite: "Tryb lekki", liteP: "Mniej efektów, płynniej na wolniejszych telefonach. Włącza się sam, gdy trzeba."
};

/* ---------- Nederlands ---------- */
Object.assign(T.nl.pets, { miko: ["Miko", "Een katje zo zacht als een wolkje."], rufi: ["Rufi", "Een nieuwsgierig, dapper vosje."], pingo: ["Pingo", "Een pinguïn die nooit opgeeft."], dori: ["Dori", "Een lief, wat onhandig draakje."] });
T.nl.v12 = {
  ppT: "Plus-maatjes", ppP: "Nog meer bijzondere vriendjes, met Tanetto Plus.", want: (n) => `Ik wil ${n}`, choose: (n) => `Kies ${n}`, back: "Terug",
  meT: "Je maatje", meP: "Je kunt altijd wisselen: level, spulletjes en voortgang blijven allemaal bewaard.", change: "Ander maatje kiezen", cur: "Nu bij je", hi: (n) => `Hoi, ik ben ${n}! Fijn om bij je te zijn.`, keep: "Als Plus ooit stopt, blijft het maatje dat je koos gewoon bij je.",
  perk: (k) => `${k} exclusieve maatjes`,
  firstT: "Je eerste stap!", firstP: (n) => `Tik op het rondje naast een doel als je het gedaan hebt: ${n} krijgt dan nieuwe energie.`, giftT: "Een welkomstcadeautje", giftP: (n) => `${n} heeft iets voor je: 50 Tanì om het kamertje te gaan inrichten.`, giftB: "Dankjewel!",
  remT: "Elke dag een herinnering", remP: (n) => `Kies een tijd: ${n} herinnert je er lief aan om even langs te komen. Het komt in de agenda van je telefoon.`, remTime: "Tijd van de herinnering", remG: "Google Calendar", remI: "Andere agenda", remDone: "Herinnering klaar: open hem en bewaar hem in je agenda.",
  remTitle: (n) => `${n} wacht op je 🌱`, remBody: "Een kleine stap om voor jezelf te zorgen. Open Tanetto:", remAsk: "Wil je elke dag een lieve herinnering?", remLater: "Nee, bedankt",
  backT: "Welkom terug!", backP: [(n) => `${n} is superblij je weer te zien! Geen zorgen om de dagen die voorbij zijn: we gaan vanaf hier verder, samen.`, (n) => `Joepie, je bent er weer! ${n} heeft je plekje lekker warm gehouden.`, (n) => `${n} zat al op je te wachten. Vandaag is zelfs een heel klein stapje genoeg.`], backGift: "+20 Tanì als welkom terug", backB: "We beginnen opnieuw",
  invT: "Nodig iemand uit", invP: (n) => `Voor jezelf zorgen is leuker samen. Stuur iemand een foto van ${n}.`, invB: "Uitnodigen", invTitle: (n) => `Dit is ${n}!`, invSub: "Zorg goed voor jezelf met een klein vriendje · gratis", invText: (n) => `Dit is ${n}, mijn kleine maatje in Tanetto: zo zorgen we goed voor onszelf, stapje voor stapje. Probeer het, het is gratis!`,
  lite: "Lichtgewichtmodus", liteP: "Minder effecten, soepeler op tragere telefoons. Gaat vanzelf aan als het nodig is."
};

/* ---------- Türkçe ---------- */
Object.assign(T.tr.pets, { miko: ["Miko", "Bulut kadar yumuşak bir yavru kedi."], rufi: ["Rufi", "Meraklı ve cesur minik bir tilki."], pingo: ["Pingo", "Asla pes etmeyen bir penguen."], dori: ["Dori", "Nazik ve biraz sakar minik bir ejderha."] });
T.tr.v12 = {
  ppT: "Plus arkadaşları", ppP: "Tanetto Plus ile daha fazla özel arkadaş.", want: (n) => `${n} ile tanış`, choose: (n) => `Seç: ${n}`, back: "Geri",
  meT: "Arkadaşın", meP: "İstediğin zaman değiştirebilirsin: seviye, eşyalar ve ilerleme olduğu gibi kalır.", change: "Arkadaşını değiştir", cur: "Şu an seninle", hi: (n) => `Merhaba, ben ${n}! Seninle olmak çok güzel.`, keep: "Plus bir gün biterse, seçtiğin arkadaş yine seninle kalır.",
  perk: (k) => `${k} özel arkadaş`,
  firstT: "İlk adımın!", firstP: (n) => `Bir hedefi tamamlayınca yanındaki daireye dokun: ${n} enerjiyle dolacak.`, giftT: "Hoş geldin hediyesi", giftP: (n) => `${n} senin için bir şey hazırladı: küçük odayı süslemeye başlaman için 50 Tanì.`, giftB: "Teşekkürler!",
  remT: "Her gün bir hatırlatma", remP: (n) => `Bir saat seç: ${n} sana her gün nazikçe uğramayı hatırlatacak. Telefonunun takvimine eklenir.`, remTime: "Hatırlatma saati", remG: "Google Calendar", remI: "Başka takvim", remDone: "Hatırlatma hazır: aç ve takvimine kaydet.",
  remTitle: (n) => `${n} seni bekliyor 🌱`, remBody: "Kendine iyi bakmak için küçük bir adım. Tanetto'yu aç:", remAsk: "Her gün nazik bir hatırlatma ister misin?", remLater: "Hayır, teşekkürler",
  backT: "Tekrar hoş geldin!", backP: [(n) => `${n} seni yeniden gördüğü için çok mutlu! Geçen günleri dert etme: buradan birlikte yeniden başlıyoruz.`, (n) => `Yaşasın, geri döndün! ${n} yerini sıcacık tuttu.`, (n) => `${n} seni bekliyordu. Bugün minicik bir adım bile yeter.`], backGift: "Tekrar hoş geldin hediyesi: +20 Tanì", backB: "Yeniden başlayalım",
  invT: "Birini davet et", invP: (n) => `Kendine bakmak birlikteyken daha güzel. Birine ${n} ile ilgili bir fotoğraf gönder.`, invB: "Davet et", invTitle: (n) => `${n} ile tanış!`, invSub: "Minik bir dostla kendine iyi bak · ücretsiz", invText: (n) => `${n} ile tanış: Tanetto'daki küçük arkadaşım. Kendimize adım adım iyi bakmamıza yardım ediyor. Dene, ücretsiz!`,
  lite: "Hafif mod", liteP: "Daha az efekt, yavaş telefonlarda daha akıcı. Gerekirse kendiliğinden açılır."
};
