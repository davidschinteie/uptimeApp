import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class formEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'notification@recipient.mail',
			inputStyle: { borderColor: '#dbdbdb' },
			showErrorText: { display: 'none' },
			disableSubmit: true,
			buttonStyle: {
				cursor: 'not-allowed',
				borderColor: '#A2A7AD',
				backgroundColor: '#A2A7AD',
				opacity: 0.8
			}
		};

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		websiteID: PropTypes.number,
		listOfEmails: PropTypes.array,
		addNewMail: PropTypes.func
	};

	handleChange(event) {
		this.setState({ value: event.target.value });

		if (this.checkEmail(event.target.value)) {
			this.setState({
				inputStyle: { borderColor: '#dbdbdb' },
				showErrorText: { display: 'none' },
				disableSubmit: false,
				buttonStyle: {}
			});
		} else {
			this.setState({
				inputStyle: { borderColor: '#d8000c' },
				showErrorText: { display: 'inline-block' },
				disableSubmit: true,
				buttonStyle: {
					cursor: 'not-allowed',
					borderColor: '#A2A7AD',
					backgroundColor: '#A2A7AD',
					opacity: 0.8
				}
			});
		}
	}

	onFocus() {
		if (this.state.value == 'notification@recipient.mail') {
			this.setState({
				value: ''
			});
		}
	}

	onBlur() {
		if (this.state.value == '') {
			this.setState({
				value: 'notification@recipient.mail'
			});
		}
	}

	addEmail = (e) => {
		e.preventDefault();
		let sendEmails = '';
		// ??????
		let sendEmailsArr = this.props.listOfEmails;

		if (this.checkEmail(this.state.value)) {
			this.props.listOfEmails.forEach(function(mail) {
				sendEmails += `${mail},`;
			});
			sendEmails += this.state.value;
			sendEmailsArr.push(this.state.value);
			this.props.addNewMail(this.props.websiteID, sendEmails, sendEmailsArr);
		}

		this.setState({
			value: 'notification@recipient.mail',
			disableSubmit: true,
			buttonStyle: {
				cursor: 'not-allowed',
				borderColor: '#A2A7AD',
				backgroundColor: '#A2A7AD',
				opacity: 0.8
			}
		});
	};

	checkEmail = (email) => {
		let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (regex.test(email)) {
			return true;
		} else {
			return false;
		}
	};

	render() {
		return (
			<form>
				<div className="field">
					<label className="label">New Email:</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input"
							type="email"
							placeholder="Email input"
							value={this.state.value}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onChange={this.handleChange}
							style={this.state.inputStyle}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-envelope" />
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-exclamation-triangle" />
						</span>
					</div>
					<p className="help is-danger" style={this.state.showErrorText}>
						This email is invalid
					</p>
				</div>
				<div className="field is-grouped">
					<div className="control">
						<button
							className="button is-link"
							onClick={(e) => this.addEmail(e)}
							style={this.state.buttonStyle}
							disabled={this.state.disableSubmit}
						>
							Add Email
						</button>
					</div>
				</div>
			</form>
		);
	}
}
