Object.assign(T.pt, {
  gamesT: "Jogos e atividades", gamesP: "Pequenas atividades para se sentir bem, juntos.", gameSeedsInfo: (n, m) => `Tanì dos jogos hoje: ${n}/${m}`,
  games: { stars: ["Pegue as estrelas", "Um jogo rápido para despertar"], letgo: ["Deixe ir", "Coloque um pensamento numa bolha e veja ele voar"], garden: ["Jardim da gratidão", "Cada coisa boa vira uma flor"], wave: ["Respire com a onda", "Segure enquanto a onda sobe"], sing: ["Cante comigo", "Repita as notas do seu companheiro"], stretch: ["Vamos alongar", "Um minuto de alongamento juntos"], memory: ["Pedrinhas gêmeas", "Encontre os pares"], tricks: ["Truques", "O que ele já aprendeu"] },
  start: "Começar",
  letgoP: "Escreva um pensamento que está pesando. Ele não será salvo em lugar nenhum.", letgoPh: "Ex.: a reunião de amanhã", letgoB: "Deixar ir", letgoDone: "Voou para longe. Respire: agora está um pouco mais leve.", letgoAgain: "Outro pensamento",
  gardenP: "Escreva uma coisa boa de hoje: ela vai virar uma flor no seu jardim.", gardenPh: "Ex.: o café com uma amiga", gardenB: "Plantar a flor", gardenN: (n) => n === 1 ? "1 flor" : `${n} flores`, gardenEmpty: "O jardim está esperando a primeira flor.", gardenDone: "Que flor linda! O jardim cresce com você.", gardenList: "Suas flores",
  waveP: "Segure e inspire enquanto a onda sobe. Solte e expire quando ela desce. Com calma.", waveIn: "Segure e inspire", waveOut: "Solte e expire", waveScore: (p) => `No ritmo: ${p}%`, waveDone: "Que calma. Sua respiração é o seu superpoder.",
  singP: "Ouça as notas e repita tocando nas flores. A cada rodada entra mais uma.", singListen: "Ouça...", singYou: "Sua vez!", singEnd: (n) => `Você repetiu ${n} notas seguidas!`,
  stretchP: "Seis movimentos lentos, dez segundos cada. Pare se sentir dor.", stretchDone: "Pronto! Seu corpo agradece.",
  poses: [["Braços para o céu", "Estique os braços para cima e respire."], ["Incline para a direita", "Incline o tronco devagar para a direita."], ["Incline para a esquerda", "Agora devagar para a esquerda."], ["Ombros soltos", "Faça círculos lentos com os ombros."], ["Pescoço relaxado", "Leve a orelha em direção ao ombro e depois troque de lado."], ["Respiração final", "Mãos na barriga e uma respiração profunda."]],
  memP: "Vire duas pedrinhas de cada vez e encontre os pares.", memMoves: (n) => `Jogadas: ${n}`, memEnd: (n) => `Todos os pares em ${n} jogadas!`,
  tricksP: "A cada nível ele aprende um truque novo. Toque em um para ver.", tricks: ["Pulinho", "Pirueta", "Dancinha", "Cambalhota", "Tchauzinho", "Malabares", "Arco-íris"], trickNew: (x) => `Truque novo: ${x}!`,
  share: "Compartilhar", shareText: "Meu companheiro no Tanetto", shareFallback: "Toque e segure a imagem para salvar e depois compartilhe onde quiser.", shareLevel: (n, l) => `${n} chegou ao nível ${l}!`, shareRecord: (n) => `Novo recorde: ${n} pontos!`, shareMaking: "Preparando a imagem...",
  together: "E você? Vamos lanchar juntos!", togetherBtn: (g) => `Eu também: ${g}`,
  ritualT: "Ritual da boa noite", ritualP: "Três pequenos gestos antes de dormir. Faça os que quiser.", ritual: ["Luz baixinha", "Celular longe da cama", "Um pensamento bom de hoje"], ritualB: "Boa noite",
  visit: (f) => `Hoje ${f} veio me visitar!`, visitHi: (f) => `${f} mandou um oi!`,
  remind: { water: "Ei, é um bom momento para um copo d'água.", pause: "Que tal uma pausinha? Nem que sejam cinco minutos.", sleep: "Está ficando tarde. A cama está esperando.", move: "Vamos esticar um pouco as pernas?" },
  summaryT: (n) => `O resumo de ${n}`, summary: (g, best) => g ? `Esta semana você completou ${g === 1 ? "1 meta" : `${g} metas`}. Seu melhor dia foi ${best}. Estou orgulhoso de você!` : "Esta semana foi tranquila. Tudo bem: vamos recomeçar juntos, um passo de cada vez.",
  legalT: "Guia e informações", guideB: "Como funciona", privB: "Política de privacidade", termsB: "Termos de uso", healthB: "Aviso de saúde", creditsB: "Créditos e licenças", tutAgain: "Rever o guia inicial", ownerMissing: "[a completar antes da publicação]",
  guide: [
    ["Como o Tanetto funciona?", "Você escolhe pequenas metas para se cuidar. Cada vez que completa uma, seu companheiro ganha energia e você ganha Tanì."],
    ["Para que servem os Tanì?", "Com os Tanì você decora a casinha e escolhe o que seu companheiro veste. Você ganha com metas, presentes, aventuras e jogos."],
    ["O que é a energia?", "Quando você completa todas as metas do dia, a energia fica cheia e seu companheiro pode sair numa aventura. Ele volta com um cartão-postal."],
    ["E a alegria?", "Ela sobe quando você se cuida e vocês fazem coisas juntos. Ela nunca cai sozinha: aqui ninguém vai te cobrar nada."],
    ["E se eu pular um dia?", "Sem problema. Você pode marcar um dia de descanso e sua sequência continua. O presente do dia simplesmente recomeça do início."],
    ["O que são as festas da estação?", "Em cada estação, completando 20 metas, você ganha um gorro especial para o seu companheiro."],
    ["Como compartilho meu progresso?", "Toque em “Compartilhar” no cartão da semana, nas fotos, no jardim, nos cartões de viagem ou quando subir de nível."],
    ["Onde ficam meus dados?", "Só neste aparelho. Se você trocar de celular ou apagar os dados do navegador, o progresso começa do zero."]
  ],
  terms: [
    "O Tanetto é uma versão de teste gratuita, oferecida como está, sem garantia de funcionamento contínuo. Pode mudar ou ser interrompida a qualquer momento.",
    "O app ajuda a criar pequenos hábitos diários com um companheiro virtual e não substitui orientação médica ou psicológica.",
    "O que você escreve é seu e fica no seu aparelho. Use o app com tranquilidade, sem se cobrar.",
    "As ilustrações, textos, músicas e o código do Tanetto são protegidos por direitos autorais e não podem ser copiados ou reutilizados sem permissão.",
    "Para qualquer dúvida, escreva para o contato indicado na política de privacidade."
  ],
  health: [
    "O Tanetto não é um dispositivo médico e não oferece diagnósticos, tratamentos ou terapias.",
    "Os exercícios de respiração e alongamento são leves. Pare na hora se sentir dor, tontura ou desconforto, e consulte um médico em caso de dúvida.",
    "Se você está passando por um momento difícil, converse com alguém de confiança ou com um profissional. Em caso de perigo, ligue na hora para os números abaixo."
  ],
  credits: [
    "As ilustrações, personagens, textos e músicas foram criados especialmente para o Tanetto.",
    "Fontes: Fredoka e Figtree, com licença SIL Open Font License 1.1.",
    "Animações: biblioteca GSAP, distribuída gratuitamente pela Webflow conforme sua licença.",
    "Os lugares reais dos cartões-postais são ilustrações originais e simplificadas."
  ],
  tracks: ["Manhã de sol", "Passeio", "Chá quentinho", "Canção de ninar", "Campo florido", "Garoa", "Nuvens lentas", "Lanternas", "Ondas do lago", "Bosque calmo", "Domingo preguiçoso", "Estrelas cadentes"]
});
