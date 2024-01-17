import express from "express";
import {
  authUser,
  getRaportByStudentId,
  getTopStudents,
  logoutUser,
  updateProfile,
} from "../handlers/userHandler.js";
import { registerMentor } from "../handlers/mentorHandler.js";
import { mentorStudentProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.route("/").post(registerMentor);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/raports/:studentId", mentorStudentProtect, getRaportByStudentId);
router.get("/rank", getTopStudents);
router.put("/profile", mentorStudentProtect, updateProfile);

export default router;
