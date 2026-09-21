/**
 * 👑 TRAVEL4U LUXURY EMPIRE — SEPAY AUTOMATED PAYMENT WEBHOOK HANDLER
 * Verified SePay VietQR (BIDV 96247688688 - TRAN NGOC CHUYEN)
 * Edge Execution on Cloudflare Pages Functions
 * Standard Response: HTTP 200 {"success": true}
 */

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function pickString(payload, keys) {
  for (const key of keys) {
    const value = payload?.[key];
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return '';
}

function pickAmount(payload) {
  const amount = Number(payload?.transferAmount ?? payload?.amount ?? payload?.transfer_amount);
  return Number.isFinite(amount) ? amount : null;
}

export async function onRequestPost({ request, env }) {
  let rawBodyText = '';
  let payload = null;

  try {
    rawBodyText = await request.text();
    payload = JSON.parse(rawBodyText);
  } catch (err) {
    return jsonResponse({ success: false, error: 'Invalid JSON payload' }, 400);
  }

  // 1. Extract SePay fields
  const eventId = pickString(payload, ['id', 'transaction_id', 'referenceCode', 'reference_code']) || `SEPAY_${Date.now()}`;
  const gateway = pickString(payload, ['gateway', 'bank_brand_name', 'bankName']) || 'BIDV';
  const accountNumber = pickString(payload, ['accountNumber', 'account_number']) || '96247688688';
  const orderReference = pickString(payload, ['code', 'content', 'description', 'des', 'order_reference']);
  const transferType = (pickString(payload, ['transferType', 'transfer_type']) || 'in').toLowerCase();
  const amount = pickAmount(payload) || 0;
  const transactionDate = pickString(payload, ['transactionDate', 'created_at']) || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  // Only process incoming money (transferType: 'in')
  if (transferType && !['in', 'credit'].includes(transferType)) {
    return jsonResponse({ success: true, ignored: true, message: 'Non-incoming transaction' });
  }

  // 2. Fire Telegram Alert Ting Ting directly to Chairman Victor
  const botToken = env?.TELEGRAM_BOT_TOKEN || '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
  const chatId = env?.TELEGRAM_CHAT_ID || '-1001828947537';

  if (botToken && chatId) {
    try {
      const alertText = `
💰 <b>[TING TING!] XÁC NHẬN TIỀN VỀ TÀI KHOẢN QUA SEPAY</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 <b>Số tiền thực nhận:</b> <b>${Number(amount).toLocaleString('vi-VN')} VNĐ</b>
🏦 <b>Ngân hàng:</b> ${gateway} (${accountNumber})
👤 <b>Chủ tài khoản:</b> TRAN NGOC CHUYEN
📝 <b>Nội dung chuyển khoản:</b> <code>${orderReference || 'N/A'}</code>
🆔 <b>Mã giao dịch SePay:</b> <code>${eventId}</code>
🕒 <b>Thời gian:</b> ${transactionDate}
━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 <b>Google Sheet CRM:</b> <a href="https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit">Kiểm tra Master CRM</a>
`.trim();

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: alertText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
    } catch (teleErr) {
      console.error('Failed sending SePay Telegram alert:', teleErr);
    }
  }

  // 3. Optional Supabase logging if configured
  if (env?.SUPABASE_URL && env?.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { getSupabaseServiceClient } = await import('../_lib/supabase.js');
      const client = getSupabaseServiceClient(env);
      if (client) {
        await client.from('billing_webhook_events').insert({
          provider: 'sepay',
          external_event_id: String(eventId),
          event_type: 'payment.received',
          payload_hash: String(eventId),
        }).maybeSingle();
      }
    } catch (dbErr) {
      console.warn('Supabase optional logging skipped:', dbErr.message);
    }
  }

  // 4. Return exact SePay success response
  return jsonResponse({
    success: true,
    message: 'SePay webhook processed successfully',
    id: eventId,
    amount: amount,
    order: orderReference,
  }, 200);
}

export async function onRequestGet() {
  return jsonResponse({
    success: true,
    service: 'SePay Webhook Edge Listener',
    status: 'ACTIVE',
    bank: 'BIDV - 96247688688 - TRAN NGOC CHUYEN',
  });
}
