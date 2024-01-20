import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import { generateToken } from "../utils/generateToken.js";
import Student from "../models/studentModel.js";
import Raport from "../models/raportModel.js";

// @desc    Register user & get token
// @route   POST /api/mentors
// @access  Public
const registerMentor = asyncHandler(async (req, res) => {
  const { username, phoneNumber, ...others } = req.body;
  const mentorExist = await Mentor.findOne({ phoneNumber });

  if (mentorExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const usernameLowerCase = username.toLocaleLowerCase();

  const mentor = await Mentor.create({
    username: usernameLowerCase,
    phoneNumber,
    ...others,
  });

  if (mentor) {
    generateToken(res, mentor._id, mentor.isMentor);

    const newMentor = mentor.sanitize();
    res.status(201).json(newMentor);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Create Student
// @route   POST /api/mentors/students
// @access  Private
const createStudent = asyncHandler(async (req, res) => {
  const { username, ...others } = req.body;
  const mentorId = req.user.userId;

  const studentExist = await Student.findOne({ username });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exist");
  }

  const usernameModified = username.toLocaleLowerCase();

  const student = await Student.create({
    username: usernameModified,
    ...others,
    mentorId,
  });

  res.status(201).json(student);
});

// @desc    Get Students
// @route   GET /api/mentors/students
// @access  Private
const getStudentsByMentorId = asyncHandler(async (req, res) => {
  const mentorId = req.user.userId; // Ambil ID mentor dari request, sesuaikan dengan kebutuhan Anda

  const students = await Student.aggregate([
    {
      $match: {
        mentorId,
      },
    },
    {
      $lookup: {
        from: "raports",
        localField: "_id",
        foreignField: "studentId",
        as: "raports",
      },
    },
    {
      $addFields: {
        lastRaport: { $arrayElemAt: ["$raports", -1] },
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        nickname: 1,
        isQuran: 1,
        raport: "$lastRaport",
        total: {
          $add: [
            {
              $cond: {
                if: "$isQuran",
                then: { $multiply: ["$lastRaport.chapter", 1000] },
                else: { $multiply: ["$lastRaport.chapter", 100] },
              },
            },
            "$lastRaport.verse",
          ],
        },
      },
    },
    {
      $sort: {
        total: -1, // Menyortir secara descending berdasarkan total
      },
    },
  ]);
  res.status(200).json(students);
});

// @desc    Create Student raport
// @route   POST /api/mentors/students/raport
// @access  Private
const createRaport = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { title, chapter, page, verse, note, status } = req.body;
  const { studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });

  if (userId !== student.mentorId.toString()) {
    res.status(403);
    throw new Error("You are not allowed buddy");
  }

  const titleLowerCase = title.toLocaleLowerCase();

  const newRaport = {
    title: titleLowerCase,
    chapter: +chapter,
    page: +page,
    verse: +verse,
    note,
    status,
    studentId,
  };

  const raport = await Raport.create({ ...newRaport });

  res.status(201).json(raport);
});

// @desc    Delelte Student raport
// @route   POST /api/mentors/students/raport/:raportId
// @access  Private
const deleteRaportById = asyncHandler(async (req, res) => {
  const { raportId } = req.params;

  await Raport.deleteOne({ _id: raportId });

  res.status(200).json({ message: "raport deleted" });
});

export {
  registerMentor,
  createStudent,
  getStudentsByMentorId,
  createRaport,
  deleteRaportById,
};
