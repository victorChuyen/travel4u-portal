/**
 * Setup OPC CRM Tab on Master Google Sheet
 */
const { setupCrmTab, CRM_TAB } = require('../../credentials/travel4you/lib/crm_sheets');

async function main() {
  console.log('🚀 [OPC CRM Setup] Initializing CRM tab on Google Sheets...');
  const success = await setupCrmTab();
  if (success) {
    console.log(`🎉 [OPC CRM Setup] Successfully verified and initialized tab: ${CRM_TAB}`);
  } else {
    console.error('❌ [OPC CRM Setup] Failed initializing tab.');
  }
}

main().catch(console.error);
