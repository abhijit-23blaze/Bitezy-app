import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from '../pages/Home';
import ProfileScreen from '../pages/Profile';
import OrdersScreen from '../pages/Orders';
import CartScreen from '../pages/Cart';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();

// Home stack
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      {/* Add other home-related screens here */}
    </HomeStack.Navigator>
  );
};

// Profile stack
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
      {/* Add other profile-related screens here */}
    </ProfileStack.Navigator>
  );
};

// Orders stack
const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen 
        name="OrdersScreen" 
        component={OrdersScreen} 
        options={{ headerShown: false }}
      />
      {/* Add other order-related screens here */}
    </OrdersStack.Navigator>
  );
};

// Cart stack
const CartStackNavigator = () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen 
        name="CartScreen" 
        component={CartScreen} 
        options={{ headerShown: false }}
      />
      {/* Add other cart-related screens here */}
    </CartStack.Navigator>
  );
};

// Placeholder component for screens that haven't been created yet
const PlaceholderScreen = ({ route }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{route.name} Screen</Text>
    <Text style={styles.subtext}>This screen is under construction</Text>
  </View>
);

// Main tab navigator
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Orders" component={OrdersStackNavigator} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
  },
});

export default MainNavigator; 