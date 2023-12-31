import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { clearItem, sessionClearItem } from '../../services'
import { getCurrentUser, login, register, updateUser } from '../../services/auth.service'
import { IUser, Login, Register } from '../../models'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  currentUserRequest,
  currentUserSuccess,
  currentUserFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateUserRequest,
  updateUserFailure,
  updateUserSuccess,
} from '../slices/auth.slice'

// Actions
function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<Register>(register, action.payload)
    const user: IUser = response.data.user
    yield put(registerSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(registerFailure(response?.data))
  }
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<Login>(login, action.payload)
    const user: IUser = response.data.user
    yield put(loginSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(loginFailure(response?.data))
  }
}

function* handlelogout() {
  clearItem('token')
  sessionClearItem('currentUser')
  yield put(logoutSuccess())
}

function* handleUpdate(action: ReturnType<typeof updateUserRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(updateUser, action.payload)
    const user: IUser = response.data.user
    yield put(updateUserSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(updateUserFailure({ status: response?.status, data: response?.data }))
  }
}

export function* handleCurrentUser() {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(getCurrentUser)
    const user: IUser = response.data.user
    if (!!user) {
      yield put(currentUserSuccess(user))
    } else {
      yield put(currentUserFailure({ errors: ['User not found'] }))
    }
  } catch (error) {
    const { response } = error as AxiosError
    yield put(currentUserFailure({ status: response?.status, errors: response?.data }))
  }
}

// Watchers
export function* watchAuth() {
  yield takeLatest(currentUserRequest, handleCurrentUser)
  yield takeLatest(registerRequest, handleRegister)
  yield takeLatest(loginRequest, handleLogin)
  yield takeLatest(updateUserRequest, handleUpdate)
  yield takeLatest(logoutRequest, handlelogout)
}
