// Prova veloce del riconoscimento (senza browser). Uso: node crisis_node.js frasi.json  -> {lingua: [[frase, livello], ...]}
// frasi.json = {"it": ["...", ...], "en": [...]}. livello 0 = niente, 1 = controllo gentile, 2 = crisi (scheda di aiuto).
const fs = require("fs");
const src = fs.readFileSync(process.env.LAYER || "/home/claude/tanetto-safety110/app-android/safety110/layers/98zs_safety110.js", "utf8");
const a = src.indexOf("function sf110Norm"), b = src.indexOf("/* ---------------- B) testi");
const S = { lang: "en" };
const f = new Function("S", src.slice(a, b) + "\nreturn sf110Level;");
const level = f(S);
const inp = JSON.parse(fs.readFileSync(process.argv[2], "utf8")); const out = {};
for (const l of Object.keys(inp)) out[l] = inp[l].map((x) => [x, level(x, l)]);
console.log(JSON.stringify(out, null, 1));
