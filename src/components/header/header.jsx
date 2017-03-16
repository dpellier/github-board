
import React, {PropTypes as Types} from 'react';
import Dropdown from '../dropdown/dropdown.jsx';
import AuthService from '../../auth/AuthService.js';
import styles from './header.scss';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

    static contextTypes = {
        router: Types.object
    };

    logout() {
        AuthService.logout();
        this.context.router.push('/login');
    }

	render() {
		const profile = AuthService.getProfile();

		return (
			<div className={styles.header}>
				<span className={styles.username}>
					{profile.name}
				</span>

				<img className={styles['user-picture']}
					 src={profile.picture}
					 height="30"
					 width="30" />

				<Dropdown>
                    <div onClick={this.logout.bind(this)}
                         className={styles.action}>
                        <span>
                            Sign out
                        </span>

                        <em className="icon-logout"></em>
                    </div>
                </Dropdown>
			</div>
		)
	}
}

export default Header;
