#!/bin/bash
# 1.0.10 (M-48): un solo comando. build -> suite storiche + suite 1.0.10 -> riassunto.
# Uso: tests/run.sh TAG [suite...]   (senza suite: tutte). Un solo Chromium alla volta.
REPO=$(cd "$(dirname "$0")/.." && pwd); TAG=${1:-R}; shift
python3 "$REPO/tools/build.py" >/dev/null || { echo "BUILD FALLITA"; exit 1; }
bash "$REPO/tests/setup_legacy.sh" >/dev/null || exit 1
L=/dev/shm/t110/fix109/logs5; mkdir -p $L
SUITES=${@:-"t110 legacy"}
: > $L/sum110_$TAG.log
for s in $SUITES; do
  case $s in
    t110) for t in "$REPO"/tests/t110/t_*.py; do n=$(basename $t .py); echo "=== $n" >> $L/sum110_$TAG.log
            (cd "$REPO/tests/t110" && timeout 2400 python3 -u $t > $L/${TAG}_$n.txt 2>&1); grep -E "^NO |TUTTO OK|CI SONO|Traceback|Error" $L/${TAG}_$n.txt | head -30 >> $L/sum110_$TAG.log; done;;
    t_*) n=$s; echo "=== $n" >> $L/sum110_$TAG.log; (cd "$REPO/tests/t110" && timeout 2400 python3 -u $n.py > $L/${TAG}_$n.txt 2>&1); grep -E "^NO |TUTTO OK|CI SONO|Traceback|Error" $L/${TAG}_$n.txt | head -30 >> $L/sum110_$TAG.log;;
    legacy) bash /dev/shm/t110/fix109/runall5.sh $TAG; cat $L/sum_$TAG.log >> $L/sum110_$TAG.log;;
    *) bash /dev/shm/t110/fix109/runall5.sh $TAG $s; cat $L/sum_$TAG.log >> $L/sum110_$TAG.log;;
  esac
done
echo "ALL-DONE" >> $L/sum110_$TAG.log; cat $L/sum110_$TAG.log
