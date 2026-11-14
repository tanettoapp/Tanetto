/* v10 (français) : Saison 0, sentier, défis, fêtes, boucliers, bilan, collection, tour du monde */
Object.assign(T.fr, {
  rar: { b: "Basique", c: "Commun", r: "Rare", e: "Épique", l: "Légendaire" },
  season: {
    names: { lanterns: "Saison des Lanternes" }, zero: "Saison 0", left: (d) => d === 1 ? "Encore 1 jour" : `Encore ${d} jours`,
    tier: (n, m = 50) => `Étape ${n} sur ${m}`, passi: (n) => `${n} Pas`, next: (n) => `Encore ${n} Pas avant la prochaine étape`, open: "Ouvrir le sentier", pathT: "Le sentier de la saison",
    how: "Tu gagnes des Pas uniquement en prenant soin de toi : 10 par objectif, 20 par journée complète, 100 par défi de la semaine. Pendant la semaine de fête, ils comptent double.",
    free: "Pour tous", gold: "Sentier doré", claim: "Récupérer", claimed: "Récupéré", toClaim: (n) => n === 1 ? "1 récompense à récupérer" : `${n} récompenses à récupérer`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 bouclier de série" : `${n} boucliers de série`, got: (x) => `Tu as reçu : ${x} !`,
    founder: "Fondateur", founderP: "Tu as joué la Saison 0 : ce badge et la lanterne dorée sont à toi pour toujours.", fromPath: "Récompense du sentier",
    goldLock: "Le sentier doré fait partie de Tanetto Plus", chapterT: (n) => `L'histoire des lanternes · chapitre ${n}`,
    story: [
      "Ce soir, {n} a trouvé une lanterne en papier devant la porte. Dedans, il y avait un petit mot : « Chaque petit geste gentil allume une lumière. » Qui a bien pu la laisser là ?",
      "Chaque fois que tu prends soin de toi, la lanterne brille un peu plus fort. {n} l'a accrochée à la fenêtre : de dehors, paraît-il, on dirait une petite étoile.",
      "Aujourd'hui, d'autres lanternes sont arrivées, une pour chaque maison du quartier. Tout le monde se pose la même question : qui les apporte ? {n} a une petite idée...",
      "Un indice ! Sur le rebord de la fenêtre, il y a de minuscules empreintes dorées. {n} les suit jusqu'au lac, où l'eau reflète mille petites lumières.",
      "Au bord du lac, {n} rencontre la Gardienne des Lanternes, une vieille luciole très gentille. « Les lanternes s'allument grâce au soin que chacun met dans ses journées », dit-elle en souriant.",
      "C'est la nuit de la grande fête : toutes les lanternes s'envolent ensemble dans le ciel. La tienne est parmi les plus lumineuses, parce que tu l'as allumée jour après jour. Merci pour cette saison passée ensemble."
    ]
  },
  wk: {
    T: "Défi de la semaine", goals: (n) => `Atteins ${n} objectifs cette semaine`, days: (n) => `Atteins au moins 2 objectifs sur ${n} jours différents`, full: (n) => `Atteins tous les objectifs du jour pendant ${n} jours`, cat: (n, c) => `Atteins ${n} objectifs de la catégorie « ${c} »`,
    prog: (a, b) => `${a} sur ${b}`, reward: (t, p) => `Récompense : ${t} Tanì et ${p} Pas`, claim: "Récupérer", done: "Défi réussi ! Le prochain arrive lundi.", ends: (d) => d <= 1 ? "Dernier jour" : `Se termine dans ${d} jours`
  },
  festa: { P: "Semaine de fête : les Pas comptent double !", names: ["Fête des Bonnes Résolutions", "Fête des Câlins", "Fête des Bourgeons", "Fête des Cerfs-volants", "Fête des Fleurs", "Fête des Lucioles", "Fête de la Mer", "Fête des Étoiles Filantes", "Fête des Cahiers Neufs", "Fête des Feuilles", "Fête des Plaids", "Fête des Guirlandes"] },
  shield: { T: "Boucliers de série", P: "Si tu manques un jour, un bouclier protège ta série automatiquement.", have: (n) => n === 1 ? "Tu as 1 bouclier" : `Tu as ${n} boucliers`, saved: "Un bouclier a protégé ta série !" },
  rep: {
    T: "Ton mois", goals: (n) => n === 1 ? "1 objectif atteint" : `${n} objectifs atteints`, days: (n) => n === 1 ? "1 jour actif" : `${n} jours actifs`, top: (g) => `Ton habitude la plus solide : ${g}`, none: "Rien à raconter pour l'instant ce mois-ci : atteins ton premier objectif !",
    full: "Bilan complet", fullT: (m) => `Ton bilan ${/^[aeiouyhàâéèêîôû]/i.test(String(m)) ? "d'" : "de "}${m}`, weeks: "Objectifs semaine par semaine", moods: "Ton humeur", cats: "Là où tu as mis le plus de soin", habits: "Tes habitudes les plus solides", tipT: (n) => `Le conseil ${/^[aeiouyhàâéèêîôû]/i.test(String(n)) ? "d'" : "de "}${n}`,
    tips: { body: "Ce mois-ci, ton corps a eu peu de place : essaie d'ajouter une petite balade ou un verre d'eau en plus.", mind: "Pense à ton esprit : une minute de respiration par jour fait des merveilles.", home: "Un petit geste pour ta maison, comme faire ton lit, rend les journées plus légères.", people: "Écris à quelqu'un que tu aimes : même un petit message réchauffe le cœur.", work: "Essaie de faire une vraie pause de temps en temps : ça recharge les batteries.", sleep: "Le sommeil est un super-pouvoir : essaie d'éteindre l'écran un peu plus tôt.", custom: "Tes objectifs personnels sont précieux : continue comme ça." },
    plusOnly: "Le bilan complet fait partie de Tanetto Plus"
  },
  coll: { T: (m) => `Collection ${/^[aeiouyhàâéèêîôû]/i.test(String(m)) ? "d'" : "de "}${m}`, P: "Objets exclusifs Tanetto Plus, ce mois-ci seulement.", get: "Prendre", unlock: "Débloquer avec Plus" },
  worldT: "Tour du monde", worldP: (k) => `Sorties exclusives Tanetto Plus : ${k} lieux merveilleux à découvrir.`,
  wishT: "Vœu", wishes: ["J'ai fait un vœu pour toi : que demain soit une belle journée.", "La lanterne vole haut : elle va nous porter bonheur !", "Vœu exaucé : un gros, gros câlin.", "Qu'elle est belle quand elle monte... comme tes progrès !"],
  festival: { name: "Fête des Lanternes", say: ["Regarde toutes ces lanternes sur le lac !", "On allume la nôtre aussi ?"], tap: "Touche le lac pour lâcher une lanterne" }
});
Object.assign(T.fr.acts2, { wish: "Vœu" });
Object.assign(T.fr.items, { h_lantern: "Chapeau lanterne", h_lantern_gold: "Couronne de lanternes", w_lanterns: "Nuit des lanternes", lamp_stone: "Lanterne de pierre", tree_lights: "Petit arbre lumineux", rug_autumn: "Tapis d'automne", curt_autumn: "Rideaux d'automne", founder_lantern: "Lanterne des Fondateurs", rug_moon: "Tapis de lune", h_acorn: "Chapeau gland", h_beret: "Béret rouge", w_leaves: "Feuilles qui dansent" });
Object.assign(T.fr.plus, { perks: ["Pas de pub, jamais", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Tour du monde : ${k} sorties exclusives`, "Le sentier doré, avec des récompenses bien plus belles", "Une collection exclusive chaque mois", "2 boucliers de série chaque mois", "300 Tanì offerts chaque mois et +50 % de Tanì grâce aux objectifs", "Le bilan complet du mois, illustré et avec des conseils"] });
Object.assign(T.fr.tani, { enough: ["Assez pour un objet commun", "Assez pour un objet rare", "Assez pour un objet épique", "Assez pour un objet légendaire"] });
T.fr.tracks = T.fr.tracks.concat(["Pas légers", "Matin pétillant", "Plaid et thé", "Bulles de savon", "La ronde", "Nuage tout doux", "À vélo", "Danse des lucioles", "Nuit des lanternes"]);

T.fr.world = [
  { name: "Pyramides de Gizeh", t: "Plus anciennes que l'ancien", s: "{n} passe devant les Pyramides de Gizeh à dos de chameau, en plissant les yeux sous le soleil doré. La Grande Pyramide a environ 4 500 ans et a été le plus haut bâtiment du monde pendant près de 4 000 ans !" },
  { name: "Santorin", t: "Des dômes bleus au bord de la mer", s: "{n} se promène entre les maisons blanches et les dômes bleus, tout en haut au-dessus de la mer scintillante. Santorin a la forme d'un croissant de lune, car c'est le bord d'un ancien volcan." },
  { name: "Cervin", t: "La montagne du chocolat", s: "Devant un chalet en bois, {n} boit un chocolat chaud en admirant le Cervin. Son sommet pointu est si célèbre qu'il figure sur une célèbre barre de chocolat suisse !" },
  { name: "Fjords de Norvège", t: "Là où les glaciers ont creusé la mer", s: "{n} navigue sur un petit bateau entre de hautes falaises vertes et compte les cascades. Ces fjords longs et profonds ont été creusés par des glaciers géants pendant l'ère glaciaire." },
  { name: "Laponie", t: "Des lumières qui dansent", s: "Sous les aurores boréales vertes qui tourbillonnent, {n} dit bonjour à une famille de rennes. Le savais-tu ? Chez les rennes, les mâles comme les femelles ont des bois !" },
  { name: "Islande", t: "Le ciel s'illumine", s: "{n} écoute une cascade pendant que le ciel brille de vert et de rose. Les aurores boréales apparaissent quand de minuscules particules venues du Soleil heurtent l'air, très haut au-dessus de la Terre." },
  { name: "Désert du Sahara", t: "Une oasis dans le sable", s: "Après une longue marche dans les dunes, {n} trouve une oasis bien fraîche pleine de palmiers. La bosse du chameau ne contient pas d'eau mais de la graisse : c'est pour ça qu'il peut rester des jours sans manger." },
  { name: "Pétra", t: "Une ville taillée dans la pierre", s: "{n} avance sur la pointe des pieds dans un étroit canyon et découvre soudain le Trésor de Pétra, tout rose. Il a été taillé directement dans la roche il y a plus de 2 000 ans !" },
  { name: "Safari au Kenya", t: "Bonjour, grande amie", s: "En safari, {n} regarde les girafes grignoter des feuilles d'acacia, avec le Kilimandjaro enneigé au loin. La langue d'une girafe peut mesurer presque un demi-mètre !" },
  { name: "Chutes Victoria", t: "La fumée qui gronde", s: "{n} sent les embruns frais des chutes Victoria et repère un arc-en-ciel dans la brume. Les habitants les appellent Mosi-oa-Tunya, ce qui veut dire « la fumée qui gronde »." },
  { name: "Taj Mahal", t: "Un palais de lumière", s: "{n} regarde le lever du soleil colorer le Taj Mahal d'un rose tout doux. Son marbre blanc semble changer de couleur au fil de la journée : rose à l'aube, blanc à midi et doré le soir." },
  { name: "Angkor Vat", t: "Des tours au lever du soleil", s: "{n} se lève tôt pour voir les tours d'Angkor Vat se refléter dans le bassin au lever du soleil. C'est le plus grand temple du monde, et il figure même sur le drapeau du Cambodge !" },
  { name: "Bali", t: "Des escaliers verts", s: "{n} se balade le long de rizières en terrasses qui ressemblent à de gigantesques escaliers verts. Ici, les paysans partagent l'eau grâce à un ingénieux système de canaux vieux de plus de 1 000 ans." },
  { name: "Maldives", t: "Une maison sur l'eau", s: "{n} dort dans une petite cabane sur pilotis, avec des poissons qui nagent juste en dessous. Les Maldives comptent environ 1 200 îles et sont le pays le plus plat du monde." },
  { name: "Grande Barrière de corail", t: "Coucou, poisson-clown !", s: "{n} nage avec un masque et un tuba parmi des poissons-clowns et une gentille tortue de mer, au milieu des coraux colorés. La Grande Barrière de corail est si grande qu'on peut la voir depuis l'espace !" },
  { name: "Sydney", t: "Des voiles sur le port", s: "{n} traverse le port en ferry pour voir de près l'Opéra de Sydney. Ses toits en forme de voiles sont recouverts de plus d'un million de carreaux !" },
  { name: "Banff", t: "Le lac turquoise", s: "{n} pagaie dans un canoë rouge sur un lac aussi bleu qu'une pierre précieuse. Sa couleur vient de la « farine de roche », de minuscules grains de pierre broyés par les glaciers." },
  { name: "Hawaï", t: "Des îles qui grandissent encore", s: "{n} construit un château de sable pendant qu'un volcan fume au loin. Quand la lave coule dans la mer et refroidit, elle forme de la terre toute neuve : Hawaï grandit encore !" },
  { name: "Galápagos", t: "Une très vieille amie", s: "{n} rencontre une tortue géante qui mâchouille tranquillement une raquette de cactus. Ces géantes paisibles peuvent vivre plus de 100 ans !" },
  { name: "Machu Picchu", t: "Une cité dans les nuages", s: "{n} grimpe jusqu'au Machu Picchu pendant que les nuages s'éloignent, et un lama sympa vient dire bonjour. Les Incas ont ajusté les pierres si parfaitement qu'ils n'ont eu besoin d'aucun mortier." },
  { name: "Salar d'Uyuni", t: "Marcher sur le ciel", s: "{n} marche sur le Salar d'Uyuni, le plus grand désert de sel du monde. Après la pluie, il devient un miroir géant, et on a l'impression de marcher sur le ciel !" },
  { name: "Patagonie", t: "La montagne qui fume", s: "{n} regarde les sommets de granit du Fitz Roy devenir roses au lever du soleil. Les habitants l'ont appelé Chaltén, « la montagne qui fume », parce que les nuages tourbillonnent souvent autour de son sommet." },
  { name: "Île de Pâques", t: "Les géants de pierre", s: "{n} dit bonjour aux moaï, les géants de pierre de l'île de Pâques. Il y en a presque 1 000, et la plupart tournent le dos à la mer." },
  { name: "Antarctique", t: "La parade des manchots", s: "{n} se dandine avec un groupe de manchots empereurs entre d'immenses icebergs. Les papas manchots gardent l'œuf au chaud sur leurs pattes pendant environ deux mois, en plein hiver !" }
];
