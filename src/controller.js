import axios from "axios";
import { io } from "socket.io-client";

// export const BACKEND_URL = "https://api.tecinternship2021.com";
export const BACKEND_URL = "http://localhost:3000";
export const socket = io()
socket.connect(BACKEND_URL)

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password,
    });
    if (response.status === 200) {
      delete response.data.data.password;
      return response.data.data;
    } else {
      throw response.data.msg;
    }
  } catch (err) {
    return err;
  }
};

export const handleSignup = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
      email,
      password,
    });
    if (response.status === 200) {
      delete response.data.data.password;
      return response.data.data;
    } else {
      throw response.data.msg;
    }
  } catch (err) {
    return err;
  }
};

export const handleLogout = async (email, password) => {
  try {
    localStorage.clear("auth");
    localStorage.clear("user");
  } catch (err) {
    return err;
  }
};
