/* =================== 1.0.9 (correzioni finali prima di Google Play): testi in 14 lingue ===================
   Decisioni del proprietario (12/11/2026):
   1) Titolare del trattamento = "Snugbloom Studio" + e-mail di Tanetto + solo il Paese (Italia), niente nome, indirizzo o telefono.
   2) App per TUTTE le eta' (Famiglie, pubblico misto).
   3) Statistiche: il testo breve e quello completo dicono la stessa cosa (alcune azioni, in forma anonima e aggregata).
   Qui solo testi: la stessa fonte vale per l'app, per privacy.html e per elimina-account.html (legal_page.js e acct_page.js
   leggono i file 29_t e 3*.js). Le frasi dell'informativa si cambiano pezzo per pezzo (stesse frasi in tutte le lingue). */
const V24 = {
  it: {
    pShort: "In breve: compagno, obiettivi e diario restano su questo telefono. Scrivere il tuo nome è facoltativo, la chat non invia nulla a nessuno e le uniche pubblicità sono brevi video che scegli tu di guardare. Se qualcosa non è chiaro, chiedi a un adulto di cui ti fidi.",
    pCtrl: "Titolare del trattamento: Snugbloom Studio, Italia. Contatto: {email}.",
    pStats: "Statistiche anonime: per capire se l'app è utile contiamo, in forma aggregata, alcune azioni, per esempio quante volte l'app viene aperta, se viene usata nei giorni successivi o quali parti vengono usate (come il negozio o i giochi), e riceviamo segnalazioni anonime degli errori (solo il tipo di errore, mai quello che scrivi). Usiamo GoatCounter, un servizio di statistiche che non usa cookie e non crea profili, gestito dall'Irlanda con i dati su server nell'Unione Europea (Finlandia e Germania). Per inviare il conteggio il dispositivo si collega al servizio, che riceve tecnicamente l'indirizzo IP senza conservarlo in forma identificabile. Base giuridica: legittimo interesse a migliorare l'app (art. 6, par. 1, lett. f del GDPR).",
    pCookie: ["serve solo a far funzionare l'app ed è", "serve solo a far funzionare l'app (e a non contare due volte le statistiche) ed è"],
    pKids: " Negli Stati Uniti Tanetto non raccoglie informazioni personali dai bambini sotto i 13 anni: gli unici servizi che ricevono un identificativo tecnico sono GoatCounter (l'indirizzo IP, solo per contare e senza conservarlo) e Google AdMob (pubblicità adatta ai bambini, non personalizzata e senza l'ID pubblicità). Genitori e tutori possono scrivere a {email} per qualsiasi domanda o richiesta.",
    pPaths: [["Profilo › Account e backup › Gestisci account", "Profilo › Account e dati › Gestisci account"], ["Profilo › Scelte sulla pubblicità", "Profilo › Privacy ed età › Scelte sulla pubblicità"]],
    webP: ["(Altro › Ricomincia da capo)", "(Profilo › Account e dati › Ricomincia da capo)"],
    webNo: "Non riesci ad accedere? Scrivi a {email} dall'indirizzo e-mail dell'account: elimineremo l'account e il suo backup entro 30 giorni."
  },
  en: {
    pShort: "In short: your companion, goals and journal stay on this phone. Typing your name is optional, the chat sends nothing to anyone, and the only ads are short videos that you choose to watch. If something here isn't clear, ask an adult you trust.",
    pCtrl: "Data controller: Snugbloom Studio, Italy. Contact: {email}.",
    pStats: "Anonymous statistics: to understand whether the app is useful, we count some actions in aggregate form, for example how often the app is opened, whether it's used on the following days or which parts are used (such as the shop or the games), and we receive anonymous error reports (only the type of error, never what you write). We use GoatCounter, a statistics service with no cookies and no profiles, run from Ireland with data on servers in the European Union (Finland and Germany). To send the count, the device connects to the service, which technically receives the IP address without storing it in an identifiable way. Legal basis: legitimate interest in improving the app (Article 6(1)(f) GDPR / UK GDPR).",
    pCookie: ["is used only to make the app work and is", "is used only to make the app work (and to avoid counting statistics twice) and is"],
    pKids: " In the United States, Tanetto does not collect personal information from children under 13: the only services that receive a technical identifier are GoatCounter (the IP address, only to count and not stored) and Google AdMob (child-appropriate ads that are not personalised, without the advertising ID). Parents and guardians can write to {email} with any question or request.",
    pPaths: [["Profile › Account and backup › Manage account", "Profile › Account and data › Manage account"], ["Profile › Ad choices", "Profile › Privacy and age › Ad choices"]],
    webP: ["(More › Start over)", "(Profile › Account and data › Start over)"],
    webNo: "Can't sign in? Write to {email} from the account's email address: we will delete the account and its backup within 30 days."
  },
  de: {
    pShort: "Kurz gesagt: Begleiter, Ziele und Tagebuch bleiben auf diesem Handy. Deinen Namen einzugeben ist freiwillig, der Chat sendet nichts an andere, und die einzige Werbung sind kurze Videos, die du selbst auswählst. Wenn dir etwas unklar ist, frag einen Erwachsenen, dem du vertraust.",
    pCtrl: "Verantwortlicher: Snugbloom Studio, Italien. Kontakt: {email}.",
    pStats: "Anonyme Statistik: Um zu verstehen, ob die App hilft, zählen wir zusammengefasst einige Aktionen, zum Beispiel wie oft die App geöffnet wird, ob sie an den Folgetagen genutzt wird oder welche Bereiche genutzt werden (etwa der Shop oder die Spiele), und wir erhalten anonyme Fehlerberichte (nur die Art des Fehlers, nie das, was du schreibst). Wir nutzen GoatCounter, einen Statistikdienst ohne Cookies und ohne Profile, betrieben von Irland aus, mit Daten auf Servern in der Europäischen Union (Finnland und Deutschland). Zum Senden der Zählung verbindet sich das Gerät mit dem Dienst, der dabei technisch die IP-Adresse erhält, sie aber nicht identifizierbar speichert. Rechtsgrundlage: berechtigtes Interesse an der Verbesserung der App (Art. 6 Abs. 1 lit. f DSGVO).",
    pCookie: ["dient nur dem Funktionieren der App und ist", "dient nur dem Funktionieren der App (und dazu, die Statistik nicht doppelt zu zählen) und ist"],
    pKids: " In den USA erhebt Tanetto von Kindern unter 13 Jahren keine personenbezogenen Daten: Nur zwei Dienste erhalten eine technische Kennung, GoatCounter (die IP-Adresse, nur zum Zählen und ohne sie zu speichern) und Google AdMob (kindgerechte, nicht personalisierte Werbung ohne Werbe-ID). Eltern und Erziehungsberechtigte können sich mit jeder Frage oder Bitte an {email} wenden.",
    pPaths: [["Profil › Konto und Backup › Konto verwalten", "Profil › Konto und Daten › Konto verwalten"], ["Profil › Werbe-Einstellungen", "Profil › Datenschutz und Alter › Werbe-Einstellungen"]],
    webP: ["(Mehr › Von vorne beginnen)", "(Profil › Konto und Daten › Von vorne beginnen)"],
    webNo: "Du kannst dich nicht anmelden? Schreib von der E-Mail-Adresse des Kontos an {email}: Wir löschen das Konto und sein Backup innerhalb von 30 Tagen."
  },
  es: {
    pShort: "En resumen: tu compañero, tus objetivos y tu diario se quedan en este teléfono. Escribir tu nombre es opcional, el chat no envía nada a nadie y los únicos anuncios son vídeos cortos que tú eliges ver. Si algo no está claro, pregunta a una persona adulta de confianza.",
    pCtrl: "Responsable del tratamiento: Snugbloom Studio, Italia. Contacto: {email}.",
    pStats: "Estadísticas anónimas: para saber si la app es útil contamos, de forma agregada, algunas acciones, por ejemplo cuántas veces se abre la app, si se usa en los días siguientes o qué partes se usan (como la tienda o los juegos), y recibimos informes anónimos de errores (solo el tipo de error, nunca lo que escribes). Usamos GoatCounter, un servicio de estadísticas sin cookies que no crea perfiles, gestionado desde Irlanda y con los datos en servidores de la Unión Europea (Finlandia y Alemania). Para enviar el recuento, el dispositivo se conecta al servicio, que recibe técnicamente la dirección IP sin guardarla de forma identificable. Base jurídica: interés legítimo en mejorar la app (art. 6.1.f del RGPD).",
    pCookie: ["solo sirve para que la app funcione y es", "solo sirve para que la app funcione (y para no contar dos veces las estadísticas) y es"],
    pKids: " En Estados Unidos, Tanetto no recoge información personal de menores de 13 años: los únicos servicios que reciben un identificador técnico son GoatCounter (la dirección IP, solo para contar y sin guardarla) y Google AdMob (anuncios adecuados para niños, no personalizados y sin el ID de publicidad). Madres, padres y tutores pueden escribir a {email} con cualquier pregunta o solicitud.",
    pPaths: [["Perfil › Cuenta y copia de seguridad › Gestionar cuenta", "Perfil › Cuenta y datos › Gestionar cuenta"], ["Perfil › Opciones de publicidad", "Perfil › Privacidad y edad › Opciones de publicidad"]],
    webP: ["(Más › Empezar de nuevo)", "(Perfil › Cuenta y datos › Empezar de nuevo)"],
    webNo: "¿No puedes iniciar sesión? Escribe a {email} desde la dirección de correo de la cuenta: eliminaremos la cuenta y su copia en un plazo de 30 días."
  },
  fr: {
    pShort: "En bref : ton compagnon, tes objectifs et ton journal restent sur ce téléphone. Écrire ton prénom est facultatif, le chat n'envoie rien à personne et les seules publicités sont de courtes vidéos que tu choisis de regarder. Si quelque chose n'est pas clair, demande à un adulte de confiance.",
    pCtrl: "Responsable du traitement : Snugbloom Studio, Italie. Contact : {email}.",
    pStats: "Statistiques anonymes : pour savoir si l'app est utile, nous comptons de façon agrégée certaines actions, par exemple combien de fois l'app est ouverte, si elle est utilisée les jours suivants ou quelles parties sont utilisées (comme la boutique ou les jeux), et nous recevons des rapports d'erreur anonymes (seulement le type d'erreur, jamais ce que tu écris). Nous utilisons GoatCounter, un service de statistiques sans cookies et sans profilage, géré depuis l'Irlande, avec des données sur des serveurs dans l'Union européenne (Finlande et Allemagne). Pour envoyer le comptage, l'appareil se connecte au service, qui reçoit techniquement l'adresse IP sans la conserver de façon identifiable. Base légale : intérêt légitime à améliorer l'app (art. 6, par. 1, point f du RGPD).",
    pCookie: ["sert uniquement au fonctionnement de l'app et est", "sert uniquement au fonctionnement de l'app (et à ne pas compter deux fois les statistiques) et est"],
    pKids: " Aux États-Unis, Tanetto ne collecte aucune information personnelle auprès des enfants de moins de 13 ans : les seuls services qui reçoivent un identifiant technique sont GoatCounter (l'adresse IP, uniquement pour compter et sans la conserver) et Google AdMob (des publicités adaptées aux enfants, non personnalisées et sans l'identifiant publicitaire). Les parents et tuteurs peuvent écrire à {email} pour toute question ou demande.",
    pPaths: [["Profil › Compte et sauvegarde › Gérer le compte", "Profil › Compte et données › Gérer le compte"], ["Profil › Choix publicitaires", "Profil › Confidentialité et âge › Choix publicitaires"]],
    webP: ["(Plus › Tout recommencer)", "(Profil › Compte et données › Tout recommencer)"],
    webNo: "Tu n'arrives pas à te connecter ? Écris à {email} depuis l'adresse e-mail du compte : nous supprimerons le compte et sa sauvegarde dans un délai de 30 jours."
  },
  pt: {
    pShort: "Resumindo: seu companheiro, suas metas e seu diário ficam neste celular. Escrever seu nome é opcional, o chat não envia nada a ninguém e os únicos anúncios são vídeos curtos que você escolhe assistir. Se algo não estiver claro, pergunte a um adulto de confiança.",
    pCtrl: "Controlador dos dados: Snugbloom Studio, Itália. Contato: {email}.",
    pStats: "Estatísticas anônimas: para entender se o app é útil, contamos de forma agregada algumas ações, por exemplo quantas vezes o app é aberto, se é usado nos dias seguintes ou quais partes são usadas (como a loja ou os jogos), e recebemos relatórios de erro anônimos (só o tipo de erro, nunca o que você escreve). Usamos o GoatCounter, um serviço de estatísticas sem cookies e sem perfis, operado a partir da Irlanda, com os dados em servidores na União Europeia (Finlândia e Alemanha). Para enviar a contagem, o aparelho se conecta ao serviço, que recebe tecnicamente o endereço IP sem guardá-lo de forma identificável. Base legal: legítimo interesse em melhorar o app (art. 7º, IX da LGPD e art. 6º, 1, f do GDPR europeu).",
    pCookie: ["serve só para o app funcionar e é", "serve só para o app funcionar (e para não contar as estatísticas duas vezes) e é"],
    pKids: " Nos Estados Unidos, o Tanetto não coleta informações pessoais de crianças menores de 13 anos: os únicos serviços que recebem um identificador técnico são o GoatCounter (o endereço IP, só para contar e sem guardá-lo) e o Google AdMob (anúncios adequados para crianças, não personalizados e sem o ID de publicidade). Pais, mães e responsáveis podem escrever para {email} com qualquer dúvida ou pedido.",
    pPaths: [["Perfil › Conta e backup › Gerenciar conta", "Perfil › Conta e dados › Gerenciar conta"], ["Perfil › Escolhas de publicidade", "Perfil › Privacidade e idade › Escolhas de publicidade"]],
    webP: ["(Mais › Começar de novo)", "(Perfil › Conta e dados › Começar de novo)"],
    webNo: "Não consegue entrar? Escreva para {email} usando o e-mail da conta: vamos excluir a conta e o backup dela em até 30 dias."
  },
  ja: {
    pShort: "かんたんに言うと：パートナー、目標、日記はこのスマホの中だけに残ります。名前の入力は自由で、チャットはだれにも何も送りません。広告は、あなたが見ると決めた短い動画だけです。わからないことがあれば、信頼できる大人に聞いてみてください。",
    pCtrl: "データ管理者：Snugbloom Studio（イタリア）。連絡先：{email}。",
    pStats: "匿名の統計：アプリが役に立っているかを知るため、アプリが開かれた回数、翌日以降も使われているか、どの機能が使われているか（ショップやゲームなど）といった一部の操作を集計した形で数えています。また、匿名のエラー報告（エラーの種類だけで、あなたが書いた内容は含みません）を受け取ります。Cookieもプロフィールも使わない統計サービスGoatCounterを利用しています。運営はアイルランドからで、データは欧州連合内（フィンランドとドイツ）のサーバーに保存されます。集計を送るために端末はこのサービスに接続し、サービスは技術的にIPアドレスを受け取りますが、個人を特定できる形では保存しません。法的根拠：アプリを改善するための正当な利益（GDPR/英国GDPR第6条1項（f））。",
    pCookie: ["ローカルストレージはアプリを動かすためだけに使われ、", "ローカルストレージはアプリを動かすため（と、統計を二重に数えないため）だけに使われ、"],
    pKids: "米国では、Tanettoは13歳未満の子どもから個人情報を収集しません。技術的な識別子を受け取るのは、GoatCounter（数えるためだけのIPアドレスで、保存されません）とGoogle AdMob（子ども向けでパーソナライズされない広告で、広告IDは使いません）だけです。保護者の方は、ご質問やご依頼があれば{email}までご連絡ください。",
    pPaths: [["マイページ › アカウントとバックアップ › アカウントの管理", "マイページ › アカウントとデータ › アカウントの管理"], ["マイページ › 広告の設定", "マイページ › プライバシーと年齢 › 広告の設定"]],
    webP: ["（その他 › 最初からやり直す）", "（マイページ › アカウントとデータ › 最初からやり直す）"],
    webNo: "ログインできない場合は、アカウントのメールアドレスから {email} までご連絡ください。30日以内にアカウントとバックアップを削除します。"
  },
  ko: {
    pShort: "간단히 말하면: 친구, 목표, 일기는 이 휴대폰에만 남아요. 이름 입력은 선택이고, 채팅은 누구에게도 아무것도 보내지 않으며, 광고는 직접 고른 짧은 영상뿐이에요. 잘 모르겠는 부분이 있으면 믿을 수 있는 어른에게 물어보세요.",
    pCtrl: "개인정보 처리자: Snugbloom Studio(이탈리아). 연락처: {email}.",
    pStats: "익명 통계: 앱이 유용한지 알기 위해 일부 동작의 횟수를 집계해요. 예를 들어 앱이 얼마나 자주 열리는지, 다음 날에도 사용되는지, 어떤 기능(상점이나 게임 등)이 쓰이는지 등이에요. 익명 오류 보고도 받아요(오류 종류만 받고, 사용자가 쓴 내용은 절대 받지 않아요). 쿠키와 프로필을 사용하지 않는 통계 서비스 GoatCounter를 이용해요. 이 서비스는 아일랜드에서 운영되며 데이터는 유럽연합(핀란드와 독일)의 서버에 저장돼요. 집계를 보내기 위해 기기가 이 서비스에 연결되며, 서비스는 기술적으로 IP 주소를 받지만 식별 가능한 방식으로 저장하지 않아요. 법적 근거: 앱 개선에 대한 정당한 이익(GDPR / UK GDPR 제6조 제1항 (f)호).",
    pCookie: ["로컬 스토리지는 앱 작동을 위해서만 쓰이며", "로컬 스토리지는 앱 작동을 위해서만(그리고 통계를 두 번 세지 않기 위해서만) 쓰이며"],
    pKids: " 미국에서 Tanetto는 만 13세 미만 어린이의 개인정보를 수집하지 않아요. 기술적인 식별 정보를 받는 서비스는 GoatCounter(집계용 IP 주소만, 저장하지 않음)와 Google AdMob(어린이에게 맞는 비맞춤형 광고, 광고 ID 없이)뿐이에요. 부모님과 보호자는 궁금한 점이나 요청이 있으면 {email}로 연락해 주세요.",
    pPaths: [["프로필 › 계정 및 백업 › 계정 관리", "프로필 › 계정 및 데이터 › 계정 관리"], ["프로필 › 광고 선택", "프로필 › 개인정보와 나이 › 광고 선택"]],
    webP: ["(더 보기 › 처음부터 다시)", "(프로필 › 계정 및 데이터 › 처음부터 다시)"],
    webNo: "로그인할 수 없나요? 계정의 이메일 주소로 {email}에 연락해 주세요. 30일 이내에 계정과 백업을 삭제해 드려요."
  },
  zh: {
    pShort: "简单来说：你的小伙伴、目标和日记都留在这台手机上。填写名字是可选的，聊天不会向任何人发送任何内容，唯一的广告是你自己选择观看的短视频。如果有不明白的地方，可以问问你信任的大人。",
    pCtrl: "数据控制者：Snugbloom Studio（意大利）。联系方式：{email}。",
    pStats: "匿名统计：为了了解应用是否有用，我们会以汇总形式统计部分操作，例如应用被打开的频率、之后几天是否还在使用，或使用了哪些功能（比如商店或小游戏），我们还会收到匿名的错误报告（只有错误类型，绝不包含你写的内容）。我们使用 GoatCounter，这是一项不使用 Cookie、不建立用户画像的统计服务，由爱尔兰运营，数据存放在欧盟境内（芬兰和德国）的服务器上。为了发送统计数据，设备会连接到该服务，该服务在技术上会接收到 IP 地址，但不会以可识别身份的方式存储。法律依据：改进应用的正当利益（GDPR / 英国 GDPR 第 6(1)(f) 条）。",
    pCookie: ["本地存储仅用于让应用正常运行，", "本地存储仅用于让应用正常运行（以及避免重复统计），"],
    pKids: "在美国，Tanetto 不会收集 13 岁以下儿童的个人信息：只有 GoatCounter（仅为计数而接收的 IP 地址，不会保存）和 Google AdMob（适合儿童、非个性化、不使用广告 ID 的广告）会收到技术标识。家长和监护人如有任何问题或请求，可以写信到 {email}。",
    pPaths: [["我的 › 账号与备份 › 管理账号", "我的 › 账号与数据 › 管理账号"], ["我的 › 广告选择", "我的 › 隐私与年龄 › 广告选择"]],
    webP: ["（更多 › 重新开始）", "（我的 › 账号与数据 › 重新开始）"],
    webNo: "无法登录？请用该账号的邮箱写信到 {email}：我们会在 30 天内删除账号及其备份。"
  },
  zht: {
    pShort: "簡單來說：你的小夥伴、目標和日記都留在這支手機上。填寫名字是選擇性的，聊天不會傳送任何內容給任何人，唯一的廣告是你自己選擇觀看的短片。如果有不明白的地方，可以問問你信任的大人。",
    pCtrl: "資料控管者：Snugbloom Studio（義大利）。聯絡方式：{email}。",
    pStats: "匿名統計：為了了解這個 App 是否有用，我們會以彙總形式統計部分操作，例如 App 被開啟的頻率、之後幾天是否繼續使用，或使用了哪些功能（像是商店或小遊戲），我們也會收到匿名的錯誤報告（只有錯誤類型，絕不包含你寫的內容）。我們使用 GoatCounter，這是一個不使用 Cookie、不建立個人檔案的統計服務，由愛爾蘭營運，資料存放在歐盟境內（芬蘭和德國）的伺服器上。為了傳送統計資料，裝置會連線到該服務，服務在技術上會接收到 IP 位址，但不會以可識別個人的方式儲存。法律依據：改善 App 的正當利益（GDPR / 英國 GDPR 第 6 條第 1 項第 f 款）。",
    pCookie: ["本機儲存空間僅用於讓 App 正常運作，", "本機儲存空間僅用於讓 App 正常運作（以及避免重複統計），"],
    pKids: "在美國，Tanetto 不會蒐集 13 歲以下兒童的個人資訊：只有 GoatCounter（僅為計數而接收的 IP 位址，不會保存）和 Google AdMob（適合兒童、非個人化、不使用廣告 ID 的廣告）會收到技術識別碼。家長和監護人如有任何問題或請求，可以寫信到 {email}。",
    pPaths: [["我的 › 帳號與備份 › 管理帳號", "我的 › 帳號與資料 › 管理帳號"], ["我的 › 廣告選擇", "我的 › 隱私與年齡 › 廣告選擇"]],
    webP: ["（更多 › 重新開始）", "（我的 › 帳號與資料 › 重新開始）"],
    webNo: "無法登入？請用該帳號的電子郵件寫信到 {email}：我們會在 30 天內刪除帳號及其備份。"
  },
  ru: {
    pShort: "Коротко: питомец, цели и дневник остаются на этом телефоне. Писать своё имя не обязательно, чат никому ничего не отправляет, а реклама показывается только в коротких видео и только по твоему выбору. Если что-то непонятно, спроси взрослого, которому доверяешь.",
    pCtrl: "Ответственный за обработку данных: Snugbloom Studio, Италия. Контакт: {email}.",
    pStats: "Анонимная статистика: чтобы понять, полезно ли приложение, мы подсчитываем некоторые действия в обобщённом виде, например как часто открывается приложение, используется ли оно в последующие дни или какие разделы открывают (например, магазин или игры), а также получаем анонимные отчёты об ошибках (только вид ошибки, никогда не то, что ты пишешь). Мы используем GoatCounter, сервис статистики без cookie и без профилей; он работает из Ирландии, а данные хранятся на серверах в Европейском союзе (Финляндия и Германия). Чтобы передать подсчёт, устройство подключается к сервису, который технически получает IP-адрес, но не хранит его в виде, позволяющем установить личность. Правовое основание: законный интерес в улучшении приложения (статья 6(1)(f) GDPR / UK GDPR).",
    pCookie: ["используется только для работы приложения и является", "используется только для работы приложения (и чтобы не считать статистику дважды) и является"],
    pKids: " В США Tanetto не собирает личную информацию детей младше 13 лет: технический идентификатор получают только GoatCounter (IP-адрес, только для подсчёта и без хранения) и Google AdMob (подходящая детям неперсонализированная реклама без рекламного идентификатора). Родители и опекуны могут написать на {email} с любым вопросом или просьбой.",
    pPaths: [["«Профиль» › «Аккаунт и резервная копия» › «Управление аккаунтом»", "«Профиль» › «Аккаунт и данные» › «Управление аккаунтом»"], ["«Профиль» › «Настройки рекламы»", "«Профиль» › «Приватность и возраст» › «Настройки рекламы»"], ["Tanì: это игровые монетки, а не настоящие деньги;", "Tanì нельзя обменять на деньги: это просто игровые монетки."]],
    webP: ["(«Ещё» › «Начать заново»)", "(«Профиль» › «Аккаунт и данные» › «Начать заново»)"],
    webNo: "Не получается войти? Напиши на {email} с адреса почты этого аккаунта: мы удалим аккаунт и его копию в течение 30 дней."
  },
  pl: {
    pShort: "W skrócie: twój towarzysz, cele i dziennik zostają na tym telefonie. Wpisanie imienia jest dobrowolne, czat nikomu niczego nie wysyła, a reklamy to tylko krótkie filmiki, które oglądasz wtedy, gdy chcesz. Jeśli coś jest niejasne, zapytaj dorosłą osobę, której ufasz.",
    pCtrl: "Administrator danych: Snugbloom Studio, Włochy. Kontakt: {email}.",
    pStats: "Anonimowe statystyki: aby sprawdzić, czy aplikacja jest przydatna, liczymy niektóre działania w formie zbiorczej, na przykład jak często aplikacja jest otwierana, czy jest używana w kolejnych dniach albo z których części się korzysta (np. ze sklepu lub gier), a także otrzymujemy anonimowe raporty o błędach (tylko rodzaj błędu, nigdy to, co piszesz). Korzystamy z GoatCounter, usługi statystycznej bez plików cookie i bez profili, prowadzonej z Irlandii, z danymi na serwerach w Unii Europejskiej (Finlandia i Niemcy). Aby przesłać licznik, urządzenie łączy się z usługą, która technicznie otrzymuje adres IP, ale nie przechowuje go w sposób umożliwiający identyfikację. Podstawa prawna: prawnie uzasadniony interes polegający na ulepszaniu aplikacji (art. 6 ust. 1 lit. f RODO).",
    pCookie: ["służy wyłącznie do działania aplikacji i jest", "służy wyłącznie do działania aplikacji (i do tego, by nie liczyć statystyk dwa razy) i jest"],
    pKids: " W Stanach Zjednoczonych Tanetto nie zbiera danych osobowych dzieci poniżej 13 lat: techniczny identyfikator otrzymują tylko GoatCounter (adres IP, wyłącznie do liczenia i bez przechowywania) oraz Google AdMob (reklamy odpowiednie dla dzieci, niespersonalizowane i bez identyfikatora reklamowego). Rodzice i opiekunowie mogą pisać na adres {email} z każdym pytaniem lub prośbą.",
    pPaths: [["Profil › Konto i kopia zapasowa › Zarządzaj kontem", "Profil › Konto i dane › Zarządzaj kontem"], ["Profil › Ustawienia reklam", "Profil › Prywatność i wiek › Ustawienia reklam"]],
    webP: ["(Więcej › Zacznij od nowa)", "(Profil › Konto i dane › Zacznij od nowa)"],
    webNo: "Nie możesz się zalogować? Napisz na {email} z adresu e-mail konta: usuniemy konto i jego kopię w ciągu 30 dni."
  },
  nl: {
    pShort: "In het kort: je maatje, doelen en dagboek blijven op deze telefoon. Je naam invullen is niet verplicht, de chat verstuurt niets naar iemand en de enige advertenties zijn korte video's die jij zelf kiest om te bekijken. Is iets niet duidelijk? Vraag het aan een volwassene die je vertrouwt.",
    pCtrl: "Verwerkingsverantwoordelijke: Snugbloom Studio, Italië. Contact: {email}.",
    pStats: "Anonieme statistieken: om te begrijpen of de app nuttig is, tellen we sommige acties in geaggregeerde vorm, bijvoorbeeld hoe vaak de app wordt geopend, of hij de dagen erna wordt gebruikt of welke onderdelen worden gebruikt (zoals de winkel of de spelletjes), en we ontvangen anonieme foutmeldingen (alleen het soort fout, nooit wat jij schrijft). We gebruiken GoatCounter, een statistiekdienst zonder cookies en zonder profielen, beheerd vanuit Ierland, met gegevens op servers in de Europese Unie (Finland en Duitsland). Om de telling te versturen maakt het apparaat verbinding met de dienst, die technisch gezien het IP-adres ontvangt zonder het op een herleidbare manier op te slaan. Rechtsgrond: gerechtvaardigd belang bij het verbeteren van de app (artikel 6, lid 1, onder f AVG).",
    pCookie: ["wordt alleen gebruikt om de app te laten werken en is", "wordt alleen gebruikt om de app te laten werken (en om statistieken niet dubbel te tellen) en is"],
    pKids: " In de Verenigde Staten verzamelt Tanetto geen persoonsgegevens van kinderen onder de 13: alleen GoatCounter (het IP-adres, alleen om te tellen en zonder het te bewaren) en Google AdMob (niet-gepersonaliseerde advertenties die geschikt zijn voor kinderen, zonder advertentie-ID) ontvangen een technische identificatie. Ouders en voogden kunnen met elke vraag of elk verzoek schrijven naar {email}.",
    pPaths: [["Profiel › Account en back-up › Account beheren", "Profiel › Account en gegevens › Account beheren"], ["Profiel › Advertentiekeuzes", "Profiel › Privacy en leeftijd › Advertentiekeuzes"]],
    webP: ["(Meer › Opnieuw beginnen)", "(Profiel › Account en gegevens › Opnieuw beginnen)"],
    webNo: "Lukt inloggen niet? Schrijf vanaf het e-mailadres van het account naar {email}: we verwijderen het account en de back-up binnen 30 dagen."
  },
  tr: {
    pShort: "Kısacası: arkadaşın, hedeflerin ve günlüğün bu telefonda kalır. Adını yazmak isteğe bağlıdır, sohbet kimseye hiçbir şey göndermez ve tek reklam, izlemeyi senin seçtiğin kısa videolardır. Anlamadığın bir şey olursa güvendiğin bir yetişkine sor.",
    pCtrl: "Veri sorumlusu: Snugbloom Studio, İtalya. İletişim: {email}.",
    pStats: "Anonim istatistikler: uygulamanın işe yarayıp yaramadığını anlamak için bazı işlemleri toplu olarak sayarız; örneğin uygulamanın ne sıklıkla açıldığını, sonraki günlerde kullanılıp kullanılmadığını ya da hangi bölümlerin (mağaza veya oyunlar gibi) kullanıldığını. Ayrıca anonim hata raporları alırız (yalnızca hatanın türü, yazdıkların asla). Çerez ve profil kullanmayan bir istatistik hizmeti olan GoatCounter'ı kullanırız; hizmet İrlanda'dan yönetilir ve veriler Avrupa Birliği'ndeki (Finlandiya ve Almanya) sunucularda tutulur. Sayımı göndermek için cihaz bu hizmete bağlanır; hizmet teknik olarak IP adresini alır ancak onu kimliği belirlenebilir şekilde saklamaz. Hukuki dayanak: uygulamayı geliştirmeye yönelik meşru menfaat (GDPR / UK GDPR madde 6(1)(f)).",
    pCookie: ["yalnızca uygulamanın çalışması için kullanılır ve", "yalnızca uygulamanın çalışması (ve istatistiklerin iki kez sayılmaması) için kullanılır ve"],
    pKids: " ABD'de Tanetto, 13 yaşından küçük çocuklardan kişisel bilgi toplamaz: teknik bir tanımlayıcı alan hizmetler yalnızca GoatCounter (yalnızca saymak için IP adresi, saklanmaz) ve Google AdMob'dur (çocuklara uygun, kişiselleştirilmemiş, reklam kimliği kullanılmayan reklamlar). Ebeveynler ve vasiler her türlü soru veya talep için {email} adresine yazabilir.",
    pPaths: [["Profil › Hesap ve yedek › Hesabı yönet", "Profil › Hesap ve veriler › Hesabı yönet"], ["Profil › Reklam tercihleri", "Profil › Gizlilik ve yaş › Reklam tercihleri"]],
    webP: ["(Diğer › Baştan başla)", "(Profil › Hesap ve veriler › Baştan başla)"],
    webNo: "Giriş yapamıyor musun? Hesabın e-posta adresinden {email} adresine yaz: hesabı ve yedeğini 30 gün içinde sileriz."
  }
};
/* applicato una volta sola (il file e' letto sia dall'app sia da legal_page.js / acct_page.js): ogni pezzo deve esserci */
const V24_MISS = [];
Object.keys(V24).forEach((l) => {
  const P = PRIV_V21[l], v = V24[l], t = T[l]; if (!P || P.v24) return;
  const sub = (i, a, b) => { if (P[i].includes(a)) P[i] = P[i].split(a).join(b); else V24_MISS.push(`${l} ${i} ${a}`); };
  P[0] = v.pCtrl; P[6] = v.pStats; sub(8, v.pCookie[0], v.pCookie[1]); P[13] = P[13] + v.pKids;
  v.pPaths.forEach(([a, b]) => { let hit = false; for (let i = 0; i < P.length; i++) if (P[i].includes(a)) { P[i] = P[i].split(a).join(b); hit = true; } if (!hit) V24_MISS.push(`${l} path ${a}`); });
  P.unshift(v.pShort); P.v24 = 1; t.privDoc = P;
  /* pagina per eliminare l'account: il percorso giusto nell'app e chi non riesce ad accedere */
  if (t.acct && t.acct.webP.includes(v.webP[0])) t.acct.webP = t.acct.webP.replace(v.webP[0], v.webP[1]); else V24_MISS.push(`${l} webP`);
  if (t.acct) t.acct.webNo = v.webNo;
});
