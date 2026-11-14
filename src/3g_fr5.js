Object.assign(T.fr, {
  gamesT: "Jeux et activités", gamesP: "De petites activités pour se sentir bien, ensemble.", gameSeedsInfo: (n, m) => `Tanì des jeux aujourd'hui : ${n}/${m}`,
  games: { stars: ["Attrape les étoiles", "Un jeu rapide pour te réveiller"], letgo: ["Lâcher prise", "Mets une pensée dans une bulle et regarde-la s'envoler"], garden: ["Le jardin de gratitude", "Chaque belle chose devient une fleur"], wave: ["Respire avec la vague", "Appuie tant que la vague monte"], sing: ["Chante avec moi", "Répète les notes de ton compagnon"], stretch: ["Étirons-nous", "Une minute d'étirements ensemble"], memory: ["Cailloux jumeaux", "Trouve les paires"], tricks: ["Petits tours", "Ce qu'il a appris"] },
  start: "C'est parti",
  letgoP: "Écris une pensée qui te pèse. Elle ne sera enregistrée nulle part.", letgoPh: "Ex. la réunion de demain", letgoB: "La laisser partir", letgoDone: "Envolée. Respire : c'est un peu plus léger maintenant.", letgoAgain: "Une autre pensée",
  gardenP: "Écris une belle chose d'aujourd'hui : elle deviendra une fleur dans ton jardin.", gardenPh: "Ex. un café avec une amie", gardenB: "Planter la fleur", gardenN: (n) => n === 1 ? "1 fleur" : `${n} fleurs`, gardenEmpty: "Le jardin attend sa première fleur.", gardenDone: "Quelle jolie fleur ! Le jardin grandit avec toi.", gardenList: "Tes fleurs",
  waveP: "Appuie et inspire pendant que la vague monte. Relâche et expire quand elle descend. Tout doucement.", waveIn: "Appuie et inspire", waveOut: "Relâche et expire", waveScore: (p) => `En rythme : ${p} %`, waveDone: "Quel calme. Ta respiration est ton super-pouvoir.",
  singP: "Écoute les notes et répète-les en touchant les fleurs. Une de plus à chaque tour.", singListen: "Écoute...", singYou: "À toi !", singEnd: (n) => `Tu as répété ${n} notes d'affilée !`,
  stretchP: "Six mouvements lents, dix secondes chacun. Arrête si tu as mal.", stretchDone: "Bravo ! Ton corps te dit merci.",
  poses: [["Bras vers le ciel", "Tends les bras vers le haut et respire."], ["Penche à droite", "Penche doucement le buste vers la droite."], ["Penche à gauche", "Maintenant doucement vers la gauche."], ["Épaules souples", "Fais des cercles lents avec les épaules."], ["Cou détendu", "Approche l'oreille de l'épaule, puis change de côté."], ["Dernière respiration", "Mains sur le ventre et une grande inspiration."]],
  memP: "Retourne deux cailloux à la fois et trouve les paires.", memMoves: (n) => `Coups : ${n}`, memEnd: (n) => `Toutes les paires en ${n} coups !`,
  tricksP: "À chaque niveau, il apprend un nouveau tour. Touche-en un pour le voir.", tricks: ["Petit saut", "Pirouette", "Petite danse", "Roulade", "Coucou", "Jonglage", "Arc-en-ciel"], trickNew: (x) => `Nouveau tour : ${x} !`,
  share: "Partager", shareText: "Mon compagnon sur Tanetto", shareFallback: "Appuie longuement sur l'image pour l'enregistrer, puis partage-la où tu veux.", shareLevel: (n, l) => `${n} a atteint le niveau ${l} !`, shareRecord: (n) => `Nouveau record : ${n} points !`, shareMaking: "Je prépare l'image...",
  together: "Et toi ? On goûte ensemble !", togetherBtn: (g) => `Moi aussi : ${g}`,
  ritualT: "Rituel du soir", ritualP: "Trois petits gestes avant de dormir. Fais ceux qui te font envie.", ritual: ["Lumière douce", "Téléphone loin du lit", "Une belle pensée de la journée"], ritualB: "Bonne nuit",
  visit: (f) => `Aujourd'hui, ${f} est venu me voir !`, visitHi: (f) => `${f} te dit coucou !`,
  remind: { water: "Hé, c'est un bon moment pour un verre d'eau.", pause: "Et si on faisait une petite pause ? Même cinq minutes.", sleep: "Il se fait tard. Le lit nous attend.", move: "On se dégourdit un peu les jambes ?" },
  summaryT: (n) => `Le récap de ${n}`, summary: (g, best) => g ? `Cette semaine, tu as terminé ${g === 1 ? "1 objectif" : `${g} objectifs`}. Ton meilleur jour, c'était ${best}. Je suis fier de toi !` : "Cette semaine a été calme. C'est très bien comme ça : on repart ensemble, pas à pas.",
  legalT: "Guide et infos", guideB: "Comment ça marche", privB: "Politique de confidentialité", termsB: "Conditions d'utilisation", healthB: "Avertissement santé", creditsB: "Crédits et licences", tutAgain: "Revoir la visite guidée", ownerMissing: "[à compléter avant la publication]",
  guide: [
    ["Comment fonctionne Tanetto ?", "Tu choisis de petits objectifs pour prendre soin de toi. À chaque objectif terminé, ton compagnon gagne de l'énergie et toi des Tanì."],
    ["À quoi servent les Tanì ?", "Avec les Tanì, tu décores la maison et choisis ce que porte ton compagnon. Tu les gagnes avec les objectifs, les cadeaux, les aventures et les jeux."],
    ["C'est quoi l'énergie ?", "Quand tu termines tous les objectifs du jour, l'énergie est au max et ton compagnon peut partir à l'aventure. Il revient avec une carte postale."],
    ["Et le bonheur ?", "Il monte quand tu prends soin de toi et que vous faites des choses ensemble. Il ne baisse jamais tout seul : ici, personne ne te culpabilise."],
    ["Et si je saute un jour ?", "Rien de grave. Tu peux noter un jour de repos et ta série continue. Le cadeau du jour recommence simplement au début."],
    ["C'est quoi les fêtes de saison ?", "À chaque saison, en terminant 20 objectifs, tu gagnes un bonnet spécial pour ton compagnon."],
    ["Comment partager mes progrès ?", "Touche « Partager » sur la carte de la semaine, les photos, le jardin, les cartes de voyage ou quand tu passes un niveau."],
    ["Où sont mes données ?", "Uniquement sur cet appareil. Si tu changes de téléphone ou effaces les données du navigateur, tes progrès repartent de zéro."]
  ],
  terms: [
    "Tanetto est une version d'essai gratuite, fournie en l'état, sans garantie de fonctionnement continu. Elle peut changer ou s'arrêter à tout moment.",
    "L'app aide à construire de petites habitudes quotidiennes avec un compagnon virtuel et ne remplace pas un avis médical ou psychologique.",
    "Ce que tu écris t'appartient et reste sur ton appareil. Utilise l'app sereinement, sans te forcer.",
    "Les illustrations, textes, musiques et le code de Tanetto sont protégés par le droit d'auteur et ne peuvent pas être copiés ou réutilisés sans autorisation.",
    "Pour toute question, tu peux écrire au contact indiqué dans la politique de confidentialité."
  ],
  health: [
    "Tanetto n'est pas un dispositif médical et ne propose ni diagnostic, ni traitement, ni thérapie.",
    "Les exercices de respiration et d'étirement sont légers. Arrête-toi tout de suite si tu ressens une douleur, un vertige ou une gêne, et demande l'avis d'un médecin en cas de doute.",
    "Si tu traverses un moment difficile, parle à une personne de confiance ou à un professionnel. En cas de danger, appelle tout de suite les numéros ci-dessous."
  ],
  credits: [
    "Les illustrations, personnages, textes et musiques ont été créés spécialement pour Tanetto.",
    "Polices : Fredoka et Figtree, sous licence SIL Open Font License 1.1.",
    "Animations : bibliothèque GSAP, distribuée gratuitement par Webflow selon sa licence.",
    "Les lieux réels des cartes postales sont des illustrations originales et simplifiées."
  ],
  tracks: ["Matin ensoleillé", "Petite balade", "Thé chaud", "Berceuse", "Prairie en fleurs", "Petite pluie", "Nuages lents", "Lanternes", "Vagues du lac", "Bois tranquille", "Dimanche paresseux", "Étoiles filantes"]
});
