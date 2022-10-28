import { addMessage, getAllMessages } from '../controllers/messagesController';
import { ServerRoute } from '@hapi/hapi';

const messagesRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/messages/addmsg',
    handler: addMessage,
  },
  {
    method: 'POST',
    path: '/api/messages/getmsg',
    handler: getAllMessages,
  },
];

export default messagesRoutes;
