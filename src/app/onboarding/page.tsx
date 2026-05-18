'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './onboarding.css';

const SCREENS = [
  {
    step: 1,
    tag: 'The Problem',
    deva: 'विक्षेप — Mental Scattering',
    headline: 'Your attention span has dropped from',
    highlight: '2.5 minutes → 65 seconds',
    body: 'In 20 years. Not laziness. Not weakness. Measurable, structural, grey-matter change — confirmed by Diffusion Tensor MRI at IISc Bangalore and Stanford.',
    stats: [
      { n: '35%', l: 'impulse-control lost', c: '#f87171' },
      { n: '82%', l: 'memory outsourced', c: '#fb923c' },
      { n: '88%', l: 'threat sensitivity up', c: '#a78bfa' },
    ],
    cta: 'Show me the fix →',
    sub: 'Scroll to continue',
  },
  {
    step: 2,
    tag: 'The Prescription',
    deva: 'अभ्यास — Deliberate Practice',
    headline: 'Three practices. Five minutes each.',
    highlight: 'Every single morning.',
    body: 'Before you open any app. Before you check anything. These three actions physically begin restoring the grey matter you lost. Peer-reviewed, measurable, ancient.',
    practices: [
      { n: 'Silent Meditation', d: '20 min', boost: '+28%', col: '#a78bfa', icon: '🧘' },
      { n: 'Deep Reading', d: '1 hr', boost: '+34%', col: '#34d399', icon: '📖' },
      { n: 'Pranayama', d: '15 min', boost: '+22%', col: '#60a5fa', icon: '🌬️' },
    ],
    cta: 'I\'m ready →',
    sub: 'One more step',
  },
  {
    step: 3,
    tag: 'Your First Practice',
    deva: 'आरम्भ — The Beginning',
    headline: 'Which practice will you',
    highlight: 'do right now?',
    body: 'Tap one. The app will guide you through it. That\'s the whole onboarding. You learn by doing, not by reading about doing.',
    choices: [
      { id: 'meditation', n: 'Sit in silence', d: '20 min · Start here', icon: '🧘', col: '#a78bfa' },
      { id: 'pranayama', n: 'Breathe slowly', d: '15 min · Quickest entry', icon: '🌬️', col: '#60a5fa' },
      { id: 'read', n: 'Read deeply', d: '1 hr · Highest restoration', icon: '📖', col: '#34d399' },
    ],
    cta: null,
    sub: null,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // If already onboarded, skip
    if (localStorage.getItem('ank_onboarded') === 'true') {
      router.replace('/');
    }
  }, [router]);

  const next = () => {
    if (animating) return;
    if (screen < SCREENS.length - 1) {
      setAnimating(true);
      setTimeout(() => { setScreen(s => s + 1); setAnimating(false); }, 300);
    }
  };

  const complete = (practiceId?: string) => {
    localStorage.setItem('ank_onboarded', 'true');
    if (practiceId) {
      localStorage.setItem('ank_first_practice', practiceId);
    }
    router.push('/');
  };

  const s = SCREENS[screen];
  const progress = ((screen + 1) / SCREENS.length) * 100;

  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" id="sob">

          {/* Progress bar */}
          <div className="ob-progress">
            <div className="ob-prog-fill" style={{ width: `${progress}%` }}/>
          </div>

          {/* Step indicator */}
          <div className="ob-steps">
            {SCREENS.map((_, i) => (
              <div key={i} className={`ob-step ${i === screen ? 'on' : ''} ${i < screen ? 'done' : ''}`}/>
            ))}
          </div>

          <div className={`ob-body ${animating ? 'ob-exit' : 'ob-enter'}`}>

            {/* Tag */}
            <div className="ob-tag mono">{s.tag}</div>
            <div className="ob-deva deva">{s.deva}</div>

            {/* Headline */}
            <h2 className="ob-headline serif">
              {s.headline}<br/>
              <em>{s.highlight}</em>
            </h2>

            <p className="ob-body-text">{s.body}</p>

            {/* Screen 1: Stats */}
            {s.stats && (
              <div className="ob-stats">
                {s.stats.map((st, i) => (
                  <div key={i} className="ob-stat" style={{ '--sc': st.c } as React.CSSProperties}>
                    <div className="ob-stat-n serif" style={{ color: st.c }}>{st.n}</div>
                    <div className="ob-stat-l">{st.l}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Screen 2: Practices */}
            {s.practices && (
              <div className="ob-practices">
                {s.practices.map((p, i) => (
                  <div key={i} className="ob-practice" style={{ '--pc': p.col } as React.CSSProperties}>
                    <div className="ob-practice-icon">{p.icon}</div>
                    <div className="ob-practice-body">
                      <div className="ob-practice-n">{p.n}</div>
                      <div className="ob-practice-d mono">{p.d}</div>
                    </div>
                    <div className="ob-practice-boost mono" style={{ color: '#34d399' }}>{p.boost}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Screen 3: Practice choices */}
            {s.choices && (
              <div className="ob-choices">
                {s.choices.map((c) => (
                  <button key={c.id} className="ob-choice" onClick={() => complete(c.id)}
                    style={{ '--cc': c.col } as React.CSSProperties}>
                    <div className="ob-choice-icon">{c.icon}</div>
                    <div className="ob-choice-body">
                      <div className="ob-choice-n">{c.n}</div>
                      <div className="ob-choice-d mono">{c.d}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.col} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                ))}
                <button className="ob-skip" onClick={() => complete()}>
                  Skip — just show me the app
                </button>
              </div>
            )}

            {/* CTA button (screens 1 & 2) */}
            {s.cta && (
              <button className="ob-cta" onClick={next}>
                {s.cta}
              </button>
            )}

            {s.sub && <div className="ob-sub mono">{s.sub}</div>}

          </div>

          {/* Cite footer */}
          <div className="ob-cite mono">
            IISc Bangalore · SVYASA · Stanford · Harvard · OECD
          </div>

        </div>
      </div>
    </div>
  );
}
