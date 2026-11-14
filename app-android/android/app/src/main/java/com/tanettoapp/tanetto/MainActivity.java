package com.tanettoapp.tanetto;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ReviewPlugin.class);
        registerPlugin(GoogleSignInPlugin.class);
        registerPlugin(BillingPlugin.class);
        registerPlugin(WidgetPlugin.class);
        registerPlugin(SharePlugin.class);
        registerPlugin(BackPlugin.class);
        registerPlugin(AdsPlugin.class);
        // 1.0.8 (sicurezza): ora della rete / tempo dall'accensione, contro la data del telefono spostata avanti
        registerPlugin(ClockPlugin.class);
        // 1.0.10: App Check (Play Integrity) per account e backup; spento finche' manca l'ID dell'app Android di Firebase
        registerPlugin(AppCheckPlugin.class);
        super.onCreate(savedInstanceState);
        // Suono del logo e musica partono subito all'apertura, senza aspettare un tocco
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
            // 1.0.9 (accessibilita'): zoom con due dita permesso, senza i pulsanti +/- sullo schermo
            getBridge().getWebView().getSettings().setBuiltInZoomControls(true);
            getBridge().getWebView().getSettings().setDisplayZoomControls(false);
            // 1.0.11 (G-13/A-04): fondo del WebView uguale allo splash (crema o scuro): niente lampo chiaro in tema scuro
            boolean night = (getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK) == android.content.res.Configuration.UI_MODE_NIGHT_YES;
            getBridge().getWebView().setBackgroundColor(night ? 0xFF1A1714 : 0xFFF4EFE6);
        }
    }
}
