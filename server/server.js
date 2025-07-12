// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Other imports
const connectDB = require('./config/db'); 
const userController = require('./controllers/userController');

// Load environment variables
dotenv.config();
connectDB();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Controllers
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');


// Socket.io event handlers
require('./socket')(io);

// API routes

app.get('/api/messages', (req, res) => {
  res.json(messageController.getMessages());
});


app.get('/api/users', (req, res) => {
  res.json(userController.getUsers());
});

// Root route
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, io }; 