import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';

const initialState = {
  id: null,
  name: null,
  content: null
}

class NoteEditor extends Component {

	constructor(props) {
		super(props);
		this.state = initialState;
	}

	updateState() {
    this.setState(
			this.getSelectedNote(this.props.id)
		);
    console.log("[Editor] updating to: ", this.getSelectedNote(this.props.id));
  }
	
	getSelectedNote() {
		const { store } = this.context;
		const notes = store.getState().notes;
		var note = notes.find(function (obj) { 
			return obj.selected === true; 
		});
		return note ? note : initialState;
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

	renderEditor() {
		return(
			<form className="noteEditor">
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
    console.log("[Editor] state: ", this.state);
		if (this.state.id !== null) {	
			return(
				<div className="noteEditor">
          {this.renderEditor()}
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
