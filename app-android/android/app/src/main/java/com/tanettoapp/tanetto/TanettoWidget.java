package com.tanettoapp.tanetto;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.widget.RemoteViews;
import java.io.File;

/**
 * Widget della schermata Home: mostra il compagno (immagine preparata dall'app), il suo nome
 * e come vanno gli obiettivi di oggi. Toccandolo si apre Tanetto.
 */
public class TanettoWidget extends AppWidgetProvider {

    static final String PREFS = "tanetto_widget";
    static final String IMG = "widget_pet.png";

    /* 1.0.10: l'immagine del compagno si legge alla misura massima del widget (non piu' grande): meno memoria e niente
       rischio di superare il limite delle immagini dei widget se il file fosse grande o rovinato */
    static final int DEFAULT_MAX_DP = 260;   /* se Android non dice la misura del widget: piu' di un widget 3x3 */
    static final int MAX_PX = 1024;          /* tetto di sicurezza, qualunque cosa dica il telefono */

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) manager.updateAppWidget(id, views(context, maxPx(context, manager, id)));
    }

    /* Il widget e' stato ingrandito o rimpicciolito: si rilegge l'immagine alla misura nuova */
    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager manager, int id, Bundle newOptions) {
        manager.updateAppWidget(id, views(context, maxPx(context, manager, id)));
    }

    /** Lato piu' lungo (in pixel) che il widget puo' avere sullo schermo, secondo Android (in dp, per i due orientamenti). */
    static int maxPx(Context context, AppWidgetManager manager, int id) {
        int dp = 0;
        try {
            Bundle o = manager.getAppWidgetOptions(id);
            if (o != null) {
                dp = Math.max(Math.max(o.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH), o.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)),
                              Math.max(o.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT), o.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT)));
            }
        } catch (Exception e) { dp = 0; }
        return targetPx(dp, context.getResources().getDisplayMetrics().density);
    }

    /** Da dp a pixel, con la misura di riserva se Android non la dice e il tetto di sicurezza. */
    static int targetPx(int dp, float density) {
        if (dp <= 0) dp = DEFAULT_MAX_DP;
        if (!(density > 0)) density = 1f;
        int px = (int) Math.ceil(dp * density);
        return Math.max(1, Math.min(MAX_PX, px));
    }

    /** Fattore di riduzione (potenza di 2, come vuole BitmapFactory): il piu' grande che lascia l'immagine
     *  almeno grande quanto req sul lato lungo, cosi' non si vede sgranata. 1 = misura originale. */
    static int sampleSize(int w, int h, int req) {
        if (w <= 0 || h <= 0 || req <= 0) return 1;
        int longSide = Math.max(w, h), s = 1;
        while (longSide / (s * 2) >= req) s *= 2;
        return s;
    }

    /** Immagine del compagno preparata dall'app, letta alla misura giusta; null se manca o non si legge. */
    static Bitmap loadPet(File f, int req) {
        if (f == null || !f.isFile() || f.length() == 0) return null;
        try {
            BitmapFactory.Options b = new BitmapFactory.Options();
            b.inJustDecodeBounds = true;          /* prima solo le misure, senza caricare i pixel */
            BitmapFactory.decodeFile(f.getAbsolutePath(), b);
            if (b.outWidth <= 0 || b.outHeight <= 0) return null;   /* file rovinato o non e' un'immagine */
            BitmapFactory.Options o = new BitmapFactory.Options();
            o.inSampleSize = sampleSize(b.outWidth, b.outHeight, req);
            Bitmap bmp = BitmapFactory.decodeFile(f.getAbsolutePath(), o);
            if (bmp == null) return null;
            int longSide = Math.max(bmp.getWidth(), bmp.getHeight());
            if (longSide > req) {
                /* la riduzione a potenze di 2 puo' lasciarla fino a 2 volte piu' grande: si porta alla misura esatta */
                float k = (float) req / longSide;
                Bitmap s = Bitmap.createScaledBitmap(bmp, Math.max(1, Math.round(bmp.getWidth() * k)), Math.max(1, Math.round(bmp.getHeight() * k)), true);
                if (s != bmp) bmp.recycle();  /* quella intermedia non serve piu'; quella finale la tiene il widget */
                bmp = s;
            }
            return bmp;
        } catch (OutOfMemoryError | RuntimeException e) {
            return null;  /* il widget resta con l'immagine di partenza, ma funziona */
        }
    }

    static RemoteViews views(Context context, int maxPx) {
        RemoteViews v = new RemoteViews(context.getPackageName(), R.layout.widget_tanetto);
        SharedPreferences p = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String name = p.getString("name", null);
        String line = p.getString("line", null);
        /* I dati sono di un altro giorno (l'app non e' ancora stata aperta oggi): niente numeri vecchi, solo "Apri Tanetto" */
        String day = p.getString("day", "");
        String today = new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.US).format(new java.util.Date());
        if (!today.equals(day)) line = context.getString(R.string.widget_open);
        if (name != null && !name.isEmpty()) v.setTextViewText(R.id.widget_name, name);
        if (line != null && !line.isEmpty()) v.setTextViewText(R.id.widget_line, line);
        Bitmap b = loadPet(new File(context.getFilesDir(), IMG), maxPx);
        if (b != null) v.setImageViewBitmap(R.id.widget_pet, b);
        Intent open = new Intent(context, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pi = PendingIntent.getActivity(context, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        v.setOnClickPendingIntent(R.id.widget_root, pi);
        return v;
    }

    static void refreshAll(Context context) {
        AppWidgetManager m = AppWidgetManager.getInstance(context);
        int[] ids = m.getAppWidgetIds(new ComponentName(context, TanettoWidget.class));
        if (ids == null || ids.length == 0) return;
        for (int id : ids) m.updateAppWidget(id, views(context, maxPx(context, m, id)));
    }
}
