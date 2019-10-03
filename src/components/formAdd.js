import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class formAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: '',
			urlValue: '',
			emailValue: 'notification@recipient.mail',
			inputStyle: {
				borderColor: '#dbdbdb'
			},
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
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}

	static propTypes = {
		addNewWebsite: PropTypes.func
	};

	handleChange(event) {
		if (event.target.name === 'name') {
			this.setState({ nameValue: event.target.value });
		} else if (event.target.name === 'url') {
			this.setState({ urlValue: event.target.value });
		}
	}

	handleEmailChange(event) {
		this.setState({
			emailValue: event.target.value
		});
		// pentru validare incearca sa te folosesti doar de o variabila de care sa te folosesti peste tot unde ai nevoie...
		if (this.checkEmail(event.target.value)) {
			this.setState({
				error: true
				// inputStyle: {
				// 	borderColor: '#dbdbdb'
				// },
				// showErrorText: { display: 'none' },
				// disableSubmit: false,
				// buttonStyle: {}
			});
		} else {
			this.setState({
				inputStyle: {
					borderColor: '#d8000c'
				},
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
		if (this.state.emailValue === 'notification@recipient.mail') {
			this.setState({
				emailValue: ''
			});
		}
	}

	onBlur(event) {
		if (event.target.name === 'email' && this.state.emailValue === '') {
			this.setState({
				emailValue: 'notification@recipient.mail'
			});
		} else if (event.target.name === 'name') {
			this.setState({
				nameValue: event.target.value
			});
		} else if (event.target.name === 'url') {
			this.setState({
				urlValue: event.target.value
			});
		}
	}

	checkEmail = (email) => {
		let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (regex.test(email)) {
			return true;
		} else {
			return false;
		}
	};

	addWebsite = (e) => {
		e.preventDefault();
		let newWebsite = {
			name: '',
			url: '',
			emails: ''
		};
		newWebsite.name = this.state.nameValue;
		newWebsite.url = this.state.urlValue;
		newWebsite.emails = this.state.emailValue;
		this.props.addNewWebsite(newWebsite);
		this.setState({
			nameValue: '',
			urlValue: '',
			emailValue: 'notification@recipient.mail'
		});
		// console.log(newWebsite);
	};

	render() {
		return (
			<form>
				<div className="field">
					<label className="label">Website Name:</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="Example Name"
							name="name"
							value={this.state.nameValue}
							onBlur={this.onBlur}
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div className="field">
					<label className="label">Website Url:</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="example.com"
							name="url"
							value={this.state.urlValue}
							onBlur={this.onBlur}
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div className="field">
					<label className="label">Email</label>
					<div className="control multiple-emails">
						<input
							className={`input ${this.state.error ? 'error': ''}`}
							type="email"
							placeholder="Email input"
							name="email"
							value={this.state.emailValue}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onChange={this.handleEmailChange}
							style={this.state.error && {color: 'red', borderColor: 'red'}}
						/>
					</div>
					{this.state.error && <p className="help is-danger" >
						This email is invalid
					</p>}
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button
							className="button is-link"
							onClick={(e) => this.addWebsite(e)}
							style={this.state.buttonStyle}
							disabled={this.state.error}
						>
							Add Website
						</button>
					</div>
				</div>
			</form>
		);
	}
}
