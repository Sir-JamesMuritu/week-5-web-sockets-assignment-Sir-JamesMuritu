
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  senderId: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room'}, // Room name or ID for group messages
  receiverId: { type: String }, // For private messages
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
