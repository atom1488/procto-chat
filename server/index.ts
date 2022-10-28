import 'dotenv/config';
import Hapi from '@hapi/hapi';
import mongoose, { mongo } from 'mongoose';
import userRoutes from './routes/userRoutes';
import messagesRoute from './routes/messagesRoutes';
import { Server } from 'socket.io';

(async () => {
  const server = new Hapi.Server({
    port: process.env.PORT || 2000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(messagesRoute);
  server.route(userRoutes);

  await server.start();

  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error(err.message));

  const io = new Server(server.listener, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  const onlineUsers: Map<string, string> = new Map();

  io.on('connection', (socket) => {
    socket.on('add-user', (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-recieved', data.message);
      }
    });
  });
})();
