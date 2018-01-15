import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';
import { createStore } from 'redux';

class NoteEditor extends Component {
	
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
	
	editNote(note) {

	}

	saveNote() {

	}

	renderToolbar() {
		return(
			<ButtonToolbar>
				<DeleteButton />
				<ShareButton />
			</ButtonToolbar>
		);
	}

	renderEditor() {
		const { store } = this.context;
		const selectedNote = store.getState().selectedNote;
		return(
			<form>
				<FormGroup controlId="noteEditorForm">
					<FormControl 
						type="text" 
						className="noteHeadEditor" 
						value={selectedNote.name} 
						 />
					<FormControl 
						componentClass="textarea" 
						className="noteBodyEditor" 
						value={selectedNote.content}
						 />
				</FormGroup>
			</form>
		);
	}

	render() {
		const { store } = this.context;
		const selectedNote = store.getState().selectedNote;
		if (selectedNote.id !== undefined) {	
		return(
			<div className="noteEditor">
				<div className="noteEditorToolbar">
					{this.renderToolbar()}
				</div>
				<div className="noteEditorBody">
					{this.renderEditor()}
				</div>
			</div>
		);
		} else {
			return(
				<div>Nothing...</div>
			);
		}
	}
}

NoteEditor.contextTypes = {
	store: PropTypes.object
}

export default NoteEditor;
