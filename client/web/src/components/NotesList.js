import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

class NotesList extends Component {

	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	getNotes() {
		/* TODO get notes by REST here */
		var notes = [{"id": 1, "head": "note1", "body": "content of note1"}, 
					 {"id": 2, "head": "note2", "body": "content of note2"}];

		return notes;
	}

	render() {
		const { store } = this.context;
		const notes = store.getState().notes;

		console.log("[NotesList] notes are: ", notes);
		return(
			<div className="notesList">
				{notes.map(note => 
					<Note key={note.id} id={note.id} />
				)}
			</div>
		);
	}
}

NotesList.contextTypes = {
	store: PropTypes.object
}

export default NotesList;
