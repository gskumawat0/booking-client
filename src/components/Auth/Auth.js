import React from 'react';
import { Signin, Signup, VerifyEmail, Logout } from './components';

const Homepage = props => {
	const tabs = ['signin', 'signup', 'verify', 'logout'];
	let { tab } = props.match.params;

	if (!tabs.includes(tab)) {
		props.history.push(`/auth/${tabs[0]}`);
	}

	return (
		<>
			{tab === 'signin' ? <Signin {...props} /> : null}
			{tab === 'signup' ? <Signup {...props} /> : null}
			{tab === 'verify' ? <VerifyEmail {...props} /> : null}
			{tab === 'logout' ? <Logout {...props} /> : null}
		</>
	);
};

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
