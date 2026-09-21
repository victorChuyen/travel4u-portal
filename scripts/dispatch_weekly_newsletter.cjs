/**
 * 👑 TRAVEL4U LUXURY JOURNAL — WEEKLY DRIP DISPATCH ENGINE
 * Automated Saturday 09:00 AM Newsletter Runner
 * Standards: Condé Nast Traveler / Prior Club Luxury Benchmark
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 * 
 * Usage:
 *   node scripts/dispatch_weekly_newsletter.cjs --edition=1 --dry-run
 *   node scripts/dispatch_weekly_newsletter.cjs --edition=1 --send
 *   node scripts/dispatch_weekly_newsletter.cjs --edition=auto --send
 */

const path = require('path');
const ROOT_APP = path.resolve(__dirname, '..');
const { SPREADSHEET_18_THEMES_ID } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/config.js'));
const { getAccessToken } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/auth.js'));
const { readRange, writeRange } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const TAB_NAME = 'NEWSLETTER_SUBSCRIBERS';
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_123456789'; // Fallback or env
const DEFAULT_SENDER = process.env.RESEND_JOURNAL_EMAIL || process.env.RESEND_FROM_EMAIL || 'Victor & Lucky - Travel4U Journal <journal@travel4u.us>';
const SURVEY_BASE_URL = 'https://app.travel4u.us/api/newsletter/preference';

// 5 Curated Luxury Editorial Editions
const EDITORIAL_EDITIONS = {
  1: {
    theme: 'islands',
    tag: '🏝️ ĐẢO RIÊNG & BIỆT THỰ NỔI',
    subject: '🏝️ [Weekly Hot Spot #1] 3 Ốc Đảo Riêng Đẹp Nhất Maldives & Nam Thái Bình Dương | Victor & Lucky',
    subtitle: 'Kỳ nghỉ biệt lập hoàn hảo: Khi đại dương xanh ngọc là khu vườn riêng trước hiên phòng.',
    readTime: '4 phút đọc',
    curatedSanctuaries: [
      {
        name: 'Soneva Jani (Noonu Atoll, Maldives)',
        highlight: 'Biệt thự nổi 2 tầng có mái vòm mở ngắm sao & cầu trượt thẳng xuống đại dương.',
        secretPerk: 'Bí kíp VIP: Đặt qua Travel4U để nhận bữa tối riêng tư ngắm hoàng hôn trên bãi cát trắng và $150 credit trị liệu spa.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Cheval Blanc Randheli (Noonu Atoll, Maldives)',
        highlight: 'Kiệt tác của tập đoàn LVMH với phong cách Art de Recevoir tinh tế bậc nhất thế giới.',
        secretPerk: 'Bí kíp VIP: Trải nghiệm du thuyền cá nhân đưa đón từ sân bay Male với champagne Dom Pérignon phục vụ không giới hạn.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'The Nautilus Maldives (Baa Atoll, UNESCO Biosphere)',
        highlight: 'Ốc đảo tự do phong cách Bohemian: Không giờ giấc cố định, ẩm thực phục vụ 24/7 theo thực đơn riêng của bạn.',
        secretPerk: 'Bí kíp VIP: Tour lặn biển ngắm cá đuối Manta khổng lồ tại vịnh Hanifaru có chuyên gia sinh học đồng hành.',
        url: 'https://app.travel4u.us/#hotels'
      }
    ],
    experienceHighlight: {
      title: 'Trải Nghiệm VIP Khuyên Thử Trong Tuần',
      text: 'Tour du thuyền buồm ngắm cá heo lúc hoàng hôn và lặn san hô ống thở tại Maldives.',
      cta: 'Xem Chi Tiết Tour VIP GetYourGuide →',
      link: 'https://app.travel4u.us/#experiences'
    }
  },

  2: {
    theme: 'palaces',
    tag: '🏰 CUNG ĐIỆN & LÂU ĐÀI CỔ',
    subject: '🏰 [Weekly Hot Spot #2] Huyền Thoại Hồ Como & Vách Đá Amalfi: 3 Cung Điện Của Giới Siêu Giàu | Victor & Lucky',
    subtitle: 'Nghệ thuật sống La Dolce Vita: Nơi các bậc quý tộc châu Âu tìm kiếm sự thanh tịnh trường tồn.',
    readTime: '5 phút đọc',
    curatedSanctuaries: [
      {
        name: 'Passalacqua (Moltrasio, Lake Como, Ý)',
        highlight: 'Được bình chọn là Khách sạn số 1 thế giới: Cung điện thế kỷ 18 với vườn hồng bậc thang đổ xuống hồ.',
        secretPerk: 'Bí kíp VIP: Đặt trước ít nhất 6 tháng cho căn phòng Suite Bellini để tận hưởng trần nhà vẽ bích họa nguyên bản.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: "Villa d'Este (Cernobbio, Lake Como, Ý)",
        highlight: 'Cung điện thời Phục Hưng với hồ bơi nổi trên mặt hồ Como trứ danh.',
        secretPerk: 'Bí kíp VIP: Du ngoạn hồ bằng thuyền gỗ Riva cổ điển kèm rượu vang Prosecco ướp lạnh.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Le Sirenuse (Positano, Bờ Biển Amalfi, Ý)',
        highlight: 'Ngôi nhà nghỉ dưỡng của gia đình quý tộc Sersale với 400 ngọn nến thắp tay lung linh mỗi đêm.',
        secretPerk: 'Bí kíp VIP: Bàn ăn sát mép ban công tại nhà hàng La Sponda hướng trọn vòm nhà thờ Positano rực rỡ.',
        url: 'https://app.travel4u.us/#hotels'
      }
    ],
    experienceHighlight: {
      title: 'Trải Nghiệm VIP Khuyên Thử Trong Tuần',
      text: 'Tour thuyền gỗ Riva riêng tư 4 tiếng khám phá các biệt thự cổ bí mật trên hồ Como.',
      cta: 'Đặt Tour Thuyền Riva VIP GetYourGuide →',
      link: 'https://app.travel4u.us/#experiences'
    }
  },

  3: {
    theme: 'ryokans',
    tag: '♨️ RYOKAN & ONSEN NHẬT BẢN',
    subject: '♨️ [Weekly Hot Spot #3] Ký Sự Ryokan Triệu Đô: Nghệ Thuật Tắm Onsen Riêng Tư Giữa Rừng Già Kyoto | Victor & Lucky',
    subtitle: 'Triết lý Wabi-Sabi và lòng hiếu khách Omotenashi chạm tới tầng sâu tâm hồn.',
    readTime: '4 phút đọc',
    curatedSanctuaries: [
      {
        name: 'Hoshinoya Kyoto (Arashiyama, Kyoto, Nhật Bản)',
        highlight: 'Ẩn mình bên bờ sông Oi, chỉ có thể tiếp cận bằng thuyền gỗ truyền thống lướt qua hẻm núi lá phong rực rỡ.',
        secretPerk: 'Bí kíp VIP: Trải nghiệm trà đạo buổi sáng sớm tại vọng lâu gỗ vươn ra mặt nước tĩnh lặng.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Gora Kadan (Hakone, Công Viên Quốc Gia Fuji-Hakone-Izu)',
        highlight: 'Biệt thự nghỉ dưỡng của gia đình Hoàng Gia Kan’in-no-miya với nguồn suối khoáng nóng ngầm tự nhiên.',
        secretPerk: 'Bí kíp VIP: Thưởng thức bữa tiệc Kaiseki 10 món đỉnh cao ngay tại phòng ngủ trải chiếu tatami thơm ngát.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'The Ritz-Carlton Kyoto (Bên Sông Kamogawa, Kyoto)',
        highlight: 'Giao thoa hoàn mỹ giữa di sản Meiji và tiện nghi xa xỉ hiện đại bậc nhất cố đô.',
        secretPerk: 'Bí kíp VIP: Đăng ký tour đi bộ sáng sớm viếng thăm các ngôi đền Zen chưa mở cửa cho công chúng.',
        url: 'https://app.travel4u.us/#hotels'
      }
    ],
    experienceHighlight: {
      title: 'Trải Nghiệm VIP Khuyên Thử Trong Tuần',
      text: 'Trải nghiệm trà đạo bí mật cùng Geisha tại khu phố cổ Gion và vé tàu Shinkansen VIP.',
      cta: 'Khám Phá Tour Trà Đạo VIP GetYourGuide →',
      link: 'https://app.travel4u.us/#experiences'
    }
  },

  4: {
    theme: 'safaris',
    tag: '🦁 SAFARI THẢO NGUYÊN CHÂU PHI',
    subject: '🦁 [Weekly Hot Spot #4] Kỳ Quan Thảo Nguyên: 3 Khu Cắm Trại Đẳng Cấp Thượng Lưu Tại Serengeti & Kruger | Victor & Lucky',
    subtitle: 'Thước phim hoang dã tráng lệ: Thưởng thức ly gin-tonic bên ngọn lửa trại giữa vòng vây của thiên nhiên thuần khiết.',
    readTime: '5 phút đọc',
    curatedSanctuaries: [
      {
        name: 'Four Seasons Safari Lodge Serengeti (Tanzania)',
        highlight: 'Bể bơi vô cực nhìn thẳng xuống hồ nước tự nhiên – nơi các đàn voi ghé uống nước mỗi chiều tà.',
        secretPerk: 'Bí kíp VIP: Bữa tối Boma bên đống lửa dưới bầu trời ngập tràn sao thảo nguyên châu Phi.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Singita Sasakwa Lodge (Grumeti Reserves, Tanzania)',
        highlight: 'Dinh thự phong cách Edwardian tráng lệ với tầm nhìn bao quát toàn bộ vùng đồng bằng Serengeti mênh mông.',
        secretPerk: 'Bí kíp VIP: Xe địa hình safari riêng có kiểm lâm trưởng và tay săn ảnh động vật hoang dã chuyên nghiệp.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Royal Malewane (Greater Kruger National Park, Nam Phi)',
        highlight: 'Khu nghỉ dưỡng yêu thích của các nguyên thủ với đội ngũ dẫn đường Master Tracker số 1 thế giới.',
        secretPerk: 'Bí kíp VIP: Spa phong cách thuộc địa đạt giải thưởng thế giới với liệu pháp massage dầu Marula bản địa.',
        url: 'https://app.travel4u.us/#hotels'
      }
    ],
    experienceHighlight: {
      title: 'Trải Nghiệm VIP Khuyên Thử Trong Tuần',
      text: 'Bay khinh khí cầu ngắm bình minh trên thảo nguyên Serengeti kèm bữa sáng champagne thượng hạng giữa đồng cỏ hoang.',
      cta: 'Xem Vé Khinh Khí Cầu Serengeti GetYourGuide →',
      link: 'https://app.travel4u.us/#experiences'
    }
  },

  5: {
    theme: 'vip_hacks',
    tag: '✈️ BÍ KÍP NÂNG HẠNG VIP 5 SAO',
    subject: '✈️ [Weekly Hot Spot #5] Bí Mật Khách Sạn 5 Sao: Công Thức Lấy $100 Spa, Ăn Sáng Miễn Phí & Nâng Suite | Victor & Lucky',
    subtitle: 'Nghệ thuật tối ưu hóa chi tiêu nghỉ dưỡng: Đi du lịch như một yếu nhân (VIP) mà không phải trả giá cắt cổ.',
    readTime: '4 phút đọc',
    curatedSanctuaries: [
      {
        name: 'Nghệ Thuật Chọn Kênh Đặt Phòng (Direct vs Private Partner)',
        highlight: 'Các chuỗi khách sạn lớn luôn dành những căn phòng view đẹp nhất cho khách đặt qua đối tác ưu tiên cao cấp.',
        secretPerk: 'Bí quyết: Sử dụng cổng Expedia Partner Network của Travel4U để hưởng giá VIP Members-Only độc quyền.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Công Thức "Check-in 14:15" & Tấm Danh Thiếp Thần Kỳ',
        highlight: 'Thời điểm vàng lễ tân hoàn tất việc sắp xếp các lượt check-out và phân bổ phòng Suite trống cho khách có thái độ hòa nhã.',
        secretPerk: 'Mẹo thực chiến: Đính kèm một câu chào bằng ngôn ngữ địa phương và ghi chú kỷ niệm ngày cưới/ngày sinh nhật khi đặt trước.',
        url: 'https://app.travel4u.us/#hotels'
      },
      {
        name: 'Tận Dụng Trọn Vẹn Gói Quyền Lợi $100 On-Property Credit',
        highlight: 'Hầu hết du khách lãng phí khoản credit này vào dịch vụ giặt là thay vì đổi thành một liệu trình massage trị liệu cao cấp.',
        secretPerk: 'Bí quyết: Đặt lịch spa ngay khi vừa bước vào sảnh lễ tân trước khi các khung giờ đẹp bị lấp đầy.',
        url: 'https://app.travel4u.us/#hotels'
      }
    ],
    experienceHighlight: {
      title: 'Đặc Quyền Di Chuyển VIP Trong Tuần',
      text: 'Dịch vụ đưa đón sân bay bằng xe sang riêng của Welcome Pickups kèm tài xế giao tiếp tiếng Anh thành thạo.',
      cta: 'Đặt Xe Đưa Đón Sân Bay VIP Welcome Pickups →',
      link: 'https://app.travel4u.us/#planner'
    }
  }
};

/**
 * Generate Luxury Dark Obsidian & Gold HTML for a Weekly Edition
 */
function buildWeeklyNewsletterHtml({ edition, subscriberName = 'Quý Độc Giả', subscriberEmail }) {
  const encodedEmail = encodeURIComponent(subscriberEmail);
  const ed = EDITORIAL_EDITIONS[edition] || EDITORIAL_EDITIONS[1];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ed.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#040a12;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#040a12;padding:35px 10px;">
    <tr>
      <td align="center">
        <table width="640" border="0" cellspacing="0" cellpadding="0" style="background:#081526;border-radius:24px;border:1px solid rgba(201,165,78,0.35);overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.85);">
          
          <!-- Accent Gold Stripe -->
          <tr>
            <td style="background:linear-gradient(90deg, #c9a54e 0%, #f3e5ab 50%, #c9a54e 100%);height:4px;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="background:linear-gradient(180deg, #0b1c33 0%, #081526 100%);padding:36px 30px 24px 30px;text-align:center;border-bottom:1px solid rgba(201,165,78,0.2);">
              <div style="display:inline-block;padding:5px 14px;background:rgba(201,165,78,0.12);border:1px solid rgba(201,165,78,0.35);border-radius:20px;color:#d4a359;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;">
                👑 TRAVEL4U JOURNAL • BẢN TIN THỨ BẢY TUẦN #${edition}
              </div>
              <h1 style="margin:0;font-size:23px;font-weight:800;color:#ffffff;letter-spacing:0.3px;font-family:Georgia,serif;line-height:1.35;">
                ${ed.subject.replace(/^[^\s]+\s*/, '')}
              </h1>
              <p style="margin:10px 0 0 0;font-size:13.5px;color:#94a3b8;line-height:1.5;">
                ${ed.subtitle} • <em>${ed.readTime}</em>
              </p>
            </td>
          </tr>

          <!-- Editorial Content -->
          <tr>
            <td style="padding:32px 30px;">
              <p style="font-size:15px;line-height:1.6;color:#ffffff;margin-top:0;">
                Kính chào <strong>${subscriberName}</strong>,
              </p>
              
              <p style="font-size:14px;line-height:1.7;color:#cbd5e1;">
                Đã thành thông lệ vào <strong>09:00 sáng Thứ Bảy</strong>, khi tuần làm việc tạm gác lại và tâm trí bạn sẵn sàng cho những ý tưởng chu du tự tại, <strong>Victor Chuyen & AI CEO Lucky</strong> xin gửi tới bạn ấn bản tuyển chọn đặc biệt tuần này.
              </p>

              <!-- Curated Sanctuaries Cards -->
              <div style="margin:28px 0;">
                <div style="font-size:11px;font-weight:800;color:#d4a359;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">
                  🏛️ 3 THÁNH ĐỊA NGHỈ DƯỠNG TUYỂN CHỌN:
                </div>

                ${ed.curatedSanctuaries.map((hotel, idx) => `
                <div style="background:#040a12;border:1px solid rgba(201,165,78,0.25);border-radius:14px;padding:20px;margin-bottom:16px;">
                  <div style="font-size:12px;color:#d4a359;font-weight:bold;margin-bottom:4px;">
                    #0${idx + 1} • SOVEREIGN SELECTION
                  </div>
                  <h3 style="margin:0 0 8px 0;font-size:17px;color:#ffffff;font-family:Georgia,serif;">
                    ${hotel.name}
                  </h3>
                  <p style="margin:0 0 12px 0;font-size:13.5px;color:#cbd5e1;line-height:1.6;">
                    ${hotel.highlight}
                  </p>
                  <div style="background:rgba(201,165,78,0.08);border-left:3px solid #d4a359;padding:10px 14px;border-radius:6px;font-size:12.5px;color:#f1f5f9;margin-bottom:14px;line-height:1.5;">
                    💡 <strong>Đặc quyền ẩn:</strong> ${hotel.secretPerk}
                  </div>
                  <div>
                    <a href="${hotel.url}" target="_blank" style="display:inline-block;padding:8px 18px;background:rgba(201,165,78,0.15);border:1px solid #d4a359;color:#ecd699;font-size:12px;font-weight:bold;border-radius:8px;text-decoration:none;">
                      Xem Cẩm Nang Chi Tiết & Giá Phòng VIP →
                    </a>
                  </div>
                </div>
                `).join('')}
              </div>

              <!-- Spotlight Experience -->
              <div style="background:linear-gradient(135deg, #0e223d 0%, #081526 100%);border:1px solid rgba(56,189,248,0.3);border-radius:16px;padding:22px;margin:28px 0;">
                <div style="font-size:11px;font-weight:bold;color:#38bdf8;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
                  ⭐ ${ed.experienceHighlight.title}
                </div>
                <p style="margin:0 0 14px 0;font-size:13.5px;color:#e2e8f0;line-height:1.6;">
                  ${ed.experienceHighlight.text}
                </p>
                <a href="${ed.experienceHighlight.link}" target="_blank" style="display:inline-block;padding:10px 22px;background:#38bdf8;color:#07111e;font-size:12.5px;font-weight:bold;border-radius:8px;text-decoration:none;">
                  ${ed.experienceHighlight.cta}
                </a>
              </div>

              <!-- Interactive Feedback / Preference Switcher (Kịch Bản Tương Tác Cầu Thị) -->
              <div style="border-top:1px dashed rgba(201,165,78,0.3);padding-top:24px;margin-top:30px;">
                <div style="display:inline-block;padding:3px 10px;background:rgba(201,165,78,0.15);border-radius:6px;color:#d4a359;font-size:11px;font-weight:bold;margin-bottom:10px;">
                  💬 LỜI HỎI CẦU THỊ TỪ VICTOR & LUCKY
                </div>
                <h4 style="margin:0 0 8px 0;font-size:15px;color:#ffffff;">
                  Bạn muốn chúng tôi bóc tách điểm đến nào vào Thứ Bảy tuần tới?
                </h4>
                <p style="font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:16px;">
                  Chúng tôi xây dựng <em>Travel4U Journal</em> hoàn toàn dựa trên sự khao khát thực tế của độc giả. Hãy bấm 1 nút dưới đây để đổi gu nhận tin ngay lập tức (hoặc đơn giản là <strong>Reply</strong> trực tiếp thư này cho Victor & Lucky):
                </p>

                <!-- 5 1-Click Buttons -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:12px;">
                  <tr>
                    <td style="padding:4px 0;">
                      <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&pref=islands" target="_blank" style="display:block;padding:10px 14px;background:#040a12;border:1px solid rgba(56,189,248,0.25);border-radius:8px;color:#e2e8f0;text-decoration:none;font-size:13px;">
                        🏝️ Đổi sang chủ đề: <strong>Đảo Riêng & Biệt Thự Nổi (Maldives, Bora Bora)</strong>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&pref=palaces" target="_blank" style="display:block;padding:10px 14px;background:#040a12;border:1px solid rgba(201,165,78,0.25);border-radius:8px;color:#e2e8f0;text-decoration:none;font-size:13px;">
                        🏰 Đổi sang chủ đề: <strong>Cung Điện & Lâu Đài Cổ Châu Âu (Como, Amalfi)</strong>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&pref=ryokans" target="_blank" style="display:block;padding:10px 14px;background:#040a12;border:1px solid rgba(234,179,8,0.25);border-radius:8px;color:#e2e8f0;text-decoration:none;font-size:13px;">
                        ♨️ Đổi sang chủ đề: <strong>Ryokan & Suối Khoáng Onsen Nhật Bản (Kyoto, Hakone)</strong>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&pref=safaris" target="_blank" style="display:block;padding:10px 14px;background:#040a12;border:1px solid rgba(16,185,129,0.25);border-radius:8px;color:#e2e8f0;text-decoration:none;font-size:13px;">
                        🦁 Đổi sang chủ đề: <strong>Safari Thảo Nguyên Hoang Dã (Serengeti, Kruger)</strong>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&pref=vip_hacks" target="_blank" style="display:block;padding:10px 14px;background:#040a12;border:1px solid rgba(168,85,247,0.25);border-radius:8px;color:#e2e8f0;text-decoration:none;font-size:13px;">
                        ✈️ Đổi sang chủ đề: <strong>Bí Kíp Săn Phòng & Nâng Hạng Suite 5 Sao Miễn Phí</strong>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Sign-off -->
              <div style="border-top:1px solid rgba(201,165,78,0.2);padding-top:20px;margin-top:24px;">
                <p style="margin:0;font-size:14px;color:#ffffff;font-weight:bold;">Chúc bạn một cuối tuần an yên và tràn đầy cảm hứng,</p>
                <p style="margin:4px 0 0 0;font-size:16px;color:#d4a359;font-family:Georgia,serif;font-weight:bold;">
                  Victor & Lucky
                </p>
                <p style="margin:2px 0 0 0;font-size:12px;color:#64748b;">
                  Ban Biên Tập • Travel4U Luxury Empire<br>
                  Cổng Trực Tuyến: <a href="https://app.travel4u.us" style="color:#38bdf8;text-decoration:none;">app.travel4u.us</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#040a12;padding:18px 24px;text-align:center;border-top:1px solid rgba(201,165,78,0.15);">
              <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">
                © 2026 Travel4U Luxury Empire. Mọi quyền được bảo lưu.<br>
                Bản tin gửi định kỳ vào 09:00 sáng Thứ Bảy hàng tuần tới độc giả VIP.<br>
                <a href="${SURVEY_BASE_URL}?email=${encodedEmail}&action=unsubscribe" style="color:#64748b;text-decoration:underline;">Hủy nhận tin 1-click tại đây</a>
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
}

/**
 * Main Dispatcher Function
 */
async function main() {
  const args = process.argv.slice(2);
  const editionArg = args.find(a => a.startsWith('--edition='))?.split('=')[1] || '1';
  const isSend = args.includes('--send');
  const isDryRun = args.includes('--dry-run') || !isSend;

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👑 TRAVEL4U JOURNAL — WEEKLY DRIP DISPATCH ENGINE');
  console.log(`📅 Edition: ${editionArg} | Mode: ${isDryRun ? 'DRY-RUN (Simulate)' : 'LIVE SEND'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // 1. Fetch subscribers from Google Sheet
  console.log(`📋 Reading subscribers from Sheet tab "${TAB_NAME}"...`);
  let rows = [];
  try {
    const data = await readRange(`'${TAB_NAME}'!A2:J100`, SPREADSHEET_18_THEMES_ID);
    rows = data || [];
  } catch (err) {
    console.warn('⚠️ Could not fetch from Google Sheets API directly:', err.message);
  }

  console.log(`👥 Found ${rows.length} subscribers in tab "${TAB_NAME}".`);

  if (rows.length === 0) {
    console.log('ℹ️ No active subscribers in sheet yet. Adding a benchmark test row...');
    rows.push([
      '1',
      new Date().toISOString(),
      'Coach.Chuyen@gmail.com',
      'Chairman Victor Chuyen',
      'Tất Cả Cẩm Nang VIP 2026',
      'vi',
      'direct',
      '/',
      'Welcome Email Sent',
      'Đã đăng ký nhận bản tin Thứ Bảy'
    ]);
  }

  // 2. Iterate and Dispatch
  let dispatchedCount = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const email = row[2];
    const name = row[3] || 'Quý Độc Giả';
    const preference = row[4] || 'Tất Cả Cẩm Nang VIP 2026';

    if (!email || !email.includes('@')) continue;

    // Determine edition based on user preference or argument
    let targetEdition = parseInt(editionArg, 10);
    if (isNaN(targetEdition) || targetEdition < 1 || targetEdition > 5) {
      if (preference.includes('Đảo Riêng')) targetEdition = 1;
      else if (preference.includes('Cung Điện')) targetEdition = 2;
      else if (preference.includes('Ryokan')) targetEdition = 3;
      else if (preference.includes('Safari')) targetEdition = 4;
      else if (preference.includes('Bí Kíp')) targetEdition = 5;
      else targetEdition = 1;
    }

    const htmlContent = buildWeeklyNewsletterHtml({
      edition: targetEdition,
      subscriberName: name,
      subscriberEmail: email
    });

    const subject = EDITORIAL_EDITIONS[targetEdition].subject;

    console.log(`\n📨 [#${i + 1}] Processing: ${email} (${name})`);
    console.log(`   🎯 Preference: ${preference} ➔ Selected Edition: #${targetEdition}`);
    console.log(`   📄 Subject: ${subject}`);

    if (isDryRun) {
      console.log(`   ✅ [DRY-RUN] HTML generated successfully (${htmlContent.length} bytes). Not sent.`);
      dispatchedCount++;
    } else {
      // Live Dispatch via Resend API
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: DEFAULT_SENDER,
            to: [email],
            subject: subject,
            html: htmlContent
          })
        });
        const resData = await res.json();
        console.log(`   🚀 [LIVE SENT] Resend response:`, resData);
        dispatchedCount++;
      } catch (sendErr) {
        console.error(`   ❌ [SEND ERROR]:`, sendErr.message);
      }
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✨ COMPLETED: ${dispatchedCount} / ${rows.length} weekly dispatches processed.`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(console.error);
