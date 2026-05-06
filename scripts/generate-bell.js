// Generate a meditation bell WAV file programmatically
// Produces a rich, resonant singing bowl tone at 432 Hz

const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const DURATION = 4.5; // seconds
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

// Generate samples
const samples = new Float32Array(NUM_SAMPLES);

for (let i = 0; i < NUM_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;
  
  // Exponential decay envelope
  const env = Math.exp(-t * 1.2);
  
  // Fundamental: 432 Hz (A=432, Vedic tuning)
  const f1 = Math.sin(2 * Math.PI * 432 * t) * 0.45;
  
  // First overtone: 432 * 2.756 ≈ 1190 Hz (characteristic bell partial)
  const f2 = Math.sin(2 * Math.PI * 1190 * t) * 0.18 * Math.exp(-t * 2.5);
  
  // Second overtone: 432 * 3.6 ≈ 1555 Hz
  const f3 = Math.sin(2 * Math.PI * 1555 * t) * 0.08 * Math.exp(-t * 4.0);
  
  // Sub-harmonic hum: 216 Hz
  const f4 = Math.sin(2 * Math.PI * 216 * t) * 0.12 * Math.exp(-t * 0.8);
  
  // Strike transient (short burst at start)
  const strike = t < 0.015 ? Math.sin(2 * Math.PI * 3200 * t) * 0.3 * (1 - t / 0.015) : 0;
  
  // Slight pitch wobble for organic feel
  const wobble = 1 + Math.sin(2 * Math.PI * 0.8 * t) * 0.001;
  
  samples[i] = env * (f1 * wobble + f2 + f3 + f4) + strike;
}

// Normalise to prevent clipping
let max = 0;
for (let i = 0; i < NUM_SAMPLES; i++) {
  max = Math.max(max, Math.abs(samples[i]));
}
const gain = 0.85 / max;

// Convert to 16-bit PCM
const pcm = Buffer.alloc(NUM_SAMPLES * 2);
for (let i = 0; i < NUM_SAMPLES; i++) {
  const val = Math.max(-1, Math.min(1, samples[i] * gain));
  const int16 = Math.floor(val * 32767);
  pcm.writeInt16LE(int16, i * 2);
}

// Build WAV header
const dataSize = pcm.length;
const headerSize = 44;
const fileSize = headerSize + dataSize;
const header = Buffer.alloc(headerSize);

header.write('RIFF', 0);
header.writeUInt32LE(fileSize - 8, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);        // fmt chunk size
header.writeUInt16LE(1, 20);         // PCM format
header.writeUInt16LE(1, 22);         // mono
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2, 28); // byte rate
header.writeUInt16LE(2, 32);         // block align
header.writeUInt16LE(16, 34);        // bits per sample
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const wav = Buffer.concat([header, pcm]);

const outPath = path.join(__dirname, '..', 'public', 'bell.wav');
fs.writeFileSync(outPath, wav);
console.log(`✓ Generated ${outPath} (${(wav.length / 1024).toFixed(1)} KB, ${DURATION}s, 432 Hz)`);
