import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import messagesRoute from './routes/messagesRoute';
import { Server } from 'socket.io';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error(err.message));

const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, () => {
  console.log('Server listening to PORT ' + PORT);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  const chatSocket = socket;
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
