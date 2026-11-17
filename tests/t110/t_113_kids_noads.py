"""1.0.10 (113): regole Google Play "Families" (answer/9893335): ai bambini e a chi non ha detto l'eta' niente video con
premio (i video con premio di AdMob non si chiudono dopo 5 secondi).
1) child (sotto i 13 anni), "Preferisco non dirlo" ed eta' mai chiesta: nessuna offerta di video in tutta l'app (Casa,
   regalo del giorno, negozio dei Tanì, "ti mancano X Tanì", Profilo, ogni scheda), nessuna chiamata al modulo dei video
   (init / load / show / privacy), nessun "Nessuna pubblicità disponibile", niente "Scelte sulla pubblicità".
2) teen e adult: come prima (pulsanti, testi, video mostrato e premio dato).
3) eta' non detta e poi detta (adulto): i video tornano; detta da bambino: restano spenti.
4) testi: informativa, scheda Privacy e Plus in 14 lingue; parti native (AdsPlugin.java)."""
import json, sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T

# il modulo finto dei video conta ogni chiamata (si aggiunge al Capacitor finto di lib110)
SPY = """(() => { const A = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.TanettoAds; if (!A) return;
  window.__adc = { init: 0, load: 0, show: 0, privacy: 0, ages: [] };
  ["init", "load", "show", "privacy"].forEach((k) => { const f = A[k]; A[k] = async (o) => { __adc[k]++; if (o && o.age) __adc.ages.push(k + ":" + o.age); return f(o); }; }); })();"""
AGE_NOAD_EN = "At your age there are no reward videos."
TABS = ["today", "home", "shop", "trips", "more"]
SUBS = ["prog", "comp", "set", "acct", "priv", "buy", "help", "about"]
# frase breve in coda al paragrafo dei video dell'informativa (stesse parole del titolo del paragrafo), 14 lingue
SHORT9 = {
    'it': "Sotto i 13 anni, o se preferisci non dire l'età, non ci sono video con premio.",
    'en': "Under 13, or if you'd rather not say your age, there are no rewarded videos.",
    'de': 'Unter 13 Jahren oder wenn du dein Alter lieber nicht sagst, gibt es keine Videos mit Belohnung.',
    'es': 'Por debajo de los 13 años, o si prefieres no decir tu edad, no hay vídeos con recompensa.',
    'fr': "Avant 13 ans, ou si tu préfères ne pas dire ton âge, il n'y a pas de vidéos récompensées.",
    'pt': 'Abaixo dos 13 anos, ou se você preferir não dizer sua idade, não há vídeos com recompensa.',
    'ja': '13歳未満の方、または年齢を答えなかった方には、ごほうび付き動画はありません。',
    'ko': '만 13세 미만이거나 나이를 말하고 싶지 않다고 하면 보상형 동영상은 없어요.',
    'zh': '未满 13 岁，或你选择不告诉我们年龄时，没有奖励视频。',
    'zht': '未滿 13 歲，或你選擇不告訴我們年齡時，沒有獎勵影片。',
    'ru': 'До 13 лет или если ты не хочешь говорить свой возраст, видео с наградой нет.',
    'pl': 'Poniżej 13 lat albo jeśli wolisz nie podawać wieku, nie ma filmów z nagrodą.',
    'nl': "Onder de 13 jaar, of als je je leeftijd liever niet zegt, zijn er geen video's met beloning.",
    'tr': '13 yaşın altındaysan ya da yaşını söylememeyi tercih edersen ödüllü video yoktur.',
}
# la stessa frase nella scheda Privacy del Profilo (stesse parole della scheda), 14 lingue
SHORTCARD = {
    'it': "Sotto i 13 anni, o se preferisci non dire l'età, non ci sono video con premio.",
    'en': "Under 13, or if you'd rather not say your age, there are no reward videos.",
    'de': 'Unter 13 Jahren oder wenn du dein Alter lieber nicht sagst, gibt es keine Belohnungsvideos.',
    'es': 'Por debajo de los 13 años, o si prefieres no decir tu edad, no hay vídeos con premio.',
    'fr': "Avant 13 ans, ou si tu préfères ne pas dire ton âge, il n'y a pas de vidéos récompensées.",
    'pt': 'Abaixo dos 13 anos, ou se você preferir não dizer sua idade, não há vídeos com prêmio.',
    'ja': '13歳未満の方、または年齢を答えなかった方には、ごほうび動画はありません。',
    'ko': '만 13세 미만이거나 나이를 말하고 싶지 않다고 하면 보상 영상은 없어요.',
    'zh': '未满 13 岁，或你选择不告诉我们年龄时，没有奖励视频。',
    'zht': '未滿 13 歲，或你選擇不告訴我們年齡時，沒有獎勵影片。',
    'ru': 'До 13 лет или если ты не хочешь говорить свой возраст, видео с наградой нет.',
    'pl': 'Poniżej 13 lat albo jeśli wolisz nie podawać wieku, nie ma filmów z nagrodą.',
    'nl': "Onder de 13 jaar, of als je je leeftijd liever niet zegt, zijn er geen beloningsvideo's.",
    'tr': '13 yaşın altındaysan ya da yaşını söylememeyi tercih edersen ödüllü video yoktur.',
}
# frasi vecchie (1.0.10 / 112) che promettevano video adatti ai bambini: non devono esserci piu'
OLD13 = {
    'it': "Sotto i 13 anni, o se preferisci non dirlo, i video con premio sono solo quelli adatti ai bambini, mai personalizzati, e l'ID pubblicità non viene inviato.",
    'en': "Under 13, or if you'd rather not say, reward videos are only child-appropriate ones, never personalised, and the advertising ID is not sent.",
    'de': 'Unter 13 Jahren, oder wenn du es lieber nicht sagst, gibt es nur kindgerechte Belohnungsvideos, nie personalisiert, und die Werbe-ID wird nicht gesendet.',
    'es': 'Por debajo de los 13 años, o si prefieres no decirlo, los vídeos con premio son solo los adecuados para niños, nunca personalizados, y no se envía el ID de publicidad.',
    'fr': "Avant 13 ans, ou si tu préfères ne pas le dire, les vidéos récompensées sont uniquement adaptées aux enfants, jamais personnalisées, et l'identifiant publicitaire n'est pas envoyé.",
    'pt': 'Abaixo dos 13 anos, ou se você preferir não dizer, os vídeos com prêmio são só os adequados para crianças, nunca personalizados, e o ID de publicidade não é enviado.',
    'ja': '13歳未満の方、または答えなかった方には、子ども向けのごほうび動画だけが表示され、パーソナライズされることはなく、広告IDも送信されません。',
    'ko': '만 13세 미만이거나 말하고 싶지 않다고 하면 어린이에게 맞는 보상 영상만 보이고, 맞춤 광고는 없으며 광고 ID도 보내지 않아요.',
    'zh': '未满 13 岁，或你选择不告诉我们时，只会显示适合儿童的奖励视频，绝不个性化，也不会发送广告 ID。',
    'zht': '未滿 13 歲，或你選擇不告訴我們時，只會顯示適合兒童的獎勵影片，絕不個人化，也不會傳送廣告 ID。',
    'ru': 'До 13 лет, или если ты не хочешь говорить, показываются только подходящие детям видео с наградой, никогда не персонализированные, и рекламный идентификатор не передаётся.',
    'pl': 'Poniżej 13 lat, albo jeśli wolisz nie mówić, filmiki z nagrodą są tylko odpowiednie dla dzieci, nigdy spersonalizowane, a identyfikator reklamowy nie jest wysyłany.',
    'nl': "Onder de 13 jaar, of als je het liever niet zegt, zie je alleen beloningsvideo's die geschikt zijn voor kinderen, nooit gepersonaliseerd, en wordt de advertentie-ID niet verstuurd.",
    'tr': '13 yaşın altındaysan ya da söylememeyi tercih edersen yalnızca çocuklara uygun ödüllü videolar gösterilir, hiçbir zaman kişiselleştirilmez ve reklam kimliği gönderilmez.',
}
# testo vecchio di 'Preferisco non dirlo' in Profilo
OLDNO = {
    'it': 'Hai preferito non dirla: la pubblicità è sempre adatta ai bambini e il backup online non è disponibile.',
    'en': "You preferred not to say: ads are always child-appropriate and the online backup isn't available.",
    'de': 'Du wolltest es lieber nicht sagen: Die Werbung ist immer kindgerecht und das Online-Backup ist nicht verfügbar.',
    'es': 'Preferiste no decirla: los anuncios son siempre aptos para niños y la copia en línea no está disponible.',
    'fr': "Tu as préféré ne pas le dire : les publicités sont toujours adaptées aux enfants et la sauvegarde en ligne n'est pas disponible.",
    'pt': 'Você preferiu não dizer: os anúncios são sempre adequados para crianças e o backup on-line não está disponível.',
    'ja': '答えないことを選びました。広告は常に子ども向けのものだけになり、オンラインバックアップは使えません。',
    'ko': '말하지 않기로 했어요. 광고는 항상 어린이에게 맞는 것만 나오고 온라인 백업은 사용할 수 없어요.',
    'zh': '你选择了不告诉我们：广告始终适合儿童，也不能使用在线备份。',
    'zht': '你選擇了不告訴我們：廣告一律適合兒童，也無法使用線上備份。',
    'ru': 'Без ответа на этот вопрос реклама всегда подходит для детей, а онлайн-копия недоступна.',
    'pl': 'Wybrano odpowiedź „wolę nie mówić”: reklamy są zawsze odpowiednie dla dzieci, a kopia online nie jest dostępna.',
    'nl': 'Je zei het liever niet: advertenties zijn altijd geschikt voor kinderen en de online back-up is niet beschikbaar.',
    'tr': 'Söylememeyi tercih ettin: reklamlar her zaman çocuklara uygundur ve çevrimiçi yedek kullanılamaz.',
}
# frase vecchia del paragrafo per gli Stati Uniti
OLDKIDS = {
    'it': "l'unico servizio che riceve un identificativo tecnico è Google AdMob (pubblicità adatta ai bambini, non personalizzata e senza l'ID pubblicità), e per loro le statistiche anonime sono sempre spente.",
    'en': 'the only service that receives a technical identifier is Google AdMob (child-appropriate ads that are not personalised, without the advertising ID), and anonymous statistics are always off for them.',
    'de': 'Nur ein Dienst erhält eine technische Kennung, Google AdMob (kindgerechte, nicht personalisierte Werbung ohne Werbe-ID), und die anonymen Statistiken sind für sie immer ausgeschaltet.',
    'es': 'el único servicio que recibe un identificador técnico es Google AdMob (anuncios adecuados para niños, no personalizados y sin el ID de publicidad), y para ellos las estadísticas anónimas están siempre desactivadas.',
    'fr': "le seul service qui reçoit un identifiant technique est Google AdMob (des publicités adaptées aux enfants, non personnalisées et sans l'identifiant publicitaire), et les statistiques anonymes sont toujours désactivées pour eux.",
    'pt': 'o único serviço que recebe um identificador técnico é o Google AdMob (anúncios adequados para crianças, não personalizados e sem o ID de publicidade), e para elas as estatísticas anônimas ficam sempre desligadas.',
    'ja': '技術的な識別子を受け取るのはGoogle AdMob（子ども向けでパーソナライズされない広告で、広告IDは使いません）だけで、匿名の統計は常にオフです。',
    'ko': '기술적인 식별 정보를 받는 서비스는 Google AdMob(어린이에게 맞는 비맞춤형 광고, 광고 ID 없이)뿐이고, 익명 통계는 항상 꺼져 있어요.',
    'zh': '只有 Google AdMob（适合儿童、非个性化、不使用广告 ID 的广告）会收到技术标识，匿名统计对他们始终关闭。',
    'zht': '只有 Google AdMob（適合兒童、非個人化、不使用廣告 ID 的廣告）會收到技術識別碼，匿名統計對他們始終關閉。',
    'ru': 'технический идентификатор получает только Google AdMob (подходящая детям неперсонализированная реклама без рекламного идентификатора), а анонимная статистика для них всегда выключена.',
    'pl': 'techniczny identyfikator otrzymuje tylko Google AdMob (reklamy odpowiednie dla dzieci, niespersonalizowane i bez identyfikatora reklamowego), a anonimowe statystyki są dla nich zawsze wyłączone.',
    'nl': 'alleen Google AdMob (niet-gepersonaliseerde advertenties die geschikt zijn voor kinderen, zonder advertentie-ID) ontvangt een technische identificatie, en de anonieme statistieken staan voor hen altijd uit.',
    'tr': "teknik bir tanımlayıcı alan tek hizmet Google AdMob'dur (çocuklara uygun, kişiselleştirilmemiş, reklam kimliği kullanılmayan reklamlar) ve anonim istatistikler onlar için her zaman kapalıdır.",
}
# tutti i testi dei pulsanti dei video (V19AD.gift, V23.adMore) e degli avvisi, in tutte le lingue, letti dall'app
ALLTXT = """JSON.stringify((() => { const o = []; Object.keys(V19AD).forEach((l) => { const a = V19AD[l];
  ["gift", "thanks"].forEach((k) => { try { o.push(a[k](7)); } catch (e) {} }); o.push(a.none, a.privT);
  const v = V23[l] || {}; ["adMore", "adThanksMore"].forEach((k) => { try { if (v[k]) o.push(v[k](7)); } catch (e) {} }); });
  return o.map((s) => String(s).replace(/7/g, "").replace(/[()（）+]/g, "").trim().slice(0, 14)).filter((s) => s.length >= 6); })())"""

def st0(lang="en", **kw):
    d = dict(done=["water"], giftDay="2026-11-16", visit={"n": 5, "last": "2026-11-16"}, adsOk=1, log=[{"d": "2026-11-16", "g": "water"}], seeds=100)
    d.update(kw); return T.base_state(lang, **d)

async def sweep(pg):
    """visita ogni schermata e ogni scheda; ritorna (pulsanti video trovati, testi dei video trovati, dove)"""
    pats = json.loads(await T.ev(pg, ALLTXT))
    found = []
    async def look(where):
        r = json.loads(await T.ev(pg, """JSON.stringify((() => { const q = '.adbtn, #adGift, #adShop, .adpriv, #adPrivacy';
          const n = document.querySelectorAll(q).length; return { n, t: document.body.innerText }; })())"""))
        hit = [p for p in pats if p in r["t"]]
        if r["n"] or hit: found.append((where, r["n"], hit[:3]))
    for tab in TABS:
        await T.ev(pg, f"layer.innerHTML = ''; tab = '{tab}'; moreSub = null; render(); 1"); await pg.wait_for_timeout(250); await look("tab " + tab)
    for sub in SUBS:
        await T.ev(pg, f"layer.innerHTML = ''; tab = 'more'; moreSub = '{sub}'; render(); 1"); await pg.wait_for_timeout(250); await look("profilo " + sub)
    for name, code in [("negozio dei Tanì", "openTaniShop('t113')"), ("ti mancano", "needSheet({ price: 5000, id: 't113' })"), ("Plus", "openPlus('t113')")]:
        await T.ev(pg, f"layer.innerHTML = ''; tab = 'shop'; render(); {code}; 1"); await pg.wait_for_timeout(700); await look(name)
    await T.ev(pg, "layer.innerHTML = ''; tab = 'today'; render(); 1")
    return found

async def kid_case(b, age, lang="en", adsOk=1, label=None):
    label = label or age
    ctx, pg = await T.page(b, st0(lang, adsOk=adsOk), native=True, age=age, lang="en-US", wait=3000, extra_js=SPY)
    await T.close_layer(pg); await pg.wait_for_timeout(9000)  # il controllo dei video gira ogni 5 secondi
    found = await sweep(pg)
    T.check(f"{label} ({lang}): nessuna offerta di video in nessuna schermata o scheda", not found, found[:4])
    # anche chiamando direttamente le funzioni: niente video, niente avviso "nessuna pubblicità"
    r = json.loads(await T.ev(pg, """(async () => { const t0 = (document.getElementById('toast') || {}).textContent || '';
      let got = 0; await adShow(() => { got = 1; }, 't113'); await adsInit(); await adsLoad();
      const b = adBtn('x', 'y'); const t1 = (document.getElementById('toast') || {}).textContent || '';
      return JSON.stringify({ on: adsOn(), offer: adOffer(), b, got, toastNew: t1 !== t0 ? t1 : '', none: v19ad().none, adc: window.__adc }); })()"""))
    T.check(f"  {label}: adsOn() e adOffer() spenti, adBtn() vuoto, adShow() non da' nulla", r["on"] is False and r["offer"] is False and r["b"] == "" and r["got"] == 0, r)
    T.check(f"  {label}: nessun avviso 'nessuna pubblicità' a chi non puo' averne", r["none"] not in r["toastNew"], r["toastNew"])
    T.check(f"  {label}: nessuna chiamata al modulo dei video (init/load/show/privacy)", r["adc"] and all(r["adc"][k] == 0 for k in ("init", "load", "show", "privacy")), r["adc"])
    # il regalo del giorno appena aperto: nessun pulsante "raddoppia"
    await T.ev(pg, "S.giftDay = null; save(); layer.innerHTML = ''; tab = 'more'; moreSub = 'prog'; render(); 1"); await pg.wait_for_timeout(300)
    await T.ev(pg, "openGift(); 1"); await pg.wait_for_timeout(1500)
    await T.ev(pg, "layer.innerHTML = ''; tab = 'more'; moreSub = 'prog'; render(); 1"); await pg.wait_for_timeout(400)
    r = json.loads(await T.ev(pg, "JSON.stringify({ g: S.giftDay === S.day, n: document.querySelectorAll('.adbtn').length, t: !!document.querySelector('.teaser') })"))
    T.check(f"  {label}: regalo del giorno aperto davvero, nessun pulsante del video", r["g"] and r["t"] and r["n"] == 0, r)
    T.check(f"  nessun errore ({label})", not pg.errs, pg.errs[:2])
    await ctx.close()

async def grown_case(b, age, want):
    ctx, pg = await T.page(b, st0("en"), native=True, age=age, lang="en-US", wait=3000, extra_js=SPY)
    await T.close_layer(pg)
    for _ in range(30):
        if await T.ev(pg, "adsSt.loaded"): break
        await pg.wait_for_timeout(500)
    # lo stesso giro di sweep() che per il bambino non deve trovare niente qui trova i video (cosi' il giro non e' cieco)
    found = await sweep(pg); where = [f[0] for f in found if f[1] and f[2]]
    T.check(f"{age}: il giro di tutte le schermate trova i video (Casa/regalo, negozio, 'ti mancano')", all(w in where for w in ("negozio dei Tanì", "ti mancano")) and any(w.startswith("tab ") or w.startswith("profilo ") for w in where), found)
    await T.ev(pg, "tab = 'more'; moreSub = 'prog'; render(); 1"); await pg.wait_for_timeout(400)
    g = await T.ev(pg, "(document.getElementById('adGift') || {}).textContent || ''")
    T.check(f"{age}: pulsante del video sul regalo del giorno (come prima): '{want}'", want in g, g)
    await T.ev(pg, "layer.innerHTML = ''; openTaniShop('t113'); 1"); await pg.wait_for_timeout(600)
    T.check(f"  {age}: pulsante del video nel negozio dei Tanì", await T.ev(pg, "!!layer.querySelector('#adShop')"))
    await T.ev(pg, "layer.innerHTML = ''; needSheet({ price: 5000, id: 't113' }); 1"); await pg.wait_for_timeout(600)
    T.check(f"  {age}: pulsante del video in 'ti mancano X Tanì'", await T.ev(pg, "!!layer.querySelector('#adShop')"))
    s0 = await T.ev(pg, "S.seeds")
    await pg.click("#adShop"); await pg.wait_for_timeout(2000)
    r = json.loads(await T.ev(pg, "JSON.stringify({ s: S.seeds, adc: window.__adc, shows: window.__ads.shows })"))
    T.check(f"  {age}: il video si guarda e il premio arriva (come prima)", r["shows"] == 1 and r["s"] > s0 and r["adc"]["show"] == 1, (s0, r))
    T.check(f"  {age}: al modulo arriva l'eta' giusta ({age})", r["adc"]["ages"] and all(x.endswith(":" + age) for x in r["adc"]["ages"]) and "show:" + age in r["adc"]["ages"], r["adc"]["ages"])
    await T.ev(pg, "layer.innerHTML = ''; openPlus('t113'); 1"); await pg.wait_for_timeout(600)
    pl = await T.ev(pg, "layer.innerText")
    T.check(f"  {age}: Plus dice ancora 'with no ads' (come prima)", "with no ads" in pl, pl[:200])
    T.check(f"  nessun errore ({age})", not pg.errs, pg.errs[:2])
    await ctx.close()

async def main(b):
    # 1) bambini, eta' non detta, eta' mai chiesta (anche senza consenso ancora dato: il pulsante "pigro")
    await kid_case(b, "child")
    await kid_case(b, "skip", label="preferisco non dirlo")
    await kid_case(b, "none", label="eta' mai chiesta")
    await kid_case(b, "child", adsOk=0, label="bambino senza consenso gia' dato")
    await kid_case(b, {"y": 2014, "m": 1}, label="12 anni")
    await kid_case(b, "child", lang="it")
    await kid_case(b, "skip", lang="ja", label="preferisco non dirlo")
    # tutte le lingue: negozio, "ti mancano" e regalo, per un bambino
    for lang in T.LANGS:
        ctx, pg = await T.page(b, st0(lang), native=True, age="child", lang="en-US", wait=2500, extra_js=SPY)
        await T.close_layer(pg); await pg.wait_for_timeout(5500)
        n = []
        for code in ["openTaniShop('t113')", "needSheet({ price: 5000, id: 't113' })", "tab = 'more'; moreSub = 'prog'; render()"]:
            await T.ev(pg, f"layer.innerHTML = ''; {code}; 1"); await pg.wait_for_timeout(500)
            n.append(await T.ev(pg, "document.querySelectorAll('.adbtn').length"))
        adc = json.loads(await T.ev(pg, "JSON.stringify(window.__adc)"))
        T.check(f"bambino, {lang}: nessun pulsante del video (negozio, 'ti mancano', regalo) e nessuna chiamata", n == [0, 0, 0] and adc["init"] == adc["load"] == adc["show"] == 0, (n, adc))
        await T.ev(pg, "layer.innerHTML = ''; openPlus('t113'); 1"); await pg.wait_for_timeout(500)
        r = json.loads(await T.ev(pg, "JSON.stringify({ t: layer.innerText, a: L().plus.perks[6], k: AGE_PLUS_KID[S.lang](EC.PLUS_MONTH) })"))
        T.check(f"  {lang}: Plus senza 'senza pubblicità' per il bambino", r["k"] in r["t"] and r["a"] not in r["t"] and r["k"] != r["a"], r["t"][:160])
        T.check(f"  nessun errore ({lang})", not pg.errs, pg.errs[:2])
        await ctx.close()
    # 2) ragazzi e adulti: come prima
    await grown_case(b, "adult", "double your gift")
    await grown_case(b, "teen", "extra gift")
    # 3) eta' non detta -> detta piu' tardi
    for ans, want in ((T.AGE["adult"], True), (T.AGE["child"], False)):
        ctx, pg = await T.page(b, st0("en"), native=True, age="skip", lang="en-US", wait=3000, extra_js=SPY)
        await T.close_layer(pg); await pg.wait_for_timeout(6000)
        a0 = json.loads(await T.ev(pg, "JSON.stringify(window.__adc)"))
        await T.ev(pg, f"ageSet({json.dumps(dict(ans, at='2026-11-16'))}); 1")
        for _ in range(30):
            if await T.ev(pg, "adsSt.loaded"): break
            await pg.wait_for_timeout(500)
        await T.ev(pg, "layer.innerHTML = ''; tab = 'more'; moreSub = 'prog'; render(); 1"); await pg.wait_for_timeout(400)
        r = json.loads(await T.ev(pg, "JSON.stringify({ g: !!document.getElementById('adGift'), adc: window.__adc, band: ageAds() })"))
        if want:
            T.check("eta' non detta, poi detta da adulto: i video tornano (consenso e video preparato, pulsante sul regalo)", a0["init"] == 0 and r["g"] and r["adc"]["init"] >= 1 and r["adc"]["load"] >= 1 and "init:adult" in r["adc"]["ages"], (a0, r))
        else:
            T.check("eta' non detta, poi detta da bambino: i video restano spenti", r["band"] == "child" and not r["g"] and r["adc"]["init"] == 0 and r["adc"]["load"] == 0, r)
        T.check("  nessun errore", not pg.errs, pg.errs[:2])
        await ctx.close()
    # 4) testi in 14 lingue: informativa (app e pagina pubblica) e scheda Privacy del Profilo
    ctx, pg = await T.page(b, T.base_state("en"), age="adult")
    pp = open(os.path.join(T.REPO, "privacy.html"), encoding="utf-8").read()
    for lang in T.LANGS:
        r = json.loads(await T.ev(pg, f"JSON.stringify({{ d: T['{lang}'].privDoc.join(' '), p: T['{lang}'].privP, n: V23['{lang}'].ageNo }})"))
        s9, sc = SHORT9[lang], SHORTCARD[lang]
        T.check(f"testi {lang}: informativa (app e pagina pubblica) e scheda Privacy dicono che sotto i 13 anni (o senza eta') non ci sono video", s9 in r["d"] and sc in r["p"] and s9 in pp, (s9 in r["d"], sc in r["p"], s9 in pp))
        bad = [o for o in (OLD13[lang], OLDKIDS[lang], OLDNO[lang]) if o in r["d"] or o in r["n"] or o in pp]
        T.check(f"  {lang}: nessuna frase vecchia ('video adatti ai bambini', 'solo AdMob riceve un identificativo', 'pubblicità per bambini')", not bad, [x[:50] for x in bad])
    old = ["only child-appropriate ones", "child-appropriate ads that are not personalised", "ads are always child-appropriate", "solo quelli adatti ai bambini", "pubblicità adatta ai bambini", "la pubblicità è sempre adatta ai bambini"]
    T.check("  pagina pubblica e testi it/en: nessuna delle frasi vecchie", not [o for o in old if o in pp] and not [o for o in old if o in await T.ev(pg, "T.en.privDoc.join(' ') + T.it.privDoc.join(' ') + V23.en.ageNo + V23.it.ageNo")])
    T.check("  'Preferisco non dirlo' in Profilo: niente pubblicità per bambini, niente video (it/en)", "non ci sono video con premio" in await T.ev(pg, "V23.it.ageNo") and "no reward videos" in await T.ev(pg, "V23.en.ageNo"))
    T.check("  data dell'informativa aggiornata (17/11/2026)", await T.ev(pg, "PRIVACY_DATE") == "2026-11-17")
    T.check("  adulto: la scheda dell'eta' in Profilo non parla di 'niente video' (come prima)", AGE_NOAD_EN not in await T.ev(pg, "psAgeCard()"))
    await ctx.close()
    for lang in T.LANGS:
        ctx, pg = await T.page(b, T.base_state(lang), age="child", lang="en-US")
        r = json.loads(await T.ev(pg, "JSON.stringify({ c: psAgeCard(), x: esc(AGE_KID_NOAD[S.lang]), y: esc(V23[S.lang].ageYes) })"))
        T.check(f"  {lang}: bambino che ha detto l'eta': la scheda dell'eta' dice anche che non ci sono video", r["x"] in r["c"] and r["y"][:20] in r["c"], r["c"][:200])
        await ctx.close()
    # 5) parti native: AdsPlugin non chiede consenso, non avvia l'SDK, non prepara e non mostra video per "child"
    j = open(os.path.join(T.REPO, "app-android/android/app/src/main/java/com/tanettoapp/tanetto/AdsPlugin.java"), encoding="utf-8").read()
    def body(name):
        k = j.index("public void " + name + "("); e = j.find("@PluginMethod", k); return j[k:e if e > 0 else len(j)]
    T.check("nativo: init con 'child' risponde subito senza consenso UMP e senza SDK", re.search(r"setAge\(a\);\s*/\*[^*]*\*/\s*if \(kid\(\)\) \{ call\.resolve\(state\(\)\); return; \}", body("init")) is not None and body("init").index("kid()") < body("init").index("getConsentInformation"))
    T.check("nativo: load con 'child' rifiuta prima di chiedere un video", "if (kid()) { rewarded = null; call.reject(\"child\"" in body("load") and body("load").index("kid()") < body("load").index("RewardedAd.load"))
    T.check("nativo: show con 'child' rifiuta prima di mostrare (e legge l'eta' passata dall'app)", 'call.getString("age")' in body("show") and body("show").index("kid()") < body("show").index("ad.show("))
    T.check("nativo: startSdk e privacy fermi per 'child', state() mai 'canRequestAds' per 'child'", "if (kid()) return;" in j[j.index("private void startSdk"):][:200] and "if (kid())" in body("privacy") and '"canRequestAds", !k &&' in j)
    T.check("nativo: senza eta' (o eta' strana) vale 'child'", 'private volatile String age = "child";' in j and 'call.getString("age", "child")' in j)
    man = open(os.path.join(T.REPO, "app-android/android/app/src/main/AndroidManifest.xml"), encoding="utf-8").read()
    T.check("nativo: la misurazione degli annunci parte solo con MobileAds.initialize (DELAY_APP_MEASUREMENT_INIT)", 'android:name="com.google.android.gms.ads.DELAY_APP_MEASUREMENT_INIT" android:value="true"' in man)
    js = open(os.path.join(T.REPO, "src/97zn_v19_ads.js"), encoding="utf-8").read()
    T.check("app: show() passa l'eta' al modulo", "adsPlugin().show(adAgeOpts())" in js)

T.run(main)
