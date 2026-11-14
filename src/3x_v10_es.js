/* v10 (español): Temporada 0, sendero, retos, fiestas, escudos, resumen, colección, vuelta al mundo */
Object.assign(T.es, {
  rar: { b: "Básico", c: "Común", r: "Raro", e: "Épico", l: "Legendario" },
  season: {
    names: { lanterns: "Temporada de los Farolillos" }, zero: "Temporada 0", left: (d) => d === 1 ? "Queda 1 día" : `Quedan ${d} días`,
    tier: (n, m = 50) => `Etapa ${n} de ${m}`, passi: (n) => `${n} Pasos`, next: (n) => `${n} Pasos más para la próxima etapa`, open: "Abrir el sendero", pathT: "El sendero de la temporada",
    how: "Ganas Pasos solo cuidándote: 10 por cada objetivo, 20 por cada día completo y 100 por cada reto semanal. En la semana de fiesta valen el doble.",
    free: "Para todos", gold: "Fila dorada", claim: "Recoger", claimed: "Recogido", toClaim: (n) => n === 1 ? "1 premio por recoger" : `${n} premios por recoger`,
    tani: (n) => `${n} Tanì`, shield: (n) => n === 1 ? "1 escudo de racha" : `${n} escudos de racha`, got: (x) => `¡Has recibido: ${x}!`,
    founder: "Fundador", founderP: "Jugaste la Temporada 0: esta insignia y el farolillo dorado son tuyos para siempre.", fromPath: "Premio del sendero",
    goldLock: "La fila dorada es parte de Tanetto Plus", chapterT: (n) => `La historia de los farolillos · capítulo ${n}`,
    story: [
      "Esta noche {n} ha encontrado un farolillo de papel delante de la puerta. Dentro había una nota: «Cada pequeño gesto amable enciende una luz». ¿Quién lo habrá dejado?",
      "Cada vez que te cuidas, el farolillo brilla un poco más. {n} lo ha colgado en la ventana: desde fuera, dicen, parece una estrellita.",
      "Hoy han llegado más farolillos, uno para cada casa del barrio. Todo el mundo se pregunta lo mismo: ¿quién los trae? {n} tiene una sospecha...",
      "¡Una pista! En el alféizar hay unas huellitas doradas. {n} las sigue hasta el lago, donde el agua refleja mil lucecitas.",
      "En el lago, {n} conoce a la Guardiana de los Farolillos, una luciérnaga anciana y amable. «Los farolillos se encienden con el cariño que cada uno pone en sus días», dice con una sonrisa.",
      "Es la noche de la gran fiesta: todos los farolillos suben juntos al cielo. El tuyo es de los más brillantes, porque lo has encendido día tras día. Gracias por esta temporada juntos."
    ]
  },
  wk: {
    T: "Reto de la semana", goals: (n) => `Completa ${n} objetivos esta semana`, days: (n) => `Completa al menos 2 objetivos en ${n} días distintos`, full: (n) => `Completa todos los objetivos del día durante ${n} días`, cat: (n, c) => `Completa ${n} objetivos de la categoría «${c}»`,
    prog: (a, b) => `${a} de ${b}`, reward: (t, p) => `Premio: ${t} Tanì y ${p} Pasos`, claim: "Recoger premio", done: "¡Reto completado! El próximo llega el lunes.", ends: (d) => d <= 1 ? "Último día" : `Termina en ${d} días`
  },
  festa: { P: "Semana de fiesta: ¡los Pasos valen el doble!", names: ["Fiesta de los Buenos Propósitos", "Fiesta de los Abrazos", "Fiesta de los Brotes", "Fiesta de las Cometas", "Fiesta de las Flores", "Fiesta de las Luciérnagas", "Fiesta del Mar", "Fiesta de las Estrellas Fugaces", "Fiesta de los Cuadernos Nuevos", "Fiesta de las Hojas", "Fiesta de las Mantitas", "Fiesta de las Lucecitas"] },
  shield: { T: "Escudos de racha", P: "Si te saltas un día, un escudo protege tu racha automáticamente.", have: (n) => n === 1 ? "Tienes 1 escudo" : `Tienes ${n} escudos`, saved: "¡Un escudo ha protegido tu racha!" },
  rep: {
    T: "Tu mes", goals: (n) => n === 1 ? "1 objetivo completado" : `${n} objetivos completados`, days: (n) => n === 1 ? "1 día activo" : `${n} días activos`, top: (g) => `Tu hábito más fuerte: ${g}`, none: "Aún no hay nada que contar este mes: ¡completa tu primer objetivo!",
    full: "Resumen completo", fullT: (m) => `Tu resumen de ${m}`, weeks: "Objetivos semana a semana", moods: "Tu ánimo", cats: "Donde más te has cuidado", habits: "Tus hábitos más fuertes", tipT: (n) => `El consejo de ${n}`,
    tips: { body: "Este mes tu cuerpo ha tenido poco espacio: prueba a añadir un paseíto o un vaso de agua más.", mind: "Acuérdate de tu mente: un minuto de respiración al día hace maravillas.", home: "Un pequeño gesto para tu casa, como hacer la cama, hace los días más ligeros.", people: "Escribe a alguien que quieras: hasta un mensaje corto calienta el corazón.", work: "Prueba a hacer una pausa de verdad de vez en cuando: recarga energías.", sleep: "Dormir es un superpoder: prueba a apagar la pantalla un poco antes.", custom: "Tus objetivos personales son valiosos: sigue así." },
    plusOnly: "El resumen completo es parte de Tanetto Plus"
  },
  coll: { T: (m) => `Colección de ${m}`, P: "Objetos exclusivos de Tanetto Plus, solo este mes.", get: "Conseguir", unlock: "Desbloquear con Plus" },
  worldT: "Vuelta al mundo", worldP: (k) => `Excursiones exclusivas de Tanetto Plus: ${k} lugares maravillosos por descubrir.`,
  wishT: "Deseo", wishes: ["He pedido un deseo para ti: que mañana sea un día precioso.", "El farolillo vuela alto: ¡nos traerá suerte!", "Deseo concedido: un abrazo enorme, enorme.", "Qué bonito verlo subir... ¡como tus progresos!"],
  festival: { name: "Fiesta de los Farolillos", say: ["¡Mira cuántos farolillos en el lago!", "¿Encendemos el nuestro también?"], tap: "Toca el lago para soltar un farolillo" }
});
Object.assign(T.es.acts2, { wish: "Deseo" });
Object.assign(T.es.items, { h_lantern: "Sombrero farolillo", h_lantern_gold: "Corona de farolillos", w_lanterns: "Noche de farolillos", lamp_stone: "Farol de piedra", tree_lights: "Arbolito de lucecitas", rug_autumn: "Alfombra de otoño", curt_autumn: "Cortinas de otoño", founder_lantern: "Farolillo de los Fundadores", rug_moon: "Alfombra de la luna", h_acorn: "Gorro de bellota", h_beret: "Boina roja", w_leaves: "Hojas que bailan" });
Object.assign(T.es.plus, { perks: ["Sin anuncios, nunca", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Vuelta al mundo: ${k} excursiones exclusivas`, "La fila dorada del sendero, con premios mucho mejores", "Una colección exclusiva cada mes", "2 escudos de racha cada mes", "300 Tanì de regalo cada mes y +50 % de Tanì por los objetivos", "El resumen completo del mes, ilustrado y con consejos"] });
Object.assign(T.es.tani, { enough: ["Suficiente para un objeto común", "Suficiente para un objeto raro", "Suficiente para un objeto épico", "Suficiente para un objeto legendario"] });
T.es.tracks = T.es.tracks.concat(["Pasitos ligeros", "Mañana chispeante", "Mantita y té", "Pompas de jabón", "Corro de la patata", "Nube amable", "En bici", "Baile de luciérnagas", "Noche de farolillos"]);

T.es.world = [
  { name: "Pirámides de Guiza", t: "Más antiguas que lo antiguo", s: "{n} pasa junto a las Pirámides de Guiza a lomos de un camello, bajo un sol dorado. La Gran Pirámide tiene unos 4500 años y fue la construcción más alta del mundo durante casi 4000 años." },
  { name: "Santorini", t: "Cúpulas azules junto al mar", s: "{n} pasea entre casitas blancas y cúpulas azules, muy por encima del mar brillante. Santorini tiene forma de media luna porque es el borde de un antiguo volcán." },
  { name: "Cervino", t: "La montaña del chocolate", s: "Delante de un chalé de madera, {n} toma un chocolate caliente y contempla el Cervino. ¡Su pico es tan famoso que aparece en una conocida chocolatina suiza!" },
  { name: "Fiordos noruegos", t: "Donde los glaciares tallaron el mar", s: "{n} navega en una barquita entre altos acantilados verdes y cuenta las cascadas. Estos fiordos largos y profundos los excavaron glaciares gigantes durante la Edad de Hielo." },
  { name: "Laponia", t: "Luces que bailan", s: "Bajo las auroras boreales verdes que se arremolinan, {n} saluda a una familia de renos. ¿Sabías que en los renos tanto los machos como las hembras tienen cuernos?" },
  { name: "Islandia", t: "El cielo brilla", s: "{n} escucha una cascada mientras el cielo brilla de verde y rosa. Las auroras boreales aparecen cuando partículas diminutas que llegan del Sol chocan con el aire muy por encima de la Tierra." },
  { name: "Desierto del Sáhara", t: "Un oasis en la arena", s: "Tras una larga caminata por las dunas, {n} encuentra un oasis fresquito lleno de palmeras. La joroba del camello no guarda agua, sino grasa: así puede pasar muchos días sin comer." },
  { name: "Petra", t: "Una ciudad tallada en piedra", s: "{n} avanza de puntillas por un cañón estrecho y de pronto ve el Tesoro de Petra, brillando en rosa. ¡Lo tallaron directamente en la roca hace más de 2000 años!" },
  { name: "Safari en Kenia", t: "Hola, amiga altísima", s: "De safari, {n} observa a las jirafas mordisquear hojas de acacia, con el Kilimanjaro nevado a lo lejos. ¡La lengua de una jirafa puede medir casi medio metro!" },
  { name: "Cataratas Victoria", t: "El humo que truena", s: "{n} siente la brisa fresca de las Cataratas Victoria y descubre un arcoíris entre la niebla. La gente de allí las llama Mosi-oa-Tunya, que significa «el humo que truena»." },
  { name: "Taj Mahal", t: "Un palacio de luz", s: "{n} ve cómo el amanecer pinta el Taj Mahal de un rosa suave. Su mármol blanco parece cambiar de color durante el día: rosa al alba, blanco a mediodía y dorado al atardecer." },
  { name: "Angkor Wat", t: "Torres al amanecer", s: "{n} madruga para ver las torres de Angkor Wat reflejadas en el estanque al amanecer. Es el templo más grande del mundo, ¡y hasta aparece en la bandera de Camboya!" },
  { name: "Bali", t: "Escaleras verdes", s: "{n} pasea por terrazas de arroz que parecen escaleras verdes gigantes. Aquí los agricultores se reparten el agua con un ingenioso sistema de canales de más de 1000 años." },
  { name: "Maldivas", t: "Una casa sobre el agua", s: "{n} duerme en una cabañita sobre pilotes, con peces nadando justo debajo. Las Maldivas tienen unas 1200 islas y son el país más llano del mundo." },
  { name: "Gran Barrera de Coral", t: "¡Hola, pez payaso!", s: "{n} bucea con peces payaso y una tortuga marina muy tranquila entre corales de colores. ¡La Gran Barrera de Coral es tan grande que se ve desde el espacio!" },
  { name: "Sídney", t: "Velas junto al puerto", s: "{n} cruza el puerto en ferri para ver de cerca la Ópera de Sídney. ¡Sus tejados, con forma de velas, están cubiertos por más de un millón de azulejos!" },
  { name: "Banff", t: "El lago turquesa", s: "{n} rema en una canoa roja por un lago tan azul como una piedra preciosa. Su color viene de la «harina de roca», trocitos diminutos de piedra molidos por los glaciares." },
  { name: "Hawái", t: "Islas que siguen creciendo", s: "{n} construye un castillo de arena mientras un volcán echa humo a lo lejos. Cuando la lava llega al mar y se enfría, forma tierra nueva: ¡Hawái sigue creciendo!" },
  { name: "Galápagos", t: "Una amiga muy mayor", s: "{n} conoce a una tortuga gigante que mastica despacito una hoja de cactus. ¡Estas gigantes tranquilas pueden vivir más de 100 años!" },
  { name: "Machu Picchu", t: "Ciudad entre las nubes", s: "{n} sube a Machu Picchu mientras las nubes se apartan, y una llama simpática viene a saludar. Los incas encajaron sus piedras tan bien que no necesitaron ningún tipo de mortero." },
  { name: "Salar de Uyuni", t: "Caminar sobre el cielo", s: "{n} camina por el Salar de Uyuni, el mayor desierto de sal del mundo. Después de la lluvia se convierte en un espejo gigante, ¡y parece que caminas sobre el cielo!" },
  { name: "Patagonia", t: "La montaña que humea", s: "{n} ve cómo los picos de granito del Fitz Roy se tiñen de rosa al amanecer. Los pueblos de la zona lo llamaron Chaltén, «la montaña que humea», porque las nubes suelen girar alrededor de su cima." },
  { name: "Isla de Pascua", t: "Los gigantes de piedra", s: "{n} da los buenos días a los moái, los gigantes de piedra de la Isla de Pascua. Hay casi 1000, y la mayoría le da la espalda al mar." },
  { name: "Antártida", t: "Desfile de pingüinos", s: "{n} camina como un pingüino junto a un grupo de pingüinos emperador entre enormes icebergs. ¡Los papás pingüino mantienen el huevo calentito sobre sus patas unos dos meses, en pleno invierno!" }
];
