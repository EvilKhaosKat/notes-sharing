import notes from './Notes';
import nextId from './NotesIds';
import { combineReducers } from 'redux';

const notesAppReducers = combineReducers({
		notes,
		nextId
	});

export default notesAppReducers;