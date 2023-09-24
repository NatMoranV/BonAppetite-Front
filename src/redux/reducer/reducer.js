/* eslint-disable no-case-declarations */

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
	GET_ORDERS_TO_KITCHEN,
	//   FILTER_BY_DELETED_DISH,
	//   FILTER_BY_DISH_NAME,
	//   FILTER_BY_DISPONIBILITY,
	FILTER_BY_ORDER_STATUS,
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
	PUT_USER_ROLE,
	FILTER_BY_FAMILY_NAME,
	GET_DISH_BY_ID,
	LOGGED,
	USER_LOGGED,
	GET_ORDER_BY_USER_ID,
	SAVED_URL,
	GET_ALL_ORDERS,
	UPDATE_FAMILIES,
	FILTER_BY_RATING,
} from "../actions/types";

const initialState = {
	master: [],
	filteredMaster: [],
	families: [],
	filteredFamilies: [],
	orders: [],
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
	rol: "customer",
	detail: {},
	logged: false,
	userLogged: {},
	savedUrl: "/",
	stars: 1,
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_MENU:
			return {
				...state,
				master: payload,
				filteredMaster: payload,
			};

		case GET_DISH:
			return {
				...state,
				foundDishes: payload,
			};

		case LOGGED:
			return {
				...state,
				logged: payload,
			};

		case GET_DISH_BY_ID:
			return {
				...state,
				detail: payload,
			};

		case GET_FAMILIES:
			return {
				...state,
				families: payload,
				filteredFamilies: payload,
			};

		case GET_ALL_USERS:
			return {
				...state,
				users: payload,
				filteredUsers: payload,
			};

		case GET_CUSTOMERS:
			return {
				...state,
				customers: payload,
			};

		case GET_MANAGERS:
			return {
				...state,
				managers: payload,
			};

		case GET_USER_BY_ID:
			return {
				...state,
				filteredUsers: payload,
			};

		case GET_ORDER_BY_USER_ID:
			return {
				...state,
				filteredOrders: payload,
			};

		case GET_ALL_ORDERS:
			return {
				...state,
				allOrdes: payload,
				filteredOrders: payload,
			};

		case GET_ORDERS_TO_KITCHEN:
			return {
				...state,
				kitchenOrders: payload,
				foundedOrders: payload,
			};

		case POST_DISH:
			return {
				...state,
				dishes: payload,
			};

		case POST_FAMILY:
			return {
				// ...state,
				// families: payload
			};

		case POST_ORDER:
			return {
				...state,
				orders: payload,
			};

		case POST_USER:
			return {
				...state,
				users: payload,
			};

		case UPDATE_FAMILIES:
			return {
				...state,
				filteredMaster: payload,
			};

		case PUT_DISH:
			return {
				...state,
				dishes: payload,
			};

		case PUT_FAMILY:
			return {
				...state,
				families: payload,
			};

		case PUT_ORDER_STATUS:
			return {
				...state,
				orders: payload,
			};

		case PUT_ORDER_PAYMENT:
			return {
				...state,
				orders: payload,
			};

		case PUT_DELETED_DISH:
			return {
				// ...state,
				// dishes: payload
			};

		case PUT_USER_ROLE:
			return {
				...state,
				users: payload,
				filteredUsers: payload,
			};

		case DELETE_DISH:
			return {
				// ...state,
				// dishes: payload
			};

		case DELETE_FAMILY:
			return {
				// ...state,
				// families: payload
			};

		case DELETE_ORDER:
			return {
				// ...state,
				// orders: payload
			};

		case FILTER_BY_ORDER_STATUS:
			return {
				...state,
				filteredOrders: payload,
			};

		case FILTER_BY_FAMILY_NAME:
			return {
				...state,
				filteredMaster: payload,
			};
		case FILTER_BY_RATING:
			console.log("stars 1", state.stars);
			const minQualification = payload;
			if (minQualification > state.stars) {
				const filteredByQualification = state.filteredMaster.filter(
					(item) => item.qualification >= minQualification
				);
				return {
					...state,
					stars: minQualification,
					filteredMaster: filteredByQualification,
				};
			} else {
				const masterCopy = state.master;
				const filteredByQualification = masterCopy.filter(
					(item) => item.qualification >= minQualification
				);
				return {
					...state,
					stars: minQualification,
					filteredMaster: filteredByQualification,
				};
			}

		case ORDER_BY_RATING:
			const ascending = payload !== "higher" ? 1 : -1;
			const descending = -ascending;

			const orderedByRating = [...state.filteredMaster].sort((a, b) =>
				a.qualification > b.qualification
					? descending
					: a.qualification < b.qualification
					? ascending
					: 0
			);

			return {
				...state,
				filteredMaster: orderedByRating,
			};

		case ORDER_BY_PRICE:
			const orderedByPrice = state.filteredMaster.slice();
			orderedByPrice.sort(function (a, b) {
				if (payload === "higher") {
					return a.price - b.price;
				} else {
					return b.price - a.price;
				}
			});

			return {
				...state,
				filteredMaster: orderedByPrice,
			};

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
			return {
				...state,
				userLogged: payload,
			};

		case SAVED_URL:
			return {
				...state,
				savedUrl: payload,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
