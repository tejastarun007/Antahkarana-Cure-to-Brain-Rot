'use client';
import { useStore } from '@/store/useStore';
import { HABITS, WISDOMS, TRADEOFFS } from '@/data/content';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';

export default function Dashboard() {
  const store = useStore();
  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);
  
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

  // Time-aware greeting
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    const name = store.userName || 'Seeker';
    if (h < 12) return `Good morning, ${name}`;
    if (h < 17) return `Good afternoon, ${name}`;
    return `Good evening, ${name}`;
  }, [store.userName]);

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
        <div className="ss-header">
          <div className="ss-greet">{greeting}</div>
          <div className="ss-title">Your mind is a<br/><em>sacred space.</em></div>
        </div>
        
        <div className="wh" style={{position:'relative'}}>
          <div className="wh-inner">
            <div className="wday">Day {userDay} · Daily Wisdom</div>
            <div className="w-sk deva">{todayW.s}</div>
            <div className="w-q">"{todayW.e}"</div>
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
          <div className="stat-b"><div className="stat-n">{store.streak}</div><div className="stat-l">Streak</div></div>
          <div className="stat-b"><div className="stat-n">{store.totalTasks}</div><div className="stat-l">Done</div></div>
          <div className="stat-b"><div className="stat-n">{store.totalMins}</div><div className="stat-l">Mins</div></div>
          <div className="stat-b"><div className="stat-n">{sc}</div><div className="stat-l">Buddhi</div></div>
        </div>

        <div className="today-prog">
          <div className="tp-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'7px'}}>
              <div style={{fontSize:'12px', color:'var(--t2)'}}>Today's Progress</div>
              <div className="mono" style={{fontSize:'12px', color:'var(--gold2)'}}>{store.done.length} / {HABITS.length}</div>
            </div>
            <div className="pbar"><div className="pfill pfill-g" style={{width: `${Math.round((store.done.length / HABITS.length) * 100)}%`}}></div></div>
            <div style={{fontSize:'11px', color:'var(--t4)', marginTop:'5px', fontFamily:'var(--mono)'}}>
              {store.done.length === 0 ? 'Begin your first practice today.' : 
               store.done.length === HABITS.length ? 'Full Sadhana achieved. 🪔' : 'Building momentum.'}
            </div>
          </div>
        </div>

        <div className="s-row"><h3>Today's Sadhana</h3><Link href="/practice">See all →</Link></div>
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
        <div style={{height: '8px'}}></div>
      </div>
      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
