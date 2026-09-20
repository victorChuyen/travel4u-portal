/**
 * 🧪 TEST FUNNEL PAYMENT SIMULATION & CRM DISPATCH
 * Simulates a client placing a 50% deposit (5.000.000 VNĐ) for GÓI 03 — DFY OPC AI REVENUE SYSTEM.
 * Tests:
 *   1. Record to Google Sheets CRM ('OPC_CRM_CUSTOMERS')
 *   2. Dispatch Realtime Telegram Notification to Chairman Victor
 */

const { recordCustomerToCrm } = require('../../credentials/travel4you/lib/crm_sheets');
const { sendLeadOrPaymentAlert } = require('../../credentials/travel4you/lib/telegram_alert');

async function testSimulation() {
  console.log('🧪 [Test Funnel CRM] Starting test simulation for a customer deposit...');

  const mockOrder = {
    order_id: `OPC388_${Math.floor(1000 + Math.random() * 9000)}`,
    name: 'Trần Hoàng Nam',
    phone: '0989890022',
    email: 'nam.tran@luxuryland.vn',
    business: 'Bất Động Sản Nghỉ Dưỡng Luxury Land',
    tier: 'revenue-system',
    tier_name: 'GÓI 03 — OPC AI REVENUE SYSTEM (DFY)',
    payment_type: 'deposit',
    amount_paid: 5000000,
    amount_remaining: 5000000,
    sepay_txn_id: `SEPAY_SIM_${Date.now()}`,
    status: 'Đã Cọc 50%',
    drive_folder: 'https://drive.google.com/drive/folders/mock_client_folder',
    meeting_time: '14:00 - Thứ Ba tuần tới',
    assigned_to: 'Victor Chuyen',
    notes: 'Khách hàng có sẵn 500 biệt thự nghỉ dưỡng, cần AI tự động hóa cẩm nang và quản lý lead Zalo.'
  };

  console.log('1️⃣ Step 1: Recording to Master Google Sheets CRM (OPC_CRM_CUSTOMERS)...');
  const sheetRes = await recordCustomerToCrm(mockOrder);
  if (sheetRes) {
    console.log('   ✅ Successfully appended order to Google Sheet CRM!');
  } else {
    console.warn('   ⚠️ Could not record to Google Sheets CRM.');
  }

  console.log('\n2️⃣ Step 2: Dispatching Realtime Telegram Alert to Chairman Victor...');
  const teleOk = await sendLeadOrPaymentAlert(mockOrder);
  if (teleOk) {
    console.log('   ✅ Telegram alert successfully delivered to Chairman Victor!');
  } else {
    console.warn('   ⚠️ Telegram alert failed to send.');
  }

  console.log('\n🎉 [Test Funnel CRM] Full simulation completed!');
}

testSimulation().catch(console.error);
