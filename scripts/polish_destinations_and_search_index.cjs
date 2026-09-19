const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const destPath = path.join(root, 'src/data/destinations.json');
const searchIndexPath = path.join(root, 'public/data/destinations_search_index.json');

const destinations = JSON.parse(fs.readFileSync(destPath, 'utf8'));
const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

// Region mapping table by exact sequential post_code (001 to 030)
const regionMap = {
  EXP_PARIS_001: 'Europe',
  EXP_ROME_002: 'Europe',
  EXP_COMO_003: 'Europe',
  EXP_KYOTO_004: 'Asia',
  EXP_MALDIVES_005: 'Islands',
  EXP_UTAH_006: 'Americas',
  EXP_SAFARI_007: 'Safari',
  EXP_VENICE_008: 'Europe',
  EXP_SWISS_009: 'Europe',
  EXP_DUBAI_010: 'Middle East',
  EXP_COMO_011: 'Europe',
  EXP_COMO_012: 'Europe',
  EXP_SWISS_013: 'Europe',
  EXP_MALDIVES_014: 'Islands',
  EXP_MALDIVES_015: 'Islands',
  EXP_KYOTO_016: 'Asia',
  EXP_HAKONE_017: 'Asia',
  EXP_UTAH_018: 'Americas',
  EXP_SAFARI_019: 'Safari',
  EXP_WELLNESS_020: 'Europe',
  EXP_VILLAS_021: 'Europe',
  EXP_VILLAS_022: 'Europe',
  EXP_VILLAS_023: 'Europe',
  EXP_PALACE_024: 'Asia',
  EXP_VILLAS_025: 'Asia',
  EXP_WINE_026: 'Europe',
  EXP_PALACE_027: 'Europe',
  EXP_PALACE_028: 'Europe',
  EXP_PALACE_029: 'Europe',
  EXP_WINE_030: 'Europe'
};

// 1. Enrich destinations.json
let destUpdatedCount = 0;
for (const d of destinations) {
  const code = d.post_code;
  if (regionMap[code]) {
    d.region = regionMap[code];
    destUpdatedCount++;
  }
}

fs.writeFileSync(destPath, JSON.stringify(destinations, null, 2), 'utf8');
console.log(`Updated region for ${destUpdatedCount}/${destinations.length} destinations in destinations.json`);

// 2. Enrich searchIndex for the 30 featured properties
const destLookup = {};
for (const d of destinations) {
  destLookup[d.slugs.en] = d;
  destLookup[d.post_code] = d;
}

let searchIndexUpdatedCount = 0;
for (const item of searchIndex) {
  if (item.d === true) {
    const dest = destLookup[item.k];
    if (dest) {
      item.l = dest.location;
      item.r = dest.region || item.r;
      if (item.k === 'le-sirenuse-positano-amalfi') {
        item.l = 'Positano, Amalfi Coast, Italy';
        item.c = 'Mediterranean Cliffside Villas & Historic Palazzos';
      } else if (item.k === 'hotel-santa-caterina-amalfi') {
        item.l = 'Amalfi, Amalfi Coast, Italy';
        item.c = 'Mediterranean Cliffside Villas & Private Sea Clubs';
      } else if (item.k === 'four-seasons-resort-bali-sayan') {
        item.l = 'Ubud, Bali, Indonesia';
        item.c = 'Tropical Rainforest Sanctuaries & Sacred River Retreats';
      } else if (item.k === 'bulgari-resort-bali-uluwatu') {
        item.l = 'Uluwatu, Bali, Indonesia';
        item.c = 'Ocean Clifftop Mansions & Ultra-Luxury Beach Clubs';
      } else if (item.k === 'les-sources-de-caudalie-bordeaux') {
        item.l = 'Martillac, Bordeaux, France';
        item.c = 'Grand Cru Vineyards & Vinothérapie Spa Palaces';
      } else if (item.k === 'amanzoe-peloponnese-greece') {
        item.l = 'Porto Heli, Peloponnese, Greece';
        item.c = 'Modern Acropolis Sanctuaries & Private Beach Cabanas';
      } else if (item.k === 'the-maybourne-riviera-monaco') {
        item.l = 'Roquebrune-Cap-Martin, French Riviera, France';
        item.c = 'Riviera Modernist Palaces & Panoramic Mediterranean Suites';
      } else if (item.k === 'chateau-du-grand-luce-loire') {
        item.l = 'Le Grand-Lucé, Loire Valley, France';
        item.c = 'French Châteaux & Neoclassical Royal Estates';
      } else if (item.k === 'the-yeatman-hotel-porto') {
        item.l = 'Vila Nova de Gaia, Porto, Portugal';
        item.c = 'World Heritage Wine Estates & Michelin Gastronomy Sanctuaries';
      } else if (item.k === 'canaves-oia-suites-santorini') {
        item.l = 'Oia, Santorini, Greece';
        item.c = 'Caldera Clifftop Caves & Volcanic Sunset Suites';
      }
      searchIndexUpdatedCount++;
    }
  }
}

fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex), 'utf8');
console.log(`Polished ${searchIndexUpdatedCount} featured properties in destinations_search_index.json`);
