/* v10 (pl): Sezon 0, ścieżka, wyzwania, święta, tarcze, podsumowanie, kolekcja, dookoła świata */
(() => {
/* Polska odmiana po liczbie: 1 / 2-4 (bez 12-14) / reszta */
const P = (n, one, few, many) => n === 1 ? one : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? few : many;
const K = (n) => `${n} ${P(n, "Krok", "Kroki", "Kroków")}`;
const C = (n) => `${n} ${P(n, "cel", "cele", "celów")}`;
Object.assign(T.pl, {
  rar: { b: "Podstawowy", c: "Zwykły", r: "Rzadki", e: "Epicki", l: "Legendarny" },
  season: {
    names: { lanterns: "Sezon Lampionów" }, zero: "Sezon 0", left: (d) => d === 1 ? "Został 1 dzień" : `${P(d, "Został", "Zostały", "Zostało")} ${d} dni`,
    tier: (n, m = 50) => `Etap ${n} z ${m}`, passi: (n) => K(n), next: (n) => `Jeszcze ${K(n)} do następnego etapu`, open: "Otwórz ścieżkę", pathT: "Ścieżka sezonu",
    how: "Kroki zdobywasz tylko wtedy, gdy dbasz o siebie: 10 za każdy cel, 20 za każdy pełny dzień, 100 za każde wyzwanie tygodnia. W tygodniu święta liczą się podwójnie.",
    free: "Dla wszystkich", gold: "Złota ścieżka", claim: "Odbierz", claimed: "Odebrane", toClaim: (n) => `${n} ${P(n, "nagroda", "nagrody", "nagród")} do odebrania`,
    tani: (n) => `${n} Tanì`, shield: (n) => `${n} ${P(n, "tarcza", "tarcze", "tarcz")} serii`, got: (x) => `Otrzymujesz: ${x}!`,
    founder: "Założyciel", founderP: "Sezon 0 przeżyty razem: ta odznaka i złoty lampion są twoje na zawsze.", fromPath: "Nagroda ze ścieżki",
    goldLock: "Złota ścieżka jest częścią Tanetto Plus", chapterT: (n) => `Opowieść o lampionach · rozdział ${n}`,
    story: [
      "Dziś wieczorem {n} znajduje pod drzwiami papierowy lampion. W środku jest liścik: „Każdy mały, życzliwy gest zapala światełko”. Kto mógł go tu zostawić?",
      "Za każdym razem, gdy dbasz o siebie, lampion świeci trochę jaśniej. {n} wiesza go w oknie: podobno z zewnątrz wygląda jak mała gwiazdka.",
      "Dziś przybyło więcej lampionów, po jednym dla każdego domu w okolicy. Wszyscy pytają o to samo: kto je przynosi? {n} ma pewne podejrzenia...",
      "Trop! Na parapecie widać malutkie złote ślady łapek. {n} idzie za nimi aż nad jezioro, w którym odbija się tysiąc światełek.",
      "Nad jeziorem {n} spotyka Strażniczkę Lampionów, starą i bardzo życzliwą panią świetlik. „Lampiony zapalają się dzięki trosce, którą każdy z nas wkłada w swoje dni” – mówi z uśmiechem.",
      "To noc wielkiego święta: wszystkie lampiony razem wznoszą się do nieba. Twój jest jednym z najjaśniejszych, bo świecił dzięki tobie dzień po dniu. Dziękuję za ten wspólny sezon."
    ]
  },
  wk: {
    T: "Wyzwanie tygodnia", goals: (n) => `Ukończ ${C(n)} w tym tygodniu`, days: (n) => `Ukończ co najmniej 2 cele w ${n} ${P(n, "dzień", "różne dni", "różnych dni")}`, full: (n) => `Ukończ wszystkie cele dnia przez ${n} ${P(n, "dzień", "dni", "dni")}`, cat: (n, c) => `Ukończ ${C(n)} z kategorii «${c}»`,
    prog: (a, b) => `${a} z ${b}`, reward: (t, p) => `Nagroda: ${t} Tanì i ${K(p)}`, claim: "Odbierz nagrodę", done: "Wyzwanie ukończone! Następne pojawi się w poniedziałek.", ends: (d) => d <= 1 ? "Ostatni dzień" : `Kończy się za ${d} dni`
  },
  festa: { P: "Tydzień święta: Kroki liczą się podwójnie!", names: ["Święto Nowych Początków", "Święto Przytulasów", "Święto Kiełków", "Święto Latawców", "Święto Kwiatów", "Święto Świetlików", "Święto Morza", "Święto Spadających Gwiazd", "Święto Nowych Zeszytów", "Święto Liści", "Święto Kocyków", "Święto Światełek"] },
  shield: { T: "Tarcze serii", P: "Jeśli opuścisz dzień, tarcza automatycznie ochroni twoją serię.", have: (n) => `Masz ${n} ${P(n, "tarczę", "tarcze", "tarcz")}`, saved: "Tarcza ochroniła twoją serię!" },
  rep: {
    T: "Twój miesiąc", goals: (n) => `${n} ${P(n, "cel ukończony", "cele ukończone", "celów ukończonych")}`, days: (n) => `${n} ${P(n, "aktywny dzień", "aktywne dni", "aktywnych dni")}`, top: (g) => `Twój najmocniejszy nawyk: ${g}`, none: "W tym miesiącu jeszcze nic się nie wydarzyło: ukończ pierwszy cel!",
    full: "Pełne podsumowanie", fullT: (m) => `Podsumowanie: ${m}`, weeks: "Cele tydzień po tygodniu", moods: "Twój nastrój", cats: "Gdzie było najwięcej troski", habits: "Twoje najmocniejsze nawyki", tipT: (n) => `${n} radzi`,
    tips: { body: "W tym miesiącu ciało miało mało miejsca: spróbuj dodać krótki spacer albo dodatkową szklankę wody.", mind: "Pamiętaj o głowie: minuta oddychania dziennie robi cuda.", home: "Mały gest dla domu, na przykład pościelenie łóżka, sprawia, że dni są lżejsze.", people: "Napisz do kogoś bliskiego: nawet krótka wiadomość ogrzewa serce.", work: "Od czasu do czasu zrób sobie prawdziwą przerwę: to ładuje baterie.", sleep: "Sen to supermoc: spróbuj wyłączać ekran trochę wcześniej.", custom: "Twoje własne cele są cenne: tak trzymaj." },
    plusOnly: "Pełne podsumowanie jest częścią Tanetto Plus"
  },
  coll: { T: (m) => `Kolekcja: ${m}`, P: "Wyjątkowe przedmioty Tanetto Plus, tylko w tym miesiącu.", get: "Weź", unlock: "Odblokuj z Plus" },
  worldT: "Dookoła świata", worldP: (k) => `Wyjątkowe wycieczki Tanetto Plus: ${k} ${(k === 1 ? "cudowne miejsce" : k % 10 >= 2 && k % 10 <= 4 && (k % 100 < 12 || k % 100 > 14) ? "cudowne miejsca" : "cudownych miejsc")} do odkrycia.`,
  wishT: "Życzenie", wishes: ["Mam dla ciebie życzenie: niech jutro będzie pięknym dniem.", "Lampion leci wysoko: przyniesie nam szczęście!", "Życzenie spełnione: wielki, wielki uścisk.", "Jak pięknie się wznosi... zupełnie jak twoje postępy!"],
  festival: { name: "Święto Lampionów", say: ["Zobacz, ile lampionów na jeziorze!", "Zapalimy też nasz?"], tap: "Dotknij jeziora, by wypuścić lampion" }
});
Object.assign(T.pl.acts2, { wish: "Życzenie" });
Object.assign(T.pl.items, { h_lantern: "Czapka-lampion", h_lantern_gold: "Korona z lampionów", w_lanterns: "Noc lampionów", lamp_stone: "Kamienna latarnia", tree_lights: "Drzewko z lampkami", rug_autumn: "Jesienny dywan", curt_autumn: "Jesienne zasłony", founder_lantern: "Lampion Założycieli", rug_moon: "Księżycowy dywan", h_acorn: "Czapka-żołądź", h_beret: "Czerwony beret", w_leaves: "Tańczące liście" });
Object.assign(T.pl.plus, { perks: ["Nigdy żadnych reklam", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Dookoła świata: ${k} ${(k === 1 ? "wyjątkowa wycieczka" : k % 10 >= 2 && k % 10 <= 4 && (k % 100 < 12 || k % 100 > 14) ? "wyjątkowe wycieczki" : "wyjątkowych wycieczek")}`, "Złota ścieżka ze znacznie piękniejszymi nagrodami", "Co miesiąc wyjątkowa kolekcja", "2 tarcze serii co miesiąc", "300 Tanì w prezencie co miesiąc i +50% Tanì za cele", "Pełne podsumowanie miesiąca, ilustrowane i z poradami"] });
Object.assign(T.pl.tani, { enough: ["Wystarczy na zwykły przedmiot", "Wystarczy na rzadki przedmiot", "Wystarczy na epicki przedmiot", "Wystarczy na legendarny przedmiot"] });
T.pl.tracks = T.pl.tracks.concat(["Lekkie kroki", "Musujący poranek", "Kocyk i herbata", "Bańki mydlane", "Kółko graniaste", "Łagodna chmurka", "Na rowerze", "Taniec świetlików", "Noc lampionów"]);
T.pl.world = [
  { name: "Piramidy w Gizie", t: "Starsze niż stare", s: "{n} jedzie na wielbłądzie obok piramid w Gizie i mruży oczy w złotym słońcu. Wielka Piramida ma około 4500 lat i przez prawie 4000 lat była najwyższą budowlą na świecie!" },
  { name: "Santorini", t: "Niebieskie kopuły nad morzem", s: "{n} spaceruje między białymi domkami i niebieskimi kopułami, wysoko nad błyszczącym morzem. Santorini ma kształt półksiężyca, bo jest krawędzią dawnego wulkanu." },
  { name: "Matterhorn", t: "Czekoladowa góra", s: "Przed drewnianym domkiem {n} pije gorące kakao i patrzy na Matterhorn. Jego spiczasty szczyt jest tak sławny, że widnieje na opakowaniu znanej szwajcarskiej czekolady!" },
  { name: "Fiordy Norwegii", t: "Tam, gdzie lodowce wyrzeźbiły morze", s: "{n} płynie łódeczką między wysokimi zielonymi skałami i liczy wodospady. Te długie, głębokie fiordy wyżłobiły olbrzymie lodowce w epoce lodowcowej." },
  { name: "Laponia", t: "Tańczące światła", s: "Pod wirującą zieloną zorzą polarną {n} wita się z rodziną reniferów. Ciekawostka: poroże wyrasta zarówno samcom, jak i samicom reniferów!" },
  { name: "Islandia", t: "Niebo się świeci", s: "{n} słucha szumu wodospadu, a niebo mieni się zielenią i różem. Zorza polarna pojawia się, gdy maleńkie cząstki wysłane przez Słońce zderzają się z powietrzem wysoko nad Ziemią." },
  { name: "Pustynia Sahara", t: "Oaza wśród piasku", s: "Po długim marszu przez wydmy {n} znajduje chłodną oazę pełną palm. W garbie wielbłąda nie ma wody, tylko tłuszcz: dzięki temu wielbłąd może przez wiele dni obyć się bez jedzenia." },
  { name: "Petra", t: "Miasto wykute w skale", s: "{n} przemyka na palcach wąskim wąwozem i nagle widzi różowy Skarbiec w Petrze. Wykuto go prosto w skale ponad 2000 lat temu!" },
  { name: "Safari w Kenii", t: "Cześć, wysoka przyjaciółko!", s: "Na safari {n} patrzy, jak żyrafy skubią liście akacji, a w oddali bieleje ośnieżone Kilimandżaro. Język żyrafy może mieć prawie pół metra długości!" },
  { name: "Wodospady Wiktorii", t: "Dym, który grzmi", s: "{n} czuje chłodną mgiełkę Wodospadów Wiktorii i dostrzega w niej tęczę. Miejscowi nazywają je Mosi-oa-Tunya, czyli „dym, który grzmi”." },
  { name: "Tadż Mahal", t: "Pałac ze światła", s: "{n} patrzy, jak wschodzące słońce maluje Tadż Mahal na delikatny róż. Biały marmur w ciągu dnia jakby zmienia kolor: rano jest różowy, w południe biały, a wieczorem złoty." },
  { name: "Angkor Wat", t: "Wieże o świcie", s: "{n} wstaje bardzo wcześnie, by zobaczyć, jak wieże Angkor Wat odbijają się w stawie o wschodzie słońca. To największa świątynia na świecie – jest nawet na fladze Kambodży!" },
  { name: "Bali", t: "Zielone schody", s: "{n} spaceruje wśród tarasów ryżowych, które wyglądają jak olbrzymie zielone schody. Rolnicy dzielą się tu wodą dzięki sprytnemu systemowi kanałów, który ma ponad 1000 lat." },
  { name: "Malediwy", t: "Domek na wodzie", s: "{n} śpi w chatce na palach, a tuż pod nią pływają rybki. Malediwy tworzy około 1200 wysp i to najbardziej płaski kraj na świecie." },
  { name: "Wielka Rafa Koralowa", t: "Cześć, błazenku!", s: "{n} pływa z rurką wśród kolorowych koralowców, błazenków i spokojnego żółwia morskiego. Wielka Rafa Koralowa jest tak ogromna, że widać ją z kosmosu!" },
  { name: "Sydney", t: "Żagle w porcie", s: "{n} płynie promem przez zatokę, by z bliska zobaczyć operę w Sydney. Jej dachy w kształcie żagli pokrywa ponad milion płytek!" },
  { name: "Banff", t: "Turkusowe jezioro", s: "{n} wiosłuje czerwonym kanu po jeziorze niebieskim jak szlachetny kamień. Ten kolor pochodzi od „mączki skalnej”, czyli drobniutkich okruchów skał zmielonych przez lodowce." },
  { name: "Hawaje", t: "Wyspy, które wciąż rosną", s: "{n} buduje zamek z piasku, a w oddali dymi wulkan. Gdy lawa wpływa do morza i stygnie, powstaje nowiutki ląd – Hawaje wciąż rosną!" },
  { name: "Galapagos", t: "Bardzo stary przyjaciel", s: "{n} poznaje olbrzymiego żółwia, który powoli chrupie liść kaktusa. Te łagodne olbrzymy mogą żyć ponad 100 lat!" },
  { name: "Machu Picchu", t: "Miasto w chmurach", s: "Gdy chmury się rozwiewają, {n} wspina się na Machu Picchu, a przyjazna lama przychodzi się przywitać. Inkowie dopasowywali kamienie tak idealnie, że nie potrzebowali żadnej zaprawy." },
  { name: "Salar de Uyuni", t: "Spacer po niebie", s: "{n} spaceruje po Salar de Uyuni, największej solnej równinie na świecie. Po deszczu zamienia się ona w olbrzymie lustro i można się poczuć, jakby się szło po niebie!" },
  { name: "Patagonia", t: "Dymiąca góra", s: "{n} patrzy, jak granitowe szczyty Fitz Roy różowieją o wschodzie słońca. Miejscowi nazwali tę górę Chaltén, czyli „dymiąca góra”, bo wokół jej szczytu często wirują chmury." },
  { name: "Wyspa Wielkanocna", t: "Kamienni olbrzymi", s: "{n} mówi „dzień dobry” posągom moai, kamiennym olbrzymom z Wyspy Wielkanocnej. Jest ich prawie 1000, a większość stoi tyłem do morza." },
  { name: "Antarktyda", t: "Parada pingwinów", s: "Wśród ogromnych gór lodowych {n} drepcze razem z grupką pingwinów cesarskich. Pingwini tatusiowie przez około dwa miesiące grzeją jajo na łapkach, w samym środku zimy!" }
];
})();
