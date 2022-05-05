import axios from 'axios'

const baseURL = 'localhost:8081/api/'

const axiosConfig = axios.create({
  baseURL: `http://${baseURL}`
})

// add token to each request
axiosConfig.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfig