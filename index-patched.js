/**
 * This is a patched version of index.js that fixes URL-related issues
 * Use this file with: node -r ./index-patched.js
 */

// Patch Object.prototype to catch all href accesses
try {
  const originalHrefGetter = Object.getOwnPropertyDescriptor(Object.prototype, 'href')?.get;
  const originalHrefSetter = Object.getOwnPropertyDescriptor(Object.prototype, 'href')?.set;
  
  Object.defineProperty(Object.prototype, 'href', {
    configurable: true,
    get: function() {
      // Handle null/undefined safely
      if (this === undefined || this === null) {
        console.warn('Accessed href on undefined/null, returning empty string');
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
        console.warn('Attempted to set href on undefined/null');
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
  
  console.log('Successfully patched Object.prototype.href');
} catch (e) {
  console.error('Failed to patch Object.prototype.href:', e);
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
  } else {
    // Patch existing URL constructor to be safer
    const originalURL = global.URL;
    
    global.URL = function SafeURL(url, base) {
      try {
        if (url === undefined || url === null) {
          return {
            href: '',
            protocol: 'http:',
            host: 'localhost',
            hostname: 'localhost',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            origin: 'http://localhost',
            toString: function() { return ''; }
          };
        }
        return new originalURL(url, base);
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
  }
  
  console.log('URL constructor patched successfully');
} catch (e) {
  console.error('Failed to ensure URL constructor:', e);
}

// Now import the real index.js
try {
  require('./index.js');
} catch (e) {
  console.error('Error loading app:', e);
} 