/* =================== 1.0.10: testi nuovi (14 lingue), letti dall'app e da legal_page.js / check_lang.js ===================
   Dall'audit indipendente della 1.0.9 (AUDIT_110.md):
   - notif: titolo e 4 frasi dei promemoria senza pressione ("ti aspetta", "guarda la porta", "torna il sorriso", "la giornata
     non e' finita") per un'app per tutte le eta' (M-16, E-05); serie: "se ti va" (ai minori niente frase sulla serie).
   - kid: "Torna domani" ai bambini/ragazzi senza numeri ne' serie (G2-07).
   - ad2: dal secondo video del giorno (e per i minori) niente "raddoppia il regalo": non e' vero dopo il primo (G2-05, E-02).
   - st: interruttore "Statistiche anonime" in Profilo › Privacy ed eta' (M-11, I-04, I-11).
   - soft/sheet/more: secondo livello gentile della chat e scheda di aiuto dopo diario, "Lascia andare" e capsula (M-01b, G3-03).
   - privStats: frase in piu' nell'informativa (paragrafo delle statistiche). */
const V26T = {
 it: {
  notif: { t: "Un momento con {n} 🌱", m1: "Un piccolo passo oggi conta, e {n} è felice di farlo con te.", m2: "{n} ha trovato un angolo di sole vicino alla finestra. Vieni a vedere?", m9: "{n} ha messo in ordine la stanza. Ti va un piccolo obiettivo insieme?", m11: "Nessuna fretta: un obiettivo piccolo piccolo quando vuoi, insieme a {n}.", streak: "{k} giorni di fila insieme! Se ti va, basta un obiettivo piccolo." },
  kid: { t: "A domani", p: "{n} avrà un piccolo regalo per te." },
  ad2: { gift: "Guarda una pubblicità: +{n} Tanì", thanks: "+{n} Tanì. Grazie!" },
  st: { t: "Statistiche anonime", p: "Tanetto conta in forma anonima solo alcune azioni (per esempio «app aperta»), mai quello che scrivi. Servono a migliorare l'app.", on: "Attive", off: "Spente", kid: "Spente per chi non ha ancora l'età del consenso digitale o non ha detto l'età." },
  soft: "Sembra una cosa pesante da portare. Come stai, davvero? Se ti sembra tutto troppo difficile, puoi sempre parlarne con una persona di cui ti fidi, oppure chiamare uno di questi numeri:",
  sheet: { t: "{n} è qui con te", talk: "Parla con {n}" },
  more: "Altri Paesi: trova una linea di aiuto gratuita su findahelpline.com",
  find: "Trova una linea di aiuto gratuita nel tuo Paese su findahelpline.com", emerg: "Emergenze: chiama il numero di emergenza del tuo Paese.",
  privStats: "Puoi spegnere le statistiche quando vuoi in Profilo › Privacy ed età. Sono sempre spente per chi non ha ancora l'età del consenso digitale o non ha detto l'età, e prima della domanda sull'età non si conta niente."
 },
 en: {
  notif: { t: "A moment with {n} 🌱", m1: "A small step today counts, and {n} is happy to take it with you.", m2: "{n} found a sunny spot by the window. Come and see?", m9: "{n} tidied up the room. Fancy one small goal together?", m11: "No rush: one tiny goal whenever you like, together with {n}.", streak: "{k} days in a row together! If you feel like it, one small goal is enough." },
  kid: { t: "See you tomorrow", p: "{n} will have a small gift for you." },
  ad2: { gift: "Watch an ad: +{n} Tanì", thanks: "+{n} Tanì. Thank you!" },
  st: { t: "Anonymous statistics", p: "Tanetto anonymously counts only a few actions (for example “app opened”), never what you write. They help us improve the app.", on: "On", off: "Off", kid: "Off for anyone under the age of digital consent or who hasn't given their age." },
  soft: "That sounds like a lot to carry. How are you, really? If things ever feel too hard, you can always talk to someone you trust, or call one of these numbers:",
  sheet: { t: "{n} is here with you", talk: "Talk to {n}" },
  more: "Other countries: find a free helpline at findahelpline.com",
  find: "Find a free helpline in your country at findahelpline.com", emerg: "Emergencies: call your local emergency number.",
  privStats: "You can turn the statistics off at any time in Profile › Privacy and age. They are always off for anyone under the age of digital consent or who hasn't given their age, and nothing is counted before the age question."
 },
 de: {
  notif: { t: "Ein Moment mit {n} 🌱", m1: "Ein kleiner Schritt heute zählt, und {n} macht ihn gern mit dir.", m2: "{n} hat ein sonniges Plätzchen am Fenster gefunden. Kommst du schauen?", m9: "{n} hat das Zimmer aufgeräumt. Lust auf ein kleines Ziel zusammen?", m11: "Keine Eile: ein winziges Ziel, wann immer du magst, zusammen mit {n}.", streak: "{k} Tage in Folge zusammen! Wenn du magst, reicht ein kleines Ziel." },
  kid: { t: "Bis morgen", p: "{n} hat dann ein kleines Geschenk für dich." },
  ad2: { gift: "Werbevideo ansehen: +{n} Tanì", thanks: "+{n} Tanì. Danke!" },
  st: { t: "Anonyme Statistik", p: "Tanetto zählt anonym nur einige Aktionen (zum Beispiel „App geöffnet“), nie, was du schreibst. Das hilft uns, die App zu verbessern.", on: "An", off: "Aus", kid: "Aus für alle unter dem Alter der digitalen Einwilligung oder ohne Altersangabe." },
  soft: "Das klingt nach ganz schön viel. Wie geht es dir wirklich? Wenn dir alles zu schwer wird, kannst du immer mit einem Menschen reden, dem du vertraust, oder eine dieser Nummern anrufen:",
  sheet: { t: "{n} ist für dich da", talk: "Mit {n} reden" },
  more: "Andere Länder: Kostenlose Hilfe-Telefone findest du auf findahelpline.com",
  find: "Kostenlose Hilfe-Telefone in deinem Land findest du auf findahelpline.com", emerg: "Notfall: Ruf die Notrufnummer deines Landes an.",
  privStats: "Du kannst die Statistik jederzeit unter Profil › Datenschutz und Alter ausschalten. Sie ist immer aus für alle unter dem Alter der digitalen Einwilligung oder ohne Altersangabe, und vor der Frage nach dem Alter wird nichts gezählt."
 },
 es: {
  notif: { t: "Un momento con {n} 🌱", m1: "Un pasito hoy cuenta, y {n} se alegra de darlo contigo.", m2: "{n} ha encontrado un rincón soleado junto a la ventana. ¿Vienes a verlo?", m9: "{n} ha ordenado la habitación. ¿Hacemos un objetivo pequeño?", m11: "Sin prisa: un objetivo pequeñito cuando quieras, con {n}.", streak: "¡{k} días seguidos con {n}! Si te apetece, basta con un objetivo pequeño." },
  kid: { t: "Hasta mañana", p: "{n} tendrá un pequeño regalo para ti." },
  ad2: { gift: "Mira un anuncio: +{n} Tanì", thanks: "+{n} Tanì. ¡Gracias!" },
  st: { t: "Estadísticas anónimas", p: "Tanetto cuenta de forma anónima solo algunas acciones (por ejemplo, «app abierta»), nunca lo que escribes. Sirven para mejorar la app.", on: "Activadas", off: "Desactivadas", kid: "Desactivadas para quien aún no tiene la edad del consentimiento digital o no ha dicho su edad." },
  soft: "Parece algo pesado de llevar. ¿Cómo estás de verdad? Si todo te parece demasiado difícil, siempre puedes hablar con alguien de confianza o llamar a uno de estos números:",
  sheet: { t: "{n} está aquí contigo", talk: "Hablar con {n}" },
  more: "Otros países: encuentra una línea de ayuda gratuita en findahelpline.com",
  find: "Encuentra una línea de ayuda gratuita en tu país en findahelpline.com", emerg: "Emergencias: llama al número de emergencias de tu país.",
  privStats: "Puedes desactivar las estadísticas cuando quieras en Perfil › Privacidad y edad. Siempre están desactivadas para quien aún no tiene la edad del consentimiento digital o no ha dicho su edad, y antes de la pregunta sobre la edad no se cuenta nada."
 },
 fr: {
  notif: { t: "Un moment avec {n} 🌱", m1: "Un petit pas aujourd'hui, ça compte, et {n} le fait volontiers avec toi.", m2: "{n} a trouvé un coin de soleil près de la fenêtre. Tu viens voir ?", m9: "{n} a rangé la chambre. Un petit objectif ensemble ?", m11: "Pas de pression : un tout petit objectif quand tu veux, avec {n}.", streak: "{k} jours d'affilée ensemble ! Si tu en as envie, un petit objectif suffit." },
  kid: { t: "À demain", p: "{n} aura un petit cadeau pour toi." },
  ad2: { gift: "Regarde une publicité : +{n} Tanì", thanks: "+{n} Tanì. Merci !" },
  st: { t: "Statistiques anonymes", p: "Tanetto compte de façon anonyme seulement quelques actions (par exemple « app ouverte »), jamais ce que tu écris. Cela nous aide à améliorer l'app.", on: "Activées", off: "Désactivées", kid: "Désactivées pour qui n'a pas encore l'âge du consentement numérique ou n'a pas indiqué son âge." },
  soft: "Ça a l'air lourd à porter. Comment tu vas, vraiment ? Si tout te semble trop dur, tu peux toujours en parler à une personne de confiance ou appeler l'un de ces numéros :",
  sheet: { t: "{n} est là pour toi", talk: "Parler à {n}" },
  more: "Autres pays : trouve une ligne d'écoute gratuite sur findahelpline.com",
  find: "Trouve une ligne d'écoute gratuite dans ton pays sur findahelpline.com", emerg: "Urgences : appelle le numéro d'urgence de ton pays.",
  privStats: "Tu peux désactiver les statistiques à tout moment dans Profil › Confidentialité et âge. Elles sont toujours désactivées pour qui n'a pas encore l'âge du consentement numérique ou n'a pas indiqué son âge, et rien n'est compté avant la question sur l'âge."
 },
 pt: {
  notif: { t: "Um momento com {n} 🌱", m1: "Um passinho hoje já conta, e {n} adora dar esse passo com você.", m2: "{n} achou um cantinho de sol perto da janela. Vem ver?", m9: "{n} arrumou o quarto. Que tal uma metinha agora?", m11: "Sem pressa: uma meta pequenininha quando você quiser, com {n}.", streak: "{k} dias seguidos com {n}! Se quiser, uma meta pequena já basta." },
  kid: { t: "Até amanhã", p: "{n} vai ter um presentinho para você." },
  ad2: { gift: "Veja um anúncio: +{n} Tanì", thanks: "+{n} Tanì. Valeu!" },
  st: { t: "Estatísticas anônimas", p: "O Tanetto conta de forma anônima só algumas ações (por exemplo, “app aberto”), nunca o que você escreve. Elas ajudam a melhorar o app.", on: "Ativadas", off: "Desativadas", kid: "Desativadas para quem ainda não tem a idade do consentimento digital ou não informou a idade." },
  soft: "Parece algo pesado de carregar. Como você está, de verdade? Se tudo parecer difícil demais, você sempre pode conversar com alguém de confiança ou ligar para um destes números:",
  sheet: { t: "{n} está aqui com você", talk: "Conversar com {n}" },
  more: "Outros países: encontre uma linha de apoio gratuita em findahelpline.com",
  find: "Encontre uma linha de apoio gratuita no seu país em findahelpline.com", emerg: "Emergências: ligue para o número de emergência do seu país.",
  privStats: "Você pode desativar as estatísticas quando quiser em Perfil › Privacidade e idade. Elas ficam sempre desativadas para quem ainda não tem a idade do consentimento digital ou não informou a idade, e nada é contado antes da pergunta sobre a idade."
 },
 ja: {
  notif: { t: "{n}からのひとこと 🌱", m1: "今日の小さな一歩も、ちゃんと大事。{n}もいっしょだよ。", m2: "{n}が窓辺にぽかぽかの場所を見つけたよ。見に来る？", m9: "{n}がお部屋を片づけたよ。小さな目標、いっしょにやってみる？", m11: "あせらなくて大丈夫。好きなときに、{n}と小さな目標ひとつ。", streak: "{k}日連続でいっしょ！よかったら、小さな目標ひとつでOK。" },
  kid: { t: "また明日ね", p: "{n}から、ちょっとしたプレゼントがあるよ。" },
  ad2: { gift: "広告を見て +{n} Tanì", thanks: "+{n} Tanì。ありがとう！" },
  st: { t: "匿名の統計", p: "Tanettoは、いくつかの操作（例：「アプリを開いた」）だけを匿名で数えます。書いた内容は数えません。アプリの改善に役立ちます。", on: "オン", off: "オフ", kid: "デジタル同意年齢に達していない方、年齢を答えていない方はオフです。" },
  soft: "それは重たい気持ちだね。ほんとうは、どんな気分？つらすぎると感じたら、信頼できる人に話したり、こちらの番号に電話したりしてね：",
  sheet: { t: "{n}がそばにいるよ", talk: "{n}と話す" },
  more: "ほかの国：無料の相談窓口は findahelpline.com で探せます",
  find: "お住まいの国の無料相談窓口は findahelpline.com で探せます", emerg: "緊急のときは、お住まいの国の緊急番号に電話してね。",
  privStats: "統計は「マイページ › プライバシーと年齢」でいつでもオフにできます。デジタル同意年齢に達していない方や年齢を答えていない方は常にオフで、年齢の質問より前には何も数えません。"
 },
 ko: {
  notif: { t: "{n}의 한마디 🌱", m1: "오늘의 작은 한 걸음도 소중해요. {n}도 함께해요.", m2: "{n}의 새 발견: 창가의 햇살 좋은 자리! 보러 올래요?", m9: "{n}의 방 정리 완료! 작은 목표 하나, 같이 해 볼까요?", m11: "서두르지 않아도 괜찮아요. 원할 때 작은 목표 하나, {n}도 함께해요.", streak: "{k}일 연속 함께예요! 원한다면 작은 목표 하나면 충분해요." },
  kid: { t: "내일 만나요", p: "내일은 {n}의 작은 선물도 있어요." },
  ad2: { gift: "광고 보고 Tanì +{n} 받기", thanks: "Tanì +{n}. 고마워요!" },
  st: { t: "익명 통계", p: "Tanetto는 몇 가지 동작(예: '앱 열기')만 익명으로 세고, 쓴 내용은 절대 세지 않아요. 앱을 더 좋게 만드는 데 쓰여요.", on: "켜짐", off: "꺼짐", kid: "디지털 동의 연령이 안 됐거나 나이를 알려 주지 않았다면 꺼져 있어요." },
  soft: "마음이 많이 무거운 것 같아요. 정말 괜찮아요? 너무 힘들게 느껴지면 믿을 수 있는 사람에게 이야기하거나 아래 번호로 전화해 보세요:",
  sheet: { t: "{n}도 곁에 있어요", talk: "{n}에게 말 걸기" },
  more: "다른 나라: findahelpline.com에서 무료 상담 전화를 찾을 수 있어요",
  find: "findahelpline.com에서 내가 사는 나라의 무료 상담 전화를 찾을 수 있어요", emerg: "긴급 상황에는 사는 나라의 긴급 전화번호로 전화하세요.",
  privStats: "통계는 언제든지 프로필 › 개인정보와 나이에서 끌 수 있어요. 디지털 동의 연령이 안 됐거나 나이를 알려 주지 않았다면 항상 꺼져 있고, 나이 질문 전에는 아무것도 세지 않아요."
 },
 zh: {
  notif: { t: "{n} 的小提醒 🌱", m1: "今天迈出一小步也算数，{n} 陪着你。", m2: "{n} 在窗边发现了一个晒太阳的好地方。要来看看吗？", m9: "{n} 把房间收拾好了。要不要一起完成一个小目标？", m11: "不用着急：想做的时候，和 {n} 一起完成一个小目标就好。", streak: "已经连续 {k} 天在一起啦！想做的话，一个小目标就够了。" },
  kid: { t: "明天见", p: "{n} 会准备一份小礼物给你。" },
  ad2: { gift: "看个广告：+{n} Tanì", thanks: "+{n} Tanì，谢谢！" },
  st: { t: "匿名统计", p: "Tanetto 只会匿名统计少数操作（例如“打开应用”），绝不统计你写的内容。这能帮助我们改进应用。", on: "已开启", off: "已关闭", kid: "对于未达到数字同意年龄或未提供年龄的用户，统计保持关闭。" },
  soft: "听起来你心里压着很多事。你现在真的还好吗？如果觉得太难受了，随时可以和信任的人聊聊，或者拨打下面的电话：",
  sheet: { t: "{n} 在这里陪着你", talk: "和 {n} 聊聊" },
  more: "其他国家和地区：可在 findahelpline.com 查找免费求助热线",
  find: "可在 findahelpline.com 查找你所在国家或地区的免费求助热线", emerg: "紧急情况：请拨打你所在地的急救电话。",
  privStats: "你可以随时在“我的 › 隐私与年龄”中关闭统计。对于未达到数字同意年龄或未提供年龄的用户，统计始终关闭；在询问年龄之前，不会统计任何内容。"
 },
 zht: {
  notif: { t: "{n} 的小提醒 🌱", m1: "今天跨出一小步也算數，{n} 陪著你。", m2: "{n} 在窗邊發現了一個曬太陽的好地方。要來看看嗎？", m9: "{n} 把房間整理好了。要不要一起完成一個小目標？", m11: "不用急：想做的時候，和 {n} 一起完成一個小目標就好。", streak: "已經連續 {k} 天在一起了！想做的話，一個小目標就夠了。" },
  kid: { t: "明天見", p: "{n} 會準備一份小禮物給你。" },
  ad2: { gift: "看段廣告：+{n} Tanì", thanks: "+{n} Tanì，謝謝！" },
  st: { t: "匿名統計", p: "Tanetto 只會匿名統計少數操作（例如「打開應用程式」），絕不統計你寫的內容。這能幫助我們改進應用程式。", on: "已開啟", off: "已關閉", kid: "對於未達數位同意年齡或未提供年齡的使用者，統計保持關閉。" },
  soft: "聽起來你心裡壓著很多事。你現在真的還好嗎？如果覺得太難受了，隨時可以和信任的人聊聊，或撥打下面的電話：",
  sheet: { t: "{n} 在這裡陪著你", talk: "和 {n} 聊聊" },
  more: "其他國家和地區：可在 findahelpline.com 查詢免費求助專線",
  find: "可在 findahelpline.com 查詢你所在國家或地區的免費求助專線", emerg: "緊急情況：請撥打你所在地的緊急電話。",
  privStats: "你可以隨時在「我的 › 隱私與年齡」中關閉統計。對於未達數位同意年齡或未提供年齡的使用者，統計一律關閉；在詢問年齡之前，不會統計任何內容。"
 },
 ru: {
  notif: { t: "{n}: минутка для себя 🌱", m1: "Даже маленький шаг сегодня важен. {n} рядом.", m2: "У окна солнечное местечко, и {n} уже там. Заглянешь?", m9: "{n}: «В комнате прибрано!» Может, одна маленькая цель?", m11: "Без спешки: одна крошечная цель, когда захочешь. {n} рядом.", streak: "Дней подряд вместе: {k}! Если хочется, хватит одной маленькой цели." },
  kid: { t: "До завтра", p: "Завтра будет маленький подарок от {n}." },
  ad2: { gift: "Посмотреть рекламу: +{n} Tanì", thanks: "+{n} Tanì. Спасибо!" },
  st: { t: "Анонимная статистика", p: "Tanetto анонимно считает лишь некоторые действия (например, «приложение открыто») и никогда — то, что ты пишешь. Это помогает улучшать приложение.", on: "Вкл.", off: "Выкл.", kid: "Выключена для тех, кто младше возраста цифрового согласия или не указал возраст." },
  soft: "Похоже, тебе сейчас непросто. Как ты на самом деле? Если станет слишком тяжело, ты всегда можешь поговорить с человеком, которому доверяешь, или позвонить по одному из этих номеров:",
  sheet: { t: "{n} рядом с тобой", talk: "Поговорить с {n}" },
  more: "Другие страны: бесплатные линии помощи есть на findahelpline.com",
  find: "Бесплатные линии помощи в твоей стране есть на findahelpline.com", emerg: "Экстренные случаи: позвони по номеру экстренной службы своей страны.",
  privStats: "Статистику можно выключить в любой момент: «Профиль» › «Приватность и возраст». Для тех, кто младше возраста цифрового согласия или не указал возраст, она всегда выключена, а до вопроса о возрасте ничего не считается."
 },
 pl: {
  notif: { t: "{n}: chwila dla siebie 🌱", m1: "Dziś liczy się nawet mały krok. {n} jest obok.", m2: "Przy oknie jest słoneczne miejsce i {n} już tam siedzi. Zajrzysz?", m9: "{n}: „W pokoju posprzątane!” Może jeden mały cel?", m11: "Bez pośpiechu: jeden malutki cel, kiedy zechcesz. {n} jest obok.", streak: "{k} dni z rzędu razem! Jeśli masz ochotę, wystarczy jeden mały cel." },
  kid: { t: "Do jutra", p: "Jutro {n} ma dla ciebie mały prezent." },
  ad2: { gift: "Obejrzyj reklamę: +{n} Tanì", thanks: "+{n} Tanì. Dziękujemy!" },
  st: { t: "Anonimowe statystyki", p: "Tanetto anonimowo liczy tylko niektóre działania (np. „otwarcie aplikacji”), nigdy to, co piszesz. Pomaga nam to ulepszać aplikację.", on: "Włączone", off: "Wyłączone", kid: "Wyłączone dla osób poniżej wieku zgody cyfrowej lub bez podanego wieku." },
  soft: "Brzmi to jak coś ciężkiego. Jak naprawdę się czujesz? Jeśli wszystko wydaje się zbyt trudne, zawsze możesz porozmawiać z kimś, komu ufasz, albo zadzwonić pod jeden z tych numerów:",
  sheet: { t: "{n} jest przy tobie", talk: "Porozmawiaj z {n}" },
  more: "Inne kraje: bezpłatne telefony wsparcia znajdziesz na findahelpline.com",
  find: "Bezpłatne telefony wsparcia w twoim kraju znajdziesz na findahelpline.com", emerg: "W nagłych wypadkach: zadzwoń pod numer alarmowy w twoim kraju.",
  privStats: "Statystyki możesz w każdej chwili wyłączyć w Profil › Prywatność i wiek. Są zawsze wyłączone dla osób poniżej wieku zgody cyfrowej lub bez podanego wieku, a przed pytaniem o wiek nic nie jest liczone."
 },
 nl: {
  notif: { t: "Even met {n} 🌱", m1: "Een klein stapje vandaag telt, en {n} zet het graag samen met je.", m2: "{n} heeft een zonnig plekje bij het raam gevonden. Kom je kijken?", m9: "{n} heeft de kamer opgeruimd. Zin in één klein doel samen?", m11: "Geen haast: één piepklein doel wanneer je wilt, samen met {n}.", streak: "{k} dagen op rij samen! Als je zin hebt, is één klein doel genoeg." },
  kid: { t: "Tot morgen", p: "{n} heeft dan een klein cadeautje voor je." },
  ad2: { gift: "Bekijk een reclamevideo: +{n} Tanì", thanks: "+{n} Tanì. Dank je!" },
  st: { t: "Anonieme statistieken", p: "Tanetto telt anoniem maar een paar acties (bijvoorbeeld 'app geopend'), nooit wat je schrijft. Zo kunnen we de app verbeteren.", on: "Aan", off: "Uit", kid: "Uit voor iedereen onder de leeftijd van digitale toestemming of zonder opgegeven leeftijd." },
  soft: "Dat klinkt als veel om te dragen. Hoe gaat het echt met je? Als alles te zwaar voelt, kun je altijd praten met iemand die je vertrouwt, of een van deze nummers bellen:",
  sheet: { t: "{n} is er voor je", talk: "Praat met {n}" },
  more: "Andere landen: vind een gratis hulplijn op findahelpline.com",
  find: "Vind een gratis hulplijn in jouw land op findahelpline.com", emerg: "Noodgeval: bel het noodnummer van je land.",
  privStats: "Je kunt de statistieken altijd uitzetten in Profiel › Privacy en leeftijd. Ze staan altijd uit voor iedereen onder de leeftijd van digitale toestemming of zonder opgegeven leeftijd, en vóór de vraag over je leeftijd wordt niets geteld."
 },
 tr: {
  notif: { t: "{n} ile bir an 🌱", m1: "Bugün küçük bir adım bile önemli. {n} hep yanında.", m2: "Pencerenin yanında güneşli bir köşe var, {n} orada. Bakmaya gelir misin?", m9: "{n} odayı topladı. Birlikte küçük bir hedefe ne dersin?", m11: "Acele yok: istediğin zaman küçücük bir hedef. {n} hep yanında.", streak: "Üst üste {k} gün birlikte! İstersen küçük bir hedef yeter." },
  kid: { t: "Yarın görüşürüz", p: "Yarın {n} sana küçük bir hediye verecek." },
  ad2: { gift: "Reklam izle: +{n} Tanì", thanks: "+{n} Tanì. Teşekkürler!" },
  st: { t: "Anonim istatistikler", p: "Tanetto yalnızca bazı işlemleri (örneğin “uygulama açıldı”) anonim olarak sayar, yazdıklarını asla saymaz. Uygulamayı geliştirmemize yardımcı olur.", on: "Açık", off: "Kapalı", kid: "Dijital rıza yaşının altındakiler veya yaşını belirtmeyenler için kapalı." },
  soft: "Bu taşıması ağır bir şey gibi görünüyor. Gerçekten nasılsın? Her şey çok zor gelirse, güvendiğin biriyle konuşabilir ya da bu numaralardan birini arayabilirsin:",
  sheet: { t: "{n} yanında", talk: "{n} ile konuş" },
  more: "Diğer ülkeler: ücretsiz yardım hatlarını findahelpline.com adresinde bulabilirsin",
  find: "Ülkendeki ücretsiz yardım hatlarını findahelpline.com adresinde bulabilirsin", emerg: "Acil durumlarda: bulunduğun ülkenin acil durum numarasını ara.",
  privStats: "İstatistikleri istediğin zaman Profil › Gizlilik ve yaş bölümünden kapatabilirsin. Dijital rıza yaşının altındakiler veya yaşını belirtmeyenler için her zaman kapalıdır ve yaş sorusundan önce hiçbir şey sayılmaz."
 }
};
/* applicato una volta sola (il file e' letto sia dall'app sia da legal_page.js / check_lang.js) */
const V26_MISS = [];
Object.keys(V26T).forEach((l) => {
  const t = T[l]; if (!t) return; t.v26 = V26T[l];
  const P = t.privDoc; if (!Array.isArray(P) || P.v26) return;
  const i = P.findIndex((x) => typeof x === "string" && x.includes("GoatCounter"));
  if (i < 0) { V26_MISS.push(l + " privStats"); return; }
  P[i] = P[i] + " " + V26T[l].privStats; P.v26 = 1;
});
if (V26_MISS.length) throw new Error("1.0.10 testi: manca " + V26_MISS.join(", "));
