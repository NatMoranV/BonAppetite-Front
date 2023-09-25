import axios from "axios";
export const toggleProductOrProductClassStatus = async ({
  id,
  isEnabled,
  type,
}) => {
  const options = {
    PRODUCT: async () => {
      const response = await axios.put(
        `https://resto-p4fa.onrender.com/product/${id}?enable=${isEnabled}`
      );
      return response.data;
    },
    PRODUCT_CLASS: async () => {
      const response = await axios.put(
        `https://resto-p4fa.onrender.com/productclass/${id}`,
        {
          enable: isEnabled,
        }
      );
      return response.data;
    },
  };
  return await options[type]();
};

export const PRODUCT = "PRODUCT";
export const PRODUCT_CLASS = "PRODUCT_CLASS";
