import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;
const startingBalance = 0;
const errors = {
	server: {
		code: 500,
		message: 'Ooooooops! Something went wrong!',
	},
	access: {
		code: 401,
		message: 'Invalid username and/or password!',
	},
	validation: {
		code: 400,
		message: 'Bad HTTP request!',
	},
};

export const register = async (req, res) => {
	if (
		!req.body.forename ||
		!req.body.surname ||
		!req.body.username ||
		!req.body.password
	) {
		return res.status(errors.validation.code).json(errors.validation.message);
	}
	try {
		const registeredUser = await prisma.user.create({
			data: {
				username: req.body.username,
				forename: req.body.forename,
				surname: req.body.surname,
				password: await bcrypt.hash(req.body.password, saltRounds),
				balance: startingBalance,
			},
		});
		res.status(200).json({ registeredUser });
	} catch (err) {
		console.error(err);
		res.status(errors.server.code).json(errors.server.message);
	}
};

export const login = async (req, res) => {
	const matchingUser = await prisma.user.findUnique({
		where: { username: req.body.username },
	});
	const matchingPassword = await bcrypt.compare(
		req.body.password,
		matchingUser.password
	);
	if (matchingUser && matchingPassword) {
		const token = jwt.sign(matchingUser.username, secretKey);
		res.status(200).json(token);
		return;
	}
	res.status(errors.access.code).json(errors.access.message);
};
