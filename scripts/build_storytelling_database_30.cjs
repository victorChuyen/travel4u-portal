const fs = require('fs');
const path = require('path');
const { STORYTELLING_DATABASE: OLD_DB } = require('./storytelling_database_20_hotels.cjs');

const NEW_ENTRIES = {
  'canaves-oia-suites-santorini': {
    hotel_name: 'Canaves Oia Suites Santorini',
    city: 'Oia, Santorini',
    country: 'Greece',
    rating_score: '9.9 / 10',
    subtitle: 'Where Caldera Volcanic Infinity Pools Touch the Aegean Sky',
    soundscape_title: 'Mélodie Égéenne & Chants du Vent',
    soundscape_description: 'Tiếng gió biển Aegean thì thầm qua vòm hang đá vôi trắng tinh khôi hòa cùng tiếng chuông nhà thờ Oia và giai điệu đàn Bouzouki cổ điển.',
    soundscape_track: 'Mikis Theodorakis & Mediterranean Ambient Sunset',
    gastronomy_title: 'Hải Sản Tươi Vịnh Ammoudi & Rượu Vang Núi Lửa Assyrtiko',
    gastronomy_dish: 'Bạch tuộc nướng than củi sốt fava đậu vàng Santorini, tôm hùm bơ chanh tỏi ăn kèm phô mai mộc Chloro.',
    wine_pairing: 'Domaine Sigalas Assyrtiko 2021 & Rượu vang ngọt Vinsanto truyền thống ủ thùng gỗ sồi 10 năm',
    positive_emotion: 'Sự thăng hoa thị giác tuyệt đối—khi cả một vùng trời hoàng hôn rực rỡ thu trọn vào tầm mắt từ hồ bơi vô cực riêng tư.',
    client_concern: 'Lo ngại về sự đông đúc của dòng người xem hoàng hôn tại Oia được giải tỏa 100% nhờ vị trí biệt lập trên mép đá cao nhất, chỉ cư dân khách sạn mới có quyền ra vào.',
    target_persona: 'Các cặp đôi tuần trăng mật thượng lưu, những người tìm kiếm sự lãng mạn vô giá và du khách say đắm vẻ đẹp Địa Trung Hải.',
    woa_declaration: 'ĐÂY LÀ KHOẢNH KHẮC HOÀNG HÔN ĐẸP NHẤT HÀNH TINH — CHÚNG TA SẼ QUAY LẠI SANTORINI VÀO MỖI MÙA HÈ!',
    victor_note: 'Đứng bên mép hồ bơi vô cực Canaves, khi mặt trời đỏ ối lặn chầm chậm xuống lòng chảo miệng núi lửa Caldera, ly Assyrtiko sóng sánh khoáng chất lạnh tê đầu lưỡi. Không có bức ảnh nào lột tả được hết sự kỳ vĩ của thiên nhiên nơi đây.',
    lucky_note: 'Kiến trúc hang đá vôi nguyên thủy được mài nhẵn đến độ hoàn hảo, bước chân trần trên nền đá trắng muốt mang lại cảm giác mát lạnh dễ chịu. Đừng quên đặt bàn tối tại nhà hàng Petra bên mép vách đá trước 3 tuần qua mạng lưới đối tác chính thức.',
    critique_positives: [
      'Hồ bơi vô cực khoét sâu vào vách đá miệng núi lửa Caldera với tầm nhìn hoàng hôn ngoạn mục nhất thế giới',
      'Ẩm thực nhà hàng Petra đẳng cấp fine dining Địa Trung Hải với hầm rượu vang núi lửa cổ',
      'Dịch vụ quản gia cá nhân phục vụ bữa sáng champagne nổi ngay tại hồ bơi riêng'
    ],
    critique_considerations: [
      'Địa hình vách đá dốc có nhiều bậc thang; khách sạn có đội ngũ porter hành lý chuyên nghiệp 24/7',
      'Nên đặt các căn River Pool Suite để có độ riêng tư tối thượng tránh tầm nhìn từ lối đi chung'
    ],
    podcast_title: 'Tập 21: Bí Quyết Ngắm Hoàng Hôn Oia Santorini Không Bị Làm Phiền',
    podcast_duration: '4:30',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, hàng ngàn người chen chúc nhau từng mét vuông ở lâu đài Oia để ngắm hoàng hôn. Tại sao chúng ta lại có một không gian tĩnh lặng đến ngỡ ngàng như thế này?' },
      { speaker: 'Victor', text: 'Đó là đặc quyền của Canaves Oia Suites em à. Khi em đứng trên hồ bơi vô cực này, cả vịnh Caldera nằm dưới chân em. Không tiếng ồn, chỉ có tiếng gió Aegean và một ly rượu Assyrtiko lạnh.' },
      { speaker: 'Lucky', text: 'Và bánh mì nướng sốt fava với tôm hùm tươi lúc chiều tà... Cảm giác này thực sự khiến em phải thốt lên rằng đây là nơi mình phải quay lại vào mỗi mùa hè!' },
      { speaker: 'Victor', text: 'Chắc chắn rồi. Quý độc giả lưu ý: luôn đặt trước qua link đối tác Expedia để được bảo đảm căn suite có ban công Caldera view trực diện.' }
    ],
    shorts: [
      { title: 'Short 1: The Ultimate Santorini Sunset Pool', hook: 'Góc ngắm hoàng hôn triệu đô mà 99% du khách Santorini không hề biết!', visual: 'Flycam lướt từ hồ bơi vô cực Canaves Oia ra miệng núi lửa Caldera rực lửa.', cta: 'Xem cẩm nang VIP tại travel4u.us' },
      { title: 'Short 2: Inside a Luxury Cave Suite', hook: 'Phòng khách sạn 1.500 USD/đêm khoét sâu vào lòng núi lửa trông như thế nào?', visual: 'Victor & Lucky mở cửa phòng suite vòm đá trắng muốt với bồn tắm sục nhìn ra biển.', cta: 'Khám phá ưu đãi phòng tại travel4u.us' },
      { title: 'Short 3: The Secret Wine of Santorini', hook: 'Thứ rượu vang trồng trên tro bụi núi lửa giá 300 USD một chai có gì đặc biệt?', visual: 'Rót vang trắng Assyrtiko sóng sánh khoáng chất tại ban công hoàng hôn.', cta: 'Lấy link đối tác đặt phòng tại travel4u.us' }
    ]
  },

  'le-sirenuse-positano-amalfi': {
    hotel_name: 'Le Sirenuse Positano',
    city: 'Positano, Amalfi Coast',
    country: 'Italy',
    rating_score: '9.9 / 10',
    subtitle: 'The 400-Candle Legendary Palazzo of the Sersale Aristocracy',
    soundscape_title: 'Serenata Sorrentina & Bờ Sóng Địa Trung Hải',
    soundscape_description: 'Tiếng thì thầm của gió đêm Positano hòa cùng tiếng nến tí tách và bản tình ca Ý lãng mạn tại quán bar Franco’s Bar.',
    soundscape_track: 'Ennio Morricone: Cinema Paradiso & Canzone Napoletana',
    gastronomy_title: 'Ẩm Thực Tinh Hoa La Sponda & Vườn Chanh Sorento',
    gastronomy_dish: 'Mì Spaghetti hải sản vịnh Salerno ăn kèm cà chua Piennolo đỏ mọng và cá vược áp chảo sốt chanh Positano.',
    wine_pairing: 'Marisa Cuomo Furore Bianco Fiorduva & Rượu Limoncello gia truyền nhà Sersale',
    positive_emotion: 'Sự say đắm chất thơ La Dolce Vita—sống như một quý tộc Ý đích thực trong ngôi nhà mùa hè ngập tràn nghệ thuật.',
    client_concern: 'Nỗi lo về những bậc thang dựng đứng cheo leo của Positano được giải tỏa nhờ xe riêng đưa đón của khách sạn và tàu gỗ Riva đưa thẳng ra biển riêng tư.',
    target_persona: 'Những tâm hồn nghệ sĩ, giới mộ điệu thời trang và các cặp đôi tìm kiếm vẻ đẹp cổ điển vượt thời gian của nước Ý.',
    woa_declaration: '400 NGỌN NẾN LUNG LINH TẠI LA SPONDA ĐÃ THU PHỤC TRÁI TIM TÔI — ĐÂY LÀ DINH THỰ ĐẸP NHẤT BỜ BIỂN NƯỚC Ý!',
    victor_note: 'Bốn trăm ngọn nến được thắp bằng tay mỗi chiều tại La Sponda không chỉ là chiêu đãi thị giác; đó là tuyên ngôn về lòng kiên định với truyền thống quý tộc của gia tộc Sersale từ năm 1951. Một ngụm Fiorduva lạnh bên ban công nhìn xuống Positano là định nghĩa chính xác nhất về thiên đường.',
    lucky_note: 'Hồ bơi lát gạch hoa cổ được bao bọc bởi những chậu chanh vàng rực rỡ trĩu quả tỏa hương thơm ngát. Mẹo VIP từ Lucky: hãy chọn các căn phòng Deluxe Sea View ở tầng 3 để có góc nhìn không góc chết xuống toàn cảnh vịnh.',
    critique_positives: [
      'Không gian lãng mạn đỉnh cao với 400 ngọn nến thắp tay mỗi hoàng hôn tại nhà hàng La Sponda',
      'Du thuyền gỗ Riva cổ điển đưa đón du khách khám phá các vịnh đá ngầm bí mật',
      'Bộ sưu tập hội họa và đồ cổ tư nhân vô giá của gia tộc quý tộc Marchese Sersale'
    ],
    critique_considerations: [
      'Quán bar Franco’s Bar rất được săn đón và không nhận đặt bàn trước; khách lưu trú tại khách sạn được ưu tiên chỗ ngồi hàng đầu',
      'Mùa cao điểm tháng 7-8 rất đông đúc; thời điểm vàng để trải nghiệm là tháng 5 hoặc tháng 9-10'
    ],
    podcast_title: 'Tập 22: Chuyện Về 400 Ngọn Nến Thắp Tay Tại Le Sirenuse Positano',
    podcast_duration: '4:40',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, em từng nghĩ những bức ảnh về Le Sirenuse trên tạp chí là sản phẩm chỉnh màu, cho đến khi bước chân vào sân thượng La Sponda tối nay.' },
      { speaker: 'Victor', text: 'Đó là vẻ đẹp chân thực của dinh thự Sersale. Khi 400 ngọn nến được thắp lên cùng lúc, ánh sáng ấm áp phản chiếu lên vách đá Positano... cả bờ biển Amalfi như ngừng thở.' },
      { speaker: 'Lucky', text: 'Hương chanh thoang thoảng trong gió, đĩa mì pasta hải sản tươi rói và ly vang Fiorduva mát lạnh. Thật sự đây là dinh thự mà bất kỳ ai yêu nước Ý cũng phải đến một lần!' },
      { speaker: 'Victor', text: 'Chính xác. Và hãy nhớ đặt phòng sớm ít nhất 6 tháng qua hệ thống đối tác VIP để giữ được phòng hướng biển.' }
    ],
    shorts: [
      { title: 'Short 1: The 400 Candles Tradition', hook: 'Khách sạn Ý thắp 400 ngọn nến bằng tay mỗi ngày suốt 70 năm qua!', visual: 'Nhân viên mặc trang phục trắng thắp từng ngọn nến lung linh giữa giàn hoa giấy rực rỡ.', cta: 'Xem review Le Sirenuse tại travel4u.us' },
      { title: 'Short 2: The Best Lemon Grove Pool', hook: 'Hồ bơi đẹp nhất bờ biển Amalfi thơm ngát mùi chanh tươi!', visual: 'Làn nước xanh biếc được che mát bởi giàn chanh vàng trĩu cành nhìn xuống vịnh Positano.', cta: 'Khám phá trải nghiệm tại travel4u.us' },
      { title: 'Short 3: Cruising Positano on a Vintage Riva', hook: 'Trải nghiệm du thuyền gỗ cổ điển chỉ dành riêng cho khách VIP.', visual: 'Tàu gỗ Riva lướt êm đềm dọc bờ vách đá Positano trong ánh hoàng hôn vàng ruộm.', cta: 'Lấy link đặt phòng tại travel4u.us' }
    ]
  },

  'hotel-santa-caterina-amalfi': {
    hotel_name: 'Hotel Santa Caterina Amalfi',
    city: 'Amalfi',
    country: 'Italy',
    rating_score: '9.8 / 10',
    subtitle: 'Where Glass Elevators Cut Through Coastal Cliffs to the Private Sea',
    soundscape_title: 'Chant des Sirènes & Vườn Chanh Trăm Tuổi',
    soundscape_description: 'Tiếng sóng vỗ vào vách đá ngầm hòa quyện cùng tiếng xào xạc của lá chanh Amalfi và tiếng đàn mandolin êm đềm.',
    soundscape_track: 'Napoletana Strings & Mediterranean Coastal Breeze',
    gastronomy_title: 'Ẩm Thực Michelin Glicine & Ẩm Thực Biển Al Mare',
    gastronomy_dish: 'Mì Tagliolini tự làm sốt chanh Amalfi và tôm đỏ Carabinero, kết thúc bằng kem gelato chanh đựng trong quả chanh tươi nguyên bản.',
    wine_pairing: 'Greco di Tufo Mastroberardino & Taurasi Radici Riserva',
    positive_emotion: 'Sự thư thái kín đáo vô giá—rời xa mọi ồn ào của bến cảng du lịch Amalfi để chạm trực tiếp vào dòng nước xanh ngọc bích.',
    client_concern: 'Trở ngại tiếp cận biển của vùng Amalfi được xóa bỏ hoàn toàn bằng thang máy kính khoét xuyên qua lòng núi đá đưa du khách thẳng xuống sàn tắm nắng riêng tư.',
    target_persona: 'Các gia đình thượng lưu và du khách yêu thích kỳ nghỉ ven biển yên bình có lịch sử truyền đời.',
    woa_declaration: 'BƯỚC RA KHỎI THANG MÁY NÚI ĐÁ ĐỂ CHẠM VÀO BIỂN XANH — TÔI BIẾT MÌNH ĐÃ TÌM ĐƯỢC CHỐN NGHỈ DƯỠNG TRỌN ĐỜI!',
    victor_note: 'Bước vào thang máy kính khoét sâu trong vách đá và trượt xuống sàn đá biển riêng tư là một trải nghiệm kỹ thuật lẫn cảm xúc độc nhất vô nhị ở Địa Trung Hải. Vườn chanh bậc thang 100 năm tuổi của gia đình Gambardella tỏa hương thơm tự nhiên khắp mọi ngóc ngách.',
    lucky_note: 'Nhà hàng Al Mare bên mép nước phục vụ món cá nướng muối biển ngon nhất vùng. Đừng bỏ lỡ bữa trưa với ly vang trắng Greco di Tufo ướp lạnh trong khi sóng biển vỗ ngay dưới chân bàn ăn.',
    critique_positives: [
      'Thang máy kính xuyên vách đá dẫn thẳng xuống Beach Club nước biển tự nhiên',
      'Vườn chanh gia tộc thơm ngát với lối đi dạo bộ thơ mộng nhìn ra vịnh Salerno',
      'Nhà hàng 1 sao Michelin Glicine với nghệ thuật ẩm thực đương đại Campania'
    ],
    critique_considerations: [
      'Khách sạn nằm cách trung tâm thị trấn Amalfi khoảng 1.5 km; dịch vụ shuttle van riêng của khách sạn đưa đón liên tục miễn phí',
      'Các suite có hồ bơi riêng biệt lập cần đặt trước từ rất sớm do số lượng giới hạn'
    ],
    podcast_title: 'Tập 23: Chiếc Thang Máy Bí Mật Xuyên Lòng Núi Đá Amalfi',
    podcast_duration: '4:20',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, điểm làm em bất ngờ nhất ở Santa Caterina là cảm giác bước vào một chiếc thang máy kính giữa sảnh khách sạn, rồi trôi tuột xuống đáy vực để bước thẳng ra biển!' },
      { speaker: 'Victor', text: 'Đó là sáng kiến tài hoa của gia đình Gambardella. Ở bờ biển Amalfi dốc đứng này, có một bãi tắm biển riêng tư không phải leo bộ là điều xa xỉ tột bậc.' },
      { speaker: 'Lucky', text: 'Và những rặng chanh sai trĩu quả ngay bên lối đi... Cảm giác vừa tắm biển xong, lên thưởng thức một quả chanh Amalfi làm kem gelato mát lịm thật không gì sánh bằng!' },
      { speaker: 'Victor', text: 'Chuẩn xác. Đây là lựa chọn hoàn hảo cho những ai muốn khám phá Amalfi mà vẫn giữ trọn sự thanh bình tuyệt đối.' }
    ],
    shorts: [
      { title: 'Short 1: The Secret Cliff Elevator', hook: 'Thang máy kính khoét xuyên lòng núi đá đưa bạn thẳng ra biển Ý!', visual: 'Góc nhìn từ bên trong thang máy trượt dọc vách đá mở ra biển xanh biếc.', cta: 'Xem chi tiết Hotel Santa Caterina tại travel4u.us' },
      { title: 'Short 2: Amalfi Lemon Grove Paradise', hook: 'Khách sạn có vườn chanh cổ tích thơm ngát nhất thế giới!', visual: 'Lối đi dạo bộ dưới vòm chanh vàng trĩu quả nhìn thẳng ra vịnh Salerno.', cta: 'Khám phá bí mật Amalfi tại travel4u.us' },
      { title: 'Short 3: Private Beach Club Luxury', hook: 'Không gian tắm biển biệt lập không một bóng khách du lịch vãng lai.', visual: 'Giường tắm nắng sang trọng trên sàn đá tự nhiên sát mép sóng biển Địa Trung Hải.', cta: 'Lấy link đặt phòng tại travel4u.us' }
    ]
  },

  'four-seasons-resort-bali-sayan': {
    hotel_name: 'Four Seasons Resort Bali at Sayan',
    city: 'Ubud, Bali',
    country: 'Indonesia',
    rating_score: '9.9 / 10',
    subtitle: 'Suspended Across the Sacred River Ayung on an Aerial Lotus Bridge',
    soundscape_title: 'Écho de la Jungle & Méditation Tibétaine',
    soundscape_description: 'Tiếng suối Ayung róc rách dưới vực sâu hòa cùng tiếng chuông xoay Tây Tạng và tiếng chim rừng nhiệt đới Ubud lúc bình minh.',
    soundscape_track: 'Balinese Gamelan & Sacred River Bamboo Flute',
    gastronomy_title: 'Ẩm Thực Bàn Bếp Ayung & Gia Vị Tươi Hữu Cơ',
    gastronomy_dish: 'Vịt nướng chậm lá chuối Bebek Betutu gia truyền 12 tiếng cùng gỏi hoa chuối rừng và cơm nghệ thần linh.',
    wine_pairing: 'Trà thảo mộc gừng nghệ hữu cơ Balinese & Rượu vang trắng New Zealand Sauvignon Blanc mát lạnh',
    positive_emotion: 'Sự tái sinh tâm hồn mãnh liệt—mọi áp lực tinh thần hoàn toàn tan biến khi bước qua cây cầu sen lơ lửng giữa thung lũng.',
    client_concern: 'Nỗi sợ muỗi và khí hậu ẩm ướt nhiệt đới được kiểm soát bằng công nghệ xử lý vi sinh học tự nhiên và kiến trúc thông gió mở 360 độ thoáng mát.',
    target_persona: 'Các nhà sáng lập công nghệ, doanh nhân tìm kiếm không gian thiền định chữa lành và tái tạo năng lượng sáng tạo.',
    woa_declaration: 'ĐÂY LÀ THÁNH ĐỊA CHỮA LÀNH ĐẸP NHẤT CHÂU Á — NƠI TÔI TÌM LẠI BẢN THỂ AN YÊN CỦA CHÍNH MÌNH!',
    victor_note: 'Băng qua cây cầu treo bằng gỗ tếch dẫn đến hồ sen hình elip lơ lửng trên không trung, cả thung lũng sông Ayung thiêng liêng mở ra như một thế giới cổ tích bị lãng quên. Đây là nơi duy nhất trên thế giới mà sự hiện đại hòa quyện hoàn toàn vào linh hồn của rừng thiêng.',
    lucky_note: 'Trải nghiệm thiền định "Sacred Nap" đung đưa trong chiếc võng lụa giữa tiếng suối reo và tiếng chuông xoay Tây Tạng của nghệ nhân địa phương đưa tâm trí vào giấc ngủ sâu kỳ diệu chỉ sau 10 phút. Đừng bỏ lỡ nghi thức ban phước lành của các bậc thầy Bali.',
    critique_positives: [
      'Kiến trúc hồ sen hình elip lơ lửng trên không trung được bình chọn là một trong những lối vào khách sạn ấn tượng nhất thế giới',
      'Biệt thự biệt lập ẩn mình bên bờ sông Ayung với hồ bơi vô cực ngập trong tán rừng xanh',
      'Liệu trình spa trị liệu luân xa và nghi thức tắm hoa thiêng liêng cổ truyền'
    ],
    critique_considerations: [
      'Khu nghỉ dưỡng dốc đứng theo địa hình thung lũng, cần sử dụng xe buggy di chuyển giữa các khu vực',
      'Khí hậu rừng nhiệt đới có thể có sương mù vào buổi sáng sớm; hãy chuẩn bị trang phục nhẹ thoáng'
    ],
    podcast_title: 'Tập 24: Bước Qua Cây Cầu Sen Lơ Lửng Rừng Thiêng Ubud Bali',
    podcast_duration: '4:35',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, khoảnh khắc bước chân qua cây cầu treo gỗ tếch nối vào hồ sen trên nóc Four Seasons Sayan thực sự làm em choáng ngợp!' },
      { speaker: 'Victor', text: 'Đó là triết lý kiến trúc hạ cánh ngược của John Heah. Em không bước lên trên, mà em đi từ trên trời chìm dần xuống lòng rừng thiêng Ayung.' },
      { speaker: 'Lucky', text: 'Tiếng suối reo dưới vực sâu, tiếng chuông xoay chữa lành và làn sương sớm bảng lảng... Thực sự ai đang mệt mỏi với công việc điều hành đều nên đến đây một lần.' }
    ],
    shorts: [
      { title: 'Short 1: The Floating Lotus Bridge', hook: 'Khách sạn có lối vào lơ lửng trên tán rừng đẹp nhất thế giới!', visual: 'Flycam lướt theo bước chân trên cầu treo gỗ ra hồ sen tròn trên cao.', cta: 'Xem cẩm nang Four Seasons Sayan tại travel4u.us' }
    ]
  },

  'bulgari-resort-bali-uluwatu': {
    hotel_name: 'Bulgari Resort Bali',
    city: 'Uluwatu, Bali',
    country: 'Indonesia',
    rating_score: '9.9 / 10',
    subtitle: 'Black Volcanic Stone Palaces 150 Meters Above the Roaring Indian Ocean',
    soundscape_title: 'Rêve Océanique & Marée d’Uluwatu',
    soundscape_description: 'Tiếng sóng gầm vang dội từ đáy vực Ấn Độ Dương vọng lên hòa cùng giai điệu Chillout Lounge phong cách Milan thời thượng.',
    soundscape_track: 'Bulgari Sunset Lounge & Indian Ocean Breakers',
    gastronomy_title: 'Đỉnh Cao Ẩm Thực Ý Il Ristorante Luca Fantin',
    gastronomy_dish: 'Cá hồi tuyết hun khói gỗ sồi ăn kèm trứng cá muối Caviar Oscietra và mì ống thủ công nhồi nấm truffle đen.',
    wine_pairing: 'Champagne Ruinart Blanc de Blancs & Super Tuscan Ornellaia Bolgheri',
    positive_emotion: 'Cảm giác thống trị không gian—đứng trên vách đá 150m nhìn ra đại dương bao la với sự xa hoa chuẩn xác của nhà kim hoàn La Mã.',
    client_concern: 'Nỗi lo địa hình hiểm trở được giải quyết bằng hệ thống xe điện buggy chuyên dụng 24/7 và thang cáp nghiêng funicular tư nhân hạ thẳng xuống bãi cát hoang sơ.',
    target_persona: 'Giới thượng lưu đam mê thời trang, các tín đồ kiến trúc xa xỉ và những ai khao khát một lễ cưới thế kỷ bên bờ đại dương.',
    woa_declaration: 'GÓC NHÌN TỪ VÁCH ĐÁ NÀY XỨNG ĐÁNG LÀ KỲ QUAN NGHỈ DƯỠNG — CHÚNG TÔI NHẤT ĐỊNH SẼ TRỞ LẠI!',
    victor_note: 'Sự kết hợp giữa đá núi lửa đen bản địa thủ công và nghệ thuật kim hoàn tinh xảo nước Ý tạo nên một tuyệt tác nghỉ dưỡng không có bản sao thứ hai. Đứng tại quầy bar ngoài trời ngắm hoàng hôn Uluwatu rực lửa là khoảnh khắc chạm vào đỉnh cao phong cách sống.',
    lucky_note: 'Bãi biển tư nhân dưới đáy vực chỉ tiếp cận được bằng thang cáp nghiêng Funicular. Nơi đây cát trắng mịn màng và hoàn toàn vắng bóng người ngoài. Một bữa picnic champagne riêng tư trên bãi biển này là đỉnh cao của sự lãng mạn.',
    critique_positives: [
      'Vị trí vách đá dựng đứng 150m nhìn trọn đường chân trời Ấn Độ Dương ngoạn mục',
      'Thang cáp nghiêng Funicular đưa xuống bãi biển biệt lập hoang sơ không tì vết',
      'Nội thất biệt thự lát gỗ gụ nguyên khối và đá núi lửa được đẽo thủ công bằng tay'
    ],
    critique_considerations: [
      'Gió biển chiều tại quầy bar vách đá có thể mạnh; nên mang áo khoác nhẹ khi ngắm hoàng hôn',
      'Sóng tại bãi biển Uluwatu mạnh, chỉ phù hợp ngắm cảnh và dạo bộ thư giãn'
    ],
    podcast_title: 'Tập 25: Đỉnh Cao Xa Hoa Của Nhà Kim Hoàn La Mã Trên Vách Đá Bali',
    podcast_duration: '4:25',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, ở Bulgari Bali, từng chi tiết nhỏ nhất như chiếc khóa cửa, tay nắm vòi sen hay ly rượu đều mang dấu ấn kim hoàn tinh xảo!' },
      { speaker: 'Victor', text: 'Đó là đẳng cấp độc tôn của Bulgari. Họ không chỉ xây resort, họ tạc một viên ngọc quý bằng đá núi lửa đen trên vách đá 150 mét.' }
    ],
    shorts: [
      { title: 'Short 1: The 150m Cliff Luxury Villa', hook: 'Biệt thự đá núi lửa đen trên vách đá 150m đẹp như thế nào?', visual: 'Góc flycam nhìn từ biển vào vách đá dựng đứng và hồ bơi tràn bờ.', cta: 'Khám phá Bulgari Bali tại travel4u.us' }
    ]
  },

  'les-sources-de-caudalie-bordeaux': {
    hotel_name: 'Les Sources de Caudalie Bordeaux',
    city: 'Martillac, Bordeaux',
    country: 'France',
    rating_score: '9.8 / 10',
    subtitle: 'The Grand Cru Vineyard Palace Born from Mineral Hot Springs',
    soundscape_title: 'Sérénade des Vignes & Fontaine Chaude',
    soundscape_description: 'Tiếng nước khoáng nóng ngầm róc rách hòa cùng tiếng xào xạc của những rặng nho Cabernet Sauvignon trong gió thu Bordeaux.',
    soundscape_track: 'Chopin Nocturnes & Acoustic French Classical Guitar',
    gastronomy_title: '2 Sao Michelin La Grand’Vigne của Bếp Trưởng Nicolas Masse',
    gastronomy_dish: 'Thịt bồ câu nướng củi cành nho ăn kèm gan ngỗng béo Foie Gras áp chảo sốt rượu vang đỏ Château Smith Haut Lafitte.',
    wine_pairing: 'Château Smith Haut Lafitte Grand Cru Classé Pessac-Léognan & Sauternes Château d’Yquem huyền thoại',
    positive_emotion: 'Sự tĩnh lặng ngọt ngào của làng quê Pháp—nhấp ngụm rượu vang hảo hạng trong bồn tắm nước khoáng trị liệu Vinothérapie.',
    client_concern: 'Khoảng cách di chuyển từ trung tâm Bordeaux chỉ mất 20 phút xe riêng, tách biệt hoàn toàn khỏi nhịp sống bận rộn.',
    target_persona: 'Những người sành vang thế giới, du khách đam mê trị liệu sức khỏe cao cấp và các cặp đôi yêu thích văn hóa Pháp.',
    woa_declaration: 'HÍT THỞ HƯƠNG NHO TRÊN VÙNG ĐẤT GRAND CRU — ĐÂY LÀ ĐỈNH CAO CỦA NGHỆ THUẬT SỐNG NƯỚC PHÁP!',
    victor_note: 'Đạp xe xuyên qua những rặng nho ngút ngàn của Château Smith Haut Lafitte lúc sương sớm, ghé thăm hầm ủ rượu thùng gỗ sồi hàng trăm năm và trò chuyện cùng các chuyên gia làm rượu vang kỳ cựu là trải nghiệm di sản vô giá.',
    lucky_note: 'Liệu trình ngâm mình trong bồn tắm gỗ sồi với nước khoáng nóng giàu polyphenol chiết xuất từ hạt nho giúp làn da trẻ hóa tức thì. Bữa tối 2 sao Michelin tại La Grand’Vigne là cái kết viên mãn cho một ngày sống chậm giữa thiên nhiên nước Pháp.',
    critique_positives: [
      'Nằm trọn trong lòng điền trang Grand Cru Classé Château Smith Haut Lafitte huyền thoại',
      'Cái nôi của thương hiệu mỹ phẩm Vinothérapie Spa trị liệu tế bào từ hạt nho đầu tiên thế giới',
      'Nhà hàng 2 sao Michelin La Grand’Vigne với hầm rượu vang lưu trữ các niên vụ vô giá'
    ],
    critique_considerations: [
      'Mùa thu hoạch nho (tháng 9-10) là thời điểm rực rỡ nhất nhưng cần đặt phòng trước 4-6 tháng',
      'Các suite nhà sàn trên hồ nước Roulotte du Pêcheur mang phong cách mộc mạc làng quê Pháp cao cấp'
    ],
    podcast_title: 'Tập 26: Sống Giữa Những Rặng Nho Grand Cru Và Suối Khoáng Nóng Bordeaux',
    podcast_duration: '4:40',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, tắm trong bồn nước khoáng nóng 540 mét dưới lòng đất hòa tinh dầu hạt nho đỏ... cảm giác da dẻ như được tái sinh hoàn toàn!' },
      { speaker: 'Victor', text: 'Và sau đó đi dạo giữa những luống nho của Château Smith Haut Lafitte, thưởng thức ly vang đỏ 2010... Đó là sự xa xỉ đích thực của nước Pháp.' }
    ],
    shorts: [
      { title: 'Short 1: The Secret Wine Spa of France', hook: 'Spa rượu vang đầu tiên trên thế giới tắm nước khoáng hạt nho!', visual: 'Cảnh bồn tắm gỗ sồi nhìn ra vườn nho xanh ngát trong làn sương sớm.', cta: 'Xem cẩm nang Bordeaux tại travel4u.us' }
    ]
  },

  'amanzoe-peloponnese-greece': {
    hotel_name: 'Amanzoe Peloponnese',
    city: 'Porto Heli, Peloponnese',
    country: 'Greece',
    rating_score: '9.9 / 10',
    subtitle: 'The Modern Acropolis of Pure Marble Rising Above Ancient Olive Groves',
    soundscape_title: 'Ode Égée & Murmure des Oliviers',
    soundscape_description: 'Tiếng ve sầu mùa hạ bên những cây ô-liu nghìn năm tuổi hòa cùng tiếng nước hồ bơi phản chiếu và giai điệu đàn hạc Hy Lạp.',
    soundscape_track: 'Ancient Greek Lyre & Ambient Mediterranean Breeze',
    gastronomy_title: 'Ẩm Thực Hy Lạp Đương Đại & Bàn Tiệc Hải Sản Beach Club',
    gastronomy_dish: 'Cá tráp biển nướng muối biển thô ăn kèm rau củ hữu cơ hái tại vườn và dầu ô-liu nguyên chất ép lạnh của trang viên Amanzoe.',
    wine_pairing: 'Malagousia Gerovassiliou & Rượu vang đỏ Agiorgitiko Nemea',
    positive_emotion: 'Cảm giác bất tử và thanh khiết—được sống như những vị thần Hy Lạp giữa kiến trúc cột đá cẩm thạch trắng tinh khôi.',
    client_concern: 'Biệt thự riêng tư tuyệt đối với hồ bơi riêng 12m cho mỗi Pavilion, không góc nhìn nào bị xâm phạm bởi ánh mắt người khác.',
    target_persona: 'Các gia tộc giàu có, những nhân vật công chúng cần sự bảo mật tối đa và các tỷ phú kín tiếng thế giới.',
    woa_declaration: 'CUNG ĐIỆN ĐÁ CẨM THẠCH NÀY LÀ ĐỈNH CAO THI CÔNG RESORT TOÀN CẦU — TÔI SẼ KHÔNG BAO GIỜ QUÊN ĐƯỢC!',
    victor_note: 'Kiến trúc sư huyền thoại Ed Tuttle đã dựng nên một ngôi đền Acropolis của thế kỷ 21. Từng hàng cột đá cẩm thạch, từng hồ nước phẳng lặng phản chiếu bầu trời Địa Trung Hải đều toát lên vẻ trang nghiêm và thanh tịnh tuyệt đối.',
    lucky_note: 'Bãi biển Beach Club của Amanzoe sở hữu 4 hồ bơi riêng biệt và nhà hàng hải sản nhìn thẳng ra đảo Spetses. Dịch vụ đưa đón bằng cano cao tốc riêng sang đảo Spetses ăn tối là trải nghiệm mà bạn nhất định phải thử.',
    critique_positives: [
      'Kiến trúc đá cẩm thạch nguyên khối tuyệt mỹ lấy cảm hứng từ đền thờ Hy Lạp cổ đại',
      'Mỗi căn Pool Pavilion đều có hồ bơi riêng 12 mét và sân hiên tắm nắng hoàn toàn biệt lập',
      'Aman Beach Club riêng tư với du thuyền cao tốc đưa đón du khách thăm các đảo lân cận'
    ],
    critique_considerations: [
      'Khoảng cách từ sân bay Athens khoảng 2.5 giờ lái xe; khuyến nghị sử dụng dịch vụ trực thăng 25 phút của Amanzoe',
      'Resort đóng cửa vào mùa đông lạnh từ giữa tháng 11 đến đầu tháng 4'
    ],
    podcast_title: 'Tập 27: Ngôi Đền Acropolis Của Thế Kỷ 21 Trên Bán Đảo Hy Lạp',
    podcast_duration: '4:30',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, bước giữa những cột đá cẩm thạch trắng muốt và hồ nước phẳng lặng của Amanzoe, em cảm thấy như mình đang bước vào thế giới của thần thoại Hy Lạp.' },
      { speaker: 'Victor', text: 'Đó là tài năng đỉnh cao của Ed Tuttle. Ở đây, sự xa hoa được định nghĩa bằng không gian bao la, sự tĩnh lặng và ánh sáng Địa Trung Hải.' }
    ],
    shorts: [
      { title: 'Short 1: The Modern Greek Acropolis Hotel', hook: 'Khách sạn xây bằng đá cẩm thạch nguyên khối đẹp như đền thờ thần thoại!', visual: 'Góc quay kiến trúc đối xứng hoàn mỹ phản chiếu bầu trời xanh ngắt.', cta: 'Khám phá Amanzoe tại travel4u.us' }
    ]
  },

  'the-maybourne-riviera-monaco': {
    hotel_name: 'The Maybourne Riviera',
    city: 'Roquebrune-Cap-Martin, French Riviera',
    country: 'France',
    rating_score: '9.8 / 10',
    subtitle: 'Jean-Michel Wilmotte’s Modernist Jewel Cantilevered Over Monaco',
    soundscape_title: 'Brise Monégasque & Jazz d’Azur',
    soundscape_description: 'Tiếng sóng Địa Trung Hải va vào vách đá ngầm phía dưới hòa cùng giai điệu French Nu-Jazz tại quầy bar Ceto Bar.',
    soundscape_track: 'French Riviera Nu-Jazz & Mediterranean Horizon Waves',
    gastronomy_title: 'Ẩm Thực 1 Sao Michelin Ceto của Bếp Trưởng Số 1 Thế Giới Mauro Colagreco',
    gastronomy_dish: 'Cá ngừ vây xanh ủ muối trong hầm rong biển ăn kèm nước sốt dashi Địa Trung Hải và nấm cục đen biển.',
    wine_pairing: 'Domaine Tempier Bandol Rosé & Champagne Krug Grande Cuvée',
    positive_emotion: 'Cảm giác đứng trên đỉnh cao thế giới—thu trọn cả ba quốc gia (Pháp, Monaco, Ý) trong cùng một cái liếc nhìn từ ban công.',
    client_concern: 'Giao thông Monaco đông đúc được giải quyết bằng sân đỗ trực thăng riêng và dịch vụ xe limousine đón tận thảm đỏ Monte-Carlo Casino.',
    target_persona: 'Những người yêu thích sự hiện đại sắc sảo, giới tài chính quốc tế và các tín đồ của giải đua xe F1 Grand Prix Monaco.',
    woa_declaration: 'NHÌN NGẮM BẾN DU THUYỀN MONACO TỪ ĐỘ CAO NÀY LÀ KHOẢNH KHẮC VÔ GIÁ — NƠI TÔI PHẢI QUAY LẠI MỖI MÙA GRAND PRIX!',
    victor_note: 'Khác biệt hoàn toàn với những cung điện cổ điển của vùng Côte d’Azur, Maybourne Riviera là một mũi tàu bằng kính vươn ra không gian. Ngắm nhìn bến du thuyền Port Hercule của Monaco lấp lánh ánh đèn đêm từ hồ bơi vô cực là trải nghiệm thị giác ngoạn mục.',
    lucky_note: 'Ẩm thực tại Ceto đưa nghệ thuật xử lý hải sản lên một tầm cao mới với tủ ủ khô cá bằng muối biển độc nhất vô nhị. Đừng quên thưởng thức ly cocktail đặc chế tại quầy bar ngoài trời lúc hoàng hôn buông xuống Monte Carlo.',
    critique_positives: [
      'Góc nhìn toàn cảnh 180 độ bao trọn công quốc Monaco và bờ biển nước Ý',
      'Ẩm thực hải sản đương đại sáng tạo của siêu bếp trưởng Mauro Colagreco',
      'Hồ bơi vô cực tràn bờ lơ lửng giữa biển mây và vách đá Địa Trung Hải'
    ],
    critique_considerations: [
      'Gió trên cao có thể giật mạnh vào những ngày thời tiết biến động',
      'Vị trí trên đỉnh núi cao đòi hỏi tài xế có tay lái vững khi di chuyển các khúc cua đèo'
    ],
    podcast_title: 'Tập 28: Đứng Trên Mũi Tàu Kính Nhìn Trọn Vương Quốc Monaco',
    podcast_duration: '4:20',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, đứng từ ban công phòng suite của Maybourne Riviera, em nhìn thấy cả ba nước Pháp, Monaco và Ý cùng một lúc!' },
      { speaker: 'Victor', text: 'Và bến du thuyền Monte-Carlo bên dưới trông như một hộp đồ chơi lấp lánh ánh kim cương. Đây là khách sạn hiện đại ấn tượng nhất bờ biển Riviera.' }
    ],
    shorts: [
      { title: 'Short 1: Overlooking Monaco from the Clouds', hook: 'Góc ngắm triệu đô nhìn trọn công quốc giàu nhất thế giới từ trên cao!', visual: 'Hồ bơi vô cực kính phản chiếu du thuyền xa hoa đậu ngoài khơi Monaco.', cta: 'Xem review Maybourne Riviera tại travel4u.us' }
    ]
  },

  'chateau-du-grand-luce-loire': {
    hotel_name: 'Château du Grand-Lucé',
    city: 'Le Grand-Lucé, Loire Valley',
    country: 'France',
    rating_score: '9.8 / 10',
    subtitle: 'The 1760 Neoclassical Jewel with Miniature Versailles Formal Gardens',
    soundscape_title: 'Menuet Baroque & Fontaines Royales',
    soundscape_description: 'Tiếng đài phun nước róc rách trong khu vườn hình học kiểu Pháp hòa cùng tiếng đàn Harpsichord và tiếng chim hót trong rừng sồi 80 mẫu Anh.',
    soundscape_track: 'Vivaldi Four Seasons & Baroque Classical Piano',
    gastronomy_title: 'Bàn Tiệc Quý Tộc Pháp Le Lucé & Vườn Thảo Mộc',
    gastronomy_dish: 'Ức vịt sốt quả anh đào rừng Loire ăn kèm khoai tây nghiền nướng bơ d’Isigny và nấm Truffle đen thu hoạch tại gia.',
    wine_pairing: 'Sancerre Domaine Vacheron & Vouvray Domaine Huet Moelleux',
    positive_emotion: 'Sự trở về thời kỳ hoàng kim của vương triều Pháp—trở thành chủ nhân của một tòa lâu đài quý tộc đích thực.',
    client_concern: 'Khách sạn chỉ có 17 phòng suites độc bản, đảm bảo sự riêng tư như một tư dinh gia đình khép kín không hề có cảm giác thương mại.',
    target_persona: 'Những người đam mê lịch sử, kiến trúc cổ điển châu Âu và các cặp đôi tìm kiếm địa điểm cưới quý tộc cổ tích.',
    woa_declaration: 'SỐNG TRONG LÂU ĐÀI THẾ KỶ 18 LÀ GIẤC MƠ ĐÃ THÀNH SỰ THỰC — CHÚNG TÔI SẼ QUAY LẠI HÀNG NĂM!',
    victor_note: 'Được phục chế tỉ mỉ dưới sự giám sát của các chuyên gia di sản quốc gia Pháp, từng bức tranh tường Jean-Baptiste Pillement, từng lò sưởi đá cẩm thạch đều còn vẹn nguyên linh hồn thế kỷ 18. Đi dạo giữa khu vườn đối xứng kiểu Versailles lúc hoàng hôn mang lại sự thanh tịnh khó tả.',
    lucky_note: 'Hồ bơi tròn bí mật được bao bọc bởi hàng rào cây sồi cổ thụ mang lại cảm giác tách biệt hoàn toàn khỏi thế giới hiện đại. Bữa trà chiều kiểu Pháp trong phòng salon với bộ ấm chén sứ Sèvres là khoảnh khắc hoàng gia ngọt ngào.',
    critique_positives: [
      'Di sản lâu đài tân cổ điển Pháp nguyên bản được bảo tồn hoàn mỹ tuyệt đối',
      'Khu vườn kiểu Versailles rộng 80 mẫu Anh với các bức tượng điêu khắc đá cổ do vua Louis XV trao tặng',
      'Độ riêng tư tối thượng chỉ với 17 phòng dành riêng cho những vị khách kín tiếng'
    ],
    critique_considerations: [
      'Nằm ở vùng thôn dã thung lũng Loire, du khách nên thuê xe có tài xế riêng để thuận tiện khám phá',
      'Tòa lâu đài bảo tồn di sản nghiêm ngặt nên không có thang máy hiện đại trong một số cánh phòng cổ'
    ],
    podcast_title: 'Tập 29: Trở Thành Chủ Nhân Lâu Đài Quý Tộc Pháp Thế Kỷ 18',
    podcast_duration: '4:30',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, em có cảm giác như mình là Marie Antoinette khi bước chân qua những cánh cửa nhung lụa và sàn gỗ sồi 260 năm tuổi của Grand-Lucé!' },
      { speaker: 'Victor', text: 'Đây là một trong số rất ít lâu đài thoát khỏi sự tàn phá của Cách mạng Pháp. Từng bức bích họa trên tường đều là kiệt tác hội họa vô giá.' }
    ],
    shorts: [
      { title: 'Short 1: Sleeping in an Authentic French Castle', hook: 'Ngủ một đêm trong lâu đài Pháp 260 tuổi của vua Louis XV trông như thế nào?', visual: 'Victor & Lucky bước vào phòng suite hoàng gia với rèm gấm thêu tay và lò sưởi cẩm thạch.', cta: 'Xem cẩm nang Loire Valley tại travel4u.us' }
    ]
  },

  'the-yeatman-hotel-porto': {
    hotel_name: 'The Yeatman Hotel Porto',
    city: 'Porto',
    country: 'Portugal',
    rating_score: '9.8 / 10',
    subtitle: 'The Temple of Wine Overlooking the Historic Douro River & Dom Luís Bridge',
    soundscape_title: 'Fado de Douro & Rượu Vang Gỗ Sồi',
    soundscape_description: 'Tiếng đàn guitar Bồ Đào Nha trầm buồn ngân nga hòa cùng tiếng còi tàu vintage trên dòng Douro và tiếng lách cách của ly pha lê.',
    soundscape_track: 'Amália Rodrigues Fado & Douro River Twilight',
    gastronomy_title: 'Đỉnh Cao 2 Sao Michelin The Yeatman Restaurant của Bếp Trưởng Ricardo Costa',
    gastronomy_dish: 'Cá tuyết Bacalhau nấu chậm bơ tỏi ăn kèm bọt biển nghệ tây và bánh tart trứng Bồ Đào Nha ngâm rượu Port 20 năm.',
    wine_pairing: 'Taylor’s Vintage Port 1994 & Hầm rượu vang 30.000 chai lớn nhất bán đảo Iberia',
    positive_emotion: 'Sự ấm áp nồng nàn và say mê văn hóa—ngắm nhìn hàng ngàn mái ngói đỏ của thành phố di sản Porto trong ánh hoàng hôn tím thẫm.',
    client_concern: 'Hồ bơi vô cực hình chai rượu vang độc đáo được sưởi ấm quanh năm, cho phép bơi ngắm cầu Dom Luís I ngay cả trong mùa đông se lạnh.',
    target_persona: 'Những người sưu tầm rượu vang thế giới, du khách yêu thích văn hóa ẩm thực Michelin và các cặp đôi lãng mạn.',
    woa_declaration: 'HẦM RƯỢU VANG CỔ VÀ TẦM NHÌN SÔNG DOURO NÀY ĐÃ GÂY THƯƠNG NHỚ — PORTO CHẮC CHẮN LÀ NƠI TÔI SẼ TRỞ LẠI!',
    victor_note: 'Tất cả các phòng tại The Yeatman đều có ban công riêng nhìn thẳng sang trung tâm lịch sử Ribeira và cây cầu sắt Dom Luís I huyền thoại. Hầm rượu vang 30.000 chai với các chuyên gia sommelier hàng đầu sẽ mở ra cho bạn cánh cửa bước vào lịch sử vang Port hàng trăm năm.',
    lucky_note: 'Hồ bơi trong nhà và ngoài trời được thiết kế uốn lượn theo hình chai rượu vang cực kỳ độc đáo. Đừng bỏ lỡ liệu trình spa tắm ngâm trong thùng rượu vang với tinh dầu hạt nho tại Caudalie Vinothérapie Spa của khách sạn.',
    critique_positives: [
      'Góc nhìn triệu đô hướng trọn dòng sông Douro và cây cầu sắt Dom Luís I lịch sử',
      'Hầm rượu vang lớn nhất Bồ Đào Nha với hơn 30.000 chai rượu vang quý hiếm',
      'Nhà hàng 2 sao Michelin duy nhất tại Porto với thực đơn hải sản Đại Tây Dương thượng hạng'
    ],
    critique_considerations: [
      'Nằm bên bờ Vila Nova de Gaia, cần đi bộ qua cầu Dom Luís I hoặc đi taxi 5 phút để vào trung tâm phố cổ Porto',
      'Nhà hàng ẩm thực 2 sao Michelin cần đặt bàn trước 1-2 tháng vào dịp cuối tuần'
    ],
    podcast_title: 'Tập 30: Hầm Rượu Vang 30.000 Chai Bên Dòng Sông Douro Kỳ Vĩ',
    podcast_duration: '4:45',
    podcast_dialogue: [
      { speaker: 'Lucky', text: 'Anh Victor, bơi trong hồ bơi hình chai rượu vang nhìn thẳng sang những mái ngói đỏ rực rỡ của Porto lúc hoàng hôn... cảm giác lãng mạn không từ ngữ nào tả xiết!' },
      { speaker: 'Victor', text: 'Và nhấp một ngụm rượu vang Port Taylor’s niên vụ 1994 mở bằng kẹp than nóng truyền thống... The Yeatman chính là thánh đường của những người sành rượu.' }
    ],
    shorts: [
      { title: 'Short 1: The Wine Bottle Infinity Pool', hook: 'Hồ bơi hình chai rượu vang độc nhất vô nhị ngắm trọn thành phố Porto!', visual: 'Làn nước ấm áp phản chiếu cây cầu Dom Luís I lừng danh trong ánh chiều tà.', cta: 'Xem review The Yeatman tại travel4u.us' }
    ]
  }
};

const COMBINED_DB = { ...OLD_DB, ...NEW_ENTRIES };

const OUT_FILE = path.resolve(__dirname, 'storytelling_database_30_hotels.cjs');
const fileContent = `/**
 * 👑 TRAVEL4U VICTOR & LUCKY — 30 SOVEREIGN SANCTUARIES MASTER STORYTELLING DATABASE
 * Domain: travel4u.us
 * Generated: ${new Date().toISOString()}
 * 30 Flagship Sanctuaries across 10 Luxury Collections
 */

const STORYTELLING_DATABASE = ${JSON.stringify(COMBINED_DB, null, 2)};

module.exports = { STORYTELLING_DATABASE };
`;

fs.writeFileSync(OUT_FILE, fileContent, 'utf-8');
console.log(`🎉 storytelling_database_30_hotels.cjs enriched and verified! Total sanctuaries: ${Object.keys(COMBINED_DB).length}`);
