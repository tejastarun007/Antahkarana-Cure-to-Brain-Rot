/**
 * Algorithm Detox data — extracted from user content
 * Used in the /detox route.
 */

export interface HardTruth {
  id: string;
  icon: string;
  quote: string;
  stat: string;
  desc: string;
  source: string;
}

export const HARD_TRUTHS: HardTruth[] = [
  {
    id: 'ht1', icon: '📱',
    quote: '"You think you chose what to watch. You did not. The algo chose you."',
    stat: '96×',
    desc: 'Average phone checks per day. Each one is a variable-ratio reward trigger — the exact same mechanism as a slot machine. Designed by the same behavioural psychologists.',
    source: 'Udemy Research (2018) · Tristan Harris, Center for Humane Tech'
  },
  {
    id: 'ht2', icon: '🧠',
    quote: '"Knowing more does not make you wise. Digesting what you know does."',
    stat: '74 GB',
    desc: 'Information consumed per person per day in 2024. Yet comprehension, retention, and wisdom scores are falling. Information obesity is real. You are full. You are starving.',
    source: 'UC San Diego (2009) · OECD PIAAC (2023)'
  },
  {
    id: 'ht3', icon: '😤',
    quote: '"Your mood today depends on the news. That means strangers own your nervous system."',
    stat: '-27%',
    desc: 'Reduction in self-reported emotional stability among daily news consumers vs weekly. Cortisol spikes from negative news persist for hours — damaging sleep, digestion, and decision-making.',
    source: 'American Psychological Association (2022) · Cortisol research, UCL'
  },
  {
    id: 'ht4', icon: '⏳',
    quote: '"Moments frozen by a scroll dictate your emotional life for hours."',
    stat: '23 min',
    desc: 'Time needed to fully return to deep focus after a single interruption. One notification. One scroll. One reel. 23 minutes, gone. You checked your phone 96 times today. Do the math.',
    source: 'Gloria Mark, UC Irvine · Journal of Experimental Psychology (2016)'
  }
];

export interface TruthCard {
  id: string;
  icon: string;
  color: string;
  title: string;
  mechanism: string;
  antidoteTitle: string;
  antidoteDesc: string;
  vedicTerm: string;
}

export const TRUTH_CARDS: TruthCard[] = [
  {
    id: 't1', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.8"/></svg>', color: 'var(--sindoor2)',
    title: 'Variable-Ratio Rewards',
    mechanism: 'The algorithm operates on a Skinner box schedule. It delivers dopamine unpredictably—identical to a casino slot machine—to intentionally fracture your capacity for sustained attention.',
    antidoteTitle: 'Fixed-Schedule Architecture',
    antidoteDesc: 'Remove the variability. Restrict device checking to predetermined, fixed intervals only.',
    vedicTerm: 'नियम (Niyama)'
  },
  {
    id: 't2', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12a2.5 2.5 0 0 0 2.5 2.5zM15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-1.12-2.5-2.5-2.5S13 10.62 13 12a2.5 2.5 0 0 0 2.5 2.5z" stroke="currentColor" stroke-width="1.5"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" stroke-width="1.5"/><path d="M9 17h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: 'var(--saffron2)',
    title: 'Outrage Optimization',
    mechanism: 'Platforms ruthlessly prioritize content that triggers moral outrage. This intentionally hijacks your amygdala to guarantee maximum time-on-site.',
    antidoteTitle: 'Intentional Ignorance',
    antidoteDesc: 'Curate your reality. Starve the outrage engine by aggressively muting inflammatory feeds.',
    vedicTerm: 'उपेक्षा (Upeksha)'
  },
  {
    id: 't3', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 17l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', color: 'var(--gold2)',
    title: 'Attention Fragmentation',
    mechanism: 'Endless short-form scrolling splinters the prefrontal cortex, actively rewiring your brain to reduce your focus span to mere seconds.',
    antidoteTitle: 'Deep Neural Focus',
    antidoteDesc: 'Rebuild the neural pathways. Read long-form text or sit in absolute silence for 20 minutes daily.',
    vedicTerm: 'एकाग्रता (Ekagrata)'
  },
  {
    id: 't4', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: 'var(--jade)',
    title: 'Social Comparison',
    mechanism: 'Vanity metrics—views, likes, followers—weaponize our innate evolutionary need for tribal validation, inducing chronic, low-level FOMO.',
    antidoteTitle: 'Internal Validation',
    antidoteDesc: 'Deactivate all like counts and vanity notifications. Measure yourself strictly by your own standards.',
    vedicTerm: 'सन्तोष (Santosha)'
  },
  {
    id: 't5', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', color: 'rgba(255,255,255,0.7)',
    title: 'Infinite Scroll',
    mechanism: 'The deliberate removal of natural stopping cues induces a state of flow-like hypnosis, causing hours to vanish in dopaminergic time distortion.',
    antidoteTitle: 'Physical Friction',
    antidoteDesc: 'Break the trance. Leave the device in another room and force physical friction before usage.',
    vedicTerm: 'प्रत्याहार (Pratyahara)'
  },
  {
    id: 't6', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>', color: 'var(--violet2)',
    title: 'Echo Chambers',
    mechanism: 'Algorithmic filtering isolates you in a sterile bubble of confirming opinions, systematically shrinking your reality and destroying nuance.',
    antidoteTitle: 'Active Inquiry',
    antidoteDesc: 'Actively seek out long-form opposing views. Digest them slowly to rebuild intellectual resilience.',
    vedicTerm: 'विवेक (Viveka)'
  },
  {
    id: 't7', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12h-2M4 12H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/></svg>', color: '#ffb050',
    title: 'Phantom Vibration',
    mechanism: 'Incessant notifications condition your nervous system into a constant, draining state of hyper-vigilance, preventing deep rest.',
    antidoteTitle: 'Digital Mauna',
    antidoteDesc: 'Silence all non-human notifications. Keep the device face down. Reclaim your atmospheric peace.',
    vedicTerm: 'मौन (Mauna)'
  },
  {
    id: 't8', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8z" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 3l8 18M16 3L8 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/></svg>', color: 'var(--gold3)',
    title: 'Information Obesity',
    mechanism: 'Consuming gigabytes of disjointed data daily without digestion leads directly to severe cognitive overload and epistemic anxiety.',
    antidoteTitle: 'Information Fasting',
    antidoteDesc: 'Stop consuming. Start synthesizing. Journal your thoughts manually to encode them into memory.',
    vedicTerm: 'स्वाध्याय (Swadhyaya)'
  }
];

export const ADHD_SYMPTOMS = [
  {
    desc: 'Cannot read for more than 5 minutes without reaching for your phone',
    neuro: 'dlPFC suppression — same mechanism as clinical ADHD · IISc Bangalore (2026)'
  },
  {
    desc: 'Task-switching constantly; 15 tabs, 0 completions',
    neuro: 'ACC dominance over dlPFC (78% shifted) · impulsivity without hyperactivity'
  },
  {
    desc: 'Time blindness — hours pass while scrolling; seconds feel long in silence',
    neuro: 'Dopaminergic time distortion — identical to ADHD time perception deficit'
  },
  {
    desc: 'Emotional dysregulation — mood crashes after consuming bad news or mean comments',
    neuro: 'Amygdala hyperreactivity (88% in modern population) · APA (2022)'
  },
  {
    desc: 'In AI era: feels like you need to know everything to stay relevant',
    neuro: 'Information anxiety · FOMO-driven cortisol loops · epistemic overwhelm'
  }
];

export interface DetoxStep {
  day: string;
  title: string;
  desc: string;
  practice: string;
}

export const DETOX_21_DAYS: DetoxStep[] = [
  { day: '1–3', title: 'Awareness Phase', desc: 'Track your phone pickups. No changes yet — just observe. Notice the automatic reach. Count it.', practice: 'Self-observation only' },
  { day: '4–7', title: 'First Withdrawal', desc: 'Remove social media from home screen. Add 15-min morning silence before any screen. Journal by hand.', practice: 'Handwriting · Morning Silence' },
  { day: '8–10', title: 'Attention Training', desc: 'Begin 10-min focused meditation. Read 30 min daily (physical book). No phone during meals.', practice: 'Meditation · Deep Reading' },
  { day: '11–14', title: 'Breath Regulation', desc: 'Add Nadi Shodhana pranayama. Walk without phone. Practice one Unreachable Hour daily.', practice: 'Pranayama · Phoneless Walk · Mauna' },
  { day: '15–17', title: 'Deep Practice', desc: 'Extend meditation to 20 min. Begin Naam Jap (108 repetitions). Cook one meal mindfully.', practice: 'Naam Jap · Hand Work · Meditation' },
  { day: '18–21', title: 'Integration', desc: 'Full Sadhana stack daily. Sleep before 10:30 PM. One hour of deep reading. The loop has reversed.', practice: 'Full Protocol · Sleep Protocol' },
];
