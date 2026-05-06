'use client';
import { useStore } from '@/store/useStore';
import { HABITS, TIMER_SESSIONS, TIMER_PHASES } from '@/data/content';
import { useMemo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/TopBar';
import { playBell } from '@/lib/audio';

import { ClickHand } from '@/components/ClickHand';

export default function Practice() {
  const store = useStore();
  const [activePracTab, setActivePracTab] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [notifMsg, setNotifMsg] = useState('');
  const [notifShow, setNotifShow] = useState(false);

  const [habModalOpen, setHabModalOpen] = useState(false);
  const [curHab, setCurHab] = useState<any>(null);

  // Timer State
  const [timerSes, setTimerSes] = useState(0);
  const [timerLeft, setTimerLeft] = useState(TIMER_SESSIONS[0].sec);
  const [timerTotal, setTimerTotal] = useState(TIMER_SESSIONS[0].sec);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessStart, setSessStart] = useState<Date | null>(null);
  const [sessEnd, setSessEnd] = useState<Date | null>(null);
  const [timerComplete, setTimerComplete] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const notify = (msg: string) => {
    setNotifMsg(msg);
    setNotifShow(true);
    setTimeout(() => setNotifShow(false), 3000);
  };

  const handleHabClick = (h: any) => {
    if (!store.hasSeenHabitHint) store.markHabitHintSeen();
    setCurHab(h);
    setHabModalOpen(true);
  };

  const completeHab = () => {
    if (!curHab) return;
    const isDone = store.done.includes(curHab.id);
    if (isDone) {
      store.removeHabitDone(curHab.id, curHab.mins, curHab.tradeoff);
    } else {
      store.addHabitDone(curHab.id, curHab.mins, curHab.tradeoff);
      notify(`🪔 ${curHab.n} complete — ${curHab.boost} neural restore`);
    }
    setHabModalOpen(false);
  };

  const setTimerSession = (idx: number) => {
    resetTimer();
    setTimerSes(idx);
    const s = TIMER_SESSIONS[idx];
    setTimerLeft(s.sec);
    setTimerTotal(s.sec);
  };

  const toggleTimer = () => {
    if (navigator.vibrate) navigator.vibrate(20);
    if (timerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setTimerRunning(false);
    } else {
      setSessStart(new Date());
      setSessEnd(null);
      setTimerComplete(false);
      setTimerRunning(true);
      playBell('start');
      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerRunning(false);
            if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
            playBell('end');
            setSessEnd(new Date());
            setTimerComplete(true);
            const mins = Math.round(timerTotal / 60);
            store.logTimerSession(mins);
            notify(`🔥 Complete · ${mins} min · Streak: ${store.streak + 1} days`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    if (navigator.vibrate) navigator.vibrate(20);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerLeft(timerTotal);
    setSessStart(null);
    setSessEnd(null);
    setTimerComplete(false);
  };

  const fmtTime = (d: Date | null) => {
    if (!d) return '—';
    const h = d.getHours(), m = d.getMinutes();
    return (h % 12 || 12) + ':' + (m < 10 ? '0' + m : String(m)) + (h < 12 ? ' AM' : ' PM');
  };

  const curPhase = useMemo(() => {
    return TIMER_PHASES.find(x => timerLeft <= x.at && timerLeft > x.at - 60) || null;
  }, [timerLeft]);

  const activeSess = TIMER_SESSIONS[timerSes];
  const tm = Math.floor(timerLeft / 60).toString().padStart(2, '0');
  const ts = (timerLeft % 60).toString().padStart(2, '0');

  return (
    <div className="screen on" id="sp">
      <TopBar />
      <div style={{padding:'6px 14px 14px', flexShrink:0}}>
        <div className="lbl">Daily Sadhana Protocol</div>
        <div style={{fontFamily:'var(--serif)', fontSize:'22px', fontWeight:300, color:'var(--gold2)'}}>Practice Stack</div>
        <p style={{fontSize:'12px', color:'var(--t2)', marginTop:'4px', lineHeight:1.5}}>The 18% who retain full cognitive function share one trait — daily practice.</p>
      </div>
      
      <div className="chip-row">
        {['all', 'yoga', 'brain', 'body'].map(cat => (
          <div key={cat} className={`chip ${activePracTab === cat ? 'on' : ''}`} onClick={() => setActivePracTab(cat)}>
            {cat === 'all' ? 'All Practices' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}
      </div>

      <div className="sp-content">
        <div className="hab-grid-full">
          {HABITS.filter(h => activePracTab === 'all' || h.cat === activePracTab).map((h, i) => {
            const isDone = store.done.includes(h.id);
            const showHint = mounted && i === 0 && !store.hasSeenHabitHint;
            
            return (
              <div className={`hc ${isDone ? 'done' : ''}`} key={h.id} onClick={() => handleHabClick(h)} style={{position: 'relative'}}>
                {showHint && (
                  <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    animation: 'bounce 2s infinite', zIndex: 10, pointerEvents: 'none',
                    filter: 'drop-shadow(0 4px 12px rgba(232, 184, 75, 0.4))'
                  }}>
                    <ClickHand style={{width:'24px', height:'24px', color:'var(--gold2)'}} />
                  </div>
                )}
                <div className="hi" dangerouslySetInnerHTML={{__html: h.icon}}></div>
                <div className="hn">{h.n}</div>
                <div className="hd">{h.dur}</div>
                <div className="hdv">{h.deva}</div>
                <div className="hb">{h.boost} Neural Restore</div>
              </div>
            );
          })}
        </div>

        <div style={{padding:'4px 14px 10px'}}><div className="lbl">Sadhana Timer</div></div>
        <div className="chip-row" style={{paddingBottom:0, marginBottom:'10px'}}>
          {TIMER_SESSIONS.map((s, i) => (
            <div key={i} className={`chip ${timerSes === i ? 'on' : ''}`} onClick={() => setTimerSession(i)}>{s.n}</div>
          ))}
        </div>

        <div className="timer-card card pad">
          <div style={{position:'relative', margin:'10px 0 14px', display:'flex', justifyContent:'center', alignItems:'center', height:'160px'}}>
            <div className={`t-ring ${timerRunning ? 'active' : ''}`}></div>
            <div className="tf" style={{margin:0}}>{tm}:{ts}</div>
          </div>
          <div className="tn">{activeSess.n}</div>
          <div style={{display:'flex', gap:'10px', justifyContent:'center', marginBottom:'14px'}}>
            <button className="btn btn-g" onClick={toggleTimer}>
              {timerComplete ? 'Complete ✓' : timerRunning ? 'Pause' : (timerLeft < timerTotal ? 'Resume' : 'Begin')}
            </button>
            {(timerLeft < timerTotal || timerComplete) && <button className="btn btn-d btn-sm" onClick={resetTimer}>Reset</button>}
          </div>
          <div className="tq">"{curPhase ? curPhase.q : activeSess.q}"</div>
          <div className="ts deva">{curPhase ? curPhase.deva : activeSess.deva}</div>
          
          {/* Session log */}
          {sessEnd && (
            <div style={{marginTop:'16px', borderTop:'1px solid var(--bdr)', paddingTop:'12px'}}>
              <div style={{fontFamily:'var(--mono)', fontSize:'9px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--t4)', marginBottom:'8px'}}>Session</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px'}}>
                <div style={{textAlign:'center', flex:1}}>
                  <div style={{fontFamily:'var(--mono)', fontSize:'9px', color:'var(--t4)', marginBottom:'2px'}}>Started</div>
                  <div style={{fontFamily:'var(--mono)', fontSize:'13px', color:'var(--gold3)'}}>{fmtTime(sessStart)}</div>
                </div>
                <div style={{color:'var(--bdr2)', fontSize:'12px'}}>→</div>
                <div style={{textAlign:'center', flex:1}}>
                  <div style={{fontFamily:'var(--mono)', fontSize:'9px', color:'var(--t4)', marginBottom:'2px'}}>Ended</div>
                  <div style={{fontFamily:'var(--mono)', fontSize:'13px', color:'var(--gold3)'}}>{fmtTime(sessEnd)}</div>
                </div>
                <div style={{color:'var(--bdr2)', fontSize:'12px'}}>·</div>
                <div style={{textAlign:'center', flex:1}}>
                  <div style={{fontFamily:'var(--mono)', fontSize:'9px', color:'var(--t4)', marginBottom:'2px'}}>Duration</div>
                  <div style={{fontFamily:'var(--mono)', fontSize:'13px', color:'var(--jade)'}}>{Math.round((sessEnd.getTime() - (sessStart?.getTime() || 0)) / 60000)} min</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`modal-bg ${habModalOpen ? 'open' : ''}`} onClick={(e) => { if ((e.target as any).className.includes('modal-bg')) setHabModalOpen(false); }}>
        <div className="msheet">
          <div className="mhandle"></div>
          {curHab && (
            <>
              <div style={{fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--saffron2)', marginBottom:'8px'}}>
                {curHab.cat === 'yoga' ? 'Yogic Practice' : curHab.cat === 'brain' ? 'Neuro Protocol' : 'Body Practice'}
              </div>
              <div className="mtitle"><span dangerouslySetInnerHTML={{__html: curHab.icon}} style={{display:'inline-flex', alignItems:'center', gap:'8px', verticalAlign:'middle'}}></span> {curHab.n}</div>
              <div className="mdeva">{curHab.deva}</div>
              <div className="mbody">{curHab.sub}</div>
              <div className="mneuro">🔬 {curHab.neuro}</div>
              <div style={{display:'flex', gap:'10px'}}>
                {store.done.includes(curHab.id) ? (
                  <button className="btn" style={{flex:1, background:'transparent', border:'1px solid var(--bdr2)', color:'var(--t2)'}} onClick={completeHab}>✓ Mark Incomplete</button>
                ) : (
                  <button className="btn btn-g" style={{flex:1}} onClick={completeHab}>Mark Complete ✓</button>
                )}
                <button className="btn btn-o btn-sm" onClick={() => setHabModalOpen(false)}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`notif ${notifShow ? 'show' : ''}`}>{notifMsg}</div>
    </div>
  );
}
