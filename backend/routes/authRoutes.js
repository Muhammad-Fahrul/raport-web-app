import express from 'express';
const router = express.Router();

import { login, refresh } from '../controllers/authController.js';

router.post('/', login);

router.get('/refresh', refresh);

export default router;
