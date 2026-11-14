// Pagina pubblica con informativa privacy e condizioni d'uso (Google Play chiede un indirizzo web), nelle 14 lingue dell'app.
const fs = require("fs");
const files = fs.readdirSync("src").filter((f) => /^(29_t|3.*)\.js$/.test(f)).sort();
global.window = {};
const p = "/tmp/claude-0/legal_" + process.pid + ".js";
fs.writeFileSync(p, files.map((f) => fs.readFileSync("src/" + f, "utf8")).join("\n") + "\nmodule.exports = T;");
const T = require(p); fs.unlinkSync(p);
const v5 = fs.readFileSync("src/90_v5.js", "utf8");
const OWNER_NAME = (v5.match(/const OWNER_NAME = "([^"]*)"/) || [])[1] || "";
const OWNER_EMAIL = (v5.match(/OWNER_EMAIL = "([^"]*)"/) || [])[1] || "";
const DATE = (v5.match(/const PRIVACY_DATE = "([^"]*)"/) || [])[1];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const S = {};
for (const l of Object.keys(T)) {
  const t = T[l]; const [y, m, d] = DATE.split("-").map(Number);
  const date = new Intl.DateTimeFormat(t.locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(y, m - 1, d));
  const rep = (s) => s.replace("{owner}", OWNER_NAME || t.ownerMissing).replace("{email}", OWNER_EMAIL).replace("{date}", date);
  S[l] = { lang: t.lang, locale: t.locale, privB: t.privB, termsB: t.termsB, priv: t.privDoc.map(rep), terms: t.terms.map(rep), back: t.acct.webBack, del: t.acct.webT };
}
/* 1.0.11 (K-08): il testo inglese e' gia' scritto nella pagina (si legge anche senza JavaScript e dai motori di ricerca);
   lo script poi mostra la lingua di chi la apre */
const linkN = (s) => esc(s).replace(/tanettoapp\.github\.io\/Tanetto\/elimina-account\.html/g, '<a href="elimina-account.html">tanettoapp.github.io/Tanetto/elimina-account.html</a>').replace(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g, '<a href="mailto:$1">$1</a>');
const EN = S.en;
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tanetto — Privacy policy and terms of use</title>
<meta name="description" content="Privacy policy and terms of use of Tanetto, the gentle self-care habit app.">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="canonical" href="https://tanettoapp.github.io/Tanetto/privacy.html">
<meta property="og:type" content="website"><meta property="og:title" content="Tanetto: privacy policy and terms of use">
<meta property="og:url" content="https://tanettoapp.github.io/Tanetto/privacy.html"><meta property="og:image" content="https://tanettoapp.github.io/Tanetto/og.png">
<style>
:root { --bg: #F4EFE6; --paper: #FFFBF4; --ink: #2F2A26; --muted: #6E655D; --line: #E2D7C6; --accent: #2F7035; }
@media (prefers-color-scheme: dark) { :root { --bg: #1A1714; --paper: #25211C; --ink: #F1EBE2; --muted: #B5AA9D; --line: #3A342D; --accent: #93CC8B; } }
body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width: 720px; margin: 0 auto; padding: 18px 16px 48px; box-sizing: border-box; }
.top { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; } .brand { font-weight: 700; font-size: 20px; color: var(--accent); text-decoration: none; } .sp { flex: 1; }
select { border: 2px solid var(--line); background: var(--paper); color: var(--ink); border-radius: 12px; padding: 8px 10px; font: inherit; }
section { background: var(--paper); border-radius: 20px; padding: 18px 18px 8px; margin-bottom: 16px; box-shadow: 0 6px 18px -10px rgba(80,60,30,.35); }
h1 { font-size: 24px; margin: 0 0 10px; line-height: 1.25; } p { margin: 0 0 12px; overflow-wrap: anywhere; } a { color: var(--accent); }
.links { text-align: center; color: var(--muted); font-size: 15px; }
</style>
</head>
<body>
<main>
  <div class="top"><a class="brand" href="./">Tanetto</a><span class="sp"></span><select id="lang" aria-label="Language"></select></div>
  <section id="privacy"><h1 id="pT">${esc(EN.privB)}</h1><div id="pB">${EN.priv.map((x) => "<p>" + linkN(x) + "</p>").join("")}</div></section>
  <section id="terms"><h1 id="tT">${esc(EN.termsB)}</h1><div id="tB">${EN.terms.map((x) => "<p>" + linkN(x) + "</p>").join("")}</div></section>
  <p class="links"><a id="back" href="./">${esc(EN.back)}</a> · <a id="del" href="elimina-account.html">${esc(EN.del)}</a></p>
</main>
<script>
(function () {
"use strict";
const S = ${JSON.stringify(S)};
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const link = (s) => esc(s).replace(/tanettoapp\\.github\\.io\\/Tanetto\\/elimina-account\\.html/g, '<a href="elimina-account.html">tanettoapp.github.io/Tanetto/elimina-account.html</a>').replace(/([\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+)/g /* 1.0.11 (K-01): senza il punto finale della frase */, '<a href="mailto:$1">$1</a>').replace(/(https:\\/\\/[^\\s<>"）)，。、]+[^\\s<>"）)，。、.,;:])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
const pick = () => { const q = (/[?&]lang=([a-z]+)/.exec(location.search) || [])[1]; if (q && Object.prototype.hasOwnProperty.call(S, q)) return q; /* 1.0.8: ?lang=constructor non rompe la pagina */ const n = (navigator.language || "en").toLowerCase(); if (/^zh-(tw|hk|mo)|hant/.test(n)) return "zht"; const l = n.slice(0, 2); return S[l] ? l : "en"; };
let lang = pick();
$("lang").innerHTML = Object.keys(S).map((k) => '<option value="' + k + '">' + S[k].lang + "</option>").join(""); $("lang").value = lang;
function paint() {
  const s = S[lang]; document.documentElement.lang = s.locale; document.title = "Tanetto — " + s.privB + " · " + s.termsB;
  $("pT").textContent = s.privB; $("tT").textContent = s.termsB; $("back").textContent = s.back; $("del").textContent = s.del;
  $("pB").innerHTML = s.priv.map((x) => "<p>" + link(x) + "</p>").join(""); $("tB").innerHTML = s.terms.map((x) => "<p>" + link(x) + "</p>").join("");
}
$("lang").addEventListener("change", () => { lang = $("lang").value; paint(); });
paint();
})();
</script>
<noscript><p style="padding:16px">Tanetto — privacy: ${esc(OWNER_EMAIL)}</p></noscript>
</body>
</html>
`;
fs.writeFileSync(process.argv[2] || "/home/claude/tanetto/privacy.html", html);
console.log("pagina privacy e condizioni:", html.length, "caratteri");
