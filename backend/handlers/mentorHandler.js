import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import { generateToken } from "../utils/generateToken.js";
import Student from "../models/studentModel.js";
import Raport from "../models/raportModel.js";

// @desc    Register user & get token
// @route   POST /api/mentors
// @access  Public
const registerMentor = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  const mentorExist = await Mentor.findOne({ phoneNumber });

  if (mentorExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const mentor = await Mentor.create({ ...req.body });

  if (mentor) {
    generateToken(res, mentor._id, mentor.isMentor);

    const newMentor = mentor.sanitizeMentor();
    res.status(201).json(newMentor);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update Mentor
// @route   PUT /api/mentors
// @access  Private
const updateMentorProfile = asyncHandler(async (req, res) => {
  const mentorId = req.mentor._id; // Ambil ID Mentor dari parameter request
  const { password, ...others } = req.body;
  const updateFields = { ...others };

  if (req.body.password) {
    updateFields.password = req.body.password;
  }

  const updatedMentor = await Mentor.findOneAndUpdate(
    { _id: mentorId },
    { $set: updateFields },
    { new: true }
  );

  if (updatedMentor) {
    // Dokumen berhasil diupdate
    res.status(200).json(updatedMentor);
  } else {
    // Tidak ada dokumen yang diupdate
    res.status(404);
    throw new Error("Mentor not Found");
  }
});

// @desc    Create Student
// @route   POST /api/mentors/students
// @access  Private (Mentor only)
const createStudent = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const mentorId = req.user.userId;

  const studentExist = await Student.findOne({ username });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exist");
  }

  const student = await Student.create({ ...req.body, mentorId });

  const newStudent = student.sanitizeStudent();

  res.status(201).json(newStudent);
});

// @desc    Get Students
// @route   GET /api/mentors/students
// @access  Private (Mentor only)
const getStudents = asyncHandler(async (req, res) => {
  const mentorId = req.user.userId;
  const students = await Student.find({ mentorId }, { password: 0 });

  res.status(200).json(students);
});

// @desc    Create Student raport
// @route   POST /api/mentors/students/raport
// @access  Private (Mentor only)
const addRaport = asyncHandler(async (req, res) => {
  const { title, chapter, page, verse, studentId } = req.body;

  const newRaport = {
    title: title,
    chapter: +chapter,
    page: +page,
    verse: +verse,
    studentId,
  };

  const raport = await Raport.create({ ...newRaport });

  res.status(201).json(raport);
});

const deleteRaportById = asyncHandler(async (req, res) => {
  const { raportId } = req.params;

  await Raport.deleteOne({ _id: raportId });

  res.status(200).json({ message: "raport deleted" });
});

export {
  registerMentor,
  updateMentorProfile,
  createStudent,
  getStudents,
  addRaport,
  deleteRaportById,
};
