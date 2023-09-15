import {
  IUser,
  PostRegister,
  PostLogin,
  GetCurrentUser,
  PutUpdateUser,
} from '../models'
import { axiosPrivate } from '../https-common'

export const postLogin: PostLogin = ({ email, password }) => {
  return axiosPrivate.post<IUser>('/users/login', {
    user: {
      email,
      password,
    },
  })
}

export const postRegister: PostRegister = ({ username, email, password }) => {
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

export const putUpdateUser: PutUpdateUser = (user) => {
  return axiosPrivate.put<IUser>('/users', {
    user: user,
  })
}
