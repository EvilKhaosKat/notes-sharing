const removeNoteFromArray = (notes, noteIdToRemove) => {
	var idx = notes.findIndex(function (obj) { 
		return obj.id === noteIdToRemove; 
	});
	return notes
		.slice(0, idx)
		.concat(notes.slice(idx + 1));
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
		default:
			return state;
	}
}

export default notes;
