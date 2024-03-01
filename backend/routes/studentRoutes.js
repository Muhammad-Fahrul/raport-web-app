import express from 'express';
const router = express.Router();

import {
  createNewStudent,
  deleteStudentById,
  getAllStudent,
} from '../controllers/studentController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);
router
  .route('/')
  .post(createNewStudent)
  .get(getAllStudent)
  .delete(deleteStudentById);

export default router;
