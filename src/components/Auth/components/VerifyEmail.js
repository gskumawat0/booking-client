import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { authUser } from '../../../store/actions/user';
import { Link } from 'react-router-dom';
import { Spinner, SuccessDisplay, ErrorDisplay } from '../../Layout';

const VerifyEmail = props => {
	const defaultValues = {
		email: '',
		token: ''
	};

	const [values, setValues] = useState({ ...defaultValues });
	const [loading, setLoading] = useState(false);
	const { success, error } = useSelector(({ error, success }) => ({ error, success }));

	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.email) {
			setValues({ ...values, email: localStorage.email });
		}
	}, []);

	const handleChange = e => {
		let { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		dispatch(authUser('post', '/auth/verify', values, 'signup'))
			.then(() => {
				setLoading(false);
				let { email } = localStorage;
				if (email) {
					localStorage.removeItem('email');
				}
				props.history.push('/auth/signin');
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const resendToken = e => {
		e.preventDefault();
		setLoading(true);
		dispatch(authUser('post', '/auth/resend', values, 'signup'))
			.then(() => {
				setLoading(false);
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
					<h2 className="text-center h4 py-4">Email Verification </h2>
					<hr />
					<Form.Group>
						<Form.Label>Email: </Form.Label>
						<Form.Control value={values.email} name="email" placeholder="your email" type="email" onChange={handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Verification Otp: </Form.Label>
						<Form.Control value={values.token} type="token" name="token" placeholder="otp" onChange={handleChange} />
					</Form.Group>
					<div>
						<Button type="submit" className="px-5 mr-2 ">
							Verify
						</Button>
						<Button onClick={resendToken} className="px-5 ">
							Resend OTP
						</Button>
					</div>
				</Form>
				<p className="mb-0">
					Need an account? <Link to="/auth/signup">signup here</Link>
				</p>
				<p className="mb-0">
					Have an account? <Link to="/auth/signin">signin here</Link>
				</p>
			</div>
		</div>
	);
};

VerifyEmail.defaultProps = {};

VerifyEmail.propTypes = {};

export default VerifyEmail;
