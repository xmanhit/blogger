import { all } from 'redux-saga/effects'
<<<<<<< HEAD
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
=======
import { watchAuth } from '../sagas/auth.saga'
import { watchArticle } from './article.saga'
import { watchComments } from './comment.saga'
import { 
  watchProfile,
  watchFollowProfile,
  watchUnFollowProfile,
} from './profile.saga'


export default function* rootSaga() {
  yield all([
    // User
    watchAuth(),
    // Article
<<<<<<< HEAD
    watchSetArticleFollowingUsers(),
    watchSetArticles(),
    watchCreateFavorite(),
    watchDeleteFavorite(),
    watchSetArticleDetails(),
    watchProfile(),
    watchFollowProfile(),
    watchUnFollowProfile(),
=======
    watchArticle(),
    // Comment
    watchComments(),
    
    watchProfile(),
    watchFollowProfile(),
    watchUnFollowProfile(),
  ])
}
