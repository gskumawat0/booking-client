import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import './FlashMessages.css';

const ErrorDisplay = props => {
	let { error } = props;
	return (
		<div className="position-relative w-100">
			{error ? (
				<Alert className="mb-0 position-absolute w-100 overflow-hidden" variant="danger">
					{error}
				</Alert>
			) : null}
		</div>
	);
};

ErrorDisplay.propTypes = {
	error: PropTypes.string
};

ErrorDisplay.defaultProps = {
	error: ''
};

const SuccessDisplay = props => {
	let { success } = props;
	return (
		<div className="position-relative w-100">
			{success ? (
				<Alert className="mb-0 position-absolute w-100 overflow-hidden " variant="success">
					{success}
				</Alert>
			) : null}
		</div>
	);
};

SuccessDisplay.propTypes = {
	success: PropTypes.string
};

SuccessDisplay.defaultProps = {
	success: ''
};

export { SuccessDisplay, ErrorDisplay };
