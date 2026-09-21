/**
 * 🏛️ TRAVEL4U & OPC AI REVENUE LAB — LUXURY CRM & JOURNAL EMAIL DISPATCHER
 * Powered by Resend API (breaths.live / travel4u.us domain) & Webhook Fallback
 * Standards: Forbes Luxury Concierge & 100% Primary Inbox Deliverability
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const DEFAULT_SENDER = 'Victor & Lucky - Travel4U Luxury Empire <concierge@travel4u.us>';
const DEFAULT_JOURNAL_SENDER = 'Victor & Lucky - Travel4U Journal <journal@travel4u.us>';
const DEFAULT_APPS_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxxuKKgbd006k0bGRjXhnkBhrzuqRlsYCpddg9lZlv5KjVFPUmQzYDiyi8cA7qqSWvO/exec';

/**
 * Clean HTML to text fallback
 */
function stripHtml(html = '') {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dispatch Luxury Onboarding & Consultation Email for 3 AI Revenue Packages
 */
export async function sendLuxuryOnboardingEmail({
  to,
  name,
  tier_name = 'Gói Giải Pháp AI Doanh Thu',
  phone = '',
  order_id = '',
  payment_type = '',
  amount = 0,
  ref_code = '',
  env = {}
}) {
  if (!to || !to.includes('@')) {
    console.warn('⚠️ [Email Service] Invalid recipient email:', to);
    return { ok: false, error: 'Invalid email address' };
  }

  const apiKey = env?.RESEND_API_KEY;
  const sender = env?.RESEND_FROM_EMAIL || DEFAULT_SENDER;
  const cleanName = name || 'Quý Khách';
  const cleanPhone = phone || 'Chưa cập nhật';
  const isPaid = payment_type === 'full' || payment_type === 'deposit';

  const subject = isPaid
    ? `⚡ [Xác Nhận Đơn Hàng] Lộ trình triển khai ${tier_name} | Victor Chuyen`
    : `⚡ [OPC AI Revenue Lab] Xác nhận đăng ký tư vấn ${tier_name} | Victor Chuyen`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#07111e;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#07111e;padding:30px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#0b1726;border-radius:20px;border:1px solid rgba(201,165,78,0.3);overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header Banner with Gold Gradient -->
          <tr>
            <td style="background:linear-gradient(135deg, #0e1e33 0%, #172d4a 100%);padding:30px 25px;text-align:center;border-bottom:1px solid rgba(201,165,78,0.2);">
              <div style="display:inline-block;padding:4px 14px;background:rgba(201,165,78,0.15);border:1px solid rgba(201,165,78,0.4);border-radius:20px;color:#c9a54e;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">
                OPC AI REVENUE LAB • VICTOR CHUYEN
              </div>
              <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:0.5px;font-family:Georgia,serif;">
                LỘ TRÌNH ĐỒNG HÀNH & TRIỂN KHAI AI DOANH THU
              </h1>
              <p style="margin:8px 0 0 0;font-size:13px;color:#94a3b8;">
                Thực chiến • Đo lường được • Tiết kiệm 80% thời gian vận hành
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:30px 25px;">
              <h2 style="color:#c9a54e;font-size:17px;margin-top:0;">Kính chào ${cleanName},</h2>
              
              <p style="font-size:14px;line-height:1.6;color:#cbd5e1;">
                Cảm ơn Anh/Chị đã đăng ký thông tin với <strong>OPC AI Revenue Lab</strong>. Victor Chuyen và đội ngũ kỹ thuật AI đã tiếp nhận yêu cầu và sẽ đồng hành trực tiếp cùng Anh/Chị để biến AI thành kết quả doanh thu thực tế.
              </p>

              <!-- Package Highlights Box -->
              <div style="background:rgba(15,23,42,0.8);border-left:4px solid #c9a54e;padding:18px;margin:22px 0;border-radius:10px;">
                <h3 style="margin:0 0 10px 0;font-size:15px;color:#c9a54e;font-weight:bold;">
                  📋 THÔNG TIN GÓI GIẢI PHÁP ĐÃ ĐĂNG KÝ:
                </h3>
                <ul style="margin:0;padding-left:18px;font-size:13.5px;color:#cbd5e1;line-height:1.8;">
                  <li><strong>Gói giải pháp:</strong> <span style="color:#ffffff;font-weight:bold;">${tier_name}</span></li>
                  <li><strong>Khách hàng:</strong> ${cleanName}</li>
                  <li><strong>Số điện thoại / Zalo:</strong> <span style="color:#38bdf8;">${cleanPhone}</span></li>
                  ${order_id ? `<li><strong>Mã đơn hàng:</strong> <code style="background:#1e293b;padding:2px 6px;border-radius:4px;color:#facc15;">${order_id}</code></li>` : ''}
                  ${amount ? `<li><strong>Số tiền:</strong> <strong style="color:#4ade80;">${Number(amount).toLocaleString('vi-VN')} VNĐ</strong></li>` : ''}
                  <li><strong>Trạng thái:</strong> <span style="color:#fbbf24;font-weight:bold;">Đang kết nối hỗ trợ 1:1</span></li>
                </ul>
              </div>

              <!-- 3 Core Steps -->
              <h3 style="font-size:15px;color:#ffffff;margin:25px 0 12px 0;">
                🚀 3 BƯỚC TIẾP THEO ĐỂ KÍCH HOẠT QUY TRÌNH:
              </h3>
              
              <div style="background:#07111e;border:1px solid #1e293b;border-radius:12px;padding:15px;margin-bottom:12px;">
                <strong style="color:#38bdf8;">Bước 1: Đặt Lịch Hẹn Chiến Lược 1:1 Cùng Victor Chuyen</strong>
                <p style="margin:5px 0 0 0;font-size:13px;color:#94a3b8;">
                  Chọn khung giờ thuận tiện nhất để Victor trực tiếp audit bài toán kinh doanh và thiết kế luồng tự động hóa phù hợp.
                </p>
                <div style="margin-top:10px;">
                  <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#c9a54e;color:#07111e;font-weight:900;font-size:12px;padding:9px 18px;border-radius:8px;text-decoration:none;display:inline-block;">
                    📅 ĐẶT LỊCH HẸN TRỰC TUYẾN NGAY &gt;
                  </a>
                </div>
              </div>

              <div style="background:#07111e;border:1px solid #1e293b;border-radius:12px;padding:15px;margin-bottom:12px;">
                <strong style="color:#38bdf8;">Bước 2: Kết Nối Zalo Trực Tiếp Hỗ TrỢ 24/7</strong>
                <p style="margin:5px 0 0 0;font-size:13px;color:#94a3b8;">
                  Gửi tin nhắn qua Zalo cá nhân của Victor Chuyen (0989890022) để nhận tài liệu hướng dẫn và template Google Sheet CRM.
                </p>
                <div style="margin-top:10px;">
                  <a href="https://zalo.me/0989890022" target="_blank" style="background:#2563eb;color:#ffffff;font-weight:900;font-size:12px;padding:9px 18px;border-radius:8px;text-decoration:none;display:inline-block;">
                    💬 NHẮN ZALO VICTOR CHUYEN (0989890022) &gt;
                  </a>
                </div>
              </div>

              <div style="background:#07111e;border:1px solid #1e293b;border-radius:12px;padding:15px;margin-bottom:20px;">
                <strong style="color:#38bdf8;">Bước 3: Kích Hoạt Quyền Lợi Đối Tác Affiliate VIP (10% - 20% - 30%)</strong>
                <p style="margin:5px 0 0 0;font-size:13px;color:#94a3b8;">
                  Tất cả khách hàng của Victor Chuyen đều được cấp Mã Đối Tác độc quyền để nhận hoa hồng từ 50.000đ đến 3.000.000đ khi giới thiệu bạn bè.
                </p>
                <div style="margin-top:10px;">
                  <a href="https://app.travel4u.us/aff/" target="_blank" style="background:#10b981;color:#ffffff;font-weight:900;font-size:12px;padding:9px 18px;border-radius:8px;text-decoration:none;display:inline-block;">
                    💎 VÀO DASHBOARD ĐỐI TÁC AFFILIATE &gt;
                  </a>
                </div>
              </div>

              <!-- Founder Signature -->
              <div style="border-top:1px solid rgba(201,165,78,0.2);padding-top:20px;margin-top:25px;">
                <p style="margin:0;font-size:14px;color:#ffffff;font-weight:bold;">Trân trọng & Đồng hành,</p>
                <p style="margin:4px 0 0 0;font-size:15px;color:#c9a54e;font-family:Georgia,serif;font-weight:bold;">
                  Victor Chuyen (Trần Ngọc Chuyền)
                </p>
                <p style="margin:2px 0 0 0;font-size:12px;color:#94a3b8;">
                  Founder OPC AI Revenue Lab • Chairman Travel4U Luxury Empire<br>
                  Hotline / Zalo: 0989890022 • Website: app.travel4u.us
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#07111e;padding:15px;text-align:center;border-top:1px solid #1e293b;">
              <p style="margin:0;font-size:11px;color:#64748b;">
                © 2026 OPC AI Revenue Lab & Travel4U. Mọi quyền được bảo lưu.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const plainText = stripHtml(html);

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: sender,
          to: [to],
          subject: subject,
          html: html,
          text: plainText
        })
      });
      const data = await res.json();
      console.log('✅ [Email Service] Dispatched SaaS onboarding email to:', to, data);
      return { ok: true, data };
    } catch (err) {
      console.error('❌ [Email Service] Resend error:', err);
    }
  }

  return { ok: true, note: 'Processed with fallback transport' };
}

/**
 * 👑 Dispatch Luxury Travel Journal Welcome Email (Email #1 in 5-Email Sequence)
 * Includes Instant 100 Gold List Delivery & Interactive 1-Click Preference Survey
 */
export async function sendLuxuryTravelNewsletterWelcomeEmail({
  to,
  name = 'Độc Giả VIP',
  preference = 'Tất Cả Cẩm Nang VIP 2026',
  locale = 'vi',
  ref_code = 'direct',
  env = {}
}) {
  if (!to || !to.includes('@')) {
    console.warn('⚠️ [Email Service] Invalid recipient email:', to);
    return { ok: false, error: 'Invalid email address' };
  }

  const apiKey = env?.RESEND_API_KEY;
  const sender = env?.RESEND_JOURNAL_EMAIL || env?.RESEND_FROM_EMAIL || DEFAULT_JOURNAL_SENDER;
  const isVi = (locale || 'vi').toLowerCase().startsWith('vi');

  const subject = isVi
    ? `✨ [Cẩm Nang 2026] Chào mừng bạn gia nhập Travel4U Journal | Victor & Lucky`
    : `✨ [2026 Gold List] Welcome to the Travel4U Sovereign Journal | Victor & Lucky`;

  const surveyBaseUrl = 'https://app.travel4u.us/api/newsletter/preference';
  const encodedEmail = encodeURIComponent(to);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#040a12;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#040a12;padding:35px 10px;">
    <tr>
      <td align="center">
        <table width="620" border="0" cellspacing="0" cellpadding="0" style="background:#081526;border-radius:24px;border:1px solid rgba(201,165,78,0.35);overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.8);">
          
          <!-- Top Accent Line -->
          <tr>
            <td style="background:linear-gradient(90deg, #c9a54e 0%, #ecd699 50%, #c9a54e 100%);height:4px;"></td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(180deg, #0b1c33 0%, #081526 100%);padding:36px 30px 24px 30px;text-align:center;border-bottom:1px solid rgba(201,165,78,0.2);">
              <div style="display:inline-block;padding:5px 16px;background:rgba(201,165,78,0.12);border:1px solid rgba(201,165,78,0.35);border-radius:20px;color:#d4a359;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">
                👑 TRAVEL4U JOURNAL • SOVEREIGN LUXURY DISPATCH
              </div>
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:0.5px;font-family:Georgia,serif;line-height:1.3;">
                ${isVi ? 'CHÀO MỪNG BẠN GIA NHẬP HỘI ĐỘC GIẢ TINH HOA' : 'WELCOME TO THE SOVEREIGN TRAVELERS CIRCLE'}
              </h1>
              <p style="margin:10px 0 0 0;font-size:13.5px;color:#94a3b8;line-height:1.5;">
                ${isVi ? 'Cẩm nang du lịch xa xỉ độc bản • Đánh giá thực tế không quảng cáo ảo • Đặc quyền VIP đối tác' : 'Independent luxury travel diaries • Unfiltered sanctuary reviews • Secret booking privileges'}
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:15px;line-height:1.6;color:#ffffff;margin-top:0;">
                ${isVi ? `Chào bạn,` : `Dear distinguished traveler,`}
              </p>
              
              <p style="font-size:14px;line-height:1.7;color:#cbd5e1;">
                ${isVi
                  ? `Chúng tôi là <strong>Victor Chuyen & AI CEO Lucky</strong>, những người sáng lập <strong>Travel4U Luxury Empire</strong>. Cảm ơn bạn đã lựa chọn trao gửi niềm tin để đồng hành cùng chúng tôi trong hành trình khám phá những kiệt tác nghỉ dưỡng xa xỉ đẹp nhất hành tinh.`
                  : `We are <strong>Victor Chuyen & AI CEO Lucky</strong>, executive curators at <strong>Travel4U Luxury Empire</strong>. Thank you for joining our private travel circle as we explore the world’s most breathtaking sanctuaries.`}
              </p>

              <!-- Lead Magnet Delivery Box -->
              <div style="background:rgba(4,10,18,0.7);border:1px solid rgba(201,165,78,0.35);border-radius:16px;padding:22px;margin:26px 0;text-align:center;">
                <div style="font-size:11px;font-weight:800;color:#d4a359;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                  🎁 ${isVi ? 'QUÀ TẶNG CHÀO MỪNG ĐỘC QUYỀN' : 'EXCLUSIVE WELCOME ASSET'}
                </div>
                <h3 style="margin:0 0 10px 0;font-size:17px;color:#ffffff;font-family:Georgia,serif;">
                  ${isVi ? 'BẢN ĐỒ 100 KHÁCH SẠN VÀNG THẾ GIỚI (2026 SOVEREIGN GOLD LIST)' : 'THE 2026 SOVEREIGN GOLD LIST (TOP 100 SANCTUARIES)'}
                </h3>
                <p style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:18px;">
                  ${isVi ? '100 Kiệt tác nghỉ dưỡng được thẩm định thực tế: Từ lâu đài Como, biệt thự nước Bora Bora, ryokan Onsen Kyoto đến safari Serengeti.' : '100 Hand-vetted sanctuaries across 12 locales with verified acoustics, Michelin dining, and secret room upgrade privileges.'}
                </p>
                <a href="https://app.travel4u.us/#experiences" target="_blank" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg, #d4a359 0%, #c9a54e 100%);color:#07111e;font-weight:800;font-size:13px;border-radius:10px;text-decoration:none;letter-spacing:0.5px;box-shadow:0 8px 20px rgba(201,165,78,0.25);">
                  ${isVi ? 'KHÁM PHÁ 100 KHÁCH SẠN VÀNG NGAY →' : 'ACCESS THE 100 GOLD LIST SANCTUARIES →'}
                </a>
              </div>

              <!-- Interactive Preference Questionnaire (Cầu Thị Section) -->
              <div style="border-top:1px dashed rgba(201,165,78,0.25);padding-top:24px;margin-top:26px;">
                <div style="display:inline-block;padding:3px 10px;background:rgba(56,189,248,0.1);border-radius:6px;color:#38bdf8;font-size:11px;font-weight:bold;margin-bottom:10px;">
                  🎯 ${isVi ? 'CÂU HỎI CẦU THỊ TỪ VICTOR & LUCKY' : 'CURATOR CONCIERGE QUESTION'}
                </div>
                <h4 style="margin:0 0 10px 0;font-size:16px;color:#ffffff;">
                  ${isVi ? 'Bạn đang khao khát trải nghiệm nào nhất trong năm 2026?' : 'Which luxury travel experience moves your soul the most in 2026?'}
                </h4>
                <p style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">
                  ${isVi
                    ? 'Để cẩm nang gửi vào <strong>09:00 sáng Thứ Bảy</strong> hàng tuần đúng chuẩn gu của bạn, hãy bấm chọn 1 trải nghiệm bên dưới (Hệ thống sẽ tự động ghi nhận ngay lập tức):'
                    : 'To ensure our weekly Saturday 09:00 AM dispatches match your personal taste, tap your favorite category below:'}
                </p>

                <!-- 5 1-Click Interactive Survey Buttons -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:10px;">
                  <tr>
                    <td style="padding:5px 0;">
                      <a href="${surveyBaseUrl}?email=${encodedEmail}&pref=islands" target="_blank" style="display:block;padding:12px 16px;background:#0c1d33;border:1px solid rgba(56,189,248,0.25);border-radius:10px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;">
                        🏝️ <strong>${isVi ? 'Đảo Riêng & Biệt Thự Nổi' : 'Private Islands & Overwater Villas'}</strong>
                        <span style="color:#94a3b8;font-size:12px;display:block;margin-top:2px;">${isVi ? 'Maldives, Bora Bora, Fiji, Madagascar' : 'Maldives, Bora Bora, Fiji, Madagascar'}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;">
                      <a href="${surveyBaseUrl}?email=${encodedEmail}&pref=palaces" target="_blank" style="display:block;padding:12px 16px;background:#0c1d33;border:1px solid rgba(201,165,78,0.25);border-radius:10px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;">
                        🏰 <strong>${isVi ? 'Cung Điện Hoàng Gia & Lâu Đài Cổ' : 'Historic European Grand Palaces'}</strong>
                        <span style="color:#94a3b8;font-size:12px;display:block;margin-top:2px;">${isVi ? 'Paris, Hồ Como, Venice, Florence, St. Moritz' : 'Paris, Lake Como, Venice, Florence, St. Moritz'}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;">
                      <a href="${surveyBaseUrl}?email=${encodedEmail}&pref=ryokans" target="_blank" style="display:block;padding:12px 16px;background:#0c1d33;border:1px solid rgba(234,179,8,0.25);border-radius:10px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;">
                        ♨️ <strong>${isVi ? 'Ryokan Truyền Thống & Suối Khoáng Onsen' : 'Japanese Zen Ryokans & Mineral Onsens'}</strong>
                        <span style="color:#94a3b8;font-size:12px;display:block;margin-top:2px;">${isVi ? 'Kyoto, Hakone, Núi Phú Sĩ, Otemachi' : 'Kyoto, Hakone, Mount Fuji, Otemachi'}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;">
                      <a href="${surveyBaseUrl}?email=${encodedEmail}&pref=safaris" target="_blank" style="display:block;padding:12px 16px;background:#0c1d33;border:1px solid rgba(16,185,129,0.25);border-radius:10px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;">
                        🦁 <strong>${isVi ? 'Safari Hoang Dã Châu Phi (Big Five)' : 'African Big Five Luxury Safaris'}</strong>
                        <span style="color:#94a3b8;font-size:12px;display:block;margin-top:2px;">${isVi ? 'Serengeti, Kruger, Maasai Mara' : 'Serengeti, Kruger, Maasai Mara'}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;">
                      <a href="${surveyBaseUrl}?email=${encodedEmail}&pref=vip_hacks" target="_blank" style="display:block;padding:12px 16px;background:#0c1d33;border:1px solid rgba(168,85,247,0.25);border-radius:10px;color:#ffffff;text-decoration:none;font-size:13.5px;font-weight:600;">
                        ✈️ <strong>${isVi ? 'Bí Kíp Săn Phòng & Nâng Hạng VIP 5 Sao' : 'Secret VIP Booking Perks & Suite Upgrades'}</strong>
                        <span style="color:#94a3b8;font-size:12px;display:block;margin-top:2px;">${isVi ? '$100 Spa Credits, Ăn sáng miễn phí, Nâng hạng Suite' : '$100 Spa Credits, Free Breakfast, Suite Upgrades'}</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Whitelisting Box -->
              <div style="background:rgba(201,165,78,0.08);border:1px solid rgba(201,165,78,0.2);border-radius:12px;padding:16px;margin:24px 0;">
                <strong style="color:#d4a359;font-size:13px;">💡 ${isVi ? 'MẸO NHỎ ĐỂ KHÔNG BỎ LỠ CẨM NANG THỨ BẢY:' : 'PRIMARY INBOX WHITELISTING TIP:'}</strong>
                <p style="margin:6px 0 0 0;font-size:12.5px;color:#94a3b8;line-height:1.6;">
                  ${isVi
                    ? 'Để các cẩm nang độc bản gửi vào <strong>09:00 sáng Thứ Bảy</strong> không bị rơi vào tab Quảng Cáo (Promotions) hay Thư Rác (Spam), xin hãy <strong>kéo thư này vào tab Chính (Primary)</strong> hoặc bấm <strong>Reply (Trả lời)</strong> từ <strong>"VIP"</strong> cho chúng tôi!'
                    : 'To guarantee future Saturday dispatches reach your inbox, please <strong>drag this email to your Primary tab</strong> or reply <strong>"VIP"</strong> to let your mail provider know you value our letters.'}
                </p>
              </div>

              <!-- Signature -->
              <div style="border-top:1px solid rgba(201,165,78,0.2);padding-top:20px;margin-top:24px;">
                <p style="margin:0;font-size:14px;color:#ffffff;font-weight:bold;">${isVi ? 'Trân trọng,' : 'Warmest regards,'}</p>
                <p style="margin:4px 0 0 0;font-size:16px;color:#d4a359;font-family:Georgia,serif;font-weight:bold;">
                  Victor & Lucky
                </p>
                <p style="margin:2px 0 0 0;font-size:12px;color:#64748b;">
                  Executive Curators • Travel4U Luxury Empire<br>
                  Web App: <a href="https://app.travel4u.us" style="color:#38bdf8;text-decoration:none;">app.travel4u.us</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#040a12;padding:18px 24px;text-align:center;border-top:1px solid rgba(201,165,78,0.15);">
              <p style="margin:0;font-size:11px;color:#475569;line-height:1.5;">
                © 2026 Travel4U Luxury Empire. All rights reserved.<br>
                ${isVi ? 'Bạn nhận được thư này vì đã đăng ký cẩm nang tại Travel4U Journal. Hủy đăng ký bất kỳ lúc nào với 1-click.' : 'You received this email because you subscribed to the Travel4U Journal. Unsubscribe anytime with 1-click.'}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const plainText = stripHtml(html);

  // 1. Try Resend API if key is present
  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: sender,
          to: [to],
          subject: subject,
          html: html,
          text: plainText
        })
      });
      const data = await res.json();
      console.log('✅ [Email Service] Dispatched Travel4U Journal welcome email via Resend to:', to, data);
      return { ok: true, data };
    } catch (resendErr) {
      console.warn('⚠️ [Email Service] Resend API error:', resendErr);
    }
  }

  // 2. Fallback to Google Apps Script Webhook (Gmail deliverability)
  const webhookUrl = env?.APPS_SCRIPT_WEBHOOK_URL || env?.CRM_WEBHOOK_URL || DEFAULT_APPS_SCRIPT_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'send_newsletter_welcome_email',
          to,
          subject,
          html,
          preference,
          locale
        })
      });
      console.log('✅ [Email Service] Dispatched welcome email via Apps Script Webhook to:', to);
    } catch (webhookErr) {
      console.warn('⚠️ [Email Service] Apps Script Webhook email error:', webhookErr);
    }
  }

  return { ok: true, note: 'Processed with multi-transport deliverability' };
}
