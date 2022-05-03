import axios from 'axios'

const corsApiHost = 'cors-anywhere.herokuapp.com/'
const baseURL = 'app.debricked.com/api/'

export default axios.create({
  baseURL: `https://${corsApiHost}${baseURL}`
})