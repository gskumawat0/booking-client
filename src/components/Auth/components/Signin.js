import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authUser } from '../../../store/actions/user';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../../Layout';
import { addDriver, addStations } from '../../../store/actions/bookings';

const Signin = props => {
	const defaultValues = {
		email: '',
		password: ''
	};

	const [values, setValues] = useState({ ...defaultValues });
	const [loading, setLoading] = useState(false);
	const { success, error } = useSelector(({ error, success }) => ({ error, success }));

	const dispatch = useDispatch();

	const handleChange = e => {
		let { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		dispatch(authUser('post', '/auth/signin', values, 'signin'))
			.then(() => {
				setLoading(false);
				let { redirectUrl } = localStorage;
				if (redirectUrl) {
					let { bookingDetails } = localStorage;
					bookingDetails = JSON.parse(bookingDetails);
					dispatch(addDriver(bookingDetails.driver));
					dispatch(addStations(bookingDetails.stations));
					localStorage.removeItem('redirectUrl');
					localStorage.removeItem('bookingDetails');
					props.history.push(redirectUrl);
				} else {
					props.history.push('/bookings');
				}
			})
			.catch(err => {
				console.log(err, 'error');
				setLoading(false);
			});
	};

	return (
		<div className="main">
			<div className="container">
				{loading ? <Spinner /> : null}
				{error ? <ErrorDisplay error={error} /> : null}
				{success ? <SuccessDisplay success={success} /> : null}
				<Form onSubmit={handleSubmit}>
					<h2 className="text-center h4 py-4">User Signin </h2>
					<hr />
					<Form.Group>
						<Form.Label>Email: </Form.Label>
						<Form.Control value={values.email} name="email" placeholder="your email" type="email" onChange={handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password: </Form.Label>
						<Form.Control
							value={values.password}
							type="password"
							name="password"
							placeholder="password"
							onChange={handleChange}
						/>
					</Form.Group>
					<div>
						<Button type="submit" className="px-5 ">
							Sign In
						</Button>
					</div>
				</Form>
				<p className="mb-0">
					need an account? <Link to="/auth/signup">signup here</Link>
				</p>
				<p className="mb-0">
					need to verify account? <Link to="/auth/verify">Verify Here</Link>
				</p>
			</div>
		</div>
	);
};

Signin.defaultProps = {};

Signin.propTypes = {};

export default Signin;
