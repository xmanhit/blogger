import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, ILoginCredentials, IUser } from '../../models'
import { getCurrentUser, getItem } from '../../services'

export const initialState: IAuthState = {
  user: getCurrentUser(),
  isAuthenticated: getItem('token') ? true : false,
  isActionLoading: false,
  isLoading: false,
  errors: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<ILoginCredentials>): void => {
      state.isActionLoading = true
      state.errors = {}
    },
    loginSuccess: (state, action: PayloadAction<IUser>): void => {
      state.user = action.payload
      state.isActionLoading = false
      state.isAuthenticated = true
    },
    loginFailure: (state, action: PayloadAction<any>): void => {
      state.errors = action.payload.errors
      state.isActionLoading = false
    },
    logoutRequest: (state): void => {
      state.isActionLoading = true
    },
    logoutSuccess: (state): void => {
      state.user = {}
      state.isAuthenticated = false
    },
    currentUserRequest: () => {},
    currentUser: (state, action: PayloadAction<IUser>): void => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },
    notCurrentUser: (state): void => {
      state.user = {}
      state.isAuthenticated = false
      state.isLoading = false
    },
    registerRequest: (state, _action: PayloadAction<any>): void => {
      state.isActionLoading = true
      state.errors = {}
    },
    registerSuccess: (state, action: PayloadAction<any>): void => {
      state.user = action.payload
      state.isActionLoading = false
      state.isAuthenticated = true
    },
    registerFailure: (state, action: PayloadAction<any>): void => {
      state.errors = action.payload.errors
      state.isActionLoading = false
    },
    updateRequest: (state, _action: PayloadAction<any>): void => {
      state.isActionLoading = true
      state.errors = {}
    },
    updateSuccess: (state, action: PayloadAction<any>): void => {
      state.user = action.payload
      state.isActionLoading = false
    },
    updateFailure: (state, action: PayloadAction<any>): void => {
      state.errors = action.payload.errors
      state.isActionLoading = false
    },
  },
})

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  currentUserRequest,
  currentUser,
  notCurrentUser,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
} = authSlice.actions
export default authSlice.reducer
