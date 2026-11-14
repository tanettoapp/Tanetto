# Tanetto 1.0.10 (110) "solo sicurezza": costruisce l'app dal sorgente ESATTO della 1.0.9 + i file di questa cartella.
# Uso: python3 build_safety.py            (scrive ../../index.html, ../../sw.js e poi ../www con prep_www.py)
# 1) sorgente 1.0.9: /home/claude/app-prova/backup_src_1.0.9.tgz (sha256 sotto), estratto in una cartella di lavoro;
# 2) si aggiungono i file layers/*.js (ultimo strato, prima di 99_start.js);
# 3) build_core.py (= build.py della 1.0.9, che ricostruisce byte per byte lo script della 1.0.9) produce tanetto.html;
# 4) nella pagina della 1.0.9 (git 46e9bfd:index.html) si sostituiscono SOLO lo script e lo stile in linea; tutto il
#    resto della pagina deve restare identico (controllato); impronta CSP e nome della cache di sw.js aggiornati.
import hashlib, base64, json, os, re, shutil, subprocess, sys, tarfile
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
TGZ = os.environ.get("SRC109", "/home/claude/app-prova/backup_src_1.0.9.tgz")
TGZ_SHA = "746981344c0c03116413e0b582a615cfc9b9e3e165d4275b85b1f97251049e46"
WORK = os.environ.get("SAFETY_WORK", "/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/safety110/b110")
BASE = "46e9bfd"
assert hashlib.sha256(open(TGZ, "rb").read()).hexdigest() == TGZ_SHA, "il sorgente 1.0.9 non e' quello atteso"
shutil.rmtree(WORK, ignore_errors=True); os.makedirs(WORK)
with tarfile.open(TGZ) as tf: tf.extractall(WORK, filter="data")
src = os.path.join(WORK, "src"); layers = sorted(f for f in os.listdir(os.path.join(HERE, "layers")) if f.endswith(".js"))
for f in layers:
    assert f > "98zj_v25_fix.js" and f < "99_start.js", f"{f}: deve stare tra 98zj_v25_fix.js e 99_start.js"
    assert not os.path.exists(os.path.join(src, f)), f
    shutil.copy(os.path.join(HERE, "layers", f), src)
shutil.copy(os.path.join(HERE, "build_core.py"), os.path.join(WORK, "build.py"))
subprocess.run([sys.executable, "build.py"], cwd=WORK, check=True, stdout=subprocess.DEVNULL)
new = open(os.path.join(WORK, "tanetto.html"), encoding="utf-8").read()
old = subprocess.run(["git", "show", f"{BASE}:index.html"], cwd=REPO, check=True, capture_output=True).stdout.decode("utf-8")
SCR = re.compile(r"<script>([\s\S]*?)</script>"); STY = re.compile(r"<style>\n([\s\S]*?)</style>")
ns, os_ = SCR.findall(new), SCR.findall(old); assert len(ns) == 1 and len(os_) == 1
nst = [m for m in STY.findall(new)]; ost = [m for m in STY.findall(old)]; assert len(nst) == 1 and len(ost) == 1, (len(nst), len(ost))
page = old.replace(os_[0], ns[0], 1).replace(ost[0], nst[0], 1)
# il resto della pagina (head, corpo, CSP a parte l'impronta) resta quello della 1.0.9
strip = lambda h: re.sub(r"'sha256-[A-Za-z0-9+/=]+'", "'sha256-X'", SCR.sub("<script>S</script>", STY.sub("<style>\nC</style>", h)))
assert strip(page) == strip(old), "la pagina e' cambiata fuori da script/stile"
# il corpo html della build nuova e' identico a quello della 1.0.9 (nessuna modifica visiva al markup di partenza)
body = lambda h: h[h.index("</style>"):h.index("<script>\n(function")]
assert body(new) in old, "corpo html diverso dalla 1.0.9"
oh = base64.b64encode(hashlib.sha256(os_[0].encode("utf-8")).digest()).decode()
nh = base64.b64encode(hashlib.sha256(ns[0].encode("utf-8")).digest()).decode()
assert page.count(f"'sha256-{oh}'") == 1, "impronta CSP della 1.0.9 non trovata"
page = page.replace(f"'sha256-{oh}'", f"'sha256-{nh}'")
# sw.js: stesso calcolo di site.py della 1.0.9 (verificato: con la pagina della 1.0.9 da' il nome di cache della 1.0.9)
man = json.loads(subprocess.run(["git", "show", f"{BASE}:manifest.webmanifest"], cwd=REPO, check=True, capture_output=True).stdout)
sw_old = subprocess.run(["git", "show", f"{BASE}:sw.js"], cwd=REPO, check=True, capture_output=True).stdout.decode()
def shh(p):
    h = hashlib.sha1(); h.update(p.encode("utf-8")); h.update(json.dumps(man, ensure_ascii=False).encode("utf-8"))
    for f in ("fb.js", "gsap.min.js", "caveat-700.woff2"):
        h.update(subprocess.run(["git", "show", f"{BASE}:{f}"], cwd=REPO, check=True, capture_output=True).stdout)
    return h.hexdigest()[:8]
m = re.search(r'const C = "tanetto-v27-([0-9a-f]+)-([0-9a-f]{8})";', sw_old); assert m and m.group(2) == shh(old), "calcolo della cache sw.js diverso dalla 1.0.9"
sw_new = sw_old.replace(m.group(0), f'const C = "tanetto-v27-{m.group(1)}-{shh(page)}";')
open(os.path.join(REPO, "index.html"), "w", encoding="utf-8").write(page)
open(os.path.join(REPO, "sw.js"), "w").write(sw_new)
subprocess.run([sys.executable, "prep_www.py"], cwd=os.path.join(REPO, "app-android"), check=True)
print("ok: strati", layers, "pagina", len(page), "byte; cache", re.search(r"tanetto-v27-[0-9a-f-]+", sw_new).group(0))
