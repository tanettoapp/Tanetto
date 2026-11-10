/* Tanetto: funziona anche senza internet */
/* 1.0.8 (sicurezza): in cache come "index.html" va solo la pagina dell'app riuscita (prima anche pagine di errore o
   altre pagine del sito, che poi comparivano al posto dell'app senza internet); dagli altri siti si conservano solo i
   caratteri di Google Fonts; GSAP ora e' sul sito. */
const C = "tanetto-v24";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "index.html", "fb.js", "gsap.min.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const r = e.request; if (r.method !== "GET") return;
  if (/goatcounter|identitytoolkit|securetoken|firestore\.googleapis|firebaseapp|apis\.google\.com|accounts\.google/.test(r.url)) return;
  let u; try { u = new URL(r.url); } catch (x) { return; }
  const same = u.origin === self.location.origin, font = /^https:\/\/fonts\.(googleapis|gstatic)\.com$/.test(u.origin);
  if (r.mode === "navigate") {
    const app = same && /(\/|\/index\.html)$/.test(u.pathname);
    e.respondWith(fetch(r).then((res) => { if (app && res.ok && res.type === "basic") { const cp = res.clone(); caches.open(C).then((c) => c.put("index.html", cp)); } return res; })
      .catch(() => (app ? caches.match("index.html") : caches.match(r).then((x) => x || caches.match("index.html")))));
    return;
  }
  if (!same && !font) return;
  e.respondWith(caches.match(r).then((hit) => { const net = fetch(r).then((res) => { if (res && ((same && res.ok && res.type === "basic") || (font && (res.ok || res.type === "opaque")))) { const cp = res.clone(); caches.open(C).then((c) => c.put(r, cp)); } return res; }).catch(() => hit); return hit || net; }));
});
