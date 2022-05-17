import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import userRouter from './routers/user.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.get('*', (req, res) => {
	res.status(404).json({ error: 'Page not found' });
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`\n Server running on http://localhost:${port}\n`);
});
