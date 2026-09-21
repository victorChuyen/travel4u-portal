const botToken = '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8';
const chatId = '-1001828947537';

const message = `
👑 <b>[BÁO CÁO HOÀN TẤT] HỆ THỐNG EMAIL NURTURE & PHÂN KHÚC ĐỘC GIẢ CONDÉ NAST</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 <b>Thực hiện:</b> AI CEO Lucky & Chairman Victor
🌐 <b>Nền tảng:</b> travel4u.us / app.travel4u.us (Cloudflare Pages)
📅 <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ <b>CÁC HẠNG MỤC ĐÃ GIẢI QUYẾT TRIỆT ĐỂ:</b>
1. <b>Khắc Phục Lỗi Nội Dung Email (Root-Cause):</b>
   - Đã tách biệt hoàn toàn luồng đăng ký du lịch với luồng mua phần mềm SaaS AI.
   - Gửi ngay Cẩm nang 100 Khách Sạn Vàng 2026 + Mẹo Whitelisting vào tab Chính.

2. <b>Phân Khúc Sở Thích Tương Tác Cầu Thị (5 Chips):</b>
   - 🏝️ Đảo Riêng & Biệt Thự Nổi (Maldives, Bora Bora)
   - 🏰 Cung Điện & Lâu Đài Cổ (Paris, Como, Venice)
   - ♨️ Ryokan & Suối Khoáng Onsen (Kyoto, Hakone)
   - 🦁 Safari Thảo Nguyên Hoang Dã (Serengeti, Kruger)
   - ✈️ Bí Kíp Nâng Hạng Suite 5 Sao Miễn Phí

3. <b>Chuẩn Hóa Tab Master Sheet 15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU:</b>
   - Đã tạo tab <code>NEWSLETTER_SUBSCRIBERS</code> (gid: 550189512) với 10 cột chuẩn, header Obsidian Navy & Gold.

4. <b>Cỗ Máy Drip Thứ Bảy 09:00 AM (dispatch_weekly_newsletter.cjs):</b>
   - Chạy tự động hàng tuần, gửi 1 cẩm nang chuyên sâu / điểm đến HOT theo đúng gu từng độc giả kèm câu hỏi cầu thị 1-click.

5. <b>Bảo Mật & Biên Dịch Toàn Diện:</b>
   - Bẫy bot ẩn (Honeypot) chống spam.
   - Biên dịch 1.223 trang tĩnh SSG hoàn hảo (Exit Code 0).
   - Git commit <code>6676334</code> đã đẩy lên nhánh main và live trên Cloudflare Pages.
━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 <a href="https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit#gid=550189512">Xem Tab NEWSLETTER_SUBSCRIBERS Trên Google Sheet</a>
`.trim();

async function sendReport() {
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });
  const data = await res.json();
  console.log('✅ Telegram Alert Delivered:', data.ok);
}

sendReport().catch(console.error);
