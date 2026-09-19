const fs = require('fs');

const enHtml = fs.readFileSync('dist/experience/passalacqua-lake-como/index.html', 'utf8');
const viHtml = fs.readFileSync('dist/vi/experience/khach-san-passalacqua-ho-como-vip/index.html', 'utf8');

console.log('--- ENGLISH AUDIT ---');
console.log('✓ Breadcrumbs present:', enHtml.includes('aria-label="Breadcrumb"'));
console.log('✓ SanctuaryNav present:', enHtml.includes('aria-label="Sanctuary Navigation"'));
console.log('✓ RelatedSanctuaries present:', enHtml.includes('Topical Sovereign Mesh'));
console.log('✓ In-text link to Villa d\'Este:', enHtml.includes('/experience/villa-deste-lake-como/'));
console.log('✓ In-text link to Tremezzo:', enHtml.includes('/experience/como-grand-hotel-tremezzo/'));

console.log('\n--- VIETNAMESE AUDIT ---');
console.log('✓ Breadcrumbs present:', viHtml.includes('aria-label="Breadcrumb"'));
console.log('✓ SanctuaryNav present:', viHtml.includes('aria-label="Sanctuary Navigation"'));
console.log('✓ RelatedSanctuaries present:', viHtml.includes('Topical Sovereign Mesh'));
console.log('✓ In-text link to Villa d\'Este:', viHtml.includes('biet-thu-cung-dien-villa-deste-cernobbio-ho-como-vip'));
console.log('✓ In-text link to Tremezzo:', viHtml.includes('khach-san-grand-hotel-tremezzo-ho-como-vip'));
