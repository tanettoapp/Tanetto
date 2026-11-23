"""Texts of the terms of use page (terms.html, https://tanetto.app/terms), 14 languages.

Placeholders: {OWNER} {E} (email) {P} (privacy page) {D} (delete-account page) {LIC} (licences page).
Links: [words](@EEA) Google Play refund rules for the EEA and the UK, [words](@REF) Google Play refund policies,
[words](@ECC) European Consumer Centres Network. A list inside a section is written as a Python list of strings.
Same facts as the 1.0.11 app and the privacy policy (prices: src/97b_v9.js PLUS_PRICE; Elusive treasures: src/98ze;
up to 5 videos a day; protected mode). Keep all 14 languages in step when something changes.
"""

T = {}

T["en"] = {
 "title": "Terms of use", "upd": "Last updated: {date}",
 "intro": "These terms apply when you use Tanetto, both the app for Android and the version that runs in the browser. Please read them together with the privacy policy ({P}). If something isn't clear, ask an adult you trust or write to us.",
 "s": [
  ("1. Who we are", ["Tanetto is made by {OWNER}, Italy, that is, by the owner of the service named in the privacy policy ({P}). You can write to us about anything, including complaints and withdrawals, at {E}. Google Play also shows the developer's contact details on Tanetto's page."]),
  ("2. What Tanetto is", ["Tanetto helps you build small daily habits with a virtual companion. It's a wellbeing and habit app, not a medical or psychological service, and it doesn't replace professional help. If you're in danger or need help urgently, call your local emergency number; the journal also shows helplines for your country."]),
  ("3. Who can use it", [
   "Tanetto is designed for people aged 13 and up and is not directed to children under 13. The app asks for your month and year of birth: it's the age you declare yourself, and we can't verify it. If you enter an age under 13, or you'd rather not say, Tanetto works in protected mode, as the privacy policy explains.",
   "If you're a minor, use Tanetto with the agreement of a parent or guardian, and ask them before buying anything. Purchases are made with the Google account on the phone: parents can set Google Play to ask for approval or a password before every purchase."]),
  ("4. Tanetto Plus", [
   "Tanetto is free to download, and its heart stays free. Tanetto Plus is an optional subscription, monthly or yearly, with the extras described in the app before you buy. In Italy it costs €4.99 a month or €44.99 a year, VAT included; in other countries Google Play shows the price in your currency before you confirm, and that is the price that applies.",
   "Payments, renewals, cancellations and refunds are handled by Google Play, under its own terms: we never receive your card or payment details.",
   "A plan may include a free trial for eligible new subscribers: Google Play shows how long it lasts and when the first payment is due. If you don't cancel before the trial ends, the subscription starts and you're charged.",
   "The subscription renews automatically at the end of each period until you cancel it in Google Play › Subscriptions. Cancelling stops the next renewal, and Plus stays active until the end of the period already paid. If the price changes, Google Play tells you in advance and, where required, asks for your agreement.",
   "Plus works in the Android app and is linked to the Google account you bought it with: you can get it back on another phone with the same account."]),
  ("5. Tanì", [
   "Tanì are the coins of the app. You earn them by taking care of yourself with Tanetto, and you can also buy packs of Tanì through Google Play, at the price shown before you confirm. Purchased Tanì are added straight away.",
   "Tanì are a virtual currency for use only inside the app: they aren't money, have no monetary value, can't be exchanged for money and can't be transferred to other people. Tanì from packs work for the whole shop except the Elusive treasures: those are bought only with Tanì you earn by taking care of yourself.",
   "Tanì and your progress are saved on your device and, if you have an account, in the online backup. If you delete the app's data or start over without a backup or a saved copy, we can't restore them."]),
  ("6. Ads", ["Tanetto has no ads that appear on their own. In the Android app you can choose to watch a short video, provided by Google AdMob, to get a small reward, up to 5 a day. With Tanetto Plus there are no ads, and under 13 there are none at all; for minors and for anyone who doesn't give their age, the videos are never personalised. Videos depend on Google: sometimes none may be available."]),
  ("7. Account and online backup", [
   "You don't need an account. If you're old enough under the privacy law of your country (13 to 16, depending on the country), you can create an optional account with Google or with email and password, to back up your progress online for free. Keep your password safe and don't share your account with anyone.",
   "The online backup is a free extra: we do our best to keep it working, but we suggest you also keep a copy on your device with “Save a copy”. You can delete your account and online backup at any time in Profile › Account and data › Manage account › Delete profile, or on {D}."]),
  ("8. Rules of use", [
   "Tanetto is for your personal, non-commercial use. Please don't:",
   ["copy, modify, resell or redistribute the app or its content;",
    "try to get Tanì, Plus or rewards in ways the app doesn't offer, for example with a modified app, fake purchases or fake invitations;",
    "try to get into other people's accounts or data, or disrupt the service;",
    "use Tanetto in ways that break the law."],
   "If the app offers “Invite a friend” (only for people aged 18 or over), the rewards and limits are the ones shown in the app, and rewards obtained by cheating aren't due. If an account is used to break these rules, we may suspend or delete it, telling you why where possible; this doesn't affect any refund you're entitled to by law."]),
  ("9. Your content and ours", ["What you write in Tanetto is yours. It stays on your device and, if you have an account, in your online backup, which is used only to restore it (see the privacy policy). Tanetto's illustrations, characters, texts, music and code are protected by copyright and may not be copied or reused without permission; the images in the press kit may be used to write about Tanetto. The open-source components and their licences are listed on {LIC}."]),
  ("10. Right of withdrawal and legal guarantee", [
   "If you're a consumer in the European Union or the United Kingdom, the law normally gives you 14 days to withdraw from a purchase made online, without giving a reason.",
   "Tanì and Tanetto Plus are digital content supplied straight away. When you buy them on Google Play, you agree to immediate supply and acknowledge that you lose the right of withdrawal once supply has begun ([Google Play rules](@EEA)). A free trial costs nothing, and you can cancel it at any time before it ends.",
   "Where you still have the right of withdrawal, you can use it within 14 days of the purchase by asking Google Play for a refund, or by writing to {E} with a clear statement, for example: “I withdraw from the purchase of [product] made on [date], Google Play order number [GPA…]”. We'll reply without delay, and a valid withdrawal is refunded through Google Play, with the same payment method.",
   "In any case you keep the legal guarantee: if Tanetto Plus or Tanì don't work as described, write to us and we'll fix it; if we can't, you can ask for a price reduction or a refund, as the law provides. [Google Play's refund policies](@REF) also remain available to you."]),
  ("11. Changes and availability", [
   "We work to keep Tanetto running well and to improve it, so some features may change over time. During a period you've already paid for, we don't take away the main benefits of Plus; if a change affects you significantly, we'll tell you in advance in the app or on this site.",
   "Tanetto may sometimes be unavailable, for example during updates or when Google services have problems. If one day we stop offering Tanetto, we'll tell you in advance: subscriptions won't be renewed, and you'll get what the law provides for any period already paid and not used.",
   "If we change these terms, we'll publish the new version on this page with its date; if the changes are important, we'll tell you in the app before they apply. Changes don't affect purchases already made."]),
  ("12. Liability", ["We're responsible for providing Tanetto as described in these terms and as consumer law requires. We're not responsible for problems that don't depend on us, such as the phone, the internet connection or the services of other companies, like Google. Tanetto doesn't give medical advice: for decisions about your health, talk to a professional. Nothing in these terms limits our liability where the law doesn't allow it, for example for intent or gross negligence or for harm to life, body or health, and nothing limits your rights as a consumer."]),
  ("13. Law, courts and complaints", [
   "These terms are governed by Italian law. If you're a consumer, you also keep the protection of the mandatory rules of the country where you live.",
   "If you're a consumer in the European Union, you can take legal action before the courts of the country where you live, and we can take legal action against you only there; in Italy, the court of the place where you reside or are domiciled has jurisdiction (Art. 66-bis of the Italian Consumer Code).",
   "For any complaint, please write first to {E}: we'll answer as soon as possible. If you live in the European Union, you can also get free help from the [European Consumer Centre of your country](@ECC)."]),
 ],
}

T["it"] = {
 "title": "Condizioni d'uso", "upd": "Ultimo aggiornamento: {date}",
 "intro": "Queste condizioni valgono quando usi Tanetto, sia l'app per Android sia la versione che funziona nel browser. Leggile insieme all'informativa privacy ({P}). Se qualcosa non è chiaro, chiedi a un adulto di cui ti fidi o scrivici.",
 "s": [
  ("1. Chi siamo", ["Tanetto è realizzata da {OWNER}, Italia, cioè dal titolare del servizio indicato nell'informativa sulla privacy ({P}). Puoi scriverci per qualsiasi cosa, anche per reclami e recessi, a {E}. Google Play mostra anche i dati di contatto dello sviluppatore nella pagina di Tanetto."]),
  ("2. Che cos'è Tanetto", ["Tanetto ti aiuta a costruire piccole abitudini quotidiane con un compagno virtuale. È un'app di benessere e abitudini, non un servizio medico o psicologico, e non sostituisce l'aiuto di un professionista. Se sei in pericolo o ti serve aiuto subito, chiama il numero di emergenza del tuo Paese; nel diario trovi anche i numeri di aiuto del tuo Paese."]),
  ("3. Chi può usarla", [
   "Tanetto è pensata per chi ha dai 13 anni in su e non è rivolta ai bambini sotto i 13 anni. L'app chiede mese e anno di nascita: è l'età che dichiari tu e non possiamo verificarla. Se indichi meno di 13 anni, o preferisci non dirlo, Tanetto funziona in modalità protetta, come spiega l'informativa privacy.",
   "Se sei minorenne, usa Tanetto con l'accordo di un genitore o di chi si occupa di te, e chiedi a loro prima di acquistare qualcosa. Gli acquisti si fanno con l'account Google del telefono: i genitori possono impostare Google Play perché chieda un'approvazione o una password prima di ogni acquisto."]),
  ("4. Tanetto Plus", [
   "Tanetto si scarica gratis e il suo cuore resta gratuito. Tanetto Plus è un abbonamento facoltativo, mensile o annuale, con i contenuti in più descritti nell'app prima dell'acquisto. In Italia costa 4,99 € al mese o 44,99 € all'anno, IVA inclusa; negli altri Paesi Google Play mostra il prezzo nella tua valuta prima della conferma, ed è quello il prezzo che vale.",
   "Pagamenti, rinnovi, disdette e rimborsi sono gestiti da Google Play, secondo le sue condizioni: noi non riceviamo mai i dati della tua carta o del pagamento.",
   "Un piano può includere una prova gratuita per i nuovi abbonati che ne hanno diritto: Google Play mostra quanto dura e quando parte il primo pagamento. Se non disdici prima della fine della prova, l'abbonamento parte e viene addebitato.",
   "L'abbonamento si rinnova da solo alla fine di ogni periodo finché non lo disdici in Google Play › Abbonamenti. La disdetta ferma il rinnovo successivo e Plus resta attivo fino alla fine del periodo già pagato. Se il prezzo cambia, Google Play te lo dice prima e, quando serve, ti chiede di accettarlo.",
   "Plus funziona nell'app per Android ed è legato all'account Google con cui l'hai comprato: su un altro telefono con lo stesso account puoi recuperarlo."]),
  ("5. Tanì", [
   "I Tanì sono le monete dell'app. Li guadagni prendendoti cura di te con Tanetto e puoi anche comprare pacchetti di Tanì tramite Google Play, al prezzo mostrato prima della conferma. I Tanì comprati arrivano subito.",
   "I Tanì sono una moneta virtuale da usare solo nell'app: non sono denaro, non hanno valore in denaro, non si possono convertire in soldi né passare ad altre persone. I Tanì dei pacchetti valgono per tutto il negozio, tranne gli Introvabili: questi si comprano solo con i Tanì guadagnati prendendoti cura di te.",
   "I Tanì e i tuoi progressi sono salvati sul tuo dispositivo e, se hai un account, nel backup online. Se cancelli i dati dell'app o ricominci da capo senza un backup o una copia salvata, non possiamo recuperarli."]),
  ("6. Pubblicità", ["In Tanetto non ci sono pubblicità che partono da sole. Nell'app per Android puoi scegliere di guardare un breve video, fornito da Google AdMob, per ricevere un piccolo premio, fino a 5 al giorno. Con Tanetto Plus non ci sono pubblicità, e sotto i 13 anni non ce n'è nessuna; per i minorenni e per chi non dice l'età, i video non sono mai personalizzati. I video dipendono da Google: a volte potrebbero non essercene."]),
  ("7. Account e backup online", [
   "L'account non serve. Se hai l'età prevista dalla legge sulla privacy del tuo Paese (da 13 a 16 anni, secondo il Paese), puoi creare un account facoltativo con Google o con e-mail e password, per salvare gratis i progressi online. Tieni al sicuro la password e non condividere l'account con nessuno.",
   "Il backup online è un servizio gratuito in più: facciamo il possibile perché funzioni sempre, ma ti consigliamo di tenere anche una copia sul dispositivo con «Salva una copia». Puoi eliminare account e backup online quando vuoi in Profilo › Account e dati › Gestisci account › Elimina profilo, oppure da {D}."]),
  ("8. Regole d'uso", [
   "Tanetto è per un uso personale e non commerciale. Ti chiediamo di non:",
   ["copiare, modificare, rivendere o distribuire l'app o i suoi contenuti;",
    "cercare di ottenere Tanì, Plus o premi in modi che l'app non prevede, per esempio con un'app modificata, acquisti falsi o inviti finti;",
    "cercare di entrare negli account o nei dati di altre persone, o disturbare il servizio;",
    "usare Tanetto in modi contrari alla legge."],
   "Se l'app offre «Invita un amico» (solo per chi ha 18 anni o più), premi e limiti sono quelli indicati nell'app, e i premi ottenuti barando non spettano. Se un account viene usato per violare queste regole, possiamo sospenderlo o eliminarlo, spiegandoti il motivo quando è possibile; questo non tocca i rimborsi che ti spettano per legge."]),
  ("9. I tuoi contenuti e i nostri", ["Quello che scrivi in Tanetto è tuo. Resta sul tuo dispositivo e, se hai un account, nel tuo backup online, che serve solo a ripristinarlo (vedi l'informativa privacy). Illustrazioni, personaggi, testi, musiche e codice di Tanetto sono protetti dal diritto d'autore e non possono essere copiati o riutilizzati senza permesso; le immagini del press kit si possono usare per parlare di Tanetto. I componenti open source e le loro licenze sono elencati su {LIC}."]),
  ("10. Diritto di recesso e garanzia legale", [
   "Se sei un consumatore nell'Unione Europea o nel Regno Unito, la legge di solito ti dà 14 giorni per recedere da un acquisto fatto online, senza dare spiegazioni.",
   "I Tanì e Tanetto Plus sono contenuti digitali forniti subito. Quando li compri su Google Play accetti la fornitura immediata e riconosci che, una volta iniziata la fornitura, perdi il diritto di recesso ([regole di Google Play](@EEA)). La prova gratuita non costa nulla e puoi disdirla quando vuoi prima che finisca.",
   "Se il diritto di recesso ti spetta ancora, puoi esercitarlo entro 14 giorni dall'acquisto chiedendo il rimborso a Google Play, oppure scrivendo a {E} una dichiarazione chiara, per esempio: «Recedo dall'acquisto di [prodotto] fatto il [data], numero d'ordine Google Play [GPA…]». Ti rispondiamo senza ritardo, e un recesso valido viene rimborsato tramite Google Play, con lo stesso metodo di pagamento.",
   "In ogni caso resta la garanzia legale: se Tanetto Plus o i Tanì non funzionano come descritto, scrivici e lo sistemiamo; se non ci riusciamo, puoi chiedere una riduzione del prezzo o il rimborso, come prevede la legge. Restano valide anche le [regole di rimborso di Google Play](@REF)."]),
  ("11. Cambiamenti e disponibilità", [
   "Lavoriamo perché Tanetto funzioni bene e migliori, quindi alcune funzioni possono cambiare nel tempo. Durante un periodo già pagato non togliamo i vantaggi principali di Plus; se un cambiamento ti riguarda in modo importante, te lo diciamo prima nell'app o su questo sito.",
   "A volte Tanetto potrebbe non essere disponibile, per esempio durante gli aggiornamenti o quando i servizi di Google hanno problemi. Se un giorno smettessimo di offrire Tanetto, te lo diremo prima: gli abbonamenti non verranno rinnovati e avrai quello che la legge prevede per l'eventuale periodo già pagato e non usato.",
   "Se cambiamo queste condizioni, pubblichiamo la nuova versione in questa pagina con la sua data; se i cambiamenti sono importanti, te lo diciamo nell'app prima che valgano. I cambiamenti non toccano gli acquisti già fatti."]),
  ("12. Responsabilità", ["Rispondiamo del fatto che Tanetto funzioni come descritto in queste condizioni e come richiede la legge a tutela dei consumatori. Non rispondiamo dei problemi che non dipendono da noi, come il telefono, la connessione a internet o i servizi di altre aziende, per esempio Google. Tanetto non dà consigli medici: per le decisioni sulla tua salute, parla con un professionista. Niente in queste condizioni limita la nostra responsabilità dove la legge non lo permette, per esempio per dolo o colpa grave o per danni alla vita, al corpo o alla salute, e niente limita i tuoi diritti di consumatore."]),
  ("13. Legge, foro e reclami", [
   "Queste condizioni sono regolate dalla legge italiana. Se sei un consumatore, mantieni anche la tutela delle norme inderogabili del Paese in cui vivi.",
   "Se sei un consumatore nell'Unione Europea, puoi agire davanti ai giudici del Paese in cui vivi, e noi possiamo agire contro di te solo lì; in Italia è competente il giudice del luogo in cui risiedi o hai il domicilio (art. 66-bis del Codice del consumo).",
   "Per qualsiasi reclamo scrivici prima a {E}: ti rispondiamo il prima possibile. Se vivi nell'Unione Europea, puoi anche chiedere aiuto gratuito al [Centro europeo dei consumatori del tuo Paese](@ECC)."]),
 ],
}

T["de"] = {
 "title": "Nutzungsbedingungen", "upd": "Zuletzt aktualisiert: {date}",
 "intro": "Diese Bedingungen gelten, wenn du Tanetto nutzt, sowohl die App für Android als auch die Version, die im Browser läuft. Lies sie zusammen mit der Datenschutzerklärung ({P}). Wenn etwas unklar ist, frag einen Erwachsenen, dem du vertraust, oder schreib uns.",
 "s": [
  ("1. Wer wir sind", ["Tanetto wird von {OWNER}, Italien, entwickelt, also vom in der Datenschutzerklärung genannten Anbieter des Dienstes ({P}). Du kannst uns zu allem schreiben, auch für Beschwerden und Widerrufe: {E}. Google Play zeigt außerdem die Kontaktdaten des Entwicklers auf der Seite von Tanetto."]),
  ("2. Was Tanetto ist", ["Tanetto hilft dir, mit einem virtuellen Begleiter kleine tägliche Gewohnheiten aufzubauen. Es ist eine App für Wohlbefinden und Gewohnheiten, kein medizinischer oder psychologischer Dienst, und ersetzt keine professionelle Hilfe. Wenn du in Gefahr bist oder dringend Hilfe brauchst, ruf die Notrufnummer deines Landes an; im Tagebuch findest du außerdem Hilfetelefone für dein Land."]),
  ("3. Wer Tanetto nutzen kann", [
   "Tanetto ist für Menschen ab 13 Jahren gedacht und richtet sich nicht an Kinder unter 13. Die App fragt nach Geburtsmonat und -jahr: Es ist das Alter, das du selbst angibst, und wir können es nicht überprüfen. Wenn du ein Alter unter 13 angibst oder es lieber nicht sagst, läuft Tanetto im geschützten Modus, wie in der Datenschutzerklärung beschrieben.",
   "Wenn du minderjährig bist, nutze Tanetto mit dem Einverständnis deiner Eltern oder einer erziehungsberechtigten Person und frag sie, bevor du etwas kaufst. Käufe laufen über das Google-Konto auf dem Handy: Eltern können in Google Play einstellen, dass vor jedem Kauf eine Zustimmung oder ein Passwort nötig ist."]),
  ("4. Tanetto Plus", [
   "Tanetto kann kostenlos heruntergeladen werden, und das Wichtigste bleibt kostenlos. Tanetto Plus ist ein freiwilliges Abo, monatlich oder jährlich, mit den Extras, die in der App vor dem Kauf beschrieben sind. In Italien kostet es 4,99 € im Monat oder 44,99 € im Jahr, inklusive Mehrwertsteuer; in anderen Ländern zeigt Google Play den Preis vor der Bestätigung in deiner Währung an, und dieser Preis gilt.",
   "Zahlung, Verlängerungen, Kündigungen und Erstattungen wickelt Google Play nach seinen eigenen Bedingungen ab: Deine Karten- oder Zahlungsdaten erhalten wir nie.",
   "Ein Tarif kann eine kostenlose Testphase für berechtigte neue Abonnenten enthalten: Google Play zeigt, wie lange sie dauert und wann die erste Zahlung fällig ist. Wenn du nicht vor dem Ende der Testphase kündigst, beginnt das Abo und wird berechnet.",
   "Das Abo verlängert sich am Ende jedes Zeitraums automatisch, bis du es in Google Play › Abos kündigst. Die Kündigung stoppt die nächste Verlängerung, und Plus bleibt bis zum Ende des bereits bezahlten Zeitraums aktiv. Wenn sich der Preis ändert, informiert dich Google Play vorher und bittet dich, wo nötig, um deine Zustimmung.",
   "Plus funktioniert in der Android-App und ist an das Google-Konto gebunden, mit dem du es gekauft hast: Auf einem anderen Handy mit demselben Konto kannst du es wiederherstellen."]),
  ("5. Tanì", [
   "Tanì sind die Münzen der App. Du verdienst sie, indem du mit Tanetto gut für dich sorgst, und du kannst auch Tanì-Pakete über Google Play kaufen, zu dem Preis, der vor der Bestätigung angezeigt wird. Gekaufte Tanì werden sofort gutgeschrieben.",
   "Tanì sind eine virtuelle Währung nur für die App: Sie sind kein Geld, haben keinen Geldwert, können nicht in Geld umgetauscht und nicht an andere Personen übertragen werden. Tanì aus Paketen gelten im ganzen Laden außer für die unauffindbaren Schätze: Die gibt es nur für Tanì, die du verdienst, indem du gut für dich sorgst.",
   "Tanì und dein Fortschritt werden auf deinem Gerät gespeichert und, wenn du ein Konto hast, im Online-Backup. Wenn du die Daten der App löschst oder ohne Backup oder gespeicherte Kopie von vorn anfängst, können wir sie nicht wiederherstellen."]),
  ("6. Werbung", ["In Tanetto gibt es keine Werbung, die von selbst startet. In der Android-App kannst du dich entscheiden, ein kurzes Video von Google AdMob anzusehen, um eine kleine Belohnung zu bekommen, bis zu 5 am Tag. Mit Tanetto Plus gibt es keine Werbung, und unter 13 gibt es überhaupt keine; für Minderjährige und für alle, die ihr Alter nicht angeben, werden die Videos nie personalisiert. Die Videos hängen von Google ab: Manchmal ist vielleicht keines verfügbar."]),
  ("7. Konto und Online-Backup", [
   "Du brauchst kein Konto. Wenn du nach dem Datenschutzrecht deines Landes alt genug bist (13 bis 16 Jahre, je nach Land), kannst du ein freiwilliges Konto mit Google oder mit E-Mail und Passwort erstellen, um deinen Fortschritt kostenlos online zu sichern. Bewahre dein Passwort sicher auf und teile dein Konto mit niemandem.",
   "Das Online-Backup ist ein kostenloses Extra: Wir tun unser Bestes, damit es funktioniert, empfehlen dir aber, mit „Kopie speichern“ auch eine Kopie auf deinem Gerät zu behalten. Du kannst Konto und Online-Backup jederzeit unter Profil › Konto und Daten › Konto verwalten › Profil löschen oder auf {D} löschen."]),
  ("8. Nutzungsregeln", [
   "Tanetto ist für deine persönliche, nicht kommerzielle Nutzung gedacht. Bitte:",
   ["kopiere, verändere, verkaufe oder verbreite die App oder ihre Inhalte nicht;",
    "versuche nicht, Tanì, Plus oder Belohnungen auf Wegen zu bekommen, die die App nicht vorsieht, zum Beispiel mit einer veränderten App, falschen Käufen oder falschen Einladungen;",
    "versuche nicht, in Konten oder Daten anderer Personen einzudringen oder den Dienst zu stören;",
    "nutze Tanetto nicht auf eine Weise, die gegen das Gesetz verstößt."],
   "Wenn die App „Freunde einladen“ anbietet (nur ab 18 Jahren), gelten die Belohnungen und Grenzen, die in der App angezeigt werden; durch Schummeln erhaltene Belohnungen stehen dir nicht zu. Wenn ein Konto genutzt wird, um gegen diese Regeln zu verstoßen, können wir es sperren oder löschen und sagen dir, wenn möglich, warum; Erstattungen, die dir gesetzlich zustehen, bleiben davon unberührt."]),
  ("9. Deine Inhalte und unsere", ["Was du in Tanetto schreibst, gehört dir. Es bleibt auf deinem Gerät und, wenn du ein Konto hast, in deinem Online-Backup, das nur zur Wiederherstellung dient (siehe Datenschutzerklärung). Illustrationen, Figuren, Texte, Musik und Code von Tanetto sind urheberrechtlich geschützt und dürfen ohne Erlaubnis nicht kopiert oder wiederverwendet werden; die Bilder aus dem Pressekit dürfen genutzt werden, um über Tanetto zu berichten. Die Open-Source-Komponenten und ihre Lizenzen findest du auf {LIC}."]),
  ("10. Widerrufsrecht und gesetzliche Gewährleistung", [
   "Wenn du Verbraucher in der Europäischen Union oder im Vereinigten Königreich bist, hast du nach dem Gesetz normalerweise 14 Tage Zeit, einen online getätigten Kauf ohne Angabe von Gründen zu widerrufen.",
   "Tanì und Tanetto Plus sind digitale Inhalte, die sofort bereitgestellt werden. Wenn du sie bei Google Play kaufst, stimmst du der sofortigen Bereitstellung zu und bestätigst, dass du dein Widerrufsrecht verlierst, sobald die Bereitstellung begonnen hat ([Regeln von Google Play](@EEA)). Eine kostenlose Testphase kostet nichts, und du kannst sie vor ihrem Ende jederzeit kündigen.",
   "Wenn dir das Widerrufsrecht noch zusteht, kannst du es innerhalb von 14 Tagen nach dem Kauf ausüben, indem du bei Google Play eine Erstattung beantragst oder an {E} eine eindeutige Erklärung schreibst, zum Beispiel: „Ich widerrufe den Kauf von [Produkt] vom [Datum], Google-Play-Bestellnummer [GPA…]“. Wir antworten unverzüglich, und ein wirksamer Widerruf wird über Google Play mit demselben Zahlungsmittel erstattet.",
   "In jedem Fall bleibt dir die gesetzliche Gewährleistung: Wenn Tanetto Plus oder Tanì nicht wie beschrieben funktionieren, schreib uns, und wir beheben das; wenn uns das nicht gelingt, kannst du eine Preisminderung oder eine Erstattung verlangen, wie es das Gesetz vorsieht. Auch die [Erstattungsrichtlinien von Google Play](@REF) gelten weiter."]),
  ("11. Änderungen und Verfügbarkeit", [
   "Wir arbeiten daran, dass Tanetto gut funktioniert und besser wird; deshalb können sich manche Funktionen mit der Zeit ändern. Während eines bereits bezahlten Zeitraums nehmen wir dir die wichtigsten Vorteile von Plus nicht weg; wenn dich eine Änderung erheblich betrifft, sagen wir es dir vorher in der App oder auf dieser Website.",
   "Tanetto kann manchmal nicht verfügbar sein, zum Beispiel während Updates oder wenn Dienste von Google Probleme haben. Sollten wir Tanetto eines Tages nicht mehr anbieten, sagen wir es dir vorher: Abos werden nicht verlängert, und für einen bereits bezahlten, nicht genutzten Zeitraum bekommst du, was das Gesetz vorsieht.",
   "Wenn wir diese Bedingungen ändern, veröffentlichen wir die neue Fassung mit Datum auf dieser Seite; bei wichtigen Änderungen sagen wir es dir in der App, bevor sie gelten. Änderungen betreffen keine bereits getätigten Käufe."]),
  ("12. Haftung", ["Wir sind dafür verantwortlich, dass Tanetto so bereitgestellt wird, wie in diesen Bedingungen beschrieben und wie es das Verbraucherrecht verlangt. Wir haften nicht für Probleme, die nicht von uns abhängen, etwa das Handy, die Internetverbindung oder die Dienste anderer Unternehmen wie Google. Tanetto gibt keine medizinischen Ratschläge: Sprich für Entscheidungen über deine Gesundheit mit einer Fachperson. Nichts in diesen Bedingungen beschränkt unsere Haftung, wo das Gesetz es nicht erlaubt, zum Beispiel bei Vorsatz oder grober Fahrlässigkeit oder bei Verletzung des Lebens, des Körpers oder der Gesundheit, und nichts beschränkt deine Rechte als Verbraucher."]),
  ("13. Recht, Gerichtsstand und Beschwerden", [
   "Für diese Bedingungen gilt italienisches Recht. Als Verbraucher behältst du außerdem den Schutz der zwingenden Vorschriften des Landes, in dem du lebst.",
   "Wenn du Verbraucher in der Europäischen Union bist, kannst du vor den Gerichten des Landes klagen, in dem du lebst, und wir können nur dort gegen dich klagen; in Italien ist das Gericht des Ortes zuständig, an dem du wohnst oder deinen Wohnsitz hast (Art. 66-bis des italienischen Verbrauchergesetzbuchs).",
   "Bei Beschwerden schreib uns bitte zuerst an {E}: Wir antworten so schnell wie möglich. Wenn du in der Europäischen Union lebst, kannst du dir auch kostenlos Hilfe beim [Europäischen Verbraucherzentrum deines Landes](@ECC) holen."]),
 ],
}

T["es"] = {
 "title": "Condiciones de uso", "upd": "Última actualización: {date}",
 "intro": "Estas condiciones se aplican cuando usas Tanetto, tanto la app para Android como la versión que funciona en el navegador. Léelas junto con la política de privacidad ({P}). Si algo no está claro, pregunta a un adulto de confianza o escríbenos.",
 "s": [
  ("1. Quiénes somos", ["Tanetto está hecha por {OWNER}, Italia, es decir, por el titular del servicio indicado en la política de privacidad ({P}). Puedes escribirnos para cualquier cosa, también reclamaciones y desistimientos, a {E}. Google Play también muestra los datos de contacto del desarrollador en la página de Tanetto."]),
  ("2. Qué es Tanetto", ["Tanetto te ayuda a crear pequeños hábitos diarios con un compañero virtual. Es una app de bienestar y hábitos, no un servicio médico ni psicológico, y no sustituye la ayuda de un profesional. Si estás en peligro o necesitas ayuda urgente, llama al número de emergencias de tu país; en el diario también encontrarás líneas de ayuda de tu país."]),
  ("3. Quién puede usarla", [
   "Tanetto está pensada para personas a partir de 13 años y no está dirigida a menores de 13. La app pregunta el mes y el año de nacimiento: es la edad que declaras tú y no podemos comprobarla. Si indicas menos de 13 años, o prefieres no decirlo, Tanetto funciona en modo protegido, como explica la política de privacidad.",
   "Si eres menor de edad, usa Tanetto con el permiso de tu madre, tu padre o tu tutor, y pregúntales antes de comprar algo. Las compras se hacen con la cuenta de Google del teléfono: los padres pueden configurar Google Play para que pida una aprobación o una contraseña antes de cada compra."]),
  ("4. Tanetto Plus", [
   "Tanetto se descarga gratis y lo esencial sigue siendo gratis. Tanetto Plus es una suscripción opcional, mensual o anual, con los extras que se describen en la app antes de comprar. En Italia cuesta 4,99 € al mes o 44,99 € al año, IVA incluido; en otros países Google Play muestra el precio en tu moneda antes de confirmar, y ese es el precio que se aplica.",
   "Los pagos, las renovaciones, las cancelaciones y los reembolsos los gestiona Google Play, según sus propias condiciones: nunca recibimos los datos de tu tarjeta ni de tu pago.",
   "Un plan puede incluir una prueba gratuita para los nuevos suscriptores que cumplan los requisitos: Google Play muestra cuánto dura y cuándo se hace el primer pago. Si no cancelas antes de que termine la prueba, la suscripción empieza y se cobra.",
   "La suscripción se renueva sola al final de cada periodo hasta que la canceles en Google Play › Suscripciones. La cancelación detiene la siguiente renovación y Plus sigue activo hasta el final del periodo ya pagado. Si el precio cambia, Google Play te avisa antes y, cuando es necesario, te pide que lo aceptes.",
   "Plus funciona en la app para Android y está vinculado a la cuenta de Google con la que lo compraste: en otro teléfono con la misma cuenta puedes recuperarlo."]),
  ("5. Tanì", [
   "Los Tanì son las monedas de la app. Los ganas cuidándote con Tanetto y también puedes comprar paquetes de Tanì a través de Google Play, al precio que se muestra antes de confirmar. Los Tanì comprados llegan al momento.",
   "Los Tanì son una moneda virtual para usar solo dentro de la app: no son dinero, no tienen valor económico, no se pueden cambiar por dinero ni pasar a otras personas. Los Tanì de los paquetes sirven para toda la tienda menos para los Inencontrables: esos solo se compran con los Tanì que ganas cuidándote.",
   "Los Tanì y tu progreso se guardan en tu dispositivo y, si tienes cuenta, en la copia en línea. Si borras los datos de la app o empiezas de cero sin una copia de seguridad o una copia guardada, no podemos recuperarlos."]),
  ("6. Anuncios", ["En Tanetto no hay anuncios que aparezcan solos. En la app para Android puedes elegir ver un vídeo corto, ofrecido por Google AdMob, para recibir una pequeña recompensa, hasta 5 al día. Con Tanetto Plus no hay anuncios, y con menos de 13 años no hay ninguno; para los menores de edad y para quien no dice su edad, los vídeos nunca son personalizados. Los vídeos dependen de Google: a veces puede que no haya ninguno disponible."]),
  ("7. Cuenta y copia en línea", [
   "No necesitas una cuenta. Si tienes la edad que exige la ley de privacidad de tu país (de 13 a 16 años, según el país), puedes crear una cuenta opcional con Google o con correo y contraseña para guardar gratis tu progreso en línea. Guarda bien tu contraseña y no compartas tu cuenta con nadie.",
   "La copia en línea es un extra gratuito: hacemos todo lo posible para que funcione, pero te recomendamos guardar también una copia en tu dispositivo con «Guardar una copia». Puedes eliminar tu cuenta y la copia en línea cuando quieras en Perfil › Cuenta y datos › Gestionar cuenta › Eliminar perfil, o en {D}."]),
  ("8. Normas de uso", [
   "Tanetto es para tu uso personal y no comercial. Te pedimos que no:",
   ["copies, modifiques, revendas ni distribuyas la app o su contenido;",
    "intentes conseguir Tanì, Plus o recompensas de formas que la app no ofrece, por ejemplo con una app modificada, compras falsas o invitaciones falsas;",
    "intentes entrar en cuentas o datos de otras personas, ni alteres el servicio;",
    "uses Tanetto de formas contrarias a la ley."],
   "Si la app ofrece «Invitar a un amigo» (solo para mayores de 18 años), las recompensas y los límites son los que se indican en la app, y las recompensas obtenidas con trampas no corresponden. Si una cuenta se usa para incumplir estas normas, podemos suspenderla o eliminarla, explicándote el motivo cuando sea posible; esto no afecta a los reembolsos que te correspondan por ley."]),
  ("9. Tu contenido y el nuestro", ["Lo que escribes en Tanetto es tuyo. Se queda en tu dispositivo y, si tienes cuenta, en tu copia en línea, que solo sirve para restaurarlo (consulta la política de privacidad). Las ilustraciones, personajes, textos, música y código de Tanetto están protegidos por derechos de autor y no se pueden copiar ni reutilizar sin permiso; las imágenes del kit de prensa se pueden usar para hablar de Tanetto. Los componentes de código abierto y sus licencias están en {LIC}."]),
  ("10. Derecho de desistimiento y garantía legal", [
   "Si eres consumidor en la Unión Europea o en el Reino Unido, la ley normalmente te da 14 días para desistir de una compra hecha en línea, sin dar explicaciones.",
   "Los Tanì y Tanetto Plus son contenido digital que se entrega al momento. Al comprarlos en Google Play aceptas la entrega inmediata y reconoces que pierdes el derecho de desistimiento una vez iniciada la entrega ([normas de Google Play](@EEA)). La prueba gratuita no cuesta nada y puedes cancelarla cuando quieras antes de que termine.",
   "Si todavía tienes derecho de desistimiento, puedes ejercerlo en los 14 días siguientes a la compra pidiendo el reembolso a Google Play, o escribiendo a {E} una declaración clara, por ejemplo: «Desisto de la compra de [producto] hecha el [fecha], número de pedido de Google Play [GPA…]». Te respondemos sin demora, y un desistimiento válido se reembolsa a través de Google Play, con el mismo método de pago.",
   "En cualquier caso, mantienes la garantía legal: si Tanetto Plus o los Tanì no funcionan como se describe, escríbenos y lo arreglamos; si no lo conseguimos, puedes pedir una rebaja del precio o el reembolso, como prevé la ley. También siguen vigentes las [políticas de reembolso de Google Play](@REF)."]),
  ("11. Cambios y disponibilidad", [
   "Trabajamos para que Tanetto funcione bien y mejore, así que algunas funciones pueden cambiar con el tiempo. Durante un periodo ya pagado no quitamos las ventajas principales de Plus; si un cambio te afecta de forma importante, te avisamos antes en la app o en este sitio.",
   "A veces Tanetto puede no estar disponible, por ejemplo durante las actualizaciones o cuando los servicios de Google tienen problemas. Si un día dejamos de ofrecer Tanetto, te avisaremos antes: las suscripciones no se renovarán y recibirás lo que prevé la ley por el periodo ya pagado y no usado.",
   "Si cambiamos estas condiciones, publicaremos la nueva versión en esta página con su fecha; si los cambios son importantes, te avisaremos en la app antes de que se apliquen. Los cambios no afectan a las compras ya hechas."]),
  ("12. Responsabilidad", ["Respondemos de que Tanetto funcione como se describe en estas condiciones y como exige la ley de protección de los consumidores. No respondemos de los problemas que no dependen de nosotros, como el teléfono, la conexión a internet o los servicios de otras empresas, como Google. Tanetto no da consejos médicos: para decisiones sobre tu salud, habla con un profesional. Nada en estas condiciones limita nuestra responsabilidad cuando la ley no lo permite, por ejemplo en caso de dolo o culpa grave o de daños a la vida, al cuerpo o a la salud, y nada limita tus derechos como consumidor."]),
  ("13. Ley, tribunales y reclamaciones", [
   "Estas condiciones se rigen por la ley italiana. Si eres consumidor, también conservas la protección de las normas imperativas del país donde vives.",
   "Si eres consumidor en la Unión Europea, puedes acudir a los tribunales del país donde vives, y nosotros solo podemos demandarte allí; en Italia es competente el juez del lugar de tu residencia o domicilio (art. 66-bis del Código de Consumo italiano).",
   "Para cualquier reclamación, escríbenos primero a {E}: te responderemos lo antes posible. Si vives en la Unión Europea, también puedes pedir ayuda gratuita al [Centro Europeo del Consumidor de tu país](@ECC)."]),
 ],
}

T["fr"] = {
 "title": "Conditions d'utilisation", "upd": "Dernière mise à jour : {date}",
 "intro": "Ces conditions s'appliquent quand tu utilises Tanetto, aussi bien l'app pour Android que la version qui fonctionne dans le navigateur. Lis-les avec la politique de confidentialité ({P}). Si quelque chose n'est pas clair, demande à un adulte de confiance ou écris-nous.",
 "s": [
  ("1. Qui sommes-nous", ["Tanetto est créé par {OWNER}, Italie, c'est-à-dire par l'exploitant du service indiqué dans la politique de confidentialité ({P}). Tu peux nous écrire pour tout, y compris les réclamations et les rétractations, à {E}. Google Play affiche aussi les coordonnées du développeur sur la page de Tanetto."]),
  ("2. Ce qu'est Tanetto", ["Tanetto t'aide à prendre de petites habitudes quotidiennes avec un compagnon virtuel. C'est une app de bien-être et d'habitudes, pas un service médical ou psychologique, et elle ne remplace pas l'aide d'un professionnel. Si tu es en danger ou si tu as besoin d'aide tout de suite, appelle le numéro d'urgence de ton pays ; le journal affiche aussi des lignes d'écoute de ton pays."]),
  ("3. Qui peut l'utiliser", [
   "Tanetto est pensé pour les personnes de 13 ans et plus et ne s'adresse pas aux enfants de moins de 13 ans. L'app demande le mois et l'année de naissance : c'est l'âge que tu déclares toi-même, et nous ne pouvons pas le vérifier. Si tu indiques moins de 13 ans, ou si tu préfères ne pas le dire, Tanetto fonctionne en mode protégé, comme l'explique la politique de confidentialité.",
   "Si tu as moins de 18 ans, utilise Tanetto avec l'accord d'un parent ou d'un tuteur, et demande-lui avant d'acheter quoi que ce soit. Les achats se font avec le compte Google du téléphone : les parents peuvent régler Google Play pour qu'il demande une approbation ou un mot de passe avant chaque achat."]),
  ("4. Tanetto Plus", [
   "Tanetto se télécharge gratuitement, et l'essentiel reste gratuit. Tanetto Plus est un abonnement facultatif, mensuel ou annuel, avec les extras décrits dans l'app avant l'achat. En Italie, il coûte 4,99 € par mois ou 44,99 € par an, TVA comprise ; dans les autres pays, Google Play affiche le prix dans ta devise avant que tu confirmes, et c'est ce prix qui s'applique.",
   "Les paiements, les renouvellements, les résiliations et les remboursements sont gérés par Google Play, selon ses propres conditions : nous ne recevons jamais les données de ta carte ou de ton paiement.",
   "Une formule peut inclure un essai gratuit pour les nouveaux abonnés éligibles : Google Play indique sa durée et la date du premier paiement. Si tu ne résilies pas avant la fin de l'essai, l'abonnement commence et il est facturé.",
   "L'abonnement se renouvelle automatiquement à la fin de chaque période jusqu'à ce que tu le résilies dans Google Play › Abonnements. La résiliation arrête le renouvellement suivant et Plus reste actif jusqu'à la fin de la période déjà payée. Si le prix change, Google Play te prévient à l'avance et, si nécessaire, te demande ton accord.",
   "Plus fonctionne dans l'app pour Android et il est lié au compte Google avec lequel tu l'as acheté : sur un autre téléphone avec le même compte, tu peux le récupérer."]),
  ("5. Tanì", [
   "Les Tanì sont les pièces de l'app. Tu les gagnes en prenant soin de toi avec Tanetto, et tu peux aussi acheter des packs de Tanì via Google Play, au prix affiché avant que tu confirmes. Les Tanì achetés arrivent tout de suite.",
   "Les Tanì sont une monnaie virtuelle à utiliser uniquement dans l'app : ce n'est pas de l'argent, ils n'ont aucune valeur monétaire et ne peuvent être ni échangés contre de l'argent ni transférés à d'autres personnes. Les Tanì des packs valent pour toute la boutique sauf les Introuvables : ceux-là s'achètent seulement avec les Tanì gagnés en prenant soin de toi.",
   "Les Tanì et ta progression sont enregistrés sur ton appareil et, si tu as un compte, dans la sauvegarde en ligne. Si tu effaces les données de l'app ou si tu recommences à zéro sans sauvegarde ni copie enregistrée, nous ne pouvons pas les récupérer."]),
  ("6. Publicité", ["Dans Tanetto, aucune publicité ne se lance toute seule. Dans l'app pour Android, tu peux choisir de regarder une courte vidéo, fournie par Google AdMob, pour recevoir une petite récompense, jusqu'à 5 par jour. Avec Tanetto Plus, il n'y a pas de publicité, et avant 13 ans il n'y en a aucune ; pour les mineurs et pour ceux qui ne donnent pas leur âge, les vidéos ne sont jamais personnalisées. Les vidéos dépendent de Google : parfois, il se peut qu'aucune ne soit disponible."]),
  ("7. Compte et sauvegarde en ligne", [
   "Tu n'as pas besoin de compte. Si tu as l'âge prévu par la loi sur la protection des données de ton pays (de 13 à 16 ans selon le pays), tu peux créer un compte facultatif avec Google ou avec un e-mail et un mot de passe, pour sauvegarder gratuitement ta progression en ligne. Garde ton mot de passe en sécurité et ne partage ton compte avec personne.",
   "La sauvegarde en ligne est un service gratuit en plus : nous faisons de notre mieux pour qu'elle fonctionne, mais nous te conseillons de garder aussi une copie sur ton appareil avec « Enregistrer une copie ». Tu peux supprimer ton compte et ta sauvegarde en ligne à tout moment dans Profil › Compte et données › Gérer le compte › Supprimer le profil, ou sur {D}."]),
  ("8. Règles d'utilisation", [
   "Tanetto est destiné à ton usage personnel et non commercial. Merci de ne pas :",
   ["copier, modifier, revendre ou distribuer l'app ou son contenu ;",
    "essayer d'obtenir des Tanì, Plus ou des récompenses par des moyens que l'app ne prévoit pas, par exemple avec une app modifiée, de faux achats ou de fausses invitations ;",
    "essayer d'accéder aux comptes ou aux données d'autres personnes, ou perturber le service ;",
    "utiliser Tanetto d'une manière contraire à la loi."],
   "Si l'app propose « Inviter un ami » (réservé aux 18 ans et plus), les récompenses et les limites sont celles indiquées dans l'app, et les récompenses obtenues en trichant ne sont pas dues. Si un compte est utilisé pour enfreindre ces règles, nous pouvons le suspendre ou le supprimer, en t'expliquant pourquoi quand c'est possible ; cela ne change rien aux remboursements auxquels tu as droit selon la loi."]),
  ("9. Ton contenu et le nôtre", ["Ce que tu écris dans Tanetto t'appartient. Cela reste sur ton appareil et, si tu as un compte, dans ta sauvegarde en ligne, qui sert uniquement à le restaurer (voir la politique de confidentialité). Les illustrations, personnages, textes, musiques et le code de Tanetto sont protégés par le droit d'auteur et ne peuvent pas être copiés ou réutilisés sans autorisation ; les images du kit presse peuvent être utilisées pour parler de Tanetto. Les composants open source et leurs licences sont listés sur {LIC}."]),
  ("10. Droit de rétractation et garantie légale", [
   "Si tu es un consommateur dans l'Union européenne ou au Royaume-Uni, la loi te donne normalement 14 jours pour te rétracter d'un achat fait en ligne, sans donner de raison.",
   "Les Tanì et Tanetto Plus sont des contenus numériques fournis immédiatement. Quand tu les achètes sur Google Play, tu acceptes la fourniture immédiate et tu reconnais perdre ton droit de rétractation dès que la fourniture a commencé ([règles de Google Play](@EEA)). Un essai gratuit ne coûte rien, et tu peux le résilier à tout moment avant qu'il se termine.",
   "Si tu as encore un droit de rétractation, tu peux l'exercer dans les 14 jours suivant l'achat en demandant un remboursement à Google Play, ou en écrivant à {E} une déclaration claire, par exemple : « Je me rétracte de l'achat de [produit] fait le [date], numéro de commande Google Play [GPA…] ». Nous te répondons sans retard, et une rétractation valable est remboursée via Google Play, avec le même moyen de paiement.",
   "Dans tous les cas, tu gardes la garantie légale : si Tanetto Plus ou les Tanì ne fonctionnent pas comme décrit, écris-nous et nous corrigeons le problème ; si nous n'y arrivons pas, tu peux demander une réduction du prix ou un remboursement, comme le prévoit la loi. Les [règles de remboursement de Google Play](@REF) restent aussi valables."]),
  ("11. Changements et disponibilité", [
   "Nous faisons en sorte que Tanetto fonctionne bien et s'améliore, donc certaines fonctions peuvent changer avec le temps. Pendant une période déjà payée, nous ne retirons pas les principaux avantages de Plus ; si un changement te concerne de façon importante, nous te prévenons à l'avance dans l'app ou sur ce site.",
   "Il peut arriver que Tanetto ne soit pas disponible, par exemple pendant les mises à jour ou quand les services de Google ont des problèmes. Si un jour nous arrêtons de proposer Tanetto, nous te préviendrons à l'avance : les abonnements ne seront pas renouvelés et tu recevras ce que la loi prévoit pour une éventuelle période déjà payée et non utilisée.",
   "Si nous modifions ces conditions, nous publions la nouvelle version sur cette page avec sa date ; si les changements sont importants, nous te prévenons dans l'app avant qu'ils s'appliquent. Les changements ne concernent pas les achats déjà faits."]),
  ("12. Responsabilité", ["Nous sommes responsables de fournir Tanetto tel qu'il est décrit dans ces conditions et comme l'exige le droit de la consommation. Nous ne sommes pas responsables des problèmes qui ne dépendent pas de nous, comme le téléphone, la connexion internet ou les services d'autres entreprises, par exemple Google. Tanetto ne donne pas de conseils médicaux : pour les décisions sur ta santé, parles-en à un professionnel. Rien dans ces conditions ne limite notre responsabilité lorsque la loi ne le permet pas, par exemple en cas de faute intentionnelle ou lourde ou d'atteinte à la vie, à l'intégrité physique ou à la santé, et rien ne limite tes droits de consommateur."]),
  ("13. Loi applicable, tribunaux et réclamations", [
   "Ces conditions sont régies par le droit italien. En tant que consommateur, tu gardes aussi la protection des règles impératives du pays où tu vis.",
   "Si tu es un consommateur dans l'Union européenne, tu peux saisir les tribunaux du pays où tu vis, et nous ne pouvons agir contre toi que là-bas ; en Italie, le juge compétent est celui du lieu de ta résidence ou de ton domicile (art. 66-bis du Code de la consommation italien).",
   "Pour toute réclamation, écris-nous d'abord à {E} : nous te répondrons au plus vite. Si tu vis dans l'Union européenne, tu peux aussi demander une aide gratuite au [Centre européen des consommateurs de ton pays](@ECC)."]),
 ],
}

T["pt"] = {
 "title": "Termos de uso", "upd": "Última atualização: {date}",
 "intro": "Estes termos valem quando você usa o Tanetto, tanto o app para Android quanto a versão que funciona no navegador. Leia-os junto com a política de privacidade ({P}). Se algo não estiver claro, pergunte a um adulto de confiança ou escreva para nós.",
 "s": [
  ("1. Quem somos", ["O Tanetto é feito por {OWNER}, Itália, que é o responsável pelo serviço indicado na política de privacidade ({P}). Você pode nos escrever sobre qualquer assunto, inclusive reclamações e arrependimentos, em {E}. O Google Play também mostra os dados de contato do desenvolvedor na página do Tanetto."]),
  ("2. O que é o Tanetto", ["O Tanetto ajuda você a criar pequenos hábitos diários com um companheiro virtual. É um app de bem-estar e hábitos, não um serviço médico ou psicológico, e não substitui a ajuda de um profissional. Se você estiver em perigo ou precisar de ajuda urgente, ligue para o número de emergência do seu país; no diário você também encontra linhas de ajuda do seu país."]),
  ("3. Quem pode usar", [
   "O Tanetto foi pensado para pessoas a partir de 13 anos e não é direcionado a crianças menores de 13. O app pergunta o mês e o ano de nascimento: é a idade que você mesmo declara, e não podemos verificá-la. Se você informar menos de 13 anos, ou preferir não dizer, o Tanetto funciona no modo protegido, como explica a política de privacidade.",
   "Se você for menor de idade, use o Tanetto com a concordância de um responsável e pergunte a ele antes de comprar qualquer coisa. As compras são feitas com a conta do Google do celular: os pais podem configurar o Google Play para pedir aprovação ou senha antes de cada compra."]),
  ("4. Tanetto Plus", [
   "O Tanetto é gratuito para baixar, e o essencial continua grátis. O Tanetto Plus é uma assinatura opcional, mensal ou anual, com os extras descritos no app antes da compra. Na Itália custa 4,99 € por mês ou 44,99 € por ano, com IVA incluído; nos outros países, o Google Play mostra o preço na sua moeda antes da confirmação, e é esse o preço que vale.",
   "Pagamentos, renovações, cancelamentos e reembolsos são feitos pelo Google Play, conforme os termos dele: nunca recebemos os dados do seu cartão ou do seu pagamento.",
   "Um plano pode incluir um teste gratuito para novos assinantes elegíveis: o Google Play mostra quanto tempo dura e quando vence o primeiro pagamento. Se você não cancelar antes do fim do teste, a assinatura começa e é cobrada.",
   "A assinatura renova automaticamente no fim de cada período até você cancelar em Google Play › Assinaturas. O cancelamento interrompe a próxima renovação e o Plus continua ativo até o fim do período já pago. Se o preço mudar, o Google Play avisa você antes e, quando necessário, pede a sua concordância.",
   "O Plus funciona no app para Android e fica vinculado à conta do Google com a qual você comprou: em outro celular com a mesma conta, você pode recuperá-lo."]),
  ("5. Tanì", [
   "Os Tanì são as moedas do app. Você ganha Tanì cuidando de si com o Tanetto e também pode comprar pacotes de Tanì pelo Google Play, pelo preço mostrado antes da confirmação. Os Tanì comprados chegam na hora.",
   "Os Tanì são uma moeda virtual para usar só dentro do app: não são dinheiro, não têm valor em dinheiro, não podem ser trocados por dinheiro nem passados para outras pessoas. Os Tanì dos pacotes valem para toda a loja, menos os Raríssimos: esses só se compram com os Tanì que você ganha cuidando de si.",
   "Os Tanì e o seu progresso ficam salvos no seu dispositivo e, se você tiver uma conta, no backup on-line. Se você apagar os dados do app ou recomeçar do zero sem backup ou cópia salva, não conseguimos recuperá-los."]),
  ("6. Anúncios", ["No Tanetto não há anúncios que aparecem sozinhos. No app para Android, você pode escolher assistir a um vídeo curto, fornecido pelo Google AdMob, para ganhar uma pequena recompensa, até 5 por dia. Com o Tanetto Plus não há anúncios, e abaixo de 13 anos não há nenhum; para menores de idade e para quem não informa a idade, os vídeos nunca são personalizados. Os vídeos dependem do Google: às vezes pode não haver nenhum disponível."]),
  ("7. Conta e backup on-line", [
   "Você não precisa de conta. Se tiver a idade exigida pela lei de privacidade do seu país (de 13 a 16 anos, dependendo do país), pode criar uma conta opcional com o Google ou com e-mail e senha, para fazer backup grátis do seu progresso on-line. Guarde sua senha com cuidado e não compartilhe sua conta com ninguém.",
   "O backup on-line é um extra gratuito: fazemos o possível para que funcione, mas recomendamos guardar também uma cópia no seu dispositivo com “Salvar uma cópia”. Você pode excluir sua conta e o backup on-line quando quiser em Perfil › Conta e dados › Gerenciar conta › Excluir perfil, ou em {D}."]),
  ("8. Regras de uso", [
   "O Tanetto é para uso pessoal e não comercial. Pedimos que você não:",
   ["copie, modifique, revenda ou distribua o app ou o conteúdo dele;",
    "tente conseguir Tanì, Plus ou recompensas de formas que o app não oferece, por exemplo com um app modificado, compras falsas ou convites falsos;",
    "tente entrar em contas ou dados de outras pessoas, nem atrapalhe o serviço;",
    "use o Tanetto de formas contrárias à lei."],
   "Se o app oferecer “Convidar um amigo” (só para maiores de 18 anos), as recompensas e os limites são os indicados no app, e recompensas obtidas trapaceando não são devidas. Se uma conta for usada para violar estas regras, podemos suspendê-la ou excluí-la, explicando o motivo quando possível; isso não afeta os reembolsos a que você tem direito por lei."]),
  ("9. Seu conteúdo e o nosso", ["O que você escreve no Tanetto é seu. Fica no seu dispositivo e, se você tiver uma conta, no seu backup on-line, que serve só para restaurá-lo (veja a política de privacidade). As ilustrações, personagens, textos, músicas e o código do Tanetto são protegidos por direitos autorais e não podem ser copiados ou reutilizados sem permissão; as imagens do kit de imprensa podem ser usadas para falar do Tanetto. Os componentes de código aberto e as licenças deles estão listados em {LIC}."]),
  ("10. Direito de arrependimento e garantia legal", [
   "Se você é consumidor na União Europeia ou no Reino Unido, a lei normalmente dá 14 dias para desistir de uma compra feita on-line, sem precisar explicar o motivo.",
   "Os Tanì e o Tanetto Plus são conteúdos digitais entregues na hora. Ao comprá-los no Google Play, você concorda com a entrega imediata e reconhece que perde o direito de arrependimento assim que a entrega começa ([regras do Google Play](@EEA)). O teste gratuito não custa nada, e você pode cancelá-lo quando quiser antes que termine.",
   "Se você ainda tiver direito de arrependimento, pode exercê-lo em até 14 dias após a compra pedindo o reembolso ao Google Play, ou escrevendo para {E} uma declaração clara, por exemplo: “Desisto da compra de [produto] feita em [data], número do pedido no Google Play [GPA…]”. Respondemos sem demora, e um arrependimento válido é reembolsado pelo Google Play, com a mesma forma de pagamento.",
   "Em todo caso, você mantém a garantia legal: se o Tanetto Plus ou os Tanì não funcionarem como descrito, escreva para nós e resolvemos; se não conseguirmos, você pode pedir uma redução do preço ou o reembolso, como prevê a lei. As [políticas de reembolso do Google Play](@REF) também continuam valendo."]),
  ("11. Mudanças e disponibilidade", [
   "Trabalhamos para que o Tanetto funcione bem e melhore, então algumas funções podem mudar com o tempo. Durante um período já pago, não tiramos as principais vantagens do Plus; se uma mudança afetar você de forma importante, avisamos antes no app ou neste site.",
   "Às vezes o Tanetto pode ficar indisponível, por exemplo durante atualizações ou quando os serviços do Google têm problemas. Se um dia deixarmos de oferecer o Tanetto, avisaremos antes: as assinaturas não serão renovadas e você receberá o que a lei prevê por um eventual período já pago e não usado.",
   "Se mudarmos estes termos, publicaremos a nova versão nesta página com a data; se as mudanças forem importantes, avisaremos no app antes que passem a valer. As mudanças não afetam compras já feitas."]),
  ("12. Responsabilidade", ["Respondemos pelo funcionamento do Tanetto como descrito nestes termos e como exige a lei de defesa do consumidor. Não respondemos por problemas que não dependem de nós, como o celular, a conexão com a internet ou os serviços de outras empresas, por exemplo o Google. O Tanetto não dá conselhos médicos: para decisões sobre a sua saúde, converse com um profissional. Nada nestes termos limita a nossa responsabilidade quando a lei não permite, por exemplo em caso de dolo ou culpa grave ou de danos à vida, ao corpo ou à saúde, e nada limita os seus direitos de consumidor."]),
  ("13. Lei, foro e reclamações", [
   "Estes termos são regidos pela lei italiana. Se você for consumidor, também mantém a proteção das normas obrigatórias do país onde mora.",
   "Se você é consumidor na União Europeia, pode entrar com uma ação nos tribunais do país onde mora, e nós só podemos processar você lá; na Itália, o foro competente é o do lugar da sua residência ou domicílio (art. 66-bis do Código do Consumo italiano).",
   "Para qualquer reclamação, escreva primeiro para {E}: respondemos o quanto antes. Se você mora na União Europeia, também pode pedir ajuda gratuita ao [Centro Europeu do Consumidor do seu país](@ECC)."]),
 ],
}

T["ja"] = {
 "title": "利用規約", "upd": "最終更新日：{date}",
 "intro": "この規約は、Android版アプリとブラウザで動くバージョンのどちらでも、Tanettoを使うときに適用されます。プライバシーポリシー（{P}）とあわせてお読みください。わからないことがあれば、信頼できる大人にたずねるか、私たちにご連絡ください。",
 "s": [
  ("1. 運営者", ["Tanettoは{OWNER}（イタリア）が作っています。サービスの運営者については、プライバシーポリシー（{P}）に記載しています。苦情や撤回の申し出を含め、どんなことでも{E}までご連絡ください。Google PlayのTanettoのページにも、デベロッパーの連絡先が表示されています。"]),
  ("2. Tanettoとは", ["Tanettoは、バーチャルのパートナーと一緒に毎日の小さな習慣を身につけるためのアプリです。ウェルビーイングと習慣づくりのアプリであり、医療や心理の専門サービスではなく、専門家による支援の代わりにはなりません。危険な状況にある場合やすぐに助けが必要な場合は、お住まいの地域の緊急通報番号に電話してください。日記には、お住まいの国の相談窓口も表示されます。"]),
  ("3. 利用できる人", [
   "Tanettoは13歳以上の方向けで、13歳未満の子どもを対象としていません。アプリは生まれた年と月をたずねます。これはご自身で申告する年齢で、私たちが確認することはできません。13歳未満の年齢を入力した場合、または答えなかった場合、Tanettoはプライバシーポリシーで説明しているとおり保護モードで動きます。",
   "未成年の方は、保護者の同意を得てTanettoを使い、何かを購入する前には保護者にたずねてください。購入はスマートフォンのGoogleアカウントで行われます。保護者は、購入のたびに承認やパスワードを求めるようGoogle Playを設定できます。"]),
  ("4. Tanetto Plus", [
   "Tanettoは無料でダウンロードでき、その中心となる機能はこれからも無料です。Tanetto Plusは任意の定期購入（月額または年額）で、購入前にアプリ内で説明している追加の内容が使えます。イタリアでの価格は月額4.99ユーロまたは年額44.99ユーロ（税込）です。ほかの国では、確定する前にGoogle Playがお住まいの国の通貨で価格を表示し、その価格が適用されます。",
   "支払い、更新、解約、返金は、Google Playが自社の規約に従って処理します。私たちがカードや支払いの情報を受け取ることはありません。",
   "プランによっては、対象となる新規の購読者向けに無料トライアルが付く場合があります。期間と最初の支払い日はGoogle Playに表示されます。トライアルが終わる前に解約しなかった場合、定期購入が始まり、料金が請求されます。",
   "定期購入は、Google Play › 定期購入で解約するまで、各期間の終わりに自動で更新されます。解約すると次回の更新が止まり、Plusはすでに支払った期間の終わりまで有効です。価格が変わる場合は、Google Playが事前にお知らせし、必要な場合は同意を求めます。",
   "PlusはAndroid版アプリで使え、購入に使ったGoogleアカウントにひも付けられます。同じアカウントなら、別のスマートフォンでも復元できます。"]),
  ("5. Tanì", [
   "Tanìはアプリ内のコインです。Tanettoで自分を大切にすることで手に入るほか、確定前に表示される価格で、Google Playを通じてTanìのパックを購入することもできます。購入したTanìはすぐに追加されます。",
   "Tanìはアプリ内だけで使える仮想通貨です。お金ではなく、金銭的な価値はなく、お金に交換したり、ほかの人に譲ったりすることはできません。パックのTanìは「幻のアイテム」を除くショップ全体で使えます。幻のアイテムは、自分を大切にして手に入れたTanìでしか購入できません。",
   "Tanìと進み具合は端末に保存され、アカウントがある場合はオンラインバックアップにも保存されます。バックアップや保存したコピーがないままアプリのデータを削除したり、最初からやり直したりした場合、私たちが元に戻すことはできません。"]),
  ("6. 広告", ["Tanettoには、勝手に表示される広告はありません。Android版アプリでは、Google AdMobが提供する短い動画を自分で選んで見ると、小さなごほうびがもらえます（1日5回まで）。Tanetto Plusでは広告はなく、13歳未満の場合も広告は一切ありません。未成年の方と年齢を答えなかった方には、動画がパーソナライズされることはありません。動画はGoogleが提供するため、見られる動画がないこともあります。"]),
  ("7. アカウントとオンラインバックアップ", [
   "アカウントは必要ありません。お住まいの国のプライバシー法で定められた年齢（国によって13歳から16歳）に達していれば、Googleまたはメールアドレスとパスワードで任意のアカウントを作り、進み具合を無料でオンラインにバックアップできます。パスワードは大切に管理し、アカウントを誰とも共有しないでください。",
   "オンラインバックアップは無料のおまけの機能です。いつも使えるよう努めていますが、「コピーを保存」で端末にもコピーを残しておくことをおすすめします。アカウントとオンラインバックアップは、「マイページ › アカウントとデータ › アカウントの管理 › プロフィールを削除」または{D}から、いつでも削除できます。"]),
  ("8. 利用のルール", [
   "Tanettoは、個人的で非営利の利用のためのものです。次のことはしないでください。",
   ["アプリやその内容をコピー、改変、転売、再配布すること。",
    "改造したアプリ、偽の購入、偽の招待など、アプリが用意していない方法でTanì、Plus、ごほうびを手に入れようとすること。",
    "ほかの人のアカウントやデータに入り込もうとすること、またはサービスを妨害すること。",
    "法律に反する方法でTanettoを使うこと。"],
   "アプリに「友だちを招待」（18歳以上の方のみ）がある場合、ごほうびと上限はアプリに表示されるとおりで、不正に得たごほうびは受け取れません。アカウントがこれらのルールに反して使われた場合、私たちはそのアカウントを停止または削除することがあり、可能な場合は理由をお伝えします。これは、法律で認められた返金には影響しません。"]),
  ("9. あなたのコンテンツと私たちのコンテンツ", ["Tanettoに書いたものはあなたのものです。それは端末に残り、アカウントがある場合はオンラインバックアップにも保存されます。オンラインバックアップは復元のためだけに使われます（プライバシーポリシーをご覧ください）。Tanettoのイラスト、キャラクター、文章、音楽、コードは著作権で保護されており、許可なくコピーしたり再利用したりすることはできません。プレスキットの画像は、Tanettoを紹介するために使えます。オープンソースのコンポーネントとそのライセンスは{LIC}に掲載しています。"]),
  ("10. 撤回権と法定保証", [
   "欧州連合または英国の消費者の場合、オンラインで購入したものは、通常、理由を示さずに14日以内に契約を撤回できる権利が法律で認められています。",
   "TanìとTanetto Plusは、すぐに提供されるデジタルコンテンツです。Google Playで購入するとき、あなたはすぐに提供を受けることに同意し、提供が始まると撤回権を失うことを了承します（[Google Playのルール](@EEA)）。無料トライアルは無料で、終了前ならいつでも解約できます。",
   "撤回権がまだある場合は、購入から14日以内に、Google Playに返金を依頼するか、{E}に撤回の意思をはっきり書いて送ることで行使できます。例：「[日付]に購入した[商品]（Google Playの注文番号[GPA…]）の契約を撤回します」。私たちは遅れることなく返信し、有効な撤回については、Google Playを通じて同じ支払い方法で返金します。",
   "いずれの場合も、法定保証は残ります。Tanetto PlusやTanìが説明どおりに動かない場合はご連絡ください。私たちが直します。直せない場合は、法律の定めに従って値下げや返金を求めることができます。[Google Playの返金ポリシー](@REF)も引き続き利用できます。"]),
  ("11. 変更と提供状況", [
   "Tanettoがよく動き、よりよくなるよう取り組んでいるため、一部の機能は時間とともに変わることがあります。すでに支払った期間中に、Plusの主な特典をなくすことはありません。あなたに大きく関わる変更がある場合は、事前にアプリまたはこのサイトでお知らせします。",
   "アップデート中やGoogleのサービスに問題があるときなど、Tanettoを使えないことがあります。いつかTanettoの提供をやめる場合は、事前にお知らせします。定期購入は更新されなくなり、すでに支払って使っていない期間がある場合は、法律の定めに従って対応します。",
   "この規約を変更する場合は、新しい版を日付とともにこのページに掲載します。重要な変更の場合は、適用される前にアプリでお知らせします。変更は、すでに行った購入には影響しません。"]),
  ("12. 責任", ["私たちは、この規約に書かれたとおり、また消費者保護の法律が求めるとおりにTanettoを提供する責任を負います。スマートフォン、インターネット接続、Googleなどほかの会社のサービスなど、私たちに原因のない問題については責任を負いません。Tanettoは医学的な助言をしません。健康に関する判断は専門家に相談してください。この規約のどの部分も、故意や重大な過失、生命・身体・健康への損害など、法律が制限を認めていない場合に私たちの責任を制限するものではなく、消費者としてのあなたの権利を制限するものでもありません。"]),
  ("13. 準拠法、裁判所、苦情", [
   "この規約にはイタリアの法律が適用されます。消費者の場合は、お住まいの国の強行規定による保護も受けられます。",
   "欧州連合の消費者の場合、お住まいの国の裁判所に訴えを起こすことができ、私たちがあなたに対して訴えを起こせるのもその国の裁判所だけです。イタリアでは、あなたの住所地または居所地の裁判所が管轄します（イタリア消費者法典第66条の2）。",
   "苦情がある場合は、まず{E}までご連絡ください。できるだけ早く返信します。欧州連合にお住まいの場合は、[お住まいの国の欧州消費者センター](@ECC)に無料で相談することもできます。"]),
 ],
}

T["ko"] = {
 "title": "이용 약관", "upd": "최종 업데이트: {date}",
 "intro": "이 약관은 Android 앱과 브라우저에서 실행되는 버전 모두에서 Tanetto를 사용할 때 적용돼요. 개인정보 처리방침({P})과 함께 읽어 주세요. 이해되지 않는 부분이 있으면 믿을 수 있는 어른에게 물어보거나 저희에게 연락해 주세요.",
 "s": [
  ("1. 운영자", ["Tanetto는 {OWNER}(이탈리아)가 만들어요. 서비스 운영자는 개인정보 처리방침({P})에 적혀 있어요. 불만이나 철회 요청을 포함해 무엇이든 {E}로 연락해 주세요. Google Play의 Tanetto 페이지에도 개발자 연락처가 나와 있어요."]),
  ("2. Tanetto란", ["Tanetto는 가상 친구와 함께 매일 작은 습관을 만들도록 돕는 앱이에요. 웰빙과 습관 앱이며, 의료나 심리 서비스가 아니고 전문가의 도움을 대신하지 않아요. 위험한 상황이거나 당장 도움이 필요하면 거주 지역의 긴급 전화번호로 연락하세요. 일기에서도 거주 국가의 상담 전화번호를 볼 수 있어요."]),
  ("3. 이용 대상", [
   "Tanetto는 만 13세 이상을 위한 앱이며, 만 13세 미만 어린이를 대상으로 하지 않아요. 앱은 태어난 연도와 월을 물어봐요. 이것은 직접 입력하는 나이이며, 저희가 확인할 수는 없어요. 만 13세 미만의 나이를 입력하거나 말하고 싶지 않다고 하면, 개인정보 처리방침에서 설명하는 대로 Tanetto는 보호 모드로 작동해요.",
   "미성년자라면 부모님이나 보호자의 동의를 받아 Tanetto를 사용하고, 무언가를 구매하기 전에는 꼭 물어보세요. 구매는 휴대폰의 Google 계정으로 이루어져요. 부모님은 구매할 때마다 승인이나 비밀번호를 요구하도록 Google Play를 설정할 수 있어요."]),
  ("4. Tanetto Plus", [
   "Tanetto는 무료로 다운로드할 수 있고, 핵심 기능은 앞으로도 무료예요. Tanetto Plus는 월간 또는 연간 선택형 구독으로, 구매 전에 앱에서 설명하는 추가 기능을 제공해요. 이탈리아에서는 월 4.99유로 또는 연 44.99유로(부가가치세 포함)예요. 다른 국가에서는 확인하기 전에 Google Play가 해당 통화로 가격을 보여 주며, 그 가격이 적용돼요.",
   "결제, 갱신, 해지, 환불은 Google Play가 자체 약관에 따라 처리해요. 저희는 카드나 결제 정보를 절대 받지 않아요.",
   "요금제에 따라 자격이 있는 신규 구독자에게 무료 체험이 포함될 수 있어요. 체험 기간과 첫 결제일은 Google Play에 표시돼요. 체험이 끝나기 전에 해지하지 않으면 구독이 시작되고 요금이 청구돼요.",
   "구독은 Google Play › 구독에서 해지할 때까지 매 기간이 끝날 때 자동으로 갱신돼요. 해지하면 다음 갱신이 멈추고, Plus는 이미 결제한 기간이 끝날 때까지 유지돼요. 가격이 바뀌면 Google Play가 미리 알려 주고, 필요한 경우 동의를 요청해요.",
   "Plus는 Android 앱에서 작동하며 구매에 사용한 Google 계정에 연결돼요. 같은 계정이면 다른 휴대폰에서도 복원할 수 있어요."]),
  ("5. Tanì", [
   "Tanì는 앱의 코인이에요. Tanetto로 자신을 돌보면서 얻을 수 있고, 확인 전에 표시되는 가격으로 Google Play를 통해 Tanì 패키지를 살 수도 있어요. 구매한 Tanì는 바로 추가돼요.",
   "Tanì는 앱 안에서만 쓰는 가상 화폐예요. 돈이 아니며 금전적 가치가 없고, 돈으로 바꾸거나 다른 사람에게 넘길 수 없어요. 패키지로 산 Tanì는 ‘환상의 보물’을 제외한 상점 전체에서 쓸 수 있어요. 환상의 보물은 자신을 돌보며 얻은 Tanì로만 살 수 있어요.",
   "Tanì와 진행 상황은 기기에 저장되고, 계정이 있으면 온라인 백업에도 저장돼요. 백업이나 저장한 사본 없이 앱 데이터를 삭제하거나 처음부터 다시 시작하면 저희가 되살릴 수 없어요."]),
  ("6. 광고", ["Tanetto에는 저절로 나타나는 광고가 없어요. Android 앱에서는 Google AdMob이 제공하는 짧은 동영상을 직접 골라 보면 작은 보상을 받을 수 있어요(하루 최대 5번). Tanetto Plus에는 광고가 없고, 만 13세 미만이면 광고가 전혀 없어요. 미성년자와 나이를 말하지 않은 사람에게는 동영상이 절대 맞춤형으로 제공되지 않아요. 동영상은 Google이 제공하기 때문에 가끔 볼 수 있는 동영상이 없을 수도 있어요."]),
  ("7. 계정과 온라인 백업", [
   "계정은 필요하지 않아요. 거주 국가의 개인정보 보호법에서 정한 나이(국가에 따라 만 13~16세)가 되었다면, Google 또는 이메일과 비밀번호로 선택형 계정을 만들어 진행 상황을 무료로 온라인에 백업할 수 있어요. 비밀번호는 안전하게 보관하고 계정을 다른 사람과 공유하지 마세요.",
   "온라인 백업은 무료로 제공되는 추가 기능이에요. 항상 잘 작동하도록 최선을 다하지만, ‘사본 저장’으로 기기에도 사본을 남겨 두기를 권해요. 계정과 온라인 백업은 언제든 프로필 › 계정 및 데이터 › 계정 관리 › 프로필 삭제에서, 또는 {D}에서 삭제할 수 있어요."]),
  ("8. 이용 규칙", [
   "Tanetto는 개인적이고 비상업적인 용도로만 사용할 수 있어요. 다음 행동은 하지 말아 주세요.",
   ["앱이나 그 콘텐츠를 복사, 수정, 재판매 또는 재배포하는 것",
    "수정된 앱, 가짜 구매, 가짜 초대 등 앱이 제공하지 않는 방법으로 Tanì, Plus 또는 보상을 얻으려는 것",
    "다른 사람의 계정이나 데이터에 들어가려 하거나 서비스를 방해하는 것",
    "법을 어기는 방식으로 Tanetto를 사용하는 것"],
   "앱에 ‘친구 초대’(만 18세 이상만)가 있는 경우, 보상과 한도는 앱에 표시된 대로이며 부정한 방법으로 얻은 보상은 받을 수 없어요. 계정이 이 규칙을 어기는 데 사용되면 저희는 그 계정을 정지하거나 삭제할 수 있고, 가능한 경우 이유를 알려 드려요. 이는 법에 따라 받을 수 있는 환불에는 영향을 주지 않아요."]),
  ("9. 내 콘텐츠와 저희 콘텐츠", ["Tanetto에 쓴 내용은 사용자의 것이에요. 기기에 남고, 계정이 있으면 온라인 백업에도 저장되며, 온라인 백업은 복원하는 데만 쓰여요(개인정보 처리방침 참고). Tanetto의 일러스트, 캐릭터, 글, 음악, 코드는 저작권으로 보호되며 허락 없이 복사하거나 재사용할 수 없어요. 프레스 키트의 이미지는 Tanetto를 소개하는 데 사용할 수 있어요. 오픈 소스 구성 요소와 그 라이선스는 {LIC}에 정리되어 있어요."]),
  ("10. 청약 철회권과 법적 보증", [
   "유럽연합 또는 영국의 소비자라면, 온라인으로 구매한 것에 대해 보통 이유를 밝히지 않고 14일 이내에 청약을 철회할 수 있는 권리가 법으로 보장돼요.",
   "Tanì와 Tanetto Plus는 바로 제공되는 디지털 콘텐츠예요. Google Play에서 구매할 때 즉시 제공에 동의하며, 제공이 시작되면 청약 철회권을 잃는다는 점을 확인하게 돼요([Google Play 규정](@EEA)). 무료 체험은 비용이 들지 않으며, 끝나기 전이라면 언제든 해지할 수 있어요.",
   "청약 철회권이 아직 남아 있다면, 구매 후 14일 이내에 Google Play에 환불을 요청하거나 {E}로 철회 의사를 분명하게 적어 보내 행사할 수 있어요. 예: “[날짜]에 구매한 [상품](Google Play 주문 번호 [GPA…])의 청약을 철회합니다.” 저희는 지체 없이 답장하며, 유효한 철회는 Google Play를 통해 같은 결제 수단으로 환불돼요.",
   "어떤 경우에도 법적 보증은 유지돼요. Tanetto Plus나 Tanì가 설명대로 작동하지 않으면 연락해 주세요. 저희가 고쳐 드려요. 고치지 못하면 법에 따라 가격 인하나 환불을 요청할 수 있어요. [Google Play 환불 정책](@REF)도 그대로 이용할 수 있어요."]),
  ("11. 변경과 서비스 제공", [
   "Tanetto가 잘 작동하고 더 좋아지도록 노력하고 있어서, 일부 기능은 시간이 지나며 바뀔 수 있어요. 이미 결제한 기간 동안에는 Plus의 주요 혜택을 없애지 않아요. 사용자에게 중요한 영향을 주는 변경이 있으면 앱이나 이 사이트에서 미리 알려 드려요.",
   "업데이트 중이거나 Google 서비스에 문제가 있을 때처럼 가끔 Tanetto를 사용할 수 없을 수도 있어요. 언젠가 Tanetto 제공을 중단하게 되면 미리 알려 드려요. 구독은 더 이상 갱신되지 않으며, 이미 결제했지만 사용하지 않은 기간이 있다면 법에서 정한 대로 처리해 드려요.",
   "이 약관을 변경하면 새 버전을 날짜와 함께 이 페이지에 게시해요. 중요한 변경이라면 적용되기 전에 앱에서 알려 드려요. 변경은 이미 한 구매에는 영향을 주지 않아요."]),
  ("12. 책임", ["저희는 이 약관에 설명된 대로, 그리고 소비자 보호법이 요구하는 대로 Tanetto를 제공할 책임이 있어요. 휴대폰, 인터넷 연결, Google 같은 다른 회사의 서비스처럼 저희에게 달려 있지 않은 문제에 대해서는 책임지지 않아요. Tanetto는 의학적 조언을 하지 않아요. 건강에 관한 결정은 전문가와 상의하세요. 이 약관의 어떤 내용도 고의나 중대한 과실, 생명·신체·건강에 대한 피해처럼 법이 허용하지 않는 경우에 저희의 책임을 제한하지 않으며, 소비자로서의 권리도 제한하지 않아요."]),
  ("13. 준거법, 관할 법원, 불만 처리", [
   "이 약관에는 이탈리아 법이 적용돼요. 소비자라면 거주 국가의 강행 규정에 따른 보호도 계속 받을 수 있어요.",
   "유럽연합의 소비자라면 거주 국가의 법원에 소송을 제기할 수 있고, 저희가 사용자를 상대로 소송을 제기할 수 있는 곳도 그 국가의 법원뿐이에요. 이탈리아에서는 사용자의 주소지 또는 거소지 법원이 관할해요(이탈리아 소비자법 제66조의2).",
   "불만이 있으면 먼저 {E}로 연락해 주세요. 최대한 빨리 답장해 드려요. 유럽연합에 산다면 [거주 국가의 유럽 소비자 센터](@ECC)에서 무료로 도움을 받을 수도 있어요."]),
 ],
}

T["zh"] = {
 "title": "使用条款", "upd": "最后更新：{date}",
 "intro": "无论你使用的是 Android 应用，还是在浏览器中运行的版本，使用 Tanetto 时都适用本条款。请和隐私政策（{P}）一起阅读。如果有不明白的地方，可以问问你信任的大人，或者写信给我们。",
 "s": [
  ("1. 我们是谁", ["Tanetto 由 {OWNER}（意大利）制作，也就是隐私政策（{P}）中写明的服务运营者。任何事情，包括投诉和撤回，都可以写信到 {E} 联系我们。Google Play 上 Tanetto 的页面也会显示开发者的联系方式。"]),
  ("2. Tanetto 是什么", ["Tanetto 帮助你和一个虚拟小伙伴一起养成每天的小习惯。它是一款关于身心健康和习惯的应用，不是医疗或心理服务，也不能代替专业人士的帮助。如果你处于危险之中或急需帮助，请拨打当地的紧急电话；日记中也会显示你所在国家的求助热线。"]),
  ("3. 谁可以使用", [
   "Tanetto 面向 13 岁及以上的人，不以 13 岁以下的儿童为对象。应用会询问你出生的年份和月份：这是你自己填写的年龄，我们无法核实。如果你填写的年龄未满 13 岁，或选择不说，Tanetto 会按照隐私政策中的说明，以保护模式运行。",
   "如果你未成年，请在父母或监护人同意后使用 Tanetto，购买任何东西之前也请先问问他们。购买通过手机上的 Google 账号进行：家长可以把 Google Play 设置为每次购买前都需要批准或输入密码。"]),
  ("4. Tanetto Plus", [
   "Tanetto 可以免费下载，核心功能也会一直免费。Tanetto Plus 是可选的按月或按年订阅，包含购买前在应用中介绍的额外内容。在意大利，价格为每月 4.99 欧元或每年 44.99 欧元（含增值税）；在其他国家，Google Play 会在你确认前以当地货币显示价格，以该价格为准。",
   "付款、续订、取消和退款均由 Google Play 按其自身条款处理：我们绝不会收到你的银行卡或付款信息。",
   "部分方案可能为符合条件的新订阅者提供免费试用：Google Play 会显示试用时长和首次扣款的时间。如果你没有在试用结束前取消，订阅就会开始并扣款。",
   "订阅会在每个周期结束时自动续订，直到你在 Google Play › 订阅中取消。取消后将停止下一次续订，Plus 会保持有效直到已付费期间结束。如果价格变动，Google Play 会提前通知你，并在需要时征求你的同意。",
   "Plus 在 Android 应用中使用，并与你购买时所用的 Google 账号关联：在另一部手机上登录同一账号即可恢复。"]),
  ("5. Tanì", [
   "Tanì 是应用里的金币。你可以通过在 Tanetto 中照顾好自己来获得，也可以通过 Google Play 按确认前显示的价格购买 Tanì 礼包。购买的 Tanì 会立即到账。",
   "Tanì 是只能在应用内使用的虚拟货币：它不是钱，没有货币价值，不能兑换成钱，也不能转让给别人。礼包中的 Tanì 可用于整个商店，“稀世珍品”除外：稀世珍品只能用照顾自己赚到的 Tanì 购买。",
   "Tanì 和你的进度保存在你的设备上；如果你有账号，也会保存在在线备份中。如果你在没有备份或已保存副本的情况下删除应用数据或重新开始，我们无法恢复它们。"]),
  ("6. 广告", ["Tanetto 没有会自己弹出的广告。在 Android 应用中，你可以自己选择观看由 Google AdMob 提供的短视频来获得小奖励，每天最多 5 次。使用 Tanetto Plus 时没有广告，未满 13 岁时也完全没有广告；对未成年人和没有说明年龄的人，视频绝不会个性化。视频由 Google 提供：有时可能没有可看的视频。"]),
  ("7. 账号和在线备份", [
   "你不需要账号。如果你达到了所在国家隐私法规定的年龄（根据国家不同，为 13 至 16 岁），可以用 Google 或电子邮件和密码创建一个可选账号，免费在线备份你的进度。请妥善保管密码，不要和任何人共用账号。",
   "在线备份是一项免费的附加功能：我们会尽力让它一直正常运行，但建议你也用“保存副本”在设备上留一份副本。你可以随时在“我的 › 账号与数据 › 管理账号 › 删除个人资料”中，或在 {D} 上删除账号和在线备份。"]),
  ("8. 使用规则", [
   "Tanetto 仅供个人、非商业用途。请不要：",
   ["复制、修改、转售或再分发应用或其内容；",
    "试图用应用未提供的方式获得 Tanì、Plus 或奖励，例如使用修改过的应用、虚假购买或虚假邀请；",
    "试图进入他人的账号或数据，或干扰服务；",
    "以违反法律的方式使用 Tanetto。"],
   "如果应用提供“邀请朋友”（仅限 18 岁及以上），奖励和限制以应用中显示的为准，通过作弊获得的奖励不予发放。如果有账号被用来违反这些规则，我们可能会暂停或删除该账号，并在可能时告诉你原因；这不影响你依法有权获得的退款。"]),
  ("9. 你的内容和我们的内容", ["你在 Tanetto 中写下的内容属于你。它保存在你的设备上；如果你有账号，也会保存在你的在线备份中，而在线备份只用于恢复（见隐私政策）。Tanetto 的插画、角色、文字、音乐和代码受著作权保护，未经许可不得复制或再使用；新闻资料包中的图片可用于介绍 Tanetto。开源组件及其许可证列在 {LIC}。"]),
  ("10. 撤回权和法定保证", [
   "如果你是欧盟或英国的消费者，法律通常给予你在网上购买后 14 天内无需说明理由撤回购买的权利。",
   "Tanì 和 Tanetto Plus 是立即提供的数字内容。在 Google Play 购买时，你同意立即提供，并确认一旦开始提供即失去撤回权（[Google Play 规则](@EEA)）。免费试用不收费，你可以在结束前随时取消。",
   "如果你仍享有撤回权，可以在购买后 14 天内向 Google Play 申请退款，或写信到 {E} 明确表示撤回，例如：“我撤回在 [日期] 购买的 [商品]，Google Play 订单号 [GPA…]”。我们会及时回复，有效的撤回将通过 Google Play 以原支付方式退款。",
   "无论如何，你都享有法定保证：如果 Tanetto Plus 或 Tanì 无法按说明正常使用，请联系我们，我们会修复；如果无法修复，你可以依法要求降价或退款。[Google Play 退款政策](@REF)也同样适用。"]),
  ("11. 变更和可用性", [
   "我们努力让 Tanetto 运行良好并不断改进，因此部分功能可能会随时间变化。在你已付费的期间内，我们不会取消 Plus 的主要权益；如果某项变更会对你产生重大影响，我们会提前在应用或本网站上告诉你。",
   "Tanetto 有时可能无法使用，例如在更新期间或 Google 服务出现问题时。如果有一天我们停止提供 Tanetto，会提前通知你：订阅将不再续订，对于已付费但未使用的期间，将按法律规定处理。",
   "如果我们修改本条款，会在本页面发布新版本并注明日期；如果变更重要，会在生效前通过应用告诉你。变更不影响已完成的购买。"]),
  ("12. 责任", ["我们负责按照本条款的说明以及消费者保护法律的要求提供 Tanetto。对于不取决于我们的问题，例如手机、网络连接或 Google 等其他公司的服务，我们不承担责任。Tanetto 不提供医疗建议：有关健康的决定，请咨询专业人士。在法律不允许限制责任的情况下，例如故意或重大过失，或对生命、身体或健康造成的损害，本条款中的任何内容都不会限制我们的责任，也不会限制你作为消费者的权利。"]),
  ("13. 适用法律、管辖法院和投诉", [
   "本条款受意大利法律管辖。如果你是消费者，你仍然受到你所居住国家强制性规定的保护。",
   "如果你是欧盟的消费者，你可以在你所居住国家的法院提起诉讼，而我们也只能在该国法院对你提起诉讼；在意大利，由你的住所地或居所地法院管辖（意大利《消费者法典》第 66 条之二）。",
   "如有任何投诉，请先写信到 {E}：我们会尽快回复。如果你住在欧盟，也可以向[你所在国家的欧洲消费者中心](@ECC)免费寻求帮助。"]),
 ],
}

T["zht"] = {
 "title": "使用條款", "upd": "最後更新日期：{date}",
 "intro": "無論你使用的是 Android App，還是在瀏覽器中執行的版本，使用 Tanetto 時都適用本條款。請和隱私權政策（{P}）一起閱讀。如果有不明白的地方，可以問問你信任的大人，或寫信給我們。",
 "s": [
  ("1. 我們是誰", ["Tanetto 由 {OWNER}（義大利）製作，也就是隱私權政策（{P}）中載明的服務營運者。任何事情，包括申訴和撤回，都可以寫信到 {E} 聯絡我們。Google Play 上 Tanetto 的頁面也會顯示開發人員的聯絡方式。"]),
  ("2. Tanetto 是什麼", ["Tanetto 幫助你和一個虛擬小夥伴一起養成每天的小習慣。它是一款關於身心健康和習慣的 App，不是醫療或心理服務，也不能取代專業人士的協助。如果你身處危險或急需幫助，請撥打當地的緊急電話；日記中也會顯示你所在國家的求助專線。"]),
  ("3. 誰可以使用", [
   "Tanetto 是為 13 歲以上的人設計的，並不以未滿 13 歲的兒童為對象。App 會詢問你出生的年份和月份：這是你自己填寫的年齡，我們無法核實。如果你填寫的年齡未滿 13 歲，或選擇不說，Tanetto 會依照隱私權政策中的說明，以保護模式運作。",
   "如果你未成年，請在父母或監護人同意後使用 Tanetto，購買任何東西之前也請先問問他們。購買是透過手機上的 Google 帳戶進行：家長可以將 Google Play 設定為每次購買前都需要核准或輸入密碼。"]),
  ("4. Tanetto Plus", [
   "Tanetto 可以免費下載，核心功能也會一直免費。Tanetto Plus 是選用的月訂或年訂方案，包含購買前在 App 中介紹的額外內容。在義大利，價格為每月 4.99 歐元或每年 44.99 歐元（含加值稅）；在其他國家，Google Play 會在你確認前以當地貨幣顯示價格，並以該價格為準。",
   "付款、續訂、取消和退款皆由 Google Play 依其自身條款處理：我們絕不會收到你的信用卡或付款資訊。",
   "部分方案可能為符合資格的新訂閱者提供免費試用：Google Play 會顯示試用期長度和首次扣款的時間。如果你沒有在試用期結束前取消，訂閱就會開始並收取費用。",
   "訂閱會在每個週期結束時自動續訂，直到你在 Google Play › 訂閱中取消。取消後會停止下一次續訂，Plus 會維持有效到已付費期間結束。如果價格調整，Google Play 會事先通知你，並在必要時請你同意。",
   "Plus 在 Android App 中使用，並與你購買時使用的 Google 帳戶連結：在另一支手機上使用同一個帳戶即可恢復。"]),
  ("5. Tanì", [
   "Tanì 是 App 裡的金幣。你可以透過在 Tanetto 中好好照顧自己來獲得，也可以透過 Google Play 以確認前顯示的價格購買 Tanì 禮包。購買的 Tanì 會立即入帳。",
   "Tanì 是只能在 App 內使用的虛擬貨幣：它不是錢，沒有金錢價值，不能兌換成錢，也不能轉讓給別人。禮包中的 Tanì 可用於整個商店，「稀世珍品」除外：稀世珍品只能用照顧自己賺到的 Tanì 購買。",
   "Tanì 和你的進度會儲存在你的裝置上；如果你有帳號，也會儲存在網路備份中。如果你在沒有備份或已儲存副本的情況下刪除 App 資料或重新開始，我們無法將它們復原。"]),
  ("6. 廣告", ["Tanetto 沒有會自行跳出的廣告。在 Android App 中，你可以自己選擇觀看由 Google AdMob 提供的短片來獲得小獎勵，每天最多 5 次。使用 Tanetto Plus 時沒有廣告，未滿 13 歲時也完全沒有廣告；對未成年人和沒有說明年齡的人，影片絕不會個人化。影片由 Google 提供：有時可能沒有可看的影片。"]),
  ("7. 帳號與網路備份", [
   "你不需要帳號。如果你已達到所在國家隱私法規定的年齡（依國家不同，為 13 至 16 歲），可以使用 Google 或電子郵件和密碼建立選用帳號，免費將進度備份到網路上。請妥善保管密碼，不要和任何人共用帳號。",
   "網路備份是一項免費的附加功能：我們會盡力讓它一直正常運作，但建議你也用「儲存備份」在裝置上留一份副本。你隨時可以在「我的 › 帳號與資料 › 管理帳號 › 刪除個人檔案」中，或在 {D} 上刪除帳號和網路備份。"]),
  ("8. 使用規則", [
   "Tanetto 僅供個人、非商業用途。請不要：",
   ["複製、修改、轉售或再散布 App 或其內容；",
    "試圖用 App 未提供的方式取得 Tanì、Plus 或獎勵，例如使用修改過的 App、虛假購買或虛假邀請；",
    "試圖進入他人的帳號或資料，或干擾服務；",
    "以違反法律的方式使用 Tanetto。"],
   "如果 App 提供「邀請朋友」（僅限 18 歲以上），獎勵和限制以 App 中顯示的為準，透過作弊取得的獎勵不予發放。如果有帳號被用來違反這些規則，我們可能會停用或刪除該帳號，並在可能時告訴你原因；這不影響你依法有權取得的退款。"]),
  ("9. 你的內容和我們的內容", ["你在 Tanetto 中寫下的內容屬於你。它會留在你的裝置上；如果你有帳號，也會儲存在你的網路備份中，而網路備份只用於還原（請見隱私權政策）。Tanetto 的插畫、角色、文字、音樂和程式碼受著作權保護，未經許可不得複製或再利用；媒體資料包中的圖片可用於介紹 Tanetto。開放原始碼元件及其授權列在 {LIC}。"]),
  ("10. 撤回權和法定保固", [
   "如果你是歐盟或英國的消費者，法律通常給予你在網路上購買後 14 天內無須說明理由撤回購買的權利。",
   "Tanì 和 Tanetto Plus 是立即提供的數位內容。在 Google Play 購買時，你同意立即提供，並確認一旦開始提供即喪失撤回權（[Google Play 規定](@EEA)）。免費試用不收費，你可以在結束前隨時取消。",
   "如果你仍享有撤回權，可以在購買後 14 天內向 Google Play 申請退款，或寫信到 {E} 明確表示撤回，例如：「我撤回於 [日期] 購買的 [商品]，Google Play 訂單編號 [GPA…]」。我們會及時回覆，有效的撤回將透過 Google Play 以原付款方式退款。",
   "無論如何，你都享有法定保固：如果 Tanetto Plus 或 Tanì 無法依說明正常運作，請聯絡我們，我們會修正；如果無法修正，你可以依法要求降價或退款。[Google Play 退款政策](@REF)也同樣適用。"]),
  ("11. 變更和服務提供", [
   "我們努力讓 Tanetto 運作良好並持續改善，因此部分功能可能會隨時間改變。在你已付費的期間內，我們不會取消 Plus 的主要權益；如果某項變更會對你造成重大影響，我們會事先在 App 或本網站上告訴你。",
   "Tanetto 有時可能無法使用，例如在更新期間或 Google 服務發生問題時。如果有一天我們停止提供 Tanetto，會事先通知你：訂閱將不再續訂，對於已付費但未使用的期間，將依法律規定處理。",
   "如果我們修改本條款，會在本頁面公布新版本並註明日期；如果變更重要，會在生效前透過 App 告訴你。變更不影響已完成的購買。"]),
  ("12. 責任", ["我們負責依照本條款的說明以及消費者保護法律的要求提供 Tanetto。對於不取決於我們的問題，例如手機、網路連線或 Google 等其他公司的服務，我們不負責任。Tanetto 不提供醫療建議：有關健康的決定，請諮詢專業人士。在法律不允許限制責任的情況下，例如故意或重大過失，或對生命、身體或健康造成的損害，本條款中的任何內容都不會限制我們的責任，也不會限制你身為消費者的權利。"]),
  ("13. 準據法、管轄法院和申訴", [
   "本條款受義大利法律規範。如果你是消費者，你仍然受到你所居住國家強制規定的保護。",
   "如果你是歐盟的消費者，你可以在你所居住國家的法院提起訴訟，而我們也只能在該國法院對你提起訴訟；在義大利，由你的住所地或居所地法院管轄（義大利《消費者法典》第 66 條之二）。",
   "如有任何申訴，請先寫信到 {E}：我們會盡快回覆。如果你住在歐盟，也可以向[你所在國家的歐洲消費者中心](@ECC)免費尋求協助。"]),
 ],
}

T["ru"] = {
 "title": "Условия использования", "upd": "Последнее обновление: {date}",
 "intro": "Эти условия действуют, когда ты пользуешься Tanetto: и приложением для Android, и версией, которая работает в браузере. Читай их вместе с политикой конфиденциальности ({P}). Если что-то непонятно, спроси взрослого, которому доверяешь, или напиши нам.",
 "s": [
  ("1. Кто мы", ["Tanetto создаёт {OWNER}, Италия, — владелец сервиса, который указан в политике конфиденциальности ({P}). Ты можешь написать нам по любому вопросу, в том числе с жалобой или отказом от покупки, на {E}. Контакты разработчика также указаны на странице Tanetto в Google Play."]),
  ("2. Что такое Tanetto", ["Tanetto помогает вырабатывать маленькие ежедневные привычки вместе с виртуальным питомцем. Это приложение для благополучия и привычек, а не медицинская или психологическая служба, и оно не заменяет помощь специалиста. Если ты в опасности или тебе срочно нужна помощь, позвони в местную экстренную службу; в дневнике также есть телефоны доверия твоей страны."]),
  ("3. Кто может пользоваться", [
   "Tanetto рассчитано на тех, кому 13 лет и больше, и не предназначено для детей младше 13 лет. Приложение спрашивает месяц и год рождения: это возраст, который ты указываешь сам, и мы не можем его проверить. Если ты укажешь возраст меньше 13 лет или не захочешь его называть, Tanetto работает в защищённом режиме, как описано в политике конфиденциальности.",
   "Если ты несовершеннолетний, пользуйся Tanetto с согласия родителя или опекуна и спрашивай их, прежде чем что-то покупать. Покупки совершаются через аккаунт Google на телефоне: родители могут настроить Google Play так, чтобы перед каждой покупкой запрашивалось одобрение или пароль."]),
  ("4. Tanetto Plus", [
   "Tanetto можно скачать бесплатно, и его основа остаётся бесплатной. Tanetto Plus — необязательная подписка на месяц или на год с дополнительными возможностями, которые описаны в приложении до покупки. В Италии она стоит 4,99 € в месяц или 44,99 € в год, включая НДС; в других странах Google Play до подтверждения показывает цену в твоей валюте, и действует именно эта цена.",
   "Оплату, продления, отмены и возвраты обрабатывает Google Play по своим условиям: мы никогда не получаем данные твоей карты или платежа.",
   "Тариф может включать бесплатный пробный период для новых подписчиков, которым он доступен: Google Play показывает, сколько он длится и когда будет первый платёж. Если не отменить подписку до конца пробного периода, она начнётся и будет списана оплата.",
   "Подписка продлевается автоматически в конце каждого периода, пока ты не отменишь её в Google Play › Подписки. Отмена останавливает следующее продление, а Plus остаётся активным до конца уже оплаченного периода. Если цена изменится, Google Play заранее сообщит об этом и, когда это требуется, попросит твоего согласия.",
   "Plus работает в приложении для Android и привязан к аккаунту Google, с которого он куплен: на другом телефоне с тем же аккаунтом его можно восстановить."]),
  ("5. Tanì", [
   "Tanì — это монеты приложения. Ты получаешь их, заботясь о себе с Tanetto, а ещё можешь купить наборы Tanì через Google Play по цене, показанной до подтверждения. Купленные Tanì зачисляются сразу.",
   "Tanì — виртуальная валюта только для использования в приложении: это не деньги, у них нет денежной ценности, их нельзя обменять на деньги или передать другим людям. Tanì из наборов можно тратить во всём магазине, кроме «Редчайших вещей»: их можно купить только за Tanì, заработанные заботой о себе.",
   "Tanì и твой прогресс хранятся на устройстве и, если у тебя есть аккаунт, в онлайн-копии. Если удалить данные приложения или начать заново без резервной или сохранённой копии, мы не сможем их восстановить."]),
  ("6. Реклама", ["В Tanetto нет рекламы, которая появляется сама. В приложении для Android ты можешь сам решить посмотреть короткое видео от Google AdMob, чтобы получить небольшую награду, — до 5 раз в день. С Tanetto Plus рекламы нет, а до 13 лет её нет совсем; для несовершеннолетних и тех, кто не указал возраст, видео никогда не персонализируются. Видео зависят от Google: иногда их может не быть."]),
  ("7. Аккаунт и онлайн-копия", [
   "Аккаунт не нужен. Если ты достиг возраста, который требует закон о защите данных твоей страны (от 13 до 16 лет, в зависимости от страны), ты можешь создать необязательный аккаунт через Google или с e-mail и паролем, чтобы бесплатно хранить копию прогресса онлайн. Береги пароль и никому не давай свой аккаунт.",
   "Онлайн-копия — бесплатная дополнительная возможность: мы делаем всё, чтобы она всегда работала, но советуем также хранить копию на устройстве с помощью «Сохранить копию». Удалить аккаунт и онлайн-копию можно в любой момент в «Профиль» › «Аккаунт и данные» › «Управление аккаунтом» › «Удалить профиль» или на {D}."]),
  ("8. Правила использования", [
   "Tanetto предназначено для личного некоммерческого использования. Пожалуйста:",
   ["не копируй, не изменяй, не перепродавай и не распространяй приложение или его содержимое;",
    "не пытайся получить Tanì, Plus или награды способами, которых нет в приложении, например с помощью изменённого приложения, поддельных покупок или фальшивых приглашений;",
    "не пытайся проникнуть в чужие аккаунты или данные и не мешай работе сервиса;",
    "не используй Tanetto в нарушение закона."],
   "Если в приложении есть «Пригласить друга» (только для тех, кому 18 лет и больше), награды и ограничения указаны в приложении, а награды, полученные обманом, не положены. Если аккаунт используется для нарушения этих правил, мы можем приостановить или удалить его, по возможности объяснив причину; это не затрагивает возвраты, положенные тебе по закону."]),
  ("9. Твоё содержимое и наше", ["То, что ты пишешь в Tanetto, принадлежит тебе. Это остаётся на твоём устройстве и, если у тебя есть аккаунт, в твоей онлайн-копии, которая нужна только для восстановления (см. политику конфиденциальности). Иллюстрации, персонажи, тексты, музыка и код Tanetto охраняются авторским правом, и их нельзя копировать или использовать повторно без разрешения; изображения из материалов для прессы можно использовать, чтобы рассказать о Tanetto. Компоненты с открытым исходным кодом и их лицензии перечислены на {LIC}."]),
  ("10. Право на отказ и законная гарантия", [
   "Если ты потребитель в Европейском союзе или Великобритании, закон обычно даёт 14 дней, чтобы отказаться от покупки, сделанной онлайн, без объяснения причин.",
   "Tanì и Tanetto Plus — цифровой контент, который предоставляется сразу. Покупая их в Google Play, ты соглашаешься на немедленное предоставление и подтверждаешь, что после его начала теряешь право на отказ ([правила Google Play](@EEA)). Бесплатный пробный период ничего не стоит, и его можно отменить в любой момент до окончания.",
   "Если право на отказ у тебя ещё есть, ты можешь воспользоваться им в течение 14 дней после покупки: запросить возврат в Google Play или написать на {E} ясное заявление, например: «Отказываюсь от покупки [товар], сделанной [дата], номер заказа Google Play [GPA…]». Мы ответим без промедления, а при обоснованном отказе деньги вернутся через Google Play тем же способом оплаты.",
   "В любом случае у тебя остаётся законная гарантия: если Tanetto Plus или Tanì не работают так, как описано, напиши нам, и мы всё исправим; если исправить не получится, ты можешь попросить снизить цену или вернуть деньги, как предусматривает закон. [Правила возврата Google Play](@REF) тоже продолжают действовать."]),
  ("11. Изменения и доступность", [
   "Мы стараемся, чтобы Tanetto работало хорошо и становилось лучше, поэтому некоторые функции со временем могут меняться. В течение уже оплаченного периода мы не убираем главные преимущества Plus; если изменение серьёзно тебя касается, мы заранее сообщим об этом в приложении или на этом сайте.",
   "Иногда Tanetto может быть недоступно, например во время обновлений или когда у сервисов Google проблемы. Если однажды мы перестанем предлагать Tanetto, мы сообщим об этом заранее: подписки не будут продлеваться, а за уже оплаченный и неиспользованный период ты получишь то, что предусматривает закон.",
   "Если мы изменим эти условия, мы опубликуем новую версию на этой странице с датой; если изменения важные, мы сообщим о них в приложении до того, как они вступят в силу. Изменения не затрагивают уже сделанные покупки."]),
  ("12. Ответственность", ["Мы отвечаем за то, чтобы Tanetto работало так, как описано в этих условиях и как требует закон о защите прав потребителей. Мы не отвечаем за проблемы, которые от нас не зависят, например за телефон, подключение к интернету или сервисы других компаний, таких как Google. Tanetto не даёт медицинских советов: решения о своём здоровье обсуждай со специалистом. Ничто в этих условиях не ограничивает нашу ответственность там, где закон этого не допускает, например при умысле или грубой неосторожности или при вреде жизни, телу или здоровью, и ничто не ограничивает твои права потребителя."]),
  ("13. Право, суд и жалобы", [
   "Эти условия регулируются законодательством Италии. Если ты потребитель, за тобой также сохраняется защита обязательных норм страны, где ты живёшь.",
   "Если ты потребитель в Европейском союзе, ты можешь обратиться в суд страны, где живёшь, а мы можем подать иск против тебя только там; в Италии дело рассматривает суд по месту твоего жительства или пребывания (ст. 66-bis Потребительского кодекса Италии).",
   "С любой жалобой сначала напиши нам на {E}: мы ответим как можно скорее. Если ты живёшь в Европейском союзе, ты также можешь бесплатно обратиться за помощью в [Европейский потребительский центр своей страны](@ECC)."]),
 ],
}

T["pl"] = {
 "title": "Warunki korzystania", "upd": "Ostatnia aktualizacja: {date}",
 "intro": "Te warunki obowiązują, gdy korzystasz z Tanetto: zarówno z aplikacji na Androida, jak i z wersji działającej w przeglądarce. Przeczytaj je razem z polityką prywatności ({P}). Jeśli coś jest niejasne, zapytaj dorosłego, któremu ufasz, albo napisz do nas.",
 "s": [
  ("1. Kim jesteśmy", ["Tanetto tworzy {OWNER}, Włochy, czyli usługodawca wskazany w polityce prywatności ({P}). Możesz napisać do nas w każdej sprawie, także z reklamacją lub odstąpieniem od umowy, na adres {E}. Dane kontaktowe dewelopera są też widoczne na stronie Tanetto w Google Play."]),
  ("2. Czym jest Tanetto", ["Tanetto pomaga budować małe codzienne nawyki razem z wirtualnym towarzyszem. To aplikacja o dobrym samopoczuciu i nawykach, a nie usługa medyczna ani psychologiczna, i nie zastępuje pomocy specjalisty. Jeśli grozi ci niebezpieczeństwo albo pilnie potrzebujesz pomocy, zadzwoń pod lokalny numer alarmowy; w dzienniku znajdziesz też telefony zaufania w twoim kraju."]),
  ("3. Kto może korzystać", [
   "Tanetto jest dla osób od 13 lat i nie jest skierowane do dzieci poniżej 13 lat. Aplikacja pyta o miesiąc i rok urodzenia: to wiek, który podajesz sam, i nie możemy go sprawdzić. Jeśli podasz wiek poniżej 13 lat albo wolisz go nie podawać, Tanetto działa w trybie chronionym, tak jak wyjaśnia polityka prywatności.",
   "Jeśli jesteś osobą niepełnoletnią, korzystaj z Tanetto za zgodą rodzica lub opiekuna i pytaj ich, zanim coś kupisz. Zakupy są robione przez konto Google w telefonie: rodzice mogą ustawić w Google Play, by przed każdym zakupem było potrzebne zatwierdzenie albo hasło."]),
  ("4. Tanetto Plus", [
   "Tanetto można pobrać za darmo, a jego najważniejsza część pozostaje bezpłatna. Tanetto Plus to opcjonalna subskrypcja miesięczna lub roczna z dodatkami opisanymi w aplikacji przed zakupem. We Włoszech kosztuje 4,99 € miesięcznie lub 44,99 € rocznie, z VAT; w innych krajach Google Play przed potwierdzeniem pokazuje cenę w twojej walucie i to ona obowiązuje.",
   "Płatności, odnowienia, anulowania i zwroty obsługuje Google Play zgodnie z własnymi warunkami: nigdy nie otrzymujemy danych twojej karty ani płatności.",
   "Plan może obejmować bezpłatny okres próbny dla nowych subskrybentów, którym przysługuje: Google Play pokazuje, ile trwa i kiedy nastąpi pierwsza płatność. Jeśli nie anulujesz przed końcem okresu próbnego, subskrypcja się rozpocznie i zostanie pobrana opłata.",
   "Subskrypcja odnawia się automatycznie na koniec każdego okresu, dopóki nie anulujesz jej w Google Play › Subskrypcje. Anulowanie zatrzymuje kolejne odnowienie, a Plus działa do końca już opłaconego okresu. Jeśli cena się zmieni, Google Play poinformuje cię o tym wcześniej i, gdy jest to wymagane, poprosi o zgodę.",
   "Plus działa w aplikacji na Androida i jest powiązany z kontem Google, którym go kupiono: na innym telefonie z tym samym kontem możesz go przywrócić."]),
  ("5. Tanì", [
   "Tanì to monety aplikacji. Zdobywasz je, dbając o siebie z Tanetto, a pakiety Tanì możesz też kupić przez Google Play, w cenie pokazanej przed potwierdzeniem. Kupione Tanì są dodawane od razu.",
   "Tanì to wirtualna waluta do używania tylko w aplikacji: nie są pieniędzmi, nie mają wartości pieniężnej, nie można ich wymienić na pieniądze ani przekazać innym osobom. Tanì z pakietów działają w całym sklepie oprócz Unikatów: te kupuje się wyłącznie za Tanì zdobyte dzięki dbaniu o siebie.",
   "Tanì i twoje postępy są zapisane na urządzeniu oraz, jeśli masz konto, w kopii online. Jeśli usuniesz dane aplikacji albo zaczniesz od nowa bez kopii zapasowej lub zapisanej kopii, nie będziemy mogli ich odzyskać."]),
  ("6. Reklamy", ["W Tanetto nie ma reklam, które pojawiają się same. W aplikacji na Androida możesz sam zdecydować się obejrzeć krótki film dostarczany przez Google AdMob, aby dostać małą nagrodę, maksymalnie 5 razy dziennie. W Tanetto Plus nie ma reklam, a poniżej 13 lat nie ma ich wcale; dla osób niepełnoletnich i dla tych, którzy nie podali wieku, filmy nigdy nie są personalizowane. Filmy zależą od Google: czasem może ich nie być."]),
  ("7. Konto i kopia online", [
   "Konto nie jest potrzebne. Jeśli masz wiek wymagany przez prawo o ochronie danych w twoim kraju (od 13 do 16 lat, zależnie od kraju), możesz założyć opcjonalne konto przez Google albo e-mail i hasło, aby za darmo zapisywać postępy online. Chroń swoje hasło i nie udostępniaj nikomu konta.",
   "Kopia online to bezpłatny dodatek: robimy wszystko, żeby zawsze działała, ale radzimy trzymać też kopię na urządzeniu dzięki opcji „Zapisz kopię”. Konto i kopię online możesz usunąć w każdej chwili w Profil › Konto i dane › Zarządzaj kontem › Usuń profil albo na {D}."]),
  ("8. Zasady korzystania", [
   "Tanetto służy do osobistego, niekomercyjnego użytku. Prosimy:",
   ["nie kopiuj, nie zmieniaj, nie odsprzedawaj ani nie rozpowszechniaj aplikacji ani jej zawartości;",
    "nie próbuj zdobywać Tanì, Plus ani nagród w sposób, którego aplikacja nie przewiduje, na przykład zmodyfikowaną aplikacją, fałszywymi zakupami lub fałszywymi zaproszeniami;",
    "nie próbuj dostać się do cudzych kont ani danych i nie zakłócaj działania usługi;",
    "nie używaj Tanetto niezgodnie z prawem."],
   "Jeśli aplikacja oferuje „Zaproś znajomego” (tylko dla osób, które mają co najmniej 18 lat), nagrody i limity są takie, jak pokazuje aplikacja, a nagrody zdobyte oszustwem się nie należą. Jeśli konto jest używane do łamania tych zasad, możemy je zawiesić lub usunąć, w miarę możliwości podając powód; nie wpływa to na zwroty, które należą ci się z mocy prawa."]),
  ("9. Twoje treści i nasze", ["To, co piszesz w Tanetto, należy do ciebie. Zostaje na twoim urządzeniu oraz, jeśli masz konto, w twojej kopii online, która służy tylko do przywracania (zobacz politykę prywatności). Ilustracje, postacie, teksty, muzyka i kod Tanetto są chronione prawem autorskim i nie można ich kopiować ani wykorzystywać bez zgody; obrazy z materiałów prasowych można wykorzystywać, by pisać o Tanetto. Komponenty open source i ich licencje są wymienione na {LIC}."]),
  ("10. Prawo odstąpienia od umowy i zgodność z umową", [
   "Jeśli jesteś konsumentem w Unii Europejskiej lub w Wielkiej Brytanii, prawo zwykle daje ci 14 dni na odstąpienie od zakupu zrobionego online, bez podawania przyczyny.",
   "Tanì i Tanetto Plus to treści cyfrowe dostarczane od razu. Kupując je w Google Play, zgadzasz się na natychmiastowe dostarczenie i przyjmujesz do wiadomości, że po jego rozpoczęciu tracisz prawo odstąpienia od umowy ([zasady Google Play](@EEA)). Bezpłatny okres próbny nic nie kosztuje i możesz go anulować w dowolnym momencie przed jego końcem.",
   "Jeśli prawo odstąpienia nadal ci przysługuje, możesz z niego skorzystać w ciągu 14 dni od zakupu, prosząc Google Play o zwrot albo wysyłając na {E} jasne oświadczenie, na przykład: „Odstępuję od zakupu [produkt] z dnia [data], numer zamówienia w Google Play [GPA…]”. Odpowiemy bez zwłoki, a skuteczne odstąpienie zostanie zwrócone przez Google Play tą samą metodą płatności.",
   "W każdym przypadku przysługuje ci ustawowa ochrona przy niezgodności z umową: jeśli Tanetto Plus albo Tanì nie działają tak, jak opisano, napisz do nas, a naprawimy problem; jeśli się nie uda, możesz żądać obniżenia ceny albo zwrotu pieniędzy, zgodnie z prawem. Nadal obowiązują też [zasady zwrotów Google Play](@REF)."]),
  ("11. Zmiany i dostępność", [
   "Pracujemy nad tym, żeby Tanetto działało dobrze i było coraz lepsze, więc niektóre funkcje mogą się z czasem zmieniać. W już opłaconym okresie nie zabieramy głównych korzyści Plus; jeśli zmiana ważnie cię dotyczy, powiemy ci o tym wcześniej w aplikacji albo na tej stronie.",
   "Czasem Tanetto może być niedostępne, na przykład podczas aktualizacji albo gdy usługi Google mają problemy. Jeśli kiedyś przestaniemy oferować Tanetto, powiemy ci o tym wcześniej: subskrypcje nie będą odnawiane, a za ewentualny już opłacony i niewykorzystany okres otrzymasz to, co przewiduje prawo.",
   "Jeśli zmienimy te warunki, opublikujemy nową wersję na tej stronie z datą; jeśli zmiany są ważne, powiemy ci o nich w aplikacji, zanim zaczną obowiązywać. Zmiany nie dotyczą zakupów już zrobionych."]),
  ("12. Odpowiedzialność", ["Odpowiadamy za to, by Tanetto działało tak, jak opisują te warunki i jak wymaga prawo konsumenckie. Nie odpowiadamy za problemy, które od nas nie zależą, takie jak telefon, połączenie z internetem albo usługi innych firm, na przykład Google. Tanetto nie udziela porad medycznych: decyzje o swoim zdrowiu omawiaj ze specjalistą. Nic w tych warunkach nie ogranicza naszej odpowiedzialności tam, gdzie prawo na to nie pozwala, na przykład za winę umyślną lub rażące niedbalstwo albo za szkody na życiu, ciele lub zdrowiu, i nic nie ogranicza twoich praw konsumenta."]),
  ("13. Prawo, sąd i reklamacje", [
   "Te warunki podlegają prawu włoskiemu. Jeśli jesteś konsumentem, zachowujesz też ochronę bezwzględnie obowiązujących przepisów kraju, w którym mieszkasz.",
   "Jeśli jesteś konsumentem w Unii Europejskiej, możesz wnieść sprawę do sądu kraju, w którym mieszkasz, a my możemy pozwać cię tylko tam; we Włoszech właściwy jest sąd miejsca twojego zamieszkania lub pobytu (art. 66-bis włoskiego Kodeksu konsumenckiego).",
   "Z każdą reklamacją napisz najpierw do nas na {E}: odpowiemy jak najszybciej. Jeśli mieszkasz w Unii Europejskiej, możesz też poprosić o bezpłatną pomoc [Europejskie Centrum Konsumenckie w swoim kraju](@ECC)."]),
 ],
}

T["nl"] = {
 "title": "Gebruiksvoorwaarden", "upd": "Laatst bijgewerkt: {date}",
 "intro": "Deze voorwaarden gelden als je Tanetto gebruikt, zowel de app voor Android als de versie die in de browser werkt. Lees ze samen met het privacybeleid ({P}). Is iets niet duidelijk, vraag het dan aan een volwassene die je vertrouwt of schrijf ons.",
 "s": [
  ("1. Wie we zijn", ["Tanetto wordt gemaakt door {OWNER}, Italië, de aanbieder van de dienst die in het privacybeleid staat ({P}). Je kunt ons over alles schrijven, ook voor klachten en herroepingen, via {E}. Google Play toont ook de contactgegevens van de ontwikkelaar op de pagina van Tanetto."]),
  ("2. Wat Tanetto is", ["Tanetto helpt je kleine dagelijkse gewoontes op te bouwen met een virtueel maatje. Het is een app voor welzijn en gewoontes, geen medische of psychologische dienst, en vervangt geen hulp van een professional. Ben je in gevaar of heb je dringend hulp nodig, bel dan het noodnummer van waar je bent; in het dagboek vind je ook hulplijnen van je land."]),
  ("3. Wie het mag gebruiken", [
   "Tanetto is bedoeld voor mensen vanaf 13 jaar en is niet gericht op kinderen onder de 13. De app vraagt je geboortemaand en -jaar: het is de leeftijd die je zelf opgeeft, en wij kunnen die niet controleren. Vul je een leeftijd onder de 13 in, of zeg je het liever niet, dan werkt Tanetto in de beschermde modus, zoals het privacybeleid uitlegt.",
   "Ben je minderjarig, gebruik Tanetto dan met toestemming van een ouder of voogd en vraag het hun voordat je iets koopt. Aankopen gaan via het Google-account op de telefoon: ouders kunnen Google Play zo instellen dat er voor elke aankoop goedkeuring of een wachtwoord nodig is."]),
  ("4. Tanetto Plus", [
   "Tanetto is gratis te downloaden en de kern blijft gratis. Tanetto Plus is een optioneel abonnement, per maand of per jaar, met de extra's die de app vóór de aankoop beschrijft. In Italië kost het € 4,99 per maand of € 44,99 per jaar, inclusief btw; in andere landen toont Google Play vóór je bevestigt de prijs in jouw valuta, en die prijs geldt.",
   "Betalingen, verlengingen, opzeggingen en terugbetalingen worden door Google Play afgehandeld, volgens de eigen voorwaarden: wij ontvangen nooit je kaart- of betaalgegevens.",
   "Een abonnement kan een gratis proefperiode hebben voor nieuwe abonnees die daar recht op hebben: Google Play toont hoe lang die duurt en wanneer de eerste betaling volgt. Zeg je niet op voor het einde van de proefperiode, dan begint het abonnement en wordt er betaald.",
   "Het abonnement wordt aan het einde van elke periode automatisch verlengd tot je het opzegt via Google Play › Abonnementen. Opzeggen stopt de volgende verlenging, en Plus blijft actief tot het einde van de al betaalde periode. Als de prijs verandert, laat Google Play je dat van tevoren weten en vraagt, waar nodig, om je toestemming.",
   "Plus werkt in de app voor Android en is gekoppeld aan het Google-account waarmee je het hebt gekocht: op een andere telefoon met hetzelfde account kun je het terugzetten."]),
  ("5. Tanì", [
   "Tanì zijn de munten van de app. Je verdient ze door met Tanetto goed voor jezelf te zorgen, en je kunt ook Tanì-pakketten kopen via Google Play, tegen de prijs die vóór je bevestiging wordt getoond. Gekochte Tanì worden meteen toegevoegd.",
   "Tanì zijn een virtuele munt die je alleen in de app gebruikt: ze zijn geen geld, hebben geen geldwaarde, kunnen niet worden ingewisseld voor geld en kunnen niet aan anderen worden overgedragen. Tanì uit pakketten werken in de hele winkel behalve voor de Onvindbare schatten: die koop je alleen met Tanì die je verdient door goed voor jezelf te zorgen.",
   "Tanì en je voortgang worden op je apparaat opgeslagen en, als je een account hebt, in de online back-up. Verwijder je de gegevens van de app of begin je opnieuw zonder back-up of opgeslagen kopie, dan kunnen wij ze niet terugzetten."]),
  ("6. Advertenties", ["Tanetto heeft geen advertenties die vanzelf verschijnen. In de app voor Android kun je zelf kiezen om een korte video van Google AdMob te bekijken voor een kleine beloning, tot 5 keer per dag. Met Tanetto Plus zijn er geen advertenties, en onder de 13 zijn er helemaal geen; voor minderjarigen en voor wie zijn leeftijd niet opgeeft, worden de video's nooit gepersonaliseerd. De video's hangen af van Google: soms is er misschien geen beschikbaar."]),
  ("7. Account en online back-up", [
   "Je hebt geen account nodig. Heb je de leeftijd die de privacywet van je land vraagt (13 tot 16 jaar, afhankelijk van het land), dan kun je een optioneel account maken met Google of met e-mail en wachtwoord, om je voortgang gratis online te back-uppen. Bewaar je wachtwoord veilig en deel je account met niemand.",
   "De online back-up is een gratis extra: we doen ons best om hem altijd te laten werken, maar we raden je aan ook een kopie op je apparaat te bewaren met “Kopie opslaan”. Je kunt je account en online back-up altijd verwijderen via Profiel › Account en gegevens › Account beheren › Profiel verwijderen, of op {D}."]),
  ("8. Gebruiksregels", [
   "Tanetto is voor persoonlijk, niet-commercieel gebruik. Doe alsjeblieft het volgende niet:",
   ["de app of de inhoud ervan kopiëren, aanpassen, doorverkopen of verspreiden;",
    "proberen Tanì, Plus of beloningen te krijgen op manieren die de app niet biedt, bijvoorbeeld met een aangepaste app, nepaankopen of neputnodigingen;",
    "proberen in accounts of gegevens van anderen te komen, of de dienst verstoren;",
    "Tanetto gebruiken op manieren die in strijd zijn met de wet."],
   "Als de app “Een vriend uitnodigen” aanbiedt (alleen vanaf 18 jaar), gelden de beloningen en grenzen die de app toont, en beloningen die met valsspelen zijn verkregen, zijn niet verschuldigd. Wordt een account gebruikt om deze regels te breken, dan kunnen we het opschorten of verwijderen en vertellen we je waar mogelijk waarom; dit raakt geen terugbetaling waar je wettelijk recht op hebt."]),
  ("9. Jouw inhoud en de onze", ["Wat je in Tanetto schrijft, is van jou. Het blijft op je apparaat en, als je een account hebt, in je online back-up, die alleen dient om het terug te zetten (zie het privacybeleid). De illustraties, personages, teksten, muziek en code van Tanetto zijn auteursrechtelijk beschermd en mogen niet zonder toestemming worden gekopieerd of hergebruikt; de afbeeldingen uit de perskit mag je gebruiken om over Tanetto te schrijven. De opensourcecomponenten en hun licenties staan op {LIC}."]),
  ("10. Herroepingsrecht en wettelijke garantie", [
   "Ben je consument in de Europese Unie of het Verenigd Koninkrijk, dan geeft de wet je meestal 14 dagen om een online aankoop te herroepen, zonder reden op te geven.",
   "Tanì en Tanetto Plus zijn digitale inhoud die meteen wordt geleverd. Als je ze via Google Play koopt, ga je akkoord met directe levering en erken je dat je je herroepingsrecht verliest zodra de levering is begonnen ([regels van Google Play](@EEA)). Een gratis proefperiode kost niets en kun je altijd opzeggen voordat die afloopt.",
   "Heb je nog wel herroepingsrecht, dan kun je het binnen 14 dagen na de aankoop gebruiken door Google Play om terugbetaling te vragen, of door naar {E} een duidelijke verklaring te sturen, bijvoorbeeld: “Ik herroep de aankoop van [product] op [datum], Google Play-bestelnummer [GPA…]”. We antwoorden zonder vertraging, en een geldige herroeping wordt via Google Play terugbetaald, met dezelfde betaalmethode.",
   "In elk geval behoud je de wettelijke garantie: als Tanetto Plus of Tanì niet werken zoals beschreven, schrijf ons en we lossen het op; lukt dat niet, dan kun je een prijsverlaging of terugbetaling vragen, zoals de wet bepaalt. Ook het [terugbetalingsbeleid van Google Play](@REF) blijft voor je gelden."]),
  ("11. Wijzigingen en beschikbaarheid", [
   "We werken eraan dat Tanetto goed werkt en beter wordt, dus sommige functies kunnen in de loop van de tijd veranderen. Tijdens een periode die je al hebt betaald, nemen we de belangrijkste voordelen van Plus niet weg; raakt een wijziging je flink, dan laten we het je van tevoren weten in de app of op deze site.",
   "Soms is Tanetto misschien niet beschikbaar, bijvoorbeeld tijdens updates of als de diensten van Google problemen hebben. Als we ooit stoppen met Tanetto, laten we het je van tevoren weten: abonnementen worden niet meer verlengd, en voor een eventuele al betaalde en niet gebruikte periode krijg je wat de wet bepaalt.",
   "Als we deze voorwaarden wijzigen, publiceren we de nieuwe versie op deze pagina met de datum; zijn de wijzigingen belangrijk, dan laten we het je in de app weten voordat ze gelden. Wijzigingen gelden niet voor aankopen die je al hebt gedaan."]),
  ("12. Aansprakelijkheid", ["We zijn verantwoordelijk voor het leveren van Tanetto zoals in deze voorwaarden staat en zoals het consumentenrecht vereist. We zijn niet verantwoordelijk voor problemen die niet van ons afhangen, zoals de telefoon, de internetverbinding of de diensten van andere bedrijven, zoals Google. Tanetto geeft geen medisch advies: bespreek beslissingen over je gezondheid met een professional. Niets in deze voorwaarden beperkt onze aansprakelijkheid waar de wet dat niet toestaat, bijvoorbeeld bij opzet of grove nalatigheid of bij schade aan leven, lichaam of gezondheid, en niets beperkt je rechten als consument."]),
  ("13. Recht, rechter en klachten", [
   "Op deze voorwaarden is het Italiaanse recht van toepassing. Ben je consument, dan houd je ook de bescherming van de dwingende regels van het land waar je woont.",
   "Ben je consument in de Europese Unie, dan kun je naar de rechter in het land waar je woont, en kunnen wij alleen daar een zaak tegen jou beginnen; in Italië is de rechter van je woon- of verblijfplaats bevoegd (art. 66-bis van het Italiaanse consumentenwetboek).",
   "Heb je een klacht, schrijf ons dan eerst via {E}: we antwoorden zo snel mogelijk. Woon je in de Europese Unie, dan kun je ook gratis hulp vragen aan het [Europees Consumentencentrum van je land](@ECC)."]),
 ],
}

T["tr"] = {
 "title": "Kullanım koşulları", "upd": "Son güncelleme: {date}",
 "intro": "Bu koşullar, Tanetto'yu kullandığında geçerlidir: hem Android uygulaması hem de tarayıcıda çalışan sürüm için. Lütfen gizlilik politikasıyla ({P}) birlikte oku. Anlamadığın bir şey olursa güvendiğin bir yetişkine sor ya da bize yaz.",
 "s": [
  ("1. Biz kimiz", ["Tanetto'yu, gizlilik politikasında ({P}) belirtilen hizmet sağlayıcı olan {OWNER} (İtalya) yapıyor. Şikâyetler ve cayma dahil her konuda bize {E} adresinden yazabilirsin. Google Play de Tanetto sayfasında geliştiricinin iletişim bilgilerini gösterir."]),
  ("2. Tanetto nedir", ["Tanetto, sanal bir arkadaşla küçük günlük alışkanlıklar edinmene yardım eder. Bir iyi oluş ve alışkanlık uygulamasıdır; tıbbi ya da psikolojik bir hizmet değildir ve bir uzmanın yardımının yerini tutmaz. Tehlikedeysen ya da hemen yardıma ihtiyacın varsa bulunduğun yerin acil durum numarasını ara; günlükte ülkendeki yardım hatları da yer alır."]),
  ("3. Kimler kullanabilir", [
   "Tanetto 13 yaş ve üzerindekiler için tasarlandı ve 13 yaşından küçük çocuklara yönelik değildir. Uygulama doğum ayını ve yılını sorar: bu, kendi beyan ettiğin yaştır ve bunu doğrulayamayız. 13 yaşından küçük bir yaş girersen ya da söylememeyi tercih edersen Tanetto, gizlilik politikasında anlatıldığı gibi korumalı modda çalışır.",
   "Reşit değilsen Tanetto'yu bir ebeveynin ya da vasinin onayıyla kullan ve bir şey satın almadan önce onlara sor. Satın almalar telefondaki Google hesabıyla yapılır: ebeveynler, Google Play'i her satın almadan önce onay ya da şifre isteyecek şekilde ayarlayabilir."]),
  ("4. Tanetto Plus", [
   "Tanetto ücretsiz indirilir ve özü ücretsiz kalır. Tanetto Plus, satın almadan önce uygulamada anlatılan ek içerikleri sunan, aylık ya da yıllık isteğe bağlı bir aboneliktir. İtalya'da fiyatı ayda 4,99 € ya da yılda 44,99 €'dur (KDV dahil); diğer ülkelerde Google Play, onaylamadan önce fiyatı senin para biriminde gösterir ve geçerli olan fiyat odur.",
   "Ödeme, yenileme, iptal ve iadeleri Google Play kendi koşullarına göre yönetir: kart ya da ödeme bilgilerini asla almayız.",
   "Bir plan, hak kazanan yeni aboneler için ücretsiz deneme içerebilir: Google Play ne kadar süreceğini ve ilk ödemenin ne zaman alınacağını gösterir. Deneme bitmeden iptal etmezsen abonelik başlar ve ücret alınır.",
   "Abonelik, Google Play › Abonelikler'den iptal edene kadar her dönemin sonunda otomatik olarak yenilenir. İptal bir sonraki yenilemeyi durdurur ve Plus, ödenmiş dönemin sonuna kadar etkin kalır. Fiyat değişirse Google Play bunu önceden bildirir ve gerektiğinde onayını ister.",
   "Plus, Android uygulamasında çalışır ve satın alındığı Google hesabına bağlıdır: aynı hesapla başka bir telefonda geri yükleyebilirsin."]),
  ("5. Tanì", [
   "Tanì, uygulamanın paralarıdır. Tanetto ile kendine iyi bakarak kazanırsın; ayrıca onaylamadan önce gösterilen fiyattan Google Play üzerinden Tanì paketleri de satın alabilirsin. Satın alınan Tanì hemen eklenir.",
   "Tanì yalnızca uygulama içinde kullanılan sanal bir paradır: gerçek para değildir, parasal değeri yoktur, paraya çevrilemez ve başkalarına aktarılamaz. Paketlerden gelen Tanì, Bulunmaz hazineler dışında mağazanın tamamında geçer: bunlar yalnızca kendine iyi bakarak kazandığın Tanì ile alınır.",
   "Tanì ve ilerlemen cihazında ve, bir hesabın varsa, çevrim içi yedekte saklanır. Bir yedeğin ya da kaydedilmiş bir kopyan olmadan uygulamanın verilerini silersen ya da baştan başlarsan bunları geri getiremeyiz."]),
  ("6. Reklamlar", ["Tanetto'da kendiliğinden açılan reklam yoktur. Android uygulamasında küçük bir ödül almak için Google AdMob tarafından sağlanan kısa bir videoyu izlemeyi kendin seçebilirsin; günde en fazla 5 kez. Tanetto Plus'ta reklam yoktur, 13 yaşından küçükler için de hiç reklam yoktur; reşit olmayanlar ve yaşını söylemeyenler için videolar asla kişiselleştirilmez. Videolar Google'a bağlıdır: bazen izlenecek video olmayabilir."]),
  ("7. Hesap ve çevrim içi yedek", [
   "Hesap gerekmez. Ülkendeki gizlilik yasasının istediği yaştaysan (ülkeye göre 13 ile 16 arası), ilerlemeni ücretsiz olarak çevrim içi yedeklemek için Google ile ya da e-posta ve şifreyle isteğe bağlı bir hesap oluşturabilirsin. Şifreni güvende tut ve hesabını kimseyle paylaşma.",
   "Çevrim içi yedek ücretsiz bir ek hizmettir: her zaman çalışması için elimizden geleni yaparız, ama “Kopya kaydet” ile cihazında da bir kopya tutmanı öneririz. Hesabını ve çevrim içi yedeğini istediğin zaman Profil › Hesap ve veriler › Hesabı yönet › Profili sil yoluyla ya da {D} adresinden silebilirsin."]),
  ("8. Kullanım kuralları", [
   "Tanetto kişisel ve ticari olmayan kullanım içindir. Lütfen şunları yapma:",
   ["uygulamayı ya da içeriğini kopyalamak, değiştirmek, yeniden satmak veya dağıtmak;",
    "Tanì, Plus ya da ödülleri uygulamanın sunmadığı yollarla, örneğin değiştirilmiş bir uygulamayla, sahte satın almalarla ya da sahte davetlerle elde etmeye çalışmak;",
    "başkalarının hesaplarına ya da verilerine girmeye çalışmak veya hizmeti bozmak;",
    "Tanetto'yu yasaya aykırı şekillerde kullanmak."],
   "Uygulama “Arkadaşını davet et” özelliğini sunuyorsa (yalnızca 18 yaş ve üzeri için), ödüller ve sınırlar uygulamada gösterildiği gibidir; hile ile elde edilen ödüller verilmez. Bir hesap bu kuralları çiğnemek için kullanılırsa onu askıya alabilir ya da silebiliriz ve mümkün olduğunda nedenini açıklarız; bu, yasa gereği hak ettiğin iadeleri etkilemez."]),
  ("9. Senin içeriğin ve bizimki", ["Tanetto'da yazdıkların senindir. Cihazında ve, bir hesabın varsa, yalnızca geri yükleme için kullanılan çevrim içi yedeğinde kalır (gizlilik politikasına bak). Tanetto'nun çizimleri, karakterleri, metinleri, müzikleri ve kodu telif hakkıyla korunur ve izin alınmadan kopyalanamaz ya da yeniden kullanılamaz; basın kitindeki görseller Tanetto hakkında yazmak için kullanılabilir. Açık kaynak bileşenler ve lisansları {LIC} sayfasında listelenir."]),
  ("10. Cayma hakkı ve yasal garanti", [
   "Avrupa Birliği'nde ya da Birleşik Krallık'ta bir tüketiciysen, yasa genellikle internetten yaptığın bir satın almadan gerekçe göstermeden cayman için sana 14 gün tanır.",
   "Tanì ve Tanetto Plus hemen sağlanan dijital içeriklerdir. Bunları Google Play'den satın alırken hemen sağlanmasını kabul eder ve sağlama başladıktan sonra cayma hakkını kaybettiğini onaylarsın ([Google Play kuralları](@EEA)). Ücretsiz deneme hiçbir şeye mal olmaz ve bitmeden önce istediğin zaman iptal edebilirsin.",
   "Cayma hakkın hâlâ varsa, satın almadan sonraki 14 gün içinde Google Play'den iade isteyerek ya da {E} adresine açık bir beyan yazarak kullanabilirsin, örneğin: “[tarih] tarihinde yaptığım [ürün] satın alımından cayıyorum, Google Play sipariş numarası [GPA…]”. Gecikmeden yanıt veririz ve geçerli bir cayma, Google Play üzerinden aynı ödeme yöntemiyle iade edilir.",
   "Her durumda yasal garanti hakkın saklıdır: Tanetto Plus ya da Tanì anlatıldığı gibi çalışmazsa bize yaz, sorunu çözeriz; çözemezsek yasanın öngördüğü şekilde fiyat indirimi ya da iade isteyebilirsin. [Google Play'in iade politikaları](@REF) da geçerliliğini korur."]),
  ("11. Değişiklikler ve erişilebilirlik", [
   "Tanetto'nun iyi çalışması ve gelişmesi için çalışıyoruz, bu yüzden bazı özellikler zamanla değişebilir. Ödenmiş bir dönem boyunca Plus'ın temel avantajlarını kaldırmayız; bir değişiklik seni önemli ölçüde etkiliyorsa bunu önceden uygulamada ya da bu sitede bildiririz.",
   "Tanetto bazen kullanılamayabilir, örneğin güncellemeler sırasında ya da Google hizmetlerinde sorun olduğunda. Bir gün Tanetto'yu sunmayı bırakırsak bunu önceden bildiririz: abonelikler yenilenmez ve ödenmiş ama kullanılmamış bir dönem varsa yasanın öngördüğünü alırsın.",
   "Bu koşulları değiştirirsek yeni sürümü tarihiyle birlikte bu sayfada yayımlarız; değişiklikler önemliyse, geçerli olmadan önce uygulamada bildiririz. Değişiklikler daha önce yapılmış satın almaları etkilemez."]),
  ("12. Sorumluluk", ["Tanetto'yu bu koşullarda anlatıldığı gibi ve tüketici hukukunun gerektirdiği şekilde sunmaktan sorumluyuz. Telefon, internet bağlantısı ya da Google gibi başka şirketlerin hizmetleri gibi bize bağlı olmayan sorunlardan sorumlu değiliz. Tanetto tıbbi tavsiye vermez: sağlığınla ilgili kararlar için bir uzmana danış. Bu koşullardaki hiçbir şey, yasanın izin vermediği durumlarda, örneğin kast ya da ağır ihmal veya hayata, bedene ya da sağlığa verilen zararlarda sorumluluğumuzu sınırlamaz ve hiçbir şey tüketici olarak haklarını sınırlamaz."]),
  ("13. Uygulanacak hukuk, mahkeme ve şikâyetler", [
   "Bu koşullar İtalyan hukukuna tabidir. Tüketiciysen, yaşadığın ülkenin emredici kurallarının sağladığı korumayı da korursun.",
   "Avrupa Birliği'nde bir tüketiciysen yaşadığın ülkenin mahkemelerinde dava açabilirsin; biz de sana karşı yalnızca orada dava açabiliriz. İtalya'da yetkili mahkeme, yerleşim yerinin ya da ikametgâhının bulunduğu yerin mahkemesidir (İtalyan Tüketici Kanunu md. 66-bis).",
   "Her türlü şikâyet için önce bize {E} adresinden yaz: en kısa sürede yanıt veririz. Avrupa Birliği'nde yaşıyorsan [ülkendeki Avrupa Tüketici Merkezi](@ECC)'nden ücretsiz yardım da isteyebilirsin."]),
 ],
}
