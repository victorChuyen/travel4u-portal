/**
 * 🏛️ TRAVEL4U LUXURY EMPIRE & OPC AI REVENUE LAB — GOOGLE APPS SCRIPT MASTER CRM SUITE
 * Master Spreadsheet ID: 15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 * Domain Verified: breaths.live (Victor Chuyen <victor@breaths.live>)
 * 
 * ⚠️ QUY TẮC BẤT BIẾN TỪ CHAIRMAN VICTOR:
 * Hệ thống CRM và CSKH tự động này CHỈ DÀNH RIÊNG cho khách hàng mua 3 Gói Giải Pháp AI Doanh Thu:
 * - Gói 01: DIY Starter Kit ($19 / 500.000 VNĐ)
 * - Gói 02: DWY Builder Sprint ($139 / 3.600.000 VNĐ)
 * - Gói 03: DFY Revenue System ($388 / 10.000.000 VNĐ)
 * Toàn bộ khách mua Tour/Khách Sạn do các nền tảng Affiliate (GetYourGuide, Expedia, Booking) tự lo.
 * 
 * HƯỚNG DẪN TRIỂN KHAI 60 GIÂY:
 * 1. Mở Master Google Sheet: https://docs.google.com/spreadsheets/d/15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU/edit
 * 2. Chọn Tiện ích mở rộng (Extensions) → Apps Script
 * 3. Dán toàn bộ mã nguồn này vào file Code.gs (thay thế mã cũ nếu có)
 * 4. Vào Cài đặt dự án (Project Settings) -> Thuộc tính tập lệnh (Script Properties) -> Thêm:
 *    - RESEND_API_KEY = (Key Resend của breaths.live)
 * 5. Bấm "Triển khai" (Deploy) → "Triển khai mới" (New deployment)
 *    - Chọn loại: Ứng dụng web (Web App)
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 6. Bấm Triển khai và Copy Web App URL lưu vào Cloudflare Pages Environment Variable `APPS_SCRIPT_WEBHOOK_URL`
 */

// ==================== CẤU HÌNH GỐC ====================
const CONFIG = {
  SPREADSHEET_ID: '15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU',
  TAB_CRM: 'OPC_CRM_CUSTOMERS',
  TAB_OFFERS: 'Travel4U_3_Packages',
  TAB_EMAILS: '5_Day_Emails',
  RESEND_API_KEY: PropertiesService.getScriptProperties().getProperty('RESEND_API_KEY') || '',
  SENDER_EMAIL: 'Victor Chuyen - OPC AI Revenue Lab <victor@breaths.live>',
  CAL_LINK: 'https://cal.com/victorchuyen/coachai',
  ZALO_HOTLINE: 'https://zalo.me/0989890022',
  AFFILIATE_PORTAL: 'https://app.travel4u.us/aff/',
  TELEGRAM_BOT_TOKEN: '8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8',
  TELEGRAM_CHAT_ID: '-1001828947537'
};

// ==================== 1. TỰ ĐỘNG TẠO CUSTOM MENU KHI MỞ SHEET ====================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏆 Travel4U Luxury Empire CRM')
    .addItem('👑 KHỞI TẠO CẤU TRÚC MASTER CRM (16 CỘT & 3 TABS)', 'seedMasterCrmArchitecture')
    .addSeparator()
    .addItem('📧 Gửi Email Day 0: Onboarding & Lộ Trình (Khách Chọn)', 'triggerDay0EmailForSelectedRow')
    .addItem('📧 Gửi Email Day 2: Bí Mật 5 Giám Đốc AI C-Suite', 'triggerDay2EmailForSelectedRow')
    .addItem('📧 Gửi Email Day 3: Cỗ Máy AI Doanh Thu & VietQR 3s', 'triggerDay3EmailForSelectedRow')
    .addItem('📧 Gửi Email Day 5: VIP 1:1 Coaching Call với Victor Chuyen', 'triggerDay5EmailForSelectedRow')
    .addSeparator()
    .addItem('💎 Kiểm Tra Cơ Cấu Hoa Hồng Affiliate (10% - 20% - 30%)', 'showAffiliateCommissionGuide')
    .addItem('⚡ Gửi Báo Cáo CRM Hôm Nay Qua Telegram', 'sendDailyCrmReportToTelegram')
    .addToUi();
}

// ==================== 2. SEEDING CẤU TRÚC MASTER CRM ====================
function seedMasterCrmArchitecture() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Tab OPC_CRM_CUSTOMERS (16 Cột Chuẩn)
  var sheetCrm = getOrCreateSheet(ss, CONFIG.TAB_CRM);
  var headersCrm = [
    'Mã Đơn / Lead',            // A
    'Thời Gian Ghi Nhận',       // B
    'Họ Và Tên Khách Hàng',     // C
    'Số Điện Thoại / Zalo',     // D
    'Email Khách Hàng',         // E
    'Tên Doanh Nghiệp / Ngách', // F
    'Gói Dịch Vụ AI',           // G (DIY $19 / DWY $139 / DFY $388)
    'Hình Thức',                // H (Tư vấn / Cọc 50% / Full 100%)
    'Số Tiền Đã Thanh Toán',    // I
    'Số Tiền Còn Lại Phải Thu', // J
    'Đối Tác Giới Thiệu (Ref)', // K
    'Trạng Thái CSKH',          // L (Mới Tiếp Nhận / Đang Tư Vấn / Đã Chốt)
    'Link Folder Bàn Giao',     // M
    'Lịch Hẹn Coaching 1:1',    // N
    'Người Phụ Trách',          // O (Victor Chuyen)
    'Ghi Chú Tiến Độ'           // P
  ];
  sheetCrm.getRange(1, 1, 1, headersCrm.length).setValues([headersCrm]);
  formatLuxuryHeader(sheetCrm, headersCrm.length, '#07111e', '#c9a54e');
  
  // 2. Tab Travel4U_3_Packages (3 Gói AI Revenue & Hoa Hồng VIP)
  var sheetOffers = getOrCreateSheet(ss, CONFIG.TAB_OFFERS);
  sheetOffers.clear();
  var headersOffers = [
    'Mã Gói', 'Tên Gói Dịch Vụ', 'Giá Bán (VND)', 'Giá USD ($)', 
    'Quyền Lợi Cốt Lõi (Alex Hormozi Stack)', 'Hoa Hồng 10% (Gói 1)', 
    'Hoa Hồng 20% (Gói 2)', 'Hoa Hồng 30% (Gói 3)', 'Trạng Thái'
  ];
  sheetOffers.appendRow(headersOffers);
  formatLuxuryHeader(sheetOffers, headersOffers.length, '#0b1726', '#38bdf8');
  
  var offersData = [
    [
      'TIER-01-DIY',
      'Gói 01: DIY Starter Kit (Mô Hình Tự Triển Khai)',
      '500.000 VNĐ',
      '$19 USD',
      'Mã nguồn Sovereign App V1.0 + 157 Prompt Vault chuẩn 5 Giám Đốc AI + Hướng dẫn cài đặt 1-click + Nhóm hỗ trợ Zalo/Discord',
      '50.000 VNĐ',
      '100.000 VNĐ',
      '150.000 VNĐ',
      'ACTIVE_OPEN'
    ],
    [
      'TIER-02-DWY',
      'Gói 02: DWY Builder Sprint (Đồng Hành Triển Khai 14 Ngày)',
      '3.600.000 VNĐ',
      '$139 USD',
      'Toàn bộ Gói 01 + Setup trực tiếp 5 Giám Đốc AI + Tự động hóa CRM Google Sheet + Webhook VietQR MB Bank + 2 buổi Coaching 1:1 60m',
      '360.000 VNĐ',
      '720.000 VNĐ',
      '1.080.000 VNĐ',
      'ACTIVE_HOT'
    ],
    [
      'TIER-03-DFY',
      'Gói 03: DFY Revenue System (Chuyển Giao Trọn Gói Turnkey 30 Ngày)',
      '10.000.000 VNĐ',
      '$388 USD',
      'Toàn bộ Gói 02 + Deploy hệ sinh thái Sovereign Web App đa ngôn ngữ + Kết nối API Affiliate GYG/Travelpayouts + Bảo hành trọn đời + Coaching 1:1 trực tiếp cùng Chairman Victor Chuyen',
      '1.000.000 VNĐ',
      '2.000.000 VNĐ',
      '3.000.000 VNĐ',
      'ACTIVE_VIP'
    ]
  ];
  for (var i = 0; i < offersData.length; i++) {
    sheetOffers.appendRow(offersData[i]);
  }

  // 3. Tab 5_Day_Emails (Mẫu Email Drip Kích Hoạt Tự Động)
  seedEmailTemplatesTab(ss);

  SpreadsheetApp.getUi().alert('🎉 KHỞI TẠO HOÀN HẢO CẤU TRÚC MASTER CRM!\n\nĐã sẵn sàng:\n1. Tab OPC_CRM_CUSTOMERS (16 Cột Chuẩn)\n2. Tab Travel4U_3_Packages (3 Gói AI + Hoa Hồng 10%-20%-30%)\n3. Tab 5_Day_Emails (Mẫu Email Chuẩn Forbes / Dark Obsidian)');
}

// Helper: Format Header Row Luxury Dark Gold
function formatLuxuryHeader(sheet, numCols, bgColor, textColor) {
  var range = sheet.getRange(1, 1, 1, numCols);
  range.setBackground(bgColor)
       .setFontColor(textColor)
       .setFontWeight('bold')
       .setHorizontalAlignment('center')
       .setFontSize(10);
  for (var c = 1; c <= numCols; c++) {
    sheet.setColumnWidth(c, 210);
  }
}

// Helper: Lấy hoặc Tạo Sheet
function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

// Helper: Seed Tab Mẫu Email
function seedEmailTemplatesTab(ss) {
  var sheet = getOrCreateSheet(ss, CONFIG.TAB_EMAILS);
  sheet.clear();
  var headers = ['Ngày (Day Step)', 'Tiêu Đề Email (Subject Line)', 'Mô Tả Mục Tiêu', 'Link CTA Trọng Tâm', 'Trạng Thái'];
  sheet.appendRow(headers);
  formatLuxuryHeader(sheet, headers.length, '#1e293b', '#facc15');
  
  var emails = [
    [
      0,
      '⚡ [OPC AI Revenue Lab] Xác nhận đăng ký & Lộ trình triển khai {{Tier}} | Victor Chuyen',
      'Onboarding chào mừng ngay lập tức sau khi khách điền form trên app.travel4u.us',
      CONFIG.CAL_LINK,
      'ACTIVE'
    ],
    [
      2,
      '🤖 Bí Mật 5 Giám Đốc AI (C-Suite) Giúp Bạn Vận Hành Doanh Nghiệp Tự Động | Victor Chuyen',
      'Giải mã kiến trúc Hub-and-Spoke và cách 5 AI thay thế chi phí 20 nhân sự',
      CONFIG.CAL_LINK,
      'ACTIVE'
    ],
    [
      3,
      '🎯 Cỗ Máy AI Doanh Thu & Kế Toán VietQR Đối Soát Trong 3 Giây | Victor Chuyen',
      'Hướng dẫn tích hợp Webhook VietQR ngân hàng và phễu chuyển đổi Grand Slam Offer',
      CONFIG.ZALO_HOTLINE,
      'ACTIVE'
    ],
    [
      5,
      '👑 [Suất Tư Vấn Chiến Lược] Khởi Tạo Doanh Nghiệp AI 1 Người Cùng Chairman Victor Chuyen',
      'Lời mời trực tiếp tham gia Gói 03 DFY Revenue System $388 hoặc Coaching VIP 1:1',
      CONFIG.CAL_LINK,
      'ACTIVE'
    ]
  ];
  for (var j = 0; j < emails.length; j++) {
    sheet.appendRow(emails[j]);
  }
}

// ==================== 3. XỬ LÝ WEBHOOK: doPost (NHẬN DỮ LIỆU TỪ APP.TRAVEL4U.US) ====================
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.TAB_CRM);
    if (!sheet) {
      seedMasterCrmArchitecture();
      sheet = ss.getSheetByName(CONFIG.TAB_CRM);
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) {}
    }
    
    var rawPhone = (data.phone || '').toString().trim();
    var phoneFormatted = rawPhone ? ("'" + rawPhone.replace(/^'+/, '')) : '';
    var nowStr = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    
    var row = [
      data.id || ('OPC-' + Date.now()),                                // A: Mã Đơn / Lead
      nowStr,                                                          // B: Thời Gian
      data.name || 'Khách Hàng',                                       // C: Họ và Tên
      phoneFormatted,                                                  // D: Số Điện Thoại
      data.email || '',                                                // E: Email
      data.business || 'Chưa cập nhật',                                // F: Doanh Nghiệp
      data.service || data.tier_name || data.tier || '3 Gói AI Doanh Thu', // G: Gói Dịch Vụ
      data.payment_type || 'Đăng Ký Tư Vấn',                           // H: Hình Thức
      data.amount_paid ? Number(data.amount_paid).toLocaleString('vi-VN') + ' VNĐ' : '0 VNĐ', // I
      data.amount_remaining ? Number(data.amount_remaining).toLocaleString('vi-VN') + ' VNĐ' : '0 VNĐ', // J
      data.ref_code || 'direct (HQ)',                                  // K: Đối Tác Ref
      data.status || 'Mới Tiếp Nhận',                                  // L: Trạng Thái
      data.drive_folder || '',                                         // M: Link Bàn Giao
      data.meeting_time || 'Chưa đặt lịch',                            // N: Lịch Coaching
      'Victor Chuyen',                                                 // O: Phụ Trách
      data.note || 'Khách đăng ký từ app.travel4u.us'                   // P: Ghi Chú
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đã lưu khách hàng vào Google Sheet CRM thành công!',
      row_id: row[0],
      name: row[2]
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== 4. XỬ LÝ REST API: doGet (HEALTH CHECK) ====================
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ONLINE_ACTIVE',
    engine: 'Travel4U Luxury Empire & OPC Master CRM',
    spreadsheet_id: CONFIG.SPREADSHEET_ID,
    tabs: [CONFIG.TAB_CRM, CONFIG.TAB_OFFERS, CONFIG.TAB_EMAILS],
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// ==================== 5. HÀM GỬI EMAIL CHUẨN LUXURY QUA RESEND API ====================
function sendLuxuryEmailViaResend(to, subject, htmlBody) {
  var plainText = htmlBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  var payload = {
    from: CONFIG.SENDER_EMAIL,
    to: [to],
    subject: subject,
    html: htmlBody,
    text: plainText
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + CONFIG.RESEND_API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    var response = UrlFetchApp.fetch('https://api.resend.com/emails', options);
    var resData = JSON.parse(response.getContentText());
    if (response.getResponseCode() === 200 || response.getResponseCode() === 201) {
      return { success: true, id: resData.id };
    } else {
      console.warn('Resend API returned non-200, falling back to MailApp:', resData);
      MailApp.sendEmail({
        to: to,
        subject: subject,
        body: plainText,
        name: 'Victor Chuyen - OPC AI Revenue Lab'
      });
      return { success: true, fallback: true };
    }
  } catch (err) {
    console.warn('Exception calling Resend API, using MailApp fallback:', err);
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: plainText,
      name: 'Victor Chuyen - OPC AI Revenue Lab'
    });
    return { success: true, fallback: true };
  }
}

// ==================== 6. KÍCH HOẠT EMAIL CHO DÒNG ĐƯỢC CHỌN TRÊN SHEET ====================
function triggerEmailForActiveRow(dayStep) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.TAB_CRM);
  if (!sheet) return;
  var row = sheet.getActiveCell().getRow();
  if (row <= 1) {
    SpreadsheetApp.getUi().alert('⚠️ Vui lòng nhấp chọn một dòng khách hàng cụ thể (từ dòng 2 trở đi)!');
    return;
  }
  
  var name = sheet.getRange(row, 3).getValue();
  var phone = sheet.getRange(row, 4).getValue();
  var email = sheet.getRange(row, 5).getValue();
  var tier = sheet.getRange(row, 7).getValue() || 'Gói AI Doanh Thu';
  
  if (!email || email.indexOf('@') === -1) {
    SpreadsheetApp.getUi().alert('⚠️ Dòng này chưa có thông tin Email hợp lệ!');
    return;
  }
  
  var subject = '';
  var htmlContent = '';
  
  if (dayStep === 0) {
    subject = '⚡ [OPC AI Revenue Lab] Xác nhận đăng ký & Lộ trình triển khai ' + tier + ' | Victor Chuyen';
    htmlContent = buildDay0Html(name, tier, phone);
  } else if (dayStep === 2) {
    subject = '🤖 Bí Mật 5 Giám Đốc AI (C-Suite) Giúp Bạn Vận Hành Doanh Nghiệp Tự Động | Victor Chuyen';
    htmlContent = buildDay2Html(name, tier);
  } else if (dayStep === 3) {
    subject = '🎯 Cỗ Máy AI Doanh Thu & Kế Toán VietQR Đối Soát Trong 3 Giây | Victor Chuyen';
    htmlContent = buildDay3Html(name, tier);
  } else if (dayStep === 5) {
    subject = '👑 [Suất Tư Vấn Chiến Lược] Khởi Tạo Doanh Nghiệp AI 1 Người Cùng Chairman Victor Chuyen';
    htmlContent = buildDay5Html(name, tier);
  }
  
  var result = sendLuxuryEmailViaResend(email, subject, htmlContent);
  if (result.success) {
    SpreadsheetApp.getUi().alert('✅ ĐÃ GỬI EMAIL NGÀY ' + dayStep + ' THÀNH CÔNG!\n\nTới khách hàng: ' + name + '\nEmail: ' + email + '\nGói: ' + tier);
  } else {
    SpreadsheetApp.getUi().alert('❌ Gửi Email không thành công: ' + JSON.stringify(result));
  }
}

function triggerDay0EmailForSelectedRow() { triggerEmailForActiveRow(0); }
function triggerDay2EmailForSelectedRow() { triggerEmailForActiveRow(2); }
function triggerDay3EmailForSelectedRow() { triggerEmailForActiveRow(3); }
function triggerDay5EmailForSelectedRow() { triggerEmailForActiveRow(5); }

// ==================== 7. TEMPLATE HTML BUILDERS (LUXURY DARK & GOLD) ====================
function buildEmailBase(title, innerContent) {
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + title + '</title></head>' +
  '<body style="margin:0;padding:0;background-color:#07111e;font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;">' +
  '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#07111e;padding:30px 10px;"><tr><td align="center">' +
  '<table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#0b1726;border-radius:20px;border:1px solid rgba(201,165,78,0.3);overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">' +
  '<tr><td style="background:linear-gradient(135deg, #0e1e33 0%, #172d4a 100%);padding:25px;text-align:center;border-bottom:1px solid rgba(201,165,78,0.2);">' +
  '<div style="display:inline-block;padding:4px 14px;background:rgba(201,165,78,0.15);border:1px solid rgba(201,165,78,0.4);border-radius:20px;color:#c9a54e;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">OPC AI REVENUE LAB • VICTOR CHUYEN</div>' +
  '<h1 style="margin:0;font-size:20px;font-weight:900;color:#ffffff;font-family:Georgia,serif;">' + title + '</h1>' +
  '</td></tr>' +
  '<tr><td style="padding:28px 24px;line-height:1.6;font-size:14px;color:#cbd5e1;">' + innerContent + '</td></tr>' +
  '<tr><td style="background:#07111e;padding:16px;text-align:center;border-top:1px solid #1e293b;font-size:11px;color:#64748b;">' +
  '© 2026 OPC AI Revenue Lab & Travel4U Luxury Empire.<br>Chairman Victor Chuyen | Verified Domain: breaths.live' +
  '</td></tr></table></td></tr></table></body></html>';
}

function buildDay0Html(name, tier, phone) {
  var content = '<h2 style="color:#c9a54e;font-size:17px;margin-top:0;">Kính chào ' + name + ',</h2>' +
  '<p>Cảm ơn Anh/Chị đã đăng ký thông tin với <strong>OPC AI Revenue Lab</strong>. Victor Chuyen và đội ngũ kỹ thuật AI đã tiếp nhận yêu cầu và sẽ đồng hành trực tiếp cùng Anh/Chị để biến AI thành kết quả doanh thu thực tế.</p>' +
  '<div style="background:rgba(15,23,42,0.8);border-left:4px solid #c9a54e;padding:16px;margin:20px 0;border-radius:8px;">' +
  '<h3 style="margin:0 0 8px 0;font-size:14px;color:#c9a54e;">📋 THÔNG TIN GÓI GIẢI PHÁP:</h3>' +
  '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.8;">' +
  '<li>Gói đăng ký: <strong style="color:#ffffff;">' + tier + '</strong></li>' +
  '<li>Khách hàng: <strong>' + name + '</strong></li>' +
  '<li>Số điện thoại / Zalo: <strong style="color:#38bdf8;">' + phone + '</strong></li>' +
  '<li>Trạng thái: <span style="color:#fbbf24;font-weight:bold;">Đang kết nối hỗ trợ 1:1</span></li>' +
  '</ul></div>' +
  '<div style="text-align:center;margin:25px 0;">' +
  '<a href="' + CONFIG.CAL_LINK + '" target="_blank" style="background:#c9a54e;color:#07111e;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">📅 ĐẶT LỊCH HẸN CHIẾN LƯỢC 1:1 VỚI VICTOR CHUYEN</a>' +
  '</div>' +
  '<p style="font-size:12px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;margin-top:20px;">' +
  '💬 Zalo trực tiếp Victor Chuyen: <a href="' + CONFIG.ZALO_HOTLINE + '" style="color:#38bdf8;">0989890022</a><br>' +
  '💎 Dashboard Đối Tác Affiliate: <a href="' + CONFIG.AFFILIATE_PORTAL + '" style="color:#c9a54e;">app.travel4u.us/aff/</a>' +
  '</p>';
  return buildEmailBase('LỘ TRÌNH ĐỒNG HÀNH & TRIỂN KHAI AI DOANH THU', content);
}

function buildDay2Html(name, tier) {
  var content = '<h2 style="color:#c9a54e;font-size:17px;margin-top:0;">Kính chào ' + name + ',</h2>' +
  '<p>Chi phí lớn nhất của doanh nghiệp không nằm ở phần mềm hay văn phòng, mà nằm ở <strong>CHI PHÍ QUẢN LÝ NHÂN SỰ & LỖI VẬN HÀNH CON NGƯỜI</strong>.</p>' +
  '<div style="background:rgba(15,23,42,0.8);border-left:4px solid #38bdf8;padding:16px;margin:20px 0;border-radius:8px;">' +
  '<h3 style="margin:0 0 10px 0;font-size:14px;color:#38bdf8;">🤖 KIẾN TRÚC 5 GIÁM ĐỐC AI C-SUITE TRONG GÓI CỦA BẠN:</h3>' +
  '<ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.8;">' +
  '<li>👑 <b>AI CEO:</b> Quản trị trung tâm Hub-and-Spoke, ủy quyền nhiệm vụ và kiểm toán P&L</li>' +
  '<li>📢 <b>AI CMO:</b> Tự động viết nội dung Alex Hormozi Offer, chạy quảng cáo Meta & TikTok Ads</li>' +
  '<li>💼 <b>AI CSO:</b> B2B Cold Outreach, chốt lịch hẹn tư vấn và neo giá 3 Tier</li>' +
  '<li>🛠️ <b>AI CPO:</b> Lập trình Web App, REST API và đồng bộ Google Cloud 24/7</li>' +
  '<li>🧾 <b>AI CFO:</b> Lắng nghe Webhook VietQR ngân hàng, gạch nợ 3 giây và tự động mở quyền VIP</li>' +
  '</ul></div>' +
  '<div style="text-align:center;margin:25px 0;">' +
  '<a href="' + CONFIG.CAL_LINK + '" target="_blank" style="background:#38bdf8;color:#07111e;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">👉 ĐẶT LỊCH AUDIT HỆ THỐNG 1:1 NGAY</a>' +
  '</div>';
  return buildEmailBase('BÍ MẬT 5 GIÁM ĐỐC AI THAY THẾ 20 NHÂN SỰ', content);
}

function buildDay3Html(name, tier) {
  var content = '<h2 style="color:#c9a54e;font-size:17px;margin-top:0;">Kính chào ' + name + ',</h2>' +
  '<p>Để một doanh nghiệp 1 người (OPC) tạo ra dòng tiền bền vững, chúng ta cần 2 yếu tố quyết định:</p>' +
  '<ol style="font-size:13.5px;line-height:1.8;padding-left:20px;">' +
  '<li><strong>Grand Slam Offer Neo Giá 3 Tier:</strong> Giúp khách hàng tự động nâng cấp giá trị từ $19 lên $139 và $388 mà không cần chèo kéo.</li>' +
  '<li><strong>Kế Toán AI CFO Đối Soát VietQR 3 Giây:</strong> Khi khách chuyển khoản VietQR qua MB Bank 0989890022, hệ thống tự động gạch nợ và cấp quyền Google Drive / Dashboard trong 3 giây.</li>' +
  '</ol>' +
  '<p>Toàn bộ cơ chế này đã được đóng gói hoàn chỉnh trong <strong>' + tier + '</strong> của Anh/Chị.</p>' +
  '<div style="text-align:center;margin:25px 0;">' +
  '<a href="' + CONFIG.ZALO_HOTLINE + '" target="_blank" style="background:#22c55e;color:#07111e;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">💬 NHẮN ZALO VICTOR CHUYEN ĐỂ TEST THỬ CỖ MÁY</a>' +
  '</div>';
  return buildEmailBase('CỖ MÁY AI DOANH THU & VIETQR 3 GIÂY', content);
}

function buildDay5Html(name, tier) {
  var content = '<h2 style="color:#c9a54e;font-size:17px;margin-top:0;">Kính chào ' + name + ',</h2>' +
  '<p>Đây là cơ hội đặc biệt để Anh/Chị cùng Victor Chuyen triển khai toàn bộ hệ thống này theo hình thức <strong>Cầm Tay Chỉ Việc Trọn Gói 1:1 (Done-For-You)</strong>.</p>' +
  '<p>Trong buổi làm việc 1:1, chúng ta sẽ trực tiếp:</p>' +
  '<ul style="font-size:13px;line-height:1.8;padding-left:18px;">' +
  '<li>Cấu hình toàn bộ domain, email server Resend và mã nguồn Sovereign App</li>' +
  '<li>Đóng gói lời chào hàng không thể cưỡng lại theo phong cách Alex Hormozi</li>' +
  '<li>Kết nối luồng hoa hồng Affiliate 3 Cấp (10% - 20% - 30%) để khách tự lan tỏa</li>' +
  '</ul>' +
  '<div style="text-align:center;margin:25px 0;">' +
  '<a href="' + CONFIG.CAL_LINK + '" target="_blank" style="background:linear-gradient(135deg, #c9a54e, #eab308);color:#07111e;font-weight:900;font-size:13px;padding:14px 28px;border-radius:8px;text-decoration:none;display:inline-block;box-shadow:0 4px 15px rgba(201,165,78,0.4);">👑 ĐẶT LỊCH CHIẾN LƯỢC CÙNG CHAIRMAN VICTOR</a>' +
  '</div>';
  return buildEmailBase('LỜI MỜI HỢP TÁC VIP CÙNG CHAIRMAN VICTOR', content);
}

// ==================== 8. BÁO CÁO TELEGRAM & HOA HỒNG ====================
function showAffiliateCommissionGuide() {
  SpreadsheetApp.getUi().alert('💎 CƠ CẤU HOA HỒNG ĐỐI TÁC AFFILIATE (ĐIỀU 7 AGENTS.MD):\n\n' +
    '1. Gói 01 — DIY Starter Kit ($19 / 500k VNĐ):\n   - Cấp 1 (10%): Nhận 50.000đ khi giới thiệu Gói 1\n   - Cấp 2 (20%): Nhận 100.000đ khi đã mua Gói 2\n   - Cấp 3 (30%): Nhận 150.000đ khi đã mua Gói 3\n\n' +
    '2. Gói 02 — DWY Builder Sprint ($139 / 3.6tr VNĐ):\n   - Cấp 1 (10%): 360.000đ\n   - Cấp 2 (20%): 720.000đ (Chỉ 2 sales là hoàn vốn 100%!)\n   - Cấp 3 (30%): 1.080.000đ\n\n' +
    '3. Gói 03 — DFY Revenue System ($388 / 10tr VNĐ):\n   - Cấp 1 (10%): 1.000.000đ\n   - Cấp 2 (20%): 2.000.000đ\n   - Cấp 3 (30%): 3.000.000đ (Hoa hồng VIP cao nhất!)\n\n' +
    'Toàn bộ được ghi nhận tự động vào CRM và chi trả qua VietQR MB Bank.');
}

function sendDailyCrmReportToTelegram() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.TAB_CRM);
  if (!sheet) return;
  
  var data = sheet.getDataRange().getValues();
  var totalRows = data.length - 1;
  var today = new Date().toLocaleDateString('vi-VN');
  var todayLeads = 0;
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] && data[i][1].toString().indexOf(today) !== -1) {
      todayLeads++;
    }
  }
  
  var text = '📊 <b>[BÁO CÁO CRM CA LÀM VIỆC] TRAVEL4U & OPC REVENUE LAB</b>\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '📅 <b>Ngày:</b> ' + today + '\n' +
    '👥 <b>Tổng khách hàng trong CRM:</b> <b>' + totalRows + '</b>\n' +
    '⚡ <b>Leads mới hôm nay:</b> <b>' + todayLeads + '</b>\n' +
    '🎯 <b>Phạm vi:</b> Chỉ tính 3 Gói AI Revenue ($19, $139, $388)\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '🔗 <a href="https://docs.google.com/spreadsheets/d/' + CONFIG.SPREADSHEET_ID + '/edit">Mở Master Google Sheet CRM</a>';
    
  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + CONFIG.TELEGRAM_BOT_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    SpreadsheetApp.getUi().alert('✅ Đã bắn báo cáo CRM về Telegram của Chairman Victor thành công!');
  } catch (e) {
    SpreadsheetApp.getUi().alert('❌ Lỗi gửi Telegram: ' + e.toString());
  }
}
