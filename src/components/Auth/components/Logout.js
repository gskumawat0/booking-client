import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../Layout';
import { logout } from '../../../store/actions/user';

const Logout = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logout());
		props.history.push('/');
	}, []);
	return <Spinner />;
};

export default Logout;
