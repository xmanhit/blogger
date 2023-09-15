import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  IArticle,
  IArticleFollowingUsersParams,
  IArticleState,
  IArticlesParams,
} from '../../models'

export const initialState: IArticleState = {
  tags: [],
  articles: [],
  articleDetails: {},
  isLoading: false,
  isActionLoading: '',
  limit: 10,
  total: 0,
  errors: {},
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleFollowingUsersRequest: (
      state,
      _action: PayloadAction<IArticleFollowingUsersParams>
    ) => {
      state.total = 0
      state.articles = []
      state.isLoading = true
      state.errors = {}
    },
    setArticlesRequest: (state, _action: PayloadAction<IArticlesParams>) => {
      state.total = 0
      state.articles = []
      state.isLoading = true
      state.errors = {}
    },
    setArticlesSuccess: (state, action: PayloadAction<any>) => {
      state.articles = action.payload.articles
      state.total = action.payload.articlesCount
      state.isLoading = false
    },
    setArticlesFailure: (state, action: PayloadAction<any>) => {
      state.total = 0
      state.errors = action.payload.errors
      state.isLoading = false
    },
    setArticleDetails: (state, action: PayloadAction<any>) => {},
    createArticle: (state, action: PayloadAction<any>) => {},
    updateArticle: (state, action: PayloadAction<any>) => {},
    deleteArticle: (state, action: PayloadAction<any>) => {},
    createArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      state.isActionLoading = action.payload
    },
    createArticleFavoriteSuccess: (
      state,
      action: PayloadAction<{ article: IArticle }>
    ) => {
      const article = state.articles.find(
        (p) => p.slug === action.payload.article.slug
      )
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
      }
      state.isActionLoading = ''
    },
    createArticleFavoriteFailure: (state, _action: PayloadAction<any>) => {
      state.isActionLoading = ''
    },
    deleteArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      state.isActionLoading = action.payload
    },
    deleteArticleFavoriteSuccess: (
      state,
      action: PayloadAction<{ article: IArticle }>
    ) => {
      const article = state.articles.find(
        (p) => p.slug === action.payload.article.slug
      )
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
      }
      state.isActionLoading = ''
    },
    deleteArticleFavoriteFailure: (state, _action: PayloadAction<any>) => {
      state.isActionLoading = ''
    },
    setTags: (state, action: PayloadAction<any>) => {},
  },
})

export const {
  setArticleFollowingUsersRequest,
  setArticlesRequest,
  setArticlesSuccess,
  setArticlesFailure,
  setArticleDetails,
  createArticle,
  updateArticle,
  deleteArticle,
  createArticleFavoriteRequest,
  createArticleFavoriteSuccess,
  createArticleFavoriteFailure,
  deleteArticleFavoriteRequest,
  deleteArticleFavoriteSuccess,
  deleteArticleFavoriteFailure,
  setTags,
} = articleSlice.actions

export default articleSlice.reducer
