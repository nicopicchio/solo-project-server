import express from 'express';
import { addNewJob } from '../controllers/jobs.js';
import { validateAuthentication } from '../middleware/auth.js';

const jobsRouter = express.Router();

jobsRouter.post('/accept', validateAuthentication, addNewJob)

export default jobsRouter;