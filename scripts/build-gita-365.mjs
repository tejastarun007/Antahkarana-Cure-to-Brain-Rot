#!/usr/bin/env node
/**
 * build-gita-365.mjs — generates src/data/gita-365.ts
 *
 * Selects 365 verses spread evenly across all 18 chapters (in order),
 * fetching authentic data from the open-source gita dataset (Unlicense):
 *   - Sanskrit + transliteration:  verse.json
 *   - English translation:        translation.json (Swami Sivananda)
 * Mirrors tried in order: ravisiyer.github.io (GitHub Pages), gita/gita raw.
 *
 * Reflections, themes and neuroscience bridges come from per-chapter pools
 * below. Where a verse matches one of the 31 hand-curated teachings in
 * gita-daily.ts, the curated text wins.
 *
 * Usage:  node scripts/build-gita-365.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, 'scripts', 'cache');
const OUT = join(ROOT, 'src', 'data', 'gita-365.ts');
const TARGET = 365;
const COLORS = ['saffron', 'indigo', 'forest', 'wine', 'violet'];

/* ───────────────────────── chapter pools ─────────────────────────
   theme: shown as the theme tag base · refl: [reflection, neuro] pairs
   cycled across the chapter's selected verses. */
const CHAPTERS = {
  1: { name: 'Arjuna Visada · The Collapse', refl: [
    ['Every transformation begins with a breakdown. Arjuna\'s collapse on the battlefield is the honest starting point — the moment the old way of coping visibly fails.', 'Acute emotional crisis activates the anterior insula and opens a rare window of heightened neuroplasticity — the brain is most rewireable exactly when it feels most broken.'],
    ['Naming the fear precisely is the first practice. Arjuna lists his symptoms — trembling, dry mouth, racing mind — long before he asks for wisdom.', 'Affect labeling — putting feelings into words — measurably reduces amygdala output and re-engages the prefrontal cortex (Lieberman, UCLA).'],
    ['The battlefield is attention itself. Two armies — habit and intention — face each other every morning when you reach for the phone.', 'Cue-reactivity studies show the first 90 seconds after waking set dopaminergic tone for hours. The opening battle of the day is real.'],
  ]},
  2: { name: 'Sankhya Yoga · The Eternal Witness', refl: [
    ['Sensations come and go — cold, heat, pleasure, pain, notification, silence. The one who watches them does not come and go. Train the witness.', 'Mindful observation without reaction reduces amygdala activation by ~23% and builds interoceptive accuracy — the foundation of emotional resilience.'],
    ['You own the action, never the outcome. This single inversion dissolves both anxiety before the task and craving after it.', 'Outcome detachment quiets dopaminergic anticipation loops — the exact circuitry infinite feeds exploit. Process focus correlates with 40% higher flow.'],
    ['Be the ocean, not the wave. Inputs will arrive endlessly; the practice is to remain the vast container, not the turbulence.', 'Long-term meditators show thickened insula and prefrontal cortex — the neural substrate of equanimity under stimulus load.'],
    ['Steady wisdom (sthitaprajna) is not suppression. It is a nervous system trained until storms pass through it without capsizing it.', 'Equanimity practice shrinks amygdala volume while thickening regulatory cortex within 8 weeks (MGH).'],
  ]},
  3: { name: 'Karma Yoga · Action Without Hooks', refl: [
    ['Action is unavoidable — even refusing to act is an act. The choice is never whether to act but whether the act carries a hook of craving.', 'Behavioural activation outperforms rumination for mood repair; the acting brain routes around the rumination loops of the default network.'],
    ['You are not the doer; nature acts through you. Held lightly, this dissolves performance anxiety at its root.', 'The "self-as-doer" is a neural construction of the DMN. Loosening it reduces self-referential rumination measurably.'],
    ['What the excellent person does, others follow. Your phone face-down on the table silently gives a whole room permission.', 'Mirror-neuron systems make focused calm socially contagious — attention habits spread through groups like accent or mood.'],
  ]},
  4: { name: 'Jnana Yoga · Knowledge That Burns', refl: [
    ['Knowledge — not information — purifies. Information accumulates; knowledge integrates. The difference is depth of processing.', 'Deep semantic processing engages hippocampal encoding and builds lasting architecture; skimming engages only transactive indexing.'],
    ['Whenever dharma declines, a corrective arises. In an age of engineered distraction, the ancient attention disciplines resurface as the antidote.', 'Civilisational stress triggers collective adaptation: contemplative practice adoption is growing fastest among the most screen-saturated cohorts.'],
    ['As fire reduces wood to ash, knowledge of the real reduces compulsion to ash. See the loop clearly once, and it loses half its power.', 'Metacognitive insight — seeing the craving as an object — recruits the dlPFC and weakens cue-driven striatal response.'],
  ]},
  5: { name: 'Karma Sannyasa · Renunciation in Motion', refl: [
    ['The phone offers a thousand pleasures per hour, none lasting. The Self offers one — unbroken. Trade frequency for depth.', 'Hedonic adaptation guarantees external rewards decay; meditative states show sustained well-being markers without tolerance build-up.'],
    ['Shut the gates gently: eyes steady, breath even at the brows. The senses are not enemies — they are doors you may choose to close.', 'Controlled sensory gating via slow breathing raises vagal tone and stabilises the locus coeruleus firing pattern.'],
    ['The sage sees a scholar and a dog with the same eye. Equal vision is not indifference — it is attention freed from ranking everything.', 'Social-comparison processing in the vmPFC is metabolically expensive; equanimity training frees that budget for perception itself.'],
  ]},
  6: { name: 'Dhyana Yoga · The Discipline of Stillness', refl: [
    ['Lift yourself by your own self. No app will save you; you are both the problem and the solution. Begin.', 'Internal locus of control predicts 73% better habit-formation outcomes; the PFC rebuilds its regulatory circuits within 8 weeks.'],
    ['Wherever the restless mind wanders, bring it back. Again. And again. This — not bliss — is the entire practice.', 'Each "bring it back" is one repetition for the dorsal attention network. Focus is built exactly like muscle: reps under load.'],
    ['Moderation in food, sleep, work and play — yoga destroys sorrow for the one whose life has rhythm, not extremes.', 'Circadian regularity is the strongest non-pharmacological predictor of mood stability and executive function.'],
    ['A lamp in a windless place does not flicker. Build the windless place first — the unreachable hour, the empty room, the silent walk.', 'Environmental design beats willpower: removing cues lowers craving-circuit activation more reliably than resisting them.'],
  ]},
  7: { name: 'Jnana Vijnana · Knowing the Source', refl: [
    ['Among thousands, one strives; among strivers, one knows. The funnel is not talent — it is daily return to practice.', 'Skill consolidation follows spaced repetition; the rare expert is the common practitioner who simply did not stop.'],
    ['Earth, water, fire, air, ether, mind, intellect, ego — the eightfold field. You are the ninth thing: the one aware of all eight.', 'Distinguishing awareness from its contents maps to higher-order metacognition in the anterior PFC — trainable at any age.'],
    ['The four who seek: the distressed, the curious, the ambitious, the wise. All four doors open onto the same road. Start from whichever you are at.', 'Motivation type matters less than initiation: dopamine systems consolidate whatever loop is repeated, noble or not.'],
  ]},
  8: { name: 'Akshara Brahma · What You Remember, You Become', refl: [
    ['Whatever you dwell on at the end, that you become. And every night is a small death — what you scroll last, you carry into sleep.', 'Pre-sleep content is preferentially consolidated by the hippocampus during slow-wave sleep. The last 30 minutes write the deepest.'],
    ['Remember at every moment — practice and remembrance, abhyasa and smarana, are the entire method.', 'Memory reconsolidation means each recall re-writes the trace; daily remembrance literally re-sculpts identity networks.'],
    ['The closed gates, the held syllable Om, the upward attention — an ancient protocol for the final journey, usable every night.', 'The 4-8 breath with internal chanting induces theta onset — the gateway state between waking and sleep where encoding is deepest.'],
  ]},
  9: { name: 'Raja Vidya · The Open Secret', refl: [
    ['The royal secret is hidden in plain sight: whatever you offer fully — a leaf, a flower, a task — becomes sacred by the quality of attention you bring.', 'Single-tasking with full attention produces flow neurochemistry — norepinephrine, dopamine, anandamide — unavailable to divided attention.'],
    ['Even the worst-behaved, once resolved, must be counted as righteous — the resolve itself redraws the trajectory.', 'Identity-based habit change ("I am someone who...") outperforms outcome-based goals in long-term adherence studies.'],
    ['Those who worship anything with steadiness reach that thing. The feed-worshipper reaches the feed. Choose your deity with care.', 'Attention literally wires valuation: repeated orienting raises the striatal value-signal of whatever is attended.'],
  ]},
  10: { name: 'Vibhuti Yoga · The Divine in Excellence', refl: [
    ['Wherever you see brilliance — a perfect sentence, a master\'s stroke, dawn light — you are seeing a spark of the same source. Collect those sparks.', 'Awe experiences reduce DMN self-focus and inflammatory markers while increasing prosocial behaviour (Keltner, Berkeley).'],
    ['Among rivers the Ganga, among mountains the Himalaya, among words the single syllable. Excellence is concentrated essence — study it anywhere.', 'Expert-modeling activates mirror systems that pre-train motor and cognitive circuits before first practice.'],
    ['I am the intelligence of the intelligent, the radiance of the radiant. Your sharpest faculty is borrowed light — maintain the lamp.', 'Fluid intelligence tracks white-matter integrity, which responds to sleep, aerobic exercise and focused practice — the lamp is maintainable.'],
  ]},
  11: { name: 'Vishvarupa · Perspective Beyond Ego', refl: [
    ['Arjuna asks to see the whole, and the whole is almost unbearable. Perspective at full scale humbles every personal anxiety into proportion.', 'The overview effect — vastness perception — durably reduces self-referential processing and trait anxiety in astronauts and meditators alike.'],
    ['Time devours all — kalo\'smi. Seen clearly, this is not morbid; it is the sharpest possible argument against wasting attention.', 'Mortality salience, handled contemplatively rather than defensively, increases value-aligned decision making (terror-management research).'],
    ['After the vision, Arjuna asks for the familiar face again. The infinite is to be visited, not lived in — practice returns you to scale.', 'Integration after peak experience requires DMN re-engagement; journaling after intensity consolidates insight into narrative identity.'],
  ]},
  12: { name: 'Bhakti Yoga · Devotion as Attention', refl: [
    ['Devotion is attention made warm. Whatever holds your gaze daily, with affection, is already your practice — audit it honestly.', 'Attachment circuitry (oxytocin-dopamine) consolidates habits faster than discipline circuitry alone; warmth is an accelerant.'],
    ['If you cannot fix the mind steadily, practice. If you cannot practice, act for the sake of something larger. There is always a next rung.', 'Graded task laddering is the clinical gold standard for rebuilding executive function after attentional burnout.'],
    ['Friendly to all, free of possessiveness, even in pleasure and pain — the description of the beloved devotee is a clinical portrait of low reactivity.', 'Trait equanimity correlates with high heart-rate variability — the single best autonomic predictor of stress resilience.'],
  ]},
  13: { name: 'Kshetra · The Field and Its Knower', refl: [
    ['The body-mind is the field; you are the knower of the field. The phone is part of the field. Remember which one you are.', 'Metacognitive distancing — observing mind-states as objects — maps to higher-order PFC consciousness and is trainable in weeks.'],
    ['Humility, non-violence, steadiness, self-control — the Gita lists knowledge not as facts but as character traits. Knowing is being.', 'Trait-level change shows in resting-state connectivity: what you repeatedly practice becomes your baseline network.'],
    ['The same light shines in every field. Seeing the knower in others dissolves the social-threat lens that keeps the amygdala hot.', 'Common-identity framing reduces amygdala response to out-group faces within a single session (Van Bavel).'],
  ]},
  14: { name: 'Guna Traya · Three Weathers of the Mind', refl: [
    ['Clarity, agitation, dullness — sattva, rajas, tamas. All three will visit today. The practice is to witness the weather without becoming it.', 'State-monitoring without intervention activates the medial PFC and decouples mood from behaviour — the core of emotional granularity.'],
    ['Rajas binds through craving for action; tamas through heaviness; even sattva binds through attachment to clarity. Watch all three hands.', 'Even flow states create attachment loops; meta-awareness across states predicts flexibility better than time in any single state.'],
    ['The one who has crossed the gunas neither hates nor craves the states as they arise. Unmoved is not numb — it is full.', 'Advanced practitioners show reduced DMN reactivity with intact affective range: feeling everything, hooked by nothing.'],
  ]},
  15: { name: 'Purushottama · The Inverted Tree', refl: [
    ['The world-tree grows upside-down, roots above, branches below — and the feed is its newest branch. Cut with the axe of non-attachment, then seek the root.', 'Dependency graphs of habit run downward from identity; cutting at the level of identity ("I am not a scroller") prunes whole branches at once.'],
    ['A fragment of the eternal becomes the living being, drawing the senses around itself like a wind carrying scents from their seats.', 'The binding problem — one self from many senses — is solved by synchronised gamma; meditation strengthens exactly that synchrony.'],
    ['I am seated in every heart; from Me come memory, knowledge, and their loss. When you cannot remember what you read, it is an attention problem, not a brain problem.', 'Hippocampal encoding requires theta states that digital interruption fragments by up to 70%. Memory failure is upstream: at attention.'],
  ]},
  16: { name: 'Daivasura · Two Inheritances', refl: [
    ['Fearlessness, purity, steadfastness, compassion — the divine inheritance. Hypocrisy, arrogance, harshness — the compulsive one. Both are cultivated, neither is fate.', 'Trait plasticity research confirms character dimensions shift with deliberate practice at any adult age.'],
    ['Three gates of self-destruction: craving, rage, greed. Engineered feeds exploit all three at once. Recognise the gates and you need not enter.', 'Craving, anger and acquisitiveness share overlapping striatal-amygdala-OFC circuitry — the precise targets of persuasive design.'],
    ['Let the scriptures — tested knowledge, not impulse — be your authority in deciding what is to be done. Impulse is a lobbyist, not a judge.', 'Implementation intentions ("if X then I do Y") outsource decisions from depleted willpower to prepared circuitry.'],
  ]},
  17: { name: 'Shraddha · Faith Shapes the Instrument', refl: [
    ['Your faith makes you who you are. Not creed — but what you quietly trust enough to repeat daily. The feed is also a faith.', 'Repeated behaviour under belief consolidates striatal habit loops ~3x faster than behaviour without conviction (expectancy effects).'],
    ['Food, speech, austerity, gifts — each comes in three flavours: clarifying, agitating, dulling. Audit all four channels, not just the screen.', 'Diet, language environment and giving behaviour each independently shift mood-regulating neurochemistry — inputs are multi-channel.'],
    ['Speech that is true, pleasant and beneficial — and the silence that is study of the self. Austerity of speech includes the comment you did not post.', 'Verbal restraint engages the right vlPFC — the same inhibition muscle that resists the scroll. One practice, two wins.'],
  ]},
  18: { name: 'Moksha Sannyasa · The Final Freedom', refl: [
    ['Better your own dharma done imperfectly than another\'s done perfectly. Comparison is the thief of practice.', 'Social comparison activates pain-adjacent circuitry (dACC); purpose-aligned effort activates reward circuitry even under difficulty.'],
    ['What feels like poison at first and nectar in the end — that is sattvic happiness. The first silent week is the poison phase. Stay.', 'Delayed-reward training thickens the vmPFC; discomfort tolerance in week one predicts habit survival at month six.'],
    ['Reflect on this fully — then do as you wish. The Gita ends not with a command but with freedom. Wisdom is never imposed; it is recognised.', 'Autonomous choice after deliberation shows the strongest neural commitment signatures across dlPFC and vmPFC — freedom is the best fixative.'],
  ]},
};

/* ───────────────────────── data sources ───────────────────────── */
const SOURCES = {
  verse: [
    'https://ravisiyer.github.io/gita-data/v1/verse.json',
    'https://raw.githubusercontent.com/gita/gita/main/data/verse.json',
  ],
  translation: [
    'https://ravisiyer.github.io/gita-data/v1/translation.json',
    'https://raw.githubusercontent.com/gita/gita/main/data/translation.json',
  ],
};

async function fetchFirst(urls) {
  let lastErr;
  for (const u of urls) {
    try {
      process.stdout.write(`  fetching ${u} ... `);
      const r = await fetch(u);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      console.log(`ok (${Array.isArray(j) ? j.length : '?'} records)`);
      return j;
    } catch (e) { console.log('failed:', e.message); lastErr = e; }
  }
  throw lastErr;
}

async function fetchOrCache(name, urls) {
  const cachePath = join(CACHE, `${name}.json`);
  if (existsSync(cachePath)) {
    const raw = readFileSync(cachePath, 'utf8').trim();
    if (raw.length > 2) {
      const j = JSON.parse(raw);
      console.log(`  ${name}: loaded from cache (${Array.isArray(j) ? j.length : '?'} records)`);
      return j;
    }
  }
  return fetchFirst(urls);
}

/* ─────────────── curated overrides from gita-daily.ts ─────────────── */
function loadCuratedOverrides() {
  try {
    const src = readFileSync(join(ROOT, 'src', 'data', 'gita-daily.ts'), 'utf8');
    const m = src.match(/GITA_TEACHINGS[^=]*=\s*\[([\s\S]*?)\n\];/);
    if (!m) return {};
    // The array body is plain JS object literals — safe to eval in isolation.
    const arr = (0, eval)(`[${m[1]}]`);
    const map = {};
    for (const t of arr) map[t.verse] = t;
    console.log(`  curated overrides loaded: ${arr.length}`);
    return map;
  } catch (e) {
    console.log('  (no curated overrides:', e.message + ')');
    return {};
  }
}

/* ───────────────────────── helpers ───────────────────────── */
const cleanSanskrit = (t) =>
  String(t).replace(/।।\s*\d+\.\d+\s*।।/g, '').replace(/\s*\n+\s*/g, ' ').trim();

const cleanTranslation = (t) =>
  String(t).replace(/^\s*\d+\.\d+[.\s]*/,'').replace(/\s+/g, ' ').trim();

function pickEvenly(arr, k) {
  if (k >= arr.length) return arr.slice();
  if (k <= 0) return [];
  const out = [];
  const used = new Set();
  for (let i = 0; i < k; i++) {
    let idx = Math.round((i * (arr.length - 1)) / Math.max(1, k - 1));
    while (used.has(idx)) idx++;
    used.add(idx);
    out.push(arr[idx]);
  }
  return out;
}

/* ───────────────────────── main ───────────────────────── */
async function main() {
  console.log('Building GITA_365 …');
  const verses = await fetchOrCache('verse', SOURCES.verse);
  const translations = await fetchOrCache('translation', SOURCES.translation);
  const curated = loadCuratedOverrides();

  // Index Sivananda English translations by verse id
  const tByVerse = {};
  for (const t of translations) {
    const author = String(t.author_name ?? t.authorName ?? '');
    const lang = String(t.lang ?? t.language ?? 'english').toLowerCase();
    if (!/sivananda/i.test(author) || !lang.startsWith('en')) continue;
    const vid = t.verse_id ?? t.verseId ?? t.verseNumber ?? t.id;
    if (vid != null && !(vid in tByVerse)) tByVerse[vid] = t.description ?? t.text ?? '';
  }
  console.log(`  sivananda translations indexed: ${Object.keys(tByVerse).length}`);

  // Group verses per chapter, sorted
  const byCh = {};
  for (const v of verses) {
    const c = v.chapter_number ?? v.chapter ?? v.chapter_id;
    (byCh[c] ??= []).push(v);
  }
  for (const c of Object.keys(byCh)) byCh[c].sort((a, b) => (a.verse_number ?? 0) - (b.verse_number ?? 0));

  const chNums = Object.keys(byCh).map(Number).sort((a, b) => a - b);
  const total = chNums.reduce((s, c) => s + byCh[c].length, 0);

  // Quotas per chapter, summing exactly to TARGET
  const quotas = {};
  let assigned = 0;
  for (const c of chNums) {
    quotas[c] = Math.max(1, Math.round((byCh[c].length * TARGET) / total));
    assigned += quotas[c];
  }
  // adjust rounding drift on the largest chapters
  const order = [...chNums].sort((a, b) => byCh[b].length - byCh[a].length);
  let i = 0;
  while (assigned !== TARGET) {
    const c = order[i % order.length];
    if (assigned > TARGET && quotas[c] > 1) { quotas[c]--; assigned--; }
    else if (assigned < TARGET && quotas[c] < byCh[c].length) { quotas[c]++; assigned++; }
    i++;
  }

  // Build entries
  const entries = [];
  let colorIdx = 0;
  for (const c of chNums) {
    const picked = pickEvenly(byCh[c], quotas[c]);
    const pool = CHAPTERS[c] ?? { name: `Chapter ${c}`, refl: [['Sit with this verse today.', 'Daily contemplative reading strengthens language and attention networks.']] };
    picked.forEach((v, k) => {
      const vn = v.verse_number ?? v.verse;
      const ref = `${c}.${vn}`;
      const cur = curated[ref];
      const [reflection, neuro] = pool.refl[k % pool.refl.length];
      entries.push({
        id: `g365_${c}_${vn}`,
        chapter: c,
        verse: ref,
        sanskrit: cleanSanskrit(v.text ?? v.slok ?? ''),
        translation: cur?.translation ?? cleanTranslation(tByVerse[v.id] ?? v.transliteration ?? ''),
        reflection: cur?.reflection ?? reflection,
        theme: cur?.theme ?? pool.name,
        neuro: cur?.neuro ?? neuro,
        color: cur?.color ?? COLORS[colorIdx++ % COLORS.length],
      });
    });
  }

  if (entries.length !== TARGET) throw new Error(`expected ${TARGET}, got ${entries.length}`);
  const missing = entries.filter(e => !e.sanskrit || !e.translation).length;
  if (missing) console.warn(`  ⚠ ${missing} entries missing text — check source data`);

  // Emit TS
  const lit = (s) => JSON.stringify(s);
  const body = entries.map(e =>
    `  {id:${lit(e.id)},chapter:${e.chapter},verse:${lit(e.verse)},sanskrit:${lit(e.sanskrit)},translation:${lit(e.translation)},reflection:${lit(e.reflection)},theme:${lit(e.theme)},neuro:${lit(e.neuro)},color:${lit(e.color)}},`
  ).join('\n');

  writeFileSync(OUT, `/**
 * GITA_365 — AUTO-GENERATED by scripts/build-gita-365.mjs on ${new Date().toISOString().slice(0, 10)}.
 * 365 verses, chapters 1 → 18, calendar-based daily journey. Do not edit by hand.
 * Sanskrit & translation: open-source gita dataset (Unlicense) · Swami Sivananda.
 */
import type { GitaTeaching } from './gita-daily';

export const GITA_365: GitaTeaching[] = [
${body}
];
`);
  console.log(`✓ wrote ${OUT} (${entries.length} entries)`);
}

main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
