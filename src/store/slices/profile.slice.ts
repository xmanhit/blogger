import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, IProfileState } from '../../models'
export const initialState: IProfileState = {
  profile: {},
  status: {},
  errors: {},
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileRequest: (state, _action: PayloadAction<{ username: string }>) => {
      state.errors.profile = null
      state.status.profile = 'loading'
    },
    setProfileSuccess: (state, action: PayloadAction<{ profile: IProfile }>) => {
      state.profile = action.payload.profile
      state.status.profile = 'successed'
    },
    setProfileFailure: (state, action: PayloadAction<{ status?: number; data: any }>) => {
      state.errors.profile = action.payload
      state.status.profile = 'failed'
    },

    followUserRequest: (state, _action: PayloadAction<any>) => {
      state.errors.follow = null
      state.status.follow = 'loading'
    },
    followUserSuccess: (state, action: PayloadAction<{ profile: IProfile }>) => {
      state.profile.following = action.payload.profile.following
      state.status.follow = 'successed'
    },
    followUserFailure: (state, action: PayloadAction<{ status?: number; data: any }>) => {
      state.errors.follow = action.payload
      state.status.follow = 'failed'
    },

    unFollowUserRequest: (state, _action: PayloadAction<{ username: string }>) => {
      state.errors.unFollow = null
      state.status.unFollow = 'loading'
    },
    unFollowUserSuccess: (state, action: PayloadAction<{ profile: IProfile }>) => {
      state.profile.following = action.payload.profile.following
      state.status.unFollow = 'successed'
    },
    unFollowUserFailure: (state, action: PayloadAction<any>) => {
      state.errors.unFollow = action.payload
      state.status.unFollow = 'failed'
    },
  },
})

export const {
  setProfileRequest,
  setProfileSuccess,
  setProfileFailure,
  followUserRequest,
  followUserSuccess,
  followUserFailure,
  unFollowUserRequest,
  unFollowUserSuccess,
  unFollowUserFailure,
} = profileSlice.actions

export default profileSlice.reducer
