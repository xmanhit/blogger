import axios from 'axios'
import { clearItem, getItem, storeItem } from './services'
import { IUser, Token } from './models'

export default axios.create({
  baseURL: 'https://api.realworld.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const axiosPrivate = axios.create({
  baseURL: 'https://api.realworld.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosPrivate.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token: Token = getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const currentUser: IUser = response.data.user
    if (currentUser) {
      const token: string = currentUser.token
      if (token) storeItem({ token })
      storeItem({ currentUser })
    }
    return response
  },
  function (error) {
    console.log(error.status)
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    clearItem('token')
    clearItem('currentUser')
    return Promise.reject(error)
  }
)
