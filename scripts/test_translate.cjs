const fs = require('fs');
const { callGemini } = require('../../credentials/travel4you/lib/gemini');
const { STORYTELLING_DATABASE } = require('./storytelling_database_50_hotels.cjs');
const hotel = STORYTELLING_DATABASE['paris-four-seasons-george-v'];

async function test() {
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

  const prompt = `You are a high-end luxury travel editor for Condé Nast Traveler.
Translate the following hotel review data from Vietnamese into English (en) and Traditional Chinese (zh-tw).
Use elegant, evocative, top-tier luxury prose.
Return ONLY a valid JSON object with keys "en" and "zh-tw". No markdown fences or backticks.

Input:
${JSON.stringify(payload, null, 2)}`;

  const res = await callGemini(prompt, { maxOutputTokens: 8192, temperature: 0.2 });
  const cleaned = res.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  fs.writeFileSync('D:/n8n-selfhost/travel4u.us/scripts/sample_translation.json', JSON.stringify(parsed, null, 2), 'utf-8');
  console.log('SUCCESS! Saved to sample_translation.json');
  console.log('zh-tw podcast_title:', parsed['zh-tw'].podcast_title);
  console.log('en podcast_title:', parsed['en'].podcast_title);
  console.log('zh-tw shorts count:', parsed['zh-tw'].shorts?.length);
  console.log('en dialogue lines:', parsed['en'].podcast_dialogue?.length);
}

test().catch(console.error);
