import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { GetArticleFollowingUsers, GetArticles, IArticle } from '../../models'
import {
  getArticleFollowingUsers,
  getArticles,
} from '../../services/article.service'
import {
  setArticleFollowingUsersRequest,
  setArticleFollowingUsersSuccess,
  setArticlesFailure,
  setArticlesRequest,
  setArticlesSuccess,
} from '../slices/article.slice'

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
    console.log(response.data)

    yield put(setArticleFollowingUsersSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesFailure(response?.data))
  }
}
function* handleSetArticles(action: ReturnType<typeof setArticlesRequest>) {
  try {
    console.log(action.payload)

    const response: AxiosResponse<{
      articles: IArticle[]
      articlesCount: number
    }> = yield call<GetArticles>(getArticles, action.payload)
    const data = response.data
    yield put(setArticlesSuccess({ data, params: action.payload }))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesFailure(response?.data))
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
