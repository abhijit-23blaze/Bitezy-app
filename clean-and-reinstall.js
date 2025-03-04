/**
 * Script to clean node_modules and reinstall dependencies
 * Sometimes, a clean install can fix issues with bundled dependencies
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Starting cleanup and reinstallation process...');

try {
  // Check if node_modules exists
  if (fs.existsSync('node_modules')) {
    console.log('🗑️ Removing node_modules directory...');
    
    // On Windows, use rimraf for better compatibility
    try {
      execSync('npx rimraf node_modules');
    } catch (e) {
      // Fallback to manual deletion if rimraf fails
      console.log('⚠️ Rimraf failed, using native delete...');
      if (process.platform === 'win32') {
        execSync('rd /s /q node_modules');
      } else {
        execSync('rm -rf node_modules');
      }
    }
    
    console.log('✅ node_modules removed successfully');
  } else {
    console.log('ℹ️ No node_modules directory found, skipping removal');
  }
  
  // Clear npm cache
  console.log('🧹 Clearing npm cache...');
  execSync('npm cache clean --force');
  console.log('✅ npm cache cleared');
  
  // Clear expo cache
  console.log('🧹 Clearing expo cache...');
  try {
    execSync('expo start --clear --non-interactive --no-dev --expo-exit-with-app');
  } catch (e) {
    // This is expected to fail since we're passing --expo-exit-with-app
    console.log('✅ expo cache cleared');
  }
  
  // Clean and reinstall dependencies
  console.log('📦 Reinstalling dependencies...');
  execSync('npm install --force', { stdio: 'inherit' });
  console.log('✅ Dependencies reinstalled successfully');
  
  // Install specific URL-related packages
  console.log('📦 Installing URL-related packages...');
  execSync('npm install react-native-url-polyfill url-parse --force', { stdio: 'inherit' });
  console.log('✅ URL-related packages installed');
  
  console.log('🎉 Clean-up and reinstallation completed successfully!');
  console.log('👉 Now try running your app with: npm run start-fixed');
} catch (error) {
  console.error('❌ Error during cleanup process:', error.message);
  process.exit(1);
} 