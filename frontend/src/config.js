// src/utils/api.js
import axios from "axios";

// Change this URL to match your backend server port
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add a request interceptor to include the Auth Token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Assuming you store the JWT here on login
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("Token not found");
  }
  return req;
});

export default API;
