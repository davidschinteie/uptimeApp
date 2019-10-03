import React from 'react';
import ReactDOM from 'react-dom';
import Website from './components/website';
import ModalEdit from './components/modalEdit';
import ModalAdd from './components/modalAdd';
import ModalDelete from './components/modalDelete';
import 'bulma/css/bulma.css';

import './index.scss';
import Services from './services/api';

class App extends React.Component {
	state = {
		websites: [],
		showEditModal: false,
		showAddModal: false,
		showDeleteModal: false,
		deleteWebsiteID: null,
		editingWebsite: {}
	};

	componentDidMount() {
		this.getWebsites();
		this.interval = setInterval(
			() => {
				this.getWebsites();
			}, 60000
		);
	}

	getWebsites() {
		Services.getAll()
			.then((res) =>
				this.setState({
					websites: res.data
				}, () => console.log(this.state.websites))
			)
			.catch(err => {
				console.log(err)
			})
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

		Services.updateMail(id, listOfEmails)
			.then((res) => {
				this.setState({
					websites: this.state.websites.map((website) => {
						if (website.id === id) {
							website.emails = listOfEmailsArr;
						}
						return website;
					})
				});
			});
	};

	addNewWebsite = (website) => {
		this.hideAddModal();
		Services.addWebsite({
			name: website.name,
			url: website.url,
			emails: website.emails
		})
			.then((res) => {
				this.setState({
					websites: [ ...this.state.websites, res.data ]
				})
			});
		// console.log(website);
	};

	deleteWebsite = (id) => {
		this.hideDeleteModal();
		Services.removeWebsite(id)
			.then((res) =>
				this.setState({websites: this.state.websites.filter((website) => website.id !== id)})
			);
	};

	render() {
		// console.log(this.state.websites);
	console.log('asd');
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
							{/*neaparat cand randezi elemente multiple sa ii asociezi o cheie unica*/}
							{this.state.websites.map((website, key) => {
								return (
									<Website
										key={key}
										data={website}
										onEditClick={(websiteData) => this.showEditModal(websiteData)}
										onDeleteClick={(websiteID) => this.showDeleteModal(websiteID)}
										deleteWebsite={this.deleteWebsite}
									/>
								);
							})}
						</div>
						<button onClick={this.showAddModal} className="button is-dark add-new-website-btn">
							Add new website
						</button>
					</div>
				</main>
				<footer className="main-section footer-section">
					<div className="wrapper">
						<a href="http://okapistudio.com" target="_blank" className="logo logo-footer"/>
						<p className="copyright">Copyright © OKAPI. All rights reserved.</p>
					</div>
				</footer>
				{/*nu randa elemente care nu sunt vizibile... evita sa folosesti display none si opacity.. poti pur si simplu sa nu le randezi*/}
				{this.state.showEditModal && <ModalEdit
					showEditModal={this.state.showEditModal}
					handleEditClose={this.hideEditModal}
					editingWebsite={this.state.editingWebsite}
					addNewMail={this.updateMails}
					deleteMail={this.updateMails}
				/>}
				{this.state.showAddModal && <ModalAdd
					showAddModal={this.state.showAddModal}
					handleAddModalClose={this.hideAddModal}
					addNewWebsite={this.addNewWebsite}
				/>}
				{this.state.showDeleteModal && <ModalDelete
					showDeleteModal={this.state.showDeleteModal}
					handleDeleteModalClose={this.hideDeleteModal}
					deleteWebsiteID={this.state.deleteWebsiteID}
					deleteWebsite={this.deleteWebsite}
				/>}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
