import axios from "axios";
import { GET_DISH, GET_FAMILIES, GET_MENU } from "../actions/types";

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
      //console.log("Respuesta de la API:", menu);
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
