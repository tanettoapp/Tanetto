# Regole R8 di Tanetto (1.0.10: R8 acceso nella build release, vedi build.gradle).
# R8 accorcia i nomi di classi e metodi e toglie il codice mai usato. Va protetto solo cio' che si usa PER NOME
# (riflessione): R8 non lo vede e lo toglierebbe o lo rinominerebbe. Tutto il resto lo si lascia offuscare.
# Le librerie (Capacitor, Billing, AdMob, UMP, Credential Manager, Google ID, Play Review, Firebase) portano gia'
# le loro regole dentro l'AAR (consumer rules): controllate a mano nella 1.0.10, elenco in CHANGES_110.md.

# Numeri di riga nelle segnalazioni di crash (Play Console li rimette a posto con mapping.txt, incluso nell'AAB);
# il nome del file sorgente diventa "SourceFile" (non serve a nessuno fuori di qui).
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# --- Plugin Capacitor dell'app (com.tanettoapp.tanetto.*Plugin) ---
# Capacitor li registra da MainActivity, poi legge per riflessione l'annotazione @CapacitorPlugin (nome usato dal
# JavaScript, es. "TanettoWidget") e cerca i metodi @PluginMethod per nome ("update", "products", ...): classi, metodi,
# annotazioni e costruttore senza argomenti devono restare con il loro nome. (Capacitor ha gia' una regola per tutte le
# sottoclassi di Plugin; questa e' esplicita per i nostri, cosi' non dipende da quella.)
-keep @com.getcapacitor.annotation.CapacitorPlugin class com.tanettoapp.tanetto.** {
    public <init>();
    @com.getcapacitor.PluginMethod public <methods>;
    @com.getcapacitor.annotation.PermissionCallback <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
    public void load();
}
# Le annotazioni stesse e i loro campi (name(), returnType(), permissions()...) si leggono a runtime
-keepattributes RuntimeVisibleAnnotations,RuntimeVisibleParameterAnnotations,AnnotationDefault
-keep @interface com.getcapacitor.annotation.CapacitorPlugin { *; }
-keep @interface com.getcapacitor.annotation.Permission { *; }
-keep @interface com.getcapacitor.annotation.PermissionCallback { *; }
-keep @interface com.getcapacitor.annotation.ActivityCallback { *; }
-keep @interface com.getcapacitor.PluginMethod { *; }

# --- Componenti dichiarati nel manifest (Android li crea per nome) ---
# AAPT genera gia' queste regole dal manifest; qui sono esplicite per i nostri.
-keep class com.tanettoapp.tanetto.MainActivity { public <init>(); }
-keep class com.tanettoapp.tanetto.TanettoWidget { public <init>(); }

# --- Ponte JavaScript del WebView ---
# Capacitor parla con la pagina con addJavascriptInterface: i metodi @JavascriptInterface si chiamano per nome dal JS
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# --- Plugin caricati dal file capacitor.plugins.json (Class.forName) ---
# @capacitor/local-notifications: com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin
-keep class com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin { *; }
