import express from 'express';
const router = express.Router();

import {
  createNewStudent,
  deleteStudentById,
  getStudentsByMentor,
} from '../controllers/studentController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);
router
  .route('/')
  .post(createNewStudent)
  .get(getStudentsByMentor)
  .delete(deleteStudentById);

export default router;
