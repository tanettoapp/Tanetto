/* 1.0.6: traduzioni dei testi nuovi (de, es, fr, pt) */
(() => {
  const D = {
    de: {
      worlds: {
        fireflies: { name: "Glühwürmchenwald", desc: "Ein Wald in der Dämmerung voller tanzender Lichter", cards: [
          ["Lichter am Bach", "{n} saß am kleinen Bach und sah zu, wie die Glühwürmchen im Wasser funkelten, wie Sterne, die Lust auf ein Bad hatten."],
          ["Tee auf dem Baumstamm", "Auf einem moosigen Baumstamm trank {n} den kleinsten Tee der Welt, zusammen mit zwei sehr höflichen Pilzchen."],
          ["Der Spiraltanz", "Auf der Lichtung malten die Glühwürmchen eine Spirale aus Licht in die Luft. {n} staunte bis zur allerletzten Drehung."],
          ["Die Königin der Glühwürmchen", "Über den Bäumen erschien die goldene Königin der Glühwürmchen. Sie verneigte sich vor {n}, und der ganze Wald leuchtete auf einmal auf."]
        ] },
        shells: { name: "Muschelinsel", desc: "Eine Insel in Pastellfarben, an der das Meer leise summt", cards: [
          ["Zwischen den Felsen", "Zwischen den Felsen fand {n} kleine Wasserbecken voller Muscheln und einen Seestern, der ihm zuzuwinken schien."],
          ["Die Sandburg", "{n} baute eine Sandburg mit drei Türmen und einem winzigen Fähnchen. Die Wellen bewunderten sie aus sicherer Entfernung."],
          ["Schildkröte im Abendrot", "Bei Sonnenuntergang schwamm eine Meeresschildkröte langsam vorbei. {n} winkte, und die Schildkröte lächelte zurück."],
          ["Die leuchtende Perle", "Am Strand öffnete sich direkt vor {n} eine riesige Muschel. Darin leuchtete eine Perle, rund wie der Mond."]
        ] },
        mushrooms: { name: "Tal der Riesenpilze", desc: "Ein Tal voller Pilze, so groß wie Häuser", cards: [
          ["Das Pilzdorf", "{n} spazierte zwischen kleinen Pilzhäuschen mit runden, leuchtenden Fenstern umher. Irgendwo duftete es nach warmer Suppe."],
          ["Schutz vor dem Regen", "Als der Regen kam, versteckte sich {n} unter einem riesigen Pilz und lauschte den Tropfen, die auf seinen Hut trommelten."],
          ["Sporen aus Licht", "Nachts ließen die Pilze blau leuchtende Sporen frei. {n} wollte sie zählen, aber sie schwebten kichernd davon."],
          ["Der Regenbogenpilz", "Tief im Tal fand {n} einen Pilz mit einem regenbogenbunten Hut. Man sagt, er wächst nur für die freundlichsten Herzen."]
        ] },
        library: { name: "Schwebende Bibliothek", desc: "Bücher, die zwischen den Wolken schweben", cards: [
          ["Eine Treppe aus Büchern", "{n} stieg eine Treppe aus Büchern hinauf, Stufe für Stufe, bis hoch zu den Wolken."],
          ["Vögel aus Papier", "Aus einem offenen Buch flatterte ein Schwarm Papiervögel. Einer landete kurz auf der Nase von {n}."],
          ["Die Leseecke", "Auf einer weichen Wolke standen ein gemütlicher Sessel und eine leuchtende Lampe. {n} kuschelte sich hinein und blätterte in Geschichten."],
          ["Das goldene Buch", "Unter tausend Büchern leuchtete eines heller als alle anderen: ein goldenes Buch voller Funken. {n} schlug es auf und fand eine ganz neue Geschichte."]
        ] },
        crystal: { name: "Kristallgarten", desc: "Blumen und Steine, die in allen Farben schimmern", cards: [
          ["Kristallblumen", "Auf einer stillen Wiese hörte {n} Kristallblumen im Wind klingen, wie winzige Glöckchen."],
          ["Das Prisma", "{n} hielt ein Prisma in einen Sonnenstrahl, und das Licht ergoss sich als Regenbogen über die Wiese."],
          ["Die Glitzerhöhle", "In der Kristallhöhle ließ jeder Schritt von {n} kleine bunte Lichtpunkte an den Wänden aufblitzen."],
          ["Das Kristallherz", "Ganz oben im Garten lag ein herzförmiger Kristall auf einem Sockel. Als {n} ihn berührte, leuchtete er sanft rosa."]
        ] },
        starsea: { name: "Sternenmeer", desc: "Ein nächtliches Meer, in dem sich der Himmel spiegelt", cards: [
          ["Boot und Laterne", "{n} fuhr in einem kleinen Boot mit einer leuchtenden Laterne an Sternen vorbei, die auf dem Wasser schwammen."],
          ["Der Mondpfad", "Der Mond legte einen silbernen Pfad über das Meer. {n} folgte ihm mit verträumtem Blick bis zum Horizont."],
          ["Sternschnuppen", "In dieser Nacht fielen so viele Sterne. {n} wünschte sich bei jedem etwas, und einer der Wünsche war für dich."],
          ["Der Sternenwal", "Ein sanfter Wal voller Sterne sprang aus dem Meer. Einen Moment lang sah {n} den Himmel schwimmen."]
        ] },
        sugar: { name: "Zuckerschloss", desc: "Ein Schloss aus Süßigkeiten in Pastellfarben", cards: [
          ["Lutscherbäume", "{n} spazierte durch einen Wald aus riesigen Lutschern, alle mit Spiralen und in allen Farben, die du dir vorstellen kannst."],
          ["Der Kakaofluss", "Auf einem Fluss aus heißem Kakao schaukelten weiche Marshmallows. {n} schnappte sich einen, der vorbeischwamm."],
          ["Zuckerwattewolken", "Rosa und hellblaue Wolken aus Zuckerwatte zogen über das Schloss. {n} probierte nur ein winziges Stückchen."],
          ["Der Tortenturm", "Im Schlosshof stand eine Torte, so hoch wie ein Turm, mit einer Kirsche obendrauf. Es war das süßeste Fest, das {n} je gefeiert hat."]
        ] },
        aurora: { name: "Ebene der Polarlichter", desc: "Verschneite Ebenen unter den Nordlichtern", cards: [
          ["Das leuchtende Iglu", "Im Schnee fand {n} ein Iglu mit einem warmen Lichtlein an der Tür. Drinnen war es herrlich gemütlich."],
          ["Vorhänge aus Licht", "Über den Hügeln wehte das Polarlicht wie grüne und violette Vorhänge. {n} schaute ganz still zu."],
          ["Der gefrorene See", "Auf dem gefrorenen See lief {n} zwischen den Kiefern Schlittschuh und malte Schleifen und Kringel ins Eis."],
          ["Der Polarlichtring", "In dieser Nacht legte das Polarlicht einen Regenbogenring um den Mond. {n} schaute hinauf und wusste: Das war ein ganz besonderer Gruß."]
        ] },
        dragon: { name: "Gipfel des sanften Drachen", desc: "Neblige Gipfel, auf denen ein lieber Drache wohnt", cards: [
          ["Das Nest am Felsen", "Hoch oben an einer Felswand entdeckte {n} ein Nest mit drei pastellfarbenen Eiern, warm und geborgen in der Sonne."],
          ["Tee über den Wolken", "Auf einem Felsvorsprung über den Wolken hatte jemand ein winziges Teeservice gedeckt. {n} hob die Tasse und stieß auf die Aussicht an."],
          ["Die Wolkenbrücke", "Zwischen zwei Gipfeln spannte sich eine Brücke aus weichen Wolken. {n} ging langsam hinüber und kicherte, als der Wind ihn kitzelte."],
          ["Der schlafende Drache", "Ganz oben lag ein runder, sanfter grüner Drache zusammengerollt und schlief. {n} wünschte ihm süße Träume, und er lächelte im Schlaf."]
        ] }
      },
      items: {
        rug_cloud: "Wolken-Teppich", rug_star: "Sternteppich", lamp_tulip: "Tulpenlampe", lamp_jelly: "Quallenlampe",
        plant_lavender: "Lavendeltopf", plant_cherry: "Kirschblüte", art_dreamcatcher: "Traumfänger", art_moons: "Mondphasen",
        shelf_potions: "Regal mit Tränken", garland_flowers: "Blumen-Girlande", ceil_stars: "Sternendecke", pillows: "Kissenberg",
        star_scope: "Teleskop", curt_night: "Nachtvorhänge",
        h_flower: "Blumenspange", h_bear: "Bärenohren", h_sailor: "Matrosenmütze", h_mush: "Pilzhut",
        h_strawberry: "Erdbeerhut", h_nightcap: "Schlafmütze", h_cloud: "Wölkchen", h_cupcake: "Cupcake-Hut",
        h_halo: "Heiligenschein", h_dragon: "Drachen-Hörner", h_tiara: "Kristall-Tiara", h_starcrown: "Sternenkrone",
        w_dots: "Pünktchen", w_hearts: "Herzchen", w_waves: "Meereswellen", w_candy: "Zucker-Streifen", w_flowers: "Blumenwiese",
        w_mush: "Pilzwald", w_books: "Bibliothek", w_honey: "Honigwaben", w_aurora: "Nordlichter", w_moon: "Mondträume",
        sv_fireflies: "Leuchtkäfer-Glas", sv_shells: "Perlmuschel", sv_mushrooms: "Pilzhocker", sv_library: "Fliegende Bücher",
        sv_crystal: "Kristall-Geode", sv_starsea: "Sternenboot", sv_sugar: "Tortenkissen", sv_aurora: "Nordlicht-Kugel",
        sv_dragon: "Plüschdrache", sv_album: "Goldenes Album"
      },
      goals: {
        stairs: "Die Treppe nehmen", skin: "Meine Haut pflegen", green: "Zeit im Grünen verbringen", meditate: "Fünf Minuten meditieren",
        podcast: "Etwas Spannendes anhören", language: "Eine Sprache üben", doodle: "Ein kleines Bild kritzeln", prep: "Das Mittagessen für morgen vorbereiten",
        trash: "Den Müll rausbringen", air: "Die Fenster öffnen und lüften", family: "Mich bei der Familie melden", compliment: "Ein ehrliches Kompliment machen",
        nicemsg: "Eine liebe Nachricht schicken", plan: "Den morgigen Tag planen", budget: "Meine Ausgaben anschauen", desk: "Den Schreibtisch aufräumen"
      },
      notif: {
        msgs: [
          "{n} hat dir eine Tasse Tee gekocht. Hast du zwei Minuten für ein Ziel?",
          "Ein kleiner Schritt heute zählt. {n} wartet auf dich.",
          "{n} schaut immer wieder zur Tür: ein Ziel, und das Lächeln ist zurück.",
          "Schon eine einzige Sache ist perfekt. {n} drückt dir die Daumen.",
          "{n} hat dir einen Platz auf dem Kissen freigehalten. Bis gleich?",
          "Atme kurz durch. Dann ein winziges Ziel, zusammen mit {n}.",
          "{n} hat etwas Schönes gefunden, das er dir zeigen möchte.",
          "Wie war dein Tag? {n} würde es gern wissen.",
          "Ein Glas Wasser, ein paar Schritte, eine Seite: {n} sucht mit dir aus.",
          "{n} hat das Zimmer aufgeräumt und wartet darauf, mit dir zu feiern.",
          "Fünf Minuten für dich, nur fünf. {n} ist da.",
          "Der Tag ist noch nicht vorbei: {n} glaubt an dich."
        ],
        streak: "{k} Tage in Folge zusammen! Ein kleines Ziel reicht, {n} wartet auf dich.",
        last: "{n} denkt an dich. Wann immer du magst: Dein Zimmer ist hier.",
        trip: "{place}: {n} ist wieder da!",
        tripB: "Er hat dir eine Postkarte mitgebracht 💌"
      },
      rarM: "Mythisch"
    },
    es: {
      worlds: {
        fireflies: { name: "Bosque de las luciérnagas", desc: "Un bosque al anochecer lleno de lucecitas que bailan", cards: [
          ["Luces en el arroyo", "{n} se sentó junto al arroyo a ver las luciérnagas reflejarse en el agua, como estrellas con ganas de darse un baño."],
          ["Té sobre un tronco", "Sobre un tronco cubierto de musgo, {n} se tomó el té más pequeño del mundo con dos setitas muy educadas."],
          ["La danza en espiral", "En el claro, las luciérnagas dibujaron una espiral de luz en el aire. {n} la contempló con asombro hasta la última vuelta."],
          ["La reina de las luciérnagas", "Sobre los árboles apareció la reina de las luciérnagas, toda dorada. Le hizo una reverencia a {n} y el bosque entero se iluminó de golpe."]
        ] },
        shells: { name: "Isla de las caracolas", desc: "Una isla de color pastel donde el mar canta bajito", cards: [
          ["Charcos entre las rocas", "Entre las rocas, {n} encontró charquitos llenos de caracolas y una estrella de mar que parecía saludar."],
          ["El castillo de arena", "{n} construyó un castillo de arena con tres torres y una banderita. Las olas lo admiraron desde una distancia prudente."],
          ["Tortuga al atardecer", "Al atardecer, una tortuga marina pasó nadando despacito. {n} la saludó, y ella le devolvió la sonrisa."],
          ["La perla brillante", "En la playa, una ostra gigante se abrió justo delante de {n}. Dentro brillaba una perla, redonda como la luna."]
        ] },
        mushrooms: { name: "Valle de setas gigantes", desc: "Un valle de setas tan altas como casas", cards: [
          ["El pueblo de las setas", "{n} paseó entre casitas con forma de seta y ventanas redondas iluminadas. Algo olía a sopa calentita."],
          ["Refugio de la lluvia", "Cuando llegó la lluvia, {n} se escondió bajo una seta enorme y escuchó las gotas tamborilear sobre su sombrero."],
          ["Esporas de luz", "Por la noche, las setas soltaron esporas azules y brillantes. {n} intentó contarlas, pero se fueron volando entre risitas."],
          ["La seta arcoíris", "En lo más hondo del valle, {n} encontró una seta con el sombrero de color arcoíris. Dicen que solo crece para los corazones más amables."]
        ] },
        library: { name: "Biblioteca flotante", desc: "Libros que vuelan entre las nubes", cards: [
          ["Una escalera de libros", "{n} subió por una escalera hecha de libros, peldaño a peldaño, hasta llegar a las nubes."],
          ["Pajaritos de papel", "De un libro abierto salió volando una bandada de pajaritos de papel. Uno se posó un momento en la nariz de {n}."],
          ["El rincón de lectura", "Sobre una nube mullida había un sillón acogedor y una lámpara encendida. {n} se acurrucó allí a hojear cuentos."],
          ["El libro dorado", "Entre mil libros, uno brillaba más que los demás: un libro dorado lleno de destellos. {n} lo abrió y encontró una historia nueva."]
        ] },
        crystal: { name: "Jardín de cristal", desc: "Flores y piedras que brillan de mil colores", cards: [
          ["Flores de cristal", "En un prado tranquilo, {n} oyó tintinear las flores de cristal con la brisa, como campanitas."],
          ["El prisma", "{n} puso un prisma bajo un rayo de sol, y la luz se derramó sobre el prado convertida en arcoíris."],
          ["La cueva de los destellos", "Dentro de la cueva de cristal, cada paso de {n} encendía pequeños destellos de colores en las paredes."],
          ["El corazón de cristal", "En lo alto del jardín, sobre un pedestal, descansaba un cristal con forma de corazón. Cuando {n} lo rozó, brilló con un rosa suave."]
        ] },
        starsea: { name: "Mar de estrellas", desc: "Un mar nocturno que refleja el cielo", cards: [
          ["Barca y farolillo", "{n} navegó en una barquita con un farolillo encendido, entre estrellas que flotaban sobre el agua."],
          ["El camino de la luna", "La luna tendió un camino de plata sobre el mar. {n} lo siguió con mirada soñadora hasta el horizonte."],
          ["Estrellas fugaces", "Esa noche cayeron muchísimas estrellas. {n} pidió un deseo con cada una, y uno de ellos era para ti."],
          ["La ballena estrellada", "Una ballena amable, cubierta de estrellas, saltó fuera del mar. Por un instante, {n} vio nadar al cielo."]
        ] },
        sugar: { name: "Castillo de azúcar", desc: "Un castillo de golosinas de color pastel", cards: [
          ["Árboles de piruleta", "{n} paseó por un bosque de piruletas gigantes, todas en espiral y de todos los colores que puedas imaginar."],
          ["El río de chocolate", "Por un río de chocolate caliente flotaban malvaviscos blanditos. {n} atrapó uno al vuelo."],
          ["Nubes de algodón de azúcar", "Sobre el castillo pasaban nubes de algodón de azúcar rosas y celestes. {n} probó solo un pedacito."],
          ["La torre de tarta", "En el patio del castillo había una tarta alta como una torre, con una cereza encima. Fue la fiesta más dulce que {n} había tenido nunca."]
        ] },
        aurora: { name: "Llanura de la aurora", desc: "Llanuras nevadas bajo las luces del norte", cards: [
          ["El iglú iluminado", "En la nieve, {n} encontró un iglú con una lucecita cálida en la entrada. Dentro se estaba de maravilla."],
          ["Cortinas de luz", "Sobre las colinas, la aurora se mecía como cortinas verdes y violetas. {n} la miró sin decir nada."],
          ["El lago helado", "En el lago helado, {n} patinó entre los pinos dibujando círculos y espirales sobre el hielo."],
          ["El anillo de la aurora", "Esa noche, la aurora dibujó un anillo de arcoíris alrededor de la luna. {n} miró hacia arriba y supo que era un saludo muy especial."]
        ] },
        dragon: { name: "Cumbre del dragón amable", desc: "Cumbres entre la niebla donde vive un dragón bueno", cards: [
          ["El nido en la roca", "En lo alto de un acantilado, {n} vio un nido con tres huevos de color pastel, calentitos bajo el sol."],
          ["Té sobre las nubes", "En un saliente sobre las nubes, alguien había preparado un juego de té diminuto. {n} brindó por las vistas."],
          ["El puente de nubes", "Entre dos cumbres se extendía un puente de nubes esponjosas. {n} lo cruzó despacio, riéndose con las cosquillas del viento."],
          ["El dragón dormido", "En lo más alto dormía acurrucado un dragón verde, redondo y bueno. {n} le deseó dulces sueños, y el dragón sonrió en sueños."]
        ] }
      },
      items: {
        rug_cloud: "Alfombra nube", rug_star: "Alfombra estrella", lamp_tulip: "Lámpara tulipán", lamp_jelly: "Lámpara medusa",
        plant_lavender: "Maceta de lavanda", plant_cherry: "Cerezo en flor", art_dreamcatcher: "Atrapasueños", art_moons: "Fases lunares",
        shelf_potions: "Repisa de pociones", garland_flowers: "Guirnalda floral", ceil_stars: "Techo estrellado", pillows: "Montón de cojines",
        star_scope: "Telescopio", curt_night: "Cortinas de noche",
        h_flower: "Pinza de flor", h_bear: "Orejas de oso", h_sailor: "Gorra de marinero", h_mush: "Gorro de seta",
        h_strawberry: "Gorro de fresa", h_nightcap: "Gorro de dormir", h_cloud: "Nubecita", h_cupcake: "Gorro cupcake",
        h_halo: "Aureola dorada", h_dragon: "Cuernos de dragón", h_tiara: "Tiara de cristal", h_starcrown: "Corona estelar",
        w_dots: "Lunares", w_hearts: "Corazoncitos", w_waves: "Olas del mar", w_candy: "Rayas de caramelo", w_flowers: "Prado de flores",
        w_mush: "Bosque de setas", w_books: "Biblioteca", w_honey: "Panal de miel", w_aurora: "Aurora boreal", w_moon: "Sueños de luna",
        sv_fireflies: "Tarro de lucecitas", sv_shells: "Concha con perla", sv_mushrooms: "Taburete seta", sv_library: "Libros voladores",
        sv_crystal: "Geoda de cristal", sv_starsea: "Barca de estrellas", sv_sugar: "Cojín de tarta", sv_aurora: "Bola de aurora",
        sv_dragon: "Dragón de peluche", sv_album: "Álbum dorado"
      },
      goals: {
        stairs: "Subir por las escaleras", skin: "Cuidar mi piel", green: "Pasar un rato en la naturaleza", meditate: "Meditar cinco minutos",
        podcast: "Escuchar algo interesante", language: "Practicar un idioma", doodle: "Hacer un dibujito", prep: "Preparar la comida de mañana",
        trash: "Sacar la basura", air: "Abrir las ventanas y ventilar", family: "Hablar con alguien de la familia", compliment: "Hacer un cumplido sincero",
        nicemsg: "Mandar un mensaje amable", plan: "Organizar el día de mañana", budget: "Echar un vistazo a mis gastos", desk: "Ordenar el escritorio"
      },
      notif: {
        msgs: [
          "{n} te ha preparado una taza de té. ¿Tienes dos minutos para un objetivo?",
          "Un pasito hoy cuenta. {n} te está esperando.",
          "{n} no deja de mirar la puerta: un objetivo y vuelve la sonrisa.",
          "Con una sola cosa ya está genial. {n} te está animando.",
          "{n} te ha guardado un sitio en el cojín. ¿Nos vemos?",
          "Respira un momento. Luego, un objetivo pequeñito, junto a {n}.",
          "{n} ha encontrado algo bonito para enseñarte.",
          "¿Qué tal te ha ido hoy? A {n} le encantaría saberlo.",
          "Un vaso de agua, un paseíto, una página: {n} elige contigo.",
          "{n} ha ordenado la habitación y te espera para celebrarlo juntos.",
          "Cinco minutos para ti, aunque sean solo cinco. {n} está aquí.",
          "El día aún no ha terminado: {n} cree en ti."
        ],
        streak: "¡{k} días seguidos juntos! Basta con un objetivo pequeño, {n} te espera.",
        last: "{n} piensa en ti. Cuando quieras, tu habitación está aquí.",
        trip: "{place}: ¡{n} ha vuelto!",
        tripB: "Te ha traído una postal 💌"
      },
      rarM: "Mítico"
    },
    fr: {
      worlds: {
        fireflies: { name: "Bois des lucioles", desc: "Un bois au crépuscule plein de petites lumières qui dansent", cards: [
          ["Lumières sur le ruisseau", "{n} s'est assis au bord du petit ruisseau pour regarder les lucioles scintiller dans l'eau, comme des étoiles qui avaient envie de se baigner."],
          ["Thé sur un tronc", "Sur un tronc couvert de mousse, {n} a bu le plus petit thé du monde avec deux champignons très bien élevés."],
          ["La danse en spirale", "Dans la clairière, les lucioles ont dessiné une spirale de lumière. {n} l'a regardée, émerveillé, jusqu'au tout dernier tour."],
          ["La reine des lucioles", "Au-dessus des arbres est apparue la reine des lucioles, toute dorée. Elle s'est inclinée devant {n}, et tout le bois s'est illuminé d'un coup."]
        ] },
        shells: { name: "Île aux coquillages", desc: "Une île pastel où la mer chantonne doucement", cards: [
          ["Les flaques des rochers", "Entre les rochers, {n} a trouvé de petites flaques pleines de coquillages, et une étoile de mer qui semblait lui dire bonjour."],
          ["Le château de sable", "{n} a construit un château de sable avec trois tours et un minuscule drapeau. Les vagues l'ont admiré de loin, prudemment."],
          ["Tortue au coucher du soleil", "Au coucher du soleil, une tortue de mer est passée tout doucement. {n} lui a fait coucou, et elle lui a souri."],
          ["La perle brillante", "Sur la plage, un coquillage géant s'est ouvert juste devant {n}. À l'intérieur brillait une perle, ronde comme la lune."]
        ] },
        mushrooms: { name: "Val des champignons géants", desc: "Une vallée de champignons hauts comme des maisons", cards: [
          ["Le village des champignons", "{n} s'est promené entre de petites maisons-champignons aux fenêtres rondes et lumineuses. Ça sentait bon la soupe chaude."],
          ["À l'abri de la pluie", "Quand la pluie est arrivée, {n} s'est abrité sous un énorme champignon et a écouté les gouttes tambouriner sur son chapeau."],
          ["Spores de lumière", "La nuit, les champignons ont libéré des spores bleues et lumineuses. {n} a essayé de les compter, mais elles se sont envolées en riant."],
          ["Le champignon arc-en-ciel", "Au fond de la vallée, {n} a trouvé un champignon au chapeau arc-en-ciel. On dit qu'il ne pousse que pour les cœurs les plus gentils."]
        ] },
        library: { name: "Bibliothèque flottante", desc: "Des livres qui flottent parmi les nuages", cards: [
          ["Un escalier de livres", "{n} a grimpé un escalier fait de livres, une marche après l'autre, jusqu'aux nuages."],
          ["Oiseaux de papier", "D'un livre ouvert s'est envolée une nuée d'oiseaux de papier. L'un d'eux s'est posé un instant sur le nez de {n}."],
          ["Le coin lecture", "Sur un nuage moelleux, il y avait un fauteuil douillet et une lampe allumée. {n} s'y est blotti pour feuilleter des histoires."],
          ["Le livre doré", "Parmi mille livres, un seul brillait plus que les autres : un livre doré plein d'étincelles. {n} l'a ouvert et y a trouvé une toute nouvelle histoire."]
        ] },
        crystal: { name: "Jardin de cristal", desc: "Des fleurs et des pierres qui scintillent de mille couleurs", cards: [
          ["Fleurs de cristal", "Dans un pré tranquille, {n} a entendu des fleurs de cristal tinter dans la brise, comme de minuscules clochettes."],
          ["Le prisme", "{n} a placé un prisme dans un rayon de soleil, et la lumière s'est répandue en arc-en-ciel sur le pré."],
          ["La grotte scintillante", "Dans la grotte de cristal, chaque pas de {n} allumait de petits reflets colorés sur les parois."],
          ["Le cœur de cristal", "Tout en haut du jardin, un cristal en forme de cœur reposait sur un socle. Quand {n} l'a effleuré, il s'est mis à briller d'un rose tendre."]
        ] },
        starsea: { name: "Mer d'étoiles", desc: "Une mer de nuit où se reflète le ciel", cards: [
          ["Barque et lanterne", "{n} a navigué sur une petite barque avec une lanterne allumée, parmi les étoiles qui flottaient sur l'eau."],
          ["Le chemin de lune", "La lune a tracé un chemin d'argent sur la mer. {n} l'a suivi d'un regard rêveur jusqu'à l'horizon."],
          ["Étoiles filantes", "Cette nuit-là, tant d'étoiles sont tombées. {n} a fait un vœu pour chacune, et l'un d'eux était pour toi."],
          ["La baleine étoilée", "Une gentille baleine couverte d'étoiles a bondi hors de la mer. L'espace d'un instant, {n} a vu le ciel nager."]
        ] },
        sugar: { name: "Château de sucre", desc: "Un château pastel tout en bonbons", cards: [
          ["Arbres à sucettes", "{n} s'est promené dans une forêt de sucettes géantes, toutes en spirale et de toutes les couleurs imaginables."],
          ["La rivière de chocolat", "Des guimauves toutes douces flottaient sur une rivière de chocolat chaud. {n} en a attrapé une au passage."],
          ["Nuages de barbe à papa", "Des nuages de barbe à papa roses et bleus passaient au-dessus du château. {n} en a goûté un tout petit morceau."],
          ["La tour de gâteau", "Dans la cour du château se dressait un gâteau haut comme une tour, avec une cerise au sommet. Jamais {n} n'avait fait une fête aussi douce."]
        ] },
        aurora: { name: "Plaines de l'aurore", desc: "Des plaines enneigées sous les aurores boréales", cards: [
          ["L'igloo lumineux", "Dans la neige, {n} a trouvé un igloo avec une petite lumière chaude à l'entrée. À l'intérieur, on était merveilleusement bien."],
          ["Rideaux de lumière", "Au-dessus des collines, l'aurore ondulait comme des rideaux verts et violets. {n} l'a regardée sans un mot."],
          ["Le lac gelé", "Sur le lac gelé, {n} a patiné entre les sapins en dessinant des boucles et des arabesques sur la glace."],
          ["L'anneau de l'aurore", "Cette nuit-là, l'aurore a dessiné un anneau arc-en-ciel autour de la lune. {n} a levé les yeux et a compris que c'était un bonjour très spécial."]
        ] },
        dragon: { name: "Pic du gentil dragon", desc: "Des sommets dans la brume où vit un dragon tout gentil", cards: [
          ["Le nid sur la falaise", "Tout en haut d'une falaise, {n} a repéré un nid avec trois œufs pastel, bien au chaud au soleil."],
          ["Thé au-dessus des nuages", "Sur une corniche au-dessus des nuages, quelqu'un avait installé un minuscule service à thé. {n} a levé sa tasse face à la vue."],
          ["Le pont de nuages", "Un pont de nuages tout doux reliait deux sommets. {n} l'a traversé lentement, en riant quand le vent le chatouillait."],
          ["Le dragon endormi", "Tout au sommet dormait un dragon vert, rond et gentil, roulé en boule. {n} lui a souhaité de beaux rêves, et il a souri dans son sommeil."]
        ] }
      },
      items: {
        rug_cloud: "Tapis nuage", rug_star: "Tapis étoile", lamp_tulip: "Lampe tulipe", lamp_jelly: "Lampe méduse",
        plant_lavender: "Pot de lavande", plant_cherry: "Cerisier en fleur", art_dreamcatcher: "Attrape-rêves", art_moons: "Phases de la lune",
        shelf_potions: "Étagère à potions", garland_flowers: "Guirlande fleurie", ceil_stars: "Plafond étoilé", pillows: "Pile de coussins",
        star_scope: "Télescope", curt_night: "Rideaux de nuit",
        h_flower: "Barrette fleur", h_bear: "Oreilles d'ours", h_sailor: "Casquette de marin", h_mush: "Chapeau champignon",
        h_strawberry: "Chapeau fraise", h_nightcap: "Bonnet de nuit", h_cloud: "Petit nuage", h_cupcake: "Chapeau cupcake",
        h_halo: "Auréole dorée", h_dragon: "Cornes de dragon", h_tiara: "Tiare de cristal", h_starcrown: "Couronne d'étoiles",
        w_dots: "À pois", w_hearts: "Petits cœurs", w_waves: "Vagues marines", w_candy: "Rayures bonbon", w_flowers: "Pré fleuri",
        w_mush: "Petits champignons", w_books: "Bibliothèque", w_honey: "Nid d'abeilles", w_aurora: "Aurore boréale", w_moon: "Rêves de lune",
        sv_fireflies: "Bocal à lucioles", sv_shells: "Coquillage perlé", sv_mushrooms: "Pouf champignon", sv_library: "Livres volants",
        sv_crystal: "Géode de cristal", sv_starsea: "Barque étoilée", sv_sugar: "Coussin gâteau", sv_aurora: "Boule boréale",
        sv_dragon: "Dragon en peluche", sv_album: "Album doré"
      },
      goals: {
        stairs: "Prendre les escaliers", skin: "Prendre soin de ma peau", green: "Passer du temps dans la nature", meditate: "Méditer cinq minutes",
        podcast: "Écouter quelque chose d'intéressant", language: "Pratiquer une langue", doodle: "Faire un petit dessin", prep: "Préparer mon déjeuner de demain",
        trash: "Sortir les poubelles", air: "Ouvrir les fenêtres pour aérer", family: "Prendre des nouvelles de ma famille", compliment: "Faire un compliment sincère",
        nicemsg: "Envoyer un gentil message", plan: "Organiser ma journée de demain", budget: "Jeter un œil à mes dépenses", desk: "Ranger mon bureau"
      },
      notif: {
        msgs: [
          "{n} t'a préparé une tasse de thé. Tu as deux minutes pour un objectif ?",
          "Un petit pas aujourd'hui, ça compte. {n} t'attend.",
          "{n} n'arrête pas de regarder la porte : un objectif, et le sourire revient.",
          "Une seule chose, c'est déjà parfait. {n} t'encourage.",
          "{n} t'a gardé une place sur le coussin. On se voit bientôt ?",
          "Respire un coup. Puis un tout petit objectif, avec {n}.",
          "{n} a trouvé quelque chose de joli à te montrer.",
          "Comment s'est passée ta journée ? {n} aimerait bien le savoir.",
          "Un verre d'eau, quelques pas, une page : {n} choisit avec toi.",
          "{n} a rangé la chambre et t'attend pour fêter ça.",
          "Cinq minutes pour toi, rien que cinq. {n} est là.",
          "La journée n'est pas encore finie : {n} croit en toi."
        ],
        streak: "{k} jours d'affilée ensemble ! Un petit objectif suffit, {n} t'attend.",
        last: "{n} pense à toi. Quand tu veux, ta chambre est là.",
        trip: "{place} : {n} est de retour !",
        tripB: "Il t'a rapporté une carte postale 💌"
      },
      rarM: "Mythique"
    },
    pt: {
      worlds: {
        fireflies: { name: "Bosque dos vaga-lumes", desc: "Um bosque ao entardecer cheio de luzinhas dançantes", cards: [
          ["Luzes no riacho", "{n} se sentou perto do riacho para ver os vaga-lumes brilharem na água, como estrelas com vontade de tomar banho."],
          ["Chá no tronco", "Num tronco coberto de musgo, {n} tomou o menor chá do mundo com dois cogumelinhos muito educados."],
          ["A dança em espiral", "Na clareira, os vaga-lumes desenharam uma espiral de luz no ar. {n} ficou olhando, encantado, até a última volta."],
          ["A rainha dos vaga-lumes", "Acima das árvores apareceu a rainha dos vaga-lumes, toda dourada. Ela fez uma reverência para {n}, e o bosque inteiro se acendeu de uma vez."]
        ] },
        shells: { name: "Ilha das conchas", desc: "Uma ilha cor pastel onde o mar canta baixinho", cards: [
          ["Poças de maré", "Entre as pedras, {n} achou pocinhas cheias de conchas e uma estrela-do-mar que parecia dar oi."],
          ["O castelo de areia", "{n} construiu um castelo de areia com três torres e uma bandeirinha. As ondas ficaram admirando de longe, por segurança."],
          ["Tartaruga no pôr do sol", "No pôr do sol, uma tartaruga marinha passou nadando bem devagar. {n} acenou, e ela sorriu de volta."],
          ["A pérola brilhante", "Na praia, uma concha gigante se abriu bem na frente de {n}. Lá dentro brilhava uma pérola, redonda como a lua."]
        ] },
        mushrooms: { name: "Vale de cogumelos gigantes", desc: "Um vale de cogumelos altos como casas", cards: [
          ["A vila dos cogumelos", "{n} passeou entre casinhas de cogumelo com janelas redondas e iluminadas. Tinha um cheirinho de sopa quente no ar."],
          ["Abrigo da chuva", "Quando a chuva chegou, {n} se escondeu debaixo de um cogumelo enorme e ficou ouvindo as gotas batucarem no chapéu dele."],
          ["Esporos de luz", "À noite, os cogumelos soltaram esporos azuis e brilhantes. {n} tentou contar, mas eles saíram voando, dando risadinhas."],
          ["O cogumelo arco-íris", "No fundo do vale, {n} encontrou um cogumelo com chapéu cor de arco-íris. Dizem que ele só nasce para os corações mais gentis."]
        ] },
        library: { name: "Biblioteca flutuante", desc: "Livros que voam entre as nuvens", cards: [
          ["Uma escada de livros", "{n} subiu uma escada feita de livros, um degrau de cada vez, até chegar às nuvens."],
          ["Passarinhos de papel", "De um livro aberto saiu voando um bando de passarinhos de papel. Um deles pousou por um instante no nariz de {n}."],
          ["O cantinho da leitura", "Numa nuvem fofinha havia uma poltrona aconchegante e um abajur aceso. {n} se aninhou ali para folhear histórias."],
          ["O livro dourado", "Entre mil livros, um brilhava mais que todos: um livro dourado cheio de faíscas. {n} abriu e encontrou uma história novinha em folha."]
        ] },
        crystal: { name: "Jardim de cristal", desc: "Flores e pedras que brilham em mil cores", cards: [
          ["Flores de cristal", "Num campo tranquilo, {n} ouviu flores de cristal tilintarem com a brisa, como sininhos."],
          ["O prisma", "{n} colocou um prisma sob um raio de sol, e a luz se espalhou pelo campo como um arco-íris."],
          ["A caverna cintilante", "Na caverna de cristal, cada passo de {n} acendia pequenos reflexos coloridos nas paredes."],
          ["O coração de cristal", "No alto do jardim, sobre um pedestal, havia um cristal em forma de coração. Quando {n} encostou nele, ele se acendeu num rosa suave."]
        ] },
        starsea: { name: "Mar de estrelas", desc: "Um mar noturno que reflete o céu", cards: [
          ["Barco e lanterna", "{n} navegou num barquinho com uma lanterna acesa, entre estrelas que flutuavam na água."],
          ["O caminho da lua", "A lua estendeu um caminho de prata sobre o mar. {n} seguiu com o olhar sonhador até o horizonte."],
          ["Estrelas cadentes", "Caíram tantas estrelas naquela noite. {n} fez um pedido para cada uma, e um deles era para você."],
          ["A baleia estrelada", "Uma baleia gentil, coberta de estrelas, saltou do mar. Por um instante, {n} viu o céu nadar."]
        ] },
        sugar: { name: "Castelo de açúcar", desc: "Um castelo de doces cor pastel", cards: [
          ["Árvores de pirulito", "{n} passeou por um bosque de pirulitos gigantes, todos em espiral e de todas as cores que você puder imaginar."],
          ["O rio de chocolate", "Marshmallows macios boiavam num rio de chocolate quente. {n} pegou um que passava boiando."],
          ["Nuvens de algodão-doce", "Nuvens de algodão-doce cor-de-rosa e azuis passavam sobre o castelo. {n} provou só um pedacinho."],
          ["A torre de bolo", "No pátio do castelo havia um bolo alto como uma torre, com uma cereja no topo. Foi a festa mais doce que {n} já teve."]
        ] },
        aurora: { name: "Planície da aurora", desc: "Planícies de neve sob as luzes do norte", cards: [
          ["O iglu iluminado", "Na neve, {n} encontrou um iglu com uma luzinha quente na entrada. Lá dentro estava quentinho e aconchegante."],
          ["Cortinas de luz", "Sobre as colinas, a aurora balançava como cortinas verdes e roxas. {n} ficou olhando sem dizer nada."],
          ["O lago congelado", "No lago congelado, {n} patinou entre os pinheiros, desenhando voltas e espirais no gelo."],
          ["O anel da aurora", "Naquela noite, a aurora fez um anel de arco-íris em volta da lua. {n} olhou para cima e entendeu que era um oi muito especial."]
        ] },
        dragon: { name: "Pico do dragão gentil", desc: "Picos na neblina onde vive um dragão bonzinho", cards: [
          ["O ninho no penhasco", "No alto de um penhasco, {n} viu um ninho com três ovos cor pastel, bem quentinhos no sol."],
          ["Chá acima das nuvens", "Numa saliência acima das nuvens, alguém tinha deixado um jogo de chá minúsculo. {n} fez um brinde à vista."],
          ["A ponte de nuvens", "Entre dois picos havia uma ponte de nuvens fofinhas. {n} atravessou devagar, rindo das cócegas do vento."],
          ["O dragão adormecido", "Lá no topo dormia, enroladinho, um dragão verde, redondo e gentil. {n} desejou bons sonhos, e o dragão sorriu dormindo."]
        ] }
      },
      items: {
        rug_cloud: "Tapete nuvem", rug_star: "Tapete estrela", lamp_tulip: "Abajur tulipa", lamp_jelly: "Abajur água-viva",
        plant_lavender: "Vaso de lavanda", plant_cherry: "Cerejeira em flor", art_dreamcatcher: "Filtro dos sonhos", art_moons: "Fases da lua",
        shelf_potions: "Estante de poções", garland_flowers: "Guirlanda florida", ceil_stars: "Teto estrelado", pillows: "Pilha de almofadas",
        star_scope: "Telescópio", curt_night: "Cortinas noturnas",
        h_flower: "Presilha de flor", h_bear: "Orelhas de urso", h_sailor: "Quepe de marujo", h_mush: "Chapéu de cogumelo",
        h_strawberry: "Chapéu de morango", h_nightcap: "Touca de dormir", h_cloud: "Nuvenzinha", h_cupcake: "Chapéu cupcake",
        h_halo: "Auréola dourada", h_dragon: "Chifres de dragão", h_tiara: "Tiara de cristal", h_starcrown: "Coroa de estrelas",
        w_dots: "Bolinhas", w_hearts: "Corações fofos", w_waves: "Ondas do mar", w_candy: "Listras de bala", w_flowers: "Campo florido",
        w_mush: "Cogumelinhos", w_books: "Biblioteca", w_honey: "Favo de mel", w_aurora: "Aurora boreal", w_moon: "Sonhos de lua",
        sv_fireflies: "Pote de vaga-lumes", sv_shells: "Concha de pérola", sv_mushrooms: "Banquinho cogumelo", sv_library: "Livros voadores",
        sv_crystal: "Geodo de cristal", sv_starsea: "Barco de estrelas", sv_sugar: "Almofada de bolo", sv_aurora: "Globo da aurora",
        sv_dragon: "Dragão de pelúcia", sv_album: "Álbum dourado"
      },
      goals: {
        stairs: "Usar a escada", skin: "Cuidar da minha pele", green: "Passar um tempo na natureza", meditate: "Meditar por cinco minutos",
        podcast: "Ouvir algo interessante", language: "Praticar um idioma", doodle: "Fazer um desenhinho", prep: "Preparar o almoço de amanhã",
        trash: "Levar o lixo para fora", air: "Abrir as janelas e arejar a casa", family: "Falar com alguém da família", compliment: "Fazer um elogio sincero",
        nicemsg: "Mandar uma mensagem gentil", plan: "Planejar o dia de amanhã", budget: "Dar uma olhada nos meus gastos", desk: "Organizar a escrivaninha"
      },
      notif: {
        msgs: [
          "{n} preparou uma xícara de chá. Tem dois minutinhos para uma meta?",
          "Um passinho hoje já conta. {n} está te esperando.",
          "{n} não para de olhar para a porta: uma meta e o sorriso volta.",
          "Uma coisa só já está ótimo. {n} está torcendo por você.",
          "{n} guardou um lugar para você na almofada. Vem logo?",
          "Respire um pouco. Depois, uma meta pequenininha, junto com {n}.",
          "{n} encontrou uma coisa linda para te mostrar.",
          "Como foi o seu dia? {n} adoraria saber.",
          "Um copo d'água, uma voltinha, uma página: {n} escolhe com você.",
          "{n} arrumou o quarto e está esperando para comemorar com você.",
          "Cinco minutos para você, só cinco. {n} está aqui.",
          "O dia ainda não acabou: {n} acredita em você."
        ],
        streak: "{k} dias seguidos juntos! Uma meta pequena já basta, {n} está te esperando.",
        last: "{n} está pensando em você. Quando quiser, seu quarto está aqui.",
        trip: "{place}: {n} está de volta!",
        tripB: "Trouxe um cartão-postal para você 💌"
      },
      rarM: "Mítico"
    }
  };
  Object.keys(D).forEach((l) => {
    const d = D[l]; if (!T[l]) return;
    V19W_TXT[l] = d.worlds;
    Object.assign(T[l].items, d.items);
    Object.assign(T[l].goals, d.goals);
    if (T[l].rar) T[l].rar.m = d.rarM;
    const r = (s, o) => Object.keys(o).reduce((a, k) => a.split("{" + k + "}").join(o[k]), s);
    V19N[l] = { msgs: d.notif.msgs, streak: (n, k) => r(d.notif.streak, { n, k }), last: (n) => r(d.notif.last, { n }), trip: (n, p) => r(d.notif.trip, { n, place: p }), tripB: d.notif.tripB };
  });
})();
