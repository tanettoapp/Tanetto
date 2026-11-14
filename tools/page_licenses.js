// 1.0.11 (M-14 / I-10): pagina "Licenze open source" (licenses.html) con l'elenco dei componenti e i testi completi delle
// licenze (OFL 1.1, MIT, ISC, Apache 2.0). Chiamata da tools/build.py: node tools/page_licenses.js <cartella di uscita>.
// La stessa pagina si apre nell'app da Profilo > Informazioni > "Licenze open source" (prep_www.py la copia nell'app).
const fs = require("fs"), path = require("path");
const D = path.join(__dirname, "licenses"); const OUT = process.argv[2] || ".";
const rd = (f) => fs.readFileSync(path.join(D, f), "utf8").trim();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ISC = (who) => `ISC License\n\n${who}\n\n` + rd("isc-body.txt");
const C = [
  ["Fredoka (font)", "Copyright 2016 The Fredoka Project Authors (github.com/hafontia/Fredoka-One)", "SIL Open Font License 1.1", "ofl"],
  ["Figtree (font)", "Copyright 2022 The Figtree Project Authors (github.com/erikdkennedy/figtree)", "SIL Open Font License 1.1", "ofl"],
  ["Caveat (font)", "Copyright 2014 The Caveat Project Authors (github.com/googlefonts/caveat)", "SIL Open Font License 1.1", "ofl"],
  ["Lucide (some icons)", "Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.", "ISC License", "isc"],
  ["GSAP 3.12.5 (animations)", "Copyright GreenSock, Inc. (gsap.com)", "GreenSock Standard \"No Charge\" License: gsap.com/standard-license", ""],
  ["Capacitor (Android app runtime and plugins)", "Copyright (c) 2017-present Drifty Co.", "MIT License", "mit"],
  ["Firebase JavaScript SDK (optional account and backup)", "Copyright Google LLC", "Apache License 2.0", "apache"],
  ["AndroidX libraries", "Copyright The Android Open Source Project", "Apache License 2.0", "apache"],
  ["Kotlin and kotlinx.coroutines", "Copyright JetBrains s.r.o. and Kotlin Programming Language contributors", "Apache License 2.0", "apache"],
  ["Google Play services, Google Mobile Ads, User Messaging Platform, Google Play Billing Library, Credential Manager", "Copyright Google LLC", "Android Software Development Kit License / Google APIs Terms of Service (developer.android.com/studio/terms)", ""],
];
const T = { ofl: rd("ofl-1.1.txt"), mit: rd("mit-capacitor.txt"), apache: rd("apache-2.0.txt"), isc: ISC("Copyright (c) Lucide Contributors 2022") };
const NAME = { ofl: "SIL Open Font License, Version 1.1", mit: "MIT License", isc: "ISC License", apache: "Apache License, Version 2.0" };
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tanetto: open-source licences</title>
<link rel="canonical" href="https://tanettoapp.github.io/Tanetto/licenses.html">
<style>
:root { --bg: #F4EFE6; --paper: #FFFBF4; --ink: #2F2A26; --muted: #5C544E; --line: #E2D7C6; --accent: #2F6B35; }
@media (prefers-color-scheme: dark) { :root { --bg: #1A1714; --paper: #25211C; --ink: #F1EBE2; --muted: #C9BEB1; --line: #3A342D; --accent: #93CC8B; } }
body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; }
main { max-width: 760px; margin: 0 auto; padding: 24px 16px 48px; }
h1 { font-size: 26px; margin: 0 0 8px; } h2 { font-size: 19px; margin: 28px 0 8px; }
.card { background: var(--paper); border: 1px solid var(--line); border-radius: 16px; padding: 14px 16px; margin: 10px 0; overflow-wrap: anywhere; }
.muted { color: var(--muted); } a { color: var(--accent); }
pre { white-space: pre-wrap; overflow-wrap: anywhere; font: 13px/1.45 ui-monospace, Menlo, Consolas, monospace; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
</style>
</head>
<body>
<main id="lic">
<h1>Open-source licences</h1>
<p class="muted">Tanetto is built with these open-source components. Thank you to everyone who made them.</p>
${C.map(([n, c, l]) => `<div class="card"><b>${esc(n)}</b><br><span class="muted">${esc(c)}</span><br>${esc(l)}</div>`).join("\n")}
${["ofl", "mit", "isc", "apache"].map((k) => `<h2 id="${k}">${esc(NAME[k])}</h2>\n<pre>${esc(T[k])}</pre>`).join("\n")}
</main>
</body>
</html>
`;
fs.writeFileSync(path.join(OUT, "licenses.html"), html);
console.log("pagina licenze:", html.length, "caratteri");
