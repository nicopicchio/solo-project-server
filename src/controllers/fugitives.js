import axios from 'axios';

const FBI_URL = 'https://api.fbi.gov/@wanted?pageSize=200';

export const getAllFugitives = async (req, res) => {
	try {
		// Get all targets for the user
		const response = await axios.get(FBI_URL);
		const fugitivesArray = response.data.items;
		const filteredFugitives = fugitivesArray.filter((fugitive) => {
			if (fugitive.person_classification === 'Main' &&	fugitive.reward_text !== null && fugitive.status !== 'captured' && fugitive.status !== 'recovered') {
				return fugitive
			}
			return
		});
		const mappedFugitives = filteredFugitives.map((fugitive) => {
			// check if the fugitive id is in the list of targets
			const fugitiveObject = {
				name: fugitive.title,
				uid: fugitive.uid,
				url: fugitive.url,
				warning: fugitive.warning_message,
				images: fugitive.images,
				reward: fugitive.reward_text,
				rewardAmount: fugitive.reward_text.match(/\$((?:\d|\,)*\.?\d+)/g),
			};
			return fugitiveObject;
		});
		res.json(mappedFugitives);
	} catch (error) {
		console.error(error);
		res.status();
	}
};
