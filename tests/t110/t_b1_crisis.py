"""1.0.10 blocco 1: parole di crisi (M-01b, G3-01, G3-02, G3-03, CR-01) e numeri di aiuto per Paese (M-12, I-06).
- Frasi dell'audit (crisis_audit_lists.py: T = da riconoscere, FP = modi di dire da NON prendere per crisi).
- Frasi nuove scritte per questa prova (HOLD), non usate per tarare gli elenchi all'inizio.
- La chat, il diario, "Lascia andare" e la capsula mostrano l'aiuto; i testi normali no.
- I numeri di aiuto cambiano con il Paese (fuso orario) e hanno sempre findahelpline.com in fondo."""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lib110 as T
from crisis_audit_lists import T as AUD_T, FP as AUD_FP
HOLD = {
 "it": (["ho voglia di morire", "non voglio piu stare al mondo", "voglio togliermi la vita", "stanotte la faccio finita", "nessuno sentirebbe la mia mancanza se morissi", "vorrei addormentarmi e non svegliarmi piu", "mi sono fatta del male di nuovo"],
        ["ho ucciso il boss nel gioco", "mi sono tagliato i capelli corti", "oggi muoio di caldo", "che fame, sto morendo", "questo film mi uccide dal ridere", "taglio la torta per tutti"]),
 "en": (["i want to end my life", "i just want to die", "i dont want to wake up tomorrow", "nobody would miss me if i died", "i'm thinking about killing myself", "i keep hurting myself", "life isnt worth living"],
        ["i killed it at the concert", "this cake is to die for", "i'm dead tired", "i cut the paper for my project", "my game character died", "we will kill time at the mall"]),
 "de": (["ich will mich umbringen", "ich will nicht mehr aufwachen", "ich möchte am liebsten tot sein", "ich ritze mich wieder", "keiner würde mich vermissen wenn ich tot wäre"],
        ["ich lach mich kaputt", "ich bin hundemüde", "das spiel bringt mich um vor lachen", "ich schneide das brot", "der film war tödlich langweilig"]),
 "es": (["quiero quitarme la vida", "ya no quiero estar aqui", "me quiero morir ya", "pienso en suicidarme", "me corto para no sentir"],
        ["me muero de ganas de verte", "me corto las uñas", "este examen me mata", "me muero de frio", "corto la tarta"]),
 "fr": (["je veux en finir avec la vie", "j'ai envie de me tuer", "je veux plus vivre du tout", "je me scarifie le soir", "personne ne me regretterait si je mourais"],
        ["je suis mort de rire", "je vais couper le gâteau", "ce prof va me tuer avec ses devoirs", "je meurs de chaud", "je me suis coupé les ongles"]),
 "pt": (["quero tirar minha vida", "nao quero mais estar aqui", "vou me matar hoje", "eu me corto quando fico triste", "queria dormir e nao acordar mais"],
        ["morri de rir", "vou cortar o bolo", "to morrendo de calor", "essa prova me mata", "cortei o cabelo"]),
 "ru": (["я хочу умереть прямо сейчас", "не хочу больше жить так", "думаю покончить с собой", "я режу себя", "лучше бы я умер"],
        ["умираю от скуки ржу", "убить время до урока", "режу хлеб", "от смеха чуть не умер", "голодный как волк"]),
 "pl": (["chce umrzec dzisiaj", "nie chce juz zyc", "mysle zeby sie zabic", "tne sie znowu", "wszystkim byloby lepiej beze mnie"],
        ["umieram ze smiechu", "zabije sie ze smiechu", "kroje chleb", "umieram z nudow", "pojechali beze mnie do kina"]),
 "nl": (["ik wil dood", "ik wil niet meer leven", "ik doe mezelf pijn", "ik wil er een einde aan maken", "ik denk aan zelfmoord"],
        ["ik lach me dood", "ik snij de taart", "ik ben doodmoe", "ik wil niet meer wachten op de bus", "doodgewoon een leuke dag"]),
 "tr": (["olmek istiyorum artik", "kendimi oldurmek istiyorum", "yasamak istemiyorum", "intihar etmeyi dusunuyorum", "kendime zarar veriyorum"],
        ["gulmekten oldum", "keske orada olsem tatilde", "jilet gibi keskin bir zeka", "acliktan oluyorum", "bugun cok yorgunum"]),
 "ja": (["死にたいです", "もう生きていたくない", "消えてしまいたい", "リスカした", "自殺したい"],
        ["笑い死ぬかと思った", "死ぬほどおいしい", "お腹すいて死にそう", "眠い", "宿題が多い"]),
 "ko": (["죽고 싶어요", "살기 싫어", "자해했어", "사라지고 싶어", "그만 살고 싶어"],
        ["웃겨 죽겠어", "배고파 죽겠어", "그냥 죽 먹을래", "목 매일 아파", "졸려"]),
 "zh": (["我想死", "我不想活了", "我想自杀", "活着没意思", "我割腕了"],
        ["笑死我了", "饿死了", "想死你了", "热死了", "累死了"]),
 "zht": (["我想死", "我不想活了", "我想自殺", "活著沒意思", "我割腕了"],
        ["笑死我了", "餓死了", "想死你了", "熱死了", "累死了"]),
}

async def main(b):
    ctx, pg = await T.page(b, T.base_state("en"), age="adult", wait=2500)
    tot = [0, 0, 0, 0]
    for l in T.LANGS:
        pos = AUD_T[l] + HOLD[l][0]; neg = AUD_FP[l] + HOLD[l][1]
        r = json.loads(await T.ev(pg, f"JSON.stringify({{p: {json.dumps(pos)}.map((x) => [x, crisisLevel(x, '{l}')]), n: {json.dumps(neg)}.map((x) => [x, crisisLevel(x, '{l}')])}})"))
        miss = [x for x, v in r["p"] if v < 2]; fp = [x for x, v in r["n"] if v >= 1]
        tot[0] += len(pos) - len(miss); tot[1] += len(pos); tot[2] += len(fp); tot[3] += len(neg)
        T.check(f"crisi {l}: riconosciute {len(pos) - len(miss)}/{len(pos)}", not miss, miss)
        T.check(f"crisi {l}: modi di dire scambiati per crisi 0/{len(neg)}", not fp, fp)
    print(f"TOTALE riconosciute {tot[0]}/{tot[1]}, modi di dire scambiati {tot[2]}/{tot[3]}")
    # livello gentile (parola di morte da sola)
    soft = json.loads(await T.ev(pg, "JSON.stringify([crisisLevel('ho paura di morire', 'it'), crisisLevel('my grandpa died', 'en'), crisisLevel('ich hasse mein leben', 'de'), crisisLevel('oggi bel giorno', 'it')])"))
    T.check("livello gentile: 'ho paura di morire' / 'my grandpa died' / 'ich hasse mein leben' = 1, frase normale = 0", soft == [1, 1, 1, 0], soft)
    # inglese in piu' in ogni lingua
    T.check("frase inglese di crisi riconosciuta anche con l'app in italiano", await T.ev(pg, "crisisLevel('I want to kill myself', 'it')") == 2)
    await ctx.close()
    # chat: risposta con i numeri, gentile, normale
    ctx, pg = await T.page(b, T.base_state("it"), age="adult", lang="it-IT", tz="Europe/Rome")
    r = json.loads(await T.ev(pg, "JSON.stringify([chatReply('mi voglio ammazzare'), chatReply('ho paura di morire'), chatReply('devo tagliarmi i capelli'), chatReply('ciao!')])"))
    T.check("chat it 'mi voglio ammazzare': risposta di crisi con i numeri", r[0].get("crisis") and any("19696" in x for x in r[0]["lines"]), r[0])
    T.check("chat it 'ho paura di morire': risposta gentile con i numeri", r[1].get("crisis") and r[1].get("soft") and r[1]["lines"], r[1])
    T.check("chat it 'devo tagliarmi i capelli': risposta normale", not r[2].get("crisis"), r[2])
    T.check("chat it 'ciao!': risposta normale", not r[3].get("crisis"), r[3])
    # diario
    await T.close_layer(pg)
    for txt, want in [("mi ammazzo", True), ("Oggi bel giorno, ho camminato", False)]:
        await T.ev(pg, "layer.innerHTML = ''; tab = 'diary'; render(); 1"); await pg.wait_for_timeout(500)
        has = await T.ev(pg, "!!document.getElementById('line')")
        if not has: T.check("diario aperto", False); break
        await pg.fill("#line", txt); await T.ev(pg, "document.getElementById('diaryForm').requestSubmit(); 1"); await pg.wait_for_timeout(1500)
        sos = await T.ev(pg, "document.querySelectorAll('.v26sos').length"); saved = await T.ev(pg, f"S.diary.some((d) => d.text === {json.dumps(txt)})")
        T.check(f"diario '{txt}': salvato comunque", saved)
        T.check(f"diario '{txt}': aiuto {'mostrato' if want else 'non mostrato'}", (sos > 0) == want, sos)
        if want:
            lines = await T.ev(pg, "(document.querySelector('.v26sos') || {}).textContent || ''")
            T.check("  diario: numeri dell'Italia (Telefono Azzurro 19696) e findahelpline", "19696" in lines and "findahelpline" in lines, lines[:200])
            T.check("  diario: pulsanti 'Parla con' e 'Chiudi'", await T.ev(pg, "!!document.getElementById('v26Talk') && !!document.getElementById('v26Close')"))
            await pg.click("#v26Talk"); await pg.wait_for_timeout(600)
            T.check("  'Parla con Germo' apre la chat", await T.ev(pg, "!!document.querySelector('.chatbox')"))
    # capsula
    await T.ev(pg, "layer.innerHTML = ''; tab = 'diary'; render(); 1"); await pg.wait_for_timeout(500)
    if await T.ev(pg, "!!document.getElementById('capsIn')"):
        await pg.fill("#capsIn", "voglio morire"); await T.ev(pg, "sealCapsule(); 1"); await pg.wait_for_timeout(2000)
        T.check("capsula 'voglio morire': aiuto mostrato", await T.ev(pg, "document.querySelectorAll('.v26sos').length") > 0)
    else: T.check("capsula: campo presente nel diario", False)
    T.check("nessun errore (chat, diario, capsula)", not pg.errs, pg.errs[:3])
    await ctx.close()
    # numeri per Paese
    cases = [("en", "en-GB", "Europe/Rome", ["19696", "112"]), ("en", "en-US", "America/Toronto", ["Kids Help Phone", "988"]), ("en", "en-AU", "Australia/Sydney", ["13 11 14", "Kids Helpline"]),
             ("es", "es-MX", "America/Mexico_City", ["800 911 2000"]), ("pt", "pt-PT", "Europe/Lisbon", ["SOS Criança"]), ("fr", "fr-CH", "Europe/Zurich", ["143", "147"]),
             ("de", "de-AT", "Europe/Vienna", ["142", "147"]), ("ja", "ja-JP", "Asia/Tokyo", ["0120-99-7777"]), ("es", "es-AR", "America/Argentina/Buenos_Aires", ["tu país", "findahelpline"])]
    for lang, loc, tz, want in cases:
        ctx, pg = await T.page(b, T.base_state(lang), age="adult", lang=loc, tz=tz, wait=2000)
        lines = await T.ev(pg, "L().helpLines.join(' | ')")
        T.check(f"numeri di aiuto {lang} {tz}: {', '.join(want)} + findahelpline", all(w in lines for w in want) and "findahelpline.com" in lines, lines)
        await ctx.close()

T.run(main)
