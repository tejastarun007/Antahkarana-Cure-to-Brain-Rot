'use client';
import { useState } from 'react';
import { SCI_SECS, ERAS, TRADEOFFS, TIERS } from '@/data/content';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';

export default function Science() {
  const [activeSciTab, setActiveSciTab] = useState('timeline');
  const [openEra, setOpenEra] = useState<number>(-1);
  const [openTO, setOpenTO] = useState<number>(-1);

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
