# STATO 1.0.10 (per riprendere il lavoro)

Ultimo aggiornamento: 14/11/2026 ~03:00

Come si lavora: sorgenti in src/, `python3 tools/build.py` (scrive index.html ecc. nella radice), prove `tests/run.sh TAG [suite]`
(suite storiche copiate in /dev/shm/t110 con porte 8960-8970; prove nuove in tests/t110/t_*.py, porta 8981).
Disco quasi pieno (~230 MB liberi, cancellare non e' permesso): file pesanti temporanei SOLO in /dev/shm.

Fatto:
- Blocco 0: src/ copiata da app-prova/src (1.0.9 + parte 1), tools/build.py = build.py+site.py (verificato identico byte per byte:
  index.html, sw.js, manifest, privacy.html, elimina-account.html), tests/run.sh + setup_legacy.sh.

In corso / prossimo: blocco 1 (bambini e P0). Vedi PLAN_110.md.
