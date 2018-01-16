import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class DeleteButton extends Component {
	
  getSelectedNotes() {
		const { store } = this.context;
		const notes = store.getState().notes;
		var selectedNotes = notes.filter(function (obj) { 
			return obj.selected === true; 
		});
		return selectedNotes;
	}
  
	handleClick() {
    const { store } = this.context;
    var selectedNotes = this.getSelectedNotes();
		selectedNotes.forEach((note, idx, selectedNotes) => {
      store.dispatch({
        type: "DELETE_NOTE",
        id: note.id
      });
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
