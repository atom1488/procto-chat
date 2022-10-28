import messageModel, { Message } from '../models/messageModel';
import { Request, ResponseToolkit } from '@hapi/hapi';

export const addMessage = async (request: Request, h: ResponseToolkit) => {
  const { from, to, message } = request.query.body;

  const data = await messageModel.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  });

  if (data) return h.response({ msg: 'Message added successfully' });

  return h.response({ msg: 'Failed to add message to  the database.' });
};

export const getAllMessages = async (request: Request, h: ResponseToolkit) => {
  const { from, to } = request.query.body;

  const messages = await messageModel
    .find({
      users: {
        $all: [from, to],
      },
    })
    .sort({ updatedAt: 1 });

  const projectMessages = messages.map((msg: Message) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
  });

  return h.response(projectMessages);
};
