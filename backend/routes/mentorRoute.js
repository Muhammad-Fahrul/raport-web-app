import express from "express";
import {
  createStudent,
  getStudentsByMentorId,
  addRaport,
  deleteRaportById,
} from "../handlers/mentorHandler.js";
import { mentorProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/students")
  .post(mentorProtect, createStudent)
  .get(mentorProtect, getStudentsByMentorId);
router.route("/students/raports/:studentId").post(mentorProtect, addRaport);
router
  .route("/students/raports/:raportId")
  .delete(mentorProtect, deleteRaportById);

export default router;
