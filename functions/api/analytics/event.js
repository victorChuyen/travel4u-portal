/**
 * 👑 TRAVEL4U CLOUDFLARE PAGES API — TELEMETRY & EVENT INGESTION
 * Endpoint: POST /api/analytics/event
 * Ingests traveler intent & conversion funnel events cleanly without PII.
 */

export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const eventName = payload.event;

    if (!eventName) {
      return new Response(JSON.stringify({ error: 'event field is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // In a production setup, this can write to BigQuery, Cloudflare Analytics Engine, or Supabase
    // For sovereign edge privacy, log to console output
    console.log(`[Edge Analytics] Event: ${eventName}`, JSON.stringify({
      event: eventName,
      dest: payload.destination || 'global',
      stage: payload.intent_stage || 'inspiration',
      category: payload.offer_category || null,
      placement: payload.ui_placement || 'web',
      time: payload.timestamp || new Date().toISOString()
    }));

    return new Response(JSON.stringify({ success: true, received: eventName }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
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
