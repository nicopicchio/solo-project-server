import express from 'express';
import { addNewJob } from '../controllers/jobs.js';

const jobsRouter = express.Router();

jobsRouter.post('/accept', addNewJob)

export default jobsRouter;