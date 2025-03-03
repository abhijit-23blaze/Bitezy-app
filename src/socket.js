// src/socket.js
// Simplified mock socket implementation for development

// Create a very simple mock socket object
const socket = {
  // Simple event registry
  _events: {},
  
  // Connection state
  connected: false,
  id: 'mock-socket-id',
  
  // Basic methods
  connect: function() {
    console.log('Mock socket: connect called');
    this.connected = true;
    this._trigger('connect');
    return this;
  },
  
  disconnect: function() {
    console.log('Mock socket: disconnect called');
    this.connected = false;
    this._trigger('disconnect');
    return this;
  },
  
  // Event handling
  on: function(event, callback) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
    return this;
  },
  
  off: function(event, callback) {
    if (this._events[event]) {
      if (callback) {
        this._events[event] = this._events[event].filter(cb => cb !== callback);
      } else {
        delete this._events[event];
      }
    }
    return this;
  },
  
  emit: function(event, ...args) {
    console.log(`Mock socket: emit "${event}" called`);
    return this;
  },
  
  // Internal method to trigger events
  _trigger: function(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach(callback => {
        try {
          callback(...args);
        } catch (err) {
          console.error(`Error in socket ${event} handler:`, err);
        }
      });
    }
  },
  
  // Mock room functionality
  joinRestaurant: function(restaurantId) {
    console.log(`Mock socket: joining restaurant ${restaurantId}`);
    return this;
  }
};

// Auto-connect the mock socket
setTimeout(() => {
  socket.connect();
}, 100);

console.log('Using simplified mock socket implementation for development');

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
