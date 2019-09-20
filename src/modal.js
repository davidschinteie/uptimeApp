import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class modal extends Component {
	static propTypes = {
		show: PropTypes.bool
	};

	onChange = (e) => {
		e.preventDefault();
	};

	render() {
		// handleClose, show, children
		const { showHideClassname } = this.props;

		return (
			<div className={showHideClassname ? 'modal is-active' : 'modal'}>
				<div className="modal-background" />
				<div className="modal-content">
					<form>
						<h2>Recipients Mails:</h2>
						<div className="field">
							<div className="field is-grouped">
								{/* {children} */}
								<div className="mail control">
									<p>some@mail.com</p>
									<button className="button is-text">Remove Email</button>
								</div>
							</div>
							<label className="label">New Email:</label>
							<div className="control has-icons-left has-icons-right">
								<input
									className="input is-danger"
									type="email"
									placeholder="Email input"
									value="notification@recipient.mail"
									onChange={this.onChange}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-envelope" />
								</span>
								<span className="icon is-small is-right">
									<i className="fas fa-exclamation-triangle" />
								</span>
							</div>
							<p className="help is-danger">This email is invalid</p>
						</div>
						<div className="field is-grouped">
							<div className="control">
								<button className="button is-link">Add Email</button>
							</div>
						</div>
					</form>
				</div>
				{/* <button className="modal-close is-large" onClick={handleClose} aria-label="close" /> */}
			</div>
		);
	}
}
