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

// ==========================================
// 🔴 NAYE FUNCTIONS: FORGOT PASSWORD FLOW KE LIYE
// ==========================================

// 1. Email par OTP bhejne ke liye
export const forgotPassword = (data) => {
  return API.post('/auth/forgot-password', data);
};

// 2. User ne jo OTP dala hai use verify karne ke liye
export const verifyOtp = (data) => {
  return API.post('/auth/verify-otp', data);
};

// 3. Naya password set karne ke liye
export const resetPassword = (data) => {
  return API.post('/auth/reset-password', data);
};