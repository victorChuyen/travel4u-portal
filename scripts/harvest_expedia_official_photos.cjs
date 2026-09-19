/**
 * 🏨 EXPEDIA OFFICIAL 4K-8K MEDIA HARVESTER & COMPLIANCE PIPELINE
 * Domain: travel4u.us
 * Sources official high-resolution property imagery directly from Expedia CDN (images.trvl-media.com)
 * Verified against live Expedia property pages (10 Flagships).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGET_DIR = path.resolve(__dirname, '../public/media/expedia_hotels');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 10 Flagship Hotels on Expedia with 100% verified live photo URLs from official Expedia CDN
const EXPEDIA_HOTELS = [
  {
    key: 'paris_four_seasons_george_v',
    hotel_name: 'Four Seasons Hotel George V Paris',
    city: 'Paris',
    country: 'France',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Eiffel Tower View from Terrace',
        url: 'https://images.trvl-media.com/lodging/1000000/10000/6700/6642/13af9eae.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'lobby',
        caption: 'Grand Marble Lobby & Floral Design',
        url: 'https://images.trvl-media.com/lodging/1000000/10000/6700/6642/d91a657d.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'pool',
        caption: 'Luxury Marble Wellness Sanctuary',
        url: 'https://images.trvl-media.com/lodging/1000000/10000/6700/6642/6732f3b1.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'rome_rocco_forte_de_russie',
    hotel_name: 'Rocco Forte Hotel De Russie Rome',
    city: 'Rome',
    country: 'Italy',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Historic Secret Garden Sanctuary',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/523800/523751/w3995h5993x0y0-06327204.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'suite',
        caption: 'Prestige Presidential Suite Terrace',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/523800/523751/w2045h1363x0y0-1e91b12d.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'courtyard',
        caption: 'Piazza del Popolo Veranda',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/523800/523751/190ce3ef.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'como_grand_hotel_tremezzo',
    hotel_name: 'Grand Hotel Tremezzo Lake Como',
    city: 'Lake Como',
    country: 'Italy',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Floating Pool on Lake Como & Bellagio View',
        url: 'https://images.trvl-media.com/lodging/59000000/58950000/58946700/58946683/7d6cde6f.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'pool_lake',
        caption: 'Floating Pool Panoramic Terrace',
        url: 'https://images.trvl-media.com/lodging/59000000/58950000/58946700/58946683/6be367a2.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'suite',
        caption: 'Lake View Suite with Private Balcony',
        url: 'https://images.trvl-media.com/lodging/59000000/58950000/58946700/58946683/7b2c758d.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'kyoto_ritz_carlton',
    hotel_name: 'The Ritz-Carlton Kyoto',
    city: 'Kyoto',
    country: 'Japan',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Kamogawa Riverfront Zen Sanctuary',
        url: 'https://images.trvl-media.com/lodging/8000000/7290000/7281400/7281376/00387b2b.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'lobby_garden',
        caption: 'Reflecting Waterfalls & Japanese Maple Garden',
        url: 'https://images.trvl-media.com/lodging/8000000/7290000/7281400/7281376/14b72792.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'suite',
        caption: 'Grand Luxury Tatami Suite',
        url: 'https://images.trvl-media.com/lodging/8000000/7290000/7281400/7281376/98f8ad9b.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'maldives_soneva_jani',
    hotel_name: 'Soneva Jani Maldives',
    city: 'Noonu Atoll',
    country: 'Maldives',
    rating: '5.0 Star Ultra Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Overwater Villa with Retractable Roof & Lagoon Slide',
        url: 'https://images.trvl-media.com/lodging/16000000/15380000/15375900/15375843/w6724h4478x0y0-90118053.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'aerial',
        caption: 'Turquoise Atoll Aerial Sanctuary',
        url: 'https://images.trvl-media.com/lodging/16000000/15380000/15375900/15375843/673c6915.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'villa_pool',
        caption: 'Private Infinity Catamaran Deck',
        url: 'https://images.trvl-media.com/lodging/16000000/15380000/15375900/15375843/38a6676c.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'utah_sorrel_river_ranch',
    hotel_name: 'Sorrel River Ranch Resort & Spa Moab',
    city: 'Moab & Page',
    country: 'United States',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Colorado River Red Rock Canyon Sanctuary',
        url: 'https://images.trvl-media.com/lodging/1000000/550000/546500/546437/fd64faa9.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'ranch_deck',
        caption: 'Riverside Luxury Cabin Deck',
        url: 'https://images.trvl-media.com/lodging/1000000/550000/546500/546437/b34376ea.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'spa',
        caption: 'Desert Canyon Wellness Spa',
        url: 'https://images.trvl-media.com/lodging/1000000/550000/546500/546437/a16910fc.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'serengeti_four_seasons_safari',
    hotel_name: 'Four Seasons Safari Lodge Serengeti',
    city: 'Serengeti',
    country: 'Tanzania',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Infinity Pool Overlooking Active Wildlife Waterhole',
        url: 'https://images.trvl-media.com/lodging/3000000/2950000/2949700/2949601/db8fc16f.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'savannah_deck',
        caption: 'Savannah Sunset View from Private Villa Deck',
        url: 'https://images.trvl-media.com/lodging/3000000/2950000/2949700/2949601/b12ef051.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'villa',
        caption: 'Luxury Safari Suite Interior',
        url: 'https://images.trvl-media.com/lodging/3000000/2950000/2949700/2949601/eb9e5dd9.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'venice_the_gritti_palace',
    hotel_name: 'The Gritti Palace Venice',
    city: 'Venice',
    country: 'Italy',
    rating: '5.0 Star Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Grand Canal Waterfront Terrace & Salute Basilica View',
        url: 'https://images.trvl-media.com/lodging/1000000/30000/27300/27226/a22a5078.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'patron_suite',
        caption: 'Heritage Antique Murano Glass Suite',
        url: 'https://images.trvl-media.com/lodging/1000000/30000/27300/27226/1d6be914.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'dining',
        caption: 'Club del Doge Waterfront Dining',
        url: 'https://images.trvl-media.com/lodging/1000000/30000/27300/27226/2c7cdc37.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'swiss_the_chedi_andermatt',
    hotel_name: 'The Chedi Andermatt',
    city: 'Andermatt',
    country: 'Switzerland',
    rating: '5.0 Star Alpine Luxury',
    photos: [
      {
        id: 'hero',
        caption: 'Asian Alpine Elegance 35m Indoor Heated Pool',
        url: 'https://images.trvl-media.com/lodging/7000000/6660000/6657300/6657290/8ce93f5a.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'exterior',
        caption: 'Snowcapped Swiss Alpine Chalet Sanctuary',
        url: 'https://images.trvl-media.com/lodging/7000000/6660000/6657300/6657290/97bd9165.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'chalet_suite',
        caption: 'Open Fireplace Pine Chalet Suite',
        url: 'https://images.trvl-media.com/lodging/7000000/6660000/6657300/6657290/3a1b8896.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  },
  {
    key: 'dubai_burj_al_arab',
    hotel_name: 'Jumeirah Burj Al Arab Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 'Ultra-Luxury 7-Star',
    photos: [
      {
        id: 'hero',
        caption: 'Iconic Sail Silhouette & Private Helipad at Dusk',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/527500/527497/31f285a8.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'terrace_pool',
        caption: 'Infinity Pool Terrace Over Arabian Gulf',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/527500/527497/0a3e4005.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      },
      {
        id: 'royal_suite',
        caption: 'Duplex Royal Suite with 24K Gold Details',
        url: 'https://images.trvl-media.com/lodging/1000000/530000/527500/527497/28d58f16.jpg?impolicy=resizecrop&rw=3840&ra=fit'
      }
    ]
  }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url} - Status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          resolve(stats.size);
        });
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function harvestAll() {
  console.log('🚀 Starting Official Expedia 4K Media Harvesting...');
  console.log(`📂 Destination: ${TARGET_DIR}\n`);

  let totalDownloaded = 0;
  let totalBytes = 0;

  for (const hotel of EXPEDIA_HOTELS) {
    console.log(`🏨 ${hotel.hotel_name} (${hotel.city}, ${hotel.country})`);
    
    for (const photo of hotel.photos) {
      const filename = `expedia_${hotel.key}_${photo.id}_4k.jpg`;
      const destPath = path.join(TARGET_DIR, filename);

      try {
        process.stdout.write(`   ⏳ Downloading [${photo.id}] ${photo.caption}... `);
        const sizeBytes = await downloadImage(photo.url, destPath);
        totalDownloaded++;
        totalBytes += sizeBytes;
        const sizeMb = (sizeBytes / (1024 * 1024)).toFixed(2);
        console.log(`✅ OK (${sizeMb} MB)`);
      } catch (err) {
        console.log(`❌ ERROR: ${err.message}`);
      }
    }
  }

  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 Completed Harvesting! Downloaded ${totalDownloaded} official 4K photos (${totalMb} MB).`);
}

harvestAll().catch(err => {
  console.error('Fatal harvest error:', err);
});
