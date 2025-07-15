const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET /api/messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await messageController.getMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/messages
router.post('/messages', async (req, res) => {
  try {
    const message = await messageController.addMessage(req.body);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
