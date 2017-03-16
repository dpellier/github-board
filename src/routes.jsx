
import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import AuthService from './auth/AuthService.js';
import Container from './views/Container.jsx';
import Home from './views/home/Home.jsx';
import Login from './views/login/Login.jsx';

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);

const requireAuth = (nextState, replace) => {
	if (!AuthService.loggedIn()) {
		replace({pathname: '/login'});
	}
};

const makeRoutes = () => {
	return (
		<Route path="/" component={Container} auth={auth}>
			<IndexRedirect to="/home" />
			<Route path="home" component={Home} onEnter={requireAuth} />
			<Route path="login" component={Login} />
		</Route>
	);
};

export default makeRoutes;
