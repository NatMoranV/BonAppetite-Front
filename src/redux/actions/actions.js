import axios from 'axios'
import { GET_MENU } from '../actions/types'

export const getMenu = () => {
	return async (dispatch) => {
		const apiUrl = 'https://resto-p4fa.onrender.com/product'
		const queryParams = {
			params: {
				deleted: false,
			},
		}

		try {
			const response = await axios(apiUrl, queryParams)
			dispatch({ type: GET_MENU, payload: response })
			console.log('Respuesta de la API:', response.data)
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}
