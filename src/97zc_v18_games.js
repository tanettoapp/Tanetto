/* =================== v18 (1.0.4): tre giochi nuovi =================== */
/* 1) "Sentieri": rompicapo che allena la mente. Collega i sassolini dello stesso colore con dei sentierini che non
      si incrociano; livelli sempre nuovi (generati sul momento, sempre risolvibili), da 5x5 a 8x8.
   2) "Ricalca": il compagno mostra una forma e tu la ripassi col dito (fino a 3 stelle); in piu' il disegno libero.
   3) "Album da colorare": disegni e mandala da colorare toccando le zone.
   Disegni e pagine colorate finiscono in una piccola Galleria (sul telefono), da condividere o salvare.
   Premi: Tani con lo stesso tetto giornaliero di tutti i giochi. */
const V18G = {
  it: { paths: ["Sentieri", "Collega i sassolini dello stesso colore"], trace: ["Ricalca", "Ripassa le forme col dito"], color: ["Album da colorare", "Colora i disegni come preferisci"],
    pathsP: "Trascina il dito da un sassolino all'altro dello stesso colore. I sentieri non si incrociano: prova a riempire tutto il prato!", lvl: (n) => `Livello ${n}`, solved: "Risolto!", full: "Prato pieno: perfetto!", nextLvl: "Livello successivo", restart: "Ricomincia",
    traceP: "Ripassa col dito la forma tratteggiata, più precisa che puoi. 5 forme, fino a 3 stelle ciascuna.", shape: (a, b) => `Forma ${a} di ${b}`, rate: ["Riprova, puoi farcela!", "Ci sei!", "Ottimo!", "Perfetto!"], done: "Fatto", retry: "Riprova", next: "Avanti", starsEnd: (n) => `Stelle raccolte: ${n}`, free: "Disegno libero", clear: "Pulisci", undo: "Annulla", eraser: "Gomma", saveGal: "Salva nella galleria",
    colorP: "Scegli un disegno, poi tocca un colore e una zona per colorarla.", pick: "Scegli un disegno", finish: "Finito!", colorMore: "Colora ancora qualche zona prima di finire.", back: "Disegni",
    gallery: "Galleria", galEmpty: "Qui finiranno i tuoi disegni e le pagine colorate.", saved: "Salvato nella galleria", del: "Elimina", saveDev: "Salva sul telefono", galFull: "La galleria è piena: il disegno più vecchio è stato tolto.", pages: ["Mandala fiore", "Mandala stella", "Casetta", "Fiore e farfalla", "Pesciolino", "Mongolfiera", "Arcobaleno", "Torta di festa"] },
  en: { paths: ["Pathways", "Connect pebbles of the same color"], trace: ["Trace it", "Trace the shapes with your finger"], color: ["Coloring book", "Color the pictures your way"],
    pathsP: "Drag your finger from one pebble to the other of the same color. Paths can't cross: try to fill the whole meadow!", lvl: (n) => `Level ${n}`, solved: "Solved!", full: "Whole meadow filled: perfect!", nextLvl: "Next level", restart: "Restart",
    traceP: "Trace the dotted shape with your finger, as neatly as you can. 5 shapes, up to 3 stars each.", shape: (a, b) => `Shape ${a} of ${b}`, rate: ["Try again, you've got this!", "Nice!", "Great!", "Perfect!"], done: "Done", retry: "Try again", next: "Next", starsEnd: (n) => `Stars collected: ${n}`, free: "Free drawing", clear: "Clear", undo: "Undo", eraser: "Eraser", saveGal: "Save to gallery",
    colorP: "Pick a picture, then tap a color and an area to fill it.", pick: "Pick a picture", finish: "Finished!", colorMore: "Color a few more areas before finishing.", back: "Pictures",
    gallery: "Gallery", galEmpty: "Your drawings and colored pages will show up here.", saved: "Saved to gallery", del: "Delete", saveDev: "Save to phone", galFull: "The gallery is full: the oldest drawing was removed.", pages: ["Flower mandala", "Star mandala", "Little house", "Flower and butterfly", "Little fish", "Hot-air balloon", "Rainbow", "Party cake"] },
  de: { paths: ["Pfade", "Verbinde gleichfarbige Steinchen"], trace: ["Nachzeichnen", "Fahr die Formen mit dem Finger nach"], color: ["Malbuch", "Mal die Bilder aus, wie du magst"],
    pathsP: "Zieh mit dem Finger von einem Steinchen zum anderen in der gleichen Farbe. Die Pfade dürfen sich nicht kreuzen – versuch, die ganze Wiese zu füllen!", lvl: (n) => `Level ${n}`, solved: "Gelöst!", full: "Ganze Wiese gefüllt: perfekt!", nextLvl: "Nächstes Level", restart: "Neu starten",
    traceP: "Fahr die gestrichelte Form mit dem Finger nach, so genau du kannst. 5 Formen, bis zu 3 Sterne pro Form.", shape: (a, b) => `Form ${a} von ${b}`, rate: ["Versuch's nochmal, du schaffst das!", "Gut!", "Super!", "Perfekt!"], done: "Fertig", retry: "Nochmal", next: "Weiter", starsEnd: (n) => `Gesammelte Sterne: ${n}`, free: "Freies Malen", clear: "Löschen", undo: "Rückgängig", eraser: "Radierer", saveGal: "In der Galerie speichern",
    colorP: "Wähle ein Bild, dann tippe auf eine Farbe und eine Fläche, um sie auszumalen.", pick: "Wähle ein Bild", finish: "Fertig!", colorMore: "Mal noch ein paar Flächen aus, bevor du fertig bist.", back: "Bilder",
    gallery: "Galerie", galEmpty: "Hier landen deine Zeichnungen und ausgemalten Bilder.", saved: "In der Galerie gespeichert", del: "Löschen", saveDev: "Aufs Handy speichern", galFull: "Die Galerie ist voll: Die älteste Zeichnung wurde entfernt.", pages: ["Blumen-Mandala", "Stern-Mandala", "Häuschen", "Blume und Schmetterling", "Fischlein", "Heißluftballon", "Regenbogen", "Partytorte"] },
  es: { paths: ["Senderos", "Une las piedritas del mismo color"], trace: ["Repasa", "Repasa las formas con el dedo"], color: ["Libro para colorear", "Colorea los dibujos a tu manera"],
    pathsP: "Desliza el dedo de una piedrita a la otra del mismo color. Los senderos no se cruzan: ¡intenta llenar todo el prado!", lvl: (n) => `Nivel ${n}`, solved: "¡Resuelto!", full: "Prado lleno: ¡perfecto!", nextLvl: "Siguiente nivel", restart: "Empezar de nuevo",
    traceP: "Repasa con el dedo la forma punteada, con la mayor precisión posible. 5 formas, hasta 3 estrellas cada una.", shape: (a, b) => `Forma ${a} de ${b}`, rate: ["¡Inténtalo otra vez, tú puedes!", "¡Bien!", "¡Muy bien!", "¡Perfecto!"], done: "Listo", retry: "Reintentar", next: "Siguiente", starsEnd: (n) => `Estrellas conseguidas: ${n}`, free: "Dibujo libre", clear: "Borrar todo", undo: "Deshacer", eraser: "Goma", saveGal: "Guardar en la galería",
    colorP: "Elige un dibujo, luego toca un color y una zona para colorearla.", pick: "Elige un dibujo", finish: "¡Terminado!", colorMore: "Colorea algunas zonas más antes de terminar.", back: "Dibujos",
    gallery: "Galería", galEmpty: "Aquí aparecerán tus dibujos y páginas coloreadas.", saved: "Guardado en la galería", del: "Eliminar", saveDev: "Guardar en el teléfono", galFull: "La galería está llena: se ha quitado el dibujo más antiguo.", pages: ["Mandala de flor", "Mandala de estrella", "Casita", "Flor y mariposa", "Pececito", "Globo aerostático", "Arcoíris", "Pastel de fiesta"] },
  fr: { paths: ["Sentiers", "Relie les cailloux de la même couleur"], trace: ["Repasse", "Repasse les formes avec ton doigt"], color: ["Album à colorier", "Colorie les dessins comme tu veux"],
    pathsP: "Fais glisser ton doigt d'un caillou à l'autre de la même couleur. Les sentiers ne se croisent pas : essaie de remplir tout le pré !", lvl: (n) => `Niveau ${n}`, solved: "Résolu !", full: "Pré tout rempli : parfait !", nextLvl: "Niveau suivant", restart: "Recommencer",
    traceP: "Repasse la forme en pointillés avec ton doigt, le plus précisément possible. 5 formes, jusqu'à 3 étoiles chacune.", shape: (a, b) => `Forme ${a} sur ${b}`, rate: ["Réessaie, tu vas y arriver !", "Bien !", "Super !", "Parfait !"], done: "Terminé", retry: "Réessayer", next: "Suivant", starsEnd: (n) => `Étoiles gagnées : ${n}`, free: "Dessin libre", clear: "Effacer", undo: "Annuler", eraser: "Gomme", saveGal: "Enregistrer dans la galerie",
    colorP: "Choisis un dessin, puis touche une couleur et une zone pour la colorier.", pick: "Choisis un dessin", finish: "Fini !", colorMore: "Colorie encore quelques zones avant de finir.", back: "Dessins",
    gallery: "Galerie", galEmpty: "Tes dessins et tes pages coloriées apparaîtront ici.", saved: "Enregistré dans la galerie", del: "Supprimer", saveDev: "Enregistrer sur le téléphone", galFull: "La galerie est pleine : le dessin le plus ancien a été retiré.", pages: ["Mandala fleur", "Mandala étoile", "Petite maison", "Fleur et papillon", "Petit poisson", "Montgolfière", "Arc-en-ciel", "Gâteau de fête"] },
  pt: { paths: ["Trilhas", "Ligue as pedrinhas da mesma cor"], trace: ["Contorne", "Contorne as formas com o dedo"], color: ["Livro de colorir", "Pinte os desenhos do seu jeito"],
    pathsP: "Arraste o dedo de uma pedrinha até a outra da mesma cor. As trilhas não podem se cruzar: tente preencher todo o gramado!", lvl: (n) => `Nível ${n}`, solved: "Resolvido!", full: "Gramado todo preenchido: perfeito!", nextLvl: "Próximo nível", restart: "Recomeçar",
    traceP: "Contorne com o dedo a forma pontilhada, com o máximo de capricho. 5 formas, até 3 estrelas cada.", shape: (a, b) => `Forma ${a} de ${b}`, rate: ["Tente de novo, você consegue!", "Boa!", "Ótimo!", "Perfeito!"], done: "Pronto", retry: "Tentar de novo", next: "Próxima", starsEnd: (n) => `Estrelas conquistadas: ${n}`, free: "Desenho livre", clear: "Limpar", undo: "Desfazer", eraser: "Borracha", saveGal: "Salvar na galeria",
    colorP: "Escolha um desenho, depois toque em uma cor e em uma área para pintá-la.", pick: "Escolha um desenho", finish: "Terminei!", colorMore: "Pinte mais algumas áreas antes de terminar.", back: "Desenhos",
    gallery: "Galeria", galEmpty: "Seus desenhos e páginas pintadas vão aparecer aqui.", saved: "Salvo na galeria", del: "Excluir", saveDev: "Salvar no celular", galFull: "A galeria está cheia: o desenho mais antigo foi removido.", pages: ["Mandala de flor", "Mandala de estrela", "Casinha", "Flor e borboleta", "Peixinho", "Balão de ar quente", "Arco-íris", "Bolo de festa"] },
  ja: { paths: ["こみち", "同じ色の小石をつなごう"], trace: ["なぞりがき", "指で形をなぞろう"], color: ["ぬりえ", "好きな色でぬってみよう"],
    pathsP: "同じ色の小石から小石へ、指でなぞってつなごう。道は交差できません。野原ぜんぶをうめてみてね！", lvl: (n) => `レベル${n}`, solved: "クリア！", full: "野原がぜんぶうまった：パーフェクト！", nextLvl: "次のレベル", restart: "やり直す",
    traceP: "点線の形を、できるだけていねいに指でなぞろう。5つの形、それぞれ最大3つ星。", shape: (a, b) => `${a} / ${b}`, rate: ["もう一回！きっとできるよ", "いいね！", "すごい！", "パーフェクト！"], done: "できた", retry: "もう一回", next: "次へ", starsEnd: (n) => `集めた星：${n}`, free: "自由にかく", clear: "全部消す", undo: "もどす", eraser: "消しゴム", saveGal: "ギャラリーに保存",
    colorP: "絵をえらんで、色をタップしてから、ぬりたい場所をタップしよう。", pick: "絵をえらぼう", finish: "できた！", colorMore: "おわる前に、もう少しぬってみよう。", back: "絵",
    gallery: "ギャラリー", galEmpty: "かいた絵やぬりえがここに入ります。", saved: "ギャラリーに保存しました", del: "削除", saveDev: "スマホに保存", galFull: "ギャラリーがいっぱいなので、いちばん古い絵を消しました。", pages: ["花のマンダラ", "星のマンダラ", "おうち", "花とちょうちょ", "おさかな", "気球", "にじ", "パーティーケーキ"] },
  ko: { paths: ["오솔길", "같은 색 조약돌을 이어요"], trace: ["따라 그리기", "손가락으로 모양을 따라 그려요"], color: ["색칠 놀이", "마음대로 그림을 색칠해요"],
    pathsP: "같은 색 조약돌끼리 손가락으로 이어 주세요. 길은 서로 겹칠 수 없어요. 풀밭을 전부 채워 보세요!", lvl: (n) => `레벨 ${n}`, solved: "해결!", full: "풀밭을 가득 채웠어요: 완벽해요!", nextLvl: "다음 레벨", restart: "다시 시작",
    traceP: "점선 모양을 손가락으로 최대한 정확하게 따라 그려요. 모양 5개, 각각 별 최대 3개.", shape: (a, b) => `${a} / ${b}`, rate: ["다시 해 봐요, 할 수 있어요!", "좋아요!", "훌륭해요!", "완벽해요!"], done: "완료", retry: "다시 하기", next: "다음", starsEnd: (n) => `모은 별: ${n}개`, free: "자유 그리기", clear: "모두 지우기", undo: "되돌리기", eraser: "지우개", saveGal: "갤러리에 저장",
    colorP: "그림을 고른 다음, 색을 누르고 칠할 곳을 눌러요.", pick: "그림을 골라요", finish: "다 했어요!", colorMore: "끝내기 전에 몇 군데 더 칠해 봐요.", back: "그림",
    gallery: "갤러리", galEmpty: "그린 그림과 색칠한 그림이 여기에 모여요.", saved: "갤러리에 저장했어요", del: "삭제", saveDev: "휴대폰에 저장", galFull: "갤러리가 가득 차서 가장 오래된 그림을 지웠어요.", pages: ["꽃 만다라", "별 만다라", "작은 집", "꽃과 나비", "작은 물고기", "열기구", "무지개", "파티 케이크"] },
  zh: { paths: ["小路", "连接相同颜色的小石子"], trace: ["描一描", "用手指描出形状"], color: ["涂色本", "随心给图画涂色"],
    pathsP: "用手指把相同颜色的两颗小石子连起来。小路不能交叉，试着把整片草地都填满吧！", lvl: (n) => `第 ${n} 关`, solved: "完成！", full: "草地全部填满：完美！", nextLvl: "下一关", restart: "重新开始",
    traceP: "用手指沿着虚线描出形状，越准越好。共 5 个形状，每个最多 3 颗星。", shape: (a, b) => `形状 ${a}/${b}`, rate: ["再试一次，你可以的！", "不错！", "很棒！", "完美！"], done: "完成", retry: "再试一次", next: "下一个", starsEnd: (n) => `获得星星：${n}`, free: "自由绘画", clear: "清空", undo: "撤销", eraser: "橡皮擦", saveGal: "保存到画廊",
    colorP: "选一幅图，然后点一个颜色，再点要涂的区域。", pick: "选一幅图", finish: "完成啦！", colorMore: "完成前再多涂几块吧。", back: "图画",
    gallery: "画廊", galEmpty: "你的画和涂色作品会出现在这里。", saved: "已保存到画廊", del: "删除", saveDev: "保存到手机", galFull: "画廊已满：最早的一幅画已被移除。", pages: ["花朵曼陀罗", "星星曼陀罗", "小房子", "花和蝴蝶", "小鱼", "热气球", "彩虹", "派对蛋糕"] },
  zht: { paths: ["小路", "連接相同顏色的小石子"], trace: ["描一描", "用手指描出形狀"], color: ["著色本", "隨心幫圖畫上色"],
    pathsP: "用手指把相同顏色的兩顆小石子連起來。小路不能交叉，試著把整片草地都填滿吧！", lvl: (n) => `第 ${n} 關`, solved: "完成！", full: "草地全部填滿：完美！", nextLvl: "下一關", restart: "重新開始",
    traceP: "用手指沿著虛線描出形狀，越準越好。共 5 個形狀，每個最多 3 顆星。", shape: (a, b) => `形狀 ${a}/${b}`, rate: ["再試一次，你可以的！", "不錯！", "很棒！", "完美！"], done: "完成", retry: "再試一次", next: "下一個", starsEnd: (n) => `獲得星星：${n}`, free: "自由繪畫", clear: "清空", undo: "復原", eraser: "橡皮擦", saveGal: "儲存到畫廊",
    colorP: "選一幅圖，然後點一個顏色，再點要塗的區域。", pick: "選一幅圖", finish: "完成啦！", colorMore: "完成前再多塗幾塊吧。", back: "圖畫",
    gallery: "畫廊", galEmpty: "你的畫和著色作品會出現在這裡。", saved: "已儲存到畫廊", del: "刪除", saveDev: "儲存到手機", galFull: "畫廊已滿：最早的一幅畫已被移除。", pages: ["花朵曼陀羅", "星星曼陀羅", "小房子", "花和蝴蝶", "小魚", "熱氣球", "彩虹", "派對蛋糕"] },
  ru: { paths: ["Тропинки", "Соедини камешки одного цвета"], trace: ["Обведи", "Обводи фигуры пальцем"], color: ["Раскраска", "Раскрашивай картинки по-своему"],
    pathsP: "Проведи пальцем от одного камешка к другому того же цвета. Тропинки не пересекаются — попробуй заполнить всю поляну!", lvl: (n) => `Уровень ${n}`, solved: "Решено!", full: "Вся поляна заполнена: идеально!", nextLvl: "Следующий уровень", restart: "Начать заново",
    traceP: "Обведи пунктирную фигуру пальцем как можно точнее. 5 фигур, до 3 звёзд за каждую.", shape: (a, b) => `Фигура ${a} из ${b}`, rate: ["Попробуй ещё, у тебя получится!", "Хорошо!", "Отлично!", "Идеально!"], done: "Готово", retry: "Ещё раз", next: "Дальше", starsEnd: (n) => `Собрано звёзд: ${n}`, free: "Свободное рисование", clear: "Очистить", undo: "Отменить", eraser: "Ластик", saveGal: "Сохранить в галерею",
    colorP: "Выбери картинку, потом нажми на цвет и на часть рисунка, чтобы её раскрасить.", pick: "Выбери картинку", finish: "Готово!", colorMore: "Раскрась ещё несколько частей, прежде чем закончить.", back: "Картинки",
    gallery: "Галерея", galEmpty: "Здесь появятся твои рисунки и раскраски.", saved: "Сохранено в галерею", del: "Удалить", saveDev: "Сохранить на телефон", galFull: "Галерея заполнена: самый старый рисунок удалён.", pages: ["Цветочная мандала", "Звёздная мандала", "Домик", "Цветок и бабочка", "Рыбка", "Воздушный шар", "Радуга", "Праздничный торт"] },
  pl: { paths: ["Ścieżki", "Połącz kamyki w tym samym kolorze"], trace: ["Rysuj po śladzie", "Obrysuj kształty palcem"], color: ["Kolorowanka", "Pokoloruj obrazki po swojemu"],
    pathsP: "Przeciągnij palcem od jednego kamyka do drugiego w tym samym kolorze. Ścieżki nie mogą się krzyżować — spróbuj wypełnić całą łąkę!", lvl: (n) => `Poziom ${n}`, solved: "Rozwiązane!", full: "Cała łąka wypełniona: idealnie!", nextLvl: "Następny poziom", restart: "Zacznij od nowa",
    traceP: "Obrysuj palcem kształt z kropek jak najdokładniej. 5 kształtów, do 3 gwiazdek za każdy.", shape: (a, b) => `Kształt ${a} z ${b}`, rate: ["Spróbuj jeszcze raz, dasz radę!", "Dobrze!", "Świetnie!", "Idealnie!"], done: "Gotowe", retry: "Jeszcze raz", next: "Dalej", starsEnd: (n) => `Zebrane gwiazdki: ${n}`, free: "Swobodne rysowanie", clear: "Wyczyść", undo: "Cofnij", eraser: "Gumka", saveGal: "Zapisz w galerii",
    colorP: "Wybierz obrazek, potem dotknij koloru i miejsca, które chcesz pokolorować.", pick: "Wybierz obrazek", finish: "Gotowe!", colorMore: "Pokoloruj jeszcze kilka miejsc, zanim skończysz.", back: "Obrazki",
    gallery: "Galeria", galEmpty: "Tu pojawią się twoje rysunki i kolorowanki.", saved: "Zapisano w galerii", del: "Usuń", saveDev: "Zapisz na telefonie", galFull: "Galeria jest pełna: najstarszy rysunek został usunięty.", pages: ["Kwiatowa mandala", "Gwiezdna mandala", "Domek", "Kwiat i motyl", "Rybka", "Balon", "Tęcza", "Tort urodzinowy"] },
  nl: { paths: ["Paadjes", "Verbind steentjes van dezelfde kleur"], trace: ["Natekenen", "Trek de vormen na met je vinger"], color: ["Kleurboek", "Kleur de tekeningen zoals jij wilt"],
    pathsP: "Sleep je vinger van het ene steentje naar het andere van dezelfde kleur. De paadjes mogen elkaar niet kruisen: probeer de hele wei te vullen!", lvl: (n) => `Level ${n}`, solved: "Opgelost!", full: "Hele wei gevuld: perfect!", nextLvl: "Volgend level", restart: "Opnieuw",
    traceP: "Trek de stippellijn zo netjes mogelijk na met je vinger. 5 vormen, tot 3 sterren per vorm.", shape: (a, b) => `Vorm ${a} van ${b}`, rate: ["Probeer het nog eens, het lukt je!", "Goed!", "Super!", "Perfect!"], done: "Klaar", retry: "Opnieuw", next: "Volgende", starsEnd: (n) => `Verzamelde sterren: ${n}`, free: "Vrij tekenen", clear: "Wissen", undo: "Ongedaan maken", eraser: "Gum", saveGal: "Opslaan in galerij",
    colorP: "Kies een tekening, tik dan op een kleur en op een vlak om het in te kleuren.", pick: "Kies een tekening", finish: "Klaar!", colorMore: "Kleur nog een paar vlakken in voordat je klaar bent.", back: "Tekeningen",
    gallery: "Galerij", galEmpty: "Hier komen je tekeningen en ingekleurde platen.", saved: "Opgeslagen in de galerij", del: "Verwijderen", saveDev: "Opslaan op telefoon", galFull: "De galerij is vol: de oudste tekening is weggehaald.", pages: ["Bloemenmandala", "Sterrenmandala", "Huisje", "Bloem en vlinder", "Visje", "Luchtballon", "Regenboog", "Feesttaart"] },
  tr: { paths: ["Patikalar", "Aynı renkteki çakılları birleştir"], trace: ["Üzerinden çiz", "Şekillerin üzerinden parmağınla geç"], color: ["Boyama kitabı", "Resimleri istediğin gibi boya"],
    pathsP: "Parmağını aynı renkteki bir çakıldan diğerine sürükle. Patikalar kesişemez: bütün çayırı doldurmayı dene!", lvl: (n) => `Seviye ${n}`, solved: "Çözüldü!", full: "Çayır tamamen doldu: mükemmel!", nextLvl: "Sonraki seviye", restart: "Baştan başla",
    traceP: "Noktalı şeklin üzerinden parmağınla olabildiğince düzgün geç. 5 şekil, her biri için en fazla 3 yıldız.", shape: (a, b) => `Şekil ${a}/${b}`, rate: ["Bir daha dene, yapabilirsin!", "Güzel!", "Harika!", "Mükemmel!"], done: "Tamam", retry: "Tekrar dene", next: "İleri", starsEnd: (n) => `Toplanan yıldız: ${n}`, free: "Serbest çizim", clear: "Temizle", undo: "Geri al", eraser: "Silgi", saveGal: "Galeriye kaydet",
    colorP: "Bir resim seç, sonra bir renge ve boyamak istediğin alana dokun.", pick: "Bir resim seç", finish: "Bitti!", colorMore: "Bitirmeden önce birkaç alan daha boya.", back: "Resimler",
    gallery: "Galeri", galEmpty: "Çizimlerin ve boyadığın sayfalar burada görünecek.", saved: "Galeriye kaydedildi", del: "Sil", saveDev: "Telefona kaydet", galFull: "Galeri dolu: en eski çizim kaldırıldı.", pages: ["Çiçek mandala", "Yıldız mandala", "Küçük ev", "Çiçek ve kelebek", "Küçük balık", "Sıcak hava balonu", "Gökkuşağı", "Parti pastası"] }
};
Object.keys(V18G).forEach((k) => { if (!T[k]) return; T[k].games = T[k].games || {}; ["paths", "trace", "color"].forEach((g) => { T[k].games[g] = V18G[k][g]; }); });
const g18 = () => V18G[S.lang] || V18G.en;
/* i tre giochi nuovi subito dopo "Salta!" e "Torre di cuscini" */
GAMES.splice(2, 0, "paths", "trace", "color");
GCOL.paths = "#4FA86A"; GCOL.trace = "#5E9BD6"; GCOL.color = "#E2668E";
GICON.paths = '<circle cx="5.5" cy="6" r="2.6" fill="#fff"/><circle cx="18.5" cy="18" r="2.6" fill="#fff"/><path d="M5.5 8.5v4.5h13v2.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18.5" cy="6" r="2.6" fill="#fff" opacity=".6"/><path d="M18.5 8.5v2" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>';
GICON.trace = '<path d="M4 17c3-8 6-11 8-8s1 7 4 6 3-6 4-8" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-dasharray="3 2.6"/><path d="M15.5 20.5l5-5 1.5 1.5-5 5h-1.5z" fill="#fff"/>';
GICON.color = '<path d="M12 3c5 0 9 3.6 9 8 0 3-2.4 4-4.2 4H15a1.8 1.8 0 0 0-1.3 3c.8 1-.1 3-1.7 3-5 0-9-4-9-9s4-9 9-9z" fill="#fff"/><circle cx="8" cy="10" r="1.6" fill="#E2668E"/><circle cx="12" cy="7" r="1.6" fill="#5E9BD6"/><circle cx="16.2" cy="10" r="1.6" fill="#F2B33D"/>';

/* --- Parti in comune --- */
function g18float(host, x, y, text, cls) { if (typeof g17float === "function") g17float(host, x, y, text, cls); }
function g18msg(html) { const m = document.getElementById("g18Msg"); if (m) m.innerHTML = html; }
const PBL = ["#E2654F", "#3E9BC7", "#F2B33D", "#4FA86A", "#9B8CF2", "#EE7FA0", "#E9845A", "#4FB8A9", "#8E6440"];
/* piccoli simboli bianchi nei sassolini: aiutano chi distingue poco i colori */
const PBL_SYM = [
  '<circle r="3.2" fill="#fff"/>', '<rect x="-3" y="-3" width="6" height="6" rx="1" fill="#fff"/>', '<path d="M0 -3.8 3.4 2.6H-3.4Z" fill="#fff"/>',
  '<path d="M0 -4 4 0 0 4-4 0Z" fill="#fff"/>', '<path d="M0 -4l1.2 2.6 2.8.3-2.1 1.9.6 2.8L0 2.2-2.5 3.6l.6-2.8-2.1-1.9 2.8-.3Z" fill="#fff"/>', '<path d="M0 3.6S-4 1-4-1.4a2 2 0 0 1 4-.9 2 2 0 0 1 4 .9C4 1 0 3.6 0 3.6Z" fill="#fff"/>',
  '<path d="M-1 -4h2v3h3v2H1v3h-2V1h-3v-2h3Z" fill="#fff"/>', '<circle r="3.2" fill="none" stroke="#fff" stroke-width="1.8"/>', '<path d="M-3 -3 3 3M3 -3-3 3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>'
];

/* =================== 1) SENTIERI =================== */
const PATH_SIZES = (lvl) => lvl <= 3 ? 5 : lvl <= 7 ? 6 : lvl <= 12 ? 7 : 8;
const PATH_COLORS = (n, lvl) => ({ 5: 4 + (lvl % 2), 6: 5 + (lvl % 2), 7: 6 + (lvl % 2), 8: 7 + (lvl % 2) }[n]);
/* Generatore: un percorso che passa per tutte le caselle (mescolato con mosse "backbite"), poi tagliato in pezzi.
   Ogni pezzo diventa una coppia di sassolini: il livello ha sempre almeno una soluzione che riempie tutto. */
function pathGen(n, k) {
  const idx = (r, c) => r * n + c; let p = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) p.push(idx(r, r % 2 ? n - 1 - c : c));
  const nb = (v) => { const r = Math.floor(v / n), c = v % n, o = []; if (r) o.push(v - n); if (r < n - 1) o.push(v + n); if (c) o.push(v - 1); if (c < n - 1) o.push(v + 1); return o; };
  const pos = new Int32Array(n * n);
  for (let it = 0; it < n * n * 40; it++) {
    const head = Math.random() < 0.5; if (!head) p.reverse();
    p.forEach((v, i) => { pos[v] = i; });
    const cand = nb(p[0]).filter((v) => v !== p[1]); const v = cand[Math.floor(Math.random() * cand.length)];
    const j = pos[v]; p = p.slice(0, j).reverse().concat(p.slice(j));
  }
  /* lunghezze dei pezzi: almeno 3 caselle ciascuno, il resto distribuito a caso */
  const total = n * n; const len = new Array(k).fill(3); let rest = total - 3 * k;
  while (rest > 0) { const i = Math.floor(Math.random() * k); const add = Math.min(rest, 1 + Math.floor(Math.random() * 3)); len[i] += add; rest -= add; }
  const pairs = [], segs = []; let s = 0; len.forEach((l) => { pairs.push([p[s], p[s + l - 1]]); segs.push(p.slice(s, s + l)); s += l; });
  /* scarta i pezzi con i due sassolini attaccati (troppo facili): si rigenera */
  const adj = (a, b) => nb(a).includes(b);
  if (pairs.some(([a, b]) => adj(a, b))) return pathGen(n, k);
  return { n, pairs, segs };
}
function openPaths() {
  const t = g18(); S.paths = S.paths || { lvl: 1 };
  shell("paths", `<div class="arena patharena" id="arena"><div class="pboard" id="pBoard"></div>${startScreen(t.pathsP)}</div><p class="small g18msg" id="g18Msg" aria-live="polite"></p>`, `<span class="pill" id="gScore">${esc(t.lvl(S.paths.lvl))}</span>`);
  pathNew(false);
}
function pathNew(start) {
  const lvl = (S.paths && S.paths.lvl) || 1; const n = PATH_SIZES(lvl); const k = PATH_COLORS(n, lvl);
  const g = pathGen(n, k); const ends = new Map(); g.pairs.forEach(([a, b], c) => { ends.set(a, c); ends.set(b, c); });
  game = Object.assign(game || {}, { kind: "paths", timers: game ? game.timers : [], tweens: game ? game.tweens : [], over: false, run: !!start, n, k, pairs: g.pairs, ends, lines: g.pairs.map(() => []), segs: g.segs, act: -1, won: false });
  const sc = document.getElementById("gScore"); if (sc) sc.textContent = g18().lvl(lvl);
  g18msg(""); pathDraw(true);
}
function pathDraw(fresh) {
  const g = game; const b = document.getElementById("pBoard"); if (!b || !g) return; const n = g.n, U = 100;
  if (fresh) {
    let s = `<svg viewBox="0 0 ${n * U} ${n * U}" id="pSvg" class="psvg" role="img" aria-label="${esc(g18().paths[0])}"><rect x="0" y="0" width="${n * U}" height="${n * U}" rx="26" class="pbg"/>`;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) s += `<rect class="pcell" data-i="${r * n + c}" x="${c * U + 4}" y="${r * U + 4}" width="${U - 8}" height="${U - 8}" rx="18"/>`;
    s += `<g id="pFill"></g><g id="pLines"></g><g id="pDots">`;
    g.pairs.forEach(([a, z], c) => [a, z].forEach((v) => { const x = (v % n) * U + U / 2, y = Math.floor(v / n) * U + U / 2; s += `<g class="pdot" data-c="${c}" transform="translate(${x} ${y})"><circle r="31" fill="${PBL[c]}"/><circle r="31" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="4"/><ellipse cx="-9" cy="-11" rx="10" ry="6" fill="#fff" opacity=".32"/><g transform="scale(3.2)">${PBL_SYM[c]}</g></g>`; }));
    s += `</g></svg>`; b.innerHTML = s;
  }
  const xy = (v) => [(v % n) * U + U / 2, Math.floor(v / n) * U + U / 2];
  let fill = "", lines = "";
  g.lines.forEach((ln, c) => {
    if (!ln.length) return;
    ln.forEach((v) => { fill += `<rect x="${(v % n) * U + 4}" y="${Math.floor(v / n) * U + 4}" width="${U - 8}" height="${U - 8}" rx="18" fill="${PBL[c]}" opacity=".2"/>`; });
    if (ln.length > 1) lines += `<polyline points="${ln.map((v) => xy(v).join(",")).join(" ")}" fill="none" stroke="${PBL[c]}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  document.getElementById("pFill").innerHTML = fill; document.getElementById("pLines").innerHTML = lines;
  b.querySelectorAll(".pdot").forEach((d) => d.classList.toggle("ok", pathDone(+d.dataset.c)));
}
function pathDone(c) { const g = game; const ln = g.lines[c]; if (ln.length < 2) return false; const [a, b] = g.pairs[c]; return (ln[0] === a && ln[ln.length - 1] === b) || (ln[0] === b && ln[ln.length - 1] === a); }
function pathCell(ev) {
  const g = game; const svg = document.getElementById("pSvg"); if (!svg) return -1; const r = svg.getBoundingClientRect();
  const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height; if (x < 0 || y < 0 || x >= 1 || y >= 1) return -1;
  return Math.floor(y * g.n) * g.n + Math.floor(x * g.n);
}
function pathOwner(v) { return game.lines.findIndex((ln) => ln.includes(v)); }
function pathStart(v) {
  const g = game; if (v < 0 || g.won) return;
  if (g.ends.has(v)) { const c = g.ends.get(v); g.lines[c] = [v]; g.act = c; }
  else { const c = pathOwner(v); if (c < 0) return; const ln = g.lines[c]; g.lines[c] = ln.slice(0, ln.indexOf(v) + 1); g.act = c; }
  SND.play("tap"); SND.haptic(5); pathDraw(false);
}
function pathStep(v) {
  const g = game; const c = g.act; if (c < 0 || v < 0) return; const ln = g.lines[c]; const last = ln[ln.length - 1]; if (v === last) return;
  const n = g.n; const adj = Math.abs(v - last) === n || (Math.abs(v - last) === 1 && Math.floor(v / n) === Math.floor(last / n));
  if (!adj) { /* dito veloce: si avanza di una casella alla volta verso il punto toccato */
    const lr = Math.floor(last / n), lc = last % n, vr = Math.floor(v / n), vc = v % n;
    const step = Math.abs(vr - lr) >= Math.abs(vc - lc) ? last + Math.sign(vr - lr) * n : last + Math.sign(vc - lc);
    pathStep(step); if (g.lines[c][g.lines[c].length - 1] === step) pathStep(v); return;
  }
  const own = ln.indexOf(v); if (own >= 0) { g.lines[c] = ln.slice(0, own + 1); pathDraw(false); return; }
  if (pathDone(c)) return;
  if (g.ends.has(v) && g.ends.get(v) !== c) return; /* sassolino di un altro colore: non si passa */
  const o = pathOwner(v); if (o >= 0 && o !== c) { const lo = g.lines[o]; g.lines[o] = lo.slice(0, lo.indexOf(v)); }
  ln.push(v);
  if (pathDone(c)) { SND.play("pop"); SND.haptic([8, 30, 8]); const d = document.querySelectorAll(`.pdot[data-c="${c}"]`); if (anim) d.forEach((x) => G.fromTo(x, { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(3)", transformOrigin: "50% 50%" })); }
  else SND.haptic(3);
  pathDraw(false);
}
function pathEnd() {
  const g = game; if (!g || g.act < 0) return; g.act = -1;
  if (g.pairs.every((_, c) => pathDone(c))) pathWin();
}
function pathWin() {
  const g = game; const t = g18(); g.won = true; g.run = false;
  const filled = new Set(); g.lines.forEach((ln) => ln.forEach((v) => filled.add(v))); const full = filled.size === g.n * g.n;
  const lvl = S.paths.lvl; S.paths.lvl = lvl + 1; S.paths.best = Math.max(S.paths.best || 0, lvl);
  const seeds = awardGameSeeds(full ? 3 : 2); addJoy(4); save(); trackOnce("gioco-paths");
  SND.play(full ? "fanfare" : "chime"); SND.haptic([20, 50, 20]);
  const arena = document.getElementById("arena"); if (!arena) return;
  if (anim) G.fromTo("#pSvg", { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" });
  const pet = petSVG(S.pet, "felice", S.hat, stage(), S.petName);
  setTimeout(() => {
    if (!game || game.kind !== "paths") return;
    arena.insertAdjacentHTML("beforeend", `<div class="gstart gend pend"><div class="gpetw">${pet}</div><h3>${esc(t.solved)}</h3>${full ? `<p class="small"><b>${esc(t.full)}</b></p>` : ""}<p><strong>${seedsLine(seeds)}</strong></p><button class="btn" id="pathNext">${esc(t.nextLvl)}</button></div>`);
    if (anim) { G.from(".pend", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(2)" }); const pw = arena.querySelector(".gpetw"); if (pw) G.timeline().to(pw, { y: -26, duration: 0.25, ease: "power2.out" }).to(pw, { rotation: 360, duration: 0.45, transformOrigin: "50% 60%" }, 0.05).to(pw, { y: 0, duration: 0.3, ease: "bounce.out" }).set(pw, { rotation: 0 }); }
  }, 450);
}

/* =================== 2) RICALCA (+ disegno libero) =================== */
const TR_ROUNDS = 5;
function trPoly(fn, steps) { let d = ""; for (let i = 0; i <= steps; i++) { const [x, y] = fn((i / steps) * Math.PI * 2); d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1); } return d + "Z"; }
const TR_SHAPES = [
  /* facili */
  ["circle", trPoly((a) => [150 + 95 * Math.cos(a), 150 + 95 * Math.sin(a)], 72)],
  ["heart", "M150 250C70 196 38 140 70 100C98 66 136 76 150 106C164 76 202 66 230 100C262 140 230 196 150 250Z"],
  ["house", "M60 248V140L150 64L240 140V248Z"],
  ["moon", "M196 52A102 102 0 1 0 196 248A80 80 0 1 1 196 52Z"],
  /* medie */
  ["star", trPoly((a) => { const k = Math.round(a / (Math.PI / 5)); const r = k % 2 ? 46 : 112; const b = k * (Math.PI / 5) - Math.PI / 2; return [150 + r * Math.cos(b), 160 + r * Math.sin(b)]; }, 10)],
  ["leaf", "M64 236C58 140 118 70 238 62C246 170 176 236 64 236Z"],
  ["fish", "M40 150C84 92 172 92 214 150L262 108V192L214 150C172 208 84 208 40 150Z"],
  ["cloud", "M78 214C44 214 34 172 62 156C52 112 104 92 128 120C140 76 206 78 214 128C254 120 276 166 248 194C252 214 236 214 222 214Z"],
  /* difficili */
  ["flower", trPoly((a) => { const r = 70 + 34 * Math.cos(5 * a); return [150 + r * Math.cos(a - Math.PI / 2), 150 + r * Math.sin(a - Math.PI / 2)]; }, 160)],
  ["drop", "M150 46C186 104 226 148 226 186A76 76 0 0 1 74 186C74 148 114 104 150 46Z"],
  ["bell", "M150 52C98 52 82 104 82 150C82 190 62 206 54 222H246C238 206 218 190 218 150C218 104 202 52 150 52Z"],
  ["wave", trPoly((a) => [40 + (a / (Math.PI * 2)) * 220, 150 + 54 * Math.sin(a * 2)], 90).replace(/Z$/, "")]
];
function traceRounds() { const e = TR_SHAPES.slice(0, 4), m = TR_SHAPES.slice(4, 8), h = TR_SHAPES.slice(8); const p = (a) => a.splice(Math.floor(Math.random() * a.length), 1)[0]; return [p(e), p(e), p(m), p(m), p(h)]; }
function openTrace() {
  const t = g18();
  shell("trace", `<div class="arena tracearena" id="arena"><div class="tpad" id="tPad"></div>${startScreen(t.traceP, `<div class="trbtnrow"><button class="btn ghost" id="trFree">${esc(t.free)}</button><button class="btn ghost" id="galOpen">${esc(t.gallery)}</button></div>`)}</div><p class="small g18msg" id="g18Msg" aria-live="polite"></p><div class="trtools" id="trTools"></div>`, `<span class="pill" id="gScore">★ 0</span>`);
  game.kind = "trace";
}
function traceStart() {
  const st = document.getElementById("gStart"); if (st) st.remove(); document.querySelectorAll("#arena .gend").forEach((x) => x.remove());
  game = Object.assign(game || {}, { kind: "trace", over: false, run: true, rounds: traceRounds(), r: 0, stars: 0, pts: [], strokes: [], drawing: false, judged: false });
  traceRound();
}
function traceRound() {
  const g = game; const t = g18(); const [id, d] = g.rounds[g.r]; g.pts = []; g.strokes = []; g.judged = false;
  const pad = document.getElementById("tPad"); if (!pad) return;
  pad.innerHTML = `<svg viewBox="0 0 300 300" id="tSvg" class="tsvg" aria-label="${esc(t.shape(g.r + 1, TR_ROUNDS))}"><path id="tGuide" d="${d}" class="tguide"/><path d="${d}" class="tguide2"/><g id="tInk"></g><g id="tStars"></g></svg><div class="tpet" aria-hidden="true">${petSVG(S.pet, "felice", S.hat, stage(), "")}</div>`;
  pad.dataset.shape = id;
  document.getElementById("trTools").innerHTML = `<button class="btn ghost small" id="trRetry">${esc(t.retry)}</button><button class="btn small" id="trDone" disabled>${esc(t.done)}</button>`;
  g18msg(esc(t.shape(g.r + 1, TR_ROUNDS)));
  /* punti di riferimento della forma (200 punti lungo il bordo) */
  const gp = document.getElementById("tGuide"); const L0 = gp.getTotalLength(); g.guide = []; for (let i = 0; i < 200; i++) { const q = gp.getPointAtLength((i / 200) * L0); g.guide.push([q.x, q.y]); }
  if (anim) G.from("#tGuide, .tguide2", { opacity: 0, duration: 0.4 });
}
function tracePt(ev) { const svg = document.getElementById("tSvg"); if (!svg) return null; const r = svg.getBoundingClientRect(); return [((ev.clientX - r.left) / r.width) * 300, ((ev.clientY - r.top) / r.height) * 300]; }
function traceInk() {
  const g = game; const ink = document.getElementById("tInk"); if (!ink) return;
  ink.innerHTML = g.strokes.filter((s) => s.length).map((s) => `<polyline points="${s.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}" class="tink"/>`).join("");
}
/* punteggio: quanta forma hai coperto (copertura) e quanto sei rimasto sulla forma (precisione) */
function traceScore() {
  const g = game; const all = [].concat(...g.strokes); if (all.length < 8) return { s: 0, cov: 0 };
  const TOL = 16; const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const covered = g.guide.filter((q) => all.some((p) => d2(p, q) <= (TOL * 1.25) ** 2)).length / g.guide.length;
  const prec = all.filter((p) => g.guide.some((q) => d2(p, q) <= TOL * TOL)).length / all.length;
  return { s: covered * 0.6 + prec * 0.4, cov: covered };
}
function traceJudge() {
  const g = game; const t = g18(); if (g.judged) return; const sc = traceScore(); g.judged = true;
  /* servono sia la copertura della forma sia la precisione: un pezzetto preciso non basta */
  const stars = sc.cov >= 0.92 && sc.s >= 0.9 ? 3 : sc.cov >= 0.82 && sc.s >= 0.76 ? 2 : sc.cov >= 0.66 && sc.s >= 0.56 ? 1 : 0;
  const box = document.getElementById("tStars"); const pad = document.getElementById("tPad");
  if (!stars) { g.judged = false; g18msg(`<b>${esc(t.rate[0])}</b>`); SND.play("miss"); if (pad && anim) G.fromTo(pad, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, .3)" }); g.strokes = []; g.pts = []; traceInk(); const dn = document.getElementById("trDone"); if (dn) dn.disabled = true; return; }
  g.stars += stars; const sp = document.getElementById("gScore"); if (sp) sp.textContent = `★ ${g.stars}`;
  if (box) box.innerHTML = [0, 1, 2].map((i) => `<path class="tstar${i < stars ? " on" : ""}" transform="translate(${110 + i * 40} 34) scale(1.25)" d="M0 -12l3.5 7.2 7.9.9-5.8 5.4 1.6 7.8L0 15.4l-7.2 3.9 1.6-7.8-5.8-5.4 7.9-.9Z"/>`).join("");
  if (pad) pad.classList.add("judged");
  g18msg(`<b>${esc(t.rate[stars])}</b>`); SND.play(stars === 3 ? "fanfare" : "chime"); SND.haptic(stars === 3 ? [20, 50, 20] : 12);
  if (anim) { G.from("#tStars .tstar.on", { scale: 0, transformOrigin: "50% 50%", stagger: 0.12, duration: 0.4, ease: "back.out(3)" }); const p = document.querySelector("#tPad .tpet"); if (p) G.fromTo(p, { y: 0 }, { y: -20, duration: 0.2, yoyo: true, repeat: stars, ease: "power2.out" }); }
  document.getElementById("trTools").innerHTML = `<button class="btn ghost small" id="trRetry">${esc(t.retry)}</button><button class="btn small" id="trNext">${esc(t.next)}</button>`;
}
function traceNext() {
  const g = game; if (!g) return;
  if (g.r + 1 < TR_ROUNDS) { g.r++; traceRound(); return; }
  const t = g18(); g.run = false; stopGame(); const seeds = awardGameSeeds(g.stars); gbestSet("trace", g.stars); addJoy(6); save(); trackOnce("gioco-trace");
  const arena = document.getElementById("arena"); document.getElementById("trTools").innerHTML = ""; g18msg("");
  if (arena) arena.insertAdjacentHTML("beforeend", `<div class="gstart gend"><h3>${esc(t.starsEnd(g.stars))}</h3><p><strong>${seedsLine(seeds)}</strong></p><div class="trbtnrow"><button class="btn ghost" id="trFree">${esc(t.free)}</button><button class="btn" id="traceAgain">${esc(L().gameAgain)}</button></div></div>`);
  SND.play("fanfare"); if (anim) G.from(".gend", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(2)" });
}

/* --- Disegno libero --- */
const FINK = ["#33302E", "#E2654F", "#E9845A", "#F2B33D", "#4FA86A", "#4FB8A9", "#3E9BC7", "#9B8CF2", "#EE7FA0", "#8E6440", "#FFFFFF"];
const BRUSH = [5, 11, 22];
function freeOpen() {
  const t = g18(); stopGame(); const st = document.getElementById("gStart"); if (st) st.remove(); document.querySelectorAll("#arena .gend").forEach((x) => x.remove());
  const pad = document.getElementById("tPad"); if (!pad) return;
  game = Object.assign(game || {}, { kind: "free", over: false, run: true, strokes: [], cur: null, ink: 0, brush: 1, eraser: false, savedOnce: false });
  pad.innerHTML = `<canvas id="fCanvas" class="fcanvas" aria-label="${esc(t.free)}"></canvas>`;
  const sc = document.getElementById("gScore"); if (sc) sc.textContent = t.free;
  document.getElementById("trTools").innerHTML = `<div class="fpal" role="radiogroup">${FINK.map((c, i) => `<button class="fcol${i === 0 ? " on" : ""}" data-ink="${i}" role="radio" aria-checked="${i === 0}" aria-label="${c}" style="--c:${c}"></button>`).join("")}</div><div class="frow ftools"><div class="fbr">${BRUSH.map((b, i) => `<button class="fsz${i === 1 ? " on" : ""}" data-brush="${i}" aria-label="${b}"><i style="width:${Math.min(22, b + 2)}px;height:${Math.min(22, b + 2)}px"></i></button>`).join("")}<button class="fsz ferase" id="fErase" aria-pressed="false" aria-label="${esc(t.eraser)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15l8-8 7 7-6 6H8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 20h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div><span class="spacer"></span><button class="fsz" id="fUndo" aria-label="${esc(t.undo)}" title="${esc(t.undo)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7 4 12l5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 12H14a6 6 0 0 1 0 12h-2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" transform="translate(0 -3)"/></svg></button><button class="fsz" id="fClear" aria-label="${esc(t.clear)}" title="${esc(t.clear)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div><div class="frow"><button class="btn ghost small" id="galOpen">${esc(t.gallery)}</button><span class="spacer"></span><button class="btn small" id="fSave">${esc(t.saveGal)}</button></div>`;
  freeResize(); g18msg("");
}
function freeResize() {
  const cv = document.getElementById("fCanvas"); if (!cv) return; const r = cv.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); game.dpr = dpr; game.cw = r.width; game.ch = r.height; freeRedraw();
}
function freeStroke(c, s) {
  const pts = s.p; if (!pts.length) return; c.strokeStyle = s.e ? "#FFFDF8" : FINK[s.c]; c.fillStyle = c.strokeStyle; c.lineWidth = BRUSH[s.b] * (s.e ? 1.8 : 1); c.lineCap = "round"; c.lineJoin = "round";
  if (pts.length === 1) { c.beginPath(); c.arc(pts[0][0], pts[0][1], c.lineWidth / 2, 0, Math.PI * 2); c.fill(); return; }
  c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) { const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; c.quadraticCurveTo(pts[i][0], pts[i][1], mx, my); }
  const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]); c.stroke();
}
function freeRedraw() {
  const cv = document.getElementById("fCanvas"); if (!cv || !game) return; const c = cv.getContext("2d");
  c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = "#FFFDF8"; c.fillRect(0, 0, cv.width, cv.height); c.setTransform(game.dpr, 0, 0, game.dpr, 0, 0);
  game.strokes.forEach((s) => freeStroke(c, s)); if (game.cur) freeStroke(c, game.cur);
}
function freePt(ev) { const cv = document.getElementById("fCanvas"); const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; }
function freePng(maxW) {
  const cv = document.getElementById("fCanvas"); if (!cv) return null; const w = Math.min(maxW, cv.width), h = Math.round(cv.height * (w / cv.width));
  const o = document.createElement("canvas"); o.width = w; o.height = h; const c = o.getContext("2d"); c.drawImage(cv, 0, 0, w, h); return o.toDataURL("image/jpeg", 0.86);
}

/* =================== 3) ALBUM DA COLORARE =================== */
const PAINT = ["#E2654F", "#F28A3C", "#F2B33D", "#FFE48A", "#8ED08A", "#4FA86A", "#86CFC3", "#5E9BD6", "#3E6FB0", "#9B8CF2", "#EE7FA0", "#F7B8C8", "#B07A45", "#7A5232", "#B9B4AE", "#FFFFFF"];
/* ogni zona da colorare e' una figura con bordo scuro (classe "cz") */
const CZ = (tag, attrs) => `<${tag} class="cz" ${attrs}/>`;
function cpMandala(kind) {
  let s = CZ("rect", 'x="0" y="0" width="300" height="300"'); const c = 150;
  const ring = (n, r, rx, ry, rot = 0) => { for (let i = 0; i < n; i++) { const a = (360 / n) * i + rot; s += CZ("ellipse", `cx="${c}" cy="${c - r}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${c} ${c})"`); } };
  const tri = (n, r1, r2, w, rot = 0) => { for (let i = 0; i < n; i++) { const a = (360 / n) * i + rot; s += CZ("path", `d="M${c} ${c - r2}L${c + w} ${c - r1}L${c - w} ${c - r1}Z" transform="rotate(${a} ${c} ${c})"`); } };
  s += CZ("circle", `cx="${c}" cy="${c}" r="136"`);
  if (kind === 0) { ring(12, 104, 18, 30); ring(12, 104, 9, 15, 15); s += CZ("circle", `cx="${c}" cy="${c}" r="78"`); ring(8, 52, 15, 26, 22.5); s += CZ("circle", `cx="${c}" cy="${c}" r="30"`); ring(8, 18, 6, 10); s += CZ("circle", `cx="${c}" cy="${c}" r="9"`); }
  else { tri(16, 96, 132, 14); s += CZ("circle", `cx="${c}" cy="${c}" r="96"`); tri(8, 52, 92, 20, 22.5); tri(8, 52, 80, 12); s += CZ("circle", `cx="${c}" cy="${c}" r="52"`); ring(6, 28, 10, 16); s += CZ("circle", `cx="${c}" cy="${c}" r="16"`); for (let i = 0; i < 16; i++) { const a = (Math.PI * 2 * i) / 16 + Math.PI / 16; s += CZ("circle", `cx="${(c + 116 * Math.cos(a)).toFixed(1)}" cy="${(c + 116 * Math.sin(a)).toFixed(1)}" r="7"`); } }
  return s;
}
const COLOR_PAGES = [
  () => cpMandala(0),
  () => cpMandala(1),
  () => CZ("rect", 'x="0" y="0" width="300" height="200"') + CZ("circle", 'cx="246" cy="56" r="26"') + CZ("path", 'd="M40 74c-14 0-18-16-6-22-2-16 18-22 26-12 6-14 28-12 30 4 14-2 20 16 8 22-2 8-8 8-14 8z"') + CZ("path", 'd="M150 50c-10 0-13-11-4-15-1-11 13-15 18-8 4-10 20-8 21 3 10-1 14 11 6 15-1 5-6 5-10 5z"') + CZ("rect", 'x="0" y="200" width="300" height="100"') + CZ("path", 'd="M138 300L148 230H172L190 300Z"') + CZ("rect", 'x="70" y="132" width="132" height="98"') + CZ("path", 'd="M58 136L136 72L214 136Z"') + CZ("rect", 'x="174" y="78" width="18" height="36"') + CZ("rect", 'x="118" y="176" width="34" height="54" rx="4"') + CZ("rect", 'x="84" y="150" width="26" height="26" rx="3"') + CZ("rect", 'x="164" y="150" width="26" height="26" rx="3"') + CZ("circle", 'cx="136" cy="112" r="11"') + CZ("rect", 'x="244" y="168" width="14" height="62"') + CZ("circle", 'cx="251" cy="150" r="30"') + CZ("circle", 'cx="34" cy="228" r="12"') + CZ("circle", 'cx="270" cy="252" r="10"'),
  () => CZ("rect", 'x="0" y="0" width="300" height="300"') + CZ("rect", 'x="0" y="236" width="300" height="64"') + CZ("path", 'd="M106 300C112 250 112 200 106 150L114 150C120 200 120 250 114 300Z"') + CZ("path", 'd="M110 230C80 222 66 200 70 184C94 186 108 206 110 230Z"') + CZ("path", 'd="M112 214C140 200 160 204 168 216C150 230 130 228 112 214Z"') + [0, 60, 120, 180, 240, 300].map((a) => CZ("ellipse", `cx="110" cy="96" rx="20" ry="32" transform="rotate(${a} 110 128)"`)).join("") + CZ("circle", 'cx="110" cy="128" r="20"') + CZ("path", 'd="M232 92C252 62 286 70 278 100C272 118 248 112 232 92Z"') + CZ("path", 'd="M232 92C212 62 178 70 186 100C192 118 216 112 232 92Z"') + CZ("path", 'd="M232 98C254 112 262 136 246 142C232 146 226 124 232 98Z"') + CZ("path", 'd="M232 98C210 112 202 136 218 142C232 146 238 124 232 98Z"') + CZ("ellipse", 'cx="232" cy="104" rx="5" ry="22"') + CZ("circle", 'cx="40" cy="44" r="18"'),
  () => CZ("rect", 'x="0" y="0" width="300" height="300"') + CZ("path", 'd="M0 262C60 248 120 270 180 258C230 248 270 262 300 256V300H0Z"') + CZ("path", 'd="M30 262C20 220 44 196 34 160C52 190 40 226 46 262Z"') + CZ("path", 'd="M250 258C246 214 270 196 262 152C282 186 264 222 268 258Z"') + CZ("path", 'd="M66 150C100 96 186 96 216 150C186 204 100 204 66 150Z"') + CZ("path", 'd="M216 150L262 116L252 150L262 184Z"') + CZ("path", 'd="M120 112C136 86 166 88 178 108C160 110 138 110 120 112Z"') + CZ("path", 'd="M136 150C150 136 168 136 176 150C168 166 150 166 136 150Z"') + CZ("circle", 'cx="98" cy="140" r="11"') + CZ("circle", 'cx="96" cy="137" r="4"') + CZ("circle", 'cx="54" cy="104" r="9"') + CZ("circle", 'cx="38" cy="70" r="6"') + CZ("circle", 'cx="52" cy="42" r="4"') + CZ("path", 'd="M152 262C150 244 168 236 178 246C186 236 204 244 200 262Z"'),
  () => CZ("rect", 'x="0" y="0" width="300" height="300"') + CZ("path", 'd="M0 300V238C50 210 100 214 150 238C200 214 250 210 300 238V300Z"') + CZ("path", 'd="M0 270C60 250 100 262 150 274V300H0Z"') + CZ("circle", 'cx="252" cy="52" r="22"') + CZ("path", 'd="M30 82c-12 0-15-13-5-18-2-13 15-18 22-10 5-12 24-10 25 3 12-2 17 13 7 18-2 7-7 7-12 7z"') + [[-1, "M150 30C110 30 88 62 88 98C88 128 110 150 130 172H150Z"], [1, "M150 30C190 30 212 62 212 98C212 128 190 150 170 172H150Z"]].map(([, d]) => CZ("path", `d="${d}"`)).join("") + CZ("path", 'd="M150 30C132 30 122 62 122 98C122 128 134 150 140 172H160C166 150 178 128 178 98C178 62 168 30 150 30Z"') + CZ("path", 'd="M88 98C88 108 96 112 104 112C112 112 120 108 122 98C120 108 128 112 136 112C144 112 150 108 150 98C150 108 156 112 164 112C172 112 180 108 178 98C180 108 188 112 196 112C204 112 212 108 212 98C210 122 196 140 186 150H114C104 140 90 122 88 98Z"') + CZ("rect", 'x="130" y="196" width="40" height="30" rx="5"') + CZ("rect", 'x="126" y="190" width="48" height="8" rx="3"'),
  () => CZ("rect", 'x="0" y="0" width="300" height="300"') + [128, 112, 96, 80, 64, 48].map((r) => CZ("path", `d="M${150 - r - 16} 230A${r + 16} ${r + 16} 0 0 1 ${150 + r + 16} 230H${150 + r}A${r} ${r} 0 0 0 ${150 - r} 230Z"`)).join("") + CZ("path", 'd="M20 238c-16 0-20-18-6-24-2-18 20-24 30-12 6-16 32-14 34 4 16-2 22 18 8 24-2 8-8 8-16 8z"') + CZ("path", 'd="M208 238c-16 0-20-18-6-24-2-18 20-24 30-12 6-16 32-14 34 4 16-2 22 18 8 24-2 8-8 8-16 8z"') + CZ("circle", 'cx="50" cy="50" r="24"') + CZ("rect", 'x="0" y="246" width="300" height="54"') + [[60, 270], [110, 282], [190, 276], [244, 284]].map(([x, y]) => CZ("path", `d="M${x} ${y - 10}C${x + 6} ${y - 2} ${x + 6} ${y + 6} ${x} ${y + 6}C${x - 6} ${y + 6} ${x - 6} ${y - 2} ${x} ${y - 10}Z"`)).join(""),
  () => CZ("rect", 'x="0" y="0" width="300" height="300"') + CZ("ellipse", 'cx="150" cy="262" rx="120" ry="18"') + CZ("rect", 'x="62" y="186" width="176" height="66" rx="10"') + CZ("path", 'd="M62 196C80 214 96 196 112 212C128 196 144 214 160 200C176 214 192 196 208 212C220 202 230 206 238 196V190H62Z"') + CZ("rect", 'x="86" y="132" width="128" height="56" rx="10"') + CZ("path", 'd="M86 142C100 156 112 142 126 154C140 142 152 156 166 144C180 156 192 142 214 152V136H86Z"') + CZ("rect", 'x="110" y="90" width="80" height="44" rx="8"') + CZ("circle", 'cx="150" cy="80" r="12"') + [118, 150, 182].map((x) => CZ("rect", `x="${x - 4}" y="40" width="8" height="38" rx="3"`) + CZ("path", `d="M${x} 16C${x + 8} 26 ${x + 7} 34 ${x} 36C${x - 7} 34 ${x - 8} 26 ${x} 16Z"`)).join("") + [[36, 60], [262, 70], [40, 140], [262, 150]].map(([x, y]) => CZ("circle", `cx="${x}" cy="${y}" r="9"`)).join("")
];
function openColor() {
  const t = g18();
  shell("color", `<div class="cwrap" id="cWrap"></div><p class="small g18msg" id="g18Msg" aria-live="polite"></p><div class="trtools" id="cTools"></div>`, `<button class="pill pillbtn" id="galOpen">${esc(t.gallery)}</button>`);
  game.kind = "color"; colorPick();
}
function colorStore() { try { return JSON.parse(localStorage.getItem("tanetto-color") || "{}"); } catch (e) { return {}; } }
function colorStoreSet(o) { try { localStorage.setItem("tanetto-color", JSON.stringify(o)); } catch (e) { /* niente */ } }
function colorPageSvg(i, fills, thumb) {
  let s = COLOR_PAGES[i](); let k = 0;
  s = s.replace(/class="cz"/g, () => { const f = fills && fills[k] != null ? PAINT[fills[k]] : "#FFFFFF"; return `class="cz" data-z="${k++}" fill="${f}"`; });
  return `<svg viewBox="0 0 300 300" class="${thumb ? "cthumb" : "cpage"}" ${thumb ? 'aria-hidden="true"' : ""}><g stroke="#3A3330" stroke-width="${thumb ? 4 : 2.6}" stroke-linejoin="round">${s}</g></svg>`;
}
function colorPick() {
  const t = g18(); const st = colorStore(); game.page = -1;
  document.getElementById("cWrap").innerHTML = `<div class="cpick">${COLOR_PAGES.map((_, i) => `<button class="cpg" data-cpage="${i}" aria-label="${esc(t.pages[i])}">${colorPageSvg(i, st[i], true)}<span>${esc(t.pages[i])}</span></button>`).join("")}</div>`;
  document.getElementById("cTools").innerHTML = ""; g18msg(esc(t.colorP));
  if (anim) G.from(".cpg", { y: 14, opacity: 0, stagger: 0.04, duration: 0.3, ease: "power2.out", clearProps: "all" });
}
function colorOpenPage(i) {
  const t = g18(); const st = colorStore(); const fills = st[i] || [];
  game.page = i; game.fills = fills.slice(); game.undo = []; game.paint = game.paint == null ? 0 : game.paint;
  document.getElementById("cWrap").innerHTML = `<div class="cboard" id="cBoard">${colorPageSvg(i, fills, false)}</div>`;
  game.zones = document.querySelectorAll("#cBoard .cz").length;
  document.getElementById("cTools").innerHTML = `<div class="fpal cpal" role="radiogroup">${PAINT.map((c, k) => `<button class="fcol${k === game.paint ? " on" : ""}" data-paint="${k}" role="radio" aria-checked="${k === game.paint}" aria-label="${c}" style="--c:${c}"></button>`).join("")}</div><div class="frow"><button class="btn ghost small" id="cBack">${esc(t.back)}</button><span class="spacer"></span><button class="btn ghost small" id="cUndo">${esc(t.undo)}</button><button class="btn small" id="cFinish">${esc(t.finish)}</button></div>`;
  g18msg(esc(t.pages[i]));
}
function colorTap(el) {
  const g = game; const z = +el.dataset.z; const prev = g.fills[z]; if (prev === g.paint) return;
  const m = document.getElementById("g18Msg"); if (m && m.querySelector("b")) g18msg(esc(g18().pages[g.page]));
  g.undo.push([z, prev]); if (g.undo.length > 80) g.undo.shift(); g.fills[z] = g.paint; el.setAttribute("fill", PAINT[g.paint]);
  const st = colorStore(); st[g.page] = g.fills; colorStoreSet(st);
  SND.play("tap"); SND.haptic(5); if (anim) G.fromTo(el, { opacity: 0.55 }, { opacity: 1, duration: 0.25 });
}
async function colorFinish() {
  const g = game; const t = g18(); const done = g.fills.filter((x) => x != null).length;
  if (done < Math.ceil(g.zones * 0.5)) { g18msg(`<b>${esc(t.colorMore)}</b>`); SND.play("miss"); return; }
  const url = await svgToJpg(colorPageSvg(g.page, g.fills, false), 720); if (url) galAdd(url);
  const full = done >= g.zones; const key = "color-" + g.page; S.colorDone = S.colorDone || {};
  const first = S.colorDone[key] !== S.day; S.colorDone[key] = S.day;
  const seeds = first ? awardGameSeeds(full ? 6 : 4) : 0; addJoy(5); save(); trackOnce("gioco-color");
  SND.play("fanfare"); SND.haptic([20, 50, 20]);
  const st = colorStore(); delete st[g.page]; colorStoreSet(st);
  const wrap = document.getElementById("cWrap");
  if (wrap) { wrap.insertAdjacentHTML("beforeend", `<div class="gstart gend cend"><div class="cendimg"><img src="${url}" alt=""></div><h3>${esc(t.saved)}</h3>${seeds ? `<p><strong>${seedsLine(seeds)}</strong></p>` : ""}<button class="btn" id="cAgain">${esc(t.pick)}</button></div>`); if (anim) G.from(".cend", { scale: 0.85, opacity: 0, duration: 0.4, ease: "back.out(2)" }); }
  document.getElementById("cTools").innerHTML = "";
}
function svgToJpg(svgStr, size) {
  return new Promise((res) => {
    const s = svgStr.replace("<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" `);
    const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); c.width = size; c.height = size; const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, size, size); x.drawImage(img, 0, 0, size, size); try { res(c.toDataURL("image/jpeg", 0.88)); } catch (e) { res(null); } };
    img.onerror = () => res(null); img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  });
}

/* =================== GALLERIA (sul telefono, massimo 12 immagini) =================== */
const GAL_KEY = "tanetto-gallery", GAL_MAX = 12;
function galList() { try { const a = JSON.parse(localStorage.getItem(GAL_KEY) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
function galSave(a) { for (;;) { try { localStorage.setItem(GAL_KEY, JSON.stringify(a)); return true; } catch (e) { if (!a.length) return false; a.pop(); } } }
function galAdd(url) {
  const t = g18(); const a = galList(); a.unshift({ u: url, d: dkey() }); let cut = false; while (a.length > GAL_MAX) { a.pop(); cut = true; }
  const before = a.length; const ok = galSave(a); if (cut || galList().length < before) toast(t.galFull); else if (ok) toast(t.saved); return ok;
}
function galOpen() {
  const t = g18(); const a = galList(); const keep = layer.querySelector(".gamebox") ? layer.innerHTML : null;
  const box = document.createElement("div"); box.id = "galBox"; box.className = "overlay galbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-labelledby", "galT");
  box.innerHTML = `<div class="box card galin"><h2 id="galT">${esc(t.gallery)}</h2>${a.length ? `<div class="galgrid">${a.map((x, i) => `<button class="galit" data-gal="${i}"><img src="${x.u}" alt="${esc(fmtDate(x.d))}" loading="lazy"></button>`).join("")}</div>` : `<p class="muted">${esc(t.galEmpty)}</p>`}<button class="btn" id="galClose">${esc(L().close)}</button></div>`;
  document.body.appendChild(box); void keep; SND.play("paper");
  if (anim) G.from(box.querySelector(".galin"), { y: 24, opacity: 0, duration: 0.3, ease: "power3.out" });
}
function galView(i) {
  const t = g18(); const x = galList()[i]; const box = document.getElementById("galBox"); if (!x || !box) return;
  box.innerHTML = `<div class="box card galin"><img class="galbig" src="${x.u}" alt="${esc(fmtDate(x.d))}"><p class="small muted">${esc(fmtDate(x.d))}</p><div class="galacts"><button class="btn ghost small" id="galShare" data-gal="${i}">${esc(L().share)}</button><button class="btn ghost small" id="galDev" data-gal="${i}">${esc(t.saveDev)}</button><button class="btn ghost small galdel" id="galDel" data-gal="${i}">${esc(t.del)}</button></div><button class="btn" id="galBack">${esc(t.gallery)}</button></div>`;
}
function galClose() { const b = document.getElementById("galBox"); if (b) b.remove(); }

/* --- aperture, tocchi, trascinamenti --- */
const _openGameKeyV18 = openGameKey;
openGameKey = function (k) { if (k === "paths") { openPaths(); return; } if (k === "trace") { openTrace(); return; } if (k === "color") { openColor(); return; } _openGameKeyV18(k); };
const g18kind = () => game && ["paths", "trace", "free", "color"].includes(game.kind);
document.addEventListener("click", async (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "galOpen") { ev.stopImmediatePropagation(); galOpen(); return; }
  if (b.id === "galClose") { ev.stopImmediatePropagation(); galClose(); return; }
  if (b.id === "galBack") { ev.stopImmediatePropagation(); galClose(); galOpen(); return; }
  if (b.dataset.gal !== undefined && b.classList.contains("galit")) { ev.stopImmediatePropagation(); galView(+b.dataset.gal); return; }
  if (b.id === "galShare" || b.id === "galDev") { ev.stopImmediatePropagation(); const x = galList()[+b.dataset.gal]; if (!x) return; const nm = `tanetto-disegno-${x.d}.jpg`; if (b.id === "galShare") { const ok = await shareImage(x.u, nm); if (!ok) saveImage(x.u, nm); } else saveImage(x.u, nm); return; }
  if (b.id === "galDel") { ev.stopImmediatePropagation(); const a = galList(); a.splice(+b.dataset.gal, 1); galSave(a); SND.play("click"); galClose(); galOpen(); return; }
  if (!game || !g18kind()) return;
  if (b.id === "gBegin") { ev.stopImmediatePropagation(); SND.play("click"); const st = document.getElementById("gStart"); if (game.kind === "paths") { if (st) st.remove(); game.run = true; } else if (game.kind === "trace") traceStart(); return; }
  if (b.id === "pathNext") { ev.stopImmediatePropagation(); document.querySelectorAll("#arena .gend").forEach((x) => x.remove()); pathNew(true); SND.play("click"); if (anim) G.from("#pSvg", { scale: 0.92, opacity: 0, duration: 0.35, ease: "back.out(1.6)" }); return; }
  if (b.id === "trRetry") { ev.stopImmediatePropagation(); if (game.kind === "trace") { if (game.judged) { game.stars -= (document.querySelectorAll("#tStars .tstar.on").length); const sp = document.getElementById("gScore"); if (sp) sp.textContent = `★ ${game.stars}`; } traceRound(); } return; }
  if (b.id === "trDone") { ev.stopImmediatePropagation(); traceJudge(); return; }
  if (b.id === "trNext") { ev.stopImmediatePropagation(); traceNext(); return; }
  if (b.id === "traceAgain") { ev.stopImmediatePropagation(); const tp = document.getElementById("tPad"); if (tp) tp.classList.remove("judged"); traceStart(); return; }
  if (b.id === "trFree") { ev.stopImmediatePropagation(); SND.play("click"); freeOpen(); return; }
  if (b.dataset.ink !== undefined) { ev.stopImmediatePropagation(); game.ink = +b.dataset.ink; game.eraser = false; document.querySelectorAll(".fcol[data-ink]").forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-checked", String(on)); }); const e = document.getElementById("fErase"); if (e) { e.classList.remove("on"); e.setAttribute("aria-pressed", "false"); } SND.play("tap"); return; }
  if (b.dataset.brush !== undefined) { ev.stopImmediatePropagation(); game.brush = +b.dataset.brush; document.querySelectorAll(".fsz[data-brush]").forEach((x) => x.classList.toggle("on", x === b)); SND.play("tap"); return; }
  if (b.id === "fErase") { ev.stopImmediatePropagation(); game.eraser = !game.eraser; b.classList.toggle("on", game.eraser); b.setAttribute("aria-pressed", String(game.eraser)); SND.play("tap"); return; }
  if (b.id === "fUndo") { ev.stopImmediatePropagation(); game.strokes.pop(); freeRedraw(); SND.play("tap"); return; }
  if (b.id === "fClear") { ev.stopImmediatePropagation(); game.strokes = []; freeRedraw(); SND.play("click"); return; }
  if (b.id === "fSave") {
    ev.stopImmediatePropagation(); if (!game.strokes.length) { shake(document.getElementById("fCanvas")); return; }
    const url = freePng(900); if (!url) return; galAdd(url); S.freeDone = S.freeDone || null;
    if (S.freeDone !== S.day) { S.freeDone = S.day; const e = awardGameSeeds(3); if (e) toast(L().gameSeeds(e)); addJoy(4); save(); }
    trackOnce("disegno-libero"); SND.play("sparkle"); game.strokes = []; freeRedraw(); return;
  }
  if (b.dataset.cpage !== undefined) { ev.stopImmediatePropagation(); SND.play("click"); colorOpenPage(+b.dataset.cpage); if (anim) G.from("#cBoard", { scale: 0.94, opacity: 0, duration: 0.3, ease: "back.out(1.6)" }); return; }
  if (b.dataset.paint !== undefined) { ev.stopImmediatePropagation(); game.paint = +b.dataset.paint; document.querySelectorAll(".fcol[data-paint]").forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-checked", String(on)); }); SND.play("tap"); return; }
  if (b.id === "cBack" || b.id === "cAgain") { ev.stopImmediatePropagation(); SND.play("click"); colorPick(); return; }
  if (b.id === "cUndo") { ev.stopImmediatePropagation(); const u = game.undo.pop(); if (!u) return; const [z, prev] = u; game.fills[z] = prev; const el = document.querySelector(`#cBoard .cz[data-z="${z}"]`); if (el) el.setAttribute("fill", prev == null ? "#FFFFFF" : PAINT[prev]); const st = colorStore(); st[game.page] = game.fills; colorStoreSet(st); SND.play("tap"); return; }
  if (b.id === "cFinish") { ev.stopImmediatePropagation(); colorFinish(); }
}, true);
/* trascinamenti: sentieri, ricalco e disegno libero; tocchi sulle zone da colorare */
document.addEventListener("pointerdown", (ev) => {
  if (!game || !g18kind() || ev.target.closest("button")) return;
  if (game.kind === "paths" && game.run && ev.target.closest("#pSvg")) { ev.preventDefault(); try { ev.target.releasePointerCapture && ev.target.releasePointerCapture(ev.pointerId); } catch (e) { /* niente */ } game.pid = ev.pointerId; pathStart(pathCell(ev)); return; }
  if (game.kind === "trace" && game.run && !game.judged && ev.target.closest("#tSvg")) { ev.preventDefault(); game.pid = ev.pointerId; const p = tracePt(ev); game.strokes.push([p]); game.drawing = true; traceInk(); return; }
  if (game.kind === "free" && ev.target.closest("#fCanvas")) { ev.preventDefault(); game.pid = ev.pointerId; game.cur = { p: [freePt(ev)], c: game.ink, b: game.brush, e: game.eraser }; freeRedraw(); return; }
  if (game.kind === "color" && game.page >= 0) { const z = ev.target.closest && ev.target.closest("#cBoard .cz"); if (z) { ev.preventDefault(); colorTap(z); } }
}, { passive: false });
document.addEventListener("pointermove", (ev) => {
  if (!game || !g18kind() || ev.pointerId !== game.pid) return;
  if (game.kind === "paths" && game.act >= 0) { ev.preventDefault(); pathStep(pathCell(ev)); return; }
  if (game.kind === "trace" && game.drawing) { ev.preventDefault(); const p = tracePt(ev); const s = game.strokes[game.strokes.length - 1]; const l = s[s.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > 2.5) { s.push(p); traceInk(); } return; }
  if (game.kind === "free" && game.cur) { ev.preventDefault(); const p = freePt(ev); const l = game.cur.p[game.cur.p.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > 1.5) { game.cur.p.push(p); freeRedraw(); } }
}, { passive: false });
function g18up(ev) {
  if (!game || !g18kind() || ev.pointerId !== game.pid) return; game.pid = null;
  if (game.kind === "paths") { pathEnd(); return; }
  if (game.kind === "trace" && game.drawing) { game.drawing = false; const dn = document.getElementById("trDone"); if (dn) dn.disabled = [].concat(...game.strokes).length < 8; const sc = traceScore(); if (sc.cov >= 0.94) traceJudge(); return; }
  if (game.kind === "free" && game.cur) { game.strokes.push(game.cur); game.cur = null; if (game.strokes.length > 400) game.strokes.shift(); freeRedraw(); }
}
document.addEventListener("pointerup", g18up); document.addEventListener("pointercancel", g18up);
window.addEventListener("resize", () => { if (game && game.kind === "free") freeResize(); });
/* tasto indietro: prima si chiude la galleria */
if (typeof backPress === "function") { const _backPressV18g = backPress; backPress = function () { if (document.getElementById("galBox")) { galClose(); return "gallery"; } return _backPressV18g(); }; }
