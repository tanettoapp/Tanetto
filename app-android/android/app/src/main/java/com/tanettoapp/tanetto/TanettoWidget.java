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
import android.widget.RemoteViews;
import java.io.File;

/**
 * Widget della schermata Home: mostra il compagno (immagine preparata dall'app), il suo nome
 * e come vanno gli obiettivi di oggi. Toccandolo si apre Tanetto.
 */
public class TanettoWidget extends AppWidgetProvider {

    static final String PREFS = "tanetto_widget";
    static final String IMG = "widget_pet.png";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) manager.updateAppWidget(id, views(context));
    }

    static RemoteViews views(Context context) {
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
        File f = new File(context.getFilesDir(), IMG);
        if (f.exists()) {
            Bitmap b = BitmapFactory.decodeFile(f.getAbsolutePath());
            if (b != null) v.setImageViewBitmap(R.id.widget_pet, b);
        }
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
        RemoteViews v = views(context);
        for (int id : ids) m.updateAppWidget(id, v);
    }
}
