import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, ILoginCredentials, IUser } from '../../models'
import { getCurrentUser, getItem } from '../../services'

export const initialState: IAuthState = {
  user: getCurrentUser(),
  isAuthenticated: getItem('token') ? true : false,
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
    loginSuccess: (state, action: PayloadAction<IUser>): void => {
      state.user = action.payload
      state.isAuthenticated = true
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
      state.user = null
      state.isAuthenticated = false
      state.status.logout = 'idle'
    },
    // Current User
    currentUserRequest: (state) => {
      state.status.currentUser = 'loading'
    },
    currentUserSuccess: (state, action: PayloadAction<IUser>): void => {
      state.user = action.payload
      state.isAuthenticated = true
      state.status.currentUser = 'idle'
    },
    currentUserFailure: (state, action: PayloadAction<any>): void => {
      state.user = null
      state.isAuthenticated = false
      state.errors.currentUser = action.payload.errors
      state.status.currentUser = 'failed'
    },
    // Register
    clearRegister: (state): void => {
      state.errors.register = null
      state.status.register = 'idle'
    },
    registerRequest: (state, _action: PayloadAction<any>): void => {
      state.status.register = 'loading'
      state.errors.register = null
    },
    registerSuccess: (state, action: PayloadAction<any>): void => {
      state.user = action.payload
      state.isAuthenticated = true
      state.status.register = 'idle'
    },
    registerFailure: (state, action: PayloadAction<any>): void => {
      state.errors.register = action.payload.errors
      state.status.register = 'failed'
    },
    // Update
    updateRequest: (state, _action: PayloadAction<any>): void => {
      state.status.update = 'loading'
      state.errors.update = null
    },
    updateSuccess: (state, action: PayloadAction<any>): void => {
      state.user = action.payload
      state.status.update = 'idle'
    },
    updateFailure: (state, action: PayloadAction<any>): void => {
      state.errors.update = action.payload.errors
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
  updateRequest,
  updateSuccess,
  updateFailure,
} = authSlice.actions
export default authSlice.reducer
