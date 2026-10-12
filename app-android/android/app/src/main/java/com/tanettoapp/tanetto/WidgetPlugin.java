package com.tanettoapp.tanetto;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Build;
import android.util.Base64;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;

/** L'app manda al widget nome, riga di testo e immagine del compagno; e puo' chiedere ad Android di aggiungerlo alla Home. */
@CapacitorPlugin(name = "TanettoWidget")
public class WidgetPlugin extends Plugin {

    @PluginMethod
    public void update(PluginCall call) {
        Context c = getContext();
        try {
            String img = call.getString("image");
            if (img != null && img.startsWith("data:image/png;base64,")) {
                byte[] bytes = Base64.decode(img.substring(22), Base64.DEFAULT);
                File tmp = new File(c.getFilesDir(), TanettoWidget.IMG + ".tmp");
                try (FileOutputStream out = new FileOutputStream(tmp)) { out.write(bytes); }
                File dst = new File(c.getFilesDir(), TanettoWidget.IMG);
                if (!tmp.renameTo(dst)) { dst.delete(); tmp.renameTo(dst); }
            }
            c.getSharedPreferences(TanettoWidget.PREFS, Context.MODE_PRIVATE).edit()
                .putString("name", call.getString("name", ""))
                .putString("line", call.getString("line", ""))
                .apply();
            TanettoWidget.refreshAll(c);
            call.resolve();
        } catch (Exception e) {
            call.reject("widget update failed", "error");
        }
    }

    @PluginMethod
    public void info(PluginCall call) {
        Context c = getContext();
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        JSObject o = new JSObject();
        int[] ids = m.getAppWidgetIds(new ComponentName(c, TanettoWidget.class));
        o.put("count", ids == null ? 0 : ids.length);
        o.put("canPin", Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && m.isRequestPinAppWidgetSupported());
        call.resolve(o);
    }

    @PluginMethod
    public void pin(PluginCall call) {
        Context c = getContext();
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && m.isRequestPinAppWidgetSupported()) {
            boolean ok = m.requestPinAppWidget(new ComponentName(c, TanettoWidget.class), null, null);
            JSObject o = new JSObject();
            o.put("asked", ok);
            call.resolve(o);
        } else {
            call.reject("pin not supported", "unsupported");
        }
    }
}
