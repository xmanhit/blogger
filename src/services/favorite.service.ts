import { axiosPrivate } from '../https-common'
import { CreateArticleFavorite } from '../models'

export const createArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosPrivate.post(`/articles/${slug}/favorite`)
}

export const deleteArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosPrivate.delete(`/articles/${slug}/favorite`)
}
