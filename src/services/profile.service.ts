import { axiosPrivate } from '../https-common'
import { IProfile } from '../models'
import { GetProfile, CreateProfileFollow, DeleteUnfollowUser } from '../models'

export const getProfile: GetProfile = (username) => {
  return axiosPrivate.get<IProfile>(`/profiles/${username.username}`)
}

export const postFollowUser: CreateProfileFollow = (username) => {
  return axiosPrivate.post<IProfile>(`/profiles/${username.username}/follow`)
}

export const deleteUnfollowUser: DeleteUnfollowUser = (username) => {
  return axiosPrivate.delete<IProfile>(`/profiles/${username.username}/follow`)
}
