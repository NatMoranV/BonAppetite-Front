import axios from 'axios'
import {
	DELETE_DISH,
	DELETE_FAMILY,
	DELETE_ORDER,
	FILTER_BY_FAMILY_NAME,
	GET_ALL_USERS,
	GET_CUSTOMERS,
	GET_DISH,
	GET_DISH_BY_ID,
	GET_FAMILIES,
	GET_MANAGERS,
	GET_MENU,
	GET_USER_BY_ID,
	GET_ORDERS_TO_KITCHEN,
	ORDER_BY_PRICE,
	ORDER_BY_RATING,
	POST_DISH,
	POST_FAMILY,
	POST_ORDER,
	POST_USER,
	PUT_DELETED_DISH,
	PUT_DISH,
	PUT_FAMILY,
	PUT_ORDER_STATUS,
	PUT_USER_ROLE,
	FILTER_BY_RATING,
	LOGGED,
	USER_LOGGED,
	GET_ORDER_BY_USER_ID,
	FILTER_BY_ORDER_STATUS,
	SAVED_URL,
} from '../actions/types'

// / / / / / / / / GETS / / / / / / / / / //

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
			const menu = response.data

			// console.log('Respuesta de la API:', menu)
			return dispatch({ type: GET_MENU, payload: menu })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

//---------- Este get no lo utilizaremos de momento -----------//
export const getDish = (name) => {
	return async (dispatch) => {
		const apiUrl = `https://resto-p4fa.onrender.com/product?name=${name}`
		const queryParams = {
			params: {
				deleted: false,
			},
		}
		try {
			const response = await axios(apiUrl, queryParams)
			const dish = response.data
			// console.log('Respuesta de la API:', dish)
			return dispatch({ type: GET_DISH, payload: dish })
		} catch (error) {
			console.error('Error al realizar la solcitud:', error)
		}
	}
}
export const getDishById = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const dish = response.data
			// console.log('Respuesta de la API:', dish)
			return dispatch({ type: GET_DISH_BY_ID, payload: dish })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}
//-------------------------------------------------------------//

export const getFamilies = () => {
	return async (dispatch) => {
		const apiUrl = 'https://resto-p4fa.onrender.com/productclass'
		try {
			const response = await axios(apiUrl)
			const families = response.data
			// console.log('Respuesta de la API:', families)
			return dispatch({ type: GET_FAMILIES, payload: families })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const getAllUsers = () => {
	const apiUrl = 'https://resto-p4fa.onrender.com/users'
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const users = response.data
			// console.log('Respuesta de la API:', users)
			return dispatch({ type: GET_ALL_USERS, payload: users })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const getUserById = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/users/${id}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const user = response.data
			// console.log('Respuesta de la API:', user)
			return dispatch({ type: GET_USER_BY_ID, payload: user })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const getCustomers = () => {
	const apiUrl = 'https://resto-p4fa.onrender.com/users/clients'
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const clients = response.data
			// console.log('Respuesta de la API:', clients)
			return dispatch({ type: GET_CUSTOMERS, payload: clients })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const getManagers = () => {
	const apiUrl = 'https://resto-p4fa.onrender.com/users/admins'
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const managers = response.data
			// console.log('Respuesta de la API:', managers)
			return dispatch({ type: GET_MANAGERS, payload: managers })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const getOrderById = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order?userId=${id}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const orderByEmail = response.data
			return dispatch({ type: GET_ORDER_BY_USER_ID, payload: orderByEmail })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}
export const getOrdersToKitchen = () => {
	const apiUrl = `https://resto-p4fa.onrender.com/order`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const allOrders = response.data
			const ongoingOrders = allOrders.filter((item) => item.status === 'ongoing')
			const delayedOrders = allOrders.filter((item) => item.status === 'delayed')
			return dispatch({ type: GET_ORDERS_TO_KITCHEN, payload: [ongoingOrders, delayedOrders] })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

// / / / / / / / / POSTS / / / / / / / / / //

export const addDish = (data) => {
	const apiUrl = 'https://resto-p4fa.onrender.com/product'
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data)
			const newDish = response.data
			// console.log('Respuesta de la API:', newDish)
			return dispatch({ type: POST_DISH, payload: newDish })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const addFamily = (data) => {
	const apiUrl = 'https://resto-p4fa.onrender.com/productclass'
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data)
			const newFamily = response.data
			// console.log('Respuesta de la API:', newFamily)
			return dispatch({ type: POST_FAMILY, payload: newFamily })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const addOrder = (data) => {
	const apiUrl = 'https://resto-p4fa.onrender.com/order'
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data)
			const newOrder = response.data
			// console.log('Respuesta de la API:', newOrder)
			return dispatch({ type: POST_ORDER, payload: newOrder })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const addUser = (data) => {
	const apiUrl = 'https://resto-p4fa.onrender.com/users/create'
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data)
			const newUser = response.data
			// console.log('Respuesta de la API:', newUser)
			return dispatch({ type: POST_USER, payload: newUser })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const addUserLogged = (user) => {
	return (dispatch) => {
		dispatch({
			type: USER_LOGGED,
			payload: { id: user.uid, email: user.email, role: user.role, name: user.name },
		})
	}
}

export const addUrl = (location) => {
	return (dispatch) => {
		dispatch({
			type: SAVED_URL,
			payload: location,
		})
	}
}

// / / / / / / / / PUTS / / / / / / / / / //

export const updateDish = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data)
			const updatedDish = response.data
			// console.log('Respuesta de la API:', updatedDish)
			return dispatch({ type: PUT_DISH, payload: updatedDish })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const updateFamily = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/productclass/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data)
			const updatedFamily = response.data
			// console.log('Respuesta de la API:', updatedFamily)
			return dispatch({ type: PUT_FAMILY, payload: updatedFamily })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const updateOrderStatus = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order/status/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data)
			const updatedOrderStatus = response.data
			// console.log('Respuesta de la API:', updatedOrderStatus)
			return dispatch({ type: PUT_ORDER_STATUS, payload: updatedOrderStatus })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const updateDeletedDish = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`
	const queryParams = {
		params: {
			deleted: false,
		},
	}
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, queryParams)
			const updatedDish = response.data
			// console.log('Respuesta de la API:', updatedDish)
			return dispatch({ type: PUT_DELETED_DISH, paylod: updatedDish })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const updateUserRole = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/users/update/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data)
			const updatedUserRole = response.data
			// console.log('Respuesta de la API:', updatedUserRole)
			return dispatch({ type: PUT_USER_ROLE, payload: updatedUserRole })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

// / / / / / / / / DELETES / / / / / / / / / //

export const deleteDish = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl)
			const deletedDish = response.data
			// console.log('Respuesta de la API:', deleteDish)
			return dispatch({ type: DELETE_DISH, paylod: deletedDish })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const deleteFamily = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/productclass/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl)
			const deletedFamily = response.data
			// console.log('Respuesta de la API:', deletedFamily)
			return dispatch({ type: DELETE_FAMILY, payload: deletedFamily })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const deleteOrder = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order/${id}`
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl)
			const deletedOrder = response.data
			// console.log('Respuesta de la API:', deletedOrder)
			return dispatch({ type: DELETE_ORDER, payload: deletedOrder })
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

// / / / / / / / / FILTERS & ORDERING / / / / / / / / / //

export const filterByFamily = (name) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/filter?className=${name}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const filteredByFamily = response.data
			// console.log('Respuesta de la API:', filteredByFamily)
			return dispatch({
				type: FILTER_BY_FAMILY_NAME,
				payload: filteredByFamily,
			})
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const orderByRating = (data) => {
	return { type: ORDER_BY_RATING, payload: data }
}

export const orderByPrice = (data) => {
	// console.log('order by  price')
	return { type: ORDER_BY_PRICE, payload: data }
}

export const logged = (data) => {
	return { type: LOGGED, payload: data }
}

export const filterByRating = (number) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/filter?qualification=${number}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const dishesByRating = response.data
			// console.log('Respuesta de la API dishesByStars :', dishesByRating)
			return dispatch({
				type: FILTER_BY_RATING,
				payload: dishesByRating,
			})
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}

export const filterOrdersByStatus = (status) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order?status=${status}`
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl)
			const filteredOrders = response.data
			return dispatch({
				type: FILTER_BY_ORDER_STATUS,
				payload: filteredOrders,
			})
		} catch (error) {
			console.error('Error al realizar la solicitud:', error)
		}
	}
}
