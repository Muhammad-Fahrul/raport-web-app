import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const createNewUser = asyncHandler(async (req, res) => {
  const { username, phoneNumber, password } = req.body;

  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  user = new User({
    username,
    phoneNumber,
    password,
    role: 'mentor',
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const username = req.user;

  if (!username) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findOne({ username }).select('-password');

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  res.json({ user });
});

export { createNewUser, getUser };
