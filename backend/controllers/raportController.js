import asyncHandler from 'express-async-handler';
import Raport from '../models/raportModel.js';
import User from '../models/userModel.js';

const createNewRaport = asyncHandler(async (req, res) => {
  const userId = req.user;

  const user = await User.findById(userId);

  if (user.role !== 'mentor') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { chapter, verse, status, detail, studentId } = req.body;

  const student = await User.findById(studentId).select('-password');

  if (!student) {
    return res.status(400).json({ message: 'invalid body request' });
  }

  const raport = new Raport({
    chapter,
    verse,
    status,
    detail,
    studentId,
  });

  await raport.save();

  await User.findByIdAndUpdate(studentId, { $push: { raport: raport._id } });

  if (raport) {
    res.status(201).json({ message: `New raport created` });
  } else {
    res.status(400).json({ message: 'Invalid raport data received' });
  }
});

const deleteRaportById = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { raportId } = req.params;

  const raport = await Raport.findById(raportId);

  if (!raport) {
    return res.status(400).json({ message: 'raport not found' });
  }

  const student = await User.findById(raport.studentId);

  if (!student) {
    return res.status(400).json({ message: 'student not found' });
  }

  if (student.mentorId.toString() !== userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await raport.deleteOne();

  res.json({ message: 'raport deleted' });
});

export { createNewRaport, deleteRaportById };
