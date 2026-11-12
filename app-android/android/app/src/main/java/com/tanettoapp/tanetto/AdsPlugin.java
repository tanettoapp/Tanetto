package com.tanettoapp.tanetto;

import android.content.pm.ApplicationInfo;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.ads.AgeRestrictedTreatment;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.RequestConfiguration;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Video con premio (AdMob), solo su scelta dell'utente.
 * 1) init: consenso privacy (UMP, obbligatorio in Europa) e poi avvio dell'SDK, solo se si possono chiedere annunci;
 * 2) load: prepara un video; 3) show: lo mostra e dice se il premio va dato;
 * 4) privacy: riapre le scelte sulla privacy (pulsante in Altro).
 * Annunci solo adatti alla supervisione dei genitori (PG), come impostato anche su AdMob.
 * 1.0.9 (pubblico misto, regole Google Play Families): l'app passa l'eta' ("age": child / teen / adult; chi non l'ha detta
 * arriva come child). child = trattamento per bambini (TFCD: niente personalizzazione, niente ID pubblicita') e solo annunci G;
 * teen = sotto l'eta' del consenso digitale (TFUA: niente personalizzazione, il modulo del consenso non serve); adult = come prima.
 */
@CapacitorPlugin(name = "TanettoAds")
public class AdsPlugin extends Plugin {
    private volatile ConsentInformation consent;
    private volatile RewardedAd rewarded;
    private volatile long loadedAt = 0;
    /* Google consiglia di mostrare un video entro un'ora da quando è stato preparato: dopo 55 minuti se ne prepara uno nuovo */
    private static final long MAX_AGE_MS = 55L * 60L * 1000L;

    private boolean fresh() { return rewarded != null && System.currentTimeMillis() - loadedAt < MAX_AGE_MS; }
    private final AtomicBoolean started = new AtomicBoolean(false);
    /* Cambia quando cambiano le scelte sulla privacy: un video chiesto prima non va più usato */
    private final AtomicInteger gen = new AtomicInteger(0);
    /* Eta' dichiarata nella schermata neutra dell'app: senza risposta si tratta come un bambino */
    private volatile String age = "child";
    private static String ageOf(PluginCall call) { String a = call.getString("age", "child"); return "adult".equals(a) || "teen".equals(a) ? a : "child"; }
    /* Impostazioni di Google per l'eta': valgono per tutte le richieste da qui in poi.
       1.0.9 (verifica politiche m2): anche la nuova impostazione di AdMob (GMA 25.3+) "trattamento per eta'":
       CHILD per bambini e chi non ha risposto, TEEN per i ragazzi; restano i vecchi segnali (vale il piu' prudente). */
    @SuppressWarnings("deprecation")
    private void applyAge(String a) {
        RequestConfiguration.Builder b = MobileAds.getRequestConfiguration().toBuilder();
        if ("child".equals(a)) {
            b.setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_TRUE)
             .setTagForUnderAgeOfConsent(RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_UNSPECIFIED)
             .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_G)
             .setAgeRestrictedTreatment(AgeRestrictedTreatment.CHILD);
        } else if ("teen".equals(a)) {
            b.setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE)
             .setTagForUnderAgeOfConsent(RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_TRUE)
             .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_PG)
             .setAgeRestrictedTreatment(AgeRestrictedTreatment.TEEN);
        } else {
            b.setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_UNSPECIFIED)
             .setTagForUnderAgeOfConsent(RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE)
             .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_PG)
             .setAgeRestrictedTreatment(AgeRestrictedTreatment.UNSPECIFIED);
        }
        MobileAds.setRequestConfiguration(b.build());
    }
    private void setAge(String a) {
        if (a.equals(age)) return;
        age = a; gen.incrementAndGet(); rewarded = null; /* un video preparato con l'eta' di prima non si usa */
        applyAge(a);
    }

    private JSObject state() {
        JSObject o = new JSObject();
        o.put("canRequestAds", consent != null && consent.canRequestAds());
        o.put("privacyRequired", consent != null && consent.getPrivacyOptionsRequirementStatus() == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED);
        o.put("loaded", fresh());
        return o;
    }

    private void startSdk() {
        if (!started.compareAndSet(false, true)) return;
        applyAge(age); /* prima dell'avvio dell'SDK, cosi' vale gia' per la prima richiesta */
        new Thread(() -> MobileAds.initialize(getContext(), s -> {})).start();
    }

    @PluginMethod
    public void init(PluginCall call) {
        final String a = ageOf(call);
        getActivity().runOnUiThread(() -> {
            setAge(a); applyAge(a);
            consent = UserMessagingPlatform.getConsentInformation(getContext());
            /* sotto l'eta' del consenso (bambini e ragazzi) Google non chiede il consenso agli annunci personalizzati: non ce ne sono */
            ConsentRequestParameters params = new ConsentRequestParameters.Builder().setTagForUnderAgeOfConsent(!"adult".equals(a)).build();
            consent.requestConsentInfoUpdate(getActivity(), params, () -> {
                UserMessagingPlatform.loadAndShowConsentFormIfRequired(getActivity(), err -> {
                    if (consent.canRequestAds()) startSdk();
                    call.resolve(state());
                });
            }, err -> {
                if (consent.canRequestAds()) startSdk();
                call.resolve(state());
            });
            if (consent.canRequestAds()) startSdk();
        });
    }

    @PluginMethod
    public void status(PluginCall call) { call.resolve(state()); }

    @PluginMethod
    public void load(PluginCall call) {
        String unit = call.getString("unitId");
        final String a = ageOf(call);
        setAge(a); /* l'eta' detta nell'app vale anche per questo video */
        /* Nelle versioni di prova (debug) si usano sempre i video di prova di Google: mai annunci veri durante i test */
        if ((getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) unit = "ca-app-pub-3940256099942544/5224354917";
        if (unit == null || consent == null || !consent.canRequestAds()) { call.reject("not_ready", "not_ready"); return; }
        if (fresh()) { call.resolve(state()); return; }
        rewarded = null;
        final String unitF = unit;
        final int g = gen.get();
        getActivity().runOnUiThread(() -> RewardedAd.load(getContext(), unitF, new AdRequest.Builder().build(), new RewardedAdLoadCallback() {
            @Override public void onAdLoaded(@NonNull RewardedAd ad) {
                if (g != gen.get()) { call.reject("stale", "stale"); return; }
                loadedAt = System.currentTimeMillis(); rewarded = ad; call.resolve(state());
            }
            @Override public void onAdFailedToLoad(@NonNull LoadAdError e) { rewarded = null; call.reject("no_fill", String.valueOf(e.getCode())); }
        }));
    }

    @PluginMethod
    public void show(PluginCall call) {
        final RewardedAd ad = rewarded; final long at = loadedAt; rewarded = null;
        if (ad == null || System.currentTimeMillis() - at >= MAX_AGE_MS) { call.reject("not_loaded", "not_loaded"); return; }
        final AtomicBoolean earned = new AtomicBoolean(false);
        getActivity().runOnUiThread(() -> {
            ad.setFullScreenContentCallback(new FullScreenContentCallback() {
                @Override public void onAdDismissedFullScreenContent() { JSObject o = new JSObject(); o.put("rewarded", earned.get()); call.resolve(o); }
                @Override public void onAdFailedToShowFullScreenContent(@NonNull AdError e) { call.reject("show_failed", String.valueOf(e.getCode())); }
            });
            ad.show(getActivity(), item -> earned.set(true));
        });
    }

    @PluginMethod
    public void privacy(PluginCall call) {
        getActivity().runOnUiThread(() -> UserMessagingPlatform.showPrivacyOptionsForm(getActivity(), err -> {
            /* Il video già pronto era stato preparato con le scelte vecchie: lo si butta e se ne prepara uno nuovo */
            gen.incrementAndGet(); rewarded = null;
            if (consent != null && consent.canRequestAds()) startSdk();
            call.resolve(state());
        }));
    }
}
