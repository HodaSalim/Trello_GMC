import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const api = axios.create({ baseURL });

export const setToken = (token) => {
  if (!token) {
    api.defaults.headers.common["authorization"] = "";
  }

  api.defaults.headers.common["authorization"] = `Bearer ${token}`;
};
