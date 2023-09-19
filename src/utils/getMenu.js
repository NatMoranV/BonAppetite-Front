import axios from "axios";
import translateMenuFromApi from "./translateMenuFromApi";
export const getMenu = async () => {
  const apiUrl = "https://resto-p4fa.onrender.com/product";
  const queryParams = {
    params: {
      deleted: false,
    },
  };
  try {
    const response = await axios(apiUrl, queryParams);
    const menu = response.data;
    return translateMenuFromApi(menu);
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
  }
};
