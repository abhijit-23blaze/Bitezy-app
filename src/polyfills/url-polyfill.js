// URL Polyfill for React Native
console.log('Loading URL polyfill with detailed logging...');

// Track calls to URL constructor
global._urlCalls = [];
global._urlErrors = [];

// Add stack trace capture function
function captureStack() {
  const stack = new Error().stack;
  return stack ? stack.split('\n').slice(2).join('\n') : 'No stack available';
}

// Monkey patch URL constructor to handle errors
const originalURL = global.URL;
console.log('Original URL constructor type:', typeof originalURL);

// Create a safer URL implementation
class SafeURL {
  constructor(url, base) {
    // Log constructor call
    const callInfo = {
      url: url,
      base: base,
      time: new Date().toISOString(),
      stack: captureStack()
    };
    
    console.log(`URL constructor called with:`, 
      typeof url === 'undefined' ? 'undefined' : 
      url === null ? 'null' : 
      typeof url === 'string' ? `"${url}"` : 
      typeof url
    );
    
    if (global._urlCalls) {
      global._urlCalls.push(callInfo);
    }
    
    // Default values
    this.href = '';
    this.protocol = 'http:';
    this.host = 'localhost';
    this.hostname = 'localhost';
    this.port = '';
    this.pathname = '/';
    this.search = '';
    this.hash = '';
    this.origin = 'http://localhost';
    
    try {
      // Handle undefined or null input
      if (url === undefined || url === null) {
        console.warn('URL constructor called with undefined/null url, using default values');
        console.warn('Stack trace:', callInfo.stack);
        return;
      }
      
      // Convert to string if not already
      if (typeof url !== 'string') {
        console.log(`URL input is not a string, converting from ${typeof url}`);
        url = String(url || '');
      }
      
      console.log(`Parsing URL: "${url}"`);
      
      // Set href
      this.href = url;
      
      // Very basic parsing
      if (url.includes('://')) {
        const parts = url.split('://');
        this.protocol = parts[0] + ':';
        const rest = parts[1] || '';
        
        console.log(`Protocol: ${this.protocol}, Rest: "${rest}"`);
        
        // Extract hostname
        const pathParts = rest.split('/');
        if (pathParts[0]) {
          if (pathParts[0].includes(':')) {
            const hostParts = pathParts[0].split(':');
            this.hostname = hostParts[0];
            this.port = hostParts[1];
          } else {
            this.hostname = pathParts[0];
          }
          
          this.host = this.port ? `${this.hostname}:${this.port}` : this.hostname;
          this.origin = `${this.protocol}//${this.host}`;
          
          console.log(`Host: ${this.host}, Origin: ${this.origin}`);
        }
        
        // Extract path
        if (pathParts.length > 1) {
          this.pathname = '/' + pathParts.slice(1).join('/');
          console.log(`Pathname: ${this.pathname}`);
        }
      } else {
        console.log('URL does not contain "://", treating as relative');
      }
      
      // Extract search and hash - do this after protocol parsing
      if (url.includes('?')) {
        const parts = url.split('?');
        if (parts.length > 1) {
          let searchPart = parts[1];
          
          // Handle hash in search
          if (searchPart.includes('#')) {
            const hashParts = searchPart.split('#');
            searchPart = hashParts[0];
            this.hash = '#' + hashParts[1];
            console.log(`Hash in search: ${this.hash}`);
          }
          
          this.search = '?' + searchPart;
          console.log(`Search: ${this.search}`);
        }
      } else if (url.includes('#')) {
        const parts = url.split('#');
        if (parts.length > 1) {
          this.hash = '#' + parts[1];
          console.log(`Hash: ${this.hash}`);
        }
      }
      
      console.log(`URL parsing complete: href=${this.href}`);
    } catch (err) {
      console.error('Error in URL constructor:', err);
      console.error('Stack trace:', callInfo.stack);
      
      if (global._urlErrors) {
        global._urlErrors.push({
          error: err.message,
          url: url,
          stack: callInfo.stack,
          time: new Date().toISOString()
        });
      }
      
      // Keep default values
    }
  }
  
  toString() {
    console.log(`URL toString() called, returning "${this.href || ''}"`);
    return this.href || '';
  }
  
  toJSON() {
    console.log(`URL toJSON() called, returning "${this.href || ''}"`);
    return this.href || '';
  }
}

// Replace the global URL constructor with our safe version
global.URL = function(url, base) {
  console.log(`Global URL constructor called with:`, 
    typeof url === 'undefined' ? 'undefined' : 
    url === null ? 'null' : 
    typeof url === 'string' ? `"${url}"` : 
    typeof url
  );
  
  try {
    // If the original URL constructor exists and works, use it
    if (originalURL && typeof originalURL === 'function') {
      try {
        console.log('Trying original URL constructor');
        return new originalURL(url, base);
      } catch (e) {
        console.warn('Original URL constructor failed, using fallback', e);
        // Fall through to our implementation
      }
    }
    
    // Use our safe implementation
    console.log('Using safe URL implementation');
    return new SafeURL(url, base);
  } catch (err) {
    console.error('Error in URL polyfill:', err);
    console.error('Stack trace:', captureStack());
    
    if (global._urlErrors) {
      global._urlErrors.push({
        error: err.message,
        url: url,
        stack: captureStack(),
        time: new Date().toISOString()
      });
    }
    
    // Return a default URL object
    return new SafeURL('http://localhost');
  }
};

// Ensure URL.prototype is properly set up
global.URL.prototype = SafeURL.prototype;

// Add a toString method to the URL constructor
global.URL.toString = function() {
  return 'function URL() { [native code] }';
};

// Add a global error handler to catch unhandled URL errors
const originalGlobalErrorHandler = global.ErrorUtils?.getGlobalHandler?.();
if (global.ErrorUtils && global.ErrorUtils.setGlobalHandler) {
  console.log('Setting up global error handler to catch URL-related errors');
  
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    if (error && error.message && error.message.includes('href')) {
      console.error('CAUGHT URL-RELATED ERROR:', error.message);
      console.error('Error stack:', error.stack || 'No stack available');
      
      if (global._urlErrors) {
        global._urlErrors.push({
          error: error.message,
          stack: error.stack || 'No stack available',
          isFatal: isFatal,
          time: new Date().toISOString()
        });
      }
      
      // Don't crash the app, just log the error
      if (isFatal) {
        console.error('PREVENTING APP CRASH FROM URL ERROR');
        return;
      }
    }
    
    // For other errors, use the original handler
    if (originalGlobalErrorHandler) {
      originalGlobalErrorHandler(error, isFatal);
    }
  });
}

console.log('URL polyfill loaded successfully');

// Export a helper to dump URL debug info
export const dumpUrlDebugInfo = () => {
  console.log('=== URL DEBUG INFO ===');
  console.log(`URL calls: ${global._urlCalls ? global._urlCalls.length : 'none'}`);
  console.log(`URL errors: ${global._urlErrors ? global._urlErrors.length : 'none'}`);
  
  if (global._urlCalls && global._urlCalls.length > 0) {
    console.log('Last 5 URL calls:');
    global._urlCalls.slice(-5).forEach((call, i) => {
      console.log(`[${i}] URL(${typeof call.url === 'string' ? `"${call.url}"` : typeof call.url})`);
      console.log(call.stack.split('\n')[0]);
    });
  }
  
  if (global._urlErrors && global._urlErrors.length > 0) {
    console.log('URL errors:');
    global._urlErrors.forEach((err, i) => {
      console.log(`[${i}] ${err.error}`);
      console.log(err.stack.split('\n')[0]);
    });
  }
  
  return {
    calls: global._urlCalls || [],
    errors: global._urlErrors || []
  };
};

export default { dumpUrlDebugInfo }; 