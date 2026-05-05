'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Gateway() {
  const router = useRouter();

  const [tovVisible, setTovVisible] = useState(false);
  const [tovQuote, setTovQuote] = useState('"तमसो मा ज्योतिर्गमय — Lead me from darkness to light"');
  const [mounted, setMounted] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'guest' | 'login' | 'signup'>('guest');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const showTransition = () => {
    setTovQuote('"तमसो मा ज्योतिर्गमय — Lead me from darkness to light"');
    setTovVisible(true);
    setTimeout(() => {
      router.push('/dashboard');
      router.refresh();
    }, 2500);
  };

  const handleAuth = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      // If email confirmation is required, show message
      // If user is auto-confirmed (Supabase setting), redirect
      if (data.session) {
        showTransition();
      } else {
        setSignupSuccess(true);
        setLoading(false);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      showTransition();
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setError('');
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
    }
  };

  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" id="sg">

          {/* ═══ HERO SECTION — Lotus + Brand ═══ */}
          <div className="gw-hero">
            <div className="gw-depth-1"></div>
            <div className="gw-depth-2"></div>
            <div className="gw-depth-3"></div>

            <div className="gw-particles">
              <div className="gw-p gw-p1"></div>
              <div className="gw-p gw-p2"></div>
              <div className="gw-p gw-p3"></div>
              <div className="gw-p gw-p4"></div>
              <div className="gw-p gw-p5"></div>
              <div className="gw-p gw-p6"></div>
              <div className="gw-p gw-p7"></div>
              <div className="gw-p gw-p8"></div>
            </div>

            <div className={`gw-lotus-wrap ${mounted ? 'in' : ''}`}>
              <div className="gw-aura"></div>
              <svg className="gw-mandala" viewBox="0 0 200 200" fill="none">
                <g opacity=".48">
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(45 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(90 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(135 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(180 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(225 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(270 100 100)"/>
                  <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(315 100 100)"/>
                </g>
                <g opacity=".58">
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5"/>
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(60 100 100)"/>
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(120 100 100)"/>
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(180 100 100)"/>
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(240 100 100)"/>
                  <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(300 100 100)"/>
                </g>
                <circle cx="100" cy="100" r="75" stroke="#c8902a" strokeWidth=".7" opacity=".28"/>
                <circle cx="100" cy="100" r="62" stroke="#c8902a" strokeWidth=".6" opacity=".22"/>
                <circle cx="100" cy="100" r="48" stroke="#e8b84b" strokeWidth=".8" opacity=".3"/>
                <circle cx="100" cy="100" r="34" stroke="#e8b84b" strokeWidth=".8" opacity=".36"/>
                <path d="M100 62 L132 116 L68 116 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
                <path d="M100 138 L68 84 L132 84 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
                <circle cx="100" cy="100" r="9" fill="rgba(232,184,75,.28)"/>
                <circle cx="100" cy="100" r="4" fill="#e8b84b" opacity=".65"/>
              </svg>
            </div>

            <div className={`gw-brand ${mounted ? 'in' : ''}`}>
              <div className="gw-brand-pre">अन्तःकरण</div>
              <h1 className="gw-brand-name">Antahkarana</h1>
              <div className="gw-brand-line"></div>
              <div className="gw-brand-tag">The Inner Instrument</div>
            </div>
          </div>

          {/* ═══ FORM SECTION ═══ */}
          <div className={`gw-form ${mounted ? 'in' : ''}`}>
            <div className="gw-h">{mode === 'guest' ? 'Enter Your Sanctuary' : mode === 'signup' ? 'Begin Your Sanctuary' : 'Restore Progress'}</div>
            <div className="gw-sub">
              <div className="gw-deva">तमसो मा ज्योतिर्गमय</div>
              <div className="gw-tr">Lead me from darkness to light</div>
            </div>

            {error && (
              <div style={{
                background:'rgba(192,64,64,.12)',border:'1px solid rgba(192,64,64,.3)',
                borderRadius:'10px',padding:'10px 14px',marginBottom:'14px',
                fontSize:'12px',color:'#e08080',fontFamily:'var(--mono)',textAlign:'center'
              }}>{error}</div>
            )}

            {signupSuccess && (
              <div style={{
                background:'rgba(82,168,120,.1)',border:'1px solid rgba(82,168,120,.3)',
                borderRadius:'14px',padding:'20px 18px',marginBottom:'14px',textAlign:'center'
              }}>
                <div style={{fontSize:'28px',marginBottom:'8px'}}>✉️</div>
                <div style={{fontFamily:'var(--serif)',fontSize:'18px',color:'var(--gold2)',marginBottom:'6px'}}>Check Your Email</div>
                <div style={{fontSize:'13px',color:'var(--t2)',lineHeight:1.6,marginBottom:'12px'}}>
                  We sent a confirmation link to <strong style={{color:'var(--t1)'}}>{email}</strong>. Click it to activate your account, then return here to sign in.
                </div>
                <button className="btn btn-o btn-sm" onClick={() => { setSignupSuccess(false); setMode('login'); }}>
                  ← Back to Sign In
                </button>
              </div>
            )}

            {mode === 'guest' ? (
              <>
                <button
                  className="btn btn-g gw-cta"
                  onClick={() => { document.cookie = "guest_mode=true; path=/; SameSite=Lax"; showTransition(); }}
                >
                  <span>Begin the Journey</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <div className="gw-divider">
                  <div className="gw-div-line"></div>
                  <span>or restore progress</span>
                  <div className="gw-div-line"></div>
                </div>
                <div className="social-r">
                  <button className="btn-soc" onClick={() => handleOAuth('google')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                  <button className="btn-soc" onClick={() => { setMode('login'); setError(''); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <div className="field-lbl">Email</div>
                  <input
                    type="email"
                    placeholder="soul@sanctuary.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  />
                </div>
                <div className="field">
                  <div className="field-lbl">Mantra (Password)</div>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  />
                </div>

                <button
                  className="btn btn-g gw-cta"
                  onClick={handleAuth}
                  disabled={loading}
                  style={loading ? {opacity:.6, pointerEvents:'none'} : {}}
                >
                  <span>{loading ? 'Entering...' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                  {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
                </button>

                <div className="gw-foot" style={{marginTop: '14px'}}>
                  {mode === 'login' ? (
                    <>New to this path? <a onClick={() => { setMode('signup'); setError(''); }}>Create account ›</a><br/><br/><a onClick={() => { setMode('guest'); setError(''); }} style={{opacity:0.6}}>← Back</a></>
                  ) : (
                    <>Already on the path? <a onClick={() => { setMode('login'); setError(''); }}>Sign in ›</a><br/><br/><a onClick={() => { setMode('guest'); setError(''); }} style={{opacity:0.6}}>← Back</a></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ═══ TRANSITION OVERLAY ═══ */}
        <div className={`tov ${tovVisible ? 'show' : ''}`}>
          <div className="tov-aura"></div>
          <div className="tov-ring-outer"></div>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" style={{position:'relative', zIndex:1}}>
            <g className="shat-a"><polygon points="55,14 91,73 19,73" stroke="rgba(200,144,42,.6)" strokeWidth="1.2" fill="rgba(200,144,42,.05)"/></g>
            <g className="shat-b"><polygon points="55,96 19,37 91,37" stroke="rgba(232,184,75,.55)" strokeWidth="1.2" fill="rgba(232,184,75,.05)"/></g>
            <circle cx="55" cy="55" r="20" stroke="rgba(232,184,75,.25)" strokeWidth=".8" className="bindu-ring"/>
            <circle cx="55" cy="55" r="11" fill="rgba(200,144,42,.35)" className="bindu-dot"/>
            <circle cx="55" cy="55" r="4.5" fill="rgba(245,208,128,.9)"/>
          </svg>
          <div className="tov-quote">{tovQuote}</div>
          <div className="tdots"><div className="td"></div><div className="td"></div><div className="td"></div></div>
        </div>
      </div>
    </div>
  );
}
