import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
import { SafeAreaView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

// Import screens
import Home from './pages/Home';
import Login from './pages/Login';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Orders from './pages/Orders';
import Signup from './pages/Signup';

// Create stack navigator
const Stack = createNativeStackNavigator();

// Error boundary component
const ErrorFallback = ({ error, resetError }) => (
  <SafeAreaView style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Something went wrong</Text>
    <Text style={styles.errorMessage}>{error.toString()}</Text>
    <View style={styles.button} onPress={resetError}>
      <Text style={styles.buttonText}>Try Again</Text>
    </View>
  </SafeAreaView>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Loading Bitezy...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return <ErrorFallback error={error} resetError={() => setError(null)} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer
        fallback={<ActivityIndicator size="large" color="#f97316" />}
        onError={(error) => {
          console.error('Navigation error:', error);
          setError(error);
        }}
      >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: true,
              title: 'Sign In'
            }}
          />
          <Stack.Screen 
            name="Signup" 
            component={Signup}
            options={{
              headerShown: true,
              title: 'Create Account'
            }}
          />
          <Stack.Screen 
            name="Restaurant" 
            component={Restaurant}
            options={{
              headerShown: true,
              title: ''
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={Cart}
            options={{
              headerShown: true,
              title: 'Your Cart'
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={Search}
            options={{
              headerShown: true,
              title: 'Search'
            }}
          />
          <Stack.Screen 
            name="Orders" 
            component={Orders}
            options={{
              headerShown: true,
              title: 'Your Orders'
            }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff3b30',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;