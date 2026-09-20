/**
 * 👑 TRAVEL4U VICTOR & LUCKY — AUTONOMOUS BATCH 5 PRODUCTION ENGINE (50 SANCTUARIES)
 * Expands luxury portfolio from 40 to 50 Flagship Sovereign Sanctuaries:
 *   #41: The Lana, Dorchester Collection Dubai (Canal-Side Foster+Partners Architectural Masterpiece)
 *   #42: Royal Mansour Marrakech (The King's Private Medina Palace & 3-Story Riads)
 *   #43: Splendido, A Belmond Hotel, Portofino (16th-Century Monastery & Cinematic Italian Riviera)
 *   #44: The Brando, Tetiaroa, French Polynesia (Marlon Brando's Private Eco-Luxury Atoll)
 *   #45: Hôtel de Paris Monte-Carlo (Legendary Belle Époque Palace & 3-Star Michelin Le Louis XV)
 *   #46: Mandarin Oriental Bangkok (148-Year Historic Authors' Wing & Chao Phraya River)
 *   #47: Cheval Blanc St-Barth (LVMH Art de Recevoir on Flamands Beach)
 *   #48: Hôtel du Cap-Eden-Roc Antibes (Iconic Clifftop Seawater Pool & French Riviera Glamour)
 *   #49: Nihi Sumba Indonesia (The Edge of Wildness & Nihi Oka Spa Safari)
 *   #50: One&Only Reethi Rah Maldives (12 Pristine Coral Beaches & Grand Sunset Villa)
 * 
 * Authors: Chairman Victor Chuyen & AI CEO Lucky
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');
const { execSync } = require('child_process');

const ROOT_APP = path.resolve(__dirname, '..');
const MEDIA_DIR = path.join(ROOT_APP, 'public/media/expedia_hotels');
const BACKUP_DIR = path.resolve(ROOT_APP, '../credentials/travel4you/data/media/expedia_hotels');
const MANIFEST_FILE = path.join(ROOT_APP, 'src/data/media_manifest_1000_hotels.json');
const DESTINATIONS_FILE = path.join(ROOT_APP, 'src/data/destinations.json');

[MEDIA_DIR, BACKUP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function calculateMD5(buffer) {
  const hashSum = crypto.createHash('md5');
  hashSum.update(buffer);
  return hashSum.digest('hex');
}

const BATCH_5_CONFIGS = [
  {
    key: 'dubai_the_lana',
    slug: 'the-lana-hotel-dubai',
    name: 'The Lana, Dorchester Collection Dubai',
    city: 'Business Bay Canal, Dubai, UAE',
    lat: 25.1887,
    lon: 55.2818,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_028-the-lana-dubai-01.jpg',
    target_hero: 'expedia_dubai_the_lana_hero_4k.jpg',
    lodging_id: '10049281',
    region: 'Middle East',
    rating: '5.0/5 (1,450+ Verified Reviews)',
    price_display: 'From $1,400 / night (Canal View Suite & Angelo Musa Patisserie)',
    title: 'The Lana Dubai: Dorchester Collection Canal-Side Foster+Partners Masterpiece 2026',
    story: {
      hotel_name: 'The Lana, Dorchester Collection Dubai',
      city: 'Dubai',
      country: 'United Arab Emirates',
      rating_score: '9.9 / 10',
      subtitle: 'Foster + Partners Interconnected Slabs & Parisian Haute Pâtisserie on Marasi Bay',
      soundscape_title: 'Symphonie du Canal & Lounge Crépusculaire',
      soundscape_description: 'Tiếng nước khẽ vỗ vào mạn thuyền buồm riêng trên kênh Marasi Bay hòa cùng tiếng dương cầm thanh lịch tại The Gallery và làn gió sa mạc ấm áp chiều hoàng hôn.',
      soundscape_track: 'Satie: Gymnopédie No.1 & Modern Dubai Twilight Chillout',
      gastronomy_title: 'Đỉnh Cao Bánh Ngọt Thế Giới Angelo Musa & Ẩm Thực Tây Ban Nha Martín Berasategui',
      gastronomy_dish: 'Bánh 100% Vani danh bất hư truyền của bậc thầy Angelo Musa và đĩa tapas cá tuyết húng quế thượng hạng tại Jara by Martín Berasategui.',
      wine_pairing: 'Champagne Ruinart Blanc de Blancs & Bộ sưu tập Mocktail chà là hoàng gia Ả Rập',
      positive_emotion: 'Sự kiêu hãnh và thanh lịch tuyệt đối (Sculptural Splendor)—cảm giác chiêm ngưỡng một công trình kiến trúc điêu khắc giữa lòng Dubai hiện đại.',
      client_concern: 'Nỗi lo về sự xô bồ và náo nhiệt của Dubai được giải quyết triệt để bởi không gian kênh nước Marasi Bay yên bình, cách trung tâm Burj Khalifa chỉ 5 phút bằng xe Rolls-Royce riêng.',
      target_persona: 'Các nhà thiết kế kiến trúc, giới tinh hoa kinh doanh và những cặp đôi sành điệu tìm kiếm chuẩn mực xa xỉ Anh quốc đương đại.',
      woa_declaration: 'ĐÂY LÀ ĐỈNH CAO XA XỈ ĐƯƠNG ĐẠI TẠI DUBAI — NƠI NGHỆ THUẬT KIẾN TRÚC FOSTER + PARTNERS CHẠM TỚI SỰ HOÀN MỸ!',
      victor_note: 'The Lana là kiệt tác đầu tiên của Dorchester Collection tại Trung Đông. Tòa tháp với những khối nhà xếp lớp của Foster + Partners và nội thất do Gilles & Boissier thiết kế mở ra tầm nhìn ngoạn mục hướng ra đường chân trời Burj Khalifa. Thưởng thức bữa trà chiều cùng quán quân làm bánh thế giới Angelo Musa tại đây là một đặc ân ẩm thực đích thực.',
      lucky_note: 'Bể bơi vô cực trên tầng thượng tầng 30 là điểm ngắm hoàng hôn Dubai kỳ vĩ nhất. Hãy chọn phòng Marina Suite để có bồn tắm cẩm thạch đặt ngay sát cửa kính kịch trần nhìn thẳng xuống du thuyền trên kênh Marasi Bay. Khi đặt qua đối tác Expedia, bạn sẽ nhận được xe đưa đón sân bay VIP và tín dụng ẩm thực $100.',
      critique_positives: [
        'Kiến trúc khối điêu khắc đột phá của Norman Foster với trần cao kịch trần và ban công rộng mở',
        'Bộ đôi nhà hàng danh giá của bếp trưởng 12 sao Michelin Martín Berasategui và bậc thầy Angelo Musa',
        'Bể bơi vô cực trên tầng thượng tầng 30 nhìn trọn vẹn tháp Burj Khalifa lộng lẫy'
      ],
      critique_considerations: [
        'Khu vực Marasi Bay đang hoàn thiện một số bến du thuyền lân cận; hãy yêu cầu các tầng cao từ tầng 18 trở lên để có tầm nhìn thoáng đãng nhất',
        'Hồ bơi tầng thượng chỉ dành riêng cho khách lưu trú vào ban ngày; khách ngoài cần đặt bàn trước cho quầy bar High Society vào buổi tối'
      ],
      podcast_title: 'Tập 41: The Lana Dubai — Kiệt Tác Kiến Trúc Điêu Khắc Mới Của Giới Siêu Giàu',
      podcast_duration: '4:40',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, bước vào sảnh The Lana, em cảm nhận ngay phong cách quý tộc London hòa quyện hoàn hảo với ánh sáng rực rỡ của vịnh Marasi Bay. Kiến trúc ở đây thật sự quá ấn tượng!' },
        { speaker: 'Victor', text: 'Đó là bởi vì Foster + Partners đã mất nhiều năm để tính toán từng đường cắt ánh sáng em à. Và những chiếc bánh vani của Angelo Musa... không nơi nào tại Dubai có thể sánh bằng.' },
        { speaker: 'Lucky', text: 'Và khoảnh khắc ngâm mình trong bồn tắm cẩm thạch ngắm tháp Burj Khalifa lên đèn lúc hoàng hôn... thật sự là cảm xúc khiến bất kỳ ai cũng phải thốt lên WOA!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy nhắc quý độc giả đặt phòng qua link đối tác chính thức của Expedia để được miễn phí bữa sáng gourmet và ưu tiên chọn phòng tầng cao.' }
      ],
      shorts: [
        { title: 'Short 1: Dubai’s Newest Architectural Marvel', hook: 'Khách sạn điêu khắc đắt giá nhất Dubai vừa ra mắt có gì đặc biệt?', visual: 'Flycam lướt qua những khối kiến trúc xếp lớp ngoạn mục của The Lana soi bóng xuống kênh Marasi Bay.', cta: 'Xem cẩm nang The Lana tại travel4u.us' },
        { title: 'Short 2: The World Champion Vanilla Cake', hook: 'Chiếc bánh vani nghìn lớp của nhà vô địch làm bánh thế giới Angelo Musa tại Dubai!', visual: 'Angelo Musa cắt nhẹ lớp vỏ bánh giòn tan bộc lộ lớp kem vani Madagascar sánh mịn.', cta: 'Khám phá ẩm thực The Lana tại travel4u.us' },
        { title: 'Short 3: Rooftop Infinity Pool Burj Views', hook: 'Hồ bơi vô cực tầng 30 ngắm trọn tháp Burj Khalifa đẹp nghẹt thở!', visual: 'Mặt nước hồ bơi phẳng lặng phản chiếu ánh hoàng hôn dát vàng lên các tòa tháp chọc trời.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'marrakech_royal_mansour',
    slug: 'royal-mansour-marrakech',
    name: 'Royal Mansour Marrakech',
    city: 'Medina, Marrakech, Morocco',
    lat: 31.6247,
    lon: -7.9994,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_020-royal-mansour-marrakech-01.jpg',
    target_hero: 'expedia_marrakech_royal_mansour_hero_4k.jpg',
    lodging_id: '3782910',
    region: 'Africa',
    rating: '5.0/5 (2,890+ Verified Reviews)',
    price_display: 'From $2,100 / night (Private 3-Story Riad & Rooftop Plunge Pool)',
    title: 'Royal Mansour Marrakech: The King\'s Private Medina Palace & 3-Story Riads Guide 2026',
    story: {
      hotel_name: 'Royal Mansour Marrakech',
      city: 'Marrakech',
      country: 'Morocco',
      rating_score: '10.0 / 10',
      subtitle: 'The Royal Sovereign Palace of King Mohammed VI & Hidden Underground Tunnels',
      soundscape_title: 'Murmure des Fontaines & Oiseaux de l’Oliveraie',
      soundscape_description: 'Tiếng nước róc rách từ đài phun nước khảm gốm Zellige hòa cùng tiếng chim hót trong vườn cam trĩu quả và tiếng chuông reo ngân nga từ ngọn tháp Koutoubia cổ kính.',
      soundscape_track: 'Andalusian Oud & Marrakech Palace Ambient Water',
      gastronomy_title: 'Ẩm Thực Hoàng Gia Ma-rốc & Bếp Trưởng 3 Sao Michelin Hélène Darroze',
      gastronomy_dish: 'Món cừu hầm Tagine mật ong hạt óc chó truyền thống và đĩa bánh Pastilla bồ câu phủ bột đường quế nướng giòn rụm do Hélène Darroze tinh chế.',
      wine_pairing: 'Trà bạc hà tươi pha ấm bạc hoàng gia & Rượu vang đỏ vùng Atlas Domaine Val d’Argan',
      positive_emotion: 'Cảm giác của bậc đế vương ngàn lẻ một đêm (Imperial Splendor)—sự tôn kính và bảo mật tuyệt đối trong một cung điện tráng lệ không có phòng thường, chỉ có dinh thự riêng.',
      client_concern: 'Nỗi lo về sự thiếu riêng tư được triệt tiêu 100% nhờ hệ thống đường hầm bí mật dưới lòng đất, nơi quản gia và nhân viên phục vụ di chuyển vô hình mà không bao giờ làm phiền khách.',
      target_persona: 'Các gia tộc hoàng gia, nguyên thủ quốc gia, và những du khách thượng lưu đòi hỏi chuẩn mực riêng tư và thủ công mỹ nghệ đỉnh cao nhất thế giới.',
      woa_declaration: 'ĐÂY LÀ KHÁCH SẠN HOÀNG CUNG XA HOA BẬC NHẤT THẾ GIỚI — MỘT KIỆT TÁC NGHÌN LẺ MỘT ĐÊM SỐNG ĐỘNG!',
      victor_note: 'Được đích thân Quốc vương Mohammed VI ủy thác cho 1.200 nghệ nhân tài hoa nhất Ma-rốc chế tác trong suốt 5 năm, Royal Mansour không phải là khách sạn, mà là một hoàng thành thu nhỏ. Từng viên gạch Zellige, từng tấm rèm ren lụa và cánh cửa gỗ tuyết tùng chạm khắc tay đều toát lên vẻ vương giả không một resort nào có thể sao chép.',
      lucky_note: 'Ở Royal Mansour, bạn không thuê phòng khách sạn—bạn sở hữu một dinh thự Riad 3 tầng riêng biệt với sân vườn trong, lò sưởi ấm cúng và hồ bơi ngắm sao trên sân thượng. Spa Royal Mansour với thiết kế lồng ren trắng muốt như mây là nơi trải nghiệm tắm hơi Hammam truyền thống đỉnh cao nhất châu Phi.',
      critique_positives: [
        'Mỗi du khách sở hữu một căn Riad 3 tầng độc lập với quản gia phục vụ riêng 24/7',
        'Mạng lưới đường hầm dưới lòng đất đảm bảo sự riêng tư tuyệt đối cho du khách',
        'Spa Royal Mansour bằng ren trắng tinh xảo được bình chọn là Spa đẹp nhất hành tinh'
      ],
      critique_considerations: [
        'Do kiến trúc Riad 3 tầng có cầu thang bộ và thang máy riêng, hãy yêu cầu Riad có bố trí phù hợp nếu đi cùng người lớn tuổi',
        'Dịch vụ tắm hơi truyền thống Hammam Hoàng gia cần đặt trước 48 giờ do nhu cầu cao'
      ],
      podcast_title: 'Tập 42: Royal Mansour Marrakech — Khám Phá Cung Điện Bí Mật Của Vua Ma-rốc',
      podcast_duration: '4:55',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, bước qua cánh cổng đồng khổng lồ của Royal Mansour, em ngỡ như mình vừa bước vào câu chuyện Nghìn Lẻ Một Đêm. Mọi chi tiết gạch và gỗ tuyết tùng đều được chạm trổ bằng tay!' },
        { speaker: 'Victor', text: 'Đúng vậy Lucky. Đây là cung điện do đích thân Quốc vương xây dựng. Điều kỳ diệu nhất là em sẽ không bao giờ thấy bóng dáng xe đẩy hành lý hay nhân viên dọn phòng ở lối đi chính, bởi họ di chuyển qua mạng lưới hầm ngầm bí mật.' },
        { speaker: 'Lucky', text: 'Và căn Riad 3 tầng có hồ bơi riêng trên sân thượng nhìn ra tháp Koutoubia... Cảm giác nhâm nhi ly trà bạc hà ngắm hoàng hôn đỏ rực buông xuống Marrakech thật sự vô giá.' },
        { speaker: 'Victor', text: 'Chính xác. Độc giả hãy đặt phòng sớm qua link đối tác Expedia để được ưu tiên nâng cấp hạng Riad và tặng kèm dịch vụ đón tiếp VIP tại sân bay Marrakech.' }
      ],
      shorts: [
        { title: 'Short 1: Inside the King of Morocco\'s Secret Hotel', hook: 'Khách sạn hoàng cung của Vua Ma-rốc nơi không có phòng thường, chỉ có dinh thự 3 tầng!', visual: 'Cánh cổng đồng khổng lồ mở ra khu vườn cung điện lộng lẫy ngập tràn đài phun nước róc rách.', cta: 'Xem cẩm nang Royal Mansour tại travel4u.us' },
        { title: 'Short 2: The Secret Underground Tunnels', hook: 'Bí mật hệ thống đường hầm ngầm giúp nhân viên phục vụ vô hình tại Marrakech!', visual: 'Mô phỏng lối đi ngầm bí mật bên dưới những dinh thự Riad cổ kính.', cta: 'Khám phá bí mật Royal Mansour tại travel4u.us' },
        { title: 'Short 3: The Most Beautiful White Lace Spa', hook: 'Khu Spa ren trắng đẹp nhất hành tinh nơi đưa nghệ thuật tắm Hammam lên tầm thượng lưu!', visual: 'Không gian vòm ren trắng muốt tinh khiết của Royal Mansour Spa phản chiếu dưới làn nước trong vắt.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'portofino_splendido_belmond',
    slug: 'splendido-belmond-portofino',
    name: 'Splendido, A Belmond Hotel, Portofino',
    city: 'Portofino, Liguria, Italy',
    lat: 44.3039,
    lon: 9.2089,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_039-splendido-belmond-portofino-01.jpg',
    target_hero: 'expedia_portofino_splendido_belmond_hero_4k.jpg',
    lodging_id: '16482',
    region: 'Europe',
    rating: '4.9/5 (2,410+ Verified Reviews)',
    price_display: 'From $2,300 / night (Cinematic Portofino Bay & 16th-Century Monastery)',
    title: 'Splendido Belmond Portofino: 16th-Century Monastery & Cinematic Italian Riviera Guide 2026',
    story: {
      hotel_name: 'Splendido, A Belmond Hotel, Portofino',
      city: 'Portofino',
      country: 'Italy',
      rating_score: '9.9 / 10',
      subtitle: 'Where Elizabeth Taylor Fell in Love Overlooking the World’s Most Glamorous Harbor',
      soundscape_title: 'Chant des Cigales & Vagues de Ligurie',
      soundscape_description: 'Tiếng ve ngân vang giữa vườn ô liu và hoa giấy tím rực rỡ hòa cùng tiếng chuông nhà thờ San Giorgio và tiếng động cơ du thuyền lướt nhẹ trên vịnh Portofino.',
      soundscape_track: 'Italian Dolce Vita Mandolin & Riviera Sunset Accordion',
      gastronomy_title: 'Ẩm Thực Hải Sản Vùng Liguria & Nhà Hàng Huyền Thoại La Terrazza',
      gastronomy_dish: 'Mì Trofie tươi sốt Pesto húng quế chuẩn chỉ Genoa do Bếp trưởng Corrado Corti giã cối đá, tôm hùm vịnh Santa Margherita và bánh focaccia nóng giòn.',
      wine_pairing: 'Rượu vang trắng khoáng sản Cinque Terre DOC & Ly cocktail Bellini đào tươi ngọt lịm',
      positive_emotion: 'Cảm giác La Dolce Vita kinh điển (Cinematic Romance)—sự say đắm trong mối tình lãng mạn bất tận của điện ảnh Ý thập niên 60.',
      client_concern: 'Nỗi lo về sự đông đúc của bến cảng Portofino vào mùa hè được xua tan hoàn toàn bởi vị trí ngự trị trên đỉnh đồi yên bình, có lối đi bộ lát đá hoa râm mát dẫn thẳng xuống bến du thuyền.',
      target_persona: 'Các ngôi sao điện ảnh, những người yêu nghệ thuật cổ điển Ý và những cặp đôi tìm kiếm kỳ nghỉ trăng mật đẹp nhất Địa Trung Hải.',
      woa_declaration: 'ĐÂY LÀ ĐỈNH CAO CỦA PHONG CÁCH LA DOLCE VITA Ý — CHÚNG TA SẼ TRỞ LẠI ĐÂY TRONG MỌI MÙA HÈ!',
      victor_note: 'Từng là một tu viện dòng Biển Đức từ thế kỷ 16, Splendido sở hữu tầm nhìn bao quát toàn bộ vịnh Portofino hình bán nguyệt. Ngồi trên sân hiên nhà hàng La Terrazza, ngắm nhìn những chiếc du thuyền lấp lánh dưới ánh chiều tà và thưởng thức đĩa mì sốt pesto thơm lừng là khoảnh khắc bạn nhận ra tại sao Elizabeth Taylor và Richard Burton đã chọn nơi này làm tổ ấm tình yêu.',
      lucky_note: 'Bể bơi nước biển mặn ngoài trời được làm ấm quanh năm, nép mình bên vách đá hoa giấy là điểm thư giãn đắt giá nhất. Khách sạn có một chiếc thuyền buồm gỗ mahogany truyền thống để đưa khách đi dã ngoại riêng tư dọc bờ biển San Fruttuoso. Hãy đặt phòng hướng biển qua đối tác Expedia để được ưu tiên giữ bàn ăn hoàng hôn đẹp nhất.',
      critique_positives: [
        'Vị trí độc tôn trên sườn đồi ngắm trọn vẹn vịnh Portofino và biển Liguria',
        'Di sản lịch sử tu viện thế kỷ 16 với khu vườn bậc thang ngập tràn hoa giấy và cây ô liu cổ thụ',
        'Dịch vụ đưa đón bằng thuyền gỗ riêng biệt và xe điện golf đưa đón khách xuống bến cảng'
      ],
      critique_considerations: [
        'Khách sạn mở cửa theo mùa từ tháng 4 đến tháng 10 hàng năm; các tháng 6, 7, 8 cần đặt trước ít nhất 5 tháng',
        'Các phòng không ban công có diện tích vừa phải theo chuẩn kiến trúc tu viện cổ; nên nâng cấp lên hạng Junior Suite Sea View'
      ],
      podcast_title: 'Tập 43: Splendido Portofino — Khách Sạn Huyền Thoại Tình Yêu Của Elizabeth Taylor',
      podcast_duration: '4:35',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, ngồi trên ban công Splendido ngắm nhìn vịnh Portofino với những ngôi nhà sơn màu pastel rực rỡ... em cảm giác như mình đang sống trong một bộ phim tình cảm kinh điển của Ý!' },
        { speaker: 'Victor', text: 'Đó là phép màu của Belmond em à. Họ giữ nguyên linh hồn của tu viện cổ thế kỷ 16 nhưng mang lại dịch vụ hoàn hảo. Đĩa mì Trofie sốt pesto ở đây là tiêu chuẩn vàng của cả vùng Liguria.' },
        { speaker: 'Lucky', text: 'Và chuyến du ngoạn trên chiếc thuyền gỗ riêng ngắm tu viện San Fruttuoso lúc hoàng hôn... Một trải nghiệm lãng mạn tột cùng!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy khuyên độc giả đặt phòng qua link đối tác Expedia để nhận bữa sáng kiểu Ý miễn phí và vé trải nghiệm du thuyền riêng.' }
      ],
      shorts: [
        { title: 'Short 1: Where Hollywood Legends Fell in Love', hook: 'Khách sạn đỉnh đồi nơi Elizabeth Taylor và Richard Burton đính hôn có gì đẹp?', visual: 'Khung cảnh sân hiên hoa giấy nhìn xuống vịnh biển Portofino đẹp như tranh vẽ.', cta: 'Xem cẩm nang Splendido tại travel4u.us' },
        { title: 'Short 2: The World\'s Best Pesto Pasta View', hook: 'Đĩa mì pesto ngon nhất nước Ý thưởng thức trên đỉnh đồi Portofino!', visual: 'Đầu bếp trộn mì Trofie sốt pesto xanh mướt trước khung cảnh biển cả bao la.', cta: 'Khám phá ẩm thực Splendido tại travel4u.us' },
        { title: 'Short 3: Heated Clifftop Seawater Pool', hook: 'Hồ bơi nước biển sưởi ấm cheo leo trên vách đá ngắm trọn du thuyền Portofino!', visual: 'Làn nước trong xanh của hồ bơi hòa vào chân trời Địa Trung Hải.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'french_polynesia_the_brando',
    slug: 'the-brando-tetiaroa',
    name: 'The Brando Tetiaroa',
    city: 'Tetiaroa Atoll, French Polynesia',
    lat: -17.0064,
    lon: -149.5606,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_018-the-brando-tetiaroa-01.jpg',
    target_hero: 'expedia_french_polynesia_the_brando_hero_4k.jpg',
    lodging_id: '8392019',
    region: 'Pacific Islands',
    rating: '5.0/5 (1,280+ Verified Reviews)',
    price_display: 'From $3,800 / night (Private Atoll Beachfront Villa & Deep Ocean Spa)',
    title: 'The Brando Tetiaroa: Marlon Brando\'s Private Eco-Luxury Atoll Sanctuary Guide 2026',
    story: {
      hotel_name: 'The Brando Tetiaroa',
      city: 'Tetiaroa',
      country: 'French Polynesia',
      rating_score: '10.0 / 10',
      subtitle: 'Marlon Brando’s 100% Carbon-Neutral Private Island Atoll & Sacred Tahitian Kings Sanctuary',
      soundscape_title: 'Souffle du Lagon & Chant Polynésien',
      soundscape_description: 'Tiếng sóng vỗ vào rạn san hô ngoài khơi xa hòa cùng tiếng gió xào xạc qua tán dừa nhiệt đới và giai điệu đàn ukulele mộc mạc của các nghệ nhân Tahiti.',
      soundscape_track: 'Polynesian Traditional Ukulele & South Pacific Ocean Swell',
      gastronomy_title: 'Ẩm Thực Pháp - Polynesia & Bếp Trưởng Danh Giá Jean-Sébastien Gidouin',
      gastronomy_dish: 'Món gỏi cá ngừ sống Poisson Cru ướp nước cốt dừa tươi mới vắt, tôm hùm đầm phá nướng lá chuối và kem vani Tahiti thượng hạng.',
      wine_pairing: 'Champagne Billecart-Salmon Brut Rosé & Rượu vang trắng Vin de Tahiti trồng trên san hô',
      positive_emotion: 'Sự thuần khiết nguyên sơ (Pure Eden)—cảm giác trút bỏ hoàn toàn thế giới văn minh để sống giữa một thiên đường biển đảo không một dấu chân người ngoài.',
      client_concern: 'Nỗi sợ về sự cách trở và dấu chân carbon được xóa tan hoàn toàn: The Brando là khu nghỉ dưỡng 100% tự chủ năng lượng nhờ hệ thống pin mặt trời, dầu dừa sinh học và điều hòa bằng nước biển sâu 900m (SWAC).',
      target_persona: 'Các tỷ phú công nghệ, nhà bảo tồn môi trường, cựu tổng thống (nơi cựu Tổng thống Obama viết hồi ký) và các cặp đôi tìm kiếm sự biệt lập tuyệt đối.',
      woa_declaration: 'ĐÂY LÀ HÒN ĐẢO NGHỈ DƯỠNG XANH ĐẸP NHẤT HÀNH TINH — NƠI THIÊN ĐƯỜNG TRẦN GIAN LÀ CÓ THẬT!',
      victor_note: 'Tetiaroa từng là nơi nghỉ hè độc quyền của các vị vua Tahiti cổ đại trước khi trở thành hòn đảo riêng của huyền thoại điện ảnh Marlon Brando. Chỉ có thể tiếp cận bằng máy bay riêng 20 phút từ Tahiti, 35 biệt thự ven biển ẩn mình hoàn hảo dưới những rặng dừa xanh ngút ngàn, mở thẳng ra đầm phá ngọc lam trong suốt như gương.',
      lucky_note: 'Mỗi biệt thự đều có hồ bơi vô cực riêng và một con đường cát nhỏ dẫn thẳng ra bãi biển san hô vắng lặng. Đừng bỏ lỡ tour chèo thuyền kayak ra Đảo Chim (Bird Island) cùng các nhà sinh vật học của Trạm Nghiên cứu Khoa học Tetiaroa. Khi đặt qua đối tác Expedia, toàn bộ các bữa ăn gourmet và liệu trình spa hàng ngày đều được bao trọn trong gói lưu trú.',
      critique_positives: [
        'Khu nghỉ dưỡng sang trọng không carbon đầu tiên trên thế giới với công nghệ làm mát bằng nước biển sâu',
        'Mỗi biệt thự sở hữu dải bãi biển cát trắng riêng tư hoàn toàn không nhìn thấy biệt thự lân cận',
        'Khu Varua Te Ora Polynesian Spa tọa lạc trên đầm nước ngọt thanh tịnh như chốn bồng lai'
      ],
      critique_considerations: [
        'Chỉ có 35 biệt thự duy nhất trên toàn bộ đảo san hô; cần đặt trước từ 6 đến 9 tháng cho các kỳ nghỉ lễ',
        'Bắt buộc sử dụng dịch vụ bay Air Tetiaroa riêng của khu nghỉ dưỡng từ sân bay Papeete (Tahiti)'
      ],
      podcast_title: 'Tập 44: The Brando Tetiaroa — Thiên Đường Riêng Tư Của Marlon Brando & Tổng Thống',
      podcast_duration: '4:50',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, bước xuống từ chiếc phi cơ nhỏ trên đường băng Tetiaroa, màu nước biển đầm phá xanh ngọc bích ở đây đẹp đến mức mắt thường khó tin đó là thật!' },
        { speaker: 'Victor', text: 'Đó là lý do Marlon Brando đã mua trọn hòn đảo này khi quay phim Bounty em à. Ông muốn giữ gìn nó nguyên sơ cho muôn đời sau. Không có một cọng rác, không khí thải carbon, năng lượng hoàn toàn từ mặt trời.' },
        { speaker: 'Lucky', text: 'Và bơi cùng những chú rùa biển thân thiện ngay trước bậc thềm biệt thự... Thật sự không có từ ngữ nào tả hết được sự bình yên ở The Brando!' },
        { speaker: 'Victor', text: 'Chính xác. Độc giả hãy đặt gói All-Inclusive qua link Expedia đối tác để được hưởng trọn vẹn các chuyến thám hiểm sinh thái và vé máy bay riêng khứ hồi.' }
      ],
      shorts: [
        { title: 'Short 1: Marlon Brando\'s Secret Private Atoll', hook: 'Hòn đảo riêng của huyền thoại Marlon Brando nơi cựu Tổng thống Obama từng viết hồi ký!', visual: 'Góc máy từ trên cao bay qua đầm phá san hô ngọc lam hình tròn tuyệt mỹ của Tetiaroa.', cta: 'Xem cẩm nang The Brando tại travel4u.us' },
        { title: 'Short 2: 100% Carbon-Neutral Luxury Island', hook: 'Khu nghỉ dưỡng xa xỉ tự làm mát bằng nước biển sâu 900 mét không tốn điện năng!', visual: 'Biệt thự mái lá cọ nép mình dưới rặng dừa xanh soi bóng xuống bãi cát trắng mịn màng.', cta: 'Khám phá công nghệ The Brando tại travel4u.us' },
        { title: 'Short 3: Swim with Turtles in Turquoise Lagoon', hook: 'Thức dậy và bơi cùng rùa biển hoang dã ngay trước sân biệt thự!', visual: 'Du khách bơi lặn nhẹ nhàng bên chú rùa biển trong làn nước trong vắt nhìn thấu đáy san hô.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'monaco_hotel_de_paris',
    slug: 'hotel-de-paris-monte-carlo',
    name: 'Hôtel de Paris Monte-Carlo',
    city: 'Place du Casino, Monte-Carlo, Monaco',
    lat: 43.7391,
    lon: 7.4278,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_030-h-tel-de-paris-monte-carlo-01.jpg',
    target_hero: 'expedia_monaco_hotel_de_paris_hero_4k.jpg',
    lodging_id: '15291',
    region: 'Europe',
    rating: '4.9/5 (3,120+ Verified Reviews)',
    price_display: 'From $1,900 / night (Casino Square View & 3-Star Michelin Le Louis XV)',
    title: 'Hôtel de Paris Monte-Carlo: Legendary Belle Époque Palace & Alain Ducasse Guide 2026',
    story: {
      hotel_name: 'Hôtel de Paris Monte-Carlo',
      city: 'Monte-Carlo',
      country: 'Monaco',
      rating_score: '9.9 / 10',
      subtitle: 'The Epicenter of Monegasque Royalty, Grand Prix Balconies & 3-Star Michelin Le Louis XV',
      soundscape_title: 'Symphonie de Marbre & Moteurs de Légende',
      soundscape_description: 'Tiếng ly pha lê chạm nhau rộn rã tại quầy bar Le Bar Américain hòa cùng tiếng dương cầm Jazz cổ điển và tiếng rền vang phấn khích của những siêu xe lăn bánh qua Quảng trường Casino.',
      soundscape_track: 'Monte-Carlo Belle Époque Waltz & American Bar Smooth Jazz',
      gastronomy_title: 'Đỉnh Cao 3 Sao Michelin Le Louis XV Của Huyền Thoại Alain Ducasse',
      gastronomy_dish: 'Món cá chẽm Địa Trung Hải nấu kèm củ hồi giòn và tinh dầu cam chanh Menton, đĩa rau củ vườn Riviera sốt nấm truýp đen của Alain Ducasse.',
      wine_pairing: 'Champagne Dom Pérignon P2 & Rượu vang từ Hầm rượu ngầm 350.000 chai lớn nhất thế giới',
      positive_emotion: 'Cảm giác quyền lực vương giả tột đỉnh (Monaco Royal Sovereign)—được hòa mình vào trung tâm của giới quý tộc, siêu xe và sòng bài tráng lệ nhất châu Âu.',
      client_concern: 'Nỗi lo về sự ồn ào của Quảng trường Casino được triệt tiêu bằng hệ thống cửa sổ kính cách âm công nghệ cao; khách có thể tận hưởng sự tĩnh lặng tuyệt đối ngay giữa tâm điểm Monaco.',
      target_persona: 'Các tỷ phú thế giới, giới hâm mộ giải đua Công thức 1 (F1 Grand Prix), và những du khách thượng lưu say mê lối sống vương giả Monaco.',
      woa_declaration: 'ĐÂY LÀ BIỂU TƯỢNG VĨNH CỬU CỦA ĐẾ CHẾ XA HOA CHÂU ÂU — NƠI MỌI GIẤC MƠ QUÝ TỘC ĐỀU TRỞ THÀNH SỰ THỰC!',
      victor_note: 'Mở cửa từ năm 1864 theo tầm nhìn của Hoàng tử Charles III, Hôtel de Paris ngự trị tại vị trí đắc địa nhất hành tinh: ngay trên Quảng trường Place du Casino. Tượng ngựa đồng của Vua Louis XIV ở sảnh khách sạn với chiếc móng chân sáng bóng vì du khách tin rằng chạm vào sẽ mang lại may mắn. Bữa tối tại Le Louis XV của Alain Ducasse là chuẩn mực tối thượng của ẩm thực Pháp.',
      lucky_note: 'Bí mật đỉnh cao: Suite Hoàng tử Rainier III trên tầng thượng có hồ bơi vô cực riêng nhìn thẳng ra khúc cua huyền thoại của chặng đua F1 Grand Prix và bến cảng Hercules đầy ắp siêu du thuyền. Đặt phòng qua đối tác Expedia mang lại quyền vào cửa độc quyền khu Thermes Marins Monte-Carlo với hồ bơi nước biển ấm nhìn ra Địa Trung Hải.',
      critique_positives: [
        'Vị trí số 1 thế giới ngay bên cạnh Casino de Monte-Carlo và Nhà hát Opera Garnier',
        'Nhà hàng 3 sao Michelin Le Louis XV của Alain Ducasse duy trì phong độ đỉnh cao qua 3 thập kỷ',
        'Hầm rượu Les Caves de l’Hôtel de Paris đào sâu vào lòng đá với hơn 350.000 chai rượu quý hiếm'
      ],
      critique_considerations: [
        'Trong tuần lễ đua xe Monaco F1 Grand Prix vào tháng 5, toàn bộ khách sạn kín chỗ trước 1 năm với giá phòng cao kỷ lục',
        'Trang phục lịch sự (jacket & cà vạt) là bắt buộc khi dùng bữa tối tại nhà hàng Le Louis XV'
      ],
      podcast_title: 'Tập 45: Hôtel de Paris Monte-Carlo — Trái Tim Của Giới Siêu Giàu Giữa Quảng Trường Casino',
      podcast_duration: '4:45',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, đứng trên ban công Hôtel de Paris, nhìn dàn siêu xe Ferrari và Rolls-Royce xếp hàng trước sảnh và ánh đèn lộng lẫy của Casino Monte-Carlo... Cảm giác thật sự choáng ngợp!' },
        { speaker: 'Victor', text: 'Đó là lý do các ông hoàng bà chúa luôn coi đây là ngôi nhà thứ hai ở Địa Trung Hải em à. Hầm rượu sâu dưới lòng đất ở đây lưu trữ 350.000 chai rượu cổ, lớn nhất trong mọi khách sạn thế giới.' },
        { speaker: 'Lucky', text: 'Và ẩm thực 3 sao Michelin của Alain Ducasse tại Le Louis XV... từng chi tiết mạ vàng trên trần nhà và chiếc xe đẩy trà thảo mộc tươi đều đạt tới sự hoàn mỹ.' },
        { speaker: 'Victor', text: 'Chính xác. Hãy nhắc độc giả đặt phòng sớm qua link đối tác Expedia để được bảo đảm phòng hướng biển và ưu tiên giữ bàn ăn Michelin.' }
      ],
      shorts: [
        { title: 'Short 1: The Most Luxurious Hotel in Monaco', hook: 'Bên trong cung điện xa hoa nhất Monaco nơi các tỷ phú lưu trú khi tới sòng bài!', visual: 'Sảnh đá cẩm thạch tráng lệ với tượng ngựa đồng Louis XIV và đèn chùm pha lê rực rỡ.', cta: 'Xem cẩm nang Hôtel de Paris tại travel4u.us' },
        { title: 'Short 2: World\'s Largest Hotel Wine Cellar', hook: 'Hầm rượu ngầm sâu trong lòng đất chứa 350.000 chai rượu quý hiếm nhất hành tinh!', visual: 'Chuyên gia Sommelier dẫn lối qua những hành lang đá cổ chứa đầy những chai vang vô giá.', cta: 'Khám phá hầm rượu tại travel4u.us' },
        { title: 'Short 3: The $40,000/Night F1 Suite View', hook: 'Căn Suite tầng thượng có hồ bơi riêng nhìn thẳng chặng đua xe F1 khốc liệt!', visual: 'Góc nhìn từ hồ bơi vô cực kẹp giữa Quảng trường Casino và biển Địa Trung Hải.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'bangkok_mandarin_oriental',
    slug: 'mandarin-oriental-bangkok',
    name: 'Mandarin Oriental Bangkok',
    city: 'Chao Phraya River, Bangkok, Thailand',
    lat: 13.7236,
    lon: 100.5147,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_022-mandarin-oriental-bangkok-01.jpg',
    target_hero: 'expedia_bangkok_mandarin_oriental_hero_4k.jpg',
    lodging_id: '11982',
    region: 'Asia',
    rating: '5.0/5 (4,520+ Verified Reviews)',
    price_display: 'From $950 / night (Historic Authors\' Lounge & Riverfront Butler Service)',
    title: 'Mandarin Oriental Bangkok: 148-Year Historic Authors\' Wing & Chao Phraya River Guide 2026',
    story: {
      hotel_name: 'Mandarin Oriental Bangkok',
      city: 'Bangkok',
      country: 'Thailand',
      rating_score: '9.9 / 10',
      subtitle: 'The Grand Dame of the Far East & Timeless Butler Service on the River of Kings',
      soundscape_title: 'Symphonie du Chao Phraya & Cloches de Siam',
      soundscape_description: 'Tiếng sóng nước sông Chao Phraya vỗ mạn thuyền gỗ tếch cổ hòa cùng tiếng đàn tam thập lục Thái Lan truyền thống và tiếng quạt trần quay đều trong Authors’ Lounge.',
      soundscape_track: 'Traditional Thai Kim Melody & Riverboat Ambient Stream',
      gastronomy_title: 'Đỉnh Cao 2 Sao Michelin Le Normandie & Ẩm Thực Cung Đình Sala Rim Naam',
      gastronomy_dish: 'Món súp tôm hùm xanh hầm rượu Cognac trứ danh tại Le Normandie và đĩa cà ri xanh cua hoàng đế nấu nước cốt dừa tươi thơm lừng.',
      wine_pairing: 'Champagne Krug Grande Cuvée & Trà hoa nhài ướp búp sen tươi Thái Lan',
      positive_emotion: 'Sự hoài niệm sâu lắng và lòng hiếu khách tột đỉnh (Legendary Hospitality)—cảm giác được chăm sóc chu đáo đến từng sở thích nhỏ nhất bởi đội ngũ quản gia huyền thoại.',
      client_concern: 'Nỗi lo về kẹt xe và không khí ngột ngạt của Bangkok được giải quyết trọn vẹn: khách sạn nằm sát bờ sông thoáng đãng với hạm đội thuyền riêng đưa đón khách miễn phí đến trạm tàu điện trên cao BTS và IconSiam.',
      target_persona: 'Các nhà văn, học giả, giới doanh nhân thành đạt và những du khách sành sỏi say mê di sản văn hóa lịch sử châu Á.',
      woa_declaration: 'ĐÂY LÀ BIỂU TƯỢNG BẤT TỬ CỦA LÒNG HIẾU KHÁCH CHÂU Á — NƠI DỊCH VỤ QUẢN GIA ĐẠT ĐẾN CẢNH GIỚI NGHỆ THUẬT!',
      victor_note: 'Khai trương từ năm 1876, Mandarin Oriental Bangkok (trước đây là The Oriental) là khách sạn sang trọng đầu tiên của Vương quốc Xiêm. Nơi đây từng đón tiếp các đại văn hào như Joseph Conrad, Somerset Maugham và Noël Coward. Dịch vụ quản gia với tỷ lệ 4 nhân viên cho 1 phòng ngủ đảm bảo mọi nhu cầu của bạn đều được đáp ứng trước khi bạn kịp cất lời.',
      lucky_note: 'Trải nghiệm trà chiều trong không gian trắng muốt thanh lịch của Authors\' Lounge với những chiếc ghế mây và ảnh tư liệu lịch sử là một nghi thức không thể bỏ qua. Đừng quên đi thuyền gỗ tếch sang bờ đối diện sông để tận hưởng liệu trình mát-xa thảo dược cổ truyền tại The Oriental Spa—khu spa gỗ tếch 100 năm tuổi đầu tiên của Thái Lan.',
      critique_positives: [
        'Chất lượng dịch vụ và đào tạo nhân viên được công nhận là xuất sắc nhất thế giới',
        'Cánh phòng Authors’ Wing lưu giữ nguyên vẹn vẻ đẹp kiến trúc thời Victoria thuộc địa',
        'Vị trí sông nước đắc địa với hạm đội thuyền gỗ đưa đón sang trọng, tiện lợi'
      ],
      critique_considerations: [
        'Cánh phòng cổ Authors’ Wing chỉ có các suite lịch sử; các phòng tiêu chuẩn nằm ở River Wing và Garden Wing hiện đại hơn',
        'Nhà hàng 2 sao Michelin Le Normandie yêu cầu đặt bàn trước ít nhất 3 tuần'
      ],
      podcast_title: 'Tập 46: Mandarin Oriental Bangkok — Khách Sạn Huyền Thoại 148 Năm Bên Sông Mẹ Chao Phraya',
      podcast_duration: '4:40',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, bước vào sảnh Mandarin Oriental Bangkok, hương hoa sen tươi và nụ cười hiền hậu của người quản gia khiến mọi mệt mỏi sau chuyến bay dài tan biến ngay lập tức!' },
        { speaker: 'Victor', text: 'Đó là đẳng cấp của The Oriental em à. Họ đã phục vụ từ các vị vua Xiêm cho tới các đại văn hào thế giới trong suốt gần 1,5 thế kỷ. Nhân viên ở đây thậm chí nhớ cả loại gối em thích ngủ và cách em uống cà phê.' },
        { speaker: 'Lucky', text: 'Và ngồi bên bờ sông lúc chiều buông, nhìn những chiếc thuyền ghe lướt qua dưới ánh đèn lung linh của đền chùa... Cảm giác bình yên đến lạ kỳ!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy khuyên độc giả đặt phòng hướng sông qua link Expedia đối tác để được tặng kèm bữa sáng buffet bên sông và vé dịch vụ thuyền VIP.' }
      ],
      shorts: [
        { title: 'Short 1: Bangkok\'s 148-Year Historic Grand Dame', hook: 'Khách sạn đầu tiên của Thái Lan nơi từng đón tiếp các vị Vua và đại văn hào thế giới!', visual: 'Lối kiến trúc Authors\' Wing thanh lịch trắng muốt soi bóng xuống dòng sông Chao Phraya lộng gió.', cta: 'Xem cẩm nang Mandarin Oriental tại travel4u.us' },
        { title: 'Short 2: The Art of Thai Butler Service', hook: 'Dịch vụ quản gia đạt tỷ lệ 4 nhân viên cho 1 phòng ngủ tại Bangkok!', visual: 'Quản gia áo trắng truyền thống nhẹ nhàng mang khay trà sen và trái cây tươi vào phòng suite.', cta: 'Khám phá dịch vụ tại travel4u.us' },
        { title: 'Short 3: The 100-Year-Old Teakwood Spa', hook: 'Đi thuyền gỗ tếch qua sông để tắm spa trong ngôi nhà cổ 100 năm tuổi!', visual: 'Thuyền gỗ cập bến Oriental Spa cổ kính giữa khu vườn nhiệt đới xanh mướt.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'st_barth_cheval_blanc',
    slug: 'cheval-blanc-st-barth',
    name: 'Cheval Blanc St-Barth',
    city: 'Baie des Flamands, Saint-Barthélemy',
    lat: 17.9133,
    lon: -62.8600,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_011-cheval-blanc-st-barth-01.jpg',
    target_hero: 'expedia_st_barth_cheval_blanc_hero_4k.jpg',
    lodging_id: '4892019',
    region: 'Caribbean',
    rating: '5.0/5 (1,840+ Verified Reviews)',
    price_display: 'From $2,800 / night (Flamands Beach Front Villa & Guerlain Spa)',
    title: 'Cheval Blanc St-Barth: LVMH Art de Recevoir on Flamands Beach Master Guide 2026',
    story: {
      hotel_name: 'Cheval Blanc St-Barth',
      city: 'Saint-Barthélemy',
      country: 'Saint-Barthélemy',
      rating_score: '9.9 / 10',
      subtitle: 'The Only Palace in the Caribbean & Jacques Grange Coastal Couture on Anse des Flamands',
      soundscape_title: 'Symphonie des Flamands & Brise Alizée',
      soundscape_description: 'Tiếng sóng cuộn trắng xóa của bãi biển Flamands hòa cùng tiếng gió mậu dịch Caribbean reo qua rặng cọ dừa và âm hưởng Bossa Nova êm dịu từ nhà hàng La Cabane.',
      soundscape_track: 'French Caribbean Chill & Acoustic Guitar Ocean Waves',
      gastronomy_title: 'Ẩm Thực Tinh Hoa Pháp - Ca-ri-bê Tại Nhà Hàng La Case',
      gastronomy_dish: 'Cá mú nướng gia vị đảo Caribbean thơm ngậy, salad tôm hùm bơ quả và món tráng miệng sô-cô-la ganache vùng xích đạo do bếp trưởng Jean Imbert sáng tạo.',
      wine_pairing: 'Champagne Moët & Chandon Grand Vintage & Cocktail Rhum Agricole lâu năm vùng Antilles',
      positive_emotion: 'Sự thư giãn thanh lịch tối thượng (Barefoot Couture)—cảm giác sải bước chân trần trên bãi cát mịn màng trong trang phục lụa cao cấp nhất của tập đoàn LVMH.',
      client_concern: 'Nỗi lo về sự phô trương ồn ào của đảo St-Barth được hóa giải: Cheval Blanc tọa lạc tại vịnh Flamands biệt lập, nơi sóng êm và cát mịn nguyên sơ nhất hòn đảo.',
      target_persona: 'Các biểu tượng thời trang quốc tế, giám đốc sáng tạo, các nhà tài phiệt và những cặp đôi tìm kiếm kỳ nghỉ nhiệt đới sang trọng bậc nhất Đại Tây Dương.',
      woa_declaration: 'ĐÂY LÀ THIÊN ĐƯỜNG NGHỈ DƯỠNG BỜ BIỂN XA XỈ NHẤT VÙNG CARIBBEAN — NGHỆ THUẬT SỐNG PHÁP ĐỈNH CAO!',
      victor_note: 'Là khu nghỉ dưỡng duy nhất tại vùng biển Caribbean nhận được danh hiệu Palace chính thức của Pháp, Cheval Blanc St-Barth là một kiệt tác thiết kế của kiến trúc sư lừng danh Jacques Grange. Tông màu hồng san hô biểu tượng (Taupe & Coral Pink) kết hợp với gỗ sồi trắng và vải lanh tự nhiên tạo nên một không gian biển cả vừa ấm áp vừa quý phái.',
      lucky_note: 'Biệt thự bãi biển Villa de France với 5 phòng ngủ và hồ bơi vô cực riêng sát mép nước là đỉnh cao của sự xa hoa. Khu Cheval Blanc Spa duy nhất tại Caribbean sử dụng hoàn toàn sản phẩm và liệu trình độc quyền của Guerlain. Hãy nhớ đặt phòng qua link Expedia đối tác để được bảo đảm xe đón riêng từ sân bay Gustaf III và bữa sáng bãi biển hàng ngày.',
      critique_positives: [
        'Khu nghỉ dưỡng duy nhất tại Caribbean đạt danh hiệu cung điện danh giá "Palace"',
        'Bãi biển Baie des Flamands rộng nhất hòn đảo với dải cát trắng mịn màng tuyệt mỹ',
        'Spa Guerlain độc quyền giữa khu vườn nhiệt đới với các liệu trình hương thơm cao cấp'
      ],
      critique_considerations: [
        'Khu nghỉ dưỡng đóng cửa hàng năm từ tháng 9 đến giữa tháng 10 trong mùa bão Đại Tây Dương',
        'Đường băng sân bay Saint-Barth rất ngắn; chuyến bay hạ cánh bằng máy bay cánh quạt nhỏ đòi hỏi trải nghiệm phiêu lưu thú vị'
      ],
      podcast_title: 'Tập 47: Cheval Blanc St-Barth — Cung Điện Biển Độc Quyền Của Tập Đoàn LVMH',
      podcast_duration: '4:40',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, dạo bước trên bãi cát trắng vịnh Flamands, ngắm nhìn những chiếc dù che màu hồng san hô tinh tế của Cheval Blanc... em cảm nhận trọn vẹn chất sống thượng lưu Pháp giữa vùng biển Caribbean!' },
        { speaker: 'Victor', text: 'Đó là bởi vì mọi chi tiết ở đây đều mang dấu ấn của Bernard Arnault và Jacques Grange em à. Từ hương thơm nước hoa phòng độc quyền Tropical Chic của Thierry Wasser cho tới dịch vụ Alchimiste phục vụ từng yêu cầu nhỏ nhất.' },
        { speaker: 'Lucky', text: 'Và bữa trưa cá nướng với ly vang hồng ướp lạnh tại La Cabane khi chân vẫn chạm trên cát biển mịn... Thật sự là trải nghiệm nghỉ dưỡng hoàn hảo!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy nhắc quý độc giả đặt phòng qua link đối tác Expedia để được ưu tiên vị trí phòng sát biển và quà tặng chào mừng Guerlain đặc biệt.' }
      ],
      shorts: [
        { title: 'Short 1: The Only Palace Resort in the Caribbean', hook: 'Khu nghỉ dưỡng duy nhất tại Caribbean đạt đẳng cấp Cung điện Hoàng gia Pháp!', visual: 'Toàn cảnh bãi biển Flamands cát trắng mịn với những chiếc lều nghỉ màu hồng san hô sang trọng.', cta: 'Xem cẩm nang Cheval Blanc St-Barth tại travel4u.us' },
        { title: 'Short 2: Barefoot Luxury by Jacques Grange', hook: 'Thiết kế nội thất biển đỉnh cao của nhà thiết kế huyền thoại Jacques Grange!', visual: 'Bên trong căn biệt thự biển với trần cao thoáng đãng, vải lanh trắng và tầm nhìn đại dương xanh ngọc.', cta: 'Khám phá thiết kế tại travel4u.us' },
        { title: 'Short 3: Exclusive Guerlain Tropical Spa', hook: 'Khu Spa Guerlain độc quyền ẩn mình giữa rừng cọ nhiệt đới Caribbean!', visual: 'Liệu trình mát-xa toàn thân bằng tinh dầu hoa lan chuông trong chòi spa ngoài trời thơm ngát.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'antibes_hotel_du_cap_eden_roc',
    slug: 'hotel-du-cap-eden-roc-antibes',
    name: 'Hôtel du Cap-Eden-Roc',
    city: 'Cap d\'Antibes, French Riviera, France',
    lat: 43.5489,
    lon: 7.1219,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_009-hotel-du-cap-eden-roc-01.jpg',
    target_hero: 'expedia_antibes_hotel_du_cap_eden_roc_hero_4k.jpg',
    lodging_id: '29102',
    region: 'Europe',
    rating: '5.0/5 (3,450+ Verified Reviews)',
    price_display: 'From $2,600 / night (Iconic Seawater Clifftop Pool & Riviera Cabanas)',
    title: 'Hôtel du Cap-Eden-Roc Antibes: Iconic Clifftop Seawater Pool & Glamour Guide 2026',
    story: {
      hotel_name: 'Hôtel du Cap-Eden-Roc',
      city: 'Antibes',
      country: 'France',
      rating_score: '10.0 / 10',
      subtitle: 'The Legendary Sanctuary of the Cannes Film Festival & Seawater Pool Carved in Basalt Rock',
      soundscape_title: 'Symphonie des Falaises & Vagues d’Azur',
      soundscape_description: 'Tiếng sóng biển Địa Trung Hải đập vào vách đá bazan hùng vĩ hòa cùng tiếng cười rộn rã bên hồ bơi Eden-Roc và tiếng gió rì rào qua rừng thông ô dù 150 năm tuổi.',
      soundscape_track: 'French Riviera Classical Symphony & Mediterranean Sea Swell',
      gastronomy_title: 'Đỉnh Cao Ẩm Thực Biển Riviera Của Bếp Trưởng Sébastien Broda',
      gastronomy_dish: 'Món cá tráp biển nướng muối biển Guérande ăn kèm atisô tím hầm cỏ chanh, đĩa gan ngỗng áp chảo và món tráng miệng dâu rừng hoang dã sốt kem vani.',
      wine_pairing: 'Champagne Dom Pérignon Vintage & Vang hồng Domaine Ott Château Romassan',
      positive_emotion: 'Cảm giác huyền thoại và bất tử (Eternal Glamour)—được sải bước trên con đường rợp bóng thông nơi F. Scott Fitzgerald từng viết tiểu thuyết và Picasso từng vẽ tranh.',
      client_concern: 'Nỗi lo về sự xâm nhập của thợ săn ảnh paparazzi trong mùa Liên hoan phim Cannes được giải tỏa 100%: khách sạn tọa lạc trên một mũi đất biệt lập 9 héc-ta được bảo vệ an ninh nghiêm ngặt nhất bờ biển Riviera.',
      target_persona: 'Các minh tinh màn bạc Hollywood, đạo diễn Oscar, các gia tộc công nghiệp châu Âu và những du khách thượng lưu sành sỏi tìm kiếm biểu tượng xa xỉ số 1 nước Pháp.',
      woa_declaration: 'ĐÂY LÀ BIỂU TƯỢNG HUYỀN THOẠI DUY NHẤT CỦA BỜ BIỂN CÔTE D’AZUR — MỘT KIỆT TÁC SỐNG MÃI VỚI THỜI GIAN!',
      victor_note: 'Kể từ khi mở cửa vào năm 1870, Hôtel du Cap-Eden-Roc đã định nghĩa thế nào là mùa hè của giới thượng lưu thế giới. Hồ bơi nước biển mặn được đục thẳng vào vách đá bazan vào năm 1914 bởi kiến trúc sư lừng danh là hình ảnh biểu tượng nhất của toàn bộ vùng Côte d’Azur. 33 căn lều Cabana ẩn mình trong rừng thông là nơi các nhà văn và đạo diễn huyền thoại từng ẩn dật để sáng tạo.',
      lucky_note: 'Khoảnh khắc nhảy từ cầu ván nhún gỗ trên vách đá thẳng xuống làn nước trong vắt của biển Địa Trung Hải là một nghi thức trưởng thành của giới quý tộc. Bữa trưa tự chọn tại nhà hàng Eden-Roc Grill nhìn ra quần đảo Lérins là bữa trưa đẹp nhất hành tinh. Hãy đặt phòng sớm qua đối tác Expedia để được ưu tiên giữ chỗ cabana riêng và phòng suite nhìn biển.',
      critique_positives: [
        'Khuôn viên 22 mẫu Anh rợp bóng thông cổ thụ với sự riêng tư và bảo mật tuyệt đối',
        'Hồ bơi nước biển đục vào vách đá bazan được coi là hồ bơi khách sạn nổi tiếng nhất lịch sử',
        '33 căn lều gỗ Cabana lịch sử nép mình trong rừng thông ven biển độc nhất vô nhị'
      ],
      critique_considerations: [
        'Khách sạn mở cửa theo mùa từ giữa tháng 4 đến giữa tháng 10 hàng năm; trong dịp LHP Cannes (tháng 5) kín phòng trước 1 năm',
        'Khách sạn chỉ chấp nhận thanh toán bằng thẻ tín dụng hoặc chuyển khoản trước; văn hóa phục vụ cực kỳ truyền thống và sang trọng'
      ],
      podcast_title: 'Tập 48: Hôtel du Cap-Eden-Roc — Khách Sạn Huyền Thoại Của Các Ngôi Sao Cannes',
      podcast_duration: '4:55',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, đi bộ dọc con đường lát đá Allée des Pins thẳng ra biển, ngắm nhìn hồ bơi đục vào vách đá bazan của Eden-Roc... Em cảm giác như mình đang bước vào trang sách của Đại gia Gatsby!' },
        { speaker: 'Victor', text: 'Chính xác em à. F. Scott Fitzgerald đã lấy chính Eden-Roc làm nguyên mẫu cho khách sạn trong tiểu thuyết Tender Is the Night. Đây là nơi các ngôi sao điện ảnh từ Audrey Hepburn, Elizabeth Taylor cho tới Leonardo DiCaprio chọn làm chốn ẩn mình.' },
        { speaker: 'Lucky', text: 'Và cảm giác nhảy từ cầu ván nhún trên vách đá xuống làn nước biển xanh ngắt... Thật sự sảng khoái và tự do vô cùng!' },
        { speaker: 'Victor', text: 'Đúng vậy. Quý độc giả hãy lên kế hoạch sớm và đặt qua link Expedia đối tác để được bảo đảm phòng hướng biển và trải nghiệm lều cabana lịch sử.' }
      ],
      shorts: [
        { title: 'Short 1: The World\'s Most Famous Clifftop Pool', hook: 'Hồ bơi nước biển đục thẳng vào vách đá nổi tiếng nhất thế giới từ năm 1914!', visual: 'Flycam lướt qua hồ bơi vô cực Eden-Roc nước xanh ngắt nằm cheo leo trên vách đá bazan biển Địa Trung Hải.', cta: 'Xem cẩm nang Eden-Roc tại travel4u.us' },
        { title: 'Short 2: The Secret Retreat of Cannes Film Stars', hook: 'Khu rừng thông 22 mẫu Anh nơi các siêu sao Hollywood ẩn náu mỗi kỳ LHP Cannes!', visual: 'Những căn lều gỗ Cabana ẩn hiện dưới tán thông cổ thụ nhìn ra biển xanh ngọc bích.', cta: 'Khám phá huyền thoại Eden-Roc tại travel4u.us' },
        { title: 'Short 3: The Famous Trapeze & Diving Board', hook: 'Cầu nhảy vách đá huyền thoại nơi giới quý tộc lao mình xuống biển Côte d’Azur!', visual: 'Du khách sải cánh nhảy từ ván nhún gỗ trên vách đá xuống làn nước trong vắt như pha lê.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'sumba_nihi_indonesia',
    slug: 'nihi-sumba-indonesia',
    name: 'Nihi Sumba',
    city: 'Sumba Island, East Nusa Tenggara, Indonesia',
    lat: -9.6667,
    lon: 119.3333,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_036-nihi-sumba-indonesia-01.jpg',
    target_hero: 'expedia_sumba_nihi_indonesia_hero_4k.jpg',
    lodging_id: '9281039',
    region: 'Asia',
    rating: '5.0/5 (1,920+ Verified Reviews)',
    price_display: 'From $1,950 / night (Occy\'s Left Private Surf & Sandalwood Horse Riding)',
    title: 'Nihi Sumba Indonesia: The Edge of Wildness & Nihi Oka Spa Safari Guide 2026',
    story: {
      hotel_name: 'Nihi Sumba',
      city: 'Sumba',
      country: 'Indonesia',
      rating_score: '9.9 / 10',
      subtitle: 'The Edge of Wildness, World’s Most Exclusive Surf Wave & Sandalwood Wild Horses',
      soundscape_title: 'Tonnerre d’Occy & Galop des Chevaux Sauvages',
      soundscape_description: 'Tiếng sóng cuộn gầm vang của con sóng huyền thoại Occy’s Left hòa cùng tiếng vó ngựa giống Sandalwood phi nước đại trên bãi cát trắng dài 2,5km và tiếng cầu nguyện của người dân làng Sumba.',
      soundscape_track: 'Sumbanese Traditional Bamboo Flute & Wild Ocean Roar',
      gastronomy_title: 'Ẩm Thực Hoang Dã Bờ Biển & Nông Trại Hữu Cơ Sumba',
      gastronomy_dish: 'Cá hồi ngừ vây vàng tươi vừa đánh bắt nướng lá chuối trên than dừa, salad đu đủ xanh sốt ớt cay nồng và cà ri thịt bò Sumba thơm phức gia vị bản địa.',
      wine_pairing: 'Rượu vang trắng New Zealand Sauvignon Blanc & Nước dừa tươi nguyên trái hái từ cây',
      positive_emotion: 'Sự tự do nguyên bản và phóng khoáng (Untamed Freedom)—cảm giác kết nối thuần khiết với thiên nhiên hoang sơ và sức mạnh của đại dương bao la.',
      client_concern: 'Nỗi lo về sự cô lập và thiếu tiện nghi trên hòn đảo xa xôi được xóa tan: mỗi biệt thự mái tranh truyền thống đều có máy điều hòa, hồ bơi riêng và quản gia bản địa chăm sóc chu đáo.',
      target_persona: 'Những tay lướt sóng thượng lưu, những người yêu thiên nhiên hoang dã, các gia đình tìm kiếm kỳ nghỉ phiêu lưu kết hợp làm thiện nguyện cùng Quỹ Sumba Foundation.',
      woa_declaration: 'ĐÂY LÀ NƠI HOANG SƠ ĐẸP NHẤT CHÂU Á — NƠI BẠN TÌM LẠI BẢN THỂ TỰ DO ĐÍCH THỰC CỦA CHÍNH MÌNH!',
      victor_note: 'Hai lần được bình chọn là Khách sạn Tốt nhất Thế giới bởi Travel + Leisure, Nihi Sumba không chỉ là một resort nghỉ dưỡng mà là một phong cách sống. Nằm trên bờ biển phía nam hòn đảo Sumba huyền bí, nơi đây giới hạn chỉ 10 tay lướt sóng mỗi ngày trên con sóng độc quyền Occy’s Left trứ danh. Cảm giác cưỡi ngựa dọc bờ biển lúc hoàng hôn là một trong những trải nghiệm ngoạn mục nhất cuộc đời.',
      lucky_note: 'Trải nghiệm đỉnh cao nhất ở đây là chuyến Spa Safari Nihi Oka: đi bộ xuyên qua những cánh đồng lúa bậc thang và làng mạc bộ lạc để đến một bán đảo biệt lập, nơi bạn được mát-xa toàn thân không giới hạn trong các chòi tre cheo leo trên vách đá ngắm sóng biển. Hãy đặt qua đối tác Expedia để được bảo đảm xuất lướt sóng riêng và tour thăm làng văn hóa.',
      critique_positives: [
        'Con sóng lướt sóng độc quyền Occy’s Left giới hạn số người lướt, đảm bảo trải nghiệm đỉnh cao',
        'Chương trình Spa Safari Nihi Oka trọn ngày trên mũi vách đá độc nhất vô nhị trên thế giới',
        'Đóng góp xã hội sâu sắc: phần lớn lợi nhuận hỗ trợ nguồn nước sạch và y tế cho người dân đảo Sumba'
      ],
      critique_considerations: [
        'Phải bay chuyến bay nội địa 50 phút từ đảo Bali sang sân bay Tambolaka, sau đó đi xe ô tô 90 phút qua rừng núi',
        'Sóng biển tại bãi biển chính khá mạnh; trẻ em nên tắm tại các hồ bơi riêng của biệt thự hoặc vịnh biển êm'
      ],
      podcast_title: 'Tập 49: Nihi Sumba — Ốc Đảo Hoang Dã Nơi Sóng Biển Và Ngựa Hoang Thống Trị',
      podcast_duration: '4:50',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, cưỡi những chú ngựa Sandalwood phi nước đại dọc bãi biển hoang sơ dài 2,5 cây số lúc hoàng hôn... Cảm giác tự do và phóng khoáng ở Nihi Sumba thật sự khiến em nghẹn ngào!' },
        { speaker: 'Victor', text: 'Đó là bởi vì Nihi Sumba nằm ở rìa của thế giới văn minh em à. Nơi đây giữ được linh hồn nguyên thủy của đất trời. Và tour Spa Safari Nihi Oka... mát-xa trên vách đá nghe sóng vỗ là trải nghiệm độc nhất vô nhị.' },
        { speaker: 'Lucky', text: 'Và con sóng Occy’s Left huyền thoại... nơi những người lướt sóng khắp hành tinh coi như thánh địa!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy nhắc độc giả đặt sớm qua link đối tác Expedia để được ưu tiên giữ chỗ lướt sóng và suất trải nghiệm Spa Safari.' }
      ],
      shorts: [
        { title: 'Short 1: Galloping Wild Horses on a 2.5km Private Beach', hook: 'Cưỡi ngựa hoang trên bãi biển hoang sơ đẹp nhất thế giới lúc hoàng hôn!', visual: 'Đoàn ngựa phi nước đại trên bãi cát ướt phản chiếu ánh hoàng hôn đỏ rực bên bờ đại dương Sumba.', cta: 'Xem cẩm nang Nihi Sumba tại travel4u.us' },
        { title: 'Short 2: The World-Famous Nihi Oka Spa Safari', hook: 'Chuyến Spa Safari đi bộ qua ruộng bậc thang để mát-xa trên vách đá cheo leo!', visual: 'Chòi tre spa mộc mạc nằm chênh vênh trên vách núi nhìn xuống làn sóng biển tung bọt trắng xóa.', cta: 'Khám phá Spa Safari tại travel4u.us' },
        { title: 'Short 3: The Most Exclusive Wave on Earth (Occy\'s Left)', hook: 'Con sóng triệu đô chỉ dành riêng cho 10 người lướt mỗi ngày trên thế giới!', visual: 'Tay lướt sóng chuyên nghiệp chui sâu vào đường hầm sóng xanh ngắt hoàn hảo.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  },

  {
    key: 'maldives_one_and_only_reethi_rah',
    slug: 'one-and-only-reethi-rah-maldives',
    name: 'One&Only Reethi Rah Maldives',
    city: 'North Malé Atoll, Maldives',
    lat: 4.5122,
    lon: 73.3692,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_027-one-only-reethi-rah-01.jpg',
    target_hero: 'expedia_maldives_one_and_only_reethi_rah_hero_4k.jpg',
    lodging_id: '1249821',
    region: 'Indian Ocean',
    rating: '4.9/5 (3,280+ Verified Reviews)',
    price_display: 'From $2,400 / night (12 Private Beaches & Grand Water Villa with Pool)',
    title: 'One&Only Reethi Rah Maldives: 12 Pristine Coral Beaches & Grand Sunset Villa 2026',
    story: {
      hotel_name: 'One&Only Reethi Rah Maldives',
      city: 'Reethi Rah',
      country: 'Maldives',
      rating_score: '9.9 / 10',
      subtitle: 'The Crown Jewel of the Indian Ocean with 12 Private Beaches & 6km of Coral Coastline',
      soundscape_title: 'Symphonie du Lagon & Brise des Alizés',
      soundscape_description: 'Tiếng sóng biển lăn tăn vỗ vào chân cột biệt thự trên mặt nước hòa cùng tiếng gió xào xạc qua tán cọ nhiệt đới và tiếng ly sâm panh pha lê lách cách trên boong du thuyền lúc hoàng hôn.',
      soundscape_track: 'Chillout Maldives Sunset Lounge & Pure Ocean Resonance',
      gastronomy_title: 'Ẩm Thực Đa Văn Hóa Đỉnh Cao Với 7 Nhà Hàng Fine-Dining',
      gastronomy_dish: 'Bò Wagyu A5 nướng đá nham thạch tại nhà hàng Nhật Bản Tapasake trên mặt nước và đĩa hải sản nướng than hồng thơm lùng tại Fanditha bên bờ cát.',
      wine_pairing: 'Champagne Louis Roederer Cristal & Bộ sưu tập vang trắng Burgundy Grand Cru',
      positive_emotion: 'Sự xa hoa khoáng đạt và tự do vô tận (Epicurean Freedom)—cảm giác sở hữu một hòn đảo nhiệt đới khổng lồ với 12 bãi biển riêng biệt không bao giờ chạm mặt đám đông.',
      client_concern: 'Nỗi sợ không gian chật hẹp của các đảo resort nhỏ ở Maldives được giải tỏa hoàn toàn: Reethi Rah là một trong những đảo san hô lớn nhất Maldives với chiều dài 6km bờ biển, nơi mỗi khách được cấp một chiếc xe đạp riêng để tự do khám phá.',
      target_persona: 'Các gia đình thượng lưu, các cặp đôi kỷ niệm ngày cưới, các vận động viên thể thao và giới ngôi sao tìm kiếm kỳ nghỉ nhiệt đới đỉnh cao nhất thế giới.',
      woa_declaration: 'ĐÂY LÀ THIÊN ĐƯỜNG BIỂN ĐẢO RỰC RỠ NHẤT MALDIVES — NƠI 12 BÃI BIỂN RIÊNG BIỆT LÀ CỦA CHÚNG TA!',
      victor_note: 'Được thiết kế bởi kiến trúc sư thiên tài Jean-Michel Gathy, One&Only Reethi Rah là biểu tượng xa xỉ bền vững nhất của đảo quốc Maldives. Hòn đảo hình con bạch tuộc với những mũi đất vươn dài ra biển tạo nên 12 vịnh nhỏ cát trắng mịn màng tuyệt đối. Biệt thự trên mặt nước Grand Water Villa với hồ bơi vô cực dài 20m kẹp giữa đầm phá ngọc lam là chuẩn mực của sự hưởng thụ xa hoa.',
      lucky_note: 'Trải nghiệm bữa tối lãng mạn dưới ánh nến tại nhà hàng Ả Rập Fanditha khi ngồi trên những chiếc đệm thảm Ba Tư êm ái trên cát ngắm mặt trời đỏ rực chìm dần xuống Ấn Độ Dương là khoảnh khắc kỳ diệu. Khu One&Only Spa với các chòi mát-xa trên mặt nước và hồ bơi thủy trị liệu nước ấm là nơi hồi phục năng lượng tuyệt đối. Hãy đặt qua đối tác Expedia để được miễn phí đưa đón bằng du thuyền du lịch cao cấp từ sân bay Malé.',
      critique_positives: [
        'Quy mô đảo khổng lồ với 12 bãi biển riêng biệt và 6km đường bờ biển san hô tuyệt mỹ',
        'Các biệt thự có trần nhà hình vòm cao vút và diện tích rộng rãi bậc nhất Maldives',
        'Đưa đón bằng du thuyền động cơ catamaran sang trọng chỉ mất 45 phút từ sân bay quốc tế Velana'
      ],
      critique_considerations: [
        'Hòn đảo có quy mô lớn; việc di chuyển giữa các nhà hàng và biệt thự cần sử dụng xe đạp hoặc gọi xe điện buggy',
        'Các nhà hàng nổi tiếng như Tapasake và Botanica cần đặt bàn trước để có chỗ ngồi sát mép nước'
      ],
      podcast_title: 'Tập 50: One&Only Reethi Rah Maldives — Đỉnh Cao Vương Giả Giữa 12 Bãi Biển San Hô',
      podcast_duration: '4:55',
      podcast_dialogue: [
        { speaker: 'Lucky', text: 'Anh Victor, đạp xe dưới những rặng cọ xanh mát, đi qua 12 bãi biển cát trắng tinh khôi mà không gặp một ai... Reethi Rah mang lại cảm giác xa hoa rộng lớn khác biệt hoàn toàn với những resort Maldives khác!' },
        { speaker: 'Victor', text: 'Đó là tầm nhìn kiến trúc của Jean-Michel Gathy em à. Ông đã biến hòn đảo này thành một thiên đường nhiệt đới không giới hạn. Biệt thự Grand Sunset Residence ở đây từng đón tiếp những gia tộc giàu có nhất thế giới.' },
        { speaker: 'Lucky', text: 'Và bữa tối ngắm hoàng hôn rực rỡ tại nhà hàng Tapasake trên mặt biển... Đĩa bò Wagyu nướng đá nóng hòa cùng ly sâm panh Cristal ướp lạnh, thật sự là thiên đường trần thế!' },
        { speaker: 'Victor', text: 'Chính xác. Hãy nhắc độc giả đặt phòng qua link đối tác chính thức Expedia để được tặng kèm dịch vụ du thuyền đưa đón sang trọng và tín dụng spa VIP.' }
      ],
      shorts: [
        { title: 'Short 1: The Maldives Resort with 12 Private Beaches', hook: 'Khu resort Maldives khổng lồ sở hữu tới 12 bãi biển riêng biệt cát trắng mịn!', visual: 'Flycam từ trên cao quay trọn vẹn hòn đảo Reethi Rah hình bạch tuộc vươn dài ra làn nước biển ngọc bích.', cta: 'Xem cẩm nang Reethi Rah tại travel4u.us' },
        { title: 'Short 2: Grand Water Villa with 20m Infinity Pool', hook: 'Bên trong căn biệt thự trên mặt biển có hồ bơi vô cực dài 20 mét tại Maldives!', visual: 'Lối đi lát gỗ dẫn ra hồ bơi vô cực kẹp giữa hai dải võng lưới nằm trên mặt biển Ấn Độ Dương.', cta: 'Khám phá biệt thự tại travel4u.us' },
        { title: 'Short 3: Sunset Dinner at Tapasake Overwater', hook: 'Bữa tối sushi và bò Wagyu trên nhà hàng lơ lửng trên mặt biển ngắm hoàng hôn!', visual: 'Bếp trưởng cắt lát cá ngừ tươi ngon trong khi hoàng hôn tím biếc buông xuống mặt biển phẳng lặng.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
      ]
    }
  }
];

async function run() {
  console.log('🚀 [TRAVEL4U BATCH 5] Starting production engine for Sanctuaries #41 to #50...\n');

  // 1. Process 4K Images & WebP
  console.log('📸 Step 1: Processing 4K Images, WebP conversion & EXIF/GPS embedding...');
  let manifest = fs.existsSync(MANIFEST_FILE) ? JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8')) : {};

  for (const item of BATCH_5_CONFIGS) {
    const srcPath = path.resolve(ROOT_APP, '..', item.source_rel);
    const destHero = path.join(MEDIA_DIR, item.target_hero);
    const destBackup = path.join(BACKUP_DIR, item.target_hero);
    const destWebp = destHero.replace(/\.jpg$/, '.webp');
    const destWebpBackup = destBackup.replace(/\.jpg$/, '.webp');

    if (fs.existsSync(srcPath)) {
      console.log(`   🎨 Processing 4K: ${item.name} (${item.target_hero})`);
      const imgBuffer = await sharp(srcPath)
        .resize(3840, 2160, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90, progressive: true })
        .toBuffer();

      fs.writeFileSync(destHero, imgBuffer);
      fs.writeFileSync(destBackup, imgBuffer);

      // Generate WebP
      const webpBuffer = await sharp(imgBuffer)
        .webp({ quality: 85 })
        .toBuffer();
      fs.writeFileSync(destWebp, webpBuffer);
      fs.writeFileSync(destWebpBackup, webpBuffer);

      const md5 = calculateMD5(imgBuffer);
      manifest[item.slug] = {
        name: item.name,
        hero_image: `/media/expedia_hotels/${item.target_hero}`,
        hero_webp: `/media/expedia_hotels/${path.basename(destWebp)}`,
        md5_hash: md5,
        lat: item.lat,
        lon: item.lon,
        author: 'Victor & Lucky Travel4U',
        copyright: '2026 Travel4U Luxury Empire'
      };
      console.log(`      ✓ Saved 4K JPG & WebP (MD5: ${md5.substring(0, 10)}...)`);
    } else {
      console.warn(`   ⚠️ Missing source image for ${item.name}: ${srcPath}`);
    }
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('   🎉 Manifest updated with 50 luxury media assets.');

  // 2. Build Storytelling Database (50 Hotels)
  console.log('\n📚 Step 2: Compiling 50 Sovereign Sanctuaries Master Storytelling Database...');
  const { STORYTELLING_DATABASE: OLD_DB } = require('./storytelling_database_40_hotels.cjs');
  const FULL_50_DB = { ...OLD_DB };

  for (const item of BATCH_5_CONFIGS) {
    FULL_50_DB[item.slug] = item.story;
  }

  const dbCode = `/**
 * 👑 TRAVEL4U VICTOR & LUCKY — 50 SOVEREIGN SANCTUARIES MASTER STORYTELLING DATABASE
 * Domain: travel4u.us
 * Updated: ${new Date().toISOString()}
 * 50 Flagship Sanctuaries across Global Luxury Collections
 */

const STORYTELLING_DATABASE = ${JSON.stringify(FULL_50_DB, null, 2)};

module.exports = { STORYTELLING_DATABASE };
`;

  const DB_50_FILE = path.join(__dirname, 'storytelling_database_50_hotels.cjs');
  fs.writeFileSync(DB_50_FILE, dbCode, 'utf-8');
  console.log(`   ✓ Saved: storytelling_database_50_hotels.cjs (${Object.keys(FULL_50_DB).length} hotels)`);

  // 3. Update destinations.json with Batch 5
  console.log('\n🗺️ Step 3: Updating destinations.json with Batch 5 sanctuaries...');
  let destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));
  const existingSlugs = new Set(destinations.map(d => d.slugs.en));

  for (const item of BATCH_5_CONFIGS) {
    if (existingSlugs.has(item.slug)) continue;

    const baseSlug = item.slug;
    const destObj = {
      hub_folder: `expedia_0${destinations.length + 1}_${item.key}`,
      post_code: `EXP_${item.key.toUpperCase()}`,
      location: item.city,
      english_title: item.title,
      hero_image: `/media/expedia_hotels/${item.target_hero}`,
      rating: item.rating,
      price_display: item.price_display,
      expedia_direct_link: `/go/${baseSlug}`,
      expedia_lodging_id: item.lodging_id,
      slugs: {
        en: baseSlug,
        de: `${baseSlug}-de`,
        es: `${baseSlug}-es`,
        fr: `${baseSlug}-fr`,
        it: `${baseSlug}-it`,
        ja: `${baseSlug}-ja`,
        ko: `${baseSlug}-ko`,
        pt: `${baseSlug}-pt`,
        ru: `${baseSlug}-ru`,
        vi: `khach-san-${baseSlug.replace(/-hotel|-resort/g, '')}-vip`,
        "zh-cn": `${baseSlug}-zh-cn`,
        "zh-tw": `${baseSlug}-zh-tw`
      },
      region: item.region
    };
    destinations.push(destObj);
  }

  fs.writeFileSync(DESTINATIONS_FILE, JSON.stringify(destinations, null, 2), 'utf-8');
  console.log(`   ✓ destinations.json now contains ${destinations.length} luxury sanctuaries.`);

  // 4. Update generator to 50 hotels and run article compilation
  console.log('\n✍️ Step 4: Updating article generator with 50 hotels and cross-link clusters...');
  let genContent = fs.readFileSync(path.join(__dirname, 'generate_victor_lucky_storytelling_articles.cjs'), 'utf-8');

  // Replace import
  genContent = genContent.replace(
    /require\(['"]\.\/storytelling_database_(?:30|40)_hotels\.cjs['"]\)/,
    "require('./storytelling_database_50_hotels.cjs')"
  );

  // Inject new clusters for batch 5
  const NEW_CLUSTERS_INJECTION = `
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
`;

  if (!genContent.includes('the-lana-hotel-dubai')) {
    genContent = genContent.replace('const CLUSTERS = {', `const CLUSTERS = {\n${NEW_CLUSTERS_INJECTION}`);
  }

  fs.writeFileSync(path.join(__dirname, 'generate_victor_lucky_storytelling_articles.cjs'), genContent, 'utf-8');

  console.log('   🚀 Compiling 600 localized articles (50 hotels × 12 locales)...');
  execSync('node scripts/generate_victor_lucky_storytelling_articles.cjs', { cwd: ROOT_APP, stdio: 'inherit' });

  // 5. Update Search Index
  console.log('\n🔍 Step 5: Updating instant search index (50 destinations)...');
  execSync('node scripts/generate_expedia_search_index.cjs', { cwd: ROOT_APP, stdio: 'inherit' });

  console.log('\n🎉 ALL 50 SOVEREIGN SANCTUARIES (600 ARTICLES & 4K MEDIA) PRODUCED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('❌ Error executing Batch 5 Writer:', err);
  process.exit(1);
});
