/**
 * 🏛️ Cloudflare Pages Function: 1-Click Newsletter Preference Capture
 * Route: GET /api/newsletter/preference?email=...&pref=...
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const PREFERENCES_MAP = {
  islands: {
    title: '🏝️ Đảo Riêng Tư & Biệt Thự Nổi (Maldives, Bora Bora, Fiji)',
    filter_tag: 'islands',
    hero: 'Maldives & South Pacific Overwater Sanctuaries',
    redirect: '/#experiences'
  },
  palaces: {
    title: '🏰 Cung Điện Hoàng Gia & Lâu Đài Cổ (Paris, Hồ Como, Venice, Florence)',
    filter_tag: 'palaces',
    hero: 'European Historic Grand Palaces & Lake Como Mansions',
    redirect: '/#experiences'
  },
  ryokans: {
    title: '♨️ Ryokan Truyền Thống & Suối Khoáng Onsen (Kyoto, Hakone)',
    filter_tag: 'ryokans',
    hero: 'Authentic Japanese Ryokans & Private Forest Onsens',
    redirect: '/#experiences'
  },
  safaris: {
    title: '🦁 Safari Thảo Nguyên Hoang Dã Châu Phi (Serengeti, Kruger)',
    filter_tag: 'safaris',
    hero: 'African Big Five Luxury Camps & Remote Wilderness',
    redirect: '/#experiences'
  },
  vip_hacks: {
    title: '✈️ Bí Kíp Săn Phòng & Nâng Hạng VIP ($100 Spa, Free Breakfast)',
    filter_tag: 'booking',
    hero: 'Secret Expedia VIP Perks & High-End Suite Negotiation',
    redirect: '/#experiences'
  }
};

const TELEGRAM_BOT_TOKEN = '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
const TELEGRAM_CHAT_ID = '-1001828947537';
const DEFAULT_APPS_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxxuKKgbd006k0bGRjXhnkBhrzuqRlsYCpddg9lZlv5KjVFPUmQzYDiyi8cA7qqSWvO/exec';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email') || '';
  const prefKey = url.searchParams.get('pref') || 'islands';
  const prefData = PREFERENCES_MAP[prefKey] || PREFERENCES_MAP.islands;

  // 1. Send Telegram Notification
  const botToken = env?.TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN;
  const chatId = env?.TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID;

  if (botToken && chatId && email) {
    try {
      const teleMsg = `
🎯 <b>[KHẢO SÁT BẢN TIN: ĐỘC GIẢ ĐÃ CHỌN SỞ THÍCH]</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 <b>Email độc giả:</b> <code>${email}</code>
🌟 <b>Gu du lịch yêu thích:</b> <b>${prefData.title}</b>
🕒 <b>Thời gian phản hồi:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ <i>Hệ thống tự động điều hướng luồng gửi cẩm nang Thứ Bảy 09:00 AM theo đúng sở thích này.</i>
`.trim();

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
    } catch (teleErr) {
      console.warn('Telegram survey alert error:', teleErr);
    }
  }

  // 2. Sync to Master Google Sheet CRM (Tab NEWSLETTER_SUBSCRIBERS)
  const webhookUrl = env?.APPS_SCRIPT_WEBHOOK_URL || env?.CRM_WEBHOOK_URL || DEFAULT_APPS_SCRIPT_WEBHOOK;
  if (webhookUrl && email) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter_survey',
          email,
          preference: prefData.title,
          timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
          note: `Độc giả đã xác nhận gu du lịch: ${prefData.title}`
        })
      });
    } catch (sheetErr) {
      console.warn('Google Sheet survey sync error:', sheetErr);
    }
  }

  // 3. Render High-End Luxury Confirmation Page (Obsidian & Gold)
  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cảm Ơn Bạn! | Travel4U Journal - Victor & Lucky</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #040a12;
      color: #e2e8f0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: radial-gradient(circle at 50% 20%, rgba(201, 165, 78, 0.12) 0%, transparent 60%);
    }
    .card {
      max-width: 580px;
      margin: 20px;
      padding: 40px 30px;
      background: #081526;
      border: 1px solid rgba(201, 165, 78, 0.35);
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 165, 78, 0.1);
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(201, 165, 78, 0.15);
      border: 1px solid rgba(201, 165, 78, 0.4);
      border-radius: 9999px;
      color: #d4a359;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 12px 0;
      letter-spacing: 0.5px;
    }
    .preference-box {
      background: rgba(4, 10, 18, 0.8);
      border-left: 4px solid #c9a54e;
      padding: 18px;
      border-radius: 12px;
      margin: 24px 0;
      text-align: left;
    }
    .btn {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #d4a359 0%, #c9a54e 100%);
      color: #040a12;
      font-weight: 800;
      font-size: 14px;
      border-radius: 12px;
      text-decoration: none;
      letter-spacing: 0.5px;
      box-shadow: 0 10px 25px rgba(201, 165, 78, 0.25);
      transition: all 0.2s ease;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(201, 165, 78, 0.35);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✨ TRAVEL4U JOURNAL • LỰA CHỌN ĐÃ ĐƯỢC GHI NHẬN</div>
    <h1>Cảm Ơn Bạn Đã Chia Sẻ!</h1>
    <p style="font-size: 14.5px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px;">
      Victor Chuyen & AI CEO Lucky đã tiếp nhận gu du lịch của bạn. Chúng tôi sẽ thiết kế và gửi riêng các cẩm nang thuộc danh mục này vào <strong>09:00 sáng Thứ Bảy</strong> hàng tuần!
    </p>

    <div class="preference-box">
      <div style="font-size: 11px; font-weight: bold; color: #d4a359; text-transform: uppercase; margin-bottom: 6px;">
        Gu Du Lịch Của Bạn:
      </div>
      <div style="font-size: 15px; font-weight: bold; color: #ffffff;">
        ${prefData.title}
      </div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">
        Độc quyền gửi tới: <span style="color: #38bdf8;">${email || 'Độc giả VIP'}</span>
      </div>
    </div>

    <p style="font-size: 13px; color: #cbd5e1; margin-bottom: 28px;">
      Bây giờ, mời bạn khám phá ngay Bộ sưu tập 100 Khách Sạn Vàng toàn cầu trên Web App của chúng tôi:
    </p>

    <a href="https://app.travel4u.us/#experiences" class="btn">
      KHÁM PHÁ 100 KHÁCH SẠN VÀNG NGAY →
    </a>

    <div style="margin-top: 30px; font-size: 11px; color: #475569;">
      © 2026 Travel4U Luxury Empire. All rights reserved.
    </div>
  </div>
</body>
</html>
  `.trim();

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
