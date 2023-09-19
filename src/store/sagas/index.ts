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
  watchSetArticleDetails,
} from './article.saga'
import { 
  watchProfile,
  watchFollowProfile,
  watchUnFollowProfile,
} from './profile.saga'

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
    watchSetArticleDetails(),
    watchProfile(),
    watchFollowProfile(),
    watchUnFollowProfile(),
  ])
}
