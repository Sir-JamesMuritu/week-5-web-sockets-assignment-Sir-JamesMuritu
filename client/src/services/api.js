// api.js - REST API service for chat app
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth
export const signup = async (user) => {
  const res = await axios.post(`${API_URL}/auth/signup`, user);
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(`${API_URL}/auth/login`, user);
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = (username) => {
  localStorage.removeItem('token');
  return axios.post(`${API_URL}/auth/logout`, { username }).then(res => res.data);
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  const res = await axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Messages
export const fetchMessages = () =>
  axios.get(`${API_URL}/messages/messages`).then(res => res.data);

export const sendMessage = (message) =>
  axios.post(`${API_URL}/messages/messages`, message).then(res => res.data);

// Users
export const fetchUsers = () =>
  axios.get(`${API_URL}/auth/users`).then(res => res.data);

// Rooms
export const fetchRooms = () =>
  axios.get(`${API_URL}/rooms/rooms`).then(res => res.data);

export const createRoom = (name) =>
  axios.post(`${API_URL}/rooms/rooms`, { name }).then(res => res.data);

export const joinRoom = (roomName, username) =>
  axios.post(`${API_URL}/rooms/rooms/${roomName}/join`, { username }).then(res => res.data);

export const leaveRoom = (roomName, username) =>
  axios.post(`${API_URL}/rooms/rooms/${roomName}/leave`, { username }).then(res => res.data);
