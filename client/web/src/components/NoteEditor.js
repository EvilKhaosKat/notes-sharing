import React, { Component } from 'react';
import { ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';
import { createStore } from 'redux';

class NoteEditor extends Component {
	editNote() {

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
		return(
			<form>
				<FormGroup controlId="noteEditorForm">
					<FormControl type="text" className="noteHeadEditor"/>
					<FormControl componentClass="textarea" className="noteBodyEditor"/>
				</FormGroup>
			</form>
		);
	}

	render() {
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
	}
}

export default NoteEditor;
