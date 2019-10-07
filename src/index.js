import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Website from './components/website';
import ModalEdit from './components/modalEdit';
import ModalAdd from './components/modalAdd';
import ModalDelete from './components/modalDelete';
import 'bulma/css/bulma.css';
import loading from './img/loading.gif';

import './index.scss';

class App extends React.Component {
	state = {
		websites: [],
		fetchInProgress: true,
		showEditModal: false,
		showAddModal: false,
		showDeleteModal: false,
		deleteWebsiteID: null,
		editingWebsite: {}
	};

	componentDidMount() {
		axios.get('http://172.105.73.116/api/websites').then((res) =>
			this.setState({
				websites: res.data,
				fetchInProgress: false
			})
		);
		this.interval = setInterval(
			() =>
				axios.get('http://172.105.73.116/api/websites').then((res) =>
					this.setState({
						websites: res.data
					})
				),
			60000
		);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	showDeleteModal = (websiteID) => {
		this.setState({
			showDeleteModal: true,
			deleteWebsiteID: websiteID
		});
	};

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

	hideDeleteModal = () => {
		this.setState({ showDeleteModal: false });
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
			.put(`http://172.105.73.116/api/websites/${id}`, {
				emails: listOfEmails
			})
			.then((res) => console.log(res.data));
	};

	addNewWebsite = (website) => {
		this.hideAddModal();
		axios
			.post('http://172.105.73.116/api/websites', {
				name: website.name,
				url: website.url,
				emails: website.emails
			})
			.then((res) => this.setState({ websites: [ ...this.state.websites, res.data ] }));
		// console.log(website);
	};

	deleteWebsite = (id) => {
		this.hideDeleteModal();
		axios
			.delete(`http://172.105.73.116/api/websites/${id}`)
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
				{this.state.fetchInProgress ? (
					<section className="loading">
						<div className="wrapper">
							<img src={loading} alt="" />
						</div>
					</section>
				) : (
					<main className="main-section">
						<div className="wrapper">
							<h2>Quick Status</h2>
							<div className="project-table">
								{this.state.websites.map((website) => {
									return (
										<Website
											data={website}
											onEditClick={(websiteData) => this.showEditModal(websiteData)}
											onDeleteClick={(websiteID) => this.showDeleteModal(websiteID)}
											deleteWebsite={this.deleteWebsite}
										/>
									);
								})}
							</div>
							<a href="#/" onClick={this.showAddModal} className="button is-dark add-new-website-btn">
								Add new website
							</a>
						</div>
					</main>
				)}
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
				<ModalDelete
					showDeleteModal={this.state.showDeleteModal}
					handleDeleteModalClose={this.hideDeleteModal}
					deleteWebsiteID={this.state.deleteWebsiteID}
					deleteWebsite={this.deleteWebsite}
				/>
			</React.Fragment>
		);
	}
}
// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
