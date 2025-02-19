import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Loader from '@/components/layout/Loader';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Search from '@/pages/Search';
import Restaurant from '@/pages/Restaurant';
import Cart from '@/pages/Cart';
import ComingSoon from '@/pages/ComingSoon';
import Orders from '@/pages/Orders';
import PageNotFound from '@/pages/PageNotFound';
import ProtectedRoute from '../auth/ProtectedRoute';
import AuthProtected from '../auth/AuthProtected';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = ({ authLoading }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ComingSoon" component={ComingSoon} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="PageNotFound" component={PageNotFound} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default Navigation;