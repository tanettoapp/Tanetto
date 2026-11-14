/* v10 (pt): Temporada 0, trilha, desafios, festas, escudos, resumo, coleção, volta ao mundo */
Object.assign(T.pt, {
  rar: { b: "Básico", c: "Comum", r: "Raro", e: "Épico", l: "Lendário" },
  season: {
    names: { lanterns: "Temporada das Lanternas" }, zero: "Temporada 0", left: (d) => d === 1 ? "Falta 1 dia" : `Faltam ${d} dias`,
    tier: (n, m = 50) => `Etapa ${n} de ${m}`, passi: (n) => n === 1 ? "1 Passo" : `${n} Passos`, next: (n) => n === 1 ? "Falta 1 Passo para a próxima etapa" : `Faltam ${n} Passos para a próxima etapa`, open: "Abrir a trilha", pathT: "A trilha da temporada",
    how: "Você ganha Passos só cuidando de si: 10 por meta, 20 por dia completo, 100 por desafio da semana. Na semana de festa, eles valem o dobro.",
    free: "Para todos", gold: "Trilha dourada", claim: "Pegar", claimed: "Pego", toClaim: (n) => n === 1 ? "1 prêmio para pegar" : `${n} prêmios para pegar`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 escudo de sequência" : `${n} escudos de sequência`, got: (x) => `Você ganhou: ${x}!`,
    founder: "Fundador", founderP: "Você jogou a Temporada 0: este emblema e a lanterna dourada são seus para sempre.", fromPath: "Prêmio da trilha",
    goldLock: "A trilha dourada faz parte do Tanetto Plus", chapterT: (n) => `A história das lanternas · capítulo ${n}`,
    story: [
      "Hoje à noite, {n} encontrou uma lanterna de papel na porta. Dentro havia um bilhete: “Cada pequeno gesto gentil acende uma luz.” Quem será que deixou?",
      "Toda vez que você cuida de si, a lanterna brilha um pouquinho mais. {n} a pendurou na janela: dizem que, lá de fora, ela parece uma estrelinha.",
      "Hoje chegaram mais lanternas, uma para cada casa do bairro. Todo mundo se pergunta a mesma coisa: quem traz? {n} tem um palpite...",
      "Uma pista! Há pequenas pegadas douradas no parapeito da janela. {n} as segue até o lago, onde a água reflete mil luzinhas.",
      "No lago, {n} conhece a Guardiã das Lanternas, uma senhora vaga-lume muito gentil. “As lanternas se acendem com o carinho que cada um coloca nos seus dias”, ela diz sorrindo.",
      "É a noite da grande festa: todas as lanternas sobem juntas para o céu. A sua é uma das mais brilhantes, porque você a acendeu dia após dia. Obrigado por esta temporada juntos."
    ]
  },
  wk: {
    T: "Desafio da semana", goals: (n) => `Complete ${n} metas nesta semana`, days: (n) => `Complete pelo menos 2 metas em ${n} dias diferentes`, full: (n) => `Complete todas as metas do dia em ${n} dias`, cat: (n, c) => `Complete ${n} metas da categoria «${c}»`,
    prog: (a, b) => `${a} de ${b}`, reward: (t, p) => `Prêmio: ${t} Tanì e ${p} Passos`, claim: "Pegar prêmio", done: "Desafio concluído! O próximo chega na segunda.", ends: (d) => d <= 1 ? "Último dia" : `Termina em ${d} dias`
  },
  festa: { P: "Semana de festa: os Passos valem o dobro!", names: ["Festa dos Recomeços", "Festa dos Abraços", "Festa dos Brotinhos", "Festa das Pipas", "Festa das Flores", "Festa dos Vaga-lumes", "Festa do Mar", "Festa das Estrelas Cadentes", "Festa dos Cadernos Novos", "Festa das Folhas", "Festa das Cobertas", "Festa das Luzinhas"] },
  shield: { T: "Escudos de sequência", P: "Se você pular um dia, um escudo protege sua sequência automaticamente.", have: (n) => n === 1 ? "Você tem 1 escudo" : `Você tem ${n} escudos`, saved: "Um escudo protegeu sua sequência!" },
  rep: {
    T: "Seu mês", goals: (n) => n === 1 ? "1 meta concluída" : `${n} metas concluídas`, days: (n) => n === 1 ? "1 dia ativo" : `${n} dias ativos`, top: (g) => `Seu hábito mais forte: ${g}`, none: "Ainda nada para contar neste mês: conclua sua primeira meta!",
    full: "Resumo completo", fullT: (m) => `Seu resumo de ${m}`, weeks: "Metas semana a semana", moods: "Seu humor", cats: "Onde você colocou mais carinho", habits: "Seus hábitos mais fortes", tipT: (n) => `A dica de ${n}`,
    tips: { body: "Seu corpo teve pouco espaço neste mês: que tal uma caminhada curta ou um copo d'água a mais?", mind: "Lembre da sua mente: um minuto de respiração por dia faz maravilhas.", home: "Um pequeno gesto pela casa, como arrumar a cama, deixa os dias mais leves.", people: "Mande uma mensagem para alguém de quem você gosta: até uma curtinha aquece o coração.", work: "Tente fazer uma pausa de verdade de vez em quando: ela recarrega as energias.", sleep: "Dormir bem é um superpoder: tente desligar a tela um pouco mais cedo.", custom: "Suas metas pessoais são preciosas: continue assim." },
    plusOnly: "O resumo completo faz parte do Tanetto Plus"
  },
  coll: { T: (m) => `Coleção de ${m}`, P: "Itens exclusivos do Tanetto Plus, só neste mês.", get: "Pegar", unlock: "Desbloquear com Plus" },
  worldT: "Volta ao mundo", worldP: (k) => `Passeios exclusivos do Tanetto Plus: ${k} lugares incríveis para descobrir.`,
  wishT: "Desejo", wishes: ["Fiz um desejo pra você: que amanhã seja um dia lindo.", "A lanterna voa alto: vai nos trazer sorte!", "Desejo realizado: um abraço bem grandão.", "Que lindo vê-la subir... assim como o seu progresso!"],
  festival: { name: "Festa das Lanternas", say: ["Olha quantas lanternas no lago!", "Vamos acender a nossa também?"], tap: "Toque no lago para soltar uma lanterna" }
});
Object.assign(T.pt.acts2, { wish: "Desejo" });
Object.assign(T.pt.items, { h_lantern: "Chapéu lanterna", h_lantern_gold: "Coroa de lanternas", w_lanterns: "Noite de lanternas", lamp_stone: "Lanterna de pedra", tree_lights: "Arvorezinha de luzes", rug_autumn: "Tapete de outono", curt_autumn: "Cortinas de outono", founder_lantern: "Lanterna dos Fundadores", rug_moon: "Tapete da lua", h_acorn: "Chapéu de bolota", h_beret: "Boina vermelha", w_leaves: "Folhas dançantes" });
Object.assign(T.pt.plus, { perks: ["Sem anúncios, nunca", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Volta ao mundo: ${k} passeios exclusivos`, "A trilha dourada, com prêmios muito melhores", "Uma coleção exclusiva todo mês", "2 escudos de sequência todo mês", "300 Tanì de presente todo mês e +50% de Tanì nas metas", "O resumo completo do mês, ilustrado e com dicas"] });
Object.assign(T.pt.tani, { enough: ["Dá para um item comum", "Dá para um item raro", "Dá para um item épico", "Dá para um item lendário"] });
T.pt.tracks = T.pt.tracks.concat(["Passos leves", "Manhã animada", "Coberta e chá", "Bolhas de sabão", "Ciranda", "Nuvem gentil", "De bicicleta", "Dança dos vaga-lumes", "Noite das lanternas"]);
T.pt.world = [
  { name: "Pirâmides de Gizé", t: "Mais antigas que o antigo", s: "{n} passa pelas Pirâmides de Gizé no lombo de um camelo, sob um sol todo dourado. A Grande Pirâmide tem cerca de 4.500 anos e foi a construção mais alta do mundo por quase 4.000 anos!" },
  { name: "Santorini", t: "Cúpulas azuis sobre o mar", s: "{n} passeia entre casinhas brancas e cúpulas azuis, bem acima do mar que brilha. Santorini tem forma de lua crescente porque é a borda de um antigo vulcão." },
  { name: "Matterhorn", t: "A montanha do chocolate", s: "Na frente de um chalé de madeira, {n} toma um chocolate quente e admira o Matterhorn. Seu pico pontudo é tão famoso que aparece na embalagem de um conhecido chocolate suíço!" },
  { name: "Fiordes da Noruega", t: "Onde as geleiras esculpiram o mar", s: "{n} navega num barquinho entre altos paredões verdes e conta as cachoeiras uma por uma. Esses fiordes longos e profundos foram escavados por geleiras gigantes durante a Era do Gelo." },
  { name: "Lapônia", t: "Luzes que dançam", s: "Sob a aurora boreal que dança no céu, {n} dá oi para uma família de renas. Sabia? Nas renas, tanto os machos quanto as fêmeas têm chifres!" },
  { name: "Islândia", t: "O céu se acende", s: "{n} escuta uma cachoeira enquanto o céu fica verde e rosa. A aurora aparece quando partículas minúsculas vindas do Sol batem no ar, lá no alto, acima da Terra." },
  { name: "Deserto do Saara", t: "Um oásis na areia", s: "Depois de uma longa caminhada pelas dunas, {n} encontra um oásis fresquinho cheio de palmeiras. A corcova do camelo não guarda água, e sim gordura: por isso ele aguenta muitos dias sem comer." },
  { name: "Petra", t: "Uma cidade esculpida na pedra", s: "{n} atravessa na ponta dos pés um cânion estreito e, de repente, vê o Tesouro de Petra, todo rosado. Ele foi esculpido direto na rocha há mais de 2.000 anos!" },
  { name: "Safári no Quênia", t: "Oi, amiga alta!", s: "No safári, {n} observa as girafas comendo folhas de acácia, com o Kilimanjaro nevado ao longe. A língua de uma girafa pode ter quase meio metro!" },
  { name: "Cataratas Vitória", t: "A fumaça que troveja", s: "{n} sente no rosto os respingos fresquinhos das Cataratas Vitória e descobre um arco-íris na névoa. O povo local as chama de Mosi-oa-Tunya, que quer dizer “a fumaça que troveja”." },
  { name: "Taj Mahal", t: "Um palácio de luz", s: "Ao amanhecer, {n} vê o sol pintar o Taj Mahal de rosa-claro. Seu mármore branco parece mudar de cor ao longo do dia: rosa de manhã, branco ao meio-dia e dourado à tarde." },
  { name: "Angkor Wat", t: "Torres ao nascer do sol", s: "{n} acorda bem cedinho para ver as torres de Angkor Wat refletidas no lago ao nascer do sol. É o maior templo do mundo e aparece até na bandeira do Camboja!" },
  { name: "Bali", t: "Escadas verdes", s: "{n} caminha pelos arrozais em terraços, que parecem degraus verdes gigantes. Aqui os agricultores dividem a água com um sistema esperto de canais que tem mais de mil anos." },
  { name: "Maldivas", t: "Uma casinha sobre a água", s: "{n} dorme numa cabana sobre palafitas, com peixinhos nadando bem embaixo. As Maldivas têm cerca de 1.200 ilhas e são o país mais plano do mundo." },
  { name: "Grande Barreira de Corais", t: "Oi, peixe-palhaço!", s: "De máscara e snorkel, {n} nada entre corais coloridos, peixes-palhaço e uma tartaruga-marinha bem tranquila. A Grande Barreira de Corais é tão grande que dá para vê-la do espaço!" },
  { name: "Sydney", t: "Velas no porto", s: "{n} pega a balsa para ver de perto a Ópera de Sydney. Seus telhados em forma de vela são cobertos por mais de um milhão de azulejos!" },
  { name: "Banff", t: "O lago turquesa", s: "{n} rema numa canoa vermelha por um lago azul como uma pedra preciosa. Essa cor vem da “farinha de rocha”, um pó finíssimo de pedra moído pelas geleiras." },
  { name: "Havaí", t: "Ilhas que ainda crescem", s: "{n} faz um castelo de areia enquanto um vulcão solta fumaça ao longe. Quando a lava chega ao mar e esfria, vira terra novinha: o Havaí ainda está crescendo!" },
  { name: "Galápagos", t: "Uma amiga bem velhinha", s: "{n} faz amizade com uma tartaruga gigante que mastiga devagarinho um pedaço de cacto. Esses gigantes gentis podem viver mais de 100 anos!" },
  { name: "Machu Picchu", t: "A cidade nas nuvens", s: "Enquanto as nuvens se afastam, {n} sobe até Machu Picchu, e uma lhama simpática vem dar oi. Os incas encaixavam as pedras tão bem que nem precisavam de argamassa." },
  { name: "Salar de Uyuni", t: "Andando sobre o céu", s: "{n} passeia pelo Salar de Uyuni, o maior deserto de sal do mundo. Depois da chuva, ele vira um espelho gigante e parece que a gente está andando sobre o céu!" },
  { name: "Patagônia", t: "A montanha que fuma", s: "Ao nascer do sol, {n} vê os picos de granito do Fitz Roy ficarem cor-de-rosa. Os povos locais o chamavam de Chaltén, “a montanha que fuma”, porque o topo vive cercado de nuvens." },
  { name: "Ilha de Páscoa", t: "Os gigantes de pedra", s: "{n} dá bom-dia aos moais, os gigantes de pedra da Ilha de Páscoa. São quase mil, e a maioria fica de costas para o mar." },
  { name: "Antártida", t: "O desfile dos pinguins", s: "Entre icebergs enormes, {n} caminha gingando com um grupo de pinguins-imperadores. Os papais pinguins mantêm o ovo quentinho sobre as patas por uns dois meses, em pleno inverno!" }
];
