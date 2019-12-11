import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { errorHandler } from '../store/actions/error';

const Authorization = ComponentToBeRendered => props => {
	const [shouldRender, setRender] = useState(false);
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector(({ user }) => ({ ...user }));

	useEffect(() => {
		function isAllowed() {
			let { schedularJwtToken } = localStorage;
			if (!schedularJwtToken || !isAuthenticated || !user || !user._id) {
				dispatch(errorHandler('please signin to continue'));
				// eslint-disable-next-line
				props.history.push('/auth/signin');
			} else {
				setRender(true);
			}
		}
		isAllowed();
	}, []);

	return shouldRender ? <ComponentToBeRendered {...props} /> : null;
};

export default Authorization;
