import { menu } from '../../assets/mockedMenu'
import { GET_MENU } from '../actions/types'

export const getMenu = () => {
	return async (dispatch) => {
		const fullMenu = menu
		try {
			dispatch({ type: GET_MENU, payload: fullMenu })
		} catch (error) {
			console.log(error)
		}
	}
}
