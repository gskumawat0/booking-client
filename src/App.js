import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import { errorHandler } from './store/actions/error';
import { Footer, Navbar } from './components/Layout';
import { Homepage } from './components/Homepage';
import { Booking } from './components/Booking';
import { Drivers } from './components/Drivers';
import { Confirm } from './components/Confirm';
import { Auth } from './components/Auth';
import { Logout } from './components/Auth/components';
// import Authorization from './hocs/withAuth';

class App extends Component {
	constructor() {
		super();
		this.state = {
			error: ''
		};
	}

	componentDidCatch(error, info) {
		const { errorHandler, history } = this.props;
		console.log(error, info);
		this.setState({
			error: error
		});
		errorHandler('something went wrong. please try after some time');
		history.push('/');
	}

	render() {
		// const withAuth = Authorization();
		let { error } = this.state;
		let { isAuthenticated, user } = this.props;
		return (
			<div className="app">
				{error ? (
					<div>
						<h2>Error 500</h2>
						<p>Somthing went wrong. please try again and again....</p>
						<p>if you are a developer, check console</p>
					</div>
				) : null}
				{!error ? (
					<div>
						<Navbar user={user} isAuthenticated={isAuthenticated} />
						<Switch>
							<Route path="/" exact component={Homepage} />
							<Route path="/aq-index" exact component={Drivers} />
							<Route
								path="/bookings"
								exact
								render={props => {
									return !isAuthenticated ? <Redirect to="/" /> : <Booking {...props} />;
								}}
							/>
							<Route
								path="/confirm"
								exact
								render={props => {
									return !isAuthenticated ? <Redirect to="/" /> : <Confirm {...props} />;
								}}
							/>
							<Route path="/auth/logout" exact component={Logout} />
							<Route
								path="/auth/:tab"
								exact
								render={props => {
									return isAuthenticated ? <Redirect to="/" /> : <Auth {...props} />;
								}}
							/>
							<Route path="/*" render={props => <Redirect to="/" from={props.location.pathname} />} />
						</Switch>
						<Footer />
					</div>
				) : null}
			</div>
		);
	}
}

App.defaultProps = {
	history: {
		push: () => ''
	},
	errorHandler: error => {
		console.log(error);
	},
	isAuthenticated: false,
	user: {}
};

App.propTypes = {
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object,
	history: {
		push: PropTypes.func
	},
	errorHandler: PropTypes.func
};

const mapStateToProps = ({ user }) => ({ ...user });

export default withRouter(connect(mapStateToProps, { errorHandler })(App));
