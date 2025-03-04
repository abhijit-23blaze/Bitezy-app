import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

// Import polyfills
import './src/polyfills';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
      <Toast />
    </Provider>
  );
}
