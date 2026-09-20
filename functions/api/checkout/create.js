/**
 * Cloudflare Pages Function: Create Checkout Order & Trigger Alerts
 * Route: POST /api/checkout/create
 */

const TELEGRAM_BOT_TOKEN = '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
const TELEGRAM_CHAT_ID = '-1001828947537';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const {
      order_id,
      name,
      phone,
      email,
      business,
      tier,
      tier_name,
      payment_type,
      amount_paid,
      amount_remaining,
      status
    } = body;

    if (!order_id || !name || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required order fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const botToken = env?.TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN;
    const chatId = env?.TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID;
    const phoneClean = (phone || '').replace(/[^0-9]/g, '');
    const isDeposit = payment_type === 'deposit';

    // Formatted Telegram Alert
    const teleMsg = `
⚡ <b>[ĐƠN MỚI TẠO] KHÁCH ĐANG CHUYỂN KHOẢN / ĐẶT CỌC</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Khách hàng:</b> ${name}
📱 <b>Số điện thoại / Zalo:</b> <code>${phone}</code>
📧 <b>Email:</b> ${email || 'N/A'}
🏢 <b>Doanh nghiệp:</b> ${business || 'Chưa cập nhật'}
💼 <b>Gói dịch vụ:</b> <b>${tier_name || tier}</b>
💵 <b>Hình thức:</b> ${isDeposit ? 'ĐẶT CỌC 50%' : 'THANH TOÁN 100%'}
💰 <b>Số tiền cần thanh toán:</b> <b>${Number(amount_paid || 0).toLocaleString('vi-VN')} VNĐ</b>
${amount_remaining ? `⏳ <b>Số tiền còn lại sau cọc:</b> ${Number(amount_remaining).toLocaleString('vi-VN')} VNĐ\n` : ''}
🏦 <b>Mã đơn / Nội dung CK:</b> <code>${order_id}</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 <b>Master Google Sheet CRM:</b> <a href="https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit">Xem CRM Khách Hàng</a>
📲 <b>Bấm Chat Zalo Ngay:</b> <a href="https://zalo.me/${phoneClean}">Mở Zalo ${phone}</a>
`.trim();

    // Fire Telegram Notification
    if (botToken && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: teleMsg,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        });
      } catch (err) {
        console.error('Telegram notification error:', err);
      }
    }

    // Optional Webhook for CRM (n8n / Google Sheets)
    const crmWebhook = env?.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      try {
        await fetch(crmWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'checkout_order_created',
            order_id,
            name,
            phone,
            email,
            business,
            tier,
            tier_name,
            payment_type,
            amount_paid,
            amount_remaining,
            created_at: new Date().toISOString()
          })
        });
      } catch (webhookErr) {
        console.error('CRM Webhook error:', webhookErr);
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      order_id,
      status: 'pending_payment',
      message: 'Order created and alert dispatched successfully.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
