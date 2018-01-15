import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class DeleteButton extends Component {
	render() {
		return (
			<Button className="deleteButton">
				<i className="fab fa-trash"></i>
			</Button>
		);
	}
}

export default DeleteButton;
