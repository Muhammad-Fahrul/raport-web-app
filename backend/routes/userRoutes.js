import express from 'express';
const router = express.Router();

import { createNewUser, getUser } from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.get('/:username', verifyJWT, getUser);
router.route('/').post(createNewUser);

export default router;
