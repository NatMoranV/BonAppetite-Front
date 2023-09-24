import axios from "axios";
const toggleProductStatus = async ({ id, isEnabled }) => {
  const response = await axios.put(
    `https://resto-p4fa.onrender.com/product/${id}?enable=${isEnabled}`
  );
  return response.data;
};

export default toggleProductStatus;
