import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
	params: {
		api_key: '26ed038186628af6c8b49562b85cb774',
		language: 'en-US'
	}
});

export default api;
