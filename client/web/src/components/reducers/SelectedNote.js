const selectedNote = (state = {}, action) => {
	switch (action.type) {
		case 'SELECT_NOTE':
			return {
				id: action.id,
				name: action.name,
				content: action.content
			};
		default:
			return state;
	}
}

export default selectedNote;