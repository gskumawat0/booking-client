import { ADD_SUCCESS, REMOVE_SUCCESS } from '../actionTypes';

export const addSuccess = success => ({
	type: ADD_SUCCESS,
	success
});

export const removeSuccess = () => {
	return {
		type: REMOVE_SUCCESS
	};
};

export function successHandler(message) {
	return dispatch => {
		dispatch(addSuccess(message));
		setTimeout(() => dispatch(removeSuccess()), 5000);
	};
}
