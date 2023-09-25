import { CountComments } from '../../models'

export const countComments: CountComments = (state) => {
  if (!state.comment.comments) return
  return state.comment.comments?.length
}

export const isLoadingFormArticle = (state: any) => {
  return state.article.status.createArticle === 'loading' || state.article.status.updateArticle === 'loading'
}

export const isSucceededFormArticle = (state: any) => {
  return state.article.status.createArticle === 'succeeded' || state.article.status.updateArticle === 'succeeded'
}
