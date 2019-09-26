import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class modalDelete extends Component {
	static propTypes = {
		showDeleteModal: PropTypes.bool,
		deleteWebsiteID: PropTypes.number,
		deleteWebsite: PropTypes.func,
		handleDeleteModalClose: PropTypes.func
		// addNewMail: PropTypes.func
	};

	render() {
		const { showDeleteModal, deleteWebsiteID, deleteWebsite } = this.props;
		return (
			<div className={showDeleteModal ? 'modal modal-delete is-active' : 'modal'}>
				<div className="modal-background" />
				<div className="modal-content">
					<h2>Are you sure you want to delete this website?</h2>
					<div className="buttons-wrapper">
						<button className="button is-danger" onClick={() => this.props.handleDeleteModalClose()}>
							Cancel
						</button>
						<button className="button is-success" onClick={() => deleteWebsite(deleteWebsiteID)}>
							Yes
						</button>
					</div>
				</div>
				<button
					className="modal-close is-large"
					onClick={() => this.props.handleDeleteModalClose()}
					aria-label="close"
				/>
			</div>
		);
	}
}
