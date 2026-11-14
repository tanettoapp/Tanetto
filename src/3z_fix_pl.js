/* Proofreading fixes (pl): age wording, idioms, natural phrasing, consistent quotes */
(() => {
  const P = (n, one, few, many) => n === 1 ? one : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? few : many;
  T.pl.privP = "Twój towarzysz, cele i dziennik zostają na tym urządzeniu. Po założeniu konta zapisujemy też e-mail i kopię postępów wyłącznie po to, aby można je było odzyskać. Aby ulepszać aplikację, liczymy anonimowo i zbiorczo niektóre działania (na przykład to, jak często jest otwierana). Tanetto nie jest narzędziem medycznym i jest dla osób w każdym wieku: poniżej wieku zgody cyfrowej w twoim kraju (od 13 do 16 lat, zależnie od kraju) reklamy nigdy nie są spersonalizowane, a kopia online nie jest dostępna.";
  T.pl.letters[4] = "Liczę gwiazdy za oknem. Trochę gubię rachubę, ale i tak jest fajnie.";
  T.pl.letters[8] = "Próbuję piec ciasteczka. Wychodzą trochę przypalone, ale są zrobione z miłością.";
  T.pl.items.lamp_lava = "Lampa lawa";
  T.pl.items.w_cream = "Kremowy";
  T.pl.homeP = "Dotknij przedmiotu, by zobaczyć, jak wygląda w pokoju. Kupujesz tylko wtedy, gdy ci się spodoba.";
  T.pl.tricksP = "Z każdym poziomem twój towarzysz uczy się nowej sztuczki. Dotknij jej, żeby ją zobaczyć.";
  T.pl.talk.cheer[5] = "Serce mi mówiło, że dasz radę!";
  T.pl.stroke[2] = "Ale mi teraz miękko i puszyście.";
  T.pl.play.ballSay[2] = "Ale tempo, co?";
  T.pl.waveIn = "Przytrzymaj i zrób wdech";
  T.pl.waveOut = "Puść i zrób wydech";
  T.pl.waveDone = "Jaki spokój. Twój oddech to twoja supermoc.";
  T.pl.chat.R.angry[0] = "Rozumiem, czasem coś naprawdę doprowadza do szału. Chcesz mi się wygadać?";
  T.pl.wk.cat = (n, c) => `Ukończ ${n} ${P(n, "cel", "cele", "celów")} z kategorii „${c}”`;
  T.pl.world[13].s = "{n} śpi w chatce na palach, a tuż pod nią pływają rybki. Malediwy składają się z około 1200 wysp i są najbardziej płaskim krajem na świecie.";
})();
