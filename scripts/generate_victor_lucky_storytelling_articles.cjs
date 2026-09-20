/**
 * 🎙️ VICTOR & LUCKY LUXURY STORYTELLING ARTICLE GENERATOR (EMOTIONAL CONVERSION & SENSORY HOOKS)
 * Domain: travel4u.us
 * Generates authentic, sensory, non-duplicated 6-chapter narrative reviews across all 12 locales
 * Integrates:
 *   1. Soundscape & Acoustic Luxury (Âm nhạc)
 *   2. Sensory Gastronomy & Wine Provenance (Ẩm thực)
 *   3. 1 Positive Emotion Resolved (1 Cảm xúc tích cực)
 *   4. 1 Core Client Concern Addressed (1 Điều khách hàng quan tâm)
 *   5. 1 Target Persona (1 Đối tượng hài lòng tuyệt đối)
 *   6. The "WOA" Revelation & Immediate Booking Trigger
 *   7. Contextual In-Text Cross-Links (Liên kết nội bộ chéo chuẩn SEO & GEO)
 *   8. YouTube Podcast Dialogue & 3 Viral Shorts Concepts
 */

const fs = require('fs');
const path = require('path');
const { STORYTELLING_DATABASE } = require('./storytelling_database_50_hotels.cjs');

const OUTPUT_FILE = path.resolve(__dirname, '../src/data/articles.json');
const DESTINATIONS_FILE = path.resolve(__dirname, '../src/data/destinations.json');

const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));

// Semantic clusters for natural in-text cross-linking
const CLUSTERS = {

  // Dubai Architectural Wonder Cluster
  'the-lana-hotel-dubai': ['dubai-burj-al-arab', 'aman-tokyo-otemachi'],

  // Moroccan Royalty Cluster
  'royal-mansour-marrakech': ['paris-four-seasons-george-v', 'the-savoy-london-thames'],

  // Italian Riviera & Portofino Cluster
  'splendido-belmond-portofino': ['hotel-santa-caterina-amalfi', 'le-sirenuse-positano-amalfi'],

  // French Polynesia Atoll Cluster
  'the-brando-tetiaroa': ['soneva-jani-maldives', 'cheval-blanc-randheli-maldives'],

  // Monaco Royal Belle Époque Cluster
  'hotel-de-paris-monte-carlo': ['the-maybourne-riviera-monaco', 'hotel-du-cap-eden-roc-antibes'],

  // Historic Asian Heritage Cluster
  'mandarin-oriental-bangkok': ['four-seasons-resort-bali-sayan', 'kyoto-ritz-carlton'],

  // Caribbean Glamour Cluster
  'cheval-blanc-st-barth': ['cheval-blanc-st-tropez-riviera', 'cheval-blanc-randheli-maldives'],

  // French Riviera Clifftop Icon Cluster
  'hotel-du-cap-eden-roc-antibes': ['hotel-de-paris-monte-carlo', 'cheval-blanc-st-tropez-riviera'],

  // Untamed Indonesian Wilderness Cluster
  'nihi-sumba-indonesia': ['bulgari-resort-bali-uluwatu', 'singita-sasakwa-lodge-serengeti'],

  // Indian Ocean Master Coral Cluster
  'one-and-only-reethi-rah-maldives': ['soneva-jani-maldives', 'the-nautilus-maldives'],


  // New York Luxury Icon Cluster
  'the-mark-hotel-new-york': ['aman-new-york-manhattan', 'paris-four-seasons-george-v'],
  'aman-new-york-manhattan': ['the-mark-hotel-new-york', 'aman-tokyo-otemachi'],

  // London Royalty & Heritage Cluster
  'the-savoy-london-thames': ['claridges-london-mayfair', 'venice-gritti-palace'],
  'claridges-london-mayfair': ['the-savoy-london-thames', 'paris-four-seasons-george-v'],

  // Tokyo Zen Sky & Ryokan Cluster
  'aman-tokyo-otemachi': ['hoshinoya-tokyo-onsen', 'kyoto-ritz-carlton'],
  'hoshinoya-tokyo-onsen': ['aman-tokyo-otemachi', 'hoshinoya-kyoto-arashiyama'],

  // Provence & French Riviera Cluster
  'airelles-gordes-la-bastide-provence': ['cheval-blanc-st-tropez-riviera', 'les-sources-de-caudalie-bordeaux'],
  'cheval-blanc-st-tropez-riviera': ['airelles-gordes-la-bastide-provence', 'the-maybourne-riviera-monaco'],

  // South American Wilderness Cluster
  'nayara-alto-atacama-desert-lodge': ['tierra-patagonia-hotel-spa', 'amangiri-canyon-point-utah'],
  'tierra-patagonia-hotel-spa': ['nayara-alto-atacama-desert-lodge', 'singita-sasakwa-lodge-serengeti'],

  // Lake Como & Italy Cluster
  'passalacqua-lake-como': ['villa-deste-lake-como', 'como-grand-hotel-tremezzo'],
  'villa-deste-lake-como': ['passalacqua-lake-como', 'como-grand-hotel-tremezzo'],
  'como-grand-hotel-tremezzo': ['passalacqua-lake-como', 'villa-deste-lake-como'],
  'venice-gritti-palace': ['rome-rocco-forte-de-russie', 'passalacqua-lake-como'],
  'rome-rocco-forte-de-russie': ['venice-gritti-palace', 'villa-deste-lake-como'],

  // Amalfi Coast Palazzo Cluster
  'le-sirenuse-positano-amalfi': ['hotel-santa-caterina-amalfi', 'canaves-oia-suites-santorini'],
  'hotel-santa-caterina-amalfi': ['le-sirenuse-positano-amalfi', 'como-grand-hotel-tremezzo'],

  // Santorini & Aegean Sanctuary Cluster
  'canaves-oia-suites-santorini': ['amanzoe-peloponnese-greece', 'le-sirenuse-positano-amalfi'],
  'amanzoe-peloponnese-greece': ['canaves-oia-suites-santorini', 'paris-four-seasons-george-v'],

  // Bali Sacred Sanctuary Cluster
  'four-seasons-resort-bali-sayan': ['bulgari-resort-bali-uluwatu', 'kyoto-ritz-carlton'],
  'bulgari-resort-bali-uluwatu': ['four-seasons-resort-bali-sayan', 'maldives-soneva-jani'],

  // Bordeaux & European Wine Estate Cluster
  'les-sources-de-caudalie-bordeaux': ['the-yeatman-hotel-porto', 'chateau-du-grand-luce-loire'],
  'the-yeatman-hotel-porto': ['les-sources-de-caudalie-bordeaux', 'chateau-du-grand-luce-loire'],
  'chateau-du-grand-luce-loire': ['les-sources-de-caudalie-bordeaux', 'paris-four-seasons-george-v'],

  // French Riviera & Monaco Clifftop Cluster
  'the-maybourne-riviera-monaco': ['paris-four-seasons-george-v', 'dubai-burj-al-arab'],

  // Japan Cluster
  'kyoto-ritz-carlton': ['hoshinoya-kyoto-arashiyama', 'gora-kadan-hakone-onsen'],
  'hoshinoya-kyoto-arashiyama': ['kyoto-ritz-carlton', 'gora-kadan-hakone-onsen'],
  'gora-kadan-hakone-onsen': ['hoshinoya-kyoto-arashiyama', 'kyoto-ritz-carlton'],

  // Maldives Cluster
  'maldives-soneva-jani': ['cheval-blanc-randheli-maldives', 'the-nautilus-maldives'],
  'cheval-blanc-randheli-maldives': ['maldives-soneva-jani', 'the-nautilus-maldives'],
  'the-nautilus-maldives': ['cheval-blanc-randheli-maldives', 'maldives-soneva-jani'],

  // Swiss Alps & Longevity Cluster
  'swiss-chedi-andermatt': ['badrutts-palace-st-moritz', 'clinique-la-prairie-montreux'],
  'badrutts-palace-st-moritz': ['swiss-chedi-andermatt', 'clinique-la-prairie-montreux'],
  'clinique-la-prairie-montreux': ['swiss-chedi-andermatt', 'badrutts-palace-st-moritz'],

  // US Wilderness & Desert Cluster
  'utah-sorrel-river-ranch': ['amangiri-canyon-point-utah'],
  'amangiri-canyon-point-utah': ['utah-sorrel-river-ranch'],

  // African Safari Cluster
  'serengeti-four-seasons-safari': ['singita-sasakwa-lodge-serengeti'],
  'singita-sasakwa-lodge-serengeti': ['serengeti-four-seasons-safari'],

  // Palaces & Global Icons
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

function getFallbackData(dest) {
  const name = dest.english_title.split(':')[0];
  const loc = dest.location;
  return {
    hotel_name: name,
    city: loc.split(',')[0],
    country: loc.split(',')[1] || '',
    rating_score: '9.8 / 10',
    subtitle: 'A Sovereign Sanctuary Curated for the Discerning Connoisseur',
    soundscape_title: 'Bản Hòa Âm Cổ Điển & Thanh Âm Của Sự Tĩnh Lặng',
    soundscape_description: 'Tiếng đàn dương cầm êm ái hòa cùng thanh âm thiên nhiên nguyên bản của vùng đất ' + loc + '.',
    soundscape_track: 'Bespoke Ambient Harmony & Acoustic Sunset Melody',
    gastronomy_title: 'Nghệ Thuật Ẩm Thực Tinh Tuyển & Hương Vị Địa Phương',
    gastronomy_dish: 'Những món ăn chế tác từ nông sản tươi ngon nhất buổi sớm cùng tài nghệ của các bậc thầy đầu bếp.',
    wine_pairing: 'Rượu vang thượng hạng được tuyển chọn từ các hầm rượu danh tiếng thế giới',
    positive_emotion: 'Cảm giác giải phóng hoàn toàn áp lực để tâm hồn thăng hoa và tràn đầy cảm hứng sống mới.',
    client_concern: 'Sự riêng tư tuyệt đối và dịch vụ quản gia cá nhân hóa đến từng chi tiết nhỏ nhất được bảo đảm 100%.',
    target_persona: 'Những người thành đạt tìm kiếm một chốn dừng chân hoàn hảo để tái tạo năng lượng đỉnh cao.',
    woa_declaration: `ĐÂY CHÍNH LÀ NƠI MÌNH PHẢI ĐẾN TRONG ĐỜI — NƠI ${name.toUpperCase()} SẼ KHẮC SÂU KÝ ỨC CỦA CHÚNG TA!`,
    victor_note: `Tại ${name}, vẻ đẹp kiến trúc di sản và sự tận tâm chân thành của đội ngũ phục vụ khiến chúng tôi vô cùng xúc động.`,
    lucky_note: `Góc nhìn từ ban công phòng lúc hoàng hôn là khoảnh khắc vô giá mà bạn nhất định phải trải nghiệm một lần trong đời.`,
    critique_positives: [
      'Chuẩn mực phục vụ Forbes Five-Star và mạng lưới Concierge am hiểu tường tận địa phương',
      'Sự biệt lập và cách âm tuyệt đối trong từng căn phòng suite',
      'Ẩm thực tôn vinh nguồn gốc bản địa kết hợp với hầm rượu vang chuẩn mực'
    ],
    critique_considerations: [
      'Mùa cao điểm thường kín phòng trước 2 đến 3 tháng; nên lên kế hoạch đặt sớm',
      'Luôn tận dụng quyền lợi đặt phòng qua đối tác chính thức để được ưu tiên nâng hạng'
    ],
    podcast_title: `Tập Đặc Biệt: Giải Mã Trải Nghiệm Thượng Lưu Tại ${name}`,
    podcast_duration: '4:30',
    podcast_dialogue: [
      { speaker: 'Lucky', text: `Anh Victor, điều gì làm ${name} trở nên đặc biệt đến mức chúng ta phải đưa vào bộ sưu tập Gold List này?` },
      { speaker: 'Victor', text: `Đó là sự hòa quyện giữa vị trí độc tôn và văn hóa phục vụ từ tâm, Lucky à. Nơi đây không chỉ là một chốn nghỉ chân, mà là một tác phẩm nghệ thuật sống.` }
    ],
    shorts: [
      { title: 'Short 1: First Look', hook: `Điều gì ẩn giấu bên trong ${name}?`, visual: 'Khung cảnh tráng lệ của sảnh và ban công suite.', cta: 'Xem tại travel4u.us' },
      { title: 'Short 2: The VIP Perk', hook: 'Cách nhận nâng hạng phòng miễn phí tại đây!', visual: 'Hướng dẫn nhận credit $100 và ăn sáng free.', cta: 'Khám phá tại travel4u.us' },
      { title: 'Short 3: The Honest Truth', hook: 'Review chân thực nhất bạn từng xem!', visual: 'Góc nhìn khách quan từ Victor & Lucky.', cta: 'Đọc cẩm nang tại travel4u.us' }
    ]
  };
}

function buildHtmlContent(dest, h, loc, allDests) {
  const crossLinksHtml = buildContextualCrossLinks(dest, loc, allDests);

  return `
<!-- 🎙️ CHAPTER 1: THE ARRIVAL & FIRST BREATH -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter I</span>
    <span>•</span>
    <span>The Arrival & First Breath</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Khoảnh Khắc Đặt Chân Đến & Hơi Thở Đầu Tiên
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Có những nơi chốn trên thế giới mà ngay khoảnh khắc bạn vừa bước qua ngưỡng cửa, mọi ồn ào và vội vã của chuyến bay dài bỗng chốc tan biến như làn sương mỏng. Đó chính xác là cảm giác khi <strong>Victor & Lucky</strong> đặt chân đến <strong>${h.hotel_name}</strong> tại ${h.city}.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${h.soundscape_description} Không có sự phô trương ồn ào hay những thủ tục lễ tân cứng nhắc. Tại đây, sự sang trọng ẩn mình trong những chi tiết vô hình: nụ cười ấm áp của người quản gia đã đứng chờ sẵn từ trước, và ly thức uống chào mừng mát lành mang hương vị thảo mộc bản địa của ${h.country}.
  </p>
</section>

<!-- 🛏️ CHAPTER 2: OUR SUITE SANCTUARY -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter II</span>
    <span>•</span>
    <span>Our Suite Sanctuary</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Căn Phòng Qua Lăng Kính Victor & Lucky
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Cánh cửa phòng mở ra, chào đón chúng tôi bằng một không gian ngập tràn ánh sáng và thanh bình: <em>${h.positive_emotion}</em>. Mọi chi tiết kiến trúc đều được tính toán để nâng niu giác quan của du khách.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    ${h.client_concern} Điều khiến Lucky thích thú nhất chính là góc ban công và phòng khách riêng tư—nơi bạn có thể ngồi hàng giờ liền để thưởng thức tách trà nóng, đọc một cuốn sách hay và lắng nghe nhịp thở êm đềm của vùng đất ${h.country}.
  </p>
</section>

<!-- 🍷 CHAPTER 3: CULINARY & SUNSET SENSATIONS -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter III</span>
    <span>•</span>
    <span>Culinary & Sunset Sensations</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Bữa Sáng Ban Công & Ly Rượu Hoàng Hôn
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Một chuyến du lịch xa xỉ đích thực không thể thiếu đi những nốt thăng của nghệ thuật ẩm thực. Tại <strong>${h.hotel_name}</strong>, dấu ấn ẩm thực mang tên: <strong>${h.gastronomy_title}</strong>.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Thực khách được đắm chìm trong hương vị tinh hoa: <em>${h.gastronomy_dish}</em>, kết hợp hoàn hảo cùng <strong>${h.wine_pairing}</strong>. Khoảnh khắc đáng nhớ nhất trong chuyến đi của chúng tôi là buổi chiều tà, khi ánh hoàng hôn dần buông, nâng ly rượu hảo hạng và cảm nhận từng dư vị lắng đọng trên đầu lưỡi.
  </p>
</section>

<!-- ⚖️ CHAPTER 4: THE UNVARNISHED CRITIQUE -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter IV</span>
    <span>•</span>
    <span>The Unvarnished Critique</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Đánh Giá Thẳng Thắn: Điểm Xuất Sắc & Điều Cần Lưu Ý
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Để giữ trọn sự chân thành với độc giả của <strong>Luxury Travel4U</strong>, chúng tôi luôn chia sẻ góc nhìn khách quan và trung thực nhất:
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div class="p-6 rounded-2xl bg-[#06101c] border border-emerald-500/40">
      <h3 class="font-serif text-base font-bold text-emerald-400 mb-3 flex items-center space-x-2">
        <span>🌟</span>
        <span>Những Điểm Tuyệt Hảo (10/10)</span>
      </h3>
      <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
        ${(h.critique_positives || ['Dịch vụ quản gia chuyên biệt đạt chuẩn xa xỉ thế giới', 'Ẩm thực thượng hạng chuẩn bị từ nguồn nguyên liệu tươi bản địa', 'Độ bảo mật và riêng tư cao nhất cho du khách VIP']).map(p => `<li class="flex items-start space-x-2"><span class="text-emerald-400 font-bold">✓</span><span>${p}</span></li>`).join('')}
      </ul>
    </div>

    <div class="p-6 rounded-2xl bg-[#06101c] border border-amber-500/40">
      <h3 class="font-serif text-base font-bold text-amber-400 mb-3 flex items-center space-x-2">
        <span>⚠️</span>
        <span>Những Điều Cần Lưu Ý Khi Đi</span>
      </h3>
      <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
        ${(h.critique_considerations || ['Nên đặt phòng sớm ít nhất 3-6 tháng vào mùa cao điểm để giữ được phòng có tầm nhìn đẹp nhất', 'Liên hệ trước với Concierge qua hệ thống đối tác để tùy chỉnh lịch trình riêng']).map(c => `<li class="flex items-start space-x-2"><span class="text-amber-400 font-bold">•</span><span>${c}</span></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<!-- 🛡️ CHAPTER 5: HOW WE BOOKED WITH VIP PERKS VIA EXPEDIA -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter V</span>
    <span>•</span>
    <span>How We Secured VIP Perks via Expedia</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Kinh Nghiệm Thực Tế Đặt Phòng Nhận Trọn Đặc Quyền
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Nhiều du khách thượng lưu thường trả mức giá niêm yết rất cao nhưng lại bỏ lỡ các đặc quyền xứng đáng. Khi đồng hành cùng <strong>Travel4U</strong>, chúng tôi luôn khuyên bạn đặt phòng qua mạng lưới đối tác đã được kiểm định của <strong>Expedia Partner Solutions</strong>.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Việc đặt phòng qua đường link đối tác chính thức giúp hồ sơ của bạn được hệ thống <strong>${h.hotel_name}</strong> nhận diện là khách VIP: bạn được ưu tiên nâng hạng phòng khi còn trống, được miễn phí bữa sáng hàng ngày cho hai người, nhận $100 credit dịch vụ và quan trọng nhất là chính sách hủy phòng linh hoạt 24h–48h nếu lịch trình chuyến bay thay đổi.
  </p>
</section>

<!-- 👑 CHAPTER 6: THE CURATORS' VERDICT & TOPICAL SIBLING LINKS -->
<section class="story-chapter mb-12">
  <div class="flex items-center space-x-2 text-xs font-bold text-[#c9a54e] uppercase tracking-widest mb-2">
    <span>Chapter VI</span>
    <span>•</span>
    <span>The Curators' Verdict & Insider Tips</span>
  </div>
  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
    Lời Khuyên Chân Thành Từ Victor & Lucky
  </h2>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Nơi chốn này sinh ra để dành cho: <em>${h.target_persona}</em>.
  </p>
  <blockquote class="p-6 rounded-2xl bg-[#0b1726] border-l-4 border-[#c9a54e] my-6 italic text-[#eed07e] font-serif text-lg">
    "${h.woa_declaration}"
  </blockquote>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Cuộc đời là một chuỗi của những khoảnh khắc được tích lũy. Nếu bạn đang tìm kiếm một nơi chốn để kỷ niệm một dấu mốc trọng đại, hâm nóng tình yêu hay đơn giản là tự thưởng cho bản thân sau những nỗ lực không ngừng nghỉ, <strong>${h.hotel_name}</strong> là một sự lựa chọn sẽ không bao giờ làm bạn thất vọng.
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

function run() {
  console.log(`🎙️ Generating Victor & Lucky Storytelling Articles across ALL ${LOCALES.length} LOCALES with Contextual Cross-Links...`);
  
  const articles = [];

  for (const dest of destinations) {
    const defaultSlug = dest.slugs.en;
    const data = STORYTELLING_DATABASE[defaultSlug] || getFallbackData(dest);
    const hotelBaseName = dest.english_title.split(':')[0];

    for (const loc of LOCALES) {
      const locSlug = dest.slugs[loc] || dest.slugs.en;
      const title = getLocalizedTitle(hotelBaseName, loc);
      const htmlContent = buildHtmlContent(dest, data, loc, destinations);
      const excerpt = loc === 'vi'
        ? `Một bản ký sự du lịch chân thực, giàu xúc cảm về ${hotelBaseName} tại ${dest.location} bởi Victor & Lucky. Khám phá bí mật phòng suite, âm nhạc, ẩm thực và cách nhận trọn đặc quyền VIP qua Expedia Partner Network.`
        : `An unvarnished, sensory luxury review of ${hotelBaseName} in ${dest.location} by Victor & Lucky. Discover authentic suite secrets, acoustics, gastronomy, and how to secure VIP perks via Expedia Partner Network.`;

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
        rating_score: data.rating_score,
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
        // 🎵 Âm nhạc & Ẩm thực
        soundscape_title: data.soundscape_title,
        soundscape_description: data.soundscape_description,
        soundscape_track: data.soundscape_track,
        gastronomy_title: data.gastronomy_title,
        gastronomy_dish: data.gastronomy_dish,
        wine_pairing: data.wine_pairing,
        // 💖 Công thức cảm xúc chuyển đổi cao (WOA Trigger)
        positive_emotion: data.positive_emotion,
        client_concern: data.client_concern,
        target_persona: data.target_persona,
        woa_declaration: data.woa_declaration,
        // ☕✨ Ghi chú riêng
        victor_note: data.victor_note,
        lucky_note: data.lucky_note,
        // 🎙️🎬 Kịch bản Podcast & Shorts
        podcast_title: data.podcast_title,
        podcast_duration: data.podcast_duration,
        podcast_dialogue: data.podcast_dialogue,
        viral_shorts: data.shorts,
        excerpt: excerpt,
        html: htmlContent
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`🎉 Successfully wrote ${articles.length} enriched storytelling articles with active in-text cross-links to: ${OUTPUT_FILE}`);
}

run();
