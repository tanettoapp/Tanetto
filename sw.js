/* Tanetto: funziona anche senza internet */
/* 1.0.9 (fase 3): le figure 3D (img/) si salvano subito; le cartoline quando si vedono la prima volta. */
/* 1.0.8 (sicurezza): in cache come "index.html" va solo la pagina dell'app riuscita (prima anche pagine di errore o
   altre pagine del sito, che poi comparivano al posto dell'app senza internet); dagli altri siti si conservano solo i
   caratteri di Google Fonts; GSAP ora e' sul sito. */
const C = "tanetto-v27-77191dd6";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "index.html", "fb.js", "gsap.min.js", "caveat-700.woff2", "manifest.webmanifest", "icon-192.png", "icon-512.png", "img/ban/kites.webp?v=77191dd6", "img/ban/stars.webp?v=77191dd6", "img/ban/xmas.webp?v=77191dd6", "img/m/celebrate.webp?v=77191dd6", "img/m/crown.webp?v=77191dd6", "img/m/depart.webp?v=77191dd6", "img/m/gift.webp?v=77191dd6", "img/m/levelup.webp?v=77191dd6", "img/m/love.webp?v=77191dd6", "img/m/postcard.webp?v=77191dd6", "img/m/reading.webp?v=77191dd6", "img/m/return.webp?v=77191dd6", "img/m/wave.webp?v=77191dd6", "img/m/xmas_germo.webp?v=77191dd6", "img/pet/dori.webp?v=77191dd6", "img/pet/germo.webp?v=77191dd6", "img/pet/lumi.webp?v=77191dd6", "img/pet/miko.webp?v=77191dd6", "img/pet/ondi.webp?v=77191dd6", "img/pet/pingo.webp?v=77191dd6", "img/pet/rufi.webp?v=77191dd6", "img/plus_hero.webp?v=77191dd6", "img/welcome.webp?v=77191dd6", "img/xv/aura.webp?v=77191dd6", "img/xv/cape.webp?v=77191dd6", "img/xv/crown.webp?v=77191dd6", "img/xv/fountain.webp?v=77191dd6", "img/xv/galaxy.webp?v=77191dd6", "img/xv/tree.webp?v=77191dd6"])).then(() => self.skipWaiting())); });
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
