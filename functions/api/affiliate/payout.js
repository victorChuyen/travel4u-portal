/**
 * 🏛️ Cloudflare Pages Function: Affiliate Payout Request Handler
 * Route: POST /api/affiliate/payout
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const TELEGRAM_BOT_TOKEN = '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
const TELEGRAM_CHAT_ID = '-1001828947537';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const {
      affiliate_id,
      affiliate_name,
      affiliate_phone,
      bank_name,
      account_number,
      account_name,
      amount,
      notes
    } = body;

    if (!affiliate_id || !bank_name || !account_number || !account_name || !amount) {
      return new Response(JSON.stringify({ error: 'Vui lòng cung cấp đầy đủ thông tin ngân hàng và số tiền.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const botToken = env?.TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN;
    const chatId = env?.TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID;
    const cleanAccNum = account_number.replace(/[^0-9A-Za-z]/g, '');
    const cleanBank = bank_name.replace(/[^0-9A-Za-z]/g, '');
    const transferRef = `HOAHONG_${affiliate_id}`.toUpperCase().substring(0, 20);

    // Dynamic VietQR payout link for instant 1-click settlement by Chairman Victor
    const vietQrUrl = `https://img.vietqr.io/image/${cleanBank}-${cleanAccNum}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferRef)}&accountName=${encodeURIComponent(account_name)}`;

    const teleMsg = `
💸 <b>[YÊU CẦU RÚT HOA HỒNG] ĐỐI TÁC AFFILIATE YÊU CẦU THANH TOÁN</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Đối tác:</b> <b>${affiliate_name || affiliate_id}</b>
💎 <b>Mã Ref:</b> <code>${affiliate_id}</code>
📱 <b>SĐT / Zalo:</b> <code>${affiliate_phone || 'N/A'}</code>
💰 <b>Số tiền yêu cầu:</b> <b>${Number(amount).toLocaleString('vi-VN')} VNĐ</b>
🏦 <b>Ngân hàng:</b> <b>${bank_name}</b>
💳 <b>Số tài khoản:</b> <code>${cleanAccNum}</code>
👤 <b>Chủ tài khoản:</b> <b>${account_name.toUpperCase()}</b>
📝 <b>Nội dung CK:</b> <code>${transferRef}</code>
🕒 <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>DUYỆT CHI 24/7 QUA VIETQR:</b>
👉 <a href="${vietQrUrl}"><b>BẤM VÀO ĐÂY ĐỂ MỞ MÃ VIETQR QUÉT CHUYỂN KHOẢN NGAY</b></a>
📊 <a href="https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit">Đối Soát Master Sheet CRM</a>
`.trim();

    if (botToken && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: teleMsg,
            parse_mode: 'HTML',
            disable_web_page_preview: false
          })
        });
      } catch (err) {
        console.error('Failed to send Telegram payout alert:', err);
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      status: 'payout_requested',
      message: 'Yêu cầu rút tiền đã được ghi nhận thành công! Ban Quản Trị sẽ xử lý chuyển khoản trong vòng 24 giờ.'
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
