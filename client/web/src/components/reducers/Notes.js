const removeNoteFromArray = (notes, noteIdToRemove) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === noteIdToRemove; 
	});
	return notes
		.slice(0, idx)
		.concat(notes.slice(idx + 1));
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

const noteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_NOTE':
			return {
				id: action.id,
				name: action.name,
				content: action.content
			};
		default:
			return state;
	}
}

const notes = (state = [], action) => {
	switch (action.type) {
		case 'ADD_NOTE':
			return [
				...state,
				noteReducer(state, action)
			];
		case 'DELETE_NOTE':
			return removeNoteFromArray(state, action.id);
		case 'EDIT_NOTE':
			return editNoteInArray(state, action.note);
		default:
			return state;
	}
}

export default notes;
