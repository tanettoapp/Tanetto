package com.tanettoapp.tanetto;

import com.google.firebase.appcheck.AppCheckProviderFactory;
import com.google.firebase.appcheck.playintegrity.PlayIntegrityAppCheckProviderFactory;

/** 1.0.10: build per lo Store: App Check con Play Integrity (Google Play conferma che l'app e il telefono sono veri). */
final class AppCheckFactory {
    private AppCheckFactory() {}

    static AppCheckProviderFactory get() {
        return PlayIntegrityAppCheckProviderFactory.getInstance();
    }
}
