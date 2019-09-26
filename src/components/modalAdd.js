import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormAdd from './formAdd';

export default class modalAdd extends Component {
	static propTypes = {
		showAddModal: PropTypes.bool,
		addNewWebsite: PropTypes.func
	};

	render() {
		const { showAddModal } = this.props;
		return (
			<div className={showAddModal ? 'modal is-active' : 'modal'}>
				<div className="modal-background" />
				<div className="modal-content">
					<h2>Add New Website:</h2>
					<FormAdd addNewWebsite={this.props.addNewWebsite} />
				</div>
				<button
					className="modal-close is-large"
					onClick={() => this.props.handleAddModalClose()}
					aria-label="close"
				/>
			</div>
		);
	}
}
