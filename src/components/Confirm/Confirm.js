import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import TimePicker from 'rc-time-picker';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../Layout';
import { Paypal } from '../PayPal';
import 'rc-time-picker/assets/index.css';
import { bookingHandler } from '../../store/actions/bookings';
import { errorHandler } from '../../store/actions/error';

const Confirm = props => {
	const { REACT_APP_GOOGLE_MAP_API_KEY: googleKeys } = process.env;

	const defaultValues = {
		address: '',
		time: new Date().toString()
	};
	const [values, setValues] = useState({ ...defaultValues });
	const [totalAmount, setTotal] = useState(5000);
	const [loading, setLoading] = useState(false);

	const { driver, stations, user, error, success } = useSelector(({ booking, drivers, user, error, success }) => ({
		drivers: drivers.drivers,
		stations: booking.stations,
		driver: booking.driver,
		error,
		success,
		...user
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		let origin = stations.origin || 'jaipur';
		let destination = stations.destination || 'ajmer';
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${googleKeys}`;
		axios({ methos: 'get', url })
			.then(res => {
				if (res.status === 'OK') {
					// value in meters
					let avgDistance = res.rows.map(el => el.distance.value / 1000).reduce((a, b) => a + b, 0) / res.rows.length;
					// 30% allowance for single trip
					avgDistance = avgDistance * 1.3 < 300 ? 300 : avgDistance * 1.3;
					let totalAmount = 15 * avgDistance + driver.charges; // car renrtal(15/km  + driver charges)
					setTotal(totalAmount);
				} else {
					throw new Error(`Error in Google Api::${res.error_message}`);
				}
				return res.json();
			})
			.catch(err => {
				dispatch(errorHandler(err.message));
			});
	}, []);

	const handleChange = e => {
		let { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleTimeChange = time => {
		setValues({ ...values, time: time.toString() });
	};
	const redirectToHome = () => {
		const { history } = props;
		history.push('/');
	};
	const changeDriver = () => {
		const { history } = props;
		history.push('/aq-index');
	};

	const handlePaymentCancel = error => {
		dispatch(errorHandler('payment cancelled'));
		console.log(error, 'cancel');
	};

	const handlePaymentError = error => {
		dispatch(errorHandler(error.message || 'something went wrong. please try again'));
		console.log(error, 'cancel');
	};

	const confirmBooking = payment => {
		let { paymentToken, payerID, paymentID } = payment;
		let time = new Date(values.time);
		values.time = moment(stations.departDate)
			.startOf()
			.add(time.getHours(), 'hours')
			.add(time.getMinutes(), 'minutes')
			.format();
		let data = {
			stations,
			pickup: values,
			driver: driver._id,
			payment: { paymentToken, payerID, paymentID },
			amount: totalAmount
		};
		setLoading(true);
		dispatch(bookingHandler('post', '/bookings', data, 'addBooking'))
			.then(() => {
				setLoading(false);
				setTimeout(() => {
					props.history.push('/bookings');
				}, 4000);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	return (
		<div className="main">
			{loading ? <Spinner /> : null}
			{error ? <ErrorDisplay error={error} /> : null}
			{success ? <SuccessDisplay success={success} /> : null}
			<div className="container">
				<Form>
					<fieldset>
						<legend className="legend mt-3 pl-2">Journey Details: </legend>
						<Row className="ml-2">
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Origin:</Form.Label>
								<Form.Control value={stations.origin} readOnly />
							</Form.Group>
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Destination:</Form.Label>
								<Form.Control value={stations.destination} readOnly />
							</Form.Group>
						</Row>
						<Row className="ml-2">
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Departure Date:</Form.Label>
								<Form.Control value={stations.departDate} readOnly />
							</Form.Group>
							<Col xs={12} md={6}>
								<div />
								<Button onClick={redirectToHome}>Edit Journey Details</Button>
							</Col>
						</Row>
					</fieldset>
					<fieldset>
						<legend className="legend mt-3 pl-2">Driver Details:</legend>
						<Row className="ml-2">
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Name:</Form.Label>
								<Form.Control value={driver.name} readOnly />
							</Form.Group>
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Contact No.:</Form.Label>
								<Form.Control value={driver.contact} readOnly />
							</Form.Group>
						</Row>
						<Row className="ml-2">
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Charges:</Form.Label>
								<Form.Control value={driver.charges} readOnly />
							</Form.Group>
							<Form.Group as={Col} xs={12} md={6}>
								<Form.Label>Address:</Form.Label>
								<Form.Control value={driver.address} readOnly />
							</Form.Group>
						</Row>
						<div className="ml-4">
							<Button onClick={changeDriver} className="px-3">
								Change Driver
							</Button>
						</div>
					</fieldset>
					<fieldset>
						<legend className="legend mt-3 pl-2">User Details: </legend>
						<Row className="ml-2">
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Name: </Form.Label>
								<Form.Control value={user.name} readOnly />
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Contact: </Form.Label>
								<Form.Control value={user.contact} readOnly />
							</Form.Group>
						</Row>
						<Row className="ml-2">
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Email: </Form.Label>
								<Form.Control value={user.email} readOnly />
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Address: </Form.Label>
								<Form.Control value={user.address} readOnly />
							</Form.Group>
						</Row>
					</fieldset>
					<fieldset>
						<legend className="legend mt-3 pl-2">Pickup Details: </legend>
						<Row className="ml-2">
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Pickup Time: </Form.Label>
								<TimePicker
									name="time"
									onChange={handleTimeChange}
									value={moment(values.time)}
									showSecond={false}
									className="d-block"
									inputClassName="p-3"
									placeholder="pickup time"
								/>
							</Form.Group>
							<Form.Group as={Col} sm={12} md={6}>
								<Form.Label>Address: </Form.Label>
								<Form.Control value={values.address} name="address" placeholder="pickup address" onChange={handleChange} />
							</Form.Group>
						</Row>
					</fieldset>
					{values.time && values.address ? (
						<fieldset>
							<legend className="legend mt-3 pl-2">Payment: </legend>
							<Row className="ml-2 py-2">
								<Col sm={6} md={3}>
									<p className="h4 ml-2">
										Total Amount: <span>${totalAmount}</span>
									</p>
								</Col>
								<Col>
									<Paypal
										total={totalAmount}
										onError={handlePaymentError}
										onSuccess={confirmBooking}
										onCancel={handlePaymentCancel}
									/>
								</Col>
							</Row>

							<div />
						</fieldset>
					) : null}
				</Form>
			</div>
		</div>
	);
};

Confirm.propTypes = {};

Confirm.defaultProps = {};

export default Confirm;
