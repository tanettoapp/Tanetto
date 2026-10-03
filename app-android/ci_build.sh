#!/usr/bin/env bash
# Costruisce l'APK di prova. In caso di errore scrive il motivo nel riepilogo della corsa.
set -uo pipefail
cd "$(dirname "$0")"
LOG="$PWD/ci.log"; : > "$LOG"
fail() {
  { echo "### Errore: $1"; echo '```'; grep -iE "error|what went wrong|failed|exception|ERR!" "$LOG" | head -40; echo '----'; tail -60 "$LOG"; echo '```'; } >> "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
  exit 1
}
run() { echo "== $*" | tee -a "$LOG"; "$@" >> "$LOG" 2>&1 || fail "$*"; }
run node --version
run npm ci --no-audit --no-fund
run python3 prep_www.py
run npx cap sync android
cd android && chmod +x gradlew
run ./gradlew assembleDebug --no-daemon --stacktrace
cd ..
run cp android/app/build/outputs/apk/debug/app-debug.apk tanetto-prova.apk
echo "### APK pronto: $(du -h tanetto-prova.apk | cut -f1)" >> "${GITHUB_STEP_SUMMARY:-/dev/stdout}"
