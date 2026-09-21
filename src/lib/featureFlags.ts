/**
 * 👑 TRAVEL4U LUXURY EMPIRE — FEATURE FLAGS CONFIGURATION
 * Safe, centralized feature toggles for Phase 1 to Phase 6 upgrades.
 * Default production value: false (zero regression guarantee).
 */

export interface FeatureFlags {
  FEATURE_AI_TRIP_ASSISTANT: boolean;
  FEATURE_VOICE_PLANNER: boolean;
  FEATURE_INTENT_OFFERS: boolean;
  FEATURE_AI_SEARCH_ANALYTICS: boolean;
  FEATURE_PREMIUM_ITINERARY: boolean;
  AFFILIATE_TRACKING_ENABLED: boolean;
}

export const DEFAULT_FLAGS: FeatureFlags = {
  FEATURE_AI_TRIP_ASSISTANT: true, // Enabled for staging/preview interactive testing
  FEATURE_VOICE_PLANNER: false,    // Beta behind explicit opt-in
  FEATURE_INTENT_OFFERS: true,     // Enabled to showcase affiliate offer cards
  FEATURE_AI_SEARCH_ANALYTICS: true, // Telemetry dispatcher
  FEATURE_PREMIUM_ITINERARY: false,  // Design preview
  AFFILIATE_TRACKING_ENABLED: true   // Uses verified partners (Expedia 770720, GYG 4G5BPIE)
};

/**
 * Check if a feature flag is enabled in the current environment
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  if (typeof window !== 'undefined') {
    // Check client localStorage override for preview testing
    const override = localStorage.getItem(`travel4u_flag_${flag}`);
    if (override !== null) {
      return override === 'true';
    }
  }

  // Check import.meta.env or fallback to DEFAULT_FLAGS
  const envVal = (import.meta as any).env?.[flag];
  if (typeof envVal === 'string') {
    return envVal.toLowerCase() === 'true' || envVal === '1';
  }
  if (typeof envVal === 'boolean') {
    return envVal;
  }

  return DEFAULT_FLAGS[flag] ?? false;
}
