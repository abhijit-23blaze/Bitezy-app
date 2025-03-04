import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../api/axiosInstance';

// Keys for storage
const TOKEN_KEY = 'bitezy_token';
const USER_KEY = 'bitezy_user';

/**
 * Authentication service for handling login, logout, and token management
 */
const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token and user data
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        
        // Set token in axios headers for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true, user };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during login' 
      };
    }
  },
  
  /**
   * Login with OTP
   * @param {string} mobileNumber - User mobile number
   * @param {string} otp - One-time password
   * @returns {Promise<Object>} - User data
   */
  loginWithOTP: async (mobileNumber, otp) => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', {
        mobileNumber,
        otp
      });
      
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token and user data
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        
        // Set token in axios headers for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return { success: true, user };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('OTP login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during OTP verification' 
      };
    }
  },
  
  /**
   * Request OTP for mobile login
   * @param {string} mobileNumber - User mobile number
   * @returns {Promise<Object>} - Success status and message
   */
  requestOTP: async (mobileNumber) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        mobileNumber
      });
      
      return {
        success: response.data.success,
        message: response.data.message || response.data.error
      };
    } catch (error) {
      console.error('OTP request error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred while requesting OTP' 
      };
    }
  },
  
  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      // Remove token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      
      // Remove token from axios headers
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: 'An error occurred during logout' };
    }
  },
  
  /**
   * Check if user is logged in
   * @returns {Promise<boolean>}
   */
  isLoggedIn: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  },
  
  /**
   * Get current user data
   * @returns {Promise<Object|null>}
   */
  getCurrentUser: async () => {
    try {
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },
  
  /**
   * Get auth token
   * @returns {Promise<string|null>}
   */
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  },
  
  /**
   * Initialize auth state - should be called on app startup
   * @returns {Promise<Object|null>}
   */
  initAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      
      if (token && userJson) {
        // Set token in axios headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return JSON.parse(userJson);
      }
      
      return null;
    } catch (error) {
      console.error('Init auth error:', error);
      return null;
    }
  }
};

export default authService; 