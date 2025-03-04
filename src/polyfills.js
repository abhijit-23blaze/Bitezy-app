// src/polyfills.js
// Polyfills for React Native environment

// Import URL polyfill first
import './polyfills/url-polyfill';

console.log('Loading other polyfills...');

// Ensure polyfills are loaded before app execution
(function initPolyfills() {
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

  // Global error handler for href errors
  const originalGetProperty = Object.getOwnPropertyDescriptor(Object.prototype, 'href');
  
  // Patch Object.prototype to safely handle href access
  Object.defineProperty(Object.prototype, 'href', {
    get: function() {
      // If the original getter exists and this isn't undefined, use it
      if (originalGetProperty && originalGetProperty.get && this !== undefined && this !== null) {
        return originalGetProperty.get.call(this);
      }
      
      // For undefined or null objects, return a safe default
      if (this === undefined || this === null) {
        console.warn('Attempted to access href on undefined/null object');
        return '';
      }
      
      // Return the href property if it exists, otherwise empty string
      return this._href || '';
    },
    set: function(value) {
      // If the original setter exists and this isn't undefined, use it
      if (originalGetProperty && originalGetProperty.set && this !== undefined && this !== null) {
        originalGetProperty.set.call(this, value);
        return;
      }
      
      // For undefined or null objects, log a warning
      if (this === undefined || this === null) {
        console.warn('Attempted to set href on undefined/null object');
        return;
      }
      
      // Set the _href property
      this._href = value;
    },
    configurable: true
  });

  console.log('Other polyfills loaded successfully');
})(); 