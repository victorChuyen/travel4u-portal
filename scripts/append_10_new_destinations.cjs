const fs = require('fs');
const path = require('path');

const DESTINATIONS_FILE = path.resolve(__dirname, '../src/data/destinations.json');
const destinations = JSON.parse(fs.readFileSync(DESTINATIONS_FILE, 'utf-8'));

const NEW_10 = [
  {
    hub_folder: "expedia_011_como_passalacqua",
    post_code: "EXP_COMO_011",
    location: "Moltrasio, Lake Como, Italy",
    english_title: "Passalacqua Lake Como: 18th-Century Bellini Villa & Terraced Gardens Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_como_passalacqua_hero_4k.jpg",
    rating: "5.0/5 (1,580+ Verified Reviews)",
    price_display: "From $1,850 / night (Historic Lake Views & Vintage Riva Launch)",
    expedia_direct_link: "/go/passalacqua-lake-como",
    expedia_lodging_id: "94215882",
    slugs: {
      en: "passalacqua-lake-como",
      de: "passalacqua-lake-como-de",
      es: "passalacqua-lake-como-es",
      fr: "passalacqua-lake-como-fr",
      it: "passalacqua-lake-como-it",
      ja: "passalacqua-lake-como-ja",
      ko: "passalacqua-lake-como-ko",
      pt: "passalacqua-lake-como-pt",
      ru: "passalacqua-lake-como-ru",
      vi: "khach-san-passalacqua-ho-como-vip",
      "zh-cn": "passalacqua-lake-como-zh-cn",
      "zh-tw": "passalacqua-lake-como-zh-tw"
    }
  },
  {
    hub_folder: "expedia_012_como_villa_deste",
    post_code: "EXP_COMO_012",
    location: "Cernobbio, Lake Como, Italy",
    english_title: "Villa d'Este Lake Como: Renaissance Royalty & Floating Pool Palace Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_como_villa_deste_hero_4k.jpg",
    rating: "4.9/5 (2,840+ Verified Reviews)",
    price_display: "From $1,750 / night (Centuries of Royal Heritage & Floating Pool)",
    expedia_direct_link: "/go/villa-deste-lake-como",
    expedia_lodging_id: "18942",
    slugs: {
      en: "villa-deste-lake-como",
      de: "villa-deste-lake-como-de",
      es: "villa-deste-lake-como-es",
      fr: "villa-deste-lake-como-fr",
      it: "villa-deste-lake-como-it",
      ja: "villa-deste-lake-como-ja",
      ko: "villa-deste-lake-como-ko",
      pt: "villa-deste-lake-como-pt",
      ru: "villa-deste-lake-como-ru",
      vi: "biet-thu-cung-dien-villa-deste-cernobbio-ho-como-vip",
      "zh-cn": "villa-deste-lake-como-zh-cn",
      "zh-tw": "villa-deste-lake-como-zh-tw"
    }
  },
  {
    hub_folder: "expedia_013_swiss_badrutts_palace",
    post_code: "EXP_SWISS_013",
    location: "St. Moritz, Engadin, Switzerland",
    english_title: "Badrutt's Palace Hotel St. Moritz: Engadin Alpine Grandeur & Lake Palace Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_swiss_badrutts_palace_hero_4k.jpg",
    rating: "4.9/5 (2,350+ Verified Reviews)",
    price_display: "From $1,920 / night (Alpine Palace Suite & Lake St. Moritz Views)",
    expedia_direct_link: "/go/badrutts-palace-st-moritz",
    expedia_lodging_id: "20921",
    slugs: {
      en: "badrutts-palace-st-moritz",
      de: "badrutts-palace-st-moritz-de",
      es: "badrutts-palace-st-moritz-es",
      fr: "badrutts-palace-st-moritz-fr",
      it: "badrutts-palace-st-moritz-it",
      ja: "badrutts-palace-st-moritz-ja",
      ko: "badrutts-palace-st-moritz-ko",
      pt: "badrutts-palace-st-moritz-pt",
      ru: "badrutts-palace-st-moritz-ru",
      vi: "khach-san-cung-dien-badrutts-palace-st-moritz-thuy-sy-vip",
      "zh-cn": "badrutts-palace-st-moritz-zh-cn",
      "zh-tw": "badrutts-palace-st-moritz-zh-tw"
    }
  },
  {
    hub_folder: "expedia_014_maldives_cheval_blanc",
    post_code: "EXP_MALDIVES_014",
    location: "Noonu Atoll, Maldives",
    english_title: "Cheval Blanc Randheli Maldives: LVMH Art de Recevoir & Ocean Villa Sanctuary Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_maldives_cheval_blanc_hero_4k.jpg",
    rating: "5.0/5 (1,620+ Verified Reviews)",
    price_display: "From $3,200 / night (LVMH Art de Recevoir & Private Ocean Villa)",
    expedia_direct_link: "/go/cheval-blanc-randheli-maldives",
    expedia_lodging_id: "8213456",
    slugs: {
      en: "cheval-blanc-randheli-maldives",
      de: "cheval-blanc-randheli-maldives-de",
      es: "cheval-blanc-randheli-maldives-es",
      fr: "cheval-blanc-randheli-maldives-fr",
      it: "cheval-blanc-randheli-maldives-it",
      ja: "cheval-blanc-randheli-maldives-ja",
      ko: "cheval-blanc-randheli-maldives-ko",
      pt: "cheval-blanc-randheli-maldives-pt",
      ru: "cheval-blanc-randheli-maldives-ru",
      vi: "khu-nghi-duong-cheval-blanc-randheli-maldives-vip",
      "zh-cn": "cheval-blanc-randheli-maldives-zh-cn",
      "zh-tw": "cheval-blanc-randheli-maldives-zh-tw"
    }
  },
  {
    hub_folder: "expedia_015_maldives_the_nautilus",
    post_code: "EXP_MALDIVES_015",
    location: "Baa Atoll Biosphere Reserve, Maldives",
    english_title: "The Nautilus Maldives: Ultra-Luxury Bohemian Hideaway & Private House Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_maldives_the_nautilus_hero_4k.jpg",
    rating: "5.0/5 (1,410+ Verified Reviews)",
    price_display: "From $2,650 / night (Bohemian Luxury & Free-Spirited Private Butler)",
    expedia_direct_link: "/go/the-nautilus-maldives",
    expedia_lodging_id: "2984123",
    slugs: {
      en: "the-nautilus-maldives",
      de: "the-nautilus-maldives-de",
      es: "the-nautilus-maldives-es",
      fr: "the-nautilus-maldives-fr",
      it: "the-nautilus-maldives-it",
      ja: "the-nautilus-maldives-ja",
      ko: "the-nautilus-maldives-ko",
      pt: "the-nautilus-maldives-pt",
      ru: "the-nautilus-maldives-ru",
      vi: "khu-nghi-duong-the-nautilus-maldives-baa-atoll-vip",
      "zh-cn": "the-nautilus-maldives-zh-cn",
      "zh-tw": "the-nautilus-maldives-zh-tw"
    }
  },
  {
    hub_folder: "expedia_016_kyoto_hoshinoya",
    post_code: "EXP_KYOTO_016",
    location: "Arashiyama, Kyoto, Japan",
    english_title: "Hoshinoya Kyoto: Riverside Ryokan Sanctuary & Arashiyama Forest Retreat Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_kyoto_hoshinoya_hero_4k.jpg",
    rating: "4.9/5 (1,980+ Verified Reviews)",
    price_display: "From $1,450 / night (Private Wooden Boat Arrival & Oi River Views)",
    expedia_direct_link: "/go/hoshinoya-kyoto-arashiyama",
    expedia_lodging_id: "3948123",
    slugs: {
      en: "hoshinoya-kyoto-arashiyama",
      de: "hoshinoya-kyoto-arashiyama-de",
      es: "hoshinoya-kyoto-arashiyama-es",
      fr: "hoshinoya-kyoto-arashiyama-fr",
      it: "hoshinoya-kyoto-arashiyama-it",
      ja: "hoshinoya-kyoto-arashiyama-ja",
      ko: "hoshinoya-kyoto-arashiyama-ko",
      pt: "hoshinoya-kyoto-arashiyama-pt",
      ru: "hoshinoya-kyoto-arashiyama-ru",
      vi: "ryokan-hoshinoya-kyoto-song-oi-arashiyama-vip",
      "zh-cn": "hoshinoya-kyoto-arashiyama-zh-cn",
      "zh-tw": "hoshinoya-kyoto-arashiyama-zh-tw"
    }
  },
  {
    hub_folder: "expedia_017_hakone_gora_kadan",
    post_code: "EXP_HAKONE_017",
    location: "Hakone, Kanagawa, Japan",
    english_title: "Gora Kadan Hakone: Imperial Villa Ryokan & Mineral Onsen Sanctuary Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_hakone_gora_kadan_hero_4k.jpg",
    rating: "4.9/5 (1,760+ Verified Reviews)",
    price_display: "From $1,580 / night (Imperial Family Villa & Mineral Hot Spring)",
    expedia_direct_link: "/go/gora-kadan-hakone-onsen",
    expedia_lodging_id: "4192837",
    slugs: {
      en: "gora-kadan-hakone-onsen",
      de: "gora-kadan-hakone-onsen-de",
      es: "gora-kadan-hakone-onsen-es",
      fr: "gora-kadan-hakone-onsen-fr",
      it: "gora-kadan-hakone-onsen-it",
      ja: "gora-kadan-hakone-onsen-ja",
      ko: "gora-kadan-hakone-onsen-ko",
      pt: "gora-kadan-hakone-onsen-pt",
      ru: "gora-kadan-hakone-onsen-ru",
      vi: "ryokan-onsen-gora-kadan-hakone-nhat-ban-vip",
      "zh-cn": "gora-kadan-hakone-onsen-zh-cn",
      "zh-tw": "gora-kadan-hakone-onsen-zh-tw"
    }
  },
  {
    hub_folder: "expedia_018_utah_amangiri",
    post_code: "EXP_UTAH_018",
    location: "Canyon Point, Utah, USA",
    english_title: "Amangiri Canyon Point Utah: Desert Monolith Sanctuary & Sunken Rock Pool Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_utah_amangiri_hero_4k.jpg",
    rating: "5.0/5 (2,490+ Verified Reviews)",
    price_display: "From $2,850 / night (Desert Wing Pavilion & Sunken Rock Pool)",
    expedia_direct_link: "/go/amangiri-canyon-point-utah",
    expedia_lodging_id: "5829103",
    slugs: {
      en: "amangiri-canyon-point-utah",
      de: "amangiri-canyon-point-utah-de",
      es: "amangiri-canyon-point-utah-es",
      fr: "amangiri-canyon-point-utah-fr",
      it: "amangiri-canyon-point-utah-it",
      ja: "amangiri-canyon-point-utah-ja",
      ko: "amangiri-canyon-point-utah-ko",
      pt: "amangiri-canyon-point-utah-pt",
      ru: "amangiri-canyon-point-utah-ru",
      vi: "resort-amangiri-canyon-point-utah-sa-mac-vip",
      "zh-cn": "amangiri-canyon-point-utah-zh-cn",
      "zh-tw": "amangiri-canyon-point-utah-zh-tw"
    }
  },
  {
    hub_folder: "expedia_019_serengeti_singita_sasakwa",
    post_code: "EXP_SAFARI_019",
    location: "Grumeti Reserves, Serengeti, Tanzania",
    english_title: "Singita Sasakwa Lodge Serengeti: Edwardian Manor & Infinite Savanna Sanctuary Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_serengeti_singita_sasakwa_hero_4k.jpg",
    rating: "5.0/5 (1,830+ Verified Reviews)",
    price_display: "From $3,450 / night (Edwardian Manor & Endless Serengeti Plains)",
    expedia_direct_link: "/go/singita-sasakwa-lodge-serengeti",
    expedia_lodging_id: "6928174",
    slugs: {
      en: "singita-sasakwa-lodge-serengeti",
      de: "singita-sasakwa-lodge-serengeti-de",
      es: "singita-sasakwa-lodge-serengeti-es",
      fr: "singita-sasakwa-lodge-serengeti-fr",
      it: "singita-sasakwa-lodge-serengeti-it",
      ja: "singita-sasakwa-lodge-serengeti-ja",
      ko: "singita-sasakwa-lodge-serengeti-ko",
      pt: "singita-sasakwa-lodge-serengeti-pt",
      ru: "singita-sasakwa-lodge-serengeti-ru",
      vi: "khu-nghi-duong-singita-sasakwa-lodge-serengeti-chau-phi-vip",
      "zh-cn": "singita-sasakwa-lodge-serengeti-zh-cn",
      "zh-tw": "singita-sasakwa-lodge-serengeti-zh-tw"
    }
  },
  {
    hub_folder: "expedia_020_swiss_clinique_la_prairie",
    post_code: "EXP_WELLNESS_020",
    location: "Clarens-Montreux, Lake Geneva, Switzerland",
    english_title: "Clinique La Prairie Montreux: World-Leading Longevity & Swiss Alpine Medical Spa Guide 2026",
    hero_image: "/media/expedia_hotels/expedia_swiss_clinique_la_prairie_hero_4k.jpg",
    rating: "5.0/5 (1,520+ Verified Reviews)",
    price_display: "From $2,950 / night (World-Leading Cellular Longevity & Lake Geneva Spa)",
    expedia_direct_link: "/go/clinique-la-prairie-montreux",
    expedia_lodging_id: "7182930",
    slugs: {
      en: "clinique-la-prairie-montreux",
      de: "clinique-la-prairie-montreux-de",
      es: "clinique-la-prairie-montreux-es",
      fr: "clinique-la-prairie-montreux-fr",
      it: "clinique-la-prairie-montreux-it",
      ja: "clinique-la-prairie-montreux-ja",
      ko: "clinique-la-prairie-montreux-ko",
      pt: "clinique-la-prairie-montreux-pt",
      ru: "clinique-la-prairie-montreux-ru",
      vi: "trung-tam-tri-lieu-clinique-la-prairie-montreux-thuy-sy-vip",
      "zh-cn": "clinique-la-prairie-montreux-zh-cn",
      "zh-tw": "clinique-la-prairie-montreux-zh-tw"
    }
  }
];

let addedCount = 0;
for (const item of NEW_10) {
  const exists = destinations.some(d => d.slugs.en === item.slugs.en);
  if (!exists) {
    destinations.push(item);
    addedCount++;
    console.log(`+ Added: ${item.english_title}`);
  } else {
    console.log(`~ Already exists: ${item.english_title}`);
  }
}

fs.writeFileSync(DESTINATIONS_FILE, JSON.stringify(destinations, null, 2), 'utf-8');
console.log(`🎉 destinations.json now contains ${destinations.length} luxury stays (added ${addedCount} new stays).`);
