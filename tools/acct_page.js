// Crea la pagina web pubblica per eliminare l'account (richiesta da Google Play), nelle 14 lingue dell'app.
const fs = require("fs");
const files = fs.readdirSync("src").filter((f) => /^(29_t|3.*)\.js$/.test(f)).sort();
global.window = {};
const p = "/tmp/claude-0/acctpage_" + process.pid + ".js";
fs.writeFileSync(p, files.map((f) => fs.readFileSync("src/" + f, "utf8")).join("\n") + "\nmodule.exports = T;");
const T = require(p); fs.unlinkSync(p);
const S = {};
for (const l of Object.keys(T)) {
  const a = T[l].acct;
  S[l] = { lang: T[l].lang, locale: T[l].locale, t: a.webT, p: a.webP, google: a.google, email: a.email, or: a.or, emailL: a.emailL, pwL: a.pwL, signIn: a.tabIn,
    forgot: a.forgot, resetSent: a.resetSent("{e}"), as: a.as("{e}"), delYes: a.delYes, delDone: a.delDone, cancel: a.cancel, back: a.webBack, wait: a.wait,
    out: a.out, err: a.err, privB: T[l].privB, show: a.show, hide: a.hide, no: a.webNo || "" };
}
const cfg = fs.readFileSync("src/97n_account.js", "utf8").match(/const FB_CFG = (\{[^;]*\});/)[1];
/* fix 1.0.9 (verifica privacy m4): chi non riesce ad accedere scrive all'e-mail di Tanetto (la stessa dell'informativa) */
const EMAIL = (fs.readFileSync("src/90_v5.js", "utf8").match(/OWNER_EMAIL = "([^"]*)"/) || [])[1] || "";
if (!EMAIL || Object.keys(S).some((l) => !S[l].no.includes("{email}"))) throw new Error("manca l'e-mail o il testo per chi non riesce ad accedere");
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Tanetto — delete your account</title>
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<style>
:root { --bg: #F4EFE6; --paper: #FFFBF4; --paper-2: #EFE7DA; --ink: #2F2A26; --muted: #6E655D; --line: #E2D7C6; --accent: #4E8A4A; --red: #B3261E; }
@media (prefers-color-scheme: dark) { :root { --bg: #1A1714; --paper: #25211C; --paper-2: #2F2A24; --ink: #F1EBE2; --muted: #B5AA9D; --line: #3A342D; --accent: #93CC8B; --red: #F2B8B5; } }
body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width: 440px; margin: 0 auto; padding: 18px 16px 40px; box-sizing: border-box; display: flex; flex-direction: column; gap: 14px; }
.top { display: flex; align-items: center; gap: 8px; } .brand { font-weight: 700; font-size: 20px; color: var(--accent); } .sp { flex: 1; }
select { border: 2px solid var(--line); background: var(--paper); color: var(--ink); border-radius: 12px; padding: 8px 10px; font: inherit; }
.card { background: var(--paper); border-radius: 20px; padding: 18px 16px; box-shadow: 0 6px 18px -10px rgba(80,60,30,.35); display: flex; flex-direction: column; gap: 12px; }
h1 { font-size: 24px; line-height: 1.2; margin: 0; text-align: center; } p { margin: 0; } .muted { color: var(--muted); } .small { font-size: 14px; }
button, .btn { font: inherit; font-weight: 700; border-radius: 999px; min-height: 48px; padding: 10px 18px; border: 0; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; box-sizing: border-box; width: 100%; }
.pri { background: var(--accent); color: #fff; } .ghost { background: transparent; color: var(--accent); box-shadow: inset 0 0 0 2px var(--accent); }
.g { background: #fff; color: #1F1F1F; box-shadow: inset 0 0 0 1.5px #747775; } .g svg { width: 20px; height: 20px; }
.danger { background: var(--red); color: #fff; } @media (prefers-color-scheme: dark) { .danger { color: #3a0d0a; } .pri { color: #16210F; } }
.link { background: none; color: var(--accent); min-height: 40px; width: auto; align-self: center; padding: 4px 8px; }
label { font-weight: 600; font-size: 14px; } input { border: 2px solid var(--line); background: var(--paper); color: var(--ink); border-radius: 14px; padding: 11px 14px; min-height: 48px; font: inherit; width: 100%; box-sizing: border-box; }
input:focus { border-color: var(--accent); outline: none; } .f { display: flex; flex-direction: column; gap: 6px; }
.or { display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 14px; } .or::before, .or::after { content: ""; flex: 1; height: 1px; background: var(--line); }
.err { color: var(--red); font-weight: 600; font-size: 14px; text-align: center; } .err:empty { display: none; } .err.ok { color: var(--accent); }
#no a { color: var(--accent); font-weight: 700; overflow-wrap: anywhere; } #no { text-align: center; }
[hidden] { display: none !important; } button[disabled] { opacity: .6; cursor: default; } .who { overflow-wrap: anywhere; text-align: center; }
</style>
</head>
<body>
<main>
  <div class="top"><span class="brand">Tanetto</span><span class="sp"></span><select id="lang" aria-label="Language"></select></div>
  <div class="card">
    <h1 id="t"></h1><p class="muted small" id="p"></p>
    <div id="signin">
      <div style="display:flex;flex-direction:column;gap:12px">
        <button class="g" id="google"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg><span id="googleL"></span></button>
        <div class="or"><span id="orL"></span></div>
        <form id="form" novalidate style="display:flex;flex-direction:column;gap:12px">
          <div class="f"><label for="em" id="emL"></label><input id="em" type="email" autocomplete="email" autocapitalize="off" spellcheck="false"></div>
          <div class="f"><label for="pw" id="pwL"></label><input id="pw" type="password" autocomplete="current-password"></div>
          <button class="pri" type="submit" id="go"></button>
          <button class="link" type="button" id="forgot"></button>
        </form>
      </div>
    </div>
    <div id="signed" hidden style="display:flex;flex-direction:column;gap:12px">
      <p class="who" id="who"></p>
      <button class="danger" id="del"></button>
      <button class="ghost" id="cancel"></button>
    </div>
    <p class="err" id="err" role="alert"></p>
    <div id="done" hidden><p style="text-align:center;font-weight:700" id="doneL"></p></div>
    <p class="muted small" id="no"></p>
    <a class="link" id="back" href="./" style="text-align:center"></a>
  </div>
</main>
<script src="fb.js"></script>
<script>
(function () {
"use strict";
const S = ${JSON.stringify(S)};
const CFG = ${cfg};
const EMAIL = ${JSON.stringify(EMAIL)};
const $ = (id) => document.getElementById(id);
const pickLang = () => { const n = (navigator.language || "en").toLowerCase(); if (/^zh-(tw|hk|mo)|hant/.test(n)) return "zht"; const l = n.slice(0, 2); return S[l] ? l : "en"; };
let lang = (/[?&]lang=([a-z]+)/.exec(location.search) || [])[1]; if (!lang || !Object.prototype.hasOwnProperty.call(S, lang)) lang = pickLang(); /* 1.0.8: ?lang=constructor non rompe la pagina */
const L = () => S[lang];
const fbl = () => /^(zh|pt)/.test(L().locale) ? L().locale : L().locale.slice(0, 2);
$("lang").innerHTML = Object.keys(S).map((k) => '<option value="' + k + '">' + S[k].lang + "</option>").join(""); $("lang").value = lang;
function errText(e) {
  const E = L().err; const c = (e && e.code) || "";
  if (/popup-closed|cancelled-popup|user-cancelled/.test(c)) return "";
  if (/invalid-email|missing-email/.test(c)) return E.email;
  if (/invalid-credential|wrong-password|user-not-found|invalid-login|missing-password/.test(c)) return E.cred;
  if (/too-many-requests/.test(c)) return E.many; if (/network/.test(c)) return E.net;
  if (/account-exists-with-different-credential/.test(c)) return E.diff; return E.other;
}
const err = (m, ok) => { $("err").textContent = m || ""; $("err").classList.toggle("ok", !!ok); };
let user = null;
function paint() {
  const s = L(); document.documentElement.lang = s.locale; document.title = "Tanetto — " + s.t;
  $("t").textContent = s.t; $("p").textContent = s.p; $("googleL").textContent = s.google; $("orL").textContent = s.or; $("emL").textContent = s.emailL; $("pwL").textContent = s.pwL;
  $("go").textContent = s.signIn; $("forgot").textContent = s.forgot; $("del").textContent = s.delYes; $("cancel").textContent = s.cancel; $("back").textContent = s.back; $("doneL").textContent = s.delDone;
  { const [a, b] = s.no.split("{email}"); const n = $("no"); n.textContent = a; const m = document.createElement("a"); m.href = "mailto:" + EMAIL; m.textContent = EMAIL; n.append(m, b || ""); n.hidden = !!user || $("done").hidden === false; }
  $("signin").hidden = !!user || $("done").hidden === false; $("signed").hidden = !user; if (user) $("who").textContent = s.as.replace("{e}", user.email || "");
}
const busy = (on) => ["google", "go", "forgot", "del", "cancel"].forEach((id) => { $(id).disabled = on; });
const ready = window.TanFB ? window.TanFB.init(CFG, { native: false, emu: window.__FB_EMU || null, lang: fbl() }) : Promise.reject({ code: "auth/network-request-failed" });
ready.then((u) => { user = u; paint(); }).catch((e) => { err(errText(e)); });
paint();
$("lang").addEventListener("change", () => { lang = $("lang").value; if (window.TanFB) window.TanFB.setLang(fbl()); err(""); paint(); });
$("google").addEventListener("click", async () => { err(""); busy(true); try { await ready; const u = await window.TanFB.google(null); if (u) { user = u; paint(); } } catch (e) { err(errText(e)); } busy(false); });
$("form").addEventListener("submit", async (ev) => {
  ev.preventDefault(); const em = $("em").value.trim(), pw = $("pw").value; if (!em || !pw) { err(L().err.empty); return; }
  err(""); busy(true); try { await ready; user = await window.TanFB.emailSignIn(em, pw); $("pw").value = ""; paint(); } catch (e) { err(errText(e)); } busy(false);
});
$("forgot").addEventListener("click", async () => {
  const em = $("em").value.trim(); if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em)) { err(L().err.email); $("em").focus(); return; }
  busy(true); try { await ready; await window.TanFB.resetPw(em); err(L().resetSent.replace("{e}", em), true); } catch (e) { err(errText(e)); } busy(false);
});
$("cancel").addEventListener("click", async () => { busy(true); try { await window.TanFB.out(); } catch (e) { /* niente */ } user = null; err(""); busy(false); paint(); });
$("del").addEventListener("click", async () => {
  err(""); busy(true);
  try { await window.TanFB.remove(); user = null; $("done").hidden = false; $("signin").hidden = true; $("signed").hidden = true; }
  catch (e) {
    if (/requires-recent-login/.test((e && e.code) || "")) { try { await window.TanFB.out(); } catch (x) { /* niente */ } user = null; paint(); err(L().err.other); }
    else err(errText(e));
  }
  busy(false);
});
})();
</script>
</body>
</html>
`;
fs.writeFileSync(process.argv[2] || "/home/claude/tanetto/elimina-account.html", html);
console.log("pagina eliminazione account:", html.length, "caratteri");
