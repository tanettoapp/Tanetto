/* Questionario anonimo per i tester: le altre 12 lingue (it ed en sono in 3zs_survey.js) */
T.de.survey = {
  cardT: "Deine Meinung", cardP: "6 kurze, anonyme Fragen, damit Tanetto noch schöner wird. Als Dankeschön gibt es 50 Tanì.", cardB: "Antworten", done: "Danke! Deine Antworten helfen uns sehr.",
  inviteT: "Hilfst du uns?", inviteP: (n) => `${n} möchte gern wissen, was du denkst. Es dauert nur eine Minute.`, later: "Später",
  step: (i, n) => `Frage ${i} von ${n}`, next: "Weiter", send: "Senden", multi: "Du kannst mehrere wählen", skip: "Überspringen",
  thanksT: "Tausend Dank!", thanksP: "Die Antworten sind anonym: keine Namen, keine E-Mails. Wenn du uns mehr erzählen möchtest, schreib uns:", gift: "+50 Tanì für dich",
  q: [
    { t: "Wie gefällt dir Tanetto?", o: ["Gar nicht", "Ein bisschen", "Ganz gut", "Sehr", "Ich liebe es"] },
    { t: "Was gefällt dir am meisten?", m: true, o: ["Der Begleiter", "Die Ziele", "Zimmer und Objekte", "Ausflüge und Postkarten", "Das Tagebuch", "Die Spiele", "Der Saisonpfad", "Die Musik"] },
    { t: "Was würdest du verbessern?", m: true, o: ["Mehr Ziele", "Mehr Spiele", "Mehr Objekte", "Weniger Text", "Schneller", "Erinnerungen", "Die Grafik", "Passt so"] },
    { t: "Würdest du es in einem Monat noch nutzen?", o: ["Ja, sicher", "Vielleicht", "Nein"] },
    { t: "Würdest du Tanetto Plus nehmen?", o: ["Ja, monatlich", "Ja, jährlich", "Vielleicht, mit mehr Inhalt", "Nein"] },
    { t: "Wie hast du uns gefunden?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Über Freunde", "Anders"] }
  ]
};
T.es.survey = {
  cardT: "Danos tu opinión", cardP: "6 preguntas rápidas y anónimas para que Tanetto sea aún más bonito. De regalo, 50 Tanì.", cardB: "Responder", done: "¡Gracias! Tus respuestas nos ayudan muchísimo.",
  inviteT: "¿Nos echas una mano?", inviteP: (n) => `${n} quiere saber qué te parece. Solo lleva un minuto.`, later: "Más tarde",
  step: (i, n) => `Pregunta ${i} de ${n}`, next: "Siguiente", send: "Enviar", multi: "Puedes elegir más de una", skip: "Saltar",
  thanksT: "¡Muchísimas gracias!", thanksP: "Las respuestas son anónimas: sin nombres ni correos. Si quieres contarnos más, escríbenos:", gift: "+50 Tanì para ti",
  q: [
    { t: "¿Cuánto te gusta Tanetto?", o: ["Nada", "Un poco", "Bastante", "Mucho", "Me encanta"] },
    { t: "¿Qué es lo que más te gusta?", m: true, o: ["El compañero", "Los objetivos", "Habitación y objetos", "Excursiones y postales", "El diario", "Los juegos", "El sendero de temporada", "La música"] },
    { t: "¿Qué mejorarías?", m: true, o: ["Más objetivos", "Más juegos", "Más objetos", "Menos texto", "Más rapidez", "Los recordatorios", "Los gráficos", "Está bien así"] },
    { t: "¿Lo seguirías usando dentro de un mes?", o: ["Sí, seguro", "Quizás", "No"] },
    { t: "¿Te harías Tanetto Plus?", o: ["Sí, mensual", "Sí, anual", "Quizás, con más cosas", "No"] },
    { t: "¿Cómo nos conociste?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Por amigos", "Otro"] }
  ]
};
T.fr.survey = {
  cardT: "Ton avis", cardP: "6 questions rapides et anonymes pour rendre Tanetto encore plus beau. En cadeau : 50 Tanì.", cardB: "Répondre", done: "Merci ! Tes réponses nous aident énormément.",
  inviteT: "Tu veux bien nous aider ?", inviteP: (n) => `${n} aimerait savoir ce que tu en penses. Ça prend une minute.`, later: "Plus tard",
  step: (i, n) => `Question ${i} sur ${n}`, next: "Suivant", send: "Envoyer", multi: "Tu peux en choisir plusieurs", skip: "Passer",
  thanksT: "Merci de tout cœur !", thanksP: "Les réponses sont anonymes : pas de nom, pas d'e-mail. Si tu veux nous en dire plus, écris-nous :", gift: "+50 Tanì pour toi",
  q: [
    { t: "Tu aimes Tanetto à quel point ?", o: ["Pas du tout", "Un peu", "Assez", "Beaucoup", "J'adore"] },
    { t: "Qu'est-ce que tu préfères ?", m: true, o: ["Le compagnon", "Les objectifs", "La chambre et les objets", "Sorties et cartes postales", "Le journal", "Les jeux", "Le sentier de la saison", "La musique"] },
    { t: "Qu'est-ce que tu améliorerais ?", m: true, o: ["Plus d'objectifs", "Plus de jeux", "Plus d'objets", "Moins de texte", "Plus rapide", "Les rappels", "Les graphismes", "C'est bien comme ça"] },
    { t: "Tu l'utiliserais encore dans un mois ?", o: ["Oui, sûr", "Peut-être", "Non"] },
    { t: "Tu prendrais Tanetto Plus ?", o: ["Oui, au mois", "Oui, à l'année", "Peut-être, avec plus de contenu", "Non"] },
    { t: "Comment as-tu découvert Tanetto ?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Par des amis", "Autre"] }
  ]
};
T.pt.survey = {
  cardT: "Dê sua opinião", cardP: "6 perguntas rápidas e anônimas para deixar o Tanetto ainda mais bonito. De presente, 50 Tanì.", cardB: "Responder", done: "Obrigado! Suas respostas ajudam muito.",
  inviteT: "Quer ajudar a gente?", inviteP: (n) => `${n} quer saber o que você acha. Leva só um minuto.`, later: "Mais tarde",
  step: (i, n) => `Pergunta ${i} de ${n}`, next: "Próximo", send: "Enviar", multi: "Você pode escolher mais de uma", skip: "Pular",
  thanksT: "Muito obrigado!", thanksP: "As respostas são anônimas: sem nomes, sem e-mails. Se quiser contar mais, escreva pra gente:", gift: "+50 Tanì pra você",
  q: [
    { t: "Quanto você gosta do Tanetto?", o: ["Nada", "Pouco", "Mais ou menos", "Muito", "Amo demais"] },
    { t: "Do que você mais gosta?", m: true, o: ["O companheiro", "As metas", "O quarto e os itens", "Passeios e cartões", "O diário", "Os jogos", "A trilha da temporada", "As músicas"] },
    { t: "O que você melhoraria?", m: true, o: ["Mais metas", "Mais jogos", "Mais itens", "Menos texto", "Mais rápido", "Os lembretes", "Os gráficos", "Está ótimo assim"] },
    { t: "Você ainda usaria daqui a um mês?", o: ["Sim, com certeza", "Talvez", "Não"] },
    { t: "Você assinaria o Tanetto Plus?", o: ["Sim, mensal", "Sim, anual", "Talvez, com mais coisas", "Não"] },
    { t: "Como você conheceu a gente?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Por amigos", "Outro"] }
  ]
};
T.ja.survey = {
  cardT: "ご意見をきかせて", cardP: "Tanettoをもっとすてきにするための、匿名のかんたんな質問が6つ。お礼に50 Tanìをプレゼント。", cardB: "答える", done: "ありがとう！あなたの回答がとても役に立ちます。",
  inviteT: "協力してくれる？", inviteP: (n) => `${n}があなたの感想を知りたがっています。1分で終わります。`, later: "あとで",
  step: (i, n) => `質問 ${i}/${n}`, next: "次へ", send: "送信", multi: "複数選べます", skip: "スキップ",
  thanksT: "本当にありがとう！", thanksP: "回答は匿名です。名前もメールアドレスも集めません。もっと伝えたいことがあれば、こちらへどうぞ：", gift: "+50 Tanìをどうぞ",
  q: [
    { t: "Tanettoはどのくらい好き？", o: ["ぜんぜん", "少し", "まあまあ", "とても", "大好き"] },
    { t: "いちばん好きなところは？", m: true, o: ["パートナー", "目標", "お部屋とアイテム", "おでかけとポストカード", "日記", "ゲーム", "シーズンの小道", "音楽"] },
    { t: "よくしてほしいところは？", m: true, o: ["目標をもっと", "ゲームをもっと", "アイテムをもっと", "文章を少なく", "もっと速く", "リマインダー", "グラフィック", "今のままでいい"] },
    { t: "1か月後も使っていそう？", o: ["きっと使う", "たぶん", "使わない"] },
    { t: "Tanetto Plusを使ってみたい？", o: ["はい、月額で", "はい、年額で", "内容しだい", "いいえ"] },
    { t: "Tanettoをどこで知った？", o: ["Reddit", "TikTok", "Instagram", "YouTube", "友だち", "その他"] }
  ]
};
T.ko.survey = {
  cardT: "의견을 들려주세요", cardP: "Tanetto를 더 멋지게 만들기 위한 짧은 익명 질문 6개예요. 감사의 뜻으로 50 Tanì를 드려요.", cardB: "답하기", done: "고마워요! 답변이 정말 큰 도움이 돼요.",
  inviteT: "도와줄 수 있어요?", inviteP: (n) => `${n}의 작은 부탁! 어떻게 생각하는지 궁금하대요. 1분이면 돼요.`, later: "나중에",
  step: (i, n) => `질문 ${i}/${n}`, next: "다음", send: "보내기", multi: "여러 개 고를 수 있어요", skip: "건너뛰기",
  thanksT: "정말 고마워요!", thanksP: "답변은 익명이에요. 이름도 이메일도 받지 않아요. 더 하고 싶은 이야기가 있다면 여기로 보내 주세요:", gift: "+50 Tanì 선물",
  q: [
    { t: "Tanetto가 얼마나 마음에 들어요?", o: ["전혀", "조금", "그럭저럭", "많이", "정말 좋아요"] },
    { t: "가장 좋은 점은 뭐예요?", m: true, o: ["친구", "목표", "방과 아이템", "여행과 엽서", "일기", "게임", "시즌 오솔길", "음악"] },
    { t: "무엇이 더 좋아지면 좋을까요?", m: true, o: ["목표 더 많이", "게임 더 많이", "아이템 더 많이", "글은 더 적게", "더 빠르게", "알림", "그래픽", "지금이 좋아요"] },
    { t: "한 달 뒤에도 쓸 것 같아요?", o: ["네, 꼭이요", "아마도", "아니요"] },
    { t: "Tanetto Plus를 이용할 생각이 있나요?", o: ["네, 월간", "네, 연간", "기능이 더 많으면", "아니요"] },
    { t: "Tanetto를 어떻게 알게 됐어요?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "친구", "기타"] }
  ]
};
T.zh.survey = {
  cardT: "说说你的想法", cardP: "6 个简短的匿名问题，让 Tanetto 变得更好。答完送你 50 Tanì。", cardB: "去回答", done: "谢谢！你的回答对我们帮助很大。",
  inviteT: "可以帮帮我们吗？", inviteP: (n) => `${n}想知道你的想法，只要一分钟。`, later: "稍后",
  step: (i, n) => `第 ${i} 题，共 ${n} 题`, next: "下一步", send: "发送", multi: "可以多选", skip: "跳过",
  thanksT: "非常感谢！", thanksP: "回答是匿名的：不收集姓名，也不收集邮箱。如果想跟我们多聊聊，欢迎来信：", gift: "送你 +50 Tanì",
  q: [
    { t: "你有多喜欢 Tanetto？", o: ["完全不", "有一点", "还可以", "很喜欢", "超喜欢"] },
    { t: "你最喜欢什么？", m: true, o: ["小伙伴", "目标", "房间和物品", "旅行和明信片", "日记", "游戏", "本季小路", "音乐"] },
    { t: "你希望改进哪些地方？", m: true, o: ["更多目标", "更多游戏", "更多物品", "文字少一点", "速度更快", "提醒", "画面", "现在就很好"] },
    { t: "一个月后你还会用吗？", o: ["一定会", "也许", "不会"] },
    { t: "你会开通 Tanetto Plus 吗？", o: ["会，按月", "会，按年", "内容更多就会", "不会"] },
    { t: "你是怎么知道我们的？", o: ["Reddit", "TikTok", "Instagram", "YouTube", "朋友推荐", "其他"] }
  ]
};
T.zht.survey = {
  cardT: "說說你的想法", cardP: "6 個簡短的匿名問題，讓 Tanetto 變得更好。回答完送你 50 Tanì。", cardB: "去回答", done: "謝謝！你的回答對我們幫助很大。",
  inviteT: "可以幫幫我們嗎？", inviteP: (n) => `${n}想知道你的想法，只要一分鐘。`, later: "稍後",
  step: (i, n) => `第 ${i} 題，共 ${n} 題`, next: "下一步", send: "傳送", multi: "可以複選", skip: "跳過",
  thanksT: "非常感謝！", thanksP: "回答都是匿名的：不收集姓名，也不收集電子郵件。如果想跟我們多聊聊，歡迎來信：", gift: "送你 +50 Tanì",
  q: [
    { t: "你有多喜歡 Tanetto？", o: ["完全不", "有一點", "還可以", "很喜歡", "超喜歡"] },
    { t: "你最喜歡什麼？", m: true, o: ["小夥伴", "目標", "房間和物品", "旅行和明信片", "日記", "遊戲", "本季小路", "音樂"] },
    { t: "你希望改進哪些地方？", m: true, o: ["更多目標", "更多遊戲", "更多物品", "文字少一點", "速度更快", "提醒", "畫面", "現在就很好"] },
    { t: "一個月後你還會用嗎？", o: ["一定會", "也許", "不會"] },
    { t: "你會訂閱 Tanetto Plus 嗎？", o: ["會，月繳", "會，年繳", "內容更多就會", "不會"] },
    { t: "你是怎麼知道我們的？", o: ["Reddit", "TikTok", "Instagram", "YouTube", "朋友介紹", "其他"] }
  ]
};
T.ru.survey = {
  cardT: "Твоё мнение", cardP: "6 быстрых анонимных вопросов, чтобы Tanetto стал ещё лучше. В подарок — 50 Tanì.", cardB: "Ответить", done: "Спасибо! Твои ответы очень нам помогают.",
  inviteT: "Поможешь нам?", inviteP: (n) => `${n} хочет знать, что ты думаешь. Это займёт минуту.`, later: "Позже",
  step: (i, n) => `Вопрос ${i} из ${n}`, next: "Далее", send: "Отправить", multi: "Можно выбрать несколько", skip: "Пропустить",
  thanksT: "Огромное спасибо!", thanksP: "Ответы анонимные: никаких имён и e-mail. Если хочешь рассказать больше, напиши нам:", gift: "+50 Tanì тебе",
  q: [
    { t: "Насколько тебе нравится Tanetto?", o: ["Совсем нет", "Немного", "Нормально", "Очень", "Обожаю"] },
    { t: "Что нравится больше всего?", m: true, o: ["Питомец", "Цели", "Комната и предметы", "Поездки и открытки", "Дневник", "Игры", "Тропинка сезона", "Музыка"] },
    { t: "Что стоит улучшить?", m: true, o: ["Больше целей", "Больше игр", "Больше предметов", "Меньше текста", "Скорость", "Напоминания", "Графика", "Всё и так хорошо"] },
    { t: "Будешь пользоваться им через месяц?", o: ["Да, точно", "Возможно", "Нет"] },
    { t: "Оформишь Tanetto Plus?", o: ["Да, помесячно", "Да, на год", "Если будет больше", "Нет"] },
    { t: "Откуда ты о нас знаешь?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "От друзей", "Другое"] }
  ]
};
T.pl.survey = {
  cardT: "Twoja opinia", cardP: "6 szybkich, anonimowych pytań, dzięki którym Tanetto będzie jeszcze lepsze. W prezencie 50 Tanì.", cardB: "Odpowiedz", done: "Dziękujemy! Twoje odpowiedzi bardzo nam pomagają.",
  inviteT: "Pomożesz nam?", inviteP: (n) => `${n} chce wiedzieć, co myślisz. To zajmie minutę.`, later: "Później",
  step: (i, n) => `Pytanie ${i} z ${n}`, next: "Dalej", send: "Wyślij", multi: "Możesz wybrać kilka", skip: "Pomiń",
  thanksT: "Dziękujemy z całego serca!", thanksP: "Odpowiedzi są anonimowe: bez imion i bez e-maili. Jeśli chcesz powiedzieć nam więcej, napisz do nas:", gift: "+50 Tanì dla ciebie",
  q: [
    { t: "Jak bardzo podoba ci się Tanetto?", o: ["Wcale", "Trochę", "W miarę", "Bardzo", "Uwielbiam"] },
    { t: "Co podoba ci się najbardziej?", m: true, o: ["Towarzysz", "Cele", "Pokój i przedmioty", "Wycieczki i pocztówki", "Dziennik", "Gry", "Ścieżka sezonu", "Muzyka"] },
    { t: "Co warto poprawić?", m: true, o: ["Więcej celów", "Więcej gier", "Więcej przedmiotów", "Mniej tekstu", "Szybkość", "Przypomnienia", "Grafika", "Jest dobrze"] },
    { t: "Czy za miesiąc nadal będziesz z niego korzystać?", o: ["Tak, na pewno", "Może", "Nie"] },
    { t: "Czy wykupisz Tanetto Plus?", o: ["Tak, co miesiąc", "Tak, na rok", "Może, gdyby było więcej", "Nie"] },
    { t: "Skąd wiesz o Tanetto?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Od znajomych", "Inne"] }
  ]
};
T.nl.survey = {
  cardT: "Geef je mening", cardP: "6 korte, anonieme vragen om Tanetto nog fijner te maken. Als bedankje krijg je 50 Tanì.", cardB: "Beantwoorden", done: "Dankjewel! Je antwoorden helpen ons enorm.",
  inviteT: "Help je ons even?", inviteP: (n) => `${n} wil graag weten wat je ervan vindt. Het duurt maar een minuutje.`, later: "Later",
  step: (i, n) => `Vraag ${i} van ${n}`, next: "Verder", send: "Verstuur", multi: "Je kunt er meer kiezen", skip: "Overslaan",
  thanksT: "Heel erg bedankt!", thanksP: "De antwoorden zijn anoniem: geen namen, geen e-mails. Wil je ons meer vertellen? Schrijf ons:", gift: "+50 Tanì voor jou",
  q: [
    { t: "Hoe leuk vind je Tanetto?", o: ["Helemaal niet", "Een beetje", "Best leuk", "Heel leuk", "Super"] },
    { t: "Wat vind je het leukst?", m: true, o: ["Het maatje", "De doelen", "Kamer en spulletjes", "Uitstapjes en kaarten", "Het dagboek", "De spelletjes", "Het seizoenspad", "De muziek"] },
    { t: "Wat zou je verbeteren?", m: true, o: ["Meer doelen", "Meer spelletjes", "Meer spulletjes", "Minder tekst", "Sneller", "Herinneringen", "Het uiterlijk", "Het is goed zo"] },
    { t: "Gebruik je het over een maand nog?", o: ["Ja, zeker", "Misschien", "Nee"] },
    { t: "Zou je Tanetto Plus nemen?", o: ["Ja, per maand", "Ja, per jaar", "Misschien, met meer erbij", "Nee"] },
    { t: "Hoe heb je ons gevonden?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Via vrienden", "Anders"] }
  ]
};
T.tr.survey = {
  cardT: "Fikrini söyle", cardP: "Tanetto'yu daha da güzel yapmak için 6 kısa ve anonim soru. Teşekkür olarak 50 Tanì hediye.", cardB: "Yanıtla", done: "Teşekkürler! Yanıtların bize çok yardımcı oluyor.",
  inviteT: "Bize yardım eder misin?", inviteP: (n) => `${n} ne düşündüğünü merak ediyor. Sadece bir dakika sürer.`, later: "Sonra",
  step: (i, n) => `Soru ${i}/${n}`, next: "İleri", send: "Gönder", multi: "Birden fazla seçebilirsin", skip: "Atla",
  thanksT: "Çok teşekkürler!", thanksP: "Yanıtlar anonimdir: isim yok, e-posta yok. Bize daha fazlasını anlatmak istersen yaz:", gift: "Sana +50 Tanì",
  q: [
    { t: "Tanetto'yu ne kadar seviyorsun?", o: ["Hiç", "Biraz", "İdare eder", "Çok", "Bayılıyorum"] },
    { t: "En çok neyi seviyorsun?", m: true, o: ["Arkadaşın", "Hedefler", "Oda ve eşyalar", "Geziler ve kartpostallar", "Günlük", "Oyunlar", "Sezon yolu", "Müzik"] },
    { t: "Neyi geliştirirdin?", m: true, o: ["Daha çok hedef", "Daha çok oyun", "Daha çok eşya", "Daha az yazı", "Daha hızlı", "Hatırlatıcılar", "Grafikler", "Böyle iyi"] },
    { t: "Bir ay sonra hâlâ kullanır mısın?", o: ["Evet, kesin", "Belki", "Hayır"] },
    { t: "Tanetto Plus'ı alır mıydın?", o: ["Evet, aylık", "Evet, yıllık", "Belki, daha çok içerikle", "Hayır"] },
    { t: "Bizi nereden duydun?", o: ["Reddit", "TikTok", "Instagram", "YouTube", "Bir arkadaştan", "Diğer"] }
  ]
};
