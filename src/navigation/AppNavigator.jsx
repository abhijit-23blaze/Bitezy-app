import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomerInformation } from '../redux/store';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../components/screens/SplashScreen';
import authService from '../services/authService';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const customerInfo = useSelector(state => state.customer.customerInformation);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthState = async () => {
      try {
        const user = await authService.initAuth();
        if (user) {
          dispatch(setCustomerInformation(user));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        // Simulate a splash screen delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    checkAuthState();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {customerInfo ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 