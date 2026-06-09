// Hybrid audio engine for PWA — HTML5 Audio primary, WebAudio API fallback.
// bell.wav is a synthesised 432 Hz singing bowl (Vedic tuning).

let audioCtx: AudioContext | null = null;
let bellStart: HTMLAudioElement | null = null;
let bellEnd: HTMLAudioElement | null = null;

const preload = () => {
  if (typeof window === 'undefined') return;
  if (!bellStart) {
    bellStart = new Audio('/bell.wav');
    bellStart.load();
    bellEnd = new Audio('/bell.wav');
    bellEnd.load();
  }
};

export const playBell = (type = 'start') => {
  preload();

  // Try HTML5 Audio first (better mobile reliability, uses cached file)
  const el = type === 'start' ? bellStart : bellEnd;
  if (el) {
    try {
      el.currentTime = 0;
      const p = el.play();
      if (p) p.catch(() => fallbackBell(type));
      return;
    } catch {
      // Fall through to synthesis
    }
  }

  fallbackBell(type);
};

const fallbackBell = (type: string) => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;

    const strikeAt = (t: number, freq: number, gain: number, dur: number) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gn = audioCtx.createGain();
      const osc2 = audioCtx.createOscillator();
      const gn2 = audioCtx.createGain();

      osc.type = 'sine'; osc.frequency.setValueAtTime(freq, t);
      gn.gain.setValueAtTime(gain, t);
      gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc2.type = 'sine'; osc2.frequency.setValueAtTime(freq * 2.756, t);
      gn2.gain.setValueAtTime(gain * 0.4, t);
      gn2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);

      osc.connect(gn); gn.connect(audioCtx.destination);
      osc2.connect(gn2); gn2.connect(audioCtx.destination);

      osc.start(t); osc.stop(t + dur);
      osc2.start(t); osc2.stop(t + dur);
    };

    if (type === 'start') {
      strikeAt(now, 432, 0.35, 4.0);
    } else {
      strikeAt(now, 288, 0.4, 5.0);
      strikeAt(now + 0.55, 432, 0.25, 4.0);
      strikeAt(now + 1.1, 576, 0.15, 3.0);
    }
  } catch (e) {
    console.warn('Audio synthesis failed:', e);
  }
};
