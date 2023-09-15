import { all } from 'redux-saga/effects'
import {
  watchRegister,
  watchLogin,
  watchLogout,
  watchCurrentUser,
  watchUpdate,
} from '../sagas/auth.saga'
import {
  watchSetArticleFollowingUsers,
  watchSetArticles,
  watchCreateFavorite,
  watchDeleteFavorite,
} from './article.saga'

export default function* rootSaga() {
  yield all([
    // User
    watchRegister(),
    watchLogin(),
    watchLogout(),
    watchCurrentUser(),
    watchUpdate(),
    // Article
    watchSetArticleFollowingUsers(),
    watchSetArticles(),
    watchCreateFavorite(),
    watchDeleteFavorite(),
  ])
}
