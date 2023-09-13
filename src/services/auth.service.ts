import {
  IUser,
  PostRegister,
  PostLogin,
  GetCurrentUser,
  Token,
  PutUpdateUser,
} from '../models';
import https from '../https-common';

export const postLogin: PostLogin = ({ email, password }) => {
  return https.post<IUser>('/users/login', {
    user: {
      email,
      password,
    },
  });
};

export const postRegister: PostRegister = ({ username, email, password }) => {
  return https.post<IUser>('/users', {
    user: {
      username,
      email,
      password,
    },
  });
};

export const getCurrentUser: GetCurrentUser = () => {
  const token: Token = localStorage.getItem('token');
  return https.get<IUser>('/users', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const putUpdateUser: PutUpdateUser = (user) => {
  const token: Token = localStorage.getItem('token');
  return https.put<IUser>('/users', {
    user: user,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
