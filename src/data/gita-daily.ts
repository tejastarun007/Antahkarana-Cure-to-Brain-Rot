// Daily Bhagavad Gita teachings — rotates based on calendar date
// Each teaching includes Sanskrit shloka, translation, chapter context, and a neuroscience bridge

export interface GitaTeaching {
  id: string;
  chapter: number;
  verse: string;
  sanskrit: string;
  translation: string;
  reflection: string;
  theme: string;
  neuro: string;
  color: 'saffron' | 'indigo' | 'forest' | 'wine' | 'violet';
}

export const GITA_TEACHINGS: GitaTeaching[] = [
  // Chapter 1 — Arjuna's Dilemma
  {id:'g1',chapter:1,verse:'1.47',sanskrit:'एवमुक्त्वाऽर्जुनः सङ्ख्ये रथोपस्थ उपाविशत्',translation:'Having spoken thus on the battlefield, Arjuna sat down on the seat of the chariot, casting aside his bow and arrows, his mind overwhelmed with sorrow.',reflection:'Every transformation begins with a moment of crisis. The breakdown is not weakness — it is the opening through which wisdom enters.',theme:'Surrender · Crisis as Gateway',neuro:'Emotional overwhelm activates the anterior insula, creating a window for cognitive restructuring. Crisis moments correlate with increased neuroplasticity.',color:'wine'},

  // Chapter 2 — Sankhya Yoga (Knowledge)
  {id:'g2',chapter:2,verse:'2.14',sanskrit:'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः',translation:'The contact of the senses with their objects produces cold and heat, pleasure and pain. They come and go; they are impermanent. Bear them patiently, O Arjuna.',reflection:'Sensory inputs are transient. The one who observes them is not. Train the witness — the sensations will lose their sovereignty over your mind.',theme:'Equanimity · Impermanence',neuro:'Mindful observation of sensations without reactivity reduces amygdala activation by 23%. Interoceptive awareness training builds emotional resilience.',color:'indigo'},
  {id:'g3',chapter:2,verse:'2.47',sanskrit:'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',translation:'You have a right to perform your actions, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, nor be attached to inaction.',reflection:'Outcome-independence is the ultimate freedom. Act with full engagement but release the grip on results. This is the root of all flow states.',theme:'Detached Action · Karma Yoga',neuro:'Process-focused individuals show 40% higher flow states. Outcome detachment reduces dopaminergic anticipation loops exploited by social media.',color:'saffron'},
  {id:'g4',chapter:2,verse:'2.48',sanskrit:'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय',translation:'Perform your duties established in Yoga, O Arjuna. Abandon attachment. Be even-minded in success and failure. This equanimity is called Yoga.',reflection:'Yoga is not a posture. It is a state of mind — the ability to remain unmoved by the oscillations of gain and loss.',theme:'Equanimity · Samatva',neuro:'Equanimity meditation reduces amygdala reactivity by 27% in 8 weeks. The prefrontal cortex thickens while the amygdala literally shrinks in volume.',color:'forest'},
  {id:'g5',chapter:2,verse:'2.62',sanskrit:'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते',translation:'Contemplating on sense objects, attachment arises. From attachment, desire is born. From desire, anger arises.',reflection:'The chain: attention → attachment → desire → anger → delusion → destruction. Every scroll is a link in this chain. Break it at the first link — attention.',theme:'Attention · The Chain of Bondage',neuro:'The dopamine-driven scroll loop mirrors this exact chain. Each notification triggers the ventral striatum, creating anticipatory craving loops.',color:'wine'},
  {id:'g6',chapter:2,verse:'2.70',sanskrit:'आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत्',translation:'As the ocean remains undisturbed by the constant flow of waters, so does the sage remain unmoved by the flow of desires. Such a person alone attains peace.',reflection:'Be the ocean, not the wave. Inputs will arrive endlessly — the practice is to remain the vast container, not the turbulence.',theme:'Inner Stillness · Ocean Mind',neuro:'Long-term meditators show increased cortical thickness in the insula and prefrontal regions — the neural substrate of equanimity.',color:'indigo'},

  // Chapter 3 — Karma Yoga
  {id:'g7',chapter:3,verse:'3.27',sanskrit:'प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः',translation:'All actions are performed by the gunas of prakriti (nature). The self, deluded by egoism, thinks: "I am the doer."',reflection:'You are not the doer. The body acts, the mind reacts, nature moves. The real you is the witness. Recognizing this dissolves anxiety at its root.',theme:'Non-Doership · Witness Consciousness',neuro:'Default Mode Network studies show the "self-as-doer" is a neural construction. Dissolving ego boundaries in meditation reveals pure awareness states.',color:'violet'},
  {id:'g8',chapter:3,verse:'3.42',sanskrit:'इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः',translation:'The senses are superior to the body. The mind is superior to the senses. The intellect is superior to the mind. And that which is beyond the intellect is the Self.',reflection:'There is a hierarchy of awareness. The senses pull outward; the mind processes; the intellect discriminates; beyond all is the silent Self.',theme:'Inner Hierarchy · Self-Knowledge',neuro:'The prefrontal cortex (Buddhi) can override limbic impulses (Manas). This top-down regulation is strengthened by 34% through consistent meditation.',color:'saffron'},

  // Chapter 4 — Jnana Yoga
  {id:'g9',chapter:4,verse:'4.7',sanskrit:'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',translation:'Whenever there is a decline of righteousness and a rise of unrighteousness, O Bharata, then I manifest Myself.',reflection:'In every age of decline, a corrective force arises. In this age of digital overwhelm, the ancient wisdom resurfaces as the necessary antidote.',theme:'Dharma · Cosmic Balance',neuro:'Civilizational stress patterns trigger collective cognitive adaptation. The current attention crisis is generating a counter-movement toward contemplative practices.',color:'saffron'},
  {id:'g10',chapter:4,verse:'4.38',sanskrit:'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते',translation:'There is nothing in this world as purifying as knowledge. One who is perfected in yoga finds it within the Self in due course of time.',reflection:'Knowledge — not information — purifies. Information overwhelms; knowledge integrates. The difference is depth of processing.',theme:'Knowledge vs Information',neuro:'Deep processing activates hippocampal encoding, building lasting neural architecture. Surface scrolling uses only transactive memory indexing.',color:'forest'},

  // Chapter 5 — Karma Sannyasa Yoga
  {id:'g11',chapter:5,verse:'5.21',sanskrit:'बाह्यस्पर्शेष्वसक्तात्मा विन्दत्यात्मनि यत्सुखम्',translation:'One who is not attached to external sense pleasures discovers happiness within the Self. Such a person, united with Brahman, enjoys eternal bliss.',reflection:'The phone offers 1,000 pleasures per hour — none lasting. The Self offers one — infinite and unbroken. Trade frequency for depth.',theme:'Inner Joy · Sense Withdrawal',neuro:'Hedonic adaptation studies show external pleasures decay in satisfaction. Internal states accessed through meditation show sustained well-being markers.',color:'indigo'},

  // Chapter 6 — Dhyana Yoga
  {id:'g12',chapter:6,verse:'6.5',sanskrit:'उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत्',translation:'Elevate yourself by your own self. Do not degrade yourself. The self alone is the friend of the self, and the self alone is the enemy of the self.',reflection:'No app will save you. No guru, no hack. The battle is internal. You are both the problem and the solution. Begin.',theme:'Self-Mastery · Inner Sovereignty',neuro:'Self-Determination Theory: internal locus of control produces 73% better outcomes in habit formation. The prefrontal cortex rebuilds its regulatory circuits within 8 weeks.',color:'saffron'},
  {id:'g13',chapter:6,verse:'6.26',sanskrit:'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्',translation:'Wherever the restless and unsteady mind wanders, one should bring it back and fix it on the Self.',reflection:'The entire practice in one verse. The mind will wander — to the phone, to the feed, to the noise. Bring it back. Again. And again.',theme:'Focus · The Entire Practice',neuro:'Focused attention meditation strengthens the dorsal attention network. Each "bring it back" moment is a neural rep, building attentional muscle.',color:'wine'},
  {id:'g14',chapter:6,verse:'6.35',sanskrit:'असंशयं महाबाहो मनो दुर्निग्रहं चलम्',translation:'Undoubtedly, O mighty-armed one, the mind is difficult to restrain and restless. But through practice and detachment, it can be controlled.',reflection:'Krishna acknowledges the difficulty. The mind IS hard to control. But he gives the formula: abhyasa (practice) + vairagya (detachment). There is no shortcut.',theme:'Practice + Detachment',neuro:'Neuroplasticity requires both repetition (abhyasa) and letting go of old patterns (vairagya). This mirrors extinction learning in neuroscience.',color:'violet'},

  // Chapter 7 — Jnana Vijnana Yoga
  {id:'g15',chapter:7,verse:'7.14',sanskrit:'दैवी ह्येषा गुणमयी मम माया दुरत्यया',translation:'This divine Maya of Mine, consisting of the three gunas, is difficult to overcome. But those who surrender to Me alone cross beyond it.',reflection:'The illusion of the digital world is a modern Maya. Algorithms, feeds, notifications — all gunas in digital form. Recognizing the pattern is the first step to transcending it.',theme:'Maya · Digital Illusion',neuro:'Algorithmic feeds exploit the same cognitive biases (novelty, social proof, loss aversion) that Vedanta identified as Maya — the veil over clear seeing.',color:'violet'},

  // Chapter 8 — Aksara Brahma Yoga
  {id:'g16',chapter:8,verse:'8.7',sanskrit:'तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च',translation:'Therefore, at all times, remember Me and fight. With mind and intellect fixed on Me, you shall surely come to Me.',reflection:'Constant remembrance transforms action. Whatever you do — code, cook, walk — do it with awareness. This is the practice woven into life.',theme:'Constant Awareness · Smriti',neuro:'Sustained mindful awareness increases gamma wave coherence across the brain, indicating integrated conscious processing rather than fragmented attention.',color:'saffron'},

  // Chapter 9 — Raja Vidya Yoga
  {id:'g17',chapter:9,verse:'9.22',sanskrit:'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते',translation:'To those who worship Me alone, thinking of no other, who are ever united with Me — I provide what they lack and preserve what they have.',reflection:'Single-pointed devotion. In an age of infinite tabs, the power lies in closing all but one. Focus is worship. Distraction is desecration.',theme:'Single-Pointed Focus',neuro:'Sustained attention on a single object increases prefrontal cortex gray matter density. Multitasking reduces cognitive capacity by up to 40%.',color:'forest'},

  // Chapter 10 — Vibhuti Yoga
  {id:'g18',chapter:10,verse:'10.22',sanskrit:'वेदानां सामवेदोऽस्मि देवानामस्मि वासवः',translation:'Among the Vedas, I am the Sama Veda; among the gods, I am Indra. Among the senses, I am the mind; and among living beings, I am consciousness.',reflection:'Consciousness is the highest faculty. Not processing speed, not information access — pure awareness. Protect it above all else.',theme:'Consciousness · The Supreme Faculty',neuro:'Consciousness is the brain\'s most metabolically expensive function. Protecting attentional resources preserves the highest cognitive capacity.',color:'indigo'},

  // Chapter 11 — Vishvarupa Darshana
  {id:'g19',chapter:11,verse:'11.33',sanskrit:'तस्मात्त्वमुत्तिष्ठ यशो लभस्व',translation:'Therefore, arise and attain glory. Conquer your enemies. Enjoy a prosperous kingdom. By Me alone have they already been slain.',reflection:'The obstacles are already defeated — you just need to show up. The neural pathways WILL rewire. The habits WILL form. Stand up and begin.',theme:'Arising · Taking Action',neuro:'Motor preparation studies show that the brain "pre-solves" challenges before conscious action. Neural readiness potential precedes voluntary movement.',color:'saffron'},

  // Chapter 12 — Bhakti Yoga
  {id:'g20',chapter:12,verse:'12.13',sanskrit:'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च',translation:'One who is free from malice toward all beings, friendly and compassionate, free from ego and possessiveness, equal in pain and pleasure, forgiving —',reflection:'The character blueprint for the awakened individual. Not achievement metrics — character qualities. Not followers — friendliness. Not influence — compassion.',theme:'Character · True Metrics',neuro:'Compassion meditation increases activity in the temporoparietal junction, enhancing perspective-taking and reducing narcissistic self-referencing.',color:'forest'},

  // Chapter 13 — Kshetra Kshetrajna Yoga
  {id:'g21',chapter:13,verse:'13.2',sanskrit:'क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत',translation:'Know Me as the Knower of the Field in all fields, O Bharata. The knowledge of both the Field and the Knower of the Field — that I consider true knowledge.',reflection:'The body is the field (kshetra). The awareness observing it is the knower (kshetrajna). The phone is part of the field. You are the knower. Remember the difference.',theme:'Observer vs Observed',neuro:'The distinction between sensory processing (field) and metacognition (knower) maps to the difference between first-order and higher-order consciousness.',color:'violet'},

  // Chapter 14 — Gunatraya Vibhaga
  {id:'g22',chapter:14,verse:'14.22',sanskrit:'प्रकाशं च प्रवृत्तिं च मोहमेव च पाण्डव',translation:'Light, activity, and delusion — when they arise, one who neither hates nor desires them, who sits as a witness unmoved — that one has transcended the gunas.',reflection:'Sattva (clarity), Rajas (agitation), Tamas (lethargy) — all three states cycle through your day. The practice: witness them all without preference.',theme:'Witness · Beyond the Gunas',neuro:'State-monitoring without intervention (metacognitive awareness) activates the medial prefrontal cortex, the seat of self-referential processing.',color:'indigo'},

  // Chapter 15 — Purushottama Yoga
  {id:'g23',chapter:15,verse:'15.15',sanskrit:'सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च',translation:'I am seated in the hearts of all. From Me come memory, knowledge, and their removal. I alone am to be known through all the Vedas.',reflection:'Memory and knowledge arise from the deepest layer of consciousness. When you cannot remember what you read — it is not a brain problem. It is an attention problem.',theme:'Memory · Deep Knowing',neuro:'The hippocampus, seat of memory consolidation, requires theta-wave states for encoding. Digital interruption fragments theta rhythms by up to 70%.',color:'wine'},

  // Chapter 16 — Daivasura Sampad Vibhaga
  {id:'g24',chapter:16,verse:'16.21',sanskrit:'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः',translation:'Triple is the gate of hell, destructive of the self — lust, anger, and greed. Therefore, one should abandon these three.',reflection:'The three gates of self-destruction: kama (craving), krodha (rage), lobha (greed). Social media exploits all three simultaneously. Recognize the gates.',theme:'Three Poisons · Digital Exploitation',neuro:'Craving, anger, and greed activate overlapping circuits in the ventral striatum, amygdala, and orbitofrontal cortex — the same circuits targeted by addictive design.',color:'wine'},

  // Chapter 17 — Shraddhatraya Vibhaga
  {id:'g25',chapter:17,verse:'17.16',sanskrit:'मनः प्रसादः सौम्यत्वं मौनमात्मविनिग्रहः',translation:'Serenity of mind, gentleness, silence, self-restraint, and purity of thought — these are called the austerity of the mind.',reflection:'Mental austerity is not deprivation — it is curation. Choose what enters the mind with the same care you would choose food for the body.',theme:'Mental Austerity · Tapas',neuro:'Mental discipline practices increase white matter integrity in the corpus callosum, improving interhemispheric communication and cognitive flexibility.',color:'forest'},

  // Chapter 18 — Moksha Sannyasa Yoga
  {id:'g26',chapter:18,verse:'18.37',sanskrit:'यत्तदग्रे विषमिव परिणामेऽमृतोपमम्',translation:'That which seems like poison in the beginning but is like nectar in the end — that happiness born of the clarity of self-knowledge is declared to be sattvic.',reflection:'Sitting in silence feels like poison at first. Boredom feels unbearable. But the nectar comes. The clarity, the peace, the self-knowledge — they come.',theme:'Sattvic Happiness · Delayed Reward',neuro:'Delayed gratification activates the ventromedial prefrontal cortex, building the neural architecture for long-term well-being over short-term pleasure.',color:'forest'},
  {id:'g27',chapter:18,verse:'18.54',sanskrit:'ब्रह्मभूतः प्रसन्नात्मा न शोचति न काङ्क्षति',translation:'One who is established in Brahman, serene in the Self, neither grieves nor desires. Being equal to all beings, one attains supreme devotion to Me.',reflection:'The end state: no craving, no aversion. Not numbness — fullness. The mind resting in its own nature, needing nothing from the external world.',theme:'Liberation · Brahma-Sthiti',neuro:'Advanced meditators show decreased default mode network activity during rest, indicating reduced self-referential rumination and increased present-moment awareness.',color:'violet'},
  {id:'g28',chapter:18,verse:'18.63',sanskrit:'इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया',translation:'Thus I have taught you the most secret of all knowledge. Reflect on it fully, and then do as you wish.',reflection:'The ultimate freedom: after receiving all knowledge, Krishna says "do as you wish." Not command — invitation. Wisdom is never imposed. It is recognized.',theme:'Freedom · Ultimate Choice',neuro:'Autonomous decision-making following deep reflection shows the strongest neural commitment patterns, activating both dorsolateral PFC and ventromedial PFC.',color:'saffron'},

  // Additional cross-chapter teachings
  {id:'g29',chapter:2,verse:'2.22',sanskrit:'वासांसि जीर्णानि यथा विहाय',translation:'As a person casts off worn-out garments and puts on new ones, so does the embodied Self cast off worn-out bodies and enter new ones.',reflection:'Identity is fluid. The person you were before screens is not gone — merely wearing a different garment. The Self beneath is unchanged and changeable.',theme:'Identity · Impermanence of Form',neuro:'Narrative identity is a prefrontal construction that can be deliberately rewritten through cognitive reappraisal — a form of neural "garment change."',color:'indigo'},
  {id:'g30',chapter:3,verse:'3.21',sanskrit:'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः',translation:'Whatever a great person does, common people follow. Whatever standards they set, the world follows.',reflection:'Your practice is not just for you. When you put down the phone, others notice. When you sit in silence, you give permission. Be the signal.',theme:'Leadership · Setting Standards',neuro:'Mirror neurons fire when observing others\' behaviors. Modeling focused attention creates social contagion effects — silence can spread like virality.',color:'saffron'},
  {id:'g31',chapter:6,verse:'6.6',sanskrit:'बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः',translation:'For one who has conquered the self by the self, the self is a friend. But for one who has not conquered the self, the self acts as an enemy.',reflection:'The unconquered mind scrolls. The conquered mind creates. The unconquered mind reacts. The conquered mind responds. Which self is in charge right now?',theme:'Self-Conquest · Inner Victory',neuro:'Executive function — the ability of the PFC to override limbic impulses — is the neural correlate of self-conquest. It strengthens with every conscious override.',color:'wine'},
];

// Full-year pool (365 verses, chapters 1→18). Generated by
// scripts/build-gita-365.mjs — falls back to the curated 31 until generated.
import { GITA_365 } from './gita-365';

/** The active teaching pool: 365-day journey if generated, else curated 31. */
export function getTeachingPool(): GitaTeaching[] {
  return GITA_365.length > 0 ? GITA_365 : GITA_TEACHINGS;
}

function dayOfYearOf(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Returns today's Gita teaching based on the calendar date —
 * everyone is on the same lesson each day. With the full 365 pool,
 * Jan 1 = Chapter 1 and Dec 31 = Chapter 18: a year-long journey.
 */
export function getTodaysTeaching(): GitaTeaching {
  return getTeachingForDate(new Date());
}

/** Today's teaching plus day-of-year and pool size, for display. */
export function getTodaysTeachingMeta(): { teaching: GitaTeaching; dayOfYear: number; poolSize: number } {
  const pool = getTeachingPool();
  const dayOfYear = dayOfYearOf(new Date());
  return { teaching: pool[(dayOfYear - 1 + pool.length) % pool.length], dayOfYear, poolSize: pool.length };
}

/**
 * Returns the teaching for a specific date
 */
export function getTeachingForDate(date: Date): GitaTeaching {
  const pool = getTeachingPool();
  const idx = (dayOfYearOf(date) - 1 + pool.length) % pool.length;
  return pool[idx];
}

/**
 * Get the next N upcoming teachings after today
 */
export function getUpcomingTeachings(count: number): GitaTeaching[] {
  const teachings: GitaTeaching[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const future = new Date(now);
    future.setDate(future.getDate() + i);
    teachings.push(getTeachingForDate(future));
  }
  return teachings;
}
