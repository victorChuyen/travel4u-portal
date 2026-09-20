/**
 * 🏛️ Cloudflare Pages Function: Create Lead & Instant VIP Notification
 * Route: POST /api/leads/create
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

import { sendLuxuryOnboardingEmail } from '../_lib/emailService.js';
import { syncLeadToGoogleSheetCRM } from '../_lib/crmSync.js';

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

    // 1. Auto-sync to Master Google Sheet CRM (Tab OPC_CRM_CUSTOMERS)
    try {
      await syncLeadToGoogleSheetCRM({
        name,
        phone,
        email,
        tier: interest,
        tier_name: interest === 'tier_02_dwy' ? 'Gói 02: DWY Builder Sprint ($139)' : (interest === 'tier_03_dfy' ? 'Gói 03: DFY Revenue System ($388)' : 'Gói 01: DIY Starter Kit ($19)'),
        payment_type: 'Đăng Ký Tư Vấn',
        ref_code,
        note,
        status: 'Mới Tiếp Nhận',
        env
      });
    } catch (crmErr) {
      console.error('CRM Sheet sync error:', crmErr);
    }

    // 2. Automated Luxury Onboarding Email via Resend
    if (email && email.includes('@')) {
      try {
        await sendLuxuryOnboardingEmail({
          to: email,
          name,
          phone,
          tier_name: interest === 'tier_02_dwy' ? 'Gói 02: DWY Builder Sprint ($139 / 3.6tr)' : (interest === 'tier_03_dfy' ? 'Gói 03: DFY Revenue System ($388 / 10tr)' : 'Gói 01: DIY Starter Kit ($19 / 500k)'),
          ref_code,
          env
        });
      } catch (emailErr) {
        console.error('Onboarding email error:', emailErr);
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
