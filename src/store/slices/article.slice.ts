import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  IArticle,
  IArticleFollowingUsersParams,
  IArticleResponse,
  IArticleState,
  IArticlesParams,
} from '../../models'

export const initialState: IArticleState = {
  tagList: [],
  articles: [],
  articleDetails: null,
  isLoading: false,
  status: {
    articles: 'idle',
    articleDetails: 'idle',
    tagList: 'idle',
    createArticle: 'idle',
    updateArticle: 'idle',
    deleteArticle: 'idle',
  },
  limit: 10,
  total: 0,
  errors: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // Set articles
    setArticleFollowingRequest: (
      state,
      _action: PayloadAction<IArticleFollowingUsersParams>
    ) => {
      state.status.articles = 'loading'
      state.total = 0
      state.articles = []
      state.errors = null
    },
    setArticlesRequest: (state, _action: PayloadAction<IArticlesParams>) => {
      state.status.articles = 'loading'
      state.total = 0
      state.articles = []
      state.errors = null
    },
    setArticlesSuccess: (state, action: PayloadAction<any>) => {
      state.articles = action.payload.articles
      state.total = action.payload.articlesCount
      state.status.articles = 'idle'
    },
    setArticlesFailure: (state, action: PayloadAction<any>) => {
      state.total = 0
      state.errors = action.payload.errors
      state.status.articles = 'failed'
    },
    // Set article details
    setArticleDetailsRequest: (state, _action: PayloadAction<any>) => {
      state.status.articleDetails = 'loading'
      state.errors = null
    },
    setArticleDetailsSuccess: (
      state,
      action: PayloadAction<IArticleResponse>
    ) => {
      state.articleDetails = action.payload.article
      state.status.articleDetails = 'idle'
    },
    setArticleDetailsFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.status.articleDetails = 'failed'
    },
    //  Create article
    createArticleRequest: (state, action: PayloadAction<any>) => {
      state.status.createArticle = 'loading'
      state.errors = null
      console.log(action.payload)
    },
    createArticleSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.articles.push(action.payload.article)
      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails = action.payload.article
      }
      state.status.createArticle = 'idle'
    },
    createArticleFailure: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.errors = action.payload.errors
      state.status.createArticle = 'failed'
    },
    // Update article
    updateArticleRequest: (state, action: PayloadAction<any>) => {
      state.status.updateArticle = 'loading'
      state.errors = null
      console.log(action.payload)
    },
    updateArticleSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      let index = state.articles.findIndex(
        (e) => e.slug === action.payload.article.slug
      ) // id should be unique.
      if (index !== -1) {
        state.articles[index] = action.payload.article
      }
      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails = action.payload.article
      }
      state.status.updateArticle = 'idle'
    },
    updateArticleFailure: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.errors = action.payload.errors
      state.status.updateArticle = 'failed'
    },
    // Delete article
    deleteArticleRequest: (state, action: PayloadAction<any>) => {
      state.status.deleteArticle = 'loading'
      state.errors = null
      console.log(action.payload)
    },
    deleteArticleSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.status.deleteArticle = 'idle'
    },
    deleteArticleFailure: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.errors = action.payload.errors
      state.status.deleteArticle = 'failed'
    },
    // Create article favorite
    createArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      const article: IArticle | undefined = state.articles.find(
        (p) => p.slug === action.payload
      )
      if (article) {
        article.status = {
          favorite: 'loading',
        }
      }
    },
    createArticleFavoriteSuccess: (
      state,
      action: PayloadAction<IArticleResponse>
    ) => {
      const article = state.articles.find(
        (p) => p.slug === action.payload.article.slug
      )
      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails.favorited = action.payload.article.favorited
        state.articleDetails.favoritesCount =
          action.payload.article.favoritesCount
      }
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
        article.status.favorite = 'idle'
      }
    },
    createArticleFavoriteFailure: (state, action: PayloadAction<any>) => {
      const article = state.articles.find(
        (p) => p.slug === action.payload.article.slug
      )
      if (article) {
        article.status.favorite = 'failed'
      }
    },
    // Delete article favorite
    deleteArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      const article = state.articles.find((p) => p.slug === action.payload)
      if (article) {
        article.status = {
          favorite: 'loading',
        }
      }
    },
    deleteArticleFavoriteSuccess: (
      state,
      action: PayloadAction<IArticleResponse>
    ) => {
      const article = state.articles.find(
        (p) => p.slug === action.payload.article.slug
      )
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
        article.status.favorite = 'idle'
      }

      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails.favorited = action.payload.article.favorited
        state.articleDetails.favoritesCount =
          action.payload.article.favoritesCount
      }
    },
    deleteArticleFavoriteFailure: (state, action: PayloadAction<any>) => {
      const article = state.articles.find((p) => p.slug === action.payload.slug)
      if (article) {
        article.status.favorite = 'failed'
      }
    },
    // Set tags
    setTagsRequest: (state) => {
      state.status.tagList = 'loading'
      state.errors = null
    },
    setTagsSuccess: (state, action: PayloadAction<{ tags: string[] }>) => {
      state.tagList = action.payload.tags
      state.status.tagList = 'idle'
    },
    setTagsFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
      state.status.tagList = 'failed'
    },
  },
})

export const {
  setArticleFollowingRequest,
  setArticlesRequest,
  setArticlesSuccess,
  setArticlesFailure,
  setArticleDetailsRequest,
  setArticleDetailsSuccess,
  setArticleDetailsFailure,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
  updateArticleRequest,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleRequest,
  deleteArticleSuccess,
  deleteArticleFailure,
  createArticleFavoriteRequest,
  createArticleFavoriteSuccess,
  createArticleFavoriteFailure,
  deleteArticleFavoriteRequest,
  deleteArticleFavoriteSuccess,
  deleteArticleFavoriteFailure,
  setTagsRequest,
  setTagsSuccess,
  setTagsFailure,
} = articleSlice.actions

export default articleSlice.reducer