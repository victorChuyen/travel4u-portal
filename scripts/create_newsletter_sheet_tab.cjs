const path = require('path');
const ROOT_APP = path.resolve(__dirname, '..');
const { SPREADSHEET_18_THEMES_ID } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/config.js'));
const { getAccessToken } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/auth.js'));
const { writeRange } = require(path.resolve(ROOT_APP, '../credentials/travel4you/lib/sheets.js'));

const TAB_NAME = 'NEWSLETTER_SUBSCRIBERS';
const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

async function setupNewsletterTab() {
  console.log(`📋 Checking if tab "${TAB_NAME}" exists in Master Spreadsheet...`);
  const token = await getAccessToken();

  const metaRes = await fetch(`${SHEETS_BASE}/${SPREADSHEET_18_THEMES_ID}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const meta = await metaRes.json();
  const existingSheet = meta.sheets.find(s => s.properties.title === TAB_NAME);

  let sheetId;
  if (!existingSheet) {
    console.log(`➕ Creating new tab "${TAB_NAME}"...`);
    const addRes = await fetch(`${SHEETS_BASE}/${SPREADSHEET_18_THEMES_ID}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            addSheet: {
              properties: {
                title: TAB_NAME,
                gridProperties: {
                  rowCount: 1000,
                  columnCount: 12,
                  frozenRowCount: 1
                },
                tabColor: { red: 0.79, green: 0.65, blue: 0.31 } // Gold color
              }
            }
          }
        ]
      })
    });
    const addData = await addRes.json();
    sheetId = addData.replies[0].addSheet.properties.sheetId;
    console.log(`✅ Created tab "${TAB_NAME}" with gid: ${sheetId}`);
  } else {
    sheetId = existingSheet.properties.sheetId;
    console.log(`ℹ️ Tab "${TAB_NAME}" already exists with gid: ${sheetId}`);
  }

  // Define Standard 10 Columns
  const headers = [
    [
      'STT',
      'Thời Gian Đăng Ký',
      'Email Độc Giả',
      'Danh Xưng / Tên',
      'Ngách Quan Tâm Ưa Thích',
      'Ngôn Ngữ',
      'Mã Đối Tác (Ref)',
      'URL Nguồn Đăng Ký',
      'Trạng Thái Welcome Email',
      'Ý Kiến / Khảo Sát Cầu Thị'
    ]
  ];

  console.log(`📝 Writing header row to "${TAB_NAME}"!A1:J1...`);
  await writeRange(`'${TAB_NAME}'!A1:J1`, headers, SPREADSHEET_18_THEMES_ID);

  // Format Header with Obsidian Navy & Gold text
  console.log(`🎨 Formatting header with Obsidian Navy & Gold...`);
  await fetch(`${SHEETS_BASE}/${SPREADSHEET_18_THEMES_ID}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 10
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.04, green: 0.09, blue: 0.15 }, // #0b1726
                textFormat: {
                  foregroundColor: { red: 0.82, green: 0.67, blue: 0.35 }, // #d4a359
                  bold: true,
                  fontSize: 10
                },
                horizontalAlignment: 'CENTER'
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        }
      ]
    })
  });

  console.log(`🏆 Tab "${TAB_NAME}" initialized and styled successfully!`);
}

setupNewsletterTab().catch(err => {
  console.error('❌ setupNewsletterTab error:', err);
  process.exit(1);
});
