const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: String }], // Array of usernames or user IDs
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
