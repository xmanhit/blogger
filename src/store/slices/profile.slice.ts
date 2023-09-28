import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProfile } from '../../models';
export const initialState : IProfile = {
  username: 'idle',
  image: 'idle',
  profile: {
    email: 'idle',
    password: 'idle',
    username: 'idle',
    bio: 'idle',
    image: 'idle',
    following: 'idle',
  },
  isLoading: true,
  isActionLoading: 'idle',
  errors: {},
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, _action: PayloadAction<IProfile>) => {
      state.isLoading = true
      state.profile ={}
      state.errors = {}
    },
    setProfileSuccess: (state, action: PayloadAction<any>) => {
      state.profile = action.payload.profile;
      state.isLoading = false;
    },
    setProfileFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.isLoading = false
    },


    // followUser: (state, action: PayloadAction<any>) => {},
    createProfileFollowUser: (state, _action: PayloadAction<IProfile>) => {
      state.isActionLoading = _action.payload
      state.errors = {}
      state.isLoading = true
    },
    createProfileFollowUserSuccess: (state, action: PayloadAction<any>) => {
      state.profile = action.payload.profile;
      state.isActionLoading = ''
      state.isLoading = false;
    },
    createProfileFollowUserFailure: (state, _action: PayloadAction<any>) => {
      state.isActionLoading = ''
    },


    // unfollowUser: (state, action: PayloadAction<any>) => {},
    createProfileUnFollowUser: (state, _action: PayloadAction<IProfile>) => {

      state.isActionLoading = _action.payload
    },
    createProfileUnFollowUserSuccess: (state, action: PayloadAction<any>) => {
      state.profile = action.payload.profile;
      state.isActionLoading = ''
    },
    createProfileUnFollowUserFailure: (state, _action: PayloadAction<any>) => {
      state.isActionLoading = ''
    },
  },
});

export const { 
  setProfile, 
  setProfileSuccess, 
  setProfileFailure, 
  createProfileFollowUser, 
  createProfileFollowUserSuccess, 
  createProfileFollowUserFailure, 
  createProfileUnFollowUser,
  createProfileUnFollowUserSuccess,
  createProfileUnFollowUserFailure,
 } = profileSlice.actions;

export default profileSlice.reducer
