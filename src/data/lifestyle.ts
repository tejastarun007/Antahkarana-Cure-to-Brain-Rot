/**
 * lifestyle.ts — data for the Ahara diet module and One Small Change cards.
 */

export const SMALL_CHANGES = [
  { id: 'sc1', t: 'Charge your phone outside the bedroom.', why: 'Mere proximity of a phone measurably reduces working memory.', src: 'Ward et al., 2017' },
  { id: 'sc2', t: 'Switch your screen to grayscale.', why: 'Colour is the dopamine hook — grayscale cuts compulsive checking by ~20%.', src: 'UX field studies, 2018' },
  { id: 'sc3', t: 'No screens for 30 minutes after waking.', why: 'Feed-scrolling during the morning cortisol peak trains anxiety as your default state.', src: 'Circadian research, Stanford' },
  { id: 'sc4', t: 'One browser tab at a time.', why: 'Each open tab is an open cognitive loop taxing working memory.', src: 'Mark, UC Irvine' },
  { id: 'sc5', t: 'Turn off all non-human notifications.', why: 'Every ping is an attention tax. Only humans deserve to interrupt you.', src: 'Attention residue — Leroy, 2009' },
  { id: 'sc6', t: 'Keep a paper book within arm\'s reach.', why: 'Environment beats willpower. The nearest object wins the idle moment.', src: 'Behavioural design — Fogg, Stanford' },
  { id: 'sc7', t: 'Eat one meal a day with no screen.', why: 'Mindless eating doubles as mindless scrolling — both bypass the prefrontal cortex.', src: 'Mindful eating RCTs, Harvard' },
  { id: 'sc8', t: 'Set the phone to silent, face down, out of sight while working.', why: 'Visible phones reduce sustained attention even when untouched.', src: 'Thornton et al., 2014' },
];

export const DIET_TAGS = [
  {
    tag: 'sattvic' as const, em: '🌿', n: 'Sattvic', d: 'light · whole · fresh',
    msg: 'Clear mind fuel. Light, whole foods keep prefrontal glucose steady — attention holds longer.',
    col: 'var(--jade)',
  },
  {
    tag: 'rajasic' as const, em: '🔥', n: 'Rajasic', d: 'spicy · caffeinated · rushed',
    msg: 'Stimulation spikes, then crashes. Caffeine and sugar mimic the same dopamine loop you are training against.',
    col: 'var(--saffron2)',
  },
  {
    tag: 'tamasic' as const, em: '🌑', n: 'Tamasic', d: 'processed · heavy · stale',
    msg: 'Heavy load. Processed and fried foods raise the inflammation linked to brain fog and slower recall.',
    col: 'var(--violet2)',
  },
];

export const DAILY_SWAPS = [
  { swap: 'Trade the 4 pm energy drink for tulsi chai.', why: 'Same ritual, no beta-wave crash at 6.' },
  { swap: 'Swap dessert for a handful of soaked almonds.', why: 'Omega-3 and vitamin E support BDNF — the molecule of neuroplasticity.' },
  { swap: 'Replace one processed snack with seasonal fruit.', why: 'Stable glucose = stable attention. Spikes fragment focus.' },
  { swap: 'Drink a glass of water before every screen session.', why: 'Even 2% dehydration measurably reduces working memory.' },
  { swap: 'Move dinner 30 minutes earlier.', why: 'An earlier last meal deepens glymphatic clearance during sleep.' },
  { swap: 'Swap white rice for millets twice a week.', why: 'Slow-release carbs prevent the post-lunch attention slump.' },
  { swap: 'End one meal at 80% full (mitahara).', why: 'Lighter digestion leaves more blood flow for the prefrontal cortex.' },
];

/** Weekly index — same card for everyone all week, rotates weekly. */
export function weekIndex(len: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 3600 * 1000));
  return week % len;
}

/** Daily index — rotates daily. */
export function dayIndex(len: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const day = Math.floor((now.getTime() - start.getTime()) / (24 * 3600 * 1000));
  return day % len;
}
