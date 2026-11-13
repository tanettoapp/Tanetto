package com.tanettoapp.tanetto;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * 1.0.10: App Check SPENTO (android/gradle.properties senza tanettoAppCheckAppId). Stesso plugin "TanettoAppCheck"
 * della versione accesa (src/appcheck/on), ma senza Firebase nativo: la build resta con le stesse librerie della 1.0.9.
 * Il JavaScript chiede status(), riceve on=false e non attiva App Check.
 */
@CapacitorPlugin(name = "TanettoAppCheck")
public class AppCheckPlugin extends Plugin {

    @PluginMethod
    public void status(PluginCall call) {
        JSObject o = new JSObject();
        o.put("on", false);
        call.resolve(o);
    }

    @PluginMethod
    public void token(PluginCall call) {
        call.reject("app check off", "off");
    }
}
