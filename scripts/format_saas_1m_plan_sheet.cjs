/**
 * Format PLAN_SAAS_1M_DOLLAR on Master Google Sheet
 * Adds Executive Styling: Column widths, Fonts, Colors, Alignments
 */

const { getAccessToken } = require('../../credentials/travel4you/lib/auth');

const MASTER_SHEET_ID = '15G6SYG8KmtYF9DYg4g1UyOchJ3p8bjBAIEahC47z1nU';
const SHEET_GID = 827789878; // PLAN_SAAS_1M_DOLLAR

async function main() {
  const token = await getAccessToken();

  const requests = [
    // 1. Column Widths
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 0, endIndex: 1 }, properties: { pixelSize: 70 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 1, endIndex: 2 }, properties: { pixelSize: 220 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 2, endIndex: 3 }, properties: { pixelSize: 420 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 3, endIndex: 4 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 4, endIndex: 5 }, properties: { pixelSize: 110 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 5, endIndex: 6 }, properties: { pixelSize: 160 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 6, endIndex: 7 }, properties: { pixelSize: 140 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 7, endIndex: 8 }, properties: { pixelSize: 180 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 8, endIndex: 9 }, properties: { pixelSize: 150 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 9, endIndex: 10 }, properties: { pixelSize: 110 }, fields: 'pixelSize' } },
    { updateDimensionProperties: { range: { sheetId: SHEET_GID, dimension: 'COLUMNS', startIndex: 10, endIndex: 11 }, properties: { pixelSize: 280 }, fields: 'pixelSize' } },

    // 2. Banner Row 1: Title (Dark Navy + Gold)
    {
      repeatCell: {
        range: { sheetId: SHEET_GID, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 11 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.04, green: 0.09, blue: 0.16 },
            textFormat: { foregroundColor: { red: 0.85, green: 0.70, blue: 0.35 }, bold: true, fontSize: 13, fontFamily: 'Arial' },
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
      }
    },

    // 3. Banner Row 2: Subtitle
    {
      repeatCell: {
        range: { sheetId: SHEET_GID, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 0, endColumnIndex: 11 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.07, green: 0.13, blue: 0.22 },
            textFormat: { foregroundColor: { red: 0.9, green: 0.9, blue: 0.95 }, italic: true, bold: true, fontSize: 10, fontFamily: 'Arial' },
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
      }
    },

    // 4. Banner Row 3: Timestamp
    {
      repeatCell: {
        range: { sheetId: SHEET_GID, startRowIndex: 2, endRowIndex: 3, startColumnIndex: 0, endColumnIndex: 11 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.95, green: 0.96, blue: 0.98 },
            textFormat: { foregroundColor: { red: 0.3, green: 0.35, blue: 0.45 }, fontSize: 9, italic: true },
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
      }
    }
  ];

  // Helper to color section headers and table headers
  const sectionRowIndices = [4, 11, 19, 45, 51, 61, 71];
  for (const sRow of sectionRowIndices) {
    // Section Title
    requests.push({
      repeatCell: {
        range: { sheetId: SHEET_GID, startRowIndex: sRow, endRowIndex: sRow + 1, startColumnIndex: 0, endColumnIndex: 11 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.11, green: 0.16, blue: 0.23 },
            textFormat: { foregroundColor: { red: 0.96, green: 0.65, blue: 0.15 }, bold: true, fontSize: 11, fontFamily: 'Arial' },
            verticalAlignment: 'MIDDLE'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
      }
    });

    // Table Header below Section Title
    requests.push({
      repeatCell: {
        range: { sheetId: SHEET_GID, startRowIndex: sRow + 1, endRowIndex: sRow + 2, startColumnIndex: 0, endColumnIndex: 11 },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.2, green: 0.25, blue: 0.33 },
            textFormat: { foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }, bold: true, fontSize: 9, fontFamily: 'Arial' },
            verticalAlignment: 'MIDDLE',
            horizontalAlignment: 'CENTER'
          }
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment,horizontalAlignment)'
      }
    });
  }

  // Highlight Row 18: Total row
  requests.push({
    repeatCell: {
      range: { sheetId: SHEET_GID, startRowIndex: 17, endRowIndex: 18, startColumnIndex: 0, endColumnIndex: 11 },
      cell: {
        userEnteredFormat: {
          backgroundColor: { red: 0.88, green: 0.95, blue: 0.88 },
          textFormat: { foregroundColor: { red: 0.05, green: 0.4, blue: 0.1 }, bold: true, fontSize: 10 },
          verticalAlignment: 'MIDDLE'
        }
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
    }
  });

  // Highlight Row 43: Month 22 reaching $1M milestone
  requests.push({
    repeatCell: {
      range: { sheetId: SHEET_GID, startRowIndex: 42, endRowIndex: 43, startColumnIndex: 0, endColumnIndex: 11 },
      cell: {
        userEnteredFormat: {
          backgroundColor: { red: 1.0, green: 0.94, blue: 0.8 },
          textFormat: { foregroundColor: { red: 0.7, green: 0.4, blue: 0.0 }, bold: true, fontSize: 10 },
          verticalAlignment: 'MIDDLE'
        }
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
    }
  });

  // Highlight Row 45: Month 24 Grand Finale
  requests.push({
    repeatCell: {
      range: { sheetId: SHEET_GID, startRowIndex: 44, endRowIndex: 45, startColumnIndex: 0, endColumnIndex: 11 },
      cell: {
        userEnteredFormat: {
          backgroundColor: { red: 0.85, green: 0.95, blue: 0.85 },
          textFormat: { foregroundColor: { red: 0.05, green: 0.45, blue: 0.15 }, bold: true, fontSize: 10 },
          verticalAlignment: 'MIDDLE'
        }
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment)'
    }
  });

  console.log(`🎨 [Format Plan] Applying ${requests.length} styling requests to PLAN_SAAS_1M_DOLLAR...`);

  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${MASTER_SHEET_ID}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!res.ok) {
    throw new Error(`Format batchUpdate failed: ${res.status} ${await res.text()}`);
  }

  console.log(`✅ [Format Plan] Successfully styled PLAN_SAAS_1M_DOLLAR with Dark Luxury theme!`);
}

main().catch(console.error);
