'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TIERS, TRADEOFFS, HABITS } from '@/data/content';
import './landing.css';

// ─── Colorful SVG Icons ───────────────────────────────────────────
const PRACTICE_ICONS: Record<string, { bg: string; fg: string; path: string }> = {
  meditation: { bg: '#3d2a7a', fg: '#a78bfa', path: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM7 14c0-2.76 2.24-5 5-5s5 2.24 5 5v1H7v-1zM4 20h16M12 2v1' },
  reading:    { bg: '#1a3a2a', fg: '#34d399', path: 'M12 21V7M12 7C10 4 6 3 2 4.5V19c4-1.5 8-.5 10 2M12 7c2-3 6-4 10-2.5V19c-4-1.5-8-.5-10 2' },
  pranayama:  { bg: '#1e2a4a', fg: '#60a5fa', path: 'M2 12c2-4 5-5 8-2s6 2 8-2M2 17c2-4 5-5 8-2s6 2 8-2M2 7c2-4 5-5 8-2s6 2 8-2' },
  walk:       { bg: '#2a1a10', fg: '#fb923c', path: 'M13 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zM9 8l-2 5 2 1-1.5 6h2l2-4.5 2 4.5h2L14 14l2.5-1L14 8H9z' },
  namjap:     { bg: '#3a1a3a', fg: '#e879f9', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.86 0 7 3.14 7 7M12 7v5l3 3' },
  handwriting:{ bg: '#2a1a10', fg: '#fbbf24', path: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3zM15 5l4 4' },
  silence:    { bg: '#1a2a3a', fg: '#38bdf8', path: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0M3 3l18 18' },
  handwork:   { bg: '#1a3a2a', fg: '#4ade80', path: 'M18 11V6l-8.5 8.5-1.5-1.5L13.5 8H8M6 18l3-3' },
  sleep:      { bg: '#1a1a3a', fg: '#818cf8', path: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' },
};
const PRACTICE_KEYS = ['meditation','reading','pranayama','walk','namjap','handwriting','silence','handwork','sleep'];

function PIcon({ type }: { type: string }) {
  const ic = PRACTICE_ICONS[type];
  return (
    <div className="lp-picon" style={{ background: ic.bg, boxShadow: `0 0 12px ${ic.fg}28` }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ic.fg} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={ic.path}/>
      </svg>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [attentionSecs, setAttentionSecs] = useState(65);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);

    // Attention counter animation
    let frame: number;
    let start = 0;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 1800, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAttentionSecs(Math.round(150 - eased * 85));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const delayFrame = setTimeout(() => { frame = requestAnimationFrame(animate); }, 1200);

    // IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.closest('.lp-ag');
            if (parent) {
              parent.querySelectorAll('.la, .la-flip').forEach((el, idx) => {
                setTimeout(() => el.classList.add('lv'), idx * 75);
              });
            } else {
              entry.target.classList.add('lv');
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.la, .la-flip').forEach(el => observerRef.current?.observe(el));

    // Gyroscope
    const wrap = document.getElementById('lp-mwrap');
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!wrap) return;
      const x = Math.max(-15, Math.min(15, e.beta ?? 0)) * 0.35;
      const y = Math.max(-15, Math.min(15, e.gamma ?? 0)) * 0.35;
      wrap.style.transform = `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`;
    };
    const tryGyro = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const DOE = DeviceOrientationEvent as any;
      if (typeof DOE.requestPermission === 'function') {
        DOE.requestPermission().then((s: string) => {
          if (s === 'granted') window.addEventListener('deviceorientation', handleOrientation, true);
        }).catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    };
    wrap?.addEventListener('touchstart', tryGyro, { once: true });

    return () => {
      clearTimeout(t); clearTimeout(delayFrame);
      cancelAnimationFrame(frame);
      observerRef.current?.disconnect();
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Core daily loop: first 3 habits
  const dailyLoop = HABITS.slice(0, 3);

  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" id="slp">
          <div className="lp-scroll">

            {/* ═══ HERO: THE PROBLEM ═══ */}
            <div className="lp-hero">
              <div className="lp-hbg1"/><div className="lp-hbg2"/><div className="lp-hbg3"/>

              <div id="lp-mwrap" className="lp-mandala-wrap">
                <svg className={`lp-mandala ${mounted ? 'in' : ''}`} viewBox="0 0 200 200" fill="none">
                  <g opacity=".45">{[0,45,90,135,180,225,270,315].map(r=><ellipse key={r} cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform={r?`rotate(${r} 100 100)`:undefined}/>)}</g>
                  <g opacity=".55">{[0,60,120,180,240,300].map(r=><ellipse key={r} cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform={r?`rotate(${r} 100 100)`:undefined}/>)}</g>
                  <circle cx="100" cy="100" r="75" stroke="#c8902a" strokeWidth=".7" opacity=".25"/>
                  <circle cx="100" cy="100" r="48" stroke="#e8b84b" strokeWidth=".8" opacity=".28"/>
                  <path d="M100 62 L132 116 L68 116 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
                  <path d="M100 138 L68 84 L132 84 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
                  <circle cx="100" cy="100" r="4" fill="#e8b84b" opacity=".7"/>
                </svg>
              </div>

              <div className={`lp-hcontent ${mounted ? 'in' : ''}`}>
                <div className="lp-hpre deva">अन्तःकरण</div>
                <h1 className="lp-htitle serif">Antahkarana</h1>
                <div className="lp-hline"/>
                <div className="lp-hsub mono">The Inner Instrument</div>
              </div>

              {/* The hook — the problem statement */}
              <div className={`lp-hstat ${mounted ? 'in' : ''}`}>
                <div className="lp-attention-counter">
                  <div className="lp-ac-label mono">Average focus span in 2024</div>
                  <div className="lp-ac-num serif">
                    <span className="lp-ac-val" style={{ color: attentionSecs < 80 ? '#f87171' : '#fb923c' }}>{attentionSecs}</span>
                    <span className="lp-ac-unit">sec</span>
                  </div>
                  <div className="lp-ac-context mono">Down from 2.5 min in 2004 · Mark et al., 2016</div>
                </div>
              </div>

              <div className={`lp-hactions ${mounted ? 'in' : ''}`}>
                <button className="lp-cta-btn" onClick={() => router.push('/')}>
                  See the fix
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button className="lp-explore-link" onClick={() => router.push('/explore')}>
                  Explore the science — no login
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              <div className={`lp-hint ${mounted ? 'in' : ''}`}>
                <div className="lp-hint-dot"/>
                <span className="mono">The science below</span>
              </div>
            </div>

            {/* ═══ WHAT IS HAPPENING TO YOUR BRAIN ═══ */}
            <div className="lp-sec lp-sec-problem">
              <div className="lp-tag la mono"><span>The Crisis</span></div>
              <h2 className="lp-h2 la serif">This is not distraction.<br/>This is <em>structural damage.</em></h2>
              <p className="lp-body la">Diffusion Tensor MRI confirms measurable grey matter changes in heavy digital users. The prefrontal cortex — seat of deep reasoning — is physically thinning.</p>

              {/* 3-column hard numbers */}
              <div className="lp-crisis-stats lp-ag">
                {[
                  { n: '35%', l: 'impulse-control lost', c: '#f87171', cite: 'Loh & Kanai, 2014' },
                  { n: '80%', l: 'DMN suppressed', c: '#a78bfa', cite: 'Raichle et al.' },
                  { n: '82%', l: 'memory outsourced', c: '#fb923c', cite: 'Hartzell 2018' },
                ].map((s, i) => (
                  <div key={i} className="lp-cstat la" style={{ '--sc': s.c } as React.CSSProperties}>
                    <div className="lp-cstat-n serif" style={{ color: s.c }}>{s.n}</div>
                    <div className="lp-cstat-l">{s.l}</div>
                    <div className="lp-cstat-cite mono">{s.cite}</div>
                  </div>
                ))}
              </div>

              {/* The 7 trade-offs — the viral table */}
              <div className="lp-to-header la">
                <span className="mono" style={{ fontSize: '10px', color: 'var(--gold3)', letterSpacing: '2px', textTransform: 'uppercase' }}>The 7 neural trade-offs happening now</span>
              </div>
              <div className="lp-tradeoffs lp-ag">
                {TRADEOFFS.map((t, i) => (
                  <div key={i} className="lp-to la" style={{ '--bw': `${t.pct}%`, '--bc': i < 4 ? '#f87171' : '#fb923c' } as React.CSSProperties}>
                    <div className="lp-to-row">
                      <span className="lp-to-n">{t.n}</span>
                      <span className="lp-to-p" style={{ color: i < 4 ? '#f87171' : '#fb923c' }}>{t.pct}%</span>
                    </div>
                    <div className="lp-to-v mono">{t.vedic}</div>
                    <div className="lp-to-bar"><div className="lp-to-fill"/></div>
                  </div>
                ))}
              </div>

              <div className="lp-pull la">
                <p className="serif">The same neuroplasticity that caused this degradation can drive restoration — <em>in 8–12 weeks.</em></p>
              </div>
            </div>

            {/* ═══ THE COGNITIVE SPECTRUM — shareable, no auth ═══ */}
            <div className="lp-sec lp-sec-alt">
              <div className="lp-tag la mono"><span>Where do you fall?</span></div>
              <h2 className="lp-h2 la serif">The Global Cognitive<br/><em>Spectrum — 2024</em></h2>
              <p className="lp-body la">Recalibrated using OECD PIAAC (250,000 adults across 39 countries), UNESCO literacy data, and DataReportal 2024 screen time analysis.</p>

              <div className="lp-tiers lp-ag">
                {TIERS.map((t, i) => (
                  <div key={i} className="lp-tier la" style={{ '--tc': t.col } as React.CSSProperties}>
                    <div className="lp-tier-bar" style={{ width: t.pct, background: t.col, opacity: 0.18 }}/>
                    <div className="lp-tier-left">
                      <div className="lp-tier-n" style={{ color: t.col }}>{t.n} <span className="deva" style={{ fontSize: '11px', opacity: .7 }}>{t.deva}</span></div>
                      <div className="lp-tier-proc mono">{t.proc} processing</div>
                    </div>
                    <div className="lp-tier-right">
                      <div className="lp-tier-pct" style={{ color: t.col }}>{t.pct}</div>
                      <div className="lp-tier-pop mono">{t.pop}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lp-tier-note la">
                <div className="lp-tier-note-line"/>
                <p className="mono" style={{ fontSize: '10px', color: 'var(--t3)', lineHeight: 1.7 }}>
                  The 10% figure is shrinking. The monitoring circuits that would alert people to this degradation are themselves being degraded first.
                </p>
              </div>
            </div>

            {/* ═══ THE CORE DAILY LOOP ═══ */}
            <div className="lp-sec">
              <div className="lp-tag la mono"><span>The Daily Loop</span></div>
              <h2 className="lp-h2 la serif">Three practices.<br/><em>Five minutes each.</em><br/>Every day.</h2>
              <p className="lp-body la">That is the core loop. Everything else in the app is secondary. Start here, every morning, before you touch your phone.</p>

              <div className="lp-loop lp-ag">
                {dailyLoop.map((h, i) => {
                  const key = PRACTICE_KEYS[i] || 'meditation';
                  return (
                    <div key={h.id} className="lp-loop-item la">
                      <div className="lp-loop-num serif">{String(i+1).padStart(2,'0')}</div>
                      <PIcon type={key} />
                      <div className="lp-loop-body">
                        <div className="lp-loop-n">{h.n}</div>
                        <div className="lp-loop-meta mono">
                          <span style={{ color: 'var(--saffron2)' }}>{h.dur}</span>
                          <span style={{ color: 'var(--t4)', margin: '0 6px' }}>·</span>
                          <span style={{ color: 'var(--jade)' }}>{h.boost} restore</span>
                        </div>
                        <div className="lp-loop-deva deva">{h.deva}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lp-loop-note la">
                <div className="mono" style={{ fontSize: '9px', color: 'var(--t4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>What the app tracks for you</div>
                {[
                  { icon: '🔥', l: 'Svāsa Fire', d: 'Your consecutive practice streak' },
                  { icon: '📊', l: 'Praana Score', d: 'Neural restoration across all 7 trade-offs' },
                  { icon: '🏆', l: '8 Milestones', d: 'From First Step to The Quiet Inheritor' },
                ].map((x, i) => (
                  <div key={i} className="lp-track-item">
                    <span>{x.icon}</span>
                    <div><span className="lp-track-l">{x.l}</span><span className="lp-track-d"> — {x.d}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ THE FULL PRESCRIPTION ═══ */}
            <div className="lp-sec lp-sec-alt">
              <div className="lp-tag la mono"><span>The Prescription</span></div>
              <h2 className="lp-h2 la serif">Nine practices — each<br/>mapped to <em>a brain region</em></h2>
              <div className="lp-plist lp-ag">
                {HABITS.map((h, i) => (
                  <div key={h.id} className="lp-pitem la">
                    <PIcon type={PRACTICE_KEYS[i] || 'meditation'} />
                    <div className="lp-pitem-mid">
                      <div className="lp-pitem-n">{h.n}</div>
                      <div className="lp-pitem-d mono">{h.dur} · <span className="deva" style={{ fontSize: '11px' }}>{h.deva}</span></div>
                    </div>
                    <div className="lp-pitem-right">
                      <div className="lp-pitem-boost mono" style={{ color: '#34d399' }}>{h.boost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ THE ANCIENT FOUNDATION ═══ */}
            <div className="lp-sec">
              <div className="lp-tag la mono"><span>Why it works</span></div>
              <h2 className="lp-h2 la serif">Modern neuroscience.<br/><em>Ancient diagnosis.</em></h2>
              <div className="lp-qcard la">
                <div className="lp-qcard-top"/>
                <div className="lp-qdeva deva">तमसो मा ज्योतिर्गमय।<br/>मृत्योर्मा अमृतं गमय।</div>
                <div className="lp-qen serif">Lead me from darkness to light.<br/>Lead me from death to immortality.</div>
                <div className="lp-qsrc mono">Bṛhadāraṇyaka Upaniṣad · 1.3.28</div>
              </div>
              <div className="lp-parallels lp-ag">
                {[
                  { modern: '65-second focus window', ancient: 'Pratyahāra — withdrawal of the senses', cite: 'Yoga Sutras 2.54' },
                  { modern: 'Hippocampal atrophy (transactive memory)', ancient: 'Sanskrit Effect — mantra memorisation grows grey matter', cite: 'Hartzell, Sci Am 2018' },
                  { modern: 'DMN suppression by constant stimulation', ancient: 'Dhyāna — 20-min daily silence restores DMN', cite: 'IISc Bangalore 2026' },
                  { modern: 'Amygdala hyper-reactivity (88%)', ancient: 'Prāṇāyāma reduces cortisol 22%', cite: 'Stanford 2023' },
                ].map((p, i) => (
                  <div key={i} className={`lp-parallel la${i%2===1?' la-flip':''}`}>
                    <div className="lp-par-modern mono">{p.modern}</div>
                    <div className="lp-par-arrow">→</div>
                    <div className="lp-par-ancient serif">{p.ancient}</div>
                    <div className="lp-par-cite mono">{p.cite}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ DESIGN PRINCIPLES ═══ */}
            <div className="lp-sec lp-sec-alt">
              <div className="lp-tag la mono"><span>Design Philosophy</span></div>
              <h2 className="lp-h2 la serif">The opposite of<br/><em>every other app</em></h2>
              <div className="lp-phils lp-ag">
                {[
                  { icon: '🚫', t: 'No Infinite Scroll', d: 'Every section ends. You reach the bottom.' },
                  { icon: '🔕', t: 'No Notifications', d: 'The app waits for you to return with intention.' },
                  { icon: '⏳', t: 'Deliberate Friction', d: 'Mandala transitions counteract compulsive tapping.' },
                  { icon: '🔓', t: 'Guest-First', d: 'Explore everything before creating an account.' },
                  { icon: '🕉️', t: 'Sanskrit as Interface', d: 'Cognitive re-patterning, not decoration.' },
                ].map((p, i) => (
                  <div key={i} className="lp-phil la">
                    <div className="lp-phil-icon">{p.icon}</div>
                    <div className="lp-phil-body">
                      <div className="lp-phil-t">{p.t}</div>
                      <div className="lp-phil-d">{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ CTA ═══ */}
            <div className="lp-cta">
              <div className="lp-cta-glow"/>
              <div className="lp-cta-deva deva la">लोकाः समस्ताः सुखिनो भवन्तु</div>
              <h2 className="lp-cta-h la serif">Your attention span is<br/><em>not permanently lost.</em></h2>
              <p className="lp-cta-p la">Grey matter recovery is measurable within 8–12 weeks of structured practice. IISc, SVYASA, and Harvard confirm it.</p>
              <button className="lp-cta-btn la" onClick={() => router.push('/')}>
                Begin — It&apos;s Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <p className="lp-cta-note la mono">No account required · PWA · Works offline · Open source</p>
            </div>

            {/* ═══ RESEARCH TICKER ═══ */}
            <div className="lp-ticker">
              <div className="lp-ticker-inner">
                {['Mark et al. 2016','Loh & Kanai 2014','Uncapher 2018','IISc Bangalore 2026','Hartzell 2018','Walker 2017','Erickson 2011','SVYASA 2024','Berns 2013','OECD PIAAC 2023',
                  'Mark et al. 2016','Loh & Kanai 2014','Uncapher 2018','IISc Bangalore 2026'].map((r, i) => (
                  <span key={i} className="lp-tick">{r}</span>
                ))}
              </div>
            </div>

            {/* ═══ FOOTER ═══ */}
            <div className="lp-footer">
              <div className="lp-footer-brand deva">अन्तःकरण</div>
              <div className="lp-footer-mantra">
                <div className="deva" style={{ color: 'var(--gold3)', fontSize: '13px' }}>लोकाः समस्ताः सुखिनो भवन्तु</div>
                <div className="serif" style={{ fontSize: '11px', color: 'var(--t4)', fontStyle: 'italic' }}>May all beings be happy and free.</div>
              </div>
              <div className="lp-footer-links mono">
                <a href="https://github.com/tejastarun007/Antahkarana-Cure-to-Brain-Rot" target="_blank" rel="noopener noreferrer">GitHub</a>
                <span>·</span>
                <a href="/explore">Explore</a>
                <span>·</span>
                <a href="/">Enter App</a>
                <span>·</span>
                <a href="#">MIT</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
