package com.tanettoapp.tanetto;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.appcheck.FirebaseAppCheck;

/**
 * 1.0.10: Firebase App Check con Play Integrity, per proteggere account e backup (Firestore e Auth di Firebase).
 * L'app usa Firebase dal JavaScript (fb.js): il JavaScript chiede qui il "gettone" di App Check, firmato da Google Play,
 * e lo allega alle sue richieste (CustomProvider dell'SDK web). Play Integrity esiste solo nel codice nativo.
 *
 * SPENTO finche' la build non contiene l'ID dell'app Android registrata su Firebase (BuildConfig.APPCHECK_APP_ID,
 * da android/gradle.properties): status() risponde on=false e il JavaScript non attiva App Check. Da spento non si
 * avvia Firebase, non si chiama Google Play e non parte nessuna richiesta.
 * Acceso, all'inizio solo controllo: e' la console di Firebase a decidere se le richieste senza gettone valido si bloccano
 * (enforcement), e lo si accende solo quando quasi tutti hanno una versione con App Check (vedi CHANGES_110.md).
 */
@CapacitorPlugin(name = "TanettoAppCheck")
public class AppCheckPlugin extends Plugin {
    /* App di Firebase solo per App Check, con un nome suo: non tocca nient'altro (l'app non usa l'SDK Firebase nativo) */
    static final String FB_APP = "tanetto-appcheck";
    private FirebaseAppCheck appCheck;

    static boolean configured() {
        return !BuildConfig.APPCHECK_APP_ID.isEmpty() && !BuildConfig.APPCHECK_API_KEY.isEmpty();
    }

    @PluginMethod
    public void status(PluginCall call) {
        JSObject o = new JSObject();
        o.put("on", configured());
        call.resolve(o);
    }

    private synchronized FirebaseAppCheck appCheck() {
        if (appCheck != null) return appCheck;
        FirebaseApp app;
        try {
            app = FirebaseApp.getInstance(FB_APP);
        } catch (IllegalStateException notYet) {
            FirebaseOptions o = new FirebaseOptions.Builder()
                .setApplicationId(BuildConfig.APPCHECK_APP_ID)
                .setApiKey(BuildConfig.APPCHECK_API_KEY)
                .setProjectId(BuildConfig.APPCHECK_PROJECT_ID)
                .setGcmSenderId(BuildConfig.APPCHECK_PROJECT_NUMBER) /* numero del progetto: serve a Play Integrity */
                .build();
            app = FirebaseApp.initializeApp(getContext().getApplicationContext(), o, FB_APP);
        }
        FirebaseAppCheck ac = FirebaseAppCheck.getInstance(app);
        /* rinnovo automatico spento: il gettone lo chiede l'SDK web quando serve (meno chiamate a Play Integrity, quota) */
        ac.installAppCheckProviderFactory(AppCheckFactory.get(), false);
        appCheck = ac;
        return ac;
    }

    /** Gettone di App Check per l'SDK web: { token, exp } (exp = scadenza in millisecondi). */
    @PluginMethod
    public void token(final PluginCall call) {
        if (!configured()) { call.reject("app check off", "off"); return; }
        final boolean force = Boolean.TRUE.equals(call.getBoolean("force", false));
        try {
            appCheck().getAppCheckToken(force)
                .addOnSuccessListener(t -> {
                    JSObject o = new JSObject();
                    o.put("token", t.getToken());
                    o.put("exp", t.getExpireTimeMillis());
                    call.resolve(o);
                })
                .addOnFailureListener(e -> call.reject("app check token failed", "failed"));
        } catch (Exception e) {
            call.reject("app check unavailable", "failed");
        }
    }
}
