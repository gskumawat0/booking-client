import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../Layout';
// import PropTypes from 'prop-types';
import { bookingHandler } from '../../store/actions/bookings';
import './Booking.css';

const Booking = props => {
	const [loading, setLoading] = useState(false);
	const { bookings, error, success } = useSelector(({ booking, error, success }) => ({ bookings: booking.bookings, error, success }));
	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		dispatch(bookingHandler('get', '/bookings', undefined, 'setBookings')).finally(() => {
			setLoading(false);
		});
	}, []);
	return (
		<div className="main">
			<div className="container">
				{loading ? <Spinner /> : null}
				{error ? <ErrorDisplay error={error} /> : null}
				{success ? <SuccessDisplay success={success} /> : null}
				<h2 className="h4 text-center py-3"> My Bookings</h2>
				<hr />
				{bookings.length ? (
					<div>
						{bookings.map(booking => (
							<div key={booking._id} className="rounded my-1 booking-card p-2">
								<Row>
									<Col>Origin: {booking.stations.origin}</Col>
									<Col>Destination: {booking.stations.destination}</Col>
									<Col>Date: {moment(booking.stations.departDate).format('DD/MM/YYYY')}</Col>
								</Row>
								<Row>
									<Col>Total Amount: ${booking.amount}</Col>
									<Col>Pickup Time: {moment(booking.pickup.time).format('hh:mm A')}</Col>
									<Col>Pickup Address: {booking.pickup.address}</Col>
								</Row>
								<Row>
									<Col>Driver Name: {booking.driver.name}</Col>
									<Col>Driver Email: {booking.driver.email}</Col>
									<Col>Driver Charges: ${booking.driver.charges}/day</Col>
								</Row>
							</div>
						))}
					</div>
				) : (
					<div className="text-center text-danger"> 0 Bookings Found</div>
				)}
			</div>
		</div>
	);
};

Booking.propTypes = {};

Booking.defaultProps = {};

export default Booking;
