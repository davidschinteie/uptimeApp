import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Website from './website';
import 'bulma/css/bulma.css';
// import Modal from './modal';

import './index.css';

class App extends React.Component {
	state = {
		websites: [],
		show: false
	};

	componentDidMount() {
		axios.get('http://172.105.73.116/websites').then((res) =>
			this.setState({
				websites: res.data
			})
		);
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
		return (
			<React.Fragment>
				<header>
					<div className="wrapper">
						<h1>Uptime Okapi</h1>
						<h3>Verifies whenever your project goes down and sends a notification.</h3>
					</div>
				</header>
				<main className="main-section">
					<div className="wrapper">
						<h2>Quick Status</h2>
						<div className="project-table">
							{this.state.websites.map((website) => {
								return <Website data={website} onEditClick={() => this.showModal()} />;
							})}
						</div>
					</div>
				</main>
				<footer className="main-section footer-section">
					<div className="wrapper">
						<a href="http://okapistudio.com" className="logo logo-footer" />
						<p className="copyright">Copyright © OKAPI. All rights reserved.</p>
					</div>
				</footer>
				<Modal show={this.state.show} handleClose={this.hideModal}>
					<p>Modal</p>
					<p>Data</p>
				</Modal>
			</React.Fragment>
		);
	}
}

const Modal = ({ handleClose, show, children }) => {
	const showHideClassName = show ? 'modal is-active' : 'modal';

	return (
		<div className={showHideClassName}>
			<div className="modal-background" />
			<div className="modal-content">
				<form>
					<h2>Recipients Mails:</h2>
					<div className="field">
						<div className="field is-grouped">
							{children}
							<div className="mail control">
								<p>some@mail.com</p>
								<button className="button is-text">Remove Email</button>
							</div>
						</div>
						<label className="label">New Email:</label>
						<div className="control has-icons-left has-icons-right">
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
			<button className="modal-close is-large" onClick={handleClose} aria-label="close" />
		</div>
	);
};

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
