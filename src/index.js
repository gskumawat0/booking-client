import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import configureStore from './store';
import App from './App';
import { setAuthorizationToken, setUser } from './store/actions/user';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';

const store = configureStore();

let { schedularJwtToken } = localStorage;
if (schedularJwtToken) {
	setAuthorizationToken(schedularJwtToken);
	try {
		let decodedData = jwtDecode(schedularJwtToken);
		delete decodedData.data.password;
		store.dispatch(setUser({ ...decodedData.data }));
	} catch (e) {
		store.dispatch(setUser({}));
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
