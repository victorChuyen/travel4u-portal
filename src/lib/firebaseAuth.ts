/**
 * 🏛️ TRAVEL4U — CLIENT FIREBASE AUTH ENGINE
 * Google One-Tap + Email/Password + Session Persistence
 * Project: travel4you-app (travel4you-app.firebaseapp.com)
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

import { firebaseConfig } from './firebaseClient';

export interface VipUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  tier: 'tier_01' | 'tier_02' | 'tier_03';
  commissionRate: number; // 0.10, 0.20, 0.30
  refCode: string;
}

const STORAGE_USER_KEY = 't4u_vip_user';
const STORAGE_REF_KEY = 't4u_partner_ref';
const STORAGE_NAME_KEY = 't4u_partner_name';

/**
 * Generate clean Ref Code from Name or Email
 */
export function generateRefCode(nameOrEmail: string): string {
  const clean = (nameOrEmail || 'VIP')
    .split('@')[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();
  const base = clean.slice(0, 8) || 'VIP';
  return `${base}88`;
}

/**
 * Get stored VIP Member profile from localStorage
 */
export function getStoredVipUser(): VipUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    if (raw) return JSON.parse(raw);
    const storedRef = localStorage.getItem(STORAGE_REF_KEY);
    const storedName = localStorage.getItem(STORAGE_NAME_KEY);
    if (storedRef && storedName) {
      return {
        uid: 'LOCAL_' + storedRef,
        email: null,
        displayName: storedName,
        photoURL: null,
        tier: 'tier_02',
        commissionRate: 0.20,
        refCode: storedRef
      };
    }
  } catch (e) {}
  return null;
}

/**
 * Save VIP Member profile to localStorage
 */
export function saveStoredVipUser(user: VipUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    localStorage.setItem(STORAGE_REF_KEY, user.refCode);
    localStorage.setItem(STORAGE_NAME_KEY, user.displayName || 'VIP Member');
  } catch (e) {}
}

/**
 * Clear stored session on logout
 */
export function clearStoredVipUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_REF_KEY);
    localStorage.removeItem(STORAGE_NAME_KEY);
  } catch (e) {}
}
