import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

export function setTokenHeader(token) {
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common.Authorization;
	}
}

export function apiCall(method, url, data) {
	return new Promise((resolve, reject) => {
		return axios({
			method,
			url,
			data
		})
			.then(res => {
				if (!res.data.success) {
					return reject(new Error(res.data.message));
				}
				return resolve(res.data);
			})
			.catch(err => {
				if (err.response) {
					return reject(new Error(err.response.data));
				}
				if (err.request) {
					return reject(new Error('something went wrong. please try again later.'));
				}
				return reject(err);
			});
	});
}

export async function fetchData(url, external = false) {
	try {
		if (!external) {
			url = baseUrl + url;
		}
		let data = await apiCall('get', url, undefined);
		return data;
	} catch (err) {
		return {};
	}
}
