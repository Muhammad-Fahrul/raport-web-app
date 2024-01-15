import asyncHandler from "express-async-handler";
import Mentor from "../models/mentorModel.js";
import Student from "../models/studentModel.js";
import { generateToken } from "../utils/generateToken.js";
import Raport from "../models/raportModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password, isMentor } = req.body;

  let user;

  if (isMentor) {
    user = await Mentor.findOne({ username });
  } else {
    user = await Student.findOne({ username });
  }

  if (!user) {
    res.status(400);
    throw new Error("User not exist");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, user.isMentor);

    const resJson = user.sanitize();

    res.json(resJson);
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

// @desc    Update Mentor
// @route   PUT /api/mentors
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user; // Ambil ID Mentor dari parameter request
  const { password, fullname, nickname, ...others } = req.body;

  const updateFields = {
    ...others,
    fullname: fullname?.toLocaleLowerCase(),
    nickname: nickname?.toLocaleLowerCase(),
  };

  if (req.body.password) {
    updateFields.password = req.body.password;
  }

  let user;

  if (req.user.isMentor) {
    user = await Mentor.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );
  } else {
    user = await Student.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );
  }

  if (user) {
    // Dokumen berhasil diupdate
    res.status(200).json(user.sanitize());
  } else {
    // Tidak ada dokumen yang diupdate
    res.status(404);
    throw new Error("User not Found");
  }
});

const getRaport = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const studentId = req.params.studentId;

  const student = await Student.findOne({ _id: studentId });

  if (userId !== student.mentorId && userId !== student._id.toString()) {
    res.status(403);
    throw new Error("You are not allowed");
  }

  const raport = await Raport.find({ studentId });

  res.status(200).json(raport);
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
        fullname: 1,
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

  res.status(200).json(topStudents);
});

export { authUser, logoutUser, updateProfile, getRaport, getTopStudents };
