import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const createNewUser = asyncHandler(async (req, res) => {
  const { username, phoneNumber, password } = req.body;

  // Check if user already exists
  let user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  user = new User({
    username,
    phoneNumber,
    password,
    role: 'mentor',
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Save user to database
  await user.save();

  console.log(user);
  res.status(201).json({ data: { user } });
});

export { createNewUser };
