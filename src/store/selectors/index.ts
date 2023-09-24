import { CountComments } from '../../models'

export const countComments: CountComments = (state) => {
  if (!state.comment.comments) return
  return state.comment.comments?.length
}
