const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://travel4u-us-portal.pages.dev';
const ARTIFACT_DIR = 'C:/Users/Victor Chuyen/.gemini/antigravity/brain/91278743-4a58-457f-b452-1ba806db93a1';

async function runLiveAudit() {
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('🌐 AUDIT GO-LIVE TRỰC TIẾP TRÊN CLOUDFLARE EDGE:');
  console.log('   Target: ' + BASE_URL);
  console.log('══════════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const auditReport = {
    home: false,
    pricing: false,
    checkout: false,
    vietqr: false,
    timer: false,
    toggle50: false,
    thankYou: false
  };

  try {
    // 1. HOME
    console.log('1️⃣ [HOME] ' + BASE_URL);
    const homeRes = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const homeTitle = await page.title();
    console.log('   ➔ HTTP: ' + (homeRes ? homeRes.status() : 'N/A') + ' | Title: ' + homeTitle);
    auditReport.home = homeRes && homeRes.status() === 200;

    // 2. PRICING
    console.log('\n2️⃣ [PRICING] ' + BASE_URL + '/pricing/');
    const pricingRes = await page.goto(BASE_URL + '/pricing/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    const guarantee = await page.locator('text=100% Không Rủi Ro').count();
    const faqCount = await page.locator('summary:has-text("Đặt cọc 50%")').count();
    console.log('   ➔ HTTP: ' + (pricingRes ? pricingRes.status() : 'N/A') + ' | Guarantee: ' + (guarantee > 0) + ' | FAQ: ' + (faqCount > 0));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_cloudflare_pricing.png'), fullPage: true });
    auditReport.pricing = guarantee > 0 && faqCount > 0;

    // 3. CHECKOUT
    console.log('\n3️⃣ [CHECKOUT] ' + BASE_URL + '/checkout/builder-sprint/');
    const checkoutRes = await page.goto(BASE_URL + '/checkout/builder-sprint/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1000);
    
    // Check countdown timer
    const timer = await page.locator('#countdown-timer').innerText().catch(() => '');
    console.log('   ➔ Đồng hồ giữ chỗ ưu đãi: ' + timer);
    auditReport.timer = timer.includes(':');

    // Fill form
    await page.fill('#cust-name', 'Victor Chuyen QA VIP');
    await page.fill('#cust-phone', '0989890022');
    await page.fill('#cust-email', 'coach.chuyen@gmail.com');
    await page.fill('#cust-business', 'Travel4U Luxury AI Empire');
    console.log('   📝 Đã điền thông tin: Victor Chuyen | 0989890022 | coach.chuyen@gmail.com');

    // Check default deposit price
    const initialAmount = await page.locator('#display-amount').innerText().catch(() => '');
    const qrSrc = await page.locator('#vietqr-image').getAttribute('src').catch(() => '');
    console.log('   ➔ Số tiền hiển thị: ' + initialAmount);
    console.log('   ➔ VietQR Image URL: ' + qrSrc);
    auditReport.vietqr = qrSrc && qrSrc.includes('BIDV-96247688688') && qrSrc.includes('1800000');
    auditReport.toggle50 = initialAmount.includes('1.800.000');

    // Test Quick Copy STK
    await page.click('#btn-copy-acc');
    await page.waitForTimeout(500);

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_cloudflare_checkout.png'), fullPage: true });
    auditReport.checkout = true;

    // 4. SUBMIT & CONFIRM -> THANK YOU
    console.log('\n4️⃣ [SUBMIT] Bấm "XÁC NHẬN ĐÃ CHUYỂN KHOẢN"...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {}),
      page.click('#btn-confirm-payment')
    ]);
    await page.waitForTimeout(2000);
    console.log('   ➔ URL hiện tại: ' + page.url());
    const thankTitle = await page.title();
    console.log('   ➔ Title: ' + thankTitle);

    const orderId = await page.locator('#display-order-id, [data-order-id]').innerText().catch(() => '');
    const zaloLink = await page.locator('a[href*="zalo.me"]').getAttribute('href').catch(() => '');
    console.log('   ➔ Mã đơn hàng: ' + (orderId || 'Đã ghi nhận') + ' | Zalo Hotline: ' + zaloLink);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'live_cloudflare_thankyou.png'), fullPage: true });
    auditReport.thankYou = zaloLink && zaloLink.includes('0989890022');

    console.log('\n══════════════════════════════════════════════════════════════════');
    console.log('🏆 KẾT QUẢ AUDIT GO-LIVE TRỰC TIẾP TRÊN CLOUDFLARE EDGE:');
    console.log(JSON.stringify(auditReport, null, 2));
    console.log('══════════════════════════════════════════════════════════════════');
  } catch (e) {
    console.error('Audit Error:', e.message);
  } finally {
    await browser.close();
  }
}

runLiveAudit();
