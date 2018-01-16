const addNewNote = (notes, action) => {
	var newNote = {
		id: action.id,
		name: action.name,
		content: action.content,
		selected: false
	};
	return [
		...notes,
		newNote
	];
}

const removeNoteFromArray = (notes, noteIdToRemove) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === noteIdToRemove; 
	});
	return notes
		.slice(0, idx)
		.concat(notes.slice(idx + 1));
}

const selectNote = (notes, id) => {
  var newArr = notes.slice(0);
  // find already selected note and deselect it
  var selectedNoteIdx = notes.findIndex(function (obj) { 
    return obj.selected === true; 
  });
  if (selectedNoteIdx !== -1) {
    newArr[selectedNoteIdx].selected = false;
  }
  // select a new note
	var idx = notes.findIndex(function (obj) { 
		return obj.id === id; 
	});
	newArr[idx].selected = true;
	return newArr;
}

const editNoteInArray = (notes, noteToEdit) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === noteToEdit.id; 
	});
	var newArr = notes.slice(0);
	newArr[idx].name = noteToEdit.name;
	newArr[idx].content = noteToEdit.content;
	return newArr;
}

const editNoteName = (notes, id, newName) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === id; 
	});
	var newArr = notes.slice(0);
	newArr[idx].name = newName;
	return newArr;
}

const editNoteContent = (notes, id, newContent) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === id; 
	});
	var newArr = notes.slice(0);
	newArr[idx].content = newContent;
	return newArr;
}

const notes = (state = [], action) => {
	switch (action.type) {
		case 'ADD_NOTE':
			return addNewNote(state, action);
		case 'DELETE_NOTE':
			return removeNoteFromArray(state, action.id);
		case 'SELECT_NOTE':
			return selectNote(state, action.id);
		case 'EDIT_NOTE':
			return editNoteInArray(state, action.note);
		case 'EDIT_NOTE_NAME':
			return editNoteName(state, action.id, action.value);
		case 'EDIT_NOTE_CONTENT':
			return editNoteContent(state, action.id, action.value);
		default:
			return state;
	}
}

export default notes;
