import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Navigation from './components/Navigation/Navigation';
import socket from './socket';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  const [screenLoad, setScreenLoad] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    setScreenLoad(true);
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    
    // Simplified for initial testing
    setAuthLoading(false);
    setScreenLoad(false);
    
    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <Provider store={store}>
      {screenLoad ? 
        <ActivityIndicator size="large" color="#0000ff" /> : 
        <Navigation authLoading={authLoading} />
      }
    </Provider>
  );
};

export default App;