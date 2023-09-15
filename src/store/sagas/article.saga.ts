import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { GetArticleFollowingUsers, GetArticles, IArticle } from '../../models'
import {
  getArticleFollowingUsers,
  getArticles,
} from '../../services/article.service'
import {
  createArticleFavoriteFailure,
  createArticleFavoriteRequest,
  createArticleFavoriteSuccess,
  deleteArticleFavoriteFailure,
  deleteArticleFavoriteRequest,
  deleteArticleFavoriteSuccess,
  setArticleFollowingUsersRequest,
  setArticlesFailure,
  setArticlesRequest,
  setArticlesSuccess,
} from '../slices/article.slice'
import {
  deleteArticleFavorite,
  postCreateArticleFavorite,
} from '../../services/favorite.service'

// Actions
function* handleSetArticleFollowingUsers(
  action: ReturnType<typeof setArticleFollowingUsersRequest>
) {
  try {
    const response: AxiosResponse<IArticle[]> =
      yield call<GetArticleFollowingUsers>(
        getArticleFollowingUsers,
        action.payload
      )

    yield put(setArticlesSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesSuccess(response?.data))
  }
}
function* handleSetArticles(action: ReturnType<typeof setArticlesRequest>) {
  try {
    const response: AxiosResponse<{
      articles: IArticle[]
      articlesCount: number
    }> = yield call<GetArticles>(getArticles, action.payload)
    yield put(setArticlesSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesFailure(response?.data))
  }
}

function* handleCreateArticleFavorite(
  action: ReturnType<typeof createArticleFavoriteRequest>
) {
  console.log(action.payload)

  try {
    const response: AxiosResponse<{ article: IArticle }> = yield call(
      postCreateArticleFavorite,
      action.payload
    )
    yield put(createArticleFavoriteSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(createArticleFavoriteFailure(response?.data))
  }
}

function* handleDeleteArticleFavorite(
  action: ReturnType<typeof deleteArticleFavoriteRequest>
) {
  try {
    const response: AxiosResponse<{ article: IArticle }> = yield call(
      deleteArticleFavorite,
      action.payload
    )
    yield put(deleteArticleFavoriteSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(deleteArticleFavoriteFailure(response?.data))
  }
}

// Watchers
export function* watchSetArticles() {
  yield takeLatest(setArticlesRequest, handleSetArticles)
}

export function* watchSetArticleFollowingUsers() {
  yield takeLatest(
    setArticleFollowingUsersRequest,
    handleSetArticleFollowingUsers
  )
}

export function* watchCreateFavorite() {
  yield takeLatest(createArticleFavoriteRequest, handleCreateArticleFavorite)
}

export function* watchDeleteFavorite() {
  yield takeLatest(deleteArticleFavoriteRequest, handleDeleteArticleFavorite)
}
