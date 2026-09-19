/**
 * ⚡ EXPEDIA 1,000 LUXURY STAYS INSTANT SEARCH INDEX GENERATOR
 * Domain: travel4u.us
 * Generates public/data/destinations_search_index.json
 * High-speed 60 FPS in-memory search index for 1,000 hotels & stays
 * Features 20 Sovereign Sanctuaries with detailed review guides (d: true)
 */

const fs = require('fs');
const path = require('path');

const CATALOG_FILE = path.resolve(__dirname, '../src/data/destinations_1000_hotels_master.json');
const DESTINATIONS_FILE = path.resolve(__dirname, '../src/data/destinations.json');
const OUTPUT_FILE = path.resolve(__dirname, '../public/data/destinations_search_index.json');

function run() {
  console.log('⚡ Generating Expedia 1,000 Luxury Stays Search Index...');
  
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error('❌ Catalog not found:', CATALOG_FILE);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));
  const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));

  const featuredSlugsMap = new Map();
  for (const d of destinations) {
    featuredSlugsMap.set(d.slugs.en, d);
  }

  // 1. Build featured index items first for priority search ranking
  const featuredIndex = destinations.map((item, idx) => {
    const defaultSlug = item.slugs.en;
    return {
      i: idx + 1,
      p: item.post_code,
      t: item.english_title.split(':')[0],
      l: item.location,
      c: item.location.includes('Como') || item.location.includes('Rome') || item.location.includes('Paris') || item.location.includes('Venice') ? "World's Historic Grand Palaces & 5-Star Icons" :
         item.location.includes('Maldives') ? "Private Overwater Villas & Island Sanctuaries" :
         item.location.includes('Kyoto') || item.location.includes('Hakone') || item.location.includes('Japan') ? "Authentic Japanese Ryokans & Mineral Onsens" :
         item.location.includes('Utah') ? "Remote Wilderness Lodges & Desert Sanctuaries" :
         item.location.includes('Serengeti') ? "Luxury African Safari Camps & Wildlife Sanctuaries" :
         item.location.includes('Swiss') || item.location.includes('Montreux') || item.location.includes('Andermatt') ? "Alpine Chalets & Mountain Retreats" :
         "World's Historic Grand Palaces & 5-Star Icons",
      r: item.location.includes('Japan') ? '03_ryokans' :
         item.location.includes('Maldives') ? '02_overwater' :
         item.location.includes('Utah') ? '07_wilderness' :
         item.location.includes('Serengeti') ? '06_safari' :
         item.location.includes('Swiss') || item.location.includes('Montreux') || item.location.includes('Andermatt') ? '08_alpine' :
         '01_palaces',
      g: item.price_display,
      s: '5.0 ★ Sovereign Elite',
      m: item.hero_image,
      u: item.expedia_direct_link || `/go/${defaultSlug}`,
      d: true, // detail page flag -> directs to /experience/[slug]
      k: defaultSlug
    };
  });

  const featuredKeySet = new Set(destinations.map(d => d.slugs.en));

  // 2. Build non-featured catalog items
  const nonFeaturedIndex = [];
  let nextId = destinations.length + 1;

  for (const item of catalog) {
    // Check if this catalog item matches any of our featured stays
    const isFeatured = featuredKeySet.has(item.slug);
    if (isFeatured) continue; // already in featuredIndex

    nonFeaturedIndex.push({
      i: nextId++,
      p: item.post_code,
      t: item.property_name,
      l: `${item.city}, ${item.country}`,
      c: item.collection_name,
      r: item.collection_code,
      g: item.price_display,
      s: item.star_rating,
      m: item.hero_image,
      u: item.expedia_cloaked_path || `/go/${item.slug}`,
      d: false, // detail page flag
      k: item.slug
    });
  }

  const completeIndex = [...featuredIndex, ...nonFeaturedIndex];

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(completeIndex), 'utf-8');
  const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`✅ Generated ${completeIndex.length} indexed hotels (${featuredIndex.length} featured guides) in: ${OUTPUT_FILE} (${sizeKb} KB)`);
}

run();
