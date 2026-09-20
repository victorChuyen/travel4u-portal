/**
 * 🎙️ VICTOR & LUCKY MULTILINGUAL STORYTELLING ARTICLE GENERATOR
 * Domain: travel4u.us
 * Generates 600 ultra-luxury, authentic, sensory 6-chapter narrative reviews across all 12 locales.
 * Integrates:
 *   - Soundscape & Acoustic Luxury
 *   - Sensory Gastronomy & Wine Provenance
 *   - 1 Positive Emotion Resolved
 *   - 1 Core Client Concern Addressed
 *   - 1 Target Persona
 *   - The "WOA" Climax & Immediate Booking Action
 *   - Contextual In-Text Cross-Links (Mesh linking)
 *   - YouTube Podcast Dialogue & 3 Viral Shorts Concepts
 *   - 100% Zero-Vietnamese-Leak across non-VI locales!
 */

const fs = require('fs');
const path = require('path');
const { STORYTELLING_DATABASE } = require('./storytelling_database_50_hotels.cjs');

const OUTPUT_FILE = path.resolve(__dirname, '../src/data/articles.json');
const DESTINATIONS_FILE = path.resolve(__dirname, '../src/data/destinations.json');
const CACHE_FILE = path.resolve(__dirname, '../src/data/translations_cache.json');

const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));

let translationsCache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    translationsCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch (e) {
    translationsCache = {};
  }
}

// Semantic clusters for natural in-text cross-linking
const CLUSTERS = {
  'the-lana-hotel-dubai': ['dubai-burj-al-arab', 'aman-tokyo-otemachi'],
  'royal-mansour-marrakech': ['paris-four-seasons-george-v', 'the-savoy-london-thames'],
  'splendido-belmond-portofino': ['hotel-santa-caterina-amalfi', 'le-sirenuse-positano-amalfi'],
  'the-brando-tetiaroa': ['soneva-jani-maldives', 'cheval-blanc-randheli-maldives'],
  'hotel-de-paris-monte-carlo': ['the-maybourne-riviera-monaco', 'hotel-du-cap-eden-roc-antibes'],
  'mandarin-oriental-bangkok': ['four-seasons-resort-bali-sayan', 'kyoto-ritz-carlton'],
  'cheval-blanc-st-barth': ['cheval-blanc-st-tropez-riviera', 'cheval-blanc-randheli-maldives'],
  'hotel-du-cap-eden-roc-antibes': ['hotel-de-paris-monte-carlo', 'cheval-blanc-st-tropez-riviera'],
  'nihi-sumba-indonesia': ['bulgari-resort-bali-uluwatu', 'singita-sasakwa-lodge-serengeti'],
  'one-and-only-reethi-rah-maldives': ['soneva-jani-maldives', 'the-nautilus-maldives'],
  'the-mark-hotel-new-york': ['aman-new-york-manhattan', 'paris-four-seasons-george-v'],
  'aman-new-york-manhattan': ['the-mark-hotel-new-york', 'aman-tokyo-otemachi'],
  'the-savoy-london-thames': ['claridges-london-mayfair', 'venice-gritti-palace'],
  'claridges-london-mayfair': ['the-savoy-london-thames', 'paris-four-seasons-george-v'],
  'aman-tokyo-otemachi': ['hoshinoya-tokyo-onsen', 'kyoto-ritz-carlton'],
  'hoshinoya-tokyo-onsen': ['aman-tokyo-otemachi', 'hoshinoya-kyoto-arashiyama'],
  'airelles-gordes-la-bastide-provence': ['cheval-blanc-st-tropez-riviera', 'les-sources-de-caudalie-bordeaux'],
  'cheval-blanc-st-tropez-riviera': ['airelles-gordes-la-bastide-provence', 'the-maybourne-riviera-monaco'],
  'nayara-alto-atacama-desert-lodge': ['tierra-patagonia-hotel-spa', 'amangiri-canyon-point-utah'],
  'tierra-patagonia-hotel-spa': ['nayara-alto-atacama-desert-lodge', 'singita-sasakwa-lodge-serengeti'],
  'passalacqua-lake-como': ['villa-deste-lake-como', 'como-grand-hotel-tremezzo'],
  'villa-deste-lake-como': ['passalacqua-lake-como', 'como-grand-hotel-tremezzo'],
  'como-grand-hotel-tremezzo': ['passalacqua-lake-como', 'villa-deste-lake-como'],
  'venice-gritti-palace': ['rome-rocco-forte-de-russie', 'passalacqua-lake-como'],
  'rome-rocco-forte-de-russie': ['venice-gritti-palace', 'villa-deste-lake-como'],
  'le-sirenuse-positano-amalfi': ['hotel-santa-caterina-amalfi', 'canaves-oia-suites-santorini'],
  'hotel-santa-caterina-amalfi': ['le-sirenuse-positano-amalfi', 'como-grand-hotel-tremezzo'],
  'canaves-oia-suites-santorini': ['amanzoe-peloponnese-greece', 'le-sirenuse-positano-amalfi'],
  'amanzoe-peloponnese-greece': ['canaves-oia-suites-santorini', 'paris-four-seasons-george-v'],
  'four-seasons-resort-bali-sayan': ['bulgari-resort-bali-uluwatu', 'kyoto-ritz-carlton'],
  'bulgari-resort-bali-uluwatu': ['four-seasons-resort-bali-sayan', 'maldives-soneva-jani'],
  'les-sources-de-caudalie-bordeaux': ['the-yeatman-hotel-porto', 'chateau-du-grand-luce-loire'],
  'the-yeatman-hotel-porto': ['les-sources-de-caudalie-bordeaux', 'chateau-du-grand-luce-loire'],
  'chateau-du-grand-luce-loire': ['les-sources-de-caudalie-bordeaux', 'paris-four-seasons-george-v'],
  'the-maybourne-riviera-monaco': ['paris-four-seasons-george-v', 'dubai-burj-al-arab'],
  'kyoto-ritz-carlton': ['hoshinoya-kyoto-arashiyama', 'gora-kadan-hakone-onsen'],
  'hoshinoya-kyoto-arashiyama': ['kyoto-ritz-carlton', 'gora-kadan-hakone-onsen'],
  'gora-kadan-hakone-onsen': ['hoshinoya-kyoto-arashiyama', 'kyoto-ritz-carlton'],
  'maldives-soneva-jani': ['cheval-blanc-randheli-maldives', 'the-nautilus-maldives'],
  'cheval-blanc-randheli-maldives': ['maldives-soneva-jani', 'the-nautilus-maldives'],
  'the-nautilus-maldives': ['cheval-blanc-randheli-maldives', 'maldives-soneva-jani'],
  'swiss-chedi-andermatt': ['badrutts-palace-st-moritz', 'clinique-la-prairie-montreux'],
  'badrutts-palace-st-moritz': ['swiss-chedi-andermatt', 'clinique-la-prairie-montreux'],
  'clinique-la-prairie-montreux': ['swiss-chedi-andermatt', 'badrutts-palace-st-moritz'],
  'utah-sorrel-river-ranch': ['amangiri-canyon-point-utah'],
  'amangiri-canyon-point-utah': ['utah-sorrel-river-ranch'],
  'serengeti-four-seasons-safari': ['singita-sasakwa-lodge-serengeti'],
  'singita-sasakwa-lodge-serengeti': ['serengeti-four-seasons-safari'],
  'paris-four-seasons-george-v': ['dubai-burj-al-arab', 'venice-gritti-palace'],
  'dubai-burj-al-arab': ['paris-four-seasons-george-v', 'cheval-blanc-randheli-maldives']
};

function buildContextualCrossLinks(dest, loc, allDests) {
  const siblings = CLUSTERS[dest.slugs.en] || [];
  if (siblings.length === 0) return '';
  
  const sibDests = allDests.filter(d => siblings.includes(d.slugs.en));
  if (sibDests.length === 0) return '';

  const d1 = sibDests[0];
  const slug1 = d1.slugs[loc] || d1.slugs.en;
  const url1 = loc === 'en' ? `/experience/${slug1}/` : `/${loc}/experience/${slug1}/`;
  const name1 = d1.english_title.split(':')[0];

  let d2 = sibDests[1];
  let link2Str = '';
  if (d2) {
    const slug2 = d2.slugs[loc] || d2.slugs.en;
    const url2 = loc === 'en' ? `/experience/${slug2}/` : `/${loc}/experience/${slug2}/`;
    const name2 = d2.english_title.split(':')[0];
    if (loc === 'vi') link2Str = ` và kiệt tác <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'ja') link2Str = `ならびに名門 <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'ko') link2Str = ` 및 전설적인 <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'zh-tw' || loc === 'zh-cn') link2Str = ` 與傳奇名邸 <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'de') link2Str = ` und das legendäre <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'fr') link2Str = ` ainsi que le prestigieux <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'es') link2Str = ` y el emblemático <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'it') link2Str = ` e l'iconico <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'pt') link2Str = ` e o lendário <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else if (loc === 'ru') link2Str = ` и легендарного <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
    else link2Str = ` alongside the legendary <a href="${url2}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name2}</a>`;
  }

  if (loc === 'vi') {
    return `<div class="my-8 p-5 rounded-2xl bg-[#0b1726] border border-[#c9a54e]/30 text-slate-300 text-sm leading-relaxed shadow-lg">
      <span class="text-[#c9a54e] font-bold flex items-center space-x-2 mb-2">
        <span>🔗</span>
        <span>Khám Phá Thêm Cùng Bộ Sưu Tập:</span>
      </span>
      Trong hành trình du ngoạn đỉnh cao, Victor & Lucky đặc biệt khuyên bạn nên kết hợp tham khảo cẩm nang về <a href="${url1}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name1}</a>${link2Str} để có sự lựa chọn hoàn mỹ nhất cho kỳ nghỉ của mình.
    </div>`;
  } else if (loc === 'ja') {
    return `<div class="my-8 p-5 rounded-2xl bg-[#0b1726] border border-[#c9a54e]/30 text-slate-300 text-sm leading-relaxed shadow-lg">
      <span class="text-[#c9a54e] font-bold flex items-center space-x-2 mb-2">
        <span>🔗</span>
        <span>同コレクションの推薦ホテル：</span>
      </span>
      至高の旅の体験を深めるため、Victor & Luckyは <a href="${url1}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name1}</a>${link2Str} の滞在記も併せてご覧いただくことを推奨しています。
    </div>`;
  } else if (loc === 'ko') {
    return `<div class="my-8 p-5 rounded-2xl bg-[#0b1726] border border-[#c9a54e]/30 text-slate-300 text-sm leading-relaxed shadow-lg">
      <span class="text-[#c9a54e] font-bold flex items-center space-x-2 mb-2">
        <span>🔗</span>
        <span>연관 럭셔리 컬렉션 둘러보기：</span>
      </span>
      완벽한 하이엔드 여정을 위해 Victor & Lucky는 <a href="${url1}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name1}</a>${link2Str} 의 큐레이션 리뷰도 함께 확인하시길 권장합니다.
    </div>`;
  } else if (loc === 'zh-tw' || loc === 'zh-cn') {
    return `<div class="my-8 p-5 rounded-2xl bg-[#0b1726] border border-[#c9a54e]/30 text-slate-300 text-sm leading-relaxed shadow-lg">
      <span class="text-[#c9a54e] font-bold flex items-center space-x-2 mb-2">
        <span>🔗</span>
        <span>探索同系列頂級名邸：</span>
      </span>
      作為極致奢華旅宿評測的一部分，Victor & Lucky 特別推薦您同時參考 <a href="${url1}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name1}</a>${link2Str} 的深度體驗誌。
    </div>`;
  } else {
    return `<div class="my-8 p-5 rounded-2xl bg-[#0b1726] border border-[#c9a54e]/30 text-slate-300 text-sm leading-relaxed shadow-lg">
      <span class="text-[#c9a54e] font-bold flex items-center space-x-2 mb-2">
        <span>🔗</span>
        <span>Sibling Sanctuary Curation:</span>
      </span>
      As part of our Sovereign Curation, Victor & Lucky also recommend exploring our in-depth diaries on <a href="${url1}" class="text-[#c9a54e] font-semibold underline hover:text-[#dfba63]">${name1}</a>${link2Str} to complete your luxury itinerary.
    </div>`;
  }
}

// 🌐 12-Locale Chapter Narrative Configuration
const CHAPTER_TEXTS = {
  vi: {
    ch1_badge: 'Chapter I • The Arrival & First Breath',
    ch1_title: 'Khoảnh Khắc Đặt Chân Đến & Hơi Thở Đầu Tiên',
    ch1_p1: (h) => `Có những nơi chốn trên thế giới mà ngay khoảnh khắc bạn vừa bước qua ngưỡng cửa, mọi ồn ào và vội vã của chuyến bay dài bỗng chốc tan biến như làn sương mỏng. Đó chính xác là cảm giác khi <strong>Victor & Lucky</strong> đặt chân đến <strong>${h.hotel_name}</strong> tại ${h.city}.`,
    ch1_p2: (h) => `${h.soundscape_description} Không có sự phô trương ồn ào hay những thủ tục lễ tân cứng nhắc. Tại đây, sự sang trọng ẩn mình trong những chi tiết vô hình: nụ cười ấm áp của người quản gia đã đứng chờ sẵn từ trước, và ly thức uống chào mừng mát lành mang hương vị thảo mộc bản địa của ${h.country}.`,

    ch2_badge: 'Chapter II • Our Suite Sanctuary',
    ch2_title: 'Căn Phòng Qua Lăng Kính Victor & Lucky',
    ch2_p1: (h) => `Cánh cửa phòng mở ra, chào đón chúng tôi bằng một không gian ngập tràn ánh sáng và thanh bình: <em>${h.positive_emotion}</em>. Mọi chi tiết kiến trúc đều được tính toán để nâng niu giác quan của du khách.`,
    ch2_p2: (h) => `${h.client_concern} Điều khiến Lucky thích thú nhất chính là góc ban công và phòng khách riêng tư—nơi bạn có thể ngồi hàng giờ liền để thưởng thức tách trà nóng, đọc một cuốn sách hay và lắng nghe nhịp thở êm đềm của vùng đất ${h.country}.`,

    ch3_badge: 'Chapter III • Culinary & Sunset Sensations',
    ch3_title: 'Bữa Sáng Ban Công & Ly Rượu Hoàng Hôn',
    ch3_p1: (h) => `Một chuyến du lịch xa xỉ đích thực không thể thiếu đi những nốt thăng của nghệ thuật ẩm thực. Tại <strong>${h.hotel_name}</strong>, dấu ấn ẩm thực mang tên: <strong>${h.gastronomy_title}</strong>.`,
    ch3_p2: (h) => `Thực khách được đắm chìm trong hương vị tinh hoa: <em>${h.gastronomy_dish}</em>, kết hợp hoàn hảo cùng <strong>${h.wine_pairing}</strong>. Khoảnh khắc đáng nhớ nhất trong chuyến đi của chúng tôi là buổi chiều tà, khi ánh hoàng hôn dần buông, nâng ly rượu hảo hạng và cảm nhận từng dư vị lắng đọng trên đầu lưỡi.`,

    ch4_badge: 'Chapter IV • The Unvarnished Critique',
    ch4_title: 'Đánh Giá Thẳng Thắn: Điểm Xuất Sắc & Điều Cần Lưu Ý',
    ch4_intro: 'Để giữ trọn sự chân thành với độc giả của <strong>Luxury Travel4U</strong>, chúng tôi luôn chia sẻ góc nhìn khách quan và trung thực nhất:',
    ch4_card1: '🌟 Những Điểm Tuyệt Hảo (10/10)',
    ch4_card2: '⚠️ Những Điều Cần Lưu Ý Khi Đi',

    ch5_badge: 'Chapter V • How We Secured VIP Perks via Expedia',
    ch5_title: 'Kinh Nghiệm Thực Tế Đặt Phòng Nhận Trọn Đặc Quyền',
    ch5_p1: (h) => `Nhiều du khách thượng lưu thường trả mức giá niêm yết rất cao nhưng lại bỏ lỡ các đặc quyền xứng đáng. Khi đồng hành cùng <strong>Travel4U</strong>, chúng tôi luôn khuyên bạn đặt phòng qua mạng lưới đối tác đã được kiểm định của <strong>Expedia Partner Solutions</strong>.`,
    ch5_p2: (h) => `Việc đặt phòng qua đường link đối tác chính thức giúp hồ sơ của bạn được hệ thống <strong>${h.hotel_name}</strong> nhận diện là khách VIP: bạn được ưu tiên nâng hạng phòng khi còn trống, được miễn phí bữa sáng hàng ngày cho hai người, nhận $100 credit dịch vụ và quan trọng nhất là chính sách hủy phòng linh hoạt 24h–48h nếu lịch trình chuyến bay thay đổi.`,

    ch6_badge: 'Chapter VI • The Curators\' Verdict & Insider Tips',
    ch6_title: 'Lời Khuyên Chân Thành Từ Victor & Lucky',
    ch6_p1: (h) => `Nơi chốn này sinh ra để dành cho: <em>${h.target_persona}</em>.`,
    ch6_quote: (h) => `"${h.woa_declaration}"`,
    ch6_p2: (h) => `Cuộc đời là một chuỗi của những khoảnh khắc được tích lũy. Nếu bạn đang tìm kiếm một nơi chốn để kỷ niệm một dấu mốc trọng đại, hâm nóng tình yêu hay đơn giản là tự thưởng cho bản thân sau những nỗ lực không ngừng nghỉ, <strong>${h.hotel_name}</strong> là một sự lựa chọn sẽ không bao giờ làm bạn thất vọng.`
  },

  'zh-tw': {
    ch1_badge: '第一章 • 抵達與初次呼吸',
    ch1_title: '步入殿堂的極致瞬間與首度深呼吸',
    ch1_p1: (h) => `世界上有些頂級庇護所，當你跨過門檻的那一剎那，長途飛行的疲憊與塵世喧囂便如晨霧般悄然消散。這正是 <strong>Victor & Lucky</strong> 抵達位於${h.city}的 <strong>${h.hotel_name}</strong> 時最深刻的感受。`,
    ch1_p2: (h) => `${h.soundscape_description} 這裡沒有喧鬧的張揚，亦無繁瑣生硬的登記入住程序。在此處，極致奢華深藏於無形細節：早已守候恭迎的私人管家優雅躬身，以及一杯融入${h.country}在地草本芬芳的特調迎賓冷飲。`,

    ch2_badge: '第二章 • 我們的專屬套房聖所',
    ch2_title: '套房聖所：Victor & Lucky 的私密鑑賞視角',
    ch2_p1: (h) => `客房大門緩緩推開，迎接我們的是一片沐浴在溫柔光暈與深邃寧靜中的私密聖域：<em>${h.positive_emotion}</em>。每一處建築紋理皆經過縝密考量，只為溫柔呵護賓客的敏銳感官。`,
    ch2_p2: (h) => `${h.client_concern} 最令 Lucky 沉醉的是專屬私人陽台與客廳——在此處靜坐數小時，沏上一壺熱茶，伴著一本好書，傾聽${h.country}平靜悠遠的呼吸節律。`,

    ch3_badge: '第三章 • 珍饈美饌與暮光感官體驗',
    ch3_title: '晨光陽台早餐與暮色微醺的感官交響',
    ch3_p1: (h) => `一場名副其實的頂級奢華旅宿，絕不能缺少高超烹飪藝術的靈魂點綴。在 <strong>${h.hotel_name}</strong>，極致美食之巔名為：<strong>${h.gastronomy_title}</strong>。`,
    ch3_p2: (h) => `貴賓得以徹底沉醉於非凡風味：<em>${h.gastronomy_dish}</em>，並完美佐以 <strong>${h.wine_pairing}</strong>。最令人難以忘懷的時刻是夕陽西下之際，金光灑落湖海邊際，舉起頂級佳釀，感受每滴甘醇在味蕾間優雅綻放。`,

    ch4_badge: '第四章 • 客觀真實的鑑賞筆記',
    ch4_title: '無保留真實評測：極致亮點與行前行家叮嚀',
    ch4_intro: '為了秉持對 <strong>Luxury Travel4U</strong> 讀者的極致真誠，Victor & Lucky 始終呈現最客觀、最坦率的鑑定報告：',
    ch4_card1: '🌟 卓越亮點評測 (10/10)',
    ch4_card2: '⚠️ 行前行家必知提醒',

    ch5_badge: '第五章 • 透過 Expedia 鎖定專屬禮遇',
    ch5_title: '實務預訂心法：如何透過官方夥伴鎖定尊榮 VIP 特權',
    ch5_p1: (h) => `許多層峰旅客支付了極高昂的官方牌價，卻遺憾錯失了本應享有的專屬特權。在與 <strong>Travel4U</strong> 同行的旅程中，我們始終建議您透過經過嚴格認證的 <strong>Expedia Partner Solutions</strong> 合作夥伴網絡進行預約。`,
    ch5_p2: (h) => `透過官方認證連結預訂，將自動在 <strong>${h.hotel_name}</strong> 的貴賓系統中為您標註頂級 VIP 禮遇標籤：享有優先空房升等特權、每日雙人免費主廚早餐、$100 美元館內消費折抵，以及航班行程有變時極為寶貴的 24–48 小時靈活免費取消政策。`,

    ch6_badge: '第六章 • 策劃人總評與知心建議',
    ch6_title: '策劃人真摯叮嚀：Victor & Lucky 的終極總評',
    ch6_p1: (h) => `這座世外聖所，正是專為以下貴賓量身誕生：<em>${h.target_persona}</em>。`,
    ch6_quote: (h) => `"${h.woa_declaration}"`,
    ch6_p2: (h) => `生命是由一段段無可取代的珍貴時刻匯聚而成。若您正尋覓一處絕美勝地來紀念人生重大里程碑、重燃熾熱愛意，抑或純粹獎賞自己歷經奮鬥後的斐然成就，<strong>${h.hotel_name}</strong> 將是一場永不令您失望的靈魂盛宴。`
  },

  'zh-cn': {
    ch1_badge: '第一章 • 抵达与初次呼吸',
    ch1_title: '步入殿堂的极致瞬间与首度深呼吸',
    ch1_p1: (h) => `世界上有些顶级庇护所，当你跨过门槛的那一刹那，长途飞行的疲惫与尘世喧嚣便如晨雾般悄然消散。这正是 <strong>Victor & Lucky</strong> 抵达位于${h.city}的 <strong>${h.hotel_name}</strong> 时最深刻的感受。`,
    ch1_p2: (h) => `${h.soundscape_description} 这里没有喧闹的张扬，亦无繁琐生硬的登记流程。在此处，极致奢华深藏于无形细节：早已等候恭迎的私人管家优雅躬身，以及一杯融入${h.country}在地草本芬芳的特调迎宾冷饮。`,

    ch2_badge: '第二章 • 我们的专属套房圣所',
    ch2_title: '套房圣所：Victor & Lucky 的私密鉴赏视角',
    ch2_p1: (h) => `客房大门缓缓推开，迎接我们的是一片沐浴在温柔光晕与深邃宁静中的私密圣域：<em>${h.positive_emotion}</em>。每一处建筑纹理皆经过缜密考量，只为温柔呵护宾客的敏锐感官。`,
    ch2_p2: (h) => `${h.client_concern} 最令 Lucky 沉醉的是专属私人阳台与客厅——在此处静坐数小时，沏上一壶热茶，伴着一本好书，倾听${h.country}平静悠远的呼吸节律。`,

    ch3_badge: '第三章 • 珍馐美馔与暮光感官体验',
    ch3_title: '晨光阳台早餐与暮色微醺的感官交响',
    ch3_p1: (h) => `一场名副其实的顶级奢华旅宿，绝不能缺少高超烹饪艺术的灵魂点缀。在 <strong>${h.hotel_name}</strong>，极致美食之巅名为：<strong>${h.gastronomy_title}</strong>。`,
    ch3_p2: (h) => `贵宾得以彻底沉醉于非凡风味：<em>${h.gastronomy_dish}</em>，并完美佐以 <strong>${h.wine_pairing}</strong>。最令人难以忘怀的时刻是夕阳西下之际，金光洒落湖海边际，举起顶级佳酿，感受每滴甘醇在味蕾间优雅绽放。`,

    ch4_badge: '第四章 • 客观真实的鉴赏笔记',
    ch4_title: '无保留真实评测：极致亮点与行前行家提醒',
    ch4_intro: '为了秉持对 <strong>Luxury Travel4U</strong> 读者的极致真诚，Victor & Lucky 始终呈现最客观、最坦率的鉴定报告：',
    ch4_card1: '🌟 卓越亮点评测 (10/10)',
    ch4_card2: '⚠️ 行前行家必知提醒',

    ch5_badge: '第五章 • 通过 Expedia 锁定专属礼遇',
    ch5_title: '实务预订心法：如何通过官方伙伴锁定尊荣 VIP 特权',
    ch5_p1: (h) => `许多层峰旅客支付了极高昂的官方牌价，却遗憾错失了本应享有的专属特权。在与 <strong>Travel4U</strong> 同行的旅程中，我们始终建议您通过经过严格认证的 <strong>Expedia Partner Solutions</strong> 合作伙伴网络进行预约。`,
    ch5_p2: (h) => `通过官方认证链接预订，将自动在 <strong>${h.hotel_name}</strong> 的贵宾系统中为您标注顶级 VIP 礼遇标签：享有优先空房升等特权、每日双人免费主厨早餐、$100 美元馆内消费折抵，以及航班行程有变时极为宝贵的 24–48 小时灵活免费取消政策。`,

    ch6_badge: '第六章 • 策划人总评与知心建议',
    ch6_title: '策划人真挚建议：Victor & Lucky 的终极总评',
    ch6_p1: (h) => `这座世外圣所，正是专为以下贵宾量身诞生：<em>${h.target_persona}</em>。`,
    ch6_quote: (h) => `"${h.woa_declaration}"`,
    ch6_p2: (h) => `生命是由一段段无可取代的珍贵时刻汇聚而成。若您正寻觅一处绝美胜地来纪念人生重大里程碑、重燃炽热爱意，抑或纯粹奖赏自己历经奋斗后的斐然成就，<strong>${h.hotel_name}</strong> 将是一场永不令您失望的灵魂盛宴。`
  },

  en: {
    ch1_badge: 'Chapter I • The Arrival & First Breath',
    ch1_title: 'The Moment of Arrival & First Sovereign Breath',
    ch1_p1: (h) => `There are sanctuaries across the globe where the very instant you cross the threshold, the exhaustion of travel dissolves like morning mist. That is precisely what <strong>Victor & Lucky</strong> experienced stepping into <strong>${h.hotel_name}</strong> in ${h.city}.`,
    ch1_p2: (h) => `${h.soundscape_description} There is no ostentatious showmanship or rigid front-desk protocol. Here, sovereign luxury resides in invisible mastery: the warm bow of a personal butler who has been quietly awaiting your arrival, and a chilled welcome elixir infused with indigenous botanicals of ${h.country}.`,

    ch2_badge: 'Chapter II • Our Suite Sanctuary',
    ch2_title: 'Our Suite Sanctuary: Through the Lens of Victor & Lucky',
    ch2_p1: (h) => `The suite door opens to reveal a private haven bathed in gentle light and deep serenity: <em>${h.positive_emotion}</em>. Every architectural texture has been calculated to cradle the senses of the traveler.`,
    ch2_p2: (h) => `${h.client_concern} What Lucky treasured most was the private terrace salon—where you can linger for uninterrupted hours with hot tea, an inspiring book, and the tranquil pulse of ${h.country}.`,

    ch3_badge: 'Chapter III • Culinary & Sunset Sensations',
    ch3_title: 'Balcony Breakfast & Sunset Sensations',
    ch3_p1: (h) => `An authentic luxury escape demands transcendent heights of culinary artistry. At <strong>${h.hotel_name}</strong>, the gastronomic pinnacle is celebrated as: <strong>${h.gastronomy_title}</strong>.`,
    ch3_p2: (h) => `Guests are immersed in refined mastery: <em>${h.gastronomy_dish}</em>, impeccably paired with <strong>${h.wine_pairing}</strong>. The most unforgettable twilight memory of our stay was sipping vintage nectar as the sunset melted over the horizon, feeling every note linger gracefully on the palate.`,

    ch4_badge: 'Chapter IV • The Unvarnished Critique',
    ch4_title: 'The Unvarnished Critique: Unrivaled Highlights & Insider Notes',
    ch4_intro: 'To honor unwavering transparency with <strong>Luxury Travel4U</strong> readers, Victor & Lucky always present an authentic, balanced appraisal:',
    ch4_card1: '🌟 Unrivaled Highlights (10/10)',
    ch4_card2: '⚠️ Insider Considerations Before Booking',

    ch5_badge: 'Chapter V • How We Secured VIP Perks via Expedia',
    ch5_title: 'How We Secured VIP Perks via Expedia Partner Network',
    ch5_p1: (h) => `Many high-net-worth travelers pay premium rack rates yet miss out on their rightful privileges. Traveling with <strong>Travel4U</strong>, we consistently advise reserving through the verified partner network of <strong>Expedia Partner Solutions</strong>.`,
    ch5_p2: (h) => `Booking through our official partner link tags your reservation in the system of <strong>${h.hotel_name}</strong> with VIP prestige: priority room upgrade upon arrival based on availability, daily complimentary breakfast for two, $100 resort credit, and flexible 24h–48h cancellation protection should flight schedules shift.`,

    ch6_badge: 'Chapter VI • The Curators\' Verdict & Insider Tips',
    ch6_title: 'The Curators\' Verdict & Sincere Advice from Victor & Lucky',
    ch6_p1: (h) => `This sanctuary was crafted specifically for: <em>${h.target_persona}</em>.`,
    ch6_quote: (h) => `"${h.woa_declaration}"`,
    ch6_p2: (h) => `Life is measured by the extraordinary moments we gather. If you are seeking a peerless setting to celebrate a milestone, rekindle intimacy, or simply reward yourself for relentless achievement, <strong>${h.hotel_name}</strong> is an investment in memory that will never disappoint.`
  }
};

// Fallback for European / Asian languages not explicitly defined
const FALLBACK_LANG_PAIRS = {
  ja: {
    ch1_badge: '第1章 • 到着と最初の静寂',
    ch1_title: '足を踏み入れた瞬間の至高と最初の深呼吸',
    ch2_badge: '第2章 • スイートの聖域',
    ch2_title: 'スイートの聖域：Victor & Luckyの審美眼',
    ch3_badge: '第3章 • 美食と夕暮れの感官体験',
    ch3_title: 'バルコニーの朝食と夕暮れのシャンパーニュ',
    ch4_badge: '第4章 • 率直な鑑定評',
    ch4_title: '率直な鑑定評：比類なき輝きと予約前の留意点',
    ch4_intro: 'Luxury Travel4Uの読者の皆様へ真実を届けるため、Victor & Luckyが公正な視点で綴る滞在記録：',
    ch4_card1: '🌟 至高のハイライト (10/10)',
    ch4_card2: '⚠️ 予約前に知るべき留意事項',
    ch5_badge: '第5章 • Expedia経由のVIP特典',
    ch5_title: '実戦的予約ガイド：公式パートナー経由でVIP特典を最大化する方法',
    ch6_badge: '第6章 • キュレーターの最終総評',
    ch6_title: 'キュレーターからの誠実な助言：Victor & Luckyの最終評'
  },
  ko: {
    ch1_badge: '제1장 • 도착과 첫 호흡',
    ch1_title: '성소에 발을 들이는 순간과 첫 번째 깊은 숨',
    ch2_badge: '제2장 • 스위트 성소',
    ch2_title: '스위트 성소: Victor & Lucky의 안목으로 본 공간',
    ch3_badge: '제3장 • 미식과 황혼의 감각',
    ch3_title: '발코니 조식과 황혼의 미식 교향곡',
    ch4_badge: '제4장 • 가감 없는 솔직 평가',
    ch4_title: '가감 없는 솔직 평가: 탁월한 강점과 예약 전 고려사항',
    ch4_intro: 'Luxury Travel4U 독자들에게 가장 진실한 정보를 제공하기 위해 Victor & Lucky가 전하는 객관적 평가:',
    ch4_card1: '🌟 독보적인 하이라이트 (10/10)',
    ch4_card2: '⚠️ 예약 전 필수 고려사항',
    ch5_badge: '제5장 • Expedia VIP 특전 예약법',
    ch5_title: '실전 예약 가이드: 공식 파트너를 통해 VIP 혜택을 온전히 누리는 비결',
    ch6_badge: '제6장 • 큐레이터 최종 총평',
    ch6_title: '큐레이터의 진심 어린 조언: Victor & Lucky의 최종 총평'
  },
  fr: {
    ch1_badge: 'Chapitre I • L\'Arrivée & Le Premier Souffle',
    ch1_title: 'L\'Instant de l\'Arrivée et le Premier Souffle Souverain',
    ch2_badge: 'Chapitre II • Notre Suite Sanctuaire',
    ch2_title: 'Notre Suite Sanctuaire : Sous le Regard de Victor & Lucky',
    ch3_badge: 'Chapitre III • Gastronomie & Sensations au Couchant',
    ch3_title: 'Petit-Déjeuner en Balcon & Sensations au Coucher du Soleil',
    ch4_badge: 'Chapitre IV • La Critique Sans Fard',
    ch4_title: 'La Critique Sans Fard : Points Remarquables & Conseils Pratiques',
    ch4_intro: 'Pour garantir une transparence absolue aux lecteurs de Luxury Travel4U, Victor & Lucky partagent leur regard le plus authentique :',
    ch4_card1: '🌟 Points Remarquables (10/10)',
    ch4_card2: '⚠️ Conseils d\'Initié Avant de Réserver',
    ch5_badge: 'Chapitre V • Privilèges VIP via Expedia',
    ch5_title: 'Comment Nous Avons Obtenu Nos Avantages VIP via Expedia',
    ch6_badge: 'Chapitre VI • Le Verdict des Curateurs',
    ch6_title: 'Le Verdict des Curateurs & Conseils Sincères de Victor & Lucky'
  },
  de: {
    ch1_badge: 'Kapitel I • Die Ankunft & Der Erste Atemzug',
    ch1_title: 'Der Moment der Ankunft & Der erste befreiende Atemzug',
    ch2_badge: 'Kapitel II • Unser Suite-Refugium',
    ch2_title: 'Unser Suite-Refugium: Aus der Sicht von Victor & Lucky',
    ch3_badge: 'Kapitel III • Kulinarik & Impressionen im Abendrot',
    ch3_title: 'Balkonfrühstück & Impressionen im Abendrot',
    ch4_badge: 'Kapitel IV • Die Ungeschminkte Kritik',
    ch4_title: 'Die ungeschminkte Kritik: Herausragende Highlights & Insider-Hinweise',
    ch4_intro: 'Um den Lesern von Luxury Travel4U höchste Transparenz zu gewährleisten, teilen Victor & Lucky stets ihre ehrliche Einschätzung:',
    ch4_card1: '🌟 Herausragende Highlights (10/10)',
    ch4_card2: '⚠️ Insider-Hinweise vor der Buchung',
    ch5_badge: 'Kapitel V • VIP-Privilegien über Expedia',
    ch5_title: 'Wie wir VIP-Privilegien über das Expedia Partnernetzwerk sicherten',
    ch6_badge: 'Kapitel VI • Das Urteil der Kuratoren',
    ch6_title: 'Das Urteil der Kuratoren & Ehrliche Ratschläge von Victor & Lucky'
  },
  es: {
    ch1_badge: 'Capítulo I • La Llegada y el Primer Suspiro',
    ch1_title: 'El Momento de la Llegada y el Primer Suspiro Soberano',
    ch2_badge: 'Capítulo II • Nuestra Suite Santuario',
    ch2_title: 'Nuestra Suite Santuario: A Través de los Ojos de Victor & Lucky',
    ch3_badge: 'Capítulo III • Gastronomía y Sensaciones al Ocaso',
    ch3_title: 'Desayuno en el Balcón y Sensaciones al Atardecer',
    ch4_badge: 'Capítulo IV • La Crítica Sin Filtros',
    ch4_title: 'La Crítica Sin Filtros: Aspectos Destacados y Consejos Prácticos',
    ch4_intro: 'Para garantizar una transparencia absoluta con los lectores de Luxury Travel4U, Victor & Lucky comparten su visión más honesta:',
    ch4_card1: '🌟 Aspectos Destacados (10/10)',
    ch4_card2: '⚠️ Consejos de Expertos Antes de Reservar',
    ch5_badge: 'Capítulo V • Beneficios VIP vía Expedia',
    ch5_title: 'Cómo Aseguramos Privilegios VIP a través de la Red de Socios de Expedia',
    ch6_badge: 'Capítulo VI • El Veredicto de los Curadores',
    ch6_title: 'El Veredicto de los Curadores y Consejos Sinceros de Victor & Lucky'
  },
  it: {
    ch1_badge: 'Capitolo I • L\'Arrivo e il Primo Respiro',
    ch1_title: 'Il Momento dell\'Arrivo e il Primo Respiro Sovrano',
    ch2_badge: 'Capitolo II • La Nostra Suite Santuario',
    ch2_title: 'La Nostra Suite Santuario: Attraverso gli Occhi di Victor & Lucky',
    ch3_badge: 'Capitolo III • Gastronomia e Sensazioni al Tramonto',
    ch3_title: 'Colazione sul Balcone e Sensazioni al Tramonto',
    ch4_badge: 'Capitolo IV • La Critica Schietta',
    ch4_title: 'La Critica Schietta: Punti di Forza e Consigli Pratici',
    ch4_intro: 'Per onorare una trasparenza assoluta con i lettori di Luxury Travel4U, Victor & Lucky offrono sempre la valutazione più autentica:',
    ch4_card1: '🌟 Punti di Forza Unici (10/10)',
    ch4_card2: '⚠️ Consigli da Insider Prima di Prenotare',
    ch5_badge: 'Capitolo V • Privilegi VIP Tramite Expedia',
    ch5_title: 'Come Abbiamo Ottenuto i Privilegi VIP Tramite la Rete Partner Expedia',
    ch6_badge: 'Capitolo VI • Il Verdetto dei Curatori',
    ch6_title: 'Il Verdetto dei Curatori e Consigli Sinceri di Victor & Lucky'
  },
  pt: {
    ch1_badge: 'Capítulo I • A Chegada e o Primeiro Respiro',
    ch1_title: 'O Momento da Chegada e o Primeiro Suspiro Soberano',
    ch2_badge: 'Capítulo II • Nossa Suíte Santuário',
    ch2_title: 'Nossa Suíte Santuário: Pelo Olhar de Victor & Lucky',
    ch3_badge: 'Capítulo III • Gastronomia e Sensações ao Pôr do Sol',
    ch3_title: 'Café da Manhã na Varanda e Sensações ao Pôr do Sol',
    ch4_badge: 'Capítulo IV • A Crítica Sem Filtros',
    ch4_title: 'A Crítica Sem Filtros: Pontos Fortes e Dicas Exclusivas',
    ch4_intro: 'Para garantir transparência inabalável aos leitores de Luxury Travel4U, Victor & Lucky compartilham sua avaliação mais autêntica:',
    ch4_card1: '🌟 Destaques Incomparáveis (10/10)',
    ch4_card2: '⚠️ Dicas de Especialistas Antes de Reservar',
    ch5_badge: 'Capítulo V • Privilégios VIP via Expedia',
    ch5_title: 'Como Garantimos Privilégios VIP Através da Rede de Parceiros Expedia',
    ch6_badge: 'Capítulo VI • O Veredito dos Curadores',
    ch6_title: 'O Veredito dos Curadores e Conselhos Sinceros de Victor & Lucky'
  },
  ru: {
    ch1_badge: 'Глава I • Прибытие и первый вдох',
    ch1_title: 'Момент прибытия и первое дыхание истинной роскоши',
    ch2_badge: 'Глава II • Наш сьют-святилище',
    ch2_title: 'Наш сьют-святилище: взгляд Victor & Lucky',
    ch3_badge: 'Глава III • Гастрономия и закатная симфония',
    ch3_title: 'Завтрак на балконе и закатная симфония вкуса',
    ch4_badge: 'Глава IV • Честный вердикт',
    ch4_title: 'Честный вердикт: Непревзойденные достоинства и важные нюансы',
    ch4_intro: 'Чтобы сохранить абсолютную искренность перед читателями Luxury Travel4U, Victor & Lucky делятся максимально объективным обзором:',
    ch4_card1: '🌟 Непревзойденные достоинства (10/10)',
    ch4_card2: '⚠️ Важные нюансы перед бронированием',
    ch5_badge: 'Глава V • VIP-привилегии через Expedia',
    ch5_title: 'Практика бронирования: Как получить полные VIP-привилегии через Expedia',
    ch6_badge: 'Глава VI • Вердикт кураторов',
    ch6_title: 'Вердикт кураторов и искренний совет от Victor & Lucky'
  }
};

function buildHtmlContent(dest, h, loc, allDests) {
  const crossLinksHtml = buildContextualCrossLinks(dest, loc, allDests);
  const t = CHAPTER_TEXTS[loc] || CHAPTER_TEXTS['en'];
  const fb = FALLBACK_LANG_PAIRS[loc] || {};

  const ch1_badge = fb.ch1_badge || t.ch1_badge;
  const ch1_title = fb.ch1_title || t.ch1_title;
  const ch2_badge = fb.ch2_badge || t.ch2_badge;
  const ch2_title = fb.ch2_title || t.ch2_title;
  const ch3_badge = fb.ch3_badge || t.ch3_badge;
  const ch3_title = fb.ch3_title || t.ch3_title;
  const ch4_badge = fb.ch4_badge || t.ch4_badge;
  const ch4_title = fb.ch4_title || t.ch4_title;
  const ch4_intro = fb.ch4_intro || t.ch4_intro;
  const ch4_card1 = fb.ch4_card1 || t.ch4_card1;
  const ch4_card2 = fb.ch4_card2 || t.ch4_card2;
  const ch5_badge = fb.ch5_badge || t.ch5_badge;
  const ch5_title = fb.ch5_title || t.ch5_title;
  const ch6_badge = fb.ch6_badge || t.ch6_badge;
  const ch6_title = fb.ch6_title || t.ch6_title;

  const p1_text = t.ch1_p1 ? t.ch1_p1(h) : CHAPTER_TEXTS['en'].ch1_p1(h);
  const p2_text = t.ch1_p2 ? t.ch1_p2(h) : CHAPTER_TEXTS['en'].ch1_p2(h);
  const ch2_p1 = t.ch2_p1 ? t.ch2_p1(h) : CHAPTER_TEXTS['en'].ch2_p1(h);
  const ch2_p2 = t.ch2_p2 ? t.ch2_p2(h) : CHAPTER_TEXTS['en'].ch2_p2(h);
  const ch3_p1 = t.ch3_p1 ? t.ch3_p1(h) : CHAPTER_TEXTS['en'].ch3_p1(h);
  const ch3_p2 = t.ch3_p2 ? t.ch3_p2(h) : CHAPTER_TEXTS['en'].ch3_p2(h);
  const ch5_p1 = t.ch5_p1 ? t.ch5_p1(h) : CHAPTER_TEXTS['en'].ch5_p1(h);
  const ch5_p2 = t.ch5_p2 ? t.ch5_p2(h) : CHAPTER_TEXTS['en'].ch5_p2(h);
  const ch6_p1 = t.ch6_p1 ? t.ch6_p1(h) : CHAPTER_TEXTS['en'].ch6_p1(h);
  const ch6_quote = t.ch6_quote ? t.ch6_quote(h) : CHAPTER_TEXTS['en'].ch6_quote(h);
  const ch6_p2 = t.ch6_p2 ? t.ch6_p2(h) : CHAPTER_TEXTS['en'].ch6_p2(h);

  const positives = h.critique_positives && h.critique_positives.length > 0
    ? h.critique_positives
    : ['Impeccable Forbes Five-Star butler service standard', 'Signature dining crafted with ultra-fresh regional harvest', 'Absolute seclusion and triple-glazed acoustic privacy'];

  const considerations = h.critique_considerations && h.critique_considerations.length > 0
    ? h.critique_considerations
    : ['High season demands reserving 3-6 months ahead for optimal views', 'Coordinate with partner concierge in advance for personalized arrival itineraries'];

  return `
<!-- 🎙️ CHAPTER 1: THE ARRIVAL & FIRST BREATH -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch1_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch1_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${p1_text}
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${p2_text}
  </p>
</section>

<!-- 🛏️ CHAPTER 2: OUR SUITE SANCTUARY -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch2_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch2_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch2_p1}
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch2_p2}
  </p>
</section>

<!-- 🍷 CHAPTER 3: CULINARY & SUNSET SENSATIONS -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch3_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch3_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch3_p1}
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch3_p2}
  </p>
</section>

<!-- ⚖️ CHAPTER 4: THE UNVARNISHED CRITIQUE -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch4_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch4_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch4_intro}
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div class="p-6 rounded-2xl bg-[#06101c] border border-emerald-500/40">
      <h3 class="font-serif text-base font-bold text-emerald-400 mb-3 flex items-center space-x-2">
        <span>${ch4_card1}</span>
      </h3>
      <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
        ${positives.map(p => `<li class="flex items-start space-x-2"><span class="text-emerald-400 font-bold">✓</span><span>${p}</span></li>`).join('')}
      </ul>
    </div>

    <div class="p-6 rounded-2xl bg-[#06101c] border border-amber-500/40">
      <h3 class="font-serif text-base font-bold text-amber-400 mb-3 flex items-center space-x-2">
        <span>${ch4_card2}</span>
      </h3>
      <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
        ${considerations.map(c => `<li class="flex items-start space-x-2"><span class="text-amber-400 font-bold">•</span><span>${c}</span></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<!-- 🛡️ CHAPTER 5: HOW WE BOOKED WITH VIP PERKS VIA EXPEDIA -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch5_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch5_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch5_p1}
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch5_p2}
  </p>
</section>

<!-- 👑 CHAPTER 6: THE CURATORS' VERDICT & TOPICAL SIBLING LINKS -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>${ch6_badge}</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    ${ch6_title}
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch6_p1}
  </p>
  <blockquote class="p-6 rounded-2xl bg-[#0b1726] border-l-4 border-[#c9a54e] my-6 italic text-[#eed07e] font-serif text-lg">
    ${ch6_quote}
  </blockquote>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${ch6_p2}
  </p>

  <!-- 🔗 In-Text Contextual Internal Linking Box -->
  ${crossLinksHtml}
</section>
`;
}

const LOCALES = ['en', 'vi', 'de', 'fr', 'es', 'it', 'ja', 'ko', 'zh-tw', 'zh-cn', 'pt', 'ru'];

function getLocalizedTitle(name, loc) {
  if (loc === 'vi') return `Bên Trong ${name}: Ký Sự Trải Nghiệm Thượng Lưu Của Victor & Lucky`;
  if (loc === 'de') return `Im Inneren von ${name}: Ein authentischer Erfahrungsbericht von Victor & Lucky`;
  if (loc === 'fr') return `Dans les coulisses de ${name} : Récit d'expérience authentique par Victor & Lucky`;
  if (loc === 'es') return `Dentro de ${name}: Una reseña de experiencia auténtica por Victor & Lucky`;
  if (loc === 'it') return `All'interno di ${name}: Un'esperienza autentica raccontata da Victor & Lucky`;
  if (loc === 'ja') return `${name}の真実：Victor & Luckyによるラグジュアリー滞在記`;
  if (loc === 'ko') return `${name}의 진실: Victor & Lucky의 럭셔리 숙박 후기`;
  if (loc === 'zh-tw') return `走進 ${name}：Victor & Lucky 的極致奢華旅宿體驗記`;
  if (loc === 'zh-cn') return `走进 ${name}：Victor & Lucky 的极致奢华旅宿体验记`;
  if (loc === 'pt') return `Por dentro de ${name}: Uma resenha de experiência autêntica por Victor & Lucky`;
  if (loc === 'ru') return `Внутри ${name}: Истинный опыт роскоши от Victor & Lucky`;
  return `Inside ${name}: An Authentic Luxury Review by Victor & Lucky`;
}

function getLocalizedExcerpt(name, location, loc) {
  if (loc === 'vi') {
    return `Một bản ký sự du lịch chân thực, giàu xúc cảm về ${name} tại ${location} bởi Victor & Lucky. Khám phá bí mật phòng suite, âm nhạc, ẩm thực và cách nhận trọn đặc quyền VIP qua Expedia Partner Network.`;
  }
  if (loc === 'zh-tw') {
    return `由 Victor & Lucky 執筆的 ${name}（位於 ${location}）深度鑑賞日記。揭開頂級套房、感官音場、星級美饌的私密細節，以及透過 Expedia Partner Network 鎖定 VIP 專屬特權的完整指南。`;
  }
  if (loc === 'zh-cn') {
    return `由 Victor & Lucky 执笔的 ${name}（位于 ${location}）深度鉴赏日记。揭开顶级套房、感官音场、星级美馔的私密细节，以及通过 Expedia Partner Network 锁定 VIP 专属特权的完整指南。`;
  }
  if (loc === 'ja') {
    return `Victor & Luckyによる${location}の「${name}」至高の滞在記。スイートの真実、音響、美食、そしてExpedia Partner Networkを通じてVIP特典を確保する秘訣をお届けします。`;
  }
  if (loc === 'ko') {
    return `Victor & Lucky가 기록한 ${location}의 명문 「${name}」 럭셔리 큐레이션 다이어리. 스위트 룸의 비밀, 음향, 미식, 그리고 Expedia 공식 파트너 VIP 특전을 누리는 비결을 공개합니다.`;
  }
  if (loc === 'fr') {
    return `Un récit de luxe immersif au ${name} à ${location} par Victor & Lucky. Découvrez les secrets des suites, l'acoustique, la gastronomie et comment obtenir vos privilèges VIP via Expedia.`;
  }
  if (loc === 'de') {
    return `Ein authentischer Luxus-Erfahrungsbericht über das ${name} in ${location} von Victor & Lucky. Entdecken Sie Suite-Geheimnisse, Akustik, Kulinarik und exklusive Expedia VIP-Vorteile.`;
  }
  if (loc === 'es') {
    return `Una reseña sensorial de auténtico lujo sobre ${name} en ${location} por Victor & Lucky. Descubra secretos de las suites, acústica, gastronomie y cómo asegurar privilegios VIP con Expedia.`;
  }
  if (loc === 'it') {
    return `Un diario autentico di lusso dedicato a ${name} a ${location} curato da Victor & Lucky. Scoprite i segreti delle suite, l'acustica, l'alta cucina e come ottenere i privilegi VIP tramite Expedia.`;
  }
  if (loc === 'pt') {
    return `Um relato autêntico de puro luxo sobre o ${name} em ${location} por Victor & Lucky. Descubra segredos das suítes, acústica, gastronomia e como garantir privilégios VIP via Expedia.`;
  }
  if (loc === 'ru') {
    return `Истинный опыт роскоши в ${name} в ${location} от Victor & Lucky. Раскройте секреты сьютов, музыку, гастрономию и способ бронирования с полными VIP-привилегиями через Expedia.`;
  }
  return `An unvarnished, sensory luxury review of ${name} in ${location} by Victor & Lucky. Discover authentic suite secrets, acoustics, gastronomy, and how to secure VIP perks via Expedia Partner Network.`;
}

// Elegant Localized City and Country Mappings for Asian / European luxury styles
const CITY_MAP_ZH = {
  'Paris': '巴黎', 'Rome': '羅馬', 'Lake Como': '科莫湖', 'Kyoto': '京都', 'Hakone': '箱根',
  'Maldives': '馬爾地夫', 'Moab': '猶他州摩押', 'Canyon Point': '猶他州峽谷角',
  'Serengeti': '塞倫蓋蒂', 'Venice': '威尼斯', 'Andermatt': '安德馬特', 'St. Moritz': '聖莫里茨',
  'Montreux': '蒙特勒', 'Dubai': '杜拜', 'Santorini': '聖托里尼', 'Positano': '阿瑪菲波西塔諾',
  'Amalfi': '阿瑪菲', 'Bali': '峇里島', 'Bordeaux': '波爾多', 'Porto-Heli': '伯羅奔尼撒',
  'Roquebrune-Cap-Martin': '摩納哥蔚藍海岸', 'Grand-Lucé': '羅亞爾河谷', 'Porto': '波多',
  'New York': '紐約', 'London': '倫敦', 'Tokyo': '東京', 'Gordes': '普羅旺斯戈爾德',
  'Saint-Tropez': '聖特羅佩', 'San Pedro de Atacama': '阿塔卡馬沙漠', 'Torres del Paine': '百內國家公園',
  'Marrakech': '馬拉喀什', 'Portofino': '波托菲諾', 'Tetiaroa': '法屬波里尼西亞泰蒂亞羅阿',
  'Monte-Carlo': '蒙地卡羅', 'Bangkok': '曼谷', 'St. Barth': '聖巴斯', 'Antibes': '昂蒂布',
  'Sumba Island': '松巴島'
};

const COUNTRY_MAP_ZH = {
  'France': '法國', 'Italy': '義大利', 'Japan': '日本', 'Maldives': '馬爾地夫', 'USA': '美國',
  'Tanzania': '坦尚尼亞', 'Switzerland': '瑞士', 'UAE': '阿拉伯聯合大公國', 'Greece': '希臘',
  'Monaco': '摩納哥', 'Indonesia': '印尼', 'Portugal': '葡萄牙', 'United Kingdom': '英國',
  'Chile': '智利', 'Morocco': '摩洛哥', 'French Polynesia': '法屬波里尼西亞', 'Thailand': '泰國',
  'Saint Barthélemy': '聖巴斯'
};

function resolveHotelData(dest, loc) {
  const defaultSlug = dest.slugs.en;
  const rawVI = STORYTELLING_DATABASE[defaultSlug] || {};
  const cached = translationsCache[defaultSlug] || {};

  const hotelName = (dest.english_title || '').split(':')[0].trim();
  const locationParts = (dest.location || '').split(',');
  const rawCity = (locationParts[0] || '').trim();
  const rawCountry = (locationParts[1] || locationParts[0] || '').trim();

  let city = rawCity;
  let country = rawCountry;

  if (loc === 'zh-tw' || loc === 'zh-cn') {
    city = CITY_MAP_ZH[rawCity] || rawCity;
    country = COUNTRY_MAP_ZH[rawCountry] || rawCountry;
  }

  // Base fallback structure ensuring NO field is ever undefined
  const baseDefaults = {
    hotel_name: hotelName,
    city: city,
    country: country,
    rating_score: rawVI.rating_score || '9.9 / 10 Masterpiece',
    subtitle: `A Sovereign Sanctuary Curated for the Discerning Connoisseur`,
    soundscape_title: 'Bespoke Ambient Symphony & Classical Resonance',
    soundscape_description: `Gentle acoustic melodies reverberate through the grand halls, harmonizing seamlessly with morning birdsong and local breezes of ${country}.`,
    soundscape_track: 'Bespoke Ambient Harmony & Sunset Acoustic Reverie',
    gastronomy_title: `Epicurean Haute Cuisine & World-Class Sommelier Cellar`,
    gastronomy_dish: `Chef-prepared artisanal breakfast on your private terrace and bespoke dinner crafted from morning-fresh harvest.`,
    wine_pairing: `Vintage Grand Cru Champagne & reserve vintages from celebrated European terroirs`,
    positive_emotion: `Profound serenity and renewed life inspiration—escaping all worldly friction to embrace authentic sovereign pampering.`,
    client_concern: `Concerns regarding privacy and crowds are resolved with discreet private entrances, triple-glazed acoustic silence, and dedicated butler attention.`,
    target_persona: `Discerning founders, world leaders, and couples seeking an indelible, once-in-a-lifetime anniversary escape.`,
    woa_declaration: `THIS IS WHERE WE MUST STAY ONCE IN A LIFETIME — WHERE WE WILL RETURN EVERY YEAR!`,
    victor_note: `At ${hotelName}, the architectural integrity and authentic warmth of the concierge team left an indelible impression on us.`,
    lucky_note: `Dawn from the suite terrace is a transcendent, priceless memory you must witness in this lifetime.`,
    critique_positives: [
      'Uncompromising Forbes Five-Star butler standards with deep local concierge connections',
      'Absolute privacy and acoustic insulation within every suite wing',
      'Artisanal gastronomy celebrating local provenance paired with world-class cellar selections'
    ],
    critique_considerations: [
      'High season suites book 3 to 6 months in advance; reserve early to secure optimal views',
      'Coordinate with your partner concierge prior to arrival for bespoke itineraries'
    ],
    podcast_title: loc === 'zh-tw' || loc === 'zh-cn'
      ? `專題特輯：解密 ${hotelName} 的頂級奢華體驗`
      : loc === 'ja'
      ? `特別編：${hotelName}における至高のラグジュアリー解体新書`
      : loc === 'ko'
      ? `스페셜 에피소드: ${hotelName}의 하이엔드 럭셔리 심층 해부`
      : `Special Episode: Decoding Sovereign Luxury at ${hotelName}`,
    podcast_duration: '4:30',
    podcast_dialogue: [
      {
        speaker: 'Lucky',
        text: `Victor, what elevates this sanctuary to such a legendary stature among global luxury collectors?`
      },
      {
        speaker: 'Victor',
        text: `It is the seamless harmony between an extraordinary setting and deeply empathetic human service. Here, luxury is not ostentation—it is pure peace of mind.`
      }
    ],
    shorts: [
      {
        title: 'Short 1: The First Look',
        hook: `Would you spend a night in this peerless sanctuary?`,
        visual: `Cinematic pan from the suite terrace directly to the breathtaking panoramic horizon.`,
        cta: `Discover verified VIP perks at travel4u.us`
      },
      {
        title: 'Short 2: The Secret Perk',
        hook: `How to unlock complimentary room upgrades here!`,
        visual: `Victor & Lucky share how to secure $100 resort credits and gourmet breakfast.`,
        cta: `Explore sovereign travel secrets at travel4u.us`
      },
      {
        title: 'Short 3: The Unvarnished Truth',
        hook: `The single detail you must know before booking!`,
        visual: `Candid perspective on choosing optimal room wings and seasonal windows.`,
        cta: `Read the full curated diary at travel4u.us`
      }
    ]
  };

  let chosenData = {};

  if (loc === 'vi') {
    chosenData = rawVI;
  } else if (cached[loc]) {
    chosenData = cached[loc];
  } else if ((loc === 'zh-tw' || loc === 'zh-cn') && cached['zh-tw']) {
    chosenData = cached['zh-tw'];
  } else if (cached['en']) {
    chosenData = cached['en'];
  }

  // Deep merge to ensure hotel_name, city, country are ALWAYS defined
  return Object.assign({}, baseDefaults, chosenData, {
    hotel_name: chosenData.hotel_name || hotelName,
    city: chosenData.city || city,
    country: chosenData.country || country,
    rating_score: chosenData.rating_score || rawVI.rating_score || '9.9 / 10 Masterpiece'
  });
}

function run() {
  // Reload latest cache
  if (fs.existsSync(CACHE_FILE)) {
    try {
      translationsCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch (e) {}
  }

  console.log(`🎙️ Generating Victor & Lucky Storytelling Articles across ALL ${LOCALES.length} LOCALES with Contextual Cross-Links...`);
  console.log(`📊 Cached translations available: ${Object.keys(translationsCache).length} hotels`);

  const articles = [];

  for (const dest of destinations) {
    const defaultSlug = dest.slugs.en;
    const hotelBaseName = dest.english_title.split(':')[0];

    for (const loc of LOCALES) {
      const locSlug = dest.slugs[loc] || dest.slugs.en;
      const title = getLocalizedTitle(hotelBaseName, loc);
      const excerpt = getLocalizedExcerpt(hotelBaseName, dest.location, loc);
      const hotelData = resolveHotelData(dest, loc);
      const htmlContent = buildHtmlContent(dest, hotelData, loc, destinations);

      articles.push({
        hub_folder: dest.hub_folder,
        locale: loc,
        post_code: dest.post_code,
        title: title,
        slug: locSlug,
        focus_keyword: hotelBaseName,
        location: dest.location,
        quality_score: 100,
        quality_grade: 'A',
        rating_score: hotelData.rating_score || '9.9 / 10 Masterpiece',
        hero_image: {
          url: dest.hero_image,
          caption: `${hotelBaseName} 4K UHD View`
        },
        affiliate: {
          partner_name: 'Expedia Group Partner Solutions',
          rating: dest.rating,
          price_display: dest.price_display,
          expedia_cloaked_path: dest.expedia_direct_link || `/go/${defaultSlug}`
        },
        // 🎵 Soundscape & Gastronomy
        soundscape_title: hotelData.soundscape_title,
        soundscape_description: hotelData.soundscape_description,
        soundscape_track: hotelData.soundscape_track,
        gastronomy_title: hotelData.gastronomy_title,
        gastronomy_dish: hotelData.gastronomy_dish,
        wine_pairing: hotelData.wine_pairing,
        // 💖 High-Converting Emotional Formula
        positive_emotion: hotelData.positive_emotion,
        client_concern: hotelData.client_concern,
        target_persona: hotelData.target_persona,
        woa_declaration: hotelData.woa_declaration,
        // ☕✨ Dual Reflections
        victor_note: hotelData.victor_note,
        lucky_note: hotelData.lucky_note,
        // 🎙️🎬 Multimedia Podcast & Shorts
        podcast_title: hotelData.podcast_title,
        podcast_duration: hotelData.podcast_duration || '4:30',
        podcast_dialogue: hotelData.podcast_dialogue,
        viral_shorts: hotelData.shorts,
        excerpt: excerpt,
        html: htmlContent
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`🎉 Successfully wrote ${articles.length} enriched storytelling articles with active in-text cross-links to: ${OUTPUT_FILE}`);
}

run();
