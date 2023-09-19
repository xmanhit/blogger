import https, { axiosPrivate } from '../https-common'
import { IProfile } from '../models'
import { GetProfile, CreateProfileFollow } from '../models'

export const getProfile: GetProfile = (username) => {
  console.log('getProfile',username)
  return https.get<IProfile>(`/profiles/${username.username}`)
}

export const postFollowUser: CreateProfileFollow = (username) => {
  console.log('CreateProfileFollow',username)
  return axiosPrivate.post<IProfile>(`/profiles/${username.username}/follow`)
}

export const deleteUnfollowUser: CreateProfileFollow = (username) => {
  return axiosPrivate.delete<IProfile>(`/profiles/${username.username}/unfollow`)
}
