import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';

const { REACT_APP_GOOGLE_CLIENT_ID: googleId } = process.env;
const GoogleSignIn = () => {
	const responseGoogle = response => {
		console.log(response);
		debugger;
	};
	return (
		<GoogleLogin
			clientId={googleId}
			buttonText="Login with Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		/>
	);
};

export default GoogleSignIn;
