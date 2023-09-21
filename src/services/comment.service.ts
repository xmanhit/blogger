import https, { axiosPrivate } from '../https-common'
import { CreateArticleComment, DeleteArticleComment, GetArticleComments } from '../models'

export const getArticleComments: GetArticleComments = ({ slug }) => {
  return https.get(`/articles/${slug}/comments`)
}

export const createArticleComment: CreateArticleComment = ({ slug, comment }) => {
  return axiosPrivate.post(`/articles/${slug}/comments`, { comment })
}

export const deleteArticleComment: DeleteArticleComment = ({ slug, commentId }) => {
  return axiosPrivate.delete(`/articles/${slug}/comments/${commentId}`)
}
