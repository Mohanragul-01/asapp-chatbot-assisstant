const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting development servers...\n');

// Start backend server
console.log('📡 Starting backend server...');
const backend = spawn('python', ['run.py'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
console.log('🎨 Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

backend.on('error', (err) => {
  console.error('❌ Backend error:', err);
});

frontend.on('error', (err) => {
  console.error('❌ Frontend error:', err);
});

console.log('✅ Development servers started!');
console.log('🌐 Frontend: http://localhost:5173');
console.log('🔧 Backend: http://localhost:5000');
console.log('\nPress Ctrl+C to stop both servers');
