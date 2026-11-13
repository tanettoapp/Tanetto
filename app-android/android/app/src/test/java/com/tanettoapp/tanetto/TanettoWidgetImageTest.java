package com.tanettoapp.tanetto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import android.graphics.Bitmap;
import android.graphics.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.RandomAccessFile;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;
import org.robolectric.annotation.GraphicsMode;

/** 1.0.10: TanettoWidget.loadPet con la decodifica vera delle immagini (grafica nativa di Robolectric). */
@RunWith(RobolectricTestRunner.class)
@Config(sdk = 34)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
public class TanettoWidgetImageTest {
    @Rule public TemporaryFolder tmp = new TemporaryFolder();

    private File png(int w, int h) throws Exception {
        Bitmap b = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        b.eraseColor(Color.rgb(78, 138, 74));
        File f = tmp.newFile("pet_" + w + "x" + h + ".png");
        try (FileOutputStream o = new FileOutputStream(f)) { assertTrue(b.compress(Bitmap.CompressFormat.PNG, 100, o)); }
        return f;
    }

    @Test
    public void imageFromTheAppIsReadAtItsOwnSize() throws Exception {
        // come l'app: 256x256; widget piu' grande (715 px) -> nessun ingrandimento, nessuna riduzione
        Bitmap b = TanettoWidget.loadPet(png(256, 256), 715);
        assertNotNull(b);
        assertEquals(256, b.getWidth());
        assertEquals(256, b.getHeight());
    }

    @Test
    public void bigImageIsReducedToTheWidgetSize() throws Exception {
        Bitmap b = TanettoWidget.loadPet(png(3000, 2000), 715);
        assertNotNull(b);
        assertEquals(715, Math.max(b.getWidth(), b.getHeight()));
        assertEquals(477, b.getHeight()); // proporzioni mantenute (2000 * 715 / 3000 = 476,7)
        Bitmap s = TanettoWidget.loadPet(png(256, 256), 200); // widget piccolo: ridotta a 200
        assertEquals(200, s.getWidth());
    }

    @Test
    public void missingEmptyOrBrokenFilesGiveNoImageAndNoCrash() throws Exception {
        assertNull(TanettoWidget.loadPet(null, 500));
        assertNull(TanettoWidget.loadPet(new File(tmp.getRoot(), "non_esiste.png"), 500));
        assertNull(TanettoWidget.loadPet(tmp.newFile("vuoto.png"), 500));
        File junk = tmp.newFile("rovinato.png");
        try (FileOutputStream o = new FileOutputStream(junk)) { o.write("questa non e' un'immagine".getBytes("UTF-8")); }
        assertNull(TanettoWidget.loadPet(junk, 500));
        assertNull(TanettoWidget.loadPet(tmp.getRoot(), 500)); // una cartella al posto del file
        // PNG troncato a meta': nessuna eccezione (puo' tornare null o un'immagine parziale, mai un errore)
        File cut = png(256, 256);
        try (RandomAccessFile r = new RandomAccessFile(cut, "rw")) { r.setLength(Math.max(40, r.length() / 2)); }
        TanettoWidget.loadPet(cut, 500);
    }
}
