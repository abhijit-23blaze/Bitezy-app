// Load emergency fix first - must be before ANY other imports
import './src/emergency-fix';

// Patch Object.prototype to safely handle href access
Object.defineProperty(Object.prototype, 'href', {
  configurable: true,
  get: function() {
    if (this === undefined || this === null) {
      return '';
    }
    return this._href || '';
  },
  set: function(value) {
    if (this === undefined || this === null) {
      return;
    }
    this._href = value;
  }
});

// Create a global URL constructor if it doesn't exist
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
}

// Import polyfills
import './src/polyfills/url-polyfill';
import './src/polyfills';

// Import the app
import { registerRootComponent } from 'expo';
import App from './App';

// Register the app
registerRootComponent(App);