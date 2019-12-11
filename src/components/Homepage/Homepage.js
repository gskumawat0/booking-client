import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { addStations } from '../../store/actions/bookings';
import { SuccessDisplay, ErrorDisplay } from '../Layout';
import './Homepage.css';

const Homepage = props => {
	const defaultValues = {
		origin: '',
		destination: '',
		departDate: moment().format('YYYY-MM-DD')
	};
	const [values, setValues] = useState({ ...defaultValues });
	const { stations, error, success } = useSelector(({ booking, error, success }) => ({ stations: booking.stations, error, success }));
	useEffect(() => {
		if (stations.origin) {
			setValues({ ...stations });
		}
	}, [stations.origin]);
	const dispatch = useDispatch();
	const handleChange = e => {
		let { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		let { history } = props;
		e.preventDefault();
		dispatch(addStations(values));
		history.push('/aq-index');
	};
	return (
		<div className="header">
			{error ? <ErrorDisplay error={error} /> : null}
			{success ? <SuccessDisplay success={success} /> : null}
			<div className="container h-100 d-flex align-items-center justify-content-center">
				<div className="w-100">
					<h2 className="text-center p-2">Chauffeurs Driven, On Demand</h2>
					<div className="">
						<div className="d-flex justify-content-center">
							<Button className="h5 text-center  px-3 mx-1 rounded-pill">One Way Trip</Button>
							<Button className="h5 text-center  px-3 mx-1 rounded-pill">Two Way Trip</Button>
							<Button className="h5 text-center  px-3 mx-1 rounded-pill">Round Trip</Button>
							<Button className="h5 text-center  px-3 mx-1 rounded-pill">Package</Button>
						</div>
						<div className="p-3 bg-dark rounded">
							<Form onSubmit={handleSubmit}>
								<Row className="mx-auto">
									<Col sm={12} md={4} className="px-0">
										<Form.Group className="mb-0">
											<Form.Control
												placeholder="origin"
												className="rounded-0"
												name="origin"
												value={values.origin}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col sm={12} md={4} className="px-0">
										<Form.Group className="mb-0">
											<Form.Control
												placeholder="destination"
												className="rounded-0"
												name="destination"
												value={values.destination}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col sm={12} md={2} className="px-0">
										<Form.Group className="mb-0">
											<Form.Control
												placeholder="departure date"
												className="rounded-0"
												name="departDate"
												type="date"
												value={values.departDate}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col sm={12} md={2} className="px-0">
										<Button className="rounded-0 w-100" type="submit">
											Book Now
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
