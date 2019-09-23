import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Website from './components/website';
import ModalEdit from './components/modalEdit';
import ModalAdd from './components/modalAdd';
import 'bulma/css/bulma.css';

import './index.scss';

class App extends React.Component {
	state = {
		websites: [],
		showEditModal: false,
		showAddModal: false,
		editingWebsite: {}
	};

	componentDidMount() {
		axios.get('http://172.105.73.116/websites').then((res) =>
			this.setState({
				websites: res.data
			})
		);
	}

	showEditModal = (websiteData) => {
		this.setState({
			showEditModal: true,
			editingWebsite: websiteData
		});
	};

	showAddModal = () => {
		this.setState({
			showAddModal: true
		});
	};

	hideEditModal = () => {
		this.setState({ showEditModal: false });
	};

	hideAddModal = () => {
		this.setState({ showAddModal: false });
	};

	updateMails = (id, listOfEmails, listOfEmailsArr) => {
		// Update the State with the new mail
		this.setState({
			websites: this.state.websites.map((website) => {
				if (website.id === id) {
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

	addNewWebsite = (website) => {
		axios
			.post('http://172.105.73.116/websites', {
				name: website.name,
				url: website.url,
				emails: website.emails
			})
			.then((res) => this.setState({ websites: [ ...this.state.websites, res.data ] }));
		// console.log(website);
	};

	deleteWebsite = (id) => {
		axios
			.delete(`http://172.105.73.116/websites/${id}`)
			.then((res) =>
				this.setState({ websites: [ ...this.state.websites.filter((website) => website.id !== id) ] })
			);
	};

	render() {
		// console.log(this.state.websites);

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
										onEditClick={(websiteData) => this.showEditModal(websiteData)}
										deleteWebsite={this.deleteWebsite}
									/>
								);
							})}
						</div>
						<a href="#/" onClick={this.showAddModal} class="button is-dark add-new-website-btn">
							Add new website
						</a>
					</div>
				</main>
				<footer className="main-section footer-section">
					<div className="wrapper">
						<a href="http://okapistudio.com" className="logo logo-footer" />
						<p className="copyright">Copyright © OKAPI. All rights reserved.</p>
					</div>
				</footer>
				<ModalEdit
					showEditModal={this.state.showEditModal}
					handleEditClose={this.hideEditModal}
					editingWebsite={this.state.editingWebsite}
					addNewMail={this.updateMails}
					deleteMail={this.updateMails}
				/>
				<ModalAdd
					showAddModal={this.state.showAddModal}
					handleAddModalClose={this.hideAddModal}
					addNewWebsite={this.addNewWebsite}
				/>
			</React.Fragment>
		);
	}
}
// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
