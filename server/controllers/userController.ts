import e, { NextFunction, Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck) return res.json({ msg: 'Username already used.', status: false });

    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) return res.json({ msg: 'Email already used.', status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return res.json({ msg: 'Incorrect username or password', status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ msg: 'Incorrect username or password', status: false });
    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const setAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await userModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({ _id: { $ne: req.params.id } }).select(['username', 'avatarImage', '_id']);

    return res.json(users);
  } catch (err) {
    next(err);
  }
};
