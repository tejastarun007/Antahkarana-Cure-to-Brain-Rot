'use client';
import { useState } from 'react';
import { HARD_TRUTHS, ADHD_SYMPTOMS, DETOX_21_DAYS, TRUTH_CARDS } from '@/data/detox-bible';
import Link from 'next/link';

export default function Detox() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'mechanisms' | 'protocol'>('diagnosis');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const masterCollapsed = expandedCard !== null || isScrolled;

  return (
    <div className="screen on" id="detox" style={{ animation: 'sIn 0.5s cubic-bezier(0.4,0,0.2,1) both', background: 'var(--void)' }}>
      <style>{`
        .detox-title-glow {
          background: linear-gradient(135deg, var(--sindoor2), var(--sindoor));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(232, 76, 34, 0.4);
        }
        .glass-card {
          background: var(--mid);
          border: 1px solid var(--bdr);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .pulse-border {
          animation: pulseBorder 3s infinite alternate;
        }
        @keyframes pulseBorder {
          0% { border-color: rgba(232, 76, 34, 0.2); box-shadow: 0 0 10px rgba(232, 76, 34, 0.05); }
          100% { border-color: rgba(232, 76, 34, 0.6); box-shadow: 0 0 20px rgba(232, 76, 34, 0.2); }
        }
        .float-icon {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .timeline-line {
          background: linear-gradient(180deg, rgba(82,168,120,0.8) 0%, rgba(82,168,120,0) 100%);
        }
        .detox-tab {
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .detox-tab::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: all 0.5s ease;
        }
        .detox-tab:hover::before {
          left: 100%;
        }
      `}</style>

      <div className="sb"></div>
      {/* Header */}
      <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <Link href="/dashboard" style={{ color: 'var(--t3)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--t3)'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </Link>
      </div>

      <div style={{ padding: '0 20px', flexShrink: 0 }}>
        {/* ── MASTER CARD ── */}
        <div style={{
          overflow: 'hidden',
          transition: 'max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, margin 0.5s ease, transform 0.5s ease',
          maxHeight: (activeTab !== 'diagnosis' || masterCollapsed) ? '0px' : '720px',
          opacity: (activeTab !== 'diagnosis' || masterCollapsed) ? 0 : 1,
          marginTop: activeTab === 'diagnosis' ? '8px' : '0px',
          marginBottom: masterCollapsed ? '0px' : '0px',
          transform: (activeTab !== 'diagnosis' || masterCollapsed) ? 'scale(0.95)' : 'scale(1)',
          pointerEvents: masterCollapsed ? 'none' : 'auto',
        }}>
          <h1 className="detox-title-glow" style={{ fontFamily: 'var(--serif)', fontSize: '36px', marginBottom: '8px', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            The Diagnosis
          </h1>
          <div style={{ fontSize: '15px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '24px', fontWeight: 400 }}>
            Your geography is not where you live. It is what your algorithm shows you.
          </div>

          <div className="glass-card pulse-border" style={{
            position: 'relative',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '28px',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,76,34,0.15), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(140,100,255,0.1), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(232,76,34,0.1)', border: '1px solid rgba(232,76,34,0.3)', borderRadius: '30px', marginBottom: '18px', backdropFilter: 'blur(8px)' }}>
                <span className="float-icon" style={{ fontSize: '12px', color: 'var(--sindoor2)' }}>♦</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--sindoor2)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>The unasked question</span>
              </div>
              
              <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontStyle: 'italic', color: 'var(--t1)', marginBottom: '18px', lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                &ldquo;Is the algorithm <span style={{ color: 'var(--sindoor2)', textShadow: '0 0 15px rgba(232,76,34,0.4)' }}>leading your life</span> — or are you leading it?&rdquo;
              </div>
              
              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, var(--sindoor2), transparent)', marginBottom: '18px', borderRadius: '2px' }}></div>

              <p style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.7, letterSpacing: '0.2px' }}>
                A beggar with a mobile sees the exact same content you see from your penthouse. Your geography, your income, your reality — irrelevant to the feed. <strong style={{ color: 'var(--violet3)', fontWeight: 600, textShadow: '0 0 10px rgba(160,146,238,0.3)' }}>The algorithm has no geography. But you do.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="chip-row" style={{
        marginBottom: '0',
        overflowX: 'auto', WebkitOverflowScrolling: 'touch',
        display: 'flex', gap: '12px', padding: '0 0 16px 20px',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
        flexShrink: 0, flexWrap: 'nowrap',
      }}>
        <div style={{ width: '8px', flexShrink: 0 }}></div>
        <div 
          className="detox-tab"
          onClick={() => setActiveTab('diagnosis')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 22px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap',
            ...(activeTab === 'diagnosis' 
              ? { background: 'linear-gradient(145deg, rgba(232, 76, 34, 0.15), rgba(20, 10, 15, 0.9))', border: '1px solid var(--sindoor2)', color: 'var(--sindoor2)', boxShadow: '0 8px 20px rgba(232, 76, 34, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }
              : { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--bdr)', color: 'var(--t3)' })
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: activeTab === 'diagnosis' ? 'drop-shadow(0 0 5px rgba(232,76,34,0.5))' : 'none' }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          The Poison
        </div>
        
        <div 
          className="detox-tab"
          onClick={() => setActiveTab('mechanisms')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 22px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap',
            ...(activeTab === 'mechanisms' 
              ? { background: 'linear-gradient(145deg, rgba(255, 190, 80, 0.15), rgba(20, 18, 10, 0.9))', border: '1px solid var(--gold2)', color: 'var(--gold2)', boxShadow: '0 8px 20px rgba(255, 190, 80, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }
              : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--t3)' })
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: activeTab === 'mechanisms' ? 'drop-shadow(0 0 5px rgba(255,190,80,0.5))' : 'none' }}>
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          8 Mechanisms
        </div>

        <div 
          className="detox-tab"
          onClick={() => setActiveTab('protocol')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 22px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', whiteSpace: 'nowrap',
            ...(activeTab === 'protocol' 
              ? { background: 'linear-gradient(145deg, rgba(82, 200, 140, 0.15), rgba(10, 20, 15, 0.9))', border: '1px solid var(--jade)', color: 'var(--jade)', boxShadow: '0 8px 20px rgba(82, 200, 140, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)' }
              : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--t3)' })
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: activeTab === 'protocol' ? 'drop-shadow(0 0 5px rgba(82,200,140,0.5))' : 'none' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          21-Day Antidote
        </div>
        <div style={{ width: '8px', flexShrink: 0 }}></div>
      </div>

      {/* Content Area */}
      <div 
        className="scroll" 
        style={{ flex: 1, paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 20)}
      >

        {activeTab === 'diagnosis' && (
          <div style={{ padding: '0 20px', animation: 'sIn 0.4s ease forwards' }}>
            
            {/* The Mirror */}
            <div className="glass-card" style={{ marginBottom: '32px', borderRadius: '24px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, background: 'linear-gradient(180deg, rgba(30,25,40,0.8), rgba(20,15,30,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 12px', textAlign: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 16px rgba(0,0,0,0.2)' }}>
                  <div className="float-icon" style={{ fontSize: '28px', marginBottom: '10px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>🏚️</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold3)', fontWeight: 600, letterSpacing: '0.5px' }}>₹200/day</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', lineHeight: 1.5, marginTop: '8px' }}>Dharavi. No savings. Phone is his window to the world.</div>
                </div>
                <div style={{ flex: 1, background: 'linear-gradient(180deg, rgba(30,25,40,0.8), rgba(20,15,30,0.9))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 12px', textAlign: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 16px rgba(0,0,0,0.2)' }}>
                  <div className="float-icon" style={{ fontSize: '28px', marginBottom: '10px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))', animationDelay: '1s' }}>🏊</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold3)', fontWeight: 600, letterSpacing: '0.5px' }}>₹2L/day</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', lineHeight: 1.5, marginTop: '8px' }}>Worli penthouse. Pool view. Phone is his window to the world.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.2)', borderRadius: '12px', padding: '14px', textAlign: 'center', marginBottom: '18px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: '#ff8a8a', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Same Algo. Same Rage. Same Anxiety.
                </div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '0 10px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontStyle: 'italic', color: 'var(--t2)', lineHeight: 1.6 }}>
                  The algorithm makes <strong style={{ color: 'var(--gold2)', fontWeight: 600 }}>everyone</strong> feel poor, behind, and angry.<br/>
                  That is not a bug. <strong style={{ color: 'var(--gold2)', fontWeight: 600, borderBottom: '1px dotted var(--gold2)' }}>That is the product.</strong>
                </div>
              </div>
            </div>

            {/* The Hard Truths */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 4px', gap: '16px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#fff', margin: 0 }}>The Hard Truths</h2>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)', letterSpacing: '0.5px', textAlign: 'right', flexShrink: 0 }}>TAP TO<br/>EXPAND</div>
              </div>

              {HARD_TRUTHS.map(card => {
                const isOpen = expandedCard === card.id;
                return (
                  <div
                    key={card.id}
                    className="card-hover"
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: isOpen
                        ? 'linear-gradient(145deg, rgba(232,76,34,0.12), rgba(20,10,20,0.8))'
                        : 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${isOpen ? 'rgba(232,76,34,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      borderLeft: `4px solid ${isOpen ? 'var(--sindoor2)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '16px', padding: '20px', marginBottom: '12px',
                      cursor: 'pointer',
                      boxShadow: isOpen ? '0 12px 32px rgba(232,76,34,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ fontSize: '26px', flexShrink: 0, filter: isOpen ? 'drop-shadow(0 0 8px rgba(232,76,34,0.6))' : 'none', transition: 'filter 0.3s' }}>{card.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: isOpen ? 500 : 400, color: isOpen ? '#fff' : 'var(--t1)', lineHeight: 1.5, transition: 'color 0.3s' }}>&ldquo;{card.quote}&rdquo;</div>
                      </div>
                      <div style={{ color: isOpen ? 'var(--sindoor)' : 'var(--t3)', fontSize: '12px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', padding: '6px' }}>▼</div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '16px', borderTop: '1px solid rgba(232,76,34,0.2)', paddingTop: '16px', animation: 'sIn .4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '32px', fontWeight: 700, color: 'var(--sindoor2)', flexShrink: 0, lineHeight: 1, textShadow: '0 2px 10px rgba(232,76,34,0.3)' }}>{card.stat}</div>
                          <div>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '10px' }}>{card.desc}</div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t3)', letterSpacing: '0.5px' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                              {card.source}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ADHD & The Algorithm */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--t1)', marginBottom: '6px', padding: '0 4px' }}>ADHD & The Algorithm</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--sindoor2)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px', padding: '0 4px', fontWeight: 600 }}>Induced or real?</div>
              
              <div className="pulse-border" style={{ background: 'linear-gradient(145deg, rgba(232,76,34,0.08), var(--mid))', border: '1px solid rgba(232,76,34,0.3)', borderRadius: '20px', padding: '24px', marginBottom: '24px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--sindoor2)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <span className="float-icon" style={{fontSize: '16px'}}>◈</span> THE UNCOMFORTABLE QUESTION
                </div>
                <div style={{ fontSize: '18px', fontWeight: 500, color: 'var(--t1)', marginBottom: '12px', lineHeight: 1.4 }}>Is your ADHD real — or was it manufactured?</div>
                <div style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.7 }}>
                  ADHD diagnoses have risen <strong style={{ color: 'var(--sindoor2)' }}>400%</strong> since smartphones became universal. The algorithm produces ADHD-like symptoms in neurotypical brains through the exact same mechanism: variable-ratio reinforcement, dopamine spike/crash cycles, and destruction of sustained attention networks.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {ADHD_SYMPTOMS.map((sym, i) => {
                  const dotColors = ['var(--sindoor2)', 'var(--flame)', 'var(--violet3)', 'var(--gold2)', 'var(--jade)'];
                  const dotColor = dotColors[i % dotColors.length];
                  return (
                    <div key={i} className="card-hover" style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.06)', 
                      borderRadius: '16px', padding: '18px',
                      display: 'flex', gap: '16px', alignItems: 'flex-start',
                    }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dotColor, marginTop: '5px', flexShrink: 0, boxShadow: `0 0 12px ${dotColor}, inset 0 1px 2px rgba(255,255,255,0.8)` }} />
                      <div>
                        <div style={{ fontSize: '14px', color: 'var(--t1)', lineHeight: 1.5, marginBottom: '8px', fontWeight: 500 }}>{sym.desc}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--t3)', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px', borderLeft: `2px solid ${dotColor}` }}>{sym.neuro}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ 
                textAlign: 'center', padding: '32px 24px', 
                background: 'linear-gradient(145deg, rgba(200,144,42,0.15), rgba(20,15,10,0.9))', 
                borderRadius: '24px', 
                border: '1px solid rgba(200,144,42,0.3)',
                boxShadow: '0 12px 40px rgba(200,144,42,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold2), transparent)' }}></div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold2)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>The Vedic Insight</div>
                <div style={{ fontFamily: 'var(--deva)', fontSize: '28px', color: 'var(--gold3)', marginBottom: '16px', textShadow: '0 0 20px rgba(200,144,42,0.5)' }}>मनश्चञ्चलमस्थिरम्</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                  The Gita named this condition 3,000 years ago: <em style={{ color: '#fff', fontWeight: 500 }}>chanchala manas</em> — the restless, unsteady mind. It described both the problem and the cure. The algorithm did not invent this. It merely industrialised it.
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
              <button 
                onClick={() => setActiveTab('protocol')} 
                style={{ 
                  background: 'linear-gradient(90deg, var(--sage), var(--jade))', color: '#000', 
                  border: 'none', padding: '16px 32px', borderRadius: '30px', 
                  fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                  cursor: 'pointer', boxShadow: '0 8px 20px rgba(82, 168, 120, 0.3), inset 0 2px 0 rgba(255,255,255,0.4)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(82, 168, 120, 0.4), inset 0 2px 0 rgba(255,255,255,0.4)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(82, 168, 120, 0.3), inset 0 2px 0 rgba(255,255,255,0.4)' }}
              >
                Begin the 21-Day Protocol →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mechanisms' && (
          <div style={{ padding: '0 20px', animation: 'sIn 0.4s ease forwards' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 4px', gap: '16px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#fff', margin: 0 }}>8 Mechanisms of<br/>Control</h2>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)', letterSpacing: '0.5px', textAlign: 'right', flexShrink: 0 }}>TAP FOR<br/>ANTIDOTE</div>
              </div>

              {TRUTH_CARDS.map((card) => {
                const isOpen = expandedCard === card.id;
                return (
                  <div
                    key={card.id}
                    className="card-hover"
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: isOpen ? `linear-gradient(145deg, color-mix(in srgb, ${card.color} 15%, transparent), rgba(15,15,20,0.9))` : 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      borderTop: `1px solid ${isOpen ? `color-mix(in srgb, ${card.color} 40%, transparent)` : 'rgba(255,255,255,0.06)'}`,
                      borderRight: `1px solid ${isOpen ? `color-mix(in srgb, ${card.color} 40%, transparent)` : 'rgba(255,255,255,0.06)'}`,
                      borderBottom: `1px solid ${isOpen ? `color-mix(in srgb, ${card.color} 40%, transparent)` : 'rgba(255,255,255,0.06)'}`,
                      borderLeft: `4px solid ${card.color}`,
                      borderRadius: '16px', padding: '18px', marginBottom: '12px',
                      cursor: 'pointer', 
                      boxShadow: isOpen ? `0 8px 24px color-mix(in srgb, ${card.color} 20%, transparent), inset 0 1px 0 rgba(255,255,255,0.1)` : '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{ fontSize: '24px', flexShrink: 0, display: 'flex', alignItems: 'center', filter: `drop-shadow(0 0 6px color-mix(in srgb, ${card.color} 60%, transparent))` }} dangerouslySetInnerHTML={{ __html: card.icon }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '6px', letterSpacing: '0.2px' }}>{card.title}</div>
                        <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6 }}>{card.mechanism}</div>
                      </div>
                      <div style={{ color: isOpen ? card.color : 'var(--t3)', fontSize: '12px', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', padding: '6px' }}>▼</div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '16px', borderTop: `1px solid ${card.color}30`, paddingTop: '16px', animation: 'sIn .4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', background: `${card.color}10`, padding: '8px 12px', borderRadius: '8px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: card.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{card.antidoteTitle}</div>
                          <div style={{ fontFamily: 'var(--deva)', fontSize: '16px', color: 'var(--gold3)', textShadow: '0 0 10px rgba(200,144,42,0.3)' }}>{card.vedicTerm}</div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7 }}>{card.antidoteDesc}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'protocol' && (
          <div style={{ padding: '0 20px', animation: 'sIn 0.4s ease forwards' }}>
            {/* The Danger Signals */}
            <div className="glass-card" style={{
              background: 'linear-gradient(145deg, rgba(255,70,70,0.1), rgba(20,10,15,0.9))',
              border: '1px solid rgba(255,70,70,0.3)',
              borderRadius: '24px', padding: '24px', marginBottom: '32px',
              boxShadow: '0 12px 30px rgba(255,70,70,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="float-icon" style={{ fontSize: '20px', filter: 'drop-shadow(0 0 8px rgba(255,70,70,0.6))' }}>⚠️</span>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#ff6b6b', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>The Danger Signals</div>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#fff', marginBottom: '10px' }}>What to expect in Week 1</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '24px' }}>
                These are the signs of algorithm withdrawal and neural rewiring. They feel uncomfortable. They are actually evidence of recovery.
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="card-hover" style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--gold2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>Boredom is unbearable</div>
                  <div style={{ fontSize: '12px', color: 'var(--t3)', lineHeight: 1.5 }}>Dopamine receptors are recalibrating upward. Baseline rising.</div>
                </div>
                <div className="card-hover" style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--violet2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>Urge to check phone every 3 min</div>
                  <div style={{ fontSize: '12px', color: 'var(--t3)', lineHeight: 1.5 }}>Variable-ratio reward withdrawal. Identical to substance withdrawal.</div>
                </div>
                <div className="card-hover" style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--jade)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '6px' }}>Mind feels &quot;slower&quot;</div>
                  <div style={{ fontSize: '12px', color: 'var(--t3)', lineHeight: 1.5 }}>ACC rapid-fire mode deactivating. dlPFC deep-focus mode coming online.</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 4px' }}>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(82,168,120,0.5))' }}></div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--jade)', fontWeight: 700, textShadow: '0 0 10px rgba(82,168,120,0.4)' }}>
                21-Day Detox Protocol
              </div>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(270deg, transparent, rgba(82,168,120,0.5))' }}></div>
            </div>
            
            <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.7, marginBottom: '24px', textAlign: 'center', padding: '0 10px' }}>
              A progressive protocol that reverses algorithmic conditioning. Each phase builds on the previous, creating compound neural restoration. The rishis called 21 the number of purification.
            </div>

            {DETOX_21_DAYS.map((step, i) => (
              <div key={i} style={{
                position: 'relative', paddingLeft: '32px', marginBottom: '20px',
              }}>
                {/* Timeline dot & glowing line */}
                <div style={{
                  position: 'absolute', left: '6px', top: '8px', width: '12px', height: '12px',
                  borderRadius: '50%', background: 'var(--jade)', border: '2px solid rgba(15,20,18,1)',
                  boxShadow: '0 0 12px rgba(82,168,120,0.8), inset 0 0 4px #fff', zIndex: 1
                }} />
                {i < DETOX_21_DAYS.length - 1 && (
                  <div className="timeline-line" style={{
                    position: 'absolute', left: '11px', top: '24px', width: '2px', height: 'calc(100% + 4px)',
                    opacity: 0.6
                  }} />
                )}

                <div className="card-hover glass-card" style={{
                  background: 'linear-gradient(145deg, rgba(82,168,120,0.08), rgba(15,25,20,0.8))', 
                  borderTop: '1px solid rgba(82,168,120,0.2)',
                  borderRight: '1px solid rgba(82,168,120,0.05)',
                  borderBottom: '1px solid rgba(82,168,120,0.05)',
                  borderLeft: '4px solid var(--jade)',
                  borderRadius: '16px',
                  padding: '20px', 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--jade)', fontWeight: 700, textShadow: '0 0 8px rgba(82,168,120,0.3)' }}>Day {step.day}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>{step.title}</div>
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '14px' }}>{step.desc}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold2)', letterSpacing: '.5px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,144,42,0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(200,144,42,0.2)' }}>
                    <span style={{ fontSize: '14px' }}>🪔</span> {step.practice}
                  </div>
                </div>
              </div>
            ))}

            {/* Completion */}
            <div className="glass-card pulse-border" style={{
              textAlign: 'center', padding: '32px 24px', background: 'linear-gradient(145deg, rgba(82,168,120,0.1), rgba(15,25,20,0.9))',
              border: '1px solid rgba(82,168,120,0.3)', borderRadius: '24px', marginTop: '16px',
              boxShadow: '0 12px 30px rgba(82,168,120,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>
              <div className="float-icon" style={{ fontFamily: 'var(--deva)', fontSize: '28px', color: 'var(--gold3)', marginBottom: '12px', textShadow: '0 0 20px rgba(200,144,42,0.4)' }}>ॐ शान्तिः शान्तिः शान्तिः</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: '#fff', fontStyle: 'italic', marginBottom: '24px', letterSpacing: '0.2px' }}>
                The loop has reversed. The mind is yours again.
              </div>
              <Link href="/practice" className="btn btn-g" style={{ 
                display: 'inline-block', textDecoration: 'none', textAlign: 'center', 
                padding: '16px 32px', borderRadius: '30px', fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                boxShadow: '0 8px 20px rgba(82,168,120,0.3)', transition: 'transform 0.2s'
              }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Continue the Practice →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
