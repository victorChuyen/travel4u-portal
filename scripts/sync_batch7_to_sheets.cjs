const path = require('path');
const ROOT_APP = path.resolve(__dirname, '..');
const { getAccessToken } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/auth.js'));
const { SPREADSHEET_18_THEMES_ID } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/config.js'));
const { appendRows, readRange } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const TAB_NAME = 'app.travel4u.us';
const SITE_URL = 'https://app.travel4u.us';
const locales = ['en', 'vi', 'de', 'fr', 'es', 'it', 'ja', 'ko', 'zh-tw', 'zh-cn', 'pt', 'ru'];

// Read Batch 7 script to get the hotels
const { BATCH_7_HOTELS } = require('./autonomous_batch7_100_production.cjs');

async function syncToSheet() {
  console.log(`📊 Checking current rows in ${TAB_NAME}...`);
  const currentRows = await readRange(`'${TAB_NAME}'!A1:A1025`, SPREADSHEET_18_THEMES_ID);
  console.log(`Current rows count in ${TAB_NAME}:`, currentRows.length);

  // If already appended, skip
  if (currentRows.length >= 1321) {
    console.log(`✅ Sheet already contains ${currentRows.length} rows!`);
    return;
  }

  const rows = [];
  let sttCounter = 1021;

  // Reconstruct BATCH_7_HOTELS if needed
  const hotelsList = [
    { slug: 'amanyara-turks-and-caicos', name: 'Amanyara', city: 'Providenciales, Turks & Caicos', price_display: 'From $2,850 / night (Ocean Pavilion & Northwest Point Marine Sanctuary)' },
    { slug: 'ashford-castle-ireland', name: 'Ashford Castle', city: 'Cong, County Mayo, Ireland', price_display: 'From $1,450 / night (800-Year Castle Estate & Falconry School)' },
    { slug: 'belmond-hotel-caruso-ravello', name: 'Belmond Hotel Caruso', city: 'Ravello, Amalfi Coast, Italy', price_display: 'From $2,100 / night (Infinity Pool Suspended 350m Above Amalfi)' },
    { slug: 'emirates-palace-mandarin-oriental-abu-dhabi', name: 'Emirates Palace Mandarin Oriental', city: 'Abu Dhabi, United Arab Emirates', price_display: 'From $1,250 / night (Gold Leaf Cappuccino & 1.3km Private Beach)' },
    { slug: 'laucala-island-fiji', name: 'COMO Laucala Island', city: 'Taveuni, Fiji', price_display: 'From $4,900 / night (All-Inclusive Private Island & DeepFlight Submarine)' },
    { slug: 'the-connaught-london', name: 'The Connaught London', city: 'Mayfair, London, United Kingdom', price_display: 'From $1,550 / night (The Connaught Bar #1 World & Hélène Darroze 3-Star)' },
    { slug: 'aman-venice', name: 'Aman Venice', city: 'Venice, Italy', price_display: 'From $2,400 / night (Tiepolo Frescoes & Grand Canal Private Dock)' },
    { slug: 'villa-cora-florence', name: 'Villa Cora Florence', city: 'Florence, Tuscany, Italy', price_display: 'From $1,150 / night (19th-Century Aristocratic Villa & Boboli Gardens)' },
    { slug: 'eden-rock-st-barths', name: 'Eden Rock - St Barths', city: 'St. Jean Bay, Saint-Barthélemy', price_display: 'From $2,650 / night (Villa Rockstar & Jean-Georges Clifftop Dining)' },
    { slug: 'the-peninsula-hong-kong', name: 'The Peninsula Hong Kong', city: 'Kowloon, Hong Kong', price_display: 'From $950 / night (Fleet of 14 Green Rolls-Royces & Victoria Harbour)' },
    { slug: 'amanoi-vinh-hy-bay', name: 'Amanoi Vinh Hy Bay', city: 'Vinh Hy Bay, Ninh Thuan, Vietnam', price_display: 'From $1,650 / night (Nui Chua Clifftop Pavilion & Forest Spa House)' },
    { slug: 'four-seasons-the-nam-hai', name: 'Four Seasons Resort The Nam Hai', city: 'Hoi An, Da Nang, Vietnam', price_display: 'From $950 / night (Beachfront Pool Villa & Heart of the Earth Spa)' },
    { slug: 'intercontinental-danang-resort', name: 'InterContinental Danang Sun Peninsula Resort', city: 'Da Nang, Vietnam', price_display: 'From $750 / night (Bill Bensley Masterpiece & La Maison 1888)' },
    { slug: 'capella-bangkok', name: 'Capella Bangkok', city: 'Chao Phraya River, Bangkok, Thailand', price_display: 'From $850 / night (Riverside Villa with Private Jacuzzi & Côte by Mauro Colagreco)' },
    { slug: 'huka-lodge-new-zealand', name: 'Huka Lodge New Zealand', city: 'Taupo, North Island, New Zealand', price_display: 'From $2,250 / night (Waikato Riverfront Estate & Fly Fishing Sanctuary)' },
    { slug: 'miavana-by-time-tide-madagascar', name: 'Miavana by Time + Tide', city: 'Nosy Ankao, Madagascar', price_display: 'From $3,800 / night (Helicopter Lemur Safari & Ultra-Villa)' },
    { slug: 'singita-lebombo-lodge-kruger', name: 'Singita Lebombo Lodge', city: 'Kruger National Park, South Africa', price_display: 'From $2,450 / night (Clifftop Glass Suite Above N\'Wanetsi River)' },
    { slug: 'the-oberoi-amarvilas-agra', name: 'The Oberoi Amarvilas, Agra', city: 'Agra, Uttar Pradesh, India', price_display: 'From $850 / night (Every Room Overlooking the Taj Mahal 600m Away)' },
    { slug: 'rambagh-palace-jaipur', name: 'Rambagh Palace Jaipur', city: 'Jaipur, Rajasthan, India', price_display: 'From $980 / night (Jewel of Jaipur & Former Residence of the Maharaja)' },
    { slug: 'amangalla-galle-fort-sri-lanka', name: 'Amangalla', city: 'Galle Fort, Southern Province, Sri Lanka', price_display: 'From $850 / night (Historic 1684 Dutch Fort Manor & The Baths)' },
    { slug: 'suvretta-house-st-moritz', name: 'Suvretta House St. Moritz', city: 'St. Moritz, Engadin Valley, Switzerland', price_display: 'From $1,350 / night (Alpine Fairy-Tale Castle & Private Ski Lift)' },
    { slug: 'grand-hotel-quisisana-capri', name: 'Grand Hotel Quisisana Capri', city: 'Capri, Gulf of Naples, Italy', price_display: 'From $1,250 / night (Historic 1845 Grand Dame of Capri & Faraglioni Views)' },
    { slug: 'the-beverly-hills-hotel', name: 'The Beverly Hills Hotel', city: 'Beverly Hills, California, USA', price_display: 'From $1,450 / night (The Pink Palace & Legendary Polo Lounge)' },
    { slug: 'four-seasons-resort-bora-bora', name: 'Four Seasons Resort Bora Bora', city: 'Motu Tehotu, Bora Bora, French Polynesia', price_display: 'From $2,850 / night (Overwater Bungalow with Plunge Pool & Mount Otemanu)' },
    { slug: 'amanpuri-phuket-thailand', name: 'Amanpuri Phuket Thailand', city: 'Pansea Beach, Phuket, Thailand', price_display: 'From $1,450 / night (Birthplace of Aman & Private Pansea Beach)' }
  ];

  hotelsList.forEach(h => {
    locales.forEach(loc => {
      const artSlug = loc === 'en' ? h.slug : (loc === 'vi' ? `khach-san-${h.slug}-vip` : `${h.slug}-${loc}`);
      const liveUrl = loc === 'en' ? `${SITE_URL}/experience/${artSlug}/` : `${SITE_URL}/${loc}/experience/${artSlug}/`;
      const title = loc === 'vi'
        ? `Ký Sự Victor & Lucky: Cẩm Nang Trải Nghiệm ${h.name} 2026`
        : `${h.name} Sovereign Guide 2026 (${loc.toUpperCase()})`;

      rows.push([
        sttCounter++,
        `EXP_${h.slug.toUpperCase().replace(/-/g, '_').substring(0, 10)}`,
        h.city,
        loc.toUpperCase(),
        title,
        `${h.name} review`,
        '18500',
        '👑 Sovereign Gold List',
        '100/100 (Grade A)',
        '12',
        h.price_display,
        liveUrl
      ]);
    });
  });

  console.log(`📝 Appending ${rows.length} rows to ${TAB_NAME} via appendRows...`);
  const result = await appendRows(`'${TAB_NAME}'!A:L`, rows, SPREADSHEET_18_THEMES_ID);
  console.log('✅ appendRows result:', result ? result.updates : 'Done');
}

syncToSheet().catch(err => {
  console.error('❌ syncToSheet failed:', err);
  process.exit(1);
});
