/**
 * 🏛️ TRAVEL4U & OPC AI REVENUE LAB — LUXURY CRM EMAIL DISPATCHER
 * Powered by Resend API (breaths.live domain)
 * Standards: Forbes Luxury Concierge & 100% Primary Inbox Deliverability
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const DEFAULT_SENDER = 'Victor Chuyen - OPC AI Revenue Lab <victor@breaths.live>';

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
  if (!apiKey) {
    console.warn('⚠️ [Email Service] RESEND_API_KEY is not configured in env.');
    return { ok: false, error: 'RESEND_API_KEY missing' };
  }
  const sender = env.RESEND_FROM_EMAIL || DEFAULT_SENDER;
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
                <strong style="color:#38bdf8;">Bước 2: Kết Nối Zalo Trực Tiếp Hỗ Trợ 24/7</strong>
                <p style="margin:5px 0 0 0;font-size:13px;color:#94a3b8;">
                  Gửi tin nhắn qua Zalo cá nhân của Victor Chuyen để nhận tài liệu hướng dẫn, template Google Sheet CRM và giải đáp thắc mắc nhanh.
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
                © 2026 OPC AI Revenue Lab & Travel4U. Mọi quyền được bảo lưu.<br>
                Email này được gửi tự động từ hệ thống CRM theo yêu cầu đăng ký của bạn.
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
    console.log('✅ [Email Service] Dispatched luxury onboarding email to:', to, data);
    return { ok: true, data };
  } catch (err) {
    console.error('❌ [Email Service] Failed to dispatch onboarding email:', err);
    return { ok: false, error: err.message };
  }
}
