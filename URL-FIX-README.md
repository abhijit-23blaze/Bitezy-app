# URL-related Error Fixes for React Native

This guide provides multiple approaches to fix the `TypeError: Cannot read property 'href' of undefined` error in your React Native project.

## The Problem

Your React Native app is encountering an error related to URL handling, specifically:

```
TypeError: Cannot read property 'href' of undefined
```

This typically happens because:

1. Socket.io or another library is trying to use the URL constructor
2. Some code is trying to access the `href` property of an undefined object
3. The URL polyfill in React Native isn't handling edge cases properly

## Quick Fixes

Here are several approaches to fix the issue, from simplest to most complex:

### Option 1: Use our Safe URL Utilities

1. Add the `safe-url.js` utility to your project
2. Import and call `applyUrlPatches()` early in your app initialization

```javascript
// In your App.js or index.js
import { applyUrlPatches } from './src/safe-url';

// Apply patches immediately
applyUrlPatches();

// Rest of your app code...
```

### Option 2: Patch Object.prototype

Add this code to the top of your entry file:

```javascript
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
```

### Option 3: Use the Patched Entry File

1. Run your app with `node index-patched.js` instead of the default entry
2. Or add a script to your package.json:

```json
"scripts": {
  "start-safe": "node index-patched.js"
}
```

### Option 4: Install URL Polyfill Package

```bash
npm install react-native-url-polyfill --force
```

Then in your entry file:

```javascript
import 'react-native-url-polyfill/auto';
```

### Option 5: Mock Socket.io Connections

If the issue is related to socket.io, replace your socket connection with our mock:

```javascript
import { createSafeSocketConnection } from './src/safe-url';

// Create a safe socket that won't throw URL errors
const socket = createSafeSocketConnection('http://yourserver.com');

export default socket;
```

## Advanced: Using Babel Plugin

If you want a more comprehensive solution, use our Babel plugin:

1. Add the `babel-url-fix.js` file to your project root
2. Update your babel.config.js to include it:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Your existing plugins...
      require('./babel-url-fix'),
    ],
  };
};
```

## Need More Help?

If none of these solutions work, you can try:

1. Running `node clean-and-reinstall.js` to clear your node_modules and reinstall dependencies
2. Contacting us with the exact error messages and stack traces for more targeted help

## Files Included in This Fix

- `src/safe-url.js` - Utility functions for safe URL handling
- `index-patched.js` - Patched entry point with built-in fixes
- `babel-url-fix.js` - Babel plugin to transform code at compile time
- `clean-and-reinstall.js` - Script to clear node_modules and reinstall dependencies

Good luck! 