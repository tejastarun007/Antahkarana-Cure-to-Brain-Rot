'use client';
import { useState } from 'react';
import { SCI_SECS, ERAS, TRADEOFFS, TIERS } from '@/data/content';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';

const BRAIN_REGIONS = [
  {id:'pfc', name:'Prefrontal Cortex', aka:'dlPFC — Buddhi', impact:'Thinned by 35% in heavy digital users. Governs deep reasoning, impulse control, and long-term planning.', fix:'Silent Meditation · Deep Reading · Unreachable Hour', color:'#e8b84b', cite:'Loh & Kanai (2014) PLoS ONE'},
  {id:'acc', name:'Anterior Cingulate Cortex', aka:'ACC — Manas', impact:'Hyper-activated by digital multitasking. Dominates over dlPFC by 78%. Handles rapid classification but not deep thought.', fix:'Naam Jap · Focused attention meditation', color:'#c45a0a', cite:'IISc Bangalore (2026)'},
  {id:'dmn', name:'Default Mode Network', aka:'DMN — Ahamkara', impact:'Suppressed 80% by constant stimulation. Governs self-reflection, identity formation, and creative synthesis.', fix:'20-min meditation · Phoneless walks · Silence', color:'#7060c0', cite:'SVYASA fNIRS (2024)'},
  {id:'hpc', name:'Hippocampus', aka:'Chitta — Memory', impact:'Shifted from deep encoding to transactive indexing (82%). Stores WHERE to find info, not the info itself.', fix:'Handwriting · Mantra memorisation · Deep reading', color:'#52a878', cite:'Hartzell (2018) Sanskrit Effect'},
  {id:'amg', name:'Amygdala', aka:'Bhaya — Fear Center', impact:'Hyper-reactive to social threats (88% shift). Every notification triggers cortisol cascades once reserved for predators.', fix:'Pranayama · Equanimity meditation · Naam Jap', color:'#c04040', cite:'Ward et al. (2017) JACR'},
  {id:'bca', name:"Broca's Area", aka:'Vak-shakti — Language', impact:'Language processing yielding to visual streams (75% shift). Long reading ability declining measurably across all demographics.', fix:'1hr deep reading · Handwriting · Sanskrit recitation', color:'#38bdf8', cite:'Berns et al. (2013)'},
  {id:'cbl', name:'Cerebellum', aka:'Karma Yoga — Motor', impact:'Motor-cognitive integration declining (70%). Children on tablets show measurably weaker fine motor skills.', fix:'Hand work · Cooking · Manual craft · Yoga asanas', color:'#f09030', cite:'SVYASA Psychology Lab (2024)'},
];

export default function Science() {
  const [activeSciTab, setActiveSciTab] = useState('brain');
  const [openEra, setOpenEra] = useState<number>(-1);
  const [openTO, setOpenTO] = useState<number>(-1);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="screen on" id="sci">
      <TopBar />
      <div style={{padding:'6px 14px 6px', flexShrink:0}}>
        <div className="lbl">Research · Evidence · 2024–2026</div>
        <div style={{fontFamily:'var(--serif)', fontSize:'22px', fontWeight:300, color:'var(--gold2)'}}>The Crisis & the Cure</div>
        <p style={{fontSize:'12px', color:'var(--t2)', marginTop:'4px', lineHeight:1.5}}>Problem → Scientific Proof → Ancient Solution. All data verifiable.</p>
      </div>
      <div className="sci-nav">
        {SCI_SECS.map((s) => (
          <div key={s.id} className={`chip ${activeSciTab === s.id ? 'on' : ''}`} onClick={() => setActiveSciTab(s.id)}>{s.lbl}</div>
        ))}
      </div>
      
      <div className="scroll" style={{flex:1, paddingBottom:'90px'}}>
        
        {activeSciTab === 'brain' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">Neural Impact Map</div>
            <div className="sci-sub">Tap a brain region to explore how digital habits have physically altered it — and how ancient practices reverse the damage.</div>
            
            {/* Interactive SVG Brain */}
            <div style={{position:'relative', margin:'0 auto 16px', maxWidth:'340px', userSelect:'none'}}>
              {/* Aura glow behind brain */}
              <div style={{
                position:'absolute', top:'50%', left:'50%', width:'280px', height:'280px',
                transform:'translate(-50%,-50%)', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(200,144,42,.08) 0%, transparent 70%)',
                animation:'aura 7s ease-in-out infinite', pointerEvents:'none', zIndex:0
              }}/>
              
              <svg viewBox="0 0 500 380" style={{width:'100%', height:'auto', position:'relative', zIndex:1}}>
                <defs>
                  {BRAIN_REGIONS.map(r => (
                    <filter key={`glow-${r.id}`} id={`glow-${r.id}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation={selectedRegion === r.id ? '8' : '4'} result="blur"/>
                      <feFlood floodColor={r.color} floodOpacity={selectedRegion === r.id ? '0.6' : '0.25'}/>
                      <feComposite in2="blur" operator="in"/>
                      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  ))}
                  <radialGradient id="brainBase" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="rgba(30,25,55,0.9)"/>
                    <stop offset="100%" stopColor="rgba(12,10,28,0.3)"/>
                  </radialGradient>
                  {/* Vignette mask for smooth edge blending */}
                  <radialGradient id="vignette" cx="50%" cy="48%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="1"/>
                    <stop offset="70%" stopColor="white" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                  </radialGradient>
                  <mask id="vignetteMask">
                    <rect width="500" height="380" fill="url(#vignette)"/>
                  </mask>
                </defs>

                {/* Real brain image as base layer */}
                <image
                  href="/brain-regions.png"
                  x="90" y="10" width="310" height="310"
                  opacity="0.55"
                  mask="url(#vignetteMask)"
                  style={{mixBlendMode:'screen'}}
                />

                {/* ═══ TAPPABLE BRAIN REGIONS ═══ */}
                
                {/* Prefrontal Cortex — front-top of brain */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'pfc' ? null : 'pfc')} style={{cursor:'pointer'}}>
                  <ellipse cx="160" cy="105" rx="38" ry="50" fill={selectedRegion === 'pfc' ? '#e8b84b28' : '#e8b84b0a'} 
                    filter={`url(#glow-pfc)`} stroke={selectedRegion === 'pfc' ? '#e8b84b' : '#e8b84b33'} strokeWidth={selectedRegion === 'pfc' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'pfc' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="130" y1="60" x2="55" y2="25" stroke="#e8b84b" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="55" cy="25" r="3" fill="#e8b84b" opacity="0.9"/>
                  <text x="3" y="19" fill="#e8b84b" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">PREFRONTAL</text>
                  <text x="3" y="31" fill="#e8b84b" fontSize="9" fontFamily="var(--mono)" opacity="0.75">dlPFC · Buddhi</text>
                </g>

                {/* Anterior Cingulate Cortex — top center-deep */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'acc' ? null : 'acc')} style={{cursor:'pointer'}}>
                  <ellipse cx="225" cy="75" rx="32" ry="25" fill={selectedRegion === 'acc' ? '#c45a0a33' : '#c45a0a0a'} 
                    filter={`url(#glow-acc)`} stroke={selectedRegion === 'acc' ? '#c45a0a' : '#c45a0a33'} strokeWidth={selectedRegion === 'acc' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'acc' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="245" y1="52" x2="270" y2="15" stroke="#c45a0a" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="270" cy="15" r="3" fill="#c45a0a" opacity="0.9"/>
                  <text x="278" y="9" fill="#e07820" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">ACC</text>
                  <text x="278" y="21" fill="#e07820" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Manas</text>
                </g>

                {/* Default Mode Network — posterior/parietal */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'dmn' ? null : 'dmn')} style={{cursor:'pointer'}}>
                  <ellipse cx="310" cy="100" rx="42" ry="48" fill={selectedRegion === 'dmn' ? '#7060c028' : '#7060c008'} 
                    filter={`url(#glow-dmn)`} stroke={selectedRegion === 'dmn' ? '#7060c0' : '#7060c033'} strokeWidth={selectedRegion === 'dmn' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'dmn' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="340" y1="65" x2="400" y2="25" stroke="#9080e0" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="400" cy="25" r="3" fill="#9080e0" opacity="0.9"/>
                  <text x="408" y="19" fill="#a090f0" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">DMN</text>
                  <text x="408" y="31" fill="#a090f0" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Ahamkara</text>
                </g>

                {/* Hippocampus — medial temporal deep */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'hpc' ? null : 'hpc')} style={{cursor:'pointer'}}>
                  <ellipse cx="225" cy="185" rx="30" ry="15" fill={selectedRegion === 'hpc' ? '#52a87833' : '#52a87810'} 
                    filter={`url(#glow-hpc)`} stroke={selectedRegion === 'hpc' ? '#52a878' : '#52a87833'} strokeWidth={selectedRegion === 'hpc' ? '1.5' : '0.5'}
                    transform="rotate(-10,225,185)" style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'hpc' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="198" y1="195" x2="85" y2="295" stroke="#80c89a" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="85" cy="295" r="3" fill="#80c89a" opacity="0.9"/>
                  <text x="3" y="289" fill="#80c89a" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">HIPPOCAMPUS</text>
                  <text x="3" y="301" fill="#80c89a" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Chitta · Memory</text>
                </g>

                {/* Amygdala — deep temporal, near hippocampus */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'amg' ? null : 'amg')} style={{cursor:'pointer'}}>
                  <ellipse cx="205" cy="210" rx="18" ry="14" fill={selectedRegion === 'amg' ? '#c0404044' : '#c0404012'} 
                    filter={`url(#glow-amg)`} stroke={selectedRegion === 'amg' ? '#c04040' : '#c0404033'} strokeWidth={selectedRegion === 'amg' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'amg' && <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="195" y1="224" x2="205" y2="340" stroke="#e06060" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="205" cy="340" r="3" fill="#e06060" opacity="0.9"/>
                  <text x="212" y="334" fill="#e06060" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">AMYGDALA</text>
                  <text x="212" y="346" fill="#e06060" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Bhaya · Fear</text>
                </g>

                {/* Broca's Area — lower frontal */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'bca' ? null : 'bca')} style={{cursor:'pointer'}}>
                  <ellipse cx="160" cy="175" rx="22" ry="20" fill={selectedRegion === 'bca' ? '#38bdf833' : '#38bdf80a'} 
                    filter={`url(#glow-bca)`} stroke={selectedRegion === 'bca' ? '#38bdf8' : '#38bdf833'} strokeWidth={selectedRegion === 'bca' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'bca' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="140" y1="192" x2="60" y2="250" stroke="#60d0ff" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="60" cy="250" r="3" fill="#60d0ff" opacity="0.9"/>
                  <text x="3" y="244" fill="#60d0ff" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">BROCA&apos;S</text>
                  <text x="3" y="256" fill="#60d0ff" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Vak-shakti</text>
                </g>

                {/* Cerebellum — posterior bottom */}
                <g onClick={() => setSelectedRegion(selectedRegion === 'cbl' ? null : 'cbl')} style={{cursor:'pointer'}}>
                  <ellipse cx="330" cy="240" rx="32" ry="30" fill={selectedRegion === 'cbl' ? '#f0903028' : '#f0903008'} 
                    filter={`url(#glow-cbl)`} stroke={selectedRegion === 'cbl' ? '#f09030' : '#f0903033'} strokeWidth={selectedRegion === 'cbl' ? '1.5' : '0.5'}
                    style={{transition:'all 0.4s ease'}}>
                    {selectedRegion === 'cbl' && <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>}
                  </ellipse>
                  <line x1="358" y1="252" x2="410" y2="300" stroke="#f0a050" strokeWidth="0.8" strokeDasharray="2,3" opacity="0.7"/>
                  <circle cx="410" cy="300" r="3" fill="#f0a050" opacity="0.9"/>
                  <text x="418" y="294" fill="#f0a050" fontSize="11" fontFamily="var(--mono)" letterSpacing="0.5" fontWeight="500">CEREBELLUM</text>
                  <text x="418" y="306" fill="#f0a050" fontSize="9" fontFamily="var(--mono)" opacity="0.75">Karma Yoga</text>
                </g>

                {/* Brain stem */}
                <path d="M250,260 C245,275 240,290 235,310 C233,318 230,325 225,330" 
                  stroke="rgba(200,144,42,0.12)" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Selected Region Detail Card */}
            {selectedRegion && (() => {
              const r = BRAIN_REGIONS.find(b => b.id === selectedRegion);
              if (!r) return null;
              return (
                <div style={{
                  background:`linear-gradient(145deg, ${r.color}11, rgba(12,10,28,0.95))`,
                  border:`1px solid ${r.color}44`,
                  borderRadius:'20px', padding:'20px', marginBottom:'12px',
                  animation:'sIn .4s ease forwards',
                  position:'relative', overflow:'hidden'
                }}>
                  {/* Glow accent */}
                  <div style={{
                    position:'absolute', top:'-20px', right:'-20px', width:'100px', height:'100px',
                    borderRadius:'50%', background:`radial-gradient(circle, ${r.color}22, transparent 70%)`,
                    pointerEvents:'none'
                  }}/>
                  
                  <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px'}}>
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'12px',
                      background:`${r.color}20`, border:`1px solid ${r.color}44`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0
                    }}>🧠</div>
                    <div>
                      <div style={{fontSize:'16px', fontWeight:600, color:r.color}}>{r.name}</div>
                      <div style={{fontFamily:'var(--mono)', fontSize:'10px', color:'var(--t3)', letterSpacing:'1.5px', textTransform:'uppercase'}}>{r.aka}</div>
                    </div>
                  </div>

                  <div style={{fontFamily:'var(--mono)', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--t3)', marginBottom:'6px'}}>━━ DIGITAL IMPACT</div>
                  <div style={{fontSize:'13px', color:'var(--t1)', lineHeight:1.65, marginBottom:'14px'}}>{r.impact}</div>

                  <div style={{
                    background:'rgba(82,168,120,0.08)', border:'1px solid rgba(82,168,120,0.2)',
                    borderRadius:'12px', padding:'12px', marginBottom:'12px'
                  }}>
                    <div style={{fontFamily:'var(--mono)', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--jade)', marginBottom:'5px'}}>━━ ANCIENT PRACTICE FIX</div>
                    <div style={{fontSize:'13px', color:'var(--jade)', fontWeight:500}}>{r.fix}</div>
                  </div>

                  <div style={{fontSize:'10px', color:'var(--t4)', fontFamily:'var(--mono)', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'8px'}}>
                    📄 {r.cite}
                  </div>
                </div>
              );
            })()}

            {!selectedRegion && (
              <div style={{
                textAlign:'center', padding:'14px', 
                border:'1px dashed rgba(200,144,42,0.2)', borderRadius:'14px',
                background:'rgba(200,144,42,0.03)'
              }}>
                <div style={{fontSize:'20px', marginBottom:'6px'}}>👆</div>
                <div style={{fontFamily:'var(--mono)', fontSize:'10px', color:'var(--t3)', letterSpacing:'1.5px', textTransform:'uppercase'}}>
                  Tap any glowing region to explore
                </div>
              </div>
            )}
          </div>
        )}

        {activeSciTab === 'timeline' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">1000 Years of Cognitive Evolution</div>
            <div className="sci-sub">Conscious, meaningful processing — not raw sensory input (~11M bits/sec). Data: UNESCO, WHO, OECD PIAAC, Hilbert & Lopez (2011 Science), Bohn & Short (2012 IJOC).</div>
            <div className="proof"><div className="proof-lbl">Key Finding</div><div className="proof-stat" style={{color:'var(--sindoor2)'}}>700×</div><div className="proof-t">increase in information processing rate since 1000 CE. But comprehension and depth have inverted. <strong>The gap between exposure and understanding is at its widest in human history.</strong></div><div className="cite">Source: Synthesis model v2.0 · Neuroscience research, UNESCO, WHO, OECD PIAAC</div></div>
            
            <div style={{marginBottom:'10px'}}>
              {ERAS.map((e, i) => {
                const warm = e.v > 60 ? Math.min(1, (e.v - 60) / 290) : 0;
                const r = Math.round(80 + warm * 175), g = Math.round(100 - warm * 90), b = Math.round(60 - warm * 50);
                return (
                  <div key={i}>
                    <div className="era-row2" onClick={() => setOpenEra(openEra === i ? -1 : i)}>
                      <div className="era-yr">{e.y}</div>
                      <div className="era-bg"><div className="era-fill" style={{width: `${Math.round(e.v / 350 * 100)}%`, background: `rgb(${Math.min(255,r)},${Math.max(0,g)},${Math.max(0,b)})`}}></div></div>
                      <div className="era-v">{e.v} b/s</div>
                    </div>
                    <div className={`era-det ${openEra === i ? 'open' : ''}`}><strong style={{color:'var(--gold2)'}}>{e.era}:</strong> {e.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="proof"><div className="proof-lbl">The Vedic Diagnosis</div><div style={{fontFamily:'var(--deva)', fontSize:'17px', color:'var(--gold2)', marginBottom:'5px'}}>मनो हि द्विविधं प्रोक्तम्</div><div className="proof-t">The mind is twofold: pure (Sattva-dominant) and impure (Manas-dominant). <strong>The modern condition is Manas dominance.</strong> The rishis mapped this 4,000 years before MRI confirmed it.</div></div>
          </div>
        )}

        {activeSciTab === 'crisis' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">The Brain Has Been Refactored</div>
            <div className="sci-sub">Not metaphorically. Physically. Measurably. Diffusion Tensor MRI shows structural changes across every lobe in heavy digital users.</div>
            <div className="proof"><div className="proof-lbl">MRI Evidence · DTI Scans</div><div className="proof-t">Visual processing stream has <strong>thickened</strong>. Dorsolateral prefrontal cortex has <strong>thinned</strong>. Heavy digital users show a <strong>35% drop</strong> in prefrontal impulse control via EEG Beta wave variability collapse.</div><div className="cite">Loh & Kanai (2014) PLoS ONE · Uncapher & Wagner (2018) PNAS</div></div>
            <div className="proof"><div className="proof-lbl">IISc Bangalore, 2026</div><div className="proof-t">Long-term meditators show <strong>stronger gamma brain activity</strong> and enhanced neural patterns linked to healthier inhibitory circuits. Confirms practice physically rebuilds what digital habits erode.</div><div className="cite">IISc Centre for Neuroscience · thecsrjournal.in · India Today (2026)</div></div>
            <div className="proof"><div className="proof-lbl">Attention Collapse</div><div className="proof-stat" style={{color:'var(--sindoor2)'}}>65 sec</div><div className="proof-t">Average sustained focus duration. Down from <strong>2.5 minutes in 2004</strong>. Doom scrolling fragments attention into 8-second cycles.</div><div className="cite">Mark et al. (2016) CHI Conference · Volkow et al. (2011)</div></div>
            <div className="proof"><div className="proof-lbl">Cortisol & Anxiety</div><div className="proof-t">The safest generation in human history is by every measure the most anxious. Every notification triggers cortisol cascades once reserved for predators.</div><div className="cite">Twenge (2017) iGen · Ward et al. (2017) JACR Brain Drain Study</div></div>
          </div>
        )}

        {activeSciTab === 'tradeoffs' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">The Seven Neural Trade-Offs</div>
            <div className="sci-sub">Brain energy budget: ~20 watts. Zero-sum. When one region gains dominance, others yield. Seven measurable shifts — all moving in the same direction simultaneously. Source: fMRI, VBM/DTI studies, EEG behavioural proxy metrics.</div>
            
            {TRADEOFFS.map((t, i) => (
              <div key={i} className="to-item2" onClick={() => setOpenTO(openTO === i ? -1 : i)}>
                <div className="to-h2"><div><div className="to-n2">{t.n}</div><div className="to-v2">{t.vedic}</div></div><div className="to-p2">{t.pct}% shifted</div></div>
                <div className="to-bar2"><div className="to-r2" style={{width:'0%'}}></div><div className="to-d2" style={{width:`${t.pct}%`, left:'0%'}}></div></div>
                <div className={`to-exp2 ${openTO === i ? 'open' : ''}`}><p>{t.desc}</p><div className="to-fix">Practice: {t.fix}</div></div>
              </div>
            ))}

            <div className="proof" style={{borderColor:'rgba(192,64,64,.3)', background:'rgba(192,64,64,.05)'}}><div className="proof-lbl" style={{color:'var(--sindoor2)'}}>The Compound Effect · Nature Scientific Reports (2024)</div><div className="proof-t">ACC dominance (#1) worsens ventral attention takeover (#3), suppresses DMN (#4), and reduces the reflective capacity to even <strong>recognise</strong> the degradation. The very circuits that would alert you are being consumed first.</div><div className="cite">BioRxiv: "Energy information trade-off in brain networks" · Nature Sci Rep 2024</div></div>
            <div className="proof"><div className="proof-lbl">Vedic Systems Theory — Triguna Dynamics</div><div className="proof-t">Sattva-Rajas-Tamas interact dynamically; excess Rajas (agitation) suppresses Sattva (clarity) and amplifies Tamas (inertia) — a self-reinforcing loop.</div><div style={{fontFamily:'var(--deva)', fontSize:'14px', color:'var(--gold3)', marginTop:'5px'}}>रजो-रागात्मकं विद्धि — Bhagavad Gita 14.7</div></div>
          </div>
        )}

        {activeSciTab === 'evidence' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">Habit Impact: Scientific Evidence</div>
            <div className="sci-sub">Every habit either builds or erodes neural infrastructure. Peak effect sizes from peer-reviewed research.</div>
            <div className="sci-h" style={{fontSize:'14px', color:'var(--jade)', margin:'0 0 8px'}}>✅ Positive Habits</div>
            
            {[
              {h:'Deep Reading',pct:'+34%',col:'var(--jade)',deva:'स्वाध्याय',src:'Berns et al. (2013) · Cunningham & Stanovich (2001) · Sanskrit Effect (Hartzell 2018)'},
              {h:'Sleep 7-9hrs',pct:'+31%',col:'var(--violet2)',deva:'निद्रा',src:'Walker (2017) Why We Sleep · NIH Glymphatic Research'},
              {h:'Meditation 20min',pct:'+28%',col:'var(--gold2)',deva:'ध्यानम्',src:'IISc Bangalore (2026) · SVYASA EEG studies · Lazar et al. (2005) NeuroReport'},
              {h:'Learning New Skills',pct:'+26%',col:'var(--saffron2)',deva:'अभ्यास',src:'Merzenich (2013) Soft-Wired · Doidge (2007) The Brain That Changes Itself'},
              {h:'Exercise 45min',pct:'+25%',col:'var(--jade)',deva:'व्यायाम',src:'Szuhany et al. (2015) meta-analysis · Erickson et al. (2011) PNAS'},
              {h:'Unreachable Hour',pct:'+24%',col:'var(--gold2)',deva:'मौनम्',src:'DMN research · SVYASA fNIRS (2024)'},
            ].map((x, i) => (
              <div key={i} className="sol"><div style={{fontFamily:'var(--deva)', fontSize:'13px', color:'var(--gold3)', marginBottom:'3px'}}>{x.deva}</div><div className="sol-stat" style={{color:x.col}}>{x.pct}</div><div style={{fontSize:'13px', color:'var(--t1)', fontWeight:500, marginBottom:'2px'}}>{x.h}</div><div className="cite">{x.src}</div></div>
            ))}
          </div>
        )}

        {activeSciTab === 'spectrum' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">8.1 Billion Humans: Cognitive Spectrum</div>
            <div className="sci-sub">Recalibrated using OECD PIAAC (39 countries, 250,000 adults), UNESCO literacy data, WHO activity reports, DataReportal 2024 screen time data. Original estimates were too generous.</div>
            
            {TIERS.map((t, i) => (
              <div key={i} className={`tier-c ${t.cls}`}>
                <div className="tc-h"><div className="tc-n" style={{color:t.col}}>{t.n} <span style={{fontFamily:'var(--deva)', fontSize:'12px'}}>{t.deva}</span></div><div className="tc-p">{t.pct} · {t.pop}</div></div>
                <div style={{fontFamily:'var(--mono)', fontSize:'10px', color:t.col, marginBottom:'5px'}}>{t.proc}</div>
                <div className="tc-desc">{t.desc}</div>
              </div>
            ))}

            <div className="proof"><div className="proof-lbl">Vedic Parallel — Mandukya Upanishad</div><div className="proof-t">The Vedic system describes seven states of consciousness. <strong>Only the disciplined practitioner accesses Turiya</strong> (pure awareness). Only 10% can genuinely co-work with AI. The numbers converge across 3,000 years.</div></div>
          </div>
        )}

        {activeSciTab === 'verdict' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">The Final Calculation</div>
            <div className="sci-sub">After 1000 years of evolution data, 7 neural trade-offs, and global cognitive assessment of 8.1 billion humans.</div>
            <div className="vcard vc10"><div className="vc-n" style={{color:'var(--jade)'}}>10%</div><div className="vc-l" style={{color:'var(--jade)'}}>~810 Million</div><div className="vc-d">Can genuinely co-work with AI. They use AI. AI does not use them.</div></div>
            <div className="vcard vc24"><div className="vc-n" style={{color:'var(--gold2)'}}>24%</div><div className="vc-l" style={{color:'var(--gold2)'}}>~1.94 Billion</div><div className="vc-d">Danger zone. Capacity is eroding. Deliberate intervention can reverse it.</div></div>
            <div className="vcard vc66"><div className="vc-n" style={{color:'var(--sindoor2)'}}>66%</div><div className="vc-l" style={{color:'var(--sindoor2)'}}>~5.35 Billion</div><div className="vc-d">Need AI to operate. Cannot meaningfully direct AI, detect hallucinations, or exercise independent analytical judgment.</div></div>
            <div className="proof"><div className="proof-lbl">The Harder Truth</div><div className="proof-t">The 10% figure is <strong>shrinking</strong> as digital habits erode Tier 2 processors faster than education creates new ones. And the monitoring circuits that would alert people to this degradation are themselves being degraded first.</div><div className="cite">OECD PIAAC 2023 · UNESCO GMR · WHO GHO · DataReportal Digital 2024</div></div>
          </div>
        )}

        {activeSciTab === 'solution' && (
          <div className="sci-sec on" style={{padding:'0 14px', paddingBottom:'16px'}}>
            <div className="sci-h">The Ancient Solution, Confirmed Modern</div>
            <div className="sci-sub">The compounding atrophy runs in both directions. The same recursive logic that degrades the unprotected brain rebuilds the protected one.</div>
            {[
              {t:'Walk every morning',stat:'dlPFC re-thickens',sub:'Locus coeruleus relearns slow tonic firing. Norepinephrine regulation restores.',src:'Erickson et al. (2011) PNAS',deva:'वायु-सेवन'},
              {t:'Read 1hr daily',stat:'Language network re-blooms',sub:'Visual-over-language shift begins to reverse. Broca\'s area reactivates. +34%.',src:'Berns et al. (2013) · Sanskrit Effect (Hartzell 2018)',deva:'स्वाध्याय'},
              {t:'Sit in silence 20min',stat:'DMN re-ignites',sub:'Self-reflection, identity formation, creative synthesis return.',src:'IISc (2026) · SVYASA fNIRS Studies (2024)',deva:'ध्यानम्'},
              {t:'Chant or Jap 10min',stat:'dlPFC grey matter grows',sub:'Sanskrit Effect: hippocampal and language cortex density increases measurably.',src:'Hartzell (2018) Scientific American · SVYASA',deva:'नाम जप'},
              {t:'Sleep before midnight',stat:'+31% cognitive restoration',sub:'Glymphatic system clears neurotoxic byproducts. Every late night reverses gains.',src:'Walker (2017) · NIH Glymphatic Research',deva:'निद्रा'},
            ].map((x, i) => (
              <div key={i} className="sol"><div style={{fontFamily:'var(--deva)', fontSize:'15px', color:'var(--gold3)', marginBottom:'5px'}}>{x.deva}</div><div style={{fontSize:'15px', fontWeight:500, color:'var(--t1)', marginBottom:'2px'}}>{x.t}</div><div className="sol-stat">{x.stat}</div><div style={{fontSize:'13px', color:'var(--t2)', lineHeight:1.55, marginBottom:'4px'}}>{x.sub}</div><div className="cite">{x.src}</div></div>
            ))}
            <div style={{textAlign:'center', padding:'16px 0 8px'}}>
              <div style={{fontFamily:'var(--deva)', fontSize:'18px', color:'var(--gold3)', marginBottom:'8px'}}>लोकाः समस्ताः सुखिनो भवन्तु</div>
              <div style={{fontFamily:'var(--mono)', fontSize:'10px', color:'var(--t3)', marginBottom:'14px'}}>May all beings everywhere be happy and free</div>
              <Link href="/practice" className="btn btn-g" style={{display:'inline-block', width:'100%', textDecoration:'none', textAlign:'center', paddingTop:'14px'}}>Begin the Protocol →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
