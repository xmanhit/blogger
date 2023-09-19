import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, IProfile } from '../../models';
export const initialState : IProfile = {
  profile: {
    username: '',
    bio: '',
    image: '',
    following: '',
  },
  isLoading: false,
  isActionLoading: '',
  errors: {},
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, _action: PayloadAction<IProfile>) => {
      state.isLoading = true
      // state.profile =[]
      state.errors = {}
      console.log(_action)
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
    },
    createProfileFollowUserFailure: (state, _action: PayloadAction<any>) => {
      state.isActionLoading = ''
    },


    // unfollowUser: (state, action: PayloadAction<any>) => {},
    createProfileUnFollowUser: (state, action: PayloadAction<string>) => {
      state.isActionLoading = action.payload
      console.log(state)
    },
    createProfileUnFollowUserSuccess: (state, action: PayloadAction<IProfile>) => {
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

export default profileSlice.reducer;
