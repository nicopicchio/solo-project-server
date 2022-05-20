import axios from 'axios';

const FBIURL = 'https://api.fbi.gov/@wanted?pageSize=100';

export const getAllFugitives = async (req, res) => {
	try {
		const response = await axios.get(FBIURL);
		const fugitivesArray = response.data.items;
		const filteredFugitives = fugitivesArray.map((fugitive) => {
			if (fugitive.person_classification === 'Main' || fugitive.reward_text !== null) {
				const fugitiveObject = {
					name: fugitive.title,
					nationality: fugitive.nationality,
					id: fugitive.uid,
					url: fugitive.url,
					warning: fugitive.warning_message,
					images: fugitive.images,
					files: fugitive.files,
					reward: fugitive.reward_text,
					caution: fugitive.caution,
					remarks: fugitive.remarks,
					status: fugitive.status,
				}
				return fugitiveObject
			}
		})
		res.json(filteredFugitives);
	} catch (error) {
		console.error(error);
		res.status()
	}
};
