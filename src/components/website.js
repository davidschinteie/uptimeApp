import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class website extends Component {
	static propTypes = {
		data: PropTypes.shape({
			name: PropTypes.string,
			url: PropTypes.string,
			lastCheck: PropTypes.arrayOf({
				responseTime: PropTypes.number,
				status: PropTypes.oneOf([ 'OK', 'ERROR' ]),
				timestamp: PropTypes.timestamp
			})
		}),
		onEditClick: PropTypes.func,
		onDeleteClick: PropTypes.func,
		deleteWebsite: PropTypes.func
	};

	getStatusStyle = () => {
		let pingNo = 0;

		if (typeof this.props.data.lastCheck !== 'undefined') {
			this.props.data.lastCheck.map((checkElement) => {
				if (checkElement.status === 'OK') {
					pingNo++;
				}
			});

			switch (pingNo) {
				case 3:
					// Success Color
					return {
						backgroundColor: '#5cb85c'
					};
				case 2:
					// Warning Color
					return {
						backgroundColor: '#ffae42'
					};
				default:
					// Error Color
					return {
						backgroundColor: '#d8000c'
					};
			}
		}
	};

	render() {
		const { data } = this.props;
		return (
			<div className="project">
				<h2>
					{data.name} <br />
					<a href={`http://${data.url}`} target="_blank" rel="noopener noreferrer">
						{data.url}
					</a>
				</h2>
				<div className="status-icon">
					<span style={this.getStatusStyle()} />
				</div>
				<p className="project-notify-recipient">
					<a href="#/" onClick={() => this.props.onEditClick(data)} className="open-project-modal">
						Edit Mail Recipients
					</a>
					<a href="#/" className="delete-project-btn" onClick={() => this.props.onDeleteClick(data.id)}>
						Delete Project
					</a>
				</p>
			</div>
		);
	}
}
