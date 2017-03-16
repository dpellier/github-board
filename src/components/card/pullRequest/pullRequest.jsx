
import React, {PropTypes as Types} from 'react';
import moment from 'moment';
import styles from './pullRequest.scss';

const REVIEW_STATUS = {
    approved: 'APPROVED',
    none: 'NONE',
    rejected: 'CHANGES_REQUESTED'
};

class PullRequest extends React.Component {
    static propTypes = {
        pullRequest: Types.object
    };

	render() {
        const pr = this.props.pullRequest;
        const status = getStatus(pr.status);

		return (
			<div className={styles['pull-request']}>
				<a href={pr.html_url}
                   target="_blank"
				   className={styles['pull-request-link']}>
                    {pr.title}
				</a>

				<span className={styles['pull-request-information']}>
					#{pr.number} opened {moment(pr.created_at).fromNow()} by {pr.user.login} •

                    <span className={`${styles['pull-request-status']} ${styles[`pull-request-status-${pr.status.toLowerCase()}`]}`}>
                        {status}
                    </span>
				</span>
			</div>
		);
	}
}

function getStatus(status) {
    switch (status) {
        case REVIEW_STATUS.approved:
            return 'Approved';
        case REVIEW_STATUS.rejected:
            return 'Changes requested';
        case REVIEW_STATUS.none:
            return 'Review needed';
    }
}

export default PullRequest;
