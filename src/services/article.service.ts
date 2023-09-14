import https from '../https-common';
import {
  CreateArticle,
  DeleteArticle,
  GetArticle,
  GetArticles,
  GetArticleFollowingUsers,
  Token,
  UpdateArticle,
} from '../models';

export const getArticleFollowingUsers: GetArticleFollowingUsers = ({
  limit,
  offset,
}) => {
  const token: Token = localStorage.getItem('token');
  return https.get('/articles/feed', {
    params: {
      limit,
      offset,
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getArticles: GetArticles = ({
  tag,
  author,
  favorited,
  limit,
  offset,
}) => {
  return https.get('/articles', {
    params: {
      tag,
      author,
      favorited,
      limit,
      offset,
    },
  });
};

export const createArticle: CreateArticle = (article) => {
  const token: Token = localStorage.getItem('token');
  return https.post('/articles', article, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getArticle: GetArticle = (slug) => {
  return https.get(`/articles/${slug}`);
};

export const updateArticle: UpdateArticle = (slug, article) => {
  const token: Token = localStorage.getItem('token');

  return https.put(`/articles/${slug}`, article, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deleteArticle: DeleteArticle = (slug) => {
  const token: Token = localStorage.getItem('token');
  return https.delete(`/articles/${slug}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const getTags = () => {
  return https.get('/tags');
};
