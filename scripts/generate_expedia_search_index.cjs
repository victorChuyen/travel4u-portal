/**
 * ⚡ EXPEDIA 1,000 LUXURY STAYS INSTANT SEARCH INDEX GENERATOR
 * Domain: travel4u.us
 * Generates public/data/destinations_search_index.json
 * High-speed 60 FPS in-memory search index for 1,000 hotels & stays
 */

const fs = require('fs');
const path = require('path');

const CATALOG_FILE = path.resolve(__dirname, '../src/data/destinations_1000_hotels_master.json');
const OUTPUT_FILE = path.resolve(__dirname, '../public/data/destinations_search_index.json');

function run() {
  console.log('⚡ Generating Expedia 1,000 Luxury Stays Search Index...');
  
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error('❌ Catalog not found:', CATALOG_FILE);
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf-8'));
  
  // Compact representation for ultra-fast payload delivery
  const index = catalog.map(item => ({
    i: item.id,
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
  }));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index), 'utf-8');
  const sizeKb = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`✅ Generated ${index.length} indexed hotels in: ${OUTPUT_FILE} (${sizeKb} KB)`);
}

run();
