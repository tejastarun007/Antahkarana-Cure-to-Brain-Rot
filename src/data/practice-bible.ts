/**
 * Practice Bible — Deep-dive 3-pillar validation data for each practice.
 * Extracted from the Antahkarana Content Bible.
 * Each entry maps to a HABITS id and provides Vedic source, scientific proof, and mechanism.
 */

export interface PracticePillar {
  label: string;
  text: string;
  source: string;
}

export interface EvidenceStat {
  stat: string;
  label: string;
  color: 'jade' | 'gold' | 'violet' | 'saffron' | 'red';
}

export interface PracticeDeepDive {
  habitId: string;
  transliteration: string;
  fullDesc: string;
  pillars: PracticePillar[];
  evidence: EvidenceStat[];
  antidote: string;
  quote?: { sanskrit: string; translation: string; source: string };
}

export const PRACTICE_BIBLE: PracticeDeepDive[] = [
  {
    habitId: 'walk',
    transliteration: 'Vāyu-Sevana — Service of Wind/Air',
    fullDesc: '45 minutes of silent walking without a device. Not exercise — sensory recalibration. The eyes adjust to variable depth. The ears process ambient sound. The nervous system relearns a pace it evolved for over 200,000 years.',
    pillars: [
      { label: 'Vedic Source', text: 'Charaka Samhita (600 BCE) prescribes Vāyu-Sevana as morning practice. Sushruta Samhita adds it as treatment for unmada (mental disturbance). Ayurveda classifies it as Rasayana — life-extension practice.', source: 'Charaka Samhita · Sutrasthana 5.91 · ~600 BCE' },
      { label: 'Scientific Proof', text: 'Erickson et al., PNAS 2011: 1 year aerobic walking grows hippocampal volume by 2%. Restores locus coeruleus firing from sharp-burst (digital) to slow-tonic (natural). dlPFC re-thickens measurably.', source: 'Erickson et al. (2011) PNAS · University of Pittsburgh' },
      { label: 'Mechanism', text: 'BDNF (brain-derived neurotrophic factor) release during rhythmic movement. Norepinephrine restored. +25% cognitive restoration. Also restores ventral-dorsal attention balance disrupted by screen use.', source: 'Cotman & Berchtold (2002) · Trends in Neurosciences' },
    ],
    evidence: [
      { stat: '2%', label: 'Hippocampal Volume Gain', color: 'jade' },
      { stat: '45 min', label: 'Minimum Daily Dose', color: 'gold' },
      { stat: '21 days', label: 'To Measurable Change', color: 'jade' },
    ],
    antidote: 'ACC-over-dlPFC dominance, suppressed DMN, locus coeruleus dysregulation, phonological dopamine spikes',
  },
  {
    habitId: 'read',
    transliteration: 'Svādhyāya — Self-Study / Study of Sacred Texts',
    fullDesc: '1 hour of uninterrupted reading — physical book preferred, long-form text minimum. Not articles. Not summaries. The act of following a sustained argument over 60+ minutes is itself a neurological intervention.',
    pillars: [
      { label: 'Vedic Source', text: 'Patanjali Yoga Sutras 2.44: "Svādhyāyād iṣṭa-devatā-samprayogaḥ" — through self-study comes union with one\'s chosen deity (highest intelligence). One of the 5 Niyamas of Ashtanga Yoga.', source: 'Patanjali Yoga Sutras · 2.44 · ~400 CE compilation' },
      { label: 'Scientific Proof', text: 'Berns et al. (2013): sustained fiction reading strengthens neural connectivity in the left angular gyrus. Broca\'s area reactivates. Language networks — atrophied 75% by visual-over-language shift — begin to recover.', source: 'Berns, Blaine et al. (2013) Brain Connectivity' },
      { label: 'Sanskrit Effect', text: 'Dr. James Hartzell (2018) in Scientific American: MRI scans show memorising Vedic texts grows grey matter density in the hippocampus, temporal cortex, and Broca\'s area — the exact regions atrophied by transactive memory.', source: 'Hartzell (2018) Scientific American' },
    ],
    evidence: [
      { stat: '+34%', label: 'Language Network Restoration', color: 'violet' },
      { stat: '1 hr', label: 'Minimum Session', color: 'gold' },
      { stat: '8 wks', label: 'Grey Matter Change', color: 'jade' },
    ],
    antidote: 'Transactive memory (82% shifted), visual-language network collapse, attention span erosion, shallow encoding',
    quote: { sanskrit: 'स्वाध्यायात् मोक्षः', translation: 'Through self-study comes liberation.', source: 'Taittiriya Upanishad · 1.9.1 · ~800 BCE' },
  },
  {
    habitId: 'meditation',
    transliteration: 'Dhāraṇā into Dhyāna — Concentration into Meditation',
    fullDesc: 'Sit. Fix attention on a single point: breath at the nostril, a candle flame, a mantra sound. When attention wanders, notice it without judgment and return. This noticing-and-returning IS the practice. It is a bicep curl for the prefrontal cortex.',
    pillars: [
      { label: 'Vedic Source', text: 'Patanjali Yoga Sutras 3.1–3: Dharana (fixing the mind), Dhyana (unbroken flow of attention), Samadhi (absorption) — described as a progressive deepening of the same act.', source: 'Patanjali Yoga Sutras · 3.1–3 · ~400 CE' },
      { label: 'Scientific Proof', text: 'IISc Bangalore (2026): long-term meditators show measurably stronger gamma oscillations and superior inhibitory circuit function. Luders et al. (2015): 20+ years of meditation produces significant cortical thickness increases.', source: 'IISc Bangalore (2026) · Luders et al. (2015) NeuroImage' },
      { label: 'ADHD Mechanism', text: 'Zylowska et al. (2008): 8-week mindfulness training reduced ADHD symptoms by 30% in adults. Every return of attention strengthens the anterior cingulate cortex — the exact region most impaired in ADHD.', source: 'Zylowska et al. (2008) Journal of Attention Disorders' },
    ],
    evidence: [
      { stat: '+28%', label: 'Gamma Oscillations', color: 'gold' },
      { stat: '-30%', label: 'ADHD Symptoms', color: 'violet' },
      { stat: '20 min', label: 'Minimum Daily', color: 'jade' },
    ],
    antidote: 'ADHD attention drift, ACC-over-dlPFC dominance, anterior cingulate atrophy, screen-fragmented attention',
    quote: { sanskrit: 'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्', translation: 'Wherever the restless, unsteady mind wanders — from there bring it back, again and again, under the control of the self alone.', source: 'Bhagavad Gita · 6.26' },
  },
  {
    habitId: 'pranayama',
    transliteration: 'Nāḍī Śodhana — Channel Purification',
    fullDesc: 'Close right nostril, inhale left 4 counts. Hold 16. Exhale right 8. Repeat alternate sides. Ratio 1:4:2. This specific ratio activates the parasympathetic nervous system with surgical precision.',
    pillars: [
      { label: 'Vedic Source', text: 'Hatha Yoga Pradipika 2.7–10 (1450 CE): "When all the nadis which are full of impurities become purified, then the yogi becomes fit to practise pranayama." Patanjali YS 2.49–51 codifies it as the 4th limb.', source: 'Hatha Yoga Pradipika · 2.7–10 · ~1450 CE' },
      { label: 'Scientific Proof', text: 'Telles et al. (1994): Nadi Shodhana reduces cortisol by 22%, increases spatial memory by 84% in 10-session study. Raghuraj & Telles (2008): right nostril = sympathetic; left nostril = parasympathetic.', source: 'Telles et al. (1994) · Raghuraj & Telles (2008) Indian J Physiol Pharmacol' },
      { label: 'Mechanism', text: 'Baroreflex arc activation. Left nostril→ right brain (spatial, emotional). Right nostril→ left brain (analytical). Alternating forces bilateral hemispheric synchronisation. Theta-alpha synchrony within 8 minutes.', source: 'Shannahoff-Khalsa (2006) · Brain and Cognition' },
    ],
    evidence: [
      { stat: '-22%', label: 'Cortisol Reduction', color: 'jade' },
      { stat: '+84%', label: 'Spatial Memory', color: 'gold' },
      { stat: '8 min', label: 'To Theta-Alpha Synchrony', color: 'jade' },
    ],
    antidote: 'Amygdala hyperreactivity (88%), cortisol overload, bilateral brain disconnection, ADHD attention drift',
    quote: { sanskrit: 'चले वाते चलं चित्तम् निश्चले निश्चलं भवेत्', translation: 'When breath moves, the mind moves. When breath is still, the mind becomes still.', source: 'Hatha Yoga Pradipika · 2.2 · ~1450 CE' },
  },
  {
    habitId: 'namjap',
    transliteration: 'Japa — Repetition of the Sacred Name',
    fullDesc: 'Silent or whispered repetition of a chosen mantra — OM, a deity name, or a personal mantra — 108 times minimum (one mala). The fixed ratio of repetition is the exact antithesis of the variable-ratio reward that makes apps addictive.',
    pillars: [
      { label: 'Vedic Source', text: 'Japa is one of the 9 forms of Bhakti and is prescribed in Bhagavata Purana as the primary sadhana for Kali Yuga. Every major Hindu, Buddhist, and Jain tradition independently converged on this practice.', source: 'Bhagavata Purana · Skandha 7 · ~900 CE' },
      { label: 'Sanskrit Effect', text: 'Dr. James Hartzell (2018) Scientific American: MRI scans of Brahmin pandits who memorise and recite Vedic mantras show measurably increased grey matter density in the hippocampus, bilateral temporal cortices, and occipital regions.', source: 'Hartzell (2018) Scientific American · The Sanskrit Effect' },
      { label: 'Mechanism', text: 'Fixed-ratio reward schedule (vs variable-ratio of social media) trains stable dopamine baseline rather than spike-crash cycles. Rhythmic repetition at 0.1 Hz entrains the baroreflex at its resonant frequency.', source: 'Bernardi et al. (2001) BMJ · Heart Rate Variability Research' },
    ],
    evidence: [
      { stat: '+grey', label: 'Hippocampal Density', color: 'gold' },
      { stat: '108', label: 'Minimum Repetitions', color: 'jade' },
      { stat: 'fixed', label: 'Ratio Reward vs Variable', color: 'violet' },
    ],
    antidote: 'Variable-ratio dopamine loops (app addiction), transactive memory decay, HRV dysregulation, hippocampal atrophy',
    quote: { sanskrit: 'ॐ नमः शिवाय', translation: 'OM at 136.1 Hz matches Earth\'s resonant frequency (Schumann resonance). Soham synchronises with natural breath at 5–6 breaths/minute.', source: 'Bernardi et al. (2001) BMJ' },
  },
  {
    habitId: 'handwork',
    transliteration: 'Karma Yoga — Action as Worship',
    fullDesc: '20–40 minutes of skilled manual activity: cooking, repair, craft, drawing, pottery, knitting, carpentry. The hands are the brain\'s second headquarters — 25% of the motor cortex is dedicated to hand movement alone.',
    pillars: [
      { label: 'Vedic Source', text: 'Bhagavad Gita 3.8: "Niyataṃ kuru karma tvaṃ karma jyāyo hyakarmaṇaḥ" — "Do your prescribed duty, for action is better than inaction." Karma Yoga teaches that manual work done with attention is a path to samadhi.', source: 'Bhagavad Gita · 3.8 · ~500–200 BCE' },
      { label: 'Scientific Proof', text: 'SVYASA Psychology Lab (2024): yoga-based manual therapy restores motor-cognitive integration. Crawford (1993): craft activities activate the prefrontal-parietal network — identical to deep meditation states in EEG.', source: 'SVYASA Bangalore (2024) · Crawford (1993) Biofeedback' },
      { label: 'Mechanism', text: 'Corrects the 70% shift toward cognitive prediction over motor execution. Cerebellar-prefrontal connectivity restored. Grip strength correlates directly with cognitive longevity.', source: 'Csikszentmihalyi (1990) · British Medical Journal (2015)' },
    ],
    evidence: [
      { stat: '25%', label: 'Motor Cortex for Hands', color: 'gold' },
      { stat: '70%', label: 'Cognitive-Motor Imbalance', color: 'saffron' },
      { stat: '20 min', label: 'Minimum Daily', color: 'jade' },
    ],
    antidote: 'Motor-cognitive imbalance, passive consumption, dissociation from physical world, cerebellar atrophy',
  },
  {
    habitId: 'sleep',
    transliteration: 'Rātri Sādhana — Night Practice',
    fullDesc: 'Sleep before 10:30 PM. Wake without alarm at natural light. No screens 90 minutes before sleep. The glymphatic system — which clears neurotoxic waste — operates primarily during slow-wave sleep.',
    pillars: [
      { label: 'Vedic Source', text: 'Charaka Samhita Sutrasthana 21: prescribes sleep before the second prahar (~10 PM) as essential for ojas (vital essence) regeneration. "One who sleeps late loses prana, ojas, and clarity of mind."', source: 'Charaka Samhita · Sutrasthana 21 · ~600 BCE' },
      { label: 'Scientific Proof', text: 'Walker (2017) "Why We Sleep": deep sleep before midnight produces 10–15× more growth hormone than after midnight. Xie et al. (2013) Science: glymphatic system clears neurotoxic waste 60% more efficiently during deep sleep.', source: 'Walker (2017) · Xie et al. (2013) Science' },
      { label: 'Mechanism', text: 'The brain\'s interstitial space expands by 60% during deep sleep, allowing CSF to flush through and clear metabolic waste. Every night of poor sleep is a measurable accumulation of neurotoxic waste.', source: 'Iliff et al. (2012) Science Translational Medicine' },
    ],
    evidence: [
      { stat: '60%', label: 'More Efficient Waste Clearance', color: 'jade' },
      { stat: '10:30', label: 'Latest Sleep Time', color: 'gold' },
      { stat: '+31%', label: 'Cognitive Restoration', color: 'red' },
    ],
    antidote: 'Neurotoxic waste accumulation, cognitive fog, long-term Alzheimer\'s risk, hormonal dysregulation',
  },
  {
    habitId: 'silence',
    transliteration: 'Mauna — Sacred Silence',
    fullDesc: 'Not do-not-disturb. Genuinely unreachable for one full hour. The Default Mode Network cannot fire while you remain reachable. One full unreachable hour daily is the minimum threshold for meaningful DMN recovery.',
    pillars: [
      { label: 'Vedic Source', text: 'Mauna (silence) is prescribed in every major tradition. Bhagavad Gita 17.16: "Serenity of mind, gentleness, silence, self-restraint, purity of heart — these constitute mental austerity."', source: 'Bhagavad Gita · 17.16 · ~500–200 BCE' },
      { label: 'Scientific Proof', text: 'SVYASA fNIRS (2024): yoga reshapes brain microstates within 8 weeks. The DMN — governing self-reflection, creativity, identity — requires zero-input time to fire. Constant reachability suppresses it by 80%.', source: 'SVYASA fNIRS (2024) · DMN Research' },
      { label: 'Mechanism', text: 'Every notification, even anticipated ones, activates the ACC and amygdala. Genuine unreachability removes the anticipation circuit entirely, allowing the prefrontal-DMN axis to restore. Mark et al. (2016): each interruption costs 23 minutes of refocusing.', source: 'Mark et al. (2016) CHI Conference' },
    ],
    evidence: [
      { stat: '80%', label: 'DMN Suppression Rate', color: 'violet' },
      { stat: '23 min', label: 'Lost per Interruption', color: 'saffron' },
      { stat: '1 hr', label: 'Minimum Unreachable', color: 'jade' },
    ],
    antidote: 'DMN suppression, identity fragmentation, creative atrophy, anticipation anxiety',
  },
  {
    habitId: 'writing',
    transliteration: 'Lekhanam — The Act of Writing by Hand',
    fullDesc: '15–30 minutes of physical handwriting daily. Not typing. The pen-to-paper motor loop encodes information into the hippocampus through a pathway that keyboards cannot replicate.',
    pillars: [
      { label: 'Vedic Source', text: 'Manusmriti & Gurukula tradition: all learning was transmitted through likhana (writing) and shravana (listening) combined. The student wrote in sand, then on palm leaf, then from memory.', source: 'Gurukula Pedagogy · Manusmriti 2.69 · ~200 BCE' },
      { label: 'Scientific Proof', text: 'Mueller & Oppenheimer (2014) Psychological Science: longhand writers show superior conceptual understanding vs typists — forced paraphrasing creates deeper encoding. EEG shows stronger theta waves during handwriting.', source: 'Mueller & Oppenheimer (2014) Psych. Science' },
      { label: 'Mechanism', text: 'Fine motor activation stimulates the reticular activating system, increasing alertness. Hippocampal episodic encoding 40% deeper than digital input. Expressive writing (Pennebaker, 1997) reduces cortisol and improves immune markers.', source: 'Pennebaker (1997) · JAMA' },
    ],
    evidence: [
      { stat: '+40%', label: 'Hippocampal Encoding Depth', color: 'gold' },
      { stat: '15 min', label: 'Minimum Daily', color: 'jade' },
      { stat: '-cortisol', label: 'Expressive Writing Effect', color: 'jade' },
    ],
    antidote: 'Transactive memory collapse, motor-cognitive integration loss, emotional dysregulation, shallow digital encoding',
  },
  {
    habitId: 'bhramari',
    transliteration: 'Bhramari — The Bee Breath',
    fullDesc: 'Inhale deeply. On exhale, make a sustained humming sound with mouth closed, fingers gently pressing on eyes/temples. 5–10 repetitions. The internal vibration stimulates the vagus nerve directly through bone conduction — the fastest known non-pharmaceutical vagal activator.',
    pillars: [
      { label: 'Vedic Source', text: 'Hatha Yoga Pradipika 2.68: "Making the sound of the humming bee… the yogi\'s mind dissolves into the highest brahman." Also described in Gheranda Samhita 5.78.', source: 'Hatha Yoga Pradipika · 2.68 · ~1450 CE' },
      { label: 'Scientific Proof', text: 'Pramanik et al. (2010): Bhramari significantly reduces systolic BP, heart rate, and respiratory rate. Nilima et al. (2019): 12-week practice reduces anxiety scores by 56% and sleep latency by 32%.', source: 'Nilima et al. (2019) Complement Ther Clin Pract' },
      { label: 'Mechanism', text: 'Humming generates 15× more nitric oxide in the nasal sinuses (Weitzberg & Lundberg, 2002). Nitric oxide is a vasodilator and neurotransmitter modulator. Activates vagus nerve via vibration of the brainstem floor.', source: 'Weitzberg & Lundberg (2002) American Journal of Respiratory Medicine' },
    ],
    evidence: [
      { stat: '15×', label: 'More Nitric Oxide', color: 'gold' },
      { stat: '-56%', label: 'Anxiety Reduction', color: 'violet' },
      { stat: '-32%', label: 'Sleep Latency', color: 'jade' },
    ],
    antidote: 'Sleep latency, chronic anxiety, hypertension, vagal tone deficit, news-induced cortisol spikes',
  },
  {
    habitId: 'trataka',
    transliteration: 'Trataka — To Gaze Steadily Without Blinking',
    fullDesc: 'Fix the gaze steadily on a candle flame at eye level, 60–90 cm away, without blinking, for 5–20 minutes. When tears come, close eyes and visualise the afterimage. This simultaneously trains both the visual attention network and the dorsal (non-reactive) attention system.',
    pillars: [
      { label: 'Vedic Source', text: 'Hatha Yoga Pradipika 2.31: "Trataka eradicates all eye diseases and removes sloth." One of the 6 Shatkarmas (purification kriyas). Also described in Gheranda Samhita as the highest of the 25 dharanas.', source: 'Hatha Yoga Pradipika · 2.31 · ~1450 CE' },
      { label: 'Scientific Proof', text: 'SVYASA Trataka research (2024): consistent Trataka practice significantly activates the dorsal attention network — the very network atrophied by smartphone use. EEG shows suppression of default-mode wandering within 6 minutes.', source: 'SVYASA Bangalore (2024) · Applied Psychophysiology Research' },
      { label: 'Mechanism', text: 'The sustained gaze without blinking is incompatible with the mind wandering — any thought causes a micro-movement of the eye. The practice trains inhibitory control — the primary executive function deficit in ADHD.', source: 'Joshi et al. (2020) · Journal of Traditional Medicine' },
    ],
    evidence: [
      { stat: '+40%', label: 'Inhibitory Control', color: 'gold' },
      { stat: '6 min', label: 'To DMN Suppression', color: 'saffron' },
      { stat: '15×', label: 'Natural Blink Rate Restored', color: 'jade' },
    ],
    antidote: 'Ventral attention dominance, dorsal network atrophy, screen-addiction eye patterns, inhibitory control deficits in ADHD',
  },
  {
    habitId: 'yoganidra',
    transliteration: 'Yoga Nidra — Yogic Sleep',
    fullDesc: '30–45 minute guided rotation of awareness through the body, followed by visualisation and intention setting (Sankalpa). Practised lying down. One session is equivalent in restorative value to 2–4 hours of ordinary sleep — confirmed by EEG delta wave measurement.',
    pillars: [
      { label: 'Vedic Source', text: 'Mandukya Upanishad (700 BCE) describes four states of consciousness: waking, dreaming, deep sleep, and the witness state (Turiya). Yoga Nidra deliberately enters and stabilises the hypnagogic transition — the doorway to Turiya.', source: 'Mandukya Upanishad · ~700 BCE' },
      { label: 'Scientific Proof', text: 'Kumar (2008) Yoga Mimamsa: Yoga Nidra produces delta brainwaves (0.5–4 Hz) — identical to deep sleep — while maintaining conscious awareness. Pandi-Perumal et al. (2022): 45-min session raises dopamine levels by 65%.', source: 'Pandi-Perumal et al. (2022) J Sleep Research' },
      { label: 'Mechanism', text: 'The body scan activates the thalamus to begin sleep-stage neurochemistry (adenosine clearance, GABA release) while the prefrontal cortex stays online. Sankalpa (intention) planted in this state has 10× penetration vs waking state.', source: 'Pandi-Perumal (2022) · Sleep Neuroscience' },
    ],
    evidence: [
      { stat: '+65%', label: 'Dopamine Restoration', color: 'gold' },
      { stat: '2–4×', label: 'Sleep Equivalence', color: 'jade' },
      { stat: 'Delta', label: 'Brainwaves Maintained', color: 'violet' },
    ],
    antidote: 'Dopamine depletion from digital overload, chronic fatigue, sleep debt, emotional exhaustion, brain rot',
  },
];

/** Lookup a deep-dive by habit ID */
export function getDeepDive(habitId: string): PracticeDeepDive | undefined {
  return PRACTICE_BIBLE.find(p => p.habitId === habitId);
}
