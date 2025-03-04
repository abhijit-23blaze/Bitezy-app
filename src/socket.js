// src/socket.js
// Safe socket implementation

import { createSafeSocketConnection } from './emergency-fix';
import { server } from '@/components/constants/config';

console.log('Using safe socket implementation');

// Create a safe socket using our helper
const socket = createSafeSocketConnection(
  typeof server === 'string' ? server : 'http://localhost:8000'
);

// Ensure we have a connected socket
setTimeout(() => {
  try {
    socket.connect();
    console.log('Socket safely connected');
  } catch (e) {
    console.error('Error connecting socket:', e);
  }
}, 1000);

export default socket;

/* 
// Real implementation (commented out for now)
import { io } from 'socket.io-client';

const SERVER_URL = 'https://your-api-server.com';

const socket = io(SERVER_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10,
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

export default socket;
*/
