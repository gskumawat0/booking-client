import { apiCall } from '../../services/api';
import { errorHandler } from './error';
import { successHandler } from './success';
import { ADD_BOOKING_STATION, ADD_BOOKING_DRIVER, ADD_BOOKING_PICKUP, SET_BOOKINGS } from '../actionTypes';

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

export const setBookings = bookings => ({
	type: SET_BOOKINGS,
	bookings
});

export const addStations = stations => ({
	type: ADD_BOOKING_STATION,
	stations
});

export const addDriver = driver => ({
	type: ADD_BOOKING_DRIVER,
	driver
});

export const addPickup = pickup => ({
	type: ADD_BOOKING_PICKUP,
	pickup
});

export function bookingHandler(method, url, bookingData, actionType) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall(method, `${baseUrl}${url}`, bookingData)
				.then(({ message, ...data }) => {
					switch (actionType) {
						case 'addBooking':
							dispatch(successHandler(message));
							break;
						case 'setBookings':
							dispatch(setBookings(data.bookings));
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
