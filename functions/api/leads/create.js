/**
 * 🏛️ Cloudflare Pages Function: Create Lead & Instant VIP Notification
 * Route: POST /api/leads/create
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

import {
  sendLuxuryOnboardingEmail,
  sendLuxuryTravelNewsletterWelcomeEmail
} from '../_lib/emailService.js';
import {
  syncLeadToGoogleSheetCRM,
  syncNewsletterSubscriberToGoogleSheet
} from '../_lib/crmSync.js';

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
      preference,
      note,
      ref_code,
      source_url,
      locale
    } = body;

    const isNewsletter = interest === 'newsletter_vip_guide' || (!phone && email);
    const customerName = name || (isNewsletter ? 'VIP Reader' : '');
    const cleanLocale = (locale || 'vi').toLowerCase();
    const isVi = cleanLocale.startsWith('vi');

    if (isNewsletter) {
      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({ error: isVi ? 'Vui lòng cung cấp địa chỉ email hợp lệ.' : 'Please provide a valid email address.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      if (!name || !phone) {
        return new Response(JSON.stringify({ error: 'Họ tên và Số điện thoại là bắt buộc.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const botToken = env?.TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN;
    const chatId = env?.TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID;
    const phoneClean = (phone || '').replace(/[^0-9]/g, '');

    // 1. Formatted Telegram Alert
    const teleMsg = isNewsletter ? `
💌 <b>[BẢN TIN VIP: ĐĂNG KÝ CẨM NANG 2026] ĐỘC GIẢ MỚI GIA NHẬP</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Độc giả:</b> <b>${customerName}</b>
📧 <b>Email:</b> <code>${email}</code>
🎯 <b>Gu du lịch lựa chọn:</b> <b>${preference || 'Tất Cả Cẩm Nang VIP 2026'}</b>
🌐 <b>Ngôn ngữ:</b> <code>${(locale || 'vi').toUpperCase()}</code>
💎 <b>Ref Code:</b> <code>${ref_code || 'direct'}</code>
📍 <b>Từ trang:</b> <code>${source_url || '/'}</code>
🕒 <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ <i>Hệ thống tự động kích hoạt Chuỗi Email Nuôi Dưỡng 5 Kỳ (Weekly Drip vào 09:00 Thứ Bảy).</i>
`.trim() : `
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

    // 2. Sync to Master Google Sheet
    if (isNewsletter) {
      // Sync to dedicated NEWSLETTER_SUBSCRIBERS tab
      try {
        await syncNewsletterSubscriberToGoogleSheet({
          email,
          name: customerName,
          preference: preference || 'Tất Cả Cẩm Nang VIP 2026',
          locale: locale || 'vi',
          ref_code: ref_code || 'direct',
          source_url: source_url || '/',
          status: 'Welcome Email Sent',
          env
        });
      } catch (crmErr) {
        console.error('Newsletter sheet sync error:', crmErr);
      }

      // Dispatch Luxury Travel Welcome Email (Email #1 in 5-Email Sequence)
      try {
        await sendLuxuryTravelNewsletterWelcomeEmail({
          to: email,
          name: customerName,
          preference: preference || 'Tất Cả Cẩm Nang VIP 2026',
          locale: locale || 'vi',
          ref_code: ref_code || 'direct',
          env
        });
      } catch (emailErr) {
        console.error('Travel newsletter welcome email error:', emailErr);
      }

      return new Response(JSON.stringify({
        ok: true,
        status: 'newsletter_subscribed',
        message: isVi
          ? 'Chúc mừng bạn! Cẩm nang 100 Khách Sạn Vàng 2026 và câu hỏi cầu thị đã được gửi đến email của bạn.'
          : 'Welcome aboard! The 2026 Sovereign Gold List Master Guide has been dispatched to your inbox.'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // Sync to paid software CRM tab (OPC_CRM_CUSTOMERS)
      try {
        await syncLeadToGoogleSheetCRM({
          name: customerName,
          phone: phone || 'Email Only',
          email,
          tier: interest || 'lead_general',
          tier_name: interest === 'tier_02_dwy' ? 'Gói 02: DWY Builder Sprint ($139)' : (interest === 'tier_03_dfy' ? 'Gói 03: DFY Revenue System ($388)' : 'Gói 01: DIY Starter Kit ($19)'),
          payment_type: 'Đăng Ký Tư Vấn',
          ref_code,
          note: note,
          status: 'Mới Tiếp Nhận',
          env
        });
      } catch (crmErr) {
        console.error('CRM Sheet sync error:', crmErr);
      }

      // Dispatch SaaS Consultation Onboarding Email
      if (email && email.includes('@')) {
        try {
          await sendLuxuryOnboardingEmail({
            to: email,
            name: customerName,
            phone: phone || '',
            tier_name: interest === 'tier_02_dwy' ? 'Gói 02: DWY Builder Sprint ($139 / 3.6tr)' : (interest === 'tier_03_dfy' ? 'Gói 03: DFY Revenue System ($388 / 10tr)' : 'Gói 01: DIY Starter Kit ($19 / 500k)'),
            ref_code,
            env
          });
        } catch (emailErr) {
          console.error('SaaS onboarding email error:', emailErr);
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
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
