import axios from "axios";
import { server } from "@/components/constants/config";
import * as SecureStore from 'expo-secure-store';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: server,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true // Important for handling cookies/sessions
});

// Token key in SecureStore
const TOKEN_KEY = 'bitezy_token';

// Initialize auth token from SecureStore
const initializeAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error initializing auth token:', error);
  }
};

// Call initialization function
initializeAuthToken();

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear token from storage and headers
      SecureStore.deleteItemAsync(TOKEN_KEY);
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      // You could dispatch a logout action here if needed
      // store.dispatch(logoutUser());
    }
    
    return Promise.reject(error);
  }
);

// Mock data for development
const mockRestaurants = {
  restaurants: [
    {
      _id: 'mock-restaurant-1',
      name: 'Tasty Bites',
      image: 'https://via.placeholder.com/300x200?text=Tasty+Bites',
      cuisineTypes: ['Italian', 'Pizza'],
      deliveryTime: '25-35 min'
    },
    {
      _id: 'mock-restaurant-2',
      name: 'Spice Garden',
      image: 'https://via.placeholder.com/300x200?text=Spice+Garden',
      cuisineTypes: ['Indian', 'Curry'],
      deliveryTime: '30-40 min'
    },
    {
      _id: 'mock-restaurant-3',
      name: 'Sushi Express',
      image: 'https://via.placeholder.com/300x200?text=Sushi+Express',
      cuisineTypes: ['Japanese', 'Sushi'],
      deliveryTime: '20-30 min'
    },
    {
      _id: 'mock-restaurant-4',
      name: 'Burger Palace',
      image: 'https://via.placeholder.com/300x200?text=Burger+Palace',
      cuisineTypes: ['American', 'Fast Food'],
      deliveryTime: '15-25 min'
    }
  ]
};

const mockCategories = {
  categories: [
    {
      _id: 'mock-category-1',
      name: 'Pizza',
      icon: 'https://via.placeholder.com/100x100?text=Pizza'
    },
    {
      _id: 'mock-category-2',
      name: 'Burger',
      icon: 'https://via.placeholder.com/100x100?text=Burger'
    },
    {
      _id: 'mock-category-3',
      name: 'Sushi',
      icon: 'https://via.placeholder.com/100x100?text=Sushi'
    },
    {
      _id: 'mock-category-4',
      name: 'Salad',
      icon: 'https://via.placeholder.com/100x100?text=Salad'
    }
  ]
};

const mockOffers = {
  offers: [
    {
      _id: 'mock-offer-1',
      title: 'Special Offer 1',
      description: 'Get 20% off on your first order',
      image: 'https://via.placeholder.com/600x300?text=Special+Offer+1',
      restaurantId: 'mock-restaurant-1'
    },
    {
      _id: 'mock-offer-2',
      title: 'Special Offer 2',
      description: 'Free delivery on orders above $30',
      image: 'https://via.placeholder.com/600x300?text=Special+Offer+2',
      restaurantId: 'mock-restaurant-2'
    }
  ]
};

// Mock user data for authentication
const mockUsers = {
  'test@example.com': {
    _id: 'mock-user-1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890'
  }
};

// Mock authentication responses
const mockAuthResponses = {
  login: {
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token',
    user: mockUsers['test@example.com']
  },
  loginOtp: {
    success: true,
    message: 'OTP sent successfully'
  },
  verifyOtp: {
    success: true,
    message: 'OTP verified successfully',
    token: 'mock-jwt-token',
    user: {
      _id: 'mock-user-2',
      name: 'Mobile User',
      phone: '9876543210'
    }
  }
};

// Override the actual axios methods with mock implementations
const originalGet = axiosInstance.get;
axiosInstance.get = function(url, config) {
  // Ensure url is a string to prevent errors
  const urlStr = String(url || '');
  console.log('Mock GET request to:', urlStr);
  
  // Return mock data based on the URL
  if (urlStr.includes('/restaurants') && !urlStr.includes('/')) {
    return Promise.resolve({
      data: mockRestaurants
    });
  }
  
  if (urlStr.includes('/restaurants/')) {
    return Promise.resolve({
      data: {
        success: true,
        restaurant: {
          _id: 'mock-restaurant-id',
          name: 'Mock Restaurant',
          description: 'A mock restaurant for development',
          isOpen: true,
          cuisines: [
            {
              _id: 'mock-cuisine-1',
              cuisine: {
                _id: 'mock-cuisine-id-1',
                name: 'Mock Dish 1',
                description: 'A delicious mock dish',
                price: 9.99,
                category: 'Main Course',
                type: 'Veg',
                isAvailable: true,
              }
            },
            {
              _id: 'mock-cuisine-2',
              cuisine: {
                _id: 'mock-cuisine-id-2',
                name: 'Mock Dish 2',
                description: 'Another delicious mock dish',
                price: 12.99,
                category: 'Appetizer',
                type: 'Non-Veg',
                isAvailable: true,
              }
            }
          ]
        }
      }
    });
  }
  
  if (urlStr.includes('/categories')) {
    return Promise.resolve({
      data: mockCategories
    });
  }
  
  if (urlStr.includes('/offers')) {
    return Promise.resolve({
      data: mockOffers
    });
  }
  
  if (urlStr.includes('/cart')) {
    return Promise.resolve({
      data: {
        items: [],
        restaurant: null
      }
    });
  }
  
  if (urlStr.includes('/check')) {
    // Check if user is authenticated
    return Promise.resolve({
      data: {
        success: true,
        customer: mockUsers['test@example.com']
      }
    });
  }
  
  // Default mock response
  return Promise.resolve({
    data: {
      success: true,
      message: 'Mock data for development',
      data: {}
    }
  });
};

// Override post method
axiosInstance.post = function(url, data, config) {
  // Ensure url is a string to prevent errors
  const urlStr = String(url || '');
  console.log('Mock POST request to:', urlStr, 'with data:', data);
  
  // Handle authentication endpoints
  if (urlStr.includes('/auth/login')) {
    if (data.email && data.password) {
      // Email/password login
      if (data.email === 'test@example.com' && data.password === 'password') {
        return Promise.resolve({
          data: mockAuthResponses.login
        });
      } else {
        return Promise.reject({
          response: {
            data: {
              success: false,
              message: 'Invalid email or password'
            }
          }
        });
      }
    } else if (data.mobileNumber) {
      // OTP request
      return Promise.resolve({
        data: mockAuthResponses.loginOtp
      });
    }
  }
  
  if (urlStr.includes('/auth/verify-otp')) {
    if (data.mobileNumber && data.otp) {
      // Verify OTP
      if (data.otp === '1234') {
        return Promise.resolve({
          data: mockAuthResponses.verifyOtp
        });
      } else {
        return Promise.reject({
          response: {
            data: {
              success: false,
              message: 'Invalid OTP'
            }
          }
        });
      }
    }
  }
  
  // Default mock response for other POST requests
  return Promise.resolve({
    data: {
      success: true,
      message: 'Mock POST successful',
      data: data
    }
  });
};

console.log('Using mock axiosInstance for development');

export default axiosInstance;