
import React, {PropTypes as Types} from 'react';
import AuthService from '../../auth/AuthService.js';
import styles from './login.scss';
import icon from '../../../styles/images/octocat.png';

export default class Login extends React.Component {
	static propTypes = {
		auth: Types.instanceOf(AuthService)
	};

	render() {
		const {auth} = this.props;

		return (
			<div className={styles.login}>
                <img src={icon}
                     height="100" />

				<h2>
                    Welcome to your GitHub board.
                </h2>

				<button className={styles['login-action']}
                        onClick={auth.login.bind(this)}>
					Log me in !
				</button>
			</div>
		);
	}
}
