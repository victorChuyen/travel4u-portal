/**
 * 🌐 BATCH TRANSLATE ALL 50 HOTELS TO ENGLISH & TRADITIONAL CHINESE
 * Uses Travel4U multi-key Gemini pool with automatic retry and key rotation.
 * Saves results incrementally to src/data/translations_cache.json.
 */

const fs = require('fs');
const path = require('path');
const { callGemini } = require('../../credentials/travel4you/lib/gemini');
const { STORYTELLING_DATABASE } = require('./storytelling_database_50_hotels.cjs');

const CACHE_FILE = path.resolve(__dirname, '../src/data/translations_cache.json');

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch (e) {
    cache = {};
  }
}

async function translateHotel(slug, hotel) {
  if (cache[slug] && cache[slug]['en'] && cache[slug]['zh-tw']) {
    console.log(`⏩ [${slug}] Already translated. Skipping.`);
    return cache[slug];
  }

  console.log(`\n⏳ [${slug}] Translating ${hotel.hotel_name}...`);

  const payload = {
    podcast_title: hotel.podcast_title,
    soundscape_title: hotel.soundscape_title,
    soundscape_description: hotel.soundscape_description,
    gastronomy_title: hotel.gastronomy_title,
    gastronomy_dish: hotel.gastronomy_dish,
    wine_pairing: hotel.wine_pairing,
    positive_emotion: hotel.positive_emotion,
    client_concern: hotel.client_concern,
    target_persona: hotel.target_persona,
    woa_declaration: hotel.woa_declaration,
    victor_note: hotel.victor_note,
    lucky_note: hotel.lucky_note,
    critique_positives: hotel.critique_positives,
    critique_considerations: hotel.critique_considerations,
    podcast_dialogue: hotel.podcast_dialogue,
    shorts: hotel.shorts
  };

  const prompt = `You are an elite luxury travel editor for Condé Nast Traveler and Tatler Asia.
Translate the following hotel review data from Vietnamese into:
1. "en": High-society, evocative, polished British/American luxury English.
2. "zh-tw": Elegant, poetic, high-net-worth Traditional Chinese (Taiwan/Hong Kong luxury style).

Return ONLY a valid JSON object with keys "en" and "zh-tw". No markdown fences or backticks.

Input:
${JSON.stringify(payload, null, 2)}`;

  let attempts = 0;
  while (attempts < 3) {
    try {
      attempts++;
      const res = await callGemini(prompt, { maxOutputTokens: 8192, temperature: 0.2 });
      const jsonMatch = res.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON object found in response');
      const parsed = JSON.parse(jsonMatch[0]);

      if (parsed.en && parsed['zh-tw']) {
        cache[slug] = parsed;
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
        console.log(`✅ [${slug}] Successfully translated and cached!`);
        return parsed;
      } else {
        throw new Error('Missing en or zh-tw keys in response');
      }
    } catch (err) {
      console.warn(`⚠️ [${slug}] Attempt ${attempts} failed: ${err.message}`);
      if (attempts >= 3) {
        console.error(`❌ [${slug}] Max retries exceeded.`);
        return null;
      }
      await new Promise(r => setTimeout(r, 2000 * attempts));
    }
  }
}

async function run() {
  const entries = Object.entries(STORYTELLING_DATABASE);
  console.log(`🚀 Starting batch translation for ${entries.length} hotels...`);

  // Process in small parallel chunks (concurrency 2 to avoid rate limits)
  const CONCURRENCY = 2;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const chunk = entries.slice(i, i + CONCURRENCY);
    console.log(`\n--- Processing Batch ${Math.floor(i / CONCURRENCY) + 1} of ${Math.ceil(entries.length / CONCURRENCY)} ---`);
    await Promise.all(chunk.map(([slug, hotel]) => translateHotel(slug, hotel)));
  }

  console.log(`\n🎉 Translation batch completed. Total cached hotels: ${Object.keys(cache).length}`);
}

run().catch(console.error);
