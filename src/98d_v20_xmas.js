/* ===== 1.0.8 (v20) — Natale a Tanetto =====
   - Dall'8 dicembre (ore 0:00, ora del telefono) al 6 gennaio compreso tutta l'app è a tema Natale;
     il 7 gennaio alle 0:00 torna normale da sola, ogni anno. La data è quella del telefono, come dkey().
   - Tema: colori (verde abete, rosso caldo, oro), neve leggera dietro le schede (al massimo 22 fiocchi, solo CSS,
     ferma con app nascosta, spenta con calma / movimento ridotto / modalità leggera), ghirlanda sulla tenda,
     lucine calde sulla parete, coroncina alla finestra, frasi del compagno (speciali il 24, 25, 26, 31 e 1).
   - L'albero di Natale: 5 tappe comprate con i Tanì (prezzi qui sotto, Plus -30% arrotondato a 5).
     Si salva in S.v20xmas = { year, stage, done: [anni finiti], ann: anno dell'annuncio, party: anno della festa }.
     Ogni anno si comincia un albero nuovo con un puntale diverso; gli alberi finiti restano come
     "pallina ricordo" nel profilo e appesi all'albero dell'anno dopo. */
const XMAS_TREE_COST = [225, 300, 375, 425, 500]; /* tappe: abete, lucine, palline, puntale, regali (l'economia può cambiarli qui) */
const XMAS_PLUS_OFF = 0.3;

/* --- Testi (14 lingue) --- */
const XM_T = {
  it: { treeT: "L'albero di Natale", treeP: (p, d) => `Fallo crescere con ${p}, una tappa alla volta. Resta nella stanza fino al ${d}.`,
    stages: ["Piccolo abete", "Lucine", "Palline", "", "Regali sotto l'albero"], tops: ["Stella in cima", "Fiocco di neve in cima", "Cuore d'oro in cima"],
    step: (a, b) => `Tappa ${a} di ${b}`, next: "Prossima tappa", add: "Aggiungi", how: "Come averli", plusB: "Plus −30%", plusP: "Con Tanetto Plus ogni tappa costa il 30% in meno.",
    doneT: "L'albero è pronto!", doneP: (p) => `${p} non smette di guardarlo. Buone feste!`, sheetP: "Ogni anno si fa un albero nuovo, con un puntale diverso. Le palline ricordo restano nel tuo profilo.",
    annT: "Il Natale è arrivato a Tanetto", annP: (p, d) => `Fino al ${d} la casetta si veste a festa. E puoi fare l'albero insieme a ${p}: cinque tappe, una alla volta, con i Tanì che metti da parte.`,
    annSoon: "Metti da parte un po' di Tanì ogni giorno: tappa dopo tappa, l'albero prende forma.", annGo: "Vediamo l'albero", later: "Più tardi",
    celebT: "Che albero meraviglioso!", celebP: (p) => `L'avete finito insieme. ${p} ha messo una pallina ricordo nel tuo profilo.`, celebB: "Che bello",
    badge: (y) => `Natale ${y}`, badgeP: (y) => `Pallina ricordo del Natale ${y}: avete finito l'albero insieme.`,
    says: ["C'è aria di feste qui dentro. Mi piace tantissimo.", "Una cosa calda da bere e una coperta: perfetto.", "Oggi è una giornata morbida, come un maglione di lana.", "Le feste sono più belle passate insieme.", "Facciamo una cosa piccola e buona per te, oggi?"],
    tree0: "Il nostro albero cresce un pezzetto alla volta.", tree1: "Guarda il nostro albero: brilla tutto!",
    sp: { d24: "È la Vigilia! Stasera ti faccio compagnia io.", d25: "Buon Natale! Sono felice di passarlo con te.", d26: "C'è ancora aria di festa: oggi ce la prendiamo con calma.", d31: "Ultimo giorno dell'anno: grazie per ogni giorno passato insieme.", d1: "Buon anno! Cominciamo piano, un passo alla volta." },
    gr: { d24: "Buona Vigilia", d25: "Buon Natale", d1: "Buon anno" }, openL: "Albero di Natale: vedi le tappe", added: (x) => `${x}: fatto!` },
  en: { treeT: "The Christmas tree", treeP: (p, d) => `Grow it with ${p}, one step at a time. It stays in your room until ${d}.`,
    stages: ["Little fir", "String lights", "Baubles", "", "Presents underneath"], tops: ["Star on top", "Snowflake on top", "Golden heart on top"],
    step: (a, b) => `Step ${a} of ${b}`, next: "Next step", add: "Add", how: "How to get them", plusB: "Plus −30%", plusP: "With Tanetto Plus every step costs 30% less.",
    doneT: "Your tree is ready!", doneP: (p) => `${p} can't stop looking at it. Happy holidays!`, sheetP: "Every year you build a new tree, with a different topper. Keepsake ornaments stay in your profile.",
    annT: "Christmas has come to Tanetto", annP: (p, d) => `Until ${d} your little home gets ready for the holidays. And you can build the tree together with ${p}: five steps, one at a time, with the Tanì you save up.`,
    annSoon: "Put a few Tanì aside every day: step by step, the tree takes shape.", annGo: "Let's see the tree", later: "Later",
    celebT: "What a wonderful tree!", celebP: (p) => `You finished it together. ${p} put a keepsake ornament in your profile.`, celebB: "So lovely",
    badge: (y) => `Christmas ${y}`, badgeP: (y) => `Keepsake ornament from Christmas ${y}: you finished the tree together.`,
    says: ["It feels like the holidays in here. I love it.", "Something warm to drink and a blanket: perfect.", "Today feels soft, like a wool sweater.", "The holidays are better together.", "Shall we do one small, kind thing for you today?"],
    tree0: "Our tree grows a little at a time.", tree1: "Look at our tree: it's all sparkly!",
    sp: { d24: "It's Christmas Eve! I'll keep you company tonight.", d25: "Merry Christmas! I'm so happy to spend it with you.", d26: "It still feels like a holiday: let's take it easy today.", d31: "Last day of the year: thank you for every day we spent together.", d1: "Happy New Year! Let's start gently, one step at a time." },
    gr: { d24: "Happy Christmas Eve", d25: "Merry Christmas", d1: "Happy New Year" }, openL: "Christmas tree: see the steps", added: (x) => `${x}: done!` },
  de: { treeT: "Der Weihnachtsbaum", treeP: (p, d) => `Lass ihn mit ${p} wachsen, Schritt für Schritt. Er bleibt bis zum ${d} in deinem Zimmer.`,
    stages: ["Kleine Tanne", "Lichterkette", "Christbaumkugeln", "", "Geschenke unterm Baum"], tops: ["Stern an der Spitze", "Schneeflocke an der Spitze", "Goldenes Herz an der Spitze"],
    step: (a, b) => `Schritt ${a} von ${b}`, next: "Nächster Schritt", add: "Hinzufügen", how: "So bekommst du sie", plusB: "Plus −30 %", plusP: "Mit Tanetto Plus kostet jeder Schritt 30 % weniger.",
    doneT: "Dein Baum ist fertig!", doneP: (p) => `${p} kann gar nicht aufhören, ihn anzuschauen. Frohe Feiertage!`, sheetP: "Jedes Jahr gibt es einen neuen Baum mit einer anderen Spitze. Die Erinnerungskugeln bleiben in deinem Profil.",
    annT: "Weihnachten ist bei Tanetto angekommen", annP: (p, d) => `Bis zum ${d} wird dein kleines Zuhause festlich. Und du kannst mit ${p} den Baum schmücken: fünf Schritte, einer nach dem anderen, mit den Tanì, die du sparst.`,
    annSoon: "Leg jeden Tag ein paar Tanì zur Seite: Schritt für Schritt nimmt der Baum Gestalt an.", annGo: "Zum Baum", later: "Später",
    celebT: "Was für ein wunderschöner Baum!", celebP: (p) => `Ihr habt ihn zusammen fertig gemacht. ${p} hat eine Erinnerungskugel in dein Profil gehängt.`, celebB: "Wie schön",
    badge: (y) => `Weihnachten ${y}`, badgeP: (y) => `Erinnerungskugel von Weihnachten ${y}: Ihr habt den Baum zusammen fertig gemacht.`,
    says: ["Hier drin fühlt sich alles schon nach Feiertagen an. Ich liebe das.", "Etwas Warmes zu trinken und eine Decke: perfekt.", "Heute ist ein weicher Tag, wie ein Wollpulli.", "Zusammen sind die Feiertage schöner.", "Wollen wir heute etwas Kleines, Gutes für dich tun?"],
    tree0: "Unser Baum wächst Stück für Stück.", tree1: "Schau mal, unser Baum funkelt überall!",
    sp: { d24: "Es ist Heiligabend! Heute Abend leiste ich dir Gesellschaft.", d25: "Frohe Weihnachten! Wie schön, sie mit dir zu verbringen.", d26: "Es fühlt sich immer noch nach Feiertag an: Heute machen wir es uns gemütlich.", d31: "Der letzte Tag des Jahres: Danke für jeden Tag, den wir zusammen hatten.", d1: "Frohes neues Jahr! Fangen wir sanft an, Schritt für Schritt." },
    gr: { d24: "Schönen Heiligabend", d25: "Frohe Weihnachten", d1: "Frohes neues Jahr" }, openL: "Weihnachtsbaum: Schritte ansehen", added: (x) => `${x}: erledigt!` },
  es: { treeT: "El árbol de Navidad", treeP: (p, d) => `Hazlo crecer con ${p}, paso a paso. Se queda en tu habitación hasta el ${d}.`,
    stages: ["Abeto pequeño", "Lucecitas", "Bolas", "", "Regalos bajo el árbol"], tops: ["Estrella en la punta", "Copo de nieve en la punta", "Corazón dorado en la punta"],
    step: (a, b) => `Paso ${a} de ${b}`, next: "Siguiente paso", add: "Añadir", how: "Cómo conseguirlos", plusB: "Plus −30 %", plusP: "Con Tanetto Plus cada paso cuesta un 30 % menos.",
    doneT: "¡Tu árbol está listo!", doneP: (p) => `${p} no deja de mirarlo. ¡Felices fiestas!`, sheetP: "Cada año se hace un árbol nuevo, con una punta distinta. Las bolas de recuerdo se quedan en tu perfil.",
    annT: "La Navidad ha llegado a Tanetto", annP: (p, d) => `Hasta el ${d} tu casita se viste de fiesta. Y puedes hacer el árbol con ${p}: cinco pasos, uno a uno, con los Tanì que vayas ahorrando.`,
    annSoon: "Guarda unos pocos Tanì cada día: paso a paso, el árbol va tomando forma.", annGo: "Ver el árbol", later: "Más tarde",
    celebT: "¡Qué árbol tan bonito!", celebP: (p) => `¡Terminado, y en equipo! ${p} ha puesto una bola de recuerdo en tu perfil.`, celebB: "Qué bonito",
    badge: (y) => `Navidad ${y}`, badgeP: (y) => `Bola de recuerdo de la Navidad ${y}: el árbol quedó terminado en equipo.`,
    says: ["Aquí dentro ya se respira la fiesta. Me encanta.", "Algo calentito para beber y una manta: perfecto.", "Hoy es un día suave, como un jersey de lana.", "Las fiestas son más bonitas en compañía.", "¿Hacemos hoy algo pequeño y bueno por ti?"],
    tree0: "Nuestro árbol crece poquito a poco.", tree1: "¡Mira nuestro árbol: brilla entero!",
    sp: { d24: "¡Es Nochebuena! Esta noche te hago compañía.", d25: "¡Feliz Navidad! Me alegra mucho pasarla contigo.", d26: "Todavía se respira fiesta: hoy vamos con calma.", d31: "Último día del año: gracias por cada día compartido.", d1: "¡Feliz Año Nuevo! Empecemos con calma, paso a paso." },
    gr: { d24: "Feliz Nochebuena", d25: "Feliz Navidad", d1: "Feliz Año Nuevo" }, openL: "Árbol de Navidad: ver los pasos", added: (x) => `${x}: ¡hecho!` },
  fr: { treeT: "Le sapin de Noël", treeP: (p, d) => `Fais-le grandir avec ${p}, une étape à la fois. Il reste dans ta chambre jusqu'au ${d}.`,
    stages: ["Petit sapin", "Guirlande lumineuse", "Boules", "", "Cadeaux au pied du sapin"], tops: ["Étoile au sommet", "Flocon au sommet", "Cœur doré au sommet"],
    step: (a, b) => `Étape ${a} sur ${b}`, next: "Prochaine étape", add: "Ajouter", how: "Comment en avoir", plusB: "Plus −30 %", plusP: "Avec Tanetto Plus, chaque étape coûte 30 % de moins.",
    doneT: "Ton sapin est prêt !", doneP: (p) => `${p} n'arrête pas de le regarder. Joyeuses fêtes !`, sheetP: "Chaque année, on fait un nouveau sapin, avec un sommet différent. Les boules souvenirs restent dans ton profil.",
    annT: "Noël est arrivé chez Tanetto", annP: (p, d) => `Jusqu'au ${d}, ta petite maison se met en fête. Et tu peux faire le sapin avec ${p} : cinq étapes, une à la fois, avec les Tanì que tu mets de côté.`,
    annSoon: "Mets quelques Tanì de côté chaque jour : étape après étape, le sapin prend forme.", annGo: "Voir le sapin", later: "Plus tard",
    celebT: "Quel sapin magnifique !", celebP: (p) => `Vous l'avez terminé ensemble. ${p} a mis une boule souvenir dans ton profil.`, celebB: "Trop beau",
    badge: (y) => `Noël ${y}`, badgeP: (y) => `Boule souvenir de Noël ${y} : vous avez terminé le sapin ensemble.`,
    says: ["Ça sent déjà la fête ici. J'adore.", "Une boisson chaude et un plaid : parfait.", "Aujourd'hui, tout est doux comme un pull en laine.", "Les fêtes sont plus belles ensemble.", "On fait une petite chose gentille pour toi aujourd'hui ?"],
    tree0: "Notre sapin grandit petit à petit.", tree1: "Regarde notre sapin : il brille de partout !",
    sp: { d24: "C'est le réveillon ! Ce soir, je te tiens compagnie.", d25: "Joyeux Noël ! Ça me fait tellement plaisir de le passer avec toi.", d26: "Il flotte encore un air de fête : aujourd'hui, on prend notre temps.", d31: "Dernier jour de l'année : merci pour chaque jour passé ensemble.", d1: "Bonne année ! On commence doucement, un pas à la fois." },
    gr: { d24: "Joyeux réveillon", d25: "Joyeux Noël", d1: "Bonne année" }, openL: "Sapin de Noël : voir les étapes", added: (x) => `${x} : c'est fait !` },
  pt: { treeT: "A árvore de Natal", treeP: (p, d) => `Monte a árvore com ${p}, uma etapa de cada vez. Ela fica no seu quarto até ${d}.`,
    stages: ["Pinheirinho", "Pisca-pisca", "Bolinhas", "", "Presentes embaixo da árvore"], tops: ["Estrela no topo", "Floco de neve no topo", "Coração dourado no topo"],
    step: (a, b) => `Etapa ${a} de ${b}`, next: "Próxima etapa", add: "Adicionar", how: "Como conseguir", plusB: "Plus −30%", plusP: "Com o Tanetto Plus, cada etapa custa 30% menos.",
    doneT: "Sua árvore está pronta!", doneP: (p) => `${p} não para de olhar para ela. Boas festas!`, sheetP: "Todo ano tem uma árvore nova, com um enfeite diferente no topo. As bolinhas de lembrança ficam no seu perfil.",
    annT: "O Natal chegou ao Tanetto", annP: (p, d) => `Até ${d}, sua casinha entra no clima de festa. E você pode montar a árvore com ${p}: cinco etapas, uma de cada vez, com os Tanì que você guardar.`,
    annSoon: "Guarde alguns Tanì todo dia: etapa por etapa, a árvore vai ganhando forma.", annGo: "Ver a árvore", later: "Depois",
    celebT: "Que árvore linda!", celebP: (p) => `Vocês terminaram juntos. ${p} colocou uma bolinha de lembrança no seu perfil.`, celebB: "Que lindo",
    badge: (y) => `Natal ${y}`, badgeP: (y) => `Bolinha de lembrança do Natal ${y}: vocês terminaram a árvore juntos.`,
    says: ["Aqui dentro já tem clima de festa. Eu adoro.", "Uma bebida quentinha e uma mantinha: perfeito.", "Hoje o dia está macio como um suéter de lã.", "As festas são mais bonitas juntinhos.", "Vamos fazer uma coisinha boa por você hoje?"],
    tree0: "Nossa árvore cresce um pouquinho de cada vez.", tree1: "Olha a nossa árvore: está brilhando inteira!",
    sp: { d24: "É véspera de Natal! Hoje à noite eu te faço companhia.", d25: "Feliz Natal! Que alegria passar o dia com você.", d26: "Ainda tem clima de festa: hoje a gente vai com calma.", d31: "Último dia do ano: que bom cada dia que passamos juntos.", d1: "Feliz Ano Novo! Vamos começar devagar, um passo de cada vez." },
    gr: { d24: "Feliz véspera de Natal", d25: "Feliz Natal", d1: "Feliz Ano Novo" }, openL: "Árvore de Natal: ver as etapas", added: (x) => `${x}: pronto!` },
  ja: { treeT: "クリスマスツリー", treeP: (p, d) => `${p}といっしょに、1ステップずつ飾りましょう。${d}までお部屋に飾れます。`,
    stages: ["小さなもみの木", "ライト", "オーナメント", "", "ツリーの下のプレゼント"], tops: ["てっぺんの星", "てっぺんの雪の結晶", "てっぺんの金のハート"],
    step: (a, b) => `ステップ ${a}/${b}`, next: "次のステップ", add: "飾る", how: "Tanìを集めるには", plusB: "Plus 30%オフ", plusP: "Tanetto Plus なら、どのステップも30%オフです。",
    doneT: "ツリーが完成しました！", doneP: (p) => `${p}はずっと見とれています。すてきなホリデーを！`, sheetP: "ツリーは毎年新しく作ります。てっぺんの飾りも毎年ちがいます。思い出のオーナメントはプロフィールに残ります。",
    annT: "Tanetto にクリスマスがやってきました", annP: (p, d) => `${d}まで、おうちがクリスマス仕様になります。${p}といっしょにツリーも作れます。全部で5ステップ、ためたTanìで1つずつ飾っていきましょう。`,
    annSoon: "毎日少しずつTanìをためましょう。1ステップずつ、ツリーができあがっていきます。", annGo: "ツリーを見る", later: "あとで",
    celebT: "すてきなツリーになりました！", celebP: (p) => `いっしょに完成させましたね。${p}が思い出のオーナメントをプロフィールに飾りました。`, celebB: "うれしい",
    badge: (y) => `${y}年のクリスマス`, badgeP: (y) => `${y}年のクリスマスの思い出のオーナメントです。いっしょにツリーを完成させました。`,
    says: ["お部屋の中がすっかりお祝いムード。大好き！", "あたたかい飲み物とブランケットがあれば最高だね。", "今日はウールのセーターみたいに、ふんわりした気分。", "ホリデーはいっしょに過ごすともっと楽しいね。", "今日は自分のために、小さなうれしいことをしてみない？"],
    tree0: "わたしたちのツリー、少しずつ育ってるよ。", tree1: "見て、ツリーがキラキラ！",
    sp: { d24: "今日はクリスマスイブ！今夜はわたしがそばにいるね。", d25: "メリークリスマス！いっしょに過ごせてうれしいな。", d26: "まだお祝い気分だね。今日はのんびりしよう。", d31: "今年最後の日。いっしょに過ごした毎日に、ありがとう。", d1: "あけましておめでとう！ゆっくり、一歩ずつ始めようね。" },
    gr: { d24: "すてきなイブを", d25: "メリークリスマス", d1: "あけましておめでとう" }, openL: "クリスマスツリー：ステップを見る", added: (x) => `${x}を飾りました！` },
  ko: { treeT: "크리스마스 트리", treeP: (p, d) => `한 단계씩 함께 꾸며 봐요. ${d}까지 방에 있어요.`,
    stages: ["작은 전나무", "전구 장식", "오너먼트", "", "트리 아래 선물"], tops: ["꼭대기 별", "꼭대기 눈송이", "꼭대기 금빛 하트"],
    step: (a, b) => `${b}단계 중 ${a}단계`, next: "다음 단계", add: "추가하기", how: "Tanì 모으는 법", plusB: "Plus 30% 할인", plusP: "Tanetto Plus라면 모든 단계가 30% 할인돼요.",
    doneT: "트리가 완성됐어요!", doneP: (p) => `${p}도 트리에서 눈을 못 떼요. 즐거운 연휴 보내요!`, sheetP: "트리는 매년 새로 만들고, 꼭대기 장식도 매년 달라져요. 추억의 오너먼트는 프로필에 남아요.",
    annT: "Tanetto에 크리스마스가 왔어요", annP: (p, d) => `${d}까지 작은 집이 크리스마스 분위기로 바뀌어요. ${p}도 함께 트리를 만들 수 있어요. 모은 Tanì로 다섯 단계를 하나씩 채워 봐요.`,
    annSoon: "매일 Tanì를 조금씩 모아 봐요. 한 단계씩 트리가 완성돼 가요.", annGo: "트리 보러 가기", later: "나중에",
    celebT: "정말 멋진 트리예요!", celebP: () => "함께 완성했어요. 프로필에 추억의 오너먼트가 걸렸어요.", celebB: "좋아요",
    badge: (y) => `${y} 크리스마스`, badgeP: (y) => `${y} 크리스마스 추억의 오너먼트: 함께 트리를 완성했어요.`,
    says: ["방 안이 벌써 축제 분위기예요. 너무 좋아요.", "따뜻한 음료랑 담요만 있으면 완벽해요.", "오늘은 털 스웨터처럼 포근한 기분이에요.", "연휴는 함께 보내야 더 즐거워요.", "오늘 나를 위한 작고 좋은 일 하나 해 볼까요?"],
    tree0: "우리 트리가 조금씩 자라고 있어요.", tree1: "우리 트리 좀 봐요. 온통 반짝반짝해요!",
    sp: { d24: "크리스마스이브예요! 오늘 밤은 내가 곁에 있을게요.", d25: "메리 크리스마스! 함께 보내서 정말 기뻐요.", d26: "아직 축제 기분이에요. 오늘은 느긋하게 보내요.", d31: "올해의 마지막 날이에요. 함께한 모든 날에 고마워요.", d1: "새해 복 많이 받아요! 천천히, 한 걸음씩 시작해요." },
    gr: { d24: "즐거운 크리스마스이브", d25: "메리 크리스마스", d1: "새해 복 많이 받아요" }, openL: "크리스마스 트리: 단계 보기", added: (x) => `${x} 완료!` },
  zh: { treeT: "圣诞树", treeP: (p, d) => `和${p}一起，一步一步把它装饰起来。它会在房间里待到${d}。`,
    stages: ["小冷杉", "彩灯", "圣诞球", "", "树下的礼物"], tops: ["树顶的星星", "树顶的雪花", "树顶的金色爱心"],
    step: (a, b) => `第 ${a} 步，共 ${b} 步`, next: "下一步", add: "装饰", how: "怎样获得 Tanì", plusB: "Plus 省30%", plusP: "有了 Tanetto Plus，每一步都便宜 30%。",
    doneT: "圣诞树完成啦！", doneP: (p) => `${p}一直盯着它看。节日快乐！`, sheetP: "每年都会做一棵新的树，树顶的装饰也每年不同。纪念圣诞球会留在你的个人资料里。",
    annT: "圣诞节来到 Tanetto 啦", annP: (p, d) => `到${d}为止，小屋会换上节日的装扮。你还可以和${p}一起装饰圣诞树：一共五步，用你攒下的 Tanì 一步一步来。`,
    annSoon: "每天攒一点 Tanì，一步一步，圣诞树就会慢慢成形。", annGo: "去看看圣诞树", later: "稍后",
    celebT: "好漂亮的圣诞树！", celebP: (p) => `你们一起完成了。${p}在你的个人资料里挂上了一颗纪念圣诞球。`, celebB: "太好了",
    badge: (y) => `${y} 圣诞节`, badgeP: (y) => `${y} 年圣诞节的纪念圣诞球：你们一起完成了圣诞树。`,
    says: ["屋子里已经满是节日的气氛了，我好喜欢。", "一杯热饮加一条毯子，刚刚好。", "今天的心情软软的，像一件羊毛衫。", "节日一起过才更开心。", "今天为自己做一件小小的好事吧？"],
    tree0: "我们的树在一点一点长大。", tree1: "快看我们的树，闪闪发光！",
    sp: { d24: "今天是平安夜！今晚我陪着你。", d25: "圣诞快乐！能和你一起过，我好开心。", d26: "节日的气氛还在，今天我们慢慢来。", d31: "今年的最后一天：谢谢我们一起度过的每一天。", d1: "新年快乐！我们慢慢开始，一步一步来。" },
    gr: { d24: "平安夜快乐", d25: "圣诞快乐", d1: "新年快乐" }, openL: "圣诞树：查看步骤", added: (x) => `${x}：完成！` },
  zht: { treeT: "聖誕樹", treeP: (p, d) => `和${p}一起，一步一步把它裝飾起來。它會在房間裡待到${d}。`,
    stages: ["小冷杉", "彩燈", "聖誕球", "", "樹下的禮物"], tops: ["樹頂的星星", "樹頂的雪花", "樹頂的金色愛心"],
    step: (a, b) => `第 ${a} 步，共 ${b} 步`, next: "下一步", add: "裝飾", how: "怎麼獲得 Tanì", plusB: "Plus 省30%", plusP: "有了 Tanetto Plus，每一步都便宜 30%。",
    doneT: "聖誕樹完成了！", doneP: (p) => `${p}一直盯著它看。節日快樂！`, sheetP: "每年都會做一棵新的樹，樹頂的裝飾也每年不同。紀念聖誕球會留在你的個人檔案裡。",
    annT: "聖誕節來到 Tanetto 了", annP: (p, d) => `到${d}為止，小屋會換上節日的裝扮。你還可以和${p}一起裝飾聖誕樹：一共五步，用你存下的 Tanì 一步一步來。`,
    annSoon: "每天存一點 Tanì，一步一步，聖誕樹就會慢慢成形。", annGo: "去看看聖誕樹", later: "稍後",
    celebT: "好漂亮的聖誕樹！", celebP: (p) => `你們一起完成了。${p}在你的個人檔案裡掛上了一顆紀念聖誕球。`, celebB: "太好了",
    badge: (y) => `${y} 聖誕節`, badgeP: (y) => `${y} 年聖誕節的紀念聖誕球：你們一起完成了聖誕樹。`,
    says: ["屋子裡已經滿是節日的氣氛了，我好喜歡。", "一杯熱飲加一條毯子，剛剛好。", "今天的心情軟軟的，像一件羊毛衫。", "節日一起過才更開心。", "今天為自己做一件小小的好事吧？"],
    tree0: "我們的樹在一點一點長大。", tree1: "快看我們的樹，閃閃發光！",
    sp: { d24: "今天是平安夜！今晚我陪著你。", d25: "聖誕快樂！能和你一起過，我好開心。", d26: "節日的氣氛還在，今天我們慢慢來。", d31: "今年的最後一天：謝謝我們一起度過的每一天。", d1: "新年快樂！我們慢慢開始，一步一步來。" },
    gr: { d24: "平安夜快樂", d25: "聖誕快樂", d1: "新年快樂" }, openL: "聖誕樹：查看步驟", added: (x) => `${x}：完成！` },
  ru: { treeT: "Праздничная ёлка", treeP: (p, d) => `Наряжай её шаг за шагом — ${p} поможет. Ёлка будет в комнате до ${d}.`,
    stages: ["Маленькая ёлочка", "Гирлянда", "Ёлочные шары", "", "Подарки под ёлкой"], tops: ["Звезда на макушке", "Снежинка на макушке", "Золотое сердце на макушке"],
    step: (a, b) => `Шаг ${a} из ${b}`, next: "Следующий шаг", add: "Добавить", how: "Как их получить", plusB: "Plus −30%", plusP: "С Tanetto Plus каждый шаг стоит на 30% меньше.",
    doneT: "Ёлка готова!", doneP: (p) => `${p} не может налюбоваться. С праздниками!`, sheetP: "Каждый год наряжаем новую ёлку с другой верхушкой. Шары на память остаются в твоём профиле.",
    annT: "В Tanetto пришли праздники", annP: (p, d) => `До ${d} домик будет праздничным. А ещё можно нарядить ёлку — ${p} поможет: пять шагов, по одному, на Tanì, которые ты накопишь.`,
    annSoon: "Откладывай немного Tanì каждый день: шаг за шагом ёлка будет становиться всё наряднее.", annGo: "Посмотреть ёлку", later: "Позже",
    celebT: "Какая чудесная ёлка!", celebP: () => "Готово, и всё вместе! В твоём профиле появился шар на память.", celebB: "Как красиво",
    badge: (y) => `Ёлка ${y}`, badgeP: (y) => `Шар на память: ёлку ${y} года нарядили вместе.`,
    says: ["Здесь уже пахнет праздником. Мне так нравится.", "Тёплый напиток и плед — то, что нужно.", "Сегодня на душе мягко, как в шерстяном свитере.", "Праздники лучше проводить вместе.", "Давай сегодня сделаем что-нибудь маленькое и доброе для тебя?"],
    tree0: "Наша ёлка растёт понемножку.", tree1: "Посмотри на нашу ёлку: она вся сияет!",
    sp: { d24: "Уютный зимний вечер! Сегодня я буду рядом.", d25: "Какой тёплый зимний день! Как здорово, что мы вместе.", d26: "Зимние дни такие уютные: сегодня никуда не спешим.", d31: "Последний день года: спасибо за каждый день вместе.", d1: "С Новым годом! Начнём потихоньку, шаг за шагом." },
    gr: { d24: "", d25: "", d31: "С наступающим Новым годом", d1: "С Новым годом" }, openL: "Ёлка: посмотреть шаги", added: (x) => `${x}: готово!` },
  pl: { treeT: "Choinka", treeP: (p, d) => `Ubieraj ją krok po kroku — ${p} pomoże. Choinka zostanie w pokoju do ${d}.`,
    stages: ["Mała choinka", "Lampki", "Bombki", "", "Prezenty pod choinką"], tops: ["Gwiazda na czubku", "Śnieżynka na czubku", "Złote serce na czubku"],
    step: (a, b) => `Krok ${a} z ${b}`, next: "Następny krok", add: "Dodaj", how: "Jak je zdobyć", plusB: "Plus −30%", plusP: "Z Tanetto Plus każdy krok kosztuje o 30% mniej.",
    doneT: "Choinka gotowa!", doneP: (p) => `${p} nie może oderwać od niej oczu. Wesołych świąt!`, sheetP: "Co roku ubieramy nową choinkę, z innym czubkiem. Pamiątkowe bombki zostają w twoim profilu.",
    annT: "Do Tanetto przyszły święta", annP: (p, d) => `Do ${d} domek będzie świąteczny. Możesz też ubrać choinkę — ${p} pomoże: pięć kroków, jeden po drugim, za odłożone Tanì.`,
    annSoon: "Odkładaj codziennie trochę Tanì: krok po kroku choinka nabierze kształtu.", annGo: "Zobacz choinkę", later: "Później",
    celebT: "Co za piękna choinka!", celebP: () => "Gotowe, i to razem! W twoim profilu pojawiła się pamiątkowa bombka.", celebB: "Ale pięknie",
    badge: (y) => `Święta ${y}`, badgeP: (y) => `Pamiątkowa bombka ze świąt ${y}: choinka ubrana wspólnie.`,
    says: ["Tu już czuć święta. Uwielbiam to.", "Coś ciepłego do picia i kocyk: idealnie.", "Dziś jest miękko jak w wełnianym swetrze.", "Święta są piękniejsze razem.", "Zrobimy dziś coś małego i dobrego dla ciebie?"],
    tree0: "Nasza choinka rośnie po kawałeczku.", tree1: "Popatrz na naszą choinkę: cała błyszczy!",
    sp: { d24: "Dziś Wigilia! Wieczorem dotrzymam ci towarzystwa.", d25: "Wesołych Świąt! Tak się cieszę, że spędzamy je razem.", d26: "Wciąż czuć święta: dziś nigdzie się nie spieszymy.", d31: "Ostatni dzień roku: dziękuję za każdy wspólny dzień.", d1: "Szczęśliwego Nowego Roku! Zaczynamy powoli, krok po kroku." },
    gr: { d24: "Spokojnej Wigilii", d25: "Wesołych Świąt", d1: "Szczęśliwego Nowego Roku" }, openL: "Choinka: zobacz kroki", added: (x) => `${x}: gotowe!` },
  nl: { treeT: "De kerstboom", treeP: (p, d) => `Laat hem samen met ${p} groeien, stap voor stap. Hij blijft tot ${d} in je kamer staan.`,
    stages: ["Klein dennetje", "Lichtjes", "Kerstballen", "", "Cadeautjes onder de boom"], tops: ["Ster in de top", "Sneeuwvlok in de top", "Gouden hart in de top"],
    step: (a, b) => `Stap ${a} van ${b}`, next: "Volgende stap", add: "Toevoegen", how: "Zo krijg je ze", plusB: "Plus −30%", plusP: "Met Tanetto Plus kost elke stap 30% minder.",
    doneT: "Je boom is klaar!", doneP: (p) => `${p} kan er niet genoeg van krijgen. Fijne feestdagen!`, sheetP: "Elk jaar maak je een nieuwe boom, met een andere piek. De herinneringsballen blijven in je profiel.",
    annT: "Kerst is aangekomen bij Tanetto", annP: (p, d) => `Tot ${d} is je huisje in feeststemming. En je kunt samen met ${p} de boom versieren: vijf stappen, één voor één, met de Tanì die je spaart.`,
    annSoon: "Zet elke dag een paar Tanì opzij: stap voor stap krijgt de boom vorm.", annGo: "Bekijk de boom", later: "Later",
    celebT: "Wat een prachtige boom!", celebP: (p) => `Jullie hebben hem samen afgemaakt. ${p} heeft een herinneringsbal in je profiel gehangen.`, celebB: "Wat mooi",
    badge: (y) => `Kerst ${y}`, badgeP: (y) => `Herinneringsbal van kerst ${y}: jullie hebben de boom samen afgemaakt.`,
    says: ["Het voelt hier al helemaal als feest. Heerlijk.", "Iets warms te drinken en een dekentje: perfect.", "Vandaag voelt zacht, als een wollen trui.", "De feestdagen zijn fijner samen.", "Zullen we vandaag iets kleins en liefs voor jou doen?"],
    tree0: "Onze boom groeit beetje bij beetje.", tree1: "Kijk eens naar onze boom: hij schittert helemaal!",
    sp: { d24: "Het is kerstavond! Vanavond houd ik je gezelschap.", d25: "Vrolijk kerstfeest! Wat fijn om het met jou te vieren.", d26: "Het voelt nog steeds als feest: vandaag doen we rustig aan.", d31: "De laatste dag van het jaar: dank je voor elke dag samen.", d1: "Gelukkig nieuwjaar! We beginnen rustig, stap voor stap." },
    gr: { d24: "Fijne kerstavond", d25: "Vrolijk kerstfeest", d1: "Gelukkig nieuwjaar" }, openL: "Kerstboom: bekijk de stappen", added: (x) => `${x}: gelukt!` },
  tr: { treeT: "Yılbaşı ağacı", treeP: (p, d) => `${p} ile birlikte adım adım süsle. ${d} tarihine kadar odanda kalacak.`,
    stages: ["Küçük çam", "Işıklar", "Süs topları", "", "Ağacın altındaki hediyeler"], tops: ["Tepede yıldız", "Tepede kar tanesi", "Tepede altın kalp"],
    step: (a, b) => `Adım ${a}/${b}`, next: "Sonraki adım", add: "Ekle", how: "Nasıl kazanılır", plusB: "Plus %30 indirim", plusP: "Tanetto Plus ile her adım %30 daha ucuz.",
    doneT: "Ağacın hazır!", doneP: (p) => `${p} gözünü ondan alamıyor. Mutlu yıllar!`, sheetP: "Her yıl farklı bir tepe süsüyle yeni bir ağaç yapılır. Hatıra süsleri profilinde kalır.",
    annT: "Tanetto'ya yılbaşı geldi", annP: (p, d) => `${d} tarihine kadar küçük evin bayram havasına bürünüyor. ${p} ile birlikte ağacı da süsleyebilirsin: beş adım, biriktirdiğin Tanì ile teker teker.`,
    annSoon: "Her gün biraz Tanì biriktir: adım adım ağaç şekillenecek.", annGo: "Ağaca bak", later: "Sonra",
    celebT: "Ne güzel bir ağaç!", celebP: (p) => `Birlikte bitirdiniz. ${p} profiline bir hatıra süsü astı.`, celebB: "Çok güzel",
    badge: (y) => `Yılbaşı ${y}`, badgeP: (y) => `${y} yılbaşı hatıra süsü: ağacı birlikte bitirdiniz.`,
    says: ["Burası şimdiden bayram gibi. Çok seviyorum.", "Sıcak bir içecek ve bir battaniye: mükemmel.", "Bugün yün bir kazak gibi yumuşacık bir gün.", "Tatiller birlikte daha güzel.", "Bugün kendin için küçük ve güzel bir şey yapalım mı?"],
    tree0: "Ağacımız azar azar büyüyor.", tree1: "Ağacımıza bak: her yeri ışıl ışıl!",
    sp: { d24: "Ne güzel bir kış akşamı! Bu akşam sana ben eşlik ederim.", d25: "Sıcacık bir kış günü! Seninle olmak çok güzel.", d26: "Hâlâ tatil havası var: bugün acele etmeyelim.", d31: "Yılın son günü: birlikte geçirdiğimiz her gün için teşekkürler.", d1: "Mutlu yıllar! Yavaş yavaş, adım adım başlayalım." },
    gr: { d24: "", d25: "", d31: "Yeni yıla az kaldı", d1: "Mutlu yıllar" }, openL: "Yılbaşı ağacı: adımları gör", added: (x) => `${x}: tamam!` }
};
const xmT = () => XM_T[S.lang] || XM_T.en;

/* --- Calendario --- */
/* dall'8/12 alle 0:00 al 6/1 compreso, con la data locale del telefono (come dkey) */
function xmOn(d = new Date()) { const m = d.getMonth(), g = d.getDate(); return (m === 11 && g >= 8) || (m === 0 && g <= 6); }
/* anno della stagione: dicembre 2026 e gennaio 2027 appartengono al Natale 2026 */
function xmYear(d = new Date()) { return d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear(); }
function xmSpecial(d = new Date()) { const m = d.getMonth(), g = d.getDate(); if (m === 11 && [24, 25, 26, 31].includes(g)) return "d" + g; if (m === 0 && g === 1) return "d1"; return null; }
const xmEndDay = () => fmtDay(new Date(xmYear() + 1, 0, 6));

/* --- Stato: S.v20xmas = { year, stage, done, ann, party } (vecchi salvataggi: valori sicuri) --- */
function xmState() {
  const y = xmYear(); let x = S.v20xmas;
  if (!x || typeof x !== "object") x = S.v20xmas = { year: y, stage: 0 };
  if (!Array.isArray(x.done)) x.done = [];
  if (x.year !== y) { if (xmOn()) { x.year = y; x.stage = 0; } } /* anno nuovo: albero nuovo (quello vecchio resta come pallina ricordo) */
  x.stage = Math.max(0, Math.min(5, Math.floor(+x.stage || 0)));
  return x;
}
const xmStage = () => { const x = xmState(); return x.year === xmYear() ? x.stage : 0; };
const xmPlus = () => { try { return typeof plusActive === "function" && !!plusActive(); } catch (e) { return false; } };
/* prezzo di una tappa (0..4): con Plus -30%, arrotondato a 5 */
/* arrotondamento a 5 "al pari" (come l'economia): 157,5 -> 160, 262,5 -> 260, 297,5 -> 300 => Plus [160, 210, 260, 300, 350] */
const xmRound5 = (v) => { const q = v / 5, f = Math.floor(q), d = q - f; const n = Math.abs(d - 0.5) < 1e-9 ? (f % 2 === 0 ? f : f + 1) : Math.round(q); return n * 5; };
function xmCost(i, plus = xmPlus()) { const c = XMAS_TREE_COST[i] || 0; return plus ? xmRound5(c * (1 - XMAS_PLUS_OFF)) : c; }
/* puntale: cambia ogni anno (stella, fiocco di neve, cuore d'oro) */
const xmTop = (y = xmYear()) => (((y - 2026) % 3) + 3) % 3;
const xmStageName = (i) => (i === 3 ? xmT().tops[xmTop()] : xmT().stages[i]);
const xmLite = () => (typeof liteOn === "function" ? liteOn() : typeof isLite === "function" ? isLite() : false) || !!S.calm;

/* --- Disegni --- */
const XM_CX = 276;
function xmQ(a, c, b, t) { const u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; }
const XM_WARM = ["#FFD978", "#FFB765", "#FFF1C2", "#FF9F7A"];
function xmTopper(k, x, y) {
  if (k === 1) return `<g stroke="#E8B64C" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M${x} ${y - 9}V${y + 9}M${x - 7.8} ${y - 4.5}L${x + 7.8} ${y + 4.5}M${x - 7.8} ${y + 4.5}L${x + 7.8} ${y - 4.5}"/><path d="M${x - 2.6} ${y - 7}l2.6 2.2 2.6-2.2M${x - 2.6} ${y + 7}l2.6-2.2 2.6 2.2" stroke-width="1.5"/></g><circle cx="${x}" cy="${y}" r="2" fill="#FFF1C2"/>`;
  if (k === 2) return `<path d="M${x} ${y + 8} C${x - 12} ${y} ${x - 9} ${y - 10} ${x} ${y - 4} C${x + 9} ${y - 10} ${x + 12} ${y} ${x} ${y + 8} Z" fill="#F2C14E" stroke="#C9962E" stroke-width="1.2" stroke-linejoin="round"/><path d="M${x - 5} ${y - 3} q2 -3 4 -1" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/>`;
  let d = ""; for (let i = 0; i < 10; i++) { const r = i % 2 ? 4.2 : 10, a = -Math.PI / 2 + (i * Math.PI) / 5; d += `${i ? "L" : "M"}${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`; }
  return `<path d="${d}Z" fill="#F2C14E" stroke="#C9962E" stroke-width="1.2" stroke-linejoin="round"/><path d="M${x - 2} ${y - 3} l1.4 -3" stroke="#fff" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>`;
}
function xmBauble(x, y, r, c) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><rect x="${x - 1.1}" y="${y - r - 1.6}" width="2.2" height="2" rx=".5" fill="#C9962E"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff" opacity=".65"/>`; }
/* Albero nella stanza (coordinate della stanza 360x300): st = tappe fatte (1..5), lit = sera/notte/luce spenta */
function xmTree(st, o = {}) {
  if (st < 1) return "";
  const cx = XM_CX; const lit = !!o.lit; let s = `<g class="xmtree">`;
  s += `<ellipse cx="${cx + 2}" cy="255" rx="36" ry="5.5" fill="#3A2510" opacity=".16"/>`;
  s += `<rect x="${cx - 5}" y="226" width="10" height="13" rx="2" fill="#6B4A2E"/>`;
  const tier = (top, bot, hw) => { const p = `M${cx} ${top} L${cx + hw} ${bot} Q${cx + hw / 2} ${bot + 5} ${cx} ${bot} Q${cx - hw / 2} ${bot + 5} ${cx - hw} ${bot} Z`;
    return `<path d="${p}" fill="#2E6A47" stroke="#2E6A47" stroke-width="2.4" stroke-linejoin="round"/><path d="M${cx} ${top + 1} L${cx + hw} ${bot} Q${cx + hw / 2} ${bot + 5} ${cx} ${bot} Z" fill="#1E4A32" opacity=".38"/><path d="M${cx - 2} ${top + 6} L${cx - hw + 6} ${bot - 2}" stroke="#4E9A68" stroke-width="2" stroke-linecap="round" opacity=".55"/>`; };
  s += tier(174, 230, 38) + tier(154, 200, 29) + tier(138, 172, 20);
  /* vaso */
  s += `<path d="M259 236 L293 236 L289 254 Q276 257 263 254 Z" fill="#A63D3A"/><rect x="256" y="232" width="40" height="6" rx="3" fill="#8C3330"/><rect x="260" y="244" width="32" height="2.4" rx="1.2" fill="#E2B24E" opacity=".9"/>`;
  if (st >= 2) {
    const gb = lit ? nid("xb") : ""; if (lit) s += `<defs><radialGradient id="${gb}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFE6A8" stop-opacity=".95"/><stop offset=".45" stop-color="#FFD27A" stop-opacity=".45"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient></defs>`;
    const W = [[[265, 159], [276, 168], [288, 160], 3], [[259, 186], [276, 197], [294, 184], 4], [[255, 211], [276, 224], [298, 209], 5]];
    let k = 0;
    W.forEach(([a, c, b, n]) => {
      s += `<path d="M${a[0]} ${a[1]} Q${c[0]} ${c[1]} ${b[0]} ${b[1]}" stroke="#4A3B2A" stroke-width="1" fill="none" opacity=".55"/>`;
      for (let i = 0; i < n; i++) { const [x, y] = xmQ(a, c, b, (i + 0.5) / n); const col = XM_WARM[k % 4];
        s += (lit ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.5" fill="url(#${gb})"/>` : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="${col}" opacity=".16"/>`) + `<circle ${k % 2 ? 'class="bulb" ' : ""}cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.3" fill="${col}"/>`; k++; }
    });
  }
  if (st >= 3) {
    [[266, 166, "#C8343C"], [287, 176, "#E2B04A"], [259, 197, "#E2B04A"], [292, 191, "#C8343C"], [276, 186, "#F4EBDD"], [253, 221, "#C8343C"], [269, 214, "#E2B04A"], [299, 223, "#C8343C"], [285, 211, "#F4EBDD"], [306, 214, "#E2B04A"]].forEach(([x, y, c]) => { s += xmBauble(x, y, 3.5, c); });
    /* palline ricordo degli anni passati */
    const past = (o.past || []).slice(-3); [[279, 200], [262, 182], [294, 205]].slice(0, past.length).forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="4.4" fill="#E2B04A"/><circle cx="${x}" cy="${y}" r="3.2" fill="#8E2430"/><path d="M${x} ${y - 1.8} l.6 1.2 1.3 .2 -1 .9 .3 1.3 -1.2 -.7 -1.2 .7 .3 -1.3 -1 -.9 1.3 -.2Z" fill="#F2C14E"/><rect x="${x - 1.1}" y="${y - 6}" width="2.2" height="2" rx=".5" fill="#C9962E"/>`; });
  }
  if (st >= 4) s += `<circle cx="${cx}" cy="134" r="${lit ? 18 : 13}" fill="#FFE7A0" opacity="${lit ? 0.5 : 0.4}"/>` + xmTopper(o.top != null ? o.top : xmTop(), cx, 134);
  if (st >= 5) {
    s += `<ellipse cx="276" cy="256" rx="40" ry="4" fill="#3A2510" opacity=".12"/>`;
    s += `<rect x="239" y="239" width="21" height="16" rx="2" fill="#B3333B"/><rect x="237.5" y="235.5" width="24" height="5" rx="1.5" fill="#C9434A"/><rect x="248" y="235.5" width="3" height="19.5" fill="#F2C14E"/><ellipse cx="246.5" cy="234.2" rx="3" ry="1.8" fill="#F2C14E" transform="rotate(-20 246.5 234.2)"/><ellipse cx="252.5" cy="234.2" rx="3" ry="1.8" fill="#F2C14E" transform="rotate(20 252.5 234.2)"/>`;
    s += `<rect x="292" y="242" width="19" height="13" rx="2" fill="#2F7A55"/><rect x="290.5" y="238.5" width="22" height="4.5" rx="1.5" fill="#3A8C63"/><rect x="300" y="238.5" width="3" height="16.5" fill="#E9DCC4"/><ellipse cx="298.5" cy="237.6" rx="2.8" ry="1.6" fill="#E9DCC4" transform="rotate(-20 298.5 237.6)"/><ellipse cx="304.5" cy="237.6" rx="2.8" ry="1.6" fill="#E9DCC4" transform="rotate(20 304.5 237.6)"/>`;
    s += `<rect x="268" y="246" width="15" height="10" rx="1.6" fill="#F2E6CF"/><rect x="274" y="246" width="3" height="10" fill="#C8343C"/><rect x="268" y="249.5" width="15" height="2.4" fill="#C8343C"/><circle cx="275.5" cy="245.5" r="1.8" fill="#C8343C"/>`;
  }
  return s + `</g>`;
}
/* Albero da solo (schede): 0 = sagoma tratteggiata da riempire */
function xmTreeArt(st, label, o = {}) {
  const lab = label ? `role="img" aria-label="${esc(label)}"` : `aria-hidden="true"`;
  if (st < 1) return `<svg viewBox="226 118 100 142" ${lab}><g fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4" stroke-linejoin="round" opacity=".45"><path d="M276 138 L296 172 L256 172 Z M276 154 L305 200 L247 200 Z M276 174 L314 230 L238 230 Z"/><path d="M259 236 L293 236 L289 254 L263 254 Z"/></g></svg>`;
  return `<svg viewBox="226 118 100 142" ${lab}>${xmTree(st, { lit: !!o.lit, past: o.past || [] })}</svg>`;
}
/* Pallina ricordo (profilo, festa) */
function xmOrnament(y) {
  const k = xmTop(y);
  return `<svg viewBox="0 0 60 66" aria-hidden="true"><path d="M30 2 V10" stroke="#C9962E" stroke-width="1.6"/><rect x="25" y="9" width="10" height="6" rx="1.5" fill="#C9962E"/><circle cx="30" cy="40" r="24" fill="#8E2430"/><circle cx="30" cy="40" r="24" fill="none" stroke="#E2B04A" stroke-width="2.4"/><path d="M8 36 Q30 46 52 36" stroke="#E2B04A" stroke-width="1.6" fill="none" opacity=".8"/><path d="M9 46 Q30 56 51 46" stroke="#E2B04A" stroke-width="1.2" fill="none" opacity=".6"/><g transform="translate(0 -6)">${xmTopper(k, 30, 40)}</g><circle cx="21" cy="30" r="4" fill="#fff" opacity=".35"/></svg>`;
}
/* Icone piccole delle tappe */
const XM_GLYPH = [
  `<path d="M12 3 L18 12 L15 12 L19 18 L5 18 L9 12 L6 12 Z" fill="#2E6A47"/><rect x="10.5" y="18" width="3" height="3" fill="#6B4A2E"/>`,
  `<path d="M3 8 Q12 14 21 8" stroke="#6B5A47" stroke-width="1.2" fill="none"/><circle cx="6" cy="10.4" r="2.4" fill="#FFB765"/><circle cx="12" cy="11.6" r="2.4" fill="#FFD978"/><circle cx="18" cy="10.4" r="2.4" fill="#FF9F7A"/>`,
  `<rect x="10.6" y="4" width="2.8" height="3" rx=".6" fill="#C9962E"/><circle cx="12" cy="13" r="6.5" fill="#C8343C"/><circle cx="9.6" cy="10.6" r="1.8" fill="#fff" opacity=".6"/>`,
  null,
  `<rect x="4" y="10" width="16" height="10" rx="1.6" fill="#B3333B"/><rect x="3" y="7.5" width="18" height="4" rx="1.2" fill="#C9434A"/><rect x="10.7" y="7.5" width="2.6" height="12.5" fill="#F2C14E"/><ellipse cx="9.6" cy="6.6" rx="2.6" ry="1.6" fill="#F2C14E"/><ellipse cx="14.4" cy="6.6" rx="2.6" ry="1.6" fill="#F2C14E"/>`
];
const xmGlyph = (i) => `<svg viewBox="0 0 24 24" aria-hidden="true">${i === 3 ? xmTopper(xmTop(), 12, 12.5) : XM_GLYPH[i]}</svg>`;

/* Decorazioni della stanza: ghirlanda sulla tenda, coroncina alla finestra, lucine calde sulla parete */
function xmGarland(lit) {
  let s = `<g class="xmgar"><path d="M13 27 Q50 46 86 29 Q122 46 159 27" stroke="#24563A" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M13 27 Q50 46 86 29 Q122 46 159 27" stroke="#3F8A5A" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-dasharray="3 4"/>`;
  [[28, 33.5], [46, 37], [64, 35], [108, 35], [126, 37], [144, 33.5]].forEach(([x, y], i) => { s += i % 2 ? `<circle cx="${x}" cy="${y}" r="2.1" fill="#C8343C"/><circle cx="${x + 2.6}" cy="${y + 1}" r="1.7" fill="#B02A33"/>` : `<circle cx="${x}" cy="${y}" r="1.7" fill="#E8B64C"/>`; });
  const bow = (x, y) => `<path d="M${x} ${y} C${x - 9} ${y - 7} ${x - 10} ${y + 5} ${x} ${y} C${x + 10} ${y + 5} ${x + 9} ${y - 7} ${x} ${y} Z" fill="#C8343C"/><path d="M${x - 1} ${y + 1} L${x - 4} ${y + 10} M${x + 1} ${y + 1} L${x + 4} ${y + 10}" stroke="#B02A33" stroke-width="2.2" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="2" fill="#E04A50"/>`;
  s += bow(16, 28) + bow(156, 28);
  /* coroncina appesa al centro della finestra */
  s += `<path d="M86 30 V49" stroke="#B3333B" stroke-width="1.6"/><circle cx="86" cy="60" r="10.5" fill="none" stroke="#24563A" stroke-width="6.5"/><circle cx="86" cy="60" r="10.5" fill="none" stroke="#4E9A68" stroke-width="2" stroke-dasharray="2 3.2"/>`;
  [[78, 55], [94, 56], [80, 66.5]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="1.7" fill="#C8343C"/>`; });
  s += `<path d="M86 69 C80 64 78 72 86 69 C94 72 92 64 86 69 Z" fill="#C8343C"/><path d="M85 70 L83 76 M87 70 L89 76" stroke="#B02A33" stroke-width="1.8" stroke-linecap="round"/>`;
  if (lit) s += `<circle cx="86" cy="60" r="16" fill="#FFE3A3" opacity=".12"/>`;
  return s + `</g>`;
}
function xmWallLights(lit) {
  let s = `<g class="xmwl"><path d="M168 12 Q213 31 258 12 Q303 31 348 12" stroke="#6B5A47" stroke-width="1.3" fill="none"/>`; let k = 0;
  [[[168, 12], [213, 31], [258, 12]], [[258, 12], [303, 31], [348, 12]]].forEach(([a, c, b]) => {
    for (let t = 0.12; t < 0.95; t += 0.19) { const [x, y] = xmQ(a, c, b, t); const col = XM_WARM[k % 4];
      s += `<circle cx="${x.toFixed(1)}" cy="${(y + 3).toFixed(1)}" r="${lit ? 9 : 5.5}" fill="${col}" opacity="${lit ? 0.3 : 0.22}"/><rect x="${(x - 1).toFixed(1)}" y="${(y - 0.5).toFixed(1)}" width="2" height="2" fill="#6B5A47"/><circle ${k % 2 ? 'class="bulb" ' : ""}cx="${x.toFixed(1)}" cy="${(y + 3).toFixed(1)}" r="3" fill="${col}"/>`; k++; }
  });
  return s + `</g>`;
}

/* --- Stanza: le decorazioni si aggiungono sopra agli strati esistenti --- */
let xmRoomCtx = null; const XM_PH = "<!--xmtree-->";
const xmRoomCtx_past = (x) => (x ? x.done.filter((y) => y < xmYear()) : []);
const _furnAltXm = furnAlt;
furnAlt = function (slot, furn, lit, lampId) {
  let o = _furnAltXm(slot, furn, lit, lampId);
  /* segnaposto dell'albero: dopo tappeto, lampada e oggetti a sinistra, prima di peluche, chitarra e pianta */
  if (slot === "floorL" && xmRoomCtx && xmRoomCtx.tree && !xmRoomCtx.placed) { o += XM_PH + "<!--xmat-->"; xmRoomCtx.placed = true; }
  return o;
};
const _roomSVGxm = roomSVG;
roomSVG = function (opts) {
  if (!opts || !xmOn()) return _roomSVGxm(opts);
  const lit = opts.ph === "night" || opts.ph === "evening" || !!opts.dark;
  const x = S.pet ? xmState() : null; const st = x ? xmStage() : 0;
  const prev = xmRoomCtx; xmRoomCtx = { tree: st, lit, placed: false };
  let o;
  try { o = _roomSVGxm(opts); } finally { xmRoomCtx = prev; }
  if (typeof o !== "string") return o;
  if (o.indexOf(XM_PH) >= 0) {
    const tree = xmTree(st, { lit, past: xmRoomCtx_past(x) }); o = o.replace(XM_PH, "");
    /* oggetti spostabili (98a): stanno tutti insieme al primo posto "pavimento"; l'albero va subito prima di loro,
       cosi' resta dietro a pianta, peluche e lampada anche quando vengono spostati */
    const anc = o.indexOf('<g class="mvanchor">'); let at = -1;
    if (anc >= 0) { const m = /<g class="mv" data-mv="[^"]*" data-slot="(?:floorL|floorR|plant|lamp)"/.exec(o); at = m && m.index < anc ? m.index : anc; }
    if (at < 0) { const pw = o.indexOf("<!--xmat-->"); at = pw; }
    o = at >= 0 ? o.slice(0, at) + tree + o.slice(at) : o.replace("<!--xmat-->", tree);
  }
  o = o.replace("<!--xmat-->", "");
  const rod = '<circle cx="156" cy="28" r="5" fill="#8E6440"/>'; const ri = o.indexOf(rod);
  if (ri < 0) return o; /* scena diversa (festa delle lanterne, ecc.): niente decorazioni */
  const hasLights = (opts.furn || []).includes("lights");
  let deco = xmGarland(lit) + (hasLights ? "" : xmWallLights(lit));
  o = o.slice(0, ri + rod.length) + deco + o.slice(ri + rod.length);
  /* lucine già in stanza: diventano calde */
  if (hasLights) { let k = 0; o = o.replace(/(<circle class="bulb" cx="[\d.]+" cy="[\d.]+" r="4" fill=")(#[0-9A-Fa-f]{6})("\/>)(<circle cx="[\d.]+" cy="[\d.]+" r="10" fill=")?(#[0-9A-Fa-f]{6})?/g, (m, a, c, b, g1) => { const w = XM_WARM[k++ % 4]; return a + w + b + (g1 ? g1 + w : ""); }); }
  /* di sera / a luce spenta le lucine dell'albero brillano sopra al buio */
  if (lit && st >= 2) {
    const gid = nid("xg"); let gl = `<defs><radialGradient id="${gid}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFD98A" stop-opacity=".55"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient></defs><g class="xmglow" pointer-events="none"><circle cx="${XM_CX}" cy="190" r="${opts.dark ? 58 : 48}" fill="url(#${gid})"/>`;
    if (opts.dark) { const W = [[[265, 159], [276, 168], [288, 160], 3], [[259, 186], [276, 197], [294, 184], 4], [[255, 211], [276, 224], [298, 209], 5]]; let k = 0; W.forEach(([a, c, b, n]) => { for (let i = 0; i < n; i++) { const [px, py] = xmQ(a, c, b, (i + 0.5) / n); gl += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="1.9" fill="${XM_WARM[k++ % 4]}"/>`; } }); }
    gl += `</g>`; const i = o.lastIndexOf("</svg>"); if (i > 0) o = o.slice(0, i) + gl + o.slice(i);
  }
  return o;
};
/* "Ti mancano X Tanì": la scheda esistente mostra l'albero */
const _itemArtXm = itemArt;
itemArt = function (id) { if (id === "v20_xtree") return xmTreeArt(Math.min(5, xmStage() + 1), ""); return _itemArtXm(id); };

/* --- Pulsanti sopra la stanza: toccare l'albero apre le tappe --- */
const _roomBlockXm = roomBlock;
roomBlock = function () {
  let h = _roomBlockXm(); if (!xmOn() || !S.pet || S.away || typeof h !== "string") return h;
  const fs = typeof full !== "undefined" && full;
  let add = "";
  const arr = typeof V20T !== "undefined" && V20T && V20T.arr; /* mentre si spostano gli oggetti (98a) l'albero non si tocca */
  if (h.indexOf('class="xmtree"') >= 0 && !arr) {
    const pos = fs && typeof pct === "function" ? pct(248, 132, 56, 96) : "left:68.9%;top:44%;width:15.6%;height:32%";
    add += `<button class="xmtreehit" id="xmTreeHit" type="button" style="${pos}" aria-label="${esc(xmT().openL)}"></button>`;
  }
  if (/class="room [^"]*scene-(?:garden|terrace|camp)\b/.test(h) && anim && !xmLite()) add += xmSnowHTML(12, "xmsnow xmin");
  if (!add) return h;
  const r0 = h.indexOf('id="room"'); const i = r0 < 0 ? -1 : h.indexOf("</svg>", r0);
  return i < 0 ? h : h.slice(0, i + 6) + add + h.slice(i + 6);
};

/* --- Il compagno: frasi di festa (speciali il 24, 25, 26, 31 dicembre e 1 gennaio) --- */
const _defaultSayXm = defaultSay;
defaultSay = function () {
  const b = _defaultSayXm();
  if (!xmOn() || !S.pet || S.away || S.lightsOff || S.energy >= 100) return b;
  const t = xmT(); const sp = xmSpecial(); if (sp) return t.sp[sp];
  const d = new Date(); if ((d.getDate() + d.getHours()) % 3 !== 0) return b;
  const st = xmStage(); const pool = t.says.concat(st >= 5 ? [t.tree1] : st >= 1 ? [t.tree0] : []);
  return pool[(d.getDate() * 7 + d.getHours()) % pool.length];
};
/* Il saluto in alto: "Buon Natale" il 25, "Buona Vigilia" il 24, "Buon anno" l'1 */
const _greetLineXm = greetLine;
greetLine = function () {
  const h = _greetLineXm(); const sp = xmSpecial(); const g2 = sp && xmT().gr[sp]; if (!g2 || !xmOn()) return h;
  const g = L().greet && L().greet[phase()]; if (!g) return h;
  return h.replace(/(<span class="gw">)([\s\S]*?)(<\/span>)/, (m, a, inner, c) => a + inner.replace(esc(g), esc(g2)) + c);
};

/* --- Tema: attributo sulla pagina (colori in 11d_v20_xmas.css) --- */
const _applyRootXm = applyRoot;
applyRoot = function () {
  _applyRootXm(); const r = document.documentElement;
  if (xmOn()) r.setAttribute("data-xmas", "1"); else r.removeAttribute("data-xmas");
};

/* --- Neve leggera: solo CSS (gira sulla scheda grafica), dietro alle schede, al massimo 22 fiocchi --- */
function xmSnowHTML(n, cls) {
  let s = `<div class="${cls}" aria-hidden="true">`;
  for (let i = 0; i < n; i++) {
    const R = (k) => (((i + 1) * 9301 + k * 49297) % 233280) / 233280;
    const sz = (2.5 + R(1) * 3).toFixed(1), x = (R(2) * 100).toFixed(1), d = (11 + R(3) * 10).toFixed(1), dl = (-R(4) * 20).toFixed(1), sw = ((R(5) - 0.5) * 60).toFixed(0), op = (0.5 + R(6) * 0.35).toFixed(2);
    s += `<i style="--x:${x}%;--s:${sz}px;--d:${d}s;--dl:${dl}s;--sw:${sw}px;--o:${op}"></i>`;
  }
  return s + `</div>`;
}
function xmSnowSync() {
  const want = xmOn() && anim && !xmLite();
  let el = document.getElementById("xmSnow");
  if (!want) { if (el) el.remove(); return; }
  if (!el) { const tpl = document.createElement("template"); tpl.innerHTML = xmSnowHTML(22, "xmsnow xmpage"); el = tpl.content.firstElementChild; el.id = "xmSnow"; document.body.appendChild(el); }
  el.classList.toggle("xmpause", document.visibilityState === "hidden");
}
document.addEventListener("visibilitychange", () => { document.querySelectorAll(".xmsnow").forEach((e) => e.classList.toggle("xmpause", document.visibilityState === "hidden")); });

/* --- La scheda dell'albero (Oggi) --- */
function xmPriceHTML(i) {
  const c = xmCost(i); const plus = xmPlus(); const base = XMAS_TREE_COST[i];
  return `<span class="xmprice">${SEED}${plus && c !== base ? `<s>${base}</s>` : ""}<b>${c}</b></span>`;
}
function xmBuyBlock(where) {
  const t = xmT(); const st = xmStage(); if (st >= 5) return "";
  const c = xmCost(st); const miss = c - S.seeds; const plus = xmPlus();
  return `<div class="xmbuy"><button class="btn xmbtn" type="button" data-xmbuy="${where}" ${miss > 0 ? "disabled" : ""}><span>${esc(t.add)}</span>${xmPriceHTML(st)}</button>
    ${plus && where !== "sheet" ? `<span class="xmplus">${icon("p_crown")}${esc(t.plusB)}</span>` : ""}
    ${miss > 0 ? `<p class="small xmmiss">${SEED}<span>${esc(v19s().needT(miss.toLocaleString(loc(), NUMG)))}</span><button class="link small" type="button" data-xmhow="1">${esc(t.how)}</button></p>` : ""}</div>`;
}
function xmBar(st) { return `<span class="xmbar" role="progressbar" aria-label="${esc(xmT().treeT)}" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${st}">${[0, 1, 2, 3, 4].map((i) => `<i class="${i < st ? "on" : ""}"></i>`).join("")}</span>`; }
function xmCard() {
  const t = xmT(); const x = xmState(); const st = xmStage();
  if (st >= 5) return `<div class="card xmcard xmdone"><button class="xmart" type="button" data-xmopen="1" aria-label="${esc(t.openL)}">${xmTreeArt(5, "", { past: x.done.filter((y) => y < xmYear()) })}</button><div class="xmtx"><h3>${esc(t.doneT)}</h3><p class="small muted">${esc(t.doneP(S.petName))}</p></div></div>`;
  return `<div class="card xmcard" id="xmCard"><div class="xmtop"><button class="xmart" type="button" data-xmopen="1" aria-label="${esc(t.openL)}">${xmTreeArt(st, "", { past: x.done.filter((y) => y < xmYear()) })}</button>
    <div class="xmtx"><h3>${esc(t.treeT)}</h3><p class="small muted">${esc(t.treeP(S.petName, xmEndDay()))}</p>
    <div class="xmprog">${xmBar(st)}<span class="small xmstep">${esc(t.step(st, 5))}</span></div>
    <p class="xmnext"><span class="xmg">${xmGlyph(st)}</span><span><small>${esc(t.next)}</small><b>${esc(xmStageName(st))}</b></span></p></div></div>
    ${xmBuyBlock("card")}</div>`;
}
const _viewTodayXm = viewToday;
viewToday = function () {
  const h = _viewTodayXm(); if (!S.pet || !xmOn() || typeof h !== "string") return h;
  const card = xmCard();
  if (xmStage() < 5) {
    /* subito dopo gli obiettivi (e la riga "Modifica gli obiettivi") */
    const g = h.indexOf('<ul class="goals"'); const from = g >= 0 ? g : h.indexOf('<div class="sec">');
    if (from >= 0) { const re = /<div class="row">(?:(?!<div)[\s\S])*?<\/div>/g; re.lastIndex = from; const m = re.exec(h); if (m) return h.slice(0, m.index + m[0].length) + card + h.slice(m.index + m[0].length); }
  }
  const n = h.lastIndexOf('<p class="note'); return n >= 0 ? h.slice(0, n) + card + h.slice(n) : h;
};

/* --- Il foglio con tutte le tappe --- */
function xmSheet() {
  const t = xmT(); const x = xmState(); const st = xmStage(); const plus = xmPlus();
  const rows = [0, 1, 2, 3, 4].map((i) => { const done = i < st, nx = i === st;
    return `<li class="${done ? "done" : ""} ${nx ? "next" : ""}"><span class="xmg">${xmGlyph(i)}</span><span class="xmrn">${esc(xmStageName(i))}</span>${done ? `<span class="xmok">${icon("check")}</span>` : `<span class="xmrp">${SEED}${plus ? `<s>${XMAS_TREE_COST[i]}</s>` : ""}<b>${xmCost(i)}</b></span>`}</li>`; }).join("");
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="xmsT"><div class="sheet xmsheet"><div class="grab"></div>
    <div class="xmbig">${xmTreeArt(st, "", { past: x.done.filter((y) => y < xmYear()) })}</div>
    <h2 id="xmsT">${esc(st >= 5 ? t.doneT : t.treeT)}</h2><p class="small muted">${esc(st >= 5 ? t.doneP(S.petName) : t.treeP(S.petName, xmEndDay()))}</p>
    <div class="xmprog c">${xmBar(st)}<span class="small xmstep">${esc(t.step(st, 5))}</span></div>
    <ol class="xmlist">${rows}</ol>
    ${plus ? `<p class="small xmplusp">${icon("p_crown")} ${esc(t.plusP)}</p>` : `<button class="btn ghost small xmplusgo" id="xmPlusGo" type="button">${icon("p_crown")} ${esc(t.plusP)}</button>`}
    ${xmBuyBlock("sheet")}
    <p class="small muted xmyear">${esc(t.sheetP)}</p>
    <button class="btn ghost" id="closeLayer" type="button">${esc(L().close)}</button></div></div>`;
  SND.play("click");
  if (anim && G) G.from(".xmsheet", { y: 40, opacity: 0, duration: 0.3, ease: "power2.out" });
}
function xmHow() {
  const st = xmStage(); if (st >= 5) return;
  const t = xmT(); try { L().items.v20_xtree = xmStageName(st); } catch (e) { /* niente */ }
  if (typeof needSheet === "function") needSheet({ id: "v20_xtree", price: xmCost(st) }); else if (typeof openTaniShop === "function") openTaniShop("albero");
  void t;
}
let xmBuyAt = 0;
function xmBuy(where) {
  if (!xmOn() || !S.pet) return;
  if (Date.now() - xmBuyAt < 500) return; xmBuyAt = Date.now(); /* 1.0.8: un doppio tocco veloce non compra due tappe */
  const x = xmState(); const st = xmStage(); if (st >= 5) return;
  const c = xmCost(st); if (S.seeds < c) { xmHow(); return; }
  S.seeds -= c; x.year = xmYear(); x.stage = st + 1;
  const done = x.stage >= 5; if (done && !x.done.includes(x.year)) x.done.push(x.year);
  save(); SND.play(done ? "fanfare" : "buy"); if (SND.haptic) SND.haptic([15, 40, 25]);
  try { trackOnce(`natale-tappa-${x.stage}`); } catch (e) { /* niente */ }
  if (where === "sheet" && !done) { render(); xmSheet(); }
  else { if (layer.querySelector(".xmsheet")) closeLayer(); render(); }
  if (done) { setTimeout(xmCelebrate, anim ? 450 : 50); return; }
  toast(xmT().added(xmStageName(st)));
  setTimeout(() => { if (typeof burst === "function" && document.getElementById("fx")) burst("star", 8); }, 120);
}
/* --- Festa per l'albero finito (una volta per anno) e pallina ricordo --- */
function xmCelebrate() {
  const x = xmState(); if (x.party === x.year) return; x.party = x.year; save();
  const t = xmT();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="xcT"><div class="box card xmcel"><div class="fx" id="xmFx"></div><div class="xmrays" aria-hidden="true"></div>
    <div class="xmcelart">${xmTreeArt(5, "", { past: x.done.filter((y) => y < x.year) })}</div>
    <h2 id="xcT">${esc(t.celebT)}</h2><p>${esc(t.celebP(S.petName))}</p>
    <div class="xmkeep"><span class="xmorn">${xmOrnament(x.year)}</span><b>${esc(t.badge(x.year))}</b></div>
    <button class="btn" id="closeLayer" type="button">${esc(t.celebB)}</button></div></div>`;
  SND.play("fanfare");
  if (anim && G) { G.from(".xmcel", { scale: 0.85, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }); G.from(".xmorn", { y: -30, rotation: -20, duration: 1, delay: 0.4, ease: "elastic.out(1, .5)" }); const fx = document.getElementById("xmFx"); setTimeout(() => burst("confetti", 26, fx), 250); }
}
function xmKeepsake(y) {
  const t = xmT();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="xkT"><div class="box card xmcel"><div class="xmorn big">${xmOrnament(y)}</div><h2 id="xkT">${esc(t.badge(y))}</h2><p>${esc(t.badgeP(y))}</p><button class="btn" id="closeLayer" type="button">${esc(L().close)}</button></div></div>`;
  SND.play("sparkle"); if (anim && G) G.from(".xmorn", { y: -24, rotation: 14, duration: 0.9, ease: "elastic.out(1, .5)" });
}
/* Profilo (Altro): palline ricordo degli alberi finiti */
const _viewMoreXm = viewMore;
viewMore = function () {
  const h = _viewMoreXm(); const x = S.v20xmas; if (!S.pet || !x || !Array.isArray(x.done) || !x.done.length || typeof h !== "string") return h;
  const k = h.indexOf('<div class="pfbtns">'); if (k < 0) return h;
  const b = x.done.slice().sort().map((y) => `<button class="pfb pfxm" type="button" data-xmkeep="${y}"><span class="xmorn sm">${xmOrnament(y)}</span><span>${esc(xmT().badge(y))}</span></button>`).join("");
  const at = k + '<div class="pfbtns">'.length; return h.slice(0, at) + b + h.slice(at);
};

/* --- Annuncio, una volta per stagione, il primo giorno in cui si apre l'app --- */
function xmAnnounce() {
  xmAnnT = 0;
  if (!xmOn() || !S.pet || S.away || tab !== "today" || layer.innerHTML || S.tut < 99 || (typeof full !== "undefined" && full) || (typeof tutOn !== "undefined" && tutOn)) return;
  const x = xmState(); if (x.ann === x.year) return; x.ann = x.year; save();
  const t = xmT(); const d = new Date(); const soon = xmStage() < 5; void d;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="xaT"><div class="box card xmann"><div class="xmannart">${xmTreeArt(5, "")}</div>
    <h2 id="xaT">${esc(t.annT)}</h2><p>${esc(t.annP(S.petName, xmEndDay()))}</p>${soon ? `<p class="small muted">${esc(t.annSoon)}</p>` : ""}
    <div class="row xmannrow"><button class="btn" id="xmAnnGo" type="button">${esc(t.annGo)}</button><button class="btn ghost" id="closeLayer" type="button">${esc(t.later)}</button></div></div></div>`;
  SND.play("jingle");
  if (anim && G) G.from(".xmann", { scale: 0.88, opacity: 0, duration: 0.45, ease: "back.out(1.8)" });
}
let xmAnnT = 0;
const _renderXm = render;
render = function () {
  _renderXm(); xmSnowSync();
  if (xmOn() && S.pet && !xmAnnT) { const x = S.v20xmas; if (!x || x.ann !== xmYear()) xmAnnT = setTimeout(xmAnnounce, 2600); }
};
/* l'app resta aperta a mezzanotte (7 gennaio / 8 dicembre): il tema si accende o si spegne al ritorno */
document.addEventListener("visibilitychange", () => { if (document.visibilityState !== "visible") return; const on = document.documentElement.hasAttribute("data-xmas"); if (on !== xmOn() && S.pet && !layer.innerHTML) render(); });

/* --- Tocchi --- */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.dataset.xmbuy) { ev.stopImmediatePropagation(); if (!b.disabled) xmBuy(b.dataset.xmbuy); return; }
  if (b.dataset.xmhow) { ev.stopImmediatePropagation(); if (layer.querySelector(".xmsheet")) fadeLayer(); setTimeout(xmHow, 30); return; }
  if (b.dataset.xmopen || b.id === "xmTreeHit") { ev.stopImmediatePropagation(); xmSheet(); return; }
  if (b.dataset.xmkeep) { ev.stopImmediatePropagation(); xmKeepsake(+b.dataset.xmkeep); return; }
  if (b.id === "xmAnnGo") { ev.stopImmediatePropagation(); fadeLayer(); if (tab !== "today") { tab = "today"; render(); } setTimeout(xmSheet, 80); return; }
}, true);

/* 1.0.8: chi non ha Plus vede (una volta, nel foglio dell'albero) che con Plus le tappe costano meno, e puo' aprire la pagina di Plus */
document.addEventListener("click", (ev) => {
  const b = ev.target && ev.target.closest && ev.target.closest("#xmPlusGo"); if (!b) return;
  ev.preventDefault(); try { closeLayer(); } catch (e) { /* niente */ }
  setTimeout(() => { try { openPlus("albero"); } catch (e) { /* niente */ } }, 120);
});
