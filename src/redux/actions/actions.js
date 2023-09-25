import axios from "axios";
import {
	DELETE_DISH,
	DELETE_FAMILY,
	DELETE_ORDER,
	FILTER_BY_FAMILY_NAME,
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
	ORDER_BY_PRICE,
	ORDER_BY_RATING,
	POST_DISH,
	POST_FAMILY,
	POST_ORDER,
	POST_USER,
	PUT_DELETED_DISH,
	PUT_DISH,
	PUT_FAMILY,
	PUT_NEW_PASSWORD,
	PUT_ORDER_STATUS,
	PUT_USER_ROLE,
	DISABLE_USER,
	SAVED_URL,
	UPDATE_FAMILIES,
	USER_LOGGED,
  GET_DISH_COMMENTS,
} from "../actions/types";

// / / / / / / / / GETS / / / / / / / / / //

export const getMenu = () => {
	return async (dispatch) => {
		const apiUrl = "https://resto-p4fa.onrender.com/product";
		const queryParams = {
			params: {
				deleted: false,
			},
		};

		try {
			const response = await axios(apiUrl, queryParams);
			const menu = response.data;

			return dispatch({ type: GET_MENU, payload: menu });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

//---------- Este get no lo utilizaremos de momento -----------//
export const getDish = (name) => {
	return async (dispatch) => {
		const apiUrl = `https://resto-p4fa.onrender.com/product?name=${name}`;
		const queryParams = {
			params: {
				deleted: false,
			},
		};
		try {
			const response = await axios(apiUrl, queryParams);
			const dish = response.data;
			return dispatch({ type: GET_DISH, payload: dish });
		} catch (error) {
			console.error("Error al realizar la solcitud:", error);
		}
	};
};
export const getDishById = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl);
			const dish = response.data;
			return dispatch({ type: GET_DISH_BY_ID, payload: dish });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};
//-------------------------------------------------------------//

export const getFamilies = () => {
	return async (dispatch) => {
		const apiUrl = "https://resto-p4fa.onrender.com/productclass";
		try {
			const response = await axios(apiUrl);
			const families = response.data;
			return dispatch({ type: GET_FAMILIES, payload: families });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const getAllUsers = () => {
	const apiUrl = "https://resto-p4fa.onrender.com/users";
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl);
			const users = response.data;
			return dispatch({ type: GET_ALL_USERS, payload: users });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const getCustomers = () => {
	const apiUrl = "https://resto-p4fa.onrender.com/users/clients";
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl);
			const clients = response.data;
			return dispatch({ type: GET_CUSTOMERS, payload: clients });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const getManagers = () => {
	const apiUrl = "https://resto-p4fa.onrender.com/users/admins";
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl);
			const managers = response.data;
			return dispatch({ type: GET_MANAGERS, payload: managers });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const getOrderByUserId = (id) => {
  console.log(id);
  const apiUrl = `https://resto-p4fa.onrender.com/order?userId=${id}`;
  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const orderByEmail = response.data;
      return dispatch({ type: GET_ORDER_BY_USER_ID, payload: orderByEmail });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const getOrderById = (id) => {
  console.log(id);
  const apiUrl = `https://resto-p4fa.onrender.com/order/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const orderByEmail = response.data;
      return dispatch({ type: GET_ORDER_BY_ID, payload: orderByEmail });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      dispatch({ type: GET_ORDER_BY_ID, payload: {} });
    }
  };
};
export const getOrdersToKitchen = () => {
  const apiUrl = `https://resto-p4fa.onrender.com/order`;
  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const allOrders = response.data;
      const ongoingOrders = allOrders.filter(
        (item) => item.status === "ongoing"
      );
      const delayedOrders = allOrders.filter(
        (item) => item.status === "delayed"
      );
      return dispatch({
        type: GET_ORDERS_TO_KITCHEN,
        payload: [ongoingOrders, delayedOrders],
      });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const getAllOrders = () => {
  const apiUrl = "https://resto-p4fa.onrender.com/order";

  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const allOrders = response.data;
      return dispatch({ type: GET_ALL_ORDERS, payload: allOrders });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const getDishComments = (id) => {
  const apiUrl = `https://resto-p4fa.onrender.com/qualification/${id}`;

  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const comments = response.data;
      return dispatch({ type: GET_DISH_COMMENTS, payload: comments });
    } catch (error) {
      console.error("Error al realizar la solcitud:", error);
    }
  };
};

// / / / / / / / / POSTS / / / / / / / / / //

export const addDish = (data) => {
	const apiUrl = "https://resto-p4fa.onrender.com/product";
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data);
			const newDish = response.data;
			return dispatch({ type: POST_DISH, payload: newDish });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const addFamily = (data) => {
	const apiUrl = "https://resto-p4fa.onrender.com/productclass";
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data);
			const newFamily = response.data;
			return dispatch({ type: POST_FAMILY, payload: newFamily });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const addOrder = (data) => {
	const apiUrl = "https://resto-p4fa.onrender.com/order";
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data);
			const newOrder = response.data;
			return dispatch({ type: POST_ORDER, payload: newOrder });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const addUser = (data) => {
	const apiUrl = "https://resto-p4fa.onrender.com/users/create";
	return async (dispatch) => {
		try {
			const response = await axios.post(apiUrl, data);
			const newUser = response.data;
			return dispatch({ type: POST_USER, payload: newUser });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const addUserLogged = (user) => {
  return (dispatch) => {
    dispatch({
      type: USER_LOGGED,
      payload: {
        id: user.uid,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  };
};

export const addUrl = (location) => {
  return (dispatch) => {
    dispatch({
      type: SAVED_URL,
      payload: location,
    });
  };
};

// / / / / / / / / PUTS / / / / / / / / / //

export const updateDish = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data);
			const updatedDish = response.data;
			return dispatch({ type: PUT_DISH, payload: updatedDish });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const passwordChange = (user) => {
	const apiUrl = "https://resto-p4fa.onrender.com/users/put";
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, {
				email: user.email,
			});
			dispatch({
				type: PUT_NEW_PASSWORD,
				payload: response.data,
			});
		} catch (error) {
			console.error("Error al realizar la solicitud", error);
		}
	};
};

export const updateFamily = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/productclass/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data);
			const updatedFamily = response.data;
			return dispatch({ type: PUT_FAMILY, payload: updatedFamily });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const updateOrderStatus = (id, status) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order/status/${id}`;
	console.log(id);
	console.log(status);
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, { status });
			const updatedOrderStatus = response.data;
			console.log(response);
			return dispatch({ type: PUT_ORDER_STATUS, payload: updatedOrderStatus });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};
export const updatePaymentStatus = (id) => {
  const apiUrl = `https://resto-p4fa.onrender.com/order/paying/${id}`;
  console.log(id);
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl);
      const updatedPaymentStatus = response.data;
      console.log(response);
      return dispatch({
        type: PUT_ORDER_STATUS,
        payload: updatedPaymentStatus,
      });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const updateDeletedDish = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
	const queryParams = {
		params: {
			deleted: false,
		},
	};
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, queryParams);
			const updatedDish = response.data;
			return dispatch({ type: PUT_DELETED_DISH, paylod: updatedDish });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const updateUserRole = (id, data) => {
	const apiUrl = `https://resto-p4fa.onrender.com/users/update`;
	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data);
			const updatedUserRole = response.data;
			// console.log('Respuesta de la API:', updatedUserRole)
			return dispatch({ type: PUT_USER_ROLE, payload: updatedUserRole });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const updateDisableUser = (userLoggedId, userId, checked) => {
	const apiUrl = `https://resto-p4fa.onrender.com/users/disableUser/${userId}`;
	const data = { adminId: userLoggedId, disable: checked };

	return async (dispatch) => {
		try {
			const response = await axios.put(apiUrl, data);
			const updatedDisableUser = response.data;
			dispatch({ type: DISABLE_USER, payload: updatedDisableUser });
		} catch (error) {
			console.error("Error al inhabilitar el usuario:", error);
		}
	};
};

export const updateFamilies = (newFamilies) => {
  const apiUrl = "https://resto-p4fa.onrender.com/productClass/put";
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl, newFamilies);
      const updateFamilies = response.data;
      dispatch({
        type: UPDATE_FAMILIES,
        payload: updateFamilies,
      });
    } catch (error) {
      console.error("Error al actualizar familias:", error);
    }
  };
};

// / / / / / / / / DELETES / / / / / / / / / //

export const deleteDish = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl);
			const deletedDish = response.data;
			return dispatch({ type: DELETE_DISH, paylod: deletedDish });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const deleteFamily = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/productclass/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl);
			const deletedFamily = response.data;
			return dispatch({ type: DELETE_FAMILY, payload: deletedFamily });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const deleteOrder = (id) => {
	const apiUrl = `https://resto-p4fa.onrender.com/order/${id}`;
	return async (dispatch) => {
		try {
			const response = await axios.delete(apiUrl);
			const deletedOrder = response.data;
			return dispatch({ type: DELETE_ORDER, payload: deletedOrder });
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

// / / / / / / / / FILTERS & ORDERING / / / / / / / / / //

export const filterByFamily = (name) => {
	const apiUrl = `https://resto-p4fa.onrender.com/product/filter?className=${name}`;
	return async (dispatch) => {
		try {
			const response = await axios(apiUrl);
			const filteredByFamily = response.data;
			return dispatch({
				type: FILTER_BY_FAMILY_NAME,
				payload: filteredByFamily,
			});
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	};
};

export const orderByRating = (data) => {
  return { type: ORDER_BY_RATING, payload: data };
};

export const orderByPrice = (data) => {
  return { type: ORDER_BY_PRICE, payload: data };
};

export const logged = (data) => {
  return { type: LOGGED, payload: data };
};

export const filterByRating = (number) => {
  console.log("weon filtro por", number);
  return { type: FILTER_BY_RATING, payload: number };
};

export const filterOrdersByStatus = (status) => {
  const apiUrl = `https://resto-p4fa.onrender.com/order?status=${status}`;
  return async (dispatch) => {
    try {
      const response = await axios(apiUrl);
      const filteredOrders = response.data;
      return dispatch({
        type: FILTER_BY_ORDER_STATUS,
        payload: filteredOrders,
      });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};
