import express from 'express';
const router = express.Router();

import { createNewUser, getUser } from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.route('/').post(createNewUser).get(verifyJWT, getUser);

export default router;
