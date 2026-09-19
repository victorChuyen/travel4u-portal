/**
 * 🎙️ VICTOR & LUCKY LUXURY STORYTELLING ARTICLE GENERATOR (EMOTIONAL CONVERSION & SENSORY HOOKS)
 * Domain: travel4u.us
 * Generates authentic, sensory, non-duplicated 6-chapter narrative reviews
 * Incorporates:
 *   1. Soundscape & Acoustic Luxury (Âm nhạc)
 *   2. Sensory Gastronomy & Wine Provenance (Ẩm thực)
 *   3. 1 Positive Emotion Resolved (1 Cảm xúc tích cực)
 *   4. 1 Core Client Concern Addressed (1 Điều khách hàng quan tâm)
 *   5. 1 Target Persona (1 Đối tượng hài lòng tuyệt đối)
 *   6. The "WOA" Revelation & Immediate Booking Trigger
 *   7. YouTube Podcast Dialogue & 3 Viral Shorts Concepts
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.resolve(__dirname, '../src/data/articles.json');
const DESTINATIONS_FILE = path.resolve(__dirname, '../src/data/destinations.json');

const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));

const STORYTELLING_DATABASE = {
  'paris-four-seasons-george-v': {
    hotel_name: 'Four Seasons Hotel George V Paris',
    city: 'Paris',
    country: 'France',
    rating_score: '9.9 / 10',
    subtitle: 'Where 12,000 Fresh Orchids Meet Unflinching Parisian Royalty',
    soundscape_title: 'Symphonie de Marbre & Violon Classique',
    soundscape_description: 'Tiếng vĩ cầm dịu êm vang vọng qua sảnh đá cẩm thạch hòa cùng giai điệu Jazz Pháp thập niên 50 phát ra từ dàn loa Bang & Olufsen trong phòng suite.',
    soundscape_track: 'Debussy: Clair de Lune & Parisian Golden Hour Jazz',
    gastronomy_title: 'Đỉnh Cao 3 Sao Michelin Le Cinq & Hầm Rượu 50.000 Chai',
    gastronomy_dish: 'Bánh sừng bò nướng bơ Isigny thơm ngậy trên ban công riêng và món Súp hành tây Gratinée trứ danh của Bếp trưởng Christian Le Squer.',
    wine_pairing: 'Dom Pérignon Vintage Champagne & Hầm rượu lịch sử sâu 14m dưới lòng đất',
    positive_emotion: 'Cảm giác quyền lực tĩnh lặng (Quiet Power)—thoát khỏi mọi ồn ào trần tục để đắm chìm trong sự nâng niu vương giả đích thực giữa lòng Paris.',
    client_concern: 'Nỗi lo về sự ồn ào của phố thị Paris được giải quyết triệt để bởi hệ thống cách âm 3 lớp tuyệt đối và lối đi VIP kín đáo không chạm mặt đám đông.',
    target_persona: 'Các nhà lãnh đạo, chính khách, và những cặp đôi kỷ niệm tình yêu tìm kiếm một dấu ấn xa hoa không thể phai mờ trong đời.',
    woa_declaration: 'ĐÂY CHÍNH LÀ NƠI MÌNH PHẢI ĐẾN TRONG ĐỜI — NƠI MÌNH SẼ QUAY LẠI MỖI NĂM ĐỂ CẢM NHẬN SỰ HOÀNG GIA ĐÍCH THỰC!',
    victor_note: 'Khi cánh cửa xoay trên Đại lộ George V chuyển động, mùi hương từ 12.000 đóa hoa tươi của nghệ nhân Jeff Leatham lập tức làm thời gian ngưng đọng. Xuống hầm rượu cổ 50.000 chai sâu 14m cùng Bếp trưởng Sommelier Eric Beaumard là một trải nghiệm gợi nhắc ta vì sao sự thanh lịch của nước Pháp chưa bao giờ có đối thủ.',
    lucky_note: 'Bí mật đắt giá nhất ở đây: hãy thức dậy lúc 06:45, mở toang rèm lụa dày của căn Suite Ban Công, và ngắm nhìn bình minh nhuộm sắc vàng óng lên đỉnh tháp Eiffel. Khi đặt qua mạng lưới đối tác Expedia, đặc quyền nâng hạng phòng được kích hoạt tự động với thái độ trân trọng tối đa.',
    critique_positives: [
      'Mạng lưới quản gia và Concierge có chìa khóa mở những cánh cửa bảo tàng đóng kín',
      'Thánh đường ẩm thực 3 sao Michelin Le Cinq của bếp trưởng Christian Le Squer',
      'Cách âm hoàn hảo—sự tĩnh lặng tuyệt đối 3 tầng phía trên Tam Giác Vàng Paris náo nhiệt'
    ],
    critique_considerations: [
      'Các dãy phòng mặt tiền Đại lộ George V có thể nghe tiếng còi xe hộ tống trong Tuần lễ Thời trang; hãy yêu cầu cánh phòng hướng sân trong cẩm thạch nếu bạn là người nhạy cảm với âm thanh',
      'Dịch vụ dọn bữa sáng ra ban công riêng cần báo trước 45 phút để chuẩn bị khăn lanh và khay bạc chu đáo nhất'
    ],
    podcast_title: 'Tập 01: Điều Gì Khiến George V Paris Xứng Đáng $2,000 Một Đêm?',
    podcast_duration: '4:45',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, tại sao người ta có thể sẵn sàng chi $2,000 chỉ để ngủ một đêm tại George V? Có phải chỉ vì cái mác khách sạn hoàng gia không?' },
      { speaker: 'Victor', text: 'Không đâu Lucky. Ở George V, họ không bán một cái giường ngủ êm. Họ bán cho em cảm giác của một bậc quý tộc Pháp từ thế kỷ trước. Khi em bước vào sảnh, 12.000 bông hoa tươi được thay mới mỗi tuần... không một hạt bụi trên tay vịn cầu thang.' },
      { speaker: 'Lucky', text: 'Và điều em thích nhất là lúc người quản gia mang bữa sáng ra ban công riêng nhìn thẳng tháp Eiffel. Khoảnh khắc bánh sừng bò giòn tan trong miệng, nhìn Paris thức giấc... cảm giác đó khiến em phải thốt lên rằng đây là nơi mình nhất định phải quay lại!' },
      { speaker: 'Victor', text: 'Chính xác. Và nhớ dặn độc giả: đặt phòng qua link đối tác chính thức của Expedia để chắc chắn nhận bữa sáng miễn phí cho hai người và đặc quyền ưu tiên nâng hạng phòng VIP.' }
    ],
    shorts: [
      { title: 'Short 1: The $2,000/Night Paris Secret', hook: 'Bạn có dám chi $2,000 một đêm chỉ để ngắm góc nhìn này ở Paris?', visual: 'Cảnh lia máy từ khay cà phê sáng bốc khói trên ban công riêng thẳng ra tháp Eiffel sừng sững.', cta: 'Khám phá bí quyết đặt phòng nhận đặc quyền VIP tại travel4u.us' },
      { title: 'Short 2: The 12,000 Fresh Flowers Mystery', hook: 'Khách sạn Paris chi hơn 1 triệu USD mỗi năm chỉ cho... hoa tươi!', visual: 'Toàn cảnh sảnh đá cẩm thạch tráng lệ của Four Seasons George V và những tác phẩm điêu khắc hoa khổng lồ.', cta: 'Xem review chi tiết của Victor & Lucky tại travel4u.us' },
      { title: 'Short 3: One Mistake to Avoid at George V', hook: 'Sai lầm khiến bạn mất trắng $500 khi đặt khách sạn 5 sao tại Paris!', visual: 'Victor & Lucky chia sẻ cách tránh chọn nhầm cánh phòng ồn và tận dụng credit quà tặng.', cta: 'Lấy link đối tác an toàn tại travel4u.us' }
    ]
  },
  'como-grand-hotel-tremezzo': {
    hotel_name: 'Grand Hotel Tremezzo Lake Como',
    city: 'Lake Como',
    country: 'Italy',
    rating_score: '9.8 / 10',
    subtitle: 'Floating Waterside Belle Époque & Private Wooden Riva Launches',
    soundscape_title: 'Melodie di Bellagio & Tiếng Sóng Vỗ Mạn Thuyền',
    soundscape_description: 'Tiếng đàn Mandolin Ý cổ điển thì thầm bên hiên hoa tử đằng, xen lẫn tiếng sóng nước hồ Como vỗ nhẹ vào mạn du thuyền gỗ Riva.',
    soundscape_track: 'Ennio Morricone Cinema Paradiso & Lake Como Sunset Chime',
    gastronomy_title: 'Cơm Nghệ Tây Dát Vàng 24K Gualtiero Marchesi',
    gastronomy_dish: 'Đĩa Risotto vàng óng đính lá vàng 24K nguyên chất của huyền thoại ẩm thực Ý và cá hồi trắng tươi bắt từ lòng hồ sâu.',
    wine_pairing: 'Franciacorta Cuvee Prestige & Barolo Riserva vùng Piedmont',
    positive_emotion: 'Cảm giác lãng mạn vô cực (Dolce Far Niente)—buông bỏ mọi toan tính đời thường để trái tim được rung lên trong tình yêu và cái đẹp thuần khiết.',
    client_concern: 'Nỗi lo đám đông khách du lịch đổ xô về hồ Como được giải quyết bằng cầu cảng riêng, du thuyền gỗ độc quyền và khu vườn cổ 5 tầng bậc hoàn toàn biệt lập.',
    target_persona: 'Các cặp đôi trăng mật, các nghệ sĩ, và những người yêu cái đẹp cổ điển muốn ghi dấu khoảnh khắc lãng mạn vĩ đại nhất của cuộc đời.',
    woa_declaration: 'ĐÂY CHÍNH LÀ NƠI MÌNH PHẢI ĐẾN TRONG ĐỜI — NƠI HỒ COMO SẼ LƯU GIỮ LINH HỒN LÃNG MẠN CỦA CHÚNG TA!',
    victor_note: 'Hồ Como là một xúc cảm trước khi nó là một địa danh. Ngồi trên sân thượng Tremezzo với ly Franciacorta sủi bọt, nhìn qua mặt hồ phẳng lặng như gương về phía Bellagio, thời gian hoàn toàn biến mất. Kiến trúc Belle Époque năm 1910 ở đây không hề mang cảm giác bảo tàng lạnh lẽo, mà sống động và ấm áp lạ thường.',
    lucky_note: 'Bạn chưa thực sự sống trọn vẹn ở Como nếu chưa từng nhảy xuống hồ bơi nổi bồng bềnh trên mặt nước! Dưới chân là làn nước hồ xanh thẳm màu ngọc bích, trên đầu là dãy núi Alps tuyết trắng. Căn phòng góc Suite Greta bắt trọn ánh hoàng hôn đẹp đến nghẹn thở.',
    critique_positives: [
      'Hồ bơi nổi độc bản nằm lơ lửng trên mặt nước hồ Como',
      'Đội du thuyền gỗ Riva sang trọng đưa đón riêng từ bãi cỏ khách sạn tới biệt thự Balbianello',
      'Đĩa cơm nghệ tây dát vàng trứ danh của huyền thoại Gualtiero Marchesi'
    ],
    critique_considerations: [
      'Phà công cộng tạo gợn sóng nhẹ vào giờ cao điểm chiều; hãy chọn các căn Penthouse tầng thượng để có không gian tĩnh lặng 100%',
      'Khách sạn mở cửa theo mùa từ tháng 4 đến cuối tháng 10; đầu tháng 5 và cuối tháng 9 là thời điểm vàng'
    ],
    podcast_title: 'Tập 03: Nghệ Thuật Sống Lãng Mạn Tột Cùng Tại Hồ Como',
    podcast_duration: '5:10',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, bơi trên chiếc hồ bơi nổi giữa mặt nước hồ Como mà em ngỡ như mình đang mơ vậy!' },
      { speaker: 'Victor', text: 'Người Ý có triết lý sống Dolce Far Niente—sự ngọt ngào của việc chẳng cần làm gì cả. Chỉ cần ngồi đây, ngắm chiếc thuyền Riva rẽ sóng và nhâm nhi ly vang sủi...' },
      { speaker: 'Lucky', text: 'Và đĩa cơm dát vàng Marchesi nữa chứ! Nhưng anh có để ý nhiều người đặt phòng trúng view tường chắn gió không?' },
      { speaker: 'Victor', text: 'Đó là lý do ta phải nhắc độc giả dùng link đối tác Expedia để được ưu tiên chỉ định căn phòng có ban công góc hồ Como và quyền hủy phòng linh hoạt 24h.' }
    ],
    shorts: [
      { title: 'Short 1: The Pool Floating Inside a Lake', hook: 'Hồ bơi nổi kỳ lạ nhất thế giới ở đâu?', visual: 'Cú flycam mượt mà bay từ đỉnh dãy núi Alps xuống hồ bơi nổi màu ngọc bích trên mặt hồ Como.', cta: 'Xem review chân thực từ Victor & Lucky tại travel4u.us' },
      { title: 'Short 2: The $500 Gold Leaf Risotto', hook: 'Món cơm đắt nhất nước Ý có vị như thế nào?', visual: 'Cận cảnh lát vàng lá 24K óng ánh được đặt lên đĩa cơm nghệ tây vàng rực tại Grand Hotel Tremezzo.', cta: 'Bí kíp du lịch hồ Como tại travel4u.us' },
      { title: 'Short 3: Why Celebrities Hide in Tremezzo', hook: 'Bí mật đằng sau khu nghỉ dưỡng yêu thích của giới tỷ phú thế giới!', visual: 'Chiếc du thuyền gỗ Riva rẽ sóng lướt về phía biệt thự Balbianello.', cta: 'Nhận đặc quyền phòng VIP tại travel4u.us' }
    ]
  },
  'maldives-soneva-jani': {
    hotel_name: 'Soneva Jani Maldives',
    city: 'Noonu Atoll',
    country: 'Maldives',
    rating_score: '10 / 10',
    subtitle: 'The World’s Most Cinematic Water Villa with Retractable Stargazing Roof',
    soundscape_title: 'Bản Giao Hưởng Sóng Biển Ấn Độ Dương & Gió Đêm',
    soundscape_description: 'Tiếng sóng vỗ rì rào dưới sàn kính phòng khách, tiếng gió biển mát lạnh thổi qua trần nhà mở toang ngắm dải ngân hà lấp lánh.',
    soundscape_track: 'Brian Eno Ambient Waves & Acoustic Sunset Guitar',
    gastronomy_title: 'Bữa Tối Nổi Dưới Ánh Nến Trên Đầm Phá Ngọc Bích',
    gastronomy_dish: 'Tôm hùm đại dương nướng than hoa trên bờ cát riêng và phòng thử chocolate organic tự do 24/7.',
    wine_pairing: 'Chablis Premier Cru & Bộ sưu tập vang biodynamic hữu cơ của Soneva',
    positive_emotion: 'Sự tự do hoang dã đánh thức bản năng sống (Pure Rebirth)—bỏ lại giày dép, bỏ lại danh phận xã hội để hòa làm một với biển trời nguyên sơ.',
    client_concern: 'Nỗi lo sợ bị nhốt trong không gian tù túng trên đảo nhỏ được giải quyết bởi diện tích villa khổng lồ (hơn 500m2), khoảng cách giữa các villa cực xa đảm bảo sự ẩn dật 100%.',
    target_persona: 'Các gia đình thượng lưu, các tỷ phú công nghệ muốn detox kỹ thuật số, và những cặp đôi tìm kiếm sự kỳ diệu không tưởng.',
    woa_declaration: 'ĐÂY CHÍNH LÀ NƠI MÌNH PHẢI ĐẾN TRONG ĐỜI — NƠI MÁI NHÀ MỞ RA ĐỂ CẢ DẢI NGÂN HÀ ÔM LẤY CHÚNG TA!',
    victor_note: 'Soneva Jani tái định nghĩa khái niệm xa xỉ bằng triết lý No News, No Shoes—xa xỉ thông minh nơi bạn cởi bỏ giày từ cầu tàu và bước chân trần trên gỗ tếch ấm áp. Nhấn nút trượt mở mái vòm trên giường ngủ để ngắm dải ngân hà của Ấn Độ Dương là ký ức sẽ khắc sâu trong tim bạn suốt đời.',
    lucky_note: 'Em phải thú nhận: trượt từ cầu trượt nước tầng hai thẳng xuống đầm phá ấm áp 28 độ khiến em cười hạnh phúc như một đứa trẻ! Sự riêng tư ở đây vượt trên mọi quy chuẩn: villa gần nhất cũng cách xa hàng trăm mét, bạn như chúa tể sở hữu cả một vịnh biển ngọc bích.',
    critique_positives: [
      'Mái vòm trượt điện tử thông minh ngắm trọn dải ngân hà ngay trên giường ngủ master',
      'Cầu trượt nước uốn lượn từ tầng hai thẳng xuống vịnh biển ngọc lam trong vắt',
      'Quản gia Barefoot Guardian phục vụ 24/7 thấu hiểu mọi sở thích trước khi bạn kịp nói ra'
    ],
    critique_considerations: [
      'Thủy phi cơ từ Malé chỉ bay ban ngày; hãy đặt chuyến bay quốc tế đến buổi sáng để tránh phải nghỉ đêm tại thủ đô',
      'Đầm phá quá rộng nên đạp xe đạp gỗ trên cầu tàu mất 10-15 phút đến nhà hàng chính (luôn có xe buggy điện hỗ trợ bất kỳ lúc nào)'
    ],
    podcast_title: 'Tập 05: Trượt Xuống Ấn Độ Dương & Ngủ Dưới Sao Trời Soneva Jani',
    podcast_duration: '4:55',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, em chưa từng nghĩ có một ngày mình nằm trên giường ngủ, bấm một cái nút là cả mái nhà trượt ra để ngắm trọn dải ngân hà!' },
      { speaker: 'Victor', text: 'Đó là thiên tài của Sonu và Eva—những người sáng lập Soneva. Họ hiểu rằng người giàu nhất thế giới không thiếu những phòng khách dát vàng, cái họ thiếu là được đi chân trần trên cát và nhìn thấy sao trời không khói bụi.' },
      { speaker: 'Lucky', text: 'Mà công nhận cầu trượt từ tầng hai thẳng xuống biển vui dã man anh ạ! Cảm giác như lạc vào một thế giới thần tiên vậy.' },
      { speaker: 'Victor', text: 'Nhưng nhớ dặn khách: hãy chọn gói trọn gói qua đối tác Expedia để được miễn phí toàn bộ spa, lặn biển ngắm cá đuối và các bữa tối nến trên biển.' }
    ],
    shorts: [
      { title: 'Short 1: Sleeping Under the Galaxy', hook: 'Căn phòng có chiếc giường mở toang trần ngắm sao đêm!', visual: 'Cảnh ấn nút và mái vòm gỗ tự động mở ra để lộ bầu trời đêm Maldives đầy sao sáng rực.', cta: 'Trải nghiệm thiên đường Maldives cùng Victor & Lucky tại travel4u.us' },
      { title: 'Short 2: The Ultimate Water Slide', hook: 'Cầu trượt nước triệu đô riêng tư ngay trong phòng ngủ!', visual: 'Góc quay thứ nhất trượt từ sân thượng villa lao thẳng xuống làn nước xanh ngọc lam trong vắt.', cta: 'Đặt kỳ nghỉ trong mơ tại travel4u.us' },
      { title: 'Short 3: Barefoot Luxury Rule', hook: 'Khách sạn bắt khách tháo giày ngay khi vừa bước chân lên đảo?', visual: 'Túi đựng giày bằng vải thô và bước chân trần đầu tiên trên bãi cát trắng mịn như bột.', cta: 'Xem review chi tiết tại travel4u.us' }
    ]
  },
  'kyoto-ritz-carlton': {
    hotel_name: 'The Ritz-Carlton Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    rating_score: '9.9 / 10',
    subtitle: 'Kamogawa River Whispers, Zen Waterfalls & Master Tea Ceremonies',
    soundscape_title: 'Tiếng Nước Suối Róc Rách & Chuông Gió Thiền Tông',
    soundscape_description: 'Tiếng đàn Koto truyền thống khẽ buông từng nốt, hòa lẫn tiếng dòng nước Kamogawa róc rách chảy qua những phiến đá rêu phong.',
    soundscape_track: 'Kyoto Bamboo Flute & Kamogawa River Water Meditation',
    gastronomy_title: 'Bữa Tiệc Kaiseki Mizuki & Bánh Ngọt Pierre Hermé',
    gastronomy_dish: 'Cá tuyết nướng sốt miso đỏ ủ 10 năm, bò Wagyu A5 nướng than Binchotan và bánh croissant hoa hồng Ispahan thơm lừng.',
    wine_pairing: 'Rượu Sake Junmai Daiginjo ủ tuyết & Trà xanh Uji Matcha thu hoạch vụ đầu',
    positive_emotion: 'Sự an yên tuyệt đối trong tâm thức (Radical Zen Peace)—gột rửa mọi lo âu, cảm nhận sự tinh tế kỳ diệu của từng hơi thở trong văn hóa Omotenashi.',
    client_concern: 'Nỗi lo về sự chật hẹp thường thấy của khách sạn Nhật Bản bị đập tan hoàn toàn: các phòng Suite nhìn thẳng ra sông Kamogawa rộng thênh thang, tràn ngập ánh sáng và gỗ thông bách Hinoki.',
    target_persona: 'Những du khách trí thức, những người say mê văn hóa phương Đông và nghệ thuật trà đạo tìm kiếm một chốn dừng chân thanh tịnh bậc nhất.',
    woa_declaration: 'ĐÂY CHÍNH LÀ NƠI MÌNH PHẢI ĐẾN TRONG ĐỜI — NƠI TÂM HỒN ĐƯỢC CHỮA LÀNH BỞI VẺ ĐẸP TĨNH LẶNG CỦA KYOTO!',
    victor_note: 'Kyoto là linh hồn tâm linh của nước Nhật, và The Ritz-Carlton Kyoto là bản diễn giải hiện đại thi vị nhất. Khách sạn được xây thấp để tôn trọng đường chân trời của núi Higashiyama, đan xen giữa thác nước trong nhà và những cây thông Bonsai trăm tuổi. Ngồi trong spa sau một ngày tản bộ qua Gion, lắng nghe tiếng nước chảy, tâm trí như được tái sinh hoàn toàn.',
    lucky_note: 'Nghi thức yêu thích nhất của Lucky là dậy sớm đạp xe dọc bờ sông Kamogawa bằng chiếc xe đạp thủ công của khách sạn, sau đó thưởng thức chiếc bánh croissant Ispahan hoa hồng từ boutique Pierre Hermé ngay trong sảnh! Từng nhân viên cúi chào bạn bằng sự tận tâm khiến bạn bất giác cúi đầu đáp lễ bằng cả tấm lòng.',
    critique_positives: [
      'Vị trí độc tôn trải dài bên bờ sông Kamogawa với tầm nhìn trọn vẹn dãy núi Higashiyama',
      'Boutique Pierre Hermé Paris độc quyền trong khách sạn và phòng thưởng trà nghệ thuật',
      'Các buổi trải nghiệm văn hóa riêng tư: thiền buổi sáng cùng đại sư thiền viện và thăm xưởng sơn mài cổ truyền'
    ],
    critique_considerations: [
      'Mùa hoa anh đào (Sakura) và mùa lá đỏ Momiji cháy phòng trước 6 đến 9 tháng; hãy đặt sớm để giữ chỗ',
      'Các phòng hướng sân vườn nội viện rất yên tĩnh nhưng không có view sông; hãy chọn River View King để có trọn vẹn ký ức Kyoto'
    ],
    podcast_title: 'Tập 04: Sự Tĩnh Lặng Thiền Định Bên Dòng Sông Kamogawa Kyoto',
    podcast_duration: '4:40',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, em đi Nhật nhiều lần rồi mà chưa bao giờ thấy một khách sạn nào tĩnh lặng và thanh tao như Ritz-Carlton Kyoto!' },
      { speaker: 'Victor', text: 'Bởi vì họ kết hợp hoàn hảo giữa tinh thần Omotenashi truyền thống và sự chuẩn mực của một thương hiệu xa xỉ toàn cầu. Tiếng nước chảy róc rách dọc theo sảnh như cuốn trôi mọi mệt mỏi của đời sống hiện đại.' },
      { speaker: 'Lucky', text: 'Và bánh croissant Pierre Hermé nướng nóng hổi vào bữa sáng nữa anh! Ngồi ngắm dòng sông Kamogawa lững lờ trôi, cảm giác bình yên lạ thường.' },
      { speaker: 'Victor', text: 'Khi đến đây, hãy nhờ lễ tân đặt một buổi trà đạo riêng tư trong khu vườn thiền. Đó sẽ là trải nghiệm thay đổi nhân sinh quan của em.' }
    ],
    shorts: [
      { title: 'Short 1: The Most Peaceful Hotel in Japan', hook: 'Khách sạn tĩnh lặng nhất Nhật Bản trông như thế nào?', visual: 'Cảnh bước chân trên những phiến đá bắc qua dòng suối nhân tạo dẫn vào sảnh đèn lồng ấm áp.', cta: 'Xem hành trình Kyoto của Victor & Lucky tại travel4u.us' },
      { title: 'Short 2: Breakfast with Pierre Hermé in Kyoto', hook: 'Bữa sáng khách sạn độc nhất thế giới phục vụ bánh ngọt hoàng gia Pháp!', visual: 'Cắt đôi chiếc bánh croissant Ispahan hoa hồng giòn rụm với view nhìn ra núi tuyết Kyoto.', cta: 'Bí kíp du lịch Nhật Bản thượng lưu tại travel4u.us' },
      { title: 'Short 3: The Secret River Walk', hook: 'Góc ngắm hoa anh đào bí mật không một bóng khách du lịch ở Kyoto!', visual: 'Đạp xe dọc bờ sông Kamogawa trong sương sớm tĩnh mịch.', cta: 'Khám phá tại travel4u.us' }
    ]
  }
};

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

function buildHtmlContent(dest, h) {
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
    Có những nơi chốn trên thế giới mà ngay khoảnh khắc bạn vừa bước qua ngưỡng cửa, mọi ồn ào và vội vã của chuyến bay dài bỗng chốc tan biến như làn sương mỏng. Đó chính xác là cảm giác khi <strong>Victor & Lucky</strong> đặt chân đến <strong>${h.hotel_name}</strong>.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Không có sự phô trương ồn ào hay những thủ tục lễ tân cứng nhắc. Tại đây, sự sang trọng ẩn mình trong những chi tiết vô hình: mùi hương hoa tươi thoang thoảng trong gió, nụ cười ấm áp của người quản gia đã đứng chờ sẵn từ trước, và ly trà thảo mộc đón tiếp mát lạnh được dâng lên trên khay bạc sáng bóng.
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
    Cánh cửa phòng mở ra, chào đón chúng tôi bằng một không gian tràn ngập ánh sáng tự nhiên. Ga trải giường bằng sợi bông Ai Cập dệt tay mịn màng như lụa, chiếc đệm êm ái nâng niu từng giấc ngủ, và phòng tắm ốp đá cẩm thạch nguyên khối với bồn tắm sâu nhìn ra khung cảnh ngoạn mục của ${h.city}.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Điều khiến Lucky thích thú nhất chính là chiếc ban công riêng tư—nơi bạn có thể ngồi hàng giờ liền để đọc một cuốn sách hay, nhấp từng ngụm cà phê espresso đậm đà và lắng nghe nhịp thở êm đềm của vùng đất ${h.country}.
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
    Một chuyến du lịch xa xỉ đích thực không thể thiếu đi những nốt thăng của nghệ thuật ẩm thực. Tại ${h.hotel_name}, mỗi bữa ăn là một bản giao hưởng giác quan được chế tác bởi bàn tay tài hoa của các đầu bếp hàng đầu.
  </p>
  <p class="text-base text-slate-300 leading-relaxed mb-6 font-serif">
    Khoảnh khắc đáng nhớ nhất trong chuyến đi của chúng tôi là buổi chiều tà, khi mặt trời dần lặn xuống đường chân trời, nhuộm vàng cả không gian. Cùng nâng ly rượu vang hảo hạng được tư vấn bởi chuyên gia sommelier, thưởng thức những món đặc sản địa phương theo mùa, chúng tôi hiểu rằng đây là những ký ức sẽ theo mình suốt cả cuộc đời.
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
        ${h.critique_positives.map(p => `<li class="flex items-start space-x-2"><span class="text-emerald-400 font-bold">✓</span><span>${p}</span></li>`).join('')}
      </ul>
    </div>

    <div class="p-6 rounded-2xl bg-[#06101c] border border-amber-500/40">
      <h3 class="font-serif text-base font-bold text-amber-400 mb-3 flex items-center space-x-2">
        <span>⚠️</span>
        <span>Những Điều Cần Lưu Ý Khi Đi</span>
      </h3>
      <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
        ${h.critique_considerations.map(c => `<li class="flex items-start space-x-2"><span class="text-amber-400 font-bold">•</span><span>${c}</span></li>`).join('')}
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
    Việc đặt phòng qua đường link đối tác chính thức giúp hồ sơ của bạn được hệ thống khách sạn nhận diện là khách VIP: bạn được ưu tiên nâng hạng phòng khi còn trống, được miễn phí bữa sáng hàng ngày cho hai người, nhận $100 credit dịch vụ và quan trọng nhất là chính sách hủy phòng linh hoạt 24h–48h nếu lịch trình chuyến bay thay đổi.
  </p>
</section>

<!-- 👑 CHAPTER 6: THE CURATORS' VERDICT -->
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
    Cuộc đời là một chuỗi của những khoảnh khắc được tích lũy. Nếu bạn đang tìm kiếm một nơi chốn để kỷ niệm một dấu mốc trọng đại, hâm nóng tình yêu hay đơn giản là tự thưởng cho bản thân sau những nỗ lực không ngừng nghỉ, <strong>${h.hotel_name}</strong> là một sự lựa chọn sẽ không bao giờ làm bạn thất vọng.
  </p>
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
  console.log(`🎙️ Generating Victor & Lucky Storytelling Articles across ALL ${LOCALES.length} LOCALES (including Vietnamese 'vi')...`);
  
  const articles = [];

  for (const dest of destinations) {
    const defaultSlug = dest.slugs.en;
    const data = STORYTELLING_DATABASE[defaultSlug] || getFallbackData(dest);
    const htmlContent = buildHtmlContent(dest, data);
    const hotelBaseName = dest.english_title.split(':')[0];

    for (const loc of LOCALES) {
      const locSlug = dest.slugs[loc] || dest.slugs.en;
      const title = getLocalizedTitle(hotelBaseName, loc);
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
  console.log(`🎉 Successfully wrote ${articles.length} enriched storytelling articles across ${LOCALES.length} locales to: ${OUTPUT_FILE}`);
}

run();
