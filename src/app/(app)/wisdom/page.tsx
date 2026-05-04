'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';

export default function Wisdom() {
  const [wfNum, setWfNum] = useState(1);

  const handleWfScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    if (t.scrollHeight > t.clientHeight) {
      const pct = t.scrollTop / (t.scrollHeight - t.clientHeight);
      setWfNum(Math.min(7, Math.round(pct * 7) + 1));
    }
  };

  return (
    <div className="screen on" id="sw">
      <TopBar />
      <div className="wf-header">
        <div className="wf-hl"><h2>The<br/>Anti‑Scroll</h2><div className="sub">Intentional Wisdom · Slow Down</div></div>
        <div className="wf-count"><span>{wfNum}</span>/7</div>
      </div>

      <div className="wf-feed scroll" onScroll={handleWfScroll} id="wfFeed">
        
        {/* Hardcoded feed cards from user's request */}
        <div className="wcard wcard-indigo">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Consciousness · Vedanta</div>
            <div className="wcard-sanskrit">अहं ब्रह्मास्मि</div>
            <div className="wcard-quote">"I am Brahman — the infinite, undivided consciousness that underlies all existence. Not a belief. A direct recognition."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">The sense of a fixed "self" is a <strong>neural construction</strong>. Default Mode Network studies show experienced meditators dissolve the ego boundary, accessing <strong>pure awareness states</strong> identical to what Vedanta described 3,000 years ago.</div>
          </div>
          <svg className="wcard-lotus" width="90" height="90" viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(160,150,240,.4)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(160,150,240,.4)" transform="rotate(30 40 40)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(160,150,240,.4)" transform="rotate(60 40 40)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(160,150,240,.4)" transform="rotate(-30 40 40)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(160,150,240,.4)" transform="rotate(-60 40 40)"/></svg>
          <div className="wcard-foot">
            <div className="wcard-source">Brihadaranyaka Upanishad · 1.4.10</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><Link href="/practice" className="wcard-act" style={{textDecoration:'none'}}>♫ Chant</Link></div>
          </div>
        </div>

        <div className="wcard wcard-saffron">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Self-Mastery · Gita</div>
            <div className="wcard-sanskrit">उद्धरेदात्मनाऽऽत्मानम्</div>
            <div className="wcard-quote">"Lift yourself by your own self. The self alone is the friend of the self. The self alone is the enemy of the self."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">Self-Determination Theory shows <strong>internal locus of control</strong> produces 73% better outcomes in habit formation. The prefrontal cortex, trained through self-directed practices, <strong>literally rebuilds</strong> its regulatory circuits within 8 weeks.</div>
          </div>
          <svg className="wcard-lotus" width="90" height="90" viewBox="0 0 80 80" fill="none"><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(212,150,42,.4)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(212,150,42,.4)" transform="rotate(45 40 40)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(212,150,42,.4)" transform="rotate(-45 40 40)"/><ellipse cx="40" cy="55" rx="7" ry="16" fill="rgba(212,150,42,.4)" transform="rotate(90 40 40)"/></svg>
          <div className="wcard-foot">
            <div className="wcard-source">Bhagavad Gita · 6.5</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><button className="wcard-act">⟳ Share</button></div>
          </div>
        </div>

        <div className="wcard wcard-forest">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Withdrawal · Pratyahara</div>
            <div className="wcard-sanskrit">प्रत्याहारश्चेन्द्रियाणाम्</div>
            <div className="wcard-quote">"Pratyahara — the withdrawal of senses from their objects. The fifth limb of yoga. The gateway. Without it, nothing higher can begin."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">EEG studies show sensory withdrawal increases <strong>theta-alpha synchrony within 8 minutes</strong>. The ventral attention network — hyper-trained by infinite scroll — shows measurable downregulation after <strong>21 days</strong> of consistent practice.</div>
          </div>
          <div className="wcard-foot">
            <div className="wcard-source">Patanjali Yoga Sutras · 2.54</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><Link href="/practice" className="wcard-act" style={{textDecoration:'none'}}>☽ Practice</Link></div>
          </div>
        </div>

        <div className="wcard wcard-wine">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Equanimity · Gita</div>
            <div className="wcard-sanskrit">समत्वं योग उच्यते</div>
            <div className="wcard-quote">"Equanimity of mind is called Yoga. Success and failure are the same to one established in yoga. Act without attachment to outcome."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">Amygdala reactivity shows a <strong>27% reduction</strong> after 8 weeks of equanimity meditation. The amygdala literally shrinks in volume while the <strong>prefrontal cortex thickens</strong> — reversing the 88% anxiety drift of the digital age.</div>
          </div>
          <div className="wcard-foot">
            <div className="wcard-source">Bhagavad Gita · 2.48</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><button className="wcard-act">⟳ Share</button></div>
          </div>
        </div>

        <div className="wcard wcard-violet">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Breath · Pranayama</div>
            <div className="wcard-sanskrit">चले वाते चलं चित्तम्</div>
            <div className="wcard-quote">"When the breath wanders, the mind is unsteady. When the breath is still, so is the mind. Control the breath; you control the cosmos within."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">Slow-paced breathing (5–6 per minute) activates the <strong>baroreflex arc</strong>, synchronizing heart rate with brain oscillations. Stanford research shows this lowers cortisol by <strong>up to 22%</strong> and re-anchors the locus coeruleus to slow tonic firing.</div>
          </div>
          <div className="wcard-foot">
            <div className="wcard-source">Hatha Yoga Pradipika · 2.2</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><Link href="/practice" className="wcard-act" style={{textDecoration:'none'}}>♫ Breathe</Link></div>
          </div>
        </div>

        <div className="wcard wcard-saffron">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Action · Karma Yoga</div>
            <div className="wcard-sanskrit">कर्मण्येवाधिकारस्ते</div>
            <div className="wcard-quote">"You have a right to your actions, never to the fruits of those actions. Act for the action's sake, not for the reward."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">Outcome-independent action reduces <strong>dopaminergic anticipation loops</strong> — the same loops exploited by social media. Process-focused individuals report <strong>40% higher flow states</strong> and significantly lower anxiety compared to outcome-focused counterparts.</div>
          </div>
          <div className="wcard-foot">
            <div className="wcard-source">Bhagavad Gita · 2.47</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><button className="wcard-act">⟳ Share</button></div>
          </div>
        </div>

        <div className="wcard wcard-forest">
          <div className="wcard-stripe"></div>
          <div className="wcard-body">
            <div className="wcard-tag">Liberation · Vedanta</div>
            <div className="wcard-sanskrit">सत्यमेव जयते</div>
            <div className="wcard-quote">"Truth alone triumphs. Through truth the divine path is spread out. By which the sages, their desires fulfilled, reach beyond all fear."</div>
            <div className="wcard-divider"></div>
            <div className="wcard-sci-lbl">The Science</div>
            <div className="wcard-sci">Value-aligned living reduces psychological distress by <strong>65%</strong> compared to socially-driven behavior. The prefrontal cortex shows <strong>sustained activation</strong> in individuals whose decisions align with their stated core values.</div>
          </div>
          <div className="wcard-foot">
            <div className="wcard-source">Mundaka Upanishad · 3.1.6</div>
            <div className="wcard-acts"><button className="wcard-act">♡ Save</button><button className="wcard-act">⟳ Share</button></div>
          </div>
        </div>

        {/* End Void State */}
        <div className="void-card">
          <div className="void-dot"></div>
          <div className="void-txt">The vessel is full.<br/>Return to the world.</div>
          <Link href="/practice" className="btn btn-o btn-sm" style={{marginTop:'24px', opacity:0.6, textDecoration:'none'}}>Begin a Practice</Link>
        </div>
      </div>

      <div className="wf-hint">Scroll slowly · Each card is a teaching</div>
    </div>
  );
}
