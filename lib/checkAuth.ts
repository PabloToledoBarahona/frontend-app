import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/auth/status", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};