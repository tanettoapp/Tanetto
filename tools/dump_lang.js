const fs = require("fs");
const files = fs.readdirSync("src").filter((f) => /^(29_t|3.*)\.js$/.test(f)).sort();
global.window = {};
const code = files.map((f) => fs.readFileSync("src/" + f, "utf8")).join("\n") + "\nmodule.exports = T;";
const p = require("path").join(require("fs").existsSync("/dev/shm") ? "/dev/shm" : require("os").tmpdir(), "dump_" + process.pid) + ".js"; fs.writeFileSync(p, code); const T = require(p); fs.unlinkSync(p);
for (const l of Object.keys(T)) {
  const out = [];
  const walk = (o, path) => {
    if (typeof o === "string") out.push(`${path} = ${JSON.stringify(o)}`);
    else if (typeof o === "function") out.push(`${path} = ${o.toString().replace(/\s+/g, " ")}`);
    else if (Array.isArray(o)) o.forEach((x, i) => walk(x, `${path}[${i}]`));
    else if (o && typeof o === "object") for (const k of Object.keys(o)) walk(o[k], `${path}.${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}`.replace(/\."(.*)"$/, '["$1"]'));
  };
  walk(T[l], `T.${l}`); fs.writeFileSync(`dumps/${l}.txt`, out.join("\n") + "\n");
}
console.log(Object.keys(T).join(" "));
