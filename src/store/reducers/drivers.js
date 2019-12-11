import { SET_DRIVERS } from '../actionTypes';

const defaultState = {
	drivers: []
};

const driverReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_DRIVERS:
			return { drivers: [...action.drivers] };
		default:
			return state;
	}
};

export default driverReducer;
