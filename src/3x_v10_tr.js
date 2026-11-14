/* v10 (tr): Sezon 0, yol, haftalık görevler, şenlikler, kalkanlar, özet, koleksiyon, dünya turu */
Object.assign(T.tr, {
  rar: { b: "Temel", c: "Sıradan", r: "Nadir", e: "Epik", l: "Efsanevi" },
  season: {
    names: { lanterns: "Fenerler Sezonu" }, zero: "Sezon 0", left: (d) => `${d} gün kaldı`,
    tier: (n, m = 50) => `Durak ${n}/${m}`, passi: (n) => `${n} Adım`, next: (n) => `Sonraki durağa ${n} Adım kaldı`, open: "Yolu aç", pathT: "Sezon yolu",
    how: "Adımları sadece kendine bakarak kazanırsın: her hedef için 10, her tam gün için 20, her haftalık görev için 100. Şenlik haftasında iki kat değerlidirler.",
    free: "Herkese açık", gold: "Altın yol", claim: "Al", claimed: "Alındı", toClaim: (n) => `Alınacak ${n} ödül`,
    tani: (n) => `${n} Tanì`, shield: (n) => `${n} seri kalkanı`, got: (x) => `Kazandın: ${x}!`,
    founder: "Kurucu", founderP: "Sezon 0'da oynadın: bu rozet ve altın fener sonsuza dek senin.", fromPath: "Yol ödülü",
    goldLock: "Altın yol Tanetto Plus'a dahil", chapterT: (n) => `Fenerlerin hikâyesi · ${n}. bölüm`,
    story: [
      "Bu akşam {n} kapının önünde kâğıttan bir fener buldu. İçinde bir not vardı: “Her küçük iyilik bir ışık yakar.” Kim bırakmış olabilir?",
      "Kendine her baktığında fener biraz daha parlıyor. {n} feneri pencereye astı: dışarıdan küçük bir yıldız gibi göründüğünü söylüyorlar.",
      "Bugün mahalledeki her eve birer fener daha geldi. Herkes aynı şeyi merak ediyor: onları kim getiriyor? {n} bir şeylerden şüpheleniyor...",
      "Bir ipucu! Pencere kenarında minicik altın pati izleri var. {n} izleri ta göle kadar takip ediyor; gölün suyu binlerce minik ışığı yansıtıyor.",
      "Gölün kıyısında {n}, Fenerlerin Bekçisi ile tanışıyor: yaşlı ve iyi kalpli bir ateş böceği. “Fenerler, herkesin günlerine kattığı özenle yanar,” diyor gülümseyerek.",
      "Büyük şenlik gecesi geldi: bütün fenerler birlikte gökyüzüne yükseliyor. Seninki en parlaklardan biri, çünkü onu gün be gün sen yaktın. Bu sezonu birlikte geçirdiğimiz için teşekkürler."
    ]
  },
  wk: {
    T: "Haftalık görev", goals: (n) => `Bu hafta ${n} hedef tamamla`, days: (n) => `${n} farklı günde en az 2 hedef tamamla`, full: (n) => `${n} gün boyunca günün tüm hedeflerini tamamla`, cat: (n, c) => `«${c}» kategorisinde ${n} hedef tamamla`,
    prog: (a, b) => `${a}/${b}`, reward: (t, p) => `Ödül: ${t} Tanì ve ${p} Adım`, claim: "Ödülü al", done: "Görev tamamlandı! Sıradaki pazartesi geliyor.", ends: (d) => d <= 1 ? "Son gün" : `${d} gün sonra bitiyor`
  },
  festa: { P: "Şenlik haftası: Adımlar iki kat değerli!", names: ["Yeni Başlangıçlar Şenliği", "Sarılma Şenliği", "Filizler Şenliği", "Uçurtma Şenliği", "Çiçek Şenliği", "Ateş Böcekleri Şenliği", "Deniz Şenliği", "Kayan Yıldızlar Şenliği", "Yeni Defterler Şenliği", "Yapraklar Şenliği", "Battaniye Şenliği", "Minik Işıklar Şenliği"] },
  shield: { T: "Seri kalkanları", P: "Bir günü kaçırırsan bir kalkan serini otomatik olarak korur.", have: (n) => `${n} kalkanın var`, saved: "Bir kalkan serini korudu!" },
  rep: {
    T: "Senin ayın", goals: (n) => `${n} hedef tamamlandı`, days: (n) => `${n} aktif gün`, top: (g) => `En güçlü alışkanlığın: ${g}`, none: "Bu ay henüz anlatacak bir şey yok: ilk hedefini tamamla!",
    full: "Tam özet", fullT: (m) => `${m} özetin`, weeks: "Hafta hafta hedefler", moods: "Ruh hâlin", cats: "En çok özen gösterdiğin alanlar", habits: "En güçlü alışkanlıkların", tipT: (n) => `${n} diyor ki`,
    tips: { body: "Bu ay bedenine pek yer kalmadı: kısa bir yürüyüş ya da fazladan bir bardak su eklemeyi dene.", mind: "Zihnini unutma: günde bir dakika nefes almak harikalar yaratır.", home: "Yatağını toplamak gibi ev için küçük bir dokunuş, günleri hafifletir.", people: "Sevdiğin birine yaz: kısa bir mesaj bile içini ısıtır.", work: "Arada bir gerçek bir mola ver: enerjini toplar.", sleep: "Uyku bir süper güçtür: ekranı biraz daha erken kapatmayı dene.", custom: "Kişisel hedeflerin çok değerli: böyle devam et." },
    plusOnly: "Tam özet Tanetto Plus'a dahil"
  },
  coll: { T: (m) => `${m} koleksiyonu`, P: "Sadece bu aya özel Tanetto Plus eşyaları.", get: "Al", unlock: "Plus ile aç" },
  worldT: "Dünya turu", worldP: (k) => `Tanetto Plus'a özel geziler: keşfedilecek ${k} harika yer.`,
  wishT: "Dilek", wishes: ["Senin için bir dilek tuttum: yarın güzel bir gün olsun.", "Fener yükseklerde uçuyor: bize şans getirecek!", "Dilek gerçekleşti: kocaman bir sarılma.", "Yükselişini izlemek ne güzel... tıpkı senin ilerlemen gibi!"],
  festival: { name: "Fener Şenliği", say: ["Göldeki şu fenerlere bak!", "Biz de kendi fenerimizi yakalım mı?"], tap: "Bir fener bırakmak için göle dokun" }
});
Object.assign(T.tr.acts2, { wish: "Dilek" });
Object.assign(T.tr.items, { h_lantern: "Fener şapka", h_lantern_gold: "Fenerli taç", w_lanterns: "Fener gecesi", lamp_stone: "Taş fener", tree_lights: "Işıklı ağaççık", rug_autumn: "Sonbahar halısı", curt_autumn: "Sonbahar perdeleri", founder_lantern: "Kurucuların feneri", rug_moon: "Ay halısı", h_acorn: "Palamut şapka", h_beret: "Kırmızı bere", w_leaves: "Dans eden yapraklar" });
Object.assign(T.tr.plus, { perks: ["Asla reklam yok", null /* 1.0.9: era la chat (ora gratis per tutti) */, (k) => `Dünya turu: ${k} özel gezi`, "Çok daha güzel ödüllerle altın yol", "Her ay özel bir koleksiyon", "Her ay 2 seri kalkanı", "Her ay hediye 300 Tanì ve hedeflerden +%50 Tanì", "Resimli ve ipuçlu tam aylık özet"] });
Object.assign(T.tr.tani, { enough: ["Sıradan bir eşyaya yeter", "Nadir bir eşyaya yeter", "Epik bir eşyaya yeter", "Efsanevi bir eşyaya yeter"] });
T.tr.tracks = T.tr.tracks.concat(["Hafif adımlar", "Ferah sabah", "Battaniye ve çay", "Sabun köpükleri", "El ele halka", "Nazik bulut", "Bisiklet turu", "Ateş böceği dansı", "Fener gecesi"]);
T.tr.world = [
  { name: "Gize Piramitleri", t: "Eskilerin de eskisi", s: "{n}, deve sırtında Gize Piramitleri'nin önünden geçiyor ve altın rengi güneşte gözlerini kısıyor. Büyük Piramit yaklaşık 4.500 yaşında ve neredeyse 4.000 yıl boyunca dünyanın en yüksek yapısıydı!" },
  { name: "Santorini", t: "Denize bakan mavi kubbeler", s: "{n}, ışıl ışıl denizin çok yukarısında, beyaz evlerle mavi kubbeler arasında dolaşıyor. Santorini hilal biçimindedir, çünkü eski bir yanardağın kenarıdır." },
  { name: "Matterhorn", t: "Çikolata dağı", s: "{n}, ahşap bir dağ evinin önünde sıcak kakao yudumlarken Matterhorn'a bakıyor. Sivri zirvesi o kadar ünlü ki tanınmış bir İsviçre çikolatasının üzerinde bile yer alıyor!" },
  { name: "Norveç Fiyortları", t: "Buzulların denizi oyduğu yer", s: "{n}, yüksek yeşil kayalıkların arasında küçük bir tekneyle ilerliyor ve şelaleleri sayıyor. Bu uzun ve derin fiyortları, Buzul Çağı'nda dev buzullar oymuş." },
  { name: "Laponya", t: "Dans eden ışıklar", s: "Dalgalanan yeşil kutup ışıklarının altında {n}, bir ren geyiği ailesine merhaba diyor. İlginç bilgi: ren geyiklerinin hem erkeklerinde hem dişilerinde boynuz çıkar!" },
  { name: "İzlanda", t: "Gökyüzü parlıyor", s: "Gökyüzü yeşile ve pembeye boyanırken {n} bir şelalenin sesini dinliyor. Kutup ışıkları, Güneş'ten savrulan minicik parçacıklar Dünya'nın çok yukarısında havaya çarptığında ortaya çıkar." },
  { name: "Sahra Çölü", t: "Kumların ortasında bir vaha", s: "Kum tepelerinde uzun bir yürüyüşün ardından {n}, palmiyelerle dolu serin bir vaha buluyor. Devenin hörgücünde su değil yağ vardır: bu sayede develer günlerce yemek yemeden dayanabilir." },
  { name: "Petra", t: "Kayaya oyulmuş bir şehir", s: "{n}, dar bir kanyondan parmak uçlarında geçiyor ve birden pembe pembe parlayan Petra Hazinesi'ni görüyor. Hazine, 2.000 yıldan uzun süre önce doğrudan kayaya oyulmuş!" },
  { name: "Kenya Safarisi", t: "Merhaba, uzun boylu dost!", s: "Safaride {n}, uzakta karlı Kilimanjaro dururken akasya yapraklarını kemiren zürafaları izliyor. Bir zürafanın dili neredeyse yarım metre uzunluğunda olabilir!" },
  { name: "Victoria Şelalesi", t: "Gürleyen duman", s: "{n}, Victoria Şelalesi'nin serin serpintisini yüzünde hissediyor ve sisin içinde bir gökkuşağı görüyor. Yerel halk ona Mosi-oa-Tunya, yani “gürleyen duman” diyor." },
  { name: "Tac Mahal", t: "Işıktan bir saray", s: "{n}, gün doğarken güneşin Tac Mahal'i açık pembeye boyamasını izliyor. Beyaz mermeri gün boyunca renk değiştiriyor gibidir: sabah pembe, öğlen beyaz, akşam altın sarısı." },
  { name: "Angkor Wat", t: "Gün doğumunda kuleler", s: "{n}, Angkor Wat'ın kulelerinin gün doğarken gölete yansımasını görmek için erkenden uyanıyor. Burası dünyanın en büyük tapınağı ve Kamboçya bayrağında bile yer alıyor!" },
  { name: "Bali", t: "Yeşil merdivenler", s: "{n}, dev yeşil merdivenlere benzeyen teraslı pirinç tarlalarında yürüyor. Buradaki çiftçiler suyu, 1.000 yıldan eski akıllıca bir kanal sistemiyle paylaşıyor." },
  { name: "Maldivler", t: "Su üstünde bir ev", s: "{n}, kazıklar üstündeki küçük bir kulübede uyuyor; balıklar tam altında yüzüyor. Maldivler yaklaşık 1.200 adadan oluşur ve dünyanın en düz ülkesidir." },
  { name: "Büyük Set Resifi", t: "Merhaba, palyaço balığı!", s: "{n}, rengârenk mercanların arasında palyaço balıkları ve sakin bir deniz kaplumbağasıyla şnorkelle yüzüyor. Büyük Set Resifi o kadar büyük ki uzaydan bile görülebiliyor!" },
  { name: "Sidney", t: "Limanda yelkenler", s: "{n}, Sidney Opera Binası'nı yakından görmek için vapurla limanı geçiyor. Yelken biçimindeki çatıları bir milyondan fazla karoyla kaplı!" },
  { name: "Banff", t: "Turkuaz göl", s: "{n}, değerli bir taş kadar mavi bir gölde kırmızı bir kanoyla kürek çekiyor. Bu renk, buzulların öğüttüğü minicik taş parçalarından, yani “kaya unu”ndan geliyor." },
  { name: "Hawaii", t: "Hâlâ büyüyen adalar", s: "Uzakta bir yanardağ tüterken {n} kumdan kale yapıyor. Lav denize akıp soğuduğunda yepyeni kara oluşur; yani Hawaii hâlâ büyüyor!" },
  { name: "Galapagos", t: "Çok yaşlı bir dost", s: "{n}, bir kaktüs yaprağını yavaş yavaş kemiren dev bir kaplumbağayla tanışıyor. Bu sevimli devler 100 yıldan uzun yaşayabilir!" },
  { name: "Machu Picchu", t: "Bulutlardaki şehir", s: "Bulutlar dağılırken {n} Machu Picchu'ya tırmanıyor, sevimli bir lama da merhaba demeye geliyor. İnkalar taşları öyle kusursuz birleştirmiş ki hiç harca gerek duymamışlar." },
  { name: "Salar de Uyuni", t: "Gökyüzünde yürümek", s: "{n}, dünyanın en büyük tuz düzlüğü olan Salar de Uyuni'de yürüyor. Yağmurdan sonra dev bir aynaya dönüşür ve insan gökyüzünde yürüyormuş gibi hisseder!" },
  { name: "Patagonya", t: "Tüten dağ", s: "{n}, Fitz Roy'un granit zirvelerinin gün doğumunda pembeleşmesini izliyor. Yerel halk bu dağa “tüten dağ” anlamına gelen Chaltén adını vermiş, çünkü tepesinde sık sık bulutlar döner." },
  { name: "Paskalya Adası", t: "Taş devler", s: "{n}, Paskalya Adası'nın taş devleri moailere günaydın diyor. Neredeyse 1.000 tane var ve çoğu sırtını denize dönmüş." },
  { name: "Antarktika", t: "Penguen geçidi", s: "Dev buzdağlarının arasında {n}, bir grup imparator pengueniyle birlikte paytak paytak yürüyor. Penguen babalar, kışın tam ortasında yumurtayı yaklaşık iki ay boyunca ayaklarının üstünde sıcak tutar!" }
];
