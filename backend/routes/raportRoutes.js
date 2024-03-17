import express from 'express';
const router = express.Router();

import verifyJWT from '../middleware/verifyJWT.js';
import {
  createNewRaport,
  deleteRaportById,
} from '../controllers/raportController.js';

router.use(verifyJWT);

router.route('/').post(createNewRaport);
router.route('/:raportId').delete(deleteRaportById);

export default router;
