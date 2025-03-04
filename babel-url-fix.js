/**
 * Babel plugin to safely handle URL-related code in React Native
 * 
 * This plugin transforms code at compile time to prevent URL-related errors
 */

module.exports = function() {
  return {
    name: 'babel-plugin-url-fix',
    visitor: {
      // Handle property access expressions like 'obj.href'
      MemberExpression(path) {
        // Check if we're accessing 'href'
        if (path.node.property && 
            path.node.property.name === 'href' &&
            path.node.computed === false) {
          
          // Replace with a safe property access pattern
          path.replaceWith(
            path.hub.buildCall(
              path.hub.buildConstruct(
                path.hub.buildIdentifier('SafeAccess'), 
                [path.node.object, path.hub.buildStringLiteral('href')]
              ),
              []
            )
          );
        }
      },
      
      // Add our SafeAccess definition before the first statement in the program
      Program: {
        enter(path) {
          const first = path.get('body.0');
          
          if (first) {
            // Add the SafeAccess utility class
            const safeAccessCode = `
              // SafeAccess utility for URL-related properties
              function SafeAccess(obj, prop) {
                if (obj === undefined || obj === null) {
                  console.warn('Safe access: accessed ' + prop + ' on undefined/null');
                  return '';
                }
                try {
                  return obj[prop] || '';
                } catch (e) {
                  console.warn('Safe access: error accessing ' + prop, e);
                  return '';
                }
              }
            `;
            
            first.insertBefore(path.hub.parse(safeAccessCode).program.body);
          }
        }
      },
      
      // Transform URL constructors
      NewExpression(path) {
        if (path.node.callee && 
            path.node.callee.name === 'URL') {
          
          // Replace with SafeURL constructor
          path.replaceWith(
            path.hub.buildCall(
              path.hub.buildConstruct(
                path.hub.buildIdentifier('SafeURL'), 
                path.node.arguments
              ),
              []
            )
          );
        }
      },
      
      // Add SafeURL implementation
      Program: {
        exit(path) {
          // Add the SafeURL utility class
          const safeURLCode = `
            // SafeURL utility to prevent URL-related errors
            function SafeURL(url, base) {
              if (typeof URL !== 'undefined') {
                try {
                  return new URL(url || '', base);
                } catch (e) {
                  console.warn('SafeURL: error creating URL', e);
                }
              }
              
              // Fallback implementation
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
              return this;
            }
          `;
          
          path.pushContainer('body', path.hub.parse(safeURLCode).program.body);
        }
      }
    }
  };
}; 