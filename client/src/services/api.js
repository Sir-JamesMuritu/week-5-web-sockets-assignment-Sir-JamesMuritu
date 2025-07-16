// api.js - REST API service for chat app
import axios from 'axios';

const BackendBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_URL,
});

// Auth
export const signup = async (user) => {
  const res = await API.post(`/auth/signup`, user);
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const login = async (user) => {
  const res = await API.post(`/auth/login`, user);
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = (username) => {
  localStorage.removeItem('token');
  return axios.post(`${API}/auth/logout`, { username }).then(res => res.data);
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  const res = await API.get(`/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Messages
export const fetchMessages = () =>
  API.get(`/messages/messages`).then(res => res.data);

export const sendMessage = (message) =>
  API.post(`/messages/messages`, message).then(res => res.data);

// Users
export const fetchUsers = () =>
  API.get(`/auth/users`).then(res => res.data);


// Rooms
export const fetchRooms = () =>
  API.get(`/rooms/rooms`).then(res => res.data);

export const createRoom = (name) =>
  API.post(`/r/fix 'err' is defined but never used.ooms/rooms`, { name }).then(res => res.data);

export const joinRoom = (roomName, username) =>
  API.post(`/rooms/rooms/${roomName}/join`, { username }).then(res => res.data);

export const leaveRoom = (roomName, username) =>
  API.post(`/rooms/rooms/${roomName}/leave`, { username }).then(res => res.data);
