// userController.js - Handles user-related logic

const users = {};
const typingUsers = {};

function addUser(socketId, username) {
  users[socketId] = { username, id: socketId };
}

function removeUser(socketId) {
  const user = users[socketId];
  delete users[socketId];
  delete typingUsers[socketId];
  return user;
}

function getUsers() {
  return Object.values(users);
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
  users,
  typingUsers,
};
