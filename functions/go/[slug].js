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
  'tierra-patagonia-hotel-spa': { id: '4918203', name: 'Tierra Patagonia Hotel & Spa', city: 'Torres del Paine, Patagonia, Chile' }
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
  'tierra-patagonia': 'tierra-patagonia-hotel-spa'
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

  // 4. Standby Mode / Direct Redirection Check
  // If ?direct=1 is supplied, or STANDBY_MODE is enabled in Cloudflare env, route straight to Expedia
  const isDirectMode = url.searchParams.has('direct') || (env && env.STANDBY_MODE === 'true');

  let finalRedirectUrl = targetExpediaUrl;
  if (!isDirectMode) {
    // Wrap with Travelpayouts Expedia Deep Link (Program p=4119 for Expedia)
    const fullMarker = `${tpMarker}.${subIdPrefix}_${country.toLowerCase()}_${rawSlug.replace(/[^a-z0-9_-]/g, '')}`;
    finalRedirectUrl = `https://tp.media/r?marker=${fullMarker}&p=4119&u=${encodeURIComponent(targetExpediaUrl)}`;
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
