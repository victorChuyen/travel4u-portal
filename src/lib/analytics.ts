/**
 * 👑 TRAVEL4U — CONSENT-AWARE TELEMETRY & ANALYTICS DISPATCHER
 * Fires funnel events cleanly to /api/analytics/event without collecting PII.
 */

export type TravelEventType =
  | 'destination_search'
  | 'destination_selected'
  | 'globe_interaction'
  | 'trip_preferences_submitted'
  | 'ai_plan_started'
  | 'ai_plan_completed'
  | 'ai_plan_failed'
  | 'voice_started'
  | 'voice_completed'
  | 'offer_impression'
  | 'offer_click'
  | 'affiliate_disclosure_viewed'
  | 'itinerary_saved';

export interface TravelEventPayload {
  event: TravelEventType;
  destination?: string;
  intent_stage?: string;
  trip_type?: string;
  budget?: string;
  offer_category?: string;
  offer_provider?: string;
  ui_placement?: string;
  experiment_id?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export async function trackTravelEvent(payload: TravelEventPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const eventData: TravelEventPayload = {
    ...payload,
    timestamp: new Date().toISOString()
  };

  // Safe client-side log
  console.log(`[Analytics] 📊 Event: ${payload.event}`, eventData);

  // Send to serverless endpoint /api/analytics/event (non-blocking)
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/event', blob);
    } else {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        keepalive: true
      }).catch(() => {});
    }
  } catch {
    // Fail silently without disrupting UX
  }
}
