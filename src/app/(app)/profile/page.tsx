'use client';
import { useStore } from '@/store/useStore';
import { TRADEOFFS, MILESTONES } from '@/data/content';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Profile() {
  const store = useStore();
  const router = useRouter();
  const [calDate, setCalDate] = useState(new Date());

  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);

  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  const doSignOut = async () => {
    if (confirm('Sign out and clear all local data?')) {
      const supabase = createClient();
      await supabase.auth.signOut();
      localStorage.removeItem('ank_f');
      router.push('/');
      router.refresh();
    }
  };

  // Profile Calculation
  const calcScore = () => {
    const r = TRADEOFFS.reduce((a, t, i) => a + Math.min(store.restored[i] || 0, t.pct), 0);
    const mx = TRADEOFFS.reduce((a, t) => a + t.pct, 0);
    return Math.min(100, Math.round(store.streak * 2 + (r / mx) * 40 + Math.min(store.totalTasks, 60) * 0.6));
  };
  const sc = calcScore();

  const checkMS = (req: string, need: number) => {
    const v: any = { totalTasks: store.totalTasks, streak: store.streak, readMins: store.readMins, medMins: store.medMins, pranaMins: store.pranaMins, totalMins: store.totalMins };
    return (v[req] || 0) >= need;
  };

  return (
    <div className="screen on" id="spf">
      <TopBar />
      <div className="spf-content">
        <div className="prof-hero">
          <div className="avatar">🧘</div>
          <div>
            <div className="prof-name">Seeker</div>
            <div className="prof-tier">◈ {['Tamas','Pramaada','Mumukshu','Jijnasu','Sadhaka'][Math.floor(Math.min(sc,99)/20)]} · Tier {Math.floor(sc/20)+1}</div>
            <div className="prof-streak">🔥 <span>{store.streak}</span> day streak</div>
          </div>
        </div>

        <div className="score-ring-wrap">
          <div className="card pad">
            <div className="sr-inner">
              <div className="ring-svg">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7"/>
                  <circle cx="40" cy="40" r="34" fill="none" stroke="url(#sg2)" strokeWidth="7" strokeLinecap="round" strokeDasharray="214" strokeDashoffset={214 - (214 * sc / 100)}/>
                  <defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#c45a0a"/><stop offset="100%" stopColor="#e8b84b"/></linearGradient></defs>
                </svg>
                <div className="ring-center"><div className="ring-n">{sc}</div><div className="ring-l">BUDDHI</div></div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'13px', color:'var(--t2)', marginBottom:'8px'}}>Neural Restoration Score</div>
                <div className="pbar" style={{marginBottom:'5px'}}><div className="pfill pfill-g" style={{width:`${sc}%`}}></div></div>
                <div style={{fontSize:'11px', color:'var(--t3)', fontFamily:'var(--mono)'}}>{sc < 20 ? 'Begin your practice. The journey of 1000 steps...' : sc < 50 ? 'Progress is measurable. The circuits are rebuilding.' : sc < 80 ? 'The Quiet Inheritor emerges. Keep going.' : 'Rare capacity. Protect it fiercely.'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lbl" style={{padding:'0 14px', marginBottom:'8px'}}>Restoration Progress</div>
        <div className="prog-items">
          {[
            {n:'Meditation', val:store.medMins||0, max:300, unit:'mins', cls:'pfill-v'},
            {n:'Deep Reading', val:store.readMins||0, max:600, unit:'mins', cls:'pfill-s'},
            {n:'Total Sadhana', val:store.totalMins||0, max:1000, unit:'mins', cls:'pfill-g'},
            {n:'Practices Completed', val:store.totalTasks||0, max:100, unit:'sessions', cls:'pfill-g'},
            {n:'Day Streak', val:store.streak||0, max:30, unit:'days', cls:'pfill-g'},
          ].map((p, i) => (
            <div key={i} className="pi"><div className="pi-h"><div className="pi-n">{p.n}</div><div className="pi-v">{p.val} / {p.max} {p.unit}</div></div><div className="pbar"><div className={`pfill ${p.cls}`} style={{width:`${Math.min(100,Math.round(p.val/p.max*100))}%`}}></div></div></div>
          ))}
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
                const key = date2.toDateString();
                const h = store.hist.find((x: any) => x.date === key);
                const isToday2 = isCur && d === today2.getDate();
                const isFut = date2 > today2;
                let cls = isToday2 ? 'today' : isFut ? 'fut' : h && h.count >= 3 ? 'done' : h && h.count > 0 ? 'part' : '';
                cells.push(<div key={`d${d}`} className={`cal-d ${cls}`}>{d}</div>);
              }
              return cells;
            })()}
          </div>
        </div>

        <div className="lbl" style={{padding:'0 14px', marginBottom:'10px'}}>Milestones & Achievements</div>
        <div className="ms-grid">
          {MILESTONES.map((m, i) => {
            const unlocked = checkMS(m.req, m.need);
            const v: any = { totalTasks: store.totalTasks, streak: store.streak, readMins: store.readMins, medMins: store.medMins, pranaMins: store.pranaMins, totalMins: store.totalMins };
            const cur = v[m.req] || 0;
            const pct = Math.min(100, Math.round(cur / m.need * 100));
            return (
              <div key={i} className={`ms ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className="ms-art"><span style={{fontSize:'22px'}}>{m.art}</span></div>
                <div className="ms-info">
                  <div className="ms-t">{m.icon} {m.t}</div>
                  <div className="ms-m">{unlocked ? m.msg : `${cur} / ${m.need}`}</div>
                  {!unlocked ? <div style={{marginTop:'7px'}}><div className="pbar" style={{height:'4px'}}><div className="pfill pfill-g" style={{width:`${pct}%`}}></div></div></div> : <div className="ms-badge">✦ Achieved</div>}
                </div>
                {!unlocked && <div className="ms-lock">🔒</div>}
              </div>
            );
          })}
        </div>

        <div className="prof-acts">
          <button className="btn btn-o" style={{width:'100%'}} onClick={() => notify('Profile editing coming soon ✨')}>✏️ Edit Profile</button>
          <button className="btn btn-d" style={{width:'100%'}} onClick={doSignOut}>Sign Out</button>
        </div>
      </div>
      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
