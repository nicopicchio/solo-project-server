import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import userRouter from './routers/user.js';
import fugitivesRouter from './routers/fugitives.js';
import jobsRouter from './routers/jobs.js'

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/fugitives', fugitivesRouter);
app.use('/jobs', jobsRouter);

app.get('*', (req, res) => {
	res.status(404).json({ error: 'Page not found' });
});

app.listen(port || 4000, () => {
	console.log(`\n Server running on http://localhost:${port}\n`);
});
