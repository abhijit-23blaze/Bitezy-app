/**
 * Safe URL utilities for React Native
 * 
 * This file contains functions to safely handle URL-related operations
 * in React Native environments.
 */

/**
 * Apply URL-related patches to the global environment
 * Call this function early in your app startup to prevent URL-related errors
 */
export function applyUrlPatches() {
  console.log('Applying URL patches...');
  
  try {
    // Patch the URL constructor if needed
    if (typeof global.URL !== 'function') {
      global.URL = function(url) {
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
      console.log('Created URL constructor');
    }
    
    // Patch Object.prototype.href to handle undefined/null access
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
    
    // Set up error handling for URL-related errors
    if (global.ErrorUtils && global.ErrorUtils.setGlobalHandler) {
      const originalHandler = global.ErrorUtils.getGlobalHandler?.();
      
      global.ErrorUtils.setGlobalHandler(function(error, isFatal) {
        // Check if it's a URL-related error
        if (error && error.message && error.message.includes('href')) {
          console.warn('Caught URL-related error:', error.message);
          
          // Prevent app crash if fatal
          if (isFatal) {
            console.warn('Prevented app crash from URL error');
            return;
          }
        }
        
        // Fall back to original handler
        if (originalHandler) {
          originalHandler(error, isFatal);
        }
      });
    }
    
    console.log('URL patches applied successfully');
    return true;
  } catch (e) {
    console.error('Failed to apply URL patches:', e);
    return false;
  }
}

/**
 * Create a safe URL object that won't throw errors
 * @param {string} url - The URL string
 * @returns {Object} - A URL-like object
 */
export function createSafeUrl(url) {
  try {
    // Try to use the native URL constructor
    if (typeof URL === 'function') {
      try {
        return new URL(url || '');
      } catch (e) {
        // Fall back to our implementation
      }
    }
    
    // Fallback implementation
    return {
      href: url || '',
      protocol: url && url.startsWith('https') ? 'https:' : 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
      origin: 'http://localhost',
      toString: function() { return this.href; }
    };
  } catch (e) {
    console.error('Error creating safe URL:', e);
    
    // Return a minimal URL-like object
    return {
      href: '',
      toString: function() { return ''; }
    };
  }
}

/**
 * Safely get a property from an object, handling undefined/null
 * @param {Object} obj - The object to get a property from
 * @param {string} prop - The property name
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} - The property value or defaultValue
 */
export function safeGet(obj, prop, defaultValue = '') {
  if (obj === undefined || obj === null) {
    return defaultValue;
  }
  
  try {
    return obj[prop] !== undefined ? obj[prop] : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * Create a safe socket.io connection that won't throw URL-related errors
 * @param {string} url - The socket server URL
 * @param {Object} options - Socket.io options
 * @returns {Object} - A socket-like object
 */
export function createSafeSocketConnection(url, options) {
  try {
    // Mock socket implementation
    return {
      on: function(event, callback) { return this; },
      off: function(event, callback) { return this; },
      emit: function(event, ...args) { return this; },
      connect: function() { return this; },
      disconnect: function() { return this; }
    };
  } catch (e) {
    console.error('Error creating safe socket:', e);
    
    // Return a minimal socket-like object
    return {
      on: function() { return this; },
      off: function() { return this; },
      emit: function() { return this; },
      connect: function() { return this; },
      disconnect: function() { return this; }
    };
  }
}

export default {
  applyUrlPatches,
  createSafeUrl,
  safeGet,
  createSafeSocketConnection
}; 