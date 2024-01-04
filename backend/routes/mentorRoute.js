import express from "express";
import {
  updateMentorProfile,
  createStudent,
  getStudents,
  addRaport,
  deleteRaportById,
} from "../handlers/mentorHandler.js";
import { mentorProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/profile").put(mentorProtect, updateMentorProfile);
router
  .route("/students")
  .post(mentorProtect, createStudent)
  .get(mentorProtect, getStudents);
router.route("/students/raports").post(mentorProtect, addRaport);
router
  .route("/students/raports/:raportId")
  .delete(mentorProtect, deleteRaportById);

export default router;
