import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import { Request, ResponseToolkit } from '@hapi/hapi';

export const register = async (request: Request, h: ResponseToolkit) => {
  const { username, email, password } = request.payload as { username: string; email: string; password: string };

  const usernameExist = await userModel.findOne({ username });
  if (usernameExist) return h.response({ msg: 'Username already used.', status: false });

  const emailExist = await userModel.findOne({ email });
  if (emailExist) return h.response({ msg: 'Email already used.', status: false });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  delete user.password;

  return h.response({ status: true, user });
};

export const login = async (request: Request, h: ResponseToolkit) => {
  const { username, password } = request.payload as { username: string; password: string };

  const user = await userModel.findOne({ username });
  if (!user) return h.response({ msg: 'Incorrect username or password', status: false });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  delete user.password;
  if (!isPasswordValid) return h.response({ msg: 'Incorrect username or password', status: false });

  return h.response({ status: true, user });
};

export const setAvatar = async (request: Request, h: ResponseToolkit) => {
  const userId = request.params.id;
  const avatarImage = (request.payload as { image: string }).image;

  const userData = await userModel.findByIdAndUpdate(userId, {
    isAvatarImageSet: true,
    avatarImage,
  });

  return h.response({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
};

export const getAllUsers = async (request: Request, h: ResponseToolkit) => {
  const users = await userModel.find({ _id: { $ne: request.params.id } }).select(['username', 'avatarImage', '_id']);

  return h.response(users);
};
