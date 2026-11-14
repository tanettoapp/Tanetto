Object.assign(T.pt, {
  acts: { feed: "Lanche", play: "Brincar", talk: "Conversar", nap: "Soneca", wake: "Acordar", photo: "Foto" },
  joy: "Alegria",
  feedT: "O que você vai servir?", feedLeft: (n) => n === 1 ? "Mais 1 lanche hoje" : `Mais ${n} lanches hoje`, feedFull: "Estou de barriguinha cheia! Quem sabe mais tarde.",
  snacks: { apple: "Maçã", berries: "Morangos", cookie: "Biscoito", honey: "Mel", fish: "Biscoito de peixe", carrot: "Cenoura" },
  yum: ["Nham nham!", "Que gostoso!", "Obrigado, eu precisava!", "Delicioso!"], fav: "É o meu favorito! Obrigado!",
  gameT: "Pegue as estrelas", gameP: "Toque nas estrelas antes que elas caiam. As douradas valem 3 pontos!", gameStart: "Jogar", gameScore: (n) => `Pontos: ${n}`, gameEnd: (n) => (n === 1 ? "Você fez 1 ponto!" : `Você fez ${n} pontos!`), gameSeeds: (s) => s ? `+${s} Tanì` : "Você já pegou todos os Tanì do jogo de hoje, mas a diversão é sempre de graça!", gameAgain: "De novo!", gameBest: (n) => `Recorde: ${n}`,
  talkT: "Como você está se sentindo agora?", talkBreath: "Vamos respirar juntos por um minuto?", talkHelp: "Se precisar conversar com alguém, em Mais você encontra quem pode ajudar.", talkSaved: "Anotei no diário.", talkQ: "Como você está se sentindo agora?",
  talkReply: [
    ["Sinto muito. Estou aqui com você, nem que seja para ficarmos um pouco em silêncio juntos.", "Dias pesados passam. Enquanto isso, uma respiração de cada vez."],
    ["Acontece. Vamos fazer uma coisinha gentil para você?", "Tudo bem assim. Você não precisa estar no máximo todo dia."],
    ["Um dia normal também é um bom dia.", "Obrigado por me contar. Vamos seguindo com calma."],
    ["Que bom! Me dá vontade de pular.", "Fico feliz! Vamos guardar esse momento."],
    ["Oba! Hoje você é minha pessoa favorita mais do que nunca!", "Que alegria! Vamos fazer uma festinha?"]
  ],
  napSay: "Boa noite... zzz", wakeSay: "Que soneca boa! Estou de volta.",
  stroke: ["Hmm, que gostoso...", "Só mais um pouquinho!", "Estou me sentindo todo fofinho."],
  tickle: ["Haha, cócegas não!", "Hihihi, para, para!"],
  photoT: "Que foto linda!", photoMaking: "Revelando a foto...",
  letterT: "Uma carta para você", letterL: "Ler a carta do dia", letterSign: (n) => `Com carinho, ${n}`,
  letters: [
    "Oi! Estou muito feliz por te conhecer. A partir de hoje, a gente se faz companhia, um passo de cada vez.",
    "Ontem sonhei que voávamos acima das nuvens. Você ria muito. Que sonho lindo!",
    "Descobri uma coisa: quando você bebe um pouco de água, eu também me sinto mais fresquinho.",
    "Hoje não precisa fazer tudo. Fazer alguma coisa já basta. O resto pode esperar.",
    "Contei as estrelas da janela. Me perdi um pouco, mas me diverti mesmo assim.",
    "Sabe qual é a minha parte favorita do dia? Quando você chega.",
    "Uma semana juntos! Preparei um abraço enorme para você. Imagine bem apertado.",
    "Se hoje é um dia torto, tudo bem. Dias tortos também terminam.",
    "Tentei fazer biscoitos. Ficaram meio queimadinhos, mas feitos com carinho.",
    "Lembre de olhar para o céu pelo menos uma vez hoje. É de graça e é lindo.",
    "Aprendi a assobiar! Mais ou menos. Digamos que estou praticando.",
    "Obrigado por cuidar de você. Assim você cuida de mim também.",
    "Hoje vamos tentar uma coisa: diga uma frase gentil para você, como diria para alguém que você ama.",
    "Duas semanas juntos! Eu cresci, e você também já percorreu um bom caminho. Dá para ver.",
    "Eu gosto de chuva: ela faz as plantas crescerem e deixa tudo mais cheiroso.",
    "Arrumei meu quarto. Quer dizer, mudei uma meia de lugar. Já é um começo!",
    "Cada passinho conta. Até aqueles que ninguém vê.",
    "Ontem à noite a lua estava tão grande que parecia querer entrar pela janela.",
    "Se bater o cansaço, descanse. Descansar não é perder tempo.",
    "Adoro quando você me conta seu dia no diário. Nem que seja uma linha.",
    "Três semanas juntos! Você é uma pessoa especial. Nunca se esqueça disso."
  ],
  giftBig: (s) => `Presente do dia: +${s} Tanì!`,
  teaserT: "Volte amanhã!", teaserP: (s) => `O presente de amanhã vai valer +${s} Tanì. A cada 7 dias seguidos tem uma surpresa especial.`, visitL: (n) => n === 1 ? "1 dia de visita" : `${n} dias de visita seguidos`,
  specialT: "Presente especial!", specialP: (i) => `Tantos dias seguidos juntos: ${i} agora é seu!`, specialOnly: "Prêmio de dias seguidos",
  tut: [
    "Este é {n}! Toque para fazer um carinho, ou acaricie deslizando o dedo.",
    "Todo dia tem um presente, e ele fica maior se você voltar amanhã. Abra!",
    "Aqui você pode dar um lanche, brincar, conversar, colocar para dormir ou tirar uma foto.",
    "Estas são suas metas. Quando fizer uma, toque nela: {n} ganha energia e você ganha Tanì.",
    "Com a energia cheia, {n} sai numa aventura. Aqui embaixo ficam aventuras, casinha, diário e ajustes."
  ],
  tutNext: "Próximo", tutSkip: "Pular", tutDone: "Entendi!",
  privT: "Privacidade", privP: "O companheiro, as metas e o diário ficam neste aparelho. Se você criar uma conta, também salvamos seu e-mail e um backup do seu progresso, só para você recuperá-lo. Para melhorar o app, contamos algumas ações de forma anônima e agregada (por exemplo, quantas vezes ele é aberto). Tanetto não é uma ferramenta médica e é para todas as idades: abaixo da idade de consentimento digital do seu país (de 13 a 16 anos, conforme o país), os anúncios nunca são personalizados e o backup on-line não está disponível.",
  hapticL: "Vibração", trackL: "Tocando agora", tracks: ["Manhã de sol", "Passeio", "Chá quentinho", "Canção de ninar"],
  feedbackT: "Me diga o que achou", feedbackP: "Uma dica, um problema, uma ideia: cada mensagem ajuda a melhorar o Tanetto.", feedbackB: "Escrever uma mensagem",
  tomorrow: "Amanhã vou te preparar uma surpresa. Te espero!",
  idle: ["Sabia que as nuvens são feitas de gotinhas bem pequenas?", "Me veio uma musiquinha na cabeça... lá lá lá!", "Será que as estrelas se conhecem?", "Hoje estou me sentindo especialmente fofinho.", "Se eu fosse um biscoito, seria de chocolate.", "Já te disse que você tem talento para as coisas pequenas? Tem sim.", "Vi uma borboleta! Acho que ela me deu tchau.", "Às vezes eu só gosto de ficar aqui com você."]
});
T.pt.items.teddy = "Ursinho"; T.pt.items.fishbowl = "Peixinho dourado"; T.pt.items.w_stars = "Céu estrelado";
T.pt.talk.morning.push("Abri a janela: o ar tem cheiro de recomeço.", "Que tal um dia bem tranquilo?", "Vamos tomar café com calma, tá?");
T.pt.talk.day.push("Ei, você já bebeu um pouco de água?", "Tudo o que você faz por você é uma vitória.", "Estou aqui, passo a passo.");
T.pt.talk.evening.push("Hoje à noite sem pressa, prometo.", "Do que você gostou hoje?", "As luzinhas da noite são as minhas favoritas.");
T.pt.talk.night.push("Ainda de pé a essa hora? Vamos com calma.", "O travesseiro está esperando.", "Amanhã é outra chance bonita.");
T.pt.talk.pat.push("Que bom quando você está aqui!", "Mais um, por favor!", "Estou me sentindo quentinho.");
T.pt.talk.cheer.push("Boa! Mais um passo.", "Eu sabia que você ia conseguir.", "Que orgulho!");
