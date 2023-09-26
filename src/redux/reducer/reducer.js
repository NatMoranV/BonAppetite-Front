/* eslint-disable no-case-declarations */

import {
	DELETE_DISH,
	DELETE_FAMILY,
	DELETE_ORDER,
	FILTER_BY_FAMILY_NAME,
	//   FILTER_BY_DELETED_DISH,
	//   FILTER_BY_DISH_NAME,
	//   FILTER_BY_DISPONIBILITY,
	FILTER_BY_ORDER_STATUS,
	FILTER_BY_RATING,
	GET_ALL_ORDERS,
	GET_ALL_USERS,
	GET_CUSTOMERS,
	GET_DISH,
	GET_DISH_BY_ID,
	GET_FAMILIES,
	GET_MANAGERS,
	GET_MENU,
	GET_ORDERS_TO_KITCHEN,
	GET_ORDER_BY_ID,
	GET_ORDER_BY_USER_ID,
	LOGGED,
	//   FILTER_BY_PAYMENT_STATUS,
	ORDER_BY_PRICE,
	ORDER_BY_RATING,
	POST_DISH,
	POST_FAMILY,
	POST_ORDER,
	POST_USER,
	PUT_DELETED_DISH,
	PUT_DISH,
	//   FILTER_BY_STOCK,
	//   FILTER_ORDER_BY_USER,
	PUT_FAMILY,
	PUT_ORDER_PAYMENT,
	PUT_ORDER_STATUS,
	PUT_USER_ROLE,
	SAVED_URL,
	UPDATE_FAMILIES,
	USER_LOGGED,
	DISABLE_USER,
	GET_DISH_COMMENTS,
  EVENT_ADD,
} from '../actions/types'

const initialState = {
	master: [],
	filteredMaster: [],
	filteredCopy: [],
	families: [],
	filteredFamilies: [],
	updatedOrder: [],
	allOrders: [],
	filteredOrders: [],
	foundedOrders: [],
	kitchenOrders: [],
	dishes: [],
	filteredDishes: [],
	foundDishes: [],
	users: [],
	filteredUsers: [],
	customers: [],
	managers: [],
	detail: {},
	logged: false,
	userLogged: {},
	savedUrl: '/',
	stars: 1,
  eventAdd: true,
}

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_MENU:
			return {
				...state,
				master: payload,
				filteredMaster: payload,
				filteredCopy: payload,
			}

		case GET_DISH:
			return {
				...state,
				foundDishes: payload,
			}

		case LOGGED:
			return {
				...state,
				logged: payload,
			}

		case GET_DISH_BY_ID:
			return {
				...state,
				detail: payload,
			}

		case GET_FAMILIES:
			return {
				...state,
				families: payload,
				filteredFamilies: payload,
			}

		case GET_ALL_USERS:
			return {
				...state,
				users: payload,
				filteredUsers: payload,
			}

		case GET_CUSTOMERS:
			return {
				...state,
				customers: payload,
			}

		case GET_MANAGERS:
			return {
				...state,
				managers: payload,
			}

		case GET_ORDER_BY_ID:
			return {
				...state,
				filteredOrders: [payload],
			}

		case GET_ORDER_BY_USER_ID:
			return {
				...state,
				foundedOrders: payload,
			}

		case GET_ALL_ORDERS:
			return {
				...state,
				allOrders: payload,
				filteredOrders: payload,
			}

		case GET_ORDERS_TO_KITCHEN:
			return {
				...state,
				kitchenOrders: payload,
				foundedOrders: payload,
			}

		case POST_DISH:
			return {
				...state,
				dishes: payload,
			}

		case POST_FAMILY:
			return {
				// ...state,
				// families: payload
			}

		case POST_ORDER:
			return {
				...state,
				allOrders: [...state.allOrders, payload],
			}

		case POST_USER:
			return {
				...state,
				users: payload,
			}

		case UPDATE_FAMILIES:
			return {
				...state,
				filteredMaster: payload,
				filteredCopy: payload,
			}

		case PUT_DISH:
			return {
				...state,
				dishes: payload,
			}

		case PUT_FAMILY:
			return {
				...state,
				families: payload,
			}

		case PUT_ORDER_STATUS:
			return {
				...state,
				updatedOrder: payload,
			}

		case PUT_ORDER_PAYMENT:
			return {
				...state,
				orders: payload,
			}

		case PUT_DELETED_DISH:
			return {
				// ...state,
				// dishes: payload
			}

		case PUT_USER_ROLE:
			return {
				...state,
				users: payload,
				filteredUsers: payload,
			}

		case DISABLE_USER:
			const userIdToDisable = payload.userId

			const updatedUsers = state.users.map((user) => {
				if (user.id === userIdToDisable) {
					return {
						...user,
						disable: true,
					}
				}
				return user
			})

			const updatedFilteredUsers = state.filteredUsers.map((user) => {
				if (user.id === userIdToDisable) {
					return {
						...user,
						disable: true,
					}
				}
				return user
			})

			return {
				...state,
				users: updatedUsers,
				filteredUsers: updatedFilteredUsers,
			}

		case DELETE_DISH:
			return {
				// ...state,
				// dishes: payload
			}

		case DELETE_FAMILY:
			return {
				// ...state,
				// families: payload
			}

		case DELETE_ORDER:
			return {
				// ...state,
				// orders: payload
			}

		case FILTER_BY_ORDER_STATUS:
			return {
				...state,
				filteredOrders: payload,
			}

		case FILTER_BY_FAMILY_NAME:
			return {
				...state,
				filteredMaster: payload,
				filteredCopy: payload,
			}
		case FILTER_BY_RATING:
			const copyForRating = [...state.filteredCopy]
			const filteredByRating = copyForRating.filter((item) => item.qualification === payload)
			console.log('copy', state.filteredCopy)
			console.log('filtered', state.filteredMaster)
			console.log('master', state.master)
			return {
				...state,
				filteredMaster: filteredByRating,
			}

		case ORDER_BY_RATING:
			const ascending = payload !== 'higher' ? 1 : -1
			const descending = -ascending

			const orderedByRating = [...state.filteredMaster].sort((a, b) =>
				a.qualification > b.qualification ? descending : a.qualification < b.qualification ? ascending : 0
			)

			return {
				...state,
				filteredMaster: orderedByRating,
			}

		case ORDER_BY_PRICE:
			const orderedByPrice = state.filteredMaster.slice()
			orderedByPrice.sort(function (a, b) {
				if (payload === 'higher') {
					return a.price - b.price
				} else {
					return b.price - a.price
				}
			})

			return {
				...state,
				filteredMaster: orderedByPrice,
			}

		case USER_LOGGED:
			return {
				...state,
				userLogged: payload,
			}

		case SAVED_URL:
			return {
				...state,
				savedUrl: payload,
			}

		case GET_DISH_COMMENTS:
			return {
				...state,
				dishComments: payload,
			}
    case EVENT_ADD:
			return {
				...state,
				eventAdd: payload,
			}

		default:
			return { ...state }
	}
}

export default rootReducer
