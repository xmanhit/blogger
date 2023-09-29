import {
  setProfileRequest,
  setProfileSuccess,
  setProfileFailure,
  followUserRequest,
  followUserSuccess,
  followUserFailure,
  unFollowUserRequest,
  unFollowUserSuccess,
  unFollowUserFailure,
} from '../slices/profile.slice'
import { getProfile, followUser, deleteUnfollowUser } from '../../services/profile.service'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { IProfile } from '../../models'

function* handleSetProfile(action: ReturnType<typeof setProfileRequest>) {
  try {
    const response: AxiosResponse<{ profile: IProfile }> = yield call(getProfile, action.payload)
    yield put(setProfileSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setProfileFailure({ status: response?.status, data: response?.data }))
  }
}

function* handleFollowerUser(action: ReturnType<typeof followUserRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(followUser, action.payload)
    yield put(followUserSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(followUserFailure({ status: response?.status, data: response?.data }))
  }
}

function* handleUnFollowUser(action: ReturnType<typeof unFollowUserRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(deleteUnfollowUser, action.payload)
    yield put(unFollowUserSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(unFollowUserFailure({ status: response?.status, data: response?.data }))
  }
}

export function* watchProfile() {
  yield takeLatest(setProfileRequest, handleSetProfile)
  yield takeLatest(followUserRequest, handleFollowerUser)
  yield takeLatest(unFollowUserRequest, handleUnFollowUser)
}
