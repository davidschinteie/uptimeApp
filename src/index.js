import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Website from './components/website';
import Modal from './components/modal';
import 'bulma/css/bulma.css';

import './index.css';

class App extends React.Component {
	state = {
		websites: [],
		show: false,
		editingWebsite: {}
	};

	componentDidMount() {
		axios.get('http://172.105.73.116/websites').then((res) =>
			this.setState({
				websites: res.data
			})
		);
	}

	showModal = (websiteData) => {
		this.setState({
			show: true,
			editingWebsite: websiteData
		});
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	updateMails = (id, listOfEmails, listOfEmailsArr) => {
		// Update the State with the new mail
		this.setState({
			websites: this.state.websites.map((website) => {
				if (website.id === 5) {
					website.emails = listOfEmailsArr;
				}
				return website;
			})
		});
		//
		axios
			.put(`http://172.105.73.116/websites/${id}`, {
				emails: listOfEmails
			})
			.then((res) => console.log(res.data));
	};

	render() {
		console.log(this.state.websites);

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
								return (
									<Website
										data={website}
										onEditClick={(websiteData) => this.showModal(websiteData)}
									/>
								);
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
				<Modal
					show={this.state.show}
					handleClose={this.hideModal}
					editingWebsite={this.state.editingWebsite}
					addNewMail={this.updateMails}
					deleteMail={this.updateMails}
				/>
			</React.Fragment>
		);
	}
}
// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
