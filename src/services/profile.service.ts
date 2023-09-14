import https from '../https-common';
import { IProfile, Profile, Token } from '../models';

export const getProfile: Profile = (username) => {
  return https.get<IProfile>(`/profiles/${username}`);
};

export const postFollowUser: Profile = (username) => {
  const token: Token = localStorage.getItem('token');
  return https.post<IProfile>(`/profiles/${username}/follow`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deleteUnfollowUser: Profile = (username) => {
  const token: Token = localStorage.getItem('token');
  return https.delete<IProfile>(`/profiles/${username}/unfollow`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
