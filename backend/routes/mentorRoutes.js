import express from 'express';
const router = express.Router();

import {
  createNewStudent,
  getAllStudent,
} from '../controllers/mentorController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);
router.route('/students').post(createNewStudent).get(getAllStudent);

export default router;
