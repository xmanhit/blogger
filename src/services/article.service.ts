import https, { axiosPrivate } from '../https-common'
import {
  CreateArticle,
  DeleteArticle,
  GetArticle,
  GetArticles,
  GetArticleFollowingUsers,
  UpdateArticle,
} from '../models'

export const getArticleFollowingUsers: GetArticleFollowingUsers = (params) => {
  return axiosPrivate.get('/articles/feed', { params })
}

export const getArticles: GetArticles = (params) => {
  console.log(params)
  return https.get('/articles', { params })
}

export const createArticle: CreateArticle = (article) => {
  return axiosPrivate.post('/articles', article)
}

export const getArticle: GetArticle = (slug) => {
  return https.get(`/articles/${slug}`)
}

export const updateArticle: UpdateArticle = (slug, article) => {
  return axiosPrivate.put(`/articles/${slug}`, article)
}

export const deleteArticle: DeleteArticle = (slug) => {
  return axiosPrivate.delete(`/articles/${slug}`)
}

export const getTags = () => {
  return https.get('/tags')
}
