import axios from "axios";

// Create a mock axios instance for development
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // This is a placeholder URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add request interceptor for development
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Mock API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Mock API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor with mock data
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Mock API Response:', response.status);
    return response;
  },
  (error) => {
    // For development, return mock success responses instead of errors
    console.log('Mock API Error:', error.message);
    
    // Create a mock successful response
    const mockResponse = {
      data: {
        success: true,
        message: 'This is a mock response for development',
        data: {}
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: error.config,
    };
    
    return Promise.resolve(mockResponse);
  }
);

// Override the actual axios methods with mock implementations
const originalGet = axiosInstance.get;
axiosInstance.get = function(url, config) {
  console.log('Mock GET request to:', url);
  
  // Return mock data based on the URL
  if (url.includes('/restaurants')) {
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
  console.log('Mock POST request to:', url, 'with data:', data);
  
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