'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TIERS, TRADEOFFS, ERAS } from '@/data/content';
import './explore.css';

export default function ExplorePage() {
  const router = useRouter();
  const [tab, setTab] = useState<'spectrum' | 'timeline' | 'tradeoffs'>('spectrum');
  const [openEra, setOpenEra] = useState(-1);
  const [openTO, setOpenTO] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setMounted(true);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('xv'); observerRef.current?.unobserve(e.target); }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.xa').forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [tab]);

  return (
    <div className="phone">
      <div className="screens">
        <div className="screen on" id="sxp">

          {/* Top bar */}
          <div className="xp-topbar">
            <button className="xp-back" onClick={() => router.push('/')} aria-label="Back">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div className="xp-title-wrap">
              <div className="xp-pre deva">अन्तःकरण</div>
              <div className="xp-title serif">Explore</div>
            </div>
            <button className="xp-cta-sm" onClick={() => router.push('/')}>Enter App</button>
          </div>

          {/* Tab nav */}
          <div className="xp-tabs">
            {([
              { id: 'spectrum',  label: 'Spectrum' },
              { id: 'timeline',  label: '1000 Years' },
              { id: 'tradeoffs', label: '7 Trade-offs' },
            ] as const).map(t => (
              <button
                key={t.id}
                className={`xp-tab ${tab === t.id ? 'on' : ''}`}
                onClick={() => { setTab(t.id); setOpenEra(-1); setOpenTO(-1); }}
              >{t.label}</button>
            ))}
          </div>

          <div className="scroll xp-scroll">

            {/* ═══ COGNITIVE SPECTRUM ═══ */}
            {tab === 'spectrum' && (
              <div className="xp-sec" key="spectrum">
                <div className={`xp-hero xa ${mounted ? 'xv' : ''}`}>
                  <div className="xp-h mono">THE GLOBAL COGNITIVE SPECTRUM</div>
                  <p className="xp-sub">
                    Recalibrated using OECD PIAAC (250,000 adults · 39 countries),
                    UNESCO literacy data, WHO activity reports & DataReportal 2024.
                  </p>
                  <div className="xp-stat-row">
                    <div className="xp-stat" style={{ '--xc': '#34d399' } as React.CSSProperties}>
                      <div className="xp-stat-n serif">10%</div>
                      <div className="xp-stat-l">Can direct AI</div>
                    </div>
                    <div className="xp-stat" style={{ '--xc': '#fbbf24' } as React.CSSProperties}>
                      <div className="xp-stat-n serif">27%</div>
                      <div className="xp-stat-l">Cognitively atrophied</div>
                    </div>
                    <div className="xp-stat" style={{ '--xc': '#f87171' } as React.CSSProperties}>
                      <div className="xp-stat-n serif">↓</div>
                      <div className="xp-stat-l">Shrinking every year</div>
                    </div>
                  </div>
                </div>

                <div className="xp-tiers">
                  {TIERS.map((t, i) => (
                    <div key={i} className="xp-tier xa" style={{ '--tc': t.col, '--td': `${i * 90}ms` } as React.CSSProperties}>
                      <div className="xp-tier-side" style={{ background: t.col }}/>
                      <div className="xp-tier-body">
                        <div className="xp-tier-head">
                          <div>
                            <div className="xp-tier-n" style={{ color: t.col }}>
                              {t.n}
                              <span className="deva xp-tier-deva">{t.deva}</span>
                            </div>
                            <div className="xp-tier-proc mono">{t.proc} processing</div>
                          </div>
                          <div className="xp-tier-right">
                            <div className="xp-tier-pct serif" style={{ color: t.col }}>{t.pct}</div>
                            <div className="xp-tier-pop mono">{t.pop}</div>
                          </div>
                        </div>
                        <div className="xp-tier-bar-wrap">
                          <div className="xp-tier-bar" style={{ background: t.col }}/>
                        </div>
                        <div className="xp-tier-desc">{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="xp-note xa">
                  <div className="xp-note-icon">⚠</div>
                  <p className="mono">The monitoring circuits that would alert you to this degradation are themselves being degraded first. By the time most people notice, they lack the capacity to act.</p>
                </div>

                <div className="xp-cta-block xa">
                  <div className="deva xp-mantra">लोकाः समस्ताः सुखिनो भवन्तु</div>
                  <p className="serif" style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--gold2)', marginBottom: '20px' }}>
                    &ldquo;Grey matter recovery is measurable in 8–12 weeks.&rdquo;
                  </p>
                  <button className="xp-cta-btn" onClick={() => router.push('/')}>
                    Begin Restoring — It&apos;s Free
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ 1000-YEAR TIMELINE ═══ */}
            {tab === 'timeline' && (
              <div className="xp-sec" key="timeline">
                <div className="xp-hero xa">
                  <div className="xp-h mono">1000 YEARS OF COGNITIVE EVOLUTION</div>
                  <p className="xp-sub">How each technology shift reshaped human neural architecture. Data: UNESCO, WHO, OECD PIAAC, Hilbert & Lopez (Science 2011).</p>
                  <div className="xp-stat-row">
                    <div className="xp-stat" style={{ '--xc': '#f87171' } as React.CSSProperties}>
                      <div className="xp-stat-n serif">700×</div>
                      <div className="xp-stat-l">Info rate since 1000 CE</div>
                    </div>
                    <div className="xp-stat" style={{ '--xc': '#a78bfa' } as React.CSSProperties}>
                      <div className="xp-stat-n serif">↓</div>
                      <div className="xp-stat-l">Comprehension depth</div>
                    </div>
                  </div>
                </div>

                <div className="xp-eras">
                  {ERAS.map((e, i) => {
                    const warm = e.v > 60 ? Math.min(1, (e.v - 60) / 290) : 0;
                    const r = Math.round(80 + warm * 175), g = Math.round(140 - warm * 120), b = Math.round(80 - warm * 60);
                    const col = `rgb(${Math.min(255,r)},${Math.max(0,g)},${Math.max(0,b)})`;
                    const barW = Math.round(e.v / 350 * 100);
                    return (
                      <div key={i} className="xp-era xa" onClick={() => setOpenEra(openEra === i ? -1 : i)}>
                        <div className="xp-era-row">
                          <div className="xp-era-yr mono">{e.y}</div>
                          <div className="xp-era-bar-wrap">
                            <div className="xp-era-bar" style={{ width: `${barW}%`, background: col }}/>
                          </div>
                          <div className="xp-era-val mono" style={{ color: col }}>{e.v}</div>
                          <div className="xp-era-chevron" style={{ transform: openEra === i ? 'rotate(180deg)' : 'none' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                          </div>
                        </div>
                        {openEra === i && (
                          <div className="xp-era-detail">
                            <span style={{ color: 'var(--gold2)', fontWeight: 600 }}>{e.era}: </span>{e.desc}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="xp-note xa">
                  <div className="deva" style={{ fontSize: '15px', color: 'var(--gold2)', marginBottom: '6px' }}>मनो हि द्विविधं प्रोक्तम्</div>
                  <p className="mono" style={{ fontSize: '10px', color: 'var(--t3)' }}>
                    The mind is twofold: pure (Sattva-dominant) and impure (Manas-dominant). The modern condition is Manas dominance. The rishis mapped this 4,000 years before MRI confirmed it.
                  </p>
                </div>

                <div className="xp-cta-block xa">
                  <button className="xp-cta-btn" onClick={() => router.push('/')}>
                    Begin Restoring — It&apos;s Free
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ 7 TRADE-OFFS ═══ */}
            {tab === 'tradeoffs' && (
              <div className="xp-sec" key="tradeoffs">
                <div className="xp-hero xa">
                  <div className="xp-h mono">THE 7 NEURAL TRADE-OFFS</div>
                  <p className="xp-sub">Brain energy budget: ~20 watts. Zero-sum. When one region gains dominance, others yield. All 7 are moving in the same direction simultaneously.</p>
                </div>

                <div className="xp-tos">
                  {TRADEOFFS.map((t, i) => {
                    const col = i < 4 ? '#f87171' : '#fb923c';
                    return (
                      <div key={i} className="xp-to xa" onClick={() => setOpenTO(openTO === i ? -1 : i)}
                        style={{ '--bc': col, '--bw': `${t.pct}%` } as React.CSSProperties}>
                        <div className="xp-to-row">
                          <div className="xp-to-left">
                            <div className="xp-to-n">{t.n}</div>
                            <div className="xp-to-v mono">{t.vedic}</div>
                          </div>
                          <div className="xp-to-pct serif" style={{ color: col }}>{t.pct}%</div>
                        </div>
                        <div className="xp-to-bar-wrap">
                          <div className="xp-to-bar"/>
                        </div>
                        {openTO === i && (
                          <div className="xp-to-detail">
                            <p>{t.desc}</p>
                            <div className="xp-to-fix mono">
                              <span style={{ color: '#34d399' }}>Fix: </span>{t.fix}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="xp-note xa" style={{ borderColor: 'rgba(192,64,64,.3)', background: 'rgba(192,64,64,.04)' }}>
                  <div className="xp-note-icon" style={{ color: '#f87171' }}>!</div>
                  <p className="mono">ACC dominance (#1) worsens ventral attention takeover (#3), suppresses DMN (#4), and reduces the reflective capacity to even <em>recognise</em> the degradation. The circuits that would alert you are consumed first.</p>
                </div>

                <div className="xp-cta-block xa">
                  <p className="serif" style={{ fontSize: '14px', color: 'var(--t2)', marginBottom: '16px', lineHeight: 1.7 }}>
                    Each trade-off is reversible. IISc, SVYASA & Harvard confirm measurable recovery in 8–12 weeks of structured practice.
                  </p>
                  <button className="xp-cta-btn" onClick={() => router.push('/')}>
                    Begin Restoring — It&apos;s Free
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
