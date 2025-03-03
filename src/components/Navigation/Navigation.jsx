import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Create simple placeholder screens
const Home = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Home Screen</Text>
  </View>
);

const Login = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Login Screen</Text>
  </View>
);

const Signup = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Signup Screen</Text>
  </View>
);

const Search = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Search Screen</Text>
  </View>
);

const Restaurant = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Restaurant Screen</Text>
  </View>
);

const Cart = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Cart Screen</Text>
  </View>
);

const Orders = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Orders Screen</Text>
  </View>
);

const Profile = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Profile Screen</Text>
  </View>
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

// Create the main tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home} 
        options={{ 
          title: 'Home',
          headerTitle: 'Bitezy'
        }} 
      />
      <Tab.Screen 
        name="SearchTab" 
        component={Search} 
        options={{ 
          title: 'Search',
          headerTitle: 'Search Restaurants'
        }} 
      />
      <Tab.Screen 
        name="CartTab" 
        component={Cart} 
        options={{ 
          title: 'Cart',
          headerTitle: 'Your Cart'
        }} 
      />
      <Tab.Screen 
        name="OrdersTab" 
        component={Orders} 
        options={{ 
          title: 'Orders',
          headerTitle: 'Your Orders'
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={Profile} 
        options={{ 
          title: 'Profile',
          headerTitle: 'Your Profile'
        }} 
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
        <Stack.Screen name="Restaurant" component={Restaurant} options={{ headerShown: true }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default Navigation;