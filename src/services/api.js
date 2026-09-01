import axios from 'axios';

// Yeh humara base setup hai, jisme ab live Render URL set kar diya hai
const API = axios.create({
  baseURL: 'https://codexpert2-backend.onrender.com/api',
});

// Signup ke liye function jo backend par data bhejega
export const registerUser = (userData) => {
  return API.post('/auth/signup', userData);
};

// Login ke liye function jo email aur password bhejega
export const loginUser = (userData) => {
  return API.post('/auth/login', userData);
};