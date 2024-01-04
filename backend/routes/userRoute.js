import express from "express";
import {
  authUser,
  getRaport,
  getTopStudents,
  logoutUser,
} from "../handlers/userHandler.js";
import { registerMentor } from "../handlers/mentorHandler.js";
import { mentorStudentProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerMentor);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/raports/:studentId", mentorStudentProtect, getRaport);
router.get("/rank", getTopStudents);

export default router;
