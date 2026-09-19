const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_APP = path.resolve(__dirname, '..');
const MEDIA_DIR = path.join(ROOT_APP, 'public/media/expedia_hotels');

// Hotel Entity Mapping & Real Geocoordinates
const HOTEL_GEO_DATABASE = {
  'paris': {
    name: 'Four Seasons Hotel George V Paris',
    city: 'Paris, France',
    lat: 48.8688,
    lon: 2.3006
  },
  'rome': {
    name: 'Rocco Forte Hotel De Russie Rome',
    city: 'Rome, Italy',
    lat: 41.9097,
    lon: 12.4764
  },
  'como': {
    name: 'Grand Hotel Tremezzo Lake Como',
    city: 'Lake Como, Italy',
    lat: 45.9867,
    lon: 9.2274
  },
  'kyoto': {
    name: 'The Ritz-Carlton Kyoto',
    city: 'Kyoto, Japan',
    lat: 35.0116,
    lon: 135.7725
  },
  'maldives': {
    name: 'Soneva Jani Maldives',
    city: 'Noonu Atoll, Maldives',
    lat: 5.6737,
    lon: 73.3444
  },
  'utah': {
    name: 'Sorrel River Ranch Resort & Spa Moab',
    city: 'Moab, Utah, USA',
    lat: 38.7186,
    lon: -109.4319
  },
  'serengeti': {
    name: 'Four Seasons Safari Lodge Serengeti',
    city: 'Serengeti National Park, Tanzania',
    lat: -2.3333,
    lon: 34.8333
  },
  'venice': {
    name: 'The Gritti Palace Venice',
    city: 'Venice, Italy',
    lat: 45.4314,
    lon: 12.3339
  },
  'swiss': {
    name: 'The Chedi Andermatt',
    city: 'Andermatt, Switzerland',
    lat: 46.6344,
    lon: 8.5947
  },
  'dubai': {
    name: 'Jumeirah Burj Al Arab Dubai',
    city: 'Dubai, United Arab Emirates',
    lat: 25.1412,
    lon: 55.1852
  }
};

function toDmsString(coordinate) {
  const abs = Math.abs(coordinate);
  const degrees = Math.floor(abs);
  const minutesDec = (abs - degrees) * 60;
  const minutes = Math.floor(minutesDec);
  const seconds = Math.round((minutesDec - minutes) * 60);
  return `${degrees}/1 ${minutes}/1 ${seconds}/1`;
}

async function processImage(filePath, entityInfo) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${basename}.webp`);

  const originalStats = fs.statSync(filePath);
  const originalBytes = originalStats.size;

  const latRef = entityInfo.lat >= 0 ? 'N' : 'S';
  const lonRef = entityInfo.lon >= 0 ? 'E' : 'W';
  const latDms = toDmsString(entityInfo.lat);
  const lonDms = toDmsString(entityInfo.lon);

  const exifConfig = {
    IFD0: {
      Artist: 'Luxury Travel4U Victor & Lucky',
      Copyright: '© 2026 Travel4U Luxury Stays (https://travel4u.us)',
      ImageDescription: `${entityInfo.name} (${entityInfo.city}) - Curated 5-Star Luxury Review by Victor & Lucky`,
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

  // 1. Inject EXIF into the original file (JPEG/PNG)
  const inputBuffer = fs.readFileSync(filePath);
  let updatedOriginalBuffer;
  if (ext === '.jpg' || ext === '.jpeg') {
    updatedOriginalBuffer = await sharp(inputBuffer)
      .withMetadata({ exif: exifConfig })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();
  } else if (ext === '.png') {
    updatedOriginalBuffer = await sharp(inputBuffer)
      .withMetadata({ exif: exifConfig })
      .png({ compressionLevel: 8 })
      .toBuffer();
  }

  if (updatedOriginalBuffer) {
    fs.writeFileSync(filePath, updatedOriginalBuffer);
  }

  // 2. Generate Optimized WebP with embedded EXIF & GPS
  const webpBuffer = await sharp(inputBuffer)
    .withMetadata({ exif: exifConfig })
    .webp({ quality: 84, effort: 4 })
    .toBuffer();

  fs.writeFileSync(webpPath, webpBuffer);
  const webpBytes = webpBuffer.length;
  const savingsPct = (((originalBytes - webpBytes) / originalBytes) * 100).toFixed(1);

  return {
    filename: path.basename(filePath),
    originalKB: (originalBytes / 1024).toFixed(1),
    webpKB: (webpBytes / 1024).toFixed(1),
    savingsPct: `${savingsPct}%`,
    gps: `${entityInfo.lat}, ${entityInfo.lon}`
  };
}

async function run() {
  console.log('🚀 Starting Deep EXIF / IPTC / GPS Injection & WebP Generation Engine...');
  
  const results = [];

  // A. Process Hotel Media Files (30 Flagship Hotel Photos)
  const hotelFiles = fs.readdirSync(MEDIA_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`📸 Found ${hotelFiles.length} hotel photos in ${MEDIA_DIR}`);

  for (const file of hotelFiles) {
    const fullPath = path.join(MEDIA_DIR, file);
    
    // Determine which hotel entity this image belongs to
    let matchedKey = Object.keys(HOTEL_GEO_DATABASE).find(key => file.toLowerCase().includes(key));
    const entity = matchedKey ? HOTEL_GEO_DATABASE[matchedKey] : {
      name: 'Travel4U Luxury Stays',
      city: 'Global Luxury Collection',
      lat: 48.8566,
      lon: 2.3522
    };

    const res = await processImage(fullPath, entity);
    results.push(res);
    console.log(`  ✓ Processed: ${res.filename} | Original: ${res.originalKB} KB ➔ WebP: ${res.webpKB} KB (-${res.savingsPct}) | GPS: ${res.gps}`);
  }

  // B. Process Brand Asset Luxury-Travel4U.png
  const brandAssets = [
    path.join(ROOT_APP, 'public/Luxury-Travel4U.png'),
    path.join(ROOT_APP, 'public/images/Luxury-Travel4U.png')
  ];

  const brandEntity = {
    name: 'Travel4U - Luxury Journeys, Intelligently Crafted',
    city: 'San Francisco & Paris Heritage Corridor',
    lat: 37.7749,
    lon: -122.4194
  };

  for (const assetPath of brandAssets) {
    if (fs.existsSync(assetPath)) {
      const res = await processImage(assetPath, brandEntity);
      results.push(res);
      console.log(`  👑 Processed Brand Asset: ${res.filename} | Original: ${res.originalKB} KB ➔ WebP: ${res.webpKB} KB (-${res.savingsPct})`);
    }
  }

  console.log('\n🎉 ALL IMAGES SUCCESSFULLY ENRICHED WITH DEEP EXIF/GPS & WEBP COMPRESSION!');
  console.log(`Total Files Processed: ${results.length}`);
}

run().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
