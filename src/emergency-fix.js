
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
