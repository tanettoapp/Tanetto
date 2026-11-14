/* =================== 1.0.10: testi nuovi (14 lingue), letti dall'app e da legal_page.js / check_lang.js ===================
   Dall'audit indipendente della 1.0.9 (AUDIT_110.md):
   - notif: titolo e 4 frasi dei promemoria senza pressione ("ti aspetta", "guarda la porta", "torna il sorriso", "la giornata
     non e' finita") per un'app per tutte le eta' (M-16, E-05); serie: "se ti va" (ai minori niente frase sulla serie).
   - kid: "Torna domani" ai bambini/ragazzi senza numeri ne' serie (G2-07).
   - st: interruttore "Statistiche anonime" in Profilo › Privacy ed eta' (M-11, I-04, I-11).
   - soft/sheet/more: secondo livello gentile della chat e scheda di aiuto dopo diario, "Lascia andare" e capsula (M-01b, G3-03).
   - privStats: frase in piu' nell'informativa (paragrafo delle statistiche). */
const V26T = {
 it: {
  notif: { t: "Un momento con {n} 🌱", m1: "Un piccolo passo oggi conta, e {n} è felice di farlo con te.", m2: "{n} ha trovato un angolo di sole vicino alla finestra. Vieni a vedere?", m9: "{n} ha messo in ordine la stanza. Ti va un piccolo obiettivo insieme?", m11: "Nessuna fretta: un obiettivo piccolo piccolo quando vuoi, insieme a {n}.", streak: "{k} giorni di fila insieme! Se ti va, basta un obiettivo piccolo." },
  kid: { t: "A domani", p: "{n} avrà un piccolo regalo per te." },
  st: { t: "Statistiche anonime", p: "Tanetto conta in forma anonima solo alcune azioni (per esempio «app aperta»), mai quello che scrivi. Servono a migliorare l'app.", on: "Attive", off: "Spente", kid: "Spente per chi non ha ancora l'età del consenso digitale o non ha detto l'età." },
  soft: "Sembra una cosa pesante da portare. Come stai, davvero? Se ti sembra tutto troppo difficile, puoi sempre parlarne con una persona di cui ti fidi, oppure chiamare uno di questi numeri:",
  sheet: { t: "{n} è qui con te", talk: "Parla con {n}" },
  more: "Altri Paesi: trova una linea di aiuto gratuita su findahelpline.com",
  terms: { t0: "Lavoriamo perché Tanetto funzioni bene e migliori nel tempo; questo non limita i diritti che la legge ti riconosce come consumatore.", minor: "Se sei minorenne, chiedi a un genitore o a chi si occupa di te prima di acquistare qualcosa.", digital: "I contenuti digitali a pagamento (Tanetto Plus e Tanì) sono disponibili subito dopo l'acquisto; i rimborsi seguono le regole di Google Play e i diritti previsti dalla legge.", law: "Queste condizioni sono regolate dalla legge italiana; se sei un consumatore, mantieni anche le tutele della legge del Paese in cui vivi." },
  lic: "Licenze open source",
  brDid: "L'ho già fatto", nextTr: (k, d) => `Prossimo trofeo: ${k} giorni di fila (${d === 1 ? "ne manca 1" : "ne mancano " + d})`, ver: "Versione",
  wb: { xmas: "L'albero di Natale è pronto: aggiungi una decorazione quando vuoi.", season: (s, n) => `${s} finisce tra ${n === 1 ? "1 giorno" : n + " giorni"}.`, light: "Ripartiamo piano: oggi solo 1 obiettivo", lightDone: "Oggi un solo obiettivo: {g}. Da domani tutto come prima.", rem: "Attiva un promemoria gentile", backP2: "{n} è contento che tu sia qui. Oggi basta anche un passo piccolissimo." },
  where: "Per disdire: Google Play › Abbonamenti.",
  faq: { t: "Risposte veloci", qa: [["Come disdico la prova gratuita o Tanetto Plus?", "In Google Play › Abbonamenti › Tanetto Plus › Annulla abbonamento. Se disdici durante i 7 giorni gratis non paghi niente. Tanetto non può disdire al posto tuo."], ["Ho cambiato telefono: come ritrovo il mio compagno?", "Con un account gratuito (Profilo › Account e dati) Tanetto tiene un backup online: accedi sul telefono nuovo e scegli di ripristinarlo. Senza account i progressi restano su questo telefono; puoi anche salvarne una copia in un file."], ["I promemoria non arrivano: cosa posso fare?", "Controlla che le notifiche di Tanetto siano attive nelle impostazioni del telefono e che il risparmio energetico non blocchi Tanetto (Impostazioni › App › Tanetto › Batteria › Senza limitazioni)."], ["Cosa sono i Tanì?", "Le monete di Tanetto: le guadagni con gli obiettivi, i regali e i giochi e le spendi nel negozio. Non sono soldi veri. I pacchetti di Tanì costano soldi veri e si pagano solo con Google Play."], ["Chi può leggere il mio diario?", "Solo tu. Il diario resta su questo telefono e, se hai un account, nel tuo backup privato. La chat con il compagno non manda niente a nessuno."]] },
  full: "La memoria del telefono è piena: libera un po' di spazio, così Tanetto può salvare i tuoi progressi.", bk: { cmp: "Backup: livello {a} · {b} Tanì — questo telefono: livello {c} · {d} Tanì", less: "Il backup ha meno progressi di questo telefono." },
  find: "Trova una linea di aiuto gratuita nel tuo Paese su findahelpline.com", emerg: "Emergenze: chiama il numero di emergenza del tuo Paese.",
  privStats: "Puoi spegnere le statistiche quando vuoi in Profilo › Privacy ed età. Sono sempre spente per chi non ha ancora l'età del consenso digitale o non ha detto l'età, e prima della domanda sull'età non si conta niente."
 },
 en: {
  notif: { t: "A moment with {n} 🌱", m1: "A small step today counts, and {n} is happy to take it with you.", m2: "{n} found a sunny spot by the window. Come and see?", m9: "{n} tidied up the room. Fancy one small goal together?", m11: "No rush: one tiny goal whenever you like, together with {n}.", streak: "{k} days in a row together! If you feel like it, one small goal is enough." },
  kid: { t: "See you tomorrow", p: "{n} will have a small gift for you." },
  st: { t: "Anonymous statistics", p: "Tanetto anonymously counts only a few actions (for example “app opened”), never what you write. They help us improve the app.", on: "On", off: "Off", kid: "Off for anyone under the age of digital consent or who hasn't given their age." },
  soft: "That sounds like a lot to carry. How are you, really? If things ever feel too hard, you can always talk to someone you trust, or call one of these numbers:",
  sheet: { t: "{n} is here with you", talk: "Talk to {n}" },
  more: "Other countries: find a free helpline at findahelpline.com",
  terms: { t0: "We work to keep Tanetto running well and to improve it over time; this does not limit your legal rights as a consumer.", minor: "If you are a minor, ask a parent or guardian before buying anything.", digital: "Paid digital content (Tanetto Plus and Tanì) is available as soon as you buy it; refunds follow Google Play's policies and your legal rights.", law: "These terms are governed by Italian law; if you are a consumer, you also keep the protections of the law of the country where you live." },
  lic: "Open-source licences",
  brDid: "I already did it", nextTr: (k, d) => `Next trophy: ${k} days in a row (${d === 1 ? "1 to go" : d + " to go"})`, ver: "Version",
  wb: { xmas: "The Christmas tree is up: add a decoration whenever you like.", season: (s, n) => `${s} ends in ${n === 1 ? "1 day" : n + " days"}.`, light: "Start gently: just 1 goal today", lightDone: "Today just one goal: {g}. From tomorrow, everything as usual.", rem: "Turn on a gentle reminder", backP2: "{n} is glad you're here. Today even a tiny step is enough." },
  where: "To cancel: Google Play › Subscriptions.",
  faq: { t: "Quick answers", qa: [["How do I cancel the free trial or Tanetto Plus?", "In Google Play › Subscriptions › Tanetto Plus › Cancel subscription. If you cancel during the 7 free days, you pay nothing. Tanetto can't cancel it for you."], ["I changed phone: how do I get my companion back?", "With a free account (Profile › Account and data), Tanetto keeps an online backup: sign in on the new phone and choose to restore it. Without an account, progress stays on this phone; you can also save a copy as a file."], ["Reminders don't arrive: what can I do?", "Check that notifications for Tanetto are on in your phone's settings and that battery saving isn't stopping Tanetto (Settings › Apps › Tanetto › Battery › Unrestricted)."], ["What are Tanì?", "Tanetto's coins: you earn them with goals, gifts and games and spend them in the shop. They aren't real money. Tanì packs cost real money and are paid only through Google Play."], ["Who can read my journal?", "Only you. The journal stays on this phone and, if you have an account, in your private backup. The chat with your companion sends nothing to anyone."]] },
  full: "Your phone's storage is full: free up some space so Tanetto can save your progress.", bk: { cmp: "Backup: level {a} · {b} Tanì — this phone: level {c} · {d} Tanì", less: "The backup has less progress than this phone." },
  find: "Find a free helpline in your country at findahelpline.com", emerg: "Emergencies: call your local emergency number.",
  privStats: "You can turn the statistics off at any time in Profile › Privacy and age. They are always off for anyone under the age of digital consent or who hasn't given their age, and nothing is counted before the age question."
 },
 de: {
  notif: { t: "Ein Moment mit {n} 🌱", m1: "Ein kleiner Schritt heute zählt, und {n} macht ihn gern mit dir.", m2: "{n} hat ein sonniges Plätzchen am Fenster gefunden. Kommst du schauen?", m9: "{n} hat das Zimmer aufgeräumt. Lust auf ein kleines Ziel zusammen?", m11: "Keine Eile: ein winziges Ziel, wann immer du magst, zusammen mit {n}.", streak: "{k} Tage in Folge zusammen! Wenn du magst, reicht ein kleines Ziel." },
  kid: { t: "Bis morgen", p: "{n} hat dann ein kleines Geschenk für dich." },
  st: { t: "Anonyme Statistik", p: "Tanetto zählt anonym nur einige Aktionen (zum Beispiel „App geöffnet“), nie, was du schreibst. Das hilft uns, die App zu verbessern.", on: "An", off: "Aus", kid: "Aus für alle unter dem Alter der digitalen Einwilligung oder ohne Altersangabe." },
  soft: "Das klingt nach ganz schön viel. Wie geht es dir wirklich? Wenn dir alles zu schwer wird, kannst du immer mit einem Menschen reden, dem du vertraust, oder eine dieser Nummern anrufen:",
  sheet: { t: "{n} ist für dich da", talk: "Mit {n} reden" },
  more: "Andere Länder: Kostenlose Hilfe-Telefone findest du auf findahelpline.com",
  terms: { t0: "Wir arbeiten daran, dass Tanetto gut funktioniert und mit der Zeit besser wird; deine gesetzlichen Rechte als Verbraucher werden dadurch nicht eingeschränkt.", minor: "Wenn du minderjährig bist, frag vor einem Kauf deine Eltern oder eine erziehungsberechtigte Person.", digital: "Kostenpflichtige digitale Inhalte (Tanetto Plus und Tanì) stehen sofort nach dem Kauf bereit; Erstattungen richten sich nach den Regeln von Google Play und deinen gesetzlichen Rechten.", law: "Für diese Bedingungen gilt italienisches Recht; als Verbraucher behältst du auch den Schutz des Rechts des Landes, in dem du lebst." },
  lic: "Open-Source-Lizenzen",
  brDid: "Hab ich schon gemacht", nextTr: (k, d) => `Nächste Trophäe: ${k} Tage in Folge (noch ${d})`, ver: "Version",
  wb: { xmas: "Der Weihnachtsbaum steht: Häng einen Schmuck auf, wann du magst.", season: (s, n) => `${s} endet in ${n === 1 ? "1 Tag" : n + " Tagen"}.`, light: "Sanft starten: heute nur 1 Ziel", lightDone: "Heute nur ein Ziel: {g}. Ab morgen wieder wie gewohnt.", rem: "Sanfte Erinnerung einschalten", backP2: "{n} freut sich, dass du da bist. Heute reicht auch ein ganz kleiner Schritt." },
  where: "Kündigen: Google Play › Abos.",
  faq: { t: "Schnelle Antworten", qa: [["Wie kündige ich den Gratis-Test oder Tanetto Plus?", "In Google Play › Abos › Tanetto Plus › Abo kündigen. Wenn du während der 7 Gratis-Tage kündigst, zahlst du nichts. Tanetto kann nicht für dich kündigen."], ["Ich habe ein neues Handy: Wie bekomme ich meinen Begleiter zurück?", "Mit einem kostenlosen Konto (Profil › Konto und Daten) speichert Tanetto ein Online-Backup: Melde dich auf dem neuen Handy an und stelle es wieder her. Ohne Konto bleiben die Fortschritte auf diesem Handy; du kannst auch eine Kopie als Datei speichern."], ["Die Erinnerungen kommen nicht an: Was kann ich tun?", "Prüfe, ob die Benachrichtigungen für Tanetto in den Einstellungen des Handys an sind und ob das Energiesparen Tanetto nicht stoppt (Einstellungen › Apps › Tanetto › Akku › Nicht eingeschränkt)."], ["Was sind Tanì?", "Die Münzen von Tanetto: Du verdienst sie mit Zielen, Geschenken und Spielen und gibst sie im Laden aus. Sie sind kein echtes Geld. Tanì-Pakete kosten echtes Geld und werden nur über Google Play bezahlt."], ["Wer kann mein Tagebuch lesen?", "Nur du. Das Tagebuch bleibt auf diesem Handy und, wenn du ein Konto hast, in deinem privaten Backup. Der Chat mit deinem Begleiter schickt nichts an irgendwen."]] },
  full: "Der Speicher deines Handys ist voll: Mach etwas Platz frei, damit Tanetto deine Fortschritte speichern kann.", bk: { cmp: "Backup: Level {a} · {b} Tanì — dieses Handy: Level {c} · {d} Tanì", less: "Das Backup hat weniger Fortschritt als dieses Handy." },
  find: "Kostenlose Hilfe-Telefone in deinem Land findest du auf findahelpline.com", emerg: "Notfall: Ruf die Notrufnummer deines Landes an.",
  privStats: "Du kannst die Statistik jederzeit unter Profil › Datenschutz und Alter ausschalten. Sie ist immer aus für alle unter dem Alter der digitalen Einwilligung oder ohne Altersangabe, und vor der Frage nach dem Alter wird nichts gezählt."
 },
 es: {
  notif: { t: "Un momento con {n} 🌱", m1: "Un pasito hoy cuenta, y {n} se alegra de darlo contigo.", m2: "{n} ha encontrado un rincón soleado junto a la ventana. ¿Vienes a verlo?", m9: "{n} ha ordenado la habitación. ¿Hacemos un objetivo pequeño?", m11: "Sin prisa: un objetivo pequeñito cuando quieras, con {n}.", streak: "¡{k} días seguidos con {n}! Si te apetece, basta con un objetivo pequeño." },
  kid: { t: "Hasta mañana", p: "{n} tendrá un pequeño regalo para ti." },
  st: { t: "Estadísticas anónimas", p: "Tanetto cuenta de forma anónima solo algunas acciones (por ejemplo, «app abierta»), nunca lo que escribes. Sirven para mejorar la app.", on: "Activadas", off: "Desactivadas", kid: "Desactivadas para quien aún no tiene la edad del consentimiento digital o no ha dicho su edad." },
  soft: "Parece algo pesado de llevar. ¿Cómo estás de verdad? Si todo te parece demasiado difícil, siempre puedes hablar con alguien de confianza o llamar a uno de estos números:",
  sheet: { t: "{n} está aquí contigo", talk: "Hablar con {n}" },
  more: "Otros países: encuentra una línea de ayuda gratuita en findahelpline.com",
  terms: { t0: "Trabajamos para que Tanetto funcione bien y mejore con el tiempo; esto no limita tus derechos legales como consumidor.", minor: "Si eres menor de edad, pide permiso a tu madre, padre o tutor antes de comprar algo.", digital: "El contenido digital de pago (Tanetto Plus y Tanì) está disponible en cuanto lo compras; los reembolsos siguen las normas de Google Play y tus derechos legales.", law: "Estas condiciones se rigen por la ley italiana; si eres consumidor, también conservas la protección de la ley del país donde vives." },
  lic: "Licencias de código abierto",
  brDid: "Ya lo he hecho", nextTr: (k, d) => `Próximo trofeo: ${k} días seguidos (${d === 1 ? "falta 1" : "faltan " + d})`, ver: "Versión",
  wb: { xmas: "El árbol de Navidad ya está: añade un adorno cuando quieras.", season: (s, n) => `${s} termina en ${n === 1 ? "1 día" : n + " días"}.`, light: "Empezar con calma: hoy solo 1 objetivo", lightDone: "Hoy solo un objetivo: {g}. Desde mañana, todo como siempre.", rem: "Activar un recordatorio amable", backP2: "{n} se alegra de que estés aquí. Hoy basta con un pasito chiquito." },
  where: "Para cancelar: Google Play › Suscripciones.",
  faq: { t: "Respuestas rápidas", qa: [["¿Cómo cancelo la prueba gratuita o Tanetto Plus?", "En Google Play › Suscripciones › Tanetto Plus › Cancelar suscripción. Si cancelas durante los 7 días gratis, no pagas nada. Tanetto no puede cancelarla por ti."], ["He cambiado de móvil: ¿cómo recupero a mi compañero?", "Con una cuenta gratuita (Perfil › Cuenta y datos), Tanetto guarda una copia en línea: inicia sesión en el móvil nuevo y elige restaurarla. Sin cuenta, el progreso se queda en este móvil; también puedes guardar una copia en un archivo."], ["No me llegan los recordatorios: ¿qué hago?", "Comprueba que las notificaciones de Tanetto estén activadas en los ajustes del móvil y que el ahorro de batería no detenga Tanetto (Ajustes › Aplicaciones › Tanetto › Batería › Sin restricciones)."], ["¿Qué son los Tanì?", "Las monedas de Tanetto: las ganas con objetivos, regalos y juegos y las gastas en la tienda. No son dinero real. Los paquetes de Tanì cuestan dinero real y solo se pagan con Google Play."], ["¿Quién puede leer mi diario?", "Solo tú. El diario se queda en este móvil y, si tienes cuenta, en tu copia privada. El chat con tu compañero no envía nada a nadie."]] },
  full: "La memoria del teléfono está llena: libera algo de espacio para que Tanetto pueda guardar tu progreso.", bk: { cmp: "Copia en línea: nivel {a} · {b} Tanì — este teléfono: nivel {c} · {d} Tanì", less: "La copia tiene menos progreso que este teléfono." },
  find: "Encuentra una línea de ayuda gratuita en tu país en findahelpline.com", emerg: "Emergencias: llama al número de emergencias de tu país.",
  privStats: "Puedes desactivar las estadísticas cuando quieras en Perfil › Privacidad y edad. Siempre están desactivadas para quien aún no tiene la edad del consentimiento digital o no ha dicho su edad, y antes de la pregunta sobre la edad no se cuenta nada."
 },
 fr: {
  notif: { t: "Un moment avec {n} 🌱", m1: "Un petit pas aujourd'hui, ça compte, et {n} le fait volontiers avec toi.", m2: "{n} a trouvé un coin de soleil près de la fenêtre. Tu viens voir ?", m9: "{n} a rangé la chambre. Un petit objectif ensemble ?", m11: "Pas de pression : un tout petit objectif quand tu veux, avec {n}.", streak: "{k} jours d'affilée ensemble ! Si tu en as envie, un petit objectif suffit." },
  kid: { t: "À demain", p: "{n} aura un petit cadeau pour toi." },
  st: { t: "Statistiques anonymes", p: "Tanetto compte de façon anonyme seulement quelques actions (par exemple « app ouverte »), jamais ce que tu écris. Cela nous aide à améliorer l'app.", on: "Activées", off: "Désactivées", kid: "Désactivées pour qui n'a pas encore l'âge du consentement numérique ou n'a pas indiqué son âge." },
  soft: "Ça a l'air lourd à porter. Comment tu vas, vraiment ? Si tout te semble trop dur, tu peux toujours en parler à une personne de confiance ou appeler l'un de ces numéros :",
  sheet: { t: "{n} est là pour toi", talk: "Parler à {n}" },
  more: "Autres pays : trouve une ligne d'écoute gratuite sur findahelpline.com",
  terms: { t0: "Nous faisons en sorte que Tanetto fonctionne bien et s'améliore avec le temps ; cela ne limite pas tes droits légaux de consommateur.", minor: "Si tu as moins de 18 ans, demande à un parent ou à un tuteur avant d'acheter quoi que ce soit.", digital: "Le contenu numérique payant (Tanetto Plus et Tanì) est disponible dès l'achat ; les remboursements suivent les règles de Google Play et tes droits légaux.", law: "Ces conditions sont régies par le droit italien ; en tant que consommateur, tu gardes aussi la protection de la loi du pays où tu vis." },
  lic: "Licences open source",
  brDid: "Je l'ai déjà fait", nextTr: (k, d) => `Prochain trophée : ${k} jours d'affilée (encore ${d})`, ver: "Version",
  wb: { xmas: "Le sapin de Noël est prêt : ajoute une décoration quand tu veux.", season: (s, n) => `${s} se termine dans ${n === 1 ? "1 jour" : n + " jours"}.`, light: "Reprendre en douceur : 1 seul objectif aujourd'hui", lightDone: "Aujourd'hui, un seul objectif : {g}. Dès demain, tout redevient comme avant.", rem: "Activer un rappel tout doux", backP2: "{n} est content que tu sois là. Aujourd'hui, même un tout petit pas suffit." },
  where: "Pour résilier : Google Play › Abonnements.",
  faq: { t: "Réponses rapides", qa: [["Comment résilier l'essai gratuit ou Tanetto Plus ?", "Dans Google Play › Abonnements › Tanetto Plus › Résilier l'abonnement. Si tu résilies pendant les 7 jours gratuits, tu ne paies rien. Tanetto ne peut pas résilier à ta place."], ["J'ai changé de téléphone : comment retrouver mon compagnon ?", "Avec un compte gratuit (Profil › Compte et données), Tanetto garde une sauvegarde en ligne : connecte-toi sur le nouveau téléphone et choisis de la restaurer. Sans compte, la progression reste sur ce téléphone ; tu peux aussi en enregistrer une copie dans un fichier."], ["Les rappels n'arrivent pas : que faire ?", "Vérifie que les notifications de Tanetto sont activées dans les réglages du téléphone et que l'économiseur de batterie ne bloque pas Tanetto (Paramètres › Applications › Tanetto › Batterie › Non restreinte)."], ["C'est quoi, les Tanì ?", "Les pièces de Tanetto : tu les gagnes avec les objectifs, les cadeaux et les jeux, et tu les dépenses dans la boutique. Ce n'est pas de l'argent réel. Les packs de Tanì coûtent de l'argent réel et se paient uniquement avec Google Play."], ["Qui peut lire mon journal ?", "Toi seulement. Le journal reste sur ce téléphone et, si tu as un compte, dans ta sauvegarde privée. Le chat avec ton compagnon n'envoie rien à personne."]] },
  full: "La mémoire de ton téléphone est pleine : libère un peu d'espace pour que Tanetto puisse enregistrer tes progrès.", bk: { cmp: "Sauvegarde : niveau {a} · {b} Tanì — ce téléphone : niveau {c} · {d} Tanì", less: "La sauvegarde contient moins de progrès que ce téléphone." },
  find: "Trouve une ligne d'écoute gratuite dans ton pays sur findahelpline.com", emerg: "Urgences : appelle le numéro d'urgence de ton pays.",
  privStats: "Tu peux désactiver les statistiques à tout moment dans Profil › Confidentialité et âge. Elles sont toujours désactivées pour qui n'a pas encore l'âge du consentement numérique ou n'a pas indiqué son âge, et rien n'est compté avant la question sur l'âge."
 },
 pt: {
  notif: { t: "Um momento com {n} 🌱", m1: "Um passinho hoje já conta, e {n} adora dar esse passo com você.", m2: "{n} achou um cantinho de sol perto da janela. Vem ver?", m9: "{n} arrumou o quarto. Que tal uma metinha agora?", m11: "Sem pressa: uma meta pequenininha quando você quiser, com {n}.", streak: "{k} dias seguidos com {n}! Se quiser, uma meta pequena já basta." },
  kid: { t: "Até amanhã", p: "{n} vai ter um presentinho para você." },
  st: { t: "Estatísticas anônimas", p: "O Tanetto conta de forma anônima só algumas ações (por exemplo, “app aberto”), nunca o que você escreve. Elas ajudam a melhorar o app.", on: "Ativadas", off: "Desativadas", kid: "Desativadas para quem ainda não tem a idade do consentimento digital ou não informou a idade." },
  soft: "Parece algo pesado de carregar. Como você está, de verdade? Se tudo parecer difícil demais, você sempre pode conversar com alguém de confiança ou ligar para um destes números:",
  sheet: { t: "{n} está aqui com você", talk: "Conversar com {n}" },
  more: "Outros países: encontre uma linha de apoio gratuita em findahelpline.com",
  terms: { t0: "Trabalhamos para que o Tanetto funcione bem e melhore com o tempo; isso não limita seus direitos legais como consumidor.", minor: "Se você for menor de idade, peça a um responsável antes de comprar qualquer coisa.", digital: "O conteúdo digital pago (Tanetto Plus e Tanì) fica disponível assim que você compra; os reembolsos seguem as regras do Google Play e os seus direitos legais.", law: "Estes termos são regidos pela lei italiana; se você for consumidor, também mantém as proteções da lei do país onde mora." },
  lic: "Licenças de código aberto",
  brDid: "Já fiz", nextTr: (k, d) => `Próximo troféu: ${k} dias seguidos (${d === 1 ? "falta 1" : "faltam " + d})`, ver: "Versão",
  wb: { xmas: "A árvore de Natal está montada: coloque um enfeite quando quiser.", season: (s, n) => `${s} termina em ${n === 1 ? "1 dia" : n + " dias"}.`, light: "Recomeçar com calma: hoje só 1 meta", lightDone: "Hoje só uma meta: {g}. A partir de amanhã, tudo como sempre.", rem: "Ativar um lembrete carinhoso", backP2: "{n} está feliz por você estar aqui. Hoje, até um passinho bem pequeno já basta." },
  where: "Para cancelar: Google Play › Assinaturas.",
  faq: { t: "Respostas rápidas", qa: [["Como cancelo o teste grátis ou o Tanetto Plus?", "No Google Play › Assinaturas › Tanetto Plus › Cancelar assinatura. Se cancelar durante os 7 dias grátis, você não paga nada. O Tanetto não pode cancelar por você."], ["Troquei de celular: como recupero meu companheiro?", "Com uma conta grátis (Perfil › Conta e dados), o Tanetto guarda um backup on-line: entre no celular novo e escolha restaurar. Sem conta, o progresso fica neste celular; você também pode salvar uma cópia em um arquivo."], ["Os lembretes não chegam: o que eu faço?", "Confira se as notificações do Tanetto estão ativadas nas configurações do celular e se a economia de bateria não está bloqueando o Tanetto (Configurações › Apps › Tanetto › Bateria › Sem restrições)."], ["O que são os Tanì?", "As moedas do Tanetto: você ganha com metas, presentes e jogos e gasta na loja. Não são dinheiro de verdade. Os pacotes de Tanì custam dinheiro de verdade e são pagos só pelo Google Play."], ["Quem pode ler meu diário?", "Só você. O diário fica neste celular e, se você tiver uma conta, no seu backup privado. O chat com seu companheiro não envia nada para ninguém."]] },
  full: "A memória do celular está cheia: libere um pouco de espaço para o Tanetto salvar seu progresso.", bk: { cmp: "Backup: nível {a} · {b} Tanì — este celular: nível {c} · {d} Tanì", less: "O backup tem menos progresso que este celular." },
  find: "Encontre uma linha de apoio gratuita no seu país em findahelpline.com", emerg: "Emergências: ligue para o número de emergência do seu país.",
  privStats: "Você pode desativar as estatísticas quando quiser em Perfil › Privacidade e idade. Elas ficam sempre desativadas para quem ainda não tem a idade do consentimento digital ou não informou a idade, e nada é contado antes da pergunta sobre a idade."
 },
 ja: {
  notif: { t: "{n}からのひとこと 🌱", m1: "今日の小さな一歩も、ちゃんと大事。{n}もいっしょだよ。", m2: "{n}が窓辺にぽかぽかの場所を見つけたよ。見に来る？", m9: "{n}がお部屋を片づけたよ。小さな目標、いっしょにやってみる？", m11: "あせらなくて大丈夫。好きなときに、{n}と小さな目標ひとつ。", streak: "{k}日連続でいっしょ！よかったら、小さな目標ひとつでOK。" },
  kid: { t: "また明日ね", p: "{n}から、ちょっとしたプレゼントがあるよ。" },
  st: { t: "匿名の統計", p: "Tanettoは、いくつかの操作（例：「アプリを開いた」）だけを匿名で数えます。書いた内容は数えません。アプリの改善に役立ちます。", on: "オン", off: "オフ", kid: "デジタル同意年齢に達していない方、年齢を答えていない方はオフです。" },
  soft: "それは重たい気持ちだね。ほんとうは、どんな気分？つらすぎると感じたら、信頼できる人に話したり、こちらの番号に電話したりしてね：",
  sheet: { t: "{n}がそばにいるよ", talk: "{n}と話す" },
  more: "ほかの国：無料の相談窓口は findahelpline.com で探せます",
  terms: { t0: "Tanetto が安定して動き、少しずつ良くなるよう努めています。これは、消費者としてのあなたの法的な権利を制限するものではありません。", minor: "未成年の方は、何かを購入する前に保護者の方に相談してください。", digital: "有料のデジタルコンテンツ（Tanetto Plus と Tanì）は購入後すぐに利用できます。返金は Google Play のポリシーと法律上の権利に従います。", law: "この規約にはイタリア法が適用されます。消費者の方は、お住まいの国の法律による保護も受けられます。" },
  lic: "オープンソースライセンス",
  brDid: "もうやったよ", nextTr: (k, d) => `次のトロフィー：${k}日連続（あと${d}日）`, ver: "バージョン",
  wb: { xmas: "クリスマスツリーができたよ。好きなときに飾りをつけてね。", season: (s, n) => `${s}はあと${n}日で終わります。`, light: "ゆっくり再開：今日は目標1つだけ", lightDone: "今日の目標はひとつだけ：{g}。明日からはいつもどおり。", rem: "やさしいリマインダーをオンにする", backP2: "{n}は、あなたが来てくれてうれしいみたい。今日はほんの小さな一歩で十分。" },
  where: "解約は Google Play › 定期購入 から。",
  faq: { t: "よくある質問", qa: [["無料体験や Tanetto Plus はどうやって解約するの？", "Google Play › 定期購入 › Tanetto Plus › 定期購入を解約 から解約できます。7日間の無料期間中に解約すれば、お金はかかりません。Tanetto から代わりに解約することはできません。"], ["スマホを変えたら、パートナーはどうなるの？", "無料のアカウント（マイページ › アカウントとデータ）があれば、Tanetto がオンラインにバックアップします。新しいスマホでログインして、復元を選んでね。アカウントがない場合、記録はこのスマホだけに残ります。ファイルにコピーを保存することもできます。"], ["リマインダーが届かないときは？", "スマホの設定で Tanetto の通知がオンになっているか、省電力機能が Tanetto を止めていないか確認してね（設定 › アプリ › Tanetto › バッテリー › 制限なし）。"], ["Tanì ってなに？", "Tanetto のコインです。目標やプレゼント、ゲームでもらえて、ショップで使えます。本物のお金ではありません。Tanì のパックは本物のお金がかかり、Google Play でだけ支払えます。"], ["日記はだれが読めるの？", "あなただけです。日記はこのスマホに保存され、アカウントがあればあなた専用のバックアップにも入ります。パートナーとのチャットは、だれにも何も送りません。"]] },
  full: "スマホの空き容量がいっぱいです。Tanettoが進み具合を保存できるよう、少し空きを作ってね。", bk: { cmp: "バックアップ：レベル{a}・{b} Tanì — このスマホ：レベル{c}・{d} Tanì", less: "バックアップは、このスマホより進み具合が少ないです。" },
  find: "お住まいの国の無料相談窓口は findahelpline.com で探せます", emerg: "緊急のときは、お住まいの国の緊急番号に電話してね。",
  privStats: "統計は「マイページ › プライバシーと年齢」でいつでもオフにできます。デジタル同意年齢に達していない方や年齢を答えていない方は常にオフで、年齢の質問より前には何も数えません。"
 },
 ko: {
  notif: { t: "{n}의 한마디 🌱", m1: "오늘의 작은 한 걸음도 소중해요. {n}도 함께해요.", m2: "{n}의 새 발견: 창가의 햇살 좋은 자리! 보러 올래요?", m9: "{n}의 방 정리 완료! 작은 목표 하나, 같이 해 볼까요?", m11: "서두르지 않아도 괜찮아요. 원할 때 작은 목표 하나, {n}도 함께해요.", streak: "{k}일 연속 함께예요! 원한다면 작은 목표 하나면 충분해요." },
  kid: { t: "내일 만나요", p: "내일은 {n}의 작은 선물도 있어요." },
  st: { t: "익명 통계", p: "Tanetto는 몇 가지 동작(예: '앱 열기')만 익명으로 세고, 쓴 내용은 절대 세지 않아요. 앱을 더 좋게 만드는 데 쓰여요.", on: "켜짐", off: "꺼짐", kid: "디지털 동의 연령이 안 됐거나 나이를 알려 주지 않았다면 꺼져 있어요." },
  soft: "마음이 많이 무거운 것 같아요. 정말 괜찮아요? 너무 힘들게 느껴지면 믿을 수 있는 사람에게 이야기하거나 아래 번호로 전화해 보세요:",
  sheet: { t: "{n}도 곁에 있어요", talk: "{n}에게 말 걸기" },
  more: "다른 나라: findahelpline.com에서 무료 상담 전화를 찾을 수 있어요",
  terms: { t0: "Tanetto가 잘 작동하고 꾸준히 나아지도록 노력해요. 이것이 소비자로서의 법적 권리를 제한하지는 않아요.", minor: "미성년자라면 무언가를 구매하기 전에 보호자에게 먼저 물어보세요.", digital: "유료 디지털 콘텐츠(Tanetto Plus와 Tanì)는 구매하는 즉시 이용할 수 있어요. 환불은 Google Play 정책과 법적 권리에 따라요.", law: "이 약관에는 이탈리아 법이 적용돼요. 소비자라면 거주하는 나라의 법이 주는 보호도 그대로 받아요." },
  lic: "오픈소스 라이선스",
  brDid: "이미 했어요", nextTr: (k, d) => `다음 트로피: ${k}일 연속 (${d}일 남음)`, ver: "버전",
  wb: { xmas: "크리스마스트리가 준비됐어요. 원할 때 장식을 하나 달아 보세요.", season: (s, n) => `${s} 종료까지 ${n}일 남았어요.`, light: "천천히 다시 시작: 오늘은 목표 1개만", lightDone: "오늘은 목표 하나만: {g}. 내일부터는 평소처럼.", rem: "다정한 알림 켜기", backP2: "{n}도 와 줘서 기뻐해요. 오늘은 아주 작은 한 걸음이면 충분해요." },
  where: "해지: Google Play › 구독",
  faq: { t: "자주 묻는 질문", qa: [["무료 체험이나 Tanetto Plus는 어떻게 해지해요?", "Google Play › 구독 › Tanetto Plus › 구독 취소에서 해지할 수 있어요. 7일 무료 기간 안에 해지하면 요금이 나가지 않아요. Tanetto가 대신 해지해 줄 수는 없어요."], ["휴대폰을 바꿨어요. 친구를 어떻게 다시 찾아요?", "무료 계정(프로필 › 계정 및 데이터)이 있으면 Tanetto가 온라인 백업을 해 둬요. 새 휴대폰에서 로그인하고 복원을 고르면 돼요. 계정이 없으면 진행 상황은 이 휴대폰에만 남아요. 파일로 복사본을 저장할 수도 있어요."], ["알림이 오지 않으면 어떻게 해요?", "휴대폰 설정에서 Tanetto 알림이 켜져 있는지, 배터리 절약 기능이 Tanetto를 멈추지 않는지 확인해 보세요(설정 › 애플리케이션 › Tanetto › 배터리 › 제한 없음)."], ["Tanì가 뭐예요?", "Tanetto의 코인이에요. 목표, 선물, 게임으로 모으고 상점에서 써요. 진짜 돈이 아니에요. Tanì 팩은 진짜 돈이 들고 Google Play로만 결제해요."], ["내 일기는 누가 읽을 수 있어요?", "나만 읽을 수 있어요. 일기는 이 휴대폰에 남고, 계정이 있으면 나만의 비공개 백업에도 저장돼요. 친구와의 채팅은 아무에게도 아무것도 보내지 않아요."]] },
  full: "휴대폰 저장 공간이 가득 찼어요. Tanetto가 진행 상황을 저장할 수 있게 공간을 조금 비워 주세요.", bk: { cmp: "백업: 레벨 {a} · Tanì {b} — 이 휴대폰: 레벨 {c} · Tanì {d}", less: "백업은 이 휴대폰보다 진행 상황이 적어요." },
  find: "findahelpline.com에서 내가 사는 나라의 무료 상담 전화를 찾을 수 있어요", emerg: "긴급 상황에는 사는 나라의 긴급 전화번호로 전화하세요.",
  privStats: "통계는 언제든지 프로필 › 개인정보와 나이에서 끌 수 있어요. 디지털 동의 연령이 안 됐거나 나이를 알려 주지 않았다면 항상 꺼져 있고, 나이 질문 전에는 아무것도 세지 않아요."
 },
 zh: {
  notif: { t: "{n} 的小提醒 🌱", m1: "今天迈出一小步也算数，{n} 陪着你。", m2: "{n} 在窗边发现了一个晒太阳的好地方。要来看看吗？", m9: "{n} 把房间收拾好了。要不要一起完成一个小目标？", m11: "不用着急：想做的时候，和 {n} 一起完成一个小目标就好。", streak: "已经连续 {k} 天在一起啦！想做的话，一个小目标就够了。" },
  kid: { t: "明天见", p: "{n} 会准备一份小礼物给你。" },
  st: { t: "匿名统计", p: "Tanetto 只会匿名统计少数操作（例如“打开应用”），绝不统计你写的内容。这能帮助我们改进应用。", on: "已开启", off: "已关闭", kid: "对于未达到数字同意年龄或未提供年龄的用户，统计保持关闭。" },
  soft: "听起来你心里压着很多事。你现在真的还好吗？如果觉得太难受了，随时可以和信任的人聊聊，或者拨打下面的电话：",
  sheet: { t: "{n} 在这里陪着你", talk: "和 {n} 聊聊" },
  more: "其他国家和地区：可在 findahelpline.com 查找免费求助热线",
  terms: { t0: "我们努力让 Tanetto 稳定运行并不断改进；这不会限制你作为消费者依法享有的权利。", minor: "如果你是未成年人，购买任何东西之前请先询问父母或监护人。", digital: "付费数字内容（Tanetto Plus 和 Tanì）在购买后立即可用；退款依照 Google Play 的政策和你的法定权利处理。", law: "本条款受意大利法律管辖；如果你是消费者，你仍享有居住国法律提供的保护。" },
  lic: "开源许可",
  brDid: "我已经做过了", nextTr: (k, d) => `下一个奖杯：连续 ${k} 天（还差 ${d} 天）`, ver: "版本",
  wb: { xmas: "圣诞树已经摆好了：想装饰的时候就挂上一个吧。", season: (s, n) => `${s}还有 ${n} 天结束。`, light: "慢慢来：今天只做 1 个目标", lightDone: "今天只有一个目标：{g}。明天一切照旧。", rem: "开启温柔的提醒", backP2: "你来了，{n} 很开心。今天哪怕只迈出一小步也足够了。" },
  where: "取消方式：Google Play › 订阅。",
  faq: { t: "常见问题", qa: [["怎么取消免费试用或 Tanetto Plus？", "在 Google Play › 订阅 › Tanetto Plus › 取消订阅 中取消。在 7 天免费期内取消就不用付钱。Tanetto 无法替你取消。"], ["换了手机，怎么找回我的伙伴？", "有免费账号（我的 › 账号与数据）的话，Tanetto 会在线备份：在新手机上登录并选择恢复即可。没有账号时，进度只保存在这部手机上；你也可以把副本保存成文件。"], ["收不到提醒怎么办？", "请在手机设置中确认 Tanetto 的通知已开启，并且省电功能没有限制 Tanetto（设置 › 应用 › Tanetto › 电池 › 不受限制）。"], ["Tanì 是什么？", "Tanetto 的金币：完成目标、领取礼物和玩游戏都能获得，可以在商店里使用。它们不是真钱。Tanì 礼包需要用真钱购买，只能通过 Google Play 支付。"], ["谁能看到我的日记？", "只有你。日记保存在这部手机上；如果你有账号，也会保存在你的私人备份里。和伙伴的聊天不会发送给任何人。"]] },
  full: "手机存储空间已满：请清理一些空间，这样 Tanetto 才能保存你的进度。", bk: { cmp: "备份：等级 {a} · {b} Tanì — 这部手机：等级 {c} · {d} Tanì", less: "备份的进度比这部手机少。" },
  find: "可在 findahelpline.com 查找你所在国家或地区的免费求助热线", emerg: "紧急情况：请拨打你所在地的急救电话。",
  privStats: "你可以随时在“我的 › 隐私与年龄”中关闭统计。对于未达到数字同意年龄或未提供年龄的用户，统计始终关闭；在询问年龄之前，不会统计任何内容。"
 },
 zht: {
  notif: { t: "{n} 的小提醒 🌱", m1: "今天跨出一小步也算數，{n} 陪著你。", m2: "{n} 在窗邊發現了一個曬太陽的好地方。要來看看嗎？", m9: "{n} 把房間整理好了。要不要一起完成一個小目標？", m11: "不用急：想做的時候，和 {n} 一起完成一個小目標就好。", streak: "已經連續 {k} 天在一起了！想做的話，一個小目標就夠了。" },
  kid: { t: "明天見", p: "{n} 會準備一份小禮物給你。" },
  st: { t: "匿名統計", p: "Tanetto 只會匿名統計少數操作（例如「打開應用程式」），絕不統計你寫的內容。這能幫助我們改進應用程式。", on: "已開啟", off: "已關閉", kid: "對於未達數位同意年齡或未提供年齡的使用者，統計保持關閉。" },
  soft: "聽起來你心裡壓著很多事。你現在真的還好嗎？如果覺得太難受了，隨時可以和信任的人聊聊，或撥打下面的電話：",
  sheet: { t: "{n} 在這裡陪著你", talk: "和 {n} 聊聊" },
  more: "其他國家和地區：可在 findahelpline.com 查詢免費求助專線",
  terms: { t0: "我們努力讓 Tanetto 穩定運作並持續改進；這不會限制你身為消費者依法享有的權利。", minor: "如果你未成年，購買任何東西前請先詢問父母或監護人。", digital: "付費數位內容（Tanetto Plus 和 Tanì）在購買後立即可用；退款依照 Google Play 的政策和你的法定權利處理。", law: "本條款受義大利法律管轄；如果你是消費者，你仍享有居住國法律提供的保護。" },
  lic: "開源授權",
  brDid: "我已經做過了", nextTr: (k, d) => `下一個獎盃：連續 ${k} 天（還差 ${d} 天）`, ver: "版本",
  wb: { xmas: "聖誕樹已經擺好了：想裝飾的時候就掛上一個吧。", season: (s, n) => `${s}還有 ${n} 天結束。`, light: "慢慢來：今天只做 1 個目標", lightDone: "今天只有一個目標：{g}。明天一切照舊。", rem: "開啟溫柔的提醒", backP2: "你來了，{n} 很開心。今天就算只踏出一小步也很夠了。" },
  where: "取消方式：Google Play › 訂閱。",
  faq: { t: "常見問題", qa: [["怎麼取消免費試用或 Tanetto Plus？", "在 Google Play › 訂閱 › Tanetto Plus › 取消訂閱 中取消。在 7 天免費期內取消就不用付費。Tanetto 無法替你取消。"], ["換了手機，怎麼找回我的夥伴？", "有免費帳號（我的 › 帳號與資料）的話，Tanetto 會在線上備份：在新手機登入並選擇還原即可。沒有帳號時，進度只會留在這支手機上；你也可以把副本存成檔案。"], ["收不到提醒怎麼辦？", "請在手機設定中確認 Tanetto 的通知已開啟，而且省電功能沒有限制 Tanetto（設定 › 應用程式 › Tanetto › 電池 › 不受限制）。"], ["Tanì 是什麼？", "Tanetto 的金幣：完成目標、領取禮物和玩遊戲都能獲得，可以在商店使用。它們不是真錢。Tanì 禮包需要用真錢購買，只能透過 Google Play 付款。"], ["誰能看到我的日記？", "只有你。日記會留在這支手機上；如果你有帳號，也會存在你的私人備份裡。和夥伴的聊天不會傳給任何人。"]] },
  full: "手機儲存空間已滿：請清出一些空間，Tanetto 才能儲存你的進度。", bk: { cmp: "備份：等級 {a} · {b} Tanì — 這支手機：等級 {c} · {d} Tanì", less: "備份的進度比這支手機少。" },
  find: "可在 findahelpline.com 查詢你所在國家或地區的免費求助專線", emerg: "緊急情況：請撥打你所在地的緊急電話。",
  privStats: "你可以隨時在「我的 › 隱私與年齡」中關閉統計。對於未達數位同意年齡或未提供年齡的使用者，統計一律關閉；在詢問年齡之前，不會統計任何內容。"
 },
 ru: {
  notif: { t: "{n}: минутка для себя 🌱", m1: "Даже маленький шаг сегодня важен. {n} рядом.", m2: "У окна солнечное местечко, и {n} уже там. Заглянешь?", m9: "{n}: «В комнате прибрано!» Может, одна маленькая цель?", m11: "Без спешки: одна крошечная цель, когда захочешь. {n} рядом.", streak: "Дней подряд вместе: {k}! Если хочется, хватит одной маленькой цели." },
  kid: { t: "До завтра", p: "Завтра будет маленький подарок от {n}." },
  st: { t: "Анонимная статистика", p: "Tanetto анонимно считает лишь некоторые действия (например, «приложение открыто») и никогда — то, что ты пишешь. Это помогает улучшать приложение.", on: "Вкл.", off: "Выкл.", kid: "Выключена для тех, кто младше возраста цифрового согласия или не указал возраст." },
  soft: "Похоже, тебе сейчас непросто. Как ты на самом деле? Если станет слишком тяжело, ты всегда можешь поговорить с человеком, которому доверяешь, или позвонить по одному из этих номеров:",
  sheet: { t: "{n} рядом с тобой", talk: "Поговорить с {n}" },
  more: "Другие страны: бесплатные линии помощи есть на findahelpline.com",
  terms: { t0: "Мы стараемся, чтобы Tanetto работал стабильно и со временем становился лучше; это не ограничивает твои права потребителя по закону.", minor: "Если тебе ещё нет 18 лет, перед любой покупкой спроси разрешения у родителей или опекуна.", digital: "Платный цифровой контент (Tanetto Plus и Tanì) становится доступен сразу после покупки; возвраты осуществляются по правилам Google Play и в соответствии с твоими законными правами.", law: "Эти условия регулируются законодательством Италии; если ты потребитель, за тобой также сохраняется защита по законам страны, где ты живёшь." },
  lic: "Лицензии открытого ПО",
  brDid: "Уже готово", nextTr: (k, d) => `Следующий трофей: ${k} дней подряд (осталось ${d})`, ver: "Версия",
  wb: { xmas: "Ёлка уже стоит: повесь украшение, когда захочешь.", season: (s, n) => { const a = n % 100, b = n % 10; const w = a > 10 && a < 20 ? "дней" : b === 1 ? "день" : b > 1 && b < 5 ? "дня" : "дней"; return `Сезон «${s}» закончится через ${n} ${w}.`; }, light: "Начнём мягко: сегодня только 1 цель", lightDone: "Сегодня только одна цель: {g}. С завтрашнего дня всё как обычно.", rem: "Включить мягкое напоминание", backP2: "{n} радуется, что ты здесь. Сегодня хватит даже совсем маленького шага." },
  where: "Отменить: Google Play › Подписки.",
  faq: { t: "Быстрые ответы", qa: [["Как отменить бесплатный пробный период или Tanetto Plus?", "В Google Play › Подписки › Tanetto Plus › Отменить подписку. Если отменить в течение 7 бесплатных дней, платить ничего не придётся. Tanetto не может отменить подписку за тебя."], ["Я сменил телефон: как вернуть своего друга?", "С бесплатным аккаунтом («Профиль» › «Аккаунт и данные») Tanetto хранит резервную копию онлайн: войди на новом телефоне и выбери восстановление. Без аккаунта прогресс остаётся на этом телефоне; можно также сохранить копию в файл."], ["Не приходят напоминания: что делать?", "Проверь, что уведомления Tanetto включены в настройках телефона и что экономия заряда не останавливает Tanetto (Настройки › Приложения › Tanetto › Батарея › Без ограничений)."], ["Что такое Tanì?", "Монетки Tanetto: их получают за цели, подарки и игры и тратят в магазине. Это не настоящие деньги. Наборы Tanì стоят настоящих денег и оплачиваются только через Google Play."], ["Кто может читать мой дневник?", "Только ты. Дневник хранится на этом телефоне, а если есть аккаунт, ещё и в твоей личной резервной копии. Чат с другом никому ничего не отправляет."]] },
  full: "Память телефона заполнена: освободи немного места, чтобы Tanetto мог сохранить твой прогресс.", bk: { cmp: "Копия: уровень {a} · {b} Tanì — этот телефон: уровень {c} · {d} Tanì", less: "В копии меньше прогресса, чем на этом телефоне." },
  find: "Бесплатные линии помощи в твоей стране есть на findahelpline.com", emerg: "Экстренные случаи: позвони по номеру экстренной службы своей страны.",
  privStats: "Статистику можно выключить в любой момент: «Профиль» › «Приватность и возраст». Для тех, кто младше возраста цифрового согласия или не указал возраст, она всегда выключена, а до вопроса о возрасте ничего не считается."
 },
 pl: {
  notif: { t: "{n}: chwila dla siebie 🌱", m1: "Dziś liczy się nawet mały krok. {n} jest obok.", m2: "Przy oknie jest słoneczne miejsce i {n} już tam siedzi. Zajrzysz?", m9: "{n}: „W pokoju posprzątane!” Może jeden mały cel?", m11: "Bez pośpiechu: jeden malutki cel, kiedy zechcesz. {n} jest obok.", streak: "{k} dni z rzędu razem! Jeśli masz ochotę, wystarczy jeden mały cel." },
  kid: { t: "Do jutra", p: "Jutro {n} ma dla ciebie mały prezent." },
  st: { t: "Anonimowe statystyki", p: "Tanetto anonimowo liczy tylko niektóre działania (np. „otwarcie aplikacji”), nigdy to, co piszesz. Pomaga nam to ulepszać aplikację.", on: "Włączone", off: "Wyłączone", kid: "Wyłączone dla osób poniżej wieku zgody cyfrowej lub bez podanego wieku." },
  soft: "Brzmi to jak coś ciężkiego. Jak naprawdę się czujesz? Jeśli wszystko wydaje się zbyt trudne, zawsze możesz porozmawiać z kimś, komu ufasz, albo zadzwonić pod jeden z tych numerów:",
  sheet: { t: "{n} jest przy tobie", talk: "Porozmawiaj z {n}" },
  more: "Inne kraje: bezpłatne telefony wsparcia znajdziesz na findahelpline.com",
  terms: { t0: "Staramy się, aby Tanetto działało dobrze i z czasem było coraz lepsze; nie ogranicza to twoich praw konsumenta wynikających z przepisów.", minor: "Jeśli nie masz jeszcze 18 lat, przed zakupem zapytaj rodzica lub opiekuna.", digital: "Płatne treści cyfrowe (Tanetto Plus i Tanì) są dostępne od razu po zakupie; zwroty odbywają się zgodnie z zasadami Google Play i twoimi prawami.", law: "Te warunki podlegają prawu włoskiemu; jako konsument zachowujesz też ochronę wynikającą z prawa kraju, w którym mieszkasz." },
  lic: "Licencje open source",
  brDid: "Już zrobione", nextTr: (k, d) => `Następne trofeum: ${k} dni z rzędu (zostało ${d})`, ver: "Wersja",
  wb: { xmas: "Choinka już stoi: dodaj ozdobę, kiedy zechcesz.", season: (s, n) => `${s} kończy się za ${n === 1 ? "1 dzień" : n + " dni"}.`, light: "Spokojny start: dziś tylko 1 cel", lightDone: "Dziś tylko jeden cel: {g}. Od jutra wszystko jak zwykle.", rem: "Włącz łagodne przypomnienie", backP2: "{n} cieszy się, że jesteś. Dziś wystarczy nawet malutki krok." },
  where: "Anulowanie: Google Play › Subskrypcje.",
  faq: { t: "Szybkie odpowiedzi", qa: [["Jak anulować bezpłatny okres próbny lub Tanetto Plus?", "W Google Play › Subskrypcje › Tanetto Plus › Anuluj subskrypcję. Jeśli anulujesz w ciągu 7 darmowych dni, nic nie płacisz. Tanetto nie może anulować za ciebie."], ["Zmieniam telefon: jak odzyskać mojego towarzysza?", "Z darmowym kontem (Profil › Konto i dane) Tanetto przechowuje kopię online: zaloguj się na nowym telefonie i wybierz przywracanie. Bez konta postępy zostają na tym telefonie; możesz też zapisać kopię w pliku."], ["Przypomnienia nie przychodzą: co zrobić?", "Sprawdź, czy powiadomienia Tanetto są włączone w ustawieniach telefonu i czy oszczędzanie baterii nie blokuje Tanetto (Ustawienia › Aplikacje › Tanetto › Bateria › Bez ograniczeń)."], ["Czym są Tanì?", "To monety Tanetto: zdobywasz je za cele, prezenty i gry, a wydajesz w sklepie. To nie są prawdziwe pieniądze. Pakiety Tanì kosztują prawdziwe pieniądze i płaci się za nie tylko przez Google Play."], ["Kto może czytać mój dziennik?", "Tylko ty. Dziennik zostaje na tym telefonie, a jeśli masz konto, także w twojej prywatnej kopii. Czat z towarzyszem niczego nikomu nie wysyła."]] },
  full: "Pamięć telefonu jest pełna: zwolnij trochę miejsca, żeby Tanetto mogło zapisać twoje postępy.", bk: { cmp: "Kopia: poziom {a} · {b} Tanì — ten telefon: poziom {c} · {d} Tanì", less: "Kopia ma mniej postępów niż ten telefon." },
  find: "Bezpłatne telefony wsparcia w twoim kraju znajdziesz na findahelpline.com", emerg: "W nagłych wypadkach: zadzwoń pod numer alarmowy w twoim kraju.",
  privStats: "Statystyki możesz w każdej chwili wyłączyć w Profil › Prywatność i wiek. Są zawsze wyłączone dla osób poniżej wieku zgody cyfrowej lub bez podanego wieku, a przed pytaniem o wiek nic nie jest liczone."
 },
 nl: {
  notif: { t: "Even met {n} 🌱", m1: "Een klein stapje vandaag telt, en {n} zet het graag samen met je.", m2: "{n} heeft een zonnig plekje bij het raam gevonden. Kom je kijken?", m9: "{n} heeft de kamer opgeruimd. Zin in één klein doel samen?", m11: "Geen haast: één piepklein doel wanneer je wilt, samen met {n}.", streak: "{k} dagen op rij samen! Als je zin hebt, is één klein doel genoeg." },
  kid: { t: "Tot morgen", p: "{n} heeft dan een klein cadeautje voor je." },
  st: { t: "Anonieme statistieken", p: "Tanetto telt anoniem maar een paar acties (bijvoorbeeld 'app geopend'), nooit wat je schrijft. Zo kunnen we de app verbeteren.", on: "Aan", off: "Uit", kid: "Uit voor iedereen onder de leeftijd van digitale toestemming of zonder opgegeven leeftijd." },
  soft: "Dat klinkt als veel om te dragen. Hoe gaat het echt met je? Als alles te zwaar voelt, kun je altijd praten met iemand die je vertrouwt, of een van deze nummers bellen:",
  sheet: { t: "{n} is er voor je", talk: "Praat met {n}" },
  more: "Andere landen: vind een gratis hulplijn op findahelpline.com",
  terms: { t0: "We zorgen ervoor dat Tanetto goed werkt en steeds beter wordt; dit beperkt je wettelijke rechten als consument niet.", minor: "Ben je minderjarig, vraag dan een ouder of voogd voordat je iets koopt.", digital: "Betaalde digitale inhoud (Tanetto Plus en Tanì) is direct na aankoop beschikbaar; terugbetalingen volgen het beleid van Google Play en je wettelijke rechten.", law: "Op deze voorwaarden is het Italiaanse recht van toepassing; als consument houd je ook de bescherming van het recht van het land waar je woont." },
  lic: "Opensourcelicenties",
  brDid: "Heb ik al gedaan", nextTr: (k, d) => `Volgende trofee: ${k} dagen op rij (nog ${d})`, ver: "Versie",
  wb: { xmas: "De kerstboom staat klaar: hang een versiering op wanneer je wilt.", season: (s, n) => `${s} eindigt over ${n === 1 ? "1 dag" : n + " dagen"}.`, light: "Rustig beginnen: vandaag maar 1 doel", lightDone: "Vandaag maar één doel: {g}. Vanaf morgen weer zoals altijd.", rem: "Een lieve herinnering aanzetten", backP2: "{n} is blij dat je er bent. Vandaag is zelfs een heel klein stapje genoeg." },
  where: "Opzeggen: Google Play › Abonnementen.",
  faq: { t: "Snelle antwoorden", qa: [["Hoe zeg ik de gratis proefperiode of Tanetto Plus op?", "Via Google Play › Abonnementen › Tanetto Plus › Abonnement opzeggen. Zeg je op tijdens de 7 gratis dagen, dan betaal je niets. Tanetto kan niet voor je opzeggen."], ["Nieuwe telefoon: hoe krijg ik mijn maatje terug?", "Met een gratis account (Profiel › Account en gegevens) bewaart Tanetto een online back-up: log in op de nieuwe telefoon en kies voor herstellen. Zonder account blijft je voortgang op deze telefoon; je kunt ook een kopie als bestand bewaren."], ["De herinneringen komen niet aan: wat kan ik doen?", "Controleer of meldingen voor Tanetto aanstaan in de instellingen van je telefoon en of batterijbesparing Tanetto niet stopt (Instellingen › Apps › Tanetto › Batterij › Onbeperkt)."], ["Wat zijn Tanì?", "De munten van Tanetto: je verdient ze met doelen, cadeaus en spelletjes en geeft ze uit in de winkel. Het is geen echt geld. Tanì-pakketten kosten echt geld en betaal je alleen via Google Play."], ["Wie kan mijn dagboek lezen?", "Alleen jij. Het dagboek blijft op deze telefoon en, als je een account hebt, in je privé-back-up. De chat met je maatje stuurt niets naar iemand."]] },
  full: "Het geheugen van je telefoon is vol: maak wat ruimte vrij zodat Tanetto je voortgang kan bewaren.", bk: { cmp: "Back-up: niveau {a} · {b} Tanì — deze telefoon: niveau {c} · {d} Tanì", less: "De back-up heeft minder voortgang dan deze telefoon." },
  find: "Vind een gratis hulplijn in jouw land op findahelpline.com", emerg: "Noodgeval: bel het noodnummer van je land.",
  privStats: "Je kunt de statistieken altijd uitzetten in Profiel › Privacy en leeftijd. Ze staan altijd uit voor iedereen onder de leeftijd van digitale toestemming of zonder opgegeven leeftijd, en vóór de vraag over je leeftijd wordt niets geteld."
 },
 tr: {
  notif: { t: "{n} ile bir an 🌱", m1: "Bugün küçük bir adım bile önemli. {n} hep yanında.", m2: "Pencerenin yanında güneşli bir köşe var, {n} orada. Bakmaya gelir misin?", m9: "{n} odayı topladı. Birlikte küçük bir hedefe ne dersin?", m11: "Acele yok: istediğin zaman küçücük bir hedef. {n} hep yanında.", streak: "Üst üste {k} gün birlikte! İstersen küçük bir hedef yeter." },
  kid: { t: "Yarın görüşürüz", p: "Yarın {n} sana küçük bir hediye verecek." },
  st: { t: "Anonim istatistikler", p: "Tanetto yalnızca bazı işlemleri (örneğin “uygulama açıldı”) anonim olarak sayar, yazdıklarını asla saymaz. Uygulamayı geliştirmemize yardımcı olur.", on: "Açık", off: "Kapalı", kid: "Dijital rıza yaşının altındakiler veya yaşını belirtmeyenler için kapalı." },
  soft: "Bu taşıması ağır bir şey gibi görünüyor. Gerçekten nasılsın? Her şey çok zor gelirse, güvendiğin biriyle konuşabilir ya da bu numaralardan birini arayabilirsin:",
  sheet: { t: "{n} yanında", talk: "{n} ile konuş" },
  more: "Diğer ülkeler: ücretsiz yardım hatlarını findahelpline.com adresinde bulabilirsin",
  terms: { t0: "Tanetto'nun iyi çalışması ve zamanla gelişmesi için çalışıyoruz; bu, tüketici olarak yasal haklarını sınırlamaz.", minor: "18 yaşından küçüksen, bir şey satın almadan önce anne, baba ya da velinden izin iste.", digital: "Ücretli dijital içerik (Tanetto Plus ve Tanì) satın aldığın anda kullanıma açılır; iadeler Google Play politikalarına ve yasal haklarına göre yapılır.", law: "Bu koşullar İtalyan hukukuna tabidir; tüketiciysen yaşadığın ülkenin yasalarının sağladığı korumalar da geçerlidir." },
  lic: "Açık kaynak lisansları",
  brDid: "Zaten yaptım", nextTr: (k, d) => `Sonraki kupa: üst üste ${k} gün (${d} kaldı)`, ver: "Sürüm",
  wb: { xmas: "Yılbaşı ağacı hazır: istediğin zaman bir süs ekle.", season: (s, n) => `${s} ${n} gün sonra bitiyor.`, light: "Yavaş başla: bugün sadece 1 hedef", lightDone: "Bugün tek hedef: {g}. Yarından itibaren her şey eskisi gibi.", rem: "Nazik bir hatırlatma aç", backP2: "{n} burada olmana çok seviniyor. Bugün minicik bir adım bile yeter." },
  where: "İptal için: Google Play › Abonelikler.",
  faq: { t: "Kısa cevaplar", qa: [["Ücretsiz denemeyi veya Tanetto Plus'ı nasıl iptal ederim?", "Google Play › Abonelikler › Tanetto Plus › Aboneliği iptal et yolunu izle. 7 ücretsiz gün içinde iptal edersen hiçbir şey ödemezsin. Tanetto senin yerine iptal edemez."], ["Telefonumu değiştirdim: arkadaşımı nasıl geri alırım?", "Ücretsiz bir hesapla (Profil › Hesap ve veriler) Tanetto çevrim içi yedek tutar: yeni telefonda giriş yap ve geri yüklemeyi seç. Hesap yoksa ilerlemen bu telefonda kalır; bir kopyasını dosyaya da kaydedebilirsin."], ["Hatırlatmalar gelmiyor: ne yapabilirim?", "Telefon ayarlarında Tanetto bildirimlerinin açık olduğunu ve pil tasarrufunun Tanetto'yu durdurmadığını kontrol et (Ayarlar › Uygulamalar › Tanetto › Pil › Kısıtlamasız)."], ["Tanì nedir?", "Tanetto'nun paraları: hedefler, hediyeler ve oyunlarla kazanır, mağazada harcarsın. Gerçek para değildir. Tanì paketleri gerçek paraya mal olur ve yalnızca Google Play üzerinden ödenir."], ["Günlüğümü kim okuyabilir?", "Yalnızca sen. Günlük bu telefonda kalır; hesabın varsa özel yedeğinde de saklanır. Arkadaşınla sohbet kimseye hiçbir şey göndermez."]] },
  full: "Telefonunun depolama alanı dolu: Tanetto'nun ilerlemeni kaydedebilmesi için biraz yer aç.", bk: { cmp: "Yedek: seviye {a} · {b} Tanì — bu telefon: seviye {c} · {d} Tanì", less: "Yedekte bu telefondakinden daha az ilerleme var." },
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
/* I-09: condizioni d'uso con i diritti del consumatore, minori, contenuti digitali e legge applicabile */
Object.keys(V26T).forEach((l) => { const t = T[l], x = V26T[l].terms; if (!t || !Array.isArray(t.terms) || t.terms.v26 || t.terms.length !== 6) { if (t && Array.isArray(t.terms) && !t.terms.v26 && t.terms.length !== 6) V26_MISS.push(l + " terms"); return; }
  const a = t.terms; t.terms = [x.t0, a[1], a[2], a[3], x.minor, x.digital, a[4], x.law, a[5]]; t.terms.v26 = 1; });
if (V26_MISS.length) throw new Error("1.0.11 testi: manca " + V26_MISS.join(", "));
/* G1-07: il terzo "bentornato" non dice piu' "ti stava aspettando" */
Object.keys(V26T).forEach((l) => { const t = T[l]; if (t && t.v12 && Array.isArray(t.v12.backP) && t.v12.backP.length > 2) { const s2 = V26T[l].wb.backP2; t.v12.backP[2] = (n) => s2.split("{n}").join(n); } });
if (V26_MISS.length) throw new Error("1.0.10 testi: manca " + V26_MISS.join(", "));
