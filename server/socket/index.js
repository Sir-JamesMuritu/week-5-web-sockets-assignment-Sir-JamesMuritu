// index.js - Socket.io server setup
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');


// connection
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins
    socket.on('user_join', async (username) => {
      await userController.addUser(socket.id, username);
      const users = await userController.getUsers();
      io.emit('user_list', users);
      io.emit('user_joined', { username, id: socket.id });
      console.log(`${username} joined the chat`);
    });

    // Chat message
    socket.on('send_message', async (messageData) => {
      const user = (await userController.getUsers()).find(u => u.socketId === socket.id);
      const sender = user ? user.username : 'Anonymous';
      const msg = {
        ...messageData,
        sender,
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      const savedMsg = await messageController.addMessage(msg);
      io.emit('receive_message', savedMsg);
    });

    // Typing indicator
    socket.on('typing', (isTyping) => {
      // You may want to pass username as well for more robust logic
      const username = socket.username;
      userController.setTyping(socket.id, username, isTyping);
      io.emit('typing_users', userController.getTypingUsers());
    });

    // Private message
    socket.on('private_message', async ({ to, message }) => {
      const user = (await userController.getUsers()).find(u => u.socketId === socket.id);
      const sender = user ? user.username : 'Anonymous';
      const messageData = {
        sender,
        senderId: socket.id,
        receiverId: to,
        message,
        timestamp: new Date().toISOString(),
        isPrivate: true,
      };
      const savedMsg = await messageController.addMessage(messageData);
      socket.to(to).emit('private_message', savedMsg);
      socket.emit('private_message', savedMsg);
    });

    // Disconnect
    socket.on('disconnect', async () => {
      // Find username by socket.id
      const users = await userController.getUsers();
      const user = users.find(u => u.socketId === socket.id);
      const username = user ? user.username : undefined;
      await userController.removeUser(socket.id, username);
      io.emit('user_left', { username, id: socket.id });
      const updatedUsers = await userController.getUsers();
      io.emit('user_list', updatedUsers);
      io.emit('typing_users', userController.getTypingUsers());
      console.log(`${username} left the chat`);
    });
  });
};
