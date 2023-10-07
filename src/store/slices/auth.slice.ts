import { currentUser, isAuthenticated } from './../../services/index'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, ILoginCredentials, IRegisterCredentials, IUser, IUserInfo } from '../../models'

export const initialState: IAuthState = {
  isAuthenticated: isAuthenticated(),
  currentUser: currentUser(),
  errors: {
    login: null,
    register: null,
    update: null,
    currentUser: null,
  },
  status: {
    register: 'idle',
    login: 'idle',
    update: 'idle',
    logout: 'idle',
    currentUser: 'idle',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login
    clearLogin: (state): void => {
      state.errors.login = null
      state.status.login = 'idle'
    },
    loginRequest: (state, _action: PayloadAction<ILoginCredentials>): void => {
      state.status.login = 'loading'
      state.isAuthenticated = false
      state.errors.login = null
    },
    loginSuccess: (state, _action: PayloadAction<IUser>): void => {
      state.status.login = 'idle'
      state.isAuthenticated = true
    },
    loginFailure: (state, action: PayloadAction<any>): void => {
      state.errors.login = action.payload.errors
      state.status.login = 'failed'
    },
    // Logout
    logoutRequest: (state): void => {
      state.status.logout = 'loading'
    },
    logoutSuccess: (state): void => {
      state.isAuthenticated = false
      state.currentUser = null
      state.status.logout = 'idle'
    },
    // Current User
    currentUserRequest: (state) => {
      state.errors.currentUser = null
      state.status.currentUser = 'loading'
    },
    currentUserSuccess: (state, action: PayloadAction<IUser>): void => {
      state.status.currentUser = 'idle'
      state.currentUser = action.payload
    },
    currentUserFailure: (state, action: PayloadAction<any>): void => {
      state.errors.currentUser = action.payload
      state.status.currentUser = 'failed'
    },
    // Register
    clearRegister: (state): void => {
      state.errors.register = null
      state.status.register = 'idle'
    },
    registerRequest: (state, _action: PayloadAction<IRegisterCredentials>): void => {
      state.status.register = 'loading'
      state.currentUser = null
      state.errors.register = null
      state.isAuthenticated = false
    },
    registerSuccess: (state, action: PayloadAction<IUser>): void => {
      state.isAuthenticated = true
      state.currentUser = action.payload
      state.status.register = 'idle'
    },
    registerFailure: (state, action: PayloadAction<any>): void => {
      state.errors.register = action.payload.errors
      state.status.register = 'failed'
    },
    // Update
    resetStatusUpdateUser: (state): void => {
      state.errors.update = null
      state.status.update = 'idle'
    },
    updateUserRequest: (state, _action: PayloadAction<{ user: IUserInfo }>): void => {
      state.status.update = 'loading'
      state.errors.update = null
    },
    updateUserSuccess: (state, action: PayloadAction<IUser>): void => {
      state.currentUser = action.payload
      state.status.update = 'successed'
    },
    updateUserFailure: (state, action: PayloadAction<any>): void => {
      state.errors.update = action.payload
      state.status.update = 'failed'
    },
  },
})

export const {
  clearLogin,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  currentUserRequest,
  currentUserSuccess,
  currentUserFailure,
  clearRegister,
  registerRequest,
  registerSuccess,
  registerFailure,
  resetStatusUpdateUser,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = authSlice.actions
export default authSlice.reducer
