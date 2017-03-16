
import React, {PropTypes as Types} from 'react';
import Repository from '../repository/repository.jsx';
import styles from './organization.scss';

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    static propTypes = {
        organization: Types.object
    };

    static defaultProps = {
        organization: {
            repositories: []
        }
    };

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }

	render() {
		return (
			<div className={styles.organization}>
                <div className={styles['organization-header']}>
                    <span className={styles['organization-name']}>
                        {this.props.organization.login}
                    </span>

                    <em className={`icon-chevron-down ${styles.toggle} ${this.state.open ? '' : styles.closed}`}
                        onClick={this.toggle.bind(this)}>
                    </em>
                </div>

                <div className={`${styles['organization-repositories']} ${this.state.open ? '' : styles.closed}`}>
                    {
                        this.props.organization.repositories.map((repository) => {
                            return (
                                <div className={styles.repository}
                                     key={repository.id}>
                                    <Repository repository={repository}/>
                                </div>
                            );
                        })
                    }
                </div>
			</div>
		);
	}
}

export default Organization;
