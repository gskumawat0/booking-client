import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Drivers.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { driverHandler } from '../../store/actions/drivers';
import { addDriver } from '../../store/actions/bookings';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../Layout';

const animatedComponents = makeAnimated();
const Drivers = props => {
	const languages = [
		{ value: 'Hindi', label: 'Hindi' },
		{ value: 'English', label: 'English' },
		{ value: 'Kannada', label: 'Kannada' }
	];
	const classes = [
		{ value: 'A', label: 'A' },
		{ value: 'B', label: 'B' },
		{ value: 'C', label: 'C' }
	];
	const defaultValues = {
		language: languages,
		class: classes
	};
	const [values, setValues] = useState({ ...defaultValues });
	const [driverIdx, setDriver] = useState(-1);
	const [loading, setLoading] = useState(false);
	const { drivers, driver, stations, user, isAuthenticated, error, success } = useSelector(
		({ booking, drivers, user, error, success }) => ({
			drivers: drivers.drivers,
			stations: booking.stations,
			driver: booking.drive,
			error,
			success,
			...user
		})
	);
	const dispatch = useDispatch();

	useEffect(() => {
		let clsStr = classes.map(cls => cls.value).join(',');
		let lngStr = languages.map(lng => lng.value).join(',');
		setLoading(true);
		dispatch(driverHandler('get', `/bookings/drivers?lng=${lngStr}&cls=${clsStr}`, undefined, 'setDrivers')).finally(() => {
			if (driver) {
				let driverIdx = drivers.findIndex(drv => drv._id === driver._id);
				setDriver(driverIdx);
				if (driverIdx === -1) {
					dispatch(addDriver({}));
				}
			}
			setLoading(false);
		});
	}, []);

	const handleChange = (value, metaData) => {
		setValues({ ...values, [metaData.name]: value });
	};

	const getDrivers = e => {
		e.preventDefault();
		let newCls = values.class && values.class.length ? values.class : classes;
		let newLngs = values.language && values.language.length ? values.language : languages;
		let clsStr = newCls.map(cls => cls.value).join(',');
		let lngStr = newLngs.map(lng => lng.value).join(',');
		setLoading(true);
		dispatch(driverHandler('get', `/bookings/drivers?lng=${lngStr}&cls=${clsStr}`, undefined, 'setDrivers')).finally(() => {
			setLoading(false);
		});
	};

	const redirectToHome = () => {
		const { history } = props;
		history.push('/');
	};

	const handleSelect = driverIdx => {
		let { history } = props;
		setDriver(driverIdx);
		let driver = drivers[driverIdx];
		dispatch(addDriver(driver));
		if (isAuthenticated && user._id) {
			history.push('/confirm');
		} else {
			let bookingDetails = JSON.stringify({ stations, driver });
			localStorage.setItem('redirectUrl', '/confirm');
			localStorage.setItem('bookingDetails', bookingDetails);
			history.push('/auth/signin');
		}
	};

	return (
		<div className="bg-light main">
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
						<legend className="legend mt-3 pl-2">Select Driver:</legend>
						<Row className="justify-content-end ">
							<Col sm={12} md={4} className="my-1">
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									defaultValue={values.language}
									isMulti
									options={languages}
									name="language"
									placeholder="Driver Language"
									onChange={handleChange}
									// styles={selectStyles}
								/>
							</Col>
							<Col sm={12} md={3} className="my-1">
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									defaultValue={values.class}
									isMulti
									options={classes}
									name="class"
									placeholder="Driver Class"
									onChange={handleChange}
									// styles={selectStyles}
								/>
							</Col>
							<Col md={2}>
								<Button className="w-100" onClick={getDrivers}>
									Get Drivers
								</Button>
							</Col>
						</Row>
						<hr />
						{drivers.length ? (
							<div>
								{drivers.map((driver, idx) => (
									<div key={driver._id} className="rounded my-1 driver-card p-2">
										<Row>
											<Col>Name: {driver.name}</Col>
											<Col>Contact No.: {driver.contact}</Col>
											<Col>Grade: {driver.class}</Col>
										</Row>
										<Row>
											<Col>Charges: ${driver.charges}/day</Col>
											<Col>Address: {driver.address}</Col>
											<Col>
												<Button onClick={() => handleSelect(idx)} disabled={driverIdx === idx}>
													{driverIdx === idx ? 'Selected' : 'Select Driver'}
												</Button>
											</Col>
										</Row>
									</div>
								))}
							</div>
						) : (
							<div className="text-center text-danger"> 0 Drivers Found. Please try another search combination</div>
						)}
					</fieldset>
				</Form>
			</div>
		</div>
	);
};

Drivers.propTypes = {};

Drivers.defaultProps = {};

export default Drivers;
