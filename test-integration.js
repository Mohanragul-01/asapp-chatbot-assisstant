const fetch = require('node-fetch');

async function testBackendAPI() {
  console.log('🧪 Testing Backend API Integration...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:5000/');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test chat endpoint
    console.log('\n2. Testing chat endpoint...');
    const chatResponse = await fetch('http://localhost:5000/api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello, how can I help you?' }),
    });
    const chatData = await chatResponse.json();
    console.log('✅ Chat response:', {
      userMessage: chatData.user_message,
      predictedLabel: chatData.predicted_label,
      botResponse: chatData.bot_response
    });

    // Test feedback endpoint
    console.log('\n3. Testing feedback endpoint...');
    const feedbackResponse = await fetch('http://localhost:5000/api/feedback/report_incorrect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: 'Test message',
        predicted_label: 'TestLabel',
        correct_label: 'CorrectLabel'
      }),
    });
    const feedbackData = await feedbackResponse.json();
    console.log('✅ Feedback response:', feedbackData.message);

    console.log('\n🎉 All API tests passed! Backend is ready for frontend integration.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure the backend server is running:');
    console.log('   cd backend && python run.py');
  }
}

// Run the test
testBackendAPI();
