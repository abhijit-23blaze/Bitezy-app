// Mock configuration for development
// In a real app, you would use environment variables

// For development, we'll use hardcoded values
export const server = 'https://api.example.com';
export const googleapikey = 'YOUR_GOOGLE_API_KEY';

// Log that we're using mock configuration
console.log('Using mock configuration for development');

/* 
// Real implementation (commented out for now)
import { VITE_SERVER, VITE_GOOGLE_API_KEY } from '@env';

export const server = VITE_SERVER;
export const googleapikey = VITE_GOOGLE_API_KEY;
*/