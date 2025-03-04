// src/polyfills.js
// Polyfills for React Native environment

// Polyfills for React Native
console.log('Loading polyfills...');

// Polyfill for setImmediate
if (typeof global.setImmediate !== 'function') {
  global.setImmediate = function(callback, ...args) {
    return setTimeout(() => callback(...args), 0);
  };
}

// Polyfill for clearImmediate
if (typeof global.clearImmediate !== 'function') {
  global.clearImmediate = function(id) {
    clearTimeout(id);
  };
}

// Polyfill for process
if (typeof global.process === 'undefined') {
  global.process = {};
}

// Polyfill for process.nextTick
if (typeof global.process.nextTick !== 'function') {
  global.process.nextTick = function(callback, ...args) {
    setTimeout(() => callback(...args), 0);
  };
}

// Polyfill for URL
if (typeof global.URL !== 'function') {
  try {
    const URLParser = require('url-parse');
    global.URL = function(url, base) {
      if (!url) {
        throw new TypeError('Failed to construct \'URL\': 1 argument required, but only 0 present.');
      }
      return new URLParser(url, base);
    };
  } catch (e) {
    console.warn('Failed to load url-parse for URL polyfill:', e);
    // Simple URL parser fallback
    global.URL = class URL {
      constructor(url, base) {
        if (!url) {
          throw new TypeError('Failed to construct \'URL\': 1 argument required, but only 0 present.');
        }
        
        try {
          this.href = url || '';
          this.pathname = url ? url.split('?')[0] : '';
          this.search = url && url.includes('?') ? url.substring(url.indexOf('?')) : '';
          this.hash = url && url.includes('#') ? url.substring(url.indexOf('#')) : '';
          this.hostname = url ? url.replace(/^https?:\/\//, '').split('/')[0] : '';
          this.protocol = url && url.startsWith('https') ? 'https:' : 'http:';
        } catch (err) {
          console.error('Error parsing URL:', err);
          // Set default values if parsing fails
          this.href = url || '';
          this.pathname = '';
          this.search = '';
          this.hash = '';
          this.hostname = '';
          this.protocol = 'http:';
        }
      }
    };
  }
}

// Error handling for unhandled promise rejections
if (typeof global.process === 'object') {
  process.on = process.on || function() {};
}

// Polyfill for document (mock implementation)
if (typeof global.document === 'undefined') {
  global.document = {
    createElement: () => ({}),
    head: { appendChild: () => {} },
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

// Polyfill for window (mock implementation)
if (typeof global.window === 'undefined') {
  global.window = {
    ...global,
    location: {
      href: 'http://localhost',
      origin: 'http://localhost',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      pathname: '/',
      search: '',
      hash: ''
    },
    navigator: {
      userAgent: 'React Native',
      platform: 'react-native'
    }
  };
}

// Console polyfill to ensure all methods exist
if (typeof console !== 'undefined') {
  const methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 
                  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 
                  'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 
                  'trace', 'warn'];
  
  methods.forEach(method => {
    if (typeof console[method] !== 'function') {
      console[method] = console.log || function() {};
    }
  });
}

console.log('Polyfills loaded successfully'); 