// A simple audio engine for PWA environments, falling back to AudioContext if offline and files not cached.

let audioCtx: AudioContext | null = null;
let bellAudio: HTMLAudioElement | null = null;

export const initAudio = () => {
  if (typeof window !== 'undefined') {
    // Try to load physical file for better mobile reliability
    bellAudio = new Audio('/bell.mp3');
    bellAudio.load();
  }
};

export const playBell = (type = 'start') => {
  if (bellAudio) {
    try {
      bellAudio.currentTime = 0;
      bellAudio.play();
      return;
    } catch (e) {
      console.warn("HTML5 Audio failed, falling back to AudioContext", e);
    }
  }

  // Fallback to synthesized audio (from original implementation)
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    console.warn('Fallback audio failed:', e);
  }
};
