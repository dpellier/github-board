
import React from 'react';
import Reflux from 'reflux';
import Card from '../card/card.jsx';
import RepositorySelector from '../repositorySelector/repositorySelector.jsx';
import CardStore from '../../stores/card.js';
import styles from './grid.scss';

class Grid extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.store = CardStore;
	}

	render() {
		return (
			<div>
				<div className={styles.grid}>
				{
					this.state.cards.map((card, index) => {
						return (
							<div className={styles.card}
								 key={index}>
								<Card card={card}></Card>
							</div>
						);
					})
				}
                    <div className={styles.selector}>
                        <RepositorySelector />
                    </div>
				</div>
			</div>
		)
	}
}

export default Grid;
