import express from 'express';
const router = express.Router();

import userController from '../controllers/userHandler.js';

router.post('/register', userController.registerUser);

export default router;
