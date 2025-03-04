import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import OTPLogin from '../components/auth/OTPLogin';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';

const Stack = createNativeStackNavigator();

// Login options screen to choose between email/password and OTP login
const LoginOptions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.logoText}>Bitezy</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Bitezy</Text>
        <Text style={styles.subtitle}>Choose how you want to login</Text>
        
        <TouchableOpacity 
          style={styles.optionButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.optionButtonText}>Login with Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.optionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('OTPLogin')}
        >
          <Text style={styles.secondaryButtonText}>Login with Phone Number</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginOptions"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="LoginOptions" 
        component={LoginOptions} 
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
      />
      <Stack.Screen 
        name="OTPLogin" 
        component={OTPLogin} 
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f97316',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f97316',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    height: 56,
    justifyContent: 'center',
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f97316',
  },
  secondaryButtonText: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 16,
  },
  footerLink: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AuthNavigator;