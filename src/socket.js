// src/socket.js
import { io } from 'socket.io-client';

// Replace with your actual server URL
const SERVER_URL = 'https://your-api-server.com';
const socket = io(SERVER_URL);

export default socket;
