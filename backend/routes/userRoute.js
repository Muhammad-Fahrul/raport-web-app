import express from "express";
import {
  authUser,
  getRaportsByStudentId,
  getTopStudents,
  logoutUser,
  updateProfile,
} from "../controllers/userHandler.js";
import { mentorStudentProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/raports/:studentId", mentorStudentProtect, getRaportsByStudentId);
router.get("/rank", getTopStudents);
router.put("/profile", mentorStudentProtect, updateProfile);

export default router;
