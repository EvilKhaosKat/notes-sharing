import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';

class NoteEditor extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	updateState() {
    this.setState(
			this.getSelectedNote(this.props.id)
		);
  }
	
	componentWillMount() {
		this.updateState();
	}
	
	getSelectedNote() {
		const { store } = this.context;
		const notes = store.getState().notes;
		var note = notes.find(function (obj) { 
			return obj.selected === true; 
		});
		if (note)
			return note;
		return {};
	}
	
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => {
      this.updateState();
			this.forceUpdate();
    });
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
		return(
			<form>
				<FormGroup controlId="noteEditorForm">
					<FormControl 
						type="text" 
						className="noteHeadEditor" 
						value={this.state.name ? this.state.name : ""} 
						 />
					<FormControl 
						componentClass="textarea" 
						className="noteBodyEditor" 
						value={this.state.content ? this.state.content : ""}
						 />
				</FormGroup>
			</form>
		);
	}

	render() {
		if (this.state.id !== undefined) {	
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
