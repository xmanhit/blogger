import { IProfile } from "../../models"
import { 
  setProfile, 
  setProfileSuccess, 
  setProfileFailure, 
  createProfileFollowUser, 
  createProfileFollowUserSuccess, 
  createProfileFollowUserFailure,
  createProfileUnFollowUser,
  createProfileUnFollowUserSuccess,
  createProfileUnFollowUserFailure,
 } from "../slices/profile.slice"
import { getProfile, postFollowUser, deleteUnfollowUser} from "../../services/profile.service"
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GetProfile, CreateProfileFollow } from "../../models"
function* handleSetProfile(
    action: ReturnType<typeof setProfile>
  ) {
    try {
      const response: AxiosResponse<IProfile> = yield call<GetProfile>(
        getProfile,
        action.payload,
      )
      yield put(setProfileSuccess(response.data))
    } catch (error) {
      const { response } = error as AxiosError
      console.log(response)
      yield put(setProfileFailure(response?.data))
    }
  }

  function* handleCreateProfileFollowUser(
    action: ReturnType<typeof createProfileFollowUser>
  ) {
    console.log('handleCreateProfileFollowUser',action)
    try {
      const response: AxiosResponse<IProfile> = yield call<CreateProfileFollow>(
        postFollowUser,
        action.payload
      )
      yield put(createProfileFollowUserSuccess(response.data))
    } catch (error) {
      const { response } = error as AxiosError
      yield put(createProfileFollowUserFailure(response?.data))
    }
  }

  function* handleCreateProfileUnFollowUser(
    action: ReturnType<typeof createProfileUnFollowUser>
  ) {
    console.log(action.payload)
    try {
      const response: AxiosResponse<IProfile> = yield call(
        deleteUnfollowUser,
        action.payload
      )
      console.log(response)
      yield put(createProfileUnFollowUserSuccess(response.data))
    } catch (error) {
      const { response } = error as AxiosError
      yield put(createProfileUnFollowUserFailure(response?.data))
    }
  }

  export function* watchProfile() {
    yield takeLatest(setProfile, handleSetProfile)
  }

  export function* watchFollowProfile() {
    yield takeLatest(createProfileFollowUser, handleCreateProfileFollowUser)
  }

  export function* watchUnFollowProfile() {
    yield takeLatest(createProfileUnFollowUser, handleCreateProfileUnFollowUser)
  }