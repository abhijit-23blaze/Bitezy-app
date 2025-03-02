import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
//import Loader from '@/components/layout/Loader';
import { View, Text } from 'react-native';
//import ProtectedRoute from '../auth/ProtectedRoute';
//import AuthProtected from '../auth/AuthProtected';

// Placeholder components
const Home = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home Screen</Text></View>;
const Login = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Login Screen</Text></View>;
const Signup = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Signup Screen</Text></View>;
const Search = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Search Screen</Text></View>;
const Restaurant = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Restaurant Screen</Text></View>;
const Cart = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cart Screen</Text></View>;
const ComingSoon = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Coming Soon</Text></View>;
const Orders = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Orders Screen</Text></View>;
const PageNotFound = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Page Not Found</Text></View>;

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