/* ===== 1.0.8 (v20) — Crescita gentile: cartoline da condividere, recensione nei momenti felici, "Nuovo inizio" =====
   1) CARTOLINE DA CONDIVIDERE
      - Immagine verticale 9:16 (1080x1920): la cartolina vera (postcard() / worldArt() / realArt() via cardInfo),
        il compagno, il nome del posto e un piccolo marchio "Tanetto".
      - Si propone con un pulsante "Condividi" discreto: sulla scheda del ritorno dal viaggio (cartolina appena arrivata),
        nel livello nuovo (pulsante che c'era già: ora fa l'immagine 9:16) e nell'album, su ogni cartolina.
        Mai da sola, mai obbligatoria: prima si vede l'anteprima, poi si sceglie "Condividi" o "Salva".
      - App Android: plugin nativo TanettoShare (già esistente: PNG nella cache e FileProvider, ACTION_SEND image/png).
        Web: navigator.share con il file se si può, altrimenti si scarica il PNG.
      - Il testo porta sempre il link https://tanettoapp.github.io/Tanetto/?src=postcard
   2) SITO con ?src=postcard: il sito È l'app web (site.py copia tanetto.html in index.html), quindi la pagina si gestisce qui.
      Su un telefono Android (nel browser) compare una scheda discreta con il link a Google Play (referrer utm_source=postcard);
      su iPhone e computer si resta nella versione web, senza nulla in più. Il conteggio "arrivo-postcard" c'era già (97e_v12).
   3) RECENSIONE DI GOOGLE PLAY (finestra ufficiale, plugin nativo "Review" già esistente)
      - Solo nei momenti felici: ritorno dal viaggio (con la cartolina nuova) e 7° giorno di fila. Parte quando la scheda
        del ritorno si chiude e non c'è nessun'altra finestra aperta o in coda.
      - Mai dopo una domanda, mai legata alla risposta del questionario del 3° giorno (questo codice non la legge),
        mai con un premio, nessun pulsante "Valutaci". Al massimo una volta ogni 30 giorni, mai nei primi 3 giorni.
      - La vecchia richiesta dopo "tutti gli obiettivi fatti" (97m_review) si spegne: ora i momenti sono solo questi.
      - Sul web non fa nulla.
   4) "NUOVO INIZIO" DI GENNAIO (dal 7 al 31 gennaio, data del telefono, ogni anno; il Natale finisce il 6)
      - Alla prima apertura nel periodo: una scheda breve e calma che invita a rivedere gli obiettivi (apre l'elenco).
      - Un piccolo segno: "Nuovo inizio" con un sole che sorge accanto alla data in alto (toccandolo si riapre la scheda).
      - Niente negozio, niente Tanì. Stato in S.v20fresh = { year, seen }.
   Finestre una alla volta: si usa la coda di 98f_v20_nav (nq20) se c'è. */

const GR20_LINK = "https://tanettoapp.github.io/Tanetto/?src=postcard";
const GR20_PLAY_REF = "&referrer=utm_source%3Dpostcard%26utm_medium%3Dshare";
const GR20_REV_GAP = 30 * 86400000, GR20_REV_MIN_DAYS = 3;
const GR20_W = 1080, GR20_H = 1920;

/* --- Testi (14 lingue) --- */
const GR20_T = {
  it: { by: (p) => `Una cartolina di ${p}`, hint: "Ecco l'immagine che condividerai. Scegli tu dove mandarla.",
    txt: (p, pl) => `${p} mi ha mandato una cartolina: ${pl}. Su Tanetto parte per un viaggio quando mi prendo cura di me.`,
    txtLvl: (p, n) => `${p} è al livello ${n}! Su Tanetto cresciamo un passo alla volta, insieme.`,
    landT: "Tanetto c'è anche su Google Play", landP: "Per Android è gratis. Se preferisci, puoi provarlo subito qui nel browser.", landWeb: "Continua nel browser",
    fsPill: "Nuovo inizio", fsLbl: "Nuovo inizio: rivedi gli obiettivi", fsT: "Un nuovo inizio, con calma",
    fsP: (p) => `Gennaio è un bel momento per ripartire piano. Vuoi rivedere i tuoi obiettivi insieme a ${p}? Puoi tenerli così, cambiarli o sceglierne di più piccoli.`,
    fsGo: "Rivedi gli obiettivi", fsLater: "Va bene così" },
  en: { by: (p) => `A postcard from ${p}`, hint: "Here's the picture you'll share. You choose where it goes.",
    txt: (p, pl) => `${p} sent me a postcard: ${pl}. On Tanetto, my little companion goes on trips when I take care of myself.`,
    txtLvl: (p, n) => `${p} just reached level ${n}! On Tanetto we grow a little at a time, together.`,
    landT: "Tanetto is on Google Play too", landP: "It's free for Android. If you'd rather, you can try it right here in your browser.", landWeb: "Continue in the browser",
    fsPill: "Fresh start", fsLbl: "Fresh start: review your goals", fsT: "A fresh start, no rush",
    fsP: (p) => `January is a nice time to begin again, gently. Want to look over your goals with ${p}? Keep them as they are, change them, or pick smaller ones.`,
    fsGo: "Review my goals", fsLater: "All good as is" },
  de: { by: (p) => `Eine Postkarte von ${p}`, hint: "So sieht das Bild aus, das du teilst. Du entscheidest, wohin es geht.",
    txt: (p, pl) => `${p} hat mir eine Postkarte geschickt: ${pl}. In Tanetto geht mein kleiner Begleiter auf Reisen, wenn ich gut für mich sorge.`,
    txtLvl: (p, n) => `${p} ist jetzt auf Level ${n}! In Tanetto wachsen wir Schritt für Schritt, zusammen.`,
    landT: "Tanetto gibt es auch bei Google Play", landP: "Für Android ist es kostenlos. Wenn du magst, kannst du es auch gleich hier im Browser ausprobieren.", landWeb: "Im Browser weitermachen",
    fsPill: "Neuanfang", fsLbl: "Neuanfang: Ziele ansehen", fsT: "Ein Neuanfang, ganz in Ruhe",
    fsP: (p) => `Der Januar ist eine schöne Zeit, um sanft neu anzufangen. Magst du dir deine Ziele zusammen mit ${p} ansehen? Du kannst sie behalten, ändern oder kleinere wählen.`,
    fsGo: "Ziele ansehen", fsLater: "Passt so" },
  es: { by: (p) => `Una postal de ${p}`, hint: "Esta es la imagen que vas a compartir. Tú eliges dónde.",
    txt: (p, pl) => `${p} me ha mandado una postal: ${pl}. En Tanetto se va de viaje cuando me cuido.`,
    txtLvl: (p, n) => `¡${p} ya está en el nivel ${n}! En Tanetto vamos creciendo paso a paso.`,
    landT: "Tanetto también está en Google Play", landP: "Es gratis para Android. Si lo prefieres, puedes probarlo ahora mismo aquí en el navegador.", landWeb: "Seguir en el navegador",
    fsPill: "Nuevo comienzo", fsLbl: "Nuevo comienzo: repasa tus objetivos", fsT: "Un nuevo comienzo, sin prisas",
    fsP: (p) => `Enero es un buen momento para volver a empezar con calma. ¿Quieres repasar tus objetivos con ${p}? Puedes dejarlos como están, cambiarlos o elegir otros más pequeños.`,
    fsGo: "Repasar mis objetivos", fsLater: "Así está bien" },
  fr: { by: (p) => `Une carte postale ${/^[aeiouyhàâäéèêëîïôöûüœ]/i.test(p) ? "d'" : "de "}${p}`, hint: "Voici l'image que tu vas partager. C'est toi qui choisis où l'envoyer.",
    txt: (p, pl) => `${p} m'a envoyé une carte postale : ${pl}. Dans Tanetto, mon petit compagnon part en voyage quand je prends soin de moi.`,
    txtLvl: (p, n) => `${p} vient d'atteindre le niveau ${n} ! Dans Tanetto, on grandit un petit pas à la fois.`,
    landT: "Tanetto existe aussi sur Google Play", landP: "C'est gratuit sur Android. Si tu préfères, tu peux l'essayer tout de suite ici, dans ton navigateur.", landWeb: "Continuer dans le navigateur",
    fsPill: "Nouveau départ", fsLbl: "Nouveau départ : revoir tes objectifs", fsT: "Un nouveau départ, en douceur",
    fsP: (p) => `Janvier, c'est un bon moment pour repartir tranquillement. Tu veux revoir tes objectifs avec ${p} ? Tu peux les garder, les changer ou en choisir de plus petits.`,
    fsGo: "Revoir mes objectifs", fsLater: "C'est bien comme ça" },
  pt: { by: (p) => `Um cartão-postal de ${p}`, hint: "Esta é a imagem que você vai compartilhar. Você escolhe para onde ela vai.",
    txt: (p, pl) => `${p} me mandou um cartão-postal: ${pl}. No Tanetto, meu companheiro sai em viagem quando eu cuido de mim.`,
    txtLvl: (p, n) => `${p} chegou ao nível ${n}! No Tanetto a gente cresce um pouquinho de cada vez.`,
    landT: "O Tanetto também está no Google Play", landP: "É grátis para Android. Se preferir, você pode experimentar agora mesmo aqui no navegador.", landWeb: "Continuar no navegador",
    fsPill: "Recomeço", fsLbl: "Recomeço: reveja suas metas", fsT: "Um recomeço, com calma",
    fsP: (p) => `Janeiro é um bom momento para recomeçar devagar. Quer dar uma olhada nas suas metas com ${p}? Você pode manter, mudar ou escolher metas menores.`,
    fsGo: "Rever minhas metas", fsLater: "Está bom assim" },
  ja: { by: (p) => `${p}からのポストカード`, hint: "シェアする画像はこちらです。送り先はあなたが選べます。",
    txt: (p, pl) => `${p}からポストカードが届きました：「${pl}」。Tanettoでは、自分をいたわるとパートナーがおでかけします。`,
    txtLvl: (p, n) => `${p}がレベル${n}になりました！Tanettoで、毎日少しずつ一緒に育っています。`,
    landT: "TanettoはGoogle Playにもあります", landP: "Android版は無料です。このままブラウザですぐに試すこともできます。", landWeb: "ブラウザで続ける",
    fsPill: "新しいスタート", fsLbl: "新しいスタート：目標を見直す", fsT: "あせらず、新しいスタート",
    fsP: (p) => `1月は、ゆっくり始め直すのにぴったりの時期です。${p}と一緒に目標を見直してみませんか？そのままでも、変えても、もっと小さな目標にしても大丈夫です。`,
    fsGo: "目標を見直す", fsLater: "このままで大丈夫" },
  ko: { by: (p) => `${p}의 엽서`, hint: "공유할 이미지예요. 어디로 보낼지는 직접 골라요.",
    txt: (p, pl) => `${p}에게서 엽서가 왔어요: ${pl}. Tanetto에서는 내가 나를 돌보면 친구가 여행을 떠나요.`,
    txtLvl: (p, n) => `${p}, 레벨 ${n} 달성! Tanetto에서 매일 조금씩 함께 자라고 있어요.`,
    landT: "Tanetto는 Google Play에도 있어요", landP: "Android에서는 무료예요. 원하면 지금 바로 여기 브라우저에서 써 봐도 돼요.", landWeb: "브라우저에서 계속하기",
    fsPill: "새로운 시작", fsLbl: "새로운 시작: 목표 다시 보기", fsT: "천천히, 새로운 시작",
    fsP: () => "1월은 천천히 다시 시작하기 좋은 때예요. 목표를 한번 다시 살펴볼까요? 그대로 둬도, 바꿔도, 더 작은 목표를 골라도 괜찮아요.",
    fsGo: "목표 다시 보기", fsLater: "지금 이대로 좋아요" },
  zh: { by: (p) => `${p}寄来的明信片`, hint: "这是你要分享的图片，发到哪里由你决定。",
    txt: (p, pl) => `${p}给我寄来一张明信片：${pl}。在 Tanetto 里，只要我好好照顾自己，小伙伴就会去旅行。`,
    txtLvl: (p, n) => `${p}升到 ${n} 级啦！在 Tanetto，我们每天一起成长一点点。`,
    landT: "Tanetto 也在 Google Play 上", landP: "安卓版免费。如果你愿意，也可以现在就在浏览器里试试。", landWeb: "继续在浏览器中使用",
    fsPill: "新的开始", fsLbl: "新的开始：看看你的目标", fsT: "新的开始，慢慢来",
    fsP: (p) => `一月是重新出发的好时候，不用着急。要不要和${p}一起看看你的目标？可以保持不变，也可以调整，或者换成更小的目标。`,
    fsGo: "看看我的目标", fsLater: "现在这样就好" },
  zht: { by: (p) => `${p}寄來的明信片`, hint: "這是你要分享的圖片，要傳到哪裡由你決定。",
    txt: (p, pl) => `${p}寄了一張明信片給我：${pl}。在 Tanetto 裡，只要我好好照顧自己，小夥伴就會去旅行。`,
    txtLvl: (p, n) => `${p}升到 ${n} 級了！在 Tanetto，我們每天一起成長一點點。`,
    landT: "Tanetto 也在 Google Play 上", landP: "Android 版免費。如果你想，也可以現在就在瀏覽器裡試試看。", landWeb: "繼續在瀏覽器中使用",
    fsPill: "新的開始", fsLbl: "新的開始：看看你的目標", fsT: "新的開始，慢慢來",
    fsP: (p) => `一月是重新出發的好時機，不用急。要不要和${p}一起看看你的目標？可以維持原樣、調整一下，或換成更小的目標。`,
    fsGo: "看看我的目標", fsLater: "現在這樣就很好" },
  ru: { by: (p) => `${p} шлёт открытку`, hint: "Вот картинка, которой ты поделишься. Куда её отправить, решать тебе.",
    txt: (p, pl) => `${p} шлёт мне открытку: ${pl}. В Tanetto мой питомец отправляется в поездку, когда я забочусь о себе.`,
    txtLvl: (p, n) => `${p} уже на уровне ${n}! В Tanetto мы растём понемногу, вместе.`,
    landT: "Tanetto есть и в Google Play", landP: "Для Android это бесплатно. А если хочешь, можно попробовать прямо здесь, в браузере.", landWeb: "Продолжить в браузере",
    fsPill: "Новое начало", fsLbl: "Новое начало: посмотреть цели", fsT: "Новое начало, без спешки",
    fsP: (p) => `Январь — хорошее время, чтобы спокойно начать заново. Хочешь посмотреть на свои цели? ${p} будет рядом. Можно оставить их как есть, поменять или выбрать цели поменьше.`,
    fsGo: "Посмотреть цели", fsLater: "Всё и так хорошо" },
  pl: { by: (p) => `${p} przysyła pocztówkę`, hint: "Tak wygląda obrazek, który udostępnisz. Ty decydujesz, gdzie go wysłać.",
    txt: (p, pl) => `${p} przysyła mi pocztówkę: ${pl}. W Tanetto mój towarzysz rusza w podróż, kiedy dbam o siebie.`,
    txtLvl: (p, n) => `${p} ma już poziom ${n}! W Tanetto rośniemy krok po kroku, razem.`,
    landT: "Tanetto jest też w Google Play", landP: "Na Androida jest za darmo. Jeśli wolisz, możesz wypróbować je od razu tutaj, w przeglądarce.", landWeb: "Zostań w przeglądarce",
    fsPill: "Nowy początek", fsLbl: "Nowy początek: przejrzyj cele", fsT: "Nowy początek, bez pośpiechu",
    fsP: (p) => `Styczeń to dobry moment, żeby spokojnie zacząć od nowa. Chcesz przejrzeć swoje cele? ${p} chętnie pomoże. Możesz je zostawić, zmienić albo wybrać mniejsze.`,
    fsGo: "Przejrzyj cele", fsLater: "Jest dobrze tak, jak jest" },
  nl: { by: (p) => `Een kaartje van ${p}`, hint: "Dit is de afbeelding die je deelt. Jij kiest waarheen.",
    txt: (p, pl) => `${p} heeft me een kaartje gestuurd: ${pl}. In Tanetto gaat mijn maatje op reis als ik goed voor mezelf zorg.`,
    txtLvl: (p, n) => `${p} is nu level ${n}! In Tanetto groeien we samen, stapje voor stapje.`,
    landT: "Tanetto staat ook in Google Play", landP: "Gratis voor Android. Liever eerst proberen? Dat kan meteen hier in je browser.", landWeb: "Verder in de browser",
    fsPill: "Frisse start", fsLbl: "Frisse start: bekijk je doelen", fsT: "Een frisse start, rustig aan",
    fsP: (p) => `Januari is een fijn moment om rustig opnieuw te beginnen. Zullen we samen met ${p} naar je doelen kijken? Je kunt ze houden, aanpassen of kleinere kiezen.`,
    fsGo: "Mijn doelen bekijken", fsLater: "Zo is het goed" },
  tr: { by: (p) => `${p} bir kartpostal gönderdi`, hint: "Paylaşacağın resim bu. Nereye göndereceğine sen karar verirsin.",
    txt: (p, pl) => `${p} bana bir kartpostal gönderdi: ${pl}. Tanetto'da kendime iyi baktığımda arkadaşım geziye çıkıyor.`,
    txtLvl: (p, n) => `${p} artık seviye ${n}! Tanetto'da her gün birlikte biraz daha büyüyoruz.`,
    landT: "Tanetto Google Play'de de var", landP: "Android için ücretsiz. İstersen hemen burada, tarayıcıda da deneyebilirsin.", landWeb: "Tarayıcıda devam et",
    fsPill: "Yeni başlangıç", fsLbl: "Yeni başlangıç: hedeflerine bak", fsT: "Acele etmeden, yeni bir başlangıç",
    fsP: () => "Ocak, sakin sakin yeniden başlamak için güzel bir zaman. Hedeflerine bir göz atalım mı? Olduğu gibi bırakabilir, değiştirebilir ya da daha küçüklerini seçebilirsin.",
    fsGo: "Hedeflerime bak", fsLater: "Böyle iyi" }
};
const gr20t = () => GR20_T[S.lang] || GR20_T.en;
const gr20native = () => { try { return typeof isNativeApp === "function" && isNativeApp(); } catch (e) { return false; } };
const gr20anim = () => { try { return !!anim && !(typeof isLite === "function" && isLite()); } catch (e) { return false; } };
const gr20layerBusy = () => !!(typeof layer !== "undefined" && layer && layer.innerHTML.trim());

/* =================== 1) CARTOLINA 9:16 =================== */
/* nome del posto: i mondi fantastici di prima (f:) hanno il nome della meta, gli altri lo danno con cardInfo().place */
function gr20Place(ck, c) {
  if (c && c.place) return c.place;
  try { if (ck && ck.startsWith("f:")) return L().dests[ck.split(":")[1]] || (c && c.title) || ""; } catch (e) { /* niente */ }
  return (c && c.title) || "";
}
/* ultima cartolina arrivata (per l'immagine del livello) */
function gr20LastCard() { const a = (S.cards || []).filter((x) => typeof x === "string"); for (let i = a.length - 1; i >= 0; i--) { try { if (cardInfo(a[i])) return a[i]; } catch (e) { /* cartolina sconosciuta */ } } return null; }
function gr20Spec(kind, ck) {
  const t = gr20t(), L0 = L(), p = S.petName || "";
  if (kind === "card") {
    const c = cardInfo(ck); const place = gr20Place(ck, c);
    return { art: c.art(), kicker: t.by(p), big: place, cap: c.title && c.title !== place ? c.title : "", place, name: "tanetto-cartolina.png", text: `${t.txt(p, place)} ${GR20_LINK}`, alt: `${t.by(p)}: ${place}` };
  }
  const last = gr20LastCard(); let art, place;
  if (last) { const c = cardInfo(last); art = c.art(); place = gr20Place(last, c); }
  else { place = (L0.dests && L0.dests.forest) || ""; art = postcard("forest", 0, place); }
  const big = typeof L0.levelUpT === "function" ? L0.levelUpT(S.level) : String(S.level);
  return { art, kicker: p, big, cap: place, place, name: "tanetto-livello.png", text: `${t.txtLvl(p, S.level)} ${GR20_LINK}`, alt: `${p}: ${big}` };
}
function gr20Lines(c, text, maxW, size, min, font) {
  const set = (s) => { c.font = font.replace("{s}", s); };
  for (let s = size; s >= min; s -= 2) { set(s); if (c.measureText(text).width <= maxW) return { size: s, lines: [text] }; }
  /* due righe: a parole, oppure a caratteri per le lingue senza spazi */
  const words = /\s/.test(text.trim()) ? text.trim().split(/\s+/) : [...text];
  const join = (a) => (/\s/.test(text.trim()) ? a.join(" ") : a.join(""));
  let best = null;
  for (let s = Math.min(size, Math.round(min * 1.35)); s >= Math.round(min * 0.8); s -= 2) {
    set(s);
    for (let k = 1; k < words.length; k++) {
      const a = join(words.slice(0, k)), b = join(words.slice(k)); const w = Math.max(c.measureText(a).width, c.measureText(b).width);
      if (w <= maxW && (!best || best.size < s || (best.size === s && w < best.w))) best = { size: s, lines: [a, b], w };
    }
    if (best) return best;
  }
  /* troppo lungo anche così: una riga accorciata */
  set(min); let s2 = text; while (s2.length > 1 && c.measureText(s2 + "…").width > maxW) s2 = s2.slice(0, -1);
  return { size: min, lines: [s2 + "…"] };
}
const gr20Fonts = () => Promise.race([
  Promise.all([document.fonts.load('600 80px "Fredoka"'), document.fonts.load('500 40px "Figtree"'), document.fonts.load('italic 500 40px "Figtree"')]).catch(() => null),
  new Promise((r) => setTimeout(r, 1500))
]);
let gr20Memo = { key: "", url: "" };
async function gr20Make(kind, ck) {
  const sp = gr20Spec(kind, ck);
  const key = [kind, ck, S.lang, S.pet, S.hat, S.petName, S.level, kind === "level" ? gr20LastCard() : ""].join("|");
  if (gr20Memo.key === key && gr20Memo.url) return { url: gr20Memo.url, sp };
  const pal = (typeof WEEK_PAL !== "undefined" && (WEEK_PAL[S.pet] || WEEK_PAL.germo)) || ["#DCEFD3", "#A8D79D", "#4E8A4A"];
  const a = stripSvg(sp.art); const vb = a.vb.split(/[\s,]+/).map(Number); const asp = vb[2] > 0 && vb[3] > 0 ? vb[2] / vb[3] : 1.6;
  const AW = 880, AH = Math.max(420, Math.min(600, Math.round(AW / asp)));
  const FX = 70, FY = 520, FW = 940, FH = 30 + AH + 100; const cx = FX + FW / 2, cy = FY + FH / 2; const ROT = -1.6;
  const PS = 540, PX = (GR20_W - PS) / 2, PY = Math.min(FY + FH - 56, GR20_H - PS - 170);
  const lg = stripSvg(typeof LOGO === "string" ? LOGO : "<svg viewBox=\"0 0 32 32\"></svg>");
  const spark = (x, y, r, op) => `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${pal[2]}" opacity="${op}"/>`;
  const pet = petInner(S.pet, "felice", S.hat, stage(), 0.95);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${GR20_W}" height="${GR20_H}" viewBox="0 0 ${GR20_W} ${GR20_H}"><defs>`
    + `<linearGradient id="gr20bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFBF4"/><stop offset=".42" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient>`
    + `<clipPath id="gr20cl"><rect x="${FX + 30}" y="${FY + 30}" width="${AW}" height="${AH}" rx="12"/></clipPath></defs>`
    + `<rect width="${GR20_W}" height="${GR20_H}" fill="url(#gr20bg)"/>`
    + `<circle cx="80" cy="200" r="210" fill="#fff" opacity=".35"/><circle cx="1010" cy="1830" r="260" fill="#fff" opacity=".22"/><circle cx="1040" cy="300" r="90" fill="#fff" opacity=".25"/>`
    + spark(140, 470, 18, 0.35) + spark(950, 230, 14, 0.3) + spark(110, 1500, 16, 0.25) + spark(980, 1420, 20, 0.28)
    /* cartolina: ombra morbida, bordo bianco, disegno, francobollo e timbro */
    + `<g transform="rotate(${ROT} ${cx} ${cy})">`
    + `<rect x="${FX + 6}" y="${FY + 22}" width="${FW}" height="${FH}" rx="22" fill="#3A2510" opacity=".08"/><rect x="${FX + 3}" y="${FY + 12}" width="${FW}" height="${FH}" rx="22" fill="#3A2510" opacity=".07"/>`
    + `<rect x="${FX}" y="${FY}" width="${FW}" height="${FH}" rx="22" fill="#FFFDF8"/>`
    + `<g clip-path="url(#gr20cl)"><svg x="${FX + 30}" y="${FY + 30}" width="${AW}" height="${AH}" viewBox="${a.vb}" preserveAspectRatio="xMidYMid slice">${a.inner}</svg></g>`
    + `<rect x="${FX + 30}" y="${FY + 30}" width="${AW}" height="${AH}" rx="12" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>`
    + `<g transform="translate(${FX + FW - 132} ${FY - 34}) rotate(6)"><rect x="-6" y="-6" width="124" height="148" rx="6" fill="#FFFDF8" stroke="${pal[1]}" stroke-width="3" stroke-dasharray="7 6"/><rect x="6" y="6" width="100" height="124" rx="4" fill="${pal[0]}"/><svg x="18" y="22" width="76" height="76" viewBox="${lg.vb}">${lg.inner}</svg><rect x="30" y="108" width="52" height="7" rx="3.5" fill="${pal[2]}" opacity=".45"/></g>`
    + `<g transform="translate(${FX + FW - 250} ${FY + 8})" fill="none" stroke="${pal[2]}" stroke-opacity=".38" stroke-width="4"><circle cx="40" cy="40" r="34"/><circle cx="40" cy="40" r="24" stroke-dasharray="5 6"/><path d="M84 22q12 -8 24 0t24 0t24 0M84 40q12 -8 24 0t24 0t24 0M84 58q12 -8 24 0t24 0t24 0"/></g>`
    + `</g>`
    /* il compagno, davanti alla cartolina */
    + `<svg x="${PX}" y="${PY}" width="${PS}" height="${PS}" viewBox="0 0 200 200">${pet}</svg>`
    + `</svg>`;
  const img = await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  /* 1.0.9 (fase 3): il marchio e' il Germo 3D dell'icona (un solo Germo ovunque) */
  const logo = await loadImg(typeof BOOT_IMG === "string" ? BOOT_IMG : "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="${lg.vb}">${lg.inner}</svg>`)).catch(() => null);
  await gr20Fonts();
  const cv = document.createElement("canvas"); cv.width = GR20_W; cv.height = GR20_H; const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
  const FD = '"Fredoka", "Trebuchet MS", "Hiragino Maru Gothic ProN", "Noto Sans CJK JP", Arial, sans-serif', FB = '"Figtree", "Segoe UI", "Noto Sans CJK JP", Arial, sans-serif';
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  /* in alto: chi la manda, e il posto (o il livello) */
  const big = gr20Lines(c, sp.big || "", 900, 86, 52, `600 {s}px ${FD}`);
  const bigY = big.lines.length > 1 ? [400, 400 + big.size * 1.08] : [440];
  const kick = gr20Lines(c, sp.kicker || "", 880, 44, 30, `600 {s}px ${FB}`);
  c.font = `600 ${kick.size}px ${FB}`; c.fillStyle = pal[2]; c.fillText(kick.lines[0], GR20_W / 2, (big.lines.length > 1 ? 400 : 440) - big.size - 26);
  c.font = `600 ${big.size}px ${FD}`; c.fillStyle = "#2F2A26"; big.lines.forEach((ln, i) => c.fillText(ln, GR20_W / 2, bigY[i]));
  /* didascalia sul bordo bianco della cartolina, inclinata come lei */
  if (sp.cap) {
    c.save(); c.translate(cx, cy); c.rotate((ROT * Math.PI) / 180);
    const capT = sp.cap; const cp = gr20Lines(c, capT, FW - 140, 40, 26, `italic 500 {s}px ${FB}`);
    c.font = `italic 500 ${cp.size}px ${FB}`; c.fillStyle = "#6E655D"; c.fillText(cp.lines[0], 0, FY + 30 + AH + 64 - cy);
    c.restore();
  }
  /* marchio piccolo in basso: foglioline + "Tanetto" */
  c.font = `600 46px ${FD}`; const tw = c.measureText("Tanetto").width; const lw = logo ? 60 : 0; const gx = GR20_W / 2 - (tw + lw + 14) / 2; const my = GR20_H - 120;
  if (logo) { c.fillStyle = "rgba(255,253,248,.85)"; c.beginPath(); c.arc(gx + lw / 2, my - 16, lw / 2 + 6, 0, Math.PI * 2); c.fill(); }
  c.globalAlpha = 0.9; if (logo) { c.save(); c.beginPath(); c.arc(gx + lw / 2, my - 16, lw / 2, 0, Math.PI * 2); c.clip(); c.drawImage(logo, gx, my - 46, lw, lw); c.restore(); }
  c.textAlign = "left"; c.fillStyle = pal[2]; c.fillText("Tanetto", gx + lw + 14, my); c.globalAlpha = 1;
  const url = cv.toDataURL("image/png");
  gr20Memo = { key, url };
  return { url, sp };
}

/* --- Anteprima e invio --- */
let gr20Cur = null, gr20SharedAt = 0;
async function gr20Open(kind, ck) {
  const t = gr20t(), L0 = L();
  if (kind === "card") { try { if (!ck || !cardInfo(ck)) return; } catch (e) { return; } }
  gr20Cur = null;
  layer.innerHTML = `<div class="overlay gr20ov" role="dialog" aria-modal="true" aria-labelledby="gr20T"><div class="box gr20box"><h2 id="gr20T">${esc(L0.share)}</h2>
    <div class="gr20prev" id="gr20Prev"><span class="gr20wait" aria-hidden="true"></span></div><p class="small muted gr20msg" id="gr20Msg" aria-live="polite">${esc(L0.shareMaking || "")}</p>
    <div class="gr20btns"><button class="btn" id="gr20Send" type="button" disabled>${icon("share")}<span>${esc(L0.share)}</span></button><button class="btn ghost" id="gr20Save" type="button" disabled>${icon("download")}<span>${esc(L0.saveImg)}</span></button></div>
    <button class="link" id="closeLayer" type="button">${esc(L0.close)}</button></div></div>`;
  const cl = layer.querySelector("#closeLayer"); if (cl) cl.focus();
  if (gr20anim()) G.from(".gr20box", { y: 24, opacity: 0, duration: 0.35, ease: "power3.out" });
  try { SND.play("pop"); } catch (e) { /* niente */ }
  const box = layer.querySelector(".gr20box");
  try {
    const r = await gr20Make(kind, ck);
    if (!box.isConnected) return; /* chiusa nel frattempo */
    gr20Cur = { kind, ck, url: r.url, name: r.sp.name, text: r.sp.text };
    const pv = box.querySelector("#gr20Prev"); pv.innerHTML = `<img class="gr20img" src="${r.url}" alt="${esc(r.sp.alt)}">`;
    if (gr20anim()) G.from(pv.firstChild, { scale: 0.94, opacity: 0, duration: 0.35, ease: "power2.out" });
    box.querySelector("#gr20Msg").textContent = t.hint;
    box.querySelectorAll("#gr20Send, #gr20Save").forEach((b) => { b.disabled = false; });
    trackOnce(kind === "card" ? "cartolina-anteprima" : "livello-anteprima");
  } catch (e) {
    if (box.isConnected) { const m = box.querySelector("#gr20Msg"); if (m) m.textContent = L0.weekErr || ""; const pv = box.querySelector("#gr20Prev"); if (pv) pv.classList.add("err"); }
  }
}
function gr20Download(url, name) {
  const a = document.createElement("a"); a.href = url; a.download = name; a.rel = "noopener"; document.body.appendChild(a); a.click();
  setTimeout(() => a.remove(), 1500); toast(L().savedImg);
}
/* condividere: app Android -> TanettoShare (PNG in cache + FileProvider + ACTION_SEND); web -> navigator.share con il file; altrimenti si scarica */
async function gr20Send(cur) {
  if (!cur) return "none";
  const label = cur.kind === "card" ? "cartolina-condivisa" : "livello-condiviso";
  const p = gr20native() && typeof sharePlugin === "function" ? sharePlugin() : null;
  if (p && p.share) {
    try { await p.share({ data: cur.url.split(",")[1] || "", name: cur.name, mime: "image/png", text: cur.text, title: "Tanetto" }); gr20SharedAt = Date.now(); trackOnce(label); return "native"; }
    catch (e) { toast(L().saveNo); return "error"; }
  }
  try {
    const blob = await (await fetch(cur.url)).blob(); const file = new File([blob], cur.name, { type: "image/png" });
    if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: "Tanetto", text: cur.text }); gr20SharedAt = Date.now(); trackOnce(label); return "web"; }
      catch (e) { if (e && e.name === "AbortError") return "cancel"; }
    }
  } catch (e) { /* si scarica */ }
  gr20Download(cur.url, cur.name); gr20SharedAt = Date.now(); trackOnce(label + "-scaricata"); return "download";
}
/* i pulsanti "Condividi" che c'erano già (livello e album) ora fanno la cartolina 9:16 */
sharePostcard = function (ck) { return gr20Open("card", ck); };
shareLevelCard = function () { return gr20Open("level"); };
/* scheda del ritorno: "Condividi" accanto a "Che bello", per la cartolina appena arrivata */
const _storyCardGr20 = storyCard;
storyCard = function () {
  let h = _storyCardGr20();
  try {
    if (!story || !story.card || typeof h !== "string" || h.includes('id="gr20Story"')) return h;
    const m = h.match(/<button class="btn" id="storyOk">[\s\S]*?<\/button>/); if (!m) return h;
    const sh = `<button class="btn ghost gr20sh" id="gr20Story" type="button" data-pc="${esc(story.card)}">${icon("share")}<span>${esc(L().share)}</span></button>`;
    h = h.replace(m[0], `<div class="row gr20row">${sh}${m[0]}</div>`);
  } catch (e) { /* niente */ }
  return h;
};

/* =================== 2) SITO: ?src=postcard =================== */
function gr20LandWanted() {
  try {
    if (gr20native()) return false;
    const src = (new URLSearchParams(location.search).get("src") || "").toLowerCase(); if (src !== "postcard") return false;
    const ua = navigator.userAgent || ""; if (!/Android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua)) return false;
    if (typeof playLive === "function" && !playLive()) return false; /* prima che l'app sia sullo Store: solo la versione web */
    return sessionStorage.getItem("gr20land") !== "1";
  } catch (e) { return false; }
}
function gr20Land() {
  if (!gr20LandWanted() || document.getElementById("gr20Land")) return;
  const t = gr20t(); const ic = `<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path d="M5 3.6v16.8c0 .5.5.8 1 .6l14-8.2c.4-.3.4-.9 0-1.2L6 3c-.5-.2-1 .1-1 .6Z" fill="currentColor"/></svg>`;
  /* in cima alla pagina, nel flusso (non sospesa): non copre mai i pulsanti del benvenuto, le schede in basso o le finestre */
  const el = document.createElement("div"); el.id = "gr20Land"; el.className = "gr20land"; el.setAttribute("role", "region"); el.setAttribute("aria-labelledby", "gr20LT");
  el.innerHTML = `<div class="gr20lhd"><span class="gr20lic">${ic}</span><b id="gr20LT">${esc(t.landT)}</b></div><p class="small">${esc(t.landP)}</p>
    <a class="btn gold block" id="gr20Play" href="${PLAY_URL}${GR20_PLAY_REF}" target="_blank" rel="noopener">${ic}<span>${esc(BT().getApp)}</span></a><button class="link small" id="gr20LandX" type="button">${esc(t.landWeb)}</button>`;
  const appEl = document.getElementById("app");
  if (appEl && appEl.parentNode) appEl.parentNode.insertBefore(el, appEl); else document.body.insertBefore(el, document.body.firstChild);
  if (gr20anim()) G.from(el, { y: -16, opacity: 0, duration: 0.4, ease: "power3.out" });
  track("cartolina-android-play-mostrato");
}
setTimeout(gr20Land, 1400);

/* =================== 3) RECENSIONE NEI MOMENTI FELICI =================== */
function rev20Last(st) {
  let last = (st.v20rev && +st.v20rev.last) || 0;
  if (st.revAsk) { const t = new Date(st.revAsk + "T12:00:00").getTime(); if (t > last) last = t; } /* la richiesta della versione di prima conta anche lei */
  return last;
}
/* si può chiedere? almeno 3 giorni dopo l'installazione e 30 giorni dopo l'ultima volta (calcolo puro, per i test) */
function rev20Allowed(st, now) {
  st = st || S; now = now == null ? Date.now() : now;
  if (!st || !st.pet || !st.firstDay) return false;
  const d0 = new Date(st.firstDay + "T00:00:00"); const d1 = new Date(now); d1.setHours(0, 0, 0, 0);
  const days = Math.round((d1.getTime() - d0.getTime()) / 86400000); if (!(days >= GR20_REV_MIN_DAYS)) return false;
  const last = rev20Last(st); if (last && now - last < GR20_REV_GAP) return false;
  return true;
}
let rev20Pending = null, rev20Timer = 0, rev20Tries = 0;
function rev20Calm() {
  if (gr20layerBusy() || story) return false;
  try { if (tutOn) return false; } catch (e) { /* niente */ }
  if (document.getElementById("trParty") || document.visibilityState === "hidden") return false;
  try { if (typeof NQ20 !== "undefined" && NQ20 && (NQ20.q.length || NQ20.t)) return false; } catch (e) { /* niente */ }
  return true;
}
function rev20Want(why) { if (!gr20native() || !rev20Allowed()) return; rev20Pending = why; rev20Tries = 0; rev20Kick(2500); }
function rev20Kick(ms) { if (!rev20Pending) return; clearTimeout(rev20Timer); rev20Timer = setTimeout(rev20Fire, ms == null ? 1000 : ms); }
function rev20Fire() {
  rev20Timer = 0; const why = rev20Pending; if (!why) return;
  if (!gr20native() || !rev20Allowed() || Date.now() - gr20SharedAt < 120000) { rev20Pending = null; return; } /* appena condiviso: niente seconda finestra */
  if (!rev20Calm()) { if (++rev20Tries < 20) rev20Kick(3000); else rev20Pending = null; return; }
  rev20Pending = null;
  const r = S.v20rev && typeof S.v20rev === "object" ? S.v20rev : {};
  S.v20rev = { last: Date.now(), n: (r.n || 0) + 1, why }; S.revAsk = dkey(); save(); trackOnce("recensione-chiesta");
  const p = typeof reviewPlugin === "function" ? reviewPlugin() : null;
  if (p && p.requestReview) { try { const x = p.requestReview(); if (x && x.catch) x.catch(() => {}); } catch (e) { /* Google decide da solo */ } }
}
/* la richiesta di prima (dopo "tutti gli obiettivi fatti", 97m_review) si spegne: i momenti sono solo quelli qui sotto */
try { if (typeof reviewEligible === "function") reviewEligible = function () { return false; }; } catch (e) { /* niente */ }
/* ritorno dal viaggio (con la cartolina): si chiede quando la scheda del ritorno è chiusa */
const _finishTripGr20 = finishTrip;
finishTrip = function (...a) { const r = _finishTripGr20.apply(this, a); try { if (story && story.card) rev20Want("viaggio"); } catch (e) { /* niente */ } return r; };
/* 7° giorno di fila */
const _completeGoalGr20 = completeGoal;
completeGoal = function (...a) {
  let s0 = -1; try { s0 = streak(); } catch (e) { /* niente */ }
  const r = _completeGoalGr20.apply(this, a);
  try { if (s0 !== 7 && streak() === 7) rev20Want("serie-7"); } catch (e) { /* niente */ }
  return r;
};
try { new MutationObserver(() => { if (!gr20layerBusy()) rev20Kick(1200); }).observe(layer, { childList: true }); } catch (e) { /* niente */ }

/* =================== 4) "NUOVO INIZIO" DI GENNAIO =================== */
/* dal 7 al 31 gennaio (ora del telefono); il Natale (98d) va dall'8 dicembre al 6 gennaio: mai insieme */
function fs20On(d) {
  d = d || new Date();
  try { if (typeof xmOn === "function" && xmOn(d)) return false; } catch (e) { /* niente */ }
  return d.getMonth() === 0 && d.getDate() >= 7 && d.getDate() <= 31;
}
function fs20Seen() { const f = S.v20fresh; return !!(f && typeof f === "object" && f.year === new Date().getFullYear() && f.seen); }
function fs20Due() {
  if (!fs20On() || !S.pet || fs20Seen()) return false;
  if ((S.tut || 0) < 99) return false;
  try { if (tutOn) return false; } catch (e) { /* niente */ }
  return !!S.firstDay && S.firstDay !== dkey(); /* chi ha appena scelto gli obiettivi nel benvenuto non ha bisogno di rivederli */
}
function fs20Art() {
  const sun = `<circle cx="120" cy="118" r="44" fill="#FFD98A"/><circle cx="120" cy="118" r="62" fill="#FFD98A" opacity=".28"/>`
    + [-60, -35, -12, 12, 35, 60].map((a) => { const r = (a - 90) * Math.PI / 180; const x1 = 120 + Math.cos(r) * 72, y1 = 118 + Math.sin(r) * 72, x2 = 120 + Math.cos(r) * 88, y2 = 118 + Math.sin(r) * 88; return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#F2B33D" stroke-width="4" stroke-linecap="round" opacity=".55"/>`; }).join("");
  return `<svg class="gr20fsart" viewBox="0 0 240 132" aria-hidden="true"><defs><linearGradient id="gr20fsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDE7D2"/><stop offset="1" stop-color="#FFF6E6"/></linearGradient></defs>`
    + `<rect width="240" height="132" rx="20" fill="url(#gr20fsk)"/>${sun}<g fill="#fff" opacity=".85"><ellipse cx="46" cy="40" rx="20" ry="6"/><circle cx="40" cy="36" r="7"/><circle cx="50" cy="34" r="8"/><ellipse cx="196" cy="56" rx="16" ry="5"/><circle cx="192" cy="52" r="6"/><circle cx="200" cy="51" r="6.5"/></g>`
    + `<path d="M0 118 Q60 104 120 112 T240 108 V132 H0 Z" fill="#CFE8C6"/><svg x="78" y="44" width="84" height="84" viewBox="0 0 200 200">${petInner(S.pet, "felice", S.hat, stage(), 0.95)}</svg></svg>`;
}
function fs20Open(manual) {
  if (!fs20On() || !S.pet) return;
  if (!manual && (!fs20Due() || story || gr20layerBusy())) return;
  if (gr20layerBusy() && manual) return;
  const t = gr20t(); const y = new Date().getFullYear();
  S.v20fresh = { year: y, seen: true }; save(); trackOnce("nuovo-inizio-visto");
  layer.innerHTML = `<div class="overlay sheetwrap" role="dialog" aria-modal="true" aria-labelledby="gr20FsT"><div class="sheet gr20fs"><div class="grab"></div>${fs20Art()}
    <h2 id="gr20FsT">${esc(t.fsT)}</h2><p>${esc(t.fsP(S.petName || ""))}</p>
    <button class="btn block" id="gr20FsGo" type="button">${esc(t.fsGo)}</button><button class="link" id="closeLayer" type="button">${esc(t.fsLater)}</button></div></div>`;
  const go = layer.querySelector("#gr20FsGo"); if (go) go.focus();
  if (gr20anim()) G.from(".gr20fs", { y: 80, opacity: 0, duration: 0.45, ease: "power3.out" });
}
function fs20Goals() {
  closeLayer(); trackOnce("nuovo-inizio-obiettivi");
  tab = "more"; editGoals = null; showPicker = true; confirmReset = false; render(); window.scrollTo(0, 0);
  /* le schede di Profilo si disegnano solo quando servono (content-visibility): si misurano davvero, poi si corregge */
  setTimeout(() => {
    const g = document.getElementById("goalsCard"); if (!g) return; const box = g.parentElement; if (box) box.classList.add("mjumping");
    const go = (smooth) => { const y = g.getBoundingClientRect().top + window.scrollY - 12; window.scrollTo({ top: Math.max(0, y), behavior: smooth ? "smooth" : "auto" }); };
    go(gr20anim());
    setTimeout(() => { if (!g.isConnected) return; if (Math.abs(g.getBoundingClientRect().top - 12) > 3) go(false); if (box) box.classList.remove("mjumping"); }, gr20anim() ? 750 : 60);
  }, 80);
}
function fs20Check() {
  if (!fs20Due()) return;
  if (typeof nq20 === "function") nq20("fresh", "ask", () => fs20Open(false));
  else if (!gr20layerBusy()) fs20Open(false);
}
/* il piccolo segno in alto: "Nuovo inizio" accanto alla data */
const fs20Sun = `<svg viewBox="0 0 20 20" aria-hidden="true" width="14" height="14"><path d="M3 14.5h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 14.5a4 4 0 0 1 8 0" fill="currentColor" opacity=".9"/><path d="M10 5.2v2M4.6 7.6l1.3 1.3M15.4 7.6l-1.3 1.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const _greetLineGr20 = greetLine;
greetLine = function () {
  const h = _greetLineGr20();
  try {
    if (!fs20On() || !S.pet || typeof h !== "string") return h;
    const tpl = document.createElement("template"); tpl.innerHTML = h; const gd = tpl.content.querySelector(".gd"); if (!gd) return h;
    const t = gr20t(); gd.insertAdjacentHTML("beforeend", `<button class="gr20pill" id="gr20Fs" type="button" aria-label="${esc(t.fsLbl)}">${fs20Sun}<span>${esc(t.fsPill)}</span></button>`);
    gd.classList.add("gr20gd"); return tpl.innerHTML;
  } catch (e) { return h; }
};
setTimeout(fs20Check, 2200);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") setTimeout(fs20Check, 1500); });

/* =================== TOCCHI =================== */
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button, a"); if (!b) return;
  const stop = () => { ev.stopImmediatePropagation(); ev.preventDefault(); };
  if (b.id === "gr20Story") { stop(); gr20Open("card", b.dataset.pc); return; }
  if (b.id === "gr20Send") { stop(); if (!b.disabled) gr20Send(gr20Cur); return; }
  if (b.id === "gr20Save") { stop(); if (!b.disabled && gr20Cur) { if (typeof saveImage === "function") saveImage(gr20Cur.url, gr20Cur.name); else gr20Download(gr20Cur.url, gr20Cur.name); } return; }
  if (b.id === "gr20Fs") { stop(); try { SND.play("click"); } catch (e) { /* niente */ } fs20Open(true); return; }
  if (b.id === "gr20FsGo") { stop(); fs20Goals(); return; }
  if (b.id === "gr20LandX") { stop(); try { sessionStorage.setItem("gr20land", "1"); } catch (e) { /* niente */ } const l = document.getElementById("gr20Land"); if (l) l.remove(); return; }
  if (b.id === "gr20Play") { try { sessionStorage.setItem("gr20land", "1"); } catch (e) { /* niente */ } trackOnce("cartolina-verso-play"); return; }
  /* scheda del ritorno chiusa: è il momento giusto per la recensione (se c'è) e per il "Nuovo inizio" rimasto in attesa */
  if (b.id === "storyOk") { setTimeout(() => { rev20Kick(900); fs20Check(); }, 50); }
}, true);
