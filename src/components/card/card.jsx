
import React, {PropTypes as Types} from 'react';
import PullRequest from './pullRequest/pullRequest.jsx';
import CardActions from '../../actions/card.js';
import styles from './card.scss';

class Card extends React.Component {
    static propTypes = {
        card: Types.object
    };

    placeholder() {
        return this.props.card.name ? styles.placeholder : '';
    }

    remove() {
        CardActions.remove(this.props.card);
    }

    refresh() {
        CardActions.refresh(this.props.card);
    }

	render() {
        const card = this.props.card;
        const isFilled = !!this.props.card.id;

		return (
			<div className={`${styles.card} ${isFilled ? '' : styles.placeholder}`}>
				<div className={`${styles['card-header']} ${isFilled ? '' : styles.placeholder}`}>
                    <em className={`${styles.close} ${isFilled ? 'icon-close' : ''}`}
                        onClick={this.remove.bind(this)}>
                    </em>

					<span className={styles['card-name']}>
						{card.name}
					</span>
					{
						card.private &&
						<em className={`${styles.lock} icon-lock`}></em>
					}
				</div>

				<div className={`${styles['pull-requests']} ${isFilled ? '' : styles.placeholder}`}>
					<div className={styles['pull-requests-title']}>
						<em className={`${styles['pull-requests-title-icon']} icon-branch`}></em>

						<span className={styles['pull-requests-title-label']}>
							Pull Requests ({card.pullRequests.length})
						</span>

                        <em className={`${styles['pull-requests-title-reload']} icon-reload`}
                            onClick={this.refresh.bind(this)}></em>
					</div>

                    {
                        card.pullRequests.length === 0 &&
                        <span className={styles['pull-requests-empty']}>
                            Nothing here.
                        </span>
                    }

                    {
                        card.pullRequests.length > 0 &&
                        card.pullRequests.map((pullRequest) => {
                            return (
                                <PullRequest key={pullRequest.id}
                                             pullRequest={pullRequest} />
                            );
                        })
                    }
				</div>
			</div>
		);
	}
}

export default Card;
