import {
	GET_MENU,
	GET_FAMILIES,
	GET_DISH,
	POST_DISH,
	POST_FAMILY,
	POST_ORDER,
	PUT_DELETED_DISH,
	PUT_DISH,
	PUT_ORDER_PAYMENT,
	PUT_ORDER_STATUS,
	DELETE_ORDER,
	DELETE_DISH,
	DELETE_FAMILY,
	//   FILTER_BY_DELETED_DISH,
	//   FILTER_BY_DISH_NAME,
	//   FILTER_BY_DISPONIBILITY,
	//   FILTER_BY_ORDER_STATUS,
	//   FILTER_BY_PAYMENT_STATUS,
	ORDER_BY_PRICE,
	ORDER_BY_RATING,
	//   FILTER_BY_STOCK,
	//   FILTER_ORDER_BY_USER,
	PUT_FAMILY,
	GET_ALL_USERS,
	GET_CUSTOMERS,
	GET_MANAGERS,
	GET_USER_BY_ID,
	POST_USER,
	POST_BASKET,
	PUT_USER_ROLE,
	FILTER_BY_FAMILY_NAME,
	GET_DISH_BY_ID,
	LOGGED,
	USER_LOGGED,
} from '../actions/types'

const initialState = {
	master: [],
	filteredMaster: [],
	families: [],
	filteredFamilies: [],
	orders: [],
	basket: [],
	dishes: [],
	filteredDishes: [],
	foundDishes: [],
	users: [],
	filteredUsers: [],
	customers: [],
	managers: [],
	rol: 'customer',
	detail: {},
	logged: false,
	userLogged:[]
}

const rootReducer = (state = initialState, { type, payload }) => {
	let orderedByRating = []
	let orderedByPrice = []

	switch (type) {
		case GET_MENU:
			return {
				...state,
				master: payload,
				filteredMaster: payload,
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

		case GET_USER_BY_ID:
			return {
				...state,
				filteredUsers: payload,
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
				orders: payload,
			}

		case POST_USER:
			return {
				...state,
				users: payload,
			}
		// case POST_BASKET:
		// 	// eslint-disable-next-line no-case-declarations
		// 	const cardToAdd = payload;
		// 	// eslint-disable-next-line no-case-declarations
		// 	const existingCard = state.basket.find(
		// 		(card) => card.id === cardToAdd.id
		// 	);

		// 	if (existingCard) {
		// 		// Si ya existe una tarjeta con el mismo ID, actualiza la cantidad y el precio
		// 		const updatedBasket = state.basket.map((card) => {
		// 			if (card.id === cardToAdd.id) {
		// 				return {
		// 					...card,
		// 					quantity: card.quantity + 1,
		// 					totalPrice: card.totalPrice + cardToAdd.price,
		// 				};
		// 			}
		// 			return card;
		// 		});

		// 		return {
		// 			...state,
		// 			basket: updatedBasket,
		// 		};
		// 	} else {
		// 		// Si no existe una tarjeta con el mismo ID, agrégala
		// 		return {
		// 			...state,
		// 			basket: [
		// 				...state.basket,
		// 				{ ...cardToAdd, quantity: 1, totalPrice: cardToAdd.price },
		// 			],
		// 		};
		// 	}

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
				orders: payload,
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

		case FILTER_BY_FAMILY_NAME:
			return {
				...state,
				filteredMaster: payload,
			}

		case ORDER_BY_RATING:
			orderedByRating =
				payload === 'higher'
					? state.filteredMaster.sort(function (a, b) {
							if (a.qualification > b.qualification) {
								return -1
							}
							if (b.qualification > a.qualification) {
								return -1
							}
							return 0
					  })
					: state.filteredMaster.sort(function (a, b) {
							if (a.qualification > b.qualification) {
								return -1
							}
							if (b.qualification > a.qualification) {
								return 1
							}
							return 0
					  })
			return {
				...state,
				filteredMaster: [...orderedByRating],
			}

		case ORDER_BY_PRICE:
			const orderedByPrice = state.filteredMaster.slice() // Copiamos el array para no modificar el estado original
			orderedByPrice.sort(function (a, b) {
				if (payload === 'higher') {
					return a.price - b.price // Orden ascendente
				} else {
					return b.price - a.price // Orden descendente
				}
			})

			return {
				...state,
				filteredMaster: orderedByPrice,
			}

		// case ORDER_BY_PRICE:
		// 	orderedByPrice =
		// 		payload === 'higher'
		// 			? state.filteredMaster.sort(function (a, b) {
		// 					if (a.price > b.price) {
		// 						return -1
		// 					}
		// 					if (b.price > a.price) {
		// 						return -1
		// 					}
		// 					return 0
		// 			  })
		// 			: state.filteredMaster.sort(function (a, b) {
		// 					if (a.price > b.price) {
		// 						return -1
		// 					}
		// 					if (b.price > a.price) {
		// 						return 1
		// 					}
		// 					return 0
		// 			  })
		// 	// console.log('by price', orderedByPrice)
		// 	return {
		// 		...state,
		// 		filteredMaster: [...orderedByPrice],
		// 	}

		case USER_LOGGED:
			return{
				...state,
				userLogged:payload
			}

		default:
			return { ...state }
	}
}

export default rootReducer
