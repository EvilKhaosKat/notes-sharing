import notes from './Notes';
import nextId from './NotesIds';
import selectedNote from './SelectedNote';
import { combineReducers } from 'redux';

const notesAppReducers = combineReducers({
		notes,
		nextId,
		selectedNote
	});

export default notesAppReducers;