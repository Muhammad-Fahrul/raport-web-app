import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const createNewStudent = asyncHandler(async (req, res) => {
  const { username, phoneNumber, password } = req.body;

  // Check if user already exists
  let student = await User.findOne({ username });

  if (student) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  student = new User({
    username,
    phoneNumber,
    password,
    role: 'student',
    mentor: req.user,
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(password, salt);

  // Save user to database
  await student.save();

  res.status(201).json({ data: { student } });
});

const getAllStudent = asyncHandler(async (req, res) => {
  const students = await User.find({ mentor: req.user });

  if (!students?.length) {
    return res.status(400).json({ message: 'No student found' });
  }

  res.json({ students });
});

export { createNewStudent, getAllStudent };
