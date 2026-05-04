export const WISDOMS=[
  {id:'w1',s:'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्',e:'Wherever the restless, unsteady mind wanders — from there, bring it back. Again. And again. This is the entire practice.',src:'Bhagavad Gita 6.26'},
  {id:'w2',s:'चित्तवृत्तिनिरोधः',e:'Yoga is the cessation of the fluctuations of the mind. This is the first definition. Everything else is commentary.',src:'Patanjali Yoga Sutras 1.2'},
  {id:'w3',s:'प्रत्याहारश्चेन्द्रियाणाम्',e:'Pratyahara is the withdrawal of the senses from their objects. The gateway without which concentration, meditation, and absorption cannot begin.',src:'Patanjali Yoga Sutras 2.54'},
  {id:'w4',s:'इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः',e:'The senses are superior to the body; the mind superior to the senses; Buddhi superior to the mind. Beyond Buddhi is the Atma.',src:'Bhagavad Gita 3.42'},
  {id:'w5',s:'समत्वं योग उच्यते',e:'Equanimity of mind is called Yoga. Success and failure are the same to one established in yoga. Act without attachment to outcome.',src:'Bhagavad Gita 2.48'},
  {id:'w6',s:'कर्मण्येवाधिकारस्ते',e:'You have a right to your actions, never to the fruits. Act for the action\'s sake — not for the reward.',src:'Bhagavad Gita 2.47'},
  {id:'w7',s:'मनो हि द्विविधं प्रोक्तं शुद्धं चाशुद्धमेव च',e:'The mind is twofold: pure and impure. Impure when joined with desire; pure when free from desire.',src:'Amritabindu Upanishad 1'},
  {id:'w8',s:'अहं ब्रह्मास्मि',e:'I am Brahman — the infinite, undivided consciousness that underlies all existence. Not a belief. A direct recognition.',src:'Brihadaranyaka Upanishad 1.4.10'},
  {id:'w9',s:'चले वाते चलं चित्तम्',e:'When the breath wanders, the mind is unsteady. When the breath is still, so is the mind. Control the breath; you control the cosmos within.',src:'Hatha Yoga Pradipika 2.2'},
  {id:'w10',s:'सत्यमेव जयते',e:'Truth alone triumphs. Through truth the divine path is spread out — by which sages reach beyond all fear.',src:'Mundaka Upanishad 3.1.6'},
  {id:'w11',s:'तमसो मा ज्योतिर्गमय',e:'Lead me from darkness to light. From the unreal to the real. From death to immortality.',src:'Brihadaranyaka Upanishad 1.3.28'},
  {id:'w12',s:'उद्धरेदात्मनाऽऽत्मानम्',e:'Lift yourself by your own self. The self alone is the friend of the self, and the self alone is the enemy.',src:'Bhagavad Gita 6.5'},
  {id:'w13',s:'मनः एव मनुष्याणां कारणं बन्धमोक्षयोः',e:'The mind alone is the cause of bondage and liberation. Attached to sense objects it leads to bondage; free from attachment, to liberation.',src:'Amritabindu Upanishad 2'},
  {id:'w14',s:'लोकाः समस्ताः सुखिनो भवन्तु',e:'May all beings everywhere be happy and free. May the thoughts, words, and actions of my life contribute to that happiness for all.',src:'Ancient Vedic Invocation'},
];

export const HABITS=[
  {id:'walk',n:'Phoneless Walk',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4c0 1.1-.9 2-2 2S5 5.1 5 4s.9-2 2-2 2 .9 2 2z" fill="currentColor" opacity=".5"/><path d="M7 6l-1.5 5 3 1.5v5"/><path d="M5.5 11l-2 5.5"/><path d="M8.5 11l1.5 2-3 2"/><path d="M17 4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="currentColor" opacity=".5"/><path d="M15 6l-1.5 5 3 1.5v5"/><path d="M13.5 11l-2 5.5"/><path d="M16.5 11l1.5 2-3 2"/></svg>`,dur:'45 min',sub:'Silence. No phone. Let the locus coeruleus relearn slow tonic firing.',cat:'body',neuro:'Walking in silence directly re-trains the brainstem nucleus governing norepinephrine. Digital use forces sharp-burst firing; walking restores slow tonic patterns. Erickson et al. (2011) showed hippocampal volume grows 2% after 1yr of aerobic exercise.',boost:'+25%',deva:'वायु-सेवन',tradeoff:3,mins:45},
  {id:'read',n:'Deep Reading',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V8"/><path d="M12 8C10 5 6 4 3 5v13c3-1 7 0 9 3"/><path d="M12 8c2-3 6-4 9-3v13c-3-1-7 0-9 3"/><path d="M7 9v.01M7 12v.01M7 15v.01"/><path d="M17 9v.01M17 12v.01M17 15v.01"/></svg>`,dur:'1 hr',sub:'Real paper book. Uninterrupted. Reactivates left-hemisphere language circuits.',cat:'brain',neuro:'Berns et al. (2013): sustained reading strengthens prefrontal cortex connectivity. Counteracts the 75% visual-over-language neural shift. The Sanskrit Effect (Hartzell, Scientific American 2018) shows text memorisation grows hippocampal grey matter.',boost:'+34%',deva:'स्वाध्याय',tradeoff:4,mins:60},
  {id:'meditation',n:'Silent Meditation',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="12" cy="4.5" r="1.5"/><path d="M12 6.5v3"/><path d="M7 10c0 0 1.5 3 5 3s5-3 5-3"/><path d="M6.5 17c1.5-2 3-3 5.5-3s4 1 5.5 3"/><path d="M5 20h14"/><circle cx="12" cy="2" r=".6" fill="currentColor" opacity=".6"/></svg>`,dur:'20 min',sub:'Sit. Do nothing. Let the Default Mode Network reboot itself.',cat:'yoga',neuro:'IISc Bangalore (2026): long-term meditators show stronger gamma brain activity and healthier inhibitory circuits. Reignites the DMN — suppressed 80% by digital stimulation. SVYASA fNIRS: yoga reshapes brain microstates within 8 weeks.',boost:'+28%',deva:'ध्यानम्',tradeoff:3,mins:20},
  {id:'pranayama',n:'Pranayama',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M3 12c0-2.5 2-4.5 4.5-4.5S11 9 12 12s2 4.5 4.5 4.5S21 14.5 21 12"/><path d="M7.5 12c0 1-.8 1.8-1.8 1.8"/><path d="M16.5 12c0-1 .8-1.8 1.8-1.8"/><path d="M12 7v2M12 15v2"/></svg>`,dur:'15 min',sub:'Regulate breath = regulate the entire autonomic nervous system.',cat:'yoga',neuro:'Slow-paced breathing (5–6/min) activates the baroreflex arc, synchronizing HRV with brain oscillations. Stanford research: cortisol drops up to 22%. Directly calms the 88%-shifted amygdala. Modulates parasympathetic response.',boost:'+22%',deva:'प्राणायाम',tradeoff:5,mins:15},
  {id:'namjap',n:'Naam Jap',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="12" cy="12" r="9" opacity=".3"/><circle cx="12" cy="12" r="6" opacity=".5"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2" opacity=".5"/></svg>`,dur:'10 min',sub:'Repetition of the Sacred Name. The oldest cognitive entrainment protocol.',cat:'yoga',neuro:'Sanskrit Effect (Hartzell, Scientific American): reciting mantras increases grey matter in hippocampus and temporal cortex. Rhythmic repetition induces theta-alpha states, restoring dlPFC thickness. Directly targets ACC dominance.',boost:'+20%',deva:'नाम जप',tradeoff:0,mins:10},
  {id:'handwork',n:'Hand Work',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 5.5v-2a1.5 1.5 0 0 1 3 0V12"/><path d="M14 5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M17 8.5a1.5 1.5 0 0 1 3 0V16a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3a1.5 1.5 0 0 1 3 0"/></svg>`,dur:'20 min',sub:'Cook, fix things, tie knots. Minds were built for hands.',cat:'body',neuro:'Corrects the 70% cognitive-prediction/motor-skill imbalance. SVYASA Psychology Lab confirms motor-cognitive integration. Activating fine motor pathways rebuilds cerebellar-prefrontal connectivity lost to passive consumption.',boost:'+18%',deva:'कर्म योग',tradeoff:6,mins:20},
  {id:'sleep',n:'Sleep Before Midnight',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><circle cx="17.5" cy="5.5" r=".5" fill="currentColor" stroke="none"/><circle cx="20" cy="3" r=".4" fill="currentColor" stroke="none" opacity=".6"/><circle cx="19" cy="8" r=".4" fill="currentColor" stroke="none" opacity=".5"/></svg>`,dur:'7-9 hrs',sub:'Re-anchor the circadian system shattered by the digital age.',cat:'body',neuro:'+31% cognitive restoration per day. The glymphatic system clears neurotoxic waste 60% more efficiently during deep sleep (Walker 2017, NIH). Chronic deprivation causes prefrontal cortex hypometabolism equivalent to 0.05% BAC.',boost:'+31%',deva:'निद्रा',tradeoff:1,mins:480},
  {id:'silence',n:'Unreachable Hour',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><line x1="2" y1="2" x2="22" y2="22" opacity=".5"/></svg>`,dur:'1 hr',sub:'Not do-not-disturb. Genuinely unreachable. The DMN requires it.',cat:'brain',neuro:'The Default Mode Network cannot fire while you remain reachable. One full unreachable hour daily is the minimum threshold for meaningful DMN recovery. The DMN governs self-reflection, imagination, and identity formation.',boost:'+24%',deva:'मौनम्',tradeoff:3,mins:60},
  {id:'writing',n:'Handwriting',icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="M15 5l4 4"/><path d="M5 21q3-3 6-6"/></svg>`,dur:'15 min',sub:'Journal or copy text. Force the brain to synthesise, not index.',cat:'brain',neuro:'Activates deep hippocampal encoding — the faculty replaced by transactive memory indexing (82% shifted). The Sanskrit Effect: memorising text increases hippocampal grey matter. Writing forces synthesis vs location.',boost:'+20%',deva:'लेखनम्',tradeoff:1,mins:15},
];

export const TRADEOFFS=[
  {n:'ACC vs dlPFC — Deep Focus',pct:78,vedic:'Manas overtaking Buddhi',desc:'You can juggle 15 tabs but cannot read for 30 minutes. ACC (rapid-classification) dominates over dlPFC (deep reasoning). IISc Bangalore (2026): digital habits enhance ACC while weakening dlPFC gamma oscillations.',fix:'Naam Jap · Silent Meditation · Long-form reading'},
  {n:'Transactive Memory — Deep Encoding',pct:82,vedic:'Chitta filling with junk',desc:'Your hippocampus stores where to find information, not the information itself. Sanskrit Effect (Hartzell, Scientific American): memorising mantras physically grows hippocampal grey matter — the exact opposite of Googling.',fix:'Handwriting · No-phone memorisation'},
  {n:'Ventral vs Dorsal Attention',pct:85,vedic:'Indriya-dosh — senses pulled outward',desc:'Silence feels uncomfortable. Phone-reach within 10 seconds of boredom. SVYASA Trataka research: candle-gazing activates dorsal network. Patanjali\'s Ashtanga Yoga is a 2,000-year-old protocol for this rebalancing.',fix:'Pratyahara · Unreachable Hour · Silent sitting'},
  {n:'Default Mode Network — Suppressed',pct:80,vedic:'Ahamkara without anchor',desc:'The DMN is where you process who you are. SVYASA fNIRS (2024): yoga reshapes brain microstates. IISc: long-term meditators show enhanced DMN connectivity. Without DMN time, people feel busy but directionless.',fix:'20-min meditation · Phoneless walks'},
  {n:'Language vs Visual Networks',pct:75,vedic:'Vak-shakti degraded',desc:'"I cannot read long articles anymore" — and there is an MRI reason. Sanskrit Effect: reciting Sanskrit grows grey matter in Broca\'s area and temporal cortex. The fix confirms the diagnosis.',fix:'1hr deep reading · Handwriting · No-scroll mornings'},
  {n:'Social vs Physical Threat Detection',pct:88,vedic:'Bhaya — chronic fear state',desc:'The safest generation is the most anxious. SVYASA (2024): yoga decreases oxidative stress and improves neurocognitive function. Amygdala reactivity shows 27% reduction after 8 weeks equanimity practice.',fix:'Pranayama · Naam Jap · Trataka'},
  {n:'Cognitive Prediction vs Motor Skill',pct:70,vedic:'Karma Yoga neglected',desc:'Children on tablets show measurably weaker grip strength. Handwriting disappears and with it unique neural integration. SVYASA Psychology Lab (2024): yoga restores motor-cognitive integration.',fix:'Cook · Repair · Tie knots · Manual craft'},
];

export const ERAS=[
  {y:1000,v:.5,era:'Medieval',desc:'Oral tradition. Hippocampus stored everything. Slow, deep encoding — ~500 new words/day.'},
  {y:1200,v:.7,era:'University Age',desc:'First universities. Scholastic method. Buddhi dominant — deliberate thinking was the norm.'},
  {y:1450,v:1.2,era:'Gutenberg',desc:'1000x information availability overnight. First mass externalization of memory begins.'},
  {y:1600,v:2,era:'Scientific Revolution',desc:'Systematic observation. The dlPFC in constant use. Cause-and-effect reasoning as a daily discipline.'},
  {y:1750,v:3.5,era:'Enlightenment',desc:'Newspapers, postal systems. 10× more text encountered daily vs 1400s.'},
  {y:1850,v:6,era:'Telegraph Age',desc:'Real-time news. Information at electric speed. Attention begins fragmenting at the margins.'},
  {y:1920,v:12,era:'Radio Era',desc:'Broadcast media enters the home. Passive consumption normalizes. Dorsal network begins yielding.'},
  {y:1960,v:25,era:'Television',desc:'3,600 images per hour. 5+ hrs/day watching. Information becomes passive. Attention spans decline.'},
  {y:1995,v:60,era:'Early Internet',desc:'Google Effect begins. Hippocampus shifts from encoding to indexing.'},
  {y:2007,v:120,era:'Smartphone',desc:'96 phone checks/day. Push notifications fragment attention into 3-minute windows. Manas becomes sovereign.'},
  {y:2015,v:200,era:'Algorithm Era',desc:'Infinite scroll. 74GB consumed daily but deep processing drops. ACC overtakes dlPFC by 78%.'},
  {y:2024,v:350,era:'AI Integration',desc:'All 7 trade-offs compound simultaneously. The gap between information exposure and understanding is at its widest in history.'},
];

export const TIERS=[
  {n:'Deep Thinkers',pct:'1.2%',pop:'~97M',proc:'320+ bits/sec',cls:'tc1',col:'#34d399',deva:'सत्त्वम्',desc:'Read 30+ books/yr, meditate regularly. AI Co-Pilots — they direct AI, AI does not direct them.'},
  {n:'Active Processors',pct:'8.8%',pop:'~713M',proc:'180–320 bits/sec',cls:'tc2',col:'#38bdf8',deva:'सत्त्व-रजस्',desc:'10–30 books/yr, skilled professionals. AI Collaborators — catch errors, evaluate outputs critically.'},
  {n:'Functional Processors',pct:'24%',pop:'~1.94B',proc:'80–180 bits/sec',cls:'tc3',col:'#fbbf24',deva:'रजस्',desc:'Occasional reading, 4–6 hrs screen time. AI Assisted — accept outputs at face value. Can be trained upward.'},
  {n:'Passive Consumers',pct:'39%',pop:'~3.16B',proc:'30–80 bits/sec',cls:'tc4',col:'#f87171',deva:'रजस्-तमस्',desc:'6+ hrs passive screen time. AI Dependent — cannot detect hallucinations or evaluate AI output.'},
  {n:'Cognitively Atrophied',pct:'27%',pop:'~2.19B',proc:'<30 bits/sec',cls:'tc5',col:'#c084fc',deva:'तमस्',desc:'No structured cognitive challenge. Includes 750M+ functionally illiterate (UNESCO 2024). AI Operated.'},
];

export const TIMER_SESSIONS=[
  {n:'Pratyahara',sec:900,q:'"The boredom is not the enemy. The boredom is the doorway."',deva:'प्रत्याहारश्चेन्द्रियाणाम्'},
  {n:'Pranayama',sec:1200,q:'"When the breath is still, so is the mind."',deva:'चले वाते चलं चित्तम्'},
  {n:'Deep Reading',sec:3600,q:'"Knowledge absorbed through text builds the architecture of thought."',deva:'स्वाध्यायात् मोक्षः'},
  {n:'Phoneless Walk',sec:2700,q:'"Walk in silence. Let the locus coeruleus remember its slow rhythm."',deva:'वायु-सेवन'},
  {n:'Naam Jap',sec:600,q:'"The Sacred Name is the oldest cognitive entrainment protocol."',deva:'नाम जप'},
];

export const TIMER_PHASES=[
  {at:850,q:'"The boredom is not the enemy. The boredom is the doorway."',deva:'प्रत्याहारश्चेन्द्रियाणाम्'},
  {at:700,q:'"The hand twitches. Stay. This is exactly the practice."',deva:'तितिक्षा — forbearance'},
  {at:500,q:'"The unmediated mind feels like a stranger. It is. Keep sitting."',deva:'अन्तर्मुख — turning inward'},
  {at:300,q:'"The Default Mode Network is waking up. Stay."',deva:'ध्यानम् — the witness awakens'},
  {at:120,q:'"Almost through. The dlPFC is re-thickening."',deva:'समाधि — approaching stillness'},
  {at:8,q:'"Complete. The loop has reversed today."',deva:'ॐ शान्तिः शान्तिः शान्तिः'},
];

export const MILESTONES=[
  {id:'m1',art:'🌸',icon:'🕉️',t:'First Step',msg:'You began. The hardest part is always the first step into stillness. The journey of ten thousand hours starts here.',req:'totalTasks',need:1},
  {id:'m2',art:'🪔',icon:'🔥',t:'Seven Sacred Days',msg:'Seven consecutive days. The rishis called this Saptah. Your neural pathways have begun to notice the new direction.',req:'streak',need:7},
  {id:'m3',art:'📜',icon:'📖',t:'100 Minutes of Reading',msg:'Your language networks are re-blooming. The visual stream is no longer the only voice. Vak-shakti is returning.',req:'readMins',need:100},
  {id:'m4',art:'🕌',icon:'🧘',t:'100 Minutes of Meditation',msg:'100 minutes of sitting with the self. The DMN has re-ignited. You are beginning to remember who you are beneath the noise.',req:'medMins',need:100},
  {id:'m5',art:'🌊',icon:'🌬️',t:'50 Pranayama Minutes',msg:'Fifty minutes of regulated breath. Your amygdala is learning the difference between a tweet and a predator. The 88% shift is reversing.',req:'pranaMins',need:50},
  {id:'m6',art:'⭐',icon:'🌙',t:'21-Day Streak',msg:'21 days. Neuroscience confirms habit pathways cement around this threshold. The rishis called 21 the number of purification.',req:'streak',need:21},
  {id:'m7',art:'🏺',icon:'⚡',t:'500 Sadhana Minutes',msg:'500 minutes of total practice. You are measurably in the top 10% of conscious practitioners. The Quiet Inheritor emerges.',req:'totalMins',need:500},
  {id:'m8',art:'🪷',icon:'🏆',t:'The Quiet Inheritor',msg:'30-day streak. You have done what 90% of humanity cannot. You are preserving the capacity to think, feel, and choose freely. This is the inheritance.',req:'streak',need:30},
];

export const SCI_SECS=[
  {id:'timeline',lbl:'1000yr Timeline'},
  {id:'crisis',lbl:'The Crisis'},
  {id:'tradeoffs',lbl:'7 Trade-offs'},
  {id:'evidence',lbl:'Evidence'},
  {id:'spectrum',lbl:'Spectrum'},
  {id:'verdict',lbl:'Verdict'},
  {id:'solution',lbl:'Solution'},
];

export const TQUOTES=[
  "Every moment of stillness is a moment of becoming.",
  "The mind is the bridge between the finite and the infinite.",
  "In silence, the universe speaks its deepest truths.",
  "You are not the storm. You are the vast sky that holds it.",
  "Breathe. You are already here.",
  "The boredom is not the enemy. It is the doorway.",
  "What you seek is seeking you.",
];

