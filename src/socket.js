// src/socket.js
// Simplified mock socket implementation for development

import { io } from 'socket.io-client';
import { server } from '@/components/constants/config';

// Create a mock socket implementation as fallback
const createMockSocket = () => {
  console.log('Using mock socket implementation');
  
  return {
    id: 'mock-socket-id',
    connected: false,
    
    // Event handlers
    _eventHandlers: {},
    
    // Basic methods
    on(event, callback) {
      if (!this._eventHandlers[event]) {
        this._eventHandlers[event] = [];
      }
      this._eventHandlers[event].push(callback);
      return this;
    },
    
    off(event, callback) {
      if (this._eventHandlers[event]) {
        if (callback) {
          this._eventHandlers[event] = this._eventHandlers[event].filter(cb => cb !== callback);
        } else {
          delete this._eventHandlers[event];
        }
      }
      return this;
    },
    
    emit(event, ...args) {
      console.log(`Mock socket: emit "${event}" called`);
      return this;
    },
    
    // Internal method to trigger events
    _trigger(event, ...args) {
      if (this._eventHandlers[event]) {
        this._eventHandlers[event].forEach(callback => {
          try {
            callback(...args);
          } catch (err) {
            console.error(`Error in socket ${event} handler:`, err);
          }
        });
      }
    },
    
    // Connect/disconnect simulation
    connect() {
      setTimeout(() => {
        this.connected = true;
        this._trigger('connect');
      }, 500);
      return this;
    },
    
    disconnect() {
      this.connected = false;
      this._trigger('disconnect');
      return this;
    }
  };
};

// Try to create a real socket connection with fallback to mock
let socket;

try {
  // Attempt to create a real socket connection
  socket = io(server, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    timeout: 5000,
    autoConnect: false // Don't connect automatically
  });
  
  // Set up event handlers
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });
  
  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });
  
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
  
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
  
  // Try to connect
  socket.connect();
  
  // If connection fails after timeout, fall back to mock
  setTimeout(() => {
    if (!socket.connected) {
      console.warn('Socket connection timed out, falling back to mock implementation');
      socket = createMockSocket().connect();
    }
  }, 5000);
} catch (error) {
  console.error('Error creating socket:', error);
  socket = createMockSocket().connect();
}

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
