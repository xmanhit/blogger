import { combineReducers } from 'redux'
import auth from '../slices/auth.slice'
import profile from '../slices/profile.slice'
import article from '../slices/article.slice'
import comment from '../slices/comment.slice'

export default combineReducers({
  auth,
  profile,
  article,
  comment,
})
