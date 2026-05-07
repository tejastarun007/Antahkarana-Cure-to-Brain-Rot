'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const TQUOTES = [
  '"तदेजति तन्नैजति तद्दूरे तद्वन्तिके — It moves and it moves not; it is far and it is near."',
  '"असतो मा सद्गमय — Lead me from the unreal to the real."',
  '"योगश्चित्तवृत्तिनिरोधः — Yoga is the cessation of the fluctuations of the mind."',
  '"यथेदं सर्वं बिभर्ति — As this whole universe is sustained..."',
  '"प्रज्ञानं ब्रह्म — Consciousness is Brahman."'
];

export function BottomNav() {
  const current = usePathname();
  const router = useRouter();
  
  const [tovVisible, setTovVisible] = useState(false);
  const [tovQuote, setTovQuote] = useState(TQUOTES[0]);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const doNav = (path: string) => {
    if (path === current || tovVisible) return;
    setNavigatingTo(path);
    setTovQuote(TQUOTES[Math.floor(Math.random() * TQUOTES.length)]);
    setTovVisible(true);
    
    // The "Time of Void" transition logic
    setTimeout(() => {
      router.push(path);
      // Let the new page render, then hide overlay
      setTimeout(() => {
        setTovVisible(false);
        setNavigatingTo(null);
      }, 1000);
    }, 1800);
  };

  const navs = [
    { p: '/dashboard', l: 'Home', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L3 10.5V21h18V10.5L12 3z"/></svg> },
    { p: '/practice', l: 'Practice', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s-4 4-4 10c0 4 4 10 4 10s4-6 4-10c0-6-4-10-4-10z"/><path d="M12 22s-6-3-8-9c-1.5-4.5 1-8 1-8s2.5 4 3 8c1 4 4 9 4 9z"/><path d="M12 22s6-3 8-9c1.5-4.5-1-8-1-8s-2.5 4-3 8c-1 4-4 9-4 9z"/></svg> },
    { p: '/wisdom', l: 'Wisdom', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 2L2 12l10 10 10-10L12 2z"/><path d="M12 6.5L6.5 12 12 17.5 17.5 12 12 6.5z"/></svg> },
    { p: '/science', l: 'Science', i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg> },
    { p: '/chants', l: 'Chants', i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M8 9v6M4 11v2M16 7v10M20 10v4"/></svg> }
  ];

  return (
    <>
      <div className="bnav">
        {navs.map(n => {
          const isActive = navigatingTo ? navigatingTo === n.p : current === n.p;
          return (
            <div key={n.p} onClick={() => doNav(n.p)} className={`bn ${isActive ? 'on' : ''}`} style={{cursor: 'pointer'}}>
              <div className="bn-i">{n.i}</div>
              <div className="bn-l">{n.l}</div>
            </div>
          );
        })}
      </div>
      
      {/* Time of Void Navigation Overlay */}
      <div className={`tov ${tovVisible ? 'show' : ''}`} style={{position: 'absolute', inset: 0, zIndex: 1000}}>
        <div className="tov-aura"></div>
        <div className="tov-ring-outer"></div>
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" style={{position:'relative', zIndex:1}}>
          <g className="shat-a"><polygon points="55,14 91,73 19,73" stroke="rgba(200,144,42,.6)" strokeWidth="1.2" fill="rgba(200,144,42,.05)"/></g>
          <g className="shat-b"><polygon points="55,96 19,37 91,37" stroke="rgba(232,184,75,.55)" strokeWidth="1.2" fill="rgba(232,184,75,.05)"/></g>
          <circle cx="55" cy="55" r="20" stroke="rgba(232,184,75,.25)" strokeWidth=".8" className="bindu-ring"/>
          <circle cx="55" cy="55" r="11" fill="rgba(200,144,42,.35)" className="bindu-dot"/>
          <circle cx="55" cy="55" r="4.5" fill="rgba(245,208,128,.9)"/>
        </svg>
        <div className="tq">{tovQuote}</div>
        <div className="tdots"><div className="td"></div><div className="td"></div><div className="td"></div></div>
      </div>
    </>
  );
}
