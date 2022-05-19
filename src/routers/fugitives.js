import express from 'express';
import { getAllFugitives } from '../controllers/fugitives';

const router = express.Router();

router.get('/', getAllFugitives)

export default router;