# Frasi di prova per il riconoscimento dei momenti difficili (1.0.10 sicurezza).
# AUD_T / AUD_FP = insieme dell'audit (GAPS3 lists.py: 228 frasi in prima persona + 77 modi di dire).
# NEW_T = frasi nuove scritte per questo lavoro (prima persona, colloquiali, maiuscole, senza accenti, errori).
# NEW_FP = frasi normali di tutti i giorni che NON devono far scattare niente (ne' forte ne' lieve).
# NEG = frasi negate / di paura ("non voglio morire"): attese = controllo gentile (livello 1), mai forte.
import sys
sys.path.insert(0, "/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/audit110/areas/GAPS3")
from lists import T as AUD_T, FP as AUD_FP
NEW_T = {
"it": ["VOGLIO MORIRE", "voglio morireee", "non ce la faccio piu, voglio morire", "mi voglio togliere la vita", "stasera mi ammazzo", "penso di farla finita", "sarebbe meglio se morissi", "nessuno sentirebbe la mia mancanza", "mi taglio con la lametta", "non voglio piu vivere davvero", "vorrei morire", "mi faccio del male di nascosto"],
"en": ["I REALLY WANT TO DIE", "i'm going to kill myself tonight", "i want to kill myself lol", "nobody would care if i died", "i dont see the point in living", "im thinking about ending it all", "life isnt worth living", "i hate myself and want to die", "i want to sleep and never wake up", "i wanna kill myself", "i dont want to be here anymore", "i've been cutting myself"],
"de": ["ich will mich umbringen", "ich will nicht mehr leben", "am liebsten wär ich tot", "ich hab keinen bock mehr zu leben", "ich ritz mich", "ich möchte nicht mehr leben", "ich will sterben", "ICH WILL STERBEN", "ich bring mich um", "ich will mir was antun", "keiner würde mich vermissen", "ich will einfach nicht mehr aufwachen"],
"es": ["me quiero morir ya", "ya no aguanto mas vivir", "quiero quitarme la vida", "me voy a suicidar", "no quiero estar vivo", "pienso en matarme", "nadie me echaria de menos", "me corto los brazos", "QUIERO MORIR", "ya no quiero vivir mas", "quiero morirme ya", "me hago daño a proposito"],
"fr": ["j'ai envie de mourir", "je veux me tuer", "je veux plus vivre", "jai plus envie de vivre", "je pense au suicide", "personne ne me regretterait", "je me scarifie", "je veux en finir", "JE VEUX MOURIR", "je veux mourir sérieux", "je me fais du mal exprès", "je voudrais ne plus me réveiller"],
"pt": ["quero morrer", "eu quero me matar", "nao aguento mais viver", "vou me matar hoje", "queria estar morto", "penso em suicidio", "ninguem sentiria minha falta", "eu me corto", "to pensando em me matar", "QUERO MORRER", "nao quero mais estar vivo", "queria dormir e nao acordar mais"],
"ru": ["я хочу умереть", "не хочу больше жить", "я покончу с собой", "хочу сдохнуть", "мне незачем жить", "я режу себя", "лучше бы я умерла", "хочу уйти из жизни", "никому я не нужна, хочу умереть", "ХОЧУ УМЕРЕТЬ", "я хочу убить себя", "не хочу просыпаться"],
"pl": ["chce umrzec", "nie chce juz zyc", "zabije sie", "mysle o samobojstwie", "mam dosc zycia", "tne sie", "chcialabym zniknac na zawsze", "nikt by nie zauwazyl gdybym umarla", "CHCE UMRZEC", "chcę się zabić", "nie chcę już żyć", "zrobię sobie krzywdę"],
"nl": ["ik wil dood", "ik wil niet meer leven", "ik denk aan zelfmoord", "ik wil er niet meer zijn", "ik snij mezelf", "ik ben het leven zat", "ik wil gewoon sterven", "niemand zou me missen", "IK WIL DOOD", "ik wil mezelf iets aandoen", "ik wil niet meer wakker worden", "ik wil een eind aan mijn leven maken"],
"tr": ["olmek istiyorum", "kendimi oldurecegim", "yasamak istemiyorum", "intihar etmek istiyorum", "kendime zarar veriyorum", "keske olsem", "artik dayanamiyorum olmek istiyorum", "hayatima son vermek istiyorum", "ÖLMEK İSTİYORUM", "kendimi öldürmek istiyorum", "yaşamak istemiyorum artık", "kimse beni özlemez"],
"ja": ["死にたい", "もう死にたい", "消えたい", "自殺したい", "生きてる意味ない", "リスカした", "いなくなりたい", "死んだほうがまし", "しにたい…", "生きていたくない", "自分を傷つけたい", "もう消えてしまいたい"],
"ko": ["죽고 싶어", "그냥 죽고싶다", "자살하고 싶어", "살기 싫어", "사라지고 싶어", "자해했어", "더 이상 살고 싶지 않아", "죽어버리고 싶어", "나 죽고싶어ㅠㅠ", "자살할래", "살아야 할 이유가 없어", "손목 그었어"],
"zh": ["我想死", "我不想活了", "我想自杀", "活着没意思", "我想结束生命", "我割腕了", "我想消失", "活不下去了", "真的好想死", "我想伤害自己", "我想去死", "没有活下去的理由"],
"zht": ["我想死", "我不想活了", "我想自殺", "活著沒意思", "我想結束生命", "我割腕了", "我想消失", "活不下去了", "真的好想死", "我想傷害自己", "我想去死", "沒有活下去的理由"],
}
NEW_FP = {
"it": ["oggi sono stanco morto", "ho una fame da morire", "muoio dalla voglia di vederti", "mi sono tagliato il dito con la carta", "devo tagliare le unghie", "sto morendo di caldo", "la mia pianta e morta", "ho ucciso il boss del gioco", "ammazza che bello!", "domani ho la verifica, che ansia", "ho finito i compiti, finalmente", "il nonno e morto l'anno scorso", "voglio vivere al mare", "non voglio andare a scuola", "oggi mi sento triste", "mi taglio i capelli corti", "che vergogna, vorrei sparire", "questa canzone mi uccide, bellissima"],
"en": ["this game is killing me", "i'm dead tired", "i could die for some chocolate", "my plant died", "i killed it at the talent show", "i hurt my knee", "i cut my finger while cooking", "i want to dye my hair blue", "i'm dying of boredom", "i can't go on the trip tomorrow", "i don't want to go to school", "that joke killed me lol", "i want to end this level", "i feel sad today", "my battery is about to die", "i'm so tired", "the character died in the game", "i'm dying to see you"],
"de": ["ich lach mich tot", "ich bin todmüde", "ich sterbe vor hunger", "mein handy stirbt gleich", "ich will nicht mehr spielen", "das bringt mich noch um vor lachen", "ich hab mir in den finger geschnitten", "ich will nicht mehr warten", "die hausaufgaben bringen mich um", "ich möchte heute nicht mehr lernen", "ich bin traurig", "mein opa ist gestorben"],
"es": ["me muero de risa", "me muero de hambre", "me corto el pelo mañana", "estoy muerta de cansancio", "me mata de risa", "no quiero seguir jugando", "me voy a matar estudiando", "quiero acabar con todo esto de los deberes", "me muero por verte", "mi pez se murio", "hoy estoy triste", "estoy cansado"],
"fr": ["je meurs de faim", "mort de rire", "ça va me tuer ce devoir", "je vais me couper les cheveux", "je veux en finir avec mes devoirs", "je meurs d'envie de jouer", "mon téléphone est mort", "je suis mort de fatigue", "j'ai tué le boss", "je suis triste aujourd'hui", "j'ai mal à la tête", "mon chat est mort hier"],
"pt": ["morrendo de rir", "to morrendo de fome", "vou cortar o cabelo", "quero acabar com tudo isso de lição hoje", "morro de saudade", "vou me matar de estudar", "meu celular morreu", "eu me corto quando faço a barba", "estou morta de cansaço", "o jogo me matou de rir", "hoje estou triste", "estou cansado"],
"ru": ["умираю от смеха", "убить время", "я умираю от голода", "смешно до смерти", "можно умереть от смеха", "я устал как собака", "телефон сел", "убил босса в игре", "я не хочу в школу", "мне скучно", "мне грустно", "я очень устала"],
"pl": ["umieram ze smiechu", "umieram z glodu", "zabije sie ze smiechu", "moge umrzec ze smiechu", "jestem padniety", "zabilem bossa w grze", "nie chce isc do szkoly", "telefon mi padl", "mam dosc tej pogody", "chce zniknac pod kocem", "jest mi smutno", "jestem zmeczona"],
"nl": ["ik ga dood van het lachen", "ik ben doodmoe", "ik ga brood snijden", "ik wil niet meer wachten", "ik wil niet meer spelen", "mijn telefoon is dood", "ik heb geen zin in school", "de plant is doodgegaan", "ik wil een pompoen kerven", "ik ben verdrietig", "ik ben moe", "ik heb honger"],
"tr": ["gulmekten oldum", "acliktan oluyorum", "keske orada olsem", "keşke tatilde olsam", "jilet gibi keskin", "su istiyom", "dondurma istiyom", "oyunda öldüm", "çok yoruldum", "bugün üzgünüm", "okula gitmek istemiyorum", "artık yaşamak güzel"],
"ja": ["笑い死ぬ", "死ぬほどおいしい", "お腹すいて死にそう", "今日は疲れた", "ゲームで死んだ", "宿題が終わらない", "階段から飛び降りた", "今日はこれで終わりにしたい", "悲しい", "眠い"],
"ko": ["웃겨 죽겠어", "배고파 죽겠어", "그냥 죽 먹을래", "목 매일 아파", "게임에서 죽었어", "숙제 너무 많아", "더워 죽겠다", "피곤해", "슬퍼", "졸려"],
"zh": ["笑死我了", "饿死了", "想死你了", "热死了", "累死了", "游戏里我死了", "今天好累", "作业太多了", "我很难过", "好困"],
"zht": ["笑死我了", "餓死了", "想死你了", "熱死了", "累死了", "遊戲裡我死了", "今天好累", "作業太多了", "我很難過", "好睏"],
}
NEG = {
"it": ["non voglio morire", "ho paura di morire"], "en": ["i don't want to die", "i'm scared to die"], "de": ["ich will nicht sterben", "ich habe angst zu sterben"],
"es": ["no quiero morir", "tengo miedo a morir"], "fr": ["je veux pas mourir", "j'ai peur de mourir"], "pt": ["não quero morrer", "tenho medo de morrer"],
"ru": ["я не хочу умирать", "боюсь умереть"], "pl": ["nie chcę umrzeć", "boję się umrzeć"], "nl": ["ik wil niet dood", "ik ben bang om dood te gaan"],
"tr": ["ölmek istemiyorum", "ölmekten korkuyorum"], "ja": ["死にたくない"], "ko": ["죽고 싶지 않아", "죽기 싫어"], "zh": ["我不想死"], "zht": ["我不想死"],
}
