import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Note extends Component {

	/*TODO
		suppose we have field "selectedNoteId" in state
		after
	*/

	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleClick(props) {
		const { store } = this.context;
		store.dispatch({
			type: "SELECT_NOTE",
			id: props.id,
			name: props.name,
			content: props.content
		});
		console.log("state after selection: ", store.getState());
	}

	render() {
		const { store } = this.context;
		const selectedNote = store.getState().selectedNote;
		const classes = classNames({
			note: true,
			selected: this.props.id === selectedNote.id
		});
		return(
			<div className={classes} id={"Note_" + this.props.id} onClick={() => this.handleClick(this.props)}>
				<div className="noteHeader"><b>{this.props.name}</b></div>
				<div className="noteContent">{this.props.content.substring(0,25)}...</div>
			</div>
		);
	}
}

Note.contextTypes = {
	store: PropTypes.object
}

export default Note;