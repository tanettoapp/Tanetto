#!/bin/bash
# 1.0.10 (M-48): prepara una copia di lavoro delle suite di prova storiche (1.0.8/1.0.9) in /dev/shm/t110,
# con percorsi e porte propri (896x), cosi' non scrive mai nelle cartelle di riferimento e non usa porte di altre sessioni.
# La sorgente delle suite storiche e' la copia gia' adattata a tanetto-wip110 (scratchpad/w110/T).
set -e
REPO=$(cd "$(dirname "$0")/.." && pwd)
SRC=${LEGACY_SRC:-/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/w110/T}
DST=${LEGACY_DST:-/dev/shm/t110}
OLD=/tmp/claude-0/-home-claude/98d65832-ceaf-57c7-bffe-ab6ef32f731b/scratchpad/w110/T
mkdir -p "$DST"
rm -rf "$DST"; mkdir -p "$DST"
(cd "$SRC" && tar cf - --exclude='shots*' --exclude='*.jpg' --exclude='*.png' --exclude='logs5' --exclude='__pycache__' --exclude='www' --exclude='*.mp4' .) | (cd "$DST" && tar xf -)
# percorsi e porte
grep -rlE "$OLD|88(70|71|72|61|42|43|41|30)|8765|8791|8795" "$DST" --include=*.py --include=*.sh --include=*.js 2>/dev/null | while read f; do
  sed -i -E "s#$OLD#$DST#g; s/\b8870\b/8960/g; s/\b8871\b/8961/g; s/\b8872\b/8962/g; s/\b8861\b/8963/g; s/\b8842\b/8964/g; s/\b8843\b/8965/g; s/\b8841\b/8966/g; s/\b8830\b/8967/g; s/\b8765\b/8968/g; s/\b8791\b/8969/g; s/\b8795\b/8970/g" "$f"
done
# le prove "statiche" leggono i sorgenti di questo repository (non app-prova/src)
grep -rl "/home/claude/app-prova/src\|cd /home/claude/app-prova && node check_lang.js" "$DST" --include=*.py --include=*.sh --include=*.js | while read f; do
  sed -i "s#cd /home/claude/app-prova \&\& node check_lang.js#cd $REPO \&\& node tools/check_lang.js#g; s#/home/claude/app-prova/src#$REPO/src#g" "$f"; done
for d in "$DST"/fix109/t38run*; do [ -d "$d/src" ] && { rm -rf "$d/src"; ln -s "$REPO/src" "$d/src"; }; done
mkdir -p "$DST/fix109/logs5"
# sito costruito da questo repository: una copia fissa (le build fatte durante le prove non cambiano il sito servito)
# - $DST/site: identica al sito (con la CSP), servita alle prove t38_* (regr5.sh)
# - $DST/fix109/www: senza la riga della CSP (le suite iniettano axe e script di prova), come le copie di prova della 1.0.9
for W in "$DST/site" "$DST/fix109/www"; do
  rm -rf "$W"; mkdir -p "$W"
  for f in index.html sw.js manifest.webmanifest fb.js gsap.min.js caveat-700.woff2 fonts.css privacy.html elimina-account.html; do cp "$REPO/$f" "$W/"; done
  cp -r "$REPO/img" "$REPO/fonts" "$W/"
done
sed -i '/http-equiv="Content-Security-Policy"/d' "$DST/fix109/www/index.html"
sed -i "s#-d \${SITE:-/home/claude/tanetto-wip110}#-d \${SITE:-$DST/site}#" "$DST/fix109/regr5.sh"
echo "legacy pronte in $DST"
