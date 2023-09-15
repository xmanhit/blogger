import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  getCurrentUser,
  postLogin,
  postRegister,
  putUpdateUser,
} from '../../services/auth.service'
import { IUser, PostLogin, PostRegister } from '../../models'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  notCurrentUser,
  currentUser,
  currentUserRequest,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateRequest,
  updateFailure,
  updateSuccess,
} from '../slices/auth.slice'
import { AxiosError, AxiosResponse } from 'axios'

// Actions
function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<PostRegister>(
      postRegister,
      action.payload
    )
    const user: IUser = response.data.user
    yield put(registerSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(registerFailure(response?.data))
  }
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<PostLogin>(
      postLogin,
      action.payload
    )
    const user: IUser = response.data.user
    yield put(loginSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(loginFailure(response?.data))
  }
}

function* handlelogout() {
  const isAuthenticated: boolean = yield select(
    (state) => state.auth.isAuthenticated
  )
  if (!isAuthenticated) return
  yield put(logoutSuccess())
}

function* handleUpdate(action: ReturnType<typeof updateRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(
      putUpdateUser,
      action.payload
    )
    const user: IUser = response.data.user
    yield put(updateSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(updateFailure(response?.data))
  }
}

export function* handleCurrentUser() {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(getCurrentUser)
    const user: IUser = response.data.user

    if (!!user) {
      yield put(currentUser(user))
    } else {
      yield put(notCurrentUser())
    }
  } catch (error) {
    yield put(notCurrentUser())
  }
}

// Watchers
export function* watchRegister() {
  yield takeLatest(registerRequest, handleRegister)
}

export function* watchLogin() {
  yield takeLatest(loginRequest, handleLogin)
}

export function* watchLogout() {
  yield takeLatest(logoutRequest, handlelogout)
}

export function* watchCurrentUser() {
  yield takeLatest(currentUserRequest, handleCurrentUser)
}

export function* watchUpdate() {
  yield takeLatest(updateRequest, handleUpdate)
}
