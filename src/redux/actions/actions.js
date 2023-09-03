import axios from 'axios'
import { GET_ALL_POKEMONS } from '../actions/types'

export const getAllPokemons = () => {
	return async (dispatch) => {
		const endpoint = 'http://localhost:3001/pokemons/'
		try {
			const response = await axios(endpoint)
			const pokemons = response.data
			dispatch({ type: GET_ALL_POKEMONS, payload: pokemons })
		} catch (error) {
			console.log(error)
		}
	}
}
