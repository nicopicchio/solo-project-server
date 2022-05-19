import axios from 'axios';

export const getAllFugitives = async () => {
	try {
		const response = await axios.get('https://api.fbi.gov/@wanted');
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
