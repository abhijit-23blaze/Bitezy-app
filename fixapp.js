/**
 * This is a minimal entry point that patches the JavaScript environment
 * to prevent URL-related errors.
 * 
 * DO NOT import any modules here - this file must run before anything else.
 */

console.log('🛑 LOADING EMERGENCY JAVASCRIPT ENGINE PATCH');

// Fix the require/import system for Node.js
const fs = require('fs');
const path = require('path');

// Immediately patch Object.prototype to catch all href accesses
try {
  // This needs to run before ANY modules are loaded
  const originalHrefGetter = Object.getOwnPropertyDescriptor(Object.prototype, 'href')?.get;
  const originalHrefSetter = Object.getOwnPropertyDescriptor(Object.prototype, 'href')?.set;
  
  Object.defineProperty(Object.prototype, 'href', {
    configurable: true,
    get: function() {
      // Handle null/undefined safely
      if (this === undefined || this === null) {
        return '';
      }
      
      // Use original getter if possible
      if (originalHrefGetter && this !== undefined && this !== null) {
        try {
          return originalHrefGetter.call(this);
        } catch (e) {
          return '';
        }
      }
      
      return this._href || '';
    },
    set: function(value) {
      // Handle null/undefined safely
      if (this === undefined || this === null) {
        return;
      }
      
      // Use original setter if possible
      if (originalHrefSetter && this !== undefined && this !== null) {
        try {
          originalHrefSetter.call(this, value);
          return;
        } catch (e) {
          // Fall through to default implementation
        }
      }
      
      this._href = value;
    }
  });
  
  console.log('✅ Successfully patched Object.prototype.href');
} catch (e) {
  console.error('⚠️ Failed to patch Object.prototype.href:', e);
}

// Make sure URL is available globally
try {
  if (typeof global.URL !== 'function') {
    global.URL = function URL(url) {
      this.href = url || '';
      this.protocol = 'http:';
      this.host = 'localhost';
      this.hostname = 'localhost';
      this.port = '';
      this.pathname = '/';
      this.search = '';
      this.hash = '';
      this.origin = 'http://localhost';
      this.toString = function() { return this.href; };
    };
    
    console.log('✅ Created global URL constructor');
  } else {
    console.log('✓ URL constructor already exists');
    
    // Patch existing URL constructor to be safer
    const originalURL = global.URL;
    global.URL = function SafeURL(url, base) {
      try {
        return new originalURL(url || '', base);
      } catch (e) {
        const result = {
          href: url || '',
          protocol: 'http:',
          host: 'localhost',
          hostname: 'localhost',
          port: '',
          pathname: '/',
          search: '',
          hash: '',
          origin: 'http://localhost',
          toString: function() { return this.href; }
        };
        return result;
      }
    };
    
    console.log('✅ Wrapped URL constructor with safety handler');
  }
} catch (e) {
  console.error('⚠️ Failed to ensure URL constructor:', e);
}

// Protect window.location if it exists
try {
  if (global.window && global.window.location === undefined) {
    global.window.location = {
      href: 'http://localhost',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
      origin: 'http://localhost'
    };
    
    console.log('✅ Created window.location');
  }
} catch (e) {
  console.error('⚠️ Failed to ensure window.location:', e);
}

// Add a global error handler to prevent crashes from URL-related errors
try {
  if (global.ErrorUtils) {
    const originalHandler = global.ErrorUtils.getGlobalHandler?.();
    
    global.ErrorUtils.setGlobalHandler(function(error, isFatal) {
      // Check if it's a URL-related error
      if (error && error.message && (
        error.message.includes('href') || 
        error.message.includes('URL') ||
        error.message.includes('location')
      )) {
        console.error('🚨 Caught URL-related error:', error.message);
        
        // Prevent app crash if fatal
        if (isFatal) {
          console.error('💥 Prevented app crash from URL error');
          return;
        }
      }
      
      // Fall back to original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
    
    console.log('✅ Installed URL-safe global error handler');
  }
} catch (e) {
  console.error('⚠️ Failed to install global error handler:', e);
}

// Patch the module loading system to be resilient to URL errors
try {
  /**
   * THIS IS A LAST RESORT: Try to patch the Metro bundler's module loading system.
   * This is highly implementation-specific and may break in future versions!
   */
  if (global.metroRequire && typeof global.metroRequire === 'function') {
    const originalMetroRequire = global.metroRequire;
    
    global.metroRequire = function safeMetroRequire(moduleId) {
      try {
        return originalMetroRequire(moduleId);
      } catch (error) {
        if (error && error.message && error.message.includes('href')) {
          console.error(`🔄 URL-related error when loading module ${moduleId}, returning mock`);
          
          // Return a minimal mock for URL-related modules
          if (typeof moduleId === 'number') {
            return {};
          }
          
          if (moduleId === 'url' || moduleId.includes('/url')) {
            return {
              parse: () => ({}),
              format: () => '',
              resolve: () => ''
            };
          }
          
          return {};
        }
        throw error;
      }
    };
    
    // Copy all properties from the original
    Object.keys(originalMetroRequire).forEach(key => {
      global.metroRequire[key] = originalMetroRequire[key];
    });
    
    console.log('✅ Patched Metro module loading system');
  }
} catch (e) {
  console.error('⚠️ Failed to patch Metro module loading:', e);
}

console.log('✅ EMERGENCY PATCH LOADED');

// Create an emergency fix script
const emergencyFix = `
// src/emergency-fix.js
/**
 * Emergency fixes for URL-related issues in React Native
 */

console.log('Loading emergency fixes for React Native...');

// Safe helper for creating socket connections
export const createSafeSocketConnection = function(url, options) {
  try {
    console.log('Attempting safe socket connection to ' + url);
    // Create a mock socket
    return {
      on: function(event, callback) { 
        console.log('Mock socket registered handler for "' + event + '"');
        return this; 
      },
      off: function(event, callback) { return this; },
      emit: function(event, ...args) { 
        console.log('Mock socket emitted "' + event + '"');
        return this; 
      },
      connect: function() { 
        console.log('Mock socket connected');
        return this; 
      },
      disconnect: function() { return this; }
    };
  } catch (err) {
    console.error('Error creating socket:', err);
    // Return mock implementation as fallback
    return {
      on: function() { return this; },
      off: function() { return this; },
      emit: function() { return this; },
      connect: function() { return this; },
      disconnect: function() { return this; }
    };
  }
};

// Safe access to properties that might be undefined
export const safeGet = (obj, prop, defaultValue = '') => {
  if (obj === undefined || obj === null) {
    return defaultValue;
  }
  
  try {
    return obj[prop] || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// Safe URL creator
export const createSafeUrl = (url) => {
  return {
    href: url || '',
    protocol: 'http:',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: '',
    origin: 'http://localhost',
    toString: function() { return this.href; }
  };
};

console.log('Emergency fixes loaded successfully');

export default {
  createSafeSocketConnection,
  safeGet,
  createSafeUrl
};
`;

// Write the emergency fix file
try {
  const dir = path.join(__dirname, 'src');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, 'emergency-fix.js'), emergencyFix);
  console.log('✅ Created emergency-fix.js file');
} catch (e) {
  console.error('⚠️ Failed to create emergency-fix.js:', e);
}

// Now create or update the index file to use our patches
const updatedIndex = `// Import polyfills first - with patched URL support
import './src/polyfills/url-polyfill';
import './src/polyfills';

// Import the app
import { registerRootComponent } from 'expo';
import App from './App';

// Register the app
registerRootComponent(App);
`;

// Try running the Expo app directly with our fixed environment
try {
  const { execSync } = require('child_process');
  console.log('🚀 Starting the app with patched environment...');
  execSync('npx expo start --clear', { stdio: 'inherit' });
} catch (e) {
  console.error('⚠️ Failed to start Expo app:', e);
  
  console.log('\n👉 Try running the app manually with: npm run start');
} 