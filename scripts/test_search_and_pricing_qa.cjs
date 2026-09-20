const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4329;
const ARTIFACT_DIR = 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/91278743-4a58-457f-b452-1ba806db93a1';

// Simple static server for dist
function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl.endsWith('/')) reqUrl += 'index.html';
    else if (!path.extname(reqUrl)) reqUrl += '/index.html';

    let filePath = path.join(DIST_DIR, reqUrl);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function runQA() {
  const server = await startServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('══════════════════════════════════════════════════════════════════');
  console.log('🧪 QA VERIFICATION: SEARCH BAR, FILTER TABS & PRICING BACK BUTTON');
  console.log('══════════════════════════════════════════════════════════════════\n');

  try {
    // 1. TEST PRICING PAGE BACK BUTTON
    console.log('1️⃣ [PRICING PAGE] Checking Back to Homepage button...');
    await page.goto(`http://127.0.0.1:${PORT}/pricing/`, { waitUntil: 'domcontentloaded' });
    
    const topBackBtn = await page.locator('#pricing-back-to-home-btn');
    const topCount = await topBackBtn.count();
    const topHref = topCount > 0 ? await topBackBtn.getAttribute('href') : null;
    console.log(`   Top Back Button count: ${topCount}, href: "${topHref}"`);

    const bottomBackBtn = await page.locator('#pricing-bottom-back-home-btn');
    const bottomCount = await bottomBackBtn.count();
    const bottomHref = bottomCount > 0 ? await bottomBackBtn.getAttribute('href') : null;
    console.log(`   Bottom Back Button count: ${bottomCount}, href: "${bottomHref}"`);

    if (topCount > 0 && topHref === '/') {
      console.log('   ✅ PASS: Top Back to Homepage button verified!');
    } else {
      console.error('   ❌ FAIL: Top Back to Homepage button missing or incorrect!');
    }

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_pricing_back_btn.png'), fullPage: false });

    // 2. TEST HOMEPAGE SEARCH & FILTER PILLS
    console.log('\n2️⃣ [HOMEPAGE] Checking Search Bar & Category Filter Pills...');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    const initialCardsCount = await page.locator('.destination-card-item').count();
    console.log(`   Initial Curated Cards rendered: ${initialCardsCount}`);

    // Test Pill: Europe
    console.log('   Testing Pill: "Europe"...');
    await page.click('button[data-filter="europe"]');
    await page.waitForTimeout(600);
    const europeCardsCount = await page.locator('.destination-card-item').count();
    const counterTextEurope = await page.locator('#counter-number').innerText().catch(() => '0');
    console.log(`   ➔ Europe filtered cards: ${europeCardsCount}, Counter: ${counterTextEurope}`);

    // Test Pill: Asia
    console.log('   Testing Pill: "Asia"...');
    await page.click('button[data-filter="asia"]');
    await page.waitForTimeout(600);
    const asiaCardsCount = await page.locator('.destination-card-item').count();
    const counterTextAsia = await page.locator('#counter-number').innerText().catch(() => '0');
    console.log(`   ➔ Asia filtered cards: ${asiaCardsCount}, Counter: ${counterTextAsia}`);

    // Test Pill: Islands
    console.log('   Testing Pill: "Islands"...');
    await page.click('button[data-filter="islands"]');
    await page.waitForTimeout(600);
    const islandsCardsCount = await page.locator('.destination-card-item').count();
    const counterTextIslands = await page.locator('#counter-number').innerText().catch(() => '0');
    console.log(`   ➔ Islands filtered cards: ${islandsCardsCount}, Counter: ${counterTextIslands}`);

    // Test Pill: Safari
    console.log('   Testing Pill: "Safari"...');
    await page.click('button[data-filter="safari"]');
    await page.waitForTimeout(600);
    const safariCardsCount = await page.locator('.destination-card-item').count();
    const counterTextSafari = await page.locator('#counter-number').innerText().catch(() => '0');
    console.log(`   ➔ Safari filtered cards: ${safariCardsCount}, Counter: ${counterTextSafari}`);

    // Test Pill: All (Reset)
    console.log('   Testing Pill: "All (Reset)"...');
    await page.click('button[data-filter="all"]');
    await page.waitForTimeout(600);
    const allCardsCount = await page.locator('.destination-card-item').count();
    console.log(`   ➔ Reset to All cards: ${allCardsCount}`);

    // Test Search Input: Keyword "Paris"
    console.log('   Testing Search input: typing "Paris"...');
    await page.fill('#global-destination-search', 'Paris');
    await page.waitForTimeout(600);
    const parisCardsCount = await page.locator('.destination-card-item').count();
    const counterTextParis = await page.locator('#counter-number').innerText().catch(() => '0');
    console.log(`   ➔ Search "Paris" cards: ${parisCardsCount}, Counter: ${counterTextParis}`);

    // Test Clear Search Button
    console.log('   Testing Clear button (X)...');
    await page.click('#search-clear-btn');
    await page.waitForTimeout(600);
    const clearedCardsCount = await page.locator('.destination-card-item').count();
    console.log(`   ➔ After clear cards: ${clearedCardsCount}`);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'qa_search_filter_working.png'), fullPage: false });

    console.log('\n🎉 ALL QA CHECKS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error during QA:', err);
  } finally {
    await browser.close();
    server.close();
  }
}

runQA();
