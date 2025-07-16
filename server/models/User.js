
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socketId: { type: String },
  isOnline: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const jwt = require('jsonwebtoken');
const socket = require('../socket');

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET || 'supersecretkey',
    { expiresIn: '7d' }
  );
};

const User = mongoose.model('User', userSchema);
module.exports = User;
