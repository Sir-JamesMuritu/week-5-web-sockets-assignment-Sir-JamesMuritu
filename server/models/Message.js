// models/Message.js - Message model (in-memory for now)

class Message {
  constructor({ id, sender, senderId, message, timestamp, isPrivate = false }) {
    this.id = id;
    this.sender = sender;
    this.senderId = senderId;
    this.message = message;
    this.timestamp = timestamp;
    this.isPrivate = isPrivate;
  }
}

module.exports = Message;
