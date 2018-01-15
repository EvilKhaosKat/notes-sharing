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
		default:
			return state;
	}
}

export default notes;
