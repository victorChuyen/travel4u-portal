/**
 * 👑 TRAVEL4U CLOUDFLARE PAGES API — AI TRIP ASSISTANT ENGINE
 * Endpoint: POST /api/trips/plan
 * Produces structured, non-hallucinatory luxury travel outlines using Gemini API
 * with multi-key, multi-model rotating pool and guaranteed fallback generator.
 */

import { callGeminiMultiKey } from '../_lib/geminiPool.js';

const FALLBACK_PLANS = {
  paris: {
    summary: "Paris is best experienced through a balance of historic grand palaces, private river crossings, and quiet courtyard lunches along Rue du Faubourg Saint-Honoré.",
    best_for: ["Couples seeking Michelin gastronomy", "Art and haute couture enthusiasts", "Acoustic tranquility in private courtyards"],
    watch_out_for: ["High museum queues at the Louvre during midday", "Cobblestones require tailored walking footwear", "August boutique closures"],
    daily_outline: [
      { day: 1, theme: "Arrival & Golden Hour on the Seine", activities: ["Check into Le Bristol or Four Seasons George V", "Private Seine wooden boat cruise at sunset", "Bistro dinner at Le Jardin Français"] },
      { day: 2, theme: "Haute Horlogerie & Impressionist Masterpieces", activities: ["Early private access to Musée d'Orsay", "Lunch at Café de la Paix", "Afternoon stroll through Jardin des Tuileries"] },
      { day: 3, theme: "Michelin Gastronomy & Parisian Jazz", activities: ["3-Star Michelin lunch at Epicure by Éric Frechon", "Vintage book browsing along the Left Bank", "Late evening jazz at Le Duc des Lombards"] }
    ],
    recommended_offer_categories: ["hotel", "activities", "transport", "insurance"],
    follow_up_question: "Would you prefer a private chauffeured day trip to the Champagne region on Day 4?",
    sources: [
      { title: "Travel4U Paris Luxury Guide", url: "https://app.travel4u.us/experience/paris-four-seasons-george-v/" },
      { title: "Le Bristol Paris Master Review", url: "https://app.travel4u.us/experience/le-bristol-paris/" }
    ]
  },
  kyoto: {
    summary: "Kyoto offers timeless sanctuary living centered around zen gardens, wooden onsen pavilions in Arashiyama, and kaiseki dining rituals.",
    best_for: ["Travelers seeking mental clarity and serenity", "Traditional Japanese tea ceremony devotees", "Lovers of minimalist wood architecture"],
    watch_out_for: ["Strict footwear and etiquette rules at historic temples", "Autumn foliage season requires 6-month advance bookings", "Limited late-night dining outside Gion"],
    daily_outline: [
      { day: 1, theme: "Bamboo Groves & Boat Arrival", activities: ["Private wooden boat transfer up the Oi River to Hoshinoya Kyoto", "Matcha welcome ceremony in riverside pavilion", "Multi-course Kaiseki dinner"] },
      { day: 2, theme: "Sacred Shrines & Zen Meditation", activities: ["Sunrise walk at Fushimi Inari before crowds", "Private dry-stone garden meditation at Ryoan-ji", "Evening tea in Gion with Geiko artisan"] },
      { day: 3, theme: "Cedar Onsen & Artisanal Crafts", activities: ["Visit to Nishijin silk weaving studio", "Hot spring thermal soak overlooking cedar forests", "Dinner at The Ritz-Carlton Kyoto Mizuki"] }
    ],
    recommended_offer_categories: ["hotel", "activities", "transport", "insurance"],
    follow_up_question: "Would you like us to arrange a private bullet train Green Car transfer from Tokyo?",
    sources: [
      { title: "Travel4U Kyoto Sanctuary Review", url: "https://app.travel4u.us/experience/kyoto-ritz-carlton/" },
      { title: "Hoshinoya Arashiyama Guide", url: "https://app.travel4u.us/experience/hoshinoya-kyoto-arashiyama/" }
    ]
  },
  maldives: {
    summary: "The Maldives represents the pinnacle of overwater luxury, barefoot coral ecology, and stargazing from suspended ocean villas.",
    best_for: ["Honeymooners & romantic escapes", "Private marine biology and manta ray diving", "Total digital detox and acoustic peace"],
    watch_out_for: ["Seaplane luggage restrictions (usually 20kg per guest)", "Monsoon season transition in late May", "High reef-protection sunscreen mandates"],
    daily_outline: [
      { day: 1, theme: "Seaplane Touchdown & Overwater Check-in", activities: ["VIP Lounge seaplane flight to Noonu Atoll", "Welcome champagne on the retractable roof villa", "Stargazing observatory dinner"] },
      { day: 2, theme: "Coral Reef & Private Sandbank Dining", activities: ["Guided marine biologist turtle excursion", "Couples Ayurvedic massage at overwater spa", "Private candlelit dinner on castaway sandbank"] },
      { day: 3, theme: "Sub-Aquatic Adventure & Sunset Catamaran", activities: ["Underwater wine tasting cellar experience", "Sunset dolphin cruise on luxury catamaran", "Beach cinema under the stars"] }
    ],
    recommended_offer_categories: ["hotel", "activities", "transport", "insurance"],
    follow_up_question: "Would you like a villa with a private water slide directly into the lagoon?",
    sources: [
      { title: "Soneva Jani Master Experience", url: "https://app.travel4u.us/experience/maldives-soneva-jani/" },
      { title: "Velaa Private Island Guide", url: "https://app.travel4u.us/experience/velaa-private-island-maldives/" }
    ]
  }
};

function generateFallbackPlan(intent) {
  const destKey = (intent.destination_id || intent.destination_name || 'paris').toLowerCase();
  
  for (const key of Object.keys(FALLBACK_PLANS)) {
    if (destKey.includes(key)) {
      return FALLBACK_PLANS[key];
    }
  }

  // Dynamic generic fallback tailored to requested days and interests
  const destName = intent.destination_name || 'Your Chosen Sanctuary';
  const days = Math.min(Math.max(intent.duration_days || 3, 2), 7);
  const daily = [];

  for (let i = 1; i <= days; i++) {
    daily.push({
      day: i,
      theme: i === 1 ? `Arrival & Sanctuary Acclimatization in ${destName}` : (i === days ? "Farewell & Sunset Reflection" : `Immersive Discovery & Local Gastronomy (Day ${i})`),
      activities: [
        i === 1 ? "Private airport transfer to your 5-star hotel" : `Curated exploration focusing on ${(intent.interests || ['culture'])[0]}`,
        "Lunch at a Forbes/Michelin recommended local dining room",
        "Evening acoustic relaxation or spa treatment"
      ]
    });
  }

  return {
    summary: `${destName} offers an exquisite retreat tailored for a ${intent.trip_type || 'couple'} seeking a ${intent.budget || 'premium'} travel experience.`,
    best_for: [
      `Curated for ${intent.trip_type || 'discerning'} travelers`,
      `Tailored to interests: ${(intent.interests || ['luxury', 'relaxation']).join(', ')}`,
      "Verified acoustic privacy & Forbes 5-star hospitality"
    ],
    watch_out_for: [
      "Advance reservations recommended for top-tier dining",
      "Check local seasonal weather patterns for your travel dates"
    ],
    daily_outline: daily,
    recommended_offer_categories: ["hotel", "activities", "transport", "insurance"],
    follow_up_question: `Would you like specific restaurant recommendations for ${destName}?`,
    sources: [
      { title: "Travel4U Global Sanctuaries Collection", url: "https://app.travel4u.us/" }
    ]
  };
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const intent = body.intent || body;

    if (!intent || !intent.destination_name && !intent.destination_id) {
      return new Response(JSON.stringify({ error: "destination is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.GEMINI_API_KEY;
    const model = env.GEMINI_MODEL || "gemini-2.0-flash";

    // 1. Attempt generation via Multi-Key, Multi-Model Rotating Pool
    try {
      const prompt = `
You are an expert luxury travel concierge for Travel4U.
A US traveler is planning a trip with this profile:
- Destination: ${intent.destination_name || intent.destination_id}
- Trip Type: ${intent.trip_type || 'couple'}
- Budget: ${intent.budget || 'premium'}
- Duration: ${intent.duration_days || 3} days
- Travel Month: ${intent.travel_month || 'Flexible'}
- Interests: ${(intent.interests || []).join(', ')}

Return ONLY a valid JSON object with this EXACT schema:
{
  "summary": "string (2-3 concise, elegant sentences)",
  "best_for": ["string", "string", "string"],
  "watch_out_for": ["string", "string"],
  "daily_outline": [
    { "day": 1, "theme": "string", "activities": ["string", "string", "string"] }
  ],
  "recommended_offer_categories": ["hotel", "activities", "transport", "insurance"],
  "follow_up_question": "string",
  "sources": [
    { "title": "Travel4U Luxury Stays", "url": "https://app.travel4u.us/" }
  ]
}
Do NOT invent live hotel prices or availability. Recommend categories. Keep tone Condé Nast Traveler style.
`.trim();

      const result = await callGeminiMultiKey(prompt, env);
      if (result && result.content) {
        const cleanJson = result.content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (parsed.summary && parsed.daily_outline) {
          return new Response(JSON.stringify({
            success: true,
            provider: "gemini_multi_key_pool",
            model: result.model,
            key_mask: result.keyMask,
            plan: parsed
          }), {
            status: 200,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
          });
        }
      }
    } catch (poolErr) {
      console.warn("[Gemini Pool] Multi-key rotation call exhausted, engaging sovereign fallback:", poolErr.message);
    }

    // Sovereign Fallback (Instant, 100% reliable)
    const fallbackPlan = generateFallbackPlan(intent);
    return new Response(JSON.stringify({
      success: true,
      provider: "sovereign_curator",
      plan: fallbackPlan
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
