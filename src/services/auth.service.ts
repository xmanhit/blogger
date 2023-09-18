import {
  IUser,
  Register,
  Login,
  GetCurrentUser,
  PutUpdateUser,
} from '../models'
import { axiosPrivate } from '../https-common'

export const login: Login = ({ email, password }) => {
  return axiosPrivate.post<IUser>('/users/login', {
    user: {
      email,
      password,
    },
  })
}

export const register: Register = ({ username, email, password }) => {
  return axiosPrivate.post<IUser>('/users', {
    user: {
      username,
      email,
      password,
    },
  })
}

export const getCurrentUser: GetCurrentUser = () => {
  return axiosPrivate.get<IUser>('/user')
}

export const updateUser: PutUpdateUser = (user) => {
  return axiosPrivate.put<IUser>('/users', {
    user: user,
  })
}
