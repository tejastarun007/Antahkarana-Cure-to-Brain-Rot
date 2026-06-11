'use client';
import { useStore } from '@/store/useStore';
import { MILESTONES, WISDOMS } from '@/data/content';
import { GITA_TEACHINGS } from '@/data/gita-daily';
import { GITA_365 } from '@/data/gita-365';

const WISDOM_CARDS = [
  {id:'wc1', sk:'अहं ब्रह्मास्मि', e:'"I am Brahman — the infinite, undivided consciousness."', src:'Brihadaranyaka Upanishad 1.4.10'},
  {id:'wc2', sk:'उद्धरेदात्मनाऽऽत्मानम्', e:'"Lift yourself by your own self."', src:'Bhagavad Gita 6.5'},
  {id:'wc3', sk:'प्रत्याहारश्चेन्द्रियाणाम्', e:'"Pratyahara — the withdrawal of senses."', src:'Patanjali Yoga Sutras 2.54'},
  {id:'wc4', sk:'समत्वं योग उच्यते', e:'"Equanimity of mind is called Yoga."', src:'Bhagavad Gita 2.48'},
  {id:'wc5', sk:'चले वाते चलं चित्तम्', e:'"When the breath wanders, the mind is unsteady."', src:'Hatha Yoga Pradipika 2.2'},
  {id:'wc6', sk:'कर्मण्येवाधिकारस्ते', e:'"You have a right to your actions, never to the fruits."', src:'Bhagavad Gita 2.47'},
  {id:'wc7', sk:'सत्यमेव जयते', e:'"Truth alone triumphs."', src:'Mundaka Upanishad 3.1.6'},
];

const ALL_SAVEABLE = [
  ...WISDOMS.map(w => ({id: w.id, sk: w.s, e: w.e, src: w.src})),
  ...WISDOM_CARDS,
  ...GITA_TEACHINGS.map(g => ({id: g.id, sk: g.sanskrit, e: `"${g.translation}"`, src: `Bhagavad Gita · ${g.verse}`})),
  ...GITA_365.map(g => ({id: g.id, sk: g.sanskrit, e: `"${g.translation}"`, src: `Bhagavad Gita · ${g.verse}`})),
];
import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Profile() {
  const store = useStore();
  const router = useRouter();
  const [calDate, setCalDate] = useState(new Date());

  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [showTiers, setShowTiers] = useState(false);

  // ── Attention test state ──
  const [testOpen, setTestOpen] = useState(false);
  const [testPhase, setTestPhase] = useState<'idle' | 'memorise' | 'recall' | 'done'>('idle');
  const [pattern, setPattern] = useState<number[]>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<{ attention: number; memory: number } | null>(null);

  // ── Daily reminder ──
  const [remindOn, setRemindOn] = useState(false);
  const [remindTime, setRemindTime] = useState('07:00');
  useEffect(() => {
    const saved = localStorage.getItem('ank_reminder');
    if (saved) { setTimeout(() => { setRemindOn(true); setRemindTime(saved); }, 0); }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  const doSignOut = async () => {
    if (confirm('Sign out? Your practice data will be preserved.')) {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    }
  };

  const saveName = () => {
    if (tempName.trim()) {
      store.updateUserName(tempName.trim());
      notify('Name updated ✨');
    }
    setIsEditingName(false);
  };

  /* ═══ LONG-TERM TIER SYSTEM (1–5 year journey) ═══ */
  const TIERS = [
    { min: 0,    title: 'Tamas',         desc: 'Begin your practice. The first step is the hardest.', req: 'Day 1' },
    { min: 7,    title: 'Pramaada',      desc: 'The fog of negligence lifts. Awareness dawns.', req: '~1 week of practice' },
    { min: 30,   title: 'Arambhaka',     desc: 'The foundation is being laid, brick by brick.', req: '~1 month of practice' },
    { min: 75,   title: 'Mumukshu',      desc: 'The desire for freedom stirs within you.', req: '~2-3 months of practice' },
    { min: 150,  title: 'Jijnasu',       desc: 'The thirst for true knowledge deepens.', req: '~4-6 months of practice' },
    { min: 300,  title: 'Sadhaka',       desc: 'Practice becomes second nature. Circuits rebuild.', req: '~8-12 months of practice' },
    { min: 550,  title: 'Tapasvi',       desc: 'Discipline is your fire. The mind obeys.', req: '~1-1.5 years of practice' },
    { min: 900,  title: 'Yogarudha',     desc: 'Established in yoga. A rare capacity emerges.', req: '~1.5-2.5 years of practice' },
    { min: 1400, title: 'Sthitaprajna',  desc: 'Steady wisdom. The mind is a still lake.', req: '~2.5-3.5 years of practice' },
    { min: 2000, title: 'Jivanmukta',    desc: 'Liberation while living. Guard it fiercely.', req: '~3.5-5 years of practice' },
    { min: 2800, title: 'Brahmanishtha', desc: 'Established in Brahman. The ultimate realization.', req: '5+ years of dedicated practice' },
  ];

  // XP = practice days + hours practiced + weeks of streak
  const xp = (store.hist.length || 0) + Math.floor((store.totalMins || 0) / 60) + Math.floor((store.streak || 0) / 7);

  // Find current tier
  let tierIdx = 0;
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].min) { tierIdx = i; break; }
  }
  const tier = TIERS[tierIdx];
  const nextTier = TIERS[tierIdx + 1];
  // Progress % toward next tier (0-100 for ring/bar)
  const tierPct = nextTier
    ? Math.min(100, Math.round(((xp - tier.min) / (nextTier.min - tier.min)) * 100))
    : 100;

  // ═══ Attention test logic (pattern recall, 16-grid) ═══
  const startTest = () => {
    const p: number[] = [];
    while (p.length < 5) {
      const r = Math.floor(Math.random() * 16);
      if (!p.includes(r)) p.push(r);
    }
    setPattern(p); setPicked([]); setTestPhase('memorise');
    setTimeout(() => setTestPhase('recall'), 2200);
  };
  const pickCell = (i: number) => {
    if (testPhase !== 'recall' || picked.includes(i)) return;
    const np = [...picked, i];
    setPicked(np);
    if (np.length === 5) {
      const hits = np.filter(x => pattern.includes(x)).length;
      const attention = Math.min(100, 40 + hits * 12);
      const memory = Math.min(100, 30 + hits * 14);
      store.addAttentionTest(attention, memory);
      setLastResult({ attention, memory });
      setTestPhase('done');
    }
  };
  const firstTest = store.attentionTests[0];
  const latestTest = store.attentionTests[store.attentionTests.length - 1];
  const daysSinceTest = latestTest ? Math.floor((new Date().getTime() - new Date(latestTest.date).getTime()) / 86400000) : Infinity;

  // ═══ Weekly report (computed from hist) ═══
  const weekReport = (() => {
    const now = new Date();
    const dayMs = 86400000;
    const inLast = (d: string, days: number, offset = 0) => {
      const t = new Date(d).getTime();
      return t > now.getTime() - (days + offset) * dayMs && t <= now.getTime() - offset * dayMs;
    };
    const thisWeek = store.hist.filter(h => inLast(h.date, 7));
    const lastWeek = store.hist.filter(h => inLast(h.date, 7, 7));
    const delta = thisWeek.length - lastWeek.length;
    const days = new Array(7).fill(0).map((_, i) => {
      const d = new Date(now.getTime() - (6 - i) * dayMs).toDateString();
      return store.hist.find(h => h.date === d)?.count || 0;
    });
    return { count: thisWeek.length, delta, days };
  })();

  // ═══ Streak insurance ═══
  const monthKey = `${new Date().getFullYear()}-${new Date().getMonth()}`;
  const repairAvailable = store.lastRepairMonth !== monthKey;
  const yesterdayStr = (() => { const y = new Date(); y.setDate(y.getDate() - 1); return y.toDateString(); })();
  const streakAtRisk = store.lastDay !== null && store.lastDay !== new Date().toDateString() && store.lastDay !== yesterdayStr;

  const doRepair = () => {
    if (store.repairStreak()) notify('🛡 Streak shielded — yesterday is covered. Practice today to continue.');
    else notify('Streak insurance already used this month.');
  };

  // ═══ Daily reminder ═══
  const toggleReminder = async () => {
    if (remindOn) {
      localStorage.removeItem('ank_reminder');
      setRemindOn(false);
      notify('Reminder off');
      return;
    }
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') { notify('Notification permission needed'); return; }
    }
    localStorage.setItem('ank_reminder', remindTime);
    setRemindOn(true);
    notify(`🔔 Daily Sadhana reminder set · ${remindTime}`);
  };

  // ═══ Shareable milestone card (canvas → PNG) ═══
  const shareMilestone = (m: typeof MILESTONES[number]) => {
    const c = document.createElement('canvas');
    c.width = 600; c.height = 750;
    const x = c.getContext('2d');
    if (!x) return;
    const bg = x.createRadialGradient(300, 240, 40, 300, 375, 560);
    bg.addColorStop(0, '#2a245a'); bg.addColorStop(.55, '#100c22'); bg.addColorStop(1, '#0a0712');
    x.fillStyle = bg; x.fillRect(0, 0, 600, 750);
    x.strokeStyle = 'rgba(232,176,80,.45)'; x.lineWidth = 2;
    x.strokeRect(24, 24, 552, 702);
    x.strokeStyle = 'rgba(232,176,80,.18)';
    x.strokeRect(34, 34, 532, 682);
    x.textAlign = 'center';
    x.font = '90px serif'; x.fillText(m.art, 300, 250);
    x.fillStyle = '#fae098'; x.font = '600 44px Georgia, serif';
    x.fillText(m.t, 300, 340);
    x.fillStyle = '#b4a484'; x.font = '13px monospace';
    x.fillText('A C H I E V E D', 300, 380);
    x.fillStyle = '#e6d8bc'; x.font = 'italic 19px Georgia, serif';
    const words = m.msg.split(' ');
    let line = '', yy = 430;
    for (const w of words) {
      if (x.measureText(line + w).width > 460) { x.fillText(line.trim(), 300, yy); line = ''; yy += 30; if (yy > 580) break; }
      line += w + ' ';
    }
    if (line && yy <= 580) x.fillText(line.trim(), 300, yy);
    x.fillStyle = '#e8b050'; x.font = '26px serif';
    x.fillText('अन्तःकरण', 300, 660);
    x.fillStyle = '#847a6a'; x.font = '12px monospace';
    x.fillText('ANTAHKARANA · THE CURE TO BRAIN ROT', 300, 690);
    const a = document.createElement('a');
    a.download = `antahkarana-${m.id}.png`;
    a.href = c.toDataURL('image/png');
    a.click();
    notify('✦ Milestone card saved — share it anywhere');
  };

  const checkMS = (req: string, need: number) => {
    const v: Record<string, number> = { totalTasks: store.totalTasks, streak: store.streak, readMins: store.readMins, medMins: store.medMins, pranaMins: store.pranaMins, totalMins: store.totalMins };
    return (v[req] || 0) >= need;
  };

  return (
    <div className="screen on" id="spf">
      <TopBar />
      <div className="spf-content">
        <div style={{ marginBottom: '12px', padding: '0 10px' }}>
          <button onClick={() => router.push('/dashboard')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--gold2)', fontSize: '15px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px 4px 0', fontFamily: 'var(--sans)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Dashboard
          </button>
        </div>
        <div className="prof-hero">
          <div className="avatar">🧘</div>
          <div style={{ flex: 1 }}>
            {isEditingName ? (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={20}
                  autoFocus
                  onBlur={saveName}
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--gold2)', 
                    color: 'var(--gold2)', borderRadius: '6px', padding: '4px 8px', 
                    fontSize: '18px', fontFamily: 'var(--serif)', width: '140px', outline: 'none'
                  }}
                />
              </div>
            ) : (
              <div className="prof-name">{store.userName || 'Seeker'}</div>
            )}
            <div className="prof-tier" onClick={() => setShowTiers(true)} style={{cursor:'pointer'}}>◈ {tier.title} · Tier {tierIdx + 1} <span style={{fontSize:'9px', opacity:.5}}>▼</span></div>
            <div className="prof-streak">🔥 <span>{store.streak}</span> day streak</div>
          </div>
        </div>

        <div className="score-ring-wrap">
          <div className="card pad" onClick={() => setShowTiers(true)} style={{cursor:'pointer', transition:'.2s', border:'1px solid rgba(255,255,255,.05)'}}>
            <div className="sr-inner">
              <div className="ring-svg">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="34" fill="none" stroke="url(#sg2)" strokeWidth="7" strokeLinecap="round" strokeDasharray="214" strokeDashoffset={214 - (214 * tierPct / 100)}/>
                  <defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c45a0a"/><stop offset="100%" stopColor="#e8b84b"/></linearGradient></defs>
                </svg>
                <div className="ring-center"><div className="ring-n">{xp}</div><div className="ring-l">XP</div></div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'13px', color:'var(--t2)', marginBottom:'4px'}}>Sadhana Journey</div>
                <div style={{fontSize:'11px', color:'var(--t3)', fontFamily:'var(--mono)', marginBottom:'6px'}}>{tier.title} → {nextTier ? nextTier.title : '∞'}{nextTier ? ` (${nextTier.min - xp} XP to go)` : ''}</div>
                <div className="pbar" style={{marginBottom:'5px'}}><div className="pfill pfill-g" style={{width:`${tierPct}%`}}></div></div>
                <div style={{fontSize:'11px', color:'var(--t3)', fontFamily:'var(--mono)'}}>{ tier.desc }</div>
              </div>
            </div>
            
            <div style={{marginTop: '16px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(212,170,80,.06)', border: '1px solid rgba(212,170,80,.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{fontSize: '14px'}}>📜</span>
                <span style={{fontSize: '12px', color: 'var(--gold2)', fontFamily: 'var(--sans)', fontWeight: 500}}>View Tier Progression Guide</span>
              </div>
              <span style={{fontSize: '12px', color: 'var(--gold2)'}}>→</span>
            </div>
          </div>
        </div>

        {/* ═══ TIER PROGRESSION MODAL ═══ */}
        {showTiers && (
          <div style={{position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,.85)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}} onClick={() => setShowTiers(false)}>
            <div style={{width:'100%', maxWidth:'400px', maxHeight:'85vh', overflowY:'auto', borderRadius:'24px', background:'linear-gradient(160deg,#1a140a,#0e0c08,#0a0804)', border:'1px solid rgba(212,170,80,.25)', boxShadow:'0 16px 64px rgba(0,0,0,.6)', padding:'28px 20px'}} onClick={e => e.stopPropagation()}>
              <div style={{textAlign:'center', marginBottom:'20px'}}>
                <div style={{fontSize:'11px', fontFamily:'var(--mono)', letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(212,170,80,.7)', marginBottom:'6px'}}>Sadhana Journey</div>
                <div style={{fontSize:'20px', fontFamily:'var(--serif)', color:'var(--gold2)'}}>Tier Progression</div>
                <div style={{fontSize:'11px', color:'var(--t3)', marginTop:'4px'}}>XP = Practice Days + Hours + Streak Weeks</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                {TIERS.map((t, i) => {
                  const isActive = i === tierIdx;
                  const isLocked = i > tierIdx;
                  const nextT = TIERS[i + 1];
                  return (
                    <div key={i} style={{
                      padding:'14px 16px', borderRadius:'16px', position:'relative', transition:'.2s',
                      background: isActive ? 'rgba(212,170,80,.1)' : 'rgba(255,255,255,.02)',
                      border: isActive ? '1px solid rgba(212,170,80,.4)' : '1px solid rgba(255,255,255,.05)',
                      opacity: isLocked ? 0.65 : 1,
                    }}>
                      <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px'}}>
                        <div style={{width:'28px', height:'28px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:600, fontFamily:'var(--mono)', flexShrink:0, background: isActive ? 'rgba(212,170,80,.2)' : 'rgba(255,255,255,.04)', color: isActive ? 'var(--gold2)' : 'var(--t3)', border: isActive ? '1px solid rgba(212,170,80,.4)' : '1px solid rgba(255,255,255,.06)'}}>{i + 1}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:'14px', fontWeight:500, color: isActive ? 'var(--gold2)' : isLocked ? 'var(--t3)' : 'var(--t1)'}}>{t.title}{isActive ? ' ← You are here' : ''}</div>
                        </div>
                        <div style={{fontSize:'10px', fontFamily:'var(--mono)', color:'var(--t4)'}}>{t.min} XP</div>
                      </div>
                      <div style={{fontSize:'11px', color:'var(--t3)', lineHeight:1.5, paddingLeft:'38px'}}>{t.desc}</div>
                      <div style={{fontSize:'9px', color: isActive ? 'var(--gold2)' : 'rgba(212,170,80,.6)', fontFamily:'var(--mono)', marginTop:'6px', paddingLeft:'38px'}}>
                        <span style={{opacity:0.8}}>Requires:</span> {t.req}
                      </div>
                      {isActive && nextT && (
                        <div style={{marginTop:'8px', paddingLeft:'38px'}}>
                          <div className="pbar" style={{height:'4px'}}><div className="pfill pfill-g" style={{width:`${tierPct}%`}}></div></div>
                          <div style={{fontSize:'9px', fontFamily:'var(--mono)', color:'var(--t4)', marginTop:'4px'}}>{xp} / {nextT.min} XP · {tierPct}%</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setShowTiers(false)} style={{display:'block', width:'100%', marginTop:'20px', padding:'12px', borderRadius:'14px', background:'rgba(212,170,80,.08)', border:'1px solid rgba(212,170,80,.25)', color:'var(--gold2)', fontSize:'12px', fontFamily:'var(--mono)', letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer'}}>Close</button>
            </div>
          </div>
        )}


        <div className="lbl" style={{padding:'0 14px', marginBottom:'8px'}}>Restoration Progress</div>
        <div className="prog-items">
          {[
            {n:'Meditation', val:store.medMins||0, max:300, unit:'mins', cls:'pfill-v'},
            {n:'Deep Reading', val:Math.floor((store.readMins||0) / 60), max:50, unit:'hours', cls:'pfill-s'},
            {n:'Pranayama', val:store.pranaMins||0, max:200, unit:'mins', cls:'pfill-g'},
            {n:'Total Sadhana', val:store.totalTasks||0, max:100, unit:'sessions', cls:'pfill-g'},
            {n:'Day Streak', val:store.streak||0, max:30, unit:'days', cls:'pfill-g'},
          ].map((p, i) => (
            <div key={i} className="pi"><div className="pi-h"><div className="pi-n">{p.n}</div><div className="pi-v">{p.val} / {p.max} {p.unit}</div></div><div className="pbar"><div className={`pfill ${p.cls}`} style={{width:`${Math.min(100,Math.round(p.val/p.max*100))}%`}}></div></div></div>
          ))}
        </div>

        {/* ═══ WEEKLY REPORT ═══ */}
        <div className="lbl" style={{padding:'0 14px', marginBottom:'8px'}}>This Week in Review</div>
        <div style={{margin:'0 14px 16px', padding:'16px', background:'rgba(255,255,255,.02)', border:'1px solid var(--bdr)', borderRadius:'16px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'10px'}}>
            <div style={{fontFamily:'var(--serif)', fontSize:'16px', color:'var(--gold3)'}}>{weekReport.count} practice day{weekReport.count !== 1 ? 's' : ''}</div>
            <div style={{fontFamily:'var(--mono)', fontSize:'11px', color: weekReport.delta >= 0 ? 'var(--jade)' : 'var(--sindoor2)'}}>
              {weekReport.delta >= 0 ? `+${weekReport.delta}` : weekReport.delta} vs last week
            </div>
          </div>
          <div style={{display:'flex', gap:'5px', marginBottom:'10px'}}>
            {weekReport.days.map((c, i) => (
              <div key={i} style={{flex:1, height:'26px', borderRadius:'6px',
                background: c >= 3 ? 'var(--gold)' : c > 0 ? 'var(--amber)' : 'var(--dusk)',
                opacity: c > 0 ? 1 : .6}}/>
            ))}
          </div>
          <div style={{fontSize:'12px', fontStyle:'italic', color:'var(--t2)', lineHeight:1.55, paddingLeft:'10px', borderLeft:'2px solid var(--gold)'}}>
            {weekReport.count === 0 ? 'A quiet week. One 5-minute practice restarts everything.'
              : weekReport.count >= 6 ? 'Near-perfect week. The circuits are rebuilding daily.'
              : weekReport.delta > 0 ? 'Momentum is up. Your best focus follows consecutive days.'
              : 'Steady. Consistency beats intensity — protect tomorrow morning.'}
          </div>
        </div>

        {/* ═══ STREAK INSURANCE ═══ */}
        <div style={{margin:'0 14px 16px', padding:'14px 16px', borderRadius:'14px',
          background: streakAtRisk && repairAvailable ? 'rgba(232,76,34,.07)' : 'rgba(255,255,255,.02)',
          border: `1px solid ${streakAtRisk && repairAvailable ? 'rgba(232,76,34,.3)' : 'var(--bdr)'}`,
          display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{fontSize:'20px'}}>🛡</div>
          <div style={{flex:1}}>
            <div style={{fontSize:'13px', color:'var(--t1)', fontWeight:500}}>Streak Insurance</div>
            <div style={{fontSize:'11px', color:'var(--t3)', lineHeight:1.45}}>
              {repairAvailable
                ? streakAtRisk
                  ? 'You missed a day — one free repair is available this month.'
                  : 'One free missed-day repair per month. Unused.'
                : 'Used this month — renews on the 1st.'}
            </div>
          </div>
          {repairAvailable && streakAtRisk && (
            <button className="btn btn-o btn-sm" onClick={doRepair}>Repair</button>
          )}
        </div>

        {/* ═══ MIND LAB — baseline attention test ═══ */}
        <div className="lbl" style={{padding:'0 14px', marginBottom:'8px'}}>Mind Lab · Monthly Baseline</div>
        <div style={{margin:'0 14px 16px', padding:'16px', background:'linear-gradient(145deg, rgba(112,96,192,.08), rgba(12,10,28,.95))', border:'1px solid rgba(124,108,216,.25)', borderRadius:'16px'}}>
          {store.attentionTests.length === 0 ? (
            <>
              <div style={{fontFamily:'var(--serif)', fontSize:'15px', color:'var(--t1)', marginBottom:'4px'}}>Measure your baseline</div>
              <div style={{fontSize:'11.5px', color:'var(--t3)', lineHeight:1.55, marginBottom:'12px'}}>
                A 30-second pattern-recall test. Repeat monthly to watch your own attention measurably recover — proof, not just streaks.
              </div>
            </>
          ) : (
            <>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--t3)'}}>Sustained attention</span>
                <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--violet3)'}}>
                  {latestTest.attention}/100{firstTest !== latestTest && ` (${latestTest.attention - firstTest.attention >= 0 ? '+' : ''}${latestTest.attention - firstTest.attention} since first)`}
                </span>
              </div>
              <div className="pbar" style={{marginBottom:'10px'}}><div className="pfill pfill-v" style={{width:`${latestTest.attention}%`}}/></div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--t3)'}}>Working memory</span>
                <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--violet3)'}}>
                  {latestTest.memory}/100{firstTest !== latestTest && ` (${latestTest.memory - firstTest.memory >= 0 ? '+' : ''}${latestTest.memory - firstTest.memory} since first)`}
                </span>
              </div>
              <div className="pbar" style={{marginBottom:'12px'}}><div className="pfill pfill-v" style={{width:`${latestTest.memory}%`}}/></div>
              <div style={{fontFamily:'var(--mono)', fontSize:'9.5px', color:'var(--t4)', marginBottom:'10px'}}>
                {store.attentionTests.length} test{store.attentionTests.length > 1 ? 's' : ''} · last {daysSinceTest === 0 ? 'today' : `${daysSinceTest}d ago`}
                {daysSinceTest >= 28 && ' · re-test due'}
              </div>
            </>
          )}
          <button className="btn btn-o btn-sm" onClick={() => { setTestOpen(true); setTestPhase('idle'); }}>
            {store.attentionTests.length === 0 ? '▶ Take baseline test' : daysSinceTest >= 28 ? '▶ Monthly re-test' : '↻ Re-test'}
          </button>
        </div>

        <div className="lbl" style={{padding:'0 14px', marginBottom:'10px'}}>Practice Calendar</div>
        <div className="cal-wrap">
          <div className="cal-hd">
            <div className="cal-mo">{['January','February','March','April','May','June','July','August','September','October','November','December'][calDate.getMonth()]} {calDate.getFullYear()}</div>
            <div className="cal-nv">
              <button className="cal-nb" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}>‹</button>
              <button className="cal-nb" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}>›</button>
            </div>
          </div>
          <div className="cal-g">
            {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="cal-dl">{d}</div>)}
          </div>
          <div className="cal-g" style={{gap:'3px', marginTop:'2px'}}>
            {(() => {
              const first = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
              const dim = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
              const today2 = new Date();
              const isCur = today2.getFullYear() === calDate.getFullYear() && today2.getMonth() === calDate.getMonth();
              const cells = [];
              for(let i=0; i<first; i++) cells.push(<div key={`e${i}`} className="cal-d emp"></div>);
              for(let d=1; d<=dim; d++) {
                const date2 = new Date(calDate.getFullYear(), calDate.getMonth(), d);
                const dayKey = date2.toDateString();
                const h = store.hist.find((x: { date: string; count: number }) => x.date === dayKey);
                const isToday2 = isCur && d === today2.getDate();
                const isFut = date2 > today2;
                const cls = isToday2 ? 'today' : isFut ? 'fut' : h && h.count >= 3 ? 'done' : h && h.count > 0 ? 'part' : '';
                cells.push(<div key={`d${d}`} className={`cal-d ${cls}`}>{d}</div>);
              }
              return cells;
            })()}
          </div>
        </div>

        <div className="lbl" style={{padding:'0 14px', marginBottom:'10px'}}>Saved Wisdom</div>
        <div style={{padding:'0 14px', marginBottom:'16px'}}>
          {store.favs.length === 0 ? (
            <div style={{background:'rgba(255,255,255,.03)', border:'1px solid var(--bdr)', borderRadius:'14px', padding:'20px', textAlign:'center'}}>
              <div style={{fontSize:'24px', marginBottom:'6px'}}>♡</div>
              <div style={{fontSize:'13px', color:'var(--t3)'}}>No saved wisdom yet</div>
              <div style={{fontSize:'11px', color:'var(--t4)', marginTop:'4px'}}>Tap ♡ Save on any wisdom card to collect it here</div>
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {store.favs.map(favId => {
                const w = ALL_SAVEABLE.find(x => x.id === favId);
                if (!w) return null;
                return (
                  <div key={favId} style={{background:'rgba(200,144,42,.05)', border:'1px solid var(--bdr2)', borderRadius:'14px', padding:'14px', position:'relative'}}>
                    <div style={{fontFamily:'var(--deva)', fontSize:'15px', color:'var(--gold3)', marginBottom:'4px'}}>{w.sk}</div>
                    <div style={{fontFamily:'var(--serif)', fontSize:'14px', fontStyle:'italic', color:'var(--t1)', lineHeight:1.5, marginBottom:'4px'}}>{w.e}</div>
                    <div style={{fontSize:'10px', color:'var(--t4)'}}>{w.src}</div>
                    <button onClick={() => { store.toggleFav(favId); notify('♡ Removed from saved'); }} style={{position:'absolute', top:'12px', right:'12px', background:'none', border:'none', color:'var(--gold2)', fontSize:'14px', cursor:'pointer', padding:'4px'}}>♥</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lbl" style={{padding:'0 14px', marginBottom:'10px'}}>Milestones & Achievements</div>
        <div className="ms-grid">
          {MILESTONES.map((m, i) => {
            const unlocked = checkMS(m.req, m.need);
            const v: Record<string, number> = { totalTasks: store.totalTasks, streak: store.streak, readMins: store.readMins, medMins: store.medMins, pranaMins: store.pranaMins, totalMins: store.totalMins };
            const cur = v[m.req] || 0;
            const pct = Math.min(100, Math.round(cur / m.need * 100));
            return (
              <div key={i} className={`ms ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className="ms-art"><span style={{fontSize:'22px'}}>{m.art}</span></div>
                <div className="ms-info">
                  <div className="ms-t">{m.icon} {m.t}</div>
                  <div className="ms-m">{unlocked ? m.msg : `${cur} / ${m.need}`}</div>
                  {!unlocked ? <div style={{marginTop:'7px'}}><div className="pbar" style={{height:'4px'}}><div className="pfill pfill-g" style={{width:`${pct}%`}}></div></div></div> : (
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <div className="ms-badge">✦ Achieved</div>
                      <button onClick={() => shareMilestone(m)} style={{background:'none', border:'1px solid var(--bdr2)', borderRadius:'12px', color:'var(--gold2)', fontSize:'10px', fontFamily:'var(--mono)', padding:'3px 10px', cursor:'pointer'}}>↗ Share card</button>
                    </div>
                  )}
                </div>
                {!unlocked && <div className="ms-lock">🔒</div>}
              </div>
            );
          })}
        </div>

        {/* ═══ EXPERIENCE SETTINGS ═══ */}
        <div className="lbl" style={{padding:'0 14px', marginBottom:'8px'}}>Experience</div>
        <div style={{margin:'0 14px 16px', display:'flex', flexDirection:'column', gap:'8px'}}>

          {/* Science / Sadhana mode */}
          <div style={{padding:'12px 14px', borderRadius:'14px', background:'rgba(255,255,255,.02)', border:'1px solid var(--bdr)', display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px', color:'var(--t1)', fontWeight:500}}>Interface framing</div>
              <div style={{fontSize:'10.5px', color:'var(--t3)'}}>Same practices — choose the language that speaks to you</div>
            </div>
            <div style={{display:'flex', border:'1px solid var(--bdr2)', borderRadius:'18px', overflow:'hidden'}}>
              {(['science', 'sadhana'] as const).map(m => (
                <button key={m} onClick={() => { store.setAppMode(m); notify(m === 'science' ? '🔬 Science mode' : '🪔 Sadhana mode'); }} style={{
                  fontFamily:'var(--mono)', fontSize:'9.5px', letterSpacing:'1px', textTransform:'uppercase',
                  padding:'7px 12px', border:'none', cursor:'pointer',
                  background: store.appMode === m ? 'rgba(232,176,80,.2)' : 'transparent',
                  color: store.appMode === m ? 'var(--gold2)' : 'var(--t4)',
                }}>{m}</button>
              ))}
            </div>
          </div>

          {/* Daily reminder */}
          <div style={{padding:'12px 14px', borderRadius:'14px', background:'rgba(255,255,255,.02)', border:'1px solid var(--bdr)', display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{fontSize:'17px'}}>🔔</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px', color:'var(--t1)', fontWeight:500}}>Daily Sadhana reminder</div>
              <div style={{fontSize:'10.5px', color:'var(--t3)'}}>{remindOn ? `One gentle nudge at ${remindTime}` : 'One notification per day, at your hour'}</div>
            </div>
            {!remindOn && (
              <input type="time" value={remindTime} onChange={e => setRemindTime(e.target.value)} style={{
                background:'rgba(255,255,255,.05)', border:'1px solid var(--bdr)', borderRadius:'8px',
                color:'var(--gold2)', padding:'4px 6px', fontFamily:'var(--mono)', fontSize:'11px', colorScheme:'dark'
              }}/>
            )}
            <button onClick={toggleReminder} style={{
              width:'40px', height:'22px', borderRadius:'11px', border:'1px solid var(--bdr2)', cursor:'pointer',
              background: remindOn ? 'rgba(232,176,80,.35)' : 'rgba(255,255,255,.05)', position:'relative', transition:'all .2s'
            }}>
              <div style={{position:'absolute', top:'2px', left: remindOn ? '20px' : '2px', width:'16px', height:'16px', borderRadius:'50%', background: remindOn ? 'var(--gold2)' : 'var(--t4)', transition:'all .2s'}}/>
            </button>
          </div>

          {/* Replay intro */}
          <button onClick={() => router.push('/onboarding?replay=1')} style={{
            padding:'12px 14px', borderRadius:'14px', background:'rgba(255,255,255,.02)', border:'1px solid var(--bdr)',
            display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', textAlign:'left', width:'100%'
          }}>
            <div style={{fontSize:'17px'}}>🪔</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px', color:'var(--t1)', fontWeight:500, fontFamily:'var(--sans)'}}>How this works</div>
              <div style={{fontSize:'10.5px', color:'var(--t3)', fontFamily:'var(--sans)'}}>Replay the intro — the cause, the cure, the proof</div>
            </div>
            <span style={{color:'var(--gold2)', fontSize:'13px'}}>→</span>
          </button>
        </div>

        <div className="prof-acts">
          <button className="btn btn-o" style={{width:'100%', marginBottom:'8px'}} onClick={() => { setTempName(store.userName || 'Seeker'); setIsEditingName(true); }}>✏️ Edit Profile</button>
          {user === null ? (
            <div style={{background:'rgba(200,144,42,.06)', border:'1px solid var(--bdr)', borderRadius:'14px', padding:'16px', textAlign:'center'}}>
              <div style={{fontSize:'13px', color:'var(--gold2)', marginBottom:'6px', fontFamily:'var(--serif)'}}>Guest Session</div>
              <div style={{fontSize:'12px', color:'var(--t2)', marginBottom:'12px', lineHeight:1.5}}>Create an account to back up your progress and streaks.</div>
              <button className="btn btn-g" style={{width:'100%'}} onClick={() => { document.cookie = "guest_mode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; router.push('/'); }}>Sign Up / Log In</button>
            </div>
          ) : (
            <button className="btn btn-d" style={{width:'100%'}} onClick={doSignOut}>Sign Out</button>
          )}
        </div>
      </div>
      {/* ═══ ATTENTION TEST MODAL ═══ */}
      {testOpen && (
        <div style={{position:'fixed', inset:0, zIndex:999, background:'rgba(0,0,0,.88)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}
          onClick={() => { if (testPhase !== 'memorise') setTestOpen(false); }}>
          <div style={{width:'100%', maxWidth:'360px', borderRadius:'24px', background:'linear-gradient(160deg,#16132e,#0a0712)', border:'1px solid rgba(124,108,216,.35)', padding:'26px 22px', textAlign:'center'}} onClick={e => e.stopPropagation()}>
            <div style={{fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'2.5px', textTransform:'uppercase', color:'var(--violet3)', marginBottom:'4px'}}>Mind Lab</div>
            <div style={{fontFamily:'var(--serif)', fontSize:'20px', color:'var(--t1)', marginBottom:'10px'}}>Pattern Recall</div>

            {testPhase === 'idle' && (
              <>
                <p style={{fontSize:'12.5px', color:'var(--t3)', lineHeight:1.6, marginBottom:'16px'}}>
                  Five tiles will glow gold for two seconds.<br/>Memorise them, then tap them back.
                </p>
                <button className="btn btn-g" onClick={startTest}>▶ Begin</button>
              </>
            )}

            {(testPhase === 'memorise' || testPhase === 'recall') && (
              <>
                <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px', margin:'6px 0 14px'}}>
                  {Array.from({length:16}).map((_, i) => {
                    const lit = (testPhase === 'memorise' && pattern.includes(i)) || (testPhase === 'recall' && picked.includes(i));
                    return (
                      <div key={i} onClick={() => pickCell(i)} style={{
                        aspectRatio:'1', borderRadius:'10px', cursor: testPhase === 'recall' ? 'pointer' : 'default',
                        background: lit ? 'var(--gold)' : 'var(--dusk)', transition:'background .15s',
                        boxShadow: lit ? '0 0 14px rgba(232,176,80,.4)' : 'none',
                      }}/>
                    );
                  })}
                </div>
                <div style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--t3)'}}>
                  {testPhase === 'memorise' ? 'Memorise…' : `Tap the 5 tiles you saw · ${picked.length}/5`}
                </div>
              </>
            )}

            {testPhase === 'done' && lastResult && (
              <>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                  <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--t3)'}}>Sustained attention</span>
                  <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--jade)'}}>{lastResult.attention}/100</span>
                </div>
                <div className="pbar" style={{marginBottom:'10px'}}><div className="pfill pfill-v" style={{width:`${lastResult.attention}%`}}/></div>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                  <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--t3)'}}>Working memory</span>
                  <span style={{fontFamily:'var(--mono)', fontSize:'11px', color:'var(--jade)'}}>{lastResult.memory}/100</span>
                </div>
                <div className="pbar" style={{marginBottom:'14px'}}><div className="pfill pfill-v" style={{width:`${lastResult.memory}%`}}/></div>
                <p style={{fontSize:'11.5px', color:'var(--t3)', lineHeight:1.55, marginBottom:'14px'}}>
                  Logged. Re-test monthly — 8–12 weeks of practice produces measurable recovery.
                </p>
                <div style={{display:'flex', gap:'8px', justifyContent:'center'}}>
                  <button className="btn btn-o btn-sm" onClick={startTest}>↻ Once more</button>
                  <button className="btn btn-g btn-sm" onClick={() => setTestOpen(false)}>Done</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
