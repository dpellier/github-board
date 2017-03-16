
import '../node_modules/normalize.css/normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import makeRoutes from './routes.jsx';

const routes = makeRoutes();

const node = document.querySelector('#app');

ReactDOM.render(
    <Router routes={routes}
            history={browserHistory} />,
	node
);
