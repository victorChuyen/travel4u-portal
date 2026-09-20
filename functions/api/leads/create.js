/**
 * 🏛️ Cloudflare Pages Function: Create Lead & Instant VIP Notification
 * Route: POST /api/leads/create
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const TELEGRAM_BOT_TOKEN = '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
const TELEGRAM_CHAT_ID = '-1001828947537';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      interest,
      note,
      ref_code,
      source_url,
      locale
    } = body;

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Họ tên và Số điện thoại là bắt buộc.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const botToken = env?.TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN;
    const chatId = env?.TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID;
    const phoneClean = (phone || '').replace(/[^0-9]/g, '');

    // Formatted Telegram Lead Alert for Chairman Victor & CSKH Squad
    const teleMsg = `
⚡ <b>[LEAD MỚI: 3 GÓI AI REVENUE] KHÁCH ĐĂNG KÝ TƯ VẤN / ĐỒNG HÀNH</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Khách hàng:</b> <b>${name}</b>
📱 <b>Số điện thoại / Zalo:</b> <code>${phone}</code>
📧 <b>Email:</b> ${email || 'Chưa cung cấp'}
🎯 <b>Gói quan tâm:</b> <b>${interest || 'Gói Giải Pháp AI Doanh Thu'}</b>
📝 <b>Chi tiết yêu cầu:</b> ${note || 'Yêu cầu tư vấn triển khai'}
💎 <b>Đối Tác Giới Thiệu (Ref Code):</b> <code>${ref_code || 'Trực tiếp (HQ)'}</code>
🌐 <b>Từ trang:</b> <code>${source_url || '/'}</code>
🕒 <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>QUY TẮC CSKH 5 PHÚT (HARVARD 900% CONVERSION):</b>
👉 <a href="https://zalo.me/${phoneClean}"><b>BẤM VÀO ĐÂY ĐỂ CHAT ZALO VỚI KHÁCH NGAY</b></a>
📊 <a href="https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit">Kiểm Tra Master CRM Sheet</a>
🎯 <i>(Lưu ý: Khách 3 gói AI Revenue được đội ngũ Victor trực tiếp hỗ trợ; Khách Tour/Hotel do đối tác nền tảng tự phục vụ).</i>
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
        console.error('Telegram lead notification error:', err);
      }
    }

    // Optional CRM Webhook
    const crmWebhook = env?.CRM_WEBHOOK_URL;
    if (crmWebhook) {
      try {
        await fetch(crmWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'lead_captured',
            name,
            phone,
            email,
            interest,
            note,
            ref_code: ref_code || 'direct',
            source_url,
            locale: locale || 'vi',
            created_at: new Date().toISOString()
          })
        });
      } catch (webhookErr) {
        console.error('CRM Webhook error:', webhookErr);
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      status: 'lead_captured',
      message: 'Thông tin của bạn đã được ghi nhận. Chuyên gia VIP sẽ liên hệ trong ít phút.'
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
