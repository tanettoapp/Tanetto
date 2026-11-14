# Insiemi scritti dal critico indipendente (giro 1), MAI usati per scrivere gli elenchi prima del giro 1:
# pos = crisi in prima persona (attese 2), neg = frasi normali (nessun 2; al massimo il controllo gentile per imbarazzo),
# negd = frasi negate o di paura (attese 1). Senza browser (crisis_node.js). Uso: python3 t_heldout.py [cartella]
import json, os, subprocess, sys
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "heldout1")
H = os.path.join(os.path.dirname(os.path.abspath(__file__)), "crisis_node.js"); bad = []
def run(f): return json.loads(subprocess.run(["node", H, os.path.join(D, f)], capture_output=True, text=True, check=True).stdout)
for f, ok in (("pos.json", lambda v: v == 2), ("neg.json", lambda v: v <= 1), ("negd.json", lambda v: v == 1)):
    r = run(f); n = sum(len(v) for v in r.values()); b = [(l, x, v) for l, xs in r.items() for x, v in xs if not ok(v)]
    z = sum(1 for l, xs in r.items() for x, v in xs if v == 0)
    print(f"{f}: {n - len(b)}/{n} come atteso" + (f" (livello 0: {z})" if f == "neg.json" else "")); bad += b
    for x in b: print("   NO", x)
# giro 2 del critico: pos2/reg/core = crisi (attese 2), neg2 = frasi normali (al massimo 1 per "documentario sulla prevenzione"),
# mix = frasi miste: nessuna crisi vera deve restare senza risposta (controllo a mano nel rapporto; qui: nessun errore di esecuzione)
D2 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "heldout2")
if os.path.isdir(D2):
    D = D2
    for f, ok in (("pos2.json", lambda v: v == 2), ("reg.json", lambda v: v == 2), ("core.json", lambda v: v == 2), ("neg2.json", lambda v: v <= 1)):
        r = run(f); n = sum(len(v) for v in r.values()); b = [(l, x, v) for l, xs in r.items() for x, v in xs if not ok(v)]
        print(f"{f}: {n - len(b)}/{n} come atteso"); bad += b
        for x in b: print("   NO", x)
print("TUTTO OK" if not bad else f"CI SONO ERRORI ({len(bad)})")
