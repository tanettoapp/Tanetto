/* =================== v20 (1.0.8): guardaroba — collo e viso, cappelli nuovi, regalo di benvenuto, cibo preferito da scoprire =================== */
/* Tutto in un file: si aggancia avvolgendo petInner, itemArt, viewHome, lookWith, inUseItem, applyItem, openFeed, feedSnack, chatReply.
   Stato nuovo: S.v20wear = { neck, face, gift, seen }  ·  S.v20food = { disc: {pet: giorno}, tries: {pet: n}, mig } */

/* ---------- Testi (14 lingue) ---------- */
const W20T = {
  it: {
    gOnly: "Regalo di benvenuto",
    sub: { hat: "Cappelli", neck: "Al collo", face: "Sul viso" },
    items: { h_bucket: "Cappello da pescatore", h_cap: "Berretto con visiera", h_tophat: "Cilindro elegante", h_unicorn: "Corno di unicorno", n_bowtie: "Papillon a pois", n_bandana: "Bandana", n_scarf: "Sciarpa di lana", n_lei: "Collana di fiori", n_cape: "Mantello da eroe", n_starcape: "Mantello di stelle", f_round: "Occhiali tondi", f_heart: "Occhiali a cuore", f_star: "Occhiali a stella", f_monocle: "Monocolo", f_mask: "Maschera di Carnevale" },
    snacks: { onigiri: "Onigiri", grapes: "Uva", shrimp: "Gamberetti", marshmallow: "Marshmallow", watermelon: "Anguria", carrotcake: "Torta di carote" },
    gTag: "Un regalo per te", gT: (n) => `Un regalo per ${n}!`, gP: (n, h, w) => `Un papillon a pois, il primo accessorio di ${n}. Altri vestiti e accessori ti aspettano in ${h}, alla voce ${w}.`, gWear: "Mettiglielo subito", gLater: "Più tardi",
    hint: (n) => `Prova a scoprire il cibo preferito di ${n}!`,
    clue: { germo: "Indizio: sono piccole, rosse e crescono nell'orto.", ondi: "Indizio: ha la forma di qualcosa che nuota nel fiume.", lumi: "Indizio: lo preparano le api con il nettare dei fiori.", miko: "Indizio: è bianco, morbido e arriva dal Giappone.", rufi: "Indizio: pensa a una famosa favola con una volpe.", pingo: "Indizio: sono piccolissimi, rosa e vengono dal mare.", dori: "Indizio: è soffice e vicino al fuoco diventa ancora più buono." },
    why: { germo: (n) => `Il primo profumo che ${n} ha sentito, quand'era ancora un semino, è stato quello delle fragole dell'orto.`, ondi: (n) => `Come tutte le lontre, ${n} adora il pesce. Anche quando è un biscotto!`, lumi: (n) => `Le lucciole vanno ghiotte del nettare dei fiori, e il miele è proprio nettare preparato dalle api. Ecco perché piace tanto a ${n}!`, miko: (n) => `Un onigiri è bianco e morbido come una nuvola. Proprio come ${n}!`, rufi: (n) => `Conosci la favola della volpe e l'uva? ${n} invece l'uva la raggiunge sempre!`, pingo: (n) => `In mare i pinguini mangiano il krill, minuscoli gamberetti. Per ${n} sanno di casa.`, dori: (n) => `${n} abbrustolisce i marshmallow con la sua fiammella. A volte li brucia un po', ma sono buonissimi lo stesso.` },
    discT: (n) => `Hai scoperto il cibo preferito di ${n}!`, discHeart: "Da ora nella merenda lo trovi segnato con un cuore.", discOk: "Che bello!", favLegend: (n) => `Il preferito di ${n}`,
    chatSecret: "Il mio cibo preferito? È un segreto! Prova a darmi merende diverse e lo scoprirai."
  },
  en: {
    gOnly: "Welcome gift",
    sub: { hat: "Hats", neck: "Neck", face: "Face" },
    items: { h_bucket: "Bucket hat", h_cap: "Baseball cap", h_tophat: "Top hat", h_unicorn: "Unicorn horn", n_bowtie: "Polka-dot bow tie", n_bandana: "Bandana", n_scarf: "Knitted scarf", n_lei: "Flower lei", n_cape: "Hero cape", n_starcape: "Starry cloak", f_round: "Round glasses", f_heart: "Heart glasses", f_star: "Star sunglasses", f_monocle: "Monocle", f_mask: "Carnival mask" },
    snacks: { onigiri: "Rice ball", grapes: "Grapes", shrimp: "Shrimp", marshmallow: "Marshmallow", watermelon: "Watermelon", carrotcake: "Carrot cake" },
    gTag: "A gift for you", gT: (n) => `A gift for ${n}!`, gP: (n, h, w) => `A polka-dot bow tie, ${n}'s very first accessory. More clothes and accessories are waiting for you in ${h}, under ${w}.`, gWear: "Put it on now", gLater: "Later",
    hint: (n) => `Try to discover ${n}'s favourite food!`,
    clue: { germo: "Clue: they're small, red and grow in the garden.", ondi: "Clue: it's shaped like something that swims in the river.", lumi: "Clue: bees make it from flower nectar.", miko: "Clue: it's white, soft and comes from Japan.", rufi: "Clue: think of a famous fable with a fox.", pingo: "Clue: they're tiny, pink and come from the sea.", dori: "Clue: it's fluffy, and even tastier near a fire." },
    why: { germo: (n) => `The very first scent ${n} ever smelled, as a tiny seed, was the strawberries in the garden.`, ondi: (n) => `Like all otters, ${n} loves fish. Even when it's a cracker!`, lumi: (n) => `Fireflies adore flower nectar, and honey is nectar made by bees. No wonder ${n} loves it!`, miko: (n) => `A rice ball is white and soft like a cloud. Just like ${n}!`, rufi: (n) => `Know the fable of the fox and the grapes? ${n} always manages to reach them!`, pingo: (n) => `At sea, penguins eat krill, tiny little shrimp. To ${n}, they taste like home.`, dori: (n) => `${n} toasts marshmallows with a tiny flame. Sometimes they get a little burnt, but they're delicious anyway.` },
    discT: (n) => `You discovered ${n}'s favourite food!`, discHeart: "From now on it's marked with a heart at snack time.", discOk: "Yay!", favLegend: (n) => `${n}'s favourite`,
    chatSecret: "My favourite food? It's a secret! Try giving me different snacks and you'll find out."
  },
  de: {
    gOnly: "Willkommensgeschenk",
    sub: { hat: "Hüte", neck: "Hals", face: "Gesicht" },
    items: { h_bucket: "Fischerhut", h_cap: "Baseballkappe", h_tophat: "Zylinder", h_unicorn: "Einhorn-Horn", n_bowtie: "Fliege mit Punkten", n_bandana: "Halstuch", n_scarf: "Strickschal", n_lei: "Blumenkette", n_cape: "Heldenumhang", n_starcape: "Sternenumhang", f_round: "Runde Brille", f_heart: "Herzbrille", f_star: "Sternen-Sonnenbrille", f_monocle: "Monokel", f_mask: "Karnevalsmaske" },
    snacks: { onigiri: "Reisbällchen", grapes: "Trauben", shrimp: "Garnelen", marshmallow: "Marshmallow", watermelon: "Wassermelone", carrotcake: "Karottenkuchen" },
    gTag: "Ein Geschenk für dich", gT: (n) => `Ein Geschenk für ${n}!`, gP: (n, h, w) => `Eine gepunktete Fliege – das allererste Accessoire für ${n}. Weitere Kleidung und Accessoires warten unter ${h} › ${w} auf dich.`, gWear: "Gleich anziehen", gLater: "Später",
    hint: (n) => `Finde heraus, was ${n} am liebsten isst!`,
    clue: { germo: "Tipp: Sie sind klein, rot und wachsen im Garten.", ondi: "Tipp: Es hat die Form von etwas, das im Fluss schwimmt.", lumi: "Tipp: Bienen machen ihn aus Blütennektar.", miko: "Tipp: Es ist weiß, weich und kommt aus Japan.", rufi: "Tipp: Denk an eine berühmte Fabel mit einem Fuchs.", pingo: "Tipp: Sie sind winzig, rosa und kommen aus dem Meer.", dori: "Tipp: Es ist flauschig und am Feuer noch leckerer." },
    why: { germo: (n) => `Der allererste Duft, den ${n} als winziger Samen gerochen hat, waren die Erdbeeren im Garten.`, ondi: (n) => `Wie alle Otter liebt ${n} Fisch. Sogar, wenn er ein Keks ist!`, lumi: (n) => `Glühwürmchen lieben Blütennektar, und Honig ist Nektar, den Bienen gemacht haben. Kein Wunder, dass ${n} ihn so mag!`, miko: (n) => `Ein Reisbällchen ist weiß und weich wie eine Wolke. Genau wie ${n}!`, rufi: (n) => `Kennst du die Fabel vom Fuchs und den Trauben? ${n} kommt immer dran!`, pingo: (n) => `Im Meer fressen Pinguine Krill, winzige Garnelen. Für ${n} schmecken sie nach Zuhause.`, dori: (n) => `${n} röstet Marshmallows mit der eigenen kleinen Flamme. Manchmal werden sie etwas schwarz, aber lecker sind sie trotzdem.` },
    discT: (n) => `Du hast entdeckt, was ${n} am liebsten isst!`, discHeart: "Ab jetzt ist es beim Snack mit einem Herz markiert.", discOk: "Wie schön!", favLegend: (n) => `Lieblingssnack von ${n}`,
    chatSecret: "Mein Lieblingsessen? Das ist ein Geheimnis! Gib mir verschiedene Snacks, dann findest du es heraus."
  },
  es: {
    gOnly: "Regalo de bienvenida",
    sub: { hat: "Gorros", neck: "Cuello", face: "Cara" },
    items: { h_bucket: "Gorro de pescador", h_cap: "Gorra", h_tophat: "Sombrero de copa", h_unicorn: "Cuerno de unicornio", n_bowtie: "Pajarita de lunares", n_bandana: "Pañuelo", n_scarf: "Bufanda de lana", n_lei: "Collar de flores", n_cape: "Capa de héroe", n_starcape: "Capa de estrellas", f_round: "Gafas redondas", f_heart: "Gafas de corazón", f_star: "Gafas de estrella", f_monocle: "Monóculo", f_mask: "Máscara de carnaval" },
    snacks: { onigiri: "Onigiri", grapes: "Uvas", shrimp: "Gambitas", marshmallow: "Malvavisco", watermelon: "Sandía", carrotcake: "Tarta de zanahoria" },
    gTag: "Un regalo para ti", gT: (n) => `¡Un regalo para ${n}!`, gP: (n, h, w) => `Una pajarita de lunares, el primer accesorio de ${n}. Más ropa y accesorios te esperan en ${h}, en ${w}.`, gWear: "Pónsela ya", gLater: "Más tarde",
    hint: (n) => `¡Descubre cuál es la comida favorita de ${n}!`,
    clue: { germo: "Pista: son pequeñas, rojas y crecen en el huerto.", ondi: "Pista: tiene forma de algo que nada en el río.", lumi: "Pista: la hacen las abejas con el néctar de las flores.", miko: "Pista: es blanco, blandito y viene de Japón.", rufi: "Pista: piensa en una fábula famosa con un zorro.", pingo: "Pista: son diminutas, rosas y vienen del mar.", dori: "Pista: es esponjoso y junto al fuego está aún más rico." },
    why: { germo: (n) => `El primer olor que ${n} notó, cuando era una semillita, fue el de las fresas del huerto.`, ondi: (n) => `Como todas las nutrias, ${n} adora el pescado. ¡Aunque sea una galleta!`, lumi: (n) => `A las luciérnagas les encanta el néctar de las flores, y la miel es néctar hecho por las abejas. ¡Por eso a ${n} le gusta tanto!`, miko: (n) => `Un onigiri es blanco y suave como una nube. ¡Igual que ${n}!`, rufi: (n) => `¿Conoces la fábula de la zorra y las uvas? ¡${n} siempre las alcanza!`, pingo: (n) => `En el mar, los pingüinos comen kril, unas gambitas diminutas. A ${n} le saben a casa.`, dori: (n) => `${n} tuesta los malvaviscos con su llamita. A veces se le queman un poco, pero están buenísimos igual.` },
    discT: (n) => `¡Has descubierto la comida favorita de ${n}!`, discHeart: "Desde ahora la verás marcada con un corazón en la merienda.", discOk: "¡Qué bien!", favLegend: (n) => `La favorita de ${n}`,
    chatSecret: "¿Mi comida favorita? ¡Es un secreto! Dame meriendas distintas y lo descubrirás."
  },
  fr: {
    gOnly: "Cadeau de bienvenue",
    sub: { hat: "Chapeaux", neck: "Cou", face: "Visage" },
    items: { h_bucket: "Bob", h_cap: "Casquette", h_tophat: "Haut-de-forme", h_unicorn: "Corne de licorne", n_bowtie: "Nœud papillon à pois", n_bandana: "Bandana", n_scarf: "Écharpe en laine", n_lei: "Collier de fleurs", n_cape: "Cape de héros", n_starcape: "Cape étoilée", f_round: "Lunettes rondes", f_heart: "Lunettes cœur", f_star: "Lunettes étoiles", f_monocle: "Monocle", f_mask: "Masque de carnaval" },
    snacks: { onigiri: "Onigiri", grapes: "Raisin", shrimp: "Crevettes", marshmallow: "Guimauve", watermelon: "Pastèque", carrotcake: "Gâteau aux carottes" },
    gTag: "Un cadeau pour toi", gT: (n) => `Un cadeau pour ${n} !`, gP: (n, h, w) => `Un nœud papillon à pois, le tout premier accessoire de ${n}. D'autres vêtements et accessoires t'attendent dans ${h}, rubrique ${w}.`, gWear: "Le mettre tout de suite", gLater: "Plus tard",
    hint: (n) => `Essaie de découvrir le goûter préféré de ${n} !`,
    clue: { germo: "Indice : elles sont petites, rouges et poussent au potager.", ondi: "Indice : il a la forme de quelque chose qui nage dans la rivière.", lumi: "Indice : les abeilles le fabriquent avec le nectar des fleurs.", miko: "Indice : il est blanc, tout doux et vient du Japon.", rufi: "Indice : pense à une fable célèbre avec un renard.", pingo: "Indice : elles sont minuscules, roses et viennent de la mer.", dori: "Indice : elle est moelleuse et encore meilleure près du feu." },
    why: { germo: (n) => `Le tout premier parfum que ${n} a senti, quand c'était une petite graine, c'était celui des fraises du potager.`, ondi: (n) => `Comme toutes les loutres, ${n} adore le poisson. Même en biscuit !`, lumi: (n) => `Les lucioles adorent le nectar des fleurs, et le miel, c'est du nectar préparé par les abeilles. Pas étonnant que ${n} l'aime tant !`, miko: (n) => `Un onigiri est blanc et doux comme un nuage. Tout comme ${n} !`, rufi: (n) => `Tu connais la fable du renard et des raisins ? ${n} arrive toujours à les attraper !`, pingo: (n) => `En mer, les manchots mangent du krill, de minuscules crevettes. Pour ${n}, ça a le goût de la maison.`, dori: (n) => `${n} fait griller les guimauves avec sa petite flamme. Parfois elles brûlent un peu, mais elles sont délicieuses quand même.` },
    discT: (n) => `Tu as découvert le goûter préféré de ${n} !`, discHeart: "Désormais, il est marqué d'un cœur à l'heure du goûter.", discOk: "Trop bien !", favLegend: (n) => `Le préféré de ${n}`,
    chatSecret: "Mon goûter préféré ? C'est un secret ! Donne-moi des goûters différents et tu le découvriras."
  },
  pt: {
    gOnly: "Presente de boas-vindas",
    sub: { hat: "Chapéus", neck: "Pescoço", face: "Rosto" },
    items: { h_bucket: "Chapéu bucket", h_cap: "Boné", h_tophat: "Cartola", h_unicorn: "Chifre de unicórnio", n_bowtie: "Gravata-borboleta de bolinhas", n_bandana: "Bandana", n_scarf: "Cachecol de lã", n_lei: "Colar de flores", n_cape: "Capa de herói", n_starcape: "Capa estrelada", f_round: "Óculos redondos", f_heart: "Óculos de coração", f_star: "Óculos de estrela", f_monocle: "Monóculo", f_mask: "Máscara de carnaval" },
    snacks: { onigiri: "Onigiri", grapes: "Uvas", shrimp: "Camarões", marshmallow: "Marshmallow", watermelon: "Melancia", carrotcake: "Bolo de cenoura" },
    gTag: "Um presente para você", gT: (n) => `Um presente para ${n}!`, gP: (n, h, w) => `Uma gravata-borboleta de bolinhas, o primeiro acessório de ${n}. Mais roupas e acessórios esperam por você em ${h}, na aba ${w}.`, gWear: "Colocar agora", gLater: "Mais tarde",
    hint: (n) => `Tente descobrir a comida favorita de ${n}!`,
    clue: { germo: "Dica: são pequenos, vermelhos e crescem na horta.", ondi: "Dica: tem o formato de algo que nada no rio.", lumi: "Dica: as abelhas fazem com o néctar das flores.", miko: "Dica: é branco, macio e vem do Japão.", rufi: "Dica: pense numa fábula famosa com uma raposa.", pingo: "Dica: são pequeninos, cor-de-rosa e vêm do mar.", dori: "Dica: é fofinho e fica ainda mais gostoso perto do fogo." },
    why: { germo: (n) => `O primeiro cheirinho que ${n} sentiu, ainda sementinha, foi o dos morangos da horta.`, ondi: (n) => `Como toda lontra, ${n} adora peixe. Mesmo quando é biscoito!`, lumi: (n) => `Vaga-lumes adoram o néctar das flores, e o mel é néctar feito pelas abelhas. Não é à toa que ${n} ama!`, miko: (n) => `Um onigiri é branco e macio como uma nuvem. Igualzinho a ${n}!`, rufi: (n) => `Conhece a fábula da raposa e as uvas? ${n} sempre consegue alcançar!`, pingo: (n) => `No mar, os pinguins comem krill, camarõezinhos minúsculos. Para ${n}, têm gosto de casa.`, dori: (n) => `${n} tosta os marshmallows com a sua chaminha. Às vezes queimam um pouco, mas ficam deliciosos do mesmo jeito.` },
    discT: (n) => `Você descobriu a comida favorita de ${n}!`, discHeart: "Agora ela aparece marcada com um coração na hora do lanche.", discOk: "Que legal!", favLegend: (n) => `A favorita de ${n}`,
    chatSecret: "Minha comida favorita? É segredo! Me dê lanchinhos diferentes e você vai descobrir."
  },
  ja: {
    gOnly: "ようこそギフト",
    sub: { hat: "帽子", neck: "首もと", face: "顔" },
    items: { h_bucket: "バケットハット", h_cap: "キャップ", h_tophat: "シルクハット", h_unicorn: "ユニコーンのツノ", n_bowtie: "水玉の蝶ネクタイ", n_bandana: "バンダナ", n_scarf: "ニットのマフラー", n_lei: "花のレイ", n_cape: "ヒーローのマント", n_starcape: "星空のマント", f_round: "まるメガネ", f_heart: "ハートのメガネ", f_star: "スターサングラス", f_monocle: "片メガネ", f_mask: "カーニバルの仮面" },
    snacks: { onigiri: "おにぎり", grapes: "ぶどう", shrimp: "エビ", marshmallow: "マシュマロ", watermelon: "スイカ", carrotcake: "にんじんケーキ" },
    gTag: "あなたへのプレゼント", gT: (n) => `${n}にプレゼント！`, gP: (n, h, w) => `水玉の蝶ネクタイ。${n}のはじめてのアクセサリーです。ほかの服やアクセサリーは「${h}」の「${w}」で待っていますよ。`, gWear: "さっそく着けてみる", gLater: "あとで",
    hint: (n) => `${n}の大好物を見つけてみましょう！`,
    clue: { germo: "ヒント：小さくて赤くて、畑で育ちます。", ondi: "ヒント：川を泳ぐものの形をしています。", lumi: "ヒント：ミツバチが花のみつから作ります。", miko: "ヒント：白くてやわらかくて、日本から来ました。", rufi: "ヒント：キツネが出てくる有名なおはなしを思い出してみて。", pingo: "ヒント：とても小さくてピンク色で、海から来ます。", dori: "ヒント：ふわふわで、火のそばだともっとおいしくなります。" },
    why: { germo: (n) => `${n}がまだ小さなタネだったころ、最初にかいだのは畑のイチゴの香りでした。`, ondi: (n) => `カワウソはみんな魚が大好き。${n}も、ビスケットの魚でも大よろこびです！`, lumi: (n) => `ホタルは花のみつが大好き。はちみつはミツバチが作った花のみつなので、${n}にぴったりなんです！`, miko: (n) => `おにぎりは雲みたいに白くてふわふわ。${n}にそっくりです！`, rufi: (n) => `「キツネとブドウ」のおはなし、知っていますか？ ${n}はいつもちゃんと手が届きます！`, pingo: (n) => `海のペンギンは、オキアミという小さなエビを食べます。${n}にとっては、ふるさとの味です。`, dori: (n) => `${n}は自分の小さな炎でマシュマロをあぶります。ちょっとこげることもあるけれど、それもおいしいんです。` },
    discT: (n) => `${n}の大好物を見つけました！`, discHeart: "これからはおやつのとき、ハートで表示されます。", discOk: "やったね！", favLegend: (n) => `${n}の大好物`,
    chatSecret: "わたしの大好物？ ひみつです！ いろいろなおやつをくれたら、わかりますよ。"
  },
  ko: {
    gOnly: "환영 선물",
    sub: { hat: "모자", neck: "목", face: "얼굴" },
    items: { h_bucket: "버킷햇", h_cap: "야구 모자", h_tophat: "실크햇", h_unicorn: "유니콘 뿔", n_bowtie: "물방울 나비넥타이", n_bandana: "반다나", n_scarf: "니트 목도리", n_lei: "꽃 목걸이", n_cape: "영웅 망토", n_starcape: "별빛 망토", f_round: "동그란 안경", f_heart: "하트 안경", f_star: "별 선글라스", f_monocle: "외알 안경", f_mask: "카니발 가면" },
    snacks: { onigiri: "주먹밥", grapes: "포도", shrimp: "새우", marshmallow: "마시멜로", watermelon: "수박", carrotcake: "당근 케이크" },
    gTag: "선물이 도착했어요", gT: (n) => `${n}에게 주는 선물!`, gP: (n, h, w) => `물방울무늬 나비넥타이예요. ${n}의 첫 액세서리랍니다. 다른 옷과 액세서리는 ${h}의 ${w}에서 기다리고 있어요.`, gWear: "바로 착용하기", gLater: "나중에",
    hint: (n) => `${n}의 최애 간식을 찾아보세요!`,
    clue: { germo: "힌트: 작고 빨갛고 텃밭에서 자라요.", ondi: "힌트: 강에서 헤엄치는 무언가를 닮았어요.", lumi: "힌트: 꿀벌이 꽃꿀로 만들어요.", miko: "힌트: 하얗고 말랑하고 일본에서 왔어요.", rufi: "힌트: 여우가 나오는 유명한 우화를 떠올려 보세요.", pingo: "힌트: 아주 작고 분홍색이고 바다에서 왔어요.", dori: "힌트: 폭신폭신하고 불 옆에서 더 맛있어져요." },
    why: { germo: (n) => `${n}의 첫 기억 속 향기는, 아주 작은 씨앗이던 시절 맡은 텃밭 딸기 향이에요.`, ondi: (n) => `모든 수달처럼 ${n}도 생선을 정말 좋아해요. 비스킷 생선이라도요!`, lumi: (n) => `반딧불이는 꽃꿀을 정말 좋아해요. 꿀은 꿀벌이 만든 꽃꿀이니까 ${n}에게 딱이죠!`, miko: (n) => `주먹밥은 구름처럼 하얗고 말랑해요. 꼭 ${n} 같죠!`, rufi: (n) => `여우와 포도 우화 알아요? ${n}에게 포도는 언제나 손이 닿는 곳에 있어요!`, pingo: (n) => `바다의 펭귄은 크릴이라는 아주 작은 새우를 먹어요. ${n}에게는 고향의 맛이에요.`, dori: (n) => `작은 불꽃으로 구운 마시멜로는 ${n}의 자랑이에요. 가끔 조금 타지만 그래도 정말 맛있어요.` },
    discT: (n) => `${n}의 최애 간식을 찾았어요!`, discHeart: "이제 간식 시간에 하트로 표시돼요.", discOk: "신난다!", favLegend: (n) => `${n}의 최애 간식`,
    chatSecret: "내 최애 간식요? 비밀이에요! 여러 간식을 주다 보면 알게 될 거예요."
  },
  zh: {
    gOnly: "欢迎礼物",
    sub: { hat: "帽子", neck: "颈部", face: "脸部" },
    items: { h_bucket: "渔夫帽", h_cap: "棒球帽", h_tophat: "礼帽", h_unicorn: "独角兽角", n_bowtie: "波点领结", n_bandana: "三角领巾", n_scarf: "毛线围巾", n_lei: "花环项链", n_cape: "英雄披风", n_starcape: "星空斗篷", f_round: "圆框眼镜", f_heart: "爱心眼镜", f_star: "星星墨镜", f_monocle: "单片眼镜", f_mask: "狂欢节面具" },
    snacks: { onigiri: "饭团", grapes: "葡萄", shrimp: "小虾", marshmallow: "棉花糖", watermelon: "西瓜", carrotcake: "胡萝卜蛋糕" },
    gTag: "送你的礼物", gT: (n) => `送给${n}的礼物！`, gP: (n, h, w) => `一个波点领结，是${n}的第一件配饰。更多衣服和配饰在「${h}」的「${w}」里等着你。`, gWear: "马上戴上", gLater: "稍后",
    hint: (n) => `试着找出${n}最爱吃的东西吧！`,
    clue: { germo: "提示：小小的、红红的，长在菜园里。", ondi: "提示：它的形状像在河里游的东西。", lumi: "提示：蜜蜂用花蜜做成的。", miko: "提示：白白的、软软的，来自日本。", rufi: "提示：想想一个有狐狸的著名寓言。", pingo: "提示：小小的、粉粉的，来自大海。", dori: "提示：软软蓬蓬的，靠近火会更好吃。" },
    why: { germo: (n) => `${n}还是一颗小种子时，闻到的第一种香味就是菜园里的草莓。`, ondi: (n) => `和所有水獭一样，${n}超爱吃鱼。就算是鱼形饼干也爱！`, lumi: (n) => `萤火虫最爱花蜜，而蜂蜜正是蜜蜂酿的花蜜，${n}当然喜欢！`, miko: (n) => `饭团像云朵一样白白软软的，和${n}一模一样！`, rufi: (n) => `你知道狐狸和葡萄的寓言吗？${n}可是每次都够得着！`, pingo: (n) => `在海里，企鹅吃磷虾，一种小小的虾。对${n}来说，这是家乡的味道。`, dori: (n) => `${n}会用自己的小火苗烤棉花糖。有时会烤焦一点，但还是超好吃。` },
    discT: (n) => `你发现了${n}最爱吃的东西！`, discHeart: "以后吃点心时，它会用爱心标出来。", discOk: "太好了！", favLegend: (n) => `${n}的最爱`,
    chatSecret: "我最爱吃什么？这是秘密！多给我吃几种点心，你就会知道啦。"
  },
  zht: {
    gOnly: "歡迎禮物",
    sub: { hat: "帽子", neck: "頸部", face: "臉部" },
    items: { h_bucket: "漁夫帽", h_cap: "棒球帽", h_tophat: "禮帽", h_unicorn: "獨角獸角", n_bowtie: "點點領結", n_bandana: "三角領巾", n_scarf: "毛線圍巾", n_lei: "花環項鍊", n_cape: "英雄披風", n_starcape: "星空斗篷", f_round: "圓框眼鏡", f_heart: "愛心眼鏡", f_star: "星星墨鏡", f_monocle: "單片眼鏡", f_mask: "嘉年華面具" },
    snacks: { onigiri: "飯糰", grapes: "葡萄", shrimp: "小蝦", marshmallow: "棉花糖", watermelon: "西瓜", carrotcake: "胡蘿蔔蛋糕" },
    gTag: "送你的禮物", gT: (n) => `送給${n}的禮物！`, gP: (n, h, w) => `一個點點領結，是${n}的第一件配件。更多衣服和配件在「${h}」的「${w}」裡等著你。`, gWear: "馬上戴上", gLater: "稍後",
    hint: (n) => `試著找出${n}最愛吃的東西吧！`,
    clue: { germo: "提示：小小的、紅紅的，長在菜園裡。", ondi: "提示：它的形狀像在河裡游的東西。", lumi: "提示：蜜蜂用花蜜做成的。", miko: "提示：白白的、軟軟的，來自日本。", rufi: "提示：想想一個有狐狸的著名寓言。", pingo: "提示：小小的、粉粉的，來自大海。", dori: "提示：軟綿綿的，靠近火會更好吃。" },
    why: { germo: (n) => `${n}還是一顆小種子時，聞到的第一種香味就是菜園裡的草莓。`, ondi: (n) => `和所有水獺一樣，${n}超愛吃魚。就算是魚形餅乾也愛！`, lumi: (n) => `螢火蟲最愛花蜜，而蜂蜜正是蜜蜂釀的花蜜，${n}當然喜歡！`, miko: (n) => `飯糰像雲朵一樣白白軟軟的，和${n}一模一樣！`, rufi: (n) => `你知道狐狸和葡萄的寓言嗎？${n}可是每次都搆得著！`, pingo: (n) => `在海裡，企鵝吃磷蝦，一種小小的蝦。對${n}來說，這是家鄉的味道。`, dori: (n) => `${n}會用自己的小火苗烤棉花糖。有時會烤焦一點，但還是超好吃。` },
    discT: (n) => `你發現了${n}最愛吃的東西！`, discHeart: "以後吃點心時，它會用愛心標出來。", discOk: "太好了！", favLegend: (n) => `${n}的最愛`,
    chatSecret: "我最愛吃什麼？這是祕密！多給我吃幾種點心，你就會知道囉。"
  },
  ru: {
    gOnly: "Подарок-приветствие",
    sub: { hat: "Шапки", neck: "Шея", face: "Лицо" },
    items: { h_bucket: "Панамка", h_cap: "Кепка", h_tophat: "Цилиндр", h_unicorn: "Рог единорога", n_bowtie: "Бабочка в горошек", n_bandana: "Бандана", n_scarf: "Вязаный шарф", n_lei: "Цветочное ожерелье", n_cape: "Плащ героя", n_starcape: "Звёздный плащ", f_round: "Круглые очки", f_heart: "Очки-сердечки", f_star: "Очки-звёздочки", f_monocle: "Монокль", f_mask: "Карнавальная маска" },
    snacks: { onigiri: "Онигири", grapes: "Виноград", shrimp: "Креветки", marshmallow: "Маршмеллоу", watermelon: "Арбуз", carrotcake: "Морковный торт" },
    gTag: "Подарок для тебя", gT: (n) => `${n} получает подарок!`, gP: (n, h, w) => `${n} получает свой самый первый аксессуар — бабочку в горошек. Другая одежда и аксессуары ждут тебя в разделе «${h}» › «${w}».`, gWear: "Надеть сейчас", gLater: "Позже",
    hint: (n) => `Попробуй узнать, что ${n} любит есть больше всего!`,
    clue: { germo: "Подсказка: маленькие, красные и растут на грядке.", ondi: "Подсказка: по форме похоже на того, кто плавает в реке.", lumi: "Подсказка: его делают пчёлы из цветочного нектара.", miko: "Подсказка: белый, мягкий и родом из Японии.", rufi: "Подсказка: вспомни знаменитую басню про лису.", pingo: "Подсказка: крошечные, розовые и живут в море.", dori: "Подсказка: мягкий, пушистый, а у огня становится ещё вкуснее." },
    why: { germo: (n) => `Самый первый аромат, который ${n} почувствовал ещё семечком, — это клубника с грядки.`, ondi: (n) => `Как и все выдры, ${n} обожает рыбу. Даже если это печенье!`, lumi: (n) => `Светлячки обожают цветочный нектар, а мёд — это нектар, который приготовили пчёлы. Конечно, ${n} его любит!`, miko: (n) => `Онигири белый и мягкий, как облачко. Совсем как ${n}!`, rufi: (n) => `Знаешь басню про лису и виноград? А ${n} всегда до него дотягивается!`, pingo: (n) => `В море пингвины едят криль — крошечных рачков. ${n} узнаёт в них вкус дома.`, dori: (n) => `${n} поджаривает маршмеллоу своим маленьким огоньком. Иногда они чуть подгорают, но всё равно очень вкусные.` },
    discT: (n) => `${n}: любимая еда найдена!`, discHeart: "Теперь в перекусах она отмечена сердечком.", discOk: "Ура!", favLegend: (n) => `${n}: любимое`,
    chatSecret: "Моя любимая еда? Это секрет! Давай мне разные угощения — и ты узнаешь."
  },
  pl: {
    gOnly: "Prezent powitalny",
    sub: { hat: "Czapki", neck: "Szyja", face: "Twarz" },
    items: { h_bucket: "Kapelusz rybacki", h_cap: "Czapka z daszkiem", h_tophat: "Cylinder", h_unicorn: "Róg jednorożca", n_bowtie: "Muszka w kropki", n_bandana: "Bandana", n_scarf: "Wełniany szalik", n_lei: "Naszyjnik z kwiatów", n_cape: "Peleryna bohatera", n_starcape: "Gwiezdna peleryna", f_round: "Okrągłe okulary", f_heart: "Okulary serduszka", f_star: "Okulary gwiazdki", f_monocle: "Monokl", f_mask: "Maska karnawałowa" },
    snacks: { onigiri: "Onigiri", grapes: "Winogrona", shrimp: "Krewetki", marshmallow: "Pianka", watermelon: "Arbuz", carrotcake: "Ciasto marchewkowe" },
    gTag: "Prezent dla ciebie", gT: (n) => `${n} dostaje prezent!`, gP: (n, h, w) => `${n} dostaje swój pierwszy dodatek: muszkę w kropki. Więcej ubrań i dodatków czeka na ciebie w zakładce ${h} › ${w}.`, gWear: "Załóż od razu", gLater: "Później",
    hint: (n) => `Spróbuj odkryć, co ${n} lubi najbardziej!`,
    clue: { germo: "Podpowiedź: są małe, czerwone i rosną w ogródku.", ondi: "Podpowiedź: ma kształt czegoś, co pływa w rzece.", lumi: "Podpowiedź: robią go pszczoły z nektaru kwiatów.", miko: "Podpowiedź: jest białe, miękkie i pochodzi z Japonii.", rufi: "Podpowiedź: pomyśl o słynnej bajce z lisem.", pingo: "Podpowiedź: są malutkie, różowe i pochodzą z morza.", dori: "Podpowiedź: jest puszysta, a przy ogniu smakuje jeszcze lepiej." },
    why: { germo: (n) => `Pierwszy zapach, jaki ${n} poczuł jeszcze jako nasionko, to truskawki z ogródka.`, ondi: (n) => `Jak każda wydra, ${n} uwielbia ryby. Nawet jeśli to herbatnik!`, lumi: (n) => `Świetliki uwielbiają nektar kwiatów, a miód to nektar przygotowany przez pszczoły. Nic dziwnego, że ${n} go kocha!`, miko: (n) => `Onigiri jest białe i miękkie jak chmurka. Zupełnie jak ${n}!`, rufi: (n) => `Znasz bajkę o lisie i winogronach? A ${n} zawsze do nich sięga!`, pingo: (n) => `W morzu pingwiny jedzą kryl, malutkie krewetki. ${n} czuje w nich smak domu.`, dori: (n) => `${n} opieka pianki swoim małym płomykiem. Czasem trochę się przypalają, ale i tak są pyszne.` },
    discT: (n) => `Już wiesz, co ${n} lubi najbardziej!`, discHeart: "Od teraz przy przekąskach oznaczamy go serduszkiem.", discOk: "Super!", favLegend: (n) => `${n}: ulubiony przysmak`,
    chatSecret: "Mój ulubiony przysmak? To tajemnica! Dawaj mi różne przekąski, a się dowiesz."
  },
  nl: {
    gOnly: "Welkomstcadeau",
    sub: { hat: "Hoeden", neck: "Nek", face: "Gezicht" },
    items: { h_bucket: "Vissershoedje", h_cap: "Pet", h_tophat: "Hoge hoed", h_unicorn: "Eenhoornhoorn", n_bowtie: "Strikje met stippen", n_bandana: "Bandana", n_scarf: "Gebreide sjaal", n_lei: "Bloemenkrans", n_cape: "Heldencape", n_starcape: "Sterrenmantel", f_round: "Ronde bril", f_heart: "Hartjesbril", f_star: "Sterrenzonnebril", f_monocle: "Monocle", f_mask: "Carnavalsmasker" },
    snacks: { onigiri: "Rijstbal", grapes: "Druiven", shrimp: "Garnalen", marshmallow: "Marshmallow", watermelon: "Watermeloen", carrotcake: "Worteltaart" },
    gTag: "Een cadeautje voor jou", gT: (n) => `Een cadeautje voor ${n}!`, gP: (n, h, w) => `Een strikje met stippen, het allereerste accessoire van ${n}. Meer kleren en accessoires vind je bij ${h} › ${w}.`, gWear: "Meteen aandoen", gLater: "Later",
    hint: (n) => `Ontdek wat ${n} het allerlekkerst vindt!`,
    clue: { germo: "Hint: ze zijn klein, rood en groeien in de moestuin.", ondi: "Hint: het heeft de vorm van iets dat in de rivier zwemt.", lumi: "Hint: bijen maken het van bloemennectar.", miko: "Hint: het is wit, zacht en komt uit Japan.", rufi: "Hint: denk aan een beroemde fabel met een vos.", pingo: "Hint: ze zijn piepklein, roze en komen uit de zee.", dori: "Hint: het is zacht en luchtig, en bij het vuur nog lekkerder." },
    why: { germo: (n) => `De allereerste geur die ${n} rook, als piepklein zaadje, was die van de aardbeien in de moestuin.`, ondi: (n) => `Zoals alle otters is ${n} dol op vis. Zelfs als het een koekje is!`, lumi: (n) => `Vuurvliegjes zijn dol op bloemennectar, en honing is nectar die bijen hebben gemaakt. Geen wonder dat ${n} het zo lekker vindt!`, miko: (n) => `Een rijstbal is wit en zacht als een wolkje. Net als ${n}!`, rufi: (n) => `Ken je de fabel van de vos en de druiven? ${n} kan er altijd bij!`, pingo: (n) => `In zee eten pinguïns krill, piepkleine garnaaltjes. Voor ${n} smaakt dat naar thuis.`, dori: (n) => `${n} roostert marshmallows met een eigen vlammetje. Soms verbranden ze een beetje, maar lekker zijn ze toch.` },
    discT: (n) => `Je hebt ontdekt wat ${n} het allerlekkerst vindt!`, discHeart: "Vanaf nu staat er een hartje bij als je een snack geeft.", discOk: "Leuk!", favLegend: (n) => `Favoriet van ${n}`,
    chatSecret: "Mijn lievelingseten? Dat is geheim! Geef me verschillende snacks, dan kom je erachter."
  },
  tr: {
    gOnly: "Hoş geldin hediyesi",
    sub: { hat: "Şapkalar", neck: "Boyun", face: "Yüz" },
    items: { h_bucket: "Balıkçı şapkası", h_cap: "Kep", h_tophat: "Silindir şapka", h_unicorn: "Unicorn boynuzu", n_bowtie: "Puantiyeli papyon", n_bandana: "Bandana", n_scarf: "Örgü atkı", n_lei: "Çiçek kolye", n_cape: "Kahraman pelerini", n_starcape: "Yıldızlı pelerin", f_round: "Yuvarlak gözlük", f_heart: "Kalpli gözlük", f_star: "Yıldız gözlük", f_monocle: "Monokl", f_mask: "Karnaval maskesi" },
    snacks: { onigiri: "Onigiri", grapes: "Üzüm", shrimp: "Karides", marshmallow: "Marshmallow", watermelon: "Karpuz", carrotcake: "Havuçlu kek" },
    gTag: "Sana bir hediye", gT: (n) => `${n} için bir hediye!`, gP: (n, h, w) => `Puantiyeli bir papyon: ${n} için ilk aksesuar. Daha fazla kıyafet ve aksesuar ${h} › ${w} bölümünde seni bekliyor.`, gWear: "Hemen tak", gLater: "Sonra",
    hint: (n) => `${n} en çok neyi seviyor, keşfetmeye çalış!`,
    clue: { germo: "İpucu: küçük, kırmızı ve bahçede yetişir.", ondi: "İpucu: nehirde yüzen bir şeye benziyor.", lumi: "İpucu: arılar onu çiçek nektarından yapar.", miko: "İpucu: beyaz, yumuşacık ve Japonya'dan geliyor.", rufi: "İpucu: tilkili ünlü bir masalı düşün.", pingo: "İpucu: minicik, pembe ve denizden geliyor.", dori: "İpucu: pofuduk ve ateşin yanında daha da lezzetli." },
    why: { germo: (n) => `${n} daha minicik bir tohumken ilk duyduğu koku, bahçedeki çileklerin kokusuydu.`, ondi: (n) => `${n} balığa bayılır, tıpkı bütün su samurları gibi. Bisküvi olsa bile!`, lumi: (n) => `Ateş böcekleri çiçek nektarına bayılır; bal da arıların yaptığı nektardır. ${n} onu bu yüzden çok seviyor!`, miko: (n) => `Onigiri bir bulut gibi beyaz ve yumuşacık. Tıpkı ${n} gibi!`, rufi: (n) => `Tilki ile üzüm masalını biliyor musun? ${n} üzümlere hep yetişir!`, pingo: (n) => `Denizde penguenler kril yer, yani minicik karidesler. ${n} için bu, evin tadı.`, dori: (n) => `${n} marshmallowları kendi minik alevinde kızartır. Bazen biraz yanarlar ama yine de çok lezzetliler.` },
    discT: (n) => `${n} en çok neyi seviyor, keşfettin!`, discHeart: "Artık atıştırmalık zamanında kalple işaretli.", discOk: "Harika!", favLegend: (n) => `${n} en çok bunu sever`,
    chatSecret: "En sevdiğim yiyecek mi? Bu bir sır! Bana farklı atıştırmalıklar ver, keşfedersin."
  }
};
const w20T = () => W20T[S.lang] || W20T.en;
Object.keys(T).forEach((l) => {
  const src = W20T[l] || W20T.en;
  T[l].items = T[l].items || {}; Object.assign(T[l].items, src.items);
  T[l].snacks = T[l].snacks || {}; Object.keys(src.snacks).forEach((k) => { if (!T[l].snacks[k]) T[l].snacks[k] = src.snacks[k]; });
});

/* ---------- Stato (con valori sicuri per i salvataggi vecchi) ---------- */
function w20() {
  if (!S.v20wear || typeof S.v20wear !== "object") S.v20wear = {};
  const w = S.v20wear;
  if (w.neck === undefined) w.neck = null; if (w.face === undefined) w.face = null;
  if (!w.seen || typeof w.seen !== "object") w.seen = {};
  return w;
}
function f20() {
  if (!S.v20food || typeof S.v20food !== "object") S.v20food = {};
  const f = S.v20food;
  if (!f.disc || typeof f.disc !== "object") f.disc = {};
  if (!f.tries || typeof f.tries !== "object") f.tries = {};
  return f;
}

/* ---------- Catalogo: prezzi in "giorni di gioco", sulla stessa scala dell'economia ---------- */
/* Quanti Tanì vale un giorno di gioco: si legge da EC.TYPICAL_DAY (98e_v20_econ.js). Senza, 75. */
const W20_TANI_DAY = (() => {
  const num = (v) => { const n = typeof v === "object" && v ? +(v.taniPerDay || v.perDay || v.TANI_DAY || v.dayTani || v.day || 0) : +v; return n > 0 ? n : 0; };
  let v = 0;
  try { if (!v && typeof window.W20_TANI_DAY_OVERRIDE !== "undefined") v = num(window.W20_TANI_DAY_OVERRIDE); } catch (e) { /* niente */ }
  try { if (!v && typeof EC !== "undefined" && EC) v = num(EC.TYPICAL_DAY); } catch (e) { /* niente */ }   /* 98e_v20_econ.js */
  try { if (!v && typeof TANI_PER_DAY !== "undefined") v = num(TANI_PER_DAY); } catch (e) { /* niente */ }
  try { if (!v && typeof TANI_DAY !== "undefined") v = num(TANI_DAY); } catch (e) { /* niente */ }
  try { if (!v && typeof ECON20 !== "undefined") v = num(ECON20); } catch (e) { /* niente */ }
  try { if (!v && typeof V20ECON !== "undefined") v = num(V20ECON); } catch (e) { /* niente */ }
  try { if (!v && typeof ECON !== "undefined") v = num(ECON); } catch (e) { /* niente */ }
  return v >= 20 && v <= 2000 ? v : 75;
})();
/* Fasce (giorni a ~75 Tanì): base 1–1,5 · comune 2,5–4 · raro 7–10 · epico 16–25 · leggendario 40–55.
   Ogni scala sale: il primo di ogni categoria è sempre alla portata. */
const W20_DAYS = {
  h_bucket: 1.3, h_cap: 3.2, h_tophat: 8.5, h_unicorn: 22,
  n_bandana: 1.2, n_scarf: 3, n_lei: 8, n_cape: 20, n_starcape: 50,
  f_round: 1.4, f_heart: 3.6, f_star: 9, f_monocle: 24, f_mask: 54
};
const W20_LADDER = { hat: ["h_bucket", "h_cap", "h_tophat", "h_unicorn"], neck: ["n_bandana", "n_scarf", "n_lei", "n_cape", "n_starcape"], face: ["f_round", "f_heart", "f_star", "f_monocle", "f_mask"] };
const W20_GIFT = "n_bowtie";
const W20_ACC = { n_bowtie: "neck" };   /* id -> slot (solo accessori, non i cappelli) */
W20_LADDER.neck.forEach((id) => { W20_ACC[id] = "neck"; }); W20_LADDER.face.forEach((id) => { W20_ACC[id] = "face"; });
const w20Rar = (d) => (d <= 1.5 ? "b" : d <= 4 ? "c" : d <= 10 ? "r" : d <= 25 ? "e" : "l");
/* Arrotondamento in su come l'economia (98e): 5 / 25 / 50 / 100 */
const w20Round = (n) => { const st = n < 300 ? 5 : n < 1000 ? 25 : n < 3000 ? 50 : 100; return Math.max(st, Math.ceil(n / st) * st); };
function w20Prices() {
  const out = {};
  Object.values(W20_LADDER).forEach((ids) => {
    let prev = 0;
    ids.forEach((id) => { let p = w20Round(W20_DAYS[id] * W20_TANI_DAY); if (p <= prev) p = w20Round(prev + 1); out[id] = p; prev = p; });
  });
  return out;
}
const W20_PRICE = w20Prices();
{
  if (typeof PRICE_TIER !== "undefined") { PRICE_TIER.b = PRICE_TIER.b || {}; PRICE_TIER.l = PRICE_TIER.l || {}; }
  Object.keys(W20_PRICE).forEach((id) => {
    if (SHOP.find((x) => x.id === id)) return;
    const rar = w20Rar(W20_DAYS[id]); const it = { id, kind: "wear", price: W20_PRICE[id], rar, v20: true };
    if (W20_ACC[id]) it.slot = W20_ACC[id];
    SHOP.push(it);
    if (typeof PRICE_TIER !== "undefined") { PRICE_TIER[rar] = PRICE_TIER[rar] || {}; PRICE_TIER[rar][id] = W20_PRICE[id]; }
  });
  if (!SHOP.find((x) => x.id === W20_GIFT)) SHOP.push({ id: W20_GIFT, kind: "wear", price: 0, special: true, gift20: true, rar: "b", v20: true, slot: "neck" });
}

/* ---------- Dove stanno collo e occhi, specie per specie (coordinate del disegno 200x200) ---------- */
/* ny = centro alto della fascia al collo, ns = scala (fascia larga 76 a 1), cb = fondo del mantello (y) ; ex/ey = occhi */
const W20_POS = {
  germo: { ny: 141, ns: 1.04, cb: 176, ex: [80, 120], ey: 116 },
  ondi: { ny: 133, ns: 0.9, cb: 178, ex: [80, 120], ey: 102 },
  lumi: { ny: 135, ns: 1.0, cb: 176, ex: [80, 120], ey: 112 },
  miko: { ny: 143, ns: 1.0, cb: 178, ex: [80, 120], ey: 108 },
  rufi: { ny: 144, ns: 0.96, cb: 178, ex: [80, 120], ey: 106 },
  pingo: { ny: 143, ns: 0.98, cb: 178, ex: [82, 118], ey: 102 },
  dori: { ny: 140, ns: 1.0, cb: 178, ex: [80, 120], ey: 106 }
};
/* Sciarpe/collari "di crescita" dei compagni Plus: con un accessorio al collo si tolgono (non si sovrappongono) */
const W20_STRIP = {
  miko: ['<path d="M66 146 Q100 162 134 146"', '<path d="M100 162 C94 155 90 160 94 164', '<circle cx="100" cy="161" r="6"', '<path d="M96 162 h8"'],
  rufi: ['<path d="M64 150 Q100 166 136 150', '<path d="M118 160 L128 180 L116 178 Z"', '<path d="M70 156 Q100 168 130 156"'],
  pingo: ['<path d="M62 146 Q100 162 138 146', '<path d="M76 150 v10 M90 154 v10', '<path d="M120 154 L128 176 L116 174 Z"']
};
const w20Strip = (o, pet) => {
  (W20_STRIP[pet] || []).forEach((pre) => { let k = o.indexOf(pre); while (k >= 0) { const e = o.indexOf("/>", k); if (e < 0) break; o = o.slice(0, k) + o.slice(e + 2); k = o.indexOf(pre); } });
  if (pet === "pingo") o = o.replace(/<g transform="translate\(124 158\)"><path d="M0 -7 V7[^>]*\/><\/g>/g, "");
  return o;
};

/* ---------- Disegni: piccoli aiuti ---------- */
const w1 = (n) => +n.toFixed(2);
const w20Star = (x, y, r, k = 0.46, rot = 0) => { let d = ""; for (let i = 0; i < 10; i++) { const a = ((-90 + rot + i * 36) * Math.PI) / 180, rr = i % 2 ? r * k : r; d += (i ? "L" : "M") + w1(x + rr * Math.cos(a)) + " " + w1(y + rr * Math.sin(a)); } return d + "Z"; };
const w20Spark = (x, y, r, c, op = 1) => `<path d="M${x} ${w1(y - r)} Q${w1(x + r * 0.18)} ${w1(y - r * 0.18)} ${w1(x + r)} ${y} Q${w1(x + r * 0.18)} ${w1(y + r * 0.18)} ${x} ${w1(y + r)} Q${w1(x - r * 0.18)} ${w1(y + r * 0.18)} ${w1(x - r)} ${y} Q${w1(x - r * 0.18)} ${w1(y - r * 0.18)} ${x} ${w1(y - r)} Z" fill="${c}" opacity="${op}"/>`;
const w20Bloom = (x, y, r, c, mid) => [0, 72, 144, 216, 288].map((a) => `<circle cx="${w1(x + r * Math.cos(((a - 90) * Math.PI) / 180))}" cy="${w1(y + r * Math.sin(((a - 90) * Math.PI) / 180))}" r="${w1(r * 0.82)}" fill="${c}"/>`).join("") + `<circle cx="${x}" cy="${y}" r="${w1(r * 0.62)}" fill="${mid}"/>`;
/* fascia al collo: da -38 a 38, curva in giù fino a +8 al centro */
const NB = "M-38 0 Q0 16 38 0";
const w20Band = (c, w, hi = true, shade = true) => `${shade ? `<path d="M-38 ${w1(w * 0.16)} Q0 ${w1(16 + w * 0.16)} 38 ${w1(w * 0.16)}" stroke="#3A2510" stroke-opacity=".16" stroke-width="${w}" fill="none" stroke-linecap="round" transform="translate(0 1.4)"/>` : ""}<path d="${NB}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>${hi ? `<path d="M-33 ${w1(-w * 0.22)} Q0 ${w1(14.6 - w * 0.22)} 33 ${w1(-w * 0.22)}" stroke="#fff" stroke-opacity=".32" stroke-width="${w1(Math.max(1.1, w * 0.2))}" fill="none" stroke-linecap="round"/>` : ""}`;
const w20Q = (t) => [w1(38 * (2 * t - 1)), w1(32 * t * (1 - t))];
const w20Heart = (x, y, s = 1) => `M${x} ${w1(y + 9 * s)} C${w1(x - 9 * s)} ${w1(y + 4 * s)} ${w1(x - 14 * s)} ${w1(y - 1 * s)} ${w1(x - 12.5 * s)} ${w1(y - 6.5 * s)} C${w1(x - 11 * s)} ${w1(y - 11.5 * s)} ${w1(x - 4 * s)} ${w1(y - 12 * s)} ${x} ${w1(y - 6 * s)} C${w1(x + 4 * s)} ${w1(y - 12 * s)} ${w1(x + 11 * s)} ${w1(y - 11.5 * s)} ${w1(x + 12.5 * s)} ${w1(y - 6.5 * s)} C${w1(x + 14 * s)} ${w1(y - 1 * s)} ${w1(x + 9 * s)} ${w1(y + 4 * s)} ${x} ${w1(y + 9 * s)} Z`;

/* ---------- Accessori: front = davanti (sopra al corpo), back = dietro al corpo (solo mantelli) ---------- */
/* Tutti disegnati in coordinate locali: collo con centro (0,0) e fascia larga 76; viso con occhi a (-20,0) e (20,0) */
function w20CapeBack(h, body, fold, hem, extra = "") {
  const d = `M-34 -1 C-58 ${w1(h * 0.12)} -70 ${w1(h * 0.5)} -74 ${h} Q-60 ${h + 5} -46 ${h - 1} Q-30 ${h + 5} -14 ${h} L14 ${h} Q30 ${h + 5} 46 ${h - 1} Q60 ${h + 5} 74 ${h} C70 ${w1(h * 0.5)} 58 ${w1(h * 0.12)} 34 -1 Z`;
  return `<path d="${d}" fill="${body}"/><path d="M-74 ${h} Q-60 ${h + 5} -46 ${h - 1} Q-30 ${h + 5} -14 ${h} L14 ${h} Q30 ${h + 5} 46 ${h - 1} Q60 ${h + 5} 74 ${h}" stroke="${hem}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>${[1, -1].map((s) => `<path d="M${-58 * s} ${w1(h * 0.3)} C${-62 * s} ${w1(h * 0.55)} ${-63 * s} ${w1(h * 0.8)} ${-62 * s} ${h + 1}" stroke="${fold}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/><path d="M${-38 * s} 1 C${-58 * s} ${w1(h * 0.14)} ${-68 * s} ${w1(h * 0.5)} ${-72 * s} ${h - 2}" stroke="#fff" stroke-opacity=".18" stroke-width="2" fill="none" stroke-linecap="round"/>`).join("")}${extra}`;
}
const W20_ART = {
  n_bowtie: {
    front: () => {
      const wing = `<path d="M-1.5 -1 C-6 -7.5 -15.5 -10.5 -19 -6.8 C-21.6 -3.8 -21.6 3.8 -19 6.8 C-15.5 10.5 -6 7.5 -1.5 1 Z" fill="#F07C6C"/><path d="M-1.5 1 C-6 7.5 -15.5 10.5 -19 6.8 C-20.4 5.2 -21 3 -21.3 0.8 C-15.5 3.6 -8 3.4 -1.5 1 Z" fill="#B8402F" opacity=".22"/>${[[-14, -3.4, 1.7], [-8.6, 1.6, 1.5], [-16.4, 3.6, 1.3], [-10.5, -6, 1.1]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFF3E8"/>`).join("")}<path d="M-5.4 -2.6 L-9.6 -4.4 M-5.4 2.6 L-9.6 4.4" stroke="#C24C3D" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>`;
      return `${w20Band("#D65A4C", 4, false)}<g transform="translate(0 9)"><ellipse cx="0" cy="8.5" rx="17" ry="2.6" fill="#3A2510" opacity=".12"/>${wing}<g transform="scale(-1 1)">${wing}</g><rect x="-4.6" y="-5" width="9.2" height="10" rx="3.4" fill="#D65A4C"/><path d="M-2.2 -2.8 h3.4" stroke="#fff" stroke-opacity=".55" stroke-width="1.3" stroke-linecap="round"/></g>`;
    },
    icon: { vb: "-25 -2 50 30" }
  },
  n_bandana: {
    front: () => `${w20Band("#3A6DBF", 6.4)}<path d="M-27 4.6 Q0 17.4 27 4.6 Q13.5 20 2.6 31.6 Q0 34 -2.6 31.6 Q-13.5 20 -27 4.6 Z" fill="#4F86D9"/><path d="M0 10.9 Q13.5 10.2 27 4.6 Q13.5 20 2.6 31.6 Q1.2 33 0 33.3 Z" fill="#1F3E7A" opacity=".12"/><path d="M-20.5 8.8 Q0 18.6 20.5 8.8 Q10.4 20.6 0 28.4 Q-10.4 20.6 -20.5 8.8 Z" fill="none" stroke="#fff" stroke-width="1.7" stroke-dasharray=".1 3.6" stroke-linecap="round" opacity=".92"/>${[[2.5, 0], [-2.5, 0], [0, 2.5], [0, -2.5]].map(([x, y]) => `<circle cx="${x}" cy="${w1(17.6 + y)}" r="2.1" fill="#fff"/>`).join("")}<circle cx="0" cy="17.6" r="1.3" fill="#F2C14E"/>${[[-12, 11.6], [12, 11.6], [0, 25]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#fff" opacity=".9"/>`).join("")}<path d="M-22 6.4 Q-12 11 -4 12.4" stroke="#fff" stroke-opacity=".28" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
    icon: { vb: "-44 -8 88 46" }
  },
  n_scarf: {
    front: () => `${w20Band("#E2654F", 12)}<path d="${NB}" stroke="#A8402F" stroke-opacity=".3" stroke-width="12" stroke-dasharray="1.5 4.3" fill="none"/><path d="M-30 4.6 Q0 17.6 30 4.6" stroke="#FFF1E2" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".9"/><g transform="translate(18.5 7.5) rotate(-11)"><rect x="-6.8" y="0" width="13.6" height="28" rx="3.2" fill="#E2654F"/><rect x="-6.8" y="0" width="5.2" height="28" rx="2.4" fill="#fff" opacity=".12"/><rect x="2.4" y="0" width="4.4" height="28" rx="2" fill="#7A2A1E" opacity=".14"/><rect x="-6.8" y="8" width="13.6" height="3.2" fill="#FFF1E2"/><rect x="-6.8" y="15" width="13.6" height="3.2" fill="#FFF1E2"/>${[-4.8, -1.6, 1.6, 4.8].map((x) => `<path d="M${x} 28 v4.6" stroke="#C8503B" stroke-width="2" stroke-linecap="round"/>`).join("")}</g><ellipse cx="17" cy="8" rx="8" ry="6.6" fill="#D85A46"/><path d="M11.5 6 Q17 3 22.5 6" stroke="#fff" stroke-opacity=".3" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M13 8 v4 M16.4 8.6 v4 M19.8 8 v4" stroke="#A8402F" stroke-opacity=".35" stroke-width="1.3" stroke-linecap="round"/>`,
    icon: { vb: "-46 -10 92 52" }
  },
  n_lei: {
    front: () => {
      const cols = [["#FF8FB1", "#FFD25E"], ["#FFD25E", "#F28A3C"], ["#FFFFFF", "#FF8FB1"], ["#B9A3F2", "#FFE7A0"]];
      let leaves = "", fl = "";
      for (let i = 0; i < 8; i++) { const [x, y] = w20Q((i + 0.5) / 8); leaves += `<ellipse cx="${x}" cy="${w1(y + 4.2)}" rx="3.6" ry="1.9" fill="${i % 2 ? "#5FA35C" : "#7FC27B"}" transform="rotate(${i % 2 ? 24 : -24} ${x} ${w1(y + 4.2)})"/>`; }
      for (let i = 0; i < 9; i++) { const [x, y] = w20Q(i / 8); const [c, m] = cols[i % 4]; fl += `<g>${w20Bloom(x, w1(y + 0.6), 3.5, c, m)}${c === "#FFFFFF" ? `<circle cx="${x}" cy="${w1(y + 0.6)}" r="5.8" fill="none" stroke="#E6D3C8" stroke-width=".6"/>` : ""}</g>`; }
      return `<path d="M-38 1.6 Q0 17.6 38 1.6" stroke="#3A2510" stroke-opacity=".14" stroke-width="8" fill="none" stroke-linecap="round" transform="translate(0 1.6)"/>${leaves}${fl}`;
    },
    icon: { vb: "-46 -10 92 32" }
  },
  n_cape: {
    back: (h) => w20CapeBack(h, "#D9483B", "#A8322A", "#F2C14E"),
    front: () => `${w20Band("#C23B30", 5.4)}<circle cx="0" cy="8.4" r="7" fill="#C9861F"/><circle cx="0" cy="7.8" r="6.4" fill="#F2C14E"/><path d="${w20Star(0, 8, 3.6, 0.46)}" fill="#FFF3C0"/><path d="M-3.6 4.6 A5 5 0 0 1 2 3.2" stroke="#fff" stroke-opacity=".6" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    icon: { vb: "-80 -6 160 56", h: 42 }
  },
  n_starcape: {
    back: (h) => w20CapeBack(h, "#2D3A7C", "#1E2758", "#F2C14E", [[-62, 0.46, 3.2], [-67, 0.82, 2.6], [-52, 0.2, 2.2], [62, 0.52, 3], [67, 0.86, 2.6], [52, 0.22, 2], [-58, 0.66, 1.8], [59, 0.74, 1.8]].map(([x, k, r], i) => i % 3 === 2 ? w20Spark(x, w1(h * k), r * 1.3, "#fff", 0.85) : `<path d="${w20Star(x, w1(h * k), r)}" fill="#FFD25E"/>`).join("") + [1, -1].map((s) => `<path d="M${-34 * s} -1 C${-58 * s} ${w1(h * 0.12)} ${-70 * s} ${w1(h * 0.5)} ${-74 * s} ${h}" stroke="#8B76E6" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join("")),
    front: () => `${w20Band("#3B4790", 5.6)}<path d="M-33 0.4 Q0 15 33 0.4" stroke="#F2C14E" stroke-width="1.1" stroke-dasharray="2.2 3" fill="none" stroke-linecap="round"/><circle cx="0" cy="8.4" r="7.2" fill="#C9861F"/><circle cx="0" cy="7.9" r="6.6" fill="#2D3A7C"/><path d="M1.4 2.6 A5.4 5.4 0 1 0 1.4 13.2 A4.2 4.2 0 1 1 1.4 2.6 Z" fill="#FFD25E"/>${w20Spark(3.4, 6, 1.8, "#fff", 0.95)}`,
    icon: { vb: "-80 -6 160 56", h: 42 }
  },
  f_round: {
    front: () => `${[-20, 20].map((x) => `<circle cx="${x}" cy="0" r="12" fill="#D6ECFF" fill-opacity=".2"/><circle cx="${x}" cy="0" r="12" fill="none" stroke="#7A4E33" stroke-width="2.8"/><path d="M${x - 8} -4.6 A9 9 0 0 1 ${x - 3.6} -8.6" stroke="#fff" stroke-width="1.8" opacity=".85" fill="none" stroke-linecap="round"/>`).join("")}<path d="M-8.2 -1.8 Q0 -6.4 8.2 -1.8" stroke="#7A4E33" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-31.6 -3 L-39 -5.6 M31.6 -3 L39 -5.6" stroke="#7A4E33" stroke-width="2.6" stroke-linecap="round"/>`,
    icon: { vb: "-42 -15 84 30" }
  },
  f_heart: {
    front: () => `${[-20, 20].map((x) => `<path d="${w20Heart(x, 0.6, 1.02)}" fill="#FF6F9C" fill-opacity=".42"/><path d="${w20Heart(x, 0.6, 1.02)}" fill="none" stroke="#E2457A" stroke-width="2.6" stroke-linejoin="round"/><path d="M${x - 9} -5 Q${x - 8} -8.4 ${x - 4.6} -8.6" stroke="#fff" stroke-width="1.7" opacity=".85" fill="none" stroke-linecap="round"/>`).join("")}<path d="M-6.4 -4.4 Q0 -7.6 6.4 -4.4" stroke="#E2457A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-32.4 -3.6 L-39.4 -6 M32.4 -3.6 L39.4 -6" stroke="#E2457A" stroke-width="2.4" stroke-linecap="round"/>`,
    icon: { vb: "-42 -15 84 28" }
  },
  f_star: {
    front: () => `${[-20, 20].map((x) => `<path d="${w20Star(x, 0.8, 15.2, 0.6)}" fill="#2E2A4F" fill-opacity=".9" stroke="#F2B33D" stroke-width="2.6" stroke-linejoin="round"/><path d="M${x - 6} -3.6 L${x - 2} -7.4 M${x - 5.6} 1 L${x + 1.4} -5.6" stroke="#fff" stroke-width="1.5" opacity=".7" stroke-linecap="round"/>`).join("")}<path d="M-8 -2.6 Q0 -6 8 -2.6" stroke="#F2B33D" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-34 -2 L-40 -4.6 M34 -2 L40 -4.6" stroke="#F2B33D" stroke-width="2.4" stroke-linecap="round"/>`,
    icon: { vb: "-42 -17 84 32" }
  },
  f_monocle: {
    front: () => `<circle cx="20" cy="0" r="12.6" fill="#E3F2FF" fill-opacity=".22"/><circle cx="20" cy="0" r="12.6" fill="none" stroke="#C9861F" stroke-width="3.4"/><circle cx="20" cy="0" r="12.6" fill="none" stroke="#F2C14E" stroke-width="2"/><circle cx="20" cy="0" r="10.6" fill="none" stroke="#FFE7A0" stroke-width=".8" opacity=".8"/><path d="M12 -4.6 A9 9 0 0 1 16.4 -8.6" stroke="#fff" stroke-width="1.8" opacity=".9" fill="none" stroke-linecap="round"/><path d="M31.4 6 C38 13 38.6 24 33.6 34" stroke="#E0A92E" stroke-width="2.2" stroke-dasharray=".1 3.3" stroke-linecap="round" fill="none"/><circle cx="33.4" cy="35.4" r="2.2" fill="#F2C14E" stroke="#C9861F" stroke-width=".8"/>`,
    icon: { vb: "4 -15 40 54" }
  },
  f_mask: {
    front: () => {
      const hole = (x) => `M${x - 9.6} 0.4 a9.6 10.4 0 1 0 19.2 0 a9.6 10.4 0 1 0 -19.2 0 Z`;
      const outer = "M-44 -10 C-36 -18.5 -14 -16.5 0 -9 C14 -16.5 36 -18.5 44 -10 C43 2 33 14 18 13.4 C10 13 4 8.6 0 6.6 C-4 8.6 -10 13 -18 13.4 C-33 14 -43 2 -44 -10 Z";
      return `<path d="M-40 -11 C-52 -20 -54 -38 -44 -50 C-43 -38 -40 -24 -37 -12 Z" fill="#FF8FB1"/><path d="M-41 -13 C-47 -24 -48 -36 -44 -46" stroke="#E2457A" stroke-width="1" fill="none" opacity=".7"/><path d="M-35 -13 C-40 -24 -38 -36 -30 -44 C-32 -34 -32 -22 -31 -13 Z" fill="#7FD3C8"/><path d="M-33.5 -14 C-35.5 -24 -34.5 -34 -31 -41" stroke="#3E9C90" stroke-width=".9" fill="none" opacity=".7"/><path d="${outer} ${hole(-20)} ${hole(20)}" fill="#6E54C4" fill-rule="evenodd"/><path d="M0 -9 C14 -16.5 36 -18.5 44 -10 C43 2 33 14 18 13.4 C10 13 4 8.6 0 6.6 Z ${hole(20)}" fill="#1E1250" fill-opacity=".14" fill-rule="evenodd"/><path d="${outer}" fill="none" stroke="#F2C14E" stroke-width="1.9" stroke-linejoin="round"/>${[-20, 20].map((x) => `<ellipse cx="${x}" cy="0.4" rx="9.6" ry="10.4" fill="none" stroke="#F2C14E" stroke-width="1.6"/>`).join("")}<path d="M-38 -8 C-34 -2 -33 4 -30 6 M38 -8 C34 -2 33 4 30 6" stroke="#F2C14E" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".85"/><path d="M-30 -12.6 C-22 -15 -12 -13 -4 -8.6" stroke="#fff" stroke-opacity=".3" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="0" cy="-6" r="3" fill="#FF7FA6" stroke="#F2C14E" stroke-width="1"/><circle cx="-0.9" cy="-6.9" r=".9" fill="#fff" opacity=".9"/>${w20Spark(38, -16, 2.6, "#FFE7A0")}${w20Spark(-24, -20, 1.8, "#FFE7A0", 0.9)}`;
    },
    icon: { vb: "-56 -52 104 68" }
  }
};
function w20Icon(id) {
  const a = W20_ART[id]; if (!a) return "";
  const h = a.icon.h || 0;
  return `<svg viewBox="${a.icon.vb}" aria-hidden="true">${a.back ? a.back(h) : ""}${a.front()}</svg>`;
}

/* ---------- Cappelli nuovi: b = linea della tesa, centro x = 100 ---------- */
Object.assign(HAT_ART, {
  h_bucket: (b) => `<g transform="rotate(-4 100 ${b})"><path d="M71 ${b + 1} C71 ${b - 29} 129 ${b - 29} 129 ${b + 1} Z" fill="#F6CF5F"/><path d="M116 ${b - 20} C124 ${b - 13} 128 ${b - 6} 129 ${b + 1} L119 ${b + 1} C120 ${b - 7} 119 ${b - 14} 116 ${b - 20} Z" fill="#000" opacity=".07"/><path d="M100 ${b - 23} V${b - 9}" stroke="#E2AE3A" stroke-width="1.2" stroke-dasharray="2 2.4"/><path d="M80 ${b - 10} C82 ${b - 18} 88 ${b - 23} 95 ${b - 24}" stroke="#fff" stroke-width="3" opacity=".42" fill="none" stroke-linecap="round"/><rect x="71" y="${b - 8.5}" width="58" height="7.5" fill="#EE8A63"/><path d="M72 ${b - 7} H128" stroke="#fff" stroke-opacity=".3" stroke-width="1.2"/><path d="M56 ${b + 7} C60 ${b - 3} 140 ${b - 3} 144 ${b + 7} C146 ${b + 11} 140 ${b + 14} 134 ${b + 13} C112 ${b + 9} 88 ${b + 9} 66 ${b + 13} C60 ${b + 14} 54 ${b + 11} 56 ${b + 7} Z" fill="#F2C24F"/><path d="M118 ${b + 2} C130 ${b + 3} 140 ${b + 5} 143 ${b + 8} C141 ${b + 12} 137 ${b + 13} 134 ${b + 13} C128 ${b + 11} 122 ${b + 10} 116 ${b + 10} Z" fill="#000" opacity=".06"/><path d="M62 ${b + 8} C84 ${b + 3} 116 ${b + 3} 138 ${b + 8}" stroke="#D9A23A" stroke-width="1.2" stroke-dasharray="2.4 2.6" fill="none"/><g transform="translate(83 ${b - 4.8})">${[0, 51, 103, 154, 206, 257, 309].map((a) => `<ellipse cx="0" cy="-3.9" rx="1.9" ry="3.6" fill="#fff" transform="rotate(${a})"/>`).join("")}<circle r="2.5" fill="#F2B33D"/></g></g>`,
  h_cap: (b) => `<path d="M64 ${b + 2} C64 ${b - 38} 136 ${b - 38} 136 ${b + 2} Z" fill="#E2654F"/><path d="M120 ${b - 24} C130 ${b - 16} 136 ${b - 8} 136 ${b + 2} L126 ${b + 2} C126 ${b - 8} 124 ${b - 16} 120 ${b - 24} Z" fill="#000" opacity=".08"/><path d="M100 ${b - 33} C111 ${b - 28} 119 ${b - 16} 121 ${b + 1} M100 ${b - 33} C89 ${b - 28} 81 ${b - 16} 79 ${b + 1}" stroke="#C8503B" stroke-width="1.6" fill="none"/><path d="M73 ${b - 10} C75 ${b - 20} 81 ${b - 27} 89 ${b - 30}" stroke="#fff" stroke-width="3" opacity=".3" fill="none" stroke-linecap="round"/><path d="${w20Star(100, b - 13, 7, 0.48)}" fill="#FFF4EE"/><path d="M64 ${b + 2} Q100 ${b - 4} 136 ${b + 2}" stroke="#C8503B" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="100" cy="${b - 34}" r="3.6" fill="#C8503B"/><path d="M68 ${b - 1} C56 ${b - 2} 41 ${b + 1} 34 ${b + 7} C42 ${b + 12.5} 60 ${b + 10.5} 77 ${b + 4} Z" fill="#C8503B"/><path d="M40 ${b + 6} C48 ${b + 2} 58 ${b + 1} 66 ${b + 1}" stroke="#fff" stroke-opacity=".25" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M36 ${b + 8.4} C46 ${b + 12} 62 ${b + 9.6} 76 ${b + 4.4}" stroke="#7A2A1E" stroke-opacity=".25" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  h_tophat: (b) => `<g transform="rotate(-7 100 ${b})"><ellipse cx="100" cy="${b + 2}" rx="38" ry="7.5" fill="#2E2740"/><path d="M78 ${b + 1} C77 ${b - 16} 78 ${b - 36} 80 ${b - 50} L120 ${b - 50} C122 ${b - 36} 123 ${b - 16} 122 ${b + 1} Z" fill="#3E3554"/><path d="M112 ${b - 50} L120 ${b - 50} C122 ${b - 36} 123 ${b - 16} 122 ${b + 1} L114 ${b + 1} C115 ${b - 16} 114 ${b - 36} 112 ${b - 50} Z" fill="#000" opacity=".16"/><path d="M85.5 ${b - 44} C84.6 ${b - 32} 84.6 ${b - 22} 85.4 ${b - 17}" stroke="#fff" stroke-width="3" opacity=".16" stroke-linecap="round" fill="none"/><ellipse cx="100" cy="${b - 50}" rx="20" ry="4.2" fill="#544A70"/><path d="M77.6 ${b - 14.5} L122.4 ${b - 14.5} L122.6 ${b - 4} L77.4 ${b - 4} Z" fill="#F28AA8"/><path d="M78 ${b - 12.6} H122" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/><g transform="translate(112 ${b - 9.4})">${w20Bloom(0, 0, 3.6, "#FFF4EE", "#F2B33D")}</g><path d="M62 ${b + 2} A38 7.5 0 0 0 138 ${b + 2} Q100 ${b + 5.4} 62 ${b + 2} Z" fill="#2E2740"/><path d="M70 ${b + 5} Q100 ${b + 10} 130 ${b + 5}" stroke="#fff" stroke-opacity=".14" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`,
  h_unicorn: (b) => `<path d="M64 ${b + 2} Q100 ${b - 26} 136 ${b + 2}" stroke="#C9B6F2" stroke-width="5.5" fill="none" stroke-linecap="round"/><path d="M67 ${b - 0.4} Q100 ${b - 27} 133 ${b - 0.4}" stroke="#fff" stroke-width="1.4" opacity=".55" fill="none" stroke-linecap="round"/><path d="M90 ${b - 11} C92 ${b - 30} 97 ${b - 48} 102 ${b - 62} C106 ${b - 48} 110 ${b - 30} 111 ${b - 11} Q100.5 ${b - 6} 90 ${b - 11} Z" fill="#FFF3D6" stroke="#EBCB86" stroke-width="1.3" stroke-linejoin="round"/><path d="M102 ${b - 62} C106 ${b - 48} 110 ${b - 30} 111 ${b - 11} Q106 ${b - 8.6} 101 ${b - 8.4} C104 ${b - 26} 104 ${b - 44} 102 ${b - 62} Z" fill="#E9B85E" opacity=".18"/><path d="M91.6 ${b - 19} Q101 ${b - 14.6} 110.2 ${b - 22} M93.6 ${b - 30} Q101.2 ${b - 26.6} 108.4 ${b - 33} M96.2 ${b - 41} Q101.6 ${b - 38.6} 106.2 ${b - 43.6} M99 ${b - 51} Q102 ${b - 50} 104.2 ${b - 53.4}" stroke="#F2C77E" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M95 ${b - 20} C96.4 ${b - 32} 98.4 ${b - 44} 101 ${b - 54}" stroke="#fff" stroke-width="1.4" opacity=".75" fill="none" stroke-linecap="round"/><ellipse cx="78" cy="${b - 9}" rx="5" ry="2.4" fill="#7FC27B" transform="rotate(-30 78 ${b - 9})"/><ellipse cx="124" cy="${b - 8}" rx="5" ry="2.4" fill="#6DB36A" transform="rotate(30 124 ${b - 8})"/>${w20Bloom(85, b - 14, 4.2, "#FFB3C7", "#FFD25E")}${w20Bloom(117, b - 13.4, 3.8, "#C9B6F2", "#FFF3C0")}${w20Bloom(127, b - 4.6, 2.6, "#9FD3F1", "#fff")}${w20Spark(118, b - 54, 4, "#FFD25E")}${w20Spark(84, b - 44, 3, "#B9A3F2")}${w20Spark(124, b - 36, 2.2, "#FF8FB1", 0.9)}`
});
Object.assign(HAT_VB, { h_bucket: "52 58 96 50", h_cap: "30 50 110 58", h_tophat: "54 34 92 72", h_unicorn: "60 26 80 72" });

/* ---------- Cosa indossa adesso (con la prova del negozio) ---------- */
let wearSub = "hat", w20Force = null;
function w20Look() {
  if (w20Force) return w20Force;
  const w = w20(); const o = { neck: w.neck, face: w.face };
  if (typeof tryId !== "undefined" && tryId && W20_ACC[tryId] && typeof tab !== "undefined" && tab === "home") o[W20_ACC[tryId]] = tryId;
  return o;
}
/* Inserisce gli accessori dentro il gruppo del corpo, così respirano e saltano con il compagno */
function w20Dress(o, pet, lk) {
  const P = W20_POS[pet]; if (!P) return o;
  const neck = lk.neck && W20_ART[lk.neck] ? W20_ART[lk.neck] : null, face = lk.face && W20_ART[lk.face] ? W20_ART[lk.face] : null;
  if (!neck && !face) return o;
  if (neck) o = w20Strip(o, pet);
  const k0 = o.indexOf('<g class="body"'); if (k0 < 0) return o;
  const open = o.indexOf(">", k0) + 1; if (!open) return o;
  const re = /<g[\s>]|<\/g>/g; re.lastIndex = k0; let depth = 0, end = -1, m;
  while ((m = re.exec(o))) { if (m[0] === "</g>") { depth--; if (depth === 0) { end = m.index; break; } } else depth++; }
  if (end < 0) return o;
  const tr = `translate(100 ${P.ny}) scale(${P.ns})`;
  const back = neck && neck.back ? `<g class="w20b" transform="${tr}">${neck.back(w1((P.cb - P.ny) / P.ns))}</g>` : "";
  const fk = (P.ex[1] - P.ex[0]) / 40;
  const front = (neck ? `<g class="w20n" transform="${tr}">${neck.front()}</g>` : "") + (face ? `<g class="w20f" transform="translate(${(P.ex[0] + P.ex[1]) / 2} ${P.ey}) scale(${w1(fk)})">${face.front()}</g>` : "");
  return o.slice(0, open) + back + o.slice(open, end) + front + o.slice(end);
}
const _petInnerW20 = petInner;
petInner = function (pet, e, hat, st, glow) {
  const o = _petInnerW20(pet, e, hat, st, glow);
  try { if (!pet || (pet !== S.pet && !w20Force)) return o; const lk = w20Look(); if (!lk.neck && !lk.face) return o; return w20Dress(o, pet, lk); } catch (err) { return o; }
};
const _itemArtW20 = itemArt;
itemArt = function (id) { if (W20_ART[id]) return w20Icon(id); return _itemArtW20(id); };

/* ---------- Negozio: prova, acquisto, uso ---------- */
const _lookWithW20 = lookWith;
lookWith = function (id) { return _lookWithW20(id && W20_ACC[id] ? null : id); };
const _inUseItemW20 = inUseItem;
inUseItem = function (s) { if (s && W20_ACC[s.id]) return w20()[W20_ACC[s.id]] === s.id; return _inUseItemW20(s); };
const _applyItemW20 = applyItem;
applyItem = function (s) { if (s && W20_ACC[s.id]) { w20()[W20_ACC[s.id]] = s.id; return; } _applyItemW20(s); };

const W20_SUBICON = {
  hat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 16c0-5 3-9 7-9s7 4 7 9"/><path d="M3.5 16.5h17"/><circle cx="12" cy="5" r="1.6"/></svg>',
  neck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.6 12 4.5 8.4v7.2L10.6 12Z"/><path d="M13.4 12l6.1-3.6v7.2L13.4 12Z"/><rect x="10.4" y="10.3" width="3.2" height="3.4" rx="1"/></svg>',
  face: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="13" r="3.6"/><circle cx="17" cy="13" r="3.6"/><path d="M10.6 12.4q1.4-1 2.8 0M3.4 12 2 10.4M20.6 12 22 10.4"/></svg>'
};
const W20_NONE = '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M7 17L17 7"/></svg>';
function w20WearGrid() {
  const t = L(), x = w20T(), w = w20(); const sub = ["hat", "neck", "face"].includes(wearSub) ? wearSub : "hat";
  const chips = `<div class="w20sub" role="tablist" aria-label="${esc(t.shopWear)}">${["hat", "neck", "face"].map((k) => `<button role="tab" aria-selected="${sub === k}" data-w20sub="${k}">${W20_SUBICON[k]}<span>${esc(x.sub[k])}</span>${k !== "hat" && !w.seen[k] ? '<i class="w20new" aria-hidden="true"></i>' : ""}</button>`).join("")}</div>`;
  const all = shopList("wear");
  let list = all.filter((s) => (sub === "hat" ? !W20_ACC[s.id] : W20_ACC[s.id] === sub));
  if (sub === "neck") list = list.filter((s) => s.gift20).concat(list.filter((s) => !s.gift20));
  const cur = sub === "hat" ? S.hat : w[sub];
  const none = sub === "hat"
    ? `<button class="item" aria-pressed="${!S.hat}" data-wear=""><span class="art">${W20_NONE}</span><span class="nm">${t.none}</span><span class="state">${!S.hat ? t.using : t.use}</span></button>`
    : `<button class="item" aria-pressed="${!cur}" data-w20none="${sub}"><span class="art">${W20_NONE}</span><span class="nm">${t.none}</span><span class="state">${!cur ? t.using : t.use}</span></button>`;
  return `${chips}<div class="grid3 w20grid" data-sub="${sub}">${none}${list.map(shopItem).join("")}</div>`;
}
function w20DivEnd(h, start) {
  const re = /<div[\s>]|<\/div>/g; re.lastIndex = start; let d = 0, m;
  while ((m = re.exec(h))) { if (m[0] === "</div>") { d--; if (d === 0) return m.index + 6; } else d++; }
  return -1;
}
/* Il papillon di benvenuto non si compra: arriva in regalo */
const w20GiftTag = (h, s) => (s && s.gift20 && !S.owned.includes(s.id) ? h.replace(`<span class="tag">${L().specialOnly}</span>`, `<span class="tag">${esc(w20T().gOnly)}</span>`) : h);
const _shopItemW20 = shopItem;
shopItem = function (s) { return w20GiftTag(_shopItemW20(s), s); };
const _tryBarW20 = tryBar;
tryBar = function () { const s = typeof tryId !== "undefined" && tryId && SHOP.find((x) => x.id === tryId); return w20GiftTag(_tryBarW20(), s); };
const _viewHomeW20 = viewHome;
viewHome = function () {
  const h = _viewHomeW20();
  if (homeTab !== "wear") return h;
  try {
    const i = h.indexOf('data-wear=""'); if (i < 0) return h;
    const gs = h.lastIndexOf('<div class="grid3">', i); if (gs < 0) return h;
    const ge = w20DivEnd(h, gs); if (ge < 0) return h;
    return h.slice(0, gs) + w20WearGrid() + h.slice(ge);
  } catch (e) { return h; }
};
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.dataset.w20sub) {
    ev.stopImmediatePropagation(); const k = b.dataset.w20sub; if (!["hat", "neck", "face"].includes(k)) return;
    wearSub = k; tryId = null; if (k !== "hat") { w20().seen[k] = 1; save(); }
    SND.play("click"); keepScroll(render); return;
  }
  if (b.dataset.w20none) {
    ev.stopImmediatePropagation(); const k = b.dataset.w20none; if (k !== "neck" && k !== "face") return;
    tryId = null; w20()[k] = null; save(); SND.play("pop"); keepScroll(render); return;
  }
  if (b.dataset.shop && W20_ACC[b.dataset.shop]) {
    const s = SHOP.find((x) => x.id === b.dataset.shop); if (!s || !ownsItem(s)) return; /* non ancora suo: la prova la gestisce il negozio */
    ev.stopImmediatePropagation(); tryId = null; const w = w20(); const k = W20_ACC[s.id];
    w[k] = w[k] === s.id ? null : s.id; save(); SND.play("pop"); keepScroll(render); jump(false); burst("star", 6); return;
  }
}, true);

/* ---------- Regalo di benvenuto: un accessorio "base", una volta sola ---------- */
let w20Quiet = 0;
function w20GiftReady() {
  if (!S.pet) return false;
  if (layer.innerHTML || document.querySelector(".overlay") || document.getElementById("trParty")) return false;
  if ((typeof tutOn !== "undefined" && tutOn) || (typeof pendingWelcome !== "undefined" && pendingWelcome)) return false;
  if ((S.tut || 0) < 99 || S.away || document.hidden) return false;
  if (typeof tab !== "undefined" && !["today", "home"].includes(tab)) return false;
  return true;
}
function w20GiftCheck() {
  const w = w20(); if (w.gift || !S.pet) return;
  if (S.owned.includes(W20_GIFT)) { w.gift = "owned"; save(); return; }
  if (window.__TEST_NOLAUNCH || window.__TEST_NOGIFT20) return;
  if (!w20GiftReady()) { w20Quiet = 0; return; }
  if (++w20Quiet < 2) return; /* due controlli tranquilli di fila: non si sovrappone ad altri regali */
  w20OpenGift();
}
function w20OpenGift() {
  const w = w20(); const t = L(), x = w20T(); const n = S.petName || "";
  if (!S.owned.includes(W20_GIFT)) S.owned.push(W20_GIFT);
  w.gift = dkey(); save(); trackOnce("regalo-accessorio");
  w20Force = { neck: W20_GIFT, face: w.face };
  let pet = ""; try { pet = petSVG(S.pet, "amore", S.hat, stage(), n); } finally { w20Force = null; }
  const box = `<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="108" rx="34" ry="5" fill="#3A2510" opacity=".14"/><g class="w20gbox"><rect x="24" y="52" width="72" height="52" rx="8" fill="#F07C6C"/><rect x="24" y="52" width="72" height="52" rx="8" fill="#000" opacity=".06" transform="translate(40 0) scale(.45 1)"/><rect x="53" y="52" width="14" height="52" fill="#FFD25E"/>${[[36, 66], [82, 70], [40, 92], [80, 94]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="3" fill="#FFF3E8"/>`).join("")}</g><g class="w20glid"><rect x="18" y="38" width="84" height="18" rx="6" fill="#F58A7B"/><rect x="53" y="38" width="14" height="18" fill="#FFD25E"/><path d="M60 38 C50 22 34 24 38 34 C41 40 54 40 60 38 Z M60 38 C70 22 86 24 82 34 C79 40 66 40 60 38 Z" fill="#FFD25E" stroke="#E9A23B" stroke-width="1.6"/><circle cx="60" cy="37" r="4" fill="#E9A23B"/></g></svg>`;
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="w20gT"><div class="box card wgbox w20gift"><span class="w20gtag">${esc(x.gTag)}</span><div class="w20gstage"><div class="w20gpet">${pet}</div><div class="w20gpack">${box}</div></div><h2 id="w20gT">${esc(x.gT(n))}</h2><p>${esc(x.gP(n, t.homeT, t.shopWear))}</p><div class="w20gitem"><span class="w20gart">${w20Icon(W20_GIFT)}</span><b>${esc(t.items[W20_GIFT])}</b></div><button class="btn" id="w20Wear">${esc(x.gWear)}</button><button class="link" id="w20Later">${esc(x.gLater)}</button></div></div>`;
  const pk = layer.querySelector(".w20gpack"), pp = layer.querySelector(".w20gpet"), bx = layer.querySelector(".w20gift");
  SND.play("jingle"); /* si apre da sola: vibra solo se la persona ha gia' toccato lo schermo (altrimenti il browser la blocca con un avviso) */
  try { if (SND.haptic && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) SND.haptic([15, 40, 25]); } catch (e) { /* niente */ }
  if (anim && G) {
    const lite = typeof liteOn === "function" && liteOn();
    G.set(pp, { scale: 0.3, opacity: 0 });
    G.timeline()
      .from(bx, { y: 24, opacity: 0, duration: 0.35, ease: "power2.out" })
      .to(pk, { rotation: -6, duration: 0.09, repeat: lite ? 1 : 3, yoyo: true, ease: "sine.inOut" }, "+=.15")
      .to(pk.querySelector(".w20glid"), { y: -40, rotation: -18, opacity: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "power2.out" })
      .to(pk, { scale: 0.4, opacity: 0, duration: 0.25, ease: "power2.in" }, "<.1")
      .to(pp, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2)", onStart: () => { SND.play("sparkle"); burst("heart", lite ? 4 : 8, layer.querySelector(".w20gstage")); } }, "<.05");
  } else { if (pk) pk.remove(); }
}
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "w20Wear") { ev.stopImmediatePropagation(); w20().neck = W20_GIFT; save(); closeLayer(); render(); SND.play("pop"); setTimeout(() => { jump(true); burst("heart", 8); setExpr("amore", 2000); }, 120); return; }
  if (b.id === "w20Later") { ev.stopImmediatePropagation(); SND.play("click"); closeLayer(); return; }
}, true);
setInterval(() => { if (document.hidden) return; try { w20GiftCheck(); } catch (e) { /* niente */ } }, 2500); /* app in background: nessun lavoro */

/* ---------- Cibo: 6 merende nuove ---------- */
Object.assign(SNACK_ART, {
  onigiri: '<ellipse cx="20" cy="35" rx="12" ry="2" fill="#3A2510" opacity=".12"/><path d="M20 6.5 C23.6 6.5 33.6 23 34 27.6 C34.4 32.2 30 34 20 34 C10 34 5.6 32.2 6 27.6 C6.4 23 16.4 6.5 20 6.5 Z" fill="#FFFDF7" stroke="#E2DACB" stroke-width="1.3"/><path d="M28.5 18 C31.5 22.6 33.8 26.4 34 28 C34.2 31 32.4 32.8 28 33.5 C30.4 29 30.2 23 28.5 18 Z" fill="#E9E1D2" opacity=".7"/>' + [[22, 13.5], [25.4, 19], [16.4, 18.6], [28.6, 24.4], [11.6, 25], [19.6, 21.6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry=".8" fill="#E8E0CF"/>`).join("") + '<rect x="13.4" y="23.4" width="13.2" height="10.8" rx="1.6" fill="#2E4A3B"/><path d="M15.6 25.6 v6.4" stroke="#6E8F79" stroke-width="1.2" stroke-linecap="round"/><path d="M13.4 27.6 h13.2" stroke="#000" stroke-opacity=".12" stroke-width=".8"/><path d="M14 16.4 C15.4 13.2 17 11 18.6 9.6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
  grapes: '<path d="M20.5 9.5 q1 -4 4.4 -5.4" stroke="#6B4A30" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 8.4 q7.4 -5.4 11.4 0 q-6.4 4.4 -11.4 0 Z" fill="#6DB36A"/><path d="M23.4 8.2 q4.4 -1.6 8.6 0" stroke="#4E8A4A" stroke-width=".9" fill="none"/>' + [[13, 13.4], [19.6, 12.6], [26.2, 13.4], [10.4, 19.4], [16.4, 19.8], [22.8, 19.8], [28.8, 19.2], [13.6, 26], [19.8, 26.2], [26, 25.8], [16.8, 32], [22.8, 32]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4.3" fill="${i % 3 === 1 ? "#A06BD6" : "#8E5BC7"}" stroke="#6F3FA8" stroke-width=".8"/><circle cx="${w1(x - 1.4)}" cy="${w1(y - 1.5)}" r="1.2" fill="#fff" opacity=".55"/>`).join(""),
  shrimp: '<ellipse cx="20" cy="35.4" rx="11" ry="1.8" fill="#3A2510" opacity=".1"/><path d="M27.6 11.2 C15.6 9 8.4 17 10 25 C11.4 30.4 16.8 32.4 22.4 30.4" stroke="#F58D6A" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M27.6 11.2 C15.6 9 8.4 17 10 25 C11.4 30.4 16.8 32.4 22.4 30.4" stroke="#D9603F" stroke-opacity=".5" stroke-width="8.4" stroke-dasharray="1.1 4.4" fill="none"/><path d="M25 13.2 C16.4 12.4 12.4 18 13.2 24" stroke="#FFC9B2" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M14.4 21.4 l-3.4 1.4 M15.6 25.6 l-2.8 2.4 M18.2 18.2 l-3 .4" stroke="#E46F4E" stroke-width="1.1" stroke-linecap="round"/><path d="M21.2 29 C25.4 25.8 29.4 26.4 31.4 28.6 C29.4 30 27.8 30.6 26.2 30.8 C28.2 32 29.6 33.6 30.2 35.6 C27 35.6 23.6 33.6 21 31.6 Z" fill="#E8704F"/><circle cx="28.6" cy="11.6" r="4.8" fill="#F58D6A"/><circle cx="29.8" cy="10.4" r="1.3" fill="#3A2510"/><circle cx="30.2" cy="10" r=".4" fill="#fff"/><path d="M31.6 8.8 C34.4 5.6 36.6 5.4 38.4 6.4 M32.2 11.6 C35.4 10.6 37.4 11.4 38.8 13.4" stroke="#E46F4E" stroke-width="1.1" fill="none" stroke-linecap="round"/>',
  marshmallow: '<ellipse cx="20" cy="36" rx="9" ry="1.6" fill="#3A2510" opacity=".1"/><g transform="rotate(18 20 22)"><path d="M20 37 V24" stroke="#A9744A" stroke-width="2.8" stroke-linecap="round"/><path d="M19.2 35.6 V27" stroke="#fff" stroke-opacity=".25" stroke-width=".9" stroke-linecap="round"/><rect x="10.5" y="6" width="19" height="18" rx="6.4" fill="#FFF6F2"/><path d="M10.5 15 Q20 18.6 29.5 15 V24 Q20 26 10.5 24 Z" fill="#FFE3EA" opacity=".8"/><path d="M10.5 13.6 V12.4 Q10.5 6 16.9 6 H23.1 Q29.5 6 29.5 12.4 V13.6 Q25 16.2 20 14.8 Q15 16.4 10.5 13.6 Z" fill="#EDAE62"/><path d="M12.6 9.6 Q15 6.8 19 6.6" stroke="#B97A3A" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="23.4" cy="9.8" r="1" fill="#B97A3A"/><circle cx="26.4" cy="12.2" r=".8" fill="#B97A3A"/><circle cx="17.2" cy="11.8" r=".8" fill="#C98A45"/><path d="M13.4 18.4 V21.6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></g><path d="M31.8 4.6 q1.6 2.2 0 4.2 q2.9 -.7 2.9 -3.4 q0 -1.8 -1.6 -3.1 q.2 1.6 -1.3 2.3 Z" fill="#FFB347"/><path d="M32.6 6.4 q.7 1 0 1.9 q1.3 -.3 1.3 -1.5" fill="#FFE08A"/>',
  watermelon: '<g transform="rotate(-10 20 22)"><path d="M4.6 14 A15.4 15.4 0 0 0 35.4 14 Z" fill="#4E9F4B"/><path d="M6.4 15.6 A13.6 13.6 0 0 0 33.6 15.6" stroke="#3E8A3C" stroke-width="1" fill="none" stroke-dasharray="2.4 2"/><path d="M7.2 14 A12.8 12.8 0 0 0 32.8 14 Z" fill="#EAF5DA"/><path d="M9 14 A11 11 0 0 0 31 14 Z" fill="#F2545B"/><path d="M9 14 H31" stroke="#F77C80" stroke-width="1.4"/><path d="M12 16.6 A8.6 8.6 0 0 0 16.4 22.4" stroke="#fff" stroke-opacity=".3" stroke-width="1.6" fill="none" stroke-linecap="round"/>' + [[14.6, 16.6], [20, 19.6], [25.4, 16.6], [17.4, 22], [22.6, 22]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx=".95" ry="1.6" fill="#3A2A2A"/>`).join("") + "</g>",
  carrotcake: '<ellipse cx="20" cy="34.4" rx="14" ry="2" fill="#3A2510" opacity=".12"/><path d="M6 22.6 L32 15.6 L32 32.6 L6 32.6 Z" fill="#D9934E"/><path d="M6 27.6 L32 22.8" stroke="#FFF4E6" stroke-width="2.8"/><path d="M6 30.2 L32 28.4" stroke="#C47E3C" stroke-width="1" opacity=".5"/>' + [[11, 25], [17.4, 30.6], [24, 21.6], [27.6, 30], [14, 30.4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#F08A3C"/>`).join("") + '<path d="M32 15.6 L32 32.6 L28.4 32.6 L28.4 16.6 Z" fill="#000" opacity=".08"/><path d="M5 21.6 L32.4 14 Q34.2 14 34 16.2 L33.6 17 Q31.6 18.4 30.4 17.4 Q28.8 19.6 27.4 18.4 Q25.6 20.6 24 19.4 Q22.2 21.4 20.6 20.2 Q18.8 22.4 17 21.2 Q15 23.4 13.4 22.2 Q11.4 24.2 9.8 23 Q7.6 24.8 6 23.6 Q4.4 23.2 5 21.6 Z" fill="#FFF4E6"/><path d="M8 21.4 L30 15.4" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/><g transform="translate(22.6 13.2) rotate(28)"><path d="M-1.8 -4 L1.8 -4 L0 5 Z" fill="#F08A3C"/><path d="M-1.4 -1.6 h1.4 M-.6 1.2 h1.2" stroke="#D9762A" stroke-width=".7"/><path d="M0 -4 q-2.6 -2.6 -1.4 -4.4 q1.2 1.4 1.4 4.4 q.4 -3 2.6 -3.6 q-.2 2.2 -2.6 3.6" fill="#6DB36A"/></g>'
});
["onigiri", "grapes", "shrimp", "marshmallow", "watermelon", "carrotcake"].forEach((k) => { if (!SNACKS.includes(k)) SNACKS.push(k); });
/* Preferiti: uno per compagno, con un perché che si capisce */
Object.assign(FAV, { germo: "berries", ondi: "fish", lumi: "honey", miko: "onigiri", rufi: "grapes", pingo: "shrimp", dori: "marshmallow" });
const W20_OLDFAV = { germo: "berries", ondi: "fish", lumi: "honey" };
const w20Known = (pet) => !!(pet && f20().disc[pet]);
/* Chi aveva già dato da mangiare (e quindi vedeva il cuore) trova il preferito già scoperto, se non è cambiato */
(() => {
  try {
    const f = f20(); if (f.mig) return; f.mig = 1;
    if (S.pet && S.fed && W20_OLDFAV[S.pet] && FAV[S.pet] === W20_OLDFAV[S.pet]) f.disc[S.pet] = f.disc[S.pet] || "old";
    if (S.pet) save();
  } catch (e) { /* niente */ }
})();

const _openFeedW20 = openFeed;
openFeed = function () {
  _openFeedW20();
  try {
    const sh = layer.querySelector(".sheet"); const grid = sh && sh.querySelector(".snacks"); if (!grid) return;
    const x = w20T(), pet = S.pet, n = S.petName || "", fav = FAV[pet], known = w20Known(pet);
    sh.classList.add("w20feed");
    grid.querySelectorAll(".favdot").forEach((d) => { if (!known) d.remove(); });
    if (known) { const fb = grid.querySelector(`[data-snack="${fav}"]`); if (fb) { fb.classList.add("isfav"); fb.setAttribute("aria-label", `${L().snacks[fav]} · ${x.favLegend(n)}`); } }
    const tries = f20().tries[pet] || 0;
    const heart = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-8.6-9.2C2.4 7.6 4.6 4.6 7.6 4.6c1.9 0 3.4 1 4.4 2.6 1-1.6 2.5-2.6 4.4-2.6 3 0 5.2 3 4.2 6.2C19 15.6 12 20 12 20Z" fill="${known ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>`;
    const html = known ? `<p class="w20fh ok">${heart}<span>${esc(x.favLegend(n))}: <b>${esc(L().snacks[fav] || "")}</b></span></p>` : `<p class="w20fh">${heart}<span>${esc(x.hint(n))}</span></p>${tries >= 2 && x.clue[pet] ? `<p class="w20clue">${esc(x.clue[pet])}</p>` : ""}`;
    const sub = sh.querySelector("p.small.muted"); if (sub) sub.insertAdjacentHTML("afterend", html); else grid.insertAdjacentHTML("beforebegin", html);
  } catch (e) { /* niente */ }
};
const _feedSnackW20 = feedSnack;
feedSnack = function (k) {
  const pet = S.pet; let first = false;
  try {
    if (pet && feedLeft() > 0 && FAV[pet] && !w20Known(pet)) {
      const f = f20();
      if (FAV[pet] === k) { first = true; f.disc[pet] = dkey(); } else f.tries[pet] = (f.tries[pet] || 0) + 1;
    }
  } catch (e) { /* niente */ }
  _feedSnackW20(k);
  if (first) { save(); trackOnce("preferito-scoperto"); setTimeout(() => w20Discover(pet, k), anim ? 1750 : 450); }
};
function w20Discover(pet, k) {
  if (S.pet !== pet) return;
  const x = w20T(), n = S.petName || "", food = (L().snacks || {})[k] || "";
  if (layer.innerHTML) { toast(x.discT(n)); return; }
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="w20dT"><div class="box card wgbox w20disc"><div class="w20dart"><div class="w20dpet">${petSVG(S.pet, "amore", S.hat, stage(), n)}</div><div class="w20dfood">${snackSVG(k)}<i aria-hidden="true">♥</i></div></div><h2 id="w20dT">${esc(x.discT(n))}</h2><p class="w20dname">${esc(food)}</p><p class="w20dwhy">${esc(x.why[pet] ? x.why[pet](n) : "")}</p><p class="small muted">${esc(x.discHeart)}</p><button class="btn" id="closeLayer">${esc(x.discOk)}</button></div></div>`;
  SND.play("fanfare"); SND.haptic && SND.haptic([15, 40, 15, 40, 30]);
  if (anim && G) {
    const lite = typeof liteOn === "function" && liteOn();
    G.from(".w20disc", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(1.8)" });
    G.from(".w20dfood", { scale: 0, rotation: -30, duration: 0.5, delay: 0.25, ease: "back.out(2.4)" });
    G.from(".w20dfood i", { scale: 0, duration: 0.4, delay: 0.6, ease: "back.out(3)" });
    if (!lite) burst("confetti", 18, layer.querySelector(".w20dart"));
  }
}
/* Nella chiacchierata il preferito resta un segreto finché non lo scopri */
if (typeof chatReply === "function") {
  const _chatReplyW20 = chatReply;
  chatReply = function (raw) {
    const r = _chatReplyW20(raw);
    try {
      if (r && r.text && !r.intent && !r.crisis && S.pet && !w20Known(S.pet)) {
        const t = L(); const c = t.chat; let f = (t.snacks && t.snacks[FAV[S.pet]]) || "";
        if (S.lang !== "de") f = f.charAt(0).toLowerCase() + f.slice(1);
        if (c && typeof c.who === "function" && r.text === c.who(S.petName, f)) r.text = w20T().chatSecret;
      }
    } catch (e) { /* niente */ }
    return r;
  };
}
/* Un accessorio che non risulta più tuo (ripristino, altro dispositivo) non resta addosso */
/* 1.0.9 (fase 2): il controllo aspetta che tutti i file siano caricati (il mantello degli Introvabili arriva in 98ze) */
setTimeout(() => { try { const w = w20(); let ch = false; ["neck", "face"].forEach((k) => { if (w[k] && (!W20_ART[w[k]] || !S.owned.includes(w[k]))) { w[k] = null; ch = true; } }); if (ch) { save(); render(); } } catch (e) { /* niente */ } }, 0);
