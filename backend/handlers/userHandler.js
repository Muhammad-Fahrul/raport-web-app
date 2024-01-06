import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import Student from "../models/studentModel.js";
import { generateToken } from "../utils/generateToken.js";
import Raport from "../models/raportModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password, isMentor } = req.body;

  let user;

  if (isMentor) {
    user = await Mentor.findOne({ phoneNumber });
  } else {
    user = await Student.findOne({ phoneNumber });
  }

  if (!user) {
    res.status(400);
    throw new Error("User not exist");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.isMentor);

    res.json({
      _id: user._id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      isMentor: user.isMentor,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // Mengambil semua nama cookie yang ada
  const cookies = req.cookies;

  // Menghapus setiap cookie satu per satu
  for (const cookieName in cookies) {
    res.clearCookie(cookieName);
  }

  res.status(200).json({ message: "All cookies deleted successfully" });
};

const getRaport = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const studentId = req.params.studentId;

  const student = await Student.findOne({ _id: studentId });

  if (
    userId !== student.mentorId.toString() &&
    userId !== student._id.toString()
  ) {
    res.status(403);
    throw new Error("You are not allowed");
  }

  const students = await Raport.find({ studentId });

  res.status(200).json(students);
});

const getTopStudents = asyncHandler(async (req, res) => {
  const topStudents = await Student.aggregate([
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
        raport: "$lastRaport",
        total: {
          $add: [
            { $multiply: ["$lastRaport.chapter", 1000] },
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

  res.status(200).json(topStudents);
});

export { authUser, logoutUser, getRaport, getTopStudents };
