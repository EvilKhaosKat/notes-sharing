import notes from './Notes';
import nextId from './NotesIds';
import selectedNoteId from './SelectedNoteId';
import { combineReducers } from 'redux';

const notesAppReducers = combineReducers({
		notes,
		nextId,
		selectedNoteId
	});

export default notesAppReducers;