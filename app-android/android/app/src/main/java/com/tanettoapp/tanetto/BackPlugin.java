package com.tanettoapp.tanetto;

import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Tasto "indietro" del telefono: lo decide l'app (chiudere una finestra, tornare alla home,
 * chiedere "Vuoi davvero uscire?"). Se l'app non risponde (pagina non ancora pronta),
 * il tasto funziona come sempre.
 */
@CapacitorPlugin(name = "TanettoBack")
public class BackPlugin extends Plugin {
    private OnBackPressedCallback callback;

    @Override
    public void load() {
        callback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (hasListeners("back")) {
                    notifyListeners("back", new JSObject(), true);
                } else {
                    setEnabled(false);
                    getActivity().getOnBackPressedDispatcher().onBackPressed();
                    setEnabled(true);
                }
            }
        };
        getActivity().getOnBackPressedDispatcher().addCallback(getActivity(), callback);
    }

    @PluginMethod
    public void exitApp(PluginCall call) {
        call.resolve();
        getActivity().runOnUiThread(() -> getActivity().finish());
    }
}
