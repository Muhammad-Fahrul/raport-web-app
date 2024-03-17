import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const createNewStudent = asyncHandler(async (req, res) => {
  const { username, phone, password } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let student = await User.findOne({ username });

  if (student) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  student = new User({
    username,
    phone,
    password,
    role: 'student',
    mentorId: req.userId,
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(password, salt);

  // Save user to database
  await student.save();

  if (student) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
});

const getStudentsByMentor = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  let mentorId;

  if (user.role !== 'mentor') {
    mentorId = user.mentorId;
  } else {
    mentorId = userId;
  }

  const students = await User.find({ mentorId })
    .select('-password')
    .populate('raport');

  if (!students?.length) {
    return res.status(400).json({ message: 'student not found' });
  }

  return res.json({ students });
});

const deleteStudentById = asyncHandler(async (req, res) => {
  const mentorId = req.userId;
  const { id } = req.body;

  const student = await User.findById(id);

  if (!student) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (student.mentorId.toString() !== mentorId) {
    console.log('not okay');
    return res.status(400).json({ message: 'Forbidden' });
  }

  const result = await student.deleteOne();

  const message = `Username ${result.username} with ID ${result._id} deleted`;

  res.json({ message });
});

export { createNewStudent, getStudentsByMentor, deleteStudentById };
