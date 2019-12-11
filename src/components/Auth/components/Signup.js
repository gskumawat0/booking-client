import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authUser } from '../../../store/actions/user';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../../Layout';

const Signup = props => {
	const defaultValues = {
		name: '',
		email: '',
		contact: '',
		password: '',
		address: '',
		dob: moment()
			.subtract(30, 'years')
			.format('YYYY-MM-DD')
	};

	const [values, setValues] = useState({ ...defaultValues });
	const { success, error } = useSelector(({ error, success }) => ({ error, success }));
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleChange = e => {
		let { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		dispatch(authUser('post', '/auth/signup', values, 'signup'))
			.then(() => {
				setLoading(false);
				localStorage.setItem('email', values.email);
				props.history.push('/auth/verify');
			})
			.catch(() => {
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
					<h2 className="text-center h4 py-4">User Signup </h2>
					<hr />
					<Row>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>Name: </Form.Label>
							<Form.Control value={values.name} name="name" placeholder="your name" onChange={handleChange} />
						</Form.Group>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>Contact: </Form.Label>
							<Form.Control
								value={values.contact}
								type="number"
								name="contact"
								placeholder="your contact"
								onChange={handleChange}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>Email: </Form.Label>
							<Form.Control value={values.email} name="email" placeholder="your email" type="email" onChange={handleChange} />
						</Form.Group>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>Password: </Form.Label>
							<Form.Control
								value={values.password}
								type="password"
								name="password"
								placeholder="password"
								onChange={handleChange}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>DOB: </Form.Label>
							<Form.Control value={values.dob} name="dob" placeholder="date of birth" type="date" onChange={handleChange} />
						</Form.Group>
						<Form.Group as={Col} sm={12} md={6}>
							<Form.Label>Address: </Form.Label>
							<Form.Control
								value={values.address}
								name="address"
								placeholder="your current address"
								onChange={handleChange}
							/>
						</Form.Group>
					</Row>
					<div>
						<Button type="submit" className="px-5 ">
							Sign up
						</Button>
					</div>
				</Form>
				<p className="mb-0">
					Already have a account? <Link to="/auth/signin">signin here</Link>
				</p>
				<p className="mb-0">
					Have a verification token? <Link to="/auth/verify">Verify Here</Link>
				</p>
			</div>
		</div>
	);
};

Signup.defaultProps = {};

Signup.propTypes = {};

export default Signup;
