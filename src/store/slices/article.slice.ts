import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IArticleFollowingUsersParams, IArticlesParams } from '../../models'

export const initialState = {
  tags: [],
  articles: [],
  articleDetails: {},
  isLoading: false,
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
    createArticleFavorite: (state, action: PayloadAction<any>) => {},
    deleteArticleFavorite: (state, action: PayloadAction<any>) => {},
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
  setTags,
} = articleSlice.actions

export default articleSlice.reducer
