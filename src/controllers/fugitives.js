import axios from 'axios';
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const FBI_URL = 'https://api.fbi.gov/@wanted?pageSize=200';

export const getAllFugitives = async (req, res) => {
	try {
		const acceptedJobs = await prisma.job.findMany({
			where: {
				userId: req.user.id
			}
		});
		const response = await axios.get(FBI_URL);
		const fugitivesArray = response.data.items;
		const filteredFugitives = fugitivesArray.filter((fugitive) => {
			if (fugitive.reward_text !== null && fugitive.status !== 'captured' && fugitive.status !== 'recovered') {
				return fugitive
			}
			return
		});
		const mappedFugitives = filteredFugitives.map((fugitive) => {
			const job = acceptedJobs.find(job => job.uid === fugitive.uid)
			const rewardAmount = fugitive.reward_text.match(/\$((?:\d|\,)*\.?\d+)/g)
			const balance = rewardAmount[0].replaceAll('$', '').replaceAll(',', '')
			const fugitiveObject = {
				name: fugitive.title,
				uid: fugitive.uid,
				url: fugitive.url,
				warning: fugitive.warning_message,
				images: fugitive.images,
				reward: fugitive.reward_text,
				rewardAmount: rewardAmount,
				balance: +balance,
				job: job
			};
			return fugitiveObject;
		});
		res.json(mappedFugitives);
	} catch (error) {
		console.error(error);
		res.status();
	}
};
