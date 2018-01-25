import React, { Component } from 'react';
import SearchNote from './SearchNote';
import AddNote from './AddNote';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';
import { ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';

import './css/NoteApp.css';
import './css/bootstrap.css';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class NotesApp extends Component {
  
  renderToolbar() {
		return(
      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <AddNote />
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <ButtonToolbar>
            <DeleteButton />
            <ShareButton />
          </ButtonToolbar>
        </Col>
      </Row>
		);
	}
  
	render() {
		return (
		  <div className='NotesApp'>
			<Grid className="NotesAppGrid">
				<Row className="NotesAppRow">
					<Col className="NotesListCol" xs={5} sm={5} md={4} lg={4}>
						<SearchNote />
						{this.renderToolbar()}
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
