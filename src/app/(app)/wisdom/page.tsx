'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { useStore } from '@/store/useStore';
import { GITA_TEACHINGS } from '@/data/gita-daily';

/* ═══ FULL WISDOM CARD POOL — rotates 7 per day ═══ */
const ALL_WISDOM_CARDS = [
  {id:'wc1', theme:'indigo', tag:'Consciousness · Vedanta', sk:'अहं ब्रह्मास्मि', quote:'"I am Brahman — the infinite, undivided consciousness that underlies all existence. Not a belief. A direct recognition."', sci:'The sense of a fixed "self" is a <strong>neural construction</strong>. Default Mode Network studies show experienced meditators dissolve the ego boundary, accessing <strong>pure awareness states</strong> identical to what Vedanta described 3,000 years ago.', source:'Brihadaranyaka Upanishad · 1.4.10'},
  {id:'wc2', theme:'saffron', tag:'Self-Mastery · Gita', sk:'उद्धरेदात्मनाऽऽत्मानम्', quote:'"Lift yourself by your own self. The self alone is the friend of the self. The self alone is the enemy of the self."', sci:'Self-Determination Theory shows <strong>internal locus of control</strong> produces 73% better outcomes in habit formation. The prefrontal cortex, trained through self-directed practices, <strong>literally rebuilds</strong> its regulatory circuits within 8 weeks.', source:'Bhagavad Gita · 6.5'},
  {id:'wc3', theme:'forest', tag:'Withdrawal · Pratyahara', sk:'प्रत्याहारश्चेन्द्रियाणाम्', quote:'"Pratyahara — the withdrawal of senses from their objects. The fifth limb of yoga. The gateway. Without it, nothing higher can begin."', sci:'EEG studies show sensory withdrawal increases <strong>theta-alpha synchrony within 8 minutes</strong>. The ventral attention network — hyper-trained by infinite scroll — shows measurable downregulation after <strong>21 days</strong> of consistent practice.', source:'Patanjali Yoga Sutras · 2.54'},
  {id:'wc4', theme:'wine', tag:'Equanimity · Gita', sk:'समत्वं योग उच्यते', quote:'"Equanimity of mind is called Yoga. Success and failure are the same to one established in yoga. Act without attachment to outcome."', sci:'Amygdala reactivity shows a <strong>27% reduction</strong> after 8 weeks of equanimity meditation. The amygdala literally shrinks in volume while the <strong>prefrontal cortex thickens</strong> — reversing the 88% anxiety drift of the digital age.', source:'Bhagavad Gita · 2.48'},
  {id:'wc5', theme:'violet', tag:'Breath · Pranayama', sk:'चले वाते चलं चित्तम्', quote:'"When the breath wanders, the mind is unsteady. When the breath is still, so is the mind. Control the breath; you control the cosmos within."', sci:'Slow-paced breathing (5–6 per minute) activates the <strong>baroreflex arc</strong>, synchronizing heart rate with brain oscillations. Stanford research shows this lowers cortisol by <strong>up to 22%</strong> and re-anchors the locus coeruleus to slow tonic firing.', source:'Hatha Yoga Pradipika · 2.2'},
  {id:'wc6', theme:'saffron', tag:'Action · Karma Yoga', sk:'कर्मण्येवाधिकारस्ते', quote:'"You have a right to your actions, never to the fruits of those actions. Act for the action\'s sake, not for the reward."', sci:'Outcome-independent action reduces <strong>dopaminergic anticipation loops</strong> — the same loops exploited by social media. Process-focused individuals report <strong>40% higher flow states</strong> and significantly lower anxiety compared to outcome-focused counterparts.', source:'Bhagavad Gita · 2.47'},
  {id:'wc7', theme:'forest', tag:'Liberation · Vedanta', sk:'सत्यमेव जयते', quote:'"Truth alone triumphs. Through truth the divine path is spread out. By which the sages, their desires fulfilled, reach beyond all fear."', sci:'Value-aligned living reduces psychological distress by <strong>65%</strong> compared to socially-driven behavior. The prefrontal cortex shows <strong>sustained activation</strong> in individuals whose decisions align with their stated core values.', source:'Mundaka Upanishad · 3.1.6'},
  // Extended pool for rotation
  {id:'wc8', theme:'wine', tag:'Mind · Upanishad', sk:'मनो हि द्विविधं प्रोक्तं शुद्धं चाशुद्धमेव च', quote:'"The mind is twofold: pure and impure. Impure when joined with desire; pure when free from desire."', sci:`The brain's <strong>salience network</strong> toggles between desire-driven and clarity-driven processing. Mindfulness training shifts default activation from the ventral (craving) to the <strong>dorsal (awareness) pathway</strong> within 8 weeks.`, source:'Amritabindu Upanishad · 1'},
  {id:'wc9', theme:'indigo', tag:'Darkness to Light', sk:'तमसो मा ज्योतिर्गमय', quote:'"Lead me from darkness to light. From the unreal to the real. From death to immortality."', sci:'Neural imaging shows a literal <strong>"brightening" of prefrontal activity</strong> during contemplative practice. Gamma wave amplitude — the marker of conscious clarity — increases by <strong>up to 700%</strong> in long-term meditators.', source:'Brihadaranyaka Upanishad · 1.3.28'},
  {id:'wc10', theme:'saffron', tag:'Inner Hierarchy · Gita', sk:'इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः', quote:'"The senses are superior to the body. The mind is superior to the senses. The intellect is superior to the mind. Beyond intellect is the Self."', sci:'The <strong>prefrontal cortex (Buddhi)</strong> can override limbic impulses (Manas). This top-down regulation is strengthened by <strong>34%</strong> through consistent meditation practice, rebuilding the hierarchy the ancients mapped.', source:'Bhagavad Gita · 3.42'},
  {id:'wc11', theme:'forest', tag:'Bondage · Liberation', sk:'मनः एव मनुष्याणां कारणं बन्धमोक्षयोः', quote:'"The mind alone is the cause of bondage and liberation. Attached to sense objects it leads to bondage; free from attachment, to liberation."', sci:'Attachment activates the <strong>nucleus accumbens</strong> — the brain\'s reward center — creating compulsive loops. Non-attachment training reduces this activation by <strong>35%</strong>, restoring volitional control over attention.', source:'Amritabindu Upanishad · 2'},
  {id:'wc12', theme:'violet', tag:'Universal Prayer', sk:'लोकाः समस्ताः सुखिनो भवन्तु', quote:'"May all beings everywhere be happy and free. May the thoughts, words, and actions of my life contribute to that happiness for all."', sci:'Loving-kindness meditation activates the <strong>insula and temporoparietal junction</strong>, expanding the circle of empathy. fMRI shows <strong>increased vagal tone</strong> and reduced inflammatory markers after 6 weeks of compassion practice.', source:'Ancient Vedic Invocation'},
  {id:'wc13', theme:'wine', tag:'Discipline · Tapas', sk:'तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः', quote:'"Kriya Yoga consists of self-discipline, self-study, and surrender to the divine. These three constitute the practice of yoga in action."', sci:'Structured self-discipline activates the <strong>anterior cingulate cortex</strong>, building error-monitoring capacity. Combined with self-study (metacognition), this produces <strong>measurable gray matter growth</strong> within 8 weeks.', source:'Patanjali Yoga Sutras · 2.1'},
  {id:'wc14', theme:'indigo', tag:'Stillness · Dhyana', sk:'ध्यानहेयास्तद्वृत्तयः', quote:'"The modifications of the mind are to be stilled by meditation. When the lake of the mind is still, the Self is reflected perfectly."', sci:'Mental quietude produces <strong>alpha-theta crossover</strong> — the neural signature of deep creative states. EEG coherence increases across hemispheres, producing <strong>whole-brain integration</strong> absent in fragmented digital attention.', source:'Patanjali Yoga Sutras · 2.11'},
];

/**
 * Get 7 wisdom cards for a given user day.
 * Rotates through the full pool so each day shows a different set.
 */
function getWisdomCardsForDay(userDay: number) {
  const total = ALL_WISDOM_CARDS.length;
  const startIdx = ((userDay - 1) * 7) % total;
  const cards = [];
  for (let i = 0; i < 7; i++) {
    cards.push(ALL_WISDOM_CARDS[(startIdx + i) % total]);
  }
  return cards;
}

export default function Wisdom() {
  const store = useStore();
  const [wfNum, setWfNum] = useState(1);
  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);


  // User's practice day — starts at 1 when they first practice
  const userDay = store.hist.length || 1;

  // Today's Gita teaching based on user's practice day
  const gitaIdx = (userDay - 1) % GITA_TEACHINGS.length;
  const todayGita = GITA_TEACHINGS[gitaIdx];



  // Today's 7 wisdom cards — rotate based on user day
  const todayCards = getWisdomCardsForDay(userDay);

  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  const totalCards = todayCards.length + 1; // +1 for the Gita teaching card
  const handleWfScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    if (t.scrollHeight > t.clientHeight) {
      const pct = t.scrollTop / (t.scrollHeight - t.clientHeight);
      setWfNum(Math.min(totalCards, Math.round(pct * totalCards) + 1));
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
        <div className="wf-hl"><h2><span style={{ color: 'var(--gold2)' }}>The<br/>Anti‑Scroll</span></h2><div className="sub">Intentional Wisdom · Slow Down</div></div>
        <div className="wf-count"><span>{wfNum}</span>/{totalCards}</div>
      </div>

      <div className="wf-feed scroll" onScroll={handleWfScroll} id="wfFeed">

        {/* ═══ DAILY GITA TEACHING — PREMIUM SACRED CARD ═══ */}
        <div className="gita-daily">
          <div className="gita-daily-glow"></div>
          <div className="gita-daily-glow2"></div>
          <div className="gita-daily-inner">
            <div className="gita-daily-badge">
              <span className="gita-daily-badge-icon">🙏</span>
              <span>Day {userDay} · Today&apos;s Gita Teaching</span>
            </div>
            <div className="gita-daily-chapter">Chapter {todayGita.chapter} · Verse {todayGita.verse}</div>
            <div className="gita-daily-sanskrit deva">{todayGita.sanskrit}</div>
            <div className="gita-daily-translation">&ldquo;{todayGita.translation}&rdquo;</div>
            <div className="gita-daily-divider"><span>◈</span></div>
            <div className="gita-daily-reflection">{todayGita.reflection}</div>
            <div className="gita-daily-theme-tag">{todayGita.theme}</div>
            <div className="gita-daily-neuro-wrap">
              <div className="gita-daily-neuro-lbl">The Neuroscience</div>
              <div className="gita-daily-neuro">{todayGita.neuro}</div>
            </div>
            <div className="gita-daily-foot">
              <button
                className={`wcard-act ${store.favs.includes(todayGita.id) ? 'wcard-fav-on' : ''}`}
                onClick={() => toggleFav(todayGita.id)}
              >
                {store.favs.includes(todayGita.id) ? '♥ Saved' : '♡ Save'}
              </button>
              <Link href="/practice" className="wcard-act" style={{textDecoration:'none'}}>♫ Practice</Link>
            </div>
          </div>
          <div className="gita-daily-mandala">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth=".6"/>
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth=".4" strokeDasharray="3 4"/>
              <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth=".5"/>
              <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth=".3" strokeDasharray="2 3"/>
              <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth=".6"/>
              <circle cx="50" cy="50" r="3" fill="currentColor" opacity=".6"/>
            </svg>
          </div>
        </div>



        {/* ═══ SECTION DIVIDER ═══ */}
        <div className="wf-section-div">
          <div className="wf-section-line"></div>
          <span>Day {userDay} Wisdom Cards</span>
          <div className="wf-section-line"></div>
        </div>

        {/* ═══ DAILY ROTATING WISDOM CARDS (7 per day) ═══ */}
        {todayCards.map(card => {
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
