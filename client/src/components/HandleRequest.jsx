import axios from "axios";
import { toast } from "react-toastify";

const HandleRequest = async ({ method, token, url, data = null, onSuccess, onError }) => {
  try {
    const response = await axios({
      method,
      url: `http://localhost:5000/api/v1/${url}`,
      data,
      headers: {
        "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
        "Auth-Token": token,
      },
    });

    if (response.data.success ) {
      data != null && toast.success(onSuccess || "Operation successful");
      return response.data;
    } else {
      toast.error(onError || "Operation failed");
      return null;
    }
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export default HandleRequest;