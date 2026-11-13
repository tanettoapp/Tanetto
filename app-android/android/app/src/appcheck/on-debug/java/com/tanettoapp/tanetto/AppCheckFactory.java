package com.tanettoapp.tanetto;

import com.google.firebase.appcheck.AppCheckProviderFactory;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;

/**
 * 1.0.10: build di prova (APK debug): un APK installato a mano non passa Play Integrity, quindi si usa il fornitore
 * "debug" di Firebase. Al primo uso scrive nel logcat un codice segreto da aggiungere nella console di Firebase
 * (App Check > app Android > Gestisci token di debug). Mai nella build per lo Store.
 */
final class AppCheckFactory {
    private AppCheckFactory() {}

    static AppCheckProviderFactory get() {
        return DebugAppCheckProviderFactory.getInstance();
    }
}
