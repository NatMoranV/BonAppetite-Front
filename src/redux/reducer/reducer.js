import { GET_ALL_POKEMONS } from '../actions/types'

const initialState = {
	master: [],
	pokemons: [],
	pokemonsDb: [],
	detail: {},
	types: [],
	filtered: [],
}

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				pokemons: payload,
				master: payload,
			}

		default:
			return { ...state }
	}
}

export default rootReducer
