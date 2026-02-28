const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store messages per room (max 15)
const rooms = {};
const MAX_MESSAGES = 15;

io.on('connection', (socket) => {
  let currentRoom = null;
  let currentUsername = null;

  // Join a room
  socket.on('join_room', ({ room, username }) => {
    currentRoom = room;
    currentUsername = username;
    socket.join(room);

    // Initialize room if not exists
    if (!rooms[room]) rooms[room] = [];

    // Send existing messages to the new user
    socket.emit('load_messages', rooms[room]);

    // Notify others
    io.to(room).emit('user_event', {
      type: 'join',
      username,
      time: new Date().toISOString()
    });

    // Send user count
    const count = io.sockets.adapter.rooms.get(room)?.size || 0;
    io.to(room).emit('user_count', count);
  });

  // New message
  socket.on('send_message', ({ room, username, text }) => {
    if (!rooms[room]) rooms[room] = [];

    const msg = {
      id: Date.now(),
      username,
      text,
      time: new Date().toISOString()
    };

    rooms[room].push(msg);

    // Keep only last 15 messages
    if (rooms[room].length > MAX_MESSAGES) {
      rooms[room].shift(); // Remove oldest
    }

    io.to(room).emit('new_message', {
      messages: rooms[room],
      latest: msg
    });
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (currentRoom && currentUsername) {
      io.to(currentRoom).emit('user_event', {
        type: 'leave',
        username: currentUsername,
        time: new Date().toISOString()
      });

      const count = io.sockets.adapter.rooms.get(currentRoom)?.size || 0;
      io.to(currentRoom).emit('user_count', count);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
