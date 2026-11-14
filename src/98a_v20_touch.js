/* =================== v20 (1.0.8): coccole per zone del corpo, oggetti della stanza da spostare e da regalare =================== */
/* Toccare il compagno non deve mai sembrare un colpo: ogni zona del corpo ha la sua reazione morbida
   (testa = carezza, fianchi = solletico, pancia = grattini, piedini = saltello), con anticipo, schiacciamento ed elasticita'.
   Gli oggetti piccoli e medi della stanza si spostano (modalita' "Sposta" o tenendo premuto) e quelli piccoli si regalano al compagno. */

/* consiglio "Come coccolare" della prima volta (globale, cosi' 98f lo mette in coda con le altre finestre) */
let v20touchHint = function () { /* si imposta piu' sotto */ };

/* --- Testi in 14 lingue --- */
const V20T_TX = {
  it: {
    head: ["Mmm, che carezza dolce...", "Ancora sulla testolina!", "Mi si chiudono gli occhi dalla gioia."],
    side: ["Ihihi, i fianchi no!", "Soffro il solletico, lo sai!", "Ahah, mi fai ridere!"],
    belly: ["Grattini sul pancino! Il mio preferito.", "Mi rotolerei dalla felicità!", "Pancino felice, io felice!"],
    feet: ["Hop! I piedini fanno il solletico!", "Un saltello per te!", "Boing! Sembro una molla!"],
    spam: ["Piano piano, mi fai il solletico!", "Ihih, un attimo, riprendo fiato!"],
    trick: ["Guarda cosa so fare!", "Tadà! Questo è per te."],
    nudge: "Mi lasci il mio posticino?", sleepGive: "Zzz... ci gioco quando mi sveglio.", love: "Che bella la mia stanza adesso!",
    give: { yarn: "Un gomitolo tutto per me! Rotola, rotola!", teddy: "Il mio orsetto! Lo stringo fortissimo.", books: "Una storia? Leggiamola insieme!", guitar: "Plin plin! Ti suono una canzoncina.", soft: "Che morbido... mi ci accoccolo un attimo.", dragon: "Il draghetto! Facciamo finta di volare!", shells: "Se l'avvicini all'orecchio si sente il mare!", crystal: "Guarda come brilla alla luce!", def: "Un regalo? Grazie, lo guardo bene!" },
    arr: "Sposta oggetti", arrT: "Sistema la stanza", arrHint: (n) => `Trascina gli oggetti dove vuoi. Portane uno piccolo a ${n} per darglielo!`,
    done: "Fatto", undo: "Annulla", reset: "Disposizione iniziale", resetToast: "Ogni cosa è tornata al suo posto.", noUndo: "Niente da annullare.",
    mv: (x) => `Sposta: ${x}`, help: "Come si gioca", helpT: (n) => `Come coccolare ${n}`,
    zHead: "Testa: carezze", zSide: "Fianchi: solletico", zBelly: "Pancia: grattini", zFeet: "Piedini: saltello",
    helpStroke: "Tieni il dito sulla testa e muovilo piano: è una carezza lunga.",
    helpArr: (n) => `Per spostare un oggetto tocca il pulsante con le frecce, oppure tienilo premuto. Puoi anche portare un oggetto piccolo a ${n}!`,
    ok: "Ho capito"
  },
  en: {
    head: ["Mmm, what a gentle pat...", "More on my little head!", "I'm so happy my eyes close by themselves."],
    side: ["Hehe, not my sides!", "You know I'm ticklish!", "Haha, you're making me laugh!"],
    belly: ["Belly rubs! My favorite.", "I could roll around with joy!", "Happy tummy, happy me!"],
    feet: ["Hop! My toes are ticklish!", "A little hop just for you!", "Boing! I'm so bouncy!"],
    spam: ["Easy, easy, that tickles!", "Hehe, wait, let me catch my breath!"],
    trick: ["Watch what I can do!", "Ta-da! That one's for you."],
    nudge: "Can I keep my little spot?", sleepGive: "Zzz... I'll play with it when I wake up.", love: "My room looks so lovely now!",
    give: { yarn: "A ball of yarn, all for me! Roll, roll!", teddy: "My teddy! I'm hugging it super tight.", books: "A story? Let's read it together!", guitar: "Plink plink! Let me play you a little song.", soft: "So soft... I'll snuggle in for a moment.", dragon: "The little dragon! Let's pretend we're flying!", shells: "Hold it to your ear and you can hear the sea!", crystal: "Look how it sparkles in the light!", def: "A present? Thank you, let me have a look!" },
    arr: "Move things", arrT: "Arrange the room", arrHint: (n) => `Drag things wherever you like. Bring a small one to ${n} to give it!`,
    done: "Done", undo: "Undo", reset: "Original layout", resetToast: "Everything is back in its place.", noUndo: "Nothing to undo.",
    mv: (x) => `Move: ${x}`, help: "How to play", helpT: (n) => `How to cuddle ${n}`,
    zHead: "Head: pats", zSide: "Sides: tickles", zBelly: "Belly: rubs", zFeet: "Feet: a hop",
    helpStroke: "Rest your finger on the head and move it slowly for a long cuddle.",
    helpArr: (n) => `To move something, tap the arrows button or press and hold it. You can also bring a small thing to ${n}!`,
    ok: "Got it"
  },
  de: {
    head: ["Mmm, so sanft gestreichelt...", "Mehr am Köpfchen!", "Vor Freude fallen mir die Augen zu."],
    side: ["Hihi, nicht an den Seiten!", "Du weißt doch, dass ich kitzlig bin!", "Haha, du bringst mich zum Lachen!"],
    belly: ["Bauchkraulen! Mein Liebstes.", "Ich könnte mich vor Freude kugeln!", "Glückliches Bäuchlein, glückliches Ich!"],
    feet: ["Hopp! Meine Füßchen sind kitzlig!", "Ein kleiner Hüpfer für dich!", "Boing! Ich bin ganz federnd!"],
    spam: ["Langsam, langsam, das kitzelt!", "Hihi, warte, ich muss kurz Luft holen!"],
    trick: ["Schau mal, was ich kann!", "Tadaa! Das ist für dich."],
    nudge: "Lässt du mir mein Plätzchen?", sleepGive: "Zzz... damit spiele ich, wenn ich aufwache.", love: "Mein Zimmer ist jetzt so schön!",
    give: { yarn: "Ein Wollknäuel nur für mich! Es rollt und rollt!", teddy: "Mein Teddy! Ich drück ihn ganz fest.", books: "Eine Geschichte? Lesen wir sie zusammen!", guitar: "Pling pling! Ich spiel dir ein kleines Lied.", soft: "So weich... da kuschle ich mich kurz rein.", dragon: "Der kleine Drache! Tun wir so, als würden wir fliegen!", shells: "Halt sie ans Ohr, dann hörst du das Meer!", crystal: "Schau, wie er im Licht funkelt!", def: "Ein Geschenk? Danke, das schau ich mir genau an!" },
    arr: "Sachen verschieben", arrT: "Zimmer einrichten", arrHint: (n) => `Zieh die Sachen, wohin du willst. Bring etwas Kleines zu ${n}, um es zu verschenken!`,
    done: "Fertig", undo: "Rückgängig", reset: "Ursprüngliche Anordnung", resetToast: "Alles ist wieder an seinem Platz.", noUndo: "Nichts rückgängig zu machen.",
    mv: (x) => `Verschieben: ${x}`, help: "So geht's", helpT: (n) => `So kuschelst du mit ${n}`,
    zHead: "Kopf: streicheln", zSide: "Seiten: kitzeln", zBelly: "Bauch: kraulen", zFeet: "Füße: ein Hüpfer",
    helpStroke: "Leg den Finger auf den Kopf und bewege ihn langsam: So streichelst du lange.",
    helpArr: (n) => `Um etwas zu verschieben, tippe auf die Taste mit den Pfeilen oder halte es gedrückt. Du kannst auch etwas Kleines zu ${n} bringen!`,
    ok: "Verstanden"
  },
  es: {
    head: ["Mmm, qué caricia tan suave...", "¡Más en la cabecita!", "Se me cierran los ojos de felicidad."],
    side: ["¡Jiji, en los costados no!", "¡Ya sabes que tengo cosquillas!", "¡Jaja, me haces reír!"],
    belly: ["¡Rasquitos en la barriguita! Mi favorito.", "¡Me revolcaría de felicidad!", "¡Barriguita feliz, yo feliz!"],
    feet: ["¡Hop! ¡Los piecitos me hacen cosquillas!", "¡Un saltito para ti!", "¡Boing! ¡Parezco un muelle!"],
    spam: ["¡Despacito, despacito, que me haces cosquillas!", "¡Jiji, espera, que recupero el aliento!"],
    trick: ["¡Mira lo que sé hacer!", "¡Tachán! Esto es para ti."],
    nudge: "¿Me dejas mi rinconcito?", sleepGive: "Zzz... jugaré con eso cuando me despierte.", love: "¡Qué bonita está mi habitación ahora!",
    give: { yarn: "¡Un ovillo solo para mí! ¡Rueda, rueda!", teddy: "¡Mi osito! Lo abrazo fortísimo.", books: "¿Un cuento? ¡Leámoslo juntos!", guitar: "¡Plin plin! Te toco una cancioncita.", soft: "Qué blandito... me acurruco un momento.", dragon: "¡El dragoncito! ¡Hagamos como que volamos!", shells: "¡Si te la acercas al oído, se oye el mar!", crystal: "¡Mira cómo brilla con la luz!", def: "¿Un regalo? ¡Gracias, déjame verlo bien!" },
    arr: "Mover cosas", arrT: "Ordena la habitación", arrHint: (n) => `Arrastra las cosas adonde quieras. ¡Lleva una pequeña a ${n} para dársela!`,
    done: "Listo", undo: "Deshacer", reset: "Orden original", resetToast: "Todo ha vuelto a su sitio.", noUndo: "No hay nada que deshacer.",
    mv: (x) => `Mover: ${x}`, help: "Cómo se juega", helpT: (n) => `Cómo mimar a ${n}`,
    zHead: "Cabeza: caricias", zSide: "Costados: cosquillas", zBelly: "Barriga: rasquitos", zFeet: "Pies: un saltito",
    helpStroke: "Apoya el dedo en la cabeza y muévelo despacio: es una caricia larga.",
    helpArr: (n) => `Para mover algo, toca el botón de las flechas o mantenlo pulsado. ¡También puedes llevarle algo pequeño a ${n}!`,
    ok: "Entendido"
  },
  fr: {
    head: ["Mmm, quelle douce caresse...", "Encore sur ma petite tête !", "J'en ferme les yeux de bonheur."],
    side: ["Hihi, pas les côtés !", "Tu sais bien que je crains les chatouilles !", "Haha, tu me fais rire !"],
    belly: ["Des grattouilles sur le ventre ! Mon truc préféré.", "Je me roulerais par terre de bonheur !", "Petit ventre content, moi aussi !"],
    feet: ["Hop ! Mes petons chatouillent !", "Un petit saut rien que pour toi !", "Boing ! Je rebondis !"],
    spam: ["Doucement, doucement, ça chatouille !", "Hihi, attends, je reprends mon souffle !"],
    trick: ["Regarde ce que je sais faire !", "Tadaa ! C'est pour toi."],
    nudge: "Tu me laisses ma petite place ?", sleepGive: "Zzz... j'y jouerai à mon réveil.", love: "Ma chambre est trop jolie maintenant !",
    give: { yarn: "Une pelote rien que pour moi ! Elle roule, elle roule !", teddy: "Mon nounours ! Je le serre très fort.", books: "Une histoire ? Lisons-la ensemble !", guitar: "Plink plink ! Je te joue une petite chanson.", soft: "Tout doux... je m'y blottis un instant.", dragon: "Le petit dragon ! On fait semblant de voler ?", shells: "Si tu l'approches de l'oreille, on entend la mer !", crystal: "Regarde comme il brille à la lumière !", def: "Un cadeau ? Merci, je le regarde de près !" },
    arr: "Déplacer", arrT: "Arrange la chambre", arrHint: (n) => `Glisse les objets où tu veux. Apporte un petit objet à ${n} pour le lui offrir !`,
    done: "Fini", undo: "Annuler", reset: "Disposition d'origine", resetToast: "Tout est revenu à sa place.", noUndo: "Rien à annuler.",
    mv: (x) => `Déplacer : ${x}`, help: "Comment jouer", helpT: (n) => `Comment câliner ${n}`,
    zHead: "Tête : caresses", zSide: "Côtés : chatouilles", zBelly: "Ventre : grattouilles", zFeet: "Pieds : un petit saut",
    helpStroke: "Pose ton doigt sur la tête et bouge-le doucement : c'est une longue caresse.",
    helpArr: (n) => `Pour déplacer un objet, touche le bouton à flèches ou garde le doigt appuyé dessus. Tu peux aussi apporter un petit objet à ${n} !`,
    ok: "Compris"
  },
  pt: {
    head: ["Hmm, que carinho gostoso...", "Mais na cabecinha!", "Meus olhinhos fecham de tanta alegria."],
    side: ["Hihi, do lado não!", "Você sabe que eu sinto cócegas!", "Haha, você me faz rir!"],
    belly: ["Coceguinha na barriga! Meu favorito.", "Dá vontade de rolar de alegria!", "Barriguinha feliz, eu feliz!"],
    feet: ["Opa! Os pezinhos fazem cócegas!", "Um pulinho só pra você!", "Boing! Pareço uma mola!"],
    spam: ["Devagar, devagar, isso faz cócegas!", "Hihi, espera, deixa eu tomar fôlego!"],
    trick: ["Olha o que eu sei fazer!", "Tcharam! Esse é pra você."],
    nudge: "Você me deixa o meu cantinho?", sleepGive: "Zzz... eu brinco com isso quando acordar.", love: "Meu quarto ficou lindo!",
    give: { yarn: "Um novelo só pra mim! Rola, rola!", teddy: "Meu ursinho! Vou abraçar bem forte.", books: "Uma história? Vamos ler juntos!", guitar: "Plim plim! Vou tocar uma musiquinha pra você.", soft: "Que fofinho... vou me aconchegar um pouquinho.", dragon: "O dragãozinho! Vamos fingir que estamos voando!", shells: "Se você encostar no ouvido, dá pra ouvir o mar!", crystal: "Olha como ele brilha na luz!", def: "Um presente? Que lindo, deixa eu ver direitinho!" },
    arr: "Mover coisas", arrT: "Arrume o quarto", arrHint: (n) => `Arraste as coisas para onde quiser. Leve uma pequena até ${n} para dar de presente!`,
    done: "Pronto", undo: "Desfazer", reset: "Arrumação original", resetToast: "Tudo voltou para o lugar.", noUndo: "Nada para desfazer.",
    mv: (x) => `Mover: ${x}`, help: "Como brincar", helpT: (n) => `Como fazer carinho em ${n}`,
    zHead: "Cabeça: carinho", zSide: "Lados: cócegas", zBelly: "Barriga: coceguinha", zFeet: "Pés: um pulinho",
    helpStroke: "Encoste o dedo na cabeça e mexa devagar: é um carinho longo.",
    helpArr: (n) => `Para mover algo, toque no botão de setas ou mantenha pressionado. Você também pode levar uma coisa pequena até ${n}!`,
    ok: "Entendi"
  },
  ja: {
    head: ["んー、やさしいなでなでだね…", "頭、もっとなでて！", "うれしくて目がとじちゃう。"],
    side: ["ふふっ、わきはだめー！", "くすぐったがりなの、知ってるでしょ！", "あはは、笑っちゃう！"],
    belly: ["おなかなでなで！いちばん好き。", "うれしくてころころしちゃう！", "おなかもにこにこだよ！"],
    feet: ["ぴょん！足がくすぐったい！", "あなたのために小さくジャンプ！", "ぽよん！よくはねるでしょ？"],
    spam: ["ゆっくり、ゆっくり、くすぐったいよ！", "ふふっ、ちょっと息をととのえさせて！"],
    trick: ["見てて、こんなことできるよ！", "じゃーん！あなたへのプレゼントだよ。"],
    nudge: "わたしの場所、あけておいてくれる？", sleepGive: "すやすや…起きたら遊ぶね。", love: "お部屋がすてきになったね！",
    give: { yarn: "毛糸玉、ひとりじめ！ころころー！", teddy: "わたしのくまちゃん！ぎゅっと抱きしめるね。", books: "お話？いっしょに読もう！", guitar: "ポロロン！小さな歌をひいてあげるね。", soft: "ふかふか…ちょっとだけ顔をうずめるね。", dragon: "ちびドラゴン！空を飛ぶまねをしよう！", shells: "耳にあてると、海の音が聞こえるよ！", crystal: "光にあたって、きらきらしてる！", def: "プレゼント？ありがとう、よく見てみるね！" },
    arr: "もようがえ", arrT: "お部屋のもようがえ", arrHint: (n) => `好きな場所へドラッグしてください。小さなものを${n}に持っていくと、プレゼントできます！`,
    done: "完了", undo: "元に戻す", reset: "最初の配置", resetToast: "ぜんぶ元の場所にもどりました。", noUndo: "元に戻すものはありません。",
    mv: (x) => `動かす：${x}`, help: "あそびかた", helpT: (n) => `${n}のなでかた`,
    zHead: "頭：なでなで", zSide: "わき：くすぐり", zBelly: "おなか：さすさす", zFeet: "足：ジャンプ",
    helpStroke: "頭に指をのせて、ゆっくり動かすと長くなでられます。",
    helpArr: (n) => `ものを動かすには、矢印のボタンをタップするか、長押ししてください。小さなものを${n}に持っていくこともできます！`,
    ok: "わかりました"
  },
  ko: {
    head: ["음, 부드러운 쓰담쓰담이에요...", "머리를 더 쓰다듬어 줘요!", "너무 좋아서 눈이 저절로 감겨요."],
    side: ["히히, 옆구리는 안 돼요!", "제가 간지럼 타는 거 알잖아요!", "하하, 웃음이 멈추질 않아요!"],
    belly: ["배 쓰다듬기! 제일 좋아해요.", "기분 좋아서 데굴데굴 구르고 싶어요!", "배도 행복하고 저도 행복해요!"],
    feet: ["깡충! 발이 간지러워요!", "작게 폴짝 뛰어 볼게요!", "통통! 저 잘 튀죠?"],
    spam: ["천천히, 천천히요, 간지러워요!", "히히, 잠깐만요, 숨 좀 고를게요!"],
    trick: ["제가 할 줄 아는 거 보여 줄게요!", "짜잔! 선물이에요."],
    nudge: "제 자리는 남겨 줄래요?", sleepGive: "쿨쿨... 일어나면 갖고 놀게요.", love: "방이 정말 예뻐졌어요!",
    give: { yarn: "털실 뭉치가 다 내 거예요! 데굴데굴!", teddy: "내 곰 인형! 꼭 안아 줄래요.", books: "이야기요? 같이 읽어요!", guitar: "띵띵! 작은 노래를 연주해 줄게요.", soft: "폭신폭신해요... 잠깐 파묻혀 있을게요.", dragon: "아기 용이다! 하늘을 나는 척해 봐요!", shells: "귀에 대 보면 바다 소리가 들려요!", crystal: "빛을 받아서 반짝반짝해요!", def: "선물이에요? 고마워요, 자세히 볼게요!" },
    arr: "옮기기", arrT: "방 꾸미기", arrHint: (n) => `원하는 곳으로 끌어서 옮겨요. 작은 물건을 ${n}에게 가져가면 선물할 수 있어요!`,
    done: "완료", undo: "되돌리기", reset: "처음 배치", resetToast: "모두 제자리로 돌아갔어요.", noUndo: "되돌릴 게 없어요.",
    mv: (x) => `옮기기: ${x}`, help: "노는 방법", helpT: (n) => `${n} 쓰다듬는 법`,
    zHead: "머리: 쓰담쓰담", zSide: "옆구리: 간지럼", zBelly: "배: 살살 문지르기", zFeet: "발: 깡충",
    helpStroke: "머리에 손가락을 대고 천천히 움직이면 오래 쓰다듬을 수 있어요.",
    helpArr: (n) => `물건을 옮기려면 화살표 버튼을 누르거나 물건을 길게 눌러요. 작은 물건을 ${n}에게 가져갈 수도 있어요!`,
    ok: "알겠어요"
  },
  zh: {
    head: ["嗯～好温柔的摸摸……", "再摸摸我的小脑袋！", "开心得眼睛都眯起来了。"],
    side: ["嘻嘻，别挠我两边！", "你知道我最怕痒啦！", "哈哈，你把我逗笑了！"],
    belly: ["揉揉小肚子！我最喜欢了。", "开心得想打滚！", "肚子开心，我也开心！"],
    feet: ["蹦！小脚好痒！", "为你跳一下！", "咚咚！我很有弹性吧？"],
    spam: ["慢点慢点，好痒呀！", "嘻嘻，等一下，让我喘口气！"],
    trick: ["看看我会什么！", "当当！这是送给你的。"],
    nudge: "能给我留个小位置吗？", sleepGive: "呼呼……等我醒了再玩。", love: "我的房间现在好漂亮！",
    give: { yarn: "一团毛线，全是我的！滚呀滚！", teddy: "我的小熊！紧紧抱住它。", books: "讲故事吗？我们一起读吧！", guitar: "叮叮咚！给你弹首小曲。", soft: "好软呀……让我窝一会儿。", dragon: "小龙！我们假装在飞吧！", shells: "放到耳边，就能听到大海！", crystal: "看它在光下闪闪发亮！", def: "是礼物吗？谢谢，让我好好看看！" },
    arr: "移动物品", arrT: "布置房间", arrHint: (n) => `把物品拖到你喜欢的地方。把小东西拿给${n}，就能送给它！`,
    done: "完成", undo: "撤销", reset: "初始布置", resetToast: "所有东西都回到原位了。", noUndo: "没有可以撤销的。",
    mv: (x) => `移动：${x}`, help: "玩法", helpT: (n) => `怎么疼爱${n}`,
    zHead: "头：摸摸", zSide: "两侧：挠痒痒", zBelly: "肚子：揉揉", zFeet: "脚：跳一下",
    helpStroke: "把手指放在头上慢慢移动，就是长长的抚摸。",
    helpArr: (n) => `要移动物品，点箭头按钮或长按它。你也可以把小东西拿给${n}！`,
    ok: "知道了"
  },
  zht: {
    head: ["嗯～好溫柔的摸摸……", "再摸摸我的小腦袋！", "開心得眼睛都瞇起來了。"],
    side: ["嘻嘻，別搔我兩邊！", "你知道我最怕癢啦！", "哈哈，你把我逗笑了！"],
    belly: ["揉揉小肚子！我最喜歡了。", "開心得想打滾！", "肚子開心，我也開心！"],
    feet: ["蹦！小腳好癢！", "為你跳一下！", "咚咚！我很有彈性吧？"],
    spam: ["慢點慢點，好癢呀！", "嘻嘻，等一下，讓我喘口氣！"],
    trick: ["看看我會什麼！", "噹噹！這是送給你的。"],
    nudge: "能給我留個小位置嗎？", sleepGive: "呼呼……等我醒了再玩。", love: "我的房間現在好漂亮！",
    give: { yarn: "一團毛線，全是我的！滾呀滾！", teddy: "我的小熊！緊緊抱住它。", books: "講故事嗎？我們一起讀吧！", guitar: "叮叮咚！給你彈首小曲。", soft: "好軟呀……讓我窩一會兒。", dragon: "小龍！我們假裝在飛吧！", shells: "放到耳邊，就能聽到大海！", crystal: "看它在光下閃閃發亮！", def: "是禮物嗎？謝謝，讓我好好看看！" },
    arr: "移動物品", arrT: "布置房間", arrHint: (n) => `把物品拖到你喜歡的地方。把小東西拿給${n}，就能送給它！`,
    done: "完成", undo: "復原", reset: "初始布置", resetToast: "所有東西都回到原位了。", noUndo: "沒有可以復原的。",
    mv: (x) => `移動：${x}`, help: "玩法", helpT: (n) => `怎麼疼愛${n}`,
    zHead: "頭：摸摸", zSide: "兩側：搔癢", zBelly: "肚子：揉揉", zFeet: "腳：跳一下",
    helpStroke: "把手指放在頭上慢慢移動，就是長長的撫摸。",
    helpArr: (n) => `要移動物品，點箭頭按鈕或長按它。你也可以把小東西拿給${n}！`,
    ok: "知道了"
  },
  ru: {
    head: ["Ммм, как нежно...", "Ещё по головке!", "От радости у меня сами закрываются глазки."],
    side: ["Хи-хи, только не бока!", "Ты же знаешь, я боюсь щекотки!", "Ха-ха, ты меня смешишь!"],
    belly: ["Почесать животик! Моё любимое.", "Хочется кататься от счастья!", "Животику хорошо, и мне тоже!"],
    feet: ["Хоп! Лапкам щекотно!", "Маленький прыжок специально для тебя!", "Бойнг! Я как пружинка!"],
    spam: ["Тише, тише, щекотно же!", "Хи-хи, подожди, дай отдышаться!"],
    trick: ["Смотри, что я умею!", "Та-дам! Это для тебя."],
    nudge: "Оставишь мне моё местечко?", sleepGive: "Хр-р... поиграю, когда проснусь.", love: "Какая теперь красивая комната!",
    give: { yarn: "Клубок, и весь мой! Катится, катится!", teddy: "Мой мишка! Обниму его крепко-крепко.", books: "Сказка? Давай почитаем вместе!", guitar: "Дзынь-дзынь! Сыграю тебе песенку.", soft: "Какое мягкое... устроюсь тут на минутку.", dragon: "Дракончик! Давай представим, что мы летим!", shells: "Приложи к уху — и услышишь море!", crystal: "Смотри, как он сверкает на свету!", def: "Подарок? Спасибо, сейчас рассмотрю!" },
    arr: "Переставить", arrT: "Обустрой комнату", arrHint: (n) => `Перетаскивай вещи куда хочешь. Маленькую вещь перетащи на питомца, и ${n} получит подарок!`,
    done: "Готово", undo: "Отменить", reset: "Как было сначала", resetToast: "Всё вернулось на свои места.", noUndo: "Нечего отменять.",
    mv: (x) => `Переставить: ${x}`, help: "Как играть", helpT: (n) => `${n}: как гладить`,
    zHead: "Голова: погладить", zSide: "Бока: щекотка", zBelly: "Животик: почесать", zFeet: "Лапки: прыжок",
    helpStroke: "Положи палец на голову и медленно веди: это долгое поглаживание.",
    helpArr: (n) => `Чтобы переставить вещь, нажми кнопку со стрелками или удерживай её. Маленькую вещь можно перетащить на питомца: ${n} получит подарок!`,
    ok: "Понятно"
  },
  pl: {
    head: ["Mmm, jak delikatnie głaszczesz...", "Jeszcze po główce!", "Z radości same zamykają mi się oczka."],
    side: ["Hihi, tylko nie boczki!", "Przecież wiesz, że mam łaskotki!", "Haha, rozśmieszasz mnie!"],
    belly: ["Drapanie po brzuszku! Moje ulubione.", "Aż chce się turlać ze szczęścia!", "Brzuszek szczęśliwy, ja też!"],
    feet: ["Hop! Łapki mnie łaskoczą!", "Mały podskok specjalnie dla ciebie!", "Boing! Skaczę jak sprężynka!"],
    spam: ["Powoli, powoli, to łaskocze!", "Hihi, poczekaj, złapię oddech!"],
    trick: ["Zobacz, co potrafię!", "Ta-dam! To dla ciebie."],
    nudge: "Zostawisz mi moje miejsce?", sleepGive: "Chrr... pobawię się tym, jak się obudzę.", love: "Mój pokój jest teraz taki ładny!",
    give: { yarn: "Kłębek włóczki tylko dla mnie! Turla się, turla!", teddy: "Mój miś! Przytulę go mocno.", books: "Bajka? Poczytajmy razem!", guitar: "Brzdęk brzdęk! Zagram ci piosenkę.", soft: "Jakie mięciutkie... wtulę się na chwilkę.", dragon: "Mały smok! Udawajmy, że latamy!", shells: "Przyłóż do ucha, a usłyszysz morze!", crystal: "Zobacz, jak błyszczy w świetle!", def: "Prezent? Dziękuję, zaraz go obejrzę!" },
    arr: "Przestaw", arrT: "Urządź pokój", arrHint: (n) => `Przeciągaj rzeczy, gdzie chcesz. Przeciągnij coś małego na towarzysza, a ${n} dostanie prezent!`,
    done: "Gotowe", undo: "Cofnij", reset: "Pierwotny układ", resetToast: "Wszystko wróciło na swoje miejsce.", noUndo: "Nie ma czego cofnąć.",
    mv: (x) => `Przestaw: ${x}`, help: "Jak się bawić", helpT: (n) => `${n}: jak głaskać`,
    zHead: "Głowa: głaskanie", zSide: "Boki: łaskotki", zBelly: "Brzuszek: drapanie", zFeet: "Łapki: podskok",
    helpStroke: "Połóż palec na głowie i powoli nim przesuwaj: to długie głaskanie.",
    helpArr: (n) => `Aby coś przestawić, dotknij przycisku ze strzałkami albo przytrzymaj przedmiot. Możesz też przeciągnąć coś małego na towarzysza: ${n} dostanie prezent!`,
    ok: "Rozumiem"
  },
  nl: {
    head: ["Mmm, wat een zachte aai...", "Meer over mijn koppie!", "Mijn ogen gaan vanzelf dicht van blijdschap."],
    side: ["Hihi, niet mijn zij!", "Je weet toch dat ik kietelig ben!", "Haha, je laat me lachen!"],
    belly: ["Buikkriebels! Mijn favoriet.", "Ik zou wel kunnen rollen van geluk!", "Blij buikje, blije ik!"],
    feet: ["Hop! Mijn voetjes kriebelen!", "Een klein sprongetje voor jou!", "Boing! Ik veer helemaal!"],
    spam: ["Rustig aan, rustig aan, dat kietelt!", "Hihi, wacht, even op adem komen!"],
    trick: ["Kijk eens wat ik kan!", "Tadaa! Deze is voor jou."],
    nudge: "Laat je mijn plekje vrij?", sleepGive: "Zzz... ik speel ermee als ik wakker ben.", love: "Wat is mijn kamer nu mooi!",
    give: { yarn: "Een bolletje wol, helemaal voor mij! Rollen maar!", teddy: "Mijn knuffelbeer! Ik knuffel hem heel stevig.", books: "Een verhaaltje? Laten we samen lezen!", guitar: "Pling pling! Ik speel een liedje voor je.", soft: "Zo zacht... ik kruip er even in.", dragon: "Het draakje! Laten we doen alsof we vliegen!", shells: "Hou hem bij je oor, dan hoor je de zee!", crystal: "Kijk hoe hij schittert in het licht!", def: "Een cadeautje? Dankjewel, ik bekijk het goed!" },
    arr: "Verplaatsen", arrT: "Richt de kamer in", arrHint: (n) => `Sleep dingen waarheen je wilt. Breng iets kleins naar ${n} om het te geven!`,
    done: "Klaar", undo: "Ongedaan maken", reset: "Oorspronkelijke indeling", resetToast: "Alles staat weer op zijn plek.", noUndo: "Niets om ongedaan te maken.",
    mv: (x) => `Verplaatsen: ${x}`, help: "Zo speel je", helpT: (n) => `Zo knuffel je ${n}`,
    zHead: "Hoofd: aaien", zSide: "Zijkant: kietelen", zBelly: "Buik: kriebelen", zFeet: "Voetjes: sprongetje",
    helpStroke: "Leg je vinger op het hoofd en beweeg hem langzaam: dat is een lange aai.",
    helpArr: (n) => `Om iets te verplaatsen tik je op de knop met pijlen of houd je het ingedrukt. Je kunt ook iets kleins naar ${n} brengen!`,
    ok: "Begrepen"
  },
  tr: {
    head: ["Mmm, ne yumuşak bir okşama...", "Başımı biraz daha okşa!", "Mutluluktan gözlerim kapanıyor."],
    side: ["Hihi, yanlarım olmaz!", "Gıdıklandığımı biliyorsun!", "Haha, beni güldürüyorsun!"],
    belly: ["Göbek kaşıma! En sevdiğim.", "Mutluluktan yuvarlanasım geliyor!", "Göbüşüm mutlu, ben de mutluyum!"],
    feet: ["Hop! Patilerim gıdıklanıyor!", "Senin için küçük bir zıplama!", "Boing! Yay gibiyim!"],
    spam: ["Yavaş yavaş, gıdıklanıyorum!", "Hihi, dur biraz, nefesleneyim!"],
    trick: ["Bak neler yapabiliyorum!", "Taa-daa! Bu senin için."],
    nudge: "Bana küçük yerimi bırakır mısın?", sleepGive: "Zzz... uyanınca onunla oynarım.", love: "Odam şimdi çok güzel oldu!",
    give: { yarn: "Koca bir yün yumağı, hepsi benim! Yuvarlan, yuvarlan!", teddy: "Oyuncak ayım! Ona sımsıkı sarılıyorum.", books: "Bir hikâye mi? Birlikte okuyalım!", guitar: "Tıngır mıngır! Sana küçük bir şarkı çalayım.", soft: "Ne kadar yumuşak... biraz içine kıvrılayım.", dragon: "Küçük ejderha! Uçuyormuş gibi yapalım!", shells: "Kulağına tutarsan denizi duyarsın!", crystal: "Bak, ışıkta nasıl parlıyor!", def: "Hediye mi? Teşekkürler, iyice bakayım!" },
    arr: "Taşı", arrT: "Odayı düzenle", arrHint: (n) => `Eşyaları istediğin yere sürükle. Küçük bir eşyayı arkadaşının üstüne bırakırsan ${n} onu hediye olarak alır!`,
    done: "Tamam", undo: "Geri al", reset: "İlk düzen", resetToast: "Her şey yerine döndü.", noUndo: "Geri alınacak bir şey yok.",
    mv: (x) => `Taşı: ${x}`, help: "Nasıl oynanır", helpT: (n) => `${n} nasıl sevilir`,
    zHead: "Baş: okşama", zSide: "Yanlar: gıdıklama", zBelly: "Göbek: kaşıma", zFeet: "Ayaklar: zıplama",
    helpStroke: "Parmağını başına koy ve yavaşça hareket ettir: uzun bir okşama olur.",
    helpArr: (n) => `Bir eşyayı taşımak için oklu düğmeye dokun ya da eşyaya basılı tut. Küçük bir eşyayı arkadaşının üstüne de sürükleyebilirsin: ${n} onu hediye olarak alır!`,
    ok: "Anladım"
  }
};
Object.keys(V20T_TX).forEach((k) => { if (T[k]) T[k].v20t = V20T_TX[k]; });

Object.assign(ICON, {
  v20move: '<path d="M12 3v18M3 12h18"/><path d="M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>',
  v20undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  v20reset: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 3.8v4.6h4.6"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/>',
  v20info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.6v.1"/>',
  v20heart: '<path d="M12 20s-7-4.4-8.6-8.7C2.2 8.1 4.2 5 7.3 5c2 0 3.4 1.1 4.7 2.8C13.3 6.1 14.7 5 16.7 5c3.1 0 5.1 3.1 3.9 6.3C19 15.6 12 20 12 20z"/>'
});

/* --- Stato condiviso (anche per i test) --- */
const V20T = {
  arr: false, mark: false, found: [], undo: [], drag: null, lp: null, stk: null, last: null,
  tch: { times: [], busyUntil: 0, coolUntil: 0, lastSay: 0, lastZone: "", n: 0, coolSaid: 0 }
};
function v20st() {
  if (!S.v20touch || typeof S.v20touch !== "object") S.v20touch = {};
  const st = S.v20touch;
  if (!st.pos || typeof st.pos !== "object") st.pos = {};
  if (!st.slot || typeof st.slot !== "object") st.slot = {};
  if (!st.gave || typeof st.gave !== "object") st.gave = {};
  return st;
}
const v20tx = () => (L() && L().v20t) || V20T_TX.en;

(function () {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const PET_BASE = 258, PET_L = 142, PET_R = 218;
  /* posti degli oggetti: pavimento o parete. Le cose grandi (tappeto, tende, soffitto, carta da parati) restano ferme */
  const MV = { floorL: "floor", floorR: "floor", plant: "floor", lamp: "floor", wallart: "wall", shelf: "wall", clock: "wall", fish: "wall" };
  const BASE_BB = { pouf: [70, 238, 54, 32], teddy: [234, 222, 44, 48], plant: [290, 146, 56, 106], lamp: [24, 134, 40, 130], frame: [176, 56, 64, 52], clock: [272, 40, 40, 40], shelf: [256, 88, 90, 42], fishbowl: [238, 160, 60, 44] };
  const BASE_IDS = new Set(Object.keys(BASE_BB));
  /* oggetti piccoli che si possono regalare al compagno */
  const GIVE = { yarn: "yarn", teddy: "teddy", books: "books", guitar: "guitar", pillows: "soft", sv_sugar: "soft", sv_dragon: "dragon", sv_shells: "shells", sv_crystal: "crystal" };
  const SPOT_SLOT = { fish: "fish", clock: "clock", lamp: "lamp", plant: "plant", guitar: "floorR", teddy: "floorR", books: "floorL", yarn: "floorL", pouf: "floorL", mirror: "wallart", poster: "wallart", frame: "wallart" };
  const HIDE_SLOT = { pl: "plant", lp: "lamp", fl: "floorL" };
  const slotOf = (id) => (typeof SLOT !== "undefined" && SLOT[id]) || null;
  function bbOf(id) {
    if (BASE_BB[id]) return BASE_BB[id];
    const v = typeof ALT_VB !== "undefined" && ALT_VB[id];
    if (v) { const a = String(v).split(/\s+/).map(Number); if (a.length === 4 && a.every(isFinite)) return a; }
    return null;
  }
  const kindOf = (slot) => MV[slot] || null;
  const itemName = (id) => { const t = L(); return (t.items && t.items[id]) || (T.en.items && T.en.items[id]) || id; };
  /* la scheda di Oggi puo' mostrare il posto scelto (98b: giardino, terrazza...): la stanza e' solo quando sceneId e' "room" */
  const inRoomScene = () => sceneId === "room";

  /* --- Regole di posizione: dentro il pavimento o la parete, mai sopra la finestra, mai al posto del compagno --- */
  function clampPos(id, slot, dx, dy, guard) {
    const bb = bbOf(id), k = kindOf(slot); if (!bb || !k) return [0, 0];
    dx = +dx || 0; dy = +dy || 0; if (!dx && !dy) return [0, 0];
    const [bx, by, w, h] = bb; let x = bx + dx, y = by + dy;
    if (k === "floor") {
      x = clamp(x, -6, 366 - w);
      const base = clamp(y + h, 222, 290); y = base - h;
      if (guard) {
        const cx = x + w / 2;
        if (cx > PET_L && cx < PET_R) x = cx < 180 ? PET_L - w : PET_R; /* 1.0.8: tutto l'oggetto fuori dal posto del compagno, non solo il centro */
        x = clamp(x, -6, 366 - w);
      }
    } else {
      x = clamp(x, 2, 358 - w); y = clamp(y, 2, 206 - h);
      const W = [14, 22, 158, 142]; /* finestra con le tende */
      if (x < W[2] && x + w > W[0] && y < W[3] && y + h > W[1]) {
        const right = W[2] - x, down = W[3] - y;
        if (W[3] + h <= 206 && down < right) y = W[3]; else x = W[2];
        x = clamp(x, 2, 358 - w); y = clamp(y, 2, 206 - h);
      }
    }
    return [Math.round(x - bx), Math.round(y - by)];
  }
  function posFor(id, slot) {
    const st = v20st(); const p = st.pos[id] || st.slot[slot];
    if (!Array.isArray(p) || p.length !== 2) return [0, 0];
    return clampPos(id, slot, p[0], p[1], true);
  }
  function slotOffset(slot, furn) {
    if (!kindOf(slot)) return null; const ids = (furn || []).filter((x) => slotOf(x) === slot); if (!ids.length) return null;
    const id = ids[ids.length - 1]; if (!bbOf(id)) return null; const o = posFor(id, slot); return o[0] || o[1] ? o : null;
  }

  /* --- Disegno: gli oggetti spostabili vengono racchiusi in un gruppo con il loro spostamento e ordinati in profondita' --- */
  const SIG = [
    { slot: "floorL", id: "pouf", start: '<g><ellipse cx="98" cy="268" rx="27" ry="6"' },
    { slot: "floorR", id: "teddy", start: '<g><ellipse cx="256" cy="265" rx="18" ry="4.5"' },
    { slot: "plant", id: "plant", start: '<ellipse cx="322" cy="250" rx="22" ry="5" fill="#000" opacity=".12"/><g class="plantg"', end: '<rect x="298" y="208" width="44" height="9" rx="4" fill="#C77650"/>' },
    { slot: "lamp", id: "lamp", start: '<g><ellipse cx="46" cy="261" rx="19" ry="5"', pre: /<circle cx="44" cy="170" r="(?:74|52)" fill="url\(#[^)]+\)"\/>$/ },
    { slot: "wallart", id: "frame", start: '<g transform="translate(176 58)"><rect x="2" y="3" width="62" height="48"' },
    { slot: "clock", id: "clock", start: '<g transform="translate(292 60)"><circle r="18" cx="1.5"' },
    { slot: "shelf", id: "shelf", start: '<g transform="translate(258 92)"><rect x="2" y="25" width="84" height="7" rx="3" fill="#000" opacity=".08"/><rect x="0" y="22" width="84" height="7" rx="3" fill="#9A6B43"/><rect x="6" y="2"' },
    { slot: "fish", id: "fishbowl", start: '<g><rect x="240" y="196" width="54" height="6" rx="3" fill="#9A6B43"/>' }
  ];
  function gEnd(s, i) {
    let d = 0; const re = /<g[\s>]|<\/g>/g; re.lastIndex = i; let m;
    while ((m = re.exec(s))) { if (m[0] === "</g>") { d--; if (d === 0) return m.index + 4; } else d++; }
    return -1;
  }
  function mvLayout(o, opts) {
    const furn = (opts && opts.furn) || []; const rec = opts && opts.furn === S.furn;
    if (!furn.length || o.indexOf("<svg") !== 0) { if (rec) V20T.found = []; return o.replace(/<!--\/?mv(?::\w+)?-->/g, ""); }
    const regs = [];
    const mre = /<!--mv:(\w+)-->([\s\S]*?)<!--\/mv-->/g; let m;
    while ((m = mre.exec(o))) {
      const slot = m[1]; const alt = furn.filter((x) => slotOf(x) === slot && !BASE_IDS.has(x));
      regs.push({ s: m.index, e: m.index + m[0].length, slot, id: alt[alt.length - 1] || null, html: m[2] });
    }
    SIG.forEach((g) => {
      if (!furn.includes(g.id)) return;
      let s = o.indexOf(g.start); if (s < 0 || regs.some((r) => s >= r.s && s < r.e)) return;
      const e = g.end ? (o.indexOf(g.end, s) < 0 ? -1 : o.indexOf(g.end, s) + g.end.length) : gEnd(o, s); if (e < 0) return;
      if (g.pre) { const mm = o.slice(Math.max(0, s - 120), s).match(g.pre); if (mm) s -= mm[0].length; }
      regs.push({ s, e, slot: g.slot, id: g.id, html: o.slice(s, e) });
    });
    if (!regs.length) { if (rec) V20T.found = []; return o; }
    regs.sort((a, b) => a.s - b.s);
    /* un gruppo per posto */
    const groups = {}; const order = [];
    regs.forEach((r) => {
      if (!r.id || !bbOf(r.id)) { r.keep = true; return; }
      const gp = groups[r.slot] || (groups[r.slot] = { slot: r.slot, ids: [], html: "", first: r });
      if (!gp.ids.length) order.push(r.slot);
      gp.ids.push(r.id); gp.html += r.html; r.gp = gp;
    });
    const items = order.map((sl) => {
      const gp = groups[sl]; const id = gp.ids[gp.ids.length - 1]; const bb = bbOf(id); const k = kindOf(sl); const [dx, dy] = posFor(id, sl);
      return { id, slot: sl, kind: k, bb, dx, dy, base: bb[1] + bb[3] + dy, html: `<g class="mv" data-mv="${id}" data-slot="${sl}" transform="translate(${dx} ${dy})"><g class="mvi">${gp.html}</g></g>`, gp };
    });
    if (rec) V20T.found = items.map(({ id, slot, kind, bb, dx, dy }) => ({ id, slot, kind, bb, dx, dy }));
    const floor = items.filter((x) => x.kind === "floor").sort((a, b) => a.base - b.base);
    const back = floor.filter((x) => x.base <= PET_BASE), front = floor.filter((x) => x.base > PET_BASE);
    const pw = o.indexOf('<g id="petWrap"'); const pEnd = pw >= 0 ? gEnd(o, pw) : -1;
    const firstFloor = regs.find((r) => r.gp && kindOf(r.slot) === "floor");
    const ins = [];
    regs.forEach((r) => {
      if (r.keep) { ins.push({ s: r.s, e: r.e, html: r.html }); return; }
      let html = "";
      if (kindOf(r.slot) === "wall") { if (r.gp.first === r) html = items.find((x) => x.slot === r.slot).html; }
      else if (r === firstFloor) { html = back.map((x) => x.html).join("") + '<g class="mvanchor"></g>'; if (pEnd < 0) html += front.map((x) => x.html).join("") + '<g class="mvfront"></g>'; }
      ins.push({ s: r.s, e: r.e, html });
    });
    if (pEnd > 0 && firstFloor) ins.push({ s: pEnd, e: pEnd, html: front.map((x) => x.html).join("") + '<g class="mvfront"></g>' });
    ins.sort((a, b) => a.s - b.s || a.e - b.e);
    let out = "", at = 0;
    ins.forEach((x) => { if (x.s < at) return; out += o.slice(at, x.s) + x.html; at = x.e; });
    out += o.slice(at);
    /* luci delle lampade a stanza buia: seguono la lampada */
    const off = (sl) => { const it = items.find((x) => x.slot === sl); return it && (it.dx || it.dy) ? it : null; };
    const lp = off("lamp"), fr = off("floorR");
    if (lp) out = out.replace(/<circle cx="(?:44" cy="170" r="60|45" cy="214" r="54|45" cy="194" r="56)" fill="url\(#[^)]+\)" opacity="[.\d]+"\/>/g, (c) => `<g transform="translate(${lp.dx} ${lp.dy})">${c}</g>`);
    if (fr) out = out.replace(/<circle cx="255" cy="246" r="30" fill="url\(#[^)]+\)" opacity="[.\d]+"\/>/g, (c) => `<g transform="translate(${fr.dx} ${fr.dy})">${c}</g>`);
    return out.replace(/<!--\/?mv(?::\w+)?-->/g, "");
  }
  const _furnAltV20 = furnAlt;
  furnAlt = function (slot, furn, lit, lampId) {
    const o = _furnAltV20(slot, furn, lit, lampId);
    return o && V20T.mark && MV[slot] ? `<!--mv:${slot}-->${o}<!--/mv-->` : o;
  };
  const _roomSVGV20 = roomSVG;
  roomSVG = function (opts) {
    V20T.mark = true; let o;
    try { o = _roomSVGV20(opts); } finally { V20T.mark = false; }
    try { return mvLayout(o, opts); } catch (e) { return String(o).replace(/<!--\/?mv(?::\w+)?-->/g, ""); }
  };
  /* le zone toccabili e i nascondigli seguono gli oggetti spostati */
  const _sceneSpotsV20 = sceneSpots;
  sceneSpots = function (furn) {
    const L0 = _sceneSpotsV20(furn); if (!inRoomScene()) return L0;
    return L0.map((s) => { const sl = SPOT_SLOT[s[0]]; const o = sl && slotOffset(sl, furn); return o ? [s[0], s[1] + o[0], s[2] + o[1], s[3], s[4]] : s; });
  };
  const _hideSpotsV20 = hideSpots;
  hideSpots = function () {
    const L0 = _hideSpotsV20(); if (!inRoomScene()) return L0;
    return L0.map((s) => { const sl = HIDE_SLOT[s[0]]; const o = sl && slotOffset(sl, S.furn); return o ? [s[0], s[1] + o[0], s[2] + o[1]] : s; });
  };

  /* --- Coordinate --- */
  function svgEl() { return document.querySelector("#room > svg"); }
  function toLocal(el, cx, cy) {
    if (!el || !el.getScreenCTM) return null; const m = el.getScreenCTM(); if (!m) return null;
    try { const p = new DOMPoint(cx, cy).matrixTransform(m.inverse()); return { x: p.x, y: p.y }; } catch (e) { return null; }
  }
  const scenePt = (cx, cy) => toLocal(svgEl(), cx, cy);
  function toClient(x, y) {
    const sv = svgEl(); if (!sv || !sv.getScreenCTM) return null; const m = sv.getScreenCTM(); if (!m) return null;
    const p = new DOMPoint(x, y).matrixTransform(m); return { x: p.x, y: p.y };
  }
  function calmRoom() { const room = document.getElementById("room"); if (room && anim && G) { G.killTweensOf(room); G.set(room, { rotationX: 0, rotationY: 0 }); } }

  /* =================== 1) TOCCHI PER ZONE =================== */
  function zoneAt(cx, cy) {
    const hit = document.getElementById("petHit"); const hr = hit ? hit.getBoundingClientRect() : null;
    const side = hr ? (cx >= hr.left + hr.width / 2 ? 1 : -1) : 1;
    const p = toLocal(document.getElementById("petWrap"), cx, cy);
    if (!p) return { zone: "head", side };
    const ax = Math.abs(p.x - 100);
    const zone = p.y > 166 ? "feet" : p.y < 98 ? "head" : ax > 36 ? "side" : p.y >= 128 ? "belly" : "head";
    return { zone, side, px: p.x, py: p.y };
  }
  V20T.zoneAt = zoneAt;
  /* piccoli effetti nel punto toccato */
  function fxPoint(cx, cy, glyph, color, n, opt = {}) {
    const fx = document.getElementById("fx"), room = document.getElementById("room"); if (!fx || !room) return;
    const r = room.getBoundingClientRect(); const lx = cx - r.left, ly = cy - r.top;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span"); s.className = "v20p"; s.setAttribute("aria-hidden", "true");
      s.innerHTML = typeof fxGlyph === "function" ? fxGlyph(glyph) : glyph; s.style.color = color; s.style.fontSize = `${(opt.size || 15) + Math.random() * 6}px`;
      s.style.left = `${lx}px`; s.style.top = `${ly}px`; fx.appendChild(s);
      if (anim) G.fromTo(s, { x: 0, y: 0, opacity: 0, scale: 0.5 }, { keyframes: [{ opacity: 1, scale: 1, duration: 0.18, ease: "back.out(2)" }, { x: (Math.random() - 0.5) * (opt.spread || 60), y: -(opt.rise || 46) - Math.random() * 26, opacity: 0, rotation: (Math.random() - 0.5) * 40, duration: 0.75 + Math.random() * 0.3, ease: "sine.out" }], delay: i * 0.06, onComplete: () => s.remove() });
      else setTimeout(() => s.remove(), 450);
    }
  }
  function ring(cx, cy, col) {
    if (!anim) return; const fx = document.getElementById("fx"), room = document.getElementById("room"); if (!fx || !room) return;
    const r = room.getBoundingClientRect(); const s = document.createElement("span"); s.className = "v20ring"; s.setAttribute("aria-hidden", "true");
    s.style.left = `${cx - r.left}px`; s.style.top = `${cy - r.top}px`; if (col) s.style.borderColor = col; fx.appendChild(s);
    G.fromTo(s, { scale: 0.35, opacity: 0.85 }, { scale: 1.35, opacity: 0, duration: 0.55, ease: "sine.out", onComplete: () => s.remove() });
  }
  const petEl = () => document.getElementById("petInner");
  /* animazioni del corpo: partono sempre da dove si trova il compagno (niente scatti), morbide ed elastiche */
  const BODY = {
    head(p) {
      return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
        .to(p, { scaleY: 1.03, scaleX: 0.985, y: -2, rotation: 0, x: 0, duration: 0.09, ease: "sine.out" })
        .to(p, { scaleY: 0.93, scaleX: 1.05, y: 0, duration: 0.17, ease: "sine.inOut" })
        .to(p, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, .55)" });
    },
    side(p, s) {
      return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
        .to(p, { rotation: -s * 3.5, x: -s * 3, scaleX: 1.03, scaleY: 0.98, y: 0, duration: 0.12, ease: "sine.out" })
        .to(p, { rotation: s * 2.4, x: s * 1.5, y: -3, duration: 0.11, ease: "sine.inOut" })
        .to(p, { rotation: -s * 1.4, x: -s, y: 0, duration: 0.1, ease: "sine.inOut" })
        .to(p, { rotation: 0, x: 0, scaleX: 1, scaleY: 1, duration: 0.4, ease: "elastic.out(1, .5)" });
    },
    belly(p) {
      return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
        .to(p, { scaleY: 0.94, scaleX: 1.05, x: 0, duration: 0.1, ease: "sine.out" })
        .to(p, { y: -10, scaleY: 1.04, scaleX: 0.97, rotation: -5, duration: 0.2, ease: "power2.out" })
        .to(p, { y: 0, rotation: 5, scaleY: 0.97, scaleX: 1.03, duration: 0.2, ease: "power1.in" })
        .to(p, { rotation: -2, scaleY: 1, scaleX: 1, duration: 0.18, ease: "sine.inOut" })
        .to(p, { rotation: 0, duration: 0.4, ease: "elastic.out(1, .5)" });
    },
    feet(p) {
      return G.timeline({ defaults: { transformOrigin: "50% 100%" } })
        .to(p, { scaleY: 0.88, scaleX: 1.08, rotation: 0, x: 0, y: 0, duration: 0.1, ease: "power1.out" })
        .to(p, { y: -24, scaleY: 1.07, scaleX: 0.95, duration: 0.22, ease: "power2.out" })
        .to(p, { y: 0, scaleY: 1, scaleX: 1, duration: 0.2, ease: "power2.in" })
        .to(p, { scaleY: 0.92, scaleX: 1.05, duration: 0.06 })
        .to(p, { scaleY: 1, scaleX: 1, duration: 0.42, ease: "elastic.out(1, .5)" });
    }
  };
  const BODY_MS = { head: 650, side: 560, belly: 820, feet: 720 };
  function bodyAnim(zone, side) {
    const p = petEl(); if (!p || !anim || trickOn) return false;
    G.killTweensOf(p); BODY[zone](p, side || 1); return true;
  }
  function sayMaybe(line, zone) {
    const c = V20T.tch, now = Date.now();
    if (zone !== c.lastZone || now - c.lastSay > 2600) { say(line, 2400); c.lastSay = now; c.lastZone = zone; }
  }
  function touchSleepy(pt, quiet) {
    const c = V20T.tch, now = Date.now(); const p = petEl();
    if (p && anim && !G.isTweening(p)) G.to(p, { scaleY: 0.97, scaleX: 1.015, transformOrigin: "50% 100%", duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" });
    if (pt) fxPoint(pt.x, pt.y - 10, "z", "#C9D6F2", 1, { size: 15, rise: 40 });
    SND.play("purr"); SND.haptic(4);
    if (!quiet && (c.lastZone !== "sleep" || now - c.lastSay > 3000)) { say(L().napSay, 2000); c.lastSay = now; c.lastZone = "sleep"; }
  }
  /* il tocco vero e proprio */
  function touchPet(zone, side, pt) {
    const t = L(), x = v20tx(), c = V20T.tch, now = Date.now();
    if (!pt) { const h = document.getElementById("petHit"); const r = h ? h.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 }; pt = { x: r.left + r.width / 2, y: r.top + r.height * 0.3 }; }
    if (S.lightsOff) { touchSleepy(pt); return "sleep"; }
    c.times = c.times.filter((v) => now - v < 2200); c.times.push(now);
    ring(pt.x, pt.y);
    /* pausa gentile contro i tocchi a raffica: mai un'escalation */
    if (now < c.coolUntil) { fxPoint(pt.x, pt.y, "♥", "#F4A9BD", 1, { size: 12, rise: 30 }); if (c.times.length % 2) SND.play("purr"); return "cool"; }
    if (c.times.length >= 6) {
      c.coolUntil = now + 2600; c.times = [];
      const p = petEl(); if (p && anim && !trickOn) { G.killTweensOf(p); G.timeline({ defaults: { transformOrigin: "50% 100%" } }).to(p, { rotation: -2.5, scaleX: 1.02, duration: 0.16, ease: "sine.inOut" }).to(p, { rotation: 2.5, duration: 0.2, ease: "sine.inOut" }).to(p, { rotation: 0, scaleX: 1, scaleY: 1, x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, .5)" }); }
      setExpr("felice", 1800); say(pick(x.spam), 2600); c.lastSay = now; c.lastZone = "spam"; SND.play("giggle"); SND.haptic(6);
      fxPoint(pt.x, pt.y, "♥", "#F4A9BD", 2, { size: 13 });
      return "spam";
    }
    c.n++;
    /* ogni 4 coccole un numero, preparato con un attimo di attesa */
    const calm = c.times.length < 2 || now - c.times[c.times.length - 2] > 650; /* il numero arriva con coccole tranquille, non con i tocchi a raffica */
    if (c.n >= 4 && calm && anim && !trickOn && !playMode && typeof petTrick === "function") {
      c.n = 0;
      setExpr("felice", 1400); fxPoint(pt.x, pt.y - 20, "✦", "#FFC94D", 3, { size: 16, spread: 50 }); SND.note(1174.7, 0.5); SND.haptic([8, 40, 8]);
      say(pick(x.trick), 2400); c.lastSay = now; c.lastZone = "trick";
      const r = Math.random(); const name = r < 0.2 ? "flip" : r < 0.45 ? "dance" : r < 0.65 ? "turn" : r < 0.85 ? "hops" : "jelly";
      c.busyUntil = now + 1500;
      setTimeout(() => { if (!petTrick(name)) bodyAnim("feet"); }, 220);
      addJoy(1); save(); refreshJoy(); return "trick";
    }
    /* tre tocchi veloci: un solletico piccolo e allegro (come prima, ma senza scossone) */
    const quick = c.times.filter((v) => now - v < 1300).length === 3;
    if (quick) { zone = "side"; c.lastZone = ""; c.lastSay = 0; }
    const busy = now < c.busyUntil && !quick;
    if (!busy && bodyAnim(zone, side)) c.busyUntil = now + BODY_MS[zone] * 0.7;
    if (zone === "head") {
      setExpr("felice", 1500); fxPoint(pt.x, pt.y, "♥", "#EE7FA0", busy ? 1 : 3, { size: 14 });
      SND.play("purr"); if (!busy) setTimeout(() => SND.note(1046.5, 0.45), 90); SND.haptic(6);
      sayMaybe(pick(c.n % 3 ? x.head : t.talk.pat), zone);
    } else if (zone === "side") {
      setExpr("felice", 1300); fxPoint(pt.x, pt.y, "✦", "#FFC94D", busy ? 1 : 4, { size: 14, spread: 80, rise: 36 });
      SND.play("giggle"); SND.haptic([6, 25, 6]);
      sayMaybe(pick(quick || c.n % 2 === 0 ? t.tickle : x.side), zone);
    } else if (zone === "belly") {
      setExpr(c.n % 3 === 0 ? "amore" : "felice", 1600); fxPoint(pt.x, pt.y, "♥", "#F29BB8", busy ? 1 : 2, { size: 13 }); fxPoint(pt.x, pt.y, "●", "#FFFFFF", busy ? 0 : 2, { size: 9, spread: 70 });
      SND.play("giggle"); setTimeout(() => SND.play("purr"), 160); SND.haptic([8, 30, 8]);
      sayMaybe(pick(x.belly), zone);
    } else {
      fxPoint(pt.x, pt.y + 6, "✦", "#9CC8F7", busy ? 1 : 3, { size: 12, spread: 70, rise: 28 }); SND.play("pop"); SND.haptic(10);
      if (!busy) setExpr("felice", 1200);
      sayMaybe(pick(x.feet), zone);
    }
    addJoy(1); save(); refreshJoy();
    return zone;
  }
  V20T.touchPet = touchPet;

  /* petTap sostituito: la reazione dipende da dove tocchi */
  const _petTapV20 = petTap;
  petTap = function () {
    if (suppressPetClick) { suppressPetClick = false; return; }
    if (!S.pet || S.away || playMode === "hide" || V20T.drag) return;
    if (!document.getElementById("petInner")) { _petTapV20(); return; }
    const lp = V20T.last; const fresh = lp && Date.now() - lp.t < 1200;
    const z = fresh ? lp : { zone: "head", side: 1 };
    touchPet(z.zone, z.side, fresh ? { x: lp.x, y: lp.y } : null);
    V20T.last = null;
  };

  /* --- Carezza lunga: dito appoggiato che si muove sul compagno --- */
  function strokeStep(ev, dxs) {
    const st = V20T.stk; const now = Date.now(); const p = petEl(); const x = v20tx();
    const z = zoneAt(ev.clientX, ev.clientY).zone;
    if (S.lightsOff) { touchSleepy({ x: ev.clientX, y: ev.clientY }); return; }
    if (now - (st.exprAt || 0) > 1300) { setExpr(z === "belly" && st.n % 2 ? "amore" : "felice", 1600); st.exprAt = now; }
    st.n = (st.n || 0) + 1;
    if (z === "side") {
      fxPoint(ev.clientX, ev.clientY, "✦", "#FFC94D", 1, { size: 13 });
      if (now - (st.sndAt || 0) > 650) { SND.play("giggle"); st.sndAt = now; }
      if (p && anim && !trickOn) G.to(p, { rotation: st.n % 2 ? 2.2 : -2.2, x: 0, transformOrigin: "50% 100%", duration: 0.16, ease: "sine.inOut", overwrite: "auto" });
      if (now - V20T.tch.lastSay > 3500) { say(pick(x.side), 2200); V20T.tch.lastSay = now; V20T.tch.lastZone = "side"; }
    } else if (z === "belly") {
      fxPoint(ev.clientX, ev.clientY, "♥", "#F29BB8", 1, { size: 13 });
      if (now - (st.sndAt || 0) > 800) { SND.play("purr"); st.sndAt = now; }
      if (p && anim && !trickOn) G.to(p, { rotation: st.n % 2 ? 4 : -4, scaleY: 0.97, scaleX: 1.02, transformOrigin: "50% 100%", duration: 0.3, ease: "sine.inOut", overwrite: "auto" });
      if (now - V20T.tch.lastSay > 3500) { say(pick(x.belly), 2200); V20T.tch.lastSay = now; V20T.tch.lastZone = "belly"; }
    } else {
      fxPoint(ev.clientX, ev.clientY, "♥", "#EE7FA0", 1, { size: 14 });
      if (now - (st.sndAt || 0) > 380) { SND.play("purr"); st.sndAt = now; }
      if (p && anim && !trickOn) G.to(p, { rotation: clamp(dxs * 0.08, -4, 4), scaleY: 0.965, scaleX: 1.025, transformOrigin: "50% 100%", duration: 0.25, ease: "sine.out", overwrite: "auto" });
    }
    SND.haptic(4);
    /* gioia come prima: +5 ogni 650 punti di carezza, al massimo ogni 20 secondi */
    if (st.dist > 650 && now - strokeAt > 20000) {
      strokeAt = now; st.dist = 0; st.step = 0;
      if (p && anim && !trickOn) G.timeline({ defaults: { transformOrigin: "50% 100%", overwrite: "auto" } }).to(p, { scaleY: 0.9, scaleX: 1.08, rotation: 0, duration: 0.25, ease: "sine.inOut" }).to(p, { scaleY: 1.04, scaleX: 0.97, y: -8, duration: 0.2, ease: "power2.out" }).to(p, { scaleY: 1, scaleX: 1, y: 0, duration: 0.5, ease: "elastic.out(1, .5)" });
      setExpr("amore", 2000); burst("heart", 6); say(pick(L().stroke), 2600); V20T.tch.lastSay = now; SND.play("sparkle"); addJoy(5); save(); refreshJoy();
    }
  }
  function strokeEnd() {
    const st = V20T.stk; V20T.stk = null; if (!st) return;
    const p = petEl();
    if (!st.on) { if (st.pressed && p && anim && !trickOn) G.to(p, { scaleY: 1, scaleX: 1, transformOrigin: "50% 100%", duration: 0.12, ease: "sine.out", overwrite: "auto" }); return; }
    if (p && anim && !trickOn) G.to(p, { rotation: 0, x: 0, scaleX: 1, scaleY: 1, transformOrigin: "50% 100%", duration: 0.55, ease: "elastic.out(1, .5)", overwrite: "auto" });
  }

  /* =================== 2) OGGETTI DA SPOSTARE E DA REGALARE =================== */
  const canArrange = () => !!S.pet && !S.away && tab === "today" && inRoomScene() && V20T.found.length > 0;
  function itemAtScene(p) {
    if (!p) return null;
    const list = V20T.found.slice().sort((a, b) => (b.kind === "floor") - (a.kind === "floor") || (b.bb[1] + b.bb[3] + b.dy) - (a.bb[1] + a.bb[3] + a.dy));
    return list.find((f) => p.x >= f.bb[0] + f.dx - 4 && p.x <= f.bb[0] + f.bb[2] + f.dx + 4 && p.y >= f.bb[1] + f.dy - 4 && p.y <= f.bb[1] + f.bb[3] + f.dy + 4) || null;
  }
  function handlesHTML() {
    const x = v20tx();
    return V20T.found.slice().sort((a, b) => b.bb[2] * b.bb[3] - a.bb[2] * a.bb[3]).map((f) => {
      const [bx, by, w, h] = f.bb;
      return `<button class="mvh${GIVE[f.id] ? " gv" : ""}${anim ? " pl" : ""}" data-mv="${f.id}" data-slot="${f.slot}" style="${pct(bx + f.dx, by + f.dy, w, h)}" aria-label="${esc(x.mv(itemName(f.id)))}"><span class="mvg">${icon(GIVE[f.id] ? "v20heart" : "v20move")}</span></button>`;
    }).join("");
  }
  function barHTML() {
    const x = v20tx();
    return `<div class="arrbar" role="toolbar" aria-label="${esc(x.arrT)}"><button class="arrdone" id="arrDone">${icon("check")}<span>${esc(x.done)}</span></button><button class="arrb" id="arrUndo" aria-label="${esc(x.undo)}" ${V20T.undo.length ? "" : "disabled"}>${icon("v20undo")}</button><button class="arrb" id="arrReset" aria-label="${esc(x.reset)}">${icon("v20reset")}</button><button class="arrb" id="arrHelp" aria-label="${esc(x.help)}">${icon("v20info")}</button></div>`;
  }
  const _roomBlockV20 = roomBlock;
  roomBlock = function () {
    let h = _roomBlockV20();
    if (!S.pet || S.away || !inRoomScene()) { V20T.arr = false; return h; }
    if (!V20T.found.length) { V20T.arr = false; return h; }
    const x = v20tx();
    if (V20T.arr) {
      h = h.replace('<div class="roomwrap', '<div data-arr="1" class="roomwrap').replace(' id="room"', ' id="room" data-arr="1"');
      return h.replace('<div class="fx" id="fx"></div>', handlesHTML() + barHTML() + '<div class="fx" id="fx"></div>');
    }
    const btn = `<button class="fullbtn mvbtn" id="arrOpen" aria-label="${esc(x.arr)}">${icon("v20move")}</button>`;
    if (full) return h.replace('<button class="fullbtn close" id="fullClose"', btn + '<button class="fullbtn close" id="fullClose"');
    return h.includes('id="fullOpen"') ? h.replace('<button class="fullbtn" id="fullOpen"', btn + '<button class="fullbtn" id="fullOpen"') : h.replace('<div class="fx" id="fx"></div>', btn + '<div class="fx" id="fx"></div>');
  };
  const _defaultSayV20 = defaultSay;
  defaultSay = function () { if (V20T.arr && S.pet && !S.away) return v20tx().arrHint(S.petName); return _defaultSayV20(); };
  /* le maniglie si allineano al disegno vero (anche quando la stanza e' rimpicciolita sugli schermi bassi) */
  function placeHandle(hn, f) {
    const room = document.getElementById("room"); if (!room || !hn) return;
    const a = toClient(f.bb[0] + f.dx, f.bb[1] + f.dy), b = toClient(f.bb[0] + f.bb[2] + f.dx, f.bb[1] + f.bb[3] + f.dy); if (!a || !b) return;
    const r = room.getBoundingClientRect();
    hn.style.left = `${a.x - r.left}px`; hn.style.top = `${a.y - r.top}px`; hn.style.width = `${b.x - a.x}px`; hn.style.height = `${b.y - a.y}px`;
  }
  function placeHandles() { document.querySelectorAll("#room .mvh").forEach((hn) => { const f = V20T.found.find((q) => q.id === hn.dataset.mv); if (f) placeHandle(hn, f); }); }
  const _renderV20 = render;
  render = function () {
    if (V20T.arr && (tab !== "today" || S.away || !S.pet || !inRoomScene())) V20T.arr = false;
    _renderV20();
    if (V20T.arr && !document.querySelector("#room[data-arr]")) V20T.arr = false;
    if (V20T.arr) { calmRoom(); placeHandles(); }
  };
  window.addEventListener("resize", () => { if (V20T.arr) setTimeout(placeHandles, 260); });

  function enterArr() {
    if (!canArrange()) return false;
    if (playMode) stopPlay();
    V20T.arr = true; V20T.undo = []; sayText = null; render();
    SND.play("chime"); SND.haptic(8); trackOnce("v20-sposta");
    if (anim) G.from("#room .mvh", { scale: 0.6, opacity: 0, duration: 0.35, stagger: 0.04, ease: "back.out(2)", clearProps: "transform,opacity" });
    return true;
  }
  function exitArr() {
    if (!V20T.arr) return; const changed = V20T.undo.length > 0;
    V20T.arr = false; V20T.undo = []; sayText = null; render(); SND.play("click");
    if (changed) { setExpr("felice", 1800); say(v20tx().love, 2600); burst("heart", 5); }
  }
  V20T.enterArr = enterArr; V20T.exitArr = exitArr;
  function snapshot() { const st = v20st(); return { pos: JSON.parse(JSON.stringify(st.pos)), slot: JSON.parse(JSON.stringify(st.slot)) }; }
  function pushUndo() { V20T.undo.push(snapshot()); if (V20T.undo.length > 40) V20T.undo.shift(); const u = document.getElementById("arrUndo"); if (u) u.disabled = false; }
  function undo() {
    const s = V20T.undo.pop(); if (!s) { toast(v20tx().noUndo); return; }
    const st = v20st(); st.pos = s.pos; st.slot = s.slot; save(); render(); SND.play("back"); SND.haptic(6);
  }
  function resetLayout() {
    const st = v20st(); if (!Object.keys(st.pos).length && !Object.keys(st.slot).length) { toast(v20tx().resetToast); return; }
    pushUndo(); st.pos = {}; st.slot = {}; save(); render(); toast(v20tx().resetToast); SND.play("chime"); SND.haptic(8);
  }
  V20T.undoFn = undo; V20T.resetFn = resetLayout;
  function setPos(f, dx, dy) { const st = v20st(); st.pos[f.id] = [dx, dy]; st.slot[f.slot] = [dx, dy]; f.dx = dx; f.dy = dy; }
  /* profondita': gli oggetti piu' in basso sul pavimento passano davanti al compagno */
  function reorder() {
    const sv = svgEl(); if (!sv) return; const back = sv.querySelector("g.mvanchor"), front = sv.querySelector("g.mvfront"); if (!back || !front) return;
    const fl = V20T.found.filter((f) => f.kind === "floor").sort((a, b) => (a.bb[1] + a.bb[3] + a.dy) - (b.bb[1] + b.bb[3] + b.dy));
    fl.forEach((f) => { const g = sv.querySelector(`g.mv[data-mv="${f.id}"]`); if (!g) return; const base = f.bb[1] + f.bb[3] + f.dy; (base > PET_BASE ? front : back).before(g); });
  }
  const gOf = (id) => { const sv = svgEl(); return sv && sv.querySelector(`g.mv[data-mv="${id}"]`); };
  const setT = (g, dx, dy) => { if (g) g.setAttribute("transform", `translate(${+dx.toFixed(1)} ${+dy.toFixed(1)})`); };
  function petBox() { const w = document.getElementById("petWrap"); return w ? w.getBoundingClientRect() : null; }
  function overPet(cx, cy) { const r = petBox(); if (!r) return false; const ix = r.width * 0.12, iy = r.height * 0.1; return cx > r.left + ix && cx < r.right - ix && cy > r.top + iy && cy < r.bottom; }

  function dragStart(f, ev) {
    const g = gOf(f.id); const hn = document.querySelector(`#room .mvh[data-mv="${f.id}"]`); const p0 = scenePt(ev.clientX, ev.clientY); if (!g || !p0) return false;
    calmRoom();
    V20T.drag = { f, g, hn, p0, dx0: f.dx, dy0: f.dy, dx: f.dx, dy: f.dy, pid: ev.pointerId, moved: false, give: !!GIVE[f.id] && !!document.getElementById("petWrap"), over: false, lookAt: 0, kb: false };
    const inner = g.querySelector(".mvi"); const [bx, by, w, h] = f.bb;
    if (inner) inner.setAttribute("transform", `translate(${bx + w / 2} ${by + h}) scale(1.06) translate(${-(bx + w / 2)} ${-(by + h)})`);
    setT(g, f.dx, f.dy - (f.kind === "floor" ? 5 : 3));
    if (hn) hn.classList.add("lift");
    const ph = document.getElementById("petHit"); if (ph && V20T.drag.give) ph.classList.add("mvgive");
    SND.play("tap"); SND.haptic(8);
    return true;
  }
  function dragMove(ev) {
    const d = V20T.drag; if (!d) return; const p = scenePt(ev.clientX, ev.clientY); if (!p) return;
    let dx = d.dx0 + p.x - d.p0.x, dy = d.dy0 + p.y - d.p0.y;
    if (Math.hypot(p.x - d.p0.x, p.y - d.p0.y) > 3) d.moved = true;
    const c = clampPos(d.f.id, d.f.slot, dx || 0.01, dy, false); dx = c[0]; dy = c[1];
    d.dx = dx; d.dy = dy; setT(d.g, dx, dy - (d.f.kind === "floor" ? 5 : 3));
    if (d.hn) placeHandle(d.hn, { bb: d.f.bb, dx, dy });
    const ov = d.give && overPet(ev.clientX, ev.clientY);
    if (ov !== d.over) {
      d.over = ov; const ph = document.getElementById("petHit"); if (ph) ph.classList.toggle("mvover", ov);
      if (ov) { setExpr("wow", 1400); SND.note(880, 0.3); SND.haptic(5); }
    }
    const now = Date.now(); if (now - d.lookAt > 140) { d.lookAt = now; lookAt(ev.clientX, ev.clientY); }
  }
  function dragEnd(cancel) {
    const d = V20T.drag; if (!d) return; V20T.drag = null;
    const ph = document.getElementById("petHit"); if (ph) ph.classList.remove("mvgive", "mvover");
    if (d.hn) d.hn.classList.remove("lift");
    const inner = d.g.querySelector(".mvi"); if (inner) inner.removeAttribute("transform");
    if (!cancel && d.over && d.give) { giveItem(d); return; }
    if (cancel || !d.moved) { settle(d, d.dx0, d.dy0, false); return; }
    const before = snapshot();
    const fin = clampPos(d.f.id, d.f.slot, d.dx || 0.01, d.dy, true);
    const nudged = Math.abs(fin[0] - d.dx) > 2 && d.f.kind === "floor";
    if (fin[0] === d.dx0 && fin[1] === d.dy0) { settle(d, fin[0], fin[1], true); return; }
    V20T.undo.push(before); if (V20T.undo.length > 40) V20T.undo.shift();
    const u = document.getElementById("arrUndo"); if (u) u.disabled = false;
    setPos(d.f, fin[0], fin[1]); save();
    settle(d, fin[0], fin[1], true);
    if (nudged) { say(v20tx().nudge, 2200); lookAt(d.hn ? d.hn.getBoundingClientRect().left : 0, 0); }
  }
  function settle(d, dx, dy, land) {
    const f = d.f; f.dx = dx; f.dy = dy;
    const done = () => { setT(d.g, dx, dy); if (d.hn) placeHandle(d.hn, f); reorder(); };
    if (!anim) { done(); if (land) { SND.play("tap"); SND.haptic(6); } return; }
    const o = { x: d.dx, y: d.dy - (f.kind === "floor" ? 5 : 3) };
    G.to(o, { x: dx, y: dy, duration: 0.2, ease: "power2.out", onUpdate: () => { setT(d.g, o.x, o.y); if (d.hn) placeHandle(d.hn, { bb: f.bb, dx: o.x, dy: o.y }); }, onComplete: () => {
      done();
      if (!land) return; SND.play("tap"); SND.haptic(6);
      const inner = d.g.querySelector(".mvi"); if (!inner) return;
      if (f.kind === "floor") G.fromTo(inner, { scaleY: 0.9, scaleX: 1.06, transformOrigin: "50% 100%" }, { scaleY: 1, scaleX: 1, duration: 0.45, ease: "elastic.out(1, .5)", clearProps: "transform" });
      else G.fromTo(inner, { rotation: -4, transformOrigin: "50% 0%" }, { rotation: 0, duration: 0.7, ease: "elastic.out(1, .35)", clearProps: "transform" });
    } });
  }
  /* regalo: l'oggetto vola dal compagno, che reagisce a modo suo, poi torna al suo posto */
  function giveItem(d) {
    const f = d.f, x = v20tx(), kind = GIVE[f.id];
    const back = () => { setT(d.g, d.dx0, d.dy0); f.dx = d.dx0; f.dy = d.dy0; if (d.hn) placeHandle(d.hn, f); if (anim) G.fromTo(d.g, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.1, clearProps: "opacity" }); };
    if (anim) {
      const pb = petBox(), c = pb ? scenePt(pb.left + pb.width / 2, pb.top + pb.height * 0.62) : null;
      const [bx, by, w, h] = f.bb; const tx = c ? c.x - (bx + w / 2) : d.dx, ty = c ? c.y - (by + h / 2) : d.dy;
      const o = { x: d.dx, y: d.dy };
      G.to(o, { x: tx, y: ty, duration: 0.28, ease: "power2.in", onUpdate: () => setT(d.g, o.x, o.y) });
      G.to(d.g, { opacity: 0, duration: 0.2, delay: 0.14, onComplete: () => setTimeout(back, 1300) });
    } else back();
    setTimeout(() => react(f.id, kind), anim ? 260 : 0);
    if (S.lightsOff) { say(x.sleepGive, 2600); SND.play("purr"); return; }
    say(x.give[kind] || x.give.def, 3000);
    const st = v20st(); if (st.gave[f.id] !== dkey()) { st.gave[f.id] = dkey(); addJoy(1); save(); refreshJoy(); }
    trackOnce("v20-regalo");
  }
  function giftFloat(id) {
    const fx = document.getElementById("fx"), room = document.getElementById("room"), pb = petBox(); if (!fx || !room || !pb || typeof itemArt !== "function") return;
    const r = room.getBoundingClientRect(); const s = document.createElement("span"); s.className = "v20gift"; s.setAttribute("aria-hidden", "true"); s.innerHTML = itemArt(id);
    s.style.left = `${pb.left + pb.width / 2 - r.left}px`; s.style.top = `${pb.top + pb.height * 0.18 - r.top}px`; fx.appendChild(s);
    if (anim) G.timeline({ onComplete: () => s.remove() }).fromTo(s, { scale: 0.3, opacity: 0, y: 10 }, { scale: 1, opacity: 1, y: -6, duration: 0.35, ease: "back.out(2.2)" }).to(s, { y: -12, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut" }).to(s, { opacity: 0, scale: 0.6, y: -26, duration: 0.3 });
    else setTimeout(() => s.remove(), 900);
  }
  function react(id, kind) {
    const p = petEl(); const hit = document.getElementById("petHit");
    if (S.lightsOff) { touchSleepy(null, true); return; }
    giftFloat(id);
    if (kind === "yarn") { setExpr("felice", 2000); if (!(typeof petTrick === "function" && petTrick("turn"))) jump(false); SND.play("giggle"); setTimeout(() => burst("star", 5), 400); }
    else if (kind === "teddy") { setExpr("amore", 2400); burst("heart", 8); SND.play("purr"); SND.haptic([20, 40, 20]); if (p && anim && !trickOn) { G.killTweensOf(p); G.timeline({ defaults: { transformOrigin: "50% 100%" } }).to(p, { scaleX: 1.12, scaleY: 0.94, duration: 0.3, ease: "sine.out" }).to(p, { scaleX: 1.06, scaleY: 1.02, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }).to(p, { scaleX: 1, scaleY: 1, duration: 0.45, ease: "elastic.out(1, .5)" }); } }
    else if (kind === "books") { setExpr("wow", 2000); SND.play("paper"); if (hit && typeof fxAt === "function") fxAt(hit, "✦", "starfx", 1, -40); if (p && anim && !trickOn) G.timeline({ defaults: { transformOrigin: "50% 100%" } }).to(p, { rotation: -5, duration: 0.4, ease: "sine.inOut" }).to(p, { rotation: 0, duration: 0.6, ease: "elastic.out(1, .5)" }); }
    else if (kind === "guitar") { setExpr("felice", 2200); if (typeof strum === "function") strum(); if (typeof danceShort === "function") danceShort(2); if (hit && typeof notesAt === "function") notesAt(hit, 4); }
    else if (kind === "soft") { setExpr("felice", 2400); SND.play("purr"); burst("heart", 4); if (p && anim && !trickOn) { G.killTweensOf(p); G.timeline({ defaults: { transformOrigin: "50% 100%" } }).to(p, { scaleY: 0.88, scaleX: 1.1, duration: 0.6, ease: "sine.inOut" }).to(p, { scaleY: 1, scaleX: 1, duration: 0.8, delay: 0.5, ease: "elastic.out(1, .4)" }); } }
    else if (kind === "dragon") { setExpr("felice", 2000); if (!(typeof petTrick === "function" && petTrick("hops"))) jump(true); SND.play("sparkle"); setTimeout(() => burst("star", 6), 300); }
    else if (kind === "shells") { setExpr("wow", 2200); SND.play("chime"); if (p && anim && !trickOn) G.timeline({ defaults: { transformOrigin: "50% 100%" } }).to(p, { rotation: 7, duration: 0.5, ease: "sine.inOut" }).to(p, { rotation: 0, duration: 0.8, delay: 0.6, ease: "elastic.out(1, .4)" }); }
    else if (kind === "crystal") { setExpr("wow", 2000); SND.play("sparkle"); if (hit && typeof glowAt === "function") glowAt(hit, "#C9B6FF"); burst("star", 6); }
    else { setExpr("felice", 1800); jump(false); SND.play("pop"); }
  }
  V20T.giveTest = (id) => { const f = V20T.found.find((q) => q.id === id); if (!f) return false; const g = gOf(id); if (!g) return false; giveItem({ f, g, hn: null, dx0: f.dx, dy0: f.dy, dx: f.dx, dy: f.dy }); return true; };

  /* tastiera: le frecce spostano l'oggetto selezionato */
  document.addEventListener("keydown", (ev) => {
    if (!V20T.arr) return;
    if (ev.key === "Escape" && !layer.innerHTML) { ev.preventDefault(); ev.stopImmediatePropagation(); exitArr(); return; }
    const hn = ev.target && ev.target.closest && ev.target.closest(".mvh"); if (!hn) return;
    const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key]; if (!k) return;
    ev.preventDefault(); const f = V20T.found.find((q) => q.id === hn.dataset.mv); if (!f) return;
    const step = ev.shiftKey ? 18 : 6; const c = clampPos(f.id, f.slot, f.dx + k[0] * step || 0.01, f.dy + k[1] * step, false);
    const now = Date.now(); if (!(V20T.kbAt && V20T.kbId === f.id && now - V20T.kbAt < 1500)) pushUndo(); V20T.kbAt = now; V20T.kbId = f.id;
    setPos(f, c[0], c[1]); setT(gOf(f.id), c[0], c[1]); placeHandle(hn, f); reorder(); save(); SND.play("tap");
    clearTimeout(V20T.kbT); V20T.kbT = setTimeout(() => { const fin = clampPos(f.id, f.slot, f.dx || 0.01, f.dy, true); if (fin[0] !== f.dx || fin[1] !== f.dy) { setPos(f, fin[0], fin[1]); setT(gOf(f.id), fin[0], fin[1]); const h2 = document.querySelector(`#room .mvh[data-mv="${f.id}"]`); if (h2) placeHandle(h2, f); reorder(); save(); say(v20tx().nudge, 2200); } }, 900);
  }, true);

  /* --- Puntatore: maniglie, pressione lunga sugli oggetti, carezze --- */
  document.addEventListener("pointerdown", (ev) => {
    const tg = ev.target; if (!tg || !tg.closest) return;
    if (V20T.arr) {
      const hn = tg.closest("#room .mvh"); if (!hn || V20T.drag) return;
      const f = V20T.found.find((q) => q.id === hn.dataset.mv); if (!f) return;
      ev.stopPropagation(); ev.preventDefault();
      if (dragStart(f, ev)) { try { hn.setPointerCapture(ev.pointerId); } catch (e) { /* niente */ } }
      return;
    }
  }, true);
  document.addEventListener("pointerdown", (ev) => {
    const tg = ev.target; if (!tg || !tg.closest || V20T.drag) return;
    if (tg.id === "petHit") {
      calmRoom(); dragInfo = null;
      const z = zoneAt(ev.clientX, ev.clientY);
      V20T.last = { x: ev.clientX, y: ev.clientY, t: Date.now(), zone: z.zone, side: z.side };
      V20T.stk = { x: ev.clientX, y: ev.clientY, dist: 0, step: 0, on: false, pid: ev.pointerId, n: 0 };
      if (anim && petEl() && !trickOn && !S.lightsOff && now0() >= V20T.tch.busyUntil) { V20T.stk.pressed = true; G.to(petEl(), { scaleY: 0.985, scaleX: 1.01, transformOrigin: "50% 100%", duration: 0.08, ease: "sine.out", overwrite: "auto" }); }
      return;
    }
    if (V20T.arr) return;
    /* tenere premuto un oggetto lo solleva (e apre "Sposta") */
    const room = tg.closest("#room"); if (!room || ev.button > 0) return;
    if (tg.closest("#petHit, #gift, #letter, #friendHit, .critter, .fullbtn, .bubl, .hand, .act, .scn")) return;
    if (!canArrange() || (playMode && playMode !== "bubbles") || layer.innerHTML) return;
    const f = itemAtScene(scenePt(ev.clientX, ev.clientY)); if (!f) return;
    clearTimeout(V20T.lp && V20T.lp.timer);
    V20T.lp = { x: ev.clientX, y: ev.clientY, cx: ev.clientX, cy: ev.clientY, pid: ev.pointerId, id: f.id, timer: setTimeout(longPress, 480) };
  });
  const now0 = () => Date.now();
  function longPress() {
    const lp = V20T.lp; if (!lp) return; V20T.lp = null;
    if (!enterArr()) return;
    const f = V20T.found.find((q) => q.id === lp.id); if (!f) return;
    V20T.swallowClick = Date.now();
    dragStart(f, { clientX: lp.cx, clientY: lp.cy, pointerId: lp.pid });
  }
  V20T.longPressTest = (id, cx, cy) => { V20T.lp = { x: cx, y: cy, cx, cy, pid: 1, id, timer: 0 }; longPress(); return !!V20T.drag; };
  document.addEventListener("pointermove", (ev) => {
    const lp = V20T.lp;
    if (lp && lp.pid === ev.pointerId) { lp.cx = ev.clientX; lp.cy = ev.clientY; if (Math.hypot(ev.clientX - lp.x, ev.clientY - lp.y) > 10) { clearTimeout(lp.timer); V20T.lp = null; } }
    if (V20T.drag) { if (V20T.drag.pid === ev.pointerId || V20T.drag.pid == null) { ev.stopPropagation(); dragMove(ev); } return; }
    if (V20T.arr && ev.pointerType === "mouse") ev.stopPropagation(); /* niente inclinazione 3D della stanza mentre si sistemano gli oggetti */
    const st = V20T.stk; if (!st || st.pid !== ev.pointerId || S.away) return;
    const d = Math.hypot(ev.clientX - st.x, ev.clientY - st.y); const dxs = ev.clientX - st.x; st.x = ev.clientX; st.y = ev.clientY; st.dist += d; st.tot = (st.tot || 0) + d;
    if (!st.on && st.tot > 26) { st.on = true; suppressPetClick = true; }
    if (st.on && st.tot - st.step > 56) { st.step = st.tot; strokeStep(ev, dxs * 8); }
  }, { capture: true, passive: true });
  const up = (ev, cancel) => {
    if (V20T.lp && V20T.lp.pid === ev.pointerId) { clearTimeout(V20T.lp.timer); V20T.lp = null; }
    if (V20T.drag && (V20T.drag.pid === ev.pointerId || V20T.drag.pid == null)) { V20T.swallowClick = Date.now(); dragEnd(cancel); }
    if (V20T.stk && V20T.stk.pid === ev.pointerId) strokeEnd();
  };
  document.addEventListener("pointerup", (ev) => up(ev, false), true);
  document.addEventListener("pointercancel", (ev) => up(ev, true), true);
  /* mentre si trascina un oggetto la pagina non scorre */
  document.addEventListener("touchmove", (ev) => { if (V20T.drag && ev.cancelable) ev.preventDefault(); }, { passive: false });
  document.addEventListener("contextmenu", (ev) => { if ((V20T.arr || V20T.lp || V20T.drag) && ev.target && ev.target.closest && ev.target.closest("#room")) ev.preventDefault(); });
  document.addEventListener("scroll", () => { if (V20T.lp) { clearTimeout(V20T.lp.timer); V20T.lp = null; } }, { passive: true, capture: true });

  /* --- Pulsanti --- */
  document.addEventListener("click", (ev) => {
    const tg = ev.target; if (!tg || !tg.closest) return;
    if (V20T.swallowClick && Date.now() - V20T.swallowClick < 500 && tg.closest("#room") && !tg.closest(".arrbar")) { V20T.swallowClick = 0; ev.stopImmediatePropagation(); ev.preventDefault(); return; }
    const b = tg.closest("button"); if (!b) return;
    if (b.id === "arrOpen") { ev.stopImmediatePropagation(); enterArr(); return; }
    if (b.id === "arrDone") { ev.stopImmediatePropagation(); exitArr(); return; }
    if (b.id === "arrUndo") { ev.stopImmediatePropagation(); undo(); return; }
    if (b.id === "arrReset") { ev.stopImmediatePropagation(); resetLayout(); return; }
    if (b.id === "arrHelp") { ev.stopImmediatePropagation(); openHelp(false); return; }
    if (b.id === "v20hOk") { ev.stopImmediatePropagation(); closeLayer(); return; }
    if (b.classList.contains("mvh")) { ev.stopImmediatePropagation(); return; }
  }, true);

  /* =================== 3) SCOPERTA: un consiglio la prima volta, poi sempre dal pulsante "i" =================== */
  function openHelp(first) {
    const x = v20tx(); const n = S.petName || "";
    const dots = [[100, 72, "#F29BB8"], [38, 128, "#FFC94D"], [162, 128, "#FFC94D"], [100, 148, "#9EE3C5"], [100, 182, "#9CC8F7"]].map(([cx, cy, c]) => `<circle cx="${cx}" cy="${cy}" r="9" fill="${c}" stroke="#fff" stroke-width="3"/>`).join("");
    const pet = (typeof petSVG === "function" ? petSVG(S.pet, "felice", S.hat, stage(), n) : "").replace(/<\/svg>\s*$/, `${dots}</svg>`);
    const chip = (c, s) => `<li><i style="background:${c}" aria-hidden="true"></i><span>${esc(s)}</span></li>`;
    layer.innerHTML = `<div class="overlay v20help" role="dialog" aria-modal="true" aria-labelledby="v20hT"><div class="box card">
      <h2 id="v20hT">${esc(x.helpT(n))}</h2>
      <div class="v20pet">${pet}</div>
      <ul class="v20zones">${chip("#F29BB8", x.zHead)}${chip("#FFC94D", x.zSide)}${chip("#9EE3C5", x.zBelly)}${chip("#9CC8F7", x.zFeet)}</ul>
      <p class="small v20tip">${esc(x.helpStroke)}</p>
      <div class="v20arr"><span class="v20ic" aria-hidden="true">${icon("v20move")}</span><p class="small">${esc(x.helpArr(n))}</p></div>
      <button class="btn" id="v20hOk">${esc(x.ok)}</button></div></div>`;
    const st = v20st(); if (!st.hint) { st.hint = dkey(); save(); }
    SND.play(first ? "chime" : "click");
    if (anim) { G.from(".v20help .box", { scale: 0.85, opacity: 0, duration: 0.45, ease: "back.out(1.8)" }); G.from(".v20help .v20zones li", { y: 8, opacity: 0, duration: 0.35, stagger: 0.07, delay: 0.2, clearProps: "all" }); }
  }
  V20T.openHelp = openHelp;
  /* il consiglio della prima volta passa dalla coda delle finestre (98f: nq20, una alla volta e con i limiti per apertura):
     98f avvolge v20touchHint; quando arriva il suo turno si ricontrolla che serva ancora e che la stanza sia libera */
  const hintCalm = () => S.pet && S.tut >= 99 && (!S.firstDay || S.firstDay !== dkey()) /* 1.0.8: non il giorno dell'installazione, che ha gia' tante novita' */ && tab === "today" && !S.away && !layer.innerHTML && !tutOn && !V20T.arr && !V20T.drag && document.getElementById("petHit") && document.visibilityState === "visible";
  v20touchHint = function () { if (!v20st().hint && hintCalm()) openHelp(true); };
  let hintOk = 0;
  const hintT = setInterval(() => {
    if (document.hidden) return;
    const st = v20st(); if (st.hint) { clearInterval(hintT); return; }
    if (window.__TEST_NOLAUNCH || window.__TEST_NOHINT20) return;
    hintOk = hintCalm() ? hintOk + 1 : 0;
    if (hintOk >= 3) { hintOk = 0; v20touchHint(); }
  }, 2500);
})();
