'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { useStore } from '@/store/useStore';

const WISDOM_CARDS = [
  {id:'wc1', theme:'indigo', tag:'Consciousness · Vedanta', sk:'अहं ब्रह्मास्मि', quote:'"I am Brahman — the infinite, undivided consciousness that underlies all existence. Not a belief. A direct recognition."', sci:'The sense of a fixed "self" is a <strong>neural construction</strong>. Default Mode Network studies show experienced meditators dissolve the ego boundary, accessing <strong>pure awareness states</strong> identical to what Vedanta described 3,000 years ago.', source:'Brihadaranyaka Upanishad · 1.4.10'},
  {id:'wc2', theme:'saffron', tag:'Self-Mastery · Gita', sk:'उद्धरेदात्मनाऽऽत्मानम्', quote:'"Lift yourself by your own self. The self alone is the friend of the self. The self alone is the enemy of the self."', sci:'Self-Determination Theory shows <strong>internal locus of control</strong> produces 73% better outcomes in habit formation. The prefrontal cortex, trained through self-directed practices, <strong>literally rebuilds</strong> its regulatory circuits within 8 weeks.', source:'Bhagavad Gita · 6.5'},
  {id:'wc3', theme:'forest', tag:'Withdrawal · Pratyahara', sk:'प्रत्याहारश्चेन्द्रियाणाम्', quote:'"Pratyahara — the withdrawal of senses from their objects. The fifth limb of yoga. The gateway. Without it, nothing higher can begin."', sci:'EEG studies show sensory withdrawal increases <strong>theta-alpha synchrony within 8 minutes</strong>. The ventral attention network — hyper-trained by infinite scroll — shows measurable downregulation after <strong>21 days</strong> of consistent practice.', source:'Patanjali Yoga Sutras · 2.54'},
  {id:'wc4', theme:'wine', tag:'Equanimity · Gita', sk:'समत्वं योग उच्यते', quote:'"Equanimity of mind is called Yoga. Success and failure are the same to one established in yoga. Act without attachment to outcome."', sci:'Amygdala reactivity shows a <strong>27% reduction</strong> after 8 weeks of equanimity meditation. The amygdala literally shrinks in volume while the <strong>prefrontal cortex thickens</strong> — reversing the 88% anxiety drift of the digital age.', source:'Bhagavad Gita · 2.48'},
  {id:'wc5', theme:'violet', tag:'Breath · Pranayama', sk:'चले वाते चलं चित्तम्', quote:'"When the breath wanders, the mind is unsteady. When the breath is still, so is the mind. Control the breath; you control the cosmos within."', sci:'Slow-paced breathing (5–6 per minute) activates the <strong>baroreflex arc</strong>, synchronizing heart rate with brain oscillations. Stanford research shows this lowers cortisol by <strong>up to 22%</strong> and re-anchors the locus coeruleus to slow tonic firing.', source:'Hatha Yoga Pradipika · 2.2'},
  {id:'wc6', theme:'saffron', tag:'Action · Karma Yoga', sk:'कर्मण्येवाधिकारस्ते', quote:'"You have a right to your actions, never to the fruits of those actions. Act for the action\'s sake, not for the reward."', sci:'Outcome-independent action reduces <strong>dopaminergic anticipation loops</strong> — the same loops exploited by social media. Process-focused individuals report <strong>40% higher flow states</strong> and significantly lower anxiety compared to outcome-focused counterparts.', source:'Bhagavad Gita · 2.47'},
  {id:'wc7', theme:'forest', tag:'Liberation · Vedanta', sk:'सत्यमेव जयते', quote:'"Truth alone triumphs. Through truth the divine path is spread out. By which the sages, their desires fulfilled, reach beyond all fear."', sci:'Value-aligned living reduces psychological distress by <strong>65%</strong> compared to socially-driven behavior. The prefrontal cortex shows <strong>sustained activation</strong> in individuals whose decisions align with their stated core values.', source:'Mundaka Upanishad · 3.1.6'},
];

export default function Wisdom() {
  const store = useStore();
  const [wfNum, setWfNum] = useState(1);
  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);

  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  const handleWfScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    if (t.scrollHeight > t.clientHeight) {
      const pct = t.scrollTop / (t.scrollHeight - t.clientHeight);
      setWfNum(Math.min(7, Math.round(pct * 7) + 1));
    }
  };

  const toggleFav = (id: string) => {
    store.toggleFav(id);
    const isFav = store.favs.includes(id);
    notify(isFav ? '♡ Removed from saved' : '♡ Wisdom saved!');
  };

  return (
    <div className="screen on" id="sw">
      <TopBar />
      <div className="wf-header">
        <div className="wf-hl"><h2>The<br/>Anti‑Scroll</h2><div className="sub">Intentional Wisdom · Slow Down</div></div>
        <div className="wf-count"><span>{wfNum}</span>/7</div>
      </div>

      <div className="wf-feed scroll" onScroll={handleWfScroll} id="wfFeed">
        
        {WISDOM_CARDS.map(card => {
          const isFav = store.favs.includes(card.id);
          return (
            <div key={card.id} className={`wcard wcard-${card.theme}`}>
              <div className="wcard-stripe"></div>
              <div className="wcard-body">
                <div className="wcard-tag">{card.tag}</div>
                <div className="wcard-sanskrit">{card.sk}</div>
                <div className="wcard-quote">{card.quote}</div>
                <div className="wcard-divider"></div>
                <div className="wcard-sci-lbl">The Science</div>
                <div className="wcard-sci" dangerouslySetInnerHTML={{__html: card.sci}}></div>
              </div>
              <div className="wcard-foot">
                <div className="wcard-source">{card.source}</div>
                <div className="wcard-acts">
                  <button className={`wcard-act ${isFav ? 'wcard-fav-on' : ''}`} onClick={() => toggleFav(card.id)}>
                    {isFav ? '♥ Saved' : '♡ Save'}
                  </button>
                  <Link href="/practice" className="wcard-act" style={{textDecoration:'none'}}>♫ Practice</Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* End Void State */}
        <div className="void-card">
          <div className="void-dot"></div>
          <div className="void-txt">The vessel is full.<br/>Return to the world.</div>
          <Link href="/practice" className="btn btn-o btn-sm" style={{marginTop:'24px', opacity:0.6, textDecoration:'none'}}>Begin a Practice</Link>
        </div>
      </div>

      <div className="wf-hint">Scroll slowly · Each card is a teaching</div>
      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
