import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// ✅ Get Token from localStorage Safely
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found. Please log in.");
  }
  return { Authorization: `Bearer ${token}` };
};

// ✅ Fetch Products API
export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/products`);
  return data;
};

// ✅ Book Product API (Includes JWT Token)
export const bookProduct = async (bookingData) => {
  const headers = getAuthHeaders();
  const { data } = await axios.post(`${API_BASE_URL}/bookings`, bookingData, { headers });
  return data;
};
