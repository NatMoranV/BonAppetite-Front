import axios from "axios";
import {
  GET_DISH,
  GET_FAMILIES,
  GET_MENU,
  POST_DISH,
  POST_FAMILY,
  POST_ORDER,
  PUT_DISH,
  PUT_ORDER_STATUS,
} from "../actions/types";

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
      dispatch({ type: GET_MENU, payload: menu });
      console.log("Respuesta de la API:", menu);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

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
      dispatch({ type: GET_DISH, payload: dish });
      console.log("Respuesta de la API:", dish);
    } catch (error) {
      console.error("Error al realizar la solcitud:", error);
    }
  };
};

export const getFamilies = () => {
  return async (dispatch) => {
    const apiUrl = "https://resto-p4fa.onrender.com/productclass";
    try {
      const response = await axios(apiUrl);
      const families = response.data;
      dispatch({ type: GET_FAMILIES, payload: families });
      console.log("Respuesta de la API:", families);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const addDish = (data) => {
  const apiUrl = "https://resto-p4fa.onrender.com/product";
  return async (dispatch) => {
    try {
      const response = await axios.post(apiUrl, data);
      const dish = response.data;
      dispatch({ type: POST_DISH, payload: dish });
      console.log("Respuesta de la API:", dish);
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
      dispatch({ type: POST_FAMILY, payload: family });
      console.log("Respuesta de la API:", family);
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
      dispatch({ type: POST_ORDER, payload: order });
      console.log("Respuesta de la API:", order);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};

export const updateDish = (id, data) => {
  const apiUrl = `https://resto-p4fa.onrender.com/product/${id}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(apiUrl, data);
      const updatedDish = response.data;
      dispatch({ type: PUT_DISH, payload: updatedDish });
      console.log("Respuesta de la API:", updatedDish);
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
      dispatch({ type: PUT_ORDER_STATUS, payload: updatedOrderStatus });
      console.log("Respuesta de la API:", updatedOrderStatus);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
};


