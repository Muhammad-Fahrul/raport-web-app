import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

const updateStudentProfile = asyncHandler(async (req, res) => {
  const studentId = req.user.userId;

  if (req.body.password) {
    updateFields.password = req.body.password;
  }

  const { password, ...others } = req.body;
  const updateFields = { ...others };

  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    { $set: updateFields },
    { new: true }
  );

  if (updatedStudent) {
    res.status(200).json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not Found");
  }
});

export { updateStudentProfile };
