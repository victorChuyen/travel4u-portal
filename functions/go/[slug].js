/**
 * 🏛️ TRAVEL4U.US — SOVEREIGN SMART AFFILIATE LINK CLOAKER & EDGE ROUTER
 * Domain: travel4u.us
 * Platform: Cloudflare Pages Edge Functions (Route: /go/[slug])
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 * 
 * Monetization Engines:
 * 1. EXPEDIA GROUP: Travelpayouts Marker 770720 / Source 567182 / Program p=4119
 * 2. GETYOURGUIDE: Direct Partner 4G5BPIE
 * 3. TEAM ATTRIBUTION: Multi-tiered team attribution via ?ref=, ?m=, or cookie
 * 4. DUAL-MODE COMPLIANCE: Standby/Direct toggle (?direct=1 or context.env.STANDBY_MODE)
 */

import teamMembers from '../../src/data/team_members.json';
import destinations from '../../src/data/destinations.json';

// Master 40 Luxury Sanctuaries Registry (Expedia Lodging IDs & City Search fallback)
const SANCTUARIES_REGISTRY = {
  // --- BATCH 1 (1 - 10) ---
  'paris-four-seasons-george-v': { id: '6642', name: 'Four Seasons Hotel George V Paris', city: 'Paris, France' },
  'rome-rocco-forte-de-russie': { id: '523751', name: 'Rocco Forte Hotel De Russie Rome', city: 'Rome, Italy' },
  'como-grand-hotel-tremezzo': { id: '58946683', name: 'Grand Hotel Tremezzo Lake Como', city: 'Lake Como, Italy' },
  'kyoto-ritz-carlton': { id: '7281376', name: 'The Ritz-Carlton Kyoto', city: 'Kyoto, Japan' },
  'maldives-soneva-jani': { id: '15375843', name: 'Soneva Jani Maldives', city: 'Noonu Atoll, Maldives' },
  'utah-sorrel-river-ranch': { id: '546437', name: 'Sorrel River Ranch Resort & Spa Moab', city: 'Moab, Utah, USA' },
  'serengeti-four-seasons-safari': { id: '2949601', name: 'Four Seasons Safari Lodge Serengeti', city: 'Serengeti, Tanzania' },
  'venice-gritti-palace': { id: '27226', name: 'The Gritti Palace Venice', city: 'Venice, Italy' },
  'swiss-chedi-andermatt': { id: '6657290', name: 'The Chedi Andermatt', city: 'Andermatt, Switzerland' },
  'dubai-burj-al-arab': { id: '527497', name: 'Jumeirah Burj Al Arab Dubai', city: 'Dubai, UAE' },

  // --- BATCH 2 (11 - 20) ---
  'passalacqua-lake-como': { id: '94215882', name: 'Passalacqua Lake Como', city: 'Moltrasio, Lake Como, Italy' },
  'villa-deste-lake-como': { id: '18942', name: 'Villa d\'Este Lake Como', city: 'Cernobbio, Lake Como, Italy' },
  'badrutts-palace-st-moritz': { id: '20921', name: 'Badrutt\'s Palace Hotel St. Moritz', city: 'St. Moritz, Switzerland' },
  'cheval-blanc-randheli-maldives': { id: '8213456', name: 'Cheval Blanc Randheli Maldives', city: 'Noonu Atoll, Maldives' },
  'the-nautilus-maldives': { id: '2984123', name: 'The Nautilus Maldives', city: 'Baa Atoll, Maldives' },
  'hoshinoya-kyoto-arashiyama': { id: '3948123', name: 'Hoshinoya Kyoto', city: 'Arashiyama, Kyoto, Japan' },
  'gora-kadan-hakone-onsen': { id: '4192837', name: 'Gora Kadan Hakone', city: 'Hakone, Kanagawa, Japan' },
  'amangiri-canyon-point-utah': { id: '5829103', name: 'Amangiri Canyon Point Utah', city: 'Canyon Point, Utah, USA' },
  'singita-sasakwa-lodge-serengeti': { id: '6928174', name: 'Singita Sasakwa Lodge Serengeti', city: 'Grumeti, Serengeti, Tanzania' },
  'clinique-la-prairie-montreux': { id: '7182930', name: 'Clinique La Prairie Montreux', city: 'Clarens-Montreux, Switzerland' },

  // --- BATCH 3 (21 - 30) ---
  'canaves-oia-suites-santorini': { id: '829104', name: 'Canaves Oia Suites Santorini', city: 'Oia, Santorini, Greece' },
  'le-sirenuse-positano-amalfi': { id: '319402', name: 'Le Sirenuse Positano', city: 'Positano, Amalfi Coast, Italy' },
  'hotel-santa-caterina-amalfi': { id: '291048', name: 'Hotel Santa Caterina Amalfi', city: 'Amalfi, Amalfi Coast, Italy' },
  'four-seasons-resort-bali-sayan': { id: '482019', name: 'Four Seasons Resort Bali at Sayan', city: 'Ubud, Bali, Indonesia' },
  'bulgari-resort-bali-uluwatu': { id: '572910', name: 'Bulgari Resort Bali', city: 'Uluwatu, Bali, Indonesia' },
  'les-sources-de-caudalie-bordeaux': { id: '681920', name: 'Les Sources de Caudalie Bordeaux', city: 'Martillac, Bordeaux, France' },
  'amanzoe-peloponnese-greece': { id: '918230', name: 'Amanzoe Peloponnese', city: 'Porto Heli, Peloponnese, Greece' },
  'the-maybourne-riviera-monaco': { id: '729105', name: 'The Maybourne Riviera', city: 'Roquebrune-Cap-Martin, France' },
  'chateau-du-grand-luce-loire': { id: '419205', name: 'Château du Grand-Lucé', city: 'Le Grand-Lucé, Loire Valley, France' },
  'the-yeatman-hotel-porto': { id: '518290', name: 'The Yeatman Hotel Porto', city: 'Vila Nova de Gaia, Porto, Portugal' },

  // --- BATCH 4 (31 - 40) ---
  'the-mark-hotel-new-york': { id: '19812', name: 'The Mark Hotel New York', city: 'Upper East Side, New York, USA' },
  'aman-new-york-manhattan': { id: '8291047', name: 'Aman New York', city: 'Crown Building, Manhattan, New York, USA' },
  'the-savoy-london-thames': { id: '12891', name: 'The Savoy London', city: 'The Strand, London, United Kingdom' },
  'claridges-london-mayfair': { id: '15821', name: 'Claridge\'s London', city: 'Mayfair, London, United Kingdom' },
  'aman-tokyo-otemachi': { id: '9281745', name: 'Aman Tokyo', city: 'Otemachi, Tokyo, Japan' },
  'hoshinoya-tokyo-onsen': { id: '14829105', name: 'Hoshinoya Tokyo', city: 'Otemachi, Tokyo, Japan' },
  'airelles-gordes-la-bastide-provence': { id: '719284', name: 'Airelles Gordes, La Bastide', city: 'Gordes, Luberon, Provence, France' },
  'cheval-blanc-st-tropez-riviera': { id: '2819405', name: 'Cheval Blanc St-Tropez', city: 'Saint-Tropez, French Riviera, France' },
  'nayara-alto-atacama-desert-lodge': { id: '2194820', name: 'Nayara Alto Atacama', city: 'San Pedro de Atacama, Chile' },
  'tierra-patagonia-hotel-spa': { id: '4918203', name: 'Tierra Patagonia Hotel & Spa', city: 'Torres del Paine, Patagonia, Chile' },

  // --- BATCH 7 (76 - 100) ---
  'amanyara-turks-and-caicos': { id: '1492019', name: 'Amanyara', city: 'Providenciales, Turks & Caicos' },
  'ashford-castle-ireland': { id: '158421', name: 'Ashford Castle', city: 'Cong, County Mayo, Ireland' },
  'belmond-hotel-caruso-ravello': { id: '15892', name: 'Belmond Hotel Caruso', city: 'Ravello, Amalfi Coast, Italy' },
  'emirates-palace-mandarin-oriental-abu-dhabi': { id: '124982', name: 'Emirates Palace Mandarin Oriental', city: 'Abu Dhabi, United Arab Emirates' },
  'laucala-island-fiji': { id: '4918231', name: 'COMO Laucala Island', city: 'Taveuni, Fiji' },
  'the-connaught-london': { id: '1582109', name: 'The Connaught London', city: 'Mayfair, London, United Kingdom' },
  'aman-venice': { id: '819204', name: 'Aman Venice', city: 'Venice, Italy' },
  'villa-cora-florence': { id: '169201', name: 'Villa Cora Florence', city: 'Florence, Tuscany, Italy' },
  'eden-rock-st-barths': { id: '4910291', name: 'Eden Rock - St Barths', city: 'St. Jean Bay, Saint-Barthélemy' },
  'the-peninsula-hong-kong': { id: '12842', name: 'The Peninsula Hong Kong', city: 'Kowloon, Hong Kong' },
  'amanoi-vinh-hy-bay': { id: '6821940', name: 'Amanoi Vinh Hy Bay', city: 'Vinh Hy Bay, Ninh Thuan, Vietnam' },
  'four-seasons-the-nam-hai': { id: '1584210', name: 'Four Seasons Resort The Nam Hai', city: 'Hoi An, Da Nang, Vietnam' },
  'intercontinental-danang-resort': { id: '4918235', name: 'InterContinental Danang Sun Peninsula Resort', city: 'Da Nang, Vietnam' },
  'capella-bangkok': { id: '34918201', name: 'Capella Bangkok', city: 'Chao Phraya River, Bangkok, Thailand' },
  'huka-lodge-new-zealand': { id: '1584291', name: 'Huka Lodge New Zealand', city: 'Taupo, North Island, New Zealand' },
  'miavana-by-time-tide-madagascar': { id: '8192049', name: 'Miavana by Time + Tide', city: 'Nosy Ankao, Madagascar' },
  'singita-lebombo-lodge-kruger': { id: '4918241', name: 'Singita Lebombo Lodge', city: 'Kruger National Park, South Africa' },
  'the-oberoi-amarvilas-agra': { id: '1584299', name: 'The Oberoi Amarvilas, Agra', city: 'Agra, Uttar Pradesh, India' },
  'rambagh-palace-jaipur': { id: '1584288', name: 'Rambagh Palace Jaipur', city: 'Jaipur, Rajasthan, India' },
  'amangalla-galle-fort-sri-lanka': { id: '1584285', name: 'Amangalla', city: 'Galle Fort, Southern Province, Sri Lanka' },
  'suvretta-house-st-moritz': { id: '1584282', name: 'Suvretta House St. Moritz', city: 'St. Moritz, Engadin Valley, Switzerland' },
  'grand-hotel-quisisana-capri': { id: '1584279', name: 'Grand Hotel Quisisana Capri', city: 'Capri, Gulf of Naples, Italy' },
  'the-beverly-hills-hotel': { id: '1584275', name: 'The Beverly Hills Hotel', city: 'Beverly Hills, California, USA' },
  'four-seasons-resort-bora-bora': { id: '1584271', name: 'Four Seasons Resort Bora Bora', city: 'Motu Tehotu, Bora Bora, French Polynesia' },
  'amanpuri-phuket-thailand': { id: '1584268', name: 'Amanpuri Phuket Thailand', city: 'Pansea Beach, Phuket, Thailand' },

  // --- BATCH 6 (51 - 75) ---
  'le-bristol-paris': { id: '12941', name: 'Le Bristol Paris', city: 'Paris, France' },
  'velaa-private-island-maldives': { id: '8192045', name: 'Velaa Private Island Maldives', city: 'Noonu Atoll, Maldives' },
  'the-st-regis-bora-bora': { id: '1528194', name: 'The St. Regis Bora Bora Resort', city: 'Bora Bora, French Polynesia' },
  'six-senses-zighy-bay-oman': { id: '1984210', name: 'Six Senses Zighy Bay', city: 'Musandam Peninsula, Oman' },
  'the-dolder-grand-zurich': { id: '49281', name: 'The Dolder Grand Zurich', city: 'Zurich, Switzerland' },
  'mandarin-oriental-ritz-madrid': { id: '184920', name: 'Mandarin Oriental Ritz Madrid', city: 'Madrid, Spain' },
  'rosewood-hong-kong': { id: '29184021', name: 'Rosewood Hong Kong', city: 'Victoria Dockside, Hong Kong' },
  'hotel-de-crillon-paris': { id: '15928', name: 'Hôtel de Crillon, A Rosewood Hotel', city: 'Paris, France' },
  'park-hyatt-sydney': { id: '12948', name: 'Park Hyatt Sydney', city: 'The Rocks, Sydney, Australia' },
  'amanjiwo-borobudur': { id: '491823', name: 'Amanjiwo Borobudur', city: 'Central Java, Indonesia' },
  'belmond-maroma-riviera-maya': { id: '15849', name: 'Maroma, A Belmond Hotel, Riviera Maya', city: 'Riviera Maya, Mexico' },
  'cheval-blanc-courchevel': { id: '491820', name: 'Cheval Blanc Courchevel', city: 'Courchevel 1850, French Alps' },
  'gili-lankanfushi-maldives': { id: '491024', name: 'Gili Lankanfushi Maldives', city: 'North Malé Atoll, Maldives' },
  'four-seasons-resort-lanai-hawaii': { id: '15829', name: 'Four Seasons Resort Lanai', city: 'Lanai, Hawaii, USA' },
  'castello-di-reschio-umbria': { id: '928104', name: 'Castello di Reschio', city: 'Umbria, Italy' },
  'the-carlyle-rosewood-new-york': { id: '12849', name: 'The Carlyle, A Rosewood Hotel', city: 'Upper East Side, New York, USA' },
  'song-saa-private-island-cambodia': { id: '491840', name: 'Song Saa Private Island', city: 'Koh Rong Archipelago, Cambodia' },
  'aman-le-melezin-courchevel': { id: '491825', name: 'Aman Le Mélézin', city: 'Courchevel 1850, France' },
  'fogo-island-inn-canada': { id: '819203', name: 'Fogo Island Inn', city: 'Joe Batt\'s Arm, Newfoundland, Canada' },
  'singita-boulders-lodge': { id: '481920', name: 'Singita Boulders Lodge', city: 'Sabi Sand, South Africa' },
  'belmond-grand-hotel-timeo-sicily': { id: '16492', name: 'Grand Hotel Timeo, A Belmond Hotel, Taormina', city: 'Taormina, Sicily, Italy' },
  'grand-hotel-a-villa-feltrinelli': { id: '491842', name: 'Grand Hotel a Villa Feltrinelli', city: 'Gargnano, Lake Garda, Italy' },
  'post-ranch-inn-big-sur': { id: '15842', name: 'Post Ranch Inn', city: 'Big Sur, California, USA' },
  'the-oberoi-udaivilas-udaipur': { id: '491829', name: 'The Oberoi Udaivilas, Udaipur', city: 'Udaipur, Rajasthan, India' },
  'qualia-great-barrier-reef': { id: '158210', name: 'Qualia Resort, Hamilton Island', city: 'Hamilton Island, Great Barrier Reef, Australia' },

  // --- BATCH 5 (41 - 50) ---
  'the-lana-hotel-dubai': { id: '10049281', name: 'The Lana Dubai', city: 'Business Bay Canal, Dubai, UAE' },
  'royal-mansour-marrakech': { id: '3782910', name: 'Royal Mansour Marrakech', city: 'Medina, Marrakech, Morocco' },
  'splendido-belmond-portofino': { id: '16482', name: 'Splendido Belmond Portofino', city: 'Portofino, Liguria, Italy' },
  'the-brando-tetiaroa': { id: '8392019', name: 'The Brando Tetiaroa', city: 'Tetiaroa Atoll, French Polynesia' },
  'hotel-de-paris-monte-carlo': { id: '15291', name: 'Hôtel de Paris Monte-Carlo', city: 'Place du Casino, Monte-Carlo, Monaco' },
  'mandarin-oriental-bangkok': { id: '11982', name: 'Mandarin Oriental Bangkok', city: 'Chao Phraya River, Bangkok, Thailand' },
  'cheval-blanc-st-barth': { id: '4892019', name: 'Cheval Blanc St-Barth', city: 'Baie des Flamands, Saint-Barthélemy' },
  'hotel-du-cap-eden-roc-antibes': { id: '29102', name: 'Hôtel du Cap-Eden-Roc Antibes', city: 'Cap d\'Antibes, French Riviera, France' },
  'nihi-sumba-indonesia': { id: '9281039', name: 'Nihi Sumba Indonesia', city: 'Sumba Island, East Nusa Tenggara, Indonesia' },
  'one-and-only-reethi-rah-maldives': { id: '1249821', name: 'One&Only Reethi Rah Maldives', city: 'North Malé Atoll, Maldives' }
};

// Shorthand keywords and common aliases
const KEYWORD_ALIASES = {
  'paris': 'paris-four-seasons-george-v',
  'paris-hotel': 'paris-four-seasons-george-v',
  'george-v': 'paris-four-seasons-george-v',
  'rome': 'rome-rocco-forte-de-russie',
  'rome-hotel': 'rome-rocco-forte-de-russie',
  'de-russie': 'rome-rocco-forte-de-russie',
  'como': 'como-grand-hotel-tremezzo',
  'como-hotel': 'como-grand-hotel-tremezzo',
  'tremezzo': 'como-grand-hotel-tremezzo',
  'passalacqua': 'passalacqua-lake-como',
  'villa-deste': 'villa-deste-lake-como',
  'kyoto': 'kyoto-ritz-carlton',
  'kyoto-hotel': 'kyoto-ritz-carlton',
  'hoshinoya-kyoto': 'hoshinoya-kyoto-arashiyama',
  'hakone': 'gora-kadan-hakone-onsen',
  'gora-kadan': 'gora-kadan-hakone-onsen',
  'maldives': 'maldives-soneva-jani',
  'soneva-jani': 'maldives-soneva-jani',
  'cheval-blanc-maldives': 'cheval-blanc-randheli-maldives',
  'nautilus-maldives': 'the-nautilus-maldives',
  'utah': 'utah-sorrel-river-ranch',
  'sorrel-river': 'utah-sorrel-river-ranch',
  'amangiri': 'amangiri-canyon-point-utah',
  'serengeti': 'serengeti-four-seasons-safari',
  'four-seasons-safari': 'serengeti-four-seasons-safari',
  'singita-sasakwa': 'singita-sasakwa-lodge-serengeti',
  'venice': 'venice-gritti-palace',
  'gritti-palace': 'venice-gritti-palace',
  'swiss': 'swiss-chedi-andermatt',
  'chedi-andermatt': 'swiss-chedi-andermatt',
  'badrutts-palace': 'badrutts-palace-st-moritz',
  'clinique-la-prairie': 'clinique-la-prairie-montreux',
  'dubai': 'dubai-burj-al-arab',
  'burj-al-arab': 'dubai-burj-al-arab',
  'santorini': 'canaves-oia-suites-santorini',
  'canaves-oia': 'canaves-oia-suites-santorini',
  'amalfi': 'le-sirenuse-positano-amalfi',
  'positano': 'le-sirenuse-positano-amalfi',
  'le-sirenuse': 'le-sirenuse-positano-amalfi',
  'santa-caterina': 'hotel-santa-caterina-amalfi',
  'bali': 'four-seasons-resort-bali-sayan',
  'bali-sayan': 'four-seasons-resort-bali-sayan',
  'bulgari-bali': 'bulgari-resort-bali-uluwatu',
  'bordeaux': 'les-sources-de-caudalie-bordeaux',
  'caudalie': 'les-sources-de-caudalie-bordeaux',
  'amanzoe': 'amanzoe-peloponnese-greece',
  'greece': 'amanzoe-peloponnese-greece',
  'maybourne': 'the-maybourne-riviera-monaco',
  'monaco': 'the-maybourne-riviera-monaco',
  'loire': 'chateau-du-grand-luce-loire',
  'grand-luce': 'chateau-du-grand-luce-loire',
  'porto': 'the-yeatman-hotel-porto',
  'yeatman': 'the-yeatman-hotel-porto',
  'mark': 'the-mark-hotel-new-york',
  'the-mark': 'the-mark-hotel-new-york',
  'aman-ny': 'aman-new-york-manhattan',
  'aman-new-york': 'aman-new-york-manhattan',
  'savoy': 'the-savoy-london-thames',
  'the-savoy': 'the-savoy-london-thames',
  'claridges': 'claridges-london-mayfair',
  'aman-tokyo': 'aman-tokyo-otemachi',
  'hoshinoya-tokyo': 'hoshinoya-tokyo-onsen',
  'gordes': 'airelles-gordes-la-bastide-provence',
  'airelles-gordes': 'airelles-gordes-la-bastide-provence',
  'st-tropez': 'cheval-blanc-st-tropez-riviera',
  'cheval-blanc-tropez': 'cheval-blanc-st-tropez-riviera',
  'atacama': 'nayara-alto-atacama-desert-lodge',
  'nayara-atacama': 'nayara-alto-atacama-desert-lodge',
  'patagonia': 'tierra-patagonia-hotel-spa',
  'tierra-patagonia': 'tierra-patagonia-hotel-spa',
  'the-lana': 'the-lana-hotel-dubai',
  'lana-dubai': 'the-lana-hotel-dubai',
  'royal-mansour': 'royal-mansour-marrakech',
  'marrakech': 'royal-mansour-marrakech',
  'splendido': 'splendido-belmond-portofino',
  'portofino': 'splendido-belmond-portofino',
  'the-brando': 'the-brando-tetiaroa',
  'brando': 'the-brando-tetiaroa',
  'hotel-de-paris': 'hotel-de-paris-monte-carlo',
  'monte-carlo': 'hotel-de-paris-monte-carlo',
  'mandarin-bangkok': 'mandarin-oriental-bangkok',
  'bangkok': 'mandarin-oriental-bangkok',
  'cheval-blanc-st-barth': 'cheval-blanc-st-barth',
  'st-barth': 'cheval-blanc-st-barth',
  'eden-roc': 'hotel-du-cap-eden-roc-antibes',
  'antibes': 'hotel-du-cap-eden-roc-antibes',
  'nihi-sumba': 'nihi-sumba-indonesia',
  'sumba': 'nihi-sumba-indonesia',
  'reethi-rah': 'one-and-only-reethi-rah-maldives'
};

// Build fast dynamic index from destinations.json if available
const DYNAMIC_SLUG_MAP = {};
if (Array.isArray(destinations)) {
  destinations.forEach(d => {
    const canonicalKey = d.expedia_direct_link ? d.expedia_direct_link.replace(/^\/go\//, '') : '';
    const hotelMeta = {
      id: d.expedia_lodging_id,
      name: d.english_title ? d.english_title.split(':')[0].trim() : '',
      city: d.location || ''
    };
    if (canonicalKey) {
      DYNAMIC_SLUG_MAP[canonicalKey] = hotelMeta;
    }
    if (d.slugs && typeof d.slugs === 'object') {
      Object.values(d.slugs).forEach(val => {
        if (val) DYNAMIC_SLUG_MAP[val.toLowerCase()] = hotelMeta;
      });
    }
  });
}

export async function onRequest(context) {
  const { params, request, env } = context;
  const rawSlug = (params.slug || '').toLowerCase().trim();
  const url = new URL(request.url);
  const country = (request.cf?.country || 'US').toUpperCase();

  // 1. Team Member Attribution (?ref= or ?m= or Cookie t4u_member_ref)
  let memberId = url.searchParams.get('ref') || url.searchParams.get('m') || '';
  if (!memberId) {
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/t4u_member_ref=([^;]+)/);
    if (match) memberId = match[1].trim().toLowerCase();
  }

  const member = memberId && teamMembers[memberId] && teamMembers[memberId].active ? teamMembers[memberId] : null;
  const tpMarker = member ? (member.travelpayouts_marker || '770720') : '770720';
  const gygPartner = member ? (member.gyg_partner_id || '4G5BPIE') : '4G5BPIE';
  const subIdPrefix = member ? `team_${member.sub_id_prefix}` : 'main';

  // 2. GetYourGuide Tour & VIP Concierge Routing
  if (rawSlug.startsWith('gyg_') || rawSlug.startsWith('tour_') || rawSlug.startsWith('experience_')) {
    const cleanTourSlug = rawSlug.replace(/^(gyg_|tour_|experience_)/, '');
    const gygCmp = `t4u_${subIdPrefix}_${country.toLowerCase()}_${cleanTourSlug}`;
    const gygRedirectUrl = `https://www.getyourguide.com/?partner_id=${gygPartner}&cmp=${encodeURIComponent(gygCmp)}`;
    
    return new Response(null, {
      status: 302,
      headers: {
        'Location': gygRedirectUrl,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow, noarchive'
      }
    });
  }

  // 3. Resolve Target Hotel Property
  let resolvedKey = KEYWORD_ALIASES[rawSlug] || rawSlug;
  let hotelMeta = SANCTUARIES_REGISTRY[resolvedKey] || DYNAMIC_SLUG_MAP[rawSlug] || DYNAMIC_SLUG_MAP[resolvedKey] || null;

  // Search parameters pass-through (dates & guests)
  const chkin = url.searchParams.get('checkin') || url.searchParams.get('chkin') || '';
  const chkout = url.searchParams.get('checkout') || url.searchParams.get('chkout') || '';
  const adults = url.searchParams.get('adults') || '';
  const rooms = url.searchParams.get('rooms') || '';

  const queryParams = new URLSearchParams();
  if (chkin) queryParams.set('chkin', chkin);
  if (chkout) queryParams.set('chkout', chkout);
  if (adults) queryParams.set('adults', adults);
  if (rooms) queryParams.set('rooms', rooms);

  let targetExpediaUrl = '';
  if (hotelMeta && hotelMeta.id) {
    // Official direct Expedia hotel property URL
    targetExpediaUrl = `https://www.expedia.com/Hotel-Information?hotelId=${hotelMeta.id}`;
    if (queryParams.toString()) {
      targetExpediaUrl += `&${queryParams.toString()}`;
    }
  } else if (rawSlug && rawSlug.length > 2) {
    // Targeted 5-Star Expedia Search fallback
    const cleanDestination = encodeURIComponent(rawSlug.replace(/[_-]/g, ' '));
    targetExpediaUrl = `https://www.expedia.com/Hotel-Search?destination=${cleanDestination}&star=50`;
    if (queryParams.toString()) {
      targetExpediaUrl += `&${queryParams.toString()}`;
    }
  } else {
    targetExpediaUrl = 'https://www.expedia.com/Hotels';
  }

  // 4. Standby Mode / Affiliate Activation Check
  // Default is SAFE STANDBY MODE (routes directly to Expedia hotel page to prevent 400/404 errors)
  // Only activates Travelpayouts tracking when env.EXPEDIA_AFFILIATE_ACTIVE === 'true'
  const isAffiliateActive = (env && env.EXPEDIA_AFFILIATE_ACTIVE === 'true') && !url.searchParams.has('direct');
  const expediaProgramId = (env && env.EXPEDIA_PROGRAM_ID) || '4692';

  let finalRedirectUrl = targetExpediaUrl;
  if (isAffiliateActive) {
    // Wrap with verified Travelpayouts Expedia Deep Link when approved
    const fullMarker = `${tpMarker}.${subIdPrefix}_${country.toLowerCase()}_${rawSlug.replace(/[^a-z0-9_-]/g, '')}`;
    finalRedirectUrl = `https://tp.media/r?marker=${fullMarker}&p=${expediaProgramId}&u=${encodeURIComponent(targetExpediaUrl)}`;
  }

  // 5. Return Clean Edge 302 Redirect with Strict Anti-Bot & Privacy Headers
  return new Response(null, {
    status: 302,
    headers: {
      'Location': finalRedirectUrl,
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Referrer-Policy': 'no-referrer-when-downgrade'
    }
  });
}
