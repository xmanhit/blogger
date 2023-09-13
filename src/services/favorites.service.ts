import https from '../https-common';
import { CreateArticleFavorite, Token } from '../models';

export const PostCreateArticleFavorite: CreateArticleFavorite = (slug) => {
  const token: Token = localStorage.getItem('token');
  return https.post(`/articles${slug}/favorites`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const DeleteArticleFavorite: CreateArticleFavorite = (slug) => {
  const token: Token = localStorage.getItem('token');
  return https.delete(`/articles${slug}/favorites`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};
