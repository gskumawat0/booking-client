import { ADD_BOOKING_STATION, ADD_BOOKING_DRIVER, ADD_BOOKING_PICKUP, SET_BOOKINGS } from '../actionTypes';

const defaultState = {
	stations: {},
	driver: {},
	pickup: {},
	bookings: []
};

const bookingReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_BOOKINGS:
			return { ...state, bookings: action.bookings };
		case ADD_BOOKING_STATION:
			return { ...state, stations: action.stations };
		case ADD_BOOKING_DRIVER:
			return { ...state, driver: action.driver };
		case ADD_BOOKING_PICKUP:
			return { ...state, pickup: action.pickup };
		default:
			return state;
	}
};

export default bookingReducer;
