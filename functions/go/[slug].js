/**
 * Cloudflare Pages Edge Function: Smart Affiliate Link Cloaker & Geo-Tracker
 * Domain: travel4u.us (Expedia Luxury Hotels & Stays Portal)
 * Primary Engine: EXPEDIA GROUP (via Travelpayouts Marker 770720 / Source 567182)
 * Secondary Engine: GetYourGuide (Partner 4G5BPIE)
 */

import teamMembers from '../../src/data/team_members.json';

const EXPEDIA_HOTELS_DIRECTORY = {
  // Paris
  'paris': 'Paris-Hotels-Four-Seasons-Hotel-George-V.h19741.Hotel-Information',
  'paris-hotel': 'Paris-Hotels-Four-Seasons-Hotel-George-V.h19741.Hotel-Information',
  'paris-seine': 'Paris-Hotels-Four-Seasons-Hotel-George-V.h19741.Hotel-Information',
  'gyg_paris_001': 'Paris-Hotels-Four-Seasons-Hotel-George-V.h19741.Hotel-Information',

  // Rome
  'rome': 'Rome-Hotels-Hotel-De-Russie.h26732.Hotel-Information',
  'rome-hotel': 'Rome-Hotels-Hotel-De-Russie.h26732.Hotel-Information',
  'rome-colosseum': 'Rome-Hotels-Hotel-De-Russie.h26732.Hotel-Information',
  'gyg_rome_002': 'Rome-Hotels-Hotel-De-Russie.h26732.Hotel-Information',

  // Como
  'como': 'Cernobbio-Hotels-Villa-DEste.h24901.Hotel-Information',
  'como-hotel': 'Cernobbio-Hotels-Villa-DEste.h24901.Hotel-Information',
  'como-boat': 'Cernobbio-Hotels-Villa-DEste.h24901.Hotel-Information',
  'gyg_como_003': 'Cernobbio-Hotels-Villa-DEste.h24901.Hotel-Information',

  // Kyoto
  'kyoto': 'Kyoto-Hotels-The-Ritz-Carlton-Kyoto.h7337920.Hotel-Information',
  'kyoto-hotel': 'Kyoto-Hotels-The-Ritz-Carlton-Kyoto.h7337920.Hotel-Information',
  'kyoto-tea': 'Kyoto-Hotels-The-Ritz-Carlton-Kyoto.h7337920.Hotel-Information',
  'gyg_kyoto_004': 'Kyoto-Hotels-The-Ritz-Carlton-Kyoto.h7337920.Hotel-Information',

  // Maldives
  'maldives': 'Noonu-Atoll-Hotels-Soneva-Jani.h15917412.Hotel-Information',
  'maldives-hotel': 'Noonu-Atoll-Hotels-Soneva-Jani.h15917412.Hotel-Information',
  'maldives-catamaran': 'Noonu-Atoll-Hotels-Soneva-Jani.h15917412.Hotel-Information',
  'gyg_maldives_005': 'Noonu-Atoll-Hotels-Soneva-Jani.h15917412.Hotel-Information',

  // Utah
  'utah': 'Canyon-Point-Hotels-Amangiri.h3791241.Hotel-Information',
  'antelope-canyon': 'Canyon-Point-Hotels-Amangiri.h3791241.Hotel-Information',
  'gyg_utah_006': 'Canyon-Point-Hotels-Amangiri.h3791241.Hotel-Information',

  // Serengeti
  'serengeti': 'Serengeti-National-Park-Hotels-Four-Seasons-Safari-Lodge-Serengeti.h5791201.Hotel-Information',
  'serengeti-balloon': 'Serengeti-National-Park-Hotels-Four-Seasons-Safari-Lodge-Serengeti.h5791201.Hotel-Information',
  'gyg_safari_007': 'Serengeti-National-Park-Hotels-Four-Seasons-Safari-Lodge-Serengeti.h5791201.Hotel-Information',

  // Venice
  'venice': 'Venice-Hotels-The-Gritti-Palace.h19841.Hotel-Information',
  'venice-gondola': 'Venice-Hotels-The-Gritti-Palace.h19841.Hotel-Information',
  'gyg_venice_008': 'Venice-Hotels-The-Gritti-Palace.h19841.Hotel-Information',

  // Swiss Alps
  'swiss': 'Andermatt-Hotels-The-Chedi-Andermatt.h6891201.Hotel-Information',
  'jungfraujoch-alps': 'Andermatt-Hotels-The-Chedi-Andermatt.h6891201.Hotel-Information',
  'gyg_swiss_009': 'Andermatt-Hotels-The-Chedi-Andermatt.h6891201.Hotel-Information',

  // Dubai
  'dubai': 'Dubai-Hotels-Burj-Al-Arab-Jumeirah.h16912.Hotel-Information',
  'burj-khalifa': 'Dubai-Hotels-Burj-Al-Arab-Jumeirah.h16912.Hotel-Information',
  'gyg_dubai_010': 'Dubai-Hotels-Burj-Al-Arab-Jumeirah.h16912.Hotel-Information'
};

export async function onRequest(context) {
  const { params, request } = context;
  const slug = (params.slug || '').toLowerCase();
  const country = request.cf?.country || 'US';
  const url = new URL(request.url);

  // Extract member ref from query param or cookie
  let memberId = url.searchParams.get('ref') || url.searchParams.get('m') || '';
  if (!memberId) {
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/t4u_member_ref=([^;]+)/);
    if (match) memberId = match[1].trim();
  }

  const member = memberId ? (teamMembers[memberId.toLowerCase()] || null) : null;
  const tpMarker = member && member.active ? (member.travelpayouts_marker || '770720') : '770720';
  const subIdPrefix = member && member.active ? `team_${member.sub_id_prefix}` : 'main';
  const fullMarker = `${tpMarker}.${subIdPrefix}_${country.toLowerCase()}_${slug}`;

  // Check if target is a known luxury hotel on Expedia
  const hotelPath = EXPEDIA_HOTELS_DIRECTORY[slug] || '';
  let targetExpediaUrl = '';

  if (hotelPath) {
    targetExpediaUrl = `https://www.expedia.com/${hotelPath}`;
  } else if (slug && slug.length > 2) {
    const cleanDestination = encodeURIComponent(slug.replace(/[_-]/g, ' '));
    targetExpediaUrl = `https://www.expedia.com/Hotel-Search?destination=${cleanDestination}&star=50`;
  } else {
    targetExpediaUrl = 'https://www.expedia.com/Hotels';
  }

  // Generate Travelpayouts Expedia Deep Link (Program p=4119 for Expedia)
  const affiliateRedirectUrl = `https://tp.media/r?marker=${fullMarker}&p=4119&u=${encodeURIComponent(targetExpediaUrl)}`;

  return Response.redirect(affiliateRedirectUrl, 302);
}
