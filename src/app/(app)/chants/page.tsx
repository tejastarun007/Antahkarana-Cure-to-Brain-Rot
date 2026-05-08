'use client';
import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/TopBar';

const TRACK_GROUPS = [
  {
    label: "5-Minute Quick Center",
    tracks: [
      {icon: <span style={{fontFamily:'var(--deva)',fontSize:'22px',lineHeight:1}}>ॐ</span>, name:"Om Namah Shivaya", artist:"Chantress Seba · 432Hz Sacred", src:"/audio/om_namah_shivaya.mp3", tag:"Morning Sadhana", tot:"5:00", sec:300},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-8 8-12a8 8 0 00-16 0c0 4 4 8 8 12z"/><path d="M12 22c-4-8-2-14 0-18 2 4 4 10 0 18z"/></svg>, name:"Gayatri Mantra", artist:"Deva Premal · Sunrise", src:"/audio/gayatri_mantra.mp3", tag:"Solar Activation", tot:"5:00", sec:300},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, name:"Om Mani Padme Hum", artist:"Tibetan Monks · 528Hz", src:"/audio/om_mani_padme_hum.mp3", tag:"Deep Healing", tot:"5:00", sec:300},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>, name:"Mahamrityunjaya", artist:"Chantress Seba · Healing", src:"/audio/mahamrityunjaya.mp3", tag:"Protection Chant", tot:"5:00", sec:300},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>, name:"Surya Namaskar", artist:"Morning Raga · Pure", src:"/audio/surya_namaskar.mp3", tag:"Sun Salutation", tot:"5:00", sec:300},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></svg>, name:"Shanti Mantra", artist:"Vedic Scholars", src:"/audio/shanti_mantra.mp3", tag:"Peace Invocation", tot:"5:00", sec:300},
    ]
  },
  {
    label: "10-Minute Deep Dive",
    tracks: [
      {icon: <span style={{fontFamily:'var(--deva)',fontSize:'20px',lineHeight:1}}>गं</span>, name:"Ganesh Maha Mantra", artist:"Sounds of Isha", src:"/audio/ganesh_mantra.mp3", tag:"Obstacle Removal", tot:"10:00", sec:600},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>, name:"Saraswati Beej", artist:"432Hz Focus", src:"/audio/saraswati_beej.mp3", tag:"Intellect & Flow", tot:"10:00", sec:600},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 17.5L6.5 9.5M17.5 14.5 22 22l-7.5-4.5L14.5 17.5zM18 11l-7 7M10 13l3-3M6 10l-4-4 4-4 4 4-4 4z"/></svg>, name:"Durga Suktam", artist:"Vedic Chants", src:"/audio/durga_suktam.mp3", tag:"Inner Strength", tot:"10:00", sec:600},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C19.54 15.68 15.55 20 11 20z"/></svg>, name:"Medicine Buddha", artist:"Tibetan Bowls", src:"/audio/medicine_buddha.mp3", tag:"Cellular Healing", tot:"10:00", sec:600},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, name:"Green Tara Mantra", artist:"Himalayan Monks", src:"/audio/green_tara.mp3", tag:"Compassion", tot:"10:00", sec:600},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22A10 10 0 1 1 22 12c0 2-2 4-4 4s-4-2-4-4a4 4 0 1 1 8 0"/></svg>, name:"Shiva Tandava", artist:"Agni Ritual", src:"/audio/shiva_tandava.mp3", tag:"Dynamic Energy", tot:"10:00", sec:600},
    ]
  },
  {
    label: "15-Minute Immersion",
    tracks: [
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>, name:"Rudram Chamakam", artist:"Vedic Fire", src:"/audio/rudram_chamakam.mp3", tag:"Cosmic Order", tot:"15:00", sec:900},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>, name:"Vishnu Sahasranama", artist:"Ancient Recitation", src:"/audio/vishnu_sahasranama.mp3", tag:"Universal Form", tot:"15:00", sec:900},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="17" cy="17" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="7" cy="7" r="2"/></svg>, name:"108 Om Chanting", artist:"Deep Resonance", src:"/audio/108_om_chanting.mp3", tag:"Root Alignment", tot:"15:00", sec:900},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M18 17a6 6 0 0 0-12 0"/><path d="M14 17a2 2 0 0 0-4 0"/></svg>, name:"Chakra Bija Mantras", artist:"7 Frequencies", src:"/audio/chakra_bija.mp3", tag:"Full Alignment", tot:"15:00", sec:900},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, name:"Purusha Suktam", artist:"Vedic Heritage", src:"/audio/purusha_suktam.mp3", tag:"Creation Hymn", tot:"15:00", sec:900},
      {icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-8 8-12a8 8 0 00-16 0c0 4 4 8 8 12z"/><path d="M12 22c-4-8-2-14 0-18 2 4 4 10 0 18z"/></svg>, name:"Avalokiteshvara", artist:"Pure Love", src:"/audio/avalokiteshvara.mp3", tag:"Heart Opening", tot:"15:00", sec:900},
    ]
  }
];

export default function ChantsPage() {
  const [curGroupIdx, setCurGroupIdx] = useState(0);
  const [curTrackIdx, setCurTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1);
  
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
      <TopBar />
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
          <span style={{ color: 'var(--gold2)' }}>{curTime}</span>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '0 28px 18px', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
        <div className="pl-bar" style={{ flex: 1, height: '4px', background: 'rgba(212,150,60,.1)' }} onClick={(e) => {
          const bar = e.currentTarget;
          const r = bar.getBoundingClientRect();
          const newVol = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
          setVolume(newVol);
        }}>
          <div className="pl-fill" style={{ width: `${volume * 100}%`, background: 'linear-gradient(90deg, var(--gold), var(--gold2))', transition: 'none' }}>
            <div className="pl-thumb" style={{ width: '10px', height: '10px', top: '-3px', right: '-5px', boxShadow: '0 0 8px rgba(212,150,60,.5)' }}></div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
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
