import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './error';
import successReducer from './success';
import bookingReducer from './bookings';
import driverReducer from './drivers';

const appReducer = combineReducers({
	user: userReducer,
	error: errorReducer,
	success: successReducer,
	booking: bookingReducer,
	drivers: driverReducer
});

const rootReducer = (state, action) => {
	let newState = { ...state };
	if (action.type === 'LOGOUT') {
		newState = undefined;
	}

	return appReducer(newState, action);
};
export default rootReducer;
