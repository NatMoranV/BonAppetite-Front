import { GET_MENU } from '../actions/types'

const initialState = {
	master: [],
	rol: 'customer',
	detail: {},
}

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_MENU:
			return {
				...state,
				master: payload,
			}

		default:
			return { ...state }
	}
}

export default rootReducer
