import express from 'express';
import { addNewJob, getAcceptedJobs } from '../controllers/jobs.js';
import { validateAuthentication } from '../middleware/auth.js';

const jobsRouter = express.Router();

jobsRouter.get('/', validateAuthentication, getAcceptedJobs)
jobsRouter.post('/accept', validateAuthentication, addNewJob)

export default jobsRouter;