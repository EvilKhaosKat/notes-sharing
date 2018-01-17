import React from 'react';
import ReactDOM from 'react-dom';
import NotesApp from './components/NotesApp';
import { createStore } from 'redux';
import notesAppReducers from './Reducers/AllReducers'
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={createStore(notesAppReducers)}>
		<NotesApp />
	</Provider>, 
	document.getElementById('root')
);