
import React, {PropTypes as Types} from 'react';

class Container extends React.Component {
	static contextTypes = {
		router: Types.object
	};

	render() {
		let children = null;

		if (this.props.children) {
			children = React.cloneElement(this.props.children, {
				auth: this.props.route.auth
			});
		}

		return (
			<div>
				{children}
			</div>
		);
	}
}

export default Container;
