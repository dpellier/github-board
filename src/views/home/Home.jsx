
import React from 'react';
import Header from '../../components/header/header.jsx';
import Grid from '../../components/grid/grid.jsx';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
                <Header />
				<Grid />
			</div>
		)
	}
}
