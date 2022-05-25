import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

export const addNewJob = async (req, res) => {
	try {
		const jobAdded = await prisma.job.create({
			data: {
				uid: req.body.uid,
				user: {
					connect: {
						id: req.user.id,
					},
				},
			},
		});
		res.status(200).json({ jobAdded });
	} catch (err) {
		console.error(err);
		res.status(errors.server.code).json(errors.server.message);
	}
};
