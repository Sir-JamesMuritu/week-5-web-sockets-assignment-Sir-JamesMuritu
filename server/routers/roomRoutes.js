const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// GET /api/rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await chatController.getRooms();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/rooms
router.post('/rooms', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Room name required' });
  try {
    const room = await chatController.createRoom(name);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/rooms/:roomName/join
router.post('/rooms/:roomName/join', async (req, res) => {
  const { username } = req.body;
  const { roomName } = req.params;
  if (!username) return res.status(400).json({ error: 'Username required' });
  try {
    const room = await chatController.addUserToRoom(roomName, username);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/rooms/:roomName/leave
router.post('/rooms/:roomName/leave', async (req, res) => {
  const { username } = req.body;
  const { roomName } = req.params;
  if (!username) return res.status(400).json({ error: 'Username required' });
  try {
    const room = await chatController.removeUserFromRoom(roomName, username);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
