'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { HARD_TRUTHS, ADHD_SYMPTOMS, DETOX_21_DAYS, TRUTH_CARDS } from '@/data/detox-bible';

type TabId = 'poison' | 'mech' | 'proto';

const HEROES: Record<TabId, { title: string; sub: string; venom: string }> = {
  poison: {
    title: 'The Diagnosis',
    sub: 'Your geography is not where you live. It is what your algorithm shows you.',
    venom: 'rgba(232,76,34,',
  },
  mech: {
    title: '8 Mechanisms of Control',
    sub: 'Each hook is engineered. Each has an antidote the rishis named first.',
    venom: 'rgba(232,176,80,',
  },
  proto: {
    title: 'The 21-Day Antidote',
    sub: 'Algorithm withdrawal, phase by phase — until the loop reverses.',
    venom: 'rgba(82,168,120,',
  },
};

const PILL_COLORS: Record<TabId, { bg: string; border: string; text: string }> = {
  poison: { bg: 'rgba(232,76,34,.16)', border: 'rgba(232,76,34,.55)', text: 'var(--sindoor2)' },
  mech: { bg: 'rgba(232,176,80,.14)', border: 'rgba(232,176,80,.5)', text: 'var(--gold2)' },
  proto: { bg: 'rgba(82,168,120,.14)', border: 'rgba(82,168,120,.55)', text: 'var(--jade)' },
};

const TAB_DEF: { id: TabId; ic: string; label: string }[] = [
  { id: 'poison', ic: '☠️', label: 'The Poison' },
  { id: 'mech', ic: '⚙️', label: '8 Mechanisms' },
  { id: 'proto', ic: '🛡️', label: '21-Day Antidote' },
];

const VERDICT_MSGS = [
  '0 of 5 selected — tap the ones you recognise',
  '1 of 5 — early conditioning. Reversible quickly.',
  '2 of 5 — the loop has a grip. 21 days will break it.',
  '3 of 5 — significant algorithmic conditioning. Start tonight.',
  '4 of 5 — the feed is steering. The protocol below is for you.',
  '5 of 5 — full chitta vikṣepa. Not a flaw — an injury. And injuries heal.',
];

// Mechanism-card mapping → adds the front-card glyph + colour the redesign uses,
// reading core data from TRUTH_CARDS in detox-bible.ts.
const MECH_FRONTS: { em: string; col: string }[] = [
  { em: '⏱', col: 'var(--sindoor2)' },
  { em: '😡', col: 'var(--saffron2)' },
  { em: '🧩', col: 'var(--gold2)' },
  { em: '👥', col: 'var(--jade)' },
  { em: '🌀', col: 'rgba(255,255,255,.75)' },
  { em: '🫧', col: 'var(--violet2)' },
  { em: '📳', col: 'var(--flame)' },
  { em: '🍔', col: 'var(--gold3)' },
];

// Practice chips per phase — split detox-bible's "practice" string into chips.
function practiceChips(practice: string): string[] {
  return practice.split('·').map(p => p.trim()).filter(Boolean);
}

export default function Detox() {
  const [tab, setTab] = useState<TabId>('poison');
  const [openTruth, setOpenTruth] = useState<string | null>(null);
  const [symps, setSymps] = useState<boolean[]>(() => ADHD_SYMPTOMS.map(() => false));
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());
  const [discovered, setDiscovered] = useState<Set<number>>(() => new Set());
  const [toast, setToast] = useState<string>('');
  const [ringProgress, setRingProgress] = useState<number>(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Re-position the sliding pill whenever the tab changes or layout settles.
  useEffect(() => {
    const idx = TAB_DEF.findIndex(t => t.id === tab);
    const el = tabRefs.current[idx];
    if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    if (contentRef.current) contentRef.current.scrollTop = 0;
    // Animate the 21-day ring in when entering the protocol tab.
    if (tab === 'proto') {
      const t = setTimeout(() => setRingProgress(1), 220);
      return () => clearTimeout(t);
    } else {
      setRingProgress(0);
    }
  }, [tab]);

  // Recompute pill on mount + resize (font load shifts widths).
  useEffect(() => {
    const reflow = () => {
      const idx = TAB_DEF.findIndex(t => t.id === tab);
      const el = tabRefs.current[idx];
      if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    };
    reflow();
    window.addEventListener('resize', reflow);
    const r = requestAnimationFrame(reflow);
    return () => {
      window.removeEventListener('resize', reflow);
      cancelAnimationFrame(r);
    };
  }, [tab]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2200);
  };

  const toggleSymp = (i: number) => {
    setSymps(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const checkedCount = symps.filter(Boolean).length;
  const verdict = VERDICT_MSGS[checkedCount];

  const flipMech = (i: number) => {
    setFlipped(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setDiscovered(prev => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      if (next.size === 8) {
        showToast('🪔 All 8 antidotes discovered');
      }
      return next;
    });
  };

  const hero = HEROES[tab];
  const pill = PILL_COLORS[tab];

  // SVG ring (r=30, circumference ≈ 188.5)
  const ringCircumference = 188.5;
  const ringOffset = ringCircumference * (1 - ringProgress);

  const mechs = useMemo(
    () =>
      TRUTH_CARDS.map((tc, i) => ({
        em: MECH_FRONTS[i]?.em ?? '◆',
        col: MECH_FRONTS[i]?.col ?? 'var(--gold2)',
        title: tc.title,
        mech: tc.mechanism,
        antidoteTitle: tc.antidoteTitle,
        antidoteDesc: tc.antidoteDesc,
        vedic: tc.vedicTerm,
      })),
    [],
  );

  return (
    <div
      className="screen on"
      id="detox"
      style={{ animation: 'sIn 0.5s cubic-bezier(0.4,0,0.2,1) both', background: 'var(--void)' }}
    >
      <style>{`
        /* ═══ HERO ═══ */
        .dtx-hero{padding:18px 20px 14px;position:relative;overflow:hidden;flex-shrink:0;
          background:radial-gradient(ellipse at 80% -30%, var(--dtx-venom)22, transparent 55%),
                     radial-gradient(ellipse at 0% 110%, rgba(124,108,216,.12), transparent 55%);
          transition: background .5s ease;
        }
        .dtx-back{font-family:var(--mono);font-size:10px;color:var(--t4);letter-spacing:1px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color .2s}
        .dtx-back:hover{color:var(--t2)}
        .dtx-hero h1{font-family:var(--serif);font-size:32px;font-weight:600;line-height:1.05;margin:10px 0 4px;
          background:linear-gradient(120deg,var(--dtx-grad1),var(--dtx-grad2));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          transition:background .5s ease;}
        .dtx-hero p{font-size:12.5px;color:var(--t3);max-width:300px;line-height:1.55}
        .dtx-venom{position:absolute;top:-30px;right:-30px;width:160px;height:160px;border-radius:50%;
          background:radial-gradient(circle, var(--dtx-venom)40, transparent 65%);
          filter:blur(8px);animation:dtx-vpulse 4s infinite alternate;transition:background .5s ease}
        @keyframes dtx-vpulse{to{transform:scale(1.25);opacity:.6}}

        /* ═══ SEGMENTED TABS ═══ */
        .dtx-tabs{position:relative;margin:8px 14px 0;padding:5px;border-radius:22px;display:flex;
          background:rgba(16,12,34,.92);backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.08);flex-shrink:0}
        .dtx-pill{position:absolute;top:5px;bottom:5px;border-radius:18px;
          transition:left .35s cubic-bezier(.4,0,.2,1), width .35s cubic-bezier(.4,0,.2,1), background .35s, border-color .35s;
          border:1px solid;}
        .dtx-tab{flex:1;position:relative;z-index:2;text-align:center;padding:10px 2px;cursor:pointer;
          font-family:var(--mono);font-size:9.5px;letter-spacing:.6px;text-transform:uppercase;
          color:var(--t4);transition:color .3s;font-weight:600;user-select:none}
        .dtx-tab .ic{display:block;font-size:13px;margin-bottom:3px;filter:grayscale(1);opacity:.5;transition:all .3s}
        .dtx-tab.on .ic{filter:none;opacity:1}

        .dtx-pane{padding:14px 16px 30px;animation:dtx-pin .4s ease}
        @keyframes dtx-pin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        .dtx-seclbl{font-family:var(--mono);font-size:9px;letter-spacing:2.5px;text-transform:uppercase;margin:20px 0 10px;display:flex;align-items:center;gap:8px}
        .dtx-seclbl::after{content:'';flex:1;height:1px;background:linear-gradient(90deg, currentColor, transparent);opacity:.3}

        /* ═══ POISON ═══ */
        .dtx-qcard{border-radius:20px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden;
          background:linear-gradient(150deg, rgba(232,76,34,.10), var(--deep));
          border:1px solid rgba(232,76,34,.3)}
        .dtx-qcard::before{content:'';position:absolute;top:0;left:18%;right:18%;height:2px;
          background:linear-gradient(90deg,transparent,var(--sindoor2),transparent)}
        .dtx-qbadge{display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:20px;
          background:rgba(232,76,34,.12);border:1px solid rgba(232,76,34,.35);
          font-family:var(--mono);font-size:8px;color:var(--sindoor2);letter-spacing:1.8px;
          text-transform:uppercase;font-weight:600;margin-bottom:12px}
        .dtx-q{font-family:var(--serif);font-size:19.5px;font-style:italic;color:var(--t1);line-height:1.35;margin-bottom:10px}
        .dtx-q em{color:var(--sindoor2);font-style:italic}
        .dtx-qd{font-size:12.5px;color:var(--t2);line-height:1.65}
        .dtx-qd strong{color:var(--violet3)}

        .dtx-mirror{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:stretch;margin-bottom:10px}
        .dtx-mcell{background:linear-gradient(180deg, rgba(30,25,40,.8), rgba(20,15,30,.9));
          border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 10px;text-align:center}
        .dtx-mcell .em{font-size:24px}
        .dtx-mcell .amt{font-family:var(--mono);font-size:11px;color:var(--gold3);font-weight:600;margin:6px 0 4px}
        .dtx-mcell .dd{font-size:10px;color:var(--t3);line-height:1.5}
        .dtx-vs{display:flex;align-items:center;font-family:var(--serif);font-style:italic;color:var(--sindoor2);font-size:13px}
        .dtx-samebar{text-align:center;border:1px solid rgba(255,107,107,.25);background:rgba(255,107,107,.08);
          border-radius:12px;padding:10px;font-family:var(--mono);font-size:9.5px;color:#ff8a8a;letter-spacing:1.5px;
          text-transform:uppercase;font-weight:600;margin-bottom:10px}
        .dtx-mpull{font-family:var(--serif);font-size:14px;font-style:italic;text-align:center;color:var(--t2);line-height:1.6}
        .dtx-mpull b{color:var(--gold2)}

        .dtx-truth{border:1px solid rgba(255,255,255,.07);border-left:3px solid rgba(232,76,34,.5);
          border-radius:16px;margin-bottom:9px;overflow:hidden;cursor:pointer;
          background:rgba(255,255,255,.02);transition:all .3s}
        .dtx-truth.open{border-color:rgba(232,76,34,.4);
          background:linear-gradient(150deg, rgba(232,76,34,.08), rgba(16,12,34,.9))}
        .dtx-truth .hd{display:flex;gap:12px;align-items:center;padding:14px}
        .dtx-truth .em2{font-size:21px;flex-shrink:0}
        .dtx-truth .qq{font-family:var(--serif);font-size:14px;color:var(--t1);line-height:1.45;flex:1}
        .dtx-truth .chev{color:var(--t4);font-size:10px;transition:transform .35s;flex-shrink:0}
        .dtx-truth.open .chev{transform:rotate(180deg);color:var(--sindoor2)}
        .dtx-truth .bd{max-height:0;overflow:hidden;transition:max-height .45s ease;padding:0 14px}
        .dtx-truth.open .bd{max-height:280px;padding:0 14px 14px}
        .dtx-truth .strow{display:flex;gap:14px;align-items:flex-start;border-top:1px solid rgba(232,76,34,.2);padding-top:12px}
        .dtx-truth .stat{font-family:var(--serif);font-size:32px;color:var(--sindoor2);line-height:1;flex-shrink:0;font-weight:400}
        .dtx-truth .dd2{font-size:12px;color:var(--t2);line-height:1.6}
        .dtx-truth .src{font-family:var(--mono);font-size:8.5px;color:var(--t4);margin-top:8px}

        .dtx-adhdq{border-radius:18px;padding:18px;margin-bottom:12px;
          background:linear-gradient(150deg, rgba(232,76,34,.08), var(--mid));border:1px solid rgba(232,76,34,.3)}
        .dtx-adhdq .t{font-size:15px;font-weight:600;color:var(--t1);margin-bottom:6px}
        .dtx-adhdq .d{font-size:12px;color:var(--t2);line-height:1.65}
        .dtx-adhdq .d b{color:var(--sindoor2)}
        .dtx-symp{display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(255,255,255,.07);
          border-radius:14px;padding:13px;margin-bottom:8px;cursor:pointer;transition:all .25s;
          background:rgba(255,255,255,.02)}
        .dtx-symp.on{border-color:rgba(232,76,34,.5);background:rgba(232,76,34,.07)}
        .dtx-symp .chk{width:20px;height:20px;border-radius:7px;border:1.5px solid var(--t4);flex-shrink:0;
          display:flex;align-items:center;justify-content:center;font-size:11px;color:transparent;transition:all .25s;margin-top:1px}
        .dtx-symp.on .chk{background:var(--sindoor2);border-color:var(--sindoor2);color:#fff}
        .dtx-symp .sd{font-size:12.5px;color:var(--t1);line-height:1.5;font-weight:500}
        .dtx-symp .sn{font-family:var(--mono);font-size:9px;color:var(--t4);margin-top:5px;line-height:1.5;
          border-left:2px solid rgba(232,76,34,.35);padding-left:8px}
        .dtx-verdict{border-radius:14px;padding:14px;text-align:center;font-size:12.5px;
          border:1px dashed var(--bdr2);color:var(--t3);transition:all .3s;margin-bottom:14px}
        .dtx-verdict.hot{border-color:rgba(232,76,34,.5);color:var(--sindoor2)}

        .dtx-vedic{text-align:center;border-radius:20px;padding:24px 18px;
          background:linear-gradient(150deg, rgba(200,144,42,.13), rgba(20,15,10,.9));
          border:1px solid rgba(200,144,42,.3);position:relative;overflow:hidden}
        .dtx-vedic::before{content:'';position:absolute;top:0;left:20%;right:20%;height:2px;
          background:linear-gradient(90deg,transparent,var(--gold2),transparent)}
        .dtx-vedic .l{font-family:var(--mono);font-size:9px;color:var(--gold2);letter-spacing:2.5px;
          text-transform:uppercase;font-weight:600;margin-bottom:8px}
        .dtx-vedic .dv{font-family:var(--deva);font-size:23px;color:var(--gold3);margin-bottom:10px;
          text-shadow:0 0 18px rgba(200,144,42,.45)}
        .dtx-vedic .tx{font-size:12.5px;color:rgba(255,255,255,.85);line-height:1.65}
        .dtx-vedic .tx em{color:#fff}

        /* ═══ MECHANISMS — flip cards ═══ */
        .dtx-mintro{font-size:12.5px;color:var(--t3);line-height:1.65;margin-bottom:14px}
        .dtx-mintro b{color:var(--jade)}
        .dtx-mgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .dtx-flip{perspective:900px;height:215px;cursor:pointer}
        .dtx-flip-in{position:relative;width:100%;height:100%;transition:transform .6s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
        .dtx-flip.flipped .dtx-flip-in{transform:rotateY(180deg)}
        .dtx-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
          border-radius:16px;padding:14px;display:flex;flex-direction:column;border:1px solid}
        .dtx-face.front{background:linear-gradient(160deg, var(--deep), var(--mid))}
        .dtx-face.back{transform:rotateY(180deg);background:linear-gradient(160deg, rgba(82,168,120,.12), var(--deep));border-color:rgba(82,168,120,.4)}
        .dtx-face .fic{width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;
          margin-bottom:9px;border:1px solid;font-size:17px}
        .dtx-face .ft{font-size:12.5px;font-weight:600;color:var(--t1);line-height:1.3;margin-bottom:6px}
        .dtx-face .fm{font-size:9.8px;color:var(--t3);line-height:1.5;flex:1;overflow:hidden}
        .dtx-face .hint{font-family:var(--mono);font-size:7.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t4);margin-top:7px}
        .dtx-face.back .ft{color:var(--jade)}
        .dtx-face.back .dv2{font-family:var(--deva);font-size:12px;color:var(--gold3);margin-top:auto;padding-top:6px}
        .dtx-face.back .hint{color:rgba(142,210,168,.7)}
        .dtx-mcount{text-align:center;font-family:var(--mono);font-size:9.5px;color:var(--t4);letter-spacing:1.5px;margin-top:14px;text-transform:uppercase}

        /* ═══ 21-DAY ═══ */
        .dtx-phero{border-radius:20px;padding:18px;margin-bottom:16px;display:flex;gap:16px;align-items:center;
          background:linear-gradient(150deg, rgba(82,168,120,.10), var(--deep));border:1px solid rgba(82,168,120,.3)}
        .dtx-pring{position:relative;width:74px;height:74px;flex-shrink:0}
        .dtx-pring svg{transform:rotate(-90deg)}
        .dtx-pring b{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
          font-family:var(--serif);font-size:20px;color:var(--jade);font-weight:400;line-height:1}
        .dtx-pring span{font-family:var(--mono);font-size:6.5px;letter-spacing:1px;color:var(--t4);text-transform:uppercase}
        .dtx-phero .ht{font-family:var(--serif);font-size:17px;color:var(--t1);font-weight:500;line-height:1.25;margin-bottom:4px}
        .dtx-phero .hd2{font-size:11px;color:var(--t3);line-height:1.55}

        .dtx-danger{border-radius:16px;border:1px solid rgba(255,70,70,.3);
          background:linear-gradient(150deg, rgba(255,70,70,.08), var(--deep));padding:16px;margin-bottom:16px}
        .dtx-danger .dt{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:10px;color:#ff6b6b;
          letter-spacing:1.5px;text-transform:uppercase;font-weight:700;margin-bottom:10px}
        .dtx-danger .dh{font-family:var(--serif);font-size:17px;color:var(--t1);margin-bottom:4px}
        .dtx-danger .dd3{font-size:11.5px;color:var(--t3);line-height:1.55;margin-bottom:12px}
        .dtx-sig{background:rgba(0,0,0,.35);border-radius:11px;border-left:3px solid;padding:11px 13px;margin-bottom:7px}
        .dtx-sig b{font-size:12.5px;color:#fff;display:block;margin-bottom:2px}
        .dtx-sig span{font-size:10.5px;color:var(--t3);line-height:1.5}

        .dtx-phase{position:relative;padding-left:42px;margin-bottom:14px}
        .dtx-phase .node{position:absolute;left:0;top:4px;width:30px;height:30px;border-radius:50%;display:flex;
          align-items:center;justify-content:center;font-family:var(--mono);font-size:9px;font-weight:700;
          border:1.5px solid rgba(82,168,120,.5);background:var(--void);color:var(--jade);transition:all .3s;z-index:2}
        .dtx-phase .rail2{position:absolute;left:14.5px;top:36px;bottom:-16px;width:1.5px;
          background:linear-gradient(180deg, rgba(82,168,120,.5), rgba(82,168,120,.08))}
        .dtx-phase:last-child .rail2{display:none}
        .dtx-phase .pc2{border-radius:16px;border:1px solid rgba(82,168,120,.18);
          background:linear-gradient(150deg, rgba(82,168,120,.06), rgba(15,25,20,.6));padding:14px 16px;transition:all .3s}
        .dtx-phase:hover .pc2{border-color:rgba(82,168,120,.45);transform:translateX(3px)}
        .dtx-phase .ph-top{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:6px}
        .dtx-phase .ph-day{font-family:var(--mono);font-size:12px;color:var(--jade);font-weight:700}
        .dtx-phase .ph-t{font-family:var(--mono);font-size:8.5px;letter-spacing:1px;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.1);padding:3px 8px;border-radius:5px}
        .dtx-phase .ph-d{font-size:12px;color:rgba(255,255,255,.85);line-height:1.6;margin-bottom:9px}
        .dtx-chips2{display:flex;flex-wrap:wrap;gap:5px}
        .dtx-chips2 span{font-family:var(--mono);font-size:8.5px;color:var(--gold2);background:rgba(200,144,42,.1);
          border:1px solid rgba(200,144,42,.25);border-radius:8px;padding:3px 8px}

        .dtx-complete{text-align:center;border-radius:20px;padding:26px 18px;margin-top:6px;
          background:linear-gradient(150deg, rgba(82,168,120,.12), rgba(15,25,20,.9));
          border:1px solid rgba(82,168,120,.35);position:relative;overflow:hidden}
        .dtx-complete::before{content:'';position:absolute;top:0;left:20%;right:20%;height:2px;
          background:linear-gradient(90deg,transparent,var(--jade),transparent)}
        .dtx-complete .om{font-family:var(--deva);font-size:23px;color:var(--gold3);margin-bottom:8px;
          text-shadow:0 0 18px rgba(200,144,42,.4)}
        .dtx-complete .ct{font-family:var(--serif);font-size:15px;font-style:italic;color:#fff;margin-bottom:16px}

        .dtx-btn-j{font-weight:700;font-size:11.5px;font-family:var(--mono);letter-spacing:1px;text-transform:uppercase;
          padding:13px 26px;border-radius:26px;border:none;cursor:pointer;
          background:linear-gradient(90deg, var(--sage), var(--jade));color:#04130b;
          box-shadow:0 8px 22px rgba(82,168,120,.3);text-decoration:none;display:inline-block;transition:transform .2s}
        .dtx-btn-j:hover{transform:translateY(-2px)}

        .dtx-toast{position:fixed;left:50%;bottom:30px;transform:translateX(-50%) translateY(16px);
          background:rgba(20,16,40,.95);border:1px solid var(--bdr2);color:var(--gold2);font-size:11.5px;
          padding:8px 16px;border-radius:18px;opacity:0;transition:all .3s;pointer-events:none;white-space:nowrap;z-index:60}
        .dtx-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
      `}</style>

      <div className="sb"></div>

      {/* HERO — morphs per tab */}
      <div
        className="dtx-hero"
        style={{
          ['--dtx-venom' as string]: hero.venom,
          ['--dtx-grad1' as string]:
            tab === 'poison' ? 'var(--sindoor2)' : tab === 'mech' ? 'var(--gold2)' : 'var(--sage2)',
          ['--dtx-grad2' as string]:
            tab === 'poison' ? 'var(--flame)' : tab === 'mech' ? 'var(--gold3)' : 'var(--jade)',
        } as React.CSSProperties}
      >
        <div className="dtx-venom" />
        <Link href="/dashboard" className="dtx-back">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          BACK
        </Link>
        <h1>{hero.title}</h1>
        <p>{hero.sub}</p>
      </div>

      {/* SEGMENTED TABS */}
      <div className="dtx-tabs" ref={tabsRef}>
        <div
          className="dtx-pill"
          style={{
            left: pillStyle?.left ?? 5,
            width: pillStyle?.width ?? 100,
            background: pill.bg,
            borderColor: pill.border,
          }}
        />
        {TAB_DEF.map((t, i) => (
          <div
            key={t.id}
            ref={el => { tabRefs.current[i] = el; }}
            className={`dtx-tab${tab === t.id ? ' on' : ''}`}
            onClick={() => setTab(t.id)}
            style={{ color: tab === t.id ? PILL_COLORS[t.id].text : undefined }}
          >
            <span className="ic">{t.ic}</span>{t.label}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="scroll" ref={contentRef} style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>

        {/* ═════════ POISON ═════════ */}
        {tab === 'poison' && (
          <div className="dtx-pane" key="poison">
            <div className="dtx-qcard">
              <div className="dtx-qbadge">♦ The Unasked Question</div>
              <div className="dtx-q">&ldquo;Is the algorithm <em>leading your life</em> — or are you leading it?&rdquo;</div>
              <div className="dtx-qd">
                A beggar with a mobile sees the exact same content you see from your penthouse. Your geography, your income, your reality — irrelevant to the feed. <strong>The algorithm has no geography. But you do.</strong>
              </div>
            </div>

            <div className="dtx-seclbl" style={{ color: 'var(--sindoor2)' }}>The Mirror</div>
            <div className="dtx-mirror">
              <div className="dtx-mcell"><div className="em">🏚️</div><div className="amt">₹200/day</div><div className="dd">Dharavi. No savings. Phone is his window to the world.</div></div>
              <div className="dtx-vs">vs</div>
              <div className="dtx-mcell"><div className="em">🏊</div><div className="amt">₹2L/day</div><div className="dd">Worli penthouse. Pool view. Phone is his window to the world.</div></div>
            </div>
            <div className="dtx-samebar">Same algo · Same rage · Same anxiety</div>
            <div className="dtx-mpull">
              The algorithm makes <b>everyone</b> feel poor, behind, and angry.<br />
              That is not a bug. <b>That is the product.</b>
            </div>

            <div className="dtx-seclbl" style={{ color: 'var(--sindoor2)' }}>The Hard Truths · tap to expand</div>
            {HARD_TRUTHS.map(card => {
              const isOpen = openTruth === card.id;
              return (
                <div
                  key={card.id}
                  className={`dtx-truth${isOpen ? ' open' : ''}`}
                  onClick={() => setOpenTruth(isOpen ? null : card.id)}
                >
                  <div className="hd">
                    <div className="em2">{card.icon}</div>
                    <div className="qq">{card.quote}</div>
                    <div className="chev">▼</div>
                  </div>
                  <div className="bd">
                    <div className="strow">
                      <div className="stat">{card.stat}</div>
                      <div>
                        <div className="dd2">{card.desc}</div>
                        <div className="src">📄 {card.source}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="dtx-seclbl" style={{ color: 'var(--sindoor2)' }}>ADHD &amp; The Algorithm</div>
            <div className="dtx-adhdq">
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--sindoor2)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>◈ The Uncomfortable Question</div>
              <div className="t">Is your ADHD real — or was it manufactured?</div>
              <div className="d">ADHD diagnoses have risen <b>400%</b> since smartphones became universal. The algorithm produces ADHD-like symptoms in neurotypical brains through the exact same mechanism: variable-ratio reinforcement, dopamine spike/crash cycles, and destruction of sustained attention networks.</div>
            </div>

            <div style={{ fontFamily: 'var(--mono)', fontSize: '9.5px', color: 'var(--t3)', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
              Tap every symptom that describes you:
            </div>
            {ADHD_SYMPTOMS.map((sym, i) => (
              <div
                key={i}
                className={`dtx-symp${symps[i] ? ' on' : ''}`}
                onClick={() => toggleSymp(i)}
              >
                <div className="chk">✓</div>
                <div>
                  <div className="sd">{sym.desc}</div>
                  <div className="sn">{sym.neuro}</div>
                </div>
              </div>
            ))}
            <div className={`dtx-verdict${checkedCount >= 3 ? ' hot' : ''}`}>{verdict}</div>

            <div className="dtx-vedic">
              <div className="l">The Vedic Insight</div>
              <div className="dv">मनश्चञ्चलमस्थिरम्</div>
              <div className="tx">
                The Gita named this condition 3,000 years ago: <em>chanchala manas</em> — the restless, unsteady mind. It described both the problem and the cure. The algorithm did not invent this. It merely industrialised it.
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '22px 0 4px' }}>
              <button className="dtx-btn-j" onClick={() => setTab('proto')}>
                Begin the 21-Day Protocol →
              </button>
            </div>
          </div>
        )}

        {/* ═════════ MECHANISMS ═════════ */}
        {tab === 'mech' && (
          <div className="dtx-pane" key="mech">
            <p className="dtx-mintro">
              Eight engineered hooks keep you scrolling. Each card is one mechanism of control — <b>tap any card to flip it</b> and reveal the antidote with its Vedic name.
            </p>
            <div className="dtx-mgrid">
              {mechs.map((m, i) => {
                const isFlipped = flipped.has(i);
                return (
                  <div
                    key={i}
                    className={`dtx-flip${isFlipped ? ' flipped' : ''}`}
                    onClick={() => flipMech(i)}
                  >
                    <div className="dtx-flip-in">
                      <div
                        className="dtx-face front"
                        style={{
                          borderColor: `color-mix(in srgb, ${m.col} 35%, transparent)`,
                          borderLeft: `3px solid ${m.col}`,
                        }}
                      >
                        <div
                          className="fic"
                          style={{
                            background: `color-mix(in srgb, ${m.col} 12%, transparent)`,
                            borderColor: `color-mix(in srgb, ${m.col} 40%, transparent)`,
                          }}
                        >
                          {m.em}
                        </div>
                        <div className="ft">{m.title}</div>
                        <div className="fm">{m.mech}</div>
                        <div className="hint">tap for antidote ⟳</div>
                      </div>
                      <div className="dtx-face back">
                        <div
                          className="fic"
                          style={{
                            background: 'rgba(82,168,120,.12)',
                            borderColor: 'rgba(82,168,120,.4)',
                          }}
                        >
                          🪔
                        </div>
                        <div className="ft">{m.antidoteTitle}</div>
                        <div className="fm" style={{ color: 'var(--t2)' }}>{m.antidoteDesc}</div>
                        <div className="dv2">{m.vedic}</div>
                        <div className="hint">tap to flip back ⟲</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="dtx-mcount">
              {discovered.size} / 8 antidotes discovered{discovered.size === 8 ? ' · सर्वं ज्ञातम् ✓' : ''}
            </div>
          </div>
        )}

        {/* ═════════ 21-DAY ANTIDOTE ═════════ */}
        {tab === 'proto' && (
          <div className="dtx-pane" key="proto">
            <div className="dtx-phero">
              <div className="dtx-pring">
                <svg width="74" height="74">
                  <circle cx="37" cy="37" r="30" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="6" />
                  <circle
                    cx="37" cy="37" r="30" fill="none"
                    stroke="url(#dtx-jg)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    style={{ transition: 'stroke-dashoffset 1.4s ease' }}
                  />
                  <defs>
                    <linearGradient id="dtx-jg">
                      <stop offset="0%" stopColor="#428a66" />
                      <stop offset="100%" stopColor="#8ed2a8" />
                    </linearGradient>
                  </defs>
                </svg>
                <b>21<span>days</span></b>
              </div>
              <div>
                <div className="ht">A progressive protocol that reverses algorithmic conditioning.</div>
                <div className="hd2">Each phase builds on the previous, creating compound neural restoration. The rishis called 21 the number of purification.</div>
              </div>
            </div>

            <div className="dtx-danger">
              <div className="dt"><span style={{ fontSize: '15px' }}>⚠️</span> The Danger Signals</div>
              <div className="dh">What to expect in Week 1</div>
              <div className="dd3">These are the signs of algorithm withdrawal and neural rewiring. They feel uncomfortable. They are actually evidence of recovery.</div>
              <div className="dtx-sig" style={{ borderColor: 'var(--gold2)' }}>
                <b>Boredom is unbearable</b>
                <span>Dopamine receptors are recalibrating upward. Baseline rising.</span>
              </div>
              <div className="dtx-sig" style={{ borderColor: 'var(--violet2)' }}>
                <b>Urge to check phone every 3 min</b>
                <span>Variable-ratio reward withdrawal. Identical to substance withdrawal.</span>
              </div>
              <div className="dtx-sig" style={{ borderColor: 'var(--jade)' }}>
                <b>Mind feels &ldquo;slower&rdquo;</b>
                <span>ACC rapid-fire mode deactivating. dlPFC deep-focus mode coming online.</span>
              </div>
            </div>

            <div className="dtx-seclbl" style={{ color: 'var(--jade)' }}>The Six Phases · 21 days</div>
            {DETOX_21_DAYS.map((step, i) => (
              <div className="dtx-phase" key={i}>
                <div className="node">{i + 1}</div>
                <div className="rail2" />
                <div className="pc2">
                  <div className="ph-top">
                    <span className="ph-day">Day {step.day}</span>
                    <span className="ph-t">{step.title}</span>
                  </div>
                  <div className="ph-d">{step.desc}</div>
                  <div className="dtx-chips2">
                    {practiceChips(step.practice).map((p, k) => (
                      <span key={k}>🪔 {p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="dtx-complete">
              <div className="om">ॐ शान्तिः शान्तिः शान्तिः</div>
              <div className="ct">The loop has reversed. The mind is yours again.</div>
              <Link href="/practice" className="dtx-btn-j">Continue the Practice →</Link>
            </div>
          </div>
        )}
      </div>

      <div className={`dtx-toast${toast ? ' show' : ''}`}>{toast}</div>
    </div>
  );
}
