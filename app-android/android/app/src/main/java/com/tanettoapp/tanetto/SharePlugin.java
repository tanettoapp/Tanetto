package com.tanettoapp.tanetto;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * Condividere e salvare dall'app Android (il WebView da solo non sa farlo):
 * immagini del compagno, cartoline, inviti agli amici e la copia dei dati.
 */
@CapacitorPlugin(name = "TanettoShare")
public class SharePlugin extends Plugin {

    private static String safeName(String n, String def) {
        if (n == null || n.isEmpty()) return def;
        return n.replaceAll("[^A-Za-z0-9._-]", "_");
    }

    /** Apre la finestra "Condividi" di Android, con un file (facoltativo) e un testo. */
    @PluginMethod
    public void share(PluginCall call) {
        try {
            String data = call.getString("data");
            String text = call.getString("text", "");
            String title = call.getString("title", "Tanetto");
            String mime = call.getString("mime", "image/png");
            Intent send = new Intent(Intent.ACTION_SEND);
            if (data != null && !data.isEmpty()) {
                File dir = new File(getContext().getCacheDir(), "condivisi");
                if (!dir.exists()) dir.mkdirs();
                File f = new File(dir, safeName(call.getString("name"), "tanetto.png"));
                try (FileOutputStream out = new FileOutputStream(f)) { out.write(Base64.decode(data, Base64.DEFAULT)); }
                Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", f);
                send.setType(mime);
                send.putExtra(Intent.EXTRA_STREAM, uri);
                send.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } else {
                send.setType("text/plain");
            }
            if (!text.isEmpty()) send.putExtra(Intent.EXTRA_TEXT, text);
            send.putExtra(Intent.EXTRA_TITLE, title);
            Intent chooser = Intent.createChooser(send, title);
            chooser.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            getActivity().startActivity(chooser);
            call.resolve();
        } catch (Exception e) {
            call.reject("share failed", "error");
        }
    }

    /** Salva un'immagine nella galleria (cartella Immagini/Tanetto). Su Android vecchi risponde "unsupported": l'app usa Condividi. */
    @PluginMethod
    public void saveImage(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) { call.reject("old android", "unsupported"); return; }
        try {
            String data = call.getString("data");
            String mime = call.getString("mime", "image/png");
            ContentValues v = new ContentValues();
            v.put(MediaStore.Images.Media.DISPLAY_NAME, safeName(call.getString("name"), "tanetto.png"));
            v.put(MediaStore.Images.Media.MIME_TYPE, mime);
            v.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/Tanetto");
            v.put(MediaStore.Images.Media.IS_PENDING, 1);
            ContentResolver r = getContext().getContentResolver();
            Uri uri = r.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, v);
            if (uri == null) { call.reject("no uri", "error"); return; }
            try (OutputStream out = r.openOutputStream(uri)) {
                if (out == null) { call.reject("no stream", "error"); return; }
                out.write(Base64.decode(data, Base64.DEFAULT));
            }
            v.clear();
            v.put(MediaStore.Images.Media.IS_PENDING, 0);
            r.update(uri, v, null, null);
            call.resolve();
        } catch (Exception e) {
            call.reject("save failed", "error");
        }
    }

    /** Salva un file (la copia dei dati) nella cartella Download. Su Android vecchi risponde "unsupported". */
    @PluginMethod
    public void saveFile(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) { call.reject("old android", "unsupported"); return; }
        try {
            String data = call.getString("data");
            ContentValues v = new ContentValues();
            v.put(MediaStore.Downloads.DISPLAY_NAME, safeName(call.getString("name"), "tanetto.json"));
            v.put(MediaStore.Downloads.MIME_TYPE, call.getString("mime", "application/json"));
            v.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
            v.put(MediaStore.Downloads.IS_PENDING, 1);
            ContentResolver r = getContext().getContentResolver();
            Uri uri = r.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, v);
            if (uri == null) { call.reject("no uri", "error"); return; }
            try (OutputStream out = r.openOutputStream(uri)) {
                if (out == null) { call.reject("no stream", "error"); return; }
                out.write(Base64.decode(data, Base64.DEFAULT));
            }
            v.clear();
            v.put(MediaStore.Downloads.IS_PENDING, 0);
            r.update(uri, v, null, null);
            JSObject o = new JSObject();
            o.put("folder", Environment.DIRECTORY_DOWNLOADS);
            call.resolve(o);
        } catch (Exception e) {
            call.reject("save failed", "error");
        }
    }
}
