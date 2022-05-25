import express from 'express';
import { addNewJob, markAsCompleted } from '../controllers/jobs.js';
import { validateAuthentication } from '../middleware/auth.js';

const jobsRouter = express.Router();

jobsRouter.post('/accept', validateAuthentication, addNewJob)
jobsRouter.post('/complete', validateAuthentication, markAsCompleted)

export default jobsRouter;