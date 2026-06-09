#!/bin/bash
cd "$(dirname "$0")/public/audio"

# Remove old generated tones
rm -f *hz*.mp3 om_deep_*.mp3 chakra_bija.mp3

DL() {
  local name="$1"
  local query="$2"
  local maxdur="$3"
  
  if [ -f "$name" ]; then
    echo "⏭️  $name already exists, skipping"
    return
  fi
  
  echo "🔍 Searching: $query"
  yt-dlp \
    -x --audio-format mp3 --audio-quality 0 \
    --match-filter "duration<=$maxdur" \
    --max-downloads 1 \
    -o "$name" \
    "ytsearch1:$query" 2>&1 | tail -3
  
  if [ -f "$name" ]; then
    echo "✅ Downloaded: $name"
  else
    echo "❌ Failed: $name"
  fi
  echo ""
}

echo "═══════════════════════════════════════"
echo "  🕉️  DOWNLOADING SACRED CHANTS  🕉️"
echo "═══════════════════════════════════════"
echo ""

# === 5-Minute Quick Center ===
echo "━━━ 5-Minute Quick Center ━━━"
DL "om_namah_shivaya.mp3"     "Om Namah Shivaya 432Hz sacred chant meditation 5 minutes"     400
DL "gayatri_mantra.mp3"       "Gayatri Mantra Deva Premal chant 5 minutes"                    400
DL "om_mani_padme_hum.mp3"    "Om Mani Padme Hum Tibetan monks 528Hz chant 5 minutes"         400
DL "mahamrityunjaya.mp3"      "Mahamrityunjaya Mantra sacred healing chant 5 minutes"         400
DL "surya_namaskar.mp3"       "Surya Namaskar mantra morning raga chant 5 minutes"            400
DL "shanti_mantra.mp3"        "Om Shanti Shanti vedic peace mantra chant 5 minutes"           400

# === 10-Minute Deep Dive ===
echo "━━━ 10-Minute Deep Dive ━━━"
DL "ganesh_mantra.mp3"        "Ganesh Maha Mantra Sounds of Isha 10 minutes meditation"       700
DL "saraswati_beej.mp3"       "Saraswati Beej Mantra 432Hz focus meditation 10 minutes"       700
DL "durga_suktam.mp3"         "Durga Suktam vedic chant powerful 10 minutes"                  700
DL "medicine_buddha.mp3"      "Medicine Buddha mantra tibetan singing bowls 10 minutes"        700
DL "green_tara.mp3"           "Green Tara Mantra Om Tare Tuttare tibetan monks chant"         700
DL "shiva_tandava.mp3"        "Shiva Tandava Stotram powerful sacred chant 10 minutes"        700

# === 15-Minute Immersion ===
echo "━━━ 15-Minute Immersion ━━━"
DL "rudram_chamakam.mp3"      "Sri Rudram Chamakam vedic chant authentic recitation"         1200
DL "vishnu_sahasranama.mp3"   "Vishnu Sahasranama authentic Sanskrit recitation"              1200
DL "108_om_chanting.mp3"      "108 Om chanting deep meditation resonance"                    1200
DL "chakra_bija.mp3"          "Chakra Bija Mantras all 7 chakras meditation"                 1200
DL "purusha_suktam.mp3"       "Purusha Suktam vedic chant authentic recitation"              1200
DL "avalokiteshvara.mp3"      "Avalokiteshvara Buddhist compassion mantra meditation"        1200

echo ""
echo "═══════════════════════════════════════"
echo "  ✅  DOWNLOAD COMPLETE"
echo "═══════════════════════════════════════"
echo ""
ls -lah *.mp3 2>/dev/null | awk '{print $5, $NF}'
echo ""
echo "Total:"
du -sh .
