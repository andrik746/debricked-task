import axios from "axios";

import {requestURL} from '@/constants'

const axiosConfig = axios.create({
  baseURL: `http://${requestURL}`,
});

// add token to each request
axiosConfig.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
