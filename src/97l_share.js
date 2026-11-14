/* =================== v13i: far vedere Tanetto a un amico (link misurabile) =================== */
/* Ogni immagine condivisa porta con se' il link con ?src=amico: cosi' su GoatCounter si vede quante
   persone arrivano grazie a chi gia' usa l'app ("arrivo-amico"). */
/* v14: nell'app Android il link porta alla scheda del Play Store (con la provenienza "amico"), sul sito resta il sito */
function shareUrl() { try { if (isNativeApp()) return PLAY_URL + "&referrer=utm_source%3Damico%26utm_medium%3Dinvito"; } catch (e) { /* niente */ } return SITE_URL + "?src=amico"; }
shareImage = async function (url, name) {
  const t = L(); const inv = inviteMode;
  try {
    const blob = await (await fetch(url)).blob(); const file = new File([blob], name, { type: blob.type || "image/png" });
    const text = inv ? `${t.v12.invText(S.petName)} ${shareUrl()}` : `${t.shareText} · ${shareUrl()}`;
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Tanetto", text }); trackOnce(inv ? "invito-inviato" : "condivisione"); return true; }
    if (inv && navigator.share) { await navigator.share({ title: "Tanetto", text: t.v12.invText(S.petName), url: shareUrl() }); trackOnce("invito-inviato"); return true; }
  } catch (e) { if (e && e.name === "AbortError") return true; }
  return false;
};
/* Nel momento piu' felice (tutti gli obiettivi fatti) si puo' invitare un amico con un tocco */
const _openAllDoneV13i = openAllDone;
openAllDone = function () {
  _openAllDoneV13i();
  const box = document.querySelector(".alldone"); const later = box && box.querySelector("#closeLayer"); if (!later) return;
  const b = document.createElement("button"); b.className = "btn ghost block"; b.id = "invite"; b.dataset.from = "tutto-fatto";
  b.innerHTML = `${icon("share")}${L().v12.invT}`; box.insertBefore(b, later);
};
document.addEventListener("click", (ev) => { const b = ev.target.closest && ev.target.closest("#invite"); if (b && b.dataset.from) trackOnce("invito-da-" + b.dataset.from); }, true);
