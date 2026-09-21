/**
 * 👑 TRAVEL4U — TRAVELER INTENT PROFILE SCHEMA & STATE MANAGER
 * Stores and syncs traveler intent across session, localStorage, and URL params.
 */

export type TripType = 'solo' | 'couple' | 'family' | 'business';
export type BudgetLevel = 'value' | 'balanced' | 'premium';
export type IntentStage = 'inspiration' | 'planning' | 'comparison' | 'booking_ready';

export interface IntentProfile {
  destination_id: string;
  destination_name: string;
  origin_country: string;
  trip_type: TripType;
  budget: BudgetLevel;
  duration_days: number;
  travel_month: string | null;
  interests: string[];
  intent_stage: IntentStage;
  updated_at: string;
}

export const DEFAULT_INTENT: IntentProfile = {
  destination_id: 'paris',
  destination_name: 'Paris, France',
  origin_country: 'US',
  trip_type: 'couple',
  budget: 'premium',
  duration_days: 5,
  travel_month: '2026-10',
  interests: ['food', 'culture', 'relaxation'],
  intent_stage: 'planning',
  updated_at: new Date().toISOString()
};

const STORAGE_KEY = 'travel4u_intent_profile';

export function getStoredIntent(): IntentProfile {
  if (typeof window === 'undefined') return DEFAULT_INTENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INTENT;
    return { ...DEFAULT_INTENT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_INTENT;
  }
}

export function saveIntent(intent: Partial<IntentProfile>): IntentProfile {
  const current = getStoredIntent();
  const updated: IntentProfile = {
    ...current,
    ...intent,
    updated_at: new Date().toISOString()
  };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      // Dispatch custom event for reactive UI updates
      window.dispatchEvent(new CustomEvent('travel4u:intent-changed', { detail: updated }));
    } catch (e) {
      console.warn('Failed to save intent to localStorage', e);
    }
  }
  return updated;
}

/**
 * Reads intent params from URL search query if present
 */
export function syncIntentFromUrl(): IntentProfile | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const dest = params.get('dest');
  const type = params.get('type') as TripType;
  const budget = params.get('budget') as BudgetLevel;
  const days = params.get('days') ? parseInt(params.get('days')!, 10) : undefined;
  const month = params.get('month');

  if (dest || type || budget || days || month) {
    return saveIntent({
      ...(dest ? { destination_id: dest, destination_name: dest } : {}),
      ...(type ? { trip_type: type } : {}),
      ...(budget ? { budget } : {}),
      ...(days ? { duration_days: days } : {}),
      ...(month ? { travel_month: month } : {})
    });
  }
  return null;
}
