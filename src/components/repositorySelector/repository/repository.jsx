
import React, {PropTypes as Types} from 'react';
import Reflux from 'reflux';
import CardActions from '../../../actions/card.js';
import RepositoryActions from '../../../actions/repository.js';
import CardStore from '../../../stores/card.js';
import RepositoryStore from '../../../stores/repository.js';
import styles from './repository.scss';

class Repository extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.stores = [CardStore, RepositoryStore];
    }

    static propTypes = {
        repository: Types.object
    };

    componentDidUpdate() {
        const cardFound = this.state.cards.some((card) => {
            return this.props.repository.id === card.id;
        });

        if (cardFound !== this.state.selected) {
            this.setState({selected: cardFound});
        }
    }

    toggle() {
        this.state.selected ? this.remove() : this.select();
    }

    select() {
        this.setState({selected: true});
        CardActions.add(this.props.repository);
    }

    remove() {
        this.setState({selected: false});
        CardActions.remove(this.props.repository);
    }

	render() {
		return (
			<div className={`${styles.repository} ${this.state.selected ? styles.selected : ''}`}
                 onClick={this.toggle.bind(this)}>
                <span className={styles.name}>
                    {this.props.repository.name}
                </span>
			</div>
		);
	}
}

export default Repository;
