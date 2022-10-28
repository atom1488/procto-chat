import mongoose, { Schema } from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
}

const messageSchema = new Schema(
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
