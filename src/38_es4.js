Object.assign(T.es, {
  acts: { feed: "Merienda", play: "Jugar", talk: "Hablar", nap: "Dormir", wake: "Despertar", photo: "Foto" },
  joy: "Alegría",
  feedT: "¿Qué le preparas?", feedLeft: (n) => n === 1 ? "Queda 1 merienda hoy" : `Quedan ${n} meriendas hoy`, feedFull: "¡Tengo la barriguita llena! Quizá más tarde.",
  snacks: { apple: "Manzana", berries: "Fresas", cookie: "Galleta", honey: "Miel", fish: "Galleta de pez", carrot: "Zanahoria" },
  yum: ["¡Ñam ñam!", "¡Qué rico!", "¡Gracias, me hacía falta!", "¡Delicioso!"], fav: "¡Es mi favorito! ¡Gracias!",
  gameT: "Atrapa las estrellas", gameP: "Toca las estrellas antes de que caigan. ¡Las doradas valen 3 puntos!", gameStart: "Jugar", gameScore: (n) => `Puntos: ${n}`, gameEnd: (n) => `¡Has hecho ${n} puntos!`, gameSeeds: (s) => s ? `+${s} Tanì` : "Ya tienes todos los Tanì del juego de hoy, ¡pero la diversión siempre es gratis!", gameAgain: "¡Otra vez!", gameBest: (n) => `Récord: ${n}`,
  talkT: "¿Cómo te sientes ahora?", talkBreath: "¿Respiramos juntos un minuto?", talkHelp: "Si necesitas hablar con alguien, en Más encontrarás quién puede ayudarte.", talkSaved: "Lo he apuntado en el diario.", talkQ: "¿Cómo te sientes ahora?",
  talkReply: [
    ["Lo siento. Estoy aquí contigo, aunque sea para estar un rato en silencio juntos.", "Los días pesados pasan. Mientras tanto, una respiración cada vez."],
    ["Pasa. ¿Hacemos algo pequeño y bonito para ti?", "Está bien así. No tienes que estar al cien por cien cada día."],
    ["Un día normal también es un buen día.", "Gracias por contármelo. Seguimos con calma."],
    ["¡Qué bien! Me dan ganas de dar saltitos.", "¡Me alegro! Guardemos este momento."],
    ["¡Bien! ¡Hoy eres mi persona favorita más que nunca!", "¡Qué alegría! ¿Hacemos una fiesta pequeñita?"]
  ],
  napSay: "Buenas noches... zzz", wakeSay: "¡Qué buena siesta! Aquí estoy otra vez.",
  stroke: ["Mmm, qué gusto...", "¡Un poquito más!", "Me siento todo suavecito."],
  tickle: ["¡Jaja, cosquillas no!", "¡Jijiji, basta, basta!"],
  photoT: "¡Qué foto tan bonita!", photoMaking: "Revelando la foto...",
  letterT: "Una carta para ti", letterL: "Leer la carta del día", letterSign: (n) => `Con cariño, ${n}`,
  letters: [
    "¡Hola! Estoy feliz de haberte conocido. Desde hoy nos hacemos compañía, paso a paso.",
    "Ayer soñé que volábamos sobre las nubes. Te reías muchísimo. ¡Qué sueño tan bonito!",
    "He descubierto algo: cuando bebes un poco de agua, yo también me siento más fresco.",
    "Hoy no hace falta hacerlo todo. Basta con hacer algo. Lo demás puede esperar.",
    "He contado las estrellas desde la ventana. Me he perdido un poco, pero me he divertido igual.",
    "¿Sabes cuál es mi momento favorito del día? Cuando llegas tú.",
    "¡Una semana juntos! Te he preparado un abrazo enorme. Imagínalo muy fuerte.",
    "Si hoy es un día torcido, no pasa nada. Los días torcidos también se acaban.",
    "He intentado hacer galletas. Me han salido un poco quemadas, pero con mucho cariño.",
    "Acuérdate de mirar el cielo al menos una vez hoy. Es gratis y es precioso.",
    "¡He aprendido a silbar! Más o menos. Digamos que estoy en ello.",
    "Gracias por cuidarte. Así también me cuidas a mí.",
    "Hoy probamos algo: dedícate una frase amable, como harías con alguien que quieres.",
    "¡Dos semanas juntos! Yo he crecido, pero tú también has avanzado mucho. Se nota.",
    "Me gusta la lluvia: hace crecer las plantas y todo huele mejor.",
    "He ordenado mi habitación. Bueno, he movido un calcetín. ¡Es un comienzo!",
    "Cada pasito cuenta. También los que nadie ve.",
    "Anoche la luna era tan grande que parecía querer entrar por la ventana.",
    "Si notas cansancio, descansa. Descansar no es perder el tiempo.",
    "Me gusta cuando me cuentas tu día en el diario. Aunque sea una línea.",
    "¡Tres semanas juntos! Eres una persona especial. No lo olvides nunca."
  ],
  giftBig: (s) => `Regalo del día: ¡+${s} Tanì!`,
  teaserT: "¡Vuelve mañana!", teaserP: (s) => `El regalo de mañana valdrá +${s} Tanì. Cada 7 días seguidos hay una sorpresa especial.`, visitL: (n) => n === 1 ? "1 día de visita" : `${n} días de visita seguidos`,
  specialT: "¡Regalo especial!", specialP: (i) => `Tantos días seguidos juntos: ¡${i} ya es tuyo!`, specialOnly: "Premio por días seguidos",
  tut: [
    "¡Este es {n}! Tócalo para darle un mimo, o acarícialo deslizando el dedo.",
    "Cada día hay un regalo, y si vuelves mañana será más grande. ¡Ábrelo!",
    "Aquí puedes darle la merienda, jugar, hablar, ponerlo a dormir o hacerle una foto.",
    "Estos son tus objetivos. Cuando hagas uno, tócalo: {n} gana energía y tú ganas Tanì.",
    "Con la energía llena, {n} se va de aventura. Abajo tienes aventuras, casita, diario y ajustes."
  ],
  tutNext: "Siguiente", tutSkip: "Saltar", tutDone: "¡Entendido!",
  privT: "Privacidad", privP: "El compañero, los objetivos y el diario se quedan en este dispositivo. Si creas una cuenta, guardamos también tu correo y una copia de tu progreso, solo para que puedas recuperarlo. Para mejorar la app contamos algunas acciones de forma anónima y agregada (por ejemplo, cuántas veces se abre). Tanetto no es una herramienta médica y es para todas las edades: por debajo de la edad de consentimiento digital de tu país (de 13 a 16 años, según dónde vivas), los anuncios nunca son personalizados y la copia en línea no está disponible.",
  hapticL: "Vibración", trackL: "Sonando", tracks: ["Mañana de sol", "Paseo", "Té calentito", "Nana"],
  feedbackT: "Dime qué te parece", feedbackP: "Un consejo, un problema, una idea: cada mensaje ayuda a mejorar Tanetto.", feedbackB: "Escribir un mensaje",
  tomorrow: "Mañana te preparo una sorpresa. ¡Te espero!",
  idle: ["¿Sabías que las nubes están hechas de muchísimas gotitas?", "Se me ha ocurrido una cancioncilla... ¡la la la!", "¿Crees que las estrellas se conocen entre ellas?", "Hoy me siento especialmente blandito.", "Si fuera una galleta, sería de chocolate.", "¿Te he dicho que tienes un talento para las cosas pequeñas? Lo tienes.", "¡He visto una mariposa! Creo que me ha saludado.", "A veces solo me gusta estar aquí contigo."]
});
T.es.items.teddy = "Osito"; T.es.items.fishbowl = "Pececito rojo"; T.es.items.w_stars = "Cielo estrellado";
T.es.talk.morning.push("He abierto la ventana: el aire huele a nuevo comienzo.", "¿Qué tal un día tranquilito?", "Desayunamos con calma, ¿vale?");
T.es.talk.day.push("Oye, ¿has bebido un poco de agua?", "Cada cosa que haces por ti es una victoria.", "Aquí estoy, paso a paso.");
T.es.talk.evening.push("Esta noche sin prisas, prometido.", "¿Qué te ha gustado de hoy?", "Las lucecitas de la tarde son mis favoritas.");
T.es.talk.night.push("¿Todavía en pie a estas horas? Vamos despacito.", "La almohada nos espera.", "Mañana será otra bonita oportunidad.");
T.es.talk.pat.push("¡Qué bien cuando estás aquí!", "¡Otra, por favor!", "Me siento calentito.");
T.es.talk.cheer.push("¡Genial! Un paso más.", "Sabía que lo conseguirías.", "¡Qué orgullo!");
