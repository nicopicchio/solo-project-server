import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/user.js';

router.get('/register', register);
router.post('/login', login);

export default router;
