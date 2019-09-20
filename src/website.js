import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class website extends Component {
	static propTypes = {
		data: PropTypes.shape({
			name: PropTypes.string,
			url: PropTypes.string,
			lastCheck: PropTypes.arrayOf({
				responseTime: PropTypes.number,
				status: PropTypes.oneOf([ 'OK', 'ERROR' ])
			})
		}),
		onEditClick: PropTypes.func
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
					<span />
				</div>
				<p className="project-notify-recipient">
					<a href="#/" onClick={() => this.props.onEditClick(data.id)} className="open-project-modal">
						Edit Mail Recipients
					</a>
				</p>
			</div>
		);
	}
}
