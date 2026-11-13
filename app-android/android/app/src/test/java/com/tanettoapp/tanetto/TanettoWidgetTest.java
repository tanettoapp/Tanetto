package com.tanettoapp.tanetto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/** 1.0.10: misura dell'immagine del widget (calcoli puri, senza telefono). */
public class TanettoWidgetTest {

    @Test
    public void sampleSizeKeepsImageAtLeastAsBigAsTheWidget() {
        // l'immagine che manda l'app e' 256x256: su qualsiasi widget reale si legge intera
        assertEquals(1, TanettoWidget.sampleSize(256, 256, 286));
        assertEquals(1, TanettoWidget.sampleSize(256, 256, 256));
        assertEquals(1, TanettoWidget.sampleSize(256, 256, 255));
        assertEquals(2, TanettoWidget.sampleSize(256, 256, 128));
        assertEquals(2, TanettoWidget.sampleSize(256, 256, 100));
        // file enorme (es. 4000x3000): ridotto, ma il lato lungo resta >= alla misura chiesta
        int s = TanettoWidget.sampleSize(4000, 3000, 715);
        assertEquals(4, s);
        assertTrue(4000 / s >= 715 && 4000 / (s * 2) < 715);
        assertEquals(8, TanettoWidget.sampleSize(3000, 8000, 1000));
        // misure assurde: nessuna riduzione, nessun errore
        assertEquals(1, TanettoWidget.sampleSize(0, 256, 286));
        assertEquals(1, TanettoWidget.sampleSize(-1, -1, 286));
        assertEquals(1, TanettoWidget.sampleSize(256, 256, 0));
        assertEquals(1, TanettoWidget.sampleSize(Integer.MAX_VALUE, 1, Integer.MAX_VALUE));
        for (int w = 1; w <= 5000; w += 37) for (int req = 1; req <= 1100; req += 53) {
            int k = TanettoWidget.sampleSize(w, w, req);
            assertTrue(Integer.bitCount(k) == 1);
            assertTrue(k == 1 || w / k >= req);
            assertTrue(w / (k * 2) < req);
        }
    }

    @Test
    public void targetPxUsesWidgetSizeWithFallbackAndCap() {
        assertEquals(330, TanettoWidget.targetPx(110, 3f));
        assertEquals(715, TanettoWidget.targetPx(260, 2.75f));
        assertEquals(716, TanettoWidget.targetPx(260, 2.751f));
        assertEquals((int) Math.ceil(TanettoWidget.DEFAULT_MAX_DP * 2f), TanettoWidget.targetPx(0, 2f));
        assertEquals((int) Math.ceil(TanettoWidget.DEFAULT_MAX_DP * 1f), TanettoWidget.targetPx(-5, 0f));
        assertEquals(TanettoWidget.MAX_PX, TanettoWidget.targetPx(2000, 4f));
        assertEquals(1, TanettoWidget.targetPx(1, 0.1f));
    }
}
