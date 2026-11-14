"""1.0.11: aggiorna le attese delle suite storiche (copia in /dev/shm/t110) dove la 1.0.11 cambia apposta il comportamento.
Ogni voce: file, testo vecchio, testo nuovo, motivo (decisione o correzione dell'audit). Se il testo vecchio non c'e' piu',
la voce viene segnalata (non si ignora in silenzio)."""
import os, sys
DST = sys.argv[1] if len(sys.argv) > 1 else "/dev/shm/t110"
P = [
    ("fix109/tfix_a.py", '''check("Android: versionCode 110 e versionName 1.0.10 (1.0.10)", "versionCode 110" in g and 'versionName "1.0.10"' in g)''',
     '''check("Android: versionCode 111 e versionName 1.0.11 (la 1.0.10 e' l'aggiornamento di sola sicurezza)", "versionCode 111" in g and 'versionName "1.0.11"' in g)''',
     "numerazione decisa dal coordinatore"),
]
bad = 0
for f, old, new, why in P:
    p = os.path.join(DST, f)
    if not os.path.exists(p): print("MANCA", f); bad += 1; continue
    s = open(p, encoding="utf-8").read()
    if old not in s: print("NON TROVATO", f, old[:60]); bad += 1; continue
    open(p, "w", encoding="utf-8").write(s.replace(old, new)); print("ok", f, "-", why)
sys.exit(1 if bad else 0)
