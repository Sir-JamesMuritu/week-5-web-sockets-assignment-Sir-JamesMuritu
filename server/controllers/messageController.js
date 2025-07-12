// messageController.js - Handles message-related logic

const messages = [];

function addMessage(message) {
  messages.push(message);
  if (messages.length > 100) messages.shift();
}

function getMessages() {
  return messages;
}

module.exports = {
  addMessage,
  getMessages,
  messages,
};
