// Mock configuration for development
// In a real app, you would use environment variables

// Configuration for development

// For development, we'll use localhost
export const server = 'http://localhost:8000'; // Android emulator uses 10.0.2.2 to access host machine
// // Alternative URLs for different environments:
// // - For iOS simulator: 'http://localhost:8000'
// // - For physical device on same network: 'http://YOUR_COMPUTER_IP:8000'
// // - For production: 'https://your-api-server.com'

export const googleapikey = 'YOUR_GOOGLE_API_KEY';

// // Log the server URL
// console.log('Using server URL:', server);


// Real implementation (commented out for now)
// import { VITE_SERVER, VITE_GOOGLE_API_KEY } from '@env';

// export const server = VITE_SERVER;
// export const googleapikey = VITE_GOOGLE_API_KEY;
