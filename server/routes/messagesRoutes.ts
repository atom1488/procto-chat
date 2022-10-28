import { addMessage, getAllMessages } from '../controllers/messagesController';
import { ServerRoute } from '@hapi/hapi';

export const messagesRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/addmsg/',
    handler: addMessage,
  },
  {
    method: 'POST',
    path: '/getmsg',
    handler: getAllMessages,
  },
];
