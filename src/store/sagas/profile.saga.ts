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
import { call, put, takeLatest } from 'redux-saga/effects'
import { GetProfile, CreateProfileFollow, DeleteUnfollowUser } from "../../models"

function* handleSetProfile(
  action: ReturnType<typeof setProfile>
) {
  try {
    const payloadUsername: string | undefined = action.payload.username
    if (payloadUsername !== undefined) {
      const response: AxiosResponse<IProfile> = yield call<GetProfile>(
        getProfile,
        { username: payloadUsername },
      )
      yield put(setProfileSuccess(response.data))
    }
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setProfileFailure(response?.data))
  }
}

  function* handleCreateProfileFollowUser(
    action: ReturnType<typeof createProfileFollowUser>
  ) {
    try {
      const payloadUsername: string | undefined = action.payload.username;
      
      // Check if payloadUsername is defined
      if (payloadUsername !== undefined) {
        const response: AxiosResponse<IProfile> = yield call<CreateProfileFollow>(
          postFollowUser,
          { username: payloadUsername },
        );
        yield put(createProfileFollowUserSuccess(response.data));
      } else {
        // Handle the case where payloadUsername is undefined
        console.log("Username is undefined. Skipping API call.");
      }
    } catch (error) {
      const { response } = error as AxiosError;
      yield put(createProfileFollowUserFailure(response?.data));
    }
  }

  function* handleCreateProfileUnFollowUser(
    action: ReturnType<typeof createProfileUnFollowUser>
  ) {;
    try {
      const payloadUsername: string | undefined = action.payload.username;
      
      // Check if payloadUsername is defined
      if (payloadUsername !== undefined) {
        const response: AxiosResponse<IProfile> = yield call<DeleteUnfollowUser>(
          deleteUnfollowUser,
          { username: payloadUsername },
        );
        yield put(createProfileUnFollowUserSuccess(response.data));
      } else {
        console.log("Username is undefined. Skipping API call.");
      }
    } catch (error) {
      const { response } = error as AxiosError;
      yield put(createProfileUnFollowUserFailure(response?.data));
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