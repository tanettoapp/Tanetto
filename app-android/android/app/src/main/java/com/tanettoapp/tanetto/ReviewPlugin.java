package com.tanettoapp.tanetto;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;

/* Chiede la recensione del Play Store dentro l'app (finestra ufficiale di Google).
   Google decide da solo se e quando mostrarla: la chiamata non da' mai errore all'utente. */
@CapacitorPlugin(name = "Review")
public class ReviewPlugin extends Plugin {
    @PluginMethod
    public void requestReview(PluginCall call) {
        try {
            ReviewManager manager = ReviewManagerFactory.create(getContext());
            manager.requestReviewFlow().addOnCompleteListener(task -> {
                if (!task.isSuccessful() || getActivity() == null) { call.resolve(); return; }
                ReviewInfo info = task.getResult();
                manager.launchReviewFlow(getActivity(), info).addOnCompleteListener(done -> call.resolve());
            });
        } catch (Exception e) {
            call.resolve();
        }
    }
}
