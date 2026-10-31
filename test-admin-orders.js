#!/usr/bin/env node

/**
 * Test script to verify admin orders delete and status update functionality
 * Run with: node test-admin-orders.js
 */

const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_ADMIN_EMAIL = 'admin@trueautocheck.com';
const TEST_ADMIN_PASS = 'Admin123@Secure';

let authToken = null;

// Utility function to make HTTP requests
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Login function
async function login() {
  console.log('\n🔐 Logging in...');
  const response = await makeRequest('POST', '/api/admin/login', {
    email: TEST_ADMIN_EMAIL,
    password: TEST_ADMIN_PASS,
  });

  if (response.status !== 200 || !response.data.token) {
    console.error('❌ Login failed:', response.data);
    process.exit(1);
  }

  authToken = response.data.token;
  console.log('✅ Login successful');
  console.log(`   Token: ${authToken.substring(0, 20)}...`);
}

// Get all orders
async function getOrders() {
  console.log('\n📋 Fetching orders...');
  const response = await makeRequest('GET', '/api/admin/orders');

  if (!response.data.success || !response.data.orders) {
    console.error('❌ Failed to fetch orders:', response.data);
    return null;
  }

  console.log(`✅ Got ${response.data.orders.length} orders`);
  return response.data.orders;
}

// Test status update
async function testStatusUpdate(orderId) {
  console.log(`\n🔄 Testing status update for order ${orderId}...`);
  
  // Get current status
  const orders = await getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    console.warn(`⚠️ Order ${orderId} not found`);
    return false;
  }
  
  const currentStatus = order.status;
  const newStatus = currentStatus === 'pending' ? 'processing' : 'pending';
  
  console.log(`   Current status: ${currentStatus}`);
  console.log(`   New status: ${newStatus}`);
  
  const response = await makeRequest(
    'PUT',
    `/api/admin/orders/${orderId}/status`,
    { reportStatus: newStatus }
  );

  if (response.status !== 200 || !response.data.success) {
    console.error(`❌ Status update failed:`, response.data);
    return false;
  }

  console.log(`✅ Status updated successfully`);
  console.log(`   Updated order:`, response.data.order);

  // Verify it was actually updated
  const updatedOrders = await getOrders();
  const updatedOrder = updatedOrders.find(o => o.id === orderId);
  
  if (updatedOrder.status === newStatus) {
    console.log(`✅ Verification: Status is now ${updatedOrder.status}`);
    return true;
  } else {
    console.error(`❌ Verification failed: Status is ${updatedOrder.status}, expected ${newStatus}`);
    return false;
  }
}

// Test delete
async function testDelete(orderId) {
  console.log(`\n🗑️ Testing delete for order ${orderId}...`);
  
  // Verify order exists before delete
  let orders = await getOrders();
  let order = orders.find(o => o.id === orderId);
  if (!order) {
    console.warn(`⚠️ Order ${orderId} not found`);
    return false;
  }
  console.log(`   Order exists: ${order.order_number}`);
  
  // Delete it
  const response = await makeRequest('DELETE', `/api/admin/orders/${orderId}`);

  if (response.status !== 200 || !response.data.success) {
    console.error(`❌ Delete failed:`, response.data);
    return false;
  }

  console.log(`✅ Delete request succeeded`);

  // Verify it was actually deleted
  orders = await getOrders();
  order = orders.find(o => o.id === orderId);
  
  if (!order) {
    console.log(`✅ Verification: Order no longer exists`);
    return true;
  } else {
    console.error(`❌ Verification failed: Order still exists with status ${order.status}`);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('========================================');
  console.log('   Admin Orders Functionality Tests');
  console.log('========================================');

  try {
    // Step 1: Login
    await login();

    // Step 2: Get orders
    const orders = await getOrders();
    if (!orders || orders.length === 0) {
      console.log('⚠️ No orders found. Cannot run tests.');
      console.log('   Create an order first, then run this test again.');
      process.exit(0);
    }

    // Step 3: Test status update on first order
    const firstOrderId = orders[0].id;
    const statusUpdateSuccess = await testStatusUpdate(firstOrderId);

    // Step 4: Test delete on second order (if available)
    let deleteSuccess = true;
    if (orders.length > 1) {
      const secondOrderId = orders[1].id;
      deleteSuccess = await testDelete(secondOrderId);
    } else {
      console.log('\n⚠️ Only one order available. Skipping delete test.');
      console.log('   Create another order to test delete functionality.');
    }

    // Results
    console.log('\n========================================');
    console.log('   Test Results');
    console.log('========================================');
    console.log(`Status Update: ${statusUpdateSuccess ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Delete:        ${deleteSuccess ? '✅ PASS' : '❌ FAIL'}`);
    console.log('========================================\n');

    if (statusUpdateSuccess && deleteSuccess) {
      console.log('✅ All tests passed!');
      process.exit(0);
    } else {
      console.log('❌ Some tests failed. Check the output above for details.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
    process.exit(1);
  }
}

// Run tests
runTests();
