Object.assign(T.es, {
  gamesT: "Juegos y actividades", gamesP: "Pequeñas actividades para sentirte bien, juntos.", gameSeedsInfo: (n, m) => `Tanì de juegos hoy: ${n}/${m}`,
  games: { stars: ["Atrapa las estrellas", "Un juego rápido para despertarte"], letgo: ["Soltar", "Mete un pensamiento en una burbuja y míralo volar"], garden: ["El jardín de la gratitud", "Cada cosa bonita se convierte en una flor"], wave: ["Respira con la ola", "Mantén pulsado mientras la ola sube"], sing: ["Canta conmigo", "Repite las notas de tu compañero"], stretch: ["Estirémonos", "Un minuto de estiramientos juntos"], memory: ["Piedritas gemelas", "Encuentra las parejas"], tricks: ["Trucos", "Lo que ha aprendido"] },
  start: "Empezamos",
  letgoP: "Escribe un pensamiento que te pese. No se guardará en ningún sitio.", letgoPh: "Ej. la reunión de mañana", letgoB: "Déjalo ir", letgoDone: "Se ha ido volando. Respira: ahora pesa un poco menos.", letgoAgain: "Otro pensamiento",
  gardenP: "Escribe algo bonito de hoy: se convertirá en una flor de tu jardín.", gardenPh: "Ej. el café con una amiga", gardenB: "Plantar la flor", gardenN: (n) => n === 1 ? "1 flor" : `${n} flores`, gardenEmpty: "El jardín espera su primera flor.", gardenDone: "¡Qué flor tan bonita! El jardín crece contigo.", gardenList: "Tus flores",
  waveP: "Mantén pulsado e inspira mientras la ola sube. Suelta y espira cuando baja. Con calma.", waveIn: "Mantén pulsado e inspira", waveOut: "Suelta y espira", waveScore: (p) => `A tiempo: ${p} %`, waveDone: "Qué calma. Tu respiración es tu superpoder.",
  singP: "Escucha las notas y repítelas tocando las flores. En cada ronda se añade una.", singListen: "Escucha...", singYou: "¡Te toca!", singEnd: (n) => `¡Has repetido ${n} notas seguidas!`,
  stretchP: "Seis movimientos lentos, diez segundos cada uno. Para si sientes dolor.", stretchDone: "¡Hecho! Tu cuerpo te lo agradece.",
  poses: [["Brazos al cielo", "Estira los brazos hacia arriba y respira."], ["Inclínate a la derecha", "Inclina despacio el tronco hacia la derecha."], ["Inclínate a la izquierda", "Ahora despacio hacia la izquierda."], ["Hombros sueltos", "Haz círculos lentos con los hombros."], ["Cuello relajado", "Lleva la oreja hacia el hombro y luego cambia de lado."], ["Respiración final", "Manos en la barriga y una respiración profunda."]],
  memP: "Da la vuelta a dos piedritas cada vez y encuentra las parejas.", memMoves: (n) => `Movimientos: ${n}`, memEnd: (n) => `¡Todas las parejas en ${n} movimientos!`,
  tricksP: "En cada nivel aprende un truco nuevo. Toca uno para verlo.", tricks: ["Saltito", "Pirueta", "Bailecito", "Voltereta", "Saludo", "Malabares", "Arcoíris"], trickNew: (x) => `¡Nuevo truco: ${x}!`,
  share: "Compartir", shareText: "Mi compañero en Tanetto", shareFallback: "Mantén pulsada la imagen para guardarla y compártela donde quieras.", shareLevel: (n, l) => `¡${n} ha llegado al nivel ${l}!`, shareRecord: (n) => `¡Nuevo récord: ${n} puntos!`, shareMaking: "Preparando la imagen...",
  together: "¿Y tú? ¡Merendamos juntos!", togetherBtn: (g) => `Yo también: ${g}`,
  ritualT: "Ritual de buenas noches", ritualP: "Tres pequeños gestos antes de dormir. Haz los que te apetezcan.", ritual: ["Luces suaves", "Móvil lejos de la cama", "Un pensamiento bonito de hoy"], ritualB: "Buenas noches",
  visit: (f) => `¡Hoy ha venido a verme ${f}!`, visitHi: (f) => `¡${f} te saluda!`,
  remind: { water: "Oye, es buen momento para un vaso de agua.", pause: "¿Qué tal una pequeña pausa? Aunque sean cinco minutos.", sleep: "Se está haciendo tarde. La cama nos espera.", move: "¿Estiramos un poco las piernas?" },
  summaryT: (n) => `El resumen de ${n}`, summary: (g, best) => g ? `Esta semana has completado ${g} objetivos. Tu mejor día fue el ${best}. ¡Estoy orgulloso de ti!` : "Esta semana ha sido tranquila. Está bien así: volvemos a empezar juntos, paso a paso.",
  legalT: "Guía e información", guideB: "Cómo funciona", privB: "Política de privacidad", termsB: "Condiciones de uso", healthB: "Aviso de salud", creditsB: "Créditos y licencias", tutAgain: "Ver otra vez la guía inicial", ownerMissing: "[por completar antes de la publicación]",
  guide: [
    ["¿Cómo funciona Tanetto?", "Eliges pequeños objetivos para cuidarte. Cada vez que completas uno, tu compañero gana energía y tú ganas Tanì."],
    ["¿Para qué sirven los Tanì?", "Con los Tanì decoras la casita y eliges qué se pone tu compañero. Las ganas con objetivos, regalos, aventuras y juegos."],
    ["¿Qué es la energía?", "Cuando completas todos los objetivos del día, la energía se llena y tu compañero puede irse de aventura. Vuelve con una postal."],
    ["¿Y la alegría?", "Sube cuando te cuidas y hacéis cosas juntos. Nunca baja sola: aquí nadie te hace sentir culpable."],
    ["¿Qué pasa si me salto un día?", "Nada grave. Puedes marcar un día de descanso y tu racha no se rompe. El regalo del día simplemente vuelve a empezar."],
    ["¿Qué son las fiestas de temporada?", "En cada estación, al completar 20 objetivos, ganas un gorro especial para tu compañero."],
    ["¿Cómo comparto mis avances?", "Toca «Compartir» en la postal de la semana, en las fotos, en el jardín, en las postales de viaje o al subir de nivel."],
    ["¿Dónde están mis datos?", "Solo en este dispositivo. Si cambias de móvil o borras los datos del navegador, el progreso empieza de cero."]
  ],
  terms: [
    "Tanetto es una versión de prueba gratuita, ofrecida tal cual, sin garantía de funcionamiento continuo. Puede cambiar o interrumpirse en cualquier momento.",
    "La app ayuda a crear pequeños hábitos diarios con un compañero virtual y no sustituye el consejo médico o psicológico.",
    "Lo que escribes es tuyo y se queda en tu dispositivo. Usa la app con calma, sin forzarte.",
    "Las ilustraciones, textos, música y código de Tanetto están protegidos por derechos de autor y no se pueden copiar ni reutilizar sin permiso.",
    "Para cualquier duda puedes escribir al contacto indicado en la política de privacidad."
  ],
  health: [
    "Tanetto no es un producto sanitario y no ofrece diagnósticos, tratamientos ni terapias.",
    "Los ejercicios de respiración y estiramiento son suaves. Para enseguida si sientes dolor, mareo o molestias, y consulta a un médico si tienes dudas.",
    "Si estás pasando un momento difícil, habla con alguien de confianza o con un profesional. En caso de peligro, llama enseguida a los números de abajo."
  ],
  credits: [
    "Las ilustraciones, personajes, textos y música se han creado expresamente para Tanetto.",
    "Tipografías: Fredoka y Figtree, con licencia SIL Open Font License 1.1.",
    "Animaciones: biblioteca GSAP, distribuida gratuitamente por Webflow según su licencia.",
    "Los lugares reales de las postales son ilustraciones originales y simplificadas."
  ],
  tracks: ["Mañana de sol", "Paseo", "Té calentito", "Nana", "Prado en flor", "Llovizna", "Nubes lentas", "Farolillos", "Olas del lago", "Bosque tranquilo", "Domingo perezoso", "Estrellas fugaces"]
});
