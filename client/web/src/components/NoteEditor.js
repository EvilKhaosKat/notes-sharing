import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl } from 'react-bootstrap';
import NoteContentEditor from './NoteContentEditor';

const initialState = {
  id: '',
  name: '',
  content: ''
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
  }
  
  updateNoteNameState(evt) {
    var newState = Object.assign({}, this.state);
    newState.name = evt.target.value;
    console.log("[Editor] updating state to: ", newState.name);
    this.setState(
      newState
    );
  }
  
	updateNoteName(evt) {    
    const { store } = this.context;
    this.updateNoteNameState(evt);
    store.dispatch({
      type: "EDIT_NOTE_NAME",
      id: this.state.id,
      value: evt.target.value
    });
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
  
  handleKeyPress(evt) {
    if (evt.which === 13 /* Enter */) {
      evt.preventDefault();
      this.updateNoteName(evt);
    }
  }
	
	onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

	renderEditor() {
		return(
			<form className="noteEditor">
				<FormGroup controlId="noteEditorForm" onKeyPress={evt => {this.handleKeyPress(evt)}}>
					<FormControl 
						type="text" 
						className="noteHeadEditor" 
						value={this.state.name} 
            onChange={evt => this.updateNoteName(evt)}
					/>
					<NoteContentEditor state={this.state.content} />
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
