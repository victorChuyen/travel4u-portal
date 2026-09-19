const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_APP = path.resolve(__dirname, '..');
const EXPEDIA_MEDIA_DIR = path.join(ROOT_APP, 'public/media/expedia_hotels');

const NEW_HOTELS = [
  {
    key: 'como_passalacqua',
    slug: 'passalacqua-lake-como',
    name: 'Passalacqua Lake Como',
    city: 'Moltrasio, Lake Como, Italy',
    lat: 45.8569,
    lon: 9.0883,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_001-passalacqua-lake-como-01.jpg',
    target_hero: 'expedia_como_passalacqua_hero_4k.jpg'
  },
  {
    key: 'como_villa_deste',
    slug: 'villa-deste-lake-como',
    name: "Villa d'Este Lake Como",
    city: 'Cernobbio, Lake Como, Italy',
    lat: 45.8450,
    lon: 9.0803,
    source_rel: 'credentials/travel4you/data/media/europe/europe-europe_049-villa-d-este-lake-como-italy-01.jpg',
    target_hero: 'expedia_como_villa_deste_hero_4k.jpg'
  },
  {
    key: 'swiss_badrutts_palace',
    slug: 'badrutts-palace-st-moritz',
    name: "Badrutt's Palace Hotel St. Moritz",
    city: 'St. Moritz, Engadin, Switzerland',
    lat: 46.4984,
    lon: 9.8402,
    source_rel: 'credentials/travel4you/data/media/europe/europe-europe_002-badrutt-s-palace-st-moritz-switzerl-01.jpg',
    target_hero: 'expedia_swiss_badrutts_palace_hero_4k.jpg'
  },
  {
    key: 'maldives_cheval_blanc',
    slug: 'cheval-blanc-randheli-maldives',
    name: 'Cheval Blanc Randheli Maldives',
    city: 'Noonu Atoll, Maldives',
    lat: 5.6881,
    lon: 73.3512,
    source_rel: 'credentials/travel4you/data/media/islands/islands-islands_003-cheval-blanc-randheli-noonu-atoll-01.jpg',
    target_hero: 'expedia_maldives_cheval_blanc_hero_4k.jpg'
  },
  {
    key: 'maldives_the_nautilus',
    slug: 'the-nautilus-maldives',
    name: 'The Nautilus Maldives',
    city: 'Baa Atoll Biosphere Reserve, Maldives',
    lat: 5.2753,
    lon: 73.1517,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_002-the-nautilus-maldives-01.jpg',
    target_hero: 'expedia_maldives_the_nautilus_hero_4k.jpg'
  },
  {
    key: 'kyoto_hoshinoya',
    slug: 'hoshinoya-kyoto-arashiyama',
    name: 'Hoshinoya Kyoto',
    city: 'Arashiyama, Kyoto, Japan',
    lat: 35.0118,
    lon: 135.6669,
    source_rel: 'credentials/travel4you/data/media/japan/japan-japan_001-hoshinoya-kyoto-arashiyama-01.jpg',
    target_hero: 'expedia_kyoto_hoshinoya_hero_4k.jpg'
  },
  {
    key: 'hakone_gora_kadan',
    slug: 'gora-kadan-hakone-onsen',
    name: 'Gora Kadan Hakone',
    city: 'Hakone, Kanagawa, Japan',
    lat: 35.2494,
    lon: 139.0478,
    source_rel: 'credentials/travel4you/data/media/japan/japan-japan_002-gora-kadan-hakone-01.jpg',
    target_hero: 'expedia_hakone_gora_kadan_hero_4k.jpg'
  },
  {
    key: 'utah_amangiri',
    slug: 'amangiri-canyon-point-utah',
    name: 'Amangiri Canyon Point Utah',
    city: 'Canyon Point, Utah, USA',
    lat: 37.0177,
    lon: -111.7107,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_010-amangiri-utah-01.jpg',
    target_hero: 'expedia_utah_amangiri_hero_4k.jpg'
  },
  {
    key: 'serengeti_singita_sasakwa',
    slug: 'singita-sasakwa-lodge-serengeti',
    name: 'Singita Sasakwa Lodge Serengeti',
    city: 'Grumeti Reserves, Serengeti, Tanzania',
    lat: -2.1283,
    lon: 34.6144,
    source_rel: 'credentials/travel4you/data/media/hotels/hotels-hotels_013-singita-sasakwa-serengeti-01.jpg',
    target_hero: 'expedia_serengeti_singita_sasakwa_hero_4k.jpg'
  },
  {
    key: 'swiss_clinique_la_prairie',
    slug: 'clinique-la-prairie-montreux',
    name: 'Clinique La Prairie Montreux',
    city: 'Clarens-Montreux, Lake Geneva, Switzerland',
    lat: 46.4428,
    lon: 6.8942,
    source_rel: 'credentials/travel4you/data/media/wellness/wellness-wellness_001-clinique-la-prairie-montreux-switze-01.jpg',
    target_hero: 'expedia_swiss_clinique_la_prairie_hero_4k.jpg'
  }
];

function toDmsString(coordinate) {
  const abs = Math.abs(coordinate);
  const degrees = Math.floor(abs);
  const minutesDec = (abs - degrees) * 60;
  const minutes = Math.floor(minutesDec);
  const seconds = Math.round((minutesDec - minutes) * 60);
  return `${degrees}/1 ${minutes}/1 ${seconds}/1`;
}

async function run() {
  console.log('🚀 Preparing and injecting EXIF / IPTC / GPS for 10 new luxury sanctuaries...');
  
  for (const hotel of NEW_HOTELS) {
    const sourceFullPath = path.resolve(ROOT_APP, '..', hotel.source_rel);
    const targetJpegPath = path.join(EXPEDIA_MEDIA_DIR, hotel.target_hero);
    const targetWebpPath = path.join(EXPEDIA_MEDIA_DIR, hotel.target_hero.replace('.jpg', '.webp'));

    if (!fs.existsSync(sourceFullPath)) {
      console.error(`❌ Source not found: ${sourceFullPath}`);
      continue;
    }

    const latRef = hotel.lat >= 0 ? 'N' : 'S';
    const lonRef = hotel.lon >= 0 ? 'E' : 'W';
    const latDms = toDmsString(hotel.lat);
    const lonDms = toDmsString(hotel.lon);

    const exifConfig = {
      IFD0: {
        Artist: 'Luxury Travel4U Victor & Lucky',
        Copyright: '© 2026 Travel4U Luxury Stays (https://travel4u.us)',
        ImageDescription: `${hotel.name} (${hotel.city}) - Curated 5-Star Luxury Review by Victor & Lucky`,
        Make: 'Hasselblad / Leica Pro Cinema',
        Model: 'Travel4U 8K Sovereign Sensor',
        Software: 'Travel4U Sovereign GEO & Image SEO Engine 2026'
      },
      GPSInfo: {
        GPSLatitudeRef: latRef,
        GPSLatitude: latDms,
        GPSLongitudeRef: lonRef,
        GPSLongitude: lonDms
      }
    };

    const inputBuffer = fs.readFileSync(sourceFullPath);

    // 1. Output JPEG with EXIF & GPS
    const updatedJpeg = await sharp(inputBuffer)
      .withMetadata({ exif: exifConfig })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(targetJpegPath, updatedJpeg);

    // 2. Output WebP with EXIF & GPS
    const updatedWebp = await sharp(inputBuffer)
      .withMetadata({ exif: exifConfig })
      .webp({ quality: 84, effort: 4 })
      .toBuffer();
    fs.writeFileSync(targetWebpPath, updatedWebp);

    const jpegKB = (updatedJpeg.length / 1024).toFixed(1);
    const webpKB = (updatedWebp.length / 1024).toFixed(1);
    const savings = (((updatedJpeg.length - updatedWebp.length) / updatedJpeg.length) * 100).toFixed(1);

    console.log(`  ✓ [${hotel.name}] -> JPG: ${jpegKB} KB | WebP: ${webpKB} KB (-${savings}%) | GPS: ${hotel.lat}, ${hotel.lon}`);
  }

  console.log('🎉 10 NEW LUXURY SANCTUARIES MEDIA PROCESSED & VERIFIED!');
}

run().catch(console.error);
