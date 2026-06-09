'use client';
import { useStore } from '@/store/useStore';
import { HABITS, WISDOMS, TRADEOFFS } from '@/data/content';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import './dashboard.css';

export default function Dashboard() {
  const store = useStore();
  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  
  const router = useRouter();
  
  useEffect(() => {
    // First-run: redirect to onboarding if not completed yet
    if (typeof window !== 'undefined' && localStorage.getItem('ank_onboarded') !== 'true') {
      router.replace('/onboarding');
      return;
    }
    if (typeof document !== 'undefined' && document.cookie.includes('guest_mode=true')) {
      if (localStorage.getItem('ank_guest_warn_dismissed') !== 'true') {
        setTimeout(() => setIsGuest(true), 0);
      }
    }
  }, [router]);
  
  const dismissGuest = () => {
    localStorage.setItem('ank_guest_warn_dismissed', 'true');
    setIsGuest(false);
  };
  
  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  // Day count = unique days the user has practiced (from hist)
  // Wisdom cycles through the 14 wisdoms based on the user's practice day count
  const userDay = store.hist.length || 1;
  const todayIdx = (userDay - 1) % WISDOMS.length;
  const todayW = WISDOMS[todayIdx];
  const isWDayFav = store.favs.includes(todayW.id);

  // Profile Calculation
  const calcScore = () => {
    const r = TRADEOFFS.reduce((a, t, i) => a + Math.min(store.restored[i] || 0, t.pct), 0);
    const mx = TRADEOFFS.reduce((a, t) => a + t.pct, 0);
    return Math.min(100, Math.round(store.streak * 2 + (r / mx) * 40 + Math.min(store.totalTasks, 60) * 0.6));
  };
  const sc = calcScore();

  return (
    <div className="screen on" id="ss">
      <div className="ss-bg"><div className="ss-bg-b1"></div><div className="ss-bg-b2"></div></div>
      <TopBar />
      <div className="ss-content">

        {/* ══ CORE DAILY LOOP HERO ══ */}
        <div style={{
          margin: '6px 20px 0', padding: '18px',
          background: 'linear-gradient(145deg, rgba(20,16,44,.96), rgba(10,8,24,.98))',
          border: '1px solid rgba(200,144,42,.22)', borderRadius: '20px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold2), transparent)' }}/>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,144,42,.07), transparent 70%)', pointerEvents: 'none' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--gold3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>आज का साधन</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 300, color: 'var(--t1)', lineHeight: 1.1 }}>Today&apos;s Sadhana</div>
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, color: store.done.length === HABITS.length ? 'var(--jade)' : 'var(--gold2)', lineHeight: 1 }}>
              {store.done.length}<span style={{ fontSize: '13px', color: 'var(--t4)', marginLeft: '2px' }}>/{HABITS.length}</span>
            </div>
          </div>

          <div style={{ height: '4px', background: 'rgba(255,255,255,.06)', borderRadius: '2px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              width: `${Math.round((store.done.length / HABITS.length) * 100)}%`,
              background: store.done.length === HABITS.length ? 'linear-gradient(90deg, var(--jade), #6ee7b7)' : 'linear-gradient(90deg, #b87428, var(--gold2))',
              transition: 'width .6s cubic-bezier(.4,0,.2,1)',
            }}/>
          </div>

          {HABITS.slice(0, 3).map((h, i) => {
            const isDone = store.done.includes(h.id);
            const ICONS = ['🧘', '📖', '🌬️'];
            const COLS  = ['#a78bfa', '#34d399', '#60a5fa'];
            return (
              <div key={h.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px', borderRadius: '12px', marginBottom: i < 2 ? '6px' : '0',
                background: isDone ? 'rgba(52,211,153,.06)' : 'rgba(255,255,255,.03)',
                border: `1px solid ${isDone ? 'rgba(52,211,153,.2)' : 'rgba(255,255,255,.06)'}`,
                transition: 'all .3s',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: isDone ? 'rgba(52,211,153,.1)' : `${COLS[i]}18`,
                  border: `1px solid ${isDone ? 'rgba(52,211,153,.3)' : `${COLS[i]}40`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px'
                }}>{isDone ? '✓' : ICONS[i]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: isDone ? 'var(--jade)' : 'var(--t1)', fontWeight: 500, marginBottom: '1px' }}>{h.n}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--t4)', letterSpacing: '.5px' }}>{h.dur} · {isDone ? 'Complete' : `${h.boost} restore`}</div>
                </div>
                {isDone && <div style={{ color: 'var(--jade)', fontSize: '13px' }}>✓</div>}
              </div>
            );
          })}

          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--t4)', marginTop: '12px', textAlign: 'center', letterSpacing: '.5px' }}>
            {store.done.length === 0 && 'Begin your first practice. That\'s the only goal today.'}
            {store.done.length > 0 && store.done.length < HABITS.length && `${HABITS.length - store.done.length} remaining · Keep going.`}
            {store.done.length === HABITS.length && '🪔 Full Sadhana complete. Return tomorrow.'}
          </div>
        </div>

        {isGuest && (
          <div style={{ margin: '14px 20px 0', background: 'rgba(232, 184, 75, 0.1)', border: '1px solid rgba(232, 184, 75, 0.3)', borderRadius: '12px', padding: '16px', position: 'relative' }}>
            <button onClick={dismissGuest} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--t2)', fontSize: '20px', cursor: 'pointer', padding: '4px', lineHeight: 1 }}>&times;</button>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--gold2)', marginBottom: '4px' }}>Temporary Sanctuary</div>
            <div style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '12px', paddingRight: '20px' }}>Your progress is only saved on this device. Create an account to permanently sync your journey.</div>
            <Link href="/" className="btn btn-sm btn-o" style={{ display: 'inline-block', textDecoration: 'none', background: 'rgba(232, 184, 75, 0.15)', color: 'var(--gold1)', border: 'none' }}>Save Progress →</Link>
          </div>
        )}

        <div className="wh" style={{position:'relative', marginTop: '14px'}}>
          <div className="wh-inner">
            <div className="wday">Day {userDay} · Daily Wisdom</div>
            <div className="w-sk deva">{todayW.s}</div>
            <div className="w-q">&ldquo;{todayW.e}&rdquo;</div>
            <div className="w-src">{todayW.src}</div>
            <div className="w-acts">
              <button className={`fav-b ${isWDayFav ? 'on' : ''}`} onClick={() => { store.toggleFav(todayW.id); notify(isWDayFav ? '♡ Removed from saved' : '♡ Wisdom saved!'); }}>
                ♡ <span>{isWDayFav ? 'Saved ♡' : 'Save'}</span>
              </button>
              <div style={{flex:1}}></div>
              <Link href="/wisdom" className="btn btn-o btn-sm" style={{textDecoration:'none'}}>All Wisdom →</Link>
            </div>
            <svg className="wm rs" width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="#c8902a" strokeWidth=".6" opacity=".5"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(45 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(90 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(135 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(180 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(225 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(270 50 50)"/><ellipse cx="50" cy="10" rx="4" ry="10" fill="#c8902a" transform="rotate(315 50 50)"/></svg>
          </div>
        </div>

        <div className="stats-r">
          {/* Ember Mode Streak */}
          <div className="stat-b" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(232, 100, 30, 0.2)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 120%, rgba(232, 100, 30, 0.3), transparent 70%)', pointerEvents: 'none' }}></div>
            <div className="stat-n" style={{ position: 'relative', zIndex: 1, color: '#ffb050', textShadow: '0 0 15px rgba(232, 100, 30, 0.6)' }}>{store.streak}</div>
            <div className="stat-l" style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.7)' }}>Svāsa Fire</div>
          </div>
          
          <div className="stat-b"><div className="stat-n">{store.totalTasks}</div><div className="stat-l">Done</div></div>
          <div className="stat-b"><div className="stat-n">{store.totalMins}</div><div className="stat-l">Mins</div></div>
          
          {/* Praana Score */}
          <div className="stat-b" style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(82, 168, 120, 0.2)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 120%, rgba(82, 168, 120, 0.25), transparent 70%)', pointerEvents: 'none' }}></div>
            <div className="stat-n" style={{ position: 'relative', zIndex: 1, color: 'var(--jade)', textShadow: '0 0 15px rgba(82, 168, 120, 0.6)' }}>{sc}</div>
            <div className="stat-l" style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.7)' }}>Praana</div>
          </div>
        </div>

        <div className="s-row"><h3>All Practices</h3><Link href="/practice">See all →</Link></div>
        <div className="hab-grid">
          {HABITS.slice(0, 4).map(h => {
            const isDone = store.done.includes(h.id);
            return (
              <div className={`hc ${isDone ? 'done' : ''}`} key={h.id}>
                <div className="hi" dangerouslySetInnerHTML={{__html: h.icon}}></div>
                <div className="hn">{h.n}</div>
                <div className="hd">{h.dur}</div>
                <div className="hdv">{h.deva}</div>
                <div className="hb">{h.boost} Neural Restore</div>
              </div>
            );
          })}
        </div>

        {/* Feature Cards — Detox & Journal */}
        <div style={{display:'flex', gap:'10px', marginTop:'14px', padding: '0 20px'}}>
          <Link href="/detox" style={{
            flex:1, textDecoration:'none', position:'relative', overflow:'hidden',
            background:'linear-gradient(145deg, rgba(192,64,64,.1), rgba(12,10,28,.95))',
            border:'1px solid rgba(192,64,64,.25)', borderRadius:'18px', padding:'16px',
            display:'flex', flexDirection:'column', gap:'8px',
            transition:'all .3s ease'
          }}>
            {/* Top gradient line */}
            <div style={{position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, var(--sindoor2), transparent)'}} />
            {/* Glow accent */}
            <div style={{position:'absolute', top:'-10px', right:'-10px', width:'60px', height:'60px', borderRadius:'50%', background:'radial-gradient(circle, rgba(192,64,64,.15), transparent 70%)', pointerEvents:'none'}} />
            
            <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(192,64,64,.12)', border:'1px solid rgba(192,64,64,.25)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffb050" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div style={{fontFamily:'var(--serif)', fontSize:'16px', color:'#ffd6c9', fontWeight:500, letterSpacing:'.3px'}}>Algo Detox</div>
            <div style={{fontFamily:'var(--mono)', fontSize:'10px', color:'#ff6b6b', lineHeight:1.5, letterSpacing:'0.5px', textTransform:'uppercase'}}>Brain Rot · ADHD · Algorithm Trap · The Cure</div>
          </Link>

          <Link href="/journal" style={{
            flex:1, textDecoration:'none', position:'relative', overflow:'hidden',
            background:'linear-gradient(145deg, rgba(200,144,42,.08), rgba(12,10,28,.95))',
            border:'1px solid rgba(200,144,42,.25)', borderRadius:'18px', padding:'16px',
            display:'flex', flexDirection:'column', gap:'8px',
            transition:'all .3s ease'
          }}>
            {/* Top gradient line */}
            <div style={{position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, var(--gold2), transparent)'}} />
            {/* Glow accent */}
            <div style={{position:'absolute', top:'-10px', right:'-10px', width:'60px', height:'60px', borderRadius:'50%', background:'radial-gradient(circle, rgba(200,144,42,.12), transparent 70%)', pointerEvents:'none'}} />
            
            <div style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(200,144,42,.1)', border:'1px solid rgba(200,144,42,.22)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a3 3 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /><path d="M15 5l4 4" />
              </svg>
            </div>
            <div style={{fontFamily:'var(--serif)', fontSize:'15px', color:'var(--gold2)', fontWeight:500, letterSpacing:'.3px'}}>Manas Journal</div>
            <div style={{fontSize:'11px', color:'var(--t2)', lineHeight:1.5, fontWeight:400}}>Write to process. Transfer to paper for deep encoding.</div>
          </Link>
        </div>

        <div style={{height: '8px'}}></div>
      </div>
      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
