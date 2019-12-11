import { SET_USER } from '../actionTypes';

const defaultState = {
	isAuthenticated: false,
	user: {} // all info about user when user logged in
};

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER:
			return { isAuthenticated: !!Object.keys(action.user).length, user: { ...action.user } };
		default:
			return state;
	}
};

export default userReducer;
