import express from 'express';
import { getAllFugitives } from '../controllers/fugitives.js';
import { validateAuthentication } from '../middleware/auth.js';

const fugitivesRouter = express.Router();

fugitivesRouter.get('/', validateAuthentication, getAllFugitives)

export default fugitivesRouter;