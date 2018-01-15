import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DeleteButton extends Component {
	render() {
		return (
			<Button className="deleteButton">
				<i className="fas fa-trash-alt"></i>
			</Button>
		);
	}
}

export default DeleteButton;
