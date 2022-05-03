import axios from 'axios'

const corsApiHost = 'cors-anywhere.herokuapp.com/'
const baseURL = 'app.debricked.com/api/'

const axiosConfig = axios.create({
  baseURL: `https://${corsApiHost}${baseURL}`
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