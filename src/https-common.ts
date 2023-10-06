import axios from 'axios'
import { clearItem, getItem, sessionClearItem, sessionStoreItem, storeItem } from './services'
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
      sessionStoreItem({ currentUser: JSON.stringify(currentUser) })
      const token: Token = currentUser.token
      if (token) storeItem({ token })
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      clearItem('token')
      sessionClearItem('currentUser')
    }
    return Promise.reject(error)
  }
)
