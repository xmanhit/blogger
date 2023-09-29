import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, ILoginCredentials, IRegisterCredentials, IUser, IUserInfo } from '../../models'

export const initialState: IAuthState = {
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
      state.errors.login = null
    },
    loginSuccess: (state, _action: PayloadAction<IUser>): void => {
      state.status.login = 'idle'
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
      state.status.logout = 'idle'
    },
    // Current User
    currentUserRequest: (state) => {
      state.status.currentUser = 'loading'
    },
    currentUserSuccess: (state, _action: PayloadAction<IUser>): void => {
      state.status.currentUser = 'idle'
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
      state.errors.register = null
    },
    registerSuccess: (state, _action: PayloadAction<IUser>): void => {
      state.status.register = 'idle'
    },
    registerFailure: (state, action: PayloadAction<any>): void => {
      state.errors.register = action.payload.errors
      state.status.register = 'failed'
    },
    // Update
    resetStatusUpdateUser: (state): void => {
      state.status.update = 'idle'
    },
    updateUserRequest: (state, _action: PayloadAction<{ user: IUserInfo }>): void => {
      state.status.update = 'loading'
      state.errors.update = null
    },
    updateUserSuccess: (state, _action: PayloadAction<IUser>): void => {
      state.status.update = 'succeeded'
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
