import express from 'express';
import { getAllFugitives } from '../controllers/fugitives.js';

const fugitivesRouter = express.Router();

fugitivesRouter.get('/', getAllFugitives)

export default fugitivesRouter;