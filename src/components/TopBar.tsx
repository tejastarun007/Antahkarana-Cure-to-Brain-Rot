'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const DAILY_QUOTES = [
  "सत्यमेव जयते — Truth alone triumphs",
  "योगः कर्मसु कौशलम् — Yoga is skill in action",
  "आत्मनो मोक्षार्थं जगत् हिताय च — For self-liberation and the welfare of the world",
  "तमसो मा ज्योतिर्गमय — From darkness, lead me to light",
  "अहिंसा परमो धर्मः — Non-violence is the highest virtue",
  "वसुधैव कुटुम्बकम् — The world is one family",
  "सर्वे भवन्तु सुखिनः — May all beings be happy",
  "विद्या ददाति विनयम् — Knowledge gives humility",
  "धर्मो रक्षति रक्षितः — Dharma protects those who protect it",
  "कर्मण्येवाधिकारस्ते — You have a right to action alone",
  "शान्तिः शान्तिः शान्तिः — Peace, peace, peace",
  "ज्ञानं परमं ध्येयम् — Knowledge is the supreme goal",
  "प्रज्ञानं ब्रह्म — Consciousness is Brahman",
  "अयं आत्मा ब्रह्म — This Self is Brahman",
  "तत् त्वम् असि — Thou art That",
  "सर्वं खल्विदं ब्रह्म — All of this is Brahman",
  "चित्तवृत्तिनिरोधः — Stillness of the mind's fluctuations",
  "ईश्वरः सर्वभूतानां — The Lord dwells in the heart of all",
  "नमस्ते सदा वत्सले — Salutations to the ever-loving",
  "श्रद्धावान् लभते ज्ञानम् — The faithful attain knowledge",
  "मन एव मनुष्याणां — The mind alone is the cause",
  "सत्यं ज्ञानमनन्तं ब्रह्म — Truth, knowledge, infinity is Brahman",
  "उद्धरेदात्मनात्मानम् — Elevate yourself by yourself",
  "समत्वं योग उच्यते — Equanimity is called Yoga",
  "अनित्यं दुखं — Impermanence dissolves suffering",
  "स विद्या या विमुक्तये — True knowledge liberates",
  "ज्योतिषामपि तज्ज्योतिः — Light of all lights",
  "यत्र योगेश्वरः कृष्णः — Where the Lord of Yoga is",
  "नित्यं ध्यायस्व — Meditate always",
  "अन्तःकरण शुद्धिः — Purification of the inner instrument",
];

export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === '/dashboard';
  const [quoteVisible, setQuoteVisible] = useState(true);

  let greeting = '';
  let dailyQuote = '';

  if (typeof window !== 'undefined') {
    const h = new Date().getHours();
    if (h < 5) greeting = 'Sacred Hours';
    else if (h < 12) greeting = 'Namaste · शुभ प्रभात';
    else if (h < 17) greeting = 'Shubh Madhyahna · शुभ मध्याह्न';
    else if (h < 21) greeting = 'Shubh Sandhya · शुभ सन्ध्या';
    else greeting = 'Shubh Ratri · शुभ रात्रि';

    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    dailyQuote = DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  }


  // Cycle quote visibility for dissolving sand effect
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => setQuoteVisible(true), 1500);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  if (!isHome) {
    // Non-home pages: compact branded spacer
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '14px 20px 10px', width: '100%',
        zIndex: 100, position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: 'linear-gradient(135deg, rgba(212,150,60,.12), rgba(100,50,180,.08))',
            border: '1px solid rgba(212,150,60,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{
              fontFamily: 'var(--deva)', fontSize: '12px', color: 'var(--gold2)',
              lineHeight: 1
            }}>अ</span>
          </div>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: '11px', fontWeight: 300,
            color: 'var(--t3)', letterSpacing: '3px', textTransform: 'uppercase'
          }}>Antahkarana</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '16px 22px 0', width: '100%',
      zIndex: 100, position: 'relative',
    }}>

      {/* ── Row 1: Brand + Greeting + Profile ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', width: '100%', marginBottom: '14px'
      }}>
        {/* Brand Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(212,150,60,.18), rgba(100,50,180,.12))',
            border: '1px solid rgba(212,150,60,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(212,150,60,.08), inset 0 1px 0 rgba(255,255,255,.05)'
          }}>
            <span style={{
              fontFamily: 'var(--deva)', fontSize: '20px', color: 'var(--gold2)',
              lineHeight: 1, textShadow: '0 0 12px rgba(212,150,60,.3)'
            }}>अ</span>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 300,
              color: 'var(--t1)', letterSpacing: '3px', textTransform: 'uppercase',
              lineHeight: 1.1
            }}>Antahkarana</div>
            <div suppressHydrationWarning style={{
              fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--gold)',
              letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px',
              opacity: 0.75
            }}>{greeting}</div>
          </div>
        </div>

        {/* Profile Button */}
        <Link href="/profile" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(212,150,60,.08), rgba(100,50,180,.06))',
          border: '1px solid rgba(212,150,60,.28)',
          color: 'var(--gold2)', transition: 'all 0.3s ease',
          textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(212,150,60,.06)'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>
      </div>

      {/* ── Row 2: Daily Dissolving Quote ── */}
      <div style={{
        width: '100%', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(212,150,60,.04), rgba(100,50,180,.03))',
        border: '1px solid rgba(212,150,60,.12)',
        borderRadius: '14px',
        padding: '12px 18px',
        marginBottom: '6px',
        position: 'relative'
      }}>
        {/* Subtle gold line at top */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,150,60,.3), transparent)'
        }}/>
        <p suppressHydrationWarning style={{
          fontFamily: 'var(--serif)', fontSize: '13px', fontStyle: 'italic',
          color: 'var(--gold3)', textAlign: 'center', lineHeight: 1.5,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          margin: 0,
          opacity: quoteVisible ? 1 : 0,
          filter: quoteVisible ? 'blur(0px)' : 'blur(8px)',
          transform: quoteVisible ? 'translateY(0) scale(1)' : 'translateY(3px) scale(0.97)',
          transition: 'opacity 1.4s cubic-bezier(.4,0,.2,1), filter 1.4s cubic-bezier(.4,0,.2,1), transform 1.4s cubic-bezier(.4,0,.2,1)',
          textShadow: '0 0 20px rgba(212,150,60,.1)'
        }}>{dailyQuote}</p>
      </div>
    </div>
  );
}
