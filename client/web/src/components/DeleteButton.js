import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class DeleteButton extends Component {
	
	handleClick() {
		const { store } = this.context;
		const noteToDelete = store.getState().selectedNote;
		store.dispatch({
			type: "DELETE_NOTE",
			id: noteToDelete.id
		});
		store.dispatch({
			type: "DESELECT"
		});
	}
	
	render() {
		return (
			<Button className="deleteButton" onClick={() => this.handleClick()}>
				<i className="fas fa-trash-alt"></i>
			</Button>
		);
	}
}

DeleteButton.contextTypes = {
	store: PropTypes.object
}

export default DeleteButton;
