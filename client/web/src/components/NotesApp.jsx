import React, { Component } from 'react';
import SearchNote from './SearchNote';
import AddNote from './AddNote';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import { Grid, Row, Col } from 'react-bootstrap';

import './css/NoteApp.css'
import './css/bootstrap.css'

class NotesApp extends Component {
	render() {
    return (
      <div className='NotesApp'>
      	<Grid className="NotesAppGrid">
      		<Row className="NotesAppRow">
	      		<Col className="NotesListCol" xs={5} sm={5} md={4} lg={4}>
	      			<SearchNote />
	      			<AddNote />
	      			<NotesList />
	      		</Col>
	      		<Col className="NoteEditorCol" xs={7} sm={7} md={8} lg={8}>
	        		<NoteEditor />
	        	</Col>
        	</Row>
        </Grid>
      </div>
    );
	}
}

export default NotesApp;
