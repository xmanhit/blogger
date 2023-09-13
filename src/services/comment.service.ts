import https from '../https-common';
import {
  CreateArticleComment,
  DeleteArticleComment,
  GetArticleComments,
} from '../models';

export const getArticleComments: GetArticleComments = (slug) => {
  return https.get(`/articles/${slug}/comments`);
};

export const postCreateArticleComment: CreateArticleComment = (
  slug,
  comment
) => {
  return https.post(`/articles/${slug}/comments`, { comment });
};

export const deleteArticleComment: DeleteArticleComment = (slug, commentId) => {
  return https.delete(`/articles/${slug}/comments${commentId}`);
};
