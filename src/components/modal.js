import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './form';

export default class modal extends Component {
	static propTypes = {
		show: PropTypes.bool,
		editingWebsite: PropTypes.object,
		addNewMail: PropTypes.func,
		deleteMail: PropTypes.func
	};

	deleteMail = (email) => {
		let newEmails = '';
		// ??????
		let newEmailsArr = [];
		this.props.editingWebsite.emails.forEach(function(mail, index) {
			if (mail != email) {
				newEmails += `${mail},`;
				newEmailsArr.push(mail);
			}
		});
		// remove the last comma and any whitespace after it:
		newEmails = newEmails.replace(/,\s*$/, '');
		this.props.deleteMail(this.props.editingWebsite.id, newEmails, newEmailsArr);
	};

	render() {
		// handleClose, show, children
		const { show, editingWebsite } = this.props;

		let recipientEmails;

		if (Object.keys(editingWebsite).length !== 0) {
			recipientEmails = editingWebsite.emails.map((email) => {
				return (
					<div className="field is-grouped">
						<div className="mail control">
							<p>{email}</p>
							<button className="button is-text" onClick={() => this.deleteMail(email)}>
								Remove Email
							</button>
						</div>
					</div>
				);
			});
		}

		return (
			<div className={show ? 'modal is-active' : 'modal'}>
				<div className="modal-background" />
				<div className="modal-content">
					<h2>Recipients Mails:</h2>
					{recipientEmails}
					<Form
						websiteID={editingWebsite.id}
						listOfEmails={editingWebsite.emails}
						addNewMail={this.props.addNewMail}
					/>
				</div>
				<button className="modal-close is-large" onClick={() => this.props.handleClose()} aria-label="close" />
			</div>
		);
	}
}
