import https, { axiosPrivate } from '../https-common'
import { IProfile, Profile } from '../models'

export const getProfile: Profile = (username) => {
  return https.get<IProfile>(`/profiles/${username}`)
}

export const followUser: Profile = (username) => {
  return axiosPrivate.post<IProfile>(`/profiles/${username}/follow`)
}

export const deleteUnfollowUser: Profile = (username) => {
  return axiosPrivate.delete<IProfile>(`/profiles/${username}/unfollow`)
}
