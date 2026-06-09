/**
 * Sattvic Diet & Gut-Brain Axis data — extracted from Content Bible §07.
 * Used in the Science page "Diet" tab.
 */

export interface DietItem {
  name: string;
  vedic: string;
  devaLabel: string;
  effect: string;
  evidence: string;
  good: boolean;
}

export const DIET_DATA: DietItem[] = [
  { name: 'Ghee (clarified butter)', vedic: 'Sattvic Rasayana', devaLabel: 'सत्त्व', effect: 'Butyrate = primary fuel for gut-lining cells. Reduces neuroinflammation. Improves BBB integrity.', evidence: 'Bourassa et al. (2016) Neuropharmacology', good: true },
  { name: 'Turmeric + Black Pepper', vedic: 'Sacred Spice', devaLabel: 'हरिद्रा', effect: 'Curcumin (with piperine for 2000% bioavailability) crosses BBB. Reduces beta-amyloid. BDNF increase.', evidence: 'Lopresti (2022) Nutrients · 50+ RCTs', good: true },
  { name: 'Ashwagandha', vedic: 'Horse Power Herb', devaLabel: 'अश्वगन्धा', effect: 'Adaptogen. Reduces cortisol 27.9%. Increases testosterone. Improves VO2 max. Thyroid-stimulating.', evidence: 'Chandrasekhar et al. (2012) IJAM · Charaka Samhita', good: true },
  { name: 'Brahmi / Bacopa monnieri', vedic: 'Herb of Brahma', devaLabel: 'ब्राह्मी', effect: '9 RCTs show improved memory formation, reduced anxiety, acetylcholinesterase inhibition.', evidence: 'Calabrese et al. (2008) Psychopharmacology', good: true },
  { name: 'Fermented foods (curd/lassi)', vedic: 'Sacred Ferment', devaLabel: 'दधि', effect: 'Lactobacillus increases GABA signalling. 4-week consumption reduces anxiety 40%.', evidence: 'Bravo et al. (2011) PNAS · Alcock et al. (2014)', good: true },
  { name: 'Ultra-processed food', vedic: 'Tamasic', devaLabel: 'तामस', effect: 'Disrupts microbiome within 72hrs. Reduces Lactobacillus, increases inflammatory LPS. Mood crashes.', evidence: 'Sonnenburg & Bäckhed (2016) Nature', good: false },
  { name: 'Excessive caffeine', vedic: 'Rajasic stimulant', devaLabel: 'रजस', effect: 'Adenosine receptor blockade without clearing adenosine debt. Borrowed energy. Anxiety amplifier.', evidence: 'Walker (2017) · Matthew Walker Sleep Research', good: false },
];

/**
 * ADHD & Algorithm Damage — 7 documented neural trade-offs with Vedic antidotes.
 * From Content Bible §08.
 */
export interface ADHDTradeoff {
  tradeoff: string;
  damagePct: string;
  vedicDiagnosis: string;
  antidotePractice: string;
}

export const ADHD_DATA: ADHDTradeoff[] = [
  { tradeoff: 'ACC over dlPFC (deep focus)', damagePct: '78%', vedicDiagnosis: 'मनस् over बुद्धि', antidotePractice: 'Naam Jap · Trataka · Reading' },
  { tradeoff: 'Transactive memory', damagePct: '82%', vedicDiagnosis: 'Chitta overloaded', antidotePractice: 'Handwriting · Memorisation' },
  { tradeoff: 'Ventral over dorsal attention', damagePct: '85%', vedicDiagnosis: 'Indriya-dosh', antidotePractice: 'Trataka · Unreachable Hour' },
  { tradeoff: 'DMN suppression', damagePct: '80%', vedicDiagnosis: 'Ahamkara unanchored', antidotePractice: '20-min silent meditation' },
  { tradeoff: 'Language → visual networks', damagePct: '75%', vedicDiagnosis: 'Vak-shakti degraded', antidotePractice: '1hr reading · Handwriting' },
  { tradeoff: 'Social > physical threat detection', damagePct: '88%', vedicDiagnosis: 'Bhaya state', antidotePractice: 'Pranayama · Equanimity practice' },
  { tradeoff: 'Cognitive prediction > motor skill', damagePct: '70%', vedicDiagnosis: 'Karma Yoga neglected', antidotePractice: 'Hand Work · Manual craft' },
];

export const ADHD_STATS = [
  { stat: '400%', label: 'ADHD Rise Since Smartphones', color: 'red' as const },
  { stat: '96×', label: 'Daily Phone Checks Average', color: 'gold' as const },
  { stat: '23 min', label: 'Lost Focus Per Interruption', color: 'red' as const },
  { stat: '8 wks', label: 'To Reverse With Practice', color: 'jade' as const },
];
