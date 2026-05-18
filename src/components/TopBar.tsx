'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useStore, type SyncStatus } from '@/store/useStore';

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

// ─── Sync Status Dot ─────────────────────────────────────────────────────────
const SYNC_COLOURS: Record<SyncStatus, string> = {
  idle:    'rgba(255,255,255,.2)',
  syncing: '#fbbf24',
  synced:  '#34d399',
  error:   '#f87171',
};
const SYNC_LABELS: Record<SyncStatus, string> = {
  idle:    'Not synced',
  syncing: 'Syncing…',
  synced:  'Synced',
  error:   'Sync failed',
};

function SyncDot() {
  const syncStatus = useStore(s => s.syncStatus);
  const lastSyncAt = useStore(s => s.lastSyncAt);
  const syncError = useStore(s => s.syncError);
  const [showTip, setShowTip] = useState(false);
  const tipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = () => {
    setShowTip(v => !v);
    if (tipRef.current) clearTimeout(tipRef.current);
    tipRef.current = setTimeout(() => setShowTip(false), 3000);
  };

  const colour = SYNC_COLOURS[syncStatus];
  const label  = SYNC_LABELS[syncStatus];
  const lastAt = lastSyncAt ? new Date(lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={toggle}
        aria-label={`Sync status: ${label}`}
        style={{
          width: 10, height: 10, borderRadius: '50%',
          background: colour, border: 'none', padding: 0, cursor: 'pointer',
          boxShadow: `0 0 6px ${colour}`,
          animation: syncStatus === 'syncing' ? 'syncPulse 1.2s ease-in-out infinite' : 'none',
          flexShrink: 0,
        }}
      />
      {showTip && (
        <div style={{
          position: 'absolute', top: '16px', right: 0, zIndex: 200,
          background: 'rgba(10,8,24,.96)', border: '1px solid rgba(255,255,255,.1)',
          borderRadius: '10px', padding: '8px 12px', whiteSpace: 'nowrap',
          boxShadow: '0 8px 24px rgba(0,0,0,.4)',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: colour, fontWeight: 600, marginBottom: 2 }}>
            {label}
          </div>
          {lastAt && (
            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'rgba(255,255,255,.4)' }}>
              Last synced {lastAt}
            </div>
          )}
          {syncStatus === 'error' && syncError && (
            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: '#f87171', marginTop: 2 }}>
              {syncError}
            </div>
          )}
        </div>
      )}
      <style>{`@keyframes syncPulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
export function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === '/dashboard';
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const now = new Date();
    const h = now.getHours();
    if (h < 5)        setGreeting('Sacred Hours');
    else if (h < 12)  setGreeting('Namaste · शुभ प्रभात');
    else if (h < 17)  setGreeting('Shubh Madhyahna · शुभ मध्याह्न');
    else if (h < 21)  setGreeting('Shubh Sandhya · शुभ सन्ध्या');
    else              setGreeting('Shubh Ratri · शुभ रात्रि');

    setQuoteIndex(
      Math.floor(
        (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
      ) % DAILY_QUOTES.length
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex(prev => (prev + 1) % DAILY_QUOTES.length);
        setQuoteVisible(true);
      }, 1500);
    }, 14000);
    return () => clearInterval(interval);
  }, []);

  const dailyQuote = DAILY_QUOTES[quoteIndex];

  // ── Compact bar for non-dashboard pages ──
  if (!isHome) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
            <span style={{ fontFamily: 'var(--deva)', fontSize: '12px', color: 'var(--gold2)', lineHeight: 1 }}>अ</span>
          </div>
          <span style={{
            fontFamily: 'var(--serif)', fontSize: '11px', fontWeight: 300,
            color: 'var(--t3)', letterSpacing: '3px', textTransform: 'uppercase'
          }}>Antahkarana</span>
        </div>
        {/* Sync dot on all pages */}
        <SyncDot />
      </div>
    );
  }

  // ── Full home bar ──
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '16px 20px 0', width: '100%',
      zIndex: 100, position: 'relative',
    }}>

      {/* Row 1: Brand + Greeting + Sync + Profile */}
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
              color: 'var(--t1)', letterSpacing: '3px', textTransform: 'uppercase', lineHeight: 1.1
            }}>Antahkarana</div>
            <div suppressHydrationWarning style={{
              fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--gold)',
              letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px', opacity: 0.75
            }}>{greeting}</div>
          </div>
        </div>

        {/* Right side: sync dot + profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SyncDot />
          <Link href="/profile" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(212,150,60,.08), rgba(100,50,180,.06))',
            border: '1px solid rgba(212,150,60,.28)',
            color: 'var(--gold2)', textDecoration: 'none',
            boxShadow: '0 2px 12px rgba(212,150,60,.06)'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Row 2: Daily Dissolving Quote */}
      <div style={{
        width: '100%', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(212,150,60,.04), rgba(100,50,180,.03))',
        border: '1px solid rgba(212,150,60,.12)', borderRadius: '14px',
        padding: '12px 18px', marginBottom: '6px', position: 'relative'
      }}>
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
          transition: 'opacity 1.4s cubic-bezier(.4,0,.2,1), filter 1.4s, transform 1.4s cubic-bezier(.4,0,.2,1)',
          textShadow: '0 0 20px rgba(212,150,60,.1)'
        }}>{dailyQuote}</p>
      </div>
    </div>
  );
}
