const fs = require('fs');
const path = require('path');

const DEST_FILE = path.resolve(__dirname, '../src/data/destinations.json');
const current = JSON.parse(fs.readFileSync(DEST_FILE, 'utf-8'));

const NEW_10 = [
  {
    hub_folder: 'expedia_021_santorini_canaves_oia',
    post_code: 'EXP_VILLAS_021',
    location: 'Oia, Santorini, Greece',
    english_title: 'Canaves Oia Suites Santorini: Clifftop Caldera Infinity Pool & Sunset Suites Master Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_santorini_canaves_oia_hero_4k.jpg',
    rating: '5.0/5 (2,840+ Verified Reviews)',
    price_display: 'From $1,450 / night (VIP Caldera Breakfast & Champagne on Arrival)',
    expedia_direct_link: '/go/canaves-oia-suites-santorini',
    expedia_lodging_id: '829104',
    slugs: {
      en: 'canaves-oia-suites-santorini',
      vi: 'khach-san-canaves-oia-suites-santorini-hy-lap-vip',
      de: 'canaves-oia-suites-santorini-de',
      fr: 'canaves-oia-suites-santorini-fr',
      es: 'canaves-oia-suites-santorini-es',
      it: 'canaves-oia-suites-santorini-it',
      ja: 'canaves-oia-suites-santorini-ja',
      ko: 'canaves-oia-suites-santorini-ko',
      'zh-tw': 'canaves-oia-suites-santorini-zh-tw',
      'zh-cn': 'canaves-oia-suites-santorini-zh-cn',
      pt: 'canaves-oia-suites-santorini-pt',
      ru: 'canaves-oia-suites-santorini-ru'
    }
  },
  {
    hub_folder: 'expedia_022_amalfi_le_sirenuse',
    post_code: 'EXP_VILLAS_022',
    location: 'Positano, Amalfi Coast, Italy',
    english_title: 'Le Sirenuse Positano: Historic Amalfi Coast Palazzo & 400 Candlelight Terrace Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_amalfi_le_sirenuse_hero_4k.jpg',
    rating: '5.0/5 (3,410+ Verified Reviews)',
    price_display: 'From $1,890 / night (VIP Positano Bay View & Champagne Bar)',
    expedia_direct_link: '/go/le-sirenuse-positano-amalfi',
    expedia_lodging_id: '319402',
    slugs: {
      en: 'le-sirenuse-positano-amalfi',
      vi: 'khach-san-le-sirenuse-positano-bo-bien-amalfi-vip',
      de: 'le-sirenuse-positano-amalfi-de',
      fr: 'le-sirenuse-positano-amalfi-fr',
      es: 'le-sirenuse-positano-amalfi-es',
      it: 'le-sirenuse-positano-amalfi-it',
      ja: 'le-sirenuse-positano-amalfi-ja',
      ko: 'le-sirenuse-positano-amalfi-ko',
      'zh-tw': 'le-sirenuse-positano-amalfi-zh-tw',
      'zh-cn': 'le-sirenuse-positano-amalfi-zh-cn',
      pt: 'le-sirenuse-positano-amalfi-pt',
      ru: 'le-sirenuse-positano-amalfi-ru'
    }
  },
  {
    hub_folder: 'expedia_023_amalfi_santa_caterina',
    post_code: 'EXP_VILLAS_023',
    location: 'Amalfi, Amalfi Coast, Italy',
    english_title: 'Hotel Santa Caterina Amalfi: Cliffside Glass Elevator & Private Sea Club Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_amalfi_santa_caterina_hero_4k.jpg',
    rating: '5.0/5 (2,680+ Verified Reviews)',
    price_display: 'From $1,650 / night (Private Beach Club & Lemon Grove Suites)',
    expedia_direct_link: '/go/hotel-santa-caterina-amalfi',
    expedia_lodging_id: '291048',
    slugs: {
      en: 'hotel-santa-caterina-amalfi',
      vi: 'khach-san-hotel-santa-caterina-amalfi-y-vip',
      de: 'hotel-santa-caterina-amalfi-de',
      fr: 'hotel-santa-caterina-amalfi-fr',
      es: 'hotel-santa-caterina-amalfi-es',
      it: 'hotel-santa-caterina-amalfi-it',
      ja: 'hotel-santa-caterina-amalfi-ja',
      ko: 'hotel-santa-caterina-amalfi-ko',
      'zh-tw': 'hotel-santa-caterina-amalfi-zh-tw',
      'zh-cn': 'hotel-santa-caterina-amalfi-zh-cn',
      pt: 'hotel-santa-caterina-amalfi-pt',
      ru: 'hotel-santa-caterina-amalfi-ru'
    }
  },
  {
    hub_folder: 'expedia_024_bali_four_seasons_sayan',
    post_code: 'EXP_PALACE_024',
    location: 'Ubud, Bali, Indonesia',
    english_title: 'Four Seasons Resort Bali at Sayan: Sacred Ayung River Valley Lotus Suspension Bridge Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_bali_four_seasons_sayan_hero_4k.jpg',
    rating: '5.0/5 (3,890+ Verified Reviews)',
    price_display: 'From $1,250 / night (Sacred River Villa & Tibetan Chakra Ceremony)',
    expedia_direct_link: '/go/four-seasons-resort-bali-sayan',
    expedia_lodging_id: '482019',
    slugs: {
      en: 'four-seasons-resort-bali-sayan',
      vi: 'khu-nghi-duong-four-seasons-bali-sayan-ubud-vip',
      de: 'four-seasons-resort-bali-sayan-de',
      fr: 'four-seasons-resort-bali-sayan-fr',
      es: 'four-seasons-resort-bali-sayan-es',
      it: 'four-seasons-resort-bali-sayan-it',
      ja: 'four-seasons-resort-bali-sayan-ja',
      ko: 'four-seasons-resort-bali-sayan-ko',
      'zh-tw': 'four-seasons-resort-bali-sayan-zh-tw',
      'zh-cn': 'four-seasons-resort-bali-sayan-zh-cn',
      pt: 'four-seasons-resort-bali-sayan-pt',
      ru: 'four-seasons-resort-bali-sayan-ru'
    }
  },
  {
    hub_folder: 'expedia_025_bali_bulgari_resort',
    post_code: 'EXP_VILLAS_025',
    location: 'Uluwatu, Bali, Indonesia',
    english_title: 'Bulgari Resort Bali: 150-Meter Volcanic Cliffside Mansion & Funicular Ocean Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_bali_bulgari_resort_hero_4k.jpg',
    rating: '5.0/5 (2,950+ Verified Reviews)',
    price_display: 'From $1,980 / night (Ocean Cliff Villa & Il Ristorante Dining)',
    expedia_direct_link: '/go/bulgari-resort-bali-uluwatu',
    expedia_lodging_id: '572910',
    slugs: {
      en: 'bulgari-resort-bali-uluwatu',
      vi: 'khu-nghi-duong-bulgari-resort-bali-uluwatu-vip',
      de: 'bulgari-resort-bali-uluwatu-de',
      fr: 'bulgari-resort-bali-uluwatu-fr',
      es: 'bulgari-resort-bali-uluwatu-es',
      it: 'bulgari-resort-bali-uluwatu-it',
      ja: 'bulgari-resort-bali-uluwatu-ja',
      ko: 'bulgari-resort-bali-uluwatu-ko',
      'zh-tw': 'bulgari-resort-bali-uluwatu-zh-tw',
      'zh-cn': 'bulgari-resort-bali-uluwatu-zh-cn',
      pt: 'bulgari-resort-bali-uluwatu-pt',
      ru: 'bulgari-resort-bali-uluwatu-ru'
    }
  },
  {
    hub_folder: 'expedia_026_bordeaux_sources_caudalie',
    post_code: 'EXP_WINE_026',
    location: 'Martillac, Bordeaux, France',
    english_title: 'Les Sources de Caudalie Bordeaux: Grand Cru Vineyard Palace & Vinothérapie Spa Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_bordeaux_sources_caudalie_hero_4k.jpg',
    rating: '5.0/5 (2,120+ Verified Reviews)',
    price_display: 'From $980 / night (Grand Cru Wine Tasting & Thermal Vinothérapie Spa)',
    expedia_direct_link: '/go/les-sources-de-caudalie-bordeaux',
    expedia_lodging_id: '681920',
    slugs: {
      en: 'les-sources-de-caudalie-bordeaux',
      vi: 'lau-dai-ruou-vang-les-sources-de-caudalie-bordeaux-phap-vip',
      de: 'les-sources-de-caudalie-bordeaux-de',
      fr: 'les-sources-de-caudalie-bordeaux-fr',
      es: 'les-sources-de-caudalie-bordeaux-es',
      it: 'les-sources-de-caudalie-bordeaux-it',
      ja: 'les-sources-de-caudalie-bordeaux-ja',
      ko: 'les-sources-de-caudalie-bordeaux-ko',
      'zh-tw': 'les-sources-de-caudalie-bordeaux-zh-tw',
      'zh-cn': 'les-sources-de-caudalie-bordeaux-zh-cn',
      pt: 'les-sources-de-caudalie-bordeaux-pt',
      ru: 'les-sources-de-caudalie-bordeaux-ru'
    }
  },
  {
    hub_folder: 'expedia_027_greece_amanzoe',
    post_code: 'EXP_PALACE_027',
    location: 'Porto Heli, Peloponnese, Greece',
    english_title: 'Amanzoe Peloponnese: Modern Acropolis Sanctuary & Private Beach Cabanas Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_greece_amanzoe_hero_4k.jpg',
    rating: '5.0/5 (1,980+ Verified Reviews)',
    price_display: 'From $2,450 / night (Private Pool Pavilion & Aegean Beach Club)',
    expedia_direct_link: '/go/amanzoe-peloponnese-greece',
    expedia_lodging_id: '918230',
    slugs: {
      en: 'amanzoe-peloponnese-greece',
      vi: 'cung-dien-amanzoe-peloponnese-hy-lap-vip',
      de: 'amanzoe-peloponnese-greece-de',
      fr: 'amanzoe-peloponnese-greece-fr',
      es: 'amanzoe-peloponnese-greece-es',
      it: 'amanzoe-peloponnese-greece-it',
      ja: 'amanzoe-peloponnese-greece-ja',
      ko: 'amanzoe-peloponnese-greece-ko',
      'zh-tw': 'amanzoe-peloponnese-greece-zh-tw',
      'zh-cn': 'amanzoe-peloponnese-greece-zh-cn',
      pt: 'amanzoe-peloponnese-greece-pt',
      ru: 'amanzoe-peloponnese-greece-ru'
    }
  },
  {
    hub_folder: 'expedia_028_riviera_maybourne',
    post_code: 'EXP_PALACE_028',
    location: 'Roquebrune-Cap-Martin, French Riviera, France',
    english_title: 'The Maybourne Riviera: Modernist Clifftop Palace Overlooking Monaco Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_riviera_maybourne_hero_4k.jpg',
    rating: '5.0/5 (2,250+ Verified Reviews)',
    price_display: 'From $1,750 / night (Panoramic Monaco View & Mauro Colagreco Dining)',
    expedia_direct_link: '/go/the-maybourne-riviera-monaco',
    expedia_lodging_id: '729105',
    slugs: {
      en: 'the-maybourne-riviera-monaco',
      vi: 'khach-san-the-maybourne-riviera-phap-monaco-vip',
      de: 'the-maybourne-riviera-monaco-de',
      fr: 'the-maybourne-riviera-monaco-fr',
      es: 'the-maybourne-riviera-monaco-es',
      it: 'the-maybourne-riviera-monaco-it',
      ja: 'the-maybourne-riviera-monaco-ja',
      ko: 'the-maybourne-riviera-monaco-ko',
      'zh-tw': 'the-maybourne-riviera-monaco-zh-tw',
      'zh-cn': 'the-maybourne-riviera-monaco-zh-cn',
      pt: 'the-maybourne-riviera-monaco-pt',
      ru: 'the-maybourne-riviera-monaco-ru'
    }
  },
  {
    hub_folder: 'expedia_029_loire_grand_luce',
    post_code: 'EXP_PALACE_029',
    location: 'Le Grand-Lucé, Loire Valley, France',
    english_title: 'Château du Grand-Lucé: 18th-Century Neoclassical Loire Valley Palace Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_loire_grand_luce_hero_4k.jpg',
    rating: '5.0/5 (1,420+ Verified Reviews)',
    price_display: 'From $1,150 / night (Private Versailles Gardens & French Aristocracy Suite)',
    expedia_direct_link: '/go/chateau-du-grand-luce-loire',
    expedia_lodging_id: '419205',
    slugs: {
      en: 'chateau-du-grand-luce-loire',
      vi: 'lau-dai-chateau-du-grand-luce-thung-lung-loire-phap-vip',
      de: 'chateau-du-grand-luce-loire-de',
      fr: 'chateau-du-grand-luce-loire-fr',
      es: 'chateau-du-grand-luce-loire-es',
      it: 'chateau-du-grand-luce-loire-it',
      ja: 'chateau-du-grand-luce-loire-ja',
      ko: 'chateau-du-grand-luce-loire-ko',
      'zh-tw': 'chateau-du-grand-luce-loire-zh-tw',
      'zh-cn': 'chateau-du-grand-luce-loire-zh-cn',
      pt: 'chateau-du-grand-luce-loire-pt',
      ru: 'chateau-du-grand-luce-loire-ru'
    }
  },
  {
    hub_folder: 'expedia_030_porto_yeatman',
    post_code: 'EXP_WINE_030',
    location: 'Vila Nova de Gaia, Porto, Portugal',
    english_title: 'The Yeatman Hotel Porto: World Heritage Douro River & 30,000 Bottle Wine Cellar Guide 2026',
    hero_image: '/media/expedia_hotels/expedia_porto_yeatman_hero_4k.jpg',
    rating: '5.0/5 (3,150+ Verified Reviews)',
    price_display: 'From $850 / night (2-Star Michelin Dining & Historic Port Masterclass)',
    expedia_direct_link: '/go/the-yeatman-hotel-porto',
    expedia_lodging_id: '518290',
    slugs: {
      en: 'the-yeatman-hotel-porto',
      vi: 'khach-san-the-yeatman-porto-bo-dao-nha-ham-ruou-vang-vip',
      de: 'the-yeatman-hotel-porto-de',
      fr: 'the-yeatman-hotel-porto-fr',
      es: 'the-yeatman-hotel-porto-es',
      it: 'the-yeatman-hotel-porto-it',
      ja: 'the-yeatman-hotel-porto-ja',
      ko: 'the-yeatman-hotel-porto-ko',
      'zh-tw': 'the-yeatman-hotel-porto-zh-tw',
      'zh-cn': 'the-yeatman-hotel-porto-zh-cn',
      pt: 'the-yeatman-hotel-porto-pt',
      ru: 'the-yeatman-hotel-porto-ru'
    }
  }
];

// Check if already appended
const existingSlugs = new Set(current.map(d => d.slugs.en));
let addedCount = 0;

for (const dest of NEW_10) {
  if (!existingSlugs.has(dest.slugs.en)) {
    current.push(dest);
    addedCount++;
  }
}

fs.writeFileSync(DEST_FILE, JSON.stringify(current, null, 2), 'utf-8');
console.log(`✅ destinations.json updated! Added ${addedCount} new destinations. Total now: ${current.length}`);
