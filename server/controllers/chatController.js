// chatController.js - Handles chat-related logic for Socket.io
const Room = require('../models/Room');

// Create a new chat room
async function createRoom(name) {
  let room = await Room.findOne({ name });
  if (!room) {
    room = new Room({ name });
    await room.save();
  }
  return room;
}

// Get all chat rooms
async function getRooms() {
  return await Room.find().lean();
}

// Add a user to a room
async function addUserToRoom(roomName, username) {
  return await Room.findOneAndUpdate(
    { name: roomName },
    { $addToSet: { members: username } },
    { new: true }
  );
}

// Remove a user from a room
async function removeUserFromRoom(roomName, username) {
  return await Room.findOneAndUpdate(
    { name: roomName },
    { $pull: { members: username } },
    { new: true }
  );
}

module.exports = {
  createRoom,
  getRooms,
  addUserToRoom,
  removeUserFromRoom,
};
