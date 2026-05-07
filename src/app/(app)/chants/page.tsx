'use client';
import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/TopBar';

const TRACK_GROUPS = [
  {
    label: "5-Minute Quick Center",
    tracks: [
      {icon:"🕉️", name:"Om Namah Shivaya",   artist:"Sacred Chant", src:"/audio/om_namah_shivaya.mp3",   tag:"Morning Sadhana",  tot:"5:00",  sec:300},
      {icon:"🌸", name:"Gayatri Mantra",     artist:"Deva Premal", src:"/audio/gayatri_mantra.mp3",     tag:"Solar Activation", tot:"5:00",  sec:300},
      {icon:"🔔", name:"Om Mani Padme Hum",  artist:"Tibetan Monks", src:"/audio/om_mani_padme_hum.mp3",  tag:"Deep Healing",     tot:"5:00",  sec:300},
      {icon:"🌙", name:"Mahamrityunjaya",    artist:"Healing Chant", src:"/audio/mahamrityunjaya.mp3",   tag:"Protection Chant", tot:"5:00",  sec:300},
      {icon:"☀️", name:"Surya Namaskar",     artist:"Morning Raga", src:"/audio/surya_namaskar.mp3",    tag:"Sun Salutation",   tot:"5:00",  sec:300},
      {icon:"🕊️", name:"Shanti Mantra",      artist:"Vedic Scholars", src:"/audio/shanti_mantra.mp3",   tag:"Peace Invocation", tot:"5:00",  sec:300},
    ]
  },
  {
    label: "10-Minute Deep Dive",
    tracks: [
      {icon:"🐘", name:"Ganesh Maha Mantra", artist:"Sounds of Isha", src:"/audio/ganesh_mantra.mp3",       tag:"Obstacle Removal", tot:"10:00", sec:600},
      {icon:"📚", name:"Saraswati Beej",     artist:"Focus Chant", src:"/audio/saraswati_beej.mp3",    tag:"Intellect & Flow", tot:"10:00", sec:600},
      {icon:"🗡️", name:"Durga Suktam",       artist:"Vedic Chants", src:"/audio/durga_suktam.mp3",        tag:"Inner Strength",   tot:"10:00", sec:600},
      {icon:"🌿", name:"Medicine Buddha",    artist:"Tibetan Bowls", src:"/audio/medicine_buddha.mp3",     tag:"Cellular Healing", tot:"10:00", sec:600},
      {icon:"💚", name:"Green Tara Mantra",  artist:"Himalayan Monks", src:"/audio/green_tara.mp3",         tag:"Compassion",       tot:"10:00", sec:600},
      {icon:"🌀", name:"Shiva Tandava",      artist:"Agni Ritual", src:"/audio/shiva_tandava.mp3",        tag:"Dynamic Energy",   tot:"10:00", sec:600},
    ]
  },
  {
    label: "15-Minute Immersion",
    tracks: [
      {icon:"🔥", name:"Rudram Chamakam",    artist:"Vedic Fire", src:"/audio/rudram_chamakam.mp3",       tag:"Cosmic Order",     tot:"15:00", sec:900},
      {icon:"🌌", name:"Vishnu Sahasranama", artist:"Ancient Recitation", src:"/audio/vishnu_sahasranama.mp3",       tag:"Universal Form",   tot:"15:00", sec:900},
      {icon:"📿", name:"108 Om Chanting",    artist:"Deep Resonance", src:"/audio/108_om_chanting.mp3",      tag:"Root Alignment",   tot:"15:00", sec:900},
      {icon:"🌈", name:"Chakra Bija Mantras",artist:"7 Frequencies", src:"/audio/chakra_bija.mp3",        tag:"Full Alignment",   tot:"15:00", sec:900},
      {icon:"👁️", name:"Purusha Suktam",     artist:"Vedic Heritage", src:"/audio/purusha_suktam.mp3",      tag:"Creation Hymn",    tot:"15:00", sec:900},
      {icon:"🪷", name:"Avalokiteshvara",    artist:"Pure Love", src:"/audio/avalokiteshvara.mp3", tag:"Heart Opening",  tot:"15:00", sec:900},
    ]
  }
];

export default function ChantsPage() {
  const [curGroupIdx, setCurGroupIdx] = useState(0);
  const [curTrackIdx, setCurTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = TRACK_GROUPS[curGroupIdx].tracks[curTrackIdx];

  // Initialize Audio Object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      
      const updateProg = () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };

      const handleEnded = () => {
        setPlaying(false);
        setProgress(0);
        skipTrack(true);
      };

      const handleLoadedMeta = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      audioRef.current.addEventListener('timeupdate', updateProg);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMeta);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', updateProg);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMeta);
          audioRef.current.src = '';
        }
      };
    }
  }, []);

  // Synchronize audio source when track changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = playing;
      const targetSrc = t.src;
      
      if (audioRef.current.src !== targetSrc) {
        audioRef.current.pause();
        audioRef.current.src = targetSrc;
        audioRef.current.load();
        setProgress(0);
        
        if (wasPlaying) {
          audioRef.current.play().catch(err => {
            console.error("Audio playback failed:", err);
            setPlaying(false);
          });
        }
      }
    }
  }, [curGroupIdx, curTrackIdx]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // Ensure src is set before playing
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
         audioRef.current.src = t.src;
         audioRef.current.load();
      }
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        setPlaying(false);
      });
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const r = bar.getBoundingClientRect();
    const newProg = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
    setProgress(newProg);
    
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProg / 100) * audioRef.current.duration;
    }
  };

  const selTrack = (gIdx: number, tIdx: number) => {
    setCurGroupIdx(gIdx);
    setCurTrackIdx(tIdx);
  };

  const skipTrack = (forward: boolean) => {
    let nT = forward ? curTrackIdx + 1 : curTrackIdx - 1;
    let nG = curGroupIdx;
    
    if (nT >= TRACK_GROUPS[curGroupIdx].tracks.length) {
      nG = (curGroupIdx + 1) % TRACK_GROUPS.length;
      nT = 0;
    } else if (nT < 0) {
      nG = curGroupIdx - 1 < 0 ? TRACK_GROUPS.length - 1 : curGroupIdx - 1;
      nT = TRACK_GROUPS[nG].tracks.length - 1;
    }
    selTrack(nG, nT);
  };

  // Safe time calculation using actual audio duration if available, otherwise fallback
  const currentTotalSeconds = audioRef.current && !isNaN(audioRef.current.duration) 
    ? audioRef.current.duration 
    : t.sec;
  const curSecs = audioRef.current ? audioRef.current.currentTime : (progress / 100) * currentTotalSeconds;
  
  const curMinsStr = Math.floor(curSecs / 60);
  const curSecsStr = Math.floor(curSecs % 60).toString().padStart(2, '0');
  const curTime = `${curMinsStr}:${curSecsStr}`;

  const hs = [6,12,20,16,28,22,36,30,40,34,46,38,50,42,54,46,50,42,46,38,40,32,36,28,30,22,28,18,14,10,8,6];

  return (
    <div className="screen active" id="chants-screen" style={{ opacity: 1, pointerEvents: 'all' }}>
      
      <div className="vinyl-wrap">
        <div className="vinyl-aura"></div>
        <div className={`vinyl ${playing ? 'spin' : ''}`}>
          <div className="vinyl-ring" style={{ width: '216px', height: '216px', top: '4px', left: '4px' }}></div>
          <div className="vinyl-ring" style={{ width: '184px', height: '184px', top: '20px', left: '20px', borderColor: 'rgba(212,150,60,.05)' }}></div>
          <div className="vinyl-ring" style={{ width: '152px', height: '152px', top: '36px', left: '36px', borderColor: 'rgba(140,80,220,.08)' }}></div>
          <div className="vinyl-ring" style={{ width: '116px', height: '116px', top: '54px', left: '54px' }}></div>
          <div className="vinyl-ring" style={{ width: '84px', height: '84px', top: '70px', left: '70px', borderColor: 'rgba(212,150,60,.1)' }}></div>
          <div className="vinyl-center">
            <span style={{ fontFamily: 'var(--deva)', fontSize: '28px', color: 'var(--gold)', opacity: 0.7 }}>ॐ</span>
          </div>
        </div>
      </div>

      <div className="pl-info">
        <div className="pl-title">{t.name}</div>
        <div className="pl-artist">{t.artist}</div>
        <div className="pl-tag">{t.tag}</div>
      </div>

      <div className="waveform">
        {hs.map((h, i) => (
          <div 
            key={i} 
            className="wb" 
            style={{ 
              height: `${h}px`, 
              animationDuration: `${(0.55 + Math.random() * 0.8).toFixed(2)}s`,
              animationDelay: `${(i * 0.055).toFixed(2)}s`,
              animationPlayState: playing ? 'running' : 'paused'
            }}
          ></div>
        ))}
      </div>

      <div className="pl-prog-wrap">
        <div className="pl-bar" onClick={handleSeek}>
          <div className="pl-fill" style={{ width: `${progress}%` }}>
            <div className="pl-thumb"></div>
          </div>
        </div>
        <div className="pl-times">
          <span>{curTime}</span>
          <span>{t.tot}</span>
        </div>
      </div>

      <div className="pl-ctrl">
        <button className="ctrl" title="Shuffle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6"/></svg>
        </button>
        <button className="ctrl lg" onClick={() => skipTrack(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
        </button>
        <button className="ctrl play" onClick={togglePlay}>
          {playing ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button className="ctrl lg" onClick={() => skipTrack(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2v12h2zm-3.5 6L6 6v12z"/></svg>
        </button>
        <button className="ctrl" title="Repeat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
        </button>
      </div>

      <div className="pl-queue scroll" style={{ paddingBottom: 'calc(var(--safe-bot) + 80px)' }}>
        {TRACK_GROUPS.map((group, gIdx) => (
          <div key={gIdx} style={{ marginBottom: '16px' }}>
            <div className="ql">{group.label}</div>
            {group.tracks.map((trk, tIdx) => {
              const isSelected = curGroupIdx === gIdx && curTrackIdx === tIdx;
              return (
                <div key={tIdx} className={`qi ${isSelected ? 'on' : ''}`} onClick={() => selTrack(gIdx, tIdx)}>
                  <div className="qi-thumb">{trk.icon}</div>
                  <div className="qi-meta-wrap">
                    <div className="qi-name">{trk.name}</div>
                    <div className="qi-meta">{trk.artist}</div>
                  </div>
                  <div className="qi-dur">{trk.tot}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
