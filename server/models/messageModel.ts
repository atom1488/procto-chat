import mongoose, { Schema } from 'mongoose';

export interface Message {
  _id: mongoose.Types.ObjectId;
  message: {
    text: string;
  };
  users: mongoose.Schema.Types.Array;
  sender: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<Message>(
  {
    message: {
      text: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
    },
    users: mongoose.Schema.Types.Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('messages', messageSchema);
