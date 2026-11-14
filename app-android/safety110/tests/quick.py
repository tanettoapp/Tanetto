# controllo veloce (senza browser) di tutti gli insiemi: crisis_sets + heldout1 + r2 del critico
import json, os, subprocess, sys, tempfile
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
from crisis_sets import AUD_T, AUD_FP, NEW_T, NEW_FP, NEG
def run(d):
    f = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False); json.dump(d, f, ensure_ascii=False); f.close()
    return json.loads(subprocess.run(["node", os.path.join(D, "crisis_node.js"), f.name], capture_output=True, text=True, check=True).stdout)
def show(name, d, ok):
    r = run(d); b = [(l, x, v) for l, xs in r.items() for x, v in xs if not ok(v)]; n = sum(len(v) for v in r.values())
    print(f"{name}: {n-len(b)}/{n}"); [print("   ", x) for x in b[:60]]; return len(b)
L = list(AUD_T)
bad = show("crisi", {l: AUD_T[l] + NEW_T[l] for l in L}, lambda v: v == 2)
bad += show("frasi normali", {l: AUD_FP[l] + NEW_FP[l] for l in L}, lambda v: v == 0)
bad += show("negate", NEG, lambda v: v == 1)
O = json.load(open(os.path.join(D, "orig_kw.json"))); drop = {"olmek ist", "artik yasamak", "artık yaşamak"}
bad += show("parole 1.0.9", {l: [x for x in O[l]["crisis"] if x not in drop] for l in O}, lambda v: v == 2)
bad += show("altre intenzioni", {l: O[l]["other"] for l in O}, lambda v: v == 0)
H = os.path.join(D, "heldout1")
bad += show("h1 pos", json.load(open(H + "/pos.json")), lambda v: v == 2)
bad += show("h1 neg", json.load(open(H + "/neg.json")), lambda v: v <= 1)
bad += show("h1 negd", json.load(open(H + "/negd.json")), lambda v: v == 1)
print("ERRORI", bad)
