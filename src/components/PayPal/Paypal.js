import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';

const { NODE_ENV, REACT_APP_SANDBOX_APP_ID, REACT_APP_PAYPAL_APP_ID } = process.env;

const Paypal = (props) => {
	window.React = React;
	window.ReactDOM = ReactDOM;

	let [showButton, setShowButton] = useState(false);
	let { isScriptLoaded, isScriptLoadSucceed } = props;

	useEffect(() => {
		if (isScriptLoaded && isScriptLoadSucceed) {
			setShowButton(true);
		}
	}, []);

	useEffect(() => {
		if (isScriptLoaded && isScriptLoadSucceed) {
			setShowButton(true);
		}
	}, [isScriptLoaded, isScriptLoadSucceed]);

	const paypal = window.PAYPAL;
	const { total, style, onSuccess, onError, onCancel } = props;

	let env = NODE_ENV === 'production' ? 'production' : 'sandbox';
	let currency = 'USD';
	const client = {
		sandbox: REACT_APP_SANDBOX_APP_ID,
		production: REACT_APP_PAYPAL_APP_ID,
	};
	const payment = () =>
		paypal.rest.payment.create(env, client, {
			transactions: [
				{
					amount: {
						total,
						currency,
					},
				},
			],
		});

	const onAuthorize = (data, actions) =>
		actions.payment.execute().then(() => {
			const payment = {
				paid: true,
				cancelled: false,
				payerID: data.payerID,
				paymentID: data.paymentID,
				paymentToken: data.paymentToken,
				returnUrl: data.returnUrl,
			};

			onSuccess(payment);
		});

	return showButton ? (
		<paypal.Button.react
			env={env}
			client={client}
			payment={payment}
			onAuthorize={onAuthorize}
			onCancel={onCancel}
			onError={onError}
			style={style}
		/>
	) : null;
};

Paypal.defaultProps = {
	style: {
		shape: 'rect',
		size: 'medium',
		label: 'pay',
		tagline: false,
	},
	total: 100,
	onSuccess: () => '',
	onCancel: () => '',
	onError: () => '',
	isScriptLoadSucceed: false,
	isScriptLoaded: false,
};

Paypal.propTypes = {
	style: {
		shape: PropTypes.string,
		size: PropTypes.string,
		label: PropTypes.string,
		tagline: PropTypes.bool,
	},
	total: PropTypes.number,
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	onError: PropTypes.func,
	isScriptLoadSucceed: PropTypes.bool,
	isScriptLoaded: PropTypes.bool,
};

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(Paypal);
