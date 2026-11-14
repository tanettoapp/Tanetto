# Numeri di aiuto per PAESE: fuso orario + lingua del telefono -> righe mostrate (chat, Profilo > Aiuto).
# Uso: PORT=9313 SITE=<sito> EXPECT=110|109 python3 -u t_help.py
import asyncio, json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tl
from playwright.async_api import async_playwright
EXPECT = os.environ.get("EXPECT", "110")
# (fuso, lingua del telefono, lingua dell'app, testi che devono esserci, testi che non devono esserci)
CASES = [
    ("Europe/Rome", "it-IT", "it", ["Telefono Amico Italia: 02 2327 2327", "Telefono Azzurro (per bambini e ragazzi): 19696", "Emergenze (Italia): 112", "Altri Paesi: findahelpline.com"], ["988", "Samaritans"]),
    ("Europe/Rome", "en-US", "en", ["Telefono Azzurro (for children and teens): 19696", "Emergencies (Italy): 112"], ["988"]),
    ("Europe/Berlin", "de-DE", "de", ["TelefonSeelsorge: 0800 111 0 111 · 0800 111 0 222 · 116 123", "Nummer gegen Kummer (für Kinder und Jugendliche): 116 111", "Notruf (Deutschland): 112"], []),
    ("Europe/Vienna", "de-AT", "de", ["TelefonSeelsorge: 142", "Rat auf Draht (für Kinder und Jugendliche): 147", "Notruf (Österreich): 112"], ["0800 111"]),
    ("Europe/Zurich", "fr-CH", "fr", ["La Main Tendue : 143", "Pro Juventute (pour les enfants et les ados) : 147", "Urgences (Suisse) : 112"], ["3114"]),
    ("Europe/Madrid", "es-ES", "es", ["Línea 024: 024", "Fundación ANAR (para niños y adolescentes): 900 20 20 10 · 116 111", "Emergencias (España): 112"], []),
    ("America/Mexico_City", "es-MX", "es", ["Línea de la Vida: 800 911 2000", "Emergencias (México): 911"], ["024"]),
    ("America/Argentina/Buenos_Aires", "es-AR", "es", ["Centro de Asistencia al Suicida: 135 · 0800 345 1435", "Emergencias (Argentina): 911"], []),
    ("America/Santiago", "es-CL", "es", ["Línea de prevención del suicidio: *4141", "Emergencias (Chile): 131"], []),
    ("America/Bogota", "es-CO", "es", ["Emergencias: el número de emergencias de tu país", "Otros países: findahelpline.com"], ["024", "911"]),
    ("Europe/Paris", "fr-FR", "fr", ["3114 : 3114", "Fil Santé Jeunes (pour les enfants et les ados) : 0 800 235 236", "Urgences (France) : 112"], []),
    ("Europe/Brussels", "nl-BE", "nl", ["Zelfmoordlijn 1813: 1813", "Awel (voor kinderen en jongeren): 102", "Noodnummer (België): 112"], ["113 Zelfmoord"]),
    ("Europe/Amsterdam", "nl-NL", "nl", ["113 Zelfmoordpreventie: 113", "De Kindertelefoon (voor kinderen en jongeren): 0800-0432", "Noodnummer (Nederland): 112"], ["1813"]),
    ("Europe/Lisbon", "pt-PT", "pt", ["Linha Nacional de Prevenção do Suicídio: 1411", "SOS Criança (para crianças e jovens): 116 111", "Emergência (Portugal): 112"], ["188"]),
    ("America/Sao_Paulo", "pt-BR", "pt", ["CVV, Centro de Valorização da Vida: 188", "Emergência (Brasil): 192"], ["1411"]),
    ("America/New_York", "en-US", "en", ["988 Lifeline: 988", "Emergencies (United States): 911"], ["Samaritans"]),
    ("America/Toronto", "fr-CA", "fr", ["9-8-8 : 988", "Jeunesse, J'écoute (pour les enfants et les ados) : 1-800-668-6868", "Urgences (Canada) : 911"], []),
    ("America/Toronto", "en-CA", "en", ["Kids Help Phone (for children and teens): 1-800-668-6868"], []),
    ("Europe/London", "en-GB", "en", ["Samaritans: 116 123", "Childline (for children and teens): 0800 1111", "Emergencies (United Kingdom): 999 · 112"], ["988"]),
    ("Europe/Dublin", "en-IE", "en", ["Childline (for children and teens): 1800 66 66 66", "Emergencies (Ireland): 112 · 999"], []),
    ("Australia/Sydney", "en-AU", "en", ["Lifeline: 13 11 14", "Kids Helpline (for children and teens): 1800 55 1800", "Emergencies (Australia): 000"], []),
    ("Pacific/Auckland", "en-NZ", "en", ["Need to talk? 1737: 1737", "Youthline (for children and teens): 0800 376 633", "Emergencies (New Zealand): 111"], []),
    ("Asia/Kolkata", "en-IN", "en", ["Tele-MANAS: 14416", "Emergencies (India): 112"], []),
    ("Asia/Tokyo", "ja-JP", "ja", ["よりそいホットライン: 0120-279-338", "24時間子供SOSダイヤル: 0120-0-78310", "緊急 (日本): 119 · 110"], []),
    ("Asia/Tokyo", "en-US", "en", ["Yorisoi Hotline: 0120-279-338", "Emergencies (Japan): 119 · 110"], ["よりそい"]),
    ("Asia/Seoul", "ko-KR", "ko", ["자살예방상담전화: 109", "청소년상담: 1388", "긴급 (대한민국): 119 · 112"], []),
    ("Asia/Shanghai", "zh-CN", "zh", ["心理援助热线: 12356", "紧急 (中国): 120 · 110"], []),
    ("Asia/Taipei", "zh-TW", "zht", ["安心專線: 1925", "生命線: 1995", "緊急 (台灣): 119 · 110"], ["12356"]),
    ("Asia/Hong_Kong", "zh-HK", "zht", ["精神健康支援熱線: 18111", "香港撒瑪利亞防止自殺會: 2389 2222", "撒瑪利亞會: 2896 0000", "緊急 (香港): 999"], []),
    ("Europe/Moscow", "ru-RU", "ru", ["Телефон доверия (для детей и подростков): 8-800-2000-122", "Экстренные службы (Россия): 112"], []),
    ("Europe/Warsaw", "pl-PL", "pl", ["Centrum Wsparcia: 800 70 2222", "Telefon zaufania (dla dzieci i młodzieży): 116 111", "Numer alarmowy (Polska): 112"], []),
    ("Europe/Istanbul", "tr-TR", "tr", ["Acil (Türkiye): 112", "ALO 183 Sosyal Destek Hattı: 183"], []),
    ("Europe/Stockholm", "en-SE", "en", ["Emergencies (Sweden): 112", "Other countries: findahelpline.com"], ["988", "Samaritans"]),
    ("Asia/Dubai", "en-AE", "en", ["Emergencies: your local emergency number"], ["911", "112", "988"]),
    ("UTC", "it-IT", "it", ["Telefono Azzurro (per bambini e ragazzi): 19696"], []),
    ("UTC", "en", "en", ["988 Lifeline: 988", "Samaritans: 116 123"], []),
]
async def main():
    bad = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for tz, loc, lang, must, mustnot in CASES:
            ctx = await b.new_context(viewport={"width": 412, "height": 915}, locale=loc, timezone_id=tz)
            pg = await ctx.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
            st = tl.base_state(lang); st["age"] = {"y": 1990, "m": 3, "at": "2026-11-01"}
            js = "window.__TEST_NOGIFT20 = 1;" + tl.common.MOCK + ";sessionStorage.setItem('splash','1');" + f"localStorage.setItem('tanetto-prova-v3',{json.dumps(json.dumps(st))});localStorage.setItem('tanetto-account',{json.dumps(json.dumps({'gateDone': True}))});"
            await pg.add_init_script("window.__TEST_NOAGE=1;" + js); await pg.goto(tl.common.URL); await pg.wait_for_timeout(2500)
            r = {"lines": [x.replace("\u00a0", " ").replace("\u2060", "") for x in await pg.evaluate("()=>window.__v10.ev(\"L().helpLines\")")]}
            lines = r["lines"]; txt = "\n".join(lines)
            ok = all(m in lines for m in must) and not any(n in txt for n in mustnot) and not errs
            print(("ok " if ok else "NO ") + f"{tz} {loc} {lang}: " + " | ".join(lines))
            if not ok: bad.append((tz, loc, [m for m in must if m not in lines], [n for n in mustnot if n in txt], errs[:2]))
            await ctx.close()
        await b.close()
    for x in bad: print("NO", x)
    print("TUTTO OK" if not bad else f"CI SONO ERRORI ({len(bad)})")
if __name__ == "__main__": asyncio.run(main())
