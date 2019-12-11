import { apiCall, setTokenHeader } from '../../services/api';
import { errorHandler } from './error';
import { successHandler } from './success';
import { SET_USER } from '../actionTypes';

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

export function setUser(user) {
	return {
		type: SET_USER,
		user
	};
}

export function setAuthorizationToken(token) {
	setTokenHeader(token);
}

export const logoutAction = () => {
	return {
		type: 'LOGOUT'
	};
};

export function logout() {
	return dispatch => {
		localStorage.clear();
		setAuthorizationToken(false);
		dispatch(setUser({}));
		dispatch(logoutAction());
		dispatch(successHandler('Successfully logged out. turn back soon.'));
	};
}

export function authUser(method, url, userData, actionType) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall(method, `${baseUrl}${url}`, userData)
				.then(({ success, message, ...data }) => {
					switch (actionType) {
						case 'signin':
							dispatch(successHandler(message));
							localStorage.setItem('schedularJwtToken', data.token);
							setAuthorizationToken(data.token);
							dispatch(setUser(data.user));
							break;
						case 'signup':
							dispatch(successHandler(message));
							break;
						case 'resendVerificationEmail':
							dispatch(successHandler(message));
							break;
						case 'verifyUser':
							dispatch(successHandler(message));
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
