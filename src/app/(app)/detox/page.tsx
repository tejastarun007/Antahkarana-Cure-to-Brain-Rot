'use client';
import { useState } from 'react';
import { HARD_TRUTHS, ADHD_SYMPTOMS, DETOX_21_DAYS, TRUTH_CARDS } from '@/data/detox-bible';
import Link from 'next/link';

export default function Detox() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'mechanisms' | 'protocol'>('diagnosis');

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Master card collapses when any detail card is open
  const masterCollapsed = expandedCard !== null;

  return (
    <div className="screen on" id="detox" style={{ animation: 'sIn 0.5s cubic-bezier(0.4,0,0.2,1) both' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <Link href="/dashboard" style={{ color: 'var(--t3)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>← Back</Link>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* ── MASTER CARD — collapses when a truth card is open ── */}
        <div style={{ 
          overflow: 'hidden', 
          transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, margin 0.45s ease',
          maxHeight: (activeTab !== 'diagnosis' || masterCollapsed) ? '0px' : '800px',
          opacity: (activeTab !== 'diagnosis' || masterCollapsed) ? 0 : 1,
          marginTop: activeTab === 'diagnosis' ? '20px' : '0px',
          marginBottom: masterCollapsed ? '0px' : '0px',
          pointerEvents: masterCollapsed ? 'none' : 'auto',
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--sindoor2)', marginBottom: '10px', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            The Diagnosis
          </div>
          <div style={{ fontSize: '14px', color: 'var(--t1)', lineHeight: 1.6, marginBottom: '20px', fontWeight: 400, opacity: 0.85 }}>
            Your geography is not where you live. It is what your algorithm shows you.
          </div>

          <div style={{
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(25,10,15,0.9), rgba(15,10,25,0.98))',
            border: '1px solid rgba(192,64,64,0.45)',
            borderRadius: '20px',
            padding: '22px',
            marginBottom: '20px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(192,64,64,0.12), 0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)'
          }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,64,64,0.22), transparent 70%)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(112,96,192,0.15), transparent 70%)', pointerEvents: 'none' }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(192,64,64,0.15)', border: '1px solid rgba(192,64,64,0.4)', borderRadius: '20px', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', color: '#ff7070' }}>♦</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: '#ff7070', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>THE QUESTION YOU HAVEN&apos;T ASKED</span>
              </div>
              
              <div style={{ fontFamily: 'var(--serif)', fontSize: '21px', fontStyle: 'italic', color: '#fff', marginBottom: '14px', lineHeight: 1.4, wordWrap: 'break-word' }}>
                &ldquo;Is the algorithm <span style={{ color: '#ff7070' }}>leading your life</span> — or are you leading it?&rdquo;
              </div>
              
              <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #ff7070, transparent)', marginBottom: '14px' }}></div>

              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.65 }}>
                A beggar with a mobile sees the exact same content you see from your penthouse. Your geography, your income, your reality — irrelevant to the feed. <strong style={{ color: '#c0a0ff', fontWeight: 500 }}>The algorithm has no geography. But you do.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="chip-row" style={{ 
        paddingBottom: '8px', marginBottom: '14px', 
        overflowX: 'auto', WebkitOverflowScrolling: 'touch', whiteSpace: 'nowrap',
        display: 'flex', gap: '10px', padding: '0 20px 8px 20px',
        scrollbarWidth: 'none', msOverflowStyle: 'none'
      }}>
        <div 
          onClick={() => setActiveTab('diagnosis')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
            ...(activeTab === 'diagnosis' 
              ? { background: 'linear-gradient(145deg, rgba(171, 47, 0, 0.15), rgba(12, 10, 28, 0.9))', border: '1px solid var(--sindoor2)', color: 'var(--sindoor2)', boxShadow: '0 0 15px rgba(171, 47, 0, 0.25)' }
              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--t3)' })
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          The Poison
        </div>
        
        <div 
          onClick={() => setActiveTab('mechanisms')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
            ...(activeTab === 'mechanisms' 
              ? { background: 'linear-gradient(145deg, rgba(232, 176, 80, 0.15), rgba(12, 10, 28, 0.9))', border: '1px solid var(--gold2)', color: 'var(--gold2)', boxShadow: '0 0 15px rgba(232, 176, 80, 0.25)' }
              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--t3)' })
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          8 Mechanisms
        </div>

        <div 
          onClick={() => setActiveTab('protocol')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '30px',
            fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s ease', whiteSpace: 'nowrap',
            ...(activeTab === 'protocol' 
              ? { background: 'linear-gradient(145deg, rgba(142, 210, 168, 0.15), rgba(12, 10, 28, 0.9))', border: '1px solid var(--jade)', color: 'var(--jade)', boxShadow: '0 0 15px rgba(142, 210, 168, 0.25)' }
              : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--t3)' })
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          21-Day Antidote
        </div>
      </div>

      {/* Content */}
      <div className="scroll" style={{ flex: 1, paddingBottom: '90px' }}>

        {activeTab === 'diagnosis' && (
          <div style={{ padding: '0 20px' }}>
            
            {/* The Mirror */}
            <div style={{ marginBottom: '24px', background: 'linear-gradient(180deg, rgba(15,15,30,0.6), rgba(10,10,20,0.9))', border: '1px solid rgba(120,120,220,0.18)', borderRadius: '20px', padding: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <div style={{ flex: 1, background: 'rgba(20,20,35,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '12px 6px', textAlign: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏚️</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--gold3)', fontWeight: 500 }}>₹200/day earner</div>
                  <div style={{ fontSize: '10px', color: 'var(--t3)', lineHeight: 1.4, marginTop: '6px' }}>Dharavi. No savings. Phone is his window to the world.</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(20,20,35,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '12px 6px', textAlign: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏊</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--gold3)', fontWeight: 500 }}>₹2L/day earner</div>
                  <div style={{ fontSize: '10px', color: 'var(--t3)', lineHeight: 1.4, marginTop: '6px' }}>Worli penthouse. Pool view. Phone is his window to the world.</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 0', textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: '#ff6b6b', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Same Algo. Same Rage. Same FOMO.<br/>Same Anxiety.
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '15px', fontStyle: 'italic', color: 'var(--t2)', lineHeight: 1.5 }}>
                  The algorithm makes <strong style={{ color: 'var(--gold2)', fontWeight: 500 }}>everyone</strong> feel poor, behind, and angry.<br/>
                  That is not a bug. <strong style={{ color: 'var(--gold2)', fontWeight: 500 }}>That is the product.</strong>
                </div>
              </div>
            </div>

            {/* The Hard Truths */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#fff' }}>The Hard Truths</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t3)' }}>Tap to expand</div>
              </div>

              {HARD_TRUTHS.map(card => {
                const isOpen = expandedCard === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: isOpen
                        ? 'linear-gradient(145deg, rgba(192,64,64,0.2), rgba(20,10,20,0.95))'
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isOpen ? 'rgba(192,64,64,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      borderLeft: `3px solid ${isOpen ? '#ff6060' : 'rgba(255,255,255,0.12)'}`,
                      borderRadius: '16px', padding: '16px', marginBottom: '10px',
                      cursor: 'pointer', transition: 'all .35s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isOpen ? '0 8px 32px rgba(192,64,64,0.15), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ fontSize: '22px', flexShrink: 0, marginTop: '1px' }}>{card.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: '15px', fontStyle: 'italic', color: '#fff', lineHeight: 1.5, whiteSpace: 'normal', wordWrap: 'break-word' }}>{card.quote}</div>
                      </div>
                      <div style={{ color: isOpen ? '#ff8080' : 'var(--t3)', fontSize: '11px', transition: 'transform .3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, padding: '4px' }}>▼</div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,100,100,0.2)', paddingTop: '14px', animation: 'sIn .3s ease forwards' }}>
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: '28px', fontWeight: 600, color: '#ff6060', flexShrink: 0, lineHeight: 1 }}>{card.stat}</div>
                          <div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, marginBottom: '8px' }}>{card.desc}</div>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--t3)', letterSpacing: '0.5px' }}>📄 {card.source}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ADHD & The Algorithm */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--t1)', marginBottom: '4px' }}>ADHD & The Algorithm</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--sindoor2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Induced or real?</div>
              
              <div style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0))', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.02)', borderRadius: '16px', padding: '20px', marginBottom: '20px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold2)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{fontSize: '14px'}}>◈</span> THE UNCOMFORTABLE QUESTION</div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--t1)', marginBottom: '8px' }}>Is your ADHD real — or was it manufactured?</div>
                <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.7, opacity: 0.9 }}>
                  ADHD diagnoses have risen 400% since smartphones became universal. The algorithm produces ADHD-like symptoms in neurotypical brains through the exact same mechanism: variable-ratio reinforcement, dopamine spike/crash cycles, and destruction of sustained attention networks.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {ADHD_SYMPTOMS.map((sym, i) => {
                  const dotColors = ['#ff6b6b', '#ffb050', '#a092ee', '#f6cc60', '#5cb684'];
                  const dotColor = dotColors[i % dotColors.length];
                  return (
                    <div key={i} style={{ 
                      background: 'rgba(255,255,255,0.02)', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: '12px', padding: '16px',
                      display: 'flex', gap: '12px', alignItems: 'flex-start',
                      transition: 'background 0.2s',
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, marginTop: '6px', flexShrink: 0, boxShadow: `0 0 8px ${dotColor}80` }} />
                      <div>
                        <div style={{ fontSize: '13px', color: 'var(--t1)', lineHeight: 1.5, marginBottom: '6px' }}>{sym.desc}</div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)' }}>{sym.neuro}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ 
                textAlign: 'center', padding: '24px', 
                background: 'linear-gradient(145deg, rgba(200,144,42,0.12), rgba(15,10,20,0.8))', 
                borderRadius: '20px', 
                borderTop: '1px solid rgba(200,144,42,0.3)',
                borderRight: '1px solid rgba(200,144,42,0.1)',
                borderBottom: '1px solid rgba(200,144,42,0.1)',
                borderLeft: '1px solid rgba(200,144,42,0.1)',
                boxShadow: '0 10px 30px rgba(200,144,42,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--gold2)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>The Vedic Insight</div>
                <div style={{ fontFamily: 'var(--deva)', fontSize: '22px', color: 'var(--gold3)', marginBottom: '12px', textShadow: '0 0 12px rgba(200,144,42,0.4)' }}>मनश्चञ्चलमस्थिरम्</div>
                <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, opacity: 0.9 }}>
                  The Gita named this condition 3,000 years ago: <em style={{ color: 'var(--t1)' }}>chanchala manas</em> — the restless, unsteady mind. It described both the problem and the cure. The algorithm did not invent this. It merely industrialised it.
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
              <button className="chip on" onClick={() => setActiveTab('protocol')} style={{ cursor: 'pointer' }}>Begin the 21-Day Protocol →</button>
            </div>
          </div>
        )}

        {activeTab === 'mechanisms' && (
          <div style={{ padding: '0 20px' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--t1)' }}>8 Manipulation Mechanisms</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)' }}>Tap to reveal antidote</div>
              </div>

              {TRUTH_CARDS.map((card) => {
                const isOpen = expandedCard === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCard(card.id)}
                    style={{
                      background: isOpen ? `linear-gradient(145deg, ${card.color}15, transparent)` : 'var(--mid)',
                      borderTop: `1px solid ${isOpen ? card.color + '40' : 'var(--bdr)'}`,
                      borderRight: `1px solid ${isOpen ? card.color + '40' : 'var(--bdr)'}`,
                      borderBottom: `1px solid ${isOpen ? card.color + '40' : 'var(--bdr)'}`,
                      borderLeft: `3px solid ${card.color}`,
                      borderRadius: '14px', padding: '14px', marginBottom: '8px',
                      cursor: 'pointer', transition: 'all .3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ fontSize: '22px', flexShrink: 0, display: 'flex', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: card.icon }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--t1)', marginBottom: '4px' }}>{card.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5 }}>{card.mechanism}</div>
                      </div>
                      <div style={{ color: 'var(--t3)', fontSize: '12px', transition: 'transform .3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '12px', borderTop: `1px solid ${card.color}20`, paddingTop: '12px', animation: 'sIn .3s ease forwards' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: card.color }}>{card.antidoteTitle}</div>
                          <div style={{ fontFamily: 'var(--deva)', fontSize: '13px', color: 'var(--gold3)' }}>{card.vedicTerm}</div>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6 }}>{card.antidoteDesc}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'protocol' && (
          <div style={{ padding: '0 20px' }}>
            {/* The Danger Signals / Withdrawal Phase */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(192,64,64,0.1), rgba(20,10,20,0.8))',
              border: '1px solid rgba(192,64,64,0.3)',
              borderRadius: '16px', padding: '20px', marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px' }}>⚠️</span>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--sindoor2)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>The Danger Signals</div>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--t1)', marginBottom: '8px' }}>What to expect in Week 1</div>
              <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '20px' }}>
                These are the signs of algorithm withdrawal and neural rewiring. They feel uncomfortable. They are actually evidence of recovery.
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--gold2)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--t1)', fontWeight: 500, marginBottom: '4px' }}>Boredom is unbearable</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', lineHeight: 1.4 }}>Dopamine receptors are recalibrating upward. Baseline rising.</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--violet2)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--t1)', fontWeight: 500, marginBottom: '4px' }}>Urge to check phone every 3 min</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', lineHeight: 1.4 }}>Variable-ratio reward withdrawal. Identical to substance withdrawal.</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid var(--jade)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--t1)', fontWeight: 500, marginBottom: '4px' }}>Mind feels &quot;slower&quot;</div>
                  <div style={{ fontSize: '11px', color: 'var(--t3)', lineHeight: 1.4 }}>ACC rapid-fire mode deactivating. dlPFC deep-focus mode coming online.</div>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--jade)', marginBottom: '14px' }}>
              ━━ 21-DAY DETOX PROTOCOL
            </div>
            <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '16px' }}>
              A progressive protocol that reverses algorithmic conditioning over 21 days. Each phase builds on the previous, creating compound neural restoration. The rishis called 21 the number of purification.
            </div>

            {DETOX_21_DAYS.map((step, i) => (
              <div key={i} style={{
                position: 'relative', paddingLeft: '24px', marginBottom: '16px',
              }}>
                {/* Timeline dot & line */}
                <div style={{
                  position: 'absolute', left: '4px', top: '6px', width: '10px', height: '10px',
                  borderRadius: '50%', background: 'var(--jade)', border: '2px solid var(--void)',
                  boxShadow: '0 0 8px rgba(82,168,120,.4)', zIndex: 1
                }} />
                {i < DETOX_21_DAYS.length - 1 && (
                  <div style={{
                    position: 'absolute', left: '8px', top: '18px', width: '1px', height: 'calc(100% + 4px)',
                    background: 'rgba(82,168,120,.2)'
                  }} />
                )}

                <div style={{
                  background: 'linear-gradient(145deg, rgba(82,168,120,0.06), rgba(15,25,20,0.6))', 
                  borderTop: '1px solid rgba(82,168,120,0.2)',
                  borderRight: '1px solid rgba(82,168,120,0.05)',
                  borderBottom: '1px solid rgba(82,168,120,0.05)',
                  borderLeft: '3px solid var(--jade)',
                  borderRadius: '16px',
                  padding: '16px', 
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--jade)', fontWeight: 500 }}>Day {step.day}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{step.title}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '10px' }}>{step.desc}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--gold2)', letterSpacing: '.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>🪔</span> {step.practice}
                  </div>
                </div>
              </div>
            ))}

            {/* Completion */}
            <div style={{
              textAlign: 'center', padding: '20px', background: 'rgba(82,168,120,.05)',
              border: '1px solid rgba(82,168,120,.15)', borderRadius: '16px', marginTop: '8px'
            }}>
              <div style={{ fontFamily: 'var(--deva)', fontSize: '18px', color: 'var(--gold3)', marginBottom: '6px' }}>ॐ शान्तिः शान्तिः शान्तिः</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', color: 'var(--t2)', fontStyle: 'italic', marginBottom: '12px' }}>
                The loop has reversed. The mind is yours again.
              </div>
              <Link href="/practice" className="btn btn-g" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', padding: '12px 24px' }}>
                Continue the Practice →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
