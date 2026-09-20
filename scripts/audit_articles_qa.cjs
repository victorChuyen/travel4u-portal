const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/articles.json'), 'utf8'));

console.log('Total articles in articles.json:', articles.length);

const locales = {};
let undefinedCount = 0;
let emptyFieldsCount = 0;
let englishLeakInNonEn = 0;

articles.forEach(art => {
  locales[art.locale] = (locales[art.locale] || 0) + 1;
  const jsonStr = JSON.stringify(art);
  if (jsonStr.includes('undefined')) {
    undefinedCount++;
    console.warn(`[WARN] "undefined" found in ${art.slug} (${art.locale})`);
  }
  if (!art.title || !art.html || !art.soundscape_title || !art.gastronomy_title || !art.positive_emotion) {
    emptyFieldsCount++;
  }
});

console.log('Locale counts:', JSON.stringify(locales, null, 2));
console.log('Articles containing "undefined":', undefinedCount);
console.log('Articles with empty critical fields:', emptyFieldsCount);

// Spot check samples for ja, ko, fr, de, vi, zh-tw, zh-cn
const sampleLocales = ['ja', 'ko', 'fr', 'de', 'es', 'it', 'vi', 'zh-tw', 'zh-cn'];
sampleLocales.forEach(loc => {
  const art = articles.find(a => a.locale === loc && a.slug.includes('kyoto'));
  if (art) {
    console.log(`\n=================== [${loc.toUpperCase()}] ${art.slug} ===================`);
    console.log('Title:', art.title);
    console.log('Soundscape Title:', art.soundscape_title);
    console.log('Gastronomy Title:', art.gastronomy_title);
    console.log('Positive Emotion:', art.positive_emotion);
    console.log('WOA Declaration:', art.woa_declaration);
    console.log('Podcast Title:', art.podcast_title);
    console.log('First 200 chars of HTML:', art.html.slice(0, 200).replace(/\n/g, ' '));
  } else {
    console.log(`[WARN] No Kyoto article found for locale ${loc}`);
  }
});
