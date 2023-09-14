import { all, fork } from 'redux-saga/effects'
import {
  handleCurrentUser,
  watchRegister,
  watchLogin,
  watchLogout,
  // watchCurrentUser,
  watchUpdate,
} from '../sagas/auth.saga'

export default function* rootSaga() {
  yield all([
    fork(handleCurrentUser),
    watchRegister(),
    watchLogin(),
    watchLogout(),
    // watchCurrentUser(),
    watchUpdate(),
  ])
}
