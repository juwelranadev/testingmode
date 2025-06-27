#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up iTonzi Full-Stack Application...\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Create server .env file if it doesn't exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const serverEnvExamplePath = path.join(__dirname, 'server', 'env.example');

if (!fs.existsSync(serverEnvPath) && fs.existsSync(serverEnvExamplePath)) {
  try {
    fs.copyFileSync(serverEnvExamplePath, serverEnvPath);
    console.log('✅ Created server/.env file from template');
  } catch (error) {
    console.error('❌ Failed to create server/.env file:', error.message);
  }
}

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing backend dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  
  console.log('✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Create logs directory
const logsDir = path.join(__dirname, 'server', 'logs');
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log('✅ Created server/logs directory');
  } catch (error) {
    console.error('❌ Failed to create logs directory:', error.message);
  }
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created server/uploads directory');
  } catch (error) {
    console.error('❌ Failed to create uploads directory:', error.message);
  }
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Configure your MongoDB database');
console.log('2. Update server/.env with your configuration');
console.log('3. Run "npm run dev:full" to start both frontend and backend');
console.log('4. Open http://localhost:3000 for frontend');
console.log('5. Open http://localhost:5000/api for backend API');
console.log('\n📚 For more information, see README.md'); 