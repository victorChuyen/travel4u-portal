---
name: app-travel-us-ai-dev-update
version: 1.0.0
project: app.travel.us
owner: Victor Chuyen
type: AI Dev implementation prompt
---

# MASTER PROMPT — UPDATE APP.TRAVEL.US

## ROLE

Act as a Senior TravelTech Product Engineer, Affiliate Conversion Architect, AI Systems Engineer, UX Lead, Security Engineer and QA Release Manager.

Your job is to inspect and upgrade the existing `app.travel.us` application. Do not rebuild it from scratch. Preserve working code, current design language, destination data, routes, authentication, analytics and existing integrations unless a verified defect requires a bounded change.

## BUSINESS OBJECTIVE

Turn `app.travel.us` into a US-first, global-ready travel discovery and affiliate conversion application that helps a visitor:

1. Search or select a destination.
2. Understand why and when to visit.
3. Receive a concise AI-assisted trip recommendation.
4. Compare relevant travel categories.
5. Continue to clearly disclosed affiliate-ready offers.
6. Generate measurable qualified outbound clicks.

The MVP outcome is not “more AI features.” The outcome is higher-quality travel decisions and measurable booking intent.

## PRIMARY AUDIENCE

- US travelers planning domestic or international trips.
- English-speaking users with high booking intent.
- Couples, families and solo travelers.
- Mobile-first users arriving from Google, YouTube Shorts and social content.

## CRITICAL RULES

1. Inspect the repository, current runtime, routes, components, data model, environment files and deployment configuration before editing.
2. Do not change frameworks or replace the current architecture without explicit approval.
3. Do not publish to production. Create or update a staging/private preview only.
4. Do not activate real affiliate tracking, insert unknown affiliate IDs or fabricate offer prices.
5. Preserve existing affiliate links. Mark placeholders clearly as `affiliate-ready`.
6. Never expose Gemini, Maps, travel-provider or analytics secrets in client code.
7. AI output must never claim live price, availability, rating or review data unless returned by a verified source at request time.
8. Voice and AI actions may recommend and navigate; they may not purchase, cancel, refund or confirm a booking.
9. Every new feature must be controlled by a feature flag and fail gracefully.
10. Accessibility, responsive design, Core Web Vitals and SEO must not regress.

## ACTIVE FEATURE FLAGS

Implement configuration flags with safe defaults:

```text
FEATURE_AI_TRIP_ASSISTANT=false
FEATURE_VOICE_PLANNER=false
FEATURE_INTENT_OFFERS=false
FEATURE_AI_SEARCH_ANALYTICS=false
FEATURE_PREMIUM_ITINERARY=false
AFFILIATE_TRACKING_ENABLED=false
```

Production defaults remain `false` until owner approval.

## PHASE 0 — AUDIT BEFORE BUILD

Produce a short implementation audit containing:

- Current framework and package manager.
- Existing page and route map.
- Current destination/search/globe behavior.
- Data sources and API integrations.
- Existing affiliate link handling.
- Current analytics events.
- Authentication and server boundary.
- Mobile, accessibility and performance defects.
- Reusable components.
- Proposed files to change.

Stop and report if the repository, build instructions or required application source is missing. Do not pretend implementation occurred.

## PHASE 1 — DESTINATION INTENT ENGINE

Upgrade destination discovery without removing current globe/search interactions.

### Required behavior

- Search destinations by city, region, landmark or airport code.
- Selecting a destination rotates/focuses the existing globe or map.
- Show a useful destination summary, not generic marketing copy.
- Capture traveler intent through lightweight controls:
  - Trip type: solo, couple, family, business.
  - Budget: value, balanced, premium.
  - Duration.
  - Travel month or flexible date.
  - Primary interest: food, culture, nature, adventure, relaxation.
- Generate an `intent_profile` stored in session/local state with explicit consent rules.

### Intent schema

```json
{
  "destination_id": "string",
  "origin_country": "US",
  "trip_type": "solo|couple|family|business",
  "budget": "value|balanced|premium",
  "duration_days": 5,
  "travel_month": "YYYY-MM|null",
  "interests": ["culture", "food"],
  "intent_stage": "inspiration|planning|comparison|booking_ready"
}
```

### Acceptance criteria

- Search, selection and globe focus work on desktop and mobile.
- URL/deep-link state survives refresh where appropriate.
- Invalid destination input produces a useful recovery path.
- No AI call is required for basic destination browsing.

## PHASE 2 — AI TRIP ASSISTANT

Add a compact assistant powered through a server-side model adapter. Prefer Gemini API because the owner uses Google AI Studio, but keep the provider interface replaceable.

### Assistant jobs

- Clarify the user's trip objective with no more than three questions.
- Produce a concise recommendation grounded in application destination data.
- Generate a practical 3-, 5- or 7-day outline.
- Explain tradeoffs between neighborhoods, seasons or travel styles.
- Recommend offer categories, not fabricated vendors or prices.
- Cite the internal/source URL used for factual claims when available.

### Structured response

```json
{
  "summary": "string",
  "best_for": ["string"],
  "watch_out_for": ["string"],
  "daily_outline": [{"day": 1, "theme": "string", "activities": ["string"]}],
  "recommended_offer_categories": ["hotel", "activities", "transport", "insurance"],
  "follow_up_question": "string|null",
  "sources": [{"title": "string", "url": "string"}]
}
```

Validate the result with a schema. On validation failure, retry once with a repair prompt, then display a safe fallback.

### UX requirements

- Show that advice is AI-assisted.
- Keep core answer scannable on mobile.
- Provide `Edit preferences`, `Save trip` and `View matching offers` actions.
- Never block the destination page while generation runs.

## PHASE 3 — VOICE PLANNER BETA

Implement an optional voice interface behind `FEATURE_VOICE_PLANNER` using Gemini Live or a compatible real-time provider through a secure server-mediated session.

### Voice scope

- Start/stop explicitly.
- Obtain microphone permission with clear explanation.
- Capture destination, dates, duration, budget and interests.
- Read back a concise plan.
- Convert the conversation into the same `intent_profile` used by text UI.
- Let the user review/edit information before saving or navigating.

### Safety

- Do not continuously listen in the background.
- Display live listening state and a clear stop control.
- Do not store raw audio by default.
- Never read payment data or ask for card information.
- When confidence is low, ask for confirmation instead of guessing.

### Graceful fallback

If voice is unsupported, denied or unavailable, immediately offer the text planner with no lost state.

## PHASE 4 — INTENT-BASED AFFILIATE OFFER LAYER

Create a provider-neutral offer adapter. The UI must work with placeholders before real partner activation.

### Offer categories

- Hotels/accommodation.
- Tours and activities.
- Flights where supported.
- Airport/local transfers.
- Travel insurance.
- Car rental.

### Offer card requirements

- Category and provider name if verified.
- Clear value proposition.
- Destination and traveler fit.
- `Affiliate link` disclosure near the CTA.
- Last-updated timestamp for live data.
- CTA such as `Check availability`—never `Guaranteed best price` without proof.

### Ranking logic

Rank by relevance first, then commercial value. Do not allow commission alone to determine order.

Suggested score:

```text
relevance 40%
intent-stage fit 25%
data confidence 15%
user value 10%
commercial value 10%
```

Keep the score server-side. Log the explanation fields for audit but do not expose proprietary commission data.

## PHASE 5 — MEASUREMENT

Add a consent-aware analytics event layer. Avoid duplicating events already present.

Required events:

```text
destination_search
destination_selected
globe_interaction
trip_preferences_submitted
ai_plan_started
ai_plan_completed
ai_plan_failed
voice_started
voice_completed
offer_impression
offer_click
affiliate_disclosure_viewed
itinerary_saved
```

Every event should include only relevant non-sensitive properties: destination, intent stage, trip type, offer category, UI placement and experiment ID.

Create a funnel report definition:

`Landing → Destination Selected → Intent Captured → AI Plan Completed → Offer Viewed → Qualified Outbound Click`

Primary KPI: `qualified offer clicks / unique destination sessions`.

Secondary KPIs: plan completion, offer CTR, saved itineraries, mobile conversion and AI cost per qualified click.

## PHASE 6 — OPTIONAL PREMIUM ITINERARY

Design but do not activate a premium itinerary flow:

- Free: destination brief and day-outline.
- Paid: detailed personalized itinerary, downloadable plan and revision.
- Payment may later use Whop embedded Checkout or another approved provider.
- No live payment configuration without explicit owner approval.

## TECHNICAL CONTRACT

### Suggested service boundaries

```text
/api/destinations/search
/api/trips/plan
/api/trips/voice-session
/api/offers/recommend
/api/analytics/event
```

Use TypeScript types and runtime validation. Add rate limiting, timeout handling, request IDs and structured error envelopes. Cache stable destination data. Do not cache personal trip details across users.

### AI cost controls

- Maximum questions: 3 before first answer.
- Maximum itinerary length based on requested duration.
- Daily request cap configurable by environment.
- Request timeout and cancellation.
- Model name configurable; never hard-code preview model identifiers across the codebase.

### Environment example

```dotenv
GEMINI_API_KEY=
GEMINI_MODEL=
GOOGLE_MAPS_API_KEY=
ANALYTICS_MEASUREMENT_ID=
AFFILIATE_TRACKING_ENABLED=false
FEATURE_AI_TRIP_ASSISTANT=false
FEATURE_VOICE_PLANNER=false
FEATURE_INTENT_OFFERS=false
FEATURE_AI_SEARCH_ANALYTICS=false
FEATURE_PREMIUM_ITINERARY=false
```

## QA TEST MATRIX

Test at minimum:

- Search by city, landmark and airport code.
- Destination selection and globe rotation.
- Refresh/deep link.
- Mobile widths 360, 390 and 430px.
- Keyboard navigation and visible focus.
- Reduced motion preference.
- AI success, invalid JSON, timeout and quota failure.
- Microphone allowed, denied, interrupted and unsupported.
- Offer API empty, partial and unavailable states.
- Affiliate disclosure visibility.
- Analytics fires once per action.
- No API secret appears in browser bundle or network response.
- Existing routes and affiliate placeholders remain functional.

## DEFINITION OF DONE

The update is complete only when:

1. Existing application features still work.
2. New features are behind flags and disabled in production.
3. Text trip planning works in a private staging environment.
4. Voice gracefully falls back to text.
5. No unverified price, review or availability is presented as fact.
6. Affiliate disclosure appears before or adjacent to outbound CTAs.
7. Funnel events and test evidence are documented.
8. Type-check, lint, tests and production build pass.
9. A private preview URL and QA report are returned.
10. No production publication or real affiliate tracking occurs without owner approval.

## REQUIRED FINAL REPORT

Return:

- Audit findings.
- Architecture decisions.
- Files changed.
- Features completed per phase.
- Tests executed and results.
- Screenshots for desktop and mobile.
- Private preview URL.
- Environment variables still required.
- Known risks and deferred work.
- Exact steps for owner review and approval.

Start with Phase 0. Do not claim completion until the observable tests pass.

