import { countComments } from './../store/selectors/index'
import { AxiosResponse } from 'axios'
import {
  clearLogin,
  clearRegister,
  currentUserRequest,
  loginRequest,
  registerRequest,
  updateRequest,
} from '../store/slices/auth.slice'
import {
  createArticleFavoriteRequest,
  createArticleRequest,
  deleteArticleFavoriteRequest,
  deleteArticleRequest,
  setArticleDetailsRequest,
  setArticleFollowingRequest,
  setArticlesRequest,
  setTagsRequest,
  updateArticleRequest,
} from '../store/slices/article.slice'
import {
  createArticleCommentRequest,
  deleteArticleCommentRequest,
  setArticleCommentRequest,
} from '../store/slices/comment.slice'
import { SetURLSearchParams } from 'react-router-dom'
import { RootState } from '../store'

// token
export type Token = string | null | undefined
export type Status = 'loading' | 'idle' | 'failed'

// login
export interface ILoginCredentials {
  email: string
  password: string
}

export type Login = (credentials: ILoginCredentials) => Promise<AxiosResponse<IUser>>

// register
export interface IRegisterCredentials {
  email: string
  password: string
  username: string
}

export type Register = (credentials: IRegisterCredentials) => Promise<AxiosResponse<IUser>>

// user
export interface IUser {
  username: string
  email: string
  bio?: string
  image: string
  token?: string
}

export interface IAuthor {
  username: string
  bio?: string
  image: string
  following: boolean
  admin?: boolean
}

// current user
export type GetCurrentUser = () => Promise<AxiosResponse<IUser>>

// update user
export interface IUserInfo {
  email: string
  password: string
  username: string
  bio?: string
  image: string
  token?: string
}

export type UpdateUser = (parameter: { user: IUserInfo }) => Promise<AxiosResponse<IUser>>
// profile

export interface Profile {
  username: string
  bio?: string
  image: string
  following: boolean
}
export interface IProfile {
  profile: IUserInfo
  isLoading: boolean,
  isActionLoading: string,
}

export type Profile = (username: string) => Promise<AxiosResponse<IProfile>>

// articles
export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IAuthor
  status: any
}

export interface IArticleResponse {
  article: IArticle
}

export interface IArticleFollowingUsersParams {
  limit: number
  offset: number
}

export interface IArticlesParams extends IArticleFollowingUsersParams {
  tag?: string
  author?: string
  favorited?: string
}

export type GetArticleFollowingUsers = (params: IArticleFollowingUsersParams) => Promise<AxiosResponse<IArticle[]>>

export type GetArticles = (params: IArticlesParams) => Promise<AxiosResponse<IArticle[]>>

export type CreateArticle = (article: IArticle) => Promise<AxiosResponse<IArticle>>

export type GetArticle = (slug: string) => Promise<AxiosResponse<IArticle>>

export type UpdateArticle = (parameter: { slug: string; article: IArticle }) => Promise<AxiosResponse<IArticle>>

export type DeleteArticle = (slug: string) => Promise<AxiosResponse<IArticle>>

// comments
export interface IComment {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  author: IAuthor
  status: any
}

export type GetArticleComments = (params: { slug: string }) => Promise<AxiosResponse<{ comments: IComment[] }>>

export type CreateArticleComment = (params: {
  slug: string
  comment: { body: string }
}) => Promise<AxiosResponse<IComment>>

export type DeleteArticleComment = (params: { slug: string; commentId: string }) => Promise<AxiosResponse<IComment>>

// favorites
export type CreateArticleFavorite = (slug: string) => Promise<AxiosResponse<IArticleResponse>>

export type DeleteArticleFavorite = (slug: string) => Promise<AxiosResponse<IArticleResponse>>

export type GetTags = () => Promise<AxiosResponse<{ tags: string[] }>>

// localStorage
export type StoreItem = (item: { [key: string]: any }) => void
export type GetItem = (item: string) => string | null
export type ClearItem = (item: string) => void

// Error
export interface IErrorCredentials {
  username?: string
  email?: string
  password?: string
  'email or password'?: string
}

// Props
export interface ISignInProps {
  loginRequest: typeof loginRequest
  status: Status
}

export interface ILoginProps {
  isAuthenticated: boolean
  status: Status
  errors: IErrorCredentials | null
  clearRegister: typeof clearRegister
}

export interface ISignUpProps {
  status: Status
  registerRequest: typeof registerRequest
  errors: IErrorCredentials | null
}

export interface IRegisterProps {
  isAuthenticated: boolean
  clearLogin: typeof clearLogin
}

export interface IHomeProps {
  isAuthenticated: boolean
  setTagsRequest: typeof setTagsRequest
  setArticlesRequest: typeof setArticlesRequest
  setArticleFollowingRequest: typeof setArticleFollowingRequest
  isTagsLoading: boolean
  isArticlesLoading: boolean
  tagList: string[]
  articles: IArticle[]
  limit: number
  total: number
}

export interface IArticleProps {
  user: IUser | null
  article: IArticle
  isAuthenticated: boolean
  createArticleFavoriteRequest: typeof createArticleFavoriteRequest
  deleteArticleFavoriteRequest: typeof deleteArticleFavoriteRequest
}

// count comment
export type CC = number | undefined

export type CountComments = (state: RootState) => CC

export interface IArticleDetailsProps {
  status: any
  user: IUser | null
  article: IArticle | null
  countComments: CC
  isLoading: boolean
  isDeleted: boolean
  isAuthenticated: boolean
  setArticleDetailsRequest: typeof setArticleDetailsRequest
  deleteArticleRequest: typeof deleteArticleRequest
  createArticleFavoriteRequest: typeof createArticleFavoriteRequest
  deleteArticleFavoriteRequest: typeof deleteArticleFavoriteRequest
  errors: any
}

export interface IArticleFormProps {
  isLoading: boolean
  isActionLoading: boolean
  isActionSuccess: boolean
  status: any
  article: IArticle | null
  setArticleDetailsRequest: typeof setArticleDetailsRequest
  createArticleRequest: typeof createArticleRequest
  updateArticleRequest: typeof updateArticleRequest
  errors: any
}

export interface ICommentFormProps {
  user: IUser | null
  createArticleCommentRequest: typeof createArticleCommentRequest
  status: any
  errors: any
}

export interface ICommentListProps {
  user: IUser | null
  setArticleCommentRequest: typeof setArticleCommentRequest
  deleteArticleCommentRequest: typeof deleteArticleCommentRequest
  comments: IComment[]
}

export interface IHeaderProps {
  isAuthenticated: boolean
  currentUserRequest: typeof currentUserRequest
  user: IUser | null
}

export interface ITagsProps {
  setTagsRequest: typeof setTagsRequest
  setArticlesRequest: typeof setArticlesRequest
  isTagsLoading: boolean
  isLoading: boolean
  tagList: string[]
  articles: IArticle[]
  total: number
  limit: number
}

export interface IUserDetailsProps {
  user: IUser | null
  articles: IArticle[]
  currentUserRequest: typeof currentUserRequest
  setArticlesRequest: typeof setArticlesRequest
  total: number
  limit: number
}

export interface IUserSettingProps {
  user: IUser | null
  currentUserRequest: typeof currentUserRequest
  updateRequest: typeof updateRequest
}

export interface IPaginationProps {
  total: number
  limit: number
  page: number
  setSearchParams: SetURLSearchParams
}

// State
export interface IAuthState {
  errors: {
    login: IErrorCredentials | null
    register: IErrorCredentials | null
    update: IErrorCredentials | null
    currentUser: any
  }
  status: {
    login: Status
    register: Status
    update: Status
    logout: Status
    currentUser: Status
  }
}

export interface IArticleState {
  tagList: string[]
  articles: IArticle[]
  articleDetails: IArticle | null
  isLoading: boolean
  status: {
    articles: Status
    articleDetails: Status
    tagList: Status
    createArticle: Status
    updateArticle: Status
    deleteArticle: Status
  }
  limit: number
  total: number
  errors: any
}

export interface ICommentState {
  isLoading: boolean
  status: {
    comment: Status
    createComment: Status
  }
  comments: IComment[]
  errors: any
}

export interface Profile {
  username: string
  bio?: string
  image: string
  following: boolean
}
export interface IProfile {
  profile: IUserInfo
  isLoading: boolean,
  isActionLoading: string,
}

export type Profile = (username: string) => Promise<AxiosResponse<IProfile>>

export type GetProfile = (params: {
  username: string
}) => Promise<AxiosResponse<IProfile>>

export type CreateProfileFollow = (params: {
  username: string
}) => Promise<AxiosResponse<IProfile>>

  export interface IOptions {
  weekday?: 'long' | 'short' | 'narrow'
  year?: 'numeric'
  month?: 'long' | 'short' | 'narrow'
  day?: 'numeric'
  hour?: 'numeric'
  minute?: 'numeric'
  second?: 'numeric'
}
