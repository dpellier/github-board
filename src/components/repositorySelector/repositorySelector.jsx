
import React from 'react';
import Reflux from 'reflux';
import Organization from './organization/organization.jsx';
import RepositoryActions from '../../actions/repository.js';
import RepositoryStore from '../../stores/repository.js';
import styles from './repositorySelector.scss';

class RepositorySelector extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {flipped: false};
        this.store = RepositoryStore;
    }

    showList() {
        RepositoryActions.fetch();
        this.setState({flipped: true});
    }

    flip() {
        this.setState({
            flipped: !this.state.flipped
        });
    }

	render() {
		return (
			<div className={`${styles['repository-selector']} ${this.state.flipped ? styles.flipped : ''}`}>
                <div className={styles.flip}>
                {
                    <div onClick={this.showList.bind(this)}
                         className={styles['repository-more']}>
                        <div className={styles['add-more']}>
                            <span>
                                Add more repository
                            </span>

                            <em className="icon-plus"></em>
                        </div>
                    </div>
                }
                {
                    <div className={`${styles['repository-list']} ${this.state.loading ? styles.loading : ''}`}>
                        <em className={`icon-close ${styles.close}`}
                            onClick={this.flip.bind(this)}>
                        </em>

                        <div className={styles.list}>
                        {
                            this.state.organizations.map((organization) => {
                                return (
                                    <Organization key={organization.id}
                                                  organization={organization} />
                                );
                            })
                        }
                        </div>
                    </div>
                }
                </div>
			</div>
		);
	}
}

export default RepositorySelector;
