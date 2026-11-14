/* v19 (1.0.7): informativa privacy, video con premio facoltativi (Google AdMob + consenso Google UMP), solo nell'app Android.
   1) Il paragrafo "Cookie: ... né pubblicità" diventa accurato (niente cookie di profilazione propri, pubblicità solo se la scegli tu).
   2) Subito dopo si aggiunge il paragrafo "Video con premio (solo app Android)".
   Se il paragrafo dei cookie non si trova, il nuovo paragrafo va prima di "I tuoi diritti". Si può rieseguire senza duplicare nulla.
   Sta in un file "3..." perché lo usa anche la pagina pubblica privacy.html (legal_page.js). */
/* Scheda "Privacy" in Profilo: una frase sui video con premio (solo app Android). 1.0.8: frase resa esatta, senza Plus AdMob precarica i video */
const V19P_CARD = {
  it: "Nell'app Android, se non hai Plus, Google AdMob prepara in anticipo i video con premio (li guardi solo se vuoi) e per farlo tratta alcuni dati del dispositivo, come l'ID pubblicità: trovi tutto nell'informativa.",
  en: "In the Android app, if you don't have Plus, Google AdMob loads reward videos in advance (you only watch them if you want) and processes some device data to do so, such as the advertising ID: see the privacy policy for details.",
  de: "In der Android-App lädt Google AdMob ohne Plus Belohnungsvideos schon vorab (du schaust sie nur, wenn du willst) und verarbeitet dafür einige Gerätedaten, z. B. die Werbe-ID: Details findest du in der Datenschutzerklärung.",
  es: "En la app de Android, si no tienes Plus, Google AdMob prepara por adelantado los vídeos con premio (solo los ves si quieres) y para ello trata algunos datos del dispositivo, como el ID de publicidad: tienes todos los detalles en la política de privacidad.",
  fr: "Dans l'app Android, si tu n'as pas Plus, Google AdMob prépare à l'avance les vidéos récompensées (tu ne les regardes que si tu veux) et traite pour cela certaines données de l'appareil, comme l'identifiant publicitaire : tous les détails sont dans la politique de confidentialité.",
  pt: "No app Android, se você não tem Plus, o Google AdMob prepara com antecedência os vídeos com prêmio (você só assiste se quiser) e, para isso, trata alguns dados do aparelho, como o ID de publicidade: os detalhes estão na política de privacidade.",
  ja: "Androidアプリでは、Plusでない場合、Google AdMobがごほうび動画を前もって読み込みます（見るかどうかは自由です）。そのために広告IDなど端末の一部のデータを取り扱います。詳しくはプライバシーポリシーをご覧ください。",
  ko: "Android 앱에서 Plus가 아니면 Google AdMob이 보상 영상을 미리 불러와요(보는 건 원할 때만). 이를 위해 광고 ID 같은 일부 기기 데이터를 처리해요. 자세한 내용은 개인정보 처리방침에 있어요.",
  zh: "在 Android 应用中，如果你没有 Plus，Google AdMob 会提前加载奖励视频（看不看由你决定），为此会处理部分设备数据（例如广告 ID）。详情请见隐私政策。",
  zht: "在 Android App 中，如果你沒有 Plus，Google AdMob 會提前載入獎勵影片（看不看由你決定），為此會處理部分裝置資料（例如廣告 ID）。詳情請見隱私權政策。",
  ru: "В приложении для Android без Plus Google AdMob заранее загружает видео с наградой (смотреть их или нет — решаешь ты) и для этого обрабатывает некоторые данные устройства, например рекламный идентификатор: подробности в политике конфиденциальности.",
  pl: "W aplikacji na Androida, jeśli nie masz Plus, Google AdMob wczytuje filmy z nagrodą z wyprzedzeniem (oglądasz je tylko, jeśli chcesz) i w tym celu przetwarza niektóre dane urządzenia, np. identyfikator reklamowy: szczegóły znajdziesz w polityce prywatności.",
  nl: "In de Android-app laadt Google AdMob zonder Plus beloningsvideo's alvast vooraf (je kijkt ze alleen als je wilt) en verwerkt daarvoor enkele apparaatgegevens, zoals de advertentie-ID: details vind je in het privacybeleid.",
  tr: "Android uygulamasında Plus'ın yoksa Google AdMob ödüllü videoları önceden yükler (izleyip izlememek sana kalmış) ve bunun için reklam kimliği gibi bazı cihaz verilerini işler: ayrıntılar gizlilik politikasında."
};
Object.keys(V19P_CARD).forEach((k) => {
  const L0 = T[k], x = V19P_CARD[k]; if (!L0 || typeof L0.privP !== "string" || L0.privP.includes(x)) return;
  L0.privP = L0.privP.replace(/\s*$/, "") + (/^(ja|zh|zht)$/.test(k) ? "" : " ") + x;
});
