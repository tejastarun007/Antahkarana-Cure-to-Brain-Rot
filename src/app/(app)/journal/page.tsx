'use client';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

const MOOD_OPTIONS = [
  { emoji: '🪷', label: 'Sattvic', desc: 'Clear, peaceful', deva: 'सत्त्व', info: 'The mind is still, alert, and receptive. Prefrontal cortex dominant, DMN healthy, cortisol low. High alpha-theta coherence.', gita: 'Gita 14.6 — "Sattva binds by attachment to happiness and knowledge."', color: 'var(--jade)' },
  { emoji: '⚡', label: 'Rajasic', desc: 'Agitated, restless', deva: 'रजस्', info: 'Racing thoughts, compulsive checking, inability to sit still. ACC dominates dlPFC, dopamine spiking and crashing. 65-sec average focus.', gita: 'Gita 14.7 — "Rajas is born of craving and attachment."', color: 'var(--saffron2)' },
  { emoji: '🌫️', label: 'Tamasic', desc: 'Heavy, foggy', deva: 'तमस्', info: 'Dull, no motivation, brain fog. Often follows prolonged Rajasic states — the crash after the scroll. Prefrontal cortex hypometabolic.', gita: 'Gita 14.8 — "Tamas binds through negligence, laziness, and sleep."', color: 'var(--violet2)' },
  { emoji: '☀️', label: 'Awakened', desc: 'Alert, joyful', deva: 'तुरीय', info: 'Beyond the three gunas — pure awareness where clarity and energy coexist. Gamma waves up to 700% higher in long-term meditators. Rare and cultivated.', gita: 'Mandukya Upanishad — "Turīya, the fourth state, is pure consciousness."', color: 'var(--gold2)' },
];

const PROMPTS = [
  'What occupied your mind today? Write without judgment.',
  'What did you consume today — information, food, conversation? Notice the quality.',
  'Where did your attention go without your permission?',
  'What is one thing you understood more deeply today?',
  'Describe a moment of stillness from today, however brief.',
  'What are you grateful for in this moment?',
  'What practice felt most natural today?',
];

export default function Journal() {
  const store = useStore();
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [moodInfo, setMoodInfo] = useState<string | null>(null);
  const infoTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // Pick a random prompt based on the day
    const dayIdx = new Date().getDay();
    setPrompt(PROMPTS[dayIdx % PROMPTS.length]);
  }, []);

  const wordCount = entry.trim() ? entry.trim().split(/\s+/).length : 0;

  const saveEntry = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: `j-${Date.now()}`,
      text: entry.trim(),
      mood: mood || 'unknown',
      date: new Date().toISOString(),
      words: wordCount,
    };
    store.addJournalEntry(newEntry);
    setEntry('');
    setMood(null);
    setSavedMsg('🪔 Entry saved to your journal');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const journalEntries = store.journal || [];

  return (
    <div className="screen on" id="journal">
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <Link href="/dashboard" style={{ color: 'var(--t3)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>← Back</Link>
      </div>
      <div style={{ padding: '10px 20px 6px' }}>
        <div className="lbl">MANAS JOURNAL</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 300, color: 'var(--gold2)', lineHeight: 1.3 }}>
          Write by Hand,<br /><span style={{ color: 'var(--t1)' }}>Think by Heart</span>
        </div>
        <div style={{ fontFamily: 'var(--deva)', fontSize: '14px', color: 'var(--gold3)', margin: '6px 0 4px' }}>लेखनम् — The Act of Conscious Writing</div>
        <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6 }}>
          Digital journaling as a bridge to handwriting practice. Process your thoughts here, then transfer the essence to paper.
        </p>
      </div>

      <div className="scroll" style={{ flex: 1, paddingBottom: '90px' }}>
        {/* Tab Switcher */}
        <div className="chip-row" style={{ paddingBottom: 0, marginBottom: '14px' }}>
          <div className={`chip ${!showHistory ? 'on' : ''}`} onClick={() => setShowHistory(false)}>Today&apos;s Entry</div>
          <div className={`chip ${showHistory ? 'on' : ''}`} onClick={() => setShowHistory(true)}>History ({journalEntries.length})</div>
        </div>

        {!showHistory ? (
          <div style={{ padding: '0 20px' }}>
            {/* Daily Prompt */}
            <div style={{
              background: 'rgba(200,144,42,.05)', border: '1px solid var(--bdr)',
              borderRadius: '14px', padding: '14px', marginBottom: '14px',
              borderLeft: '3px solid var(--gold2)'
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold2)', marginBottom: '6px' }}>TODAY&apos;S REFLECTION</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', color: 'var(--t1)', fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;{prompt}&rdquo;</div>
            </div>

            {/* Mood Selector */}
            <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--t3)', marginBottom: '8px' }}>CURRENT STATE <span style={{ color: 'var(--t4)', fontWeight: 400 }}>· tap to learn</span></div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
              {MOOD_OPTIONS.map(m => (
                <div
                  key={m.label}
                  onClick={() => {
                    setMood(m.label);
                    setMoodInfo(moodInfo === m.label ? null : m.label);
                    if (infoTimerRef.current) clearTimeout(infoTimerRef.current);
                    if (moodInfo !== m.label) {
                      infoTimerRef.current = setTimeout(() => setMoodInfo(null), 4000);
                    }
                  }}
                  style={{
                    flex: 1, textAlign: 'center', padding: '10px 4px',
                    background: mood === m.label ? 'rgba(200,144,42,.1)' : 'var(--mid)',
                    border: `1px solid ${mood === m.label ? 'var(--gold2)' : 'var(--bdr)'}`,
                    borderRadius: '12px', cursor: 'pointer', transition: 'all .2s'
                  }}
                >
                  <div style={{ fontSize: '18px', marginBottom: '2px' }}>{m.emoji}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: mood === m.label ? 'var(--gold2)' : 'var(--t3)', letterSpacing: '.5px' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Mood Info Tooltip */}
            {moodInfo && (() => {
              const m = MOOD_OPTIONS.find(x => x.label === moodInfo);
              if (!m) return null;
              return (
                <div style={{
                  background: 'var(--mid)', border: `1px solid ${m.color}33`,
                  borderRadius: '12px', padding: '12px', marginBottom: '14px',
                  borderLeft: `3px solid ${m.color}`,
                  animation: 'sIn .3s ease forwards'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '18px' }}>{m.emoji}</span>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: m.color }}>{m.label}</span>
                      <span style={{ fontFamily: 'var(--deva)', fontSize: '12px', color: 'var(--gold3)', marginLeft: '8px' }}>{m.deva}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--t4)', fontSize: '14px' }} onClick={(e) => { e.stopPropagation(); setMoodInfo(null); }}>✕</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '6px' }}>{m.info}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '11px', color: 'var(--t3)', fontStyle: 'italic' }}>{m.gita}</div>
                </div>
              );
            })()}

            {/* Writing Area */}
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Begin writing..."
              style={{
                width: '100%', minHeight: '180px', background: 'var(--mid)',
                border: '1px solid var(--bdr)', borderRadius: '14px',
                padding: '16px', color: 'var(--t1)', fontSize: '14px',
                fontFamily: 'var(--serif)', lineHeight: 1.8, resize: 'vertical',
                outline: 'none', boxSizing: 'border-box',
              }}
            />

            {/* Word Count + Save */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)' }}>
                {wordCount} word{wordCount !== 1 ? 's' : ''}
              </div>
              <button
                className="btn btn-g"
                onClick={saveEntry}
                disabled={!entry.trim()}
                style={{ opacity: entry.trim() ? 1 : 0.4 }}
              >
                Save Entry 🪔
              </button>
            </div>

            {/* Saved notification */}
            {savedMsg && (
              <div style={{
                textAlign: 'center', padding: '10px', marginTop: '10px',
                background: 'rgba(82,168,120,.08)', border: '1px solid rgba(82,168,120,.2)',
                borderRadius: '12px', fontSize: '13px', color: 'var(--jade)',
                animation: 'sIn .3s ease forwards'
              }}>
                {savedMsg}
              </div>
            )}

            {/* Philosophy note */}
            <div style={{
              marginTop: '20px', padding: '14px', background: 'rgba(112,96,192,.05)',
              border: '1px solid rgba(112,96,192,.15)', borderRadius: '14px', textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'var(--deva)', fontSize: '15px', color: 'var(--gold3)', marginBottom: '6px' }}>स्वाध्यायात् मोक्षः</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '12px', color: 'var(--t3)', fontStyle: 'italic', lineHeight: 1.5 }}>
                &ldquo;Through self-study comes liberation.&rdquo; Writing is the first form of self-study. Transfer this entry to paper for deeper encoding.
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 20px' }}>
            {journalEntries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px', opacity: 0.3 }}>📝</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--t3)', marginBottom: '8px' }}>No entries yet</div>
                <div style={{ fontSize: '12px', color: 'var(--t4)' }}>Your journal awaits its first words.</div>
              </div>
            ) : (
              [...journalEntries].reverse().map(e => {
                const d = new Date(e.date);
                const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                const moodEmoji = MOOD_OPTIONS.find(m => m.label === e.mood)?.emoji || '•';
                return (
                  <div key={e.id} style={{
                    background: 'var(--mid)', border: '1px solid var(--bdr)',
                    borderRadius: '14px', padding: '14px', marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t3)' }}>{dateStr}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px' }}>{moodEmoji}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--t4)' }}>{e.words} words</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {e.text.length > 200 ? e.text.substring(0, 200) + '...' : e.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
