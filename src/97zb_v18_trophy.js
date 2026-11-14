/* =================== v18 (1.0.4): trofei "Sentiero della costanza" =================== */
/* 9 trofei unici legati alla serie di giorni di fila (come su Duolingo), difficili da ottenere:
   7, 14, 30, 60, 100, 150, 200, 365, 500 giorni. Crescono come una pianta: dal semino alla quercia secolare.
   Versione "perfetta" (dorata e luccicante) se in tutti quei giorni sono stati fatti TUTTI gli obiettivi,
   senza giorni di riposo e senza scudi. Un trofeo normale puo' diventare perfetto piu' avanti.
   Quando arriva: festa a schermo intero, capriola del compagno, premio in Tani, record personale.
   I trofei stanno su una mensola nella Casetta del compagno; ognuno si puo' condividere come immagine. */
const TROPHY_DAYS = [7, 14, 30, 60, 100, 150, 200, 365, 500];
const TROPHY_TANI = [30, 60, 120, 200, 300, 400, 500, 800, 1200];
const V18T = {
  it: { names: ["Semino", "Germoglio", "Piantina", "Alberello", "Giovane albero", "Albero in fiore", "Albero dei frutti", "Grande albero", "Quercia secolare"], shelfT: "Sentiero della costanza", shelfP: "Un trofeo per ogni traguardo di giorni di fila. L'ultimo, il più difficile, arriva a 500 giorni.", now: (n) => n === 1 ? "Serie: 1 giorno" : `Serie: ${n} giorni`, best: (n) => n === 1 ? "Record: 1 giorno" : `Record: ${n} giorni`, next: (name, n) => n === 1 ? `Prossimo trofeo: ${name}, manca 1 giorno` : `Prossimo trofeo: ${name}, mancano ${n} giorni`, all: "Hai conquistato tutti i trofei. Sei una leggenda!", days: (n) => `${n} giorni`, perfect: "Perfetto", perfectP: "Tutti gli obiettivi ogni giorno, senza riposi e senza scudi.", newT: "Nuovo trofeo!", perfT: "Trofeo perfetto!", inRow: (n) => `${n} giorni di fila`, record: (n) => `Nuovo record personale: ${n} giorni di fila!`, ok: "Evviva!", share: "Condividi", got: (d) => `Conquistato il ${d}`, locked: (n) => n === 1 ? "Manca 1 giorno" : `Mancano ${n} giorni`, lockedT: "Ancora da conquistare", shareSub: (n) => `${n} giorni di fila su Tanetto`, open: "Trofei" },
  en: { names: ["Little seed", "Sprout", "Seedling", "Sapling", "Young tree", "Blossoming tree", "Fruit tree", "Great tree", "Ancient oak"], shelfT: "Path of persistence", shelfP: "A trophy for every milestone of days in a row. The last and hardest one comes at 500 days.", now: (n) => n === 1 ? "Streak: 1 day" : `Streak: ${n} days`, best: (n) => n === 1 ? "Record: 1 day" : `Record: ${n} days`, next: (name, n) => n === 1 ? `Next trophy: ${name}, 1 day to go` : `Next trophy: ${name}, ${n} days to go`, all: "You've won every trophy. You're a legend!", days: (n) => `${n} days`, perfect: "Perfect", perfectP: "Every goal, every day, with no rest days and no shields.", newT: "New trophy!", perfT: "Perfect trophy!", inRow: (n) => `${n} days in a row`, record: (n) => `New personal record: ${n} days in a row!`, ok: "Hooray!", share: "Share", got: (d) => `Won on ${d}`, locked: (n) => n === 1 ? "1 day to go" : `${n} days to go`, lockedT: "Not won yet", shareSub: (n) => `${n} days in a row on Tanetto`, open: "Trophies" },
  de: { names: ["Samenkorn", "Keimling", "Pflänzchen", "Bäumchen", "Junger Baum", "Blühender Baum", "Obstbaum", "Großer Baum", "Uralte Eiche"], shelfT: "Pfad der Beständigkeit", shelfP: "Ein Pokal für jeden Meilenstein an Tagen in Folge. Der letzte und schwierigste kommt nach 500 Tagen.", now: (n) => n === 1 ? "Serie: 1 Tag" : `Serie: ${n} Tage`, best: (n) => n === 1 ? "Rekord: 1 Tag" : `Rekord: ${n} Tage`, next: (name, n) => n === 1 ? `Nächster Pokal: ${name}, noch 1 Tag` : `Nächster Pokal: ${name}, noch ${n} Tage`, all: "Du hast alle Pokale gewonnen. Du bist eine Legende!", days: (n) => `${n} Tage`, perfect: "Perfekt", perfectP: "Jeden Tag alle Ziele, ohne Ruhetage und ohne Schilde.", newT: "Neuer Pokal!", perfT: "Perfekter Pokal!", inRow: (n) => `${n} Tage in Folge`, record: (n) => `Neuer persönlicher Rekord: ${n} Tage in Folge!`, ok: "Juhu!", share: "Teilen", got: (d) => `Gewonnen am ${d}`, locked: (n) => n === 1 ? "Noch 1 Tag" : `Noch ${n} Tage`, lockedT: "Noch nicht gewonnen", shareSub: (n) => `${n} Tage in Folge mit Tanetto`, open: "Pokale" },
  es: { names: ["Semillita", "Brote", "Plantita", "Arbolito", "Árbol joven", "Árbol en flor", "Árbol frutal", "Gran árbol", "Roble centenario"], shelfT: "Sendero de la constancia", shelfP: "Un trofeo por cada meta de días seguidos. El último, el más difícil, llega a los 500 días.", now: (n) => n === 1 ? "Racha: 1 día" : `Racha: ${n} días`, best: (n) => n === 1 ? "Récord: 1 día" : `Récord: ${n} días`, next: (name, n) => n === 1 ? `Próximo trofeo: ${name}, falta 1 día` : `Próximo trofeo: ${name}, faltan ${n} días`, all: "Has conseguido todos los trofeos. ¡Eres una leyenda!", days: (n) => `${n} días`, perfect: "Perfecto", perfectP: "Todas las metas cada día, sin descansos y sin escudos.", newT: "¡Nuevo trofeo!", perfT: "¡Trofeo perfecto!", inRow: (n) => `${n} días seguidos`, record: (n) => `¡Nuevo récord personal: ${n} días seguidos!`, ok: "¡Bien!", share: "Compartir", got: (d) => `Conseguido el ${d}`, locked: (n) => n === 1 ? "Falta 1 día" : `Faltan ${n} días`, lockedT: "Aún por conseguir", shareSub: (n) => `${n} días seguidos en Tanetto`, open: "Trofeos" },
  fr: { names: ["Petite graine", "Pousse", "Jeune plant", "Arbrisseau", "Jeune arbre", "Arbre en fleurs", "Arbre fruitier", "Grand arbre", "Chêne centenaire"], shelfT: "Sentier de la constance", shelfP: "Un trophée pour chaque palier de jours d'affilée. Le dernier, le plus difficile, arrive à 500 jours.", now: (n) => n === 1 ? "Série : 1 jour" : `Série : ${n} jours`, best: (n) => n === 1 ? "Record : 1 jour" : `Record : ${n} jours`, next: (name, n) => n === 1 ? `Prochain trophée : ${name}, plus qu'1 jour` : `Prochain trophée : ${name}, encore ${n} jours`, all: "Tu as gagné tous les trophées. Tu es une légende !", days: (n) => `${n} jours`, perfect: "Parfait", perfectP: "Tous les objectifs chaque jour, sans repos et sans boucliers.", newT: "Nouveau trophée !", perfT: "Trophée parfait !", inRow: (n) => `${n} jours d'affilée`, record: (n) => `Nouveau record personnel : ${n} jours d'affilée !`, ok: "Youpi !", share: "Partager", got: (d) => `Gagné le ${d}`, locked: (n) => n === 1 ? "Plus qu'1 jour" : `Encore ${n} jours`, lockedT: "Pas encore gagné", shareSub: (n) => `${n} jours d'affilée sur Tanetto`, open: "Trophées" },
  pt: { names: ["Sementinha", "Broto", "Mudinha", "Arvorezinha", "Árvore jovem", "Árvore em flor", "Árvore frutífera", "Grande árvore", "Carvalho centenário"], shelfT: "Trilha da constância", shelfP: "Um troféu para cada marco de dias seguidos. O último, o mais difícil, chega aos 500 dias.", now: (n) => n === 1 ? "Sequência: 1 dia" : `Sequência: ${n} dias`, best: (n) => n === 1 ? "Recorde: 1 dia" : `Recorde: ${n} dias`, next: (name, n) => n === 1 ? `Próximo troféu: ${name}, falta 1 dia` : `Próximo troféu: ${name}, faltam ${n} dias`, all: "Você conquistou todos os troféus. Você é uma lenda!", days: (n) => `${n} dias`, perfect: "Perfeito", perfectP: "Todas as metas todos os dias, sem descansos e sem escudos.", newT: "Novo troféu!", perfT: "Troféu perfeito!", inRow: (n) => `${n} dias seguidos`, record: (n) => `Novo recorde pessoal: ${n} dias seguidos!`, ok: "Oba!", share: "Compartilhar", got: (d) => `Conquistado em ${d}`, locked: (n) => n === 1 ? "Falta 1 dia" : `Faltam ${n} dias`, lockedT: "Ainda não conquistado", shareSub: (n) => `${n} dias seguidos no Tanetto`, open: "Troféus" },
  ja: { names: ["小さな種", "芽", "若葉", "小さな木", "若い木", "花咲く木", "実のなる木", "大きな木", "千年の樫"], shelfT: "継続の小道", shelfP: "連続日数の節目ごとにトロフィーがもらえます。最後のいちばん難しいトロフィーは500日です。", now: (n) => `連続：${n}日`, best: (n) => `最高記録：${n}日`, next: (name, n) => `次のトロフィー：${name}（あと${n}日）`, all: "すべてのトロフィーを手に入れました。あなたは伝説です！", days: (n) => `${n}日`, perfect: "パーフェクト", perfectP: "毎日すべての目標を達成。おやすみの日もシールドもなし。", newT: "新しいトロフィー！", perfT: "パーフェクトトロフィー！", inRow: (n) => `${n}日連続`, record: (n) => `自己ベスト更新：${n}日連続！`, ok: "やったね！", share: "シェア", got: (d) => `${d}に獲得`, locked: (n) => `あと${n}日`, lockedT: "まだ獲得していません", shareSub: (n) => `Tanettoで${n}日連続`, open: "トロフィー" },
  ko: { names: ["작은 씨앗", "새싹", "어린 묘목", "작은 나무", "어린 나무", "꽃 핀 나무", "열매 나무", "큰 나무", "천년 참나무"], shelfT: "꾸준함의 오솔길", shelfP: "연속 일수의 이정표마다 트로피를 받아요. 마지막이자 가장 어려운 트로피는 500일이에요.", now: (n) => `연속: ${n}일`, best: (n) => `최고 기록: ${n}일`, next: (name, n) => `다음 트로피: ${name}, ${n}일 남았어요`, all: "모든 트로피를 모았어요. 정말 전설이에요!", days: (n) => `${n}일`, perfect: "퍼펙트", perfectP: "매일 모든 목표 달성, 쉬는 날도 방패도 없이.", newT: "새 트로피!", perfT: "퍼펙트 트로피!", inRow: (n) => `${n}일 연속`, record: (n) => `개인 최고 기록: ${n}일 연속!`, ok: "야호!", share: "공유", got: (d) => `${d} 획득`, locked: (n) => `${n}일 남았어요`, lockedT: "아직 얻지 못했어요", shareSub: (n) => `Tanetto에서 ${n}일 연속`, open: "트로피" },
  zh: { names: ["小种子", "嫩芽", "小苗", "小树", "幼树", "开花的树", "结果的树", "大树", "百年橡树"], shelfT: "坚持之路", shelfP: "每达成一个连续天数的里程碑就能获得一个奖杯。最后一个也是最难的一个，需要 500 天。", now: (n) => `连续：${n} 天`, best: (n) => `最高纪录：${n} 天`, next: (name, n) => `下一个奖杯：${name}，还差 ${n} 天`, all: "你已经获得了全部奖杯，你是传奇！", days: (n) => `${n} 天`, perfect: "完美", perfectP: "每天完成全部目标，没有休息日，也没有用护盾。", newT: "新奖杯！", perfT: "完美奖杯！", inRow: (n) => `连续 ${n} 天`, record: (n) => `个人新纪录：连续 ${n} 天！`, ok: "太棒了！", share: "分享", got: (d) => `获得于 ${d}`, locked: (n) => `还差 ${n} 天`, lockedT: "尚未获得", shareSub: (n) => `在 Tanetto 连续 ${n} 天`, open: "奖杯" },
  zht: { names: ["小種子", "嫩芽", "小苗", "小樹", "幼樹", "開花的樹", "結果的樹", "大樹", "百年橡樹"], shelfT: "堅持之路", shelfP: "每達成一個連續天數的里程碑就能獲得一座獎盃。最後一座也是最難的一座，需要 500 天。", now: (n) => `連續：${n} 天`, best: (n) => `最高紀錄：${n} 天`, next: (name, n) => `下一座獎盃：${name}，還差 ${n} 天`, all: "你已經獲得了全部獎盃，你是傳奇！", days: (n) => `${n} 天`, perfect: "完美", perfectP: "每天完成全部目標，沒有休息日，也沒有用護盾。", newT: "新獎盃！", perfT: "完美獎盃！", inRow: (n) => `連續 ${n} 天`, record: (n) => `個人新紀錄：連續 ${n} 天！`, ok: "太棒了！", share: "分享", got: (d) => `獲得於 ${d}`, locked: (n) => `還差 ${n} 天`, lockedT: "尚未獲得", shareSub: (n) => `在 Tanetto 連續 ${n} 天`, open: "獎盃" },
  ru: { names: ["Семечко", "Росток", "Саженец", "Деревце", "Молодое дерево", "Цветущее дерево", "Плодовое дерево", "Большое дерево", "Вековой дуб"], shelfT: "Тропа постоянства", shelfP: "Трофей за каждый рубеж дней подряд. Последний и самый трудный — за 500 дней.", now: (n) => `Серия: ${n} ${ruDays(n)}`, best: (n) => `Рекорд: ${n} ${ruDays(n)}`, next: (name, n) => `Следующий трофей: ${name}, осталось ${n} ${ruDays(n)}`, all: "Все трофеи собраны. Ты легенда!", days: (n) => `${n} ${ruDays(n)}`, perfect: "Идеально", perfectP: "Все цели каждый день, без дней отдыха и без щитов.", newT: "Новый трофей!", perfT: "Идеальный трофей!", inRow: (n) => `${n} ${ruDays(n)} подряд`, record: (n) => `Новый личный рекорд: ${n} ${ruDays(n)} подряд!`, ok: "Ура!", share: "Поделиться", got: (d) => `Получен ${d}`, locked: (n) => `Осталось ${n} ${ruDays(n)}`, lockedT: "Ещё не получен", shareSub: (n) => `${n} ${ruDays(n)} подряд в Tanetto`, open: "Трофеи" },
  pl: { names: ["Ziarenko", "Kiełek", "Sadzonka", "Drzewko", "Młode drzewo", "Kwitnące drzewo", "Drzewo owocowe", "Wielkie drzewo", "Wiekowy dąb"], shelfT: "Ścieżka wytrwałości", shelfP: "Trofeum za każdy próg dni z rzędu. Ostatnie, najtrudniejsze, czeka po 500 dniach.", now: (n) => `Seria: ${n} ${plDays(n)}`, best: (n) => `Rekord: ${n} ${plDays(n)}`, next: (name, n) => `Następne trofeum: ${name}, zostało ${n} ${plDays(n)}`, all: "Masz wszystkie trofea. Jesteś legendą!", days: (n) => `${n} ${plDays(n)}`, perfect: "Idealnie", perfectP: "Wszystkie cele każdego dnia, bez dni odpoczynku i bez tarcz.", newT: "Nowe trofeum!", perfT: "Idealne trofeum!", inRow: (n) => `${n} ${plDays(n)} z rzędu`, record: (n) => `Nowy rekord osobisty: ${n} ${plDays(n)} z rzędu!`, ok: "Hurra!", share: "Udostępnij", got: (d) => `Zdobyte ${d}`, locked: (n) => `Zostało ${n} ${plDays(n)}`, lockedT: "Jeszcze nie zdobyte", shareSub: (n) => `${n} ${plDays(n)} z rzędu w Tanetto`, open: "Trofea" },
  nl: { names: ["Zaadje", "Kiempje", "Plantje", "Boompje", "Jonge boom", "Bloeiende boom", "Fruitboom", "Grote boom", "Eeuwenoude eik"], shelfT: "Pad van volharding", shelfP: "Een trofee voor elke mijlpaal van dagen op rij. De laatste en moeilijkste krijg je na 500 dagen.", now: (n) => n === 1 ? "Reeks: 1 dag" : `Reeks: ${n} dagen`, best: (n) => n === 1 ? "Record: 1 dag" : `Record: ${n} dagen`, next: (name, n) => n === 1 ? `Volgende trofee: ${name}, nog 1 dag` : `Volgende trofee: ${name}, nog ${n} dagen`, all: "Je hebt alle trofeeën gewonnen. Je bent een legende!", days: (n) => `${n} dagen`, perfect: "Perfect", perfectP: "Elke dag alle doelen, zonder rustdagen en zonder schilden.", newT: "Nieuwe trofee!", perfT: "Perfecte trofee!", inRow: (n) => `${n} dagen op rij`, record: (n) => `Nieuw persoonlijk record: ${n} dagen op rij!`, ok: "Hoera!", share: "Delen", got: (d) => `Gewonnen op ${d}`, locked: (n) => n === 1 ? "Nog 1 dag" : `Nog ${n} dagen`, lockedT: "Nog niet gewonnen", shareSub: (n) => `${n} dagen op rij met Tanetto`, open: "Trofeeën" },
  tr: { names: ["Minik tohum", "Filiz", "Fide", "Fidan", "Genç ağaç", "Çiçekli ağaç", "Meyve ağacı", "Büyük ağaç", "Asırlık meşe"], shelfT: "İstikrar patikası", shelfP: "Art arda gün sayısındaki her dönüm noktası için bir kupa. Sonuncusu ve en zoru 500. günde geliyor.", now: (n) => `Seri: ${n} gün`, best: (n) => `Rekor: ${n} gün`, next: (name, n) => `Sıradaki kupa: ${name}, ${n} gün kaldı`, all: "Tüm kupaları kazandın. Sen bir efsanesin!", days: (n) => `${n} gün`, perfect: "Mükemmel", perfectP: "Her gün tüm hedefler; dinlenme günü ve kalkan yok.", newT: "Yeni kupa!", perfT: "Mükemmel kupa!", inRow: (n) => `Art arda ${n} gün`, record: (n) => `Yeni kişisel rekor: art arda ${n} gün!`, ok: "Yaşasın!", share: "Paylaş", got: (d) => `${d} tarihinde kazanıldı`, locked: (n) => `${n} gün kaldı`, lockedT: "Henüz kazanılmadı", shareSub: (n) => `Tanetto'da art arda ${n} gün`, open: "Kupalar" }
};
function ruDays(n) { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? "день" : a >= 2 && a <= 4 && (b < 12 || b > 14) ? "дня" : "дней"; }
function plDays(n) { return n === 1 ? "dzień" : "dni"; }
const v18t = () => V18T[S.lang] || V18T.en;

/* --- Disegni: 9 piante che crescono su un piedistallo (dorato e luccicante se "perfetto") --- */
function trPlant(i) {
  const L1 = "#8ED08A", L2 = "#76BF72", L3 = "#5FA35C", TR = "#8E6440", TR2 = "#6E4A2C";
  const crown = (pts, c1, c2) => pts.map(([x, y, r], k) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${k % 2 ? c2 : c1}"/>`).join("");
  switch (i) {
    case 0: return `<ellipse cx="60" cy="96" rx="11" ry="7.5" fill="#B07A45" transform="rotate(-18 60 96)"/><ellipse cx="57" cy="93.5" rx="4" ry="2.2" fill="#D9A56C" transform="rotate(-18 57 93.5)"/><path d="M62 90.5 q2 2 1 4" stroke="#7A5232" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M66 100 q4 3 2 7" stroke="#C9A27A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    case 1: return `<path d="M60 102 C60 92 61 86 62 80" stroke="#5A985A" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M62 82 C53 70 41 72 38 79 C46 87 56 87 62 82 Z" fill="${L2}"/><path d="M62 81 C70 69 83 71 86 78 C78 86 68 86 62 81 Z" fill="${L1}"/>`;
    case 2: return `<path d="M60 102 C59 86 61 70 60 56" stroke="#5A985A" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M60 86 C50 78 40 82 38 88 C46 93 55 92 60 86 Z" fill="${L2}"/><path d="M60 76 C70 67 81 70 83 76 C76 82 66 82 60 76 Z" fill="${L1}"/><path d="M60 66 C51 58 42 61 41 67 C48 71 56 71 60 66 Z" fill="${L1}"/><path d="M60 58 C62 48 70 44 75 47 C73 54 66 58 60 58 Z" fill="${L2}"/>`;
    case 3: return `<path d="M58 103 L59 66 L61 66 L62 103 Z" fill="${TR}"/><path d="M60 80 L50 72" stroke="${TR}" stroke-width="2.6" stroke-linecap="round"/>${crown([[60, 52, 21], [49, 58, 12], [71, 58, 12]], L2, L1)}<circle cx="53" cy="45" r="6" fill="#fff" opacity=".18"/>`;
    case 4: return `<path d="M56 104 C57 90 57 76 58 62 L62 62 C63 76 63 90 64 104 Z" fill="${TR}"/><path d="M59 80 C54 74 49 72 45 70 M61 74 C66 69 71 66 75 65" stroke="${TR}" stroke-width="3" fill="none" stroke-linecap="round"/>${crown([[60, 40, 22], [42, 54, 17], [78, 54, 17], [60, 58, 16]], L2, L1)}<circle cx="52" cy="32" r="7" fill="#fff" opacity=".16"/>`;
    case 5: { let s = `<path d="M56 104 C57 90 57 76 58 62 L62 62 C63 76 63 90 64 104 Z" fill="${TR}"/>${crown([[60, 40, 23], [41, 54, 18], [79, 54, 18], [60, 60, 16]], "#86C77F", "#9BD394")}`; [[48, 34], [70, 32], [60, 46], [40, 52], [80, 50], [52, 60], [72, 60], [62, 24], [33, 60], [87, 60]].forEach(([x, y], k) => { s += `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-2.6" rx="1.9" ry="2.6" fill="${k % 3 ? "#FFC2D4" : "#FFE1EA"}" transform="rotate(${a})"/>`).join("")}<circle r="1.4" fill="#F2B33D"/></g>`; }); return s; }
    case 6: { let s = `<path d="M55 104 C56 90 56 76 57 60 L63 60 C64 76 64 90 65 104 Z" fill="${TR}"/>${crown([[60, 38, 24], [40, 52, 19], [80, 52, 19], [60, 58, 17]], L2, L3)}`; [[47, 40, "#E2654F"], [72, 34, "#F2A65A"], [58, 52, "#E2654F"], [38, 58, "#F2A65A"], [82, 58, "#E2654F"], [66, 46, "#F2B33D"], [52, 26, "#F2A65A"]].forEach(([x, y, c]) => { s += `<circle cx="${x}" cy="${y}" r="4.2" fill="${c}"/><circle cx="${x - 1.3}" cy="${y - 1.4}" r="1.2" fill="#fff" opacity=".55"/><path d="M${x} ${y - 4} l1.5 -2.5" stroke="#5A985A" stroke-width="1.2" stroke-linecap="round"/>`; }); return s; }
    case 7: return `<path d="M52 104 C54 92 55 80 56 62 L64 62 C65 80 66 92 68 104 Z" fill="${TR}"/><path d="M52 104 C47 103 44 104 42 106 M68 104 C73 103 76 104 78 106" stroke="${TR}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M58 78 C52 72 45 70 40 70 M62 72 C69 66 76 64 82 64" stroke="${TR}" stroke-width="3.6" fill="none" stroke-linecap="round"/>${crown([[60, 30, 24], [37, 42, 20], [83, 42, 20], [46, 58, 18], [74, 58, 18], [60, 48, 20]], L3, L2)}<circle cx="50" cy="22" r="8" fill="#fff" opacity=".14"/><g transform="translate(84 30)"><ellipse cx="0" cy="0" rx="5" ry="4" fill="#F2B33D"/><circle cx="3.6" cy="-2.6" r="2.6" fill="#F2B33D"/><circle cx="4.4" cy="-3" r=".7" fill="#33302E"/><path d="M6.4 -2.4 l2 .6 l-2 .6 Z" fill="#E9845A"/></g>`;
    default: { let s = `<path d="M48 105 C52 94 53 84 54 70 C52 64 46 60 40 58 L44 54 C49 57 54 60 57 62 L58 50 L62 50 L63 62 C66 59 72 55 77 53 L80 57 C74 60 68 64 66 70 C67 84 68 94 72 105 Z" fill="${TR2}"/><path d="M55 98 C56 90 57 82 57 74 M63 96 C63 88 64 80 64 74" stroke="#5B3A1A" stroke-width="1.4" fill="none" opacity=".5"/><path d="M48 105 C42 104 38 105 35 108 M72 105 C78 104 82 105 85 108 M58 105 C58 107 57 109 55 110" stroke="${TR2}" stroke-width="3.2" fill="none" stroke-linecap="round"/>${crown([[60, 24, 22], [36, 32, 19], [84, 32, 19], [24, 46, 15], [96, 46, 15], [44, 48, 19], [76, 48, 19], [60, 40, 20]], "#4E9A4A", "#5FA35C")}`; [[40, 34], [78, 26], [58, 44], [90, 44], [30, 46], [66, 30]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y + 2}" rx="2.6" ry="3.4" fill="#B07A45"/><path d="M${x - 3} ${y} q3 -3 6 0 Z" fill="#7A5232"/>`; }); return s + `<circle cx="48" cy="16" r="9" fill="#fff" opacity=".12"/>`; }
  }
}

function trophySVG(i, perfect, locked) {
  const id = nid("tr"); const n = TROPHY_DAYS[i]; /* id stabili tra un disegno e l'altro: la pagina pronta si puo' riusare */
  const base = perfect ? [`url(#${id}g)`, "#C98424", "#FFF3C4"] : ["#C9925A", "#A8733F", "#E6BE8C"];
  let s = `<svg viewBox="0 0 120 140" class="trsvg${perfect ? " perf" : ""}${locked ? " lock" : ""}" aria-hidden="true"><defs>`;
  if (perfect) s += `<linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7A0"/><stop offset=".55" stop-color="#F2C063"/><stop offset="1" stop-color="#D9952F"/></linearGradient><radialGradient id="${id}h" cx="50%" cy="45%" r="50%"><stop offset="0" stop-color="#FFF3C4" stop-opacity=".95"/><stop offset="1" stop-color="#FFF3C4" stop-opacity="0"/></radialGradient>`;
  s += `</defs>`;
  if (perfect) s += `<circle cx="60" cy="62" r="56" fill="url(#${id}h)"/>`;
  s += `<ellipse cx="60" cy="133" rx="38" ry="5" fill="#000" opacity=".12"/>`;
  s += `<path d="M26 108 h68 l-4 22 q-1 4 -5 4 h-50 q-4 0 -5 -4 Z" fill="${base[0]}"/><path d="M26 108 h68 l-1 6 h-66 Z" fill="${base[1]}" opacity=".35"/><ellipse cx="60" cy="108" rx="34" ry="7" fill="${base[2]}"/><ellipse cx="60" cy="106.5" rx="27" ry="4.6" fill="#7A5232"/><ellipse cx="56" cy="105.6" rx="12" ry="1.6" fill="#9A6A42" opacity=".7"/>`;
  s += `<rect x="45" y="114" width="30" height="13" rx="4" fill="${perfect ? "#FFF6D6" : "#F7E2C0"}"/><text x="60" y="124.2" text-anchor="middle" font-family="Fredoka, Trebuchet MS, Arial, sans-serif" font-weight="600" font-size="10.5" fill="${perfect ? "#B4741F" : "#7A5232"}">${n}</text>`;
  s += `<g class="trplant">${trPlant(i)}</g>`;
  if (perfect) s += [[18, 30, 5], [102, 22, 4], [98, 78, 3.6], [16, 82, 3.2], [60, 6, 3.4]].map(([x, y, r], k) => `<path class="trsp sp${k}" transform="translate(${x} ${y}) scale(${r * 1.6})" d="M0 -1C.12 -.12 .12 -.12 1 0C.12 .12 .12 .12 0 1C-.12 .12 -.12 .12 -1 0C-.12 -.12 -.12 -.12 0 -1Z" fill="#FFD25E"/>`).join("");
  return s + `</svg>`;
}

/* --- Stato e conteggi --- */
function trDayOk(k) { const sh = S.shielded || []; return (S.days[k] && (S.days[k].done > 0 || S.days[k].rest || S.days[k].free)) || sh.includes(k); }
/* giorno "perfetto": tutti gli obiettivi (o nessun obiettivo previsto), niente riposo, niente scudo */
function trDayPerfect(k) { const r = S.days[k]; if (!r || r.rest || (S.shielded || []).includes(k)) return false; return !!r.free || (r.total > 0 && r.done >= r.total); }
function trEndDay() { const d = new Date(); if (!trDayOk(dkey(d))) d.setDate(d.getDate() - 1); return d; }
function trWindowPerfect(n) { const d = trEndDay(); for (let i = 0; i < n; i++) { if (!trDayPerfect(dkey(d))) return false; d.setDate(d.getDate() - 1); } return true; }
const trophies = () => (S.trophies = S.trophies || {});
function trNext(st) { for (let i = 0; i < TROPHY_DAYS.length; i++) { const tr = trophies()[TROPHY_DAYS[i]]; if (!tr) return { i, left: TROPHY_DAYS[i] - st }; } return null; }

/* Controllo: trofei nuovi (o diventati perfetti) con la serie di oggi. Ritorna la festa da mostrare (la piu' importante). */
function trophyCheck() {
  if (!S.pet) return null;
  const st = streak(); const prevBest = S.streakBest || 0; let show = null; let gain = 0;
  TROPHY_DAYS.forEach((n, i) => {
    if (st < n) return; const have = trophies()[n]; const perf = trWindowPerfect(n);
    if (!have) { trophies()[n] = { at: dkey(), p: perf }; gain += TROPHY_TANI[i] + (perf ? Math.round(TROPHY_TANI[i] / 2) : 0); show = { i, perfect: perf, up: false }; }
    else if (perf && !have.p) { have.p = true; have.pAt = dkey(); gain += Math.round(TROPHY_TANI[i] / 2); show = { i, perfect: true, up: true }; }
  });
  if (st > prevBest) S.streakBest = st;
  if (!show) { if (st > prevBest) save(); return null; }
  S.seeds += gain; show.gain = gain; show.days = TROPHY_DAYS[show.i]; show.record = st > prevBest && prevBest >= TROPHY_DAYS[0] ? st : 0;
  save(); trackOnce("trofeo-" + show.days + (show.perfect ? "-perfetto" : "")); return show;
}

/* --- Festa a schermo intero --- */
let trQueue = null, trWait = 0;
function trophySoon(delay) {
  clearTimeout(trWait);
  trWait = setTimeout(function tryShow() {
    if (!trQueue) trQueue = trophyCheck(); if (!trQueue) return;
    /* aspetta che non ci siano finestre aperte (es. "livello nuovo") o giochi */
    if (layer.innerHTML || game || document.getElementById("trParty") || document.getElementById("exitAsk") || document.querySelector(".tutwrap") || tab !== "today") { trWait = setTimeout(tryShow, 700); return; }
    const q = trQueue; trQueue = null; trophyParty(q);
  }, delay);
}
function trophyParty(q) {
  const t = v18t(); const name = t.names[q.i];
  const el = document.createElement("div"); el.id = "trParty"; el.className = "trparty" + (q.perfect ? " perf" : ""); el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "trpT");
  el.innerHTML = `<div class="trrays" aria-hidden="true"></div><div class="trfx" id="trFx"></div><div class="trpin"><p class="trkick">${esc(q.up ? t.perfT : t.newT)}</p><div class="trbig">${trophySVG(q.i, q.perfect, false)}</div><h2 id="trpT">${esc(name)}</h2><p class="trdays">${esc(t.inRow(q.days))}</p>${q.perfect ? `<p class="trperf"><span>★</span> ${esc(t.perfect)}: ${esc(t.perfectP)}</p>` : ""}${q.gain ? `<p class="trgain">${SEED}<b>+${q.gain}</b></p>` : ""}${q.record ? `<p class="trrec">${esc(t.record(q.record))}</p>` : ""}<div class="trpet" id="trPet">${petSVG(S.pet, "felice", S.hat, stage(), S.petName)}</div><div class="trbtns"><button class="btn ghost" id="trShare" data-tr="${q.i}">${esc(t.share)}</button><button class="btn" id="trOk">${esc(t.ok)}</button></div></div>`;
  document.body.appendChild(el); document.body.classList.add("trlock");
  SND.play("fanfare"); SND.haptic([20, 60, 20, 60, 40]);
  if (!anim) return;
  const tl = G.timeline();
  tl.from(el, { opacity: 0, duration: 0.25 })
    .from(el.querySelector(".trbig"), { scale: 0.2, rotation: -12, opacity: 0, duration: 0.7, ease: "back.out(1.8)" }, 0.1)
    .from(el.querySelectorAll(".trkick, h2, .trdays, .trperf, .trgain, .trrec, .trbtns"), { y: 16, opacity: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" }, 0.45);
  /* la capriola del compagno */
  const pet = document.getElementById("trPet");
  if (pet) tl.fromTo(pet, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.5).to(pet, { y: -46, duration: 0.32, ease: "power2.out" }, 1.05).to(pet, { rotation: 360, duration: 0.55, ease: "power1.inOut", transformOrigin: "50% 55%" }, 1.1).to(pet, { y: 0, duration: 0.35, ease: "bounce.out" }, 1.4).set(pet, { rotation: 0 });
  setTimeout(() => { const fx = document.getElementById("trFx"); if (fx) { burst("confetti", isLite() ? 18 : 34, fx); burst("star", isLite() ? 6 : 12, fx); } SND.play("sparkle"); }, 650);
}
function trophyPartyClose() {
  const el = document.getElementById("trParty"); if (!el) return; document.body.classList.remove("trlock");
  if (anim) { el.style.pointerEvents = "none"; G.to(el, { opacity: 0, duration: 0.25, onComplete: () => el.remove() }); } else el.remove();
  if (tab === "today") { const y = window.scrollY; render(); window.scrollTo(0, y); }
}
function trShare(i) {
  const t = v18t(); const tr = trophies()[TROPHY_DAYS[i]]; if (!tr) return;
  shareFlow(() => makeCard({ art: trophySVG(i, !!tr.p, false), w: 600, h: 700, title: `${t.names[i]}${tr.p ? " ★" : ""}`, sub: t.shareSub(TROPHY_DAYS[i]) }), `tanetto-trofeo-${TROPHY_DAYS[i]}.png`);
  trackOnce("trofeo-condiviso");
}

/* --- La mensola dei trofei nella Casetta --- */
function trShelfHtml() {
  if (!S.pet) return "";
  const t = v18t(); const st = streak(); const best = Math.max(S.streakBest || 0, st); const nx = trNext(st);
  const slot = (n, i) => { const tr = trophies()[n]; return `<button class="trslot${tr ? " won" : ""}${tr && tr.p ? " perf" : ""}" data-trophy="${i}" aria-label="${esc(tr ? t.names[i] : t.lockedT)}, ${esc(t.days(n))}">${trophySVG(i, !!(tr && tr.p), !tr)}<span class="trlbl">${esc(tr ? t.names[i] : t.days(n))}</span></button>`; };
  const rows = [0, 3, 6].map((k) => `<div class="trrow">${TROPHY_DAYS.slice(k, k + 3).map((n, j) => slot(n, k + j)).join("")}</div><div class="trplank" aria-hidden="true"></div>`).join("");
  return `<div class="card trshelf venter" id="trShelf"><div class="trhd"><h3>${esc(t.shelfT)}</h3><p class="small muted">${esc(t.shelfP)}</p><div class="trstats"><span class="pill">${esc(t.now(st))}</span><span class="pill">${esc(t.best(best))}</span></div>${nx ? `<p class="small trnext">${esc(t.next(t.names[nx.i], nx.left))}</p><div class="bar trbar"><i style="width:${Math.max(3, Math.min(100, (st / TROPHY_DAYS[nx.i]) * 100)).toFixed(1)}%"></i></div>` : `<p class="small trnext">${esc(t.all)}</p>`}</div><div class="trwood">${rows}</div></div>`;
}
const _viewHomeV18 = viewHome;
viewHome = function () {
  const h = _viewHomeV18(); const sh = trShelfHtml(); if (!sh) return h;
  const k = h.indexOf('<div class="homehead">'); if (k < 0) return h;
  return h.slice(0, k) + sh + h.slice(k);
};
function trDetail(i) {
  const t = v18t(); const n = TROPHY_DAYS[i]; const tr = trophies()[n]; const st = streak();
  layer.innerHTML = `<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="trdT"><div class="box card trdet"><div class="trdart">${trophySVG(i, !!(tr && tr.p), !tr)}</div><h2 id="trdT">${esc(tr ? t.names[i] : t.lockedT)}</h2><p class="trdays">${esc(t.inRow(n))}</p>${tr ? `<p class="small muted">${esc(t.got(fmtDate(tr.at)))}</p>${tr.p ? `<p class="trperf"><span>★</span> ${esc(t.perfect)}: ${esc(t.perfectP)}</p>` : `<p class="small muted">${esc(t.perfect)}: ${esc(t.perfectP)}</p>`}` : `<p class="small muted">${esc(t.locked(Math.max(1, n - st)))}</p>`}<div class="trbtns">${tr ? `<button class="btn ghost" id="trShare" data-tr="${i}">${esc(t.share)}</button>` : ""}<button class="btn" id="closeLayer">${esc(L().close)}</button></div></div></div>`;
  SND.play("click"); if (anim) G.from(".trdet", { y: 24, scale: 0.95, opacity: 0, duration: 0.35, ease: "back.out(1.6)" });
}

/* --- Quando controllare: dopo ogni obiettivo (o riposo) e all'apertura dell'app --- */
const _completeGoalV18 = completeGoal;
completeGoal = function (g, rect) { const before = streak(); _completeGoalV18(g, rect); if (streak() !== before || S.done.length) trophySoon(2600); };
document.addEventListener("click", (ev) => {
  const b = ev.target.closest && ev.target.closest("button"); if (!b) return;
  if (b.id === "trOk") { ev.stopImmediatePropagation(); SND.play("click"); trophyPartyClose(); return; }
  if (b.id === "trShare") { ev.stopImmediatePropagation(); const i = +b.dataset.tr; const p = document.getElementById("trParty"); if (p) { p.remove(); document.body.classList.remove("trlock"); } trShare(i); return; }
  if (b.dataset.trophy !== undefined) { ev.stopImmediatePropagation(); trDetail(+b.dataset.trophy); return; }
  /* "Prendo un giorno di riposo" allunga la serie: anche li' si controlla */
  if (b.id === "rest") trophySoon(1500);
}, true);
setTimeout(() => { if (S.pet) trophySoon(0); }, 2600);
/* la festa e' in primo piano: il tasto indietro la chiude */
if (typeof backPress === "function") { const _backPressV18t = backPress; backPress = function () { if (document.getElementById("trParty")) { trophyPartyClose(); return "trophy"; } return _backPressV18t(); }; }
