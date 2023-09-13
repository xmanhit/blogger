import { AxiosResponse } from 'axios';

// token
export type Token = string | null;

// login
export interface ILoginCredentials {
  email: string;
  password: string;
}

export type PostLogin = (
  credentials: ILoginCredentials
) => Promise<AxiosResponse<IUser>>;

// register
export interface IRegisterCredentials {
  email: string;
  password: string;
  username: string;
}

export type PostRegister = (
  credentials: IRegisterCredentials
) => Promise<AxiosResponse<IUser>>;

// user
export interface IUser {
  username: string;
  email: string;
  bio: string | null;
  image: string;
  token: string;
}

export interface IAuthor {
  username: string;
  bio?: string;
  image: string;
  following: boolean;
  admin?: boolean;
}

// current user
export type GetCurrentUser = () => Promise<AxiosResponse<IUser>>;

// update user
export interface IUserInfo {
  email: string;
  password: string;
  username: string;
  bio: string | null;
  image: string;
}

export type PutUpdateUser = (user: IUserInfo) => Promise<AxiosResponse<IUser>>;

// profile
export interface IProfile {
  profile: IAuthor;
}

export type Profile = (username: string) => Promise<AxiosResponse<IProfile>>;

// articles
export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IArticlesFeedParams {
  limit: number;
  offset: number;
}

export interface IArticlesParams extends IArticlesFeedParams {
  tag: string;
  author: string;
  favorited: string;
}

export type GetArticlesFeed = (
  params: IArticlesFeedParams
) => Promise<AxiosResponse<IArticle[]>>;

export type GetArticles = (
  params: IArticlesParams
) => Promise<AxiosResponse<IArticle[]>>;

export type CreateArticle = (
  article: IArticle
) => Promise<AxiosResponse<IArticle>>;

export type GetArticle = (slug: string) => Promise<AxiosResponse<IArticle>>;

export type UpdateArticle = (
  slug: string,
  article: IArticle
) => Promise<AxiosResponse<IArticle>>;

export type DeleteArticle = (slug: string) => Promise<AxiosResponse<IArticle>>;

// comments
export interface IComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
}

export type GetArticleComments = (
  slug: string
) => Promise<AxiosResponse<IComment[]>>;

export type CreateArticleComment = (
  slug: string,
  comment: {
    body: string;
  }
) => Promise<AxiosResponse<IComment>>;

export type DeleteArticleComment = (
  slug: string,
  commentId: string
) => Promise<AxiosResponse<IComment>>;

// favorites
export type CreateArticleFavorite = (
  slug: string
) => Promise<AxiosResponse<{ article: IArticle }>>;

export type DeleteArticleFavorite = (
  slug: string
) => Promise<AxiosResponse<{ article: IArticle }>>;

export type GetTags = () => Promise<AxiosResponse<{ tags: string[] }>>;
