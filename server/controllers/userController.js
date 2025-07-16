
// userController.js - Handles user-related logic with MongoDB
const User = require('../models/User');

console.log('User.find:', typeof User.find); // should log: 'function'

// Typing users can remain in-memory for real-time, non-persistent state
const typingUsers = {};

async function addUser(socketId, username) {
  // Find or create user in DB, set online true
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, online: true });
    await user.save();
  } else {
    user.isOnline = true;
    await user.save();
  }
  // Attach socketId for runtime reference (not persisted)
  user.socketId = socketId;
  return user;
}

async function removeUser(socketId, username) {
  // Set user offline in DB
  if (username) {
    await User.findOneAndUpdate({ username }, { online: false });
  }
  delete typingUsers[socketId];
}

async function getUsers() {
  // Return all users with online status
  return await User.find().lean();
}

function setTyping(socketId, username, isTyping) {
  if (isTyping) {
    typingUsers[socketId] = username;
  } else {
    delete typingUsers[socketId];
  }
}

function getTypingUsers() {
  return Object.values(typingUsers);
}

module.exports = {
  addUser,
  removeUser,
  getUsers,
  setTyping,
  getTypingUsers,
};
