import express from "express";
import { updateStudentProfile } from "../handlers/studentHandler.js";
import { studentProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").put(studentProtect, updateStudentProfile);
export default router;
