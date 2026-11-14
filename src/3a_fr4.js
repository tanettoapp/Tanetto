Object.assign(T.fr, {
  acts: { feed: "Goûter", play: "Jouer", talk: "Parler", nap: "Dodo", wake: "Réveil", photo: "Photo" },
  joy: "Bonheur",
  feedT: "Qu'est-ce que tu lui prépares ?", feedLeft: (n) => n === 1 ? "Encore 1 goûter aujourd'hui" : `Encore ${n} goûters aujourd'hui`, feedFull: "J'ai le ventre plein ! Peut-être plus tard.",
  snacks: { apple: "Pomme", berries: "Fraises", cookie: "Biscuit", honey: "Miel", fish: "Biscuit poisson", carrot: "Carotte" },
  yum: ["Miam miam !", "Trop bon !", "Merci, j'en avais besoin !", "Délicieux !"], fav: "C'est mon préféré ! Merci !",
  gameT: "Attrape les étoiles", gameP: "Touche les étoiles avant qu'elles tombent. Les dorées valent 3 points !", gameStart: "Jouer", gameScore: (n) => `Points : ${n}`, gameEnd: (n) => `Tu as fait ${n} points !`, gameSeeds: (s) => s ? `+${s} Tanì` : "Tu as déjà tous les Tanì du jeu d'aujourd'hui, mais le plaisir est toujours gratuit !", gameAgain: "Encore !", gameBest: (n) => `Record : ${n}`,
  talkT: "Comment te sens-tu maintenant ?", talkBreath: "On respire ensemble une minute ?", talkHelp: "Si tu as besoin de parler à quelqu'un, tu trouveras dans Plus qui peut t'aider.", talkSaved: "Je l'ai noté dans le journal.", talkQ: "Comment te sens-tu maintenant ?",
  talkReply: [
    ["Je suis désolé. Je suis là avec toi, même juste pour rester en silence ensemble.", "Les jours lourds passent. En attendant, une respiration à la fois."],
    ["Ça arrive. On fait quelque chose de petit et de doux pour toi ?", "C'est bien comme ça. Pas besoin d'être au top tous les jours."],
    ["Une journée normale reste une bonne journée.", "Merci de me le dire. On continue tranquillement."],
    ["Trop bien ! Ça me donne envie de sautiller.", "Je suis content ! Gardons ce moment précieusement."],
    ["Youpi ! Aujourd'hui tu es ma personne préférée plus que jamais !", "Quelle joie ! On fait une toute petite fête ?"]
  ],
  napSay: "Bonne nuit... zzz", wakeSay: "Quelle bonne sieste ! Me revoilà.",
  stroke: ["Mmm, c'est bon...", "Encore un petit peu !", "Je me sens tout doux."],
  tickle: ["Haha, pas les chatouilles !", "Hihihi, arrête, arrête !"],
  photoT: "Quelle jolie photo !", photoMaking: "Je développe la photo...",
  letterT: "Une lettre pour toi", letterL: "Lire la lettre du jour", letterSign: (n) => `Avec tendresse, ${n}`,
  letters: [
    "Coucou ! Je suis trop content de t'avoir rencontré·e. À partir d'aujourd'hui, on se tient compagnie, pas à pas.",
    "Hier, j'ai rêvé qu'on volait au-dessus des nuages. Tu riais tellement. Quel joli rêve !",
    "J'ai découvert un truc : quand tu bois un peu d'eau, moi aussi je me sens plus frais.",
    "Aujourd'hui, pas besoin de tout faire. Faire quelque chose suffit. Le reste peut attendre.",
    "J'ai compté les étoiles depuis la fenêtre. Je me suis un peu perdu, mais je me suis bien amusé.",
    "Tu sais quel est mon moment préféré de la journée ? Quand tu arrives.",
    "Une semaine ensemble ! Je t'ai préparé un énorme câlin. Imagine-le très fort.",
    "Si aujourd'hui est une journée de travers, ce n'est pas grave. Ces journées-là finissent aussi.",
    "J'ai essayé de faire des biscuits. Ils sont un peu brûlés, mais faits avec amour.",
    "Pense à regarder le ciel au moins une fois aujourd'hui. C'est gratuit et c'est magnifique.",
    "J'ai appris à siffler ! Enfin, presque. Disons que je m'entraîne.",
    "Merci de prendre soin de toi. Comme ça, tu prends soin de moi aussi.",
    "Aujourd'hui, on essaie un truc : offre-toi une phrase gentille, comme à quelqu'un que tu aimes.",
    "Deux semaines ensemble ! J'ai grandi, et toi aussi tu as fait beaucoup de chemin. Ça se voit.",
    "J'aime la pluie : elle fait pousser les plantes et tout sent meilleur.",
    "J'ai rangé ma chambre. Bon, j'ai déplacé une chaussette. C'est un début !",
    "Chaque petit pas compte. Même ceux que personne ne voit.",
    "Cette nuit, la lune était si grande qu'on aurait dit qu'elle voulait entrer par la fenêtre.",
    "Si tu sens la fatigue, repose-toi. Se reposer, ce n'est pas perdre son temps.",
    "J'adore quand tu me racontes ta journée dans le journal. Même une seule ligne.",
    "Trois semaines ensemble ! Tu es une personne spéciale. Ne l'oublie jamais."
  ],
  giftBig: (s) => `Cadeau du jour : +${s} Tanì !`,
  teaserT: "Reviens demain !", teaserP: (s) => `Le cadeau de demain vaudra +${s} Tanì. Tous les 7 jours d'affilée, il y a une surprise spéciale.`, visitL: (n) => n === 1 ? "1 jour de visite" : `${n} jours de visite d'affilée`,
  specialT: "Cadeau spécial !", specialP: (i) => `Tant de jours d'affilée ensemble : ${i}, c'est pour toi !`, specialOnly: "Prix des jours d'affilée",
  tut: [
    "Voici {n} ! Touche pour un câlin, ou caresse en faisant glisser ton doigt.",
    "Chaque jour il y a un cadeau, et il grandit si tu reviens demain. Ouvre-le !",
    "Ici, tu peux donner un goûter, jouer, parler, mettre au dodo ou prendre une photo.",
    "Voici tes objectifs. Quand tu en as fait un, touche-le : {n} gagne de l'énergie et toi des Tanì.",
    "Avec l'énergie au max, {n} part à l'aventure. En bas, tu trouves aventures, maison, journal et réglages."
  ],
  tutNext: "Suivant", tutSkip: "Passer", tutDone: "Compris !",
  privT: "Confidentialité", privP: "Le compagnon, les objectifs et le journal restent sur cet appareil. Si tu crées un compte, nous enregistrons aussi ton e-mail et une sauvegarde de ta progression, uniquement pour que tu la retrouves. Pour améliorer l'app, nous comptons certaines actions de façon anonyme et agrégée (par exemple, combien de fois elle est ouverte). Tanetto n'est pas un outil médical et s'adresse à tous les âges : avant l'âge du consentement numérique de ton pays (de 13 à 16 ans selon le pays), les publicités ne sont jamais personnalisées et la sauvegarde en ligne n'est pas disponible.",
  hapticL: "Vibration", trackL: "En lecture", tracks: ["Matin ensoleillé", "Petite balade", "Thé chaud", "Berceuse"],
  feedbackT: "Dis-moi ce que tu en penses", feedbackP: "Un conseil, un problème, une idée : chaque message aide à améliorer Tanetto.", feedbackB: "Écrire un message",
  tomorrow: "Demain, je te prépare une surprise. Je t'attends !",
  idle: ["Tu savais que les nuages sont faits de minuscules gouttelettes ?", "Une petite chanson m'est venue... la la la !", "Tu crois que les étoiles se connaissent entre elles ?", "Aujourd'hui, je me sens particulièrement moelleux.", "Si j'étais un biscuit, je serais au chocolat.", "Je t'ai déjà dit que tu as un talent pour les petites choses ? C'est vrai.", "J'ai vu un papillon ! Je crois qu'il m'a fait coucou.", "Parfois, j'aime juste être là avec toi."]
});
T.fr.items.teddy = "Nounours"; T.fr.items.fishbowl = "Poisson rouge"; T.fr.items.w_stars = "Ciel étoilé";
T.fr.talk.morning.push("J'ai ouvert la fenêtre : l'air sent le nouveau départ.", "Et si on se faisait une journée tout en douceur ?", "On prend le petit-déjeuner tranquillement, d'accord ?");
T.fr.talk.day.push("Hé, tu as bu un peu d'eau ?", "Tout ce que tu fais pour toi est une victoire.", "Je suis là, pas à pas.");
T.fr.talk.evening.push("Ce soir, pas de hâte, promis.", "Qu'est-ce qui t'a plu aujourd'hui ?", "Les petites lumières du soir sont mes préférées.");
T.fr.talk.night.push("Encore debout à cette heure-ci ? Doucement.", "L'oreiller nous attend.", "Demain sera une autre belle occasion.");
T.fr.talk.pat.push("J'adore quand tu es là !", "Encore une, s'il te plaît !", "Je me sens tout au chaud.");
T.fr.talk.cheer.push("Génial ! Un pas de plus.", "Je savais que tu y arriverais.", "Quelle fierté !");
