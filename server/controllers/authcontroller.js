// authcontroller.js - Handles authentication logic (registration and login)
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register new user
async function signup({ username, email, password }) {
  if (!username || !email || !password) throw new Error('All fields required');
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new Error('Username or email already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const token = user.generateJWT();
  return { username: user.username, email: user.email, token };
}

// Login with username and password
async function login({ username, password }) {
  if (!username || !password) throw new Error('Username and password required');
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');
  user.online = true;
  await user.save();
  const token = user.generateJWT();
  return { username: user.username, email: user.email, token };
}
// Get user profile from JWT
async function profile(token) {
  const jwt = require('jsonwebtoken');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  } catch {
    throw new Error('Invalid token');
  }
}

// Logout (set user offline)
async function logout(username) {
  return await User.findOneAndUpdate({ username }, { online: false });
}

module.exports = {
  signup,
  login,
  logout,
  profile,
};
