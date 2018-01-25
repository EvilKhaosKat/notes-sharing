import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

class AddNote extends Component {

	constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

	updateValue(evt) {
		this.setState({
    	inputValue: evt.target.value
    });
	}

	clearValue() {
		this.setState({
			inputValue: ''
		});
	}
	
	handleClick(name) {
		if (name.length === 0) {
			return;
		}
		const { store } = this.context;
		const nextId = store.getState().nextId;
		store.dispatch({
			type: "ADD_NOTE",
			id: nextId,
			name: name,
			content: ""
		});
    store.dispatch({
			type: "SELECT_NOTE",
			id: nextId
		});
		store.dispatch({
			type: "INC_ID"
		});
		this.clearValue();
	}
  
  handleKeyPress(evt) {
    if (evt.which === 13 /* Enter */) {
      evt.preventDefault();
      this.handleClick(this.state.inputValue);
    }
  }

	render() {
		return (
			<form>
				<FormGroup 
					controlId="addNoteForm"
					onKeyPress={evt => this.handleKeyPress(evt)}>
					<InputGroup>
						<FormControl type="text" placeholder="Add new note..." value={this.state.inputValue} onChange={evt => this.updateValue(evt)} />
						<InputGroup.Button>
							<Button onClick={() => this.handleClick(this.state.inputValue)}>+</Button>
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</form>
		);
	}
}

AddNote.contextTypes = {
	store: PropTypes.object
}

export default AddNote;