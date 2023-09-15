import { axiosPrivate } from '../https-common'
import { CreateArticleFavorite } from '../models'

export const PostCreateArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosPrivate.post(`/articles${slug}/favorites`)
}

export const DeleteArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosPrivate.delete(`/articles${slug}/favorites`)
}
