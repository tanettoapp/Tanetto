/* =================== SUONI E MUSICA (sintetizzati, nessun file esterno) =================== */
const SND = (() => {
  let an = null, ctx = null, master = null, fxBus = null, musicBus = null, verb = null, musicTimer = null, nextT = 0, step = 0, pad = null, lastAt = 0;
  let cur = 0, song = null, onTrack = null;
  function impulse(c, secs, decay) {
    const len = Math.floor(c.sampleRate * secs), buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  }
  /* v17: l'eco della musica si prepara a pezzetti, senza bloccare il primo tocco (prima costava ~100 ms sui telefoni lenti) */
  function impulseLater(c, secs, decay, done) {
    const len = Math.floor(c.sampleRate * secs), buf = c.createBuffer(2, len, c.sampleRate);
    const d0 = buf.getChannelData(0), d1 = buf.getChannelData(1); let i = 0;
    const step = () => { const end = Math.min(len, i + 8000); for (; i < end; i++) { const k = Math.pow(1 - i / len, decay); d0[i] = (Math.random() * 2 - 1) * k; d1[i] = (Math.random() * 2 - 1) * k; } if (i < len) setTimeout(step, 0); else done(buf); };
    setTimeout(step, 30);
  }
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctx = new AC();
        master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
        an = ctx.createAnalyser(); an.fftSize = 2048; master.connect(an);
        const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3; comp.connect(master);
        fxBus = ctx.createGain(); fxBus.gain.value = 0.7; fxBus.connect(comp);
        musicBus = ctx.createGain(); musicBus.gain.value = 0; const warm = ctx.createBiquadFilter(); warm.type = "lowpass"; warm.frequency.value = 2600; warm.Q.value = 0.5; musicBus.connect(warm); warm.connect(comp);
        verb = ctx.createConvolver(); impulseLater(ctx, 2.2, 2.6, (bf) => { try { verb.buffer = bf; } catch (e) { /* niente */ } });
        const wet = ctx.createGain(); wet.gain.value = 0.38; musicBus.connect(verb); verb.connect(wet); wet.connect(comp);
      } catch (e) { ctx = null; return null; }
    }
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) { /* niente */ } }
    return ctx;
  }
  function tone(f, t0, dur, o = {}) {
    const { type = "sine", vol = 0.2, attack = 0.006, dest = fxBus, glide = null, filter = null } = o;
    if (![f, t0, dur, vol].every(Number.isFinite)) return;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(f, t0);
    if (glide) osc.frequency.exponentialRampToValueAtTime(glide, t0 + dur * 0.8);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    if (filter) { const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = filter; osc.connect(lp); lp.connect(g); } else osc.connect(g);
    g.connect(dest); osc.start(t0); osc.stop(t0 + dur + 0.05);
  }
  function noise(t0, dur, vol, freq, dest = fxBus) {
    const len = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 1.2;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp); bp.connect(g); g.connect(dest); src.start(t0); src.stop(t0 + dur + 0.02);
  }
  function bell(f, t0, vol = 0.18, dest = fxBus, len = 1.2) {
    tone(f, t0, len, { type: "sine", vol, dest });
    tone(f * 2, t0, len * 0.6, { type: "sine", vol: vol * 0.35, dest });
    tone(f * 3.01, t0, len * 0.3, { type: "triangle", vol: vol * 0.12, dest });
  }
  const INST = {
    bell: (f, t, v, d) => bell(f, t, v, d, 1.6),
    box: (f, t, v, d) => { tone(f, t, 1.1, { vol: v, dest: d }); tone(f * 2, t, 0.5, { vol: v * 0.45, dest: d }); tone(f * 4, t, 0.12, { vol: v * 0.12, dest: d }); },
    marimba: (f, t, v, d) => { tone(f, t, 0.45, { vol: v * 1.2, dest: d, attack: 0.003 }); tone(f * 3.9, t, 0.06, { vol: v * 0.25, dest: d, attack: 0.002 }); },
    keys: (f, t, v, d) => { tone(f, t, 1.2, { type: "triangle", vol: v, dest: d, attack: 0.012, filter: 1600 }); tone(f / 2, t, 1.0, { vol: v * 0.3, dest: d, attack: 0.02 }); },
    kalimba: (f, t, v, d) => { tone(f, t, 0.9, { vol: v * 1.1, dest: d, attack: 0.002 }); tone(f * 5.4, t, 0.08, { vol: v * 0.12, dest: d, attack: 0.002 }); tone(f * 2.01, t, 0.3, { vol: v * 0.2, dest: d }); },
    harp: (f, t, v, d) => { tone(f, t, 1.4, { type: "triangle", vol: v * 0.9, dest: d, attack: 0.004, filter: 2400 }); tone(f * 2, t, 0.6, { vol: v * 0.2, dest: d }); },
    flute: (f, t, v, d) => { const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain(); o.type = "sine"; o.frequency.value = f; lfo.frequency.value = 5; lg.gain.value = f * 0.006; lfo.connect(lg); lg.connect(o.frequency); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v * 0.7, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1); o.connect(g); g.connect(d); o.start(t); lfo.start(t); o.stop(t + 1.2); lfo.stop(t + 1.2); }
  };
  const FX = {
    tap: (t) => { tone(740, t, 0.07, { vol: 0.12, glide: 980 }); },
    pop: (t) => { tone(520, t, 0.16, { type: "sine", vol: 0.3, glide: 980 }); tone(1040, t + 0.05, 0.12, { vol: 0.1 }); },
    chime: (t) => { [784, 988, 1319].forEach((f, i) => bell(f, t + i * 0.075, 0.2, fxBus, 0.9)); },
    coin: (t) => { tone(988, t, 0.09, { type: "triangle", vol: 0.2 }); tone(1319, t + 0.08, 0.32, { type: "triangle", vol: 0.2 }); },
    fanfare: (t) => { [523, 659, 784].forEach((f, i) => bell(f, t + i * 0.12, 0.2, fxBus, 0.7)); bell(1047, t + 0.38, 0.25, fxBus, 1.6); tone(523, t + 0.38, 1.4, { type: "triangle", vol: 0.08 }); },
    logo: (t) => { tone(392, t, 0.32, { vol: 0.09, glide: 784 }); [784, 988, 1175, 1568].forEach((f, i) => bell(f, t + 0.16 + i * 0.085, 0.13, fxBus, 0.9)); [523, 659, 784].forEach((f) => tone(f, t + 0.5, 0.95, { type: "triangle", vol: 0.05, attack: 0.06, filter: 1800 })); [2093, 2637].forEach((f, i) => bell(f, t + 0.62 + i * 0.06, 0.06, fxBus, 0.6)); },
    jingle: (t) => { [1319, 1568, 1760, 2093, 1760].forEach((f, i) => bell(f, t + i * 0.07, 0.13, fxBus, 0.6)); },
    depart: (t) => { tone(330, t, 0.6, { type: "triangle", vol: 0.18, glide: 990 }); noise(t, 0.5, 0.12, 1800); },
    back: (t) => { [659, 784, 988, 1175].forEach((f, i) => bell(f, t + i * 0.09, 0.16, fxBus, 0.8)); },
    click: (t) => { tone(1200, t, 0.05, { vol: 0.08, glide: 1600 }); },
    buy: (t) => { tone(784, t, 0.1, { type: "triangle", vol: 0.18 }); bell(1175, t + 0.08, 0.18, fxBus, 0.7); },
    chomp: (t) => { [0, 0.16, 0.32].forEach((d) => { noise(t + d, 0.07, 0.35, 900); tone(220, t + d, 0.08, { vol: 0.12, glide: 140 }); }); },
    purr: (t) => { tone(160, t, 0.18, { vol: 0.12, glide: 120 }); },
    giggle: (t) => { [880, 990, 880, 1040, 920].forEach((f, i) => tone(f, t + i * 0.07, 0.07, { vol: 0.12, glide: f * 1.15 })); },
    shutter: (t) => { noise(t, 0.05, 0.5, 3000); noise(t + 0.08, 0.06, 0.35, 2000); },
    paper: (t) => { noise(t, 0.25, 0.18, 4200); noise(t + 0.15, 0.2, 0.12, 3200); },
    sparkle: (t) => { [1568, 2093, 2637].forEach((f, i) => bell(f, t + i * 0.05, 0.08, fxBus, 0.5)); },
    lightoff: (t) => { tone(660, t, 0.3, { vol: 0.12, glide: 330 }); },
    lighton: (t) => { tone(440, t, 0.3, { vol: 0.12, glide: 880 }); bell(1319, t + 0.15, 0.1, fxBus, 0.6); },
    beep: (t) => { tone(880, t, 0.12, { type: "triangle", vol: 0.14 }); },
    go: (t) => { tone(1319, t, 0.3, { type: "triangle", vol: 0.16 }); },
    miss: (t) => { tone(300, t, 0.15, { vol: 0.08, glide: 200 }); }
  };
  /* 1.0.9: LOGO SONORO di Tanetto (come nel video): ogni obiettivo spuntato suona la nota successiva di
     Sol5-La5-Si5-Re6 (gradi 1-2-3-5 di Sol maggiore), la giornata completa suona il "chime" Sol-Si-Re che finisce
     sulla dominante. Kalimba a modello fisico leggero (lamella incastrata: parziali 1 : 6.27 : 17.55, ronzio di 2a
     armonica, colpo di cassa in legno, tocco di unghia) + celesta un'ottava sopra a -9 dB. Nessun file audio.
     Funzioni pure (contesto e uscita come argomenti): le usano anche i test con un OfflineAudioContext. */
  const LOGO_HZ = [783.99, 880.0, 987.77, 1174.66];          /* G5 A5 B5 D6 */
  const CHIME_HZ = [783.99, 987.77, 1174.66];                /* G5 B5 D6 */
  const S16 = 60 / 112.5 / 4;                                /* sedicesimo a 112,5 BPM (tempo del video) */
  let noiseBuf = null;
  function logoPart(c, d, f, t, amp, tau, type) {
    if (!(f > 20 && f < c.sampleRate * 0.45) || !(amp > 0)) return;
    const o = c.createOscillator(), g = c.createGain(); o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(amp, t + 0.0012); g.gain.setTargetAtTime(0, t + 0.0012, tau);
    o.connect(g); g.connect(d); o.start(t); o.stop(t + 0.0012 + tau * 7);
  }
  function logoKal(c, d, f, t, a, pan, tail, knock) {
    let out = d;
    if (pan && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = pan; p.connect(d); out = p; }
    const T0 = tail || 1;
    logoPart(c, out, f, t, a, 0.19 * T0);                     /* lamella */
    logoPart(c, out, f * 2, t, a * 0.06, 0.11 * T0);          /* 2a armonica (ronzio) */
    logoPart(c, out, f * 6.27, t, a * 0.75, 0.05);            /* modo della lamella incastrata */
    logoPart(c, out, f * 17.55, t, a * 0.06, 0.009);          /* modo alto, solo se sotto Nyquist */
    logoPart(c, out, 238 + (f % 24), t, a * 0.9 * (knock == null ? 1 : knock), 0.03);       /* colpo della cassa di legno */
    logoPart(c, out, f * 2, t, a * 0.05, 0.24 * T0);           /* celesta all'ottava (-9 dB circa con il ronzio) */
    logoPart(c, out, f * 8, t, a * 0.018, 0.05);              /* luccichio della celesta */
    /* tocco del pollice: 4 ms di rumore filtrato 1,2-6 kHz */
    try {
      if (!noiseBuf || noiseBuf.sampleRate !== c.sampleRate) { const n = Math.floor(c.sampleRate * 0.006); noiseBuf = c.createBuffer(1, n, c.sampleRate); const x = noiseBuf.getChannelData(0); let r = 7; for (let i = 0; i < n; i++) { r = (r * 16807) % 2147483647; x[i] = (r / 1073741823.5 - 1) * Math.exp(-i / (0.0008 * c.sampleRate)); } }
      const src = c.createBufferSource(), bp = c.createBiquadFilter(), g = c.createGain(); src.buffer = noiseBuf; bp.type = "bandpass"; bp.frequency.value = 2700; bp.Q.value = 0.8; g.gain.value = a * 0.4;
      src.connect(bp); bp.connect(g); g.connect(out); src.start(t); src.stop(t + 0.008);
    } catch (e) { /* niente */ }
  }
  /* k = quanti obiettivi sono fatti oggi (1, 2, 3...): la nota gira G A B D G A... */
  function logoTickTo(c, d, k, t) { const i = (Math.max(1, k | 0) - 1) % 4; logoKal(c, d, LOGO_HZ[i], t, 0.26, i % 2 ? 0.18 : -0.18); return LOGO_HZ[i]; }
  function logoChimeTo(c, d, t) {
    const vel = [1, 0.86, 0.92];
    CHIME_HZ.forEach((f, i) => { const ti = t + i * S16; logoKal(c, d, f, ti, 0.24 * vel[i], (i - 1) * 0.16, i === 2 ? 1.25 : 1, 0.3); logoPart(c, d, f * 2, ti, 0.012 * vel[i], i === 2 ? 0.4 : 0.22); });
    return CHIME_HZ.slice();
  }
  /* rispettano le impostazioni: niente suono con "Suoni" spento */
  function logoTick(k) { lastAt = performance.now(); if (!S.sfx) return null; const c = ensure(); if (!c) return null; try { return logoTickTo(c, fxBus, k, c.currentTime + 0.005); } catch (e) { return null; } }
  function logoChime(delay) { lastAt = performance.now(); if (!S.sfx) return null; const c = ensure(); if (!c) return null; try { return logoChimeTo(c, fxBus, c.currentTime + 0.005 + (delay || 0)); } catch (e) { return null; } }
  let combo = 0, comboAt = 0;
  function catchSound(gold) {
    if (!S.sfx) return; const c = ensure(); if (!c) return; lastAt = performance.now();
    const now = performance.now(); combo = now - comboAt < 900 ? Math.min(combo + 1, 7) : 0; comboAt = now;
    const PENT = [784, 880, 988, 1175, 1319, 1568, 1760, 2093];
    try { bell(PENT[combo], c.currentTime + 0.005, gold ? 0.22 : 0.15, fxBus, 0.5); if (gold) FX.sparkle(c.currentTime + 0.05); } catch (e) { /* niente */ }
  }
  function play(name) {
    lastAt = performance.now();
    if (!S.sfx || !FX[name]) return;
    const c = ensure(); if (!c) return;
    try { FX[name](c.currentTime + 0.01); } catch (e) { /* niente */ }
  }
  /* 1.0.9 (fase 3): il motivo di ogni compagno (scratchpad/gpu/characters.md), tutti in Sol maggiore pentatonico come il
     logo, con la stessa kalimba/celesta; brevi (sotto 1,2 s), piano, mai insistenti. Germo = il logo stesso. */
  const E8 = S16 * 2;
  const MOTIF = {
    germo: (c, d, t) => { LOGO_HZ.forEach((f, i) => logoKal(c, d, f, t + i * S16, 0.2, i % 2 ? 0.15 : -0.15)); },
    ondi: (c, d, t) => { [587.33, 493.88, 392.0].forEach((f, i) => logoKal(c, d, f, t + i * E8 * 1.5, 0.2 - i * 0.03, -0.1, 1.5)); /* goccia */ tone(1400, t + E8 * 4.4, 0.12, { vol: 0.05, glide: 700, dest: d }); },
    lumi: (c, d, t) => { [987.77, 1174.66, 1567.98].forEach((f, i) => { bell(f, t + i * E8 * 1.4, 0.11, d, 1.6); tone(f * 2, t + i * E8 * 1.4, 0.9, { vol: 0.012, dest: d }); }); },
    miko: (c, d, t) => { logoKal(c, d, 987.77, t, 0.18, -0.1); tone(1108.73, t + E8, 0.45, { vol: 0.07, glide: 1174.66, dest: d, attack: 0.01 }); /* fusa */ tone(70, t + E8, 0.5, { type: "triangle", vol: 0.03, dest: d, filter: 300 }); },
    rufi: (c, d, t) => { [880.0, 987.77, 1174.66, 1318.51].forEach((f, i) => logoKal(c, d, f, t + i * S16 * 0.8, 0.16, (i - 1.5) * 0.1, 0.5)); },
    pingo: (c, d, t) => { [[783.99, 0, 0.6], [783.99, E8, 0.6], [1174.66, E8 * 2, 1.3]].forEach(([f, dt, tl]) => { tone(f, t + dt, 0.2 * tl, { type: "sine", vol: 0.1, dest: d, attack: 0.003 }); tone(f * 4, t + dt, 0.05, { vol: 0.03, dest: d, attack: 0.002 }); }); },
    dori: (c, d, t) => { tone(392.0, t, 0.7, { type: "triangle", vol: 0.07, dest: d, filter: 1200, attack: 0.03 }); tone(493.88, t, 0.7, { type: "triangle", vol: 0.06, dest: d, filter: 1200, attack: 0.03 }); noise(t + 0.45, 0.12, 0.03, 900, d); bell(1975.53, t + 0.62, 0.07, d, 0.9); }
  };
  function petMotif(pet) {
    lastAt = performance.now(); if (!S.sfx) return false; const f = MOTIF[pet] || MOTIF.germo; const c = ensure(); if (!c) return false;
    try { f(c, fxBus, c.currentTime + 0.02); return true; } catch (e) { return false; }
  }
  function haptic(p = 8) { try { if (S.haptic && navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(p); } catch (e) { /* niente */ } } /* 1.0.9: prima di un tocco il sistema la blocca comunque (e scrive un errore): una finestra che si apre da sola non vibra */

  /* --- Musica: 12 brani, ognuno con stile, strumenti, tempo e ritmo diversi --- */
  const N = (s) => 440 * Math.pow(2, s / 12);
  const MODES = { major: [0, 2, 4, 5, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10], lydian: [0, 2, 4, 6, 7, 9, 11], penta: [0, 2, 4, 7, 9], mixo: [0, 2, 4, 5, 7, 9, 10] };
  const VOL = { bell: 0.08, box: 0.09, marimba: 0.09, keys: 0.1, kalimba: 0.1, harp: 0.09, flute: 0.08, chip: 0.05, guitar: 0.1, celesta: 0.08, epiano: 0.11 };
  Object.assign(INST, {
    chip: (f, t, v, d) => { tone(f, t, 0.28, { type: "square", vol: v * 0.7, dest: d, attack: 0.004, filter: 1500 }); },
    guitar: (f, t, v, d) => { tone(f, t, 0.9, { type: "triangle", vol: v, dest: d, attack: 0.003, filter: 1800 }); tone(f * 2, t, 0.25, { type: "sawtooth", vol: v * 0.06, dest: d, attack: 0.003, filter: 2500 }); },
    epiano: (f, t, v, d) => { tone(f, t, 1.8, { vol: v, dest: d, attack: 0.012, filter: 1800 }); tone(f * 2, t, 0.7, { vol: v * 0.16, dest: d, attack: 0.01 }); tone(f / 2, t, 1.2, { vol: v * 0.18, dest: d, attack: 0.03 }); },
    celesta: (f, t, v, d) => { tone(f, t, 1.8, { vol: v, dest: d, attack: 0.003 }); tone(f * 4, t, 0.25, { vol: v * 0.18, dest: d }); }
  });
  const TRACKS = [
    { root: 3, mode: "major", beat: 0.4, per: 8, prog: [0, 4, 5, 3], mel: "epiano", dens: 0.42, acc: "broken", accI: "harp", bass: "root", drums: null, g: 0.95, seed: 11 },
    { root: -2, mode: "mixo", beat: 0.27, per: 8, prog: [0, 3, 6, 4], mel: "marimba", dens: 0.55, acc: "hits", accI: "epiano", bass: "walk", drums: "tick", g: 1.2, seed: 23 },
    { root: -4, mode: "dorian", beat: 0.33, per: 8, prog: [0, 3, 1, 4], mel: "keys", dens: 0.38, acc: "block", accI: "keys", bass: "root", drums: "lofi", swing: 0.12, seventh: true, g: 1.02, seed: 37 },
    { root: 3, mode: "major", beat: 0.5, per: 6, prog: [0, 3, 4, 0], mel: "epiano", dens: 0.42, acc: "waltz", accI: "epiano", bass: "root", drums: null, g: 1.0, seed: 5 },
    { root: 0, mode: "penta", beat: 0.3, per: 8, prog: [0, 0, 3, 2], mel: "kalimba", dens: 0.32, acc: "ostinato", accI: "kalimba", bass: "drone", drums: null, g: 1.05, seed: 41 },
    { root: 5, mode: "lydian", beat: 0.5, per: 8, prog: [0, 1, 0, 4], mel: "celesta", dens: 0.28, acc: "pad", accI: "keys", bass: "drone", drums: null, bed: "rain", g: 1.06, seed: 52 },
    { root: 2, mode: "major", beat: 0.5, per: 8, prog: [0, 5, 3, 4], mel: "flute", dens: 0.3, long: true, acc: "pad", accI: "keys", bass: "root", drums: null, g: 1.42, seed: 63 },
    { root: -1, mode: "major", beat: 0.3, per: 8, prog: [1, 4, 0, 5], mel: "flute", dens: 0.38, acc: "bossa", accI: "guitar", bass: "bossa", drums: "shaker", seventh: true, g: 1.3, seed: 74 },
    { root: 1, mode: "major", beat: 0.36, per: 6, prog: [0, 5, 3, 4], mel: "epiano", dens: 0.32, acc: "arp6", accI: "harp", bass: "root", drums: null, g: 0.85, seed: 85 },
    { root: -5, mode: "dorian", beat: 0.32, per: 8, prog: [0, 6, 3, 0], mel: "flute", dens: 0.42, acc: "strum", accI: "guitar", bass: "root", drums: "tick", g: 1.32, seed: 96 },
    { root: 0, mode: "major", beat: 0.36, per: 8, prog: [0, 2, 3, 4], mel: "keys", dens: 0.42, long: true, acc: "broken", accI: "keys", bass: "root", drums: null, g: 1.01, seed: 107 },
    { root: 7, mode: "lydian", beat: 0.55, per: 6, prog: [0, 4, 1, 0], mel: "celesta", dens: 0.32, acc: "pad", accI: "keys", bass: "drone", drums: null, g: 1.42, seed: 118 }
  ];
  /* Brani con melodie composte (ritornelli che si ripetono) */
  const TUNES = [
    { root: 0, mode: "major", beat: 0.3, per: 8, prog: [0, 3, 0, 4], mel: "epiano", acc: "broken", accI: "harp", bass: "root", drums: null, g: 0.7,
      A: [9, -1, 11, -1, 12, 11, 9, -1, 10, -1, 12, -1, 11, -1, -1, -1, 9, -1, 11, -1, 14, 12, 11, -1, 10, 9, 8, -1, 7, -1, -1, -1], B: [12, -1, 12, 13, 14, -1, 12, -1, 11, -1, 11, 12, 13, -1, 11, -1, 10, -1, 10, 11, 12, -1, 10, -1, 9, -1, 8, -1, 7, -1, -1, -1] },
    { root: 2, mode: "major", beat: 0.27, per: 8, prog: [0, 1, 0, 4], mel: "marimba", acc: "hits", accI: "epiano", bass: "walk", drums: "tick", g: 1.15,
      A: [7, 9, 11, 9, 14, -1, 11, -1, 8, 10, 12, 10, 13, -1, 12, -1, 7, 9, 11, 9, 14, -1, 16, -1, 15, 14, 13, 12, 11, -1, -1, -1], B: [14, -1, 13, -1, 12, -1, 11, -1, 12, -1, 11, -1, 10, -1, 9, -1, 10, -1, 11, -1, 12, -1, 13, -1, 14, -1, -1, -1, -1, -1, -1, -1] },
    { root: -3, mode: "major", beat: 0.38, per: 8, prog: [0, 3, 1, 4], mel: "epiano", acc: "block", accI: "keys", bass: "root", drums: "lofi", swing: 0.12, seventh: true, g: 0.8,
      A: [11, -1, -1, 12, 11, -1, 9, -1, 10, -1, -1, 11, 10, -1, 8, -1, 9, -1, -1, 10, 9, -1, 7, -1, 8, -1, 9, -1, 7, -1, -1, -1], B: [12, -1, -1, 13, 12, -1, 11, -1, 11, -1, -1, 12, 11, -1, 9, -1, 10, -1, 11, -1, 12, -1, 13, -1, 14, -1, -1, -1, -1, -1, -1, -1] },
    { root: 4, mode: "penta", beat: 0.28, per: 8, prog: [0, 0, 3, 2], mel: "kalimba", acc: "ostinato", accI: "kalimba", bass: "drone", drums: null, g: 1.05,
      A: [5, 7, 8, -1, 10, -1, 8, -1, 9, 8, 7, -1, 6, -1, -1, -1, 5, 7, 8, -1, 10, -1, 11, -1, 10, 9, 8, -1, 7, -1, -1, -1], B: [10, -1, 9, -1, 8, -1, 9, -1, 8, -1, 7, -1, 6, -1, 7, -1, 8, -1, 8, 9, 10, -1, 8, -1, 7, 6, 5, -1, 5, -1, -1, -1] },
    { root: 5, mode: "major", beat: 0.4, per: 6, prog: [0, 3, 4, 0], mel: "epiano", acc: "waltz", accI: "harp", bass: "root", drums: null, g: 1.0,
      A: [7, -1, 9, 11, -1, 9, 10, -1, 12, 11, -1, -1, 9, -1, 11, 14, -1, 12, 11, -1, 10, 9, -1, -1], B: [12, -1, 11, 10, -1, 9, 11, -1, 10, 9, -1, 8, 10, -1, 9, 8, -1, 9, 7, -1, -1, -1, -1, -1] },
    { root: 7, mode: "lydian", beat: 0.45, per: 8, prog: [0, 1, 0, 4], mel: "celesta", acc: "pad", accI: "keys", bass: "drone", drums: null, g: 1.35,
      A: [11, -1, 13, -1, 15, -1, 14, -1, 13, -1, 11, -1, 10, -1, -1, -1, 11, -1, 13, -1, 16, -1, 15, -1, 14, -1, -1, -1, -1, -1, -1, -1], B: [14, -1, 13, -1, 11, -1, 13, -1, 12, -1, 10, -1, 9, -1, -1, -1, 10, -1, 11, -1, 13, -1, 12, -1, 11, -1, -1, -1, -1, -1, -1, -1] },
    { root: 0, mode: "major", beat: 0.25, per: 8, prog: [0, 1, 2, 4], mel: "marimba", acc: "arp", accI: "epiano", bass: "walk", drums: "shaker", g: 0.66,
      A: [7, 7, 9, 11, 12, 11, 9, 7, 8, 8, 10, 12, 13, 12, 10, 8, 9, 9, 11, 13, 14, 13, 11, 9, 10, 9, 8, 9, 7, -1, -1, -1], B: [14, -1, 12, -1, 11, -1, 9, -1, 13, -1, 11, -1, 10, -1, 8, -1, 12, -1, 10, -1, 9, -1, 8, -1, 7, -1, 9, -1, 7, -1, -1, -1] },
    { root: -2, mode: "dorian", beat: 0.3, per: 8, prog: [0, 3, 0, 4], mel: "flute", acc: "bossa", accI: "guitar", bass: "bossa", drums: "shaker", seventh: true, g: 1.25,
      A: [7, -1, 10, -1, 9, 10, 11, -1, 10, -1, 9, -1, 7, -1, -1, -1, 8, -1, 11, -1, 10, 11, 12, -1, 11, -1, 10, -1, 8, -1, -1, -1], B: [12, -1, 11, -1, 10, -1, 9, -1, 11, -1, 10, -1, 9, -1, 8, -1, 9, -1, 10, -1, 11, -1, 12, -1, 10, -1, -1, -1, -1, -1, -1, -1] },
    { root: 3, mode: "major", beat: 0.42, per: 8, prog: [0, 5, 3, 4], mel: "epiano", acc: "arp", accI: "harp", bass: "root", drums: null, bed: "rain", g: 0.75,
      A: [9, -1, -1, 11, 12, -1, 11, -1, 9, -1, -1, 8, 7, -1, -1, -1, 8, -1, -1, 9, 10, -1, 12, -1, 11, -1, -1, -1, -1, -1, -1, -1], B: [12, -1, -1, 14, 13, -1, 12, -1, 11, -1, -1, 10, 9, -1, -1, -1, 10, -1, 12, -1, 11, -1, 8, -1, 7, -1, -1, -1, -1, -1, -1, -1] }
  ];
  TUNES.forEach((x, i) => { x.seed = 200 + i; x.dens = 0.4; TRACKS.push(x); });
  let bed = null;
  function rng(seed) { let a = seed; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function noteF(tr, k, oct = 0) { const m = MODES[tr.mode]; const L = m.length; const o = Math.floor(k / L); return N(tr.root + m[((k % L) + L) % L] + 12 * (o + oct)); }
  function chordIdx(tr, d) { const L = MODES[tr.mode].length; if (L === 5) return [d, d + 2, d + 3]; return tr.seventh ? [d, d + 2, d + 4, d + 6] : [d, d + 2, d + 4]; }
  function buildSong(i) {
    const tr = TRACKS[i], r = rng(tr.seed); const L = MODES[tr.mode].length;
    if (tr.A) { const cut = (a) => [0, 1, 2, 3].map((k) => a.slice(k * tr.per, (k + 1) * tr.per)); const A = cut(tr.A), B = cut(tr.B); const end = A[3].map(() => -1); end[0] = chordIdx(tr, tr.prog[0])[0] + L; return { tr, bars: [...A, ...A, ...B, ...A, ...B, ...A.slice(0, 3), end] }; }
    const phrase = () => tr.prog.map((d) => {
      const ch = chordIdx(tr, d); const bar = []; let last = ch[0] + L;
      for (let s = 0; s < tr.per; s++) {
        if (tr.long && s % 4 !== 0) { bar.push(-1); continue; }
        const strong = s % 2 === 0;
        if (r() < (strong ? tr.dens + 0.18 : tr.dens - 0.3)) {
          let idx = r() < 0.65 ? ch[Math.floor(r() * ch.length)] + L : last + (r() < 0.5 ? -1 : 1);
          idx = Math.max(L - 2, Math.min(L * 2 + 2, idx)); last = idx; bar.push(idx);
        } else bar.push(-1);
      }
      return bar;
    });
    const A = phrase(), B = phrase(), C = phrase();
    const end = A[3].map(() => -1); end[0] = chordIdx(tr, tr.prog[0])[0] + L;
    return { tr, bars: [...A, ...B, ...A, ...C, ...A, ...B, ...A.slice(0, 3), end] };
  }
  function drum(kind, t, s, per) {
    if (kind === "lofi") {
      if (s === 0 || s === 5) { tone(120, t, 0.22, { vol: 0.22, glide: 45, dest: musicBus }); }
      if (s === 4) noise(t, 0.16, 0.09, 1800, musicBus);
      if (s % 2 === 0) noise(t, 0.04, 0.035, 8000, musicBus);
    } else if (kind === "shaker") { noise(t, 0.05, s % 2 ? 0.05 : 0.025, 6500, musicBus); if (s === 0) tone(90, t, 0.2, { vol: 0.12, glide: 50, dest: musicBus }); }
    else if (kind === "tick") { if (s % 2 === 0) tone(s === 0 ? 1400 : 1100, t, 0.04, { vol: 0.035, dest: musicBus }); }
  }
  function startBed(kind) {
    stopBed(); if (kind !== "rain" || !ctx) return;
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2200; const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 400;
    const g = ctx.createGain(); g.gain.value = 0.0001; g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
    src.connect(lp); lp.connect(hp); hp.connect(g); g.connect(musicBus); src.start(); bed = { src, g };
  }
  function stopBed() { if (!bed || !ctx) return; const b = bed; bed = null; b.g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1); setTimeout(() => { try { b.src.stop(); } catch (e) { /* niente */ } }, 1200); }
  function schedule() {
    if (!ctx || !song) return;
    const { tr, bars } = song; const L = MODES[tr.mode].length; const I = INST[tr.mel], A = INST[tr.accI];
    while (nextT < ctx.currentTime + 0.5) {
      const bi = Math.floor(step / tr.per), si = step % tr.per;
      if (bi >= bars.length) { next(); return; }
      const d = tr.prog[bi % 4]; const ch = chordIdx(tr, d); const t = nextT + (tr.swing && si % 2 ? tr.beat * tr.swing : 0);
      const barLen = tr.beat * tr.per; const av = VOL[tr.accI] * 0.55;
      /* basso */
      if (tr.bass === "root" && si === 0) tone(noteF(tr, d, -2), t, barLen * 0.9, { vol: 0.15, dest: musicBus, attack: 0.03 });
      if (tr.bass === "drone" && si === 0 && bi % 2 === 0) tone(noteF(tr, 0, -2), t, barLen * 2, { vol: 0.09, dest: musicBus, attack: 0.6 });
      if (tr.bass === "walk" && si % 2 === 0) tone(noteF(tr, d + [0, 2, 4, 2][si / 2], -2), t, tr.beat * 1.6, { type: "triangle", vol: 0.13, dest: musicBus, attack: 0.005 });
      if (tr.bass === "bossa" && (si === 0 || si === 3 || si === 4 || si === 7)) tone(noteF(tr, si < 4 ? d : d + 4, -2), t, tr.beat * 1.4, { vol: 0.14, dest: musicBus, attack: 0.005 });
      /* accompagnamento */
      const up = (k, o = 0) => noteF(tr, k, o);
      if (tr.acc === "arp") A(up(ch[[0, 1, 2, 1][si % 4]], si < 4 ? 0 : 0) * (si >= 4 ? 2 : 1), t, av, musicBus);
      if (tr.acc === "arp6") A(up(ch[[0, 1, 2, 0, 2, 1][si]], si === 3 ? 1 : 0), t, av, musicBus);
      if (tr.acc === "hits" && (si === 2 || si === 6)) ch.slice(0, 3).forEach((k) => A(up(k), t, av * 0.6, musicBus));
      if (tr.acc === "block" && (si === 0 || si === 3 || si === 6)) ch.forEach((k) => A(up(k), t, av * 0.55, musicBus));
      if (tr.acc === "waltz" && (si === 2 || si === 4)) ch.slice(1).forEach((k) => A(up(k), t, av * 0.6, musicBus));
      if (tr.acc === "ostinato") A(up([0, 2, 4, 2, 1, 3, 4, 2][si] + d), t, av * 0.8, musicBus);
      if (tr.acc === "pad" && si === 0) ch.forEach((k) => tone(up(k), t, barLen * 1.05, { vol: 0.03, dest: musicBus, attack: barLen * 0.35, filter: 1300 }));
      if (tr.acc === "bossa" && [0, 3, 6].includes(si)) ch.forEach((k, j) => A(up(k), t + j * 0.018, av * 0.6, musicBus));
      if (tr.acc === "strum" && (si === 0 || si === 4)) ch.forEach((k, j) => A(up(k), t + j * 0.03, av * 0.7, musicBus));
      if (tr.acc === "broken") A(up(ch[[0, 2, 1, 2][si % 4]] + (si % 4 === 1 ? 0 : 0)), t, av * 0.7, musicBus);
      if (tr.drums) drum(tr.drums, t, si, tr.per);
      /* melodia */
      const n = bars[bi][si];
      if (n >= 0) I(noteF(tr, n), t, VOL[tr.mel] * (si % 2 === 0 ? 1 : 0.8), musicBus);
      nextT += tr.beat; step++;
    }
  }
  function startSong(i) { cur = (i + TRACKS.length) % TRACKS.length; song = buildSong(cur); step = 0; nextT = ctx.currentTime + 0.15; startBed(TRACKS[cur].bed); if (musicTimer) { musicBus.gain.cancelScheduledValues(ctx.currentTime); musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime); musicBus.gain.linearRampToValueAtTime(1.6 * TRACKS[cur].g, ctx.currentTime + 1.5); } if (onTrack) onTrack(cur); }
  function next() { startSong(cur + 1); }
  function musicOn(first) {
    const c = ensure(); if (!c || musicTimer) return;
    startSong(first != null ? first : cur);
    musicBus.gain.cancelScheduledValues(c.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, c.currentTime);
    musicBus.gain.linearRampToValueAtTime(1.6 * TRACKS[cur].g, c.currentTime + 3.5);
    musicTimer = setInterval(schedule, 120); schedule();
  }
  function musicOff() {
    if (!ctx || !musicTimer) return;
    clearInterval(musicTimer); musicTimer = null; song = null; stopBed();
    musicBus.gain.cancelScheduledValues(ctx.currentTime);
    musicBus.gain.setValueAtTime(musicBus.gain.value, ctx.currentTime);
    musicBus.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
  function skip(i) { if (!musicTimer) { cur = i; return; } startSong(i); }
  /* Accordo morbido per la respirazione */
  function breath(dir, secs) {
    if (!S.sfx) return;
    const c = ensure(); if (!c) return;
    if (!pad) {
      const g = c.createGain(); g.gain.value = 0.0001; g.connect(master);
      const oscs = [261.63, 329.63, 392, 523.25].map((f, i) => { const o = c.createOscillator(); o.type = i === 3 ? "triangle" : "sine"; o.frequency.value = f; o.detune.value = (i - 1.5) * 4; o.connect(g); o.start(); return o; });
      pad = { g, oscs };
    }
    const t = c.currentTime;
    pad.g.gain.cancelScheduledValues(t);
    pad.g.gain.setValueAtTime(Math.max(0.0001, pad.g.gain.value), t);
    pad.g.gain.linearRampToValueAtTime(dir === "in" ? 0.12 : 0.015, t + secs);
  }
  function breathStop() {
    if (!pad || !ctx) return;
    const p = pad; pad = null; const t = ctx.currentTime;
    p.g.gain.cancelScheduledValues(t); p.g.gain.setValueAtTime(p.g.gain.value, t); p.g.gain.linearRampToValueAtTime(0.0001, t + 0.5);
    setTimeout(() => { p.oscs.forEach((o) => { try { o.stop(); } catch (e) { /* niente */ } }); }, 700);
  }
  function suspend() { if (ctx && ctx.state === "running") { try { ctx.suspend(); } catch (e) { /* niente */ } } }
  function resume() { if (ctx && ctx.state === "suspended") { try { ctx.resume(); } catch (e) { /* niente */ } } }
  function note(f, len = 0.7) { lastAt = performance.now(); if (!S.sfx) return; const c = ensure(); if (!c) return; try { bell(f, c.currentTime + 0.005, 0.2, fxBus, len); } catch (e) { /* niente */ } }
  function level() { if (!an) return 0; const d = new Float32Array(an.fftSize); an.getFloatTimeDomainData(d); let q = 0; for (const x of d) q += x * x; return Math.sqrt(q / d.length); }
  return { petMotif, MOTIF_PETS: Object.keys(MOTIF), logoTick, logoChime, logoTickTo, logoChimeTo, LOGO_HZ, CHIME_HZ, S16, level, play, note, catchSound, haptic, musicOn, musicOff, skip, breath, breathStop, suspend, resume, playing: () => !!musicTimer, unlock: ensure, lastAt: () => lastAt, track: () => cur, setOnTrack: (f) => { onTrack = f; }, count: TRACKS.length };
})();
