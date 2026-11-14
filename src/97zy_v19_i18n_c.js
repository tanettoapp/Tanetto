/* 1.0.6: traduzioni dei testi nuovi (ru, pl, nl, tr) */
(() => {
  const D = {
    ru: {
      worlds: {
        fireflies: { name: "Лес светлячков", desc: "Сумеречный лес, полный танцующих огоньков", cards: [
          ["Огоньки над ручьём", "{n} сидит у ручейка и смотрит, как светлячки мерцают в воде, словно звёзды, которым захотелось искупаться."],
          ["Чай на бревне", "На замшелом бревне {n} пьёт самый крошечный чай на свете вместе с двумя очень вежливыми грибочками."],
          ["Танец по спирали", "На поляне светлячки рисуют в воздухе спираль из света. {n} смотрит, затаив дыхание, до самого последнего витка."],
          ["Королева светлячков", "Над деревьями появляется золотая Королева светлячков. {n} отвечает на её поклон, и весь лес разом вспыхивает огоньками."]
        ] },
        shells: { name: "Остров ракушек", desc: "Пастельный остров, где тихонько напевает море", cards: [
          ["Лужицы среди камней", "Среди камней {n} находит лужицы, полные ракушек, и морскую звезду, которая будто машет: «Привет!»"],
          ["Замок из песка", "{n} строит песочный замок с тремя башнями и крошечным флажком. Волны любуются им с безопасного расстояния."],
          ["Черепаха на закате", "На закате мимо неспешно проплывает морская черепаха. {n} машет ей, и черепаха улыбается в ответ."],
          ["Сияющая жемчужина", "На пляже раскрывается огромная ракушка, и {n} заглядывает внутрь: там сияет жемчужина, круглая, как луна."]
        ] },
        mushrooms: { name: "Долина гигантских грибов", desc: "Долина грибов высотой с дом", cards: [
          ["Грибная деревня", "{n} бродит среди домиков-грибов с круглыми светящимися окошками. Откуда-то пахнет тёплым супом."],
          ["Укрытие от дождя", "Когда начинается дождь, {n} прячется под огромным грибом и слушает, как капли барабанят по шляпке."],
          ["Споры света", "Ночью грибы выпускают светящиеся голубые споры. {n} пытается их сосчитать, но они со смехом улетают."],
          ["Радужный гриб", "В глубине долины {n} находит гриб с радужной шляпкой. Говорят, он вырастает только для самых добрых сердец."]
        ] },
        library: { name: "Парящая библиотека", desc: "Книги, плывущие среди облаков", cards: [
          ["Лестница из книг", "{n} поднимается по лестнице из книг, ступенька за ступенькой, до самых облаков."],
          ["Бумажные птички", "Из открытой книги выпархивает стайка бумажных птичек. {n} замирает: одна из них на миг садится прямо на нос!"],
          ["Уголок для чтения", "На мягком облаке стоят уютное кресло и светящаяся лампа. {n} сворачивается там клубочком и листает истории."],
          ["Золотая книга", "Среди тысячи книг одна сияет ярче всех: золотая, вся в искорках. {n} открывает её и находит совсем новую историю."]
        ] },
        crystal: { name: "Хрустальный сад", desc: "Цветы и камни, что сверкают всеми красками", cards: [
          ["Хрустальные цветы", "На тихом лугу {n} слышит, как хрустальные цветы звенят на ветру, словно крошечные колокольчики."],
          ["Призма", "{n} подставляет призму под солнечный луч, и свет разливается по лугу радугой."],
          ["Сверкающая пещера", "{n} идёт по хрустальной пещере, и от каждого шага на стенах вспыхивают разноцветные искорки."],
          ["Хрустальное сердце", "На вершине сада, на пьедестале, лежит кристалл в форме сердца. {n} касается его, и он мягко светится розовым."]
        ] },
        starsea: { name: "Звёздное море", desc: "Ночное море, в котором отражается небо", cards: [
          ["Лодка и фонарь", "{n} плывёт на лодочке со светящимся фонарём мимо звёзд, качающихся на воде."],
          ["Лунная дорожка", "Луна стелет по морю серебряную дорожку. {n} мечтательно провожает её взглядом до самого горизонта."],
          ["Звездопад", "В эту ночь падает столько звёзд! {n} загадывает желание на каждую, и одно из них — для тебя."],
          ["Звёздный кит", "Из моря выпрыгивает добрый кит, весь в звёздах. На одно мгновение {n} видит, как по морю плывёт само небо."]
        ] },
        sugar: { name: "Сахарный замок", desc: "Пастельный замок из сладостей", cards: [
          ["Леденцовые деревья", "{n} гуляет по лесу из огромных леденцов на палочке: сплошные спиральки всех цветов, какие только бывают."],
          ["Река какао", "По реке горячего какао плывут мягкие зефирки. {n} ловит одну на лету."],
          ["Облака сахарной ваты", "Над замком проплывают розовые и голубые облака сахарной ваты. {n} пробует совсем крошечный кусочек."],
          ["Торт-башня", "Во дворе замка стоит торт высотой с башню, с вишенкой наверху. {n} в восторге: слаще праздника не бывает!"]
        ] },
        aurora: { name: "Равнины северного сияния", desc: "Снежные просторы под небесными огнями", cards: [
          ["Светящееся иглу", "В снегу {n} находит иглу с тёплым огоньком у входа. Внутри очень-очень уютно."],
          ["Занавеси из света", "Над холмами колышется сияние, словно зелёные и фиолетовые занавеси. {n} смотрит, не говоря ни слова."],
          ["Замёрзшее озеро", "На замёрзшем озере {n} катается на коньках среди сосен и рисует на льду петли и завитки."],
          ["Кольцо сияния", "В эту ночь сияние обвивает луну радужным кольцом. {n} смотрит вверх и понимает: это особенный привет."]
        ] },
        dragon: { name: "Пик доброго дракона", desc: "Туманные вершины, где живёт добрый дракон", cards: [
          ["Гнездо на скале", "Высоко на скале {n} замечает гнездо с тремя пастельными яйцами, которые греются на солнышке."],
          ["Чай над облаками", "На уступе над облаками кто-то оставил крошечный чайный сервиз. {n} поднимает чашку за чудесный вид."],
          ["Облачный мост", "Между двумя вершинами тянется мост из мягких облаков. {n} медленно идёт по нему и хихикает: ветер щекочется!"],
          ["Спящий дракон", "На самой вершине, свернувшись клубочком, спит круглый добрый зелёный дракон. {n} желает ему сладких снов, и он улыбается во сне."]
        ] }
      },
      items: {
        rug_cloud: "Коврик-облако", rug_star: "Коврик-звезда", lamp_tulip: "Лампа-тюльпан", lamp_jelly: "Лампа-медуза",
        plant_lavender: "Лаванда в горшке", plant_cherry: "Цветущая сакура", art_dreamcatcher: "Ловец снов", art_moons: "Фазы луны",
        shelf_potions: "Полка с зельями", garland_flowers: "Цветочная гирлянда", ceil_stars: "Звёздный потолок", pillows: "Гора подушек",
        star_scope: "Телескоп", curt_night: "Ночные шторы",
        h_flower: "Заколка-цветок", h_bear: "Медвежьи ушки", h_sailor: "Матросская шапочка", h_mush: "Шапочка-гриб",
        h_strawberry: "Шапочка-клубника", h_nightcap: "Ночной колпак", h_cloud: "Облачко", h_cupcake: "Шапочка-капкейк",
        h_halo: "Золотой нимб", h_dragon: "Рожки дракона", h_tiara: "Хрустальная тиара", h_starcrown: "Звёздная корона",
        w_dots: "Горошек", w_hearts: "Сердечки", w_waves: "Морские волны", w_candy: "Конфетные полоски",
        w_flowers: "Цветочный луг", w_mush: "Грибной лес", w_books: "Библиотека", w_honey: "Медовые соты",
        w_aurora: "Северное сияние", w_moon: "Лунные сны",
        sv_fireflies: "Банка светлячков", sv_shells: "Жемчужная ракушка", sv_mushrooms: "Табурет-гриб", sv_library: "Летающие книги",
        sv_crystal: "Хрустальная жеода", sv_starsea: "Звёздная лодка", sv_sugar: "Подушка-торт", sv_aurora: "Снежный шар",
        sv_dragon: "Плюшевый дракон", sv_album: "Золотой альбом"
      },
      goals: {
        stairs: "Подняться по лестнице пешком", skin: "Позаботиться о коже", green: "Побыть на природе",
        meditate: "Помедитировать пять минут", podcast: "Послушать что-то интересное", language: "Позаниматься иностранным языком",
        doodle: "Набросать маленький рисунок", prep: "Приготовить обед на завтра", trash: "Вынести мусор",
        air: "Открыть окна и проветрить", family: "Связаться с кем-то из семьи", compliment: "Сделать искренний комплимент",
        nicemsg: "Отправить доброе сообщение", plan: "Спланировать завтрашний день", budget: "Проверить свои расходы",
        desk: "Прибраться на рабочем столе"
      },
      notif: {
        msgs: [
          "{n} заваривает тебе чай. Найдётся пара минут для одной цели?",
          "Даже маленький шаг сегодня важен. {n} ждёт тебя.",
          "{n} всё поглядывает на дверь: одна цель — и снова улыбка.",
          "Даже одно дело — это уже прекрасно. {n} болеет за тебя.",
          "{n} бережёт для тебя место на подушке. Скоро увидимся?",
          "Сделай вдох. А потом одна крошечная цель — {n} будет рядом.",
          "{n} хочет показать тебе кое-что чудесное.",
          "Как прошёл твой день? {n} очень хочет узнать.",
          "Стакан воды, короткая прогулка, одна страница: {n} выбирает вместе с тобой.",
          "В комнате уже прибрано: {n} ждёт тебя, чтобы отпраздновать.",
          "Пять минут для себя, хотя бы пять. {n} рядом.",
          "День ещё не закончился: {n} в тебя верит."
        ],
        streak: "Дней подряд вместе: {k}! Хватит одной маленькой цели, {n} ждёт.",
        last: "{n} думает о тебе. Твоя комната здесь, заглядывай, когда захочешь.",
        trip: "{n} снова дома после путешествия: {place}!",
        tripB: "А для тебя — открытка 💌"
      },
      rarM: "Мифический"
    },
    pl: {
      worlds: {
        fireflies: { name: "Las Świetlików", desc: "Las o zmierzchu pełen tańczących światełek", cards: [
          ["Światełka nad strumykiem", "{n} siedzi nad strumykiem i patrzy, jak świetliki migoczą w wodzie niczym gwiazdy, którym zachciało się kąpieli."],
          ["Herbatka na pniu", "Na omszałym pniu {n} pije najmniejszą herbatkę na świecie z dwoma bardzo grzecznymi muchomorkami."],
          ["Spiralny taniec", "Na polanie świetliki rysują w powietrzu spiralę ze światła. {n} patrzy z zachwytem aż do ostatniego obrotu."],
          ["Królowa Świetlików", "Nad drzewami pojawia się złota Królowa Świetlików. {n} odpowiada na jej ukłon, a cały las naraz rozbłyska."]
        ] },
        shells: { name: "Wyspa Muszelek", desc: "Pastelowa wyspa, gdzie morze cicho nuci", cards: [
          ["Skalne sadzawki", "Wśród skał {n} znajduje małe sadzawki pełne muszelek i rozgwiazdę, która chyba macha na powitanie."],
          ["Zamek z piasku", "{n} buduje zamek z piasku z trzema wieżami i malutką chorągiewką. Fale podziwiają go z bezpiecznej odległości."],
          ["Żółw o zachodzie", "O zachodzie słońca obok powoli przepływa żółw morski. {n} macha do niego, a żółw odpowiada uśmiechem."],
          ["Lśniąca perła", "Na plaży otwiera się ogromna muszla, a {n} zagląda do środka: lśni tam perła okrągła jak księżyc."]
        ] },
        mushrooms: { name: "Dolina Wielkich Grzybów", desc: "Dolina grzybów wysokich jak domy", cards: [
          ["Grzybowa wioska", "{n} wędruje między domkami-grzybkami o okrągłych, rozświetlonych okienkach. Coś pachnie ciepłą zupą."],
          ["Kryjówka przed deszczem", "Gdy zaczyna padać, {n} chowa się pod ogromnym grzybem i słucha, jak krople bębnią w kapelusz."],
          ["Zarodniki światła", "Nocą grzyby wypuszczają świecące niebieskie zarodniki. {n} próbuje je policzyć, ale one odlatują, chichocząc."],
          ["Tęczowy grzyb", "W głębi doliny {n} znajduje grzyb z tęczowym kapeluszem. Podobno rośnie tylko dla najżyczliwszych serc."]
        ] },
        library: { name: "Podniebna Biblioteka", desc: "Książki płynące wśród chmur", cards: [
          ["Schody z książek", "{n} wspina się po schodach z książek, stopień po stopniu, aż do samych chmur."],
          ["Papierowe ptaszki", "Z otwartej książki wyfruwa stadko papierowych ptaszków. {n} czuje, jak jeden z nich na chwilę siada na czubku nosa!"],
          ["Kącik do czytania", "Na miękkiej chmurce stoją przytulny fotel i świecąca lampka. {n} zwija się tam w kłębek i kartkuje opowieści."],
          ["Złota księga", "Wśród tysiąca książek jedna lśni najjaśniej: złota księga pełna iskierek. {n} ją otwiera i znajduje zupełnie nową historię."]
        ] },
        crystal: { name: "Kryształowy Ogród", desc: "Kwiaty i kamienie mieniące się wszystkimi kolorami", cards: [
          ["Kryształowe kwiaty", "Na cichej łące {n} słyszy, jak kryształowe kwiaty pobrzękują na wietrze niczym maleńkie dzwoneczki."],
          ["Pryzmat", "{n} podstawia pryzmat pod promień słońca, a światło rozlewa się po łące tęczą."],
          ["Lśniąca grota", "{n} idzie przez kryształową grotę, a każdy krok zapala na ścianach kolorowe błyski."],
          ["Kryształowe serce", "Na szczycie ogrodu, na postumencie, leży kryształ w kształcie serca. Gdy {n} go dotyka, rozbłyska delikatnym różem."]
        ] },
        starsea: { name: "Morze Gwiazd", desc: "Nocne morze, w którym odbija się niebo", cards: [
          ["Łódka i latarenka", "{n} płynie łódeczką ze świecącą latarenką, mijając gwiazdy unoszące się na wodzie."],
          ["Księżycowa ścieżka", "Księżyc rozściela na morzu srebrną ścieżkę. {n} rozmarzonym wzrokiem podąża za nią aż po horyzont."],
          ["Spadające gwiazdy", "Tej nocy spada mnóstwo gwiazd. {n} przy każdej wypowiada życzenie, a jedno z nich jest dla ciebie."],
          ["Gwiaździsty wieloryb", "Z morza wyskakuje łagodny wieloryb cały w gwiazdach. Przez jedną chwilę {n} widzi, jak pływa niebo."]
        ] },
        sugar: { name: "Cukrowy Zamek", desc: "Pastelowy zamek ze słodyczy", cards: [
          ["Lizakowe drzewa", "{n} spaceruje po lesie olbrzymich lizaków, pełnym spiralek we wszystkich kolorach, jakie można sobie wyobrazić."],
          ["Rzeka kakao", "Rzeką gorącego kakao płyną mięciutkie pianki. {n} łapie jedną w locie."],
          ["Chmury z waty cukrowej", "Nad zamkiem płyną różowe i błękitne chmury z waty cukrowej. {n} próbuje malutki kawałeczek."],
          ["Tort-wieża", "Na dziedzińcu zamku stoi tort wysoki jak wieża, z wisienką na czubku. {n} nie pamięta słodszego przyjęcia!"]
        ] },
        aurora: { name: "Równiny Zorzy", desc: "Śnieżne równiny pod zorzą polarną", cards: [
          ["Świecące igloo", "W śniegu {n} znajduje igloo z ciepłym światełkiem przy wejściu. W środku jest cudownie przytulnie."],
          ["Zasłony ze światła", "Nad wzgórzami zorza faluje jak zielone i fioletowe zasłony. {n} patrzy w milczeniu."],
          ["Zamarznięte jezioro", "Na zamarzniętym jeziorze {n} jeździ na łyżwach wśród sosen, rysując na lodzie pętle i zawijasy."],
          ["Pierścień zorzy", "Tej nocy zorza otacza księżyc tęczowym pierścieniem. {n} patrzy w górę i wie, że to bardzo wyjątkowe powitanie."]
        ] },
        dragon: { name: "Szczyt Łagodnego Smoka", desc: "Mgliste szczyty, gdzie mieszka dobry smok", cards: [
          ["Gniazdo na urwisku", "Wysoko na urwisku {n} dostrzega gniazdo z trzema pastelowymi jajami, które wygrzewają się w słońcu."],
          ["Herbatka nad chmurami", "Na skalnej półce nad chmurami ktoś rozstawił malutki serwis do herbaty. {n} wznosi filiżankę na cześć widoku."],
          ["Most z chmur", "Między dwoma szczytami rozciąga się most z miękkich chmur. {n} przechodzi po nim powoli i chichocze, bo wiatr łaskocze."],
          ["Śpiący smok", "Na samym szczycie śpi zwinięty w kłębek okrągły, łagodny zielony smok. {n} życzy mu słodkich snów, a smok uśmiecha się przez sen."]
        ] }
      },
      items: {
        rug_cloud: "Dywan chmurka", rug_star: "Dywan gwiazdka", lamp_tulip: "Lampka tulipan", lamp_jelly: "Lampka meduza",
        plant_lavender: "Lawenda w doniczce", plant_cherry: "Kwitnąca wiśnia", art_dreamcatcher: "Łapacz snów", art_moons: "Fazy księżyca",
        shelf_potions: "Półka z eliksirami", garland_flowers: "Girlanda z kwiatów", ceil_stars: "Gwiezdny sufit", pillows: "Stos poduszek",
        star_scope: "Teleskop", curt_night: "Nocne zasłony",
        h_flower: "Spinka z kwiatkiem", h_bear: "Uszy misia", h_sailor: "Czapka marynarska", h_mush: "Czapka-grzybek",
        h_strawberry: "Czapka-truskawka", h_nightcap: "Szlafmyca", h_cloud: "Chmurka", h_cupcake: "Czapka-babeczka",
        h_halo: "Złota aureola", h_dragon: "Smocze rogi", h_tiara: "Kryształowa tiara", h_starcrown: "Korona z gwiazd",
        w_dots: "Groszki", w_hearts: "Serduszka", w_waves: "Morskie fale", w_candy: "Cukierkowe paski",
        w_flowers: "Kwiecista łąka", w_mush: "Grzybowy las", w_books: "Biblioteka", w_honey: "Plaster miodu",
        w_aurora: "Zorza polarna", w_moon: "Księżycowe sny",
        sv_fireflies: "Słoik świetlików", sv_shells: "Muszla z perłą", sv_mushrooms: "Stołek-grzybek", sv_library: "Latające książki",
        sv_crystal: "Kryształowa geoda", sv_starsea: "Gwiezdna łódka", sv_sugar: "Poduszka-tort", sv_aurora: "Śnieżna kula",
        sv_dragon: "Pluszowy smok", sv_album: "Złoty album"
      },
      goals: {
        stairs: "Wejdź po schodach", skin: "Zadbaj o skórę", green: "Pobądź wśród zieleni",
        meditate: "Medytuj przez pięć minut", podcast: "Posłuchaj czegoś ciekawego", language: "Poćwicz język obcy",
        doodle: "Narysuj mały rysuneczek", prep: "Przygotuj jedzenie na jutro", trash: "Wynieś śmieci",
        air: "Otwórz okna i przewietrz", family: "Odezwij się do rodziny", compliment: "Powiedz komuś szczery komplement",
        nicemsg: "Wyślij komuś miłą wiadomość", plan: "Zaplanuj jutrzejszy dzień", budget: "Sprawdź swoje wydatki",
        desk: "Uporządkuj biurko"
      },
      notif: {
        msgs: [
          "{n} parzy dla ciebie herbatkę. Masz dwie minutki na jeden cel?",
          "Dziś liczy się nawet mały krok. {n} na ciebie czeka.",
          "{n} co chwilę zerka na drzwi: jeden cel i uśmiech wraca.",
          "Nawet jedna rzecz to już super. {n} kibicuje ci z całego serca.",
          "{n} trzyma dla ciebie miejsce na poduszce. Do zobaczenia?",
          "Weź głęboki oddech. A potem jeden malutki cel — {n} będzie przy tobie.",
          "{n} chce ci pokazać coś pięknego.",
          "Jak minął dzień? {n} bardzo chce wiedzieć.",
          "Szklanka wody, krótki spacer, jedna strona: {n} wybiera razem z tobą.",
          "W pokoju już posprzątane: {n} czeka, żeby razem świętować.",
          "Pięć minut dla siebie, choćby tylko pięć. {n} jest tutaj.",
          "Dzień jeszcze się nie skończył: {n} w ciebie wierzy."
        ],
        streak: "{k} dni z rzędu razem! Wystarczy jeden mały cel, {n} czeka.",
        last: "{n} myśli o tobie. Kiedy tylko zechcesz, twój pokój tu jest.",
        trip: "{n} wraca z podróży: {place}!",
        tripB: "Ma dla ciebie pocztówkę 💌"
      },
      rarM: "Mityczny"
    },
    nl: {
      worlds: {
        fireflies: { name: "Vuurvliegjesbos", desc: "Een schemerig bos vol dansende lichtjes", cards: [
          ["Lichtjes in het beekje", "{n} zat bij het beekje en keek hoe de vuurvliegjes in het water twinkelden, als sterren die zin hadden in een duik."],
          ["Thee op een boomstam", "Op een bemoste boomstam dronk {n} het kleinste kopje thee ter wereld, met twee heel beleefde paddenstoeltjes."],
          ["De spiraaldans", "Op de open plek tekenden de vuurvliegjes een spiraal van licht. {n} keek vol verwondering tot de allerlaatste draai."],
          ["De Vuurvliegjeskoningin", "Boven de bomen verscheen de gouden Vuurvliegjeskoningin. Ze maakte een buiging voor {n}, en het hele bos lichtte in één keer op."]
        ] },
        shells: { name: "Schelpeneiland", desc: "Een pasteleiland waar de zee zachtjes neuriet", cards: [
          ["Getijdenpoeltjes", "Tussen de rotsen vond {n} kleine poeltjes vol schelpen, en een zeester die leek te zwaaien."],
          ["Het zandkasteel", "{n} bouwde een zandkasteel met drie torens en een piepklein vlaggetje. De golven bewonderden het van een veilige afstand."],
          ["Schildpad in de avondzon", "Bij zonsondergang dreef er langzaam een zeeschildpad voorbij. {n} zwaaide, en de schildpad glimlachte terug."],
          ["De glanzende parel", "Op het strand ging vlak voor {n} een reuzenschelp open. Binnenin gloeide een parel, zo rond als de maan."]
        ] },
        mushrooms: { name: "Reuzenpaddenstoelendal", desc: "Een dal vol paddenstoelen zo hoog als huizen", cards: [
          ["Het paddenstoelendorp", "{n} wandelde tussen paddenstoelhuisjes met ronde, verlichte raampjes. Ergens rook het naar warme soep."],
          ["Schuilen voor de regen", "Toen het ging regenen, schuilde {n} onder een enorme paddenstoel en luisterde naar de druppels die op de hoed trommelden."],
          ["Sporen van licht", "'s Nachts lieten de paddenstoelen blauwe, gloeiende sporen los. {n} probeerde ze te tellen, maar ze zweefden giechelend weg."],
          ["De regenboogpaddenstoel", "Diep in het dal vond {n} een paddenstoel met een regenbooghoed. Hij groeit alleen voor de liefste harten, zeggen ze."]
        ] },
        library: { name: "Wolkenbibliotheek", desc: "Boeken die tussen de wolken zweven", cards: [
          ["Een trap van boeken", "{n} klom een trap van boeken op, tree voor tree, helemaal tot aan de wolken."],
          ["Papieren vogeltjes", "Uit een open boek fladderde een zwerm papieren vogeltjes. Eentje landde heel even op de neus van {n}."],
          ["Het leeshoekje", "Op een zachte wolk stonden een knusse leunstoel en een gloeiende lamp. {n} kroop er lekker in en bladerde door verhalen."],
          ["Het gouden boek", "Tussen duizend boeken straalde er één het helderst: een gouden boek vol sterretjes. {n} sloeg het open en vond een gloednieuw verhaal."]
        ] },
        crystal: { name: "Kristaltuin", desc: "Bloemen en stenen die in alle kleuren glinsteren", cards: [
          ["Kristallen bloemen", "In een stille wei hoorde {n} kristallen bloemen tinkelen in de wind, als piepkleine belletjes."],
          ["Het prisma", "{n} hield een prisma in een zonnestraal, en het licht stroomde als een regenboog over de wei."],
          ["De glittergrot", "In de kristalgrot toverde elke stap van {n} kleine gekleurde glinsteringen op de wanden."],
          ["Het kristallen hart", "Boven in de tuin lag een hartvormig kristal op een sokkel. Toen {n} het aanraakte, gloeide het zachtroze op."]
        ] },
        starsea: { name: "Sterrenzee", desc: "Een nachtelijke zee die de hemel weerspiegelt", cards: [
          ["Bootje met lantaarn", "{n} voer in een bootje met een brandende lantaarn langs sterren die op het water dreven."],
          ["Het maanpad", "De maan legde een zilveren pad over de zee. {n} volgde het met dromerige ogen tot aan de horizon."],
          ["Vallende sterren", "Die nacht vielen er zoveel sterren. {n} deed bij elke ster een wens, en één daarvan was voor jou."],
          ["De sterrenwalvis", "Een lieve walvis vol sterren sprong uit de zee. Heel even zag {n} de hemel zwemmen."]
        ] },
        sugar: { name: "Suikerkasteel", desc: "Een pastelkleurig kasteel van snoep", cards: [
          ["Lollybomen", "{n} wandelde door een bos van reuzenlolly's, vol krullen in alle kleuren die je maar kunt bedenken."],
          ["De cacaorivier", "Op een rivier van warme chocolademelk dobberden zachte marshmallows. {n} ving er eentje op."],
          ["Suikerspinwolken", "Roze en blauwe suikerspinwolken dreven over het kasteel. {n} proefde een piepklein stukje."],
          ["De taarttoren", "Op de binnenplaats stond een taart zo hoog als een toren, met een kers erop. Het was het zoetste feestje dat {n} ooit had gehad."]
        ] },
        aurora: { name: "Noorderlichtvlakte", desc: "Besneeuwde vlaktes onder dansend poollicht", cards: [
          ["De gloeiende iglo", "In de sneeuw vond {n} een iglo met een warm lichtje bij de deur. Binnen was het heerlijk knus."],
          ["Gordijnen van licht", "Boven de heuvels wiegde het noorderlicht als groene en paarse gordijnen. {n} keek zonder een woord te zeggen."],
          ["Het bevroren meer", "Op het bevroren meer schaatste {n} tussen de dennen en tekende lusjes en krullen op het ijs."],
          ["De noorderlichtring", "Die nacht sloeg het noorderlicht een regenboogring om de maan. {n} keek omhoog en wist: dit was een heel bijzondere groet."]
        ] },
        dragon: { name: "Piek van de Lieve Draak", desc: "Mistige toppen waar een goedaardige draak woont", cards: [
          ["Het nest op de rots", "Hoog op een rots zag {n} een nest met drie pastelkleurige eieren, lekker warm in de zon."],
          ["Thee boven de wolken", "Op een richel boven de wolken had iemand een piepklein theeserviesje klaargezet. {n} hief een kopje op het uitzicht."],
          ["De wolkenbrug", "Tussen twee toppen hing een brug van zachte wolken. {n} stak langzaam over en giechelde, want de wind kietelde."],
          ["De slapende draak", "Helemaal bovenop lag een ronde, lieve groene draak opgerold te slapen. {n} wenste hem zoete dromen, en hij glimlachte in zijn slaap."]
        ] }
      },
      items: {
        rug_cloud: "Wolkenkleed", rug_star: "Sterrenkleed", lamp_tulip: "Tulpenlamp", lamp_jelly: "Kwallenlamp",
        plant_lavender: "Pot lavendel", plant_cherry: "Kersenbloesem", art_dreamcatcher: "Dromenvanger", art_moons: "Maanfasen",
        shelf_potions: "Toverdrankplank", garland_flowers: "Bloemenslinger", ceil_stars: "Sterrenplafond", pillows: "Kussenberg",
        star_scope: "Telescoop", curt_night: "Nachtgordijnen",
        h_flower: "Bloemenspeldje", h_bear: "Berenoortjes", h_sailor: "Matrozenpet", h_mush: "Paddenstoelhoed",
        h_strawberry: "Aardbeienmuts", h_nightcap: "Slaapmuts", h_cloud: "Wolkje", h_cupcake: "Cupcakehoedje",
        h_halo: "Gouden aureool", h_dragon: "Drakenhoorntjes", h_tiara: "Kristallen tiara", h_starcrown: "Sterrenkroon",
        w_dots: "Stippen", w_hearts: "Hartjes", w_waves: "Zeegolven", w_candy: "Snoepstrepen",
        w_flowers: "Bloemenweide", w_mush: "Paddenstoelenbos", w_books: "Bibliotheek", w_honey: "Honingraat",
        w_aurora: "Noorderlicht", w_moon: "Maandromen",
        sv_fireflies: "Vuurvliegjespot", sv_shells: "Parelschelp", sv_mushrooms: "Paddenstoelkruk", sv_library: "Zwevende boeken",
        sv_crystal: "Kristalgeode", sv_starsea: "Sterrenbootje", sv_sugar: "Taartkussen", sv_aurora: "Sneeuwbol",
        sv_dragon: "Knuffeldraak", sv_album: "Gouden album"
      },
      goals: {
        stairs: "De trap nemen", skin: "Goed voor mijn huid zorgen", green: "Even de natuur in",
        meditate: "Vijf minuten mediteren", podcast: "Naar iets interessants luisteren", language: "Een taal oefenen",
        doodle: "Een krabbeltje tekenen", prep: "De lunch voor morgen klaarmaken", trash: "Het afval buitenzetten",
        air: "De ramen openzetten en luchten", family: "Even iets laten horen aan familie", compliment: "Een gemeend compliment geven",
        nicemsg: "Een lief berichtje sturen", plan: "Morgen plannen", budget: "Mijn uitgaven bekijken",
        desk: "Mijn bureau opruimen"
      },
      notif: {
        msgs: [
          "{n} heeft thee voor je gezet. Heb je twee minuutjes voor een doel?",
          "Een klein stapje vandaag telt. {n} wacht op je.",
          "{n} kijkt steeds naar de deur: één doel en de glimlach is terug.",
          "Eén ding is al perfect. {n} juicht voor je.",
          "{n} heeft een plekje op het kussen voor je vrijgehouden. Tot zo?",
          "Haal even adem. En dan één piepklein doel, samen met {n}.",
          "{n} heeft iets moois gevonden om je te laten zien.",
          "Hoe was je dag? {n} wil het graag weten.",
          "Een glas water, een stukje lopen, een bladzijde: {n} kiest met je mee.",
          "{n} heeft de kamer opgeruimd en wacht op je om het te vieren.",
          "Vijf minuutjes voor jezelf, al is het maar vijf. {n} is er.",
          "De dag is nog niet voorbij: {n} gelooft in je."
        ],
        streak: "{k} dagen op rij samen! Eén klein doel is genoeg, {n} wacht op je.",
        last: "{n} denkt aan je. Je kamer staat voor je klaar, wanneer je maar wilt.",
        trip: "{n} is terug van {place}!",
        tripB: "Met een ansichtkaart voor jou 💌"
      },
      rarM: "Mythisch"
    },
    tr: {
      worlds: {
        fireflies: { name: "Ateşböceği Ormanı", desc: "Minik ışıkların dans ettiği alacakaranlık bir orman", cards: [
          ["Derede ışıklar", "{n} küçük derenin kenarına oturdu ve suda parıldayan ateşböceklerini izledi; sanki yüzmeye heveslenmiş yıldızlardı."],
          ["Kütükte çay", "{n} yosunlu bir kütüğün üstünde, çok kibar iki mantarla birlikte dünyanın en minik çayını yudumladı."],
          ["Sarmal dans", "Açıklıkta ateşböcekleri havaya ışıktan bir sarmal çizdi. {n} son dönüşe kadar hayranlıkla izledi."],
          ["Ateşböceği Kraliçesi", "Ağaçların üstünde altın renkli Ateşböceği Kraliçesi belirdi. Kraliçe, {n} için zarifçe eğildi ve bütün orman bir anda aydınlandı."]
        ] },
        shells: { name: "Deniz Kabuğu Adası", desc: "Denizin usulca mırıldandığı pastel bir ada", cards: [
          ["Gelgit havuzları", "{n} kayaların arasında deniz kabuklarıyla dolu küçük havuzlar ve el sallıyor gibi görünen bir deniz yıldızı buldu."],
          ["Kumdan kale", "{n} üç kuleli, minicik bayraklı bir kumdan kale yaptı. Dalgalar onu güvenli bir mesafeden hayranlıkla izledi."],
          ["Gün batımında kaplumbağa", "Gün batımında bir deniz kaplumbağası ağır ağır yüzerek geçti. {n} el salladı, kaplumbağa da gülümsedi."],
          ["Parlayan inci", "Kumsalda dev bir deniz kabuğu açıldı ve {n} hemen içine baktı: dolunay gibi yuvarlak bir inci parlıyordu."]
        ] },
        mushrooms: { name: "Dev Mantarlar Vadisi", desc: "Evler kadar yüksek mantarlarla dolu bir vadi", cards: [
          ["Mantar köyü", "{n} yuvarlak, ışıklı pencereleri olan mantar evciklerin arasında dolaştı. Bir yerlerden sıcak çorba kokusu geliyordu."],
          ["Yağmur sığınağı", "Yağmur başlayınca {n} kocaman bir mantarın altına sığındı ve şapkasında davul çalan damlaları dinledi."],
          ["Işık sporları", "Gece mantarlar parlak mavi sporlar saldı. {n} onları saymaya çalıştı ama sporlar kıkırdayarak uçup gitti."],
          ["Gökkuşağı mantarı", "{n} vadinin derinliklerinde gökkuşağı renkli şapkası olan bir mantar buldu. Derler ki yalnızca en iyi kalpler için yetişirmiş."]
        ] },
        library: { name: "Uçan Kütüphane", desc: "Bulutlar arasında süzülen kitaplar", cards: [
          ["Kitaptan merdiven", "{n} kitaplardan yapılmış bir merdivenden adım adım tırmanıp bulutlara kadar çıktı."],
          ["Kâğıt kuşlar", "Açık bir kitaptan bir sürü kâğıt kuş havalandı. {n} kıpırdamadan durdu, çünkü kuşlardan biri bir anlığına burnuna kondu."],
          ["Okuma köşesi", "Yumuşak bir bulutun üstünde rahat bir koltuk ve ışıl ışıl bir lamba vardı. {n} oraya kıvrılıp hikâyelerin sayfalarını çevirdi."],
          ["Altın kitap", "Binlerce kitabın arasında biri hepsinden parlaktı: pırıltılarla dolu altın bir kitap. {n} onu açtı ve yepyeni bir hikâye buldu."]
        ] },
        crystal: { name: "Kristal Bahçe", desc: "Her renkte ışıldayan çiçekler ve taşlar", cards: [
          ["Kristal çiçekler", "{n} sessiz bir çayırda, rüzgârda minik çanlar gibi çınlayan kristal çiçekleri dinledi."],
          ["Prizma", "{n} bir prizmayı güneş ışığına tuttu ve ışık çayırın üstüne bir gökkuşağı gibi yayıldı."],
          ["Pırıltılı mağara", "{n} kristal mağarada yürüdükçe her adımda duvarlarda küçük, renkli pırıltılar yandı."],
          ["Kristal kalp", "Bahçenin en tepesinde, bir kaidenin üstünde kalp biçiminde bir kristal vardı. {n} ona dokununca kristal yumuşak bir pembeyle parladı."]
        ] },
        starsea: { name: "Yıldızlar Denizi", desc: "Gökyüzünü yansıtan bir gece denizi", cards: [
          ["Kayık ve fener", "{n} ışıl ışıl bir fenerle küçük bir kayığa bindi ve suyun üstünde yüzen yıldızların arasından geçti."],
          ["Ay yolu", "Ay, denizin üstüne gümüş bir yol serdi. {n} hayalci gözlerle ufka kadar onu takip etti."],
          ["Kayan yıldızlar", "O gece çok yıldız kaydı. {n} her birine bir dilek tuttu; dileklerden biri de senin içindi."],
          ["Yıldızlı balina", "Yıldızlarla kaplı sevimli bir balina denizden sıçradı. {n} bir anlığına gökyüzünün yüzdüğünü gördü."]
        ] },
        sugar: { name: "Şeker Şatosu", desc: "Şekerlemelerden yapılmış pastel bir şato", cards: [
          ["Lolipop ağaçları", "{n} dev lolipoplardan oluşan bir ormanda dolaştı; hepsi kıvrım kıvrımdı ve akla gelebilecek her renkteydi."],
          ["Kakao nehri", "Sıcak kakaodan bir nehirde yumuşacık marshmallow'lar süzülüyordu. {n} yanından geçen birini kaptı."],
          ["Pamuk şeker bulutları", "Şatonun üstünden pembe ve mavi pamuk şeker bulutları geçti. {n} minicik bir parçasını tattı."],
          ["Kule pasta", "Şatonun avlusunda kule kadar yüksek, tepesinde kirazı olan bir pasta vardı. {n} hayatının en tatlı partisini yaşadı."]
        ] },
        aurora: { name: "Kuzey Işıkları Ovası", desc: "Gökte renkli ışıkların dans ettiği karlı ovalar", cards: [
          ["Işıklı iglo", "{n} karların arasında, kapısında küçük ve sıcak bir ışık yanan bir iglo buldu. İçerisi sıcacık ve rahattı."],
          ["Işıktan perdeler", "Tepelerin üstünde kuzey ışıkları yeşil ve mor perdeler gibi dalgalandı. {n} tek kelime etmeden izledi."],
          ["Donmuş göl", "{n} donmuş gölde çamların arasında paten yaptı ve buzun üstüne halkalar, kıvrımlar çizdi."],
          ["Işık halkası", "O gece kuzey ışıkları ayın çevresine gökkuşağı renkli bir halka çizdi. {n} başını kaldırdı ve bunun çok özel bir selam olduğunu anladı."]
        ] },
        dragon: { name: "Sevimli Ejderha Zirvesi", desc: "İyi kalpli bir ejderhanın yaşadığı sisli doruklar", cards: [
          ["Kayalıktaki yuva", "{n} yüksek bir kayalıkta, güneşte sıcacık duran üç pastel yumurtalı bir yuva gördü."],
          ["Bulutların üstünde çay", "Bulutların üstündeki bir çıkıntıya biri minicik bir çay takımı kurmuştu. {n} manzaranın şerefine fincanını kaldırdı."],
          ["Bulut köprüsü", "İki zirve arasında yumuşacık bulutlardan bir köprü uzanıyordu. {n} rüzgâr gıdıkladıkça kıkırdayarak yavaşça karşıya geçti."],
          ["Uyuyan ejderha", "En tepede yuvarlak, sevimli, yeşil bir ejderha kıvrılmış uyuyordu. {n} ona tatlı rüyalar diledi, ejderha da uykusunda gülümsedi."]
        ] }
      },
      items: {
        rug_cloud: "Bulut halısı", rug_star: "Yıldız halısı", lamp_tulip: "Lale lambası", lamp_jelly: "Denizanası lambası",
        plant_lavender: "Saksıda lavanta", plant_cherry: "Kiraz çiçeği", art_dreamcatcher: "Rüya kapanı", art_moons: "Ayın evreleri",
        shelf_potions: "İksir rafı", garland_flowers: "Çiçek girlandı", ceil_stars: "Yıldızlı tavan", pillows: "Yastık yığını",
        star_scope: "Teleskop", curt_night: "Gece perdeleri",
        h_flower: "Çiçekli toka", h_bear: "Ayı kulakları", h_sailor: "Denizci şapkası", h_mush: "Mantar şapkası",
        h_strawberry: "Çilek şapkası", h_nightcap: "Gece başlığı", h_cloud: "Minik bulut", h_cupcake: "Cupcake şapkası",
        h_halo: "Altın hale", h_dragon: "Ejderha boynuzları", h_tiara: "Kristal taç", h_starcrown: "Yıldız tacı",
        w_dots: "Puantiye", w_hearts: "Minik kalpler", w_waves: "Deniz dalgaları", w_candy: "Şeker çizgileri",
        w_flowers: "Çiçekli çayır", w_mush: "Mantar ormanı", w_books: "Kütüphane", w_honey: "Bal peteği",
        w_aurora: "Kuzey ışıkları", w_moon: "Ay rüyaları",
        sv_fireflies: "Işıltı kavanozu", sv_shells: "İnci kabuğu", sv_mushrooms: "Mantar taburesi", sv_library: "Uçan kitaplar",
        sv_crystal: "Kristal jeot", sv_starsea: "Yıldız kayığı", sv_sugar: "Pasta yastığı", sv_aurora: "Kar küresi",
        sv_dragon: "Peluş ejderha", sv_album: "Altın albüm"
      },
      goals: {
        stairs: "Merdivenden çık", skin: "Cildime bakım yap", green: "Doğada biraz vakit geçir",
        meditate: "Beş dakika meditasyon yap", podcast: "İlginç bir şey dinle", language: "Yabancı dil pratiği yap",
        doodle: "Küçük bir resim karala", prep: "Yarının öğle yemeğini hazırla", trash: "Çöpü çıkar",
        air: "Pencereleri açıp evi havalandır", family: "Ailemden birinin hatırını sor", compliment: "İçten bir iltifat et",
        nicemsg: "Nazik bir mesaj gönder", plan: "Yarını planla", budget: "Harcamalarıma göz at",
        desk: "Masamı düzenle"
      },
      notif: {
        msgs: [
          "{n} sana bir fincan çay hazırladı. Bir hedef için iki dakikan var mı?",
          "Bugün küçük bir adım bile önemli. {n} seni bekliyor.",
          "{n} gözünü kapıdan ayırmıyor: tek bir hedef ve gülümseme geri gelir.",
          "Tek bir şey bile harika. {n} seni yürekten destekliyor.",
          "{n} minderde sana yer ayırdı. Yakında görüşelim mi?",
          "Derin bir nefes al. Sonra minicik bir hedef, {n} ile birlikte.",
          "{n} sana göstermek için çok güzel bir şey buldu.",
          "Bugün nasıl geçti? {n} çok merak ediyor.",
          "Bir bardak su, kısa bir yürüyüş, bir sayfa: {n} seninle birlikte seçiyor.",
          "{n} odayı topladı ve seninle kutlamak için bekliyor.",
          "Kendine beş dakika ayır, sadece beş. {n} burada.",
          "Gün henüz bitmedi: {n} sana inanıyor."
        ],
        streak: "Üst üste {k} gün birlikte! Küçük bir hedef yeter, {n} seni bekliyor.",
        last: "{n} seni düşünüyor. Ne zaman istersen odan burada.",
        trip: "{n}, {place} gezisinden döndü!",
        tripB: "Sana bir kartpostal getirdi 💌"
      },
      rarM: "Mitik"
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
