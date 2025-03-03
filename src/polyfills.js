// src/polyfills.js
// Polyfills for React Native environment

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

// Polyfill for process.nextTick
if (!global.process) {
  global.process = {};
}
if (typeof global.process.nextTick !== 'function') {
  global.process.nextTick = function(callback, ...args) {
    setTimeout(() => callback(...args), 0);
  };
}

// Polyfill for URL
if (typeof global.URL !== 'function') {
  global.URL = require('url-parse');
}

// Error handling for unhandled promise rejections
if (typeof global.process === 'object') {
  process.on = process.on || function() {};
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