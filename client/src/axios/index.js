import axios from 'axios'
const env = process.env.NODE_ENV
// 在开发环境底下 env   axios的baseurl为
if (env === 'development') {
  axios.defaults.baseURL = 'http://localhost:12345/api'
} else {
  axios.defaults.baseURL = 'http://duyixpy.top:12345/api'
}

export default axios
