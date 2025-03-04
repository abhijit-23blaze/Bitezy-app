// Import polyfills first
import './src/polyfills';
import { dumpUrlDebugInfo } from './src/polyfills/url-polyfill';

import React, { useEffect } from 'react';
import { StatusBar, LogBox, Button, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'Remote debugger', 
  'Warning: componentWill',
  'Non-serializable values'
]);

// Global error handler
if (!global.__errorHandlerSet) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Check if it's a URL-related error
    if (args[0] && typeof args[0] === 'string' && args[0].includes('href')) {
      console.log('Caught URL-related error:', args[0]);
      console.log('Call stack:', new Error().stack);
      
      // Dump URL debug info
      dumpUrlDebugInfo();
    }
    
    // Call original
    originalConsoleError(...args);
  };
  
  // Setup error boundary
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log(`Global error caught (${isFatal ? 'FATAL' : 'non-fatal'}):`);
    console.log(error);
    
    if (error && error.message && error.message.includes('href')) {
      console.log('URL-related error detected!');
      dumpUrlDebugInfo();
      
      // Prevent fatal errors from crashing the app
      if (isFatal) {
        console.log('Preventing app crash...');
        return;
      }
    }
    
    // Let React Native handle the error
    if (global.originalErrorHandler) {
      global.originalErrorHandler(error, isFatal);
    }
  });
  
  global.__errorHandlerSet = true;
}

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.log('Error boundary caught error:', error);
    console.log('Component stack:', errorInfo.componentStack);
    
    if (error && error.message && error.message.includes('href')) {
      console.log('URL-related error caught in component!');
      dumpUrlDebugInfo();
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{this.state.error?.message || 'Unknown error'}</Text>
          <Button 
            title="Try Again" 
            onPress={() => this.setState({ hasError: false })} 
          />
        </View>
      );
    }
    
    return this.props.children;
  }
}

// Log app startup info
console.log('App starting up...');

// Try to dump URL info on startup
try {
  setTimeout(() => {
    console.log('Scheduled URL debug info:');
    dumpUrlDebugInfo();
  }, 1000);
} catch (e) {
  console.log('Failed to schedule URL debug:', e);
}

export default function App() {
  useEffect(() => {
    console.log('App component mounted');
    
    // Try to dump URL info after mount
    try {
      setTimeout(() => {
        console.log('App mounted URL debug info:');
        dumpUrlDebugInfo();
      }, 2000);
    } catch (e) {
      console.log('Failed to schedule mount URL debug:', e);
    }
    
    return () => {
      console.log('App component unmounting');
    };
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <AppNavigator />
        <Toast />
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
