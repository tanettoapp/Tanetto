const fs = require("fs");
const files = fs.readdirSync("src").filter((f) => /^(29_t|3.*)\.js$/.test(f)).sort();
global.window = {};
let code = files.map((f) => fs.readFileSync("src/" + f, "utf8")).join("\n") + "\nmodule.exports = T;";
const p = require("path").join(require("fs").existsSync("/dev/shm") ? "/dev/shm" : require("os").tmpdir(), "chk_" + process.pid) + ".js"; fs.writeFileSync(p, code);
let T; try { T = require(p); } catch (e) { console.log("LOAD ERROR", e.message); process.exit(1); }
const ref = T.en; const langs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(T);
const FREE = [/^helpLines$/, /^chat\.K\./];
let bad = 0;
function cmp(a, b, path) {
  if (FREE.some((r) => r.test(path))) { if (!Array.isArray(b) || !b.length) { console.log("  empty", path); bad++; } return; }
  const ta = a === null ? "null" : Array.isArray(a) ? "array" : typeof a, tb = b === null ? "null" : Array.isArray(b) ? "array" : typeof b; /* 1.0.9: posti vuoti (null) negli elenchi */
  if (ta !== tb) { console.log("  type", path, ta, tb); bad++; return; }
  if (ta === "array") { if (a.length !== b.length) { console.log("  len", path, a.length, b.length); bad++; } a.forEach((x, i) => b[i] !== undefined && cmp(x, b[i], path + "." + i)); return; }
  if (ta === "object") { for (const k of Object.keys(a)) { if (!(k in b)) { console.log("  missing", path + "." + k); bad++; } else cmp(a[k], b[k], path ? path + "." + k : k); } for (const k of Object.keys(b)) if (!(k in a)) { console.log("  extra", path + "." + k); } return; }
  if (ta === "function") {
    if (a.length !== b.length) { console.log("  args", path, a.length, b.length); bad++; }
    try { const args = [3, 6, 2].slice(0, a.length).map((x, i) => (i === 0 && /name|\(n\)|\(d\)/.test("") ? "X" : x)); const r = b(...args.map((x) => x)); if (typeof r !== "string" && typeof r !== typeof a(...args)) { console.log("  ret", path); bad++; } } catch (e) { console.log("  throws", path, e.message); bad++; }
  }
  if (ta === "string" && /\$\{|\{n\}|\{owner\}|\{email\}|\{date\}|\{name\}/.test(a)) { for (const m of a.match(/\{n\}|\{owner\}|\{email\}|\{date\}|\{name\}/g) || []) if (!b.includes(m)) { console.log("  placeholder", path, m); bad++; } }
}
for (const l of langs) { if (l === "en") continue; const before = bad; console.log("==", l); cmp(ref, T[l], ""); console.log(l, bad - before ? "PROBLEMS " + (bad - before) : "OK"); }
fs.unlinkSync(p); process.exit(bad ? 1 : 0);
