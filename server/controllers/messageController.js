
// messageController.js - Handles message-related logic with MongoDB
const Message = require('../models/Message');

async function addMessage(messageData) {
  const message = new Message(messageData);
  await message.save();
  // Optionally, you can limit the number of messages in the DB or implement pagination elsewhere
  return message;
}

async function getMessages(limit = 100) {
  // Get the latest messages, sorted by timestamp descending, limited
  return await Message.find().sort({ timestamp: -1 }).limit(limit).lean();
}

module.exports = {
  addMessage,
  getMessages,
};
