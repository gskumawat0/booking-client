import { apiCall } from '../../services/api';
import { errorHandler } from './error';
import { SET_DRIVERS } from '../actionTypes';
const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

export function setDrivers(drivers) {
	return {
		type: SET_DRIVERS,
		drivers
	};
}

export function driverHandler(method, url, driverData, actionType) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall(method, `${baseUrl}${url}`, driverData)
				.then(({ success, message, ...data }) => {
					switch (actionType) {
						case 'setDrivers':
							dispatch(setDrivers(data.drivers));
							break;

						default:
							return false;
					}
					resolve();
				})
				.catch(err => {
					dispatch(errorHandler(err.message));
					reject();
				});
		});
	};
}
