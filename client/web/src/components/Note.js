import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Note extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	
	getNoteById(id) {
		const { store } = this.context;
		const notes = store.getState().notes;
		var note = notes.find(function (obj) { 
			return obj.id === id; 
		});
		return note;
	}
  
  updateState() {
    this.setState(
			this.getNoteById(this.props.id)
		);
  }
	
	componentWillMount() {
		this.updateState();
	}

	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleClick() {
		const { store } = this.context;
		store.dispatch({
			type: "SELECT_NOTE",
			id: this.state.id
		});
    this.updateState();
		console.log("[Note] state after selection: ", store.getState());
	}

	render() {
		const classes = classNames({
			note: true,
			selected: this.state.selected
		});
		return(
			<div className={classes} id={"Note_" + this.state.id} onClick={() => this.handleClick()}>
				<div className="noteHeader"><b>{this.state.name}</b></div>
				<div className="noteContent">{this.state.content.substring(0,25)}...</div>
			</div>
		);
	}
}

Note.contextTypes = {
	store: PropTypes.object
}

export default Note;