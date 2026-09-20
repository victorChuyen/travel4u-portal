/**
 * 🏛️ TRAVEL4U & OPC CRM SYNC HELPER
 * Syncs Leads & Orders directly to Google Sheets CRM (Tab OPC_CRM_CUSTOMERS)
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const DEFAULT_APPS_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxxuKKgbd006k0bGRjXhnkBhrzuqRlsYCpddg9lZlv5KjVFPUmQzYDiyi8cA7qqSWvO/exec';

/**
 * Record Customer Lead or Order to Master Google Sheet CRM
 */
export async function syncLeadToGoogleSheetCRM({
  id = '',
  name = '',
  phone = '',
  email = '',
  business = '',
  tier = '',
  tier_name = '',
  payment_type = 'Tư vấn',
  amount_paid = 0,
  amount_remaining = 0,
  ref_code = '',
  note = '',
  status = 'Mới Tiếp Nhận',
  env = {}
}) {
  const webhookUrl = env.APPS_SCRIPT_WEBHOOK_URL || env.CRM_WEBHOOK_URL || DEFAULT_APPS_SCRIPT_WEBHOOK;
  if (!webhookUrl) {
    console.warn('⚠️ [CRM Sync] No Google Sheet Webhook URL configured.');
    return { ok: false, error: 'No webhook URL' };
  }

  const payload = {
    id: id || `LEAD-${Date.now()}`,
    name,
    phone,
    email,
    business: business || 'Doanh nghiệp / Cá nhân',
    service: tier_name || tier || '3 Gói AI Doanh Thu',
    payment_type,
    amount_paid,
    amount_remaining,
    ref_code: ref_code || 'direct',
    note: note || '',
    status: status || 'Mới Tiếp Nhận',
    timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
    source: 'app.travel4u.us'
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('✅ [CRM Sync] Synced customer to Google Sheet CRM successfully.');
    return { ok: true };
  } catch (err) {
    console.error('❌ [CRM Sync] Error syncing to Google Sheet:', err);
    return { ok: false, error: err.message };
  }
}
