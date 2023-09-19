import https, { axiosPrivate } from '../https-common'
import { IProfile } from '../models'
import { GetProfile, CreateProfileFollow } from '../models'

export const getProfile: GetProfile = (username) => {
  console.log('getProfile',username)
  return https.get<IProfile>(`/profiles/${username.username}`)
}

<<<<<<< HEAD
export const postFollowUser: CreateProfileFollow = (username) => {
  console.log('CreateProfileFollow',username)
  return axiosPrivate.post<IProfile>(`/profiles/${username.username}/follow`)
=======
export const followUser: Profile = (username) => {
  return axiosPrivate.post<IProfile>(`/profiles/${username}/follow`)
>>>>>>> 47800eb0d776e95b6631a511f7cffd15c5db48d3
}

export const deleteUnfollowUser: CreateProfileFollow = (username) => {
  return axiosPrivate.delete<IProfile>(`/profiles/${username.username}/unfollow`)
}
