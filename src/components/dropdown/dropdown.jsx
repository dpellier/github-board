
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.scss';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};

        this._eventListener = null;
	}

    toggle() {
        this.state.visible ? this.hide() : this.show();
    }

	show() {
		this.setState({visible: true}, () => {
            this._eventListener = this.hide.bind(this);
            document.addEventListener('click', this._eventListener);
		});
	}

	hide() {
		this.setState({visible: false}, () => {
            document.removeEventListener('click', this._eventListener);
		});
	}

	render() {
		return (
			<div className={styles.dropdown}>
				<div className={styles.toggle}
					 onClick={this.toggle.bind(this)}>
					<em className={`icon-chevron-down ${styles['toggle-icon']} ${this.state.visible ? styles.rotated : ''}`}></em>
				</div>

				<div className={`${styles['dropdown-list']} ${this.state.visible ? styles.visible : ''}`}>
					<div className={styles['dropdown-item']}>
                        {this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Dropdown;
