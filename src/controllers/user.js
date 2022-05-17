import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;
const errors = {
	server: {
		code: 500,
		message: 'Ooooooops! Something went wrong!',
	},
	access: {
		code: 401,
		message: 'Invalid username or password',
	},
};

const saltRounds = 10;
const startingBalance = 0;

export const register = async (req, res) => {
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
		res
			.status(200)
			.json(jwt.sign({ username: matchingUser.username }, secretKey));
		return;
	}
	res.status(errors.access.code).json(errors.access.message);
};
