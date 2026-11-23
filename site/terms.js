/* Tanetto terms of use (https://tanetto.app/terms): it is the English page, the address used by Google Play and the app.
   ?lang=<code> (the codes of privacy.html: it, de, zh, zht, ...) opens that language; without it, browsers whose
   language is one of the other 13 go to their page (/terms-it, /terms-de, ...). ?lang=en, or any unknown code, stays here. */
(function () {
  try {
    var slug = { it: "it", de: "de", es: "es", fr: "fr", pt: "pt", ja: "ja", ko: "ko", ru: "ru", pl: "pl", nl: "nl", tr: "tr",
      zh: "zh-hans", "zh-hans": "zh-hans", zht: "zh-hant", "zh-hant": "zh-hant" };
    var m = /[?&]lang=([a-z-]+)/i.exec(location.search), go = "";
    if (m) {
      var q = m[1].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(slug, q)) go = slug[q];
    } else {
      var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "en"];
      for (var i = 0; i < list.length; i++) {
        var l = String(list[i] || "").toLowerCase(), b = l.split("-")[0];
        if (b === "zh") go = /hant|-tw|-hk|-mo/.test(l) ? "zh-hant" : "zh-hans";
        else if (b === "en") go = "";
        else if (Object.prototype.hasOwnProperty.call(slug, b)) go = slug[b];
        else continue;
        break;
      }
    }
    if (go) location.replace("terms-" + go + location.hash);
  } catch (e) { /* stay on the English page */ }
})();
