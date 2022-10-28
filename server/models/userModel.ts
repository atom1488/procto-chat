import mongoose, { Schema } from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
}

const userSchema = new Schema<User>({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
    min: 6,
  },
  isAvatarImageSet: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  avatarImage: {
    type: mongoose.SchemaTypes.String,
    default: '',
  },
});

export default mongoose.model('users', userSchema);
