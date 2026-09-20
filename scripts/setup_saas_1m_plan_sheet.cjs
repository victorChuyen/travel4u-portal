/**
 * 🏆 TRAVEL4U.US & OPC AI REVENUE LAB — KẾ HOẠCH SAAS TRIỆU ĐÔ ($1,000,000 / 24 THÁNG)
 * Script khởi tạo và định dạng tab 'PLAN_SAAS_1M_DOLLAR' trên Google Sheet Master:
 * 15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU
 */

const { getAccessToken } = require('../../credentials/travel4you/lib/auth');
const { ensureTab, writeRange, readRange } = require('../../credentials/travel4you/lib/sheets');

const MASTER_SHEET_ID = '15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU';
const TAB_NAME = 'PLAN_SAAS_1M_DOLLAR';

async function buildPlanData() {
  const rows = [];

  // ROW 1-3: Banner Title
  rows.push(['🏆 TRAVEL4U.US & OPC AI REVENUE LAB — KẾ HOẠCH SAAS TRIỆU ĐÔ ($1,000,000 / 24 THÁNG)']);
  rows.push(['Executive Leadership: Chairman Victor & AI CEO Lucky | Tôn Chỉ: Bắt Đầu Từ Mục Tiêu Tài Chính $1M ➔ 3 Bước Tony Robbins ➔ 3 Gói Giá $19 - $139 - $388']);
  rows.push([`Cập nhật tự động lúc: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | Master Sheet: https://docs.google.com/spreadsheets/d/${MASTER_SHEET_ID}`]);
  rows.push(['']);

  // ROW 5: Section 1
  rows.push(['=== PHẦN 1: TỔNG QUAN MỤC TIÊU TÀI CHÍNH BẮC ĐẨU (FINANCIAL NORTH STAR) ===']);
  rows.push(['STT', 'Chỉ Số Chiến Lược', 'Chi Tiết Mục Tiêu & Cơ Chế Thực Hiện', 'Chỉ Tiêu Định Lượng', 'Giá Trị Quy Đổi (USD)', 'Giá Trị Quy Đổi (VNĐ)', 'Tỷ Trọng Doanh Thu', 'Mức Độ Khả Thi', 'Phụ Trách', 'Ghi Chú Vận Hành']);
  rows.push(['1.1', 'Tổng Doanh Thu 24 Tháng', 'Cán mốc $1,000,000 từ 3 nguồn: Gói AI Solutions + SaaS Retainer + Travel Affiliate', '$1,000,000 USD', '$1,000,000', '25.500.000.000 đ', '100.0%', 'Rất Cao (Đã có sản phẩm + khách cọc)', 'Chairman Victor & Lucky', 'Mục tiêu tài chính cốt lõi 2 năm']);
  rows.push(['1.2', 'Doanh Thu Trung Bình / Tháng', 'Mức doanh thu bình quân cần đạt mỗi tháng trong vòng 24 tháng', '$41,667 USD/tháng', '$41,667', '1.062.500.000 đ', '-', 'Theo mô hình lũy tiến 4 giai đoạn', 'Lucky & CRO Alex', 'Tăng dần từ $3.9k lên $80k/tháng']);
  rows.push(['1.3', 'Biên Lợi Nhuận Gộp Mục Tiêu', 'Tối ưu nhờ cỗ máy AI Squad tự động 95% khâu lập trình, viết bài, thiết kế và cào dữ liệu', '82.0%', '$820,000', '20.910.000.000 đ', '-', 'Cực Cao nhờ chi phí vận hành AI siêu thấp', 'Chairman Victor', 'Không tốn chi phí nhân sự cồng kềnh']);
  rows.push(['1.4', 'Nguyên Tắc Bán Hàng Sống Còn', 'Đã có sẵn sản phẩm/dịch vụ rõ ràng để bán, nhận tiền cọc trước 50%, tự động hoá thanh toán', '100% Thu Tiền Ngay', 'Cọc 50% - Full 100%', 'VietQR BIDV 96247688688', '-', 'Đã kích hoạt live', 'AI Squad', 'Không làm việc khi chưa có cọc']);
  rows.push(['1.5', 'Định Vị Thị Trường Độc Bản', 'Trở thành "Cá Lớn Trong Ao Nhỏ" — Đơn vị số 1 đóng gói giải pháp AI Revenue trọn gói cho SME & Lữ hành', 'Top 1 Ngách', 'Độc Quyền Tại VN', 'Thương Hiệu Đẳng Cấp', '-', 'Tiên phong thị trường', 'Victor & Lucky', 'Vượt trội mọi agency truyền thống']);
  rows.push(['']);

  // ROW 12: Section 2
  rows.push(['=== PHẦN 2: MA TRẬN 3 GÓI GIÁ THỰC CHIẾN & UNIT ECONOMICS (CƠ CẤU DOANH THU) ===']);
  rows.push(['Mã Gói', 'Tên Gói Dịch Vụ', 'Đặc Tính & Phạm Vi Triển Khai', 'Số Lượng Mục Tiêu (24T)', 'Đơn Giá (USD)', 'Đơn Giá (VNĐ)', 'Doanh Thu Dự Kiến ($)', 'Doanh Thu Dự Kiến (VNĐ)', 'Tỷ Suất Lợi Nhuận', 'Vai Trò Chiến Lược']);
  rows.push(['GÓI 01', 'OPC AI STARTER KIT (DIY)', 'Digital Product: eBook 25 AI Automations, prompt pack, template CRM Google Sheets, video hướng dẫn', '4.000 Khách', '$19', '500.000 đ', '$76,000', '1.938.000.000 đ', '95%', 'Phễu hút khách diện rộng (Front-End Lead Magnet có phí)']);
  rows.push(['GÓI 02', 'OPC AI BUILDER SPRINT (DWY)', 'Done With You: Bao gồm Gói 1 + Audit bottleneck + 02 phiên coaching 1:1 (60p) + Cùng xây 01 AI workflow', '1.500 Khách', '$139', '3.600.000 đ (Cọc 1.8tr)', '$208,500', '5.316.750.000 đ', '85%', 'Core Offer giá trị cao, giải quyết đúng nỗi đau doanh nghiệp']);
  rows.push(['GÓI 03', 'OPC AI REVENUE SYSTEM (DFY)', 'Done For You: Triển khai trọn gói full-stack (Web ➔ VietQR ➔ CRM ➔ Telegram ➔ Automation) + 14 ngày bảo hành', '1.000 Khách', '$388', '10.000.000 đ (Cọc 5tr)', '$388,000', '9.894.000.000 đ', '80%', 'Flagship Offer — Cỗ máy tạo dòng tiền lớn nhất cho hệ sinh thái']);
  rows.push(['UPSELL', 'SaaS Retainer & Cloud Maintenance', 'Phí duy trì hosting, update prompt model mới, bảo trì database & sao lưu tự động ($99/tháng)', '300 Khách duy trì (12T)', '$99 / tháng', '2.500.000 đ / tháng', '$356,400', '9.088.200.000 đ', '90%', 'Dòng tiền định kỳ MRR/ARR cực kỳ bền vững']);
  rows.push(['PASSIVE', 'Travel Affiliate Stays & VIP Tours', 'Hoa hồng phòng lưu trú Expedia + Tour GetYourGuide 8% (4G5BPIE) + Discover Cars 70% + Airalo 12%', '1.500 Bookings', '$35 / avg booking', '900.000 đ / booking', '$52,500', '1.338.750.000 đ', '98%', 'Thu nhập thụ động từ 40 khách sạn & 12 ngôn ngữ Travel4U.us']);
  rows.push(['TỔNG', 'TỔNG DOANH THU TOÀN HỆ SINH THÁI (24 THÁNG)', 'Vượt chỉ tiêu $1,000,000 ban đầu đặt ra (Đạt 108.1% kế hoạch)', '6.800+ Giao Dịch', '-', '-', '$1,081,400', '27.575.700.000 đ', '84.5%', '🏆 CHẠM ĐÍCH VÀ VƯỢT MỤC TIÊU 1 TRIỆU ĐÔ LA!']);
  rows.push(['']);

  // ROW 20: Section 3
  rows.push(['=== PHẦN 3: LỘ TRÌNH DOANH THU 24 THÁNG CHI TIẾT (24-MONTH DETAILED FINANCIAL ROADMAP) ===']);
  rows.push(['Tháng', 'Giai Đoạn Chiến Lược', 'DIY ($19)', 'DWY ($139)', 'DFY ($388)', 'SaaS ($99)', 'Doanh Thu Tháng ($)', 'Doanh Thu Tháng (VNĐ)', 'Lũy Kế ($)', '% Đạt Mục Tiêu $1M', 'Mục Tiêu & Hành Động Trọng Tâm']);

  const roadmap = [
    { m: 'Tháng 01', phase: 'GĐ 1: Foundation & Validate', diy: 30, dwy: 10, dfy: 5, saas: 0, note: 'Ra mắt Funnel /pricing, chốt 5 khách DFY đầu tiên có sẵn cọc' },
    { m: 'Tháng 02', phase: 'GĐ 1: Foundation & Validate', diy: 50, dwy: 18, dfy: 8, saas: 5, note: 'Tối ưu VietQR SePay, chuyển đổi 5 khách DFY sang gói bảo trì $99' },
    { m: 'Tháng 03', phase: 'GĐ 1: Foundation & Validate', diy: 80, dwy: 25, dfy: 12, saas: 12, note: 'Đạt $20k lũy kế, hoàn thiện kịch bản Onboarding Zalo tự động' },
    { m: 'Tháng 04', phase: 'GĐ 2: Traction & Funnel Scaling', diy: 110, dwy: 35, dfy: 18, saas: 22, note: 'Kích hoạt chiến dịch marketing B2B cho đại lý lữ hành & SME' },
    { m: 'Tháng 05', phase: 'GĐ 2: Traction & Funnel Scaling', diy: 140, dwy: 45, dfy: 25, saas: 35, note: 'Đẩy mạnh chốt cọc 50% qua Zalo hotline 0989890022' },
    { m: 'Tháng 06', phase: 'GĐ 2: Traction & Funnel Scaling', diy: 170, dwy: 55, dfy: 32, saas: 50, note: 'Dòng tiền đạt $28k/tháng, nâng cấp AI Squad tự động bàn giao' },
    { m: 'Tháng 07', phase: 'GĐ 2: Traction & Funnel Scaling', diy: 200, dwy: 65, dfy: 40, saas: 68, note: 'Vượt $120k lũy kế, mở rộng tệp khách hàng sang mảng Bất Động Sản & Spa' },
    { m: 'Tháng 08', phase: 'GĐ 2: Traction & Funnel Scaling', diy: 230, dwy: 75, dfy: 48, saas: 88, note: 'Doanh thu tháng vượt $40k (1 Tỷ VNĐ/tháng), tuyển thêm trợ lý AI' },
    { m: 'Tháng 09', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 250, dwy: 85, dfy: 55, saas: 110, note: 'Doanh thu định kỳ SaaS Retainer vượt mốc $10k/tháng' },
    { m: 'Tháng 10', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 270, dwy: 90, dfy: 60, saas: 130, note: 'Vượt $250k lũy kế (1/4 chặng đường triệu đô)' },
    { m: 'Tháng 11', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 280, dwy: 95, dfy: 65, saas: 150, note: 'Mùa du lịch cao điểm, hoa hồng phòng Travel4U.us tăng vọt' },
    { m: 'Tháng 12', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 300, dwy: 100, dfy: 70, saas: 170, note: 'Kết thúc Năm 1: Doanh thu lũy kế đạt gần $400,000 USD' },
    { m: 'Tháng 13', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 220, dwy: 80, dfy: 55, saas: 190, note: 'Đầu năm 2: Nâng cấp nền tảng Micro-SaaS tự phục vụ' },
    { m: 'Tháng 14', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 240, dwy: 85, dfy: 60, saas: 210, note: 'SaaS Retainer đạt 210 khách hàng thường niên' },
    { m: 'Tháng 15', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 250, dwy: 90, dfy: 65, saas: 230, note: 'Vượt mốc $550k lũy kế (Vượt nửa chặng đường $1M)' },
    { m: 'Tháng 16', phase: 'GĐ 3: Expansion & Recurring MRR', diy: 260, dwy: 95, dfy: 70, saas: 250, note: 'Hệ thống vận hành 98% tự động, Chairman tập trung quan hệ đối tác VIP' },
    { m: 'Tháng 17', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 270, dwy: 100, dfy: 72, saas: 265, note: 'Chiếm lĩnh vị thế số 1 tại thị trường Việt Nam & Đông Nam Á' },
    { m: 'Tháng 18', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 280, dwy: 105, dfy: 75, saas: 280, note: 'Lũy kế vượt mốc $750,000 USD' },
    { m: 'Tháng 19', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 290, dwy: 110, dfy: 78, saas: 290, note: 'Đạt $70k doanh thu/tháng ổn định' },
    { m: 'Tháng 20', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 300, dwy: 115, dfy: 80, saas: 300, note: 'Mốc $870k lũy kế — Tiến sát nút mục tiêu 1 triệu đô' },
    { m: 'Tháng 21', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 310, dwy: 120, dfy: 82, saas: 310, note: 'Tăng tốc chặng về đích' },
    { m: 'Tháng 22', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 320, dwy: 125, dfy: 85, saas: 320, note: '🎉 CHÍNH THỨC CÁN MỐC $1,000,000 LŨY KẾ TẠI THÁNG 22!' },
    { m: 'Tháng 23', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 330, dwy: 130, dfy: 88, saas: 330, note: 'Mở rộng vượt mục tiêu, chuẩn bị kế hoạch IPO / Định giá doanh nghiệp' },
    { m: 'Tháng 24', phase: 'GĐ 4: Market Dominance & $1M Goal', diy: 350, dwy: 135, dfy: 90, saas: 340, note: '🏆 HOÀN THÀNH XUẤT SẮC 24 THÁNG VỚI DOANH THU HƠN $1.08 TRIỆU ĐÔ!' }
  ];

  let cumulativeRevenue = 0;
  for (const item of roadmap) {
    const monthlyRev = (item.diy * 19) + (item.dwy * 139) + (item.dfy * 388) + (item.saas * 99);
    cumulativeRevenue += monthlyRev;
    const vndMonthly = Math.round(monthlyRev * 25500);
    const pct = ((cumulativeRevenue / 1000000) * 100).toFixed(1) + '%';

    rows.push([
      item.m,
      item.phase,
      item.diy,
      item.dwy,
      item.dfy,
      item.saas,
      `$${monthlyRev.toLocaleString()}`,
      `${vndMonthly.toLocaleString()} đ`,
      `$${cumulativeRevenue.toLocaleString()}`,
      pct,
      item.note
    ]);
  }
  rows.push(['']);

  // ROW 46: Section 4
  rows.push(['=== PHẦN 4: 3 BƯỚC CHIẾN LƯỢC GURU TONY ROBBINS ĐƯA HỆ SINH THÁI THÀNH "CÁ LỚN TRONG AO NHỎ" ===']);
  rows.push(['Bước', 'Chiến Lược Tony Robbins', 'Phân Tích Đối Thủ Hàng Đầu (Modeling)', 'Khoảng Trống & Nỗi Đau Thị Trường', 'Giải Pháp Độc Bản Của Travel4U & Victor', 'Lợi Thế Cạnh Tranh Tuyệt Đối (USP)', 'Kết Quả Đầu Ra']);
  rows.push([
    'BƯỚC 1',
    'Tìm Top Ngách Thành Công (Modeling Leaders)',
    'Expedia, Booking.com, Jasper AI, Copy.ai, Make/n8n Automation Agencies',
    'Các đối thủ toàn cầu có công nghệ mạnh nhưng xa rời thị trường VN, phí đắt đỏ ($1k-$5k), không có dịch vụ Done-For-You sát sườn.',
    'Mô hình hóa toàn bộ giao diện Dark Luxury, phễu 3 tầng giá, công nghệ Dynamic VietQR và cỗ máy AI Squad sản xuất nội dung.',
    'Chất lượng chuẩn quốc tế nhưng giá đóng gói phù hợp và tối ưu riêng cho SME, Freelancer Việt Nam.',
    'Xác định ngách "AI Revenue Systems" tỷ lệ thắng 100%'
  ]);
  rows.push([
    'BƯỚC 2',
    'Follow-up Học Cách Họ Làm (Reverse Engineering)',
    'Học quy trình: Landing page chuyển đổi cao, dynamic checkout, CRM automated tracking, drip-feed marketing.',
    'Nhiều doanh nghiệp biết công cụ nhưng không biết ráp nối các module lại thành một cỗ máy tự vận hành sinh ra tiền.',
    'Tự động hóa hoàn toàn từ Checkout ➔ VietQR SePay ➔ 16 cột Google Sheets CRM ➔ Telegram Bot ➔ Onboarding.',
    'Khách chỉ cần quét mã QR là toàn bộ quy trình kích hoạt trong 2 giây. Không cần tư vấn thủ công rườm rà.',
    'Hệ thống Funnel All-in-One CRM tự động hoàn thiện'
  ]);
  rows.push([
    'BƯỚC 3',
    'Sáng Tạo Thêm Giá Trị USP (Cá Lớn Trong Ao NhỎ)',
    'Không cạnh tranh trực diện với gã khổng lồ, mà thống lĩnh ao nhỏ: SME, Freelancer, Chủ khách sạn/lữ hành muốn tăng doanh thu bằng AI.',
    'Khách hàng sợ rủi ro, sợ trả tiền mà không dùng được, thiếu hỗ trợ kỹ thuật sau bàn giao.',
    'Chính sách cam kết vàng: Hỗ trợ đặt cọc 50%, có sẵn sản phẩm/dịch vụ rõ ràng, bàn giao trong 72h, bảo hành 14 ngày, hotline Zalo 0989890022.',
    'Duy nhất Chairman Victor & Lucky cung cấp gói DFY trọn gói từ A đến Z với chi phí chỉ $388 (10 triệu VNĐ).',
    'Trở thành biểu tượng "Cá Lớn Trong Ao Nhỏ" số 1 thị trường'
  ]);
  rows.push(['']);

  // ROW 52: Section 5
  rows.push(['=== PHẦN 5: KIẾN TRÚC HẠ TẦNG KỸ THUẬT SAAS ALL-IN-ONE (TECHNICAL STACK) ===']);
  rows.push(['Tầng Kiến Trúc', 'Module Hệ Thống', 'Công Nghệ Sử Dụng', 'Thông Số Kỹ Thuật', 'Đặc Điểm Vận Hành', 'Trạng Thái Live', 'Đường Dẫn Truy Cập / Repo']);
  rows.push(['1. Frontend Funnel', 'Trang Bảng Giá 3 Gói', 'Astro SSG + Tailwind CSS', 'Load < 1s, 60fps mobile', 'Dark Luxury, 5 badges, CTA Zalo 0989890022', '✅ LIVE', 'https://travel4u.us/pricing']);
  rows.push(['1. Frontend Funnel', 'Trang Thanh Toán & Nhận Cọc', 'Astro + VietQR Dynamic Engine', 'Sinh mã QR động theo amount & ref', 'Toggle 100% vs Cọc 50%, Polling status realtime', '✅ LIVE', 'https://travel4u.us/checkout/[tier]']);
  rows.push(['1. Frontend Funnel', 'Trang Cảm Ơn & Onboarding', 'Astro SSG', 'Phân luồng 3 gói riêng biệt', 'Xác nhận mã đơn, 1 chạm mở Zalo chat với Victor', '✅ LIVE', 'https://travel4u.us/thank-you']);
  rows.push(['2. Payment Gateway', 'Cổng Thanh Toán SePay VietQR', 'SePay Webhook API', 'Xử lý biến động số dư trong 2s', 'Tài khoản nhận: BIDV - 96247688688 - VICTOR CHUYEN', '✅ LIVE', 'functions/api/webhooks/sepay.js']);
  rows.push(['3. CRM Center', 'Hệ Thống Quản Trị CRM 16 Cột', 'Google Sheets API v4', 'Tab OPC_CRM_CUSTOMERS', 'Ghi nhận khách, số tiền cọc, số nợ, trạng thái', '✅ LIVE', `Master Sheet ${MASTER_SHEET_ID}`]);
  rows.push(['4. Realtime Alert', 'Hệ Thống Báo Động Telegram', 'Telegram Bot API (Bot 8257466148)', 'Kênh Victor Chuyen (-1001828947537)', 'Bắn TING TING tức thì khi có biến động số dư / cọc', '✅ LIVE', 'credentials/travel4you/lib/telegram_alert.js']);
  rows.push(['5. AI Brain Engine', 'Cổng AI Đa Mô Hình 9Router', '9Router Local Proxy (:20128)', 'Combo fcs-astra / cx/gpt-6-astra', 'Tự động fallback, sinh code, phân tích kinh doanh', '✅ LIVE', 'http://127.0.0.1:20128/v1']);
  rows.push(['6. Publishing Engine', 'Cỗ Máy Xuất Bản Tự Động', 'Playwright + Real Chrome Session', 'Vượt Cloudflare WAF, Nonce auth', 'Drip-feed 2 bài/ngày, đồng bộ 10 site vệ tinh', '✅ LIVE', 'credentials/travel4you/engine/']);
  rows.push(['']);

  // ROW 62: Section 6
  rows.push(['=== PHẦN 6: PHÂN CÔNG BAN ĐIỀU HÀNH AI SQUAD DƯỚI QUYỀN CHAIRMAN VICTOR & AI CEO LUCKY ===']);
  rows.push(['Vai Trò', 'Nhân Sự Phụ Trách', 'Trách Nhiệm Cốt Lõi', 'KPI Mục Tiêu $1M', 'Công Cụ Vận Hành', 'Báo Cáo Tiến Độ']);
  rows.push(['CHAIRMAN', 'Chairman Victor Chuyen', 'Lãnh đạo tối cao, phê duyệt chính sách giá, bảo chứng thương hiệu, chốt hợp đồng lớn', 'Chỉ đạo đạt $1,000,000 trong 24 tháng', 'Zalo Hotline 0989890022 & Telegram Channel', 'Toàn quyền quyết định']);
  rows.push(['AI CEO', 'AI CEO Lucky (Supreme Orchestrator)', 'Chỉ huy 6 Giám đốc AI, điều phối vận hành, bảo đảm chất lượng Grade A, phân bổ tài nguyên', 'Đảm bảo tiến độ lũy kế từng tháng bám sát Roadmap', '9Router AI Gateway + Master Scripts', 'Báo cáo 11:00 & 16:00 hàng ngày qua Telegram']);
  rows.push(['CCO', 'CCO Leo (Chief Content Officer)', 'Điều phối biên soạn nội dung, prompts, tài liệu số cho Gói 01 và kịch bản coaching Gói 02', '100% tài liệu bàn giao đạt chuẩn Condé Nast/Forbes', 'fcs-astra / cx/gpt-6-astra AI Engines', 'Bàn giao tài liệu theo từng đơn hàng']);
  rows.push(['DIRECTOR', 'Director Maya (Global Localization)', 'Bản địa hóa 12 ngôn ngữ cho cổng Travel4U.us, tối ưu thông điệp bán hàng cho thị trường quốc tế', 'Mở rộng doanh thu ngoại tệ từ thị trường nước ngoài', 'multilingual_engine_11_locales.js', 'Báo cáo hiệu suất chuyển đổi đa ngôn ngữ']);
  rows.push(['CRO', 'CRO Alex (Chief Revenue Officer)', 'Quản lý doanh thu, tỷ lệ chuyển đổi Funnel, đối soát SePay VietQR, đối tác GetYourGuide & Expedia', 'Tối ưu conversion rate trang /pricing đạt > 3.5%', 'SePay Webhook + Travelpayouts Marker 770720', 'Báo cáo doanh thu realtime qua Telegram']);
  rows.push(['HEAD OF SEO', 'Head of SEO Kenji (SEO Architect)', 'Kiểm soát thứ hạng từ khóa thực thể, giữ điểm Rank Math 80-95 Green, kéo organic traffic về phễu', 'Top 1-3 từ khóa giải pháp AI và du lịch xa xỉ', 'Rank Math API + Search Console + Schema FAQ', 'Báo cáo thứ hạng từ khóa định kỳ tuần']);
  rows.push(['CREATIVE DIR', 'Sophia (Visual & Media QA)', 'Quản trị kho ảnh 4K EXIF/GPS, thiết kế banners sang trọng, bảo chứng thẩm mỹ Dark Luxury', '100% hình ảnh độc bản, không dính bản quyền', 'Sharp 4K Engine + EXIF/IPTC Invalidator', 'Kiểm duyệt hình ảnh trước khi live']);
  rows.push(['DEVOPS LEAD', 'Max (Autonomous Publisher)', 'Bảo trì hạ tầng Astro, Cloudflare Pages, SePay Webhook, Google Sheets API và Playwright Automation', 'Uptime 99.99%, thời gian build static < 35 giây', 'Node.js, Playwright, Cloudflare Edge API', 'Báo động kỹ thuật tức thì khi phát hiện lỗi']);
  rows.push(['']);

  // ROW 72: Section 7
  rows.push(['=== PHẦN 7: BẢNG THEO DÕI TIẾN ĐỘ THỰC TẾ & KPI DASHBOARD HÀNG TUẦN ===']);
  rows.push(['Chỉ Số KPI', 'Mục Tiêu Tháng Này', 'Thực Tế Đã Đạt', 'Tỷ Lệ Đạt (%)', 'Số Tiền Thực Nhận (VNĐ)', 'Số Đơn Đặt Cọc 50%', 'Số Đơn Thanh Toán 100%', 'Đánh Giá Tiến Độ', 'Ghi Chú & Hành Động Khắc Phục']);
  rows.push(['Doanh Thu Tháng 01', '$3,900 USD', '$0 (Sẵn sàng live)', '0.0%', '0 đ', '0', '0', 'Hệ thống Funnel & CRM đã sẵn sàng 100%', 'Gửi link /pricing cho khách hàng đang chờ']);
  rows.push(['Khách Hàng Gói 01 (DIY)', '30 Khách', '0 Khách', '0.0%', '0 đ', '-', '0', 'Sẵn sàng kích hoạt', 'Đẩy mạnh qua kênh truyền thông & Zalo']);
  rows.push(['Khách Hàng Gói 02 (DWY)', '10 Khách', '0 Khách', '0.0%', '0 đ', '0', '0', 'Sẵn sàng nhận cọc 1.8tr', 'Tư vấn trực tiếp 1:1 qua Zalo 0989890022']);
  rows.push(['Khách Hàng Gói 03 (DFY)', '5 Khách', '0 Khách', '0.0%', '0 đ', '0', '0', 'Sẵn sàng nhận cọc 5tr', 'Khách hàng có sẵn, chốt cọc kích hoạt dự án']);
  rows.push(['Số Dư Quỹ Dự Án (Cash)', '99.450.000 đ', '0 đ', '0.0%', '0 đ', '-', '-', 'Theo dõi realtime qua SePay', 'BIDV 96247688688']);

  return rows;
}

async function main() {
  console.log(`🚀 [SaaS Plan Setup] Initializing '${TAB_NAME}' on Master Google Sheet: ${MASTER_SHEET_ID}...`);

  // 1. Ensure Tab exists
  const created = await ensureTab(TAB_NAME, MASTER_SHEET_ID);
  console.log(`ℹ️ [SaaS Plan Setup] Tab '${TAB_NAME}' status: ${created ? 'Created New' : 'Already Existed'}`);

  // 2. Generate Data
  const rows = await buildPlanData();
  console.log(`📊 [SaaS Plan Setup] Generated ${rows.length} rows of comprehensive strategic data.`);

  // 3. Write Data to Sheet
  const range = `'${TAB_NAME}'!A1:K${rows.length}`;
  console.log(`✍️ [SaaS Plan Setup] Writing data to range: ${range}...`);
  const writeRes = await writeRange(range, rows, MASTER_SHEET_ID);
  console.log(`✅ [SaaS Plan Setup] Write complete! Updated ${writeRes.updatedRows || rows.length} rows.`);

  // 4. Also ensure OPC_CRM_CUSTOMERS has standard headers on MASTER_SHEET_ID
  console.log(`📋 [SaaS Plan Setup] Verifying 'OPC_CRM_CUSTOMERS' on Master Sheet...`);
  await ensureTab('OPC_CRM_CUSTOMERS', MASTER_SHEET_ID);
  const existingCrm = await readRange(`'OPC_CRM_CUSTOMERS'!A1:P1`, MASTER_SHEET_ID);
  if (!existingCrm || existingCrm.length === 0 || existingCrm[0].length === 0) {
    const CRM_HEADERS = [
      'Mã Đơn Hàng', 'Thời Gian Ghi Nhận', 'Họ Và Tên Khách', 'Số Điện Thoại / Zalo',
      'Email Khách Hàng', 'Tên Doanh Nghiệp / Ngách', 'Gói Dịch Vụ', 'Hình Thức Thanh Toán',
      'Số Tiền Đã Thanh Toán', 'Số Tiền Còn Lại Phải Thu', 'Mã Giao Dịch SePay',
      'Trạng Thái Vận Hành', 'Link Folder Bàn Giao', 'Lịch Hẹn Coaching / Bàn Giao',
      'Người Phụ Trách', 'Ghi Chú Tiến Độ'
    ];
    await writeRange(`'OPC_CRM_CUSTOMERS'!A1:P1`, [CRM_HEADERS], MASTER_SHEET_ID);
    console.log(`✅ [SaaS Plan Setup] Initialized 16 standard headers in 'OPC_CRM_CUSTOMERS' on Master Sheet.`);
  }

  console.log(`\n🎉 [SaaS Plan Setup] COMPLETED 100%!`);
  console.log(`🔗 Link trực tiếp tới Master Sheet của Chairman Victor:`);
  console.log(`👉 https://docs.google.com/spreadsheets/d/${MASTER_SHEET_ID}/edit#gid=0`);
}

main().catch(err => {
  console.error(`❌ [SaaS Plan Setup] Error:`, err);
  process.exit(1);
});
