import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class SearchNote extends Component {
	render() {
		return (
			<form>
				<FormGroup controlId="searchNoteForm">
					<FormControl
						type="text"
						placeholder="Search note..."
					/>
				</FormGroup>
			</form>
		);
	}
}

export default SearchNote;