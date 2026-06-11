#!/usr/bin/env node
/**
 * download-gita-data.mjs — Downloads verse and translation data to local cache.
 * Run this first, then run build-gita-365.mjs with --local flag.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, 'scripts', 'cache');
mkdirSync(CACHE, { recursive: true });

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

async function main() {
  console.log('Downloading Gita data to local cache...');
  const verses = await fetchFirst(SOURCES.verse);
  writeFileSync(join(CACHE, 'verse.json'), JSON.stringify(verses, null, 2));
  console.log(`  ✓ saved verse.json (${verses.length} records)`);

  const translations = await fetchFirst(SOURCES.translation);
  writeFileSync(join(CACHE, 'translation.json'), JSON.stringify(translations, null, 2));
  console.log(`  ✓ saved translation.json (${translations.length} records)`);

  console.log('Done! Now run: node scripts/build-gita-365.mjs --local');
}

main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
