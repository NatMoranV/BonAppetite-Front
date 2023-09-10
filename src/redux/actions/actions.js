import axios from "axios";
import {
  DELETE_DISH,
  DELETE_FAMILY,
  DELETE_ORDER,
  GET_DISH,
  GET_FAMILIES,
  GET_MENU,
  POST_DISH,
  POST_FAMILY,
  POST_ORDER,
  PUT_DELETED_DISH,
  PUT_DISH,
  PUT_FAMILY,
  PUT_ORDER_STATUS,
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

      console.log("Respuesta de la API:", menu);
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
      console.log("Respuesta de la API:", dish);
      return dispatch({ type: GET_DISH, payload: dish });
    } catch (error) {
      console.error("Error al realizar la solcitud:", error);
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
      console.log("Respuesta de la API:", families);
      return dispatch({ type: GET_FAMILIES, payload: families });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

// / / / / / / / / POSTS / / / / / / / / / //

export const addDish = (data) => {
  const apiUrl = "https://resto-p4fa.onrender.com/product";
  return async (dispatch) => {
    try {
      const response = await axios.post(apiUrl, data);
      const dish = response.data;
      console.log("Respuesta de la API:", dish);
      return dispatch({ type: POST_DISH, payload: dish });
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
      const family = response.data;
      console.log("Respuesta de la API:", family);
      return dispatch({ type: POST_FAMILY, payload: family });
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
      const order = response.data;
      console.log("Respuesta de la API:", order);
      return dispatch({ type: POST_ORDER, payload: order });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

// / / / / / / / / PUTS / / / / / / / / / //

export const updateDish = (id, data) => {
  const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl, data);
      const updatedDish = response.data;
      console.log("Respuesta de la API:", updatedDish);
      return dispatch({ type: PUT_DISH, payload: updatedDish });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const updateFamily = (id, data) => {
  const apiUrl = `https://resto-p4fa.onrender.com/productclass/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl, data);
      const updatedFamily = response.data;
      console.log("Respuesta de la API:", updatedFamily);
      return dispatch({ type: PUT_FAMILY, payload: updatedFamily });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const updateOrderStatus = (id, data) => {
  const apiUrl = `https://resto-p4fa.onrender.com/order/status/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl, data);
      const updatedOrderStatus = response.data;
      console.log("Respuesta de la API:", updatedOrderStatus);
      return dispatch({ type: PUT_ORDER_STATUS, payload: updatedOrderStatus });
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
      console.log("Respuesta de la API:", updatedDish);
      return dispatch({ type: PUT_DELETED_DISH, paylod: updatedDish });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
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
      console.log("Respuesta de la API:", deleteDish);
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
      console.log("Respuesta de la API:", deletedFamily);
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
      console.log("Respuesta de la API:", deletedOrder);
      return dispatch({ type: DELETE_ORDER, payload: deletedOrder });
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};
