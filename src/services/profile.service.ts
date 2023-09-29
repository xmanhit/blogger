import { axiosPrivate } from '../https-common'
import { IProfile } from '../models'

export const getProfile = ({ username }: { username: string }) => {
  return axiosPrivate.get<{ profile: IProfile }>(`/profiles/${username}`)
}

export const followUser = ({ username }: { username: string }) => {
  return axiosPrivate.post<{ profile: IProfile }>(`/profiles/${username}/follow`)
}

export const deleteUnfollowUser = ({ username }: { username: string }) => {
  return axiosPrivate.delete<{ profile: IProfile }>(`/profiles/${username}/follow`)
}
