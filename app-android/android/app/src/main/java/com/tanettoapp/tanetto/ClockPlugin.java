package com.tanettoapp.tanetto;

import android.os.Build;
import android.os.SystemClock;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * 1.0.8 (sicurezza): l'ora "vera" per l'app, senza server.
 * Spostare avanti la data del telefono non deve far finire subito i viaggi, aprire prima le feste
 * o dare i premi di tanti giorni in pochi minuti. L'app (98x_v20_secure.js) confronta l'ora del telefono con:
 * 1) l'ora della rete (Android 13+, SystemClock.currentNetworkTimeClock: non si cambia dalle impostazioni);
 * 2) il tempo passato dall'accensione (elapsedRealtime: conta anche lo schermo spento e non si puo' cambiare),
 *    insieme al numero di accensioni (BOOT_COUNT) per sapere se il telefono e' stato riavviato.
 * Nessun permesso, nessun dato personale: solo numeri di tempo.
 */
@CapacitorPlugin(name = "TanettoClock")
public class ClockPlugin extends Plugin {

    @PluginMethod
    public void now(PluginCall call) {
        JSObject o = new JSObject();
        o.put("wall", System.currentTimeMillis());
        o.put("el", SystemClock.elapsedRealtime());
        int boot = -1;
        try { boot = Settings.Global.getInt(getContext().getContentResolver(), Settings.Global.BOOT_COUNT); } catch (Exception e) { boot = -1; }
        o.put("boot", boot);
        long net = 0;
        if (Build.VERSION.SDK_INT >= 33) {
            try { net = SystemClock.currentNetworkTimeClock().millis(); } catch (Exception e) { net = 0; }
        }
        if (net > 0) o.put("net", net);
        call.resolve(o);
    }
}
