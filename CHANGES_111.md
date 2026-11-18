# Tanetto 1.0.11 (versionCode 114): cosa cambia e perché

Preparata il 17/11/2026 e completata il 18/11/2026 sul ramo `rel-111`. **Non è stata inviata a Google.**
È la versione che **sostituisce la 1.0.10 in revisione** (niente build 113: tutto è dentro la 1.0.11).

**Prezzi mai toccati.** Una sola moneta (Tanì). Massimo 5 video al giorno, mai a chi dichiara meno di 13 anni.


## 1) Novità che si vedono

1) **Widget della schermata Home** (solo Android), in due misure: **piccolo (2x2)** e **largo (4x2)**.
Si vede il compagno in 3D con la posa del giorno, il nome e quanti obiettivi sono fatti oggi ("2/5").
Tema chiaro e scuro, 14 lingue, si aggiorna anche a mezzanotte. La scheda **"Metti Germo sulla tua Home"**
si propone una volta sola dopo 3 giorni d'uso e poi resta nel Profilo.

2) **La tua icona accanto al nome** ("Buongiorno, NOME" in Casa): 12 icone per tutti e 12 con Tanetto Plus.
Si tocca l'icona (o il saluto) e si sceglie. Il **simbolo della stagione** accanto al saluto e ai titoli **non c'è più**.

3) **Eventi nella stanza:** per Lanterne, Natale, Nuovo inizio, Stelle e Aquiloni la stanza si trasforma
(cielo alla finestra, decorazioni appese, luce, neve a Natale, alberello nel vaso). Ogni evento ha **la sua musica**
(solo con la musica accesa).

4) **La cartolina della settimana:** l'ultimo giorno della settimana dalle 18 compare in Oggi una scheda discreta;
la cartolina mostra solo i 7 giorni e la stagione (niente obiettivi, umore o diario). Formati 9:16 e quadrato.

5) **Invita un amico** (solo adulti): 50 Tanì all'amico, 100 a chi invita quando l'amico usa l'app in 3 giorni diversi
(massimo 3 amici). **Finché non pubblichi le regole di Firestore** resta la condivisione semplice di prima (nessun premio
promesso): i passi sono in `CHANGES_111_NATIVE.md`, sezione "Cosa serve da te".

6) **Richiesta di recensione** (finestra ufficiale di Google Play) solo nei momenti felici, solo adulti, al massimo una volta
ogni 60 giorni.

7) **Nuova icona dell'app** (Germo centrato, sfondo caldo, icona a tema con la sua sagoma).

8) **Spagnolo:** 4 mete nuove dell'America Latina (Chichén Itzá, Valle de Cocora, Lago Titicaca, Purmamarca).

9) **Voce più gentile** nelle 14 lingue (niente "ti aspetta", niente sensi di colpa); contrasto migliore su alcuni pulsanti.


## 2) Bambini e pubblico (decisione del 17/11/2026)

1) Su Play Console il pubblico è **13-15, 16-17, 18+**. Chi indica **meno di 13 anni, "Preferisco non dirlo" o non ha ancora
risposto** usa l'app in **modalità protetta**: niente pubblicità, niente statistiche, niente account
online, niente prova gratuita di Plus, **nessuna condivisione fuori dall'app** (le immagini si possono solo salvare),
niente richiesta di recensione, niente "Invita un amico", niente inviti a Plus (Plus resta in Profilo > Acquisti e Plus).

2) **Uscita da Google Play Families (18/11/2026):** i **video con premio** restano spenti solo per chi **dichiara meno di 13 anni**
(niente SDK, niente consenso, niente video). Chi sceglie "Preferisco non dirlo" o non ha ancora risposto **vede i video**,
trattati come per i ragazzi: **mai personalizzati** (TFUA, contenuti adatti ai ragazzi). Per tutto il resto (backup online,
"Chiedi a un adulto", modalità protetta) per lui non cambia niente. Informativa, scheda Privacy e "Preferisco non dirlo"
in Profilo lo dicono nelle 14 lingue.

3) Schermata dell'età: tolta la frase "Tanetto è per tutte le età" (14 lingue); resta solo "Te lo chiediamo una volta sola".

4) Informativa privacy aggiornata nelle 14 lingue (data **18/11/2026**).


## 2b) Ultime modifiche (18/11/2026)

1) **Nuovo indirizzo del sito: https://tanetto.app** (stessi percorsi). Lo usano tutti i link che si vedono, si condividono
o si aprono: la scheda "Ti presento Germo!" (sotto il titolo ora c'è **tanetto.app**), i testi e le cartoline condivise,
l'invito, la privacy (**https://tanetto.app/privacy.html**), la cancellazione dell'account
(**https://tanetto.app/elimina-account.html**), il sito in Profilo, 14 lingue. Il sito funziona sia su tanetto.app sia sul
vecchio indirizzo (copia senza internet e statistiche comprese). Accesso con Google e backup: invariati.

2) **Suoni subito su Android:** il suono del cambio di scheda arrivava circa un secondo dopo il tocco. Ora i suoni brevi sono
pronti una volta sola e quello delle schede parte **appena il dito tocca**; il motore dei suoni si risveglia al primo
contatto e si addormenta solo dopo 45 secondi senza tocchi. Interruttore dei suoni, musica, modalità calma/leggera e
protetta come prima.

3) **Zaino (Avventure):** il testo dice chiaramente che ogni obiettivo completato riempie lo zaino (14 lingue).

4) **Modalità protetta:** spariscono anche la scheda "Scopri Tanetto Plus", la proposta di Plus che si apre da sola e il
pulsante di Plus dell'albero di Natale.


## 3) Correzioni fatte nell'unione (17/11/2026)

1) **Lettere polacche e turche nell'app Android:** il carattere di riserva per "ą ę ś ż ğ ş İ" c'era sul sito ma **non veniva
copiato nell'app** (per questo nelle schermate dello Store "Cześć", "Şekerleme", "İstanbul" uscivano con un carattere diverso).
Ora c'è, e la preparazione dell'app si ferma da sola se manca un carattere.

2) **Negozio dei Tanì, Plus e fogli dal basso 28 px più in basso:** con le animazioni accese l'animazione della 1.0.10 e quella
del foglio si sommavano e il foglio restava **28 px più in basso per sempre** (nel negozio la striscia "Chiudi" stava a metà
schermo con la pagina visibile sopra; nei fogli dal basso si perdevano 28 px sotto il bordo). Ora il foglio arriva al posto giusto.

3) **Zaino:** sotto le caselle "Gita breve" e **"Viaggio"** (prima "Viaggio completo", che andava su due righe).
Anche in spagnolo, francese, portoghese, russo, polacco e turco la scritta corta ora sta su una riga a 360 e 412 px
(Viaje, Voyage, Viagem, Поездка, Podróż, Yolculuk). Negli altri punti resta la forma lunga.

4) **Senza internet (sito):** la copia salvata dell'app si aggiorna solo dalla pagina principale (prima anche da altre pagine
del sito che finivano con "/").

5) **Immagini:** le 24 icone nuove ricompresse senza differenze visibili (da 124 a 83 KB). Totale immagini 3,84 MB
(soglia della prova portata da 3,8 a 3,9 MB, motivata: icone e cartoline nuove).

6) **Icona dell'app:** l'ombra morbida sotto Germo usciva di poco dalla zona sicura di 66 dp (alcune forme di icona dei
telefoni l'avrebbero tagliata). Ora sfuma prima del bordo; Germo è identico.

7) **Spunta degli obiettivi:** su un telefono lento il cerchio verde compariva già a metà crescita; ora parte da zero e
cresce sempre per intero (stessa durata).

8) **Casa:** quando c'è la cartolina della settimana prende il posto delle altre richieste (al massimo una scheda in più).

9) **Stanza a schermo intero:** se scorrevi la fila delle scene e l'app si ridisegnava da sola (per esempio dopo il controllo
degli acquisti), la fila tornava all'inizio. Ora resta dove l'hai lasciata.


## 4) Da fare su Play Console (con il caricamento)

1) **Sicurezza dei dati:** aggiungere (o completare, se ci sono già per la pubblicità) "Dispositivo o altri ID" e
"Interazioni con l'app" per Invita un amico (raccolti, non condivisi, facoltativi; scopi: funzionalità e prevenzione delle frodi). Dettagli in `docs/DATA_SAFETY_111.md`.
Le statistiche anonime nuove (passi del primo avvio, cartolina della settimana) sono interazioni già dichiarate:
dettagli in `docs/PLAY_DATA_SAFETY_111.md`.

2) **Pubblico:** 13-15, 16-17, 18+ (come deciso).

3) **Facoltativo:** pubblicare le regole di Firestore per accendere i premi di Invita un amico (`CHANGES_111_NATIVE.md`).

4) **Nuovo indirizzo tanetto.app:** su Play Console aggiornare l'indirizzo dell'**informativa privacy**
(https://tanetto.app/privacy.html), quello per la **cancellazione dell'account** in Sicurezza dei dati
(https://tanetto.app/elimina-account.html) e il **sito web** della scheda dello Store (https://tanetto.app).
Su GitHub Pages il dominio personalizzato **tanetto.app** deve essere attivo (con HTTPS); in Firebase > Authentication >
Impostazioni > Domini autorizzati aggiungere **tanetto.app** (serve solo per l'accesso con Google dal sito; l'app Android
non cambia).

5) **Families:** l'app esce dal programma Families: in Contenuti dell'app > Pubblico di destinazione il pubblico resta
solo **13-15, 16-17, 18+** (nessuna fascia sotto i 13 anni).


## 5) Prove (18/11/2026, tutte verdi)

1) **Prove nuove e della 1.0.10 (tests/t110):** 27 suite, **2480 controlli OK, 0 NO** (compresa la parte nativa nel
browser: widget, recensione, invito, 190 OK). Nuova `t_113_sfx`: il suono della scheda parte dentro il tocco
(pointerdown), una volta sola, in calma/leggera, protetta, app Android e con la musica; indirizzo tanetto.app in 14 lingue
e service worker sui due indirizzi del sito.

2) **Prove storiche (1.0.8/1.0.9):** tfix_a-f, t7, t109, tcrit, t2-t6, accessibilità (36 schermate, 0 problemi),
11 suite t38 e controllo delle 14 lingue: **tutte TUTTO OK**. Ora i loro controlli sui file leggono davvero questo
repository (prima una parte leggeva una copia vecchia in un'altra cartella); le attese cambiate apposta sono in
`tests/legacy_patches.py`, ognuna con il motivo.

3) **Widget disegnato con la grafica vera di Android (Robolectric):** 10 prove su 10.
**Regole di Firestore con l'emulatore:** 25 casi su 25 (abusi compresi).

4) **Build:** AAB e APK firmati con la stessa chiave di caricamento della 1.0.10, versionCode 114, versionName 1.0.11;
app.js dentro l'AAB e l'APK identico a quello costruito.
