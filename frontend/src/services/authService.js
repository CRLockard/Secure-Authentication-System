import axios from "axios";

// Axios is used here so the frontend can make HTTP requests to the backend.
const API_URL = "http://localhost:5000";

export const signupUser = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const signinUser = async (userData) => {
  return axios.post(`${API_URL}/signin`, userData);
};
